// Rapidshare Booster
// version 0.2
// 2008-04-23
// Copyright (c) 2008, Davide Pozza
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Rapidshare Booster
// @namespace     http://www.nothing2hide.net/greasemonkey/rapidshare_booster
// @description   Automatically downloads on RapidShare and fully embeds Google as internal search engine
// @include http://*.rapidshare.com/*
// @include http://rapidshare.com/*
// ==/UserScript==


if (!GM_xmlhttpRequest || !GM_registerMenuCommand) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}


var main = document.getElementById("main");
var content = document.getElementById("content");
var search_container = document.createElement("div");
var search_field = document.createElement("input");

/////////////////////////////////////////////////////////////////////////////////////

function clearPrev(){
  var prev_result = document.getElementById('search_result');
  if (prev_result){
    prev_result.parentNode.removeChild(prev_result);
  }
}

function formatResult(result){
  if (result){
    result.id='search_result';
    result.align='';
    content.innerHTML='';
  } else {
    result = document.createElement("span");
    result.id='search_result';
    result.innerHTML='Unhandled response';
  }
  return result;
}

function google_makeSearchResult(base_url){
  GM_log('base url:'+base_url);
  var google_base_url='http://www.google.com/search?q=site%3Arapidshare.com+';
  if (!base_url){
    base_url = google_base_url+search_field.value;
    result = document.createElement("span");
    result.id='search_result';
    result.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;Searching...';
    search_container.appendChild(result);
  } else {
    base_url = base_url.replace(/site:/,'site%3A');
  }
  GM_log('next page. ' + base_url);
  GM_xmlhttpRequest({
      method: 'GET',
      url: base_url,
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(res) {
          clearPrev();

          var doc = document.createElement('div');
          doc.innerHTML = res.responseText;
          var divs = doc.getElementsByTagName('div');

          var result;
          for (var i = 0; result = divs[i]; ++i) {
            if(result.id == 'res') break;
          }
          result=formatResult(result);
          


          content.appendChild(result);
          
          var links = document.evaluate( "//*[@href]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
          for (var i = 0; i < links.snapshotLength; i++) {
            link = links.snapshotItem(i);
            
            if (link.href.match(/start=/i)){
              link.href = link.href.replace(window.location.host,'www.google.com');
            } else 
            if (link.href.match(/q=cache:/i) || link.href.match(/q=related:/i) || link.href.match(/translate.google.com/i) ){
              link.parentNode.removeChild(link);
            } 
          }
          
          var images = document.evaluate( "//IMG", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
          for (var i = 0; i < images.snapshotLength; i++) {
            image = images.snapshotItem(i);
            if (image.src.match(/nav_/i)){
              GM_log('found image: '+image.width+' | '+image.src);
          
              if (image.width == '16'){
                spacer = document.createElement("span");
                spacer.width == '16';
                spacer.innerHTML='&nbsp;&nbsp;';
                image.parentNode.appendChild(spacer);
              }
              image.parentNode.removeChild(image);
            }
          }
          

      }
  });
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

////////////////////////////////////////////////////////////////////////////////////////

if (content) {
    search_container.style.backgroundColor = '#666';
    search_container.style.opacity = '0.9';
    //search_container.style.fontSize = '70%';
    search_container.style.padding = '4px 10px 10px 10px';
    search_field.type='text';
    //search_field.size='40';
    search_field.addEventListener('keypress', function(ev) {if (ev.keyCode == 13) google_makeSearchResult()}, true);
    var search_button = document.createElement("input");
    search_button.type='button';
    search_button.value='Search';
    search_button.addEventListener('click', function(ev) {google_makeSearchResult()}, true);
    var auth = document.createElement("a");
    auth.id='n2h_auth';
    auth.href='http://www.nothing2hide.net';
    auth.target='_blank';
    auth.innerHTML='[by N2H]';
    search_container.appendChild(search_field);
    search_container.appendChild(search_button);
    search_container.appendChild(auth);
    content.parentNode.insertBefore(search_container, content);
    
}


var inputButton = document.getElementsByTagName("input")[3];
if(inputButton && inputButton.value=='Free'){
  inputButton.click();
}

document.addEventListener('click', function(event) {
  href = event.target.parentNode.parentNode.href;
  if (href){
    GM_log('intercepted click on: '+href);
    google_makeSearchResult(href);
    event.stopPropagation();
    event.preventDefault();
  }
}, true);

/*
window.addEventListener(
  "load", 
  function(){
    setTimeout("c=0", 500);
  },
  true);
*/
addGlobalStyle('A#n2h_auth{font-size: 80%;text-align: right;} A#n2h_auth:link { color: #FFF; } A#n2h_auth:active { color: #FFF; } A#n2h_auth:visited { color: #FFF; } span#search_result{ color: #FFF; font-weight: bold;}');

//
// ChangeLog
// 2008-04-23 - 0.9 - removed timeout hack: it doesn't work properly
