// ==UserScript==
// @name       Magento allow autologin, save password
// @namespace  http://userscripts.org/users/536306
// @version    0.1
// @description  Allow auto login in admin of Magento
// @match      http://*/*admin/
// @match      http://*/admin/
// @match      https://*/*admin/
// @match      https://*/admin/
// @copyright  2012+, Jeroen Boersma
// ==/UserScript==

(function(window, document, undefined){

    function $(id) {return document.getElementById(id);}
    
    var form = $('loginForm');
    
    if (form && form.getAttribute('autocomplete') === 'off') {
        form.setAttribute('autocomplete', 'on');
        $('dummy').parentNode.removeChild($('dummy'));
    }
    
    
}).call(unsafeWindow, unsafeWindow, unsafeWindow.document);
