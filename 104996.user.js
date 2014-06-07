// ==UserScript==
// @name           BADOO Advanced Search 
// @namespace      http://badoo.com/
// @description    Allow regular users to access other users' profiles in the search mode.
// @include        http://*badoo.com/search/*
// @include        http://*badoo.com/search/#r*/*
// ==UserScript==
//alert("ok");
//results();
// ==/UserScript==
justWait();
function justWait(){	//let the web to get loaded
	window.setTimeout(results,3000);
	return true;
}

function results(){

		var info_users = document.getElementsByClassName("userpic dOvl-open-ex-up")
		var pivot = document.getElementsByClassName("c_name dOvl-open-ex")
	

		if(!info_users)
		{
		alert("data not captured!");
		}
		else
		{
		alert("data captured!");
			for (i=0;i<=12;i++)
			{
			var dumb = info_users[i].src;
			var URL_profile = "http://badoo.com/0"+(""+dumb).split("/",8)[7];			
			info_users[i].href = "URL_profile";
			//alert(URL_profile);
			var perfil = document.createElement("div");
			perfil.innerHTML="<div><a href='"+URL_profile+"'>---- Link to Profile ----</a></div>";
			pivot[i].parentNode.insertBefore(perfil, pivot[i].nextSibling);

			//pivot[i].href = URL_profile;
			//pivot[i].rel = "";
			//pivot[i].rev = "";
			}
		//window.open("http://badoo.com/search/")

		} 


}
