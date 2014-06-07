// ==UserScript==
// @name           LazyGirl MorePages
// @namespace      faleij
// @description    appends more images to a single page
// @include        http*//*.lazygirls.info/*loc=*
// ==/UserScript==

//settings
var numberOfPagesToFetch = 10;
var imgsPerPage = 8;
//end

loc = window.location.search.substr(1).split("&");
for(var x in loc)
{
	if(loc[x].substr(0,3) == "loc")
	{
		loc = parseInt(loc[x].split("=")[1]);
		break;
	}
}

function appendPage(a)
{
var url= document.location.toString().replace("loc="+loc,"loc="+a);
var req= new XMLHttpRequest(); // XMLHttpRequest object
	try {
		req.open("GET", url, false);
		req.send(null);		
		if(req.status==200)
		{
		    var dt = document.implementation.createDocumentType("html","-//W3C//DTD HTML 4.01 Transitional//EN","http://www.w3.org/TR/html4/loose.dtd"), doc = document.implementation.createDocument('', '', dt), html = doc.createElement('html');
			html.innerHTML = req.responseText;
			doc.appendChild(html);
			var tbody = doc.querySelector("table>tbody>tr>td[width='245']>a>img").parentNode.parentNode.parentNode.parentNode;
			document.querySelector("table>tbody>tr>td[width='245']>a>img").parentNode.parentNode.parentNode.parentNode.innerHTML += tbody.innerHTML;
			delete tbody;
			delete html;
			delete doc;
			delete dt;
		}else{console.log("Error: "+req.status);}
	}
	catch (er) {
		console.log("Error: "+er);
	}
}
numberOfPagesToFetch = (numberOfPagesToFetch*imgsPerPage-1) +loc;
var nextPage = loc;
while(nextPage <= numberOfPagesToFetch)
{
    appendPage(nextPage+=imgsPerPage);
}
