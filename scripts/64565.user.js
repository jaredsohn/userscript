// ==UserScript==
// @name           eBiH Naredbe - Pcele
// @namespace      www.erepublik.com
// @description    Naredbe Vojske eBiH - Pcele
// @version        0.01p
// @include        http://ww*.erepublik.com/*
// ==/UserScript==

var bo_version = '0.01p'

String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g, '');
};

GM_xmlhttpRequest( {
	method: 'GET',
	url: 'http://vebih.forumotion.com/portal.htm', 
	onload:function(response)
	{
		var tmp = document.createElement('div');
		tmp.innerHTML = response.responseText;
		tmp = tmp.getElementsByClassName('body')[0].textContent.split('|');

		for(var i=0;i<tmp.length;i++)
		{
			tmp[i] = tmp[i].trim();
		}

		var orders = document.createElement('div');
		orders.setAttribute('class', 'item elem');
		orders.setAttribute('style', 'border: 2px solid rgb(165, 186, 190); padding: 3px; display: block; width: 333px; height: 100px; float: left; background-color: rgb(201, 235, 243);');

		orders.innerHTML = '<div class="box" style="font-size:8px;float:right;"><p><a href="http://userscripts.org/scripts/show/64565" target=blank>Verzija '+bo_version+'</a></p></div> \
		<span style="font-size: 20px;"><a href="'+tmp[13]+'">'+tmp[12]+'</a></span><br><br>\
		<div class="holder" style="padding-left:50px;width:285px;"> \
		<p><b>Mjesto:</b> <a href="'+tmp[16]+'">'+tmp[15]+'</a></p> \
		<p><b>Naredba:</b> '+tmp[14]+'</p> \
		<div class="box"><p>'+tmp[17]+'</p></div> \
	</div><div class="iconholder" style="margin-top:-1px;"> \
		<img class="test" alt="Pcele" src="http://vebih.forumotion.com/users/1111/13/26/73/album/pcele_10.png"/> \
	</div>';

		var shouts_div = document.getElementById('shouts');

		shouts_div.parentNode.insertBefore(orders, shouts_div);
	}
});