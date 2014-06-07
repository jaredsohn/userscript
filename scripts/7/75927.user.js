// ==UserScript==
// @name                * KichoweRegulki
// @namespace           * blabla
// @description         * blabla
// @include                     *lockerz.com*
// @include                     *ptzplace.lockerz.com*
// @require                     http://code.jquery.com/jquery-latest.min.js
// @require                     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version                     2.0
// ==/UserScript==

$('form[name=formularz] input').each(function() {
switch (this.name.replace(/[^a-z0-9]+/i, '')) {
case 'state': this.value = 'blabla'; break;
case 'country': this.value = 'Poland'; break;
case 'countryCode': this.value = 'blabla'; break;
case 'phoneOne': this.value = 'blabla'; break;
case 'phoneTwo': this.value = 'blabla'; break;
case 'phoneThree': this.value = 'blabla'; break;
case 'phoneWhole': this.value = 'blabla'; break;
case 'firstName': this.value = 'blabla'; break;
case 'lastName': this.value = 'blabla'; break;
case 'address1': this.value = 'blabla'; break;
case 'address2': this.value = 'blabla'; break;
case 'city': this.value = 'blabla'; break;
case 'zip': this.value = 'blabla'; break;
case 'recaptcharesponsefield': $(this).focus(); break;
}
});