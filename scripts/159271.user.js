// ==UserScript==
// @name           Google Reader: Mark item as read when clicked
// @version        1.0
// @namespace      http://www.lunrfarsde.com
// @include        http*://www.google.com/reader/view/*
// @exclude        http*://www.google.com/reader/view/#search/*
// @require        http://code.jquery.com/jquery-1.9.0.min.js
// ==/UserScript==
  
function markRead(a) {
    $(a.parentNode.parentNode.parentNode.parentNode.parentNode).find('[title="Mark as read"]').each(
        function() {
            this.click();
        }
    );
}
function run() {
    $('#entries').find('a').each(
        function() {
            this.onclick = function() { 
                markRead(this) 
            };
        }
    );    
    setTimeout(run, 500);
}    
run();
