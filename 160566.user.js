// ==UserScript==
// @name           FanFiction.net Rating & Language auto-select
// @namespace      rimmington
// @description    Auto-selects rating & language filters and removes FictionRating.com link from the rating menu
// @include        /^https?://.*\.fanfiction\.net/.*$/
// @exclude        /^https?://.*\.fanfiction\.net/s/.*$/
// ==/UserScript==

// SETTINGS
// All values should be exact for best results.
settings = {
    rating: "Rating: All",
    language: "English"
}

// DON'T EDIT BELOW HERE

var $ = unsafeWindow.$;
var filters = $('form[name="myform"]');

function select(values, name) {
    var dropdown = filters.find('select[name="'+name+'"]');
    if (dropdown.val() === values.default) {
        var option = dropdown.find('option:contains("'+values.prefer+'")');
        return option.length && dropdown.val(option.val());
    }
}

// Remove annoying FictionRating.com link
$('select[name="censorid"]').attr('onchange', '').children('[value="-1"]').remove();

var dropdowns = {
    censorid: {
        prefer: settings.rating,
        default: document.URL.search('fanfiction.net/community/') === -1 ? '103' : '3'
    },
    languageid: {prefer: settings.language, default: '0'}
};

if ($.map(dropdowns, select).some(function(a){return a;})) {
    filters.find('span.btn-primary, input[type="Submit"]').click();
}