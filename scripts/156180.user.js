// ==UserScript==
// @name          Hubski comment box maker
// @description   Make a border and slightly different-shaded background.
// @match          http://hubski.com/*
// @include        http://hubski.com/*
// @match          https://hubski.com/*
// @include        https://hubski.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function highlightComment(Index) {
var a = document.getElementsByClassName("comm");
	for(var i=0;i<=a.length;i++)
	{
		try {
		a[i].setAttribute("style","outline: 0; background-color: #FAFAFA;");
		}
		catch(Err)
		{
		//nuthing
		}
	}
try {a[Index].setAttribute("style","outline: 1px dashed #888;background-color: #F0F3FC;")}
catch(Err){}
}
(function()
{
if(document.getElementsByTagName("link")[0].href.indexOf("dark") != -1)
	{
	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.innerHTML = "function highlightComment(Index){var a=document.getElementsByClassName(\"comm\");for(var i=0;i<=a.length;i++){try{a[i].setAttribute(\"style\",\"outline: 0; background-color: #40454A;\")}catch(Err){}}try{a[Index].setAttribute(\"style\",\"outline: 1px dashed #333;background-color: #40454A;\")}catch(Err){}}"
	newScript.type = 'text/javascript';
	headID.appendChild(newScript);
	if(!window.frameElement)	//(window==window.top) get script to ignore iframes
		{			
			var a = document.getElementsByClassName("comm");
			for(var i=0;i<=a.length;i++)
			{
			try{
				a[i].parentNode.setAttribute("style","overflow: hidden;margin: 0px;padding: 2px;border: 1px solid #333;background-color: #40454A;border-radius:5px;");
				a[i].setAttribute("onclick","javascript:highlightComment(" + i + ");"); 
				}
			catch(Err)
			{
			//nuthing
			}
			}

		}
	}
else
	{
	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.innerHTML = "function highlightComment(Index){var a=document.getElementsByClassName(\"comm\");for(var i=0;i<=a.length;i++){try{a[i].setAttribute(\"style\",\"outline: 0; background-color: #FAFAFA;\")}catch(Err){}}try{a[Index].setAttribute(\"style\",\"outline: 1px dashed #888;background-color: #F0F3FC;\")}catch(Err){}}"
	newScript.type = 'text/javascript';
	headID.appendChild(newScript);
	if(!window.frameElement)	//(window==window.top) get script to ignore iframes
		{			
			var a = document.getElementsByClassName("comm");
			for(var i=0;i<=a.length;i++)
			{
			try{
				a[i].parentNode.setAttribute("style","overflow: hidden;margin: 0px;padding: 2px;border: 1px solid #EAEAEA;background-color: #FAFAFA;border-radius:5px;");
				a[i].setAttribute("onclick","javascript:highlightComment(" + i + ");"); 
				}
			catch(Err)
			{
			//nuthing
			}
			}

		}
	}

	
})();
