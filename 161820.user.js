// ==UserScript==
// @name            一键提取邮箱for贴吧
// @description   一键提取贴吧邮箱
// @author          陌百百<feng_zilong@163.com>
// @include         http://tieba.baidu.com/p/*
// @updateURL     https://userscripts.org/scripts/source/161820.meta.js
// @downloadURL    https://userscripts.org/scripts/source/161820.user.js
// @version         0.1
// ==/UserScript==
var get_mail_a,get_mail_button;
function showmail(){
    var cont,mail,re,page,i,j,start,a,tzurl,xml,matched,mail_m,last,ns,ns_close,jsonstr,jsonmail,add,l_m,mailstr;
    /*防止出现"xxx@qq.comLz好人"的情况，只识别com,cn,net，有需要的自己加
    已考虑xxx@vip.qq.com之类的情形*/
    re=/[\w]+@[\w]+\.([\w]+\.)*[\w]+[com|cn|net]/g;
    mail=new Array();
    xml=new XMLHttpRequest();
    start=1;
    j=0;
    //获取页数
    page=parseInt(document.querySelector(".l_reply_num>span").innerHTML);
    a=location.href;
    //获取帖子首页地址
    if(a.indexOf("?")>0)
    {
        tzurl=a.substring(0,a.indexOf("?"));
    }
    else
    {
        tzurl=a;
    }
    
    //若mailcheck中没有mailcheck键，按格式创建，不然下面的对象和数组操作会出错
    if(localStorage.getItem("mailcheck")==null)
    {
        localStorage.setItem("mailcheck",'{"data":[{"url":"","index":"","lastmail":""}]}');
    }
    
    //若当前网址在localStorage中有记录，则从localStorage中取得相关的信息
    if(localStorage.getItem("mailcheck").indexOf(tzurl)>=0)
    {
        //将mailcheck转换为json对象
        jsonmail=JSON.parse(localStorage.getItem("mailcheck"));
        //遍历mailcheck相关信息
        for(i=0;i<jsonmail.data.length;i++)
        {
            if((jsonmail.data[i].url).indexOf(tzurl)==0)
            {
                start=parseInt(jsonmail.data[i].index);
                l_m=jsonmail.data[i].lastmail;
            }
        }
    }
    
    
    //遍历获取每一页的邮箱
    for(i=start;i<=page;i++)
    {
        xml.open("GET",tzurl+"?pn="+i,false);
        xml.send();
        cont=xml.responseText;
        matched=cont.match(re);
        if(matched!=null)
        {
            //将matched分割后的数组依次加至mail数组尾部，mail为多维数组
            mail.push(String(matched).split(","));
            j=j+1;
        }
    }
    
    //若上次最后一页为空，取不到任何邮箱，说明无更新
    if(j==0)
    {
        alert("当前帖子无邮箱更新");
    }
    //否则，截取更新的邮箱
    else
    {
        //获得最后一个数组最后一个元素的值，下次截取更新的邮箱时会用到
        mail_m=mail[mail.length-1];
        last=mail_m[mail_m.length-1];

        //将数组拼接成字符串
        mailstr=mail.join();
    
        //若localStorage中有当前网址的记录，从上次最后一个邮箱开始截取新加入的邮箱
        if(localStorage.getItem("mailcheck").indexOf(tzurl)>0)
        {
            mailstr=mailstr.substring(mailstr.indexOf(l_m)+l_m.length+1,mailstr.length);
        }

        /*********************创建div显示邮箱*********************/
        ns=document.createElement("div");
        ns.id="ns";
        ns.style.cssText+="position:absolute;display:block;width:450px;min-height:320px;word-wrap:break-word;overflow:hidden;color:#333;padding:25px;background-color:white;-webkit-box-shadow:0 0 5px rgba(0,0,0,.5);z-index:99999;";
        ns.style.top=(document.body.scrollTop+(document.documentElement.clientHeight-400)/2)+"px";
        ns.style.left=((document.documentElement.clientWidth-500)/2)+"px";
        
        ns_close=document.createElement("a");
        ns_close.id="ns_close";
        ns_close.style.cssText+="position:absolute;top:8px;right:10px;text-decoration:none;color:#333;font-size:15px;cursor:pointer;";
        ns_close.innerHTML="X";
        ns_close.onclick=function(){ns.style.display="none";};
        GM_addStyle("#ns_close:hover{-webkit-transform:rotate(180deg);-webkit-transition:all .6s ease-in;}");
        
        
        if(mailstr=="")
        {
            ns.style.display="none";
            alert("当前帖子无邮箱更新");
        }
        else
        {
            //若当前网址在localStorage中有记录，且记录的最后一个邮箱不在对应页，表示该楼层被删
            if(l_m!=undefined&&(mail.join()).indexOf(l_m)<0)
            {
                alert("上次记录的最后一个邮箱所在楼层被删，无法截取更新的邮箱，将显示对应页的所有邮箱，请自行比照");
                ns.innerHTML=mail.join();
            }
            else
            {
                ns.innerHTML=mailstr;
            }
        }
        ns.insertBefore(ns_close,ns.firstChild);
        document.body.insertBefore(ns,document.getElementById("local_flash_cnt"));

        /********************存入localStorge中*******************/

        //如果localStorage中mailcheck无记录，初始化
        if(localStorage.getItem("mailcheck")=='{"data":[{"url":"","index":"","lastmail":""}]}')
        {
            jsonstr={"data":[{"url":tzurl,"index":page,"lastmail":last}]};
            localStorage.setItem("mailcheck",JSON.stringify(jsonstr));
        }
        //若当前需提取邮箱的网址未被存储过，则加入localStorage
        if(localStorage.getItem("mailcheck").indexOf(tzurl)<0)
        {
            add={"url":tzurl,"index":page,"lastmail":last};
            jsonmail=JSON.parse(localStorage.getItem("mailcheck"));
            jsonmail.data.push(add);
            localStorage.setItem("mailcheck",JSON.stringify(jsonmail));
        }
        //若存储过，更新该网址的相关数据
        else
        {
            jsonmail=JSON.parse(localStorage.getItem("mailcheck"));
            //遍历jsonmail，找到当前网址在data数组中的位置
            for(i=0;i<jsonmail.data.length;i++)
            {
                //找到当前网址且邮箱有更新，则更新该地址对应的数据
                if((jsonmail.data[i].url).indexOf(tzurl)==0&&mailstr!=null)
                {
                    //更新数据
                    jsonmail.data[i].index=page;
                    jsonmail.data[i].lastmail=last;
                    //将更新后的数据存入localStorage中
                    localStorage.setItem("mailcheck",JSON.stringify(jsonmail));
                }
            }
        }
    }
}


/**********************初始化************************/
function init(){
    var tt=document.querySelectorAll(".core_title_txt")[0];
    if(tt.innerHTML.length>28) {
        tt.innerHTML=tt.innerHTML.substring(0,28);
    }
    document.querySelector(".core_title").style.cssText="padding-left:15px!important;padding-right:9px!important;";
    get_mail_button=document.createElement("li");
    get_mail_button.style.textAlign="center";
    get_mail_a=document.createElement("a");
    get_mail_a.innerHTML="提取邮箱";
    get_mail_a.className="l_lzonly";
    get_mail_a.style.cssText="color:#333;cursor:pointer;";
    get_mail_button.appendChild(get_mail_a);
    document.querySelector(".core_title_btns").insertBefore(get_mail_button,document.querySelector(".core_title_btns").firstChild);
    GM_addStyle(".core_title_btns>li:first-child>a:hover{background:url(http://tb1.bdstatic.com/tb/static-pb/img/pb_css_pic.png?v=1.0&t=130310223407) no-repeat -8px -32px;}");
    get_mail_button.onclick=showmail;
}
document.onDOMContentLoaded=init();