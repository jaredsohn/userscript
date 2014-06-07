// ==UserScript==
// @name           Facebook World War auto fight
// @namespace      http://apps.facebok.com/world-war/
// @description    Auto fight in Facebook - World War apps
// @include        http*://apps.facebook.com/world-war/*?uid=*
// ==/UserScript==

var a = document.getElementsByClassName('blue clickable')[0];
var itemCount = document.getElementsByClassName('item');
var refresh_time = 3000; // 3000 = 3 sec
var c;

for (i=0;i< itemCount.length;i++)
{
		if (itemCount[i].getAttribute('style') == "width: 112px; margin-right: 40px; margin-top: 8px; font-size: 0px;")
		{
			if (itemCount[i].getElementsByTagName('span')[0].innerHTML.search(/\//) != -1 )
			{
				c = itemCount[i].getElementsByTagName('span')[0].innerHTML;
				c = c.substr(0, c.search(/\//));
			}
			else
			{
				c = itemCount[i].getElementsByTagName('img')[0].getAttribute('width') ;
				c = c.substr(0,c.length-1);				
			}
			
		}
		
}

if (( a != null ) &&  ( c > 0 ))
{

	
	if (window.location.href.search(/failed/) == -1)
	{
		window.setTimeout( function(){click_event( a );}, refresh_time );
	}
	else
	{
		closeTab();
		//alert(" golden close");
	}
}
else
{
	closeTab();
	//alert("close");
}



function click_event(obj)
{
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	obj.dispatchEvent(evt);	
}


function closeTab()
{
	window.open('', '_self', '');
	window.close();
}