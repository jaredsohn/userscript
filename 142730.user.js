// ==UserScript==
// @name           asanusta translate.google tooltip
// @namespace      asanusta
// @description    asanusta Translates selected text into a `tooltip' via Google translate 
// @include        http://*
// @include        https://*
// @include        file://*
// @exclude        http://translate.google.com/*
// @exclude        https://translate.google.com/*
//  about:config -> greasemonkey.fileIsGreaseable <- true
// @homepageURL https://userscripts.org/scripts/show/130613
// @updateURL https://userscripts.org/scripts/source/130613.meta.js
// @version 4.0.16
/* This is a descendant of lazyttrick's  http://userscripts.org/scripts/show/36898.
// 4.0.16 -translate.google tooltip ile çeviriye başlamak için bir metni seçmeniz yeterli.
// 3.0.6 - fixed translation in pop-ups
// 3.0.5z - autoupdate?!
// 3.0.5 - flags are saved in local storage - senojflags.com is a good site but it inhibits
// 3.0.4 - show/hide GT translation dictionary right column
// 3.0.3 - updated according to latest changes in GT
//       A few hours of work - and all is as it was before!
// 3.0.1 - options dialogue on the first run 
// 3.0.0 
//  - national flags icons -- from www.senojflags.com
//  - a bunch of small fixes
// 2.3.4 - 'history' now works faster (the event listener has been moved to a parent node)
// 2.3.3 - autoupdate?
// 2.3.2 - added icon for backward translation 
// 2.3.1
//   - translated text is being added to the original in the source box
// 2.3
//  - new editable 'source text' field
//  - always visible `swap' langages icon 
// 2.2.2 
//  - backward translation - select text inside tooltip and click the icon under your selection.
// 2.2.1
//  - Ctrl-Alt-click removes item from the history of translations
//  - Ability to change translation in the history -
//    select desired translation in the tooltip window using ctrl or alt -
//    which one is checked in your settings - then click on the icon below the selection.
// 2.2 
//  - history of translations 
// 2.1.4
//  - enabled selection inside tooltip - by using ctrl/alt/shift 
// 2.1.3
//  - Now works in textarea!
// 2.1.2
//  - Selected text is fetched in the moment when you hover over the icon.
//    So, you can select a few letters, then adjust your selection using shift + arrows. 
// 2.1.1
//  lang tag in result <div>
//  detecting target language on the first run
// 2.1
// - fixed problem with right-to-left languages
// - 'swap languages' icon stolen from GT
// 2.0.0d
// - native GT languages list
// 2.0.0c 
// Alt key option added
// If something goes wrong:
// about:config -> greasemonkey.scriptvals.trespassersW/translate.google tooltip.alt/ctrl <- false
// 2.0.0b 
// - exit by ESC
// - 1k letters limit -- don't strain your Google
//
*/
// @icon  data:image/jpg;base64, R0lGODlhIAARALP/AAAAAP///xMYfAqf////Zv/qDuCeH8VmB8DAwAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAgABEAQASdEMlJgb00awkMKQZYjB8RBsE4AtLQvtt0sXHcEcT1pbxK0hsXRmYIGUUgA3DiQjQtssInRAjglMsa4ibtlqSGgECQymmaAwDYUhSFfKoQDQ3LdA6Hoh6qbW4sJHpFWTUAOEA3Vj1WZjF+HQU9X18oPxl0Wx4kXoFiZF1zMEJgbW8qJnAHoU4takocpW5IIISYGh1HRlh9hRZ4eIRaEQA7
//
// ==/UserScript==
var body;

const dbg = 0;
const senojflags = [ 
"http://www.senojflags.com/?gootttp#"
//,'file:///D:/Documents%20and%20Settings/kbc/Application%20Data/Mozilla/Firefox/Profiles/2nzxultn.default/ScrapBook/data/20120521102241/index.html'
];
//
function _log(t){
 if(dbg) GM_log(t);
}

const version = 3060;
const HREF_NO = 'javascript:void(0)';
const GTurl="http://translate.google.com/?text="; 
const res_dict='gt-res-dict' //'gt_res_dict';
var  languagesGoogle, isInited=false;
var GT_tl='auto';
var rtl_langs="ar fa iw ur";
var inTextArea= null;
var maxHT=20, maxWC=3;
var sourceBH = 2, sourceDP =10;
var ht=null;  // history table, 

var imgForw,imgBack,imgSwap,imgUse,imgSave,imgFlags,imgForwSrc,imgBackSrc;
var txtSel; // text selected
var currentURL;
var gt_sl_gms, gt_tl_gms, gt_sl, gt_tl;

var sT;

function mousedownCleaning(evt){
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
  var dU = getId('divUse');
	if(divDic)	{
		if(!clickedInsideID(evt.target,'divDic')){
      if(dU && clickedInsideID(evt.target,'divUse')){
        if(clickedInsideID(evt.target,'imgUse')) useClick(evt);
      }  
      else 
       cleanUp('MC');
	  }	else killId(dU);
  }
	killId(divLookup);
		
}
function cleanUp(s){
 _log(s);
 var d=getId('divSourcetext');
 if(d) sT= d.value;
 killId('divDic');
 killId('divExtract'); 
 killId('divLookup'); 
 killId('divUse'); 
 killId('divBack'); 
 killId('divSelflag'); 
}

function useClick(e){
  e.preventDefault();
  killId('divUse');
  if(e.shiftKey)  ht[0][1] += ' '+txtSel;
  else  ht[0][1] = txtSel;
  GM_setValue('hist',JSON.stringify(ht));
  if(getId('divHist')){
   killId('divHist');
   history();
  }
}

function backLookup(){
    killId('divUse');
    var t=gt_tl; gt_tl=gt_sl; gt_sl=t;
   	currentURL = GTurl + txtSel + "&langpair=" + gt_sl + "|" + gt_tl;
    Request(currentURL);
}
//http://translate.google.com/translate_a/t?client=t&text=Whiskey%20In%20The%20Jar&hl=en&sl=en&tl=ru&multires=1&ssel=0&tsel=0&sc=1
function forwLookup(){
    killId('divUse');
   	currentURL = GTurl + txtSel + "&langpair=" + gt_sl + "|" + gt_tl;
    Request(currentURL);
}

function showLookupIcon(evt){
  var Gctrl=GM_getValue('ctrl'), Galt=GM_getValue('alt');
	if((!evt.ctrlKey && Gctrl)
	 ||(!evt.altKey && Galt)
//  to avoid collision
	 ||(evt.ctrlKey && !Gctrl)
	 ||(evt.altKey && !Galt)
   ) return;
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	txtSel = getSelection(evt.target)+'';
  if(txtSel.length>1024){  
   return;  
  }
	//exit if no text is selected
	if(!txtSel || txtSel==""){
    _log('S:notext ')
		if(divDic)		{
			if(!clickedInsideID(evt.target,'divDic'))
				cleanUp('no sel');
		}
		if(divLookup){
			killId(divLookup);
    }
    return;
	}
	//possible cleanup
	if(divDic){
		if(!clickedInsideID(evt.target,'divDic'))
			{cleanUp('!divdic');		return; }
  // inside divDic:
    var dU=getId('divUse')
    if(dU){
      if(!clickedInsideId('divUse')){
        killId(dU);
      } return;        
	  }
    try{
    var p= belowCursor(evt,10,10,'r')
    var divUse= buildEl('div', {id:'divUse',
    style:'z-index:11000; border: none'+
    ';top:'  + p.t  +';left:' + p.l  +';right:' + p.r +';bottom: auto;'
    },  null, null );

    var iTo = getFlagSrc(gt_tl,'to');
    var divForw=buildEl('a', {id:'divGetforw', 'class': 'gootranslink', href: HREF_NO,
    title: gt_sl_gms + '\u2192 '+gt_tl_gms},
   	['click', forwLookup], imgH+iTo+imgT); 
    divUse.appendChild(divForw);
    
    var iFrom = getFlagSrc(gt_sl,'from');
    var divBack=buildEl('a', {id:'divGetback', 'class': 'gootranslink', href: HREF_NO,
    title: gt_tl_gms + '\u2192 '+gt_sl_gms},
   	['click', backLookup], imgH+iFrom+imgT);
    divUse.appendChild(divBack); 

    addEl(divUse,'img',{id: 'imgUse', border: 0, 
    title: 'use in history/[shift]add to history', src: imgUse}, 
    null,null);

//    tp=(evt.clientY+window.pageYOffset+30)+'px';
//    lf=(evt.clientX+window.pageXOffset+30)+'px';
    body.appendChild(divUse);
    }catch(e){GM_log('use hist\n'+e)}
    return;
  }
  // inside page
  if(!isInited) {css(); isInited=true; }
	//remove div if exists
	if(divLookup)
		killId(divLookup);
	//div container
  var p = belowCursor(evt,10,10);
	divLookup = buildEl('div', {id:'divLookup', style: 'z-index:10000'+
   ';border: none;' +
   ';top:'  + p.t  +';left:' + p.l  +';right:' + p.r  +';bottom: auto'
  }, null, null);

  var iTo = getFlagSrc(GM_getValue('to'),'to');
  var iForw=buildEl('img', {'border':0, id:"imgLookForw", style: 'padding-left: 5px',
  src: iTo},  ['mouseover', lookup],null);

  var iFrom = getFlagSrc(GM_getValue('from'),'from');
  var iBack=buildEl('img', {'border':0, id:"imgLookBack",  style: 'padding-left: 5px',
  src: iFrom},
  ['mouseover', lookup], null); 
   
  if(p.r == 'auto' ){ // left half
	 divLookup.appendChild(iForw);
	 divLookup.appendChild(iBack);
  }else{ // right half
	 divLookup.appendChild(iBack);
	 divLookup.appendChild(iForw);
  }
	body.appendChild(divLookup);
}
function escCleanup(e){
	if(!e.shiftKey && !e.ctrlKey && !e.altKey && e.keyCode==27 )
   cleanUp('esc')
}

function lookup(evt){
	var divResult = null;
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	var top = divLookup.style.top;
	var left = divLookup.style.left;
	var rite = divLookup.style.right;
  var txtS = txtSel; // 2012-08-20
	txtSel = getSelection(inTextArea? inTextArea: evt.target)+'';
  if(!txtSel) txtSel = txtS;
  if(txtSel.length>1024){  
   return;  
  }
	//exit if no text is selected
	if(!txtSel || txtSel==""){
    _log('L:notext')
		if(divDic)		{
			if(!clickedInsideID(evt.target,'divDic'))
				killId(divDic);
		}
		killId('divLookup');
		killId('divDic');
	
		return;
	}	
	//cleanup divs
	killId('divDic');
	killId('divLookup');
	//div container document.body.clientHeight/Width 
	divDic = buildEl('div', 
  {id:'divDic', style: 'top:'+top+';left:'+left+';right:'+rite
  });
	divDic.addEventListener('mousedown', dragHandler, false);
  document.addEventListener('keydown', escCleanup, false); 
	body.appendChild(divDic);

	//div result
	divResult = buildEl('div', 
  {id:'divResult'}, null, 'Loading...');
	divDic.appendChild(divResult);		
/**/ 
  // history
  divBottom = buildEl('div',{id:'divBottom', align: 'bottom'},null,null);
	addEl(divBottom,'a', 
  {'class':"gootransbutt gootranslink gtlPassive", id:'historyLink', title: 'Translation history',  
   align: 'left', href:HREF_NO}, 
  ['click', history], 'History');
  
	addEl(divBottom,'a', 
  {'class':"gootransbutt gootranslink gtlPassive", id:'sourceLink', title: 'Source', href:HREF_NO}, 
  ['click', source],'Source');
  
	//options link
	addEl(divBottom,'a', 
  {'class':"gootransbutt gootranslink gtlPassive", id:'optionsLink', title: 'Settings', href:HREF_NO},
  ['click', options], 'Options');
  divDic.appendChild(divBottom);
/**/
	//lookup
	if( (txtSel+" ").search(/^\s*https?:\/\//) > -1 ){
		divResult.innerHTML = '<a class="gootranslink" href="'+txtSel+'" target="_blank" >'+txtSel+'</a>';
	}
	else if( (txtSel+" ").search(/^\s*\S+(\.\S+)+/) > -1 ){ // site.dom
		divResult.innerHTML = '<a class="gootranslink" href="http://'+txtSel+'" target="_blank" >'+txtSel+'</a>';
	}
	else{
		gt_sl = GM_getValue('from') ? GM_getValue('from') : "auto";
		GT_tl = (gt_tl = GM_getValue('to') ? GM_getValue('to') : "auto");
    if( evt.target.id== 'imgLookBack' ){
    var t=gt_tl; gt_tl=gt_sl; gt_sl=t;
   	currentURL = GTurl + txtSel + "&langpair=" + gt_sl + "|" + gt_tl;
    }
		var lang; 
		lang = gt_sl + "|" + gt_tl;
	}
//"http://www.google.com/translate_t?text=" + txtSel + "&langpair=" + lang;
		currentURL = GTurl + txtSel + "&langpair="	+ lang;
    Request(currentURL);
}

function Request(url,cb){
  GM_xmlhttpRequest({
			method: 'GET',
			url: url,
      headers: {	    
        "User-Agent": "Mozilla/5.0"
       ,"Accept":  "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
       ,"Accept-Encoding":  "gzip, deflate"
      },
			onload: function(resp) {
				try{
          if(cb)
           cb(resp.responseText)
          else
					 extractResult(resp.responseText);
				}catch(e){GM_log('Rqst\n'+e);}
			}
		});	
}

function quickLookup(){
  gt_sl=getId('optSelLangFrom').value;
  gt_tl=getId('optSelLangTo').value;
	currentURL = GTurl + txtSel + "&langpair=" + gt_sl + "|" + gt_tl;
  GT_tl=gt_tl;
  saveIt();
  Request(currentURL);
}
function histLookup(e){
  try{
  var txt=e.target.textContent, ix=-1;
                //.innerHTML?? 
  e.preventDefault();
  var ha = getTag('a',getId('divHist'));
//  ix=ha.indexOf(e.target);
/**/
  for(var i=0,l=ha.length; i<l; i++)
   if(e.target == ha[i]){ ix=i; break; }
/**/
  if(ix<0) return;
  if(e.ctrlKey && e.altKey){ //remove itemm
    if(ix==0) return;
    killId('divHist');
    ht.splice(ix,1);
    GM_setValue('hist',JSON.stringify(ht));
    history();
    return;
  }
  var lang = ht[ix][2].match(/(.*)\|(.*)/);
  gt_sl=lang[1]; gt_tl=lang[2];
  txtSel = txt; 
	currentURL = GTurl + txtSel + "&langpair=" + gt_sl+'|'+gt_tl;
	getId('divResult').innerHTML = 'Loading...'
  Request(currentURL);
  } catch(e){GM_log('broken history\n'+e)}
}

function fastSwap(){
    var t= gt_sl; gt_sl=gt_tl; gt_tl=t;
   	currentURL = GTurl + txtSel + "&langpair=" + gt_sl + "|" + gt_tl;
    Request(currentURL);
}

function extractResult(html){
	var html2 = html.match(/\<body[^\>]*\>([\s\S]+)\<\/body\>/)[1];//select body content
	html2 = html2.replace(/\<script[^\<]+?\<\/script\>/ig, '');//remove script tags...
	//cleanup
	killId('divExtract');
	killId(res_dict);
	//append translated page as hidden div
	var divExtract = document.body.appendChild(buildEl('div', 
  {id:'divExtract', style:'display:none; visibility:hidden;'
   //style:'display:block; visibility:visible;'
  }, 
  null, html2));
//
  try{ 	//gather info
  gt_sl_gms=getId('gt-sl-gms').textContent; gt_tl_gms=getId('gt-tl-gms').textContent;
  gt_sl_gms=gt_sl_gms.replace(/^.*?\:\s*/,''); gt_tl_gms=gt_tl_gms.replace(/^.*?\:\s*/,'');
  getId('divBottom').removeChild(getId('optionsLink'));
  var oL= buildEl('div', {id:'optionsLink', title: 'Settings', 'class':'gootransbutt'},
  null, null);
  addEl(oL,'a',{id:'optionsFrom','class':'gootranslink'},  
  ['click', options],  gt_sl_gms +' ');
  addEl(oL,'a',{id:'optionsFast','class':'gootranslink', 
  title: 'swap languages'}, ['click', fastSwap], imgSwap);
  addEl(oL,'a',{id:'optionsTo','class':'gootranslink gtlPassive'},  
  ['click', options],  gt_tl_gms );
  getId('divBottom').appendChild(oL);
  }catch(e){ GM_log('gather\n'+e); }
  
	var translation = getId('result_box').textContent;
  addHistory(txtSel,translation); 
// first run: resolve tl = auto
  if(GT_tl == 'auto')try{
    GT_tl=getId("gt-tl").value;
  	if(GT_tl) GM_setValue('to', GT_tl);
    else GT_tl='en';
    gt_tl=GT_tl;
  }catch(e){GM_log('auto?\n'+e)}
  killId('divSourceshow');
  killId('divHist');
	//parse info 
  var dR=getId('divResult');
	dR.innerHTML = '<a class="gootranslink" href="#'+
  '" target="_blank">' + translation + '</a>'; // +'<br>&nbsp;';
  dR.childNodes[0].setAttribute('href',currentURL); //<a href
  dR.style.textAlign = rtl_langs.indexOf(GT_tl) < 0? 'left':'right';
  dR.style.direction = rtl_langs.indexOf(GT_tl) < 0? 'ltr' :  'rtl';
  dR.lang=GT_tl;

  if(GM_getValue('noDict')!=0)
     dict();
  if(GM_getValue('sourceShow'))
     source();
  if(GM_getValue('histShow'))
     history();
  if(!GM_getValue('from') && !getId('divOpt')) // no settings?
     options(); // show options
}
function getSelection(t){
	var txt = '';
	//get selected text
	if (window.getSelection){
		txt = window.getSelection();
	}
	else if (document.getSelection)	{
		txt = document.getSelection();
	}
	else if (document.selection)	{
		txt = document.selection.createRange().text;
	}
  inTextArea= t.type=='textarea' ? t : null
  if(inTextArea){
   txt=t.value.substr(t.selectionStart,t.selectionEnd-t.selectionStart);
  }
	return trim(txt);
}
function swapLang(){
    var to=getId('optSelLangTo').value;
		getId('optSelLangTo').value = getId('optSelLangFrom').value;
		getId('optSelLangFrom').value = to;
    quickLookup();
}

function saveIt(){
 var bs =getId('gtp-save');
 bs && (bs.className ='gootranslink goounsaved');
}

function options(evt){
	var dO = getId('divOpt');
	if(!dO){//show options
	 dO = buildEl('div', {id:'divOpt' });
   var oL=getId('optionsLink');
   oL.title='Hide settings';
   //
   var dA=getId('divHist');
   if(dA){
  	 insAfter(dO,dA);
   }else if(( dA=getId('divSourceshow')) ){
 		 insAfter(dO,dA);
   }else{
     insAfter(dO,getId('divResult'));
   }
		//from
    addEl(dO,'a',{'class':'gootransbutt gootranslink',
    target:'_blank', href:senojflags[1], title: 'choose country flag icon'},
    ['click',function(e){
     e.preventDefault(); GM_openInTab(senojflags[dbg]); cleanUp(); return false;}], 
    imgH+imgFlags['AN']+imgT);
		addEl(dO,'span', null, null,' From: ');
    var gt_slist =getId("gt-sl");
    gt_slist= gt_slist ? gt_slist.innerHTML+'' : languagesGoogle;
    var oF =dO.appendChild(buildEl('select', {id:'optSelLangFrom'}, null, gt_slist));
		oF.value =  GM_getValue('from') ? GM_getValue('from') : "auto";
		oF.addEventListener('change', quickLookup, false);
    // swap
		addEl(dO,'span', null, null,'&nbsp');
		addEl(dO,'a', {id:'opSelectLangSwap',href:HREF_NO, 'class':"gootranslink",
    title:'Swap languages',}, ['click', swapLang], imgSwap);
		//to
		addEl(dO,'span', null, null,' To:');
    var gt_tlist=getId("gt-tl");
    gt_tlist= gt_tlist ? gt_tlist.innerHTML+'' : languagesGoogle;
    var oT =dO.appendChild(buildEl('select', {id:'optSelLangTo'}, null, gt_tlist));
		oT.value = GM_getValue('to') ? GM_getValue('to') : "auto";
		oT.addEventListener('change', quickLookup, false);
		//use ctrl 
		addEl(dO,'br');
		addEl(dO,'span', null, null,'Use with: ');
		var d=addEl(dO,'input', {id:'checkCtrl', type:'checkbox'},
    ['change', saveIt],  null  );
		addEl(dO,'span', null, null,' Ctrl &nbsp;&nbsp; ');
		d.checked = GM_getValue('ctrl');
    // use alt
		d=addEl(dO,'input', {id:'checkAlt', type:'checkbox', 
    title:'using Alt is highly recommended'},
    ['change', saveIt],  null);
		addEl(dO,'span', null, 
    null,' Alt &nbsp;&nbsp;&nbsp; History:&nbsp;');
		d.checked = GM_getValue('alt');
//		history depth
		d=addEl(dO,'input', {id:'histSize', type:'textbox',  maxlength: 2,
    style: "width:2em; ", title: "set to 0 to clear history"});
		addEl(dO,'span', null, null,' items &nbsp; of ');
		d.value = maxHT;
// max # words in phrase 
		d=addEl(dO,'input', {id:'histWc', type:'textbox',  maxlength: 1,
    style: "width:1em; ", title: "max # of words in phrase"});
		addEl(dO,'span', null, null,' words');
		d.value = maxWC;
// source box params
		addEl(dO,'br');
		addEl(dO,'span', null, null,'Source box: &nbsp;');
		d=addEl(dO,'input', {id:'sourceBH', type:'textbox',  maxlength: 1,
    style: "width:1em; ", title: "box height"});
    d.value = sourceBH;

		addEl(dO,'span', null, null,' height &nbsp; ');

		d=addEl(dO,'input', {id:'sourceDP', type:'textbox',  maxlength: 2,
    style: "width:2em; ", title: "# of lines to keep"});
		addEl(dO,'span', null, null,' depth &nbsp; ');
    d.value = sourceDP;

		addEl(dO,'span', null, null," No flags:");
		d=addEl(dO,'input', {id:'checkNoflags', type:'checkbox',
    title: "don't show country flag icons"});
    d.checked = GM_getValue('noFlags');
		//save
		addEl(dO,'span',null,null,' &nbsp; ');
    var oS=
		addEl(dO,'a', {href:HREF_NO, id:'gtp-save', 'class':'gootranslink gootransbutt',
    title: "save changes"}, 
    ['click', saveOptions], '<b>save</b>');
    if(!GM_getValue('from'))
      saveIt();
    getId('optionsTo').className='gootransbutt gootranslink gtlActive';
		//cancel
	}
	else{//hide options
		killId(dO);
    getId('optionsLink').title = 'Settings';
    var oTL = getId('optionsTo');
    oTL.className='gootransbutt gootranslink gtlPassive';
	}
}
function showTrans(){
try{ 
 var hOs = GM_getValue('showTrans',false) !== true;
 var shhi = hOs?'gtp-trans gtp-block':'gtp-trans gtp-hide';
 var tds= document.getElementsByClassName('gtp-trans');
 for(var i=0, il=tds.length; i<il; i++){
  tds[i].className=shhi;
 }
 getId('gtp_transOnOff').innerHTML = hOs?"&laquo;&laquo;":"&raquo;&raquo;";
 GM_setValue('showTrans',hOs)
} catch(e){GM_log('showTrans\n'+e)}
}

function extractDict(txt){
try{
 if(!txt) return;
 txt=txt.replace(/,(?=,)/g,',""');
 var dA=JSON.parse(txt);
 var dL;
/** / if(0 && dA && dA[1] && dA[1][0]) {
   dL = buildEl('ol',{id: 'gtp_dict'});
   var da=dA[1];
   for(var i=0,il=da.length; i<il; i++)
     dL.appendChild( buildEl('li', null, null, da[i][0]+
     '<br>'+da[i][1].join('<br>')));
 }else /**/
  if(dA && dA[1] && dA[1][0] ){
     var da=dA[1];
     dL=buildEl('div',{id: 'gtp_dict'});
     var dT=addEl(dL,'table');
     var dB=addEl(dT,'tbody');
     var showT = 'gtp-trans gtp-hide',showI = "&raquo;&raquo;"
     if(GM_getValue('showTrans',false) === true)
      showT = 'gtp-trans gtp-block', showI = "&laquo;&laquo;"
     
     for(var i=0,il=da.length; i<il; i++){
       var tr=addEl(dB,'tr');
       addEl(tr,'td',{'class': 'gtp-pos'}, null, da[i][0]);
       for(var j=0,jl=da[i][2].length; j<jl; j++){
        tr=addEl(dB,'tr');
        addEl(tr,'td',{'class': 'gtp-word'}, null, da[i][2][j][0]);
//        GM_log(JSON.stringify(da[i][2][j]))
        da[i][2][j][1]&&
        addEl(tr,'td',{'class': showT}, null, da[i][2][j][1].join(', '));
       }
     }
     var gtdir = (getId('divResult').style.direction=='rtl') ? 'left' : 'right';
     addEl(dL,'a',{'class': 'gootransbutt gootranslink', id: 'gtp_transOnOff',
       style: 'position: absolute; top: 1.25em; '+gtdir+': 2em;'
       },['click', showTrans],showI);
  }
 else {return;}
 killId('gtp_dict');
 getId('divResult').appendChild(dL);
}catch(e){GM_log('exDict\n'+e)}
}

function onTimerDict(){
 dictURL = 'http://translate.google.com/translate_a/t?client=t&text=' + 
 txtSel + "&hl="+ GM_getValue('to','auto') + "&sl=" + gt_sl + "&tl=" + gt_tl //+'&multires=1&ssel=0&tsel=0&sc=1';
 //GM_log('dict:'+ dictURL);
 Request(dictURL,extractDict);
}

function dict(){
  var dict = null, did=getId(res_dict);
  var dR=getId('divResult');
  if(did){
  	try{
      did.removeChild(did.childNodes[0]); //dictionary
			dict = did.innerHTML.replace(/\<br\>/g,'');
		}catch(e){ GM_log('rm dict\n'+e);
			dict = null;
		}
  }
  //else  GM_log(res_dict+' No dict?') ;
//
  if(dict){
    var dD=buildEl('div',{id:"gtp_dict"},null,dict)
    killId('gtp_dict');
		dR.appendChild(dD);
  }
  if((txtSel.split(' ')).length<=3);	
   setTimeout(onTimerDict,55);
}

function saveSource(){
  try{
  sT = getId('divSourcetext').value;
  GM_setValue('sourceText',JSON.stringify(sT));
  }catch(e){GM_log('saveSource\n'+e)}
}
function source(){
 var divSource = getId('divSourceshow');
 try{
 if(divSource){
   killId(divSource);
   var sL = getId('sourceLink');
   sL.innerHTML = 'Source';
   sL.className = 'gootransbutt gootranslink gtlPassive'
   sL.title = 'Show source';
   killId('imgSourcesave');
   GM_setValue('sourceShow',false);
   return;
 }
 GM_setValue('sourceShow',true);
 divSource= buildEl('form', {id:'divSourceshow', style: 'border: 0'}, null, null);

 if(sT){
  var sTa= sT.split('\n'); 
  var tS= txtSel + ' \u2192 ' + trim(getId('divResult').childNodes[0].textContent);
  if(tS != sTa[0]){
   while(sTa.length >= sourceDP) sTa.pop(); 
   sT=  tS + '\n' + sTa.join('\n');
  }
 }else sT=txtSel;
 if(!getId('imgSourcesave'))
 insAfter(
  buildEl('img',{id: 'imgSourcesave', title: 'save source', src: imgSave,
  style: 'margin-bottom: -3px;'},  
  ['click', saveSource], null)
  ,getId('sourceLink'),getId('sourceLink'));
 addEl(divSource,'textarea', {id:'divSourcetext', rows: sourceDP, 
 style: "font-family: sans-serif !important; height:"+(sourceBH+1)+"em;"}, null, sT),
 getId('divBottom');
 var sL=getId('sourceLink');
 sL.innerHTML = 'Source';
 sL.className= 'gootransbutt gootranslink gtlActive';
 sL.title = 'Hide source';
 
 }catch(e){GM_log('Sourceshow\n'+e)};
 insAfter(divSource,getId('divResult'));
}
// ht: [from, to, langpair, hitCount]

function history(){
 var divHist = getId('divHist');
 try{
 if(divHist){
   killId(divHist);
   var hL = getId('historyLink');
   hL.innerHTML = 'History'; hL.className= 'gootransbutt gootranslink gtlActive';
   hL.title = 'Translation history';
   GM_setValue('histShow',false);
   return;
 }
  if(!maxHT) return;
  GM_setValue('histShow',true);
	divHist = buildEl('div', {id:'divHist'},['click', histLookup], null );
//	
  for(var i=0, l=ht.length; i<l; i++){
    var bkg = ht[i][0].indexOf(' ')>0 ? ' goohistlink' : '';
    addEl(divHist,'a', {href:HREF_NO, 'class': 'gootranslink'+bkg, title: ht[i][1]+
    ((ht[i][3]>1) ? ' ['+ht[i][3]+']' : '')},
    null, ht[i][0]);
    if(i < l-1)
    divHist.appendChild(document.createTextNode(' '));
  }
	addEl(divHist,'span',null,null,'<br>&nbsp;');
  if(getId('divSourceshow'))
   insAfter(divHist,getId('divSourceshow'));
  else
   insAfter(divHist,getId('divResult'));
  var hL=getId('historyLink')
//  hl.textContent = 'X';
  hL.title= 'Hide history';
  hL.innerHTML = 'History'; hL.className = 'gootransbutt gootranslink gtlActive';
  }catch(e){GM_log('hist problem\n'+e)}
}

function saveOptions(evt){
  try{
	var from = getId('optSelLangFrom').value;
	var to = getId('optSelLangTo').value;
	var ctrl = getId('checkCtrl').checked;
	var alt = getId('checkAlt').checked;
  var mh = parseInt(getId('histSize').value);
  var wc = parseInt(getId('histWc').value);
  var nf = getId('checkNoflags').checked;
  if(0<= mh && mh <=99 && mh<maxHT){
    while(ht && ht.length>mh)  ht.pop();
    GM_setValue('hist',ht? JSON.stringify(ht):'');
    if(getId('divHist')){
     killId('divHist');
     history();
    }
  }
  maxHT=mh;
  var bh = parseInt(getId('sourceBH').value);
  if( 0< bh && bh <10) sourceBH = bh;
  var dp = parseInt(getId('sourceDP').value);
  if( 0< dp && dp <100) sourceDP = dp;
  if(1<= wc && wc <=9) maxWC=wc;
  GM_setValue('histSize',maxHT)
  GM_setValue('histWc',maxWC);
	GM_setValue('from', from);
	GM_setValue('to', to);
	GM_setValue('ctrl', ctrl);
	GM_setValue('alt', alt);
	GM_setValue('sourceBH', sourceBH);
	GM_setValue('sourceDP', sourceDP);
  GM_setValue('noFlags',nf)
	getId('divDic').removeChild(getId('divOpt'));
	getId('optionsLink').title='Settings';
  return;
  }catch(e){GM_log('saveOpnions\n'+e);}
}

function addHistory(src,trt){
 if (!maxHT) return;
 try{
 var hts=GM_getValue("hist");
 if(!ht && !hts){
   ht=[["google translator","Der Ubersetzer","en|de",0]];
   hts=JSON.stringify(ht);
 }
 ht=JSON.parse(hts);
 var st=trim(src+''); var tt = trim(trt+'');
 var wc = (st.split(' ')).length;
 if(wc>maxWC) return;
 var lang=currentURL.match(/\&langpair=(.+)/)[1];
 var ix=-1;  // find word in hist
 for(var i=0, l=ht.length; i<l; i++)
    if(st==ht[i][0]){ ix=i; break; }
 //if(ix==0) return; // nothing to do
 var hits=0;
 if(ix>=0){
  hits=ht[ix][3];
  if( (gt_sl+'|'+gt_tl) == ht[ix][2] && tt != ht[ix][1]) {
   tt = ht[ix][1]; // don't touch my translasion
  }
  ht.splice(ix,1);
 }
// if(hits<4) 
 hits++; // delete it by your own hands
 if (ht.length>maxHT){
  var minHit=99999; // which item shoud i remove?
  for(i=ht.length-1;i>0;i--)
   if(minHit>ht[i][3]) minHit=ht[i][3]
  ix=ht.length-1;
  for(var i=ix; i>0; i--)
   if(minHit==ht[i][3]){  ix=i; break; }
  ht.splice(ix,1);
 }
 ht.unshift([st,tt,lang,hits]);
 GM_setValue('hist',JSON.stringify(ht));
 } catch(e){GM_log('addHist\n'+e);}
}
var senFlag = '';
function selFlag(e){
 if(!isInited) {css(); isInited=true; }
 killId('divSelflag');
 document.addEventListener('keydown', escCleanup, false); 
 var p = belowCursor(e,10,10);
 var dsf = buildEl('div',{id:'divSelflag', style:
  ';top:'+p.t+';left:'+p.l+';right:'+p.r  +';bottom: auto'});
 var sel=addEl(dsf,'select',{id: 'optSelFlag'},
 null,languagesGoogle);
 sel.value = GM_getValue('to')? GM_getValue('to'): 'en';
 addEl(dsf,'span',null,null,'<br><br>');
 addEl(dsf,'a', {href:HREF_NO, 
 'class':'gootransbutt gootranslink', title: "use icon"},
 ['click',  function(){saveFlag(true)}], '<b>&nbsp; OK &nbsp;</b>');
 addEl(dsf,'a', {href:HREF_NO, 
 'class':'gootransbutt gootranslink'},  
 ['click', function(){saveFlag(false)}], 
 '<b>&nbsp; cancel &nbsp; </b>');
 //http://www.senojflags.com/images/national-flag-icons/Bermuda-Flag.png
  senFlag = e.target.src+'';
  var sm = senFlag.match(/.+\/(.+)\-Flag\.png/);
  if(sm && sm[1]) senFlag= sm[1];
  _log(senFlag);
	if(senFlag) body.appendChild(dsf);
}
function saveFlag(tf){
 if(tf && senFlag){
   var s= 'l-'+getId('optSelFlag').value;
   GM_setValue(s,senFlag);
   _log(s+': '+senFlag );
 }else _log('cant save flags' );
 killId('divSelflag'); return;
}
var fCSS;
function flagClick(e){
 e.preventDefault();
 if(e.target.nodeName == 'IMG'){
  _log('hit on: ' + e.target.alt);
  selFlag(e);
 }else (killId('divSelflag'));
}
function belowCursor(evt,ho,vo,lr){
  var p={t:'', l:'auto', r:'auto'};
  p.t=(evt.clientY+window.pageYOffset+vo)+'px';
  var l=(evt.clientX+window.pageXOffset+ho)+'px';
  if(lr && lr=='r')
  { p.l=l; return  p; }
  var r=(document.body.clientWidth-(evt.clientX+window.pageXOffset)+ho)+'px'; 
  if(lr && lr=='l')
  { p.r=r; return  p; }
  if(evt.clientX < document.body.clientWidth/2)
   p.l=l;
  else
   p.r=r;
  return p;
}
var flagLang;
function getFlagSrc(lng, where){
  if(!where) where = 'to';
  if(GM_getValue('noFlags')) return imgFlags[where];
  var fl='l-'+lng;
  var flag = GM_getValue(fl,'');
  if(!flag){
    flag=imgFlags[lng];
    if(!flag) return flag = imgFlags[where];
  }
  if(flag.indexOf('http')==0
   //flag.indexOf('file') ==0
   ||flag.indexOf('data:') ==0)
   return flag;
  flagLang=fl;
  flag= 'http://www.senojflags.com/images/national-flag-icons/'+flag+'-Flag.png';
  flagRequest(flag);
  return flag;
}
function flagRequest(f){
 GM_xmlhttpRequest({
	method: 'GET',
	url: f,
  binary: true,
  overrideMimeType: "text/plain; charset=x-user-defined",
  headers: {	    
    "User-Agent": "Mozilla/5.0"
   ,"Accept":  "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
   ,"Accept-Encoding":  "gzip, deflate"
  },
	onload: function(resp) {
		try{
       flagStore(resp.responseText);
		}catch(e){GM_log('FlagRqst\n'+e);}
	}
 });	
}
function flagStore(r){
 GM_setValue(flagLang,"data:image/png;base64," + b2b64(r));
}

//http://www.senojflags.com/images/national-flag-icons/Portugal-Flag.png
function trim(s){
 return (s+'').replace(/\s+/g,' ').replace(/^\s/,'').replace(/\s$/,'');
}

function killId(nod){
 if(!nod) return;
 var n = nod;
 if(typeof n == 'string') n= getId(nod);
 if(!n) return;
 if(n.parentNode) n.parentNode.removeChild(n);
 else  _log('cant kill: '+nod)
}

function addEl(to,type, attrArray, eL, html){
 return to.appendChild(buildEl(type, attrArray, eL, html));
}

function buildEl(type, attrArray, eL, html)
{
	var node = document.createElement(type);
	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}
	if(eL){
  //GM_log('buildEl\n'+type+'\n'+JSON.stringify(attrArray)+'\n'+eL[0])
		node.addEventListener(eL[0], eL[1], eL[2]?true:false);
	} 
	if(html) 
		node.innerHTML = html;
	return node;
}
function getId(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}
function getTag(name, parent){
	if(!parent)
		return document.getElementsByTagName(name);
	return parent.getElementsByTagName(name);
}
/*
 * Drag and drop support adapted fom http://www.hunlock.com/blogs/Javascript_Drag_and_Drop
 */
var savedTarget=null;                           // The target layer (effectively vidPane)
var orgCursor=null;                             // The original mouse style so we can restore it
var dragOK=false;                               // True if we're allowed to move the element under mouse
var dragXoffset=0;                              // How much we've moved the element on the horozontal
var dragYoffset=0;                              // How much we've moved the element on the verticle
var didDrag=false;								//set to true when we do a drag
function moveHandler(e){
	if (e == null) return;// { e = window.event } 
	if ( e.button<=1 && dragOK ){
		savedTarget.style.left = e.clientX - dragXoffset + 'px';
		savedTarget.style.top = e.clientY - dragYoffset + 'px';
		return false;
	}
}
function dragCleanup(e) {
	document.removeEventListener('mousemove',moveHandler,false);
	document.removeEventListener('mouseup',dragCleanup,false);
	savedTarget.style.cursor=orgCursor;
	dragOK=false; //its been dragged now
	didDrag=true;
}
function dragHandler(e){
	var htype='-moz-grabbing';
	if (e == null) return;//
	var target = e.target;// != null ? e.target : e.srcElement;
	orgCursor=target.style.cursor;
	if(target.nodeName!='DIV' )	
 	 return;
  if( e.ctrlKey || e.altKey || e.shiftKey)
    return; // enable selection inside
	else if(clickedInsideID(target, res_dict))
		return;
	if (target = clickedInsideID(target, 'divDic')) {
		savedTarget=target;       
		target.style.cursor=htype;
		dragOK=true;
		dragXoffset = e.clientX-target.offsetLeft;
		dragYoffset = e.clientY-target.offsetTop;
		//set the left before removing the right
		target.style.left = e.clientX - dragXoffset + 'px';
		target.style.right = null;
		document.addEventListener('mousemove',moveHandler,false);
		document.addEventListener('mouseup',dragCleanup,false);
		return false;
	}
}
function clickedInsideID(target, id) {
	if (target.getAttribute('id')==id)
		return getId(id);
	if (target.parentNode) {
		while (target = target.parentNode) {
			try{
				if (target.getAttribute('id')==id)
					return getId(id);
			}catch(e){}
		}
	}
	return null;
}
//end drag code
function b2b64(inp) { // binary data --> base64
  var output = [], c1, c2, c3, e1, e2, e3, e4, i = 0;
  const k="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var len = inp.length;
  while( i < len ){
    c1 = inp.charCodeAt(i++); c2 = inp.charCodeAt(i++); c3 = inp.charCodeAt(i++);
    e1 = (c1&255) >> 2; 
    e2 = ((c1 & 3) << 4) | ((c2&255) >> 4);
    e3 = ((c2 & 15) << 2) | ((c3&255) >> 6);  
    e4 = c3 & 63;
    if( isNaN(c3)) e4 = 64;
    if( isNaN(c2)) e3 = 64;
    output.push( k.charAt(e1) + k.charAt(e2) + k.charAt(e3) + k.charAt(e4));
  }  return output.join("");
}

function css(){
GM_addStyle(
'#divResult {overflow: auto; padding:3px; margin-bottom: 3px; max-height: 480px !important;}'+
'#divResult table *{ line-height: .85em !important}'+
'#divDic, #divDic *, #divSelflag, divSelflag * {font: small normal Tahoma,Verdana,Arial sans-serif !important; }'+
'#divDic,#divSelflag {position: absolute; background-color:#FFFFE1 !important; color:#000000 !important; opacity: .95'+
';padding:5px ;z-index:10000; border-radius:3px; border: solid thin grey'+
';text-align: left !important;}'+
'#divDic{/*min-width: 340px !important; min-height:50px;*/ max-width:50%; padding: 3px; margin: 0;}'+
'#divSelflag{ max-width: 180px; }'+
'.gootranslink, a.gootranslink '+
'{color: #047 !important; text-decoration: none !important; font: small normal sans-serif !important;'+
'cursor:pointer !important; }'  +  
'a.gootranslink:visited {color:  #047 !important; text-decoration: none !important;}'+ 
'a.gootranslink:hover {color:  #047 !important; text-decoration: underline !important;}'  +
'a.gootranslink:active {color:  #047 !important; text-decoration: underline !important;}' +
'#gtp_dict table {font-size:13px; line-height:.8em; margin-left:5px; border:0px; background-color:#FFFFE1; color:black; }'+
'a.goohistlink {background-color: #F9E78F !important;}'+
'#gtp_dict {margin: 0 !important;}'+
'#gtp_dict ol {padding: 0 .5em 0 0 !important; margin-left: 0.2em !important;}'+
'#gtp_dict li {list-style: square inside !important; display: list-item !important;}'+
'#gtp_dict td {padding-left: .25em !important; vertical-align:top; border:0px; color:black; background-color:#FFFFE1;}'+
'#optSelLangFrom,#optSelLangTo {max-width: 150px; text-align: left !important; }'+
'#divExtract{word-spacing: normal !important;}'+
'#divBottom {position: relative; width: 100%; font-size: smaller; text-decoration:none; }'+    
'#historyLink {display: inline; position: relative; font-size:smaller; text-decoration:none;}'+
'#sourceLink {display: inline; position: relative; margin-left: 2em;  font-size:smaller; text-decoration:none;}'+
'#imgSourcesave {display: inline; position: relative; margin-left:2px;}'+
'#optionsLink {display: inline; position: relative; margin-left: 2em; font-size:smaller !important; text-decoration:none !important;}'+    
'#divOpt {position: relative; padding: 5px;'+
'border-top: thin solid grey;}'+ 
'#divLookup, #divOpt, #divBottom,#divSourcetext,#divHist,#divuse {direction: ltr !important;}'+
'#divHist {background-color:#FFFFE1; position:relative; padding:5px; text-align:left !important;'+
'border-top: thin solid grey;}'+ 
'#gtp_dict {background-color:#FFFFE1; color:#000000; opacity: .95; padding:1px; border-radius:3px;'+
'margin-bottom: .1em; overflow-y:auto; overflow-x:hidden; font-size:small;}'+
'#divOpt {background-color:#FFFFE1; position:relative; padding:5px; text-align:left !important;}'+
'#divLookup, #divUse {background-color:transparent; color:#000000; position:absolute; padding: 3px;}'+
'#divSourceshow {border:0;}'+
'#divSourcetext{ width:100%; height: 3em; line-height: .85em; overflow: auto !important;}' + 
'.gtlPassive:before{ content:"\u2193";}'+
'.gtlActive:before{ content:"\u2191" !important;}'+
'#imgUse, #divGetback, #divGetforw {margin-left: 5px !important;}'+
'#divSourcetext {background: #EEE !important; color: black !important;}'+
'.gootransbutt {background: -moz-linear-gradient(to top left, #CCA, #FFD);'+
'border-radius: 3px; margin-top: 5px; }'+
'.goounsaved {background: -moz-linear-gradient(to top left, #F00F00, #FFFF8F);'+
'border-radius: 3px; margin-top: 5px; }'+
'td.gtp-pos { color: #000000 !important; font-weight: bold !important;  text-align: left; }'+
'td.gtp-pos:before{ content:"\u2666 ";}'+
'td.gtp-word {color: #000000 !important; padding-left: 5px; padding-right: 10px;'+
'vertical-align: top; white-space: normal;}'+
'td.gtp-trans {/*overflow-x: hidden;*/ vertical-align: top; white-space: normal;'+
' width: 100%; color: #404040 !important}'+
'td.gtp-pos, td.gtp-word, td.gtp-trans {padding-top: 1px !important; padding-bottom: 0 !important;}'+
'.gtp-hide {display: none}'+
'.gtp-block {display: block}'+

''
);
}
function insAfter(n,e){
  if(e.nextElementSibling){
   e.parentNode.insertBefore(n,e.nextElementSibling);
  }else{
   e.parentNode.appendChild(n);
  } 
}
function insBefore(n,e){
   e.parentNode.insertBefore(n,e);
}
var imgH='<img border=0  src="' , imgD='data:image/png;base64,',imgT='">';

imgForwSrc= imgD+
'R0lGODlhEAAQAIQfAAFYsQJkw15iWgRz3AeN0Xl8c2mBiQma5B6W1h+b3yqh4BKp+kWk0pudlDC2/0y79X+4z1fC/7q6r3DK/4rN7a3Kz8fKwc/Uyr3c5N7dzuTi1Ofl1enm2O3r3/b06////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAB8ALAAAAAAQABAAAAWf4OeNXmdyX6qKpNSc25p6TVEIgl1osljntxxPNrIILhrDZBl5OBaLj6mTa1CWk+YTOpXgsBEM5gFdmDLBiJrC2VCgB85lYJFcmg+MPAPnDP4aGg4ODxsVFBkPBwd/jRuDFBoQDxkVix+NHwBQSBmeFwoEHwEDAQEAAJQVDAwQFxCipqeoABkMiwcWFqKjpqgEBLjAwDIAHwoJyQkIzB8hADs=';
imgForw = imgH+imgForwSrc+imgT;

imgBackSrc= imgD+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAGBQTFRFEgAAAVixAmTDXmJaBHPcB43ReXxzaYGJCZrkHpbWH5vfKqHgEqn6RaTSm52UMLb/TLv1f7jPV8L/urqvcMr/is3trcrPx8rBz9TKvdzk3t3O5OLU5+XV6ebY7evf9vTrdcYePwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAoklEQVQY003PWxKDIAwF0CCPYouCKIIB7f532UTttPfvnkkyE4Ar+3Ecb8pdoRGM859UY4yUxow/4CpPcM6HuCzLoxaZacV9IY1G0mWGsG0sUs4M1rnU9hRjpCt4AZZ9CyGWOauyg7UB09qC97UqpRhWDFNN3jfFAf0qiFiLcwK4g57KNAw0JUTXqY4gZ2vtgEKwMFBItL47QN/3T8oLxPnVB4gUDOnY6pKLAAAAAElFTkSuQmCC';
imgBack = imgH+imgBackSrc+imgT;

imgSwap = "<img border=0 style="+'"margin-bottom: -3px;"'+
"src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAQCAYAAAD52jQlAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAGFJREFUOMu1kkESwCAIAxM+7vTlevJipYKkOWeWQAB2ar2jIFMD31ABEACYBj5kLKkooX9TGTSwUqZQusbToOnd+CxbQiQxXeMccPEVrNzOA//YvkKp9SNnWQo2ZcK6PgocHMgoj3uaTsAAAAAASUVORK5CYII='>";

imgUse = imgD+ 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQklEQVR42mNkoBAwgoiwykntQCoeTW7hqva8SmINeGZv7yCJLHHw4IHnQAOkCBoQXjdnJpBOI9MHsxhDa2b9z4v2xir7/z8QgyCU/gdi/GMA00CKYc7qnQyMwdUz/icGuSFp+s/w+cs3hqPHzzK8fPUGzBcVE2EwMzVk4OTkhGgG4X//GTbtPsTAGFgx5X9iiCfYFpDE+/cfGTZv28Ogr6vJ8A7ItjQ3ZLhy/Q7DxUvXGVxcHRj4+PgY/kIN2LH3IAOjX8mE//Gh3gz/oU7bu+8wg4S4CIOBnjbDlFmLGRLiIxnYWJgYzl+4wvD0+WsGSxtLhr///kPVHmBg9Cns+R8d7At32rJlaxnCw/0Y/vxjYli2dBVDaEQI2DZmoA0r12xg8A30hxgAxIcPAg3wzOv4HxrgDRb4C/TGmtXrGbx9PBmYWFgZVq9YA4wnRoa/f/4xeAf4MOzYsp3B3dcH7oVTR4FecMtq+e/r7QExAIhPnzzFwMsnwKCkqsIgwM0OVgwKnzPnrjB8/PCeQdPAEO7aCyeOMDC6pDf8d3V1AQv8BcXN758Mu3YfZJBXUmQQl5YCGszA8OzJE4ZH9+4z2DnYMPxkZAGrBYXZtbPHGBgdk2v+2zo6AQX+g21jY2FmALqZ4cyZCwxv3rwFKmZgEBYWYjAw1GP4zcDE8O3nb4gBQPFb508wMNonVv7XNzYFGwBzGgsTEwMvFwfI+8DkAzQPGDgfvn1n+PHrLzhdwMDDG5cYGK0iC/8zUABAmcmAEgMA4i8z829X6pgAAAAASUVORK5CYII=';

imgSave= imgD+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgklEQVR42mNkAIL4tTeX/P36xnpBtCXDolN3GYS42Bn8dGUYGBkZGWBg/+0XDFOOPfzDxSOw8enZg5X729N/g8TBKuJWX/v++d0TjnVprgx2vZsY1MT4GebE2jMgg93XnzBMPnKXgYdPhOE/A8OiFRE68XADolZc+v7u+V2O7QUBDMbNyxg0JAQZlqZ6ohiw/fIDhr6DNxgEhSTB/P///9euiTFsARsQtuTs96ePb3PsLgpmOPfoJQM3GyuDgZwYigErHxQw3P/wnoGVhR2kmeH05aivt/bsFQEbELjg5PfHT+5y/Pj5i4GZiYkBG0iIqGZgYvwH5x89O4Xh1t6zCmADPGce+s7LycrBAPIdDmBuHAkM1L8IA870AQ04DzHAdere70CKgwEPcLFNAboAYcCR050Md/ZDDXCcuJMIA7IYGJmQvHCqieHugQsQA2z7tnzXEBfgEOXBbQa7VBSQRDLgdA0Dw4fDEAMsuzZ835nrxfH/zx+GP38QzvwP1DD3VjDDp7+PcZl7AWyAadua7weK/Tm+ff3G8Ov3HxQV7//eYVh8O5Xh3/+/KOL//jEzvHvBaw02wLBp+fcj5cEcL16+Y/j67QeGNZe/rmE4+XYxitj9Rw4Ml7Z9h3hBp27x95NV4RwvXmE34C/Q9lUPKhne/rkL5qsKGzIcOefLcGbXFogBmtXzvx9JUeHgYsWeiEDg1dcnDB3Xe4Bpn5GhUquUIXPzL4azB/YpMLb0T+E6+o1nryLrI2Nmhn8gEyBZEJkEhScwjX3geQMS+s//RfjfvV9Sz0x4/xszLlmyRAmUFIBYGogFgZgbmiZYgJgZFmZADMq+P4H4CxB/AOKnQHwQALc2/z+3odafAAAAAElFTkSuQmCC';

imgFlags= {
 'AN': imgD+
'iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAYAAAAMJL+VAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAABANJREFUOMutlEtsVHUUh797//c10955F2hKM7QUEUgNoRAqSUGJESO6ACSyIKgJwSXGGFJ2mhijG2JE3WgiiSaCAQlVeagIhAYID4GIgKU4lGdbhs5MZ+bemft0UXGBukF/y7M4X07OOR/8T9n84eebNm3ZuvPBuvJgYcvOg8r573a0zF62uqP/zM/JUdvX8T1f1fRqV+vkQu74gXsqoaUaRlSbt2zaxby1UJs2e929WR1tSzqSdH/15RMnThw7fL+ftP7tj41hueG5eDK12GzJLp3a0vxoImaKCyNlLuWrnBvKU8oXWZoKKVoOZ4suoSyBAIQGWpSIEaFnWoLH2zOkhs9d2Lh8aed9gBh7ZuOVk+acDeVU68JEzJwUNxQ5Kgc4rk/ZsqnYNWJBnZ+eb+bZVp3V0xvoTAvSIkTyXUZqPh4SrqSQ1AQzOmdNsq/8Ovr7wOXTALJ3sX8/jkXZsig7PlU3oFGRWTA5QlRT8YRKBQULQdEDTYKeKRF6uzJ8s7yZBSkBnsvtksXVgs1vt0qse++Dd2a2t6UARFs2Gx/p6FkVeh7pRp2kJpBkyJoqm+el6Zli0Ds3jl338fwAz/MJQvDCEMsL6Z6kkxtzGbICbARJTZBpyhiPTElmDu/t6xNJr3LN6V652XJdYoZOKqKS0AS2H7B9sMqqbBQ5CHA9nyCcAIRB8OcGwdRkNnQm2X/D5nrFQ1NVTEWma1H3vKuH9v0g8oWC0/TYoqfHjUSrUASZBp2ELohrMhU/ZElLFE1iAuD7BEGA7/oTABlCwPF9xj2J4yMOViBIGAIzFiXmFg0B0JROTy1ku54kDCYAhoqpyUQViU8vV2iOSnTEBL7nI4UBvj8xRQhIEmgyHLxR5XzJpx4CqkG6fu/uZ6+99LICYFZG9ymq9pZVsynaDhUnQs0LSRgyqajgzXPjtGs+cxs87oxZxHGYGQlpMWUCwJBlTt2pQKACUaxisbC994W1lmUNCIDh3MDtzOIVr1cCWddVhUxUJxZRiGkybgDjTsipuzbbLxU5ervKj9fKhI7DyvZGnCBkz1CFHTkL3TRpvXn6THHrq2uK+ZF+IPzrk7XBk31M71lbsuqUa3UsR8cxQkxFolETxKMGRmMES5ZBM9hVrPP93hKBW8coj461DJ057p7e/8X1awPfBlD5myoy1uiRm0JdW7FrlGp1qnWXWqBiGhpNTREKnkz5yvnB6i/HLgS3ruYoDef0ejnnDudy+bHSTQfKQPCvLiod2bXbnP/iJ2XbpWg5WEInlPAv9W070r/n692DJ48esF33hqmKetn1w4cyYnPvtrO8ezSc8f6h4vxVr2yNRiJz/kmID53ZK9a/MfWpNR9FFJGduPL/nj8ActPaP8mCkKMAAAAASUVORK5CYII='
,'en': imgD+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJJSURBVHjapJNdSJNRGMd/Z3u3OTXXhx8xjRLDFWIk0jAk6WYYfaAZSUWGZkFdRNRFYAYFXhkI2gpKqISC1IsIUiKIchUEUQiuj4uiMT8m0wbNr+n2vu/p4l2K3Yn/m3Pg8Pye8/wf/kJKyWokACuQnjxXojgwowCOwPW2iS37y3k0bOfJwwHmYzFePK5n7Oxl0FRyH9zicGM3CZOFBhccypMox2tJdWZnK0Bay/AGmr+McmJvKUXbaul79hmTzYJ9x3bQdEw2C2V7XOzLUdmVZ2PWvZvm1lcAaQpg/vY9xL2NRdRMvqHUlYmzoRw9oREPjICqoic0qtIiFGVmECp20+kd4IPPD2AWQMFMcOSnxWZDavqyIcfOXARVJ7fLu9w4s4nEwgLpmzdtVQB+HW0kNcOBFo3Cv6VICWYTSEmw6hSYBOjGo7LOwdz0lHEHiMVimCciaNEpRLIWqSMUxWCpKgiBEAIJqI4M5tLtS4Cs++3kZGUlK5cUcFciEwkKBl//t3xBeHIS3KWYAEo87biruxiKWkh568N/447RWZdI3fAlMG8l5Z2PT00deOq6KfHcBjAA+YVO+p6eo8zXy/P+r9R9tCcbCQQCgIMHOuh3llFx2kNn/jjFhWuXAN6rFay/66XtZZjG9zrh0KjxVasCNgsAs9N/OHnkJq0/HLjOH+NadmjRg7jW00tnWOPKQGRxzEH/EOM7XUhNI+of4nckCEDThRaCl2qor66E/p64ABxALrBmhVmYBsYEYE4GybxCgAbExWrj/HcACIPUyGtYcDcAAAAASUVORK5CYII='
,'ru': imgD+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADkSURBVHjapJM5TgNBEEVfzeZlQIOE5ARxClLOxC04CzFX4ArERAhZsoTEyDDurqa7SGxsIYJZKqnov9p+iZkxJQSogLN9HhIKfBZAY2abUdVFVhlQT5igzoB8AiDPAGKMg5UHTQFwc/fI6rKh/VLsz4b/u9FFXbF5b4+AnXe8rIW2C72qN8uSwtwJoHMwm5NSP0+EbyP4E8DD0z3XZUnqdr0A2XLBawjcHgBOPZYXINILYMlw6o8deFVsvoCq7AewhFf9BWg047n9GOMDFaABroDzgeIt8CZ7J1YjHBkBlanv/DMAwHdYum9dlZQAAAAASUVORK5CYII='
,'zh-CN': imgD+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAFbSURBVHjapJO/SgNBEIe/vduLCSaKFhb6DCnFzs4XsMgjWlj4AD6BFhYKFqKgTSzSaBLN7f+xuJM7RSHRHywLy8w3Oz9mlIjwHymgA/TrexU54E0Dm+Pj0QSACGRADt39gLnQTZkftHd2uqOBdYmR3uGQYjfhnzPSXJHeYTCK2Lu8AquGJYC9vgFY10AupUdvTekdTYgnGvdYVQ5P0nTa+kW+vYV4D5BrgGAt9nZOmCzwDxlxkqG60D0ImCsN/msbKs+J1gKgAXww+Kcp5nKBKgQ0rA09i/Oi8iR880HAGdMATFnSuX8kzWZ8vvqHJvi7idnGBibPGkBZlvSzDJFURfj6FC1ISyl4SpcagDUWVRRISi2ngPTL8PiArUysW3AW0RqUWmqCRATjWiZaa6HbQxXFcjOYUpVTA1wU4eb15S+r4BSwCewBgxWT58BY1XZ16nsVRcCp/67zxwDGd5ld8bkQAQAAAABJRU5ErkJggg=='

,"af":"Afghanistan","sq":"Albania","ar":"United-Arab-Emirates","hy":"Armenia","az":"Azerbaijan","eu":"Spain","be":"Belarus","bn":"Bangladesh","bg":"Bulgaria","ca":"Spain",/* "zh-CN":"Chinese",*/"hr":"Croatia","cs":"Czech-Republic","da":"Denmark","nl":"Netherlands",/* "en":"English",*/ "eo":"United-Nations","et":"Estonia","tl":"Philippines","fi":"Finland","fr":"France","gl":"Ukraine","ka":"Georgia","de":"Germany","el":"Greece","gu":"India","ht":"Haiti","iw":"Israel","hi":"India","hu":"Hungary","is":"Iceland","id":"Indonezia","ga":"Ireland","it":"Italy","ja":"Japan","kn":"India","ko":"North-Korea","la":"Vatican-City","lv":"Latvia","lt":"Lithuania","mk":"Macedonia","ms":"Malaysia","mt":"Malta","no":"Norway","fa":"Iran","pl":"Poland","pt":"Brazil","ro":"Romania", /* "ru":"Russian",*/"sr":"Serbia","sk":"Slovakia","sl":"Slovenia","es":"Spain","sw":"Mozambique","sv":"Sweden","ta":"India","te":"India","th":"Thailand","tr":"Turkey","uk":"Ukraine","ur":"Pakistan","vi":"Viet-Nam","cy":"Wales","yi":"Israel"
 
};
imgFlags['zh-TW'] = imgFlags['zh-CN'];
imgFlags['to'] = imgForwSrc; imgFlags['from'] = imgBackSrc;

languagesGoogle = '<option value="auto">Detect language</option>'+
'\
<option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bn">Bengali</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">Chinese</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="eo">Esperanto</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">France</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="gu">Gujarati</option><option value="ht">Haitian Creole</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="kn">Kannada</option><option value="ko">Korean</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mk">Macedonian</option><option value="ms">Malay</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="es">Spanish</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="ta">Tamil</option><option value="te">Telugu</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="yi">Yiddish</option>\
';

/*
 * main()
 */
try{
body = getTag('body')[0];

maxHT=GM_getValue('histSize'); 
if(!maxHT) maxHT=20;
maxWC=GM_getValue('histWc');
if(!maxWC) maxWC=3;
sourceBH = GM_getValue('sourceBH');
if(!sourceBH) sourceBH = 2;
sourceDP = GM_getValue('sourceDP');
if(!sourceDP) sourceDP = 10;

var av = GM_getValue('version');
if( av!= version ){
  GM_setValue('version',version);
}
sT=GM_getValue('sourceText');
if (sT){ 
 try{
  sT=JSON.parse(sT);
 }catch(e){GM_log('broken source\n'+e)} ;
} else sT='';

document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);

// http://www.senojflags.com/#flags16
if(  location.href == senojflags[0]
   ||location.href == senojflags[1]
){try{
  if(!fCSS)  fCSS=
  'div#flags16 img {cursor: pointer !important}'+
  'div#flags48,div#flags32 {display:none; visibility: hidden}'
  GM_addStyle(fCSS);
  _log('inside\n' + location.href);
  insBefore(buildEl('p',{style:'font: bold italic 90% sans-serif; color:red;',
  align:'left'},null,'&nbsp;&nbsp;<u>Click on a country flag icon then choose the language</u>'),
  getId('flags16').childNodes[0]);
  getId('flags16').addEventListener('click',flagClick,false)
 }catch(e){GM_log('senojflags\n'+e)}
}
}catch(e){GM_log('nobody\n'+e); }