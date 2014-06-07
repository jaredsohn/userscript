// ==UserScript==
// @name           SGUni Tools
// @namespace      SGUni Tools
// @description    SGUni Tools
// @include        *sguni.pl/*
// @identifier     SGUni.user.js
// @version        1.01.23
// @date           2010-04-04
// @author         nic35025
// ==/UserScript==
var ScriptName='SGUni_Tools';
var ScriptAutor='nic35025';
var ScriptVersion='1.01.22';
var ScriptLink='http://userscripts.org/scripts/show/54034';

var gifNotatnik ='data:image/gif;base64,R0lGODdhEAAQAIQAAdTQyM7Ozt7e3v///8bGxvf39+/v7+fn57XGpXOcWnuUa4yle4StY7XWlNbnvYy9a1KMKZSthLXWjIy9YzlrIUp7MbXWnDlrGDlzIYS9WoSlcwAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAABAVmIAAEZFkKYhoMbNsSqDoUNG0YwwHLxVzjtN3I9XMFRCuX73YYHIfKJe6ZjNacyGiLhoVGEQmFYpH9MhqOByTidSkkjcFkQmm3KpZW42JnYSYZAxl0fQMREBMNE2tIJiUKFBcUGgAhADs=';
var imgPath ='http://sguni.lh.pl/graphic/sguni_3/graph/';
var gifArrowLeft =imgPath+'statistics/left.png';
var gifArrowRight =imgPath+'statistics/right.png';
//---------------------------------------------------------------------------
const jv='javascript:void(0);';
var dc=document;
var URL=window.location.href;
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
function c_span(){return dcce('span',arguments);}
function c_input(){return dcce('input',arguments);}
function c_inp_img(){return dcce('input',{type:'image',borderWidths:'0px'});}
function c_inp_cb(){return dcce('input',{type:'checkbox'})}
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
function isUpper(Co){return 'A'<=Co && Co <='Z';}
function classNames(Co){return dc.getElementsByClassName(Co); }
function nameNames(Co){return dc.getElementsByName(Co);}
function t(t,Prm,Co){return '<'+t+' '+Prm+'>'+Co+'</'+t+'>';}
function tCenterB(Co){return t('center','',t('b','',Co));}
//---------------------------------------------------------------------------
function addGlobalStyle(css){var head=tagNames('head')[0];
if(!head)return;head.appendChild(dcce('style',{type:'text/css',innerHTML:css}));}
function addClick(o,func){o.addEventListener("click",func,true);return o;}
function addScript(js){tagNames('head')[0].appendChild(c_script(''+js));}
//---------------------------------------------------------------------------
function StrSeek(Str,arr){var bck=Str;
  for(var i=0;i!=arr.length-1;i++ ){bck=bck.split(arr[i]);
	if(bck.length>1)bck=bck[1];else return null;}
  if(arr[i]){bck=bck.split(arr[i]);bck=bck.length>1 ?bck[0]:null;}
  return bck;}
//---------------------------------------------------------------------------
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
function To2d(Co){return('00'+Co||0).substr(-2,2);}
function ToInt(Co){return 1*(Co||'').replace(/\./g,'');}
function HTTP_ReqOnLoad(_url,OnLoad){GM_xmlhttpRequest({method:'GET',url:_url,onload:OnLoad});}
//---------------------------------------------------------------------------
function dump(obj){if(obj.length){var bck={};for(var i=0;i<obj.length;i++)bck[i]=obj[i];obj=bck;}
  var bck='';for(var fld in obj)bck+=', '+fld+':"'+obj[fld]+'"';return'['+bck.substr(2)+']';}
function sprintf(frm){for(var i=1;i<arguments.length;i++)frm=frm.replace(/\%s/,arguments[i]);return frm;}
//---------------------------------------------------------------------------
function ArrToTag(oDst,Tag,Arr){Arr.forEach(function(el){oDst.appendChild(dcce(Tag,{innerHTML:el}))});return oDst;}
function ArrToTr(Arr){var bck=c_tr();for(var el in Arr)bck.appendChild(c_td({innerHTML:Arr[el]}));return bck;}
function ArrToTable(Arr){var tb,bck=c_table(tb=c_tbody());for(var el in Arr)tb.appendChild(ArrToTr(Arr[el]));return bck;}
function ArrDel(Arr,Idx){return(Idx ? Arr.slice(0,Idx):[]).concat(Arr.slice(Idx+1));}
function ArrIns(Arr,Co,Idx){return Idx==0? Co.concat(Arr):Arr.slice(0,Idx).concat(Co).concat(Arr.slice(Idx));}
//---------------------------------------------------------------------------
function ObjToStr(Obj){var bck=[];for(var i in Obj)bck.push(i+':'+escape(Obj[i]));return ''+bck;}
function StrToObj(Str) { var bck =[]; Str =Str.split(',');
  for(var i=0;i<Str.length;i++){ var rec=Str[i].split(':'); bck[rec[0]]=unescape(rec[1]);}
  return bck;}
function ArrObjToStr( ArrObj ) {
  for(var i=0;i<ArrObj.length;i++) ArrObj[i]=escape(ObjToStr(ArrObj[i]));
  return ArrObj.join(',');}
//---------------------------------------------------------------------------
function StrToArrObj(Str){var bck=[];if(Str&&Str.length){Str=Str.split(',');
  for(var i =0; i <Str.length; i++ ) bck.push(StrToObj(unescape(Str[i])));}return bck;}
//---------------------------------------------------------------------------
function ArrObjAdd(ArrObj,rec){for(var i=0;i<=ArrObj.length;i++)
  if(ArrObj[i].addr== rec.addr) {ArrObj =ArrDel(ArrObj,i); break;}return ArrIns(ArrObj,rec,0);}
function ArrObjDel( ArrObj,rec ){for(var i=0;i<=ArrObj.length;i++)
  if(ArrObj[i].addr== rec.addr) {ArrObj =ArrDel(ArrObj,i); break;}return ArrObj;}
//---------------------------------------------------------------------------
function ArrObjToTable( aHdr,ArrObj,aFunc){var tb=c_tbody(),tr=c_tr(),td;
  for(var i in aHdr)tr.appendChild(c_td({className:'title',innerHTML:aHdr[i]}));
  tb.appendChild(tr);for(i=0;i<ArrObj.length;i++ ){Obj=ArrObj[i];tr=c_tr();for(var j in aHdr){
  td=c_td();if(aFunc[j]==null)td.innerHTML=Obj[j]||'';else td.appendChild(aFunc[j](Obj));
  tr.appendChild(td);}tb.appendChild(tr);}var bck=c_table();bck.appendChild(tb);return bck;}
function t(tg,prm,co){return "<"+tg+(prm?" "+prm:"")+">"+(co||"")+"</"+tg+">";}
function tCenterB(Co){return t('center','',t('b','',Co));}
function tSpanColor(Color,Txt){return t('span','style="color:'+Color+'"',Txt);}
//---------------------------------------------------------------------------
// Bibloteka lokalnych funkcji
//---------------------------------------------------------------------------
function urlPg(pg,xhtml,act){ xhtml=xhtml||pg; act=act||pg; return _url
  +'/pages/'+pg+'.seam?actionMethod=pages%2F'+xhtml+'.xhtml%3A'+act+'Action.'+act +'&cid='+_cid;}
function pgURL(pg,xhtml,act){ xhtml=xhtml||pg; act=act||pg; return _url
  +'/pages/'+pg+'.seam?actionMethod=pages%2F'+xhtml+'.xhtml%3A'+act+'Action.'+act;}
function oMenu(No){return classNames("menu")[0].getElementsByTagName('a')[No];}
function urlPlaneta(){return oMenu(0).href;}
function urlProdukcja(){return oMenu(1).href;}
function urlBudynki(){return oMenu(2).href;}
function urlLaboratorium(){return oMenu(3).href;}
function urlTechnologie(){return oMenu(4).href;}
function urlAkademia(){return oMenu(5).href;}
function urlCentrumRakietowe(){return oMenu(6).href;}
function urlStocznia(){return oMenu(7).href;}
function urlFlota(){return oMenu(8).href;}
function urlKontoImperator(){return oMenu(9).href;}
function urlCentrumDowodzenia(){return oMenu(10).href;}
function urlObrona(){return oMenu(11).href;}
function urlGalaktyka(){return oMenu(12).href;}
function urlReklamuj_SGUni(){return oMenu(13).href;}
function oGwiezdneWrota(){return oMenu(14);}
function urlGwiezdneWrota(){return oGwiezdneWrota().href;}
function urlSojusz(){return oMenu(15).href;}
function oCywilizacja(){return oMenu(16);}
function urlCywilizacja(){return oCywilizacja().href;}
//function urlChat(){return oMenu(17).href;}
function urlChat(){return _url+'/pages/emails.seam?cid='+_cid+'&actionMethod=pages%2Femails.xhtml%3AchatAction.chat';}
function urlWlasciwosci(){return oMenu(18).href;}
function urlUstawienia(){return oMenu(19).href;}
function urlForum(){return oMenu(20).href;}
function urlStatystyki(){return oMenu(21).href;}
function urlWyloguj(){return oMenu(22).href;}
function ResNameNo(No){var Src=ById('mineraly');if(Src)return Src.childNodes[2*No+1].childNodes[2].data.replace(/[\t\n ]/g,"");}
function ResGet(id) {var Co=ById(id); return Co ? ToInt(Co.innerHTML) : 0; }
function ResourceGet(){return{metal:ResGet('metalValue'),krystal: ResGet('krystalValue'),
  deuter:ResGet('deuterValue'),gold:ResGet('goldValue'),naquadah:ResGet('naquadahValue'),
   scrap:ResGet('scrapValue'), enCurrent:ResGet('enCurrent'), enMax:ResGet('enMax')};}
//---------------------------------------------------------------------------
function ResToName(Str){for(var Name in ResName)if(ResName[Name]==Str)return Name;return null;}
function TimToNo(Co){Co=Co.split(' ');bck=0;for(var i=0;i<Co.length;i++)switch(Co[i].substr(0,2)){
  case'dn': case'dz':bck+=24*60*60*Co[i-1];break;case'go':bck+=60*60*Co[i-1];break;
  case'mi':bck+=60*Co[i-1];break;case'se':bck+=1*Co[i-1];break;}return bck;}
//---------------------------------------------------------------------------
function TimToStr(Tm1s){var bck='',i=0;do{switch(i){case 0:bck=To2d(Tm1s%60);Tm1s/=60;break;//sek
  case 1:bck=To2d(Tm1s%60)+':'+bck; Tm1s/=60; break;case 2:bck=To2d(Tm1s%24)+':'+bck; Tm1s/=24; break;
  case 3:bck=Tm1s +(Tm1s>1?' dni ':unescape(' dzie%u0144 '))+bck;Tm1s=0; break;}
  Tm1s =Math.floor(Tm1s);}while( ++i < 3 || Tm1s );return bck;}
//---------------------------------------------------------------------------
var typColor ={A:'red', S:'grey', T:'#00FF00', Z:'yellow', K:'#40BFE7', R:'pink'};
var Jdns =[
  {id: 0, Name:'Satelita szpiegowski',
    pkt: 1, typ:'S'},
  {id: 1, Name:'Lekki my%u015Bliwiec',
    pkt: 3, typ:'A'},
  {id: 2, Name:'Ma%u0142y tankowiec',
    pkt: 1, typ:'T'},
  {id: 3, Name:'Ma%u0142y transporter',
    pkt: 2, typ:'T'},
  {id: 4, Name:'Transporter opancerzony',
    pkt: 4, typ:'A'},
  {id: 5, Name:'Super my%u015Bliwiec',
    pkt: 7, typ:'A'},
  {id: 6, Name:'Ci%u0119%u017Cki my%u015Bliwiec',
    pkt: 4, typ:'A'},
  {id: 7, Name:'Niszczyciel',
    pkt:10, typ:'A'},
  {id: 8, Name:'Kr%u0105%u017Cownik',
    pkt: 7, typ:'A'},
  {id: 9, Name:'%u015Aredni transporter',
    pkt: 5, typ:'T'},
  {id:10, Name:'Fregata',
    pkt:14, typ:'A'},
  {id:11, Name:'%u015Aredni tankowiec',
    pkt: 5, typ:'T'},
  {id:12, Name:'Bombowiec',
    pkt:12, typ:'A'},
  {id:13, Name:'Korwetta',
    pkt: 9, typ:'A'},
  {id:14, Name:'Ma%u0142y recykler',
    pkt: 5, typ:'Z'},
  {id:15, Name:'%u015Aredni recykler',
    pkt: 8, typ:'Z'},
  {id:16, Name:'Du%u017Cy recykler',
    pkt:12, typ:'Z'},
  {id:17, Name:'Bombowiec orbitalny',
    pkt:17, typ:'A'},
  {id:18, Name:'Du%u017Cy transporter',
    pkt:11, typ:'T'},
  {id:19, Name:'Pancernik kieszonkowy',
    pkt:16, typ:'A'},
  {id:20, Name:'Du%u017Cy tankowiec',
    pkt:10, typ:'T'},
  {id:21, Name:'Lotniskowiec',
    pkt:17, typ:'A'},
  {id:22, Name:'Pancernik',
    pkt:15, typ:'A'},
  {id:23, Name:'Statek kolonizacyjny',
    pkt:10, typ:'K'},
  {id:24, Name:'Okr%u0119t liniowy',
    pkt:19, typ:'A'},
  {id:25, Name:'Super pancernik',
    pkt:20, typ:'A'},
  // Rakiety
  {id:26, Name:'Sherkan10', pkt:0, typ:'R'},
  {id:27, Name:'Sherkan15', pkt:0, typ:'R'},
  {id:28, Name:'Sherkan20', pkt:0, typ:'R'},
  {id:29, Name:'Slayer10' , pkt:0, typ:'R'},
  {id:30, Name:'Slayer15' , pkt:0, typ:'R'},
  {id:31, Name:'Slayer20' , pkt:0, typ:'R'},
  {id:32, Name:'Thunder10', pkt:0, typ:'R'},
  {id:33, Name:'Thunder15', pkt:0, typ:'R'},
  {id:34, Name:'Thunder20', pkt:0, typ:'R'},
  {id:35, Name:'Blitz20'  , pkt:0, typ:'R'},
  {id:36, Name:'Blitz30'  , pkt:0, typ:'R'},
  {id:37, Name:'Blitz40'  , pkt:0, typ:'R'},
  // Obrona
  {id:38, Name:'Wyrzutnia rakiet', pkt: 1, typ:'D'},
  {id:39, Name:'Lekkie dzia%u0142ko laserowe', pkt: 1, typ:'D'},
  {id:40, Name:'Ci%u0119%u017Ckie dzia%u0142ko laserowe', pkt: 1, typ:'D'},
  {id:41, Name:'Dzia%u0142o Gauss%27a', pkt: 8, typ:'D'},
  {id:42, Name:'Dzia%u0142o jonowe', pkt: 6, typ:'D'},
  {id:43, Name:'Wie%u017Cyczka plazmowa', pkt:12, typ:''},
  {id:44, Name:'Ma%u0142a os%u0142ona', pkt:15, typ:''},
  {id:45, Name:'Dzia%u0142o "Mammut"', pkt:15, typ:''},
  {id:46, Name:'Lekka piechota', pkt: 1, typ:''},
  {id:47, Name:'Ci%u0119%u017Cka piechota', pkt: 1, typ:''},
  {id:48, Name:'Orbitalne pole minowe', pkt: 1, typ:'D'},
  {id:49, Name:'Marines', pkt: 2, typ:''},
  {id:50, Name:'Lekki czo%u0142g', pkt: 5, typ:''},
  {id:51, Name:'Ci%u0119%u017Cki czo%u0142g', pkt: 8, typ:''},
  {id:52, Name:'Czo%u0142g "Plasma"', pkt: 8, typ:''},
  {id:53, Name:'Czo%u0142g "Ion"', pkt:10, typ:''},
  {id:54, Name:'%u017Bo%u0142nierze naquadah', pkt: 3, typ:''},
  {id:55, Name:'Elitarni %u017Co%u0142nierze naquadah', pkt: 4, typ:''},
  {id:56, Name:'Czo%u0142g "Pretorian"', pkt:10, typ:''},
  {id:57, Name:'MTAT', pkt: 7, typ:''},
  {id:58, Name:'GTMT', pkt:10, typ:''},
  {id:59, Name:'BTAT', pkt:10, typ:''},
  {id:60, Name:'Mobilna wyrzutnia rakiet', pkt: 1, typ:'D'},
  {id:61, Name:'Drony', pkt:10, typ:'D'},
  {id:62, Name:'Dzia%u0142o fotonowe', pkt: 3, typ:''},
];
function IdnFindName(Name){for(var i=0;i<Jdns.length;i++){var jdn=Jdns[i];
  if(unescape(jdn.Name)==Name)return jdn;}return null;}

function PltChg(No,cb){
  GM_xmlhttpRequest({method:'POST',url:_url+'/seam/resource/remoting/execute',
    headers:{'Content-type':'text/plain; charset=UTF-8'},data:t('envelope','',t('header','',t('context'))+t('body','',
    t('call','component="planetAction" method="changePlanet" id="0"','\r\n'+t('params','',t('param','',t('str','',''+No)))+t('refs')))),
    Referer:_url+'/pages/planet.seam?cid='+_cid,onload:function(xhr){if(cb)cb(xhr.responseText);}
})};
function PltNo(No,Fn){Fn =Fn||0;PltChg(No,function(){
  window.location.href=[urlPg(_pg), urlBudynki(),urlStocznia(),urlFlota(),urlGwiezdneWrota()][Fn];})}

//---------------------------------------------------------------------------
// Adresy wrót
//---------------------------------------------------------------------------
var GateIDs =["first","second","third","fourth","fifth","sixth","seventh"];
//---------------------------------------------------------------------------
function GateAddr(){var bck='';for(var i in GateIDs){var obj=ById(GateIDs[i]);
  if(obj){var file =StrSeek(obj.src,["16x16/",".gif"]);if(file)bck+=file[file.length-1];}}return bck;}
//---------------------------------------------------------------------------
var ResId =['metal','krystal','deuter','gold','naquadah','scrap'];
function ResVal(id){var Co =ById(id); return Co?ToInt(Co.innerHTML):0;}
function ResourceGet(){var bck={};ResId.forEach(function(el){bck[el]=ResVal(el+'Value')});
  bck.enCurrent=ResVal('enCurrent');bck.enMax=ResVal('enMax');return bck;}
function ResIdToName(){var bck=[];ResId.forEach(function(el){
  bck.push(ById(el+'Value').parentNode.childNodes[2].data.replace(/[\t\n ]/g,""));});return bck;}
//---------------------------------------------------------------------------
function planet_GW(){var _Name=ById('renamePlanet');if(_Name)_Name=_Name.innerHTML; 
  var _Addr=GateAddr();if(_Addr){var oTb=ById("planet_inf");
    oTb.rows[0].cells[1].innerHTML +="<br><b>["+_Addr+"]</b>";
    oTb.rows[0].cells[1].appendChild( c_input({type:'button', value:'Dodaj do GW',
    click: function(){alert(1);}}));}
}
//---------------------------------------------------------------------------
function planet_Menu(){
  addGlobalStyle(''
    +'table#nicPlaneta{ margin:10px auto;text-align:center;border:2px solid pink;-moz-border-radius:3px;-webkit-border-radius:3px;}'
    +'table#nicPlaneta th{ background-color:white;color:black;}'
    +'table#nicPlaneta tr{ background-color:#171F17;}'
    +'table#nicPlaneta td.kolor{background-color:#262F26;}'
    +'table#nicPlaneta td.lp{text-align:right;height:16px;padding:2px 2px 2px 2px;}'
    +'table#nicPlaneta td.Info{height:16px;padding:2px 5px 2px 5px;text-align:center;'
    +  'border:1px solid #004000;}'
    +'table#nicPlaneta td{height:16px;padding:2px 10px 2px 10px;'
      +'text-align:center;font-weight:bold;}');
  function PltSel(No){ById("changePlanet").value=No;unsafeWindow.changePlanet();}; 
  var oTB,ColCount =5;
  var _Info={className:"Info",colSpan:2*ColCount-2,innerHTML:'?'};
  divMain.appendChild(c_div(c_table({id:'nicPlaneta'},oTB=c_tbody(
    c_tr(c_td({colSpan:2,innerHTML:'Budynki:'}),c_td(_Info)),
    c_tr(c_td({colSpan:2,innerHTML:'Stocznia:'}),c_td(_Info)),
    c_tr(c_td({colSpan:2,innerHTML:'Rakiety:'}),c_td(_Info)),
    c_tr(c_td({colSpan:2,innerHTML:'Obrona:'}),c_td(_Info)),
    c_tr(c_th({colSpan:2*ColCount},dcce('H3',[{innerHTML:'Wykaz Planet'}]))
  )))));PlanetsShow( ById("changePlanet"),oTB,PltSel);
  function InfoSet(RowNo,Req){var oDiv =c_div({innerHTML:Req.responseText});
    oDiv =oDiv.getElementsByClassName("prod_name");var bck=oDiv[0].innerHTML,oTb =ById('nicPlaneta');if(oTb){
    oTb.rows[RowNo].cells[1].innerHTML=bck?tSpanColor('#FF0000',bck):tSpanColor('#00FF00',"wolne");}}
  function ProdShow(){HTTP_ReqOnLoad(urlBudynki(),function(Req){InfoSet(0,Req)});
    HTTP_ReqOnLoad(urlStocznia(),function(Req){InfoSet(1,Req)});
    HTTP_ReqOnLoad(urlCentrumRakietowe(),function(Req){InfoSet(2,Req)});
    HTTP_ReqOnLoad(urlObrona(),function(Req){InfoSet(3,Req)});}ProdShow();
}
//---------------------------------------------------------------------------
function production_Menu(){
  function _Get(Co){var bck=[];for(var el in ResName )bck[el]=ResGet('productionForm:'+el+Co);return bck;}
  function _ProdTotalGet() {return _Get('ProdTotal');}
  function _SiloCapGet()   {return _Get('SiloCap');}
  function _Prod(Hour,oProdTotal) { var bck =[]; for( var el in oProdTotal )
    bck[el]=tSpanColor('#00FF00; font-weight:bold',frm1k( Hour*oProdTotal[el]));
    bck['xx']=''; bck['yy']=TimToStr(Hour*60*60); return ArrToTr(bck); }
  var oWydobycie;
  oWydobycie=ById('wydobycie').childNodes[1];

  var oRes =ResourceGet();
  var oProdTotal =_ProdTotalGet();
  var oSiloCap   =_SiloCapGet();
  var TmLim =[];
  for( var el in oProdTotal )
    TmLim[el] =tSpanColor('gold; font-weight:bold', TimToStr(oProdTotal[el] 
      ? Math.floor((Math.max(0, (oSiloCap[el]||0)-(oRes[el]||0))*60*60)/(oProdTotal[el]))
      : 0) );
  TmLim['xx']='';
  oWydobycie.appendChild(ArrToTr(TmLim));
  // 2h, 6h, 12h, 24h i 7 dni
  oWydobycie.appendChild(_Prod(     2,oProdTotal));
  oWydobycie.appendChild(_Prod(     6,oProdTotal));
  oWydobycie.appendChild(_Prod(    12,oProdTotal));
  oWydobycie.appendChild(_Prod(    24,oProdTotal));
  oWydobycie.appendChild(_Prod(  7*24,oProdTotal));
  oWydobycie.appendChild(_Prod(365*24,oProdTotal));
}
//---------------------------------------------------------------------------
function buildings_Menu() {
  function clName(doc,Name){return doc.getElementsByClassName(Name);}
  var tbBuds=classNames('budynek');
  var id=ById('time');
  var uN =ById('buildingsForm:unitName').innerHTML;
  if(uN){addGlobalStyle('#time{margin-bottom:3px;}'
      +'table#barGraph{height:16px;width:298px;spacing:0px;padding:1px;border-spacing:1px;'
      +  'border:2px solid pink;-moz-border-radius:3px;-webkit-border-radius:3px;}'
      +'td#bGleft{width:0px;background:#00FF00;}'
      +'td#bGright{width:auto;background:grey;}'
    );
    id.appendChild( c_table( {id:'barGraph'},c_tr(c_td({id:'bGleft'}),c_td({id:'bGright'}))));
    uN =StrSeek(uN,[': ',' -']);
    for(var iB=0; iB<tbBuds.length;iB++){var tbB=tbBuds[iB];
    var Name =clName(tbB,'change1')[0].innerHTML.split(' (')[0];
    if( Name == uN ) { // pobranie godziny
    var TmEnd =TimToNo(clName(tbB,'gold')[0].innerHTML);
    setInterval(function(){var TmNow=TimeToNo(ById('buildingsSpan').innerHTML);
    ById('bGleft').style.width=Math.floor(290*(TmEnd-TmNow)/TmEnd)+'px';},2000);break;}}}
  addGlobalStyle('#produkcja{ padding-top: 30px !important;}.Build{background: #1e231c;'
    +  'border:2px solid pink;-moz-border-radius:3px;-webkit-border-radius:3px;'
    +  'width: 690px;	margin: 0 auto;	margin-top: 10px;	text-align:left;font-weight:bold;}'
    +'.Build th{ height:20px; color:black;text-align:center;font-size: 10px;background :pink;}'
    +'.Build td{ text-align:right;padding-left:5px;}'
    +'.bShow{text-align:left;display:block;}'
    +'.bShowR:hover{background:#323a2f;}'
    +'.bHide{display:none;position:absolute;z-Index:200;margin-left:36px;margin-top:-2px;}'
    +'.bShow:hover .bHide{display:block;}'
    +'.budynek{border:3px double #BFBF00 !important;-moz-border-radius:3px;-webkit-border-radius:3px;}'
    +'.budynek td{text-align:left;}'
    +'.bInp{background:transparent;height:18px;-moz-border-radius:3px;-webkit-border-radius:3px;'
    +  'border: 1px solid white;width:100%; color: white;padding-bottom:5px;font-family:tahoma;cursor: pointer;font-size:11px}'
    +'.bInp:hover{color:black; background:pink;}'
    +'.shipsProduction{height:110px !important;margin-top:2px!important;}'
  );
  var tbDst=c_tbody( c_tr(c_th({innerHTML:'Budynek'}),c_th({innerHTML:'Metal'}),
    c_th({innerHTML:'Kryszta&#322;'}),c_th({innerHTML:'Deuter'}),c_th({innerHTML:'Z&#322;oto'}),
    c_th({innerHTML:'Naquadach'}),c_th({innerHTML:'Czas'}),c_th({innerHTML:'Buduj'})));
  ById('buildingsForm').insertBefore(c_table({className:'Build'},tbDst),tbBuds[0]);
  var Res=ResourceGet();
  var tbsSrc =classNames('budynek');
  for(var iRow=0;iRow<tbsSrc.length;iRow++){var tr=c_tr({className:'bShowR'});
    var tbSrc =tbsSrc[iRow],tbWym =clName(tbSrc,'info2')[0].getElementsByTagName('table')[0];
    var div=c_div({className:'bHide'}),oName =clName(tbSrc,'name')[0];
    tr.appendChild(c_td(c_div({className:'bShow',innerHTML:oName.innerHTML},div)));
    for(var iCol=0;iCol<5;iCol++){var resR=tbWym.rows[1+(iCol%3)],c=2*Math.floor(iCol/3),_res=resR.cells[c+1];
      tr.appendChild( c_td({innerHTML:_res.innerHTML}));}
    tr.appendChild(c_td({innerHTML:TimToStr(TimToNo(tbWym.rows[3].cells[3].childNodes[0].innerHTML))}));
    var td;tr.appendChild(td=c_td());var obj=tbSrc.getElementsByTagName('input')[0];
    if(obj)td.appendChild(obj.cloneNode(true));
    tbSrc.rows[0].cells[2].appendChild(c_input({type:'button',value:'Zniszcz',class:'btn1',click:function(){
      var tr =this.parentNode.parentNode,idStru=clName(tr,'change1')[0].href.match(/idStructure=\d+/);
      location.href='/pages/details/details_buildings.seam'+'?'+idStru+'&cid='+_cid
        +'&actionMethod=pages%2Fdetails%2Fdetails_buildings.xhtml%3AbuildingsAction.destroyStructure';
      return false;
  }}));tbDst.appendChild(tr);parent =tbSrc.parentNode;div.appendChild(tbSrc);
} }
//---------------------------------------------------------------------------
function technology_Menu(){var golds =classNames('gold');
  for(var i=0;i<golds.length;i++){var spn=golds[i];spn.innerHTML =TimToStr(TimToNo(spn.innerHTML));}
  addGlobalStyle('.val {text-align:right; font-weight:bold; padding:0px 5px 0px 10px;}');
  var res=ResourceGet(),surs=classNames('surowiec');for(var i=0;i<surs.length;i++){
    var sur=surs[i],td =sur.nextSibling.nextSibling;td.className='val';var cN=td.childNodes;
    if(cN.length&&cN[0].style.color=='rgb(255, 0, 0)'){var Name=sur.innerHTML.split(':')[0];
      Name=ResToName(Name);var ValCur=Name?res[Name]:0,Val=ToInt(cN[0].innerHTML);
      cN[0].innerHTML ='<span class="gold">('+frm1k( ValCur-Val )+')</span> '+cN[0].innerHTML;
} } }
//---------------------------------------------------------------------------
function shipyard_Menu(){var Dst=classNames('shipsProduction')[0];if(!Dst)return;Dst.size=8;
  addGlobalStyle('#produkcja{ padding-top: 30px !important;}'
    +'.Build{background: #1e231c;'
    +  'border:2px solid pink;-moz-border-radius:3px;-webkit-border-radius:3px;'
    +  'width: 690px;	margin: 0 auto;	margin-top: 10px;	text-align:left;font-weight:bold;}'
    +'.Build th{ height:20px; color:black;text-align:center;font-size: 10px;background :pink;}'
    +'.Build td{ text-align:right;}'
    +'.bShow{text-align:left;display:block;}'
    +'.bShowR:hover{background :#323a2f;}'
    +'.bHide{display:none;position:absolute;z-Index:200;margin-left:40px;margin-top:0px;}'
    +'.bShow:hover .bHide{display:block;}'
    +'.budynek{border:3px double #BFBF00 !important;-moz-border-radius:3px;-webkit-border-radius:3px;}'
    +'.budynek td{text-align:left;}'
    +'.bInp{background:transparent;height:18px;-moz-border-radius:3px;-webkit-border-radius:3px;'
    +  'border: 1px solid white;width:100%; color: white;padding-bottom:5px;font-family:tahoma;cursor: pointer;font-size:11px}'
    +'.bInp:hover{color:black; background:pink;}'
    +'.small_stocznia{background:#000040;font-weight:bold;border: 1px solid white;height:18px;}'
  );
  function _ProdVal(No,Val){o=ById('shipyardForm:shipyardList:'+No+':num')||ById('defenceForm:defenceList:'+No+':num')||ById('rocketCenterForm:rocketList:'+No+':num');if(o)o.value=Val;}
  function clName(doc,Name){return doc.getElementsByClassName(Name);}
  var tbsSrc =classNames('budynek'),tbDst=c_tbody(c_tr(c_th({innerHTML:'Nazwa'}),c_th({innerHTML:'Pkt'}),c_th({innerHTML:'Metal'}),
    c_th({innerHTML:'Kryszta&#322;'}),c_th({innerHTML:'Deuter'}),c_th({innerHTML:'Z&#322;oto'}),
    c_th({innerHTML:'Naquadach'}),c_th({innerHTML:'Czas'}),c_th({innerHTML:'Ilo&#347;&#263;'}),c_th({innerHTML:'Buduj'})
  ));
  (ById('shipyardForm')||ById('defenceForm')||ById('rocketCenterForm')).insertBefore(c_table({className:'Build'},tbDst),tbsSrc[0]);
  var Res=ResourceGet();
  for(var iRow=0;iRow<tbsSrc.length;iRow++){
    var tr=c_tr({className:'bShowR'}),tbSrc=tbsSrc[iRow],tbWym=clName(tbSrc,'info2')[0].getElementsByTagName('table')[0];
    var BuildMax=Infinity,div=c_div({className:'bHide'}),oName=clName(tbSrc,'name')[0];
    var oLnk =oName.getElementsByTagName('a')[0],oJdn=IdnFindName(oLnk.innerHTML.trim());
    oLnk.style.color =typColor[oJdn.typ];
    tr.appendChild(c_td(c_div({className:'bShow',innerHTML:oName.innerHTML},div)));
    tr.appendChild( c_td({innerHTML:oJdn?oJdn.pkt:'?'}));
    for(var iCol=0;iCol<5;iCol++){var resR=tbWym.rows[1+(iCol%3)],c=2*Math.floor(iCol/3),_res=resR.cells[c+1];
      tr.appendChild(c_td({innerHTML:_res.innerHTML}));
      var val =ToInt(_res.childNodes.length?_res.childNodes[0].innerHTML:_res.innerHTML);
      var _res=ResToName(resR.cells[c].innerHTML.split(':')[0]);
      if(_res&&val)BuildMax=Math.min(BuildMax,Math.floor(Res[_res]/val));}
    tr.appendChild(c_td({innerHTML:TimToStr(TimToNo(tbWym.rows[3].cells[3].childNodes[0].innerHTML))}));
    var btn =c_input({type:'button', className:'bInp',value:BuildMax});
    tr.appendChild(c_td(addClick(btn,(function(No,max){return function(){_ProdVal(No,max)}})(iRow,BuildMax))));
    var obj =tbSrc.getElementsByTagName('input')[0];
    if(obj){tr.appendChild(c_td( obj.cloneNode(true)));var parent =obj.parentNode;parent.removeChild(obj);}else tr.appendChild(c_td());
    tbDst.appendChild(tr);parent=tbSrc.parentNode;div.appendChild(tbSrc.cloneNode(true));
    parent.removeChild(tbSrc);
} }
//---------------------------------------------------------------------------
function fleet_Menu(Co){if(Co)return;GM_log('fleet_Menu ->');var tbFlota =ById('units');
  function _ShipChg(No,chg){var id='fleetForm:unit:'+No+':',oCur=ById(id+"cur"),iMax=1*ById(id+"max").textContent;
    var iCo=1*oCur.value+1*chg; oCur.value=Math.min(Math.max(iCo,0),iMax);}
  var jdnCount={};
  tbFlota.rows[0].appendChild(c_th({colSpan:2},c_span({class:'yellow',innerHTML:"Punkty"})));
  for(var iRow=0;iRow<tbFlota.rows.length-4;iRow++){var oRow=tbFlota.rows[iRow+1],oDst=oRow.cells[2];
    oDst.insertBefore(c_a({innerHTML: '-1',href:jv,click:(function(No,Chg){return function(){_ShipChg(No,Chg)}})(iRow, -1)}),oDst.firstChild);
    oDst.insertBefore(c_a({innerHTML:'-10',href:jv,click:(function(No,Chg){return function(){_ShipChg(No,Chg)}})(iRow,-10)}),oDst.firstChild);
    oDst.appendChild(c_a({innerHTML: '+1',href:jv,click:(function(No,Chg){return function(){_ShipChg(No,Chg)}})(iRow,1)}));
    oDst.appendChild(c_a({innerHTML:'+10',href:jv,click:(function(No,Chg){return function(){_ShipChg(No,Chg)}})(iRow,10)}));
    oRow.appendChild(c_td({class:'nicPkt',width:'30px',innerHTML:"*0="}));
    oRow.appendChild(c_td({class:'nicPkt',width:'80px',innerHTML:"0"}));
    var oCell=oRow.cells[0];var idn=IdnFindName(oCell.innerHTML);if(!idn)continue;
	  oCell.innerHTML=tSpanColor(typColor[idn.typ],oCell.innerHTML);oRow.setAttribute('typ',idn.typ);
    jdnCount[idn.typ] =1*(jdnCount[idn.typ]||0)+ToInt(oRow.cells[1].firstChild.innerHTML);
    oRow.cells[4].innerHTML=tSpanColor(typColor[idn.typ],'*'+idn.pkt+'=');oRow.cells[5].innerHTML='0';}
  tbFlota.rows[++iRow].appendChild( c_td({colSpan:2,class:'nicPkt',innerHTML:'x'}) );
  setInterval(function(){var jdnCount={},tot=0,tbFlota=ById('units');
    for(var iRow=0;iRow<tbFlota.rows.length-6;iRow++){
      var oRow=tbFlota.rows[iRow+1],oInp=ById('fleetForm:unit:'+iRow+':cur');
      if(!oInp)continue;var pkt=1*oRow.cells[4].innerHTML.match(/\*(\d+)=/)[1];
      var val=pkt*oInp.value,typ=oRow.getAttribute('typ');
      oRow.cells[5].innerHTML=frm1k(val);if(val)jdnCount[typ] =1*(jdnCount[typ]||0)+val;tot+=val;}
    var bck =frm1k(tot);for(var typ in jdnCount){bck+='<br>'+tSpanColor(typColor[typ],frm1k(jdnCount[typ]));}
    tbFlota.rows[++iRow].cells[1].innerHTML =bck;},1000);
  addGlobalStyle(''
    +'.nicPkt{text-align:right;font-weight:bold;border-bottom:1px solid #242E24;border-right:1px solid #242E24;}'
    +'table#units {width:700px !important;}'
    +'table#units td#unit_name{width:auto !important;}'
    +'table#units td#unit_quantity{width:60px !important;text-align:right;padding-right:5px;}'
    +'table#units td#to_mission{width:200px !important;}'
    +'table#units td#to_mission .quantity{width:60px !important;text-align:right;margin:0 5px 0 5px;font-weight:bold;padding-right:5px;}'
    +'table#units td#to_mission .min_max{width:60px !important;}'
    +'table#units td#to_mission a{margin:0 5px 0 5px;}'
    +'table#units tr:hover{background-color:#123414;}'
    +'table#units a{color:white;font-weight:bold;text-decoration:none;}'
    +'table#units a:hover{color:yellow;}'
  );  
  var tb;tbFlota.appendChild( c_tr(tb=c_td({colSpan:6})));
  function jdnSel(typ){for(var iRow=1;iRow<tbFlota.rows.length-3;iRow++){
    var oRow=tbFlota.rows[iRow];if(oRow.getAttribute('typ')==typ){var name='fleetForm:unit:'+(iRow-1)+':';
    ById(name+"cur").value=ById(name+"max").textContent;} } };
  for(var typ in jdnCount){var btn;tb.appendChild(btn=c_input({type:'button',class:'btn2',value:typ+' ['+frm1k(jdnCount[typ])+']',
    click:(function(co){return function(){jdnSel(co);}})(typ)}));btn.style.color=typColor[typ];}
  function _changeMission(No){ById("fleetForm:selectMission").value=No;ById("mission_btn").childNodes[0].click();}
  var sel=ById('fleetForm:selectMission');
  tbFlota.appendChild( c_tr(tb=c_td({colSpan:6})));
  for(var i=0; i<sel.options.length; i++ ) {
    tb.appendChild( c_input({type:'button',class:'btn2',value:sel.options[i].innerHTML,
    click:(function(co){return function(){_changeMission(co)}})(sel.options[i].value)
  }))};
  GM_log( 'fleet_Menu <-');
}
//---------------------------------------------------------------------------
function order_center_Menu() {
  addGlobalStyle(''
    +'table#res{margin:5px auto;text-align:center;font-weight:bold;'
      +'border:2px solid pink;-moz-border-radius:3px;-webkit-border-radius:3px;}'
    +'table#res td{width:100px;padding:2px;background-color:#171F17;}'
    +'table#res tr.kolor td{background-color:#262F26;}'
    +'table#opis{ margin:1px auto;text-align:center;border:1px solid #323A2F;}'
    +'table#opis tr{ background-color:#171F17;}'
    +'table#opis tr.kolor{background-color:#262F26;}'
    +'table#opis td{height:16px;padding:1px 1px 1px 1px;}'
    +'.val {text-align:right; font-weight:bold}'
    +'.gr {text-align:right; font-weight:bold; color:#00FF00;}'
    +'table#opis td.planet{text-align:center; font-weight:bold;background-color:pink;color:black;}'
    +'table#ship{margin:5px auto;text-align:center;font-weight:bold;'
      +'border:2px solid pink;-moz-border-radius:3px;-webkit-border-radius:3px;}'
    +'table#ship th{width:auto;padding:2px;background-color:pink;color:black;}'
    +'table#ship td{width:auto;padding:2px;background-color:#171F17;}'
    +'table#ship tr.kolor td{background-color:#262F26;}'
    +'table#ship td.num{text-align:right;}'
    +'table#ship tbody{display:none;}'
    +'table#ship:hover tbody{display:table;}'
    +'table#ship a {color:white; text-decoration:none;}'
    +'table#ship a:hover {color:yellow; text-decoration:underline;}'
    );
  var idDst=ById('zestawienie');if(!idDst)return;var Ships=[];
  var Tot=[0, 0, 0, 0, 0, 0 ],oLista =classNames('lista')[0],oDivs =oLista.getElementsByTagName('div');
  for( var iNo=0; iNo<oDivs.length;iNo++){var plt=oDivs[iNo];if(plt.id!='planeta')continue;
    var tip =oDivs[iNo].getElementsByTagName('a')[0].getAttribute("title");tip =tip.split('<br />');
    tip.forEach(function(Rec){Rec =Rec.split(': ');if(!Ships[Rec[0]]) Ships[Rec[0]]=[];
    Ships[Rec[0]].push([iNo,ToInt(Rec[1])]);});var pltDet =plt.getElementsByTagName('tbody')[0];
    for(var iR=0; iR<Tot.length;iR++)Tot[iR]+=ToInt(pltDet.rows[iR].cells[3].innerHTML);
  }

  var colSpan=5;var tbShips=c_tbody(c_tr(c_th({innerHTML:'Statki',colSpan:2}),c_th({innerHTML:'Ilo&#347;&#263; / Planeta',colSpan:2*colSpan})));
  divMain.insertBefore(c_table({id:'ship'},c_tr(c_th({innerHTML:'Zestawienie statk&oacute;w'})),tbShips),idDst);
  var rowNo=0,ShipTotal=0;for(var ship in Ships){var oShip={class:++rowNo%2==0?'kolor':''},Ship_td;
    var oJdn=IdnFindName(ship);if(!oJdn)continue;
    var tr=c_tr(oShip,c_td({innerHTML:tSpanColor(typColor[oJdn.typ],ship)}), Ship_td=c_td({class:'num'}));
    var trSpan=tr;var colCnt=0;var rowSpan=0;var shipCnt=0;
    Ships[ship].forEach(function(Rec){
  var PltName =StrSeek(oDivs[Rec[0]].innerHTML,['"title">',' [']);
  tr.appendChild(c_td({class:'num',innerHTML:frm1k(Rec[1])}));
  var pltNo =oDivs[Rec[0]].getElementsByTagName('a')[0].href.match(/go_to_planet=(\d+)/)[1];
    tr.appendChild(c_td(c_a({href:jv,innerHTML:PltName,click:(function(No){return function(){PltNo(No,3)}})(pltNo)})));
  shipCnt+=Rec[1];if(++colCnt==colSpan){colCnt=0;rowSpan++;tbShips.appendChild(tr);
  tr =c_tr(oShip);}});Ship_td.innerHTML=frm1k(shipCnt);if(tr.cells.length){tbShips.appendChild(tr);rowSpan++;}
  if(rowSpan>1){trSpan.cells[0].rowSpan=rowSpan;trSpan.cells[1].rowSpan=rowSpan;}ShipTotal +=shipCnt;}
  tbShips.appendChild(c_tr(c_td({innerHTML:'Razem : ',class:'num'}),c_td({innerHTML:frm1k(ShipTotal),class:'num'})));
  var tb=[[],[]];
  for(var iCol=0;iCol<Tot.length;iCol++){tb[0].push(ResNameNo(iCol));tb[1].push(frm1k(Tot[iCol]));}
  tb=ArrToTable(tb);tb.id ='res';divMain.insertBefore(tb,ById('zestawienie').nextSibling);
}
//---------------------------------------------------------------------------
function galaxy_Menu(){GM_log( 'galaxy_Menu ->');
  var td_gal10s =classNames('gal10');
  for(var i=0;i<td_gal10s.length;i++ ) {
    var td_gal10 =td_gal10s[i];
    var oImg =c_img({src:gifNotatnik,alt:'Dodaj do notatnika'});
    var oA =c_a({href:jv});
    _addClick( oA, td_gal10.parentNode );
    oA.appendChild(oImg);
    td_gal10.appendChild(oA);
  }
  GM_log('galaxy_Menu <-');
}
//---------------------------------------------------------------------------
function stargate_Menu() {
  function _Up(Zn){return (isUpper(Zn)?'upper/':'')+Zn;}
  function _Lnk(Obj){var bck='<a id="selectedPlanet" href="#" onclick="loadPlanet1(';
    for(var i=0;i<Obj.addr.length;i++)bck+="'"+_Up(Obj.addr[i])+"', ";
    bck+="'"+Obj.pass+"')\" class=\"change2\">"+Obj.name+"</a>";return bck;}
  function _Imgs(Obj){var bck='';for(var i=0;i<Obj.addr.length;i++)
    bck+='<img id="'+GateIDs[i]+'" src="http://shersoft.lh.pl/graphic/sguni_3/graph/stargate/25x25/'+
    _Up(Obj.addr[i])+'.gif"';return bck;}
  var tb_Gates =ArrObjToTable({owner:tCenterB('W&#322;a&#347;ciciel'),planet:tCenterB('Planeta'),
     addr:tCenterB('Adres wr&oacute;t'),pass:tCenterB('Has&#322;o') },GatesGetArrObj(),{addr:_Lnk});
  tb_Gates.cellSpacing=5;var c=c_center(); c.appendChild(tb_Gates);divMain.appendChild(c);
  
  addScript('function ById(Co){document.getElementById(Co);}function loadPlanet1(){'
  +'var GateIDs=["first","second","third","fourth","fifth","sixth","seventh"];'
  +'for(var i=0;i<GateIDs.length;i++){'
  +'ById(GateIDs[i]).src ="'+imgPath+'stargate/25x25/"+arguments[i]+".gif";'
  +'chevron =arguments[i].indexOf("upper")==0?arguments[i][6]:arguments[i][0];'
  +'ById("stargateForm:"+GateIDs[i]+"Hidden").value =chevron;'
  +'}ById("stargateForm:code").value=arguments[7];}');
}
//---------------------------------------------------------------------------
var GateIDs =["first","second","third","fourth","fifth","sixth","seventh"];
function SG_Up(Zn){return(isUpper(Zn)?'upper/':'')+Zn;}

function stargate_inpAddr(){var oTB=ById("address").getElementsByTagName('tbody')[0];if(!oTB)return;
  addGlobalStyle('input#nicAddr{width:126px;text-align:center;font-weight:bold;');
  oTB.insertBefore(c_tr(c_td({id:'left',innerHTML:"Adres planety"}),
    c_td({id:'right'}, c_input({id:'nicAddr',class:'input',type:'text',width:'50px',maxlength:7}),
    c_input({type:'button', class:'btn2', value:'Wpisz',click:function(){var addr=ById('nicAddr').value;
    for(var i=0;i<GateIDs.length;i++){var chevron =addr[i];
    ById(GateIDs[i]).src =imgPath+"stargate/25x25/"+SG_Up(chevron)+".gif";
    ById("stargateForm:"+GateIDs[i]+"Hidden").value =chevron;}}}))),oTB.rows[0]);
}
//---------------------------------------------------------------------------
function stargate_GW_1(){
  addGlobalStyle('#wrotacenter{'
    +'background:#0d140d url(http://img42.imageshack.us/img42/7986/stargate.gif) 50px 20px no-repeat;'
    +'width:400px;height:115px;float:left;padding-top:335px;}');
}
//---------------------------------------------------------------------------
function show_war_report_Menu() {
  var Stats =classNames('statystyki');
  function Cell(tb,Row,Col){return tb.rows[Row].cells[Col].innerHTML;}
  function cSplit(Co){return Co.split(' (');}
  function tbSeek(tb,iCol,Co){for(var jRow=1;jRow<tb.rows.length;jRow++){
    var cel=Cell(tb,jRow,iCol);if(cel!=' '&& cSplit(cel)[0]==Co)return jRow;}return 0;}
  function CellWork(tbSrc,tbDst,Row,Col){var Co=Cell(tbDst,Row,Col);if(Co==' ')return;
    var aRow=tbSeek(tbSrc,Col,cSplit(Co)[0]);if(aRow==0)
      tbDst.rows[Row].cells[Col].innerHTML=tSpanColor('#FF0000',Cell(tbDst,Row,Col));
    else{var dif=ToInt(cSplit(Cell(tbDst, Row,Col))[1])-ToInt(cSplit(Cell(tbSrc,aRow,Col))[1]);
      if(dif)tbSrc.rows[Row].cells[Col].innerHTML +=tSpanColor('FF0000',' ('+dif+')');
  }}
  for(var i=1;i<Stats.length;i++){var tbDst=Stats[i-1];if(tbDst.rows[0].cells.length!=10)continue;
    var tbSrc=Stats[i];for(var iRow=1;iRow<tbDst.rows.length;iRow++){
    CellWork(tbSrc,tbDst,iRow,0);CellWork(tbSrc,tbDst,iRow,5);
}}}
//---------------------------------------------------------------------------
function show_spy_report_Scr() {
  function PointsCalc(tb){var bck=0;
    for(var iRow=1;iRow<tb.rows.length;iRow++){var tbR=tb.rows[iRow];
      for(var iCol=0;iCol<tbR.cells.length;iCol++){
        var cell =tbR.cells[iCol],Name=cell.innerHTML.match(/^.+\s/);if(!Name)continue;
        Name =Name[0].trim();
        var Count =ToInt(cell.innerHTML.match(/(\d+)/)[0]),co=IdnFindName(Name),val;
        cell.innerHTML += tSpanColor('pink',' <b>' + (co ? 
          '* '+frm1k(co.pkt)+' ='+frm1k(val=co.pkt *Count) :'?')+'</b>');
        bck +=val||0; 
    } }
    tb.appendChild(c_tr(c_td(c_b({innerHTML:tSpanColor('pink','Total: '+frm1k(bck))}))));
    return bck;
  }
  var Dst=classNames('rozne'),tot=0;
  for(var iCo=0;iCo<Dst.length;iCo++){var tb=Dst[iCo];tot +=PointsCalc(tb);}
  tb.appendChild(c_tr(c_td(c_b({innerHTML:tSpanColor('pink','Total All: '+frm1k(tot))}))));
}
//---------------------------------------------------------------------------
function details_details_buildings_Menu() {
  addGlobalStyle('table#poziomy td{ width:auto !important;}');
  var tr,Res=[],tbDst=ById('poziomy'),Last;
  for(var iRow=1;iRow<tbDst.rows.length;iRow++){tr=tbDst.rows[iRow];Last=tr.cells.length-1;
    var coRes =StrSeek(tr.cells[Last].innerHTML,['title="','"']).split('&lt;br /&gt;');
    tr.deleteCell(Last);coRes.forEach(function(p){p=p.split(':');
      if(Res.indexOf(p[0])==-1)Res.push(p[0]);
      tr.appendChild(c_td({innerHTML:p[0]=='Czas budowy'?TimToStr(TimToNo(p[1])):p[1]}));
    });}
  tr=tbDst.rows[0];tr.deleteCell(Last);Res.forEach(function(p){tr.appendChild(c_td({innerHTML:p}))});
}
//---------------------------------------------------------------------------
function exchange_Oferty(){
  addGlobalStyle('#nicTb{width:100%;}'
    +'#nicTb th{padding:4px 1px 4px 1px;background:pink;color:black;text-align:center;font-size:12px;}'
    +'#nicTb tr{background:#2e332c;}'
    +'#nicTb tr#buy{background: #4e534c;color:yellow;}'
    +'#nicTb tr:hover{background:#3e433c;color:#00FF00;border:2px solid pink;-moz-border-radius:3px;-webkit-border-radius:3px;}'
    +'#nicTb td{text-align:right;font-size:12px;}'
    +'#nicTb input{background:transparent;width:100%;height:26px;-moz-border-radius:3px;-webkit-border-radius:3px;'
    +  'border:1px solid white;color:white;font-weight:bold;font-size:14px;cursor:pointer;}'
    +'#nicTb input:hover{color:black; background:pink;}'
    +'#Left{text-align:left !important;font-weight:bold;padding:0px 1px 0px 1px;}'
    +'#nicSpare{padding:20px 0px 20px 0px;}'
    +'#nicSpare td{border:2px solid pink; height:2px}'
  );
  var Ofertas =classNames('oferta');
  var tdDst =c_tbody(ArrToTag(c_tr(),'th',['Nick','Operacja'].concat(ResIdToName()).concat(['Decyzja'])));
  ById('nawigacja').parentNode.insertBefore( c_table({id:'nicTb',class:'nic'}, tdDst),ById('nawigacja').nextSibling );
    
  for(var i=0;i<Ofertas.length;){var oOferta =Ofertas[i],oCells  =oOferta.rows[0].cells[0];
    var oChilds =oOferta.rows[0].cells[0].childNodes;
    var trShell =c_tr( c_td({id:'Left',rowSpan:2, innerHTML:oCells.innerHTML}), // Nick
      c_td({id:'Left',innerHTML:"Sprzedaj"})); // Operacja
    var trBuy   =c_tr({id:'buy'},c_td({id:'Left',innerHTML:"Otrzymasz"}));
    for(var iRow=1;iRow<oOferta.rows.length;iRow++){var oCell =oOferta.rows[iRow].cells;
      trShell.appendChild(c_td({innerHTML:oCell[3].innerHTML}));
      trBuy  .appendChild(c_td({innerHTML:oCell[1].innerHTML}));
    }
    trShell.appendChild(c_td({rowSpan:2,innerHTML:oOferta.rows[0].cells[2].innerHTML})); // klawisz Akcept
    
    tdDst.appendChild(trShell);tdDst.appendChild(trBuy);
    if(++i<Ofertas.length) {tdDst.appendChild(c_tr({id:'nicSpare'},c_td({colSpan:9})));}
  }
  i=Ofertas.length;do{var obj=Ofertas[--i],parent=obj.parentNode;parent.removeChild(obj);} while(i);
  GM_log( 'exchange_Oferty ->');
}

//---------------------------------------------------------------------------
function cywilizacja_Menu(Co){if(Co)return;
  addGlobalStyle(''
    +'.nicHide{background:#1e231c;display:none;'
    +'position:absolute;z-Index:9;margin-left:140px;margin-top:-75px;'
    +'border:2px solid pink;-moz-border-radius:3px;-webkit-border-radius:3px;}'
    +'.nicShow:hover .nicHide{display:block;}'
  );
  var o=oCywilizacja(),oDst=o.parentNode;
  oDst.appendChild(c_div(o,{class:'nicShow'},c_div({class:'nicHide',id:'lewo'},
    dcce('li',[c_a({innerHTML:'Symulator Bitew',   href:'/pages/command_center.seam?actionMethod=pages%2Fcommand_center.xhtml%3AbattleSimulatorAction.battleSimulator&cid='+_cid})])
   ,dcce('li',[c_a({innerHTML:'Centrum produkcji' ,href:'/pages/command_center.seam?actionMethod=pages%2Fcommand_center.xhtml%3AbattleSimulatorAction.battleSimulator&amp;cid='+_cid})])
   ,dcce('li',[c_a({innerHTML:'Centrum recyklingu',href:'/pages/command_center.seam?actionMethod=pages%2Fcommand_center.xhtml%3ArecyclingCenterAction.recyclingCenter&cid='+_cid})])
   ,dcce('li',[c_a({innerHTML:'Gie&#322;da',       href:'/pages/command_center.seam?actionMethod=pages%2Fcommand_center.xhtml%3AexchangeAction.exchange&cid='+_cid})])
   ,dcce('li',[c_a({innerHTML:'Tutorial',          href:'/pages/command_center.seam?actionOutcome=%2Ftutorial%2Fplanet.xhtml&cid='+_cid})])
   ,dcce('li',[c_a({innerHTML:'Zg&#322;o&#347; b&#322;&#261;d',href:'/pages/emails.seam?actionMethod=pages%2Femails.xhtml%3AticketsCreatorAction.tickets&cid='+_cid})])
  )));
}
//---------------------------------------------------------------------------
function PlanetsShow( oSel, oDst, cb ){
  for(var tr,ColCount=5,ColNo=0,i=0;i<oSel.length;i++ ) {
    if(ColNo==0)oDst.appendChild(tr=c_tr());
    tr.appendChild(c_td({class:'nicLp',innerHTML:(i+1)+'.'}));
    var Name=oSel[i].innerHTML;if(oSel.value==i)Name=tSpanColor('#00FF00',Name);
    tr.appendChild(c_td(c_a({href:"#",innerHTML:Name,click:(function(i){return function(){cb(i);}})(i)})));
    if(++ColNo==ColCount)ColNo=0; 
} }
function Planets_Change(Co){if(Co)return;if(_pg=='session_expired')return;
  addGlobalStyle('#header{ position:relative !important;}'
    +'#nicPltHdr{position:absolute;top:66px;left:30px;z-Index:100;font-weight:bold;}'
    +'.nic{padding:1px 2px 1px 2px;border:1px solid pink;-moz-box-shadow:3px 3px 3px pink;-moz-border-radius:3px;-webkit-border-radius:3px;}'
    +'#nicHdrTB td{height:10px;}'
    +'#nicHdrTB img{margin:0px;width:20px;height:20px;border:medium none;}'
    +'#nicPltSel{height:20px;width:126px;border:1px solid pink;background:#151F16 none repeat scroll 0 0;color:#FFC703;'
      +'font-family:tahoma;font-weight:bold;margin:0;padding:0;text-align:left;font-size:12px;}'
    +'#nicHide{display:none;text-align:center;background:#262F26;}'
    +'#nicHide a{color:#B7BE85;text-decoration:none;}'
    +'#nicHide a:hover{color:white;}'
    +'#nicShow:hover #nicHide{display: block;}'
    +'#nicShow tr{ background-color:#171F17;}'
    +'#nicShow td{height:16px;padding:2px 10px 2px 10px;text-align:center;font-weight:bold;}'
    +'#nicTBpltB td.nicLp{text-align:right;height:16px;padding:2px 2px 2px 2px;}'
    +'#nicPltSize{float:right;}'
  );
  var p =c_div({id:"nicPltHdr"},c_table({id:'nicHdrTB',class:'nic'},c_tbody(
    c_tr(c_td({colSpan:3},c_span({id:'nicUsrPkt'}),c_span({id:'nicPltSize'}))),
    c_tr(c_td({id:'nicShow'},c_a({href:"#",click:function(){PltDec(0)}},c_img({src:gifArrowLeft})),
    c_div({style:'position:absolute;top:38px;left:0px;width:60px;',id:'nicHide',class:'nic'},
    c_a({href:"#",click:function(){PltDec(1)},innerHTML:'Budynki'}),c_br(),
    c_a({href:"#",click:function(){PltDec(2)},innerHTML:'Stocznia'}),c_br(),
    c_a({href:"#",click:function(){PltDec(3)},innerHTML:'Flota'}),c_br(),
    c_a({href:"#",click:function(){PltDec(4)},innerHTML:'StarGate'})
    ) ),c_td({id:'nicShow'},c_select({id:'nicPltSel'}),
      c_table({style:'position:absolute;top:38px;left:0px;background:#262F26;',id:'nicHide',class:'nic'},c_tbody({id:'nicTBpltB'}))),
      c_td({id:'nicShow'},
      c_a({href:"#",click:function(){PltInc(0)}},c_img({src:gifArrowRight})),
      c_div({style:'position:absolute;top:38px;left:114px;width:60px;',id:'nicHide',class:'nic'},
      c_a({href:"#",click:function(){PltInc(1)},innerHTML:'Budynki'}),c_br(),
      c_a({href:"#",click:function(){PltInc(2)},innerHTML:'Stocznia'}),c_br(),
      c_a({href:"#",click:function(){PltInc(3)},innerHTML:'Flota'}),c_br(),
      c_a({href:"#",click:function(){PltInc(4)},innerHTML:'StarGate'})
  ) ) ) ) ) );
  ById('header').appendChild(p);
  function PltSelFn(){PltNo(ById("nicPltSel").value);}
  function PltInc(Fn){var s=ById("nicPltSel");if(s.value<s.length-1)PltNo(1*s.value+1,Fn);}
  function PltDec(Fn){var s=ById("nicPltSel");if(s.value>0)PltNo(1*s.value-1,Fn);}
  function oById(oDiv, id){var o=oDiv.childNodes;for(var i=0;i<o.length;i++) {
    if(o[i].id==id)return o[i];var oBck =oById(o[i],id);if(oBck)return oBck;}return null;}
  
  HTTP_ReqOnLoad(urlPlaneta(),function(Req){
    var oDiv=c_div({innerHTML:Req.responseText}),o=oById(oDiv,"points"); ById("nicUsrPkt").innerHTML ="Pkt: "+o.innerHTML;
    o=oById(oDiv, "minPop"); ById("nicPltSize").innerHTML="Size: "+o.innerHTML+oById(oDiv,"maxPop").innerHTML;
    o=oGwiezdneWrota();var oF=oById(oDiv, "first");
    o.innerHTML=tSpanColor( oF.src.split('/')[6]!='blank.gif'?'#00FF00':'#FF0000',o.innerHTML);
    var oSel=oById(oDiv,"changePlanet1");ById("nicPltSel").innerHTML=oSel.innerHTML;
    PlanetsShow(oSel,ById('nicTBpltB'),PltNo);
  });
}
//---------------------------------------------------------------------------
function chat_View1() {
  var oMain =classNames('main')[0];
  if( !oMain ) return;
  addGlobalStyle('.nicCV{padding:0 4px 0 4px;margin:0 0 0 38px;width:604px;}');
  HTTP_ReqOnLoad( urlChat(), function(Req){
    var oShow,oHide,oSrc;
    oHide =c_div({innerHTML:Req.responseText});
    oMain.insertBefore( c_div({className:'nicCV'},oShow =c_div({class:'nic',id:'nicChatShow'})),oMain.firstChild);
    oSrc =oHide.getElementsByClassName('msg01')[0]; if(oSrc) oShow.appendChild(oSrc);
  });
}
//---------------------------------------------------------------------------
function res_store_view(Co){if(Co)return;
  addGlobalStyle(''
   +'#nicRes{margin:6px 0px 0px 6px;border:1px solid white;background:#4F4F4F;height:8px;width:70px}'
   +'#nicRes div{float:left;height:8px;}'
   +'#nicRes_metal{background:silver;}'
   +'#nicRes_krystal{background:#00FF00;}'
   +'#nicRes_deuter{background:#4040FF;}'
   +'#nicRes_gold{background:gold;}'
   +'#nicRes_naquadah{background:grey;}'
   +'#nicRes_energy{background:#FF4040;}'
  );
  ['metal','krystal','deuter','gold','naquadah','energy'].forEach(function(el){
    var o=ById(el+'Image'), oA=o.parentNode,oD =oA.parentNode,oR,tip=oA.getAttribute("title");if(!tip)return;
    oD.appendChild( c_div({id:'nicRes'},oR=c_div({id:'nicRes_'+el})));
    tip=tip.match(/([0-9.]+)/g); tip[0] =ToInt(tip[0]);tip[1] =ToInt(tip[1]);
    oR.style.width =Math.floor((70*Math.min(tip[0],tip[1]))/tip[1])+'px';
  });
}
//---------------------------------------------------------------------------
var Targets =eval(GM_getValue('targets'))||[];
function Targets_Set(){GM_setValue('targets',Targets.toSource());}
function Targets_Add(Co){if(!Targets.some(function(el,idx,arr){
  if(Co.Addr==el.Addr){arr[idx]=Co;return true;}return false;}))
  Targets.unshift(Co);Targets_Set();}
function Targets_Del(Co){Targets =Targets.filter(function(el,i,arr){return Co.Addr!=el.Addr});Targets_Set();}

function show_spy_report_CelAdd() {
  function nowYYMMDD(){var dt=new Date();return To2d(dt.getFullYear())+'-'+To2d(dt.getMonth()+1)+'-'+To2d(dt.getDate());}
  var oDst =ById('widok');oDst.rows[5].cells[1].appendChild( c_input({type:'button',value:'Dodaj Cel',
    click:function(){var oT=ById('ogolne');var oCel={Addr:oDst.rows[3].cells[1].innerHTML,
    Planet:ById('planeta').rows[0].cells[0].innerHTML,Player:oT.rows[0].cells[1].textContent, 
    Score:oT.rows[3].cells[1].textContent,Date:nowYYMMDD()};Targets_Add(oCel);}}));
}

function fleet_send_Targets(Co) {if(Co)return;
  GM_log( "fleet_send_Targets <-");
    addGlobalStyle('.nicfsaH{display: block;background-color:#091A0E;border:1px solid #4F4F4F;margin:5px auto;'
      +'position:absolute;margin-left:45px;margin-top:-2px;}'
      +'#nicfsaS:hover .nicfsaH{display:block;}'
      +'.nicfsaH{display: none;}'
      +'.nicfsaH tr:hover{background-color:#12341C;}'
      +'.nicfsaH a{font-weight:bold;color:gold;color:#B7BE85;text-decoration:none;}'
      +'.nicfsaH a:hover{color:white;}'
      +'#nicT{background-color:#222B26;border-bottom:1px solid #4F4F4F;font-weight:bold;color:gold;}'
    );
  var oDst=ById('targetForm:planetAdress'),oParent=oDst.parentNode,oTB;
  oParent.appendChild(c_div({id:'nicfsaS'},oDst,c_div({id:'nicHead',class:'nicfsaH'},c_table(oTB=c_tbody()))));
  Targets.forEach(function(cel){
    oTB.appendChild(c_tr(c_td(c_a({href:"javascript:selectColony('"+cel.Addr+"');", innerHTML:cel.Addr})),
      c_td({innerHTML:cel.Planet}),c_td({innerHTML:cel.Player}),c_td({innerHTML:cel.Score}),
      c_td({innerHTML:cel.Date}),c_td(c_a({href:"#", innerHTML:'Usuń',click:(function(cel){return function(){Targets_Del(cel)}})(cel)
  }))))});
  oTB.appendChild( c_tr(
    c_td({id:'nicT',innerHTML:'Adres'}),   c_td({id:'nicT',innerHTML:'Planeta'}),
    c_td({id:'nicT',innerHTML:'Dowódca'}), c_td({id:'nicT',innerHTML:'Punkty'}),
    c_td({id:'nicT',innerHTML:'Data'}), c_td({id:'nicT',innerHTML:'Usuń'})
  ) );
  
  GM_log( "fleet_send_Targets ->");
}
//---------------------------------------------------------------------------
var AddOns={
   session_expired:{f:function(){window.location.href='http://www.sguni.pl'}, s:'pg.session_expired',d:'Przeskakiwanie strony miniecia czasu sesji'}
  ,planet:[
     {f:planet_Menu,s:'pg.planet_Menu',d:'Wyswietlanie listy planet i produkcji'}
    ,{f:planet_GW,s:'pg.planet_GW',d:'Widok tekstowy i Dodawanie adresu GW by Speed3r'}
   ]
  ,buildings:{f:buildings_Menu,s:'pg.buildings_Menu',d:'Strona budowle skrocona'}
  ,details_details_buildings:{f:details_details_buildings_Menu,s:'pg.details_details_buildings',d:'Detale budynkow w formie wyswietlonej tabelki'}
  ,technology:{f:technology_Menu,s:'pg.technology',d:'technology_Menu'}
  ,rocket_center:{f:shipyard_Menu,s:'pg.rocket_center_Menu',d:'Strona Centrum Rakietowe skrocenie strony i dopisanie ilośći jednostek max'}
  ,shipyard:{f:shipyard_Menu,s:'pg.shipyard_Menu',d:'Strona Stocznia skrocenie strony i dopisanie ilosci jednostek max.'}
  ,fleet:{f:fleet_Menu,s:'pg.fleet',d:'Strona Flota'}
  ,fleet_send_attack:{f:fleet_send_Targets, s:'pg.fleet_send_Targets', d:'Pokaż cele'}
  ,fleet_send_recyclers:{f:fleet_send_Targets, s:'pg.fleet_send_Targets', d:'Pokaż cele'}
  ,fleet_send_bombard_fleet:{f:fleet_send_Targets, s:'pg.fleet_send_Targets', d:'Pokaż cele'}
  ,order_center:{f:order_center_Menu,s:'pg.order_center_Menu',d:'Strona Centrum dowodzenia (imperator) Wykaz flkoty po rodzaju jednostek, zestawienie surowców na planetach i suma wszystkich'}
  ,defence:{f:shipyard_Menu,s:'pg.defence_Menu',d:'Strona Obrona skrocenie strony i dopisanie ilosci jednostek max.'}
  ,show_war_report:{f:show_war_report_Menu,s:'pg.show_war_report_Menu',d:'Strona Raporty wojenne pokazanie zniszczonych jednostek'}
  ,show_spy_report:[
     {f:show_spy_report_Scr,    s:'pg.show_spy_report', d:'10.1. Strona Raporty Szpiegowskie'}
    ,{f:show_spy_report_CelAdd, s:'pg.show_spy_report_CelAdd', d:'Przycisk dodanaia planety do celow'}
   ]
  ,stargate:[
    {f:stargate_inpAddr, s:'pg.stargate_inpAddr',d:'Wprowadanie tekstowego adresu planety by Speed3r'}
   ,{f:stargate_GW_1, s:'pg.stargate_GW_1',d:'Nowy wygląd wrót by COLT'}
  ]
  ,exchange:[{f:exchange_Oferty, s:'pg.exchange_Oferty', d:'Strona Giełda oferty'}]
  ,'*':[
    {f:Planets_Change,s:'pg.Planets_Change',d:'Menu Wyboru planet bezpośrednio'}
   ,{f:cywilizacja_Menu, s:'pg.cywilizacja_Menu', d:'Dodanie podmenu do menu "Cywilizacja"'}
   ,{f:chat_View1, s:'pg.chat_View1', d:'Pogląd na bieżąco chat-u'}
   ,{f:res_store_view,s:'pg.res_store_view',d:'Widok wypelnienia magazynow'}
  ]
  ,properties: properties_Pg
};
//---------------------------------------------------------------------------
function properties_Pg(){var oDst=classNames('main')[0];if(!oDst)return;
  addGlobalStyle(''
    +'.nicPrpD{padding:2px 2px 0px 2px;margin:0 38px 0 38px;}'
    +'.nicHdr{background: pink;color:black;font-weight:bold;font-size:12px;padding:2px 2px 2px 10px;margin:0 0 2px 0px;}'
    +'.nicProp div{float:left;}'
    +'.nicProp{background:black;color:gold;font-weight:bold;padding:2px 4px 2px 4px;margin:2px 2px 2px 2px;}'
    +'.nicProp input{margin:2px 10px 2px 4px !important;width:16px;}'
  );
  var oProp =c_div({class:'nic',id:'nicPrpD'}),AddCount=0;oDst.appendChild(oProp);
  function PropAdd(o){AddCount++;if(typeof(o)=='function')return;if(!o.s)return;
    var oCB =c_inp_cb();oCB.id =o.s;oCB.checked=GM_getValue(oCB.id,1);
    addClick(oCB, function(){var oCB=ById(o.s);if(oCB)GM_setValue(o.s, oCB.checked?1:0);});
    oProp.appendChild(c_div({class:'nicProp'},oCB, c_Txt(o.d)));
  }
  for(var AddOn in AddOns){var oDstSub=c_div({className:'nicHdr',innerHTML:'AddOn : '+AddOn});
    oProp.appendChild(oDstSub);var oAddOn =AddOns[AddOn];if(oAddOn.length)oAddOn.forEach(function(el){PropAdd(el);});
    else PropAdd(oAddOn);}
  oProp.appendChild(c_div({className:'nicProp',innerHTML:AddCount+'. Dodatk&oacute;w'}));
}

//---------------------------------------------------------------------------
function AddOnGet(Co){var bck=GM_getValue(Co,1);if(typeof(bck)=='undefined'){bck=unsafeWindow['_'+Co];
  if(typeof(bck)=='undefined')bck=1;}else unsafeWindow['_'+Co]=bck;return bck;}
//---------------------------------------------------------------------------
function AddOnEval(Co,Args){var oAddOn=AddOns[Co];switch( typeof(oAddOn) ) {
    case 'function':oAddOn(Args);break;
    case 'object':if(oAddOn.length)oAddOn.forEach(function(el){if(!el.s||AddOnGet(el.s))el.f(Args);});
      else if(!oAddOn.s||AddOnGet(oAddOn.s))oAddOn.f(Args);break;
    default:GM_log("AddOns["+Co+"] -Undefined");
  }
}
//---------------------------------------------------------------------------
function _main(Co){AddOnEval(_pg,Co);AddOnEval('*',Co);}
//---------------------------------------------------------------------------
GM_log("Start");
var _pg=URL.match(/(\w+)\.seam/)[1];
if(_pg != 'session_expired'){
  var ResName ={metal:ResNameNo(0),krystal:ResNameNo(1), deuter:ResNameNo(2), gold:ResNameNo(3),
    naquadah:ResNameNo(4), scrap:ResNameNo(5)};
  var _url=URL.split('/pages')[0];
  var _pg=StrSeek(URL,["pages/",".seam"]).replace(/\//g,"_");
  var _cid=StrSeek(URL,["cid=",null]);
  var div_prawo=ById("prawo");
  var divMain=classNames('main')[0];
  addGlobalStyle('.nicScript{color:pink;font-size:12px;font-weight:bold;text-decoration:none;}');
  var divMenu=classNames('dol')[0];
  if(divMenu)divMenu.appendChild(c_a({class:'nicScript',href:ScriptLink},c_b({innerHTML:ScriptName+':&nbsp('+ScriptVersion+')'})));
}

if(unsafeWindow.A4J){var _AJAX=unsafeWindow.A4J.AJAX,_status=_AJAX.status;
  _AJAX.status=function(){var a=arguments,bck=_status(a[0],a[1],a[2]);
    if(!a[2]){_main(true);if(_AJAX.nic)_AJAX.nic(true);}return bck;}}
_main();
GM_registerMenuCommand(ScriptName+' v'+ScriptVersion+" > Check new version",function(){GM_openInTab(ScriptLink)});
GM_log("Stop");
