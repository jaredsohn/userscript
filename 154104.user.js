// ==UserScript==
// @name        Mercado Livre Enhancement
// @namespace   taksan
// @include     http://*mercadolivre.com.br/*
// @version     1.02
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require		https://raw.github.com/taksan/objective-monkey-utils/master/keyboarNavigation.js
// @require     http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js
// ==/UserScript==

main();

function main() {
	PREV=$("li.first-child a")
	NEXT=$("li.last-child a")
	addKeyboardNavigation(PREV,NEXT)

	$('#searchResults li').each(function(k,v) {
		var adLink = $(v).find('a').attr('href');
		if (adLink != null) {
		   addExtraInfo(adLink, $(v).find('li.extra-info-location'));
		}
	})
}

function addExtraInfo(url, v) {
	GM_xmlhttpRequest({
	  method: "GET",
	  url: url,
	  onload: function(response) {
	  	  var responseData = $(response.responseText);
		  var sellerId = response.responseText.replace(/.*sellerId=([0-9]*).*/,"$1").trim()
		  var actualLocation = responseData.find('dd.where').text().trim();
		  $(v).text(actualLocation)
		  var rep=responseData.find("img.meter")
		  $(v).after(rep)
		  sellerData="http://produto.mercadolivre.com.br/reputation/showLayer.html?sellerId="+sellerId+"&x=x";
		  GM_xmlhttpRequest({
			  method: "GET",
			  url: sellerData,
			  onload: function (response) {
				var data = $(response.responseText);
				var repTable = $(response.responseText).find('table').html();
				repTable = repTable.replace('de negocia&ccedil;&otilde;es','')
				repTable = repTable.replace(/Qualifica.*es positivas/,'Qual. Positivas')
				repTable = repTable.replace('<th','<td');
				repTable = repTable.replace('th>','td>');

				$(rep).attr('title',repTable)
				$(rep).tooltip();
				$(rep).attr('title','')
			  }
		   })
	  	}
	});
}