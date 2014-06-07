// ==UserScript==
// @name	Anti-Gaston script
// @namespace	Clip
// @description	Gastonizacio ellen. Nagyban elosegiti a nyugodt forumozast! Verzio: 1.0
// @include        http://*.nethirlap.hu/*
// ==/UserScript==

if(document.title == '') return;
if(document.title == 'Szín') return;
if(document.title == '.: NetHírlap :.') return;

var TOPIC = null;
var forms = document.getElementsByTagName("form");
for(i in forms)
	if(forms[i].name ==  'nhforms')
		for(j in forms[i].elements)
			if(forms[i].elements[j].name == 'topic') TOPIC = forms[i].elements[j].value;

if(TOPIC != null){
	var p;
	var as = document.getElementsByTagName("a");
	for(i in as)
		if((as[i].name != null) && (as[i].name.match(/uanc/))){
			p = as[i].parentNode;
			break;
		}
	
	var showAllIgnored;
	var bookmarked = null;
	var imgs = document.getElementsByTagName("img");
	for(i in imgs)
		// show_ignored link kirakasa
		if(imgs[i].src == 'http://www.nethirlap.hu/nfimages/pager-l.gif'){
			showAllIgnored = document.createElement("a");
			showAllIgnored.href = 'javascript:showAllIgnored()';
			showAllIgnored.innerHTML = 'show_ignored';
			imgs[i].parentNode.parentNode.parentNode.childNodes[0].parentNode.insertBefore(showAllIgnored,imgs[i].parentNode.parentNode.parentNode.childNodes[0]);
			break;
		}
	for(i in imgs)
		// konyvjelzo megkeresese
		if(imgs[i].src == 'http://www.nethirlap.hu/nfimages/mb-bookmark-set1.gif'){
			bookmarked = imgs[i].parentNode.parentNode.firstChild.href;
			bookmarked = bookmarked.substring( bookmarked.search(/=/)+1, bookmarked.search(/&/));
		}
	
	hideIgnoredPosts(p,bookmarked,showAllIgnored);
	
	set_function("showAllIgnored", function(bm,lastRead){
		var divs = document.getElementsByClassName("ignoreFejlec");
		for(x in divs){
			if(divs[x].style.display == ''){
				divs[x].style.display = 'none';
				showAllIgnored.innerHTML = 'show_ignored_(' + showAllIgnored.ignoraltakSzama + ',_' + showAllIgnored.ignoraltakSzamaUj + '_new)';
			}else{
				divs[x].style.display = '';
				showAllIgnored.innerHTML = 'hide_ignored_(' + showAllIgnored.ignoraltakSzama + ',_' + showAllIgnored.ignoraltakSzamaUj + '_new)';
			}
		}
	});
}

function hideIgnoredPosts(parent,bookmarked,showAllIgnored){
	var ignoraltakSzama = 0;
	showAllIgnored.ignoraltakSzamaUj = 0;
	var posts = parent.getElementsByTagName("a");
	for(x in posts)
		if(posts[x].name.match("uanc")){
			// FF 2.x patch
			if(typeof posts[x] == 'number') continue;
			
			var aaa = posts[x].nextSibling.nextSibling;
			var postNo = posts[x].name.substring(4,posts[x].name.length);
			var poster = aaa.firstChild.firstChild.childNodes[1].getElementsByTagName("a");
			var posterName = poster[0].innerHTML.substring(3, poster[0].innerHTML.length-4);
			
			var valasz = aaa.nextSibling.nextSibling.firstChild.firstChild.childNodes[2].lastChild;
			valasz = valasz.getElementsByTagName("a");
			valasz = valasz[0].innerHTML;
			//van elozmeny?
			if( valasz.search(/Előzmény/) != -1 ){
				valasz = valasz.substring(10, valasz.search(/\&nbsp/));
			}else valasz = null;
			
			//ha elertuk a konzvjelzot
			if(postNo == bookmarked) showAllIgnored.ignoraltakSzamaUj = ignoraltakSzama;
			
			//GG eliminalasa
			if(('Gaston Glock' == posterName) || ('Gaston Glock' == valasz)){
					ignoraltakSzama++;
					var div1 = document.createElement("div");
					div1.className = 'ignoreFejlec';
					div1.style.display = "none";
					var div1Table = document.createElement("table");
					div1Table.width = '100%';
					div1Table.style.borderWidth = '3';
					div1Table.style.borderColor = 'red';
					div1Table.style.borderStyle = 'solid';
					var div1TR = document.createElement("TR");
					div1Table.appendChild(div1TR);
					var div1TD = document.createElement("TD");
					div1TR.appendChild(div1TD);
					
					div1TD.appendChild(aaa.cloneNode(true));
					
					for(k=0;k<4;k++){
						var tmp = aaa.nextSibling;
						div1TD.appendChild(tmp.cloneNode(true));
						tmp.parentNode.removeChild(tmp);
					}
					
					div1.appendChild(div1Table);
					
					for(k=0;k<3;k++){
						var tmp = aaa.nextSibling;
						div1.appendChild(tmp.cloneNode(true));
						tmp.parentNode.removeChild(tmp);
					}
					
					aaa.parentNode.replaceChild(div1,aaa);
			}
	}
	if(bookmarked == null) showAllIgnored.ignoraltakSzamaUj = ignoraltakSzama;
	showAllIgnored.innerHTML = showAllIgnored.innerHTML + '_(' + ignoraltakSzama + ',_' + showAllIgnored.ignoraltakSzamaUj + '_new)';
	showAllIgnored.ignoraltakSzama = ignoraltakSzama;
}

function set_function(func, new_func){
	if(typeof unsafeWindow == "object"){
		unsafeWindow[func] = new_func;
	}
}