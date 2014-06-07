// ==UserScript==
// @name        [CFM] Signature char counter
// @namespace   @Jordynl
// @description Cheese for Mice Signature character counter.
// @include     http://cheese.formice.com/forum/account/signature
// @version     1
// @grant       none
// ==/UserScript==
$('.PreviewButton') .before('<input class="button JsOnly charCount" type="button" value="Validate"></input> ');
$('.submitUnit') .after('<center><span class="display_charCount"></span></center>');
$('.charCount') .click(function () {
    var count = $('#ctrl_signature_html') .val().replace(/(<([^>]+)>)/ig,"")  .length;
    $('.display_charCount').html('Your signature contains: <b>' + count + '</b> characters!');
});