// ==UserScript==
// @name           TWars AddOn
// @namespace      TWars AddOn
// @description    TWars AddOn
// @include        *twars.pl/*
// @identifier     TWars.user.js
// @version        1.12.0
// @date           2009-12-04
// @author         nic35025
// ==/UserScript==
var ScriptName='TWars_AddOn';
var ScriptAutor='nic35025';
var ScriptVersion='1.12.0';
//var ScriptLink='http://userscripts.org/scripts/show/64287';

var twarsPath ='http://www.twars.pl/';
var shersoftPath ='http://shersoft.lh.pl/graphic/twars_1/';
//---------------------------------------------------------------------------
var dc=document;
var URL=window.location.href;

function By(Co){
  if(Co[0]=='#')return dc.getElementsByName(Co.substr(1));
  if(Co[0]=='.')return dc.getElementsByClassName(Co.substr(1));
  return dc.getElementById(Co);}
function ById(Co){return dc.getElementById(Co);}
function ObjCopy(Dst,Src){for( var el in Src ) Dst[el] =Src[el];return Dst;}
function ArgsToObj(Args){ var bck=[];for( var i=0; i<Args.lenght;i++) bck.push(Args[i]);}

function dcce(Tag,Obj){if((typeof Tag)=='string')Tag =dc.createElement(Tag);
  function Call(el,arg){switch(el){case 'click':Tag.addEventListener('click',arg,true);return;
  case 'style':Tag.setAttribute('style',arg);return;case 'class':Tag.className=arg;return;}
  switch( typeof(arg)){case 'string': case 'number':Tag[el]=arg;break;
  case 'object': switch((''+arg).substr(0,9)){case '[object O':Tag =dcce(Tag,arg);break;
  default: Tag.appendChild(arg);}; break; default:}}
  if(Obj){if(typeof(Obj.length)=='number'){for(var el=0;el<Obj.length;el++)Call(el,Obj[el]);}
  else{for(var el in Obj ) Call(el,Obj[el]);}}return Tag;
}
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
function c_inp_img(){return dcce('input',{type:'image',borderWidths:'0px'});}
function c_inp_cb(){return dcce('input',{type:'checkbox'})}
function c_script(js){return dcce('script',{type :'text/javascript',innerHTML:js});}
function tagNames(Co){return dc.getElementsByTagName(Co);}
function tb_arr(){return tagNames('table');}
function a_arr(){return tagNames('a');}
function isUpper(Co){return 'A'<=Co && Co <='Z';}
function classNames(Co){return dc.getElementsByClassName(Co); }
function nameNames(Co){return dc.getElementsByName(Co);}
function t(t,Prm,Co){return '<'+t+' '+Prm+'>'+Co+'</'+t+'>';}
function tCenterB(Co){return t('center','',t('b','',Co));}
function tSpanColor(Color,Txt) { return t('span','style="color:'+Color+'"',Txt);}
function addGlobalStyle(css){var head=tagNames('head')[0];if(!head)return;head.appendChild(dcce('style',{type:'text/css',innerHTML:css}));}
function addClick(o,func){o.addEventListener("click",func,true);return o;}
function addScript(js){tagNames('head')[0].appendChild(c_script(''+js));}
function Event(Obj,Name){var oE=dc.createEvent("HTMLEvents");oE.initEvent(Name,true,true);Obj.dispatchEvent(oE);}
function frm1k(Co){return(''+(Co||0)).replace(/(\d)(?=(\d{3})+\b)/g,"$1.");}
function TimeToNo(Co){Co=Co.split(':');return 3600*Co[0]+60*Co[1]+1*Co[2];}
function TimToNo(Co){Co=Co.split(' ');bck=0;
  for(var i=0;i<Co.length;i++ )switch(Co[i].substr(0,2)){case'dn':
  case'dz':bck+=24*3600*Co[i-1];break;case'go':bck+=3600*Co[i-1];break;
  case'mi':bck+=60*Co[i-1];break;case'se':bck+=1*Co[i-1];break;}return bck;}
function TimToStr(Tm1s){var bck='',i=0;do{switch(i){
  case 0:bck=To2d(Tm1s%60); Tm1s/=60;break;
  case 1:bck=To2d(Tm1s%60)+':'+bck;Tm1s/=60;break;
  case 2:bck=To2d(Tm1s%24)+':'+bck;Tm1s/=24;break;
  case 3:bck=Tm1s +(Tm1s>1?' dni ':unescape(' dzie%u0144 '))+bck;Tm1s=0; break;}
  Tm1s =Math.floor(Tm1s);}while(++i<3||Tm1s);return bck;
}
function StrToDateTime(Str){var dt=new Date();Str=Str.match(/(\d+)/g);
  dt.setFullYear(Str[0]);dt.setMonth(Str[1]-1);dt.setDate(Str[2]);
  dt.setHours(Str[3]);dt.setMinutes(Str[4]);dt.setSeconds(Str[5]);return dt;}
function To2d(Co){return('00'+Co||0).substr(-2,2);}
function ToInt(Co){return 1*(Co||'').replace(/\./g,'');}
function HTTP_ReqOnLoad(_url,OnLoad){GM_xmlhttpRequest({method:'GET',url:_url,onload:OnLoad});}
function dump(obj){
  if(obj.length){var bck={};for(var i=0;i<obj.length;i++)bck[i]=obj[i];obj=bck;}
  var bck='';for(var fld in obj)bck+=', '+fld+':"'+obj[fld]+'"';return'['+bck.substr(2)+']';}
function ArrToTr(Arr){var bck=c_tr();for(var el in Arr)bck.appendChild(c_td({innerHTML:Arr[el]}));return bck;}
function ArrToTable(Arr){var tb,bck=c_table(tb=c_tbody());for(var el in Arr)tb.appendChild(ArrToTr(Arr[el]));return bck;}
function sprintf(frm){for(var i=1;i<arguments.length;i++)frm=frm.replace(/\%s/,arguments[i]);return frm;}
function ArrDel(Arr,Idx){return(Idx ? Arr.slice(0,Idx):[]).concat(Arr.slice(Idx+1));}
function ArrIns(Arr,Co,Idx){
  return Idx==0? Co.concat(Arr):Arr.slice(0,Idx).concat(Co).concat(Arr.slice(Idx));}
function forEach(obj,func){
  function _chk(id,obj){if(typedef(obj)=='object')forEach(obj,func);else func(id,obj);}
  if(obj.length==null)for(var id in obj)_chk(id,obj[id]);
  else for(var id=0;id<obj.length;id++)_chk(id,obj[id]);}
function ObjToStr(Obj){var bck=[];for(var i in Obj)bck.push(i+':'+escape(Obj[i]));return ''+bck;}
function StrToObj(Str){var bck=[]; Str=Str.split(',');
  for(var i=0;i<Str.length;i++){var rec=Str[i].split(':');bck[rec[0]]=unescape(rec[1]);}return bck;}
function ArrObjToStr(ArrObj){for(var i=0;i<ArrObj.length;i++) ArrObj[i]=escape(ObjToStr(ArrObj[i]));return ArrObj.join(',');}
function StrToArrObj(Str){var bck=[];if(Str && Str.length){Str=Str.split(',');
  for(var i =0; i <Str.length; i++ ) bck.push(StrToObj(unescape(Str[i])));}return bck;}
function ArrObjAdd(ArrObj,rec){for(var i=0;i<=ArrObj.length;i++)if(ArrObj[i].addr== rec.addr){ArrObj=ArrDel(ArrObj,i);break;}return ArrIns(ArrObj,rec,0);}
function ArrObjDel(ArrObj,rec){for(var i=0;i<=ArrObj.length;i++)if(ArrObj[i].addr== rec.addr) {ArrObj =ArrDel(ArrObj,i);break;}return ArrObj;}
function ArrObjToTable( aHdr,ArrObj,aFunc){var tb =dcce('tbody');var tr=c_tr(),td;for(var i in aHdr)
  tr.appendChild(c_td({className:'title',innerHTML:aHdr[i]}));
  tb.appendChild(tr);for(i=0;i<ArrObj.length;i++ ){Obj =ArrObj[i];tr =c_tr();for(var j in aHdr){td=c_td();
  if(aFunc[j]==null)td.innerHTML=Obj[j]||'';else td.appendChild(aFunc[j](Obj)); tr.appendChild(td);}
  tb.appendChild(tr);}
  var bck=c_table();bck.appendChild(tb);return bck;}
//---------------------------------------------------------------------------
function city_res_per_day_Pg(Co){if(Co)return;
  var tb =ById('status');for(var iRow=1;iRow<=5;iRow++){var oRow=tb.rows[iRow],oCell =oRow.cells[1];
  oCell.innerHTML+= ' (+'+frm1k(oCell.innerHTML.match(/\d+/)*24)+'/d)';}}
//---------------------------------------------------------------------------
function city_kolejka_up_Pg(Co){if(Co)return;
  var oDst=ById('main'),oSrc=classNames('build');for(var iNo=0;iNo<oSrc.length;iNo++){
  var obj =oSrc[oSrc.length-1], _parent =obj.parentNode;oDst.insertBefore( obj.cloneNode(true),oDst.firstChild);
  _parent.removeChild(obj);}
  oDst=By('.barracks_wrap')[0];if(oDst) oDst.style.marginTop ='10px';
}
//---------------------------------------------------------------------------
function city_mem(Co){if(Co)return;
  var oProv =ById('nav:provinces'),cityNo=oProv.value,oStatus=ById('status').rows;
  var oCity={nazwa:oStatus[0].cells[1].textContent,morale:oStatus[6].cells[1].textContent,
    zadowolenie:oStatus[7].cells[1].textContent,zabudowanie:ToInt(oStatus[8].cells[1].textContent.split(' / ')[0]),
    rozmiar:ToInt(oStatus[8].cells[1].textContent.split(' / ')[1]),
  };
  var oBuilds=classNames('build');if(oBuilds){for(var i=1;i<oBuilds.length;i++){
    var oBc=oBuilds[i].rows[0].cells;if(!oCity.budowle)oCity.budowle=[];
    oCity.budowle.push({item:oBc[0].textContent,time:oBc[2].textContent});}}
  GM_log( ObjToStr(oCity));
}
//---------------------------------------------------------------------------
function barrack_View_Pg(){
  addGlobalStyle('.red{color:red;font-weight:bold;}#title{text-align:left;}');
  HTTP_ReqOnLoad(twarsPath+'pages/barracks.seam?actionMethod=pages%2Fbarracks.xhtml%3ArequirementsAction.requirements',
    function(Req){var oDst=ById('barracksForm').childNodes[3],dstCnt =oDst.rows.length;
      function _Check(Co){for(var iRow=1;iRow<dstCnt;iRow++){
        var oRow=oDst.rows[iRow],Name=oRow.cells[1].getElementsByTagName('a')[0].innerHTML;if(Name==Co)return true;}}
      var divHide=c_div({innerHTML:Req.responseText}),oSrc =divHide.getElementsByClassName('requirements');
      oSrcRows =oSrc[1].childNodes[3].rows;for(var iRow=0;iRow<oSrcRows.length;iRow++){
        var oRow =oSrcRows[iRow],oA =oRow.cells[0].childNodes[0];if(_Check(oA.innerHTML)) continue;
        var no =oA.href.match(/constrType=(\d+)&/)[1];oDst.childNodes[1].appendChild(c_tr(
           c_td(c_img({src:shersoftPath+'constr/'+no+'.gif'}))
          ,oRow.cells[0],dcce(oRow.cells[1].cloneNode(true),{colSpan:5}),c_td({colSpan:3})
        ));
  }});}
//---------------------------------------------------------------------------
function city_build_View_Pg() {
  addGlobalStyle('.red{color:red;font-weight:bold;}#title{text-align:left;}');
  HTTP_ReqOnLoad(twarsPath+'pages/barracks.seam?actionMethod=pages%2Fbarracks.xhtml%3ArequirementsAction.requirements',
    function(Req){var oDst=ById('cbForm').childNodes[5],dstCnt=oDst.rows.length;
      function _Check(Co){for(var iRow=1;iRow<dstCnt;iRow++){
        var oRow =oDst.rows[iRow], Name=oRow.cells[0].getElementsByTagName('a')[0].innerHTML.split(' (')[0];
        if(Name==Co) return true;}}
      var oHide=c_div({innerHTML:Req.responseText}),oSrc=oHide.getElementsByClassName('requirements');
      oSrcRows=oSrc[0].childNodes[3].rows;
      for(var iRow=0;iRow<oSrcRows.length;iRow++){var oRow =oSrcRows[iRow],oA=oRow.cells[0].childNodes[0];
        if(_Check(oA.innerHTML))continue;
        var no =oA.href.match(/constrType=(\d+)&/)[1];
        oDst.childNodes[1].appendChild(c_tr(oRow.cells[0],dcce(oRow.cells[1],{colSpan:5}),c_td()));
    }});}
//---------------------------------------------------------------------------
var ResID =['iron','stone','wood','gold','people'];
function ResGet(){var res ={};ResID.forEach(function(id){res[id]=ToInt(ById(id).innerHTML)});return res;}

function city_build_enought_Pg(){function _resCheck(oCell,id){var iCost=ToInt(oCell.innerHTML);
    if(iCost>res[id])oCell.innerHTML=tSpanColor('#FF0000',oCell.innerHTML);}
  var tb=ById('cbForm').getElementsByTagName('table')[0],res =ResGet();
  for(var iRow=1; iRow<tb.rows.length; iRow++){var oRow =tb.rows[iRow];
    for(var iCol=0; iCol<4;iCol++) _resCheck( oRow.cells[iCol+1],ResID[iCol] );}
}
//---------------------------------------------------------------------------
function new_mission_Btns(Co){if(Co)return;
  addGlobalStyle('.nicHN{float:left;}');
  var oDst =classNames('nowamisja-nawigacja-bottom')[0];oDst.appendChild( oDst=c_div({className:'nicHN'}));
  var oSel=nameNames('newMissionForm:j_id122')[0];
  var i=oSel.length; while(i--){oDst.appendChild( c_input({type:'button',value:oSel[i].innerHTML,
      className:'nowamisja-nawigacja-button',click:(function(oSel,Co){return function(){oSel.value =Co; 
        var oInp=ById('newMissionForm:j_id119');if(oInp)oInp.click();}})(oSel,oSel[i].value)}));
  }
}
//---------------------------------------------------------------------------
function ProvObj(){return ById('nav:provinces')}
function ProvSet(No){var oProv=ProvObj();oProv.value=No;Event(oProv,"change")}
function ProvChg(i){var oProv=ProvObj(),No=1*oProv.value+i;ProvSet(No<0?oProv.length-1:No<oProv.length?No:0)}
  
function cities_View(Co){if(Co)return;
  var oProv =ProvObj();if(!oProv)return;var oParent=oProv.parentNode,oTb;
  addGlobalStyle(''
   +'#nicShow{position:realtive;font-weight:bold;}'
   +'#nicHide{position:absolute;display:none;z-Index:100;font-size:10px;}'
   +'#nicShow:hover #nicHide{display:block;}'
   +'#nicTb{border-right:1px solid #6B583A;border-bottom:1px dotted #6B583A;background:#F1DEC0;text-align:center;width:500px;}'
   +'#nicTb a{cursor:pointer;}#nicTb a:hover{text-decoration:underline !important;}'
   +'#nicSpVT{background:url('+shersoftPath+'game/ramka-top.png) no-repeat scroll 0 0;padding:6px 0 0;}'
   +'#nicSpVB{background:url('+shersoftPath+'game/ramka-top.png) no-repeat scroll 0 0;padding:0 6px 6px;}'
   +'#nicAR{text-align:right}'
   +'#nicLR{float:right;width:32px;z-Index:100;margin-top:-110px;}'
  );
  oParent.insertBefore( oDiv=c_div({id:'nicShow'}),oProv);
  oDiv.appendChild(oProv);
  oDiv.appendChild(c_div({id:'nicHide'},c_div({id:'nicSpVT'}),c_table({id:'nicTb'},oTb=c_tbody()),c_div({id:'nicSpVB'})));
  var oDst =c_div({id:'nicLR'},
    c_img({height:32,src:shersoftPath+'statistics/double_left.gif',click:function(){ProvChg(-1)}}),
    c_img({height:32,src:shersoftPath+'statistics/double_right.gif',click:function(){ProvChg(1)}}) );
  oParent.appendChild(oDst);for(var oTr,colCount=3,i=0;i<oProv.length;i++){if(!oTr)oTr=c_tr();
    oTr.appendChild(c_td({id:'nicAR',innerHTML:(i+1)+'.'}));oTr.appendChild(c_td(c_a({
       innerHTML: oProv.value==oProv[i].value?tSpanColor('green',oProv[i].innerHTML)
         :oProv[i].innerHTML,click:(function(No){return function(){ProvSet(No)}})(oProv[i].value)})));
    if((i%colCount)==(colCount-1)){oTb.appendChild(oTr);oTr=null;}}if(oTr&&oTr.cells.length)oTb.appendChild(oTr);
}
function res_store_view(Co){if(Co)return;
  addGlobalStyle(''
   +'#nicDiv{border:1px solid black;height:5px;width:86px}'
   +'#nicResB_iron{float:left;background:silver;height:5px;}'
   +'#nicResB_stone{float:left;background:grey;height:5px;}'
   +'#nicResB_wood{float:left;background:brown;height:5px;}'
   +'#nicResB_gold{float:left;background:gold;height:5px;}'
   +'#nicResB_people{float:left;background:#00FF00;height:5px;}'
  );
  ResID.forEach(function(el){
    var o=ById(el), oTd=o.parentNode,oD,tip;
    oTd.appendChild( c_div({id:'nicDiv'},oD=c_div({id:'nicResB_'+el})));
    tip =oTd.firstChild.getAttribute("title").match(/([0-9.]+)/g);
    oD.style.width =Math.floor(86*ToInt(tip[0])/ToInt(tip[1]))+'px';
  });
}
//---------------------------------------------------------------------------
var AddOns ={
  session_expired:{f:function(){window.location.href =window.location.href.match(/(.+)ses/)[1]},s:'pg.expired',d:'Przejscie do strony logowania po minieciu czasu sesji'}
  ,city_build:[{f:city_build_enought_Pg, s:'pg.city_build.enought', d:'Zaznaczenie na czerwono ktorych surowcĂłw brakuje do budowy'},{f:city_build_View_Pg, s:'pg.city_build_View', d:'Pokazanie wszystkich budynkow'}]
  ,city:[{f:city_mem},{f:city_kolejka_up_Pg, s:'pg.city_kolejka_up', d:'Przeniesienie kolejki budowy do gory'},{f:city_res_per_day_Pg, s:'pg.city_res_per_day', d:'Oblicznie produkcji na dzien'}]
  ,barracks:[{f:city_kolejka_up_Pg, s:'pg.barracks_kolejka_up', d:'Przeniesienie kolejki budowy do gory'},{f:barrack_View_Pg, s:'pg.barrack_View',d:'Wyswietlanie wszystkich jednostek z konstrukcji'}]
  ,new_mission:{f:new_mission_Btns, s:'pg.new_mission_Btns', d:'Przyciski wyboru misji'}
  ,'*':[{f:cities_View, s:'pg.cities_View', d:'Wybor miast z pokazywanej tabeli'},{f:res_store_view,s:'pg.res_store_view',d:'Widok wypelnienia magazynow'}]
  ,properties: properties_Pg
};
//---------------------------------------------------------------------------
function properties_Pg() {
  var oDst =classNames('logowanie')[0];
  if( !oDst ) return;
  addGlobalStyle('.nicProp{font-size:10px;padding:2px 4px 2px 4px;margin:2px 2px 2px 2px;}'
    +'.nicProp input{margin:2px 10px 2px 4px !important;}');
  var oProp =c_div({id:'nic'}),AddCount =0;oDst.appendChild(oProp);
  function PropAdd(o){AddCount++;if(typeof(o)=='function'||!o.s)return;
    var oCB =c_inp_cb();oCB.id =o.s;oCB.checked =GM_getValue(oCB.id,1);
    addClick(oCB, function(){var oCB=ById(o.s);if(oCB)GM_setValue(o.s,oCB.checked?1:0);});
    oProp.appendChild(c_div({className:'nicProp'},oCB,c_Txt(o.d)));
  }
  for(var AddOn in AddOns){var oDstSub=c_div({className:'nicHdr',innerHTML:t('h1','','AddOn :'+AddOn)});
    oProp.appendChild(oDstSub);var oAddOn =AddOns[AddOn];
    if(oAddOn.length)oAddOn.forEach(function(el){PropAdd(el);});else PropAdd(oAddOn);
  }
  oProp.appendChild(c_div({className:'nicProp',innerHTML:AddCount+'. Dodatków'}));
}
function AddOnGet(Co){var bck=GM_getValue(Co,1);Co='_'+Co;
  if(typeof(bck)=='undefined'){bck =unsafeWindow[Co];if(typeof(bck)=='undefined')bck =1;}
  else{unsafeWindow[Co] =bck;}return bck;
}
function AddOnEval(Co,Args){var oAddOn=AddOns[Co];switch(typeof(oAddOn)){
  case 'function':oAddOn(Args);break;
  case 'object':if(oAddOn.length)oAddOn.forEach(function(el){if(!el.s || AddOnGet(el.s)) el.f(Args);});else
      if(!oAddOn.s || AddOnGet(oAddOn.s))oAddOn.f(Args);break;
  default:GM_log("AddOns["+Co+"] -Undefined");}
}
function _main(Co){AddOnEval(_pg,Co);AddOnEval('*',Co);}
//---------------------------------------------------------------------------
GM_log("Start");
var _pg=URL.match(/(\w+)\.seam/);_pg=_pg&&_pg.length>1?_pg[1]:'';

if(unsafeWindow.A4J){var _AJAX=unsafeWindow.A4J.AJAX,_status=_AJAX.status;
  _AJAX.status=function(){var a=arguments,bck=_status(a[0],a[1],a[2]);
  if(!a[2]){_main(true);if(_AJAX.nic)_AJAX.nic(true);}return bck;}}
      
_main();
GM_registerMenuCommand(ScriptName+' v' +ScriptVersion+" > Check new version",function(){GM_openInTab(ScriptLink)});
GM_log("Stop");
