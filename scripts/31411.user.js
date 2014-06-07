/*<![CDATA[*//*
// ==UserScript==
// @name          zapEmbedsRefer
// @description   replace all embeds for href option display
// @include       *
// @include   /^https?://*/
// @match  http://*
// @match  https://*
// @namespace     userscripts.org/users/46776
// ==/UserScript== */
var codemp={
zapEmbedsref:function(){
	var doc=document,getemb=doc.getElementsByTagName('embed'),len=getemb.length;
  if(len){
   for(var m=len,geb,j=0,tmp=[];m--;j++){geb=getemb[j];tmp[j]=[geb,geb.parentNode];}
   for(var i=len,embaj=[],embi,emba;i--;){
	embi=tmp[i][0].attributes;
   for(var j=embi.length,embats,emba=embaj[i]=[];j--;){embats=embi[j];emba[j]=[embats.name,embats.value];}
   };geb=null;embi=null;emba=null;
	var repl=function(){var ad;return function(){ad=doc.createElement('a');ad.setAttribute('href','javascript:;');ad.setAttribute('onclick','replAdsC(this)');ad.style.position='relative';ad.textContent='em';return ad;};}();
	var ads,gem=[];embaj.forEach(function(v,i){ads=repl();v.forEach(function(d){ads.setAttribute(d[0],d[1]);});gem[i]=ads;});embaj=null;
	tmp.forEach(function(v,i){v[1].replaceChild(gem[i],v[0]);});tmp=null;gem=null;this.refscr[0]=[this.replAdsC];
  }
},
zapobjt:function(){
	var doc=document,objt=doc.getElementsByTagName('object'),len=objt.length;
  if(len){
   for(var j=len,n=0,p=0,q=0,obs,vrf,prm,frgm,objm=[],ptemp=[],qtemp=[],embi,embaj=[];j--;n++){
	obs=objt[n];vrf=obs.getElementsByTagName('a')==true;
  if(vrf){qtemp[q++]=obs;}
  if(!vrf){
	ptemp[p]=[obs,obs.parentNode];prm=obs.getElementsByTagName('param');frgm=doc.createDocumentFragment();
   for(var s=prm.length;s--;){frgm.appendChild(prm[s]);};
	objm[p]=frgm;p++;embi=obs.attributes;frgm=null;obs=null;
   for(var m=embi.length,embats,q=0,emba=embaj[n]=[];m--;q++){embats=embi[m];emba[q]=[embats.name,embats.value];}
  };
   };emba=null;embats=null;
  if(!vrf){
	var repl=function(){var ad;return function(){ad=doc.createElement('a');ad.setAttribute('href','javascript:;');ad.setAttribute('onclick','replObjM(this)');ad.style.position='relative';ad.textContent='emi';return ad;};}();
	var ads,spn,gem=[];embaj.forEach(function(v,i){
	ads=repl();spn=doc.createElement('span');
	v.forEach(function(d){ads.setAttribute(d[0],d[1]);});spn.appendChild(objm[i]);ads.appendChild(spn);gem[i]=ads;
   });embaj=null;objm=null;ads=null;
	ptemp.forEach(function(v,i){v[1].replaceChild(gem[i],v[0]);});ptemp=null;gem=null;
  };
  if(vrf){
   for(var i=qtemp.length,obst,prm;i--;){
	obst=qtemp[i];obs.data='';prm=obst.getElementsByTagName('param'),pln=prm.length;
   for(var a=obs.attributes.length;a--;){obst.removeAttribute(obst.attributes[a].name);}
   for(var n=pln,pa,tmp=[];n--;){pa=prm[n];tmp[n]=[pa,pa.parentNode];}
	tmp.forEach(function(v){v[1].removeChild(v[0]);});tmp=null;
   };
  };this.refscr[1]=[this.replObjM];
  }
},
replAdsC:function replAdsC(obj){
	var attr=obj.attributes,ademb=document.createElement('embed');
   for(var i=attr.length,as,adm=[];i--;){as=attr[i];adm[i]=[as.name,as.value];};attr=null;
	adm.forEach(function(v){ademb.setAttribute(v[0],v[1]);});adm=null;ademb.removeAttribute('href');ademb.removeAttribute('onclick');
	obj.parentNode.replaceChild(ademb,obj);
},
replObjM:function replObjM(obj){
	var doc=document,attr=obj.attributes,ln=attr.length,prm=obj.getElementsByTagName('param'),ademb=doc.createElement('object'),frgm=doc.createDocumentFragment();
   for(var i=ln,as,adm=[];i--;){as=attr[i];adm[i]=[as.name,as.value];};attr=null;
	adm.forEach(function(v){ademb.setAttribute(v[0],v[1]);});adm=null;ademb.removeAttribute('href');ademb.removeAttribute('onclick');
   for(var s=prm.length;s--;){frgm.appendChild(prm[s]);}
	ademb.appendChild(frgm);prm=null;frgm=null;
	obj.parentNode.replaceChild(ademb,obj);
},
refscr:[],
adscr:function(){
	var doc=document,adscript=doc.createElement('script');adscript.appendChild(doc.createTextNode(this.refscr.join('')));doc.getElementsByTagName('body')[0].appendChild(adscript);
}
};
  document.addEventListener('load',codemp.zapEmbedsref(),codemp.zapobjt(),codemp.adscr(),true);

/*]]>*/