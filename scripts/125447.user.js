// ==UserScript==
// @id             slobodnadalmacija.hr
// @name           Slobodna Dalmacija
// @version        1.32
// @namespace      slobodnadalmacija.hr
// @author         nbavakua
// @description    
// @include        http://slobodnadalmacija.hr/*
// @include        http://www.slobodnadalmacija.hr/*
// @include        http://*slobodnadalmacija.hr/*
// @run-at         document-end
// ==/UserScript==

    commentNav = document.getElementsByClassName("commentNavig")[0];
    showMore = commentNav.firstChild;

    showAll = document.createElement("a");
    showAll.setAttribute("id", "showAll");
    showAll.setAttribute("href", "javascript: void(0);");
    showAll.className += 'nba';
    showAll.addEventListener('click', function(event) {
        head = document.getElementsByTagName('head')[0]; 
        style = document.createElement('style'); 
        style.setAttribute('type', 'text/css');
        style.innerHTML = '.comment {display:block !important;}'; 
        head.appendChild(style);
    } ,false);
   
    showAll.innerHTML=" Prikaži sve | ";
    commentNav.insertBefore(showAll, showMore);

    watchGame = document.createElement("a");
    watchGame.setAttribute("id", "watchGame");
    watchGame.setAttribute("href", "http://lonestarseeksgirlfriend.yolasite.com");
    watchGame.setAttribute("target", "_blank");
    watchGame.className += 'nba';
    watchGame.innerHTML=" LoneStar | ";
    commentNav.insertBefore(watchGame, showMore);
    
    klompStar = document.createElement("a");
    klompStar.setAttribute("id", "klompStar");
    klompStar.setAttribute("href", "http://goo.gl/maps/Xke5j");
    klompStar.setAttribute("target", "_blank");
    klompStar.className += 'nba';
    klompStar.innerHTML=" KlompStar 2Humps | ";
    //commentNav.insertBefore(klompStar, showMore);

    function injectCSS(cssdata) {
	head = document.getElementsByTagName("head")[0];
	style = document.createElement("style");
	style.setAttribute("type", 'text/css');
	style.innerHTML = cssdata;
	head.appendChild(style);
    }

    injectCSS('.comment, .comment .Normal {font: 1.1em verdana !important; color: black !important;} #moreLink, a.nba {display:inline !important;} ');
