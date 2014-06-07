// Digikey Sort By Price: Uses AJAX to fetch pages from digikey, sorts by price,
//                        and filters the table
// version 020, 2010-08-22
// Copyright (c) 2010, Alex Leone (acleone ~at~ gmail.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Digikey Sort By Price", and click Uninstall.
//
// This script should also work in Chrome.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Digikey Sort By Price
// @namespace     http://students.washington.edu/acleone/
// @version       2.1
// @description   sorts by price after using AJAX to fetch all pages
// @include       http://search.digikey.com/scripts/DkSearch/dksus.dll*
// ==/UserScript==
/*
How to update the verison #:
  1. Change the version number above.
  2. Set the VERSION constant to the same number.
*/

function _log(s) {
    GM_log("[sort_by_p] " + s);
}

function _error(s) {
    s = "Error: " + s;
    _log(s);
    if (ui !== null) {
        ui.add_error(s);
    }
}

var CONTENT_DIV_ID = 'content',
    CONTENT_DIV_START_RE = /<div id="content">/i,
    CONTENT_DIV_END_RE = /<\/div>\s*<div id="noprint">/i,
    PARTS_PAGE_HELP_HREF_RE = /help04\.html/i,
    PAGE_NUMS_RE = /Page ([\d,.]+)\s*\/\s*([\d,.]+)/i,
    NEXTPAGE_FORM_NAME = 'srform',
    NEXTPAGE_PAGE_FIELD = 'page',
    THOUSANDS_SEP_RE = /,/g,
    CHECK_FOR_UPDATES_EVERY = 1000*60*60*6, // check for updates every 6 hours
    UPDATE_URL = 'http://userscripts.org/scripts/source/50519.meta.js',
    HOME1_URL = 'http://students.washington.edu/acleone/codes' +
                '/greasemonkey/digikey_sort_by_price/',
    HOME2_URL = 'http://userscripts.org/scripts/show/50519',
    HELP_URL = 'http://students.washington.edu/acleone/codes' +
               '/greasemonkey/digikey_sort_by_price/help_v020.html',
    VERSION = '2.1',
    VERSION_RE = /\/\/\s*@version\s+([0-9.]+)/i;

var table_data = null, // an instance of TableData.
    ui = null, // an instance of SbpUI.
    requestor = null, // an instance of Requestor.
    pref_storage = null, // an instance of PrefStorage.
    update_checker = null, // an instance of UpdateChecker.
    _update_avail_shown = false;

function main() {
    pref_storage = new PrefStorage();
    pref_storage.init();
    if (pref_storage.get("version", 'null') !== VERSION) {
        pref_storage.clear();
        pref_storage.set("version", VERSION);
    }
    update_checker = new UpdateChecker();
    update_checker.init();
    var parser = new HtmlTextParser(null);
    parser._content_div = document.getElementById(CONTENT_DIV_ID);
    if (!parser._content_div) {
        _error('No <div id="content">!');
        return false;
    }
    if (!parser.parse()) {
        _error("Parsing Unsuccessful!");
        return false;
    }
    if (!parser.is_parts_page()) {
        _error("Not a parts page!");
        return false;
    }
    table_data = new TableData();
    ui = new SbpUI(table_data, parser._content_div);
    ui.init();
    if (!parser.get_table_data(table_data)) {
        _error("Couldn't get table data!");
        return false;
    }
    ui.table_data_ui.build_table_start_html(parser._parts_table);
    ui.loading_ui.update_nparts();

    var page_nums = parser.get_page_nums();
    return (page_nums === null)? main_single_page(parser) :
                                 main_multi_page(parser, page_nums);
}

function main_single_page(parser) {
    _log("Single parts page.");
    on_ajax_done();
    return true;
}

function main_multi_page(parser, page_nums) {
    _log("On page " + page_nums.cur_page + " of " + page_nums.out_of);
    ui.loading_ui.set_out_of(page_nums.out_of);
    var nextpage_form = parser.get_nextpage_form();
    if (nextpage_form === null) {
        _error("Couldn't find the nextpage form!");
        return false;
    }
    var page_input = parser.get_page_input();
    if (page_input === null) {
        _error('nextpage form has no <input name="page">!');
        return false;
    }
    var orig_page_val = parseInt(page_input.value, 10);
    if (orig_page_val !== page_nums.cur_page) {
        _error("nextpage form page doesn't match Page n/N text!");
        return false;
    }

    if (page_nums.out_of >= 50 && !confirm("[Digikey Sort By Price] Fetch "
                                           + page_nums.out_of + " pages?")) {
        _error("User cancelled large fetch!");
        return false;
    }
    var i, requests = [];
    for (i = 1; i <= page_nums.out_of; i += 1) {
        if (i === page_nums.cur_page) {
            continue;
        }
        page_input.value = i.toString();
        requests.push({
            req_details: {
                method: "POST",
                url: window.location.href,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: _get_form_post_data(nextpage_form)
            },
            page_nums: {
                cur_page: i,
                out_of: page_nums.out_of
            }
        });
    }
    // set this back to what it was originally.
    page_input.value = orig_page_val.toString();

    // start making requests
    requestor = new Requestor({
        requests: requests,
        retries: 3,
        concurrent: 4,
        onload: on_ajax_page_load,
        onerror: on_ajax_error,
        ondone: on_ajax_done
    });
    return true;
}

function _ajax_error(res, msg) {
    _error("[ajax] " + msg);
    _error("[ajax] res.responseText: \r\n" + res.responseText);
    requestor.stop();
}

function on_ajax_page_load(res, req) {
    if (res.status !== 200) {
        _ajax_error(res, "res.status !== 200: " + res.status);
        return;
    }
    var parser = new HtmlTextParser(res.responseText);
    if (!parser.parse()) {
        _ajax_error(res, "Parsing Unsuccessful!");
        return false;
    }
    if (!parser.is_parts_page()) {
        _ajax_error(res, "Not a parts page!");
        return false;
    }
    if (!parser.get_table_data(table_data)) {
        _ajax_error(res, "Couldn't get table data!");
        return false;
    }
    var pn = parser.get_page_nums();
    if (pn === null) {
        _ajax_error(res, "No page numbers found!");
        return false;
    }
    if (pn.cur_page !== req.page_nums.cur_page
        || pn.out_of !== req.page_nums.out_of) {
        _ajax_error(res, "Page numbers don't match expected values: "
                    + pn.cur_page + '/' + pn.out_of + " != "
                    + req.page_nums.cur_page + '/' + req.page_nums.out_of);
        return false;
    }
    ui.loading_ui.inc_npages_loaded();
    ui.loading_ui.update_nparts();
}

function on_ajax_error() {
    _error("Page fetching failed!");
}

function on_ajax_done() {
    _log("Page fetching done!");
    ui.loading_ui.done();
    ui.build_new_content_div();
    ui.sort_ui.update();
    setTimeout(function () {
        ui.tdata.filter();
        ui.tdata.sort();
        ui.table_data_ui.update_table();
    }, 10);
}

//=============================================================================
//          Extracting data from the page
//=============================================================================

function HtmlTextParser(html) {
    this._html = html;
    this._content_div_html = null;
    this._content_div = null;
    this._parts_table = null;
    this._parts_table_tbody = null;
    this._nextpage_form = null;
}

HtmlTextParser.prototype = {
    _build_content_div: function () {
        var cstart = CONTENT_DIV_START_RE.exec(this._html);
        if (cstart === null) {
            _error("No match for CONTENT_DIV_START_RE: '" +
                   CONTENT_DIV_START_RE.toString() + "'!");
            return false;
        }
        var cstop = CONTENT_DIV_END_RE.exec(
            this._html.substring(cstart.index));
        if (cstop === null) {
            _error("No match for CONTENT_DIV_END_RE: '" +
                   CONTENT_DIV_END_RE.toString() + "'!");
            return false;
        }
        this._content_div_html = this._html.substring(
            cstart.index + cstart[0].length, cstop.index + cstart.index);
        this._content_div = document.createElement('div');
        this._content_div.innerHTML = this._content_div_html;
        return true;
    },
    parse: function () {
        /**
         * @returns true if the page was successfully parsed, false otherwise.
         */
        if (this._content_div === null && !this._build_content_div()) {
            return false;
        }
        var tables = this._content_div.getElementsByTagName('table');
        if (!tables.length) {
            _error("No tables in content div!");
            return false;
        }
        this._parts_table = tables[tables.length - 1];

        var tHead = this._parts_table.tHead;
        if (!tHead) {
            _error("Parts table has no thead!");
            return false;
        }
        if (tHead.rows.length !== 2) {
            _error("Parts table thead has the wrong number of rows!");
            return false;
        }

        var tBodies = this._parts_table.tBodies;
        if (!tBodies.length) {
            _error("Parts table has no tbody!");
            return false;
        }
        this._parts_table_tbody = tBodies[tBodies.length - 1];
        return true;
    },
    is_parts_page: function () {
        /**
         * @returns true if this is a parts page, false otherwise.
         */
        var i, as = this._content_div.getElementsByTagName('a');
        for (i = as.length - 1; i >= 0; i -= 1) {
            if (PARTS_PAGE_HELP_HREF_RE.test(as[i].href)) {
                return true;
            }
        }
        return false;
    },
    get_page_nums: function () {
        /**
         * @returns an object {cur_page: 2, out_of: 12}, or null.
         */
        var html = ((this._content_div_html)? this._content_div_html
                        : this._content_div.innerHTML),
            match = PAGE_NUMS_RE.exec(html);
        if (match !== null) {
            return {
                cur_page: parseInt(match[1]
                                   .replace(THOUSANDS_SEP_RE, ''), 10),
                out_of: parseInt(match[2]
                                 .replace(THOUSANDS_SEP_RE, ''), 10)
            };
        }
        return null;
    },
    get_nextpage_form: function () {
        /**
         * @returns the next-page form dom element or null.
         */
        var i, forms = this._content_div.getElementsByTagName('form');
        for (i = forms.length - 1; i >= 0; i -= 1) {
            if (forms[i].name === NEXTPAGE_FORM_NAME) {
                this._nextpage_form = forms[i];
                return forms[i];
            }
        }
        return null;
    },
    get_page_input: function () {
        if (this._nextpage_form === null) {
            this.get_nextpage_form();
            if (this._nextpage_form === null) {
                return null;
            }
        }
        var i, inputs = this._nextpage_form.getElementsByTagName('input');
        for (i = 0; i < inputs.length; i += 1) {
            if (inputs[i].name === NEXTPAGE_PAGE_FIELD) {
                return inputs[i];
            }
        }
        return null;
    },
    get_table_data: function (add_to) {
        /**
         * Adds table data to `add_to`.
         * @param add_to -- instance of TableData
         * @returns true
         */
        var i, rows = this._parts_table_tbody.rows;
        for (i = 0; i < rows.length; i += 1) {
            add_to.add(rows[i]);
        }
        return true;
    }

};

function _get_form_post_data(form) {
    /**
     * @param form a <form> dom element
     * @returns a uri string suitable for POST-ing from all the inputs with
     *          `name` and `value` attributes.
     */
    var inputs = form.getElementsByTagName('input'),
        i, input, encoded = [];
    for (i = 0; i < inputs.length; i += 1) {
        input = inputs[i];
        if (input.hasAttribute('name') && input.hasAttribute('value')) {
            encoded.push(encodeURIComponent(input.name) + "=" +
                         encodeURIComponent(input.value));
        }
    }
    return encoded.join('&');
}

//=============================================================================
//          Data Structure
//=============================================================================

function TableData() {
    this._data = [];
    /**
     * _data format:
     * _data[0] -- the outerHTML of the <tr> from digikey
     * _data[1:] -- {t: td.textContent, f: parseFloat Number} for each td.
     *              if parseFloat returns NaN, then f will be Infinity.
     */
    this._filtered_data = [];

    this._col_names = null;
    this.cols = null; // instance of Cols.
}

TableData.prototype = {
    add: function (tr) {
        /**
         * tr {Dom Element} -- a <tr> to extract data from.
         */
        var i, td_text, f, row = [_get_outer_html(tr)], cells = tr.cells;
        for (i = 0; i < cells.length; i += 1) {
            td_text = cells[i].textContent;
            f = parseFloat(td_text.replace(THOUSANDS_SEP_RE, ''));
            if (isNaN(f)) {
                f = Infinity;
            }
            row.push({
                t: td_text,
                f: f
            });
        }
        this._data.push(row);
    },
    set_col_names: function (tr) {
        /**
         * Sets the column names from a <tr> node.
         * @param tr {Dom Element} -- the <tr> with column names.
         */
        var i;
        this._col_names = [];
        for (i = 0; i < tr.cells.length; i += 1) {
            this._col_names.push(tr.cells[i].textContent);
        }
        this.cols = new Cols(this);
    },
    get_col_names: function () {
        return this._col_names;
    },
    get_col_name: function (c) {
        return this._col_names[c];
    },
    nrows: function () {
        /**
         * @returns {Number} -- number of rows.
         */
        return this._data.length;
    },
    nfiltered_rows: function () {
        /**
         * @returns {Number} -- number of rows in the filtered data set.
         */
        return this._filtered_data.length;
    },
    ncols: function () {
        /**
         * @returns {Number} -- number of columns, or -1 if there's no data.
         */
        return this._col_names.length;
    },
    filtered_rows_html: function (join_arr, start_i, len) {
        /**
         * Adds <tr> html strings to join_arr.
         * @param start_i is optional.
         * @param len is optional.
         */
        var fd = this._filtered_data;
        if (start_i === undefined) {
            start_i = 0;
        }
        if (len === undefined) {
            len = fd.length;
        }
        var i, end = start_i + len;
        if (end > fd.length) {
            end = fd.length;
        }
        for (i = start_i; i < end; i += 1) {
            join_arr.push(fd[i][0]);
        }
    },
    filter: function () {
        this._filtered_data = ui.filters_ui.filter(this._data);
        ui.filters_ui.update_count();
    },
    sort: function () {
        this._filtered_data.sort(ui.sort_ui.get_sort_func());
    }
};

function Cols(table_data) {
    /**
     * these are the indicies in the table data structure.
     */
    this.PRICE = table_data.ncols() - 1;
    this.MIN_QTY = this.PRICE - 1;
    this.QTY_AVAILABLE = this.PRICE - 2;
    this.DESC = 4;
}

//=============================================================================
//          User Interface
//=============================================================================

function SbpUI(table_data, content_div) {
    this.tdata = table_data;
    this._orig_content = content_div; //< the original <div id="content">
    this._new_content_div = null; //< <div> for the new content to go.
    this._div = null; //< the <div> that surrounds our ui.
    this._errors = null; // div to display error messages.

    this.table_data_ui = null; // instance of TableDataUI
    this.loading_ui = null; // instance of LoadingUI
    this.hidden_cols_ui = null; // instance of HiddenColsUI
    this.sort_ui = null; // instance of SortUI
    this.filters_ui = null; // instance of FiltersUI
}

SbpUI.prototype = {
    init: function () {
        this._div = document.createElement('div');
        this._div.style.cssText = '\
font-family: Helvetica, Arial, sans-serif;\
margin: 20px;\
padding: 5px 15px;\
-moz-border-radius: 15px;\
border-radius: 15px;\
border: 1px solid black;\
background-color: #eee';
        this._div.style.marginBottom = '5px';
        this._div.innerHTML = '\
<h2 style="margin-bottom: 2px">Digikey Sort By Price Userscript v</h2>\
<div style="margin-bottom: 6px">\
<a style="font-size:85%" href="#" target="_blank">Homepage 1</a> &nbsp; \
<a style="font-size:85%" href="#" target="_blank">Homepage 2</a> &nbsp; \
<a style="font-size:85%" href="#" target="_blank">Help</a> &nbsp; \
<a style="font-size:85%" href="#clearprefs" \
title="Clear all script preferences">Clear Prefs</a> &nbsp; \
<a style="font-size:85%" href="#checknow">Check For Updates</a>\
</div>\
<div></div>\
<div style="color: red"></div>';
        this._div.firstChild.innerHTML += VERSION;
        this._orig_content.parentNode
            .insertBefore(this._div, this._orig_content);
        var divs = this._div.getElementsByTagName('div'),
        links = this._div.getElementsByTagName('a');
        links[0].href = HOME1_URL;
        links[1].href = HOME2_URL;
        links[2].href = HELP_URL;
        links[3].addEventListener('click', onclick_clear_prefs, true);
        links[4].addEventListener('click', onclick_update_check_now, true);

        this.table_data_ui = new TableDataUI();
        this._errors = divs[2];
        this.loading_ui = new LoadingUI();
        this.loading_ui.build_into(divs[1]);
        
        if (pref_storage.get("new_version_available", false)) {
            _show_update_avail();
        }
    },
    build_new_content_div: function () {
        /**
         * Hides the original content.
         */
        // cloneNode(false) -- only copy attributes.
        this._new_content_div = this._orig_content.cloneNode(false);
        this._orig_content.parentNode
            .insertBefore(this._new_content_div, this._orig_content);
        this._orig_content.style.display = 'none';
        this._new_content_div.innerHTML = '<div></div><div></div><div></div>';
        this._new_content_div.style.marginTop = '0px';
        this._new_content_div.style.paddingTop = '0px';

        // getElementsByTagName returns live node list, so save divs.
        var divs = this._new_content_div.getElementsByTagName('div'),
            filters_div = divs[0],
            hidden_cols_div = divs[1],
            tdata_div = divs[2];
        this.filters_ui = new FiltersUI();
        this.filters_ui.build_into(filters_div);
        this.sort_ui = new SortUI();
        this.sort_ui.build_into(this.filters_ui.get_sort_span());
        this.hidden_cols_ui = new HiddenColsUI();
        this.hidden_cols_ui.build_into(hidden_cols_div);
        hidden_cols_div.style.marginTop = '8px';
        tdata_div.style.marginTop = '15px';
        this.table_data_ui.build_into(tdata_div);
    },
    add_error: function (s) {
        /**
         * Displays an error in our ui.
         */
        if (this._errors !== null) {
            this._div.style.border = "1px solid red";
            this._div.style.backgroundColor = "#ffcccc";
            var ndiv = document.createElement('div');
            ndiv.style.cssText = 'max-height: 150px; overflow: auto;';
            var n = document.createElement('pre');
            n.innerHTML = s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
                           .replace(/>/g, '&gt;');
            ndiv.appendChild(n);
            this._errors.appendChild(ndiv);
        }
    }
};

function onclick_clear_prefs(event) {
    pref_storage.clear();
    _log("Preferences Cleared!");
    alert("Preferences Cleared!");
    return _stop_event(event);
}

function onclick_update_check_now(event) {
    var a = this;
    _disable_link(a, true);
    update_checker.check_now(function (alert_msg) {
        _disable_link(a, false);
        if (alert_msg) {
            alert(alert_msg);
        }
    });
    return _stop_event(event);
}

function TableDataUI() {
    this._table_start_html = null; // html thead and sort columns.
    this._table = null; // the <table> element that we create.
    this._table_div = null; // where we build the table
    this._paginator = null; // instance of Paginator
    this._pag_top = null; // instance of PaginatorUI above table
    this._pag_bot = null; // instance of PaginatorUI below table

}

TableDataUI.prototype = {
    build_into: function (parent) {
        parent.innerHTML = '<div></div><div></div><div></div>';
        this._table_div = parent.childNodes[1];
        this._paginator = new Paginator();
        this._pag_top = new PaginatorUI(this._paginator);
        this._pag_top.build_into(parent.childNodes[0]);
        this._pag_bot = new PaginatorUI(this._paginator);
        this._pag_bot.build_into(parent.childNodes[2]);
    },
    build_table_start_html: function (orig_table) {
        /**
         * @param orig_table {Dom Element} -- the original parts table.
         */
        var start_arr = ['<table '];
        var i, oattrs = orig_table.attributes;
        for (i = 0; i < oattrs.length; i += 1) {
            start_arr.push(oattrs[i].nodeName + '="'
                           + oattrs[i].nodeValue + '"');
        }
        start_arr.push('><thead><tr>');

        var first_tr = orig_table.rows[0];
        ui.tdata.set_col_names(first_tr);
        start_arr.push(first_tr.innerHTML);
        start_arr.push('</tr><tr align="center">');
        for (i = 0; i < ui.tdata.ncols() - 1; i += 1) {
            start_arr.push('<td style="font-weight: bolder">\
<a href="#' + i + '_a" title="Smallest First (shift + click to add as \
secondary sort column)" \
style="float: left; text-decoration:none;">^</a>\
<a href="#' + i + '_h" title="Hide Column" \
style="color: red; text-decoration:none;">x</a>\
<a href="#' + i + '_d" title="Largest First (shift + click to add as \
secondary sort column)" \
style="float: right; text-decoration:none;">v</a></td>');
        }
        start_arr.push('<td>&nbsp;</td></tr></thead><tbody>');
        this._table_start_html = start_arr.join('');
    },
    get_table: function () {
        return this._table;
    },
    update_table: function () {
        this._paginator.update();
        this._pag_top.update();
        this._pag_bot.update();

        var html_arr = [this._table_start_html];
        ui.tdata.filtered_rows_html(html_arr,
                this._paginator.start_i(), this._paginator.length());
        html_arr.push('</tbody></table>');
        this._table_div.innerHTML = html_arr.join('');
        this._table = this._table_div.firstChild;

        var second_tr = this._table.firstChild.firstChild.nextSibling;
        second_tr.addEventListener('click',
                        _create_link_handler(onclick_sort_tr, this), true);
        ui.hidden_cols_ui.update_table(this._table);
    }
};

function onclick_sort_tr(event) {
    var col_action = event.after_pound.split('_'),
        td_ui = event.data,
        col = parseInt(col_action[0], 10), action = col_action[1];
    if (action === 'h') {
        var hc_ui = ui.hidden_cols_ui;
        hc_ui.hide_col(col);
        hc_ui.update_links();
        hc_ui.update_table(td_ui.get_table());
    } else if (action === 'a' || action === 'd') {
        ui.sort_ui.add_key(col, action, event.shiftKey,
                           (event.ctrlKey)? 'l' : 'n');
        ui.sort_ui.update();
        ui.tdata.sort();
        td_ui._paginator.cur_page = 0;
        td_ui.update_table();
    }
    return false;
}

function LoadingUI() {
    this._npages_loaded = null; // <span>
    this._out_of = null; // <span>
    this._nparts = null; // <span>
    this._done = null; // <span>
}

LoadingUI.prototype = {
    build_into: function (parent) {
        parent.innerHTML = '\
Loaded <span>1</span> of <span>1</span> pages, <span>N</span> parts ... \
<span><a href="#stop" title="Stop Fetching">Stop</a></span>';
        var spans = parent.getElementsByTagName('span');
        this._npages_loaded = spans[0];
        this._out_of = spans[1];
        this._nparts = spans[2];
        this._done = spans[3];
        this._done.firstChild
            .addEventListener('click', onclick_stop_fetching, true);
    },
    set_out_of: function (out_of) {
        this._out_of.firstChild.nodeValue = out_of.toString();
    },
    inc_npages_loaded: function () {
        var nl_node = this._npages_loaded.firstChild;
        nl_node.nodeValue = (parseInt(nl_node.nodeValue, 10) + 1).toString();
    },
    update_nparts: function () {
        this._nparts.firstChild.nodeValue = ui.tdata.nrows().toString();
    },
    done: function () {
        this._done.innerHTML = "Done.";
    }
};

function onclick_stop_fetching(event) {
    _error("User stopped fetching.");
    requestor.stop();
}

//=============================================================================
//          Update Checks
//=============================================================================

function UpdateChecker() {

}

UpdateChecker.prototype = {
    init: function () {
        var last_check_ms = pref_storage.get("last_update_check", 0);
        if (Date.now() - last_check_ms > CHECK_FOR_UPDATES_EVERY) {
            this.check_now();
        }
    },
    check_now: function (cbk_func) {
        /** Calls cbk_func(msg) if we need to display something. */
        cbk_func = cbk_func || function () {};
        _log("Checking now for updates.");
        pref_storage.set("last_update_check", Date.now());
        GM_xmlhttpRequest({
            method: 'GET',
            url: UPDATE_URL,
            onerror: function (details) {
                if (details.status === 0 && details.statusText.length === 0
                        && details.finalUrl === UPDATE_URL) {
                    // chrome blocks cross-domain xhr.
                    _log("Browser blocked cross-domain xhr.");
                    cbk_func("Please check for updates manually at\n\n" +
                             HOME1_URL + "\n\nor\n\n" + HOME2_URL);
                } else {
                    _error("Could not check for updates at " + UPDATE_URL +
                           "\nfinalUrl: " + details.finalUrl + 
                           "\nresponseHeaders: " + details.responseHeaders +
                           "\nresponseText: " + details.responseText + 
                           "\nstatus: " + details.status +
                           "\nstatusText: " + details.statusText);
                    cbk_func();
                }
            },
            onload: function (details) {
                var vmatch = VERSION_RE.exec(details.responseText);
                if (!vmatch) {
                    _error("No version string in " + details.responseText);
                    cbk_func();
                    return;
                }
                var v = vmatch[1];
                _log("Update check returned version " + v);
                if (parseFloat(v) > parseFloat(VERSION)) {
                    pref_storage.set("new_version_available", true);
                    _show_update_avail();
                    cbk_func();
                    alert("A new version of Digikey Sort By Price is " + 
                          "available.  See\n\n" + HOME1_URL + "\n\nor\n\n" +
                          HOME2_URL);
                } else {
                    cbk_func("You have the latest version of " + 
                             "Digikey Sort By Price.");
                }
            }
        });
    }
};

function _show_update_avail() {
    if (!_update_avail_shown) {
        _update_avail_shown = true;
        _error("A new version of Digikey Sort By Price is " + 
               "available.  See\n\n" + HOME1_URL + "\n\nor\n\n" + HOME2_URL);
    }
}

//=============================================================================
//          Pagination
//=============================================================================

function Paginator() {
    this.cur_page = 0;
    this.per_page = 100;
    this.show_all = false;
    this.npages = 1;
}

Paginator.prototype = {
    is_first: function () {
        return this.cur_page === 0;
    },
    is_last: function () {
        return this.cur_page === this.npages - 1;
    },
    is_page: function (i) {
        return this.cur_page === i;
    },
    update: function () {
        if (this.show_all) {
            this.npages = 1;
        } else {
            this.npages = Math.ceil(ui.tdata.nfiltered_rows()
                                    / this.per_page);
        }
    },
    start_i: function () {
        if (this.show_all) {
            return 0;
        }
        return this.cur_page * this.per_page;
    },
    length: function () {
        if (this.show_all) {
            return ui.tdata.nfiltered_rows();
        }
        return this.per_page;
    }
};

function PaginatorUI(paginator) {
    this._paginator = paginator;
    this._page_display_span = null;
    this._prev_page = null;
    this._next_page = null;
    this._pages_span = null;
    this._per_page_links = null;
}

PaginatorUI.prototype = {
    build_into: function (parent) {
        parent.innerHTML = '\
<span>\
<a href="#p_p" title="Previous Page">prev</a> &nbsp;\
<a href="#p_n" title="Next Page">next</a> &nbsp; \
<span></span>\
</span>\
 &nbsp; &nbsp; ( per page: &nbsp;\
<a href="#s_25" title="Show 25 per page">25</a> &nbsp;\
<a href="#s_50" title="Show 50 per page">50</a> &nbsp;\
<a href="#s_100" title="Show 100 per page">100</a> &nbsp;\
<a href="#s_200" title="Show 200 per page">200</a> &nbsp;\
<a href="#s_all" title="Show all parts">all</a> )';
        var links = parent.getElementsByTagName('a'),
        spans = parent.getElementsByTagName('span');
        this._page_display_span = spans[0];
        this._prev_page = links[0];
        this._next_page = links[1];
        this._pages_span = spans[1];
        this._per_page_links = [];
        var i;
        for (i = 2; i < links.length; i += 1) {
            this._per_page_links.push(links[i]);
        }
        parent.addEventListener('click',
                        _create_link_handler(onclick_paginator_div), true);
    },
    update: function () {
        var p = this._paginator, i, a, page_links;
        if (p.show_all || p.npages < 2) {
            this._page_display_span.style.display = 'none';
        } else {
            this._page_display_span.style.display = 'inline';
            _disable_link(this._prev_page, p.is_first());
            _disable_link(this._next_page, p.is_last());
            page_links = [];
            this._pages_span.innerHTML = '';
            for (i = 0; i < p.npages; i += 1) {
                page_links.push('<a href="#p_' + i + '">' + (i + 1) + '</a>');
            }
            this._pages_span.innerHTML = page_links.join(' &nbsp;');
            _disable_link(this._pages_span
                          .getElementsByTagName('a')[p.cur_page]);
        }

        for (i = 0; i < this._per_page_links.length; i += 1) {
            a = this._per_page_links[i];
            _disable_link(a, _get_href_after_pound(a) === 's_' + p.per_page);
        }
    }
};

function onclick_paginator_div (event) {
    var action_p = event.after_pound.split('_'),
        action = action_p[0], p = action_p[1],
        td_ui = ui.table_data_ui, paginator = td_ui._paginator;
    if (action === 'p') {
        if (p === 'n') {
            paginator.cur_page += (paginator.is_last())? 0 : 1;
        } else if (p === 'p') {
            paginator.cur_page -= (paginator.is_first())? 0 : 1;
        } else {
            paginator.cur_page = parseInt(p, 10);
        }
    } else if (action === 's') {
        if (p === 'all') {
            paginator.show_all = true;
            paginator.per_page = 'all';
        } else {
            paginator.cur_page = 0;
            paginator.per_page = parseInt(p, 10);
            paginator.show_all = false;
        }
    }
    setTimeout(function () {
        td_ui.update_table();
    }, 10);
    return false;
}

//=============================================================================
//          Hiding Columns
//=============================================================================

function HiddenColsUI() {
    this._hidden = []; // array of 0-indexed columns.
    this._just_restored = [];
    this._parent = null;
    this._restore_span = null; // <span> with restore links.
    this.from_json_obj(pref_storage.get("HiddenColsUI", []));
}

HiddenColsUI.prototype = {
    build_into: function (parent) {
        this._parent = parent;
        parent.style.display = 'none';
        parent.innerHTML = '\
<fieldset style="display:inline-block">\
<legend style="font-weight:bold">Hidden Columns</legend>\
Restore Hidden Columns: <span></span>\
</fieldset>';
        this._restore_span = parent.getElementsByTagName('span')[0];
        this._restore_span.addEventListener('click',
                        _create_link_handler(onclick_restore, this), true);
        this.update_links();
    },
    to_json_obj: function () {
        var i, result = [];
        for (i = 0; i < this._hidden.length; i += 1) {
            result.push(ui.tdata.get_col_name(this._hidden[i]));
        }
        return result;
    },
    from_json_obj: function (obj) {
        var col_names = ui.tdata.get_col_names(), i, j;
        this._hidden = [];
        this._just_restored = [];
        for (i = 0; i < obj.length; i += 1) {
            j = col_names.indexOf(obj[i]);
            if (j !== -1) {
                this._hidden.push(j);
            }
        }
    },
    hide_col: function (col) {
        this._hidden.push(col);
        this._hidden.sort(function (a, b) {
            return a - b;
        });
    },
    restore_col: function (col) {
        /**
         * update_table must once after this.
         */
        var i = this._hidden.indexOf(col);
        if (i === -1) {
            return;
        }
        this._just_restored.push(this._hidden.splice(i, 1));
    },
    update_links: function () {
        var i, c, links = [];
        for (i = 0; i < this._hidden.length; i += 1) {
            c = this._hidden[i];
            links.push('<a href="#' + c + '" title="Show this column">'
                       + ui.tdata.get_col_name(c) + '</a>');
        }
        this._restore_span.innerHTML = links.join(', ');
        if (links.length) {
            this._parent.style.removeProperty('display');
        } else {
            this._parent.style.display = 'none';
        }
        pref_storage.set("HiddenColsUI", this.to_json_obj());
    },
    update_table: function (table) {
        /**
         * clears just_restored.
         */
        var h = this._hidden, hlen = h.length,
            r = this._just_restored, rlen = r.length;
        if (!hlen && !rlen) {
            return;
        }
        var rows = table.rows, cells, i, j;
        for (i = 0; i < rows.length; i += 1) {
            cells = rows[i].cells;
            for (j = 0; j < hlen; j += 1) {
                cells[h[j]].style.setProperty('display', 'none', '');
            }
            for (j = 0; j < rlen; j += 1) {
                cells[r[j]].style.removeProperty('display');
            }
        }
        this._just_restored = [];
    }
};

function onclick_restore(event) {
    var col = parseInt(event.after_pound, 10),
        hc_ui = event.data;
    hc_ui.restore_col(col);
    hc_ui.update_links();
    hc_ui.update_table(ui.table_data_ui.get_table());
    return false;
}

//=============================================================================
//          Filtering
//=============================================================================

function FiltersUI() {
    this._filters = [];
    this._fdiv = null;
    this._ndisp = null;
    this._out_of = null;
    this._sort_span = null;
    this.from_json_obj(pref_storage.get("FiltersUI", []));
}

FiltersUI.prototype = {
    build_into: function (parent) {
        parent.innerHTML = '\
<form action="#"><fieldset style="display: inline-block">\
<legend style="font-weight:bold">Filter By</legend>\
<div style="margin-bottom: 8px"></div>\
<div style="margin-bottom: 8px">\
<a href="#addadv" title="Add Another Filter" style="font-size:85%">\
Add Another Filter</a>\
</div>\
<input type="submit" value="Filter" /> &nbsp; \
<span>Displaying <span></span> of <span></span> parts, <span></span></span>\
</fieldset></form>';
        parent.getElementsByTagName('form')[0].addEventListener('submit',
                onsubmit_filters, true);
        this._fdiv = parent.getElementsByTagName('div')[0];
        var spans = parent.getElementsByTagName('span');
        this._ndisp = spans[1];
        this._out_of = spans[2];
        this._sort_span = spans[3];
        parent.getElementsByTagName('a')[0]
                .addEventListener('click', onclick_add_adv, true);
        var i;
        for (i = 0; i < this._filters.length; i += 1) {
            this.add_filter(this._filters[i]);
        }
        this.update_removes();
    },
    to_json_obj: function () {
        var i, filter, result = [];
        for (i = 0; i < this._filters.length; i += 1) {
            filter = this._filters[i];
            result.push({
                enabled: this.is_enabled(i),
                type: _to_filter_type_str(filter),
                obj: (filter.to_json_obj)? filter.to_json_obj() : null
            });
        }
        return result;
    },
    from_json_obj: function (obj) {
        this._filters = [];
        var i, o, f, fcls;
        for (i = 0; i < obj.length; i += 1) {
            o = obj[i];
            fcls = _from_filter_type_str(o.type);
            if (!fcls) {
                continue;
            }
            f = new fcls(ui.tdata.cols);
            if (f.from_json_obj) {
                f.from_json_obj(o.obj);
            }
            f.enabled = o.enabled;
            this._filters.push(f);
        }
        if (this._filters.length < 4) {
            var cols = ui.tdata.cols;
            this._filters = [
                new AvailableFilter(cols),
                new StockedFilter(cols),
                new CallFilter(cols),
                new MaxPriceFilter(cols),
                new AdvancedFilter(cols)
            ];
        }
    },
    is_enabled: function (i) {
        return this._fdiv.childNodes[i].firstChild.checked;
    },
    get_sort_span: function () {
        return this._sort_span;
    },
    filter: function (data) {
        var result = data, i, filter;
        for (i = 0; i < this._filters.length; i += 1) {
            filter = this._filters[i];
            if (this.is_enabled(i)) {
                if (filter.reset) {
                    filter.reset();
                }
                result = result.filter(filter.filter);
            }
        }
        return result;
    },
    update_count: function () {
        this._ndisp.innerHTML = ui.tdata.nfiltered_rows();
        this._out_of.innerHTML = ui.tdata.nrows();
    },
    add_filter: function (filter) {
        var self = this;
        var div = document.createElement('div');
        this._fdiv.appendChild(div);
        var check = document.createElement('input');
        check.type = "checkbox";
        check.checked = filter.enabled;
        div.appendChild(check);
        var span = document.createElement('span');
        div.appendChild(span);
        span.addEventListener('change', function (event) {
            check.checked = true;
        }, true);
        filter.parent = span;
        if (filter.build_into) {
            filter.build_into(span);
        } else {
            span.innerHTML = filter.html;
        }
        var rlink = document.createElement('a');
        rlink.style.cssText = 'display: none; margin-left: 10px;'
                                  + ' font-size:85%';
        rlink.title = 'Remove This Filter';
        rlink.innerHTML = 'remove';
        div.appendChild(rlink);
        rlink.addEventListener('click',
                _create_link_handler(onclick_remove_adv, this), true);
    },
    remove_filter: function (i) {
        this._fdiv.removeChild(this._fdiv.childNodes[i]);
        this._filters.splice(i, 1);
    },
    update_removes: function () {
        var i, rlink;
        for (i = 0; i < this._fdiv.childNodes.length; i += 1) {
            rlink = this._fdiv.childNodes[i].lastChild;
            rlink.href = '#rmfilter_' + i;
            if (i > 2 && this._filters.length > 4) {
                rlink.style.display = 'inline';
            } else {
                rlink.style.display = 'none';
            }
        }
        //pref_storage.set("FiltersUI", this.to_json_obj());
    }
};

function onsubmit_filters(event) {
    pref_storage.set("FiltersUI", ui.filters_ui.to_json_obj());
    ui.tdata.filter();
    ui.tdata.sort();
    ui.table_data_ui._paginator.cur_page = 0;
    ui.table_data_ui.update_table();
    return _stop_event(event);
}

function onclick_add_adv(event) {
    var new_f = new AdvancedFilter(ui.tdata.cols);
    ui.filters_ui._filters.push(new_f);
    ui.filters_ui.add_filter(new_f);
    ui.filters_ui.update_removes();
    return _stop_event(event);
}

function onclick_remove_adv(event) {
    var filters_ui = event.data,
        i = parseInt(event.after_pound.split('_')[1], 10);
    filters_ui.remove_filter(i);
    filters_ui.update_removes();
}

function _to_filter_type_str(filter) {
    if (filter instanceof AvailableFilter) {
        return "AvailableFilter";
    } else if (filter instanceof StockedFilter) {
        return "StockedFilter";
    } else if (filter instanceof CallFilter) {
        return "CallFilter";
    } else if (filter instanceof MaxPriceFilter) {
        return "MaxPriceFilter";
    } else if (filter instanceof AdvancedFilter) {
        return "AdvancedFilter";
    }
    return null;
}

function _from_filter_type_str(s) {
    var classes = {
        'AvailableFilter': AvailableFilter,
        'StockedFilter': StockedFilter,
        'CallFilter': CallFilter,
        'MaxPriceFilter': MaxPriceFilter,
        'AdvancedFilter': AdvancedFilter
    };
    if (classes.hasOwnProperty(s)) {
        return classes[s];
    }
}

function AvailableFilter(cols) {
    this.html = "Available (Quantity Available &gt; 0 or 'Available')";
    this.filter = function (row) {
        var o = row[cols.QTY_AVAILABLE];
        return o.f !== Infinity && o.f > 0 || o.t === 'Available';
    };
}

function StockedFilter(cols) {
    this.html = "Stocked (Minimum Quantity doesn't contain 'Non-Stock')";
    this.filter = function (row) {
        return row[cols.MIN_QTY].t.indexOf('Non-Stock') === -1;
    };
}

function CallFilter(cols) {
    this.html = "No 'Call' Prices";
    this.filter = function (row) {
        var o = row[cols.PRICE];
        return o.t !== 'Call';
    };
}

function MaxPriceFilter(cols) {
    var max_price = 100.0;
    this.build_into = function (parent) {
        parent.innerHTML = 'Maximum Price (Min Qty * Price):'
            + ' <input type="text" size=6'
            + ' value="' + max_price + '" />';
    };
    this.reset = function () {
        max_price = parseFloat(this.parent.getElementsByTagName('input')[0]
                               .value.replace(THOUSANDS_SEP_RE, ''));
    };
    this.filter = function (row) {
        var min_qty = row[cols.MIN_QTY], price = row[cols.PRICE];
        return min_qty.f * price.f < max_price;
    };
    this.to_json_obj = function () {
        this.reset(); // saves values from input
        return max_price;
    };
    this.from_json_obj = function (obj) {
        max_price = obj;
    };
}

function AdvancedFilter(cols) {
    var OPS = ['contains', "doesn't contain",
               'matches regex', "doesn't match regex",
               '> (num)',  '< (num)', '= (num)'];
    var BOOLS = ['and', 'or'];

    var conds = [{
        col: cols.DESC,
        op: 0,
        val: "",
        join: null
    }];
    var col_names = ui.tdata.get_col_names().slice(0, -1);
    col_names.unshift('* (any col)');
    var _parent = null;

    this.build_into = function (parent) {
        _parent = parent;
        var i, cond, html_arr = [];
        for (i = 0; i < conds.length; i += 1) {
            cond = conds[i];
            html_arr.push('<span>');
            html_arr.push(_build_select_html(col_names, cond.col,
                                             'width:120px'));
            html_arr.push(_build_select_html(OPS, cond.op, 'width:100px'));
            html_arr.push('<input type="text" size="'
                          + cond.val.toString().length + '" />');
            html_arr.push('<span> [<a href="#rmcond_' + i + '" '
                          + 'style="color:red;" '
                          + 'title="Remove This Condition">x</a>]'
                          + '</span>');
            html_arr.push(_build_select_html(BOOLS, cond.join,
                                             'margin: 0px 20px'));
            html_arr.push('</span>');
        }
        html_arr.push(' &nbsp; [<a href="#newcond" '
                      + 'title="Add Another Condition">+</a>]');
        parent.innerHTML = html_arr.join('');
        this.update_hidden();
        var inputs = parent.getElementsByTagName('input');
        for (i = 0; i < inputs.length; i += 1) {
            inputs[i].value = conds[i].val;
        }
        parent.addEventListener('keydown', advfilter_resize_inputs, true);
        parent.addEventListener('change', advfilter_resize_inputs, true);
        parent.addEventListener('click',
                _create_link_handler(onclick_advfilter, this), true);
    };
    this.to_json_obj = function () {
        this.reset(); // updates conds
        var i, cond, result = [];
        for (i = 0; i < conds.length; i += 1) {
            cond = conds[i];
            result.push({
                col: (cond.col === 0)? 0 : col_names[cond.col],
                op: cond.op,
                val: cond.val,
                join: cond.join
            });
        }
        return result;
    };
    this.from_json_obj = function (obj) {
        var i, col_i, cond, o;
        conds = [];
        for (i = 0; i < obj.length; i += 1) {
            o = obj[i];
            if (o.col === 0) {
                conds.push(o);
            } else {
                col_i = col_names.indexOf(o.col);
                if (col_i !== -1) {
                    o.col = col_i;
                    conds.push(o);
                }
            }
        }
        if (conds.length === 0) {
            conds = [{
                col: cols.DESC,
                op: 0,
                val: "",
                join: null
            }];
        } else {
            conds[conds.length - 1].join = null;
        }
    };
    this.add_new_cond = function (new_link) {
        var cond_span = new_link.previousSibling.previousSibling,
            new_cond_span = cond_span.cloneNode(true);
        _parent.insertBefore(new_cond_span, cond_span.nextSibling);
        this.update_hidden();
    };
    this.rm_cond = function (rm_link, cond_i) {
        var span = rm_link.parentNode.parentNode;
        span.parentNode.removeChild(span);
        this.update_hidden();
    };
    this.update_hidden = function () {
        var inputs = _parent.getElementsByTagName('input'),
            i, span = inputs[0].parentNode;
        for (i = 0; i < inputs.length; i += 1) {
            span = inputs[i].parentNode;
            span.getElementsByTagName('a')[0].href = "#rmcond_" + i;
            span.lastChild // join select
                .style.display = (i < inputs.length - 1)? 'inline' : 'none';
            span.lastChild.previousSibling // remove link span
                .style.display = (inputs.length === 1)? 'none' : 'inline';
        }
    };
    this.reset = function () {
        /**
         * Updates conds.
         */
        conds = [];
        var inputs = _parent.getElementsByTagName('input'),
            i, input, cond;
        for (i = 0; i < inputs.length; i += 1) {
            input = inputs[i];
            cond = {
                col: parseInt(input.previousSibling.previousSibling.value, 10),
                op: parseInt(input.previousSibling.value, 10),
                val: input.value,
                join: parseInt(input.parentNode.lastChild.value, 10)
            };
            if (cond.op > 3) {
                cond.val = parseFloat(cond.val.replace(THOUSANDS_SEP_RE, ''));
                if (isNaN(cond.val)) {
                    cond.val = input.value;
                }
            }
            cond.f = _create_advfilter_func(cond.col, cond.op, cond.val);
            conds.push(cond);
        }
        conds[conds.length - 1].join = null;
    };
    this.filter = function (row) {
        /**
         * f && t = f
         * f && f || t = (f && f) || t = t
         */
        var i, cond, join, last_was = true;
        for (i = 0; i < conds.length; i += 1) {
            cond = conds[i];
            join = cond.join;
            if (last_was === false) {
                if (join === 1) { // ... || -- don't skip the next
                    last_was = true;
                }
                // f && ... until || x
                continue;
            }
            if (cond.f(row)) {
                if (join === 1 || join === null) {
                    // ... || -- short-circuit to true
                    return true;
                }
            } else {
                if (join === 0) {
                    // 'and' -- skip to next ||
                    last_was = false;
                }
            }
        }
        return false;
    };
}

function _create_advfilter_func(col, op, val) {
    if (op === 0 || op === 1) {
        val = val.toLowerCase();
        if (op === 0 && col !== 0) {
            return function (row) {
                return row[col].t.toLowerCase().indexOf(val) !== -1;
            };
        } else if (op === 0 && col === 0) {
            return function (row) {
                var i;
                for (i = 1; i < row.length; i += 1) {
                    if (row[i].t.toLowerCase().indexOf(val) !== -1) {
                        return true;
                    }
                }
                return false;
            };
        } else if (op === 1 && col !== 0) {
            return function (row) {
                return row[col].t.toLowerCase().indexOf(val) === -1;
            };
        } else if (op === 1 && col === 0) {
            return function (row) {
                var i;
                for (i = 1; i < row.length; i += 1) {
                    if (row[i].t.toLowerCase().indexOf(val) === -1) {
                        return true;
                    }
                }
                return false;
            };
        }
    } else if (op === 2 || op === 3) {
        var re = RegExp(val, "i");
        if (op === 2 && col !== 0) {
            return function (row) {
                return re.test(row[col].t);
            };
        } else if (op === 2 && col === 0) {
            return function (row) {
                var i;
                for (i = 1; i < row.length; i += 1) {
                    if (re.test(row[i].t)) {
                        return true;
                    }
                }
                return false;
            };
        } else if (op === 3 && col !== 0) {
            return function (row) {
                return !re.test(row[col].t);
            };
        } else if (op === 3 && col === 0) {
            return function (row) {
                var i;
                for (i = 1; i < row.length; i += 1) {
                    if (!re.test(row[i].t)) {
                        return true;
                    }
                }
                return false;
            };
        }
    } else if (op === 4 && col !== 0) {
        return function (row) {
            return row[col].f > val;
        };
    } else if (op === 4 && col === 0) {
        return function (row) {
            var i;
            for (i = 1; i < row.length; i += 1) {
                if (row[i].f > val) {
                    return true;
                }
            }
            return false;
        };
    } else if (op === 5 && col !== 0) {
        return function (row) {
            return row[col].f < val;
        };
    } else if (op === 5 && col === 0) {
        return function (row) {
            var i;
            for (i = 1; i < row.length; i += 1) {
                if (row[i].f < val) {
                    return true;
                }
            }
            return false;
        };
    } else if (op === 6 && col !== 0) {
        return function (row) {
            return row[col].f === val;
        };
    } else if (op === 6 && col === 0) {
        return function (row) {
            var i;
            for (i = 1; i < row.length; i += 1) {
                if (row[i].f === val) {
                    return true;
                }
            }
            return false;
        };
    }
}

function onclick_advfilter(event) {
    if (event.after_pound === 'newcond') {
        event.data.add_new_cond(event.target);
    } else if (event.after_pound.indexOf('rmcond') === 0) {
        var cond_i = parseInt(event.after_pound.split('_')[1], 10);
        event.data.rm_cond(event.target, cond_i);
    }
    return false;
}

function advfilter_resize_inputs(event) {
    if (event.target.nodeName.toUpperCase() === 'INPUT') {
        setTimeout(advfilter_resize_inputs_t, 10, event.target);
    }
}

function advfilter_resize_inputs_t(node) {
    node.size = node.value.length;
}

//=============================================================================
//          Sorting
//=============================================================================

function SortUI() {
    this._span = null;
    this._keys = [];
    this.from_json_obj(pref_storage.get("SortUI", []));
}

SortUI.prototype = {
    build_into: function (parent) {
        parent.innerHTML = 'Sorted by <span></span>';
        this._span = parent.getElementsByTagName('span')[0];
        this._span.addEventListener('click',
                _create_link_handler(onclick_sort_del, this), true);
        this.update();
    },
    to_json_obj: function () {
        var i, k, result = [];
        for (i = 0; i < this._keys.length; i += 1) {
            k = this._keys[i];
            result.push({
                col: ui.tdata.get_col_name(k.col),
                a_or_d: k.a_or_d,
                ctype: k.ctype
            });
        }
        return result;
    },
    from_json_obj: function (obj) {
        var i, o, col_i, col_names = ui.tdata.get_col_names();
        this._keys = [];
        for (i = 0; i < obj.length; i += 1) {
            o = obj[i];
            col_i = col_names.indexOf(o.col);
            if (col_i !== -1) {
                this.add_key(col_i, o.a_or_d, true, o.ctype);
            }
        }
        if (this._keys.length === 0) {
            this.add_key(ui.tdata.cols.PRICE - 1, 'a', true, 'n');
        }
    },
    add_key: function (col, a_or_d, add_key, ctype) {
        var o = {
            col: col,
            a_or_d: a_or_d,
            ctype: ctype,
            f: _create_sort_func(col, a_or_d, ctype)
        };
        if (add_key) {
            var i, k;
            // can't add duplicate columns.
            for (i = 0; i < this._keys.length; i += 1) {
                k = this._keys[i];
                if (o.col === k.col) {
                    this._keys[i] = o;
                    return;
                }
            }
            this._keys.push(o);
        } else {
            this._keys = [o];
        }
    },
    del_key: function (key_i) {
        this._keys.splice(key_i, 1);
    },
    update: function () {
        var i, sk, texts = [];
        for (i = 0; i < this._keys.length; i += 1) {
            sk = this._keys[i];
            texts.push("'" + ui.tdata.get_col_name(sk.col) + "' "
                       + ((sk.a_or_d === 'a')? 'Asc ' : 'Desc ')
                       + '(' + ((sk.ctype === 'l')? 'lexicographic' : 'numeric')
                       + ')' + ((this._keys.length === 1)? '' :
                                ' [<a href="#' + i + '"'
                                + ' title="Remove this sort key">x</a>]'));

        }
        this._span.innerHTML = texts.join(', then ');
        pref_storage.set("SortUI", this.to_json_obj());
    },
    get_sort_func: function () {
        return _create_recursive_sort(this._keys);
    }
};

function onclick_sort_del(event) {
    var key_i = parseInt(event.after_pound, 10),
        sort_ui = event.data;
    sort_ui.del_key(key_i);
    sort_ui.update();
    ui.tdata.sort();
    ui.table_data_ui._paginator.cur_page = 0;
    ui.table_data_ui.update_table();
    return false;
}

function _create_recursive_sort(sort_keys, i) {
    if (i === undefined) {
        i = 0;
    }
    if (i >= sort_keys.length) {
        return function (a, b) {
            return 0;
        };
    }
    var f = sort_keys[i].f;
    var next = _create_recursive_sort(sort_keys, i + 1);
    return function (a, b) {
        var c = f(a, b);
        if (c !== 0) {
            return c;
        }
        return next(a, b);
    };
}

function _create_sort_func(col, a_or_d, ctype) {
    var f = _get_sort_func(a_or_d, ctype),
        i = col + 1;
    return function (a, b) {
        return f(a[i], b[i]);
    };
}

function _get_sort_func(a_or_d, ctype) {
    if (a_or_d === 'a') {
        return (ctype === 'l')? _lexicographic_a : _numeric_a;
    } else {
        return (ctype === 'l')? _lexicographic_d : _numeric_d;
    }
}

function _numeric_a(a, b) {
    if (a.f === Infinity && b.f === Infinity) {
        return _lexicographic_a(a, b);
    }
    return a.f - b.f;
}

function _numeric_d(a, b) {
    if (a.f === Infinity && b.f === Infinity) {
        return _lexicographic_d(a, b);
    }
    return b.f - a.f;
}

function _lexicographic_a(a, b) {
    return a.t.localeCompare(b.t);
}

function _lexicographic_d(a, b) {
    return b.t.localeCompare(a.t);
}

//=============================================================================
//          Preference Storage
//=============================================================================

function PrefStorage() {
    this._JSON = null; // the browser's JSON object (or nsIJSON)
    this._set = null;
    this._get = null;
}

PrefStorage.prototype = {
    init: function () {
        try {
            this._JSON = JSON;
        } catch (x) {
            _log("[storage] No native JSON");
            try {
                var Ci = Components.interfaces;
                var Cc = Components.classes;
                var nativeJSON = Cc["@mozilla.org/dom/json;1"]
                                     .createInstance(Ci.nsIJSON);
                this._JSON = {
                    stringify: function (obj) {
                        return nativeJSON.encode(obj);
                    },
                    parse: function (str) {
                        return nativeJSON.decode(str);
                    }
                };
            } catch (x) {
                this._JSON = null;
                _log("[storage] Browser doesn't support JSON, " +
                     "storage disabled.");
                return false;
            }
        }
        try {
            GM_setValue("dsbp_test", "3");
            if (GM_getValue("dsbp_test") !== "3") {
                throw "No GM_setValue!";
            }
            this._set = function (name, value) {
                GM_setValue(name, value);
            };
            this._get = function (name) {
                return GM_getValue(name, null);
            };
            this.clear = function () {
                var i, names = GM_listValues();
                for (i = 0; i < names.length; i += 1) {
                    GM_deleteValue(names[i]);
                }
            };
        } catch (x) {
            _log("[storage] No GM_setValue: " + x);
            try {
                if (!localStorage.setItem) {
                    throw "No localStorage!";
                }
                this._set = function (name, value) {
                    return localStorage.setItem("dsbp_" + name, value);
                };
                this._get = function (name) {
                    return localStorage.getItem("dsbp_" + name);
                };
                this.clear = function () {
                    var i, name, to_remove = [];
                    for (i = 0; i < localStorage.length; i += 1) {
                        name = localStorage.key(i);
                        if (name.indexOf("dsbp_") === 0) {
                            to_remove.push(name);
                        }
                    }
                    for (i = 0; i < to_remove.length; i += 1) {
                        localStorage.removeItem(to_remove[i]);
                    }
                };
            } catch (x) {
                this._set = null;
                this._get = null;
                _log("[storage] Browser doesn't support storage.");
                return false;
            }
        }
    },
    set: function (name, value) {
        if (this._set !== null && this._JSON !== null) {
            this._set(name, this._JSON.stringify(value));
        }
    },
    get: function (name, default_) {
        /**
         * Returns the parsed JSON object.
         */
        var o;
        if (this._get === null || this._JSON === null
            || (o = this._get(name)) === null) {
            return default_;
        }
        try {
            return this._JSON.parse(o);
        } catch (x) {
            _log("[storage] Warning: json parsing reported: " + x);
            return default_;
        }
    }
};

//=============================================================================
//          Ajax Request Queuer
//=============================================================================

function Requestor(opts) {
    /**
     * Concurrently makes a set of ajax requests.
     * @param opts an options object:
     *    'requests' -- a list of objects: {
     *        'req_details' -- passed to GM_xmlhttpRequest(req_details).
     *                         onload and onerror will be overwritten.
     *        'onload' -- (optional) callback function (res, req, requestor)
     *            Called when a request succeeds.
     *              res -- a response obj with status, responseText, etc, as
     *                     defined by greasemonkey.
     *              req -- this object.
     *              requestor -- this Requestor.
     *
     *    'onload' -- (optional) callback function (res, req, requestor)
     *         Called when a request succeeds.  This is called after a
     *         request-specific onload callback. Same res, req, etc as above.
     *
     *    'ondone' -- (optional) callback function (requestor)
     *         Called when all the requests are finished.
     *
     *    'retries' -- (optional, default: 3) number of times to retry failed
     *         requests.
     *
     *    'onerror' -- (optional) callback function (requestor)
     *         Called when a request has failed more than `retries` times.
     *
     *    'concurrent' -- (optional, default: 5) number of concurrent fetches.
     */
    if (opts.retries === undefined) { opts.retries = 3; }
    if (opts.concurrent === undefined) { opts.concurrent = 5; }

    var _req_queue = [];
    var _call_queue = [];
    var _currently_fetching = 0;
    var _stopped = false;
    var self = this;

    function _build_req_queue() {
        var i, req, creq_details, o;
        for (i = 0; i < opts.requests.length; i += 1) {
            req = opts.requests[i];
            creq_details = _copy_obj(req.req_details);
            o = {
                details: creq_details,
                orig_req: req,
                times_tried: 0
            };
            creq_details.onload = _req_curry(_onload, o);
            creq_details.onerror = _req_curry(_onerror, o);
            _req_queue.push(o);
        }
    }
    function _service_call_queue() {
        var o;
        while (_call_queue.length) {
            o = _call_queue.shift();
            //console.time('cbk_' + o.func.name);
            o.func.apply(self, o.params);
            //console.timeEnd('cbk_' + o.func.name);
        }
    }
    function _spawn_requests() {
        if (_req_queue.length === 0 && _currently_fetching === 0) {
            _alldone();
            return;
        }
        if (_stopped) {
            return;
        }
        var req;
        while (_currently_fetching < opts.concurrent && _req_queue.length) {
            req = _req_queue.shift();
            _currently_fetching += 1;
            GM_xmlhttpRequest(req.details);
        }
    }
    function _req_curry(f, req) {
        /**
         * @returns a function that will call f with second parameter req.
         */
        return function (res) {
            f(res, req);
        };
    }
    function _onload(res, req) {
        /**
         * Called when a request successfully returns.
         * @param res -- a Response object, see
         *               http://wiki.greasespot.net/GM_xmlhttpRequest
         * @param req -- the augmented request object - see _build_req_queue.
         */
        _currently_fetching -= 1;
        if (req.orig_req.onload) {
            _call_queue.push({
                func: req.orig_req.onload,
                params: [res, req.orig_req, self]
            });
        }
        if (opts.onload) {
            _call_queue.push({
                func: opts.onload,
                params: [res, req.orig_req, self]
            });
        }
        _spawn_requests();
        setTimeout(_service_call_queue, 1);
    }
    function _onerror(res, req) {
        /**
         * Called when a request does not successfully return.
         * @param res -- a Response object, see
         *               http://wiki.greasespot.net/GM_xmlhttpRequest
         * @param req -- the augmented request object - see _build_req_queue.
         */
        _currently_fetching -= 1;
        req.times_tried += 1;
        if (req.times_tried > opts.retries) {
            _stopped = true;
            if (opts.onerror) {
                _call_queue.push({
                    func: opts.onerror,
                    params: [self]
                });
            }
        } else {
            _req_queue.push(req);
            _spawn_requests();
        }
        setTimeout(_service_call_queue, 1);
    }
    function _alldone() {
        /**
         * Called when all requests are finished.
         */
        if (opts.ondone) {
            _call_queue.push({
                func: opts.ondone,
                params: [self]
            });
        }
    }
    this.stop = function () {
        _stopped = true;
    };
    _build_req_queue();
    _spawn_requests();
}

//=============================================================================
//          Misc Functions
//=============================================================================

function _copy_obj(o) {
    /**
     * Shallow-copy.
     */
    var k, r = {};
    for (k in o) {
        if (o.hasOwnProperty(k)) {
            r[k] = o[k];
        }
    }
    return r;
}

function _stop_event(event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
    if (event.stopPropogation) {
        event.stopPropogation();
    }
    return false;
}

function _disable_link(a, disabled) {
    /**
     * @param a {Dom Element}
     * @param disabled {boolean}
     */
    if (disabled || disabled === undefined) {
        a.style.color = 'black';
        a.style.textDecoration = 'none';
    } else {
        a.style.removeProperty('color');
        a.style.removeProperty('text-decoration');
    }
}

function _get_outer_html(node) {
    /**
     * Gets the outerHTML of node, using XMLSerializer if there is no outerHTML
     * property.
     */
    var r = node.outerHTML;
    if (r === undefined) {
        return (new XMLSerializer()).serializeToString(node);
    }
    return r;
}

function _get_href_after_pound(a) {
    var i = a.href.lastIndexOf('#');
    return a.href.substring(i + 1);
}

function _create_link_handler(f, data) {
    return function (event) {
        var a = event.target;
        if (a.nodeName.toUpperCase() === 'A') {
            event.data = data;
            event.after_pound = _get_href_after_pound(a);
            if (!f(event)) {
                return _stop_event(event);
            }
        }
    };
}

function _build_select_html(vals, sel_i, style) {
    var s;
    if (style === undefined) {
        s = ['<select>'];
    } else {
        s = ['<select style="' + style + '">'];
    }
    var i;
    for (i = 0; i < vals.length; i += 1) {
        s.push('<option value="' + i + '"'
               + ((i === sel_i)? ' selected="selected"' : '')
               + '>' + vals[i] + '</option>');
    }
    s.push('</select>');
    return s.join('');
}


main();
