/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation, Input, TemplateRef, Output, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { DatePipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { MultiSelectSearchComponent } from './multi-select-search';
/**
 * @record
 */
export function AwardDataColumn() { }
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
var RichDataTableAngularComponent = /** @class */ (function () {
    function RichDataTableAngularComponent(datepipe) {
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
    RichDataTableAngularComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.selection = new SelectionModel(this.mode === 'MultiSelect', [], true);
        if (this.displayedColumns) {
            this.displayedColumns.map((/**
             * @param {?} column
             * @return {?}
             */
            function (column) {
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
            function (column) { return column.bindingKey; })));
            this._handleMode();
            /** @type {?} */
            var intialSort = this.displayedColumns.filter((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.intialSort === true; }));
            this.intialSort = intialSort.length ? intialSort[0].bindingKey : '';
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    RichDataTableAngularComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
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
                function (data, filters) {
                    return _this.getTableFilterPredicate(data, filters);
                });
            this.tableData.paginator = this.paginator;
            this.tableData.sort = this.sort;
            this.clearFilter();
            if (this.selectAll && this.mode === 'MultiSelect') {
                this.tableData.data.forEach((/**
                 * @param {?} row
                 * @return {?}
                 */
                function (row) { return _this.selection.select(row); }));
            }
        }
    };
    /**
     * Getter for selected items from table
     */
    /**
     * Getter for selected items from table
     * @return {?}
     */
    RichDataTableAngularComponent.prototype.getSelectedItems = /**
     * Getter for selected items from table
     * @return {?}
     */
    function () {
        return this.selection.selected;
    };
    /**
     * Method to clear all selection from Table
     */
    /**
     * Method to clear all selection from Table
     * @return {?}
     */
    RichDataTableAngularComponent.prototype.clearSelection = /**
     * Method to clear all selection from Table
     * @return {?}
     */
    function () {
        this.selection.clear();
    };
    /**
     * @param {?} row
     * @return {?}
     */
    RichDataTableAngularComponent.prototype.toggleRowExpansion = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        if (this.isExpandable) {
            this.expandedElement = this.expandedElement === row ? null : row;
        }
    };
    /**
     * Utility method to getRowData
     * @param row - row name
     */
    /**
     * Utility method to getRowData
     * @param {?} row - row name
     * @return {?}
     */
    RichDataTableAngularComponent.prototype.getRowData = /**
     * Utility method to getRowData
     * @param {?} row - row name
     * @return {?}
     */
    function (row) {
        var _this = this;
        /** @type {?} */
        var column = this.displayedColumns.filter((/**
         * @param {?} o
         * @return {?}
         */
        function (o) { return o.bindingKey === row; }))[0];
        if (column.type === 'date') {
            return this.tableData && this.tableData.data.map((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return _this.datepipe.transform(o[row], 'yyyy-MM-dd HH:mm'); }));
        }
        else {
            return this.tableData && this.tableData.data.map((/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return o[row]; }));
        }
    };
    /**
     * Utility method to check if all items are selected
     */
    /**
     * Utility method to check if all items are selected
     * @return {?}
     */
    RichDataTableAngularComponent.prototype.isAllSelected = /**
     * Utility method to check if all items are selected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var numSelected = this.selection.selected.length;
        /** @type {?} */
        var numRows = this.tableData.filteredData.length ?
            this.tableData.filteredData.length :
            this.tableData.data.length;
        return numSelected === numRows;
    };
    /**
     * Handler for clearing the filters
     */
    /**
     * Handler for clearing the filters
     * @return {?}
     */
    RichDataTableAngularComponent.prototype.clearFilter = /**
     * Handler for clearing the filters
     * @return {?}
     */
    function () {
        if (this.searchComponents) {
            this.searchComponents.forEach((/**
             * @param {?} searchComponent
             * @return {?}
             */
            function (searchComponent) { return searchComponent.clearFilter(); }));
        }
    };
    /**
     * Hanlder for applying filter on livechange of text in filter
     */
    /**
     * Hanlder for applying filter on livechange of text in filter
     * @param {?} filters
     * @param {?} column
     * @return {?}
     */
    RichDataTableAngularComponent.prototype.applyFilter = /**
     * Hanlder for applying filter on livechange of text in filter
     * @param {?} filters
     * @param {?} column
     * @return {?}
     */
    function (filters, column) {
        this.filters[column] = filters;
        this.tableData.filter = this.filters;
    };
    /**
     * Selects all rows if they are not all selected; otherwise clear selection
     */
    /**
     * Selects all rows if they are not all selected; otherwise clear selection
     * @return {?}
     */
    RichDataTableAngularComponent.prototype.masterToggle = /**
     * Selects all rows if they are not all selected; otherwise clear selection
     * @return {?}
     */
    function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            (this.tableData.filteredData.length ? this.tableData.filteredData : this.tableData.data)
                .forEach((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return _this.selection.select(row); }));
        this.selectionChange.emit(this.getSelectedItems());
    };
    /**
     * Handler for selection/deselection of items and to emit the change event
     * @param row - Row to be selected/deselected
     */
    /**
     * Handler for selection/deselection of items and to emit the change event
     * @param {?} row - Row to be selected/deselected
     * @return {?}
     */
    RichDataTableAngularComponent.prototype.onSingleSelectionChange = /**
     * Handler for selection/deselection of items and to emit the change event
     * @param {?} row - Row to be selected/deselected
     * @return {?}
     */
    function (row) {
        this.selection.toggle(row);
        this.selectionChange.emit(this.getSelectedItems());
    };
    /**
     * Utility method to handle the table selection mode
     */
    /**
     * Utility method to handle the table selection mode
     * @private
     * @return {?}
     */
    RichDataTableAngularComponent.prototype._handleMode = /**
     * Utility method to handle the table selection mode
     * @private
     * @return {?}
     */
    function () {
        if ((this.mode === 'MultiSelect' || this.mode === 'SingleSelect') && !this.allColumns.includes('select')) {
            this.allColumns.unshift('select');
        }
        else if (this.mode === 'None') {
            /** @type {?} */
            var index = this.allColumns.indexOf('select');
            index >= 0 ? index = index : index = this.allColumns.indexOf('action');
            if (index >= 0) {
                this.allColumns.splice(index, 1);
            }
        }
    };
    /**
     * Utility method to write the filter predicate for table
     * @param data - table data
     * @param filters - key value pair of <column> : <filter string>
     */
    /**
     * Utility method to write the filter predicate for table
     * @private
     * @param {?} data - table data
     * @param {?} filters - key value pair of <column> : <filter string>
     * @return {?}
     */
    RichDataTableAngularComponent.prototype.getTableFilterPredicate = /**
     * Utility method to write the filter predicate for table
     * @private
     * @param {?} data - table data
     * @param {?} filters - key value pair of <column> : <filter string>
     * @return {?}
     */
    function (data, filters) {
        var _this = this;
        /** @type {?} */
        var matchFilter = [];
        /** @type {?} */
        var columns = Object.keys(filters);
        columns.forEach((/**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            /** @type {?} */
            var searchValues = filters[column];
            if (searchValues.length) {
                /** @type {?} */
                var customFilter_1 = [];
                searchValues.forEach((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    if (!data[column]) {
                        return customFilter_1.push(false);
                    }
                    /** @type {?} */
                    var type = _this.displayedColumns.filter((/**
                     * @param {?} o
                     * @return {?}
                     */
                    function (o) { return o.bindingKey === column; }))[0].type;
                    if (type === 'date') {
                        /** @type {?} */
                        var isEqual = _this.datepipe.transform(data[column], 'dd-MM-yy') === value;
                        return customFilter_1.push(isEqual);
                    }
                    else {
                        return customFilter_1.push(data[column].toString().includes(value));
                    }
                }));
                matchFilter.push(customFilter_1.some(Boolean)); // OR
            }
        }));
        return matchFilter.every(Boolean); // AND
    };
    Object.defineProperty(RichDataTableAngularComponent.prototype, "isSearchVisibleForSomeColumn", {
        get: /**
         * @return {?}
         */
        function () {
            return this.displayedColumns && this.displayedColumns.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.searchVisible === true; })).length > 0;
        },
        enumerable: true,
        configurable: true
    });
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
    RichDataTableAngularComponent.ctorParameters = function () { return [
        { type: DatePipe }
    ]; };
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
    return RichDataTableAngularComponent;
}());
export { RichDataTableAngularComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmljaC1kYXRhLXRhYmxlLWFuZ3VsYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmljaC1kYXRhLXRhYmxlLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvcmljaC1kYXRhLXRhYmxlLWFuZ3VsYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFhLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUNsRixZQUFZLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFFbkUscUNBUUM7OztJQVBDLCtCQUFhOztJQUNiLHFDQUFvQjs7SUFDcEIsK0JBQWlCOztJQUNqQixnREFBK0I7O0lBQy9CLHFDQUFxQjs7SUFDckIsd0NBQXdCOztJQUN4Qiw0Q0FBcUM7Ozs7O0FBTXZDLDBCQUVDO0FBRUQ7SUFrREUsdUNBQW1CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFmckMsb0JBQWUsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVuRSxlQUFVLEdBQWEsRUFBRSxDQUFDO1FBQ2xCLFlBQU8sR0FBZ0IsRUFBRSxDQUFDO1FB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RUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQzs0QkFDOUQsVUFBVSxDQUFDLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO3lCQUN0RixDQUFDO3FCQUNIOztpQkFDRjs7OztnQkFyQ1EsUUFBUTs7OzZCQXdDZCxLQUFLO21DQUdMLEtBQUs7dUJBR0wsS0FBSzs0QkFHTCxLQUFLO3lDQUdMLEtBQUs7K0JBR0wsS0FBSztrQ0FHTCxNQUFNO3VCQVdOLFNBQVMsU0FBQyxPQUFPLEVBQUUsSUFBSTs0QkFDdkIsU0FBUyxTQUFDLFlBQVksRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7bUNBQ3hDLFlBQVksU0FBQywwQkFBMEIsRUFBRSxJQUFJOztJQXNLaEQsb0NBQUM7Q0FBQSxBQXJORCxJQXFOQztTQXZNWSw2QkFBNkI7OztJQUV4QyxtREFDVzs7SUFFWCx5REFDeUM7O0lBRXpDLDZDQUNrQjs7SUFFbEIsa0RBQ29COztJQUVwQiwrREFDMEM7O0lBRTFDLHFEQUN1Qjs7SUFFdkIsd0RBQ21FOztJQUVuRSxtREFBMEI7Ozs7O0lBQzFCLGdEQUFrQzs7SUFDbEMsa0RBQWtDOztJQUNsQyxpREFBOEM7O0lBQzlDLGtEQUFVOztJQUNWLG1EQUFtQjs7SUFDbkIsd0RBQXdCOztJQUV4Qiw2Q0FBd0M7O0lBQ3hDLGtEQUFtRTs7SUFDbkUseURBQXdHOztJQUc1RixpREFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIE9uQ2hhbmdlcywgSW5wdXQsIFRlbXBsYXRlUmVmLCBPdXRwdXQsIFxuICBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVuLCBRdWVyeUxpc3QsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgYW5pbWF0ZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNYXRTb3J0LCBNYXRQYWdpbmF0b3IsIE1hdFRhYmxlRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE11bHRpU2VsZWN0U2VhcmNoQ29tcG9uZW50IH0gZnJvbSAnLi9tdWx0aS1zZWxlY3Qtc2VhcmNoJztcblxuZXhwb3J0IGludGVyZmFjZSBBd2FyZERhdGFDb2x1bW4ge1xuICB0ZXh0OiBzdHJpbmc7XG4gIGJpbmRpbmdLZXk/OiBzdHJpbmc7XG4gIHR5cGU6IENvbHVtblR5cGU7XG4gIGljb25Ub29sdGlwQmluZGluZ0tleT86IHN0cmluZztcbiAgaW50aWFsU29ydD86IGJvb2xlYW47XG4gIHNlYXJjaFZpc2libGU/OiBib29sZWFuO1xuICBjb2x1bW5UZW1wbGF0ZVJlZj86IFRlbXBsYXRlUmVmPGFueT47XG59XG5cbmV4cG9ydCB0eXBlIFNlbGVjdE1vZGUgPSAnTm9uZScgfCAnU2luZ2xlU2VsZWN0JyB8ICdNdWx0aVNlbGVjdCc7XG5leHBvcnQgdHlwZSBDb2x1bW5UeXBlID0gJ3N0cmluZycgfCAnZGF0ZScgfCAndGVtcGxhdGUnO1xuXG5pbnRlcmZhY2UgVGFibGVGaWx0ZXIge1xuICBbY29sdW1uOiBzdHJpbmddOiBzdHJpbmdbXTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncmljaC1kYXRhLXRhYmxlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JpY2gtZGF0YS10YWJsZS1hbmd1bGFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmljaC1kYXRhLXRhYmxlLWFuZ3VsYXIuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgcHJvdmlkZXJzOiBbRGF0ZVBpcGVdLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZGV0YWlsRXhwYW5kJywgW1xuICAgICAgc3RhdGUoJ2NvbGxhcHNlZCcsIHN0eWxlKHtoZWlnaHQ6ICcwcHgnLCBtaW5IZWlnaHQ6ICcwJywgdmlzaWJpbGl0eTogJ2hpZGRlbid9KSksXG4gICAgICBzdGF0ZSgnZXhwYW5kZWQnLCBzdHlsZSh7aGVpZ2h0OiAnKicsIHZpc2liaWxpdHk6ICd2aXNpYmxlJ30pKSxcbiAgICAgIHRyYW5zaXRpb24oJ2V4cGFuZGVkIDw9PiBjb2xsYXBzZWQnLCBhbmltYXRlKCcyMjVtcyBjdWJpYy1iZXppZXIoMC40LCAwLjAsIDAuMiwgMSknKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFJpY2hEYXRhVGFibGVBbmd1bGFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpXG4gIGRhdGFTb3VyY2U7XG5cbiAgQElucHV0KClcbiAgZGlzcGxheWVkQ29sdW1uczogQXJyYXk8QXdhcmREYXRhQ29sdW1uPjtcblxuICBASW5wdXQoKVxuICBtb2RlPzogU2VsZWN0TW9kZTtcblxuICBASW5wdXQoKVxuICBzZWxlY3RBbGw/OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIGV4cGFuZGVkUm93VGVtcGxhdGVSZWY/OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBJbnB1dCgpXG4gIGlzRXhwYW5kYWJsZT86IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpXG4gIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPG9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPG9iamVjdD4oKTtcblxuICBhbGxDb2x1bW5zOiBzdHJpbmdbXSA9IFtdO1xuICBwcml2YXRlIGZpbHRlcnM6IFRhYmxlRmlsdGVyID0ge307XG4gIHNlbGVjdGlvbjogU2VsZWN0aW9uTW9kZWw8b2JqZWN0PjtcbiAgbG9hZGluZyQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KHRydWUpO1xuICB0YWJsZURhdGE7XG4gIGludGlhbFNvcnQ6IHN0cmluZztcbiAgZXhwYW5kZWRFbGVtZW50OiBvYmplY3Q7XG5cbiAgQFZpZXdDaGlsZChNYXRTb3J0LCBudWxsKSBzb3J0OiBNYXRTb3J0O1xuICBAVmlld0NoaWxkKE1hdFBhZ2luYXRvciwgeyBzdGF0aWM6IHRydWUgfSkgcGFnaW5hdG9yOiBNYXRQYWdpbmF0b3I7XG4gIEBWaWV3Q2hpbGRyZW4oTXVsdGlTZWxlY3RTZWFyY2hDb21wb25lbnQsIG51bGwpIHNlYXJjaENvbXBvbmVudHM6IFF1ZXJ5TGlzdDxNdWx0aVNlbGVjdFNlYXJjaENvbXBvbmVudD47XG5cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGF0ZXBpcGU6IERhdGVQaXBlKSB7XG4gICAgdGhpcy5tb2RlID0gJ05vbmUnO1xuICAgIHRoaXMuc2VsZWN0QWxsID0gZmFsc2U7XG4gICAgdGhpcy5sb2FkaW5nJC5uZXh0KHRydWUpO1xuICAgIHRoaXMuaXNFeHBhbmRhYmxlID0gZmFsc2U7XG4gICAgdGhpcy50YWJsZURhdGEgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKFtdKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbk1vZGVsPG9iamVjdD4odGhpcy5tb2RlID09PSAnTXVsdGlTZWxlY3QnLCBbXSwgdHJ1ZSk7XG4gICAgaWYgKHRoaXMuZGlzcGxheWVkQ29sdW1ucykge1xuICAgICAgdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLm1hcChjb2x1bW4gPT4ge1xuICAgICAgICBpZiAoIWNvbHVtbi5iaW5kaW5nS2V5KSB7XG4gICAgICAgICAgY29sdW1uLmJpbmRpbmdLZXkgPSBjb2x1bW4udGV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sdW1uLnNlYXJjaFZpc2libGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgY29sdW1uLnNlYXJjaFZpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMuYWxsQ29sdW1ucyA9IHRoaXMuYWxsQ29sdW1ucy5jb25jYXQodGhpcy5kaXNwbGF5ZWRDb2x1bW5zLm1hcChjb2x1bW4gPT4gY29sdW1uLmJpbmRpbmdLZXkpKTtcbiAgICAgIHRoaXMuX2hhbmRsZU1vZGUoKTtcbiAgICAgIGNvbnN0IGludGlhbFNvcnQgPSB0aGlzLmRpc3BsYXllZENvbHVtbnMuZmlsdGVyKGQgPT4gZC5pbnRpYWxTb3J0ID09PSB0cnVlKTtcbiAgICAgIHRoaXMuaW50aWFsU29ydCA9IGludGlhbFNvcnQubGVuZ3RoID8gaW50aWFsU29ydFswXS5iaW5kaW5nS2V5IDogJyc7XG4gICAgfVxuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5kYXRhU291cmNlICYmIGNoYW5nZXMuZGF0YVNvdXJjZS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIGlmIChjaGFuZ2VzLmRhdGFTb3VyY2UuY3VycmVudFZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyQubmV4dChmYWxzZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxvYmplY3Q+KHRoaXMubW9kZSA9PT0gJ011bHRpU2VsZWN0JywgW10sIHRydWUpO1xuICAgICAgdGhpcy50YWJsZURhdGEgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKGNoYW5nZXMuZGF0YVNvdXJjZS5jdXJyZW50VmFsdWUpO1xuICAgICAgdGhpcy50YWJsZURhdGEuZmlsdGVyUHJlZGljYXRlID1cbiAgICAgICAgKGRhdGE6IG9iamVjdCwgZmlsdGVyczogVGFibGVGaWx0ZXIpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUYWJsZUZpbHRlclByZWRpY2F0ZShkYXRhLCBmaWx0ZXJzKTtcbiAgICAgICAgfTtcbiAgICAgIHRoaXMudGFibGVEYXRhLnBhZ2luYXRvciA9IHRoaXMucGFnaW5hdG9yO1xuICAgICAgdGhpcy50YWJsZURhdGEuc29ydCA9IHRoaXMuc29ydDtcbiAgICAgIHRoaXMuY2xlYXJGaWx0ZXIoKTtcbiAgICAgIGlmICh0aGlzLnNlbGVjdEFsbCAmJiB0aGlzLm1vZGUgPT09ICdNdWx0aVNlbGVjdCcpIHtcbiAgICAgICAgdGhpcy50YWJsZURhdGEuZGF0YS5mb3JFYWNoKHJvdyA9PiB0aGlzLnNlbGVjdGlvbi5zZWxlY3Qocm93KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBHZXR0ZXIgZm9yIHNlbGVjdGVkIGl0ZW1zIGZyb20gdGFibGVcbiAgICovXG4gIHB1YmxpYyBnZXRTZWxlY3RlZEl0ZW1zKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkO1xuICB9XG4gIC8qKlxuICAgKiBNZXRob2QgdG8gY2xlYXIgYWxsIHNlbGVjdGlvbiBmcm9tIFRhYmxlXG4gICAqL1xuICBwdWJsaWMgY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgdGhpcy5zZWxlY3Rpb24uY2xlYXIoKTtcbiAgfVxuICBwdWJsaWMgdG9nZ2xlUm93RXhwYW5zaW9uKHJvdykge1xuICAgIGlmICh0aGlzLmlzRXhwYW5kYWJsZSkge1xuICAgICAgdGhpcy5leHBhbmRlZEVsZW1lbnQgPSB0aGlzLmV4cGFuZGVkRWxlbWVudCA9PT0gcm93ID8gbnVsbCA6IHJvdztcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFV0aWxpdHkgbWV0aG9kIHRvIGdldFJvd0RhdGFcbiAgICogQHBhcmFtIHJvdyAtIHJvdyBuYW1lXG4gICAqL1xuICBwdWJsaWMgZ2V0Um93RGF0YShyb3c6IHN0cmluZykge1xuICAgIGNvbnN0IGNvbHVtbjogQXdhcmREYXRhQ29sdW1uID0gdGhpcy5kaXNwbGF5ZWRDb2x1bW5zLmZpbHRlcihvID0+IG8uYmluZGluZ0tleSA9PT0gcm93KVswXTtcbiAgICBpZiAoY29sdW1uLnR5cGUgPT09ICdkYXRlJykge1xuICAgICAgcmV0dXJuIHRoaXMudGFibGVEYXRhICYmIHRoaXMudGFibGVEYXRhLmRhdGEubWFwKG8gPT4gdGhpcy5kYXRlcGlwZS50cmFuc2Zvcm0ob1tyb3ddLCAneXl5eS1NTS1kZCBISDptbScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudGFibGVEYXRhICYmIHRoaXMudGFibGVEYXRhLmRhdGEubWFwKG8gPT4gb1tyb3ddKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFV0aWxpdHkgbWV0aG9kIHRvIGNoZWNrIGlmIGFsbCBpdGVtcyBhcmUgc2VsZWN0ZWRcbiAgICovXG4gIHB1YmxpYyBpc0FsbFNlbGVjdGVkKCkge1xuICAgIGNvbnN0IG51bVNlbGVjdGVkID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoO1xuICAgIGNvbnN0IG51bVJvd3MgPSB0aGlzLnRhYmxlRGF0YS5maWx0ZXJlZERhdGEubGVuZ3RoID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJsZURhdGEuZmlsdGVyZWREYXRhLmxlbmd0aCA6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFibGVEYXRhLmRhdGEubGVuZ3RoO1xuICAgIHJldHVybiBudW1TZWxlY3RlZCA9PT0gbnVtUm93cztcbiAgfVxuICAvKipcbiAgICogSGFuZGxlciBmb3IgY2xlYXJpbmcgdGhlIGZpbHRlcnNcbiAgICovXG4gIGNsZWFyRmlsdGVyKCkge1xuICAgIGlmICh0aGlzLnNlYXJjaENvbXBvbmVudHMpIHtcbiAgICAgIHRoaXMuc2VhcmNoQ29tcG9uZW50cy5mb3JFYWNoKHNlYXJjaENvbXBvbmVudCA9PiBzZWFyY2hDb21wb25lbnQuY2xlYXJGaWx0ZXIoKSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBIYW5sZGVyIGZvciBhcHBseWluZyBmaWx0ZXIgb24gbGl2ZWNoYW5nZSBvZiB0ZXh0IGluIGZpbHRlclxuICAgKi9cbiAgcHVibGljIGFwcGx5RmlsdGVyKGZpbHRlcnM6IHN0cmluZ1tdLCBjb2x1bW46IHN0cmluZykge1xuICAgIHRoaXMuZmlsdGVyc1tjb2x1bW5dID0gZmlsdGVycztcbiAgICB0aGlzLnRhYmxlRGF0YS5maWx0ZXIgPSB0aGlzLmZpbHRlcnM7XG4gIH1cbiAgLyoqXG4gICAqIFNlbGVjdHMgYWxsIHJvd3MgaWYgdGhleSBhcmUgbm90IGFsbCBzZWxlY3RlZDsgb3RoZXJ3aXNlIGNsZWFyIHNlbGVjdGlvblxuICAgKi9cbiAgcHVibGljIG1hc3RlclRvZ2dsZSgpIHtcbiAgICB0aGlzLmlzQWxsU2VsZWN0ZWQoKSA/XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpIDpcbiAgICAgICh0aGlzLnRhYmxlRGF0YS5maWx0ZXJlZERhdGEubGVuZ3RoID8gdGhpcy50YWJsZURhdGEuZmlsdGVyZWREYXRhIDogdGhpcy50YWJsZURhdGEuZGF0YSlcbiAgICAgIC5mb3JFYWNoKHJvdyA9PiB0aGlzLnNlbGVjdGlvbi5zZWxlY3Qocm93KSk7XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLmdldFNlbGVjdGVkSXRlbXMoKSk7XG4gIH1cbiAgLyoqXG4gICAqIEhhbmRsZXIgZm9yIHNlbGVjdGlvbi9kZXNlbGVjdGlvbiBvZiBpdGVtcyBhbmQgdG8gZW1pdCB0aGUgY2hhbmdlIGV2ZW50XG4gICAqIEBwYXJhbSByb3cgLSBSb3cgdG8gYmUgc2VsZWN0ZWQvZGVzZWxlY3RlZFxuICAgKi9cbiAgcHVibGljIG9uU2luZ2xlU2VsZWN0aW9uQ2hhbmdlKHJvdzogb2JqZWN0KSB7XG4gICAgdGhpcy5zZWxlY3Rpb24udG9nZ2xlKHJvdyk7XG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLmdldFNlbGVjdGVkSXRlbXMoKSk7XG4gIH1cbiAgLyoqXG4gICAqIFV0aWxpdHkgbWV0aG9kIHRvIGhhbmRsZSB0aGUgdGFibGUgc2VsZWN0aW9uIG1vZGVcbiAgICovXG4gIHByaXZhdGUgX2hhbmRsZU1vZGUoKSB7XG4gICAgaWYgKCh0aGlzLm1vZGUgPT09ICdNdWx0aVNlbGVjdCcgfHwgdGhpcy5tb2RlID09PSAnU2luZ2xlU2VsZWN0JykgJiYgIXRoaXMuYWxsQ29sdW1ucy5pbmNsdWRlcygnc2VsZWN0JykpIHtcbiAgICAgIHRoaXMuYWxsQ29sdW1ucy51bnNoaWZ0KCdzZWxlY3QnKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ05vbmUnKSB7XG4gICAgICBsZXQgaW5kZXggPSB0aGlzLmFsbENvbHVtbnMuaW5kZXhPZignc2VsZWN0Jyk7XG4gICAgICBpbmRleCA+PSAwID8gaW5kZXggPSBpbmRleCA6IGluZGV4ID0gdGhpcy5hbGxDb2x1bW5zLmluZGV4T2YoJ2FjdGlvbicpO1xuICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgdGhpcy5hbGxDb2x1bW5zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBVdGlsaXR5IG1ldGhvZCB0byB3cml0ZSB0aGUgZmlsdGVyIHByZWRpY2F0ZSBmb3IgdGFibGVcbiAgICogQHBhcmFtIGRhdGEgLSB0YWJsZSBkYXRhXG4gICAqIEBwYXJhbSBmaWx0ZXJzIC0ga2V5IHZhbHVlIHBhaXIgb2YgPGNvbHVtbj4gOiA8ZmlsdGVyIHN0cmluZz5cbiAgICovXG4gIHByaXZhdGUgZ2V0VGFibGVGaWx0ZXJQcmVkaWNhdGUoZGF0YTogb2JqZWN0LCBmaWx0ZXJzOiBUYWJsZUZpbHRlcikge1xuICAgIGNvbnN0IG1hdGNoRmlsdGVyID0gW107XG4gICAgY29uc3QgY29sdW1ucyA9IE9iamVjdC5rZXlzKGZpbHRlcnMpO1xuICAgIGNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgY29uc3Qgc2VhcmNoVmFsdWVzOiBzdHJpbmdbXSA9IGZpbHRlcnNbY29sdW1uXTtcbiAgICAgIGlmIChzZWFyY2hWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGN1c3RvbUZpbHRlciA9IFtdO1xuICAgICAgICBzZWFyY2hWYWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgaWYgKCFkYXRhW2NvbHVtbl0pIHtcbiAgICAgICAgICAgIHJldHVybiBjdXN0b21GaWx0ZXIucHVzaChmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHR5cGUgPSB0aGlzLmRpc3BsYXllZENvbHVtbnMuZmlsdGVyKG8gPT4gby5iaW5kaW5nS2V5ID09PSBjb2x1bW4pWzBdLnR5cGU7XG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgY29uc3QgaXNFcXVhbCA9IHRoaXMuZGF0ZXBpcGUudHJhbnNmb3JtKGRhdGFbY29sdW1uXSwgJ2RkLU1NLXl5JykgPT09IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIGN1c3RvbUZpbHRlci5wdXNoKGlzRXF1YWwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gY3VzdG9tRmlsdGVyLnB1c2goZGF0YVtjb2x1bW5dLnRvU3RyaW5nKCkuaW5jbHVkZXModmFsdWUpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgICAgIG1hdGNoRmlsdGVyLnB1c2goY3VzdG9tRmlsdGVyLnNvbWUoQm9vbGVhbikpOyAvLyBPUlxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtYXRjaEZpbHRlci5ldmVyeShCb29sZWFuKTsgLy8gQU5EXG4gIH1cbiAgZ2V0IGlzU2VhcmNoVmlzaWJsZUZvclNvbWVDb2x1bW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGxheWVkQ29sdW1ucyAmJiB0aGlzLmRpc3BsYXllZENvbHVtbnMuZmlsdGVyKGMgPT4gYy5zZWFyY2hWaXNpYmxlID09PSB0cnVlKS5sZW5ndGggPiAwO1xuICB9XG59XG4iXX0=