// ==UserScript==
// @name        Մեջբերել դիասպորայում
// @description Դիասպորա ապակենտրոնացված սոցիալական կայքերում «տարածել» կոճակի կողքին ավելացնում է «մեջբերել» կոճակը /հայերեն լեզվով/:
// @version     1.1.հայերեն

// @include		http*://spyurk.am/*
// @include		http*://pod.geraspora.de/*
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

function quote(quote_btn,clickevent) {
		 
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
					if (aspect_dropdown.childNodes[i].getAttribute("data-aspect_id") == "all_aspects") {
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
			aspect_dropdown.firstChild.data = " Բոլոր խմբերը  ▼";
			
			document.getElementsByName("aspect_ids[]")[0].value = "all_aspects";
			
			document.getElementById("status_message_fake_text").focus();
			
			
			
		}
	}
	myAjax_Request.send(null);
	 
	//clickevent.preventDefault();
	//return false;
}

function add_quote_buttons() {
	
	var reshare_as_quote_btn = null;
	
	var all_reshares = document.getElementsByClassName("reshare");
	for (var i=0; i< all_reshares.length; i++) {
		if ((!all_reshares[i].classList.contains("raq_extended")) && (!all_reshares[i].classList.contains("label")) && (all_reshares[i].nodeName.toLowerCase() == "a")) {
			all_reshares[i].classList.add("raq_extended");
			reshare_as_quote_btn = document.createElement("a");
			reshare_as_quote_btn.href="#";
			reshare_as_quote_btn.appendChild(document.createTextNode("Մեջբերել ·"));
			reshare_as_quote_btn.addEventListener("click",function(e) { quote(this,e); } );
			all_reshares[i].parentNode.insertBefore(reshare_as_quote_btn,all_reshares[i]);
		}
		all_reshares[i].parentNode.addEventListener("click",function() { window.setTimeout(add_quote_buttons,1200); });
	}
}


if (document.getElementById("publisher")) {
	window.setTimeout(add_quote_buttons,1700);
	window.setInterval(add_quote_buttons,10500);
}