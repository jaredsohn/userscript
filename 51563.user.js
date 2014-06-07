// ==UserScript==
// @name           Damoria
// @namespace      X:\Projekty\Damoria
// @description    Damoria Script
// @include        http://damoria.bbgames.com/
// @include        http://damoria.pl/
// ==/UserScript==

var ScriptName='Damoria: Tools';
var ScriptAutor='nic35025';
var ScriptVersion='0.1.5';
var ScriptLink='http://userscripts.org/scripts/show/51563';

//---------------------------------------------------------------------------
// Bibloteka uniwersalnych funkcji
//---------------------------------------------------------------------------
var dc =document;
var URL =window.location.href;

function ById(id) { return dc.getElementById(id);}
function c_img() { return dc.createElement('img'); }
function c_div(Co) { var bck =dc.createElement('div'); if( Co ) bck.appendChild(Co); return bck;}
function c_input(Co) { var bck=dc.createElement('input'); if( Co ) bck.appendChild(Co); return bck;}

function c_table() { return dc.createElement('table'); }
function c_td()    { return dc.createElement('td'); }
function c_tr()    { return dc.createElement('tr'); }

function c_abs(co) { co.style.position ="absolute"; return co; }
function c_rel(co) { co.style.position ="relative"; return co; }
function c_select() { return dc.createElement('select'); }
function c_option() { return dc.createElement('option'); }

function c_a(Co)   { var bck =dc.createElement('a'); if( Co ) bck.appendChild(Co); return bck; }
function c_b(Co)   { var bck=dc.createElement('b'); if( Co ) bck.appendChild(Co); return bck; }
function c_br()    { return dc.createElement('br'); }
function c_Txt(Txt){ return dc.createTextNode(Txt); }

function c_inp_img() { var bck =dc.createElement("input"); bck.type="image"; bck.borderWidths ="0px";
  return bck; }
function c_script(js) { var bck =dc.createElement("script"); bck.type ="text/javascript"; bck.innerHTML =js;
  return bck;
}
function tb_arr() { return dc.getElementsByTagName("table"); }
function a_arr()  { return dc.getElementsByTagName("a"); }

function classNames(Co) { return dc.getElementsByClassName(Co); }

//---------------------------------------------------------------------------
function StrSeek( Str, arr ) {
  var bck =Str;
  for( var i=0; i != arr.length-1; i++ ) {
    bck = bck.split( arr[i] );
	if( bck.length > 1 ) bck =bck[1];
	else return null;
  }
  if( arr[i] ) {
    bck =bck.split( arr[i] );
    bck =bck.length > 1 ? bck[0] : null;
  }
  return bck;
}
//---------------------------------------------------------------------------
function BodyGet() { return dc.body.innerHTML; }
function BodySeek( arr ) { return StrSeek( BodyGet(), arr ); }
//---------------------------------------------------------------------------
function ObjClick(obj) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  return obj.dispatchEvent(evt);
}
//---------------------------------------------------------------------------
function sprintf(frm) {
  for( var i = 1; i < arguments.length; i++)
    frm = frm.replace(/\%s/, arguments[i]);
  return frm;
}
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
// Bibloteka lokalnych funkcji
//---------------------------------------------------------------------------
function c_td_build3() { var bck =c_td(); bck.className = "build3"; return bck; }
function c_tr_build3() { var bck =c_tr(); bck.className = "build3"; return bck; }

function SIDget() { return BodySeek( ['sid=','"'] ); }
//---------------------------------------------------------------------------
// http://damoria.pl/game.php?village=403503&screen=build_main&&tab=main&sid=ca3c2108f9d9b2255d572ccca9c2e717
function PageGo( village, screen ) {
  var _url =URL.split('?')[0];
  window.location.href
//  GM_log(
  =sprintf('%s?village=%s&screen=%s&&tab=&sid=%s',_url,village,screen,_sid)
//  );
}
//---------------------------------------------------------------------------
function ResGet( id ) { var Co =ById(id); return Co ? Co.innerHTML.replace(/\./g,"") : 0; }
//---------------------------------------------------------------------------
function GoodsGet() {
  var bck =[];
  bck.Kamien    =1*ResGet('iRes1');
  bck.Drewno    =1*ResGet('iRes2');
  bck.Ruda      =1*ResGet('iRes3');
  bck.Spichlerz =1*ResGet('storage');
  bck.Kryjowka  =1*ResGet('laid');
  return bck;
}
//---------------------------------------------------------------------------
function VillageList() {
  var bck =[];
  var tb =ById('clist2m');
  if( !tb ) return bck;
  for( var RowNo=1; RowNo < tb.rows.length; RowNo++ ) {
    bck.push( StrSeek( tb.rows[RowNo].cells[0].innerHTML, ['village=', '&amp'] ));
  }
  return bck;
}
//---------------------------------------------------------------------------
function getStart()  { return GM_getValue('Damoria_Start', 0 ) };
function setStart(No){        GM_setValue('Damoria_Start',No ) };
function getTask()   { return GM_getValue('Damoria_Task', 0 ) };
function setTask(No) {        GM_setValue('Damoria_Task',No ) };
function getDT()     { return GM_getValue('Damoria_dt',   0 ) };
function setDT(dt)   {        GM_setValue('Damoria_dt',  dt.toString() ) };
function getErr()    { return GM_getValue('Damoria_Err', 0 ) };
function setErr(No)  {        GM_setValue('Damoria_Err',No ) };
//---------------------------------------------------------------------------
function Build_VillageGet()   { return GM_getValue('Damoria_Build_Village_'+_village,''); }
function Build_VillageGetArr(){ var bck =Build_VillageGet(); return bck ? bck.split(',') : []; }
function Build_VillageSet(Co) { GM_setValue('Damoria_Build_Village_'+_village,Co.toString()); }
//---------------------------------------------------------------------------
function Build_VillageAdd(pre) { 
  var Co =Build_VillageGet();
  Build_VillageSet( Co ? Co+','+pre : pre );
}
//---------------------------------------------------------------------------
function Build_VillageDel(preNo) { 
  var arr=Build_VillageGetArr();
  switch( typeof(preNo) ) {
    case 'string': preNo =arr.indexOf(preNo);
    case 'number': arr =(preNo ? arr.slice(0,preNo):[]).concat(arr.slice(preNo+1)); break;
    default: return;
  }
  Build_VillageSet(arr);
}
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
// Start
//---------------------------------------------------------------------------
GM_log("Start");
// "http://damoria.com/game.php?village=403503&screen=build_main&&tab=main&sid=9c25420ae3000aee72ae998d2d61c5c7";
var _screen = StrSeek( URL, ["screen=" , "&"]);
var _tab    = StrSeek( URL, ["tab="    , "&"]);
var _village= StrSeek( URL, ["village=", "&"]);
var _sid    = StrSeek( URL, ["sid="    , null]);

//---------------------------------------------------------------------------
/*
var tbs = dc.getElementsByTagName("table");
//tbs.length
for( var i =0; i < tbs.length; i++ ) {
  var tb =tbs[i];
  log( i+". "+ tb.className+"  " + tb.width);
}
<table class="borderlist3" style="border: 1px solid rgb(221, 221, 221); width: 650px;" border="0" cellpadding="2" cellspacing="1">
<table class="borderlist3" style="border: 1px solid rgb(0, 0, 0);" cellpadding="1" cellspacing="1" width="650">
12. c=borderlist3  w=  cp=undefined
13. c=  w=100%  cp=undefined
14. c=borderlist3  w=650  cp=undefined <-
15. c=borderlist3  w=650  cp=undefined
16. c=  w=100%  cp=undefined
*/
function Build_Find() {
  for( var i=1; i < tb_arr().length; i++ ) {
    var tb0 =tb_arr()[i-1];
    var tb1 =tb_arr()[i];
    if( tb0.width =="100%" &&
        tb1.className == "borderlist3" &&
        tb1.width=="650" ) {
      return i;
    }
  }  
  return 0;
}
//---------------------------------------------------------------------------
var Build_tbDst;
var Build_tbSrc;
//---------------------------------------------------------------------------
function Build_DstLine() {
  var tr =c_tr();
  var td =c_td();
  td.className ="borderlist2";
  td.style.border ="0px none";
  td.colSpan ="6";  
  tr.appendChild(td);
  return tr;
}
//---------------------------------------------------------------------------
function Build_DstMake() {
  var tb =c_table();
  with( tb ) {
    className ="borderlist3";
    width ="650";  style.border ="1px solid rgb(0, 0, 0)";
    cellPadding ="1";  cellSpacing ="1";
    innerHTML =
      '<tbody>' +
        '<tr class="borderlist31">' +
          '<td class="borderlist31" colspan="2">Zlecenie budowy</td>' +
          '<td class="borderlist31">Czas trwania</td>' +
          '<td class="borderlist31">Uko�czenie</td>' +
          '<td class="borderlist31">Przerwij</td>' +
          '<td class="borderlist31">Budowa natychmiastowa (3 x Z�oto)</td>'+
        '</tr>' +
      '</tbody>';
  }
  tb.appendChild( Build_DstLine() );
  return tb;
}
//---------------------------------------------------------------------------
function Build_FindPre(pre) {
  for( i=2; i < Build_tbSrc.rows.length; i +=2 ) {
    var tr =Build_tbSrc.rows[i];
    if( pre ==tr.cells[2].childNodes[1].id.split("Button")[1] ) {
      return tr;
    }
  }
  return null;
}
//---------------------------------------------------------------------------
function Build_Del(trDst) {
  GM_log( "Build_Del() -Start" );
  GM_log( trDst );
  var rowIndex =trDst.rowIndex;
  GM_log( sprintf('rowIndex=%s',rowIndex ));
  
  var tbDst =trDst.parentNode;
  var rowsLength =tbDst.rows.length;
//  GM_log( sprintf('rows.length=%s',tbDst.rows.length ));
  tbDst.deleteRow(rowIndex);
  tbDst.deleteRow(rowIndex);
  
  Build_VillageDel( Build_VillageGetArr().length - ((rowsLength-rowIndex)/2) );
  
  //Build_tbSrc.find
  GM_log( "Build_Del() -Stop" );
}
//---------------------------------------------------------------------------
function Build_DstAdd(pre) {
  GM_log("Build_Add('"+pre+"') -Start");
  var trSrc =Build_FindPre(pre);
  if( trSrc == null ) return;
  var trDst =c_tr_build3();
  var td;
  trDst.appendChild( trSrc.cells[0].cloneNode(true) );
  trDst.appendChild( trSrc.cells[1].cloneNode(true) );
//  var tm =trSrc.cells[7].
//  var tm =StrSeek( trSrc.cells[8].childNodes[3].innerHTML, ['Czas budowy:','>','<']);
  td =c_td_build3();  td.innerHTML ='';  trDst.appendChild( td );
  var tm =trSrc.cells[8].childNodes[3].innerHTML.split(' ( ');
  td =c_td_build3();  td.innerHTML =tm[0]+'<br>'+(tm[1]||"").split(' )')[0];  trDst.appendChild( td );
  
  td =c_td();
    var div =trSrc.cells[8].childNodes[1].cloneNode(true);
    var id =div.id;  div.id =null;
    div.addEventListener("click", function(){Build_Del(trDst); ObjClick(ById(id));}, true);
    td.appendChild( div );
  trDst.appendChild( td );

  td =c_td();
    var div =c_div();
    div.className ="IconCross infoCursor";
    div.addEventListener("click", function(){Build_Del(trDst);}, true);
    td.appendChild(div);
  trDst.appendChild( td );
//
if( 0 ) {
  Build_tbDst.appendChild(trDst);
  Build_tbDst.appendChild(Build_DstLine());
} else {
  var tbody =Build_tbDst.getElementsByTagName("TBODY")[0];
  tbody.appendChild(trDst);
  tbody.appendChild(Build_DstLine());
}
//  GM_log("Build_Add('"+pre+"') -Stop");
}
//---------------------------------------------------------------------------
function Build_Add1(pre) {
  GM_log( "Build_Add1('"+pre+"') -Start" );
  Build_VillageAdd(pre);
  Build_DstAdd(pre);
  GM_log( "Build_Add1() -Stop" );
}
//---------------------------------------------------------------------------
// pre =
function Build_SrcAdd(pre) {
  var div =c_div();
  //div.className ="IconCross infoCursor";
  div.className ="buildIcon infoCursor";
  div.id="buildButton"+pre+"Add";
  div.addEventListener("click", function(){Build_Add1(pre);}, true);

  var td =c_td_build3();
  td.width =16;
  td.appendChild(div);
  
  div =c_div();
  div.id ="buildInfo"+pre+"Add";
  div.className ="BuildInfoNotice";
  div.style.marginLeft ="-35px";
  div.style.display ="none";
  div.appendChild(c_b(c_Txt("Dodaj do listy zaplanowanych")));
  td.appendChild(div);
  
  td.appendChild( c_script( 
		"/* <![CDATA[ */" +
		"$('#buildButton"+pre+"Add')" +
		  ".bind('mouseover',function(){$('#buildInfo"+pre+"Add').show();})" +
			".bind('mouseout',function(){$('#buildInfo"+pre+"Add').hide();});" +
    "/* ]]> */"
  ));
  return td;
}
//---------------------------------------------------------------------------
function build_main_Menu() {
  GM_log( "build_main_Menu -Start");
  var i = Build_Find();
  if( i==0 ) return;
  Build_tbDst = tb_arr()[i];
  Build_tbSrc = tb_arr()[i+1];
  if( Build_tbSrc.className != "borderlist3" ) {
    Build_tbDst.parentNode.insertBefore( Build_DstMake() ,Build_tbDst);
    Build_tbDst.parentNode.insertBefore( c_br() ,Build_tbDst);
    Build_tbDst.parentNode.insertBefore( c_br() ,Build_tbDst);
    Build_tbDst = tb_arr()[i];
    Build_tbSrc = tb_arr()[i+1];
  }
  // wkładanie zadań do tbDst
  var BuildArr = Build_VillageGetArr();
  for( i =0; i!= BuildArr.length; i++ ) Build_DstAdd( BuildArr[i] );
  
  // wkladanie zadan do tbDst - tabela dolna
  // dokładanie przycisków do tbSrc
  for( i=2; i < Build_tbSrc.rows.length; i +=2 ) {
    var tr =Build_tbSrc.rows[i];
    var pre =tr.cells[2].childNodes[1].id.split("Button")[1];
    tr.appendChild( Build_SrcAdd(pre) );
  }
  GM_log( "build_main_Menu -Stop");
}
//---------------------------------------------------------------------------
// http://damoria.com/game.php?village=362203&screen=castle_overview&sid=5a56425bbe4cc77fc6e8d06980a7a700
function Castles_Tb() {
  var Result;
  for( var i=1; i < tb_arr().length; i++ ) {
    Result =tb_arr()[i];
    if( Result.style.width =="640px" ) {
      return i;
    }
  }  
  return 0;
}
//---------------------------------------------------------------------------
function castle_overview_Menu() {
  var Castles_tb =dc.getElementsByTagName("h1")[0].nextSibling.nextSibling;
  // row[0] -pusta piszemy co sie konczy
  // row[1] - dwa zamki w wierszu
  //   cell[0], cell[1]
  //     table
  //       row[0] - nazwa zamku njalepiej wyuskać a i w innerHTML -nazwa
  //         <a href="game.php?village=285908&screen=castle_overview&x=672&y=249&sid=fba8fbf950f8af52508a3818f0891f08">Ania</a>
  //       row[1] - resztę z zamku
  //         cell[0] -ikony budynków
  //         cell[1] -resztę opisu
  //           table
  //             row[0] - Spichlerz
  //             row[1] - ikony i zawartość
  //             row[2] - puste
  //             row[3] - Kryjówka
  //             row[4] - ikony i zawartość
  //             row[5] - puste
  //             row[6] - Budynek w budowie
  //               cell[0].innerHTML == '<b>Budynek w budowie:</b>'
  //             row[7] - Lista
  //               cell[0] - puste
  //               cell[1] - lista
  //                 table
                    // row[0] - pierwsza budowa
                    // row[1] - druga budowa budowa
                    //   cell[0] - Nazwa
                    //   cell[1] - Poziom
                    //   cell[2] - czas <span>
  //         
  if( !Castles_tb ) return;
  


  var RowNo =-1, ColNo =-1;
  var TmLast ='';
  for( var i=1; i < tb_arr().length; i++ ) {
    var tb = tb_arr()[i];
    if( tb.rows.length >= 7 &&
        tb.rows[6].cells[0].innerHTML =='<b>Budynek w budowie:</b>' ) {
	  
	  
    }
  }
}
//---------------------------------------------------------------------------
// http://damoria.com/game.php?village=362203&screen=report&sid=5a56425bbe4cc77fc6e8d06980a7a700
function raport_Menu() {
  for( i=0; i < a_arr().length; i++ ) {
    var a = a_arr()[i];
    if( a.innerHTML =="Oferty" ) {
      var inp = a.parentNode.parentNode.cells[0].childNodes[0];
      inp.checked =true;
    }
  }
}
//---------------------------------------------------------------------------
function xbay_Menu() {
  function _Count() {
    for( var i=0; i != tb_arr().length; i++ ) {
	  var tb = tb_arr()[i];
	  if( tb.width == 640 ) {
	    // z maks. 8000 jednostkami
	    return 1*StrSeek( tb.rows[1].cells[0].innerHTML, ['z maks. ',' '] );
	  }
	}
	return 0;
  }
  GM_log( 'Xbay_Menu -Start' );
  var GoodSrc  = dc.getElementsByName('res1')[0];
  var GoodDst  = dc.getElementsByName('res2')[0];
  var amount   = dc.getElementsByName('amount')[0];
  amount.value = 1000;
  var count    = dc.getElementsByName('count')[0];
  var Goods    = GoodsGet();
  with( Goods ) {
//    GM_log( 'Kamien:'+Kamien+' Drzewo:'+Drewno+' Ruda:'+Ruda );
    if( Kamien >= Drewno && Kamien >= Ruda   )   GoodSrc.selectedIndex =2;
    if( Drewno >= Kamien && Drewno >= Ruda   )   GoodSrc.selectedIndex =3;
    if( Ruda   >= Kamien && Ruda   >= Drewno )   GoodSrc.selectedIndex =4;
    var iMin;
    if( Kamien <= Drewno && Kamien <= Ruda   ) { GoodDst.selectedIndex =2; iMin=Kamien; }
    if( Drewno <= Kamien && Drewno <= Ruda   ) { GoodDst.selectedIndex =3; iMin=Drewno; }
    if( Ruda   <= Kamien && Ruda   <= Drewno ) { GoodDst.selectedIndex =4; iMin=Ruda;   }
    count.value = Math.round( Math.min( ((Kamien+Drewno+Ruda)/3)-iMin, _Count() ) / amount.value );
  }
  GM_log( 'Xbay_Menu -Stop' );
}
//---------------------------------------------------------------------------
// tbArray[14].rows[1].cells[1]
//   .childNodes[1].rows[1].cells[0]
//     .childNodes[1].rows[0].cells[1].firstChild.innerHTML // spichlerz kamień
//     .childNodes[1].rows[0].cells[3].firstChild.innerHTML // spichlerz drewno
//     .childNodes[1].rows[0].cells[5].firstChild.innerHTML // spichlerz ruda
//   .childNodes[1].rows[4].cells[0]
//     .childNodes[1].rows[0].cells[1].firstChild.innerHTML // kryjówka kamień
//     .childNodes[1].rows[0].cells[3].firstChild.innerHTML // kryjówka drewno
//     .childNodes[1].rows[0].cells[5].firstChild.innerHTML // kryjówka ruda

//---------------------------------------------------------------------------
//21. c=  w=325px  cp=undefined
//28. c=  w=318px  cp=undefined
//35. c=  w=325px  cp=undefined
//42. c=  w=318px  cp=undefined
function Overview_TaskSeek() {
  function _VillageObj(tbNo) {
    function _ZasobyGet(Obj) {
      var bck =[];
      bck.kamien =Obj.rows[0].cells[1].firstChild.innerHTML;
      bck.drewno =Obj.rows[0].cells[3].firstChild.innerHTML;
      bck.ruda   =Obj.rows[0].cells[5].firstChild.innerHTML;
      return bck;
    }
    function _BuildGet(Obj) {
      var bck =[];
      for( i =0; i != Obj.rows.length; i++ ) {
        bck[i] =[];
        bck[i].name =Obj.rows[i].cells[0].innerHTML;
        if( Obj.rows[i].cells.length ==3 ) {
          bck[i].lvl  =Obj.rows[i].cells[1].innerHTML;
          bck[i].time =Obj.rows[i].cells[2].firstChild.innerHTML;
        }
      }
    }
    var bck =[];
    var tb = tb_arr()[tbNo].rows[1].cells[1].childNodes[1];
    bck.spichlerz =_ZasobyGet( tb.rows[1].cells[0].childNodes[1] );
    bck.kryjowka  =_ZasobyGet( tb.rows[4].cells[0].childNodes[1] );
    bck.build     =_BuildGet ( tb.rows[7].cells[0].childNodes[1] );
    return bck;  
  }
  GM_log('Overview_TaskSeek -Start');
  for( var i =0; i < tb_arr().length; i++ ) {
    var tb =tb_arr()[i];
    if( tb.style.width =='318px' || tb.style.width =='325px'  ) {
      var VillageObj =_VillageObj(tb);
    }
  }
  GM_log('Overview_TaskSeek -Stop');
}
//---------------------------------------------------------------------------
// :: Surowce do schowka ::
// laid id ='res1Add' ... pole do klikniecia 
// laid id ='inAddRes1' ... pole input do wpisania ilosci surowca wszystkie name 'iAmount'
// laid id ='fAddRes1' ... przycisk do wprowadzenia
// laid name ='addResSubm' -przycisk do wyslania
// :: Surowce do schowka ::
// laid id ='res1Del' ... pole do wpisania maximum
// laid id ='infoRes1B' -checkbox 
// laid id ='inDelRes1' name='iAmount' -ile
// laid id ='fDelRes1' -name='delResSubm' -button do wyslania
//---------------------------------------------------------------------------
function laid_Menu() {

}
//---------------------------------------------------------------------------
function MainRunGet()    { return GM_getValue('Damoria_Run',false); }
function MainRunSet(Co)  { GM_setValue('Damoria_Run',Co); }
//---------------------------------------------------------------------------
function MainTaskGet()   { return GM_getValue('Damoria_MainTask',0); }
function MainTaskSet(Co) { GM_setValue('Damoria_MainTask',Co); }
//---------------------------------------------------------------------------

function Main_Task() {
  function FormFill() {
    for( var i=1; i != dc.forms.length; i++ ) {
	  var frm =dc.forms[i];
	  GM_log( "frm.name="+frm.name );
	  var iCount =1*StrSeek( frm.parentNode.innerHTML, [');">','</a>'] );
	  GM_log( "iCount="+iCount );
      if( iCount ) {
		frm.elements[2].value =iCount;
        frm.submit();
		return false;
      }	  
	}
	return true;
  }
  var Task = MainTaskGet();
  GM_log( sprintf("Task=%s", Task ) );
  switch( Task ) {
    case 0: // barrack
	  // http://damoria.pl/game.php?village=371957&screen=build_barracks&sid=66a659704a413b8d814b47c2e17bcd39
      MainTaskSet(Task+1);
	  PageGo( VillageList()[0], "build_barracks" );
	  break;
	case 1: MainTaskSet(Task+1); break;
	case 2: // wszystkie pola puste
	  MainTaskSet(Task-1); if( !FormFill() ) break;
	  MainTaskSet(Task+1); 
	  break;
	case 3:
	  // http://damoria.pl/game.php?village=371957&screen=build_stable&sid=66a659704a413b8d814b47c2e17bcd39
      MainTaskSet(Task+1);
	  PageGo( _village, "build_stable" );
	  break;
	case 4: MainTaskSet(Task+1); break;
	case 5:
	  MainTaskSet(Task-1); if( !FormFill() ) break;
	  MainTaskSet(Task+1); 
	  break;
	case 6:
	  // http://damoria.pl/game.php?village=371957&screen=build_kata&sid=66a659704a413b8d814b47c2e17bcd39
      MainTaskSet(Task+1);
	  PageGo( _village, "build_kata" );
	  break;
	case 7: MainTaskSet(Task+1); break;
	case 8:
	  MainTaskSet(Task-1); if( !FormFill() ) break;
	  MainTaskSet(Task+1); 
	  break;
	case 9: MainTaskSet(Task+1); break;
	case 10: // przejscie na następny zamek
	  var Villages =VillageList();
	  var i =Villages.indexOf(_village);
	  if( i != -1 && (i+1) < Villages.length ) {
	    MainTaskSet(1);
		GM_log("***CLICK***");
	    PageGo( Villages[i+1] , "build_barracks" );
		break;
	  }
	  MainTaskSet(Task+1); break;
	case 11:
      MainRunSet(false);
	  //window.location.reload(true);
      break;
  }
}
//---------------------------------------------------------------------------
// założenie wywołujemy zestawienie village
// gdy jest zakoncone co wywolujemy budowanie
// sprawdzamy co jest na liście pierwsze
// sprawdzamy :
// - mamy główne zasoby do budowy -> budujemy
// - brak zasobów sprawdzamy ze schowkiem gdy są pobieramy i budujemy
// - gdy brak a suma zasobów do budowy jest większa niz potrzebne uruchamiamy rynek wystawiamy oferty i czekamy
// - gdy total brak to czekamy na zasoby.
// jeśli brak zasobów to możemy
// - czekac na zasoby
// - budowac kolejną pozycję z listy
// - gdzy koniec listy to stop
// - uzupelniamy zasoby w schowku
// założenie maks. 10 village
function Main_Task1() {
  var Task = MainTaskGet();
  switch( Task ) {
    case 0: // wołamy zestawienie village
      // http://damoria.com/game.php?village=403503&screen=castle_overview&sid=5a56425bbe4cc77fc6e8d06980a7a700
      MainTaskSet(Task+1);
      PageGo( _village, 'castle_overview' );
      break;
    case 1: // analiza village
      var VillageNo =Overview_TaskSeek();
      if( VillageNo != -1 ) { 
        MainTaskSet(Task+1);
        var obj =ById('main'+VillageNo);
        if( obj ) ObjClick(obj);
      }
      break;
    case 2: // Build Village
      if( Build_Village() ) break
        MainTaskSet(Task-1); // do 
      break;
    case 30: // odkladanie do schowka
    case 31: // kamien
    case 32: // drewno
    case 33: // ruda
      MainTaskSet(0); // do poczatku
	  MainRunSet(false);
	  win
      break;
  }
}
//---------------------------------------------------------------------------
function Zamki_click() {
  PageGo( _village, "castle_overview" );
/*
  http://damoria.pl/game.php?village=403503&screen=build_main&&tab=main&sid=b1890aef5f58c2bcb6a757f1beab5fe4
  window.location.href =
    "http://damoria.com/game.php?" 
	 + "village="+_village
	 +"&screen=castle_overview"
	 +"&tab=main"
	 +"&sid="+SID_get9c25420ae3000aee72ae998d2d61c5c7";
  
  castle_overview
*/
}
function Run() {
  MainRunSet(Co);
  MainTaskSet(0);
  //window.location.reload(true);
  setInterval(Main_Task, 1000);
}


function build_place_Menu() {
  function _Timer() {
    var tb =classNames('borderlist')[0];
    var eds =['u_spear', 'u_spy'  , 'u_ram',
              'u_sword', 'u_light', 'u_catapult',
              'u_axe'  , 'u_heavy', 'u_bow' ];
    var frm =dc.forms[1];
    var sum =0;
    for( var i=0; i < eds.length; i++ ) {
      var ed = frm.elements.namedItem(eds[i]);
      sum += 1*ed.value;
    }
    var _html =classNames('box_header')[0].parentNode.innerHTML;
    var max =1*StrSeek(_html,['<b>','</']);
    var d =max-sum;
    if( d < 0 ) { sum ='<span class="tNOKC">'+sum+'</span>';
                  d ='<span class="tNOKC">'+d+'</span>'; }
    tb.rows[4].cells[2].innerHTML =sprintf( '<b>%s -%s =%s</b>',max,sum,d);
  }
  GM_log('build_place_Menu -Start');
  var tb =classNames('borderlist')[0];
  tb.rows[4].cells[1].colSpan =6;
  var td =c_td();
  td.colSpan =2;
  td.align ='rigth';
  td.innerHTML ='???';
  tb.rows[4].appendChild(td);
  setInterval(_Timer, 1000);
  GM_log('Overview_TaskSeek -Stop');
}


function MainBtnAdd( Co ) {
  for( var i =0; i < tb_arr().length; i++ ) {
    var tb =tb_arr()[i];
    if( tb.style.width =='700px' ) {
      var btn   =c_input();
      btn.type  ='button';
      btn.id    ='idBtnStop';
      if( Co ) {
        btn.value ='Start';
        btn.addEventListener('click', function(){MainRunSet(Co); MainTaskSet(0);/*window.location.reload(true);*/}, true);
      } else {
        btn.value ='Stop';
        btn.addEventListener('click', function(){MainRunSet(Co);}, true);
      }
      tb.rows[0].cells[0].appendChild( btn );
  //    btn   =dc.createElement('input');
        btn   =c_input();
      btn.type  ='button';
      btn.value ='Zamki';
      btn.addEventListener('click', Zamki_click, true);
      tb.rows[0].cells[0].appendChild( btn );
      break;
	  }
  }
}
//---------------------------------------------------------------------------
if( MainRunGet() ) {
  // dodać przycisk stop
  MainBtnAdd(false);    
  // wolanie timerka wolany co 1sek
  setInterval(Main_Task, 1000);
} else {
  // dodać przycisk start
  MainBtnAdd(true);

  switch( _screen ) {
    case 'build_main'     : build_main_Menu();      break;
    case 'castle_overview': castle_overview_Menu(); break;
    case 'raport'         : raport_Menu();          break;
    case 'xbay'           : xbay_Menu();            break;
    case 'laid'           : laid_Menu();            break;
    case 'build_place'    : build_place_Menu();     break;
  }
}
//---------------------------------------------------------------------------
GM_registerMenuCommand(ScriptName +' v' +ScriptVersion +" > Check new version", function(){ GM_openInTab(ScriptLink)});
GM_log("Stop");
