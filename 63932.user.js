// ==UserScript==
// @name           test
// @namespace      www.erepublik.com
// @description    test
// @version        0.01
// @include        http://ww*.erepublik.com/en
// ==/UserScript==

//------------------------------------------------------------------------------
// 	Changelog
//------------------------------------------------------------------------------
// + Display version (thx Metallium)
// + Link to script (from version)
// ! Grabbing correct data from forumotion.com
// ! More complete way to parse the orders.
//------------------------------------------------------------------------------

var bo_version = '0.02'

String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g, '');
};

GM_xmlhttpRequest( {
	method: 'GET',
	url: 'http://egreecebo.forumotion.com/portal.htm', 
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
		orders.setAttribute('style', 'border: 2px solid rgb(165, 186, 190); padding: 3px; display: block; width: 350px; height: 100px; float: left; background-color: rgb(0, 0, 0);');

		orders.innerHTML = '<div class="box" style="font-size:8px;float:right;"><p><a href="http://userscripts.org/scripts/show/58546">Εκδοση '+bo_version+'</a></p></div> \
		<span style="font-size: 20px;"><a href="'+tmp[1]+'">'+tmp[0]+'</a></span><br><br>\
		<div class="holder" style="padding-left:50px;width:285px;"> \
		<p><b>Μάχη:</b> <a href="'+tmp[4]+'">'+tmp[3]+'</a></p> \
		<p><b>Σημείωση:</b> '+tmp[2]+'</p> \
		<div class="box"><p>'+tmp[5]+'</p></div> \


		var shouts_div = document.getElementById('shouts');

		shouts_div.parentNode.insertBefore(orders, shouts_div);
	}
});