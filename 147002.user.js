// ==UserScript==
// @name       Pixiv DragtoDownload
// @namespace  http://userscripts.org/scripts/show/147002
// @version    1.153
// @description  拖动
// @include    http://www.pixiv.net/*
// @copyright  2012, XpAhH
// ==/UserScript==
(function($){
    var PixivImg=function(url){
        this.url=url;
        this.id=url;
    };
    PixivImg.fn={};
    PixivImg.prototype={};
    //findimg("32180887")
    function findimg(d,b){
        
    }
    function saveas(l,b){
        var i=document.createElement("a");
        i.download=b;i.href=l;i.target="_blank";
        var o=document.createEvent("MouseEvent");
        o.initEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,0,null);
        i.dispatchEvent(o);
    }
    var dd=[],s=$("#pixivDragFly"),c;
    if(!s[0])$("body").append($("<style>").html("#pixivDragFly{position:fixed;width:8px;height:90%;bottom:5%;left:-4px;background:white;border-radius:3px;border:2px solid rgba(127,127,255,.5);text-align:center;box-shadow:1px 1px 8px rgba(0,0,0,.3);}"))
    .append(s=$("<div id=pixivDragFly>"));
    s.html("<div></div>")
    .bind({
        dragover:function(e){e.preventDefault()},
        drop:function(e){
            saveas(dd[0],dd[0].split("/").pop().match(/\d+/)+" - "+dd[1]);
            if(history.replaceState){//注释:自动添加已浏览记录
                var tu=dd[2].css("color","#777777")[0].href;
                if(!tu)tu=dd[2].parent().css("color","#777777")[0].href;//修正bookmark_new_illust.php
                console.log("GETTAG:"+tu);
                var cu=location.href;
                history.replaceState({},"",tu);
                history.replaceState({},"",cu);
                dd[2].find("h1").css("color","#777777");
                dd[2].next().find("a").css("color","#996699");
                //console.log();
                //$.get("/member_illust.php?mode=manga&illust_id=")
                //$.post("./rpc_rating.php",{mode:"save",i_id:"",u_id:"",qr:0,score:10})
            }
        }
    });
    c=function(){
        $("img").each(function(){
            this.draggable=!0;
            this.ondragstart=function(){
                console.log([
                    $(".meta+h1.title").text(),
                    $(this).parent().text(),
                    $(this).parent().next().children(":first").text(),
                    $(this).parent().next().text(),
                    $(".meta+h1.title").text()]);
                dd=[(t=this.src.match(/(_p\d+\....)(?:$|\?)/))&&this.src||(t=this.src.match(/_\w+(\....)(?:$|\?)/))&&this.src.replace(/_\w+(\....)(?:$|\?)/,"$1?")
                    ,
                    ($("#meta>.title h1").text()||
                    $(this).parent().text()||
                    $(this).parent().next().children(":first").text()||
                    $(this).parent().next().text()||
                    $(".meta+h1.title").text())+t[1]
                	,
                    $(this).parent()];
                return!0
            }
        })
    };
    window.addEventListener("DOMNodeInserted",c);
}).call(parent,parent.$)