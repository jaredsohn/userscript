// ==UserScript==
// @name           Stämme - Übersicht
// @namespace      Stämme - Übersicht
// @description    Stämme - Übersicht
// @include        http://de*.die-staemme.de/game.php?village=*&screen=overview_villages*
// ==/UserScript==
ids=new Array();
world=document.domain.split(".")[0];
allElements = document.evaluate(
		'//table[attribute::class="vis"][2]/tbody/tr/td[3]',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
		th=document.createElement("th");
		txt=document.createTextNode("Gruppe");
		th.appendChild(txt);
		document.getElementsByClassName("vis")[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].insertBefore(th, document.getElementsByClassName("vis")[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[2]);
for(var i = 0; i < allElements.snapshotLength; i++) {
      td=document.createElement("td");
      inp=document.createElement("input");
      inp.setAttribute("type","text");
      inp.setAttribute("size","4");
      id=allElements.snapshotItem(i).parentNode.getElementsByTagName("td")[0].getElementsByTagName("span")[0].getAttribute("id").substr(6);
      inp.setAttribute("value",GM_getValue(world+id,""));
      inp.setAttribute("id",world+id);
      ids[i]=id;
      td.appendChild(inp);
			allElements.snapshotItem(i).parentNode.insertBefore(td,allElements.snapshotItem(i));
			}
document.addEventListener('keypress', function(event){
 if(event.which == 13){    //enter
  for(i in ids){
  if(document.getElementById(ids[i]).value!=""){
     GM_setValue(ids[i], document.getElementById(ids[i]).value);
  }
  }
  }
}, true);