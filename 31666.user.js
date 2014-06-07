// ==UserScript==
// @name           RT Online Friend Count
// @namespace      KWierso
// @description    Adds a count of currently online friends to your RT Friendslist.
// @include        http://*.roosterteeth.com*
// @exclude	http://*.roosterteeth.com/members/signin.php*
// ==/UserScript==

var frienddiv;
var _c;
(function(){

//Set username equal to your exact username on RT's site. (Including capitalization) (Also, make sure it's still in the quotes)
var username = "KWierso";

if(window.ActiveXObject){
  var httpRequest=new ActiveXObject("Microsoft.XMLHTTP");
}
else if(window.XMLHttpRequest){
  var httpRequest=new XMLHttpRequest();
}
httpRequest.open("GET",'http://'+document.domain+'/members/friends.php', true); 
httpRequest.onreadystatechange=function(){
  if(httpRequest.readyState==4){
    if(httpRequest.status==200){
		var requestParts=httpRequest.responseText;
		var _s = requestParts; // haystack
		var _m = 'ONLINE'; // needle
		_c = 0;
		for (var i=0;i<_s.length;i++)
		{
			if (_m == _s.substr(i,_m.length))
				_c++;
		} 

	getElementByClass('title');
	
	var smallTags = new Array();

    //Create Array of All HTML Tags
    var allHTMLTags=document.getElementsByTagName('*');

    //Loop through all tags using a for loop
    for (i=0; i<allHTMLTags.length; i++) 
	{
    //Get all tags with the specified class name.
    if (allHTMLTags[i].className=='userInfo') 
	{
	
    smallTags.push(allHTMLTags[i]);
    }
    }
	for(i=0; i<smallTags.length; i++)
	{
		if(smallTags[i].innerHTML == "<b>" + username + "</b>")
		{
			//smallTags[i].innerHTML += " (" + _c + ")";
			smallTags[i].title = "Online Friends: " + _c;
			break;
		}
	}
		}

	else{

	window.console=window.console||{log:opera.postError}||{log:alert};

	console.log("Error loading friends page\n"+ httpRequest.status +":"+ httpRequest.statusText);

      }

    }

  };

httpRequest.send(null);

})();





    /* getElementByClass*/

    /**********************/



    var allHTMLTags = new Array();
	var titleTags = new Array();
	
    function getElementByClass(theClass) 
	{
    //Create Array of All HTML Tags
    var allHTMLTags=document.getElementsByTagName('*');
    //Loop through all tags using a for loop
    for (i=0; i<allHTMLTags.length; i++) 
	{
    //Get all tags with the specified class name.
    if (allHTMLTags[i].className==theClass) 
	{
		titleTags.push(allHTMLTags[i]);
    }
    }

	for(i=0; i<titleTags.length; i++)
	{
		if(titleTags[i].innerHTML == "My Friends")
		{
			titleTags[i].innerHTML += " - (" + _c + " online)";
			break;
		}

	}
    }