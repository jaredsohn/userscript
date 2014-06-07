// ==UserScript==
// @name           KaixinCafe
// @namespace      http://userscripts.org/notXX
// @description    Cook automaticly in Kaixin Cafe
// @include        http://wap.kaixin001.com/cafe/*
// ==/UserScript==

(function() {
    var currentPage = {
        isIndex        : location.href.match(/^http:\/\/wap\.kaixin001\.com\/cafe\/index\.php/),
        isDish2Counter : location.href.match(/^http:\/\/wap\.kaixin001\.com\/cafe\/dish2counter\.php/),
        isCook         : location.href.match(/^http:\/\/wap\.kaixin001\.com\/cafe\/cook\.php/)
    };
    
    var click = function(link) {
        link.style.color="red";
        document.location=link.href;
    }
    
    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }
    
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
    
    // 控制面板
    var div=document.createElement("div");
    div.style.position="fixed";
    div.style.left="200px";
    div.style.top="50px";
    div.style.width="250px";
    div.style.height="140px";
    div.style.border="1px solid red";
    div.style.backgroundColor="grey";
    div.style.opacity=0.8;
    document.body.appendChild(div);
    var list=document.createElement("ul");
    list.style.listStyleType="none";
    list.style.padding="0px";
    list.style.margin="16px";
    div.appendChild(list);
    // 自动移至餐台
    var li_a=document.createElement("li"), input_a=document.createElement("input"), label_a=document.createElement("label");
    input_a.type="checkbox";
    input_a.id="input_a";
    input_a.checked=(readCookie("input_a")!="false");
    input_a.disabled=true;
    label_a.setAttribute("for", "input_a");
    label_a.textContent="自动移至餐台";
    list.appendChild(li_a);
    li_a.appendChild(input_a);
    li_a.appendChild(label_a);
    // 自动继续做菜
    var li_b=document.createElement("li"), input_b=document.createElement("input"), label_b=document.createElement("label");
    input_b.type="checkbox";
    input_b.id="input_b";
    input_b.checked=(readCookie("input_b")!="false");
    label_b.setAttribute("for", "input_b");
    label_b.textContent="自动继续做菜";
    list.appendChild(li_b);
    li_b.appendChild(input_b);
    li_b.appendChild(label_b);
    // 自动清洁，并继续做该菜
    var li_c=document.createElement("li"), input_c=document.createElement("input"), label_c=document.createElement("label");
    input_c.type="checkbox";
    input_c.id="input_c";
    input_c.checked=(readCookie("input_c")!="false");
    label_c.setAttribute("for", "input_c");
    label_c.textContent="自动清洁，并继续做该菜";
    list.appendChild(li_c);
    li_c.appendChild(input_c);
    li_c.appendChild(label_c);
    // 自动返回我的餐厅
    var li_d=document.createElement("li"), input_d=document.createElement("input"), label_d=document.createElement("label");
    input_d.type="checkbox";
    input_d.id="input_d";
    input_d.checked=(readCookie("input_d")!="false");
    input_d.disabled=true;
    label_d.setAttribute("for", "input_d");
    label_d.textContent="自动返回我的餐厅";
    list.appendChild(li_d);
    li_d.appendChild(input_d);
    li_d.appendChild(label_d);
    // 显示倒计时
    var li_e=document.createElement("li"), input_e=document.createElement("input"), font_e=document.createElement("font");
    input_e.type="text";
    input_e.id="input_e";
//    input_e.size=1;
    input_e.style.width="25px";
    input_e.style.textAlign="right";
    font_e.textContent="秒之后刷新页面";
    list.appendChild(li_e);
    li_e.appendChild(input_e);
    li_e.appendChild(font_e);
    
    // 倒计时
    var countDown=300;
    
    var updateCountDown = function() {
        // 保存设置到cookies
        createCookie("input_a",input_a.checked);
        createCookie("input_b",input_b.checked);
        createCookie("input_c",input_c.checked);
        createCookie("input_d",input_d.checked);
        if (countDown==0){
            // 重新载入
            location.reload();
        } else {
            input_e.value=countDown--;
        }
    }
    window.setInterval(updateCountDown, 1000);
    
    var links=document.getElementsByTagName("a");
    var clicked=false;
    for(var i=0,len=links.length;i<len;i++) {
        var link=links[i];
        if (currentPage.isIndex) {
            if ((input_a.checked && link.innerText == "移至餐台") 
            || (input_b.checked && link.innerText == "继续做菜")) {
                clicked=true;
                click(link);
                break;
            }
        } else if (currentPage.isDish2Counter) {
            if (input_c.checked && link.innerText == "清洁，并继续做该菜") {
                clicked=true;
                click(link);
                break;
            }
        } else if (currentPage.isCook) {
            if (input_d.checked && link.innerText == "返回我的餐厅")  {
                clicked=true;
                click(link);
                break;
            }
        }
    }
//    if (!clicked)
//        setTimeout("location.reload()", 300000);
})();