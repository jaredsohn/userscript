// ==UserScript==
// @name				Eat Fanfou loli ver.
// @namespace			http://fanfou.com/batesiko
// @description			Eat Fanfou
// @version				0.1
// @include				http://fanfou.com/*
// @require				http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/library.js
// @require				http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/base64.js
// @require				http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/functions.js
// @require				http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/fancyzoom.js
// @resource			STYLES http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/styles.css
// @resource			IMG_SPACER http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/spacer.gif
// @resource			IMG_CLOSEBOX http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/closebox.png
// @resource			IMG_MAGNIFYINGGLASS http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/magnifying_glass.png
// @resource			IMG_ZOOMSPIN1 http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/zoom-spin-1.png
// @resource			IMG_ZOOMSPIN2 http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/zoom-spin-2.png
// @resource			IMG_ZOOMSPIN3 http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/zoom-spin-3.png
// @resource			IMG_ZOOMSPIN4 http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/zoom-spin-4.png
// @resource			IMG_ZOOMSPIN5 http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/zoom-spin-5.png
// @resource			IMG_ZOOMSPIN6 http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/zoom-spin-6.png
// @resource			IMG_ZOOMSPIN7 http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/zoom-spin-7.png
// @resource			IMG_ZOOMSPIN8 http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/zoom-spin-8.png
// @resource			IMG_ZOOMSPIN9 http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/zoom-spin-9.png
// @resource			IMG_ZOOMSPIN10 http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/zoom-spin-10.png
// @resource			IMG_ZOOMSPIN11 http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/zoom-spin-11.png
// @resource			IMG_ZOOMSPIN12 http://dl.getdropbox.com/u/167627/GM_Scripts/eat_fanfou_remote/zoom-spin-12.png
// ==/UserScript==

// 配置
var EF = {
    version: '0.8',
    name: '雞塊 好吃',
    versionText: function(){
        return this.version + ' - ' + this.name;
    },
    author: 'PorkFat',
    features: ['四四方方的头像，变得圆碌碌；', '回复的消息，在本消息后面直接显示上下文；', '发消息同时，可以附上照片（多ID通过API上传照片会串号，重启浏览器可解决，其他功能无影响）；', '消息里的照片，点击直接放大到原本的尺寸；', '用户空间左上方的大头像，点击放大显示。', ],
};

(function init(){

    //变量
    var $D = YAHOO.util.Dom, $E = YAHOO.util.Event, $C = YAHOO.util.Connect, $A = YAHOO.util.Anim;
    
    // CSS代码
    var cssCode = GM_getResourceText('STYLES');
    GM_addStyle(cssCode);
    
    function roundedAvatar(el){
        var img = el.getElementsByTagName('img')[0];
        var url = img.getAttribute('src');
        img.setAttribute('src', GM_getResourceURL('IMG_SPACER'));
        $D.setStyle(img, 'width', '48px');
        $D.setStyle(img, 'height', '48px');
        $D.setStyle(img, '-moz-border-radius', '5px');
        $D.setStyle(img, 'background', 'url(' + url + ') 50% 50% no-repeat');
        $D.setStyle(img, 'text-decoration', 'none');
    }
    
    $D.getElementsByClassName('avatar', 'a', 'stream', roundedAvatar);
    $D.getElementsByClassName('alist', 'ul', 'container', function(el){
        $D.batch(el.getElementsByTagName('a'), roundedAvatar);
    });
    
    if ($D.get('main') && $D.get('avatar')) { //这里应该是空间页面
        var lnk = $D.get('avatar').getElementsByTagName('a')[0];
        //在自己的空间不改变默认操作
        if (lnk.getAttribute('href').indexOf('settings') == -1) {
            var img = lnk.getElementsByTagName('img')[0];
            var url = img.getAttribute('src');
            url = url.replace(/avatar.fanfou.com\/l/, 'avatar.fanfou.com/o');
            lnk.setAttribute('href', url);
            $D.addClass(lnk, 'zoom');
        }
    }
    
    $D.getElementsByClassName('photo', 'a', 'stream', function(el){
        var img = el.getElementsByTagName('img')[0];
        var url = img.getAttribute('src');
        var caption = img.getAttribute('alt');
        url = url.replace(/photo.fanfou.com\/m/, 'photo.fanfou.com/o');
        el.setAttribute('href', url);
        el.setAttribute('title', caption);
        $D.addClass(el, 'zoom');
    });
    
    setupZoom();
    
    
    // 发送照片
    function attachPhotoUploader(){
        if (!$D.get('message') || !$D.get('update')) 
            return;
        var update = $D.get('update'), url = ['http://m.fanfou.com/home', 'http://api.fanfou.com/photos/upload.json'], filename = ['picture', 'photo'], statusname = ['desc', 'status'];
        
        // 放入传照片form
        var form = document.createElement('form');
        form.setAttribute('id', 'EF-photo-upload');
        form.setAttribute('enctype', 'multipart/form-data');
        form.setAttribute('method', 'post');
        form.setAttribute('action', url[0]);
        $D.setStyle(form, 'display', 'none');
        
        var str = '';
        str += '<h2 title="点击切换回发消息">你照了什么？</h2>';
        str += '<span class="switch"><a href="#" class="current">通过手机上传</a></span>';
        str += '<p><input type="file" name="' + filename[0] + '" id="myphoto" class="input_file" size="55" /></p>';
        str += '<p><textarea name="' + statusname[0] + '" id="myphotostatus" class="qs" cols="70" rows="3"></textarea></p>';
        str += '<p class="sorry">通过 API 上传需输入 email 和密码用以登录 API 接口，<br />照片发送后会提示下载文件，<strong>取消</strong>、再按 <strong>Ctrl+R</strong> 刷新页面就行</p>';
        str += '<p class="act">';
        str += '<input type="hidden" name="action" value="photo.upload" />';
        str += '<input type="hidden" name="token" value="' + Func.Account.token() + '" />';
        str += '<img src="http://static.fanfou.com/img/ajax-indicator.gif" class="loading" alt="loading" />';
        str += '<input type="submit" class="formbutton" value="发送" />';
        str += '</p>';
        form.innerHTML = str;
        
        update.appendChild(form);
        
        $E.on(form, 'submit', function(ev){
            $E.stopEvent(ev);
            
            if ($D.get('myphoto').value != '') {
                // 执行照片上传操作
                $C.setForm(form, true);
                $C.asyncRequest('post', form.action, {
                    upload: function(o){
                        window.location = window.location;
                    }
                });
                $D.getElementsByClassName('loading', 'img', form, function(el){
                    el.style.visibility = 'visible';
                });
                $D.getElementsByClassName('formbutton', 'input', form, function(el){
                    el.disabled = 'disabled';
                });
            }
        });
        
        // 让标题可以点击切换
        var h2 = update.getElementsByTagName('h2'), fm = update.getElementsByTagName('form');
        
        h2[0].setAttribute('title', '点击切换到传照片');
        $E.on(h2[0], 'click', function(ev){
            $D.setStyle(fm[0], 'display', 'none');
            $D.setStyle(fm[1], 'display', 'block');
        });
        $E.on(h2[1], 'click', function(ev){
            $D.setStyle(fm[0], 'display', 'block');
            $D.setStyle(fm[1], 'display', 'none');
        });
        
        // 照片上传方式可选择
        var sw = $D.getElementsByClassName('switch', 'span', fm[1])[0], lnk = sw.getElementsByTagName('a'), photo = $D.get('myphoto'), status = $D.get('myphotostatus');
        
        $E.on(lnk[0], 'click', function(ev){
            $E.stopEvent(ev);
            form.setAttribute('action', url[0]);
            photo.setAttribute('name', filename[0]);
            status.setAttribute('name', statusname[0]);
            $D.getElementsByClassName('sorry', 'p', fm[1], function(el){
                el.style.visibility = 'hidden';
            });
            $D.removeClass(lnk[1], 'current');
            $D.addClass(this, 'current');
        });
        $E.on(lnk[1], 'click', function(ev){
            $E.stopEvent(ev);
            form.setAttribute('action', url[1]);
            photo.setAttribute('name', filename[1]);
            status.setAttribute('name', statusname[1]);
            $D.getElementsByClassName('sorry', 'p', fm[1], function(el){
                el.style.visibility = 'visible';
            });
            $D.removeClass(lnk[0], 'current');
            $D.addClass(this, 'current');
        });
    }
    
    attachPhotoUploader();
    /*	
     
     GM_xmlhttpRequest({
     
     method: 'GET',
     
     url: 'http://api.fanfou.com/account/verify_credentials.json',
     
     headers: {
     
     'User-Agent': navigator.userAgent,
     
     'Accept': 'application/json',
     
     'Authorization': 'Basic ' + Func.Account.auth()
     
     },
     
     onload: function(response) {
     
     console.log(eval('(' + response.responseText + ')').name);
     
     }
     
     });
     
     console.log('ok.');
     
     */
    // 清空缓存
    function reset_cache(){
        var _cache = {};
        GM_setValue('cache', _cache.toSource());
        cache = _cache;
    }
    GM_registerMenuCommand("Reset cache of fanfou Thread Status", reset_cache);
    
    // 显示缓存
    function show_cache(){
        var _counter = 0;
        var cache = init_cache();
        GM_log('==== Cached Statuses are shown below: ====');
        for (key in cache) {
            GM_log(key + ' --> ' + cache[key]["text"]);
            _counter++;
        }
        GM_log('====  These ' + _counter + ' Statuses are cached. ====');
    }
    GM_registerMenuCommand("Show cache of fanfou Thread Status", show_cache);
    
    // 初始化缓存
    function init_cache(){
        var _cache = GM_getValue('cache');
        if (typeof _cache == 'undefined') 
            _cache = {};
        else {
            _cache = eval(_cache);
            
            var _counter = 0;
            for (c in _cache) 
                _counter++;
            
            var maxlength = GM_getValue('maxlength');
            if (typeof maxlength == 'undefined') {
                maxlength = 100;
                GM_setValue('maxlength', maxlength);
            }
            
            var oversize = _counter - maxlength;
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
    style.innerHTML = "div#statustip{z-index:999;position:absolute;top:0px;left:100px;display:none;width:388px;border:1px solid black;background-color:white;opacity:0.9;padding:10px;}div#statustip img.avatar{display:block;width:48px;height:48px;margin:3px 0 3px  -59px;float:left;clear:none;}div#statustip span.author{color:#0066CC;}div#statustip img.loading{margin-left:150px;}div#statustip div.thread{min-height:52px;width:320px;margin-bottom:5px;padding:0px 3px 3px 62px;border:1px dashed silver;}";
    document.getElementsByTagName("head")[0].appendChild(style);
    
    // 准备提示框
    var tip = document.createElement("div");
    tip.setAttribute("id", "statustip");
    tip.innerHTML = '<img class="loading" src="http://static.fanfou.com/img/ajax-indicator.gif" />';
    document.getElementsByTagName("body")[0].appendChild(tip);
    // 查找和遍历消息
    var spans = document.getElementsByTagName("span");
    for (var i = 0; i < spans.length; i++) {
        if (spans[i].className == "reply") {
            var alink = spans[i].getElementsByTagName("a")[0];
            alink.addEventListener("mouseover", function(e){
                if (tip.alink) {
                    tip.alink.addEventListener("mouseout", hideTip, false);
                }
                tip.alink = this;
                // 获取消息id
                var sid = this.href.substring((this.href.lastIndexOf("/") + 1), this.href.lastIndexOf("?"));
                // 显示载入框
                tip.innerHTML = '<img class="loading" src="http://static.fanfou.com/img/ajax-indicator.gif" />';
                tip.style.top = e.pageY + 20 + "px";
                tip.style.left = e.pageX + "px";
                tip.style.display = "block";
                // 读取保存的缓存
                var statuscache = init_cache();
                // 如果缓存中存在则在缓存中读取
                if (statuscache[sid]) {
                    if (tip.style.display == "block") {
                        var output = statuscache[sid];
                        var mydate = new Date(output.created_at);
                        tip.innerHTML = '<div class="thread"><img class="avatar" src="' + output.user.profile_image_url + '" alt="' + output.user.screen_name + '" /><span class="author">' + output.user.screen_name + '</span> <span class="content">' + output.text + '</span> <span class="stamp">' + mydate.toLocaleString() + ' <span class="method">通过 ' + output.source + '</span></span></div>';
                        if (output.in_reply_to_status_id != "") {
                            tip.innerHTML += '<img class="loading" src="http://static.fanfou.com/img/ajax-indicator.gif" />';
                            threadFanfou(output.in_reply_to_status_id);
                        }
                    }
                    // 否则就通过AJAX载入
                }
                else {
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: "http://api.fanfou.com/statuses/show/" + sid + ".json",
                        onload: function(responseDetails){
                            var output = eval('(' + responseDetails.responseText + ')');
                            // 读取保存的缓存
                            var statuscache = init_cache();
                            statuscache[sid] = output;
                            GM_setValue('cache', statuscache.toSource());
                            if (tip.style.display == "block") {
                                var mydate = new Date(output.created_at);
                                tip.innerHTML = '<div class="thread"><img class="avatar" src="' + output.user.profile_image_url + '" alt="' + output.user.screen_name + '" /><span class="author">' + output.user.screen_name + '</span> <span class="content">' + output.text + '</span> <span class="stamp">' + mydate.toLocaleString() + ' <span class="method">通过 ' + output.source + '</span></span></div>';
                                if (output.in_reply_to_status_id != "") {
                                    tip.innerHTML += '<img class="loading" src="http://static.fanfou.com/img/ajax-indicator.gif" />';
                                    threadFanfou(output.in_reply_to_status_id);
                                }
                            }
                        }
                    });
                }
            }, false);
            // 保持消息框跟随鼠标
            alink.addEventListener("mousemove", function(e){
                tip.style.top = e.pageY + 20 + "px";
                tip.style.left = e.pageX + "px";
            }, false);
            // 鼠标移出时隐藏消息框
            alink.addEventListener("mouseout", hideTip, false);
            // 鼠标点击链接时不隐藏消息框
            alink.addEventListener("click", function(e){
                this.removeEventListener("mouseout", hideTip, false);
                e.preventDefault();
            }, false);
            // 鼠标双击时访问链接
            alink.addEventListener("dblclick", function(e){
                location.href = this.href;
                e.preventDefault();
            }, false);
            // 鼠标点击消息框时隐藏消息框
            tip.addEventListener("click", function(){
                hideTip();
                tip.alink.addEventListener("mouseout", hideTip, false);
            }, false);
        }
    }
    
    function hideTip(){
        tip.style.display = "none";
        tip.innerHTML = '<img class="loading" src="http://static.fanfou.com/img/ajax-indicator.gif" />';
    }
    
    // 获取之前的消息
    function threadFanfou(sid){
        var statuscache = init_cache();
        if (statuscache[sid]) {
            if (tip.style.display == "block") {
                var output = statuscache[sid];
                var mydate = new Date(output.created_at);
                tip.innerHTML = tip.innerHTML.replace(/<img class="loading"[^>]*>/ig, '<div class="thread"><img class="avatar" src="' + output.user.profile_image_url + '" alt="' + output.user.screen_name + '" /><span class="author">' + output.user.screen_name + '</span> <span class="content">' + output.text + '</span> <span class="stamp">' + mydate.toLocaleString() + ' <span class="method">通过 ' + output.source + '</span></span></div>');
                if (output.in_reply_to_status_id != "") {
                    tip.innerHTML += '<img class="loading" src="http://static.fanfou.com/img/ajax-indicator.gif" />';
                    threadFanfou(output.in_reply_to_status_id);
                }
            }
        }
        else {
            GM_xmlhttpRequest({
                method: 'GET',
                url: "http://api.fanfou.com/statuses/show/" + sid + ".json",
                onload: function(responseDetails){
                    var output = eval('(' + responseDetails.responseText + ')');
                    // 读取保存的缓存
                    var statuscache = init_cache();
                    statuscache[sid] = output;
                    GM_setValue('cache', statuscache.toSource());
                    if (tip.style.display == "block") {
                        var mydate = new Date(output.created_at);
                        tip.innerHTML = tip.innerHTML.replace(/<img class="loading"[^>]*>/ig, '<div class="thread"><img class="avatar" src="' + output.user.profile_image_url + '" alt="' + output.user.screen_name + '" /><span class="author">' + output.user.screen_name + '</span> <span class="content">' + output.text + '</span> <span class="stamp">' + mydate.toLocaleString() + ' <span class="method">通过 ' + output.source + '</span></span></div>');
                        if (output.in_reply_to_status_id != "") {
                            tip.innerHTML += '<img class="loading" src="http://static.fanfou.com/img/ajax-indicator.gif" />';
                            threadFanfou(output.in_reply_to_status_id);
                        }
                    }
                }
            });
        }
    }
})();
