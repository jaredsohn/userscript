// ==UserScript==
// @name           CloseThatStupidShit!
// @author         El Kisin (aka kCire)
// @namespace      http://elkisin.tk
// @description    Elimina el estúpido SideBar de anuncios y actualizaciones del lado derecho
// @include        https://www.facebook.com/
// @include 	   http://www.facebook.com
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

(function(){	
	function _getElementbyClass(_tag,_class){
		var _targets = document.getElementsByTagName(_tag),i;
		var result=[];
		
		if(_targets.length>0){
			for(i=0;i<_targets.length;i++){
				if(_targets[i].className.match('(^|\s)'+_class+'+')){
					result.push(_targets[i]);
				}
			}
		}
		
		return result;
	}
	
	var foo1=document.getElementById('contentArea');
	var rCol=_getElementbyClass('div','rightColumnWrapper');
	var uList=_getElementbyClass('ul','uiList');
	
	if(foo1)
		foo1.setAttribute('style','width:90%');
	
	if(rCol.length)
		rCol[0].setAttribute('style','display:none');
	
	if(uList.length)
		uList[0].setAttribute('style','width:100%');
	
	

})();	


