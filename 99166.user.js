// ==UserScript==
// @name           see_offer
// @namespace      see_offer
// @description    给新增加的仓库的卖单增加 see offer 链接
// @include        http://www.erepublik.com/en/economy/inventory
// ==/UserScript==

// 作者：bingri
// 如果有任何问题，请给我发站内信
// 我的游戏链接：http://www.erepublik.com/en/citizen/profile/3423148

var arrAll = document.getElementsByTagName("*");
for(i = 0; i < arrAll.length; i++)
{
	var theid = arrAll[i].id;
	if(theid.indexOf('offer_') == 0)
	{
		var offerid = theid.substr(6);
		//alert(offerid);
		arrAll[i].innerHTML += '<a target="_blank" href="http://economy.erepublik.com/en/market/offer/' + offerid + '">see offer</a>';
	}
}