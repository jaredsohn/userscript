// ==UserScript==
// @name       File Drag Form Submit
// @namespace  http://www.chrisbradbury.net
// @version    1.0
// @description  submits html form on drag in of file onto 'browse' button
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @match      http*://*/*
// @copyright  2012, Chris Bradbury
// ==/UserScript==

//-- get the file upload form on the page --//
$file = $('form').find('[type=file]');

//-- on change of it --//
$file.change(function(){
    //-- submit the form --//
    $('form').submit();
});