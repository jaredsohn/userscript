// ==UserScript==
// @name           Binusmaya AutoComplete
// @icon           http://binusmaya.binus.ac.id/Common/images/icon/favicon.ico
// @namespace      by: www.muffinlabs.co.cc
// @description    Auto fill Username and Password field
// @version        0.3
// @include        http://binusmaya.binus.ac.id/
// @include        http://binusmaya.binus.ac.id/Default.aspx
// ==/UserScript==

function prompt_data(){
	do{
		re = false;
		do{ // NIM
			re = false;
			var nim = prompt("NIM","");
		
			GM_setValue("UserId", nim);
			
			if(nim == null || nim == ""){
				alert("NIM tidak boleh kosong");
				re = true;
			}
		}while(re);
			
		do{ // Password
			re = false;
			var pass = prompt("Password","");

			GM_setValue("Password", pass);
			
			if(pass == null || pass == ""){
				alert("Password tidak boleh kosong");
				re = true;
			}
		}while(re);
		
		var conf = confirm("Username : " +nim+ "\nPassword : " + pass + "\nApakah data sudah benar?");
		if(conf == false){
			if(confirm("Ulangi pengisian?") == true) re = true;
		}
	}while(re);
}

/* Link Change AutoComplete User */
var cr = document.createElement("a");
var getId = document.getElementById("btnLogin");
cr.id = "changeAutoComplete";
cr.setAttribute("class", "right");

cr.addEventListener('click', function() { // pengganti onClick
	prompt_data();
}, true);

getId.parentNode.appendChild(cr);
document.getElementById("changeAutoComplete").innerHTML = "Change AutoComplete User";
/* eo Link Change AutoComplete User */

// GM_setValue("HasConfig", 0); // for debugging

if(GM_getValue("HasConfig", 0) == 0){
	prompt_data();
	GM_setValue("HasConfig", 1);
	window.location.reload();
}
else{
	document.getElementById("txtUserId").focus();
	document.getElementById("txtUserId").value = GM_getValue("UserId", "");
	document.getElementById("txtPassword").focus();
	document.getElementById("txtPassword").value = GM_getValue("Password", "");
	document.getElementById("txtPassword").focus();
}