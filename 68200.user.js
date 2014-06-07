// ==UserScript==
// @name           Close messages in whatsup
// @namespace      http://www.inn.co.il/Forum/lmf_Profile.aspx/507
// @include        http://whatsup.org.il/index.php?name=PNphpBB2*
// @include        http://whatsup.co.il/index.php?name=PNphpBB2*
// @include        http://www.whatsup.org.il/index.php?name=PNphpBB2*
// @include        http://www.whatsup.co.il/index.php?name=PNphpBB2*
// ==/UserScript==
// Add jQuery

    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        if(!$)return; // check if the dollar (jquery) function works
		$('td.postbody').hide();
		var arr=$('.postbody').closest('tr').prev().find("h2");
		arr.click(function(){
		$(this).closest('tr').next().find("td.postbody").toggle(500);
		});
		arr.hover(function() {
    $(this).css({'cursor': 'pointer'});
}, function() {
    $(this).css({'cursor': 'inherit'});
});
$("a[href=#top] img").click(function(){
var p=$(this).closest('tr').prev().find("td.postbody").toggle(500);return false;
});
    }