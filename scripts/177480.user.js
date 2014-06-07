// ==UserScript==
// @name		百度随心换台
// @namespace	http://lmbj.net
// @description 百度随心听的换台太恶心了，能换的台都是一个大类，当我想听Ta的电台时，比如“董贞”～～！必须去百度音乐里搜索，然后点击“收听Ta的电台”,这个脚本就是要解决这个问题，可以在http://fm.baidu.com/页面直接换台，输入想听的电台回车或点击随心换台即可
// @include     http://fm.baidu.com/
// @grant		GM_xmlhttpRequest
// @updateURL   https://userscripts.org/scripts/source/177480.meta.js
// @downloadURL https://userscripts.org/scripts/source/177480.user.js
// @version		0.3
// ==/UserScript==

function switchFM(url){
    window.location.replace(url);
    window.location.reload();
}

//获取艺术家电台，获取失败，尝试获取标签电台，如果失败，提示没有该电台！
function getArtist(fm){
    var url = "http://music.baidu.com/search?key="+fm;
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html',
        },
        onload: function(response) {
            var search,artist,re,result,url,reg ;
            re = new RegExp("artist(\\s)+=(\\s)+'([a-zA-Z\u4E00-\u9FA5])+'","gi");
            result = response.responseText.match(re);
            if(result == null){
                reg=new RegExp("http://fm.baidu.com/#/channel/public_tag_([0-9a-zA-Z%])+","gi");
				result = response.responseText.match(reg);
                if(result == null){ 
                    alert("没有该电台！");
                }else{
                    url = result[0];
                    switchFM(url);
                } 
            }else{
                url = "http://fm.baidu.com/#/channel/public_artist_"+result[0].substring(10,result[0].length-1);
                switchFM(url);
            }       
        }
    });
}

//从json中查询电台，如果查询失败，就去搜索页面获取
function parseKey(key){
    if(json[key] != undefined){
        var url = "http://fm.baidu.com/#/channel/"+json[key];
        switchFM(url);
    }else{
        getArtist(key);
    }
}

//从页面中的电台json列表中构建供查询用的json列表
var json = {};
function getChannelFromJson(channelJSon){
    for(var i =0;i<channelJSon.length;i++){
        json[channelJSon[i].channel_name] = channelJSon[i].channel_id;
    }
}

var parent = document.getElementById("playerpanel-bottomctrl");
var input = document.createElement("input");
input.type="text";
input.addEventListener("keydown", function (event) {
    if(13 == event.keyCode){
        var inputtext = input.value.trim();
    	if(inputtext == ""){
        	alert("请输入你想听的电台！");
    	}else{
        	parseKey(inputtext);
            input.value="";
        }
    }
}, false);

var btn = document.createElement("input");
btn.type = "button";
btn.value ="随心换台";
btn.addEventListener("click", function() {
    var inputtext = input.value.trim();
    if(inputtext == ""){
        alert("请输入你想听的电台！");
    }else{
        parseKey(inputtext);
        input.value="";
    }
}, false);

parent.appendChild(input);
parent.appendChild(btn);
getChannelFromJson(rawChannelList.channel_list);