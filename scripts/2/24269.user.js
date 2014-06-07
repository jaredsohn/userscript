// ==UserScript==
// @name           LDR Feed Info
// @namespace      http://endflow.net/
// @description    Add feed information into toolbar.
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy)
// @version        0.1.3 [2008-03-24]
// @history        [2008-03-20] 0.1.0 first version
//                 [2008-03-23] 0.1.1 improved: add position indicator
//                 [2008-03-23] 0.1.2 bugfixed: position indicator
//                 [2008-03-24] 0.1.3 improved: add LDR icon on initialize

(function(){
var w = this.unsafeWindow || window;
w.addEventListener('load', function(){with(w){
	var updateCounter = function(){
		var item = subs_item(get_active_feed().subscribe_id);
		if(!item) return;
		var count = get_active_feed().items.length;
		$('cbul_count').innerHTML = (get_active_item() + 1) + '/' + count;
	}
	register_hook('AFTER_PRINTFEED', function(){
		var feed = get_active_feed();
		$('cbul_subs').innerHTML = feed.channel.subscribers_count;
		$('cbul_count').innerHTML = '1/' + feed.items.length;
		$x('//li[@id="cbul_rate"]/span')[0].innerHTML = subs_item(feed.subscribe_id).rate;
		$x('//li[@id="cbul_rate"]/img')[0].src = '/img/rate/' + subs_item(feed.subscribe_id).rate + '.gif';
		$('cbul_title').innerHTML = feed.channel.title;
		$('cbul_title').style.backgroundImage = $x('//td[@id="channel_info"]/span[@class="widget widget_offset"]/span')[0].style.backgroundImage;
	});
	
	addAfter(Control, 'scroll_next_item', function(){
		updateCounter();
	});
	addAfter(Control, 'scroll_prev_item', function(){
		updateCounter();
	});
	
	add_button({id:'cbul_subs', innerHTML:'<span>0</span>', icon:'/img/icon/subscriber.gif'});
	setStyle('cbul_subs', {textAlign:'right', width:'auto', paddingLeft:'24px'});
	add_button({id:'cbul_count', innerHTML:'<span>0/0</span>', icon:'/img/icon/new.gif'});
	setStyle('cbul_count', {textAlign:'right', width:'auto', paddingLeft:'24px'});
	add_button({id:'cbul_rate', innerHTML:'<img src="/img/rate/0.gif" style="position:absolute;clip:rect(0px 13px 15px 0px);margin:2px 0px 0px -16px;" /><span>0</span>'});
	setStyle('cbul_rate', {textAlign:'right', width:'auto', paddingLeft:'20px'});
	add_button({id:'cbul_title', innerHTML:'<span>livedoor Reader</span>', icon:'http://clip.livedoor.com/img/icon/reader.gif'});
	setStyle('cbul_title', {textAlign:'right', width:'auto', paddingLeft:'24px'});
}}, false);
// THX! addBefore (LDR - Signal: http://userscripts.org/scripts/review/12781) written by brasil
function addAfter(target, name, after) {
	var original = target[name];
	target[name] = function() {
		var ret = original.apply(this, arguments);
		after.apply(this, arguments);
		return ret;
	}
}
// THX! XPath util compressed version (original written by cho45 [http://lowreal.net/logs/2006/03/16/1])
function $x(b,c){if(!c)c=document;var d=function(a){var o=document.createNSResolver(c)(a);
return o?o:(document.contentType=="text/html")?"":"http://www.w3.org/1999/xhtml"}
var b=document.createExpression(b,d);var e=b.evaluate(c,XPathResult.ANY_TYPE,null);
switch(e.resultType){case XPathResult.STRING_TYPE:return e.stringValue;
case XPathResult.NUMBER_TYPE:return e.numberValue;case XPathResult.BOOLEAN_TYPE:return e.booleanValue;
case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:{e=b.evaluate(c,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var f=[];for(var i=0,len=e.snapshotLength;i<len;i++){f.push(e.snapshotItem(i))}return f}}return null}
})();
