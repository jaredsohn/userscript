// ==UserScript==
// @name           Remove All Religion from Facebook
// @namespace      http://userscripts.org/scripts/show/163240
// @description    Removes any and all mentions of religion from Facebook.
// @include        *facebook.com*
// ==/UserScript==

function hideStories(naughtWord){
var stories = document.getElementsByClassName("uiStreamStory");
    for (var i = 0; i < stories.length; i += 1) {
    	if (stories[i].innerHTML.indexOf(naughtWord) > -1) {
			stories[i].style.display = "none";
     	}
    }
}

function removeReligion(){
    var noWords = ["God","god","jesus","Jesus","Jesus Christ","jesus christ","christ","Christ","Heavenly Father","heavenly father","christian","Christian","christianity","Christianity","bible","Bible","Catholic","catholic","catholicism","Catholicism","Judaism","judaism","jew","Jew","jewish","Jewish","torah","bar mitzvah","Bar Mitzvah","bat mitzvah","bat mitzvah","allah","Allah","muslim","Muslim","islam","Islam","qu'ran","quran","koran","Mohammad","mohammad"];
    for (var i = 0; i < noWords.length; i++) {
        hideStories(noWords[i]);
    }
}

document.addEventListener("DOMNodeInserted", removeReligion, true);