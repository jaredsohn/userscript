scr_meta=<><![CDATA[ // auto-update
// ==UserScript==
// @name           Bierdopje Download Functionality
// @namespace      Bierdopje
// @description    Adds dowbload functionality to Bierdopje.com
// @include        http://www.bierdopje.com/*
// @include        http://bierdopje.com/*
// @author		   Wesley Lancel
// @require 	   http://sizzlemctwizzle.com/updater.php?id=57163
// ==/UserScript==
]]></>.toString(); // auto-update

if (window.location.href.indexOf("forum") > 0) return false;

function parseVal(val)
{
	while (val.charAt(0) == '0')
	val = val.substring(1, val.length);
	return val;
}

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

var wz2 = document.createElement('script');
wz2.src = 'http://www.bierdopje.com/x/wz2.js';
wz2.type = 'text/javascript';
document.getElementsByTagName('body')[0].appendChild(wz2);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();


function letsJQuery() {
	/*var end = document.title.indexOf(" | ", 25);
	var nicename = document.title.substr(25, end-25);*/
	var eps = new Array();
	//var stuff = new Array();
	//var names = new Array();
	var count = 1;
	$('a').each (function (i) {
		var show = this.href.indexOf("/shows/");
		if (show == -1) return true;
		var ep = this.href.indexOf("/episode/");
		if (ep == -1) return true;
                if (this.parentNode.parentNode.id == "billboard") return true;
		if (this.parentNode.innerHTML.match ("wipreplies")) return true;
		if (this.parentNode.innerHTML.match ("clock.gif")) return true;
		var edit = false;
		if (this.innerHTML.indexOf("Volgende aflevering") > 0){ edit = "down"; /*alert ("volgende aanwezig");*/ }
		if (this.innerHTML.indexOf("Vorige aflevering") > 0){ edit = "up"; /*alert ("vorige aanwezig");*/ }
		var name = this.href.substr(show+7, (ep-(show+7)))
		var season = this.href.substr(ep+10,2);
		var epi = this.href.substr(ep+13,2);
		var nr = parseInt(parseVal(epi));
		if (edit == "down") { nr = nr - 1; }
		if (edit == "up") { nr = nr + 1; }
		if (nr < 10) { nr = "0"+nr; }
		epi = nr;
		//alert(name+" S"+season+"E"+epi);
		//names[count]=name;
		name=name.replace(/ /g,".")
		name=name.replace(/-/g,".")
		eps[count] = name+" s"+season+"e"+epi;
		//stuff[count] = "S"+season+"E"+epi;
		
		//TVNZB:
		form = document.createElement("form");
		form.method="POST";
		form.action="http://www.tvnzb.com/index.php";
		form.target="_blank";
		form.name="nzb"+count;
		t=document.createElement('input');
		t.type="hidden";
		t.name='t';
		f=document.createElement('input');
		f.type="hidden";
		f.name='f';
		f.value=name;
		st=document.createElement('input');
		st.type="hidden";
		st.name='st';
		ss=document.createElement('input');
		ss.type="hidden";
		ss.name='ss';
		ss.value=season;
		se=document.createElement('input');
		se.type="hidden";
		se.name='se';
		se.value=epi;
		form.appendChild(t);
		form.appendChild(f);
		form.appendChild(st);
		form.appendChild(ss);
		form.appendChild(se);
		document.body.appendChild(form);
		count++;
	});
	
	count = 1;
	$('.specbtn').each (function (i) {
		if (this.src.substr(-11) == 'us_gray.gif' || this.src.substr(-6) == 'us.gif')
		{
			$(this).after(" <img src=\"/g/if/icons/drive_go.gif\" onclick='Tip(\"<a href=http://binsearch.net/?q="+eps[count].replace(" ",".")+"&max=250&adv_age=365 target=_blank>Binsearch</a><br/><a href=http://thepiratebay.org/search/"+eps[count].replace(" ",".")+"/0/99/200 target=_blank>ThePirateBay.org</a><br/><a href=javascript:document.nzb"+count+".submit();>TVNZB</a><br/><a href=http://www.yabsearch.nl/search/"+eps[count].replace(" ",".")+" target=_blank>Yabsearch</a><br/><a href=http://nzbindex.nl/search/?q="+eps[count].replace(" ",".")+"&age=&max=25&sort=agedesc&minsize=&maxsize=&poster=&nfo=&hidespam=0&hidespam=1&more=0 target=_blank>NZBIndex</a>\", TITLE, \""+eps[count].replace(" ",".")+" downloaden\");' style=\"cursor: pointer;\" />");
			count++;
		}
	});
	
	if (document.title == "Bierdopje.com | Frontpage" || window.location.href.match("/latest/"))
	{
		var data = new Array();
		
		$('a').each(function(i){
			if(this.href.match("/downloads/sub/")){
				end = this.href.indexOf("/",39);
				code = this.href.substr(39,end-39);
				code = parseInt(code);
				data[code] = this.innerHTML;
				
				//TVNZB:
				form = document.createElement("form");
				form.method="POST";
				form.action="http://www.tvnzb.com/index.php";
				form.target="_blank";
				form.name="front"+code;
				t=document.createElement('input');
				t.type="hidden";
				t.name='t';
				f=document.createElement('input');
				f.type="hidden";
				f.name='f';
				f.value=this.innerHTML;
				st=document.createElement('input');
				st.type="hidden";
				st.name='st';
				ss=document.createElement('input');
				ss.type="hidden";
				ss.name='ss';
				se=document.createElement('input');
				se.type="hidden";
				se.name='se';
				form.appendChild(t);
				form.appendChild(f);
				form.appendChild(st);
				form.appendChild(ss);
				form.appendChild(se);
				document.body.appendChild(form);
			}				
		
			if(this.href.match("/thickbox/subreplies/")){
				end = this.href.indexOf("/",45);
				code = this.href.substr(45,end-45);
				code = parseInt(code);
				$(this).before("<img src=\"/g/if/icons/drive_go.gif\" onclick='Tip(\"<a href=http://binsearch.net/?q="+data[code]+"&max=250&adv_age=365 target=_blank>Binsearch</a><br/><a href=http://thepiratebay.org/search/"+data[code]+"/0/99/200 target=_blank>ThePirateBay.org</a><br/><a href=javascript:document.front"+code+".submit();>TVNZB</a><br/><a href=http://www.yabsearch.nl/search/"+data[code]+" target=_blank>Yabsearch</a><br/><a href=http://nzbindex.nl/search/?q="+data[code]+"&age=&max=25&sort=agedesc&minsize=&maxsize=&poster=&nfo=&hidespam=0&hidespam=1&more=0 target=_blank>NZBIndex</a>\", TITLE, \""+data[code]+" downloaden\");' style=\"cursor: pointer;\" /> ");
			}
		});
	}
	
}