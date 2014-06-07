// ==UserScript==
// @name   OperaFix AmebaBlog fix
// @version 0.7.5
// @description Version 0.7.5 (OperaFixアメーバブログ)
// @namespace OperaFix Ameba blog fix (cc) http://creativecommons.org/licenses/by-nc/2.1/jp/deed.ja
// @author  Kurojitosan  (SpecialThanks ttamo)
// @include http://ameblo.jp/*
// @exclude http://acid3.acidtests.org/* 
// ==/UserScript==

_doc_ ='<style>#subFrame{background:transparent !important;}#footerArea{width:0px !important;}';
_doc_+='#userNaviArea,#header{font-family:Meiryo UI,sans-serif !important;font-size:11pt !important;}';
_doc_+='#sub_main,font{text-align:center;font-family:Meiryo UI,sans-serif;font-size:11pt !important;}</style>';

function _addElementBody_(_doc_){
  if(_ele_=document.createElement('div')){with(_ele_){id='BodyChild';innerHTML=_doc_;}
  document.body.appendChild(_ele_);return(1);}return(0);
}
function _addElementID_(_doc_,_id_){
  if(_ele_=document.createElement('div')){with(_ele_){id=_id_+'Child';innerHTML=_doc_;}
  if(_eleid_=document.getElementById(_id_)){with(_eleid_){appendChild(_ele_);return(1);}}}return(0);
}

if(!_addElementID_(_doc_,'main')){_addElementBody_(_doc_)}


