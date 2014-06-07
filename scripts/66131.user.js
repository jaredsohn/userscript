// ==UserScript==
// @name         amazon with google books
// @author       kamo
// @namespace    http://www.yasui-kamo.com/
// @description  Add google books link in amazon search result page and product page.
// @include      http://www.amazon.*/*
// @include      https://www.amazon.*/*
// ==/UserScript==

var w = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var isbnList = new Array();

//get isbn
function getISBN(url)
{
	//get isbn
	var isbn = 0;
	var isbn_ePos;
	var isbn_sPos = url.indexOf("/dp/");
	if(isbn_sPos != -1)
	{
		isbn_ePos = url.indexOf("/", isbn_sPos+4);
		isbn = url.substring(isbn_sPos+4, isbn_ePos);
		return isbn;
	}
	var isbn_sPos = url.indexOf("asin=");
	if(isbn_sPos != -1)
	{
		isbn = url.substring(isbn_sPos+5, isbn_sPos+15);
		return isbn;
	}
}

//google api load started
function googleLoadAPI(isbn) {
	var key = 'ISBN:'+isbn;
	isbnList[key] = isbn;
	var script = document.createElement('script');
	script.src = 'http://books.google.com/books?bibkeys=ISBN:'+isbn+'&jscmd=viewapi&callback=createLink';
	script.type = "text/javascript";
	document.getElementsByTagName('head')[0].appendChild(script);
}

//google api loading
w.createLink = function(bookObj){
	var gBookData;
	eval(bookObj);
	for(var i in bookObj){gBookData = bookObj[i];}
	if(gBookData)
	{
		if(gBookData.embeddable == true && gBookData.preview != 'noview')
		{
			var url = gBookData.preview_url;
			var isbn = isbnList[gBookData.bib_key];
			document.getElementById(isbn).innerHTML = "<a href=\""+url+"\" target=\"_blank\"><img id=\"img_"+isbn+"\" style=\"border-style:none;\" src=\"http://www.google.com/intl/en/googlebooks/images/gbs_preview_sticker1.gif\" /></a>";
			document.getElementById("img_"+isbn).style.setProperty('width', '69px', 'important');
			document.getElementById("img_"+isbn).style.setProperty('height', '23px', 'important');
		}
	}
};

function checkBookInfo()
{
	var imageSize = 0;

	if(document.getElementById('ASIN'))
	{
		var category = document.getElementById("storeID").value;
		if(category == "books" || category == "english-books")
		{
			//create google book link
			var asin = document.getElementById("ASIN").value;
			var insertObj = document.getElementById("prodImageCell");
			var checkVal = insertObj.getAttribute("checkgbooks");
			if(checkVal != "true")
			{
				var curDiv = document.createElement('div');
				curDiv.setAttribute("id", asin);
				insertObj.insertBefore(curDiv, insertObj.childNodes[0]);
				googleLoadAPI(asin);
				insertObj.setAttribute("checkgbooks", "true");
			}
		}
		return;
	}
	else
	{
		var checkBookPage = 0;
		var optionList = document.getElementsByTagName("option");
		for (var i = 0; i < optionList.length; i++) { 
			var optionVal = optionList[i].getAttribute("value");
			var selectedVal = optionList[i].getAttribute("selected");
			if((optionVal == "search-alias=stripbooks" || optionVal == "search-alias=english-books") && selectedVal == "selected")
			{
				checkBookPage = 1;
				break;
			}
		}
		if(checkBookPage == 0)
		{
			return;
		}

		var linkList = document.getElementsByTagName("a");

		//check search result
		for (var i = 0; i < linkList.length; i++) { 
			var imgObj = linkList[i].getElementsByTagName('img');
			if(imgObj.length > 0)
			{
				var linkObj = linkList[i].href;
				var checkVal = linkList[i].getAttribute("checkgbooks");
				if((linkObj.indexOf("s=books") != -1 || linkObj.indexOf("s=english-books") != -1) && checkVal != "true")
				{
					var isbn = getISBN(linkObj);
					if(isbn == 0) {
						continue;
					}

					//create google book link
					var curDiv = document.createElement('div');
					curDiv.setAttribute("id", isbn);
					linkList[i].parentNode.insertBefore(curDiv, linkList[i]);
					googleLoadAPI(isbn);
					linkList[i].setAttribute("checkgbooks", "true");
					imageSize++;
				}
			}
		}
	}
	setTimeout(checkBookInfo, 1000);
}

//main
(function(){
	checkBookInfo();
}
)();

