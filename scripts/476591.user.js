// ==UserScript==
// @name       NotAlwaysRight.com keyboard navigation
// @namespace  http://joonas.me
// @version    1.1
// @description  You can use number keys 1-9, left arrow and right arrow to navigate NotAlwaysRight.com and its sister sites. This navigation only works in the pages with number navigation at the bottom ( Essentially the front page and other pages from then on ).

// @match      http://notalwaysright.com/*
// @match      http://notalwaysworking.com/*
// @match      http://notalwaysromantic.com/*
// @match      http://notalwaysrelated.com/*
// @match      http://notalwayslearning.com/*
// @match      http://notalwaysfriendly.com/*
// @match      http://clientsfromhell.net/*
// @match      http://www.lamebook.com/*

// @run-at document-start
// ==/UserScript==

// Changelog

// 1.1
// - An attempt to go left in "index page" or "page 1" will refresh the page
// - Lamebook.com added to the list of websites
// - ClientsfFromHell.net added to the list of websites
// - Couple forward slashes removed
// - Added "@run-at document-start"
// - I'm not sure why I started writing this in jquery. Changed it all to vanilla javascript. It's better that way.

document.onkeyup = function (e) {
    
    var e = e || window.event,
		which = e.which,
        url = document.URL,
        left_arrow = which === 37,
        right_arrow = which === 39,
        current_page = document.URL.match(/[0-9]+(?!.*[0-9])/),
        index = url.indexOf("page") < 0;
    
    if ( left_arrow || right_arrow ) {
        
        counter = left_arrow ? --current_page : ++current_page;
        
        var newURL = index ? document.URL + 'page/2' : document.URL.replace(/[0-9]+(?!.*[0-9])/, counter);
        
        if ( current_page > 0 || right_arrow && index ) {
            
            window.location.href = newURL;
            
        }
        else {
            
            location.reload();
            
        }
        
    }
    
    if ( which >= 49 && which <= 57 ) {
        
        var number = which === 49 && 1 ||
            which === 50 && 2 ||
            which === 51 && 3 ||
            which === 52 && 4 ||
            which === 53 && 5 ||
            which === 54 && 6 ||
            which === 55 && 7 ||
            which === 56 && 8 ||
            which === 57 && 9
        
        var newURL = index ? document.URL + 'page/' + number : document.URL.replace(/[0-9]+(?!.*[0-9])/, number);
        
        window.location.href = newURL;
        
    }
    
};
