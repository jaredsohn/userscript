// ==UserScript==
// @name        jd登录
// @namespace   gm
// @include     http://admin.jiaju.com/*
// @include     https://passport.jd.com/*
// @include     http://shop.jd.com/*
// @version     1.0
// ==/UserScript==

var jdLoginUrl = "https://passport.jd.com/new/login.aspx?ReturnUrl=http%3A%2F%2Fshop.jd.com%2Findex.action";

if(window.location.hostname.indexOf("admin.jiaju.com") != -1){
    var jdlogin = document.getElementsByClassName("jdloginlink"),
    	i = 0;
    if(jdlogin && jdlogin.length > 0) {   
        for(len = jdlogin.length; i <= len; i++ ) {
			jdlogin[i].addEventListener('click',function(e){
				
                e.preventDefault();
				var sUsr = this.getAttribute("data-usr"),
            	    sPwd = this.getAttribute("data-pwd");
            	GM_setValue('jdUsername',sUsr);
            	GM_setValue('jdPassword',sPwd);
            	window.open(jdLoginUrl,'_blank');
            	
			},false);
        }
    } 
}

if(window.location.hostname.indexOf("jd.com") != -1){

    function gmGetId(str){ return typeof str == "string" ? document.getElementById(str) : null; }    
    
    if(GM_getValue('jdUsername') != "" || GM_getValue('jdPassword') != "") {
        gmGetId("loginname").value =  GM_getValue('jdUsername');
        gmGetId("nloginpwd").value = GM_getValue('jdPassword');
        gmGetId("loginsubmit").click();
    }

    GM_setValue('jdUsername',''),
    GM_setValue('jdPassword','');

}