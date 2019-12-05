import { OnInit, OnChanges, TemplateRef, EventEmitter, QueryList, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { MatSort, MatPaginator } from '@angular/material';
import { MultiSelectSearchComponent } from './multi-select-search';
export interface AwardDataColumn {
    text: string;
    bindingKey?: string;
    type: ColumnType;
    iconTooltipBindingKey?: string;
    intialSort?: boolean;
    searchVisible?: boolean;
    columnTemplateRef?: TemplateRef<any>;
}
export declare type SelectMode = 'None' | 'SingleSelect' | 'MultiSelect';
export declare type ColumnType = 'string' | 'date' | 'template';
export declare class RichDataTableAngularComponent implements OnInit, OnChanges {
    datepipe: DatePipe;
    dataSource: any;
    displayedColumns: Array<AwardDataColumn>;
    mode?: SelectMode;
    selectAll?: boolean;
    expandedRowTemplateRef?: TemplateRef<any>;
    isExpandable?: boolean;
    selectionChange: EventEmitter<object>;
    allColumns: string[];
    private filters;
    selection: SelectionModel<object>;
    loading$: BehaviorSubject<boolean>;
    tableData: any;
    intialSort: string;
    expandedElement: object;
    sort: MatSort;
    paginator: MatPaginator;
    searchComponents: QueryList<MultiSelectSearchComponent>;
    constructor(datepipe: DatePipe);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Getter for selected items from table
     */
    getSelectedItems(): any;
    /**
     * Method to clear all selection from Table
     */
    clearSelection(): void;
    toggleRowExpansion(row: any): void;
    /**
     * Utility method to getRowData
     * @param row - row name
     */
    getRowData(row: string): any;
    /**
     * Utility method to check if all items are selected
     */
    isAllSelected(): boolean;
    /**
     * Handler for clearing the filters
     */
    clearFilter(): void;
    /**
     * Hanlder for applying filter on livechange of text in filter
     */
    applyFilter(filters: string[], column: string): void;
    /**
     * Selects all rows if they are not all selected; otherwise clear selection
     */
    masterToggle(): void;
    /**
     * Handler for selection/deselection of items and to emit the change event
     * @param row - Row to be selected/deselected
     */
    onSingleSelectionChange(row: object): void;
    /**
     * Utility method to handle the table selection mode
     */
    private _handleMode;
    /**
     * Utility method to write the filter predicate for table
     * @param data - table data
     * @param filters - key value pair of <column> : <filter string>
     */
    private getTableFilterPredicate;
    readonly isSearchVisibleForSomeColumn: boolean;
}
