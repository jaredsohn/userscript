// ==UserScript==
// @name       BibleGateway Limited Translations
// @namespace  http://www.alesha911.com/
// @version    0.1
// @description  Removes most translations from the list, leaving only the ones most frequently used.
// @match      http://www.biblegateway.com/passage/?search*
// @copyright  2012+, Aleksey Fomichenko
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
var validTranslations =
[
    "KJ21",
    "ASV",
    "ESV",
    "EMP",
    "CEB",
    "CEV",
    "ERV",
    "KJV",
    "NASB",
    "NIV",
    "NKJV",
    "YLT",
    
    "ERV-RU",
    "RUSV",
    "SZ"
];
$(".page-translation select option").each(function (idx, el)
{
    if ($.inArray($(el).val(), validTranslations) < 0)
        $(el).remove();
});