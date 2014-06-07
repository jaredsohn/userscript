// ==UserScript==
// @name       Skip validation
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Skip validation
// @match      http://ztravian.com/s3*
// @copyright  2012+, You
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
var span = $('form[name="snd"]').children()[14];
console.log($('form[name="snd"]').children()[14]);
var temp= span.innerHTML.replace(':','').split('<input');
    console.log(temp[0].trim());
    
var input1 = $('input[name="v2v2code"]');
    console.log($('input[name="v2v2code"]'));
input1.attr('value', temp[0].trim());

});