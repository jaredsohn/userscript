// ==UserScript==
// @name           Mandarake Better images
// @decription 	   Expands item thumbnails in Mandarake webshop (jp/en/ko)
// @namespace      Mandarake
// @include        http://ekizo.mandarake.co.jp/shop/en/search.do?*
// @include        http://ekizo.mandarake.co.jp/shop/en/category*
// @include        http://ekizo.mandarake.co.jp/shop/ja/search.do?*
// @include        http://ekizo.mandarake.co.jp/shop/ja/category*
// @include        http://ekizo.mandarake.co.jp/shop/ko/search.do?*
// @include        http://ekizo.mandarake.co.jp/shop/ko/category*
// ==/UserScript==

/*Edit this line to adjust the width of new thumbnails*/
var imgWidth = 300;


/*ensures number is printed with at least three digits by adding leading zeroes*/
function numberToPaddedString ( number )
{
	if ( number && !isNaN(number))
		if ( number < 10) return "00" + number;
		else if ( number < 100) return "0" + number;
		else return number.toString();
	else
		return "";
}

var images = [];
function getImages( node )
{
	if ( node )
	{
		if ( node.nodeName == "IMG")
			images.push(node);
			
		if ( node.childNodes )
			for ( var i = 0; i< node.childNodes.length; i++ )
				getImages( node.childNodes[i] );
	}
}
getImages(document.documentElement);

var urlRegex = /(http:\/\/ekizo\.mandarake\.co\.jp\/shpimg\/\d{2}\/\d{2}\/\d{3}\/)(\d{3})(\.jpg)/gi;
for ( var i = 0; i< images.length; i++ )
{
	if ( urlRegex.test(images[i].src) )
	{
		var urlHead = images[i].src.replace(urlRegex ,"$1");
		var numberString = images[i].src.replace(urlRegex ,"$2");
		var urlTail = images[i].src.replace(urlRegex ,"$3");
		
		var number = parseInt(numberString,10);
		number = number - 1; //original images are numbered one below the thumbnails
	
		var newUrl = urlHead + numberToPaddedString(number) + urlTail;
		
		images[i].src = newUrl;
		images[i].width = imgWidth;
	}
}

