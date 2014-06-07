// ==UserScript==
// @name           LanguagePracticeTool
// @author		   Darko Makreshanski
// @namespace      com.makreshanski
// @description    Learn and practice a certain language by selecting any text
// @include		   http://*
// @include		   https://*
// @version		   0.1.1
// ==/UserScript==

//some snippets used from http://userscripts.org/scripts/show/46744
//http://www.google.com/dictionary/json?callback=dict_api.callbacks.id100&q=test&sl=en&tl=en&restrict=pr%2Cde&client=te

const HREF_NO = 'javascript:void(0)';

var body = getTag('body')[0];

var imgLookup;
images();

var txtSel; // text selected
var txtSelSPC; //variable used for when the selection is initiated within an existing tooltip

if (document.contentType.indexOf('html') != -1) {
	document.addEventListener('mouseup', mouseup, false);
	document.addEventListener('mousedown', mousedown, false);
}

function mousedown(evt) {
	if (getId('divDic') || getId('divLookup')) {
		if (!clickedInsideID(evt.target, 'divDic')) {
			cleanup();
		}
	}
	if (txtSelSPC != null) {
		delete txtSelSPC;
		txtSelSPC = null;
	}
}

function cleanup() {
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	if(divDic) {
		divDic.parentNode.removeChild(divDic);
	}	
	if(divLookup) {
		divLookup.parentNode.removeChild(divLookup);
	}
}

function mouseup(evt) {
	var x,y;
	x = evt.pageX;
	y = evt.pageY;
	txtSel = getSelection();
	if (!clickedInsideID(evt.target, 'divDic')) {
		if (txtSel && txtSel != "") {
			cleanup();
			initiate(x,y);
		}
	} else if (clickedInsideID(evt.target, 'divResult') && txtSel != '') {
		txtSelSPC = new String(txtSel);
		cleanup();
		initiate(x,y);
	}
}

function initiate(x,y) {
	var lookup_icon = GM_getValue('lookup_icon');
	if (lookup_icon == 'never') {
		showTranslation(x,y);
	} else 
	if (lookup_icon == 'on_larger_than') {
		if (txtSel.length > GM_getValue('lookup_larger_than')) {
			showLookUpIcon(x,y);
		} else {
			showTranslation(ex,y);
		}
	} else 
	if (lookup_icon == 'always') {
		showLookUpIcon(x,y);
	} else {
		showTranslation(x,y);
	}
}

function showLookupIcon(x, y) {

	divLookup = createElement('div', {id:'divLookup', style:'background-color:#D0E8F9; color:#000000; position:absolute; top:'+(y+window.pageYOffset+5)+'px; left:'+(x+window.pageXOffset)+'px; padding:3px; z-index:10000;'});

	divLookup.appendChild(imgLookup.cloneNode(false));
	divLookup.addEventListener('mouseover', lookupiconhandler, false);
	body.appendChild(divLookup);	
	
}

function lookupiconhandler(evt) {
	cleanup();
	showTranslation();
}

function showTranslation(x, y) {

	var text = txtSel;

	var divResult = null;
	var divDic = getId('divDic');

	var yoffset, xoffset;
	if (txtSelSPC == null) { //initiated from page
		yoffset = 10;
		xoffset = 0;
	} else { //initiated from an existing tooltip
		yoffset = -15;
		xoffset = -20;
	}

	var top = y  + window.pageXOffset + yoffset;
	var left;
	if (x+window.pageXOffset<=250) {
		left = 0;
	} else {
		left = x + window.pageXOffset + xoffset;
	}
	
	divDic = createElement('div', {id:'divDic', 
			style:'background-color:#D0E8F9; color:#000000; position:absolute; top:' + top + 'px; left:'+left+'px; min-width:100px; min-height:30px; max-width:450px; padding:5px; font-size:small; text-align:left; z-index:10000; text-decoration: none;'});
	divDic.addEventListener('mousedown', dragHandler, false);
	body.appendChild(divDic);
	
		
	divResult = createElement('div', {id:'divResult', style:'overflow:auto; padding:3px;'}, null, '...');
	divDic.appendChild(divResult);		
	
	detectLanguage(text, detectCallback);	

	divDic.appendChild(createElement('a', {id:'optionsLink', href:HREF_NO, style:'position:absolute; bottom:3px; right:3px; font-size:small; text-decoration:none;'}, 'click options false', '>>'));
	
		
}

function detectCallback(result) {

	var divResult = getId('divResult');
	
	var txtSel = getSelection();
	if (!txtSel || txtSel == "") {
		if (txtSelSPC != null) {
			txtSel = txtSelSPC;
		} else {
			cleanup();
		}
	}
	
	text = txtSel;
	if (result.language) {

		var ll, kl;
		ll = GM_getValue('learn_language') ? GM_getValue('learn_language') : "de";
		kl = GM_getValue('know_language') ? GM_getValue('know_language') : "en";

		var from, to, language;
		language = result.language
		if (language == ll) {
			from = ll;
			to = kl;
		} else {
			from = language;
			to = ll;
		}
		getTranslation(text, from, to, translateCallback);
		
	} else {
		var error;
		if (result.error) {
			error = result.error;
		} else {
			error = result;
		}
		divResult.innerHTML = "Error detecting language. " + error;
	}
	
}

function translateCallback(result) {

	var divResult = getId('divResult');
	if (result.translated) {
		divResult.innerHTML = result.translated;
	} else {
		var error;
		if (result.error) {
			error = result.error;
		} else {
			error = result;
		}
		divResult = "Error getting translation. " + error;
	}
	
}

function detectLanguage(text, callback) {

	var googleapidetectquery = "http://www.google.com/uds/GlangDetect?v=1.0&q=" + encodeURIComponent(text);
	GM_xmlhttpRequest({
		method: 'GET',
		requestHeaders: {Accept: 'application/json', 'Accept-Charset': 'utf-8,*;q=0.7'},
		url: googleapidetectquery,
		onload: function(resp) {
			try{
				var language;
				var json = JSON.parse(resp.responseText);
				if (json.responseData.language) {
				
//					alert(googleapidetectquery);
					language = json.responseData.language;
					callback({language: language});
					
				} else if (json.responseData.language == "") {
					callback("");
				} else {
					callback({error: "Invalid data: " + resp.responseText});
				}
				
			} catch(e){
				callback(e);
			}
		}
	});	
	
}




function getTranslation(text, from, to, callback) {
	var googleapitranslatquery = "http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q="+encodeURIComponent(text)+"&langpair=" + from + "%7C" + to;
	GM_xmlhttpRequest({
		method: 'GET',
		requestHeaders: {Accept: 'application/json', 'Accept-Charset': 'utf-8,*;q=0.7'},
		url: googleapitranslatquery,
		onload: function(resp) {
			try{
			
				var translated;
				var json = JSON.parse(resp.responseText);
				if (json.responseData.translatedText) {
					translated = json.responseData.translatedText;
					callback({translated: translated});
					
				} else {
					callback({error: "Invalid data: " + resp.responseText});
				}
				
			} catch(e){
				callback(e);
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
	
	if (txt != null) {
		txt = new String(txt);
	}
	return txt;
}


function options(evt)
{
	var divOptions = getId('divOpt');
	
	if(!divOptions)//show options
	{
		divOptions = createElement('div', {id:'divOpt', style:'background-color:#7BBDEF; position:relative; padding:5px;'});
		getId('divDic').appendChild(divOptions);
		getId('optionsLink').style.visibility = 'hidden';
		
		divOptions.appendChild(createElement('span', null, null,'Language you want to practice:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangLearn'}, null, languagesGoogle));
		getId('optSelLangLearn').value = GM_getValue('learn_language') ? GM_getValue('learn_language') : "de";
		getId('optSelLangLearn').addEventListener('change', translateCallback, false);
		
		divOptions.appendChild(createElement('br'));

		divOptions.appendChild(createElement('span', null, null,' Language you know:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangKnow'}, null, languagesGoogle));
		getId('optSelLangKnow').value = GM_getValue('know_language') ? GM_getValue('know_language') : "en";;
		getId('optSelLangKnow').addEventListener('change', translateCallback, false);
		
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
	var from = getId('optSelLangLearn').value;
	var to = getId('optSelLangKnow').value;
	
	GM_setValue('learn_language', from);
	GM_setValue('know_language', to);
	
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


var  languagesGoogle = ''+
//'<option value="auto">Auto Detect</option>'+
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
'<option value="mk">Macedonian</option>'+
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




//implementation of JSON for the old browsers (copy from http://www.json.org/json2.js)

/*************** JSON ******************/


if (!this.JSON) {
    this.JSON = {};
}

(function () {
    function f(n) {
        return n < 10 ? '0' + n : n;
    }
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function (key) {
            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };
        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }
    function str(key, holder) {
        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];
        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':
            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':
            return String(value);
        case 'object':
            if (!value) {
                return 'null';
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }
                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }
            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }
    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {'': value});
        };
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
}());

/********************* END OF JSON ***************************/