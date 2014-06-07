// ==UserScript==
// @name           BattleLinksEng
// @namespace      hwmHome
// @include        http://www.lordswm.com/*

var a = document.getElementsByTagName( 'a' ) ;
var el;
//alert(a.length);
for (var i=0; i < a.length; i++)
{
	el = a[i];
	if (el.href.indexOf('/warlog.php?') >= 0)
	{
		//alert('Gotcha');
		sa = document.createElement( 'a' );
		//sa.href = el.href + '&lt=-1';
		sa.href = el.href.replace("warlog.php", "pseudowarlog.php");
		sa.innerHTML = '[Full]';
		
		ba = document.createElement( 'a' );
		ba.href = el.href.replace("warlog.php", "battlechat.php");
		ba.innerHTML = '&nbsp;[Chat]';
		
		el.parentNode.insertBefore(ba, el.nextSibling);
		el.parentNode.insertBefore(sa, el.nextSibling);
	}
}
for (var i=0; i < a.length; i++)
{
	el = a[i];
	if (el.href.indexOf('/pseudowarlog.php?') >= 0)
	{
		//alert('Gotcha');
		el.href = el.href.replace("pseudowarlog.php", "warlog.php");
		el.href = el.href + '&lt=-1';

	}
}


// ==/UserScript==