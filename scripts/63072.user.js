// ==UserScript==
// @name           TH IotM auto-send
// @namespace      http://userscripts.org/users/110369
// @include        http://www.twilightheroes.com/messages-send.php*
// ==/UserScript==

function fbi(a,x){
//magic happens here. ;)
//
//actually, this is just a handy little function to return an option
//   index... a is the option value array, x is the desired option
//   value. returns 0 if the desired option value is non-existent
	var b;
	for(b=0;b<a.length;b++)
		if(a[b].value==x)
			return b;
	return 0;}

function gfi(){
//this function isn't used in the basic version of this script.
//
//however, you probably want to pass more than one item around, and
//   this is the function that returns an array containing the 
//   item ID#s and quantities to be moved.
//NOTE: the script actually sends every copy it finds(so long as there
//   are enough to send the correct multiple) and I'm working on that.
//   I _think_ I've fixed that now.
//
	var b= GM_getValue('ira',null);
	if(b)return b.split(';');
//
//on this following line, the string should contain pairs in the form
//   "[ID of item],[# of copies of the item to send]" with semicolons
//   between different pairs
	return '882,1;880,2;881,3;926,1;946,1;1100,1;1109,1;1110,1;1111,1;1112,1'.split(';');}
	
function gca(){
	var b= GM_getValue('cal',null);
	if(b)return b.split(';');
//on this following line, change the numbers in the string to the
//   charIDs of your own alts. (And obviously the names to the correct
//   name...) Leave the punctuation as-is, though.
//NOTE: Change these values prior to running the script, unless you 
//   really do want to send me a bunch of IotMs in thanks for creating
//   this script. (Although that does kinda make it less useful to you
//   but I won't complain.)
	return '28177:Heather;28533:Nick;28450:Luci;28343:Reuben;28226:Tammi;28209:Bubba;28175:Tal;28164:Doc;28294:JJJ'.split(';');}

function nfl(){
//this creates the nice little drop-down selection box.
	var l=document.createElement('div');
	var a=gca();
	var options="<option value=''>Send IotMs to...</option>";
  	for(var i=0;i<a.length;i++){
		options	+="<option value='"
		       	+ a[i].split(':')[0]
		       	+ "'>"
		       	+ a[i].split(':')[1]
		       	+ "</option>";}
	l.innerHTML = "<select id='sitl1' "
    			+ " >" 
			+ options
			+ "</select>"; 
	var b=document.getElementsByTagName('form')[0];
	b.parentNode.insertBefore(l,b);
	document.getElementById('sitl1').selectedIndex=GM_getValue('gci',1);
	GM_setValue('cal',a.join(';'));}
			
function git(c){
//this function is no longer used, but I'm keeping it here for archival
//   purposes. Live with it. ;p
	var a= GM_getValue('gci',0);
	var b= gca();
	GM_setValue('cal',b.join(';'));
	if(b){
		a+=c;
		a=((a<b.length)?a:0);
		GM_setValue('gci',a);}
	return b[a];}

function foo(){
//this is where the real magic happens. In other words...
//
//	DON'T FUCK WITH THIS UNLESS YOU KNOW WHAT YOU'RE DOING
//
//  HTH, HAND.
//
//  ;)
//
	var a,b,c,d,e,f,t;
	a=document.getElementsByName('to')[0];
	b=document.getElementById('sitl1').selectedIndex;
	f=gca();
	GM_log(f);
	GM_setValue('gci',b);
	e=f[b-1];
 	b=e.split(':')[0];
	GM_log(b);
	a.value=b;
	a=document.getElementsByName('item')[0];
	e=gfi();
	GM_log(e);
	GM_setValue('ira',e.join(';'));
	t=GM_getValue('nits',0);
	GM_log(t);
	f=0;
	for(var x=t;x<e.length;x++){
		b=e[x].split(',')[0];
		c=e[x].split(',')[1];
		a.selectedIndex=fbi(a.options,b);
		f=(a.selectedIndex>0);
		if(f){
			GM_setValue('nits',x+1);
			break;}}
	if (f){
		a=document.getElementsByName('quantity')[0];
		a.value=c;
		a=document.getElementsByTagName('form')[0];
		a.submit();}
	else
		GM_setValue('aft',false);
	t=GM_getValue('nits',0);
	GM_log(t);}

function bar(){
	GM_setValue('nits',0);
	GM_setValue('aft',true);
	foo();}

function baz(){
	var a=document.createElement('button');
	a.id='tit';
	var b=document.getElementsByTagName('form')[0];
	GM_log('yo');
	a.innerHTML='autofill';
	b.parentNode.insertBefore(a,b); 
	nfl();
	if(GM_getValue('aft',false))
		foo();		
	a.addEventListener('click',bar,true);}


window.addEventListener('load', baz, true);
