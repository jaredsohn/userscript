// ==UserScript==
// @name           imdb - Altersfreigabe
// @namespace      imdb - Altersfreigabe
// @description    imdb - Altersfreigabe
// @include        http://www.imdb.de/title/tt*/
// ==/UserScript==
allElements = document.evaluate(
		'//div[h5="Altersfreigabe:"]',
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
DivNode=allElements.snapshotItem(0);
childs=DivNode.childNodes;
txt=""
for(i=2;i<childs.length;i++){
txt+=(childs[i].nodeValue!=null)?childs[i].nodeValue:""/*"<i>"+childs[i].textContent+"</i>"*/;
}
txt2=txt.split("|");
db=new Array();
for(i in txt2)db[i]=txt2[i].split(":");
table=document.createElement("table");
for(i in db){
   tr=document.createElement("tr");
   for(j in db[i]){
   if(db[i][0]==" Deutschland"){
   b=document.createElement("b");
   bnode=document.createTextNode(db[i][j]);
   b.appendChild(bnode);
   textnode=b;
   }else{
   textnode=document.createTextNode(db[i][j]);
   }
      td=document.createElement("td");
      td.appendChild(textnode);
      tr.appendChild(td);
   }
table.appendChild(tr);
}
for(i=DivNode.childNodes.length-1;DivNode.childNodes.length>2;i=DivNode.childNodes.length-1){
DivNode.removeChild(DivNode.lastChild);
}
DivNode.appendChild(table);
