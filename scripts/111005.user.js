// ==UserScript==
// @name			UnTaint Wiki Improvement Script-G
// @namespace		http://hawaiifive-0.wikifoundry.com/
// @description   	Greasemonkey script that improves the Wikifoundry wiki interface and integrates TinyEditor. For Firefox and Chrome.
// @version			1.6.ffc.cen.001
// @include			http://*.wikifoundry.com/thread*
// @include			http://*.wikifoundry.com/forum/*
// @include			http://*.wikifoundry.com/forum
// @include			http://*.wikifoundry.com/account/*/thread/*
// @include			http://*.wikifoundry.com/photo/*/thread/*
// @include			http://*.wikifoundry.com/video/*/thread/*
// @include			http://www.sarahconnorfans.com/thread*
// @include			http://www.sarahconnorfans.com/forum/*
// @include			http://www.sarahconnorfans.com/forum
// @include			http://www.sarahconnorfans.com/account/*/thread/*
// @include			http://www.sarahconnorfans.com/photo/*/thread/*
// @include			http://www.sarahconnorfans.com/video/*/thread/*
// @include			http://www.vampirediariesfanwiki.com/thread*
// @include			http://www.vampirediariesfanwiki.com/forum/*
// @include			http://www.vampirediariesfanwiki.com/forum
// @include			http://www.vampirediariesfanwiki.com/account/*/thread/*
// @include			http://www.vampirediariesfanwiki.com/photo/*/thread/*
// @include			http://www.vampirediariesfanwiki.com/video/*/thread/*
// @include			http://www.thegreysanatomywiki.com/thread*
// @include			http://www.thegreysanatomywiki.com/forum/*
// @include			http://www.thegreysanatomywiki.com/forum
// @include			http://www.thegreysanatomywiki.com/account/*/thread/*
// @include			http://www.thegreysanatomywiki.com/photo/*/thread/*
// @include			http://www.thegreysanatomywiki.com/video/*/thread/*
// @include			http://dexterwiki.sho.com/thread*
// @include			http://dexterwiki.sho.com/forum/*
// @include			http://dexterwiki.sho.com/forum
// @include			http://dexterwiki.sho.com/account/*/thread/*
// @include			http://dexterwiki.sho.com/photo/*/thread/*
// @include			http://dexterwiki.sho.com/video/*/thread/*
// @include			http://www.wikifoundrycentral.com/thread*
// @include			http://www.wikifoundrycentral.com/forum/*
// @include			http://www.wikifoundrycentral.com/forum
// @include			http://www.wikifoundrycentral.com/account/*/thread/*
// @include			http://www.wikifoundrycentral.com/photo/*/thread/*
// @include			http://www.wikifoundrycentral.com/video/*/thread/*
// @include			http://www.warriorcatclans2.com/thread*
// @include			http://www.warriorcatclans2.com/forum/*
// @include			http://www.warriorcatclans2.com/forum
// @include			http://www.warriorcatclans2.com/account/*/thread/*
// @include			http://www.warriorcatclans2.com/photo/*/thread/*
// @include			http://www.warriorcatclans2.com/video/*/thread/*
// ==/UserScript==
// =============================================================================
	
// Don't edit past here unless you know what you're doing.
// *** Original namespace and project: http://files.randomresources.org/projects/untaint
// *** Original description: Reduces the taint. Thanks to the inhabitants of the tsccwiki. Credits: toasty2 and Gu1.
// TinyEditor integration and script adaptation to FF 4+ and Chrome 11+ by: SurfingEagle
// Additional contributions: I.John
// This version is adapted to work with GreaseMonkey 0.9+, Firefox 4+, and Chrome 11+ Not currently tested in IE
// TinyEditor home http://www.scriptiny.com/2010/02/javascript-wysiwyg-editor/  

// Convenient functions
Array.prototype.contains = function(obj){var i = this.length;while(i--){if (this[i] === obj) {return true;}} return false;}

// SE: switch to using localStorage
function putSetting (name, val)
{
	if (name && 'localStorage' in window && window['localStorage'] !== null)
		window.localStorage[name] = val;
}

function getSetting (name, defval)
{
	var val = null;
	if (name && 'localStorage' in window && window['localStorage'] !== null)
		val = window.localStorage[name];
	if (val)
		return val;
	else
		return defval;
}

function deleteSetting (name)
{
	if (name && 'localStorage' in window && window['localStorage'] !== null)
		window.localStorage.removeItem(name);
}

function emptySetting (name)
{
	if (name && 'localStorage' in window && window['localStorage'] !== null)
		window.localStorage[name] = '';
}

/* 
// TBD completion at a later date
if(!GM_setValue)
{
	GM_setValue = function(key,val) {if (window.localStorage) localStorage.setItem(key,val);}
	GM_getValue = function(key) {if (window.localStorage) localStorage.getItem(key);}
}
*/
/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};

// following block handles returning to end of thread after a new post
try {
	if (window['sessionStorage'] !== null)
	{
		var added_post = window.sessionStorage['added_post'];
		if (getSetting('return_on_post', 'true') == 'true' && added_post.length > 0)
		{
			if (added_post == 'scroll_down')
			{
				var doc = document;
				// http://james.padolsey.com/javascript/get-document-height-cross-browser/
				var h = Math.max(
					Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
					Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
					Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
				);
				window.scroll(0, h);
				window.sessionStorage['added_post'] = '';
			}
			else if (added_post == 'jump_end_of_thread')
			{
				var p = getElementsByClassName('paging')[0];
				if (p)
				{
					p = p.lastChild.previousSibling;
					while (p)
					{
						if (p.nodeType == 1 && p.innerHTML != 'Next' && (p.innerHTML == 'Last' || Number(p.innerHTML) <= 5))
						{
							window.sessionStorage['added_post'] = 'scroll_down';
							window.location.href = p.href;
							break;
						}
						p = p.previousSibling;
					}
					if (!p)	window.sessionStorage['added_post'] = '';
				}
				else
					window.sessionStorage['added_post'] = '';
			}
			else
				window.sessionStorage['added_post'] = '';
		} // end if
	} // end if
}
catch (e) {
	if (window['sessionStorage'] !== null) window.sessionStorage['added_post'] = '';
}

// Get Configuration (or set defaults)
var ui_avatar_w = getSetting('ui_avatar_w', '50');
var ui_hide_rater = (getSetting('ui_hide_rater', 'true') == 'true');
var ui_user_filter = getSetting('ui_user_filter', 'ExampleUser1,ExampleUser2');
var refresh_threadlist = Number(getSetting('refresh_threadlist', '0'));
// newest values 
var ui_auto_tinyeditor = (getSetting('ui_auto_tinyeditor', 'true') == 'true');
var ui_show_leftcolumn = (getSetting('ui_show_leftcolumn', 'false') == 'true');
var ui_default_post_font = getSetting('ui_default_post_font', '12px Arial');
var isChrome = /chrome/.test(navigator.userAgent.toLowerCase());

// SE: tiny editor related styles	
GM_addStyle('#input {border:none; margin:0; padding:0; font:12px "Courier New", Verdana; border:0} ' +
	// in te, removed left margin 
	'.te {border:1px solid #bbb; padding:0 1px 1px; font:12px Verdana, Arial;} ' +
	// .te iframe change WYSIWYG background color e.g. background-color:#222222. Effects Chrome but in FF color is overridden by body style setting.
	'.te iframe {border:none; background-color:silver;} ' +
	'.teheader {height:31px; border-bottom:1px solid #bbb; background:url(http://attachments.wetpaintserv.us/xg-mfHLVZfdD7OErlv0NxQ55) repeat-x; padding-top:1px} ' +
	'.teheader select {float:left; margin-top:5px} ' +
	'.tefont {margin-left:5px; width:118px;} ' +
	'.tesize {margin-left:4px; width:42px;} ' +
	'.tecolor {margin-left:4px; width:84px;} ' +
	'.testyle {margin-left:3px; margin-right:12px; width:70px;} ' +
	'.tedivider {float:left; width:2px; height:30px; background:#ccc} ' +
	'.tecontrol {float:left; width:34px; height:30px; cursor:pointer; background-image:url(http://attachments.wetpaintserv.us/jjINLqTU68Po418uA2wLPw18521)} ' +
	'.tecontrol:hover {background-color:#fff; background-position:30px 0} ' +
	'.tefooter {height:32px; border-top:1px solid #bbb; background:#f5f5f5} ' +
	'.toggle {float:left; background:url(http://attachments.wetpaintserv.us/jjINLqTU68Po418uA2wLPw18521) -34px 2px no-repeat; padding:9px 13px 0 31px; height:23px; border-right:1px solid #ccc; cursor:pointer; color:#666} ' +
	'.toggle:hover {background-color:#fff} ' +
	'.resize {float:right; height:32px; width:32px; background:url(http://attachments.wetpaintserv.us/W_Ipj_QMRSXNr7FEg3Sz8A78) 15px 15px no-repeat; cursor:s-resize}');
// #editor change WYSIWYG font color e.g. color:white, color:blue, etc. *** Does not work in Chrome. Chrome defaults to black
GM_addStyle('#editor {cursor:text; margin:10px; color:black; font:'+ui_default_post_font+';}');
// GM_addStyle('#iframe_editor {background-color:dimgray;}');

// SE: the following block "main" is inserted into the page
function main() 
{
	innerGetPostElement = function (idPostNew, idPostEdit) 
	{	
		try
		{
			if (!idPostNew && !idPostEdit) return undefined;
			var i = 0, j = 0;
			var cForms = document.getElementsByName('threadFormElement');
			if (cForms[0]) 
			for (i in cForms)
			{
				if (cForms[i] && cForms[i].parentNode)
				if (cForms[i].name == 'threadFormElement' && cForms[i].style.display == 'block' && cForms[i].parentNode.style.display == 'block')
				{
					if (cForms[i].elements)
					{
						for (j in cForms[i].elements)
						{
							if (cForms[i].elements[j].id == idPostNew)
							{
								return cForms[i].elements[j];
								break;
							}
						}
					}
					break;
				}
			}
			var editElement = document.getElementById(idPostEdit);
			if (editElement && editElement.parentNode.parentNode)
			if (editElement.parentNode.parentNode.style.display == 'block')
				return editElement;
			else
				return undefined;
		}
		catch (e) {
			// alert(e.source + '\n' + e.message);
			return undefined;
		}
	}

	// POSTING TOOLS
	posting_tools = function()
	{
		if (document.getElementById('posting_tools')){return 0;}
		document.getElementById('untaintpanel').innerHTML+=''
		+'<form id="posting_tools"><small><br />'
		+'<input type="button" onclick="posting_add(\'a\');" value="Link" />'
		+'<input type="button" onclick="posting_add(\'img\');" value="Image" />'
		+'<input type="button" onclick="posting_add(\'youtube\');" value="Youtube" />'
		+'<input type="button" onclick="posting_add(\'font\');" value="Font" />'
		+'<br /><input type="text" id="posting_code" onfocus="this.select()" size="27" value="" style="margin-top:3px;" />' 
		+' <input type="button" onclick="activateTinyEditor();" value="TE" />'
		+'</small>'
		+'</form>';
	}

	// Posting tools code generation
	posting_add = function(x)
	{
		var y = ' ';
		if(x=='img')
		{
			y = prompt('Enter Image URL:','http://');
			if (!y) return;
			if (y.search(/wikifoundry.com/i) != -1) // Need to treat wikifoundry URLs differently
				y = y.replace(/\./g,'-').replace('http://','http://tinyurl.com/');
			width = prompt('Image Width:\n\nAuto (image\'s default size), a number (pixels), or a percentage of the page\'s width (e.g. 50%)','auto');
			if (!width) width = 'auto';
			// concept of including image title credited to I.Join
			title = prompt('Image description (Cancel to skip):\n\nA floating popup description dislays when the user\nmoves the mouse cursor over the image.','image');
			if (title) 
				title = 'title="' + title + '"';
			else
				title = '';
			x='<img src="'+ y +'" ' + title + ' width="'+ width +'">';
		}
		if(x=='a'){
			x='<a href="'+ prompt('Link URL:','http://') +'">'+ prompt('Link text:','Link') +'</a>';}
		if(x=='font'){
			ff = prompt('Enter font face:','arial');
			if (!ff) return;
			x='<font face="' + ff + '" size="'+ prompt('Size:\nEnter a number 1-7, a point value (e.g. 12pt), a percentage of the default font (e.g. 200%), or a relative value (e.g. +1 or -1)','-1') +'" color="'+ prompt('Color:','red') +'">'+ prompt('Text:',' ') +'</font>';}
		if(x=='youtube')
		{
			url = prompt('Youtube URL:'+'\n\nE.g. http://www.youtube.com/watch?v=abc123','');
			if (!url) return;
			// http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
			regexp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?feature=player_embedded\&v=)([^#\&\?]*).*/;
			match = url.match(regexp);
			if (match && match[2].length == 11)
			{
				y = match[2];
			} 
			else if (url.length == 11)
			{
				// If just the id is entered, then do a minimal check of the currently accepted length. 
				// Presently, Youtube doesn't guaranty any character set or length of an id
				y = url;
			}
			else
			{
				alert("The URL or Video ID doesn't appear to be valid or is not matchable. Please ensure a correct entry or try another value.");
				return;
			}			
			f = prompt('Scale default resolution between "0" and "2":\n\nE.g. entering "0.25" will make the video one\nquarter the default size, "2" twice the size, "1" no change, etc.','1');
			h = 320;
			w = 405;
			if (f != null && Number(f))
			if (Number(f)>0 && Number(f)<=2)
			{
				h = Math.round(h * Number(f));
				w = Math.round(w * Number(f));
			}
			// Embed tag credit http://m7r-227.wikifoundry.com
			x = '<object height="' + h + '" width="' + w + '">'
				+ '<param name="movie" value="http://wikifoundrytools.com/wiki/m7r-227/widget/unknown/753cf0effa2810b0a844cc48e7032a6c4f58ad09'
				+ '?type=video&image=http://i.ytimg.com/vi/' + y + '/hqdefault.jpg'
				+ '&file=http://ox-proxy.no-ip.org/youtube/' + y + '">'
				+ '<param name="allowFullScreen" value="true"><param name="allowscriptaccess" value="never"><param name="wmode" value="transparent">'
				+ '<embed allowfullscreen="true" src="http://wikifoundrytools.com/wiki/m7r-227/widget/unknown/753cf0effa2810b0a844cc48e7032a6c4f58ad09'
				+ '?type=video&image=http://i.ytimg.com/vi/' + y + '/hqdefault.jpg'
				+ '&file=http://ox-proxy.no-ip.org/youtube/' + y + '" type="application/x-shockwave-flash" wmode="transparent" '
				+ 'height="' + h + '" width="' + w + '"></object>';
		}
		document.getElementById('posting_code').value=x;
		try{innerGetPostElement('threadFormBody','edit_postText').value+=x}catch(e){};
	}

	TINY={};

	function T$(i){return document.getElementById(i)}
	function T$$$(){return document.all?1:0}

	// SE: the modified TinyEditor control
	// Original control: http://www.scriptiny.com/2010/02/javascript-wysiwyg-editor/
	TINY.editor=function(){
		var c=[], offset=-30;
		c['cut']=[1,'Cut','a','cut',1];
		c['copy']=[2,'Copy','a','copy',1];
		c['paste']=[3,'Paste','a','paste',1];
		c['bold']=[4,'Bold','a','bold'];
		c['italic']=[5,'Italic','a','italic'];
		c['underline']=[6,'Underline','a','underline'];
		c['strikethrough']=[7,'Strikethrough','a','strikethrough'];
		c['subscript']=[8,'Subscript','a','subscript'];
		c['superscript']=[9,'Superscript','a','superscript'];
		c['orderedlist']=[10,'Insert Ordered List','a','insertorderedlist'];
		c['unorderedlist']=[11,'Insert Unordered List','a','insertunorderedlist'];
		c['outdent']=[12,'Outdent','a','outdent'];
		c['indent']=[13,'Indent','a','indent'];
		c['leftalign']=[14,'Left Align','a','justifyleft'];
		c['centeralign']=[15,'Center Align','a','justifycenter'];
		c['rightalign']=[16,'Right Align','a','justifyright'];
		c['blockjustify']=[17,'Block Justify','a','justifyfull'];
		c['undo']=[18,'Undo','a','undo'];
		c['redo']=[19,'Redo','a','redo'];
		c['image']=[20,'Insert Image','i','insertimage','Enter Image URL:','http://'];
		c['hr']=[21,'Insert Horizontal Rule','a','inserthorizontalrule'];
		c['link']=[22,'Insert Hyperlink','i','createlink','Enter URL:','http://'];
		c['unlink']=[23,'Remove Hyperlink','a','unlink'];
		c['unformat']=[24,'Remove Formatting','a','removeformat'];
		c['print']=[25,'Print','a','print'];
		// Note: These 3 use the positions in the image used by the other original function with the same index number. 
		// Subscript and Superscript do not work in wikifoundry. If the originals are activated, the image must be redone.
		c['insertyoutube']=[8,'Insert Youtube Video','i','insertyoutube','Youtube URL:',''];
		c['inserttable']=[9,'Insert Table','i','inserttable'];
		c['help']=[25,'Notes','a','help'];
		function edit(n,obj){
			this.n=n; window[n]=this; /* this.t=T$(obj.id); */ this.t=innerGetPostElement('threadFormBody', 'edit_postText'); 
			this.obj=obj; this.xhtml=obj.xhtml;
			var p=document.createElement('div'), w=document.createElement('div'), h=document.createElement('div'),
			l=obj.controls.length, i=0;
			this.i=document.createElement('iframe'); this.i.frameBorder=0; /* added to give id */ this.i.id='iframe_'+obj.bodyid; 
			this.i.width=obj.width||'500'; this.i.height=obj.height||'250'; this.ie=T$$$();
			this.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
			h.className=obj.rowclass||'teheader'; p.className=obj.cssclass||'te'; p.style.width=this.i.width+'px'; p.appendChild(h);
			for(i;i<l;i++){
				var id=obj.controls[i];
				if(id=='n'){
					h=document.createElement('div'); h.className=obj.rowclass||'teheader'; p.appendChild(h)
				}else if(id=='|'){
					var d=document.createElement('div'); d.className=obj.dividerclass||'tedivider'; h.appendChild(d)
				}else if(id=='font'){
					var sel=document.createElement('select'), fonts=obj.fonts||['Verdana','Arial','Georgia'], fl=fonts.length, x=0;
					sel.className='tefont'; sel.onchange=new Function(this.n+'.ddaction(this,"fontname")');
					sel.options[0]=new Option('[Font]','');
					for(x;x<fl;x++){
						var font=fonts[x];
						sel.options[x+1]=new Option(font,font)
					}
					h.appendChild(sel)
				}else if(id=='size'){
					var sel=document.createElement('select'), sizes=obj.sizes||[1,2,3,4,5,6,7,-1,-2], sl=sizes.length, x=0;
					sel.className='tesize'; sel.onchange=new Function(this.n+'.ddaction(this,"fontsize")');
					for(x;x<sl;x++){
						var size=sizes[x];
						sel.options[x]=new Option(size,size)
					}
					h.appendChild(sel)
				}else if(id=='tcolor'){
					// added to allow for text colors
					var sel=document.createElement('select'), tcolors=obj.tcolors||['Black','Gray','Silver','White'], tcl=tcolors.length, x=0;
					sel.className='tecolor'; sel.onchange=new Function(this.n+'.ddaction(this,"forecolor")');
					sel.options[0]=new Option('[Color]','');
					for(x;x<tcl;x++){
						var tcolor=tcolors[x];
						sel.options[x+1]=new Option(tcolor,tcolor)
					}
					h.appendChild(sel)
				}else if(id=='style'){
					var sel=document.createElement('select'),
					styles=obj.styles||[['[Style]',''],['Paragraph','<p>'],['Header 1','<h1>'],['Header 2','<h2>'],['Header 3','<h3>'],['Header 4','<h4>'],['Header 5','<h5>'],['Header 6','<h6>']],
					sl=styles.length, x=0;
					sel.className='testyle'; sel.onchange=new Function(this.n+'.ddaction(this,"formatblock")');
					for(x;x<sl;x++){
						var style=styles[x];
						sel.options[x]=new Option(style[0],style[1])
					}
					h.appendChild(sel)
				}else if(c[id]){
					var div=document.createElement('div'), x=c[id], func=x[2], ex, pos=x[0]*offset;
					div.className=obj.controlclass;
					div.style.backgroundPosition='0px '+pos+'px';
					div.title=x[1];
					ex=func=='a'?'.action("'+x[3]+'",0,'+(x[4]||0)+')':'.insert("'+x[4]+'","'+x[5]+'","'+x[3]+'")';
					div.onclick=new Function(this.n+(id=='print'?'.print()':ex));
					div.onclick=new Function(this.n+(id=='help'?'.help()':ex));
					div.onmouseover=new Function(this.n+'.hover(this,'+pos+',1)');
					div.onmouseout=new Function(this.n+'.hover(this,'+pos+',0)');
					h.appendChild(div);
					if(this.ie){div.unselectable='on'}
				}
			}
			this.t.parentNode.insertBefore(p,this.t); this.t.style.width=this.i.width+'px';
			w.appendChild(this.t); w.appendChild(this.i); p.appendChild(w); this.t.style.display='none';
			if(obj.footer){
				var f=document.createElement('div'); f.className=obj.footerclass||'tefooter';
				if(obj.toggle){
					var to=obj.toggle, ts=document.createElement('div');
					ts.className=to.cssclass||'toggle'; 
					ts.innerHTML=obj.toggletext||'source';
					ts.onclick=new Function(this.n+'.toggle(0,this);return false');
					f.appendChild(ts);
				}
				if(obj.resize){
					var ro=obj.resize, rs=document.createElement('div'); 
					rs.className=ro.cssclass||'resize';
					rs.onmousedown=new Function('event',this.n+'.resize(event);return false');
					rs.onselectstart=function(){return false};
					f.appendChild(rs)
				}
				p.appendChild(f)
			}
			this.e=this.i.contentWindow.document; this.e.open();
			var m='<html><head>', bodyid=obj.bodyid?" id=\""+obj.bodyid+"\"":"";
			if(obj.cssfile){m+='<link rel="stylesheet" href="'+obj.cssfile+'" />'}
			if(obj.css){m+='<style type="text/css">'+obj.css+'</style>'}
			m+='</head><body'+bodyid+'>'+(obj.content||this.t.value);
			m+='</body></html>';
			this.e.write(m);
			this.e.close(); this.e.designMode='on'; /* this.d=1; */
			// wikifoundry pages require custom handling of styleWithCSS
			if(this.xhtml){
				try{this.e.execCommand('styleWithCSS',false,false)}
				catch(e){try{this.e.execCommand('useCSS',0,1)}catch(e){}}
			}
			// auto toggle to initialize an edit in the designer with regular expressions needed on wikifoundry sites.
			this.d=0;
			this.toggle(0, this);
			// added set focus
			this.i.contentWindow.focus();
		}; // end constructor
		
		edit.prototype.print=function(){
			this.i.contentWindow.print()
		},
		// added notes/help
		edit.prototype.help=function(){
			alert('Notes:\n\nThe WYSIWYG editor simulates roughly what a post will look like once posted. The design mode allows for '
			+ 'text, links and images to be edited similarly to a very simple HTML editor. Wikifoundry posts can only handle '
			+ 'simple markup tags. Pressing "source" switches to a purely text mode normally seen when creating a post. '
			+ 'The "source" is what is actually posted but should look similar to what is displayed in design mode once '
			+ 'posted. The "source" can be edited and sent without using the design window. The control is based on the '
			+ 'Tiny Editor modified to work with Wikifoundry and GreaseMonkey.\n\n' 
			+ 'For more info see:\n'
			+ 'http://www.scriptiny.com/2010/02/javascript-wysiwyg-editor/\n\n'
			+ 'Some usage notes: In addition to being able to insert images, images can be dragged and dropped to the window. '
			+ 'But the size will be automatic. Images and text can be used to dynamically create links. Fonts, sizes and colors '
			+ 'can be modified directly in design mode which translate into the post. Links can also be dragged and dropped into '
			+ 'the window. Copying and pasting images will paste the image data directly into the window. Unless the image is very small, the '
			+ 'number of characters will likely be in the thousands and not post. Very small images can, however, still be posted this way.');
			alert('Some issues to be aware of:\n\nThe control is set to stay in a mode of using only simple markup or RTF. '
			+ 'There is some bugginess with this mode, and if it\'s pushed too much, will revert to more complex HTML which is ignored '
			+ 'by Wikifoundry servers. Reverting to HTML is not a major problem, however, as the basic text and images will '
			+ 'generally make it into the post even if some styling is stripped out by the server. In addition, Youtube videos '
			+ 'are placed in a containing iframe to make them a visible object in the designer. Youtube videos will not '
			+ 'display in the designer in Firefox but will post normally as the "source" is what actually gets posted. Youtube videos will, '
			+ 'however, display in the designer in Chrome. The designer, in general, still performs better in Firefox. The server '
			+ 'accepts very simple unformatted tables, and additionally, simple tables have been added which can hold and organize '
			+ 'graphics and text.\n\n'
			+ 'In summary, the control is only designed to handle simple formatting tasks. Switch to "source" in order to more easily straighten '
			+ 'things out if things get too messed up. Automatically loading the control can be turned on or off in the settings.');
		},
		edit.prototype.hover=function(div,pos,dir){
			div.style.backgroundPosition=(dir?'34px ':'0px ')+(pos)+'px'
		},
		edit.prototype.ddaction=function(dd,a){
			var i=dd.selectedIndex, v=dd.options[i].value;
			this.action(a,v)
		},
		edit.prototype.action=function(cmd,val,ie){
			if (!this.d) return;
			if(ie&&!this.ie){
				alert('Your browser does not support this function.')
			}else{
				this.e.execCommand('styleWithCSS',false,false);
				this.e.execCommand(cmd,0,val||null);
			}
		},
		edit.prototype.insert=function(pro,msg,cmd){
			if (!this.d) return;
			if (cmd == 'insertyoutube')
			{
				url = prompt(pro+'\n\nE.g. http://www.youtube.com/watch?v=abc123',msg);
				if (!url) return;
				// http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
				regexp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?feature=player_embedded\&v=)([^#\&\?]*).*/;
				match = url.match(regexp);
				if (match && match[2].length == 11)
				{
					y = match[2];
				} 
				else if (url.length == 11)
				{
					// If just the id is entered, then do a minimal check of the currently accepted length. 
					// Presently, Youtube doesn't guaranty any character set or length of an id
					y = url;
				}
				else
				{
					alert("The URL or Video ID doesn't appear to be valid or is not matchable. Please ensure a correct entry or try another value.");
					return;
				}			
				f = prompt('Scale default resolution between "0" and "2":\n\nE.g. entering "0.25" will make the video one\nquarter the default size, "2" twice the size, "1" no change, etc.','1');
				h = 320;
				w = 405;
				if (f != null && Number(f))
				if (Number(f)>0 && Number(f)<=2)
				{
					h = Math.round(h * Number(f));
					w = Math.round(w * Number(f));
				}
				// Embed tag credit http://m7r-227.wikifoundry.com
				val = '<object height="' + h + '" width="' + w + '">'
					+ '<param name="movie" value="http://wikifoundrytools.com/wiki/m7r-227/widget/unknown/753cf0effa2810b0a844cc48e7032a6c4f58ad09'
					+ '?type=video&image=http://i.ytimg.com/vi/' + y + '/hqdefault.jpg'
					+ '&file=http://ox-proxy.no-ip.org/youtube/' + y + '">'
					+ '<param name="allowFullScreen" value="true"><param name="allowscriptaccess" value="never"><param name="wmode" value="transparent">'
					+ '<embed allowfullscreen="true" src="http://wikifoundrytools.com/wiki/m7r-227/widget/unknown/753cf0effa2810b0a844cc48e7032a6c4f58ad09'
					+ '?type=video&image=http://i.ytimg.com/vi/' + y + '/hqdefault.jpg'
					+ '&file=http://ox-proxy.no-ip.org/youtube/' + y + '" type="application/x-shockwave-flash" wmode="transparent" '
					+ 'height="' + h + '" width="' + w + '"></object>';
				// if not Chrome, wrap the tag in a visible place holder that is stripped out after posting
				if (!this.chrome)
					val = '<iframe src="http://i.ytimg.com/vi/' + y + '/hqdefault.jpg" scrolling="no" marginwidth="0" height="' + h + '" width="' + w + '">' 
					+ val + '</iframe>';
				val += '<br><a href="http://youtu.be/' + y + '">' + 'http://youtu.be/' + y + '</a><br><br>';
				cmd = 'inserthtml';
			}
			else if (cmd == 'insertimage')
			{
				y = prompt(pro,msg);
				if (!y) return;
				if (y.search(/wikifoundry.com/i) != -1) // Need to treat wikifoundry URLs differently
					y = y.replace(/\./g,'-').replace('http://','http://tinyurl.com/');
				width = prompt('Image Width:\n\nAuto (image\'s default size), a number (pixels), or a percentage of the page\'s width (e.g. 50%)','auto');
				if (!width) width = 'auto';
				// concept of including image title credited to I.Join
				title = prompt('Image description (Cancel to skip):\n\nA floating popup description dislays when the user\nmoves the mouse cursor over the image.','image');
				if (title) 
					title = 'title="' + title + '"';
				else
					title = '';
				val='<img src="'+ y +'" ' + title + ' width="'+ width +'">';
				cmd = 'inserthtml';
			}
			else if (cmd == 'inserttable')
			{
				rowstext = prompt("Enter rows:");
				colstext = prompt("Enter cols:");
				rows = parseInt(rowstext);
				cols = parseInt(colstext);
				if ((rows > 0) && (cols > 0)) 
				{
					div = document.createElement("div");
					table = document.createElement("table");
					table.setAttribute("border", "1");
					table.setAttribute("cellpadding", "5");
					table.setAttribute("cellspacing", "2");
					tbody = document.createElement("tbody");
					for (var i=0; i < rows; i++) 
					{
						tr = document.createElement("tr");
						for (var j=0; j < cols; j++) 
						{
						  td = document.createElement("td");
						  br = document.createElement("br");
						  td.appendChild(br);
						  tr.appendChild(td);
						}
						tbody.appendChild(tr);
					}
					table.appendChild(tbody);
					div.appendChild(table);
					val = div.innerHTML;
					cmd = 'inserthtml';
				}
				else return;
			}
			else val=prompt(pro,msg);
				
			if(val!=null&&val!='')
			{
				// use styleWithCSS
				this.e.execCommand('styleWithCSS',false,false);
				this.e.execCommand(cmd,0,val);
			}
		},
		edit.prototype.setfont=function(){
			if (!this.d) return;
			// use styleWithCSS
			this.e.execCommand('styleWithCSS',false,false);
			execCommand('formatblock',0,hType);
		},
		edit.prototype.resize=function(e){
			if(this.mv){this.freeze()}
			this.i.bcs=TINY.cursor.top(e);
			this.mv=new Function('event',this.n+'.move(event)');
			this.sr=new Function(this.n+'.freeze()');
			if(this.ie){
				document.attachEvent('onmousemove',this.mv); document.attachEvent('onmouseup',this.sr)
			}else{
				document.addEventListener('mousemove',this.mv,1); document.addEventListener('mouseup',this.sr,1)
			}
		},
		edit.prototype.move=function(e){
			var pos=TINY.cursor.top(e);
			this.i.height=parseInt(this.i.height)+pos-this.i.bcs;
			this.i.bcs=pos
		},
		edit.prototype.freeze=function(){
			if(this.ie){
				document.detachEvent('onmousemove',this.mv); document.detachEvent('onmouseup',this.sr);
				// store height
				putSetting('ui_textarea_height', this.i.height)
			}else{
				document.removeEventListener('mousemove',this.mv,1); document.removeEventListener('mouseup',this.sr,1)
				// store height
				putSetting('ui_textarea_height', this.i.height)
			}
		},
		edit.prototype.toggle=function(post,div){
			if(!this.d)
			{
				// From source to wysiwyg
				var v=this.t.value;
				if(div){div.innerHTML=this.obj.toggletext||'source'}

				// wikifoundry specific replacements
				v=v.replace(/\n/gi,'<br />');
				// v=v.replace(/<strong>(.*?)<\/strong>/gi,'<b>$1</b>');
				// v=v.replace(/<em>(.*?)<\/em>/gi,'<i>$1</i>')
				// v=v.replace(/<span style="font-weight: bold;?">(.*)<\/span>/gi,'<b>$1</b>');
				// v=v.replace(/<span style="font-style: italic;?">(.*)<\/span>/gi,'<i>$1</i>');
				// v=v.replace(/<span style="font-weight: bold;?">(.*)<\/span>|<b\b[^>]*>(.*?)<\/b[^>]*>/gi,'<b>$1</b>');
				if(this.xhtml&&!this.ie){
					// v=v.replace(/<strong>(.*)<\/strong>/gi,'<span style="font-weight: bold;">$1</span>');
					// v=v.replace(/<em>(.*)<\/em>/gi,'<span style="font-weight: italic;">$1</span>')
				}
				this.e.body.innerHTML=v;
				this.t.style.display='none'; this.i.style.display='block'; this.d=1;
			}
			else
			{
				// From wysiwyg to source
				var v=this.e.body.innerHTML;
				
				// wikifoundry specific replacements
				v=v.replace(/&nbsp;/gi,' ');
				v=v.replace(/&amp;/gi,'&');
				v=v.replace(/&lt;/gi,'<');
				v=v.replace(/&gt;/gi,'>');
				v=v.replace(/&quot;/gi,'"');
				v=v.replace(/&#0?39;/g,'\'');
				// Strip out unusable attributes in certain tags
				v=v.replace(/(<(?:img|font|div|table|tbody|t[rd]|b|u|i|h[2-4]|ol|ul|li|blockquote)\s.*?)(?:class=".*?"\s?)(.*?>)/gi,'$1$2');
				v=v.replace(/(<(?:img|a|font|div|table|tbody|t[rd]|b|u|i|h[2-4]|ol|ul|li|blockquote)\s.*?)(?:id=".*?"\s?)(.*?>)/gi,'$1$2');
				v=v.replace(/(<(?:img|a)\s.*?)(?:name=".*?"\s?)(.*?>)/gi,'$1$2');
				if (this.chrome)
				{
					v=v.replace(/style="text-align:\s?(.*?);?"/gi,'align="$1"');
					v=v.replace(/<div\s*?>\s*?<br\s*?\/?\s*?>\s*?<\/div\s*?>/gi,'\n');
				}
				v=v.replace(/style="width: ?(.*?)px; ?height: ?(.*?)px;?"/gi,'width="$1" height="$2"');
				v=v.replace(/<br\s*?\/?\s*?>/gi,'\n');
				v=v.replace(/<strong>(.*?)<\/strong>/gi,'<b>$1</b>');
				v=v.replace(/<em>(.*?)<\/em>/gi,'<i>$1</i>')
				v=v.replace(/<a href="(.*?)">(.*?)<\/a>/gi,'<a class="external" href="$1" rel="nofollow" target="_blank">$2</a>');
				v=v.replace(/<span style="font-weight: bold;?">(.*)<\/span>/gi,'<b>$1</b>');
				v=v.replace(/<span style="font-style: italic;?">(.*)<\/span>/gi,'<i>$1</i>');
				// Attempt to strip out any remaining unusable tags
				v=v.replace(/<\/?(?:\!DOCTYPE|abbr|acronym|address|applet|area|base|basefont|bdo|big|body|button|caption|center|cite|code|col|colgroup|dd|del|dfn|dir|dl|dt|em|fieldset|form|frame|frameset|head|h1|h5|h6|hr|html|input|ins|kbd|label|legend|link|map|menu|meta|noframes|noscript|optgroup|option|p|pre|q|s|samp|script|select|small|span|strike|strong|style|sub|sup|textarea|tfoot|th|thead|title|tt|var)(?:>|\s.*?>)/gi,'');
				// Attempt to strip out the unusable style attribute in any remaining usable tags
				v=v.replace(/(<(?:img|a|font|div|table|tbody|t[rd]|b|u|i|h[2-4]|ol|ul|li|blockquote)\s.*?)(?:style=".*?"\s?)(.*?>)/gi,'$1$2');

				if(this.xhtml){
					// v=v.replace(/<span class="apple-style-span">(.*)<\/span>/gi,'$1');
					// v=v.replace(/ class="apple-style-span"/gi,'');
					// v=v.replace(/<span style="">/gi,'');
					// v=v.replace(/<br>/gi,'<br />');
					// v=v.replace(/<br ?\/?>$/gi,'');
					// v=v.replace(/^<br ?\/?>/gi,'');
					// v=v.replace(/(<img [^>]+[^\/])>/gi,'$1 />');
					// v=v.replace(/<b\b[^>]*>(.*?)<\/b[^>]*>/gi,'<strong>$1</strong>');
					// v=v.replace(/<i\b[^>]*>(.*?)<\/i[^>]*>/gi,'<em>$1</em>');
					// v=v.replace(/<u\b[^>]*>(.*?)<\/u[^>]*>/gi,'<span style="text-decoration:underline">$1</span>');
					// v=v.replace(/<(b|strong|em|i|u) style="font-weight: normal;?">(.*)<\/(b|strong|em|i|u)>/gi,'$2');
					// v=v.replace(/<(b|strong|em|i|u) style="(.*)">(.*)<\/(b|strong|em|i|u)>/gi,'<span style="$2"><$4>$3</$4></span>');
					// v=v.replace(/<span style="font-weight: normal;?">(.*)<\/span>/gi,'$1');
					// v=v.replace(/<span style="font-weight: bold;?">(.*)<\/span>/gi,'<strong>$1</strong>');
					// v=v.replace(/<span style="font-style: italic;?">(.*)<\/span>/gi,'<em>$1</em>');
					// v=v.replace(/<span style="font-weight: bold;?">(.*)<\/span>|<b\b[^>]*>(.*?)<\/b[^>]*>/gi,'<strong>$1</strong>')
				}
				if(div){div.innerHTML=this.obj.toggletext||'wysiwyg'}
				this.t.value=v;
				if(!post){
					this.t.style.height=this.i.height+'px';
					this.i.style.display='none'; this.t.style.display='block'; this.d=0
				}
			}
		},
		edit.prototype.post=function(){
			this.e.execCommand('styleWithCSS',false,false);
			if(this.d){this.toggle(1)}
		};
		return{edit:edit}
	}();

	TINY.cursor=function(){
		return{
			top:function(e){
				return T$$$()?window.event.clientY+document.documentElement.scrollTop+document.body.scrollTop:e.clientY+window.scrollY
			}
		}
	}();
	
	decodeHTML = function(a) {return a.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;/g, '\'');}
	newlinesToUnicode = function(a) {return a.replace(/<br\s*\/?>/gi,"\n");}

	// Corresponds to original processing when editing a post, originally coded by Gu1.
	loadOriginalPost = function(e) 
	{
		var textNode = e.parentNode.parentNode.childNodes[5];
		var postText = document.getElementById('edit_postText');
		var postQuote = document.getElementById('edit_postQuote');
		
		setTimeout(function() { // please god forgive me for this ugly piece of code
			if(document.getElementById('postEditor').style.display == 'block')
			{
				var A = textNode.cloneNode(true);
				var B;
				var C = A.firstChild;
				
				while(C)
				{
					B = C.nextSibling;
					if(C.nodeName.toUpperCase() === "BLOCKQUOTE")
					{
						postQuote.value = C.innerHTML.replace(/^"|"$/g, '');
						postQuote.value = decodeHTML(newlinesToUnicode(postQuote.value));
						A.removeChild(C);
						break;
					}
					C=B;
				}
				postText.value = decodeHTML(newlinesToUnicode(A.innerHTML));
			}
		}, 50); // we wait 50ms before executing
	}
	
	var tinyEditor = null;
	
	postSubmitted = function(elem)
	{
		if (tinyEditor) tinyEditor.post();
		if (getSetting('return_on_post', 'true') == 'true' && elem.id == 'threadFormSubmitButton' && window['sessionStorage'] !== null)
		if (document.getElementsByClassName('paging')[0]) 
			window.sessionStorage['added_post'] = 'jump_end_of_thread';
		else
			window.sessionStorage['added_post'] = 'scroll_down';
	}
	
	cancelPost = function(){window.location.reload()}
	
	loadInitialize = function(nCount)
	{
		if (nCount > 10) return;
		var textElement = innerGetPostElement('threadFormBody', 'edit_postText');
		// if text area loaded and visible
		if (textElement)
		{
			if (getSetting('ui_uncheck_watch_this_thread', 'true') == 'true')
			{
				elem = innerGetPostElement('notifyMeCbx','');
				if (elem) elem.checked = false;
			}
			
			textElement.style.font = getSetting('ui_default_post_font', '12px Arial');
			
			// Critical part of unrestricted posting first added by Gu1
			XMLHttpRequest.prototype.origsend = XMLHttpRequest.prototype.send;
			XMLHttpRequest.prototype.send = function(input)
			{	
				
				if(input == null)
				{
					return this.origsend();
				}
				
				if(input.substr != undefined && input.substr(0, 20) == "<thread><posts><post") // are we posting a new post ?
				{
					// Use [\s\S]* instead of .* because the dot doesnt match new lines and there is no "DOTALL" flag
					var regex = new Array();
					// Regular expression, to match valid tags, modified to fix issue that sometimes occurs with nested tags. In input, \n is already replaced with <br> or <br />
					regex[0] = /&lt;\/?(?:img|a|font|div|table|tbody|t[rd]|object|param|b|u|i|embed|h[2-4]|ol|ul|li|blockquote)(?:&gt;|\s[\s\S]*?&gt;)/gi;
					// HTML tags that should be stripped out because they can not be used.
					regex[1] = /&lt;\/?(?:\!DOCTYPE|abbr|acronym|address|applet|area|base|basefont|bdo|big|body|button|caption|center|cite|code|col|colgroup|dd|del|dfn|dir|dl|dt|em|fieldset|form|frame|frameset|head|h1|h5|h6|hr|html|iframe|input|ins|kbd|label|legend|link|map|menu|meta|noframes|noscript|optgroup|option|p|pre|q|s|samp|script|select|small|span|strike|strong|style|sub|sup|textarea|tfoot|th|thead|title|tt|var)(?:&gt;|\s[\s\S]*?&gt;)/gi;
					
					var docu = (new DOMParser).parseFromString(input, "text/xml"); // the data as an XMLDocument object
					var text = docu.getElementsByTagName('text');
					if(text.length == 1) // to avoid an error if the text element doesnt exist
					{
						text = text[0].firstChild;
						// see "decodeHTML" in www.js
						// Strip out unusable tags
						text.nodeValue = text.nodeValue.replace(regex[1], '');
						// Decode usable tags
						text.nodeValue = text.nodeValue.replace(regex[0], function(i){return decodeHTML(i)});
						input = (new XMLSerializer()).serializeToString(docu);
					}
				}
				return this.origsend(input); // calling the real method
			} // end send

			var postBtn = innerGetPostElement('threadFormSubmitButton', 'edit_postSubmit');
			if (postBtn) {
				postBtn.addEventListener('mousedown', function(){postSubmitted(this)}, false);
				postBtn.disabled = false;
			}
			postBtn = innerGetPostElement('closeThreadButton', 'edit_postCancel');
			if (postBtn) {
				postBtn.addEventListener('click', cancelPost, false);
			}

			if (getSetting('ui_auto_tinyeditor', 'true') == 'true') activateTinyEditor();

			return;
		}
		else
		{
			nCount++;
			setTimeout("loadInitialize("+nCount+")", 100);
		}
	}
	
	activateTinyEditor = function()
	{
		var teFrame = document.getElementById('iframe_editor');
		if (!teFrame)
		{
			tinyEditor = new TINY.editor.edit('editor',{
			id:'',
			width:"98%",
			height:getSetting('ui_textarea_height', '200'),
			cssclass:'te',
			controlclass:'tecontrol',
			rowclass:'teheader',
			dividerclass:'tedivider',
			controls:['bold','italic','underline','|','leftalign','centeralign','rightalign','blockjustify','|','link','unlink','image','insertyoutube','inserttable','|','orderedlist','unorderedlist','n',
					  'font','size','tcolor','style','|','undo','redo','|','unformat','|','help'],
			footer:true,
			fonts:['Arial','Arial Black','Comic Sans MS','Courier','Courier New','Cursive','Garamond','Georgia','Helvetica','Impact','Monospace','Sans-Serif','Serif','Times','Verdana'],
			tcolors:['Black','Gray','Silver','White','Pink','HotPink','LightCoral','Tomato','Crimson','Red','FireBrick','Maroon','OrangeRed','Orange','Yellow','Gold','Olive','Lime','Green','Cyan','Teal','Blue','Navy','Magenta','Purple'],
			styles:[['[Style]',''],['Header 2','<h2>'],['Header 3','<h3>'],['Header 4','<h4>']],
			xhtml:false,
			bodyid:'editor',
			footerclass:'tefooter',
			toggle:{text:'source',activetext:'wysiwyg',cssclass:'toggle'},
			resize:{cssclass:'resize'}
			});
		} // end if
		
		// Seems to be the way with the least bugginess to use RTF. 
		teFrame = document.getElementById('iframe_editor'); // if editor just created
		if (!teFrame) teFrame.contentWindow.document.execCommand('styleWithCSS', false, false);
	} // end activateTinyEditor
} // end main

// SE: function finds and returns an element in a new post or edit
getPostElement = function(idPostNew, idPostEdit) 
{	
	try
	{
		// Find the area the user is actually using.
		if (!idPostNew && !idPostEdit) return undefined;
		var i = 0, j = 0;
		var cForms = document.getElementsByName('threadFormElement');
		if (cForms[0]) 
		for (i in cForms)
		{
			// Find the correct form, style and parent div with a visible style. This only occurs on a new post
			if (cForms[i] && cForms[i].parentNode)
			if (cForms[i].name == 'threadFormElement' && cForms[i].style.display == 'block' && cForms[i].parentNode.style.display == 'block')
			{
				if (cForms[i].elements)
				{
					// find the specified element in the form
					for (j in cForms[i].elements)
					{
						if (cForms[i].elements[j].id == idPostNew)
						{
							return cForms[i].elements[j];
							break;
						} // end if
					} // end for
				
				}
				break;
			} // end if
		} // end for
		// Post is an edit
		var elemPost = document.getElementById(idPostEdit);
		// Check again to make sure the div parent is visible
		if (elemPost && elemPost.parentNode.parentNode)
		if (elemPost.parentNode.parentNode.style.display == 'block')
			return elemPost;
		else
			return undefined;
	}
	catch (e) {
		// GM_log(e.source + '\n' + e.message);
		// alert(e.source + '\n' + e.message);
		return undefined;
	} // end try catch
}

// Separate config from main so that settings can be set on any page but still referenced by functions in main
function config()
{ 
	putSetting = function(name, val)
	{
		if (name && 'localStorage' in window && window['localStorage'] !== null)
			window.localStorage[name] = val;
	}

	getSetting = function(name, defval)
	{
		var val = null;
		if (name && 'localStorage' in window && window['localStorage'] !== null)
			val = window.localStorage[name];
		if (val)
			return val;
		else
			return defval;
	}

	// CONFIGURATION
	// Configuration Panel
	cfg_show = function()
	{
		if(document.getElementById('cfg')){return 0;}
		document.body.innerHTML += '<div style="width:350px;margin:15px auto 15px auto;background-color:black;color:white;"><form id="cfg" name="cfg">'
		+'<fieldset><legend>UnTaint Settings</legend><small>'
		+'<input name="ui_avatar_w" id="ui_avatar_w" type="text" size="2" /> Avatar width (pixels)<br /><br />'
		+'<input name="ui_hide_rater" id="ui_hide_rater" type="checkbox" /> Hide \'Do you find this valuable?\'<br />'
		// added ui_show_leftcolumn. The option to allow for the left navigation bar to remain 
		+'<input name="ui_show_leftcolumn" id="ui_show_leftcolumn" type="checkbox" /> Show left navigation<br />'
		// added ui_auto_tinyeditor.
		+'<input name="ui_auto_tinyeditor" id="ui_auto_tinyeditor" type="checkbox" /> Auto load WYSIWYG (\'off\' restores older tools)<br />'
		// added ui_uncheck_watch_this_thread.
		+'<input name="ui_uncheck_watch_this_thread" id="ui_uncheck_watch_this_thread" type="checkbox" /> Auto uncheck \'watch this thread\'<br />'
		// added return_on_post.
		+'<input name="return_on_post" id="return_on_post" type="checkbox" /> On new post, auto jump to end of thread<br /><br />'
		+'Default editing font:<br />'
		// added ui_default_post_font.
		+'<input type="text" name="ui_default_post_font" id="ui_default_post_font" /><br /><br />'
		+'Filter users\' posts:<br />'
		+'<textarea name="ui_user_filter" id="ui_user_filter" cols="40" rows="2" ></textarea><br />'
		+'<small>Note: Names must be exact and separated by commas.</small><br /><br />'
		+'<input name="refresh_threadlist" id="refresh_threadlist" type="text" size="2" /> Thread list reload interval <small>(in seconds; 0 to disable)</small><br />'
		+'<center><button type="button" onclick="cfg_save();window.location.reload();">Save</button></center>'
		+'</small></fieldset></form></div>';

		document.getElementById('ui_avatar_w').value = getSetting('ui_avatar_w', '50');
		document.getElementById('ui_hide_rater').checked = (getSetting('ui_hide_rater', 'true') == 'true');
		document.getElementById('ui_user_filter').value = getSetting('ui_user_filter', '');
		document.getElementById('refresh_threadlist').value = getSetting('refresh_threadlist', '0');
		// newer values 
		document.getElementById('ui_show_leftcolumn').checked = (getSetting('ui_show_leftcolumn', 'false') == 'true');
		document.getElementById('ui_auto_tinyeditor').checked = (getSetting('ui_auto_tinyeditor', 'true') == 'true');
		document.getElementById('ui_uncheck_watch_this_thread').checked = (getSetting('ui_uncheck_watch_this_thread', 'true') == 'true');
		document.getElementById('ui_default_post_font').value = getSetting('ui_default_post_font', '12px Arial');
		document.getElementById('return_on_post').checked = (getSetting('return_on_post', 'true') == 'true');
	}

	// Save Configuration
	cfg_save = function()
	{
		putSetting('ui_user_filter', document.getElementById('ui_user_filter').value.replace(', ',',').replace('\n',''));
		putSetting('ui_avatar_w', document.getElementById('ui_avatar_w').value);
		putSetting('ui_hide_rater', document.getElementById('ui_hide_rater').checked);
		putSetting('refresh_threadlist', document.getElementById('refresh_threadlist').value);
		// newer values 
		putSetting('ui_show_leftcolumn', document.getElementById('ui_show_leftcolumn').checked);
		putSetting('ui_auto_tinyeditor', document.getElementById('ui_auto_tinyeditor').checked);
		putSetting('ui_uncheck_watch_this_thread', document.getElementById('ui_uncheck_watch_this_thread').checked);
		putSetting('ui_default_post_font', document.getElementById('ui_default_post_font').value);
		putSetting('return_on_post', document.getElementById('return_on_post').checked);
	}
} // end config

try 
{
	// Always add setting funtions to page
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.appendChild(document.createTextNode('('+ config +')();'));
	if (document.head) document.head.appendChild(script);	
	// Add posting tools when they're relevant
	var reply = getElementsByClassName('threadModify');
	if (reply[0])
	{
		// SE: add 'main' to page when needed
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.appendChild(document.createTextNode('('+ main +')();'));
		if (document.head) document.head.appendChild(script);
		var eventFunctions = 'loadInitialize(0);' + (ui_auto_tinyeditor ? '' : 'posting_tools();');
		for (i in reply)
		{
			// SE: loadInitialize() is critical to the post filter
			if (reply[i].hasAttributes) 
			{
				if (reply[i].innerHTML.search('WPC-action_editThreadPost') >= 0)
						reply[i].setAttribute('onclick', 'loadOriginalPost(this);' + eventFunctions);
				else if (reply[i].innerHTML.search('WPC-action_deleteThread') < 0) 
						reply[i].setAttribute('onclick', eventFunctions);
			}
		}
	}
}
catch (e) 
{
	// alert(e.source + '\n' + e.message);
}

// User posts filter
// Modified "for loops" by I.Join to function in FF 4.x 
try
{
	if (document.getElementById('threadList'))
	{
		var td = document.getElementById('threadList').getElementsByTagName('td');
		for(var a = 0; a < td.length; a++)	// for (var a in  td)
		{
			if (td[a].getElementsByTagName('a'))
			{
				var td2 = td[a].getElementsByTagName('a');
				for(var b = 0; b < td2.length; b++)	// for (var b in td2)
				{
					if (b == 2 && td2[b].innerHTML && ui_user_filter.split(',').contains(td2[b].innerHTML))
					{
						var tr = td2[2].parentNode.parentNode;
						tr.setAttribute('title', tr.getElementsByClassName('WPC-action')[1].innerHTML+': \n'+tr.getElementsByClassName('threadText')[0].innerHTML);
						tr.innerHTML = '<td style="background-color:firebrick;border:1px solid maroon;border-right-width:0;"></td><td style="background-color:firebrick;border:1px solid maroon;border-left-width:0;"></td>';
					}
				}
			}
		}
	}
}
catch (e)
{
	// alert(e.source + '\n' + e.message);
}

// SE: Added a show left navigation bar option for those who want to add new pages and/or use the navigation bar.
if(ui_show_leftcolumn)
	// Show navigation and narrow page
	GM_addStyle('#leftColumn {margin-top:1px;}')
else
	// Hide navigation/Widen page to the entire screen
	GM_addStyle('#outer {padding-left:0 !important;}');
	
// ======== AESTHETIC CHANGES ========
GM_addStyle('#userBrand, #gNav, #gnMain, #gnAccount{height:20px !important; line-height:20px !important;}');
GM_addStyle('#pageContentInner{min-height:400px !important;padding-bottom:0;}');
// Set background color from black to silver to make it more generic for all sites. This also effects the background color in design mode in FF but not in Chrome
GM_addStyle('#footer{display:none !important;} body{background-color:silver !important;} #WPC-bodyContentContainer{margin-bottom:-50px !important;}');
GM_addStyle('#relatedContent{font-size:80% !important;} #pageContentInner{padding-bottom:0 !important;}');
GM_addStyle('#gnPromoLinks {display:none;}'); // Hide search area

// Modify Nav-Bar:
// SE: fan chat restored for tscc wiki only
if (document.getElementById('gnMain'))
{
	var menu = document.getElementById('gnMain');
	m1 = document.createElement('li');
	m1.innerHTML = '<span><a href="/thread">Threads</a></span>';
	menu.insertBefore(m1, menu.childNodes[2]);
	if (/tsccwiki.wikifoundry/i.test(window.location.host))
	{
		m2 = document.createElement('li');
		m2.innerHTML = '<span><a href="http://tsccwiki.wikifoundry.com/page/TSCC+Fan+Chat">Fan Chat</a></span>';
		menu.appendChild(m2);
	}
}

// Hide "Do you find this valuable?"
if(ui_hide_rater)
{
	GM_addStyle('.threadRater{display:none !important;}');
}
// Enlarge Avatars
GM_addStyle('img.imageSm{width:'+ui_avatar_w+'px;}');
// Remove Ads for those without Adblock+
GM_addStyle('#adsTop, .ads{display:none !important;}')

// Auto-refresh for Thread list
// SE: stripped the domain back to .com to accommodate custom wiki names and 
// added $/m as it wasn't always evaluating to true when "thread" at eol
if (window.location.href.search(/\.com\/thread($|[^\/])/mi) >= 0 && refresh_threadlist > 0) // Auto refresh
	setTimeout(function(){window.location.reload()}, refresh_threadlist*1000);
 
// Untaint Panel
try {var pages = (getElementsByClassName('paging')[0]) ? getElementsByClassName('paging')[0].innerHTML : ''; /* Page #'s */ } 
catch (e) {/* alert(e.source + '\n' + e.message) */}

var panelsTemp = null;
try {
	panelsTemp = document.getElementById('siteHeader');
	if (panelsTemp)
		panelsTemp.innerHTML+='<a name="top"></a>';
}
catch (e) {
	// alert(e.source + '\n' + e.message);
}

try {
	// SE: changed element from allContentInner to pageContentInner.
	panelsTemp = document.getElementById('pageContentInner');
	if (panelsTemp)
		panelsTemp.innerHTML+='<a name="bottom"></a>'
		+'<div style="position:fixed;top:25px;right:6px;width:200px;background:black;color:white;font-size:80%;border:1px solid white;padding:4px;" id="untaintpanel"></div>';
}
catch (e) {
	// alert(e.source + '\n' + e.message);
}

try {
	var utpanel = document.getElementById('untaintpanel'); 
	if (utpanel)
	{
		// SE: Chrome is not responding to href="#bottom" needs window.scroll(0,document.height).
		utpanel.innerHTML=''
		+'<b>UnTaint | <small><sup><a href="#bottom" onclick="cfg_show();'+(isChrome ? 'setTimeout(function(){window.scroll(0,document.height)},100);':'')+'">Settings</a></sup></small></b><small>'
		+'<div style="float:right;padding-right:5px;padding-top:2px;"><a href="#top">Top</a><br /><a href="#bottom"'+(isChrome ? ' onclick="window.scroll(0,document.height);"':'')+'>Bottom</a></div>'
		+'<br /><form method="get" action="http://google.com/search" style="display:inline;"><input type="text" name="q" size="18" maxlength="255" /><input type="hidden" name="sitesearch" value="'+window.location.host+'" /> <input type="submit" value="Search" /></form><br />'
		+'<hr style="border-color:black;margin:1px;" />'
		+'<form style="display:inline;"><input size="18" name="num" id="num" /> <input type="button" value="To Page" onclick="javascript:window.location=\'?offset=\'+(parseInt(document.getElementById(\'num\').value)*20-20).toString()+\'&maxResults=20\';" /></form><br />'
		+'<b><center style="margin-top:4px;margin-bottom:2px;">'+pages+'</center></b></small>'
		utpanel.innerHTML = utpanel.innerHTML.replace('Previous','Prev'); 
	}
}
catch (e) {
	// alert(e.source + '\n' + e.message);
}

try {
	panelsTemp = document.getElementById('gnSearch');
	if (panelsTemp)
		panelsTemp.innerHTML='<small>'+panelsTemp.innerHTML+'</small>';
}
catch (e) {
	// alert(e.source + '\n' + e.message);
}
