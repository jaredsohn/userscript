// ==UserScript==
// @name        Quote Post
// @namespace   deusfigendi
// @description Quotes instead of resharing
// @downloadURL http://userscripts.org/scripts/source/171283.user.js
// @updateURL   http://userscripts.org/scripts/source/171283.user.js
// @include     https://pod.geraspora.de/stream
// @version     1.1.1

// @include		http*://aptitudeworks.com/*
// @include		http*://caray.net/*
// @include		http*://chrissto.de/*
// @include		http*://clique.ru/*
// @include		http*://co.zy.lc/*
// @include		http*://cryptospora.net/*
// @include		http*://d.apexo.de/*
// @include		http*://despora.de/*
// @include		http*://dia.sdf.org/*
// @include		http*://diapod.herokuapp.com/*
// @include		http*://diapod.net/*
// @include		http*://diapod.org/*
// @include		http*://diasp.cz/*
// @include		http*://diasp.de/*
// @include		http*://diasp.dokterbob.net/*
// @include		http*://diasp.eu.com/*
// @include		http*://diasp.eu/*
// @include		http*://diasp.kr/*
// @include		http*://diasp.org/*
// @include		http*://diaspod.fr/*
// @include		http*://diaspora.aueb.gr/*
// @include		http*://diaspora.delaszy.eu/*
// @include		http*://diaspora.digitalignition.net/*
// @include		http*://diaspora.subsignal.org/*
// @include		http*://diaspora.teriksson.com/*
// @include		http*://diaspora.trash-talk.de/*
// @include		http*://diaspora.vleij.com/*
// @include		http*://diaspora.voodoo-arts.net/*
// @include		http*://failure.net/*
// @include		http*://flokk.no/*
// @include		http*://free-beer.ch/*
// @include		http*://freedom.praxis.pw/*
// @include		http*://greeninja.co.uk/*
// @include		http*://huspora.hu/*
// @include		http*://i.luckfables.net/*
// @include		http*://ilikefreedom.org/*
// @include		http*://iliketoast.net/*
// @include		http*://jenaspora.de/*
// @include		http*://joindiaspora.com/*
// @include		http*://kosmospora.net/*
// @include		http*://libertypod.org/*
// @include		http*://marsoc.de/*
// @include		http*://nards.us/*
// @include		http*://nerdbash.net/*
// @include		http*://nerdpol.ch/*
// @include		http*://nesc.io/*
// @include		http*://nx-pod.de/*
// @include		http*://pet-board.com/*
// @include		http*://pingupod.de/*
// @include		http*://pixmove.herokuapp.com/*
// @include		Http*://pod.asap-soft.com/*
// @include		http*://pod.ferner-online.de/*
// @include		http*://pod.fulll.name/*
// @include		http*://pod.geraspora.de/*
// @include		http*://pod.hiddenbox.org/*
// @include		http*://pod.jpope.org/*
// @include		http*://pod.mieth.net/*
// @include		http*://pod.orkz.net/*
// @include		http*://pod.roddewig-online.de/*
// @include		http*://pod.sd.vc/*
// @include		http*://pod.universe.si/*
// @include		http*://poddery.com/*
// @include		http*://podmob.net/*
// @include		http*://rescuenetwork.net/*
// @include		http*://rootpod.org/*
// @include		http*://snuckeys.com/*
// @include		http*://social.cooleysekula.net/*
// @include		http*://social.cooleysekula.net/*
// @include		http*://social.mbuto.me/*
// @include		http*://social.mrzyx.de/*
// @include		http*://social.seawolfsanctuary.com/*
// @include		http*://socializer.cc/*
// @include		http*://sp0.re/*
// @include		http*://spora.com.ua/*
// @include		http*://spyurk.am/*
// @include		http*://sysad.org/*
// @include		http*://whompify.com/*
// @include		http*://wk3.org/*
// @include		http*://www.cryptospora.net/*
// @include		http*://www.pingupod.de/*
// @include		http*://www.pingupod.de/*


// ==/UserScript==

//json-sans-eval from https://code.google.com/p/json-sans-eval/ by Mike Samuel <mikesamuel@gmail.com>
window.jsonParse=function(){var r="(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)",k='(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';k='(?:"'+k+'*")';var s=new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|"+r+"|"+k+")","g"),t=new RegExp("\\\\(?:([^u])|u(.{4}))","g"),u={'"':'"',"/":"/","\\":"\\",b:"\u0008",f:"\u000c",n:"\n",r:"\r",t:"\t"};function v(h,j,e){return j?u[j]:String.fromCharCode(parseInt(e,16))}var w=new String(""),x=Object.hasOwnProperty;return function(h,
j){h=h.match(s);var e,c=h[0],l=false;if("{"===c)e={};else if("["===c)e=[];else{e=[];l=true}for(var b,d=[e],m=1-l,y=h.length;m<y;++m){c=h[m];var a;switch(c.charCodeAt(0)){default:a=d[0];a[b||a.length]=+c;b=void 0;break;case 34:c=c.substring(1,c.length-1);if(c.indexOf("\\")!==-1)c=c.replace(t,v);a=d[0];if(!b)if(a instanceof Array)b=a.length;else{b=c||w;break}a[b]=c;b=void 0;break;case 91:a=d[0];d.unshift(a[b||a.length]=[]);b=void 0;break;case 93:d.shift();break;case 102:a=d[0];a[b||a.length]=false;
b=void 0;break;case 110:a=d[0];a[b||a.length]=null;b=void 0;break;case 116:a=d[0];a[b||a.length]=true;b=void 0;break;case 123:a=d[0];d.unshift(a[b||a.length]={});b=void 0;break;case 125:d.shift();break}}if(l){if(d.length!==1)throw new Error;e=e[0]}else if(d.length)throw new Error;if(j){var p=function(n,o){var f=n[o];if(f&&typeof f==="object"){var i=null;for(var g in f)if(x.call(f,g)&&f!==n){var q=p(f,g);if(q!==void 0)f[g]=q;else{i||(i=[]);i.push(g)}}if(i)for(g=i.length;--g>=0;)delete f[i[g]]}return j.call(n,
o,f)};e=p({"":e},"")}return e}}();


function flash_notice(message) {
		if (document.getElementById("flash_notice")) {
			document.getElementById("flash_notice").parentNode.removeChild(document.getElementById("flash_notice"));
		}
		var new_flash_notice = document.createElement("div");
		new_flash_notice.id = "flash_notice";
		new_flash_notice.className = "expose";
		var new_flash_message = document.createElement("div");
		new_flash_message.className = "message";
		new_flash_message.appendChild(document.createTextNode(message));
		new_flash_notice.appendChild(new_flash_message);
		
		document.getElementsByTagName("body")[0].insertBefore(new_flash_notice,document.getElementsByTagName("body")[0].firstChild);
}



function quote(quote_btn,clickevent) {
	//okay, was brauchen wir alles?
	/* Kleinstmöglicher Avatar
	 * Autor-ID
	 * Autor-Name
	 * Postzeitpunkt
	 * GUID des Beitrags
	 * Inhalt des Beitrags
	 */
	 
	var temp_element = quote_btn;
	while (!temp_element.classList.contains("bd")) {
		temp_element = temp_element.parentNode;
	}
	temp_element = temp_element.getElementsByClassName("timeago")[0].parentNode;
	
	var post_id = temp_element.href.match(/(\/posts\/)(\w+)/);
	post_id = RegExp.$2;
	 
	var myAjax_Request = new XMLHttpRequest();
	myAjax_Request.open("get", "/posts/"+post_id+".json", true);
	myAjax_Request.onreadystatechange = function(){
		if(myAjax_Request.readyState == 4){
			var post2quote = jsonParse(myAjax_Request.responseText);
			var post_content = "\n\n> "+post2quote.text.replace(/(\\r\\n|\\n|\r\n|\n)/g,"\n> ");
			if (post2quote.post_type.match(/Reshare/i)) {
				var root_object = post2quote.root;
				var via_id = post2quote.author.diaspora_id;
				var via_name = post2quote.author.name;
			} else {
				var root_object = post2quote;
				var via_id = null;
				var via_name = null;	
			}
			
			var author_avatar = root_object.author.avatar.small;
			var author_id = root_object.author.diaspora_id;
			var author_name = root_object.author.name;
			var post_date = root_object.created_at;
			var post_guid = root_object.guid;		
			var post_location = root_object.address;
			
			var photos = root_object.photos;
			
			post_date = new Date(post_date);
						
			var return_content = "\n\n\n\n> ----\n\n<strong> @{![Avatar]("+author_avatar+") "+author_name+" ; "+author_id+"} </strong><sup> ["+post_date.toLocaleString()+"](/posts/"+post_guid+")</sup>\n\n";
			
			if (photos.length > 0) {
				return_content += "> [ !["+photos[0].guid+"]("+photos[0].sizes.large+") ]("+photos[0].sizes.large+")\n\n> ";
				for (var i = 1; i < photos.length; i++) {
					return_content += "[ !["+photos[i].guid+"]("+photos[i].sizes.small+") ]("+photos[i].sizes.large+") ";
				}
			}
			
			return_content += post_content+"\n\n> "+(post_location != null?"<sub>Near from: "+post_location+"<br /></sub>":"")+(via_name != null?"<sub>via @{"+via_name+" ; "+via_id+"}<br /></sub>":"")+"\n\n----\n\n\n\n";
			
			//post_content = post_content.replace(/(^|\n)/g,"$1\> ");
			
			//alert(post_content);
			
			
			document.getElementById("publisher").classList.remove("closed");
			document.getElementById("publisher_textarea_wrapper").classList.add("active");
			
			
			document.getElementById("status_message_fake_text").value = return_content;
			document.getElementById("status_message_text").value = return_content;
			
			document.getElementById("status_message_fake_text").style.height = (return_content.match(/\n/g).length * 20)+"px";
			
			var aspect_dropdown = document.getElementsByClassName("public_toggle")[0].getElementsByClassName("dropdown_list")[0];
			for (var i = 0; i < aspect_dropdown.childNodes.length; i++) {
				if(aspect_dropdown.childNodes[i].nodeType == 1) {
					if (aspect_dropdown.childNodes[i].getAttribute("data-aspect_id") == "public") {
						aspect_dropdown.childNodes[i].classList.add("selected");
					} else {
						aspect_dropdown.childNodes[i].classList.remove("selected");
					}
				}
			}
			aspect_dropdown = aspect_dropdown.parentNode
			while (aspect_dropdown.nodeType != 1 || aspect_dropdown.nodeName.toLowerCase() != "div" || !aspect_dropdown.classList.contains("toggle")) {
				aspect_dropdown = aspect_dropdown.previousSibling;
			}
			aspect_dropdown.firstChild.data = " Öffentlich  ▼";
			
			document.getElementsByName("aspect_ids[]")[0].value = "public";
			
			document.getElementById("status_message_fake_text").focus();
			
			
			
		}
	}
	myAjax_Request.send(null);
	 
	//clickevent.preventDefault();
	//return false;
}

function add_quote_buttons() {
	//alert("5");
	
	var reshare_as_quote_btn = null;
	
	var all_reshares = document.getElementsByClassName("reshare");
	for (var i=0; i< all_reshares.length; i++) {
		if ((!all_reshares[i].classList.contains("raq_extended")) && (!all_reshares[i].classList.contains("label")) && (all_reshares[i].nodeName.toLowerCase() == "a")) {
			all_reshares[i].classList.add("raq_extended");
			reshare_as_quote_btn = document.createElement("a");
			reshare_as_quote_btn.href="#";
			reshare_as_quote_btn.appendChild(document.createTextNode("zitieren ·"));
			reshare_as_quote_btn.addEventListener("click",function(e) { quote(this,e); } );
			all_reshares[i].parentNode.insertBefore(reshare_as_quote_btn,all_reshares[i]);
		}
		all_reshares[i].parentNode.addEventListener("click",function() { window.setTimeout(add_quote_buttons,1200); });
	}
	//alert("6");
}

function create_post_form() {
	var pretext_textarea = document.createElement("textarea");
	pretext_textarea.id = "pretext_textarea";
	pretext_textarea.style.width = "90%";
	var posttext_textarea = document.createElement("textarea");
	posttext_textarea.id = "posttext_textarea";
	posttext_textarea.style.width = "90%";
	
	
	var post_to_quote_body = document.getElementById("body");
	
	post_to_quote_body.parentNode.insertBefore(pretext_textarea,post_to_quote_body);
	post_to_quote_body.parentNode.appendChild(posttext_textarea);
	
	post_to_quote_body.style.paddingLeft = "50px";
	post_to_quote_body.style.paddingRight = "50px";
	post_to_quote_body.style.marginBottom = "20px";
	post_to_quote_body.style.border = "solid";
	
	
	
	
	var myAjax_Request = new XMLHttpRequest();
	myAjax_Request.open("get", window.location.href+".json", true);
	myAjax_Request.onreadystatechange = function(){
		if(myAjax_Request.readyState == 4){
			var post2quote = jsonParse(myAjax_Request.responseText);
			var post_content = "\n\n> "+post2quote.text.replace(/(\\r\\n|\\n|\r\n|\n)/g,"\n> ");
			if (post2quote.post_type.match(/Reshare/i)) {
				var root_object = post2quote.root;
				var via_id = post2quote.author.diaspora_id;
				var via_name = post2quote.author.name;
			} else {
				var root_object = post2quote;
				var via_id = null;
				var via_name = null;	
			}
			
			var author_avatar = root_object.author.avatar.small;
			var author_id = root_object.author.diaspora_id;
			var author_name = root_object.author.name;
			var post_date = root_object.created_at;
			var post_guid = root_object.guid;		
			var post_location = root_object.address;
			
			var photos = root_object.photos;
			
			post_date = new Date(post_date);
						
			var return_content = "\n\n\n\n> ----\n\n<strong> @{![Avatar]("+author_avatar+") "+author_name+" ; "+author_id+"} </strong><sup> ["+post_date.toLocaleString()+"](/posts/"+post_guid+")</sup>\n\n";
			
			if (photos.length > 0) {
				return_content += "> [ !["+photos[0].guid+"]("+photos[0].sizes.large+") ]("+photos[0].sizes.large+")\n\n> ";
				for (var i = 1; i < photos.length; i++) {
					return_content += "[ !["+photos[i].guid+"]("+photos[i].sizes.small+") ]("+photos[i].sizes.large+") ";
				}
			}
			
			return_content += post_content+"\n\n> "+(post_location != null?"<sub>Near from: "+post_location+"<br /></sub>":"")+(via_name != null?"<sub>via @{"+via_name+" ; "+via_id+"}<br /></sub>":"")+"\n\n----\n\n\n\n";
			
			//post_content = post_content.replace(/(^|\n)/g,"$1\> ");
			
			//alert(post_content);
			
			
			
			var quotetext_textarea = document.createElement("input");
			quotetext_textarea.id = "quotetext_textarea";
			quotetext_textarea.type = "hidden";
			quotetext_textarea.value = return_content;
			var quote_post_btn = document.createElement("input");
			var quote_post_btn_wrapper = document.createElement("div");
			quote_post_btn_wrapper.className = "comment";
			quote_post_btn.id = "share_as_quote_button";
			quote_post_btn.className = "button creation";
			quote_post_btn.type = "button";
			quote_post_btn.value = "Share";
			quote_post_btn.name = "commit";
			
			
			
			quote_post_btn.addEventListener("click",function() { send_from_singlepost(); }, true);
			
			
			

			quote_post_btn_wrapper.appendChild(quote_post_btn);
			
			
			document.getElementById("body").parentNode.appendChild(quotetext_textarea);
			document.getElementById("body").parentNode.appendChild(quote_post_btn_wrapper);

			
			
			
			
			
		}
	}
	myAjax_Request.send(null);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}



function send_from_singlepost() {
	
	var statusSendingAjax_Request = new XMLHttpRequest();
			
	statusSendingAjax_Request.open("POST","/status_messages",true);
	statusSendingAjax_Request.setRequestHeader("Content-Type","application/json; charset=UTF-8");
	statusSendingAjax_Request.setRequestHeader("X-CSRF-Token",document.getElementsByName("csrf-token")[0].getAttribute("content"));
	
	var status_message_to_send = document.getElementById("pretext_textarea").value+document.getElementById("quotetext_textarea").value+document.getElementById("posttext_textarea").value;
	status_message_to_send = status_message_to_send.replace(/\n/g, "\\r\\n\\r").replace(/\"/g, "\\\"");
	
	/*
	alert('{"status_message":{"text":"'+document.getElementById("pretext_textarea").value+document.getElementById("posttext_textarea").value+document.getElementById("quotetext_textarea").value+'"},"aspect_ids":"public","location_coords":""}');
	*/
	/*
	alert(document.getElementsByName("csrf-token")[0].getAttribute("content")):
	*/
	
	//alert("6.3");
				
	statusSendingAjax_Request.onreadystatechange = function(){
		if(statusSendingAjax_Request.readyState == 4){
			flash_notice("You just quoted this post…");
			document.getElementById("pretext_textarea").parentNode.removeChild(document.getElementById("pretext_textarea"));
			document.getElementById("posttext_textarea").parentNode.removeChild(document.getElementById("posttext_textarea"));
			document.getElementById("quotetext_textarea").parentNode.removeChild(document.getElementById("quotetext_textarea"));
			document.getElementById("share_as_quote_button").parentNode.parentNode.removeChild(document.getElementById("share_as_quote_button").parentNode);
			//document.getElementById("share_as_quote_button").parentNode.removeChild(document.getElementById("share_as_quote_button"));
			
			
			document.getElementById("body").style.paddingLeft = null;
			document.getElementById("body").style.paddingRight = null;
			document.getElementById("body").style.marginBottom = null;
			document.getElementById("body").style.border = null;
			
		}
	}
				
	statusSendingAjax_Request.send('{"status_message":{"text":"'+status_message_to_send+'"},"aspect_ids":"public","location_coords":""}');
	//https://pod.geraspora.de/status_messages
	//statusSendingAjax_Request.send('{"status_message":{"text":"nothing"},"aspect_ids":"public","location_coords":""}');
	//alert("send...");
}

function check_if_singlepostview() {
	if (document.getElementById("single-post-content")) {
		//alert("5.2");
		var reshare_btn = document.getElementsByClassName("reshare")[0];
		var commentfocus_btn = document.getElementsByClassName("focus-comment")[0];
		commentfocus_btn.style.display = "none";
		//   
		var quote_btn = document.createElement("a");
		//quote_btn.appendChild(document.createTextNode("Quote · "));
		quote_btn.className = "reshare-as-quote";
		//quote_btn.setAttribute("rel","auth-required");
		quote_btn.setAttribute("data-original-title","quote this post");
		var quote_btnimg = document.createElement("i");
		quote_btnimg.className = "entypo comment gray large";
		quote_btn.appendChild(quote_btnimg);
		
		quote_btn.addEventListener("click",function() { create_post_form(); },false);
		
		reshare_btn.parentNode.insertBefore(quote_btn,reshare_btn);
	} else {
		//alert("5.3");
	}
}


	//alert("1");
if (document.getElementById("publisher")) {
	//alert("2");
	window.setTimeout(add_quote_buttons,1700);
	window.setInterval(add_quote_buttons,10500);
	//alert("3");
} else {
	//alert("2.2");
	window.setTimeout(check_if_singlepostview,1699);
	//alert("3.2");
}

	//alert("4");
