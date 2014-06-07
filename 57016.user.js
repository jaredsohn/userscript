// ==UserScript==
// @name          What.fm: Adds What.CD links to last.fm
// @description   Script to add some search/notify links to last.fm artist pages.
// @include       http://*last.fm/user/*
// @include       http://*lastfm.*/user/*
// @include       http://*last.fm/music/*
// @include       http://*lastfm.*/music/*
// @include       http://*last.fm/home/recs*
// @include       http://*lastfm.*/home/recs*
// @include       http://*last.fm/listen/*
// @include       http://*lastfm.*/listen/*

var whaturl = "https://ssl.what.cd/"; // Change to the non ssl-url if you use that.

main();

function main() {

  var url = document.location.href;
  if (url.match(/\/music\/.*/)) {
    page = "artist";
  } else if (url.match(/\/home\/recs/)) {
    page = "recommendations";
  } else if (url.match(/\/listen\//)) {
	page = "listen";
  } else if (url.match(/\/user\//)) {
	page = "user";
  } 

  if (page == "recommendations" || page == "artist") {
	artistName = getArtistName(page);
	if (page == "artist") {
		var buttons = document.getElementsByClassName("buttons");
	} else {
		var buttons = document.getElementsByClassName("stats");
	}

	for (var i = 0; i < buttons.length; i++) {
		var notifyUploadsButton = createNotifyUploadsButton(artistName[i], "");
		var whatArtistButton = createWhatArtistButton(artistName[i], "position: relative !important; left: 3px !important;");
		var breakElement = document.createElement('br');
		buttons[i].appendChild(breakElement);
		buttons[i].appendChild(notifyUploadsButton);
		buttons[i].appendChild(whatArtistButton);
	}
  } else if (page == "listen") {
	  document.addEventListener('DOMNodeInserted', function (event) {
			var artistName = event.target.getElementsByClassName('artistName')[0].innerHTML;
          
			var buttonsElement = document.getElementsByClassName('buttons')[0];

			var notifyUploadsButton = createNotifyUploadsButton(artistName, "");
			var whatArtistButton = createWhatArtistButton(artistName, "");

			// var breakElement = document.createElement('br');
			buttonsElement.appendChild(notifyUploadsButton);
			buttonsElement.appendChild(whatArtistButton);
      }, false); 	
	} else if (page == "user") {
		fixDropDown();
	}
}

function getArtistName(page) {
  var artistName = [];
  if (page == "artist") {
    var h1Element = document.getElementsByTagName("h1")[0];
    artistName.push(h1Element.childNodes[0].nodeValue);
  } else if (page == "recommendations") {
    var nameElements = document.getElementsByClassName("name");
    for (var i = 0; i < nameElements.length; i++) {
      artistName.push(nameElements[i].childNodes[0].nodeValue);
    }
  }
  return artistName;
}

function createNotifyUploadsButton(unkemptArtistName, css) {
  var artistName = trim(unkemptArtistName);

  var notifyUploadsButton = document.createElement("a");   
  notifyUploadsButton.setAttribute("href", whaturl + "artist.php?action=notify&artistname=" + artistName);
  notifyUploadsButton.setAttribute("id", "notifyUploadsButton");
  notifyUploadsButton.setAttribute("class", "lfmButton lfmBigButton");
  if (css != "") notifyUploadsButton.setAttribute("style", css);
  notifyUploadsButton.innerHTML = "<strong>Notify on Upload</strong>";

  notifyUploadsButton.addEventListener("click", function(e) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: whaturl + "artist.php?action=notify&artistname=" + artistName
    });
    e.preventDefault();
    e.stopPropagation();
    this.innerHTML = "<strong>Don't click again</strong>";
  }, false);
 
  return notifyUploadsButton;
}

function createWhatArtistButton(unkemptArtistName, css) {
  var artistName = trim(unkemptArtistName);

  var notifyUploadsButton = document.createElement("a");  
  notifyUploadsButton.setAttribute("href", whaturl + "artist.php?artistname=" + artistName);
  notifyUploadsButton.setAttribute("id", "whatArtistButton");
  notifyUploadsButton.setAttribute("class", "button lfmBigButton");
  if (css != "") notifyUploadsButton.setAttribute("style", css);
  notifyUploadsButton.innerHTML = "<strong>What.CD</strong>";
  
  return notifyUploadsButton;
}

function fixDropDown() {
  var lfmDropDownBody = document.getElementsByClassName("lfmDropDownBody");

  var mNotify = document.createElement("li");
  mNotify.setAttribute("class", "mNotify");
  mNotify.setAttribute("style", "display: block;");
  mNotify.innerHTML = "<a href=\"#\">Notify on Upload</a>";
  mNotify.addEventListener('click', function(e) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: whaturl + "artist.php?action=notify&artistname=" + this.getAttribute('artist')
    });
  }, false);
  lfmDropDownBody[0].appendChild(mNotify);
  
  var mWhatCD = document.createElement("li");
  mWhatCD.setAttribute("class", "mWhatCD");
  mWhatCD.setAttribute("style", "display: block;");
  mWhatCD.innerHTML = "<a href=\"#\">What.CD</a>";
  mWhatCD.addEventListener('click', function(e) {
    window.location = whaturl + "artist.php?artistname=" + this.getAttribute('artist');
  }, false);
  lfmDropDownBody[0].appendChild(mWhatCD);
  
  // ...
  
  var multibuttonCell = document.getElementsByClassName('multibuttonCell');
  for (var i = 0; i < multibuttonCell.length; i++) {
    multibuttonCell[i].addEventListener("mouseover", function(e) {
      var multiButtonMenu = document.getElementById('multiButtonMenu');
      var menuContainerClass = this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('class');
      if (menuContainerClass == 'module modulechartsartists') { // Artist chart
        var mNotify = document.getElementsByClassName("mNotify");
        mNotify[0].setAttribute("style", "display: block;");
        var mWhatCD = document.getElementsByClassName("mWhatCD");
        mWhatCD[0].setAttribute("style", "display: block;"); 
        
        var text = this.parentNode.innerHTML;
        var artistName = text.match(/<a href=".*">(.*)<\/a>/);
        mNotify[0].setAttribute("artist", artistName[1]);
        mWhatCD[0].setAttribute("artist", artistName[1]);
      } else {
        var mNotify = document.getElementsByClassName("mNotify");
        mNotify[0].removeAttribute("style");
        var mWhatCD = document.getElementsByClassName("mWhatCD");
        mWhatCD[0].removeAttribute("style");
      }
    }, false);
  }
  var smallmultibuttonCell = document.getElementsByClassName('smallmultibuttonCell');
  for (var i = 0; i < smallmultibuttonCell.length; i++) {
    smallmultibuttonCell[i].addEventListener("mouseover", function(e) {
      var smallmultiButtonMenu = document.getElementById('multiButtonMenu');
      var menuContainerClass = this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute('class');
      var mNotify = document.getElementsByClassName("mNotify");
	  mNotify[0].removeAttribute("style");
	  var mWhatCD = document.getElementsByClassName("mWhatCD");
	  mWhatCD[0].removeAttribute("style");
    }, false);
  }  
}

function trim(str) {
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}
// ==/UserScript==