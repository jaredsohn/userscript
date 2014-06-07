// ==UserScript==
// @name       ITA Details CPM
// @namespace  http://userscripts.org/users/iakh/
// @version    0.1
// @description  Displays the CPM calcuation on the ITA Matrix details page
// @match      http://matrix.itasoftware.com/view/details*
// @copyright  2014+, IAkH
// ==/UserScript==

var $;
var checkExist;

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');
        
        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;
        
        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    checkExist = setInterval(function() {
        if ($('.fareSubtotal .farePrice').length) {
            var mileNode = $('li:contains(" total miles")');
            
            var price = Number($('.fareSubtotal .farePrice').text().replace(/[^\d\.-]/g,''));
            var miles = Number(mileNode.text().replace(' total miles',''));
            var cpm = Number(price / miles).toFixed(4);
            
            mileNode.after($('<li>' + cpm + ' cpm</li>'));
            
            clearInterval(checkExist);
        }
    }, 100); // check every 100ms
}