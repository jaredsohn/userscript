scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           Full articles in Google Reader
// @namespace      http://www.google.com/*
// @description    Expand short RSS headers onto full articles in Googe Reader
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @require        http://dl.getdropbox.com/u/509719/grease-mootools.js
// @version        0.4.2
// ==/UserScript==
]]></>; // Make sure to copy this line right below

// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '43092', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks
 
 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 
 call: function(response) {
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
		'Accept': 'application/atom+xml,application/xml,text/xml',
		},
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
	  });
  },
 compare: function(xpr,response) {
	this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
	this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
	if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
	  GM_setValue('updated', this.time);
	  GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
	} else if ( (this.xversion) && (this.xversion != this.version) ) {
	  if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
	  } else {
	GM_setValue('updated', this.time);
	  }
	} else {
	  if(response) alert('No updates available for '+this.name);
	  GM_setValue('updated', this.time);
	}
  },
 check: function() {
	if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
	if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
	  this.call();
	} else if (GM_getValue('updated', 0) == 'off') {
	  GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
	} else {
	  GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
	}
	}
};

CheckScriptForUpdate.check();

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////       CODE        /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function rankBegin(text1, text2) {
	var rank = 0;
	text1 = stripHTML(text1).trim().split(/[^a-z0-9\?\.\,\!]/im);
	text2 = stripHTML(text2).trim().split(/[^a-z0-9\?\.\,\!]/im);
	for(var i = 0; i < 5 && i < text1.length && i < text2.length; i++) {
		if(text1[i] == text2[i]) rank++;
	}
	return rank;
}

function firstBig(e) {
console.debug($(e).getChildren());
	$A($(e).getChildren()).each(function(d) {
		if(d.length > 50) return $(d);
	});
	return $($(e).getChildren()[0]);
}


function findFirst(text, elements) {
	elements = $A(elements);
	elements.each(function(e) {
		e.rank = rankBegin(text, e.innerHTML);
	});
	elements.sort(sortrank);
	return $(elements[0]);
}

function getRandom(arr){
		return (arr.length) ? arr[$random(0, arr.length - 1)] : null;
};

function merge(){
	var result = [];
	for(var j = 0; j < arguments.length; j++)
		for(var i = 0; i < arguments[j].length; i++) result.push(arguments[j][i]);
	return result;
}

function top(context, element){
	var first = element.firstChild;
	(first) ? element.insertBefore(context, first) : element.appendChild(context);
}

function get(url, func) {
	GM_xmlhttpRequest({
		method:"GET",
		url:url,
		onload:function(details) {
		  func(details);
		}
	})
}

function getElementsByClassName(classname, node)  {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))a.push(els[i]);
	return a;
}

function getElementsByRegExpId(p_regexp, p_element, p_tagName) {
	p_element = p_element === undefined ? document : p_element;
	p_tagName = p_tagName === undefined ? '*' : p_tagName;
	var v_return = [];
	var v_inc = 0;
	for(var v_i = 0, v_il = p_element.getElementsByTagName(p_tagName).length; v_i < v_il; v_i++) {
		if(p_element.getElementsByTagName(p_tagName).item(v_i).id && p_element.getElementsByTagName(p_tagName).item(v_i).id.match(p_regexp)) {
			v_return[v_inc] = p_element.getElementsByTagName(p_tagName).item(v_i);
			v_inc++;
		}
	}
	return v_return;
}

function stripHTML(html) {
	html = html.replace(/(<([^>]+)>)/ig,"");
	return html.replace(/\s+/ig," ");
}

function rank(arr, text) {
	var r = 0;
	for(var i = 0; i < arr.length; i++) {
		if((new RegExp(arr[i], "i")).test(text)) r++;
	}
	return r;
}

function sortrank(d1, d2) {
	if(d1.rank >= d2.rank) return -1; else return 1;
}

function sortlength(d1, d2) {
	if(d1.length > d2.length) return -1; else return 1;
}

function doit() {
	var entry = $("current-entry");
	var link = getElementsByClassName("entry-title-link", entry)[0].href;
	var content = getElementsByClassName("item-body", entry)[0];
	var text = stripHTML(firstBig(content).innerHTML);
	var title = stripHTML(getElementsByClassName("entry-title-link", entry)[0].innerHTML).split(/[^[a-z0-9\s]/gi).sort(sortlength)[0]; 
	var image = getElementsByClassName("entry-title-go-to", entry)[0];
	image.innerHTML = '<img style="border: 0px;" src="data:image/gif;base64,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" width="16" height="16">';
	var random = [];
	var text_array = text.split(/[\s\.,!?\(\)\*]+/);
	while(random.length < 25) {
		var s = getRandom(text_array);
		if(s.length > 4 && (new RegExp("^[a-z]+$", "i")).test(s)) random.push(s.toLowerCase());
	}
	get(link, function(e){  
		var body = document.createElement("div");
			body.innerHTML = e.responseText;	
		var divs = merge(body.getElementsByTagName('div'), body.getElementsByTagName('p'));
		var candidates = [];
		for(var i = 0; i < divs.length; i++) {
			var r = 0;
			if(divs[i].innerHTML.length >= text.length + 20) {
				var strip = stripHTML(divs[i].innerHTML);
				if((r = rank(random, strip)) > 12) {
					//if((new RegExp(title, "im")).test(strip)) { r /= 2; divs[i].ok = true; };
					//if((new RegExp("comment", "im")).test(strip) || (new RegExp("komentarz", "im")).test(strip)) r-=4;
					divs[i].rank = r;
					candidates.push(divs[i]);
				}
			}
		}
		candidates.sort(sortrank);
		if(candidates[1] && candidates[0].innerHTML.length*2 < candidates[1].innerHTML.length)
			winner = candidates[1];
		else winner = candidates[0];
		// Obróbka
		var elements = merge(
			winner.getElementsByTagName("h1"), 
			winner.getElementsByTagName("h2"), 
			winner.getElementsByTagName("form"),
			winner.getElementsByTagName("script"),
			winner.getElementsByTagName("br"),
			winner.getElementsByTagName("hr"),
			getElementsByClassName("/.*(comment|head|komentarz|data|tags|author|related|meta|social|share|ads|info|card|social|ads).*/", winner),
			getElementsByRegExpId(/.*(comment|head|komentarz|data|tags|author|related|meta|social|share|ads|info|card|social|ads).*/, winner))
		for(var i = 0; i < elements.length; i++) {
			if(elements[i].parentNode != null)
				elements[i].parentNode.removeChild(elements[i]);
			else
				elements[i].innerHTML = '';
		}
		
		// Find first element of body
		var first = findFirst(text, winner.getElementsByTagName('*'));
		first.getAllPrevious().each(function(e) {
			e.innerHTML = "";
		});
		winner = (first.getParent()?first.getParent():first);
		
		// Statistics, related etc
		var children = winner.getElementsByTagName('*');
		for(var i = children.length-1; i >=0; i--) {
			if(stripHTML(children[i].innerHTML).replace(/^[a-z]/i, "").length < 20) {
				if(children[i].parentNode != null)
					children[i].parentNode.removeChild(children[i]);
				else
				children[i].innerHTML = '';
			} else break;
		}		
		
		// Tags
		var children = winner.getElementsByTagName('*');
		for(var i = 0; i < children.length; i++) {
			if(stripHTML(children[i].innerHTML).replace(/^[a-z]/i, "").length < 120 && stripHTML(children[i].innerHTML).match(/tag/i) && children[i].parentNode != null)
					children[i].parentNode.removeChild(children[i]);
			if(stripHTML(children[i].innerHTML).replace(/^[a-z]/i, "").length < 4  && children[i].parentNode != null)
					children[i].parentNode.removeChild(children[i]);			
		}			
		
		image.innerHTML = "";
		content.innerHTML = winner.innerHTML;
	});
}

window.addEventListener("load", function(e) {
	setTimeout(function(){
		var footer = document.getElementById("viewer-footer");
		var lang = ($('settings-link').innerHTML == "Settings")?"en":"pl";
		var t = "Expand selected news";
		if(lang == 'pl') t = "Rozwiń aktywny element";
		var button = document.createElement("div");
			button.className = "goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight";
			button.id = "entries-expand";
			button.addEventListener("click", doit, false); 
			button.innerHTML = '<div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow"> </div><div class="goog-button-base-content"><div class="goog-button-body">'+t+'</div></div></div></div></div>';
		footer.appendChild(button);
	}, 3000);
}, true);

window.addEventListener("keydown", function(e) { if(e.which == 90) doit(); }, false);