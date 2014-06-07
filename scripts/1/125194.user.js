// ==UserScript==
// @name			NNM-Knopki-Mini
// @namespace		http://users.nnm.ru/beshh/
// @description		Short version of NNM-Knopki
// @author			Beshh
// @include			http://*.nnm.ru/*
// @include			http://nnm.ru/*
// ==/UserScript==

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

/////////////////////my_add_formatting_buttons/////////////////////
function my_add_formatting_buttons() {
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
	'add_buttons(0);';
	
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
		scripts.appendChild(document.createTextNode(scripts_text));
		document.getElementsByTagName("head")[0].appendChild(scripts);
		var repF = document.getElementById("fbuttons");
		if(repF){
			repF.parentNode.insertBefore(document.createElement("br"), repF);
			repF.parentNode.insertBefore(document.createElement("br"), repF);
		}
	}
}


/////////////////////main/////////////////////
if((!NNM_Pepelaz_already_running)&&(location.href.indexOf("http://nnm.ru/ajax")!==0)){
	var NNM_Pepelaz_already_running=true;
	my_add_formatting_buttons();
	my_add_character_counter();
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
}
