// ==UserScript==
// @name       Andy K Helper Script
// @namespace  http://userscripts.org/users/522315
// @version    0.3
// @description  Andy K Helper Hit
// @match      https://s3.amazonaws.com/mturk_bulk/hits*
// @match      https://www.mturkcontent.com/dynamic/hit*
// @require     http://code.jquery.com/jquery-latest.min.js
// @copyright  2014+, You
// ==/UserScript==

$('select>option:eq(1)').attr('selected', true);
$('textarea#tag6').val("No Issues");

$('ul').each(function () {
    $(this).remove();
});
$('h3').each(function () {
    $(this).remove();
});

var isLink = false;

$('p').each(function () {
    console.log($(this).text().indexOf("Website URL"));
    console.log(isLink);
    if ($(this).text().indexOf("Website URL") != -1)
        isLink = true;
    else if ($(this).text().indexOf("Website URL") == -1 && !isLink)
        $(this).remove();
});