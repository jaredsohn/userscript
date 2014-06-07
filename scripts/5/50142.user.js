// ==UserScript==
// @name           taobaoplusplus
// @namespace      taobaoplusplus
// @include        http://search1.taobao.com/*
// @include        http://list.taobao.com/*
// ==/UserScript==
var list, items = new Array();
list = document.evaluate("//li[@class='list-item']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);	
for (var i = 0; i < list.snapshotLength; i++) {
    var item = list.snapshotItem(i);
	items.push(item);
	var href = item.childNodes[1].childNodes[0].href;
	GM_xmlhttpRequest({method: 'GET',url: href,onload: getCridet});
	//break;
}

function getCridet(responseDetails)
{
	//GM_log('responseDetails.responseHeaders: '+responseDetails.responseHeaders);
	//GM_log('responseDetails.responseText: '+responseDetails.responseText.substr(0,100));	
	//<li><span>卖家信用：</span>
	//	<a href="http://rate.taobao.com/user-rate-6c0fd01dd339d3c1ca2b7609bc9cbebd.htm"><span>2046</span></a>
	//    <span tb:real="97%" tb:virtual="3%" id="J_rateTipsL"><a target="_blank" href="http://rate.taobao.com/user-rate-6c0fd01dd339d3c1ca2b7609bc9cbebd.htm"><img border="0" align="absmiddle" class="rank" src="http://pics.taobaocdn.com/newrank/s_blue_4.gif"/></a>                </span>	
    //</li>
	var r = responseDetails.responseText.replace(/\r\n/g,'');
	var t = r.match(/<div class="credit">(.*?)<\/li>/);
	var sell30day =  r.match(/30天售出.+?(\d+).+?件/)[1];
	//GM_log('sell30day: '+sell30day);
	//GM_log('t: '+t);
	//t = t[0].match(/<a(.+)<\/a>/);
	var img = t[0].match(/<img(.*?)>/);
	var id = t[0].match(/user-rate-(.*?)\.htm/);
	id = id[1].toString().substr(0,32);
	//GM_log('img: '+img);
	//GM_log('id: '+id);
	for (x in items)
	{
		var item = items[x];
		//var href = item.childNodes[1].childNodes[0].href;
		if( item.childNodes[9].childNodes[1].href.match(id) && item.childNodes[9].innerHTML.match('<add>')==null )
		{
			//GM_log(item.childNodes[9].childNodes[1].href.search(id[1]));
			//GM_log(x);
			//GM_log(item.childNodes[9].childNodes[1].href);
			item.childNodes[5].innerHTML += ('  <li title="30天售出件数">'+sell30day+'</li>');
			item.childNodes[9].innerHTML += ('<add>'+img[0]);
		}
	}	
}
