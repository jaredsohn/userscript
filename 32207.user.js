// ==UserScript==
// @name          Parser
// @namespace     http://124.10.55.22
// @description   Parser for someway....
// @include       http://tw.search.bid.yahoo.com/search/ac?p=*
// ==/UserScript==

var URL = "";
var setup = "set.php";

var object,title,imgs,price,time,num,temp,page,str,k;

if(location.host == "tw.search.bid.yahoo.com")
{
	//===DOM start ====================================================================================================================================================
	page=document.getElementById("yausmchinf").getElementsByTagName("div")[2].getElementsByTagName("strong")[0].lastChild.nodeValue;
	num = document.getElementById("yausmchinf").getElementsByTagName("div")[2].getElementsByTagName("strong")[2];
	if(num.lastChild.nodeValue >= 50)   num=50;
	else           num=num.lastChild.nodeValue;

	object=document.getElementById("yausimgpic").getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
	for(var i=0, j=0; i <= num ; i++, j++)
	{
		if(i==((document.getElementById("yausimgpic").getElementsByTagName("table")[0].getElementsByTagName("tr").length-1)/2))
		{
			object=document.getElementById("yausimgpic").getElementsByTagName("table")[1].getElementsByTagName("tbody")[0];
			j-=i;
			//alert(((document.getElementById("yausimgpic").getElementsByTagName("table")[0].getElementsByTagName("tr").length-1)/2)+"\n"+i+"  "+j);
		}

		title=object.getElementsByTagName("th")[j].getElementsByTagName("a")[0];
		imgs=object.getElementsByTagName("tr")[(j*2)+1].getElementsByTagName("td")[0].getElementsByTagName("img")[0];
		price=object.getElementsByTagName("tr")[(j*2)+1].getElementsByTagName("td")[1].getElementsByTagName("strong")[0].lastChild;
		time=object.getElementsByTagName("tr")[(j*2)+1].getElementsByTagName("td")[5].lastChild;
		if(time.nodeValue == null)	
			time = object.getElementsByTagName("tr")[(j*2)+1].getElementsByTagName("td")[5].getElementsByTagName("span")[0].lastChild;
		//-----------------------------------------------------------------------------------
		temp=title.lastChild.nodeValue.split("\n");
		str="";
		for(k=0;k<temp.length;k++){
			str+=temp[k];
		}
		temp=str.split("&");
		str="";
		for(k=0;k<temp.length;k++){
			str+=temp[k];
			if(k+1 != temp.length) str+="/";
		}
		temp=str.split("'");
		str="";
		for(k=0;k<temp.length;k++){
			str+=temp[k];
			if(k+1 != temp.length) str+="/";
		}
		//-----------------------------------------------------------------------------------------
		//alert('price='+price.nodeValue+'\ntitle='+str+'\na='+title.href+'\nimgs='+imgs.src+'\ntime='+time.nodeValue);
		GM_xmlhttpRequest({
			method: 'GET',
			url: URL+setup+'?price='+price.nodeValue+'&title='+str+'&a='+title.href+'&imgs='+imgs.src+'&time='+time.nodeValue,
			onload: function(details) {
					//alert("i = "+i);
			}
		}); 
	}
}
//================= end of code=======================================================================================================================================




//#############################################################################
//var request = null;
/*function createRequest() {
 try {
   request = new XMLHttpRequest();
 } catch (trymicrosoft) {
   try {
	 request = new ActiveXObject("Msxml2.XMLHTTP");
   } catch (othermicrosoft) {
	 try {
	   request = new ActiveXObject("Microsoft.XMLHTTP");
	 } catch (failed) {
	   request = null;
	 }
   }
 }

 if (request == null)
   alert("Error creating request object!");
}*/
//createRequest();
//#############################################################################

//======================================================================================
//正常伺服器端傳送方式
/*request.open("POST","set.php",true);
  request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  request.send("price="+price.nodeValue+"&title="+str+"&a="+title.href+"&imgs="+imgs.src);*/
//======================================================================================

//--------------------------------------------------------------------------------------------------------------------------------------------
/*GM_xmlhttpRequest({
			method: 'POST',
			url: encodeURI('set.php'),
			headers: {"Content-Type":"application/x-www-form-urlencoded"},
			data: {"price="+price.nodeValue+"&title="+str+"&a="+title.href+"&imgs="+imgs.src},
			onload: function(request) {
					alert("YES!!\n"+requset.responseText);
			}
});//GM專用函式(測試中....POST)
//--------------------------------------------------------------------------------------------------------------------------------------------*/
