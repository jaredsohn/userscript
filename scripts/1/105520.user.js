// ==UserScript==
// @id             whatimg-drag-drop
// @name           WhatIMG: Drag + Drop Files
// @namespace      hateradio)))
// @author         hateradio
// @version        2.2
// @updateURL      https://userscripts.org/scripts/source/105520.meta.js
// @description    This script allows you to drag and drop files for an easier upload process.
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM4Q0RGNzA3OUY5MzExRTBCOEQ4QzFGN0Q0NTcwQkQ5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM4Q0RGNzA4OUY5MzExRTBCOEQ4QzFGN0Q0NTcwQkQ5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzhDREY3MDU5RjkzMTFFMEI4RDhDMUY3RDQ1NzBCRDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzhDREY3MDY5RjkzMTFFMEI4RDhDMUY3RDQ1NzBCRDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7XViS2AAAIFElEQVR42rxaa5rbNgwk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
// @icon64         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM4Q0RGNzA3OUY5MzExRTBCOEQ4QzFGN0Q0NTcwQkQ5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM4Q0RGNzA4OUY5MzExRTBCOEQ4QzFGN0Q0NTcwQkQ5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzhDREY3MDU5RjkzMTFFMEI4RDhDMUY3RDQ1NzBCRDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzhDREY3MDY5RjkzMTFFMEI4RDhDMUY3RDQ1NzBCRDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7XViS2AAAIFElEQVR42rxaa5rbNgwk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
// @include        http*://*whatimg.com/
// @match          *://*.whatimg.com/
// @since          Mar-10-2010
// @date           Nov-5-2012
// @grant          GM_xmlhttpRequest
// ==/UserScript==

// S T O R A G E HANDLE
var strg = {
	on:(function(){ try { var s = window.localStorage; if(s.getItem&&s.setItem&&s.removeItem){return true;} } catch(e) {return false;} }()),
	read:function(key){ return this.on ? JSON.parse(window.localStorage.getItem(key)) : false; },
	save:function(key,dat){ return this.on ? !window.localStorage.setItem(key, JSON.stringify(dat)) : false; },
	wipe:function(key){ return this.on ? !window.localStorage.removeItem(key) : false; },
	zero:function(o){ var k; for(k in o){ if(o.hasOwnProperty(k)){ return false; } } return true; }
};

// U P D A T E HANDLE
var update = {
	name:'WhatIMG: Drag + Drop Files',
	version:2200,
	key:'ujs_WIMG_DRAGDROP',
	callback:'wimgddupdt',
	urij:'https://dl.dropbox.com/u/14626536/userscripts/updt/wimgdd/wimgdd.json',
	uric:'https://dl.dropbox.com/u/14626536/userscripts/updt/wimgdd/wimgdd.js', // If you get "Failed to load source for:" in Firebug, allow dropbox to run scripts.
	checkchrome:false,
	interval:5,
	day:(new Date()).getTime(),
	time:function(){return new Date(this.day + (1000*60*60*24*this.interval)).getTime();},
	css:function(t){
		if(!this.style){this.style = document.createElement('style'); this.style.type = 'text/css'; document.body.appendChild(this.style);} this.style.appendChild(document.createTextNode(t+'\n'));
	},
	js:function(t){
		var j = document.createElement('script'); j.type = 'text/javascript'; /(?:^https?\:\/\/)/i.test(t) ? j.src = t : j.textContent = t; document.body.appendChild(j);
	},
	notification:function(j){
		if(j){if(this.version < j.version){window.localStorage.setItem(this.key,JSON.stringify({date:this.time(),version:j.version,page:j.page}));}else{return true;}}
		var a = document.createElement('a'), b = JSON.parse(window.localStorage.getItem(this.key)); a.href = b.page || '#'; a.id = 'userscriptupdater'; a.title = 'Update now.'; a.textContent = 'An update for '+this.name+' is available.'; document.body.appendChild(a); return true;
	},
	check:function(opt){
		if(typeof(GM_updatingEnabled) === 'boolean' || !strg.on){return;}
		var stored = strg.read(this.key), J, page;
		if(opt || !stored || stored.date < this.day){
			page = stored && stored.page ? stored.page : '';
			strg.save(this.key,{date:this.time(),version:this.version,page:page});
			if(!opt){this.css(this.csstxt);}
			if(!opt && typeof(GM_xmlhttpRequest) === 'function' && !this.chrome()){
				GM_xmlhttpRequest({method: 'GET', url: update.urij, onload: function(r){ update.notification(JSON.parse(r.responseText));}, onerror: function(){update.check(1);}});
			}else{
				J = this.notification.toString().replace('function','function '+this.callback).replace('this.version',this.version).replace(/(?:this\.key)/g,"'"+this.key+"'").replace('this.time()',this.time()).replace('this.name','j.name');
				this.js(J); this.js(this.uric);
			}
		}else if(this.version < stored.version){ this.css(this.csstxt); this.notification(); }
	},
	chrome:function(){
		if(this.checkchrome === true && typeof(chrome) === 'object'){ return true; }
	},
	csstxt:'#userscriptupdater,#userscriptupdater:visited{-moz-box-shadow: 0 0 6px #787878;-webkit-box-shadow: 0 0 6px #787878;box-shadow: 0 0 6px #787878;border: 1px solid #777;-moz-border-radius:4px;border-radius:4px; cursor:pointer;color:#555;font-family: Arial;font-size: 11px;font-weight: bold; text-align: justify;min-height: 45px;padding: 12px 20px 10px 65px;position: fixed; right: 10px;top: 10px;width: 170px;background: #ebebeb url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAACLCAYAAAD4QWAuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGN0Q1OEQyNjdEQzUxMUUwQThCNEE3MTU1NDU1NzY2OSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGN0Q1OEQyNTdEQzUxMUUwQThCNEE3MTU1NDU1NzY2OSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po6YcvQAAAQFSURBVHja7JzBSxRRHMdnp+gkiLdOgtshKGSljQVF8CK0biEErYfwFmT+BQpdA0MIBEFtTx2qSxESaAt5ioUQFDp5sjl06rbnumzfp7+VbZx5M+/Nb9wZ+f3g56wzO28//ua93/u9J/stdDodx2/P3o85llaFT8JvwlvwTfhf00a2Hv8IPO86PHYHvg//An8OfwRfg/9RfzvTZ7DBvoZXQq6p6D7MCuwT+N2I92zAB/sNO0yPO8quwxf7DasABmK+d0XTVVKHnYIvG96z1i9Ymw8ep/R2obAqNdkm41e2sFct71v1/f4BiXyOJpRpHKZ918s9527B5+FvLwJWDaoR3zmvZ/bZw2HPNyMeBOTeb/BfaXaDEuVMvx2G3QDQMkW21wZsUpkp7GbIeU9zz3TI+WXTVGYCW6XRbApb1lxbTwt2VVMltS1hVWRnuWFVqhoNudbW9NchHIpc+ToO7GDE49JFtRij/ZG4gy0O7CIVIjZWNuhiw0lhK1SA6GzI8ppxKouCjTNaOWC7qWzKFrYaNw/SQOKwNVtYk4KjyAQ7RpnHCHaeCg7ugZQon7sBj3RYM62mHdmTVAaGxbiRNVmqRM3/bUvgDQCX/CcLvZsceEOF1v82dgPTrkdVVp2iXU8Q4e9ob0IHu59gUecxdwdlMwBunusGAJ1NuPr0KLoFdYQ3GGBXAiMLWC9gBRDX2gTa9g3Wp7Rbk8TqaPfjWWRp9I0kaLARVCbiXMO/xLGwdfCd7Oa4eDGQdD0fYYcJ7z/bzXHpxbWEDRaddO1FF3aSobE6pazAawztX0H7465mXWVqB2hwqWdwFeFfGaM+Wlh4V/rkMO2fpmy3VWTf5AD0NzLLkYsfn53T7fUs21k2UPmw5jBs9qZgx/AH4Ns+VxvQwJg0rGXTMPUfnhYgj0MLmayb6+TIBFZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBTZzVrg3U+Nsz1iTo7m7c+GRFU2ONGBFkyMNWNHkSANWNDl0xqbJAZ+j1/nR5HBOv6zm/8JaPjQ5KKqiyRFVpORfk8PRf3NZq8lRrd3PhiaHc6pvcLk0ORDdfGlyAFg0OdKAPUlliG76mhyGUNaDLXOaHIjuJdXkoKVKXzU5wlJZZjU5AFyKKhErFkuVbjcoUo3Apcmhnu6Ebkcmc5oczd2dZlA3YNHkUAFwUtLkcJlWnm1a1ng94AvkbKnM1SxVTKwRMphYNDkAPNiFFU0OZuPV5NDMYiyaHOgKvJoc8CVftFk1ORRsi/FxvYR3yH9qZjYba+VGkwOTw5GCzZcmByzTmhyI6ra/kNkiz4wmByD/0+T4J8AAyDkZArebBxMAAAAASUVORK5CYII=) no-repeat 13px 15px} #userscriptupdater:hover,#userscriptupdater:visited:hover { border-color: #8f8d96; color:#55698c;background-position: 13px -85px }'
};
update.check();

var files = {
	URL:(function(){
		try {
			this.url = (window.createObjectURL && window) || (window.URL && URL) || (window.webkitURL && webkitURL);
		} finally {
			if (this.url && typeof this.url.revokeObjectURL !== 'function') { delete this.url; }
			return this.url;
		}
	}()),
	sizes:[],
	country:document.getElementById('countrydivcontainer'),
	form:document.getElementById('upload_form'),
	b:document.createElement('div'),
	c:document.createElement('div'),
	d:document.createElement('div'),
	send:document.createElement('div'),
	tab:document.getElementById('countrytabs'),
	init:function(){
		var that = this, css;
		this.bond = function(m){ var c = function(evt){ that[m].call(that,evt); }; return c; };
		
		css = '#upload_form input, #upload_form br, .dropboxhide { display:none; } #normal_upload input {display:inline !important} #dropbox { min-height: 200px; overflow: hidden; padding: 6px; cursor: pointer; position: relative; z-index: 1; background-color: #222; border-radius: 3px; margin: 5px 0px; } #dropbox:hover { background-color: #111} div.dropboxbg { background: url(http://whatimg.com/images/03448758284210266130.png) #222 no-repeat center center; }'
		+'\n.previewimgs { float: left; margin: 3px;  border: 2px solid #eee; border-radius: 2px; max-width:150px;overflow:hidden;height:100px;background:#eee} .previewimgs img { max-height: 100px; opacity: .8; } .previewimgs:hover img { opacity: 1; /* position: absolute; top: -100px; left: -100px; z-index: 2; height: auto; */ }'
		+'\n#dropboxsend { background: #333; width: 50px; text-align: center; cursor: pointer; padding: 3px; border-radius: 2px; margin: auto; color: #eee; } #dropboxsend:hover { background: #111 }'
		+'\n#countrydivcontainer { position: relative } #dropboxpercent { position: absolute; top: 45px; right: 25px; color: #eee; z-index: 40; font-size: 24px; text-shadow: 1px 1px 8px #000; background: #333; padding: 0 3px; border-radius: 2px }';
		update.css(css);
		
		this.d.id = 'dropbox';
		this.d.title = 'Drop images onto me.';
		this.d.className = 'dropboxbg';
		this.d.addEventListener('dragenter',this.prevent,false);
		this.d.addEventListener('dragover',this.prevent,false);
		this.d.addEventListener('drop',this.bond('drops'),false);
		this.c.className = 'dropboxhide';
		this.c.id = 'dropboxpercent';

		this.send.textContent = 'Send';
		this.send.title = 'Send Images';
		this.send.id = 'dropboxsend';
		this.send.addEventListener('click',this.bond('sender'),false);
		this.B = this.bond('mcs');
		this.tab.addEventListener('click',this.B,false);
		
		this.country.textContent = '';
		this.form.appendChild(this.d);
		this.form.appendChild(this.send);
		this.form.appendChild(this.b);
		this.country.appendChild(this.form);
		this.country.appendChild(this.c);
		this.ul();
	},
	mcs:function(){
		this.tab.removeEventListener('click',this.B,false);
		update.css('#upload_form input { display: inline-block !important }');
	},
	ul:function(){
		var temp = document.createElement('ul'),
		li = document.createElement('li'); li.textContent = 'Drop your images above. Double click on an image to remove it.'; temp.appendChild(li);
		li = document.createElement('li'); li.textContent = 'Allowed File Extensions: JPEG, JPG, GIF, and PNG'; temp.appendChild(li);
		li = document.createElement('li'); li.textContent = 'Max filesize is set at 5 Megabytes per image file.'; temp.appendChild(li);
		this.b.appendChild(temp);
	},
	prevent:function(evt){
		evt.stopPropagation();
		evt.preventDefault();
	},
	drops:function(evt){
		var dt = evt.dataTransfer;
		this.prevent(evt);
		this.d.className = 'dropboxnobg';
		this.gets(dt.files);
	},
	gets:function(files){
		var i = 0, f;
		for(i; i < files.length; i++){
			f = files[i]; // console.log(f.type);
			if(!f.type.match(/(?:image\/\b(?:jpeg|png|gif)\b)/)) { return false; }
			if(f.size > 5242880) { alert('Choose a smaller image!'); return false; }
			this.proc(f);
		}
		this.cls();
	},
	proc:function(f){
		if(this.sizes.indexOf(f.size) === -1){
			var D = document.createElement('div'), I = document.createElement('img');
			this.sizes.push(f.size);
			// console.log(this.sizes);
			I.file = f;
			I.title = 'Double click to remove';
			I.className = 'dropboximg';
			I.addEventListener('dblclick', this.bond('destroy'), false);
			D.className = 'previewimgs';
			D.appendChild(I);
			this.d.appendChild(D);
			this.img(I, f);
		}
	},
	img:function(i, f){
		if (this.URL) {
			// console.log('new');
			i.onload = this.rem.n;
			i.src = this.URL.createObjectURL(f);
		} else {
			// console.log('old');
			var r = new FileReader();
			r.onload = this.rem.o(i);
			r.readAsDataURL(f);
		}
	},
	rem: {
		n : function () {
			try {
				files.URL.revokeObjectURL(this.src);
			} catch (e) { 
				// console.log('rem'+e);
			}
		},
		o : function (i) {
			return function (e) {
				i.src = e.target.result;
			};
		}
	},
	sender:function(){
		var imgs = document.querySelectorAll('.dropboximg'), i, img, xhr = new XMLHttpRequest(), fd = new FormData(this.form);
		if(imgs.length === 0){return false;}
		this.send.className = 'dropboxhide';
		this.c.className = '';
		for(i = 0; i < imgs.length; i++){ img = imgs[i]; fd.append('userfile[]', img.file); }
		xhr.upload.onprogress = this.bond('percent');
		xhr.open('POST', 'upload.php', true);
		xhr.onload = this.done;
		xhr.send(fd);
	},
	done:function(){
		var p = document.getElementById('page_body'), doc = document.implementation.createHTMLDocument('');
		doc.documentElement.innerHTML = this.responseText;
		p.innerHTML = doc.getElementById('page_body').innerHTML;
	},
	percent:function(evt){
		if(evt.lengthComputable){
			var percentage = Math.round((evt.loaded * 100) / evt.total);
			this.c.textContent = percentage +'%';
		}
	},
	destroy:function(evt){
		var i = evt.currentTarget, d = i.parentNode, n = this.sizes.indexOf(i.file.size);
		this.sizes.splice(n,1);
		d.parentNode.removeChild(d);
		// console.log(this.sizes);
		// console.log(this.sizes.length);
		this.cls();
	},
	cls:function(){
		if(this.sizes.length === 0){ this.d.className = 'dropboxbg'; }
	}
};
files.init();