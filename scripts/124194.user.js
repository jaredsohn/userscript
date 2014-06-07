// ==UserScript==
// @name           Kaskus Mobile Quick Reply
// @namespace      http://userscripts.org/scripts/show/91051
// @description    Provide Quick Reply on Kaskus Mobile
// @author         idx (http://userscripts.org/users/idx)
// @version        0.3.4
// @dtversion      110407034
// @timestamp      1302188340771
// @include        http://m.kaskus.us/*
// @include        http://opera.kaskus.us/*
// @license        (CC) by-nc-sa 3.0
//
// -!--latestupdate
//
// v0.3.4 - 2011-04-07
//  Fix always use native-XHR.
//
// -/!latestupdate---
// ==/UserScript==
/*
//
// v0.3.3 - 2011-02-18
//  Fix dump-redirect after editpost
//  Fix edit no-need capcay
//
// v0.3.2 - 2011-02-16
//  Fix adapting capcay-sys (kaskusDonat)
//
// v0.3.1 - 2011-02-15
//  Fix provide capcay
//  Add customed autogrow (use Module by Sophia.B, -iGoogle)
//  Improve some do_Parse RegEx
//  Convert main images to base64String
//  Deprecate resizer
//
// more...
//
// v0.1.1 - 2010-11-23
// Init
//------
//
// ###@@###
// *dependency            https://addons.mozilla.org/en-US/firefox/addon/59/
// *XML of User Agent     http://techpatterns.com/downloads/firefox/useragentswitcher.xml
//
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License
// http://creativecommons.org/licenses/by-nc-sa/3.0/deed.ms
// --------------------------------------------------------
*/
(function () {
 
var gvar=function(){};
 
gvar.sversion = 'v' + '0.3.4' + 'rey';
gvar.scriptMeta = {
  timestamp: 1302188340771 // version.timestamp
 
 ,scriptID: 91051 // script-Id
};
/*
javascript:window.alert(new Date().getTime());
*/
//========-=-=-=-=--=========
gvar.__DEBUG__ = false; // development debug
//========-=-=-=-=--=========
 
const OPTIONS_BOX = {
  KEY_SAVE_DelayPopupPicsTimeout:  ['500'] // Delay before popup show up
 ,KEY_SAVE_CallBackUri:           [''] // temporary referer uri
};
const GMSTORAGE_PATH = 'GM_';
const KS             = 'KEY_SAVE_';
 
function init(){
  
  gvar.domainstatic= 'http://'+'static.kaskus.us/';
  gvar.msgID= 'message'; 
  gvar.mode = 'qr';
 
  gvar.mode_qr = {
     'title':'Quick Reply'
    ,'action':'reply'
    ,'submit':'Submit Reply'
    ,'hash':''
  };
  gvar.mode_qe = {
     'title':'Quick Edit'
    ,'action':'editpost'
    ,'submit':'Save Changes'
    ,'hash':''
  }; 
   
  gvar.B = getBtn();
  // gvar initialized -
  gvar.hidePopupPicTimeout;
  gvar.showPopupPicTimeout;
  gvar.lastEdit_id;
 
  // preferences scratch
  gvar.prefs = {
     'PopupPosition' : 'auto'
    ,'DelayPopupPics' : '1'
  };
  // get saved preferences
  getPreferences();
   
  // inject CSS
  GM_addGlobalStyle( getCSS() );
   
  if( nogoLoc(location.href) ) return;
   
  // init load div layer for popup
  GM_addGlobalStyle( loadStyle() );
  loadPopup(); 
   
  // -- let's roll --
  start_Main();
  
} // end init()
 
// populate settings value
function getPreferences(){
  /**
  eg. gvar.prefs.msgheight
  */ 
  gvar.prefs = {
     DelayPopupPicsTimeout : getValue(KS+'DelayPopupPicsTimeout')
  };
}
 
function nogoLoc(loc){
    var ret=false;
    if(loc.indexOf('/visitormessage/')!=-1) // meet visitormessage
      ret = true;
    else if(loc.indexOf('/editpost/')!=-1){ // in or after editing
      var el = $D('//META[contains(@http-equiv, "refresh")]', null, true), cbUri=getValue(KS+'CallBackUri');
      if(el && cbUri.length){
        THREAD.window_stop();
        Dom.remove(el);
        setValue(KS+'CallBackUri','');
        document.body.innerHTML = '<div id="wrapper"><p align="center" style="font-size:15px">You are now being taken to the post or <a href="'+cbUri+'"><b>click here</b></a></p></div>';
        ret=location.href=cbUri;
      }
    }
    return ret;
}
 
function start_Main(){
    THREAD.init();
    if(THREAD.user===false) {
      if(location.hash=='#login'){
        var tgtusername = $D('.//input[@name="username"]', null, true);
        tgtusername.focus();
      }
      show_alert('User not logged in', 0);
     return; // dead end
    }
     
    // di dalem thread ato bukan?
    if( !THREAD.isInside ) return;
  
    // initialize QR
    QR.init();
}
 
// clean-up fetched post
function unescapeHtml(text){
   if(!text) return '';
   var temp = createEl('div',{},text);
   var cleanRet='';
   for(var i in temp.childNodes){
     if(typeof(temp.childNodes[i])!='object' || isUndefined(temp.childNodes[i].nodeValue)) continue;
     cleanRet += temp.childNodes[i].nodeValue;
   }
   temp.removeChild(temp.firstChild);
   return cleanRet;
}
function getBtn(){
  return {
     btn_max: ''
      +'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABnRSTlMAAAAAAABupgeRAAAAUklEQVR42mNkYGBwSDjAgBscWODAiF8F'
      +'BLAgc/bPt0eTdkw8yMDAwMRABGBC0wfRik8RVhvRFcFVoJnHRFAFAwMDNAjwqMDicKy+IyowGYmJFgC0SBv8eaPcgAAAAABJRU5ErkJggg=='
    ,loading_gif : ""
      +"data:image/gif;base64,R0lGODlhCwALALMIAEdHRyQkJGtra7Kyso+Pj9bW1gAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wA"
      +"wEAAAAh+QQFAAAIACwAAAAACwALAAAEJBBJaeYMs8pz6bYIVnFgKQEoMBVsYZoCQiADGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJGeYEs0pz6bYIV"
      +"nFgKQmoMB3sYZoEMiAFGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJCeYUs8pw6bYIVnFgKREoMRmsYZoDUiAHGMtSLd14Xs6WCAAh+QQFAAAIACwAA"
      +"AAACwALAAAEJBBJKeYks0pw6bYIVnFgKQ3oMAVsYJoFciAGGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJSeYcs0px6bYIVnFgKRVoMQEsYJoHYiABG"
      +"MtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJOeYss0py6bYIVnFgKR3oMQmsYJoGEiAAGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJWeY8s"
      +"8px6bYIVnFgKRmoMREsYZoBAiACGMtSLd14Xs6WCAAh+QQFAAAIACwAAAAACwALAAAEJBBJeeY0s8py6bYIVnFgKQVoMA3sYJoAIiAEGMtSLd14Xs6WCAA7"
    ,btn_maxmin: ''
      +'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAARCAIAAADrMp2hAAAABnRSTlMA/wDyAAASgmejAAAFNUlEQVR42pVXz2sdVRT+zpk781JJmmKxN'
      +'f4g4qroJsRKBaF2GYWCaG2xduMqgqCCFlKoLlQw0AoiCOYPcFEN4rJ/gMUu2qytaYUiIcY29ld8M+9l5nwu7r3zbpJWzHAZ5p337pn73e8737lPeBe73n6zuLHS7ffW6'
      +'xobLgEEIAGBEJAQk/BAEATgb+0D42xJchEMARER8XlgAIwG0JIUApCExPnkYEExvcSskJ07dWRn97sfZcfh10f7ZTkyup65jUAkogABYfImVZGAiATDq6xe/O3w0aPv3'
      +'/xVFRkgAidQUBUqUCEABxNs46oBQI0wCBs0EEBqgkRjqAFkbmrxlt38S4dHnN27M/bMs1dW/96chgLQb6iEDfd7RdAIMTNpt8eDh4DSX7ungAKqNIUCGUwUTiBAI8gev'
      +'PR0z/1HA0DUBAAzNYgBtcFMvIpqyk+PyKvY0yz94bh27+nx8Ss3V72G2DKKJn2FiGxgndzMOI0gBPXdOxA4QIUGZIBlyECBQaD/ycNWME1YsQJSU8xgQA2Q0gAkagOB7'
      +'x9yr/V6LlV5Ww7bv2ICcv3ummcyy2hiPq0qagQkvjjO69gCdvvJk1idsuWtkQSP1AYDGqAhjNqYNIAnyg8ROK8lCeshsH0wA2sggKZcyySs2AWbQKNwIGTgDgsju7/4/'
      +'CP/fOr0WTT1gm6ITP1zrd1howAw87oPqAwwomYATGZbaJftj8BMtIiy33R7VvZQlqhK9kr2S6lKVBXKwZgsl06dPuucc86dmZ1ZyPeemZ3xH0+dPjtZLaGq4iil10XVR'
      +'b9rvS6rLqsSVWVl1VQ9Vj2reuj2BdS2Brz/8QHX/+QIAM1gJjSQsAbW0BpagzDMj6k7i5Pl0smZ2TzP8zz/6suP/cPJmdnJcmnq9iIaoiEaQ2NsrJ0IMxhhREM27foME'
      +'LfJ3MNGq/YvXUy/2VSexf4XYBGhphWLLC+CHYMKU4EINOUy/vyV8rqofvDhZ998/amPvPveJ8/1ll8ur6PoDBYVsyugDK2FEDVk0EErLL2qpW1v4tGsX7o49+0cY+Pzx'
      +'EjSt6anp4vJAxscgEFpj794UOFbCjOFAireoEOGVNlDK+u4zaGhoUFk72MP730K0SokVkjoOYyl4pVt2hoAzv/iGJqzN1IKBx1XfNeOENq2KRscLOBrbTArCoUByCKMc'
      +'N8C5ofl6sJtzp+ba5HMn5s7cmwaWfPG2I524zS+Sdt3MgRpmvqplwhlcJrY5LZsORGkPXLgFZsqKisKLTqu6GjRyfKO5v5exJH7Mb/Sv7Bat0iOHJtu8VxYredXepo75'
      +'5y6PIvDuSLLw3B5J8s7WVFkReGKwuWFN89YuMlZaGj/genpd5K9j7+JFHX2H2gxJK1JAHSGhxFF5e8KXz8efZj1841bKZKDY8NHjk37iOfn+L4xn9MiOb4YvKgywAAyK'
      +'NDryaUkkBARkiDzyefTlYqIr4kYoIjyfm0p6wxJlFa7WxkgAzwAcOiJ0ZaNQ0+OHt/3qLo/04gb2tF2WE0gNRGJERa1F9paigPRhTk4LAcAhBAUEX9OFkhybEV6bPBgA'
      +'i1CjUWShRm+G+DExPiJiQ17cWJi/K2JNhBIUJ+bsfkCLpquAGqwRD9ucCZPK1rA0K+ZqEjJCC2yRTIpUQLUvABsIDCJzMhmK5P79qkknEVD81HPCSMhBoDqH1wAI7h87'
      +'fc9u0ZD02z/TERFMdAgbd2LSHwLB39WwGXi8uLVl64KRaR1BTJId/OyGQ29lTGTg0SijY1nTyHS43pKwr85IPRGJqtm5AAAAABJRU5ErkJggg=='
     
    ,blue_back: ''
      +'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHCA'
      +'gICAgICAgICD/2wBDAQcHBw0MDRgQEBgaFREVGiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAWAAEDAREAAhEBAxEB/'
      +'8QAFgAAAwAAAAAAAAAAAAAAAAAAAwUG/8QAGBAAAwEBAAAAAAAAAAAAAAAAAAIUFWH/xAAXAQADAQAAAAAAAAAAAAAAAAADBAYH/8QAFhEBAQEAAAAAAAAAAAAAAAAAABI'
      +'R/9oADAMBAAIRAxEAPwAdSmh0l8T2j0TseSChhShsf//Z'
    ,btn_qr: ''
      +'data:image/gif;base64,R0lGODlhGQAWAPf/AMDAyb2+xqirrLq8vLe2sn2KpYJ8fOO8k4WRq2h9oVtymlxti6mLeNK1nD1Sdebn64uSm2B1meHi6XONvKKjo66xs2q'
      +'GtJKaosWihZeTktHR3cyoipaSjWV6nnuDlGFzkm2BpPT09snI0L/Fx7a4u+Li5Vdtlf7TquzEm9TU23SJrGt7nP39/VpnfHuRtnWFod3d4srO0PHy9HJ8jkFVeayfke/u8'
      +'XiQuoyXsOLj4llphtra4b6cfsyrk1ZMSc7OzmVxgouGgvr6+qKiqLGzuHN3fq2yuM7P12J9rcnJ1erq8YiUrE9jhtXW1tPV2W2Aos7Q1cbGznWCm+fm57ychn6Vvklegm+'
      +'Gru/x8u7u7lVqjt7e3niGo6Khna+SeDlMa8nKzXmOsvL09PHx8zlNccXIysfHzcLCx4GaxX6Vu6y0xvj4+a2tsaepr/Du74KEitPU3MvM1cXFzcPEzW+EqaSkqltpgZKTm'
      +'P////7+/s/Q2VtwlPT0/sfH0vPz/cXGzvn5/P7//1ZnhKenrIaBgMC/wayvtd24mKqOgsbL23ySt+jp6Ovs7tDT1pCWn8zM1Ly+wcrL2ZKetdXW4NDO1uXn8//+/+rs+O7'
      +'Govv7+05gf8TGyv7//mJvgLW90OPj6+Tl6KSvw3qFm8Ohi9HS2vj3+vPLpoiCf2N/sebm79XW3J+qwIyLhoqJj8yzmF54pHiBjry+w8bJ0bu8xn5wb3eMsF5thOrq9P79/'
      +'2aArNjc62dsdqCEbtOwlYuVofDw+vb3+aWsvUdUakVafpmZnMLCzH2In9nb52h2kcTDzN3d5sTDy2dhXm97iWBxjuvq7JZ9aZB9d9DR0Gl5l5CVoJmcoqKlqWNYVVxrguP'
      +'An0VWcoCKlHGGqpOVmJqkuJWXnLCNbsTGzZSVmrSWfGt/o2uApcvL0nR6g2uCq22DqL+hgvDw8Ozs9vDz8vLz87eXgFZohmaDuNrb39rc32J3m8LI2ICOqcbM3DFGajdIZ'
      +'aursVFmisHBwV1TUby8w/X1/yH5BAEAAP8ALAAAAAAZABYAQAj/AP+lIlKiEZgyZSCRIEGkQgVIA5Tx+edHlaEoO26tshABCh4zlJZF8RfuDJ5FtDBl60HlHAg0E5C88Ja'
      +'AnA48IZJoiJSh25ApeIIGbUEvwh4tVpD9Y0cNz7MSU2zYcBNiTSahsK5tQIFhHK83ABDQAdEMDzBQoFRBmcPhTatC61jMUKFIkYsw6XT8WzHsC4SgWaQ1IQEBiLB8X744c'
      +'ECjsQMyl/59sobnzqAhbOoI3QzgFxQfGA7wABdEVzwTeEolA/DnSAAAAcwBkMeKgasidpzRe4UkFI4rHS7gATCrmBkYMHYMQHSiV41dH1RUqXIDnbMl5EDYwiMhThw9ejL'
      +'c/xnSJoA+PCOic6NDbo+Oeh06wHMSlAUBCj+ybA7qi4kVGo8t8Y8EAuAhAx6B4JHHfkE9QhEcPnhRAwUA/KNEG3iwoQ8xcQzxzRnVxCKUEbL0s8EB6ngBzR3/lKPAZpzkk'
      +'UkIY2DxwBhrMEMFChvwwAA2WhzjiQUKtBOCHOYEIEchJRwhwh8CRHPCIRu8I8UNE6CyhCQW0GMEHiKoksIjURxBBCNB9GBKL6MU8YELaNyQyzQIXJHANniwENSCeLgTTQN'
      +'dDNCEHXSlkYYL6SyAAAhPAIFHCgAc0QcpmxhQxxaZiIHHBU+EEUYtKnQgCA413aREH3BMMgch4oDhhiVBhVywQDnkdBDBPguo0UECOqwDiAafPHAKP1vouVknC2jhHw1SV'
      +'BJBBJp8iUcOXfyQgxBB4RIDBC1oA+Bj+KjxDx/3BOPIPBd4MMMMHohiTAH2FFAAF1y8QK89ifwTEAA7'
    ,btn_edit: ''
      +'data:image/gif;base64,R0lGODlhRgAWAPcAAHiY0HqVxP///yozeIKOoZOds+np7bS2uZGr2aKru3SLs2d8oL3AynaDoamzyFxsieTm8g0akry+wlxxlUxhhYWRqpmmv'
      +'Wl1hFlky4Kdy42s4WyCpqyts4up3Wl9oeTl62R5nfj4+j1SdXWVzJqhrc7R20lZmLzA2t/h5TpOcOnq9YyaswoUaGB1mYmVq4Og0nmOskVafjRJbSs4sp26656qwl55qHmWy'
      +'eHi53GGqiczjpSivIadx8PEzHaLr32Ko3WOunSSxcnJ0cXJzHOSynF2koWj2FltkZey5Imk08zP1IKJltXa5IiQmc3Q1tzd4aOnrEFWenqSu4aRpdjZ3nuFmiY1z9HT2Uleg'
      +'hcp0HqRuWl6mRgmrHyRtl90mG+EqLC4ylJhe1Vul1Rkghov96uxutHS1vb292WCs2uGtoCe0ufp9MHBxlFlilVpjp2ksHyazThDiLe6v8vN2hskbwkTefHy9IiRopakvXOAn'
      +'8jK1WV/qtLW3u3u+IqYsPf4+VpqnGN0lJCu4tTV3GR4mUddhKGotW6Fvvz8/PT198nMz+3t75iz5XuSuKCltYim2neUxsrN0rm9yVlogxQeePDx8oagzfr6+4SWtHiGo22Mw'
      +'3GIsXGPwlhngpWZo/Pz/RAfrxIbaWaEuGWArV92nVpij1ZohWyErm99lm6Dp26BowYPWllxmmZ4l/Hx++fo6Y+Wn3+XwH2UunWRv36Jm0NWdwUPZmuApPT0/mN4nOvs987S4'
      +'JSiu3SIq5yowM3O0kpRg1p0nmZsmKutur/H14CMp9fY3pOftiY486C972F+sH+Yw01co0xcirO2wJigrHWBjkhZekVMe01abg4dwI2cuLfAz3d/iszM1Gd+qMzL0unp8neMs'
      +'Ozs9t7g66SuwEJQil1wkEVfi+/w+khQiFZmmV1jll1lm2h0kHqUwJSw33uTvBUhgjNCuWp/o9HS3NXU2pKhu5GhvUxhlIyXr/P09fTz9lNluF57r3KHq0NPhY+VqZCZrWiCr'
      +'lhxnfX1/yH5BAEAAP8ALAAAAABGABYAQAj/AP8JhHDAjBlFQ4awkSBBzoEDciS8cyWwosWLGDNq3IgRF6lRaIKVuQTvirZfPYSwQfQqTp06uWbNOmKrDqB0OAPoTKelmh8/K'
      +'1bIS2fJUpIMDphYS0qMh1ME6hghUYfgaAAgaUbZCDbP2ppwuUAsMEUl0Zx3JeYM+oUikYC3AvQhW6DDRKovePGmclcBLtxOkt7WcyLAyRsBJUyVgZtggpcJE44ccdOGQowoM'
      +'vhV7AMF0aInHwwYcMSChS1yKATAKlCjdQ1fsH1ZmE3bAh7beHLrxrOjNy/fvYPvtuDrG5g5uio2XrDBw4VEA1aVDkVnwIA4wEqZiwCKi4nvgHp1/xk/nltfv3wIvCXwYLGSw'
      +'07CvKXVKgcM8l1gcPORasGRGGMItMsWbdRyjV+vSADLBdOkkIIItcSABRYmUGDhhRhOqKGGhcTg4YceRiHiiCSKKMKJKaDyiUUQQCHAARxw4Akdwkhyhl8cbMPRjjz2eBET+'
      +'IgixhMhqNSDMSkNQ0cdLAzwTBpwwKHGlGoYYcQjWHagpQZcdimIIBp8KeaXXGqJ5SNGvKAGHCMEwYkmh4iCzzH/EENKNqeA0ERhPaRkzBPG2PNWJTqw08sXEWyyznXrrCNFo'
      +'wq48NYbBEyxQg5f+PFNAnIUhsoUP1TxliF+YLJOLKg6CoQCp2TDSiGogP8xAQgeeDAJIgbosc8AdUTgq6+gHILDJKAw48OxyCL7xRTzBbJFIIYUFk4r0SpBQmHyCUCAKjl0i'
      +'2kqt3gAghdHUCDCA/9Y0EIuuZjCgV/w+lVGFvdMQE05Hrjjzi0b9LtBKgDfpVe4/LrjwQIgtPAYZRdiEWIUKDoYzYoCffCuHZf8oXG8AsjRjY8gh6xRN++yEeMQRdhiywBVX'
      +'PIWB970IbMuuqhg880qrJHzGjxD0DMEQAct9NBB86wLRRlZk40blcB1CSJnSEJJaXQ84UIaAGSt9dZcZz0CACOELbbYRJRNxAhmp532m2lgUlEFaKDByhBFaiMBNmzggI0zv'
      +'Nb/UcoeQUACCRBA3BCllGq8oHgGGbyQRBIdCKIOEowwUhUCmKtDQzLJ0OA5DYwI8sgLN3CShijK2CDGON4EM8oppDyDCDZmXOGEEFcwgIMAi7jUzKq2zANIBPngZDwQK8S7S'
      +'SxSAPHFNwJcYQEf1njwVjyx8FCUJRkskw4Qm/Rjgz/iuOCAF9n0B80fehiDwgeL1BNCCAY0/cQq1VESBzihDCBFI11oRCO4ISkBUGoKFdgCA+DlhGhd4Qp+AQMMZEFBAcJAA'
      +'TnwwAQK8YBvTGAB4XqAALAhDVuU5oQnjMAMuNAOGLjwhTDsBbMMOAUX/CBaTmiFKhIgAGshphNvmUIv/2C4n17kIxUe8IIbojCGEhwhFwuw1SLscRY9kOAcM5iBFTBwgrd0I'
      +'gugMEEvcpCPMppRFeoRgDMcYYgEoGJStFCCACLxDGy9hQSmyEQUDwaCXJDLDZZJ0T+2EBYQmGIIfxgEDhYRAo4JAB1kuMUWIuCFW1jyku4gRDgewMkHhIMQgUAFezYZDlKSC'
      +'x1VqMID3ECZylBgQpcRgQz08A8VhENhY4CFIwVgB0UsqBNtIAMZrFDIBRjzmHzsI7taoLDHRIaVrnTYZSB2oojJ4JoFuAgEGOCJX0ChCUtYwh32wY8CFOAY6DTnCujBThe4s'
      +'wLwrEAx5knPH/wgE/hsgD71mROHfvrzn3nQZyaKQY8E7EIguAgIADs%3D'
  };
}
function getTPL(){
   return (''
    +'<div id="back_layer" class="trfade"></div>'
    +'<div id="main_cont">'
     +'<div class="main_head"><span id="modetitle">'+gvar.mode_qr.title+'</span> ' +HtmlUnicodeDecode('&#8212;') +' <a class="link" href="http:/'+'/userscripts.org/scripts/show/'+gvar.scriptMeta.scriptID.toString()+'/" target="_blank">'+ gvar.sversion + '</a>'
      +'<div id="par_qr_close">'
       +'<a id="qr_min" href="javascript:;" title="Minimize"><span class="mInner">&nbsp;</span></a>'
       +'<a id="qr_close" href="javascript:;" title="Close"><span class="cInner">&nbsp;</span></a>'
      +'</div>'
     +'</div>'
 
     +'<div id="main_content" class="fade">\n'
       +'<form id="frmQR" method="post" action="/'+(gvar.mode=='qr' ? gvar.mode_qr.action : gvar.mode_qe.action)+'/'+THREAD.id+'">'
       +'<div class="spacer"></div>'
       +'<div id="login_as">Logged in as <a href="/user/profile/'+THREAD.user.id+'" target="_blank"><b id="login_username">'+THREAD.user.name+'</b></a></div>'
       +'<a id="title_add" href="javascript:;">[+] Title</a>:'
       +'<div id="title_cont" style="display:none;">'
       +  '<div class="spacer"></div><input id="title" name="title" class="field" value="" type="text" /><div class="spacer"></div>'
       +'</div>'
       +'&nbsp;Message:&nbsp;<a id="message_clear" href="javascript:;" title="Clear Message">reset</a>'
       +'<div id="message_container"><textarea id="'+gvar.msgID+'" name="message" class="field"></textarea></div>'
        
       +'<div id="reason_edit" title="Reason for Editing"></div>'
       +'<div id="submit_cont" style="padding:1px 0 8px 0;">'
        + '<div id="capcay_cont" style="float:left;margin:0 0 0 10px;">'
        +   'capcay:<div id="capcay_img" style="display:inline-block;vertical-align:middle;"></div>' + HtmlUnicodeDecode('&#187;')
        +   '<input id="captcha" name="captcha" maxlength="3" size="4" type="text" class="field rb" style="width:100px;" autocomplete="off" />&nbsp;'
        + '</div>'
        + '<input name="reply" value="Submit Reply" type="submit" style="position:absolute;left:-999999px;display:none;" />'
        + '<input id="btnsubmit" class="button" value="Submit Reply" type="button" style="margin-left:-100px;"/>'
         
        + (gvar.__DEBUG__ ? '<div style="clear:both;"><input type="text" style="width:60%;" title="qr-action; Mode:'+gvar.mode+'" id="thisAct" value="/'+(gvar.mode=='qr' ? gvar.mode_qr.action : gvar.mode_qe.action)+'/'+THREAD.id+'" />':'')
        + '<input '+(gvar.__DEBUG__ ? 'type="text" style="width:60%;"':'type="hidden"')+' name="threadid" title="threadid" value="'+THREAD.id+'" />'
        + '<input '+(gvar.__DEBUG__ ? 'type="text" style="width:60%;"':'type="hidden"')+' name="hash" id="hash" title="hash" value="'+(gvar.mode=='qr' ? gvar.mode_qr.hash : gvar.mode_qe.hash)+'" />'
        + (gvar.__DEBUG__ ? '</div>':'')
         
       +'</div>' // #submit_cont
       +'</form>\n'
     +'</div>' // #main_content
    +'</div>' // #main_cont   
   );
}
/**
Snippet from FFixer.
FFixer is Copyright (c) 2010, Vaughan Chandler
*/
function showPopupPic(e){
   var t=e.target||e;  
   if( !(t.tagName=='A' || t.tagName=='IMG') ) { return; }
    
   var oldSrc, newSrc, profileLink;
   if (t.tagName == 'A') { oldSrc = t.href + '#1'; }
   if (t.tagName == 'IMG') { oldSrc = t.parentNode.href + '#1'; }
    
   // mouseover on popup it self
   if( oldSrc && oldSrc.indexOf('#1#1')!=-1 ) { return; }
    
   if (oldSrc || newSrc) {
        if (!newSrc) {
           //newSrc = oldSrc.replace(/_thumb\./, ".");
           newSrc = oldSrc.replace(/\#\d/,'');
        }
         // need some condition ? later...       
        window.clearTimeout(gvar.hidePopupPicTimeout);
        Dom.remEv(t, 'mouseout', function(e){hidePopupPic(e)});
        Dom.Ev(t, 'mouseout', function(e){hidePopupPic(e)});
        //if (t.parentNode.href) { profileLink = '#'; }
                   
        gvar.showPopupPicTimeout = window.setTimeout(function(){
          $D('#kf-popup-pic-image').innerHTML = '<a href="' + newSrc + '" target="_blank"><img id="" src="' + newSrc + '" alt="Kaskus QR-Mobile - Loading Pic.." style="max-height:' + (window.innerHeight-35) + 'px;"/></a>';
          $D('#kf-popup-pic-div').style.display = 'block';
          $D('#kf-popup-pic-div').className = 'kpfPopup kf-popup-pic-div-' + (gvar.prefs['PopupPosition'] == 'auto' ? (e.pageX>document.body.clientWidth/2 ? 'left' : 'right') : gvar.prefs['PopupPosition']);
        }, gvar.prefs['DelayPopupPics'] ? gvar.prefs['DelayPopupPicsTimeout'] : 0);
   }
}
function loadPopup(){
  var el = createEl('div', {id:'kf-popup-pic-div', 'class':'kpfPopup kf-popup-pic-div-'}, '<div id="kf-popup-pic-close" title="close">x</div><div id="kf-popup-pic-image"><span></span></div>');
  try{
    Dom.add(el, document.body);
    Dom.Ev($D('#kf-popup-pic-close'), 'click',  function(){ $D('#kf-popup-pic-div').style.display='none'; });
  }catch(x){
    var kpDivAdder = setInterval(function() {
        try {
            Dom.add(el, document.body.lastChild.nextSibling);
            Dom.Ev($D('#kf-popup-pic-close'), 'click',  function(){ $D('#kf-popup-pic-div').style.display='none'; });
            if ($D('#kf-popup-pic-div')) { clearInterval(kpDivAdder); }
        } catch(x2) { clog('CSS', x);  }
    }, 100);
  }
  Dom.Ev($D('#kf-popup-pic-div'), 'mouseover', function(e) { clearTimeout(gvar.hidePopupPicTimeout); } );
   
  Dom.Ev($D('#kf-popup-pic-div'), 'mouseout', function(e) {
    var r = e.relatedTarget;
    show_alert('e'+e.tagName);
    show_alert('relatedTarget'+r.tagName);
    if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
        while (r.parentNode && r.id!='kf-popup-pic-div') { r = r.parentNode; }
        if (r.id!='kf-popup-pic-div') { $D('#kf-popup-pic-div').style.display = 'none'; }
    }
  }, false);
}
function hidePopupPic(e) {
    if (gvar.prefs['DelayPopupPics']) { window.clearTimeout(gvar.showPopupPicTimeout); }
    if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
        gvar.hidePopupPicTimeout = window.setTimeout(function() { $D('#kf-popup-pic-div').style.display = 'none'; }, 300);
    }
}
function loadStyle(){ 
  return(
     '\n\n'
    +'.kpfPopup { padding:10px; background:#f6f6f6; border:3px double #666666; -moz-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px; border-radius:5px; }'
    +'.kpfPopupContainer { display:none; top:0; right:0; bottom:0; left:0; }'
    +'#kf-popup-pic-div { display:none; background:white; border:1px solid #333; position:fixed !important; top:3px !important; padding:4px; min-width:130px; z-index:99999 !important; -moz-border-radius:3px; -webkit-border-radius:3px; -khtml-border-radius:3px; border-radius:3px; }'
    +'.kf-popup-pic-div-left { left:3px !important; right:auto !important; -moz-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:5px 5px 5px rgba(0,0,0,0.6); box-shadow:5px 5px 5px rgba(0,0,0,0.6); }'
    +'.kf-popup-pic-div-right { right:3px !important; left:auto !important; -moz-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -webkit-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); -khtml-box-shadow:-5px 5px 5px rgba(0,0,0,0.6); box-shadow:-5px 5px 5px rgba(0,0,0,0.6); }'
    +'#kf-popup-pic-div img { max-height: ' + (window.innerHeight-35) + 'px; }'
    +'#kf-popup-pic-close { display:none; position:absolute; top:4px; right:10px; color:#ff9999; cursor:pointer; font-weight:bold; font-size:14px; }'
    +'#kf-popup-pic-div:hover #kf-popup-pic-close { display:block; }'
    +'#kf-popup-pic-close:hover { color:#aa6666; }'
    +'#kf-popup-pic-image { text-align:center; }'
    +'#kf-popup-pic-image img { color:#999999; display:block; }'
  );
}  // end loadStyle
 
function getCSS(additional){
    return (''
    +'.header1, .tracking {font-size:9pt;font-weight:bold !important;}'
    +'.tracking a{font-size:8pt !important; color:#DBD7DF !important;font-weight:normal !important;}'
    +'.tracking a:hover{color:#000 !important;}'
    +'.poster{margin-bottom:2px;}'
    +'.post, #forum, #profile, #postreply {background-color:#F5F5FF; padding:1px;}'
    +'.post{border:1px solid #D1D1E1; border-left:0; border-right:0; }'
    +'#forum, #profile, #postreply {border:1px solid #0000C6; }'
    +'.post strong {margin-top:-7px;}'
    +'.post hr {margin-top:2px;border:0; border-top:1px solid #D1D1E1;}'
    +'.left, .right{color:#fff;margin:1px 0 !important;}'
    +'.poster .right{margin:0 !important;}'
    +'.right{margin-right:5px !important;}'
    +'.transp_me{color:transparent;}'  
    +'#fetching_quote{display:inline; padding:0; margin-left:3px; line-height:22px;}'
    +'.left a{font-weight:bold;color:#FFB56A;}'
    +'.rb{font-weight:bold;color:red;}'
     
    +'.post blockquote, .post .code {border-style: solid !important; border-width:2px 1px 1px 3px !important; '
      +'border-color: #CCFFBB #99DD99 #99DD99 #CCFFBB !important; max-width:none !important; overflow-x:auto !important; '
      +'background: #DDFFDD !important; color:#0099cc; font-size:8pt;'//#3E3E3E //0099cc
      +'padding:3px 10px !important; margin: 7px 1px 0 1px !important;'
    +'}'
    +'.post .code {color:#191919 !important;}'
    +'.post .posted_by, .post .tcode {color:#000 !important; font-family: verdana, arial;}'
    +'.post .tcode {margin:5px 0 -7px 10px;}'
    +'.post .posted_by {margin:5px 0 1px 0;}'
    +'.current_edit {background-color:#FFDFFF;}'
 
    +'/* ------ */'
 
    +'.paging a:hover{background:#ff9933;color:#FFF;}'
    +'.paging a, .paging strong{background:#0569cd; padding:2px 2px;color:#FFF; }'
    +'.paging strong{background:#ff9933;padding:2px 3px; }'
    +'/* ------ */'
    +'#qr_container, #qrfixed_thumb {position:fixed;bottom:0;width:100%;}'
    +'#qrfixed_thumb { z-index:99990; left:43%; }'   
     
    +'.trfade {position:fixed; width:100%; height:100%; left:0; background:#000; z-index:99990; filter:alpha(opacity=25); opacity:.25; }'
    +'#main_cont{float:right; width:50%;  padding:0;margin:5px 15px 0 0;}'
     
    +'.main_head {background-color:#588DC2; padding:4px 0 0 10px; height:20px; border:1px solid #0054A8;border-bottom:0; -moz-border-radius:5px 5px 0 0;}'
    +'.main_head, .main_head a.link {font-weight:bold; color:#fff; font-size:12px;}'
    +'.main_head a.link {text-decoration:underline;}'
    +'.main_head a.link:hover {color:#000;}'
     
    +'.fixed_thumb {width:130px; cursor:pointer; text-align:center; padding-right:10px !important;}'
     
    +'#par_qr_close {text-align:right;float:right; z-index:99990;margin:5px 10px 0 0; width:88px;}'
         
    +'#qr_max {background:url("'+gvar.B.btn_max+'") no-repeat scroll 1px 1px transparent; padding-left:20px; color:#3A3A3A;}'
    +'#qrfixed_thumb:hover a, #qr_max:hover, .fade a:hover { color:#000; }'
    +'#stat_qrcontent { font-weight:bold; }'   
     
    +'#qr_min, #qr_close {background:url("'+gvar.B.btn_maxmin+'") repeat-x scroll; text-decoration:none; }'
    +'#qr_min span, #qr_close span { display: inline-block; position: relative; }' 
    +'#qr_min  {background-position:0 0; }'
    +'#qr_close  {background-position:-25px 0; }'
    +'span.mInner {width:25px; }'
    +'span.cInner {width:43px}'
         
    +'.fade, .main_head { position:relative; z-index:99990;  }'
    +'.fade { position:relative; padding:1px 5px; color:#000; background:#CCE4FD; z-index:99990; filter:alpha(opacity=87); opacity:.87; border:1px solid #0054A8; border-top:0; }'
    +'.fade a{color:#753A00;}'   
    +'.fade input[type="text"], .fade textarea {width:99%;}'
    +'.fade textarea {min-height:75px; }'
    +'.field {border:1px dashed #FCDAA7;margin-top:3px;}'
    +'.field{verdana,arial,helvetica,sans-serif;font-size:12px;}'
    +'.field:focus {background-color:#FFFFA4;border:1px solid #FBC779;}'
     
    +'#login_as {float:right;margin-right:5px;}'
    +'#submit_cont {text-align:center;}'   
    +'.button {margin:2px 0;}'
    +'.spacer {height:2px;}'
    +'.imgthumb:hover {background-color:#80FF80 !important;}'
     
    +'.imgthumb {line-height:20px;padding:2px;padding-left:28px;background:#DDFFDD url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAUCAIAAAD3FQHqAAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMAAAsTAAALEwEAmpwYAAADHUlEQVR42qWUW28bVRDH/7M+Xu+uL3VcJzGlkYAWmVZKZKkS5fLQJ5CQ+gnyGSueIvFAJSoI9KFKWglQSFpCoMjxJb6u1157d2Z4WKd2kpdWnPNw5vzn6HdmRnMOPfr20dbWFv732NnZMbVarbJWUdWr7qvisvLGVlVjTLVaNQCY+fsnvwz9MVHig6qqqojI+SLJ0HNjSbn9wfvffPUAgEnYx6/bJ/41iyiVUicTsegosKLYYhYWi0ViJpZkS8wLIxYh/JtA5ixjUoWsk0nrZjXYvO2xyN7B6MUf2VkEYWURFmUWFmURXlJENGX5F1mWlXXSldXxl7X19ZX70Djv7Xb7QbPjJZkwK4uKzHEii23KCi6wLAuunS7k4GUKBAMynpMr5ifB2BZRUT0vkLLI4PVeprCRyl2PWZgV0AVLVS1C1kmHYe60c2IbVxCfnjWiqJj3FixVFdFu/dCQtA8fv7f5MOsWAFhKRLQUF5Hn2oD9+0ur1TlURatTNpaXc1VUVZGwJsGwfvR07cN7k8DvnzyrfvoQgBlZl1iadWwQSEtnnRUFCMi5UMz7QxUx8/6T7/xh/+7q2p/AxG+XCi6AcHKJBXiOudiXi6mKKOLjg71W/S8ABjGAGxsfFbIZAFGKLMta1Kt51vu78xtAy12dhDOdRWEYxdHEb/6aya4BePbzY2Pn+mH+hx+fA7i1OiUiIprHEoZhN+zjTeMDzDKL4uksTt6KcDyaOZPAB9QYN2YzabXzRSIiub6Uo6oGQdDszpLCMAuzyNUXagqWa48G7TgY5ovrzdN/Op3WSvkmywoRQXXOGg79eiN6m/+A7DzEOmvVb94oG2LXIyeTbjQbjUZjnuMsigaDwTt8MZT5+kHts3t3p9PpYDDY3f3p6OilAUBEpLGDd2IhDEfhJOz3+91u1806dz65Q6+OX5VL5aHvC0tSQiICgUBLRqJe8D1/sTceTTrdjkmnPr//xf7+vhmPx/G12PPc8/soWS7HQZelXq/X7/XXK5Xqx9VSqbS9vT0/cXB4YKdtFn7LFEVkHAQrxZLjOHEcb2xsAPgPkT44D3rdTkkAAAAASUVORK5CYII=) no-repeat !important; color:#000 !important;}'
    +'.poster, .header1, .tracking {background:#294D8B url('
      +gvar.B.blue_back
    +') repeat-x !important; color:#fff !important;}'
 
   );
}
 
 
// static routine
function isDefined(x) { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function isString(x) { return (typeof(x)!='object' && typeof(x)!='function'); }
function trimStr(x) { return (typeof(x)=='string' && x ? x.replace(/^\s+|\s+$/g,"") : '') };
function getAbsoluteTop(element) {
  var AbsTop=0;
  while (element) { AbsTop=AbsTop+element.offsetTop; element=element.offsetParent; }
  return(AbsTop);
}
function GetHeight(){
  var y = 0;
  if (self.innerHeight){ // FF; Opera; Chrome
     y = self.innerHeight;
  } else if (document.documentElement && document.documentElement.clientHeight){
     y = document.documentElement.clientHeight;
  } else if (document.body){
     y = document.body.clientHeight;
  }
  return y;
};
function do_an_e(A) {
  A.stopPropagation();
  A.preventDefault();
  return A;
};
function getTag(name, parent){
   var ret = (typeof(parent)!='object' ? document.getElementsByTagName(name) : parent.getElementsByTagName(name) );
   return (isDefined(ret[0]) ? ret : false);
}
function showhide(obj, show){
   if(isUndefined(obj)) return;
   if(isUndefined(show)) show = (obj.style.display=='none'); // toggle mode
   obj.setAttribute('style','display:'+ (show ? '':'none') );
};
function addClass(cName, Obj){
   if(cName=="") return;
   var neocls = (Obj.className ? Obj.className : '');
   if(neocls.indexOf(cName)!=-1) return;
   neocls+=(neocls!=''?' ':'')+cName;
   Obj.setAttribute('class', neocls);
}
function removeClass(cName, Obj){
   if(cName=="") return;
   var neocls = (Obj.className ? Obj.className : '');
   neocls = trimStr ( neocls.replace(cName,"") ); // replace and trim
   Obj.setAttribute('class', neocls);
}
function getValue(key) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_getValue(key,data[0]));
}
function setValue(key, value) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_setValue(key,value));
}
function getByXPath_containing(xp, par, contain){
   if(!par) par = document;
   if(typeof(contain)!='string') return;
   var rets=[];
   var ev = document.evaluate(xp, par, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   if(ev.snapshotLength)
      for(var i=0;i<ev.snapshotLength;i++)
        if(ev.snapshotItem(i).innerHTML.indexOf(contain)!=-1)
           rets.push(ev.snapshotItem(i));
   return rets;
}
function createEl(type, attrArray, html){
  var node = document.createElement(type);
  for (var attr in attrArray)
    if (attrArray.hasOwnProperty(attr))
     node.setAttribute(attr, attrArray[attr]);
  if(html) node.innerHTML = html;
    return node;
}
function createTextEl(txt){
   return document.createTextNode(txt);
}
function HtmlUnicodeDecode(a){
 var b="";if(a==null){return(b)}
 var l=a.length;
 for(var i=0;i<l;i++){
  var c=a.charAt(i);
  if(c=='&'){
    var d=a.indexOf(';',i+1);
    if(d>0){
      var e=a.substring(i+1,d);
      if(e.length>1&&e.charAt(0)=='#'){
        e=e.substring(1);
        if(e.charAt(0).toLowerCase()=='x'){c=String.fromCharCode(parseInt('0'+e))}else{c=String.fromCharCode(parseInt(e))}
      }else{
        switch(e){case"nbsp":c=String.fromCharCode(160)}
      }i=d;
    }
  }b+=c;
 }return b;
};
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
 
 
//========= Global Var Init ====
var GM_XHR = {
   uri:null,
   returned:null,
   cached:false,
   request: function(cdata,met,callback){
     if(!GM_XHR.uri) return;
     met=(isDefined(met) && met ? met:'GET');
     cdata=(isDefined(cdata) && cdata ? cdata:null);
     if(typeof(callback)!='function') callback=null;
     var pReq_xhr ={
         method:met,
         url:GM_XHR.uri + (GM_XHR.cached ? '':(GM_XHR.uri.indexOf('?')==-1?'?':'&rnd=') + Math.random().toString().replace('0.','')),
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         data:(isString(cdata) ? cdata : ''),
         onload: function(ret) {
           var rets=ret;
           if(callback!=null)
              callback(rets);
           else
              GM_XHR.returned = rets;
         }
     };
     //GM_xmlhttpRequest( );
     // try always use this native-XHR, incase supporting multifox
     NAT_xmlhttpRequest( pReq_xhr );   
   }
};
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
var Dom= {
   g: function(el) {
    if(!el) return false;
    return ( isString(el) ? document.getElementById(el) : el );
   },
   add: function(el, dest) {
     var el = this.g(el);
     var dest = this.g(dest);
     if(el && dest) dest.appendChild(el);
   },
   remove: function(el) {
     var el = this.g(el);
     if(el && el.parentNode)
       el.parentNode.removeChild(el);
   },
   Ev: function() {    
     if (window.addEventListener) {
       return function(el, type, fn, phase) {
         phase=(phase ? phase : false);
         if(typeof(el)=='object')
          this.g(el).addEventListener(type, function(e){fn(e);}, phase);
       };
     }else if (window.attachEvent) {
       return function(el, type, fn) {
         var f = function() { fn.call(this.g(el), window.event); };
         this.g(el).attachEvent('on' + type, f);
       };
     }
   }(),
   remEv: function() {
    if (window.removeEventListener) {
      return function(el, type, fn, phase) {
        phase=(phase ? phase : false);
        if(typeof(el)=='object')
         this.g(el).removeEventListener(type, function(e){fn(e);}, phase);
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
 
var GM_addGlobalStyle=function(css, id) { // Redefine GM_addGlobalStyle with a better routine
   var sel=createEl('style',{type:'text/css'});
   if(isDefined(id) && isString(id)) sel.setAttribute('id', id);
   sel.appendChild(createTextEl(css));
   var hds = getTag('head');
   if(hds && hds.nodeName=='HEAD')
    window.setTimeout(function() { hds[0].appendChild(sel); }, 100);
   else
    document.body.insertBefore(sel,document.body.firstChild);
   return sel;
}
// ----my ge-debug--------
function show_alert(msg, force) {
   if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
   GM_log('('+arguments.callee.counter+') '+msg);
   if(force==0) { return; }
}
// ------
 
var QR = {
     property: function(){}
  
    ,msg: {
      addMsg: function(x){ $D(gvar.msgID).value+= x + (x!='' ? '\r\n'+'\r\n' : ''); }
     ,updCapcay: function(x){
        var el,un,pr;
        if(THREAD.user.isDonatur) {
          un=$D('login_username');
          if(un && un.innerHTML.indexOf('[$]')==-1)
            $D('login_username').innerHTML+='&nbsp;<b class="rb">[$]</b>';
          if($D('capcay_cont')) $D('capcay_cont').innerHTML='';
          if($D('btnsubmit')) $D('btnsubmit').style.setProperty('margin','0','');
          return;
        }
        pr=$D('capcay_img');
        if(pr){
           pr.innerHTML = ''; el = createEl('img', {src:x,border:"0",width:'200px'});
           Dom.add(el,pr);
           if($D('captcha')) $D('captcha').value='';
        }
      }
     ,title: function(x){
        $D('title_cont').style.display='';
        $D('title_add').innerHTML = '[-] Title';
        $D('title').value=x;
     }
     ,clear: function(){
       $D(gvar.msgID).value=$D('title').value='';
       $D(gvar.msgID).style.height='1px'; // min-height should be set before
       $D('title_cont').style.display='none';
       $D('title_add').innerHTML = '[+] Title';
     }
     ,focus: function(){ $D(gvar.msgID).focus(); }
     ,lastfocus: function (){
        var Obj = $D(gvar.msgID);
         var pos = Obj.value.length; // use the actual content
         if(Obj.setSelectionRange)    {
             QR.msg.focus();
             Obj.setSelectionRange(pos,pos);
         }
         QR.msg.focus();
         Obj.scrollTop = Obj.value.length;
      }
     ,setElastic: function(tid){
        if(isUndefined(tid)) tid=gvar.msgID;
        var max = parseInt( Math.round(GetHeight()*5/8) ),a=$D(tid);
        function setCols_Elastic(max){var a=$D(tid);a.setAttribute("cols",Math.floor(a.clientWidth/7)); setRows_Elastic(max)}
        function setRows_Elastic(max){var a=$D(tid),c=a.cols,b=a.value;b=b.replace(/\r\n?/,"\n");for(var d=2,e=0,f=0;f<b.length;f++){var g=b.charAt(f);e++;if(g=="\n"||e==c){d++;e=0}}a.setAttribute("rows",d);a.style.height=d*12+"px";a.style.setProperty('overflow',(max&&(d*12>max)? 'auto':'hidden'),''); }
        a.setAttribute('style','overflow:hidden;letter-spacing:0;line-height:12px;'+(max?'max-height:'+max+'px;':''));
        Dom.Ev(a,'keyup',function(){setCols_Elastic(max)}); Dom.Ev(a,'focus',function(){setCols_Elastic(max)});
        window.setTimeout(function(){setCols_Elastic(max)}, 250);
     }
    }
    ,init: function(){
      var el = createEl('div', {id:'qr_container','class':'qr_cont', style:'display:none;'}, getTPL() );
      Dom.add(el, document.body);
      var inner = '<div id="thumb_qr" class="main_head fixed_thumb"><a id="qr_max" title="Show Quick Reply" href="javascript:;">Quick Reply</a><span id="stat_qrcontent"></span></div>';
      var el = createEl('div', {id:'qrfixed_thumb', style:'display:;'}, inner );
      Dom.add(el, document.body);
      QR.event_tpl();
    }
 
    ,event_tpl: function(){
      // event title_add
      Dom.Ev($D('title_add'), 'click', function(e){
        e=e.target||e;
        var dsp=$D('title_cont').style.display;
        var tgt_focus = (dsp=='none' ? $D('title'):$D(gvar.msgID));
        var inner = '['+(dsp=='none' ? '-':'+')+'] Title';
        if(dsp=='') $D('title').value='';
        $D('title_cont').style.display=(dsp=='none' ? '':'none');
        e.innerHTML = inner;
        tgt_focus.focus();
      });
     // event qr_close
      Dom.Ev($D('qr_close'), 'click', function(){      
        QR.close();
      });
     // event qr_min
      Dom.Ev($D('qr_min'), 'click', function(){
        $D('footer_spacer').setAttribute('style', 'height:15px');
        var curval = $D(gvar.msgID).value || $D(gvar.msgID).innerHTML;
        $D('stat_qrcontent').innerHTML=( curval!='' ? '...':'' );
        showhide($D('qrfixed_thumb'), true);
        showhide($D('qr_container'), false);
      });
       
     // event message_clear
      Dom.Ev($D('message_clear'), 'click', function(){ QR.msg.clear(); QR.msg.focus(); }); 
     // textarea autogrow
     QR.msg.setElastic(gvar.msgID);
      
     // event qrfixed_thumb | qr_max
      Dom.Ev($D('qrfixed_thumb'), 'click', function(){     
        if($D('hash').value==''){
           THREAD.doQuote(THREAD.reply);
        }else{
          showhide($D('qr_container'), true);
          showhide($D('qrfixed_thumb'), false);
          QR.msg.focus();
        }
        $D('footer_spacer').setAttribute('style', 'height:'+THREAD.get_footerHeight()+'px');
      });
      
     // form submission
     var validateCapcay = function(){
       var tgt,msg='',ret=($D('captcha') && $D('captcha').value.length==3 || THREAD.user.isDonatur || gvar.mode=='qe');
       if(!ret){ msg='Belum mengisi capcay..';tgt='captcha'}
       if( $D(gvar.msgID) ){
         var nVal = trimStr ( $D(gvar.msgID).value );
         $D(gvar.msgID).value = nVal;
         if( $D(gvar.msgID).value.length==0 )
            msg+=(msg.length>0?'\n':'')+'Message is too short.'; tgt=gvar.msgID;
       }
       if(msg!=''){alert(msg); $D(tgt).focus()}
       return ret;
     };
     if($D('frmQR'))
        Dom.Ev($D('frmQR'),'submit',function(e){
           var C = (!e ? window.event : e );
           if( !validateCapcay() ) C = do_an_e(C);
        });
     if($D('btnsubmit'))
        Dom.Ev($D('btnsubmit'), 'click', function(e){
           var C = (!e ? window.event : e );
           if( validateCapcay() ) $D('frmQR').submit(C);
        });
    } // end event_tpl
     
    ,set_reason: function(vres){
      var par = $D('reason_edit'), el = createEl('input', {id:'reason','class':'field',name:'reason',value:vres,type:'text',style:'display:inline;width:90%'});
      if(!par) return;
      par.innerHTML = 'Reason: ';
      Dom.add(el, $D('reason_edit'));
    }
    ,set_referer_uri: function(pid){
      if(!pid) return '';
      setValue( KS+'CallBackUri', 'http://'+location.hostname+location.pathname+'#'+pid );
    }
    ,chk_postID: function(pid, destroy){
      if(isDefined(destroy) && destroy){
        if( $D('postid') )
          Dom.remove('postid');
        return;      
      }
      if(isUndefined(pid)) return false;     
      var el = createEl('input', {id:'postid',name:'postid',value:pid,type:'hidden'});
      Dom.add(el, $D('submit_cont'));
    }
    ,check_mode: function(mode){
      $D('modetitle').innerHTML = (mode=='qe' ? gvar.mode_qe.title : gvar.mode_qr.title);
      $D('qr_min').style.display = (mode=='qe' ? 'none':'');
      $D('capcay_cont').style.display = (mode=='qe' ? 'none':'');    
      $D('qr_close').title = (mode=='qe' ? 'Cancel Edit':'Close');
      $D('btnsubmit').value = (mode=='qe' ? gvar.mode_qe.submit : gvar.mode_qr.submit);
      if(mode=='qr') {
        QR.chk_postID(null, true); // destroying..
        $D('frmQR').action = '/' + gvar.mode_qr.action + '/' + THREAD.id;
      }
      if(gvar.__DEBUG__) $D('thisAct').value = $D('frmQR').action;
    }  
    ,cancel_edit: function(){
      setValue(KS+'CallBackUri','');
      $D('hash').value = gvar.mode_qr.hash
      QR.check_mode('qr');
      if($D('reason_edit')) $D('reason_edit').innerHTML = '';
    }
    ,close: function(){
      if(gvar.mode=='qe') {// closing from Quick Edit
        THREAD.reset_post_coloring();
        QR.cancel_edit();
      }
      $D('footer_spacer').setAttribute('style', 'height:15px');
      $D('stat_qrcontent').innerHTML='';
      showhide($D('qrfixed_thumb'), true);
      QR.msg.clear();
      QR.toggle(false);
    }
    ,toggle: function(flag){
      showhide($D('qr_container'), flag);
      if($D('qr_container').style.display!='none')
        try{ QR.msg.lastfocus(); } catch(e){};
    }
};
  
var THREAD = {
   user:function(){}
  ,init: function (){   
    THREAD.isInside = THREAD.inside();
    THREAD.user = THREAD.getUser();
     
    // reFormat post
    if(THREAD.isInside){
        THREAD.id = THREAD.getThreadId();
        THREAD.reFormat();
        // do event on quote & Edit button
        THREAD.eventQuote();
        THREAD.add_footter_spacer();
    }   
  }
  ,getThreadId: function (){
    var match, hVal = getByXPath_containing('//a[@class="btn_link"]', false, 'REPLY'); 
    THREAD.reply = (isDefined(hVal[0]) ? hVal[0] : null);
    if(THREAD.reply)
       match = /(?:\w+)\.kaskus\.us\/reply\/(\d+)/i.exec(THREAD.reply);
    return (match ? match[1] : null);   
  }
  ,getUser: function (){
     var alogins = $D('//a[contains(@href, "#login")]', null);
     if(alogins.snapshotLength > 0) {      
       for(var i=0;i<alogins.snapshotLength; i++){
            var el = alogins.snapshotItem(i);
            el.setAttribute('onclick','return false');
            Dom.Ev(el, 'click', function(){ THREAD.scroll_to_login() });
       }
       return false;
     }else{
       var node = $D('.//div[@id="menu"]', null, true);
       var html = node.innerHTML;
       var match = /Welcome[\!\s](?:[^\"]+).http\:\/\/(?:\w+)\.kaskus\.us\/user\/profile\/(\d+)\">(.+)<\/a/i.exec(html);
       return (match ? {id:match[1], name:match[2], isDonatur:false} : false);
     }
   }
  ,scroll_to_login: function(){
      var ogi = getAbsoluteTop( $D('login') ), tgtusername = $D('.//input[@name="username"]', null, true);
      scrollTo(0,ogi);
      tgtusername.focus(); 
   }
  ,reFormat: function(){
    var posts = $D('.//div[@class="post"]',null);
    var html, prahtml, pos, idHead, match, pra;
    for(var i=0; i<posts.snapshotLength; i++){
        html = posts.snapshotItem(i).innerHTML;
        // spoiler parser
        idHead = '<font color="#0099cc">';
        if(html.indexOf(idHead)!=-1){
          html = html.replace(/\"<\/font><br>/gim, function(str, $1) { return('<\/blockquote>'); });
          html = html.replace(/(?:<br>\n)*<font\scolor=\"\#0099cc\">([^\"]+)*\"(.+)/gi, function(str, $1, $2) {
            return('<blockquote>'+($1 ? '<div class="posted_by">&#187;&nbsp;Posted by <b>'+$1+'<\/b></div>' :'') + ($2?$2.replace(/<br>/,''):'') );
          });
        }
        // implement
        if(posts.snapshotItem(i).innerHTML != html)
           posts.snapshotItem(i).innerHTML = html;
            
        // code parser
        var parsecode = true;
        if(parsecode){
           html = html.replace(/\n/gm,'');
           html = html.replace(/\[code\](?:<br>)*/gim, function(str) { return('<div class="tcode">Code:</div><pre class="code">'); });
           html = html.replace(/(?:<br>|\n)*\[\/code\]/gim, function(str) { return('</pre>'); });      
           posts.snapshotItem(i).innerHTML = html;
           pra = $D('.//pre[@class="code"]', posts.snapshotItem(i) );
           if(pra.snapshotLength > 0)
            for(var j=0; j<pra.snapshotLength; j++){
                prahtml = pra.snapshotItem(j).innerHTML;
                prahtml = prahtml.replace(/\n/gm, '');
                if(pra.snapshotItem(j).innerHTML != prahtml)
                   pra.snapshotItem(j).innerHTML = prahtml;
            }
        }
     
    } // end for postbit
      
    // event hover the ink to image
    var link, links = $D('//a[@target="_blank"]',null);
    var PicRegEx = /https?\:\/\/.+\.(?:jpg|jpeg|gif|png|ico)(?:\?.+)*/i;
    var child = false;
    if(links.snapshotLength > 0){
        for(var i=0; i<links.snapshotLength; i++){
           link = links.snapshotItem(i);
           if( PicRegEx.test(link.href) ){
             child = getTag('img', link);
             if(child){
                child = child[0];
                if( child.src.indexOf(link.href)==-1 ) continue;
             }else{
                if( link.href!=link.innerHTML ) {
                  continue;
                }
             }
           }else{
             continue;
           }
           if(!child)
             link.setAttribute('class','imgthumb');
           else
             link = child;
           Dom.Ev(link, 'mouseover', function(e) {
             if (!e.shiftKey && !e.ctrlKey && !e.altKey) { showPopupPic(e); }
           });
        }
    }
   }
  ,eventQuote: function(){
     var nodes,child, el, par, Attr;
     nodes = getByXPath_containing('//a', false, 'edit');
     for(var i=0; i < nodes.length; i++){       
        if(THREAD.user===false) {
           Dom.remove(nodes[i]); continue;
        }
        child = '<img src="'+gvar.B.btn_edit+ '" border="0" alt="edit" />';
        el = createEl('a', {href:nodes[i].href, 'onclick':'return false;', id:'edit_'+i}, child);
        Dom.Ev(el, 'click', function(e){
          THREAD.doEdit(e);
          return true;
        });       
        nodes[i].parentNode.insertBefore(el, nodes[i].parentNode.firstChild);      
        Dom.remove(nodes[i]);
     }
     nodes = getByXPath_containing('//a', false, 'quote');
     for(var i=0; i < nodes.length; i++){
        par = nodes[i].parentNode;
        if(THREAD.user===false){
          Attr={href:'#login', 'onclick':'return false;', id:'quote_'+i,title:'Login to Reply'};
        }else{
          Attr={href:nodes[i].href, 'onclick':'return false;', id:'quote_'+i};     
        }
        child = '<img src="'+gvar.B.btn_qr+'" border="0" alt="quote" />';
        el = createEl('a', Attr, child);
        if(THREAD.user)
          Dom.Ev(el, 'click', function(e){ THREAD.doQuote(e) });
        else
          Dom.Ev(el, 'click', function(){ THREAD.scroll_to_login() });
         
        Dom.add(el, par);      
        addClass('transp_me', par);
        Dom.remove(nodes[i]);
     }
     if(THREAD.user===false){
        nodes = $D('//a[contains(@href,"/reply/")]');
        if(nodes.snapshotLength)
          for(var i=0;i<nodes.snapshotLength;i++){
            var el=nodes.snapshotItem(i);
            el.setAttribute('href','javascript:;');
            Dom.Ev(el, 'click', function(){ THREAD.scroll_to_login(); return false; });
          }
     }
      
      
   }
    
  ,isProcessing: function(tgt){
    var yes = $D(tgt);
    if(yes) show_alert('There is still fetch progress..', 0);
    return yes;
  }
   
  ,reset_post_coloring: function(){
    if(!gvar.lastEdit_id) return;
    var par, el = $D(gvar.lastEdit_id);
    if(el){
      par = el.parentNode.parentNode;
      removeClass('current_edit', par);
    }
  }
  ,post_coloring: function(e){
     // coloring parent, .post
     if(!e) return;
     var el = $D(e);
     var post = el.parentNode.parentNode;   
     if(isDefined(post.className) && post.className == 'post'){
        addClass('current_edit', post);
     }
  }
  ,doEdit: function(e){
     if( THREAD.isProcessing('fetching_edit') ) return;
     // set mode edit
     gvar.mode = 'qe';  
      
     THREAD.reset_post_coloring();
     e = e.target || e;
     if(e.nodeName=='IMG') e=e.parentNode; // make sure get tag <a>
     if(isDefined(e.id)) gvar.lastEdit_id = e.id;
     var par = e.parentNode; // get tag <div class="right">
     e.style.display = 'none';
     var inner = '<img src="'+gvar.B.loading_gif+'" border="0"/>&nbsp;<small>loading...</small>';
     var el = createEl('div', {id:'fetching_edit','class':'smallfont',style:'color:blue;font:11pt;float:left;margin-top:5px;'}, inner);
     Dom.add(el, par);
      
     THREAD.post_coloring(gvar.lastEdit_id);
      
     GM_XHR.uri = e.href;
     GM_XHR.cached = true;
     GM_XHR.request(null,'GET',THREAD.doEdit_Callback); 
      
  }
  ,doEdit_Callback: function(html){
     var par = $D('fetching_edit').parentNode;
     var e = getTag('a', par)[0];
     if(e && e.id!='qr_max') e.style.display='';
     Dom.remove('fetching_edit');
     var ret = THREAD.do_Parse(html.responseText);
     showhide($D('qrfixed_thumb'), false);  
     QR.msg.clear();
     QR.msg.addMsg(ret[0]);
     QR.msg.title(ret[1]);
     $D('frmQR').action = '/' + gvar.mode_qe.action + '/' + ret[2];
     $D('hash').value = gvar.mode_qe.hash = ret[ret.length-1];  
     QR.check_mode(gvar.mode);
      
     QR.chk_postID(ret[2]); // create postid el
     QR.set_referer_uri(ret[2]); // set referer uri
     QR.set_reason(ret[4]); // set reason editing
      
     QR.toggle(true);
     $D('footer_spacer').setAttribute('style', 'height:'+THREAD.get_footerHeight()+'px');
  }
  ,doQuote: function(e){
     if( THREAD.isProcessing('fetching_quote') ) return;
     // set mode qr
     gvar.mode = 'qr';  
      
     e = e.target || e;
     if(e.nodeName=='IMG') e=e.parentNode; // make sure get tag <a>
     var par = e.parentNode; // get tag <div class="right">
     if( !par.className )
      par = $D('thumb_qr');
     else
      e.style.display = 'none'; 
 
     var inner = '<img src="'+gvar.B.loading_gif+'" border="0"/>&nbsp;<small>loading...</small>';
     var el = createEl('div', {id:'fetching_quote','class':'smallfont',style:'color:blue;font:11pt;'}, inner);
     Dom.add(el, par);    
 
     GM_XHR.uri = e.href;
     GM_XHR.cached = true;
     GM_XHR.request(null,'GET',THREAD.doQuote_Callback);
   }
  ,doQuote_Callback: function(html){
     var par = $D('fetching_quote').parentNode;
     var e = getTag('a', par);
     e = (e.length > 1 ? e[1] : e[0]);   
     if(e && e.id!='qr_max') e.style.display='';
     Dom.remove('fetching_quote');
     var ret = THREAD.do_Parse(html.responseText);
     showhide($D('qrfixed_thumb'), false);
      
     QR.msg.addMsg(ret[0]); 
     QR.msg.updCapcay(ret[3]);
     $D('hash').value = gvar.mode_qr.hash = ret[ret.length-1];
     QR.check_mode(gvar.mode);
     QR.toggle(true);
     $D('footer_spacer').setAttribute('style', 'height:'+THREAD.get_footerHeight()+'px');
   }
  ,do_Parse: function(page){
     var match, parts, ret;
     //show_alert(page);    
      
     var pos = [ page.indexOf('name="message"'), page.lastIndexOf('</textarea') ];
     parts = page.substring(pos[0], pos[1]);
     pos[0] = parts.indexOf('>');
     ret = ['','','','','']; // msg,title,postid,capcay,hash
     ret[0] = parts.substring( (pos[0]+1), parts.length);
     match = /name=[\'\"]title[\'\"]\s*(?:(?:class|type)=[\'\"][^\'\"]+.\s*)*value=[\'\"]([^\"\']+)*/i.exec(page);
     ret[1] = (match ? (match[1]?match[1]:''):'');
     match = /name=[\'\"]postid[\'\"]\s*(?:(?:class|type)=[\'\"][^\'\"]+.\s*)*value=[\'\"]([^\"\']+)*/i.exec(page);
     ret[2] = (match ? (match[1]?match[1]:''):'');
     match = /Verification\:\s*<img\s*src=[\'\"]([^\'\"]+)/i.exec(page); 
     ret[3] = (match ? (match[1]?match[1]:''):'');
     THREAD.user.isDonatur=(!match?true:false);
     match = /name=[\'\"]reason[\'\"]\s*(?:(?:class|type)=[\'\"][^\'\"]+.\s*)*value=[\'\"]([^\"\']+)*/i.exec(page);
     ret[4] = (match ? (match[1]?match[1]:''):'');
      
     // last match as the key
     match = /name=\"hash\".+value=\"([^\"]+)\"/i.exec(page);
     ret[5] = (match ? match[1]:'');
     if(match) ret = [
         unescapeHtml(ret[0]) // #0 msg
       , ret[1] // #1 title
       , ret[2] // #2 postid
       , ret[3] // #3 capcay
       , ret[4] // #4 reason      
        
       // keep hash at the last
       , ret[5] // #5 hash
       ];
     return ret;
   }
    
  ,get_footerHeight: function(){
    var fh=260,a=$D(gvar.msgID),h=parseInt(a.clientHeight);
    if(h > 0) fh = parseInt($D('footer_spacer').clientHeight) + (h - 90);
    return fh;
  }
  ,inside: function(){
    return ( /\/thread\/.*/.test(location.pathname) );
  }
  ,window_stop: function(){
    if(window.stop !== undefined){window.stop();}
    else if(document.execCommand !== undefined){document.execCommand("Stop", false);}
  }
  ,add_footter_spacer: function(flag){
     flag = (isUndefined(flag) ? true : flag);
     if(flag){
       if($D('footer_spacer')) return;
       var el=createEl('div', {id:'footer_spacer','style':'height:15px;'});
       Dom.add(el, document.body);
     }else{
       Dom.remove('footer_spacer');
     }
   }
};
 
// ------
Dom.Ev(window, 'load', function(){ init() } );
// ------
  
})();
/* Mod By Idx. */