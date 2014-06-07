// ==UserScript==
// @name           Hide other users reputation (Experiment @se_statistics)
// @namespace      CrazyJugglerDrummer
// @description    Hides all users reputations details
// @include	   http://ux.stackexchange.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var style = "";

style += "span.reputation-score, span.badge1, span.badge2, span.badge3, span.badgecount, div.accept-answer-link, div.user-gravatar32 { display: none; }"; //hides undesired user info
style += "div.votes, div.vote, div.user-info, div.started, div.views, div.comments, .was-this-helpful, .post-signature, #qinfo { display: none; }"; //hides undesired vote info

var anchor = window.location.hash.substring(1);

if (anchor != "")
{
	style += ".answer { display: none; }\n"; //hide all answers
	style += "#answer-" + anchor + ".answer {display:block; }\n"; // Un-hide the answer to show
}

addGlobalStyle(style);