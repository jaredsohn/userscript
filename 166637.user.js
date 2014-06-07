// ==UserScript==
// @name       Wallangues next input with tab
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Change the behavior when typing tag into on input for wallangue.be
// @match      http://cours.wallangues.be/*
// @copyright  2013+, Nicolas Bayet
// ==/UserScript==

$ = unsafeWindow.$;

var x = 0;
$inputs = $('input[type=text]')
$inputs.each(function(){
    $this = $(this);
    $this.attr('tabindex', ++x);
    console.log("input", $this);
});
