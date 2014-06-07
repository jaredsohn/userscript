// ==UserScript==
// @name           quaz IMDb
// @description    displays links to other movies sites on IMDb, cleans up page (configurable)
// @namespace      http://userscripts.org/users/quaz
// @include        http://www.imdb.tld/title/tt*
// @include        http://www.imdb.tld/name/nm*
// @require    	   http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

toggleMenu("share", "Share");
toggleMenu("rl", "Related Lists");
toggleMenu("demo", "Do you have a demo reel");
toggleMenu("fb", "Connect with IMDb");
toggleMenu("nd", "News disclaimer");
toggleMenu("footer", "Footer");

if (!menu('footer')) {$('#footer').remove();}
if (!menu('nd')) {$('#news-disclaimer').remove();}
if (!menu('fb')) {$('.aux-content-widget-2 h3:contains("Connect with IMDb")').parent().remove();}
if (!menu('share')) {$('.social > .social_networking').parent().parent().remove();
		     $('#sidebar > .social_networking').remove();}
if (!menu('rl')) {$('.aux-content-widget-2 h3:contains("Related Lists")').parent().remove();}
if (!menu('demo')) {$('.aux-content-widget-2 h3:contains("Do you have a demo reel?")').parent().remove();}

addLinks($('.rhs-sl'));
addLinks($('.aux-content-widget-2').first());

function toggleMenu(key, prefix) {
    window[key] = menu(key);
    GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? "VISIBLE" : "HIDDEN"), function() {
    GM_setValue(key, !window[key]);
	location.reload();
    });
}
function menu(key) {
    return GM_getValue(key, false);
}
function li(href,text){
    return '<div><a href="http://' + href + '">' + text + '</a></div>';
}
function addLinks(c) {
    var iid=Number($('noscript')[0].innerHTML.match(/id...(\d*)/)[1]); ///id.tt(\d*)/
    iti=document.title.replace(/ \((\d+)\)/,"").replace(' - IMDb','');
    $(c).append(li ('www.google.com/search?q=allintitle:' + iti,'Google'));
    $(c).append(li('www.google.com/search?q=allintitle:' + iti + ' site:wikipedia.org&btnI','Wikipedia'));
    $(c).append(li('www.moviepilot.de/movies/imdb-id-'+ iid, 'Moviepilot'));
    $(c).append(li('www.google.com/search?q=allintitle:' + iti + ' site:rottentomatoes.com&btnI','Rotten Tomatoes'));
}
