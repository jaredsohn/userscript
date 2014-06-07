// ==UserScript==
// @name           TeX4All
// @namespace      DC.ru
// @include        http://iichan.ru/*
// @include        http://2-ch.ru/*
// ==/UserScript==
(function(){
var gchart="http://chart.apis.google.com/chart?cht=tx&chf=bg,s,FFFFFF00&chl=";

function Text(txt){
	return document.createTextNode(txt);
}

function eva_(xpath,root){
	root=root?root:document;
	var a=document.evaluate(xpath,root,null,7,null);
	var b=[];
	for(var i = 0; i < a.snapshotLength; i++) {
		b[i] = a.snapshotItem(i);
	}
	return b;
}

function parse_row(txt){
	if(!txt)return;
	var s=txt.textContent;
	var textN,img;
	var cont=txt.parentNode;
	var c=0;
	var eq='';
	while((pos=s.search(/\$[^$]+\$/m))>-1){
		textN=Text(s.substr(0,pos));
		img=new Image();
		img.src=gchart+escape(eq=s.match(/\$([^$]+)\$/m)[1]).replace(/\+/g,"%2b");
		img.title=img.alt=eq;
		cont.insertBefore(textN,txt);
		cont.insertBefore(img,txt);
		s=s.substr(pos+eq.length+2);
	}
	cont.insertBefore(Text(s),txt);
	cont.removeChild(txt);
}

function parse_multi(txt){
	if(!txt)return;
	var cld=txt.nextSibling;
	var cont=txt.parentNode;
	var img,tmp;
	cont.removeChild(txt);
	while(cld.nextSibling){
		if(cld.nodeType==3){
			restore_(cld);
			if(cld.textContent.indexOf('$$')>-1)break;
			img=new Image();
			img.src=gchart+escape(cld.textContent).replace(/\+/g,"%2b");
			img.style.margin="auto";
			img.title=img.alt=cld.textContent;
			cont.insertBefore(img,cld);
			tmp=cld;
			cld=cld.nextSibling;
			cont.removeChild(tmp);
		}else{
			cld=cld.nextSibling;
		}
	}
	if(cld)cont.removeChild(cld);
}

function restore_(cld){
	if(!cld)return;
	var tmp=cld.nextSibling,tmp2;
	var cont=cld.parentNode;
	while(tmp&&tmp.nodeName!='BR'){
		if(tmp.nodeName=='#text')txt=tmp.data;
		if(tmp.nodeName=='EM')txt="_"+tmp.textContent+"_";
		tmp2=tmp;
		tmp=tmp.nextSibling;
		cont.removeChild(tmp2);
		cld.textContent+=txt;
	}
}

function init(){
	var texts=eva_('//text()');
	if(!texts[0])return;
	var txt=texts[0];
	for(var i=0;i<texts.length;txt=texts[++i]){
		if(txt&&txt.parentNode){
			if(txt.textContent=='$$'){
				parse_multi(txt);
			}else if(txt.textContent.match(/\$[^$]+?\$/m)){
				parse_row(txt);
			}
		}
	}
}
init();

})()
