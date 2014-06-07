// ==UserScript==
// @name       fakku depager cleaner
// @version    1.08
// @description  depager,cleaner and image expander for fakku.net galleries
// @match      http://www.fakku.net/*/*/read*
// @require    http://code.jquery.com/jquery-1.8.3.min.js
// @updateURL        https://userscripts.org/scripts/source/156478.meta.js
// @downloadURL      https://userscripts.org/scripts/source/156478.user.js
// @copyright  2013+, StanStmith
// ==/UserScript==
//
/*
 *    VERY IMPORTANT (chrome 27+) : ENABLE UNSAFEWINDOW IN TAMPERMONKEY ADVANCED PARAMETER.
 * 
 * 	  compatible firefox 21+ and chrome 27+
 */
//
// GPL license
//
var i = 0;
var max = $('select.drop:first option').size() - 2;
//
// disable left click
//

if (($.browser.mozilla)) {
$(document).click(function(e) {
    if (e.button==0) {e.stopPropagation();e.preventDefault();e.stopImmediatePropagation();return false; }
});
//
$(document).mousedown(function(e) {
    if (e.button==0) { alert('disabled');e.stopPropagation();e.preventDefault();e.stopImmediatePropagation();return false; }
});
//
$(document).mouseup(function(e) {
    if (e.button==0) {e.stopPropagation();e.preventDefault();e.stopImmediatePropagation();return false; }
});
//
$(document).dblclick(function(e) {
    if (e.button==0) {e.stopPropagation();e.preventDefault();e.stopImmediatePropagation();return false; }
});
} else {
//
$('*').click(function(e) {
    if (e.button==0) {e.stopPropagation();e.preventDefault();e.stopImmediatePropagation();return false; }
});
//
$('*').mousedown(function(e) {
    if (e.button==0) { e.stopPropagation();e.preventDefault();e.stopImmediatePropagation();return false; }
});
//
$('*').mouseup(function(e) {
    if (e.button==0) {e.stopPropagation();e.preventDefault();e.stopImmediatePropagation();return false; }
});
//
$('*').dblclick(function(e) {
    if (e.button==0) {e.stopPropagation();e.preventDefault();e.stopImmediatePropagation();return false; }
});
};
//
// disable right left keys
//
$('*').keydown(function(e) {
    if ((e.keyCode==39)||(e.keyCode==37)) { e.stopPropagation();e.preventDefault();e.stopImmediatePropagation();return false; }
});
//
//
$(window).scroll(function() {
    if ($('img.current-page:last').offset().top + $('img.current-page:last').height() <= $(document).scrollTop() + $(window).height()*1.2) {
            if ($(window).data('ready') === false) return;
     
            PageLoad();
		};
    });
//
//
function PageLoad() {
    
    $(window).data('ready', false);
    
    if (i == max) return;
    
    i++; j= i+1;
    
    var ref = $('img.current-page:last').attr('src');//alert(ref);
    
    if (ref == undefined) return; 
    
    r1 ='00' + i; r2 ='00' + j;
    
    if (r1.length == 4) r1=r1.substring(1,4);if (r2.length == 4) r2=r2.substring(1,4);
    
    ref = ref.replace(r1+'.jpg',r2+'.jpg');
    
    tmpimg = $('img.current-page:last').clone();
    $(tmpimg).attr('src',ref);

    $('img.current-page:last').after(tmpimg);

    
    $(window).data('ready', true);
    
}
//
//
$(document).ready(function() {

    $('div#wrap').css({'width' : '100%'});
    $('div#content').css({'text-align' : 'center','width' : '100%','background' : 'black','border' : 'none'});
    $('img.current-page').attr('style','width:auto;height:auto!important;border-width:5px;border-style:solid;border-color:black;display:block;margin-left:auto;margin-right:auto');
    $('#image a').removeAttr('href');$('#image a').removeAttr('title');
    $('#header,div.chapter,#loading,div[class*=advertisement],div#thumbs').remove();  
    $('img.next-image').next().remove();$('img.next-image').remove();
	$('#image').removeAttr('onclick');

	$('header').remove();     
    
  PageLoad();
    
})