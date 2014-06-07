// ==UserScript==
// @name           Hi5 Cleaner NEW Fevereiro 2010
// @description    Limpa a interface do Hi5 / Cleans Hi5's interface
// @author         Ricardo Pinto aka OpenMind
// @version        2.0
// @include        http://*.hi5.com/*
// ==/UserScript==

// Remover Sugestao de Amigos
GM_addStyle("div.friend-suggestions { visibility:hidden;display:none;}");
if(document.getElementById("friend-suggestions")) document.getElementById("friend-suggestions").style.display="none";

GM_addStyle("div#PageContentContainer { background:none;}");


// Remove imagem de fundo
/*	for (i=0; i < document.getElementsByTagName("style").length; i++) {
			if (document.getElementsByTagName("style")[i].innerHTML.match("background-image:"))
				document.getElementsByTagName("style")[i].innerHTML=" ";
	}
*/

for (i=0; i < document.getElementsByTagName("a").length; i++) {
	 // Link javascript
	 if (  document.getElementsByTagName("a")[i].href.match("trackClick.do")  !=null) {	
		var url=new Array();
		url = document.getElementsByTagName("a")[i].href.split("dest=");
		url = unescape(url[1]);
		url = url.replace("','","");
		url = url.replace("')","");
		document.getElementsByTagName("a")[i].href = url;
	}
}









// http://userscripts.org/scripts/show/58156
GM_addStyle("div#GamesToolbar { visibility:hidden;display:none;}");
GM_addStyle("div.pageLeaderAd { visibility:hidden;display:none;}");
GM_addStyle("div#PageLeader { visibility:hidden;display:none;}");

GM_addStyle("div#mrec-container { visibility:hidden;display:none; }");
GM_addStyle("div#compliments { visibility:hidden;display:none; }");

GM_addStyle("div.advertisement { visibility:hidden;display:none;}");
GM_addStyle("div.rect-300x250 { visibility:hidden;display:none;}");

GM_addStyle("div#mrec-ad-container { visibility:hidden;display:none;}");
GM_addStyle("div#hi5-ad-1 { visibility:hidden;display:none;}");

GM_addStyle("div.blue { visibility:hidden;display:none;}");







// POPUP images
// http://userscripts.org/scripts/review/40216

(function() {
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
		return [valueL, valueT];
	}
	

   window.addEventListener("load", function(e) {
    var imgList = document.getElementsByTagName("img");
	for( i=0; i < imgList.length; i++) {
		var imgName = imgList[i].src;
		var s = imgName.search(/-01.(JPG|jpg)/); 
		var s2 = imgName.search(/small.(JPG|jpg)/); 
		if( s != -1 || s2 != -1) {
			bigimage=imgName.replace(/-01./, "-02.");
			bigimage=imgName.replace(/.small/, "");
			newImg = document.createElement("img");

			ow=imgList[i].width; 
			imgList[i].addEventListener("mouseover",
				function(e){
					newX=cumulativeOffset(this)[0];
					newY=cumulativeOffset(this)[1];
					//this.style.cursor= 'pointer';
					screenWidth = document.documentElement.clientWidth;
					newImg.src=this.src.replace(/-01./, "-02.");
					newImg.src=newImg.src.replace(/small./, "");
					newImg.style.position="fixed";
					newImg.style.zIndex='999';
					newImg.style.top = "10px";
					//newImg.style.left = "20px";
					//newImg.style.border = "5px";
					//newImg.style.position = "absolute";
					//newImg.style.top=(newY-350/2).toString() + 'px'; 
				
					ow2=newImg.width
					if((newX) >= screenWidth/2)  { newImg.style.left = newX-ow2-5 + 'px'; }
					else newImg.style.left=(newX+this.width+5).toString() + 'px';
					//if((newX+ow2) >= screenWidth) { newImg.style.left = (newX-ow2-10).toString() + 'px'; }
					//else {  newImg.style.left=(newX+ow).toString() + 'px'; }
					
					//newImg.style.left=(newX+ow).toString() + 'px';
					document.body.appendChild(newImg);
				},false);
			imgList[i].addEventListener("mouseout",
				function(e){
					document.body.removeChild(newImg);
				},false);
		}
	}
	return;
  }, false);
})();



















































if(document.getElementById("notice")) {


function getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if (
aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return unescape(strReturn);
}

function getURLParam2(){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("--") > -1 ){
    //var strQueryString = strHref.substr(strHref.indexOf("--")).toLowerCase();
    var aQueryString = strHref.split("\/");
    aQueryString = aQueryString[4].split("--"); 
    strReturn = aQueryString[0];
  }
  return unescape(strReturn);
}



var userid = getURLParam("userid");

if (userid == "") userid = getURLParam2();




	//alert(document.getElementById("notice"));
	//alert(window.location.href.split("\/"));
		userdid = getURLParam(window.location.href);
        var fives = '<br/><a href="/friend/fives/displayUserFiveSummary.do?userid='+userid+' " style="display:inline;"><img src="http://images.hi5.com/images/icons/_/20x20_five.gif" align="absmiddle"> View Fives</a> ';
        var comments = '<br/><a href=\"/friend/book/displayBook.do?userid='+userid+'\" style="display:inline;"><img src="http://images.hi5.com/images/icons/_/20x20_comment.gif" align="absmiddle"> View Comments</a>';
       // links = links + "<a href=\"/friend/apps/home.do?userid="+userid+"\" class=\"sub_nav_link\">Apps</a> <span class=\"vbar\">|</span>";
       var common = '<br/><a href=\"/friend/displayCommonFriends.do?userid='+userid+'\" style="display:inline;"><img src="http://images.hi5.com/images/icons/_/20x20_addfriend.gif" align="absmiddle">Common Friends</a>';
       // links = links + "<a href=\"/friend/addBookmark.do?userid="+userid+"\" class=\"sub_nav_link\">Add Favorites</a> <span class=\"vbar\">|</span>";
        //alert(links);
	document.getElementById("user-links").innerHTML = document.getElementById("user-links").innerHTML + fives + comments;
    //alert(links)   


}

