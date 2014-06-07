// ==UserScript==
// @name        Xvideos Friends adder link
// @namespace   AlexZeal
// @description Adds friends for Xvidoes video
// @include     http://www.xvideos.com/profiles*
// @version     1
//
// @grant        GM_getValue
// @grant        GM_log
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var url_arr = new Array();
var cnt = 0;
var init = 0;

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(looper);

var len = 80;

function frndr(){
    if(init == len){
	window.location=jQ('.pagination li:last').find('a').attr('href')
        return false;
    }else{
        console.log(init);
        var target = 'http://www.xvideos.com/profiles/'+url_arr[init++]+'/friend_request/';
        jQ.get(target);
        setTimeout(frndr,160);
    }
}

function looper(){
    
    jQ('.vcenter-ie a').each(function(){
        var url = jQ(this).attr('href');
        url = url.split('/');
        url_arr[cnt++] = url[2];
    });
    len = url_arr.length + 1;
    frndr();
}


