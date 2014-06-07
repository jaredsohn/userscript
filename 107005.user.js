// ==UserScript==
// @name           Butter 0.5
// @namespace      Butter 0.5
// @include        http://www.jeuxvideo.com/*
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
  
 function IgnoreListUpdate(username) {
    var check=getCookie("UserList");

	if(check!=null)
	   { 

	     var NewUserlist = check+"/"+username;
		 document.cookie= "UserList="+NewUserlist;
		 }
	else
	   {
	     document.cookie= "UserList="+username;
		}
	    }
	
	function ClearIgnoreList(username) {
	 var container = getCookie("UserList");
	 var goodname = username+"/";
	 var lastcontainer = container.replace(goodname,"");
	 if(lastcontainer==container && username != null && username != "")
	 { 
	     goodname= "/"+username
	    lastcontainer = container.replace(goodname,"");
		if(lastcontainer==container)
		  {
		     lastcontainer = container.replace(username,"");
			    if(lastcontainer == container)
				{
				  alert("Le pseudo "+username+"n\'est pas dans la liste");
				 }
				 else
				 {
				     document.cookie= "UserList="+lastcontainer;
					 }
			}
		else
         {		
		    document.cookie= "UserList="+lastcontainer;
		}
		}
	else
     {
         document.cookie= "UserList="+lastcontainer;
     }		 
    }
   function CheckIfIgnore(){
   var Pseudo  = getCookie("UserList").split("/");
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
	if(TopicPseudo.length != 0 && TopicPseudo.length != null)
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
	
	}
	if(PagePseudo.length != 0 || PagePseudo.length != null)
{
    if(Pseudo.length != 0 || Pseudo.length!= null)
   {
     var PagePseudo = getElementsByClass("pseudo",document,"li");
	 for(i=0;i<PagePseudo.length;i++)
	 {
	 Content[i] = XPCNativeWrapper.unwrap(PagePseudo[i].firstChild.nextSibling.firstChild);
	 
	    for(n=0;n<Pseudo.length;n++)
		{ 
			 if(Pseudo[n] == Content[i].data.toLowerCase())
			 {
			     var divRemover = XPCNativeWrapper.unwrap(Content[i].parentNode.parentNode.parentNode.parentNode);
				 divRemover.parentNode.removeChild(divRemover);
			}
		}
	}
	}
	}		
	 
     
   
   }

  
    document.addEventListener('keypress' , function(e) {  
    var keycode;  
    if (window.event) keycode = window.event.keyCode;  
    else if (e) keycode = e.which;  
    var e = e || window.event;  
    if(keycode==122 && e.altKey){  
      var userName = prompt('Quel pseudo voulez-vous ignorer?');
	if( userName != null && userName != "" && userName != " " && userName != 0)
	{
	IgnoreListUpdate(userName.toLowerCase());
	}  
    }
	else if(e.which == 120 && e.altKey)
	{ var kay = "/"
	var userName = prompt('Quel pseudo voulez-vous enlever de la liste suivante : ' + getCookie("UserList").replace(/\//g," , "));
	if( userName != null && userName != "" && userName != " " && userName != 0)
	{
	ClearIgnoreList(userName.toLowerCase());
	}
	}	
  }, false);
  
  CheckIfIgnore();