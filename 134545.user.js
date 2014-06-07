// ==UserScript==
// @name          Select ALL Facebook Friends
// @description	  Easily invite all of your friends to your fan pages, groups, and some apps on Facebook. By default, it will add ALL, but you can select a range if you only want to add a certain number of your friends.
// @namespace     http://www.Facebook.com/Naomordaamaca
// @include       https://www.facebook.com/*

// Developed AlaanBrynner
// ==/UserScript==

(function() {
	inter = 0;
	function startit() {
		if (inter != 0)
			return;
		buts = document.getElementById('fb_multi_friend_selector_wrapper');
		if (buts) {
			Others = '<div style="border:1px solid #C1C1C1; padding:5px; margin-top: 10px;"><label>Start #:</label> <input class="inputtext" type="text" value="0" id="startpt" size="5"/>&nbsp;&nbsp;&nbsp;&nbsp;<label>End #:</label> <input class="inputtext" type="text" value="'+document.getElementById('all_friends').childNodes.length+'" id="end"  size="5"/>&nbsp;&nbsp;'
			Link = '<span class="UIButton UIButton_Blue UIFormButton"><input class="UIButton_Text" type="button" onclick="start=document.getElementById(\'startpt\').value;howmany=document.getElementById(\'end\').value - start;j=0;cont=document.getElementById(\'all_friends\').childNodes; for ( i=start; i<cont.length; i++) {temp = cont[i].childNodes; temp1 = temp[0]; temp1.onclick();j++; if (j>=howmany) break;}; return false;" href="Javascript:void(0)" value="Select Friends"/></span></div>';
			parent = document.getElementById('fb_multi_friend_selector_wrapper');
			buts = document.createElement('div');
			buts.innerHTML = Others + Link;
			parent.appendChild(buts);

			inter = 1;
		}
		setTimeout(startit, 2000);
	}
	setTimeout(startit, 100);
})();