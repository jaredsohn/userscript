// ==UserScript==
// @name          Get an explanation for each unknown word on a website!
// @namespace     http://weiterfahrn.de/offtopic/dictionary.user.js
// @description	  Doubleclick an unknown word on a webpage and a wikipedia (or your favorite dictionary/search engine) lookup is done in a new tab
// @include       http://*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, 
//    etc.)


// Add your prefered dictionary search string 
engines= new Array (
"http://en.wikipedia.org/wiki/Special:Search?search=",
"http://de.wikipedia.org/wiki/Special:Search?search=",
"http://a9.com/",
"http://www.google.de/search?q=",
"http://search.yahoo.com/search?p=",
"http://www.altavista.com/web/results?q=",
"http://alltheweb.com/search?q=");

function processQuery(query){
        //W1 = window.open(this.engines[1]+query, "Suche","width=640, scrollbars=yes, resizable=yes");
        //W1.focus();
	// youse of of the engines you have specifed in the engines array
	GM_openInTab(this.engines[0]+query);
    }

function readSelection(e){
        var text="";
        if(window.getSelection){
            text=window.getSelection();
        }
        if(document.selection){
            text=document.selection.createRange().text;
        }
        if(text==""){
	    //alert("You have to select text before, you doubleclick.");
	}else{	
            processQuery(text);
        }
    }

function addEvent(obj, evType, fn){
        /*
        adds an eventListener for browsers which support it.
        Written by Scott Andrew: www.scottandrew.com
        */
        if (obj.addEventListener){
            obj.addEventListener(evType, fn, true);
            return true;
            } else if (obj.attachEvent){
            var r = obj.attachEvent("on"+evType, fn);
            return r;
            } else {
            return false;
        } // if
    } // addEvent

addEvent(document,"dblclick",readSelection);
