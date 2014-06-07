// 23andMe-hideName.user.js
// Release 0.0.1 - Jun 20011- initial commit, 1-liner of jQuery code effectively
// 
// $Id: knbknb.23andme.user.js 117 2011-06-04 21:56:18Z knut $
// $HeadURL: file:///H:/mydocuments/_svnrepo/eigene_projekte/greasemonkey_prod/knbknb.23andme.user.js $
// Copyright 2011 knb
//
// ==UserScript==
// @name          23AndMe_hideDiseaseInfo
// @namespace     23andme.knbknb.com
// @description   Hide some disease data from screen (name and risk levels). Useful if you want to show the "My Health" Page to someone (just to demonstrate)
// @include       https://*.23andme.com/*
// ==/UserScript==

//GM_log("test");

// Add jQuery
function importJs(url) {
    var script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}
//importJs('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js');
importJs('http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js');

//maybe use this later
//importJs('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/jquery-ui.js');
    
// Check if jQuery is loaded
function jQueryWait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(jQueryWait, 100);
    } else {
    	//some other userscript may manipulate page, 
    	//so assign to this global var instead of $ variable
        $ = unsafeWindow.jQuery;
        main();
    }
}
jQueryWait();

// Here comes the main function, called by jQueryWait
function main() {


//$("td.col_outcome_elevated").filter(function(){return /\d\d/.exec($(this).text()) }).hide();
$("td.your_risk,td.col_outcome_elevated,td.col_name > a").text("hidden");
}