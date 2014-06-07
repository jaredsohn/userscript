// ==UserScript==
// @name コソアンクリーナー
// @version 1.2.1
// @namespace http://userscripts.org/scripts/show/104481
// @match http://find.moritapo.jp/enq/*
// @match http://find.2ch.net/enq/*
// @match http://www.find.2ch.net/enq/*
// @updateURL http://userscripts.org/scripts/source/104481.meta.js
// @downloadURL https://userscripts.org/scripts/source/104481.user.js
// ==/UserScript==
(function () {

var kosoName = 'コソアンクリーナー';
var kosoStyle;
var reloadNeededNoticed = false;
var defaultWeakenSymbols = '◆■';
var filterEnqueteMax = 50;
var GM_config = get_GM_config();

GM_config.init(kosoName + 'の設定', {
	obfuscateChoices: {
		section: [null, '任意回答'],
		
		type: 'checkbox',
		label: '改行付きの選択肢を難読化',
		'default': true
	},
	weakenChoices: {
		type: 'checkbox',
		label: '記号を + に置換',
		'default': true
	},
	weakenChoicesSymbols: {
		label: '　対象の記号：',
		type: 'text',
		'default': defaultWeakenSymbols
	},
	filterChoices: {
		type: 'checkbox',
		label: 'NGワード',
		'default': false
	},
	filterChoicesStrings: {
		label: '　次の文字列を含む場合：',
		title: '改行区切り。"&&"でAND条件。',
		type: 'textarea',
		cols: 40,
		rows: 5,
		'default': ''
	},
	clipUserText: {
		section: [null, 'コメント・回答'],
		
		type: 'checkbox',
		label: 'テキストのはみ出し防止',
		'default': true
	}
});

GM_config.onSave = showReloadNotice;

prepareConfig();

var choiceOptions = {
	obfuscate: GM_config.get('obfuscateChoices'),
	weaken: GM_config.get('weakenChoices'),
	weakenSymbols: GM_config.get('weakenChoicesSymbols'),
	filter: GM_config.get('filterChoices'),
	filterStrings: GM_config.get('filterChoicesStrings')
};
if (choiceOptions.obfuscate || choiceOptions.weaken || choiceOptions.filter) {
	modifyChoices(choiceOptions);
}
if (GM_config.get('clipUserText')) {
	clipUserText();
}
if (location.pathname == '/enq/answer_index.php') {
	filterEnquete();
}

return;

function prepareConfig() {
	var hasConfigMenu = typeof GM_registerMenuCommand == 'function';
	if (hasConfigMenu && GM_registerMenuCommand.toString && GM_registerMenuCommand.toString().indexOf('is not supported') != -1) {
		hasConfigMenu = false;
	}
	var css = getKosoStyle();
	css.insertRule('#GM_koso_reload { position:fixed; top:0; left:0; margin:0; padding:0 .5em; color:red; background-color: rgba(255,255,255,0.75) }', 0);
	css.insertRule('.GM_koso_ng_place_holder { color:#88f; cursor:pointer } ', 1);
	if (hasConfigMenu) {
		GM_registerMenuCommand(kosoName + 'の設定...', function () {
			GM_config.open();
		});
	} else {
		var configButton = document.createElement('div');
		configButton.id = 'GM_koso_config';
		configButton.textContent = kosoName + 'の設定...';
		configButton.addEventListener('click', function (e) {
			GM_config.open();
			e.preventDefault();
		}, false);
		document.body.appendChild(configButton);
		css.insertRule('#GM_koso_config { position:fixed; bottom:0; right:0; margin:0; padding:0 .5em; -webkit-border-radius:.5em 0 0 0; color:#88f; font-size:.75em; cursor:pointer }', 0);
		css.insertRule('#GM_koso_config:hover { background-color:white; color:#00f; text-decoration:underline }', 1);
	}
}

function showReloadNotice () {
	if (!reloadNeededNoticed) {
		var reloadNotice = document.createElement('div');
		reloadNotice.id = 'GM_koso_reload';
		reloadNotice.textContent = kosoName + '：ページの再読み込みが必要です';
		document.body.appendChild(reloadNotice);
		reloadNeededNoticed = true;
	}
}

function modifyChoices(options) {
	var fontSs = document.evaluate('//font[@color="orange"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var length = fontSs.snapshotLength;
	// copy snapshot before editing for Chromium
	var font = [];
	for (var i = 0; i < length; i++) {
		font.push(fontSs.snapshotItem(i));
	}
	if (options.weaken) {
		var symbols = options.weakenSymbols;
		symbols = symbols.replace(/[\[\-\]]/g, '');
		if (symbols == '') {
			symbols = defaultWeakenSymbols;
		}
	}
	var doFilter = options.filter;
	if (doFilter) {
		var filterStringList = options.filterStrings.split('\n');
		var filters = [];
		filterStringList.forEach(function (item) {
			var strings = item.split('&&');
			var filter = [];
			strings.forEach(function (item) {
				if (item.length) {
					filter.push(item);
				}
			});
			if (filter.length) {
				filters.push(filter);
			}
		});
		doFilter = doFilter && filters.length;
	}
	var symbolsRegex = new RegExp('[' + symbols + ']', 'g');
	for (var i = 0; i < length; i++) {
		var item = font[i];
		if (item.color != 'orange' || item.textContent != '*' || !item.previousSibling) {
			continue;
		}
		if (options.weaken) {
			weakenChoice(item, symbolsRegex);
		}
		if (options.obfuscate) {
			obfuscateChoice(item);
		}
		if (doFilter) {
			filterChoice(item, filters);
		}
	}
}

function getChoiceParent(asterisk) {
	var parent = asterisk.parentNode;
	if (parent.tagName == 'LABEL' || parent.tagName == 'TD') {
		return parent;
	}
	return null;
}

// obfuscate malicious choice
function obfuscateChoice(asterisk) {
	if (asterisk.previousSibling.tagName != 'BR') {
		return;
	}
	var sibling = asterisk.previousSibling;
	while (sibling) {
		if (sibling.tagName == 'FONT') {
			break;
		}
		if (sibling.tagName == 'BR') {
			var br = sibling;
			sibling = sibling.previousSibling;
			br.parentNode.removeChild(br);
		} else {
			sibling = sibling.previousSibling;
		}
	}
	var parent = getChoiceParent(asterisk);
	if (parent) {
		parent.style.color = 'rgba(0,0,0,0.05)';
	}
}

// weaken noisy choice
function weakenChoice(asterisk, symbolsRegex) {
	var sibling = asterisk.previousSibling;
	while (sibling) {
		if (sibling.tagName == 'FONT') {
			break;
		}
		if (!sibling.tagName) {
			var textNode = sibling;
			var value = textNode.textContent;
			var newValue = value.replace(symbolsRegex, '+');
			if (value != newValue) {
				textNode.textContent = newValue;
			}
		}
		sibling = sibling.previousSibling;
	}
}

// filter unwanted choice
function filterChoice(asterisk, filters) {
	var siblings = [];
	var sibling = asterisk.previousSibling;
	var text = '';
	while (sibling) {
		if (sibling.tagName == 'FONT') {
			break;
		}
		siblings.push(sibling);
		if (!sibling.tagName) {
			var textNode = sibling;
			text += textNode.textContent;
		}
		sibling = sibling.previousSibling;
	}
	if (text.length && matchFilters(text, filters)) {
		var parent = asterisk.parentNode;
		var choicePlaceHolder = document.createElement('span');
		choicePlaceHolder.className = 'GM_koso_ng_place_holder';
		var choiceBox = document.createElement('span');
		siblings.forEach(function (element) {
			parent.removeChild(element);
			choiceBox.appendChild(element);
		});
		choicePlaceHolder.textContent = '[NG]';
		choiceBox.style.display = 'none';
		choicePlaceHolder.addEventListener('click', function (e) {
			if (choiceBox.style.display) {
				choicePlaceHolder.textContent = '[NG>';
				choiceBox.style.display = '';
			} else {
				choicePlaceHolder.textContent = '[NG]';
				choiceBox.style.display = 'none';
			}
			e.preventDefault();
		}, false);
		parent.insertBefore(choicePlaceHolder, asterisk);
		parent.insertBefore(choiceBox, asterisk);
	}
}

function matchFilters(string, filters) {
	var length = filters.length;
	for (var i = 0; i < length; i++) {
		if (matchFilter(string, filters[i])) {
			return true;
		}
	}
	return false;
}

function matchFilter(string, filter) {
	var length = filter.length;
	for (var i = 0; i < length; i++) {
		if (string.indexOf(filter[i]) == -1) {
			return false;
		}
	}
	return true;
}

function getKosoStyle() {
	if (kosoStyle == null) {
		kosoStyle = document.createElement('style');
		kosoStyle.type = 'text/css';
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(kosoStyle);
	}
	return kosoStyle.sheet;
}

function addKosoStyles(styles) {
	var stylesheet = getKosoStyle();
	styles.forEach(function (style) {
		stylesheet.insertRule(style, 0);
	});
}

// clipping for malicious text
function clipUserText() {
	addKosoStyles([
		'.choice label, .answered td, .answered p, .mes { overflow:hidden }',
		'.choice label { display:inline-block; max-width:94%; max-height:1em; line-height:1 }',
		'.answered td[align="right"] { white-space:nowrap }'
	]);
}

function filterEnquete() {
	var configName = 'filterEnqueteIds';
	var topFramesL = document.getElementsByClassName('enq_frame_top');
	var topFrames = [];
	var length = topFramesL.length;
	for (var i = 0; i < length; i++) {
		topFrames.push(topFramesL[i]);
	}
	var filterMap = getMap();
	addKosoStyles([
		'p.toc .GM_koso_abon { display:none }',
		'.GM_koso_abon.enq_frame_top { opacity:0.3; color:#ccc }',
		'.GM_koso_abon.enq_frame_top label { color:#000 }',
		'.GM_koso_abon.enq_frame_bottom { display:none }'
	]);

	topFrames.forEach(function (enqFrame) {
		console.log(enqFrame.textContent);
		var ignoreCheckbox = document.evaluate(".//input[starts-with(@name,'IGNORE')]", enqFrame, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
		if (ignoreCheckbox == null) {
			return;
		}
		var id = parseInt(ignoreCheckbox.name.substr(6), 10);
		var boxContainer = getParentByTag(ignoreCheckbox, 'SPAN');
		var label = document.createElement('label');
		var text = document.createTextNode("あぼーん");
		var checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = !!filterMap[id];
		label.title = "回答フォームを表示しない (" + kosoName + ")";
		label.appendChild(text);
		label.appendChild(checkbox);
		checkbox.kosoId = id;
		boxContainer.appendChild(label);
		if (filterMap[id]) {
			setIgnore(id, checkbox, true);
		}
		checkbox.addEventListener('change', function (e) {
			updateIgnore(checkbox.kosoId, this, this.checked);
		}, false);
		console.log();
	});

	function getPropertyByTag(element, tagName, property) {
		for (;;) {
			if (element == document) {
				return null;
			}
			element = element[property];
			if (element.tagName == tagName) {
				break;
			}
		}
		return element;
	}

	function getParentByTag(element, tagName) {
		return getPropertyByTag(element, tagName, 'parentNode');
	}

	function getNextByTag(element, tagName) {
		return getPropertyByTag(element, tagName, 'nextSibling');
	}

	function updateIgnore(id, checkbox, state) {
		var filterIds = getIds();
		filterIds = filterIds.filter(function (item) {
			return item != id;
		});
		if (state) {
			filterIds.unshift(id)
			filterIds.splice(50);
		}
		setIds(filterIds);
		setIgnore(id, checkbox, state);
	}

	var enqueteToc;

	function setIgnore(id, checkbox, state) {
		var box = checkbox;
		for (;;) {
			box = getParentByTag(box, 'DIV');
			if (box.className.indexOf('enq_frame_') != -1) {
				break;
			}
		}
		if (enqueteToc == null) {
			enqueteToc = document.getElementsByClassName('toc')[0];
		}
		var anchors = enqueteToc.getElementsByTagName('a');
		var length = anchors.length;
		for (var i = 0; i < length; i++) {
			var anchor = anchors[i];
			if (anchor.className.indexOf('toc') == 0 && anchor.getAttribute('href') == '#' + id) {
				setAbonClass(anchor, state);
				break;
			}
		}
		setAbonClass(box, state);
		setAbonClass(getNextByTag(box, 'DIV'), state);
	}

	function setAbonClass(box, state) {
		var newClasses = box.className.replace(/ GM_koso_abon$/, '');
		if (state) {
			newClasses += ' GM_koso_abon';
		}
		box.className = newClasses;
	}

	function setIds(ids) {
		GM_config.setValue(configName, ids.join(', '));
	}

	function getIds() {
		var idString = GM_config.getValue(configName);
		if (typeof idString != "string" || idString.length == 0) {
			return [];
		}
		return idString.split(/[,.\n\s・、，。]+/);
	}

	function getMap() {
		var ids = getIds();
		var idMap = {};
		ids.forEach(function (id) {
			idMap[id] = true;
		});
		return idMap;
	}
}

function get_GM_config() {

// start GM_config script <https://github.com/sizzlemctwizzle/GM_config> 2013/9/22
/*
Copyright 2009-2013, GM_config Contributors
All rights reserved.

GM_config Contributors:
    Mike Medley <medleymind@gmail.com>
    Joe Simmons
    Izzy Soft
    Marti Martz

GM_config is distributed under the terms of the GNU Lesser General Public License.

    GM_config is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
function GM_configStruct(){arguments.length&&(GM_configInit(this,arguments),this.onInit())}
function GM_configInit(a,c){"undefined"==typeof a.fields&&(a.fields={},a.onInit=a.onInit||function(){},a.onOpen=a.onOpen||function(){},a.onSave=a.onSave||function(){},a.onClose=a.onClose||function(){},a.onReset=a.onReset||function(){},a.isOpen=!1,a.title="User Script Settings",a.css={basic:"#GM_config * { font-family: arial,tahoma,myriad pro,sans-serif; }\n#GM_config { background: #FFF; }\n#GM_config input[type='radio'] { margin-right: 8px; }\n#GM_config .indent40 { margin-left: 40%; }\n#GM_config .field_label { font-size: 12px; font-weight: bold; margin-right: 6px; }\n#GM_config .radio_label { font-size: 12px; }\n#GM_config .block { display: block; }\n#GM_config .saveclose_buttons { margin: 16px 10px 10px; padding: 2px 12px; }\n#GM_config .reset, #GM_config .reset a, #GM_config_buttons_holder { color: #000; text-align: right; }\n#GM_config .config_header { font-size: 20pt; margin: 0; }\n#GM_config .config_desc, #GM_config .section_desc, #GM_config .reset { font-size: 9pt; }\n#GM_config .center { text-align: center; }\n#GM_config .section_header_holder { margin-top: 8px; }\n#GM_config .config_var { margin: 0 0 4px; }\n#GM_config .section_header { background: #414141; border: 1px solid #000; color: #FFF;\n font-size: 13pt; margin: 0; }\n#GM_config .section_desc { background: #EFEFEF; border: 1px solid #CCC; color: #575757; font-size: 9pt; margin: 0 0 6px; }\n",basicPrefix:"GM_config",
stylish:""});if(1==c.length&&"string"==typeof c[0].id&&"function"!=typeof c[0].appendChild)var b=c[0];else for(var b={},g=0,d=c.length,f;g<d;++g)if(f=c[g],"function"==typeof f.appendChild)b.frame=f;else switch(typeof f){case "object":for(var k in f){if("function"!=typeof f[k]){b.fields=f;break}b.events||(b.events={});b.events[k]=f[k]}break;case "function":b.events={onOpen:f};break;case "string":/\w+\s*\{\s*\w+\s*:\s*\w+[\s|\S]*\}/.test(f)?b.css=f:b.title=f}b.id?a.id=b.id:"undefined"==typeof a.id&&
(a.id="GM_config");b.title&&(a.title=b.title);b.css&&(a.css.stylish=b.css);b.frame&&(a.frame=b.frame);if(b.events)for(e in g=b.events,g)a["on"+e.charAt(0).toUpperCase()+e.slice(1)]=g[e];if(b.fields){var g=a.read(),d=b.fields,b=b.types||{},h;for(h in d)(f=d[h])?a.fields[h]=new GM_configField(f,g[h],h,b[f.type]):a.fields[h]&&delete a.fields[h]}a.id!=a.css.basicPrefix&&(a.css.basic=a.css.basic.replace(RegExp("#"+a.css.basicPrefix,"gm"),"#"+a.id),a.css.basicPrefix=a.id)}
GM_configStruct.prototype={init:function(){GM_configInit(this,arguments);this.onInit()},open:function(){function a(a,c){var f=b.create,k=b.fields,h=b.id,l=f("div",{id:h+"_wrapper"});c.appendChild(f("style",{type:"text/css",textContent:b.css.basic+b.css.stylish}));l.appendChild(f("div",{id:h+"_header",className:"config_header block center"},b.title));var n=l,q=0,m;for(m in k){var r=k[m],p=r.settings;p.section&&(n=l.appendChild(f("div",{className:"section_header_holder",id:h+"_section_"+q})),"[object Array]"!==
Object.prototype.toString.call(p.section)&&(p.section=[p.section]),p.section[0]&&n.appendChild(f("div",{className:"section_header center",id:h+"_section_header_"+q},p.section[0])),p.section[1]&&n.appendChild(f("p",{className:"section_desc center",id:h+"_section_desc_"+q},p.section[1])),++q);n.appendChild(r.wrapper=r.toNode(h))}l.appendChild(f("div",{id:h+"_buttons_holder"},f("button",{id:h+"_saveBtn",textContent:"適用",title:"Save settings",className:"saveclose_buttons",onclick:function(){b.save()}}),
f("button",{id:h+"_closeBtn",textContent:"閉じる",title:"Close window",className:"saveclose_buttons",onclick:function(){b.close()}}),f("div",{className:"reset_holder block"},f("a",{id:h+"_resetLink",textContent:"設定をリセット",href:"#",title:"Reset fields to default values",className:"reset",onclick:function(a){a.preventDefault();b.reset()}}))));a.appendChild(l);b.center();window.addEventListener("resize",b.center,!1);b.onOpen(b.frame.contentDocument||b.frame.ownerDocument,b.frame.contentWindow||window,b.frame);
window.addEventListener("beforeunload",function(){b.close()},!1);b.frame.style.display="block";b.isOpen=!0}var c=document.getElementById(this.id);if(!c||!("IFRAME"==c.tagName||0<c.childNodes.length)){var b=this;this.frame?(this.frame.id=this.id,this.frame.setAttribute("style","bottom: auto; border: 1px solid #000; display: none; height: 75%; left: 0; margin: 0; max-height: 95%; max-width: 95%; opacity: 0; overflow: auto; padding: 0; position: fixed; right: auto; top: 0; width: 75%; z-index: 999;"),
a(this.frame,this.frame.ownerDocument.getElementsByTagName("head")[0])):(document.body.appendChild(this.frame=this.create("iframe",{id:this.id,style:"bottom: auto; border: 1px solid #000; display: none; height: 75%; left: 0; margin: 0; max-height: 95%; max-width: 95%; opacity: 0; overflow: auto; padding: 0; position: fixed; right: auto; top: 0; width: 75%; z-index: 999;"})),this.frame.src="about:blank",this.frame.addEventListener("load",function(c){c=b.frame;var d=c.contentDocument.getElementsByTagName("body")[0];
d.id=b.id;a(d,c.contentDocument.getElementsByTagName("head")[0])},!1))}},save:function(){var a=this.write();this.onSave(a)},close:function(){this.frame.contentDocument?(this.remove(this.frame),this.frame=null):(this.frame.innerHTML="",this.frame.style.display="none");var a=this.fields,c;for(c in a){var b=a[c];b.wrapper=null;b.node=null}this.onClose();this.isOpen=!1},set:function(a,c){this.fields[a].value=c},get:function(a){return this.fields[a].value},write:function(a,c){if(!c){var b={},g={},d=this.fields,
f;for(f in d){var k=d[f],h=k.toValue();k.save?null!=h?(b[f]=h,k.value=h):b[f]=k.value:g[f]=h}}try{this.setValue(a||this.id,this.stringify(c||b))}catch(l){this.log("GM_config failed to save settings!")}return g},read:function(a){try{var c=this.parser(this.getValue(a||this.id,"{}"))}catch(b){this.log("GM_config failed to read saved settings!"),c={}}return c},reset:function(){var a=this.fields,c;for(c in a)a[c].reset();this.onReset()},create:function(){switch(arguments.length){case 1:var a=document.createTextNode(arguments[0]);
break;default:var a=document.createElement(arguments[0]),c=arguments[1],b;for(b in c)0==b.indexOf("on")?a.addEventListener(b.substring(2),c[b],!1):-1!=",style,accesskey,id,name,src,href,which,for".indexOf(","+b.toLowerCase())?a.setAttribute(b,c[b]):a[b]=c[b];if("string"==typeof arguments[2])a.innerHTML=arguments[2];else for(c=2,b=arguments.length;c<b;++c)a.appendChild(arguments[c])}return a},center:function(){var a=this.frame;if(a){var c=a.style;"none"==c.display&&(c.opacity="0");c.display="";c.top=
Math.floor(window.innerHeight/2-a.offsetHeight/2)+"px";c.left=Math.floor(window.innerWidth/2-a.offsetWidth/2)+"px";c.opacity="1"}},remove:function(a){a&&a.parentNode&&a.parentNode.removeChild(a)}};
(function(){var a="undefined"!=typeof GM_getValue&&"undefined"!=typeof GM_getValue("a","b"),c,b,g,d;a?(c=GM_setValue,b=GM_getValue,g="undefined"==typeof JSON?function(a){return a.toSource()}:JSON.stringify,d="undefined"==typeof JSON?function(a){return(new Function("return "+a+";"))()}:JSON.parse):(c=function(a,b){return localStorage.setItem(a,b)},b=function(a,b){var c=localStorage.getItem(a);return null==c?b:c},g=JSON.stringify,d=JSON.parse);GM_configStruct.prototype.isGM=a;GM_configStruct.prototype.setValue=
c;GM_configStruct.prototype.getValue=b;GM_configStruct.prototype.stringify=g;GM_configStruct.prototype.parser=d;GM_configStruct.prototype.log=a?GM_log:window.opera?opera.postError:console.log})();function GM_configDefaultValue(a,c){var b;0==a.indexOf("unsigned ")&&(a=a.substring(9));switch(a){case "radio":case "select":b=c[0];break;case "checkbox":b=!1;break;case "int":case "integer":case "float":case "number":b=0;break;default:b=""}return b}
function GM_configField(a,c,b,g){this.settings=a;this.id=b;this.wrapper=this.node=null;this.save="undefined"==typeof a.save?!0:a.save;"button"==a.type&&(this.save=!1);this["default"]="undefined"==typeof a["default"]?g?g["default"]:GM_configDefaultValue(a.type,a.options):a["default"];this.value="undefined"==typeof c?this["default"]:c;g&&(this.toNode=g.toNode,this.toValue=g.toValue,this.reset=g.reset)}
GM_configField.prototype={create:GM_configStruct.prototype.create,toNode:function(a){function c(a,b,c,d){d||(d=c.firstChild);switch(a){case "right":case "below":"below"==a&&c.appendChild(l("br",{}));c.appendChild(b);break;default:"above"==a&&c.insertBefore(l("br",{}),d),c.insertBefore(b,d)}}var b=this.settings,g=this.value,d=b.options,f=b.type,k=this.id,h=b.labelPos,l=this.create,n=l("div",{className:"config_var",id:a+"_"+k+"_var",title:b.title||""}),q,m;for(m in b){q=m;break}var r=b.label&&"button"!=
f?l("label",{id:a+"_"+k+"_field_label","for":a+"_field_"+k,className:"field_label"},b.label):null;switch(f){case "textarea":n.appendChild(this.node=l("textarea",{innerHTML:g,id:a+"_field_"+k,className:"block",cols:b.cols?b.cols:20,rows:b.rows?b.rows:2}));break;case "radio":this.node=b=l("div",{id:a+"_field_"+k});m=0;for(a=d.length;m<a;++m){var p=l("label",{className:"radio_label"},d[m]),s=b.appendChild(l("input",{value:d[m],type:"radio",name:k,checked:d[m]==g}));c(!h||"left"!=h&&"right"!=h?"options"==
q?"left":"right":h,p,b,s)}n.appendChild(b);break;case "select":this.node=b=l("select",{id:a+"_field_"+k});m=0;for(a=d.length;m<a;++m)k=d[m],b.appendChild(l("option",{value:k,selected:k==g},k));n.appendChild(b);break;default:d={id:a+"_field_"+k,type:f,value:"button"==f?b.label:g};switch(f){case "checkbox":d.checked=g;break;case "button":d.size=b.size?b.size:25;b.script&&(b.click=b.script);b.click&&(d.onclick=b.click);break;case "hidden":break;default:d.type="text",d.size=b.size?b.size:25}n.appendChild(this.node=
l("input",d))}r&&(h||(h="label"==q||"radio"==f?"left":"right"),c(h,r,n));return n},toValue:function(){var a=this.node,c=this.settings,b=c.type,g=!1,d=null;if(!a)return d;0==b.indexOf("unsigned ")&&(b=b.substring(9),g=!0);switch(b){case "checkbox":d=a.checked;break;case "select":d=a[a.selectedIndex].value;break;case "radio":b=a.getElementsByTagName("input");g=0;for(c=b.length;g<c;++g)b[g].checked&&(d=b[g].value);break;case "button":break;case "int":case "integer":case "float":case "number":d=Number(a.value);
c='Field labeled "'+c.label+'" expects a'+(g?" positive ":"n ")+"integer value";if(isNaN(d)||"int"==b.substr(0,3)&&Math.ceil(d)!=Math.floor(d)||g&&0>d)return alert(c+"."),null;if(!this._checkNumberRange(d,c))return null;break;default:d=a.value}return d},reset:function(){var a=this.node,c=this.settings.type;if(a)switch(c){case "checkbox":a.checked=this["default"];break;case "select":for(var c=0,b=a.options.length;c<b;++c)a.options[c].textContent==this["default"]&&(a.selectedIndex=c);break;case "radio":a=
a.getElementsByTagName("input");c=0;for(b=a.length;c<b;++c)a[c].value==this["default"]&&(a[c].checked=!0);break;case "button":break;default:a.value=this["default"]}},remove:function(a){GM_configStruct.prototype.remove(a||this.wrapper);this.node=this.wrapper=null},reload:function(){var a=this.wrapper;a&&(a.parentNode.insertBefore(this.wrapper=this.toNode(),a),this.remove(a))},_checkNumberRange:function(a,c){var b=this.settings;return"number"==typeof b.min&&a<b.min?(alert(c+" greater than or equal to "+
b.min+"."),null):"number"==typeof b.max&&a>b.max?(alert(c+" less than or equal to "+b.max+"."),null):!0}};var GM_config=new GM_configStruct;
// end GM_config script

return GM_config;
}

})()
