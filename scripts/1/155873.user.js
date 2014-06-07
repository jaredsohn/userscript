// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      *://byjw.bupt.edu.cn:8080/*
// @copyright  2012+, You
// ==/UserScript==
(function() {
    // longin
    var Ink,Flag=false;
    if (document.title=="URP 综合教务系统 - 登录"){
         setTimeout(function(){Ink = document.getElementById("btnSure");Ink.click();},1000);}
    //1
    if (window.name=="mainFrame"){
        setTimeout(function(){
            var alink=document.getElementsByTagName("a");
            for (var i=0,l=alink.length;i<l;i++){
                if(alink[i].innerHTML=="本学期课表"){
                    alink[i].click();
                    Flag=true;
                };
            };
            if (Flag){return true};
        },2000);
    }
    //2
    if (window.name=="menuFrame"){
        setTimeout(function(){
            var alink=document.getElementsByTagName("a");
            for (var i=0,l=alink.length;i<l;i++){
                if(alink[i].innerHTML=="选课方案"){
                    alink[i].click();
                    Flag=true;
                };
            };
            if (Flag){return true};
        },1000);
    }
    //3
    if (window.name=="mainFrame"){
        setTimeout(function(){
            var alink=document.getElementsByTagName("a");
            for (var i=0,l=alink.length;i<l;i++){
                if(alink[i].innerHTML=="系任选课"){
                    alert("1");
                    alink[i].click();
                };
            };
        },1000);
    }
    //4
        if (window.name=="topFrame"){
    try {
    	document.mainForm.action='/logout.do';
    document.mainForm.target = "_top";
    document.mainForm.submit();
    }catch(e){};}
})();