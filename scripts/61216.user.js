var GMSU_meta_61216 = <><![CDATA[
// ==UserScript==
// @name          Userscripts Totals
// @description   Adds up posts, fans and installs on user pages
// @version       1.1.6
// @author        !user
// @contributor   Izzy (http://userscripts.org/users/izzysoft)
// @namespace     http://userscripts.org/users/54353
// @include       http://userscripts.org/users/*/scripts
// @include       http://userscripts.org/users/*/scripts/*
// @include       http://userscripts.org/users/*/scripts?*
// @include       http://userscripts.org/home/scripts
// @include       http://userscripts.org/home/scripts/*
// @include       http://userscripts.org/home/scripts?*
// @require       http://userscripts.org/scripts/source/51513.user.js
// ==/UserScript==
]]></>;

// find the scripts table, return if not found
var table = document.getElementsByClassName('wide forums')[0];
if (!table) return;

// get the rows of the table
var scriptTrs = table.getElementsByTagName('tr');

var scol = location.href.split('/')[3] == "home" ? 1 : 0;

// init counters
var reviews = 0, posts = 0, fans = 0, installs = 0;

// go row-by-row, adding up the totals
var luw = 0;
for (var i=1; i<scriptTrs.length; i++) {
  
  var tds = scriptTrs[i].getElementsByTagName('td');
  var reviewAnchor = tds[scol+1].getElementsByTagName('a')[0];
  
  if (reviewAnchor) reviews += parseInt(reviewAnchor.innerHTML);
  posts    += parseInt(tds[scol+2].innerHTML);
  fans     += parseInt(tds[scol+3].innerHTML);
  installs += parseInt(tds[scol+4].innerHTML);
  
  // set alignment for numerical columns to right and check size of "Last Updated" col
  var oriclass = tds[scol+1].getAttribute('class');
  if (scol==1) { // own scripts page
    tds[scol].setAttribute('class',oriclass+' center');
    tds[scol].setAttribute('style','white-space:nowrap;');
  }
  tds[scol+1].setAttribute('class',oriclass+' center');
  tds[scol+2].setAttribute('class',oriclass+' right');
  tds[scol+3].setAttribute('class',oriclass+' right');
  tds[scol+4].setAttribute('class',oriclass+' right');
  tds[scol+5].setAttribute('class',oriclass+' center');
  iw = tds[scol+5].getElementsByTagName('abbr')[0].offsetWidth +5;
  if ( iw > luw ) luw = iw;

  // add links for easier script handling
  var scriptID = /scripts-(\d+)/.exec(tds[scol].parentNode.id)[1],
      sourceLink = document.createElement('a'),
	  dlLink = document.createElement('a'),
	  span = document.createElement('span');
  sourceLink.href = 'http://userscripts.org/scripts/review/' +scriptID;
  sourceLink.innerHTML = 'view source';
  dlLink.href = 'http://userscripts.org/scripts/source/' +scriptID +'.user.js';
  dlLink.innerHTML = 'install';
  if (scol==0) {
	span.setAttribute('style','float:right;margin-right:5px;');
	span.appendChild(sourceLink);
	span.appendChild(document.createTextNode(' | '));
	span.appendChild(dlLink);
	el = tds[scol].getElementsByTagName('a')[0];
	el.parentNode.insertBefore(span,el);
  } else {
    var sourceEdit = document.createElement('a'),
	    imagesLink = document.createElement('a');
	sourceEdit.href = 'http://userscripts.org/scripts/edit_src/' +scriptID;
	imagesLink.href = 'http://userscripts.org/scripts/images/' +scriptID;
	sourceEdit.innerHTML = 'edit source';
	imagesLink.innerHTML = 'images';
	tds[scol].appendChild(document.createElement('br'));
	tds[scol].appendChild(sourceLink);
	tds[scol].appendChild(document.createTextNode(' | '));
	tds[scol].appendChild(sourceEdit);
	tds[scol].appendChild(document.createElement('br'));
	tds[scol].appendChild(imagesLink);
	tds[scol].appendChild(document.createTextNode(' | '));
	tds[scol].appendChild(dlLink);
  }
}

// find the inner 'tbody' that has been created
var tbody = table.getElementsByTagName('tbody')[0];

// a new row for the totals
var totalTr = document.createElement('tr');
totalTr.id = 'scripts-total';

// a filler cell
var td = document.createElement('td');
td.innerHTML = '<b>Totals</b>';
td.style.borderLeft = 0;
totalTr.appendChild(td);

// the cells where our totals will go
for (var i=0; i<5+scol; i++) {
  td = document.createElement('td');
  td.className = 'right inv lp';
  totalTr.appendChild(td);
}

// an array of the td cells we just created
var totalTds = totalTr.getElementsByTagName('td');

// remove the outer border from the filler cell
totalTds[0].style.borderBottom = 0;

// add the totals
totalTds[scol+1].innerHTML = '<b>' + reviews + '</b>';
totalTds[scol+2].innerHTML = '<b>' + posts + '</b>';
totalTds[scol+3].innerHTML = '<b>' + fans + '</b>';
totalTds[scol+4].innerHTML = '<b>' + installs + '</b>';
// resize (shrink) the "Last Updated" column
if (scriptTrs[0].getElementsByTagName('th')[scol+5].getElementsByTagName('a')[0].offsetWidth+5 > luw)
  luw = scriptTrs[0].getElementsByTagName('th')[scol+5].getElementsByTagName('a')[0].offsetWidth+5;
scriptTrs[0].getElementsByTagName('th')[scol+5].style.width = luw+'px';

// add the totals row to the tbody
tbody.appendChild(totalTr);

// add some CSS
GM_addStyle('td.right { text-align: right; } td.center { text-align: center; }');

// Check for updates
GMSU.init(61216);
