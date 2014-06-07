// ==UserScript==
// @name       奇虎问答添加寻找答案链接
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match     http://wenda.qihoo.com/*
// @copyright  2012+, You
// ==/UserScript==


function $(tid){
    return document.getElementById(tid);
}

var bd = $("bd");
//alert(bd.innerHTML);

var reg = /\/q\/\d+/;

a = bd.getElementsByTagName("A");
//alert(a.length);
 
for(var i=0;i<a.length;i++)
{
     url = a[i].href;
     t = a[i];
     f = a[i].parentNode; 
     
     //alert(url);
      //alert(reg.test(url));
    
     if(reg.test(url))
     {
         var q = a[i].title==""?a[i].innerText:a[i].title;
            //t.href="http://zhidao.baidu.com/search?pn=0&&rn=10&ie=utf-8&fr=wwwt&word="+a[i].title;
            //t.href="http://wenwen.soso.com/z/Search.e?sp=S"+a[i].title+"&w="+a[i].title+"&search=搜索答案"     
                 
            var s = document.createElement("span"); 
            s.innerHTML = "<a target='_blank' href='"
                    +"http://wenwen.soso.com/z/Search.e?sp=S"+q+"&w="+q+"&search=搜索答案"
                    +"'>"
                    +"[搜搜问问]"
                    +"</a>";
            s.class="cate";
            f.insertBefore(s,null) 
                
                
            var s1 = document.createElement("span"); 
            s1.innerHTML = "<a target='_blank' href='"
                    +"http://zhidao.baidu.com/search?pn=0&&rn=10&ie=utf-8&fr=wwwt&word="+q
                    +"'>"
                    +"[百度知道]"
                    +"</a>";
            s1.class="cate";
            f.insertBefore(s1,null) 
                
     }
   
}

function addClick(){
			var lis=document.getElementsByTagName("h3");
			for(var i=0,len=lis.length;i<len;i++){
				 
                 f = lis[i].parentNode; 
                 t = lis[i];
                
                 q=lis[i].innerText;
               
                
                 var s = document.createElement("span"); 
            s.innerHTML = " <a target='_blank' href='"
                    +"http://wenwen.soso.com/z/Search.e?sp=S"+q+"&w="+q+"&search=搜索答案"
                    +"'>"
                    +"[搜搜问问]"
                    +"</a>";
            s.class="cate";
            f.insertBefore(s,null) 
                
                
            var s1 = document.createElement("span"); 
            s1.innerHTML = " <a target='_blank' href='"
                    +"http://zhidao.baidu.com/search?pn=0&&rn=10&ie=utf-8&fr=wwwt&word="+q
                    +"'>"
                    +"[百度知道]"
                    +"</a>";
            s1.class="cate";
            f.insertBefore(s1,null) 
                
			}
			
}
addClick();