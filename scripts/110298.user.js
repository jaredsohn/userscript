// ==UserScript==
// @name           ترجمة جوجل - الانترنت أسهل
// @namespace      meh
// @description    ترجمة التص الالى الى جوار البحث فى الويب - الصور الاخبار وغيرها 
// @include        http://*
// @include        https://*
// @require        http://code.jquery.com/jquery-1.5.1.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.10/jquery-ui.min.js
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
	divLookup = createElement('div', {id: 'divLookup', style: 'top:'+(evt.clientY+window.pageYOffset+10)+'px; left:'+(evt.clientX + window.pageXOffset + 10) + 'px;'});
	divLookup.appendChild(imgLookup.cloneNode(false));
	divLookup.addEventListener('mouseover', lookup, false);
	document.body.appendChild(divLookup);	
	
	repositionNode($('#divLookup'));
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
	divDic = createElement('div', {id:'divDic'});
	divDic.style.top = top;
	divDic.style.left = left;
	divDic.addEventListener('mousedown', dragHandler, false);
	document.body.appendChild(divDic);

	
	//div result
	divResult = createElement('div', {id:'divResult'}, null, 'Loading...');
	divDic.appendChild(divResult);	
	

	//options link
	divDic.appendChild(createElement('span', {id:'optionsLink', title:'options', href:HREF_NO}, 'click options false', '>>'));

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
					extractResultFrames(resp);
				}catch(e){
					GM_log(e);
				}
			}
		});	
	}
	
	
	//store query as attribute
	getId('divDic').setAttribute('query', txtSel);
	
	
	//other searches
	divDic.appendChild(createElement('span',{id:'spanOtherSearches', title:'search other sites'},'mouseover otherSites false','+'));	
}


function quickLookup(){

	getId('divResult').innerHTML = 'Loading...'
	currentURL = "http://www.google.com/translate_t?text=" + txtSel + "&langpair=" + getId('optSelLangFrom').value + "|" + getId('optSelLangTo').value;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: currentURL,
		onload: function(resp) {
			try{
				extractResultFrames(resp);
			}catch(e){
				GM_log(e);
			}
		}
	});	
}


function otherSites(evt){

	var ul, li, query = getId('divDic').getAttribute('query').replace(/\s+$/,'').replace(/^\s+/,'');

	var sites = [
	
		{name:'بحث جوجل', href:'http://www.google.com/search?q='+query.replace(/\s+/g,'+')},
		
		{name:'صور جوجل', href:'http://www.google.com/images?q='+query.replace(/\s+/g,'+')},
		
		{name:'أخبار جوجل', href:'http://www.google.com/news?q='+query.replace(/\s+/g,'+')},
		
		{name:'فيديوهات جوجل', href:'http://www.google.com/search?tbo=p&tbm=vid&source=vgc&hl=en&aq=f&sout=1&q='+query.replace(/\s+/g,'+')},
		
		{name:'ويكيبديا', href:'http://www.wikipedia.org/w/index.php?title=Special%3ASearch&search='+query.replace(/\s+/g,'+')},

		{name:'بحث ياهو', href:'http://search.yahoo.com/search?p='+query.replace(/\s+/g,'+')},

		{name:'صور ياهو', href:'http://images.search.yahoo.com/search/images?p='+query.replace(/\s+/g,'+')},

		{name:'فيديوهات ياهو', href:'http://video.search.yahoo.com/search/video?p='+query.replace(/\s+/g,'+')},

		{name:'بحث كتب', href:'http://www.google.com/search?q=filetype:pdf '+query.replace(/\s+/g,'+')},
				
		{name:'يوتيوب', href:'http://www.youtube.com/results?search_query='+query.replace(/\s+/g,'+')}


	];
	
	getId('divDic').appendChild(createElement('br'));
	getId('divDic').appendChild(document.createTextNode('Search "'+(query.match(/^[\s\S]{15}/) ? query.match(/^[\s\S]{15}/)[0]+'...' : query.match(/^[\s\S]+/)[0] )+'" at:'));
	ul = getId('divDic').appendChild(createElement('ul'));
	
	for(var i=0; i<sites.length; i++){
		li = ul.appendChild(createElement('li'));
		li.appendChild(createElement('a', {target:'_blank', href:sites[i].href}, null, sites[i].name));
	}
	
	evt.target.parentNode.removeChild(evt.target);
	
	repositionNode($('#divDic'));
}


function extractResultFrames(resp){	

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
	var dict = xp('.//div[@id="gt-res-dict"]', divExtract)[0];
	if(dict){
		try{
			dict.removeChild(getTag('h3',dict)[0]);
			dict = dict.innerHTML;
		}catch(e){
			dict = null;
		}
	}
	
	
	//parse info
	getId('divResult').innerHTML = '<a class="gootranslink" href="'+currentURL+'" target="_blank">' + translation + '</a>';
	if(dict)
	{
		getId('divResult').innerHTML += '<br><br><div id="dict">'+dict+'</div>';
	}
	
	repositionNode($('#divDic'));
}

function repositionNode(node){
	//reposition div if out of bounds
	var pos = node.offset();
	var w = node.width();
	var h = node.height();
	if(pos.left + w > window.innerWidth+window.pageXOffset){
		node.css('left', window.innerWidth+window.pageXOffset - w - 25);
	}
	if(pos.top + h > window.innerHeight+window.pageYOffset){
		node.css('top', window.innerHeight+window.pageYOffset - h - 25);
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
		languagesGoogle = '<option value="auto">إكتشاف الى للغه</option><option  value="sq">Albanian</option><option  value="ar">عربى</option><option  value="bg">Bulgarian</option><option  value="ca">Catalan</option><option  value="zh-TW">Chinese_TC</option><option  value="zh-CN">Chinese</option><option  value="hr">Croatian</option><option  value="cs">Czech</option><option  value="da">Danish</option><option  value="nl">Dutch</option><option  value="en">English</option><option  value="et">Estonian</option><option  value="tl">Filipino</option><option  value="fi">Finnish</option><option  value="fr">French</option><option  value="gl">Galician</option><option  value="de">German</option><option  value="el">Greek</option><option  value="iw">Hebrew</option><option  value="hi">Hindi</option><option  value="hu">Hungarian</option><option  value="id">Indonesian</option><option  value="it">Italian</option><option  value="ja">Japanese</option><option  value="ko">Korean</option><option  value="lv">Latvian</option><option  value="lt">Lithuanian</option><option  value="mt">Maltese</option><option  value="no">Norwegian</option><option  value="pl">Polish</option><option  value="pt">Portuguese</option><option  value="ro">Romanian</option><option  value="ru">Russian</option><option  value="sr">Serbian</option><option  value="sk">Slovak</option><option  value="sl">Slovenian</option><option value="es">Spanish</option><option  value="sv">Swedish</option><option  value="th">Thai</option><option  value="tr">Turkish</option><option  value="uk">Ukrainian</option><option  value="vi">Vietnamese</option>';
	}
	var divOptions = getId('divOpt');
	
	if(!divOptions)//show options
	{
		divOptions = createElement('div', {id:'divOpt'});
		getId('divDic').appendChild(divOptions);
		getId('optionsLink').style.visibility = 'hidden';

		
		//from
		divOptions.appendChild(createElement('span', null, null,'من:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangFrom'}, null, languagesGoogle));
		getId('optSelLangFrom').value = GM_getValue('from') ? GM_getValue('from') : "auto";
		getId('optSelLangFrom').addEventListener('change', quickLookup, false);
		
		//to
		divOptions.appendChild(createElement('span', null, null,' إلى:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangTo'}, null, languagesGoogle));
		getId('optSelLangTo').value = GM_getValue('to') ? GM_getValue('to') : "auto";
		getId('optSelLangTo').addEventListener('change', quickLookup, false);
		
		//use ctrl 
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('input', {id:'checkCtrl', type:'checkbox'}));
		divOptions.appendChild(createElement('span', null, null,'إستخدم مفتاح CTRL'));
		getId('checkCtrl').checked = GM_getValue('ctrl');
		
		//save
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click saveOptions false', 'حفظ'));
		
		//cancel
		divOptions.appendChild(createElement('span', null, null,'&nbsp;'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click options false', 'تجاهل'));
		
		repositionNode($('#divDic'));
		
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

	var style = createElement('style',{id:'css_googletranslatortooltip', type:"text/css"},null,""+	
	
		'a.gootranslink:link {color: #0000FF !important; text-decoration: underline !important;}'  +  
		'a.gootranslink:visited {color: #0000FF !important; text-decoration: underline !important;}'+ 
		'a.gootranslink:hover {color: #0000FF !important; text-decoration: underline !important;}'  +
		'a.gootranslink:active {color: #0000FF !important; text-decoration: underline !important;}' +
		
		'#divLookup { background-color:#FFFF77; color:#000000; position:absolute; padding:3px; z-index:999999999; -moz-border-radius:3px; }'+
		
		'#divDic { background-color:#FFFF77; color:#000000; position:absolute; min-width:250px; min-height:50px; max-width:50%; padding:5px; font-size:small; text-align:left; z-index:999999999; -moz-border-radius:3px; }'+
		
		'#divResult {overflow:auto; padding:3px;}'+
		
		'#divOpt { background-color:#FFFFAA; position:relative; padding:5px; }'+
		'#optionsLink {position:absolute; bottom:3px; right:5px; font-size:small; text-decoration:none; cursor:pointer;}'+
		
		'#spanOtherSearches {position:absolute; left:5px; bottom:3px; cursor:pointer; font-size:small;}'+
		
		'#dict { background-color:#FFFFAA; color:#000000; padding:5px; -moz-border-radius:3px; margin-bottom:10px; max-height:180px; overflow-y:auto; overflow-x:hidden; font-size:small;}'+
		
		'#dict > ol {list-style: none;}'+
		'#dict > ol > li {display:table-cell; }'
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
	imgLookup.src = 'data:image/gif,GIF89a%12%00%12%00%B3%00%00%FF%FF%FF%F7%F7%EF%CC%CC%CC%BD%BE%BD%99%99%99ZYZRUR%00%00%00%FE%01%02%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%04%14%00%FF%00%2C%00%00%00%00%12%00%12%00%00%04X0%C8I%2B%1D8%EB%3D%E4%00%60(%8A%85%17%0AG*%8C%40%19%7C%00J%08%C4%B1%92%26z%C76%FE%02%07%C2%89v%F0%7Dz%C3b%C8u%14%82V5%23o%A7%13%19L%BCY-%25%7D%A6l%DF%D0%F5%C7%02%85%5B%D82%90%CBT%87%D8i7%88Y%A8%DB%EFx%8B%DE%12%01%00%3B';
}
