// ==UserScript==
// @name       FA Artist Ignore List
// @namespace  http://www.furaffinity.net/user/vedervorocrat/
// @version    0.1
// @description  Filter image searching / browsing on FA.
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://userscripts.org/scripts/source/107941.user.js
// @include     http*://www.furaffinity.net/search*
// @include     http*://www.furaffinity.net/browse*
// @include     http*://www.furaffinity.net/favorites*
// @include     http*://www.furaffinity.net/gallery*
// @include     http*://www.furaffinity.net/user/*
// @grant GM_getValue
// @grant GM_setValue
// @copyright  2012+, Vicenti
// ==/UserScript==chrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/images/filesave.png


//	GM_SuperValue.set("ignoredArtists", []); 
var artistList = GM_SuperValue.get ("ignoredArtists", []); 
var initialSize = artistList.length;
var artist;
var allUserLinks, i, tabClass;
var hidden = [];
var shown = [];
var buttons = [];

function ShowHidden() {
    for(i=0; i<hidden.length; i++) {
        artist = hidden[i];
        var div = document.createElement('div');
        div.innerHTML = '<button id="unignoreartist'+artist+'" type="button">Unignore artist '+artist+'</button>';
        document.body.appendChild (div);
        document.getElementById ("unignoreartist"+artist).addEventListener ("click", UnIgnore, false);
    }
}

function Ignore(e){
    artistList = GM_SuperValue.get ("ignoredArtists", []); 
    if ( artistList.length == 0 ) {
        alert("There was an issue loading the artist list.");
    } else {
        var removeArtist = e.srcElement.id.replace("ignoreartist","");
        if ( artistList.indexOf(removeArtist) == -1 ) {
	        artistList.push(removeArtist);
	        if ( artistList.length > initialSize ) {
		        GM_SuperValue.set("ignoredArtists", artistList); 
            }
        }
        
        e.srcElement.parentNode.removeChild(e.srcElement);
    //    location.reload();
    }
}

function IgnoreAll(){
    var i;
    artistList = GM_SuperValue.get ("ignoredArtists", []); 
    if ( artistList.length == 0 ) {
        alert("There was an issue loading the artist list.");
    } else {
        for(i=0; i<shown.length; i++) {
            if ( artistList.indexOf(shown[i]) == -1 ) {
	            artistList.push(shown[i]);
            }
        }
        for(i=0; i<buttons.length; i++) {
            buttons[i].parentNode.removeChild(buttons[i]);
        }
        shown = [];
        buttons = [];
        if ( artistList.length > initialSize ) {
	        GM_SuperValue.set("ignoredArtists", artistList); 
        }
    } 
    var evt = document.createEvent ("HTMLEvents");
    evt.initEvent ("click", true, true);
    var el = document.getElementsByName('next_page')[0];
    if ( el ) {
        el.dispatchEvent (evt);    
    }
    var els = document.getElementsByName('btn');
    for(i=0; i<els.length; i++) {
        el = els[i];
        if ( el.value == 'Next' ) {
            el.dispatchEvent(evt);
        }
    }
}

function UnIgnore(e) {
    artistList = GM_SuperValue.get ("ignoredArtists", []); 
    if ( artistList.length == 0 ) {
        alert("There was an issue loading the artist list.");
    } else {
        var removeArtist = e.srcElement.id.replace("unignoreartist","");
        var i = artistList.indexOf(removeArtist);
        artistList = artistList.splice(i+1,1); // fuck you, +1
        if ( artistList.length > 0 ) {
	        GM_SuperValue.set ("ignoredArtists", artistList); 
        }
        location.reload();
    }
}


allUserLinks=document.evaluate(
    '//b/small/a'
    ,document,null, 
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var thereWereLinks = allUserLinks.snapshotLength > 0;

tabClass=document.evaluate(
    '//div[@class="tab"]',
    document,null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( tabClass.snapshotLength > 0 ) {
    
    var artist = document.location.href;
    artist = artist.replace("http://www.furaffinity.net/","");
    artist = artist.replace("gallery/","");
    artist = artist.replace("commissions/","");
    artist = artist.replace("user/","");
    artist = artist.replace("favorites/","");
    artist = artist.substring(0,artist.indexOf("/"));
    
    var tabs = tabClass.snapshotItem(0);
    var div = document.createElement('b');
    if ( artistList.indexOf(artist) > -1 ) {
        div.innerHTML='<button id="unignoreartist'+artist+'" type="button">Unignore this artist</button>';
        tabs.appendChild(div);
        document.getElementById ("unignoreartist"+artist).addEventListener ("click", UnIgnore, false);
    } else {
        div.innerHTML='<button id="ignoreartist'+artist+'" type="button">Ignore this artist</button>';
        tabs.appendChild(div);
        document.getElementById ("ignoreartist"+artist).addEventListener ("click", Ignore, false);
    }
}

for (i=0;i<allUserLinks.snapshotLength;i++) {
	var thisUserLink = allUserLinks.snapshotItem(i);
    artist = thisUserLink.href.replace("http://www.furaffinity.net/user/","");
    artist = artist.replace("/","");
    var found = artistList.indexOf(artist);
    var b = thisUserLink.parentNode.parentNode;
    if ( artist.indexOf("/") > -1 || found > -1 ) {
        b.parentNode.removeChild(b);
        if ( hidden.indexOf(artist) < 0 ) {
            hidden.push(artist);
        }
    } else {
        if ( shown.indexOf(artist) < 0 ) {
            shown.push(artist);
            var div = document.createElement('div');
            div.innerHTML = '<button id="ignoreartist'+artist+'" type="button">Ignore this artist'+'</button>';
            b.appendChild (div);
            document.getElementById ("ignoreartist"+artist).addEventListener ("click", Ignore, false);
            buttons.push(div);
        } 
    }    
}

if ( thereWereLinks ) {
    allUserLinks=document.evaluate(
        '//b/small/a'
        ,document,null, 
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if ( allUserLinks.snapshotLength == 0 ) {
        var evt = document.createEvent ("HTMLEvents");
        evt.initEvent ("click", true, true);
        var el = document.getElementsByName('next_page')[0];
        if ( el ) {
	        alert("No unignored artists. Advancing.");
	        el.dispatchEvent (evt);    
        }
    }
}


var div = document.createElement('div');
div.innerHTML='<div class="footer">You are blocking '+artistList.length+' artists ('+hidden.length+' on this page)<p>'
    +'<button id="showHiddenArtists" type="button">Show hidden</button>'
    +'<button id="ignoreAllArtists" type="button">Ignore All</button>'
    +'</div>';
document.body.appendChild(div);
document.getElementById("showHiddenArtists").addEventListener("click",ShowHidden,false);
document.getElementById("ignoreAllArtists").addEventListener("click",IgnoreAll,false);



/*
var hiddenArtistNames = "";
for(i=0; i<artistList.length; i++) {
    hiddenArtistNames = hiddenArtistNames + ", " + artistList[i];
}
var div = document.createElement('div');
div.innerHTML = '<button type="button">'+hiddenArtistNames+'</button>';
document.body.appendChild (div);
*/