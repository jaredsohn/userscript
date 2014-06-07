// ==UserScript==
// @name           SNO Garda Naredjenja
// @namespace      www.erepublik.com
// @description    Naredjenja SNO Garde
// @Author         Ravnogorac
// @version        1.00
// @include        http://ww*.erepublik.com/en
// ==/UserScript==

var bo_version = '1.00'

String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g, '');
};

GM_xmlhttpRequest( {
	method: 'GET',
	url: 'http://www.kide83.com/erepublik/ses/ses.htm',  // VAZNO! ovde ostavis link za svoj xxx.htm koji treba da izgleda kao i ovaj, ako imas negde na serveru, ako nemas, ja mogu da ti menjam xxx.htm
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
		orders.setAttribute('style', 'border: 0px solid rgb(165, 186, 190); padding: 3px; display: block; width: 325px; height: 120px; float: left; background-color: rgb(233, 245, 250);');

		orders.innerHTML = '<p><iframe marginwidth="0" marginheight="0" height="120" width="325" scrolling="no" border="0" frameborder="0" src="http://www.esrbija.info/komanda.htm">Your browser does not support inline frames or is currently configured not to display inline frames.</iframe></p> \
	</div>';

		var shouts_div = document.getElementById('shouts');

		shouts_div.parentNode.insertBefore(orders, shouts_div);
	}
});