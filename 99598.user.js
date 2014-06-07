// ==UserScript==
// @name          	Texnolize Translator New Version
// @namespace     	Texnolize Translator.
// @description		Translator on every web page only with block mouse.
// @version		4.0
// @include        	http://*
// @include        	https://*
// ==/UserScript==
const HREF_NO = 'javascript:void(0)';
var imgLookup;
var txtSel; // text selected
var currentURL;
var languagesGoogle;
var initialized = false;


//setup events
document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);


function mousedownCleaning(evt){

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


function showLookupIcon(evt){

	if(!evt.ctrlKey && GM_getValue('ctrl'))//ctrl key
		return;

	if(!initialized){
		images();
		css();
		initialized = true;
	}
	
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	txtSel = getSelection(evt);
	
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
	divLookup = createElement('div', {id:'divLookup', style:'background-color:#CCFF66; color:#000000; position:absolute; top:'+(evt.clientY+window.pageYOffset+10)+'px; left:'+(evt.clientX+window.pageXOffset+10)+'px; padding:3px; z-index:999999999; -moz-border-radius:3px;'});
	divLookup.appendChild(imgLookup.cloneNode(false));
	divLookup.addEventListener('mouseover', lookup, false);
	document.body.appendChild(divLookup);	
	
}




function lookup(evt){

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
		return;
	}
	
	
	//cleanup divs
	if(divDic = getId('divDic'))
	{
		divDic.parentNode.removeChild(divDic);
	}	
	divLookup.parentNode.removeChild(divLookup);
	
	
	//div container
	divDic = createElement('div', {id:'divDic', style:'background-color:#CCFF66; color:#000000; position:absolute; top:'+top+'; left:'+left+'; min-width:250px; min-height:50px; max-width:50%; padding:5px; font-size:small; text-align:left; z-index:999999999; -moz-border-radius:3px;'});
	divDic.addEventListener('mousedown', dragHandler, false);
	document.body.appendChild(divDic);

	
	//div result
	divResult = createElement('div', {id:'divResult', style:'overflow:auto; padding:3px;'}, null, 'Texnolize process data...');
	divDic.appendChild(divResult);	
	

	//options link
	divDic.appendChild(createElement('span', {id:'optionsLink', title:'options', href:HREF_NO, style:'position:absolute; bottom:3px; right:5px; font-size:small; text-decoration:none; cursor:pointer;'}, 'click options false', 'More Language'));

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
		tl = GM_getValue('to') ? GM_getValue('to') : "id";
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
	
	
	//store query as attribute
	getId('divDic').setAttribute('query', txtSel);
	
	
	//other searches
	divDic.appendChild(createElement('span',{id:'spanOtherSearches', title:'search other sites', style:'position:absolute; left:5px; bottom:3px; cursor:pointer; font-size:small;'},'mouseover otherSites false','+'));	
}


function quickLookup(){

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


function otherSites(evt){

	var ul, li, query = getId('divDic').getAttribute('query').replace(/\s+$/,'').replace(/^\s+/,'');

	var sites = [
	
		{name:'Google Search', href:'http://www.google.com/search?q='+query.replace(/\s+/g,'+')},
		
		{name:'Google Images', href:'http://www.google.com/images?q='+query.replace(/\s+/g,'+')},
		
		{name:'The Free Dictionary', href:'http://www.thefreedictionary.com/'+query.replace(/\s+/g,'+')},
		
		{name:'Urban Dictionary', href:'http://www.urbandictionary.com/define.php?term='+query.replace(/\s+/g,'+')},
		
		{name:'Wikipedia', href:'http://www.wikipedia.org/w/index.php?title=Special%3ASearch&search='+query.replace(/\s+/g,'+')},
		
		{name:'Texnolize', 
href:'http://www.texnolize-evolution.co.cc/ '+query.replace(/\s+/g,'+')},
		
		{name:'Youtube', href:'http://www.youtube.com/results?search_query='+query.replace(/\s+/g,'+')}

	];
	
	getId('divDic').appendChild(createElement('br'));
	getId('divDic').appendChild(document.createTextNode('Search "'+(query.match(/^[\s\S]{15}/) ? query.match(/^[\s\S]{15}/)[0]+'...' : query.match(/^[\s\S]+/)[0] )+'" at:'));
	ul = getId('divDic').appendChild(createElement('ul'));
	
	for(var i=0; i<sites.length; i++){
		li = ul.appendChild(createElement('li'));
		li.appendChild(createElement('a', {target:'_blank', href:sites[i].href}, null, sites[i].name));
	}
	
	evt.target.parentNode.removeChild(evt.target);
}


function extractResult(resp){	

	//select body and remove some tags
	var html = resp.responseText.match(/\<body[^\>]*\>([\s\S]+)\<\/body\>/)[1];
	html = html.replace(/\<script[^\<]+\<\/script\>/ig, '');
	html = html.replace(/\<iframe[^\<]+\<\/iframe\>/ig, '');
	
	//append requested page as hidden iframe
	var iframe = document.body.appendChild(createElement('iframe', {style:'visibility:hidden;'}));	
	var divExtract = iframe.contentWindow.document.body.appendChild(createElement('div', {id:'divExtract'}, null, html));
	divExtract = document.importNode(divExtract, true);
	iframe.parentNode.removeChild(iframe);

 
	//adjust link(s)
	var arrs = getTag('a',divExtract);
	for(var i=0; i<arrs.length; i++){
		arrs[i].setAttribute('target','_blank');
		arrs[i].setAttribute('class','gootranslink');
	}
	
	//gather info
	var translation = trim( xp('.//span[@id="result_box"]', divExtract)[0].textContent );
	var dict = xp('.//div[@id="dict"]', divExtract)[0];
	if(dict){
		try{
			var dict_head = xp('.//p[@id="dict_head"]', divExtract)[0];
			var details_link = xp('.//a', dict_head)[0];
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
		getId('divResult').innerHTML += '<br><br><div id="dict" style="background-color:##66FFFF; color:#000000; padding:5px; -moz-border-radius:3px; margin-bottom:10px; max-height:180px; overflow-y:auto; overflow-x:hidden; font-size:small;">'+dict+'</div>';
	}
	
	
	//no translation? 
	if( getId('spanOtherSearches').innerHTML=='+'  &&  
		translation.match( new RegExp(getId('divDic').getAttribute('query').replace(/(^\s*|\s*$)/g,''),'i') ) ) {
		//show search links
		otherSites({target:getId('spanOtherSearches')});
	}
	
}


function trim(str){
	return str.replace(/^\s+/,'').replace(/\s+$/,'');
}


function getSelection(evt){

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


function options(evt){

	if(!languagesGoogle){
		languagesGoogle = '<option value="auto">Detect language</option><option  value="sq">Albanian</option><option  value="ar">Arabic</option><option  value="bg">Bulgarian</option><option  value="ca">Catalan</option><option  value="zh-CN">Chinese</option><option  value="hr">Croatian</option><option  value="cs">Czech</option><option  value="da">Danish</option><option  value="nl">Dutch</option><option  value="en">English</option><option  value="et">Estonian</option><option  value="tl">Filipino</option><option  value="fi">Finnish</option><option  value="fr">French</option><option  value="gl">Galician</option><option  value="de">German</option><option  value="el">Greek</option><option  value="iw">Hebrew</option><option  value="hi">Hindi</option><option  value="hu">Hungarian</option><option  value="id">Indonesian</option><option  value="it">Italian</option><option  value="ja">Japanese</option><option  value="ko">Korean</option><option  value="lv">Latvian</option><option  value="lt">Lithuanian</option><option  value="mt">Maltese</option><option  value="no">Norwegian</option><option  value="pl">Polish</option><option  value="pt">Portuguese</option><option  value="ro">Romanian</option><option  value="ru">Russian</option><option  value="sr">Serbian</option><option  value="sk">Slovak</option><option  value="sl">Slovenian</option><option value="es">Spanish</option><option  value="sv">Swedish</option><option  value="th">Thai</option><option  value="tr">Turkish</option><option  value="uk">Ukrainian</option><option  value="vi">Vietnamese</option>';
	}
	var divOptions = getId('divOpt');
	
	if(!divOptions)//show options
	{
		divOptions = createElement('div', {id:'divOpt', style:'background-color:##66FFFF; position:relative; padding:5px;'});
		getId('divDic').appendChild(divOptions);
		getId('optionsLink').style.visibility = 'hidden';

		
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
		
		//use ctrl 
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('input', {id:'checkCtrl', type:'checkbox'}));
		divOptions.appendChild(createElement('span', null, null,'Use Ctrl key'));
		getId('checkCtrl').checked = GM_getValue('ctrl');
		
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
		getId('optionsLink').style.visibility = 'visible';
	}
}

function saveOptions(evt){

	var from = getId('optSelLangFrom').value;
	var to = getId('optSelLangTo').value;
	var ctrl = getId('checkCtrl').checked;
	
	GM_setValue('from', from);
	GM_setValue('to', to);
	GM_setValue('ctrl', ctrl);
	
	getId('divDic').removeChild(getId('divOpt'));
	getId('optionsLink').style.visibility = 'visible';
}





function css(){

	var style = createElement('style',{type:"text/css"},null,""+	
	
		'a.gootranslink:link {color: #000000 !important; text-decoration: underline !important;}'  +  
		'a.gootranslink:visited {color: #000000 !important; text-decoration: underline !important;}'+ 
		'a.gootranslink:hover {color: #000000 !important; text-decoration: underline !important;}'  +
		'a.gootranslink:active {color: #000000 !important; text-decoration: underline !important;}' +
		
		'#dict table {font-size:13px; line-height:1.5em; margin-left:5px; border:0px; background-color:##66FFFF; color:black; }'+
		'#dict td {padding-right:29px; vertical-align:top; border:0px; color:black; background-color:##66FFFF;}'
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
		div.setAttribute('style', 'background-color:#000000; position:fixed; bottom:3px; left:3px; width:50%; z-index:999999999;');
		
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
	imgLookup.src = 'data:image/gif;base64,R0lGODlhEAALALMMAOXp8a2503CHtOrt9L3G2+Dl7vL0+J6sy4yew1Jvp/T2+e/y9v///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCwAMACwAAAAAEAALAAAEK5DJSau91KxlpObepinKIi2kyaAlq7pnCq9p3NZ0aW/47H4dBjAEwhiPlAgAIfkECQsADAAsAAAAAAQACwAABA9QpCQRmhbflPnu4HdJVAQAIfkECQsADAAsAAAAABAACwAABDKQySlSEnOGc4JMCJJk0kEQxxeOpImqIsm4KQPG7VnfbEbDvcnPtpINebJNByiTVS6yCAAh+QQJCwAMACwAAAAAEAALAAAEPpDJSaVISVQWzglSgiAJUBSAdBDEEY5JMQyFyrqMSMq03b67WY2x+uVgvGERp4sJfUyYCQUFJjadj3WzuWQiACH5BAkLAAwALAAAAAAQAAsAAAQ9kMlJq73hnGDWMhJQFIB0EMSxKMoiFcNQmKjKugws0+navrEZ49S7AXfDmg+nExIPnU9oVEqmLpXMBouNAAAh+QQFCwAMACwAAAAAEAALAAAEM5DJSau91KxlpOYSUBTAoiiLZKJSMQzFmjJy+8bnXDMuvO89HIuWs8E+HQYyNAJgntBKBAAh+QQFFAAMACwMAAIABAAHAAAEDNCsJZWaFt+V+ZVUBAA7';
}
