// ==UserScript==
// @name           一键转存for百度相册
// @description   一键转存for百度相册
// @author          陌百百<feng_zilong@163.com>
// @match          http://*/*
// @exclude        http://xiangce.baidu.com/*
// @updateURL     https://userscripts.org/scripts/source/162811.meta.js
// @downloadURL    https://userscripts.org/scripts/source/162811.user.js
// @version        0.1
// ==/UserScript==
var $ = unsafeWindow.$;
var i;
var cont,cun,add_1,img_data,img_url,surl,bdstoken;
var offs,offstop,offsright;
//var cur_date,cur_time,cur_time_c,encode_img_url,url_c;
var img_nWidth;
var require=new XMLHttpRequest();
var focusElement;
var times=0,gdata;
var sign=0;

//去除贴吧自带的收藏按钮
if(document.querySelector(".fav-wrapper"))
{
    document.querySelector(".fav-wrapper").style.display="none";
}

/**********************收集相关的信息*******************/
//获取bdstoken
require.open("GET","http://xiangce.baidu.com/bookmark?tpl=newmark&name=avast&surl=http%3A%2F%2Fhimg.bdimg.com&srcs[]=http%3A%2F%2Fhimg.bdimg.com%2Fsys%2Fportrait%2Fitem%2Fa7db66656e677a696c6f6e67686169fe10.jpg",false);
require.send();
cont=require.responseText;
bdstoken=cont.substring(cont.indexOf("bdstoken")+11,cont.indexOf("albumList")-3);
//获取源地址
surl=location.href;


/******************定义mouseover和mouseout事件*******************/
//mouseover时显示button
function show(){
    offs=this.getBoundingClientRect();
    offstop=document.body.scrollTop+offs.top;
    offsright=offs.right-40;
    document.getElementById("cun").style.top=offstop+"px";
    document.getElementById("cun").style.left=offsright+"px";
    document.getElementById("cun").style.display="block";
    
    document.getElementById("cun").style.backgroundPosition="center 10px";
    //记录要转存图片的地址，如果图片地址不是以jpg等结尾可能会转存失败，暂时无解决办法
    img_url=this.src;
}
//mouseout时隐藏button
function hide(){
    document.getElementById("cun").style.display="none";
    document.getElementById("cun").style.backgroundPosition="center 10px";
}


/***************************转存的核心函数****************************/
function transferImg(){
    //创建转存按钮
    cun=document.createElement("span");
    cun.id="cun";
    cun.style.cssText='position:absolute;z-index:99999;width:40px;height:40px;cursor:pointer;display:none;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAABGCAYAAAAuE6+IAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAtNJREFUeNrsmGtIFFEUx88+LB/BwlJQLBX0RdoiiEIqCsMPET2IPkSUtGD5IcKgB9UXSZL61ANiISGMLJKIhIUeWCxES5FktBRmJVuklSVsGtKa7svpf5ZzZRh3123biGAO/Jg7zrm/uTNzr+y5Fk3TqFBhKahscGa1apeA1UIMvAN+MKTLnw2qQDmYAZ6Du87wtWG9rBLcBLMMN+Okw+ASOAROiEQfYbANwgDLXDjpBo6iysVkX4GbxhKUfPOJYveCqoMPbOXGtM0VZHPPJUtZMcUfdVPc/0LddBFB5gXaj1qvZoyx6wHtu3ufxtf5GL3zbFIO9+Pr7GHZZz5JdPVq6WL823BKwsd0wf1EFuLHTGCINufXK0R22+9/wlichlw1qZZVfa1k6Ete0yHxslc1+1nWxq3R87fzko01tatmGz/mPDRC/KGme6qo7OzunEUjB5op2vowNRawgEf2EXj4SaNXH9DI/otE41OsingylScinuDVmGcDtmOlS0jmGc/4DclXfUXxJ2/JVu4i6xzn5HcUfE+RvRcofj+oRrQTIp9xOXG4ZSXwkYrrNlJpw46Jiz+Pt+rfUZfM/J50a1O/Rk/K8iH7qoVUcnALjZ7xUeLpRL9zoJ5HBhllk6lYCZrVKHWjqQWd6g96mTXLa+4AS0GDzMVGsFwv+rv/z0yZKTNlpsyUmTJTZspMmSn7t2X1LrAHLJMfxPw7/YZUwRxc8tWB7ZITAVy5Nqn6S8m8kpguuE7npHaRpIvT4CjL1ktithiQYj9brLFmGREZdg2miiM8skEuNArw/sPWAok4HCz7UCBZD8taCiRr4XfmQKOPh/kHIp6X862yW+KR8jifiEn/iCoRb4FNhk2knL4gWMebS8Z60y/1ZUeOoseSH8hUvPJOwlpwincTMkiScp3z+jMtdGNUgMuGsvo1qMlUDWcrqzvlMeplbTbK+X9YVv8SYAAbQrpp1fDmvAAAAABJRU5ErkJggg==") no-repeat center 10px';
    document.body.appendChild(cun);
    //+1
    add_1=document.createElement("div");
    add_1.id="add_1";
    add_1.style.cssText='position:absolute;z-index:99999;width:40px;height:40px;visibility:hidden;background:url("http://tb2.bdstatic.com/xiangce/webroot/static/user/ui/like/images/like-success_167aaf90.png") no-repeat';
    document.body.appendChild(add_1);

    
    /****************添加事件及一些琐碎的操作**************/
    /*为button绑定事件
    上面+1图层未挡住，直接定义mouseover事件和mouseout*/
    document.getElementById("cun").onmouseover=function(){this.style.display="block";this.style.backgroundPosition="center -41px";};
    document.getElementById("cun").onmouseout=function(){this.style.display="none";this.style.backgroundPosition="center 10px";};

    //为图片添加事件
    for(i=0;i<document.images.length;i++)
    {
        document.images[i].style.cursor="pointer";
        document.images[i].addEventListener("mouseover",show,false);
        document.images[i].addEventListener("mouseout",hide,false);
    }
    //绑定scroll事件，像qq空间之类分段加载的，要动态地为其添加事件
    window.onscroll=function(){
        for(i=0;i<document.images.length;i++)
        {
            document.images[i].style.cursor="pointer";
            document.images[i].addEventListener("mouseover",show,false);
            document.images[i].addEventListener("mouseout",hide,false);
        }
    };

    //去除贴吧自带的收藏按钮
    if(document.querySelector(".fav-wrapper"))
    {
        document.querySelector(".fav-wrapper").style.display="none";
    }

    /*************************转存图片*********************/
    //定义点击事件
    cun.onmouseup=function(e){
        if(e.button==0)
        {
            var op=1,top_d;
            document.getElementById("add_1").style.visibility="visible";
            document.getElementById("add_1").style.top=offstop-25+"px";
            document.getElementById("add_1").style.left=offsright+"px";
            top_d=parseFloat(document.getElementById("add_1").style.top);
    
            function fadeout_move(){
                op-=0.05;
                top_d-=1;
                document.getElementById("add_1").style.opacity=op;
                document.getElementById("add_1").style.top=top_d+"px";
                if(op>0)
                {
                    setTimeout(arguments.callee,40);
                }
                if(op<0)
                {
                    document.getElementById("add_1").style.visibility="hidden";
                    document.getElementById("add_1").style.opacity="1";
                }
            }
    
            //定义要POST的data
            img_data="picture_name=&picture_src_list%5B%5D="+encodeURI(img_url)+"&bdstoken="+bdstoken+"&surl="+encodeURI(surl)+"&album_sign=&scope=0";
            GM_xmlhttpRequest({
                method : 'POST',
                synchronous : false,
                url : "http://up.xiangce.baidu.com/bookmark/submit",
                headers : {
                    "Content-Type" : "application/x-www-form-urlencoded",
                },
                data:img_data,
                onload:function(e){setTimeout(fadeout_move,10);}
            });
        }
    };
}

//贴吧中有一张1*1的图片http://tieba.baidu.com/tb/static-pb/img/user/default_sign.png，百度相册不接收，所以最终转存的图片会比imgList中的少1
//转存全部
function transferAll(){
    var mes,img_urls,imgs_data,i,j,imgCopy,imgList;
    imgCopy=new Array();
    imgList=new Array();
    mes=window.prompt("请输入图片的最小宽度，小于该宽度的图片将不予转存");
    //若点取消，mes置为-1
    if(mes==null)
    {
        mes=-1;
    }
    //若点确定，且输入为空或字符等非数字，mes重置为0
    if(isNaN(parseFloat(mes)))
    {
        mes=0;
    }
    
    mes=parseFloat(mes);
    
    //再次确认是否转存全部
    if(mes!=-1)
    {
        if(!window.confirm("确定转存全部么"))
        {
            mes=-1;
        }
    }
    //如果mes=-1，结束函数
    if(mes==-1)
    {
        return;
    }
    //获取图片真实url到imgCopy数组中，此处暂时不过滤url
    for(i=0;i<document.images.length;i++)
    {
        if((document.images[i].src.indexOf("tb/static-pb/img/head_80.jpg")>0)||(document.images[i].src.indexOf("tb/static-pb/img/head_32.jpg")>0))
        {
            imgCopy[i]=document.images[i].getAttribute("data-passive");
        }
        else
        {
            imgCopy[i]=document.images[i].src;
        }
    }
    //赋初值，避免下面的imgCopy.join()因imgCopy数组undefined而出错
    imgList[0]=imgCopy[0];
    //获得无重复的images列表，过滤重复url
    for(i=1;i<imgCopy.length;i++)
    {
        if(imgList.join().indexOf(imgCopy[i])<0)
        {
            imgList.push(imgCopy[i]);
        }
    }
    
    /************************预加载图片**********************/
    function loadImg(url,callback){
        var img=new Image();
        img.src=url;
        if(img.complete)
        {
            callback.call(img);
            return;
        }
        img.onload=function(){
            callback.call(img);
        };
    }
    /********************取得图片原大小********************/
    function getWidth(){
        img_nWidth=this.naturalWidth;
    }
    
    
    function tAll(imgs_data)
    {
        GM_xmlhttpRequest({
            method : 'POST',
            synchronous : false,
            url : "http://up.xiangce.baidu.com/bookmark/submit",
            headers : {
                "Content-Type" : "application/x-www-form-urlencoded"
            },
            data:imgs_data,
            onload:function(e){
                var dd,ee,t;
                //计数器+1
                times++;
                if(times==Math.ceil(imgList.length/30))
                {
                    dd=document.createElement("div");
                    dd.id="img_mes";
                    dd.style.cssText='position:fixed;width:90px;height:60px;z-index:9999999;-webkit-border-radius:3px;-webkit-box-shadow:0 0 5px rgba(0,0,0,.5);padding-left:50px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAZCAIAAABPfsIJAAACk0lEQVRIx2P4TzF4/PXW6od9+1+s+P33F5DLQKFxT7/eTT6uE3lEHohqLvi9/v6UIhOBjio/5xFxWA6OSs46U2TivDu14YfkkFHwLlnyTTz5envYQVlkFLpftmxXIJkmvvz2KOGIVtgBWWQUsU7z+aeHDOQFX+UZn9B9MsjIf4PUsYc7yIzrRbdbQvZKI6PAbVJTjlVCZEk28dzrfcG7pZBR0C6pzA1Ov//+JMfEV9+eJBzQCdoliYJWKj56fxuuBmTizz/fJ13OTz5gMO1KybsfL3EZ9/ffn8qTfgE7JJCR12qxXTdXIitjAKprPB3pv10cgtIOmD77cg+riUtutsOVQZDvRrHu/floyhh23V3ut1UMGcXv0bn5/hyauouvDwdsk0RW5rtFLHG11Y/f39FNnH+6w2cTSBoZhe5QPPtqL1zRhx9v4nbroKnxWSxz/+0NTK8wPHx322eegvd6UZ9NKChgi/SeR8shwVd1LAhN1n25yKbLC7AGDihmbrw8Hzhf3XOtiPdGdLTq1oQVN/vQBIEqG3Yk4YpAaOp59vFB5EIj9xVCXuuFCaB1whFL9L/8+EjARCB4/+116gon16WCnuuE8CDXeWK3Xl3Ck2ZRUviP39+K1gU5LxTwWCuIFbksEVhzfib+XMCAmYxbdmQ6zuF3XyOIhtxWCpZvjCCYr7DnwtlHW+1n8rmtFkCgVQLBC7U+fn9Hson//v37+fPnly9flh6fbDuN12Ulv+sqEHKYJXj0xq5Pnz59+/bt9+/fRIfjjx8fPnx4AwNrT811mihuO5XXeiLvnIMdb5AA0Og/f/6QbCIQ3H1yc83Juceu73mDCog1EQJ+/foF9BpQzwdU8PHjR2BofP/+HZdZEAAA2epNLTOfnbIAAAAASUVORK5CYII=) white no-repeat 15px center;';
                    dd.style.top=-60+"px";
                    dd.style.left=((document.documentElement.clientWidth-140)/2)+"px";
                    ee=document.createElement("p");
                    ee.id="img_info";
                    ee.style.lineHeight=60+"px";
                    ee.style.color="black";
                    ee.style.fontSize=14+"px";
                    ee.innerHTML="转存成功！";
                    dd.appendChild(ee);
                    document.body.appendChild(dd);
                    //动画效果
                    function down(){
                        t=parseFloat(document.getElementById("img_mes").style.top);
                        document.getElementById("img_mes").style.top=(t+1)+"px";
                        if(t<-5)
                        {
                            setTimeout(arguments.callee,25);
                        }
                    }
                    function up(){
                        t=parseFloat(document.getElementById("img_mes").style.top);
                        document.getElementById("img_mes").style.top=(t-1)+"px";
                        if(t>-65)
                        {
                            setTimeout(arguments.callee,25);
                        }
                        else
                        {
                            document.body.removeChild(document.getElementById("img_mes"));
                        }
                    }
                    //清除间隔调用，这里可能要改下，总之要查明原因
                    clearInterval(gdata);
                    //按顺序执行动画
                    setTimeout(down,0);
                    setTimeout(up,3333);
                }
            }
        });
    }
    
    //目前的问题是循环体只执行一次，用while可能会更好，判断images[i]是否undefined来判断是否结束，每次往imgs_data中固定累加30个url
    i=0;
    //每次执行transferAll函数时，将times重置为0
    times=0;
    
    //如果images[i]不空
    function inner(){
        //不停间隔调用的情况下，while改成if
        if(imgList[i]!=undefined)
        {
            //每次执行30次前先将img_urls清空
            img_urls="";
            //执行30次
            for(j=0;j<30;j++)
            {
                //如果images[i]不空
                if(imgList[i]!=undefined)
                {
                    loadImg(imgList[i],getWidth);
                    //获得图片的原来的尺寸，与用户输入的值进行比较
                    if(img_nWidth>mes)
                    {
                        img_urls+="&picture_src_list%5B%5D="+encodeURI(imgList[i]);
                    }
                    i++;
                }
            }
            imgs_data="picture_name="+img_urls+"&bdstoken="+bdstoken+"&surl="+encodeURI(surl)+"&album_sign=&scope=0";
            if(imgs_data!="")
            {
                //不能把统计tAll执行次数的times计数器放在这里，因为这里的tAll函数延迟执行，会导致循环全部执行完了，times=3了，才开始执行tAll函数，起不到应有的效果，把times++放到tAll函数中更好
                tAll(imgs_data);
            }
        }
    }
    //设置调用间隔
    gdata=setInterval(inner,100);
    
    
    
}


//解绑事件
function deta(){
    for(i=0;i<document.images.length;i++)
    {
        if(document.images[i].className=="BDE_Image")
        {
            document.images[i].style.cursor="url(http://tb2.bdstatic.com/tb/static-pb/img/cur_zin.cur), pointer";
        }
        document.images[i].removeEventListener("mouseover",show,false);
        document.images[i].removeEventListener("mouseout",hide,false);
    }
}


focusElement={"button":true,"textarea":true,"input":true,"select":true};

/************************添加键盘监听*************************/

//监听键盘按键
window.addEventListener("keydown",function(e){
    //当焦点处于文本框等等...或target为可编辑状态或文档处于设计模式时，不作处理
    if(focusElement[e.target.tagName.toLowerCase()]||e.target.isContentEditable||document.designMode==="on")
    {
        return;
    }
    else
    {
        if((e.keyCode==49)&&sign==0)
        {
            //转存图片
            transferImg();
            sign=1;
        }
        else if((e.keyCode==49)&&sign==1)
        {
            //移除节点
            document.body.removeChild(document.getElementById("cun"));
            document.body.removeChild(document.getElementById("add_1"));
            //解绑事件
            deta();
            sign=0;
        }
    }
},false);


//绑定全部转存事件
window.addEventListener("keyup",function(e){
    //当焦点处于文本框等等...或target为可编辑状态或文档处于设计模式时，不作处理
    if(focusElement[e.target.tagName.toLowerCase()]||e.target.isContentEditable||document.designMode==="on")
    {
        return;
    }
    else if(e.keyCode==192)
    {
        transferAll();
    }
},false);

/*预留代码，用来传回图片是否已收藏的信息，从而确定红心的bg
 * cur_date=new Date();
 * cur_time=cur_date.getTime();
 * cur_time_c=cur_time+9000;
 * encode_img_url=encodeURIComponent(img_url);
 * url_c="http://favo.xiangce.baidu.com/opencom/picture/fav/query?app_id=314406&url="+encode_img_url+"&callback=jQuery17205208197482861578_"+cur_time+"&_="+cur_time_c;
 * GM_xmlhttpRequest({
 * method : 'GET',
 * synchronous : false,
 * url : url_c,
 * headers : {
 * "cookie":document.cookie,
 * },
 * onload:function(e){alert(JSON.stringify(e));}
 });*/