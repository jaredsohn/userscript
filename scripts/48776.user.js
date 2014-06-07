// ==UserScript==
// @name           fanfou Reply Status
// @namespace      http://www.paopao.name
// @description    预览饭否的“给xx的回复”的原消息
// @version        0.2
// @author         paopao
// @include        http://fanfou.com*
// ==/UserScript==

(function(){
    // 清空缓存
    function reset_cache() {
	    var _cache = {};
	    GM_setValue('cache', _cache.toSource());
	    cache = _cache;
    }
    GM_registerMenuCommand("Reset cache of fanfou Reply Status", reset_cache);

    // 显示缓存
    function show_cache() {
	var _counter = 0;
    var cache = init_cache();
	GM_log('==== Cached Statuses are shown below: ====');
	for (key in cache) {
	    GM_log(key + ' --> ' + cache[key]["text"]);
	    _counter++;
	}
	GM_log('====  These ' + _counter + ' Statuses are cached. ====');
    }
    GM_registerMenuCommand("Show cache of fanfou Reply Status", show_cache);

    // 初始化缓存
    function init_cache() {
	    var _cache = GM_getValue('cache');
	    if (typeof _cache == 'undefined')
	        _cache = {};
	    else {
	        _cache = eval(_cache);
	    
	        var _counter = 0;
	        for (c in _cache) _counter++;
	    
	        var maxlength = GM_getValue('maxlength'); 
	        if (typeof maxlength == 'undefined') {
		        maxlength = 100;
		        GM_setValue('maxlength', maxlength);
	        }
	    
	        var oversize =  _counter - maxlength;
	        if (oversize > 0) {
		        var __cache = {};
		        for (key in _cache)
		            if (oversize > 0)
			            oversize--;
		            else
			            __cache[key] = _cache[key];
		        _cache = __cache;
	        }
	    }
	    return _cache;
    }

    // 添加 CSS 样式
    var style = document.createElement("style");
    style.innerHTML = "div#statustip{position:absolute;top:0px;left:100px;display:none;width:388px;border:1px solid black;background-color:white;opacity:0.9;padding:10px 10px 10px 68px;}div#statustip img.avatar{display:block;width:48px;height:48px;margin:3px 0 3px -59px;float:left;}div#statustip span.author{color:#0066CC;}div#statustip img.loading{margin-left:150px;}";
    document.getElementsByTagName("head")[0].appendChild(style);

    // 准备提示框
    var tip = document.createElement("div");
    tip.setAttribute("id","statustip");
    tip.innerHTML = '<img class="loading" src="http://static.fanfou.com/img/ajax-indicator.gif" />';
    document.getElementsByTagName("body")[0].appendChild(tip);
    // 查找和遍历消息
    var spans = document.getElementsByTagName("span");
    for(var i=0; i < spans.length; i++) {
        if(spans[i].className == "reply") {
            var alink = spans[i].getElementsByTagName("a")[0];
            alink.addEventListener("mouseover",function(e){
                // 获取消息id
                var sid = this.href.substring((this.href.lastIndexOf("/")+1),this.href.lastIndexOf("?"));
                // 显示载入框
                tip.innerHTML = '<img class="loading" src="http://static.fanfou.com/img/ajax-indicator.gif" />';
                tip.style.top = e.pageY + 20 + "px";
                tip.style.left = e.pageX + "px";
                tip.style.display = "block";
                // 读取保存的缓存
                var statuscache = init_cache();
                // 如果缓存中存在则在缓存中读取
                if(statuscache[sid]) {
                    if (tip.style.display == "block"){
                        var output = statuscache[sid];
                        var mydate = new Date(output.created_at);
                        tip.innerHTML = '<img class="avatar" src="'+output.user.profile_image_url+'" alt="'+output.user.screen_name+'" /><span class="author">'+output.user.screen_name+'</span> <span class="content">'+output.text+'</span> <span class="stamp">'+mydate.toLocaleString()+' <span class="method">通过 '+output.source+'</span></span>';
                    }
                // 否则就通过AJAX载入
                } else {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: "http://api2.fanfou.com/statuses/show/"+sid+".json",
                        onload: function(responseDetails) {
                            var output = eval('(' + responseDetails.responseText + ')');
                            // 读取保存的缓存
                            var statuscache = init_cache();
                            statuscache[sid] = output;
                            GM_setValue('cache', statuscache.toSource());
                            if (tip.style.display == "block"){
                                var mydate = new Date(output.created_at);
                                tip.innerHTML = '<img class="avatar" src="'+output.user.profile_image_url+'" alt="'+output.user.screen_name+'" /><span class="author">'+output.user.screen_name+'</span> <span class="content">'+output.text+'</span> <span class="stamp">'+mydate.toLocaleString()+' <span class="method">通过 '+output.source+'</span></span>';
                            }
                        }
                    });
                }
            },false);
            // 保持消息框跟随鼠标
            alink.addEventListener("mousemove",function(e){
                tip.style.top = e.pageY + 20 + "px";
                tip.style.left = e.pageX + "px";
            },false);
            // 鼠标移出时隐藏消息框
            alink.addEventListener("mouseout",function(e){
                tip.style.display = "none";
                tip.innerHTML = '<img class="loading" src="http://static.fanfou.com/img/ajax-indicator.gif" />';
            },false);
        }
    }
})();