// ==UserScript==
// @name 		unx
// @namespace 	LiaR
// @version 	4.0.0
// @description	un
// @license 	a
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*
// @exclude 	*.css
// @exclude 	*.js
// ==/UserScript==


var timer=new Object();
var ab=new Object();
var bb=new Object();
var cb=db();
var eb=0;
var auto_reload=1;
var fb=new Object();
var	is_opera=window.opera!==undefined;
var	is_ie=document.all!==undefined&&window.opera===undefined;
var is_ie6p=document.compatMode!==undefined&&document.all!==undefined&&window.opera===undefined;
var is_ie7=document.documentElement!==undefined&&document.documentElement.style.maxHeight!==undefined;
var is_ie6=is_ie6p&&!is_ie7;
var is_ff2p=window.Iterator!==undefined;
var is_ff3p=document.getElementsByClassName!==undefined;
var is_ff2=is_ff2p&&!is_ff3p
function gb(){return hb('height');}
function ib(){return hb('width');}
function hb(jb){
	var kb=0,lb=0;
	if(typeof(window.innerWidth)=='number'){kb=window.innerWidth;lb=window.innerHeight;}
	else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){
		kb=document.documentElement.clientWidth;lb=document.documentElement.clientHeight;
		}
	else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){
		kb=document.body.clientWidth;lb=document.body.clientHeight;
		}
	if(jb=='height')return lb;
	if(jb=='width')return kb;}
	var gmwds=false;
	function start(){
		mb("l1");mb("l2");mb("l3");mb("l4");initCounter();
		if(typeof init_local=='function'){init_local();}
		if(quest.number===null){qst_handle();}
		if(gmwds){gmwd();}
}
function nb(){return new Date().getTime();}
function db(){return Math.round(nb()/1000);}
function ob(pb){p=pb.innerHTML.split(":");qb=p[0]*3600+p[1]*60+p[2]*1;return qb;}
function rb(s,sb){
	var tb,ub,vb;
	if(s>-2){
		tb=Math.floor(s/3600);ub=Math.floor(s/60)%60;vb=s%60;t=tb+":";
	if(ub<10){t+="0";}
	t+=ub+":";
	if(vb<10){t+="0";}
	t+=vb;}
	else{
	t=sb?'0:00:0?':"<a href=\"#\" onClick=\"return Popup(2,5);\"><span class=\"c0 t\">0:00:0</span>?</a>";}
return t;}
function initCounter(){
	for(var i=1;;i++){pb=document.getElementById("tp"+i);
		if(pb!=null){ab[i]=new Object();ab[i].node=pb;ab[i].counter_time=ob(pb);}
		else{break;}
	}
	for(i=1;;i++){pb=document.getElementById("timer"+i);
		if(pb!=null){bb[i]=new Object();bb[i].node=pb;bb[i].counter_time=ob(pb);}
		else{break;}
	}
executeCounter();
}
function executeCounter(){
	for(var i in ab){wb=db()-cb;xb=rb(ab[i].counter_time+wb);ab[i].node.innerHTML=xb;}
		for(i in bb){wb=db()-cb;yb=bb[i].counter_time-wb
			if(eb==0&&yb<1){
				eb=1;
				if(auto_reload==1){setTimeout("document.location.reload()",1000);}
			else if(auto_reload==0){setTimeout("mreload()",1000);}
	}
else{}
xb=rb(yb);bb[i].node.innerHTML=xb;}
if(eb==0){window.setTimeout("executeCounter()",1000);}
}
function mb(zb){
	pb=document.getElementById(zb);
	if(pb!=null){fb[zb]=new Object();
	var $b=pb.innerHTML.match(/(\d+)\/(\d+)/);element=$b[0].split("/");_b=parseInt(element[0]);ac=parseInt(element[1]);bc=pb.title;
	if(bc!=0){cc=nb();timer[zb]=new Object();timer[zb].start=cc;timer[zb].production=bc;timer[zb].start_res=_b;timer[zb].max_res=ac;timer[zb].ms=3600000/bc;dc=100;
	if(timer[zb].ms<dc){timer[zb].ms=dc;}
timer[zb].node=pb;executeTimer(zb);}
else
{timer[zb]=new Object();fb[zb].value=_b;}
}
}
function executeTimer(zb){wb=nb()-timer[zb].start;
if(wb>=0){ec=Math.round(timer[zb].start_res+wb*(timer[zb].production/60000));
if(ec>=timer[zb].max_res){ec=timer[zb].max_res;}
else
{window.setTimeout("executeTimer('"+zb+"')",timer[zb].ms);}
fb[zb].value=ec;timer[zb].node.innerHTML=ec+'/'+timer[zb].max_res;}
}
var fc=new Array(0,0,0,0,0);
function add_res(gc){hc=fb['l'+(5-gc)].value;ic=haendler*carry;fc[gc]=jc(fc[gc],hc,ic,carry);document.getElementById('r'+gc).value=fc[gc];}
function upd_res(gc,kc){hc=fb['l'+(5-gc)].value;ic=haendler*carry;
if(kc){lc=hc;}
else
{lc=parseInt(document.getElementById('r'+gc).value);}
if(isNaN(lc)){lc=0;}
fc[gc]=jc(parseInt(lc),hc,ic,0);document.getElementById('r'+gc).value=fc[gc];}
function jc(mc,nc,oc,pc){
	qc=mc+pc;
	if(qc>nc){qc=nc;}
	if(qc>oc){qc=oc;}
	if(qc==0){qc='';}
	return qc;
}
function rc(n,d){
	var p,i,x;if(!d)d=document;
	if((p=n.indexOf("?"))>0&&parent.frames.length){d=parent.frames[n.substring(p+1)].document;n=n.substring(0,p);}
	if(!(x=d[n])&&d.all)x=d.all[n];
	for(var i=0;!x&&i<d.forms.length;i++)x=d.forms[i][n];
	for(var i=0;!x&&d.layers&&i<d.layers.length;i++)x=rc(n,d.layers[i].document);return x;}
function btm0(){
	var i,x,a=document.MM_sr;
	for(var i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++)x.src=x.oSrc;}
function btm1(){
	var i,j=0,x,a=btm1.arguments;document.MM_sr=new Array;
	for(var i=0;i<(a.length-2);i+=3)
	if((x=rc(a[i]))!=null){document.MM_sr[j++]=x;
	if(!x.oSrc)x.oSrc=x.src;x.src=a[i+2];}
}
function Popup(i,j){pb=document.getElementById("ce");
if(pb!=null){
	var sc="<div class=\"popup3\"><iframe frameborder=\"0\" id=\"Frame\" src=\"manual.php?s="+i+"&typ="+j+"\" width=\"412\" height=\"440\" border=\"0\"></iframe></div><a href=\"#\" onClick=\"Close(); return false;\"><img src=\"img/x.gif\" border=\"1\" class=\"popup4\" alt=\"Close\"></a>";pb.innerHTML=sc;}
tc();
if(!is_ie6&&!uc)return false;else return true;}
function tc(){
	if(gb()<700||ib()<700){document.getElementById("ce").style.position='absolute';uc=true;}
	else{document.getElementById("ce").style.position='fixed';uc=false;}
}
function Close(){pb=document.getElementById("ce");
if(pb!=null){pb.innerHTML='';}
if(quest.anmstep!==false){quest.anmstep=false;}
}
function Allmsg(){
	for(var x=0;x<document.msg.elements.length;x++){
		var y=document.msg.elements[x];
		if(y.name!='s10')y.checked=document.msg.s10.checked;}
}
function xy(){vc=screen.width+":"+screen.height;document.snd.w.value=vc;}
function my_village(){
	var wc=Math.round(0);
	var xc;
	var e=document.snd.dname.value;
	for(var i=0;i<dorfnamen.length;i++){
		if(dorfnamen[i].indexOf(e)>-1){wc++;xc=dorfnamen[i];}
}
if(wc==1){document.snd.dname.value=xc;}
}
function yc(qc){
	var zc='';
	var $c='img/un/r';
	var _c='';
	for(var i in qc){_c+='<img src="'+$c+'/'+(1*i+1)+'.gif" style="width:18px;height:12px;" />'+qc[i]+'&nbsp;';}
return _c;}
var ad=document.getElementById?1:0;
var bd=document.all?1:0;
var cd=(navigator.userAgent.indexOf("Mac")>-1)?1:0;
var dd=(bd&&(!cd)&&(typeof(window.offscreenBuffering)!='undefined'))?1:0;
var ed=dd;
var fd=dd&&(window.navigator.userAgent.indexOf("SV1")!=-1);
function changeOpacity(gd,opacity){
	if(dd){gd.style.filter='progid:DXImageTransform.Microsoft.Alpha(opacity='+(opacity*100)+')';}
	else if(ad){gd.style.MozOpacity=opacity;}
}
function hd(url,id,jd,kd){
	if(jd===undefined){jd='GET';}
var ld;
if(window.XMLHttpRequest){ld=new XMLHttpRequest();}
else if(window.ActiveXObject){try{ld=new ActiveXObject("Msxml2.XMLHTTP");}
catch(e){try{ld=new ActiveXObject("Microsoft.XMLHTTP");}
catch(e){}
}
}
else{throw'Can not create XMLHTTP-instance';}
ld.onreadystatechange=function(){if(ld.readyState==4){if(ld.status==200){var md=ld.getResponseHeader('Content-Type');md=md.substr(0,md.indexOf(';'));
switch(md){
	case'application/json':id((ld.responseText==''?null:eval('('+ld.responseText+')')));
	break;
	case'text/plain':case'text/html':id(ld.responseText);
	break;
	default:throw'Illegal content type';}
}
else{throw'An error has occurred during request';}
}
};
ld.open(jd,url,true);
if(jd=='POST'){
	ld.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
	var nd=od(kd);}
else{var nd=null;}
ld.send(nd);}
function od(pd){
	var qd='';
	var rd=true;
	for(var sd in pd){qd+=(rd?'':'&')+sd+'='+window.encodeURI(pd[sd]);
	if(rd){rd=false;}
}
return qd;}
function mreload(){
	param='reload=auto';
	url=window.location.href;
	if(url.indexOf(param)==-1){
		if(url.indexOf('?')==-1){url+='?'+param;}
else
{url+='&'+param;}
}
document.location.href=url;}
var td={'index':0,'dir':0,'size':null,'fields':[],'cindex':0,'usealternate':false};
var m_c=td;
var ud;
var vd;
var wd;
var xd;
var yd;
var zd;
var $d;
var _d;
var ae;
var be=false;
var ce;
var de;
var ee;
var fe=[];fe[38]=1;fe[39]=2;fe[40]=3;fe[37]=4;
var ge={};
var he;
var ie;
function map_init(){
	ud=false;
	vd=false;
	wd=false;
	xd=false;
	zd=0;
	yd=0;
	he=je('karte2');
	ke(['i','a','t']);
	if(null==m_c.az){
		throw'm_c.az muss seitenspezifisch initialisiert werden.';}
for(var p in m_c.az){document.getElementById('ma_'+p).onclick=le;}
var me=['mcx','mcy','x','y','map_infobox'];
for(var i=0;i<me.length;i++){ge[me[i]]=document.getElementById(me[i]);}
me=['mcx','mcy'];
for(var i=0;i<me.length;i++){ge[me[i]].onfocus=function(){xd=true;};ge[me[i]].onblur=function(){xd=false;};}
ge.ibox_cells=[];ge.ibox_cells[0]=ge.map_infobox.firstChild.firstChild.lastChild;
for(var i=1;i<=3;i++){ge.ibox_cells[i]=ge.map_infobox.firstChild.nextSibling.childNodes[i-1].lastChild}
document.onkeyup=ne;document.onkeydown=oe;document.onkeypress=pe;document.map_coords.onsubmit=qe;ge.mx=[];ge.my=[];
for(var i=0;i<mdim.x;i++){for(var j=0;j<mdim.y;j++){area=re(i,j,'a');area.onmouseover=se;area.onmouseout=te;if(he){area.onclick=ue;}
ve(m_c.ad[i][j],area);}
ge.mx[i]=document.getElementById('mx'+i);ge.my[i]=document.getElementById('my'+i);}
var we=document.getElementById('map_makelarge');if(we){we.onclick=xe;}
if(mdim.x==13){document.getElementById('map_popclose').onclick=ye;}
}
function ue(){opener.location=this.href;return false;}
function ze($e){
	var _e=document.getElementById('map_makelarge');_e.className=$e?'loading':'';}
function af(bf){
	var cf;
	var df;
if(ge.map_infobox!=null){
	if(bf.normal_field){
		var ef=ff(bf.nr*1);cf=[text_k.verlassenes_tal+': '+ef.join('-')];df='empty';}
	else if(bf.free_oasis&&!bf.classic_oasis){cf=[text_k.verlassenes_tal];df='oasis_empty';}
	else if(bf.occupied_oasis&&!bf.classic_oasis){cf=[text_k.besetztes_tal,bf.name,bf.ew,bf.ally];df='oasis';}
	else if(bf.village){cf=[bf.dname,bf.name,bf.ew,bf.ally];df='village';}
else{cf=[text_k.details];df='';}
}
for(var i=0;i<4;i++){ge.ibox_cells[i].innerHTML=(cf[i]===undefined||cf[i]==='')?'-':cf[i];}
ge.map_infobox.className=df;}
function gf(hf){ge.x.firstChild.nodeValue=hf.x;ge.y.firstChild.nodeValue=hf.y;}
function jf(hf){ge.mcx.value=hf.x;ge.mcy.value=hf.y;}
function kf(x,y){return(400+x)+(400-y)*801+1;}
function xe(){
	if(mmode){_d=window.open(this.href,"map","top=100,left=25,width=1007,height=585");_d.focus();}
	else{ze(true);hd('ajax.php?f=kp&z='+kf(m_c.z.x,m_c.z.y),function(lf){ze(false);ce=document.getElementsByTagName('body')[0];de=document.getElementsByTagName('html')[0];ce.parentNode.removeChild(ce);ee=document.createElement('body');ee.innerHTML=lf.lm;ee.style.backgroundColor='#ffffff';de.appendChild(ee);m_c=[];for(var sd in lf.dat.m_c){m_c[sd]=lf.dat.m_c[sd];}
m_c.fields=[];mdim=lf.dat.mdim;mmode=lf.dat.mmode;map_init();}
);}
return false;}
function ye(){
	if(he){window.close();}
	else{mdim={'x':7,'y':7,'rad':3};
var mf=[];
for(var i=0;i<mdim.x;i++){mf[i]=[];
for(var j=0;j<mdim.y;j++){mf[i][j]=re(i+3,j+3,'a').details;
}
}
de.removeChild(ee);de.appendChild(ce);map_init();
var nf;
var area;
for(var i=0;i<mdim.x;i++){
	for(var j=0;j<mdim.y;j++){area=re(i,j,'a');nf=re(i,j,'i');area.details=mf[i][j];area.details.fresh={};
	nf.className=mf[i][j].img;of(area,nf);}
}
gf(m_c.z);jf(m_c.z);}
return false;}
function le(){
	var pf=1*this.id.substring(4,5);
	var qf=1*(this.id.substring(5,7)=='p7'?mdim.x:1);rf(pf,qf);
return false;}
function sf(z){
	var x=z.x-mdim.rad;
	var y=z.y-mdim.rad;
	var tf=z.x+mdim.rad;
	var uf=z.y+mdim.rad;
	return{'x':x,'y':y,'xx':tf,'yy':uf};
	}
function vf(pf,qf,wf){
	if(wf==null){wf=0;}
if(m_c.size==null){throw'Globale Variable m_c.size muss auf den Wert von $travian[map_prefetch_rows]) gesetzt werden.';}
var xf,yf;
if(null===qf||1===qf){yf=m_c.size-1;}
else if(mdim.x==qf){xf=mdim.x;yf=-(mdim.x-1);}
else{throw'Parameter steps muss 1 oder Breite der Karte in Feldern sein.';}
var x,y,tf,uf,z;
var z=m_c.z;
switch(pf){
	case 1:x=z.x+mdim.rad;y=z.y+mdim.rad+wf;tf=z.x-mdim.rad;uf=y+yf;break;
	case 2:x=z.x+mdim.rad+wf;y=z.y-mdim.rad;tf=x+yf;uf=z.y+mdim.rad;break;
	case 3:x=z.x+mdim.rad;y=z.y-mdim.rad-wf;tf=z.x-mdim.rad;uf=y-yf;break;
	case 4:x=z.x-mdim.rad-wf;y=z.y-mdim.rad;tf=x-yf;uf=z.y+mdim.rad;break;}
return{'x':x,'y':y,'xx':tf,'yy':uf}
;}
function zf($f){if($f>400){$f-=801;}
if($f<-400){$f+=801;}
return $f;}
function _f($f){if($f>400){$f=400;}
if($f<-400){$f=-400;}
return $f;}
function ag(pf,qf){
	var z={};z.x=m_c.z.x*1;z.y=m_c.z.y*1;
switch(pf){
	case 1:z.y+=qf;break;
	case 2:z.x+=qf;break;
	case 3:z.y-=qf;break;
	case 4:z.x-=qf;break;
	}
m_c.z.x=zf(z.x);m_c.z.y=zf(z.y);}
function bg(cg){return'ajax.php?f=k7&x='+cg.x+'&y='+cg.y+'&xx='+cg.xx+'&yy='+cg.yy;}
function rf(pf,qf,dg){
	var cg,eg;
	if(ud){return false;}
	if(fg()){
		if(vd){return false;}
ud=true;gg();m_c.usealternate=false;m_c.cindex=0;
if(dg!==undefined){m_c.z.x=_f(dg.x);m_c.z.y=_f(dg.y);cg=sf(m_c.z);}
else{ag(pf,qf);cg=vf(pf,qf);}
hg=bg(cg);hd(hg,ig);}
else{
	if(jg()){if(vd){return false;}
vd=true;ag(pf,qf);cg=vf(pf,qf,2);hg=bg(cg);hd(hg,ig);}
else if(kg()){ag(pf,qf);lg();gg();}
else{ag(pf,qf);}
mg(pf,qf);}
function ig(ng){var og;if(jg()){og=pg(m_c.cindex);m_c.usealternate=false;vd=false;}
else{og=m_c.cindex;}
m_c.fields[og]=ng;if(fg()){if(dg!==undefined){mg(0,0,m_c.z);qg('x');qg('y');}
else{mg(pf,qf);qg(pf);}
ud=false;}
}
function jg(){return m_c.usealternate;}
function fg(){return(pf!=m_c.dir||qf==mdim.x||(qf==1&&qf!=m_c.steps)||dg!==undefined);}
function kg(){return(m_c.index==m_c.size);}
}
function rg(pf,qf){m_c.dir=pf;m_c.steps=qf;}
function gg(){m_c.index=0;}
function sg(){m_c.index++;if(m_c.index==m_c.size-2){m_c.usealternate=true;}
}
function lg(){m_c.cindex=pg(m_c.cindex);}
function mg(pf,qf,dg){var tg=document.getElementById('map_content');var ug=tg.parentNode;if(1==qf){vg(pf);wg(m_c.fields[m_c.cindex],pf,qf);qg(pf);sg();}
else if(mdim.x==qf||dg!==undefined){xg(m_c.fields[m_c.cindex]);}
if(yd==0){jf(m_c.z);}
gf(m_c.z);rg(pf,qf);}
function pg(og){return(og==0?1:0);}
function xg(ng){for(var i=0;i<mdim.x;i++){for(var j=0;j<mdim.y;j++){yg(i,j,ng[i][j]);}
}
}
function zg($g,_g){_g.details.href=$g;}
function yg(ah,bh,bf){
	var nf=re(ah,bh,'i');
	var area=re(ah,bh,'a');ve(bf,area);nf.className=area.details.img;of(area,nf);}
function of(area,nf){
	if(area.details.atyp){
		if(!nf.firstChild){nf.appendChild(document.createElement('span'));}
	nf.firstChild.className='m'+area.details.atyp;}
	else{
		if(nf.firstChild){nf.removeChild(nf.firstChild);}
}
}
function ve(bf,area){area.details={}
;var ch=['x','y','nr','typ','querystring','img','dname','name','ew','ally','atyp','atime'];
for(var i=0;i<bf.length;i++){area.details[ch[i]]=bf[i];}
area.details.normal_field=area.details.name===undefined&&area.details.typ==0;area.details.free_oasis=area.details.name===undefined&&area.details.typ!=0;area.details.occupied_oasis=area.details.name!==undefined&&area.details.typ!=0;area.details.village=area.details.name!==undefined&&area.details.typ==0;area.details.fresh={}
;area.details.classic_oasis=area.details.querystring==='';}
function ff(dh){
	switch(dh){
		case 1:return[3,3,3,9];
		case 2:return[3,4,5,6];
		case 3:return[4,4,4,6];
		case 4:return[4,5,3,6];
		case 5:return[5,3,4,6];
		case 6:return[1,1,1,15];
		case 7:return[4,4,3,7];
		case 8:return[3,4,4,7];
		case 9:return[4,3,4,7];
		case 10:return[3,5,4,6];
		case 11:return[4,3,5,6];
		case 12:return[5,4,3,6];
		default:return false;
		}
}
function qe(){
	var x=parseInt(this.xp.value);
	var y=parseInt(this.yp.value);
	if(!isNaN(x)&&!isNaN(y)){rf(0,0,{'x':x,'y':y}
);}
return false;}
function pe(e){
	if(xd){return true;}
var sd=(window.event)?event.keyCode:e.keyCode;
var pf=eh(sd);
if(pf!=0){return false;}
}
function se(){be=true;gf(this.details);af(this.details);fh(this);ie=this;}
function fh(area){if(!area.details.fresh.href){if(area.details.classic_oasis){area.removeAttribute('href');area.style.cursor='default';}
else{area.href='karte.php?'+area.details.querystring;area.style.cursor='pointer';}
area.details.fresh.href=true;}
if(!area.details.fresh.title){area.details.fresh.title=gh(area);}
}
function gh(area){if(area.details.normal_field){area.title='';}
else if(area.details.free_oasis&&!area.details.classic_oasis){area.title=text_k.verlassenes_tal;}
else if(area.details.occupied_oasis&&!area.details.classic_oasis){area.title=text_k.besetztes_tal;}
else if(area.details.village){
	if(area.details.atime!==undefined){area.title=area.details.dname+' '+rb(area.details.atime-Math.floor(new Date().getTime()/1000),true);return false;}
else{area.title=area.details.dname;}
}
else{area.title='';}
return true;}
function te(){
	var area=this;window.setTimeout(function(){if(ie==area){be=false;gf(m_c.z);hh();}
}
,50);}
function wg(ng,pf){var ih,jh;for(var i=0;i<mdim.x;i++){switch(pf){case 1:ih=i;jh=mdim.x-1;bf=ng[i][m_c.index];break;case 2:ih=mdim.x-1;jh=i;bf=ng[m_c.index][i];break;case 3:ih=i;jh=0;bf=ng[i][m_c.size-m_c.index-1];break;case 4:ih=0;jh=i;bf=ng[m_c.size-m_c.index-1][i];break;}
yg(ih,jh,bf);}
}
function kh(x,y,tf,uf){
	var nf=re(x,y,'i');
	var lh=re(tf,uf,'i');mh(nf,lh);
	if(nf.firstChild){if(!lh.firstChild){lh.appendChild(document.createElement('span'))}
lh.firstChild.className=nf.firstChild.className;}
	else{if(lh.firstChild){lh.removeChild(lh.firstChild);}
}
nh(x,y,tf,uf);}
function nh(x,y,tf,uf){bf=re(x,y,'a');oh=re(tf,uf,'a');oh.details=bf.details;oh.details.fresh={}
;}
function mh(nf,lh){lh.className=nf.className;}
function vg(pf){
	for(var i=0;i<mdim.x;i++){
		for(var j=1;j<mdim.x;j++){
			switch(pf){
				case 1:kh(i,j,i,j-1);break;
				case 2:kh(j,i,j-1,i);break;
				case 3:kh(i,mdim.x-1-j,i,mdim.x-j);break;
				case 4:kh(mdim.x-1-j,i,mdim.x-j,i);break;
				}
}
}
}
function eh(sd){
	if(fe[sd]!==undefined){return fe[sd];}
return 0;}
function ne(e){
	if(xd){return true;}
var sd=((window.event)?event.keyCode:e.keyCode);
if(16==sd){wd=false;}
var pf=eh(sd);
if(pf==yd&&yd!=0){yd=0;jf(m_c.z);ph();}
}
function m_r(pf,qh){
	if(yd==pf&&qh==zd){window.setTimeout(function(){m_r(pf,qh)}
,100);rf(pf,1);}
}
function qg(rh){
	var jb;
	switch(rh){
		case 2:		case 4:		case'x':jb='x';break;
		case 1:		case 3:		case'y':jb='y';break;
		}
var sh='m'+jb;
var th;
var uh;
var vh=0;
var wh=0;
for(var i=0;i<mdim.x;i++){
	if(jb=='x'){vh=i;}
else{wh=i;}
if(ge[sh][i]){th=re(vh,wh,'a').details[jb];ge[sh][i].firstChild.nodeValue=th;}
}
}
function oe(e){if(xd){return true;}
var sd=(window.event)?event.keyCode:e.keyCode;
if(sd==16){wd=true;}
var pf=eh(sd);
if(pf!=0&&pf!=yd){
	var qf=(wd?mdim.x:1);rf(pf,qf);
	var qh=new Date().getTime();
	if(qf==1){window.setTimeout(function(){m_r(pf,qh)}
,500);}
zd=qh;yd=pf;ph();}
if(pf!=0){return false;}
}
function ph(){window.setTimeout(function(){if(be){af(ie.details);}
}
,60);}
var xh={}
;function re(ah,bh,yh){if(xh){return xh[yh][ah][bh];}
}
function ke(zh){
	var yh;for(var i=0;i<zh.length;i++){yh=zh[i];xh[yh]=[];for(var ah=0;ah<mdim.x;ah++){xh[yh][ah]=[];
	for(var bh=0;bh<mdim.y;bh++){xh[yh][ah][bh]=document.getElementById(yh+'_'+ah+'_'+bh);}
}
}
}
function hh(){af({$h:'',name:'',_h:'',ai:'',x:m_c.z.x,y:m_c.z.y}
);}
var quest={'anmstep':false}
;function bi(length,ci){if(length===undefined){length=8;}
if(ci===undefined){ci=0.5;}
var di='0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
var bi='';
for(var i=0;i<length;i++){var ei=Math.floor((Math.random()+ci)*0.5*di.length);bi+=di.substring(ei,ei+1);}
return bi;}
function fi(){
	var gi='ajax.php?f=qst';
	var ci=(Math.abs(quest.number)+1)/(Math.abs(quest.last)+1);
	return gi+'&cr='+bi(4,ci);}
function hi(){
	document.getElementById('ce').innerHTML='';
var step;
if(quest.anmstep===false){step={'step':{}
,'source':{}
,'current':{}
,'target':{'width':448,'height':482,'top':-1}
,'fps':50,'n':10,'i':0,'anm':{}
}
;step.target[quest.rtl?'right':'left']='-502';}
else{step=quest.anmstep;ii(false);}
step.anm=document.getElementById('anm');
for(var ji in step.target){
	step.source[ji]=Number(step.anm.style[ji].substr(0,step.anm.style[ji].length-2));
	step.current[ji]=step.source[ji];step.step[ji]=Math.round((step.target[ji]-step.source[ji])/step.n);}
	step.timeout=1000/step.fps;quest.cstep=step;quest.anmlock=true;window.setTimeout(anm_step,step.timeout);}
function ki(step){
	for(var ji in step.target){
		step.anm.style[ji]=step.current[ji]+'px';}
}
function li(step){
	step.i++;
	if(step.i==2){
		step.anm.style.visibility='visible';}
for(var ji in step.target){
	step.current[ji]+=step.step[ji];}
return step;}
function ii(mi){if(mi===undefined){mi==false;}
var ni=document.getElementById('ce');
if(mi){
	var oi='<div id="popup3" class="popup3"></div><a href="#" onClick="qst_handle()"><img src="img/x.gif" border="1" class="popup4" alt="Close"></a>';ni.innerHTML=oi;pi();qst_wfm();tc();qi(true);}
else{ni.innerHTML='';qi(false);}
}
function qi(vis){
	if(!is_ie6){return;}
var ri=vis?'hidden':'visible';
var si=document.getElementsByTagName('select');
var n=si.length;
for(var i=0;i<n;i++){si[i].style.visibility=ri;}
}
function anm_step(){
	step=li(quest.cstep);ki(step);
	if(step.i<step.n){window.setTimeout('anm_step()',step.timeout);}
else{step.anm.style.visibility='hidden';quest.anmlock=false;quest.cstep=false;
if(quest.anmstep===false){
	step.current=step.target;
	step.target=step.source;
	step.source=step.current;
	ki(step);
	step.i=0;ii(true);
	quest.anmstep=step;}
else{quest.anmstep=false;
if(quest.number>=quest.last||quest.altstep==9){document.getElementById('qge').innerHTML='';}
}
}
}
function ti(){
	var timer=document.getElementById('qst_timer');
	if(timer&&timer.parentNode.style.display!='none'){
		if(!timer.timestamp){timer.timestamp=db()+ob(timer);}
else{var ui=timer.timestamp-db();
if(ui<0){timer.parentNode.style.display='none';document.getElementById('qst_reshere').style.display='block';}
else{timer.innerHTML=rb(ui);}
}
window.setTimeout(ti,1000);}
}
function qst_fhandle(){kd={'val':1}
;hd(fi(),function(lf){}
,'POST',kd
);qst_handle();}
function qst_handle(){
	if(quest.anmlock){return false;}
quest.markup=false;
if(quest.anmstep===false){hd(fi(),function(lf){for(var sd in lf){quest[sd]=lf[sd];}
}
);}
hi();
if(quest.ar){auto_reload=quest.ar;quest.ar=undefined;}
}
function qst_wfm(){
	var vi=document.getElementById('popup3');
	if(!quest.markup||!vi){
		if(!quest.anmlock){window.setTimeout('qst_wfm(true)',50);}
}
else{wi(quest);vi.innerHTML=quest.markup;xi=false;
if(quest.reward.finish&&window.bld){
	var yi=document.getElementById('building_contract');
	if(bld.length<2&&bld[0].gid==1){yi.innerHTML='';xi=0;}
else{
	for(var i in bld){
		if(bld[i].stufe==1&&bld[i].gid==1){yi.getElementsByTagName('table')[0].deleteRow(i);xi=i;break;}
}
}
if(xi!==false){
	var zi=$$('#t3 .rf'+bld[xi].aid)[0];if(zi){zi.removeClass('rf'+bld[xi].stufe);zi.addClass('rf'+bld[xi].stufe+1);}
else{$('f3').appendChild(new Element('img',{'class':('reslevel rf'+bld[xi].aid+' level'+bld[xi].stufe),'src':'img/x.gif'}
));}
}
quest.ar=auto_reload;auto_reload=-1;}
if(quest.reward.plus){var nf=document.getElementById('logo').className='plus';}
quest.markup=false;quest.msg=false;}
}
function qst_weiter(){
	pi();
	hd(fi(),function(lf){document.getElementById('popup3').innerHTML=lf.markup;var $i=document.getElementById('qgei');$i.className=lf.qgsrc;wi(lf);}
);}
function pi(){document.getElementById('popup3').innerHTML='<img src="img/un/misc/xlo.gif" />';}
function qst_enter(hf){if(hf===undefined){hf=false;}
var kd;if(hf){kd={'x':document.getElementById('qst_val_x').value,'y':document.getElementById('qst_val_y').value}
;}
else{kd={'val':document.getElementById('qst_val').value}
;}
pi();hd(fi(),function(lf){for(var sd in lf){quest[sd]=lf[sd];}
}
,'POST',kd
);qst_wfm();}
function qst_enter_coords(){qst_enter(true);}
function wi(_i){
	var $i=document.getElementById('qgei');
	if($i&&_i.qgsrc){$i.className=_i.qgsrc;}
var aj=document.getElementById('n5');
if(aj&&_i.msrc){aj.className=_i.msrc;}
if(_i.cookie){
	var date=new Date();date.setTime(date.getTime()+300000);document.cookie='t3fw=1; expires='+date.toUTCString()+';';}
if(_i.fest&&je('dorf2')){document.getElementById('content').innerHTML+=_i.fest;}
window.setTimeout(ti,30);}
function je(bj){return window.location.href.indexOf(bj+'.php')!=-1;}
function vil_levels_toggle(){
	var cj=$('village2_levels'),dj=$('village2_lswitch');cj.toggleClass('on');dj.toggleClass('on');
	if(cj.hasClass('on')){document.cookie='t3l=1; expires=Wed, 1 Jan 2020 00:00:00 GMT';}
else{document.cookie='t3l=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';}
}
function gmwd(){if(is_ff2&&document.getElementById("gmwi").offsetWidth<50){document.cookie="a3=2; expires=Wed, 1 Jan 2020 00:00:00 GMT";}
else{document.cookie="a3=1; expires=Wed, 1 Jan 2020 00:00:00 GMT";}
}
function gmc(){document.getElementById("gmw").style.display="none";document.cookie="a3=3; expires=Wed, 1 Jan 2020 00:00:00 GMT";}
