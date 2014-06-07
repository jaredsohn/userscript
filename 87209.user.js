// ==UserScript==
// @name           Imdb links
// @namespace      http://diveintogreasemonkey.org/download/
// @description    Links in Movie Pages
// @include        http://www.imdb.com/title/*
// ==/UserScript==

var allheaders = document.getElementsByTagName('h1');
var header = allheaders[0];

var alltitles = document.getElementsByTagName('title');
var titl = alltitles[0];

var movietitle = titl.innerHTML.substring(0, titl.innerHTML.lastIndexOf('(')-1);
movietitle = movietitle.replace('IMDb - ', '');

// -------- Link to LegendasDivx ----------
var linkleg = document.createElement('a');
linkleg.href = "http://www.legendasxvid.net/modules.php?name=Downloads&file=jz&d_op=search_next&query="+movietitle;
linkleg.target="_blank";
linkleg.style.marginLeft="10px";
linkleg.title="Find in LegendasDivx";
var imgleg = document.createElement('img');

imgleg.src = 'data:image/x-icon;base64,'+
'AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAA////AAD/AAAA//8AAAD/AAD/AAAAAP8AgICAAMDAwACAgAAAgACAAIAAAAAAgIAA'+
'AIAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEBEAEQAAAAEAEAEAEAAAAAARAQEQAAAAABAB'+
'AAAAAAAAEQARAAAAAAAAAAAAAAANIiJEROAAAA3SIzRO4AAADd0zM+7gAAAN3TMz7uAAAA3SIzRO'+
'4AAADSIiRETgAAAAAAAAAAAAAAAAAAAAAAAf+AAAQAIAAAAAAABAAgAAEAAAAFACAAAQAAAAQAIA'+
'AAAAAABAAgAAAAAAAEACAAAAAAAAQAIAAAAAAABf+gAA';

imgleg.style.border="none";
linkleg.appendChild(imgleg);
//-----------------------------------------

// -------- Link to Isohunt ----------
var linkiso = document.createElement('a');
linkiso.href = "http://isohunt.com/torrents/"+movietitle+"?iht=-1&ihp=1&ihs1=1&iho1=d";
linkiso.target="_blank";
linkiso.style.marginLeft="10px";
linkiso.title = "Find in Isohunt";
var imgiso = document.createElement('img');

imgiso.src = 'data:image/x-icon;base64,'+ 'AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAD39vX28e/5+fUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAACkim2EWjTazb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACk'+
'imdmMwDBq5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQv6qymH4AAACulH1mMwCpi3EA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD08O16UCaAXDPs5N/Mu6xmMwCgfl8AAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAD7+viadFNzRRPl3tjn39dyRBaJYz4AAAAAAAAAAAC7qJaQbUvfzsYA'+
'AAAAAAAAAAAAAAC1m4ZmMwDGs57p4tqFXjh9VCXo4dgAAAAAAADZyrx1SByMbEUAAAAAAAAAAAAA'+
'AADJvKtsPQujh2n7+/qUd1dmMwB1Rxl3SRx3SRx1RxlmNAGKZj/l2NMAAAAAAAAAAADk1c5wQBGN'+    'Z0H18O2niGNmMwBtPA52SRx2SRx2SRxtPQxoNQPl2tQAAAAAAAAAAADz8eyHXz9xQxXt6OTMvrNp'+
'NwW1mYQAAAAAAAAAAACxloNmMwC6p40AAAAAAAAAAAAAAACjgGJsOgrTx7Xs49uFXjeXdlXv6uMA'+
'AAAAAADXzb9sPAujgWYAAAAAAAAAAAAAAAC/rZlmNAG4n4gAAAAAAAAAAAAAAAAAAAAAAADn39d3'+    'TCGDWS7PwbQAAAAAAAAAAADx7ei6pI7Yyr0AAAAAAAAAAAAAAAAAAAAAAAAAAACJZD9rOgrIs54A'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGsZxmMwCkjnAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSwLdtPQqDWjL08vAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7uju6eQAAADx/wAA8f8AAPH/AACR/wAAAf8AAAHHAACA'+
'xwAAgAMAAIADAACA4wAAwGMAAMfhAADH8QAA//EAAP/wAAD/+QAA';

imgiso.style.border="none";
linkiso.appendChild(imgiso);
//-----------------------------------

// -------- Link to VideoETA ----------
var linketa = document.createElement('a');
linketa.href = "http://videoeta.com/search/?search_query="+movietitle;
linketa.target="_blank";
linketa.style.marginLeft="10px";
linketa.title = "Find in VideoETA";
var imgeta = document.createElement('img');

imgeta.src = 'data:image/png;base64,'+
'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'+
'rkJggg==';

imgeta.style.border="none";
linketa.appendChild(imgeta);
//-----------------------------------

// -------- Link to PirateBay ------------
var linkpir = document.createElement('a');
linkpir.href = "http://thepiratebay.org/search/"+movietitle+"/0/7/0";
linkpir.target="_blank";
linkpir.style.marginLeft="10px";
linkpir.title = "Find in PirateBay";
var imgpir = document.createElement('img');

imgpir.src = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACx'+
'jwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAdVJREFU'+
'OE+VUk2oqVEU/XgZSX4nUn5SFJmSItw3MpXyN8DATIqJMqREypQBM38RYqAMJEqZkpKBiZKJkswQ'+
'b917bu5z73u37h583zr77LXPWWsf2v1+p34UICCWy6XVarVYLL+/xMtb1Go1UkmRX6PR+P4Yu93+'+
'RGi324TAYDDodDqfz+dwOL/egkajIe92u/9B0Gg08/nc6/V2u93VahUIBABSqRQILpfridBqtZDV'+
'arXb7RZ7EolEqVTK5fLZbJZMJrHlcDieCIVCgVyJzWb/LYbFYuFWpNf5fP4Q/SBgD+2ZTCaAQqGA'+
'JMJXq9XvhMViEQ6H8/k86aTT6WCISCQChhiDwcDlcoHh+O12u16v1HA4xDoej2ez2XK53Ov16vV6'+
'pVIBLpVKzWYTBnY6HWjL5XIej4eKxWKkgclk8vl8oEHo5XIhEg+Hw2QyKRaLiUQCXpvNZqrf7weD'+
'QaBqtRqNRgUCAfj46vV6mUwmFAqNRiN8w7BVKhWse530brfDmKRSKbKwD/ZnMpl0Om2z2VAEQigU'+
'EovFfr9/NBq9Ek6nE4/Hi0Qix+OR3OQRyIzHY6fTiWOn0+m7rdA+GAz2+/2n6sdys9ngaa7X6485'+
'/K/0kYenBP8BvDt1we4TRq4AAAAASUVORK5CYII=';

imgpir.style.border="none";
linkpir.appendChild(imgpir);
//-----------------------------------------

// -------- Link to OpenSubtitles ------------
var linkops = document.createElement('a');
linkops.href = "http://www.opensubtitles.org/pt/search2/sublanguageid-eng/moviename-"+movietitle;
linkops.target="_blank";
linkops.style.marginLeft="10px";
linkops.title = "Find in OpenSubtitles";
var imgops = document.createElement('img');

imgops.src = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAnUlEQVQokc1SUQ1DIQxs5wAk1AIW'+
'sABWagELWKgWLNRCkcA+upCw7OPlZVl2H017ydG7BoAbWGuttS42jzsbfoXeuxsVEWeIyMycNDMn'+
'XxmYGQAQERH3KCK1VkSMMc45j+dVlYi8DyGoqpM5589+zCyEsAVuIOfsflQ1pXQImLn3vsO01gDA'+
'qyt95wEReQs9xtihSylXLvct/NlfegLxtZUd3E9jfAAAAABJRU5ErkJggg==';

imgops.style.border="none";
linkops.appendChild(imgops);
//-----------------------------------------

// -------- Link to Google Translation ------------
var linkpt = document.createElement('a');
linkpt.href = "http://www.google.com/search?q="+movietitle+"+site%3Apt";
linkpt.target="_blank";
linkpt.style.marginLeft="10px";
linkpt.title = "Find portuguese translation";
var imgpt = document.createElement('img');

imgpt.src = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKnRFWHRDcmVhdGlvbiBUaW1lAERv'+
'IDEgQXByIDIwMDQgMTY6MTI6MDUgKzAxMDDG+XDTAAAAB3RJTUUH1AcHCB0YiJ+1wgAAAAlwSFlz'+
'AAAK8AAACvABQqw0mAAAAARnQU1BAACxjwv8YQUAAAInSURBVHjanVPLahRBFD1V/ZieOMRIcGJw'+
'GHQEVz4ILiQuRVzNIh8g+AP+hODanQtB8AdcqSs3LrMVMVFEEWMEHTMTJt32dHe9vPVIBlyFFH27'+
'qpt7T51zbhWDHwwnG4ZlT3m1kGYcysBoQGmDdGbMz+dpOUk0NP2nB1rQWmtIyslLUdzYNesE8Cc+'+
'02onNwc9bihJUkIpBXSlkd66kJ5DAwgRogYa+11ha2svosWQAF5zphjaUYKMR0jjiDhxDFQH1SlS'+
'pS1J48Mzdmob7RRfpMhiRus0jsGYQSdnuP9hGaolMS5r/B60cPWLRGKTDLeKHYDwgNx+cKebXoVS'+
'eFD1MXxVYP3XHSyXV7D6cYp31xYDAx2sJk/UkfGMW5P+NjU6UwZGa8liPDv7CG+HT8C/T5B2MxgZ'+
'ZBgvSel507h1t5ASU1ljc7aPdH+KldPAebWDZClDnjdgWiK0iIj4bhyO2Dlf1xiTB71kAaO1Jdx7'+
'cRtiscToehc9aqvvI/FWwgGoeT1iRfTyunGGP9TvsXG3j8t5jbWvEWSb4dKbH6SUioklpAdRR12x'+
'DAiuoP4a2umApD3W21hBgu3Pq1RIO8IWi3mQHCH/AzhQdEAIwJCx0iiMuE9ERLMKuzsfLAMJ49z0'+
'lsbJni6ryYxDeqOt1IgO3afNHYxj446uop/KYdlSjd3CVAHA9bJPsRFmdoyLFQ4FvlG8tMkZRTfM'+
'x76FFDN7mQ53O/F1/gcWjD/SyAuHOQAAAABJRU5ErkJggg==';

imgpt.style.border="none";
linkpt.appendChild(imgpt);
//-----------------------------------------
var spans = header.getElementsByTagName('span');
var span = spans[0];

span.parentNode.insertBefore(linkpt, span.nextSibling);
span.parentNode.insertBefore(linketa, span.nextSibling);
span.parentNode.insertBefore(linkops, span.nextSibling);
span.parentNode.insertBefore(linkleg, span.nextSibling);
span.parentNode.insertBefore(linkpir, span.nextSibling);
span.parentNode.insertBefore(linkiso, span.nextSibling);












