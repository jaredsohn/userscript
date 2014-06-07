// ==UserScript==
// @name  Confuzzed 
// @description Decode the aliases
// @include http://oilempires.com/*
// ==/UserScript==

(function() {
  var replacements, regex, key, textnodes, node, s; 

textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (var i = 0; i < textnodes.snapshotLength; i++) { 
    node = textnodes.snapshotItem(i); 

		if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
		     {

    s = node.data; 
s = s.replace( /sdjflsdjfsdljfs/gi, "Maddyn99");
s = s.replace( /sdjlfsdjfsdljfs/gi, "kw255");
s = s.replace( /sdjflsdjlsdlfjs/gi, "Naples");
s = s.replace( /sdjflsdjfdsljfs/gi, "Corrosive");
s = s.replace( /sdfjlsdjlsdljfs/gi, "sou1");
s = s.replace( /sdjflsjdfsdljfs/gi, "Soge");
s = s.replace( /sdjfldsjfsdljfs/gi, "Pres Witter");
s = s.replace( /sdfilsdjfsdljfs/gi, "klore");
s = s.replace( /sdiflsdjfsdljfs/gi, "Monty");
s = s.replace( /sdjflsdjisdljfs/gi, "choover");
s = s.replace( /sdjflsdjfsdlfjs/gi, "juketay");
s = s.replace( /sdjlfsdjlsdljfs/gi, "Who235");
s = s.replace( /sdjflsdjlsldjfs/gi, "Pokeyoshi");
s = s.replace( /sdjflsdjldsljfs/gi, "badger");
s = s.replace( /sdjflsdjsfdljfs/gi, "Fgump");
s = s.replace( /sdjflsdfjsdljfs/gi, "Coolj");
s = s.replace( /sdjflsdjfsldjfs/gi, "Codyscott");
s = s.replace( /sdjflsdjlsdljfs/gi, "Pampers");
s = s.replace( /sdjflsdjsldljfs/gi, "JPJ aka Goat");

    node.data = s; 
		}
} 

})();

