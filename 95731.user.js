// ==UserScript==
// @name           Translate Tweets
// @namespace      https://www.spesh.com/danny/tweettranslate
// @include        http://twitter.com/*
// @include        http://*.twitter.com/*
// @include        https://*.twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
// 
//  Source at: https://github.com/dannyob/twittertranslate
//  
//  Many many thanks to:
//  Jack Hsu's original Twitter Translate:
//  http://userscripts.org/scripts/show/43115 
//  
//  Chilla42o's modern TweetFilter: 
//  http://userscripts.org/scripts/show/49905
// 
//  James P Gilbert's Clarify Twitter:
//  http://userscripts.org/scripts/show/94579

var translate = function () {

    var create_google_div = function() { // make a space to stash translator scripts later
        var loaderDiv = document.createElement('div');
        loaderDiv.id = 'google-translate-loader';
        document.body.appendChild(loaderDiv);
    };


    var event_nodeinserted = function(e) { // whenever a node is inserted, check it for tweets
        if (e.target.nodeType == 1 ) {
            if (e.target.className == '_timestamp') {
                return;
            }
            if (e.target.className == 'stream-item') {
                check_for_tweets(e.target);
            }
            if (e.target.className == 'inner-pane') {
                // right-hand pane takes some time to load, so delay our tweet checking
                window.setTimeout(function () { check_for_tweets(e.target); } , 1000); 
            }
        }
    }

    var check_for_tweets = function(d) { // find any tweets, and if so add a 'Translate' action
        var tweets = d.getElementsByClassName("tweet");
        var n = tweets.length;
        for (var i=0; i<n; i++) {
            var this_tweet = tweets[i];
            add_translator(this_tweet);
        }
    };

    var langpair = '%7C'+navigator.language.substr(0,2);
    var dev_key = ""; // I think we might do better with no key, I can't tell
    var url = 'https://ajax.googleapis.com/ajax/services/language/translate?v=1.0'+dev_key+'&langpair='+langpair;

    var add_translator = function(s) { // add that Translate action, get it to run Google Translate
        if (s.getElementsByClassName("translate_link").length > 0) { 
            return; }

        var s_id = s.getAttribute('data-item-id') || s.getAttribute('data-tweet-id') || new Date().getTime() ;
        var action = s.getElementsByClassName("tweet-actions")[0];
        var ttext = s.getElementsByClassName("tweet-text")[0];
        var encoded_ttext = encodeURIComponent(ttext.innerHTML);
        var translateLink = document.createElement("a");

        $(translateLink).addClass('translate_link');
        $(ttext).addClass('translation_'+s_id);
        translateLink.innerHTML = '<span><i style="background-position: -187px -60px"></i><b>Translate</b></span>';
        translateLink.href = '#';
        translateLink.title ='Translate using Google';

        var onclick = document.createAttribute("onclick");
        onclick.value = 'var s=document.createElement("script");' +
            's.src="' + url + '&q=' + encoded_ttext + '&langpair=' + langpair + '&callback=t' + '&context=translation_' + s_id + '";' + 
            'document.getElementById("google-translate-loader").appendChild(s);' +
            'return false;';

        translateLink.attributes.setNamedItem(onclick);
        if (action) {
            action.appendChild(translateLink);
        } 
    };

    var initialize = function() {      
        try {
            if (typeof $ == 'undefined' || typeof twttr == 'undefined' || typeof twttr['currentUser'] == 'undefined') {
                //need twitter api and user logged in (logout will refresh page and thus reloading the script)
                window.setTimeout(initialize, 1000); //reinitialize
                return;
            }
        } catch(e) {
            window.setTimeout(initialize, 1000); //reinitialize
            return;
        }
        create_google_div();
        $(window).bind('DOMNodeInserted', event_nodeinserted);
        check_for_tweets(document);
    };

    initialize();
}

function t(c, json, s, msg) { // callback from Google Translate. Write the translation back into the text.
    var d = document.getElementsByClassName(c)
    var n = d.length
    var translation = json[0].responseData.translatedText;
    if (s != 200) {
        translation = "Error: "+msg;
    }
    for (var i=0; i<n; i++) {
        d[i].innerHTML = translation;
    }
}


function translate_load(func) { // add the translate code into the page loading process
  if (document.readyState == "complete") { //chrome
    func();
  } else {
    if (typeof window.onload != 'function') {
      window.onload = func;
    } else {
      var oldonload = window.onload;
      window.onload = function() {
        if (oldonload) {
          oldonload();
        }
        func();
      }
    }
  }
}

// insert the translator code within its own closure, shove the t function into the document's context
if (window.top == window.self && //don't run in twitter's helper iframes
   window.location.toString().match(/^https?\:\/\/twitter\.com\//) && //only run on twitter.com
  !document.getElementById('translate_script'))  //don't inject multiple times 
{
    var translate_script = document.createElement("script"); //create new <script> element
    translate_script.id = 'translate_script';
    txt = t.toString()
    txt = txt + "(function() {\n"+ //closure function
        translate_load.toString()+"\n"+ //attach our load function
        'translate_load('+translate.toString()+");\n"+ //execute our load function
        '})()'; //execute closure function
    translate_script.text = txt;
    document.body.appendChild(translate_script); //inject the script
}

//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.

//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.

//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.
