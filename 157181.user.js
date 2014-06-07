// ==UserScript==
// @name           Google Translator Tooltip MLiteNoKeys Revised
// @namespace      honestly I donot know what to fill   
// @description    Translates selected text into a tooltip, with Google translate logo included.
// @version        0.2.1.1
// @include        http*
// @include        https*
// @require        http://code.jquery.com/jquery-latest.js
// @updateURL      http://userscripts.org/scripts/source/157181.user.js
// ==/UserScript==
const HREF_NO = 'javascript:void(0)';
var  languagesGoogle = '<option value="auto">Detect language</option><option  value="sq">Albanian</option><option  value="ar">Arabic</option><option  value="bg">Bulgarian</option><option  value="ca">Catalan</option><option  value="zh-CN">Chinese</option><option  value="hr">Croatian</option><option  value="cs">Czech</option><option  value="da">Danish</option><option  value="nl">Dutch</option><option  value="en">English</option><option  value="et">Estonian</option><option  value="tl">Filipino</option><option  value="fi">Finnish</option><option  value="fr">French</option><option  value="gl">Galician</option><option  value="de">German</option><option  value="el">Greek</option><option  value="iw">Hebrew</option><option  value="hi">Hindi</option><option  value="hu">Hungarian</option><option  value="id">Indonesian</option><option  value="it">Italian</option><option  value="ja">Japanese</option><option  value="ko">Korean</option><option  value="lv">Latvian</option><option  value="lt">Lithuanian</option><option  value="mt">Maltese</option><option  value="no">Norwegian</option><option  value="pl">Polish</option><option  value="pt">Portuguese</option><option  value="ro">Romanian</option><option  value="ru">Russian</option><option  value="sr">Serbian</option><option  value="sk">Slovak</option><option  value="sl">Slovenian</option><option value="es">Spanish</option><option  value="sv">Swedish</option><option  value="th">Thai</option><option  value="tr">Turkish</option><option  value="uk">Ukrainian</option><option  value="vi">Vietnamese</option>';
var body = getTag('body')[0];
var imgLookup;
var txtSel; // text selected
var currentURL;
var multiline = false;

images();
css();

document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);

function mousedownCleaning(evt)
{
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	
	if(divLookup)
		divLookup.parentNode.removeChild(divLookup);
	
	if(divDic)
	{
		if(!clickedInsideID(evt.target,'divDic'))
			divDic.parentNode.removeChild(divDic);
	}	
}

function showLookupIcon(evt)
{
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	txtSel = getSelection();
	
	//exit if no text is selected
	if(!txtSel || txtSel=="")
	{
		if(divDic)
		{
			if(!clickedInsideID(evt.target,'divDic'))
				divDic.parentNode.removeChild(divDic);
		}
		if(divLookup)
			divLookup.parentNode.removeChild(divLookup);
		
		return;
	}


	//possible cleanup
	if(divDic)
	{
		if(!clickedInsideID(evt.target,'divDic'))
			divDic.parentNode.removeChild(divDic);
		
		return;
	}

	
	//remove div if exists
	if(divLookup)
	{
		divLookup.parentNode.removeChild(divLookup);
	}	
	
	
	//div container 
	divLookup = createElement('div', {id:'divLookup', style:'background:transparent; color:#000000; position:absolute; padding:1px; z-index:10000; border-radius:2px; top:'+(evt.clientY+window.pageYOffset+10)+'px; left:'+(evt.clientX+window.pageXOffset+10)+'px; '});
	divLookup.appendChild(imgLookup.cloneNode(false));
	divLookup.addEventListener('mouseover', lookup, false);
	body.appendChild(divLookup);
}

// 新的查询的实现，参考Online Translate脚本
function lookup(evt)
{
	var divResult = null;
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	var top = divLookup.style.top;
	var left = divLookup.style.left;
	divLookup.parentNode.removeChild(divLookup);

	//no text selected
	if(!txtSel || txtSel=="")
	{
		if(divDic)
			divDic.parentNode.removeChild(divDic);
		return;
	}	

	//cleanup divs
	if(divDic)
	{
		divDic.parentNode.removeChild(divDic);
	}
	
	//div container 
	divDic = createElement('div', {id:'divDic', style:'background: #fff; color:#000; position:absolute; top:'+top+'; left:'+left+'; min-width:50px; max-width:50%; padding:1px; text-align:left; z-index:10000; border-radius:4px; box-shadow: 1px 1px 6px #000; '});
	divDic.addEventListener('mousedown', dragHandler, false);
	body.appendChild(divDic);

	//div result 改变滚动条 <br/>Loading...
	divResult = createElement('div', {id:'divResult', style:'float:left; position: relative; overflow:auto; padding:3px; color:#888; margin-right:2px; '}, null, '<img src="data:image/gif;base64,R0lGODlhEAAQAPQAAP///wAAAPDw8IqKiuDg4EZGRnp6egAAAFhYWCQkJKysrL6+vhQUFJycnAQEBDY2NmhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAAKAAEALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQACgACACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQACgADACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkEAAoABAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkEAAoABQAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkEAAoABgAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAAKAAcALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkEAAoACAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAAKAAkALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQACgAKACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQACgALACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA=="/>');
	divDic.appendChild(divResult);

	addOptionLink();

	// 修改翻译结果的位置
	var heightSel = getSelectionHeight();
	var leftSel = getSelectionLeft();
	var topSel = getSelectionTop() + $(window).scrollTop();
	var widthSel = divResult.offsetWidth < 800 ? 'auto' : 800 + 'px';
    if (topSel + divDic.offsetHeight > $(window).scrollTop() + $(window).height() ) {
        topSel -= (topSel + divDic.offsetHeight - $(window).scrollTop() - $(window).height() + heightSel + 20);
    } else {
        topSel += heightSel + 10;
    }
	divDic.style.left = leftSel + 'px';
	divDic.style.top = topSel + 'px';
	divDic.style.width = widthSel;
	disp = leftSel + 'px' + topSel + 'px';
	
	//lookup
	//除去判断选择文字是否为URL的判断
	var sl, tl, lang;
	sl = GM_getValue('from') ? GM_getValue('from') : "auto";
	tl = GM_getValue('to') ? GM_getValue('to') : "auto";
	
	text = encodeURIComponent(txtSel);
	var len = text.length;
	var method = len > 1500 ? 'POST' : 'GET';
	var currentURL = 'http://translate.google.com/translate_a/t';
	var data = 'client=t&text=' + text + '&hl=en&sl=' + sl + '&tl=' + tl;
	if (method == 'GET'){
		currentURL += '?' + data;
		data = null;
	}
	var option = {
		method: method,
		url: currentURL,
		data:data,
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		onload: function(resp){
			eval('var arr=' + resp.responseText);
			var str = '';
			$.each(arr[0], function(i, item){
				str += item[0];
			});
			var strBak = str.slice(0);
			str = str.replace(/\n/g, '<br />');
			//判断是不是更改过字符串
			if(str.localeCompare(strBak) == 0) {
				multiline = false;
			} else {
				multiline = true;
			}
			str = str.replace(/<br \/>$/, '');
			extractResult(str);
		},
		onerror: function(response) {
			console.log(response.responseText);
		}
	}
	GM_xmlhttpRequest(option);
}

function addOptionLink()
{
	divDic = getId('divDic');
	
	//options link 修改选项的图标
	divDic.appendChild(createElement('a', {id:'optionsLink', href:HREF_NO, style:'font-size: 14px; text-decoration: none !important; padding:0px 4px 0px 4px; border-radius:4px; margin: 3px; background:#528DDF; color:#fff; float:right; position:relative; bottom:0px;'}, 'click options false', '+'));

}

function quickLookup()
{
	getId('divResult').innerHTML = 'Loading...'
	currentURL = "http://translate.google.com/translate_a/t?client=t&text=" + txtSel + "&langpair=" + getId('optSelLangFrom').value + "|" + getId('optSelLangTo').value;
	GM_xmlhttpRequest({
		method: 'GET',
		url: currentURL,
		onload: function(resp) {
			try{
				extractResult_1(resp.responseText);
			}catch(e){
				GM_log(e);
			}
		}
	});	
}

function extractResult_1(gTradStringArray) /* 从json文件中提取所需的返回结果 */
{
	var temp = eval(gTradStringArray);
	var translation = '';
	translation += temp[0][0][0];
	// get current URL
	var sl, tl, lang;
	sl = GM_getValue('from') ? GM_getValue('from') : "auto";
	tl = GM_getValue('to') ? GM_getValue('to') : "auto";
	lang = sl + "|" + tl;
	currentURL = "http://translate.google.com/translate_t?text=" + encodeURIComponent(txtSel) + "&langpair=" + lang;
	
	/*翻译结果css定制*/
	getId('divResult').innerHTML = '<a style="color:black; text-decoration:none; font-size:14px; " href="'+currentURL+'" target="_blank">' + translation + '</a>'; //font-weight:bold;
		
}

function extractResult(translation)
{
	// get current URL
	var sl, tl, lang;
	sl = GM_getValue('from') ? GM_getValue('from') : "auto";
	tl = GM_getValue('to') ? GM_getValue('to') : "auto";
	lang = sl + "|" + tl;
	currentURL = "http://translate.google.com/translate_t?text=" + encodeURIComponent(txtSel) + "&langpair=" + lang;
	
	/*翻译结果css定制*/
	getId('divResult').innerHTML = '<a style="color:black; text-decoration:none; font-size:14px; " href="'+currentURL+'" target="_blank">' + translation + '</a>'; //font-weight:bold;
		
}

function getSelection()
{
	var txt = null;
	//get selected text
	if (window.getSelection)
	{
		// txt = window.getSelection();
		txt = window.getSelection().toString();
	}
	else if (document.getSelection)
	{
		// txt = document.getSelection();
		txt = document.getSelection().toString();
	}
	else if (document.selection)
	{
		txt = document.selection.createRange().text;
	}
	return txt;
}


function options(evt)
{
	var divOptions = getId('divOpt');
	
	if(!divOptions)//show options
	{
		divOptions = createElement('div', {id:'divOpt', style:'border-left:2px solid #5A91D8; position:relative; padding:5px;'});
		if(multiline == true) {
			getId('divResult').style.cssFloat = 'none';
			divOptions.style.cssFloat = 'none';
			divOptions.style.borderLeft = 'none';
			divOptions.style.borderTop = '2px solid #5A91D8'; 
		}else {
			divOptions.style.cssFloat = 'right';
		}
		getId('divDic').appendChild(divOptions);
		//getId('optionsLink').style.visibility = 'hidden';
		getId('optionsLink').parentNode.removeChild(getId('optionsLink'));

		//from
		divOptions.appendChild(createElement('span', null, null,'From:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangFrom'}, null, languagesGoogle));
		getId('optSelLangFrom').value = GM_getValue('from') ? GM_getValue('from') : "auto";
		getId('optSelLangFrom').addEventListener('change', quickLookup, false);
		
		//to
		divOptions.appendChild(createElement('span', null, null,' To:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangTo'}, null, languagesGoogle));
		getId('optSelLangTo').value = GM_getValue('to') ? GM_getValue('to') : "auto";
		getId('optSelLangTo').addEventListener('change', quickLookup, false);
		
		//save
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click saveOptions false', 'save'));
		
		//cancel
		divOptions.appendChild(createElement('span', null, null,'&nbsp;'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click options false', 'cancel'));
		
	}
	else//hide options
	{
		divOptions.parentNode.removeChild(divOptions);
		addOptionLink();
		//getId('optionsLink').style.visibility = 'visible';
	}
}

function saveOptions(evt)
{
	var from = getId('optSelLangFrom').value;
	var to = getId('optSelLangTo').value;
	
	GM_setValue('from', from);
	GM_setValue('to', to);
	
	getId('divDic').removeChild(getId('divOpt'));
	addOptionLink();
	//getId('optionsLink').style.visibility = 'visible';
}





function css()
{
	var style = createElement('style',{type:"text/css"},null,""+	
	
		'a.gootranslink:link {color: #0000FF !important; text-decoration: underline !important;}'  +  
		'a.gootranslink:visited {color: #0000FF !important; text-decoration: underline !important;}'+ 
		'a.gootranslink:hover {color: #0000FF !important; text-decoration: underline !important;}'  +
		'a.gootranslink:active {color: #0000FF !important; text-decoration: underline !important;}' +
		
		'#dict table {font-size:13px; line-height:1.5em; margin:0 2px 10px 0;background-color:#D8E5F6; color:black;border:1px solid #AEC9EC;font-style:italic;}'+
		'#dict td {padding-right:29px; vertical-align:top; border:0px; color:black; background-color:#D8E5F6;}'
	);
	getTag('head')[0].appendChild(style);
}





function createElement(type, attrArray, evtListener, html)
{
	var node = document.createElement(type);

	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
 
	if(html) 
		node.innerHTML = html;
	
	return node;
}

function getId(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}

function getTag(name, parent){
	if(!parent)
		return document.getElementsByTagName(name);
	return parent.getElementsByTagName(name);
}

/*
 * Drag and drop support adapted fom http://www.hunlock.com/blogs/Javascript_Drag_and_Drop
 */

var savedTarget=null;                           // The target layer (effectively vidPane)
var orgCursor=null;                             // The original mouse style so we can restore it
var dragOK=false;                               // True if we're allowed to move the element under mouse
var dragXoffset=0;                              // How much we've moved the element on the horozontal
var dragYoffset=0;                              // How much we've moved the element on the verticle

var didDrag=false;								//set to true when we do a drag
	
	
function moveHandler(e){
	if (e == null) return;// { e = window.event } 
	if ( e.button<=1 && dragOK ){
		savedTarget.style.left = e.clientX - dragXoffset + 'px';
		savedTarget.style.top = e.clientY - dragYoffset + 'px';
		return false;
	}
}

function dragCleanup(e) {
	document.removeEventListener('mousemove',moveHandler,false);
	document.removeEventListener('mouseup',dragCleanup,false);
	savedTarget.style.cursor=orgCursor;

	dragOK=false; //its been dragged now
	didDrag=true;
	
}

function dragHandler(e){

	var htype='-moz-grabbing';
	if (e == null) return;//{ e = window.event;}  // htype='move';} 
	var target = e.target;// != null ? e.target : e.srcElement;
	orgCursor=target.style.cursor;

	if(target.nodeName!='DIV')
		return;

	if (target = clickedInsideID(target, 'divDic')) {
		savedTarget=target;       
		target.style.cursor=htype;
		dragOK=true;
		dragXoffset = e.clientX-target.offsetLeft;
		dragYoffset = e.clientY-target.offsetTop;
		
		//set the left before removing the right
		target.style.left = e.clientX - dragXoffset + 'px';
		target.style.right = null;
		
		
		document.addEventListener('mousemove',moveHandler,false);
		document.addEventListener('mouseup',dragCleanup,false);
		return false;
	}
}

function clickedInsideID(target, id) {

	if (target.getAttribute('id')==id)
		return getId(id);
	
	if (target.parentNode) {
		while (target = target.parentNode) {
			try{
				if (target.getAttribute('id')==id)
					return getId(id);
			}catch(e){
			}
		}
	}
	
	return null;
}
//end drag code


/*
 * Images
 */
function images()
{
	imgLookup = createElement('img',{border:0});
	imgLookup.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC';
}

/*
 * 获取所选文字区域的高度 && document.selection.type == "Text"
 */
function getSelectionHeight() {
    var selHeight = 0;
    if (document.selection) {
        var range = document.selection.createRange();
        selHeight = range.boundingHeight;
		range.detach();
    } else if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            if (!range.collapsed && range.getClientRects) {
				rects = range.getClientRects();
                var selTop = rects[0].top;
                selHeight = rects[rects.length-1].bottom - selTop;
            }
        }
    }
	selHeight = parseInt(selHeight);
    return selHeight;
}

/*
 * 获取所选区域的Left
 */
function getSelectionLeft() {
    var selLeft = 0;
    if (document.selection) {
        var range = document.selection.createRange();
        selLeft = range.getClientRects()[0].left;
		range.detach();
    } else if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
			ranges = [];
			sel = window.getSelection();
            var range = sel.getRangeAt(0);
            if (range.getClientRects) {
				var rects = range.getClientRects();
                selLeft = range.getClientRects()[0].left;
				for (var i = 0; i != rects.length; i++) {
					if(selLeft > rects[i].left)
						selLeft = rects[i].left;
				}
            }
        }
    }
	selLeft = parseInt(selLeft);
    return selLeft;
}

/*
 * 获取所选区域的Top
 */
function getSelectionTop() {
    var selTop = 0;
    if (document.selection) {
        var range = document.selection.createRange();
        selTop = range.getClientRects()[0].top;
		range.detach();
    } else if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            if (range.getClientRects) {
                selTop = range.getClientRects()[0].top;
            }
        }
    }
	selTop = parseInt(selTop);
    return selTop;
}