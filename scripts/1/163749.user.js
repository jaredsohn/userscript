// ==UserScript==
// @name           Avanturist.org.Memo_PATCH
// @description    Avanturist.org forum Memo PATCH
// @version        0.1.3
// @include        http://avanturist.org*
// @include        http://www.avanturist.org*
// @include        https://avanturist.org*
// @include        https://www.avanturist.org*
// @include        http://glav.su*
// @include        http://www.glav.su*
// @include        https://glav.su*
// @include        https://www.glav.su*
// @grant          none
// ==/UserScript==

var i,j,k;
var w;
var e,n;
var c;
var xp,lp;
var stor;

stor=localStorage;

function mc(p){
	var s;
	s=stor[this.id];
	if (s==undefined) {
		s='';
	};
	s=prompt('memo '+this.id, s);
	if (s!=null) {
		stor.setItem(this.id, s);
	};
};

xp='/html/body/div/div/div/div/div/table/tbody/tr[1]/td[1]';
lp='../../tr[2]/td[1]';

e=document.evaluate(xp, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

for (i=0; i<e.snapshotLength; i++) {
	c='';
	for (j=0; j<e.snapshotItem(i).childNodes.length; j++) {
		if (e.snapshotItem(i).childNodes[j].outerHTML!=undefined) {
			c=c+' '+e.snapshotItem(i).childNodes[j].outerHTML;
		};
	};
	c=c.substr(c.indexOf('action=profile;u='));
	c=c.substr(17,10);
	c=c.substr(0,c.indexOf('"'));
	w=document.createElement('INPUT');
	w.type='button';
	w.id=c;
	w.style.cssFloat='right';
	w.style.position='relative';	
	w.value='Memo';
	w.name='memobutton';
	e.snapshotItem(i).appendChild(w);
	
	n=document.evaluate(lp, e.snapshotItem(i), null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

	c=stor[c];
	if (c==undefined) {c=''};
	for (k=0; k<n.snapshotLength; k++) {
		if (n.snapshotItem(k).innerHTML!=undefined) {
			n.snapshotItem(k).innerHTML=n.snapshotItem(k).innerHTML+c;
		};
	};
	
};

w=document.getElementsByName('memobutton');
for (i=0; i<w.length; i++) {
	w[i].addEventListener("click", mc, false);
};
 
