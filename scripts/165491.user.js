// ==UserScript==
// @name       Bilibili Fixer - Perfect!
// @namespace  FireAway-剑仙乘仙剑
// @version    2.9.9.9.9.2 不要介意这么多⑨ 真的~~~
// @description 
// @include      http://www.bilibili.tv/*
// @updateURL       http://userscripts.org/scripts/source/165424.meta.js
// @downloadURL     http://userscripts.org/scripts/source/165424.user.js
// @copyright  FireAway~
// @run-at document-start
// ==/UserScript==
var version = "2.9.9.9.9.2";
/** 获取浏览器类型以及新接口的使用设想(预计V3.0使用)
// SouGou metasr
// Chrome chrome safari
// Firefox firefox
// 360Chrome safari
// 360se safari
// Maxton maxthon chrome safari
// Safari safari
var ua = navigator.userAgent.toLowerCase();
var isMaxthon = ua.indexOf("maxthon")>-1;
var vURL = 'http://interface.bilibili.tv/playurl?otype=JSON&type=FLV&cid='

*/
/** 获取UP主用户名(预计V3.0使用)
var user = document.getElementById("r-info-rank").childNodes[1].innerHTML;
var name = document.getElementsByTagName("h2")[0].innerHTML;
*/

var a ;
var url="http://fireawayh2.1x.biz/1.html";

var list = document.createElement("select");
list.type = "select";
list.id = "list";
list.add(new Option("比利海灵顿祈祷中……", "比利海灵顿祈祷中……"));

function getCid(id) {
    //以下是海贼王专用更换CID按钮以及提示信息
    var changeCidB = document.createElement('button');
    changeCidB.id = "B";
    changeCidB.type = "button";
    changeCidB.appendChild(document.createTextNode('更换视频CID'));
    changeCidB.setAttribute("onclick",
                            "replaceByCid(list.options[list.selectedIndex].value);");
    
    var div = document.createElement('div');
    div.innerHTML = "跟随王的选择！El Psy Congroo！如果没有王的选择……那么请等待下个版本吧！";
    
    //以下是里区进入按钮
    var Burl = 'https://secure.bilibili.tv/secure,cid=';
    
    var button = document.createElement('button');
    button.appendChild(document.createTextNode('黑科技按钮！'));
    button.addEventListener('click', function () {
        window.open(Burl+list.options[list.selectedIndex].value)
    }, false);
    
    //以下是为了实现更换CID按钮所需要的JS脚本
    var scr = document.createElement('script');
    scr.setAttribute("language", "JavaScript");
    
    var src_list = new Array(
        "function replaceByCid(cid){",
        "var B = document.getElementById('B'); ",
        "var list =document.getElementById('list'); ",
        "var path = 'cid='+ cid;",
        "var bilibili = document.createElement('embed');",
        "bilibili.type = 'application/x-shockwave-flash';",
        "bilibili.width = 950;",
        "bilibili.height = 482;",
        "bilibili.src = 'https://static-s.bilibili.tv/play.swf';",
        "bilibili.setAttribute('flashvars', path);",
        "bilibili.setAttribute('quality', 'high');",
        "bilibili.setAttribute('allowfullscreen', 'true');",
        "bilibili.setAttribute('allowscriptaccess', 'always');",
        "bilibili.setAttribute('rel', 'noreferrer');",
        "var player = document.getElementById('bofqi');",
        "player.innerHTML = bilibili.outerHTML;",
        "player.appendChild(B);",
        "player.appendChild(list);",
        "};"
    );
    var src_str ="";
    for (var i = 0; i < src_list.length; i++) {
        src_str += src_list[i];
    };
    scr.innerHTML = src_str;
    
    //播放器添加功能按钮
    var player = document.getElementById('bofqi');
    player.innerHTML = changeCidB.outerHTML;
    player.appendChild(list);
    player.appendChild(div);
    player.appendChild(scr);
    player.appendChild(button);
    
    //获取视频信息(CID范围 预计V3.0改进)
    var start = parseInt(id) - 1;
    var end = parseInt(id) + 1;
    getS2E(start,-1);
    getS2E(end,1);
}

var index = 0;
function getInfo(url) {
    //判断是否为视频播放地址
    a = /\/video\/av(\d+)(?:\/index_(\d+))?/.exec(location.pathname);
    if(a){
        //视频信息请求接口以及AJAX访问
        url = 'http://api.bilibili.tv/view?type=json&id=' + a[1] + '&page='
        + (a[2] || 1);
        GM_xmlhttpRequest( {
            method : "GET",
            url : url,
            headers : {
                "User-Agent" : "Mozilla/5.0",
                "Cache-Control" : "max-age=0",
                "Origin" : "http://www.bilibili.tv",
                "Cookie" : document.cookies
            },
            onload : function(response) {
                var cid;
                if (response.status == 200){
                    if (response.responseText.indexOf("no such page") > -1) {
                        getCid(a[1]);
                    } else {
                        cid = /cid":(\d+),"/g.exec(response.responseText)[1];
                    } 
                    var path = "cid=" + cid;
                    replace(path);
                }else{
                    alert("你的网速不稳定 请刷新试试！如果多次刷新（10次）无果……则可能是服务器出了问题（或者被限制了）");
                }
                
            }
        });
    }else if(location.pathname=="/"){
        //公告牌信息请求以及显示(仅主页显示)
        GM_xmlhttpRequest( {
            method : "GET",
            url : url,
            headers : {
                "User-Agent" : "Mozilla/5.0",
                "Cache-Control" : "max-age=0",
                "Origin" : "http://www.bilibili.tv",
                "Cookie" : document.cookies
            }, 
            onload : function(response) {
                if (response.status == 200){
                    var float_window;
                    //str包含三部分[0]公告牌功能实现脚本 [1]公告牌具体内容以及样式 [2]版本信息
                    var str = response.responseText.split("qwertqwert");
                    
                    var V = str[2].replace(/(^\s*)|(\s*$)/mg, "");
                    var src_str = document.createElement('script');
                    src_str.setAttribute("language", "JavaScript");
                    src_str.innerHTML = str[0];
                    
                    var int=self.setInterval(
                        function(){
                            if(!float_window){
                                float_window = document.getElementsByClassName("float_window")[0];
                                if(float_window){
                                    float_window.outerHTML = str[1];
                                    document.getElementById("float_window").appendChild(src_str);
                                    //版本更新判断
                                    if(V !=version){
                                        var notify = "<li onload='alert(1)' style='color:red'>本地黑科技版本为:"+"<div style='color:green'>"+version+"</div>"+" 服务器黑科技版本为:"+"<div style='color:blue'>"+V+"</div>"+" 需要更新请点击<a href='http://userscripts.org/scripts/source/165424.user.js'>这里</a>"+"</li>"
                                        document.getElementById("firelist").innerHTML += notify;
                                    }
                                    window.clearInterval(int);
                                }
                            }
                        }
                        ,500);
                }
            },
            onerror : function(response){
                var uuu;
                if (index==0) {
                    uuu = "http://fireaway4.kilu.de/1.html";
                }else if(index==1){
                    uuu = "http://www.fireawayhh.tk/1.html";
                }else if(index==2){
                    uuu = "http://www.fireaway.tk/1.html";
                }else if(index == 3){
                    uuu = "http://fireawayh.1x.biz/1.html";
                }else if(index == 4){
                    alert("五个服务器都挂了- -!");
                };
                getInfo(uuu);
            }
        });
    }
};

//播放器替换
function replace(path) {
    var int=self.setInterval(
        function(){
            if(document.getElementById("bofqi")){
                var Burl = 'https://secure.bilibili.tv/secure,' + path;
                var button = document.createElement('button');
                var player = document.getElementById("bofqi");
                
                button.appendChild(document.createTextNode('黑科技按钮！'));
                button.addEventListener('click', function () {
                    //window.open(Burl);
                    var iframe_str = "<iframe id='fire_iframe' height='490' width='950' src="+Burl+" scrolling='no' border='0' frameborder='no' framespacing='0' style='width: 950px; height: 484px; margin-top: 5px;'></iframe>";
                    player.innerHTML = iframe_str;
                    player.appendChild(button);
                    document.getElementById("fire_iframe").style.height = "588px";
                }, false);
                
                
                var bilibili = document.createElement("embed");
                bilibili.id="bofqi_embed";
                bilibili.type = "application/x-shockwave-flash";
                bilibili.width = 950;
                bilibili.height = 500;
                bilibili.src = "https://static-s.bilibili.tv/play.swf";
                bilibili.setAttribute("flashvars", path);
                bilibili.setAttribute("pluginspage", "http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash");
                bilibili.setAttribute("quality", "high");
                bilibili.setAttribute("allowfullscreen", "true");
                bilibili.setAttribute("allowscriptaccess", "always");
                
                
                
                var isAiqiyi = false;
                var isSouhu = false;
                
                var str = player.innerHTML;
                
                if (str.indexOf("iqiyi") > -1) {
                    isAiqiyi = true;
                } else if (str.indexOf("sohu") > -1) {
                    isSouhu = true;
                }
                //alert(player | isAiqiyi | isSouhu);
                if(player | isAiqiyi | isSouhu){
                    player.innerHTML = bilibili.outerHTML;
                    player.appendChild(button);
                    window.clearInterval(int);
                }else{
                    player.appendChild(button);
                    window.clearInterval(int);
                }
            }
        }
        ,1000);
};
//海贼王信息获取
var index =0;
function getS2E(id,flag) {
    var s;
    var e;
    var c;
    var king;
    var u = 'http://api.bilibili.tv/view?type=json&id='+id;
    GM_xmlhttpRequest( {
        method : "GET",
        url : u,
        headers : {
            "User-Agent" : "Mozilla/5.0",
            "Cache-Control" : "max-age=0",
            "Origin" : "http://www.bilibili.tv",
            "Cookie" : document.cookies
        },
        onload : function(response) {
            c = JSON.parse(response.responseText).cid;
            //alert(id +"&" +c);
            if(c){
                list.add(new Option(c, c));
            }else{
                s = id+flag;
                index+=flag;
                getS2E(s,flag);
            }
            if (list.options.length >= 3) {
                s = parseInt(list.options[1].value);
                e = parseInt(list.options[2].value);
                list.remove(1);
                list.remove(1);
                //alert(index);
                if (s > e) {
                    for ( var i = e + 1; i < s; i++) {
                        list.add(new Option("王的选择" + i, i));
                    }
                    king = parseInt(s)+index;
                }else{
                    for ( var i = s + 1; i < e; i++) {
                        list.add(new Option("王的选择" + i, i));
                    }
                    king = parseInt(e-1)-index;
                }
                list.options[0].innerHTML = "比利海灵顿祈祷终了– ( ゜- ゜)つロ 乾杯~ – bilibili.tv";
                list.options[0].value = king;
                list.add(new Option("真♂王♀的选择！和我签订契约吧！" + king, king),list.options[1]);
                index = 0;
            }
        }
    });
};

//document.addEventListener(“DOMContentLoaded”, getInfo, false);
window.onload = getInfo(url);