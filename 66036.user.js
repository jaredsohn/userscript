// ==UserScript==
// @name          Kaskus Fixed Text Info Menu
// @namespace     http://userscripts.org/scripts/show/66036
// @include       *.kaskus.co.id/*
// @include       *.kaskus.us/*
// @include       *.kaskus.com/*
// @exclude       http://ad.kaskus.com/*
// @version       1.9
// @dtversion     120603109
// @timestamp     1338723597683
// @description   (Kaskus Forum) Fixed view Text Info & check nimpuk Cendol/GRP | Bata/BRP is ready
// @author        idx (http://userscripts.org/users/idx)
// @site          http://ocean-leecher.net/forum/
// --
/* Log

version 1.9 - 2012-06-03
  Fix aim other post to check rep.status

// ==/UserScript==

version 1.8 - 2012-05-27
include domain .co.id

version 1.7 - 2011-04-05
Fix always use native-XHR. (now Multifox is supported)

version 1.6 - 2011-03-06
Fix rewrite post-id pointer for check-cendol

version 1.5 - 2011-03-05
Fix failed get_token() on cendol-pending

:
:
version 0.1 - 2010-01-09
Init build
------------
By: Idoenk :: CCPB
------------
EndLog */

(function() {

// Initialize Global Variables
var gvar=function(){};
gvar.__DEBUG__ = 0;  
  
/*
============USER SETTING -- You may change some values here==================
javascript:window.alert(new Date().getTime());
*/
// purpose utk test (pre)-ngasi cendol ke postid nya mimin, Thread : (LOUNGE) - "Daftar IP yg di Banned karena SARA"
// should check the existence link to make cendol status work properly
// if you have give grp/brp to this user, you have to find another post link from another user. -- based on kaskus cendol rules.
// http://www.kaskus.co.id/showpost.php?p=136644639
// ---rewrite---[110306]
// Thread: (FJB) - Readme - "Transaksi online dan aman"
// http://www.kaskus.co.id/showpost.php?p=53141384
// ---rewrite---[120603]
// Thread: whatever, Officer change its status to Auto banned, can not give rep to them
// http://www.kaskus.co.id/showpost.php?p=323735013
// http://www.kaskus.co.id/showpost.php?p=323758344
gvar.post_id  = '323735013';


const LANGUAGE_TEXT = {
    'en' : {
      MENU_1: " Fixed-Menu ON"
      ,     MENU_2: " Tickler Killer ON"
      ,     MENU_3: " Status Cendol"
      
      ,     TEXT_1: "Checking cendol Status"
      ,     TEXT_2: "CENDOL READY"
      ,     TEXT_3: "cendol pending"
	  ,     TEXT_4: "--ERROR--"
    }
};

//============stop editing rite here==================

const OPTIONS_BOX = {
  // Color Loader
  LIGHT_COLOR_DL_OPTIONS_TEXT:         ['00CC00']
  , LIGHT_COLOR_DL_BACKGROUND:         ['EEEEEE']
  , LIGHT_COLOR_DL_BORDER:             ['CCCCCC']
  , LIGHT_COLOR_MNU_BORDER:            ['6C6C6C']
  
  , LIGHT_COLOR_GARIS:                 ['55FF55']
  
  , LIGHT_COLOR_DL_POPUP_TEXT:         ['0000DF']
  , LIGHT_COLOR_DL_POPUP_BG_ALT2_IN:    ['96E0FC']
  , LIGHT_COLOR_DL_POPUP_BG_ALT2_OUT:   ['E1E4F2']
  
  , LIGHT_COLOR_DL_POPUP_BG_GREEN_IN:   ['04EE79']
  , LIGHT_COLOR_DL_POPUP_BG_GREEN_OUT:  ['97FBAD']
  
  // Initial/Default state options
  , KEY_FIXED_MNU:                     [1] // 1:OFF  2:ON
  , KEY_TCKILL_MNU:                    [4] // 3:OFF  4:ON
  , KEY_PAUSED:                        [0] // pause auto-check
  
};
const GMSTORAGE_PATH      = 'GM_';

// initialize global var
function init(){
  if(page_is_notloaded('Page is temporary not available')) {
    show_alert('Page is not available', 0);
	return;
  }
  
  // it's needed  for cross-browser work properly
  ApiBrowserCheck();  // snippet code - By GI-Joe
  
  //********** SETTING Global Variables ************//
  var kdomain = domainParse();
  gvar.domain = kdomain.prot + '//'+ kdomain.host +'/';
  gvar.phprep = gvar.domain + "reputation.php?p=";
  gvar.securitytoken = '';
  gvar.info  = {};
  
  // Fixed Menu Value; default: 1==OFF ; kill Tickler; check cendol(dummy value);
  gvar.mnu_Value = [1, 1, 1];
  gvar.cendol_id = ['td_cendol_img', 'td_cendol_stat'];
  gvar.options_id = 'td_options';
  
  gvar.zIndex = 99996;
  
  start_Main();
}

// == ==== ==
// == MAIN ==
// == ==== ==
function start_Main(){
  if(!Dom.get('TextInfo')) return;
  
  // nyari elemen daleman TextInfo
  fill_Info();  
  
  // nyari opsi tersimpan
  getOptions();
  // IFF offsetTop==0 always assume is_ticklerkiller_on
  gvar.is_ticklerkiller_on = (Dom.get('TextInfo').offsetTop == 0 ? true : gvar.mnu_Value[1]==4);
  
  // user login kah ?
  gvar.securitytoken = get_token();
  
  var tdits_par = Dom.get('InfoTablle02');
  if(!tdits_par) {
    show_alert('InfoTablle02 Not Found', 0);
    return;
  };
  var tdits = $D(".//td", tdits_par);
  var got_spot = false;
  for(var i=0; i < tdits.snapshotLength; i++){
    // case user udah login
    if(gvar.securitytoken){
      // nyelip setelah kolom UCP
      if(tdits.snapshotItem(i).width == '90px') got_spot = true;    
    }else{
	// case user belom login
      if(tdits.snapshotItem(i).width == '6px') got_spot = true;	
    }
    
    if(got_spot){
        var elem = tdits.snapshotItem(i);	  
  	    var td_cendstat = create_td_elemen(elem.parentNode, (i+1));
        // tempel elemen td yg mo diselipin
        elem.parentNode.appendChild(td_cendstat[0]);
        //pura2 gak tau ada tdsisa (form search)
        if(td_cendstat[1].length > 0){
            for(var j=0; j < td_cendstat[1].length; j++){            
               elem.parentNode.appendChild( td_cendstat[1][j] );			  
            }
        }
  	    drawLoaderImg(gvar.options_id);
        break;
    }    
  } // end for
  
  if(Dom.get('chk_paused'))
    Event.add(Dom.get('chk_paused'), 'click', function(e){ chk_paused(e); });
  
  // kill kaskusTickler Info ?
  cleanUp_Textatas( gvar.is_ticklerkiller_on ); // this flag already check this gvar.mnu_Value[1]==4
  
  // is fixed menu mode = on ?
  toogleFixedMenu( gvar.mnu_Value[0]==2 );
  
  // user has login || has token
  if( gvar.securitytoken ){
    if(gvar.paused=='0'){
      // build data to send in ajax
      var cdata = get_data();   
      // chk cendol ready
	  chk_cendol(cdata, ajax_callBack);
	}
  }else{
   // not login => do nothin.
   return;
  }
  
  window.setTimeout(function() {
	patchCSS(); // do patch collision css from Kaskus-Wide
  },500);

}
// == END MAIN ==
// ==============


function patchCSS(){
Dom.get('TextInfo').setAttribute('style', 'margin-top:0 !important;');
}

function getText(key) {
  var res=''; var lang = "id";
  var data=LANGUAGE_TEXT[lang];
  if (data) { res=data[key] }
  if (!res) { data=LANGUAGE_TEXT['en']; res=data[key]; }
  return HtmlUnicodeDecode(res);
}
// end getText()

// get options value from GM_value
  function getOptions() {
    gvar.mnu_Value[0] = getValue('KEY_FIXED_MNU');
    gvar.mnu_Value[1] = getValue('KEY_TCKILL_MNU');
    gvar.paused = getValue('KEY_PAUSED');	
  }
// end getOptions()


// fetch info from node id TextInfo
// no retrun, fill gvar.vNfo w/ needed value
function get_TextInfo() {
  var txtInfo = Dom.get('TextInfo');
  if (!txtInfo) return false;
  
  return txtInfo;
}


// fill gvar.info
function fill_Info() {
  var txtInfo = getByTag('div', get_TextInfo());
  if (!txtInfo) {
    show_alert('Text Info container not found!', 0);	  
    return;
  }
  var idx = 0;
  var cari = [];
  var shiftedSearch = ['TOTAL POSTS:','TOTAL MEMBERS:'];
  var matchSearch = ['Welcome, ','Last visited:','?do=logout',];
  cari['private'] = '><a href="private.php">';
  cari['tokill'] = 'to Advertise ?';
  
  var re = /^(\<span\sid\=\"notifications\"\>)(.*)\<\/span/;
  for (i=0; i<txtInfo.length; i++) {
    buftxt = txtInfo[i].innerHTML;
    if ( inArray(shiftedSearch,buftxt) ) {
      gvar.info[idx] = txtInfo[i+1].innerHTML.replace(/\t|\n/g, '');
      idx++;
    } else {
      if (buftxt.indexOf(cari['private']) != -1 || re.test(buftxt)) {
		gvar.info[idx] = buftxt.replace(/\t|\n/g, '');
        idx++;
      } else {
        if (buftxt.indexOf(cari['tokill']) != -1) {
          txtInfo[i].style.top = '-999px';
        } else {
          for (j=0; j<matchSearch.length; j++) {
            if (buftxt.indexOf(matchSearch[j]) != -1) {
              gvar.info[idx] = buftxt.replace(/\t|\n/g, '');
              idx++; break;
            }
          }
        }
      }
    }
  }
}
// end of get_TextInfo()

// nyelipin kolom td utk status cendol|status & options,
// returned value: array 2 dimensi
// td sisa dikanan, juga ikut di return;
//   trparent: Node tr
//   idxsisa: Index UCP
function create_td_elemen(trparent, idxsisa) {
  var ael,dv1, td, td1, tbL, tr1, Attr, add_width;
  //var td = document.createElement("td"); // cendol status kolom
  td = mycreateElement('td', {}); // cendol status kolom

  Attr = {cellpadding:'0',cellspacing:'0',border:'0',height:'100%'};
    tbL = mycreateElement('table', Attr);
    tr1 = mycreateElement('tr', {});
    
  Attr = {style:'border-right:1px solid #B9B9B9;padding:5px;'};
    td1 = mycreateElement('td', Attr);
  
  Attr = {id:gvar.options_id};
    div1 = mycreateElement('div', Attr);
  
  mass_append(tr1, [td1,div1]);

  
  add_width = 40;
  if (gvar.securitytoken) {
    add_width = 90;
    
  // td gambar cendol By: wizdomfellas :: CCPB
    td1 = mycreateElement('td', {id:gvar.cendol_id[0]});  
  
  if(gvar.paused=='0'){
   Attr = {src:load_img('ajax_img'),title:getText('TEXT_1'),style:'margin:0 33px 0 34px;'};
     img1 = mycreateElement('img', Attr);
   mass_append(tr1, [td1,img1]);
  }else{
   var img1=getPaused_tpl();
   td1.setAttribute('style','text-align:center;');
   td1.innerHTML = img1.innerHTML;
   Dom.add(td1, tr1);	   
  }
    	  
  Attr = {id:gvar.cendol_id[1],style:'border-right:1px solid #B9B9B9;'};
    td1 = mycreateElement('td', Attr); // td cendol stat
  Event.add(td1, 'mouseover', function(e){		
	var tgt=Dom.get('pause_cont');
	var neigh = Dom.get('cendol_status');
	if(tgt && neigh) {
	  tgt.style.display='';
	  neigh.style.display='none';
	}
  });
  Event.add(td1, 'mouseout', function(){
    var tgt=Dom.get('pause_cont');
	var neigh = Dom.get('cendol_status');
	if(tgt && neigh && !Dom.get('chk_paused').checked) {
	  tgt.style.display='none';
	  neigh.style.display='';
	}
  });

    tr1.appendChild(td1);

  Attr = {style:'border-right:1px solid #B9B9B9;'};
    td1 = mycreateElement('td', Attr); // td updown

    dv1 = mycreateElement('div', {style:'background:#f80;border-bottom:1px solid #ccc;width:18px;'});
  Attr = {style:'background: url("data:image/gif;base64,R0lGODlhEAAQAIABAP///8zMzCH5BAEAAAEALAAAAAAQABAAAAIejI+pywidgIRGWmgzy1zdP0VV+DQXFZyUuqLuCwcFADs=") repeat scroll 1px 1px transparent;padding: 1px ! important;margin:0 !important;text-decoration:none;',href:'#TextInfo',title:'Top'};
    ael = mycreateElement('a', Attr,false,'&nbsp;&nbsp;&nbsp;');
  mass_append(tr1, [td1,dv1,ael]);
  
  var pagenav = find_pagenav();
  pagenav = (pagenav ? pagenav : 'dfFooter');
  dv1 = mycreateElement('div', {style:'background:#f80;border-top:1px solid #f90;width:18px;'});
  Attr = {style:'background: url("data:image/gif;base64,R0lGODlhEAAQAIABAP///8zMzCH5BAEAAAEALAAAAAAQABAAAAIfjI+pywidgIRHPhosvDorDU6RRV5faS4l1rHYC8dBAQA7") repeat scroll 1px 1px transparent;padding: 1px ! important;margin:0 !important;text-decoration:none;',href:'#'+pagenav,title:'Bottom'};
    ael = mycreateElement('a', Attr,false,'&nbsp;&nbsp;&nbsp;');
  mass_append(tr1, [td1,dv1,ael]);
  
  }
  
  mass_append(td, [tbL,tr1]);
  
  // get td sisa, cut it as nodes
  var ar_tdless = getByTag('td', trparent);
  var tdless = [];
  if (idxsisa < ar_tdless.length) {
    for (var j=0; (idxsisa+j) < ar_tdless.length; j++) {
      tdless[j] = ar_tdless[(idxsisa+j)];
      // ada td sisa ? dibuang dulu
      Dom.remove(ar_tdless[(idxsisa+j)]);
    }
    // ada td sisa ? bengkek table width :hammer
    var tabletxtInfo = getByTag('table', Dom.get('TextInfo'))[0];
    var curwidth = tabletxtInfo.width.replace('px', '');
    tabletxtInfo.width = (parseInt(curwidth) + add_width) + 'px';
  }

  return [td, tdless];
}

// end create_td_elemen()
function find_pagenav(){
   var tds = $D('//td[contains(@id,"pagenav.")]', document); 
   return (tds.snapshotLength > 1 ? tds.snapshotItem(1).id : null);
}


//AJAX cek cendol ready
function chk_cendol(cdata, callBack) {
  var pReq_xhr ={
    method: "POST",
    url: gvar.phprep + gvar.post_id + '#' + Math.random().toString().replace('0.',''),
	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: cdata,
    onload: function(ret) {
      if (ret.responseText) {
        var rTXT = ret.responseText;
        var ftext = []; // [status, msg]; status{ 1:ready, 0:notready, -1:error }
        rTXT = rTXT.replace(/\r|\n/g, '');
        if (rTXT.indexOf("main error message") > -1) {
          // error found
          var match = /main\serror\smessage(?:\s-->)+(?:[^>]+)>(.+)\.<\/div/.exec(rTXT);
          if(match) {
		    ftext[0] = '0'; ftext[1] = match[1];
		} else {
		    ftext[0] = '-1'; ftext[1] = 'Failed cek cendol; Error found.';
		}
        } else if (rTXT.indexOf("Kasih Dah!!!") != -1){
           // wokeh, ready..
           ftext[0] = '1';
        } else {
           ftext[0] = '-1'; ftext[1] = 'Failed cek cendol; Server might be busy.';
	  }		  
        if(ftext[0]=='-1') show_alert('\nreturned=' + ftext[1]+'\n\n');		  
        callBack(ftext);
      }
    }
  };
  
  clog('URL=' + pReq_xhr.url);
  //GM_xmlhttpRequest( );
  // try always use this native-XHR, incase supporting multifox
  NAT_xmlhttpRequest( pReq_xhr );
}
// end chk_cendol()
function ajax_callBack(ret_cendol) {

  var el,par,img1,Attr,text
  var tdcend = Dom.get(gvar.cendol_id[0]);
  var tdstat = Dom.get(gvar.cendol_id[1]);
  if (tdcend && tdstat) {
    tdcend.innerHTML = ''; tdstat.innerHTML = '';
    tdcend.setAttribute("title", (ret_cendol[0]=='1' ? getText('TEXT_2') : ret_cendol[1]));
    tdcend.setAttribute("style", 'cursor:help');
  if(ret_cendol[0]!='-1'){
	Attr = {alt:'img-cendol',
	        title:(ret_cendol[0]=='1' ? getText('TEXT_2') : ret_cendol[1]),
			src:(ret_cendol[0]=='1' ? load_img('cnd_ready') : load_img('cnd_gray'))
		   };
      img1 = mycreateElement('img', Attr);
      tdcend.appendChild(img1);
  }      
  tdstat.setAttribute("title", (ret_cendol[0]=='1' ? '' : ret_cendol[1]));
  //max-width:50px;padding-right:3px; 
    tdstat.setAttribute("style", "cursor:help; max-width:50px; border-right:1px solid #B9B9B9; font-size:11px; text-align:center;" + (ret_cendol[0]=='1' ? 'font-weight:bold;color:#00D500;' : ''));
  
  par = getPaused_tpl( ret_cendol[0]=='1' ); // gimme with margin top  
  tdstat.appendChild(par);
  text = (ret_cendol[0]=='1' ? getText('TEXT_2') : (ret_cendol[0]!='-1' ? getText('TEXT_3') : getText('TEXT_4') ) );
  el = mycreateElement('div', {id:'cendol_status','style':(ret_cendol[0]=='1'? 'margin:0 1px 0 -2px;padding-right:2px;':'padding-right:5px;')},false,text);
  Dom.add(el, tdstat); 
  
  Event.add(Dom.get('chk_paused'), 'click', function(e){ chk_paused(e); });
  
  } else {
    return;
  }
  
}
// end ajax_callBack();

function chk_paused(e){
  e=e.target||e;
  var epar = e.parentNode;
  var dopaused = (e.checked ? '1':'0');
  setValue('KEY_PAUSED', dopaused);
  gvar.paused = dopaused;
  if(epar.id='pause_cont')
     epar.style.display=(dopaused=='1' ? 'inline' : 'none');
  if(dopaused!='1')
    event_cendolmenu(null);
  else
    Dom.get(gvar.cendol_id[0]).style.display='none';
}

function getPaused_tpl(is_cready){
  var Attr, el, par, cont;
  cont = mycreateElement('div', {});
  
  Attr={'id':'pause_cont',
        'style':(gvar.paused=='0'?'display:none;':'')
  	 +'position:relative;float:left;background:#B3FFB3;margin:0;padding:0px 5px;'+'padding:'+(is_cready ? '0px 6px 0 6px':'0px 5px 0 6px')};
  par = mycreateElement('div', Attr);
  Attr={id:'chk_paused',type:'checkbox'};
  if(gvar.paused=='1')
    Attr.checked = 'checked';
  el = mycreateElement('input', Attr);
  Dom.add(el, par);	
  Attr={'for':'chk_paused','style':'margin:0;padding:0;color:#000;font-size:11px;',title:'Pause check-cendol'};
  el = mycreateElement('label', Attr,false,'<br/><b>Pause</b>');	  
  Dom.add(el, par);
  
  Dom.add(par, cont);
  return cont;
}

function toogleFixedMenu(flag) {
  var ta = Dom.get('TextInfo');
  var tbL = getByTag('table', ta)[0];
  var dummy_div = Dom.get('dummy_div');
  var MenuElem = Dom.get('menu_container');
  if (flag) { // fixed mode on
    if (dummy_div) {
      return;
    } else {
      tbL.setAttribute('style', 'position:fixed;width:90%;z-index:'+gvar.zIndex+';padding:0;margin:0;padding-right:20px;'); //margin-top:-3px;
	var Attr = {id:'dummy_div',style:'height:43px;'};
      var div1 = mycreateElement('div', Attr,false,' ');
	
      ta.insertBefore(div1, ta.childNodes[5]);
    }
  } else { // fixed mode off
    tbL.setAttribute('style', '');
    if (dummy_div) Dom.remove(dummy_div);
  }
  if (MenuElem) {
    MenuElem.setAttribute('style', 'display:none;position:'+(flag? 'fixed':'absolute') + ';z-index:'+gvar.zIndex+';');
    positioning_menu(MenuElem);
  }
}
// end toogleFixedMenu()


function cleanUp_Textatas(flag) {
  var divs=null; 
    try{
    divs = $D('//div[contains(@style,"fixed;")]', document); 
  } catch(err) { divs=null; }
  
  if(divs && divs.snapshotLength > 0) {
     divs.snapshotItem(0).style.display = (flag ? 'none' : '');
     
       // hunt previous div before the #TextInfo
     var par=null; 
     try{
        var tiNode = $D('//div[@id="TextInfo"]', document);
  	  par = tiNode.snapshotItem(0).previousElementSibling;
  	 
  	  var ln = par.innerHTML.length;
  	  // find with inner = '&nbsp;' 
  	  // Opera keep tellin me that it has length==1; while FF/Chrome said it has length == 6
  	  if( par.getAttribute('style').indexOf('height')!=-1 && (ln==1||ln==6) )
  	    par.style.display = (flag ? 'none' : '');		  
     } catch(err) { par=null; }
  }

  var MenuElem = Dom.get('menu_container');
  if (MenuElem) positioning_menu(MenuElem);
}
// end cleanUp_Textatas()

// even elemen menu options clicked
function menu_L1_menu(par_menu, select) {
  // Change the position of the ">" in the menu box and close it
  if (!par_menu) return;
  
  var div_Elem = getByTag('div', par_menu);
  switch (select) {
  case 1: case 2:  // fixed menu
    div_Elem[0].style.visibility="hidden";
    if (select==2) { div_Elem[0].style.visibility="visible"; }
    break;
  case 3: case 4: // tckiller_menu
    div_Elem[1].style.visibility="hidden";
    if (select==4) { div_Elem[1].style.visibility="visible"; }
    break;
  }
}
function event_L1_menu(selected_row) {
  var select=selected_row.value;
  var row_index = 1;
  var menu_parent=selected_row.parentNode;
  switch (select) {
  case 1: case 2: // fixed_menu toogle
    select = eval((select+1) % 3);
    if (select==0) select = 1;
    var key = 'KEY_FIXED_MNU';
    row_index = 1;
    break;
  case 3: case 4: // tickler_kill toogle
    select = eval((select+1) % 5);
    if (select<3) select = 3;
    key = 'KEY_TCKILL_MNU';
    row_index = 2;
    break;
  }
  menu_L1_menu(menu_parent, select);
  selected_row.value = select;
  menu_parent.parentNode.style.display="none";
  
  GM_setValue(key, select); getOptions();
  if (row_index==1) {
    toogleFixedMenu(gvar.mnu_Value[0]==2);   //2==is_fixedmenu_on
  } else {
    cleanUp_Textatas(gvar.is_ticklerkiller_on || gvar.mnu_Value[1]==4);   //4==is_ticklerkill_on
  }
}

function menu_cendolmenu(par_menu, select) { }

function event_cendolmenu(selected_row) {
  if(selected_row)
 var menu_parent=selected_row.parentNode;
  
  // recheck token if needed
  if (!gvar.securitytoken) {
    gvar.securitytoken = get_token();
  }
  
  // user has login || has token
  if (gvar.securitytoken) {
  
    // clean up - container
    var td_container = Dom.get(gvar.cendol_id[0]);
    td_container.innerHTML = '';
  //33px
  var Attr = {title:getText('TEXT_1'),style:'margin:0 33px;',src:load_img('ajax_img')};
    var img1 = mycreateElement('img', Attr);
    td_container.appendChild(img1);
  
    var td_container = Dom.get(gvar.cendol_id[1]);
    td_container.innerHTML = '';
    
    // build data to send in ajax
    var cdata = get_data();
    // force paused = 0
  gvar.paused = '0';
  setValue('KEY_PAUSED', gvar.paused);
  Dom.get(gvar.cendol_id[0]).style.display='';
  
  // chk cendol ready
    chk_cendol(cdata, ajax_callBack);
  }
  if(menu_parent) menu_parent.parentNode.style.display="none";
}

function make_options_menu(OpenMenuElem, parentMenu) {
  var Attr;var MenuElem;
  
  Attr = {
     id:'menu_container',
     style:'display:none;position:'+(gvar.mnu_Value[0]==1 ? 'absolute' : 'fixed')+';z-index:'+gvar.zIndex+';margin:0;padding:0;width:140px;font-size:11px;text-align:left;'
  };
  MenuElem = mycreateElement('div', Attr);
  Event.add(MenuElem,'mouseover', function() { option_turn(true); });
  Event.add(MenuElem,'mouseout', function() { option_turn(false); });	
  
  var arrow = function(chr) {
    if (undefined==chr || chr=='') chr = '&#8730;';
  var ar_arrow = mycreateElement('div', {'style':'float:left; width:1em; font-size:12px; font-weight:bold; color:'+color('DL_POPUP_ARROW')+' !important;'});
  var b = mycreateElement('b',{},false,HtmlUnicodeDecode(chr));
    ar_arrow.appendChild(b);
    return ar_arrow;
  }
  
  var ul_style = "float:left; list-style-type:none; cursor:pointer; margin:1px; padding:0; border: 1px solid "+color('DL_POPUP_BORDER')+" !important; width:140px;line-height:13px;";
  
  var u2_Elem = mycreateElement('ul', {style:ul_style+"background-color:"+color('DL_POPUP_BG_ALT2_OUT')+"; border:1px solid "+color("MNU_BORDER")+";"});
  
  var li_Elem2=new Array();
  for (var h=0; h<=1; h++) {
    //var h=1; {
    Attr = {value:gvar.mnu_Value[h],style:"margin:0;padding:3px;color:"+color('DL_POPUP_TEXT')+" !important;"};
    li_Elem2[h] = mycreateElement('li', Attr);
    li_Elem2[h].appendChild(arrow('&#8730;').cloneNode(true));
    li_Elem2[h].appendChild( document.createTextNode(getText('MENU_' + (h+1))) );
  
  Event.add(li_Elem2[h],'click', function() { event_L1_menu(this); });
  Event.add(li_Elem2[h],'mouseover', function() { this.style.backgroundColor=color('DL_POPUP_BG_ALT2_IN'); });
  Event.add(li_Elem2[h],'mouseout', function() { this.style.backgroundColor=""; });
  
    u2_Elem.appendChild(li_Elem2[h]);
  }
  MenuElem.appendChild(u2_Elem);
  
  // ===============
  // user gak login gak usah ada menu cendol cek
  if (gvar.securitytoken) {
  
    //== menu for cek cendol
  u1_Elem = mycreateElement('ul', {style:ul_style+" background-color: "+color('DL_POPUP_BG_GREEN_OUT')+";border:1px solid "+color("MNU_BORDER")+";"});
  
    var li_Elem1=new Array();
    //for(var h=0;h<=1;h++) {
    var h=0, idx=2; {
	Attr = {value:gvar.mnu_Value[idx],style:"margin:0;padding:3px;color:"+color('DL_POPUP_TEXT')+" !important;"};
    li_Elem1[h] = mycreateElement('li', Attr);		
      li_Elem1[h].appendChild(arrow('&#187;'));
      li_Elem1[h].appendChild(document.createTextNode(getText("MENU_" + (idx+1))));
	
	Event.add(li_Elem1[h],'click', function() { event_cendolmenu(this); });
	Event.add(li_Elem1[h],'mouseover', function() { this.style.backgroundColor=color('DL_POPUP_BG_GREEN_IN'); });
	Event.add(li_Elem1[h],'mouseout', function() { this.style.backgroundColor=""; });
	
      u1_Elem.appendChild(li_Elem1[h]);
    }
    MenuElem.appendChild(u1_Elem);
  }
  
  // Select position of the menubox on top of the button
  user_select(MenuElem,'none');
  parentMenu.appendChild(MenuElem);
  
  // (time consuming function... so do it later)
  positioning_menu(MenuElem);
  
  //== Make the openbutton to link to the menubox (with display update of the autoplay setting)
  var ar_Elems = (gvar.securitytoken ? [u2_Elem, u1_Elem] : [u2_Elem]);
  Event.add(OpenMenuElem,'click', function() { 
    updOptions(ar_Elems);
    swap_display(MenuElem);
  });
  
  // Update the menubox from the setting
  updOptions(ar_Elems);
}
// end make_options_menu()

function updOptions(ul) {
  menu_L1_menu(ul[0], getValue('KEY_FIXED_MNU'));
  menu_L1_menu(ul[0], getValue('KEY_TCKILL_MNU'));
}
// end updOptions();

function positioning_menu(MenuElem) {
  var meTopDivider = (getDisplayHeight(MenuElem)/2) + (gvar.is_ticklerkiller_on ? 10 : 40); // is_ticklerkiller_on
  window.setTimeout(function() {
    MenuElem.style.top = meTopDivider+"px";
    MenuElem.style.marginLeft = (-(getWidth(MenuElem.firstChild).replace('px','')) + 30) + 'px';
  }, 200);
}
// end positioning_menu()


  /* draw option button */
function drawLoaderImg(nodeparent) {
  var parentdl = Dom.get(nodeparent);

  Attr = {style:'margin:5px 2px 2px 2px;padding:2px;border:1px solid '+color('DL_BORDER')+' !important;background-color:'+color('DL_BACKGROUND')+';z-index:'+gvar.zIndex+';position:relative !important;'};
  var elContOpt = mycreateElement('div', Attr);
  
  Attr = {title:'Options',style:'height:19px;text-align:right;cursor:pointer !important;margin:-2px;'};
  var newElement2td1Div = mycreateElement('div', Attr);
  Event.add(newElement2td1Div,'mouseover', function() { option_turn(true);  });
  Event.add(newElement2td1Div,'mouseout', function() { option_turn(false);  });

  var buttonCtx=addTransparentCanvas(newElement2td1Div,19,19).getContext('2d');
  draw_Button(0,buttonCtx);
  elContOpt.appendChild(newElement2td1Div);
  
  make_options_menu(elContOpt, parentdl);
  parentdl.appendChild(elContOpt);
}

// [animate button set functions]
function option_turn(state) {
  if (isDefined(state)) {
    arguments.callee.laststate=state;
    if (isUndefined(arguments.callee.idInterval)) { arguments.callee.idInterval=0; }
    if (state && (arguments.callee.idInterval<=0)) { arguments.callee.idInterval=window.setInterval(function() { option_turn(); }, 100); }
  }
  else {
    var angle=draw_Button();
    if ((angle%90==0) && !arguments.callee.laststate) { arguments.callee.idInterval=clearInterval(arguments.callee.idInterval); }
  }
}
function addTransparentCanvas(ParentEl,widthEl,heightEl) {
  var Attr = {height:heightEl+'px',width:widthEl +'px'};
  var canvasEl = mycreateElement('canvas', Attr);
  ParentEl.appendChild(canvasEl);
  return(canvasEl);
}
function draw_Button(angle,buttonCtx) {
  if (isDefined(buttonCtx)) { arguments.callee.mCtx=buttonCtx; }
  if (isDefined(angle)) { arguments.callee.mAngle=angle; } else { arguments.callee.mAngle=(arguments.callee.mAngle+10) % 360; }
  buttonCtx=arguments.callee.mCtx; angle=arguments.callee.mAngle;
  buttonCtx.fillStyle=color('DL_OPTIONS_TEXT');
  buttonCtx.clearRect(0,0,19,19);
  buttonCtx.save(); buttonCtx.translate(9.5,9.5); buttonCtx.rotate(Math.PI*angle/180); buttonCtx.translate(-9.5,-9.5);
  buttonCtx.beginPath(); buttonCtx.arc(9.5, 5,2.8,0,Math.PI*2,true); buttonCtx.fill();
  buttonCtx.beginPath(); buttonCtx.arc(9.5,14,2.8,0,Math.PI*2,true); buttonCtx.fill();
  buttonCtx.save(); buttonCtx.translate(5,9.5); buttonCtx.rotate(Math.PI*45/180); buttonCtx.fillRect(-2.4,-2.4,4.8,4.8); buttonCtx.restore();
  buttonCtx.save(); buttonCtx.translate(14,9.5); buttonCtx.rotate(Math.PI*45/180); buttonCtx.fillRect(-2.4,-2.4,4.8,4.8); buttonCtx.restore();
  buttonCtx.restore();
  return(angle);
}
// end - [animate button property]


function get_data() {
  return "securitytoken=" + gvar.securitytoken + "&amp;p=" + gvar.post_id + "&amp;ajax=1";
}
// end get_data()

// fetch securitytoken
function get_token() {
  var cucok,el = $D('//input[@type="hidden" and contains(@name,"securitytoken")]', null, true);
  if(!el) {
    cucok = /logouthash\=(.+)\"(?:\s|o)/im.exec(document.body.innerHTML);
	el = (cucok ? cucok[1] : false);
  }else{
    el=el.value;
  }
  return (el ? el : false);
}

// domain guest
function domainParse(){
	var r, l = location.hostname
	return {"prot": location.protocol, "host": l, "statics" : l.replace(/^\w{3}\./i, 'static.')};
}

//=== needed functions ===
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null;    }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }

function color(name,dark) {
  if (isDefined(dark)) { arguments.callee.dk=dark; return; }
  return color_change(arguments.callee.dk,name);
}
function color_change(dark,name) {
  return '#' + (!dark ? getValue('LIGHT_COLOR_'+name) : getValue('DARK_COLOR_'+name));
}
function getValue(key) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_getValue(key,data[0]));
}
function setValue(key, value) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_setValue(key,value));
}
function page_is_notloaded(t){
 var tg = getByTag('title', document);
 return (tg && isDefined(tg[0]) && tg[0].innerHTML==(typeof(t)=='string' ? t : 'Page is temporary not available'));
}
function getByTag(tag, parent) {    
  if (!parent) parent = document;
  return parent.getElementsByTagName(tag);    
}
function mycreateElement(type, attrArray, evtListener, html){
var node = document.createElement(type);
for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
	node.setAttribute(attr, attrArray[attr]);
}
if(evtListener){
	var a = evtListener.split(' ');
	node.addEventListener(a[0], eval(a[1]), eval(a[2]));
}  
if(html) node.innerHTML = html;

return node;
}
function eval_XPath (xp, par) {
  if(isUndefined(par)) par = document;
  return document.evaluate(xp, par, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function mass_append(parent, chnodes, serial){
  serial = (isUndefined(serial) ? true : false);
  var n=chnodes.length;
  if(typeof(parent)=='object' && typeof(chnodes)=='object' && n>0){
      if(serial){
          for(i=n-1;i>0;i--) chnodes[i-1].appendChild(chnodes[i]);
	      parent.appendChild(chnodes[0]);
	    }else{
	      for(i=0;i<n;i++) parent.appendChild(chnodes[i]);
	    }
  }
}
// end mass_append
function load_img(ky) {
  var img = [];
  img['cnd_ready'] =
    'data:image/png;base64,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';
  img['cnd_gray'] =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAADAFBMVEUAAAABAQECAgIDAwMEBAQFBQUGBgYHBwcICAgJCQkKCgoLCwsMDA' +
    'wNDQ0ODg4PDw8QEBARERESEhITExMUFBQVFRUWFhYXFxcYGBgZGRkaGhobGxscHBwdHR0eHh4fHx8gICAhISEiIiIjIyMkJCQlJSUmJiYnJycoKCgpKSkqKiorKyssLC' +
    'wtLS0uLi4vLy8wMDAxMTEyMjIzMzM0NDQ1NTU2NjY3Nzc4ODg5OTk6Ojo7Ozs8PDw9PT0+Pj4/Pz9AQEBBQUFCQkJDQ0NERERFRUVGRkZHR0dISEhJSUlKSkpLS0tMTE' +
    'xNTU1OTk5PT09QUFBRUVFSUlJTU1NUVFRVVVVWVlZXV1dYWFhZWVlaWlpbW1tcXFxdXV1eXl5fX19gYGBhYWFiYmJjY2NkZGRlZWVmZmZnZ2doaGhpaWlqampra2tsbG' +
    'xtbW1ubm5vb29wcHBxcXFycnJzc3N0dHR1dXV2dnZ3d3d4eHh5eXl6enp7e3t8fHx9fX1+fn5/f3+AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjI' +
    'yNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrK' +
    'ytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzM' +
    'zNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7O' +
    'zt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7////isF19AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACE0lEQVR42mP4Tw' +
    'AwUEfB9+NHTwDB8eNgAkyeOHD7D0LBm7rNe3ejgoNTF35HKHiWeu/Tu7dvP7x/++7Du7dA1vsPP1a1fkEoeJL1+M+3b58uvf397uG37z9+fP/05s/6HiQFDzOf3D3z8f' +
    'f+459/7br79c7zLye2vtmCoiDj7sl1l97v33T07r7tx3bu2Lfj1OOVyAoepR8+tW/H9l3bN+/Yumn37u0rtpw5NrsLScGDlG07tm9atnnnxnWb123afGjvhoNHJ7T+RC' +
    'i4FxrWvn3jhl37tq3eemD7+nVbls0sCKtH8ua94KzZU5qXdzfMWD1j4pJ182Yuas2IQFZwN2hGt4l+mLrN4kXOelHJ5QkT5q+prEZScD8s0VBZXUXRdGqLiqqKsqGmsb' +
    'lHYt0PJEeGeSnr6+vpa9s66wGBto6mmlZgPZKC+0EBWoYGQKCrawAGhvrGwcgm3AwI1DVGAYamIcgKbgcG65uZIgNji5BapHB4HBJqZIECTK1CapAUPA0OM7ZEAea2oc' +
    'gKHgWGm9mgACv7kOpfCAU3fMLNbVEUWNsHVyEpuOAaY4qiwNbKIbL8E0LBc89cO3MUA4zCwyYimfBvq1eRh70DAtiHF/o8Q84Xf2f4pyfGx8fHRYcGg0B4iMd51Izz5+' +
    'z6TZs2rV+5eNW6tWvXrVuz5t4/tJz15ycIfP/6/ecPEOPXXyrnTXwAAKjW6NS40pcyAAAAAElFTkSuQmCC';
  img['ajax_img'] =
    'data:image/gif;base64,R0lGODlhEAAQAPMAAP///zpE9zpE956j+pGX+ru/+8vN/Nja/OXm/ayw++3t/YqQ+QAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBham' +
    'F4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAEKxDISau9OE/Bu//cQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIf' +
    'kEAAoAAQAsAAAAABAAEAAABCsQyEmrvThPwbv/XJEMxIFg4VieV0qaqCC+rOWu8Yy3sgrzoCBHQywaj5QIACH5BAAKAAIALAAAAAAQABAAAAQrEMhJq704T8G7/9xhFM' +
    'lAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo+UCAAh+QQACgADACwAAAAAEAAQAAAEMRDISau9OE/Bu/+cghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myW' +
    'w6KREAIfkEAAoABAAsAAAAABAAEAAABDYQyEmrvThPwbv/nKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkEAAoABQAsAAAAABAAEA' +
    'AABDYQyEmrvThPwbv/HKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkEAAoABgAsAAAAABAAEAAABDEQyEmrvThPwbv/nKUgh1EkAx' +
    'FWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAAKAAcALAAAAAAQABAAAAQrEMhJq704T8G7/xymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICA' +
    'Ah+QQACgAIACwAAAAAEAAQAAAEJhDISau9OE/Bu/+cthBDEmZjeWKpKYikC6svGq9XC+6e5v/AICUCACH5BAAKAAkALAAAAAAQABAAAAQrEMhJq704T8G7/xy2EENSGO' +
    'E1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQACgAKACwAAAAAEAAQAAAEMRDISau9OE/Bu/+ctRBDUhgHElZjeaYr1ZqoKogkDd9s/to4Vy02mf1ASI9myWw6KR' +
    'EAIfkEAAoACwAsAAAAABAAEAAABDYQyEmrvThPwbv/HLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkEAAoADAAsAAAAABAAEAAABD' +
    'YQyEmrvThPwbv/nLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkEAAoADQAsAAAAABAAEAAABDEQyEmrvThPwbv/3EIMSWEciBWO5Z' +
    'lWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA%3D';
  //------------
  if (undefined == ky || undefined == img[ky]) return false;

  return img[ky];
}
function swap_display(element) {
  var els = element.style;
  if (els.display=="none") { els.display="block"; } else { els.display="none"; }
}
function user_select(element,value) {
  var els = element.style;
  if (isDefined(els.userSelect)) {els.userSelect=value;} // CSS3
  else if (isDefined(els.MozUserSelect)) {els.MozUserSelect=value;} // Mozilla
  else if (isDefined(els.webkitUserSelect)) {els.webkitUserSelect=value;} // WebKit
}
function getDisplayHeight(element) {
  var els = element.style;
  var oVisibility = els.visibility;
  var oPosition = els.position;
  var oDisplay = els.display;
  els.visibility = 'hidden';
  els.position = 'absolute';
  els.display = 'block';
  var Result = element.clientHeight;
  els.display = oDisplay;
  els.position = oPosition;
  els.visibility = oVisibility;
  return Result;
}
function getWidth(element) {
  var Result = window.getComputedStyle(element,null).width.replace('px','');
  if (Result=='auto') { Result = element.clientWidth; }
  return Result;
}
function HtmlUnicodeDecode(a) {
  var b="";if (a==null) {return(b)}
  var l=a.length;for (var i=0;i<l;i++) {var c=a.charAt(i);if (c=='&') {var d=a.indexOf(';',i+1);if (d>0) {var e=a.substring(i+1,d);if (e.length>1&&e.charAt(0)=='#') {e=e.substring(1);if (e.charAt(0).toLowerCase()=='x') {c=String.fromCharCode(parseInt('0'+e))}else {c=String.fromCharCode(parseInt(e))}}else {switch (e) {case"nbsp":c=String.fromCharCode(160)}}i=d}}b+=c}
  return b
}
var inArray = Array.prototype.indexOf ?
  function(A,f){var p=A.indexOf(f);return(p!==-1?p:false)} :
  function(A,f){for(var i=-1,j=A.length;++i<j;)if(A[i] === f) return i;return false};

//=== BROWSER DETECTION / ADVANCED SETTING
//=============snipet-authored-by:GI-Joe==//
function ApiBrowserCheck() {
  //delete GM_log; delete GM_getValue; delete GM_setValue; delete GM_deleteValue; delete GM_xmlhttpRequest; delete GM_openInTab; delete GM_registerMenuCommand;
  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
  
  var needApiUpgrade=false;
  if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
    needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; show_alert('Opera detected...',0);
  }
  if(typeof(GM_setValue)!='undefined') {
    var gsv; try { gsv=GM_setValue.toString(); } catch(e) { gsv='.staticArgs.FF4.0'; }
    if(gsv.indexOf('staticArgs')>0) {
 	 gvar.isGreaseMonkey=true; gvar.isFF4=false;
	 show_alert('GreaseMonkey Api detected'+( (gvar.isFF4=gsv.indexOf('FF4.0')>0) ?' on FF4':'' )+'...',0); 
	} // test GM_hitch
    else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; show_alert('Bugged Chrome GM Api detected...',0); }
  } else { needApiUpgrade=true; show_alert('No GM Api detected...',0); }

  gvar.noCrossDomain = (gvar.isOpera || gvar.isBuggedChrome);
  if(needApiUpgrade) {
    GM_isAddon=true; show_alert('Try to recreate needed GM Api...',0);
    //OPTIONS_BOX['FLASH_PLAYER_WMODE'][3]=2; OPTIONS_BOX['FLASH_PLAYER_WMODE_BCHAN'][3]=2; // Change Default wmode if there no greasemonkey installed
    var ws=null; try { ws=typeof(unsafeWindow.localStorage) } catch(e) { ws=null; } // Catch Security error
    if(ws=='object') {
      show_alert('Using localStorage for GM Api.',0);
      GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; };
      GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } };
      GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); };
    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
      show_alert('Using temporarilyStorage for GM Api.',0); gvar.temporarilyStorage=new Array();
      GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } };
      GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } };
      GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
    }
    if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); }; }
    if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); }; } // Dummy
    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      show_alert('Using XMLHttpRequest for GM Api.',0);
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
  }; } } // end needApiUpgrade
  GM_getIntValue=function(name,defValue) { return parseInt(GM_getValue(name,defValue),10); };
}

// ----my ge-debug--------
function show_alert(msg, force) {
  if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
  GM_log('('+arguments.callee.counter+') '+msg);
  if(force==0) { return; }
}
function clog(msg) {
  if(!gvar.__DEBUG__) return;
  show_alert(msg);
}
// -end static
// -----------

//********** GLOBAL VAR ************//
// utk add - remove element
// Get Elements
var $D=function (q, root, single) {
  if (root && typeof root == 'string') {
      root = $D(root, null, true);
      if (!root) { return null; }
  }
  if( !q ) return false;
  if ( typeof q == 'object') return q;
  root = root || document;
  if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
      if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
      return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  }
  else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
  else { return root.getElementById( (q[0]=='#' ? q.substr(1):q.substr(0)) ); }
  return root.getElementsByTagName(q);
};
var Dom = {
  get: function(el) {
    if(!el) return false;
    return (typeof el === 'string' ? document.getElementById(el) : el);      
  },
  add: function(el, dest) {    
    var el = this.get(el);
    var dest = this.get(dest);
    dest.appendChild(el);
  },
  remove: function(el) {
    var el = this.get(el);
    el.parentNode.removeChild(el);
  }
};
var Event = {
  add: function() {
    if (window.addEventListener) {
      return function(el, type, fn) {
        Dom.get(el).addEventListener(type, fn, false);
      };
	  
    } else 
	if (window.attachEvent) {  	
      return function(el, type, fn) {
        var f = function() {
          fn.call(Dom.get(el), window.event);
        };
        Dom.get(el).attachEvent('on' + type, f);
      };
    }
  }()
};
// native/generic XHR needed for Multifox, failed using GM_xmlhttpRequest.
var NAT_xmlhttpRequest=function(obj) {
  var request=new XMLHttpRequest();
  request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
  request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
  try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
  if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
  request.send(obj.data); return request;
};
//=========END GLOBAL VAR=============
  
//----
init();
//----
})();
/* Mod By Idx. */