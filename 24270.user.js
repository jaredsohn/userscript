// ==UserScript==
// @name           unk
// @namespace      http://gbsfm.info
// @description    sfd
// @include        http://gbsfm.info/*
// ==/UserScript==



(function() {
	
	kawaii = [[' ha ', ' are '], ['kono', 'this'], ['watashi', 'I'], ['anata', 'you'], ['otaku', 'nerd'], ['ongaku', 'music'], ['kuso', 'shit'], ['totemo', 'very'], ['kirei', 'pretty'], ['taren', 'than'], ['taret', 'than'], ['waret', 'what'], ['suki', 'like'], ['neko', 'cat'], ['shiawase', 'happy'], ['nani', 'what'], [' ii ', ' good '], ['ookii', 'big'], ['sekusu', 'sex'], ['inu', 'dog'], ['kotobas', 'word'], ['kowaii', 'scary'], ['is sugokunai', 'sucks'], ['amai', 'sweet'], ['atama', 'head']]

	var textnodes, node, s; 

	textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	
	for (var j=0; j < kawaii.length; j++) {
		kawaii[j][0] = new RegExp(kawaii[j][0], "gi");
	}
	
	for (var i = 0; i < textnodes.snapshotLength; i++) { 
		node = textnodes.snapshotItem(i); 
		s = node.data;
		for (var j=0; j < kawaii.length; j++) {
			s = s.replace(kawaii[j][0], kawaii[j][1]);
		}
		node.data = s;
	} 

})();