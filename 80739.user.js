// ==UserScript==
// @name           zeruj wiek
// @namespace      about:blank
// @include        http://www.fotka.pl/out/users_info.php*
// @version        2.0.0
// ==/UserScript==


var uid = document.location.href.match(/user_id=(\d+)/)[1];  // powinno zawsze banglać
if (!uid) uid = unsafeWindow.parent.id;
if (!uid) uid = unsafeWindow.parent.profile_id;
if (!uid) uid = unsafeWindow.parent.document.getElementById("profil_ulubione_dodaj").getAttribute("onclick").match(/\d+/);	
if (!uid) {
	alert("Skrypt 'zeruj wiek' nie wie na jakim profilu się znajduje, więc nie może kontynuować");
	return;
}

//var reset_link = .parentNode.nextSibling;
if(document.getElementById("zeruj_wiek") == null){
	var div = document.createElement("div");
	div.style.cssText = "float:left;margin-right:.5em;font-size:14px;";
	var a = document.createElement("a");
	a.href = "javascript:void(null);";	
	a.innerHTML = "Zeruj wiek (wymuś)";
	a.addEventListener("click", reset, true);
	div.appendChild(a);
	
	var where = document.getElementById("napraw_konto").parentNode;
	where.parentNode.insertBefore(div, where.nextSibling); 
}


function reset(e){	
	if(confirm('Czy jesteś pewien, że chcesz wyzerować wiek na tym koncie?')){	
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://www.fotka.pl/ajax/info_operacje.php",		
			data: 'val=[' + uid + ',0,"zeruj_wiek"]',
			headers: {
			"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(){
						e.target.innerHTML = "OK";
						e.target.removeEventListener("click", reset, true);
						GM_log("zresetowano wiek dla " + uid);
					}
		});
	}
}
