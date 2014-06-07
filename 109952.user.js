// ==UserScript==
// @name           Search Bungie Store
// @namespace      Search Bungie Store
// @include        http://*bungiestore.com/*
// ==/UserScript==

var mainNav = document.getElementsByClassName("mainNav").item(0);
mainNav.innerHTML += '<li><a class="orderStatus" href="javascript: void(0);">Search</a><ul class="flyOut" id="searchFlyOut"><li><ul><li style="color: #FFFFFF; font-size: 14px; margin-left: 12px;"><br>Enter search term:</li><li style="margin-left: 12px;"><input id="searchField" type="text" name="search" autocomplete="on"><input id="searchButton" type="button" name="search"></li></ul></li></ul></li>';

document.getElementById("searchButton").addEventListener("click", function()
{	
	var searchTerm = document.getElementById("searchField").value;
	if (searchTerm)
	{
		GM_xmlhttpRequest ({
    		method: "GET",
    		url: "https://www.amazon.com/s/ref=nb_sb_noss?url=me%3DA3OGVJ9U5741K&field-keywords="+searchTerm+"",
   		 headers: {
       			 "User-agent": "Mozilla/5.0",
        		  "Accept": "text/html",
    		},
    		onload: function (response){
        	var doc = document.implementation.createDocument("", "", null);
       		 var html = document.createElement("html");
        	 html.innerHTML = response.responseText;
        	 doc.appendChild(html);
		 if (doc.getElementById("result_0"))
		 {
			var itemNum = doc.getElementById("result_0").getAttribute("name");
			window.location = "http://www.bungiestore.com/"+itemNum+"/M/"+itemNum+".htm";
		 }
		 else
		 {
			alert("No results were found for your search term.");
		 } 
               }
           });
 	}
	else
	{
		alert("Please enter a search term.");
	}
}
, true);

GM_addStyle("ul.mainNav { width: 650px !important; } input#searchField { background: #FFFFFF; border: 0 none; color: #000000; float: left; font-size: 11px; height: 16px; margin-top: 8px; padding-left: 3px; padding-right: 10px; width: 132px; } input#searchButton { background: url(http://www.bungie.net/images/base_struct_images/top_nav/btn_search.gif) no-repeat scroll left top transparent; border: 0 none; cursor: pointer; float: left; height: 16px; margin-top: 8px; padding: 0; width: 20px; } input#searchButton:hover { background-position: left bottom; } ul#searchFlyOut { width: 200px; height: 100px; }");

// Would you like a jelly baby?
