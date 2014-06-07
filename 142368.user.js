// ==UserScript==
// @name       虾米网替换播放器 / xiami audio player
// @namespace  http://userscripts.org/scripts/show/142368
// @version    1.12
// @description  替换下载按钮 专辑播放/ and download
// @match      http://www.xiami.com/song/*
// @match      http://www.xiami.com/album/*
// @copyright  2012, XpAhH
// ==/UserScript==
(function(){
//$$$$$$$$$$$$$$$$$$//
var $=parent.$,
    css1=".mycd{background-color:#888;width:270px;text-align:center;padding:15px 0 10px;border:3px solid;border-radius:5px;box-shadow:0 -60px 40px #5A5A5A inset,0 0 10px}"
    +"ol.my{list-style:decimal-leading-zero inside;text-align:left;color:#DDD;border-radius:3px;width:260px;line-height:24px;border:1px solid #414141;margin:0 auto;box-shadow:0 0 2px #444;overflow:hidden;font:12pt Xhei,黑体,微软雅黑,serif}"
    +"ol.my li{padding:0 5px;background-color:#414141;cursor:pointer;-webkit-transition:500ms all ease}"
    +"ol.my li:hover{background-color:#888888;box-shadow:0 0 5px rgba(233,233,233,.3) inset}"
    +"ol.my li.sel{background-color: #AAA;text-shadow:0 0 3px;font-weight:900}"
    +"ol.my li a{float:right;border:solid;border-width:8px 6px 0;border-color:#DDD transparent;margin:2px 0}"
    +"ol.my li div{float:right;width:12px;height:12px; position:absolute;margin:-18px auto 0 235px;background:#777;border-radius:2px;border:2px solid #777;box-shadow:0 0 3px black}";
function dadr(a){
    var m=[],r=[],l=a.charAt(0)*1;a=a.substr(1);
    for(i=0;i<a.length;i++){if(!m[i%l])m[i%l]=0;m[i%l]++}
    for(i=0;i<m.length;i++){r[i]=a.substr(0,m[i]);a=a.substr(m[i])}
    for(j=0;j<m[0];j++)for(i in r){a+=r[i].charAt();r[i]=r[i].substr(1)}
    return unescape(a).replace(/\^/g,"0");
}
//$$$$$$$$$$$$$$$$$$//
var p=({"album":1,"song":2})[location.pathname.split("/")[1]]||0;
if(p==1){
    var a=$(".track_list input"),h=a[0].value,l=a.length;
    if(!l)return;
    $.get("/widget/xml-single/sid/"+h,function(d){
        var ba=$(d).find("location").text(),
            s=dadr(ba),
            g=[s.substr(0,(t=s.lastIndexOf("/")+1)),s.substr(t,-t+(t=s.lastIndexOf("."))),s.substr(t)],
            b=$("<ol class=my>"),
            x=[],n=$("#album_info tr:first td:eq(1) a").text()+" - ";
        console.log("已经从",ba,"解析到",s);
        $(".song_name>a:not([class])").each(function(a,b){x.push(b.innerText)})
        for(i=0;i<l;i++)
            b.append($("<li>").text(x[i])
             .attr("data-src",t=(g[0]+g[1].replace(/\d+/g,function(a){return a.match("^0+")+(a/1+i)})+g[2]))
             .click(function(){if((t=$('.my li.sel')[0])!=this){
                 t.className='';this.className='sel';
                 $("audio.my").attr("src",$(this).attr("data-src"));
             }})
             .append($("<div>").html($("<a class=my>").attr("href",t).attr("download",n+x[i]))) );
        b.children(":first").addClass("sel");
        $(".cd2play").attr("class","mycd")
                .html($("<audio autoplay controls class=my>").attr("src",s).css("width",260)
                     .bind("ended",function(){
                         t=$("li.sel").next();if(!t.length)t=$("ol.my li:first");
                         t.click();
                     }))
                .append($("<style>").html(css1))
                .append(b);
        //$(".do_download a,.cd_pay a").attr("href",s).attr("target","_blank").removeAttr("onclick");
    });
}else if(p==2){
    $.get(parent.location.href.replace("/song/","/widget/xml-single/sid/"),function(d){
        var s=dadr($(d).find("location").text());
        $(".cd2play a").removeAttr("onclick").click(function(){
            $(".cd2play").html($("<audio loop autoplay controls>").attr("src",s).css("width",260))
        });
        $(".do_download a,.cd_pay a").attr({href:s,target:"_blank",download:$("#title h1").text()}).removeAttr("onclick");
    });
}

})()