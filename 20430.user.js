// ==UserScript==
// @name      ibl_searchSort
// @version      1.0
// @description Adds sorting options to the search results page.
// @include      http://www.iblist.com/search/search.php?*
// ==/UserScript==

/*
  DESCRIPTION
  The data returned by a search appears unordered on the page.
  This script eases the look-up pain by giving two options on sorting.
    Sort by Title
    Sort by Author
 */

/** changelog
2007-10-24
  New:
    Now cross-browser - Firefox, Opera, IE7
*/

var isIE = (document.attachEvent && !window.opera) ? true : false;

/**
  Main function
*/
(function () {

  var node = document.getElementsByTagName('h2')[0];

  if (!node)
    return;
   
  // build a heading and link containers
  node.innerHTML += '\
    <span style="color:maroon; font-weight:normal; font-size:12px;"> - page sorting options:\
      <span style="margin-left:10px; margin-right:10px;"></span>\
      <span></span>\
    </span>'

  // get a list of our spans - ignores those empty text nodes in FF and Opera
  var s = node.getElementsByTagName('span');
 
  // create links
  var link = document.createElement('button');
  link.textContent = 'Title';
  link.title = 'Sort items by book title.';
  link.id='Title';
  s[1].appendChild(link);
  if (!isIE)
    link.addEventListener('click', function() { searchSort(this) }, false);
  else
    link.attachEvent('onclick', searchSort);

  link = document.createElement('button');
  link.textContent = 'Author';
  link.title = 'Sort items by author name (last word in name)';
  link.id='Author';
  s[2].appendChild(link);
  if (!isIE)
    link.addEventListener('click', function() { searchSort(this) }, false);
  else
    link.attachEvent('onclick', searchSort);
}) ();

function searchSort(e) {

  var evt = (isIE) ? window.event.srcElement : e;

  //get the search results
  // find all the unordered lists in the document
  var c = document.getElementsByTagName('ul');

  // examine each list set looking for the one we want
  for (i = 0; i < c.length; i++) {
    // ignore any list that may belong to the navigation pane
    if (c[i].parentNode.className == 'content')
      break;
  }
 
  if (i == c.length) {
    alert('Problem finding the list');
    return;
  }

  c = c[i].getElementsByTagName('li');

  // create a temporary stack
  var arr = new Array();
     
  // step thru list &amp; push each item onto the stack
  for (var i=0; i < c.length; i++)
    arr.push(c[i].innerHTML);

  if (evt.id == 'Title')
    arr.sort(compareTitle);
  else
    arr.sort(compareAuthor);
     
  // step thru the list again and
  // replace the current item with sorted list item off the top of the stack
  for (var i=0; i < c.length; i++)
    c[i].innerHTML = arr.pop();
}

/*
 * Pick out the book title, stripped of any punctuation characters and spaces
 *
 * Check for volume numbering and sort numerically - not as ascii chars
 *
 * If titles are identical, sort by copyright date
 *
 * if they are still identical (duplication?), warn user to confirm data before reporting to Admin
*/
function compareTitle(a, b) {

  var aresult = a.match(/^<.*?>(.*?)\((\d+)\)</);
  var acomp = aresult[1].replace(/\W[\s]*/g,'').toLowerCase();

  var bresult = b.match(/^<.*?>(.*?)\((\d+)\)</);
  var bcomp = bresult[1].replace(/\W[\s]*/g,'').toLowerCase();

  var avol = acomp.match(/(.*?)(\d*)$/);
  var bvol = bcomp.match(/(.*?)(\d*)$/);
 
  // do they both end in numbers - and are the titles otherwise identical?
  if (avol && bvol && (avol[1] == bvol[1])) {
    // ok, sort them in numerical rather than ascii order
    if (parseInt(avol[2]) > parseInt(bvol[2]))
      return -1;
    if (parseInt(bvol[2]) > parseInt(avol[2]))
      return 1;
  }

  // just a normal title - no numbering found - go ahead and sort
  if (acomp > bcomp)
    return -1;
  if (bcomp > acomp)
    return 1;

  // sort identical titles by copyright date
  acomp = parseInt(aresult[2]);
  bcomp = parseInt(bresult[2]);
  if (acomp > bcomp)
    return -1;
  if (bcomp > acomp)
    return 1;

  // in the unlikely case that a book title - including copyright date - is identical ask user to check for duplicate entry
  alert('Suspicious data?\nThere MAY be a duplicate of...\n\n\t'+aresult[1]+' ('+aresult[2]+')\n\nPlease check the entries, and if confirmed report the error to Admin/Data Editors.')
  return 0;
}

/*
 * Pick out the authors name, seperate into individual words and reverse their order
 * while fine for most names - problematic for multi-word surnames
 *
 * If names are equal sort by book title within author
 *
 * If a name ends in 'JR/Jr/jr' ignore it and skip to next word in name
 *
 * if any suspected duplication, warn user to confirm data before reporting to Admin
*/
function splitReverse(s) {
  var r, i, temp = '';

  // grab the author and split into words
  r = s.match(/.*>.*">(.*)<\/.>/)[1].split(/\s/);;
  // how many splits?
  i = r.length-1;
  // test for suffix 'Jr' - if yes then ignore it
  if (r[r.length-1].match(/^jr/i))
    i = r.length-2; // re-adjust the split count
  // reassemble in reverse from split count to zero
  for (; i >= 0; i--)
    temp += r[i].toLowerCase();
  return temp;
}
function compareAuthor(a, b) {

  // break apart and reassemble
  var acomp = splitReverse(a);
  var bcomp = splitReverse(b);

  // sort
  if (acomp > bcomp)
    return -1;
  if (bcomp > acomp)
    return 1;

  // got this far? then same author name - now sort by book title
  var retval = compareTitle(a, b);

  // should never get a 0 returned - otherwise they are identical books by the same author!!
  // just in case, inform user so they can report it!!
  if (retval == 0)
    alert('Suspicious data?\nThere MAY be identical books by...\n\n\t'+a.match(/.*>(.*?)<.*?>$/)[1]+'\n\nPlease check, and if confirmed report the error to Admin/Data Editors.')

  return retval;
} 