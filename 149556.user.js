// ==UserScript==
// @name        Ekşi Sözlük Beta Güzelleştirici
// @namespace   eksisbg
// @description Ekşi Sözlük'ün dandik beta arabirimini yüzüne bakılır bir hale getirmek için ufak bir şey.
// @include     http://beta.eksisozluk.com/*
// @include     https://beta.eksisozluk.com/*
// @version     0.7
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// ==/UserScript==

////v0.1////

GM_addStyle("#aside {width:150px}");
GM_addStyle("#content-section {width:795px; background-color: #cccccc !important}");
GM_addStyle("#index-section {width:250px; margin-top:-20px; margin-bottom:-20px; background-color: #cccccc !important}");
GM_addStyle("#main {margin-left:250px !important}");
GM_addStyle("#logo {padding-top:5px; margin-left:67px !important}");
GM_addStyle("#logo a {background-size:100px !important}");
GM_addStyle("#top-bar {margin-left:0px; background-color: #cccccc; width:100% !important}");
GM_addStyle("#search-form {margin-left:-20px; !important}");

////v0.2////

GM_addStyle("body {font: 9pt Verdana, sans-serif; background-color: #cccccc; color: black !important}");

////v0.3////

GM_addStyle("#title {font: bold 12pt Verdana, sans-serif; color: #000080 !important}");
GM_addStyle(".sub-title-menu {text-align:right; margin-top:-20px !important}");
GM_addStyle(".share-dialog {text-align:left; width:275px !important}");
GM_addStyle(".dropdown-menu {text-align:left !important}");
GM_addStyle(".topic-list li{ border-top:0px !important}");
GM_addStyle(".topic-list.partial li>a {padding-top:1px; padding-bottom:1px !important}");
GM_addStyle(".topic-list.partial li>a small {color:black; font-size:1em !important}");
GM_addStyle(".topic-list.partial li.padded>a>small {position:relative; top:0px !important}");
GM_addStyle(".topic-list.partial li>a small:before {content:'('}");
GM_addStyle(".topic-list.partial li>a small:after {content:')'}");
GM_addStyle(".topic-list li>a:hover {background-color:#c0c0c0 !important}");
GM_addStyle("#entry-list {list-style:decimal !important}");
GM_addStyle("#entry-list li:before {content:''}");
GM_addStyle("#entry-list li {margin-left:45px !important}");
GM_addStyle("#entry-list article li {margin-left:0px !important}");
GM_addStyle("#entry-list li:before {border-bottom:0px !important}");

////v0.4////

GM_addStyle("a {color:#000080 !important}");
GM_addStyle("a:hover {color:#000080; background-color: #c0c0c0 !important}");
GM_addStyle("html.no-touch a:hover{text-decoration:none !important}");
GM_addStyle("#logo a:hover {background-color:transparent !important}");
GM_addStyle(".topic-list.partial li>a:before {content:'· ' !important}");
GM_addStyle(".topic-list.partial li {padding-right: 5px !important}");

////v0.5////

GM_addStyle("#entry-list footer div.feedback > a, #entry-list footer div.options > a, #entry-list footer div.other > a, #entry-list footer .rate-options a, #entry-list footer time, #entry-list footer .vote-response-area {color: gray !important}");
GM_addStyle("#entry-list>li{position:relative !important}");
GM_addStyle("#entry-list>li:not(:last-child){margin-bottom:25px !important}");
GM_addStyle("#a3-toggle:before {content:'hayvan '}");
GM_addStyle("#advanced-search-form {left:300px !important}");

var oDraft = document.getElementById('save-draft-button');
oDraft.setAttribute('class', 'primary');

GM_addStyle("button, .primary {font: 8pt Arial,sans-serif; text-align: center; vertical-align: middle; white-space: nowrap; cursor: default; background-color: #566484; color: white; border: 2px outset #a6b4d4 !important}");
GM_addStyle("button:active, .primary:active, #save-draft-button:active {border: 2px inset !important}");
GM_addStyle(".edittools button {color:#fff;background-color:#456695;border:1px solid #6c8cbb;background-color:#476898;background-image:-moz-linear-gradient(top,#4d72a6,#3d5a84);background-image:-ms-linear-gradient(top,#4d72a6,#3d5a84);background-image:-webkit-gradient(linear,0 0,0 100%,from(#4d72a6),to(#3d5a84));background-image:-webkit-linear-gradient(top,#4d72a6,#3d5a84);background-image:-o-linear-gradient(top,#4d72a6,#3d5a84);background-image:linear-gradient(top,#4d72a6,#3d5a84);background-repeat:repeat-x !importanr}");
GM_addStyle(".edittools {position:relative; width:auto; margin-top:-207px; margin-bottom:190px; background:transparent; border:0px !important }");
GM_addStyle("fieldset legend {font: 9pt Verdana, sans-serif; background-color: #cccccc; color: black; border-bottom:0px; padding-top:20px; !important}");

var oBaslik = document.getElementsByTagName('h1')[0].getElementsByTagName('a')[0].innerHTML
document.body.innerHTML= document.body.innerHTML.replace("bilgi verin aydınlatın","\""+oBaslik+"\" hakkında kafanızda bir tanım veya verebileceğiniz bir örnek varsa eklemekten çekinmeyin:");

window.addEventListener("DOMContentLoaded", function() {
var oBastan = document.getElementsByTagName('h1')[0].getElementsByTagName('a')[0].href
var oShowall = document.getElementById('showall').href;
var Showall = document.getElementById('showall');
var ShowDiv = document.createElement('div');
ShowDiv.setAttribute('id', 'show');
var ShowallButton = document.createElement('button');
ShowallButton.type = 'button';
ShowallButton.textContent = 'tümünü göster';
ShowallButton.setAttribute('onClick', 'location.href=\''+oShowall+'\'');
ShowallButton.setAttribute("class", "primary");
var Bosluk = document.createElement("span");
Bosluk.innerHTML = '&nbsp;';
var BastanButton = document.createElement('button');
BastanButton.type = 'button';
BastanButton.textContent = 'en baştan göster';
BastanButton.setAttribute('onClick', 'location.href=\''+oBastan+'\'');
BastanButton.setAttribute("class", "primary");
ShowDiv.appendChild(ShowallButton);
ShowDiv.appendChild(Bosluk);
ShowDiv.appendChild(BastanButton);
Showall.parentNode.insertBefore(ShowDiv, Showall);
}, false);

GM_addStyle("#showall {display:none !important}");

////v0.6////

window.addEventListener("DOMContentLoaded", function() {
var relatedVideos = document.getElementById('related-videos-section');
relatedVideos.parentNode.removeChild(relatedVideos);
}, false);

window.addEventListener("DOMContentLoaded", function() {
var oLegend = document.getElementById('in-topic-search-options').getElementsByTagName('input')[1];
var leggy = document.createElement('legend');
leggy.setAttribute('style', 'font-size:x-small');
leggy.innerHTML = ('başlık içinde ara');
oLegend.parentNode.insertBefore(leggy, oLegend);
}, false);

GM_addStyle("#in-topic-search-options {display:inline; width:166px; margin-left:19px; z-index:0; !important}");
GM_addStyle("#in-topic-search-options input[type=text]{width:80%;max-width:100%;float:left !important}");
GM_addStyle("#in-topic-search-options {background-color:#cccccc; -webkit-border-radius:0px;-moz-border-radius:0px;border-radius:0px;-webkit-box-shadow:0 0px 0px rgba(0,0,0,0.25);-moz-box-shadow:0 0px 0px rgba(0,0,0,0.25);box-shadow:0 0px 0px rgba(0,0,0,0.25); border:0px !important}");
GM_addStyle("#in-topic-search-options>li:hover {background-color:#cccccc !important}");
GM_addStyle("#in-topic-search-options fieldset {border: 2px groove #eeeeee; padding:2px; overflow:hidden; white-space:nowrap !important}");
GM_addStyle("#in-topic-search-options fieldset legend {padding-top:0px; text-align:left; width:auto !important}");
GM_addStyle("#in-topic-search-options .ui-autocomplete {text-align:left; right:0px; overflow:hidden; width:auto !important}");
GM_addStyle("#in-topic-search-toggle {display:none; !important}");
GM_addStyle("#topic fieldset.vertical legend {margin-bottom:18px !important}");

////v0.7////

GM_xmlhttpRequest({
method: "GET",
url: "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+oBaslik+"",
onload: function(response) { 
var goog = JSON.parse(response.responseText);
var oResim = document.getElementById('in-topic-search-options').getElementsByTagName('li')[0];

var reslink = document.createElement('a');
reslink.setAttribute('id', "res");
reslink.setAttribute('class', "fancybox");
reslink.setAttribute('href',goog.responseData.results[0].unescapedUrl);
//reslink.setAttribute('title',""+oBaslik+"");

var resim = document.createElement('img');
resim.setAttribute('src',goog.responseData.results[0].unescapedUrl);
resim.setAttribute('style','width:150px;');
reslink.appendChild(resim);
oResim.appendChild(reslink);
}
});

var js1 = document.createElement('script');
js1.src = 'http://cdn.jsdelivr.net/fancybox/2.1.0/lib/jquery.mousewheel-3.0.6.pack.js';
js1.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(js1);

var js2 = document.createElement('script');
js2.src = 'http://cdn.jsdelivr.net/fancybox/2.1.0/jquery.fancybox.js';
js2.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(js2);

var js3 = document.createElement('script');
js3.src = 'http://cdn.jsdelivr.net/fancybox/2.1.0/helpers/jquery.fancybox-buttons.js';
js3.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(js3);

var js4 = document.createElement('script');
js4.src = 'http://cdn.jsdelivr.net/fancybox/2.1.0/helpers/jquery.fancybox-media.js';
js4.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(js4);

var js5 = document.createElement('script');
js5.src = 'http://cdn.jsdelivr.net/fancybox/2.1.0/helpers/jquery.fancybox-thumbs.js';
js5.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(js5);

var css1 = document.createElement('link');
css1.rel = 'stylesheet';
css1.href = 'http://cdn.jsdelivr.net/fancybox/2.1.0/jquery.fancybox.css';
css1.type = 'text/css';
css1.media = 'screen';
document.getElementsByTagName('head')[0].appendChild(css1);

var css2 = document.createElement('link');
css2.rel = 'stylesheet';
css2.href = 'http://cdn.jsdelivr.net/fancybox/2.1.0/helpers/jquery.fancybox-buttons.css';
css2.type = 'text/css';
css2.media = 'screen';
document.getElementsByTagName('head')[0].appendChild(css2);

var css3 = document.createElement('link');
css3.rel = 'stylesheet';
css3.href = 'http://cdn.jsdelivr.net/fancybox/2.1.0/helpers/jquery.fancybox-thumbs.css';
css3.type = 'text/css';
css3.media = 'screen';
document.getElementsByTagName('head')[0].appendChild(css3);

window.addEventListener("DOMContentLoaded", function() {
var script = document.createElement("script");
script.type = 'text/javascript';
script.textContent = (<r><![CDATA[
function load() {
$("#res").fancybox({
padding: 0,
openEffect : 'elastic',
closeEffect : 'elastic',
closeClick : true,
});
}
]]></r>).toString();
document.getElementsByTagName('head')[0].appendChild(script);
}, false);

document.body.setAttribute('onload','load()');

GM_addStyle(".fancybox-lock {overflow: hidden; margin-right:0 !important;}");
GM_addStyle(".fancybox-lock .fancybox-overlay {overflow-x: hidden; overflow-y: hidden !important}");
GM_addStyle("a.fancybox-item:hover {background-color:transparent !important}");

window.addEventListener("DOMContentLoaded", function() {
var oBadi = document.getElementById('showbadibutton');
oBadi.setAttribute('id', "showbadibutton-old");
var BadiHref = oBadi.getAttribute('href');
var oBadiBut = document.createElement('button');
oBadiBut.setAttribute('id', "showbadibutton");
oBadiBut.setAttribute('type', "button");
oBadiBut.setAttribute('class', "primary");
oBadiBut.setAttribute('title', "badilerim ne yazmış");
oBadiBut.setAttribute('onclick', "location.href='"+BadiHref+"'");
oBadiBut.innerHTML = ("&nbsp;@b&nbsp;");

var BadiUl = document.createElement('ul');
BadiUl.setAttribute('id', "badiul");

var BadiLi = document.createElement('li');
BadiLi.setAttribute('id', "badili");

BadiUl.appendChild(BadiLi);

var ShareBadi = document.createElement('li');
ShareBadi.setAttribute('id', "share-badi");
BadiLi.appendChild(oBadiBut);
var oIrsa = document.getElementById('in-topic-search-options');
oIrsa.appendChild(ShareBadi);
ShareBadi.appendChild(BadiUl);
oBadi.parentNode.removeChild(oBadi);
}, false);

GM_addStyle("#share-badi {padding-left:10px; text-align:left !important}");
GM_addStyle("#share-badi>ul {display:inline-block; !important}");

window.addEventListener("DOMContentLoaded", function() {
var ShareUl = document.createElement('ul');
ShareUl.setAttribute('id', "shareul");
ShareUl.setAttribute('class', "share-links");
var oShare = document.getElementById('topic-share-menu').getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('ul')[0].innerHTML
ShareUl.innerHTML = ("" +oShare+ "");
var BadiUl2 = document.getElementById('badiul');
BadiUl2.parentNode.insertBefore(ShareUl, BadiUl2);

var fbA = document.getElementById('shareul').getElementsByTagName('li')[0].getElementsByTagName('a')[0];
var twA = document.getElementById('shareul').getElementsByTagName('li')[1].getElementsByTagName('a')[0];
var ffA = document.getElementById('shareul').getElementsByTagName('li')[2].getElementsByTagName('a')[0];
fbA.innerHTML = ("");
twA.innerHTML = ("");
ffA.innerHTML = ("");

var oShareMenu = document.getElementById('topic-share-menu');
oShareMenu.parentNode.removeChild(oShareMenu);
}, false);

GM_addStyle("#shareul, #badiul {position:relative; margin-bottom:0px; width:auto !important}");
GM_addStyle("#badiul {text-align:right; padding-right:11px; float:right !important}");
GM_addStyle("#shareul {padding-top:4px !important}");
GM_addStyle("#shareul>li {display:inline-block !important}");