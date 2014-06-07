// ==UserScript==
// @name           微博&家居账户切换
// @namespace      www.zhangsuoyong.com
// @include        http://*.jiaju.com/*
// @include        http://weibo.com/*
// @include        http://*.weibo.com/*
// @version        1.2
// ==/UserScript==

if(top != window){
    return;
}

/**
 *  构建HTML
 **/
var box = document.createElement("div"),
      boxsmall = document.createElement("div"),
      html = "";

html += '<div id="GM_addUser">帐户：<input type="text" id="GM_add_name" /><br />密码：<input type="password" id="GM_add_pw" /><br/>备注：<input type="text" id="GM_add_info" /><br /><button id="GM_add_submit">add</button><button id="GM_add_cancle">cancle</button></div>';
html += '<table id="GM_list"></table>';
html += '<p id="GM_add">增加用户+</p>';
html += '<p id="GM_shouqi">收起&gt;&gt;</p>';
box.innerHTML = html;
box.id = "GM_changeuser";

var href = location.href,
      site = 0;
if(href.indexOf("jiaju.com") != -1){
    site = "jiaju";
    boxsmall.innerHTML = '切换用户<form id="GM_login_form"  target="GM_hidden_frame" action="http://i.jiaju.sina.com.cn/sso/wblogin" method="post"></form><iframe width="0" height="0" enctype="multipart/form-data" src="about:blank"  style="display:none" id="GM_hidden_frame" name="GM_hidden_frame"></iframe>';
}else if(href.indexOf("weibo.com") != -1){
    site = "weibo";
    boxsmall.innerHTML = '切换用户<form id="GM_login_form" action="http://login.sina.com.cn/sso/login.php" method="post">';
}else{
    return;
}

boxsmall.id = "GM_usersmall";

document.body.appendChild(box);
document.body.appendChild(boxsmall);


/**
 *  构建CSS
 **/
 var css = "";
 css += '#GM_changeuser {font-size:12px; position:fixed; right:0px;top:0px;width: 300px;display:none;background-color: rgb(204, 204, 204); border: 1px solid rgb(51, 51, 51); padding: 5px; color: rgb(102, 102, 102);z-index:9999999; }';
 css += '#GM_usersmall {font-size:12px;line-height:20px; position:fixed;right:0px;top:0px;color:blue;cursor:pointer; width:60px;height:20px;border:1px solid #333;background-color:#ccc;text-align:center;z-index:9999999; }';
 css += '#GM_shouqi { font-size:12px;text-align:right;cursor:pointer;color:blue;}';
css += '#GM_list {display: block; overflow: hidden; width: 294px;  word-wrap: break-word;}';
css += '#GM_list li span { color:#000;font-weight:bold;}';
css += '#GM_add {color:blue;cursor:pointer;}';
css += '.GM_showname {width:220px;height:20px;display:block;overflow:hidden;}';
css += '#GM_changeuser {display:none;}';
appendCss(css);


/**
 *  初始化数据
 **/
var addbtn = document.getElementById('GM_add_submit'),
      nameipt = document.getElementById('GM_add_name'),
      pwipt = document.getElementById('GM_add_pw'),
      infoipt = document.getElementById('GM_add_info'),
      cancle = document.getElementById('GM_add_cancle'),
      addUser = document.getElementById('GM_addUser'),
      add = document.getElementById("GM_add"),
      loginform = document.getElementById("GM_login_form"),
      list = document.getElementById('GM_list');
// GM_setValue("jiaju_changeuser",""); 用于清空储存数据
//处理存储的数据
var loginname = getLoginName("user");
var saveData = GM_getValue("jiaju_changeuser");
var dataarr = [];
var editname = "";
if(!saveData){
    saveData = "";
    add.style.display = "none";
}else {
    var arr = saveData.split("|");
    var html = "";
    for(var i = 0;i<arr.length;i++){
        if(!arr[i] || arr[i].length<=0)continue;
        var thisarr = [decodeURIComponent(arr[i].match(/name=([^&]+)\&?/)[1]),decodeURIComponent(arr[i].match(/pw=([^&]+)\&?/)[1]),decodeURIComponent(arr[i].match(/info=([^&]+)/)[1])];
        html += createList.apply(document,thisarr);
        dataarr.push(thisarr);
    }
    list.innerHTML = html;
    addUser.style.display = "none";
    list.style.display = 'block';
    bindEvent();
}

/**
 *  绑定事件
 **/

 // 小框事件
boxsmall.addEventListener("click",function(){
        this.style.display = "none";
        box.style.display = "block";
},false);
// 收起按钮事件
document.getElementById("GM_shouqi").addEventListener("click",function(){
        box.style.display = "none";
        boxsmall.style.display = "block";
},false);
//add按钮事件
addbtn.addEventListener("click",function(){
        if(nameipt.value.length<=0){
            alert("必须填写用户名");
            return false;
        }
        if(pwipt.value.length<=0){
            alert("必须填写密码");
            return false;
        }
        if(infoipt.value.length<=0){
            alert("必须填写备注");
            return false;
        }
        var hassame = false;
        if(editname){
            if(editname != nameipt.value){
                delName(editname);
            }
        }
        var len = dataarr.length;
        var dataarrnew = [];
        html = "";
        if(len>0){
            for(var i = 0;i<len;i++){
                var thisarr = dataarr[i];
                if(!thisarr || thisarr.length<=0)continue;
                if(thisarr[0] == nameipt.value){
                    hassame = true;
                    thisarr = [nameipt.value,pwipt.value,infoipt.value];
                }
                html += createList.apply(document,thisarr);
                dataarrnew.push(thisarr);
            }

        }
        if(!hassame){
            html += createList(nameipt.value,pwipt.value,infoipt.value);
            dataarrnew.push([nameipt.value,pwipt.value,infoipt.value]);
        }
        dataarr = dataarrnew;
        list.innerHTML = html;
        addUser.style.display = "none";
        list.style.display = 'block';
        add.style.display = "block";
        saveToGM(dataarr);
},false);
//增加用户按钮事件
add.addEventListener("click",function(){
        nameipt.value = "";
        pwipt.value = "";
        infoipt.value = "";
        this.style.display = "none";
        addUser.style.display = "block";
        list.style.display = 'none';
        editname = "";
},false);
//cancle按钮事件
cancle.addEventListener("click",function(){
    if(dataarr.length>0){
        addUser.style.display = "none";
        list.style.display = "block";
        add.style.display = "block";
    }else {
        box.style.display = "none";
        boxsmall.style.display = "block";
    }
},false);

/**
 *  公用函数
 **/

// 生成用户列表函数
function createList(name,pw,info,checked){
    var checked = checked ? checked : (loginname == name ? true : false );
    return   '<tr><td><input type="radio" name="GM_radio" '+(checked ? 'checked' :'')+' /></td><td class="GM_showname"><span>'+info+'</span><input type="hidden" value="'+pw+'" />（<em>'+name+'</em>）</td><td><a class="GM_edit" href="javascript:;" target="_self">修改</a> <a class="GM_del" href="javascript:;" target="_self">删除</a></td></tr>';
}
// 存档函数
function saveToGM(){
        var html = "";
        for(var i = 0;i<dataarr.length;i++){
            var data = dataarr[i];
            if(!data || data.length<=0)continue;
            html += "name="+encodeURIComponent(data[0])+"&pw="+encodeURIComponent(data[1])+"&info="+encodeURIComponent(data[2])+"|";;
        }
        GM_setValue("jiaju_changeuser",html);
}
// 插入css函数
function appendCss(s){
    if ((/msie (\d+)/i.test(navigator.userAgent) && !window.opera) ? parseInt(RegExp.$1) : 0) {
        var t = document.createStyleSheet();
        t.cssText = s;
    } else {
        var r = document.createElement("style");
        r.type = "text/css";
        r.appendChild(document.createTextNode(s));
        document.getElementsByTagName("HEAD")[0].appendChild(r)
    }
}
//列表点击事件代理
function bindEvent(){
    list.addEventListener("click",function(e){
        var target = e.target;
        if(target.tagName.toUpperCase() == "A"){
                if(target.className == "GM_del"){
                    var tr = target.parentNode.parentNode,
                         td = getChildren(".GM_showname",tr)[0],
                         infp = getChildren("span",td)[0].innerHTML,
                         pw = getChildren("input",td)[0].value,
                         name = getChildren("em",td)[0].innerHTML;
                    delName(name);
                    tr.parentNode.removeChild(tr);
                    saveToGM();
                }else if(target.className == "GM_edit"){
                    var tr = target.parentNode.parentNode,
                         td = getChildren(".GM_showname",tr)[0],
                         info = getChildren("span",td)[0].innerHTML,
                         pw = getChildren("input",td)[0].value,
                         name = getChildren("em",td)[0].innerHTML;
                    list.style.display = "none";
                    add.style.display = "none";
                    nameipt.value = name;
                    pwipt.value = pw;
                    infoipt.value = info;
                    addUser.style.display = "block";
                    editname = name;
                }
        }else if(target.tagName.toUpperCase() == "INPUT"){
                   var tr = target.parentNode.parentNode,
                         td = getChildren(".GM_showname",tr)[0],
                         info = getChildren("span",td)[0].innerHTML,
                         pw = getChildren("input",td)[0].value,
                         name = getChildren("em",td)[0].innerHTML;
                   login(name,pw);
        }
    },false);
}
//数组中查找元素函数
function findName(name,value){
    var len = dataarr.length;
    for(var i=0;i<len;i++){
        var thisline = dataarr[i];
        if(!thisline || thisline.length<=0)continue;
        if(thisline[0] == name){
            if(value != undefined){
                return thisline;
            }else {
                dataarr[i] = value;
            }
        }
    }
    return null;
}
//数组中删除项函数
function delName(name){
    findName(name,null);
}
//元素中查找子元素函数，可根据tagName和className
function getChildren(str,obj){
    var childs = obj.childNodes,
          len = childs.length,
          result = [];
    var type = /^\./.test(str) ? 1 : 0 ;
    if(type){
        str = str.slice(1);
    }
    for(var i=0;i<len;i++){
        var child = childs[i];
        if(child.nodeType == 1){
            if(type){
                if(child.className == str){
                    result.push(child);
                }
            }else {
                if(child.tagName.toUpperCase() == str.toUpperCase()){
                    result.push(child);
                }
            }
        }
    }
    return result;
}
//firefox xpath 函数 xpath("//div[@class='shop_top_left']")  详见xpath语法
function xpath(query) {
	return document.evaluate(query, document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
//取cookie
function getCookie(N){
    var c=document.cookie.split("; ");
    for(var i=0;i<c.length;i++){
        var d=c[i].split("=");
        if(d[0]==N)return unescape(d[1]);
    }
    return '';
}
//取得SUPcookie中username
function getLoginName(str){
    var sinacookie = getCookie("SUP");
    if(sinacookie){
        return decodeURIComponent((sinacookie.match(new RegExp("(?:^\\?|&|#)"+str+"=(.*?)(?=&|$)"))||['',null])[1]);
    }else {
        return null;
    }
}
//登陆函数
function login(name,pw){
    if(site == "jiaju"){
        try{document.domain = "jiaju.com";}catch(e){}
        var html = '';
        html += '<input name="username" type="hidden" value="'+name+'" /><input name="password" type="hidden" value="'+pw+'" />';
        html += '<input name="returnurl" type="hidden" value="'+location.href+'" /><input name="callback" type="hidden" value="GM_login_callback" />';
        loginform.innerHTML = html;
        setTimeout(function(){
            loginform.submit();
        },100);
    }else if(site == "weibo"){
        var html = "";
        html += '<input type="hidden" name="username" value="'+name+'" >';
        html += '<input type="password" name="password" value="'+pw+'"  >';
        html += '<input type="hidden" name="url" value="'+location.href+'" >';
        html += '<input type="hidden" value="META" name="returntype">';
        html += '<input type="hidden" value="miniblog" name="entry">';
        html += '<input type="hidden" value="utf-8" name="encoding">';
        loginform.innerHTML = html;
        setTimeout(function(){
            loginform.submit();
        },100);
    }
}
//登陆回调函数
function GM_login_callback(msg)
{
	if(msg){
        alert(msg);
    }else {
        location.href = location.href;
    }
}
//抛到页面js环境中
top.wrappedJSObject.GM_login_callback = GM_login_callback;