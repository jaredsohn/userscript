// ==UserScript==
// @name           oyaebu remover
// @description  Удаляет нахуй "ояебу" и "блеять". Текст про "овцы хотели блеять на луну" пострадает, но кто на лепре пишет про овец?
// @namespace      ru.zagrebelin.lepra
// @include        http://leprosorium.ru/*
// @include        http://www.leprosorium.ru/*
// ==/UserScript==


(function() {
    var replacements, regex, key, textnodes, node, s; 

    textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

    for (var i = 0; i < textnodes.snapshotLength; i++) { 
        node = textnodes.snapshotItem(i); 

        if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
        {
            s = node.data; 
            s = s.replace( /блеять/gi, "");
            s = s.replace( /ояебу/gi, "");
            // тут где-то русские буквы, а где-то латинские
            s = s.replace( /oяебу/gi, "");
            s = s.replace( /oяeбу/gi, "");
            s = s.replace( /ояeбу/gi, "");

            node.data = s; 
        }
} 

})();

