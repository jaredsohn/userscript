// ==UserScript==
// @id             what-toggle-formats
// @name           What.CD: Toggle Format Visibility
// @namespace      hateradio)))
// @author         hateradio
// @version        2.8
// @description    Hide formats with your discretion.
// @updateURL      https://userscripts.org/scripts/source/105151.meta.js
// @include        http*://*what.cd/torrents.php*
// @include        http*://*what.cd/artist.php?id=*
// @include        http*://*what.cd/bookmarks.php*
// @include        http*://*what.cd/collages.php*

// @match          *://*.what.cd/torrents.php*
// @match          *://*.what.cd/artist.php?id=*
// @match          *://*.what.cd/bookmarks.php*
// @match          *://*.what.cd/collages.php?*

// @updated        24 SEP 2011
// @since          28 OCT 2010
// ==/UserScript==

// S T O R A G E HANDLE
var strg = {
	init:function(){ this.on = this.work(); },
	work:function(){ try { return 'localStorage' in window && window['localStorage'] !== null; } catch(e) { return false; } },	
	read:function(key){ return this.on ? JSON.parse(window.localStorage.getItem(key)) : false; },
	save:function(key,dat){ return this.on ? !window.localStorage.setItem(key, JSON.stringify(dat)) : false; },
	wipe:function(key){ return this.on ? !window.localStorage.removeItem(key) : false; }
};
strg.init();

var hide = {
	loc:document.querySelector('.sidebar') || document.querySelector('.linkbox'),
	anc:(document.getElementById('discog_table') || document.querySelector('.torrent_table')).querySelectorAll('a[href^="torrents.php?id="],a[onclick]'),
	str:document.querySelectorAll('.edition_info > strong'),
	
	typ:['CD','Vinyl','WEB','SACD','DVD','DAT','Cassette','Blu-ray','Soundboard'],
	cod:['FLAC','Ogg','AAC','AC3','DTS','MP3'],
	enc:['192','APS','V2','V1','256','APX','V0','320','/ Lossless','24bit Lossless'],
	lch:['Scene','Freeleech','Neutral Leech','Reported','Bad'],
	
	hid:strg.read('togglesettings2') || [],
	
	div:document.createElement('div'),
	
	init:function(){
		var tog = this, s = document.createElement('style'), top = document.getElementsByTagName('head')[0],
		css = '.hider-f { text-decoration: line-through } #format-hide { text-align: center; margin: 3px 0px }';
		s.type = 'text/css'; s.textContent = css;  top.appendChild(s);
		// run!
		this.bond =  function(m,b){ var c = function(e){ if(b !== true && e){e = e.currentTarget;} m.call(tog,e); }; return c; };
		this.location();
		this.generate();
		this.toggle(this.hid);
		this.toggle(this.hid,true);
		this.mark();
	},
	location:function(){
		this.div.id = 'format-hide';
		this.div.className = 'box box_artists';
		this.loc.parentNode.insertBefore(this.div,this.loc);
	},
	slink:function(t){
		var S = document.createElement('span');
		S.data = t;
		S.textContent = t.replace(/(?:\/|\\)/,'');
		S.id = 'togformatvis_'+S.textContent.replace(/(?:\s)/,'');
		S.style.cursor = 'pointer';
		S.addEventListener('click',this.bond(this.change), false);
		S.setAttribute('onmousedown','return false;');
		this.div.appendChild(S);
		this.div.appendChild(document.createTextNode(' '));
	},
	proc:function(a,b){
		var x = -1, y = a.length;
		while(++x<y){ this.slink(a[x]); }
		switch(b){
			case 1 : this.div.appendChild(document.createElement('br')); break;
			case 2 : this.div.appendChild(document.createTextNode(' \u00D7 ')); break;
			default : break;
		}
	},
	generate:function(){
		this.proc(this.typ,1);
		this.proc(this.cod,2);
		this.proc(this.enc,2);
		this.proc(this.lch);
	},
	change:function(el){
		var idx = this.hid.indexOf(el.data), idz = (this.typ.indexOf(el.data) !== -1);
		el.className = el.className === 'hider-f' ? 'hider-o' : 'hider-f';
		if(idx === -1){
			this.hid.push(el.data);
			this.show = false;
			this.toggle(this.hid,idz);
		}else{
			this.hid.splice(idx,1);
			this.show = true;
			this.toggle([el.data],idz);
		}
	},
	toggle:function(a,b){
		var p, q, r = a.length > 0 ? '(?:'+a.join('|')+')\\b' : false, x = -1, y = !b ? this.anc : this.str, z = y.length;
		if(r){
			strg.save('togglesettings2',this.hid);
			r = new RegExp(r,'i');
			while(++x<z){ q = y[x];
				if(r.test(q.textContent)){
					if(b){
						p = q.querySelector('a'); this.show ? p.textContent === '-' ? false : this.click(p) : p.textContent === '+' ? false : this.click(p);
					}else{
						this.show ? q.parentNode.parentNode.removeAttribute('style') : q.parentNode.parentNode.setAttribute('style','display:none');
					}
				}
			}
		}
	},
	mark:function(){
		var x = -1, y = this.hid.length, z;
		while(++x<y){ z = this.hid[x];
			z = document.getElementById('togformatvis_'+z.replace(/(?:\/|\\|\s)/g,'')); z.className = 'hider-f';
		}
	},
	click:function(el){
		var evt;
		if(el.click){ el.click(); }
		else{ evt = document.createEvent('MouseEvents'); evt.initEvent('click', true, true); el.dispatchEvent(evt); }
	}
};

hide.init();