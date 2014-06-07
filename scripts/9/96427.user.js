// ==UserScript==
// @name           doubanCSU2
// @namespace      http://awawsese765.20x.cc
// @description    在撒地方上
// @include        http://book.douban.com/subject/*
// @include        http://book.douban.com/isbn/*
// ==/UserScript==
if(typeof unsafeWindow.jQuery!=="undefined")
{
  var jQuery=unsafeWindow.jQuery;
  var $=jQuery;
}

$(document).ready(function()

{

var isbn=null;
var title = $("h1>span").text();
var oIFr=null;
var oIFrame=null;
function createIFrame(){
 /*
 var oIFrameElement=document.createElement("iframe") ;
     oIFrameElement.style.display="none"; 
     oIFrameElement.name="a"; 
     oIFrameElement.id="a"; 
     document.body.appendChild(oIFrameElement);
     oIFrame=frames["a"];
   */
  $("body").append('<div style="position: absolute; opacity: 0.90;background-color:#00AA44;height: 800px;  width: 300px;  top: 23%;  left: 70%;  margin-left: -50px;  margin-top: -50px;  border: 1px solid #555;"><iframe frameborder="0" height="800px"   scrolling="no" id="a" name="a" src=""></iframe></div>');


}

if(!oIFrame)
{
    
  createIFrame(); 
 
}

$("#info .pl").each(function(i)
	
	{
	 if($(this).text()=='ISBN:')
		{
             isbn=$(this)[0].nextSibling.nodeValue;
             var pattern=/\d+/;
			 var matches=isbn.match(pattern);
			 isbn=matches[0];
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
		}
    });
    	 
   function requestXHR() 
   {
    oIFr= document.getElementById("a");
    //oIFr.onload = function() {  alert("loaded");  } 
    oIFr.src='http://awawsese765.20x.cc/test1.php?isbn='+isbn+'&title='+title;
    
   }
  
   requestXHR();
  
    //GM_log(isbn);
			 
	 /*
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
			 GM_log(htmlstr);
			 var pattern1=/-111/;
			//var a=htmlstr.matches(pattern1)=="0";
			
             if(pattern1.test(htmlstr))
			 	{
					var openLink = "http://opac.its.csu.edu.cn/NTBookRetr.aspx?page=1&Index=4&KeyWord="+title+"&LocLmt=&SrchTab=0&Acurate=0&nSort=0&nSrch=";
	                var htmlstr = "<h2>到中南大学图书馆借书。。。。。。。。。。</h2>";
	                htmlstr += "<div class='indent'><a href="+openLink+" target='_blank' title='点击进入图书馆'>"+ title +"</a></div>";
	              }
                 $(".aside").prepend(htmlstr);
		   }
		}
        
        
        var option={
           type: "GET",
           async: "true",
           dataType: "text",
            url  :   'http://awawsese765.20x.cc/test.php?isbn='+isbn+'&title='+title,
            success: function(str){  alert(str);}
            
        }
      */
   //   var url='http://awawsese765.20x.cc/test.php?isbn='+isbn+'&title='+title;
      
//		setTimeout(function(){
			
//		$(".aside").load(url,function(responseText,re){alert(re);});


	//	},500);
  // }
//	});



});

		/*	
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
                 */
  
  function display(text)
  {
    
   var htmlstr=Text;
			 GM_log(htmlstr);
			 var pattern1=/-111/;
			//var a=htmlstr.matches(pattern1)=="0";
			
             if(pattern1.test(htmlstr))
			 	{
					var openLink = "http://opac.its.csu.edu.cn/NTBookRetr.aspx?page=1&Index=4&KeyWord="+title+"&LocLmt=&SrchTab=0&Acurate=0&nSort=0&nSrch=";
	                var htmlstr = "<h2>到中南大学图书馆借书。。。。。。。。。。</h2>";
	                htmlstr += "<div class='indent'><a href="+openLink+" target='_blank' title='点击进入图书馆'>"+ title +"</a></div>";
	              }
                 $(".aside").prepend(htmlstr); 
  }
