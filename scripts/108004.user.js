// ==UserScript==
// @name           What.SSL?
// @namespace      hateradio)))
// @description    SSL all links.
// @include        http*://*.what.cd/*
// @version        1.0
// @author         hateradio
// ==/UserScript==

var whatssl = {
	all:document.links,
	reg:/http\:\/\/what\.cd/,
	fix:function(){
		var y = [], o = 0, i = 0, part;
		for(;i<this.all.length;i++){
			if(this.reg.test(this.all[i].href)){
				if(part = this.all[i].href.substring(14)){
					// y[o] = this.all[i].href;
					// o++;
					this.all[i].href  = 'https://ssl.what.cd'+part;
					this.all[i].title = 'With SSL';
					// this.all[i].style.border = '1px dotted red';
				}
			}
		}
		// if(o) console.log('Found '+o+'\n ('+y.join('\n')+') Non-SSL link(s)');
	}
};

whatssl.fix();