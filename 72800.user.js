// ==UserScript==
// @name           vu_maxepvp
// @namespace      vegzetur
// @description    hatize
// @include        http://*.vegzetur.hu/*
// @exclude        http://forum.vegzetur.hu/*
// ==/UserScript==


//======= Állítsd 1-re, ha %-ot szeretnél inkább látni =======

var percent    = 1;        // ÉP, VP mellé: 0 = Maximum, 1 =  %-os kijelzés 
var tp_percent = 0;        // TP mellé: 0 = Hiányzó TP a szintlépéshez, 1 = %-os kijelzés
var buttontyp  = 0;        // beállítások, kilépés gomb: 0 = normál háttér, 1 = kiemelve pirossal
var buttonexit = 0;        // kilépés gomb: 0 = Egyéb menüpont alatt, 1 = legfelül
var systime    = 1;        // Rendszeridő: 1 = megjelenítése a karakternév felett
var tpcolor    = 0;		   // TP szín: 0 = mindig sárga, 1 = az oldal korábbi megjelenítése szerinti szín 
						   //									(szürke, sárga, piros a % függvényében)

//======= Kód ======

settings = {
	version: "0.51",
	newtxt: "ÉP/VP/TP kijelző új verzió: ",
	down: "Innen letöltheted: "
}

location.assign('javascript:window.scrollTo(0,(typeof window.pageYOffset != "undefined" ?  window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0)-190);void(0);');

function getByClass(tag, classname){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].className==classname) items.push(elems[i]);
	}
	return items;
}

function getByRoot(doc, tag){
	return doc.getElementsByTagName(tag);
}

function getByTitle(tag, titlename){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].title==titlename) items.push(elems[i]);
	}
	return items;
}
function getFromCharacter(what)
{
	var nx = getFirstByText('td',what).nextSibling;
	var str = getFirstByClassRoot(nx,'span','csik_szoveg').innerHTML;
	str = str.removeTrash();
	return str.split('/');
}

function getByText(tag, name){
	items = [];
	elems = document.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].innerHTML==name) items.push(elems[i]);
	}
	return items;
}

function getFirstByText(tag, classname){
	items = getByText(tag, classname);
	return items[0];
}


function getFirstByTextRoot(doc, tag, name){
	items = getByTextRoot(doc, tag, name);
	return items[0];
}

function getByTextRoot(doc, tag, name){
	items = [];
	elems = doc.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].innerHTML.indexOf(name)!=-1) items.push(elems[i]);
	}
	return items;
}

function getByClassRoot(doc, tag, classname){
	items = [];
	elems = doc.getElementsByTagName(tag);
	for (i=0; i<elems.length; i++){
		if (elems[i].className==classname) items.push(elems[i]);
	}
	return items;
}

function getFirstByClassRoot(doc, tag, classname){
	items = getByClassRoot(doc, tag, classname);
	return items[0];
}

function getFirstTextByClass(tag, classname){
	items = getByClass(tag, classname);
	return items[0].innerHTML;
}

function getFirstByClass(tag, classname){
	items = getByClassRoot(document, tag, classname);
	return items[0];
}

function strcut(from, to, str){
	start = str.indexOf(from);
	if (to=='') {
		end = str.length;
	} else {
		end = str.indexOf(to);
	}
	return str.substring(start+from.length, end);
}

function id(elem){
	return document.getElementById(elem);
}

if (String.prototype.removeTrash==null) String.prototype.removeTrash=function(n)
{
	return this.replace(/[^0-9\/]/g,'');
}

function formatNum(nStr)
{
	nStr += '';
	x = nStr.split(',');
	x1 = x[0];
	x2 = x.length > 1 ? ',' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}

if (String.prototype.left==null) String.prototype.left=function(n)
{
   if (n<0)
    return this.substring(0, this.length+n);
   else
    return this.substring(0, n);
}

document.getElementById('header').style.display="none";
document.getElementById('harmonet_linksor').style.display="none";

var username;
try {

username = id('welcome').getElementsByTagName('strong')[0].innerHTML;
var whref = window.location.href;
var vilag = strcut('//','.',whref)+'.vegzetur';
var maxepv = 'vu_maxep-'+vilag+'-'+username;
var maxvpv = 'vu_maxvp-'+vilag+'-'+username;
var maxtpv = 'vu_maxtp-'+vilag+'-'+username;
var maxep = GM_getValue(maxepv,0);
var maxvp = GM_getValue(maxvpv,0);
var maxtp = GM_getValue(maxtpv,0);


kem = getByClass('div','kemkedes');
if (kem.length==0)
try {
maxep = getFromCharacter('Életpont:')[1];
GM_setValue(maxepv,maxep);
maxvp = getFromCharacter('Varázspont:')[1];
GM_setValue(maxvpv,maxvp);
maxtp = getFromCharacter('Tapasztalat:')[1];
GM_setValue(maxtpv,maxtp);
}
catch (Exception) {}

var cell = id('karakter_ep');
var ep = cell.innerHTML.removeTrash();
var vp = id('karakter_vp').innerHTML.removeTrash();
var tpspan = id('karakter_tp');
var tpcol = window.getComputedStyle(tpspan,null).color;
var tp = tpspan.innerHTML.removeTrash();
cell = cell.parentNode.parentNode;

if (parseInt(ep)>parseInt(maxep)) { maxep=ep; GM_setValue(maxepv,maxep); }
if (parseInt(vp)>parseInt(maxvp)) { maxvp=vp; GM_setValue(maxvpv,maxvp); }

var charnum = getByTitle('span','Karakterszám')[0].innerHTML.removeTrash();
var links = getByRoot(cell,'a');
var pic = links[0];
var pic2 = links[1];
var set = links[2];
var log = links[links.length-2];
var img = getByRoot(cell,'img')[0];
//var le = cell.innerHTML.match(/.* ([0-9\.]*) LE.*/)[1].removeTrash();
var le = id('karakter_le').innerHTML.removeTrash();
var pmsg;
pmsg = getFirstByClass('div','welcome_uzenetek');
if (pmsg)
{
	var an = getFirstByTextRoot(pmsg,'a','zenet');
	if (an) {
		var dbm = an.innerHTML.match(/([0-9]*).*/)[1];
		an.removeChild(an.firstChild);
		if (parseInt(dbm)>99) dbm = 'sok';
		an.appendChild(document.createTextNode('Üzenet ('+dbm+')'));
	}
	an = getFirstByTextRoot(pmsg,'a','vadászat');
	if (an) {
		an.removeChild(an.firstChild);
		an.appendChild(document.createTextNode('Vadászol!'));
	}
     try {
	an = getFirstByClass('div','viadal_figy').firstChild;
	if (an) {

		an.removeChild(an.firstChild);
		an.appendChild(document.createTextNode('Nevezz a viadalra!'));
		an.style.setProperty('color','red',null);
		pmsg.appendChild(an);
	}
      } catch (Exception) {}
}
else
try {
	var 	an = getFirstByClass('div','viadal_figy').firstChild;
	if (an) {
		pmsg = document.createElement('div'); pmsg.className='welcome_uzenetek';
		an.removeChild(an.firstChild);
		an.appendChild(document.createTextNode('Nevezz a viadalra!'));
		an.style.setProperty('color','red',null);
		pmsg.appendChild(an);
	}
} catch (Exception) { }


while ( cell.childNodes.length >= 1 )
{
       cell.removeChild( cell.firstChild );       
} 


{
var charbase = document.createElement('div');
charbase.setAttribute('id','characterbase');
charbase.appendChild(document.createTextNode('('+charnum+') '));
var str = document.createElement('strong');
str.appendChild(document.createTextNode(username));
charbase.appendChild(str);
charbase.appendChild(document.createElement('br'));
charbase.appendChild(pic);
charbase.appendChild(pic2);

str = document.createElement('table');
str.align='center';
str.style.setProperty('width','95%',null);
var r1,r2,r3,c11,c12,c21,c22,c31,c32,c31,c32,c0;
r0 = str.insertRow(0);
r1 = str.insertRow(1);
r2 = str.insertRow(2);
r3 = str.insertRow(3);
c0 = r0.insertCell(0);
c11 = r1.insertCell(0);
c12 = r1.insertCell(1);
c13 = r1.insertCell(2);
c21 = r2.insertCell(0);
c22 = r2.insertCell(1);
c23 = r2.insertCell(2);
c31 = r3.insertCell(0);
c32 = r3.insertCell(1);
c32.setAttribute('id','tapasztalatipont');
c33 = r3.insertCell(2);


r1.style.color='#FF4444';
r2.style.color='#22FF22';
if (tpcolor) r3.style.color = tpcol;
else r3.style.color='#FFFF22';


c11.appendChild(document.createTextNode('ÉP:'));
c21.appendChild(document.createTextNode('VP:'));


c12.appendChild(document.createTextNode(formatNum(ep)));
c22.appendChild(document.createTextNode(formatNum(vp)));
c12.style.setProperty('text-align','right',null);
c22.style.setProperty('text-align','right',null);

if (!percent)
{
	c13.appendChild(document.createTextNode('('+formatNum(maxep)+')'));
	c23.appendChild(document.createTextNode('('+formatNum(maxvp)+')'));
}
else
{
	c13.appendChild(document.createTextNode('('+(Math.floor(ep/maxep*1000)/10)+'%)'));
	c23.appendChild(document.createTextNode('('+(Math.floor(vp/maxvp*1000)/10)+'%)'));
}

c13.style.setProperty('text-align','right',null);
c23.style.setProperty('text-align','right',null);

if (tp)
{
c31.appendChild(document.createTextNode('TP:'));
c32.appendChild(document.createTextNode(formatNum(tp)));
if (tp_percent)
	c33.appendChild(document.createTextNode('('+Math.floor(tp/maxtp*100)+'%)'));
else
	c33.appendChild(document.createTextNode('('+formatNum(tp-maxtp)+')'));
c32.style.setProperty('text-align','right',null);
c33.style.setProperty('text-align','right',null);
}

var so = document.createElement('strong');
so.appendChild(document.createTextNode(formatNum(le)+' LE'));

c0.colSpan=3;
c0.appendChild(so);
c0.style.setProperty('text-align','center',null);

charbase.appendChild(str);


cell.appendChild(charbase);
if (pmsg)
{
   var pmsgbase =  pmsg.cloneNode(true);
   msglink = pmsgbase.getElementsByTagName('a');
   while ( pmsg.childNodes.length >= 1 ) pmsg.removeChild( pmsg.firstChild );
   for (;0<msglink.length;)
   {
	var newpmsg = pmsg.cloneNode(true);
	newpmsg.appendChild(msglink[0]);
	cell.appendChild(newpmsg);
   }
}
}

obj = getByClass('div','fomenu_sor2')[1].nextSibling;
objfirst = obj.firstChild;
var li = document.createElement('li');
li.appendChild(set);
if (buttontyp) li.className='uj';
obj.insertBefore(li,objfirst);
li = document.createElement('li');
li.appendChild(log);
if (buttontyp) li.className='uj';
if (buttonexit)
{
  var exitbase = document.createElement('div');
  exitbase.style.setProperty('position','relative',null);
  exitbase.style.setProperty('top','-5px',null);
  var eobj = document.createElement('ul');
  eobj.setAttribute('id','fomenu');
  exitbase.appendChild(eobj);
  eobj.appendChild(li);
  charbase.insertBefore( exitbase,charbase.firstChild );
}
else
{
obj.insertBefore(li,objfirst);
}

function rendszerido_copy(uj,regi)
  {
	uj.innerHTML = 'Rendszeridő: '+regi.innerHTML;
//	document.getElementById('systemtimeextend').innerHTML = 'Rendszeridő: '+document.getElementById('rendszerido').innerHTML;
  }

var nsys,osys;

if (systime)
{
  var systemtime = document.getElementById('rendszerido'); // .cloneNode(true);
  systemtime.style.setProperty('position','relative',null);
  systemtime.style.setProperty('top','-10px',null);
  var systext = document.createElement('span');
  systext.style.setProperty('position','relative',null);
  systext.style.setProperty('top','-10px',null);
  systext.appendChild(document.createTextNode('Rendszeridő: '));
//  systemtime.setAttribute('id','systemtimeextend');
  charbase.insertBefore( document.createElement('br'),charbase.firstChild );
  charbase.insertBefore( systemtime,charbase.firstChild );
  charbase.insertBefore( systext,charbase.firstChild );
//  nsys = document.getElementById('systemtimeextend');
// osys = document.getElementById('rendszerido');
//  rendszerido_copy(nsys,osys);
//  setInterval(rendszerido_copy,1000,nsys,osys);
}

scriptbox = document.createElement('div');
scriptbox.setAttribute('id', 'scriptbox');
scriptbox.setAttribute('class', 'message_center');
scriptbox.setAttribute('style', 'margin: 5px;');
scriptbox.style.setProperty('display','none',null);

document.getElementById('jobb_in').insertBefore(scriptbox,document.getElementById('jobb_in').firstChild);


function gmpost(url, callback){
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		data: encodeURI(''),
		onload: callback
	});
}

var chktime;

adate = new Date();
chktime = ''+adate.getFullYear()+(adate.getMonth()+1)+adate.getDate()+Math.floor(adate.getHours()/3);

if (GM_getValue('vu_chverepvp',0)!=chktime)
{
  gmpost('http://userscripts.org/scripts/review/72800', function(data){
	check = data.responseText.match(/version: &quot(.*)&quot;,/)[1].replace(';','v');
	aver = parseFloat('1'+settings.version)*100;
        nver = parseFloat(check.replace('v','1'))*100;
	GM_setValue('vu_epvpnetver',check);
	if (aver<nver)
	{	scriptbox.innerHTML = settings.newtxt+check+'<br/>'+settings.down+
		'<a href="http://userscripts.org/scripts/show/72800">http://userscripts.org/scripts/show/72800</a>';
		scriptbox.style.setProperty('display','',null);
	}
  });
  GM_setValue('vu_chverepvp',chktime);
}
else
{
	aver = parseFloat('1'+settings.version)*100;
	check = GM_getValue('vu_epvpnetver',0);
        nver = parseFloat(check.replace('v','1'))*100;
	if (aver<nver)
	{	scriptbox.innerHTML = settings.newtxt+check+'<br/>'+settings.down+
		'<a href="http://userscripts.org/scripts/show/72800">http://userscripts.org/scripts/show/72800</a>';
		scriptbox.style.setProperty('display','',null);
	}
}

} catch (Exception) { }

