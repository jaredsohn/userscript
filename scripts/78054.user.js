// ==UserScript==
// @name           baidutieba_fairy
// @namespace      hiforrest@gmail.com
// @description    adding a button to jump to the the last page of the post directly from the topic list page; adding a Quota Reply button under every posts in the reading page.
// @include        http://tieba.baidu.com/*
// ==/UserScript==

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

var main_page_style = 
	"#last_page_a:link, #last_page_a:visited {color:#ADADAD !important; font-size:12px; font-weight:normal !important; font-family:Tahoma,Microsoft YaHei,Verdana,Arial,Helvetica,sans-serif;text-decoration:none !important;}" +
	"#last_page_a:hover {color:#7C7C7C !important; text-decoration:none !important;}" +
	"";
	//[尾页]链接


function addLastPage() {

	var tieba_name = document.getElementById("wd1").getAttribute("value");
	var thread_table = document.getElementById("thread_list_table");
	var table_body = thread_table.getElementsByTagName("tbody")[0];

	var rows = table_body.getElementsByTagName("tr"); 
	
	for (var i = 0; i < rows.length; i++) {
		var reply_num = rows[i].getElementsByTagName('td')[1].firstChild.nodeValue;
		reply_num = reply_num - (reply_num % 30);
		var td_wrap_a = rows[i].getElementsByTagName("td")[2];
		var the_a = td_wrap_a.getElementsByTagName("a")[0];
		var thread_href = the_a.getAttribute("href");

		var reg_href_martcher = /(.f\?)(k)(z=\d{9})/
		//var reg_href_modifier = "\1\3&ct=335544320&lm=0&sc=0&rn=30&tn=baiduPostBrowser&word=" + tieba_name + "&pn=" + reply_num;
		//alert(reg_href_modifier);
		//reg_href_modifier = eval(reg_href_modifier);
		thread_href = thread_href.replace(reg_href_martcher,"$1$3&ct=335544320&lm=0&sc=0&rn=30&tn=baiduPostBrowser&word=");
		thread_href += tieba_name + "&pn=" + reply_num;

		if (reply_num>=30) {
			var url_text = td_wrap_a.getElementsByTagName("a")[0].firstChild.nodeValue;
			var last_page_a = document.createElement("a");
			var new_url_text = document.createTextNode(" [尾页]");
			last_page_a.setAttribute("href",thread_href);
			last_page_a.setAttribute("target","_blank");
			last_page_a.setAttribute("id","last_page_a");
			//以上制作尾页链接
			//var last_page_a_style = "font-size:12px;"
			//last_page_a.setAttribute("style",last_page_a_style);
			last_page_a.appendChild(new_url_text);
			//last_page_a.onmouseover = function(){
				//alert("you are on me");
			//}
			//var last_page_link = last_page_a.appendChild(new_url_text);
			if (the_a) {
				the_a.parentNode.insertBefore(last_page_a,the_a.nextSibling);
			} else {
				alert("last_page_a not found");
			}
		}
	}
	//alert(last_page_a.lastChild.nodeValue);
}

function quoteReply(){
	var all_content = document.getElementById("content");
	//alert(all_content);
	var div_in_content = all_content.getElementsByTagName("div");
	post_div = new Array();
	var j = 1;
	for (var m = 1; m < div_in_content.length; m++) {
		div_in_content_class = div_in_content[m].getAttribute("class");
		if (div_in_content_class == "post") {
			post_div[j] = div_in_content[m];
			j++;
		}
	}
	var quote_reply_a_li = new Array();
	var quote_reply_a = new Array();
	var quote_final_text = new Array()
	for (var i = 1; i < post_div.length; i++) {
		var post_content_tr = post_div[i].childNodes[1].childNodes[1].childNodes[0];
		var post_author = post_content_tr.childNodes[1].getAttribute("username");
		if (post_author == null) {post_author = "匿名"}
		var post_content_html = post_content_tr.childNodes[3].childNodes[3].innerHTML;
		//帖子完整内容HTML
		var post_content_html = post_content_tr.childNodes[3].childNodes[3].innerHTML;

		var reg_content_martcher = /(<br>)/g
		post_content_html = post_content_html.replace(reg_content_martcher,"$1\&nbsp;\&nbsp;");

		var reg_content_martcher = /(^)/
		post_content_html = post_content_html.replace(reg_content_martcher,"$1<br>\&nbsp;\&nbsp;");


		var post_floor = post_content_tr.childNodes[3].childNodes[1].innerHTML;
		//n楼，用于引用回复

		var text_input_box = document.getElementById("bdeTextArea");
		quote_final_text[i] = "回复：" + post_floor + " ( " + post_author + " )<br>" + post_content_html + "<br>-----------------------------------------------<br><br>";
		//alert(text_input_box);
		//以上得到帖子作者id和帖子内容html
		quote_reply_a_li[i] = document.createElement("li");
		quote_reply_a[i] = document.createElement("a");
		quote_reply_a[i].addEventListener("click", function(){me=this;quoteReplyFunc(me,quote_final_text)}, false);
		var quote_reply_a_text = document.createTextNode("引用回复")
		quote_reply_a[i].setAttribute("href","#sub");
		quote_reply_a[i].setAttribute("id",i);	
		quote_reply_a[i].setAttribute("value",post_floor);	

		quote_reply_a[i].appendChild(quote_reply_a_text)
		quote_reply_a_li[i].appendChild(quote_reply_a[i]);

		var post_content_tr_replybtn = post_div[i].childNodes[1].childNodes[1].childNodes[2];
		var post_content_tr_replyli = post_content_tr_replybtn.childNodes[1].childNodes[1].childNodes[3];
		//alert(post_content_tr_replyli.innerHTML);
		//以上是储存默认“回复”链接的变量

		post_content_tr_replyli.parentNode.insertBefore(quote_reply_a_li[i], post_content_tr_replyli); 
	}

	function quoteReplyFunc(me,content) {
		id = me.id;
		mycontent = content[id];
		text_input_box.innerHTML = mycontent;
		var t=setTimeout("document.getElementById('bdeTextArea').focus()",100);
	}
}




var reply_page_flag = document.getElementById("nav");
if (reply_page_flag) {
	quoteReply();
}
if (reply_page_flag == null) {
	addLastPage();
	addGlobalStyle(main_page_style);
}
