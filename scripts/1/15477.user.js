// ==UserScript==
// @name           Friends Toolbar for Douban
// @namespace      http://npchen.blogspot.com
// @description    在友邻页面增添一个随鼠标指向内容而变的浮动工具条，如下所示：书 | 影 | 乐 | 小组 | 朋友 | 广播 | 推荐 | 活动 | 日记 | 留言板 | 发豆邮 >>> 说话 | 引用。引用仅在友邻说话的格子内出现。
// @include        http://www.douban.com/contacts/*
// @exclude        http://www.douban.com/contacts/list*
// @exclude        http://www.douban.com/contacts/invite
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         NullPointer
// @version        1.8
/* @reason
   1.8  修正一个工具栏某些时刻显示于照片右侧而非下方的排版问题。
        感谢我的友邻Иıɔʞ 豆邮提供的代码  
   @end*/
// ==/UserScript==

var thisScript = {
   name: "友邻页浮动工具条",
   id: "15477",
   version:"1.8"
}
var updater = new Updater(thisScript);
updater.check(); 

if(typeof unsafeWindow.jQuery !== "undefined") {
   var jQuery = unsafeWindow.jQuery;
   var $ = jQuery 
} 


function createBar(head,name, nname){
    return $("<div class='clear'></div><div id='barrrr'><span>"+head+"<a href='"+name.replace("people","book/list")+"'>  书  </a>|<a href='"+name.replace("people","movie/list")+"'>  影  </a>|<a href='"+name.replace("people","music/list")+"'>  乐  </a>|<a href='"+name+"groups'>  小组  </a>|  <a href='"+name+"friend_list"+"'>朋友</a>  |  <a href='"+name+"miniblogs'>广播</a>  |  <a href='"+name+"recs'>推荐</a>  |  <a href='"+name+"event'>活动</a>  |  <a href='"+name+"notes'>日记</a>  |  <a href='"+name+"photos'>相册</a>  |  <a href='"+name+"board'>留言板</a>  |  <a href='/doumail/write?to="+name.substr(8,(name.length-9))+"'>发豆邮</a>  >>>  <a href='javascript:{}' onclick='$(\"textarea\").attr(\"value\",\"@\"+\""+nname+"\"+\"　\"); window.scrollTo(0, 0); $(\"textarea\").focus()'>说话</a></span></div>");
}

function createQuote(who,say,words){
   var s = who+say+"『"+words+"』　"; 
   s=s.replace(/"([^"]*)"/g,"“$1”");
   s=s.replace(/'([^']*)'/g,"‘$1’");
   s=s.replace(/['"]/g,"’");
   return $("<apan> | <a href='javascript:{}' onclick='$(\"textarea\").attr(\"value\",\""+s+"\"+\"　\"); window.scrollTo(0, 0); $(\"textarea\").focus()'>引用</a></span>");
}

function getPeople(li) {
  return li.find("a").filter(function(index) {
		   return ($(this).children("img").size()==0) 
		}).filter(function(index){
                   return ($(this).attr("href").search(/^\/people/)>(-1))
		}).filter(function(index){
		   return ($(this).attr("href").search(/recs\?rid=/)==(-1))
		})
}

function isSaying(li){
  return li.find("span.pl").html().search(/<a (.)*a>/)==-1
}

$(document).ready(function(){
    $("li.mbtr").append($("<p/>")).hover(
      function() {
	    var a = getPeople($(this));
		var name = a.attr("href");
		var nname = a.html();
		var bar = createBar("",name,nname);
        if (($(this).find("div.quote span.inq").html()!=null)&&isSaying($(this))) {
          var quot =createQuote(nname, 
                       $(this).find("span.pl").html(), 
                       $(this).find("div.quote span.inq").html().replace(/\n/g, " "));
          bar.append(quot);
        }
	    bar.appendTo($(this)).show();		
	  },
	  function() {
	    $(this).find("div").remove("#barrrr");
	  }
    )
    
    
    $("li.mbtr div.quote").click(function(){
       if (isSaying($(this).parent())) {
           var who = getPeople($(this).parent()).html().replace(/&nbsp;/g," ");
           var say = $(this).parent().find("span.pl").html().replace(/&nbsp;/g," "); 
           var words = $(this).find("span.inq").html().replace(/\n/g, " ");
           $("textarea").attr("value",who+say+words+"　");
           window.scrollTo(0,0);
           $("textarea").focus();
       }
    })
   
    getPeople($("li.mbtr")).mouseover(function(){
	   par = $(this).parent();
	   if (!par.is("li")) par = par.parent();
	   name = $(this).attr("href");
	   index = name.search(/\?/);
	   if (index>0) name = name.substr(0,index); 
	   nname = $(this).html();
	   par.find("div").remove("#barrrr");
	   bar = createBar(nname+":", name, nname);
	   bar.appendTo(par).show();
	});
   
})
