// ==UserScript==
// @name           Transformice
// @description    Full Screen Transformice On Any Transformice Server
// @author         Turnerj
// @include        *
// ==/UserScript==

function tfm()
{
	var searchFor = new Array("ChargeurTransformice.swf","Transformice.swf","transformice");
	function isTransformice(o)
	{
		for (var i = 0; i < searchFor.length; i++)
		{
			if (o.src&&o.src.match(searchFor[i])){return true;}
			else if (o.data&&o.data.match(searchFor[i])){return true;}
		}
		return false;
	}
	function getAddress(o)
	{
		return (o.src&&isTransformice(o) ? o.src : o.data);
	}
	function loop(emb)
	{
		for (var i = 0; i < emb.length; i++)
		{
			if (isTransformice(emb[i]))
			{
				document.body.innerHTML = '<object style="position:absolute;left:0px;top:0px;width:100%;height:100%;" id="MiniJeux" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param value="noscale" name="scale"><param value="always" name="allowScriptAccess"><param value="'+getAddress(emb[i])+'" name="movie"><param value="true" name="menu"><param value="high" name="quality"><param value="#6A7495" name="bgcolor"><embed style="position:absolute;left:0px;top:0px;width:100%;height:100%;" scale="noscale" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowscriptaccess="always" swliveconnect="true" name="Transformice" bgcolor="#6A7495" quality="high" menu="true" flashvars="allowfullscreen=false" src="'+getAddress(emb[i])+'"></object>';
				return true;
			}
		}
		return false;
	}
	
	if (!loop(document.getElementsByTagName("embed")))
	{
		if (loop(document.getElementsByTagName("object")))
		{clearInterval(window.transformiceInt);return;}
	}
	else{clearInterval(window.transformiceInt);return;}
	
	window.transformiceCount++;
	if (window.transformiceCount==10)
	{clearInterval(window.transformiceInt);return;}
}
window.transformiceCount = 0;
window.transformiceInt = setInterval(tfm,1000);
