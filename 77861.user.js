// ==UserScript==
// @name           GitHub Commit Expander
// @namespace      vidzbigger.com
// @description    Show the remaining lines of a file while viewing a commit.  Also provides scroll marks to easily jump through changes.
// @include        http://github.com/*/*/commit*
// @match          http://github.com/*/*/commit*
// ==/UserScript==

var version = 1.0;
//simulating removal of this line
var showtics = true;
var nd = document.createElement('div');
nd.setAttribute('id','full-script-0');
nd.setAttribute('style','display:none;');

var ti = document.createElement('div');
ti.setAttribute('id','expander-tics');
ti.setAttribute('style','position:fixed;top:20px;right:0px;');
document.body.appendChild(ti);

var urlprops=[];
var alltics=[];

function getEventTarget(evt){
    var targ=(typeof(evt.target)!='undefined') ? evt.target : evt.srcElement;
    if(targ !=null){
        if(targ.nodeType==3)
            targ=targ.parentNode;
    }
    return targ;
}

function toggleStyles(earr,show){
	disp = '';
	if(!show) disp='none';
	for(var i=0,n=earr.length; i<n; i++){
		earr[i].style.display=disp;
	}
}

function loadScript(evt){
	var targ=getEventTarget(evt);
	if( targ.tagName == 'CODE' ) targ=targ.parentNode;
	if(urlprops[targ.href].loaded){
		var disp=true;
		if( urlprops[targ.href].showing ){
			 disp=false;
			 targ.innerHTML = urlprops[targ.href].text;
		}
		else targ.innerHTML = urlprops[targ.href].text.replace('Show','Hide');
		urlprops[targ.href].showing = !urlprops[targ.href].showing;
		toggleStyles(urlprops[targ.href].elem.getElementsByClassName('collapsedonly'),!disp);
		toggleStyles(urlprops[targ.href].elem.getElementsByClassName('insertedLine'),disp);
		updateTics();
		if(evt.preventDefault) evt.preventDefault();evt.returnValue=false;
		return false;
	}
	urlprops[targ.href].loaded=true;
	document.body.appendChild(nd);
	var xm = new XMLHttpRequest();
	xm.open('GET',targ.href,true);
	xm.onreadystatechange=function(){ 
		if (xm.readyState==4){
			var str = xm.responseText.split('<div id="files">')[1].split('<div class="push">')[0];
			nd.innerHTML=str.substr(0,str.lastIndexOf('</div>'));
			handleInsert(nd, urlprops[targ.href].mytable);
			nd.innerHTML = '';
			targ.innerHTML = urlprops[targ.href].text.replace('Show','Hide');
		}
	}
	targ.innerHTML = 'L O A D I N G'+urlprops[targ.href].text.replace('Show','');
	xm.send('');
	if(evt.preventDefault) evt.preventDefault();evt.returnValue=false;
	return false;
}

var fi = document.getElementById('files');
var fil = fi.getElementsByClassName('file');

for(var i=0,l=fil.length; i<l; i++){
	var di = fil[i];
	var ta = di.getElementsByTagName('table')[0];
	var la = di.getElementsByTagName('a')[0];
	la.addEventListener('click',loadScript,false);
	la.innerHTML=la.innerHTML.replace('View','Show');
	urlprops[la.href]={loaded:false,elem:di,showing:true,text:la.innerHTML,mytable:ta};
	la.innerHTML=la.innerHTML.replace('Show','Quick Load');
}

function handleInsert(nd, ta){
	ta.style.display="none";
	var tf = nd.getElementsByTagName('table')[0];
	var lis = document.getElementsByClassName('line');
	var tb = ta.getElementsByTagName('tbody')[0];
	var ros = ta.getElementsByTagName('tr');
	var ro = []; //since we are adding elements refrence origionals
	var li = [];
	for( var r=0,rc=lis.length; r<rc; r++ ){
		li[r]=lis[r];
	}
	for( var r=0,rc=ros.length; r<rc; r++ ){
		ro[r]=ros[r];
	}
	var expand=false;
	var prevlin=0;
	
	for( var r=0,rc=ro.length; r<rc; r++ ){
		var nv = '&nbsp;';
		var tdx = ro[r].getElementsByTagName('td');
		var lind = tdx[0]
		var linb = tdx[1]
		var code = tdx[2]
		var lina = linb.getElementsByTagName('a')[0];
		if( typeof(lina) != 'undefined' ){
			nv=lina.innerHTML;
		}else{
			nv=linb.innerHTML;
		}
		
		var lin = nv - 0;

		if(expand && lin > 0){
			for( var i = prevlin; i<lin-1; i++ ){
				var nr = createRow(i+1, li[i]);
				tb.insertBefore(nr, ro[r]);
			}
			expand=false;
		}
		
		if( nv == '...' ){
			expand=true;
			ro[r].className='collapsedonly';
			ro[r].style.display='none';
		}else if( lin > 0 )
			prevlin = lin;
	}

	for( var i = lin, en=li.length; i<en; i++ ){
		var nr = createRow(i+1, li[i]);
		tb.appendChild(nr);
	}
	ta.style.display="";//show table again
	
	var winhei=getWindowHeight();
	var px = getOffset(ro[1]);
	window.scrollTo(0,Math.round((px.y)-(winhei/2)));
	updateTics();
}

function getOffset( el ){
    var _x=0,_y=0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
    		_x+=el.offsetLeft;
    		_y+=el.offsetTop;
        el=el.offsetParent;
    }return { y: _y, x: _x };
}

function addTics(elms,clr,bodyhei,winhei, css){
	for(var i=0,l=elms.length; i<l; i++ ){
		var nt = document.createElement('a');
		var of=getOffset(elms[i]);
		var loc = Math.round((of.y/bodyhei) * (winhei-40))
		nt.setAttribute('href','javascript:void(0)')
		nt.setAttribute('name',of.y);
		nt.setAttribute('style','display:block;position:absolute;top:'+loc+'px;right:0px;z-index:'+loc+';background-color:'+clr+';'+css);
		ti.appendChild(nt);
		nt.addEventListener('click',function(evt){
			var targ=getEventTarget(evt)
			var winh=getWindowHeight();
			window.scrollTo(0,Math.round((targ.name-0)-(winh/2)));
		},false);
		alltics.push({tic:nt,dest:elms[i]});
	}
}

function updateTics(){
	if(!showtics) return;
	var bodyhei=getElementHeight(document.body);
	var winhei=getWindowHeight();
	for(var i=0,l=alltics.length; i<l; i++){
		var of=getOffset(alltics[i].dest);
		var loc = Math.round((of.y/bodyhei) * (winhei-40))
		alltics[i].tic.name=of.y;
		alltics[i].tic.style.top = loc+'px';
	}
}

function findTics(){
	GM_addStyle('body{height:auto !important;}')
	var bodyhei=getElementHeight(document.body);
	var winhei=getWindowHeight();
	var ins = fi.getElementsByClassName('gi');
	var del = fi.getElementsByClassName('gd');
	var fil = fi.getElementsByClassName('file');
	addTics(del,'red',bodyhei,winhei,'height:3px;width:30px;');
	addTics(ins,'#0A0',bodyhei,winhei,'height:3px;width:30px;');
	addTics(fil,'#000',bodyhei,winhei,'height:4px;width:40px;');
}

window.scrollTo(0,330);

if(showtics){
	window.addEventListener('resize',updateTics,false)
	findTics();
}

function getWindowHeight(){
    if(document.all){
        return document.body.clientHeight;
    }else{
        return window.innerHeight;
    }
}
function getElementHeight(elem){
   return elem.clientHeight
}
function _vt(id){
	if(document.getElementById(id))
		return document.getElementById(id);
	else
		return false;
}

function createRow(lineno, line){
	var tr = document.createElement('tr');
	tr.setAttribute('class','insertedLine');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var td3 = document.createElement('td');
	//var pre1 = document.createElement('pre');
	var pre2 = document.createElement('pre');
	var pre3 = document.createElement('pre');
	//td1.setAttribute('class','line_numbers');
	td2.setAttribute('class','line_numbers');
	pre2.appendChild(document.createTextNode(lineno));
	pre3.appendChild(line.cloneNode(true));
	td2.appendChild(pre2);
	td3.appendChild(pre3);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	return tr;
}