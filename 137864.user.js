// ==UserScript==
// @name     Ignore Phantom Fields
// @include  https://211sandiego.communityos.org/zf/client/render/-1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
//Thanks to Brock Adams at Stackoverflow.com
// ==/UserScript==

var targChkBox = $("label:contains('(Phantom Call)')").prev ("input");
targChkBox.change (function () {
    if (this.checked) {
        var matchingOption  = $("option:contains('N/A')");
        var targValue       = matchingOption.prop ("value");
        var targSelect      = matchingOption.parents ("select.required_field");
        targSelect.val (targValue); //-- Select the desired option.
    }
} );
