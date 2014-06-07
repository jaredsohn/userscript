// ==UserScript==
// @name           The pimps by SzpaQ v1.0
// @namespace      fds
// @include        http://*pimps.*/index.es*
// ==/UserScript==
var divex;
	divex=document.createElement('div');
	divex.style.position='fixed';
	divex.style.top='0';
	divex.style.left='0';
	divex.style.width="100%";
	divex.style.background="white";
	
var wersjaa = '1.1';

var jezyk = BodySeek(document.body.innerHTML, ["background-image: url(images/", "/"]);
var dc=document;
function rand(minimum,maximum){  
   var losowe = minimum+(Math.random()*(maximum-minimum));  
   return Math.round(losowe);  
} 

function wyslijAtak(){
//	unsafeWindow.parent.closeit();
	unsafeWindow.setTicks(2);
	if(document.getElementsByName('attackteam[colt]')[0])document.getElementsByName('attackteam[colt]')[0].value=GM_getValue('colt');
	if(document.getElementsByName('attackteam[automatic]')[0])document.getElementsByName('attackteam[automatic]')[0].value=GM_getValue('automatic');
	if(document.getElementsByName('attackteam[glock_black]')[0])document.getElementsByName('attackteam[glock_black]')[0].value=GM_getValue('glock_black');
	if(document.getElementsByName('attackteam[magnum_silver]')[0])document.getElementsByName('attackteam[magnum_silver]')[0].value=GM_getValue('magnum-silver');
	if(document.getElementsByName('attackteam[deserteagle_silver]')[0])document.getElementsByName('attackteam[deserteagle_silver]')[0].value=GM_getValue('deserteagle_silver');
	if(document.getElementsByName('attackteam[mp_small]')[0])document.getElementsByName('attackteam[mp_small]')[0].value=GM_getValue('mp_small');
	if(document.getElementsByName('attackteam[pumpgun]')[0])document.getElementsByName('attackteam[pumpgun]')[0].value=GM_getValue('pumpgun');
	if(document.getElementsByName('attackteam[m_16]')[0])document.getElementsByName('attackteam[m_16]')[0].value=GM_getValue('m_16');
		/*if(document.getElementsByName('attackteam[colt]')[0])document.getElementsByName('attackteam[colt]')[0].value=GM_getValue('kije');
	if(document.getElementsByName('attackteam[deserteagle_silver]')[0])document.getElementsByName('attackteam[deserteagle_silver]')[0].value=GM_getValue('pmy');*/
	document.getElementsByName('attackType')[0].checked='true';
	//document.getElementsByName('sellDistrict')[0].checked='true';
	frm=document.getElementsByTagName("form");
	frm[frm.length-1].target='iframkaa';
	frm[frm.length-1].action="../index.es?action=internalAttack&xd";
	frm[frm.length-1].submit();
}
function HTTP_Get( _url ) {
  var req;
  do {
    if( window.XMLHttpRequest ) { req = new XMLHttpRequest(); break; }
    if( window.ActiveXObject )  { req = new ActiveXObject("Microsoft.XMLHTTP"); break; }
	return;
  } while( false );
  if( req == null ) return;
  req.open("GET", _url, false);
  req.send(null);
  return req.responseText;
}

function sreplace(f, r, s){
	var ra = r instanceof Array, sa = s instanceof Array, l = (f = [].concat(f)).length, r = [].concat(r), i = (s = [].concat(s)).length;
	while(j = 0, i--)
		while(s[i] = s[i].split(f[j]).join(ra ? r[j] || "" : r[0]), ++j < l);
	return sa ? s : s[0];
}
function implode (glue, pieces) {
    var i = '', retVal='', tGlue='';
    if (arguments.length === 1) {        pieces = glue;
        glue = '';
    }
    if (typeof(pieces) === 'object') {
        if (pieces instanceof Array) {            return pieces.join(glue);
        }
        else {
            for (i in pieces) {
                retVal += tGlue + pieces[i];                tGlue = glue;
            }
            return retVal;
        }
    }    else {
        return pieces;
    }
}
function explode(item,delimiter) {
	tempArray=new Array(1);
	var Count=0;
	var tempString=new String(item);

	while (tempString.indexOf(delimiter)>0) {
		tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
		tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
		Count=Count+1
	}

	tempArray[Count]=tempString;
	return tempArray;
} 
function StrSeek( Str, arr ) {
  var bck =Str;
  for( var i=0; i != arr.length-1; i++ ) {
    bck = bck.split( arr[i] );
	if( bck.length > 1 ) bck =bck[1];
	else return null;
  }
  bck =bck.split( arr[i] );
  return bck.length > 1 ? bck[0] : null;
}
function StrSeeek( Str, arr ) {
  var bck =Str;
  for( var i=0; i != arr.length-1; i++ ) {
    bck = bck.split( arr[i] );
	if( bck.length > 1 ) bck =bck[1];
	else return null;
  }
  bck =bck.split( arr[i] );
  return bck.length > 1 ? bck.length : null;
}
function Policz( gdzie, arr ) { return StrSeeek( gdzie, arr ); }
function BodySeek( gdzie, arr ) { return StrSeek( gdzie, arr ); }
function SID_get() {
	var sid;
	sid =BodySeek( document.body.innerHTML, ["&amp;sid=","&"] );
	if( sid != null ) return sid;
	sid =BodySeek( document.body.innerHTML, ['<input name="sid" value="','"'] );
	if( sid != null ) return sid;
	sid =BodySeek( document.body.innerHTML, ["&amp;sid=","';"] );
	if( sid != null ) return sid;
	sid =BodySeek( window.location.toString(), ["sid=","&"] );
	if( sid != null ) return sid;
	sid =BodySeek( document.body.innerHTML, ["sid=","'"] );
	if( sid != null ) return sid;
	return null;
}
function TYP_get() {
  var typ;
  typ =BodySeek( document.getElementsByName('messages')[0].innerHTML, ["type=","&"] );
  if( typ != null ) return "&type="+typ;
  typ =BodySeek( document.getElementsByName('messages')[0].innerHTML, ['<input name="type" value="','"'] );
  if( typ != null ) return "&type="+typ;
  typ =BodySeek( document.getElementsByName('messages')[0].innerHTML, ["type=","';"] );
  if( typ != null ) return "&type="+typ;
  typ =BodySeek( window.location.toString(), ["type=","&"] );
  if( typ != null ) return "&type="+typ;
  else return '';
}
function getServer(){
	var server;
	server =BodySeek( window.location.toString(), ["http://","/"] );
	if(server != null) return server;
	return null;
}
function UsuwanieZiomali(){
	var opcja=document.createElement('option');
		opcja.value='1000';
		opcja.innerHTML='1000';
	var opcja2=document.createElement('option');
		opcja2.value='2000';
		opcja2.innerHTML='2000';
	var opcja3=document.createElement('option');
		opcja3.value='5000';
		opcja3.innerHTML='5000';
	var opcja4=document.createElement('option');
		opcja4.value='10000';
		opcja4.innerHTML='10000';
	var opcja5=document.createElement('option');
		opcja5.value='20000';
		opcja5.innerHTML='20000';
	var opcja6=document.createElement('option');
		opcja6.value='50000';
		opcja6.innerHTML='50000';
	var opcja7=document.createElement('option');
		opcja7.value='100000';
		opcja7.innerHTML='100000';
	var opcja8=document.createElement('option');
		opcja8.value='200000';
		opcja8.innerHTML='200000';
	var opcja9=document.createElement('option');
		opcja9.value='500000';
		opcja9.innerHTML='500000';
	var opcja10=document.createElement('option');
		opcja10.value='1000000';
		opcja10.innerHTML='1000000';
	var d=document.getElementsByName('amountFire')[0];
	d.appendChild(opcja);
	d.appendChild(opcja2);
	d.appendChild(opcja3);
	d.appendChild(opcja4);
	d.appendChild(opcja5);
	d.appendChild(opcja6);
	d.appendChild(opcja7);
	d.appendChild(opcja8);
	d.appendChild(opcja9);
	d.appendChild(opcja10);
	}
function sPoziom(czego){
	var cojest, buduj;
	if(czego == 'burdel'){
		cojest='Brothels';
		buduj = 'bordell_kaufen&type=';
	}else{
		cojest='Clubs';
		buduj = 'buildClub&type=';
	}
	var urlr=HTTP_Get( "http://"+getServer()+"/index.es?action=internal"+cojest+"&sid="+SID_get());
	var poziom= BodySeek( urlr, [buduj,"&"] );
	if(poziom == '1')return 6;
	if(poziom == '2')return 7;
	if(poziom == '3')return 10;
	return 14;
}

function przerob(id, xdrt, ilert){
	unsafeWindow.loadwindow("index.es?action=internalAttackDetail&districtID="+id+"&sid="+SID_get(), 540,430,1);
	document.body.appendChild(divex);
	divex.innerHTML='WYSYLANIE ATAKOW W TOKU <BR />nie odswiezaj strony<br />'+xdrt+' / '+ilert;
	if(xdrt == ilert){
			alert('Wys?ano wszystkie ataki');
			window.location="http://"+getServer()+"/index.es?action=internalAttack&sid="+SID_get();
	}
}

function wZiomale(){
	//colt
	//automatic; 
	//glock_black
	//magnum_silver
	//deserteagle_silver
	//mp_small
	//pumpgun
	//m_16
	
	var ziom1=GM_getValue('colt');
	var ziom2=GM_getValue('automatic');
	var ziom3=GM_getValue('glock_black');
	var ziom4=GM_getValue('magnum_silver');
	var ziom5=GM_getValue('deserteagle_silver');
	var ziom6=GM_getValue('mp_small');
	var ziom7=GM_getValue('pumpgun');
	var ziom8=GM_getValue('m_16');
	
	if(!ziom1)ziom1=0;
	if(!ziom2)ziom2=0;
	if(!ziom3)ziom3=0;
	if(!ziom4)ziom4=0;
	if(!ziom5)ziom5=0;
	if(!ziom6)ziom6=0;
	if(!ziom7)ziom7=0;
	if(!ziom8)ziom8=0;
	var kij,kij2,kij3,kij4,kij5,kij6,kij7,kij8,diver,kijx,kijx2,kijx3,kijx4,kijx5,kijx6,kijx7,kijx8,di;
	di=document.createElement('br');
	kijx=document.createElement('span');
	kijx2=document.createElement('span');
	kijx3=document.createElement('span');
	kijx4=document.createElement('span');
	kijx5=document.createElement('span');
	kijx6=document.createElement('span');
	kijx7=document.createElement('span');
	kijx8=document.createElement('span');

	kijx.innerHTML='<br />Colt';
	kijx2.innerHTML='<br />P. Automatyczny';
	kijx3.innerHTML='<br />Czarny Glock';
	kijx4.innerHTML='<br />Srebrny Magnum';
	kijx5.innerHTML='<br />Desert Srebrny::';
	kijx6.innerHTML='<br />Mały MP';
	kijx7.innerHTML='<br />Strzelba sprężynowa';
	kijx8.innerHTML='<br />M16';
	
	diver=document.createElement('div');
	diver.style.position='fixed';
	diver.style.bottom='100px';
	diver.style.right='5px';
	diver.style.textAlign='right';
	diver.style.background='#555555';
	document.body.appendChild(diver);
	
kij=document.createElement('input');
	kij.type='text';
	kij.id='colt';
	kij.value=ziom1;
	kij.setAttribute('class','inputfield');
kij2=document.createElement('input');
	kij2.type='text';
	kij2.id='automatic';
	kij2.value=ziom2;
	kij2.setAttribute('class','inputfield');
kij3=document.createElement('input');
	kij3.type='text';
	kij3.id='glock_black';
	kij3.value=ziom3;
	kij3.setAttribute('class','inputfield');
kij4=document.createElement('input');
	kij4.type='text';
	kij4.id='magnum_silver';
	kij4.value=ziom4;
	kij4.setAttribute('class','inputfield');
kij5=document.createElement('input');
	kij5.type='text';
	kij5.id='deserteagle_silver';
	kij5.value=ziom5;
	kij5.setAttribute('class','inputfield');
kij6=document.createElement('input');
	kij6.type='text';
	kij6.id='mp_small';
	kij6.value=ziom6;
	kij6.setAttribute('class','inputfield');
kij7=document.createElement('input');
	kij7.type='text';
	kij7.id='pumpgun';
	kij7.value=ziom7;
	kij7.setAttribute('class','inputfield');
kij8=document.createElement('input');
	kij8.type='text';
	kij8.id='m_16';
	kij8.value=ziom8;
	kij8.setAttribute('class','inputfield');
	
	
	diver.appendChild(kijx);
	kijx.appendChild(kij);
	kijx.appendChild(di);
		diver.appendChild(kijx);
	kijx2.appendChild(kij2);
	kijx2.appendChild(di);
		diver.appendChild(kijx2);
	kijx3.appendChild(kij3);
	kijx3.appendChild(di);
		diver.appendChild(kijx3);
	kijx4.appendChild(kij4);
	kijx4.appendChild(di);
		diver.appendChild(kijx4);
	kijx5.appendChild(kij5);
	kijx5.appendChild(di);
		diver.appendChild(kijx5);
	kijx6.appendChild(kij6);
	kijx6.appendChild(di);
		diver.appendChild(kijx6);
	kijx7.appendChild(kij7);
	kijx7.appendChild(di);
		diver.appendChild(kijx7);
	kijx8.appendChild(kij8);
	kijx8.appendChild(di);
	diver.appendChild(kijx8);

}
function dkServer(){
	var serv = getServer();
	if(serv == 'int1.the-pimps.bigpoint.com')return 'pl';
	else return serv[0]+serv[1];
}
function przekieruj(dzielka, x){
	if(x=='hook')window.location="http://"+getServer()+"/index.es?action=internalHookers&atakuj=tak&pimp=10&changeDistrictlD="+dzielka+"&sid="+SID_get();
	if(x=='track')window.location="http://"+getServer()+"/index.es?action=internalTracks&atakuj=tak&changeDistrictlD="+dzielka+"&sid="+SID_get();
	if(x=='kolum')window.location="http://"+getServer()+"/index.es?action=internalColombian&atakuj=tak&changeDistrictlD="+dzielka+"&sid="+SID_get();
	if(x=='zip')window.location="http://"+getServer()+"/index.es?action=internalHomies&atakuj=tak&changeDistrictlD="+dzielka+"&sid="+SID_get();
}
function resetAll(){
	GM_setValue('oska', 1);
	GM_setValue('burdel' , 1);
}
function MojeDzialki(){
	var regg=/(\d+)("><distrctName>)/g;//<districtdistrictID="/g;
	var zdr=HTTP_Get("http://"+getServer()+"/index.es?action=districtSuggestion&sid="+SID_get());
	var kurwa;
	while (wynik = regg.exec(zdr))
	{
		kurwa = kurwa+wynik[0]+';';
	}
	kurwa=sreplace('<distrctName>', '', kurwa);
	kurwa=sreplace('undefined','',kurwa);
	kurwa=sreplace('">;', ';', kurwa);
	GM_setValue('oskii',kurwa);
}

//##•••W•I•A•D•O•M•O•Ś•C•I•••##################################################################################
/**********************START*****************************/
function sprawdzwiady(){
	var Sprawdz= BodySeek( document.getElementsByName('messages')[0].innerHTML, ['deleteMessage('] );
	if(Sprawdz)return true;
	return null;
}
function usunWiadomosci(){

	var Klik = document.createElement('a');
	var divv = document.createElement('div');
	var rameczka = document.createElement('iframe');
	var info=document.createElement('div');
	rameczka.style.display='none';
	rameczka.name='ramencja';
	rameczka.id='ramencja';
	document.body.appendChild(rameczka);
	
	divv.style.position='absolute';
	divv.style.top='110px';
	divv.style.right='10px';
	divv.style.textAlign='center';
	divv.style.backgroundColor='white';
	xxx = document.body.appendChild(divv);

	Klik.href=  "http://"+getServer()+"/index.es?action=internalMymessages"+TYP_get()+"&sid="+SID_get()+"&usun";
	Klik.innerHTML='Usun Wiadomosci';
	Klik.target='ramencja';
	Klik.style.fontStyle='oblique';
	Klik.style.fontWeight='bolder';
	xxx.appendChild(Klik);
	
	info.style.background='black';
	info.style.opacity='0.1';
	info.style.width='100%';
	info.style.top='0';
	info.style.left='0';
	info.style.height='100%';
	info.style.paddingTop='400px';
	info.style.color='red';
	info.style.position='fixed';
	info.style.textAlign='center';
	info.innerHTML='<B><font size="26">USUWANIE WIADOMOSCI CZEKAJ</font></B>';

	if(window.location == 'http://'+getServer()+'/index.es?action=internalMymessages'+TYP_get()+'&sid='+SID_get()+'&usun'){
			parent.document.body.appendChild(info);
		if(sprawdzwiady() != null){
			document.getElementById('check').checked=true;
			frm=document.getElementsByTagName("form");
			unsafeWindow.AllMessages(frm[frm.length-2]);
			frm[frm.length-2].action="index.es?action=internalMymessages"+TYP_get()+"&sid="+SID_get()+"&usun";
			frm[frm.length-2].submit();
		}else{
			alert('Skasowano');
			parent.location="http://"+getServer()+"/index.es?action=internalMymessages"+TYP_get()+"&sid="+SID_get();
		}
	}

}
/**********************KONIEC****************************/
//##•••K•A•W•A•Ł•K•I•••##################################################################################
/**********************START*****************************/
function kupKawalek(){
	frm=document.getElementsByTagName("form");
	frm[frm.length-1].action='index.es?action=internalTracks&atakuj=tak&';
	frm[frm.length-1].submit();
}
function kupujKawalki(){
document.body.appendChild(divex);
	var ktorypoziom = BodySeek(window.location.toString(), ["change", "&"] );
	var ktorypoziom1 = BodySeek(window.location.toString(), ["start", "&"] );
	if(ktorypoziom) GM_setValue('burdel', sPoziom('club'));
	if(ktorypoziom1){
		MojeDzialki();
		GM_setValue('burdel', sPoziom('club'));
		GM_setValue('oska', 0);
	}
	var oska = GM_getValue('oska');
	var xp  = +oska+1;
	var xxx=GM_getValue('burdel');
	var oskia=explode(GM_getValue('oskii'), ';');
	var moje	= BodySeek( document.body.innerHTML, ['images/'+jezyk+'/music/tracks/track_section_left.jpg','</t'] );
	var iledziwek = Policz( moje, ['trackID='] );
	//iledziwek=iledziwek.length-1;
	var sid = SID_get();
	divex.innerHTML='- '+xp+' - / - '+oskia.length+' -';
	if(iledziwek < xxx){
		document.getElementsByName('trackWindow')[0].src='index.es?action=internalTracksDetail&trackType=15&sid='+SID_get();
	}else{
		if(oska < oskia.length) {
			GM_setValue('oska', xp);
			przekieruj(oskia[oska], 'track');
		}else{
			alert('Chyba wszystko');
		}	
	}
}

function updateBurdel(){
	var ktorypoziom1 = BodySeek(window.location.toString(), ["start", "&"] );
	if(ktorypoziom1)MojeDzialki();
	var oskia=explode(GM_getValue('oskii'), ';');
	for(var i=0;i<oskia.length+1;i++){
		unsafeWindow.districtAjax.quickUpgradeBuilding('brothelLevel', oskia[i]);
	}

}
function updateClub(){
	var ktorypoziom1 = BodySeek(window.location.toString(), ["start", "&"] );
	if(ktorypoziom1)MojeDzialki();
	var oskia=explode(GM_getValue('oskii'), ';');
	for(var i=0;i<oskia.length+1;i++){
		unsafeWindow.districtAjax.quickUpgradeBuilding('clubLevel', oskia[i]);
	}
}

/**********************KONIEC****************************/
//##•••P•R•O•S•T•Y•T•U•T•K•I•••##################################################################################
/**********************START*****************************/
function kupujDziwki(){
	document.body.appendChild(divex);
	var oska = GM_getValue('oska');
	var xp  = +oska+1;
	var ktorypoziom = BodySeek(window.location.toString(), ["change", "&"] );
	var ktorypoziom1 = BodySeek(window.location.toString(), ["start", "&"] );
	if(ktorypoziom) GM_setValue('burdel', sPoziom('burdel'));
	if(ktorypoziom1){
		MojeDzialki();
		GM_setValue('burdel', sPoziom('burdel'));
		GM_setValue('oska', 0);
	}
	var xxx=GM_getValue('burdel');
	var oskia=explode(GM_getValue('oskii'), ';');
	var moje	= BodySeek( document.body.innerHTML, ['images/'+jezyk+'/business/hookers/hook_section_left.jpg','</t'] );
	var iledziwek = Policz( moje, ['hookerID='] );
	//iledziwek=iledziwek.length-1;
	var sid = SID_get();
	divex.innerHTML='- '+xp+' - / - '+oskia.length+' -';
	var dziwki = BodySeek( document.body.innerHTML, ['images/'+jezyk+'/business/hookers/hook_section_right.jpg','</t'] );
	var znal = BodySeek( dziwki, ['20_small.jpg', '"'] );
	if(iledziwek < xxx){
		if(znal){ 
			document.getElementsByName('hookerWindow')[0].src='index.es?action=internalHookersDetail&atakuj=tak&hookerID=20&sid='+SID_get();
		}else{ 
			window.location="http://"+getServer()+"/index.es?action=internalHookers&atakuj=tak&sid="+SID_get();
		}
	}else{
		if(oska < oskia.length) {
			GM_setValue('oska', xp);
			przekieruj(oskia[oska], 'hook');
		}else{
			alert('Chyba wszystko');
		}		
		
	}
}
function kupDziwke(){
	frm=document.getElementsByTagName("form");
	frm[frm.length-1].action='index.es?action=internalHookers&atakuj=tak&';
	frm[frm.length-1].submit();
}
function kupujZiomali(){
	var check;
	document.body.appendChild(divex);
	var ktorypoziom1 = BodySeek(window.location.toString(), ["start", "&"] );
	var ktorypoziom = BodySeek(window.location.toString(), ["change", "&"] );
	if(ktorypoziom1){
		MojeDzialki();
		GM_setValue('oska', 502);
		check = 1;
	}
	if(ktorypoziom) check = 1;
	var oska = GM_getValue('oska');
	var xp  = +oska+1;

	var oskia=explode(GM_getValue('oskii'), ';');
	var sid = SID_get();
		divex.innerHTML='- '+xp+' - / - '+oskia.length+' -';
	if(check==1){
			document.getElementsByName('homieWindow')[0].src='index.es?action=internalHomieDetail&weaponID=m_16&type=hire&atakuj=tak&sid='+SID_get();
	}else{
		if(oska < oskia.length) {

			GM_setValue('oska', xp);
			przekieruj(oskia[oska], 'zip');
			
		}else{
			alert('Chyba wszystko');
		}		
		
	}
}

function kupZioma(){
//var boddy = document.body;
	/*boddy.setAttribute('onload', "javascript:hire('m_16')");*/
	document.getElementsByName('amountHire')[0].value='50';
	//unsafeWindow.document.getElementById('hilfsform').submit();
	var ttt = document.getElementById('hire');
	unsafeWindow.hire('m_16');
	ttt.setAttribute('onclick', 'function(){}');
	frm=document.getElementsByTagName("form");
	frm[frm.length-1].action='index.es?action=internalHomies&atakuj=tak&';
	unsafeWindow.document.getElementById('hilfsform').submit();	
	//frm=document.getElementsByTagName("form");
	
	//frm[frm.length-1].submit();

}
/**********************KONIEC****************************/
//##•••C•R•A•C•K•••##################################################################################
/**********************START*****************************/
function kupCrack(){
	var oska = GM_getValue('oska');
	var xp  = +oska+1;
	var xxxd=BodySeek(window.location.toString(), ["change", "&"] );
	var startt = BodySeek(window.location.toString(), ["start", "&"] );
	if(startt){
		GM_setValue('oska', 0);
		MojeDzialki();
	}
	var oskia=explode(GM_getValue('oskii'), ';');
	if(xxxd || startt){
		unsafeWindow.max('crack');
		frm=document.getElementsByTagName("form");
		frm[frm.length-1].action='http://'+getServer()+'/index.es?action=internalColombian&atakuj=tak&';
		frm[frm.length-1].submit();
	}else{
		if(oska < oskia.length+1){
			GM_setValue('oska', xp);
			przekieruj(oskia[oska], 'kolum');
		}else{	
			alert('chyba wszystko');
		}
	
	}
}
/**********************KONIEC****************************/
//##•••A••T••A••K••I•••##################################################################################
/**********************START*****************************/
function cityID(){
	var xxx = document.body.innerHTML;
	xxxa = sreplace('city', 'siema', xxx);
	xxxa = sreplace('AttackCity', 'AttackDistrict', xxxa);
	xxxa = sreplace('siemaWindow', 'cityWindow', xxxa);
	xxxa = sreplace('search','siema', xxxa);
	document.body.innerHTML=xxxa;
}
function planujAtaki(){
	var ziom=parent.document.getElementById('colt');
	var ziom2=parent.document.getElementById('automatic');
	var ziom3=parent.document.getElementById('glock_black');
	var ziom4=parent.document.getElementById('magnum_silver');
	var ziom5=parent.document.getElementById('deserteagle_silver');
	var ziom6=parent.document.getElementById('mp_small');
	var ziom7=parent.document.getElementById('pumpgun');
	var ziom8=parent.document.getElementById('m_16');
	var divE=document.getElementById('districts').innerHTML;
	var siemra=parent.document.getElementById('kurwa');
	var xxxx;
	//x=divE;//.replace(/<a style="color: rgb(102, 102, 102); font-family: tahoma; font-size: 12px;" href="javascript:loadwindow('/g, '');
	var zamien = [ 
	'<a style="color: rgb(102, 102, 102); font-family: tahoma; font-size: 12px;" href="javascript:loadwindow(',
	',530,430,1)" target="_parent">',
	"'index.es?action=internalAttackDetail&amp;districtID=",
	'<b>',
	'</b>',
	'</a><br>', 
	 ];

	/*xxxx=sreplace('<a style="color: rgb(102, 102, 102); font-family: tahoma; font-size: 12px;" href="javascript:loadwindow(','',divE);
	xxxx=sreplace(',530,430,1)" target="_parent">','',xxxx);
	xxxx=sreplace("'index.es?action=internalAttackDetail&amp;districtID=",'',xxxx);*/
	var sid;
	var regexec1 = /[\s][-].*/g;
	var regexec2 = /[\s]/g;
	var regexec3 = /[\n]/gi;
	sid =BodySeek( document.body.innerHTML, ["sid=","'"] );
	xxxx=sreplace(zamien, '', divE);
	xxxx=sreplace("&amp;sid="+sid+"'",' -', xxxx);
	xxxx=sreplace('        ',"",xxxx);
	xxxx=xxxx.replace(regexec1, '');
	xxxx=xxxx.replace(regexec3, ";");
	xxxx=xxxx.replace(regexec2, ";");
	xxxx=xxxx.replace(/^[;]/, "");
	for(var j=0;j<5;j++){
		xxxx=sreplace(';;', ';', xxxx);
	}
	siemra.value=sreplace(";;", ";", siemra.value+xxxx);
	GM_setValue('dzialkiatak',siemra.value);
	GM_setValue('colt', ziom.value);
	GM_setValue('automatic', ziom2.value);
	GM_setValue('glock_black', ziom3.value);
	GM_setValue('magnum_silver', ziom4.value);
	GM_setValue('deserteagle_silver', ziom5.value);
	GM_setValue('mp_small', ziom6.value);
	GM_setValue('pumpgun', ziom7.value);
	GM_setValue('m_16', ziom8.value);


}
function zaplanujAtaki(){
	var dc=document;
	dc.getElementsByName('attackSearch')[0].action='index.es?action=internalAttack&siema=tak&';
	var sel = dc.getElementsByName('districtWindow')[0];
	var six = sel.getAttribute('value');
	var start, newElement;
	start = document.body;
	newElement = document.createElement('textarea');
	newElement.id='kurwa';
	newElement.cols='200';
	newElement.rows='20';
	start.appendChild(newElement);
	wZiomale();
}
function wyslijAtaki(){
	var a = 0;

	var iframka;
		iframka=document.createElement('iframe');
		iframka.id='iframkaa';
		iframka.name='iframkaa';
		iframka.style.display='none';
		document.body.appendChild(iframka);
	var ttt = explode(GM_getValue('dzialkiatak'),";");
	for(var i=0;i<ttt.length;i++ ){
		aa = ++a * 5000;
		setTimeout(przerob,aa+rand(1000,4000), ttt[i],i+1,ttt.length);

	}

}
function ZbierajSerca(){
	var x;
	x = document.getElementById('HW');
	if(x) unsafeWindow.count();
	window.location='http://'+getServer()+'/index.es?action=internalHome&atakuj=tak&sid='+SID_get()+'';
}
/**********************KONIEC****************************/
function switchSkrypt(){
	var akcja=BodySeek( window.location.toString(), ["action=","&"] );
	var xders = BodySeek( window.location.toString(), ["atakuj=", "&"] );
	var reset = BodySeek( window.location.toString(), ["resetuj=", "&"] );
	var siema = BodySeek( window.location.toString(), ["siema", "&"] );
	var idd= BodySeek( window.location.toString(), ["weaponID=", "&"] );
	if(akcja == 'internalAttackUser') cityID();
	if(akcja == 'internalAttackDistrict' && xders != 'tak' && siema)planujAtaki();
	if(akcja == 'internalAttack')zaplanujAtaki();
	if(akcja == 'internalAttack' && xders == 'tak')wyslijAtaki();
	if(akcja == 'internalHookers' && xders == 'tak')kupujDziwki();
	if(akcja == 'internalTracks' && xders == 'tak')kupujKawalki();
	if(akcja == 'internalHookersDetail' && xders == 'tak')kupDziwke();
	if(akcja == 'internalTracksDetail')kupKawalek();
	if(akcja == 'internalMymessages')usunWiadomosci();
	if(akcja == 'internalAttackDetail')wyslijAtak();
	if(akcja == 'internalColombian' && xders == 'tak') kupCrack();
	if(akcja == 'internalHomieDetail') UsuwanieZiomali();
	if(akcja == 'internalMyrealm' && xders == 'burdel')updateBurdel();
	if(akcja == 'internalMyrealm' && xders == 'club')updateClub();
	if(akcja == 'internalHomies'&& xders == 'tak')kupujZiomali();
	if(akcja == 'internalHomieDetail'&& xders == 'tak')kupZioma();
	if(akcja == 'internalHome'&& xders == 'tak')ZbierajSerca();

	if(akcja == 'internalHookers' || akcja == 'internalMyrealm' || akcja == 'internalAttack' || akcja == 'internalHome' || akcja == 'internalTracks' || akcja == 'internalColombian') DodajMenu();
	if(akcja == 'internalHookers' && reset == 'tak') resetAll();
	
}
function DodajMenu(){
	var akcja=BodySeek( window.location.toString(), ["action=","&"] );
	var div, lista; 
	var atakuj, listae;
	var kupujdziwki, kupcrack, kupujkawalki, burdele,ziomale,serca;
	div=document.createElement('div');
		div.style.top='200px';
		div.style.right='10px';
		div.style.background='white';
		div.style.position='fixed';
		div.style.display='list-item';
		div.style.listStyle='circle';
		div.style.textAlign='right';
		document.body.appendChild(div);
	atakuj=document.createElement('a');
		atakuj.href='http://'+getServer()+'/index.es?action=internalAttack&atakuj=tak&sid='+SID_get();
		atakuj.innerHTML='Przeprowadz Ataki<br>';
		div.appendChild(atakuj);
	kupujdziwki=document.createElement('a');
		kupujdziwki.href="http://"+getServer()+"/index.es?action=internalHookers&atakuj=tak&start=tak&sid="+SID_get();
		kupujdziwki.innerHTML='Kupuj Dziwki<br>';
		div.appendChild(kupujdziwki);
	kupujkawalki=document.createElement('a');
		kupujkawalki.href="http://"+getServer()+"/index.es?action=internalTracks&atakuj=tak&start=tak&sid="+SID_get();
		kupujkawalki.innerHTML='Kupuj Kawalki<BR>';
		div.appendChild(kupujkawalki);
	kupcrack=document.createElement('a');
		kupcrack.href="http://"+getServer()+"/index.es?action=internalColombian&atakuj=tak&start=tak&sid="+SID_get();
		kupcrack.innerHTML="KUPUJ CRACK<br>";
		div.appendChild(kupcrack);
	burdele=document.createElement('a');
		burdele.href="http://"+getServer()+"/index.es?action=internalMyrealm&atakuj=burdel&start=tak&sid="+SID_get();
		burdele.innerHTML="Buduj Wszystkie Burdele<br>";
	kluby=document.createElement('a');
		kluby.href="http://"+getServer()+"/index.es?action=internalMyrealm&atakuj=club&start=tak&sid="+SID_get();
		kluby.innerHTML="Buduj Wszystkie Kluby<br>";
	ziomale=document.createElement('a');
		ziomale.href="http://"+getServer()+"/index.es?action=internalHomies&atakuj=tak&start=tak&sid="+SID_get();
		ziomale.innerHTML="KUPUJ ZIOMALI<br />";
		div.appendChild(ziomale);
	serca=document.createElement('a');
		serca.href="http://"+getServer()+"/index.es?action=internalHome&atakuj=tak&sid="+SID_get();
		serca.innerHTML="Zbieraj Serca<br />";
		div.appendChild(serca);
	if(akcja=='internalMyrealm'){
		div.appendChild(burdele);
		div.appendChild(kluby);
	}
	
}
switchSkrypt();
