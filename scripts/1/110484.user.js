// ==UserScript==
// @name           newzbin2 imbd scores
// @namespace      dogself.com
// @include        http://*.newzbin.com/browse/category/p/movie*
// ==/UserScript==


var DEBUG = false;

var style = "\
  .imdbScore {margin-right:5px;border:1px solid #ccc; padding:1px;} \
  .imdbScore label {font-weight:bold;}\
";

log('starting');
loadDependancies(runScript);

function runScript(){
  var jQuery = $.noConflict();
  jQuery("a[href^='/r/?http://www.imdb.com']").each(function(){
    var $link = jQuery(this);
    var href = $link.attr("href").split("/r/?")[1];
    setTimeout(function(){ 
      sneakyXHR(href, function(text){
        var idx = text.indexOf('star-box-giga-star">') + 'star-box-giga-star">'.length;
        var rating = parseFloat(jQuery.trim(text.substring(idx, idx+5)));
        rating = isNaN(rating) ? "N/A" : rating.toFixed(1);
        $link.parent().next().prepend("<span class='imdbScore'>imdb: <label>"+rating+"<label></span>");
      });
    }, 1);
  })
  
}


/* UTIL METHODS */
function setValue(name,value) {
		window.setTimeout(function() {
				GM_setValue(name, value);
		});        
}

function deleteValue(name,value) {
		window.setTimeout(function() {
				GM_deleteValue(name, value);
		});        
}

function getValue(name, cb) {
	window.setTimeout(function() {
				var val = GM_getValue(name);
				cb(val);
	});
}

function addStyle(url){
	var s=document.createElement('link');
	s.setAttribute('href',url);
	s.setAttribute('rel','stylesheet');
	s.setAttribute('type','text/css');
	document.getElementsByTagName('head')[0].appendChild(s)
}

function addStyleText(text){
  var head = document.getElementsByTagName('head')[0],
  style = document.createElement('style'),
  rules = document.createTextNode(text);
  
  style.type = 'text/css';
  if(style.styleSheet)
    style.styleSheet.cssText = rules.nodeValue;
  else
    style.appendChild(rules);
  head.appendChild(style);
}

function addScript(url){
	var s = document.createElement('script');
	s.src = url;
	s.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(s);
}

function log(msg){
  if(DEBUG){
    unsafeWindow.console && unsafeWindow.console.log(msg)
  }
}

function sneakyXHR(url, cb, get){
  setTimeout(function(){
    GM_xmlhttpRequest({
      method: get ? 'GET' : 'POST',
      'url': url,
      headers: {
        'User-agent': 'Mozilla/4.0',
        'Accept': 'application/atom+xml,application/xml,text/xml'
      },
      onload: function(responseDetails) {
        var text = responseDetails.responseText;
        cb(text, responseDetails);
      }
    });
  }, 1)
}


function loadDependancies(boostrapFn) {
  addScript('http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js');
  addStyleText(style);
  
  var check = function(){
    log("waiting for jquery to load: "+ typeof unsafeWindow.jQuery);
    if(typeof unsafeWindow.jQuery == 'undefined' ){
      window.setTimeout(check, 500);
    }	else {
      jQuery = $ = unsafeWindow.jQuery;
      boostrapFn();
    }
  }
  check();
	
}