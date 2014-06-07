// ==UserScript==
// @name        Collmex
// @namespace   collmex
// @include     https://www.collmex.de/cgi-bin/cgi.exe?*
// @version     1
// ==/UserScript==

var $,jQuery;

// ---  basic extensions  ---
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};

String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};

String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};

// ---

// add jQuery
var GM_JS   = document.createElement('script');
GM_JS.src   = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
GM_JS.type  = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JS);


// --- waiting for scripts ---

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        jQuery = $;
        addJqueryCookie();   
        // main();
    }
}


function addJqueryCookie() {
    // add jQuery cookie plugin
    $.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options=$.extend({},options);options.expires=-1;}var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}expires='; expires='+date.toUTCString();}var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=$.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}return cookieValue;}};
    GM_wait2();
}


// Check if jQuery plugin: cookie loaded
function GM_wait2() { 
    if(typeof $.cookie == 'undefined') {
        window.setTimeout(GM_wait2,200); 
    } else { 
        main();
    }
}

GM_wait();

//===========================================================

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// load jQuery and execute the main function
addGlobalStyle( '#debug {}' +
                '#debug p { margin: 0 0 3px; }' +
                '#content { border-left: 5px solid green; }' +
                '#content form textarea { width: 30em; ' );

//===========================================================

  
    
function main() {
    
}
