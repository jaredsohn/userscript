// ==UserScript==
// @name       花瓣网画板采集
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include   http://huaban.com/boards/*
// @copyright  2012+, You
// ==/UserScript==
var count,last_seq,gurl,urls,gfile;
var i,j,childlen,totalnum,sign,eq=0;
var overlay,op=0;
var require;
var cont,bdstoken,surl;
var cun_title,cun_title_text,album_sign='',index;
var last_seq2,sign2=0,count2,len2;
var c_a,c_strong,c_span,c_cun,c_strong2,c_span2;
var k;
/***************************各种初始化和收集数据******************************/
//urls数组用来存放获取到的url
urls=new Array();
//sign用来判断是否是第一组采集，如果是第一组，则将last_seq置为空
sign=0;
//j用来记录已采集的图片数
j=0;
//获取待采集图片总数
totalnum=parseInt(document.querySelector(".count").innerHTML);
//初始化count计数器
count=0;
index=1;

//获取bdstoken
require=new XMLHttpRequest();
require.open("GET","http://xiangce.baidu.com/bookmark?tpl=newmark&name=avast&surl=http%3A%2F%2Fhimg.bdimg.com&srcs[]=http%3A%2F%2Fhimg.bdimg.com%2Fsys%2Fportrait%2Fitem%2Fa7db66656e677a696c6f6e67686169fe10.jpg",false);
require.send();
cont=require.responseText;
bdstoken=cont.substring(cont.indexOf("bdstoken")+11,cont.indexOf("albumList")-3);
//获取源地址
surl=location.href;
if(location.href.indexOf("/#")>0)
{
    surl=location.href.substring(0,location.href.indexOf("/#"));
}
else if(location.href.substring(location.href.length-1,location.href.length)=='/')
{
    surl=location.href.substring(0,location.href.length-1);
}
else if(location.href.indexOf("#"))
{
    surl=location.href.substring(0,location.href.indexOf("#"));
}

/*****************************采集过程中&完成后*********************************/
//正在采集中
function display_info()
{
    var c_div,info_op=0,t=5,c_div2,c_close;
    c_div=document.createElement("div");
    c_div.id="info";
    c_div.innerHTML="正在采集中";
    c_div.style.cssText="position:absolute;width:200px;height:40px;z-index:99999;padding-left:50px;line-height:40px;color:#3d3d3d;font-family:Microsoft Yahei;opacity:0;";
    c_div.style.top=60+"px";
    c_div.style.left=(document.documentElement.clientWidth-200)/2+"px";
    document.body.appendChild(c_div);
    function change_info_op(){
        info_op=info_op+2;
        c_div.style.opacity=info_op/100;
        if(info_op<100)
        {
            setTimeout(arguments.callee,50);
        }
    }
    change_info_op();
    
    c_div2=document.createElement("div");
    c_div2.id="urls";
    c_div2.style.cssText="position:absolute;top:100px;left:370px;width:565px;padding-left:10px;line-height:19px;z-index:100000;display:none;";
    //根据文本的行数和每行的高度(行高为font-size+6)计算c_div2的高度，便于选中文本
    c_div2.style.height=(19*totalnum)+"px";
    document.body.appendChild(c_div2);
    
    
    //关闭按钮
    c_close=document.createElement("span");
    c_close.style.cssText="position:fixed;top:15px;right:20px;width:20px;height:20px;opacity:0.6;cursor:pointer;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZRJREFUeNqslM8rRFEUx+e9xkQekcZC1lIWkiQlUbZWsrOQLGyliBiUJdnKwmJSUiwk8j9IEkpYSRYsZ8ZixPM90/fqdrrvmTSnPnXn/vjMOe+9c70wDBMVDUvYAvpB4389JReFPeAEnIJD0FuGYwBkeWbGSH0uSmZmXAMWQXeMbATMgyb+HgYdCUvyrA4kwZLZpGIUTDvmv2zhGXhVG1JgBbRZc+Ng0iG7Bw8y8KRuz/NknAabVhkmcmABDDE7HU+sJldyWUKJVrAB6tShKvAOGtT8HVgDBf1STLyAZfM8GAH4BNUgb81fM7OCLfAdJTyCjCUzEhF+gw9wCVZBUR/2Iz6LW3Cl/x1RL5XxWRddB13CJL/DLvCm1gKS4VfwpzDFzaZT0pY0YMaSYTtLTsYJpUPWHR3SzLeZp8xEJyvxXUIjc3WG9Pgc2HGsSSWzttQMpliGjgOwzfEx2HPsGQRjWtjn2JglduyDo4jLIhF3OewyO1fI2nnUNWRaL820a7n5poz7cILXliS1BS5+e7mS8SPAAJQVbe8Os3NMAAAAAElFTkSuQmCC');";
    document.querySelector("#page_overlay").appendChild(c_close);
    
    //给关闭按钮绑定事件
    c_close.onmouseover=function(){this.style.opacity=0.8;};
    c_close.onmouseout=function(){this.style.opacity=0.6;};
    c_close.onclick=function(){var p,u;p=document.querySelector("#page_overlay");p.style.display="none";p.style.opacity=0;document.body.removeChild(document.querySelector("#info"));u=document.querySelector("#urls");document.body.removeChild(u);sign=0;count=0;op=0;};
    
    //自动选中文字
    function selectText(){
        var range;
        range=document.createRange();
        range.selectNode(document.querySelector("#urls"));
        window.getSelection().addRange(range);
    }
    
    //显示urls
    function print_urls(){
        var urls2str='';
        for(i=0;i<urls.length;i++)
        {
            urls2str+=urls[i]+"</br>";
        }
        document.querySelector("#urls").style.display="block";
        document.querySelector("#urls").innerHTML=urls2str;
    }
    
    document.onclick=function(){selectText();};
    
    
    function showdot(){
        var str="正在采集中......";
        if(t===11)
        {
            t=5;
        }
        c_div.innerHTML=str.substring(0,++t);
        //如果采集完成
        if(eq===1)
        {
            c_div.innerHTML="采集成功";
            print_urls();
        }
        //否则
        else
        {
            setTimeout(arguments.callee,800);
        }
    }
    showdot();
}


//change_op函数
overlay=document.getElementById("page_overlay");
overlay.style.opacity=0;
function change_op(){
    var reg_tip;
    if(reg_tip=document.querySelector(".registration-tip"))
    {
       reg_tip.style.display="none";
    }
    if(overlay.style.display!="block")
    {
        overlay.style.display="block";
    }
    //用整型数进行运算，避免浮点数运算产生的精度损耗bug
    op=op+5;
    overlay.style.opacity=op/100;
    if(op===90)
    {
        display_info();
    }
    if(op<100)
    {
        setTimeout(arguments.callee,20);
    }
}


/*****************************核心函数*****************************/
function get_urls(){
    k++;
    if(sign===0)
    {
        change_op();
        last_seq='';
    }
    if(eq===0)
    {
        gurl=surl+"/?&max="+last_seq+"&limit=20&wfl=1";
        GM_xmlhttpRequest({
            method:'GET',
            synchronous : false,
            url : gurl,
            headers:{
                "X-Requested-With":"XMLHttpRequest"
            },
            onload:function(e){
                var res,res_pins_json,len;
                res=e.responseText;
                res_pins_json=JSON.parse(res).board;
                len=res_pins_json.pins.length;
                last_seq=res_pins_json.pins[len-1].pin_id;
                //如果是最后一组采集，获取其真正的数量
                if((totalnum-count)<20&&(totalnum-count)!=0)
                {
                    len=totalnum-count;
                }
                //将获取到的urlpush进urls数组中
                for(i=0;i<len;i++)
                {
                    urls.push("http://img.hb.aicdn.com/"+res_pins_json.pins[i].file.key);
                    j++;
                }
                count=count+20;
                sign=1;
                if(j===totalnum)
                {
                    eq=1;
                }
                //如果未采集完，则继续调用get_urls函数
                if(count<totalnum)
                {
                    get_urls();
                }
            }
        });
    }
}


/**********************转存至百度相册函数************************/
//转存
function transfer(){
    var gurl2;
    if(sign2===0)
    {
        last_seq2='';
    }
    gurl2=surl+"/?&max="+last_seq2+"&limit=20&wfl=1";
    GM_xmlhttpRequest({
        method:'GET',
        synchronous : true,
        url : gurl2,
        headers:{
            "X-Requested-With":"XMLHttpRequest"
        },
        onload:function(e){
            var res2,res2_pins_json,arr,img_urls,data2;
            sign2=1;
            img_urls='';
            res2=e.responseText;
            res2_pins_json=JSON.parse(res2).board;
            len2=res2_pins_json.pins.length;
            last_seq2=res2_pins_json.pins[len2-1].pin_id;
            for(i=0;i<res2_pins_json.pins.length;i++)
            {
                img_urls+=("&picture_src_list[]=http://img.hb.aicdn.com/"+res2_pins_json.pins[i].file.key);
            }
            data2="picture_name="+encodeURI(img_urls)+"&bdstoken="+bdstoken+"&surl="+surl+"&album_sign="+album_sign+"&scope=0";
            GM_xmlhttpRequest({
                method:"POST",
                synchronous : false,
                url : "http://up.xiangce.baidu.com/bookmark/submit",
                headers : {
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                data:data2,
                onload:function(){
                    count=count+20;
                    if(totalnum>count)
                    {
                        transfer();
                    }
                    else
                    {
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
                alert("成功创建相册~~");
                album_sign=JSON.parse(e.responseText).data.album_sign;
                //成功创建相册时，开始转存图片
                setTimeout(transfer,1000);
            }
            else
            {
                createAlbum(cun_title_text+(++index));
            }
        }
    });
}



//转存的主函数
function tranferAlbum(){
    //获取相册名
    cun_title=document.querySelector("#BoardTitle h1").innerHTML;
    cun_title_text=cun_title.substring(0,cun_title.indexOf("<span"));
    //初始化相册序号
    index=1;
    //创建同名相册
    createAlbum(cun_title_text);
}


/*******************************界面*******************************
*****************************初始化界面**************************/
//添加采集本画板按钮
c_a=document.createElement("a");
c_a.href="#";
c_a.className="btn wbtn";
c_strong=document.createElement("strong");
c_strong.innerHTML="采集本画板";
c_a.appendChild(c_strong);
c_span=document.createElement("span");
c_a.appendChild(c_span);
document.querySelector("#BoardButton").insertBefore(c_a,document.querySelector(".share"));
//添加转存至百度相册按钮
c_cun=document.createElement("a");
c_cun.href="#";
c_cun.className="btn wbtn";
c_strong2=document.createElement("strong");
c_strong2.innerHTML="转存至百度相册";
c_cun.appendChild(c_strong2);
c_span2=document.createElement("span");
c_cun.appendChild(c_span2);
document.querySelector("#BoardButton").insertBefore(c_cun,document.querySelector(".share"));



//绑定事件
c_a.addEventListener("click",get_urls,false);
c_cun.addEventListener("click",tranferAlbum,false);