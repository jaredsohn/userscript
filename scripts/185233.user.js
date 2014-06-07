// ==UserScript==
// @name        weipan2iask
// @namespace   http://userscripts.org/scripts/show/185233
// @include     http://ishare.iask.sina.com.cn/f/*
// @version     1
// @grant GM_xmlhttpRequest
// ==/UserScript==

//login

function login(usename,password) {
    document.getElementsByName('U_Loginname')[0].value = usename;
    document.getElementsByName('U_Pass')[0].value = password;
    document.getElementsByTagName('input')[41].click();
} 

//durl

function durl() {
    return 'http://vdisk.weibo.com/api/weipan/2/media/basic/'+
    encodeURIComponent(document.getElementsByTagName('h1')[0].textContent)+
    '?src=download&_='+
    Date.parse(new Date());
}

//ddurl

function ddurl() {
    iurl = durl();
    GM_xmlhttpRequest({
        method: 'GET',
        url: iurl,
        onload: function (res) {
            var rejson = JSON.parse(res.responseText);
            var url = rejson['url'];
            document.getElementById('download_file')['href'] = url;
            document.getElementsByClassName('save_vd_btn clearfix')[0].getElementsByTagName('p')[0].textContent = document.getElementsByClassName('save_vd_btn clearfix')[0].getElementsByTagName('p')[0].textContent.replace('0分','@_@');
            document.getElementById('download_file').setAttribute('title','积分？NO!');
        }
    });
}

//save2wp

function save2wp() {
    var referer = document.URL;
    var fileid = /\d+/.exec(referer)[0];
    GM_xmlhttpRequest({
        method: 'POST',
        url: "http://ishare.iask.sina.com.cn/vdisk/savevdisk.php?action=save",
        headers: { "Content-type" : "application/x-www-form-urlencoded" ,
                   "Referer": referer,
                   "User-Agent": "Mozilla/5.0 (Windows NT 5.1; rv:23.0) Gecko/20100101 Firefox/23.0",
                   "X-Requested-With": "XMLHttpRequest"},
        data: encodeURI("fileid="+fileid),
        onload: function (res) {
            console.log(res);
        }
    });
}

//bool

function xx() {
if (rejson['url'] != undefined) {
    ddurl();
}
else {
    save2wp();
    setTimeout(function(){
        ddurl();
    },1000);
}
}

//dddurl

function dddurl() {
    iurl = durl();
    GM_xmlhttpRequest({
        method: 'GET',
        url: iurl,
        onload: function (res) {
            var rejson = JSON.parse(res.responseText);
            if (rejson['errcode'] == 401) {
                login('weipan2iask@163.com','iask2weipan');
                xx();
            }                }
            else {
                xx();
            }
        }
    });
}

dddurl();