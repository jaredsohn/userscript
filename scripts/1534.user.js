// ==UserScript==
// @name         TPB Full Search
// @namespace    http://www.nocrew.org/~stefan/gm/
// @description  Allow search in specific subcategory.
// @include      http://*.thepiratebay.*/*
// @include      http://thepiratebay.*/*
// ==/UserScript==

/*
 * This is a Greasemonkey script for use with ThePirateBay.
 *
 * Now you can search in a specific category and not just in the
 * main categories the people at ThePirateBay thinks you want to
 * search in.
 * 
 * For example, you can search for "1985" in "Video/Music videos" only,
 * and not having to manually filter away all those useless entries in
 * other categories you're not interested in.
 *
 * This script also traverses down into the following pages to fill up
 * your search result list with enough entries. Due to this function,
 * it can take a few seconds longer to complete the search. A small 
 * page-traverse counter is shown in the upper left side of the page.
 * 
 * Apart from the search extending features, this one also adds two more
 * things. It adds a checkbox for showing only seeded torrents, and thereby
 * replacing the "tpbhideseedless.user.js" script, which most likely will not
 * work very well with this one.
 * 
 * The second extra feature is that it will strip away most of the ads.
 * This is all done using global css (in the PageCleanup function).
 *
 *
 *
 * Fixes in v0.5 (which is the first actually numbered version):
 *
 * - Some fixes has been done to the page numbering. The "next"-arrow now
 *   points to the first page not yet having been scanned. Yes, it updates
 *   live, so even if you stop, it will be set correctly.
 *
 * - Default maxResult value has been lowered to 20. This does not mean
 *   that the maximum limit of results is 20, but rather that after 20 has
 *   been reached, no more pages will be scanned after the current one.
 *
 * Fixes in v0.6:
 *
 * - Extended search options now also available on the front page.
 * 
 * - Some cosmetic fixes.
 *
 *
 *
 * This has been tested only with the 0.5 beta version of Greasemonkey.
 *
 * Several known bugs exists:
 *
 * - The page numbering is flawed, due to the traversal method, and apart
 *   from rewriting the links to include the new search category and noseed
 *   options, page numbers are left as they were in the original search
 *   (apart from the "next"-arrow fixup in v0.5).
 * - The script isn't checking completely if it's on a proper page for
 *   for applying itself, so weird things _may_ happen.
 * - The options only seem to appear on the search result page, and not
 *   on the main search (the one with the big logo) page.
 * - Some javascript error appears in the javascript console, and I don't
 *   know why at this point.
 * - Probably a bunch more I'm not aware of.
 * 
 */

/* LICENSE
 * Copyright (C) 2005 Stefan Berndtsson
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You can download a copy of the GNU General Public License at
 * http://www.gnu.org/licenses/gpl.txt
 * or get a free printed copy by writing to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
*/


(function() {
  /* Settings */
  var urlBase = 'http://thepiratebay.org/';
  var urlCategories = urlBase+'browse.php';
  var selectTextStr = 'Search in specific category: ';
  var checkTextStr = 'Only seeded';
  var searchTextStr = 'Searching page ';
  var doneTextStr = 'Search done';
  var brokenTextStr = 'Search aborted. Click on right arrow to continue.'
  var stopTextStr = ' (click to stop)';

  var maxResults = 20;
  var retVal = 0;

  var catNum = new Array();
  var catName = new Array();
  var catMain = new Array();

  function addGlobalStyle(css) {
    style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  function pageCleanup() {
    addGlobalStyle('.ad { display: none ! important }');
    addGlobalStyle('table[height="165"] { display: none !important }');
    addGlobalStyle('#searchfield { margin-left: auto !important; '+
		   'margin-right: auto !important; '+
		   'width: 80% !important; '+
		   'height: auto !important }');
    addGlobalStyle('#q { text-align: center !important; height: auto !important }');
    addGlobalStyle('#banner1 { height: auto !important }');
    // addGlobalStyle('.img { display: none !important }');
    addGlobalStyle('#TPBlogo { display: none !important; float: none !important;}');
    addGlobalStyle('iframe#tpb_cat_page { display: inline !important}'); 
    addGlobalStyle('iframe { display: none !important; }');
  }
  
  function getMainName(mainNum) {
    for(var i=0;i<catNum.length;i++) {
      if(catNum[i] == mainNum) {
	return catName[i];
      }
    }
  }
 
  function isFirstPage(root) {
    if(!root.document.location.search.match(/\?/)) return 1;
    return 0;
  }

  function getVar(qvar) {
    if(isFirstPage(top)) return "";
    var data = top.document.location.search.split("?")[1].split("&");
    for(var i=0;i<data.length;i++) {
      var tmp = data[i].split("=");
      if(qvar == tmp[0]) {
	return tmp[1];
      }
    }
    return "";
  }
   
  function getSubVar(qvar) {
    if(!self.document) return;
    if(isFirstPage(self)) return;
    var data = self.document.location.search.split("?")[1].split("&");
    for(var i=0;i<data.length;i++) {
      var tmp = data[i].split("=");
      if(qvar == tmp[0]) {
	return tmp[1];
      }
    }
    return "";
  }
   
  function setupCategoriesFrame() {
    var page=document.createElement('iframe');
    page.src=urlCategories+"?tpb_placeholder=1";
    page.width=1;
    page.height=1;
    page.border=0;
    page.id="tpb_cat_page";
    top.document.getElementsByTagName('form')[0].appendChild(page);
  }

  function getCategories () {
    var cats =
      document.evaluate("//a[starts-with(@href, 'brwsearch.php')]",
			document, null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
   
    if(cats.snapshotLength < 5) {
      return;
    }
   
    //	alert("DEBUG: Got "+cats.snapshotLength+" nodes");
   
    for(var i=0;i<cats.snapshotLength;i++) {
      var cat = cats.snapshotItem(i);
     
      if(cat.parentNode.nodeName == "DT") {
	/* Main category */
       
	var r = cat.href.match(/brwsearch.php\?b=1&d=(\d00)/);
	catNum.push(r[1]);
	catMain.push(r[1]);
	catName.push(cat.innerHTML);
      } else if(cat.parentNode.nodeName == "NOBR") {
	/* Sub category */
       
	var r = cat.href.match(/brwsearch.php\?b=1&c=(\d)(\d+)/);
	catNum.push(r[1]+r[2]);
	catMain.push(r[1]+'00');
	catName.push(cat.innerHTML);
      }
    }
   
    if(!catNum.length) return;
   
    var div = document.createElement('div');

    var sel = document.createElement('select');
    sel.setAttribute('name', 'tpb_subcat');
    var selText = document.createElement('b');
    selText.innerHTML = selectTextStr;


    var chk = document.createElement('input');
    chk.setAttribute('type', 'checkbox');
    chk.setAttribute('name', 'tpb_noseed');
    if(getVar("tpb_noseed")) {
      chk.setAttribute('checked', '1');
    }
    chk.setAttribute('value', '1');

    var chkLabel = document.createElement('label');
    chkLabel.setAttribute('for', 'noseed');
    var chkText = document.createTextNode(checkTextStr);
    chkLabel.appendChild(chk);
    chkLabel.appendChild(chkText);

    var opt;
    var label;
   
    opt = document.createElement('option');
    opt.setAttribute('value', '0');
    opt.innerHTML = "---";
    sel.appendChild(opt);
   
    for(i=0;i<catNum.length;i++) {
      if(catNum[i] == catMain[i]) {
	label = catName[i];
      } else {
	label = getMainName(catMain[i])+' / '+catName[i];
      }
     
      opt = document.createElement('option');
      opt.setAttribute('value', catNum[i]);
      if(getVar("tpb_subcat") == catNum[i]) {
	opt.setAttribute('selected', '1');
      }
      opt.innerHTML = label;
      sel.appendChild(opt);
    }
    
    div.appendChild(selText);
    div.appendChild(sel);
    div.appendChild(document.createElement('br'));
      
    if(isFirstPage(top)) {
      var labelParent = top.document.getElementsByTagName('label')[0].parentNode;
      
      labelParent.appendChild(chkLabel);
      labelParent.appendChild(div);
    } else {
      var form = top.document.getElementsByTagName('form')[0];

      form.appendChild(chkLabel);
      form.appendChild(div);
    }
   
    var t = top.document.getElementById("tpb_cat_page");
    t.parentNode.removeChild(t);
  }

  function getPageUrl(pnum) {
    var tmp = getVar("page");
    if(tmp == "") {
      var tmp2 = top.location.href.replace("#", "");
      return tmp2+"&page="+pnum;
    } else {
      var oldnum = parseInt(tmp);
      return top.location.href.replace("&page="+oldnum, "&page="+pnum);
    }
  }

  function getThisPageNum() {
    var tmp = getVar("page");
    
    if(tmp == "") {
      return 0;
    }

    return parseInt(tmp);
  }

  function getNextPage(pnum) {
    var url = getPageUrl(pnum);

    GM_xmlhttpRequest({
      method:'GET',
	       url: url,
	       onload: function(result) {
	
	var thisPage = parseInt(top.document.body.getAttribute("nextpage"));
	var resultCnt = parseInt(top.document.body.getAttribute("counter"));
	var stopSearch = parseInt(top.document.body.getAttribute("stopsearch"));
	var startPage = parseInt(top.document.body.getAttribute("startpage"));

	function isSearchBroken(data) {
	  if(!data.match(/<body[^>]*>\n/)) {
	    var r = data.match(/(<body.*)/);
	    alert("DEBUG: Broken page: \""+r[1].substr(0,40)+"\"");
	    return 1;
	  }
	  return 0;
	}

	function isLastPage(data) {
	  if(data.match(/\/img\/next\.gif/)) {
	    return 0;
	  }
	  return 1;
	}
	
	function getRowData(data) {
	  var tmp = data.split("</thead>");
	  var raw = tmp[1];
	  
	  return raw.split("<tr><td colspan")[0];
	}

	function makeRowList(rowDataFull) {
	  var out = new Array();

	  var list = rowDataFull.split("</tr>");

	  for(var i=0;i<list.length;i++) {
	    var tmp = list[i];
	    tmp = tmp.replace("<tr>", "");
	    tmp = tmp.replace('<tr class="alt">', '');

	    out.push(tmp);
	  }
	  
	  return out;
	}

	var data = result.responseText;

	if(isSearchBroken(data)) {
	  var text = top.document.evaluate("//b[@class='tpb_search_status']",
					   top.document, null,
					   XPathResult.FIRST_ORDERED_NODE_TYPE,
					   null).singleNodeValue;
	  text.innerHTML = brokenTextStr;
	  return 0;
	}

	var cat = getVar("tpb_subcat");
	var hideseed = 0;

	if(getVar("tpb_noseed") == "1") {
	  hideseed = 1;
	}
	
	var rows = makeRowList(getRowData(data));

	var insertPoint = 
	  top.document.evaluate("//td[@colspan='9']", top.document, null,
				XPathResult.FIRST_ORDERED_NODE_TYPE,
				null).singleNodeValue.parentNode;
	  
	for(var i=0;i<rows.length;i++) {
	  var show = 0;

	  /* Check category */

	  var r = rows[i].match(/brwsearch.php\?b=1.*c=(\d+)/);
	  if(!r) continue;

	  if((cat.substring(1,3) == "00") &&
	     (r[1].substr(0,1) == cat.substr(0,1))) {
	    show = 1;
	  } else if(cat == r[1]) {
	    show = 1;
	  }

	  /* Check seed */
	  
	  if(hideseed && show) {
	    var line = rows[i].split("\n");
	    if(line[8].match(/<td align="right">0<\/td>/)) {
	      show = 0;
	    }
	  }

	  if(show) {
	    var tr = top.document.createElement('tr');
	    insertPoint.parentNode.insertBefore(tr, insertPoint);
	    tr.innerHTML = rows[i];
	    resultCnt++;
	  }
	}

	if(!stopSearch && data.match(/\/img\/next\.gif/) && 
	   (resultCnt < maxResults)) {
	  //	  alert("DEBUG: Next page is "+(thisPage+1));
	  var text = top.document.evaluate("//b[@class='tpb_search_status']",
					   top.document, null,
					   XPathResult.FIRST_ORDERED_NODE_TYPE,
					   null).singleNodeValue;
	  text.innerHTML = searchTextStr+(thisPage+1)+stopTextStr;

	  top.document.body.setAttribute("nextpage", thisPage+1);
	  top.document.body.setAttribute("counter", resultCnt);
	  /*
	  for(var i = startPage; i<=thisPage;i++) {
	    var link = top.document.getElementById('tpb_link_page_'+i);
	    if(link) link.style.display = 'none';
	  }
	  */
	  var link = top.document.getElementById('tpb_link_next');
	  var r = link.href.match(/&page=(\d+)/);
	  if(r) {
	    link.href = link.href.replace("&page="+r[1],
					  "&page="+(thisPage+1));
	  }
	  getNextPage(thisPage+1);
	} else {
	  if(!data.match(/\/img\/next.gif/)) {
	    var link = top.document.getElementById('tpb_link_next');
	    if(link) link.style.display = 'none';
	  }
	  var text = top.document.evaluate("//b[@class='tpb_search_status']",
					   top.document, null,
					   XPathResult.FIRST_ORDERED_NODE_TYPE,
					   null).singleNodeValue;
	  text.innerHTML = doneTextStr;
	}
      }
    });
    
    return retVal;
  }
  
  function hideOtherCategories() {
    if(self.location.href!=top.location.href) {
      return;
    }
    
    var resultCnt = 0;
    var rows = document.evaluate("//td[@class='vertTh']", document, null,
				 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				 null);
    var cat = getVar("tpb_subcat");
    var hideseed = 0;

    if(getVar("tpb_noseed") == "1") {
      hideseed = 1;
    }

    for(i=0;i<rows.snapshotLength;i++) {
      var cell = rows.snapshotItem(i);
      var row = cell.parentNode;
      var link = cell.childNodes[0];
     
      var r = link.href.match(/brwsearch.php\?b=1&[cd]=(\d+)/);
      var show;
      if(!cat || cat == '0' || cat == '') {
	show = 1;
      } else {
	show = 0;
      }
     
      if((cat.substring(1,3) == "00") &&
	 (r[1].substr(0,1) == cat.substr(0,1))) {
	show = 1;
      } else if(cat == r[1]) {
	show = 1;
      }
     
      if(hideseed && row.childNodes[13].innerHTML == "0") {
	show = 0;
      }
     
      if(show) {
	if(row.style.display != 'none') {
	  row.style.display = 'table-row';
	  resultCnt++;
	}
      } else {
	row.style.display = 'none';
      }
    }

    if(resultCnt < maxResults) {
      var head2 = top.document.getElementsByTagName('h2')[0];
      if(head2.childNodes[1].nodeValue.length != 1) return;
      var link = top.document.createElement('a');
      link.setAttribute('href', '#');
      link.setAttribute('onclick', 
			"top.document.body.setAttribute('stopsearch', '1');");
      var text = top.document.createElement('b');
      text.setAttribute('class', 'tpb_search_status');
      var pnum = getThisPageNum();
      var nextPage = pnum+1;

      text.innerHTML = searchTextStr + nextPage + stopTextStr;
      link.appendChild(text);
      head2.appendChild(link);

      top.document.body.setAttribute("startpage", pnum);
      top.document.body.setAttribute("nextpage", nextPage);
      top.document.body.setAttribute("counter", resultCnt);
      top.document.body.setAttribute("stopsearch", "0");
      getNextPage(nextPage);
    }

    return;
  }

  function rewriteLinks() {
    if(self.location.href!=top.location.href) {
      return;
    }

    var links = 
      document.evaluate("//td[@colspan='9']/a[starts-with(@href,'?q=')]",
			document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var last = 1;

    for(var i=0;i<links.snapshotLength;i++) {
      var link = links.snapshotItem(i);
      var href = link.href;
      if(link.childNodes.length > 0) {
	if((link.childNodes[0].nodeName == 'IMG') &&
	   (link.childNodes[0].src.match(/next.gif/))) {
	  last = 0;
	}
      }

      var r = link.href.match(/&page=(\d+)/);

      link.href = href.replace("?q=",
			       "?tpb_subcat="+getVar("tpb_subcat")+
			       "&tpb_noseed="+getVar("tpb_noseed")+
			       "&q=");
      if(r) {
	link.setAttribute('id', 'tpb_link_page_'+r[1]);
	if(!last) {
	  link.setAttribute('id', 'tpb_link_next');
	}
      }
    }

    lastPage = last;
  }

  pageCleanup();

  if(top.location.href == self.location.href) {
    setupCategoriesFrame();
    rewriteLinks();
    hideOtherCategories();
  } else {
    if(getSubVar("tpb_placeholder") == "1") {
      getCategories();
    }
  }
 

})();
