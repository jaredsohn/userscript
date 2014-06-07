// ==UserScript==

// @name           CP Prod Img Size Set

// @namespace      CP
// @include        http://www.cafepress.com/cp/members/products/index.aspx

// ==/UserScript==

(function () {	
	var prodImages = document.getElementsByTagName('img');
	for(i=0;i<prodImages.length;i++)
	{
		if(prodImages[i].src.indexOf('_150x150_') > 0)
		{

			prodImages[i].style.height = '150px';
			prodImages[i].style.width = '150px';
		}
	}
})();



