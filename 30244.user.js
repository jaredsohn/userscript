// ==UserScript==
// @name           stalin
// @namespace      http://www.nameofrussia.ru/person.html*
// @description   stalin vote
// @include        http://www.nameofrussia.ru/person.html*
// ==/UserScript==
function deleteCookie (name, path, domain) {
 document.cookie = name + "=" +
 ((path) ? "; path=" + path : "") +
 ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-99 00:00:01 GMT";
 }

 var i= document.getElementById("id").value
	if ((i == "87")||(i == "93")||(i == "84")||(i == "71")||(i == "88")||(i == "99")||(i == "68")||(i == "101")||(i == "98"))
	{
//	deleteCookie("d");
	deleteCookie("101");
	deleteCookie("99");
	deleteCookie("98");
	deleteCookie("88");
	deleteCookie("68");
	deleteCookie("93");
	deleteCookie("84");
	deleteCookie("87");
	deleteCookie("71");
	deleteCookie("","/","www.nameofrussia.ru");
	z=document.cookie+document.cookie+document.cookie;
    document.getElementById("back").value = "/person.html?id="+i;
    document.getElementById("message").style.display = "block";
    window.setTimeout('document.getElementById("selectPhoto").submit()',10000);
	}	