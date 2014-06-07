// ==UserScript==
// @name           Flipkart Recommend
// @namespace      http://www.flipkart.com
// @include        http://www.flipkart.com/*book*
// ==/UserScript==

function xpath(query, context) {
	return document.evaluate(query, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getTitle() {
	return xpath("//meta[@name='og_title']", document).snapshotItem(0).content;
}

var strip = "<h1>You might also like</h1><br>";
place = xpath("//div[@class='line bmargin20']", document).snapshotItem(0);
loading = document.createElement('div');
loading.align = 'center';
loading.innerHTML = "<h1>You might also like</h1><br><img src='http://www.photoshopatoms.com/tutorials/creating-an-ajax-style-loading-gif/images/img16.gif'/>";
place.appendChild(loading);

function postProcess(titleArray, count) {
	GM_log("count = " + count);
	GM_log("length = " + titleArray.snapshotLength);
	if(count == titleArray.snapshotLength) {
		GM_log(strip);
		loading.innerHTML = strip;
		return;
	}

	title = titleArray.snapshotItem(count).data.replace(/^\s+|\s+$/g, '')
	url = "https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=site%3A" + "flipkart" + ".com%3A%20" + title;
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(response) {
			var json = eval("(" + response.responseText+")");
			GM_log(json.responseData.results[0].url);
			url = json.responseData.results[0].url;
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: function(response) {
					doc = document.createElement('div');
					doc.innerHTML = response.responseText;
                                        if(xpath("//div[@id='mprodimg-id']//img[@title]", doc).snapshotItem(0) != null) {
					var imageSrc = xpath("//div[@id='mprodimg-id']//img[@title]", doc).snapshotItem(0).src;
					var imageTitle = xpath("//div[@id='mprodimg-id']//img[@title]", doc).snapshotItem(0).title;
					GM_log(imageSrc);
					strip = strip + "<a href='" + url + "'><img width = '100' height = '150' src='" + imageSrc + "'/></a>&nbsp;";
}
					postProcess(titleArray, count+1);
				}
			});
		}
	});
}

url = "https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=site%3A" + "amazon" + ".com%3A%20" + getTitle();
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(response) {
			var json = eval("(" + response.responseText+")");
			GM_log(url);
			GM_log(json.responseData);
			if(json.responseData.results.length < 1) {
				loading.innerHTML = "<h1>Sorry, Could not get recommendations</h1>";
				return;
			}
			GM_log(json.responseData.results[0].url);
			amznUrl =  json.responseData.results[0].url;
			GM_xmlhttpRequest({
				method: 'GET',
				url: amznUrl,
				onload: function(response) {
					doc = document.createElement('div');
					doc.innerHTML = response.responseText;
					titleArray = xpath("//a[@class='sim-img-title']/text()", doc);
					GM_log(titleArray);
					postProcess(titleArray, 0);	
				}
			});
		}
	});
