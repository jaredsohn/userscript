// ==UserScript==
// @name   OperaFix GoogleTranslate
// @version 0.8
// @description Version 0.8 (OperaFixグーグルトランスレート)
// @namespace OperaFix GoogleTranslate (cc) http://creativecommons.org/licenses/by-nc/2.1/jp/deed.ja
// @author  Kurojitosan
// @include http://translate.google.com/?hl=*
// @exclude http://acid3.acidtests.org/* 
// ==/UserScript==

_doc_ ='<table style=z-index:999;position:absolute;top:18px;left:240px;font-size:11pt;><tr>';
_doc_+='<td align=right><a href=//userscripts.org/scripts/source/89673.user.js>+</a> ';
_doc_+='<a href=//my.opera.com/japanese/forums/>My</a> ';
_doc_+='<td><a href=//www.opera.com/browser/next/>Opera</a></td>';
_doc_+='<td><a href=//www.excite.co.jp/world/english/>English</a></td>';
_doc_+='<td><a href=//www.excite.co.jp/world/chinese/>Chinese</a></td>';
_doc_+='<td><a href=//www.excite.co.jp/world/korean/>Korean</a></td></tr>';
_doc_+='<tr><td><a href=//www.excite.co.jp/world/french/>French</a></td>';
_doc_+='<td><a href=//www.excite.co.jp/world/italian/>Italian</a></td>';
_doc_+='<td><a href=//www.excite.co.jp/world/german/>German</a></td>';
_doc_+='<td><a href=//www.excite.co.jp/world/spanish/>Spanish</a></td>';
_doc_+='<td><a href=//www.excite.co.jp/world/portuguese/>Portuguese</a></td>';
_doc_+='</tr></table>';_doc_=_doc_.replace(/(<a )(href=)/ig,'$1 target=_blank $2');

if(0>navigator.userAgent.indexOf('Opera')){
  _doc_=_doc_.replace('target=_blank href=//userscripts.org/scripts/','href=//userscripts.org/scripts/');
}
function _addElementBody_(_doc_){
  if(_ele_=document.createElement('div')){with(_ele_){id='BodyChild';innerHTML=_doc_;}
  document.body.appendChild(_ele_);return(1);}return(0);
}
function _addElementID_(_doc_,_id_){
  if(_ele_=document.createElement('b')){with(_ele_){id=_id_+'Child';innerHTML=_doc_;}
  if(_eleid_=document.getElementById(_id_)){with(_eleid_){appendChild(_ele_);return(1);}}}return(0);
}
if(!_addElementID_(_doc_,'gt-logo')){_addElementBody_(_doc_)}
