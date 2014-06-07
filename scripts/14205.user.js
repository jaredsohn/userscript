// ==UserScript==
// @name           Reply buttons for new Douban
// @namespace      http://npchen.blogspot.com
// @description    给每个帖子添加回复按钮和引用按钮，通用于豆瓣的评论，小组，日记，相册，论坛等所有能回复的页面。对小组的额外增强包括，翻页条置顶，显示楼层，楼层跳转，top按钮，过滤发言等等，当前稳定版本(v1.5.5.5) 
// @include        http://www.douban.com/group/topic/*
// @include        http://www.douban.com/review/*
// @include        http://www.douban.com/forum/*
// @include        http://www.douban.com/note/*
// @include        http://www.douban.com/*/discussion/*
// @include        http://www.douban.com/*/photo/*
// @include        http://www.douban.com/minisite/*/public_photo/*
// @exclude        http://www.douban.com/group/topic/*/edit
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.min.js
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         NullPointer
// @version        1.5.5.5
/* @reason  
2009年3月26日
1.5.5.5   修正脚本的效率问题。应该会变快。
   @end*/
// ==/UserScript==

var thisScript = {
   name: "引用回复按钮",
   id: "14205",
   version:"1.5.5.5"
}
var updater = new Updater(thisScript);
updater.check(); 

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

if(typeof unsafeWindow.jQuery !== "undefined") {
   var jQuery = unsafeWindow.jQuery;
   var $ = jQuery 
} 

function generateButton(name, eventHandle) {
    var d = document.createElement('div');
    d.align = 'right';
    var spn = document.createElement('span');
    spn.style.cssText = 'float: right;';
    spn.className = 'gact';
    var alink = document.createElement('a');
    alink.href = "javascript:;";
    alink.innerHTML = decodeURI(name);
    alink.addEventListener('click', eventHandle, true);
    spn.appendChild(document.createTextNode('>'));
    spn.appendChild(alink);
    spn.appendChild(document.createTextNode('　'));
    d.appendChild(spn);
    return d;
}

//set the handle. get text and put the text. but the put method could delay .
function getQuoteHandle(base) {
    return function(event) {
	    var strHead = tExtractQHeadFunc(base);
	    var strContent = tExtractTextFunc(base);
        strContent = strContent.replace(/\n[\s]*\n/g, "\n");
		var str = strHead + '\n' + strContent;
		str = str.replace(/[\s]*$/, "\n");
        if (str.search(/(-{50,})[\s\S]+\1/g)>-1)
          if (confirm("你想删去引文中的引文吗？")){
            str = str.replace(/(-{50,})[\s\S]+\1/g,"");
            str = str.replace(/\n[\s]*\n/g, "\n");
          }
	    if (setTA) outputQuote(str);
		else setTextarea(outputQuote,str);	
		return true;
	};
}

function outputQuote(str) {
    window.scrollTo(0, document.body.scrollHeight);
	if (txtarea.value != "") txtarea.value += "\n";
	txtarea.value += "----------------------------------------------------------\n";
	txtarea.value += str;
	txtarea.value += "----------------------------------------------------------\n\n";
	txtarea.scrollTop = txtarea.scrollHeight;
	txtarea.focus();
}

function outputReply(strR) {
    window.scrollTo(0, document.body.scrollHeight);
	if (txtarea.value != "") txtarea.value += "\n";
	txtarea.value += strR;
	txtarea.scrollTop = txtarea.scrollHeight;
	txtarea.focus();
}

function getReplyHandle(base) {
    return function(event) {
	    var strR = tExtractRHeadFunc(base);
		strR = '@' + strR + " \n";
		if (setTA) {outputReply(strR); }
		else setTextarea(outputReply, strR);
		return true;
    };
};

var q_textarea = "//TEXTAREA[@name='rv_comment']";
var q_textarea2 = "//TEXTAREA[@name='note_comment']";
var q_textarea3 = "//TEXTAREA[@name='reply_text']";
var maxlength = 500;
var txtarea;
var insertPoint;

function getIgnore(name) {
    return $("<span>　</span><a align='right' class='ignore' href='"+name+"' title='忽略此用户的所有发言'>X</a>");
}

function tToggle() {
   $(document).ready(function(){
      hint= "显示此用户的所有发言(再次点击还原)";
      $("#in_tablem table.wr span.pl2 a").attr("title",hint).click(togf);
      $("#in_tablem span.wrap h4").find("a:first").attr("title",hint).click(togf).each(function(){
           var name = $(this).attr("href");
           $(this).parent("h4").append(getIgnore(name));
       })
      $("#in_tablem span.wrap a.ignore").click(igf);
   }); 
}


function igf() {
   //alert('ignore');
   var name = $(this).attr("href");
   $("table.wr table.wr").filter(function(){
	   var s = $(this).find("span.wrap a").attr("href"); 
	   return (s==name)
	}).remove();
   return false
}
	
function togf() {
   //alert('toggle');   
   var name = $(this).attr("href");
	$("table.wr table.wr").filter(function(){
	   var s = $(this).find("span.wrap a").attr("href");
	   return (s!=name)
	}).toggle(); 	 
	return false
}

function set_levels() {
   var all_comments = $("tr td span h4");
   var thispage = $("span.thispage");
   var index = 0;
   if (thispage && thispage.length > 0) {
     var number = thispage.html();
     if(!isNaN(number)) index += (number-1)*100;
   }
   if (all_comments){
     $.each(all_comments, function(){
        $(this).html((++index).toString()+ "楼　"+$(this).html());
        $(this).find("a").attr("name","level"+index);
        
        var spanr = $("<span class='gact'/>").css({float:"right"});
        var linkt = $("<a href=javascript:{}/>").html("top↑").click(gotop);
        spanr.append(linkt);
        $(this).append(spanr);
     })
   }
}

function gotop(){
  window.scrollTo(0, 0);  
  var input = xpath("//input[@class='goto_input']").snapshotItem(0); 
  input.value=""; 
  input.focus();
}

function gotopage(level){ 
  var level_page = level % 100 ;
  var start_page = level - level_page; //目标页面
  var purl = window.location.href; 
  purl = purl.replace(/[?#](.)+$/,""); 

  var current_page;
  var max_page=0;
  var max_href="";
  if ($("span.thispage").html()==null) current_page = 0;
  else { //with navigator.
    current_page = ($("span.thispage").html()-1)*100; 
    max_index = $(".paginator span.next").prev().html(); 
    max_page = (max_index-1)*100;  
    max_href = purl+"?start="+max_page.toString(); 
  }
  
  if (start_page > max_page) {
      if ((max_page == current_page)||(max_href=="")) {
         window.scrollTo(0, document.body.scrollHeight);
      }
      else {
         CGM_setValue("level_goal", "bottom"); 
         window.location.href = max_href;
      }   
  }
  else if(start_page != current_page) {
      CGM_setValue("level_goal", level);
      window.location.href = purl+"?start="+start_page.toString();
  }
  else {
      gotolevel(level);
   }
}

function gotolevel(l){
   if (document.getElementsByClassName('wr')[l%100]==undefined) { // outbound.
     window.scrollTo(0, document.body.scrollHeight);
   }
   else {
     window.location.hash = "#level"+l;
   } 
   CGM_setValue("level_goal","xx");
}

function set_paginator(){
  var goto_input = $("<input class='goto_input'/>").attr("size","4");
  
  var gotobus = $("<span/>").html("　　跳到");
  gotobus.append(goto_input).append($("<span>楼</span>"));
    
  if ($("div.paginator").length>0) $("div.paginator").append(gotobus);
  else 
  $('div#in_tablem table.wr tbody tr:first td:eq(1) span.pl2').after(gotobus);
  
  var paginator = $("<div class='paginator'/>").html($("div.paginator").html());
  $("div#in_tablem").prepend(paginator);  
  
  var inputs = xpath("//input[@class='goto_input']");
  for (var i=0; i<2; i++) {
    var input = inputs.snapshotItem(i);
    if (input) input.addEventListener('keypress', get_gotohandler(input),true);
  }
}

function get_gotohandler(input){
   return function(event){
      if (event.which==13){
        var level = parseInt(input.value); 
        if (isNaN(level)) {alert("请输入数字"); lt.value=""; return;}
        gotopage(level);
      }
    }
}


var tBase = function(a) { //default case. for group and forum.
    return a.parentNode;
};
var tInsertFunc = function(base, qbutton, rbutton) { //default case, for group and forum;
    base.appendChild(qbutton);
    base.appendChild(rbutton);
};
var tExtractTextFunc = combineExtract;
var tExtractQHeadFunc = function (base) {  //default case, for all cases.
    var strH= base.getElementsByTagName('h4')[0].textContent;
	strH = strH.replace("\n"," ").replace(/\s+/g," ").replace(/top↑(.)+X/,"");
    return strH;
};
var tExtractRHeadFunc = getReplyName;


function getReplyName (base) { //default case, for comment and group.

    return base.getElementsByTagName('a')[0].textContent;
}

function combineExtract(base) {
    var node = base.nextSibling;
    var strContent = "";
    while (true) {
        strContent += node.textContent;
        node = node.nextSibling;
	if ((node == null)||(node.tagName == 'DIV') || (node.tagName == 'SPAN')) break;
    }
    strContent = strContent.replace(/^[\s]*/,"    ");
    return strContent;
}

function checkPageType(a) {
    var parent = a.parentNode.tagName;
    var hasTagP = a.parentNode.getElementsByTagName("P").length;
    if ((parent == "DIV") && (hasTagP == 0)) { //!! this is comment page.
	    //alert("this is in comment page.");
	    tBase = function(aa) {
            return aa;
        };
        tExtractQHeadFunc = function (base) {  //default case, for all cases.
          var strH= base.getElementsByTagName('h3')[0].textContent;
      	  strH = strH.replace("\n"," ").replace(/\s+/g," ");
          return strH;
        };
        tInsertFunc = function(base, qb, rb) {
			var b = base.nextSibling; 
			while(true) {
				if ((b==null)||(b.tagName=="SPAN")||(b.tagName=="DIV")) break;
				b = b.nextSibling;
			}
			base.parentNode.insertBefore(rb, b);
            base.parentNode.insertBefore(qb, rb);
            base.parentNode.insertBefore(document.createElement('br'), b)
        };
    }
    else if ((parent == "TD") && (hasTagP > 0)) {//!! this is in group page & photo_note page.
	  //alert("this is in group page.");
      tExtractTextFunc = function(base) {
        return base.getElementsByTagName('p')[0].textContent;
      };
      
      if (!type_photo_note) {
        set_paginator(); 
        set_levels();
        tToggle();
      }
    }
    else if ((parent == "TD") && (hasTagP == 0)) {//!! this is in forum page. & note page & discussion
	    //alert("this is in forum page.");
        tExtractTextFunc = function(base) {
            return combineExtract(base.getElementsByTagName("SPAN")[0]);
        };
		if (type_note) { //note's case
		   //alert("note");
	        tExtractRHeadFunc = function (base) { 
			   var b = base.getElementsByTagName("SPAN")[0];
               return b.firstChild.firstChild.nextSibling.textContent;		   
			}; 
    	}
		else {
		    //alert("not note");
			tExtractRHeadFunc = function (base) { //default case, for comment and group.
				var b = base.getElementsByTagName("SPAN")[0];
				return b.firstChild.firstChild.firstChild.nextSibling.textContent;
			};
		}
    }
    //else alertError(1);
}

function alertError(a) {
    alert("the page format has changed. just update the script please."+"\n"+"error num:"+a);
}

function setTextarea(output, s) {
    if (($("a#joingroupbtn").size()>0)) {
        if ($("textarea[name!='comment']").size()==0) { 
		  alert("囧，请先加入这个小组..."); 
		  window.scrollTo(0, document.body.scrollHeight);
		}
		else {
		  setTextarea0();
		  output(s);
		}
	} 
    else if ($("a#last").size()==1) { //继续发言状态
       var link = "http://www.douban.com"+$("a#last").attr("href");
       goto_output(link,output,s);
    } 
    else if (atlastpage()){//半公开小组？
        alert("囧，你要先加入这里..."); 
    }
   	else { 
		var link = "http://www.douban.com"+$(".paginator span.next").prev("a").attr("href");
		goto_output(link,output,s);
	}
}

function atlastpage(){
   if ($('.paginator').size()==0) return true;
   current_page = $("span.thispage").html(); 
   max_page = $(".paginator span.next").prev().html(); 
   return current_page == max_page;
}


function goto_output(link, output, s){
   CGM_setValue("level_goal", "bottom"); 
   CGM_setValue("np_reply_text", s);
   CGM_setValue("np_reply_output", (output == outputQuote));
   window.location.href = link;
}

var type_note = false
var type_photo_note = false

function setTextarea0() {
     //q_textarea inside
	var results = xpath(q_textarea); 
	if (results.snapshotLength==0) { 
	   results = xpath(q_textarea2);
       if (results.snapshotLength==0) {
           results = xpath(q_textarea3);
           if (results.snapshotLength==0) return false;
           else type_photo_note = true;
       }
       else type_note = true	   
	}
	txtarea = results.snapshotItem(0);
	txtarea.parentNode.setAttribute('class', "ft");
    txtarea.setAttribute('cols', "55");
    txtarea.setAttribute('rows', "15");
	return true;
} 

function setLevels(query) {
    var levels = xpath(query);
    if (levels.snapshotLength > 0) {
	    checkPageType(levels.snapshotItem(0));  //set the type of page.
        for (var i = 0; i < levels.snapshotLength; i++) {
            var baseElement = tBase(levels.snapshotItem(i));
            var quoteButton = generateButton("引用", getQuoteHandle(baseElement));
            var replyButton = generateButton("just @", getReplyHandle(baseElement));
            tInsertFunc(baseElement, quoteButton, replyButton);
        }
    }
}



var set_level =CGM_getValue("level_goal", "xx");
var reply_text=CGM_getValue("np_reply_text","..");
var output_test = CGM_getValue("np_reply_output", "");

var setTA = setTextarea0(); 
setLevels("//span[@class='wrap']");
if (set_level != "xx") {
  if (set_level == "bottom") {
     CGM_setValue("level_goal","xx");
     window.scrollTo(0, document.body.scrollHeight);
   }
  else  gotolevel(set_level);
}  

if (reply_text != "..") {
   CGM_setValue("np_reply_text", "..");
   output = (output_test=='true') ? outputQuote : outputReply ;
   output(reply_text);
}

  
 



  
 

