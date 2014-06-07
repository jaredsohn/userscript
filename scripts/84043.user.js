// ==UserScript==
// @name           Leju Web Tools
// @namespace      http://www.zhangjingwei.com
// @description    Leju Web Tools
// @include        http://house.baidu.com/*
// @include        http://house.leju.com/*
// @include        http://*.house.sina.com.cn/*
// ==/UserScript==


if (!GM_xmlhttpRequest || !GM_setValue){
	alert('请升级到最新版本的 Greasemonkey.');
	return;
}else{
    var LJWebTools = {
        foo : null,
        sizecheck : null,
        timeOutInterval : null,
        timeOutSet : null,
        checkTimer : null,
        basehtml : null,
        checkhtml : null,
        resultHtml : '',
        container : null,
        containerStyle : null,
        checkLinkList : null,
        checkListLen : null,
        linkLen : 0,
        callback : null,
        linkresutl : [],
        imgSrcSizeList : [],
        imgSrcList : []
    }
    
    /* 继承 */
    LJWebTools.extend = function() {
	    var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options, name, src, copy;
	    if( typeof target === "boolean" ){
		    deep = target;
		    target = arguments[1] || {};
		    i = 2;
	    }
	    if( typeof target !== "object"){
		    target = {};
	    }
	    if(length === i){
		    target = this;
		    --i;
	    }
	    for(; i < length; i++){
		    if ((options = arguments[ i ]) != null ){
			    for(name in options){
				    src = target[name];
				    copy = options[name];
				    if(target === copy){
					    continue;
				    }
				    if(copy !== undefined){
					    target[name] = copy;
				    }
			    }
		    }
	    }
	    return target;
    };
    
    /* Xpath */
    LJWebTools.xpath = function(n){
        var obj  = document.evaluate(
            '//'+n,
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null),
            len = obj.snapshotLength,
            request = [];
        if(len>1){
            for(len>0;len--;){
                request.push(obj.snapshotItem(len));
            }
        }else{
            request = obj.snapshotItem(0);
        }
        return request; 
    }
    
    /* 获取Radio选项 */
    LJWebTools.getradio = function(n){
        var obj = lj.xpath(n),
        len = obj.length;
        for(len>0;len--;){
            if(obj[len].checked){
                return Math.round(obj[len].value);
            }
        }
    }
    
    /* 去除空白 */
    LJWebTools.trim = function(str){
        return (str || "").replace(/^\s+|\s+$/g, "");   
    }
    
    /* 匹配URL */
    LJWebTools.isUrl = function(str){
        var url = new RegExp();
        url.compile("^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$");
        return url.test(str);
    }
    
    /* 获取文件大小 */
    LJWebTools.getSize = function(str){
        var reg = /Content-Length: (\d*)/,
        result = str.match(reg);
	    if (result == null){
		    return 0;
	    }else {
		    return result[1];
	    }
    }
   
    /**
    * 队列控制
    * Thanks for xiaofei
    */
    LJWebTools.queue=function(fnArr){
		this.fnArr=fnArr||[];
	};
	LJWebTools.queue.prototype={
		fnArr:[],
		queue:function(fn) {
			if (fn[0]) {
				for (var i=0; fn[i];this.fnArr.push(fn[i++])){}
			} else {
				this.fnArr.push(fn);
			}
		},
		dequeue:function() {
			(this.fnArr.shift()||function(){})();
		}
	};
    
    LJWebTools.extend({
        /**
        * 标记错误信息
        * @param type 
        * 检查类型 （1:文字链接,2:图片大小,3:图片域名）
        */
        marklink : function(type){
            var resultLen,
            obj,
            elem;
            if(type == 1){
                resultLen = this.linkresutl.length;
                for(resultLen > 0; resultLen--;){
                    obj = this.linkresutl[resultLen];
                    obj.style.cssText =";background:#FF0000;color:#FBFBFB;font:900 16px/1.6 arial;";
                }
            }else if(type == 2){
                resultLen = this.imgSrcSizeList.length,
                html = "";
                var obj,
                left,
                top,
                width,
                height,
                size,
                maxsize,
                tip;
                if(lj.sizecheck){
                    for(resultLen > 0; resultLen--;){
                        var o = this.imgSrcSizeList[resultLen];
                        obj = o[0],
                        left = obj.offsetLeft,
                        top = obj.offsetTop,
                        width = obj.width,
                        height = obj.height,
                        tip = obj.src + "图片大小不正确，输出大小为：" + o[1] +"K，正确大小为：" + o[2] +"K";
                        if (width <= 100){
                            width = "auto;";
                        }else{
                            width = width + "px;";
                        }
                        if (height <= 100){
                            height = "auto;";
                        }else{
                            height = height + "px;";
                        }
                        html += "<div style='background:#FF0000;color:#FFFFFF;position:absolute;opacity:0.8;font:900 18px/1.6 arial;";
                        html += "width:" + width;
                        html += "height:" + height;
                        html += "top:" + top + "px;";
                        html += "left:" + left + "px;";
                        html += ">" + tip + "</div>";
                    }
                }else{
                    for(resultLen > 0; resultLen--;){
                        obj = this.imgSrcSizeList[resultLen],
                        left = obj.offsetLeft,
                        top = obj.offsetTop,
                        width = obj.width,
                        height = obj.height,
                        tip = "图片尺寸不正确";
                        if (width <= 40){
                            width = "auto;";
                        }else{
                            width = width + "px;";
                        }
                        if (height <= 40){
                            height = "auto;";
                        }else{
                            height = height + "px;";
                        }
                        html += "<div style='background:#FF0000;color:#FFFFFF;position:absolute;opacity:0.8;font:900 18px/1.6 arial;";
                        html += "width:" + width;
                        html += "height:" + height;
                        html += "top:" + top + "px;";
                        html += "left:" + left + "px;";
                        html += ">" + tip + "</div>";
                    }
                }
                elem = document.createElement("div");
                elem.innerHTML = html;
                document.body.appendChild(elem);
            }else{
                resultLen = this.imgSrcList.length,
                html = "";
                for(resultLen > 0; resultLen--;){
                    obj = this.imgSrcList[resultLen],
                    left = obj.offsetLeft,
                    top = obj.offsetTop,
                    width = obj.width,
                    height = obj.height;
                    if (width <= 40){
                        width = "auto;";
                    }else{
                        width = width + "px;";
                    }
                    if (height <= 40){
                        height = "auto;";
                    }else{
                        height = height + "px;";
                    }
                    html += "<div style='background:#FF0000;color:#FFFFFF;position:absolute;opacity:0.8;font:900 18px/1.6 arial;";
                    html += "width:" + width;
                    html += "height:" + height;
                    html += "top:" + top + "px;";
                    html += "left:" + left + "px;";
                    html += "'>域名错误</div>";
                }
                elem = document.createElement("div");
                elem.innerHTML = html;
                document.body.appendChild(elem);
            }
        },
        
        /**
        * 检查链接状态
        * @param type,o,fn
        * 检查类型、传入对象、回调函数
        */
        linkstatus : function(type,o,fn){
            if(!!o){
               lj.checkLinkList = o;
               lj.checkListLen = lj.checkLinkList.length;
               lj.linkLen = 0;
            }
            if(!!fn){
                lj.callback = fn;
            }
            var self = lj.checkLinkList[lj.linkLen];
            if(!!self){
                var len = Math.floor(lj.linkLen/lj.checkListLen*100),   // 检查进度
                tip,    // 提示语句
                href;   // 当前文件地址
                if (type == 1){
                    tip = "文字链接";
                    href = self.getAttribute("href");
                }else{
                    if(type == 2){
                        tip = "图片大小";
                    }else{
                        tip = "图片域名";
                    }
                    href = self.getAttribute("lsrc");
                    if (!!!href || href.indexOf("grey.gif") > 0){
                        href = self.src;
                    }
                }
                lj.container.innerHTML = "系统正在检查中，请耐心等待...<br>" + tip + "检查进度&nbsp;<span style='color:red;'>"+len+"%</span><br><span style='font:12px/1.2 arial;'>" + href + "</span>";
                if(self.complete && type == 3){ //如果已经载入并且是检查图片尺寸，则从缓存中读取
                    lj.checkimg(self);
                    lj.linkLen++;
                    lj.linkstatus(type);
                }else{
                    if(!!!(lj.linkLen%62)){
                        setTimeout(function(){
                            lj.getAjax(self,href,type);
                        },1000);
                    }else{
                        lj.getAjax(self,href,type);
                    }
                }
                
            }else{
                lj.callback.call(document,this);
                lj.foo.dequeue();
            }
            return this;
        },
        
        /**
        * 异步调用
        * @param self,href,type
        * 调用对象、请求地址、检查类型
        */
        getAjax : function(self,href,type){
            if(href != "#" && href.indexOf("mailto:")<0 && href.indexOf("javascript:")<0 && !!href){
                GM_xmlhttpRequest({
                    method: 'HEAD',
                    url: href,
                    headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'application/atom+xml,application/xml,text/xml',},
                    onreadystatechange: function(responseDetails) {
                        lj.getLinkStatus(responseDetails,self,type);
                    }
                });
            }else{
                if(type == 1){
                    lj.linkresutl.push(self);
                }else if(type == 2){
                    lj.imgSrcSizeList.push(self);
                }else{
                    lj.imgSrcList.push(self);
                }
                lj.linkLen++;
                lj.linkstatus(type);
            }
        },
        
        /**
        * 获取请求状态
        * @param re,self,type
        * 异步请求的返回信息、调用对象、检查类型
        */
        getLinkStatus : function(re,self,type){
            if (re.readyState < 4) {
                if(lj.timeOutSet == 0) {
                    lj.timeOutInterval = setTimeout(function(){
                        if(lj.timeOutSet == 1) {
                          clearTimeout(lj.timeOutInterval);
                          lj.timeOutSet = 0;
                        }
                        lj.linkresutl.push(self);
                        lj.linkLen++;
                        lj.linkstatus(type);               
                    },5000);
                    lj.timeOutSet = 1;
                }
            } else if(re.readyState == 4) {
                clearTimeout(lj.timeOutInterval);
		        lj.timeOutSet = 0;
                try {
                  var httpStatus = re.status;
                    if(type == 1){
                        if(httpStatus != 200 && httpStatus != 304 && httpStatus != 301){
                            lj.linkresutl.push(self);
                        }
                    }else{
                        if(httpStatus != 200 && httpStatus != 304 && httpStatus != 301){
                            if(type == 2){
                                lj.imgSrcSizeList.push(self);
                            }else{
                                lj.imgSrcList.push(self);
                            }
                        }else{
                            if(type == 2){
                                var imgsize = re.responseHeaders,
                                imgsize = Math.round(lj.getSize(imgsize)/1024*100)/100;
                                self = {
                                    self : self,
                                    size : imgsize
                                }
                                lj.checkimgsize(self,null,true);
                            }else{
                                lj.checkimg(self);
                            }
                        }
                    }
                }
                catch(e) {  // unknow error like no domain name
                    if(type == 1){
                        lj.linkresutl.push(self);
                    }else if(type == 2){
                        lj.imgSrcSizeList.push(self);
                    }else{
                        lj.imgSrcList.push(self);
                    }
                }
                lj.linkLen++;
                lj.linkstatus(type);
            }
        },
        
        /* 检查文字链接 */
        checklink : function(o){
            var self,
            linkLen = o.length;
            for(linkLen>0; linkLen--;){
                self = o[linkLen],
                linkhref = self.href;
                if(!lj.isUrl(linkhref)){
                   this.linkresutl.push(self);
                }
            }
            return this;
        },
        
        /* 检查图片大小 */
        checkimgsize : function(o,fn,type){
            var self,
            len = o.length;
            if(!!!type){
                type = size;
            }else{
                type = checkimg;
            }
            if(len > 1){
                for(len>0;len--;){
                    self = o[len];
                    type(self,len);
                }
            }else{
                type(o);
            }
            
            /* 判断图片是否超标 */
            function size(o,len){
                var origin = new Image(),
                originWidth,
                originHeight,
                width = o.width,
                height = o.height;
                origin.src = o.src;
                origin.addEventListener("load",function(){
                    originWidth = origin.width;
                    originHeight = origin.height;
                    if(width != originWidth || height != originHeight){
                        lj.imgSrcSizeList.push(o);
                    }
                    if(!!!len && !!fn){
                        fn.call(document,lj);
                    }
                },false);
            }
            
            
            function checkimg(o) {
                var img = o.self,
                h = img.height,
                w = img.width,
                _size = o.size,
                l = h > w ? h: w,
                s = h < w ? h: w,
                size,
                maxsize;
                if (l < 50) {
                    size = (l * s / 1300) * 1.5 * 1.1;
                    size = Math.round(size * 100) / 100;
                    maxsize = size + 0.5;
                    maxsize = Math.round(maxsize * 100) / 100;
                }
                if (50 <= l && l < 100) {
                    size = (l * s / 1800) * 1.7 * 1.1;
                    size = Math.round(size * 100) / 100;
                    maxsize = size + 1;
                    maxsize = Math.round(maxsize * 100) / 100;
                }
                if (100 <= l && l < 200) {
                    size = (l * s / 2000) * 1.8 * 1.1;
                    size = Math.round(size * 100) / 100;
                    maxsize = size + 2;
                    maxsize = Math.round(maxsize * 100) / 100;
                }
                if (200 <= l && l < 300) {
                    size = (l * s / 3200) * 1.9 * 1.1;
                    size = Math.round(size * 100) / 100;
                    maxsize = size + 4.0;
                    maxsize = Math.round(maxsize * 100) / 100;
                }
                if (l >= 300) {
                    size = (l * s / 5800) * 2.1 * 1.1;
                    size = Math.round(size * 100) / 100;
                    maxsize = size + 9;
                    maxsize = Math.round(maxsize * 100) / 100;
                }
                if(_size > maxsize){
                    lj.imgSrcSizeList.push([img,_size,maxsize]);
                }
            }
            return this;
        },
        
        /* 检查图片域名 */
        checkimg : function(o){
            var self,
            len = o.length;
            if(len > 1){
                for(len>0;len--;){
                    self = o[len];
                    area(self);
                }
            }else{
                area(o);
            }
            /* 判断域名是否合法 */
            function area(o){
                var href = o.getAttribute("lsrc");
                if (!!!href || href.indexOf("grey.gif") > 0){
                    href = o.src;
                }
                var result = href.indexOf("sinaimg.cn") > 0;
                if(!result){
                     result = href.indexOf("cache.house.sina.com.cn") > 0;
                }
                if(!result){
                    lj.imgSrcList.push(o);
                }
            }
            return this;
        }
    });

    var lj = LJWebTools;
    
    lj.basehtml = "<div id='ljwebtools'><button>检查</button></div>";
    lj.baseStyle = ";position:fixed;right:5px;top:60%;padding:5px;border:3px solid #709CD2;background:#FFFFFF;z-index:999999;";

    /* 提示层内容 */
    lj.checkhtml = "<div>检查链接地址&nbsp;";
    lj.checkhtml += "<input type='radio' id='checklink0' checked name='checklink' value='0'><label for='checklink0' style='cursor:pointer;'>不检查</label>";
    lj.checkhtml += "<input type='radio' id='checklink1' name='checklink' value='1'><label for='checklink1' style='cursor:pointer;'>快速检查</label>";
    lj.checkhtml += "<input type='radio' id='checklink2' name='checklink' value='2'><label for='checklink2' style='cursor:pointer;'>深度检查</label></div>";
    lj.checkhtml += "<div>检查图片超标&nbsp;";
    lj.checkhtml += "<input type='radio' name='checkimgsize' checked id='checkimgsize0' value='0'><label for='checkimgsize0' style='cursor:pointer;'>不检查</label>";
    lj.checkhtml += "<input type='radio' name='checkimgsize' id='checkimgsize1' value='1'><label for='checkimgsize1' style='cursor:pointer;'>快速检查</label>";
    lj.checkhtml += "<input type='radio' name='checkimgsize' id='checkimgsize2' value='2'><label for='checkimgsize2' style='cursor:pointer;'>深度检查</label>";
    lj.checkhtml += "</div>";
    lj.checkhtml += "<div><label for='checkimgurl'>检查图片域名&nbsp;";
    lj.checkhtml += "<input type='radio' name='checkimgurl' checked id='checkimgurl0' value='0'><label for='checkimgurl0' style='cursor:pointer;'>不检查</label>";
    lj.checkhtml += "<input type='radio' name='checkimgurl' id='checkimgurl1' value='1'><label for='checkimgurl1' style='cursor:pointer;'>快速检查</label>";
    lj.checkhtml += "<input type='radio' name='checkimgurl' id='checkimgurl2' value='2'><label for='checkimgurl2' style='cursor:pointer;'>深度检查</label>";
    lj.checkhtml += "</div>";
    lj.checkhtml += "<div><input type='button' id='checkbtn' value='确认'></div>";

    /* 提示层样式 */
    lj.containerStyle = ";position:fixed;left:50%;top:30%;width:420px;margin-left:-220px;padding:10px;";
    lj.containerStyle += "border:3px solid #709CD2;background:#FFFFFF;z-index:99999;font:16px/1.6 arial;visibility:hidden;";
    
    lj.container = document.createElement("div");
    lj.container.style.cssText = lj.baseStyle;
    lj.container.innerHTML = lj.basehtml;
    document.body.appendChild(lj.container);
    
    lj.container = document.createElement("div");
    lj.container.style.cssText = lj.containerStyle;
    lj.container.innerHTML = lj.checkhtml;
    document.body.appendChild(lj.container);
    
    lj.xpath("div[@id = 'ljwebtools']").addEventListener("click",function(){
        lj.container.style.visibility = "inherit";
    },false);

    /* 绑定提示层事件 */
    lj.xpath("input[@id = 'checkbtn']").addEventListener("click",function(){
        var conCheckLink = lj.getradio("input[@name = 'checklink']"),
        conCheckSize = lj.getradio("input[@name = 'checkimgsize']"),
        conCheckUrl = lj.getradio("input[@name = 'checkimgurl']"),
        linkobj,
        srcobj;
        if(!!!conCheckLink && !!!conCheckSize && !!!conCheckUrl){
            lj.container.style.visibility = "hidden";
        }else{
            lj.container.innerHTML = "系统正在检查中，请耐心等待...";
            lj.checkTimer = setTimeout(function(){
                if(!!!conCheckLink && !!!conCheckSize && !!!conCheckUrl){
                    clearTimeout(lj.checkTimer);
                    lj.resultHtml += "<div><input type='button' id='checkbtntrue' value='确认'>&nbsp;&nbsp;";
                    lj.resultHtml += "<input type='button' id='showResutl' value='查看检测报告'></div>"
                    lj.container.innerHTML = lj.resultHtml;
                    lj.xpath("input[@id = 'checkbtntrue']").addEventListener("click",function(){
                        lj.container.style.visibility = "hidden";
                    },false);
                    lj.xpath("input[@id = 'showResutl']").addEventListener("click",function(){
                        alert("哎呀，您点击的功能正在开发呢~");
                    },false);  
                }else{
                    lj.checkTimer = setTimeout(arguments.callee,200)
                }
            },200);
        }
        
        lj.foo = new lj.queue();
        
        /* 文字链接检查 */
        if(conCheckLink == 1){
            linkobj = lj.xpath("a[@href]");
            lj.checkType = 1;
            lj.checklink(linkobj).marklink(1);
            lj.resultHtml += "<div>快速检查共发现<span style='color:red'>"+lj.linkresutl.length+"</span>条疑似错误链接，已标红，请检查！</div>";
            conCheckLink = 0;
        }else if(conCheckLink == 2){
           linkobj = lj.xpath("a[@href]");
           lj.checkType = 1;
           lj.foo.queue(function() {
			    lj.linkstatus(1,linkobj,function(that){
                    that.marklink(1);
                    that.resultHtml += "<div>深度检查共发现<span style='color:red'>"+lj.linkresutl.length+"</span>条错误链接，已标红，请检查！</div>";
                    conCheckLink = 0;
                });
	        });
        }
        
        /* 图片超标检查 */
        if(conCheckSize == 1){
            if(!!!srcobj){
                srcobj = lj.xpath("img[@src]");
            }
            lj.sizecheck = false;
            lj.checkType = 2;
            lj.checkimgsize(srcobj,function(that){
                that.marklink(2);
                that.resultHtml += "<div>快速检查共发现<span style='color:red'>"+lj.imgSrcSizeList.length+"</span>张图片尺寸不正确，已标红，请检查！</div>";
                conCheckSize = 0;
            });
        }else if(conCheckSize == 2){
            if(!!!srcobj){
                srcobj = lj.xpath("img[@src]");
            }
            lj.sizecheck = true;
            lj.checkType = 2;
            lj.foo.queue(function() {
			    lj.linkstatus(2,srcobj,function(that){
                    that.marklink(2);
                    that.resultHtml += "<div>深度检查共发现<span style='color:red'>"+lj.imgSrcSizeList.length+"</span>张图片大小不正确，已标红，请检查！</div>";
                    conCheckSize = 0;
                });
	        });
        }
        
        /* 图片域名检查 */
        if(conCheckUrl == 1){
            if(!!!srcobj){
                srcobj = lj.xpath("img[@src]");
            }
            lj.checkType = 3;
            lj.checkimg(srcobj).marklink(3);
            lj.resultHtml += "<div>快速检查共发现<span style='color:red'>"+lj.imgSrcList.length+"</span>张图片域名错误，已标红，请检查！</div>";
            conCheckUrl = 0;
        }else if(conCheckUrl == 2){
            if(!!!srcobj){
                srcobj = lj.xpath("img[@src]");
            }
            lj.checkType = 3;
            lj.foo.queue(function() {
			    lj.linkstatus(3,srcobj,function(that){
                    that.marklink(3);
                    lj.resultHtml += "<div>深度检查共发现<span style='color:red'>"+lj.imgSrcList.length+"</span>张图片域名错误，已标红，请检查！</div>";
                    conCheckUrl = 0;
                });
	        });
        }
        
        lj.foo.dequeue();
        
    },false);
}
