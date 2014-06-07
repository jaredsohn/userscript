// ==UserScript==
// @name           Thotthead
// @description    Adds Thottbot comments/screenshots to Wowhead
// @namespace	   http://everynothing.net/thotthead/// @include        http://www.wowhead.com/?item=*
// @include        http://www.wowhead.com/?quest=*
// @include        http://www.wowhead.com/?itemset=*
// @include        http://www.wowhead.com/?npc=*
// @include        http://www.wowhead.com/?object=*
// @include        http://www.wowhead.com/?spell=*
// @include        http://www.wowhead.com/?faction=*
// @include        http://www.wowhead.com/?zone=*
// ==/UserScript==


dothottadd();function dothottadd() {
	var thottkey = '', iid='';	/* not the most graceful... */
	try {
		iid = location.href.match(/item=(\d+)/)[1];
		thottkey = 'i';
	} catch(err) {
		try {
			iid = location.href.match(/quest=(\d+)/)[1];
			thottkey = 'q';
		} catch(err) {
			try {
				iid = location.href.match(/itemset=(\d+)/)[1];
				thottkey = '?set=';
			} catch(err) {				try {
					iid = location.href.match(/npc=(\d+)/)[1];
					thottkey = 'c';
				} catch(err) {					try {
						iid = location.href.match(/object=(\d+)/)[1];
						thottkey = 'o';
					} catch(err) {						try {
							iid = location.href.match(/spell=(\d+)/)[1];
							thottkey = 's';
						} catch(err) {							try {
								iid = location.href.match(/faction=(\d+)/)[1];
								thottkey = 'f';
							} catch(err) {								try {
									iid = location.href.match(/zone=(\d+)/)[1];
									thottkey = 'z';
								} catch(err) {									return;
								}							}						}					}				}			}		}
	}	
	if (!document.getElementById('lkljbjkb574')) return;
		GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://thottbot.com/'+thottkey+iid+((thottkey.indexOf('?')>=0)?'&':'?')+'view=Flat',
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'text/html',
	    },
	    onload: function(responseDetails) {
			t = responseDetails.responseText;

			/* comments start */

			re = new RegExp(/<DIV class=body><DIV class='pad'>([\s\S]+?)<\/div>/gim);
			re2 = new RegExp(/<DIV class=body><DIV class='pad'>([\s\S]+?)<\/div>/im);

			ret = new RegExp(/<\/span>\s+?by (<a [\s\S]*?>)?([\S]+?)(<\/a>)?(&nbsp;&lt;[\s\S]*?&gt;)?, ([\d\.]+?)\&nbsp;(\S+?)s? ago/gim);
			ret2 = new RegExp(/<\/span>\s+?by (<a [\s\S]*?>)?([\S]+?)(<\/a>)?(&nbsp;&lt;[\s\S]*?&gt;)?, ([\d\.]+?)\&nbsp;(\S+?)s? ago/im);

			res = new RegExp(/class='vote'>\s+?Score ([\d\.]+)/gim);
			res2 = new RegExp(/class='vote'>\s+?Score ([\d\.]+)/im);
			
			c = t.match(re);
			ct = t.match(ret);
			cs = t.match(res);
			
			if (c) {

				location.href = "javascript:(" + encodeURI(uneval(function(){lv_thott = new Array();})) + ")();";
				
				for (x = 0; x < c.length; x++) {
					txt = c[x].match(re2)[1].replace(/[\r\n]/g,"").replace(/<br>/gi,"\\n").replace(/&nbsp;/gi," ");
					usr = ct[x].match(ret2)[2].replace(/[\r\n]/g,"").replace(/&nbsp;/gi," ");
					tme = ct[x].match(ret2)[5].replace(/[\r\n]/g,"");
					tme_amt = ct[x].match(ret2)[6].replace(/[\r\n]/g,"");
					score = cs[x].match(res2)[1];
					
					switch(tme_amt) {
						case "year":
							tme *= 12;
						case "month":
							tme *= (365/12);
						case "day":
							tme *= 24;
						case "hour":
							tme *= 60;
						case "minute":
							tme *= 60;
						case "second":
							tme *= 1000;
					}

					
					d = new Date();
					d = new Date(d.getTime() - tme);
					datestring = ""+d.getFullYear()+"/"+formatnumber(d.getMonth()+1,2)+"/"+formatnumber(d.getDate(),2)+' '+formatnumber(d.getHours(),2)+':'+formatnumber(d.getMinutes(),2)+':'+formatnumber(d.getSeconds(),2);

					location.href = "javascript:(function(){lv_thott.push({number:"+x+",id:"+(x+1)+",user:'"+usr.replace(/'/g,'\\\'')+"',body:'"+txt.replace(/'/g,'\\\'')+"',date:'"+datestring+"',rating:"+score+",indent:0,roles:0,purged:0,deleted:0,raters:[],replyTo:1});})();";
				} 
				location.href="javascript:void(new Listview({template: 'comment', id: 'thottbot', name: 'Thottbot', tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_thott}));";

			}		

			/* comments end, ss start */

			re = new RegExp(/ssc\[(\d*)\] = "<h6>Contributed by (\S*?)<\/h6>/gim);
			re2 = new RegExp(/ssc\[(\d*)\] = "<h6>Contributed by (\S*?)<\/h6>/im);
			
			rec = new RegExp(/sst\[\d*\] = "([\s\S]*?)"/gim);
			rec2 = new RegExp(/sst\[\d*\] = "([\s\S]*?)"/im);
			
			c = t.match(re);
			cc = t.match(rec);
			
			if (c) {
				location.href = "javascript:(" + encodeURI(uneval(function(){lv_thottss = new Array();})) + ")();";
				d=new Date();
				datestring = ""+d.getFullYear()+"/"+formatnumber(d.getMonth()+1,2)+"/"+formatnumber(d.getDate(),2)+' '+formatnumber(d.getHours(),2)+':'+formatnumber(d.getMinutes(),2)+':'+formatnumber(d.getSeconds(),2);
			
				for (x = 0; x < c.length; x++) {
					imgid = c[x].match(re2)[1].replace(/<br>/gi,"\\n").replace(/&nbsp;/gi," ").replace(/'/g,'\\\'');
					byusr = c[x].match(re2)[2].replace(/<br>/gi,"\\n").replace(/&nbsp;/gi," ").replace(/'/g,'\\\'');
					captn = cc[x].match(rec2)[1].replace(/<br>/gi,"\\n").replace(/&nbsp;/gi," ").replace(/'/g,'\\\'');
					
					location.href = "javascript:(function(){lv_thottss.push({id:"+imgid+",user:'"+byusr+"',date:'"+datestring+"',caption:'"+captn+"',rWidth:150,rHeight:112,type:1,typeId:1,sticky:0});})();";
				}

				location.href = "javascript:void(new Listview({template: 'screenshot', id: 'thottss', name: 'Thott SS', tabs: tabsRelated, parent: 'lkljbjkb574', data: lv_thottss}));";
				window.setTimeout(fix_ss,250);
			}
			/* ss end */

			location.href="javascript:void(tabsRelated.parent.innerHTML='');";
			location.href="javascript:void(tabsRelated.flush());";

	    }
	});}
function fix_ss() {	var imgs = document.getElementById('tab-thottss').getElementsByTagName('img');	var links = document.getElementById('tab-thottss').getElementsByTagName('a');
	if (imgs.length == 0) {
		// didn't load imgs div yet
		window.setTimeout(fix_ss,250);		return;
	} 
	
	for (var x = 0; x < imgs.length; x++) {		iid = imgs[x].src.match(/([\d]+)\.jpg/i)[1];
		imgs[x].src = 'http://i.thottbot.com/ss/s/'+iid+'.jpg';
	}
	for (x = 0; x < links.length; x++) {
		if (links[x].href.indexOf('screenshot=view') >= 0) 			links[x].href='http://i.thottbot.com/ss/o/'+links[x].href.substr(links[x].href.indexOf('#')+1)+'.jpg'
	}		}

function formatnumber(topad2,amt) {	topad = ""+topad2;
	while (topad.length < amt) topad = "0" + topad;	return topad;}

