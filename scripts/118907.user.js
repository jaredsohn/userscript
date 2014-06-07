// ==UserScript==
// @name           ru-en-hyphens-global
// @namespace *
// @description пере-нос слов / hyphen-ation
// @include        http://*
// @include        https://*
// @include        file://*
/* about:config -> greasemonkey.fileIsGreaseable <- true */
// @author         trespassersW
// @source http://userscripts.org/scripts/show/118907
// ==/UserScript==
(function(){
/*================
Смотрим на заголовок страницы и пытаемся понять,
на каком языке написан документ. Если в заголовке нет
сведений о языке, то ищем букву йе в тексте страницы.
В зависимости от результата устанавливаем тэг 
<html lang="ru"> или <html lang="en">,
необходимый для включения модуля расстановки переносов.
==================*/

var defaultLanguage=''; //'ru' 'en'
const ye='е'; //'\u0435';

var d=document.body;
if(!d) return;
/* я бы посоветовал установить в браузере стиль Stylish'a 
 http://userstyles.org/styles/57064/ru-en-hyphens-global
 а следующий оператор закомментировать,
 поставив пробел между звёздочкой и слешем */
//if(!scanCss('-moz-hyphens')) // Fforbidden!
{
 GM_addStyle(
  'div,p,li,td, dd{ -moz-hyphens: auto !important}'
 +'[class*="button"],[class*="menu"],[id*="button"],[id*="menu"]'
 +',[class*="button"] *,[class*="menu"] *,[id*="button"] *,[id*="menu"] *'
+',[class^="b-head__layout-column"] * ' //yandex
+'{-moz-hyphens: none !important}'
);
}
/**/
// 
function metaCharset(){
 var d=document.head;
 if(!d) {_log('headless'); return'x3'};
 meta=d.getElementsByTagName('meta');
 var re=/charset\s*=\s*([a-zA-Z0-9\-]+)/i;
 for (var i=0; i< meta.length; i++){
  var cont=meta[i].content;
  if(!cont || !meta[i].httpEquiv ) continue;
  var r=cont.match(re);
  if(r && r[1]) return r[1].toLowerCase();
//   _log( 'X3: '+cont );
 }
  return 'X3';
}

function xml_lang(){
 var xl=document.head.parentNode.attributes.getNamedItem('xml:lang');
 // does.anyone.know.if_there_is_a.direct_path_to(this.place)
 return xl ? xl.value: '';
}

function analBody(){
 var e= document.body.textContent.indexOf(ye);
 return e>0? 'ru': 'en';
}

function _log(s) 
{/**/
  var h=location.href+'';
  if( h.match(/\#\.[0-9A-F]{2}/) )
   h =h.replace(/\.([0-9A-F]{2})/g,'%$1');
  h=_utf8_decode(unescape(h));
  console.log(h+'\n'+s) 
}
function _utf8_decode (ut) {
    var s = [], i = 0, c, len = ut.length;
    while ( i < len ) {
      if ((c = ut.charCodeAt(i++)) < 128) 
          s.push(String.fromCharCode(c));
      else if((c > 191) & (c < 224)) 
          s.push(String.fromCharCode(((c & 31) << 6) | 
          (ut.charCodeAt(i++) & 63)));
      else 
          s.push( String.fromCharCode(((c & 15) << 12) | 
          ((ut.charCodeAt(i) & 63) << 6) | 
          (ut.charCodeAt(i+1) & 63))), i+=2;
    } return s.join("");
/**/}

//https://developer.mozilla.org/en/Character_Sets_Supported_by_Gecko
const charsetZoo={
 'ibm-855':'ru'
,'iso-8859-5':'ru'
,'iso-ir-111':'ru'
,'koi8-r':'ru'
,'maccyrillic':'ru'
,'windows-1251':'ru'
,'cp-866':'ru'
,'koi8-u':'ru'
,'ibm-850':'en'
,'iso-8859-1':'en'
,'iso-8859-15':'en'
,'macroman':'en'
,'windows-1252':'en'
};

function scanCss(txt){
 var  ds=document.styleSheets;
 if(!ds) return '';
 for(var i=0, li=ds.length; i<li; i++){
    var dr=ds[i].cssRules;
    if (!dr) continue;
    for(var j=0, lj=dr.length; j<lj; j++){
     if(dr[j].cssText.indexOf(txt)>=0)
      return dr[j].cssText;
    }
  }  return null;
}

/**/
 d=d.parentNode; 
 var lg;
 var lng=metaCharset();
 lg=charsetZoo[lng]; // highest priority
 if( lg ){
    d.lang=lg;
    _log('meta charset='+ lng +' -> ' + lg);
    return;
 }
 lg=d.lang;
 if( lg ){
//    d.lang=lg;
    _log('html lang='+lg);
    return;
 }
 lg=xml_lang();
 if( lg ){
    d.lang=lg;
    _log('html xml:lang='+lg);
    return;
 }
 lg=defaultLanguage;
 if( lg ) {
    d.lang=lg;
    _log('default='+lg);
    return;
 }
 lg=analBody();
 d.lang=lg;
 _log('analyse='+lg);
 return;

})();