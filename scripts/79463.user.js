// ==UserScript==
// @name           Google Translator Tooltip
// @namespace      meh
// @description    Translates selected text into a tooltip.
// @include        http://*
// ==/UserScript==
const HREF_NO = 'javascript:void(0)';
var body = getTag('body')[0];
var imgLookup;
var txtSel; // text selected
var currentURL;
var  languagesGoogle = '<option value="auto">自动检测</option><option  value="zh-CN">中文 (简体)</option><option  value="en">英语</option><option  value="ja">日语</option><option  value="fr">法语 French</option><option  value="de">德语 German</option><option  value="ru">俄语 Russian</option><option  value="ko">韩语 Korean</option><option  value="sq">阿尔巴尼亚语 Albanian</option><option  value="ar">阿拉伯语 Arabic</option><option  value="bg">保加利亚语 Bulgarian</option><option  value="ca">嘉泰罗尼亚语 Catalan</option><option  value="hr">克罗埃西亚语 Croatian</option><option  value="cs">捷克语 Czech</option><option  value="da">丹麦文 Danish</option><option  value="nl">荷兰 Dutch</option><option  value="et">爱沙尼亚语 Estonian</option><option  value="tl">菲律宾文 Filipino</option><option  value="fi">芬兰语 Finnish</option><option  value="gl">加利西亚语 Galician</option><option  value="el">希腊语 Greek</option><option  value="iw">希伯来文 Hebrew</option><option  value="hi">北印度文 Hindi</option><option  value="hu">匈牙利语 Hungarian</option><option  value="id">印尼语 Indonesian</option><option  value="it">意大利语 Italian</option><option  value="lv">拉脱维亚语 Latvian</option><option  value="lt">立陶宛语 Lithuanian</option><option  value="mt">马尔他语 Maltese</option><option  value="no">挪威语 Norwegian</option><option  value="pl">波兰语 Polish</option><option  value="pt">葡萄牙语 Portuguese</option><option  value="ro">罗马尼亚语 Romanian</option><option  value="sr">塞尔维亚语 Serbian</option><option  value="sk">斯洛伐克语 Slovak</option><option  value="sl">斯洛文尼亚语 Slovenian</option><option value="es">西班牙语 Spanish</option><option  value="sv">瑞典语 Swedish</option><option  value="th">泰语 Thai</option><option  value="tr">土耳其语 Turkish</option><option  value="uk">乌克兰语 Ukrainian</option><option  value="vi">越南语 Vietnamese</option>';


//init 
images();
css();


//setup events
document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);



document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);
GM_registerMenuCommand("启用/停用Google翻译", function() {
used=(used!="do")?"do":"dont";
GM_setValue('enable', used);
});



function mousedownCleaning(evt)
{	
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	
	if(divDic)
	{
		if(!clickedInsideID(evt.target,'divDic'))
			divDic.parentNode.removeChild(divDic);
	}	
	
	if(divLookup)
		divLookup.parentNode.removeChild(divLookup);
}


function showLookupIcon(evt)
{
	if(!evt.ctrlKey && GM_getValue('ctrl'))//ctrl key
		return;
	
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	txtSel = getSelection(evt);

	used=GM_getValue('enable')?GM_getValue('enable'):"do";
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	txtSel = getSelection();
	if(used!="do"){
	return
	}
	
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
	divLookup = createElement('div', {id:'divLookup', style:'background-color:#F0FFF0; color:#000000; position:absolute; top:'+(evt.clientY+window.pageYOffset+10)+'px; left:'+(evt.clientX+window.pageXOffset+10)+'px; padding:3px; z-index:10000; -moz-border-radius:3px;'});
	divLookup.appendChild(imgLookup.cloneNode(false));
	divLookup.addEventListener('mouseover', lookup, false);
	body.appendChild(divLookup);	
	
	
}



function lookup(evt)
{
	var divResult = null;
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	var top = divLookup.style.top;
	var left = divLookup.style.left;


	//no text selected
	if(!txtSel || txtSel=="")
	{
		
		if(divDic = getId('divDic'))
			divDic.parentNode.removeChild(divDic);
		//divLookup.parentNode.removeChild(divLookup);
		return;
	}	

	
	//cleanup divs
	if(divDic = getId('divDic'))
	{
		divDic.parentNode.removeChild(divDic);
	}	
	divLookup.parentNode.removeChild(divLookup);
	
		
	//div container
	divDic = createElement('div', {id:'divDic', style:'background-color:#D6E9F8; border:2px solid #F5DEB3; color:#000000; position:absolute; top:'+top+'; left:'+left+'; min-width:250px; min-height:50px; max-width:50%; padding:5px; font-size:small; text-align:left; z-index:10000; -moz-border-radius:3px;'});
	divDic.addEventListener('mousedown', dragHandler, false);
	body.appendChild(divDic);

	//div result
	divResult = createElement('div', {id:'divResult', style:'overflow:auto; padding:3px;'}, null, 'Loading...');
	divDic.appendChild(divResult);		

	//options link
	divDic.appendChild(createElement('a', {class:"gootranslink", id:'optionsLink', href:HREF_NO, style:'position:absolute; bottom:3px; right:3px; font-size:small; text-decoration:none;'}, 'click options false', '▼'));

	//lookup
	if( (txtSel+" ").search(/^\s*https?:\/\//) > -1 ) 
	{
		divResult.innerHTML = '<a class="gootranslink" href="'+txtSel+'" target="_blank" >'+txtSel+'</a>';
	}
	else if( (txtSel+" ").search(/^\s*\S+(\.\S+)+/) > -1 ) // site.dom
	{
		divResult.innerHTML = '<a class="gootranslink" href="http://'+txtSel+'" target="_blank" >'+txtSel+'</a>';
	}
	else 
	{
		var sl, tl, lang;
		sl = GM_getValue('from') ? GM_getValue('from') : "auto";
		tl = GM_getValue('to') ? GM_getValue('to') : "auto";
		lang = sl + "|" + tl;
		currentURL = "http://www.google.com/translate_t?text=" + txtSel + "&langpair=" + lang;
		GM_xmlhttpRequest({
			method: 'GET',
			url: currentURL,
			onload: function(resp) {
				try{
					extractResult(resp);
				}catch(e){
					GM_log(e);
				}
			}
		});	
	}
}


function quickLookup()
{
	getId('divResult').innerHTML = 'Loading...'
	currentURL = "http://www.google.com/translate_t?text=" + txtSel + "&langpair=" + getId('optSelLangFrom').value + "|" + getId('optSelLangTo').value;
	GM_xmlhttpRequest({
		method: 'GET',
		url: currentURL,
		onload: function(resp) {
			try{
				extractResult(resp);
			}catch(e){
				GM_log(e);
			}
		}
	});	
}


function extractResult(resp)
{	
	//select body and remove some tags
	var html = resp.responseText.match(/\<body[^\>]*\>([\s\S]+)\<\/body\>/)[1];
	html = html.replace(/\<script[^\<]+\<\/script\>/ig, '');
	html = html.replace(/\<iframe[^\<]+\<\/iframe\>/ig, '');
	
	//append requested page as hidden iframe
	var iframe = document.body.appendChild(createElement('iframe', {style:'display:none; visibility:hidden;'}));	
	iframe.contentWindow.document.body.appendChild(createElement('div', {id:'divExtract'}, null, html));
	var divExtract = iframe.contentWindow.document.getElementById('divExtract');

	 
	//adjust link(s)
	var arrs = getTag('a',divExtract);
	for(var i=0; i<arrs.length; i++){
		arrs[i].setAttribute('target','_blank');
		arrs[i].setAttribute('class','gootranslink');
	}
	
	//gather info
	var translation = xp('.//span[@id="result_box"]', divExtract, iframe.contentWindow.document)[0].textContent;
	var dict = xp('.//div[@id="dict"]', divExtract, iframe.contentWindow.document)[0];
	if(dict){
		try{
			var dict_head = xp('.//p[@id="dict_head"]', divExtract, iframe.contentWindow.document)[0];
			var details_link = xp('.//a', dict_head, iframe.contentWindow.document)[0];//.cloneNode(false);
			dict.appendChild(details_link);
			dict.removeChild(dict_head);
			dict = dict.innerHTML;
		}catch(e){
			dict = null;
		}
	}
	
	//parse info
	getId('divResult').innerHTML = '<a class="gootranslink" href="'+currentURL+'" target="_blank">' + translation + '</a>';
	if(dict)
	{
		getId('divResult').innerHTML += '<br><br><div id="dict" style="background-color:#D6E9F8; color:#000000; padding:5px; -moz-border-radius:3px; margin-bottom:10px; max-height:180px; overflow-y:auto; overflow-x:hidden; font-size:small;">'+dict+'</div>';
	}
	

	//cleanup
	iframe.parentNode.removeChild(iframe);
}


function getSelection(evt)
{
	var txt = null;
	//get selected text
	if(evt && evt.target.nodeName=='TEXTAREA')
	{
		 //var begin = evt.target.value.substr(0, evt.target.selectionStart); 
		 txt = evt.target.value.substr(evt.target.selectionStart, evt.target.selectionEnd - evt.target.selectionStart); 
		 //var end = evt.target.value.substr(evt.target.selectionEnd); 
		 //myArea.value = begin + text1 + selection + text2 + end; 		
	}
	else if (window.getSelection)
	{
		txt = window.getSelection();
	}
	else if (document.getSelection)
	{
		txt = document.getSelection();
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
		divOptions = createElement('div', {id:'divOpt', style:'background-color:#F0FFFF; position:relative; padding:5px;'});
		getId('divDic').appendChild(divOptions);
		getId('optionsLink').style.visibility = 'hidden';

		
		//from
		divOptions.appendChild(createElement('span', null, null,'从:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangFrom'}, null, languagesGoogle));
		getId('optSelLangFrom').value = GM_getValue('from') ? GM_getValue('from') : "auto";
		getId('optSelLangFrom').addEventListener('change', quickLookup, false);
		
		//to
		divOptions.appendChild(createElement('span', null, null,' 译作:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangTo'}, null, languagesGoogle));
		getId('optSelLangTo').value = GM_getValue('to') ? GM_getValue('to') : "auto";
		getId('optSelLangTo').addEventListener('change', quickLookup, false);

                //swap
		divOptions.appendChild(createElement('span', null, null,'&nbsp;'));
		divOptions.appendChild(createElement('a', {href:HREF_NO}, 'click swap false', '反转'));

		
		//use ctrl 
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('input', {id:'checkCtrl', type:'checkbox'}));
		divOptions.appendChild(createElement('span', null, null,'使用 Ctrl 键'));
		getId('checkCtrl').checked = GM_getValue('ctrl');
		
		//save
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click saveOptions false', '保存'));
		
		//cancel
		divOptions.appendChild(createElement('span', null, null,'&nbsp;'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click options false', '取消'));
		
	}
	else//hide options
	{
		divOptions.parentNode.removeChild(divOptions);
		getId('optionsLink').style.visibility = 'visible';
	}
}
function swap(evt)
{
	var from = getId('optSelLangFrom').value;
	var to = getId('optSelLangTo').value;
	getId('optSelLangFrom').value=to;
	getId('optSelLangTo').value=from;
	quickLookup();
}
function saveOptions(evt)
{
	var from = getId('optSelLangFrom').value;
	var to = getId('optSelLangTo').value;
	var ctrl = getId('checkCtrl').checked;
	
	GM_setValue('from', from);
	GM_setValue('to', to);
	GM_setValue('ctrl', ctrl);
	
	getId('divDic').removeChild(getId('divOpt'));
	getId('optionsLink').style.visibility = 'visible';
}





function css()
{
	var style = createElement('style',{type:"text/css"},null,""+	
	
		'a.gootranslink:link {color: #0000FF !important; text-decoration: underline !important;}'  +  
		'a.gootranslink:visited {color: #0000FF !important; text-decoration: underline !important;}'+ 
		'a.gootranslink:hover {color: #0000FF !important; text-decoration: underline !important;}'  +
		'a.gootranslink:active {color: #0000FF !important; text-decoration: underline !important;}' +
		
		'#dict table {font-size:13px; line-height:1.5em; margin-left:5px; border:0px; background-color:#9ACD32; color:black; }'+
		'#dict td {padding-right:29px; vertical-align:top; border:0px; color:black; background-color:#FDF5E6;}'
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

function xp(p, context, doc) {
  if (!context) 
	context = document;
  if (!doc) 
	doc = document;	
  var i, arr = [], xpr = doc.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) 
	arr.push(item);
  return arr;
}

function debug(str)
{
	
	var d = document.getElementById('debugg');
	if(!d){
		var div = document.createElement('div');
		div.setAttribute('id','divdebug');
		div.setAttribute('style', 'background-color:#000000; position:fixed; bottom:3px; left:3px; width:50%; z-index:9999;');
		
		var closeButton = document.createElement('input');
		closeButton.setAttribute('id','closedebug');
		closeButton.setAttribute('type', 'button');
		closeButton.setAttribute('value', 'close');
		closeButton.setAttribute('onClick', 'this.parentNode.parentNode.removeChild(this.parentNode);');
		
		d = document.createElement('textarea');
		d.setAttribute('id','debugg');
		d.setAttribute('style',"height:150px; width:99%; margin:2px;");
		
		div.appendChild(d);
		div.appendChild(document.createElement('br'));
		div.appendChild(closeButton);
		document.body.appendChild(div);
	}
	d.innerHTML += '\n'+str;
	d.scrollTop = d.scrollHeight;
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
	else if(clickedInsideID(target, 'dict'))
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
	imgLookup.src = 'data:image/gif,GIF89a%12%00%12%00%B3%00%00%FF%FF%FF%F7%F7%EF%CC%CC%CC%BD%BE%BD%99%99%99ZYZRUR%00%00%00%FE%01%02%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%04%14%00%FF%00%2C%00%00%00%00%12%00%12%00%00%04X0%C8I%2B%1D8%EB%3D%E4%00%60(%8A%85%17%0AG*%8C%40%19%7C%00J%08%C4%B1%92%26z%C76%FE%02%07%C2%89v%F0%7Dz%C3b%C8u%14%82V5%23o%A7%13%19L%BCY-%25%7D%A6l%DF%D0%F5%C7%02%85%5B%D82%90%CBT%87%D8i7%88Y%A8%DB%EFx%8B%DE%12%01%00%3B';
}
