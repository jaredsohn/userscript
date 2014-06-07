// ==UserScript==
// @author Chamie
// @name mamba_hugephotos
// @include http://*/top/rating.phtml?rating_id=*
// @description Заменяет фотографии среднего размера в голосовании на "Топ-100" на большие.
// @version 1.0.1
// ==/UserScript==


function grow(){
	path = "//DIV[@class='Top100Photo']/IMG[contains(@src,'_huge_rating')]";
	var res = document.evaluate(path,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	a = res.singleNodeValue;
	a.setAttribute("src",a.src.replace("_rating",""));
	a.removeAttribute("width");
	a.removeAttribute("height");
}
grow();