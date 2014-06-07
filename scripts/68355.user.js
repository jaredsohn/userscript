// ==UserScript==
// @name           LibraryThing Filter Local Events
// @namespace      http://userscripts.org/users/brightcopy
// @description    Allows a configurable filter list to be applied against the local events list.
// @include        http://*.librarything.tld/local*
// @license        Public Domain
// ==/UserScript==

var showHidden = false;
var setting_filters = 'ltfleFilters';
var menuSeparatorNeeded = true;
var filters = filterStrToList(GM_getValue(setting_filters, ''));

var hiddenEvents = [];

var showHideLink = null;
var class_show = 'ltfleShow';
var class_hide = 'ltfleHide';
var class_star = 'ltfleStar';


function filterStrToList(str) {
  var result = [];

  if (str != '') {
    var filters = str.split('||');
    for (var i = 0; i < filters.length; i++) {
      var item = filters[i].split('~~');
      if (item.length == 2)
        result.push({venue:item[0], event:item[1], toString:
            function () {
              return '{venue:"' + this.venue + '", event:"' + this.event + '"}'
            } 
        });
    }
  }

  return result;
}

function filterListToStr(list) {
  var filters = [];
  for (var i = 0; i < list.length; i++)
    filters.push(list[i].venue + '~~' + list[i].event);

  return filters.join('||');  
}

function getShowHideLinkText() {
  return '(' + (showHidden ? 'hide ' : 'show') + ' ' + hiddenEvents.length + ' other' + 
      (hiddenEvents.length > 1 ? 's' : '') + ')'
}

function addFilter(anyVenue) {
  var newFilter = {venue:anyVenue ? '' : 
      window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode.firstChild.textContent,
      event:window.getSelection().toString()};

  if (newFilter.event == '') {
    alert('You must select some text to use as the filter text before adding a filter.');
    return;
  }
  
  var confirmed = false;
  var f;
  
  for (f = filters.length - 1; f >= 0; f--)
    if (newFilter.venue == filters[f].venue && newFilter.event == filters[f].event) {
      alert('A filter already exists that is identical to the one being added.  The new ' +
          'filter will not be added.');
      return;
    }

  // is this filter actually a tighter version of another filter
  // if so, don't add it because the other would cancel it out
  for (f = filters.length - 1; f >= 0; f--) {
    if (filterMatch(newFilter, filters[f].venue, filters[f].event))
      if (confirmed || confirm('This filter is more broad than another existing filter.  Clicking ' +
          'OK will replace the narrow filter with this new more broad filter.  Clicking ' + 
          'Cancel will cancel changing any filters.')) {
        confirmed = true;
        deleteFilter(f);
      }
      else
        return;
  }

  confirmed = false;
  
  // see if this new event is a superset of another
  for (f = filters.length - 1; f >= 0; f--) {
    if (filterMatch(filters[f], newFilter.venue, newFilter.event))
      if (confirmed || confirm('Another filter is already more broad than this filter.  Clicking ' +
          'OK will replace the broad filter with this new more narrow filter.  Clicking ' + 
          'Cancel will cancel changing any filters.')) {
        confirmed = true;
        deleteFilter(f);
      }
      else
        return;
  }

  filters.push(newFilter);

  saveFilters();
  addMenuItem(filters[filters.length - 1]);

  if (confirmed && confirm('One or more filters were deleted while adding the new filter.  ' +
      'Deleting the filter(s) will take effect immediately, but ' + 
      'the filter(s) will remain on the menu until you reload the page.  ' +
      'Click OK to reload the page now.'))
    window.location.reload();
}

function removeFilter(filter) {
  for (var f = 0; f < filters.length; f++)
    if (filters[f] === filter)
      return deleteFilter(f);
}

function deleteFilter(index) {
  filters.splice(index, 1);

  saveFilters();
}

function saveFilters() {
  GM_setValue(setting_filters, filterListToStr(filters));
  
  applyFilters();
}

function eventMatch(event, str) {
try {
  return str.toLowerCase().indexOf(event.toLowerCase()) != -1;
} catch (e) { console.trace() }
}

function filterMatch(filter, venue, event) {
  return eventMatch(filter.event, event) && (filter.venue == '' || venue == filter.venue.toLowerCase())
}

function getFilterName(filter) {
  return '"' + filter.event + '"' + (filter.venue != '' ? ' (' + filter.venue + ')' : '')
}

function createShowHideLink() {
  GM_addStyle('.' + class_show + ' { background-color: #F0F0F0 }');
  GM_addStyle('.' + class_hide + ' { background-color: #F0F0F0; display: none }');
  GM_addStyle('.' + class_star + ' { background-color: #FFFFC1 }');

  var elem = document.getElementById('eventsNearUserContainer');
  if (elem) {
    elem = elem.parentNode.firstChild;

    showHideLink = document.createElement('a');
    showHideLink.addEventListener('click', showHide, true);
    showHideLink.setAttribute('style', 'float:right');
    showHideLink.style.fontSize = 'smaller';
    showHideLink.style.paddingRight = '10px';
    showHideLink.style.fontWeight = 'normal';
    showHideLink.style.color = '#0000EE';
    
    showHideLink.appendChild(document.createTextNode(getShowHideLinkText()));

    elem.appendChild(showHideLink);
  }
  
  showHideLink.style.display = hiddenEvents.length ? '' : 'none';
}

function applyShowHide() {
  showHideLink.textContent = getShowHideLinkText();
  for (var i = 0; i < hiddenEvents.length; i++)
    if (showHidden)
      replaceClass(hiddenEvents[i], class_hide, class_show)
    else
      replaceClass(hiddenEvents[i], class_show, class_hide);
}

function applyFilters() {
  // clear out all in the old list, resetting them
  for (var i = 0; i < hiddenEvents.length; i++) {
    removeClass(hiddenEvents[i], class_show);
    removeClass(hiddenEvents[i], class_hide);
  }
  hiddenEvents = [];
    
  // find all the new ones
  var elems = document.evaluate('//div[@id="eventsNearUserContainer"]//div[@class="venueItemHead"]',
      document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0; i < elems.snapshotLength; i++) {
    // get the message heading div
    var div = elems.snapshotItem(i);
    var event = div.textContent.toLowerCase();
    var venue = div.firstChild.textContent.toLowerCase();
  
    for (var f = 0; f < filters.length; f++) {
      if (filterMatch(filters[f], venue, event)) {
        hiddenEvents.push(div.parentNode);
        break;
      }
    }

    if (document.evaluate('.//img[@src="/pics/newstar.gif"]',
        div.parentNode, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue != null)
      addClass(div.parentNode, class_star);
  }

  showHideLink.style.display = hiddenEvents.length ? '' : 'none';

  if (hiddenEvents.length)
    applyShowHide();
}

function replaceClass(element, oldClassName, newClassName) {
  removeClass(element, oldClassName);
  addClass(element, newClassName);
}

function addClass(element, className) {
  var classes = element.className.split(' ');
  
  if (classes.indexOf(className) == -1) {
    classes.push(className);
    element.className = classes.join(' ');
  }
}

function removeClass(element, className) {
  var classes = element.className.split(' ');
  var i = classes.indexOf(className);
  if (i != -1) {
    classes.splice(i, 1);
    element.className = classes.join(' ');
  }
}

function showHide() {
  showHidden = !showHidden;

  applyShowHide();
}


/* Menu building */
GM_registerMenuCommand('Add filter for all venues', function () { addFilter(true) } );
GM_registerMenuCommand('Add filter for only this venue', function () { addFilter(false) } );

if (filters.length) {
  for (var f = 0; f < filters.length; f++)
    addMenuItem(filters[f]);
}

function addMenuItem(filter) {
  if (menuSeparatorNeeded) {
    GM_registerMenuCommand(null);
    menuSeparatorNeeded = false;
  }
  
  GM_registerMenuCommand('Delete ' + getFilterName(filter),
      function () {
        removeFilter(filter);
        if (confirm('Deleting the filter will take effect immediately, but ' + 
            'the filter will remain on the menu until you reload the page.  ' +
            'Click OK to reload the page now.'))
          window.location.reload();
      });
}
/* End menu building */

createShowHideLink();
applyFilters();