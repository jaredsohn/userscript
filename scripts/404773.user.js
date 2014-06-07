// ==UserScript==
// @name        Egov Tools by hesar
// @namespace   egov4you.info
// @include     http://www.egov4you.info/mu/leader/35/5
// @version     1
// @description dodaje link do operacji na podstawie JOIN linka w liderze
// ==/UserScript==

function GM_wait() {

	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
	else { $ = unsafeWindow.jQuery; start(); }

}
GM_wait();

function start() {
    extractEgovIds();
}

function extractEgovIds() {
    var links = [];
    $('[id^=link-]').each(function() {
        links.push( $(this).attr('href').replace('/mu/viewOperation/35/5/leader/','http://egov4you.info/operations/operation/') );
    }    
);log(links);
    $('#operations .altrow').after("<tr><td style=\"padding:10px;\" colspan=\"12\" class=\"egov_links\"></td></tr>");
    $('.egov_links').each(function(index){
       $(this).text(links[index]);
    });
    $('.egov_links').each(function() {
        log(this);
        $(this).bind('click',{param:this},selectElementText);
    })


}// Selects text inside an element node.
function selectElementText(event) {
    el = event.data.param;
    removeTextSelections();
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(el);
        window.getSelection().addRange(range);
    }
}

// Deselects all text in the page.
function removeTextSelections() {
    if (document.selection) document.selection.empty(); 
    else if (window.getSelection) window.getSelection().removeAllRanges();
}

function log(text) {
    unsafeWindow.console.log(text);
}