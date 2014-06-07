// ==UserScript==
// @name	 Marqueur
// @description   Marqueur Galaxie
// @include	   http://*/game/index.php?page=galaxy*
// ==/UserScript==    


var colorn='#FFFFFF'; 
var color='#FF0000'; 

var loc = document.location;
var reg = /http:\/\/(.*?)\/game\/(.*?)/i;
var result = reg.exec( loc );
var server = result[1];
var reg1=/javascript:doit\(([0-9]*), ([0-9]*), ([0-9]*), ([0-9]*), 1, [0-9]*\);/i;


var bunk = GM_getValue('bunk_'+server);
if(bunk==null){
	bunk='';
}

var farm = GM_getValue('farm_'+server);
if(farm==null){
	farm='';
}

var angr = GM_getValue('angr_'+server);
if(angr==null){
	angr='';
}

var spio = GM_getValue('spio_'+server);
if(spio==null){
	spio='';
}


String.prototype.trim = function() { return this.replace(/^\s*|\s*$/, ''); };

var th = document.getElementById("content").getElementsByTagName('a');
for(i=0;i<th.length;i++){
    oc=th[i].getAttribute('onclick')
	if(oc!=undefined && oc.indexOf('javascript:doit')!=-1){
		planet=reg1.exec(oc);
		liste=planet[2]+':'+planet[3]+':'+planet[4];
		
		y = document.createElement('input');
		y.setAttribute('type','button');
		y.setAttribute('liste',liste);
		y.value='B';
		y.style.width='5px';
		y.addEventListener('click',f_bunk,true);
		if(bunk.indexOf(liste)!=-1){
			y.style.color=color;
		}
		th[i].parentNode.appendChild(y);
		
		y = document.createElement('input');
		y.setAttribute('type','button');
		y.setAttribute('liste',liste);
		y.value='F';
		y.style.width='5px';
		y.addEventListener('click',f_farm,true);
		if(farm.indexOf(liste)!=-1){
			y.style.color=color;
		}
		th[i].parentNode.appendChild(y);
		
		y = document.createElement('input');
		y.setAttribute('type','button');
		y.setAttribute('liste',liste);
		y.value='A';
		y.style.width='5px';
		y.addEventListener('click',f_angr,true);
		if(angr.indexOf(liste)!=-1){
			y.style.color=color;
		}
		th[i].parentNode.appendChild(y);

		y = document.createElement('input');
		y.setAttribute('type','button');
		y.setAttribute('liste',liste);
		y.value='S';
		y.style.width='5px';
		y.addEventListener('click',f_spio,true);
		if(spio.indexOf(liste)!=-1){
			y.style.color=color;
		}
		th[i].parentNode.appendChild(y);		
	}
}

function f_bunk(){
	a=this.getAttribute('liste');
	if(bunk.indexOf(a)!=-1){
		bunk=bunk.replace(a,'');
		this.style.color=colorn;
	}else{
		bunk+='|'+a;
		this.style.color=color;
	}
	GM_setValue('bunk_'+server,bunk);
}

function f_farm(){
	a=this.getAttribute('liste');
	if(farm.indexOf(a)!=-1){
		farm=farm.replace('|'+a,'');
		this.style.color=colorn;
	}else{
		farm+='|'+a;
		this.style.color=color;
	}
	GM_setValue('farm_'+server,farm);
}

function f_angr(){
	a=this.getAttribute('liste');
	if(angr.indexOf(a)!=-1){
		angr=angr.replace('|'+a,'');
		this.style.color=colorn;
	}else{
		angr+='|'+a;
		this.style.color=color;
	}
	GM_setValue('angr_'+server,angr);
}

function f_spio(){
	a=this.getAttribute('liste');
	if(spio.indexOf(a)!=-1){
		spio=spio.replace('|'+a,'');
		this.style.color=colorn;
	}else{
		spio+='|'+a;
		this.style.color=color;
	}
	GM_setValue('spio_'+server,spio);
}
