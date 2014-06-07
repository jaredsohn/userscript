// ==UserScript==
// @name           Auto refresher
// @namespace      http://vestitools.pbworks.com/FrontPage
// @include        http://boards.ign.com/*
// ==/UserScript==

function getBody(content) 
{
   test = content;
   var x = test.indexOf('id="tblBoardTopics"');
   if(x == -1) return "";

   x = test.indexOf(">", x);
   if(x == -1) return "";

   var y = test.indexOf('</table>', x);
   if(y == -1) y = test.lastIndexOf("</html>");
   if(y == -1) y = content.length;    // If no HTML then just grab everything till end

   return content.slice(x + 1, y);   
} 


function refreshTopics() {

GM_xmlhttpRequest({
  method:"GET",
  url:window.location.href,
  headers:{
    "User-Agent":"Mozilla/5.0",
    "Accept":"text/monkey,text/xml",
    },
  onload:function(details) {
      
	/*var debug = document.createElement("div");
	var tableRegex = "/<table(.*?)id=\"tblBoardTopics\">(.*?)<\/table>/";
	debug.innerHTML = '<div id="debug" ' + 
	'style="background:#999999;text-align:left;color:white;' + 
	'padding:2px;padding-left:2px;position:fixed;width:90%;height:75%;top:10px;right:20px;' + 
	'border-width:2px;border-left-width:4px;border-color:#cccccc;border-style:solid;z-index:99999;">' +
	getBody(details.responseText) +
	'</div>';
	document.body.insertBefore(debug, document.body.firstChild);*/
	
	document.getElementById("tblBoardTopics").innerHTML = getBody(details.responseText);

  }
});

setTimeout(refreshTopics, 3000);

}

refreshTopics();