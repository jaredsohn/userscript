// ==UserScript==
// @name           CS2 Improved Contact List
// @namespace      CS
// @description    i don't like to click 'edit'
// @include        http://g1.chosenspace.com/index.php?go=contacts*
// ==/UserScript==
function linkify(btitle,value,href){
	var a=document.createElement('a');
	a.textContent=value;
	if(btitle!='')a.setAttribute('title',btitle);
	a.setAttribute('href',href);
	return a; 
}
function makelink(beacon,ignore,rapport_id){
	var ret=newRef+'functions/contacts_edit.php?contacts_id='+contactid;
	if(beacon)ret+='&beacon=1';
	if(ignore)ret+='&ignore=1';
	ret+='&rapport_id='+rapport_id;
	return ret;
};
var forms=document.evaluate("//form[contains(@action,'contacts_remove')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var iLength=forms.snapshotLength;
var newRef,form,contactid,fenloc,fen;
for(var i=0;i<iLength;i++){
	newRef=location.href.split('/'); newRef=newRef[0]+"//"+newRef[2]+"/";
	form=forms.snapshotItem(i);
	contactid=form.getAttribute('action').split('=')[1];
	fenloc=form.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;
	fenloc.setAttribute('width','auto');
	fenloc.appendChild(document.createTextNode('['));
	fenloc.appendChild(linkify('Set to friend: Beacon Only','F',makelink(true,false,1)));
	fenloc.appendChild(document.createTextNode('] ['));
	fenloc.appendChild(linkify('Set to Neutral: Remove Beacon & Ignore','N',makelink(false,false,2)));
	fenloc.appendChild(document.createTextNode('] ['));
	fenloc.appendChild(linkify('Set to Enemy: Ignore Only','E',makelink(false,true,3)));
	fenloc.appendChild(document.createTextNode(']'));
}
