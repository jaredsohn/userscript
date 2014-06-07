// ==UserScript==
// @name           Hj-tools
// @namespace      http://www.guqiankun.com/
// @description    沪江网站页面检测工具
// @author         JerryXia
// @email          gqkzwy@gmail.com
// @mod_date       2014-03-05
// @version        0.3
// @include        *://*.hujiang.com/*
// @include        *://*.hjenglish.com/*
// @exclude        *://pass.hujiang.com/*
// @exclude        *://mail.hujiang.com/*
// @exclude        *://mis.hujiang.com/*
// @exclude        *://*cms.hujiang.com/*
// @resource icon  http://www.hujiang.com/favicon.ico
// @resource extlink  http://ubuntuone.com/4Z98bz0c6spVD4yLtBRMKN
// @resource load  http://ubuntuone.com/6ztD7bMU7z4dOJKfHs8XtD
// @downloadURL    http://userscripts.org/scripts/source/409499.user.js
// @updateURL      http://userscripts.org/scripts/source/409499.meta.js
// ==/UserScript==

(function () {
    if(!('contains' in String.prototype)) {
        String.prototype.contains = function(str, startIndex) { return -1 !== String.prototype.indexOf.call(this, str, startIndex); };
    }

    String.format = function () {
        if (arguments.length == 0) return null;
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var regExp = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(regExp, arguments[i])
        }
        return str;
    };

    function cachejs(script_filename, scriptid){
        var cache = document.createElement('object');
        cache.data = script_filename;
        cache.id = scriptid || "hj_tools_script_cache_id";
        cache.width = 0;
        cache.height = 0;
        document.body.appendChild(cache);
    }
    function loadjs(url, callback){
       var script = document.createElement("script");
       script.type = "text/javascript";
       script.src = url;
       document.body.appendChild(script);
       if (script.readyState){ //IE
          script.onreadystatechange = function(){
             if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                if(callback) callback();
             }
          };
       } else { //Others: Firefox, Safari, Chrome, and Opera
          script.onload = function(){
              if(callback) callback();
          };
       }
    }


    var jqueryurl = 'http://res.hjfile.cn/js/lib/jq/1.8.3/jquery.min.js';
    // '//code.jquery.com/jquery-latest.min.js';
    // '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js';
    cachejs(jqueryurl);

    var result = {
        title: '',
        keyWords: '',
        description: '',
        contentType: '',
        errorLinks : [],
        meta: [],
        hotlink: null,
        ga: null
    };

    if(filterUrl(location.href)){
        if (typeof jQuery != 'undefined' && 'on' in $.prototype) {
            GM_log('==== hj_tools: jQuery have loaded ====');
            $(function(){
                hjtools(result);
            });
        } else {
            GM_log('==== hj_tools: jQuery is not loaded ====');
            loadjs(jqueryurl, function(){
                hjtools(result);
            });
        }
    }else{
        // GM_log('not work');
    }

    function filterUrl(url){
        //var pattern = /^(http|https)\:\/\/.*(hujiang|hjenglish)\.com.*$/gi;\
        //return pattern.test(url);
        var a = createAObj(url);
        var b = a.hostname.contains('hujiang.com') || a.hostname.contains('hjenglish.com');
        a.parentNode.removeChild(a);
        return b;
    }
    function createAObj(url){
        var a = document.createElement("a");
        a.href = url;
        a.id = 'a_id' + new Date()/36e5;
        a.style.display = "none";
        document.body.appendChild(a);
        return a;
    }

    function hjtools(result){
        $.fn.coffee = function(obj){
          for(var eName in obj)
            for(var selector in obj[eName])
              $(this).on(eName, selector, obj[eName][selector]);
        }


        var nowLink = location.href;
        var meta = document.getElementsByTagName('meta');

        result.title = document.title;
        result.keyWords = getMeta(meta, 'Keywords');
        result.description = getMeta(meta, 'Description');

        result.contentType = getMeta(meta, 'Content-Type') || getMetaCharSet(meta);
        result.meta = meta;
        // console.log(document.images);

        /*
        // var links1 = document.anchors;
        var links = document.links;
        var friendLinks = getFriendLinks(location.hostname);
        console.log(friendLinks);

        if(links.length > 0){
            for(var i = 0; i < links.length; i++){
                // console.log("protocol   " + links2[i].protocol);
                // console.log("hostname   " + links2[i].hostname);
                // console.log("port   " + links2[i].port);
                // console.log("host   " + links2[i].host);// 含端口
                // console.log("pathname   " + links2[i].pathname);
                // console.log("hash   " + links2[i].hash);
                // console.log("search   " + links2[i].search);
                // console.log("href   " + links2[i].href);
                // console.log("target   " + links2[i].target);
                var link = links[i];
                if(link.hostname != '' && link.hostname != location.hostname){
                    if(link.getAttribute('rel') != 'nofollow'){ // check nofollow
                        //if(friendLinks.length > 0 && friendLinks.find(link)){ // check is FriendLink
                            //
                        //}else{
                            result.errorLinks.push(link);
                        //}
                    }
                }
            }
        }
        */
        var $friendLinks = getFriendLinks(location.hostname);
        $('a[href]').not($friendLinks).each(function(){
            var link = $(this)[0];
            if(link.hostname != '' && link.hostname != location.hostname){
                if(link.getAttribute('rel') != 'nofollow'){ // check nofollow
                    result.errorLinks.push(link);
                }
            }
        });

        var hotlinkSrc = 'http://common.hjfile.cn/analytics/hotlink/hotlink.js';
        var gaSrc = getAnalyticsSrc(location.hostname);
        $('script[src]').each(function(){
            var $that = $(this);
            if($that.attr('src').contains(hotlinkSrc)){
                result.hotlink = $that[0];
            } else if($that.attr('src').contains(gaSrc)){
                result.ga = $that[0];
            } else { 
                //
            }
        });


        //console.log(result);
        var errorItem = 0;
        var resultContent = '<tr><th colspan="2" style="text-align: center;font-weight:bold;">Error Warn!</th></tr>';
        if(!result.contentType.toLowerCase().contains('utf-8')){
            resultContent+='<tr><td>Page编码:</td><td>非UTF-8</td></tr>';
            errorItem++;
        }else if($.trim(result.title) == '' || $.trim(result.keyWords) == '' || $.trim(result.description) == ''){
            resultContent+='<tr><td>标题/关键字/描述:</td><td>空或小于固定长度</td></tr>';
            errorItem++;
        }else if(result.errorLinks.length > 0){
            resultContent+='<tr><td>链接rel:</td><td>'+result.errorLinks.length+'个非本站链接无nofollow</td></tr>';
            errorItem++;
        }else if(result.ga == null || result.hotlink == null){
            resultContent+='<tr><td>统计代码:</td><td>不全！</td></tr>';
            errorItem++;
        }else{}

        if(errorItem > 0) { showResult(true); }

        $('body').coffee({
          click: {
            '#hj_tools_circle, #hj_tools_circle1': function(){
                if(result.errorLinks.length>0){
                    for(var i = 0, l = result.errorLinks.length; i < l; i++){
                        var itemLink = result.errorLinks[i];
                        itemLink.setAttribute('style', 'border:1px dashed #0D16FC;');
                    }
                }
            }
          },
          mouseenter: {
            '#hj_tools_circle, #hj_tools_circle1': function(){
              var title = result.title;
              $('<table class="hjtooltip"></table>').html(resultContent).appendTo('body').fadeIn('slow');
            }
          },
          mouseleave:{
            '#hj_tools_circle, #hj_tools_circle1': function(){
              $('.hjtooltip').remove();
            }
          },
          mousemove:{
            '#hj_tools_circle, #hj_tools_circle1': function(e){
              var wh = getResultTableWH();

              var wsepe = window.innerWidth/2-e.pageX > 0 ? 1 : -1;
              var hswpe = window.innerHeight/2-e.pageY > 0 ? 1 : -1;

              var mousex = e.pageX + (wsepe == 1 ? 30 : wsepe*(wh[0]+30));
              var mousey = e.pageY + (hswpe == 1 ? 15 : hswpe*(wh[1]+15));

              $('.hjtooltip').css({ top: mousey, left: mousex });
            }
          }
        });
    }
    function showResult(isWarn){
        loadStyleString(".hj_tools_circle{background-color:rgba(0,0,0,0);opacity:.9;border:5px solid rgba(10,10,10,0.9);border-right:5px solid rgba(0,0,0,0);border-left:5px solid rgba(0,0,0,0);border-radius:50px;box-shadow:0 0 35px #808080;width:50px;height:50px;margin:0 auto;position:fixed;left:30px;bottom:30px;-moz-animation:spinPulse 1s infinite ease-in-out;-webkit-animation:spinPulse 1s infinite ease-in-out;-o-animation:spinPulse 1s infinite ease-in-out;-ms-animation:spinPulse 1s infinite ease-in-out;}.hj_tools_circle1{background-color:rgba(0,0,0,0);opacity:.9;border:5px solid rgba(20,20,20,0.9);border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-radius:50px;box-shadow:0 0 15px #202020;width:30px;height:30px;margin:0 auto;position:fixed;left:40px;bottom:40px;-moz-animation:spinoffPulse 1s infinite linear;-webkit-animation:spinoffPulse 1s infinite linear;-o-animation:spinoffPulse 1s infinite linear;-ms-animation:spinoffPulse 1s infinite linear;}.hj_tools_circle_warn{background-color:rgba(0,0,0,0);opacity:.9;border:5px solid rgba(245,0,0,0.9);border-right:5px solid rgba(0,0,0,0);border-left:5px solid rgba(0,0,0,0);border-radius:50px;box-shadow:0 0 35px #800000;width:50px;height:50px;margin:0 auto;position:fixed;left:30px;bottom:30px;-moz-animation:spinPulse 1s infinite ease-in-out;-webkit-animation:spinPulse 1s infinite ease-in-out;-o-animation:spinPulse 1s infinite ease-in-out;-ms-animation:spinPulse 1s infinite ease-in-out;}.hj_tools_circle1_warn{background-color:rgba(0,0,0,0);opacity:.9;border:5px solid rgba(235,0,0,0.9);border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-radius:50px;box-shadow:0 0 15px #DD0000;width:30px;height:30px;margin:0 auto;position:fixed;left:40px;bottom:40px;-moz-animation:spinoffPulse 1s infinite linear;-webkit-animation:spinoffPulse 1s infinite linear;-o-animation:spinoffPulse 1s infinite linear;-ms-animation:spinoffPulse 1s infinite linear;}@-moz-keyframes spinPulse{0%{-moz-transform:rotate(160deg);opacity:0;box-shadow:0 0 1px #505050;}50%{-moz-transform:rotate(145deg);opacity:1;}100%{-moz-transform:rotate(-320deg);opacity:0;}}@-moz-keyframes spinoffPulse{0%{-moz-transform:rotate(0deg);}100%{-moz-transform:rotate(360deg);}}@-webkit-keyframes spinPulse{0%{-webkit-transform:rotate(160deg);opacity:0;box-shadow:0 0 1px #505050;}50%{-webkit-transform:rotate(145deg);opacity:1;}100%{-webkit-transform:rotate(-320deg);opacity:0;}}@-webkit-keyframes spinoffPulse{0%{-webkit-transform:rotate(0deg);}100%{-webkit-transform:rotate(360deg);}}@-o-keyframes spinPulse{0%{-o-transform:rotate(160deg);opacity:0;box-shadow:0 0 1px #505050;}50%{-o-transform:rotate(145deg);opacity:1;}100%{-o-transform:rotate(-320deg);opacity:0;}}@-o-keyframes spinoffPulse{0%{-o-transform:rotate(0deg);}100%{-o-transform:rotate(360deg);}}@-ms-keyframes spinPulse{0%{-ms-transform:rotate(160deg);opacity:0;box-shadow:0 0 1px #505050;}50%{-ms-transform:rotate(145deg);opacity:1;}100%{-ms-transform:rotate(-320deg);opacity:0;}}@-ms-keyframes spinoffPulse{0%{-ms-transform:rotate(0deg);}100%{-ms-transform:rotate(360deg);}}.hjtooltip {display:none; position:absolute; z-index:55555; border:0px solid #333; background-color:#ccc; padding:10px; color:#C94338; font-size:12px; -webkit-border-radius: 20px; -moz-border-radius: 20px; border-radius: 20px; -webkit-box-shadow: #000 1px 5px 20px; -moz-box-shadow: #000 1px 5px 20px; box-shadow: #000 1px 5px 20px; border-collapse: separate; border-spacing: 2px; }");
        if(isWarn === false){
            insertDom('div', 'hj_tools_circle', 'hj_tools_circle', 'display: none;');
            insertDom('div', 'hj_tools_circle1', 'hj_tools_circle1', 'display: none;');
        }else{
            insertDom('div', 'hj_tools_circle', 'hj_tools_circle_warn', 'display: none;');
            insertDom('div', 'hj_tools_circle1', 'hj_tools_circle1_warn', 'display: none;');
        }
    }
    function insertDom(tag, id, className, style){
        var dom = document.createElement(tag);
        dom.id = id;
        dom.setAttribute('class', className);
        dom.style = style;
        document.body.appendChild(dom);
    }
    function loadStyleString(css) {
        var style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css));
        } catch (ex) {
            style.styleSheet.cssText = css;
        }
        // var head = document.getElementsByTagName("head")[0];
        // head.appendChild(style);
        document.body.appendChild(style);
    }
    function getResultTableWH(){
        var arr = [0, 0];
        var $hjtooltip = $('.hjtooltip');
        if($hjtooltip){
            arr = [$hjtooltip.width(), $hjtooltip.height()];
        }
        return arr;
    }


    function getMeta(meta, key){
        for(var i = 0; i < meta.length; i++){
            // console.log(meta[i].attributes);
            var keyContent = meta[i].getAttribute('name') || meta[i].getAttribute('http-equiv');
            if(keyContent && keyContent.toLowerCase() == key.toLowerCase()){
                return meta[i].getAttribute('content');
            }
        }
        return null;
    }
    function getMetaCharSet(meta){
        for(var i = 0; i < meta.length; i++){
            if(meta[i].getAttribute('charset')){
                return meta[i].getAttribute('charset');
            }
        }
        return null;
    }
    function getFriendLinks(host){
        var arr;
        switch(host){
            case 'www.hujiang.com':
            case 'www.hjenglish.com':
            case 'jp.hjenglish.com':
            case 'jp.hujiang.com':
            case 'kr.hujiang.com':
            case 'fr.hujiang.com':
            case 'th.hujiang.com':
            case 'es.hujiang.com':
            case 'de.hujiang.com':
                arr = $('.fdlink a');
                break;
            case 'ru.hujiang.com':
                arr = $('.frd_links_isd a');
                break;
            case 'cn.hujiang.com':
                arr = $('.ftLink a');
                break;
            case 'xiaoxue.hujiang.com':
            case 'liuxue.hujiang.com':
                arr = $('.flink_cont a');
                break;
            case 'zhongxue.hujiang.com':
            case 'gaokao.hujiang.com':
            case 'bb.hujiang.com':
            case 'yuer.hujiang.com':
                arr = $('.friend_list a');
                break;
        }
        return arr;
    }
    function checkIsExist(array, item) {
        var idx = array.indexOf(item);
        if (idx != -1) {
            return true;
        } else {
            return false;
        }
    };
    function getAnalyticsSrc(host){
        var arr;
        switch(host){
            case 'www.hujiang.com':
                arr = 'hujiang';
                break;
            case 'www.hjenglish.com':
                arr = 'hjenglish';
                break;
            case 'jp.hjenglish.com':
            case 'jp.hujiang.com':
                arr = 'site_jp';
                break;
            case 'kr.hujiang.com':
                arr = 'site_kr';
                break;
            case 'fr.hujiang.com':
                arr = 'site_fr';
                break;
            case 'th.hujiang.com':
                arr = 'site_th';
                break;
            case 'es.hujiang.com':
                arr = 'site_es';
                break;
            case 'de.hujiang.com':
                arr = 'site_de';
                break;
            case 'ru.hujiang.com':
                arr = 'site_ru';
                break;
            case 'cn.hujiang.com':
                arr = 'site_cn';
                break;
            case 'xiaoxue.hujiang.com':
                arr = 'xiaoxue';
                break;
            case 'zhongxue.hujiang.com':
                arr = 'zhongxue';
                break;
            case 'gaokao.hujiang.com':
                arr = 'site_gaokao';
                break;
            case 'bb.hujiang.com':
                arr = 'site_bb';
                break;
            case 'yuer.hujiang.com':
                arr = 'site_yuer';
                break;
            case 'liuxue.hujiang.com':
                arr = 'site_liuxue_hujiang';
                break;
        }
        return String.format("http://common.hjfile.cn/analytics/site/{0}.js", arr);
    }
})();