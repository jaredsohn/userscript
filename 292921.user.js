// ==UserScript==
// @name       Wayback machine
// @namespace  
// @version    0.1
// @description  
// @match      http://*/*
// @match      https://*/*
// @copyright  2014
// ==/UserScript==


// Créé par edwado.

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://web.archive.org/save/'+document.URL,
    data: '',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});