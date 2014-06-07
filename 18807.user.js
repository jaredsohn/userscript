// ==UserScript==
// @name fix google services and docs
// @author Joao Eiras and Jesus Perez (Chuso)
// @version 20080102
// @namespace http://userjs.org/
// @ujs:category site: fixes
// @ujs:documentation http://chuso.net/?id=68
// @ujs:download http://chuso.net/software/opera/userjs/fix-google-services-and-docs.js
// @include http://www.writely.com/*
// @include https://www.writely.com/*
// @include http://docs.google.com/*
// @include https://docs.google.com/*
// @include http://*.spreadsheets.google.com/*
// @include https://*.spreadsheets.google.com/*
// @include http://spreadsheets.google.com/*
// @include https://spreadsheets.google.com/*
// @include http://www.google.com/calendar*
// @include https://www.google.com/calendar*
// @include http://picasaweb.google.com/*
// @include https://picasaweb.google.com/*
// ==/UserScript==

/*

This script was originally developed by Joao Eiras and modified by Jesus Perez
(Chuso).
Lines added by Chuso are 21-28, 34-37 and 143-168
Also commented lines 80-82 since masking as IE throws errors
Original script is available here:
  http://my.opera.com/xErath/blog/2007/01/02/the-world-through-a-google
Modified version here:
  http://chuso.net/?id=68

History:
* Opera bug
+ Google bug

02-01-2008
 - docs
   ? workaround for constatly reloading

14-03-2007
 - docs
   * fix email form (234353)
   
27-02-2007
 - docs
   * fix aesthetic problem with :hover in icons on the left, in the documents table (254038)
 - picassa
   * fix "Order prints" button (tag soup problem) (244050)

17-02-2007
 - spreadsheets:
   * override problem with eval (247798)
   
16-02-2007 and before
 - spreadsheets:
   + warn user of improper browser id
   + give Opera the proper pngs background
   + textarea's cosmetic fixes
   + support IE fireEvent. prevents errors. they check for it always
   * fix for mousewheel going wrongwards (199895)
 - calendar:
   + prevent incompatible browser warning
   * make date popups work on create event (229475)
   + remove horizontal scrollbar from the schedule
 - picasa:
   + prevent bad browser sniffing (the source of all problems)
   + override unwanted event capture. thanks Gecko (https://bugzilla.mozilla.org/show_bug.cgi?id=235441)
 - docs:
   + prevent browser being blocked
   * prevent document from scrolling up when document is saved or restored (244762)
   * fix for scrollLeft and scrollTop on inlines (165620)
   + prevent an alert without text when removing formatting
   + remove support for document.selection, the source of many formatting problems
   * override insertHTML command to work with an empty element (238486)
   + monospaced font for html editing
   * fix for top links bar width (252770)
*/
(function( opera ){
	var hostname = location.hostname;
	var pathname = location.pathname;
	if( hostname.indexOf("spreadsheets")>=0 ){
/*		if( navigator.userAgent.indexOf("Opera") >=0 )
			window.alert( "This website is blocking your web browser. To prevent further annoyances, right-click the page, choose 'Edit Site "+
				"Preferences', go to the Network tab, and select 'Mask as Internet Explorer'. Then refresh the page.");*/
		//spreasheets only works when masked as IE (probably they use capturing event listeners)
		//but then it uses filters to render transparent pngs.

		window.navigator.userAgent='msie';
		addCssToDocument(
			'div.dlgAlert,div.dlgOpen{background-image:url(http://www.google.com/images/spreadsheets/openDlgBack.png)!important}'+
			'#modalDialogBackground{background-image:url(http://www.google.com/images/spreadsheets/modalDlgBack.png)!important}'+
			'textarea{font-family:Arial,inherit!important;background-color:white!important;overflow:hidden!important}html{position:fixed}'
		);
		
		opera.addEventListener('BeforeEventListener.mousewheel',function(e){
			var newe = cloneObject(e.event);
			newe.wheelDelta = -newe.wheelDelta;
			e.preventDefault();
			e.listener.call(e.event.currentTarget,newe);
		},false);
		Node.prototype.fireEvent = function(type){
			var ev = this.ownerDocument.createEvent('MouseEvent');
			ev.initMouseEvent(type,true,true,this.ownerDocument.defaultView||window,0,0,0,0,0,false,false,false,false,0,0);
			this.dispatchEvent(ev);
		};
		opera.addEventListener('BeforeScript',function(e){
			var m = /(\w+)=eval\b/.exec(e.element.text);
			if( m && m[1] ){
				e.element.text = e.element.text.replace(new RegExp('(\\b)'+m[1]+'(\\b)','g'),'$1eval$2');
				opera.removeEventListener('BeforeScript',arguments.callee,false);	
			}
		},false);
	}
	else if( pathname.indexOf("calendar/render")>=0 ){
	
		opera.addEventListener('BeforeScript',function(e){
			e.element.text=e.element.text.replace("'mozilla'","' '");
			opera.removeEventListener('BeforeScript',arguments.callee,false);
		},false);
			
		//fix create event date popups
		opera.addEventListener('BeforeEvent.blur',function(e){
			if(e.event.target.id=="when-sd" || e.event.target.id=="when-ed" || e.event.target.id=="r-recur-enddate")
				e.preventDefault();
		},false);
		
		addCssToDocument('#gridcontainer{overflow:auto!important}');
	}
	else if( hostname == "picasaweb.google.com" ){
		//bad browser sniffing - slideshow now works too.
		opera.defineMagicVariable('_c',function(){return true;},null);
		//unwanted capture. thank you Gecko.
		var ael=document.addEventListener,rel=document.removeEventListener;
		Node.prototype.addEventListener=function(t,f,c){return ael.call(this,t,f,false);}
		Node.prototype.removeEventListener=function(t,f,c){return rel.call(this,t,f,false);}
		//tag soup parsing
		addEventListener('DOMContentLoaded',function(){
			var as=document.evaluate('//a[not(@href)]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for(var k=0,a;a=as.snapshotItem(k);k++)
				if(a.nextSibling instanceof HTMLDivElement)
					a.appendChild(a.nextSibling);
		},false);
	}
	else if( hostname == "docs.google.com" ){
		// this workaround added by Jesus Perez (Chuso)
		// avoids constant reloading passing a operaworkaround=timestamp
		// value in the URL
		// (see http://groups.google.com/group/Something-in-Writely-is-Broken/browse_thread/thread/2e2a494f933de587/a39e1246c54256f6)

		// Timestamp is used to get a different value for
		// operaworkaround, since workaround needs always a different
		// string in the query string
		var today = new Date();
		// Test if a query string exists
		if (location.search)
		{
		  // Retrieve the query string deleting the initial ?
		  var queryString = location.search.substr(1);
		  // Split the query string to an array with query=value values
		  var queries = queryString.split("&");
		  // If an operaworkaorund value is found, do nothing, otherwise
		  // we'll enter in an infinite loop
		  for (var i in queries)
		    if (queries[i].search("^operaworkaround=") != -1)
		      var found = true;
		  // If operworkaround string isn't found, add it
		  if (!found) location = location + '&operaworkaround=' + today.getTime();
		} else // (!location.search)
		  location = location.pathname + '?operaworkaround=' + today.getTime();

		//override sniffing
		var newsearch = location.search.replace('action=unsupported_browser', 'browserok=true');
		if( location.search != newsearch )
			location.search = newsearch;
			
		//fix for mouse coordinates for context menu - bad object detection
		document['all']=null;
		
		//prevent document from scrolling up on save and spellcheck
		function resetViewPos(f,t,a,b,c){
			var editFrame = window.top.wys_frame;
			var docEl = editFrame.document.documentElement;
			var top = docEl.scrollTop;
			var left = docEl.scrollLeft;
			f.call(t,a,b,c);
			editFrame.scrollTo(left,top);
		}
		opera.defineMagicFunction('ReplaceInnerHTML',resetViewPos);
		opera.defineMagicFunction('CorrectSpelling',resetViewPos);
				
		//fix for spell check menu position - Opera bug this time with scrollProps in inlines
		opera.addEventListener('BeforeScript',function(e){
			e.element.text = e.element.text.replace(/-=\s*(\w+)\.scroll(Top|Left)/g,'-=($1.currentStyle["display"]!="inline"?$1.scroll$2:0)');
		},false);
				
		//an alert called somewhere without parameters, when using the remove formatting functions
		var alert = window.alert
		window.alert = function(){if(arguments.length!=0)alert.apply(this,arguments);}
		
		//function GetWYSIWYGSelection
		//file http://docs.google.com/javascript/EditorCommon.js?v=dgw, line 1342
		//checks first for document.selection, which is only a TextRange
		//must check for window.getSelection !
		document['selection']=undefined;
		
		//function DoInsertPageBreak
		//file http://docs.google.com/javascript/EditorToolbar.js?v=cpt, line 1137
		//P element must have a child to be inserted
		var execCommand = Document.prototype.execCommand;
		Document.prototype.execCommand = function(command,showGui,arg){
			return execCommand.call(this,command,showGui,
				(command=='insertHTML'&&(/<p\s+class=['"]?pb/i).test(arg))?arg.replace('><','> <'):arg);
		};
		
		if(top==self){
			//top left links bar
			addCssToDocument('a.btn.dropdn b{float:none!important}'+
				'#savingDiv+div>table>tbody>tr>td[valign="top"]{width:400px!important}body{height:100%;margin:0}');
		}else if(/^\/Dialogs/i.test(location.pathname) ){
			addCssToDocument('td[colspan="2"]>textarea[cols="100"].flatedge{width:570px!important}');
		}
		else{
			addCssToDocument('html{overflow:auto!important}');
			if( top.location.href.indexOf("Edit?tab=htmledit")>0 )
				//style the html as monospace, and allow it to break into several lines.
				addCssToDocument('body{font-family:monospace!important;font-size:90%!important;white-space:pre-wrap!important}');
		}
		
		
	}
	
	function addCssToDocument(cssText,mediaStr,doc){doc=doc||document;mediaStr=mediaStr||'all';var styles=addCssToDocument.styleObj;if(!styles){var head=doc.getElementsByTagName("head")[0];if(!head){var docEl=doc.getElementsByTagName("html")[0]||doc.documentElement;if(!docEl){doc.addEventListener(opera&&opera.version()>=9?'DOMContentLoaded':'load',function(){addCssToDocument(cssText,mediaStr,doc);},false);return;}head=doc.createElement("head");if(head)docEl.insertBefore(head,docEl.firstChild);else head=docEl;}styles=addCssToDocument.styleObj=doc.createElement("style");styles.setAttribute("type","text/css");styles.appendChild(doc.createTextNode(''));head.appendChild(styles)}styles.firstChild.nodeValue+='@media '+mediaStr+'{'+cssText+'}\n';return true;}
	function cloneObject(src,dest){dest=dest||{};for(var prop in src)dest[prop]=src[prop];return dest;};
})( window.opera );

/*
			//sometimes clicking Edit HTML link doesn't show the correct page
			addEventListener('DOMContentLoaded',function(){
			return;
				var edithtml=document.selectSingleNode('//td[@class="main"]/nobr/a[@class="smalllink"]');
				if( edithtml && edithtml.getAttribute('href')=='#' ){
					edithtml.href='javascript:'+edithtml.getAttribute('onclick').replace(/&#\d+;/g,'%22');
				}
			},false);
			
*/
