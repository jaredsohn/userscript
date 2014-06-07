// ==UserScript==

// @name           FUPignore

// @namespace      http://forum.pravda.com.ua/

// @description    Скрывает темы и сообщения игнорируемых

// @include        http://forum.pravda.com.ua/*

// ==/UserScript==

if (GM_getValue("IgnoredUsers",'')=='') IgnoredList=new Array();
else IgnoredList = GM_getValue("IgnoredUsers").split(':');
sebl=document.getElementById('search-area');
sebl.style.display='none';
sebl.style.position='fixed';
sebl.style.padding='10px';
sebl.style.border='1px solid black';
sebl.style.left='0px';
sebl.style.top='0px';
sebl.style.backgroundColor='#fff';
igbl=document.createElement('a');
igbl.innerHTML='Cписок ігнорованих';
igbl.className='icon';
igbl.style.cursor='pointer';
igbl.addEventListener('click',IB,false);
sbl=document.createElement('a');
sbl.innerHTML='Пошук';
sbl.className='icon';
sbl.style.cursor='pointer';
sbl.addEventListener('click',SB,false);
igblock=document.createElement('div');
igblock.style.display='none';
igblock.style.position='fixed';
igblock.style.padding='10px';
igblock.style.border='1px solid black';
igblock.style.left='0px';
igblock.style.top='0px';
igblock.style.backgroundColor='#fff';

function sandbox(){
    var sandbox = document.createElement('a');
    sandbox.innerHTML = 'Sandbox';
    sandbox.title = 'Sandbox';
    sandbox.href = '/list.php?111';
    _dc = document.createElement('div');
    _dc.className = 'flist';
    _dc.appendChild(sandbox);
    _db = document.createElement('div');
    _db.className = 'bl';
    _db.innerHTML = '|';
    document.getElementById('phorum').childNodes[5].insertBefore(_db, document.getElementById('phorum').childNodes[5].childNodes[4]);
    document.getElementById('phorum').childNodes[5].insertBefore(_dc, document.getElementById('phorum').childNodes[5].childNodes[4]);
}

function Ignore(nick){
	return function(){
		IgnoredList.push(nick);
		GM_setValue("IgnoredUsers",IgnoredList.join(':'));
		igblock.style.display='none';
		if (document.location.href.match('list')){for (var i=1;i<tList.rows.length;i++){if (tList.rows[i].cells[2].childNodes[1].innerHTML==nick){tList.rows[i].style.display='none'}}}
		if (document.location.href.match('read')){for (var i=0;i<pList.length;i++){if (pList[i].getElementsByTagName('a')[0].innerHTML==nick){document.getElementsByClassName('message')[i].style.display='none';}}}
	}
}

function UnIgnore(uid,nick){
	return function(){
		IgnoredList.splice(uid,1);
		GM_setValue("IgnoredUsers",IgnoredList.join(':'));
		igblock.style.display='none';
		IB();
		if (document.location.href.match('list')){for (var i=1;i<tList.rows.length;i++){if (tList.rows[i].cells[2].childNodes[1].innerHTML==nick){tList.rows[i].style.display=''}}}
		if (document.location.href.match('read')){for (var i=0;i<pList.length;i++){if (pList[i].getElementsByTagName('a')[0].innerHTML==nick){document.getElementsByClassName('message')[i].style.display='block';}}}
	}
}

function SB(){
	if (sebl.style.display=='none')sebl.style.display='inline';
	else sebl.style.display='none';
}

function IB(){	
	if (igblock.style.display=='none'){
		igblock.style.display='inline';
		igblock.innerHTML='<h4>Список ігнорованих</h4>';
		for (var i=0;i<IgnoredList.length;i++){
			var ulink=document.createElement('a');
			ulink.innerHTML=IgnoredList[i];		
			ulink.style.cursor='pointer';
			ulink.style.marginRight='10px';
			ulink.addEventListener("click",UnIgnore(i,IgnoredList[i]),false);
			igblock.appendChild(ulink);
		}
		var clink=document.createElement('a');
		clink.innerHTML='Зачинити';
		clink.addEventListener("click",IB,false);
		clink.style.marginTop='10px';
		clink.style.cssFloat='left';
		clink.style.cursor='pointer';
		clink.style.color='#DD0000';
		igblock.appendChild(clink);
	}
	else {igblock.style.display='none';}	
}

if (document.location.href.match('list')){
	tList=document.getElementsByClassName('list')[0];
	document.getElementsByClassName('nav')[0].appendChild(igbl);
	document.getElementsByClassName('nav')[0].appendChild(sbl);
	document.getElementsByClassName('nav')[0].appendChild(igblock);
	for (var i=1;i<tList.rows.length;i++){
		var cai = false;
		for (var l=0;l<IgnoredList.length;l++){if (tList.rows[i].cells[2].getElementsByTagName('a')[0].innerHTML==IgnoredList[l]){cai = true;}}	
		if (cai) tList.rows[i].style.display='none';
		else {
			var ilink=document.createElement('a');
			ilink.innerHTML='(X)';
			ilink.style.cursor='pointer';
			tList.rows[i].cells[2].appendChild(ilink);
			ilink.addEventListener('click',Ignore(tList.rows[i].cells[2].getElementsByTagName('a')[0].innerHTML),false);
		}
	}
}

if (document.location.href.match('read')){
	pList=document.getElementsByClassName('message-author icon-user');
	document.getElementsByClassName('nav')[0].appendChild(igbl);
	document.getElementsByClassName('nav')[0].appendChild(sbl);
	document.getElementsByClassName('nav')[0].appendChild(igblock);
	for (var i=0;i<pList.length;i++){
		var cai = false;
		for (var l=0;l<IgnoredList.length;l++){if (pList[i].getElementsByTagName('a')[0].innerHTML==IgnoredList[l]){cai = true;}}
		if (cai) document.getElementsByClassName('message')[i].style.display='none';
		else {
			var ilink=document.createElement('a');
			ilink.innerHTML='(X)';
			ilink.style.cursor='pointer';
			pList[i].appendChild(ilink);
			ilink.addEventListener('click',Ignore(pList[i].getElementsByTagName('a')[0].innerHTML),false);
		}
	}	
}

sandbox();
