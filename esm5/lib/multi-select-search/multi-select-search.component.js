/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';
import { startWith, map, distinctUntilChanged } from 'rxjs/operators';
var MultiSelectSearchComponent = /** @class */ (function () {
    function MultiSelectSearchComponent() {
        this.searchContrl = new FormControl();
        this.autoCompleteContrl = new FormControl();
        this.selectedOptions$ = new BehaviorSubject([]);
        this.autoCompleteData$ = new BehaviorSubject([]);
        this.liveChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    MultiSelectSearchComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.filteredOptions$ = combineLatest(this.searchContrl.valueChanges.pipe(startWith('')), this.autoCompleteData$
            .pipe(startWith([]))
            .pipe(distinctUntilChanged((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.join(',') === b.join(','); }))))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), searchValue = _b[0], data = _b[1];
            return _this._filter(searchValue, data);
        })));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    MultiSelectSearchComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.dataSource.currentValue) {
            /** @type {?} */
            var data = tslib_1.__spread(new Set(changes.dataSource.currentValue));
            this.autoCompleteData$.next((/** @type {?} */ (data.filter((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d !== null; })))));
        }
    };
    /**
     * Method to all clear the filter values
     */
    /**
     * Method to all clear the filter values
     * @return {?}
     */
    MultiSelectSearchComponent.prototype.clearFilter = /**
     * Method to all clear the filter values
     * @return {?}
     */
    function () {
        this.searchContrl.setValue('');
        this.selectedOptions$.next([]);
        this.liveChange.emit([]);
    };
    /**
     * Method to remove an item from filter
     * @param option - filter string to be removed
     */
    /**
     * Method to remove an item from filter
     * @private
     * @param {?} option - filter string to be removed
     * @return {?}
     */
    MultiSelectSearchComponent.prototype.remove = /**
     * Method to remove an item from filter
     * @private
     * @param {?} option - filter string to be removed
     * @return {?}
     */
    function (option) {
        /** @type {?} */
        var selectedOptions = this.selectedOptionsValue.filter((/**
         * @param {?} o
         * @return {?}
         */
        function (o) { return o !== option; }));
        this.selectedOptions$.next(selectedOptions);
        this.liveChange.emit(selectedOptions);
    };
    /**
     * Method to add filter to existing filter string
     * @param option - filter string to be added
     */
    /**
     * Method to add filter to existing filter string
     * @private
     * @param {?} option - filter string to be added
     * @return {?}
     */
    MultiSelectSearchComponent.prototype.add = /**
     * Method to add filter to existing filter string
     * @private
     * @param {?} option - filter string to be added
     * @return {?}
     */
    function (option) {
        /** @type {?} */
        var selectedOptions = this.selectedOptionsValue;
        selectedOptions.push(option);
        this.selectedOptions$.next(selectedOptions);
        this.liveChange.emit(selectedOptions);
    };
    /**
     * Handler for select/deselect/select-all of items from suggestions
     * @param selectedValue - selected/deselected value
     */
    /**
     * Handler for select/deselect/select-all of items from suggestions
     * @param {?} selectedValue - selected/deselected value
     * @return {?}
     */
    MultiSelectSearchComponent.prototype.onOptionSelectionChange = /**
     * Handler for select/deselect/select-all of items from suggestions
     * @param {?} selectedValue - selected/deselected value
     * @return {?}
     */
    function (selectedValue) {
        if (selectedValue === 'All') {
            this.selectedOptionsValue.length === this.autoCompleteData$.getValue().length ?
                this.selectedOptions$.next([]) : this.selectedOptions$.next(this.autoCompleteData$.getValue());
            this.liveChange.emit(this.selectedOptionsValue);
        }
        else {
            /** @type {?} */
            var newOption = selectedValue;
            this.selectedOptionsValue.includes(newOption) ? this.remove(newOption) : this.add(newOption);
        }
        this.searchContrl.setValue('');
        this.searchInput.nativeElement.blur();
        this.autoComplete.closePanel();
        // setTimeout(() => {
        //   this.autoComplete.openPanel();
        // });
    };
    /**
     * Clear search field on focus out without changing searchform control
     */
    /**
     * Clear search field on focus out without changing searchform control
     * @param {?} isFocussed
     * @return {?}
     */
    MultiSelectSearchComponent.prototype._setFocus = /**
     * Clear search field on focus out without changing searchform control
     * @param {?} isFocussed
     * @return {?}
     */
    function (isFocussed) {
        if (!isFocussed && !this.autoComplete.panelOpen) {
            this.searchContrl.setValue(null);
        }
    };
    Object.defineProperty(MultiSelectSearchComponent.prototype, "selectedOptionsValue", {
        /**
         * Getter for selected options
         */
        get: /**
         * Getter for selected options
         * @return {?}
         */
        function () {
            return this.selectedOptions$.getValue();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Utility method for filtering the suggestions based on typed value
     * @param value - typed value
     * @param searchData - datasource
     */
    /**
     * Utility method for filtering the suggestions based on typed value
     * @private
     * @param {?} value - typed value
     * @param {?} searchData - datasource
     * @return {?}
     */
    MultiSelectSearchComponent.prototype._filter = /**
     * Utility method for filtering the suggestions based on typed value
     * @private
     * @param {?} value - typed value
     * @param {?} searchData - datasource
     * @return {?}
     */
    function (value, searchData) {
        var _this = this;
        /** @type {?} */
        var allData = searchData;
        if (this.selectedOptionsValue.length) {
            // showing all selected values first followed by unselected values
            /** @type {?} */
            var selected_1 = searchData.filter((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return _this.selectedOptionsValue.includes(data); }));
            /** @type {?} */
            var unselected = searchData.filter((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return !selected_1.includes(data); }));
            allData = selected_1.concat(unselected);
        }
        if (value) {
            /** @type {?} */
            var filterValue_1 = value.toString().toLowerCase();
            return allData.filter((/**
             * @param {?} option
             * @return {?}
             */
            function (option) {
                return option.toString().toLowerCase().includes(filterValue_1);
            }));
        }
        else {
            return allData;
        }
    };
    MultiSelectSearchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'award-multi-select-search',
                    template: "<div class=\"award-multi-select\">\n  <mat-form-field class=\"award-multi-select__form-field\">\n    <div class=\"award-multi-select__text-contianer\">\n      <label *ngIf=\"(selectedOptions$ | async).length > 0\" class=\"mat-body-1\">\n        {{(selectedOptions$ | async)[0]}},\n      </label>\n      <span class=\"mat-body-1\" *ngIf=\"(selectedOptions$ | async).length > 1\">\n        (+{{(selectedOptions$ | async).length - 1}})\n      </span>\n    </div>\n    <div>\n        <input matInput #searchInput [formControl]=\"searchContrl\" [matAutocomplete]=\"auto\" (focus)=\"_setFocus(true)\" (blur)=\"_setFocus(false)\">\n    </div>\n    <mat-icon matPrefix color=\"accent\">search</mat-icon>\n    <mat-icon matSuffix color=\"accent\" *ngIf=\"(selectedOptions$ | async).length\" class=\"award-multi-select__close-icon\" (click)=\"clearFilter()\">\n      close\n    </mat-icon>\n  </mat-form-field>\n  <mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\" (optionSelected)=\"onOptionSelectionChange($event.option.value)\">\n      <div class=\"award-multi-select__select-all\">\n          <mat-checkbox \n          color=\"primary\"\n          [checked]=\"(selectedOptions$ | async).length == (autoCompleteData$ | async).length\"\n          disableRipple=true (change)=\"onOptionSelectionChange('All')\">\n            <span class=\"mat-caption\">select all</span>\n          </mat-checkbox>\n      </div>\n     \n    <mat-option *ngFor=\"let option of filteredOptions$ | async\"\n      [value]=\"option\">\n      <mat-checkbox \n      color=\"primary\"\n      (click)=\"$event.stopPropagation()\"\n      (change)=\"onOptionSelectionChange(option)\"\n      [checked]=\"(selectedOptions$ | async).includes(option) ? true : false\"\n      disableRipple=true>\n      <span class=\"mat-caption\">{{option}}</span>\n      </mat-checkbox> \n      \n    </mat-option>\n  </mat-autocomplete>\n</div>",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".award-multi-select{width:inherit;overflow:hidden}.award-multi-select__select-all{margin:1rem}.award-multi-select__close-icon{cursor:pointer}.award-multi-select__form-field{width:inherit;margin:.5rem 0;background-color:#f9fafc}.award-multi-select__form-field .mat-form-field-underline{display:none}.award-multi-select__form-field .mat-form-field-wrapper{padding:0}.award-multi-select__form-field .mat-form-field-infix{padding:0;border:none;display:flex}.award-multi-select__form-field .mat-form-field-flex{align-items:center;padding:.07rem}.award-multi-select__text-contianer{display:flex;max-width:80%}.award-multi-select__text-contianer span{flex:0 1 auto}.award-multi-select__text-contianer label{flex:0 1 auto;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    MultiSelectSearchComponent.ctorParameters = function () { return []; };
    MultiSelectSearchComponent.propDecorators = {
        searchInput: [{ type: ViewChild, args: ['searchInput', null,] }],
        autoComplete: [{ type: ViewChild, args: ['searchInput', { read: MatAutocompleteTrigger, static: true },] }],
        liveChange: [{ type: Output }],
        dataSource: [{ type: Input }]
    };
    return MultiSelectSearchComponent;
}());
export { MultiSelectSearchComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktc2VsZWN0LXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yaWNoLWRhdGEtdGFibGUtYW5ndWxhci8iLCJzb3VyY2VzIjpbImxpYi9tdWx0aS1zZWxlY3Qtc2VhcmNoL211bHRpLXNlbGVjdC1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFHLFNBQVMsRUFFVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixZQUFZLEVBQ1osS0FBSyxFQUdMLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQWMsZUFBZSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRFO0lBdUJFO1FBZkEsaUJBQVksR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ3pCLHVCQUFrQixHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFFL0MscUJBQWdCLEdBQUcsSUFBSSxlQUFlLENBQVcsRUFBRSxDQUFDLENBQUM7UUFDckQsc0JBQWlCLEdBQUcsSUFBSSxlQUFlLENBQWdCLEVBQUUsQ0FBQyxDQUFDO1FBTTNELGVBQVUsR0FBMkIsSUFBSSxZQUFZLEVBQVksQ0FBQztJQUtsRCxDQUFDOzs7O0lBRWpCLDZDQUFROzs7SUFBUjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGFBQWEsQ0FDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUNsRCxJQUFJLENBQUMsaUJBQWlCO2FBQ3JC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LFVBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQXhCLENBQXdCLEVBQUM7WUFDdEUsT0FBTyxHQUFHLFVBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdkM7UUFDRCxJQUFJLEtBQUssRUFBRTs7Z0JBQ0gsYUFBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUU7WUFDbEQsT0FBTyxPQUFPLENBQUMsTUFBTTs7OztZQUFDLFVBQUEsTUFBTTtnQkFDMUIsT0FBTyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQVcsQ0FBQyxDQUFDO1lBQy9ELENBQUMsRUFBQyxDQUFDO1NBQ0g7YUFBTTtZQUNOLE9BQU8sT0FBTyxDQUFDO1NBQ2Y7SUFDSixDQUFDOztnQkEzSEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLDIzREFBbUQ7b0JBRW5ELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7OzhCQVNFLFNBQVMsU0FBQyxhQUFhLEVBQUUsSUFBSTsrQkFDN0IsU0FBUyxTQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzZCQUV2RSxNQUFNOzZCQUdOLEtBQUs7O0lBd0dSLGlDQUFDO0NBQUEsQUE1SEQsSUE0SEM7U0FySFksMEJBQTBCOzs7SUFDckMsa0RBQWlDOzs7OztJQUNqQyx3REFBK0M7O0lBQy9DLHNEQUF1Qzs7SUFDdkMsc0RBQXFEOztJQUNyRCx1REFBMkQ7O0lBRTNELGlEQUEwRTs7SUFDMUUsa0RBQStHOztJQUUvRyxnREFDa0U7O0lBRWxFLGdEQUNXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgIENvbXBvbmVudCxcbiAgICAgICAgICBPbkluaXQsXG4gICAgICAgICAgVmlld0NoaWxkLFxuICAgICAgICAgIEVsZW1lbnRSZWYsXG4gICAgICAgICAgT3V0cHV0LFxuICAgICAgICAgIEV2ZW50RW1pdHRlcixcbiAgICAgICAgICBJbnB1dCxcbiAgICAgICAgICBPbkNoYW5nZXMsXG4gICAgICAgICAgU2ltcGxlQ2hhbmdlcyxcbiAgICAgICAgICBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIG1hcCwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2F3YXJkLW11bHRpLXNlbGVjdC1zZWFyY2gnLFxuICB0ZW1wbGF0ZVVybDogJy4vbXVsdGktc2VsZWN0LXNlYXJjaC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL211bHRpLXNlbGVjdC1zZWFyY2guY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcblxuZXhwb3J0IGNsYXNzIE11bHRpU2VsZWN0U2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBzZWFyY2hDb250cmwgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgcHJpdmF0ZSBhdXRvQ29tcGxldGVDb250cmwgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgZmlsdGVyZWRPcHRpb25zJDogT2JzZXJ2YWJsZTxzdHJpbmdbXT47XG4gIHNlbGVjdGVkT3B0aW9ucyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPihbXSk7XG4gIGF1dG9Db21wbGV0ZURhdGEkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxzdHJpbmc+PihbXSk7XG5cbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnLCBudWxsKSBzZWFyY2hJbnB1dDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnLCB7IHJlYWQ6IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXIsIHN0YXRpYzogdHJ1ZSB9KSBhdXRvQ29tcGxldGU6IE1hdEF1dG9jb21wbGV0ZVRyaWdnZXI7XG5cbiAgQE91dHB1dCgpXG4gIGxpdmVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZ1tdPigpO1xuXG4gIEBJbnB1dCgpXG4gIGRhdGFTb3VyY2U7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyQgPSBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zZWFyY2hDb250cmwudmFsdWVDaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKCcnKSksXG4gICAgICB0aGlzLmF1dG9Db21wbGV0ZURhdGEkXG4gICAgICAucGlwZShzdGFydFdpdGgoW10pKVxuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsIGIpID0+IGEuam9pbignLCcpID09PSBiLmpvaW4oJywnKSkpXG4gICAgKVxuICAgIC5waXBlKG1hcCgoW3NlYXJjaFZhbHVlLCBkYXRhXSkgPT4gdGhpcy5fZmlsdGVyKHNlYXJjaFZhbHVlLCBkYXRhKSkpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGFTb3VyY2UuY3VycmVudFZhbHVlKSB7XG4gICAgICBjb25zdCBkYXRhID0gWy4uLm5ldyBTZXQoY2hhbmdlcy5kYXRhU291cmNlLmN1cnJlbnRWYWx1ZSldO1xuICAgICAgdGhpcy5hdXRvQ29tcGxldGVEYXRhJC5uZXh0KGRhdGEuZmlsdGVyKGQgPT4gZCAhPT0gbnVsbCkgYXMgc3RyaW5nW10pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogTWV0aG9kIHRvIGFsbCBjbGVhciB0aGUgZmlsdGVyIHZhbHVlc1xuICAgKi9cbiAgcHVibGljIGNsZWFyRmlsdGVyKCk6IHZvaWQge1xuICAgIHRoaXMuc2VhcmNoQ29udHJsLnNldFZhbHVlKCcnKTtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyQubmV4dChbXSk7XG4gICAgdGhpcy5saXZlQ2hhbmdlLmVtaXQoW10pO1xuICB9XG4gIC8qKlxuICAgKiBNZXRob2QgdG8gcmVtb3ZlIGFuIGl0ZW0gZnJvbSBmaWx0ZXJcbiAgICogQHBhcmFtIG9wdGlvbiAtIGZpbHRlciBzdHJpbmcgdG8gYmUgcmVtb3ZlZFxuICAgKi9cbiAgcHJpdmF0ZSByZW1vdmUob3B0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnNlbGVjdGVkT3B0aW9uc1ZhbHVlLmZpbHRlcihvID0+IG8gIT09IG9wdGlvbik7XG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMkLm5leHQoc2VsZWN0ZWRPcHRpb25zKTtcbiAgICB0aGlzLmxpdmVDaGFuZ2UuZW1pdChzZWxlY3RlZE9wdGlvbnMpO1xuICB9XG4gIC8qKlxuICAgKiBNZXRob2QgdG8gYWRkIGZpbHRlciB0byBleGlzdGluZyBmaWx0ZXIgc3RyaW5nXG4gICAqIEBwYXJhbSBvcHRpb24gLSBmaWx0ZXIgc3RyaW5nIHRvIGJlIGFkZGVkXG4gICAqL1xuICBwcml2YXRlIGFkZChvcHRpb246IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuc2VsZWN0ZWRPcHRpb25zVmFsdWU7XG4gICAgc2VsZWN0ZWRPcHRpb25zLnB1c2gob3B0aW9uKTtcbiAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyQubmV4dChzZWxlY3RlZE9wdGlvbnMpO1xuICAgIHRoaXMubGl2ZUNoYW5nZS5lbWl0KHNlbGVjdGVkT3B0aW9ucyk7XG4gIH1cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIHNlbGVjdC9kZXNlbGVjdC9zZWxlY3QtYWxsIG9mIGl0ZW1zIGZyb20gc3VnZ2VzdGlvbnNcbiAgICogQHBhcmFtIHNlbGVjdGVkVmFsdWUgLSBzZWxlY3RlZC9kZXNlbGVjdGVkIHZhbHVlXG4gICAqL1xuICBvbk9wdGlvblNlbGVjdGlvbkNoYW5nZShzZWxlY3RlZFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoc2VsZWN0ZWRWYWx1ZSA9PT0gJ0FsbCcpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zVmFsdWUubGVuZ3RoID09PSB0aGlzLmF1dG9Db21wbGV0ZURhdGEkLmdldFZhbHVlKCkubGVuZ3RoID9cbiAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zJC5uZXh0KFtdKSA6IHRoaXMuc2VsZWN0ZWRPcHRpb25zJC5uZXh0KHRoaXMuYXV0b0NvbXBsZXRlRGF0YSQuZ2V0VmFsdWUoKSk7XG4gICAgICB0aGlzLmxpdmVDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkT3B0aW9uc1ZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3T3B0aW9uID0gc2VsZWN0ZWRWYWx1ZTtcbiAgICAgIHRoaXMuc2VsZWN0ZWRPcHRpb25zVmFsdWUuaW5jbHVkZXMobmV3T3B0aW9uKSA/IHRoaXMucmVtb3ZlKG5ld09wdGlvbikgOiB0aGlzLmFkZChuZXdPcHRpb24pO1xuICAgIH1cbiAgICB0aGlzLnNlYXJjaENvbnRybC5zZXRWYWx1ZSgnJyk7XG4gICAgdGhpcy5zZWFyY2hJbnB1dC5uYXRpdmVFbGVtZW50LmJsdXIoKTtcbiAgICB0aGlzLmF1dG9Db21wbGV0ZS5jbG9zZVBhbmVsKCk7XG4gICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gICB0aGlzLmF1dG9Db21wbGV0ZS5vcGVuUGFuZWwoKTtcbiAgICAvLyB9KTtcbiAgfVxuICAvKipcbiAgICogQ2xlYXIgc2VhcmNoIGZpZWxkIG9uIGZvY3VzIG91dCB3aXRob3V0IGNoYW5naW5nIHNlYXJjaGZvcm0gY29udHJvbFxuICAgKi9cbiAgX3NldEZvY3VzKGlzRm9jdXNzZWQpIHtcbiAgICBpZiAoIWlzRm9jdXNzZWQgJiYgIXRoaXMuYXV0b0NvbXBsZXRlLnBhbmVsT3Blbikge1xuICAgICAgdGhpcy5zZWFyY2hDb250cmwuc2V0VmFsdWUobnVsbCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBHZXR0ZXIgZm9yIHNlbGVjdGVkIG9wdGlvbnNcbiAgICovXG4gIGdldCBzZWxlY3RlZE9wdGlvbnNWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZE9wdGlvbnMkLmdldFZhbHVlKCk7XG4gIH1cbiAgLyoqXG4gICAqIFV0aWxpdHkgbWV0aG9kIGZvciBmaWx0ZXJpbmcgdGhlIHN1Z2dlc3Rpb25zIGJhc2VkIG9uIHR5cGVkIHZhbHVlXG4gICAqIEBwYXJhbSB2YWx1ZSAtIHR5cGVkIHZhbHVlXG4gICAqIEBwYXJhbSBzZWFyY2hEYXRhIC0gZGF0YXNvdXJjZVxuICAgKi9cbiAgcHJpdmF0ZSBfZmlsdGVyKHZhbHVlOiBzdHJpbmcsIHNlYXJjaERhdGE6IEFycmF5PHN0cmluZz4pOiBzdHJpbmdbXSB7XG4gICAgbGV0IGFsbERhdGEgPSBzZWFyY2hEYXRhO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkT3B0aW9uc1ZhbHVlLmxlbmd0aCkge1xuICAgICAgLy8gc2hvd2luZyBhbGwgc2VsZWN0ZWQgdmFsdWVzIGZpcnN0IGZvbGxvd2VkIGJ5IHVuc2VsZWN0ZWQgdmFsdWVzXG4gICAgICBjb25zdCBzZWxlY3RlZCA9IHNlYXJjaERhdGEuZmlsdGVyKGRhdGEgPT4gdGhpcy5zZWxlY3RlZE9wdGlvbnNWYWx1ZS5pbmNsdWRlcyhkYXRhKSk7XG4gICAgICBjb25zdCB1bnNlbGVjdGVkID0gc2VhcmNoRGF0YS5maWx0ZXIoZGF0YSA9PiAhc2VsZWN0ZWQuaW5jbHVkZXMoZGF0YSkpO1xuICAgICAgYWxsRGF0YSA9IHNlbGVjdGVkLmNvbmNhdCh1bnNlbGVjdGVkKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiBhbGxEYXRhLmZpbHRlcihvcHRpb24gPT4ge1xuICAgICAgICByZXR1cm4gb3B0aW9uLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhmaWx0ZXJWYWx1ZSk7XG4gICAgICB9KTtcbiAgICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhbGxEYXRhO1xuICAgICB9XG4gIH1cbn1cbiJdfQ==