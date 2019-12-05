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
export class RichDataTableAngularComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmljaC1kYXRhLXRhYmxlLWFuZ3VsYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmljaC1kYXRhLXRhYmxlLWFuZ3VsYXIvIiwic291cmNlcyI6WyJsaWIvcmljaC1kYXRhLXRhYmxlLWFuZ3VsYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFhLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUNsRixZQUFZLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFFbkUscUNBUUM7OztJQVBDLCtCQUFhOztJQUNiLHFDQUFvQjs7SUFDcEIsK0JBQWlCOztJQUNqQixnREFBK0I7O0lBQy9CLHFDQUFxQjs7SUFDckIsd0NBQXdCOztJQUN4Qiw0Q0FBcUM7Ozs7O0FBTXZDLDBCQUVDO0FBZ0JELE1BQU0sT0FBTyw2QkFBNkI7Ozs7SUFvQ3hDLFlBQW1CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFmckMsb0JBQWUsR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVuRSxlQUFVLEdBQWEsRUFBRSxDQUFDO1FBQ2xCLFlB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REFDb0I7O0lBRXBCLCtEQUMwQzs7SUFFMUMscURBQ3VCOztJQUV2Qix3REFDbUU7O0lBRW5FLG1EQUEwQjs7Ozs7SUFDMUIsZ0RBQWtDOztJQUNsQyxrREFBa0M7O0lBQ2xDLGlEQUE4Qzs7SUFDOUMsa0RBQVU7O0lBQ1YsbURBQW1COztJQUNuQix3REFBd0I7O0lBRXhCLDZDQUF3Qzs7SUFDeEMsa0RBQW1FOztJQUNuRSx5REFBd0c7O0lBRzVGLGlEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgT25DaGFuZ2VzLCBJbnB1dCwgVGVtcGxhdGVSZWYsIE91dHB1dCwgXG4gIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdFNvcnQsIE1hdFBhZ2luYXRvciwgTWF0VGFibGVEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTXVsdGlTZWxlY3RTZWFyY2hDb21wb25lbnQgfSBmcm9tICcuL211bHRpLXNlbGVjdC1zZWFyY2gnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF3YXJkRGF0YUNvbHVtbiB7XG4gIHRleHQ6IHN0cmluZztcbiAgYmluZGluZ0tleT86IHN0cmluZztcbiAgdHlwZTogQ29sdW1uVHlwZTtcbiAgaWNvblRvb2x0aXBCaW5kaW5nS2V5Pzogc3RyaW5nO1xuICBpbnRpYWxTb3J0PzogYm9vbGVhbjtcbiAgc2VhcmNoVmlzaWJsZT86IGJvb2xlYW47XG4gIGNvbHVtblRlbXBsYXRlUmVmPzogVGVtcGxhdGVSZWY8YW55Pjtcbn1cblxuZXhwb3J0IHR5cGUgU2VsZWN0TW9kZSA9ICdOb25lJyB8ICdTaW5nbGVTZWxlY3QnIHwgJ011bHRpU2VsZWN0JztcbmV4cG9ydCB0eXBlIENvbHVtblR5cGUgPSAnc3RyaW5nJyB8ICdkYXRlJyB8ICd0ZW1wbGF0ZSc7XG5cbmludGVyZmFjZSBUYWJsZUZpbHRlciB7XG4gIFtjb2x1bW46IHN0cmluZ106IHN0cmluZ1tdO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdyaWNoLWRhdGEtdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmljaC1kYXRhLXRhYmxlLWFuZ3VsYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yaWNoLWRhdGEtdGFibGUtYW5ndWxhci5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcm92aWRlcnM6IFtEYXRlUGlwZV0sXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdkZXRhaWxFeHBhbmQnLCBbXG4gICAgICBzdGF0ZSgnY29sbGFwc2VkJywgc3R5bGUoe2hlaWdodDogJzBweCcsIG1pbkhlaWdodDogJzAnLCB2aXNpYmlsaXR5OiAnaGlkZGVuJ30pKSxcbiAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHtoZWlnaHQ6ICcqJywgdmlzaWJpbGl0eTogJ3Zpc2libGUnfSkpLFxuICAgICAgdHJhbnNpdGlvbignZXhwYW5kZWQgPD0+IGNvbGxhcHNlZCcsIGFuaW1hdGUoJzIyNW1zIGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKScpKSxcbiAgICBdKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUmljaERhdGFUYWJsZUFuZ3VsYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KClcbiAgZGF0YVNvdXJjZTtcblxuICBASW5wdXQoKVxuICBkaXNwbGF5ZWRDb2x1bW5zOiBBcnJheTxBd2FyZERhdGFDb2x1bW4+O1xuXG4gIEBJbnB1dCgpXG4gIG1vZGU/OiBTZWxlY3RNb2RlO1xuXG4gIEBJbnB1dCgpXG4gIHNlbGVjdEFsbD86IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgZXhwYW5kZWRSb3dUZW1wbGF0ZVJlZj86IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgQElucHV0KClcbiAgaXNFeHBhbmRhYmxlPzogYm9vbGVhbjtcblxuICBAT3V0cHV0KClcbiAgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8b2JqZWN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8b2JqZWN0PigpO1xuXG4gIGFsbENvbHVtbnM6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgZmlsdGVyczogVGFibGVGaWx0ZXIgPSB7fTtcbiAgc2VsZWN0aW9uOiBTZWxlY3Rpb25Nb2RlbDxvYmplY3Q+O1xuICBsb2FkaW5nJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4odHJ1ZSk7XG4gIHRhYmxlRGF0YTtcbiAgaW50aWFsU29ydDogc3RyaW5nO1xuICBleHBhbmRlZEVsZW1lbnQ6IG9iamVjdDtcblxuICBAVmlld0NoaWxkKE1hdFNvcnQsIG51bGwpIHNvcnQ6IE1hdFNvcnQ7XG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yLCB7IHN0YXRpYzogdHJ1ZSB9KSBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcbiAgQFZpZXdDaGlsZHJlbihNdWx0aVNlbGVjdFNlYXJjaENvbXBvbmVudCwgbnVsbCkgc2VhcmNoQ29tcG9uZW50czogUXVlcnlMaXN0PE11bHRpU2VsZWN0U2VhcmNoQ29tcG9uZW50PjtcblxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBkYXRlcGlwZTogRGF0ZVBpcGUpIHtcbiAgICB0aGlzLm1vZGUgPSAnTm9uZSc7XG4gICAgdGhpcy5zZWxlY3RBbGwgPSBmYWxzZTtcbiAgICB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSk7XG4gICAgdGhpcy5pc0V4cGFuZGFibGUgPSBmYWxzZTtcbiAgICB0aGlzLnRhYmxlRGF0YSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UoW10pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uTW9kZWw8b2JqZWN0Pih0aGlzLm1vZGUgPT09ICdNdWx0aVNlbGVjdCcsIFtdLCB0cnVlKTtcbiAgICBpZiAodGhpcy5kaXNwbGF5ZWRDb2x1bW5zKSB7XG4gICAgICB0aGlzLmRpc3BsYXllZENvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgIGlmICghY29sdW1uLmJpbmRpbmdLZXkpIHtcbiAgICAgICAgICBjb2x1bW4uYmluZGluZ0tleSA9IGNvbHVtbi50ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2x1bW4uc2VhcmNoVmlzaWJsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBjb2x1bW4uc2VhcmNoVmlzaWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5hbGxDb2x1bW5zID0gdGhpcy5hbGxDb2x1bW5zLmNvbmNhdCh0aGlzLmRpc3BsYXllZENvbHVtbnMubWFwKGNvbHVtbiA9PiBjb2x1bW4uYmluZGluZ0tleSkpO1xuICAgICAgdGhpcy5faGFuZGxlTW9kZSgpO1xuICAgICAgY29uc3QgaW50aWFsU29ydCA9IHRoaXMuZGlzcGxheWVkQ29sdW1ucy5maWx0ZXIoZCA9PiBkLmludGlhbFNvcnQgPT09IHRydWUpO1xuICAgICAgdGhpcy5pbnRpYWxTb3J0ID0gaW50aWFsU29ydC5sZW5ndGggPyBpbnRpYWxTb3J0WzBdLmJpbmRpbmdLZXkgOiAnJztcbiAgICB9XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmRhdGFTb3VyY2UgJiYgY2hhbmdlcy5kYXRhU291cmNlLmN1cnJlbnRWYWx1ZSkge1xuICAgICAgaWYgKGNoYW5nZXMuZGF0YVNvdXJjZS5jdXJyZW50VmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5sb2FkaW5nJC5uZXh0KGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbk1vZGVsPG9iamVjdD4odGhpcy5tb2RlID09PSAnTXVsdGlTZWxlY3QnLCBbXSwgdHJ1ZSk7XG4gICAgICB0aGlzLnRhYmxlRGF0YSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UoY2hhbmdlcy5kYXRhU291cmNlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICB0aGlzLnRhYmxlRGF0YS5maWx0ZXJQcmVkaWNhdGUgPVxuICAgICAgICAoZGF0YTogb2JqZWN0LCBmaWx0ZXJzOiBUYWJsZUZpbHRlcikgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldFRhYmxlRmlsdGVyUHJlZGljYXRlKGRhdGEsIGZpbHRlcnMpO1xuICAgICAgICB9O1xuICAgICAgdGhpcy50YWJsZURhdGEucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICB0aGlzLnRhYmxlRGF0YS5zb3J0ID0gdGhpcy5zb3J0O1xuICAgICAgdGhpcy5jbGVhckZpbHRlcigpO1xuICAgICAgaWYgKHRoaXMuc2VsZWN0QWxsICYmIHRoaXMubW9kZSA9PT0gJ011bHRpU2VsZWN0Jykge1xuICAgICAgICB0aGlzLnRhYmxlRGF0YS5kYXRhLmZvckVhY2gocm93ID0+IHRoaXMuc2VsZWN0aW9uLnNlbGVjdChyb3cpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEdldHRlciBmb3Igc2VsZWN0ZWQgaXRlbXMgZnJvbSB0YWJsZVxuICAgKi9cbiAgcHVibGljIGdldFNlbGVjdGVkSXRlbXMoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQ7XG4gIH1cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBjbGVhciBhbGwgc2VsZWN0aW9uIGZyb20gVGFibGVcbiAgICovXG4gIHB1YmxpYyBjbGVhclNlbGVjdGlvbigpIHtcbiAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpO1xuICB9XG4gIHB1YmxpYyB0b2dnbGVSb3dFeHBhbnNpb24ocm93KSB7XG4gICAgaWYgKHRoaXMuaXNFeHBhbmRhYmxlKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkRWxlbWVudCA9IHRoaXMuZXhwYW5kZWRFbGVtZW50ID09PSByb3cgPyBudWxsIDogcm93O1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVXRpbGl0eSBtZXRob2QgdG8gZ2V0Um93RGF0YVxuICAgKiBAcGFyYW0gcm93IC0gcm93IG5hbWVcbiAgICovXG4gIHB1YmxpYyBnZXRSb3dEYXRhKHJvdzogc3RyaW5nKSB7XG4gICAgY29uc3QgY29sdW1uOiBBd2FyZERhdGFDb2x1bW4gPSB0aGlzLmRpc3BsYXllZENvbHVtbnMuZmlsdGVyKG8gPT4gby5iaW5kaW5nS2V5ID09PSByb3cpWzBdO1xuICAgIGlmIChjb2x1bW4udHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICByZXR1cm4gdGhpcy50YWJsZURhdGEgJiYgdGhpcy50YWJsZURhdGEuZGF0YS5tYXAobyA9PiB0aGlzLmRhdGVwaXBlLnRyYW5zZm9ybShvW3Jvd10sICd5eXl5LU1NLWRkIEhIOm1tJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy50YWJsZURhdGEgJiYgdGhpcy50YWJsZURhdGEuZGF0YS5tYXAobyA9PiBvW3Jvd10pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVXRpbGl0eSBtZXRob2QgdG8gY2hlY2sgaWYgYWxsIGl0ZW1zIGFyZSBzZWxlY3RlZFxuICAgKi9cbiAgcHVibGljIGlzQWxsU2VsZWN0ZWQoKSB7XG4gICAgY29uc3QgbnVtU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XG4gICAgY29uc3QgbnVtUm93cyA9IHRoaXMudGFibGVEYXRhLmZpbHRlcmVkRGF0YS5sZW5ndGggP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYmxlRGF0YS5maWx0ZXJlZERhdGEubGVuZ3RoIDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJsZURhdGEuZGF0YS5sZW5ndGg7XG4gICAgcmV0dXJuIG51bVNlbGVjdGVkID09PSBudW1Sb3dzO1xuICB9XG4gIC8qKlxuICAgKiBIYW5kbGVyIGZvciBjbGVhcmluZyB0aGUgZmlsdGVyc1xuICAgKi9cbiAgY2xlYXJGaWx0ZXIoKSB7XG4gICAgaWYgKHRoaXMuc2VhcmNoQ29tcG9uZW50cykge1xuICAgICAgdGhpcy5zZWFyY2hDb21wb25lbnRzLmZvckVhY2goc2VhcmNoQ29tcG9uZW50ID0+IHNlYXJjaENvbXBvbmVudC5jbGVhckZpbHRlcigpKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEhhbmxkZXIgZm9yIGFwcGx5aW5nIGZpbHRlciBvbiBsaXZlY2hhbmdlIG9mIHRleHQgaW4gZmlsdGVyXG4gICAqL1xuICBwdWJsaWMgYXBwbHlGaWx0ZXIoZmlsdGVyczogc3RyaW5nW10sIGNvbHVtbjogc3RyaW5nKSB7XG4gICAgdGhpcy5maWx0ZXJzW2NvbHVtbl0gPSBmaWx0ZXJzO1xuICAgIHRoaXMudGFibGVEYXRhLmZpbHRlciA9IHRoaXMuZmlsdGVycztcbiAgfVxuICAvKipcbiAgICogU2VsZWN0cyBhbGwgcm93cyBpZiB0aGV5IGFyZSBub3QgYWxsIHNlbGVjdGVkOyBvdGhlcndpc2UgY2xlYXIgc2VsZWN0aW9uXG4gICAqL1xuICBwdWJsaWMgbWFzdGVyVG9nZ2xlKCkge1xuICAgIHRoaXMuaXNBbGxTZWxlY3RlZCgpID9cbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCkgOlxuICAgICAgKHRoaXMudGFibGVEYXRhLmZpbHRlcmVkRGF0YS5sZW5ndGggPyB0aGlzLnRhYmxlRGF0YS5maWx0ZXJlZERhdGEgOiB0aGlzLnRhYmxlRGF0YS5kYXRhKVxuICAgICAgLmZvckVhY2gocm93ID0+IHRoaXMuc2VsZWN0aW9uLnNlbGVjdChyb3cpKTtcbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuZ2V0U2VsZWN0ZWRJdGVtcygpKTtcbiAgfVxuICAvKipcbiAgICogSGFuZGxlciBmb3Igc2VsZWN0aW9uL2Rlc2VsZWN0aW9uIG9mIGl0ZW1zIGFuZCB0byBlbWl0IHRoZSBjaGFuZ2UgZXZlbnRcbiAgICogQHBhcmFtIHJvdyAtIFJvdyB0byBiZSBzZWxlY3RlZC9kZXNlbGVjdGVkXG4gICAqL1xuICBwdWJsaWMgb25TaW5nbGVTZWxlY3Rpb25DaGFuZ2Uocm93OiBvYmplY3QpIHtcbiAgICB0aGlzLnNlbGVjdGlvbi50b2dnbGUocm93KTtcbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuZ2V0U2VsZWN0ZWRJdGVtcygpKTtcbiAgfVxuICAvKipcbiAgICogVXRpbGl0eSBtZXRob2QgdG8gaGFuZGxlIHRoZSB0YWJsZSBzZWxlY3Rpb24gbW9kZVxuICAgKi9cbiAgcHJpdmF0ZSBfaGFuZGxlTW9kZSgpIHtcbiAgICBpZiAoKHRoaXMubW9kZSA9PT0gJ011bHRpU2VsZWN0JyB8fCB0aGlzLm1vZGUgPT09ICdTaW5nbGVTZWxlY3QnKSAmJiAhdGhpcy5hbGxDb2x1bW5zLmluY2x1ZGVzKCdzZWxlY3QnKSkge1xuICAgICAgdGhpcy5hbGxDb2x1bW5zLnVuc2hpZnQoJ3NlbGVjdCcpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnTm9uZScpIHtcbiAgICAgIGxldCBpbmRleCA9IHRoaXMuYWxsQ29sdW1ucy5pbmRleE9mKCdzZWxlY3QnKTtcbiAgICAgIGluZGV4ID49IDAgPyBpbmRleCA9IGluZGV4IDogaW5kZXggPSB0aGlzLmFsbENvbHVtbnMuaW5kZXhPZignYWN0aW9uJyk7XG4gICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLmFsbENvbHVtbnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFV0aWxpdHkgbWV0aG9kIHRvIHdyaXRlIHRoZSBmaWx0ZXIgcHJlZGljYXRlIGZvciB0YWJsZVxuICAgKiBAcGFyYW0gZGF0YSAtIHRhYmxlIGRhdGFcbiAgICogQHBhcmFtIGZpbHRlcnMgLSBrZXkgdmFsdWUgcGFpciBvZiA8Y29sdW1uPiA6IDxmaWx0ZXIgc3RyaW5nPlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRUYWJsZUZpbHRlclByZWRpY2F0ZShkYXRhOiBvYmplY3QsIGZpbHRlcnM6IFRhYmxlRmlsdGVyKSB7XG4gICAgY29uc3QgbWF0Y2hGaWx0ZXIgPSBbXTtcbiAgICBjb25zdCBjb2x1bW5zID0gT2JqZWN0LmtleXMoZmlsdGVycyk7XG4gICAgY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICBjb25zdCBzZWFyY2hWYWx1ZXM6IHN0cmluZ1tdID0gZmlsdGVyc1tjb2x1bW5dO1xuICAgICAgaWYgKHNlYXJjaFZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgY3VzdG9tRmlsdGVyID0gW107XG4gICAgICAgIHNlYXJjaFZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICBpZiAoIWRhdGFbY29sdW1uXSkge1xuICAgICAgICAgICAgcmV0dXJuIGN1c3RvbUZpbHRlci5wdXNoKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMuZGlzcGxheWVkQ29sdW1ucy5maWx0ZXIobyA9PiBvLmJpbmRpbmdLZXkgPT09IGNvbHVtbilbMF0udHlwZTtcbiAgICAgICAgICBpZiAodHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICBjb25zdCBpc0VxdWFsID0gdGhpcy5kYXRlcGlwZS50cmFuc2Zvcm0oZGF0YVtjb2x1bW5dLCAnZGQtTU0teXknKSA9PT0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gY3VzdG9tRmlsdGVyLnB1c2goaXNFcXVhbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjdXN0b21GaWx0ZXIucHVzaChkYXRhW2NvbHVtbl0udG9TdHJpbmcoKS5pbmNsdWRlcyh2YWx1ZSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICAgICAgbWF0Y2hGaWx0ZXIucHVzaChjdXN0b21GaWx0ZXIuc29tZShCb29sZWFuKSk7IC8vIE9SXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hdGNoRmlsdGVyLmV2ZXJ5KEJvb2xlYW4pOyAvLyBBTkRcbiAgfVxuICBnZXQgaXNTZWFyY2hWaXNpYmxlRm9yU29tZUNvbHVtbigpIHtcbiAgICByZXR1cm4gdGhpcy5kaXNwbGF5ZWRDb2x1bW5zICYmIHRoaXMuZGlzcGxheWVkQ29sdW1ucy5maWx0ZXIoYyA9PiBjLnNlYXJjaFZpc2libGUgPT09IHRydWUpLmxlbmd0aCA+IDA7XG4gIH1cbn1cbiJdfQ==