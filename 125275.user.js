// ==UserScript==
// @name           MMTno
// @namespace      http://www.meetmeinto.com
// @include        http://meetmeinto.com/*
// ==/UserScript==

var div = document.getElementById("banner");
div.parentNode.removeChild(div);

var div2 = document.getElementById("enquiries");
div2.parentNode.removeChild(div2);


var mydiv = document.getElementById("header");
    var newcontent = document.createElement('login_cont');
    newcontent.innerHTML = "<div id='signupButton' onclick=\"window.location='signup.asp'\"><img src='imagessignup.png' width='190' height='52' alt='signup'></div>"
		+"<form name='frmLogin' id='frmLogin' action='process/process_login.asp' method='post' style=\"margin:0px;\">"
				+" <input name='path' id='path' type='hidden' value='/forums.asp' />"
				 +"<input name='query' id='query' type='hidden' >"
	+"<table width='360' border='0' cellspacing='0' cellpadding='0' align='right' ><tr>"
			+"<th width='144' align='left' scope='col'><input  type='text' name='txtUsername' value='Login' id='txtUsername' tabindex='1' class='inputField' onfocus=\"this.value=''\"></th>"
			+"<th width='142' align='left' scope='col'><input  type='text' name='txtPassword' value='Password' id='txtPassword' tabindex='2' class='inputField' onfocus=\"changeInputType(this, 'password');\" onkeypress=\"return checkSubmit(this, event)\"></th>"
			+"<th align='left'  scope='col' valign='top'><img src='images/enter.png' alt='login ' onclick='document.frmLogin.submit()' class='loginButton' /></th></tr></table></form>";
//mydiv.appendChild(newcontent);
//alert(newcontent.innerHTML);


//
try{
	document.getElementById("login_container").style.top=-40 + "px";
}
catch (e){

}
try{
	document.getElementById("maincol").style.top=100 + "px";
}
catch(e){
}

try{
	document.getElementById("menu_container").style.top=60 + "px";
}
catch(e){
}

try{
	document.getElementById("userPicWrapper").style.top=-40 + "px";
}
catch(e){
}

try{
	document.getElementById("userMenuWrapper").style.top=-48 + "px";
}

catch(e){
}
//alert(document.getElementById("menu_container").innerHTML);


