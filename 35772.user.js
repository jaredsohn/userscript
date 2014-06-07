// ==UserScript==
// @name USPTO TIFF Image Links
// @namespace http://www.uspto.gov
// @description Adds links to TIFF files on USPTO patent image pages.
// @include http://patimg*.uspto.gov/*
// ==/UserScript==
//
// GreaseMonkey script to add TIFF image download links to the "Images"
// page for patent access. This allows you to avoid all the problems associated
// with viewing USPTO TIFF images in your browser. Instead, just right-click on 
// the numbered link at the top of the page and select "Save Link As...".
//
// This script also deletes the TIFF image from the web page so your browser
// won't even try to load the image -- you must use the links instead.
//
// This script is public domain.
//

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

var refer=document.getElementsByTagName('embed')
var docloc=refer[0].src
var p1=refer[0].parentNode
var p2=p1.parentNode
p2.removeChild(p1)

var tbls=document.getElementsByTagName('table')
var ntbl=tbls.length
var lastbl=tbls[ntbl-1]
var tbldata=lastbl.getElementsByTagName('td')
var fnts=tbldata[0].getElementsByTagName('font')
var pagecnt=1

for (var fnt=0; fnt < fnts.length; fnt++) {
	var fntstr=fnts[fnt].innerHTML
	if ( fntstr.match(/1 +of +[0-9]+ +pages/) ) {
		var fntx=fnts[fnt].innerHTML
		fntx=fntx.replace(/^.*of */,'')
		fntx=fntx.replace(/ .*$/,'')
		pagecnt=parseInt(fntx)		
	}
}

addGlobalStyle('a.bright:link { color: #40A0FF }')

var ins=document.createElement('div')
ins.setAttribute('align','center')
ins.setAttribute('style','color:#FFFFFF; background-color:#001D2D')
document.body.insertBefore(ins,document.body.firstChild)
var dad=document.body.firstChild
var hdr=document.createElement('p')
hdr.innerHTML='TIFF Image Download Links by Page Number'
dad.insertBefore(hdr,null)
var pglinks=''

for (var pg=1; pg <= pagecnt; pg++) {
	var patch=docloc.replace(/PageNum=[0-9]+/,'PageNum='+pg)	
	pglinks=pglinks + '&nbsp<a class="bright" href="' + patch + '"> ' + pg + ' </a>&nbsp'
}

var p=document.createElement('p')
p.innerHTML=pglinks
dad.insertBefore(p,null)

