// ==UserScript==
// @name             Ameba Blog skin switcher
// @namespace        http://www.moaikids.net/
// @include          http://ameblo.jp/*
// @version          1.00
// ==/UserScript==
var Class = {
   create: function() {
      var newClass = function() {
         this.initialize.apply(this, arguments);
      }
      newClass.prototype.initialize = function() {}
      return newClass;
   }
};

Function.prototype.extend = function(newClass) {
   var proto = this.prototype;
   for(var property in newClass)
      proto[property] = newClass[property];
}

Function.extend({
   bind: function(base) {
      var self = this;
      return function() {
         self.apply(base, arguments);
      }
   }
});

var Panel = Class.create();
Panel.extend({
	element: function(html) {
		var div = document.createElement('div');
		if(html) div.innerHTML = html;
		return div;
	},

	create: function(msg) {
		var GM_infoPanel = document.createElement('div');
		with(GM_infoPanel.style) {
			bottom   = 0;
			right    = 0;
			padding  = '1px';
			opacity  = 0.8;
			fontSize = 'x-small';
			color    = '#000000';
			backgroundColor = '#EEEEEE';
			border   = '1px solid #C0C0C0';
			zIndex   = 100;
			position = 'fixed';
		}

		document.body.appendChild(GM_infoPanel);
		var msgspace = this.element();
		msgspace.style.margin = '0.5em 1em';
		GM_infoPanel.appendChild(msgspace);

		this.panel = msgspace;
		this.insert(msg);
	},

	insert: function(msg) {
		if(typeof msg  == 'string') {
			this.panel.innerHTML = msg;
		} else {
			this.panel.innerHTML = '';
			this.panel.appendChild(msg);
		}
	},
});

var Reader = Class.create();
Reader.extend({
	read: function(url) {
		var link = document.createElement('link');
		link.rel = "stylesheet";
		link.type="text/css" ;
		link.media="screen,print";
		link.charset="UTF-8";
		link.href = url;

		var head = $X("//head")[0];
		//preread
		head.appendChild(link);
		head.removeChild(head.lastChild);
/*
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
		});
*/
	},
});

var CUSTOM_CSS_URL = 'http://ameblo.jp/p_skin/'
var CUSTOM_SS = new Array();
var SELECT_COUNT = -1;

var Skin = Class.create();
Skin.extend({
	code: undefined,
	thumbnail: undefined,
	type: undefined,
	

	init: function(code, type) {
		this.code = code;
		this.thumbnail = 'http://blog.ameba.jp/p_skin/' + code + '/img/thumb.gif';
		this.type = type;
	}
});

var SkinFactory = {
	create: function(code, type){
		var skin = new Skin();
		skin.init(code, type);
		return skin;
	}
}

var KEY_ENABLE = true;
var SKIN_TYPE = "";
var SKIN_LIST = new Array();
SKIN_LIST.push(SkinFactory.create('green', 'abcde'));
SKIN_LIST.push(SkinFactory.create('blue', 'abcde'));
SKIN_LIST.push(SkinFactory.create('gray', 'abcde'));
SKIN_LIST.push(SkinFactory.create('peach', 'abcde'));
SKIN_LIST.push(SkinFactory.create('takeda_usr', 'c'));
SKIN_LIST.push(SkinFactory.create('pure_moe09_usr', 'cde'));
SKIN_LIST.push(SkinFactory.create('winter_usr01', 'abcde'));
SKIN_LIST.push(SkinFactory.create('womanblog_36', 'c'));
SKIN_LIST.push(SkinFactory.create('jal2_usr', 'abcde'));
SKIN_LIST.push(SkinFactory.create('jal1_usr', 'abcde'));
SKIN_LIST.push(SkinFactory.create('kirakira_usr', 'abcde'));
SKIN_LIST.push(SkinFactory.create('cosmo_oil', 'abcde'));
SKIN_LIST.push(SkinFactory.create('nissan_black_usr', 'abcde'));
SKIN_LIST.push(SkinFactory.create('nissan_pink_usr', 'abcde'));
SKIN_LIST.push(SkinFactory.create('hapinavi_usr04', 'abcde'));
SKIN_LIST.push(SkinFactory.create('hapinavi_usr03', 'abcde'));
SKIN_LIST.push(SkinFactory.create('hapinavi_usr02', 'abcde'));
SKIN_LIST.push(SkinFactory.create('hapinavi_usr01', 'abcde'));
SKIN_LIST.push(SkinFactory.create('shokokai_usr04', 'abcde'));
SKIN_LIST.push(SkinFactory.create('shokokai_usr03', 'abcde'));
SKIN_LIST.push(SkinFactory.create('shokokai_usr02', 'abcde'));
SKIN_LIST.push(SkinFactory.create('shokokai_usr01', 'abcde'));

function main() {
	var ss = $X("//link[@type='text/css']");
	for(var i = 0 ; i < ss.length ; i++){
		var css = ss[i];

		if(css.href.indexOf('http://ameblo.jp/p_skin/cmn/css/') < 0){
			CUSTOM_SS[CUSTOM_SS.length] = css;
			var type = getSkinType(css.href);
			if(type){
				SKIN_TYPE = type;
			}
		}
	}
	paintPanel();
	
	document.addEventListener(
		"keydown", 
		function(e){
			if(KEY_ENABLE){
				//-> key
				//next page
				if(e.keyCode == 39){
					KEY_ENABLE = false;
					changeSkin(getNextCount(SELECT_COUNT, SKIN_LIST.length));
					KEY_ENABLE = true;
				}else if(e.keyCode == 37){
					KEY_ENABLE = false;
					changeSkin(getPreviousCount(SELECT_COUNT, SKIN_LIST.length));
					KEY_ENABLE = true;
				}
			}
		}, 
		true);

	preloadKicker();
}

function preloadKicker(){
	var originalSkinCode = undefined;
	var reader = new Reader();
	for(var i = 0 ; i < SKIN_LIST.length ; i++){
		for(var j = 0 ; j < CUSTOM_SS.length ; j++){
			if(!originalSkinCode){
				originalSkinCode = getSkinCode(CUSTOM_SS[j].href);
			}
			var skinCssUrl = CUSTOM_SS[j].href.replace(originalSkinCode,SKIN_LIST[i].code);
			reader.read(skinCssUrl)
//			setTimeout(reader.read(skinCssUrl) , 100 * (i * j + 1));
		}
	}
}

function changeSkin(count){
	SELECT_COUNT = count;
	
	repaint("");
	var skinCode = SKIN_LIST[count].code;
	for(var i = 0 ; i < CUSTOM_SS.length ; i++){
		var originalSkinCode = getSkinCode(CUSTOM_SS[i].href);
		
		CUSTOM_SS[i].href = CUSTOM_SS[i].href.replace(originalSkinCode,skinCode);
	} 
	repaint(createSkinList());

	var swfHeader = $X("//object[@id='header']")[0];
	if(swfHeader && swfHeader.style){
		swfHeader.style.display = 'none'
	}
}

function getSkinCode(url){
	var tmp = url.substring(CUSTOM_CSS_URL.length);
	return (tmp.split('/'))[0];
}

function getSkinType(url){
	var tmp = url.substring(CUSTOM_CSS_URL.length);
	var type = (tmp.split('/'))[2];
	if(type && type.indexOf("type_") >= 0){
		return type.substring("type_".length , "type_".length + 1);
	}else{
		return null;
	}
}

function paintPanel(){
	var panel = new Panel();
	var html =  '<div id="skinPreviewBox">';
	if(SELECT_COUNT >= 0){
		html += createSkinList();
	}
	html += '</div>';
	var panel = new Panel();
	panel.create(html);
}

function repaint(html){
	var skinList = document.getElementById('skinPreviewBox');
	skinList.innerHTML = html;
}

function createSkinList(){
	var html = "";
	
	html += '<p id="skinPreviewLabel">skin code:<b>' + SKIN_LIST[SELECT_COUNT].code + '</b></p>';
	
	html += '<div id="skinPreviewThumbnailBox">';
	html += '<img src="' + SKIN_LIST[getPreviousCount(SELECT_COUNT, SKIN_LIST.length)].thumbnail + '" id="skinPreviousThumbnail" width="40" style="margin: 3px" />';
	html += '<img src="' + SKIN_LIST[SELECT_COUNT].thumbnail + '" id="skinCurrentThumbnail"  width="60" style="margin: 3px" />';
	html += '<img src="' + SKIN_LIST[getNextCount(SELECT_COUNT, SKIN_LIST.length)].thumbnail + '" id="skinNextThumbnail"  width="40" style="margin: 3px" />';
	html += '</div>';
	html += '<div id="skinPreviewNavigationBox">';
	html += '<span id="skinPreviousNavigation" style="margin: 5px">&lt;-Back</span>';
	html += '<span id="skinNextNavigation" style="margin: 5px">Next-&gt;</span>';
	html += '</div>';
	
    return html;
}

function getNextCount(count, length){
	if(count < 0)
		return 0;
	count++;
	if(count >= length){
		count = 0;
	}
	
	if(SKIN_LIST[count].type.indexOf(SKIN_TYPE) < 0){
		return getNextCount(count, length);
	}else{
		return count;
	}
}

function getPreviousCount(count, length){
	if(count < 0)
		return 0;
	count--;
	if(count < 0){
		count = length - 1;
	}

	if(SKIN_LIST[count].type.indexOf(SKIN_TYPE) < 0){
		return getPreviousCount(count, length);
	}else{
		return count;
	}

}

/**
 * XPath utility logic
 * special thanks this site -> http://lowreal.net/
 * @Reference URI http://lowreal.net/logs/2006/03/16/1
 * @Tags xpath js
 */
$X = function (exp, context) {
    if (!context) context = document;
    var resolver = function (prefix) {
        var o = document.createNSResolver(context)(prefix);
        return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
        case XPathResult.STRING_TYPE : return result.stringValue;
        case XPathResult.NUMBER_TYPE : return result.numberValue;
        case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
        case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
            result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var ret = [];
            for (var i = 0, len = result.snapshotLength; i < len ; i++) {
                ret.push(result.snapshotItem(i));
            }
            return ret;
        }
    }
    return null;
}


main();


