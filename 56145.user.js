// ==UserScript==
// @name           Spiegel.de for Netbooks
// @namespace      *
// @include        http://www.spiegel.de/*/*
// @include        https://www.spiegel.de/*/*
// @include        http://www1.spiegel.de/*
// @include        https://www1.spiegel.de/*
// @exclude        http://www.spiegel.de/
// @exclude        https://www.spiegel.de/
// @grant          none
// ==/UserScript==

/**
 * (en) Removes node by its id
 * (de) Entfernt einen Knoten anhand seiner ID
 */
function removeNodeById(id) {
    var e = document.getElementById(id);
    
    /* (en) if an element with this id exists, remove it from its parent */
    /* (de) wenn ein Element mit dieser ID existiert, entferne es 
     *      aus der Liste der Kinderknoten des Vaterknotens 
     */
    if (e) {
    	e.parentNode.removeChild(e);
    }
}

/**
 * (en) Removes node by its class name
 * (de) Entfernt einen Knoten anhand seiner Klassenbezeichnung
 */
function removeNodeByClass(tag, c) {
	var es = document.getElementsByTagName(tag);
	
	/* (en) walk through the list of elements with this tag name
	 *      and remove the ones with this class name from its parent
	 */
	/* (de) gehe die Liste der Elemente durch, die den angegebenen Tag-Namen
	 *      besitzen, und entferne diejenigen Elemente, die die angegebene
	 *      Klassenbezeichnung besitzen, aus der Liste der Kinderknoten des 
	 *      Vaterknotens
	 */
	for (var i = 0; i <= (es.length - 1); i++) {
		if (es[i].className == c) {
			es[i].parentNode.removeChild(es[i]);
		}
	}
}

/**
 * (en) Removes links that have the given string in their url
 * (de) Entfernt diejenigen Links, die die angegebene Zeichenkette 
 *      in ihrer URL enthalten
 */
function removeLinkByUrlPart(url) {
	var es = document.getElementsByTagName("a");
	
	/* (en) walk through the list of links and remove the ones with the
	 *      given string in their url from their parents
	 */
	/* (de) gehe die Liste der Links durch und entferne diejenigen Links,
	 *      die in ihrer URL die angegebene Zeichenkette enthalten, aus
	 *      der Liste der Kinderknoten des Vaterknotens
	 */
	for (var i = 0; i <= (es.length - 1); i++) {
		if (es[i].href.indexOf(url) != -1) {
			es[i].parentNode.removeChild(es[i]);
		}
	}
}

/**
 * (en) swap article column and article function box
 * (de) vertausche die Spalte mit dem eigentlichen Artikel und
 *      die Spalte mit den Funktionen 
 */
function swapArticleColumnAndFunctionBox() {
	var articleColumn = document.getElementById("js-article-column");
	var es = document.getElementsByTagName("div");
	var functionBox;

        /* (en) search for the first div element with class name "column-small" */
	/* (de) suche nach dem ersten div-Element, das den Klassennamen
	 *      "column-small" besitzt.
	 */
	var found = false;
	for (var i = 0; !found && i <= (es.length - 1); i++) {
		if (es[i].className == "column-small") {
			found = true; // break for-loop, just need the first one
			functionBox = es[i];
		}
	}
	
        /* (en) swap the alignment of both elements */
        /* (de) vertausche die Ausrichtung der beiden Elemente */
        articleColumn.style.cssFloat="left";
        functionBox.style.cssFloat="right";
}

/**
 * (en) Display the teaser before any picture, gallery of pictures, video 
 *      or other asset
 * (de) Zeige den Artikel-Anreiszer vor einem evtl. vorhandenen Bild,
 *      einer Galerie von Bildern, einem Video oder einem anderen Asset
 */
function swapPictureAndIntroTeaser() {
    /* (en) the asset (picture) */
    /* (de) das Asset (Bild) */
    var pic = document.getElementById("js-article-top-wide-asset");
	
    var es = document.getElementsByTagName("p");
    /* (en) get the teaser */
    /* (de) der Anreiszer */
    var teaser;
    var found = false;
    
    /* (en) search for the first p element with class name "article-intro" */
    /* (de) suche nach dem ersten p-Element, das den Klassennamen
     *      "article-intro" besitzt.
     */
    for (var i = 0; !found && i <= (es.length - 1); i++) {
        if (es[i].className == "article-intro") {
            found = true; // break for-loop, just need the first one
            teaser = es[i];
        }
    }
	
    /* (en) if pic and teaser exist swap them 
     */
    /* (de) wenn das Bild/die Bildergalerie/das Video/das Asset 
     *      und der Anreiszer 
     *      existieren, vertausche die beiden Elemente 
     */
    if (pic && teaser) {
        var pic_clone = pic.cloneNode(true);
        var teaser_clone = teaser.cloneNode(true);
        pic.parentNode.replaceChild(teaser_clone, pic);
        teaser.parentNode.replaceChild(pic_clone, teaser);
    }
}

/**
 * (en) marks links to videos
 * (de) markiere Links, die zu Videos fuehren
 */
function markVideoLinks() {
	var es    = document.getElementsByTagName("a");
	var video = "www.spiegel.de/video/"; 
	
	/* (en) walk through the list of links and mark the ones 
	 *      that lead to videos by making them bold and italic
	 */
	/* (de) gehe die Liste der Links durch und markiere diejenigen Links,
	 *      die zu Videos fuehren, durch Fett- und Kursivdruck
	 */
	for (var i = 0; i <= (es.length - 1); i++) {
		if (es[i].href.indexOf(video) != -1) {
			es[i].style.fontWeight = "bold";
			es[i].style.fontStyle  = "italic";
		}
	}
}

/**
 * (en) check, if this page is a quiz
 * (de) teste, ob es sich bei dieser Seite um ein Quiz handelt
 */
function isNotQuiz() {
    var quiz = "www1.spiegel.de";
    var isQuiz = document.URL.indexOf(quiz) != -1;
    
    return (!(isQuiz));
}

/**
 * (en) swap article column and article function box
 * (de) vertausche die Spalte mit dem eigentlichen Artikel und
 *      die Spalte mit den Funktionen 
 */
swapArticleColumnAndFunctionBox();

/* (en) get rid of the header */
/* (de) entferne den Header-Bereich (farbige Flaeche
 *      und die Navigationsleisten im Kopfbereich der Seite)
 */
removeNodeByClass("div", "header-top");
removeNodeByClass("div", "header-main");
removeNodeByClass("div", "nav-channel");


/* (en) remove all adserv.quality-channel.de links */
/* (de) entferne die Werbeeinblendungen, die nicht durch andere 
 *      Werbeblocker erreicht werden.
 */
removeLinkByUrlPart("adserv.quality-channel.de");

/* (en) swap Picture and IntroTeaser if it isn't a quiz */
/* (de) zeige den Artikel-Anreiszer vor dem Bild, einer 
 *      Bildergalerie, Video oder Asset, wenn es sich nicht
 *      um ein Quiz handelt
 */
if(isNotQuiz()) {
    swapPictureAndIntroTeaser();
}

/* (en) mark links to videos */
/* (de) markiere Links, die zu Videos fuehren
 */
markVideoLinks();
