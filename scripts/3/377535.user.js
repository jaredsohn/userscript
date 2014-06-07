// ==UserScript==
// @name       WOL langs
// @namespace  http://wol.jw.org/
// @version    0.1
// @include      http://wol.jw.org/*
// @copyright  2014+, Oleksandr Rabinovych
// ==/UserScript==


['EN', 'RU', 'UK'].forEach(function(lang){
    if(window.location.pathname.substr(1,2).toUpperCase()!==lang){
        jQuery('#siteTitle:first-child').after('<a class="mylang" href="http://wol.jw.org/'+lang+'">'+lang+'</a>')
    }
});

// Set css
const siteTitle = findRule("#siteTitle");
siteTitle.selectorText += ", .mylang";
findRule("#siteTitle:hover").selectorText += ", .mylang:hover";
jQuery(".mylang").css({
    'padding-left':'0px',
    'padding-top':'2px',
    'padding-left':'5px',
    'padding-right':'5px',
    'margin-left':'10px',
    'color':'#fff',
    'text-decoration':'none'
});
//findRule('#siteTitle a').selectorText += ", .mylang";

function findRule(selector) {
    const ssList = document.styleSheets;
    for (i = 0; i < ssList.length - 1; i++) {
        var rules = ssList[i].rules;
        for (j = 0; j < rules.length - 1; j++){
            var rule = rules[j];
            if (rule.selectorText === selector) {
                return rule;
            }
        };
    };
}
//-----------