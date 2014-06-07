// ==UserScript==
// @name	Ikariam New Colony Info (Fixed)
// @version	0.2
// @namespace	IkNCI
// @description	show level 0 colonies
// @include	http://s*.ikariam.*/index.php*island*
// ==/UserScript==
//-----------------------------------------------------------------------------

for (var i=0; i<16; i++)
{	var city = document.getElementById("cityLocation"+i);
	if (city.className == "cityLocation city level0")
	{	var node = city.getElementsByTagName("tr")[2].getElementsByTagName("a")[1];
		var cityId = parseInt(/\d+/.exec(node.href.split("&target=")[1]));
		var playerId = parseInt(/\d+/.exec(node.href.split("&avatarId=")[1]));
		var patch = document.createElement('patch');
		var onClick = "selectCity("+i+", "+cityId+", 0); selectGroup.activate(this, 'cities'); return false;"
		var innerHTML = '<a href="#" id="city_'+cityId+'" onclick="'+onClick+'">';
		innerHTML += '<span class="textLabel"><span class="before"></span>Polis<span class="after"></span></span></a>';
		patch.innerHTML = innerHTML;
		city.insertBefore(patch.firstChild, city.getElementsByTagName("ul")[0]);
		patch.innerHTML = '<a href="?view=sendIKMessage&receiverId='+playerId+'" class="messageSend" title="Nachricht schicken"><img src="skin/interface/icon_message_write.gif" alt="Nachricht schicken"/></a>'
		node = city.getElementsByTagName("tr")[2].getElementsByTagName("a")[0];
		node.innerHTML = patch.firstChild.innerHTML;
	}
}