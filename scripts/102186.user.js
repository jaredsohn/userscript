// ==UserScript==
// @name           hebmail
// @namespace      http://userscripts.org/users/jbustamovej
// @include        https://www.google.com/calendar/b/0/render
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.js
// ==/UserScript==

//alert($().jquery); // check jQuery version
//alert($("span.wk-daylink").first().text());

/*
$('span.wk-daylink').each(function(index) {
    alert(index + ': ' + $(this).text());
  });
*/

$('span.wk-daylink').each(function(index) {
    var parent = $(this).parent();
    //alert(parent.attr('class'));
    $(this).clone().appendTo(parent);
  });