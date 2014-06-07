// ==UserScript==
// @name        light album
// @namespace   light_album
// @include     /http:\/\/imgsrc\.(ru|su|ro)\/[^\/]+\/[a-z]?[0-9]+\.html/
// @include     /http:\/\/imgsrc\.(ru|su|ro)\/main\/pic.php\?ad=[0-9]+/
// @version     1
// @grant GM_xmlhttpRequest
// ==/UserScript==

(function(){
	try{
	function makeRequest(url, callback) {
		if (GM_xmlhttpRequest) {
			GM_xmlhttpRequest({
			  method: "GET",
			  url: url,
			  onload: callback
			});
		}
	}
	
	function check_status(result){
		try{
			if (result.readyState == 4) 
				if (result.status == 200) 
					return true;
		}
		catch( e ) {}
	}
	
	function appendStyle(css){
		if (typeof GM_addStyle != "undefined") {
			GM_addStyle(css);
		} else if (typeof PRO_addStyle != "undefined") {
			PRO_addStyle(css);
		} else if (typeof addStyle != "undefined") {
			addStyle(css);
		} else {
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("style");
				node.type = "text/css";
				node.appendChild(document.createTextNode(css));
				heads[0].appendChild(node); 
			}
		}
	}

	function find_imgs(url, append_imgs, imgsrx, nextlrx, skip){
		window.console.log(url);
		makeRequest(url, function (result){
			img_list = [];
			if (check_status(result)){
				result.responseText.replace(imgsrx, function(all, str, img, end){
					img_list.push(img);
				});
				for (var i = 0; i < skip; i++)
					img_list.pop();
				
				append_imgs(img_list);
				result.responseText.replace(nextlrx, function(all, url){
					find_imgs(url, append_imgs, imgsrx, nextlrx, skip);
				});
			}
		})
	}
	
	var big_index = 0
	
	function append_big(imgs){
		for (var i = 0; i<imgs.length; i++, big_index++){
			imgs[i] = ["#lnk",big_index,":focus, #lnk",big_index
		,":hover~.big{background-image: url('", imgs[i],"');}\n"].join("");
		}

		appendStyle(imgs.join(""));
	}
	
	var page
	var cover
	
	var small_index = 0
	
	function append_small(imgs){
		for (var i = 0; i<imgs.length; i++, small_index++){
			var a = document.createElement("a");
			a.id = ["lnk", small_index].join("");
			a.className = "lnk";
			a.href = "#";
			var img = document.createElement("img");
			img.className = "img"
			img.src = imgs[i];
			a.appendChild(img);
			page.insertBefore(a, cover);
			page.insertBefore(document.createTextNode(" "), cover)
		}
	}
	
	var imgsrx = /(<img[^>]*src=[\"\'])(http\:\/\/s[^\"\'>]*)([\"\'][^>]*>)/gmi
	var imgsrx2 = /(<img[^>]*src=[\"\'])(http\:\/\/b[^\"\'>]*)([\"\'][^>]*>)/gmi
	var nextlrx = /href=[\"\']?([^\"\'>]*)[\"\']?>(▶|&#9654;)/mi
	var nextlrx2 = /href=[\"\']?([^\"\'>]*)[\"\']?>(вперед|next) (▶|&#9654;)/mi
	
	function main(){
		var my_img_list = [];
		
		var imgs = document.getElementsByTagName("img");
		for (var i = 0; i<imgs.length; i++){
			if (imgs[i].src.search("http://s")>=0) {
				my_img_list.push(imgs[i].src);
				
			}	
		}
		my_img_list.pop();
		
		var links = document.getElementsByTagName("a");
		var big_found = false;
		var mini_found = false;
		for (var i = 0; i<links.length; i++){
			if (links[i].href.search("/main/pic_tape.php")>=0 && !big_found) 
				big_found = links[i].href;
			else if (links[i].textContent.search(/(▶|&#9654;)/i)>=0 && !mini_found) 
				mini_found = links[i].href;
			else if (mini_found && big_found) 
				break;
		}
		
		if (big_found){
			make_page();
			append_small(my_img_list); 
			find_imgs(big_found, append_big, imgsrx2, nextlrx2, 0);
			if (mini_found)
				find_imgs(mini_found, append_small, imgsrx, nextlrx, 1);
		}
	}
	
	function create_append(className, parent){
		var el = document.createElement("span");
		el.className = className;
		parent.appendChild(el);
		return el;
	}
	
	function make_page(){

		var new_body = document.createElement("td");
		new_body.setAttribute("colspan", 10);
		
		create_append("cover", new_body)
		page = create_append("hide", new_body)

		cover = create_append("focus_cover",page);
		create_append("loading",page);
		create_append("big",page);
		
		appendStyle("body{\
	height: 100%;\
}\
\
.lnk{\
	display: block;\
	float: left;\
	margin-bottom: 15px;\
	margin-left: 15px;\
	overflow: hidden;\
}\
\
.lnk .img{\
	position: relative;\
	z-index: 3;\
	margin-bottom: 10px;\
	border: 1px solid black;\
	overflow: hidden;\
	display: table-cell;\
	vertical-align: middle;\
	background-color: #333333;\
	height: 120px;\
}\
\
.lnk{\
	vertical-align: middle; \
	border: 0px;\
}\
\
.lnk:focus, .big{\
	background-repeat: no-repeat;\
	background-attachment: fixed;\
	background-position: center;\
	background-size: contain;\
	cursor: crosshair;\
	visibility: visible;\
}\
\
.cover, .lnk:focus, .focus_cover, .loading, .big{\
	display: block;\
	overflow: hidden;\
	position: fixed;\
	top: 0px;\
	left: 0px;\
	width: 100%;\
	height: 100%;\
	margin: 0px;\
}\
\
.hide:hover .img{\
	opacity: 0.01;\
	cursor: crosshair;\
}\
\
.menu_place_holder, .menu{\
	display: block;\
	width: 100%;\
	height: 150px;\
}\
\
.menu{\
	position: absolute;\
	top: 0px;\
	left: 0px;\
}\
\
.hide:hover~.menu{\
	visibility: hidden;\
}\
\
.cover{\
	z-index: 3;\
}\
\
.lnk:focus{\
	z-index: 5;\
}\
\
.lnk:focus .img{\
	visibility: hidden;\
}\
\
.lnk:focus  + .lnk {\
	position: fixed;\
	bottom: 20px;\
	right: 0px;\
	z-index: 7;\
	\
}\
\
.lnk:focus  + .lnk  .img{\
	opacity: 1;\
	cursor: pointer;\
}\
\
.loading{\
	visibility: hidden;\
	padding: 0px;\
	text-align: center;\
	text-decoration: none;\
	color: white;\
	background: fixed center no-repeat\
}\
\
.lnk:focus ~ .focus_cover{\
	z-index: 6;\
	cursor: crosshair;\
	background: fixed top right no-repeat ;\
}\
\
.lnk:hover ~ .loading{\
	visibility: visible;\
}\
\
.lnk:focus ~ .loading{\
	visibility: visible;\
	z-index: 3;\
}\
\
\
.img{-moz-transition-property: opacity;-moz-transition-duration: 2s;-webkit-transition-property: opacity;-webkit-transition-duration: 2s;	-o-transition-property: opacity; -o-transition-duration: 2s; transition-property: opacity; transition-duration: 2s; } a{position: relative; z-index:4;}");
		
		var body = document.getElementsByClassName("topmenu")[0].nextSibling.nextSibling;
		body.parentNode.replaceChild(new_body, body);
		
	
	}	
	main();
	}catch(e){
		window.console.error(e);
	}
	})();