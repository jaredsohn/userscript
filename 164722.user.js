// ==UserScript==
// @name        expand google news
// @description	expand google news for more news sources
// @namespace   http://userstyles.org
// @author      galdon cahyani
// @include     http://news.google.co.id/nwshp*
// @include     https://news.google.co.id/nwshp*
// @include     http://news.google.com/nwshp*
// @include     https://news.google.com/nwshp*
// ==/UserScript==

(function() {


var array_func= array_func || [];

function loading_javascript(url, idname, callback) {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
		if (idname) script.id= idname;
    document.getElementsByTagName("head")[0].appendChild(script);
}


var jQueryScriptOutputted = false;
function initJQuery_delay(){
	setTimeout("initJQuery()", 50);
}

function initJQuery() {
	//if the jQuery object isn't available
	if (typeof(jQuery) == 'undefined') {
		if (!jQueryScriptOutputted) {
			//only output the script once..
			jQueryScriptOutputted = true;
			//loading_javascript('http://code.jquery.com/jquery-latest.min.js', 'jqdk', initJQuery_delay);
			loading_javascript('//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', 'jqdk', initJQuery_delay);
		}
	}
	else {
		var jq=jQuery.noConflict();
		jq(function() {  
			//do anything that needs to be done on document.ready
			console.log('jqdk loaded');
			
			for(var i in array_func){
				array_func[i]();
			}
			console.log('done loop funcs array');
		});
	}
}


function after_jq(){
	var jq=jQuery.noConflict();
	jQuery('.esc-toggle-icon').show().click();
	jQuery('.more-coverage-text').show();
}

var array_func= array_func || [];
array_func.push(after_jq);
initJQuery();


})();
