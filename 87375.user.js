// ==UserScript==
// @name           NCIX: Add Product Reviews
// @namespace      NA
// @include        http://www.ncix.com/products/*
// @include        http://ncix.com/products/*
// ==/UserScript==

// Author: Hotshot
// Version: 0.10 (BETA)
// Date: Oct 4, 2010

// NOTES: This is beta because it is not polished, not tested much, and extra features could be added.


var StartURL = String(window.location).match(/http\:\/\/\S*.?ncix/i) + ".com/";

var A = document.body.getElementsByTagName("a");

for (i = 0; i < A.length; i++)
{
	if (A[i].href.match(/mtop/i)) //This is a img with a archor to the top of the page, every time this appears my GET-RATING text appears
	{
		var Font = document.createElement('font');

		Font.addEventListener("click", function() 
		{

			progressDiv = document.createElement('div');
			progressDiv.style.width = '100px';
			progressDiv.style.marginBottom = '-3px';
			progressDiv.style.border = '1px solid black';
			progressDiv.style.color = 'white';
			progressDiv.style.backgroundColor = '#2f4879';
			progressDiv.style.padding = '2px';
			progressDiv.align = "center";
			
			this.parentNode.replaceChild(progressDiv, this);
			progressDiv.appendChild(document.createTextNode('0%'));
		
			var TotalItems = 0;
			var myItem = progressDiv.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
			while ((myItem) && (myItem.childNodes[1].childNodes[1]) && (myItem.childNodes[1].childNodes[1].className == "listing"))
			{
				TotalItems++;
				progressDiv.firstChild.nodeValue = '0%'
				progressDiv.firstChild.title = '0';
				
				TempSKU = myItem.innerHTML.match(/SKU=(\d+)/i)[1];
						
				ajax(TempSKU,'', myItem, progressDiv);
				
				myItem = myItem.nextSibling.nextSibling;
			}
			progressDiv.title = "0 of " + TotalItems;
			
		}, false); 
		Font.setAttribute('color',"blue");
		Font.setAttribute('size',"4");
		Font.innerHTML = "GET-RATINGS";
				
		var b = A[i].parentNode.parentNode.firstChild.nextSibling.innerHTML ;
		A[i].parentNode.parentNode.firstChild.nextSibling.innerHTML = "<table width=\"100%\"><tr><td NOWRAP\"true\" width=\"100\">" + b + "</td><td valign=\"bottom\" align=\"left\"></td></tr></table>"
		A[i].parentNode.parentNode.firstChild.nextSibling.childNodes[0].childNodes[0].childNodes[0].childNodes[0].nextSibling.appendChild(Font);
	
	}
}

// makeRequest("http://www.ncix.com/products/index.php?sku=46281");

function ajax(SKU, vars, myAjaxOBJ, ProgressBar)
{ // from wikipedia :)
	var url = StartURL + "products/index.php?sku=" + SKU;

	var request = new XMLHttpRequest();
	
	
GM_xmlhttpRequest(
{
	method: "GET",
	url: url,
	onload: function(response) 
	{
		//alert(response.responseText);
		
		bodyA = document.createElement('body');
		bodyA.innerHTML = getBody(response.responseText);
			
		
		var TD = bodyA.getElementsByTagName('td');
		
		for (i = 0; i < TD.length; i++)
		{
			if (TD[i].innerHTML.match(/img_star/i) && TD[i].innerHTML.length < 500 && TD[i].innerHTML.match(/#CustomerReview/i))
			{ 
				TD[i].childNodes[1].nextSibling.nextSibling.childNodes[1].href = StartURL + "products/index.php?mode=productreviewread&product_id=" + SKU;
				myAjaxOBJ.innerHTML = myAjaxOBJ.innerHTML.replace(/<\/span>/i, "<br />" + TD[i].innerHTML + "</span>");
			}

		}

		
		//ProgressBar.firstChild.nodeValue = ProgressBar.firstChild.nodeValue + "1";
		var Number = ProgressBar.title.match(/\d+/);
		var Total = ProgressBar.title.match(/\d+$/);
		Number++
		ProgressBar.title = ProgressBar.title.replace(/\d+/,Number);
		ProgressBar.firstChild.nodeValue = Math.round((Number / Total) * 100) + "%";
		
	}
});

if (request.readyState == 4 && request.status == 200)
{ 	

	if (request.responseText)
	{ 
		
		
	}
}


}

function getBody(content) { // from responseHTML / (c) 2007 xul.fr / Licence Mozilla 1.1
	test = content;//.toLowerCase();
	var x = test.indexOf("<body");
	if(x == -1) return "";
	x = test.indexOf(">", x);
	if(x == -1) return "";
	var y = test.lastIndexOf("</body>");
	if(y == -1) y = test.lastIndexOf("</html>");
	if(y == -1) y = content.length;    // If no HTML then just grab everything till end
	var tempaa = content.slice(x + 1, y);   

	return tempaa; 
}

function IsValid(myObj)
{
	if ((myObj) && (myObj.childNodes[1].childNodes[1]) && (myObj.childNodes[1].childNodes[1].className == "listing"))
	{
		return true
	}
	else 
	{
		return false
	}
}

function makeRequest(url) 
{
	http_request = false;
	if (window.XMLHttpRequest) 
	{ // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		
		if (http_request.overrideMimeType) 
		{
		http_request.overrideMimeType('text/html');
		}
	} 
	
	if (!http_request) 
	{
	alert('Cannot create XMLHTTP instance');
	return false;
	}
	http_request.onreadystatechange = alertContents;
	http_request.open('GET', url, true);
	http_request.send(null);
}

function alertContents() 
{
	if (http_request.readyState == 4) 
	{
		if (http_request.status == 200) 
		{
			//alert(http_request.responseText);
			alert(http_request.responseText);
			//document.getElementById('myspan').innerHTML = result;            
		} 
		else 
		{
			alert(http_request.status);
		}
	}
}

