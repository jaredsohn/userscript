// ==UserScript==
// @name           Group Online Counts
// @namespace      GOC@kwierso.com
// @description    Counts online Group Participants
// @include        http://delta.roosterteeth.com/groups/profile.php*
// ==/UserScript==

var _c;
var _d = 0;
var urlstr;
(function(){

if(window.ActiveXObject){
  var httpRequest=new ActiveXObject("Microsoft.XMLHTTP");
}
else if(window.XMLHttpRequest){
  var httpRequest=new XMLHttpRequest();
}
urlstr = document.URL.replace(/profile/,"members");

httpRequest.open("GET",urlstr, true); 
httpRequest.onreadystatechange=function()
{
  if(httpRequest.readyState==4)
  {
    if(httpRequest.status==200)
	{
	
		var requestParts=httpRequest.responseText;
		

		var _s = requestParts; // haystack
		var _m = 'ONLINE'; // needle
		_c = 0;
		
		for (var i=0;i<_s.length;i++)
		{
			
			if (_m == _s.substr(i,_m.length))
				_c++;
				
		}
		
		//alert(_c);
		getElementByClass('title');
	}
	else
	{
		window.console=window.console||{log:opera.postError}||{log:alert};
		console.log("Error loading member list\n"+ httpRequest.status +":"+ httpRequest.statusText);
    }

}
		

  };
	
httpRequest.send(null);
})();


    /* getElementByClass*/
    /**********************/


    function getElementByClass(theClass) {

    //Create Array of All HTML Tags
    var allHTMLTags=document.getElementsByTagName('*');
	var titleTags = new Array();
    //Loop through all tags using a for loop
    for (i=0; i<allHTMLTags.length; i++) {

    //Get all tags with the specified class name.
    if (allHTMLTags[i].className==theClass) {
//				alert(allHTMLTags[i]);
    titleTags.push(allHTMLTags[i]);

    }
    }
	for(i=0; i<titleTags.length; i++)
	{
		//alert(titleTags[i].innerHTML);
		if(titleTags[i].innerHTML == "Group Members")
		{
			//	alert(_c);
	

			titleTags[i].innerHTML += " - (" + _c + " Online)";

			if(_c == 48)
			{
				urlstr = urlstr + "&page=2";
				if(window.ActiveXObject)
				{
					var httpRequest2=new ActiveXObject("Microsoft.XMLHTTP");
				}
				else if(window.XMLHttpRequest)
				{
					var httpRequest2=new XMLHttpRequest();
				}

				//alert(httpRequest2.readyState);    (0)
				httpRequest2.open("GET",urlstr, false); 
				//alert(httpRequest2.readyState);     (1)
				httpRequest2.onreadystatechange=countmore(httpRequest2);
				//alert(_d);
				//alert(_c);	
		
			} 
			
			
			
			
			//alert(_c);
			
			
			
			
		}
		
	}

    }
	
	function countmore(httpRequest2)
	{
		//alert(httpRequest2.readyState);
		if(httpRequest2.readyState==4)
		{
			if(httpRequest2.status==200)
			{
				alert("WTF");

			
				var requestParts2=httpRequest.responseText;
				


				var _t = requestParts2; // haystack
				var _n = 'ONLINE'; // needle
							
				for (var i=0;i<_t.length;i++)
				{
					if (_m == _t.substr(i,_n.length))
						_d++;
						//alert(_d);
				}		
				_c = _c + _d;
				//alert(_c);
			}
		}
		//titleTags[i].innerHTML += " - (" + _c + "+ Online)";
	}