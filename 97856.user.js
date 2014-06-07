var localMetaString = <><![CDATA[
// ==UserScript==
// @name           Script Update Checker
// @namespace      kryptonite
// @description    Code to add to any Greasemonkey script to let it check for updates.
// @version        0.2
// @include        *
// ==/UserScript==
]]></>.toString();

// Here is the full program minified and all in one line of code so as not to hog up your workspace. Please include the copyright notice too
// "Script Update Function" v0.2 by Moshe K. licensed under the GPL 3.0 license
// function checkForUpdate(b,m){function j(a,c){for(var d in c)try{a[d]=a[d]||c[d]}catch(i){try{a[d]={}}catch(o){}j(a[d],c[d])}}function g(a,c){if(a){if(a.constructor===Array)return g.apply(0,a);if(!c)return g("div",{innerHTML:a,style:{cssText:"position: fixed; bottom: 0px; left: 0px;"}});var d=document.createElement(a);j(d,c);document.body.appendChild(d);return d}}function n(a){var c=a.match(/\d+/);a=a.match(/[a-z]{1,3}/i);return(c||1)*({now:0,time:0,ms:1,mil:1,s:1E3,sec:1E3,min:6E4,hr:36E5,hrs:36E5, hou:36E5,d:864E5,day:864E5,mon:2592E6,y:33372E6,yea:33372E6}[a]||1)}function k(a){if(!a||typeof a!=="string")return a;for(var c={},d=a.split("\n"),i=0;i<d.length;i++)if(a=d[i].match(/@(\S*)\s*(.*)/))c[a[1]]=a[2];return c}function l(a,c){GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/source/"+a+".meta.js?"+ +new Date,headers:{"Cache-Control":"no-cache"},onload:function(d){c(k(d.responseText))}})}try{if(b){var h=GM_getValue("CACHED_SCRIPT_META_JSON",""),e=JSON.parse(h||null),f= k(b.localMeta);if(typeof b!=="object")b={id:b};b.onUpdate=m||b.onUpdate;j(b,{onUpdate:function(a){return"There is a newer version of "+a.name+'. <a href="http://userscripts.org/scripts/show/'+a["uso:script"]+'">Update now</a>'},noUpdate:function(){},checkEvery:"day",metasMatch:function(a,c){return(a.version||a["uso:version"]||a)==(c.version||c["uso:version"]||c)}});b.checkEvery=n(b.checkEvery);if(e){if(new Date-e.lastCheck<b.checkEvery)return f?b.metasMatch(e,f)?g(b.noUpdate(e,f)):g(b.onUpdate(e, f)):false;else l(b.id,function(a){b.metasMatch(a,f||e)?g(b.noUpdate(a,f||e)):g(b.onUpdate(a,f||e));e=a;e.lastCheck=+new Date;h=JSON.stringify(e);GM_setValue("CACHED_SCRIPT_META_JSON",h)});return true}else{l(b.id,function(a){a.lastCheck=+new Date;h=JSON.stringify(a);GM_setValue("CACHED_SCRIPT_META_JSON",h)});return f?checkForUpdate(b):false}}}catch(p){}};

checkForUpdate({ id: 97856, localMeta: localMetaString, checkEvery: 'minute' });

// I plan on doing a more thorough documentation of this function in the near future

/*
 * Note that I used my script number (97856) in these examples.
 *
 * usage: checkForUpdate(scriptId, [updateFunction])
 * scriptId- The script id
 * updateFunction- The function that's called if there's a newer version of the
 *     script with the meta info passed as the first parameter. If a string is
 *     returned then it displays the returned string in the lower left corner.
 *     You can also return an array like the following:
 *         ['div', {
 *             innerHTML: "There is a new version of 97856",
 *             style { border: '1px solid black',
 *                     position: 'fixed',
 *                     bottom: '0px',
 *                     left: '0px'
 *             },
 *             onclick: function() { alert('hi'); }
 *         }];
 * examples:
 *     checkForUpdate(97856);
 *
 *     checkForUpdate(97856, function(meta){
 *         if (confirm('There is an update for ' + meta.name + '\nUpdate Now?'))
 *             window.location = 'http://userscripts.org/scripts/show/' +
 *                 meta['uso:script'];
 *     });
 *
 * usage: checkForUpdate(options)
 * options- A map of options to pass to checkForUpdate(). Supported keys:
 *     id: The script id (required)
 *     localMeta: A hard coded string or object of the meta, also can just be
 *         the version number. It's recommended to use this because the
 *         function will know for certain if an update is called for.
 *     onUpdate: A function to call if there's a newer version of the script.
 *         (In essance the same as updateFunction)
 *     noUpdate: A function to call if there's no newer version of the script.
 *         Same deal as onUpdate except it's called on the lack of an update
 *     checkEvery: A string that specifies how often to preform the check.
 *         Accepted values: '2 days', 'years: 10', 'month', 'now', 'time'
 *     metasMatch: A function that compares the two metas to see if an update is
 *         called for. The new meta and old meta are passed to it respectively.
 * examples:
 *     checkForUpdate({
 *         id: 97856,
 *         localMeta: { name: 'Random Script Name' },
 *         onUpdate: function(meta) {
 *             return meta.name + ' needs to be updated to work. <a href="' +
 *                 'http://userscripts.org/scripts/show/' + meta['uso:script'] +
 *                 '">Update now</a>';
 *         },
 *         noUpdate: function(meta) { return meta.name + ' is up to date'; },
 *         checkEvery: 'day',
 *         metasMatch: function(m1, m2) { return m1.name === m2.name; }
 *     });
 *
 *     checkForUpdate({
 *         id: 97856,
 *         onUpdate: function(newMeta, oldMeta) {
 *             return newMeta.name + ' has ' +
 *                 (newMeta['uso:installs'] - oldMeta['uso:installs']) +
 *                 ' more installs for a total of ' + newMeta['uso:installs'];
 *         },
 *         noUpdate: function(meta) {
 *             return meta.name + ' has ' + meta['uso:installs'] + 'installs';
 *         },
 *         checkEvery: 'now',
 *         metasMatch: function(newMeta, oldMeta) {
 *             return newMeta['uso:installs'] === oldMeta['uso:installs'];
 *         }
 *     });
 *
 *
 * If you look at the code you can figure out some cool hacks.
 * Here's one to just mess around with the two metas:
 *     checkForUpdate({ id: 97856, checkEvery: 'time', metasMatch: function(newMeta, oldMeta) {
 *         alert('You are using ' + newMeta.name + ' and last visited at + oldMeta.lastCheck);
 *         return false;
 *     }});
 *
 */


function checkForUpdate(options, updateFunction) {
	try {
		if (!options) { return; } // return undefined because the function was called incorrectly

		var defaults = {
				onUpdate: function(newMeta) {
					return 'There is a newer version of ' +
						newMeta.name + '. <a href="' +
						'http://userscripts.org/scripts/show/' +
						newMeta['uso:script'] + '">Update now</a>';
				},
				noUpdate: function() {}, // Doesn't need updating (usually do nothing)
				checkEvery: 'day',
				metasMatch: function(meta1, meta2) {
					// Type coercion because it could be a string or number
					return ((meta1.version || meta1['uso:version'] || meta1) ==
						(meta2.version || meta2['uso:version'] || meta2));
				}
			},
			cachedRemoteMetaJson = GM_getValue('CACHED_SCRIPT_META_JSON', ''),
			cachedRemoteMeta = JSON.parse(cachedRemoteMetaJson || null),
			hardCopyLocalMeta = parseMetaObjectFromString(options.localMeta);

		if (typeof options !== 'object') {
			options = { id: options };
		}
		options.onUpdate = updateFunction || options.onUpdate;
		extend(options, defaults);
		options.checkEvery = strToMs(options.checkEvery);

		if (!cachedRemoteMeta) { // First time ever calling checkForUpdate()
			getMeta(options.id, function(meta) {
				meta.lastCheck = +new Date();
				cachedRemoteMetaJson = JSON.stringify(meta);
				GM_setValue('CACHED_SCRIPT_META_JSON', cachedRemoteMetaJson);
			});
			return hardCopyLocalMeta ? checkForUpdate(options) : false; // return false when we don't check for update
		} else { // Now we have to compare the online version to local version
			if (new Date() - cachedRemoteMeta.lastCheck < options.checkEvery) {
				if (!hardCopyLocalMeta) {
					return false; // false because we didn't check for update
				} else { // Check against a cached copy of the meta data
					if (options.metasMatch(cachedRemoteMeta, hardCopyLocalMeta)) {
						return messageDiv(options.noUpdate(cachedRemoteMeta, hardCopyLocalMeta));
					} else {
						return messageDiv(options.onUpdate(cachedRemoteMeta, hardCopyLocalMeta));
					}
				}
			} else {
				getMeta(options.id, function(newMeta) {
					if (options.metasMatch(newMeta, hardCopyLocalMeta || cachedRemoteMeta)) {
						messageDiv(options.noUpdate(newMeta, hardCopyLocalMeta || cachedRemoteMeta));
					} else {
						messageDiv(options.onUpdate(newMeta, hardCopyLocalMeta || cachedRemoteMeta));
					}
					cachedRemoteMeta = newMeta;
					cachedRemoteMeta.lastCheck = +new Date();
					cachedRemoteMetaJson = JSON.stringify(cachedRemoteMeta);
					GM_setValue('CACHED_SCRIPT_META_JSON', cachedRemoteMetaJson);
				});
			}
			return true; // true because we're in middle of checking for update
		}
	} catch(e) {}

	function extend(a, b) {
		for (var i in b) {
			try {
				a[i] = a[i] || b[i]
			} catch(e) {
				try { a[i] = {}; } catch(e) {}
				extend(a[i], b[i])
			}
		}
	}
	function messageDiv(tag, props) {
		if (!tag) { return; }
		if (tag.constructor === Array) { return messageDiv.apply(0, tag); }
		if (!props) {
			return messageDiv('div', {
				innerHTML: tag,
				style: {cssText: 'position: fixed; bottom: 0px; left: 0px;'}
			});
		}
		var element = document.createElement(tag);
		extend(element, props)
		document.body.appendChild(element);
		return element;
	}
	function strToMs(str) {
		var multiplier = {
			now: 0, time: 0, ms: 1, mil: 1, s: 1000, sec: 1000, min: 1000*60,
			hr: 1000*60*60, hrs: 1000*60*60, hou: 1000*60*60,
			d: 1000*60*60*24, day: 1000*60*60*24, mon: 1000*60*60*24*30,
			y: 1000*60*60*24*386.25, yea: 1000*60*60*24*386.25
		},
		num = str.match(/\d+/),	units = str.match(/[a-z]{1,3}/i)
		return (num || 1) * (multiplier[units] || 1);
	}
	function parseMetaObjectFromString(file) {
		if (!file || typeof file !== 'string') { return file; }
		var ret = {}, matched, lines = file.split('\n');
		for (var i = 0; i < lines.length; i++) {
			matched = lines[i].match(/@(\S*)\s*(.*)/);
			if (matched) {
				ret[matched[1]] = matched[2];
			}
		}
		return ret;
	}
	function getMeta(id, callback) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/' + id +
				'.meta.js?' + +new Date(),
			headers: { 'Cache-Control': 'no-cache' },
			onload: function(response) {
				callback(parseMetaObjectFromString(response.responseText));
			}
		});
	}

};
