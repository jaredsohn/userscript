// ==UserScript==
// @name           Netflix New UI Sortable
// @namespace      psl
// @include        http://movies.netflix.com/*agid=*
// @description    Adds Sortable List button to genre/sub-genre pages of new UI
// ==/UserScript==

var current = location.href;
var gallery = location.href.match(/vt=tg/);
var sort = location.href.match(/vt=tl/);


///////////// Checks if gallery view tag (vt=tg) is present. ///////////////////
//////// If so, then replace tg with tl (list view) and create button /////////

if (gallery != null){

current = current.replace("tg", "tl");

var l = document.createElement('a');
var href = document.createAttribute('href');
l.setAttribute('href', current);
l.setAttribute('class', 'svf-button svfb-default');
l.setAttribute('style', 'width:6em;padding:6px 8px 6px 8px;');
//l.setAttribute('style', 'font-weight:bold;text-decoration:none;color:#444;background:#fefefe;font-size:12px;border:1px solid #ccc;padding:4px 6px 4px 6px;line-height:28px;');
l.innerHTML = " Sortable List";
document.getElementById('bd').getElementsByTagName("div")[0].appendChild(l);

}

//////// If gallery view tag is not present AND not already on sortable list page, //////////
/////////////////////// then add &vt=tl to url and create button ///////////////////////////

if ((sort == null) && (gallery == null)){

current = current +'&vt=tl';

var l = document.createElement('a');
var href = document.createAttribute('href');
l.setAttribute('href', current);
l.setAttribute('class', 'svf-button svfb-default');
l.setAttribute('style', 'width:6em;padding:6px 8px 6px 8px;');
l.innerHTML = "Sortable List";
document.getElementById('bd').getElementsByTagName("div")[1].appendChild(l);

}