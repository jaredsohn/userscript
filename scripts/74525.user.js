// ==UserScript==
// @name           Zwężony nowy YouTube
// @namespace      
// @author         look997
// @description    Zwężony pasek z logiem, wyszukiwarką i.t.d.
// @license        MIT License
// @resource       metadata http://userscripts.org/scripts/source/74525.meta.js
// @version        0.9.97a
// @include        http://www.youtube.com/*
// ==/UserScript==

// \n\#logo {-moz-background-size: 95px; !important;}\n\nn\n#page #masthead #logo { !important;}\n\n 60  24

(function() {
var css = "#logo {background-size: 95px; -moz-background-size: 95px; !important;} #page #masthead #logo {width: 60px; margin: 1px 1px 0px 0px; height: 22px; background-position:0 -362px; !important;}\    #page #masthead .search-form {padding-top: 0; !important;}\n\n#masthead .search-term {margin-top: 0px; !important;}\n\n#page #masthead-nav, #page #masthead-utility {line-height: 27px; !important;}\n\n#masthead {padding: 0em 0px 0em; !important;}\n\n#page #masthead-search .yt-uix-button {margin: 0px 0px; !important;}\n\n#page #masthead-nav {padding-top: 0px; !important;}\n\n#page #masthead-search .yt-uix-button {border-radius: 0 0 3px 0; !important;}\n#page #masthead-search .yt-uix-button {-moz-border-radius: 0 0 3px 0; !important;}\n\n#masthead .search-term {0px solid #BBDAFD 0px solid #BBDAFD 2px solid #BBDAFD 2px solid #BBDAFD !important;}\n\n#watch-userbanner img {margin-left: 6px; !important;}\n\n#page #masthead-search .search-term {-moz-border-radius: 0px 0px 0px 3px; !important;}\n#page #masthead-search .search-term {border-radius: 0px 0px 0px 3px; !important;}\n\n#page.watch #masthead-container {margin-bottom: 0px; !important;}\n\n#page #masthead-utility .yt-uix-button-text {height: 2em; vertical-align: 0px; !important;}\n\n\n\n\n#watch-headline h1 {float: left; margin: 3px 0px 0px; !important;}\n\n#watch-headline {padding-top: 2px; !important;}\n\n#watch-headline-user-info {margin-top: 3px; !important;}\n\n#watch-username, #watch-show-info {padding: 4px 0px 4px 6px; !important;}\n\n#watch-username, #watch-show-info {display: none; !important;}\n\n\n\n\n#watch-discussion .input-collapsed textarea {height: 15px; !important;}\n\n#watch-discussion-tabs {display: none; !important;}\n\n#watch-comments-form {margin-bottom: 1px; !important;}\n\n#watch-actions {padding-bottom: 3px; !important;}\n\n#watch-info {margin-bottom: 5px; !important;}\n\n#watch-discussion {margin: 0px; margin-bottom: 5px; !important;}\n\n#watch-panel {padding-top: 5px; !important;}\n\n#watch-discussion {padding-top: 5px; !important;}\n\n#content.watch-wide #watch-sidebar {padding-top: 5px; !important;}\n\n.video-list-item .title {width: auto; !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

// skrócenie tekstu, który pojawia się po kliknięciu przycisku "fajne", do jednej linijki

// ID lubianych
function klubiane(){

   var czas = 1;//czas opoznienia w [s]
   setTimeout(function()
   {
var lubiane = document.getElementById('watch-action-response-message');
var lubianet = document.getElementById('watch-action-response-message').firstChild.nodeValue;


	var znaki = lubianet.length;
	var lubianet = lubianet.substring(30, znaki);
	lubiane.firstChild.nodeValue = lubianet;
	},czas*1000);
}

document.getElementById('watch-like').addEventListener('click',klubiane, true); 


//klikniecie w lubione wywołuje funkcję klubiane z opóźnieniem



// usunięcie 'Liczba filmów wideo: "1"'

var lfilm = document.getElementById('watch-video-count').getElementsByTagName('span')[0].innerHTML;

var znakow = lfilm.length;
var str = lfilm.substring(93, znakow -= 5);
var but = lfilm.substring(0, znakow = 78);

var znaki = str.length;
var znakowm = znaki - 1;
var znakowm2 = znaki - 2;
var str1 = str.substring(znakowm, znaki);
var str2 = str.substring(znakowm2, znaki);
if (str2 == 1) {
document.getElementById('watch-video-count').style.display='none';
document.getElementById('watch-headline-title').style.marginRight='4px';
}


// zmiana "Subskrybuj" na ikonę 

var obiekty = document.getElementById('subscribeDiv');
obiekty.innerHTML = '<img src="http://lh3.ggpht.com/_CBU1su6p5Cg/S7h3u6CLoTI/AAAAAAAAJo8/0jYEg5XfDdU/rss-nyt.png" alt="">'
var obiekty = document.getElementById('editSubscriptionDiv');
obiekty.innerHTML = '<img src="http://lh3.ggpht.com/_CBU1su6p5Cg/S7h3u6CLoTI/AAAAAAAAJo8/0jYEg5XfDdU/rss-nyt.png" alt="">'

// skrócenie treści chmurki która się pojawia po najechaniu na przycisk (ikonę) "Subskrybuj" do samego "Subskrybuj". 

var obiekty2 = document.getElementById('subscribeDiv');
obiekty2.title="Subskrybuj";

// stała szerokość watch-headline-user-info aby mogło się przesunąć pod tytuł filmu

var szerl = str.length;
var szerlicz = szerl * 8;
var szereszta = 118;
var szerbanner = 0;
var szerbaj = document.getElementById('watch-headline-user-info').getElementsByTagName('a')[0].getElementsByTagName('strong')[0].innerHTML;
var szerbaje = szerbaj.substring(0, 4);
if (szerbaje == "<img") { szerbanner = 184;}

var szerwhui = szerlicz + szereszta + szerbanner;

document.getElementById('watch-headline-user-info').style.width=szerwhui+"px";
