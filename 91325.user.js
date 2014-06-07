// ==UserScript==
// @name           علامات المجموعات في خريطة حرب القبائل
// @description    إضافة الوان على المجموعات للتميز بينها في الخريطة   
// @author         برمجة Michael Richter  و تعريب Abdullah Al-Dossari ( prince-fight )
// @namespace      http://osor.de/  +  http://tw-school.com
// @include        http://ae*.tribalwars.ae/game.php?*screen=map*
// ==/UserScript==

// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benÃ¶tigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------

(function(){

	
	// Debug: object and array dumper
	var dump = function(obj, depth) {
		if(obj.constructor == Array || obj.constructor == Object) {
			var text = '';
			if(!depth)
				var depth = 0;
			for(var p in obj) {
				if(typeof(obj[p]) == 'function')
					continue;
				for(var i = 0; i < depth; i++)
					text += '   ';
				text += '['+p+'] => ';
				if(obj[p].constructor == Array || obj[p].constructor == Object) {
					text += typeof(obj)+"...\n"+arguments.callee(obj[p], depth + 1);
				} else {
					var to = typeof(obj[p]);
					text += (to == 'string' ? '"' : '') + obj[p] + (to == 'string' ? '"' : '')+"\n";
				}
			}
			return text;
		}
		return '';
	};
	
	// JSON support ( http://www.json.org/json2.js )
	if(!this._JSON){_JSON={};}(function(){function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.to_JSON!=='function'){Date.prototype.to_JSON=function(key){return this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z';};String.prototype.to_JSON=Number.prototype.to_JSON=Boolean.prototype.to_JSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapeable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapeable.lastIndex=0;return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.to_JSON==='function'){value=value.to_JSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(typeof value.length==='number'&&!value.propertyIsEnumerable('length')){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof _JSON.stringify!=='function'){_JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('_JSON.stringify');}return str('',{'':value});};}if(typeof _JSON.parse!=='function'){_JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('_JSON.parse');};}})();
	
	var win = window;
	if(typeof unsafeWindow != 'undefined')
		win = unsafeWindow;
		
	// XPath helper
	var $x = function(p, context) {
		if(!context)
			context = document;
		var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr;
	};
	
	// createElement
	var ce = function(name) {
		return document.createElement(name);
	};
	
	// Element aus Array lÃ¶schen
	Array.remove = function(arr, idx) {
		return arr.slice(0, idx).concat(arr.slice(idx + 1));
	};
	
	// Gruppe suchen
	Array.searchgroup = function(arr, grp) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i][0] == grp) {
				return i;
			}
		}
		return -1;
	}; 
	
	// Gruppeneinstellungen lesen/schreiben
	var set_cookie = function(arr) {
		if(!/[&?]t=\d+/.test(location.href)) {
			var value = escape(_JSON.stringify(arr));
			if(win.localStorage) {
				win.localStorage.markedgroups = value;
			} else {
				if(value.length > 4096) {
					alert('Die Einstellungen fÃ¼r die Gruppen-Markierungen auf der Karte sind zu groÃŸ um in einem Cookie gespeichert zu werden. Es kann daher zu Problemen kommen. Das LÃ¶schen einiger Gruppen kann das Problem lÃ¶sen.');
				}
				document.cookie = 'markedgroups=' + value + '; expires=' + (new Date(2036, 1, 1)).toGMTString() + ';';
			}
		}
	};
	var get_cookie = function() {
		var settings = { size: 8, position: 1, orientation: 1, border: 1, groups: [] };
		var markedgroups = /markedgroups=(.*?)(?:;|$)/.exec(document.cookie);
		if(markedgroups) {
			var value = _JSON.parse(unescape(markedgroups[1]));
			if(win.localStorage) {
				document.cookie = 'markedgroups=; expires=' + (new Date(1990, 1, 1)).toGMTString() + ';';
				set_cookie(value);
			}
			settings = value;
		} else if(win.localStorage && win.localStorage.markedgroups) {
			settings = _JSON.parse(unescape(win.localStorage.markedgroups));
		}
		if(typeof(settings.length) != 'undefined') {
			alert('Die Einstellungen fÃ¼r die Markierungen auf der Karte scheinen veraltet zu sein und werden zurÃ¼ckgesetzt. (Das sollte nur ein einziges mal passieren)');
			settings = { size: 8, position: 1, orientation: 1, border: 1, groups: [] };
			set_cookie(settings);
		}
		if(typeof(settings.border) == 'undefined')
			settings.border = 1;
		return settings;
	};
	
	var spacer = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
	
	// Karte
		
	var createIcon = function(idx) {
		var img = ce('img');
		var style = '';
		if(groups.groups[idx][2] && groups.groups[idx][2] != '') {
			img.src = groups.groups[idx][2];
		} else {
			img.src = spacer;
			style = 'width: ' + groups.size + 'px; height: ' + groups.size + 'px;';
		}
		img.title = groups.groups[idx][0];
		img.setAttribute('style', style + 'background-color: ' + groups.groups[idx][1]);
		return img;
	};
	
	var groups = get_cookie();
	
	
	// Alle DÃ¶rfer holen und mit Icon versehen
	var markVillages = function() {
		var fields = $x('//div[@id="mapOld" or @id="mapNew"]/table[@class="map"]/tbody/tr/td/a');
		var search = /map_popup\(.*?, .*?, .*?, \d+, .*?, .*?, .*?, .*?, '(.*?)', .*?, \d+, .*?, .*?, .*?, .*?, .*?\)/;
		
		var match, bg, vil;
		for(var i = 0; i < fields.length; i++) {
			bg = fields[i].parentNode.style.backgroundColor;
			if((bg == '#ffffff' || bg == '#f0c800' || bg == 'rgb(255, 255, 255)' || bg == 'rgb(240, 200, 0)')
			&& (match = search.exec(fields[i].getAttribute('onmouseover')))) {
				var icodiv = ce('div');
				var style = 'position: absolute; border: ' + groups.border + 'px solid #333; z-index: 1;';
				icodiv.setAttribute('style', style);
				for(var j = 0; j < groups.groups.length; j++) {
					var vilgrps = match[1].split(', ');
					for(var k = 0; k < vilgrps.length; k++) {
						if(vilgrps[k].replace(/\\'/, '\'') == groups.groups[j][0]) {
							icodiv.appendChild(createIcon(j));
							if(groups.orientation == 2) {
								icodiv.appendChild(ce('br'));
							}
						}
					}
				}
				vil = fields[i].firstChild;
				fields[i].insertBefore(icodiv, vil);
				if(groups.position == 1) {
					if(groups.orientation == 1) {
							icodiv.style.left = (icodiv.offsetLeft + 10) + 'px';
					} else {
							icodiv.style.top = (icodiv.offsetTop + 10) + 'px';
					}
				} else if(groups.position == 2) {
 						icodiv.style.left = (icodiv.offsetLeft + vil.offsetWidth - icodiv.offsetWidth) + 'px';
				} else if(groups.position == 4) {
 						icodiv.style.left = (icodiv.offsetLeft + vil.offsetWidth - icodiv.offsetWidth) + 'px';
 						icodiv.style.top = (icodiv.offsetTop + vil.offsetHeight - icodiv.offsetHeight) + 'px';
				} else if(groups.position == 3) {
 						icodiv.style.top = (icodiv.offsetTop + vil.offsetHeight - icodiv.offsetHeight) + 'px';
				}
			}
		}
	};
	
	markVillages();
	

	var createColorPicker = function(fn) {
		var div = ce('div');
		div.title = 'Farbe wÃ¤hlen';
		var table = ce('table');
		table.setAttribute('cellspacing', '0');
		table.setAttribute('style', 'cursor:pointer;');
		var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
		var rgb = '';
		for(var x = 0; x < 16; x += 3) {
			var tr = ce('tr');
			for(var y = 0; y < 16; y += 3) {
				for(var z = 0; z < 16; z += 3) {
					rgb = hex[x] + hex[y] + hex[z];
					var td = ce('td');
					td.setAttribute('style', 'background-color:#' + rgb + '; width: 5px; height: 5px; padding: 0px;');
					td.addEventListener('click', fn, false);
					tr.appendChild(td);
				}
			}
			table.appendChild(tr);
		}
		div.appendChild(table);
		return div;
	};
	
	var createLinks = function(grp) {
		var td = ce('span');
		
		// Link zum setzen/Ã¤ndern der Farbe
		var a = ce('a');
		a.href = '#';
		a.addEventListener('click', function(evt) {
		// Bei Link-Klick Gruppe hinzufÃ¼gen
		
			var mgrps = get_cookie();
			var root = evt.target.parentNode;
			if(evt.target.nodeName == 'IMG') {
				root = root.parentNode;
			}
			var groupname = root.nextSibling.textContent.replace(/^\s+/, '').replace(/\s+$/, '');
			var idx = Array.searchgroup(mgrps.groups, groupname);
			if(idx >= 0) {
				document.getElementById('markgroupcolor').style.backgroundColor = mgrps.groups[idx][1];
				document.getElementById('markgroupurl').value = mgrps.groups[idx][2];
			} else {
				document.getElementById('markgroupcolor').style.backgroundColor = '';
				document.getElementById('markgroupurl').value = '';
			}
			document.getElementById('markgroup').value = groupname;
			var adddialog = document.getElementById('addgroupmark');
			adddialog.style.display = 'block';
			evt.preventDefault();
			
		}, false);
		td.appendChild(a);
		
		// 
		var mgroups = get_cookie();
		var idx = Array.searchgroup(mgroups.groups, grp);
		if(idx >= 0) {
			a.title = 'Markierung Ã¤ndern';
			var img = ce('img');
			var style = '';
			if(mgroups.groups[idx][2] && mgroups.groups[idx][2] != '') {
				img.src = mgroups.groups[idx][2];
			} else {
				img.src = spacer;
				style = 'width: ' + mgroups.size + 'px; height: ' + mgroups.size + 'px;'; 
			}
			img.setAttribute('style', style + 'border: ' + mgroups.border + 'px solid #333; background-color: ' + mgroups.groups[idx][1] + ';');
			a.appendChild(img);
		
			// "Markierung lÃ¶schen"-Link
			var adel = ce('a');
			adel.href = '#';
			adel.textContent = 'x';
			adel.title = 'Markierung lÃ¶schen';
			adel.addEventListener('click', function(evt) {
			// Bei Klick, Gruppe lÃ¶schen
				var mgrps = get_cookie();
				var root = evt.target.parentNode;
				var idx = Array.searchgroup(mgrps.groups, root.nextSibling.textContent.replace(/^\s+/, '').replace(/\s+$/, ''));
				if(idx >= 0) {
					mgrps.groups = Array.remove(mgrps.groups, idx);
					set_cookie(mgrps);
					root.parentNode.replaceChild(createLinks(root.nextSibling.textContent.replace(/^\s+/, '').replace(/\s+$/, '')), root);
				}
				evt.preventDefault();
			}, false);
			td.appendChild(document.createTextNode(' '));
			td.appendChild(adel);
		} else {
			a.textContent = '+';
			a.title = 'Markierung hinzufÃ¼gen';
		}
		
		return td;
	};

	// Alle Gruppen suchen
	var groupnames = [];
	var select = $x('//form/select[@name="add_group"]');
	
	if(select.length > 0) {
		for(var i = 0; i < select[0].options.length; i++) {
			groupnames.push(select[0].options[i].text);
		}
	}
	
	// Nicht vorhandenene Gruppen lÃ¶schen
	var groups = get_cookie();
	var found;
	for(var i = 0; i < groups.groups.length; i++) {
		found = false;
		for(var j = 0; j < groupnames.length; j++) {
			if(groups.groups[i][0] == groupnames[j]) {
				found = true;
				break;
			}
		}
		if(!found) {
			groups.groups = Array.remove(groups.groups, i);
			set_cookie(groups);
			i--;
		}
	}
	
	
	var legend = $x('//td[@id="map_topo"]');
	if(legend.length > 0) {
		var div = ce('div');
		div.id = 'markedgroups';
		div.setAttribute('style', 'margin-top: 10px;');
		var tit = ce('h4');
		tit.textContent = 'علامة المجموعة';
		div.appendChild(tit);
		for(var i = 0; i < groups.groups.length; i++) {
			var line = ce('div');
			line.setAttribute('style', 'margin-left:6px;');
			var links = createLinks(groups.groups[i][0]);
			line.appendChild(links);
			line.appendChild(document.createTextNode(' ' + groups.groups[i][0]));
			div.appendChild(line);
		}
		legend[0].appendChild(div);
		
		var ahide = ce('a');
		ahide.href = '#';
		ahide.textContent = 'الإعدادات';
		ahide.addEventListener('click', function(evt) {
			var hidden = document.getElementById('markedgroups_hidden');
			if(hidden.style.display == 'none')
				hidden.style.display = 'block';
			else
				hidden.style.display = 'none';
			evt.preventDefault();
		}, false);
		legend[0].appendChild(ahide);
		
		var divhide = ce('div');
		divhide.id = 'markedgroups_hidden';
		divhide.setAttribute('style', 'display: none;');
		for(var i = 0; i < groupnames.length; i++) {
			var idx = Array.searchgroup(groups.groups, groupnames[i]);
			if(idx < 0) {
				var line = ce('div');
				line.setAttribute('style', 'margin-left:6px;');
				var links = createLinks(groupnames[i]);
				line.appendChild(links);
				line.appendChild(document.createTextNode(' ' + groupnames[i]));
				divhide.appendChild(line);
			}
		}		
		
		var div = ce('div');
		div.textContent = 'حجم اللون: ';
		var input = ce('input');
		input.value = groups.size;
		input.setAttribute('type', 'text');
		input.setAttribute('style', 'width: 30px; margin-top: 4px;');
		input.setAttribute('maxlength', '2');
		input.addEventListener('change', function(evt) {
			var settings = get_cookie();
			var newval;
			try {
				newval = parseInt(evt.target.value, 10);
			} catch(e) {
				newval = settings.size;
			}
			settings.size = newval;
			set_cookie(settings);
		}, false);
		div.appendChild(input);
		divhide.appendChild(div);
		
		var div = ce('div');
		div.textContent = 'موقع اللون: ';
		var select = ce('select');
		select.options[select.options.length] = new Option('أعلى اليسار', 1, true, (groups.position == 1 ? true : false));
		select.options[select.options.length] = new Option('أعلى اليمين', 2, false, (groups.position == 2 ? true : false));
		select.options[select.options.length] = new Option('أسفل اليسار', 3, false, (groups.position == 3 ? true : false));
		select.options[select.options.length] = new Option('أسفل اليمين', 4, false, (groups.position == 4 ? true : false));
		select.addEventListener('change', function(evt) {
			var settings = get_cookie();
			settings.position = evt.target.options[evt.target.selectedIndex].value;
			set_cookie(settings);
		}, false);
		div.appendChild(select);
		divhide.appendChild(div);
		
		var div = ce('div');
		div.textContent = 'الاتجاه: ';
		var select = ce('select');
		select.options[select.options.length] = new Option('أفقي', 1, true, (groups.orientation == 1 ? true : false));
		select.options[select.options.length] = new Option('عمودي', 2, false, (groups.orientation == 2 ? true : false));
		select.addEventListener('change', function(evt) {
			var settings = get_cookie();
			settings.orientation = evt.target.options[evt.target.selectedIndex].value;
			set_cookie(settings);
		}, false);
		div.appendChild(select);
		divhide.appendChild(div);
		
		var div = ce('div');
		div.textContent = 'الاطار: ';
		var select = ce('select');
		select.options[select.options.length] = new Option('نعم', 1, true, (groups.border == 1 ? true : false));
		select.options[select.options.length] = new Option('لا', 0, false, (groups.border == 0 ? true : false));
		select.addEventListener('change', function(evt) {
			var settings = get_cookie();
			settings.border = evt.target.options[evt.target.selectedIndex].value;
			set_cookie(settings);
		}, false);
		div.appendChild(select);
		divhide.appendChild(div);
		
		legend[0].appendChild(divhide);
		
	
		// Ã„nderungs-Dialog hinzufÃ¼gen
		var add = ce('div');
		add.id = 'addgroupmark';
		add.setAttribute('style', 'margin-top: 10px; display: none');
		
		var input = ce('input');
		input.id = 'markgroup';
		input.type = 'hidden';
		add.appendChild(input);
				
		var table = ce('table');
		table.className = 'main';
		table.setAttribute('style', 'width: 100%; height: 100%;');
		
		var tr1 = ce('tr');
		
		var td1 = ce('td');
		td1.appendChild(document.createTextNode('اللون: '));
		var img = ce('img');
		img.src = spacer;
		img.setAttribute('style', 'width:16px;height:16px;vertical-align:middle;border:1px solid #333;cursor:pointer;');
		img.id = 'markgroupcolor';
		img.title = 'Farbe lÃ¶schen';
		img.addEventListener('click', function(){
			document.getElementById('markgroupcolor').style.backgroundColor = '';
		}, false);
		td1.appendChild(img);
		tr1.appendChild(td1);
		
		var td2 = ce('td');
		td2.appendChild(createColorPicker(function(){
			document.getElementById('markgroupcolor').style.backgroundColor = this.style.backgroundColor;
		}));
		tr1.appendChild(td2);
		table.appendChild(tr1);
		
		var tr2 = ce('tr');
		table.appendChild(tr2);
		var html = '<td>اختر الصورة:</td><td><input type="text" style="width:97%;" id="markgroupurl" /><div>';
		var icons = [
			'spear',
			'sword',
			'axe',
			'spy',
			'light',
			'heavy',
			'ram',
			'catapult',
			'snob'
		];
		for(var i = 0; i < icons.length; i++) {
			html += '<img src="graphic/unit/unit_' + icons[i] + '.png" onclick="document.getElementById(\'markgroupurl\').value=\'graphic/unit/unit_' + icons[i] + '.png\';" /> ';
		}
		html += '</div></td>';
		tr2.innerHTML = html;
		
		var tr3 = ce('tr');
		var td3 = ce('td');
		td3.setAttribute('colspan', '2');
		td3.setAttribute('style', 'text-align:center;');
		var btn = ce('button');
		btn.textContent = 'حفظ';
		btn.addEventListener('click', function(){
		// Bei Klick, Gruppe speichern
			var mgrps = get_cookie();
			var groupname = document.getElementById('markgroup').value;
			var idx = Array.searchgroup(mgrps.groups, groupname);
			if(idx >= 0) {
				mgrps.groups[idx][1] = document.getElementById('markgroupcolor').style.backgroundColor;
				mgrps.groups[idx][2] = document.getElementById('markgroupurl').value;
			} else {
				mgrps.groups.push([
					groupname,
					document.getElementById('markgroupcolor').style.backgroundColor,
					document.getElementById('markgroupurl').value
				]);
			}
			set_cookie(mgrps);
			document.getElementById('addgroupmark').style.display = 'none';
			var grps = $x('//div[@id="markedgroups" or @id="markedgroups_hidden"]/div/span');
			for(var i = 0; i < grps.length; i++) {
				if(grps[i].nextSibling.textContent.replace(/^\s+/, '').replace(/\s+$/, '') == groupname) {
					grps[i].parentNode.replaceChild(createLinks(groupname), grps[i]);
				}
			}
		}, false);
		td3.appendChild(btn);
		tr3.appendChild(td3);
		table.appendChild(tr3); 
		
		add.appendChild(table);
		
		legend[0].appendChild(add);
		
	}
	
	
	// Scrollen der Karte Ã¼berwachen
	var scrolltds = $x('//table[@class="map_container"]/tbody/tr/td[@onclick]');
	for(var i = 0; i < scrolltds.length; i++) {
		scrolltds[i].addEventListener('click', function(){
			window.setTimeout(function(){
				var newmap = document.getElementById('mapNew');
				var oldmap = document.getElementById('mapOld');
				if((newmap.style.left == '0px' && newmap.style.top == '0px') || (oldmap.style.left == '0px' && oldmap.style.top == '0px')) {
					// fertig gescrollt
					markVillages();
				} else {
					// noch nicht fertig gescrollt
					window.setTimeout(arguments.callee, 200);
				}
			}, 300);
		}, true);
	}

})();
