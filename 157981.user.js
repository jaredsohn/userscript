// ==UserScript==
// @name TiebaBingTransparency
// @author J.J.Oscar
// @version 1.9
// @include http://tieba.baidu.com/
// @include http://tieba.baidu.com/*
// @run-at document-start
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// ==/UserScript==

var cTime=30; //更换间隔

var mktt=new Array("ar-XA","bg-BG","cs-CZ","da-DK","de-AT","de-CH","de-DE","el-GR","en-AU","en-CA","en-GB","en-ID","en-IE","en-IN","en-MY","en-NZ","en-PH","en-SG","en-US","en-XA","en-ZA","es-AR","es-CL","es-ES","es-MX","es-US","es-XL","et-EE","fi-FI","fr-BE","fr-CA","fr-CH","fr-FR","he-IL","hr-HR","hu-HU","it-IT","ja-JP","ko-KR","lt-LT","lv-LV","nb-NO","nl-BE","nl-NL","pl-PL","pt-BR","pt-PT","ro-RO","ru-RU","sk-SK","sl-SL","sv-SE","th-TH","tr-TR","uk-UA","zh-CN","zh-HK","zh-TW");
//图片来源

function change() {
    function chg() {
    var u = 'http://www.bing.com/'
    var i = parseInt(Math.random() * 14);
    var mkt = mktt[parseInt(Math.random() * 58)];
    GM_xmlhttpRequest({
                method: 'GET',
                url: u + 'HPImageArchive.aspx?format=js&idx=' + i + '&n=1&mkt='+ mkt,
                onload: function (response) {
                    var d = JSON.parse(response.responseText),
                        e = document.getElementsByClassName('wrap2')[0],
                        s, a;
        				if (d == null) return pageNum--;
                        s = d.images[0].url;
            			e.style.background = 'url("http://cn.bing.com/' + s + '")';
                        }
                        });
                        localStorage['pageNum'] = i
                        
    setTimeout(function(){chg();},cTime*1000);              
	}
	document.addEventListener('DOMContentLoaded', chg(), false);
}
change();
GM_addStyle(".threadlist {background-color: #f5f5f5;}"); 
GM_addStyle(".aside {background-color: #f5f5f5;}");
GM_addStyle(".threadlist li.threadlist_li_gray,{background-color: #b5b5b5;}");
GM_addStyle('.search .s_btn {background="transparent"; filter: alpha(opacity=60); opacity:0.7; background-image:url("http://upload.wikimedia.org/wikipedia/commons/8/8c/Transparent.png")}');
GM_addStyle('.pager {background="transparent"; filter: alpha(opacity=60); opacity:0.7; background-color: #e5e5e5;}');
GM_addStyle('#wd1, .dir_rank {background="transparent"; filter: alpha(opacity=60); opacity:0.7; background-color: #e5e5e5;}');
GM_addStyle('.frs_content,.left_section,.right_section,.ibody {background="transparent"; filter: alpha(opacity=60); opacity:0.7; background-color: #e5e5e5; background-image:url("http://upload.wikimedia.org/wikipedia/commons/8/8c/Transparent.png")}');
GM_addStyle('#container, .frs_content {background-image:url("http://upload.wikimedia.org/wikipedia/commons/8/8c/Transparent.png")}');
