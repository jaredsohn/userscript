// ==UserScript==
// @name           homegate_notes
// @namespace      http://tpo.sourcepole.ch
// @include        http://www.homegate.ch/mieten/*
// @include        http://www.homegate.ch/*/trefferliste*
// @include        http://www.homegate.ch/*/search/*
// @include        http://www.schaffhausen.ch/frontend/index.cfm*
// @include        http://www.alle-immobilien.ch/cgi-bin/immo.pl*
// @requires       http://code.jquery.com/jquery-1.5.2.min.js
// @description    Annotate Homegate search results with your notes.
// @author         Tomáš Pospíšek
// @license        GPL2
// ==/UserScript==

(function(){

  // 1. on homegate replace intrusive display of google map
  // 2. use map.search.ch instead
  unsafeWindow.f_open_window_max = function( aURL, aWinName ) {
    // aURL = http://maps.google.com?q=47.685739,8.613092(Engestrasse 24, 8212 Neuhausen, Schweiz)&...
    aURL = "http://map.search.ch/" + aURL.replace(/.*\(/,'').replace(/, Schweiz.*/,'');
    window.open( aURL, aWinName);
  };

  unsafeWindow.saveComment = function(element,immoID) {
    unsafeWindow.localStorage.setItem(immoID, element.value);
  };

  function extractHomegateImmoID(href) {
    // http://www.homegate.ch/kaufen/103596254;HGSESSIONID=ySy7NpLLmRtSYZpjSYkzv...
    if(href.match(/http:.*kaufen/))
      return href.match(/http:.*kaufen\/(\d+)/)[1];
    else
      return href.match(/http:.*mieten\/(\d+)/)[1];
  }

  function extractSchaffhausenImmoID(href) {
    // index.cfm?method=immo.details&obj_id=6EED969E-FBE4-47A3-B2D615D79397D64A&order=...
    return href.match(/obj_id=([^&]+)/)[1];
  }

  function extractAlleImmobilienID(href) {
    // /goto/ISC7548872
    return href.match(/\/goto\/(.+)/)[1];
  }

  // returns the color the note should get
  function note_color(note) {
    // notes with a 'nix:' prefix get a different color
    return (note.match(/^nix:/) ? "blue" : "orange" );
  }
  // restart the script
  unsafeWindow.restartScript = function() {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("load", true, true );
    window.dispatchEvent(evt);
  };

  // inserts a note field after "element" for
  // the respective immoID
  function note_for(element, immoID) {
    var note;

    // retrieve note from local storage
    note = unsafeWindow.localStorage.getItem(immoID) || "";

    // add our input field with the note
    $("<input style='color:" + note_color(note) + "'" +
                   " value='" + note + "'" +
                   " onclick='event.cancelBubble = true;'" +
                   " onblur='saveComment(this,\"" + immoID + "\");'>").insertAfter(element);
  }

  function modify_homegate_ch() {
    $('td.tdTitle h2').each( function(i,h2) {
        var a, immoID;

        // grab the link to the immo
        a = $(h2).find('a')[0];

        // attr onclick returns a function!
        immoID = extractHomegateImmoID(String($(a).attr('onclick')));

        note_for(h2, immoID);
      }
    );
  }

  function modify_schaffhausen_ch(){
    // this page will trigger an ajax request which will insert it's results
    // into the following element. We want to catch that and reinsert our
    // input fields into the results. Don't know how to do it.
    //$.bind('onreadystatechange', modify_schaffhausen_ch);
    //$.bind('onload', modify_schaffhausen_ch);
    //$('cnt_middle_main').load( modify_schaffhausen_ch);
    //$.load( modify_schaffhausen_ch);
    //$.ajaxComplete( modify_schaffhausen_ch);
    //$.ajaxComplete( function(){alert('yes');});
    //$('#result').ready(function(){ alert("loaded");}); 
    //
    // since we don't know how to have it loaded ofter an
    // xmlhttp request we add a button to restart the script manually
    //alert(document.getElementById('result').wrappedJSObject);
    //document.getElementById('result').wrappedJSObject.addEventListener("load", function() { alert("loaded"); }, false);
    //document.getElementById('result').wrappedJSObject.addEventListener("ready", function() { alert("ready"); }, false);
    //document.getElementById('result').wrappedJSObject.addEventListener("onreadystatechange", function() { alert("state changed"); }, false);
    //document.wrappedJSObject.addEventListener("load", function() { alert("loaded"); }, false);
    //document.wrappedJSObject.addEventListener("ready", function() { alert("ready"); }, false);
    //document.wrappedJSObject.addEventListener("onreadystatechange", function() { alert("state changed"); }, false);
    $('body').append('<div style="position: fixed; bottom: 0%; background: white; border: solid red;" onclick="restartScript()">show notes</div>');

    $('.item_title').each( function(i,p) {
        var a, immoID;

        // grab the link to the immo
        a = $(p).find('a')[0];

        // attr onclick returns a function!
        immoID = extractSchaffhausenImmoID(String($(a).attr('href')));

        note_for(p, immoID);
      }
    );
  }

  function modify_alle_immobilien(){
    $('.h2_result').each( function(i,h2) {
        var a, immoID;

        a = $(h2).find('a')[0]; // grab the link to the immo

        immoID = extractAlleImmobilienID(String($(a).attr('href')));

        note_for(h2, immoID);
      }
    );
  }


  var $; // jQuery

  function load_jQuery_and_exec(setup_function_) {
    // load jQuery into the page
    var sScriptSrc = "http://code.jquery.com/jquery-1.6.1.min.js";
    var oHead = document.getElementsByTagName('head')[0];
    var oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.src = "http://code.jquery.com/jquery-1.5.2.min.js";
    oScript.addEventListener("load", setup_function_, false);
    oHead.appendChild(oScript);
  }

  function setup_function() {
    // Grab a reference to the page's copy of jQuery
    $ = unsafeWindow['jQuery'];

    var url = unsafeWindow.location.toString()
    // add a note below each immo description
    if( url.match(/http:\/\/www.homegate.ch\/.*\/trefferliste.*/) ||
        url.match(/http:\/\/www.homegate.ch\/.*\/search\/.*/) )
      modify_homegate_ch();

    else if( url.match(/http:\/\/www.schaffhausen.ch\/frontend\/index.cfm.*/))
      modify_schaffhausen_ch();

    else if( url.match(/http:\/\/www.alle-immobilien.ch\/.*/))
      modify_alle_immobilien();
  }

  // as soon as the document is loaded add our notes
  window.addEventListener('load', function(event) {
    if(! unsafeWindow['jQuery']) 
      load_jQuery_and_exec(setup_function);
    else
      setup_function();

  }, 'false');

})();

// we could also replace the intrusive homegate f_open_window_max like this, which
// would be better, however the 'view object' page doesn't include jQuery...
//
//jQuery('.detailLeft a').each(
//  function(i,a) {
//    a.attr('href') = a.attr('href').replace("javascript:f_open_window_max('",'').
//                                    replace("')",'');
//  }
//);

