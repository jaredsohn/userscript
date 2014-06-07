// ==UserScript==
// @name           new_cococomic
// @namespace      cococomic
// @include        http://*.cococomic.com/*
// ==/UserScript==
iframe=document.getElementsByTagName("iframe")[0];
iframe.parentNode.removeChild(iframe);
Cc=document.getElementById("Cc1");
Cc.parentNode.removeChild(Cc);
window.heavyImages=Array();
//unsafeWindow.pagea+'.htm?v='+unsafeWindow.pagea+"*s="+unsafeWindow.servera
if (unsafeWindow.servera)
{	
	if(!unsafeWindow.pagea)
		unsafeWindow.pagea=1;
	sSvNo=unsafeWindow.servera;
	if(sSvNo== "") sSvNo = "1";
	window.sDomain = "";
	if(sSvNo == "1")
	window.sDomain = "http://76-01.99770.com/";
	else if(sSvNo == "2")
	window.sDomain = "http://16-02.99770.com/";
	else if(sSvNo == "3")
	window.sDomain = "http://136-03.99770.com/";
	else if(sSvNo == "4")
	window.sDomain = "http://222.comicservers.com/dm04/";
	else if(sSvNo == "5")
	window.sDomain = "http://76-05.99770.com/";
	else if(sSvNo == "6")
	window.sDomain = "http://16-06.99770.com/";
	else if(sSvNo == "7")
	window.sDomain = "http://16-07.99770.com/";
	else if(sSvNo == "8")
	window.sDomain = "http://76.99770.com/";
	else if(sSvNo == "9")
	window.sDomain = "http://222.comicservers.com/dm09/";
	else if(sSvNo == "10")
	window.sDomain = "http://232-10.99770.com/";
	else if(sSvNo == "11")
	window.sDomain = "http://39.99770.com/dm10/";
	else if(sSvNo == "12")
	window.sDomain = "http://39.99770.com/dm11/";
	else if(sSvNo == "13")
	window.sDomain = "http://39.99770.com/dm12/";
	else
	window.sDomain = "http://other.99770.com";
	//alert(window.sDomain);

	//document.getElementById("picture").childNodes[0].removeAttribute("href")

	window.downloadAllContent = function downloadAllContent(id){

		var url=id;

		if (url==null){

			//window.body.appendChild(window.toptop);

		return;

		}

		else{

			if (!url.match(/http/))

			url=window.location.href.match(/.*\//)+url;
			//alert("url"+url)

		GM_xmlhttpRequest({

	    method: 'GET',

	    url: url,

	    headers: {

		'User-Agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.4) Gecko/2008111317 Ubuntu/8.04 (hardy) Firefox/3.0.4',

		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*'+'/'+'*;q=0.8',

		'Accept-Language': 'en-us,en;q=0.5',

		'Accept-Encoding': 'gzip,deflate',

		'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',

		'Keep-Alive': '300',

		'Connection': 'keep-alive',

		'Cookie': 'BD_UTK_DVT=1; BD_UTK_DVT=1; rtime=2; ltime=1228994814300; cnzz_eid=33662101-http%3A//www.cococomic.com/Comic/170/; cnzz_a30006679=8',

		'Cache-Control': 'max-age=0',
		'Referer': 'http://www.cococomic.com/0/3787/40723/3.htm?v=3*s=8',

		//'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		//Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8

		//'Accept': 'application/atom+xml,application/xml,text/xml'

	    },

	    onload: function(responseDetails) {
			//alert("1")

			var responseXML=document.createElement("div");

			responseXML.innerHTML=responseDetails.responseText;
			//alert(responseXML.innerHTML)
			if(!responseXML.innerHTML.match(/\/ok.*(jpg|JPG)(?=";var picurl1)/))
			return
			//alert("2")
			//alert(responseXML.innerHTML);
			//alert(responseXML.innerHTML.match(/\/ok.*jpg(?=";var picurl1)/));

			//var newDoc = document.implementation.createDocument("","",null)

			//newDoc.appendChild(responseXML);
			unsafeWindow.pagea=parseInt(unsafeWindow.pagea)+1;

			try{
			//if(window.url==newDoc.getElementById('pic').parentNode.href)
			//return

			window.url=unsafeWindow.pagea+'.htm?v='+unsafeWindow.pagea+"*s="+unsafeWindow.servera;

			

			var picURL=window.sDomain+responseXML.innerHTML.match(/\/ok.*(jpg|JPG)(?=";var picurl1)/)[0];

			}

			catch(e){

				//window.body.appendChild(window.toptop);

			}
			var div=document.createElement('div')
			div.setAttribute("style","border:10px;text-align:center");
			var cache=document.createElement('img')
			cache.src=picURL
			div.appendChild(cache)

			window.document.getElementsByTagName("body")[0].appendChild(div)



			window.setTimeout(function(){window.downloadAllContent(String(window.url));},1000); 

			

	    }

		});



	}

	}
	//unsafeWindow.pagea=parseInt(unsafeWindow.pagea)+1;
	var URL=unsafeWindow.pagea+'.htm?v='+unsafeWindow.pagea+"*s="+unsafeWindow.servera;
	//alert(URL);

	downloadAllContent(URL);
	//else
		//window.location.href=window.location.href.match(/.*\//)+'1.htm?v=1*s='+unsafeWindow.servera
}
window.splitPage=function splitPage(url){
				var div_left=document.createElement('div')
			div_left.id=picURL+"left"

			div_left.setAttribute("style","border:10px")
			
			var div_right=document.createElement('div')
			div_right.id=picURL+"right"
			div_left.setAttribute("style","border:10px")

			//div.appendChild(cache)

			//cache.setAttribute("style","display: none;");

			//alert(cache)

			window.document.getElementsByTagName("body")[0].appendChild(div_left);
			window.document.getElementsByTagName("body")[0].appendChild(div_right);

			var heavyImage = new Image(); 
			heavyImage.src = picURL;
			//var currentPage = "pic"+unsafeWindow.pagea;
			//heavyImage.name = currentPage;
			//heavyImage.id = currentPage;
			window.heavyImages.push(heavyImage)
			var currentPage=unsafeWindow.pagea;
			//alert(currentPage)
			//alert(heavyImages[currentPage-2]);
			heavyImage.onload=window.loadRequired(heavyImages[currentPage-2],picURL);
}

window.loadRequired=function loadRequired(thepage,b){
			//var a
			var imageWidth=thepage.width;
			var imageHeight=thepage.height;
			var halfWidth=imageWidth/2;
			document.getElementById(b+"left").setAttribute("style","background: url('"+b+"') -"+halfWidth+"px 0px no-repeat;width:"+halfWidth+";height:"+imageHeight+";margin: 10px auto 10px auto;text-align:center")
			document.getElementById(b+"right").setAttribute("style","background: url('"+b+"') 0px 0px no-repeat;width:"+halfWidth+";height:"+imageHeight+";margin: 10px auto 10px auto;text-align:center")
	}