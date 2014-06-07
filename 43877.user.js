// ==UserScript==
// @name          Finalised Tone is color
// @namespace     http://www.bertrand.asia/
// @description   Colorise chinese character according to tone
// @include        *     
// @resource      Adso adso.dat
// @resource      AdsoIdx simp.idx
// ==/UserScript==
if(top != self) {GM_log (window.location+"  est DANS UNE FRAME (unsafe) de  "+unsafeWindow.parent.location);return;}
// pas dans les iframes
var color= new Array('black','blue','orange','green','red','grey');// this is no tone, first tone....fourth tone, light tone
var myDico = GM_getResourceText("Adso");
var myIdx = GM_getResourceText("AdsoIdx");
var myIdxl=myIdx.length;
const WORD=2;
const PINYIN=3;
const DEF=4;
const TONE=5;
var tdata = Array();
tdata.prevTarget=null;
tdata.prevRangeNode=null;
tdata.prevRangeOfs=0;
tdata.popX=0;
tdata.popY=0;
// position of the tooltip relative to the mouse in pixel //
var offsetx = 12;
var offsety =  8;
var txtref=' ';


function ligne() {// lit une ligne de myidx
	var ligneContent="";
	var c="";
	while (myIdx.charAt(current)!='\r'){
			ligneContent+=myIdx.charAt(current);;
			current++;
	}
	current++;
	ligneContent+="\n";
	current++;
	return ligneContent;
}
function getCarCode(line) {
	return line.charCodeAt(0);
}

if ( typeof(dic) == "undefined") {
	//alert ("je passe par là");
	var current=0;
	var dictrie="";
	var nl=0;
	var code=0;
	var mincode=99999999;
	var maxcode=0
	dic = Array();
	
	while (current <myIdxl-2) { //
		l=ligne();
		nl++;
		code=l.charCodeAt(0);
		if ((code<mincode)&(code>200)) {mincode=code;}
		if (code>maxcode) {maxcode=code;}
		if (dic[code]==undefined) {dic[code]="\n"+l;}
		else {dic[code]+=l;}
	}
}
else {alert ("好"+"好".charCodeAt(0)+dic["好".charCodeAt(0)]);}


//alert('cest commencé');
window.addEventListener("load", function(e) {
  GM_log ('cademarre :'+window.location+'  charset='+document.characterSet);init();
}, false);
if (typeof(unsafeWindow.parent)!="undefined"){GM_log (window.location+"  est dans une frame (unsafe) de  "+unsafeWindow.parent.location);}

/*window.setTimeout(,10000);
GM_registerMenuCommand( "Colorise!", colorise, "e", "control", "h" );
*/
function colorise(node){
	//GM_log ('ca a demarre apres click');
	//var node =document.getElementsByTagName("body")[0];
//GM_log(node.attributes[0].name+'-->'+node.attributes[0].value);
	//GM_log ('text"'+node.textContent+'"\n'+node.toString());
//while ((node.nodeValue!=3)||(node=='null')){node=nextSibling(node);}
//alert (node.textContent);
	var textnodes = document.evaluate("//text()",node,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < textnodes.snapshotLength; i++) {
		if (textnodes.snapshotItem(i).parentNode.getAttribute('colorised')!='yes'){
			replaceTextOfTextNode( textnodes.snapshotItem(i));
		}
	}
}
function init(){
var node =document.body;
var style=' #tooltip {padding: 3px; background: #C0C0C0; border: 1px solid #eee; text-align: left; font-size: 15px;} span.tip { border-bottom: 1px solid #eee;}';
var testing = false;
var now= new Date();
var timer=now.getTime();
GM_log(timer);
colorise(node);
now= new Date();timer=now.getTime()-timer;
GM_log('letemps de colorisation est '+timer);
//node.addEventListener("DOMSubtreeModified", f1=function(e){test("DOMSubTreeModified",e);}, false);
node.addEventListener("DOMNodeInserted", f2=function(e){test("DOMNodeInserted",e);}, false);
newelement('tooltip');
GM_addStyle(style);
node.addEventListener("mousemove",f4=function(event){sourisBouge(event);},false);
//node.addEventListener("DOMCharacterDataModified", f3=function(e){test("DOMCharacterModified",e);}, false);
GM_log('colorise static finished !');
}
function test(nom,e) {
	//GM_log (nom+'  : '+e.explicitOriginalTarget.nodeName+'\n');
	if (nom=="DOMNodeInserted") {
		//GM_log('Node Inserted text :'+e.explicitOriginalTarget.textContent);
		if (e.explicitOriginalTarget.nodeName!='#text'){
			//document.body.removeEventListener("DOMSubtreeModified", f1, false);
			document.body.removeEventListener("DOMNodeInserted", f2, false);
			//document.body.removeEventListener("DOMCharacterDataModified", f3, false);
			colorise(e.explicitOriginalTarget);
			//document.body.addEventListener("DOMSubtreeModified", f1, false);
			document.body.addEventListener("DOMNodeInserted", f2, false);
			//document.body.addEventListener("DOMCharacterDataModified", f3, false);
		}
		
		else {
			//document.body.removeEventListener("DOMSubtreeModified", f1, false);
			document.body.removeEventListener("DOMNodeInserted", f2, false);
			//document.body.removeEventListener("DOMCharacterDataModified", f3, false);
			replaceTextOfTextNode(e.explicitOriginalTarget);
			//document.body.addEventListener("DOMSubtreeModified", f1, false);
			document.body.addEventListener("DOMNodeInserted", f2, false);
			//document.body.addEventListener("DOMCharacterDataModified", f3, false);
		}
		
	}
		
}
function replaceTextOfTextNode(node){
	var frag = document.createDocumentFragment();
	//A faire tester si on a bien un text node
	try {
		var text=node.textContent; // ca pourrait etre data
	}
	catch(err)  {
		txt="There was an error on this page.\n\n";
		txt+="Error description: " + err.description + "\n\n";
		GM_log(txt);
		return
	}

	//GM_log(text);
	var split=splitNodeChinese(text);
	if (split=='noHanzi'){return;}
	for (i=0;i<split[0].length;i++){
		if (split[1][i]=='8') {frag.appendChild(document.createTextNode(split[0][i]));}
		else {
			var font = document.createElement("FONT");
			var att = document.createAttribute("color");
			att.nodeValue = color[split[1][i]];
			var att2= document.createAttribute('colorised');
			att2.nodeValue='yes';
			font.setAttributeNode(att);
			font.setAttributeNode(att2);
			font.appendChild(document.createTextNode(split[0][i]));
			frag.appendChild(font);
		}
	}
	node.parentNode.replaceChild(frag,node);
}
function decreaseIndex(index,word,exact) {
	//GM_log('decreaseIndex  word='+word+'  exact='+exact);
	var reducedIndex='\n';
	var car=word;
	if (exact) {car+=',';}
	var i=0;
	i=index.indexOf('\n'+car,0);
	while (i!=-1){
		i++;
		//alert(myIdx.substr(i-10,20));
		do{
			c=index.charAt(i);
			reducedIndex+=c;
			i++;
		}while (c!='\n');
		i=index.indexOf('\n'+car,i-1);
	}
	//GM_log('reduced index '+reducedIndex);
	return reducedIndex;
}
	
function getIndexEntries(word){
	//GM_log('getIndexentries  word='+word);
	var inter='';
	var trouveIdx=/,(\d*)/;
	var isHanzi=/[\u4E00-\u9FFF]/;
	var dictLine=/([\u4E00-\u9FFF]*) ([\u4E00-\u9FFF]*)\s*\[([\u0000-\u00FF]*)]\s*\/([\u0000-\u00FF]*)\//;
	var u=new Array;
	var i; var j; var k;var l;
	var entry='';var c='';
	var entries=new Array();
	var goodEntry=new Array();
	var entry2="bonjour";
	var valid='';
	if (word==''){return false}
	//entry=decreaseIndex(myIdx,word.substr(0,1),false);
	entry=dic[getCarCode(word)];
	if (entry==undefined){GM_log('un car pas connu'+word.substr(0,1)+'in word'+word);return 'inconnu';} // ya un pb
	entry2=decreaseIndex(entry,word.substr(0,1),true);
	if (entry2!='\n'){valid+=entry2.substr(1,entry.length-1);}
	if (word.length==1){return valid;}
	for (i=2;i<=word.length;i++){
		entry=decreaseIndex(entry,word.substr(0,i),false);
		if (entry=='\n') break;
		entry2=decreaseIndex(entry,word.substr(0,i),true);
		if (entry2!=='\n'){valid+=entry2.substr(1,entry.length-1);}
	}
	return valid;
}
function searchDict(word){
	//GM_log ('SearchDict  word:'+word);
	var trouveIdx=/,(\d*)/;
	var isHanzi=/[\u4E00-\u9FFF]/;
	var dictLine=/([\u4E00-\u9FFF]*) ([\u4E00-\u9FFF]*)\s*\[([\u0000-\u00FF]*)]\s*\/([\u0000-\u9FFF]*)\//;
	var u=new Array;
	var i; var j; var k;var l;
	var entry='';var c='';
	var entries=new Array();
	var goodEntry=new Array();
	valid=getIndexEntries(word);
	if (valid=='inconnu') {
		var t=new Array();
		t[0]=word.substr(0,1);
		t[1]=word.substr(0,1);
		t[2]=word.substr(0,1);
		t[3]='?8';
		t[4]='inconnu';
		t[5]=8;
		goodEntry[0]=t;
		return goodEntry;
	}
		
	//GM_log ('valid:'+valid);
	entries=valid.split('\n');
	if (entries==null) alert (word+'\n'+reduceDict);
	//alert(entries.toString());
	for (i=0;i<entries.length-1;i++){
		u=trouveIdx.exec(entries[i]);
		if (u==null){alert('mauvaiseligne'+line);return entry;}
		j=parseInt(u[1]);
		//alert(u[1]);
		k=0;
		entry='';
		while((u=myDico.charAt(j+k))!='\n'){
			entry +=u;
			k++;
		}
		goodEntry[i]=dictLine.exec(entry);
		if (goodEntry[i]==null) {GM_log( 'pour '+word+' une entree ['+i+']: '+entry);}
		//alert(entry+'\n'+goodEntry[i].toString());
		goodEntry[i][TONE]=goodEntry[i][PINYIN].replace(/\D/g,'');
		//if(goodEntry[i][TONE].length!=goodEntry[i][WORD].length) {alert(' on a rate une marche'+word+' '+goodEntry[i].toString());}
	}
	//alert (goodEntry.toString());
	return goodEntry;
}
function getTones(chineseTxt){
	//GM_log('getTones  chineseTxt='+chineseTxt);
	var dictLine=/([\u4E00-\u9FFF]*) ([\u4E00-\u9FFF]*)\s*\[([\u0000-\u00FF]*)]\s*\/([\u0000-\u00FF]*)\//;
	var tab=new Array();
	var l=12; // longueur de la cahine de caractere
	if (l>chineseTxt.length) {l=chineseTxt.length;}
	var tones='';
	var i=0;var k=0;
	var delta;
	var pinyin;
	var ton;
	var entries;
	var max;
	while(i<chineseTxt.length){
		car=chineseTxt.substr(i,l);
		entries=searchDict(car);
		if (entries.length==0){
			console.log('allo Houston on a un pb un caractere inconnu !');
			tones+='0';
		}
		else{
			if (entries[entries.length-1][TONE].length==entries[entries.length-1][WORD].length){
				tones+=entries[entries.length-1][TONE];
			}
			else {tones+='0';console.log('good entry sans tons',entries[entries.length-1]);}
			
		}
		i=tones.length;
	}
	if (i!=chineseTxt.length){
		// alert('allo Houston on a un autre pb !');
		GM_log('ya un pb avec le texte:'+chineseTxt+'et les tons '+tones.toString());
		return tones.substr(0,chineseTxt.length-1);
	}
	// ce qui est au dessus et pas beau va falloir ameliorer
	return tones
}

function splitNodeChinese(txt) { //to be replaced by textNode
	//GM_log('SplitNodeChinese  txt='+txt);
	var haveHanzi=/([^\u4E00-\u9FFF]*)([\u4E00-\u9FFF]*)([\u0000-\uFFFF]*)/;
	var hanzi=/[\u4E00-\u9FFF]/;
	//if (txtnode.nodeName!='#text') {return 'false';}
	//txt=txtnode.textContent;
	var tab=haveHanzi.exec(txt);
	if (tab[2]=='') { return 'noHanzi';}
	var split=new Array();
	var cars=new Array();
	var tones=new Array();
	var i=0;
	do{
		if (tab[1]!='') {cars[i]=tab[1];tones[i]=8;}
		if (tab[2]!='') {
			tt=getTones(tab[2]);
			if (tt==false){GM_log('car sans ton: car= "'+tab[2]+'"  ton=false');}
			cars=cars.concat(tab[2].split(""));
			tones=tones.concat(tt.split(""));
		}
		suite=tab[3];
		tab=haveHanzi.exec(suite);
		i=tones.length;
	}while(suite!='');
	split[0]=cars;
	split[1]=tones;
	if (split[0].length!=split[1].length){alert( 'Houston moins de ton que de car');}
	return split;
}

function newelement(newid){ 
    if(document.createElement)    { 
        var el = document.createElement('div'); 
        el.id = newid;     
        with(el.style){ 
            display = 'none';
            position = 'absolute';
        } 
        el.innerHTML = txtref; 
        document.body.appendChild(el); 
    } 
} 

function exit() { document.getElementById('tooltip').style.display = 'none';}

function sourisBouge(ev) {
		var rp = ev.rangeParent;
		var ro = ev.rangeOffset;

		if (ev.target == tdata.prevTarget) {
			if ((rp == tdata.prevRangeNode) && (ro == tdata.prevRangeOfs)) return;
		}

		if ((ev.explicitOriginalTarget.nodeType != 3) && !('form' in ev.target)) {
			rp = null;
			ro = -1;
		}

		tdata.prevTarget = ev.target;
		tdata.prevRangeNode = rp;
		tdata.prevRangeOfs = ro;
		if ((rp) && (rp.data) && (ro < rp.data.length)) {
			//GM_log('sourisbouge'+ rp.nodeName+ 'rangeofs'+ro+' data '+rp.data);
			tdata.popX = ev.clientX;
			tdata.popY = ev.clientY;
			show (tdata)//afficher new popup
		}
			// dont close just because we moved from a valid popup slightly over to a place with nothing
		var dx = tdata.popX - ev.clientX;
		var dy = tdata.popY - ev.clientY;
		var distance = Math.sqrt(dx * dx + dy * dy);
		if (distance > 4) {	exit();return;}
	return;
}
function show(tdata) {
	var rp = tdata.prevRangeNode;
	var ro = tdata.prevRangeOfs;
	var u;

		if (!rp) {exit();return;}
		u = rp.data.charCodeAt(ro);
		// if we have '   XYZ', where whitespace is compressed, X never seems to get selected
		while (((u = rp.data.charCodeAt(ro)) == 32) || (u == 9) || (u == 10)) {
			++ro;
			if (ro >= rp.data.length) {	exit();return;}
		}
		if ( isNaN(u) || u < 0x4E00 || u > 0x9FFF ){exit();return;}
		var text = rp.data.substr(ro, 12);
		fin='false'
		while ((text.length < 12) && (fin=='false' )) {
	
			if (rp.nextSibling==null){
				if (rp.parentNode.nextSibling==null) { fin='true';}
				else {
					rp=rp.parentNode.nextSibling;
					var txt=rp.textContent;
					for (var i=0;i<txt.length;i++){
						u=txt.charCodeAt(i);
						if ( isNaN(u) || u < 0x4E00 || u > 0x9FFF|| txt.length>=12) { fin='true';break}
						text+=txt.charAt(i);
					}
				}
			}
			else {
				rp=rp.nextSibling; 
				var txt=rp.textContent;
				for (var i=0;i<txt.length;i++){
						u=txt.charCodeAt(i);
						if ( isNaN(u) || u < 0x4E00 || u > 0x9FFF|| txt.length>=12) { fin='true';break}
						text+=txt.charAt(i);
				}
			}
		}
		var e = null;
		var html='';
		var dico=sortSearchDict(text);
		for (var i=0;i<dico.length;i++){
			var split=splitNodeChinese();
			for (var j=0;j<dico[i][WORD].length;j++){
				html+='<font color="'+color[parseInt(dico[i][TONE].charAt(j))]+'">'+dico[i][WORD].charAt(j)+'</font>';
			}
			//GM_log(html);
			html+='   '+dico[i][PINYIN]+'  '+dico[i][DEF]+'<br/>';
		}
		if(!document.getElementById('tooltip')) newelement('tooltip');
		var lixlpixel_tooltip = document.getElementById('tooltip');
		document.body.removeEventListener("DOMNodeInserted", f2, false);
		lixlpixel_tooltip.innerHTML = html;
		lixlpixel_tooltip.style.display = 'block';
		var ww=window.innerWidth;
		lixlpixel_tooltip.style.left = (window.pageXOffset+1)+'px';
		var width=document.defaultView.getComputedStyle(lixlpixel_tooltip, null).getPropertyValue("width");
		width=width.substr(0,width.length-2);
		if ((tdata.popX+offsetx+parseInt(width))>ww) {lixlpixel_tooltip.style.left = (window.pageXOffset+ww-parseInt(width)-15)+'px';}
		else {lixlpixel_tooltip.style.left = window.pageXOffset+tdata.popX+offsetx+'px';}
        lixlpixel_tooltip.style.top = window.pageYOffset+tdata.popY+offsety+'px'//(mousey+pagey+offsety) + 'px';
		var width=document.defaultView.getComputedStyle(lixlpixel_tooltip, null).getPropertyValue("width");
		
		document.body.addEventListener("DOMNodeInserted", f2, false);

		// pour la selection il faut que je modifie le code pour trouver la fin 
		//var sel=window.getselection();
		//sel.removeAllRanges();
}
function sortSearchDict(word){
	var sortDic=Array();
	var dico=searchDict(word);
	var refi='';
	var refj='';
	var k=0
	for (var i=0;i<dico.length;i++){
		if (dico[i][6]!='done'){
		    refi=dico[i][WORD]+dico[i][PINYIN];
			sortDic[k]= new Array();
			sortDic[k][WORD]=dico[i][WORD];
			sortDic[k][PINYIN]=dico[i][PINYIN];
			sortDic[k][TONE]=dico[i][TONE];
			sortDic[k][DEF]=dico[i][DEF];
			for( var j=i+1;j<dico.length;j++){
				if (refi==(dico[j][WORD]+dico[j][PINYIN])) {sortDic[k][DEF]=union(sortDic[k][DEF],dico[j][DEF]);dico[j][6]='done';}
			}
			k++
		}
	}
	return sortDic
}
function union(tab1,tab2){
	var ta1= (tab1+'/'+tab2).split('/');
	var ti= new Array();
	ti[0]=ta1[0];
	for (var i=1;i<ta1.length;i++){
		var test= new Boolean(false);
		for (var j=0;j<ti.length;j++) {if (ta1[i]==ti[j]) test=true;}
		if (test==false) {ti[ti.length]=ta1[i];}
	}
	return ti.join('/');
}
			
	/*	
		// don't try to highlight form elements
		if ((this.cfg.highlight) && (!('form' in tdata.prevTarget))) {
			var doc = rp.ownerDocument;
			if (!doc) {
				this.clearHi();
				this.hidePopup();
				return;
			}
			var r = doc.createRange();
			r.setStart(rp, ro);
			r.setEnd(rp, ro + (e.matchLen ? e.matchLen : 1));

			var sel = doc.defaultView.getSelection();
			sel.removeAllRanges();
			sel.addRange(r);
			tdata.prevSelView = doc.defaultView;
		}

		this.showPopup(this.dict.makeHtml(e), tdata.prevTarget, tdata.popX, tdata.popY, false);
	*/		
