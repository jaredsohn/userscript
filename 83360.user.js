// ==UserScript==
// @name           Koubei Verify
// @namespace      http://www.koubei.com/
// @include        http://*.koubei.com/*
// ==/UserScript==

;(function(){
	function showDiv(){
		var thisUrl = location.href;
		var stId = thisUrl.substring(thisUrl.lastIndexOf("-")+1, thisUrl.length);
		var city = document.getElementById("cityHideJS").value;
		var status = 'All';

		var div = document.createElement("div");
		div.setAttribute("id","bk-jdm");
		div.setAttribute("style","display:block;right:10px;top:5px;;padding: 5px; width: 15px; position: fixed;_position:absolute");
		div.innerHTML = "<a href='http://cate.manager.koubei.com/KoubeiManager/storelist.action?option.id="+stId+"&option.city="+city+"&option.status="+status+"' blank='_target'><img src='http://k.kbcdn.com/images/verify.png' width='35' height='130' /></a>";
		document.getElementById("footer950").appendChild(div);
	}

	showDiv();
})();
