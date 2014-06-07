// ==UserScript==
// @name           Tagged pets
// @namespace      http://userscripts.org/users/152598
// @include        http://www.tagged.com/pets.html*
// ==/UserScript==

(function() {
	unsafeWindow.buyquick = function(track, w) {
		
		
		
		/*
		var d = document;
		var c = d.cookie;
		var l = d.location.search;
		var nameEQ = 'S='
		var ca = c.split(';');
		for(var i=0;i < ca.length;i++) {
			var ci = ca[i];
			while (ci.charAt(0)==' ') ci = ci.substring(1,ci.length);
			if (ci.indexOf(nameEQ) == 0) session_id = ci.substring(nameEQ.length,ci.length);
		}
		var d=document;var c=d.cookie;var l=d.location.search;
		
		var url='http://www.tagged.com/api/?application_id=user&format=json&session_token='+session_id;
		
		var uid_to_buy=l.substr(l.indexOf('uid=')+4,10);var el=d.getElementById('buy_now_profile_'+uid_to_buy).attributes;
		var pet_price=el.getNamedItem('price').value;var purchase_token=el.getNamedItem('token').value;
		var displayed_owner_id=el.getNamedItem('owner_id').value;
		//var track=TAGGED.guid;
		var http=new XMLHttpRequest();
		var params='method=tagged.apps.pets.buyPet&userid_to_buy='+uid_to_buy+'&pet_price='+pet_price+'&purchase_token='+purchase_token+'&displayed_owner_id='+displayed_owner_id+'&api_signature=&track='+track;
		http.open('POST',url,true);
		http.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		http.setRequestHeader('Content-length',params.length);
		http.setRequestHeader('Connection','close');
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				//alert(http.responseText);
				history.go(0);
			}
		}
		http.send(params);
		*/
	}
	
	
	document.getElementById('achievements_container').style.display = 'none';
	document.getElementById('pets_luv_container').style.display = 'none';
	document.getElementById('col2skyscraper').style.display = 'none';
	document.getElementById('topad').style.display = 'none';
	
	/*var mn = document.getElementById('user_value'); 
	mn.innerHTML = mn.innerHTML + "	<a href=\"javascript:buyquick(TAGGED.guid, window);\">Buy Rapid!</a>";*/
	

})()