// ==UserScript==
// @name			NNM-Knopki
// @namespace		http://users.nnm.ru/beshh/
// @description		Adds some features to the interface of nnm.ru
// @author			Beshh
// @include			http://*.nnm.ru/*
// @include			http://nnm.ru/*
// ==/UserScript==

/////////////////////my_getValue/////////////////////
function my_getValue( cookieName, oDefault ) {
	var x;
	if(!document.cookie){
		return oDefault;
	}
	var cookieJar = document.cookie.split( "; " );
	for(x = 0; x < cookieJar.length; x++ ) {
		var oneCookie = cookieJar[x].split( "=" );
		if( oneCookie[0] === escape( cookieName ) ) {
			return unescape( oneCookie[1] );
		}
	}
	return oDefault;
}


/////////////////////my_check_rating/////////////////////
function my_check_rating() {
	return true;
}


/////////////////////my_add_formatting_buttons/////////////////////
function my_add_formatting_buttons() {
	if(need_to_check_rating) {
		if(!my_check_rating()){
			return;
		}
	}
	var scripts_text = ''+
	'function get_cursor(input) {'+
	'	var result = { start: 0, end: 0 };'+
	'	if (input.setSelectionRange) {'+
	'		result.start = input.selectionStart;'+
	'		result.end = input.selectionEnd;'+
	'	} else if (!document.selection) {'+
	'		return 0;'+
	'	} else if (document.selection && document.selection.createRange) {'+
	'		var range = document.selection.createRange();'+
	'		var stored_range = range.duplicate();'+
	'		stored_range.moveToElementText(input);'+
	'		stored_range.setEndPoint("EndToEnd", range);'+
	'		result.start = stored_range.text.length - range.text.length;'+
	'		result.end = result.start + range.text.length;'+
	'	}'+
	'	return result;'+
	'}'+
	''+
	'function set_cursor(txtarea, start, end) {'+
	'	if (txtarea.createTextRange) {'+
	'		var range = txtarea.createTextRange();'+
	'		range.move("character", start);'+
	'		range.select();'+
	'	} else if(txtarea.selectionStart) {'+
	'		txtarea.setSelectionRange(start, end);'+
	'	}'+
	'}'+
	''+
	'function close_tabs(comment_id) {'+
	'	$(".js_panel_button_div").hide();'+
	'	$(".js_panel_button_div").parent("li").attr("class", false);'+
	'	$("#comment_answer_ta_"+comment_id).attr("disabled", false);'+
	'	document.getElementById("comment_answer_ta_"+comment_id).focus();'+
	'	return false;'+
	'}'+
	'function open_tab(comment_id) {'+
	'	textarea_cursor = get_cursor(document.getElementById("comment_answer_ta_"+comment_id));'+
	'	$("#comment_answer_ta_"+comment_id).attr("disabled", true);'+
	'}'+
	'function select_text(input) {'+
	'	input = document.getElementById(input);'+
	'	if (input.createTextRange) {'+
	'		var oRange = input.createTextRange();'+
	'		oRange.moveStart("character", 0);'+
	'		oRange.moveEnd("character", 0);'+
	'		oRange.select();'+
	'	} else if (input.setSelectionRange) {'+
	'		input.setSelectionRange(0, input.value.length);'+
	'	}'+
	'	input.focus();'+
	'}'+
	'function img_set_text(comment_id) {'+
	'	switch_elements(document.getElementById("my_js_img_file"),document.getElementById("js_img_file"));'+
	'	document.getElementById("my_js_img_url").value = document.getElementById("js_img_url").value;'+
	'	$("#my_test_form").ajaxSubmit({'+
	'		url: "/ajax/image_upload/"+user_digest+"/",'+
	'		dataType: "json",'+
	'		type: "POST",'+
	'		beforeSubmit: function () {'+
	'			$("#js_img_spinner").show();'+
	'			$("#js_img_error").text("");'+
	'		},'+
	'		success: function(data) {'+
	'			switch_elements(document.getElementById("my_js_img_file"),document.getElementById("js_img_file"));'+
	'			if (data&&data.complete) {'+
	'				close_tabs(comment_id);'+
	'				insert_tag("[img]" + data.url + "[/img]\\n", comment_id);'+
	'				textarea_cursor = false;'+
	'			} else {'+
	'				$("#js_img_error").text("Не удалось загрузить изображение");'+
	'			}'+
	'			$("#js_img_spinner").hide();'+
	'		}'+
	'	});'+
	'	return false;'+
	'}'+
	''+
	'function switch_elements(a, b) {'+
	'	var aparent= a.parentNode;'+
	'	var asibling= a.nextSibling===b? a : a.nextSibling;'+
	'	b.parentNode.insertBefore(a, b);'+
	'	aparent.insertBefore(b, asibling);'+
	'}'+
	''+
	'function insert_tag(tag, comment_id) {'+
	'	var txtarea = document.getElementById("comment_answer_ta_"+comment_id);'+
	'	txtarea.focus();'+
	'	var scrtop = txtarea.scrollTop;'+
	'	var cursorPos = get_cursor(txtarea);'+
	'	if(tag==="img"){'+
	'		if(document.getElementById("js_img_div").getAttribute("style").indexOf("display: none")==-1){'+
	'			close_tabs(comment_id);'+
	'			return false;'+
	'		}'+
	'		open_tab(comment_id);'+
	'		$("#js_img_div").show();'+
	'		$("#js_img_spinner").hide();'+
	'		$("#js_img_error").text("");'+
	'		$("#js_img_url").val("http://");'+
	'		$("#js_img_file").replaceWith("<input type=\'file\' id=\'js_img_file\' name=\'img_file\'/>");'+
	'		$("#js_img_file").val("");'+
	'		select_text("js_img_url");'+
	'		return false;'+
	'	}'+
	'	else if(tag[0]==="["){'+
	'		var nuCursorPos=cursorPos.start+tag.length+2;'+
	'		txtarea.value = txtarea.value.substring(0,cursorPos.start)+tag+txtarea.value.substr(cursorPos.start);'+
	'		set_cursor(txtarea,nuCursorPos,nuCursorPos);'+
	'		return false;'+
	'	}'+
	'	if(document.getElementById("js_img_div").getAttribute("style").indexOf("display: none;")==-1){'+
	'		close_tabs(comment_id);'+
	'	}'+
	'	if (cursorPos.start==cursorPos.end) {'+
	'		var nuCursorPos=cursorPos.start+tag.length+2;'+
	'		txtarea.value = txtarea.value.substring(0,cursorPos.start)+"["+tag+"][/"+tag+"]"+txtarea.value.substr(cursorPos.start);'+
	'		set_cursor(txtarea,nuCursorPos,nuCursorPos);'+
	'	} else {'+
	'		var txt_pre=txtarea.value.substring (0,cursorPos.start);'+
	'		var txt_sel=txtarea.value.substring(cursorPos.start,cursorPos.end);'+
	'		var txt_aft=txtarea.value.substring(cursorPos.end);'+
	'		txtarea.value = txt_pre+"["+tag+"]"+txt_sel+"[/"+tag+"]"+txt_aft;'+
	'		var nuCursorPos=String(txt_pre+"["+tag+"]"+txt_sel+"[/"+tag+"]").length;'+
	'		set_cursor(txtarea,nuCursorPos,nuCursorPos);'+
	'	}'+
	'	if (scrtop) {'+
	'		 txtarea.scrollTop=scrtop;'+
	'	}'+
	'}'+
	''+
	'function insert_smiley(img_src, comment_id) {'+
	'	var txtarea = document.getElementById("comment_answer_ta_"+comment_id);'+
	'	txtarea.focus();'+
	'	var scrtop = txtarea.scrollTop;'+
	'	var cursorPos = get_cursor(txtarea);'+
	'	var nuCursorPos=cursorPos.end+img_src.length+11;'+
	'	txtarea.value = txtarea.value.substring(0,cursorPos.end)+"[img]"+img_src+"[/img]"+txtarea.value.substr(cursorPos.end);'+
	'	set_cursor(txtarea,nuCursorPos,nuCursorPos);'+
	'	if (scrtop) {'+
	'		 txtarea.scrollTop=scrtop;'+
	'	}'+
	'}'+
	''+
	'function remove_buttons() {'+
	'	remove_last_preview();'+
	'	var fbuttons = document.getElementById("fbuttons");'+
	'	if (fbuttons) {'+
	'		fbuttons.parentNode.removeChild(fbuttons);'+
	'	}'+
	'	var s_buttons = document.getElementById("smiley_buttons");'+
	'	if (s_buttons) {'+
	'		s_buttons.parentNode.removeChild(s_buttons);'+
	'	}'+
	'}'+
	''+
	'function create_one_button(tag,text,href,img_src,comment_id) {'+
	'	var eAnchor = document.createElement("a");'+
	'	eAnchor.setAttribute("href",href);'+
	'	eAnchor.onclick = function() { insert_tag(tag, comment_id) };'+
	'	var eImg = document.createElement("img");'+
	'	eImg.setAttribute("title",text);'+
	'	eImg.setAttribute("src",img_src);'+
	'	eImg.setAttribute("width",30);'+
	'	eImg.setAttribute("height",22);'+
	'	eImg.setAttribute("alt",text);'+
	'	eAnchor.appendChild(eImg);'+
	'	return eAnchor;'+
	'}'+
	''+
	'function create_smiley_button(img_src,comment_id) {'+
	'	var eAnchor = document.createElement("a");'+
	'	eAnchor.setAttribute("href","#bold");'+
	'	eAnchor.onclick = function() { insert_smiley(img_src, comment_id) };'+
	'	var eImg = document.createElement("img");'+
	'	eImg.setAttribute("src",img_src);'+
	'	eAnchor.appendChild(eImg);'+
	'	return eAnchor;'+
	'}'+
	''+
	'function add_smieley_buttons(comment_id) {'+
	'	var eDiv = document.getElementById("fbuttons");'+
	'	if (eDiv) {'+
	'		var s_buttons = document.getElementById("smiley_buttons");'+
	'		if (s_buttons) {'+
	'			s_buttons.parentNode.removeChild(s_buttons);'+
	'			return;'+
	'		}'+
	'		s_buttons = document.createElement("div");'+
	'		s_buttons.setAttribute("id", "smiley_buttons");'+
	'		s_buttons.setAttribute("style","position: relative; top:-5px;");'+
	'		eDiv.parentNode.insertBefore(s_buttons,eDiv);'+
//	'		eDiv.insertBefore(s_buttons,eDiv.firstChild);'+

//######## СМАЙЛЫ ДОБАВЛЯТЬ СЮДА ##################

	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/d/e/4/0/6/e341f34dd0244c2bcbd43164a5c.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/6/2/f/c/b/24f49baf65fe40511a7592daf10.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/7/9/e/4/f/7fc9efaa3600d38e0e066c87772.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/3/5/2/1/0/1a089e7a35ec8ac1ca5bbe4abf3.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/4/9/6/1/f/2325d3facf22e95b4ef6bb04995.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/9/1/2/2/c/d429a4f6e693d0a69c96cc57b10.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/7/9/2/f/4/fd480a65141000fdd8637c31a4e.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/7/d/c/4/b/34c3b02435f499c9c184f28f7b9.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/3/6/4/c/f/74a23320decc11af1bd57b0b904.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/2/0/0/d/d/9fbecc67d31e2fc2063846e2127.gif",comment_id));'+
	'		s_buttons.appendChild(document.createElement("br"));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/c/b/b/6/a/a7137276f52b437d3e254712e56.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/b/b/1/0/d/969ce7a8c5975f01ee49cb4d3c4.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/e/b/a/8/4/c190735c7db4f20f3bf5e1c42d8.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/5/0/7/2/9/8c254d938b3a13660160e09a154.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/d/7/4/1/0/d93d2f7b542e0b8b7431ad4ee4f.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/5/0/1/8/9/e48eedfa9fb6780afb90d8ff72c.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/d/5/3/4/b/a1488659df2517461174cfced2f.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/b/4/3/f/a/6d6ab0257a517f0f78fde546cc9.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/5/8/3/2/e/71b29a655f63bc1e930557583c5.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/8/d/f/b/f/d85c799eaee6d3558f6732f5ee5.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/3/c/1/c/0/c2dbcac0710a2bcceed81c15b36.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/1/0/d/3/4/99a861c602eba53667a331376a9.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/4/d/f/b/c/17c91e89a36340341913973f10a.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/0/e/f/d/e/f2153c1c1a3ffdff50be24595ff.gif",comment_id));'+
	'		s_buttons.appendChild(document.createElement("br"));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/6/0/3/3/1/4dbd89ee3d490c0dfe4786111f0.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/6/7/0/d/8/e594bd352680d58c47b5d3e8e6d.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/f/9/e/f/1/948459292cd038886ebc1566010.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/0/a/4/9/3/856e0d8352c3f6f0642a7e438fd.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/8/1/f/0/f/506655f2dba90154fbf1a4303b5.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/b/2/e/f/b/da7f8bc635722867c42c762de08.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/3/d/6/2/7/590642c9053b83d7a9c7bd8fcdf.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/4/e/e/a/5/48f31c765983d43607f083f85f4.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/8/d/8/c/0/1a46b8d3b47ff79451598ab51a8.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/0/a/7/8/2/d50bff8ba9884453ade05ccd517.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/a/3/0/b/5/65313f30a27dfe96200ab841a8f.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/c/c/7/2/d/ef4d1956753584b9b471e28b673.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/f/b/4/c/f/6a9cca5bef4000c95aa5db6bed9.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/e/2/a/a/e/032f3022bd640f19a877575fef6.gif",comment_id));'+
	'		s_buttons.appendChild(document.createElement("br"));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/7/b/c/d/a/1ef7039d8aebaddcef17e4971b2.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/f/d/9/4/4/578cb4d52a905d6016cffd04932.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img11.nnm.ru/3/f/6/3/4/13df4d83dced7f48ba3d93a68b2.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/9/1/1/5/5/cfc1291a6c2aa38b627fcdcbf6e.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/5/9/4/f/2/75a1aa5a994b173ada43efa3d0f.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/a/b/7/3/5/8826d086057eb8e1190f9777965.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/4/6/9/e/6/e3c3770b91f2456874d208c84b9.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/4/0/8/e/e/1377b5509649e9f605573720295.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img15.nnm.ru/9/4/a/2/4/43a27934bbd57d29b93b18fd580.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/e/a/d/2/9/9fcde549b52014b72ca74098b0d.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/7/6/5/e/1/6318ab75f8996787ebe6bc69e8e.gif",comment_id));'+
	'		s_buttons.appendChild(create_smiley_button("http://img12.nnm.ru/7/4/5/6/5/21c02d546a790f37dae18e2c10c.gif",comment_id));'+
	'		s_buttons.appendChild(document.createElement("br"));'+
	'	}'+
	'}'+
	''+
	'function remove_last_preview() {'+
	'	var div15 = document.getElementById("lastPreviewComment");'+
	'	if (div15) {'+
	'		div15.parentNode.removeChild(div15);'+
	'	}'+
	'}'+
	''+
	'function send_preview(comment_id) {'+
	'	var div12 = document.getElementById("comment_answer_ta_"+comment_id);'+
	'	var savedText = div12.value;'+
	'	if (div12 && div12.previousSibling.previousSibling.getAttribute("name")=="news_id") {'+
	'		div12.previousSibling.previousSibling.setAttribute("value","1805934");'+
	'		if (div12.previousSibling.previousSibling.previousSibling.previousSibling.getAttribute("name")=="parent_id") {'+
	'			div12.previousSibling.previousSibling.previousSibling.previousSibling.setAttribute("value","0");'+
	'			if(div12.value != ""){'+
	'				div12.value = div12.value+"　";'+
	'			}'+
	'			$("#comment_answer_sm_" + comment_id).attr("disabled", true);'+
	'			$("#preview_btn_" + comment_id).attr("disabled", true);'+
	'			$("#form_spinner_" + comment_id).show();'+
	'			$("#comment_answer_" + comment_id).ajaxSubmit({'+
	'				success: function(data) {'+
	'					$("#comment_answer_sm_" + comment_id).attr("disabled", false);'+
	'					$("#preview_btn_" + comment_id).attr("disabled", false);'+
	'					$("#form_spinner_" + comment_id).hide();'+
	'					if(!data || data==""){'+
	'						div12.value = savedText;'+
	'						return false;'+
	'					}'+
	
	'					if (active_container_id != 0) {'+
	'						data = "<ul>" + data + "</ul>";'+
	'					}'+
	'					if (comments_empty) {'+
	'						$("#js_new_comments_" + comment_id).html(data);'+
	'					} else {'+
	'						$("#js_new_comments_" + comment_id).html($("#js_new_comments_" + comment_id).html() + data);'+
	'					}'+
	'					$("#reply_form_" + comment_id).html("");'+
	'					$("#reply_link_" + comment_id).show();'+
	'					show_comment_form_al(comment_id);'+
	'					var div13 = document.getElementById("js_new_comments_"+comment_id).lastChild;'+
	'					if (div13) {'+
	'						div13.setAttribute("style","border: 3px solid #FF0000; margin: 10px 10px;");'+
	'						div13.setAttribute("id","lastPreviewComment");'+
	'					}'+
	'					document.getElementById("comment_answer_ta_"+comment_id).value = savedText;'+
	'				}'+
	'			});'+
	'			return false;'+
	'			'+
	'		}'+
	'	}'+
	'	return false;'+
	'}'+
	''+
	'function add_preview(comment_id) {'+
	'	var reply_btn = document.getElementById("comment_answer_sm_"+comment_id);'+
	'	if (reply_btn) {'+
	'		var new_div1 = document.createElement("div");'+
	'		new_div1.setAttribute("class","system-btn");'+
	'		var new_input1 = document.createElement("input");'+
	'		new_input1.setAttribute("id","preview_btn_"+comment_id);'+
	'		new_input1.setAttribute("class","btn");'+
	'		new_input1.setAttribute("type","submit");'+
	'		new_input1.setAttribute("value","Предпросмотр");'+
	'		new_input1.setAttribute("onclick","return send_preview("+comment_id+");");'+
	'		new_div1.appendChild(new_input1);'+
	'		reply_btn.parentNode.setAttribute("style","margin-right: 10px;");'+
	'		reply_btn.parentNode.parentNode.insertBefore(new_div1,reply_btn.parentNode.nextSibling);'+
	'	}'+
	'}'+
	''+
	'function add_buttons(comment_id) {'+
	'	remove_buttons();'+
	'	var reply_form = document.getElementById("reply_form_"+comment_id);'+
	'	if (reply_form) {'+
	'		var buttons = document.createElement("div");'+
	'		buttons.setAttribute("id", "fbuttons");'+
	'		if(comment_id===0){'+
	'			buttons.setAttribute("style","position: relative; top:0px; height: 22px;");'+
	'		}'+
	'		else{'+
	'			buttons.setAttribute("style","position: relative; top:5px; height: 22px;");'+
	'		}'+
	'		buttons.appendChild(create_one_button("b","Выделить текст жирным","#bold","http://img15.nnm.ru/5/3/3/f/9/6ca4ea19d21c37ff4687634d5e5.png",comment_id));'+
	'		buttons.appendChild(create_one_button("i","Выделить текст курсивом","#italic","http://img12.nnm.ru/7/2/f/3/3/6a951c3a4a08e7270e9b5285153.png",comment_id));'+
	'		buttons.appendChild(create_one_button("u","Подчеркнуть текст","#underline","http://img15.nnm.ru/6/e/9/c/3/ead6208b82140e368dea0eac537.png",comment_id));'+
	'		buttons.appendChild(create_one_button("s","Зачеркнуть текст","#strike","http://img11.nnm.ru/a/2/6/f/f/d0483f40c948f344e00d97856c0.png",comment_id));'+
	'		buttons.appendChild(create_one_button("blockquote","Цитата","#blockquote","http://img11.nnm.ru/a/c/2/a/5/7b19a9e4e18a8e5934aae1c8126.png",comment_id));'+
	'		buttons.appendChild(create_one_button("code","Код","#code","http://img15.nnm.ru/5/c/5/2/4/ed97d70f46b3a59bcf6f47693ce.png",comment_id));'+
	'		buttons.appendChild(create_one_button("url","вставить ссылку","#link","http://img11.nnm.ru/4/9/0/d/7/c9500bd07dc37ad560c91235506.png",comment_id));'+
	'		buttons.appendChild(create_one_button("user","юзер","#usr","http://img12.nnm.ru/2/7/d/d/c/ed453dc898514303a0fe740d6ea.png",comment_id));'+
	'		buttons.appendChild(create_one_button("img","Вставить изображение","#img","http://img15.nnm.ru/3/a/d/7/2/b3559ecfab8458316c1763cd547.png",comment_id));'+
	'		buttons.appendChild(create_one_button("video","Вставить видео","#video","http://img12.nnm.ru/3/f/2/3/0/8b41b267ef4ceb75ef7d9d9f259.png",comment_id));'+
	'		var eAnchorSmiley = document.createElement("a");'+
	'		eAnchorSmiley.setAttribute("id","Smiley_Anchor");'+
	'		eAnchorSmiley.setAttribute("href","#bold");'+
	'		eAnchorSmiley.setAttribute("onclick", "add_smieley_buttons("+comment_id+")");'+
	'		var eImg = document.createElement("img");'+
	'		eImg.setAttribute("title","показать набор смайликов");'+
	'		eImg.setAttribute("src","http://img12.nnm.ru/2/0/6/5/f/2d3c2a07106ea10e9a77b2b7c3c.png");'+
	'		eImg.setAttribute("width",30);'+
	'		eImg.setAttribute("height",22);'+
	'		eImg.setAttribute("alt","смайлики");'+
	'		eAnchorSmiley.appendChild(eImg);'+
	'		buttons.appendChild(eAnchorSmiley);'+
	'		reply_form.parentNode.insertBefore(buttons, reply_form);'+
	'		my_upload_img(comment_id);'+
	'	}'+
	'}'+
	''+
	'function send_comment_form_al(comment_id) {'+
	'	var ret = send_comment_form(comment_id);'+
	'	remove_buttons();'+
	'	return ret;'+
	'}'+
	''+
	'function show_comment_form_al(comment_id) {'+
	'	if (active_container_id !== false) {'+
	'		$(\'#reply_link_\' + active_container_id).show();'+
	'		$(\'#reply_form_\' + active_container_id).html(\'\');'+
	'	}'+
	'	active_container_id = comment_id;'+
	'	$(\'#reply_link_\' + comment_id).hide();'+
	'	$(\'#reply_form_\' + comment_id).html(\'\');'+
	'	$(\'#reply_form_\' + comment_id).append('+
	'		\'<form class="comment_answer_textarea" id="comment_answer_\' + comment_id + \'" action="/ajax/add_comment/" method="post" accept-charset="utf-8" onsubmit="return send_comment_form_al(\' + comment_id + \');">\''+
	'			+ \'<fieldset>\''+
	'			+ \'<input type="hidden" name="parent_id" value="\' + comment_id + \'">\''+
	'			+ \'<input type="hidden" name="ps" value="\' + user_digest + \'">\''+
	'			+ \'<input type="hidden" name="news_id" value="\' + news_id + \'">\''+
	'			+ \'<legend>Добавить комментарий</legend>\''+
	'			+ \'<textarea class="i-textarea" rows="5" cols="10" name="text" id="comment_answer_ta_\' + comment_id + \'"></textarea>\''+
	'			+ \'</fieldset>\''+
	'			+ \'<div class="clearfix"><div class="system-btn"><input type="submit" class="btn" id="comment_answer_sm_\' + comment_id + \'" onclick="return send_comment_form_al(\' + comment_id + \');" value="Добавить комментарий [Ctrl+Enter]" /></div><img src="http://nnm.ru/i/spinner.gif" class="hide" id="form_spinner_\' + comment_id + \'" alt="Подождите..."></div>\''+
	'		+ \'</form>\''+
	'	);'+
	'	$(\'#comment_answer_ta_\' + comment_id).focus();'+
	'	$(\'#comment_answer_ta_\' + comment_id).bind(\'keydown\', \'Ctrl+return\', function(){ send_comment_form_al(comment_id); });'+
	'	add_buttons(comment_id);'+
	'	if(need_preview_button) add_preview(comment_id);'+
	'	return false;'+
	'}'+
	'function my_upload_img(comment_id){'+
	'	var div1 = document.createElement("div");'+
	'	div1.setAttribute("id","js_img_div");'+
	'	div1.setAttribute("class","upload-img js_panel_button_div");'+
	'	div1.setAttribute("style","display: none; background-position: -153px 0; float: none;margin: 0;position: absolute;left: 0;top: 22;width: 330px;z-index: 0;");'+
	'	var div2 = document.createElement("div");'+
	'	div2.setAttribute("class","upload-inner");'+
	'	div2.setAttribute("style","background: none repeat scroll 0 0 #D4DBE5; border-bottom: 1px solid #949EA1; border-left: 1px solid #949EA1; border-right: 1px solid #949EA1; display: block; padding: 10px;");'+
	'	div1.appendChild(div2);'+
	'	var fieldset = document.createElement("fieldset");'+
//	'	fieldset.setAttribute("style"," margin: 0 0 30px;");'+
	'	div2.appendChild(fieldset);'+
	'	var legend = document.createElement("legend");'+
	'	legend.appendChild(document.createTextNode("Загрузка изображений"));'+
	'	legend.setAttribute("style","display: block; font-size: 18px; font-weight: bold; padding: 0 0 10px; font-size: 1em; padding: 0 0 5px;");'+
	'	fieldset.appendChild(legend);'+
	'	var p = document.createElement("p");'+
	'	p.setAttribute("id","js_img_error");'+
	'	p.setAttribute("class","errorMessage a-left");'+
	'	fieldset.appendChild(p);'+
	'	var ol = document.createElement("ol");'+
	'	ol.setAttribute("style","margin: 0 0 5px; padding: 0;");'+
	'	fieldset.appendChild(ol);'+
	'	var li1 = document.createElement("li");'+
	'	li1.setAttribute("style","background: none repeat scroll 0 0 transparent; float: none; height: auto; width: auto; list-style: none;");'+
	'	ol.appendChild(li1);'+
	'	var label1 = document.createElement("label");'+
	'	label1.appendChild(document.createTextNode("Загрузить картинку:"));'+
	'	label1.setAttribute("style","padding: 4px 0;");'+
	'	li1.appendChild(label1);'+
	'	var input1 = document.createElement("input");'+
	'	input1.setAttribute("type","file");'+
	'	input1.setAttribute("id","js_img_file");'+
	'	input1.setAttribute("name","img_file");'+
	'	li1.appendChild(input1);'+
	'	var li2 = document.createElement("li");'+
	'	li2.setAttribute("style","background: none repeat scroll 0 0 transparent; float: none; height: auto; width: auto; list-style: none;");'+
	'	ol.appendChild(li2);'+
	'	var label2 = document.createElement("label");'+
	'	label2.setAttribute("style","padding: 4px 0;");'+
	'	label2.appendChild(document.createTextNode("Или скопировать:"));'+
	'	li2.appendChild(label2);'+
	'	var input2 = document.createElement("input");'+
	'	input2.setAttribute("type","text");'+
	'	input2.setAttribute("autocomplete","off");'+
	'	input2.setAttribute("value","http://");'+
	'	input2.setAttribute("id","js_img_url");'+
	'	input2.setAttribute("name","img_url");'+
	'	input2.setAttribute("class","i-text");'+
	'	input2.setAttribute("style","width: 98%;");'+
	'	li2.appendChild(input2);'+
	'	var div3 = document.createElement("div");'+
	'	div3.setAttribute("class","btn-set");'+
	'	fieldset.appendChild(div3);'+
	'	var div4 = document.createElement("div");'+
	'	div4.setAttribute("class","system-btn");'+
	'	div4.setAttribute("style","margin-right: 10px;");'+
	'	div3.appendChild(div4);'+
	'	var input3 = document.createElement("input");'+
	'	input3.setAttribute("type","submit");'+
	'	input3.setAttribute("value","Загрузить");'+
	'	input3.setAttribute("name","upload_img");'+
	'	input3.setAttribute("id","js_img_set");'+
	'	input3.setAttribute("onclick","return img_set_text("+comment_id+");");'+
	'	input3.setAttribute("class","btn");'+
	'	div4.appendChild(input3);'+
	'	var div5 = document.createElement("div");'+
	'	div5.setAttribute("class","system-btn");'+
	'	div5.setAttribute("style","margin-right: 10px ! important;");'+
	'	div3.appendChild(div5);'+
	'	var input4 = document.createElement("input");'+
	'	input4.setAttribute("type","submit");'+
	'	input4.setAttribute("value","Отменить");'+
	'	input4.setAttribute("class","btn js_panel_button_cancel");'+
	'	input4.setAttribute("onclick","return close_tabs("+comment_id+");");'+
	'	div5.appendChild(input4);'+
	'	var div6 = document.createElement("div");'+
	'	div6.setAttribute("style","display: none;");'+
	'	div6.setAttribute("id","js_img_spinner");'+
	'	div6.setAttribute("class","loading");'+
	'	div3.appendChild(div6);'+
	'	var img = document.createElement("img");'+
	'	img.setAttribute("alt","Загрузка");'+
	'	img.setAttribute("src","/i/spinner.gif");'+
	'	img.appendChild(document.createTextNode(" Загрузка"));'+
	'	div6.appendChild(img);'+
	'	document.getElementById("fbuttons").appendChild(div1);'+
	'}'+
	''+
	'add_buttons(0);'+
	'if(need_preview_button)add_preview(0);';
	
	if (document.getElementById("comment_answer_sm_0")) {
		var i;
		for (i = 0; i < document.links.length; ++i){
			if(document.links[i].getAttribute("class")==="comment_reply"){
				var regex = new RegExp("return show_comment_form","");
				document.links[i].setAttribute("onclick",document.links[i].getAttribute("onclick").replace(regex,"return show_comment_form_al"));
			}
		}
		document.getElementById("comment_answer_sm_0").setAttribute("onclick","return send_comment_form_al(0);");
		var scripts = document.createElement('script');
		scripts.type = 'text/javascript';
		if(need_to_check_rating) { scripts_text="var need_to_check_rating = true;\n"+scripts_text; }
		else { scripts_text="var need_to_check_rating = false;\n"+scripts_text; }
		scripts.appendChild(document.createTextNode(scripts_text));
		document.getElementsByTagName("head")[0].appendChild(scripts);
		var repF = document.getElementById("fbuttons");
		if(repF){
			repF.parentNode.insertBefore(document.createElement("br"), repF);
			repF.parentNode.insertBefore(document.createElement("br"), repF);
		}
	}
}

function my_add_scrolling_menu(){
	secondmenu = document.getElementById("sidebar").childNodes[3].cloneNode(true);
	secondmenu.setAttribute("id", "secondmenu");
	document.getElementById("sidebar").appendChild(secondmenu);
	script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.appendChild(document.createTextNode(''+
		'var el=document.getElementById("secondmenu"); var menuwidth=(el.offsetWidth)-40 ;var oldy=0,oldy_r=0,rot_start=0; function ScrollOn() { var obj1=el; if(rot_start == 0) { var obj= el; for(oy=0; obj; obj=obj.offsetParent) oy+=obj.offsetTop; rot_start= oy; } top_=parseInt(document.body.scrollTop)>0?parseInt(document.body.scrollTop):document.documentElement.scrollTop; left_= parseInt(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft); if(left_>0) { obj1.style.position = "relative"; } else if (oldy!=top_) { var ox,oy; var obj1h=obj1.offsetHeight; if( obj1) { if((top_-15) < rot_start) { obj1.style.position = "relative"; } else { obj1.style.position = "fixed"; el.style.width=menuwidth+"px"; obj1.style.top="15px"; if (top_-15 >= (document.body.scrollHeight-obj1h-scrollbanwidth)) obj1.style.position = "relative"; } oldy=top_; }  } } var scrollbanwidth=30; window.onscroll=ScrollOn;'
	));
	document.getElementsByTagName("head")[0].appendChild(script);
}

/////////////////////my_add_character_counter/////////////////////
function my_add_character_counter(){
	if(location.href==="http://nnm.ru/write/"||location.href.indexOf("http://nnm.ru/edit/")===0){
		var script_text = ''+
		'function count_characters(element) {'+
		'	var htmlarea = document.getElementById("htmlarea");'+
		'	if (htmlarea) {'+
		'	var character_counter = document.getElementById("character_counter");'+
		'		if (character_counter) {'+
		'			character_counter.removeChild(character_counter.firstChild);'+
		'			character_counter.appendChild(document.createTextNode(element.value.length));'+
		'		}'+
		'	}'+
		'}';
		var htmlarea;
		htmlarea = document.getElementById('htmlarea');
		if (htmlarea) {
			var newScript = document.createElement('script');
			newScript.type = 'text/javascript';
			newScript.appendChild(document.createTextNode(script_text));
			document.getElementsByTagName("head")[0].appendChild(newScript);
			var new_htmlarea = document.createElement("textarea");
			new_htmlarea.setAttribute("name","content");
			new_htmlarea.setAttribute("cols","8");
			new_htmlarea.setAttribute("rows","40");
			new_htmlarea.setAttribute("class","i-textarea");
			new_htmlarea.setAttribute("onchange","count_characters(this)");
			new_htmlarea.setAttribute("onkeyup","count_characters(this)");
			new_htmlarea.appendChild(document.createTextNode(htmlarea.value));
			htmlarea.parentNode.replaceChild(new_htmlarea,htmlarea);
			new_htmlarea.setAttribute("id","htmlarea");
			var eDiv = document.createElement("div");
			eDiv.appendChild(document.createTextNode("Количество символов: "));
			var character_counter=document.createElement("b");
			character_counter.setAttribute("id", "character_counter");
			character_counter.appendChild(document.createTextNode(htmlarea.value.length));
			eDiv.appendChild(character_counter);
			new_htmlarea.parentNode.insertBefore(eDiv, new_htmlarea.nextSibling);
		}
	}
}

/////////////////////my_move_mod_buttons/////////////////////
function my_move_mod_buttons(){
	var i, allImgs,thisImg;
	allImgs = document.evaluate('//img[@src]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	for (i=0;i<allImgs.snapshotLength;i+=1) {
		thisImg = allImgs.snapshotItem(i);
		if(thisImg.src==="http://nnm.ru/i/i-cross-fill-red.gif"&&thisImg.attributes[1].value==="Удалить комментарий"){
			var eDelComment=thisImg.parentNode.parentNode;
			var eBan = eDelComment.nextSibling.nextSibling;
			var eParent = eDelComment.parentNode;
			var opa = eParent.parentNode.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nextSibling;
			if(opa&&opa.getAttribute("class")==="head"){
				eParent.removeChild(eDelComment);
				if(eBan){
					eParent.removeChild(eBan);
				}
				eParent.parentNode.parentNode.parentNode.removeChild(eParent.parentNode.parentNode);
				opa.appendChild(eDelComment,opa);
				if(eBan){
					opa.appendChild(eBan,opa);
				}
			}
		}
	} 
} 


/////////////////////my_change_links_target/////////////////////
function my_change_links_target(){
	var i;
	for (i = 0; document.links[i]; i++){
		if (document.links[i].target === '_blank'){
			document.links[i].target = '_self';
		}
	}
}


/////////////////////my_change_preview_targets/////////////////////
function my_change_preview_targets(){
	var i;
	for (i = 0; document.links[i]; i++){
		if (document.links[i].getAttribute("title") === 'оригинальный размер'){
			document.links[i].removeAttribute("title");
			document.links[i].setAttribute('onclick',' if(this.childNodes.length===1){'+
'this.insertBefore(document.createElement("img"),this.firstChild);'+
'this.firstChild.setAttribute("src",this.getAttribute("href"));'+
'this.firstChild.setAttribute("style","position: absolute");'+
'this.setAttribute("href",this.childNodes[1].getAttribute("src"));'+
'this.childNodes[1].setAttribute("src",this.firstChild.getAttribute("src"));'+
'}else{'+
'this.childNodes[1].setAttribute("src",this.getAttribute("href"));'+
'var src = this.firstChild.getAttribute("src");'+
'this.removeChild(this.firstChild);'+
'this.setAttribute("href",src)'+
'}return false;');
		}
	}
}

/////////////////////my_add_menu/////////////////////
function my_add_menu(){
	var script_text = ''+
	'function my_show_menu() {'+
	'	var my_menu = document.getElementById("my_menu");'+
	'	if (my_menu) {'+
	'		var i;'+
	'		for(i=my_menu.childNodes.length-1;i>=0;i--){'+
	'			if(my_menu.childNodes[i]){'+
	'				my_menu.removeChild(my_menu.childNodes[i]);'+
	'			}'+
	'		}'+
	'		var ueberschrift = document.createElement("h3");'+
	'		var link = document.createElement("a");'+
	'		link.setAttribute("href", "#bold");'+
	'		link.setAttribute("onclick", "return my_hide_menu();");'+
	'		link.appendChild(document.createTextNode("Настройки скрипта"));'+
	'		ueberschrift.appendChild(link);'+
	'		my_menu.appendChild(ueberschrift);'+
	'		my_add_option(my_menu,"need_to_add_formatting_buttons",need_to_add_formatting_buttons,"Кнопки форматирования","Добавить кнопки форматирования и смайликов в окно написания комментариев");'+
	'		my_add_option(my_menu,"need_to_add_scrolling_menu",need_to_add_scrolling_menu,"Плавающая личка","Добваить плавающую панель лички");'+
	'		my_add_option(my_menu,"need_to_add_character_counter",need_to_add_character_counter,"Счётчик символов","Добавить счётчик символов в окно создания новости");'+
	'		my_add_option(my_menu,"need_to_change_links_target",need_to_change_links_target,"Откр. ссылки в том же табе","Открывать ссылки по умолчанию с том же табе");'+
	'		my_add_option(my_menu,"need_to_change_img_target",need_to_change_img_target,"Увеличивать изобр. по клику","Показывать оригинальный размер изображений по клику мышки");'+
	'		my_add_option(my_menu,"need_to_move_mod_buttons",need_to_move_mod_buttons,"Переместить мод. кнопки","Переместить модераторские кнопки в заголовок комментария");'+
	'		my_add_option(my_menu,"need_preview_button",need_preview_button,"кнопка Предпросмотр","Добавить кнопку предпросмотра комментария");'+
	'		my_add_option(my_menu,"need_to_make_widescreen",need_to_make_widescreen,"Широкий экран","Подогнать размер страницы под широкий экран");'+
	'		my_add_option(my_menu,"need_to_remove_unnecessary_elements",need_to_remove_unnecessary_elements,"Убрать всякую хрень","Напр. \\"Облако тегов\\", \\"Топ-10 недели\\" итд.");'+
	'		my_add_option(my_menu,"need_to_remove_ads",need_to_remove_ads,"Убрать рекламу","Эта опция никоим образом не заменяет полноценные резаки рекламы, а лишь дополняет их");'+
	'		my_menu.appendChild(document.createElement("br"));'+
	'		var input = document.createElement("input");'+
	'		input.setAttribute("type","button");'+
	'		input.setAttribute("value","Сохранить");'+
	'		input.setAttribute("onclick","return my_save_options()");'+
	'		my_menu.appendChild(input);'+
	'		my_menu.appendChild(document.createElement("br"));'+
	'		my_menu.appendChild(document.createElement("br"));'+
	'	}'+
	'}'+
	'function my_hide_menu() {'+
	'	var my_menu = document.getElementById("my_menu");'+
	'	if (my_menu) {'+
	'		var i;'+
	'		for(i=my_menu.childNodes.length-1;i>=0;i--){'+
	'			if(my_menu.childNodes[i]){'+
	'				my_menu.removeChild(my_menu.childNodes[i]);'+
	'			}'+
	'		}'+
	'		var h3 = document.createElement("h3");'+
	'		var link = document.createElement("a");'+
	'		link.setAttribute("href", "#bold");'+
	'		link.setAttribute("onclick", "return my_show_menu();");'+
	'		link.appendChild(document.createTextNode("Настройки скрипта"));'+
	'		h3.appendChild(link);'+
	'		my_menu.appendChild(h3);'+
	'		my_menu.appendChild(document.createElement("br"));'+
	'	}'+
	'}'+
	'function my_add_option(my_menu,id,value,text,explanation){'+
	'	var label = document.createElement("label");'+
	'	label.setAttribute("for",id);'+
	'	var input = document.createElement("input");'+
	'	input.setAttribute("type","checkbox");'+
	'	input.setAttribute("id",id);'+
	'	if(value){'+
	'		input.setAttribute("checked","checked");'+
	'	}'+
	'	label.appendChild(input);'+
	'	label.appendChild(document.createTextNode(text));'+
	'	label.setAttribute("title",explanation);'+
	'	my_menu.appendChild(label);'+
	'	my_menu.appendChild(document.createElement("br"));'+
	'}'+
	'function my_save_options() {'+
	'	need_to_add_formatting_buttons=document.getElementById("need_to_add_formatting_buttons").checked;'+
	'	my_setValue("need_to_add_formatting_buttons",need_to_add_formatting_buttons);'+
	'	need_to_add_scrolling_menu=document.getElementById("need_to_add_scrolling_menu").checked;'+
	'	my_setValue("need_to_add_scrolling_menu",need_to_add_scrolling_menu);'+
	'	need_to_add_character_counter=document.getElementById("need_to_add_character_counter").checked;'+
	'	my_setValue("need_to_add_character_counter",need_to_add_character_counter);'+
	'	need_to_move_mod_buttons=document.getElementById("need_to_move_mod_buttons").checked;'+
	'	my_setValue("need_to_move_mod_buttons",need_to_move_mod_buttons);'+
	'	need_to_change_links_target=document.getElementById("need_to_change_links_target").checked;'+
	'	my_setValue("need_to_change_links_target",need_to_change_links_target);'+
	'	need_to_change_img_target=document.getElementById("need_to_change_img_target").checked;'+
	'	my_setValue("need_to_change_img_target",need_to_change_img_target);'+
	'	need_to_remove_unnecessary_elements=document.getElementById("need_to_remove_unnecessary_elements").checked;'+
	'	my_setValue("need_to_remove_unnecessary_elements",need_to_remove_unnecessary_elements);'+
	'	need_to_remove_ads=document.getElementById("need_to_remove_ads").checked;'+
	'	my_setValue("need_to_remove_ads",need_to_remove_ads);'+
	'	need_preview_button=document.getElementById("need_preview_button").checked;'+
	'	my_setValue("need_preview_button",need_preview_button);'+
	'	need_to_make_widescreen=document.getElementById("need_to_make_widescreen").checked;'+
	'	my_setValue("need_to_make_widescreen",need_to_make_widescreen);'+
	'	my_hide_menu();'+
	'	location.reload();'+
	'}'+
	'function my_setValue( cookieName, cookieValue, lifeTime ) {'+
	'	if( !cookieName ) { return; }'+
	'	if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }'+
	'	document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) +'+
	'		";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";'+
	'}'+
	'my_hide_menu();';
	var my_menu = document.createElement("div");
	my_menu.setAttribute("class", "module rounded pb0");
	my_menu.setAttribute("id", "my_menu");
	document.getElementById("sidebar").appendChild(my_menu);
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.appendChild(document.createTextNode(script_text));
	document.getElementsByTagName("head")[0].appendChild(newScript);
}

/////////////////////getElementsByClass/////////////////////
function getElementsByClass(searchClass,node,tag) {
	var classElements = [];
	if ( node === null ) {node = document;}
	if ( tag === null ) {tag = '*';}
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

/////////////////////my_remove_unnecessary_elements/////////////////////
function my_remove_unnecessary_elements(){
	var div,div2,i;
	//Облако тегов
	var remove_tag_cloud = true;
	//Топ-10 недели	
	var remove_top_10 = true;
	//Популярные доки
	var remove_popular_docs = true;
	//всякая хрень внизу
	var remove_foot = true;
	//реклама :)
//	var remove_ads = true;
	for(i=document.getElementById("sidebar").childNodes.length-1;i>=0;i--){
		div=(document.getElementById("sidebar").childNodes[i]);
		if(div){
			div2=div.childNodes[6];
			if(div2&&(div2.nodeName==="H3"||div2.nodeName==="H2")){
				if(remove_tag_cloud&&div2.childNodes[0].nodeValue==="Облако тегов"){
					document.getElementById("sidebar").removeChild(div);
				}
				else if(remove_top_10&&div2.childNodes[0].nodeValue==="Топ-10 недели"){
					document.getElementById("sidebar").removeChild(div);
				}
				else if(remove_popular_docs&&div2.childNodes[0].nodeValue==="Популярные доки"){
					document.getElementById("sidebar").removeChild(div);
				}
			}
		}
	}
	var nods;
	if(remove_foot){
		div = document.getElementById("foot");
		if(div){
			nods = getElementsByClass("module rounded clearfix pt0",div,"div");
			for(i=0;i<nods.length;i++){
				nods[i].parentNode.removeChild(nods[i]);
			}
		}
	}
	//всякие твиттеры-хуиторы...
	nods = getElementsByClass("yashare-auto-init",null,"div");
	if(nods.length === 1){
		nods[0].parentNode.parentNode.removeChild(nods[0].parentNode);
	}
	
}

/////////////////////my_remove_ads/////////////////////
function my_remove_ads(){
	var div,i,ids = ["links","banner_left_2","footer","top-banner","top100Counter","branding_link","banner_left_3","rdminfrm_31257"];
	for(i=0;i<ids.length;i++){
		div = document.getElementById(ids[i]);
		if(div){
			div.parentNode.removeChild(div);
		}
	}
	div = document.getElementById("page");
	if(div) {
		while(div.nextSibling){
			div.parentNode.removeChild(div.nextSibling);
		}
	}
	div = getElementsByClass("banner",null,null);
	if(div) {
		for(i=0;i<div.length;i++){
			div[i].parentNode.removeChild(div[i]);
		}
	}
	
	
//	document.getElementById("branding_1").setAttribute("style","background: url(\"http://nnm.ru/i/body-bg.gif\") repeat scroll 0 0 #ABC4A1 !important;");
}


/////////////////////my_make_widescreen/////////////////////
function my_make_widescreen(){
	var div;
	div = document.getElementById("wrap");
	if(div){
		div.setAttribute("style","width: 88% !important;");
	}
	div = document.getElementById("content");
	if(div){
		div.setAttribute("style","width: auto !important;");
	}
	div = document.getElementById("footer");
	if(div){
		div.setAttribute("style","background:none !important");
	}
}



/////////////////////main/////////////////////
if((!NNM_Pepelaz_already_running)&&(location.href.indexOf("http://nnm.ru/ajax")!==0)){
	var NNM_Pepelaz_already_running=true;
	var need_to_add_menu = true;
	var need_to_check_rating = true;
	var need_to_add_formatting_buttons = my_getValue("need_to_add_formatting_buttons",true);
	var need_to_add_scrolling_menu = my_getValue("need_to_add_scrolling_menu",false);
	var need_to_add_character_counter = my_getValue("need_to_add_character_counter",true);
	var need_to_move_mod_buttons = my_getValue("need_to_move_mod_buttons",false);
	var need_to_change_links_target = my_getValue("need_to_change_links_target",false);
	var need_to_change_img_target = my_getValue("need_to_change_img_target",false);
	var need_to_remove_unnecessary_elements = my_getValue("need_to_remove_unnecessary_elements",false);
	var need_to_remove_ads = my_getValue("need_to_remove_ads",false);
	var need_preview_button = my_getValue("need_preview_button",false);
	var need_to_make_widescreen = my_getValue("need_to_make_widescreen",false);

	
	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.appendChild(document.createTextNode("var need_to_add_formatting_buttons = "+need_to_add_formatting_buttons+";"+
	"var need_to_add_scrolling_menu = "+need_to_add_scrolling_menu+";"+
	"var need_to_add_character_counter = "+need_to_add_character_counter+";"+
	"var need_to_move_mod_buttons = "+need_to_move_mod_buttons+";"+
	"var need_to_change_links_target = "+need_to_change_links_target+";"+
	"var need_to_change_img_target = "+need_to_change_img_target+";"+
	"var need_to_remove_unnecessary_elements = "+need_to_remove_unnecessary_elements+";"+
	"var need_to_remove_ads = "+need_to_remove_ads+";"+
	"var need_preview_button = "+need_preview_button+";"+
	"var need_to_make_widescreen = "+need_to_make_widescreen+";"));
	document.getElementsByTagName("head")[0].appendChild(script);
	
	
	if(need_to_add_menu){
		my_add_menu();
	}
	
	if(need_to_add_formatting_buttons==false || need_to_add_formatting_buttons =="false"){
	}else{
		my_add_formatting_buttons();
	}
	if(need_to_add_scrolling_menu==false || need_to_add_scrolling_menu =="false"){
	}else{
		my_add_scrolling_menu();
	}
	if(need_to_add_character_counter==false || need_to_add_character_counter =="false"){
	}else{
		my_add_character_counter();
	}
	if(need_to_move_mod_buttons==false || need_to_move_mod_buttons =="false"){
	}else{
		my_move_mod_buttons();
	}
	if(need_to_change_links_target==false || need_to_change_links_target =="false"){
	}else{
		my_change_links_target();
	}
	if(need_to_change_img_target==false || need_to_change_img_target =="false"){
	}else{
		my_change_preview_targets();
	}
	if(need_to_make_widescreen==false || need_to_make_widescreen =="false"){
	}else{
		my_make_widescreen();
	}
	if(need_to_remove_unnecessary_elements==false || need_to_remove_unnecessary_elements =="false"){
	}else{
		my_remove_unnecessary_elements();
	}
	
	var form = document.createElement("form");
	form.setAttribute("style","display: none;");
	form.setAttribute("id","my_test_form");
	form.setAttribute("enctype","multipart/form-data");
	form.setAttribute("method","post");
	var input = document.createElement("input"); //заголовок
	input.setAttribute("type","text");
	input.setAttribute("name","title");
	form.appendChild(input);
	input = document.createElement("input");//ссылка
	input.setAttribute("type","text");
	input.setAttribute("name","url");
	form.appendChild(input);
	input = document.createElement("input");//юзер
	input.setAttribute("type","text");
	input.setAttribute("name","url");
	form.appendChild(input);
	input = document.createElement("input");//файл изображения
	input.setAttribute("id","my_js_img_file");
	input.setAttribute("type","file");
	input.setAttribute("name","img_file");
	form.appendChild(input);
	input = document.createElement("input");//адрес изображения
	input.setAttribute("id","my_js_img_url");
	input.setAttribute("type","text");
	input.setAttribute("name","img_url");
	form.appendChild(input);
	input = document.createElement("input");//видео
	input.setAttribute("type","text");
	input.setAttribute("name","url");
	form.appendChild(input);
	input = document.createElement("textarea");//текст новости
	input.setAttribute("name","content");
	form.appendChild(input);
	input = document.createElement("input");//теги
	input.setAttribute("type","text");
	input.setAttribute("name","tags");
	form.appendChild(input);
	input = document.createElement("input");//источник
	input.setAttribute("type","text");
	input.setAttribute("name","source");
	form.appendChild(input);
	input = document.createElement("input");//тип новости
	input.setAttribute("type","text");
	input.setAttribute("name","type");
	input.setAttribute("value","open");
	form.appendChild(input);
	input = document.createElement("input");//док
	input.setAttribute("name","doc_id");
	input.setAttribute("type","text");
	input.setAttribute("value","44506");
	form.appendChild(input);
	input = document.createElement("input");//раздел
	input.setAttribute("type","text");
	input.setAttribute("name","category_id");
	input.setAttribute("value","15");
	form.appendChild(input);
	document.getElementById("content").appendChild(form);

	if(need_to_remove_ads==false || need_to_remove_ads =="false"){
	}else{
		my_remove_ads();
	}
}
