// ==UserScript==
// @name        贴吧IP助手
// @author      有一份田
// @description 显示百度贴吧用户最近一次登录的IP及归属地
// @namespace   http://userscripts.org/scripts/show/185343
// @updateURL   https://userscripts.org/scripts/source/185343.meta.js
// @downloadURL https://userscripts.org/scripts/source/185343.user.js
// @icon        http://img.duoluohua.com/appimg/script_tiebashowip_icon_48.png
// @license     GPL version 3
// @encoding    utf-8
// @date        03/12/2013
// @modified    04/12/2013
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?ct*
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// @version     1.0.3
// ==/UserScript==



/*
 * === 说明 ===
 *@作者:有一份田
 *@官网:http://www.duoluohua.com/download/
 *@Email:youyifentian@gmail.com
 *@Git:http://git.oschina.net/youyifentian
 *@转载重用请保留此信息
 *
 *
 * */



var VERSION='1.0.3';
var APPNAME='\u8d34\u5427IP\u52a9\u624b';

(function(){
    var $=unsafeWindow.$;
    var isAuto=1==localStorage['tiebaip'] ? 1 : 0,ipCache={},
    cssArr=['core_reply_tail','lzl_content_reply','j_lzl_m_w','core_title_btns'],
    msg=['','\u81ea\u52a8\u663eIP','\u624b\u52a8\u663eIP','\u4e2d\u56fd','IP\u5730\u5740\u4e3a\u7a7a','IP\u5730\u5740\u6709\u8bef','\u672c\u5730\u5c40\u57df\u7f51','IP\u4fe1\u606f\u67e5\u8be2\u5931\u8d25'],
    obj=$.merge($('.'+cssArr[0]).attr('type',cssArr[0]), $('.'+cssArr[1]).attr('type',cssArr[1]));
    (function(){
        var e=document.createElement('li');
        e.innerHTML='<a class="l_lzonly tiebaipset"href="javascript:;">'+getHtml(isAuto)+'</a>';
        $(e).find('a').click(function(){
            isAuto=0==localStorage['tiebaip'] ? 1 : 0;
            localStorage['tiebaip']=isAuto;
            this.innerHTML=getHtml(isAuto);
            //console.log(isAuto);
        }).css({"position":"absolute","margin-left":"-80px"});
        $(e).insertBefore($('ul.'+cssArr[3]).children()[0]);
        function getHtml(b){
            return '<span class="d_lzonly_bdaside" style="color:#1D53BF;">'+(!b ? msg[1] : msg[2])+'</span>';
        }
    })();
    for(var i=0;i<obj.length;i++){
        createElement(obj[i]);
    }
    $('.'+cssArr[2]).bind('DOMNodeInserted',function(e){
        var o=$(e.target).find('.'+cssArr[1]).attr('type',cssArr[1]);
        if(o.length){createElement(o[0]);}
    });
    function createElement(o){
        var e=document.createElement('span');
        e.innerHTML='<span class="ipcontent" style="display:none;"><span class="lzl_time"><img align="absmiddle" src="http://note.baidu.com/statics/images/alg/loading.gif"/>&nbsp;\u6570\u636e\u52a0\u8f7d\u4e2d...</span></span><span class="lzl_s_r showipbtn"><a href="javascript:;" style="display:;text-decoration:underline;"><b>\u67e5\u770bIP</b></a>&nbsp;&nbsp;&nbsp;&nbsp;</span>';
        var btn=$(e).find('a');
        btn.attr('uname',getUname(o))[0].onclick=startQuery;
        o.insertBefore(e,(cssArr[1]==$(o).attr('type') ? $(o).children('span.lzl_time')[0] : o.firstChild));
        $(o).css({"margin-top":"15px"});
        if(isAuto){
            setTimeout(function(){startQuery.apply(btn[0]);},0);
        }
    }
    function getUname(o){
        var p=$.merge($(o).parent().parent('li.lzl_single_post'),$(o).parent().parent().parent('div.l_post')),
        data=p.attr('data-field'),obj=$.parseJSON(data),uname=obj.user_name || obj.author.name;
        //console.log(uname);
        return uname;
    }
    function startQuery(){
        var ipcon=$(this).parent().siblings('span.ipcontent').css({"display":""})[0];
        this.style.display='none';
        queryIp($(this).attr('uname'),ipcon);
    }
    function queryIp(uname,o){
        var cache=ipCache[uname],url='http://tieba.baidu.com/home/get/panel?ie=utf-8&un='+uname,ip='';
        if(cache && 0==cache.status){
            //console.log(cache);
            return showIpInfo(uname,cache,o);
        }
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: function(response){
                var html=response.responseText,obj=$.parseJSON(html);
                if(0==obj.no){
                    ip=obj.data.puserinfo.lastip;
                }
                //console.log(obj);
                queryIpAddress(uname,ip,o);
            }
        });
    }
    function queryIpAddress(uname,ip,o){
        var index=ip.length ? 5 : 4,
            ret={
            "status": index,
            "ip": ip,
            "country": "",
            "province": "",
            "city": "",
            "district": "",
            "isp": "",
            "type": "",
            "desc": "",
            "msg": msg[index]
        };
        if(isIp(ip)){
            var url='http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip='+ip;
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                onload: function(response){
                    var html=response.responseText,ojb={};
                    index=7;
                    if(html.indexOf('ret')>=0){
                        obj=$.parseJSON(html);
                        if(obj.ret>0){
                            index=0;
                        }else if(-1==obj.ret){
                            index=6;
                        }
                    }
                    for(var _ in ret){
                        if (ret.hasOwnProperty(_)) {
                            if(obj[_]){
                                ret[_]=obj[_];
                            }
                        }
                    }
                    ret.status=index;
                    ret.msg=msg[index];
                    showIpInfo(uname,ret,o);
                }
            });
        }else{
            showIpInfo(uname,ret,o);
        }
    }
    function showIpInfo(uname,opt,o){
        var html=opt.ip+'&nbsp;,&nbsp;';
        if(0!=opt.status){
            html+=opt.msg;
        }else{
            html+=(msg[3]==opt.country ? '' : opt.country)+opt.province+'&nbsp;'+opt.city+'&nbsp;'+opt.district+'&nbsp;'+opt.isp+'&nbsp;';
            html+=opt.type || opt.desc ? '('+opt.type+'&nbsp;'+opt.desc+')' : '';
            ipCache[uname]=opt;
        }
        o.innerHTML=html;
    }
})();
function isIp(ip){
    return /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/.test(ip);
}
function loadJs(js) {
    var oHead = document.getElementsByTagName('HEAD')[0],
    oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.text = js;
    oHead.appendChild(oScript);
}
function googleAnalytics() {
    var js = "var _gaq = _gaq || [];";
    js += "_gaq.push(['_setAccount', 'UA-46177032-1']);";
    js += "_gaq.push(['_trackPageview']);";
    js += "function googleAnalytics(){";
    js += "	var ga = document.createElement('script');ga.type = 'text/javascript';";
    js += "	ga.async = true;ga.src = 'https://ssl.google-analytics.com/ga.js';";
    js += "	var s = document.getElementsByTagName('script')[0];";
    js += "	s.parentNode.insertBefore(ga, s)";
    js += "}";
    js += "googleAnalytics();";
    js += "_gaq.push(['_trackEvent','tiebashowip',String('" + VERSION + "')]);";
    loadJs(js);
}
googleAnalytics();

