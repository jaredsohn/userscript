// ==UserScript==
// @name           Mint - Advanced Transaction Search
// @version        0.2.1
// @description    Allows a user to save searches and execute them from the transaction list.
// @namespace      jah.mint
// @license        http://creativecommons.org/licenses/BSD/
// @include        https://wwws.mint.com/transaction.event*
// ==/UserScript==

// Version Compatibility: tested with Mint version 11

// Future Improvements (TODO):
// * store searches in chrome instead of hard-coded here
// * add a button to save a search, maybe a better graphical search interface
// * allow user to choose location for search list
// * highlight active search item
// * add ability to align date ranges, e.g. "Previous Year" or "Previous Month"

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

////////////////////////////////////////////////////////////////////////////////
// BEGIN USER PREFERENCES

var gInsertBefore = 'localnav-acounts';

var gSearches = [
  { name: 'Unaccepted', query: '-tag:Accepted' },
  { name: 'Last 7 Days', startDate: -7 },
  { name: 'Previous Year', startDate: '1/1/2010', endDate: '12/31/2010' },
  { name: 'Investments', startDate: -30, filter: 'investment' },
];

// Acceptable search parameters are:
//   name: display name for the search in the list
//   query: any valid search query (using the Mint search box)
//   startDate: a date or offset (in days) to being the search
//   endDate: a date or offset (in days) to end the search
//   filter: any valid 'filterType' parameter for the search

// END USER PREFERENCES
////////////////////////////////////////////////////////////////////////////////

var _gNow = new Date();
var _gSearchListElem = undefined;

////////////////////////////////////////////////////////////////////////////////
function _update_search_box() {
  // TODO clear list elements first

  for (var idx = 0; idx < gSearches.length; idx++) {
    var search = gSearches[idx];

    var query = _get_query(search);
    var href = 'transaction.event?' + query;

    var link = document.createElement('a');
    link.setAttribute('href', href);
    link.appendChild(document.createTextNode(search.name));

    var item = document.createElement('li');
    item.setAttribute('id', 'search-' + idx);
    item.setAttribute('title', query);
    item.appendChild(link);

    _gSearchListElem.appendChild(item);
  }
}

////////////////////////////////////////////////////////////////////////////////
function _get_query(search) {
  var query = '';

  if (search.query != undefined) {
    query += 'query=' + escape(search.query) + '&';
  }

  if (search.filter != undefined) {
    query += 'filterType=' + escape(search.filter) + '&';
  }

  if (search.startDate != undefined) {
    if (isNaN(search.startDate)) {
      query += 'startDate=' + escape(search.startDate) + '&';
    } else {
      var dt = new Date();
      dt.setDate(dt.getDate() + search.startDate);
      query += 'startDate=' + _format_date(dt) + '&';
    }

    if (search.endDate == undefined) {
      search.endDate = 0;
    }
  }

  if (search.endDate != undefined) {
    if (isNaN(search.endDate)) {
      query += 'endDate=' + escape(search.endDate) + '&';
    } else {
      var dt = new Date();
      dt.setDate(dt.getDate() + search.endDate);
      query += 'endDate=' + _format_date(dt) + '&';
    }
  }

  return query;
}

////////////////////////////////////////////////////////////////////////////////
function _create_search_box() {
  var searchNavBoxElem = document.createElement('li');
  searchNavBoxElem.setAttribute('id', 'localnav-saved-search');

  var titleElem = document.createElement('h5');
  titleElem.appendChild(document.createTextNode('Searches'));
  searchNavBoxElem.appendChild(titleElem);

  _gSearchListElem = document.createElement('ol');
  searchNavBoxElem.appendChild(_gSearchListElem);

  // XXX this is kind of a hack...
  var insertPoint = document.getElementById(gInsertBefore);
  insertPoint.parentNode.insertBefore(searchNavBoxElem, insertPoint);
}

////////////////////////////////////////////////////////////////////////////////
function _format_date(dt) {
  return ((dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear());
}

////////////////////////////////////////////////////////////////////////////////
// SCRIPT ENTRY

_create_search_box();
_update_search_box();
