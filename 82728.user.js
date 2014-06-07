// ==UserScript==
// @name        Pub's eRep Cruft Remover 
// @version 	0.11
// @description	Removes annoying eRep elements (Health box ads, facebook buttons, etc).
// @author      Publius
// @namespace   http://www.erepublik.com/en/referrer/Publius
// @match       http://*.erepublik.com/*
// @include	    http://*.erepublik.com/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    //Remove the wellness box
    $('#buyHpAction').remove();

    //Remove the follow links in footer
    $('.follow').remove();

    //Remove facebook button
    $('.facebook_login').remove();

    //Remove storage ads
    $('.bgWhiteAlertShouts').remove();
    $('.btnGetExtraStorage').remove();

    //Remove ShareThis from bottom of articles
    $('.bottomcontrol').remove();

    //Remove article tweet button
    $('#tweetmemebutton').remove();
}

// load jQuery and execute the main function
addJQuery(main);

