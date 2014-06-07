// ==UserScript==
// @name           visinvis2
// @namespace      http://www.fotka.pl/profil/Bozar/
// @include        http://www.fotka.pl/*
// @version        2.0.1
// ==/UserScript==




var u = unsafeWindow;
var $ = u.$;

//u.onerror = null;

if(!u.session_user_id) return;

var div = $("<div/>");
var link = $("<a/>");
link.attr("href", "#");
div.css({margin: "0 3px", cssFloat: "right"});
div.append(link);
div.append(" | ");
updateLinkText();

link.click(function(e){
	e.preventDefault();

	setTimeout(function(){
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://www.fotka.pl/konto_setup.php",
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			onload: function(xhr){
				var bodyContent = xhr.responseText;
				bodyContent = bodyContent.substring(bodyContent.indexOf('<div class="html">')+
					'<div class="html">'.length, bodyContent.indexOf("</body>"));
				
				var range = document.createRange();
				var xhr_frag = range.createContextualFragment(bodyContent);
				var xhr_doc = document.implementation.createDocument(null, 'html', null);
				xhr_doc.adoptNode(xhr_frag);
				xhr_doc.documentElement.appendChild(xhr_frag);


				if(xhr_doc.getElementById("visible_1").checked){					
					xhr_doc.getElementById("visible_1").checked = false;
					xhr_doc.getElementById("visible_2").checked = true;
					xhr_doc.getElementById("visible_3").checked = false;
					post(xhr_doc, false);
				}else{					
					xhr_doc.getElementById("visible_1").checked = true;
					xhr_doc.getElementById("visible_2").checked = false;
					xhr_doc.getElementById("visible_3").checked = false;
					post(xhr_doc, true);					
				}
			}
		});
	}, 0);
});

	
function post(xhr_doc, visible){
	var form = xhr_doc.getElementsByTagName("form")[0];	
	var settings = $(form).serialize();
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.fotka.pl/konto_setup.php",
		headers: {"Content-Type": "application/x-www-form-urlencoded"},
		data: settings,
		onload: function(xhr){
			GM_setValue("visinvis2", visible);
			updateLinkText();			
		}
	});	
}


function updateLinkText(){
	var visible = GM_getValue("visinvis2", true); // widoczność
	if(visible){
		link.html("widoczny");
	}else{
		link.html("ukryty");
	}
}


$("#logowanie").append(div);

