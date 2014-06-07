// ==UserScript==
// @name           Legion Alpha Smiley
// @namespace      Legion Alpha Smiley
// @description    Smileys para mensajes exclusivo LA 
// @version        1
// @include        http://s1.cl.ikariam.*/*
// @exclude	       http://s*.*.ikariam.*/pillory.php*
// ==/UserScript==

var smilies = new Array();
smilies[0] = 'http://img198.imageshack.us/img198/8696/87191545.png';
smilies[1] = 'http://img268.imageshack.us/img268/6257/puntopq.png';
smilies[2] = 'http://img864.imageshack.us/img864/9063/13531324.png';
smilies[3] = 'http://img863.imageshack.us/img863/919/pngpsd.png';
smilies[4] = 'http://img194.imageshack.us/img194/9897/60099420.png';
smilies[5] = 'http://img143.imageshack.us/img143/8236/75863833.png';
smilies[6] = 'http://img16.imageshack.us/img16/9079/13219842.png';
smilies[7] = 'http://img402.imageshack.us/img402/3363/triste.png';
smilies[8] = 'http://img803.imageshack.us/img803/6263/26188114.png';
smilies[9] = 'http://img542.imageshack.us/img542/3694/22532869.png';
smilies[10] = 'http://img543.imageshack.us/img543/2252/29865766.png';



function jsGet(type)
{
	if(location.href.match(type))
	{
		return location.href.split(type+'=')[1].split('&')[0];
	}
}

function inject_styles()
{
	var stl = document.createElement('style');
	stl.innerHTML = '.smill_w { padding: 3px; cursor: pointer;vertical-align:middle;}';
	document.getElementsByTagName('head')[0].appendChild(stl);
}

unsafeWindow.add_sml = function(id)
{
	var smil = id.replace('sm','');
	var txt = document.getElementById('text');
	var smilies = new Array();
	smilies[0] = ':)'; smilies[1] = ':p'; smilies[2] = ':s'; smilies[3] = '::'; smilies[4] = ';)'; smilies[5] = ':o'; smilies[6] = '¬¬'; smilies[7] = ':('; smilies[8] = 'xd'; smilies[9] = ':D'; smilies[10] = 'enojado'
	unsafeWindow.insertInPlace(txt,smilies[smil]);
}
unsafeWindow.insertInPlace = function(myField, myValue)
{
	myValue = ' '+myValue+' ';
	if (myField.selectionStart || myField.selectionStart == '0')
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		myField.value = myField.value.substring(0, startPos)
		+ myValue
		+ myField.value.substring(endPos, myField.value.length);
		}
	else
	{
		myField.value += myValue;
	}
}
unsafeWindow.doAddTags = function(tag1,tag2,obj)
{
	textarea = document.getElementById(obj);
	var len = textarea.value.length;
	var start = textarea.selectionStart;
	var end = textarea.selectionEnd;
	var scrollTop = textarea.scrollTop;
	var scrollLeft = textarea.scrollLeft;
	var sel = textarea.value.substring(start, end);
	var rep = tag1 + sel + tag2;
	textarea.value =  textarea.value.substring(0,start) + rep + textarea.value.substring(end,len);
	textarea.scrollTop = scrollTop;
	textarea.scrollLeft = scrollLeft;
}

if(jsGet('view')=='sendIKMessage')
{
	inject_styles()
	var textarea = document.getElementsByClassName('textfield')[0];
	var txt = document.getElementById('text');
	var smilct = document.createElement('span');
	smilct.setAttribute('id','smilies');

	var toolbar = document.createElement('div');
	toolbar.setAttribute('id','toolbar');
	toolbar.innerHTML = "<a class=\"button\" href=\"#\" name=\"btnBold\" title=\"Bold\" onClick=\"doAddTags('[b]','[/b]','text');\" style=\"margin:0px;\"><b>B</b></a><a class=\"button\" href=\"#\" name=\"btnItalic\" title=\"Italic\" onClick=\"doAddTags('[i]','[/i]','text');\" style=\"margin:0px;\"><i>I</i></a><a class=\"button\" href=\"#\" name=\"btnUnderline\" title=\"Underline\" onClick=\"doAddTags('[u]','[/u]','text');\" style=\"margin:0px;\"><u>U</u></a>";
	
	var tools = document.getElementById('mailSubject').nextSibling.nextSibling;
	tools.innerHTML = '';
	tools.appendChild(toolbar);
	toolbar.appendChild(smilct);
	
	var smajliji = document.getElementById('smilies');
	for(var i in smilies)
	{
		var img = document.createElement('img');
		img.setAttribute('src',smilies[i]);
		img.setAttribute('class','smill_w');
		img.setAttribute('id','sm'+i);
		img.setAttribute('onClick','add_sml(this.id);');
		smajliji.appendChild(img);
	}
	var br = document.getElementById('nr_chars_div').previousSibling.previousSibling;
	br.parentNode.removeChild(br);
	document.getElementsByClassName('centerButton')[0].getElementsByTagName('input')[0].style.margin = '0px';
}

if(jsGet('view')=='diplomacyAdvisor'||jsGet('view')=='diplomacyAdvisorOutBox')
{
	var allInputs = document.getElementById("deleteMessages").getElementsByTagName("input");
	for (var i=0; i<allInputs.length; i++) {
		 if (allInputs[i].getAttribute("type") == "checkbox")
		 {
			var id = allInputs[i].name.replace("deleteId[","").replace("]","");
			var msg = document.getElementById("tbl_mail"+id).childNodes[1].childNodes[1];
			msg.innerHTML = msg.innerHTML.replace('[b]','<b>').replace('[/b]','</b>').replace('[i]','<i>').replace('[/i]','</i>').replace('[u]','<u>').replace('[/u]','</u>').replace(/\:\)/g,' <img src="'+smilies[0]+'" /> ').replace(/\:p/gi,' <img src="'+smilies[1]+'" /> ').replace(/\:s/gi,' <img src="'+smilies[2]+'" /> ').replace(/\::/gi,' <img src="'+smilies[3]+'" /> ').replace(/\;\)/g,' <img src="'+smilies[4]+'" /> ').replace(/\:o/gi,' <img src="'+smilies[5]+'" /> ').replace(/\¬¬/g,' <img src="'+smilies[6]+'" /> ').replace(/\:\(/g,' <img src="'+smilies[7]+'" /> ').replace(/\xd/gi,' <img src="'+smilies[8]+'" /> ').replace(/\:D/gi,' <img src="'+smilies[9]+'" /> ').replace(/\enojado/gi,' <img src="'+smilies[10]+'" /> ');
		 }
	}
}


// ********Create By Dante********
// ****Exclusivo Legion Alpha*****