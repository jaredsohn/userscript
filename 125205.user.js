// ==UserScript==
// @name           Micropenis Decoder Ring
// @namespace      http://forums.hipinion.com
// @description    Undo micropenis obfuscation
// @include        http://forums.hipinion.com/*
// ==/UserScript==

TRANSLATIONS = {
    '\\(alleged\\) micropenis': 'micropenis',
    '__': 'Sayeed',
};

function PageText()
{
    var elements = document.getElementsByTagName('*');
    
    return {
        replace: function(source, translation) {
            var regexp = new RegExp(source, 'gi');
            for(var i = 0; i < elements.length; i++) {
                var element = elements[i];
                element.innerHTML = element.innerHTML.replace(regexp, translation);
            }
        },
    };
}

var pageText = PageText();
for (var source in TRANSLATIONS) {
    pageText.replace(source, TRANSLATIONS[source]);
}
