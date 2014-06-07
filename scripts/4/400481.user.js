// ==UserScript==
// @name          Select all friends Facebook
// @description	  Adds a 'Select All' Button to Facebook's 'Suggest to Friends' option.
// @namespace     http://halfaclick.blogspot.com/
// @include       http://www.facebook.com/*

//Developed by Mayank Singhal
// ==/UserScript==

(function() {
	inter = 0;
	function Recalculate() {
		var ele = document.getElementById("AllSelectEnd");
		ele.value=document.getElementById("all_friends").childNodes.length;
	}
	
	function startit() {
	if (inter != 0)
		return;
	buts = document.getElementById('fb_multi_friend_selector_wrapper');
	if (buts) {
		Others = '<div style="border:1px solid #C1C1C1; padding:5px; margin:5px;"> Start from: <input class="inputtext" type="text" value="0" id="startpt" size="5"/> | Till: <input class="inputtext" type="text" value="'+document.getElementById('all_friends').childNodes.length+'" id="AllSelectEnd"  size="5"/> ';
		Recalculate = '<input class="inputbutton" type="button" onclick="var ele = document.getElementById(\'AllSelectEnd\'); ele.value=document.getElementById(\'all_friends\').childNodes.length;" value="Recalculate" />';
		Link = '<input class="inputbutton" type="button" onclick="start=document.getElementById(\'startpt\').value;howmany=document.getElementById(\'AllSelectEnd\').value - start;j=0;cont=document.getElementById(\'all_friends\').childNodes; for ( i=start; i<cont.length; i++) {temp = cont[i].childNodes; temp1 = temp[0]; temp1.onclick();j++; if (j>=howmany) break;}; return false;" href="Javascript:void(0)" value="Click Them"/>';
		//Link += "<script type=\'text/javascript\'>function selectallfriendsya() {cont = document.getElementsByTagName('ul').getElementById('friends').getElementsByTagName('li');" + "for ( i=0; i<cont.length; i++) {" + "temp = cont[i].getElementsByTagName('a'); temp[0].click(); } }" + "</script>";
		EndDiv = "</div>"
		parent = document.getElementById('fb_multi_friend_selector_wrapper');
		buts = document.createElement('div');
		buts.innerHTML = Others + Recalculate + Link + EndDiv;
		parent.appendChild(buts);
		
		inter = 1;
	}
	//alert(buts.length);
	
	setTimeout(startit, 2000);
	}
	setTimeout(startit, 100);
	
})();