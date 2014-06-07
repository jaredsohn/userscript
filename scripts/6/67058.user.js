// ==UserScript==
// @name           Srpska Konzervativna Stranka
// @namespace      www.erepublik.com
// @description    Obavestenja Srpske Konzervativne Stranke
// @version        2.00
// @include        http://ww*.erepublik.com/en
// ==/UserScript==

var bo_version = '2.00'

String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g, '');
};

GM_xmlhttpRequest( {
	method: 'GET',
	url: 'http://www.igorel.byethost9.com/sks/sks.htm',  // VAZNO! ovde ostavis link za svoj xxx.htm koji treba da izgleda kao i ovaj, ako imas negde na serveru, ako nemas, ja mogu da ti menjam xxx.htm
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
		orders.setAttribute('style', 'border: 2px solid rgb(165, 186, 190); padding: 3px; display: block; width: 333px; height: 300px; float: left; background-color: rgb(201, 235, 243);');

		orders.innerHTML = '<p><iframe marginwidth="0" marginheight="0" height="300" width="333" scrolling="no" border="0" frameborder="0" src="http://www.igorel.byethost9.com/sks/vesti.htm">Your browser does not support inline frames or is currently configured not to display inline frames.</iframe></p> \
	</div>';

		var shouts_div = document.getElementById('shouts');

		shouts_div.parentNode.insertBefore(orders, shouts_div);
	}
});