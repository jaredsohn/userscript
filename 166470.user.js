// ==UserScript==
// @name     	RemoveElements
// @include     http*
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

(function(document)
{
    $('#SpecifiedID').remove();
    $('.SpecifiedClass').remove();
   
    //baidu
    $('#ec_im_container').remove();
    $('.shouji').remove();
    $('.r.ec_bdtg').remove();
})(window.document);
