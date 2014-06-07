// ==UserScript==
// @name           PackerUnZip
// @namespace      http://dean.edwards.name/packer/
// @author         Suiren
// @include        http://dean.edwards.name/packer/*
// @description    PackerUnZip
// ==/UserScript==

(
	function(){
		for(var i = 0;i < document.forms.length;i++){
			for(var j =0;j < document.forms[i].elements.length;j++){
				document.forms[i].elements[j].disabled = false;
				document.forms[i].elements[j].readOnly = false;
				void(0);
			}
		}
	}
)();