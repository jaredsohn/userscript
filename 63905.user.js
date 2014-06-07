// Reload GF Topics
// version 0.1
// December 10, 2009
// Copyright (c) 2009, Matt Flores (Lumaga)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// ==UserScript==
// @name           Reload GF Topics
// @namespace      http://www.gamefaqs.com
// @description    Ajaxy reload of the topic list
// @include        http://www.gamefaqs.com/boards/gentopic.php?board=*
// ==/UserScript==


function reloadTopics()
{
   var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", location.href,true);
    xmlhttp.onreadystatechange=function() {
     if (xmlhttp.readyState==4) {
     
       var oDiv = document.createElement('div');
	  oDiv.setAttribute('id', 'main_col');
	  oDiv.setAttribute('class', "col");
	  oDiv.innerHTML = xmlhttp.responseText;


	  var o = oDiv.getElementsByTagName("div");
	  var newHTML = null;
	  

	for(var i=0;i<=o.length-1;i++)
	{
	  if(o[i].id=="main_col")
	   {
	   	newHTML = o[i].innerHTML;
		 break;
	    }
	}

       
       if (newHTML != null) {
       	if (newHTML != "") {
		  var topicDiv = document.getElementById("main_col");
		  topicDiv.innerHTML = newHTML;
		  newHTML = null;
		}  
       }
     }   
    };
    xmlhttp.send(null);
}

//reloadTopics();
setInterval(reloadTopics, 10000);