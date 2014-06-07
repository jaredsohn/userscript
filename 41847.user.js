// ==UserScript==
// @name           Google Language API Translator Tooltip
// @namespace      
// @description    Translates selected text into a tooltip.
// @include        *
// ==/UserScript==

// 99% of the code of this script is taken from http://userscripts.org/scripts/show/36898
const HREF_NO = 'javascript:void(0)';

var body = getTag('body')[0];

//var  languagesGoogle = <><![CDATA[
//<option value="auto">Auto Detect</option>
//<option value="sq">Albanian</option>
//<option value="ar">Arabic</option>
//<option value="bg">Bulgarian</option>
//<option value="ca">Catalan</option>
//<option value="zh-CN">Chinese (Simplified)</option>
//<option value="zh-TW">Chinese (Traditional)</option>
//<option value="hr">Croatian</option>
//<option value="cs">Czech</option>
//<option value="da">Danish</option>
//<option value="nl">Dutch</option>
//<option value="en">English</option>
//<option value="et">Estonian</option>
//<option value="tl">Filipino</option>
//<option value="fi">Finnish</option>
//<option value="fr">French</option>
//<option value="gl">Galician</option>
//<option value="de">German</option>
//<option value="el">Greek</option>
//<option value="iw">Hebrew</option>
//<option value="hi">Hindi</option>
//<option value="hu">Hungarian</option>
//<option value="id">Indonesian</option>
//<option value="it">Italian</option>
//<option value="ja">Japanese</option>
//<option value="ko">Korean</option>
//<option value="lv">Latvian</option>
//<option value="lt">Lithuanian</option>
//<option value="mt">Maltese</option>
//<option value="no">Norwegian</option>
//<option value="pl">Polish</option>
//<option value="pt">Portuguese</option>
//<option value="ro">Romanian</option>
//<option value="ru">Russian</option>
//<option value="sr">Serbian</option>
//<option value="sk">Slovak</option>
//<option value="sl">Slovenian</option>
//<option value="es">Spanish</option>
//<option value="sv">Swedish</option>
//<option value="th">Thai</option>
//<option value="tr">Turkish</option>
//<option value="uk">Ukrainian</option>
//<option value="vi">Vietnamese</option>
//]]></>;

var  languagesGoogle = ''+
'<option value="auto">Auto Detect</option>'+
'<option value="sq">Albanian</option>'+
'<option value="ar">Arabic</option>'+
'<option value="bg">Bulgarian</option>'+
'<option value="ca">Catalan</option>'+
'<option value="zh-CN">Chinese (Simplified)</option>'+
'<option value="zh-TW">Chinese (Traditional)</option>'+
'<option value="hr">Croatian</option>'+
'<option value="cs">Czech</option>'+
'<option value="da">Danish</option>'+
'<option value="nl">Dutch</option>'+
'<option value="en">English</option>'+
'<option value="et">Estonian</option>'+
'<option value="tl">Filipino</option>'+
'<option value="fi">Finnish</option>'+
'<option value="fr">French</option>'+
'<option value="gl">Galician</option>'+
'<option value="de">German</option>'+
'<option value="el">Greek</option>'+
'<option value="iw">Hebrew</option>'+
'<option value="hi">Hindi</option>'+
'<option value="hu">Hungarian</option>'+
'<option value="id">Indonesian</option>'+
'<option value="it">Italian</option>'+
'<option value="ja">Japanese</option>'+
'<option value="ko">Korean</option>'+
'<option value="lv">Latvian</option>'+
'<option value="lt">Lithuanian</option>'+
'<option value="mt">Maltese</option>'+
'<option value="no">Norwegian</option>'+
'<option value="pl">Polish</option>'+
'<option value="pt">Portuguese</option>'+
'<option value="ro">Romanian</option>'+
'<option value="ru">Russian</option>'+
'<option value="sr">Serbian</option>'+
'<option value="sk">Slovak</option>'+
'<option value="sl">Slovenian</option>'+
'<option value="es">Spanish</option>'+
'<option value="sv">Swedish</option>'+
'<option value="th">Thai</option>'+
'<option value="tr">Turkish</option>'+
'<option value="uk">Ukrainian</option>'+
'<option value="vi">Vietnamese</option>';

var imgLookup;
images();

var txtSel; // text selected


document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);

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
	//divLookup = createElement('div', {id:'divLookup', style:'background-color:#FFFF77; color:#000000; position:absolute; top:'+(evt.clientY+window.pageYOffset+50)+'px; left:'+(evt.clientX+window.pageXOffset+50)+'px; padding:3px; z-index:10000;'});
	divLookup = createElement('div', {id:'divLookup', style:'background-color:#FFFF77; color:#000000; position:absolute; top:'+(evt.clientY+window.pageYOffset+50)+'px; left:10px; padding:3px; z-index:10000;'});

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
	divDic = createElement('div', {id:'divDic', style:'background-color:#FFFF77; color:#000000; position:absolute; top:'+top+'; left:'+left+'; min-width:250px; min-height:50px; max-width:50%; padding:5px; font-size:small; text-align:left; z-index:10000;'});
	divDic.addEventListener('mousedown', dragHandler, false);
	body.appendChild(divDic);

	//div result
	divResult = createElement('div', {id:'divResult', style:'overflow:auto; padding:3px;'}, null, 'Loading...');
	divDic.appendChild(divResult);		

	//options link
	divDic.appendChild(createElement('a', {id:'optionsLink', href:HREF_NO, style:'position:absolute; bottom:3px; right:3px; font-size:small; text-decoration:none;'}, 'click options false', '>>'));

	//request
	var sl, tl;
	sl = GM_getValue('from') ? GM_getValue('from') : "en";
	tl = GM_getValue('to') ? GM_getValue('to') : "en";
	if (sl == 'auto'){sl = '';}
	var googleapitranslatquery = "http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q="+escape(txtSel)+"&langpair=" + sl + "%7C" + tl;
	//GM_log(googleapitranslatquery);
	GM_xmlhttpRequest({
		method: 'GET',
		//url: "http://www.google.com/translate_t?text=" + txtSel + "&langpair=" + sl + "|" + tl,
		url: googleapitranslatquery,
		onload: function(resp) {
			//GM_log(resp.responseText);
			try{
				//translation = resp.responseText.match(/\"translatedText\"\:\"(.*?)\"\,\"detectedSourceLanguage/)[1];
				translation = resp.responseText.match(/\"translatedText\"\:\"(.*?)\"/)[1];
				translation = translation.replace(/\\u0026/g,'&');
				//translation = translation.replace(/\\u0026#39;/g,'\'');
				divResult.innerHTML = translation;
			}catch(e){
				divResult.innerHTML = "error: "+e;
			}
		}
	});	
}

function quickLookup()
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://www.google.com/translate_t?text=" + txtSel + "&langpair=" + getId('optSelLangFrom').value + "|" + getId('optSelLangTo').value,
		onload: function(resp) {
			//<div id="result_box" dir="ltr">translation</div>
			try{
				getId('divResult').innerHTML = resp.responseText.match(/<div id=result_box.*?>(.*?)</)[1];
			}catch(e){
				getId('divResult').innerHTML = "error: "+e;
			}
		}
	});	
}

function getSelection()
{
	var txt = null;
	//get selected text
	if (window.getSelection)
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
		divOptions = createElement('div', {id:'divOpt', style:'background-color:#FFFFAA; position:relative; padding:5px;'});
		getId('divDic').appendChild(divOptions);
		getId('optionsLink').style.visibility = 'hidden';
		
		//from
		divOptions.appendChild(createElement('span', null, null,'From:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangFrom'}, null, languagesGoogle));
		getId('optSelLangFrom').value = GM_getValue('from') ? GM_getValue('from') : "en";
		getId('optSelLangFrom').addEventListener('change', quickLookup, false);
		
		//to
		divOptions.appendChild(createElement('span', null, null,' To:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangTo'}, null, languagesGoogle));
		getId('optSelLangTo').value = GM_getValue('to') ? GM_getValue('to') : "en";;
		getId('optSelLangTo').addEventListener('change', quickLookup, false);
		
		//save
		divOptions.appendChild(createElement('span', null, null,'<br>'));
		divOptions.appendChild(createElement('a', {href:HREF_NO}, 'click saveOptions false', 'save'));
		
		//cancel
		divOptions.appendChild(createElement('span', null, null,'&nbsp;'));
		divOptions.appendChild(createElement('a', {href:HREF_NO}, 'click options false', 'cancel'));
		
	}
	else//hide options
	{
		divOptions.parentNode.removeChild(divOptions);
		getId('optionsLink').style.visibility = 'visible';
	}
}

function saveOptions(evt)
{
	var from = getId('optSelLangFrom').value;
	var to = getId('optSelLangTo').value;
	
	GM_setValue('from', from);
	GM_setValue('to', to);
	
	getId('divDic').removeChild(getId('divOpt'));
	getId('optionsLink').style.visibility = 'visible';
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
	imgLookup.src = 'data:image/gif,GIF89a%12%00%12%00%B3%00%00%FF%FF%FF%F7%F7%EF%CC%CC%CC%BD%BE%BD%99%99%99ZYZRUR%00%00%00%FE%01%02%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%04%14%00%FF%00%2C%00%00%00%00%12%00%12%00%00%04X0%C8I%2B%1D8%EB%3D%E4%00%60(%8A%85%17%0AG*%8C%40%19%7C%00J%08%C4%B1%92%26z%C76%FE%02%07%C2%89v%F0%7Dz%C3b%C8u%14%82V5%23o%A7%13%19L%BCY-%25%7D%A6l%DF%D0%F5%C7%02%85%5B%D82%90%CBT%87%D8i7%88Y%A8%DB%EFx%8B%DE%12%01%00%3B';
}
