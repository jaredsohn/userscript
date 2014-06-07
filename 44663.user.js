// ==UserScript==
// @name           Zions Bank - Available Balance
// @namespace      http://zionsbank.com
// @description    Add an available balance line for pending charges/credits
// @include        https://banking.zionsbank.com/zfnb/userServlet/app/bank/user/register_view_main*
// ==/UserScript==


// Customizable constants
var HEADER_TEXT = 'Available';
var ERROR_STYLE = 'background-color: red; border: 3px double yellow; color: white; padding: 3px; font-size: 1.5em;';
var POS_STYLE = 'color: gray;';
var NEG_STYLE = 'color: red;';
var DAY_CHANGE_STYLE = 'border-top: 2px solid #888888;'
var PENDING_STYLE = 'background-color: pink;'


// Required constants, you should only need to modify these if the site gets modified significantly
var MAIN_TABLE_REGEX = /Transactions\s*between/;
var HEADER_REGEX     = /bhd(rt)?/;
var DATE_REGEX       = /Date/;
var DEBIT_REGEX      = /Debit/;
var CREDIT_REGEX     = /Credit/;
var BALANCE_REGEX    = /Balance/;
var DATA_REGEX       = /data(grey)?/;
var NUMBER_REGEX     = /-?(\d+,)?\d*\.\d+/;
var HEADER_CLASS     = 'bhdrt';








/*****************************************************************/
// Probably shouldn't mess below this line, but have at it!

// the styles I use, also modifiable without serious consequences
GM_addStyle(".gm_error { " + ERROR_STYLE + " }");
GM_addStyle(".post { " + POS_STYLE + " }");
GM_addStyle(".neg { " + NEG_STYLE + " }");
GM_addStyle(".day_change td { " + DAY_CHANGE_STYLE + " }");
GM_addStyle(".pending td { " + PENDING_STYLE + " }");



var body = document.body;

try {


/*
   Unbelievably, there's almost no id's anywhere on the Zion's bank 'Activity' page, so we have to just walk the DOM to find the rows we care about
   (which also aren't differentiated from other rows by ANYTHING, not even a class)
   What decade was this html written in?
*/


  var tables = body.getElementsByTagName('table');

  // if they just put an id or class on it...
  var main_table;
  for (var i = 0; i < tables.length; i++) {
    var html = tables[i].innerHTML;
    if (html.search(MAIN_TABLE_REGEX) > -1) {
      main_table = tables[i];
      break;
    }
  }

  var rows = main_table.rows;

  // find all the actual data rows from the 'Activity' ledger
  // based on whether the second cell has a className of 'data' or 'datagrey'
  // unshifts the rows in REVERSE order
  var data_rows = [];
  var header_row;
  var DATE_COL = -1;
  var DEBIT_COL = -1;
  var CREDIT_COL = -1;
  var BALANCE_COL = -1;
  var cur_date;
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].cells;
    if (cells && cells.length > 1 && cells[1].className.search(HEADER_REGEX) == 0) {
      // This should be the header row
      // find a few useful columns (Debit, Credit, Balance)
      for (var j = 0; j < cells.length; j++) {
        var content = cells[j].textContent
        if (content.search(DATE_REGEX) > -1) {
          DATE_COL = j;
        } else if (content.search(DEBIT_REGEX) > -1) {
          header_row = rows[i];
          DEBIT_COL = j;
        } else if (content.search(CREDIT_REGEX) > -1) {
          CREDIT_COL = j;
        } else if (content.search(BALANCE_REGEX) > -1) {
          BALANCE_COL = j;
          break;
        }
      }
    } else if (cells && cells.length > 1 && cells[1].className.search(DATA_REGEX) == 0) {
      // This should be a data row
      data_rows.unshift(rows[i]);
      if (DATE_COL && cells[DATE_COL]) {
        var content = cells[DATE_COL].textContent
        if (cur_date && cur_date != content) {
          rows[i].className = 'day_change';
          cur_date = content;
        } else {
          cur_date = content;
        }
      }
    } else {
      // the last cell is usually a spacer cell, the second to last cell tends to have a colspan
      // we'll add one to that to fill in for our new balance column
      var last_cell = cells.length > 1 ? cells[ cells.length - 2 ] : cells[ cells.length - 1];
      last_cell.colSpan++;
    }
  }
  if (!data_rows.length) throw "Unable to find any data rows.";
  if (DEBIT_COL < 0)     throw "Unable to find the Debit column.";
  if (CREDIT_COL < 0)    throw "Unable to find the Credit column.";
  if (BALANCE_COL < 0)   throw "Unable to find the Balance column.";

  // Create a header for this new column
  var next_col = header_row.cells[BALANCE_COL+1];
  var new_header = document.createElement('td');
  new_header.className = HEADER_CLASS;
  new_header.innerHTML = HEADER_TEXT;
  header_row.insertBefore(new_header, next_col);

  // runs thru the row list (which is backwards) until it finds the first row with an empty balance
  // rows before this point (earlier in time) just use the provided balance
  // rows after this point (later in time) will have a recalculated balance (shown with the original, not replacing it)
  var prev_balance;
  var use_prev = 0;
  for (var i = 0; i < data_rows.length; i++) {
    var cells = data_rows[i].cells;
    var debit_col = cells[DEBIT_COL];
    var credit_col = cells[CREDIT_COL];
    var balance_col = cells[BALANCE_COL];
    var next_col = cells.length > BALANCE_COL ? cells[BALANCE_COL + 1] : null;

    // pull out all the necessary numbers
    var debit = extract_first_number(debit_col.textContent);
    var credit = extract_first_number(credit_col.textContent);
    var new_change = (credit || 0) - (debit || 0);
    var new_balance = extract_first_number(balance_col.textContent);

    // highlight pending rows (not always obvious when they are farther down)
    if (!new_balance) {
      data_rows[i].className += ' pending';
    }

    // fix the balance if needed
    if (!new_balance || use_prev) {
      new_balance = prev_balance + new_change;
      use_prev = 1;
    }

    // created the cell for the new column
    var balance_class = balance_col.className
    
    var new_cell = document.createElement('td');
    new_cell.className = balance_class + (new_balance >= 0 ? ' pos' : ' neg');
    new_cell.innerHTML = ["$ ", new_balance.toFixed(2)].join('');
    data_rows[i].insertBefore(new_cell, next_col);

    // keep track of the last balance
    prev_balance = new_balance || 0;
  }

} catch (e) {

  // Something bad happened, make that obvious on the page (hopefully there's no errors here too...)
  var warning = [
    '<div class="gm_error">',
    'Greasemonkey script "Zions Bank - Available Balance" encountered a fatal error',
    '<br> - <b>',
    typeof e === 'object' && e.name && e.name == 'TypeError'
    ? [e.name, ': ', e.message, ' crashed in ', e.fileName, ' at line ', e.lineNumber].join('')
    : e.toString(),
    '</b>',
    '<br>If this continues, you may need to disable the script and contact the author',
    '</div>'
  ].join('');

  body.innerHTML = warning + body.innerHTML;
  
}

function extract_first_number(string) {
    string = string.replace(',', '');
    var matches = string.match(NUMBER_REGEX);

    return matches && matches.length ? new Number(matches[0]) : undefined;
}