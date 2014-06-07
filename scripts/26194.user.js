// UTX keys in add/edit/post/comment
// version 2.0 beta
// 2005-05-26
// Copyright (c) 2005, Oleg Marchuk <kingoleg@mail.ru>
// Copyright (c) 2006, Paul Tomashevskyi (v2.3)
// Copyright (c) 2006, Oleg Marchuk <kingoleg@mail.ru>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name          UTX keys in add/edit/post/comment
// @namespace     http://kingoleg.livejournal.com/
// @description   Add key short cut fot utx link.
// @include       http://*.livejournal.com/update.bml
// @include       http://*.livejournal.com/*/*mode=reply*
// @include       http://*.livejournal.com/*/*/*mode=reply*
// @include       http://*.livejournal.com/editjournal.bml*
// ==/UserScript==


var utx_user = 'kingoleg';
var utx_id;

(function(){
	// TODO: seek by url
	var utx_tags = new Array();
	var element;
	
	function keydown(event) {
		var Key = event.keyCode;
		if (Key==0) Key = event.charCode;
		if (!event.altKey) return;
		if (Key!=78) return; //N

		var utx_marker;

		element = this;
		if (!element.id) {
			element.id='commenttext';
		}
     	utx_id=element.id;	

		element.focus(); 
		var sel_start = element.selectionStart;
		var sel_end = element.selectionEnd;
		if (sel_start == sel_end) {
			//utx_marker = prompt("Enter UTX tag");
			chooseMarker();
		} else {
			utx_marker = element.value.slice(sel_start, sel_end);
			markerize(utx_marker);
		}

	}

	function markerize(utx_marker){
		element.focus(); 
		var sel_start = element.selectionStart;
		var sel_end = element.selectionEnd;
		
		element.value = element.value.slice(0,sel_start)+element.value.slice(sel_end);

		var utx_text = '<a href="http://utx.ambience.ru/users/'+utx_user+'/'+utx_marker+'/"><img src="http://utx.ambience.ru/img/'+utx_user+'/'+utx_marker+'/" hspace="3" vspace="3" alt="'+utx_marker+'" title="'+utx_marker+'" border="0" height="5" width="30" style="background-color:#c00;"></a>';
		MozillaInsertText(element, utx_text, sel_start);
		element.selectionStart = sel_start;
		element.selectionEnd = sel_start+utx_text.length;
		element.focus(); 
	}

	function markerize2(element, utx_marker){
		element.focus(); 
		var sel_start = element.selectionStart;
		var sel_end = element.selectionEnd;
		
		element.value = element.value.slice(0,sel_start)+element.value.slice(sel_end);

		var utx_text = '<a href="http://utx.ambience.ru/users/'+utx_user+'/'+utx_marker+'/"><img src="http://utx.ambience.ru/img/'+utx_user+'/'+utx_marker+'/" hspace="3" vspace="3" alt="'+utx_marker+'" title="'+utx_marker+'" border="0" height="5" width="30" style="background-color:#c00;"></a>';
		MozillaInsertText(element, utx_text, sel_start);
		element.selectionStart = sel_start;
		element.selectionEnd = sel_start+utx_text.length;
		element.focus(); 
	}


	function chooseMarker() {
		//Choose
		var utx_marker;
		var win = window.open('about:blank', 'utx', "location=no,menubar=no,resizable=no,scrollbars=yes,width=300,height=200");
		var doc = win.document;
		
		doc.element = element;
		win.markerize2 = markerize2;

		doc.open();
		doc.write("<html>");
		doc.write("<head>");
		doc.write("<title>Utx tags of "+utx_user+"</title>");
		doc.write("<script>");
		doc.write("function marker(utx_marker){");
		doc.write("var utx_id='"+utx_id+"';");
		doc.write("var utx_user = '"+utx_user+"';");
		doc.write("var txt = opener.document.getElementById(utx_id);");
		doc.write("var sel_start=txt.selectionStart; ");
		doc.write("var sel_end=txt.selectionEnd; ");
		doc.write("var utx_text = '<a href=\"http://utx.ambience.ru/users/'+utx_user+'/'+utx_marker+'/\"><img src=\"http://utx.ambience.ru/img/'+utx_user+'/'+utx_marker+'/\" hspace=\"3\" vspace=\"3\" alt=\"'+utx_marker+'\" title=\"'+utx_marker+'\" border=\"0\" height=\"5\" width=\"30\" style=\"background-color:#c00;\"></a>';");
		doc.write("txt.value=txt.value.slice(0,sel_start)+utx_text+txt.value.slice(sel_end);");
		doc.write("close();");
		doc.write("}");
		doc.write("</script>");
		doc.write("</head>");
		
		doc.write("<body>");
		doc.write("<table>");
		for(var i=0;i<utx_tags.length;i++) {
			doc.write("<tr><td>");
			doc.write("<a href='#' onclick='marker(\""+utx_tags[i]['tag']+"\");return false;'>"+utx_tags[i]['tag']+"</a>");
			doc.write("</td></tr>");
		}
		doc.write("<table>");
		doc.write("</body></html>");
		doc.close();

		doc.element = element;
		win.markerize2 = markerize2;

		//markerize(utx_marker);
	}

	function dd(o) {
		var win = window.open('about:blank');
		var doc = win.document;
		doc.open();
		doc.write("<html><head><title></title></head><body>");
		doc.write("<table width='100%' border='1'>");
		doc.write("<tr><th colspan='3'>"+o+"</th></tr>");
		doc.write("<tr><th>");
		doc.write("attr");
		doc.write("</th><th>");
		doc.write("as attr");
		doc.write("</th><th>");
		doc.write("as function");
		doc.write("</th><tr>");
		for(var attr in o) {
			if (isNumber(attr)) {
				continue;
			}
			doc.write("<tr><td>");
			doc.write(attr);
			doc.write("</td><td>");
			try {
				doc.write("as attr : "+eval("o."+attr));
			} catch(e) {
				doc.write(e+"\n"+attr+" is not attribute");
			}
			doc.write("</td><td>");
			try {
				doc.write(eval("o."+attr+"()"));
			} catch(e) {
				doc.write(e+"\n"+"as function : "+attr+" is not function");
			}
			doc.write("</td></tr>");
		}
		doc.write("<table>");

		doc.write("<textarea cols='75' rows='50'>");
		for(var attr in o) {
			doc.write('user_pref("capability.policy.livejournal.Element.'+attr+'", "allAccess");'+"\n");
		}
		doc.write("</textarea>");

		doc.write("</body></html>");

		doc.close();
	}

	function getTagsFromUtx(element) {
		// make the xmlhttprequest and create the object once it returns

		GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://utx.ambience.ru/api/1.0/tags?user='+utx_user,
				headers: {
					'User-agent': 'utx greasemonkey script (kingoleg@mail.ru)',
					'Accept': 'text/xml',
				},

			onreadystatechange: function(http) {
				if (4 == http.readyState && 200 == http.status) {
					var xmlText=http.responseText;
					//var parser = new XPCNativeWrapper(window, "DOMParser").DOMParser();
					var parser=new unsafeWindow.DOMParser();
					var xmlDoc=parser.parseFromString(xmlText,"application/xml");
					var tags = xmlDoc.getElementsByTagName('tag');

					for(var i=0;i<tags.length;i++) {
						var tag = tags[i];
						var tagName = tag.getAttribute('tag');
						var tagSupertag = tag.getAttribute('supertag');
						var tagCount = tag.getAttribute('count');

						utx_tags[i] = new Array();
						utx_tags[i]['tag'] = tagName;
						utx_tags[i]['supertag'] = tagSupertag;
						utx_tags[i]['count'] = tagCount;
					}
				}
			}
		});
	}

	function MozillaInsertText(element, text, pos) {
		element.value = element.value.slice(0,pos)+text+element.value.slice(pos);
	}

	//find edit
	var textareas = document.getElementsByTagName('textarea');
	var len = textareas.length;
	for(var i=0;i<len;i++) {
		//bind keyDown
		var textarea = textareas[i];
		textarea.addEventListener('keydown', keydown, false);
		if (i==0) {
			getTagsFromUtx(textarea);
		}
	}

	window.markerize = markerize;
})();