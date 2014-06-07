// ==UserScript==
// @name           Wikipedia undelete Updated
// @url            http://userscripts.org/scripts/source/159804.user.js
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Salvages deleted Wikipedia articles from archive.org, as you encounter them.
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/node.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/wget.js
// @include        http://*.wikipedia.org/*
// ==/UserScript==

//alert('test0'); // for debugging

var url = "http://web.archive.org/web/*/" + location.href;
var deleted = $X('//div/p[1][contains(.,"This page has been deleted.")]');
var desc = $X('//b[contains(.,"Wikipedia does not have an article with this exact name.")]');

//alert('test1'); // for debugging

if (deleted && desc) {
  //alert('test2'); // for debugging
  wget$x(url, gotArchivePage, // scrape the archive.org page for links matching:
         '//a[contains(@title,"snapshot")]' + // file changed
         '[starts-with(@href,"http://web.archive.org/web/") or starts-with(@href,"/web/")]' + // @archive.org
         '[contains(@href,"'+ location.href +'")]');            // for this url
}

function gotArchivePage(links) {
  var ul;
  for each (var a in links) {
    //if (!ul) ul = node({ after: desc, tag: "<ul/>" });
	if (!ul) {
		ul = document.createElement("ul");
		desc.parentNode.insertBefore(ul, desc.nextSibling);
	}
    //var li = node({ prepend: ul, tag: "<li/>" });
	var li = document.createElement('li');
	if (ul.firstChild){
		ul.insertBefore(li, ul.firstChild);
	} else {
		ul.appendChild(li);
	}
	var cur_href=a.getAttribute('href');
	a.setAttribute('href',cur_href.replace(/^\/web\//g, "http://web.archive.org/web/"));
	a.innerHTML=a.getAttribute('class').replace(/(\w+)-(\w+)-(\w+)/g, "$1 $2, $3");
    li.appendChild(document.importNode(a, true));
  }
  if (ul) {
    var versions = "version" + (links.length == 1 ? "" : "s");
	var html_thanks = "<br/><b>Old article "+versions+" saved for posterity"+"            thanks to <a href="+ url +">archive.org</a>:</b><br/>";
    //node({ before: ul, tag: html_thanks });
	var thanks=document.createElement('span');
	ul.parentNode.insertBefore(thanks, ul);
	thanks.innerHTML=html_thanks;
  }
}
