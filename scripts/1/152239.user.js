// ==UserScript==
// @version        1.1.1
// @name           FontifyGoogleChat
// @namespace      http://fontify.herokuapp.com
// @description    Fontify Google chat
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @author         Jonathan Abramson
// ==/UserScript==
if (window.top != window.self)    //don't run on frames or iframes
    return;
// create an observer instance
if (document.body){
    // Watch for changes that could be new instant or AJAX search results
    var MutOb = (window.MutationObserver) ? window.MutationObserver : window.WebKitMutationObserver;
    if (MutOb){
        var observer = new MutOb(function(mutations) {
             mutations.forEach(function(mutation) {
                try {
                    handleAddedElement(mutation);
                } catch (e) {}
                  for (var i = 0; i < mutation.addedNodes.length; i++) {
                    try {
                        handleAddedElement(mutation.addedNodes[i]);
                    } catch (e) {}
                  }
              });
            });
        // attach chgMon to document.body
        opts = {childList: true, subtree: true};
        observer.observe(document.body, opts);
    }
}
function handleMutation(mut) {
    try {
        if (mut.target.getAttribute("role") == "chatMessage") {
            for (var i = 0; i < mut.addedNodes.length; i++) {
                try {
                    handleAddedElement(mut.addedNodes[i]);
                } catch (e) {}
            }
        }
    } catch (e) {}
}
function handleAddedElement(el){
    try{
        isChangeFont = false;
        if (el.getAttribute("class") == "km") {
            el = el.getElementsByTagName("span")[1];
            isChangeFont = true;
        } else if (el.getAttribute("class") == "kl") {
            isChangeFont = true;
        }
        if (isChangeFont) {
            $.getJSON('https://fontify.herokuapp.com/fonts.json', {term : el.textContent},function(data) {
                el.style.fontFamily = data[0][0];
            });
        }
    } catch (e) {}
}