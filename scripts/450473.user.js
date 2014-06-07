// ==UserScript==
// @name        Funda.nl - always the larger images.
// @namespace   _pc
// @match       *://*.funda.nl/*/fotos/*
// @run-at      document-start
// @grant       none
// ==/UserScript==
// inspired by https://stackoverflow.com/questions/10675049/greasemonkey-add-parameters-to-url
/*
Exsisting URL patterns: 
http://www.funda.nl/koop/den-ham-gn/huis-48063973-aduarderdiep-5/fotos/
http://www.funda.nl/koop/den-ham-gn/huis-48063973-aduarderdiep-5/fotos/#foto-3
http://www.funda.nl/koop/den-ham-gn/huis-48063973-aduarderdiep-5/fotos/?foto=3

Enlarge link:
http://www.funda.nl/koop/den-ham-gn/huis-48063973-aduarderdiep-5/fotos/?foto=3&size=grotere#foto-3

*/
// Test that we're not looking at the big foto's already
if (!/=grotere/.test(window.location.search)) {
    var newSearch = 'size=grotere';
    var newHash = '';
    var fotoNum = 1;
    var myRegexp = /#foto-(\d+)/g;
    var match = myRegexp.exec(window.location.hash);
    if (match != null) {
        fotoNum = match[1];
        newHash = '#foto-' + fotoNum;
    }
    newSearch += '&foto=' + fotoNum
    var newURL = window.location.protocol + '//'
    + window.location.host
    + window.location.pathname
    + '?' + newSearch
    + newHash
    ;
    /*-- replace() puts the good page in the history instead of the
        bad page.
    */
    //    alert('newURL:' + newURL);
    window.location.replace(newURL);
}
