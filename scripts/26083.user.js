// ==UserScript==
// @name           Flickr - IP - Votação dos Concursos
// @namespace      http://sixhat.net/
// @description    Contabiliza automaticamente as votações nos XXth contests... 
// @include        http://www.flickr.com/groups/ilportugal/discuss/*/
// ==/UserScript==


teste=document.evaluate(
	'//td[@id=\'GoodStuff\']/h2',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

if (teste.snapshotLength){
		texs=teste.snapshotItem(0);
		texs=texs.textContent;
}
if (texs.search('Concurso de Fotos')==-1){
	return
}

tabela=document.evaluate(
	'//table[@class=\'TopicReply\']',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

tex=window.document.body.textContent;

if (tabela.snapshotLength){
	tex=tabela.snapshotItem(0);
	tex=tex.textContent;
}

var occur=[];
	var texto="";
	for (var i=0; i < 10; i++) {
		reg=new RegExp("#"+(i+1)+"","g")
		tmp=tex.match(reg);
		occur[i]=tmp.length-1;
	
	};
	occur[0]=occur[0]-occur[9]-1;	
	for (var i=0; i < 10; i++) {
		texto=texto+"#"+(i+1)+" : "+occur[i]+"<br/>"
	};	
	
var tarea;
tarea=document.createElement('div');
tarea.innerHTML="<h4>Votação até ao momento</h4>"+texto;
tarea.style.background="#eeeeee";
tarea.style.padding="15px";
tabela.snapshotItem(0).parentNode.insertBefore(tarea,tabela.nextSibling);
