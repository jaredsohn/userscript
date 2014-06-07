// ==UserScript==
// @name       IMDb No Ratings
// @version    0.22
// @description  IMDb ratings remover
// @include       http://*.imdb.com*
// @run-at document-start
// @copyright 2013+, the@cybernoid.net, no rights reserved, internet highfives are welcome
// @updateURL http://cybernoid.net/imdb-no-ratings.js
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("#titleAwardsRanks,"+
		".ratingColumn *, "+
		".star-box-details > strong, "+
		".star-box-details a:nth-child(4), "+
		"#meterHeaderBox > a, "+
		"body .giga-star .star-box-giga-star.titlePageSprite, "+
		".rating-list, "+
		".aux-content-widget-2 "+
		" { display: none } ");
addGlobalStyle("#home_img_holder:after { "+
                " content: 'NO RATINGS? NO PROBLEM!';"+
				" color: #ccc; "+
				" font-size: 7pt;"+
				" padding-left: 1.5em;"+
				" position: absolute }");
