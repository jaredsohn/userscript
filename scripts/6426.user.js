// ==UserScript==
// @name          GCN GRB Linker
// @description   Inserts links to GRBs in GCNs
// @include       http://gcn.gsfc.nasa.gov/*
// @namespace     cbmarkwardt.com
// ==/UserScript==
// This Greasemonkey script modifies GCN pages.  Primarily
// it updates GCN Circular pages so that:
//  * mentions of GCN NNNN have a link to the actual circular;
//  * mentions of GRB YYMMDD have a link to the GCN summary for that GRB;
//  * the GCN page has a proper title (NUMBER+SUBJECT)
//  * web and FTP links are clickable
// Modification History:
//   11 Jul 2007 - extensive modifications to parse more GCN and GRB
//     references, and also to make web links hot.
//   31 Aug 2009 - extensive changes again, to work with Firefox 3,
//     and also to parse more kinds of GCN citations.
//   26 May 2010 - parse GRBs after the 2010 rollover, and also GCN
//     circulars above 10000
// 
var mybody=document.getElementsByTagName("body").item(0);
var child=mybody.childNodes[0];


function repstr(node, regexp, href) {
    // Make an independent copy, so when we fiddle with the DOM, we don't
    // end up in an infinite loop.
    var els0 = node.childNodes;
    var els = new Array;
    var i;
    for (i = 0; i < els0.length; i++) {
	els.push(els0[i]);
    }

    for (i = 0; i < els.length; i++) {
	var text = els[i].textContent;
	var match = text.match(regexp);
	while (match) {
	    var index0 = match.index;
	    var match0 = match.shift();
	    var matchn = match.join("");
	    var extra = match0.length - matchn.length;
	    
	    var index = index0 + extra;
	    if (index > 0) {
		var pretext = text.slice(0,index);
		node.insertBefore(document.createTextNode(pretext), els[i]);
	    }
	    
	    var endindex = index0 + match0.length;

	    var a = document.createElement('A');
	    a.setAttribute('HREF', match0.replace(regexp, href));
	    a.appendChild(document.createTextNode(text.slice(index,endindex)));

	    node.insertBefore(a, els[i]);
	    
	    text = text.slice(endindex);
	    match = regexp(text);
	}
	els[i].textContent = text;
    }
}

if (document.contentType == 'text/plain' && child.nodeName == "PRE") {
  var text = child.textContent;
  var title, mtch, gcn, html, ra, dec, good, name;
  var simbad_query, ned_query, heasarc_query, query_html, qprompt;
  var pre = child;

  title = null;
  if (location.href.match(/other/)) {
    mtch = /other\/(\d{6})\.gcn3/.exec(location.href);
    if (mtch) { title = 'GRB '+mtch[1]+' GCN Archive'; }
  } else {
    gcn = ''; subject = '';
    mtch = /NUMBER: *(.*)\n/.exec(text);
    if (mtch) { gcn = 'GCN #'+mtch[1]; }
    mtch = /SUBJECT: *(.*)\n/.exec(text);
    if (mtch) { subject = mtch[1]; }
    title = gcn+': '+subject;
    if (title == ': ') { title = null; }
  }

  // Search for GRB YYMMDD text and insert a GCN link
  // The initial term ensures that URLs of the form xxx/grb070518/ don't
  // trigger the pattern.
  repstr(pre, /(?:[ \n"'\(\)\[\]])(GRB *|XRF *)?([019][0-9][01][0-9][0-2][0-9])([a-dA-D])?\b/,
		    "/other/$2.gcn3");

  // GCN citations of the form (GCN Circ. NNNN)
  // Variations: with/without period, with/without # sign, number of spaces
  repstr(pre, /(GCN)(\s*)(C|Circ\.?|Circular)?(\s*)(No\.?|Num\.?|#)?(\s*)([0-9]{3,5})/m, "/gcn3/$7.gcn3");

  // Make web links on their own line hot
  repstr(pre, /(?:\s|:|\()(http|ftp)(:[^ \n\[\]\(\)'"<,\$\*]*[^ \n\[\]\(\)'"<,\$\*.!@&])/,
              "$1$2");

  if (title != null) { document.title = title; }
}

