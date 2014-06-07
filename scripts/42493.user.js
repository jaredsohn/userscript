// ==UserScript==
// @name          Extended Navigation Bar Tiny
// @namespace     http://badassmonkey.org
// @description   Additional tabs for the forumwarz navigation bar, Made by Bamse (http://www.nilsbakken.com) and modified for recent changes by Echuu. Also, Ricket and FalCoN did things. Made specifically for 1024x768 resolutions, and otherwise mucked about with by eLe.
// @include       http://www.forumwarz.com/*
// @include       http://forumwarz.com/*
// @exclude       http://www.forumwarz.com/forums/battle/*
// @exclude       http://forumwarz.com/forums/battle/*
// ==/UserScript==

// Call style function
addGlobalStyle();
// Add general links
expandNavBar();



// Update stylesheet
function addGlobalStyle() {

    var css = 'div.tabs a.gmtab { background-position: 0px -378px;}'+
	      'div.tabs a.gmtab span.inner { background-position: 100% -378px; color: #000; }';

    var head, style;
    head = document.getElementsByTagName('head')[0];

    if (!head) { return; }

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;

    head.appendChild(style);
}

// Add links to navigation bar
function expandNavBar() {

    var linksHTML1 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/characters/me\"'+
                     	'class=\"not_current\"><span class=\'inner\'>Ch</span></a></li>'+
		     '<li><a href=\"http://www.forumwarz.com/bookmarks\"'+
                     	'class=\"not_current\"><span class=\'inner\'>Bm</span></a></li>';

    var linksHTML2 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/incit\"'+
                     	'class=\"not_current meta\"><span class=\'inner\'>In</span></a></li>'+
		     '<li><a href=\"http://www.forumwarz.com/domination\"'+
                     	'class=\"not_current meta\"><span class=\'inner\'>Do</span></a></li>'+
		     '<li><a href=\"http://www.forumwarz.com/domination/vanilla\"'+
                     	'class=\"not_current meta\"><span class=\'inner\'>Vi</span></a></li>'+
		     '<li><a href=\"http://www.forumwarz.com/forum_buildr\"'+
                     	'class=\"not_current meta\"><span class=\'inner\'>fr</span></a></li>'+
		     '<li><a href=\"http://www.forumwarz.com/klans\"'+
                     	'class=\"not_current meta\"><span class=\'inner\'>Kl</span></a></li>';

    var linksHTML3 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/discussions\"'+
                     	'class=\"not_current community\"><span class=\'inner\'>Fb</span></a></li>'+
	             '<li><a href=\"http://www.forumwarz.com/spoilers\"'+
                     	'class=\"not_current community\"><span class=\'inner\'>Wi</span></a></li>';

    var linksHTML4 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/buy_stuff\"'+
                     	'class=\"not_current buy_stuff\"><span class=\'inner\'>B!</span></a></li>';

    var linksHTML5 = '<li class=\'indent\'><a href=\"http://www.forumwarz.com/bookmarks/by_type/stores\"'+
                     	'class=\"not_current community\"><span class=\'inner\'>St</span></a></li>'+
	             '<li><a href=\"http://www.forumwarz.com/bookmarks/by_type/services\"'+
                     	'class=\"not_current community\"><span class=\'inner\'>Sv</span></a></li>'+
	             '<li><a href=\"http://www.forumwarz.com/bookmarks/go/13-bruce-bear-s-fix-all\"'+
                     	'class=\"not_current community\"><span class=\'inner\'>BB</span></a></li>'+
	             '<li><a href=\"http://www.forumwarz.com/bookmarks/go/22-the-ppwn-shoppe\"'+
                     	'class=\"not_current community\"><span class=\'inner\'>Pp</span></a></li>'+
	             '<li><a href=\"http://www.forumwarz.com/bookmarks/go/36-herbal-assault\"'+
                     	'class=\"not_current community\"><span class=\'inner\'>HA</span></a></li>'+
		     '<li class=\'indent\'><a href=\"http://www.forumwarz.com/bookmarks/go/70-herschel-jewsteins-kosher-crazy-careers\"'+
                     	'class=\"not_current meta\"><span class=\'inner\'>H!</span></a></li>'+
	             '<li><a href=\"http://www.forumwarz.com/bookmarks/go/71-kyoubai\"'+
                     	'class=\"not_current meta\"><span class=\'inner\'>K!</span></a></li>'+
	             '<li class=\'indent\'><a href=\"http://www.forumwarz.com/bookmarks/by_type/forums\"'+
                     	'class=\"not_current\"><span class=\'inner\'>Fm</span></a></li>'+
	             '<li><a href=\"http://www.forumwarz.com/bookmarks/community\"'+
                     	'class=\"not_current\"><span class=\'inner\'>CF</span></a></li>'+
	             '<li class=\'indent\'><a href=\"http://www.forumwarz.com/inbox/mail\"'+
                     	'class=\"not_current current\"><span class=\'inner\'>TM</span></a></li>';


    var lastLink, linksElem, chtab, bmtab, talktab, multiTab, ktab, fbtab, wtab, stab, suTab;
    lastLink = document.getElementsByTagName('li')[1];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML1;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

    lastLink = document.getElementsByTagName('li')[5];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML2;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

    lastLink = document.getElementsByTagName('li')[11];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML3;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

    lastLink = document.getElementsByTagName('li')[14];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML4;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

    lastLink = document.getElementsByTagName('li')[15];

    if (!lastLink) { return; }

    linksElem = document.createElement('li');
    linksElem.innerHTML = linksHTML5;

    lastLink.parentNode.insertBefore(linksElem, lastLink.nextSibling);

    var multiTab = document.getElementById('multiplayer_tab');
    if (multiTab) {
	multiTab.parentNode.removeChild(multiTab);

}
    var chtab = document.getElementById('character_tab');
    if (chtab) {
	chtab.parentNode.removeChild(chtab);

}

    var bmtab = document.getElementById('bookmarks_tab');
    if (bmtab) {
	bmtab.parentNode.removeChild(bmtab);


}
    var ktab = document.getElementById('klans_tab');
    if (ktab) {
	ktab.parentNode.removeChild(ktab);

}

    var fbtab = document.getElementById('flamebate_tab');
    if (fbtab) {
	fbtab.parentNode.removeChild(fbtab);

}
    var wtab = document.getElementById('wiki_tab');
    if (wtab) {
	wtab.parentNode.removeChild(wtab);

}
    var stab = document.getElementById('support_us__tab');
    if (stab) {
	stab.parentNode.removeChild(stab);

}

}