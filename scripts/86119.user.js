// ==UserScript==
// @name   OperaFix Amazon comment
// @version 0.5
// @description Version 0.5 (OperaFixアマゾンコメント)
// @namespace OperaFix Amazon comment (cc) http://creativecommons.org/licenses/by-nc/2.1/jp/deed.ja
// @author  Kurojitosan  (SpecialThanks mattz)
// @include https://www.amazon.co.jp/*
// @include http://www.amazon.co.jp/*
// @exclude http://acid3.acidtests.org/* 
// ==/UserScript==
                            
	if(0<=navigator.userAgent.indexOf('Opera')){

		_doc_='<style>div.comments{display:block !important;}</style>';

		function _addElementBodyDirect_(_doc_){
			if(_ele_=document.getElementsByTagName('body')){_ele_[0].innerHTML+=_doc_;return(1)}return(0);
		}
		function _addElementBody_(_doc_){
			if(_ele_=document.createElement('div')){with(_ele_){id='BodyChild';innerHTML=_doc_;}
			document.body.appendChild(_ele_);return(1);}return(0);
		}
		function _addElementID_(_doc_,_id_){
			if(_ele_=document.createElement('div')){with(_ele_){id=_id_+'Child';innerHTML=_doc_;}
			if(_eleid_=document.getElementById(_id_)){with(_eleid_){appendChild(_ele_);return(1);}}}return(0);
		}
		if((1)){
			if((0)){_addElementBodyDirect_(_doc_);}
			if((1)){_addElementBody_(_doc_);}
			if((0)){_addElementID_(_doc_,'navFooter');}
		}
	} 
