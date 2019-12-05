/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, ElementRef, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';
import { startWith, map, distinctUntilChanged } from 'rxjs/operators';
export class MultiSelectSearchComponent {
    constructor() {
        this.searchContrl = new FormControl();
        this.autoCompleteContrl = new FormControl();
        this.selectedOptions$ = new BehaviorSubject([]);
        this.autoCompleteData$ = new BehaviorSubject([]);
        this.liveChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.filteredOptions$ = combineLatest(this.searchContrl.valueChanges.pipe(startWith('')), this.autoCompleteData$
            .pipe(startWith([]))
            .pipe(distinctUntilChanged((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a.join(',') === b.join(',')))))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([searchValue, data]) => this._filter(searchValue, data))));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.dataSource.currentValue) {
            /** @type {?} */
            const data = [...new Set(changes.dataSource.currentValue)];
            this.autoCompleteData$.next((/** @type {?} */ (data.filter((/**
             * @param {?} d
             * @return {?}
             */
            d => d !== null)))));
        }
    }
    /**
     * Method to all clear the filter values
     * @return {?}
     */
    clearFilter() {
        this.searchContrl.setValue('');
        this.selectedOptions$.next([]);
        this.liveChange.emit([]);
    }
    /**
     * Method to remove an item from filter
     * @private
     * @param {?} option - filter string to be removed
     * @return {?}
     */
    remove(option) {
        /** @type {?} */
        const selectedOptions = this.selectedOptionsValue.filter((/**
         * @param {?} o
         * @return {?}
         */
        o => o !== option));
        this.selectedOptions$.next(selectedOptions);
        this.liveChange.emit(selectedOptions);
    }
    /**
     * Method to add filter to existing filter string
     * @private
     * @param {?} option - filter string to be added
     * @return {?}
     */
    add(option) {
        /** @type {?} */
        const selectedOptions = this.selectedOptionsValue;
        selectedOptions.push(option);
        this.selectedOptions$.next(selectedOptions);
        this.liveChange.emit(selectedOptions);
    }
    /**
     * Handler for select/deselect/select-all of items from suggestions
     * @param {?} selectedValue - selected/deselected value
     * @return {?}
     */
    onOptionSelectionChange(selectedValue) {
        if (selectedValue === 'All') {
            this.selectedOptionsValue.length === this.autoCompleteData$.getValue().length ?
                this.selectedOptions$.next([]) : this.selectedOptions$.next(this.autoCompleteData$.getValue());
            this.liveChange.emit(this.selectedOptionsValue);
        }
        else {
            /** @type {?} */
            const newOption = selectedValue;
            this.selectedOptionsValue.includes(newOption) ? this.remove(newOption) : this.add(newOption);
        }
        this.searchContrl.setValue('');
        this.searchInput.nativeElement.blur();
        this.autoComplete.closePanel();
        // setTimeout(() => {
        //   this.autoComplete.openPanel();
        // });
    }
    /**
     * Clear search field on focus out without changing searchform control
     * @param {?} isFocussed
     * @return {?}
     */
    _setFocus(isFocussed) {
        if (!isFocussed && !this.autoComplete.panelOpen) {
            this.searchContrl.setValue(null);
        }
    }
    /**
     * Getter for selected options
     * @return {?}
     */
    get selectedOptionsValue() {
        return this.selectedOptions$.getValue();
    }
    /**
     * Utility method for filtering the suggestions based on typed value
     * @private
     * @param {?} value - typed value
     * @param {?} searchData - datasource
     * @return {?}
     */
    _filter(value, searchData) {
        /** @type {?} */
        let allData = searchData;
        if (this.selectedOptionsValue.length) {
            // showing all selected values first followed by unselected values
            /** @type {?} */
            const selected = searchData.filter((/**
             * @param {?} data
             * @return {?}
             */
            data => this.selectedOptionsValue.includes(data)));
            /** @type {?} */
            const unselected = searchData.filter((/**
             * @param {?} data
             * @return {?}
             */
            data => !selected.includes(data)));
            allData = selected.concat(unselected);
        }
        if (value) {
            /** @type {?} */
            const filterValue = value.toString().toLowerCase();
            return allData.filter((/**
             * @param {?} option
             * @return {?}
             */
            option => {
                return option.toString().toLowerCase().includes(filterValue);
            }));
        }
        else {
            return allData;
        }
    }
}
MultiSelectSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'award-multi-select-search',
                template: "<div class=\"award-multi-select\">\n  <mat-form-field class=\"award-multi-select__form-field\">\n    <div class=\"award-multi-select__text-contianer\">\n      <label *ngIf=\"(selectedOptions$ | async).length > 0\" class=\"mat-body-1\">\n        {{(selectedOptions$ | async)[0]}},\n      </label>\n      <span class=\"mat-body-1\" *ngIf=\"(selectedOptions$ | async).length > 1\">\n        (+{{(selectedOptions$ | async).length - 1}})\n      </span>\n    </div>\n    <div>\n        <input matInput #searchInput [formControl]=\"searchContrl\" [matAutocomplete]=\"auto\" (focus)=\"_setFocus(true)\" (blur)=\"_setFocus(false)\">\n    </div>\n    <mat-icon matPrefix color=\"accent\">search</mat-icon>\n    <mat-icon matSuffix color=\"accent\" *ngIf=\"(selectedOptions$ | async).length\" class=\"award-multi-select__close-icon\" (click)=\"clearFilter()\">\n      close\n    </mat-icon>\n  </mat-form-field>\n  <mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\" (optionSelected)=\"onOptionSelectionChange($event.option.value)\">\n      <div class=\"award-multi-select__select-all\">\n          <mat-checkbox \n          color=\"primary\"\n          [checked]=\"(selectedOptions$ | async).length == (autoCompleteData$ | async).length\"\n          disableRipple=true (change)=\"onOptionSelectionChange('All')\">\n            <span class=\"mat-caption\">select all</span>\n          </mat-checkbox>\n      </div>\n     \n    <mat-option *ngFor=\"let option of filteredOptions$ | async\"\n      [value]=\"option\">\n      <mat-checkbox \n      color=\"primary\"\n      (click)=\"$event.stopPropagation()\"\n      (change)=\"onOptionSelectionChange(option)\"\n      [checked]=\"(selectedOptions$ | async).includes(option) ? true : false\"\n      disableRipple=true>\n      <span class=\"mat-caption\">{{option}}</span>\n      </mat-checkbox> \n      \n    </mat-option>\n  </mat-autocomplete>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".award-multi-select{width:inherit;overflow:hidden}.award-multi-select__select-all{margin:1rem}.award-multi-select__close-icon{cursor:pointer}.award-multi-select__form-field{width:inherit;margin:.5rem 0;background-color:#f9fafc}.award-multi-select__form-field .mat-form-field-underline{display:none}.award-multi-select__form-field .mat-form-field-wrapper{padding:0}.award-multi-select__form-field .mat-form-field-infix{padding:0;border:none;display:flex}.award-multi-select__form-field .mat-form-field-flex{align-items:center;padding:.07rem}.award-multi-select__text-contianer{display:flex;max-width:80%}.award-multi-select__text-contianer span{flex:0 1 auto}.award-multi-select__text-contianer label{flex:0 1 auto;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}"]
            }] }
];
/** @nocollapse */
MultiSelectSearchComponent.ctorParameters = () => [];
MultiSelectSearchComponent.propDecorators = {
    searchInput: [{ type: ViewChild, args: ['searchInput', null,] }],
    autoComplete: [{ type: ViewChild, args: ['searchInput', { read: MatAutocompleteTrigger, static: true },] }],
    liveChange: [{ type: Output }],
    dataSource: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    MultiSelectSearchComponent.prototype.searchContrl;
    /**
     * @type {?}
     * @private
     */
    MultiSelectSearchComponent.prototype.autoCompleteContrl;
    /** @type {?} */
    MultiSelectSearchComponent.prototype.filteredOptions$;
    /** @type {?} */
    MultiSelectSearchComponent.prototype.selectedOptions$;
    /** @type {?} */
    MultiSelectSearchComponent.prototype.autoCompleteData$;
    /** @type {?} */
    MultiSelectSearchComponent.prototype.searchInput;
    /** @type {?} */
    MultiSelectSearchComponent.prototype.autoComplete;
    /** @type {?} */
    MultiSelectSearchComponent.prototype.liveChange;
    /** @type {?} */
    MultiSelectSearchComponent.prototype.dataSource;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yaWNoLWRhdGEtdGFibGUtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9tdWx0aS1zZWxlY3Qtc2VhcmNoL211bHRpLXNlbGVjdC1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUcsU0FBUyxFQUVULFNBQVMsRUFDVCxVQUFVLEVBQ1YsTUFBTSxFQUNOLFlBQVksRUFDWixLQUFLLEVBR0wsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBYyxlQUFlLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNELE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFTdEUsTUFBTSxPQUFPLDBCQUEwQjtJQWdCckM7UUFmQSxpQkFBWSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDekIsdUJBQWtCLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUUvQyxxQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBVyxFQUFFLENBQUMsQ0FBQztRQUNyRCxzQkFBaUIsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsRUFBRSxDQUFDLENBQUM7UUFNM0QsZUFBVSxHQUEyQixJQUFJLFlBQVksRUFBWSxDQUFDO0lBS2xELENBQUM7Ozs7SUFFakIsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLENBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsRUFDbEQsSUFBSSxDQUFDLGlCQUFpQjthQUNyQixJ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QUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0QsQ0FBQyxFQUFDLENBQUM7U0FDSDthQUFNO1lBQ04sT0FBTyxPQUFPLENBQUM7U0FDZjtJQUNKLENBQUM7OztZQTNIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMsMjNEQUFtRDtnQkFFbkQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7OzswQkFTRSxTQUFTLFNBQUMsYUFBYSxFQUFFLElBQUk7MkJBQzdCLFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTt5QkFFdkUsTUFBTTt5QkFHTixLQUFLOzs7O0lBWk4sa0RBQWlDOzs7OztJQUNqQyx3REFBK0M7O0lBQy9DLHNEQUF1Qzs7SUFDdkMsc0RBQXFEOztJQUNyRCx1REFBMkQ7O0lBRTNELGlEQUEwRTs7SUFDMUUsa0RBQStHOztJQUUvRyxnREFDa0U7O0lBRWxFLGdEQUNXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgIENvbXBvbmVudCxcbiAgICAgICAgICBPbkluaXQsXG4gICAgICAgICAgVmlld0NoaWxkLFxuICAgICAgICAgIEVsZW1lbnRSZWYsXG4gICAgICAgICAgT3V0cHV0LFxuICAgICAgICAgIEV2ZW50RW1pdHRlcixcbiAgICAgICAgICBJbnB1dCxcbiAgICAgICAgICBPbkNoYW5nZXMsXG4gICAgICAgICAgU2ltcGxlQ2hhbmdlcyxcbiAgICAgICAgICBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIG1hcCwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F3YXJkLW11bHRpLXNlbGVjdC1zZWFyY2gnLFxuICB0ZW1wbGF0ZVVybDogJy4vbXVsdGktc2VsZWN0LXNlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL211bHRpLXNlbGVjdC1zZWFyY2guY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcblxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0U2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBzZWFyY2hDb250cmwgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgcHJpdmF0ZSBhdXRvQ29tcGxldGVDb250cmwgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgZmlsdGVyZWRPcHRpb25zJDogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIHNlbGVjdGVkT3B0aW9ucyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGF1dG9Db21wbGV0ZURhdGEkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxzdHJpbmc+PihbXSk7XG5cbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnLCBudWxsKSBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnLCB7IHJlYWQ6IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIsIHN0YXRpYzogdHJ1ZSB9KSBhdXRvQ29tcGxldGU6IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXI7XG5cbiAgQE91dHB1dCgpXG4gIGxpdmVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZ1tdPigpO1xuXG4gIEBJbnB1dCgpXG4gIGRhdGFTb3VyY2U7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyQgPSBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zZWFyY2hDb250cmwudmFsdWVDaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKCcnKSksXG4gICAgICB0aGlzLmF1dG9Db21wbGV0ZURhdGEkXG4gICAgICAucGlwZShzdGFydFdpdGgoW10pKVxuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsIGIpID0+IGEuam9pbignLCcpID09PSBiLmpvaW4oJywnKSkpXG4gICAgKVxuICAgIC5waXBlKG1hcCgoW3NlYXJjaFZhbHVlLCBkYXRhXSkgPT4gdGhpcy5fZmlsdGVyKHNlYXJjaFZhbHVlLCBkYXRhKSkpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGFTb3VyY2UuY3VycmVudFZhbHVlKSB7XG4gICAgICBjb25zdCBkYXRhID0gWy4uLm5ldyBTZXQoY2hhbmdlcy5kYXRhU291cmNlLmN1cnJlbnRWYWx1ZSldO1xuICAgICAgdGhpcy5hdXRvQ29tcGxldGVEYXRhJC5uZXh0KGRhdGEuZmlsdGVyKGQgPT4gZCAhPT0gbnVsbCkgYXMgc3RyaW5nW10pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogTWV0aG9kIHRvIGFsbCBjbGVhciB0aGUgZmlsdGVyIHZhbHVlc1xuICAgKi9cbiAgcHVibGljIGNsZWFyRmlsdGVyKCk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoQ29udHJsLnNldFZhbHVlKCcnKTtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyQubmV4dChbXSk7XG4gICAgdGhpcy5saXZlQ2hhbmdlLmVtaXQoW10pO1xuICB9XG4gIC8qKlxuICAgKiBNZXRob2QgdG8gcmVtb3ZlIGFuIGl0ZW0gZnJvbSBmaWx0ZXJcbiAgICogQHBhcmFtIG9wdGlvbiAtIGZpbHRlciBzdHJpbmcgdG8gYmUgcmVtb3ZlZFxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmUob3B0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnNlbGVjdGVkT3B0aW9uc1ZhbHVlLmZpbHRlcihvID0+IG8gIT09IG9wdGlvbik7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMkLm5leHQoc2VsZWN0ZWRPcHRpb25zKTtcbiAgICB0aGlzLmxpdmVDaGFuZ2UuZW1pdChzZWxlY3RlZE9wdGlvbnMpO1xuICB9XG4gIC8qKlxuICAgKiBNZXRob2QgdG8gYWRkIGZpbHRlciB0byBleGlzdGluZyBmaWx0ZXIgc3RyaW5nXG4gICAqIEBwYXJhbSBvcHRpb24gLSBmaWx0ZXIgc3RyaW5nIHRvIGJlIGFkZGVkXG4gICAqL1xuICBwcml2YXRlIGFkZChvcHRpb246IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuc2VsZWN0ZWRPcHRpb25zVmFsdWU7XG4gICAgc2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0aW9uKTtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyQubmV4dChzZWxlY3RlZE9wdGlvbnMpO1xuICAgIHRoaXMubGl2ZUNoYW5nZS5lbWl0KHNlbGVjdGVkT3B0aW9ucyk7XG4gIH1cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIHNlbGVjdC9kZXNlbGVjdC9zZWxlY3QtYWxsIG9mIGl0ZW1zIGZyb20gc3VnZ2VzdGlvbnNcbiAgICogQHBhcmFtIHNlbGVjdGVkVmFsdWUgLSBzZWxlY3RlZC9kZXNlbGVjdGVkIHZhbHVlXG4gICAqL1xuICBvbk9wdGlvblNlbGVjdGlvbkNoYW5nZShzZWxlY3RlZFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoc2VsZWN0ZWRWYWx1ZSA9PT0gJ0FsbCcpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zVmFsdWUubGVuZ3RoID09PSB0aGlzLmF1dG9Db21wbGV0ZURhdGEkLmdldFZhbHVlKCkubGVuZ3RoID9cbiAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zJC5uZXh0KFtdKSA6IHRoaXMuc2VsZWN0ZWRPcHRpb25zJC5uZXh0KHRoaXMuYXV0b0NvbXBsZXRlRGF0YSQuZ2V0VmFsdWUoKSk7XG4gICAgICB0aGlzLmxpdmVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkT3B0aW9uc1ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3T3B0aW9uID0gc2VsZWN0ZWRWYWx1ZTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zVmFsdWUuaW5jbHVkZXMobmV3T3B0aW9uKSA/IHRoaXMucmVtb3ZlKG5ld09wdGlvbikgOiB0aGlzLmFkZChuZXdPcHRpb24pO1xuICAgIH1cbiAgICB0aGlzLnNlYXJjaENvbnRybC5zZXRWYWx1ZSgnJyk7XG4gICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB0aGlzLmF1dG9Db21wbGV0ZS5jbG9zZVBhbmVsKCk7XG4gICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gICB0aGlzLmF1dG9Db21wbGV0ZS5vcGVuUGFuZWwoKTtcbiAgICAvLyB9KTtcbiAgfVxuICAvKipcbiAgICogQ2xlYXIgc2VhcmNoIGZpZWxkIG9uIGZvY3VzIG91dCB3aXRob3V0IGNoYW5naW5nIHNlYXJjaGZvcm0gY29udHJvbFxuICAgKi9cbiAgX3NldEZvY3VzKGlzRm9jdXNzZWQpIHtcbiAgICBpZiAoIWlzRm9jdXNzZWQgJiYgIXRoaXMuYXV0b0NvbXBsZXRlLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5zZWFyY2hDb250cmwuc2V0VmFsdWUobnVsbCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBHZXR0ZXIgZm9yIHNlbGVjdGVkIG9wdGlvbnNcbiAgICovXG4gIGdldCBzZWxlY3RlZE9wdGlvbnNWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZE9wdGlvbnMkLmdldFZhbHVlKCk7XG4gIH1cbiAgLyoqXG4gICAqIFV0aWxpdHkgbWV0aG9kIGZvciBmaWx0ZXJpbmcgdGhlIHN1Z2dlc3Rpb25zIGJhc2VkIG9uIHR5cGVkIHZhbHVlXG4gICAqIEBwYXJhbSB2YWx1ZSAtIHR5cGVkIHZhbHVlXG4gICAqIEBwYXJhbSBzZWFyY2hEYXRhIC0gZGF0YXNvdXJjZVxuICAgKi9cbiAgcHJpdmF0ZSBfZmlsdGVyKHZhbHVlOiBzdHJpbmcsIHNlYXJjaERhdGE6IEFycmF5PHN0cmluZz4pOiBzdHJpbmdbXSB7XG4gICAgbGV0IGFsbERhdGEgPSBzZWFyY2hEYXRhO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9uc1ZhbHVlLmxlbmd0aCkge1xuICAgICAgLy8gc2hvd2luZyBhbGwgc2VsZWN0ZWQgdmFsdWVzIGZpcnN0IGZvbGxvd2VkIGJ5IHVuc2VsZWN0ZWQgdmFsdWVzXG4gICAgICBjb25zdCBzZWxlY3RlZCA9IHNlYXJjaERhdGEuZmlsdGVyKGRhdGEgPT4gdGhpcy5zZWxlY3RlZE9wdGlvbnNWYWx1ZS5pbmNsdWRlcyhkYXRhKSk7XG4gICAgICBjb25zdCB1bnNlbGVjdGVkID0gc2VhcmNoRGF0YS5maWx0ZXIoZGF0YSA9PiAhc2VsZWN0ZWQuaW5jbHVkZXMoZGF0YSkpO1xuICAgICAgYWxsRGF0YSA9IHNlbGVjdGVkLmNvbmNhdCh1bnNlbGVjdGVkKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiBhbGxEYXRhLmZpbHRlcihvcHRpb24gPT4ge1xuICAgICAgICByZXR1cm4gb3B0aW9uLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXJWYWx1ZSk7XG4gICAgICB9KTtcbiAgICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhbGxEYXRhO1xuICAgICB9XG4gIH1cbn1cbiJdfQ==