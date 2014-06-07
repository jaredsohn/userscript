// ==UserScript==
// @name           Noble Claims
// @namespace      noble_claims Rewrote by exoflux
// @description    Village overview noble claims bbcode to post in tribal noble claims forum.
// @include        http://en*.tribalwars.net/*
// ==/UserScript==

function getGameDoc() {getdoc = window.document;if(! getdoc.URL.match('game\.php')) {for(var i=0; i<window.frames.length; i++) {if(window.frames[i].document.URL.match('game\.php')) {getdoc = window.frames[i].document;}}}return getdoc;};doc = getGameDoc();function main(doc) {if(doc.reservated) return;h2s = doc.getElementsByTagName('h2');for(var i=0; i<h2s.length; i++) {if(h2s[i].firstChild.nodeValue.match('^(Village)')) {table = h2s[i].parentNode.getElementsByTagName('table')[0];trs = table.getElementsByTagName('tr');v_coord = trs[1].getElementsByTagName('td')[1].firstChild.nodeValue;if(trs[2].getElementsByTagName('td')[1].getElementsByTagName('span').length > 0) {v_points = trs[2].getElementsByTagName('td')[1].firstChild.nodeValue + trs[2].getElementsByTagName('td')[1].firstChild.nextSibling.nextSibling.nodeValue;} else {v_points = trs[2].getElementsByTagName('td')[1].firstChild.nodeValue;}
if(trs[3].getElementsByTagName('td')[1].firstChild.hasChildNodes()) {
	v_player = trs[3].getElementsByTagName('td')[1].firstChild.firstChild.nodeValue;
}
	 else {
	    v_player = '';
}
	
if(trs[4].getElementsByTagName('td')[1].firstChild.hasChildNodes()) {
		v_ally = trs[4].getElementsByTagName('td')[1].firstChild.firstChild.nodeValue;
} 
       else {
	      v_ally = '';
}

bb_code = "Village: [village]"+v_coord+"[/village]\nPoints: "+v_points+"\nPlayer: "+(v_player.length>0 ? 

 "[player]"+v_player+"[/player]" : "")+"\nTribe: "+v_ally;
 new_row = doc.createElement('tr');
 new_cell = doc.createElement('td');
 new_cell.setAttribute('colspan', 2);
 new_h2 = doc.createElement('h2');
 new_h2.appendChild(doc.createTextNode('Noble Claim'));
 new_cell.appendChild(new_h2);
 new_textarea = doc.createElement('textarea');
 new_textarea.setAttribute('rows', 5);
 new_textarea.setAttribute('cols', 35);
 new_textarea.appendChild(doc.createTextNode(bb_code));
 new_cell.appendChild(new_textarea);
 new_row.appendChild(new_cell);
 table.getElementsByTagName('tbody')[0].appendChild(new_row);
 doc.reservated = true;break;
}
}
}

if(doc.URL.match('screen=info_village')) {
	main(doc);
}