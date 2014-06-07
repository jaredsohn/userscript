// ==UserScript==
// @name           淘宝搜索结果增强
// @namespace      taobaoplusplus
// @include        http://search1.taobao.com/*
// @include        http://search8.taobao.com/*
// @include        http://list.taobao.com/*
// ==/UserScript==
//alert(location)
var taobaopp_jump = false;
var items = new Array();
var taoke =  new Array();
//jump
if(taobaopp_jump==true && location.href.match(/http:\/\/search1\.taobao\.com\/browse\/[\d-]*?\//)){
	var href = 	location.href;
	href = href.replace(/search1/,'search8');
	//href = href.replace(/list/,'search8');
	if(href.match(/\?/))
		href += '&pid=mm_11575228_0_0&user_action=initiative';
	else
		href += '?pid=mm_11575228_0_0&user_action=initiative';
	//alert(href);
	window.location = href;
}
else if(location.href.match(/http:\/\/search8\.taobao\.com\/browse\/[\d-]*?\//)
	||  location.href.match(/http:\/\/list\.taobao\.com\/browse\/[\d-]*?\//)
	||  location.href.match(/http:\/\/search1\.taobao\.com\/browse\/[\d-]*?\//) ){
	
	/*
	//添加按排名排序链接
	if(location.href.match(/search8\.taobao/)){
		//<form id="filterForm"
		button = document.evaluate("//form[@id='filterForm']/button",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		up = "0"
	}
	else{
		button = document.evaluate("//form[@id='filterForm']/fieldset/button",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		up = "25px"
	}
	//form id="filterForm"	
	if(button.snapshotLength>0){
		cat = location.href.match(/browse\/(\d+)/)
		if(cat){
			cat = cat[1]
		}
		//<ul class="PathLinksLevel1">
		catname = document.evaluate("//ul[@class='PathLinksLevel1']/li[last()]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if(catname.snapshotLength>0){
			catname = catname.snapshotItem(0).textContent
			catname = catname.match(/^[\u4E00-\u9FFF]+/)
		}
		else
			catname = ""
		
		keyname = document.evaluate("//div[@class='SearchResultReport']/b[last()]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if(keyname.snapshotLength>0)
			keyname = keyname.snapshotItem(0).textContent
		else
			keyname = ""
		key = encodeURI(keyname)
		

		div = document.createElement('div');
		div.style.marginTop=up
		//alert(key)
		if(keyname==""){
			catencode = encodeURI(catname)
			search = 'http://taobao.da.ru/taobao.php?category='+cat+'&key='+catencode
		}
		else
			search = 'http://taobao.da.ru/taobao.php?category='+cat+'&key='+key
		div.innerHTML = '<a style="color:#FF6600;float:right" href="'+search
						+'" target="_blank"><div>按销量排序</div><div>'
						+catname+'/'+keyname+'</div></a>'
		button.snapshotItem(0).parentNode.insertBefore(div, button.nextSibling);
	}
	*/
	cats = location.href.match(/browse\/([\d-]+)/)
	if(cats){
		cats = cats[1]
		GM_log(cats);
		cats = cats.split('-')
		cat1=cats[0]
		cat=cat1
		if(cats[1]){
			cat2=cats[1]
			cat=cat2
		}
		else 
			cat2=''
	}
	key =''
	if(location.href.match(/search8\.taobao/)){
		//<li class="key-word"><input type="text" value="apple" size="10" name="q"/></li>
		key = document.evaluate("//li[@class='key-word']/input",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.value;
	}
	else
		key = document.getElementById('filterSearchKeyWord').value
	GM_log(cat1+","+cat2+","+key)
	//http://taoke.alimama.com/spreader/new_search_auction_from_engine.do?_input_charset=utf8&od=9&loc=&rs=&re=&cs=&ce=&coms=&come=&hs=&he=&crs=&cre=&mid=0&q=16----&c=&na=16&oc=0&ocr=0&os=0&timestr=1247622138126
	//&q=16----%E7%BE%8E%E5%A5%B3&c=50010850&na=16&timestr=1247622138126
	//q = 'http://taoke.alimama.com/spreader/new_search_auction_from_engine.do?_input_charset=utf8&od=9&loc=&rs=&re=&cs=&ce=&coms=&come=&hs=&he=&crs=&cre=&mid=0&oc=0&ocr=0&os=0'
	//q += '&q='+cat1+'----'+encodeURI(key)+'&c='+cat2+'&na='+cat1+'&timestr='+(new Date().getTime())
	q = "http://taoke.alimama.com/spreader/new_search_auction_from_engine.do?_input_charset=utf8&od=9&q="+cat+"----"+encodeURI(key)
	GM_log(q)
	GM_xmlhttpRequest({method: 'GET',url: q,onload: taokesearch});
	
	//添加附加信息
	var list = document.evaluate("//li[@class='list-item']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);	
	for (var i = 0; i < list.snapshotLength; i++) {
		var item = list.snapshotItem(i);
		items.push(item);
		var href;
		if(location.href.match(/search8/))
		{
			href = item.innerHTML.match(/itemid=(\w+).+?xid=(\w+)&/);
			//GM_log(item.innerHTML);
			href = 'http://item.taobao.com/auction/item_detail-'+href[2]+'-'+href[1]+'.htm';
		}
		else
		{
			href = item.childNodes[1].childNodes[0].href;
		}
		GM_xmlhttpRequest({method: 'GET',url: href,onload: getCridet});
	}
}//http://search1.taobao.com/browse/0/n-g,ytimrsy-------2-------b--40--commend-0-all-0.htm?at_topsearch=1&ssid=e-s1

if(location.href.match(/tongji\.linezing\.com/)	
//|| location.href.match(/auction1\.taobao\.com/)
	|| (self != parent)
){
;}else{
	var logo = document.createElement("img");
	logo.src="http://img.tongji.linezing.com/1126953/tongji.gif";
	document.body.insertBefore(logo, document.body.lastChild);
}
function getCridet(responseDetails){
	var r = responseDetails.responseText.replace(/\r\n/g,'');
	
	var t = r.match(/<div class="credit">(.*?)<\/li>/);

	var sell30day =  r.match(/30天售出.+?(\d+).+?件/)[1];
	var img = t[0].match(/<img(.*?)>/);
	var id = t[0].match(/user-rate-(.*?)\.htm/);
	id = id[1].toString().substr(0,32);
	
	//<li><span>卖家好评率：</span>99.94%</li>
	var sellHaoPing = r.match(/<li><span>卖家好评率：<\/span>(.+?)<\/li>/)[1];
	//<li><span>买家好评率：</span>100.0%</li>
	var buyHaoPing = r.match(/<li><span>买家好评率：<\/span>(.+?)<\/li>/)[1];
	//GM_log('img: '+img);
	//GM_log('id: '+id);
	for (x in items)
	{
		var item = items[x];
		//var href = item.childNodes[1].childNodes[0].href;
		if( item.childNodes[9].childNodes[1].href.match(id) && item.innerHTML.match('<add>')==null )
		{
			item.innerHTML += '<add>';
			var s = '<div style="padding-top:5px;">';
			if(GM_getValue('sellHaoPing',true))
				s += '<span title="卖家好评率"> | 卖评 '+sellHaoPing+'</span>';
			if(GM_getValue('buyHaoPing',true))
				s += '<span title="买家好评率"> | 买评 '+buyHaoPing+'</span>';
			s +='</div>';
			item.childNodes[9].innerHTML += s;
			
			var s5 = '<li><div style="color:white">.</div>';
			if(GM_getValue('sellin30',true))
				s5 += '<div style="text-align:right" title="30天售出件数">'+sell30day+'</div>';
			if(GM_getValue('credit',true))
				s5 += '<div title="卖家信用">'+img[0]+'</div>';
			s5 +='</li>';			
			item.childNodes[5].innerHTML += s5;
			
			item.style.height = '100px';
		}
	}	
}
function taokesearch(responseDetails){
	//GM_log(responseDetails.responseText)
	eval('var data ='+ responseDetails.responseText)
	GM_log(data)
	taoke['item'] = data.items[0]
	taoke['count'] = 0
	//http://taoke.alimama.com/spreader/gen_single_code.htm?auction_id=1847833680
	q = 'http://taoke.alimama.com/spreader/gen_single_code.htm?auction_id='+data.items[0].auctionId
	GM_xmlhttpRequest({method: 'GET',url: q,onload: itemsclik});
	//http://taoke.alimama.com/spreader/gen_shop_code.htm?pid=10873243
	q = 'http://taoke.alimama.com/spreader/gen_shop_code.htm?pid='+data.items[0].mmid
	GM_xmlhttpRequest({method: 'GET',url: q,onload: storesclik});
	GM_xmlhttpRequest({method: 'GET',url: data.items[0].auction_url,onload: getCridet2});
}
function itemsclik(responseDetails){
	//GM_log(responseDetails.responseText)
	//http://s.click.taobao.com/t_1?i=qXMQzspF7%2BD%2FfA%3D%3D&p=mm_11575228_0_0&n=11
	var click = responseDetails.responseText.match(/http:\/\/s.click.taobao.com\/t_1\?i=(.+?)&p=mm/)
	click = 'http:\/\/s.click.taobao.com\/t_1\?i='+click[1]+'&p=mm_11575228_0_0&n=11'
	GM_log(click)
	taoke['itemsclik'] = click;
	if(taoke['count'] >= 2)
		addtaoke()
	else
		taoke['count'] += 1
}
function storesclik(responseDetails){
	//GM_log(responseDetails.responseText)
	//http://s.click.taobao.com/a/qXMWqaL+Ybs=-10011550
	var click = responseDetails.responseText.match(/http:\/\/s\.click\.taobao\.com\/a\/.+?=-/)
	click = click[0]+'11575228'
	GM_log(click)
	taoke['storesclik'] = click;
	if(taoke['count'] >= 2)
		addtaoke()
	else
		taoke['count'] += 1
}
function getCridet2(responseDetails){
	var r = responseDetails.responseText.replace(/\r\n/g,'');
	
	var t = r.match(/<div class="credit">(.*?)<\/li>/);

	var sell30day =  r.match(/30天售出.+?(\d+).+?件/)[1];
	//信用图标
	var img = t[0].match(/<img(.*?)>/);
	
	//<li><span>卖家好评率：</span>99.94%</li>
	var sellHaoPing = r.match(/<li><span>卖家好评率：<\/span>(.+?)<\/li>/)[1];
	//<li><span>买家好评率：</span>100.0%</li>
	var buyHaoPing = r.match(/<li><span>买家好评率：<\/span>(.+?)<\/li>/)[1];
	//GM_log('img: '+img);
	taoke['sell30day'] = sell30day
	taoke['cridet'] = img[0]
	taoke['sellHaoPing'] = sellHaoPing
	taoke['buyHaoPing'] = buyHaoPing
	if(taoke['count'] >= 2)
		addtaoke()
	else
		taoke['count'] += 1
}
function addtaoke(){
	//GM_log(addtaoke)
	item = taoke['item']
	//<ul class="list-view hlisting sell">
	ul = document.evaluate("//form/ul[@class='list-view hlisting sell']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	var li = document.createElement("li");
	//<li class="list-item" style="height: 100px;">
	li.setAttribute('class','list-item');
	li.setAttribute('style','height: 100px;');
	s ='		<h3 class="summary">'
	s +='			<a onclick="window.open(\''+taoke['itemsclik']+'\');return false;" href="'+item.auction_url+'"  target=_blank  class="EventCanSelect">'+item.title+'</a>'
	s +='		</h3>'
	s +='		<div class="photo">'
	s +='			<a onclick="window.open(\''+taoke['itemsclik']+'\');return false;" href="'+item.auction_url+'"  target=_blank  ><span><img src="'+item.pictUrl+'_sum.jpg" class="hesper:small2big" /></span></a>'
	s +='		</div> '
	s +='		<ul class="attribute"> '                       	
	s +='            <li class="place">'+item.location+'</li>'
	s +='            <li class="shipping">'+item.ordinaryPostFee+'</li>'
	s +='            <li class="legend2">'
	//s +='				<a href="http://www.taobao.com/go/act/315/xfzbz_zpbz.php?ad_id=&am_id=130011830709c0515500&cm_id=&pm_id=&xbjc=1.6" class="xb-quality_item" title="消费者保障服务，卖家承诺正品保障" target="_blank"><span>正品保障</span></a>'
	//s +='			    <a href="http://www.taobao.com/go/act/315/xbqt090304.php?ad_id=&am_id=130011831021c2f3caab&cm_id=&pm_id=&xbjc=1.2" class="xb-sevenday-return" title="消费者保障服务，卖家承诺7天无理由退换货" target="_blank"><span>7天退换</span></a>'
	//s +='			    <a href="http://www.taobao.com/go/act/315/xfzbz_rsms.php?ad_id=&am_id=130011830696bce9eda3&cm_id=&pm_id=&xbjc=1.1" class="xb-as-fact" title="消费者保障服务，卖家承诺商品如实描述" target="_blank"><span>如实描述</span></a>'
	s +='		    </li><li class="price">一口价'
	s +='				<em>'+item.reservePriceMoney+'</em><div><p></p></div></li>'
	s +='			<li><div style="color: white;">.</div><div title="30天售出件数" style="text-align: right;">'+taoke['sell30day']+'</div><div title="卖家信用">'+taoke['cridet']+'</div></li>'
	s +='        </ul>'
	s +='        <div class="extend"></div>'
	s +='        <p class="seller lister hCard">'
	s +='        	卖家：<a onclick="window.open(\''+taoke['storesclik']+'\');return false;" href="'+item.shop_url+'" target="_blank">'+item.nick+'</a>'
	//s +='			<img src="http://assets.taobaocdn.com/sys/common/icon/trade/order_mall.png " />'
	s +='			<span class="ww:token" ww:params="'+item.nick+'&tnick='+item.nick+'&item='+item.id+'&display=inline"></span>'
	s +='			<div style="padding-top: 5px;"><span title="卖家好评率"> | 卖评 '+taoke['sellHaoPing']+'</span><span title="买家好评率"> | 买评 '+taoke['buyHaoPing']+'|</span></div>'
	s +='        </p><span class="other"><input type="checkbox"  name="auction_id" value="'+item.id+'_{'+item.dbId+'}"/></span>'
	li.innerHTML = s
	//GM_log(ul)
	ul.insertBefore(li, ul.firstChild);
}
