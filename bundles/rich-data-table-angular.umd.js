(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/animations'), require('@angular/cdk/collections'), require('rxjs'), require('@angular/material'), require('@angular/forms'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('rich-data-table-angular', ['exports', '@angular/core', '@angular/common', '@angular/animations', '@angular/cdk/collections', 'rxjs', '@angular/material', '@angular/forms', 'rxjs/operators'], factory) :
    (global = global || self, factory(global['rich-data-table-angular'] = {}, global.ng.core, global.ng.common, global.ng.animations, global.ng.cdk.collections, global.rxjs, global.ng.material, global.ng.forms, global.rxjs.operators));
}(this, (function (exports, core, common, animations, collections, rxjs, material, forms, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RichDataTableAngularService = /** @class */ (function () {
        function RichDataTableAngularService() {
        }
        RichDataTableAngularService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        RichDataTableAngularService.ctorParameters = function () { return []; };
        /** @nocollapse */ RichDataTableAngularService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function RichDataTableAngularService_Factory() { return new RichDataTableAngularService(); }, token: RichDataTableAngularService, providedIn: "root" });
        return RichDataTableAngularService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MultiSelectSearchComponent = /** @class */ (function () {
        function MultiSelectSearchComponent() {
            this.searchContrl = new forms.FormControl();
            this.autoCompleteContrl = new forms.FormControl();
            this.selectedOptions$ = new rxjs.BehaviorSubject([]);
            this.autoCompleteData$ = new rxjs.BehaviorSubject([]);
            this.liveChange = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        MultiSelectSearchComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.filteredOptions$ = rxjs.combineLatest(this.searchContrl.valueChanges.pipe(operators.startWith('')), this.autoCompleteData$
                .pipe(operators.startWith([]))
                .pipe(operators.distinctUntilChanged((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.join(',') === b.join(','); }))))
                .pipe(operators.map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), searchValue = _b[0], data = _b[1];
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
                var data = __spread(new Set(changes.dataSource.currentValue));
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
            { type: core.Component, args: [{
                        selector: 'award-multi-select-search',
                        template: "<div class=\"award-multi-select\">\n  <mat-form-field class=\"award-multi-select__form-field\">\n    <div class=\"award-multi-select__text-contianer\">\n      <label *ngIf=\"(selectedOptions$ | async).length > 0\" class=\"mat-body-1\">\n        {{(selectedOptions$ | async)[0]}},\n      </label>\n      <span class=\"mat-body-1\" *ngIf=\"(selectedOptions$ | async).length > 1\">\n        (+{{(selectedOptions$ | async).length - 1}})\n      </span>\n    </div>\n    <div>\n        <input matInput #searchInput [formControl]=\"searchContrl\" [matAutocomplete]=\"auto\" (focus)=\"_setFocus(true)\" (blur)=\"_setFocus(false)\">\n    </div>\n    <mat-icon matPrefix color=\"accent\">search</mat-icon>\n    <mat-icon matSuffix color=\"accent\" *ngIf=\"(selectedOptions$ | async).length\" class=\"award-multi-select__close-icon\" (click)=\"clearFilter()\">\n      close\n    </mat-icon>\n  </mat-form-field>\n  <mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\" (optionSelected)=\"onOptionSelectionChange($event.option.value)\">\n      <div class=\"award-multi-select__select-all\">\n          <mat-checkbox \n          color=\"primary\"\n          [checked]=\"(selectedOptions$ | async).length == (autoCompleteData$ | async).length\"\n          disableRipple=true (change)=\"onOptionSelectionChange('All')\">\n            <span class=\"mat-caption\">select all</span>\n          </mat-checkbox>\n      </div>\n     \n    <mat-option *ngFor=\"let option of filteredOptions$ | async\"\n      [value]=\"option\">\n      <mat-checkbox \n      color=\"primary\"\n      (click)=\"$event.stopPropagation()\"\n      (change)=\"onOptionSelectionChange(option)\"\n      [checked]=\"(selectedOptions$ | async).includes(option) ? true : false\"\n      disableRipple=true>\n      <span class=\"mat-caption\">{{option}}</span>\n      </mat-checkbox> \n      \n    </mat-option>\n  </mat-autocomplete>\n</div>",
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".award-multi-select{width:inherit;overflow:hidden}.award-multi-select__select-all{margin:1rem}.award-multi-select__close-icon{cursor:pointer}.award-multi-select__form-field{width:inherit;margin:.5rem 0;background-color:#f9fafc}.award-multi-select__form-field .mat-form-field-underline{display:none}.award-multi-select__form-field .mat-form-field-wrapper{padding:0}.award-multi-select__form-field .mat-form-field-infix{padding:0;border:none;display:flex}.award-multi-select__form-field .mat-form-field-flex{align-items:center;padding:.07rem}.award-multi-select__text-contianer{display:flex;max-width:80%}.award-multi-select__text-contianer span{flex:0 1 auto}.award-multi-select__text-contianer label{flex:0 1 auto;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}"]
                    }] }
        ];
        /** @nocollapse */
        MultiSelectSearchComponent.ctorParameters = function () { return []; };
        MultiSelectSearchComponent.propDecorators = {
            searchInput: [{ type: core.ViewChild, args: ['searchInput', null,] }],
            autoComplete: [{ type: core.ViewChild, args: ['searchInput', { read: material.MatAutocompleteTrigger, static: true },] }],
            liveChange: [{ type: core.Output }],
            dataSource: [{ type: core.Input }]
        };
        return MultiSelectSearchComponent;
    }());
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
    var AwardMultiSelectSearchModule = /** @class */ (function () {
        function AwardMultiSelectSearchModule() {
        }
        AwardMultiSelectSearchModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            material.MatCheckboxModule,
                            material.MatFormFieldModule,
                            material.MatListModule,
                            material.MatInputModule,
                            material.MatAutocompleteModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            material.MatIconModule
                        ],
                        entryComponents: [],
                        declarations: [
                            MultiSelectSearchComponent
                        ],
                        exports: [
                            MultiSelectSearchComponent
                        ],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return AwardMultiSelectSearchModule;
    }());

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
    var RichDataTableAngularComponent = /** @class */ (function () {
        function RichDataTableAngularComponent(datepipe) {
            this.datepipe = datepipe;
            this.selectionChange = new core.EventEmitter();
            this.allColumns = [];
            this.filters = {};
            this.loading$ = new rxjs.BehaviorSubject(true);
            this.mode = 'None';
            this.selectAll = false;
            this.loading$.next(true);
            this.isExpandable = false;
            this.tableData = new material.MatTableDataSource([]);
        }
        /**
         * @return {?}
         */
        RichDataTableAngularComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.selection = new collections.SelectionModel(this.mode === 'MultiSelect', [], true);
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
                this.selection = new collections.SelectionModel(this.mode === 'MultiSelect', [], true);
                this.tableData = new material.MatTableDataSource(changes.dataSource.currentValue);
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
            { type: core.Component, args: [{
                        selector: 'rich-data-table',
                        template: "<div class=\"rich-data-table\">\n   <mat-table\n   [ngClass]=\"tableData.data.length == 0 || (loading$ | async) ? 'rich-data-table__table' : 'rich-data-table__table max-height'\"\n   mat-table [dataSource]=\"tableData\" matSort [matSortActive]=\"intialSort\" matSortDirection=\"asc\"\n   matSortDisableClear multiTemplateDataRows>\n   <!-- Checkbox Column -->\n   <ng-container matColumnDef=\"select\" *ngIf=\"mode === 'MultiSelect'\">\n       <mat-header-cell *matHeaderCellDef>\n           <mat-checkbox color=\"primary\" (change)=\"$event ? masterToggle() : null\"\n               [checked]=\"selection.hasValue() && isAllSelected()\"\n               [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\n           </mat-checkbox>\n       </mat-header-cell>\n       <mat-cell *matCellDef=\"let row\">\n           <mat-checkbox color=\"primary\" (click)=\"$event.stopPropagation()\"\n               (change)=\"$event ? onSingleSelectionChange(row) : null\" [checked]=\"selection.isSelected(row)\">\n           </mat-checkbox>\n       </mat-cell>\n   </ng-container>\n   <ng-container matColumnDef=\"select\" *ngIf=\"mode === 'SingleSelect'\">\n           <mat-header-cell *matHeaderCellDef>\n           </mat-header-cell>\n           <mat-cell *matCellDef=\"let row\">\n               <mat-radio-button (change)=\"$event ? onSingleSelectionChange(row) : null\" color=\"primary\" [checked]=false></mat-radio-button>\n           </mat-cell>\n       </ng-container>\n   <!-- All Columns -->\n   <ng-container *ngFor=\"let column of displayedColumns\" [matColumnDef]=\"column.bindingKey\">\n       <mat-header-cell *matHeaderCellDef>\n           <div class=\"rich-data-table__table-column-header\">\n               <p mat-sort-header [title]=\"column.text\" [class.addBorder]=\"isSearchVisibleForSomeColumn\">{{column.text}}</p>\n               <award-multi-select-search *ngIf=\"column.searchVisible && tableData\"\n                   (liveChange)=\"applyFilter($event,column.bindingKey)\"\n                   [dataSource]='getRowData(column.bindingKey)'>\n               </award-multi-select-search>\n           </div>\n       </mat-header-cell>\n       <mat-cell *matCellDef=\"let element\"\n           [class]=\"column.iconTooltipBindingKey ? 'rich-data-table__table-icon-cell mat-column-'+ column.bindingKey : 'mat-column-'+ column.bindingKey\">\n           <ng-template [ngIf]=\"column.type === 'template' && column.columnTemplateRef\" [ngIfElse]=\"defaultColumnTemp\">\n               <ng-container \n                   [ngTemplateOutlet]=\"column.columnTemplateRef\" \n                   [ngTemplateOutletContext]=\"{context: element, bindedKey:column.bindingKey}\">\n               </ng-container>\n           </ng-template>\n           <ng-template #defaultColumnTemp>\n               <span *ngIf=\"column.type == 'string'\">{{element[column.bindingKey]}}</span>\n               <span *ngIf=\"column.type == 'date'\">{{element[column.bindingKey] | date: 'yyyy-MM-dd HH:mm'}}</span>\n               <mat-icon *ngIf=\"column.iconTooltipBindingKey\" \n                   [matTooltip]=\"element[column.iconTooltipBindingKey]\"\n                   matTooltipClass='rich-data-table__icon-tooltip' \n                   matTooltipPosition='after' color=\"primary\">\n                   info\n               </mat-icon>\n           </ng-template>\n       </mat-cell>\n   </ng-container>\n   <!-- Expanded content  -->\n   <ng-container matColumnDef=\"expandedDetail\">\n           <mat-cell *matCellDef=\"let element\">\n             <article [@detailExpand]=\"element == expandedElement ? 'expanded' : 'collapsed'\">\n               <ng-container [ngTemplateOutlet]=\"expandedRowTemplateRef\" [ngTemplateOutletContext]=\"{context: element}\">\n               </ng-container>\n           </article>\n           </mat-cell>\n   </ng-container>\n   <mat-header-row *matHeaderRowDef=\"allColumns; sticky: true\"></mat-header-row>\n   <mat-row *matRowDef=\"let row; columns: allColumns;\"\n   [class.rich-data-table__table-row-highlight]=\"expandedElement == row\">\n   </mat-row>\n   <mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"rich-data-table__table-expansion\">\n   </mat-row>\n</mat-table>\n<div class=\"rich-data-table__loading-container\" *ngIf=\"tableData.data.length == 0 || (loading$ | async)\">\n   <mat-spinner color=\"primary\" *ngIf=\"loading$ | async\"></mat-spinner>\n   <span *ngIf=\"(tableData.data.length == 0 && !(loading$ | async)) || !dataSource\">No data to display</span>\n</div>\n<div class=\"rich-data-table__table-footer\">\n   <mat-paginator [pageSizeOptions]=\"[5, 10, 20]\" [pageSize]=\"20\" showFirstLastButtons></mat-paginator>\n   <button mat-button *ngIf=\"isSearchVisibleForSomeColumn\" (click)=\"clearFilter()\">\n       Clear filters\n   </button>\n</div>\n</div>",
                        encapsulation: core.ViewEncapsulation.None,
                        providers: [common.DatePipe],
                        animations: [
                            animations.trigger('detailExpand', [
                                animations.state('collapsed', animations.style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
                                animations.state('expanded', animations.style({ height: '*', visibility: 'visible' })),
                                animations.transition('expanded <=> collapsed', animations.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                            ]),
                        ],
                        styles: [".rich-data-table{display:flex;flex-direction:column;height:100%}.rich-data-table__table{width:100%;overflow:auto}.rich-data-table__table.max-height{flex:1 1 auto}.rich-data-table__table award-multi-select-search{width:98%}.rich-data-table__table .mat-header-row{border-color:#d3d3d3;align-items:baseline;min-height:2.5rem}.rich-data-table__table .mat-row{min-height:36px;border-color:#d3d3d3}.rich-data-table__table .mat-header-cell:first-of-type{padding-left:0}.rich-data-table__table .mat-header-cell:last-of-type{padding-right:0}.rich-data-table__table mat-cell{word-break:break-all}.rich-data-table__table mat-cell:first-of-type{padding-left:0}.rich-data-table__table mat-cell:last-of-type{padding-right:0}.rich-data-table__table mat-cell .mat-icon{font-size:1.2rem;margin-left:.3rem;line-height:1.2;cursor:pointer}.rich-data-table__table .mat-column-select{flex:0 0 4.5%;padding-left:1rem}.rich-data-table__table .mat-column-select.mat-cell:first-of-type,.rich-data-table__table .mat-column-select.mat-header-cell:first-of-type{padding-left:1rem}.rich-data-table__table-row-highlight{border-bottom:none}.rich-data-table__table-expansion.mat-row{min-height:0;border:none}.rich-data-table__table-expansion article{width:100%;border-bottom:1px solid #d3d3d3}.rich-data-table__table-column-header{width:100%}.rich-data-table__table-column-header .addBorder{border-bottom:1px solid #d3d3d3}.rich-data-table__table-column-header .mat-sort-header-button{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:-ms-grid;display:grid}.rich-data-table__loading-container{place-items:center;flex:1 1 auto;display:flex;place-content:center;border-bottom:1px solid #d3d3d3;padding:1rem}.rich-data-table__table-icon{white-space:pre-line}.rich-data-table__table-icon-cell{display:-ms-grid;display:grid;grid:auto/minmax(auto,2.3rem) auto}.rich-data-table__table-icon-cell span{text-align:right}.rich-data-table__table-footer{display:flex;place-content:flex-end}.rich-data-table__icon-tooltip{white-space:pre;font-size:12px;opacity:.9}"]
                    }] }
        ];
        /** @nocollapse */
        RichDataTableAngularComponent.ctorParameters = function () { return [
            { type: common.DatePipe }
        ]; };
        RichDataTableAngularComponent.propDecorators = {
            dataSource: [{ type: core.Input }],
            displayedColumns: [{ type: core.Input }],
            mode: [{ type: core.Input }],
            selectAll: [{ type: core.Input }],
            expandedRowTemplateRef: [{ type: core.Input }],
            isExpandable: [{ type: core.Input }],
            selectionChange: [{ type: core.Output }],
            sort: [{ type: core.ViewChild, args: [material.MatSort, null,] }],
            paginator: [{ type: core.ViewChild, args: [material.MatPaginator, { static: true },] }],
            searchComponents: [{ type: core.ViewChildren, args: [MultiSelectSearchComponent, null,] }]
        };
        return RichDataTableAngularComponent;
    }());
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
    var RichDataTableAngularModule = /** @class */ (function () {
        function RichDataTableAngularModule() {
        }
        RichDataTableAngularModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [RichDataTableAngularComponent],
                        imports: [
                            common.CommonModule,
                            material.MatTableModule,
                            material.MatButtonModule,
                            material.MatIconModule,
                            material.MatCheckboxModule,
                            material.MatPaginatorModule,
                            material.MatProgressSpinnerModule,
                            material.MatNativeDateModule,
                            material.MatSortModule,
                            material.MatTooltipModule,
                            material.MatRadioModule,
                            material.MatIconModule,
                            AwardMultiSelectSearchModule
                        ],
                        exports: [RichDataTableAngularComponent]
                    },] }
        ];
        return RichDataTableAngularModule;
    }());

    exports.RichDataTableAngularComponent = RichDataTableAngularComponent;
    exports.RichDataTableAngularModule = RichDataTableAngularModule;
    exports.RichDataTableAngularService = RichDataTableAngularService;
    exports.ɵa = MultiSelectSearchComponent;
    exports.ɵb = AwardMultiSelectSearchModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=rich-data-table-angular.umd.js.map
