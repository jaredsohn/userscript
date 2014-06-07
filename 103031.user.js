// ==UserScript==
// @name           F2n ocrt
// @author         Maniche
// @version        1.0
// @namespace      f2n
// @description    -
// @include        http://*fer2.net/group.php?*do=discuss*
// @include		   http://*fer2.net/index.php?area=vbcmsarea_home1*
// ==/UserScript==

function getElementsByClassName(classname, node, targetType) {
		if(!node) node = document.getElementsByTagName('body')[0];
		var a = [];
		var re = new RegExp('\\b' + classname + '\\b');
		var els = node.getElementsByTagName(targetType);
		for(var i=0,j=els.length; i<j; i++)
			if(re.test(els[i].className))a.push(els[i]);
		return a;
		}
if(window.location.href.indexOf('discuss')>0){
	var s = document.createElement('script');
	s.type = "text/javascript";
	s.innerHTML = "function getElementsByClassName(classname, node, targetType) {\n\
			if(!node) node = document.getElementsByTagName('body')[0];\n\
			var a = [];\n\
			var re = new RegExp('\\\\b' + classname + '\\\\b');\n\
			var els = node.getElementsByTagName(targetType);\n\
			for(var i=0,j=els.length; i<j; i++)\n\
				if(re.test(els[i].className))a.push(els[i]);\n\
			return a;\n\
			}\n\
	function myquote(id){\n\
			var msg = document.getElementById('gmessage'+id);\n\
			var user_a = getElementsByClassName('username', msg, 'a')[0];\n\
			var user_name = user_a.innerHTML.replace(/<[a-zA-Z\/][^>]*>/g, '');\n\
			var message = document.getElementById('gmessage_text_'+id).childNodes;\n\
			var text = '';\
			var iframe = document.getElementById('vB_Editor_QR_iframe');\
			if(iframe==undefined){\
					var ibody = document.getElementById('vB_Editor_QR_textarea');\
					var tags = 0;\
				}\
			else {\
				var iframedoc = iframe.contentDocument;\
				var ibody = iframedoc.getElementsByTagName('body')[0];\
				var tags=1;\
			}\
			for(m=0;m<message.length;m++){\
				try{\
				if(message[m].nodeType == 3) text += message[m].wholeText;\
				else if(tags==0)continue;\
				else if(message[m].nodeName.toLowerCase() == 'br')text += '<br>'; \
				else if(message[m].nodeName.toLowerCase() == 'a') text += '<a target=\"_blank\" href=\"'+message[m].href+'\">'+message[m].innerHTML+'</a>';\
				else if(message[m].nodeName.toLowerCase() == 'img') text += '<img src=\"'+message[m].src+'\">';\
				}catch(e){}\
				}\
			text = '[QUOTE='+user_name+']'+text+'[/QUOTE]';\n\
			ibody.innerHTML = text;\
			if (tags==1) ibody.innerHTML += '<br>';\
			var path = window.location.href+'#';\
			path = path.replace(/#.*/, '');\
			path += '#vB_Editor_QR_';\
			if(tags==1) path += 'iframe';\
			else path += 'textarea';\
			window.location.href = path;\
			}";
	document.getElementsByTagName('head')[0].appendChild(s);
	var message_list = document.getElementById('message_list').childNodes;

	for(var i=1;i<message_list.length;i++){
		if (i==0)continue;
		try{
			message = message_list[i];
			var msg_id = message.id.substr(11);		
			var controls_ul = getElementsByClassName('controls', message, "ul")[0];
			var quote = document.createElement('li');
			quote.className = 'smallfont';
			var action = document.createElement('a');
			action.setAttribute('href', '#');
			action.setAttribute('onclick','myquote('+msg_id+'); return false;');
			action.innerHTML = 'Citiraj';
			quote.appendChild(action);
			controls_ul.appendChild(quote);
			}
		catch(e){
			}
		}
}
else if(window.location.href.indexOf('vbcmsarea_home1')>0){
	var col3p = document.getElementById('col3p');
	var mc = getElementsByClassName('middlecontainer', col3p, 'div')[0];
	var nt = document.createElement('iframe');
	nt.id = 'ocrt_id';
	var div = document.createElement('div');
	div.id = 'ocrt_content';
	div.appendChild(nt);
	var s = document.createElement('script');
	s.type = "text/javascript";
	s.innerHTML = "function clearshow(){\
		var iframe = document.getElementById('ocrt_id');\
		var iframedoc = iframe.contentDocument;\
		var t = iframedoc.getElementById('discussion_list').innerHTML;\
		document.getElementById('ocrt_content').innerHTML = '<table class=\"tborder discussion_list\">'+t+'</table>';\
		}";
	document.getElementsByTagName('head')[0].appendChild(s);
	nt.src = 'group.php?groupid=227';
	nt.setAttribute('style', 'display:none;');
	nt.setAttribute('onload', 'clearshow();');
	mc.insertBefore(div, mc.firstChild);
	}