// ==UserScript==
// @name          ibl list_sort
// @version      1.0
// @description   Sort unordered lists (books, etc) into alpha order.
// @include       http://www.iblist.com/author*
// @include       http://iblist.com/author*
// @include       http://www.iblist.com/series*
// @include       http://iblist.com/series*
// ==/UserScript==

/*
  DESCRIPTION
  Lists of books/series etc. are ordered by cpyrt. date & db entry nbr#
  This script sorts the lists alphabetically
 
   Check for volume numbering and sort numerically - not as ascii chars
  Do not sort numbered series - curse the template designer
  - damned unusual way of turning unordered lists into ordered items

  If titles are identical (within the list being tested), raise an alert
   as they may be duplicate entries.
*/

/** changelog
2007-10-24
  New:
    Now cross-browser - Firefox, Opera, IE7
*/

/**
  Sorting function
*/
function list_compare(a, b) {

  // Pick out the book title, stripped of any punctuation/spaces
  // does the A data have copyright info ?
  var aresult = a.match(/^<.*?>(.*?)\((\d+)\)</);
  if (!aresult)
    // no,  try a different match set - probably a series
    aresult = a.match(/^<.*?>(.*?)</);
  var acomp = aresult[1].replace(/\W[\s]*/g,'').toLowerCase();

  // repeat the same tests for B item
  var bresult = b.match(/^<.*?>(.*?)\((\d+)\)</);
  if (!bresult)
    bresult = b.match(/^<.*?>(.*?)</);
  var bcomp = bresult[1].replace(/\W[\s]*/g,'').toLowerCase();

  // check for volume numbering - need to sort these numerically
  var avol = acomp.match(/(.*?)(\d*)$/);
  var bvol = bcomp.match(/(.*?)(\d*)$/);

  // are they numbered volumes - and are the titles otherwise identical?
  if (avol && bvol && (avol[1] == bvol[1])) {
    // ok, sort the number bit in numerical rather than ascii order
    if (parseInt(avol[2]) > parseInt(bvol[2]))
      return -1;
    if (parseInt(bvol[2]) > parseInt(avol[2]))
      return 1;
  }

  // gotten this far - then not comparing numbered items - go ahead and sort normally
  if (acomp > bcomp)
    return -1;
  if (bcomp > acomp)
    return 1;

  // gotten this far - then identical titles, potentialy a duplication error!!
  alert('Suspicious data?\nThere MAY be a duplicate of...\n\n\t'+aresult[1]+' ('+aresult[2]+')\n\nPlease check the entries, and if confirmed report the error to Admin/Data Editors.');

  return 0;
}

/**
  Main function
*/
(function () {
  var listc, listItemc, i, j;

  // find all the unordered lists in the document
  var listc = document.getElementsByTagName('ul');

  // examine each list set
  for (i = 0; i < listc.length; i++) {
    // ignore any list that may belong to the navigation pane
    if (listc[i].parentNode.className != 'content')
      continue;

    // select all list items in a list
    listItemc = listc[i].getElementsByTagName('li');

    // only sort unnumbered lists with more than one member
    if (listItemc.length > 1 && !/^\d/.test(listItemc[0].innerHTML)) {

      // create a temporary stack
      var arr = new Array();

      // step thru list &amp; push each item onto the stack
      for (j = 0; j < listItemc.length; j++)
        arr.push(listItemc[j].innerHTML);

       // sort the list items by calling our compare routine
      arr.sort(list_compare);

      // step thru the list again and
      // replace the current item with sorted list item off the top of the stack
      for (j=0; j < listItemc.length; j++)
        listItemc[j].innerHTML = arr.pop();
    }
  }
}) (); 