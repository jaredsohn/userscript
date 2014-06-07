// ==UserScript==
// @name           Google PageRank
// @description    Displays pagerank in web search results of Google.
// @version        3.1.0
// @author         Shinya <code404sk@gmail.com>
// @contributor    
// @namespace      http://code404.org/
// @homepage       http://userscripts.org/scripts/show/11216
// @id             Google-Pagerank@code404.org
// @run-at         document-end
// @license        
// @include        http://www.google.*/search*
// ==/UserScript==

// Original Script
// http://blog.c--v.net/2006/12/04/1
//
// Thanks, Ryosuke SEKIDO.
//

(function(){
	function googlechcalc(){
		return this;
	}
	
	googlechcalc.prototype = {
		googleNewCh: function(ch){
			ch = (((ch / 7) << 2) | ((this.myfmod(ch, 13)) & 7));
			
			prbuf = new Array();
			prbuf[0] = ch;
			for(var i = 1; i < 20; i++){
				prbuf[i] = prbuf[i-1] - 9;
			}
			ch = this.googleCH(this.c32to8bit(prbuf), 80);
			
			return ch;
		},
		
		googleCH: function(url){
			var init = 0xE6359A60;
			
			var length = url.length;
			
			var a = 0x9E3779B9;
			var b = 0x9E3779B9;
			var c = 0xE6359A60;
			var k = 0;
			var len = length;
			var mixo = new Array(); 
			
			while(len >= 12){
				a += (url[k+0] +(url[k+1]<<8) +(url[k+2]<<16) +(url[k+3]<<24));
				b += (url[k+4] +(url[k+5]<<8) +(url[k+6]<<16) +(url[k+7]<<24));
				c += (url[k+8] +(url[k+9]<<8) +(url[k+10]<<16)+(url[k+11]<<24));
				mixo = this.mix(a, b, c);
				a = mixo[0]; b = mixo[1]; c = mixo[2];
				k += 12;
				len -= 12;
			}
			
			c += length;
			
			switch(len){
				case 11:
				c += url[k+10]<<24;
				
				case 10:
				c+=url[k+9]<<16;
				
				case 9:
				c+=url[k+8]<<8;
				
				case 8:
				b+=(url[k+7]<<24);
				
				case 7:
				b+=(url[k+6]<<16);
				
				case 6:
				b+=(url[k+5]<<8);
				
				case 5:
				b+=(url[k+4]);
				
				case 4:
				a+=(url[k+3]<<24);
				
				case 3:
				a+=(url[k+2]<<16);
				
				case 2:
				a+=(url[k+1]<<8);
				
				case 1:
				a+=(url[k+0]);
			}
			
			mixo = this.mix(a, b, c);
			
			if(mixo[2] < 0){
				return(0x100000000 + mixo[2]);
			}else{
				return mixo[2];
			}
		},
		
		hexdec: function(str){
			return parseInt(str, 16);
		},
		
		zeroFill: function(a, b){
			var z = this.hexdec(80000000);
			
			if(z & a){
				a = a >> 1;
				a &= ~z;
				a |= 0x40000000;
				a = a >> (b - 1);
			}else{
				a = a >> b;
			}
			
			return(a);
		},
		
		mix: function(a, b, c){
			a -= b; a -= c; a ^= (this.zeroFill(c, 13));
			b -= c; b -= a; b ^= (a << 8 );
			c -= a; c -= b; c ^= (this.zeroFill(b, 13));
			a -= b; a -= c; a ^= (this.zeroFill(c, 12));
			b -= c; b -= a; b ^= (a << 16);
			c -= a; c -= b; c ^= (this.zeroFill(b, 5));
			a -= b; a -= c; a ^= (this.zeroFill(c, 3));
			b -= c; b -= a; b ^= (a << 10);
			c -= a; c -= b; c ^= (this.zeroFill(b, 15));
			
			var ret = new Array((a), (b), (c));
			
			return ret;
		},
		
		strord: function(string){
			var result = new Array();
			for(var i = 0; i < string.length; i++){
				result[i] = string.substr(i,1).charCodeAt(0);
			}
			
			return result;
		},
		
		c32to8bit: function(arr32){
			var arr8 = new Array();
			
			for(var i = 0; i < arr32.length; i++){
				for(var bitOrder = i * 4; bitOrder <= i * 4 + 3; bitOrder++){
					arr8[bitOrder] = arr32[i] & 255;
					arr32[i] = this.zeroFill(arr32[i], 8);
				}
			}
			
			return arr8;
		},
		
		myfmod: function(x, y){
			var i = Math.floor(x / y);
			return(x - i * y);
		}
	}
	
	
	gGoogleCHCalc = new googlechcalc();
	
	function rank(){
		this.PATH = "h3.r > a.l";
	}
	
	rank.prototype = {
		set: function(doc){
			var self = this;
			var node = doc || document;
			var results = node.querySelectorAll(this.PATH);
			for(var i = 0, l = results.length; i < l; i++){
				setTimeout((function(i){
					return function(){
						self.searchPagerankStatus(results[i]);
					}
				})(i), 500 * i);
			}
		},
		
		searchPagerankStatus: function(node){
			var self = this;
			var url = node.href;
			
			url = url.replace(/\?.*$/g, "?");
			
			var reqgr = "info:" + url;
			var reqgre = "info:" + self.ssUrlEncode(url).replace(/%2C/, "%2B").replace(/_/, "%5F");
			this.mGoogleCH = gGoogleCHCalc.googleCH(gGoogleCHCalc.strord(reqgr));
			this.mGoogleCH = "6" + gGoogleCHCalc.googleNewCh(this.mGoogleCH);
			
			var querystring = "http://";
			querystring += "toolbarqueries.google.com/search?client=navclient-auto&ch=" + 
				this.mGoogleCH + "&ie=UTF-8&oe=UTF-8&features=Rank"
				+ "&q=" + reqgre;
			
			GM_xmlhttpRequest({
				method: "GET",
				url: querystring,
				headers: {"User-Agent": "Mozilla/4.0 (compatible; GoogleToolbar 2.0.114-big; Windows XP 5.1)"},
				onload: function(response){
					var temp = self.setPagerankStatus(response.responseText);
					node.parentNode.appendChild(
						document.createTextNode(
							temp == -1 ?
								" [ n/a ]" :
								" [ " + temp + "/10 ]"
						)
					);
				}
			});
		},
		
		setPagerankStatus: function(temp){
			var foo = temp.match(/Rank_.*?:.*?:(\d+)/i);
			var pr = (foo) ? foo[1] : "-1";
//			foo = temp.match(/FVN_.*?:.*?:(?:Top\/)?([^\s]+)/i);
//			var cat = (foo) ? foo[1] : "n/a";
			return pr;
		},
		
		ssUrlEncode: function(url){
			return escape(url).replace(/\+/g, '%2C').replace(/\"/g, '%22').replace(/\'/g, '%27');
		}
	}
	
	var pg = new rank();
	pg.set();
	
	// Autopagerize and more
	var boot = function(aEvent){
		pg.set(aEvent.target);
	};
	window.addEventListener("AutoPatchWork.DOMNodeInserted", boot, false);
	window.addEventListener("AutoPagerize_DOMNodeInserted", boot, false);
	window.addEventListener("AutoPagerAfterInsert", boot, false);
})();
