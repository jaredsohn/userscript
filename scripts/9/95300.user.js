// ==UserScript==
// @name           doubanCSU
// @namespace      http://awawsese765.20x.cc
// @description    在豆瓣上显示中南大学图书馆的信息
// @include        http://book.douban.com/isbn/*
// @include        http://book.douban.com/subject/*
// ==/UserScript==
/*写在前面
/* 第一次写一个完整的gm脚本代码比较粗糙，没有多少条理
/*这个代码主要是利用ajax与服务器的交互上
/*本来想用服务器传输json格式的数据但是搞了好久都没有弄好只能将就着用文本的传输了
/*  缺点很明显不能对数据进行格式处理
/*更重要的是如果不是json好像jquery不能进行跨域的ajax请求
/*所以只能使用GM-xmlhttpRequest的ajax不能方便的移植到其他游览器所以今后版本中一定要把数据
/*改成json.还有就是这个脚本没有版本以及自动升级的功能以后也要改
/*作者 sunnyxu
/*版权归sunnyxu所有
*/
if(typeof unsafeWindow.jQuery!=="undefined")
{
  var jQuery=unsafeWindow.jQuery;
  var $=jQuery;
}
$(document).ready(function()

{

var isbn=null;//得到图书的isbn
var title = $("h1>span").text();//得到图书标题

title1=title.replace(/(\s)/g,'');


$("#info .pl").each(function(i)
	
	{
	  if($(this).text()=='ISBN:')
		{
             var flag=0;//出版社的位数初始化
             isbn=$(this)[0].nextSibling.nodeValue;
             var pattern=/\d+/;//正则表达式匹配数字去除isbn有的空格
			 var matches=isbn.match(pattern);
			 isbn=matches[0];
             //得到出版社的位数
             switch (parseInt(isbn.substring(4,5)))
             {
                case 0: flag=2;break;
                case 5: flag=4;break;
                case 8: flag=5;break;
                default: flag=3;break;
             }
             //根据不同位数加入连字符
             if(flag==2)
			{isbn=isbn.substring(3,4)+'-'+isbn.substring(4,6)+'-'+isbn.substring(6,12);}
             if(flag==3)
			{isbn=isbn.substring(3,4)+'-'+isbn.substring(4,7)+'-'+isbn.substring(7,12);}
              if(flag==4)
			{isbn=isbn.substring(3,4)+'-'+isbn.substring(4,8)+'-'+isbn.substring(8,12);}
              if(flag==5)
			{isbn=isbn.substring(3,4)+'-'+isbn.substring(4,9)+'-'+isbn.substring(9,12);}
			// GM_log(matches[0]);
			// GM_log(isbn);
			 
	 //option进行ajax的参数设置
		var option={
          method: 'GET',
			url:   'http://awawsese765.20x.cc/test.php?isbn='+isbn+'&title='+title,
			  headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
							'Accept': 'application/atom+xml,application/xml,text/xml',
                       },

          onload:function(res)
			{
		     var htmlstr=res.responseText;
			// GM_log(htmlstr);
			 var pattern1=/-111/;
			//var a=htmlstr.matches(pattern1)=="0";
			//如果没有这本书服务器将输出-111
             if(pattern1.test(htmlstr))
			 	{
					var openLink = "http://opac.its.csu.edu.cn/NTBookRetr.aspx?page=1&Index=4&LocLmt=&SrchTab=0&Acurate=0&nSort=0&keyword="+title1;
	                var htmlstr = "<h2>到中南大学图书馆借书。。。。。。。。。。</h2>";
	                htmlstr += "<div class='indent'><a href="+openLink+" target='_blank' title='点击进入图书馆'>"+ title +"</a></div>";
	              }
                  //将得到的输出或者上面的连接加入到侧边栏
                 $(".aside").prepend(htmlstr);
		   }
		}
        //每个0.5秒发送一次请求参考的别人代码
		setTimeout(function(){
			
		GM_xmlhttpRequest(option);


		},500);
   }
	});
  
});