// ==UserScript==
// @name           OGame Tools
// @namespace      http://userscripts.org/scripts/review/59575
// @description    OGame Tools
// @include        *.ogame.onet.pl/*
// @identifier     OGame.user.js
// @version        0.04.01
// @date           2009-10-28
// @author         nic35025
// ==/UserScript==
var ScriptName='OGame Tools';
var ScriptAutor='nic35025';
var ScriptVersion='0.04.01';
var ScriptLink='http://userscripts.org/scripts/review/59575';
//---------------------------------------------------------------------------
var dc=document;
var URL=window.location.href;
function ById(Co){return dc.getElementById(Co);}
function ObjCopy(Dst,Src){for( var el in Src ) Dst[el] =Src[el];return Dst;}
function ArgsToObj(Args){ var bck=[];for( var i=0; i<Args.lenght;i++) bck.push(Args[i]);}
function dcce(Tag,Obj){if((typeof Tag)=='string')Tag=dc.createElement(Tag);
  function Call(arg){switch( typeof(arg)){case 'string':case 'number':Tag[el]=arg; break;
  case 'object':switch((''+arg).substr(0,9)){case '[object O': Tag =dcce(Tag,arg); break;
  default: Tag.appendChild(arg);};break;default:}}if(Obj){if(typeof(Obj.length)=='number'){
  for(var el=0;el<Obj.length;el++) Call(Obj[el]);}
  else{for(var el in Obj)Call(Obj[el]);}}return Tag;}
function c_img(){return dcce('img',arguments);}
function c_div(){return dcce('div',arguments);}
function c_input(){return dcce('input',arguments);}
function c_table(){return dcce('table',arguments);}
function c_tbody(){return dcce('tbody',arguments);}
function c_thead(){return dcce('thead',arguments);}
function c_tfoot(){return dcce('tfoot',arguments);}
function c_tr(){return dcce('tr',arguments);}
function c_th(){return dcce('th',arguments);}
function c_td(){return dcce('td',arguments);}
function c_select(){return dcce('select',arguments);}
function c_option(){return dcce('option',arguments);}
function c_a(){return dcce('a',arguments);}
function c_b(){return dcce('b',arguments);}
function c_center(){return dcce('center',arguments);}
function c_br(){return dcce('br');}
function c_Txt(Txt){return dc.createTextNode(Txt);}
function c_script(js){return dcce('script',{type :'text/javascript',innerHTML:js});}
function tagNames(Co){return dc.getElementsByTagName(Co);}
function tb_arr(){return tagNames('table');}
function a_arr(){return tagNames('a');}
function classNames(Co){return dc.getElementsByClassName(Co); }
function nameNames(Co){return dc.getElementsByName(Co); }
function t(t,Prm,Co){return '<'+t+' '+Prm+'>'+Co+'</'+t+'>';}
function tCenterB(Co){return t('center','',t('b','',Co));}
function isUpper(Co){return 'A'<=Co && Co <='Z';}
function tSpanColor(Color,Txt) { return '<span style="color:'+Color+'">'+Txt+'</span>'; }
//---------------------------------------------------------------------------
function addGlobalStyle(css){var head=tagNames('head')[0];
if(!head)return;head.appendChild(dcce('style',{type:'text/css',innerHTML:css}));}
function addScript(js){tagNames('head')[0].appendChild(c_script(''+js));}
//---------------------------------------------------------------------------
function StrSeek(Str,arr){var bck=Str;
  for(var i=0;i!=arr.length-1;i++){bck=bck.split(arr[i]);
	if(bck.length>1)bck=bck[1];else return null;}
  if(arr[i]){bck=bck.split(arr[i]);bck=bck.length>1 ?bck[0]:null;}
  return bck;
}
//---------------------------------------------------------------------------
function frm1000(Co){return(''+(Co||0)).replace(/(\d)(?=(\d{3})+\b)/g,"$1.");}
function To2d(Co){return('00'+Co||0).substr(-2,2);}
function ToInt(Co){return 1*(Co||'').replace(/\./g,'');}
//---------------------------------------------------------------------------
function BodyGet(){return dc.body.innerHTML;}
function BodySeek(arr){return StrSeek(BodyGet(),arr);}
//---------------------------------------------------------------------------
function HTTP_ReqOnLoad(_url,OnLoad){GM_xmlhttpRequest({method:'GET',url:_url,onload:OnLoad});}
//---------------------------------------------------------------------------
function dump(obj){var bck='';for(var fld in obj)bck+=', '+fld+':"'+obj[fld]+'"';return'['+bck.substr(2)+']';}
//---------------------------------------------------------------------------
function ArrToTr(Arr){var bck=c_tr();
  for(var el in Arr)bck.appendChild(c_td({innerHTML:Arr[el]}));return bck;}
//---------------------------------------------------------------------------
function ArrToTable(Arr){var tb,bck=c_table(tb=c_tbody());
  for(var el in Arr)tb.appendChild(ArrToTr(Arr[el]));return bck;}
//---------------------------------------------------------------------------
function sprintf(frm){
  for(var i=1;i<arguments.length;i++)frm=frm.replace(/\%s/,arguments[i]);
  return frm;}
//---------------------------------------------------------------------------
function ArrDel(Arr,Idx){return(Idx ? Arr.slice(0,Idx):[]).concat(Arr.slice(Idx+1));}
function ArrIns(Arr,Co,Idx){
  return Idx==0? Co.concat(Arr):Arr.slice(0,Idx).concat(Co).concat(Arr.slice(Idx));}
//---------------------------------------------------------------------------
function ObjToStr(Obj){var bck=[];for(var i in Obj)bck.push(i+':'+escape(Obj[i]));return ''+bck;}
//---------------------------------------------------------------------------
function StrToObj(Str) { var bck =[]; Str =Str.split(',');
  for(var i=0;i<Str.length;i++){ var rec=Str[i].split(':'); bck[rec[0]]=unescape(rec[1]);}
  return bck;}
//---------------------------------------------------------------------------
function ArrObjToStr( ArrObj ) {
  for(var i=0;i<ArrObj.length;i++) ArrObj[i]=escape(ObjToStr(ArrObj[i]));
  return ArrObj.join(',');}
//---------------------------------------------------------------------------
function StrToArrObj( Str ) {
  var bck =[];
  if( Str && Str.length ) {
    Str =Str.split(',');
    for(var i =0; i <Str.length; i++ ) bck.push(StrToObj(unescape(Str[i])));
  }
  return bck;
}
//---------------------------------------------------------------------------
function ArrObjAdd( ArrObj,rec ) {
  for(var i=0;i<=ArrObj.length;i++)
    if(ArrObj[i].addr== rec.addr) {ArrObj =ArrDel(ArrObj,i); break;}
  return ArrIns(ArrObj, rec, 0);}
function ArrObjDel( ArrObj,rec ) {
  for(var i=0;i<=ArrObj.length;i++)
    if(ArrObj[i].addr== rec.addr) {ArrObj =ArrDel(ArrObj,i); break;}
  return ArrObj;}
//---------------------------------------------------------------------------
function ArrObjToTable( aHdr,ArrObj,aFunc) {
  var tb =dcce('tbody');
  var tr =c_tr(),td;
  for(var i in aHdr)
    tr.appendChild(c_td({className:'title',innerHTML:aHdr[i]}));
  tb.appendChild(tr);
  for(i=0;i<ArrObj.length;i++ ) {
    Obj =ArrObj[i];
    tr =c_tr();
    for(var j in aHdr){td=c_td();if(aFunc[j]==null)td.innerHTML=Obj[j]||'';
      else td.appendChild(aFunc[j](Obj));
      tr.appendChild(td);
    }
    tb.appendChild(tr); }
  var bck =c_table();
  bck.appendchild(tb);
  return bck;
}
//---------------------------------------------------------------------------
function selPlanetFind(){var bck =tagNames('select'); return bck[0];}
function ResName(No){return StrSeek(ById('resources').rows[1].cells[No].innerHTML,['ff">','<']); }
function ResGet(){var bck={};var tb=ById('resources'); for(var i=0;i<3;i++)
  bck[StrSeek(tb.rows[1].cells[i].innerHTML,['ff">','<'])]=ToInt(tb.rows[2].cells[i].childNodes[0].innerHTML);
  return bck;
}
//---------------------------------------------------------------------------
// Galaxy
//---------------------------------------------------------------------------
function galaxy_Scr() {
  var tbPlanet =ById('galaxy_form').nextElementSibling;
  var max=[0,0];
  for(var iRow =2; iRow < tbPlanet.rows.length-3; iRow++) {
    var Zlom =tbPlanet.rows[iRow].cells[4];
    if(!Zlom)continue;
    var ile=0;
    var Co=StrSeek( Zlom.innerHTML, ['Metal:</th><th>','</']);
    if(Co){Zlom.innerHTML += '<br>Metal:&nbsp;'+Co; ile +=ToInt(Co); }
    var Co=StrSeek(Zlom.innerHTML,['Kryszta','</th><th>','</']);
    if(Co){Zlom.innerHTML+='<br>Kryszta&#322;:&nbsp;'+Co; ile +=ToInt(Co); }
    if(ile){Zlom.innerHTML+='<br><a style="color:yellow;" href="javascript:void(0);"'+
      'onclick="doit(8,'+ // Zbieraj
      nameNames('galaxy')[0].value+','+
      nameNames('system')[0].value+','+
      (iRow-1)+',2,'+ // Pole zniszczeń
      (Math.floor(ile/20000)+1)+')">Zbieraj</a>';
  }
    if( ile > max[0] ) max =[ile,iRow];
    var Gracz =tbPlanet.rows[iRow].cells[5];
    var Co =StrSeek( Gracz.innerHTML, ['miejsce: ','</']);
    if( Co ) Gracz.innerHTML += '<br>Rank: '+Co;
  }
  if(max[0]){var Zlom =tbPlanet.rows[max[1]].cells[4];
    Zlom.innerHTML +='<span style="color:#00FF00">*</span>';
  }
}

function Planets_Change() {
  function selPlanetFind(){var bck =tagNames('select'); return bck[0]; }
  var sP =selPlanetFind();
  if( !sP ) return;
  addGlobalStyle(''
    +'#PltNew{position: fixed; top: 0px; left: 0px;z-Index:101;'
    +  'border:2px solid pink;-moz-border-radius:3px;-webkit-border-radius:3px;}'
    +'#PltDiv{position:relative;}'
    +'.PltHide{display:none;text-align:center;font-weight:bold;background-color:black;'
    +  'position:absolute;top:24px;left:0px;z-Index:100;'
    +  'border:2px solid pink;-moz-border-radius:3px;-webkit-border-radius:3px;}'
    +'.PltHide a:hover{color:yellow;}'
    +'#header_top td:hover .PltHide{display:table;}'
  );
  var PltList;
  var tr =c_tr();
  for( var PltNo=0; PltNo < sP.length; PltNo++ ) {
    tr.appendChild(c_td(c_a({href:sP[PltNo].value, innerHTML:
    PltNo == sP.selectedIndex ? tSpanColor('#00FF00',sP[PltNo].innerHTML):sP[PltNo].innerHTML})));
  }
  tagNames('body')[0].appendChild(c_div({id:'PltNew'},c_table(tr)));
  
  sP.parentNode.appendChild(c_div({id:'PltDiv'},PltList=c_table({id:'PltT1',className:'PltHide'})));
  for( var PltNo=0; PltNo < sP.length; PltNo++ ) {
    PltList.appendChild(c_tr(c_td(c_a({href:sP[PltNo].value, innerHTML:
    PltNo == sP.selectedIndex ? tSpanColor('#00FF00',sP[PltNo].innerHTML):sP[PltNo].innerHTML}))));
  }
  var btnLeft, btnRigth;
  sP.parentNode.appendChild(c_table(c_tr(c_td(btnLeft=c_input({type:'button',value:'<<'})),c_td(),
    c_td(btnRight=c_input({type:'button',value:'>>'})))));
  btnLeft .addEventListener('click',function(){ if( sP.selectedIndex ) {--sP.selectedIndex; unsafeWindow.haha(sP);}}, true);
  btnRight.addEventListener('click',function(){ if( sP.selectedIndex < sP.length-1) {++sP.selectedIndex; unsafeWindow.haha(sP);}}, true);
}

//---------------------------------------------------------------------------
function flotten3_Scr() {
  GM_log("flotten3_Scr ->@");
  dc.getElementsByName('order')[0].checked =true;
  dc.forms[0].submit();
  GM_log("flotten3_Scr <-");
}
//---------------------------------------------------------------------------
function buildings_Scr() {
  function resCheck(txt){for(var el in ress)if(txt.match(el))return ress[el];return null;}
  var ress =ResGet();
  var tbMain =ById('content').getElementsByTagName('table')[1];
  for(var iRow=0;iRow<tbMain.rows.length; iRow++) {
    var cNs=tbMain.rows[iRow].cells[1].childNodes;
	for(var iCh=0;iCh<cNs.length;iCh++ ) {
	  var resCount =resCheck(cNs[iCh].textContent);
	  if(!resCount) continue;
	  cNs[iCh-1].innerHTML +='<br>';
	  var resE=ToInt(cNs[++iCh].textContent);
      if(resCount<resE)cNs[iCh].innerHTML+='('+tSpanColor('yellow',frm1000(resE-resCount))+')';
	}
  }
}
//---------------------------------------------------------------------------
function flotten1_Scr() {
  function ResNo(Co){for(var i=0;i<5;i++)if(Co==ResName(i))return i;return -1;}
  function ResFindDst(Co){for(var i=0;i<resFly.length;i++)if(resFly[i].Dst==Co)return i;return -1;}
  function PlanetName(Addr){var sP=selPlanetFind(); for(var i=0;i<sP.length;i++ )
    if( sP[i].innerHTML.indexOf(Addr) != -1 ) return sP[i].innerHTML.split(String.fromCharCode(9))[0];return '';}
  var resFly =[];
  var tbMain =tagNames('th')[0].parentNode.parentNode.parentNode;
  for( var iRow=2; iRow < tbMain.rows.length; iRow++ ) {
    var tr=tbMain.rows[iRow];
    var res=StrSeek(tr.cells[1].innerHTML,['title="',' "']);
	if(!res) continue;
    res=res.split(' ');
	if( !res ) continue;
    var Dst =tr.cells[5].innerHTML.replace('<br>','');
	var iNo =ResFindDst(Dst);
	if( iNo ==-1 ) iNo=resFly.push({Dst:Dst,Planet:PlanetName(StrSeek(Dst,['">','<']))})-1;
    for(var i=0;i<res.length;i+=2 ) {
	  var Name=res[i].split(':')[0];
	  resFly[iNo][Name]= (resFly[iNo][Name]||0)+ToInt(res[i+1]);
	}
  }
  addGlobalStyle(''
    +'.nic{border:2px solid pink;-moz-border-radius:3px;-webkit-border-radius:3px;}'
	+'.nic td{padding:0px 5px 0px 5px;}'
	+'.nic_r{text-align:right;}'
  );  
  var tbDst,Dst=tbMain.parentNode;
  Dst.insertBefore(c_table({width:519, className:'nic'},tbDst=c_tbody(
      c_tr(c_th({innerHTML:tbMain.rows[1].cells[5].innerHTML}),c_th({innerHTML:'Planet'})))),Dst.childNodes[3]);
  for(iNo=0;iNo<3;iNo++){tbDst.rows[0].appendChild(c_th({innerHTML:ResName(iNo)})) };
  resFly.forEach(function(rec){var tr; tbDst.appendChild(
    tr=c_tr(c_td({innerHTML:rec.Dst}),c_th({innerHTML:rec.Planet})));
    for(iNo=0;iNo<3;iNo++) tr.appendChild(c_td({className:'nic_r',innerHTML:frm1000(rec[ResName(iNo)])}));
  });
  var tb =dc.forms[dc.forms.length-1].childNodes[1];
  for(var iRow=2;iRow<tb.rows.length-4;iRow++){
    var cell=tb.rows[iRow].cells[3];
	var inp=cell.childNodes[0];
	var aL =c_a({href:'javascript:shipChg("'+inp.name+'",-1)',innerHTML:'<b><<</b> '});
	var aR =c_a({href:'javascript:shipChg("'+inp.name+'", 1)',innerHTML:' <b>>></b>'});
	cell.insertBefore( aL, inp );
	cell.appendChild(aR);
  }
  addScript('function shipChg(name,chg){var inp=document.getElementsByName(name)[0];var val=1*inp.value+chg; if(val>=0)inp.value=val;}'); 
}
//---------------------------------------------------------------------------
GM_log("Start");
var _screen=StrSeek(URL,['page=','&']); //.replace(/\//g,"_");
GM_log(_screen);
Planets_Change();
switch(_screen){
  case 'galaxy':galaxy_Scr();break;
  case 'b_building':
  case 'buildings':buildings_Scr();break;
  case 'flotten1':flotten1_Scr();break;
//  case 'flotten3':  flotten3_Scr(); break;
}
GM_registerMenuCommand(ScriptName +' v' +ScriptVersion +" > Check new version", function(){ GM_openInTab(ScriptLink)});
GM_log("Stop");
