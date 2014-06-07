// ==UserScript==
// @name       Enable autocomplete for DVLA driving test login form
// @namespace  http://
// @version    0.1
// @description  Enable autocomplete for DVLA driving test login form
// @match      https://wsr.theorytest.direct.gov.uk/testtaker/signin/SignInPage/DSA?locale=en_GB
// @copyright  2013+, Chris Shucksmith
// ==/UserScript==

var imgs = document.getElementsByTagName('input');
for (i=0; i<imgs.length; i++) {
  imgs[i].autocomplete = 'on';
}
