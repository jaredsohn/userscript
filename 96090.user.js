// ==UserScript==
// @name           Deathgrunt
// @namespace      http://userscripts.org/users/useridnumber
// @include        http://tweakers.net*
// ==/UserScript==

var $;
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
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        GM_xmlhttpRequest({
		    method: 'GET',
		    url: 'http://deathgrunt.com',
		    onload: function(responseDetails) {
		        var dg_url = $( responseDetails.responseText ).find('.image_break').attr('src');
		        var dg_txt = $( responseDetails.responseText ).find('.text').text();
		        var dg_title = $( responseDetails.responseText ).find('#ContactForm input[name="title"]').val();
		        $('.sidebar .frontpageItem:first-child').after('<div id="deathgrunt" style="display:none" class="frontpageItem"><h2>Deathgrunt: ' + dg_title + '</h2><p><em>' + dg_txt + '</em></p><a href="http://deathgrunt.com/" target="_blank"><img src="http://deathgrunt.com/' + dg_url + '" alt="" width="408px" /></a></div>');
		        $('#deathgrunt').slideToggle(200);
		    }
		});
    }
}

