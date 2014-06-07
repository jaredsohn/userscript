// ==UserScript==
// @name IcePersimmon
// @namespace gm.weans.info
// @description VLC替代视频网站的Flash播放器
// @author Wean
// @mail weanwz@gmail.com
// @version 0.1.2
// @include http://v.youku.com/v_show/*
// @include http://bilibili.smgbb.cn/video/av*
// @include http://www.bilibili.tv/video/av*
// @include http://v.pps.tv/*
// @include http://ipd.pps.tv/*
// @include http://v.163.com/movie/*
// @include http://vod.kankan.com/v/*
// @include http://www.yinyuetai.com/video/*
// @include http://tv.sohu.com/*
// @include http://v.sohu.com/*
// @include http://www.56.com/*
// @match http://v.youku.com/v_show/*
// @match http://bilibili.smgbb.cn/video/av*
// @match http://www.bilibili.tv/video/av*
// @match http://v.pps.tv/*
// @match http://ipd.pps.tv/*
// @match http://v.163.com/movie/*
// @match http://vod.kankan.com/v/*
// @match http://www.yinyuetai.com/video/*
// @match http://tv.sohu.com/*
// @match http://v.sohu.com/*
// @match http://www.56.com/*
// ==/UserScript==


//==================================================================//
//
//                        使用方法
// Opera 安装方法:
//     1. 随便拷贝到一个文件夹下，好吧，最好拷贝到一个单独的文件夹。
//     2. Opera / 设置 / 首选项 / 高级 / 内容 / JavaScript 选项
//        / JavaScript 文件夹 / 选择， 选择刚才的那个文件夹。
//     3. Opera 最好允许插件加载，不过问题不大。
//
// Firefox 安装方法：
//     1. 火狐安装GreaseMonky 扩展
//     2. 把这个文件拖到火狐里去
//     3. 点击安装就可以了，最好配合FlashBlock使用
//
// Chrome 安装方法：
//     1. 扳手 / 工具 / 扩展程序
//     2. 把这个文件拖到浏览器里
//     3. 点击添加，安装完成
//
//==================================================================//

String.prototype.replaceAll  = function(s1,s2){   
    return this.replace(new RegExp(s1,"gm"),s2);   
}

String.prototype.trim = function(){
    //   用正则表达式将前后空格
    //   用空字符串替代。
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

var IP = {};

// 判断OS

// 是Windows系统
IP.isWindows = function(){
    return navigator.appVersion.indexOf("Win") != -1;
};

// 是X11系统
IP.isX11 = function(){
    return navigator.appVersion.indexOf("X11") != -1;
};


// 判断浏览器

// 是Chrome浏览器
IP.isChrome = function(){
    return navigator.appVersion.indexOf("Chrome") != -1;
};

// 是Firefox浏览器
IP.isFirefox = function(){
    return navigator.appName.indexOf("Netscape") != -1;
};

// 获得标题中的数字
IP.getDigitals = function(str){
    var digis = [];
    if (str != null){
        digis = str.replace(/\D/g, ' ').split(' ').sort();
    }
    while (digis.length > 0){
        if (digis[0] == ''){
            digis.shift();
        } else {
            break;
        }
    }
    return digis;
};

// 格式化数字
IP.formatDigital = function(str){

};

// 获取关联度最大的视频
IP.getMostRelateVideo = function(title, videos){
    if (videos == null || videos.length == 0){
        return null;
    }

    // 找有数字相差1的视频
    var titleDigitals = IP.getDigitals(title);
    if (titleDigitals != null && titleDigitals.length > 0){
        for (var i=0; i<videos.length; i++){
            var vDigitals = IP.getDigitals(videos[i].title);
            if (vDigitals == null){
                continue;
            }
            for (var j=vDigitals.length-1; j>=0; j--){
                for (var k=titleDigitals.length-1; k>=0; k--){
                    if (parseInt(titleDigitals[k]) + 1 == vDigitals[j]){
                        return videos[i];
                    }
                }
            }
        }
    }

    return videos[0];
};

//===============================================================
//                      网站定义

IP.siteList = {};
IP.regSite = function(siteDetail){
    if (siteDetail.keys != null && siteDetail.keys.length > 0){
        for(var i=0; i<siteDetail.keys.length; i++){
            IP.siteList[siteDetail.keys[i].replace('.', '_')] = siteDetail;
        }
    }
}

IP.siteYouku = {
    name: '优酷',
    keys: [
        'v.youku.com',
    ],
    getPlayer: function(){
        return {
            player: document.getElementById('player'),
        };
    },
    doRelateVideo: function(){
        var curTitle = null;
        var metas = document.head.getElementsByTagName('meta');
        if (metas != null){
            for (var i=0; i<metas.length; i++){
                if (metas[i]['name'] == 'description'){
                    curTitle = metas[i]['content'];
                    break;
                }
            }
        }
        if (curTitle == null){
            return;
        }
        var relateVideos = null;
        var relateVideoDiv = document.getElementById('vprelationvideo');
        if (relateVideoDiv == null){
            return;
        }
        var tmpDivs = relateVideoDiv.getElementsByTagName('div');
        if (tmpDivs == null){
            return;
        }
        for (var i=0; i<tmpDivs.length; i++){
            if (tmpDivs[i].className == 'items'){
                relateVideos = tmpDivs[i].getElementsByTagName('ul');
                break;
            }
        }
        if (relateVideos == null){
            return;
        }
        var videos = [];
        for (var i=0; i<relateVideos.length; i++){
            var v = relateVideos[i];
            var lis = v.getElementsByTagName('li');
            if (lis == null){
                continue;
            }
            for (var j=0; j<lis.length; j++){
                if (lis[j].className == 'v_link'){
                    var linkAs = lis[j].getElementsByTagName('a');
                    if (linkAs != null && linkAs.length > 0){
                        videos.push(linkAs[0]);
                    }
                    break;
                }
            }
        }
        var relateVideo = IP.getMostRelateVideo(curTitle, videos);
        if (relateVideo != null){
            document.location.href = relateVideo.href;
        }
    },
    handleEndReached : function(){
        // 专辑
        var pagerParam = '?__rt=1&__ro=listShow';
        var divList = document.getElementById('listShow');
        if (divList == null){
            this.doRelateVideo();
            return;
        }
        var ulLists = divList.getElementsByTagName('ul');
        if (ulLists == null){
            this.doRelateVideo();
            return;
        }
        var ulPage = null;
        var ulContent = null;
        for (var i=0; i<ulLists.length; i++){
            if (ulLists[i].className == 'pack_number'){
                ulContent = ulLists[i];
            } else if (ulLists[i].className == 'pages'){
                ulPage = ulLists[i];
            }
        }

        // 点播单
        if (ulContent == null){
            pagerParam = '';
            ulContent = document.getElementById('orderList');
        }

        if (ulContent != null){
            var nextLink = null;
            for (var i=0; i<ulContent.children.length; i++){
                if (ulContent.children[i].className == 'current' && (i+1) < ulContent.children.length){
                    var linkA = ulContent.children[i + 1].getElementsByTagName('a');
                    if (linkA != null && linkA.length > 0){
                        linkA = linkA[0];
                    } else{
                        linkA = null;
                    }
                    if (linkA != null){
                        nextLink = linkA.href;
                    }
                    break;
                }
            }

            if (nextLink == null && ulPage != null){
                // 下翻一页
                var pagerLink = null;
                for (var i=0; i<ulPage.children.length; i++){
                    if (ulPage.children[i].className == 'current' && (i+1) < ulPage.children.length){
                        var linkA = ulPage.children[i + 1].getElementsByTagName('a');
                        if (linkA != null && linkA.length > 0){
                            linkA = linkA[0];
                        } else {
                            linkA = null;
                        }

                        if (linkA != null){
                            pagerLink = linkA.href + pagerParam;
                        }
                        break;
                    }
                }
                var xmlReq = new XMLHttpRequest();
                xmlReq.onreadystatechange = function(){
                    if (xmlReq.readyState == 4){
                        if (xmlReq.status == 200){
                            var parser = document.createElement('div');
                            parser.innerHTML = xmlReq.responseText;
                            var nextPageULs = parser.getElementsByTagName('ul');
                            var nextPageContent = null;
                            if (nextPageULs != null){
                                for (var i=0; i<nextPageULs.length; i++){
                                    if (nextPageULs[i].className == 'pack_number'){
                                        nextPageContent = nextPageULs[i];
                                        break;
                                    }
                                }
                            }
                            if (nextPageContent != null && nextPageContent.children != null && nextPageContent.children.length > 0){
                                var linkA = nextPageContent.children[i].getElementsByTagName('a');
                                if (linkA != null && linkA.length > 0){
                                    linkA = linkA[0];
                                } else {
                                    linkA = null;
                                }
                                if (linkA != null){
                                    document.location.href = linkA.href;
                                } else {
                                    IP.siteYouku.doRelateVideo();
                                }
                            }
                        }
                    }
                };
                xmlReq.open('GET', pagerLink, true);
                xmlReq.send(null);
                return;
            }

            if (nextLink != null){
                document.location.href = nextLink;
            } else {
                this.doRelateVideo();
            }
        }
    },
};
IP.regSite(IP.siteYouku);

IP.siteBilibili = {
    name: 'BiliBili',
    keys: [
        'bilibili.smgbb.cn',
        'www.bilibili.tv',
    ],
    getPlayer: function(){
        var player = document.getElementById('bofqi');
        var embedPlayer = player.children[0];
        return {
            player : player,
            playerHeight : embedPlayer.height,
            playerWidth : embedPlayer.width,
        };
    },
};
IP.regSite(IP.siteBilibili);

IP.siteQiyi = {
    name: '奇异',
    keys: [
        'www.iqiyi.com',
    ],
    getPlayer : function(){
        // 奇异暂时不支持
        return {
            player : document.getElementById('flashbox'),
            playerHeight : "510",
            playerWidth : "900",
        }
    },
};
IP.regSite(IP.siteQiyi);

IP.sitePps = {
    name: 'PPS',
    keys: [
        'v.pps.tv',
        'ipd.pps.tv',
    ],
    getPlayer : function(){
        var player = document.getElementById('p-players');
        if (player == null){
            player = document;    
        }
        var divs = player.getElementsByTagName('div');
        for (var i=0; i<divs.length; i++){
            if (divs[i].className == 'flash-player'){
                player = divs[i];
                break;
            }
        }
        return {
            player : player,
        };
    },
};
IP.regSite(IP.sitePps);

IP.site163 = {
    name: '网易',
    keys: [
        'v.163.com',
    ],
    getPlayer : function(){
        var player = document.getElementById('flashArea');
        return {
            player : player,
            playerHeight : player.clientHeight,
            playerWidth : player.clientWidth,
        };
    },
};
IP.regSite(IP.site163);

IP.siteKankan = {
    name: '迅雷看看',
    keys: [
        'vod.kankan.com',
    ],
    getPlayer : function(){
        return {
            player : document.getElementById('player_container'),
        };
    },
};
IP.regSite(IP.siteKankan);

IP.sitePptv = {
    name: 'PPTV',
    keys: [
        'v.pptv.com',
    ],
    getPlayer : function(){
        return {
            // pptv 暂不支持
            player : document.getElementById('pptv_playpage_box'),
        }
    },
};
IP.regSite(IP.sitePptv);

IP.siteYinyuetai = {
    name: '音悦台',
    keys: [
        'www.yinyuetai.com',
    ],
    getPlayer : function(){
        return {
            player : document.getElementById('player'),
        };
    },
};
IP.regSite(IP.siteYinyuetai);

IP.siteSohu = {
    name: '搜狐视频',
    keys: [
        'tv.sohu.com',
    ],
    getPlayer : function(){
        var player = document.getElementById('sohuplayer');
        var playerHeight = null;
        var playerWidth = null;
        if (player != null && player.parentNode != null){
            playerHeight = player.parentNode.clientHeight;
            playerWidth = player.parentNode.clientWidth;
        }
        return {
            player: player,
            playerHeight: playerHeight,
            playerWidth: playerWidth,
        };
    },
    handleFlvcdU : function(u){
        var sohuReg = new RegExp('^.*&new=');
        var sohuReplaceStr = 'http://newflv.sohu.ccgslb.net';
        return u.replace(sohuReg, sohuReplaceStr);
    }
};
IP.regSite(IP.siteSohu);

IP.site56 = {
    name: '56',
    keys: [
        'www.56.com',
    ],
    getPlayer: function(){
        var player = document.getElementById('VideoPlayObject');
        var playerHeight = null;
        var playerWidth = null;
        if (player != null){
            playerWidth = player.width;
            playerHeight = player.height;
        }
        return {
            player: player,
            playerHeight: playerHeight,
            playerWidth: playerWidth,
        };
    },
};
IP.regSite(IP.site56);

//
//===============================================================


// 获取网站代号
IP.getSiteCode = function(url){
    if (IP.siteList == null){
        return null;
    }
    return IP.siteList[url.host.replace('.', '_')];
};

if (IP.isChrome() == false && IP.isFirefox() == false){
    // 添加jquery支持
    var op_jq = document.createElement("script");
    op_jq.src = "http://code.jquery.com/jquery-1.7.1.js"; //jquery code source
    op_jq.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(op_jq);
}

IP.attachVlcEvent = function(p, event, callback){
    if (p == null || event == null || callback == null){
        return;
    }
    if (typeof p.addEventListener != 'undefined'){
        p.addEventListener(event, callback, false);
    }
    if (typeof p.attachEvent != 'undefined'){
        p.attachEvent(event, callback);
    }
    p['on' + event] = callback;
};

    // 获得跨域内容，通过yql
IP.getCrossDomain = function(url, callback, maxage) {

    if (IP.isChrome() || IP.isFirefox()){

        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(r){
                if (typeof (callback) === 'function'){
                    callback(r.responseText);
                }
            }
        });

        return;
    }

    if (typeof (url) !== 'undefined') {
        var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + url + '"') + '&diagnostics=false&format=xml&callback=?&_maxage=';
        if (typeof (maxage) === 'undefined') {
            yql += '10000'; // Value is in ms
        }
        $.getJSON(yql, function (data) {
            if (typeof (callback) === 'function') {
                callback(data.results[0]);
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            // Some code here to handle a failed request
        });
    }
};

IP.appendTool = function(toolbar, title, func){
    if (toolbar == null){
        return;
    }
    var toolP = document.createElement('p');
    toolP.className = 'ipline';
    var toolA = document.createElement('a');
    toolA.className = 'ipbutton';
    toolA.href = func;
    toolA.innerText = title;
    toolP.appendChild(toolA);
    toolbar.appendChild(toolP);
};

IP.IcePersimmonMain = function(e){

    // 查找到播放器
    IP.playInf = {};

    IP.siteInf = IP.getSiteCode(document.location);
    player = IP.siteInf.getPlayer();

    // 没有找到，退出
    if (player == null || player.player == null){
        return;
    }

    //IP.oldPlayer = player.player.innerHTML;
    // 删掉播放器
    //player.player.innerHTML = '';

    // 用vlc替代
    IP.vlc = document.createElement('embed');
    IP.vlc.type = 'application/x-vlc-plugin';
    IP.vlc.name = 'vlcflash';
    IP.vlc.setAttribute('autoplay', 'true');
    IP.vlc.setAttribute('loop', 'no');
    //vlc.setAttribute('toolbar', 'no');
    IP.vlc.height = player.playerHeight == null ? "100%" : player.playerHeight;
    IP.vlc.width = player.playerWidth == null ? '100%' : player.playerWidth;
    player.player.appendChild(IP.vlc);

    navigator.plugins.refresh(false);

    // 添加CSS
    var btnStyle = document.createElement('style');
    btnStyle.type = 'text/css';
    var styleText = ".ipbutton {\
   border-top: 1px solid #858585;\
   background: #000000;\
   background: -webkit-gradient(linear, left top, left bottom, from(#000000), to(#000000));\
   background: -webkit-linear-gradient(top, #000000, #000000);\
   background: -moz-linear-gradient(top, #000000, #000000);\
   background: -ms-linear-gradient(top, #000000, #000000);\
   background: -o-linear-gradient(top, #000000, #000000);\
   padding: 6.5px 13px;\
   -webkit-border-radius: 5px;\
   -moz-border-radius: 5px;\
   border-radius: 5px;\
   -webkit-box-shadow: rgba(0,0,0,1) 0 1px 0;\
   -moz-box-shadow: rgba(0,0,0,1) 0 1px 0;\
   box-shadow: rgba(0,0,0,1) 0 1px 0;\
   text-shadow: rgba(0,0,0,.4) 0 1px 0;\
   color: #a8a8a8;\
   font-size: 15px;\
   font-family: Georgia, serif;\
   text-decoration: none;\
   vertical-align: middle;\
   }\
 .ipbutton:hover {\
   border-top-color: #6e6e6e;\
   background: #6e6e6e;\
   color: #e0e0e0;\
   }\
 .ipbutton:active {\
   border-top-color: #d4d4d4;\
   background: #d4d4d4;\
   }\
 .ipline{\
   margin: 9px 0px 9px 0px\
  }";
    if (btnStyle.styleSheet){
        btnStyle.styleSheet.cssText = styleText;
    } else {
        btnStyle.appendChild(document.createTextNode(styleText));
    }
    document.getElementsByTagName('head')[0].appendChild(btnStyle);

    IP.toolsDiv = document.createElement('div');
    IP.toolsDiv.style['z-index'] = 9999;
    IP.toolsDiv.height = '100px';
    IP.toolsDiv.width = '20px';
    IP.toolsDiv.style['background-color'] = '#FFFFFF';
    IP.toolsDiv.style['position'] = 'fixed';
    IP.toolsDiv.style['visibility'] = 'show';
    IP.toolsDiv.style['left'] = '0px';
    IP.toolsDiv.style['top'] = '100px';
    IP.toolsDiv.name = 'IPTools';

    IP.appendTool(IP.toolsDiv, '冰柿子', 'javascript:alert("这是冰柿子，冰了没！～～～～");');
    IP.appendTool(IP.toolsDiv, '上一段', 'javascript:if(IP.vlc != null){IP.vlc.playlist.prev();}');
    IP.appendTool(IP.toolsDiv, '下一段', 'javascript:if(IP.vlc != null){IP.vlc.playlist.next();}');

    document.body.appendChild(IP.toolsDiv);

    // 是否刷新过（linux 全屏一下子）
    IP.refreshed = false;
    IP.playIndex = 0;

    // 等待jQuery和vlc加载完
    IP.op_wait = function()
    {
        if (IP.isChrome() == false && IP.isFirefox() == false){
            if(typeof window.jQuery == "undefined"){
                window.setTimeout(IP.op_wait,300);
                return;
            }
        }

        if (IP.isFirefox() == true){
            if (IP.vlc.wrappedJSObject != null){
                IP.vlc = IP.vlc.wrappedJSObject;
            }
        }

        if (typeof IP.vlc.playlist == "undefined"){
            window.setTimeout(IP.op_wait,300);
            return;
        }

        if (IP.isChrome() == false && IP.isFirefox() == false){
            $ = window.jQuery;
        }
        IP.appJQuery();
    }

    // 播放到结尾时
    IP.playerEndReached = function(e){
        if (IP.vlc && IP.vlc.playlist){
            if (IP.isX11()){
                // Linux下需要处理才能自动跳到下面一段
                IP.playIndex++;
                if (IP.playIndex < IP.playInf.Items.length){
                    IP.vlc.playlist.next();
                } else {
                    // 连播
                    if (IP.siteInf != null && IP.siteInf.handleEndReached != null){
                        IP.siteInf.handleEndReached();
                    }
                }
            }
            return;
        }
    };

    // 开始播放时
    IP.playerPlaying = function(){
        if (IP.vlc && IP.vlc.playlist && !IP.refreshed){
            if (IP.isX11()){
                // Linux 下，需要在播放时全屏一下子，才能显示出视频
                IP.vlc.video.toggleFullscreen();
                IP.vlc.video.toggleFullscreen();
            }
            IP.refreshed = true;
            return;
        }
    };

    // 处理解析结果
    IP.handleFlvcdResult = function(html){

        if (html == undefined){
            IP.appJQuery();
            return;
        }

        // vlc 事件处理
        IP.attachVlcEvent(IP.vlc, 'MediaPlayerEndReached', IP.playerEndReached);
        IP.attachVlcEvent(IP.vlc, 'MediaPlayerPlaying', IP.playerPlaying);

        var parse = document.createElement('div');
        parse.innerHTML = html;

        var forms = parse.getElementsByTagName('form');
        if (forms != null){
            var playInfValue = null;
            for (var i=0; i<forms.length; i++){
                if (forms[i].getAttribute('name') == 'm3uForm'){
                    // 又找到了 ^_^

                    var mform = forms[i];
                    var inputs = mform.getElementsByTagName('input');
                    if (inputs == null){
                        break;
                    }
                    for (var j=0; j<inputs.length; j++){
                        if (inputs[j].getAttribute('name') == 'inf'){

                            playInfValue = inputs[j].value;

                            break;
                        }
                    }

                    break;
                }
            }
            if (playInfValue == null){
                var ass = parse.getElementsByTagName('a');
                if (ass != null){
                    for (var i=0; i<ass.length; i++){
                        if (ass[i].getAttribute('class') == 'link'){
                            
                            playInfValue = ass[i].href;
                            break;    
                        }
                    }    
                }
            }

            IP.playInf = {};
            if (playInfValue != null && playInfValue.trim() != ''){
                IP.playInf.Items = playInfValue.replace(/\n/g, ' ').replace(/\r/g, ' ').replace(/\|/g, ' ').split(' ');
            }
        }

        IP.vlc.playlist.stop();
        IP.vlc.playlist.clear();
        player = IP.siteInf.getPlayer();
        if (IP.playInf != null && IP.playInf.Items != null && IP.playInf.Items.length > 0){
            // 添加到vlc播放列表
            for (var i=0; i<IP.playInf.Items.length; i++){
                if (IP.siteInf != null && IP.siteInf.handleFlvcdU != null){
                    IP.playInf.Items[i] = IP.siteInf.handleFlvcdU(playInf.Items[i].replace('\n', ''));
                }
                IP.vlc.playlist.add(IP.playInf.Items[i].replace('\n',''));
            }
            IP.vlc.playlist.playItem(0);
            IP.playIndex = 0;
            if (player != null && player.player != null){
                while(
                    player.player.childNodes.length > 1    
                ){
                    player.player.removeChild(player.player.firstChild);
                }
            }
        } else {
            if (player != null && player.player != null){
                player.player.removeChild(player.player.lastChild);
            }
        }

        // 检测是不是有别的分辨率
        var hrefList = parse.getElementsByTagName('a');
        for (var i=hrefList.length - 1; i>0; i--){
            var hrefOtherParser = hrefList[i];
            if (hrefOtherParser.children.length <= 0){
                continue;
            }
            if (hrefOtherParser.children[0].tagName != 'FONT'){
                continue;
            }
            var fontObj = hrefOtherParser.children[0];
            if (fontObj.children.length <= 0){
                continue;
            }
            var titleObj = fontObj.children[0].innerText;
            if (titleObj.length < 4){
                continue;
            }
            if (titleObj.substr(titleObj.length - 4, 4) == '模式解析'){
                IP.appendTool(IP.toolsDiv, titleObj.substr(0, titleObj.length - 4) + '版', "javascript:IP.getCrossDomain('http://www.flvcd.com/" + hrefOtherParser.href.substr(hrefOtherParser.href.indexOf('parse.php')) + "', IP.handleFlvcdResult, null);");
            }
        }
    };

    IP.appJQuery = function(){
        IP.getCrossDomain("http://www.flvcd.com/parse.php?flag=one&format=super&kw=" + encodeURIComponent(document.location), IP.handleFlvcdResult, null);
    };
    IP.op_wait();
};

IP.IcePersimmonMain();
//window.addEventListener('load', IcePersimmonMain, false);
