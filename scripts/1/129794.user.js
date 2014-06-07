// ==UserScript==
// @name           apina helper
// @namespace      apina_helper
// @description    shows urls to the pics and lists the last shown random pictures in the footer
// @include        http://apina.biz/*
// @include        http://apinaporn.com/*
// @version        0.1.1
// ==/UserScript==

	function Delete_Cookie( name, path, domain ) {
if ( name ) {
document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
//alert("del function: " + name);
}
}

var pic = document.getElementById("big_image");
var urlOut = pic.firstElementChild.firstChild.getAttribute("src");

var out = document.getElementById("image_caption");
//out.firstElementChild.innerHTML = out.firstElementChild.innerHTML  + "<br>" + urlOut;


var link = document.createElement("a");
    link.setAttribute("href", urlOut);
	link.setAttribute("target", "_blank");
    var text = document.createTextNode("URL to picture: " + urlOut);
    link.appendChild(text);
    out.insertBefore(link, out.firstChild); //insert link under the picture
	
	urlOut_big = urlOut.replace("/medium/m_","/full/");
	var link_big = document.createElement("a");
    link_big.setAttribute("href", urlOut_big);
	link_big.setAttribute("target", "_blank");
    var text_big = document.createTextNode("URL to full picture: " + urlOut_big);
    link_big.appendChild(text_big);
   // out.insertBefore(link_big, out.firstChild); //insert link under the picture
	
	
	var big = document.createElement('div');
	big.setAttribute('id','div1');
	big.setAttribute('style','background-color:pink');
	big.innerHTML="Links: \n";
	out.appendChild(big);
	big.appendChild(link_big);
	
	
	var normalSize = document.createElement('div');
	normalSize.setAttribute('id','div1-normal-size');
	normalSize.setAttribute('style','background-color:grey');
	normalSize.innerHTML="Links: \n";
	out.appendChild(normalSize);
	normalSize.appendChild(link);
	
	
	
	//save previous randoms in the cookies:
	var date = new Date();
	
	for(i=1; i<=5; i++)
	{
	var link = document.getElementById("randoms").children[i].firstChild.firstChild.getAttribute("src");
	document.cookie = "link" + i + date.getUTCHours()+date.getUTCMinutes()+date.getUTCSeconds() + "=" + link + "; expires = \"\"; path=/";
	}	
	
	//output of random links:
	var rands = document.createElement('div');
	rands.setAttribute('id','randomsList');
	rands.innerHTML+="Previous randoms:<br>";
	rands.setAttribute("style", "color: pink");
	document.getElementById("footer").appendChild(rands);
	
	var countCookies=0;
	
	var cookies = document.cookie.split(";"); 
	for (i = 0; i<cookies.length; i++)
	{
		cookies = document.cookie.split(";"); 
		if(cookies.length>40)
		{
			var deleteCookies = true;
		}
	
		var cookieName = cookies[i].split("=")[0].trim();
		if(cookieName.match("link"))	
		{
			countCookies++;
			if(countCookies<5 && deleteCookies==true)
			{
				Delete_Cookie(cookieName, "", "/");
				deleteCookies=false;
				countCookies=0;
	//alert("delete!!");
			}else
			{	
			var picRandomURL = cookies[i].split("=")[1].trim();
			var picRandomURLBig = picRandomURL.replace("thumbs/t_", "full/");
			var pic = document.createElement("img");
			pic.setAttribute("src", picRandomURL);
	
			var linkRandom = document.createElement('a')
			linkRandom.setAttribute('href', picRandomURLBig);
			linkRandom.setAttribute("target", "_blank");
			linkRandom.appendChild(pic);
			rands.appendChild(linkRandom);
			}
		}
	}
	
	
