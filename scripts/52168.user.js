// ==UserScript==
// @name Habrahabr Grammar Gravity Parallel
// @include http://*habrahabr.ru/blogs/*
// @include http://*habrahabr.ru/blog/*
// @match http://*habrahabr.ru/blogs/*
// @match http://*habrahabr.ru/blog/*
// ==/UserScript==

var events =
{
	listen : function(source, ev, fn)
	{
		if (source.addEventListener)
		{
			source.addEventListener(ev, function(evt)
			{
				fn(evt);
				return false;
			}, false);
		}
		else if (source.attachEvent)
		{
			source.attachEvent("on" + ev, function(evt)
			{
				fn(evt);
				return false
			});
		}
	}
}

var xhr = 
{
	create : function()
	{
		var request = false;

		if (window.XMLHttpRequest)
		{
			//Gecko
			request = new XMLHttpRequest();
		}
		else if (window.ActiveXObject)
		{
			//Internet explorer
			request = new ActiveXObject("Microsoft.XMLHTTP");

			if (!request)
			{
				request = new ActiveXObject("Msxml2.XMLHTTP");
			}
		}

		if (!request)
		{
			alert("Error while creating XHR object");
		}

		return request;
	},

	send : function(r_path, r_args, r_handler)
	{
		var request = xhr.create();
		if (!request)
		{
			return;
		}
		request.onreadystatechange = function()
		{
			if (request.readyState == 4)
			{
				r_handler(request);
			}
		}

		request.open("post", r_path, true);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
		request.send(r_args);
	}
}

//Nazi namespace
var nazi = 
{
	info : {
		"article" : null,
		"author"  : null
	},

	initialize : function()
	{
		//Getting information that we need to send report
		nazi.get_article_info();

		//Injecting form
		nazi.inject_report_form();
	},

	/* Handlers */

	report_link_click : function()
	{
		document.getElementById("comment_write_user_info").className = "hidden";
		document.getElementById("comment_report_link").style.color = "#afa56a";
		document.getElementById("comment_write_link").style.color = "#aaa";
		document.getElementById("reply_form_0").style.display = "none";
		document.getElementById("report_form_container").style.display = "block";

		return false;
	},

	write_comment_link_click : function()
	{
		document.getElementById("comment_report_link").style.color = "#aaa";
		document.getElementById("comment_write_link").style.color = "#afa56a";
		document.getElementById("reply_form_0").style.display = "block";
		document.getElementById("report_form_container").style.display = "none";

		return false;
	},

	report_form_submit : function()
	{
		nazi.report(document.getElementById("report_form_container_title").value, 
					document.getElementById("report_form_container_textarea").value);

		return false;
	},

	/* Generic methods */

	inject_report_form : function()
	{
		//Getting root element by finding pivot element  
		var pivot = document.getElementById("html_tags_help").parentNode;
		//Setting pre-pivot element name
		pivot.previousSibling.previousSibling.id = "comment_write_user_info";
		//Getting back to pivot element
		pivot = pivot.parentNode.getElementsByTagName("h3").item(0);

		//Setting existing link element identificator to deal with it in future
		pivot.getElementsByTagName("a").item(0).id = "comment_write_link";
		events.listen(pivot.getElementsByTagName("a").item(0), "click", nazi.write_comment_link_click);

		//Setting pivot id
		pivot.id = "comment-form";

		//Creating new link, customizing it, and appending to pivot
		var report_link = document.createElement("a");
		//Overall styles
		report_link.innerHTML = "связаться с автором";
		report_link.style.marginLeft = "10px";
		report_link.style.color = "#aaa";
		report_link.style.borderBottomColor = "#aaa";
		report_link.href = "#comment-form";
		report_link.id = "comment_report_link";
		//Events! Here are!
		events.listen(report_link, "click", nazi.report_link_click);
		//Appending to pivot
		pivot.appendChild(report_link);

		//Creating report-form container
		var report_container = document.createElement("form");
		report_container.action = "javascript:void(0);";
		report_container.method = "post";
		report_container.style.marginTop = "20px";
		report_container.id = "report_form_container";
		report_container.style.display = "none";
		//Appending form submit listener
		events.listen(report_container, "submit", nazi.report_form_submit);
		//Appending it after all
		pivot.parentNode.insertBefore(report_container, pivot.nextSibling);

		//Creating description area
		var report_container_note = document.createElement("p");
		report_container_note.innerHTML = "Если вы обнаружили какие-либо ошибки в статье автора или просто желаете поговорить с ним, вы можете сообщить ему об этом напрямую, использовав форму ниже. Оформите свои замечания и предложения по статье, и автор обязательно увидит их. Не забудьте ввести заголовок вашего сообщения и его текст. Мир вам!";
		//Appending description
		report_container.appendChild(report_container_note);

		//Creating report-form title
		var report_container_title = document.createElement("input");
		report_container_title.type = "text";
		report_container_title.style.width = "95%";
		report_container_title.value = nazi.info.article;
		report_container_title.id = "report_form_container_title";

		//Creating report-form textarea
		var report_container_text = document.createElement("textarea");
		report_container_text.id = "report_form_container_textarea";
		report_container_text.setAttribute("rows", 10);
		report_container_text.setAttribute("cols", 50);
		//Appending textarea to form
		var report_container_fieldset = document.createElement("fieldset");
		report_container_fieldset.appendChild(report_container_title);
		report_container_fieldset.appendChild(report_container_text);
		report_container.appendChild(report_container_fieldset);

		//Creating submit button
		var report_container_submit = document.createElement("input");
		report_container_submit.id = "report_form_container_submit";
		report_container_submit.className = "post";
		report_container_submit.style.marginLeft = "0";
		report_container_submit.type = "submit";
		report_container_submit.value = "Отправить сообщение";
		report_container_fieldset.appendChild(report_container_submit);
	},

	get_article_info : function()
	{
		//Getting wrapper
		var wrapper = document.getElementById("main-content");

		//Getting article title
		nazi.info.article = wrapper.getElementsByTagName("h2").item(0).getElementsByTagName("a").item(1).innerHTML;

		//Getting article author
		var wrapper_author = document.getElementsByTagName("div");
		for (var i = wrapper_author.length - 1; i > 0; i--)
		{
			if (wrapper_author[i].className.match(/vcard/))
			{
				nazi.info.author = wrapper_author[i].getElementsByTagName("span").item(0).innerHTML;
				break;
			}
		}
	},

	report : function(title, content)
	{
		if (title == null || title == "")
		{
			alert("Заполните заголовок, пожалуйста, прошу вас!");
			return false
		}
	
		if (content == null || content == "")
		{
			alert("Заполните поле сообщения, пожалуйста, прошу вас!");
			return false;
		}

		var submit_button = document.getElementById("report_form_container_submit");
		submit_button.value = "Данные туда-сюда бегают...";
		submit_button.disabled = true;

		var request_string = "message[recipients]=" + nazi.info.author;
		request_string += "&message[title]=" + title.replace("&", "&amp;");
		request_string += "&message[text]=" + content.replace("&", "&amp;");

		xhr.send("/ajax/messages/add", request_string, function(response)
		{
			document.getElementById("report_form_container_textarea").value = "";
			submit_button.value = "Сообщение доставлено! Спасибо!";
			var _submit_button = submit_button;
			setTimeout(function()
			{
				_submit_button.value = "Отправить сообщение";
				_submit_button.disabled = false;
				document.getElementById("comment_report_link").style.color = "#aaa";
				document.getElementById("comment_write_link").style.color = "#afa56a";
				document.getElementById("reply_form_0").style.display = "block";
				document.getElementById("report_form_container").style.display = "none";
				document.getElementById("comment_write_user_info").className = "";
			}, 2500);

			return false;
		});

		return false;
	}
}

//Go, go, go!
nazi.initialize();