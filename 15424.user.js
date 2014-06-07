// ==UserScript==
// @name           Markup Toolbar + Auto Preview with Config
// @namespace      wowhead
// @include        http://www.wowhead.com/?*
// ==/UserScript==

var previewBox_enabled = GM_getValue('previewBox_enabled', true);
var previewBox_above = GM_getValue('previewBox_above', true);
var markupBar_enabled = GM_getValue('markupBar_enabled', true);
var expandedBox_enabled = GM_getValue('expandedBox_enabled', true);

var boldImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADCSURBVCjPY%2FjPgB8yUEtBeUL5%2BZL%2FBe%2Bz61PXJ7yPnB8sgGFCcX3m%2F6z9IFbE%2FJD%2FXucxFOTWp%2F5PBivwr%2Ff77%2FgfQ0F6ffz%2FaKACXwG3%2B27%2FLeZjKEioj%2FwffN%2Bn3vW8y3%2Bz%2FVh8EVEf%2FN8LLGEy3%2BK%2F2nl5ATQF%2FvW%2B%2Fx3BCrQF1P7r%2FhcvQFPgVg%2B0GWq0zH%2FN%2FwL1aAps6x3%2B64M9J12g8p%2F%2FPZcCigKbBJP1uvvV9sv3S%2FYL7%2Bft51SgelzghgBKWvx6E5D1XwAAAABJRU5ErkJggg%3D%3D";
var italicImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABxSURBVCjPY%2FjPgB8yUFtBdkPqh4T%2FkR%2BCD%2BA0Ie5B5P%2FABJwmxBiE%2F%2Ff%2FgMeKkAlB%2F90W4FHg88Dzv20ATgVeBq7%2FbT7g8YXjBJf%2FRgvwKLB4YPFfKwCnAjMH0%2F8a%2F3EGlEmD7gG1A%2FIHJDfQOC4wIQALYP87Y6unEgAAAABJRU5ErkJggg%3D%3D";
var underlineImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACjSURBVCjPY%2FjPgB8yEKmgPKH8ffn%2F0n4IL3F99P%2BQAjQTyveX%2FIexIwWCz2NYUbw%2F7z%2FCYK%2F9GApy92cgKXDEVJC%2BPxFJgQWmgoT9kUgK9DEVROwPRFKghqnAv9%2F7v2MAhK3iINePocBNwf69xXlDhf8Myg4y58UUsISkmYL%2BfI39ivul%2B0UMSA%2Fq%2Fwza%2F1X%2By%2F0X%2Fy%2F0n%2Bc%2F%2B3%2Fm%2F6SbgAsCAM8i%2FW7eee6fAAAAAElFTkSuQmCC";
var strikeImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACfSURBVCjPY%2FjPgB8yUFNBiWDBzOy01PKEmZG7sSrIe5dVDqIjygP%2FY1GQm5b2P7kDwvbAZkK6S8L%2F6P8hM32N%2FzPYu2C1InJ36P%2FA%2Fx7%2Fbc%2BYoSooLy3%2FD4Px%2F23%2BSyC5G8kEf0EIbZSmfdfov9wZDCvc0uzLYWyZ%2F2J3MRTYppn%2F14eaIvKOvxxDgUma7ju1M%2FLlkmnC5bwdNIoL7BAAWzr8P9A5d4gAAAAASUVORK5CYII%3D";
var linkImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAANPSURBVBgZBcHdT1tlAMDh3zltORT6Ob4mtWDGMpgiU8LcEooJyiaEGbNkCkaNCVfeGP4Dr7zBG42J3hiVZInTeTMvFAPBYRhmGDBjEYaAMhhtVzraUjin5%2BM95%2FV5FCklAAAA4wtjfcCHwHmgAfADh8Ci9OSXn%2Fd9%2BysAAIAipQRgfGHMD0wC115PDmjxYANloxbDBuGaCHLMZqeEK9wZIdy3vh76%2FhhAkVIyvjAWAG731D%2FXeznZT9nUsLDZKitUSY0Dw0MKmyAGWWuepczSfeGIl79789ahCgBMdted6U0191BwbRxVQQiViqjCoIqCpbFvBtk7DNASeomek%2B1dtuXcAPAVL%2B2mgE%2FeOXPF97erk6VCxRMcmyEKVoCyCZvpIw51HS1%2BgBLd5GJ9B7Nrf566vji54rsw9uKnrzVf6FR8QbKqANnIU26I5ZyPiqmylj7Gqy6itf6DFdkk7xXxF10665Lq8sP1E37gfDKS4J6RIV%2Bt8qyvDQ%2FBzr6NaVaInpSUT0yz5ZXAksSExmbeYuCZbhxLPO8H6mr8tewYGfYtg3DNKUp2mGLRI9pg0hg3yLsvULZW0OQRR08OKJRqCAXDOLaI%2BaWUiiLBtspIkvgDLlN3HZRgiOyWQJURmhsqhI%2F6KKcdTJZw7G2QEiGE4neFVyjb5USdL0a4%2Bhw7aQ9lZ502nvB0Yx3rd7LcpwNHFZzzVuloaSOTq2Zx%2FgGeJct%2B4Yi%2FHhZ2E6drksyk59H%2FOKY7mGBk5D10Xadtbw%2F%2F%2FCK6A%2B%2BPXqO6KkA2m2V5eZloNm75ukbOHqzub789fDql3p6ZJb4f4sobV%2Fnos6%2B4deM629v%2F0daSwDrM89vsLDd%2FvEnRyNLfd4nibimgfjP8w7RtOb9Mr%2F1O%2BCBINBwFIHZxCMO0GB0dJZVKMTQ0xODgIKZVwdduAhCLxlQ%2FgGM5785t3rtTT6SLfA4A4%2B5PKNJjYmKC2tpaAHRdR3qwMvXIGP6AmnQ6bSpSSgAGv3glbKTNnyP%2FxlOv9g4oiUSSgOojl8uxsbGBpmm0trbS1NSEI5zS3qM95ubmHitSSgAA2tvbfY399eOhx5GPmxubq7UqTVFQeKCsllyfu90pus4qKFiW5WYymbyu61f%2FB%2Fq4pKqmYKY6AAAAAElFTkSuQmCC";
var smallImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACWSURBVCjPY%2FjPgB8y0ElB%2BYHyA8UTcg%2BkLYjfEP4Bm4ILxQa5Dqn%2F4xv%2BM%2FhdcHXAUFAc8J8hzSH%2BfzhQgauCjQJWN8Q7RPz3AyqwmWC0QfO%2FwgKJBWgKwh0C%2FrsCFRgBTVP4%2F59BMABNgZ%2BDx3%2BbBghb4j8WK1wdHP4bQRUIYlNgs8DogOYGBaAPBB24DrA40Duo8UEA%2BkT4W%2BXS%2F8wAAAAASUVORK5CYII%3D";
var quoteImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEvSURBVDjLY%2Fj%2F%2Fz8DJZiBagZEtO8QAuKlQPwTiP%2FjwbuAWAWbARtXHrz1%2F%2Fefv%2F%2FxgS0n74MMuQ3EbHADgBweIP7z99%2B%2F%2Fx%2B%2B%2Ffv%2F8tO%2F%2F88%2B%2Fvv%2F5P2%2F%2Fw%2Ff%2Fft%2F782%2F%2F7df%2Ff1%2F5xXE8OoFx0GGmCEbIJcz9QBY8gVQ47MP%2F%2F4%2FBmp%2B8Pbf%2F7tQzddf%2FP1%2F9RnEgM5VZ0EGeGM14ClQ86N3UM2v%2F%2F2%2F9RKi%2BQpQ88UnuA2AewHk%2FPtAW%2B%2B8%2Fvv%2FJlDzted%2F%2F18Gar7wBGTAH7ABtYtOgAywxBqIIEOQAcg1Fx7%2FBRuMFoicuKLxDyzK5u64Cjfo%2FecfYD5Q%2FDLWaMSGgQrvPH%2F3FabxOxDXEp0SgYp7Z267AtL4BYgLSUrKQA1KQHwPiFPolxcGzAAA94sPIr7iagsAAAAASUVORK5CYII%3D";
var codeImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEXSURBVDjLY%2Fj%2F%2Fz8DJZhhmBpg2POQn2wDDDof8HvOe3osYtXzDzCxuM2vP3gvfn4MJIfXAP22e0Ies58eK9r2%2Br%2F%2F3Kf3YOIhq17eK9v95j9ITrv2jhBWA%2FRa7kVEr375vXDrq%2F9%2Bs57eUy%2B4IY0kJx2w6Nk9kFzE0uffgXIRKAboNtxlC1%2F%2B%2FGPljjdABc9%2Bq%2BZcM0Z3qmb5LWOQXOmml%2F8DZz7%2BqJB0hQ3FBerFNyNC5z%2F9nrXqxX%2BPvgf35OMuSSPJSXtPfXQPJBc089F3oFwE1jBQTLkiZNtw51jq4qf%2FXVvuwsPAa9Kjexkrnv8HyclFXxTCGwsyERf4LctvHvPuvAePBf8pDz%2FY1N45BpIbKUmZFAwAR3nW32nUrY0AAAAASUVORK5CYII%3D";
var bulletlistImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADqSURBVDjLY%2Fj%2F%2Fz8DJZiBKgbkzH9cMHXX6wcgmiwDQJq3nv%2F4H0SD%2BOXl5dlA%2FL%2BkpOR%2FQUHB%2F%2Bzs7P%2Bpqan%2FExIS%2FkdGRv4PDg7%2BT10XDHwgpsx8VNC56eWDkJ675Hmhbf3zB0uPvP1fuvQpOBDj4uKyIyIi%2FgcGBv738vL67%2Bzs%2FN%2FGxua%2FiYnJf11d3f9qamqogRjQcaugZPHjB66V14ZqINrmXyqIn3bvgXXeJfK8ANLcv%2B3lfxAN4hsZGWVra2v%2FV1FR%2BS8nJ%2FdfXFz8v5CQ0H8eHp7%2F7Ozs%2F5mZmVEDEWQzRS6gBAMAYBDQP57x26IAAAAASUVORK5CYII%3D";
var numlistImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD3SURBVDjLY%2Fj%2F%2Fz8DJRhM5Mx%2FrLLo8Lv%2FZBsA0kyRATBDYOzy8vJsIP5fUlLyv6Cg4H92dvb%2F1NTU%2FwkJCf8jIyP%2FBwcH%2F8fqgkUHSXcFA1UCce7%2Bt%2F9n7Xn9P2LiPRWyXRDae0%2Bld8tL8rwQ1HVHpXPTc7jmuLi47IiIiP%2BBgYH%2Fvby8%2Fjs7O%2F%2B3sbH5b2Ji8l9XV%2Fe%2FmpoaaiC2rX%2F%2Bv3HN0%2F81q54OUCCWL3v8v3Tp4%2F%2FFix%2BT7wKQZuu8S%2BTHAkgzzAVGRkbZ2tra%2F1VUVP7Lycn9FxcX%2Fy8kJPSfh4fnPzs7%2B39mZmbUQARpBGG7oisddA9EAPd%2F1bRtLxctAAAAAElFTkSuQmCC";
var listitemImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACwSURBVDjLY%2Fj%2F%2Fz8DJZhh1ADsBuRPiazJmxLxKa3P%2F39ki8Mnzwq9GqINyOgPbGhcnfh%2Fy5Wp%2Fy882%2FW%2Ff3fW%2F%2FB%2B3f%2Fm2ZI9RBkQ2%2B7yfePlCf83Xpv0HwR69qT%2B79%2BTDjLgO1EG%2BFQb%2Ft92Zc5%2FZLDp0lSQAf%2BJMsAyR%2Fp7966k%2F%2B27EsCa23cmkOYCoMKW4B6N%2F727UsA2g2gQn%2BgwgBrSAcSfQM6G0h2jSRk3BgASP%2BM7I0sypgAAAABJRU5ErkJggg%3D%3D";

InitConfig()
addCode(document.getElementById('jktbewtbwklj56'))
document.addEventListener('DOMNodeInserted', function(evt){if(evt.target.className == 'comment-edit') { addCode(evt.target) }}, false);
function addCode(workingDiv) {
	if(workingDiv) {
		if(previewBox_enabled) {
			workingDiv.removeChild(workingDiv.childNodes[0]);
			workingDiv.childNodes[1].style.display = '';
			workingDiv.childNodes[1].style.border = '1px solid #333';
			workingDiv.childNodes[1].appendChild(document.createElement('br'));
			if (expandedBox_enabled) { 
				workingDiv.childNodes[0].firstChild.style.height = '22em';
			}
			if (previewBox_above) { 
				workingDiv.insertBefore(workingDiv.childNodes[1], workingDiv.childNodes[0]);
				workingDiv.insertBefore(document.createElement('br'), workingDiv.childNodes[1]);
				workingDiv.insertBefore(document.createTextNode('Preview:'), workingDiv.childNodes[0]);
				preview = 0;
				edit = 1;
			} else {
				preview = 2;
				edit = 0;
				workingDiv.insertBefore(document.createElement('br'), workingDiv.childNodes[1]);
				workingDiv.insertBefore(document.createTextNode('Preview:'), workingDiv.childNodes[2]);
			}
			workingDiv.getElementsByTagName('div')[edit].firstChild.addEventListener('keyup', function(evt){ ParsePreview(evt, preview); }, false);
			workingDiv.getElementsByTagName('div')[edit].firstChild.addEventListener('focus', function(evt){ ParsePreview(evt, preview); }, false);
			workingDiv.getElementsByTagName('div')[edit].firstChild.addEventListener('input', function(evt){ ParsePreview(evt, preview); }, false);
		} else {
			workingDiv.childNodes[0].getElementsByTagName('a')[0].addEventListener('click', function() { TogglePreview('edit') }, false);
			workingDiv.childNodes[0].getElementsByTagName('a')[1].addEventListener('click', function() { TogglePreview('preview') }, false);
			if (expandedBox_enabled) { 
				workingDiv.childNodes[1].firstChild.style.height = '22em';
			}
		edit = 1;
		preview = 2;
		}
		configSpan = document.createElement('span');
		configLink = document.createElement('a');
		configLink.appendChild(document.createTextNode('Config'))
		configLink.addEventListener('click', function(){ ShowConfig() }, false);
		configSpan.style.cssFloat = 'right';
		configSpan.appendChild(configLink);
		workingDiv.getElementsByTagName('div')[edit].insertBefore(configSpan, workingDiv.getElementsByTagName('div')[edit].getElementsByTagName('span')[0]);
		workingDiv.getElementsByTagName('div')[edit].removeChild(workingDiv.getElementsByTagName('div')[edit].getElementsByTagName('span')[1])
		workingDiv.getElementsByTagName('div')[edit].removeChild(workingDiv.getElementsByTagName('div')[edit].childNodes[3])
		workingDiv.getElementsByTagName('div')[edit].removeChild(workingDiv.getElementsByTagName('div')[edit].childNodes[3])
		workingDiv.getElementsByTagName('div')[edit].removeChild(workingDiv.getElementsByTagName('div')[edit].childNodes[3])
		if(markupBar_enabled) {
			var markupArray = {'bold': 'b', 'italic': 'i', 'underline': 'u', 'strike': 's', 'link': 'url', 'small': 'small', 'quote': 'quote', 'code': 'code', 'bulletlist': 'ul', 'numlist': 'ol', 'listitem': 'li'};
			var markupDiv = document.createElement('div');
			markupDiv.id = 'ziopejrpds771';
			markupDiv.style.backgroundColor = '#999';
			markupDiv.style.display = 'table-row';
			workingDiv.getElementsByTagName('div')[edit].insertBefore(markupDiv, workingDiv.getElementsByTagName('div')[edit].firstChild);
			for(var x in markupArray) {
				var a = document.createElement('a');
				var img = document.createElement('img');
				img.src = eval(x+'Img');
				img.alt = '['+x+']';
				img.style.border = '1px solid #333';
				a.appendChild(img);
				a.setAttribute('markupType',markupArray[x]);
				a.addEventListener('click', function(evt){ addMarkup(evt, preview); }, false);
				markupDiv.appendChild(a);
			}
		} else {
			preview -= 1;
		}
	}
}
function addMarkup(evt) {
	var editBox = evt.target.parentNode.parentNode.nextSibling;
	var markupType = evt.target.parentNode.getAttribute('markupType');
	var s = editBox.selectionStart, e = editBox.selectionEnd, sL = editBox.scrollLeft, sT = editBox.scrollTop;

	if(markupType == 'url') { 
		if (editBox.value.substr(editBox.selectionStart, editBox.selectionEnd-editBox.selectionStart).match(/^.+?:\/\//)) { 
			var urlhref = editBox.value.substr(s, e-s) 
			var urldisplay = prompt('Enter display text', '');
			if (urldisplay == '') { return; }
			editBox.value = editBox.value.substr(0,s) + '['+markupType+'='+urlhref+']' + urldisplay + '[/'+markupType+']' + editBox.value.substr(e);

		} else { 
			var urlhref = prompt('Enter url', 'http://');
			if (urlhref == 'http://') { return; }
			var urldisplay = (editBox.value.substr(s, e-s).length < 1 ? prompt('Enter display text', '') : editBox.value.substr(s, e-s));
			if (!urldisplay) { urldisplay = urlhref }
			editBox.value = editBox.value.substr(0,s) + '['+markupType+'='+urlhref+']' + urldisplay + '[/'+markupType+']' + editBox.value.substr(e);
		}	
		editBox.focus(); 
		editBox.selectionStart = editBox.selectionEnd = s + ('['+markupType+'='+urlhref+']'+urldisplay).length;
	} else if(markupType == 'ul' || markupType == 'ol') { 
		editBox.value = editBox.value.substr(0,s) + '['+markupType+']\n[li]' + editBox.value.substr(s, e-s) + '[/li]\n[/'+markupType+']' + editBox.value.substr(e);	
		editBox.focus(); 
		editBox.selectionStart = editBox.selectionEnd = e + ('['+markupType+']\n[li]').length;
	} else {
		editBox.value = editBox.value.substr(0,s) + '['+markupType+']' + editBox.value.substr(s, e-s) + '[/'+markupType+']' + editBox.value.substr(e);
		editBox.focus(); 
		editBox.selectionStart = editBox.selectionEnd = e + ('['+markupType+']').length;
	}
	editBox.scrollLeft = sL;
	editBox.scrollTop  = sT;
}
function ParsePreview(evt, preview) {
	var str = evt.target.value;
	var pre = evt.target.parentNode.parentNode.getElementsByTagName('div')[preview];
	pre.innerHTML = unsafeWindow.Markup.toHtml(str, {mode: unsafeWindow.Markup.MODE_COMMENT});
	if(pre.innerHTML == '') { pre.appendChild(document.createElement('br')) }
}
function TogglePreview(type) {
	if (type == 'preview') {
		document.getElementById('ziopejrpds771').style.display = 'none';
	} else if (type == 'edit') {
		document.getElementById('ziopejrpds771').style.display = 'table-row';
	}
}
function InitConfig() {
	var configBG = document.createElement('div');
	var configDiv = document.createElement('div');
	var configDiv2 = document.createElement('div');
	configBG.id = 'configBG';
	configBG.style.position = 'fixed';
	configBG.style.left = '0';
	configBG.style.top = '0';
	configBG.style.width = '100%';
	configBG.style.height = '100%';
	configBG.style.backgroundColor = 'black';
	configBG.style.opacity = '0.7';
	configBG.style.zIndex = '998';
	configBG.style.display = 'none';
	configDiv.id = 'configDiv';
	configDiv.style.position = 'absolute';
	configDiv.style.zIndex = '999';
	configDiv.style.left = '50%';
	configDiv.style.top = '50%';
	configDiv.style.height = '120px';
	configDiv.style.width = '160px';
	configDiv.style.textAlign = 'center';
	configDiv.style.backgroundColor='#333';
	configDiv.style.display = 'none';
	window.addEventListener('scroll', function(evt){ MoveConfig(evt) }, false);
	document.body.insertBefore(configBG, document.body.childNodes[1]);
	document.body.insertBefore(configDiv, configBG);
	
	var configTable = document.createElement('table');
	var pBox_e = document.createElement('tr');
	var pBox_a = document.createElement('tr');
	var mBar_e = document.createElement('tr');
	var xBox_e = document.createElement('tr');
	
	var td = document.createElement('td');
	td.appendChild(document.createTextNode('Preview Box Enabled: '))
	pBox_e.appendChild(td)
	var td = document.createElement('td');
	var input = document.createElement('input');
	input.type = 'checkbox';
	input.id = 'pBox_e';
	input.checked = GM_getValue('previewBox_enabled', true);
	input.addEventListener('click', function() { 
		var pBox = document.getElementById('pBox_a');
		if(pBox.disabled == true) { 
			pBox.disabled = false;
		} else { 
			pBox.disabled = true; 
		} 
		if (pBox.checked == true) { 
			pBox.checked = false; 
		}
	}, false);
	td.appendChild(input);
	pBox_e.appendChild(td);

	var td = document.createElement('td');
	td.appendChild(document.createTextNode('Preview Box Above: '))
	pBox_a.appendChild(td)
	var td = document.createElement('td');
	var input = document.createElement('input');
	input.type = 'checkbox';
	input.id = 'pBox_a';
	input.checked = GM_getValue('previewBox_above', true);
	if(!GM_getValue('previewBox_enabled', true)) { input.checked = false; input.disabled = true; }
	td.appendChild(input);
	pBox_a.appendChild(td);
	
	var td = document.createElement('td');
	td.appendChild(document.createTextNode('Markup Bar Enabled: '))
	mBar_e.appendChild(td)
	var td = document.createElement('td');
	var input = document.createElement('input');
	input.type = 'checkbox';
	input.id = 'mBar_e';
	input.checked = GM_getValue('markupBar_enabled', true);
	td.appendChild(input);
	mBar_e.appendChild(td);
	
	var td = document.createElement('td');
	td.appendChild(document.createTextNode('Expanded Post Box: '))
	xBox_e.appendChild(td)
	var td = document.createElement('td');
	var input = document.createElement('input');
	input.type = 'checkbox';
	input.id = 'xBox_e';
	input.checked = GM_getValue('expandedBox_enabled', true);
	td.appendChild(input);
	xBox_e.appendChild(td);
	
	configTable.appendChild(pBox_e);
	configTable.appendChild(pBox_a);
	configTable.appendChild(mBar_e);
	configTable.appendChild(xBox_e);
	configDiv.appendChild(configTable);
	var configSaveBtn = document.createElement('input');
	var configCancelBtn = document.createElement('input');
	configSaveBtn.type = 'button';
	configSaveBtn.value = 'Save';
	configSaveBtn.addEventListener('click', function(){ SaveConfig() }, false)
	configCancelBtn.type = 'button';
	configCancelBtn.value = 'Cancel';
	configCancelBtn.addEventListener('click', function(){ CancelConfig() }, false)
	configDiv.appendChild(configSaveBtn)
	configDiv.appendChild(configCancelBtn)
}
function ShowConfig() {
	document.getElementById('configBG').style.display = '';
	document.getElementById('configDiv').style.display = '';
}
function SaveConfig() {
	GM_setValue('previewBox_enabled', document.getElementById('pBox_e').checked);
	GM_setValue('previewBox_above', document.getElementById('pBox_a').checked);
	GM_setValue('markupBar_enabled', document.getElementById('mBar_e').checked);
	GM_setValue('expandedBox_enabled', document.getElementById('xBox_e').checked);
	document.getElementById('configBG').style.display = 'none';
	document.getElementById('configDiv').style.display = 'none';
	window.alert('Refresh the page to apply changes.')
}
function CancelConfig() {
	document.getElementById('pBox_e').checked = GM_getValue('previewBox_enabled', true);
	document.getElementById('pBox_a').checked = GM_getValue('previewBox_above', true);
	document.getElementById('mBar_e').checked = GM_getValue('markupBar_enabled', true);
	document.getElementById('xBox_e').checked = GM_getValue('expandedBox_enabled', true);
	document.getElementById('configBG').style.display = 'none';
	document.getElementById('configDiv').style.display = 'none';
}

function MoveConfig(evt) {
	var configDiv = document.getElementById('configDiv')
	configDiv.style.marginTop = window.pageYOffset - 60+'px';
	configDiv.style.marginLeft = window.pageXOffset - 80+'px';
}