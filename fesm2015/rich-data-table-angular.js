import { Injectable, ɵɵdefineInjectable, EventEmitter, Component, ViewEncapsulation, ViewChild, Output, Input, NgModule, CUSTOM_ELEMENTS_SCHEMA, ViewChildren } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { MatAutocompleteTrigger, MatCheckboxModule, MatFormFieldModule, MatListModule, MatInputModule, MatAutocompleteModule, MatIconModule, MatTableDataSource, MatSort, MatPaginator, MatTableModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule, MatNativeDateModule, MatSortModule, MatTooltipModule, MatRadioModule } from '@angular/material';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { startWith, distinctUntilChanged, map } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RichDataTableAngularService {
    constructor() { }
}
RichDataTableAngularService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
RichDataTableAngularService.ctorParameters = () => [];
/** @nocollapse */ RichDataTableAngularService.ngInjectableDef = ɵɵdefineInjectable({ factory: function RichDataTableAngularService_Factory() { return new RichDataTableAngularService(); }, token: RichDataTableAngularService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MultiSelectSearchComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AwardMultiSelectSearchModule {
}
AwardMultiSelectSearchModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatCheckboxModule,
                    MatFormFieldModule,
                    MatListModule,
                    MatInputModule,
                    MatAutocompleteModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatIconModule
                ],
                entryComponents: [],
                declarations: [
                    MultiSelectSearchComponent
                ],
                exports: [
                    MultiSelectSearchComponent
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function AwardDataColumn() { }
if (false) {
    /** @type {?} */
    AwardDataColumn.prototype.text;
    /** @type {?|undefined} */
    AwardDataColumn.prototype.bindingKey;
    /** @type {?} */
    AwardDataColumn.prototype.type;
    /** @type {?|undefined} */
    AwardDataColumn.prototype.iconTooltipBindingKey;
    /** @type {?|undefined} */
    AwardDataColumn.prototype.intialSort;
    /** @type {?|undefined} */
    AwardDataColumn.prototype.searchVisible;
    /** @type {?|undefined} */
    AwardDataColumn.prototype.columnTemplateRef;
}
/**
 * @record
 */
function TableFilter() { }
class RichDataTableAngularComponent {
    /**
     * @param {?} datepipe
     */
    constructor(datepipe) {
        this.datepipe = datepipe;
        this.selectionChange = new EventEmitter();
        this.allColumns = [];
        this.filters = {};
        this.loading$ = new BehaviorSubject(true);
        this.mode = 'None';
        this.selectAll = false;
        this.loading$.next(true);
        this.isExpandable = false;
        this.tableData = new MatTableDataSource([]);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selection = new SelectionModel(this.mode === 'MultiSelect', [], true);
        if (this.displayedColumns) {
            this.displayedColumns.map((/**
             * @param {?} column
             * @return {?}
             */
            column => {
                if (!column.bindingKey) {
                    column.bindingKey = column.text;
                }
                if (column.searchVisible !== false) {
                    column.searchVisible = true;
                }
            }));
            this.allColumns = this.allColumns.concat(this.displayedColumns.map((/**
             * @param {?} column
             * @return {?}
             */
            column => column.bindingKey)));
            this._handleMode();
            /** @type {?} */
            const intialSort = this.displayedColumns.filter((/**
             * @param {?} d
             * @return {?}
             */
            d => d.intialSort === true));
            this.intialSort = intialSort.length ? intialSort[0].bindingKey : '';
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.dataSource && changes.dataSource.currentValue) {
            if (changes.dataSource.currentValue !== null) {
                this.loading$.next(false);
            }
            this.selection = new SelectionModel(this.mode === 'MultiSelect', [], true);
            this.tableData = new MatTableDataSource(changes.dataSource.currentValue);
            this.tableData.filterPredicate =
                (/**
                 * @param {?} data
                 * @param {?} filters
                 * @return {?}
                 */
                (data, filters) => {
                    return this.getTableFilterPredicate(data, filters);
                });
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
            this.clearFilter();
            if (this.selectAll && this.mode === 'MultiSelect') {
                this.tableData.data.forEach((/**
                 * @param {?} row
                 * @return {?}
                 */
                row => this.selection.select(row)));
            }
        }
    }
    /**
     * Getter for selected items from table
     * @return {?}
     */
    getSelectedItems() {
        return this.selection.selected;
    }
    /**
     * Method to clear all selection from Table
     * @return {?}
     */
    clearSelection() {
        this.selection.clear();
    }
    /**
     * @param {?} row
     * @return {?}
     */
    toggleRowExpansion(row) {
        if (this.isExpandable) {
            this.expandedElement = this.expandedElement === row ? null : row;
        }
    }
    /**
     * Utility method to getRowData
     * @param {?} row - row name
     * @return {?}
     */
    getRowData(row) {
        /** @type {?} */
        const column = this.displayedColumns.filter((/**
         * @param {?} o
         * @return {?}
         */
        o => o.bindingKey === row))[0];
        if (column.type === 'date') {
            return this.tableData && this.tableData.data.map((/**
             * @param {?} o
             * @return {?}
             */
            o => this.datepipe.transform(o[row], 'yyyy-MM-dd HH:mm')));
        }
        else {
            return this.tableData && this.tableData.data.map((/**
             * @param {?} o
             * @return {?}
             */
            o => o[row]));
        }
    }
    /**
     * Utility method to check if all items are selected
     * @return {?}
     */
    isAllSelected() {
        /** @type {?} */
        const numSelected = this.selection.selected.length;
        /** @type {?} */
        const numRows = this.tableData.filteredData.length ?
            this.tableData.filteredData.length :
            this.tableData.data.length;
        return numSelected === numRows;
    }
    /**
     * Handler for clearing the filters
     * @return {?}
     */
    clearFilter() {
        if (this.searchComponents) {
            this.searchComponents.forEach((/**
             * @param {?} searchComponent
             * @return {?}
             */
            searchComponent => searchComponent.clearFilter()));
        }
    }
    /**
     * Hanlder for applying filter on livechange of text in filter
     * @param {?} filters
     * @param {?} column
     * @return {?}
     */
    applyFilter(filters, column) {
        this.filters[column] = filters;
        this.tableData.filter = this.filters;
    }
    /**
     * Selects all rows if they are not all selected; otherwise clear selection
     * @return {?}
     */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            (this.tableData.filteredData.length ? this.tableData.filteredData : this.tableData.data)
                .forEach((/**
             * @param {?} row
             * @return {?}
             */
            row => this.selection.select(row)));
        this.selectionChange.emit(this.getSelectedItems());
    }
    /**
     * Handler for selection/deselection of items and to emit the change event
     * @param {?} row - Row to be selected/deselected
     * @return {?}
     */
    onSingleSelectionChange(row) {
        this.selection.toggle(row);
        this.selectionChange.emit(this.getSelectedItems());
    }
    /**
     * Utility method to handle the table selection mode
     * @private
     * @return {?}
     */
    _handleMode() {
        if ((this.mode === 'MultiSelect' || this.mode === 'SingleSelect') && !this.allColumns.includes('select')) {
            this.allColumns.unshift('select');
        }
        else if (this.mode === 'None') {
            /** @type {?} */
            let index = this.allColumns.indexOf('select');
            index >= 0 ? index = index : index = this.allColumns.indexOf('action');
            if (index >= 0) {
                this.allColumns.splice(index, 1);
            }
        }
    }
    /**
     * Utility method to write the filter predicate for table
     * @private
     * @param {?} data - table data
     * @param {?} filters - key value pair of <column> : <filter string>
     * @return {?}
     */
    getTableFilterPredicate(data, filters) {
        /** @type {?} */
        const matchFilter = [];
        /** @type {?} */
        const columns = Object.keys(filters);
        columns.forEach((/**
         * @param {?} column
         * @return {?}
         */
        column => {
            /** @type {?} */
            const searchValues = filters[column];
            if (searchValues.length) {
                /** @type {?} */
                const customFilter = [];
                searchValues.forEach((/**
                 * @param {?} value
                 * @return {?}
                 */
                value => {
                    if (!data[column]) {
                        return customFilter.push(false);
                    }
                    /** @type {?} */
                    const type = this.displayedColumns.filter((/**
                     * @param {?} o
                     * @return {?}
                     */
                    o => o.bindingKey === column))[0].type;
                    if (type === 'date') {
                        /** @type {?} */
                        const isEqual = this.datepipe.transform(data[column], 'dd-MM-yy') === value;
                        return customFilter.push(isEqual);
                    }
                    else {
                        return customFilter.push(data[column].toString().includes(value));
                    }
                }));
                matchFilter.push(customFilter.some(Boolean)); // OR
            }
        }));
        return matchFilter.every(Boolean); // AND
    }
    /**
     * @return {?}
     */
    get isSearchVisibleForSomeColumn() {
        return this.displayedColumns && this.displayedColumns.filter((/**
         * @param {?} c
         * @return {?}
         */
        c => c.searchVisible === true)).length > 0;
    }
}
RichDataTableAngularComponent.decorators = [
    { type: Component, args: [{
                selector: 'rich-data-table',
                template: "<div class=\"rich-data-table\">\n   <mat-table\n   [ngClass]=\"tableData.data.length == 0 || (loading$ | async) ? 'rich-data-table__table' : 'rich-data-table__table max-height'\"\n   mat-table [dataSource]=\"tableData\" matSort [matSortActive]=\"intialSort\" matSortDirection=\"asc\"\n   matSortDisableClear multiTemplateDataRows>\n   <!-- Checkbox Column -->\n   <ng-container matColumnDef=\"select\" *ngIf=\"mode === 'MultiSelect'\">\n       <mat-header-cell *matHeaderCellDef>\n           <mat-checkbox color=\"primary\" (change)=\"$event ? masterToggle() : null\"\n               [checked]=\"selection.hasValue() && isAllSelected()\"\n               [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n           </mat-checkbox>\n       </mat-header-cell>\n       <mat-cell *matCellDef=\"let row\">\n           <mat-checkbox color=\"primary\" (click)=\"$event.stopPropagation()\"\n               (change)=\"$event ? onSingleSelectionChange(row) : null\" [checked]=\"selection.isSelected(row)\">\n           </mat-checkbox>\n       </mat-cell>\n   </ng-container>\n   <ng-container matColumnDef=\"select\" *ngIf=\"mode === 'SingleSelect'\">\n           <mat-header-cell *matHeaderCellDef>\n           </mat-header-cell>\n           <mat-cell *matCellDef=\"let row\">\n               <mat-radio-button (change)=\"$event ? onSingleSelectionChange(row) : null\" color=\"primary\" [checked]=false></mat-radio-button>\n           </mat-cell>\n       </ng-container>\n   <!-- All Columns -->\n   <ng-container *ngFor=\"let column of displayedColumns\" [matColumnDef]=\"column.bindingKey\">\n       <mat-header-cell *matHeaderCellDef>\n           <div class=\"rich-data-table__table-column-header\">\n               <p mat-sort-header [title]=\"column.text\" [class.addBorder]=\"isSearchVisibleForSomeColumn\">{{column.text}}</p>\n               <award-multi-select-search *ngIf=\"column.searchVisible && tableData\"\n                   (liveChange)=\"applyFilter($event,column.bindingKey)\"\n                   [dataSource]='getRowData(column.bindingKey)'>\n               </award-multi-select-search>\n           </div>\n       </mat-header-cell>\n       <mat-cell *matCellDef=\"let element\"\n           [class]=\"column.iconTooltipBindingKey ? 'rich-data-table__table-icon-cell mat-column-'+ column.bindingKey : 'mat-column-'+ column.bindingKey\">\n           <ng-template [ngIf]=\"column.type === 'template' && column.columnTemplateRef\" [ngIfElse]=\"defaultColumnTemp\">\n               <ng-container \n                   [ngTemplateOutlet]=\"column.columnTemplateRef\" \n                   [ngTemplateOutletContext]=\"{context: element, bindedKey:column.bindingKey}\">\n               </ng-container>\n           </ng-template>\n           <ng-template #defaultColumnTemp>\n               <span *ngIf=\"column.type == 'string'\">{{element[column.bindingKey]}}</span>\n               <span *ngIf=\"column.type == 'date'\">{{element[column.bindingKey] | date: 'yyyy-MM-dd HH:mm'}}</span>\n               <mat-icon *ngIf=\"column.iconTooltipBindingKey\" \n                   [matTooltip]=\"element[column.iconTooltipBindingKey]\"\n                   matTooltipClass='rich-data-table__icon-tooltip' \n                   matTooltipPosition='after' color=\"primary\">\n                   info\n               </mat-icon>\n           </ng-template>\n       </mat-cell>\n   </ng-container>\n   <!-- Expanded content  -->\n   <ng-container matColumnDef=\"expandedDetail\">\n           <mat-cell *matCellDef=\"let element\">\n             <article [@detailExpand]=\"element == expandedElement ? 'expanded' : 'collapsed'\">\n               <ng-container [ngTemplateOutlet]=\"expandedRowTemplateRef\" [ngTemplateOutletContext]=\"{context: element}\">\n               </ng-container>\n           </article>\n           </mat-cell>\n   </ng-container>\n   <mat-header-row *matHeaderRowDef=\"allColumns; sticky: true\"></mat-header-row>\n   <mat-row *matRowDef=\"let row; columns: allColumns;\"\n   [class.rich-data-table__table-row-highlight]=\"expandedElement == row\">\n   </mat-row>\n   <mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"rich-data-table__table-expansion\">\n   </mat-row>\n</mat-table>\n<div class=\"rich-data-table__loading-container\" *ngIf=\"tableData.data.length == 0 || (loading$ | async)\">\n   <mat-spinner color=\"primary\" *ngIf=\"loading$ | async\"></mat-spinner>\n   <span *ngIf=\"(tableData.data.length == 0 && !(loading$ | async)) || !dataSource\">No data to display</span>\n</div>\n<div class=\"rich-data-table__table-footer\">\n   <mat-paginator [pageSizeOptions]=\"[5, 10, 20]\" [pageSize]=\"20\" showFirstLastButtons></mat-paginator>\n   <button mat-button *ngIf=\"isSearchVisibleForSomeColumn\" (click)=\"clearFilter()\">\n       Clear filters\n   </button>\n</div>\n</div>",
                encapsulation: ViewEncapsulation.None,
                providers: [DatePipe],
                animations: [
                    trigger('detailExpand', [
                        state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
                        state('expanded', style({ height: '*', visibility: 'visible' })),
                        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                    ]),
                ],
                styles: [".rich-data-table{display:flex;flex-direction:column;height:100%}.rich-data-table__table{width:100%;overflow:auto}.rich-data-table__table.max-height{flex:1 1 auto}.rich-data-table__table award-multi-select-search{width:98%}.rich-data-table__table .mat-header-row{border-color:#d3d3d3;align-items:baseline;min-height:2.5rem}.rich-data-table__table .mat-row{min-height:36px;border-color:#d3d3d3}.rich-data-table__table .mat-header-cell:first-of-type{padding-left:0}.rich-data-table__table .mat-header-cell:last-of-type{padding-right:0}.rich-data-table__table mat-cell{word-break:break-all}.rich-data-table__table mat-cell:first-of-type{padding-left:0}.rich-data-table__table mat-cell:last-of-type{padding-right:0}.rich-data-table__table mat-cell .mat-icon{font-size:1.2rem;margin-left:.3rem;line-height:1.2;cursor:pointer}.rich-data-table__table .mat-column-select{flex:0 0 4.5%;padding-left:1rem}.rich-data-table__table .mat-column-select.mat-cell:first-of-type,.rich-data-table__table .mat-column-select.mat-header-cell:first-of-type{padding-left:1rem}.rich-data-table__table-row-highlight{border-bottom:none}.rich-data-table__table-expansion.mat-row{min-height:0;border:none}.rich-data-table__table-expansion article{width:100%;border-bottom:1px solid #d3d3d3}.rich-data-table__table-column-header{width:100%}.rich-data-table__table-column-header .addBorder{border-bottom:1px solid #d3d3d3}.rich-data-table__table-column-header .mat-sort-header-button{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:-ms-grid;display:grid}.rich-data-table__loading-container{place-items:center;flex:1 1 auto;display:flex;place-content:center;border-bottom:1px solid #d3d3d3;padding:1rem}.rich-data-table__table-icon{white-space:pre-line}.rich-data-table__table-icon-cell{display:-ms-grid;display:grid;grid:auto/minmax(auto,2.3rem) auto}.rich-data-table__table-icon-cell span{text-align:right}.rich-data-table__table-footer{display:flex;place-content:flex-end}.rich-data-table__icon-tooltip{white-space:pre;font-size:12px;opacity:.9}"]
            }] }
];
/** @nocollapse */
RichDataTableAngularComponent.ctorParameters = () => [
    { type: DatePipe }
];
RichDataTableAngularComponent.propDecorators = {
    dataSource: [{ type: Input }],
    displayedColumns: [{ type: Input }],
    mode: [{ type: Input }],
    selectAll: [{ type: Input }],
    expandedRowTemplateRef: [{ type: Input }],
    isExpandable: [{ type: Input }],
    selectionChange: [{ type: Output }],
    sort: [{ type: ViewChild, args: [MatSort, null,] }],
    paginator: [{ type: ViewChild, args: [MatPaginator, { static: true },] }],
    searchComponents: [{ type: ViewChildren, args: [MultiSelectSearchComponent, null,] }]
};
if (false) {
    /** @type {?} */
    RichDataTableAngularComponent.prototype.dataSource;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.displayedColumns;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.mode;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.selectAll;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.expandedRowTemplateRef;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.isExpandable;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.selectionChange;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.allColumns;
    /**
     * @type {?}
     * @private
     */
    RichDataTableAngularComponent.prototype.filters;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.selection;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.loading$;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.tableData;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.intialSort;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.expandedElement;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.sort;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.paginator;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.searchComponents;
    /** @type {?} */
    RichDataTableAngularComponent.prototype.datepipe;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RichDataTableAngularModule {
}
RichDataTableAngularModule.decorators = [
    { type: NgModule, args: [{
                declarations: [RichDataTableAngularComponent],
                imports: [
                    CommonModule,
                    MatTableModule,
                    MatButtonModule,
                    MatIconModule,
                    MatCheckboxModule,
                    MatPaginatorModule,
                    MatProgressSpinnerModule,
                    MatNativeDateModule,
                    MatSortModule,
                    MatTooltipModule,
                    MatRadioModule,
                    MatIconModule,
                    AwardMultiSelectSearchModule
                ],
                exports: [RichDataTableAngularComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { RichDataTableAngularComponent, RichDataTableAngularModule, RichDataTableAngularService, MultiSelectSearchComponent as ɵa, AwardMultiSelectSearchModule as ɵb };
//# sourceMappingURL=rich-data-table-angular.js.map
