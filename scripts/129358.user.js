// ==UserScript==
// @name           Google Translator Tooltip Pier's Mod
// @namespace      pier
// @description    Translates selected text into a tooltip.
// @include        http://*
// @include        https://*
// @updateURL	   https://userscripts.org/scripts/source/129358.meta.js
// @downloadURL	   https://userscripts.org/scripts/source/129358.user.js
// @version        0.3.1
// ==/UserScript==
//Based on the script https://userscripts.org/scripts/show/36898
//Many tanks to the original autor

const HREF_NO = 'javascript:void(0)';
var imgLookup, txtSel, currentURL, languagesGoogle;
var initialized = false;
var Upd = false;
//var TLD = "com";//GM_getValue('TLD') ? GM_getValue('TLD') : "com";

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
	{
		if(!clickedInsideID(evt.target,'divLookup'))
			divLookup.parentNode.removeChild(divLookup);			
			
	}	
		
}


function showLookupIcon(evt){

	if(!evt.ctrlKey && GM_getValue('ctrl'))//ctrl key
		return;
	
	if(evt.button == 2){
		mousedownCleaning(evt)
		return;
	}
	
	
	
	if(!initialized){
		images();
		checkupd();
		css();	
		initialized = true;
	}
	
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
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
		if(!clickedInsideID(evt.target,'divLookup'))
			divLookup.parentNode.removeChild(divLookup);
		return
	}	
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
		{	
			if(!clickedInsideID(evt.target,'divLookup'))
				divLookup.parentNode.removeChild(divLookup);
		}
		return;
	}



	
	if(!txtSel || txtSel=="")
	{
		if(divLookup)
		{	
			if(!clickedInsideID(evt.target,'divLookup'))
				divLookup.parentNode.removeChild(divLookup);
		}
		return;
	}
	else{
		
	//div container
	divLookup = createElement('div', {id:'divLookup', style:'background: rgba(0, 0, 0, 0); color:#FFFFFF; position:absolute; top:'+(evt.clientY+window.pageYOffset-35)+'px; left:'+(evt.clientX+window.pageXOffset+35)+'px; padding:0px; width:42px; height:16px; z-index:999999999;'});
	
	var gg = createElement('span');
	//var gURL= ";
	gg.innerHTML = "<a href=\"https://www.google.com/search?q="+encodeURIComponent(txtSel)+" \" > <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMPSURBVHjaJM7La1xVHMDx7++ce2cmk8lrMpMmtLXRRBqULNqIQpAGrLYFn6AUF2oLggqudNttK90IgojQ+sBNLCKICGKQilBbH/iK1hhNoTHNo6ZtOpPOTObee875ufDzF3xQVTKn+uPCkg4fmdbokQ/0tY9n1avTpH5Tz01N6h+CpsaoB/UYbQm6AaqqGO9Qa+H4mTkW2/2EbXdz8vNrXF5rkevqYuKt05Q7i9gQELEgAYBAxD9W1NgIvHNc/DdAqYdgLZtbMR9+vwhYCmN3kUzej0MIxuMQUrWoODSA0QCRRGzrLWDSgCHBiOXiZQfiEAu+q0iGxQaI1GDFkypkxhKJ+b90cLzC+T/XiPJ9hJBgTETAYhJYn5tnZchws6uPOIWBWoPqZkamnujSUo2R28q8cGiU6XNXmL9ap7sjcHRqB4JwauYdjh9sc+XOPVjJ4X2go5Wx59IWT1xYQnY/976eOHofT06NUWtmfPrTCpMjPYzs7OPkzGmO/fAmdrAHguKDBwySCWpipGGR6uEzmiUN9g4XeWBikGPP7ANRvl74mf3vHiaMDkAwICBpDIBmDnExOMGUbUopV+DCQpvXp/9mcb2JquWO8nZGR/ZC0sYEg/ERikOCIsQIoCbFZLXr7OhIeOyeCs8eGqO26VGBnf1DnH/6FAcq+9BWg6ACagkCCgQFshiZ/vJXfWhinP4+g6vPsXFjgdbmKkOjT1EoVcm84/GPXuWLtbNorhu8xWSB4C14EPWqjeuzLHz7En38RhS30MTQyMbYvv8TussjzK8vc+97R7hVTLHOol4ITsCBSUKTv86+yO3Rd+yqthnsLlLpzVOROda/eQXFsLuyi8HOAUgyvCjBQ+xixEGU1tcpuWUKcS+3Gg5xluCh2FHGt1eQrMmW6aTdaILEGJcjSIZXjwbFdPQOk68+SHPDoe0i6nNEUsJvWfJDj6K5Ep/9MsNqfQ3xBvEBtgwhDRByiKrimje0NvsGUf13TNYixAXygwew488zv3qVh99+mWVzDWM6CQioA43RE1/JfwMAPA+EdGeoPOMAAAAASUVORK5CYII=\" style=\" border:1px solid rgba(240,240,255,0.1); \" > </a>";
	divLookup.appendChild(gg);
	
	divLookup.appendChild(imgLookup.cloneNode(false));
	divLookup.lastChild.addEventListener('mouseover', lookup, false);
	document.body.appendChild(divLookup);	
	
	}

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
		if(divLookup = getId('divLookup'))
			divLookup.parentNode.removeChild(divLookup);
		return;
	}
	
	
	//cleanup divs
	if(divDic = getId('divDic'))
	{
		divDic.parentNode.removeChild(divDic);
	}	
	divLookup.parentNode.removeChild(divLookup);
	
	
	//div container
	divDic = createElement('div', {id:'divDic', style:'background: rgba(0, 0, 0, 0.7); color:#FFFFFF; position:absolute; top:'+top+'; left:'+left+'; min-width:250px; min-height:50px; max-width:50%; padding:5px; font-size:small; text-align:left; z-index:999999999; border-width:2px; border-style:solid; -moz-border-radius:6px;'});



	divDic.addEventListener('mousedown', dragHandler, false);
	document.body.appendChild(divDic);

	
	//div result
	divResult = createElement('div', {id:'divResult', style:'overflow:auto; padding:3px;'}, null, 'Loading...');
	divDic.appendChild(divResult);	
	

	
	//options link
	divDic.appendChild(createElement('span', {id:'optionsLink', title:'options', href:HREF_NO, style:'position:absolute; bottom:3px; right:5px; font-size:small; text-decoration:none; cursor:pointer;'}, 'click options false', '>>'));

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
		currentURL = "http://translate.google.com/?hl="+tl+"&text=" + encodeURIComponent(txtSel) + "&langpair=" + lang;
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
	
	if (Upd){
		
		divDic.appendChild(createElement('div',{id:'UpdateGTT', title:'Update', style:'background: rgba(255, 0, 0, 0.4); color:#FFFFFF; text-align: center; padding:5px; border-width:2px; border-style:solid; -moz-border-radius:6px; max-width:300px; overflow-y:auto; overflow-x:hidden; '}, null ,'<a  style="background: none !important; color:#FFFFFF; font-size:13px; "  href="http://userscripts.org/scripts/show/129358" target="_blank" >New version! Click here to install</a>'));	
		divDic.appendChild(createElement('br'));
	}
		
	
	//other searches
	divDic.appendChild(createElement('span',{id:'spanOtherSearches', title:'search other sites', style:'position:absolute; left:5px; bottom:3px; cursor:pointer; font-size:small;'},'mouseover otherSites false','+'));	
}


function quickLookup(){

	getId('divResult').innerHTML = 'Loading...'
	var tl = getId('optSelLangTo').value;
	currentURL = "http://translate.google.com/?hl="+tl+"&text=" + encodeURIComponent(document.getElementById('divDic').getAttribute('query',2)) + "&langpair=" + getId('optSelLangFrom').value + "|" + tl;
	
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
		
		{name:'IMDb', href:'http://www.imdb.com/find?s=all&q='+query.replace(/\s+/g,'+')},
		
		{name:'Youtube', href:'http://www.youtube.com/results?search_query='+query.replace(/\s+/g,'+')}

	];
	
	getId('divDic').appendChild(createElement('br'));
	getId('divDic').appendChild(document.createTextNode('Search "'+(query.match(/^[\s\S]{15}/) ? query.match(/^[\s\S]{15}/)[0]+'...' : query.match(/^[\s\S]+/)[0] )+'" at:'));
	ul = getId('divDic').appendChild(createElement('ul'));
	
	for(var i=0; i<sites.length; i++){
		li = ul.appendChild(createElement('li'));
		li.appendChild(createElement('a', {style:'color:#EEEEEE;',target:'_blank', href:sites[i].href}, null, sites[i].name));
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
 
	//gather info
	var translation = trim( xp('.//span[@id="result_box"]', divExtract)[0].textContent );
	var dict = xp('.//div[@id="gt-res-dict"]', divExtract)[0];

	if(dict){
		try{
			dict = dict.outerHTML.replace(/<div><div>/ig, ": </span><span> ").replace(/<\/div><div>/ig, ", ").replace(/<li>/ig, "<li><span>").replace(/<\/div><\/div>/ig, "</span>");
		}catch(e){
			dict = null;
		}
	}
	
	//parse info
	getId('divResult').innerHTML = '<a class="gootranslink" href="'+currentURL+'" target="_blank">' + translation + '</a><br><br>';
	if ( dict.length > 80 ){
		
		getId('divResult').innerHTML += '<div id="dict" style="background: rgba(0, 0, 0, 0.6); color:#FFFFFF; padding:5px; border-width:2px; border-style:solid; -moz-border-radius:6px; margin-bottom:10px; max-width:300px; overflow-y:auto; overflow-x:hidden; font-size:small;">'+dict+'</div>';

	}
	else if(translation == txtSel)
	otherSites({target:getId('spanOtherSearches')});//no translation?
	 
	
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
	//txt = encodeURIComponent(txt);//toString().replace(/\n/ig, '%0D%0A');
	return txt;
}


function options(evt){

	if(!languagesGoogle){
		languagesGoogle = '<option selected value="auto">Detect language</option><option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="hy">Armenian</option><option value="az">Azerbaijani</option><option value="eu">Basque</option><option value="be">Belarusian</option><option value="bn">Bengali</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">Chinese</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="eo">Esperanto</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="ka">Georgian</option><option value="de">German</option><option value="el">Greek</option><option value="gu">Gujarati</option><option value="ht">Haitian Creole</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="kn">Kannada</option><option value="ko">Korean</option><option value="la">Latin</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mk">Macedonian</option><option value="ms">Malay</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="es">Spanish</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="ta">Tamil</option><option value="te">Telugu</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="ur">Urdu</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="yi">Yiddish</option>';
	}
		
	var divOptions = getId('divOpt');
	
	if(!divOptions)//show options
	{
		divOptions = createElement('div', {id:'divOpt', style:'background-color:FFFFFF; position:relative; padding:5px;'});
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
		getId('optSelLangTo').value = GM_getValue('to') ? GM_getValue('to') : "en";
		getId('optSelLangTo').addEventListener('change', quickLookup, false);
		
		//tld
		//divOptions.appendChild(createElement('br'));
		//divOptions.appendChild(createElement('span', null, null,'<br> Search on Google.'));
		//divOptions.appendChild(createElement('input', {id:'optSelTLD', type:'text'}, null, null));//http://translate.google.com/?hl=et&tab=wT
		//getId('optSelTLD').value = GM_getValue('TLD') ? GM_getValue('TLD') : "com";
		//getId('optSelTLD').addEventListener('change', quickLookup, false);
		
		//use ctrl 
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('input', {id:'checkCtrl', type:'checkbox'}));
		divOptions.appendChild(createElement('span', null, null,'Use Ctrl key'));
		getId('checkCtrl').checked = GM_getValue('ctrl');
		
		//save
		//divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click saveOptions false', '<br>- SAVE -'));
		
		//cancel
		divOptions.appendChild(createElement('span', null, null,'&nbsp; &nbsp; &nbsp;'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click options false', 'Cancel <br>'));
		


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
	//TLD = getId('optSelTLD').value;
	var ctrl = getId('checkCtrl').checked;
	
	GM_setValue('from', from);
	GM_setValue('to', to);
	GM_setValue('ctrl', ctrl);
	//GM_setValue('TLD', TLD);
	
	getId('divDic').removeChild(getId('divOpt'));
	getId('optionsLink').style.visibility = 'visible';
}



function css(){

	var style = createElement('style',{type:"text/css"},null,""+	
	
		'a.gootranslink:link {color: #CCCCCC !important; text-decoration: underline !important;}'  +  
		'a.gootranslink:visited {color: #CCCCCC !important; text-decoration: underline !important;}'+ 
		'a.gootranslink:hover {color: #CCCCCC !important; text-decoration: underline !important;}'  +
		'a.gootranslink:active {color: #CCCCCC !important; text-decoration: underline !important;}' +
		'#dict span:first-child {color: #3399FF;}'+
		'#dict h3{ background: none !important; color:#FFFFFF; font-size:13px; margin: 4px 4px 4px 4px;}'+
		'#dict ol{ background: none !important; color:#FFFFFF; font-size:13px;  margin-left: 8px; list-style: none;}'
		


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
		div.setAttribute('style', 'background-color:#000000; position:fixed; bottom:3px; left:3px; border-width:2px; border-style:solid; width:50%; z-index:999999999;');
		
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
	imgLookup = createElement('img',{style:' border:1px solid rgba(50,50,255,0.3);'});
	imgLookup.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIkSURBVHjafJPfS5NhFMc/m+9KF6lNZrhVuKRf6kUg3ghJt0IIQVZSN0Ip0U1G9B8IXtRFV9XVKIiaFwUD6SIqcGuji6C6GFQsWbh3YvrOV7e9bu+2p4unvdsbrnN1znnO+Z4f3/M4hBAY+XVBgxhGztLLZpHunhM0EYfz3+RoLMrL8KItalVNNAMQCsCzUIify8sApNUMgGUD3JyeagaA0mik1Qx+X48NqGY3naGQ+y0AviQSPHz0mNnbt/C2u5kLLrJ37K4VmNmBfLHAiunm17YJwMZFF0ptYccDRwBYeBHiaCBA4Nw11Mp/i9O1YOJsdFy9PEFazRD5EEOteGzVp31pZgNZDrkKu+9A38ryfilqS6rJ0D6NQXeOqqgw6mkjprkk3foaStksompbDAc9RC6Ns72p4fX5mdfkzABDPkPSmc1zoTPFPIMWuBNgOCjbPRPy03/yGN52N99ysGK6Aehv04muGLwp9gEw4jEx9DUJ4L9vY5LeB620tDgse9SzQ6Ui+KrBktYKwFTH9zqNQgjhupO0HOa9PpyTYQ6cHwPg7cBnvO1uSmbJitGNMlc+dZNc1+UIVV0eTVXP0HJdLjL76jUjHpOONoWPqyYzcYWZuMKTH7K7iYPZege1JACR02wjJecOMxNXiBbqtL47LTs+G+mUAAC7gewZ7pWL2t9lvVW3N+yn/Dff9iOdk2Gqz8cZeJoiXxL272calp66ccrxZwBv/uuqHYuQPQAAAABJRU5ErkJggg==';
}


function checkupd(){
	var d = new Date();
	if (GM_getValue('lastcheck') == d.getDate()) {
		return
	}
	GM_setValue('lastcheck',d.getDate());
	
	GM_xmlhttpRequest({
		method:"GET",
		url:'http://userscripts.org/scripts/source/129358.meta.js',
		onload:function(result) {
			if (result.responseText.indexOf('@version        0.3.1') == -1) {
				Upd = true;
				imgLookup.src = 'data:image/gif;base64,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';
			}
		}
	});
}
