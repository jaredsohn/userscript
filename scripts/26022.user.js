// ==UserScript==
// @name           darkThrone gold sorter
// @namespace      http://www.darkthrone.com
// @description    sort user & army based on gold on attack page
// @author         noxx <silentn0x@email.com>
// @include        http://www.darkthrone.com/userlist.dt*
// ==/UserScript==

var gold = new Number(50);
var army = new Number (50);
var username = new Array (50);
var pos = new Number (50);
var count = 0;
var linkref = new Array(50);
var linkinner = new Array(50);
var goldloc;

textnodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var links = document.getElementsByTagName('a');

for (var i = 200; i < 230; i++) {
    if (textnodes.snapshotItem(i).data == "Race"){
	goldloc = i + 22;
    }
}


for (var i = goldloc; i < goldloc + 638; i = i + 13) {
		gold[count] = textnodes.snapshotItem(i).data;
		pos[count]  = count;
		
		for (var m = 0; m < 3; m++) { 
        gold[count] = gold[count].replace(",","");
    }
      
		count ++;		
}


for (var i = 0; i < 50; i++) {
  for (var j = 0; j < 50; j++) { 
    
    if(parseFloat(gold[i]) > parseFloat(gold[j])){
    
      var temp1 = gold[i];
      var temp2 = pos[i];
      
      gold[i] = gold[j];
      gold[j] = temp1;
      
      pos[i] = pos[j];
      pos[j] = temp2;
    }
    
  }
}

count = 0;

for (var i = 0; i < links.length; i++) {
  linkref[i] = links[i].href;
  linkinner[i] = links[i].innerHTML;
}

for (var i = goldloc; i < goldloc + 638; i = i + 13) {
    username[count] = textnodes.snapshotItem(i - 2).data;
		gold[count] = textnodes.snapshotItem(i).data;
		army[count] = textnodes.snapshotItem(i + 2).data;
		count ++;		
}


for (var i = 0; i < 50; i++) {
    textnodes.snapshotItem((goldloc - 2) + i * 13).data = username[pos[i]];
    textnodes.snapshotItem(goldloc + i * 13).data = gold[pos[i]];
    textnodes.snapshotItem((goldloc + 2) + i * 13).data = army[pos[i]];
}


for (var i = 0; i < links.length; i++) {
  for (var j = 0; j < links.length; j++) {
    if(links[i].innerHTML == linkinner[j] ){
      links[i].href = linkref[j];
    }
  }
}
