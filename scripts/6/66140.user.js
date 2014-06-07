// ==UserScript==
// @name           eEE_BattleOrders
// @namespace      www.erepublik.com
// @description    Battle orders script for the eEstonia community on eRepublik
// @version        0.30
// @include        http://*.erepublik.com/*
// ==/UserScript==

//------------------------------------------------------------------------------
// 	Changelog
//------------------------------------------------------------------------------
// + Display version (thx Metallium)
// + Link to script (from version)
// ! Grabbing correct data from forumotion.com
// ! More complete way to parse the orders.
// ?!? Changed it a little bit.
// 0.25 - 2010.01.08 - Renka: Modified layout. Now works also correctly in Opera.
// 0.26 - 2010.01.09 - Renka: Fixed bug where whole code was executed on every single page load.
// 0.27 - 2010.01.09 - Renka: Changed datasource and data format. Now using JSON. Added update notification if version is not the newest.
// 0.28 - 2010.01.09 - Renka: Fixed header rendering in Opera.
// 0.29 - 2010.01.09 - Renka: Changed @include rule back to the old version - it's better. Added links to Lõuna-Eesti and Kesk-Eesti to fight page.
// 0.30 - 2010.11.10 - Renka: Removed hospital links
//------------------------------------------------------------------------------

var bo_version = '0.30'

String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g, '');
};

// Front page
// * Battleorders
if( document.getElementById('homepage') )
{
	GM_xmlhttpRequest( {
		method: 'GET',
		url: 'http://foorum.e-eesti.eu/orders_wrap.php?version='+bo_version, 
		onload:function(response)
		{
			var text = response.responseText;
			var JSON = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(text.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + text + ')');

			if( typeof JSON == 'object' )
			{
				var orders = document.createElement('div');
				orders.setAttribute('class', 'box');
				orders.setAttribute('id', 'ekvOrders');
				orders.setAttribute('style', 'display: block; float: left;');

				var new_version = '';
				if ( bo_version < JSON.version){
					var new_version = '<a href="'+JSON.version_url+'" style="font-size:9px;float:right;color:#cc0000;" target="_blank">uus versioon</a>';
				}
				orders.innerHTML = '<div class="title"><h1>'+JSON.header+'</h1><a href="http://www.erepublik.com/en/battles/mybattlelist" style="font-size:9px;float:right;">Ainult parimatele</a></div> \
				<div class="core"> \
					<div style="float:left;width: 60px;"> \
						<a href="'+JSON.article_url+'"><img class="test" alt="Region under attack" src="/images/parts/icon_military_93.gif" /></a> \
					</div> \
					<div class="holder" style="float:left;width:270px;"> \
						<p><b>Link:</b> <a href="'+JSON.battle_url+'">'+JSON.battle_name+'</a></p> \
						<p><b>Juhised:</b> '+JSON.description+'</p> \
						<p>'+JSON.days+'</p> \
						'+new_version+' \
					</div> \
				</div>';

				var shouts_div = document.getElementById('shouts');

				shouts_div.parentNode.insertBefore(orders, shouts_div);

				if(typeof sIFR == "function") {
					sIFR.replaceElement(named({sSelector:"#ekvOrders h1", sFlashSrc:"/flash/delicious.swf", sColor:"#737373", sLinkColor:"null", sBgColor:"null", sHoverColor:"null", nPaddingTop:1, nPaddingBottom:1, sFlashVars:"", sWmode:"transparent"}));
				}
				else if(typeof unsafeWindow.sIFR == "function") {
					unsafeWindow.sIFR.replaceElement(unsafeWindow.named({sSelector:"#ekvOrders h1", sFlashSrc:"/flash/delicious.swf", sColor:"#737373", sLinkColor:"null", sBgColor:"null", sHoverColor:"null", nPaddingTop:1, nPaddingBottom:1, sFlashVars:"", sWmode:"transparent"}));
				}
			}
		}
	});
}

// This function inserts newNode after referenceNode
function insertAfter( newNode, referenceNode )
{
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}
