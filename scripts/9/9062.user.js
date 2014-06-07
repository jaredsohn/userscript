// ==UserScript==
// @name           GreaseFox
// @namespace      http://a-h.parfe.jp/einfach/
// @description    Browser on Greasemonkey
// @include        *
// ==/UserScript==

(function () {

var exclude_URL = <><![CDATA[
	http://pagead2.googlesyndication.com/pagead/*
	http://ad.doubleclick.net/adi/*
	http://rcm-jp.amazon.co.jp/e/cm*
	http://rss.rssad.jp/rss/wbreq*
	http://click.adv.livedoor.com/*
]]></>;

if(checkURL(exclude_URL))return;

if(self.frameElement){
	if(document.referrer==decodeURIComponent(GM_getValue('reffer'))){
		GM_setValue('title', typeof document.title=='string' ?
												encodeURIComponent(document.title) : '');
		GM_setValue('url', encodeURIComponent(location.href));
	}
	//GM_setValue('reffer', encodeURIComponent(location.href));
}

if(self.frameElement!=null) return;


/* Setting */

var include_URL = <><![CDATA[
	http://www.google.*/*
	http://twitter.com/*
	http://digg.com/*
	http://www.checkpad.jp/*
	http://mixi.jp/*
	http://clip.livedoor.com/*
	http://reader.livedoor.com/reader/*
]]></>;

if(!checkURL(include_URL))return;

function checkURL(url){
	var sites = url.toString().replace(/\t| /g,'').split('\n');
	var flag = false;
	sites.forEach(function(site){
		if(site=='')return;
		if(location.href.match(site)!=null)flag=true;
	});
	return flag;
}


//Template function

    var Class = {
      create: function() {
        return function() {
          this.initialize.apply(this, arguments);
        }
      }
    }

    Object.extend = function(destination, source) {
      for (var property in source) {
        destination[property] = source[property];
      }
      return destination;
    }

    Function.prototype.bind = function() {
      var __method = this, args = $A(arguments), object = args.shift();
      return function() {
        return __method.apply(object, args.concat($A(arguments)));
      }
    }

    var $A = Array.from = function(iterable) {
      if (!iterable) return [];
      if (iterable.toArray) {
        return iterable.toArray();
      } else {
        var results = [];
        for (var i = 0; i < iterable.length; i++)
          results.push(iterable[i]);
        return results;
      }
    }

    function $(id){
            return document.getElementById(id);
    }

	function absPath(path){
	  var e = document.createElement('span');
	  e.innerHTML = '<a href="' + path + '" />';
	  return e.firstChild.href;
	}

	function getWinSize() {
		var width;
		var height;

		if (document.compatMode == 'CSS1Compat' && !window.opera) {
			width= document.documentElement.clientWidth;
			height = document.documentElement.clientHeight;
		} else {
			width= document.body.clientWidth;
			height = document.body.clientHeight;
		}
		return [width, height];
	}


    var log = function(){
        if(!unsafeWindow.console) return;
        var c = unsafeWindow.console;
        if(c)    c.log.apply(c, arguments);
    }
    log.o = function(){
            log('ok');
    }

//from http://d.hatena.ne.jp/gotin/

  function mktag(tagName, option){
    var tag = document.createElement(tagName);
    if(option){
      for(a in option){
        if(option.hasOwnProperty(a)){
          tag[a] = option[a];
        }
      }
    }
    return tag;
  }

/* md5.js - MD5 Message-Digest
 * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
 * Version: 2.0.0
 * LastModified: May 13 2002
 *
 * This program is free software.  You can redistribute it and/or modify
 * it without any warranty.  This library calculates the MD5 based on RFC1321.
 * See RFC1321 for more information and algorism.
 */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('l Y=g e(3f,3e,3d,3c,3b,3a,2Z,2Y,2X,2W,2V,2U,2T,2S,2R,2Q,2P,2O,2N,2M,2L,2K,2J,2I,2H,2G,2F,2E,2D,2C,2B,2A,2z,2y,2x,2w,2v,2u,2t,2s,2r,2q,2p,2o,2n,2m,2l,2k,2j,2i,2h,2g,2f,2e,2d,2c,2b,2a,1Z,1Y,1X,1W,1V,1U,1T);l 1h=g e(g e(0,7,1),g e(1,12,2),g e(2,17,3),g e(3,22,4),g e(4,7,5),g e(5,12,6),g e(6,17,7),g e(7,22,8),g e(8,7,9),g e(9,12,10),g e(10,17,11),g e(11,22,12),g e(12,7,13),g e(13,12,14),g e(14,17,15),g e(15,22,16));l 1f=g e(g e(1,5,17),g e(6,9,18),g e(11,14,19),g e(0,20,20),g e(5,5,21),g e(10,9,22),g e(15,14,23),g e(4,20,24),g e(9,5,25),g e(14,9,26),g e(3,14,27),g e(8,20,28),g e(13,5,29),g e(2,9,30),g e(7,14,31),g e(12,20,32));l 1d=g e(g e(5,4,33),g e(8,11,34),g e(11,16,35),g e(14,23,36),g e(1,4,37),g e(4,11,38),g e(7,16,39),g e(10,23,1S),g e(13,4,1R),g e(0,11,1Q),g e(3,16,1P),g e(6,23,1O),g e(9,4,1N),g e(12,11,1M),g e(15,16,1L),g e(2,23,1K));l 1b=g e(g e(0,6,1J),g e(7,10,1I),g e(14,15,1H),g e(5,21,1G),g e(12,6,1F),g e(3,10,1E),g e(10,15,1D),g e(1,21,P),g e(8,6,1C),g e(15,10,1B),g e(6,15,1A),g e(13,21,1z),g e(4,6,1y),g e(11,10,1x),g e(2,15,1w),g e(9,21,X));o 1i(x,y,z){q(x&y)|(~x&z)}o 1g(x,y,z){q(x&z)|(y&~z)}o 1e(x,y,z){q x^y^z}o 1c(x,y,z){q y^(x|~z)}l O=g e(g e(1i,1h),g e(1g,1f),g e(1e,1d),g e(1c,1b));o A(G){q L.K(G&J)+L.K((G>>>8)&J)+L.K((G>>>16)&J)+L.K((G>>>24)&J)}o 1v(F){q F.v(0)|(F.v(1)<<8)|(F.v(2)<<16)|(F.v(3)<<24)}o H(n){1a(n<0)n+=Z;1a(n>1u)n-=Z;q n}o W(x,s,f,h,r){l a,b,c,d;l R,I,Q;l t,u;a=h[0];b=h[1];c=h[2];d=h[3];R=r[0];I=r[1];Q=r[2];u=f(s[b],s[c],s[d]);t=s[a]+u+x[R]+Y[Q];t=H(t);t=((t<<I)|(t>>>(32-I)));t+=s[b];s[a]=H(t)}o V(m){l h,x,p,s;l B,E,D,f,r;l i,j,k;l N;p=g e(1t,1s,1r,1q);B=m.1p;E=B&1o;D=(E<P)?(P-E):(1n-E);1m(D>0){m+="\\1l";w(i=0;i<D-1;i++)m+="\\1k"}m+=A(B*8);m+=A(0);B+=D+8;h=g e(0,1,2,3);x=g e(16);s=g e(4);w(k=0;k<B;k+=X){w(i=0,j=k;i<16;i++,j+=4){x[i]=m.v(j)|(m.v(j+1)<<8)|(m.v(j+2)<<16)|(m.v(j+3)<<24)}w(i=0;i<4;i++)s[i]=p[i];w(i=0;i<4;i++){f=O[i][0];r=O[i][1];w(j=0;j<16;j++){W(x,s,f,h,r[j]);N=h[0];h[0]=h[3];h[3]=h[2];h[2]=h[1];h[1]=N}}w(i=0;i<4;i++){p[i]+=s[i];p[i]=H(p[i])}}q A(p[0])+A(p[1])+A(p[2])+A(p[3])}o 1j(m){l i,C,c;l M;M=V(m);C="";w(i=0;i<16;i++){c=M.v(i);C+="U".T((c>>4)&S);C+="U".T(c&S)}q C}',62,202,'||||||||||||||Array||new|abcd||||var|data||function|state|return|||||charCodeAt|for||||MD5_pack|len|out|padLen|index|s4|n32|MD5_number|ss|0xff|fromCharCode|String|bit128|tmp|MD5_round|56|ii|kk|0xf|charAt|0123456789abcdef|MD5_hash|MD5_apply_round|64|MD5_T|4294967296|||||||||||while|MD5_round4|MD5_I|MD5_round3|MD5_H|MD5_round2|MD5_G|MD5_round1|MD5_F|MD5_hexhash|x00|x80|if|120|0x3f|length|0x10325476|0x98badcfe|0xefcdab89|0x67452301|4294967295|MD5_unpack|63|62|61|60|59|58|57|55|54|53|52|51|50|49|48|47|46|45|44|43|42|41|40|0xeb86d391|0x2ad7d2bb|0xbd3af235|0xf7537e82|0x4e0811a1|0xa3014314|0xfe2ce6e0|||||||||||0x6fa87e4f|0x85845dd1|0xffeff47d|0x8f0ccc92|0x655b59c3|0xfc93a039|0xab9423a7|0x432aff97|0xf4292244|0xc4ac5665|0x1fa27cf8|0xe6db99e5|0xd9d4d039|0x04881d05|0xd4ef3085|0xeaa127fa|0x289b7ec6|0xbebfbc70|0xf6bb4b60|0x4bdecfa9|0xa4beea44|0xfde5380c|0x6d9d6122|0x8771f681|0xfffa3942|0x8d2a4c8a|0x676f02d9|0xfcefa3f8|0xa9e3e905|0x455a14ed|0xf4d50d87|0xc33707d6|0x21e1cde6|0xe7d3fbc8|0xd8a1e681|0x02441453|0xd62f105d|0xe9b6c7aa|0x265e5a51|0xc040b340|0xf61e2562|0x49b40821|0xa679438e|0xfd987193|0x6b901122|0x895cd7be|0xffff5bb1|0x8b44f7af|0x698098d8|0xfd469501|0xa8304613|0x4787c62a|||||||||||0xf57c0faf|0xc1bdceee|0x242070db|0xe8c7b756|0xd76aa478|0x00000000'.split('|'),0,{}))


//GreaseFox - Reopen the Page

/*
Todo

IME OFF
*/

var GreaseFox = new Class.create();
GreaseFox.prototype = {
	initialize: function(){
		this.version = 0.8;
		this.history = [];
		this.Matryoshka = 1;
		this.make();
	},
	make: function(){
		this.win = mktag('div', {id: 'GreaseFox'});
		this.ttl = mktag('div', {id: 'GFTtl'});
		this.adr = mktag('input', {id: 'GFAdr', type: 'text'});
		this.plg = mktag('div', {id: 'GFPlg'});
		this.tab = mktag('iframe', {id: 'GFTab', name: 'GFTab'});
		this.win.appendChild(this.ttl);
		this.win.appendChild(this.adr);
		this.win.appendChild(this.plg);
		this.win.appendChild(this.tab);
/*
		var div = mktag('div', {id:'GFSwitch'});
		var button = mktag('span', {textContent:'x', id: 'GFErase'});
		button.addEventListener('click',
			function(){
				div.parentNode.removeChild(div);
			}.bind(this),
		true);
		var text = mktag('span', {id:'GFStatus'});
		text.innerHTML = 'browser on';
		div.appendChild(button);
		div.appendChild(text);
		document.body.appendChild(div);
*/
	},
	start: function(){
		document.body.appendChild(this.win);
		this.setStyle();
		this.setSize();
		this.setEvent();
	},
	setEvent: function(){
		this.addEvent(document.body, 'mousedown' ,this.judgeEvent);
		this.addEvent(window, 'keypress' ,function(e){
			if(e.keyCode == 27)this.hide();
			if(e.charCode == 118){
				this.newTab();
				this.hide();
			}
		});
		this.addEvent(this.win, 'mouseout',function(e){
			//log(e.target.tagName)
			//log(e.target.id)
			if(e.target.tagName=='DIV' && e.target.id=='GreaseFox')this.hide();
		});
		/*
		this.addEvent(document.body, 'click', function(e){
		 	log(e.target.parentNode.parentNode.id);
		 	if(e.target.parentNode.parentNode.id=='GFPlg')return;
			this.hide;
		});
		*/
		this.addEvent(window, 'resize', this.setSize);
		this.addEvent(this.tab, 'load', function(){
			//log(this.tab);
			//this.adr.value = this.tab.src;
			var title = decodeURIComponent(GM_getValue('title'));
			var url = decodeURIComponent(GM_getValue('url'));
			this.ttl.innerHTML = title + ' - GreaseFox (Build' + this.version +')';
			this.adr.value = url;
			if(url==''){
				this.plg.innerHTML='';
			}else{
				this.addPlg(title, url);
			}
			GM_setValue('title', '');
			GM_setValue('url','');
			//this.adr.value = this.tab.contentDocument.location;
			//this.adr.value = this.tab.contentDocument.title;
		});
	},
	addEvent: function(obj, act, func){
		obj.addEventListener(act, func.bind(this), false);
	},
	setSize: function(){
		var size = getWinSize();
		//log(size)
		this.win.style.width = size[0] + 'px';
		this.win.style.height = size[1] + 'px';
	},
	 judgeEvent: function(e){
	 	if(e.target.tagName == 'IMG' && e.target.parentNode.tagName == 'A')
			var link = e.target.parentNode.href;
		if(e.target.tagName == 'A')
			var link = e.target.href;
		if(link){
			var anchor = new RegExp(location.href.split('#')[0]+'#');
			if(link.match(/^javascript:|^mailto:|\.user\.js$/) || link.match(anchor))return;
			if(!e.ctrlKey && !e.altKey && !e.shiftKey){
				//if (self.location.href!=top.location.href && !this.Matryoshka) return;
				this.show(link);
			}else if(e.altKey){
				location.href=link;
			}
			return false;
		}
	},
	toggle: function(){
		(this.win.style.display!='none')?this.hide():this.show();
	},
	show: function(url){
		this.win.style.display = 'block';
		if(url){
			if(this.tab.src == url)return;
			this.tab.src = url;
			GM_setValue('reffer', encodeURIComponent(location.href));
			/*
			GM_xmlhttpRequest({
				method: 'HEAD',
				url: url,
				onload: function(details) {
					log(details.responseText)
					log(details.responseHeaders)
					var encode = details.responseHeaders.split('\n');
					var type;
					encode.forEach(function(e){
						var temp = e.split(/Content-Type: /)
						if(temp.length>1)type=temp[1];
					})
					if(type=='text/html')type='text/html; charset=shift_jis';
					GM_xmlhttpRequest({
						method: 'GET',
						url: url,
						overrideMimeType: type,
						onload: function(details) {
							//log(details.responseText);
							//log(this.tab.contentDocument)
							var iframe = this.tab.contentDocument;
							iframe.writeln('<body></body>');
							iframe.body.innerHTML = details.responseText;
							//var base = mktag('base', {href: })
							iframe.close();
						}.bind(this)
					})
				}.bind(this)
			})
			*/
		}
	},
	hide: function(){
		this.win.style.display = 'none';
	},
	newTab: function(){
		GM_openInTab(this.tab.src);
	},
	addPlg: function(title, url){
		if(url=='')return;
		this.plg.innerHTML = '';
		var newTab = mktag('a', {target: '_blank', href: url });
		newTab.innerHTML = 'newTab';
		this.plg.appendChild(newTab);

		this.addSBM('http://b.hatena.ne.jp/append?'+url, 'http://b.hatena.ne.jp/images/entry.gif');
		this.addSBM('http://b.hatena.ne.jp/entry/'+url, 'http://b.hatena.ne.jp/entry/image/'+url);
		this.addSBM('http://del.icio.us/post?v=4;url='+encodeURIComponent(url)+';title='+encodeURIComponent(title), 'http://del.icio.us/static/img/delicious.small.gif');
		this.addSBM('http://del.icio.us/url?url='+url, 'http://del.icio.us/feeds/img/savedcount/'+MD5_hexhash(url));
		this.addSBM('http://clip.livedoor.com/clip/add?link='+encodeURIComponent(url)+'&title='+encodeURIComponent(title)+'&jump=myclip', 'http://parts.blog.livedoor.jp/img/cmn/clip_16_16_b.gif');
		this.addSBM('http://clip.livedoor.com/page/'+url, 'http://image.clip.livedoor.com/counter/'+url);
		this.addSBM('http://mail.google.com/mail/?view=cm&cmid=0&fs=1&tearoff=1&su=' + encodeURIComponent(title)+'&body='+encodeURIComponent(title + '\n' + url), 'http://mail.google.com/favicon.ico', true);
		this.addSBM('http://digg.com/submit?phase=2&url='+ url, 'http://www.digg.com/img/badges/16x16-digg-guy.gif');		
	    this.plg.innerHTML+='<iframe src="http://digg.com/tools/diggthis.php?u='+url+'&s=compact" frameborder="0" height="18" scrolling="no"></iframe>';
	},
	addSBM: function(hurl, surl, type){
		var targets = (type) ? '_blank' : 'GFTab';
		var link = mktag('a', {href: hurl, target: targets});
		var img = mktag('img', {src: surl});
		link.appendChild(img);
		this.plg.appendChild(link);
	},
	setStyle: function(){
		var bgi = 'data:image/gif;base64,'+
						    'R0lGODlhAgACAIAAAGZmZv///yH5BAEHAAEALAAAAAACAAIAAAIDRAIFADs=';
		var style = <><![CDATA[
			#GreaseFox {
				display: none;
				position: fixed;
				top: 0;
				left: 0;
				z-index: 100001;
				//background-image: url(']]></>+bgi+<><![CDATA[');
				background-color: #1F1F1F;
				//-moz-opacity: 0.95;
				border: 1px solid #333;
				padding: 0 5% 0 5%;
				text-align: left;
			}
			#GreaseFox * {
				float: none;
				color: #000;
				decoration: none;
				text-indent: 0;
				text-align: left;
				background-color: transparent;
				padding: 0;
				margin: 0;
				border: 0;
			}
			#GFTab,  #GFPlg,  #GFTtl {
				width: 90%;
			}
			#GFTab {
				height: 95%;
				background-color: #fff;
				margin: 0 auto;
			}
			#GFTtl {
				color: #fff;
				background-color: #051473;
			}
			#GFAdr {
				width: 89%;
				font-size: 1.25em;
				padding: 2px 6px;
				border: 1px solid #333;
				background-color:#FFF;
			}
			#GFPlg {
				background: #fff;
			}
			#GFPlg img {
				margin: 0 2px;
			}
			#GFSwitch {
				position: fixed;
				top:0;
				left:0;
				background-color: white;
				color: blue;
				font-family:monospace;
				font-size:9pt;
				-moz-border-radius-bottomright:10px;
				padding:3px;
				border-bottom:1px solid #333333;
				border-right:1px solid #333333;
			}
			#GFErase {
				background-color:lightgray;
				padding:2px;
				margin-right: 5px;
				border-top:1px solid white;
				border-left:1px solid white;
				border-right:1px solid #333333;
				border-bottom:1px solid #333333;
				cursor: pointer; 
			}
		]]></>;
		GM_addStyle(style);
	}
}

if(location.href=='http://reader.livedoor.com/reader/'){
  var w = unsafeWindow;
  var _onload = w.onload;


  var onload = function(){with(w){
	var browser = new GreaseFox;
	browser.start();
      //Keybind.remove("v");
      Keybind.add("g", function(){
          var item = get_active_item(true);
          if(item){
			browser.show(item.link);
          }
        });
    }}
  w.onload = function(){
    _onload();
    onload();
  }
}else{
	var browser = new GreaseFox;
	browser.start();
}
})();