// ==UserScript==
// @name       topit.me采集
// @description  topit.me采集
// @include http://www.topit.me/album/*
// @version    0.1
// ==/UserScript==
/**********各种变量*********/
var oli_du,oa_du,oli,oa,od,odc,oclose;
var catalog=document.querySelectorAll(".catalog a img");
//定义数组存储url
var imglist;
var totalpage,index=1;
var require,cont,bdstoken,album_sign,t_title,index2=0;
imglist='';

//获取bdstoken
require=new XMLHttpRequest();
require.open("GET","http://xiangce.baidu.com/bookmark?tpl=newmark&name=avast&surl=http%3A%2F%2Fhimg.bdimg.com&srcs[]=http%3A%2F%2Fhimg.bdimg.com%2Fsys%2Fportrait%2Fitem%2Fa7db66656e677a696c6f6e67686169fe10.jpg",false);
require.send();
cont=require.responseText;
bdstoken=cont.substring(cont.indexOf("bdstoken")+11,cont.indexOf("albumList")-3);


var surl,nexturl;
//取得最顶层窗口的href
surl=window.top.location.href;
if(surl.indexOf("?p")>0)
{
    surl=surl.substring(0,surl.indexOf("?p"));
}
nexturl=surl;






/*********获取url核心函数********/
function getU(){
    GM_xmlhttpRequest({
        method:'GET',
        synchronous : true,
        url : nexturl,
        onload:function(e){
            //创建div，解析XHR返回的字符串
            var i,u,t,parsediv=document.createElement("div");
            t=e.responseText;
            t=t.substring(t.indexOf('<div class="catalog">'),t.indexOf('<div class="clear"></div><script>try'));
            parsediv.innerHTML=t;
            for(i=0;i<parsediv.getElementsByTagName("img").length;i++)
            {
                //提取地址
                if(parsediv.getElementsByTagName("img")[i].getAttribute("data-original"))
                {
                    u=parsediv.getElementsByTagName("img")[i].getAttribute("data-original");
                }
                else
                {
                    u=parsediv.getElementsByTagName("img")[i].src;
                }
                //提取大图地址
                if(u.substring(u.length-5,u.length-4)==='s'||u.substring(u.length-5,u.length-4)==='m'||u.substring(u.length-5,u.length-4)==='t')
                {
                    u=u.substring(0,u.length-5)+"l"+u.substring(u.length-4,u.length);
                }
                else if(u.indexOf("/m")>0)
                {
                    u=u.substring(0,u.indexOf("/m"))+"/l"+u.substring(u.indexOf("/m")+2,u.length);
                }
                else if(u.indexOf("/t")>0)
                {
                    u=u.substring(0,u.indexOf("/t"))+"/l"+u.substring(u.indexOf("/t")+2,u.length);
                }

                imglist+=u+"<br>";
            }
            function selectText(){
                 var range;
                 range=document.createRange();
                 range.selectNode(document.querySelector("#odc"));
                 window.getSelection().addRange(range);
            }
            if(index<totalpage)
            {
                index++;
                nexturl=surl+"?p="+index;
                getU();
            }
            else 
            {
                document.getElementById("od").style.display="block";
                document.getElementById("odc").innerHTML=imglist;
                document.body.onclick=function(){selectText();};
                
            }
            
        }
});
}


/*******************转存核心函数*********************/
function transferCore(){
    var imglist2='';
    GM_xmlhttpRequest({
        method:'GET',
        synchronous : true,
        url : nexturl,
        onload:function(e){
            //创建div，解析XHR返回的字符串
            var i,u,t,data,parsediv=document.createElement("div");
            t=e.responseText;
            t=t.substring(t.indexOf('<div class="catalog">'),t.indexOf('<div class="clear"></div><script>try'));
            parsediv.innerHTML=t;
            for(i=0;i<parsediv.getElementsByTagName("img").length;i++)
            {
                //提取地址
                if(parsediv.getElementsByTagName("img")[i].getAttribute("data-original"))
                {
                    u=parsediv.getElementsByTagName("img")[i].getAttribute("data-original");
                }
                else
                {
                    u=parsediv.getElementsByTagName("img")[i].src;
                }
                //提取大图地址
                if(u.substring(u.length-5,u.length-4)==='s'||u.substring(u.length-5,u.length-4)==='m'||u.substring(u.length-5,u.length-4)==='t')
                {
                    u=u.substring(0,u.length-5)+"l"+u.substring(u.length-4,u.length);
                }
                else if(u.indexOf("/m")>0)
                {
                    u=u.substring(0,u.indexOf("/m"))+"/l"+u.substring(u.indexOf("/m")+2,u.length);
                }
                else if(u.indexOf("/t")>0)
                {
                    u=u.substring(0,u.indexOf("/t"))+"/l"+u.substring(u.indexOf("/t")+2,u.length);
                }
                imglist2+="&picture_src_list[]="+u;
            }
            data="picture_name="+encodeURI(imglist2)+"&bdstoken="+bdstoken+"&surl="+surl+"&album_sign="+album_sign+"&scope=0";
            GM_xmlhttpRequest({
                method:'POST',
                synchronous : false,
                url : "http://up.xiangce.baidu.com/bookmark/submit",
                headers : {
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                data:data,
                onload:function(e){
                    if(index<totalpage)
                    {
                        nexturl=surl+"?p="+(++index);
                        transferCore();
                    }
                    else
                    {
                        index=1;
                        index2=0;
                        alert("转存成功");
                    }
                }
            });
        }
    });
}

//创建相册
function createAlbum(title){
    GM_xmlhttpRequest({
        method:"POST",
        synchronous : false,
        url : "http://xiangce.baidu.com/album/submit/add",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        data:"album_name="+title+"&bdstoken="+bdstoken,
        onload:function(e){
             if(JSON.parse(e.responseText).status.msg==="success")
            {
                album_sign=JSON.parse(e.responseText).data.album_sign;
                //成功创建相册时，开始转存图片
                setTimeout(transferCore,1000);
            }
            else
            {
                createAlbum(t_title+(++index2));
            }
        }
    });
}

/**************初始化****************/
//转存到百度相册按钮
oli_du=document.createElement("li");
oli_du.id="oli_du";
oa_du=document.createElement("a");
oa_du.innerHTML="转存";
oa_du.style.cursor="pointer";
oli_du.appendChild(oa_du);
document.querySelector(".tabs").insertBefore(oli_du,document.querySelector(".tabs .active"));



//采集按钮
oli=document.createElement("li");
oli.id="oli";
oa=document.createElement("a");
oa.innerHTML="采集";
oa.style.cursor="pointer";
oli.appendChild(oa);
document.querySelector(".tabs").insertBefore(oli,document.querySelector(".tabs .active"));


//url显示区
od=document.createElement("div");
od.id="od";
od.style.cssText="position:absolute;width:300px;top:0;padding:30px 40px;text-align:left;background:white;z-index:999;display:none;";
od.style.left=(document.documentElement.clientWidth-380)/2+"px";
odc=document.createElement("div");
odc.id="odc";
od.appendChild(odc);

//关闭按钮
oclose=document.createElement("span");
oclose.id="oclose";
oclose.style.cssText="position:absolute;width:20px;height:20px;top:10px;right:10px;cursor:pointer;";
oclose.innerHTML="x";
od.appendChild(oclose);

document.body.appendChild(od);







/******************绑定函数******************/
//转存至百度相册函数
function transfer(){
    alert("转存中，请稍等...");
    t_title=document.querySelector(".pageheader h2").innerHTML;
    totalpage=parseInt(document.getElementById("page-next").previousSibling.innerHTML);
    createAlbum(t_title);
}
document.getElementById("oli_du").onclick=transfer;


//导出所有链接函数
function collect(){
    //获取总页数
    totalpage=parseInt(document.getElementById("page-next").previousSibling.innerHTML);
    alert("采集中,请稍等...");
    getU();
}
document.getElementById("oli").onclick=collect;


//关闭函数
function close(){
    document.getElementById("od").style.display="none";
    index=1;
    index2=0;
}
document.getElementById("oclose").onclick=close;
