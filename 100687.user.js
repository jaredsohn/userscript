// ==UserScript==
// @name          Habr to LJ reposter
// @namespace     http://lineman.ru/d/habr_to_lj_reposter.user.js
// @description   Adds "Repost to LJ" button into habrahabr.ru topic page for easy repost to livejournal.com
// @author        korifey13@lineman.ru
// @include       http://habrahabr.ru/blogs/*
// @include       https://habrahabr.ru/blogs/*
// @include       http://habrahabr.ru/company/*
// @include       https://habrahabr.ru/company/*
// ==/UserScript==

function grab_and_repost_to_lj() {

//	var main_ = document.getElementById("layout");
//	 if (main_ == null) return;
//	var entries_ = main_.getElementsByClassName("content");
//	 if (entries_.length == 0) return;

	var topic_URL = "http://" + document.location.host + document.location.pathname; //removing anchor
	//alert(topic_URL);

	var topic_name = document.getElementsByClassName("post_title")[0].innerHTML.replace(/<([a-z]+)([^>]+)*(?:>(.*)<\/\1>|\s+\/>)/g, ''); //stolen from http://net.tutsplus.com/tutorials/other/8-regular-expressions-you-should-know/
	//alert(topic_name);

	var contents_ = document.getElementsByClassName("content");
	 if (contents_.length > 1) return;

	var hf = '<a href="http://habrahabr.ru" title="Перейти на Хабрахабр"><span style="background-color:#7ea0b0; color:white; font-weight:bolder;">&nbsp;habrahabr.ru&nbsp;</span></a>';
	var topic_content = '<center>' + hf + ' Это перепост. Оригинальную статью и комментарии можно прочитать на <a href="http://habrahabr.ru" title="Перейти на Хабрахабр">Хабре</a> по <a href="' + topic_URL + '" title="Перейти по ссылке: ' + topic_URL + '">этой ссылке</a>. ' + hf + '</center><br />';
	topic_content += contents_[0].innerHTML;
	var uf = '<a href="http://userscripts.org" title="Перейти на userscripts.org"><span style="background-color:black; color:white; font-weight:bolder;">&nbsp;userscripts.org&nbsp;</span></a>';
	topic_content += '<br /><br /><center>' + uf + ' Перепост выполнен при помощи <a href="http://korifey13.livejournal.com/36548.html" title="Перейти по ссылке: http://korifey13.livejournal.com/36548.html">пользовательского скрипта "Habr to LJ reposter"</a>. ' + uf + '</center>';
//		//topic_content = topic_content.replace('<a name="habracut"></a>', '<lj-cut text="Читать дальше...">');
	topic_content = topic_content.replace(/<a\b[^>]*name=["']?habracut["']?[^>]*>(.*?)<\/a>/, '<lj-cut text="Читать дальше...">');
	topic_content = topic_content.replace(/<object/g, '<lj-embed><object');
	topic_content = topic_content.replace(/<\/object>/g, '</object></lj-embed>');
	//alert(topic_content);
	
	var topic_tags = "habr";
	var topic_tags_ = document.getElementsByClassName("tags");
	if (topic_tags_.length > 0) { //if we have tags
//alert("got tags");
		var topic_tags_lis_ = topic_tags_[0].getElementsByTagName("li");
		for (var i = 0; i < topic_tags_lis_.length; i++) {
			topic_tags += ", " + topic_tags_lis_[i].getElementsByTagName("a")[0].innerHTML;
		}
	}
	//alert(topic_tags);

	buttons_ = document.getElementsByClassName("infopanel");
	 if (buttons_.length == 0) return;

	var lj_repost_form_ = document.createElement("form");
	lj_repost_form_.setAttribute("name","lj_repost_form");
	lj_repost_form_.setAttribute("action","http://www.livejournal.com/update.bml");
	lj_repost_form_.setAttribute("method","POST");
	buttons_[0].appendChild(lj_repost_form_);

		var topic_name_text_ = document.createElement("input");
		topic_name_text_.setAttribute("type","hidden");
		topic_name_text_.setAttribute("name","subject");
		topic_name_text_.setAttribute("value",topic_name);
		lj_repost_form_.appendChild(topic_name_text_);

		var topic_content_text_ = document.createElement("input");
		topic_content_text_.setAttribute("type","hidden");
		topic_content_text_.setAttribute("name","event");
		topic_content_text_.setAttribute("value",topic_content);
		lj_repost_form_.appendChild(topic_content_text_);

		var topic_tags_text_ = document.createElement("input");
		topic_tags_text_.setAttribute("type","hidden");
		topic_tags_text_.setAttribute("name","prop_taglist");
		topic_tags_text_.setAttribute("value",topic_tags);
		lj_repost_form_.appendChild(topic_tags_text_);

		var autoformat_deny_ = document.createElement("input");
		autoformat_deny_.setAttribute("type","hidden");
		autoformat_deny_.setAttribute("name","event_format");
		autoformat_deny_.setAttribute("value","on");
		lj_repost_form_.appendChild(autoformat_deny_);

		var comment_setting_ = document.createElement("input");
		comment_setting_.setAttribute("type","hidden");
		comment_setting_.setAttribute("name","comment_settings");
		comment_setting_.setAttribute("value","nocomments");
		lj_repost_form_.appendChild(comment_setting_);

		var lj_button_ = document.createElement("input");
		lj_button_.setAttribute("type","submit");
		lj_button_.setAttribute("value","Перепостить в ЖЖ");
		lj_repost_form_.appendChild(lj_button_);

}

//alert(grab_and_repost_to_lj);
grab_and_repost_to_lj();
//alert("end");
