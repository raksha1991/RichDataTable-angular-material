import { OnInit, ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatAutocompleteTrigger } from '@angular/material';
export declare class MultiSelectSearchComponent implements OnInit, OnChanges {
    searchContrl: FormControl;
    private autoCompleteContrl;
    filteredOptions$: Observable<string[]>;
    selectedOptions$: BehaviorSubject<string[]>;
    autoCompleteData$: BehaviorSubject<string[]>;
    searchInput: ElementRef<HTMLInputElement>;
    autoComplete: MatAutocompleteTrigger;
    liveChange: EventEmitter<string[]>;
    dataSource: any;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Method to all clear the filter values
     */
    clearFilter(): void;
    /**
     * Method to remove an item from filter
     * @param option - filter string to be removed
     */
    private remove;
    /**
     * Method to add filter to existing filter string
     * @param option - filter string to be added
     */
    private add;
    /**
     * Handler for select/deselect/select-all of items from suggestions
     * @param selectedValue - selected/deselected value
     */
    onOptionSelectionChange(selectedValue: string): void;
    /**
     * Clear search field on focus out without changing searchform control
     */
    _setFocus(isFocussed: any): void;
    /**
     * Getter for selected options
     */
    readonly selectedOptionsValue: string[];
    /**
     * Utility method for filtering the suggestions based on typed value
     * @param value - typed value
     * @param searchData - datasource
     */
    private _filter;
}
