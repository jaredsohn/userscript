// ==UserScript==
// @name          Runescape FULL world access Xtreme
// @namespace     http://www.trancenotes.com/
// @description	  enables full worlds to have links, as if they where vacant...
// @include       *runescape.com/*
// ==/UserScript==

//--------User setup--------
var defLinkColor="FFEBCA"; // artificial link color in hexdecimal values EG: FFFFFF=white, 0000FF=blue.

var LinkColor = GM_getValue('gmLinkColor', defLinkColor);

var d=document;
var r=0;
var u="p0,g1";
var worldprefixes = new Array();
var currentpage = window.location.href;
var trashyURL = currentpage.slice(currentpage.indexOf("?")+1);


if(trashyURL.indexOf("rs.") != -1){
  if(trashyURL.indexOf("safe=on") != -1){
    u="p0,s1"; 
  } else{
    u="p0";
  }
} else if(trashyURL.indexOf("safe=on") != -1){
    u="p0,g1,s1";
}




function WorldLinkFunc(wn,wlffull) {

	var WorldLink = document.createElement('td');
	if(wlffull){
	WorldLink.innerHTML = '<span id=golden>'+
	'<a href="http://'+"world"+wn+'.runescape.com/'+u+'">World '+wn+'</a></span>'
	} else {
	WorldLink.innerHTML = '<a href="http://'+"world"+wn+'.runescape.com/'+u+'">World '+wn+'</a>';
	}
	return WorldLink.innerHTML;
}

var currentpage = window.location.href;
if(currentpage.indexOf("slj.ws") != -1 ){ 
	var thiscell;
	var thisworldnumloc;
	var thisworldnum;
	var thiscellstr;
	var thisworldnumendloc;
	var fullbol
    var allPagetags=document.getElementsByTagName("*"); 

         for (i=0; i<allPagetags.length; i++) { 
	 //Pick out the tags with our class name 
	 if (allPagetags[i].className=="slistHeader") { 
	   var table = allPagetags[i].parentNode; 
	   var cells = table.getElementsByTagName("td");
	 } 
	 } 
	for (var i = 0; i < cells.length; i++) {
		thiscell = cells[i];
		thiscellstr = thiscell.innerHTML;
		fullbol = false;
		
		if (thiscellstr.indexOf('World ') != -1){
			thisworldnumloc = thiscellstr.indexOf('World ')+6;



			thisworldnumendloc = thiscellstr.indexOf('</a>');
			if(thisworldnumendloc == -1){
				thisworldnumendloc = thiscellstr.length;
				fullbol = true;
				//alert('loc is = '+thisworldnumloc+'; '+'and endloc is = '+thisworldnumendloc);
				thisworldnum = thiscellstr.slice(thisworldnumloc,thisworldnumendloc);
				//if(i>120 && i<130 {alert(thiscellstr.split(thisworldnumloc,thisworldnumendloc))}
				thiscell.innerHTML = WorldLinkFunc(thisworldnum,fullbol);
			}
		}
		
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('#golden a { color: #'+LinkColor+'; }');


GM_registerMenuCommand('White links', function() {

    LinkColor = "FFFFFF";

    GM_setValue('gmLinkColor', LinkColor);

  });
  
GM_registerMenuCommand('Yellow links', function() {

    LinkColor = "FFFF00";

    GM_setValue('gmLinkColor', LinkColor);

  });

GM_registerMenuCommand('Red links', function() {

    LinkColor = "FF0000";

    GM_setValue('gmLinkColor', LinkColor);

  });


GM_registerMenuCommand('Dark Green links', function() {

    LinkColor = "00A05B";

    GM_setValue('gmLinkColor', LinkColor);

  });

GM_registerMenuCommand('Rune links', function() {

    LinkColor = "1E95BC";

    GM_setValue('gmLinkColor', LinkColor);

  });
  
GM_registerMenuCommand('Use default link color', function() {

    GM_setValue('gmLinkColor', defLinkColor);

  });