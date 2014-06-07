// ==UserScript==
// @name           BB-Tools
// @version        2.6.0
// @namespace      klavogonki
// @author         Fenex
// @description    BB-Tools in forum and comments.
// @include        http://klavogonki.ru/forum*
// @include        http://klavogonki.ru/profile/*
// @include        http://klavogonki.ru/vocs/*
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function getCursorPos(input) {
	var result = {start: 0, end: 0};
	if (input.setSelectionRange) {
		result.start = input.selectionStart;
		result.end = input.selectionEnd;
	}
	else if (!document.selection) 
		return false;
	else if (document.selection.createRange) {
		var range = document.selection.createRange();
		var stored_range = range.duplicate();
		stored_range.moveToElementText(input);
		stored_range.setEndPoint('EndToEnd', range);
		result.start = stored_range.text.length - range.text.length;
		result.end = result.start + range.text.length;
	}
	return result;
}

function insertTag(startTag, endTag, txtId ) {
	var txtarea = document.getElementById(txtId);
	txtarea.focus();
	var scrtop = txtarea.scrollTop;
	var cursorPos = getCursorPos(txtarea);
	var txt_pre = txtarea.value.substring(0, cursorPos.start);
	var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
	var txt_aft = txtarea.value.substring(cursorPos.end);
	if (endTag==1){txt_sel="";endTag="";}
	if (cursorPos.start == cursorPos.end)
		var nuCursorPos = cursorPos.start + startTag.length;
	else
		var nuCursorPos=String(txt_pre + startTag + txt_sel + endTag).length;
	txtarea.value = txt_pre + startTag + txt_sel + endTag + txt_aft;
	returnCursor(txtarea,nuCursorPos,nuCursorPos);
	if (scrtop)
		txtarea.scrollTop = scrtop;
}

function sendBBTag(tagName, txtId) {
	var startTag = '[' + tagName + ']';
	var endTag = '[/' + tagName + ']';
	insertTag(startTag, endTag, txtId);
	return false;
}

function returnCursor(txtarea, start, end) {
	if(txtarea.createTextRange) 
	{
		var range = txtarea.createTextRange();
		range.move("character", start);
		range.select();
	} 
	else if (txtarea.selectionStart) 
		txtarea.setSelectionRange(start, end);
}

function sendBBTag_prompt(param, txtId) {
	var txtarea = document.getElementById(txtId);
	var cPos = getCursorPos(txtarea);
	switch (param) {
		case 'url':
			var href = prompt('Пожалуйста, введите полный URL адрес', 'http://');
			if(typeof(href)=='object') {return;}
			var user_txt = "";
			if(cPos.start==cPos.end) {
				user_txt = prompt('Пожалуйста, введите заголовок для этого пункта', txtarea.value.substring(cPos.start, cPos.end));
				if(typeof(user_txt)=='object') {return;}
				insertTag('[url="' + href + '"]'+user_txt+'[/url]', '', txtId);
			}
			else
			insertTag('[url="' + href + '"]', '[/url]', txtId);
		
			break;
		case 'img':
			var href = prompt('Пожалуйста, введите URL адрес для этого изображения', txtarea.value.substring(cPos.start, cPos.end));
			if(typeof(href)=='object'){return;}
			insertTag('[img]' + href + '[/img]', 1, txtId);
			break;
		case 'color':
			var href = prompt('Пожалуйста, введите название цвета, либо его код', '#000000');
			if(typeof(href)=='object'){return;}
			if(cPos.start==cPos.end) {
				var user_txt = prompt('Пожалуйста, введите текст', txtarea.value.substring(cPos.start, cPos.end));
				if(typeof(user_txt)=='object'){return;}
				insertTag('[color="' + href + '"]'+user_txt+'[/color]', '', txtId);
			}
			else
				insertTag('[color="' + href + '"]', '[/color]', txtId);
			break;
		case 'background':
			var href = prompt('Пожалуйста, введите название цвета, либо его код', '#000000');
			if(typeof(href)=='object') {return;}
			if(cPos.start==cPos.end) {
				user_txt = prompt('Пожалуйста, введите текст', txtarea.value.substring(cPos.start, cPos.end));
				if(typeof(user_txt)=='object'){return;}
				insertTag('[background="' + href + '"]'+user_txt+'[/background]', '', txtId);
			}
			else
				insertTag('[background="' + href + '"]', '[/background]', txtId);
			break;
		case 'size':
			var href = prompt('Пожалуйста, введите размер шрифта', '2');
			if(typeof(href)=='object'){return;}
			if(cPos.start==cPos.end) {
				user_txt = prompt('Пожалуйста, введите текст', txtarea.value.substring(cPos.start, cPos.end));
				if(typeof(user_txt)=='object'){return;}
				insertTag('[size="' + href + '"]'+user_txt+'[/size]', '', txtId);
			}
			else
				insertTag('[size="' + href + '"]', '[/size]', txtId);
			break;
		default:
			alert('error');
			break;
	}
}

function sendBBTag_list(txtId, num) {
	var txtarea = document.getElementById(txtId);
	var txt = '[list';
	var list_type = true;
	if(num)
		txt += '=1]\n';
	else
		txt +=']\n';
	var a = '0';
	while(true) {
		var a = prompt('Сколько создать пунктов?', '0');
		if(typeof(a)=='object'){return;}
		if((parseInt(a).toString()=='NaN')||(parseInt(a)<0)) {
			if(confirm('Ошибка при вводе. Повторить?'))
				continue;
			else
				return;
		}
		else {
			a = parseInt(a);
			break;
		}
	}
	if(a==0)
		a = 100;
	for(i=1; i<=a; i++) {
		var j = prompt('Введите текст '+i+': ','');
		if(typeof(j)=='object')
			break;
		txt +='[*]'+j+'\n';
	}
	txt += '[/list]';
	insertTag(txt, '', txtId);
}	
function generateButtonsCode(a) {
	var buttons = [
		{
			src: "/img/forum/rte-quote-button.png",
			title: "Цитата",
			onclick: "sendBBTag('quote', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-quotesel-button.png",
			title: "Цитата выделенного",
			onclick: "ips_text_editor_lite('"+a+"');selected = $selection.getText();ipb_quotesel();"
		},
		{
			src: "/img/forum/rte-bold.png",
			title: "Полужирный",
			onclick: "sendBBTag('b', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-italic.png",
			title: "Курсив",
			onclick: "sendBBTag('i', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-underlined.png",
			title: "Подчеркнутый",
			onclick: "sendBBTag('u', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-strike.png",
			title: "Зачеркнутый",
			onclick: "sendBBTag('s', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-sup.png",
			title: "Надстрочный знак",
			onclick: "sendBBTag('sup', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-sub.png",
			title: "Подстрочный знак",
			onclick: "sendBBTag('sub', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-size.png",
			title: "Размер шрифта",
			onclick: "sendBBTag_prompt('size', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-color.png",
			title: "Цвет шрифта",
			onclick: "sendBBTag_prompt('color', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-background.png",
			title: "Цвет фона",
			onclick: "sendBBTag_prompt('background', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-link-button.png",
			title: "Вставить гиперссылку",
			onclick: "sendBBTag_prompt('url', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-image-button.png",
			title: "Вставить изображение",
			onclick: "sendBBTag_prompt('img', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-hide-button.png",
			title: "Скрытый текст",
			onclick: "sendBBTag('hide', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-left.png",
			title: "По левому краю",
			onclick: "sendBBTag('left', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-center.png",
			title: "По центру",
			onclick: "sendBBTag('center', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-right.png",
			title: "По правому краю",
			onclick: "sendBBTag('right', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-tab.png",
			title: "Отступ",
			onclick: "sendBBTag('list', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-list_0.png",
			title: "Список",
			onclick: "sendBBTag_list('"+a+"_textarea', 0);"
		},
		{
			src: "/img/forum/rte-list_1.png",
			title: "Нумерованный список",
			onclick: "sendBBTag_list('"+a+"_textarea', 1);"
		},
		{
			src: "/img/forum/rte-code-button.png",
			title: "Код",
			onclick: "sendBBTag('code', '"+a+"_textarea');"
		},
		{
			src: "/img/forum/rte-html-button.png",
			title: "HTML",
			onclick: "sendBBTag('html', '"+a+"_textarea');"
		},
		{
			src: "http://klavogonki.ru/img/smilies/smile.gif",
			title: "Смайлы",
			onclick: "smileTab_func('"+a+"');"
		}
	];
	
	var html_code = "<div class='bb_tools' id='bb_tools_"+a+"'>";
	for(var i=0; i<buttons.length; i++) {
		html_code += '<img title="' + buttons[i].title + 
					'" alt="' + buttons[i].title + 
					'" src="' + buttons[i].src +
					'" onclick="' + buttons[i].onclick + '" />';
	}
	html_code += '<select style="vertical-align: top;" id="BBtools_color" onchange="insertTag(\'[color=#\'+this.value+\']\', \'[/color]\', \''+a+'_textarea\');this.selectedIndex = 0;"><option value="0">ВЫБОР ЦВЕТА</option><option value="061956" style="color:#061956">Экстракибер</option><option value="2E32CE" style="color:#2E32CE">Кибергонщик</option><option value="5E0B9E" style="color:#5E0B9E">Супермен</option><option value="BC0143" style="color:#BC0143">Маньяк</option><option value="BA5800" style="color:#BA5800">Гонщик</option><option value="8C8100" style="color:#8C8100">Профи</option><option value="187818" style="color:#187818">Таксист</option><option value="4F9A97" style="color:#4F9A97">Любитель</option><option value="8D8D8D" style="color:#8D8D8D">Новичок</option><option value="3D4856" style="color:#3D4856">Абракадабра</option><option value="698725" style="color:#698725">Яндекс.Рефераты</option><option value="4692AA" style="color:#4692AA">Безошибочный</option><option value="D43E68" style="color:#D43E68">Марафон</option><option value="B55900" style="color:#B55900">Буквы</option><option value="833F3A" style="color:#833F3A">Спринт</option><option value="524CA7" style="color:#524CA7">По словарю</option></select>';
	html_code += "</div>";
	
	return html_code;
}

function innerButtonsCode(i) {
	var tmp = document.getElementById(i+'-controls');
	tmp.style.display = 'none';
	var e = document.createElement('span');
	e.innerHTML = generateButtonsCode(i);
	tmp.parentNode.insertBefore(e, tmp);
}

function smileTab_func(a) {
	if(tab_smiles==a) {
		tab_smiles = 0;
		$('table_smiles').hide();
	}
	else { 
		tab_smiles = a;
		$('table_smiles').show();
	}
}

function insertSmileInPost(a) {	
	insertTag('[img]http://klavogonki.ru/img/smilies/'+a+'.gif[/img]', '', tab_smiles+'_textarea');
}

function Obj(a) {
	if((DragObj)&&(!a)) {
		clearInterval(window.timeout_smiletable);
		localStorage.setItem('smileTab_Xpos', DragObj.style.left);
		localStorage.setItem('smileTab_Ypos', DragObj.style.top);
		DragObj = null;
		return;
	}
	if((!DragObj)&&(a)) {
	    DragObj = document.getElementById('table_smiles');
		window.timeout_smiletable = setInterval('move_smileTable()', 10);
		return;
    }
}

function move_smileTable() {
	if(DragObj) {  
        DragObj.style.left = window.mouseX-(document.documentElement.scrollLeft ||  document.body.scrollLeft)-15+"px";
        DragObj.style.top = window.mouseY-(document.documentElement.scrollTop || document.body.scrollTop)-15+"px";
    }
}

var post_elems = document.getElementsByClassName('post-container');
for (i=0; i<post_elems.length; i++) {
	if(!(post_elems[i].id)){continue;}
	var index_post = post_elems[i].id.substring(5);
	innerButtonsCode('text-'+index_post);
}
if(document.getElementById('fast-reply_textarea'))
	innerButtonsCode('fast-reply');
if(document.getElementById('text_textarea'))
	innerButtonsCode('text');
if(document.getElementById('message_textarea'))
	innerButtonsCode('message');
if(document.getElementById('bio_textarea'))
	innerButtonsCode('bio');
if(document.getElementById('voc_textarea'))
	innerButtonsCode('voc');
	
var st = document.createElement('style');
st.innerHTML = 'div.bb_tools img{cursor:pointer;}#table_smiles{font-size:12px;margin:0 0 2em;position:fixed;z-index:7;}.popup-box table{border-collapse:collapse;border-bottom:0px;}div#table_smiles table tr td.c img{cursor:pointer;}.popup-box .move {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:#ffffff none repeat scroll 0 0;cursor:move;height:10px;position:absolute;left:12px;top:12px;width:10px;z-index:2;}.popup-box .move ins {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:transparent url(http://klavogonki.ru/img/chat/dragdrop.gif) no-repeat scroll 0 0;height:10px;position:absolute;width:10px;}';
document.body.appendChild(st);

var s1 = document.createElement('script');
s1.textContent = "var DragObj = null;var tab_smiles;\n"+sendBBTag+"\n"+sendBBTag_prompt+"\n"+insertTag+"\n"+getCursorPos+"\n"+returnCursor+"\n"+generateButtonsCode+"\n"+innerButtonsCode+"\n"+sendBBTag_list+"\n"+insertSmileInPost+"\n"+smileTab_func+"\n"+move_smileTable+"\n"+Obj+"\n";
document.body.appendChild(s1);

var sm = document.createElement('div');
var smilies = new Array("smile", "biggrin", "angry", "angry2", "blink", "blush", "cool", "dry", "excl", "happy", "huh", "laugh", "mellow", "ohmy", "ph34r", "rolleyes", "sad", "sleep", "tongue", "unsure", "wacko", "wink", "wub", "power", "spiteful", "sorry", "first", "second", "third", "badcomp", "complaugh", "girlnotebook", "crazy", "boredom", "cry", "bye", "dance", "gamer", "rofl", "beer", "kidtruck", "boykiss", "girlkiss", "kissed", "yes", "no", "hi", "ok");

var inner_tmp =  '<div style="display:none; width:300px; top:' + ( localStorage['smileTab_Ypos'] || '100px' ) + '; left:' + ( localStorage['smileTab_Xpos'] || '100px' ) + ';" id="table_smiles" class="popup-box"><table><tbody><tr><td class="tl"></td><td class="t"></td><td class="tr"></td></tr><tr><td class="l"></td><td class="c">';
for(i=0; i<smilies.length; i++) {
	inner_tmp += '<img alt="'+smilies[i]+'" onclick="insertSmileInPost(\''+smilies[i]+'\');" src="/img/smilies/'+smilies[i]+'.gif" />';
}
sm.innerHTML = inner_tmp + '</td><td class="r"></td></tr><tr><td class="bl"></td><td class="b"></td><td class="br"></td></tr></tbody></table><div class="close"><ins onclick="tab_smiles = 0;$(\'table_smiles\').hide();"></ins></div><div class="move"><ins onmousedown="Obj(true);" onmouseup="Obj(false);"></ins></div></div>';

var tmp = document.getElementById('head');
tmp.parentNode.insertBefore(sm, tmp);