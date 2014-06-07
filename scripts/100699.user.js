// ==UserScript==
// @name           musicmp3 tempfile download autostart
// @namespace   tempfile.musicmp3.spb.ru
// @description   механизация закачки треков с сайта musicmp3.spb.ru
// @author         trespassersW
// @include        http://tempfile.ru/file/*
// @include        http://musicmp3spb.org/a*
/**/
// ==/UserScript==
//http://userscripts.org/scripts/show/100699
//location.href = "javascript:(" + encodeURI(uneval(function() {
const zong='mmp3_zong_name';
if( location.href.indexOf("musicmp3spb.org/a")>0 ){       //окно списка песенок
/* подсветка еще-не и уже скачанных треков */
 var d=unsafeWindow.document.styleSheets[0]; // Ffuckin security
 d&&d.insertRule( 'a.Name{color: #04c !important}' ,0);
 d&&d.insertRule( 'a.Name:hover{color: #019 !important}' ,0);
 d&&d.insertRule( 'a.Name:visited{color: #c40 !important}' ,0);
 d&&d.insertRule( 'a.Name:visited:hover{color: #910 !important}' ,0);
/**/
  for( var i= document.links.length-1; i>= 0; i--){
   var L=document.links[i];
   L&&L.href && L.href.indexOf("download")>0 //&&( L.id = "l" )
   &&( L.target="_BLANK" );  //по клику на песню откроется новая вкладка
 }
}else{
if( location.href.indexOf("http://tempfile.ru/file/")==0        //окна закачки 
    &&document.styleSheets[0] //?  mysterious error in ff log
     ){ // 
   window.stop();
/**** прячем мусор с экрана *****/
    unsafeWindow.document.styleSheets[0].insertRule(
    'img,*[id^="cntMe"] ,*[id^="cntBa"],*[id^="cntLi"],*[id^="cntCo"],#cntMainLeft,#cntMainRight'
    +'{display:none !important}',0);
/**/    
//    var f=document.forms[1];
    var f= Xels('//input[@class="fMidi"]');
    var s="Скачать";
    if( f && f[0] && f[0].value.indexOf(s)==0 ){ //1st screen?
/* патчим шапку  */
    try{
    s = Xels('//div[@id="cntMainCenterText"]/h4/a')[0].textContent;
    document.title=s; GM_setValue(zong,s);
    var t=Xels('//div[@id="cntMainCenterText"]/h2')[0]; 
    t.textContent="Тихо! Работает Скрипт";
    }catch(e){GM_log("can't patch title\n"+e)};
/**/
    f[0].click();  //1st click
    }else{  //2nd screen?
    for( var i= document.links.length-1; i>= 0; i-- ){
      var L = document.links[i];
      if( L && L.href && L.href.indexOf("download")>0 ){
      var tit=GM_getValue(zong);
      var R=''+L.href;
	    if(tit){
	      document.title=tit; GM_deleteValue(zong);
        try{
          L.childNodes[0].textContent=tit;
        }catch(e){GM_log('? '+e)};
      }
      L.focus();
/* 13-07-09 */
      var t=document.getElementById("cntMainCenterText"); 
      if(t)try{
       var el = document.createElement('div');
       el.innerHTML = '<br><br><center>нажмите <b>Enter</b> для старта закачки</center>';
       t.appendChild(el)
      }catch(e){GM_log("cant't patch headers\n"+e)}; 
/**/
/**/    var tO=setTimeout('window.close()',14999); 
                        // вкладка закроется через 15 сек. Успеем?
/**/
/** / // not working in Ff bljad stsuko
var evt = unsafeWindow.document.createEvent("MouseEvents");
    evt.initMouseEvent('click', true,true,  //type, canBubble, cancelable
        unsafeWindow,                               //view, 
        0,  0,  0, 0, 0,                                //detail, screenX, screenY, clientX, clientY,  
        false,  true, false,    false,            //ctrlKey, altKey, shiftKey, metaKey, 
        0, null);                                          //button, relatedTarget)
//look: event occurs! what next? nothing..
     function clickHandler(evt)  {alert('handling click event');}
     L.addEventListener('click', clickHandler, false);
//old well known Ff bug. nothing has changed since 2007
GM_log('=== ref= '+L.href);
    if(!L.dispatchEvent(evt)){
          alert("canceled"); }// A handler called preventDefault 
/**/  // FlashGot suddenly refused to catch downloads in Ff 4.0.1
 /** /               open(L.href,'_blank'); //2nd click _self
/**/            break;
            }
        }
    }//for doc.links
}

}
function Xel(XPath, contextNode){
    var a = document.evaluate(XPath, (contextNode || document), 
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return (a.snapshotLength ? a.snapshotItem(0) : null);
};

function Xels(XPath, contextNode){
    var ret=[], i=0;
    var a = document.evaluate(XPath, (contextNode || document), 
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    while(a.snapshotItem(i))
      ret.push(a.snapshotItem(i++));
    return ret;
};

//})) + ")();";

