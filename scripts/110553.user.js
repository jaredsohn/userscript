// ==UserScript==
// @author         Nimesin
// @name           Campaign of the Day
// @namespace      erepublik@nimesin.com
// @description    Campaign of the Day replace on main & campaigns page
// @version        0.4.4
// @include        http://www.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

orders='<br>';
indx=0;

//var links=$('a').attr('href');
/*
$('a').each(function(link)
{
	orders+=link.html()+'; ';
}
);
*/
//bod_listing
orders=$('.bod_listing li a').attr('href');
orderLink=orders;
region=$('.bod_listing li a:first span').text();
if(region=='Fight') region=$('.bod_listing li strong').text();

//orders=$('#battle_listing ul li a').attr('href');
//region=$('#battle_listing ul li strong').text();
	//alert(orders);
warLink='http://nimesin.erep.lt/erep/orders/img.php?stars=starNum&title=imgTitle&order=battleOrder&priority=battlePriority&flags=1&rounds=1&size=12&war=';
battleLink='http://nimesin.erep.lt/erep/orders/img.php?stars=starNum&title=imgTitle&order=battleOrder&priority=battlePriority&flags=1&size=12&rounds=1&battle=';
orders=orders.replace('/en/wars/show/',warLink);
orders=orders.replace('/en/military/battlefield/',battleLink);
orders=orders.replace('starNum','5');
orders=orders.replace('imgTitle','Ministry of Defence');
orders=orders.replace('battleOrder',region);
orders=orders.replace('battlePriority','Priority');

//http://nimesin.erep.lt/erep/orders/img.php?stars=starNum&title=imgTitle&order=battleOrder&priority=battlePriority&flags=1&battle=
orders='<a href="'+orderLink+'"><img src="'+orders+'"></a>';
  addDiv('#battle_listing .bod_listing',region,orders) ;


function addDiv(toSelector,caption,str)
{
	var div='<div class="box">';// style="width: 130px;">
	//div+='<div class="item elem" style="background-color: #E9F5FA; width: 315px; padding: 1px 7px 1px 7px ">';
	//div+='<p style="color: #90BCC9; width: 310px; font-weight: bold; font-size: 11px">'+caption+': </p>';
	div+='<div class="holder" style="background-color: #FFFFFF; width: 310px; color: #B5D6E1">'+str+'</div>';
	div+='</div>';//</div>';

	//$(toSelector).before(div);
	$(toSelector).html(div);
}