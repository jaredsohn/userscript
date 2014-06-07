// ==UserScript==
// @name           El Imparcial Sin Comentarios
// @namespace      imparcial_nocomments
// @description    Desaparece los comentarios de El Imparcial.
// @include        http://www.elimparcial.com/EdicionEnLinea/*
// ==/UserScript==

(function () {
        
    function getElementsByClassName(class_name) {
        var elements = document.getElementsByTagName('*');
        var found = [];
        
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].className == class_name) {
                found.push(elements[i]);
            }
        }
        
        return found;
    }
    
    getElementsByClassName('areacomentarios')[0].style.visibility = 'hidden';
    
})();