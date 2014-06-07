// ==UserScript==
// @name   OperaFix OperaSpeedBrowse
// @version 0.7.7
// @description Version 0.7.7 (OperaFixオペラスピードブラウズ)
// @namespace OperaFix OperaSpeedBrowse
// @author  Kurojitosan
// @include http://*
// @exclude http://www.tagged.com/*
// @exclude http://acid3.acidtests.org/*
// ==/UserScript==

if(navigator.userAgent.match(/(Opera|Safari|Chrome)/)){ _doc_='';

  function _addElementBody_(_doc_){
    if(_ele_=document.createElement('div')){with(_ele_){id='BodyChild';innerHTML=_doc_;}
    document.body.appendChild(_ele_);return(1);}return(0);
  }

  if(1){_doc_+='<style>*{text-shadow:none !important}</style>';}
  for(_i_=0;10>_i_;_i_++){if(_addElementBody_(_doc_)){break;}}

}
