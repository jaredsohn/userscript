// ==UserScript==
// @id             what-bookmark-artists-collages
// @name           What.CD : Bookmark Artists And Collages
// @namespace      hateradio)))
// @author         hateradio
// @version        1.5.1
// @description    Bookmark collages and artists.
// @include        http*://*what.cd/collages.php*
// @include        http*://*what.cd/bookmarks.php*
// @include        http*://*what.cd/artist.php*
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDRkY5NkQ4REEyQTdFMDExOERDNEI2N0ZENUVGMDBBMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQzg2MTNCMkE3QTYxMUUwQjU4RkI3ODJFNTBEM0Y2MiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQzg2MTNCMUE3QTYxMUUwQjU4RkI3ODJFNTBEM0Y2MiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyRERCRjg2RkE2QTdFMDExOUEzMUI5Q0ZFQjZGQzBFRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDRkY5NkQ4REEyQTdFMDExOERDNEI2N0ZENUVGMDBBMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps42++UAAAT9SURBVHja7FdbbBRVGP7OzJnZ2Utb6rYF2m5bbIUWS0qBYqCIDYo3okYjDz6Z8Ka++GI0xmifjIbwYCQqj5roQ0OiiUETiVEfKFCCUdpIQSiyUivtynbbvczlzBn/M7sopBoIEPrCmZzM7Ll+5/u////PsiAIsJhFwyKXOwAWHQC/lYt99MkbGBs/jIgZBdj/DCLNO66NV17Yi9ZUJ/jbQ68jGa/H+MVRpjH9xhmhDcd//B7ZzBSkySGE1CADdmW/wTXJJQs8z2F7D7wj2lt6wE8GIy3VTu3gidzxHl0LAdywX5pdFuLGSqw8l8fAREGzwJhUdqYV52jlb1piwWQqJqNSsrPGKafkFD/mJWt2T/rixLN6lEawm4sJNrPB83nsTDvYuqUNwtQQhhnGYJQEzENnsKdewLJ0TNvzmM9lV3EW6M2BpsGWHu3PbgqA2svjEkMdOr7Vs/Dp+JfjHDOAP1ab8HWf9pIgSyCuc4MzDSJRHUEc5q1RIp3h9DJAyoVs6g01qPfLQAPqN7kueZkhRvNuXUiOVGhfUGQZoOoJdHqT1XlAdASBqrc3JwTqISSaFAGwSPlImYEA+P9pR7Ab18D1zFVGVwrlUsir4qEyXankQKMPM2JePzusfCLbtmEYBkjf15yrhKr5ngxdRY0V8FEs2Xi+8yU80fIcHMcJ7RTg2tUPfFgigZd7B9Fd1QfHc6/qI8dbOK9sAhl+QDBUiyR0J4IVyXY0JVIoFIvwhBeOViJ1PAe2Y5N/K19idAJJcd0Jq/AFdJ+ja+m9qDHugitcOMJG4Aeo9pMwvVh5H1nxBvXphwz4EFIgKhPY1f0iWq27MWtnoBOn/XXb0Mxa4TouZAnojq1Df3IbYm41bEoomm2gt+o+bFyyBaYTg+d7KHizKNhzWOLXoTvRC9ON4an2ndhcP1BmVD1BpVKk4pIAkBfCZCam85M4mR3FDrkDHY0dqK16ElXRBPYc3I0NrX0YWLkNRbeIB8QA3v/uPTy99hl0L18THqAvtxGfHf4UeS+LBnMpHu1/BBfnpvHL9BiOTQ6jraadGKtExoo2gpABl1qJGkkobJEPbcWYj+MTI3ht6FVkSxlsbuzH+pa12H9sCIOfv4WaWAz3N23FmqYu7PvhQ+z+6l10NiqzNWOudAkP9w0QGzb2HfoANi/BC5zw9z/0V6oCwH3SAOWD0J4uDfKp0Zc2muuW4vE12xE1dfyaOYXaZBw9rV2osYhqWcDpzDg6c23Y3LEB+VIBM/NTyBb/opTLMDw6jHtSK/DY6u34cuIA3KjSiFM+9WXFM6UBCT21tWqXntBaIrCwbnk3fs9O0mAPl+ayWJasw0/pURydOYpzmfNorGpAQ20SX584iLH5MVzITKItmULciuKLnw9gyp1CXIvicHoEZ2bOIFXTiOnZDFYlO0K3Pjs3Aa7rIQAV/n3bd9mmN5uGrVR0k0nJqLeuB+n5C/itcJ7uaiy0F91SEKF4oJTvOSKcrBsaTPJ1TwgItxzIdGLK0Dl5hAvOeWhSFeQidCtYX7cWfxamkXbT0C8DoHW9WTfPpStz6tYgIgKHZo6ECGNRa+Hdjdp5TK9kknKbQcFG1SuLZZn/XjfDvgBHLo1Ao5TPeXlz1aUSkfQCjeeyucGSKES1qN4a+sjtK9LNefv5lq6HjpIiHyRotRV93o7Cwr2SLMvu/DW7A2CxAfwtwABflnF6MiXTWwAAAABJRU5ErkJggg==
// @icon64         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDRkY5NkQ4REEyQTdFMDExOERDNEI2N0ZENUVGMDBBMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCODYzQUFCM0E3QTYxMUUwOTVCQUZEMUU4OEYxMzA4MiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCODYzQUFCMkE3QTYxMUUwOTVCQUZEMUU4OEYxMzA4MiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyRERCRjg2RkE2QTdFMDExOUEzMUI5Q0ZFQjZGQzBFRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDRkY5NkQ4REEyQTdFMDExOERDNEI2N0ZENUVGMDBBMyIvPiA8L3JkZjpEZXNjcmlwdGlv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
// @updated        08 Jul 2011
// @since          04 Jul 2011
// (c) 2011+, hateradio
// ==/UserScript==

var x = {
	a : function(e,a){var i = 0, c; for(i;i<a.length;i++){c = a[i]; e.appendChild(c);}},
	c : function(t){return document.getElementsByClassName(t);},
	e : function(t,attr,el,opt){
		var e = document.createElement(t), a;
		for(a in attr){
			if(attr.hasOwnProperty(a)){
				if(a.charAt(0) === '_'){
					e.style[a.substring(1)] = attr[a];
				}else if(a.charAt(0) === '$'){
					e.setAttribute(a.substring(1),attr[a]);
				}else{
					e[a] = attr[a];
				}
			}
		}
		if(el){ if(opt){ return e.appendChild(el); } else { return el.appendChild(e); } }
		return e;
	},
	i : function(t){return document.getElementById(t);},
	n : function(t){return document.createTextNode(t);},
	q : function(t){return document.querySelectorAll(t);},
	t : function(t){return document.getElementsByTagName(t);}
};

var update = {
	name:'What.CD : Bookmark Artists And Collages',
	version:1510,
	key:'ujs_WCD_BOOKMARK',
	callback:'wbookupdt',
	page:'http://userscripts.org/scripts/show/106203',
	urij:'https://dl.dropbox.com/u/14626536/userscripts/updt/wbook/wbook.json',
	uric:'https://dl.dropbox.com/u/14626536/userscripts/updt/wbook/wbook.js', // If you get "Failed to load source for:" in Firebug, allow dropbox to run scripts.
	checkchrome:false,
	interval:10,
	day:(new Date()).getTime(),
	time:function(){return new Date(this.day + (1000*60*60*24*this.interval)).getTime();},
	css:function(t){
		if(!this.style){this.style = document.createElement('style'); this.style.type = 'text/css'; document.body.appendChild(this.style);} this.style.appendChild(document.createTextNode(t+'\n'));
	},
	js:function(t){
		var j = document.createElement('script'); j.type = 'text/javascript'; /^https?\:\/\//i.test(t) ? j.src = t : j.textContent = t; document.body.appendChild(j);
	},
	notification:function(j){
		if(j){if(this.version < j.version){window.localStorage.setItem(this.key,JSON.stringify({date:this.time(),version:j.version}));}else{return true;}}
		var a = document.createElement('a'); a.href = this.page; a.id = 'userscriptupdater'; a.title = 'Update now.'; a.textContent = 'An update for '+this.name+' is available.'; document.body.appendChild(a); return true;
	},
	check:function(opt){
		var stored = JSON.parse(window.localStorage.getItem(this.key)), J;
		if(opt || !stored || stored.date < this.day){
			window.localStorage.setItem(this.key,JSON.stringify({date:this.time(),version:this.version}));
			if(!opt){this.css(this.csstxt);}
			if(!opt && typeof(GM_xmlhttpRequest) === 'function' && !this.chrome()){
				GM_xmlhttpRequest({method: 'GET', url: update.urij, onload: function(r){ update.notification(JSON.parse(r.responseText));}, onerror: function(){update.check(1);}});
			} else {
				J = this.notification.toString().replace('function','function '+this.callback).replace('this.version',this.version).replace('this.key',"'"+this.key+"'").replace('this.time()',this.time()).replace('this.page','"'+this.page+'"').replace('this.name','j.name');
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

var collager = {
	l : document.location.toString(),
	rem:'[Bookmarked]',
	ret:'Remove this bookmark.',
	add:'[Bookmark]',
	adt:'Bookmark this.',
	txt:x.e('textarea',{$onclick:'select()',className:'gm_bookmark_txt'}),
	chk:function(){
		if(/\b(?:collages\.php(?!\?id))\b/.test(this.l)){ // simply add [Bookmark] links
			this.sim(1);
		}else if(/(?:collages\.php\?id\=(\d+))/.test(this.l)){ // add one [Bookmark] link
			this.id = RegExp.lastParen;
			this.sim(2);
		}else if(/(?:artist\.php\?id\=(\d+))/.test(this.l)){ // add one [Bookmark] link
			this.id = RegExp.lastParen;
			this.sim(3);
		}else if(/(?:bookmarks\.php)/.test(this.l)){ //show collage list
			this.pg = 4;
			this.shw();
		}
	},
	run:function(){
		var book = this;
		this.bond = function(m){var c = function(evt){ m.call(book,evt); }; return c;};
		this.sal(); // console.log('this.a: '+this.a.toSource()); // console.log('this.b: '+this.b.toSource());
		this.chk();
		update.css('.gm_bookmark_collage{cursor:pointer;padding:0 3px 0 0}');
	},
	shw:function(){
		var w = false, i = 0, B, D, div = x.e('div',{className:'bookmarked_artists'}), H, ul = x.e('ul',{className:'collage_images'}), li, u = x.c('main_column')[0], L, A, I;
		update.css('.pad:after,.thin:after,.main_column:after,ul.collage_images:after{content:".";display: block;height: 0;clear: both;visibility: hidden;}ul.collage_images{margin:0;padding:0}.main_column{float:left;margin:0;padding:0;}.bookmarked_artists{margin-bottom: 30px}.bookmarked_artists img{max-height: 117px}.bookmarked_artists img:hover{max-height: none}.gm_bookmark_exports{text-align:center;margin:3px;padding:3px}.gm_bookmark_exports a{padding:0 4px}.gm_bookmark_txt{height:150px;width:90%}.gm_bookmark_btn{display:block;margin:3px auto}.bookmarked_artists_list{margin:0 !important;padding:0 !important;}.bookmarked_artists_list li{list-style-type:none;padding:3px;margin:3px 3px;float:left;}');
		
		u.insertBefore(div,u.firstElementChild);
		if(x.c('collage_images').length === 0){
			ul.className = 'bookmarked_artists_list';
			D = x.e('div',{className:'box'},div); // box
			H = x.e('div',{className:'head'},D); // head
			B = x.e('div',{className:'pad'},D); // pad
			A = x.e('strong',{textContent:'Artists'},H); // strong
			B.appendChild(ul);
		} else {
			w = true;
			div.appendChild(ul);
		}
		for(i in this.a){
			if(this.a.hasOwnProperty(i)){ B = this.a[i];
				L = x.e('li',{height:118,width:118},ul);
				A = x.e('a',{href:'/artist.php?id='+i,title:B[0]},L);
				if(w){ I = x.e('img',{src:B[1] || '/static/common/avatars/default.png',width:117},A); }
				else{ A.textContent = A.title; }
			}
		}
		// sidebar collage list
		u = x.c('sidebar')[0];
		div = x.e('div',{className:'box'}); // box
		u.insertBefore(div,u.firstElementChild);
		H = x.e('div',{className:'head'},div); // head
		B = x.e('div',{className:'pad'},div); // pad
		A = x.e('strong',{textContent:'Collages & Data'},H); // strong
		// Export + Import
		ul = x.e('ol',{_padding:'0 5px 0 5px'},B); // list
		H = x.e('div',{className:'gm_bookmark_exports'},B); // div to hold ex/im
		A = x.e('a',{textContent:'Export Data',title:'Export album and collage data.',href:'#export'},H);
		A.addEventListener('click',this.bond(this.exp),false);
		H.appendChild(x.n(' ')); // space
		A = x.e('a',{textContent:'Import Data',title:'Import album and collage data.',href:'#import'},H);
		A.addEventListener('click',this.bond(this.txs),false);
		this.txt.style.display = 'none';
		B.appendChild(this.txt);
		for(i in this.b){
			if(this.b.hasOwnProperty(i)){ B = this.b[i];
				L = x.e('li');
				I = x.e('a',{className:'gm_bookmark_collage',type:'collage',name:B,$key:i,href:'#rem',textContent:'\u00D7',title:this.ret},L);
				I.addEventListener('click',this.bond(this.bok),false);
				A = x.e('a',{href:'/collages.php?id='+i,title:'View this collage.',textContent:B},L);
				ul.appendChild(L);
			}
		}
		
	},
	sim:function(n){
		var obj = this.b, t, i, b, L, M, S, k = x.c('linkbox')[0];
		if(n===1){ t = x.t('table')[1].querySelectorAll('a');
			for(i=0;i<t.length;i++){ b = t[i];
				if(/(?:collages\.php\?id\=(\d+))/.test(b.href)){
					b.title = RegExp.lastParen;
					S = x.e('a', { href:'#bookmark', name:b.textContent, textContent:this.add, className:'gm_bookmark_collage', $type:'collage', title:this.adt, $key:b.title });
					if(obj.hasOwnProperty(b.title)){S.textContent = this.rem;S.titlte = this.ret;}
					S.addEventListener('click',this.bond(this.bok),false);
					b.parentNode.insertBefore(S,b);
				}
			}
		}else if(n===2 || n===3){ t = x.t('h2')[0].textContent;
			L = x.e('a', { href:'#bookmark', title:this.adt, name:t, textContent:this.add, className:'gm_bookmark_collage', $key:this.id, $type:'collage' });
			if(n===3){
				L.setAttribute('type','artist');
				obj = this.a;
				M = document.evaluate('//img[@alt="'+t+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(M){L.href = M.src;}
			}
			if(obj.hasOwnProperty(this.id)){L.textContent = this.rem;L.title = this.ret;}
			L.addEventListener('click',this.bond(this.bok),false);
			k.appendChild(L);
		}
	},
	stp:function(evt){
		evt.preventDefault();
	},
	bok:function(evt){
		var obj, el = evt.currentTarget, id = el.getAttribute('key'), type = el.getAttribute('type'), n;
		this.stp(evt);
		if(id){
			obj = type === 'collage' ? this.b : this.a;
			if(!obj.hasOwnProperty(id)){ obj[id] = type === 'collage' ? el.name : [el.name,el.href]; el.textContent = this.rem; el.title = this.ret; }
			else{ delete obj[id]; el.textContent = this.add; el.title = this.adt;}
			if(this.pg === 4){el.textContent = el.textContent === this.rem ? '\u00D7' : '+';}
			this.sol();
			// console.log('books: '+obj); // console.log('books: '+obj.toSource());
		}
	},
	sal:function(){
		this.a = JSON.parse(window.localStorage.getItem('gm_bookmark_artists')) || {}; // artist
		this.b = JSON.parse(window.localStorage.getItem('gm_bookmark_collage')) || {}; // collage
	},
	sol:function(){
		window.localStorage.setItem('gm_bookmark_collage',JSON.stringify(this.b));
		window.localStorage.setItem('gm_bookmark_artists',JSON.stringify(this.a));
	},
	exp:function(evt){
		this.stp(evt);
		this.txt.value = JSON.stringify([this.a,this.b]);
		this.txt.removeAttribute('style');
		this.btn.style.display = 'none';
	},
	txs:function(evt){
		this.stp(evt);
		this.txt.value = '';
		this.txt.focus();
		if(!this.hover){
			this.hover = true;
			this.txt.removeAttribute('style');
			this.btn = x.e('input',{$type:'button',value:'Send',title:'Import',className:'gm_bookmark_btn'});
			this.btn.addEventListener('click',this.bond(this.imp),false);
			this.txt.parentNode.appendChild(this.btn);
		}else{
			this.btn.removeAttribute('style');
		}
	},
	imp:function(evt){
		var o;
		this.stp(evt);
		if(this.txt.value.length > 8){
			o = JSON.parse(this.txt.value);
			if(Object.prototype.toString.call(o) === "[object Array]"){
				if(o.length === 2){
					this.a = o[0];
					this.b = o[1];
					this.sol();
					document.location = '/bookmarks.php';
				}
			}
		}
	}
};

collager.run();