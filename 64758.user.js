// ==UserScript==
// @name           Demokratska Stranka Srpske
// @namespace      www.erepublik.com
// @description    Obaveštenja od Demokratske Stranke Srpske na eRepubliku
// @version        1.00
// @include        http://ww*.erepublik.com/en
// ==/UserScript==

var bo_version = '1.01'

String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g, '');
};

GM_xmlhttpRequest( {
	method: 'GET',
	url: 'http://alas.matf.bg.ac.rs/~mi07052/szr/dss.htm', 
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
		orders.setAttribute('style', 'border: 2px solid rgb(165, 186, 190); padding: 3px; display: block; width: 333px; height: 135px; float: left; background-color: rgb(201, 235, 243);');

		orders.innerHTML = '<div class="box" style="font-size:8px;float:right;"><p><a href="http://userscripts.org/scripts/show/64758">Verzija '+bo_version+'</a></p></div> \
		<span style="font-size: 20px;"><a href="'+tmp[1]+'">'+tmp[0]+'</a></span><br><br>\
		<div class="holder" style="padding-left:50px;width:285px;"> \
		<p><b>Obaveštenje:</b> <a href="'+tmp[3]+'">'+tmp[2]+'</a></p> \
		<p><b>Brčko:</b> <a href="'+tmp[5]+'">'+tmp[4]+'</a></p> \
		<p><b>Istočna Srpska:</b> <a href="'+tmp[7]+'">'+tmp[6]+'</a></p> \
		<p><b>Federacija:</b> <a href="'+tmp[9]+'">'+tmp[8]+'</a></p> \
		<p><b>Zapadna Srpska:</b> <a href="'+tmp[11]+'">'+tmp[10]+'</a></p> \
		<div class="box"><p>'+tmp[12]+'</p></div> \
	</div><div class="iconholder" style="margin-top:-1px;"> \
		<img class="test" alt="Skupstina" src="/images/parts/icon_position_politics_congressman.gif"/> \
	</div>';

		var shouts_div = document.getElementById('shouts');

		shouts_div.parentNode.insertBefore(orders, shouts_div);
	}
});