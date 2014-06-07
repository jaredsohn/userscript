// ==UserScript==
// @name           DS Gruppen auf Karte markieren
// @description    Fügt auf der Karte Farbmarkierungen für bestimmte Gruppen zu Dörfern hinzu
// @author         Michael Richter
// @namespace      http://osor.de/
// @include        http://ch*.staemme.ch/game.php?*screen=map*
// @include        http://ch*.staemme.ch/groups.php*
// @exclude        http://ch*.staemme.ch/groups.php*mode=village*
// ==/UserScript==

// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------

(function(){

	// --------- Einstellungen ---------
	
	// Ecke wählen (1 = links oben, 2 = rechts oben, 3 = rechts unten, 4 = links unten)
	var position = 1;
	
	// Rechung wählen (1 = waagerecht, 2 = senkrecht)
	var orientation = 1;
	
	// Größe der einzelnn Markierungen in Pixel
	var size = 8;
	
	// --------- Ende ---------
	// Folgender Code sollte nicht verändert werden.
	
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
	}
	
	// JSON support ( http://www.json.org/json2.js )
	if(!this._JSON){_JSON={};}(function(){function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.to_JSON!=='function'){Date.prototype.to_JSON=function(key){return this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z';};String.prototype.to_JSON=Number.prototype.to_JSON=Boolean.prototype.to_JSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapeable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapeable.lastIndex=0;return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.to_JSON==='function'){value=value.to_JSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(typeof value.length==='number'&&!value.propertyIsEnumerable('length')){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof _JSON.stringify!=='function'){_JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('_JSON.stringify');}return str('',{'':value});};}if(typeof _JSON.parse!=='function'){_JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('_JSON.parse');};}})();

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
	
	// Element aus Array löschen
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
		document.cookie = 'markedgroups=' + encodeURIComponent(_JSON.stringify(arr)) + '; expires=' + (new Date(2036, 1, 1)).toGMTString() + ';';
	};
	var get_cookie = function() {
		var markedgroups = /markedgroups=(.*?)(?:;|$)/.exec(document.cookie);
		if(markedgroups) {
			return _JSON.parse(decodeURIComponent(markedgroups[1]));
		}
		return [];
	};
	
	var spacer = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
	
	if(/groups\.php/.test(location.href)) {
		if(/mode=village/.test(location.href))
			return;
	// Gruppen bearbeiten
	
		// Erstellen der Zelle mit Aktions-links
		var createCell = function(grp) {
			var td = ce('td');
			
			// Link zum setzen/ändern der Farbe
			var a = ce('a');
			a.href = '#';
			a.addEventListener('click', function(evt) {
			// Bei Link-Klick Gruppe hinzufügen
			
				var mgrps = get_cookie();
				var root = evt.target.parentNode;
				if(evt.target.nodeName == 'IMG') {
					root = root.parentNode;
				}
				var groupname = root.nextSibling.textContent;
				var idx = Array.searchgroup(mgrps, groupname);
				if(idx >= 0) {
					document.getElementById('markgroupcolor').style.backgroundColor = mgrps[idx][1];
					document.getElementById('markgroupurl').value = mgrps[idx][2];
				} else {
					document.getElementById('markgroupcolor').style.backgroundColor = '';
					document.getElementById('markgroupurl').value = '';
				}
				document.getElementById('markgroup').value = groupname;
				var adddialog = document.getElementById('addgroupmark');
				adddialog.style.display = 'block';
				
			}, false);
			td.appendChild(a);
			
			// 
			var mgroups = get_cookie();
			var idx = Array.searchgroup(mgroups, grp);
			if(idx >= 0) {
				var img = ce('img');
				var style = '';
				if(mgroups[idx][2] && mgroups[idx][2] != '') {
					img.src = mgroups[idx][2];
				} else {
					img.src = spacer;
					style = 'width: 8px; height: 8px;'; 
				}
				img.setAttribute('style', style + 'border: 1px solid #333; background-color: ' + mgroups[idx][1] + ';');
				img.title = img.alt = mgroups[idx][0];
				a.appendChild(img);
			
				// "Markierung löschen"-Link
				var adel = ce('a');
				adel.href = '#';
				adel.textContent = '×';
				adel.title = 'Markierung löschen';
				adel.addEventListener('click', function(evt) {
				// Bei Klick, Gruppe löschen
					var mgrps = get_cookie();
					var root = evt.target.parentNode;
					var idx = Array.searchgroup(mgrps, root.nextSibling.textContent);
					if(idx >= 0) {
						mgrps = Array.remove(mgrps, idx);
						set_cookie(mgrps);
						root.parentNode.replaceChild(createCell(root.nextSibling.textContent), root);
					}
				}, false);
				td.appendChild(document.createTextNode(' '));
				td.appendChild(adel);
			} else {
				a.textContent = '•';
			}
			
			return td;
		};
		
		var createColorPicker = function(fn) {
			var div = ce('div');
			div.title = 'Farbe wählen';
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
		
		var grps = $x('//td[starts-with(@onclick,"document.location.href=\'/groups.php?group_id=")]');
		var mgroups = get_cookie();
		
		// Nicht vorhandenene Gruppen löschen
		var found;
		for(var i = 0; i < mgroups.length; i++) {
			found = false;
			for(var j = 0; j < grps.length; j++) {
				if(mgroups[i][0] == grps[j].textContent) {
					found = true;
					break;
				}
			}
			if(!found) {
				mgroups = Array.remove(mgroups, i);
				set_cookie(mgroups);
				i--;
			}
		}
		
		// Links einfügen
		for(var i = 0; i < grps.length; i++) {
			var td = createCell(grps[i].textContent);
			grps[i].parentNode.insertBefore(td, grps[i]);
		}
		
		// Änderungs-Dialog hinzufügen
		var add = ce('div');
		add.id = 'addgroupmark';
		add.setAttribute('style', 'margin-top: 16px; display: none');
		
		var input = ce('input');
		input.id = 'markgroup';
		input.type = 'hidden';
		add.appendChild(input);
				
		var table = ce('table');
		table.className = 'main';
		table.setAttribute('style', 'width: 100%; height: 100%;');
		
		var tr1 = ce('tr');
		
		var td1 = ce('td');
		td1.appendChild(document.createTextNode('Farbe: '));
		var img = ce('img');
		img.src = spacer;
		img.setAttribute('style', 'width:16px;height:16px;vertical-align:middle;border:1px solid #333;cursor:pointer;');
		img.id = 'markgroupcolor';
		img.title = 'Farbe löschen';
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
		var html = '<td>Symbol-URL:</td><td><input type="text" style="width:97%;" id="markgroupurl" /><div>';
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
		btn.textContent = 'Speichern';
		btn.addEventListener('click', function(){
		// Bei Klick, Gruppe speichern
			var mgrps = get_cookie();
			var groupname = document.getElementById('markgroup').value;
			var idx = Array.searchgroup(mgrps, groupname);
			if(idx >= 0) {
				mgrps[idx][1] = document.getElementById('markgroupcolor').style.backgroundColor;
				mgrps[idx][2] = document.getElementById('markgroupurl').value;
			} else {
				mgrps.push([
					groupname,
					document.getElementById('markgroupcolor').style.backgroundColor,
					document.getElementById('markgroupurl').value
				]);
			}
			set_cookie(mgrps);
			document.getElementById('addgroupmark').style.display = 'none';
			var grps = $x('//td[starts-with(@onclick,"document.location.href=\'/groups.php?group_id=")]');
			for(var i = 0; i < grps.length; i++) {
				if(grps[i].textContent == groupname) {
					grps[i].parentNode.replaceChild(createCell(groupname), grps[i].previousSibling);
				}
			}
		}, false);
		td3.appendChild(btn);
		tr3.appendChild(td3);
		table.appendChild(tr3); 
		
		add.appendChild(table);
		
		document.body.appendChild(add);
		
	} else {
	// Karte
		
		var createIcon = function(idx) {
			var img = ce('img');
			var style = '';
			if(groups[idx][2] && groups[idx][2] != '') {
				img.src = groups[idx][2];
			} else {
				img.src = spacer;
				style = 'width: ' + size + 'px; height: ' + size + 'px;';
			}
			img.title = groups[idx][0];
			img.setAttribute('style', style + 'background-color: ' + groups[idx][1]);
			return img;
		};
		
		var groups = get_cookie();
		
		// Legende hinzufügen
		var legend = $x('//form/table[@class="map_container"]/parent::*/parent::td'); 
		if(legend.length > 0) {
			var div = ce('div');
			div.style.padding = '10px';
			var html = '<h3>Legende</h3>';
			for(var i = 0; i < groups.length; i++) {
				
				html += '<div><img style="border: 1px solid #333; background-color: ' + groups[i][1] + ';';
				
				if(groups[i][2] && groups[i][2] != '') {
					html +=  '" src="' + groups[i][2] + '"';
				} else {
					html += 'width: ' + size + 'px; height: ' + size + 'px;" src="' + spacer + '"';
				}
				html += ' alt="' + groups[i][0] + '" title="' + groups[i][0] + '" /> ' + groups[i][0] + '</div>';
			}
			div.innerHTML = html;
			legend[0].appendChild(div);
		}
		
		// Alle Dörfer holen und mit Icon versehen
		var markVillages = function() {
			var fields = $x('//div[@id="mapOld" or @id="mapNew"]/table[@class="map"]/tbody/tr/td/a');
			var search = /map_popup\(.*?, .*?, .*?, \d+, .*?, .*?, '(.*)', .*?, \d+, \d+, .*?, .*?\)/;
			var match, bg, vil;
			for(var i = 0; i < fields.length; i++) {
				bg = fields[i].parentNode.style.backgroundColor;
				if((bg == '#ffffff' || bg == '#f0c800' || bg == 'rgb(255, 255, 255)' || bg == 'rgb(240, 200, 0)')
				&& (match = search.exec(fields[i].getAttribute('onmouseover')))) {
					var icodiv = ce('div');
					icodiv.setAttribute('style', 'position: absolute; border: 1px solid #333; z-index: 1;');
					for(var j = 0; j < groups.length; j++) {
						var vilgrps = match[1].split(', ');
						for(var k = 0; k < vilgrps.length; k++) {
							if(vilgrps[k].replace(/\\'/, '\'') == groups[j][0]) {
								icodiv.appendChild(createIcon(j));
								if(orientation == 2) {
									icodiv.appendChild(ce('br'));
								}
							}
						}
					}
					vil = fields[i].firstChild;
					fields[i].insertBefore(icodiv, vil);
					switch(position) {
						default:
						case 1:
							if(orientation == 1)
								icodiv.style.left = (icodiv.offsetLeft + 10) + 'px';
							else
								icodiv.style.top = (icodiv.offsetTop + 10) + 'px';
							break;
						case 2:
							icodiv.style.left = (icodiv.offsetLeft + vil.offsetWidth - icodiv.offsetWidth) + 'px';
							break;
						case 3:
							icodiv.style.left = (icodiv.offsetLeft + vil.offsetWidth - icodiv.offsetWidth) + 'px';
							icodiv.style.top = (icodiv.offsetTop + vil.offsetHeight - icodiv.offsetHeight) + 'px';
							break;
						case 4:
							icodiv.style.top = (icodiv.offsetTop + vil.offsetHeight - icodiv.offsetHeight) + 'px';
							break;
					}
				}
			}
		}
		markVillages();
		
		// Scrollen der Karte überwachen
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
	}

})();
