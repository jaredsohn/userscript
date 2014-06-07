// ==UserScript==
// @include        http://loading.se/*
// @name Loading backfix
// ==/UserScript==

// Ta bort länken till bakgrundsreklamen
function removeAd()
{
	if(document.body)
	{
		var head = document.head;
		var a = head.firstChild;
		while(a)
		{
			if(a.nodeName=="STYLE")
			{
				head.removeChild(a.nextSibling);
				head.removeChild(a);
				break;
			}

			a = a.nextSibling;
		}
		
		$("body").click(function(evt){
			evt.stopImmediatePropagation();
			$("body").unbind();
		});
	}
	else setTimeout(arguments.callee, 64);
}

setTimeout(function(){removeAd();}, 256);