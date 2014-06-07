// ==UserScript==
// @name           Ambroisie : Youtube
// @namespace      http://sites.google.com/site/projetambroisie/
// @include        http://www.youtube.com/*
// ==/UserScript==


/* 
L'ensemble des scripts du Projet Ambroisie sont sous Copyright (© Lelong Anthony - 2011 - Tous droits réservés), et vous n'êtes pas autorisés à modifier, copier ou redistribuer ces scripts. Veuillez lire les conditions d'utilisation avant toute utilisation.
 */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Fonctions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
 
/*getElementsByAttribute by Robert Nyman : http://robertnyman.com/2006/01/23/monday-code-giveaway-getelementsbyattribute/ */
/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
	--------------------------------------------------
	Anthony Lelong : Fonction modifiée de manière à ce qu'il n'y ait pas d'erreur lorsque oElm=null
*/
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrReturnElements = new Array(); 
	if (oElm != null){
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
		var oCurrent;
		var oAttribute; 
		for(var i=0; i<arrElements.length; i++){
			oCurrent = arrElements[i];
			oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
			if(typeof oAttribute == "string" && oAttribute.length > 0){
				if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
					arrReturnElements.push(oCurrent);
				}
			}
		}
	}
	return arrReturnElements;
}



/* Youtube Id Extractor by supercheetah : http://www.abovetopsecret.com/forum/thread270269/pg1 */

function youtubeIDextract(url){ 
	var youtube_id; 
	youtube_id = url.replace(/^[^v]+v.(.{11}).*/,"$1"); 
	return youtube_id; 
}


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Notification en bas de la page ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
notification=document.createTextNode("Cette Page a été modifiée par Projet Ambroisie. Veuillez lire les conditions d'utilisation avant toute utilisation.")
document.body.appendChild(notification)



// Modifications ponctuelles d'éléments existants

//Modification de la page de visionnage
if (document.getElementById("watch-video-container") != null) {

//Titre de la vidéo
titre_Video=document.getElementById("eow-title")

//Description
titre_description=document.createElement("b")
titre_description.innerHTML="Description : \n"

description=document.getElementById("eow-description")

// Lanceur
videoId=youtubeIDextract(window.location.href)
lien="http://www.youtube.com/v/"+ videoId +"&autoplay=1&rel=0"
lanceur=document.createElement('a')
lanceur.setAttribute("href", lien)
lanceur.innerHTML="Ecouter la séquence."

bold_Lanceur=document.createElement("b")
bold_Lanceur.appendChild(lanceur)


element_A_Modifier=document.getElementById("content-container")
element_A_Modifier.innerHTML=null
element_A_Modifier.appendChild(titre_Video);
element_A_Modifier.appendChild(document.createElement("br"));
element_A_Modifier.appendChild(titre_description);
element_A_Modifier.appendChild(document.createElement("br"));
element_A_Modifier.appendChild(description);
element_A_Modifier.appendChild(document.createElement("br"));
element_A_Modifier.appendChild(bold_Lanceur)

}

//Chaîne
var grid=document.getElementById("playnav-gridview")
if (grid != null){
window.location.href=window.location.href + "#g/u"
grid.setAttribute("onLoad", "alert('lol');playnav.selectView('grid');playnav.selectTab('uploads');yt.analytics.trackEvent('menu', 'uploads');")
}


// Définition du contenu de liste_Des_Elements_A_Masquer 
var liste_Des_Elements_A_Masquer = new Array()
liste_Des_Elements_A_Masquer=liste_Des_Elements_A_Masquer.concat(

document.getElementById("masthead-utility"),
getElementsByAttribute(document.getElementById("footer"),"*", "href", "http://www.google.com/support/youtube/bin/static.py?p=results&page=start.cs&hl=fr_FR"),
getElementsByAttribute(document.getElementById("footer"),"*", "href", "/t/press"),
getElementsByAttribute(document.getElementById("footer"),"*", "href", "/t/creators_corner"),
getElementsByAttribute(document.getElementById("footer"),"*", "href", "/t/advertising_overview"),
getElementsByAttribute(document.getElementById("footer"),"*", "href", "/dev"),
getElementsByAttribute(document.getElementById("footer"),"*", "href", "http://www.google.com/support/youtube/bin/request.py?contact_type=abuse&hl=fr_FR"),
getElementsByAttribute(document.getElementById("footer"),"*", "href", "/t/privacy_at_youtube"),

// Accueuil
document.getElementById("ad_creative_1"),
document.getElementById("iyt-login-suggest-box"),
document.getElementById("homepage-side-content"),

//Recherche
getElementsByAttribute(document.getElementById("search-base-div"),"*", "class", "promoted-videos list-view pyv-promoted-videos"),
getElementsByAttribute(document.getElementById("search-header"),"*", "class", "sort-by floatR"),
getElementsByAttribute(document.getElementById("results-main-content"),"*", "class", "thumb-container"),
getElementsByAttribute(document.getElementById("results-main-content"),"*", "class", "video-translation-links"),
getElementsByAttribute(document.getElementById("results-main-content"),"*", "class", "description"),
getElementsByAttribute(document.getElementById("results-main-content"),"*", "class", "playlist-videos"),
getElementsByAttribute(document.getElementById("results-main-content"),"*", "class", "single-line-lego-list"),
document.getElementById("search-pva"),

//Page de Visionnage
/*
document.getElementById("watch-video-count"),
document.getElementById("watch-headline-user-info"),
document.getElementById("watch-actions"),
document.getElementById("watch-discussion"),
document.getElementById("watch-info"),
document.getElementById("watch-video-extra"),
document.getElementById("watch-longform-ad"),


document.getElementById("watch-sidebar")
*/

//Chaîne
document.getElementById("subscribe-buttons"),
document.getElementById("playnav-navbar"),
document.getElementById("playnav-navbar-toggle"),
document.getElementById("main-channel-content")

)



// Masquage de tous les éléments de liste_Des_Elements_A_Masquer 
for ( i=0; i <= liste_Des_Elements_A_Masquer.length; i++ )  {
	if (liste_Des_Elements_A_Masquer[i]!=null){
		liste_Des_Elements_A_Masquer[i].setAttribute("style", "display: none");	
	}
}


