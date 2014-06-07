// ==UserScript==
// @name DarkOrbit
// @description DarkOrbit 
// @identifier    DarkOrbit.user.js
// @version 0.4.3.2
// @date 2009-04-21
// @author nic35025
// @include http://*.darkorbit.bigpoint.com/*
// ==/UserScript==

var ScriptName='DarkOrbit: Tools(Labo make)';
var ScriptAutor='nic35025';
var ScriptVersion='0.4.3';
var ScriptLink='http://userscripts.org/scripts/show/38164';

var dc =document;
//=== funkcje bibloteczne ogólne ===
function $(id) { return dc.getElementById(id);}
function iURL() { return window.location.href; }
function _img() { return dc.createElement('img'); }
function _div() { return dc.createElement('div'); }
function _input() { return dc.createElement('input'); }
function _table() { return dc.createElement('table'); }
function _td()    { return dc.createElement('td'); }
function _tr()    { return dc.createElement('tr'); }
function _abs(co) { co.style.position ="absolute"; return co; }
function _rel(co) { co.style.position ="relative"; return co; }
function _select() { return dc.createElement('select'); }
function _option() { return dc.createElement('option'); }

function WinWidth() { return window.innerWidth ? window.innerWidth : window.document.body.clientWidth; }
function StyleWidth(obj) { return obj.style.width.substr(0,obj.style.width.length-2); }
function PropAdd( Obj, Prop ) { for( var Co in Prop ) Obj[Co] =Prop[Co]; return Obj; }

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

function BodyGet() { return dc.body.innerHTML; }
function BodySeek( arr ) { return StrSeek( BodyGet(), arr ); }

function HTTP_Post(_url, _data, _cb) {
  GM_xmlhttpRequest({
    method: "POST",
    url: _url,
    headers: {'Content-type':'application/x-www-form-urlencoded'},
    data: encodeURI(_data)} );
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

function frm1000( Co ) {
  for( var i =Co.length-3; i>0; i-=3 ) 
    Co = Co.substr(0,i)+" "+Co.substr(i);
  return Co;
}

//=== funkcje bibloteczne szczególne ===
function btnDO( Prop, OnClick, Type ) {
  if( typeof( Type ) !='string' ) Type ='button';
  var btn;
  btn =dc.createElement('input');
  btn.type =Type;
  btn.setAttribute("style", 
    "position: absolute;"+
    "width: 130px; height: 35px;"+
	"margin-bottom: 3px;" +
 	"border: 0px; color: #ffffff;"+
	"font-family: Arial;" +
	"font-weight: outline bold; font-size: 14px;" +	
//	"font-weight: bold; font-size: 11px;" +	// jak orginał
	"background-color: transparent;" );
  if( Prop ) btn =PropAdd( btn, Prop );
  if( OnClick ) btn.addEventListener('click', OnClick, true);
  
  var img =document.createElement('img');
  img.setAttribute("style", "position: absolute;");
//  img.src ='do_img/global/bg_subnav_selected.gif'; // żółte z miganiem
  img.src ='do_img/global/bg_subnav_standard.gif'; // żółte bez migania
//  img.src ='do_img/global/bg_subnav_hover.gif'; // niebieska miga
//  img.src ='btnGIF';

  var div =document.createElement('div');
  div.setAttribute("style", "position: relative; width: 100%; height:35px;"
  	+ "margin-bottom: 3px;" );
  
  div.appendChild(img);
  div.appendChild(btn);
  return div;
}

function ID_get()      { return BodySeek( ['"uid=', '&'] ); }
function PD_get()      { return BodySeek( ['&amp;xp=', '&'] ); }
function Level_get()   { return BodySeek( ['&amp;lvl=', '&'] ); }
function JackPot_get() { return BodySeek( ['&amp;jackpot=', '+euro+'] ); }
function Kredyty_get() { return BodySeek( ['&amp;cred=', '&'] ).replace(/\./g,""); }
function Uridium_get() { return BodySeek( ['&amp;xcred=', '&'] ).replace(/\./g,""); }
function UserOnline_get() { return BodySeek( ['&amp;ouser=', '&'] ); }
function UserName_get() { return decodeURI(decodeURI(BodySeek( ['.com%2Flogin.php%3Fusername%3D','%26pa'] ))); }
function SID_get() {
  var sid;
  sid =BodySeek( ["&amp;sid=","&"] );
  if( sid != null ) return sid;
  sid =BodySeek( ['<input name="sid" value="','"'] );
  if( sid != null ) return sid;
  sid =BodySeek( ["&amp;sid=","';"] );
  if( sid != null ) return sid;
  return null;
}
function RID_get() { return BodySeek( ['<input name="reloadToken" value="', '"'] );}

//==[ HOME ]=============================================================
// [0] -lp
// [1] -User
// [2]- Punkty
function RankToArr( _Body, _arr ) {
  var lst =_Body.split('<strong>');
  for( var i =1; i < lst.length; i+=3 ) {
    var rec =[];
	// arr[i+0] // nr poz
	rec.push( lst[i+0].split('.</')[0] ); // lp
	rec.push( lst[i+1].split( '</')[0] ); // User
	rec.push( lst[i+2].split(' Punkty<')[0].replace(/\./g,"") ); // Punkty
    _arr.push( rec );
  }
  return _arr;
}
function RankUserPoz( _arr, _User ) {
  for( var co in _arr ) {
    var rec =_arr[co];
    if( rec[1] ==_User ) return rec[0];
  }
  return -1;
}
function RankList_get( PgCount ) {
  var bck =[];
  var URL = iURL().split('?')[0];
  for( var PgNo =1; PgNo <= PgCount; PgNo++ ) {
    var _url =URL +'?action=internalHallofFame&orderBy=&view=User&dps=' +PgNo +
		'&sid=' +SID_get();
    var Ans =HTTP_Get( _url	);
	GM_log( 'Rank('+PgNo+') ->'+Ans.length +'B');
	if( Ans ) { bck = RankToArr( Ans, bck ); }
  }
  return bck;
}

function Aukcje_StartCheck() { setStart( 1-getStart() ); }
function getStart()  { return GM_getValue('DO_Start', 0 ) };
function setStart(No){        GM_setValue('DO_Start',No ) };
function getTask()   { return GM_getValue('DO_Task', 0 ) };
function setTask(No) {        GM_setValue('DO_Task',No ) };
function getDT()     { return GM_getValue('DO_dt',   0 ) };
function setDT(dt)   {        GM_setValue('DO_dt',  dt.toString() ) };
function TimeGet() { var dt =new Date(); return dt.toString().substring(16,24); }

//==[ HANDEL ]=============================================================
function Aukcje_Start() { setStart( 1-getStart() );
}

function Aukcje_Menu0() {
  var _div;
  _div =document.createElement('div');
  _div.appendChild( btnDO( {value:GM_getValue('DO_Start',0) ? "Stop" : "Start", id: "btnStart"}, Aukcje_Start ));
  var cb =btnMake( {id: 'Aukcje_Make' }, Aukcje_OnClick, "checkbox" );
  var co =GM_getValue('DO_HandelMake', 0 );
  GM_log( 'DO_HandelMake ='+co );
  cb.checked =co;
  _div.appendChild( cb );

  var _sel =document.createElement('select');
    _sel.appendChild( co=document.createElement('option') );
    with( co ) { value ='3'; innerHTML ='Engine G3N-7900 (+10)'; }
    _sel.appendChild( co=document.createElement('option') );
    with( co ) { value ='5'; innerHTML ='Shields SG3N-B02  (10 000/80%)'; }
    _sel.appendChild( co=document.createElement('option') );
    with( co ) { value ='18'; innerHTML ='Laser LF3 (150)'; }
  _div.appendChild( _sel );

  _div.appendChild( co=btnMake( {value:'00:00:00', id:'Aukcje_Price'  , size:'6', width:'100%' }, null, 'text' ) );
  _div.appendChild( co=btnMake( {value:'00:00'   , id:'Aukcje_Shut'   , size:'6', width:'100%' }, null, 'text' ) );
  _div.appendChild( co=btnMake( {value:'00:00'   , id:'Aukcje_TmStart', size:'6', width:'100%' }, null, 'text' ) );
  _div.appendChild( co=btnMake( {value:'00:00'   , id:'Aukcje_TmEnd'  , size:'6', width:'100%' }, null, 'text' ) );
  _div.appendChild( co=btnMake( {value:'00:00'   , id:'Aukcje_TmNow'  , size:'6', width:'100%' }, null, 'text' ) );
  
  with( _div.style ) {
    position ='absolute';
    top      ='34px';
    left     ='10px';
    //float ="right";
    //left = (WinWidth()/2)+"px";
    // right = WinWidth()+"px";
    zIndex   ='9999';
  }
  document.body.appendChild(_div);
  setInterval(HandelTask, 1000);
}

function Lng_get() { return BodySeek( ['<td style="width: 64px;"><img src="do_img/', '/'] );}

function Handel_Poz(id,img,Info,User,Uridium, HTMLsend ) {
  var sid =SID_get();
  var dc  =document;
  var Lng =Lng_get();
  var tbs =dc.getElementsByTagName('table');

  var tb =tbs[7]; // tabela licytacji
  var tr =dc.createElement('tr');
  var td =dc.createElement('td');
      td.style.width ='64px';
	  td.innerHTML ='<img src="do_img/'+Lng+'/handel/'+img+'" alt="" height="63" width="63">';
	  tr.appendChild( td );
  var td2 =dc.createElement('td');
      td.style.width ='2px';
      td.style.backgroundImage ='url(do_img/'+Lng+'/handel/trenner.gif?__cv=657)';
	  td.innerHTML ='<img src="do_img/'+Lng+'/handel/trenner.gif?__cv=657" height="63" width="2">';
	  tr.appendChild( td2 );
  var td =dc.createElement('td');
      td.style.width ='173px';
      td.innerHTML ='<embed src="do_img/'+Lng+'/swf/auction_cooltxt.swf?__cv=4877" '+
	                  'flashvars="'+
			    		'itemnfo='+Info+'&amp;'+
						'hbid='+User+'&amp;'+
						'wmode=opaque&amp;'+
						'bgcolor=%23434B52&amp;'+
						'sid='+sid+'&amp;lang=pl"'+
					' play="true" loop="true" menu="false" quality="best" name=""'+
					' allowscriptaccess="sameDomain" swliveconnect="true"'+
					' type="application/x-shockwave-flash"'+
					' pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="opaque"'+
					' bgcolor="#434B52" height="63" width="173">';
	  tr.appendChild( td );
	  tr.appendChild( td2 );
  var td =dc.createElement('td');
      td.style.width ='108px';
	td.innerHTML ='<span style="border: medium none ; margin: 0pt 3px; display: block; text-align: center; width: 102px; height: 17px ! important; background-image: url(do_img/pl/handel/bg_text.gif?__cv=657);">' +
	         	  '<strong>'+Uridium+'</strong></span>'+
				  HTMLsend;
//				  '<a href="JavaScript:void(0)" onclick="'+OnClickBuy+'();">'+
//				  '<img src="do_img/'+Lng+'/handel/b_sofortkauf.gif?__cv=657" alt="Kup teraz" style="margin: 0pt 3px; padding-top: 5px;" height="18" width="102"></a>';
	tr.appendChild( td );
	tr.appendChild( td2 );
var td =dc.createElement('td');
    td.style.width ='97px';
	td.innerHTML ='<input name="amount" class="fliess11px-gelb" style="border: medium none ; font-weight: bold; width: 102px; height: 17px ! important; background-image: url(do_img/'+Lng+'/handel/bg_text.gif?__cv=657); margin-left: 3px; text-align: center;" type="text"><br>'+
				  '<input src="do_img/'+Lng+'/handel/b_bieten.gif?__cv=657&amp;sid='+sid+'" style="margin-top: 3px; margin-left: 3px;" type="image">';
	tr.appendChild( td );

    tb.appendChild( tr );
}

//==[ Aukcje ]=============================================================
function Aukcje_Is() { return $('mainContentAuktion'); }
function Aukcje_Menu() {
  GM_log('Aukcje_Menu');
  var div =dc.createElement('div');
  div.style.position ="absolute";
  div.style.marginLeft ="43px";
  div.style.top ="94px";
  div.style.zIndex ="9999";

  var btn =btnDO( {value:'Ranga' }, Aukcje_Ranga  );
  div.appendChild(btn);
  var _nav = $("nav");
  if( _nav ) {
    _nav.style.position ="relative";
    _nav.appendChild(div);
  }
//  GM_log('HandelMenu1 -end');
}

function Aukcje_Ranga() {
  GM_log('Aukcje_Ranga -start');
  var _mx  =30;
  var Usrs =RankList_get(_mx);
  var strg =dc.getElementsByTagName('strong');
  var arr  =BodyGet().split( '<form name="auktion_' );
  var User, Poz;
  for( var i =1; i < arr.length; i++ ) {
    User =StrSeek( arr[i], ['<span class="fliess10px-gelb">', '</span>'] );
//	User =escape( User );
//	User =unescape( User );
	Poz = RankUserPoz( Usrs, User );
	if( Poz == -1 ) Poz = '>' +(_mx*100);
    strg[15+i].innerHTML =Poz;
  }
  GM_log('Aukcje_Ranga -end');
}

function Aukcje_Go() {
}
function Aukcje_TimeGet() { return BodySeek( ['<b id="counter">', '<'] ); }
// No =3 - Napęd +10
// No =5 -Osłonak +10000/80%
// No =18 -LF3
function Aukcje_Make( No, Amount ) {
  var frm = dc.forms.namedItem('auktion_'+No);
  if( frm ) {
    var fld = frm.elements.namedItem('amount');
	if( fld ) { fld.value =Amount;
	  frm.submit();
	  return true;
	}
  }
  return false;
}

//==[ LABOR 1 ]=============================================================
function Labor_Is() { return $('mainContentLabor1'); }
function Labor_Start() { 
  var bStart =1-getStart();
  setStart( bStart ); 
  setTask(bStart ? 0 : 100);
  var btnStart =$("btnStart");
  if( btnStart ) btnStart.value =bStart ? "Stop" : "Start";
}

function Labor_PromeriumMake() {
  var bPromeriumMake =$("PromeriumMake");
  if( bPromeriumMake )
	GM_setValue('DO_PromeriumMake', bPromeriumMake.checked ? 1:0 );
}
function Labor_MakeAll() { setTask(0); }

function Level_tb() {
  var pd =PD_get()/10000;
  var pd_min =Math.pow(2,Math.floor(Math.log(pd)/Math.log(2)));
  var pd_prc =100*((pd/pd_min)-1);
  var tab =dc.createElement('table');
  tab.height ="4px";
  tab.width ="100px";
  tab.cellSpacing ="0";
  tab.cellPadding ="2";
  tab.border ="0";
  tab.style.position ="absolute";
  tab.style.left ="16px";
  tab.style.top  ="35px";
  var tr =dc.createElement('tr');
  var td =dc.createElement('td');
  td.bgColor ="#3FFF3F";
  td.width = pd_prc +"px";
  tr.appendChild(td);
  td =dc.createElement('td');
  td.bgColor ="green";
  td.width = (100-pd_prc) +"px";
  tr.appendChild(td);
  tab.appendChild(tr);
  return tab;
}

function Labor_Menu() {
  var div =dc.createElement('div');
  div.style.position ="absolute";
  div.style.marginLeft ="43px";
  div.style.top ="96px";
  div.style.zIndex ="9999";

  div.appendChild(btnDO( {value:GM_getValue('DO_Start',0) ? "Stop" : "Start", id:'btnStart'}, Labor_Start ));
  div.appendChild( btnDO( {value:'Promerium' }, Labor_PromeriumMake ) );
  div.appendChild( btnDO( {value:'Make All', size:'9', width:'100%'}, Labor_MakeAll ) );
  div.appendChild( btnDO( {value:'00:00:00', id:'TimeView', size:'9' } ) );
  
  var _nav = $("nav");
  if( _nav ) {
    _nav.style.position ="relative";
    _nav.appendChild(div);
  }
  setInterval(Labor_Task, 1000); 
}

function Labor_RocksCount() {
  var bck =[];
  bck.Prometium =BodySeek(['bg_prometium.gif','[',']']);
  bck.Endurium  =BodySeek(['bg_endurium.gif','[',']']);
  bck.Terbium   =BodySeek(['bg_terbium.gif','[',']']);
  bck.Xenomit   =BodySeek(['bg_xenomit.jpg','[',']']);
  bck.Prometid  =BodySeek(['<br>prometium    <br>z endurium  <br>','[',']']);
  bck.Duranium  =BodySeek(['<br>endurium  <br>z terbium  <br>','[',']']);
  bck.Promerium =BodySeek(['<br>prometidu z duranium  <br>Wymagany surowiec: xenomit  <br>','[',']']);
  return bck;
}
var Prometid  = { Prometium :20, Endurium :10 };
var Duranium  = { Endurium  :10, Terbium  :20 };
var Promerium = { Prometid  :10, Duranium :10, Xenomit :1 };

function Labor_RocksCheck( Co ) {
  var bck =10000;
  var Rocks =Labor_RocksCount();
  for( var n in Co )
    try { bck =Math.min( bck, Math.floor(Rocks[n] / Co[n],0) ); } catch( e ) {}
  return bck;
}

function Labor_View(No) {
  var Elem =$(No);
  Elem.style.left = ((WinWidth()-StyleWidth(Elem)-150)/2) +"px";
  Elem.style.top  = "425px";
  Elem.style.visibility = "visible";
  return document.forms.namedItem('produceNow1'+No);
}
function RockMake( No, Count ) {
  var frm =Labor_View(No); //  [object XPCNativeWrapper [object HTMLFormElement]] [FORM]
  var fldCount =frm.elements.namedItem('anzahl');
  /* ID('produceNow11').elements.namedItem('anzahl')
    .length
	.value
	.options[0].value =111;
	.selectedIndex =0;
  */
  Count =typeof( Count ) =='number' ? Count :99;
  fldCount.options[0].value =Count;
  fldCount.options[0].text  =Count;
  fldCount.selectedIndex =0;
  //fldCount.value =typeof( Count ) =='number' ? Count :111;
  frm.submit();
}
function Prometid_Make (Count) { RockMake(1,Count); }
function Duranium_Make (Count) { RockMake(2,Count); }
function Promerium_Make(Count) { RockMake(3,Count); }

function UnhideIsMake() {
  var infoPopUpContainer =$("infoPopUpContainer");
  if( !infoPopUpContainer ) return false;
  if( infoPopUpContainer.style.display =="none" ) return false;
  var busyLayer = $("busy_layer");
  if( !busyLayer ) return false;
  if( busyLayer.style.visibility == "hidden" ) return false;
  infoPopUpContainer.style.display = "none";
  busyLayer.style.visibility = "hidden";
  busyLayer.style.height = "0px";
  return true;
}
function CheckPromeriumMake() {
  var PromeriumMake =document.getElementsByName("PromeriumMake");
  if( !PromeriumMake ) return false;
  return PromeriumMake.checked;
}
function Unhide_Make() {
  var infoPopUpContainer =$("infoPopUpContainer");
  if( infoPopUpContainer )
    infoPopUpContainer.style.display = "none";
  var busyLayer = $("busy_layer");
  if( busyLayer ) {
    busyLayer.style.visibility = "hidden";
    busyLayer.style.height = "0px";
  }
}

function Labor_Task() {
  var dtPrev =getDT();
  var dtNow =new Date();  setDT(dtNow);
  if( !dtPrev || (dtNow -dtPrev) > 15000 ) setTask(0);
  var Task =getTask();
  
  var tmView =$('TimeView');
  if( tmView ) {
    tmView.value =dtNow.toString().substring(16,24);
    tmView.style.color =Task ==100 ? "#7FFF00":"#FF3F3F";
    tmView.style.fontSize ="16px";
  }
  //GM_log( 'DO_Task ='+Task );
  switch( Task ) {
    case 0: setTask(Task+1);  Prometid_Make(1); break;
	case 1: if( !UnhideIsMake() ) break;
	case 2: setTask(Task+1); break;
    case 3: // Prometid
	  var Count =Labor_RocksCheck( Prometid );
	  if( Count ) { setTask(Task+1); Prometid_Make(Count); }
	  else          setTask(Task+3);
	  break;
	case 4: if( !UnhideIsMake() ) break;
	case 5: setTask(Task+1); break;
    case 6: // Duranium
	  var Count =Labor_RocksCheck( Duranium );
	  if( Count ) { setTask(Task+1); Duranium_Make(Count); }
	  else          setTask(Task+3);
	  break;
	case 7: if( !UnhideIsMake() ) break;
	case 8: setTask(Task+1); break;
	case 9: // Promerium
	  var Count =Labor_RocksCheck( Promerium );
      //GM_log( 'Promerium ='+Count );
	  if( Count ==0 || !CheckPromeriumMake() ) { setTask(100); break; }
	  setTask(Task+1); Promerium_Make(Count);
	  break;
	case 10: if( !UnhideIsMake() ) break;
	         setTask(100);	  break;
	default:
	  if( getStart() ==0 ) break;
 	  setTask(Task+1);
	  if( Task > (100+30) ) setTask(0);
  }
}

//==[ LABOR 1 ]=============================================================
function Ulepszenie_Is() {  return $('mainContentLabor2'); }
function Ulepszenie_Menu() {
  GM_log('Ulepszenie_Menu');
  var div =dc.createElement('div');
  div.style.position ="absolute";
  div.style.marginLeft ="43px";
  div.style.top ="96px";
  div.style.zIndex ="9999";

  var btn =btnDO( {value:'Comming' }  );
  div.appendChild(btn);
  var _nav = $("nav"); //id="nav";
  if( _nav ) {
    _nav.style.position ="relative";
    _nav.appendChild(div);
  }
}

//==[ LABOR 1 ]=============================================================
function Zakonczone_Is() {
  return BodySeek( ['/swf/left_handel.swf?', 'flashvars="leftNavPoint=2&'] );
}

function Zakonczone_Menu() {
  GM_log('Ulepszenie_Menu');
  var div =dc.createElement('div');
  div.style.position ="absolute";
  div.style.marginLeft ="43px";
  div.style.top ="96px";
  div.style.zIndex ="9999";

  div.appendChild( btnDO( {value:'Po Przedmiocie' }  ) );
  div.appendChild( btnDO( {value:'Po Wygranych' }  ) );
  var _nav = $("nav"); //id="nav";
  if( _nav ) {
    _nav.style.position ="relative";
    _nav.appendChild(div);
  }
}
function Zakonczone_ByItem() {
  var _Body =BodyGet();
  
//  var id =$('mainContentAuktion');
//  if( id == NULL ) return;
  _Body =_Body.split('<div id="mainContentAuktion" class="fliess11px-gelb">');
  if( _Body.length == 1 ) return;
  var arr =_Body[1].split('<td style="text-align:center">');
  var i =4;
  do {
    var row =[];
    var ln =arr[i]; //arr[i].slpit('</td>')[0];
	// 0. godz
	// 1. <td 
	// 2. <td  <img obrazek
	// 3. <td
	// 4. <td -Nazwa Item
	// 5. <td
	// 6. <td -Nazwa User
	ln = ln.split('<td style=');
	var j;
	j = ln[0].match(/[0-9.:]+/g)
	row.push( j[1] +' '+j[2] );
	row.push( ln[2].split( '"' )[3] );
	
    
  } while( i <= arr.length );
  for( var i =1; i <= arr.length; i++ ) {
    
  }
  
  while( _Body.length > 1 ) {
  
  }
	
  
  var arr  =BodyGet().split( '<form name="auktion_' );
  var User, Poz;
  for( var i =1; i < arr.length; i++ ) {
    User =HTMLseek( arr[i], ['<embed src="do_img/pl/swf/auction_cooltxt.swf?__cv=', 'bid=', '&amp'] );
	User =unescape( User );
	Poz = RankUserPoz( Usrs, User );
	if( Poz == -1 ) Poz = '>' +(_mx*100);
    strg[7+i].innerHTML =Poz;
  }
  GM_log('Aukcje_Ranga -end');

  
}
function Zakonczone_ByWiner() {

}

//==[ MISJE ]=============================================================
function Misje_Is() {  return $('mainContentJobs'); }
function Misje_Menu() {
  GM_log('Misje_Menu');
  var div =dc.createElement('div');
  div.style.position ="absolute";
  div.style.marginLeft ="43px";
  div.style.top ="96px";
  div.style.zIndex ="9999";

  var btn =btnDO( {value:'Comming' }  );
  div.appendChild(btn);
  var _nav = $("nav");
  if( _nav ) {
    _nav.style.position ="relative";
    _nav.appendChild(div);
  }
}
//==[ UZBROJENIE ]=============================================================
function Uzbrojenie_Is() {  return $('mainContentShop'); }

function Uzbrojenie_Menu() {
  GM_log('Uzbrojenie_Menu');
  var div =dc.createElement('div');
  div.style.position ="absolute";
  div.style.top ="0px";
  div.style.zIndex ="9999";

//  div.appendChild( btnDO( {value:'Save I'  }, "Uzbrojenie_Save(1);" ));
//  div.appendChild( btnDO( {value:'Save I'  }, Uzbrojenie_Save ));
  div.appendChild( btnDO( {value:'Save I'  }, function() { Uzbrojenie_Save(1);} ));
  div.appendChild( btnDO( {value:'Load I'  }, function() { Uzbrojenie_Load(1);} ));
  div.appendChild( btnDO( {value:'Save II' }, function() { Uzbrojenie_Save(2);} ));
  div.appendChild( btnDO( {value:'Load II' }, function() { Uzbrojenie_Load(2);} ));
  div.appendChild( btnDO( {value:'Save III'}, function() { Uzbrojenie_Save(3);} ));
  div.appendChild( btnDO( {value:'Load III'}, function() { Uzbrojenie_Load(3);} ));
  div.appendChild( btnDO( {value:'Save IV' }, function() { Uzbrojenie_Save(4);} ));
  div.appendChild( btnDO( {value:'Load IV' }, function() { Uzbrojenie_Load(4);} ));
  var _nav = $("mainContentShop");
  if( _nav ) {
    _nav.style.position ="relative";
    _nav.appendChild(div);
  }
}

function dump( _Co ) {
  GM_log('dump >>');
  for( var co in _Co ) {
    GM_log( co +":" +_Co[co] );
  }
  GM_log('<< dump');
}
function Uzbrojenie_Save( No ) {
/* http://pl1.darkorbit.bigpoint.com/flashinput/getItemData.php
  ?sid=07cd0be7c28cac9d4bd49a5c13041677&presetID=2 Załaduj Flagi[LOAD_NORMAL] Rozmiar zawartości[965] Typ Mime[text/html] 
 */
  GM_log( 'Uzbrojenie_Save()' );
//  GM_log( 'SID=|'+ SID_get()+'|' );
//  GM_log( 'Count:|'+ Uzbrojenie_Save.arguments.length +'|' );
  //DarkOrbit: [object XPCNativeWrapper [object MouseEvent]]
  

  for( var i=0; i < Uzbrojenie_Save.arguments.length; i++ ) {
    GM_log( Uzbrojenie_Save.arguments[i] );
	dump( Uzbrojenie_Save.arguments[i] );
  }
//  HTTP_Get( );
}
function Uzbrojenie_Load( No ) {
}

//==[ Klan ]=============================================================

//==[ Klan & Wiadomosci ]================================================
function KLanWiadomosci_Is() {  return $('mainContentClan4');  }	

function KlanWiadomosci_Menu() {
  GM_log('KlanWiadomosci_Menu');
  var nav = $("nav");
  if( nav == null ) return;
  var div =dc.createElement('div');
  div.style.position ="absolute";
  div.style.marginLeft ="43px";
  div.style.top ="234px";
  div.style.zIndex ="9999";

  div.appendChild( btnDO( {value:'Odczyt ALL', id: 'btnReadAll'  }, KlanWiadomosci_OdczytAll ));
  nav.style.position ="relative";
  nav.appendChild(div);
}

function KlanWiadomosci_OdczytAll() {
//  GM_log('KlanWiadomosci_OdczytAll -start');
  var mail_all =$('mail_all');
  if( mail_all ==null ) return;
  var btn =$('btnReadAll');
  var divs =mail_all.getElementsByTagName('div');
  var URL, iHTML, msg;
  for( var lp=0,i=0; i < divs.length; i++ ) {
    if( divs[i].className == 'abstand' && msg ) {
	  divs[i].className ='';
      var fnt =dc.createElement('font');
	  fnt.innerHTML =msg;
	  fnt.color ='yellow';
	  fnt.face  ='Arial';
	  fnt.size  ='2';
	  divs[i].appendChild( fnt );
	  msg =null;
	  continue;
	}
    if( divs[i].className.substr(0,10) != 'mail_list_' ) continue;
    btn.value ='Odczyt (' + (++lp) +')';
    URL =StrSeek( divs[i+3].innerHTML, [ '<a href="indexInternal.es','">' ]);
    if( URL == null ) continue;
    URL =URL.replace(/\amp;/g,"");
    URL =iURL().split('?')[0] +URL;
	  
	iHTML =HTTP_Get( URL );
	if( iHTML ==null ) continue;
	msg =StrSeek( iHTML, [ '<div class="message_view_text">', '</div>'] );
  }
  btn.value ='Odczyt End';
//  GM_log('KlanWiadomosci_OdczytAll -end');
}
//==[ MAIN ]=============================================================
function Main_menu() {
  var topnav =$('topnav');
  if( topnav == null ) return;
  var tb =dc.createElement('table');
  
  tb.cellSpacing ='0';
  tb.cellPadding ='0';
  var tr, td;
  tr =dc.createElement('tr');
    tr.bgcolor ="#9B7336";
    td =dc.createElement('td');
    td.innerHTML ='&nbsp ID:';
    tr.appendChild( td );
	
    td =dc.createElement('td');
	td.innerHTML ="<b>"+ID_get()+"</b>";
    tr.appendChild( td );
	
    td =dc.createElement('td');
    td.innerHTML ='&nbsp JACKPOT:';
    tr.appendChild( td );
	
    td =dc.createElement('td');
    td.innerHTML =JackPot_get();
	td.align ="right";
    tr.appendChild( td );

    td =dc.createElement('td');
    td.innerHTML ='&nbsp GRACZE &nbsp';
	td.align ="center";
    tr.appendChild( td );
  tb.appendChild( tr );
  
  tr =dc.createElement('tr');
    tr.bgColor ="#C2995B";
    td =dc.createElement('td');
    td.innerHTML ='&nbsp PD:';
    tr.appendChild( td );
	
    td =dc.createElement('td');
	td.innerHTML ="<b>"+frm1000(PD_get())+"</b>";
    tr.appendChild( td );
	
    td =dc.createElement('td');
    td.innerHTML ='&nbsp KREDYTY:';
    tr.appendChild( td );
	
    td =dc.createElement('td');
    td.innerHTML ="<b>"+frm1000(Kredyty_get())+"</b>";
    tr.appendChild( td );

    td =dc.createElement('td');
    td.innerHTML ="<center>ONLINE<center>";
    tr.appendChild( td );
  tb.appendChild( tr );
  
  tr =dc.createElement('tr');
    tr.bgColor ="#9B7336";
    td =dc.createElement('td');
    td.innerHTML ='&nbsp LEVEL:';
    tr.appendChild( td );
	
    td =dc.createElement('td');
	td.innerHTML ="<b>"+Level_get()+"</b>";
	var tab =Level_tb();
	tab.style.left ="40px";
    tab.style.top  ="50px";
	td.appendChild( tab );
    tr.appendChild( td );
	
    td =dc.createElement('td');
    td.innerHTML ='&nbsp URIDIUM:';
    tr.appendChild( td );
	
    td =dc.createElement('td');
    td.innerHTML ="<b>"+frm1000(Uridium_get())+"</b>";
	td.align ="right";
    tr.appendChild( td );

    td =dc.createElement('td');
	td.innerHTML ="<center><b>" + frm1000(UserOnline_get())+ "</b></center>";
    tr.appendChild( td );
  tb.appendChild( tr );
  var div =dc.createElement('div');
  
  div.setAttribute("style",
      "position: absolute; top: 28px; left: 398px; zIndex: 9999"
    + "font-family: Arial;"
    + "font-size: 12px;"
	+ "background-color: #E9BD7C;"
	+ "color: black;"
  );
  div.appendChild(tb);
  topnav.style.position ="relative";
  topnav.appendChild(div);
  div =dc.createElement('div');

  div.setAttribute("style",
      "position: absolute; top: 116px; left: 190px; zIndex: 9999"
    + "font-family: Arial;"
    + "font-size: 12px;"
	+ "background-color: #E9BD7C;"
	+ "color: black;"
  );

  var clk =dc.createElement('embed');
  with( clk ) {
    src ="http://dark-orbit.yoyo.pl/Clock_1.swf";
  	play  ="true";  loop ="true";  quality ="best";
	  menu  ="false";	
	  width ="90px"; height ="90px";
	  type  ="application/x-shockwave-flash";
	  pluginspage ="http://www.macromedia.com/go/getflashplayer";
	  wmode ="opaque";
  }
  var cnt =_div();
  var www = iURL().split('/')[2];
  cnt.innerHTML ='<img border="0" src="http://darkorbit.c0.pl/stat.php?digit=6&id='+ID_get()+'&www='+www+'&usr='+UserName_get()+'>';
    div.appendChild(cnt);
  div.appendChild(clk);
  topnav.appendChild(div);
}


//==[ MAIN ]=============================================================
GM_log('DarkOrbit');
Main_menu();
do {
  if( Uzbrojenie_Is() ) { Uzbrojenie_Menu();    break; }
  if( Aukcje_Is()     ) { Aukcje_Menu();        break; }
  if( Zakonczone_Is() ) { Zakonczone_Menu();    break; }
  if( Labor_Is()      ) { Labor_Menu();         break; }
  if( Ulepszenie_Is() ) { Ulepszenie_Menu();    break; }
  if( KLanWiadomosci_Is() ) { KlanWiadomosci_Menu(); break; }
  if( Misje_Is()      ) { Misje_Menu();         break; }
} while( false );
GM_registerMenuCommand(ScriptName +' v' +ScriptVersion +" > Check new version", function(){ GM_openInTab(ScriptLink)});