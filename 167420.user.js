// ==UserScript==
// @name       百度文库下载
// @description  百度文库下载
// @author  陌百百<feng_zilong@163.com>
// @include   http://wenku.baidu.com/*
// @version    0.1
// ==/UserScript==
var check_url;
var wenku_css;
//屏蔽广告
wenku_css = "#wk-2d-bar-code  a , .toolsbar-vip-wrap {display:none!important;}";
//隐藏，避免用户在未加载完成时点击
wenku_css = "#downDoc-7 , .reader-download {display:none;}";
//downfree_reader样式
wenku_css += "#downfree_reader {display:block;width:82px;height:26px;float:left;margin-top:5px;background:url(http://static.wenku.bdimg.com/static/widget/view/html_view/html_reader/img/toolsbar-bg_5a766426.png) no-repeat 0 -894px;cursor:pointer;} #downfree_reader:hover {background-position:0 -928px;}";
//downfree_doc样式
wenku_css += "#downfree_doc {display:block;width:100px;height:38px;float:left;background:url(http://static.wenku.bdimg.com/static/view/flash_view/view-sps_70949acb.png) no-repeat 0 -456px;cursor:pointer;}#downfree_doc:hover {background-position:0 -537px;}";
GM_addStyle(wenku_css);

var idown={
    //YXM_PUBLIC_KEY
    yxm_pk:'',
    yxm_challenge:'',
    yxm_input_result:''
};
var wenku={
    //doc_id
    doc_id:location.href.substring(location.href.indexOf("view/")+5,location.href.indexOf(".html")),
    //获得YXM_PUBLIC_KEY
    getPubKey:function(){
        var durl;
        durl="http://idown.org/cloud/reflash.php?id=bdwk/"+wenku.doc_id;
        GM_xmlhttpRequest({
            method:"GET",
            synchronous : false,
            url:durl,
            onload:function(resText){
                var res;
                res=resText.responseText;
                idown.yxm_pk=res.substring(res.indexOf("YXM_PUBLIC_KEY = ")+18,res.indexOf("var YXM_localsec_url =")-6);
                //获得publickey后调用getCheckUrl()函数
                setTimeout(wenku.getCheckUrl(),0);
            }
        });
    },
    //获得check_url[用于判定验证码是否正确的网址]
    getCheckUrl:function(){
        var churl;
        churl="http://api.yinxiangma.com/api2/yzm.request.php?file="+idown.yxm_pk;
        GM_xmlhttpRequest({
            method:"GET",
            synchronous : false,
            url:churl,
            onload:function(resText){
                var res,re,img_src,img_preload;
                res=resText.responseText;
                re = /yzm\.click\.php\?t=([^']+)'/;
                idown.yxm_challenge = res.match(re)[1];
                re = /src='([^']+)'/;
                img_src = res.match(re)[1];
                img_preload = new Image();
                img_preload.src = img_src;
                img_preload.onload =function(){
                    document.getElementById("yzm_image").src = img_src;
                    //获得check_url后调用checkCaptchas()函数
                    setTimeout(wenku.checkCaptchas(),0);
                };
            }
        });
    },
    //校验验证码
    checkCaptchas:function(){
        var cheurl,input;
        input = prompt("请输入验证码");
        cheurl="http://api.yinxiangma.com/api2/yzm.validjs.php?t="+idown.yxm_challenge+"&input="+input;
        //cheurl="http://api.yinxiangma.com/api2/yzm.validjs.php?t="+idown.yxm_challenge+"&input="+idown.captchas[idown.i];
        GM_xmlhttpRequest({
            method:"GET",
            synchronous : false,
            url:cheurl,
            onload:function(resText){
                var res,re;
                res=resText.responseText;
                if(res.indexOf("true")>0){
                    re = /YXM_result_text ='([^']+)'/;
                    idown.yxm_input_result = res.match(re)[1];
                    document.getElementById("yzm_image").src = "http://static.tieba.baidu.com/tb/img/hg/hg.gif";
                    setTimeout(wenku.getDownloadUrl(),0);
                }else{
                        setTimeout(wenku.checkCaptchas(),0);
                }
            }
        });
    },
    getDownloadUrl:function(){
        var verify_data;
        verify_data="YXM_input_result="+idown.yxm_input_result+"&YXM_level=32&YinXiangMa_pk="+idown.yxm_pk+"&YinXiangMa_challenge="+idown.yxm_challenge+"&id=bdwk%2F"+wenku.doc_id;
        GM_xmlhttpRequest({
            method:"POST",
            synchronous : false,
            url : "http://idown.org/cloud/verifydown.php",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            data:verify_data,
            onload:function(resText){
                var res,re,down_url;
                res = resText.responseText;
                re = /\"_blank\" href=\"([^\"]+)\"/;
                down_url = res.match(re)[1];
                //ifr = document.createElement("iframe");
                //document.body.appendChild(ifr);
                //ifr.src = down_url;
                window.location.href = down_url;
                //GM_openInTab(down_url);
            }
        });
    }
};

function wait(){
    if(!!document.querySelector("#downDoc-7") || !!document.querySelector(".reader-download")){
        init();
    }
    else{
        setTimeout(wait,100);
    }
}
function init(){
	var btn,obtn,yw,yi;
    yi = document.createElement("img");
    yi.id = "yzm_image";
    yw = document.createElement("div");
    yw.appendChild(yi);
    yw.id = "yzm_wraper";
    yw.style.cssText = "position:fixed;left:0;top:40%;width:300px;height:150px;z-index:999;";
    document.body.appendChild(yw);
    
    btn= document.createElement("a");
    if(document.querySelector("#downDoc-7")){
        btn.id = "downfree_doc";
        obtn = document.querySelector("#downDoc-7");
    } else if(document.querySelector(".reader-download")){
        btn.id = "downfree_reader";
        obtn = document.querySelector(".reader-download");
    }
    obtn.parentNode.replaceChild(btn,obtn);
    btn.addEventListener("click",wenku.getPubKey,false);
}

window.onload = wait();
