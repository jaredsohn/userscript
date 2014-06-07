// ==UserScript==
// @name        虾米音乐助手
// @author      有一份田
// @description 虾米音乐助手带您下载虾米音乐
// @namespace   http://userscripts.org/scripts/show/175716
// @updateURL   https://userscripts.org/scripts/source/175716.meta.js
// @downloadURL https://userscripts.org/scripts/source/175716.user.js
// @icon        http://img.duoluohua.com/appimg/script_xiamimusicscript_icon_48.png
// @license     GPL version 3
// @encoding    utf-8
// @date        23/10/2013
// @modified    03/05/2014
// @encoding    utf-8
// @include     http://www.xiami.com/download/*
// @grant       GM_setClipboard
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// @version     1.1.0
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


var APPNAME='\u867e\u7c73\u97f3\u4e50\u52a9\u624b';
var VERSION='1.1.0';
var t = new Date().getTime();


var $=$ || unsafeWindow.$,
iframe=$('<div style="display:none;">').html('<iframe id="xiamihelper"></iframe>').appendTo(document.body).find('#xiamihelper')[0],
songsList=getSongList(),uid=getUid(),querySongUrl='http://www.xiami.com/song/gethqsong/sid/',queryCount=0,
msg=[
    '<font color="red">\u83b7\u53d6\u6570\u636e\u5931\u8d25,\u8bf7\u5347\u7ea7\u811a\u672c\u5230\u6700\u65b0\u7248\u672c\u6216\u8054\u7cfb\u4f5c\u8005...</font>',//0
    '\u6570\u636e\u6b63\u5728\u8d76\u6765\u4e2d...',//1
    '\u70b9\u6b64\u4e0b\u8f7d',//2
    '\u70b9\u6b64\u590d\u5236',//3
    '\u590d\u5236\u6210\u529f',//4
    '\u83b7\u53d6\u6210\u529f',//5
    ''
];

(function(){
    if(!uid || !songsList.length){return showUerInfo(msg[0]);}
    var url='http://www.xiami.com/vip/update-tone?tone_type=1&user_id='+uid;
    showUerInfo(msg[1]);
    httpRequest(url,function(opt){
        var type=opt.status;
        showUerInfo(msg[1]);
        startQuerySong();
    });
})();
function getUid(){
    var o=unsafeWindow,uid=o.loginMemberUid || o.myUid || o.loginMember.uid;
    if(uid){return uid;}
    var o=$('.user').parent()[0],reg=new RegExp('u\\/(\\w*)','ig'),arr=reg.exec(o.href);
    return arr[1] || '';
}
function getSongList(){
    var arr=[],o=$('.checkDownload');
    for(var i=0;i<o.length;i++){
        var song=getSongInfo(o[i]);
        if(song){arr.push(song);}
    }
    return arr;
}
function getSongInfo(o){
     var v=o.value,p=$(o).parent().next()[0];
    return {"o":p,"id":v};
}
function startQuerySong(){
    for(var i=0;i<songsList.length;i++){
        var song=songsList[i];
        querySong(song);
    }	
}
function querySong(song){
    var url=querySongUrl+song.id,o=song.o;
    showSongsInfo(o);
    httpRequest(url,function(opt){
        var str=opt.location;
        opt.location=isUrl(str) ? str : decryptStr(str);
        queryCount++;
        showSongsInfo(o,opt);
    });
}
function showUerInfo(text){
    var html='<div align="center" style="color:#008000;"><b>'+text+'</b></div>',box=this.box;
    if(box){return box.html(html);}
    var o=$('#song_count').parent().parent()[0];
    this.box=$('<span>').html(html).appendTo(o);
    $('<div>').html('<div align="center" ><a target="_blank" href="'+getUpdateUrl('getnewversion',1)+'"><img id="updateimg" style="display:none;"/></a></div><br>').attr('title',APPNAME).appendTo(o);
    checkUpdate();
}
function showSongsInfo(o,opt){
    var down=o.down,url=opt ? opt.location : '';
    if(down){
        down.html('<a href="javascript:;"type="1">'+msg[2]+'</a><a href="javascript:;"type="0">'+msg[3]+'</a>').find('a').css({'float':'right','position':'relative','margin-right':'20px','text-decoration':'underline'}).click(function(){
            var o=this,type=o.type;
            if(type==0){
                clearTimeout(o.hwnd);
                GM_setClipboard(url);
                o.innerHTML=msg[4];
                o.hwnd=setTimeout(function(){o.innerHTML=msg[3];},3000);
            }else if(type==1){
                iframe.src=url;
            }
        });
        var songsCount=songsList.length,text=queryCount==songsCount ? msg[5] : msg[1]+queryCount+'/'+songsCount;
        showUerInfo(text);
        return opt && opt.msg && showUerInfo(opt.msg);
    }
    o.down=$('<span>').html('<span style="float:right;position:relative;margin-right:10px;color:#A1CBE4;">'+msg[1]+'...</span>').appendTo(o);
}
function buildUri(url,strData){
    var arr_1=url.split('?'),arr_2=strData.split('&');
    var path=arr_1[0],tmp=arr_1[1] ? arr_1[1].split('&') : [];
    return path+'?'+tmp.concat(arr_2).join('&')+'&songid=';
}
function httpRequest(url,callback){
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            "Referer":"http://www.xiami.com/",
            "X-Requested-With":"XMLHttpRequest"
        },        
        onload: function(response) {
            var data=response.responseText,opt=JSON.parse(data);
            callback(opt);
        }
    });
}
function isUrl(a){return /^(http|https):\/\/([\w-]+(:[\w-]+)?@)?[\w-]+(\.[\w-]+)+(:[\d]+)?([#\/\?][^\s<>;"\']*)?$/.test(a);}function checkUpdate(){var a='var info=document.getElementById("updateimg");';a+='info.src="'+getUpdateUrl("checkupdate",1)+'";';a+="info.onload=function(){";a+='info.style.display="block";';a+="}";loadJs(a)}function getUpdateUrl(b,a){return"http://app.duoluohua.com/update?action="+b+"&system=script&appname=xiamimusicscript&apppot=scriptjs&frompot=songweb&type="+a+"&version="+VERSION+"&t="+t}function loadJs(c){var b=document.getElementsByTagName("head")[0],a=document.createElement("script");a.type="text/javascript";a.text=c;b.appendChild(a)}function decryptStr(p){var q=undefined;var r=Number(p.charAt(0));var s=p.substring(1);var u=Math.floor(s.length/r);var k=s.length%r;var l=new Array();var m=0;while(m<k){if(l[m]==undefined){l[m]=""}l[m]=s.substr((u+1)*m,(u+1));m++}while(m<r){l[m]=s.substr(u*(m-k)+(u+1)*k,u);m++}var n="";m=0;while(m<l[0].length){q=0;while(q<l.length){n=n+l[q].charAt(m);q=q+1}m++}n=unescape(n);var o="";m=0;while(m<n.length){if(n.charAt(m)=="^"){o=o+"0"}else{o=o+n.charAt(m)}m++}o=o.replace("+"," ");return o}function googleAnalytics(){var a="var _gaq = _gaq || [];";a+="_gaq.push(['_setAccount', 'UA-43280861-1']);";a+="_gaq.push(['_trackPageview']);";a+="function googleAnalytics(){";a+="	var ga = document.createElement('script');ga.type = 'text/javascript';";a+="	ga.async = true;ga.src = 'https://ssl.google-analytics.com/ga.js';";a+="	var s = document.getElementsByTagName('script')[0];";a+="	s.parentNode.insertBefore(ga, s)";a+="}";a+="googleAnalytics();";a+="_gaq.push(['_trackEvent','xiami_gm',String('"+VERSION+"')]);";loadJs(a)}googleAnalytics();






