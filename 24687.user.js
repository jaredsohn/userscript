// ==UserScript==
// @name           View image links
// @namespace      http://gaia.freera.net/~horance/userscripts/
// @description    generate album view for image links. all button has access key (the first letter).
// @include        http://www.wretch.cc/album/album.php*
// @include        http://*diggirl.net/*detail.jsp*
// @include        http://photo.xuite.net/*/*
// @include        http://www.pixnet.net/album/*
// ==/UserScript==
// $Author: horance $
(function(){
const MY_NAME = 'View image links';
const MY_NAMESPACE = 'http://gaia.freera.net/~horance/userscripts/';
const UPDATE_URL = 'https://opensvn.csie.org/MirrorScripts/userscripts/view.image.links.user.js';
const FILTER_URL = 'https://opensvn.csie.org/MirrorScripts/userscripts/view.image.links.filter.js';
checkUpdate();
/*
* see https://opensvn.csie.org/traccgi/MirrorScripts/trac.cgi/log/userscripts/view.image.links.user.js for change logs.
*/
var EMPTY_FEED_XML = '<?xml version="1.0" encoding="ISO-8859-1" ?><rss xmlns:media="http://search.yahoo.com/mrss" version="2.0"><channel></channel></rss>';
// PicLens API URL
//var PICLENS_API_URL = 'http://fundnav.googlepages.com/piclens.js';
var PICLENS_API_URL = 'http://lite.piclens.com/current/piclens.js';
loadPicLensAPI();
// filter map
var filterMap = {};

// current matched url regex
var currentMatch = '';

// filter
var filter = defaultFilter;

//filtering links
var urls = new Array();

//preload 5 images by default. if i == 0, this will load 0,1,2 elements in urls array.
//if i == 2, then 0,1,2,3,4 will be pre-loaded
var preload = 5;
//refresh url
urls = refreshURLs();
var piclensfeeddata = generateFeedDataForPicLens(urls);

//current edit
var curEdit = 1;

//initialize cache
if(preload % i == 0){
	preload ++;
}

//current image index
var i = 0;
var c_url = '';
var c_desc = '';
if(urls[i]){
	c_url = urls[i].src;
	c_desc = urls[i].desc;
}

// HTML injection ;)
var div = document.createElement('div');
div.innerHTML = '<div id="vil_display" style="display: none;" class="vil"><div id="vil_ctrlbar" class="vil">' +
    '<input type="button" id="vil_top" name="vil_top" accesskey="t" value="Top" class="vil"/>' +
    '<input type="button" id="vil_prev" name="vil_prev" accesskey="p" value="Prev"/>' +
    '<input type="button" id="vil_next" name="vil_next" accesskey="n" value="Next"/>' +
    '<input type="button" id="vil_end" name="vil_end" accesskey="e" value="End"/>' +
    '<input type="text" id="vil_input" name="vil_input" size="3" accesskey="i" value="'+i+'"/>/'+(urls.length-1)+
    '<input type="button" id="vil_jump" name="vil_jump" accesskey="g" value="Go"/>' +
    'fit <select id="vil_fit" name="vil_fit" accesskey="f"><option value="n">None</option>' +
    '<option value="h">Height</option><option value="w">Width</option><option value="b">Both</option></select> to: ' +
    '<input type="text" id="vil_width" name="vil_width" size="3" accesskey="w" value="800"/>px&nbsp; ' +
    'Style: <select id="vil_style" name="vil_style" accesskey="s"></select>' +
    '<input type="button" id="vil_hide" name="vil_hide" accesskey="h" value="Hide"/></div>' +
    '<div id="vil_infobar" class="vil"><a id="vil_url" href="'+ c_url +
    '" accesskey="o" target="_blank" title="open in new window">' + c_desc +'</a></div> ' +
    '<div id="vil_image" class="vil"><img id="vil_img" src="' + c_url +'"/>' +
    '</div></div><div id="vil_control" class="vil" style="display: block">' +
    '<input type="button" id="vil_show" name="vil_show" accesskey="v" value="View"/> ' +
    '<input type="button" id="vil_piclens" name="vil_piclens" accesskey="p" value="PicLens"/> ' +
    '<input type="button" id="vil_download" name="vil_download" accesskey="d" value="Download"/> ' +
    '<input type="button" id="vil_conf" name="vil_conf" accesskey="c" value="Config"/><br/> ' +
    '<p id="vil_download_panel" style="display: none">' +
    'Files to be downloaded: <br/><select multiple="true" id="vil_flist" name="vil_flist" size="20"></select><br/>' +
    '<input type="checkbox" id="check_save_index" name="check_save_index" value="1">Save index.html<br/>' +
    'Output Folder: <br/><input type="text" id="vil_output_path" name="vil_output_path" size="30" readonly="true">' +
    '<input type="button" id="vil_browse" name="vil_browse" accesskey="b" value="Browse"/><br/>' +
    '<input type="button" id="vil_start" name="vil_start" accesskey="s" value="Start"/>' +
    '</p>'+
    '<p id="vil_config" style="display: none">' +
    'Current Editing: <input type="radio" id="radio_filter" name="current_edit" accesskey="1" value="1" checked="checked">Filter ' +
    '<input type="radio" id="radio_style" name="current_edit" accesskey="2" value="2"> Style<br/>' +
    '<select id="vil_list" name="vil_list" accesskey="l"></select>' +
    '<input type="button" id="vil_del" name="vil_del" accesskey="d" value="Delete"/><br/>' +
    'URL Regex: <input type="text" id="vil_regex" name="vil_regex" accesskey="u" value="^.*foo.bar.com.*$"/><br/>' +
    'Filter function: <br/><textarea id="vil_filter" name="vil_filter" rows="20" accesskey="f"></textarea><br/>' +
    '<input type="checkbox" id="vil_autocheck" name="vil_autocheck" accesskey="a" value="1"/>Auto-Update?&nbsp;' +
    '<input type="button" id="vil_checknow" name="vil_checknow" accesskey="n" value="Check Now"/><br/>' +
    '<span id="vil_ac_config" style="display: none">Check Interval?(days):<input type="text" id="vil_ac_int" name="vil_ac_int" accesskey="i" value="1" size="2"/><br/></span>' +
    '<input type="button" id="vil_save" name="vil_save" accesskey="s" value="Save"/>' +
    '</p></div>';

document.body.insertBefore(div, document.body.firstChild);

// get object references
var img = _gel('vil_img');
var btn_prev = _gel('vil_prev');
var btn_next = _gel('vil_next');
var btn_top = _gel('vil_top');
var btn_end = _gel('vil_end');
var btn_jump = _gel('vil_jump');
var btn_del = _gel('vil_del');
var vil_fit = _gel('vil_fit');
var ctrl = _gel('vil_control');
var disp = _gel('vil_display');
var conf = _gel('vil_config');
var text_input = _gel('vil_input');
var text_width = _gel('vil_width');
var text_fg = _gel('vil_fg');
var text_bg = _gel('vil_bg');
var text_regex = _gel('vil_regex');
var text_filter = _gel('vil_filter');
var vil_list = _gel('vil_list');
var vil_style = _gel('vil_style');
var link_href = _gel('vil_url');
var radio_filter = _gel('radio_filter');
var radio_style = _gel('radio_style');
var disp_image = _gel('vil_image');
// main function to refresh config and URLs
function refreshURLs(){
	//load filters
	filterMap = loadFilterMap();
	//get filter
	filter = getFilter();
	//execute filter
	return getURLs();
}

//function to load filter map by GM_getValue
function loadFilterMap(){
	var filterSrc = GM_getValue('filters', 'no filter defined');
	if(filterSrc != 'no filter defined'){
		try {
			eval( 'var tmpMap = ' + filterSrc );
			return tmpMap;
		} catch (err){
			GM_log(filterSrc);
			alert('error parsing filter config! ' + err);
			// return empty map
			return {};
		}
	} else {
		return {};
	}
}

//get current filter by matching current window.location.href
function getFilter(){
	//filter loaded, matching document.location
	var loc = window.location.href;
	for( key in filterMap ){
		var regex = new RegExp(key, 'ig');
		if(regex && loc.match(regex)){
			filter = filterMap[key];
			currentMatch = key;
			return filter;
		}
	}
}

//exec filter to get URLS
function getURLs(){
	//get urls
	if(filter){
		urls = filter();
		//invalid return
		if(!urls || 'object' != typeof urls){
			alert('invalid return from filter function:' + urls);
			//fallback to default
			urls = defaultFilter();
		}
	} else {
		urls = defaultFilter();
	}
	if('string' == typeof urls[0]){
		for(var i=0;i<urls.length;i++){
			urls[i] = {src: urls[i], desc: urls[i]};
		}
	}
	//if div is added
	if(text_input){
		//update total count
		text_input.nextSibling.nodeValue = '/'+(urls.length-1);
		//reset image
		i = 0;
		showImage();
    }
	return urls;
}

//default filter function
function defaultFilter(){
	var myurls = new Array();
	var links = document.getElementsByTagName('a');
	for(var i=0;i<links.length;i++){
		if(links[i].href.match(/.*\.(jpg|gif|png)$/i)){
			myurls.push({ 'src': links[i].href, 'desc': links[i].innerHTML});
		}
	}
	return myurls;
}

//auto resize image, called by Event Listener
function resize(){
	link_href.innerHTML=c_desc;
	var w = parseInt(text_width.value);
	if(w){
		var f = vil_fit.value;
		if(f == 'w' || f == 'b'){// fit width
			if(f != 'b' || img.width > img.height){
				if(img.width > w){
					img.height = Math.round(w/img.width*img.height);
					img.width = w;
				}
			}
		}
		if(f == 'h' || f == 'b'){
			if(f != 'b' || img.height > img.width){
				if(img.height > w){
					img.width = Math.round(w/img.height*img.width);
					img.height = w;
				}
			}
		}
		if(f == 'n'){
			//reset inmage size
			img.removeAttribute('width');
			img.removeAttribute('height');
		}
	}else{
		alert('invalid width: '+text_width);
	}
	preloadImage();
    setButtons();
}
function MM_preload() { //v2.1 (OSL)
  if (document.images) {
    var imgFiles = MM_preload.arguments;
    if (document.preloadArray==null) document.preloadArray = new Array();
    document.preloadArray.length = imgFiles.length;
    var i = document.preloadArray.length;
    with (document) for (var j=0; j<imgFiles.length; j++) {
      preloadArray[i] = new Image;
      var idx = imgFiles[j];
      preloadArray[i].addEventListener('error', function(event){
				handleError(event, this , idx);
			}, true);
      preloadArray[i++].src = (urls[idx].src)?(urls[idx].src):(urls[idx]);
  	}
  }
}
function preloadImage(){
	var size = ((preload-1)/2);
	var start = (i-size)>0?(i-size):0;
	var end = (i+size > urls.length)?urls.length:i+size;
	var str = '';
	for(var j = start;j<end;j++){
		str += j;
		if((j+1)<end){
			str += ', ';
		}
	}
	eval('MM_preload('+str+')');
}

//navigation functions
//jump by user input
function jumpto(){
	var idx = parseInt(text_input.value);
	if(!idx || idx<0 || idx >= urls.length){
		alert('Invalid input: no such image');
	}else{
		i = idx;
		showImage();
	}
}

//prev image
function prev(){
    i--;
    if(i<0){
       alert('This is the first picture!');
    }else{
       showImage();
    }
}

//next image
function next(){
    i++;
    if(i >= urls.length){
       alert('This is the last picture!');
    }else{
       showImage();
    }
}

// first image
function top(){
	i=0;
	showImage();
}

// last image
function end(){
	i=urls.length-1;
	showImage();
}

// show display panel
function show(){
	if(urls.length==0){
		alert('no image links!');
		return;
	}
	ctrl.style.display = 'none';
	disp.style.display = 'block';
}

// hide display panel
function hide(){
	ctrl.style.display = 'block';
	disp.style.display = 'none';
}
// toggle config panel
function toggle(tid, flag){
	var obj = _gel(tid);
	if(obj){
		if(flag){
			obj.style.display = flag;
		}else{
			if(obj.style.display != 'none'){
				obj.style.display = 'none';
			}else{
				obj.style.display = '';
			}
		}
	}
}

//show image!
function showImage(){
	if(urls[i]){
		c_url = urls[i].src;
		c_desc = urls[i].desc;
		link_href.href=c_url;
		link_href.innerHTML=loadingimg+'&nbsp;&nbsp;loading......';
		//reset image size
		img.removeAttribute('width');
		img.removeAttribute('height');
		//load image
		img.src=c_url;
		img.alt=c_desc;
	}
}

// set navigation button state
function setButtons(){
	text_input.value=i;
	btn_top.disabled = false;
	btn_prev.disabled = false;
	btn_next.disabled = false;
	btn_end.disabled = false;
    if(i<=0){
    	btn_top.disabled = true;
    	btn_prev.disabled = true;
    }
    if(i>=urls.length-1){
    	btn_next.disabled = true;
    	btn_end.disabled = true;
    }
}

// prepare config list
function prepareConfigList(){
	var label1 = 'URL Regex: ';
	var label2 = 'Filter function:';
	var label3 = 'New Filter';
	var selectedValue = currentMatch;
	var dataMap = filterMap;
	if(curEdit == 2){
		label1 = 'CSS Name : ';
		label2 = 'CSS Style:';
		label3 = 'New Style';
		selectedValue = cssName;
		dataMap = cssMap;
	}
	text_regex.previousSibling.nodeValue = label1;
	text_filter.previousSibling.previousSibling.nodeValue = label2;
	var tmpstr = '<option value="--">'+label3+'</option>';
	for(key in dataMap){
		tmpstr += '<option value="'+key+'" '+((key == selectedValue)?'selected':'')+'>'+key+'</option>';
	}
	vil_list.innerHTML = tmpstr;
	listChange();
	var ac = GM_getValue('checkInterval','1');
	var isac = (parseInt(ac) > 0);
	_gel('vil_autocheck').checked = isac;
	_gel('vil_ac_int').value = (isac?ac:'1');
	toggle('vil_ac_config', (isac?'block':'none'));
}

// update UI, call by event listener
function listChange(){
	var isFilter = (curEdit == 1);
	var dataMap = (isFilter)?filterMap:cssMap;
	var def_value = (isFilter)?defaultFilter.toString():defaultStyle;
	var key = vil_list.value;
	if(key == '--'){
		btn_del.disabled = true;
		key = (isFilter?'^.*foo\\.bar\\.com.*$':'default');
	}else{
		btn_del.disabled = false;
	}
	text_regex.value = key;
	text_filter.value = (dataMap[key])?dataMap[key].toString():def_value;
	if(!isFilter){
		changeStyle(key);
	}
}

//save CSS or filter config
function saveData(){
	//check auto-update setting
	var ac = _gel('vil_autocheck').checked;
	if(ac){
		var days = parseInt(_gel('vil_ac_int').value);
		if(isNaN(days) || days < 1){
			alert('invalid check interval! (must be an integer and > 0)');
			_gel('vil_ac_int').focus();
			return;
		}else{
			GM_setValue('checkInterval',''+days);
		}
	}else{
		GM_setValue('checkInterval','-1');
	}
	
	var dataMap = filterMap;
	var dataValue = null;
	var saveTag = 'filters';
	var refreshFunction = refreshURLs;
	if(curEdit == 1){ // filter
		try {
			//test URL Regexp
			new RegExp(text_regex.value);
			//test filter code
			eval('var f = ' + text_filter.value);
			if( 'function' != typeof f ){
				throw 'invalid filter function';
			} else { //check return
				var us = f();
				if( 'object' != typeof us ){
					throw 'invalid return from filter: '+us;
				}
			}
			dataValue = f;
		}catch(ex){
			alert('error parsing URL Pattern or filter: ' + ex);
			return false;
		}
	}else if(curEdit == 2){
		saveTag = 'styleMap';
		dataMap = cssMap;
		dataValue = text_filter.value;
		refreshFunction = reloadStyle;
	}
	//all passed, store filter
	dataMap[text_regex.value] = dataValue;
	//save filterMap
	GM_setValue(saveTag, serializeMap(dataMap));
	//reload
	refreshFunction();
	//tell user we've done
	alert('data saved!');
	//reset config list
	prepareConfigList();
}

//delete CSS or filter
function deleteData(){
	var dataMap = filterMap;
	var saveTag = 'filters';
	var refreshFunction = refreshURLs;
	var confirmStr = 'Delete filter for ';
	if(curEdit == 2){
		saveTag = 'styleMap';
		dataMap = cssMap;
		refreshFunction = reloadStyle;
		confirmStr = 'Delete style: ';
	}
	if(confirm(confirmStr + text_regex.value + ' ?')){
		//there no way to remove value from map, instead we set it to null,
		// and skip it in function serializeMap()
		dataMap[text_regex.value] = null;
		//save
		GM_setValue(saveTag, serializeMap(dataMap));
		//reload
		refreshFunction();
		//reset config list
		prepareConfigList();
	}
}

//convert filter config to String
function serializeMap(map){
	var res = '{';
	for(key in map){
		if(map[key]){
			var mapValue = map[key];
			if(curEdit == 2){
				mapValue = '"' + map[key].replace(/\n/mg,'\\n').replace(/\r/mg,'\\r') + '"';
			}
			res+=('"' + key + '" : ' + mapValue + ',');
		}
	}
	res += '}';
	return res;
}

//change panel color
function changeColor(){
	disp.style.color = text_fg.value;
	disp.style.backgroundColor = text_bg.value;
}

//addGlobalStyle -- derived from http://diveintogreasemonkey.org/patterns/add-css.html
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    return style;
}

//register event listener for click
document.addEventListener('click', function(event) {
	if(event.target.name && event.target.name.match(/^vil/)){
	    if(event.target.name == 'vil_next'){
			next();
	    }else if(event.target.name == 'vil_prev'){
	      prev();
	    }else if(event.target.name == 'vil_show'){
	    	show();
	    }else if(event.target.name == 'vil_piclens'){
	    	startPicLensLite();
	    }else if(event.target.name == 'vil_hide'){
	    	hide();
	    }else if(event.target.name == 'vil_top'){
	    	top();
	    }else if(event.target.name == 'vil_end'){
	    	end();
	    }else if(event.target.name == 'vil_jump'){
	    	jumpto();
	    }else if(event.target.name == 'vil_color'){
	    	changeColor();
	    }else if(event.target.name == 'vil_conf'){
	    	toggle('vil_download_panel','none');
	    	prepareConfigList();
	    	toggle('vil_config');
	    }else if(event.target.name == 'vil_save'){
	    	saveData();
	    }else if(event.target.name == 'vil_del'){
	    	deleteData();
	    }else if(event.target.name == 'vil_download'){
	    	toggle('vil_config','none');
	    	prepareFileList();
	    	toggle('vil_download_panel');
	    }else if(event.target.name == 'vil_browse'){
	    	browseOutputFolder();
	    }else if(event.target.name == 'vil_start'){
	    	startDownload();
	    }else if(event.target.name == 'vil_autocheck'){
	    	var ac = _gel('vil_autocheck').checked;
	    	toggle('vil_ac_config', (ac?'block':'none'));
	    }else if(event.target.name == 'vil_checknow'){
	    	var ac = _gel('vil_checknow').checked;
				checkUpdate(true);
	    }
	}
}, true);
function handleError(event, imgobj, idx){
	GM_log('error loading img:'+imgobj.src + "current idx: "+idx);
}
//register event listener for img.onload
img.addEventListener('load', function(event){
		resize();
}, true);

img.addEventListener('error', function(event){
		handleError(event, this, i);
}, true);

//register event listener for select.onchange
vil_list.addEventListener('change', function(event){
		listChange();
}, true);

//register event listener for select.onchange
vil_style.addEventListener('change', function(event){
		changeStyle(vil_style.value);
}, true);
//register event listener for select.onchange
vil_fit.addEventListener('change', function(event){
		resize();
}, true);


//register event listener for radio.onchange
radio_filter.addEventListener('click', function(event){
		curEdit = 1;
		prepareConfigList();
}, true);

//register event listener for radio.onchange
radio_style.addEventListener('click', function(event){
		curEdit = 2;
		prepareConfigList();
}, true);

//loading animation icon
const loadingimg = '<img src="data:image/gif;base64,'+
	'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" alt="loading" border="0"/>';

const defaultStyle = '#vil_control {\n' +
	'	position: absolute;\n' +
	'	right: 0px;\n' +
	'	top: 0px;\n' +
	'}\n' +
	'div.vil {\n' +
	'	margin: 5px;\n' +
	'	padding: 10px;\n' +
	'	z-index: 999;\n' +
	'	background-color: #E5ECF9;\n' +
	'}\n' +
	'.vil, div.vil > input, div.vil > p > textarea , div.vil > p > select, div.vil > p > input {\n' +
	'	color: black;\n' +
	'	font-style: normal;\n' +
	'	font-weight: 400;\n' +
	'	font-size: 13px;\n' +
	'	font-family: arial;\n' +
	'}\n' +
	'div.vil > p > textarea, #vil_flist {\n' +
	'	width: 285px;\n' +
	'}\n' +
	'#vil_style {\n' +
	'	width: 50px;\n' +
	'}\n' +
	'div.vil > p > select {\n' +
	'	width: 225px;\n' +
	'}\n' +
	'#vil_del {\n' +
	'	color: red;\n' +
	'	margin-left: 5px;\n' +
	'	width: 50px;\n' +
	'}\n' +
	'#vil_regex {\n' +
	'	margin: 5 0 5 0;\n' +
	'	vertical-align: middle;\n' +
	'	width: 210px;\n' +
	'}\n' +
	'#vil_save, #vil_start {\n' +
	'	position: absolute;\n' +
	'	right: 15px;\n' +
	'}\n' +
	'#vil_url > img {\n' +
	'	margin-right: 5px;\n' +
	'	border: 0px;\n' +
	'	vertical-align: middle;\n' +
	'}\n' +
	'#vil_img {\n' +
	'	margin-top: 5px;\n' +
	'}\n';

//setting up style
function reloadStyle(){
	cssMap = loadStyleMap();
	cssName = GM_getValue('style', 'default');
	var cssStyleStr = defaultStyle;
	if(cssMap[cssName]){
		cssStyleStr = cssMap[cssName];
	}
	setStyle(cssStyleStr);
	//reset style list
	var tmpStr = '';
	for(key in cssMap){
		tmpStr += '<option value="'+key+'"'+ ((key == cssName)? 'selected':'') + '>' + key + '</option>';
	}
	vil_style.innerHTML = tmpStr;
}

// set current style
function setStyle(cssStyleStr){
	if(cssStyleElement){
		cssStyleElement.innerHTML = cssStyleStr;
	}else{
		cssStyleElement = addGlobalStyle(cssStyleStr);
	}
}
//load style map with GM_getValue();
function loadStyleMap(){
	var styleSrc = GM_getValue('styleMap', 'no style defined');
	if(styleSrc != 'no style defined'){
		try {
			eval( 'var tmpCSSMap = ' + styleSrc );
			return tmpCSSMap;
		} catch (err){
			GM_log(styleSrc);
			alert('error parsing CSS config! ' + err);
			// return empty map
			return {};
		}
	} else {
		return {};
	}
}

//change style - called by event listener
function changeStyle(key){
	if(cssMap[key]){
		cssName = key;
		setStyle(cssMap[cssName]);
		GM_setValue('style', cssName);
	}
}
//add for PicLens support
function parseXMLtoDOM(xmlstring){
	var parser = new DOMParser();
	try{
		return parser.parseFromString(xmlstring, 'application/xml');
	}catch(err){
		GM_log('error parsing xml, reason:'+err);
	}
}
/**
	* using current imgage url object, attributes are:
	*	src: image url (required)
	*	desc: description text of the image (optional, using image url if empty),
	*	thumburl: thumbnail image url (optional, using image url if empty),
	* link: link url (optional, using image url if empty)
	**/
function generateFeedDataForPicLens(turls){
	var feedxml = parseXMLtoDOM(EMPTY_FEED_XML);
	var channelNode = feedxml.documentElement.firstChild;
	for(i=0;i<turls.length;i++){
		var imgobj = turls[i];
		var imgurl = imgobj.src;
		var descval = (imgobj.desc?imgobj.desc:imgurl);
		var linkurl = (imgobj.link?imgobj.link:imgurl)
		var thumburl = (imgobj.thumb?imgobj.thumb:imgurl)
		//GM_log("imgobj.desc:"+imgobj.desc+" imgobj.link:"+imgobj.link+" imgobj.thumb:"+imgobj.thumb);
		channelNode.appendChild(generateItemXML(feedxml,thumburl,imgurl,linkurl,descval));
	}
	return feedxml;
}
// generate item node
function generateItemXML(xmldoc, thumburl, imgurl , linkurl, descval){
	var itemNode = xmldoc.createElement('item');
	var titleNode = xmldoc.createElement('title');
	var titleNodeText = xmldoc.createTextNode(descval);
	titleNode.appendChild(titleNodeText);
	var linkNode = xmldoc.createElement('link');
	var linkNodeText = xmldoc.createTextNode(linkurl);
	linkNode.appendChild(linkNodeText);
	var media_title = xmldoc.createElement('media:title');
	media_title.setAttribute('type','plain');
	media_title.appendChild(titleNodeText);
	var media_thumbnail = xmldoc.createElement('media:thumbnail');
	media_thumbnail.setAttribute('url',thumburl);
	var media_content = xmldoc.createElement('media:content');
	media_content.setAttribute('url',imgurl);
	var media_description = xmldoc.createElement('media:description');
	media_description.setAttribute('type',"plain");
	media_description.appendChild(titleNodeText);
	var guidNode = xmldoc.createElement('guid');
	guidNode.appendChild(linkNodeText);
	itemNode.appendChild(titleNode);
	itemNode.appendChild(linkNode);
	itemNode.appendChild(media_title);
	itemNode.appendChild(media_thumbnail);
	itemNode.appendChild(media_content);
	itemNode.appendChild(media_description);
	itemNode.appendChild(guidNode);
	return itemNode;
}
// load PicLens API
function loadPicLensAPI(){
	if (typeof unsafeWindow.PicLensLite == 'undefined'){
		GM_log('PicLensLite object not found, insert <script> tag ...');
		var head = document.getElementsByTagName('head')[0];
		if(!head){ // head element not found ?!
			head = document.createElement('head');
			document.documentElement.insertBefore(head,document.body);
		}
		var stag = document.createElement('script');
		stag.setAttribute('type', 'text/javascript');
		stag.setAttribute('src', PICLENS_API_URL);
		head.appendChild(stag);
	}
}
// start!
function startPicLensLite(){
	if (typeof unsafeWindow.PicLensLite == 'undefined'){
		GM_log('PicLensLite object not found, waiting ...');
		window.setTimeout(startPicLensLite, 1000);
	}else{
		var hasClient = unsafeWindow.PicLensLite.hasPicLensClient();
		GM_log('PicLensLite.hasPicLensClient() = '+hasClient);
		var temprss = false;
		if(hasClient && (temprss = writeTempFeedFile(piclensfeeddata)) ){
			unsafeWindow.PicLensLite.start({feedUrl:temprss});
		}else{
			var feedtext = serializeXMLtoString(piclensfeeddata);
			unsafeWindow.PicLensLite.start({feedData:feedtext});
		}
	}
}
//serialize XML to String
function serializeXMLtoString(xmldoc){
	var se = new XMLSerializer();
	return se.serializeToString(xmldoc);
}
//thanks to tiddly wiki source..:p
function writeTempFeedFile(feeddata){
	var filePath;
	try{
		unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		filePath = writeToFile(manualConvertUnicodeToUTF8(serializeXMLtoString(feeddata)), null, 'gm_vil_temp_rss.xml');
	}catch(ex){
		alert("Oops! I can't create temp feed file for PicLens extension,\n"+
				"I will use Lite version instead...\n"+
				"you can set \"signed.applets.codebase_principal_support\" = true in \"about:config\""
				+"to avoid this problem.");
		GM_log("error creating file:"+filePath+", reason:"+ex);
	}
	return filePath;
}
function writeToFile(content, outputPath, fname){
	var filePath;
	if(Components) {
		// ask user permission
		//unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	  var fileObj;
		if(!outputPath){
			// get home directory
			fileObj= Components.classes["@mozilla.org/file/directory_service;1"]
	        .getService(Components.interfaces.nsIProperties)
	        .get("Home", Components.interfaces.nsILocalFile);
	  }else{
			fileObj = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			fileObj.initWithPath(outputPath);
	  }
	  // append file name
	  fileObj.append(fname);
		// file is nsIFile
		var ios = Components.classes["@mozilla.org/network/io-service;1"]
		                    .getService(Components.interfaces.nsIIOService);
		var fileHandler = ios.getProtocolHandler("file")
		                     .QueryInterface(Components.interfaces.nsIFileProtocolHandler);
	  filePath = fileHandler.getURLSpecFromFile(fileObj);
	  // get file:// URL
	  GM_log("filePath:"+filePath);
		if(!fileObj.exists())
		//0 for File, 0600 is permission
			fileObj.create(0,0600);
		//prepare output stream
		var out = Components.classes["@mozilla.org/network/file-output-stream;1"]
					.createInstance(Components.interfaces.nsIFileOutputStream);
		out.init(fileObj,0x20|0x02,00004,null);
		//it's very strange that the PicLens extension refuse to load feed which contains UTF-8 chinese character,
		//manualConvertUnicodeToUTF8 will convert unicode character to &#nnnn notation.
		out.write(content,content.length);
		out.flush();
		out.close();
		return filePath;
	}
	return false;
}
//using XPCOM converter service
function mozConvertUnicodeToUTF8(s)
{
	//unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	try {
		var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
		converter.charset = "UTF-8";
	} catch(ex) {
		GM_log("error convert from mozConvertUnicodeToUTF8:"+ex);
		return manualConvertUnicodeToUTF8(s);
	} // fallback
	var u = converter.ConvertFromUnicode(s);
	var fin = converter.Finish();
	return fin.length > 0 ? u + fin : u;
}
//convert unicode to &#nnnnn;
function manualConvertUnicodeToUTF8(s)
{
	var re = /[^\u0000-\u007F]/g ;
	return s.replace(re,function($0) {return "&#" + $0.charCodeAt(0).toString() + ";";});
}
//
function downloadFile(httpLoc, outputFolder, localfile, listener, flag) {
	try {
		//new obj_URI object
		var obj_URI = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(httpLoc, null, null);
		//new file object
		var obj_TargetFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
		//set file with path
		obj_TargetFile.initWithPath(outputFolder);
		obj_TargetFile.append(localfile);
		//if file doesn't exist, create
		if(!obj_TargetFile.exists()) {
			obj_TargetFile.create(0x00,0644);
		}
		//new persitence object
		var obj_Persist = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist);
		obj_Persist.persistFlags = Components.interfaces.nsIWebBrowserPersist.PERSIST_FLAGS_REPLACE_EXISTING_FILES;
  	obj_Persist.persistFlags |= Components.interfaces.nsIWebBrowserPersist.PERSIST_FLAGS_AUTODETECT_APPLY_CONVERSION;
  	if(flag){
  		obj_Persist.persistFlags |= flag;
  	}
		//save file to target
		obj_Persist.progressListener = (listener?listener:defaultProgressListener);
		obj_Persist.saveURI(obj_URI,null,null,null,null,obj_TargetFile);
	} catch (e) {
		alert(e);
	}
}
function prepareFileList(){
	var obj = _gel('vil_flist');
	var opts = obj.options;
	for(var j=0;j<urls.length;j++){
		var fn = urls[j].src.replace(/^.*\//,'');
		var label = fn;
		if(urls[j].desc != urls[j].src){
			label += ' : ' + urls[j].desc;
		}
		opts[j] = new Option(label,fn);
	}
}
function browseOutputFolder(){
	try{
		unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		const nsIFilePicker = Components.interfaces.nsIFilePicker;
		var fp = Components.classes["@mozilla.org/filepicker;1"].createInstance(nsIFilePicker);
		fp.init(window, "Album Output Folder", nsIFilePicker.modeGetFolder);
		var rv = fp.show();
		if (rv == nsIFilePicker.returnOK) {
		  _gel('vil_output_path').value = fp.file.path;
		}
	}catch(ex){
		alert("Oops! Can't open FilePicker dialog,\n"+
				"you can set \"signed.applets.codebase_principal_support\" = true in \"about:config\""
				+"to avoid this problem.");
		GM_log("error init FilePicker, reason:"+ex);
	}
}
var downloadIdx = 0;
var defaultProgressListener = {
	onStateChange: function(awsp, areq, aStateflag, astatus){
		if(aStateflag & Components.interfaces.nsIWebProgressListener.STATE_STOP){ //finished
			var opts = _gel('vil_flist').options;
			if(downloadIdx+1 != urls.length){
				if(opts[downloadIdx]){
					opts[downloadIdx].selected = true;
				}
				downloadIdx++;
				//GM_log('start download idx:' + downloadIdx);
			}else{
				if(opts[downloadIdx]){
					opts[downloadIdx].selected = true;
				}
				alert('all files downloaded!');
			}
		}
	},
	onProgressChange: function(){}, //do nothing
	onStatusChange: function(){}, //do nothing
	onLocationChange: function(){}, //do nothing
	onSecurityChange: function(){} //do nothing
}
function startDownload(){
	alert('DO NOT check "remember my decision" on next confirm dialog unless you know how to remove them.');
	try {
		unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		downloadIdx = 0;
		if(_gel('check_save_index').checked){
			try{
				writeToFile(generateIndexText(), _gel('vil_output_path').value, "index.html");
			}catch(ex){
				alert('error writing index, reason: '+ex);
			}
		}
		for(var j=0;j<urls.length;j++){
			doDownload(j);
		}
	}catch(ex){
		alert("Oops! Can't open local directory\n"+
				"you can set \"signed.applets.codebase_principal_support\" = true in \"about:config\""
				+"to avoid this problem.");
		GM_log("error init download, reason:"+ex);
	}
}
function doDownload(idx){
	var ofolder = _gel('vil_output_path').value;
	if(!ofolder){
		alert('please select output folder first!');
		return false;
	}
	if(urls[idx]){
		var opts = _gel('vil_flist').options;
		var src = urls[idx].src;
		var fn = opts[idx].value;
		downloadFile(src,ofolder,fn);
	}
}
function generateIndexText(){
	var idxdata = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body>';
	var opts = _gel('vil_flist').options;
	for(var j=0;j<urls.length;j++){
		idxdata += '<img src="'+opts[j].value+'">' + urls[j].desc + '\n';
	}
	idxdata += '</body></html>';
	//GM_log(mozConvertUnicodeToUTF8(idxdata));
	return mozConvertUnicodeToUTF8(idxdata);
}
function _gel(tid){
	return document.getElementById(tid);
}
function checkUpdate(forcechk){
	//last check time as long
	var lastcheck = parseInt(GM_getValue('last_check','0'));
	GM_log('last check is '+lastcheck);
	var filterlastcheck = parseInt(GM_getValue('filter_last_check','0'));
	GM_log('filter last check is '+filterlastcheck);
	//days
	var checkInterval = forcechk?0:parseInt(GM_getValue('check_interval','1'));
	var nowtime = (new Date()).getTime();
	//start check if over interval
	if(checkInterval >= 0 && (nowtime - lastcheck)>(checkInterval * 86400000)){
		GM_log('start checking from '+UPDATE_URL);
		sendHTTPRequest(UPDATE_URL,'HEAD', {'If-None-Match': 'never match'},function(rspDtls){
			var checked = onCheckRevSuccess(rspDtls,'revision',startUpdateProcess, forcechk);
			if(checked){
				GM_setValue('last_check', ''+nowtime);
			}
		});
	}
	if(checkInterval >= 0 && (nowtime - filterlastcheck)>(checkInterval * 86400000)){
		GM_log('start checking from '+FILTER_URL);
		sendHTTPRequest(FILTER_URL,'GET', {'If-None-Match': 'never match'},function(rspDtls){
			var checked = onCheckRevSuccess(rspDtls,'filter.revision',startFilterUpdateProcess,forcechk);
			if(checked){
				GM_setValue('filter_last_check', ''+nowtime);
			}
		});			
	}
}
function onCheckRevSuccess(rspDtls, revtag, updateFunction, showOptMessage) {
	if('200' != rspDtls.status){
		GM_log('check failed, response HTTP status: '+rspDtls.status);
		return;
	}else{
		var myrev = parseInt(GM_getValue(revtag,'0'));
		var remoterev = parseInt(rspDtls.responseHeaders.match(/Etag:\s+"([0-9]+).*"/)[1]);
		GM_log('remote rev is ' + remoterev + ', current rev is ' + myrev);
		if(myrev < remoterev){
			return updateFunction(rspDtls, remoterev);
		}else{
			if(showOptMessage){
				alert('remote rev is ' + remoterev + ', my rev is ' + myrev + ', no need to update.');
			}
			return true;
		}
	}
}

function sendHTTPRequest(targeturl, reqMethod, headerMap, onSuccess){
	GM_xmlhttpRequest({
    method: reqMethod,
    url: targeturl,
    headers: headerMap,
    onload: onSuccess
	});
}
function startFilterUpdateProcess(responseDetail, remoterev){
	if(!confirm('new filter configs found (rev: ' + remoterev + ' )\nUpdate now?')){
		GM_setValue('filter_last_check',''+(new Date()).getTime());
		return true;
	}
	try {
		//looking up gm_script dir
		eval('var remoteFilters = ' + responseDetail.responseText);
		if(filterMap.length == 0){
			filterMap = loadFilterMap();
		}
		GM_log('got filters :'+responseDetail.responseText);
		for(var key in remoteFilters){
			var remote = remoteFilters[key];
			GM_log('remote filter key:'+key + 'filter: '+remote.filter.toString());
			if(filterMap[key]){
				if(filterMap[key].toString() != remote.filter.toString()){ //exists
					if(confirm('filter for '+key+' is exist, overwrite? (new filter will be logged to console if choose cancel)')){
						filterMap[key] = remote.filter;
					}else{
						GM_log('new filter for '+key+' is \n'+remote.filter.toString());
					}
				}
			}else{
				alert('got new filter for '+key+', please add "'+remote.include+'" to "included pages" of greasemonkey');
				GM_log('got new filter for '+key+', please add "'+remote.include+'" to "included pages" of greasemonkey');
				filterMap[key] = remote.filter;
			}
		}
		GM_setValue('filters', serializeMap(filterMap));
		GM_setValue('filter.revision',remoterev);
		alert('filter updated successful! reload page to see changes!');
		return true;
	}catch(ex){
		alert('update filter failed! reason:' + ex);
	}
	return false;
}
function startUpdateProcess(responseDetail, remoterev){
	if(!confirm('new revision found (rev: ' + remoterev + ' )\nUpdate now?')){
		GM_setValue('last_check',''+(new Date()).getTime());
		return true;
	}
	alert('Please Allow Privilege request to start update process.\nDO NOT check "remember my decision" on next confirm dialog unless you know how to remove them.');
	try {
		unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		//looking up gm_script dir
		var fname = getInstalledFileName();
		var updateProgressListener = {
			onStateChange: function(awsp, areq, aStateflag, astatus){
				if(aStateflag & Components.interfaces.nsIWebProgressListener.STATE_STOP){ //finished
					GM_setValue('last_check',''+(new Date()).getTime());
					GM_setValue('revision',remoterev);
					alert('script updated, reload to see change!');
				}
			},
			onProgressChange: function(){}, //do nothing
			onStatusChange: function(){}, //do nothing
			onLocationChange: function(){}, //do nothing
			onSecurityChange: function(){} //do nothing
		}
		//download and bypass cache
		downloadFile(UPDATE_URL, getScriptDir().path, fname, updateProgressListener, 2);
		return true;
	}catch(ex){
		alert('update failed! reason:' + ex);
	}
	return false;
}
function getInstalledFileName(){
	var installedFilename = '';
	var configContents = getContents(getScriptFileURI("config.xml"));
	var domParser = new DOMParser();
	var doc = domParser.parseFromString(configContents, "text/xml");
	var nodes = doc.evaluate("/UserScriptConfig/Script", doc, null, 0, null);
  for (var node = null; (node = nodes.iterateNext()); ) {
 		var fname = node.getAttribute("filename");
  	var name = node.getAttribute("name");
  	var namespace = node.getAttribute("namespace");
		if(name == MY_NAME && namespace == MY_NAMESPACE){
			installedFilename = fname;
			break;
		}
  }
  return installedFilename;
}
function getContents(aURL, charset){
  if( !charset ) {
    charset = "UTF-8"
  }
  var ioService=Components.classes["@mozilla.org/network/io-service;1"]
    .getService(Components.interfaces.nsIIOService);
  var scriptableStream=Components
    .classes["@mozilla.org/scriptableinputstream;1"]
    .getService(Components.interfaces.nsIScriptableInputStream);
  // http://lxr.mozilla.org/mozilla/source/intl/uconv/idl/nsIScriptableUConv.idl
  var unicodeConverter = Components
    .classes["@mozilla.org/intl/scriptableunicodeconverter"]
    .createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
  unicodeConverter.charset = charset;

  var channel=ioService.newChannelFromURI(aURL);
  var input=channel.open();
  scriptableStream.init(input);
  var str=scriptableStream.read(input.available());
  scriptableStream.close();
  input.close();

  try {
    return unicodeConverter.ConvertToUnicode(str);
  } catch( e ) {
    return str;
  }
}
function getScriptFileURI(fileName) {
  return Components.classes["@mozilla.org/network/io-service;1"]
                   .getService(Components.interfaces.nsIIOService)
                   .newFileURI(getScriptFile(fileName));
}
function getScriptFile(fileName) {
  var file = getScriptDir();
  file.append(fileName);
  return file;
}
function getScriptDir() {
  var dir = getNewScriptDir();

  if (dir.exists()) {
    return dir;
  } else {
    var oldDir = getOldScriptDir();
    if (oldDir.exists()) {
      return oldDir;
    } else {
      // if we called this function, we want a script dir.
      // but, at this branch, neither the old nor new exists, so create one
      return GM_createScriptsDir(dir);
    }
  }
}
function getNewScriptDir() {
  var file = Components.classes["@mozilla.org/file/directory_service;1"]
                       .getService(Components.interfaces.nsIProperties)
                       .get("ProfD", Components.interfaces.nsILocalFile);
  file.append("gm_scripts");
  return file;
}

function getOldScriptDir() {
  var file = getContentDir();
  file.append("scripts");
  return file;
}

function getContentDir() {
  var reg = Components.classes["@mozilla.org/chrome/chrome-registry;1"]
                      .getService(Components.interfaces.nsIChromeRegistry);

  var ioSvc = Components.classes["@mozilla.org/network/io-service;1"]
                        .getService(Components.interfaces.nsIIOService);

  var proto = Components.classes["@mozilla.org/network/protocol;1?name=file"]
                        .getService(Components.interfaces.nsIFileProtocolHandler);

  var chromeURL = ioSvc.newURI("chrome://greasemonkey/content", null, null);
  var fileURL = reg.convertChromeURL(chromeURL);
  var file = proto.getFileFromURLSpec(fileURL.spec).parent;

  return file
}
// load CSS style map and last-used theme
var cssMap = {};
var cssName = 'default';
//add style to
var cssStyleElement = null;
reloadStyle();

})();//end mark for userscript
