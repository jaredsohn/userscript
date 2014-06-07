// ==UserScript==
// @name          Better BFBC2 forums
// @namespace     this_name_taken/gm_scripts
// @description   Calculates signature height, changes a bit layout in order to lower posts height
// @include       http://forums.electronicarts.co.uk/battlefield-bad-company-2-pc/*
// ==/UserScript==

/*
	Signature calculator for BFBC2 forums
	by this_name_taken
	version 1
	its ugly
*/

function $(id){try{return document.getElementById(id);}catch(e){return false;}}

function calculate_signatures_height() {
	var posts = $('posts');
	if(posts === null || posts === false) return false;
	var posts = posts.childNodes;
	var x=posts.length, _posts = [];
	for(var i = 0; x > i; i++) {
		if(posts[i].nodeType !== 1 || posts[i].id === 'lastpost') continue; //new line or sth
		_posts.push(posts[i]);
	}

	var x = _posts.length, has_awful_dom = null;
	if(document.body.childNodes[0].nodeType === 3) var has_awful_dom = true;
	else var has_awful_dom = false;

	for(i = 0; x > i; i++) {
		if(has_awful_dom) {
			try {
				var top = _posts[i].childNodes[1].childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[2];
			} catch(e) {
				//last post has a bit less clutter in one of its nodes, should I just regexp post id and $(postid)?
				var top = _posts[i].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes[2];
			}
			var td_post = top.childNodes[3];
			var alt2 = top.childNodes[1];
			fix_layout(top);
		}
		else return false; //there is only One Greasemonkey, all hail Firefox
		
		var has_sig = false, sig_height = 0, append_text = 'No signature', append_text2 = '';
		if(td_post.childNodes.length > 15) {
			var has_sig = true;
			var sig_height = td_post.childNodes[17].clientHeight;
			var append_text = 'Signature height: '+sig_height+'px';
			var append_text2 = 'Signature content height: '+(sig_height-16)+'px'; //magical number 16 was calculated via "image in signature has 150px height. There is no clutter in it or any other crap. Lets subtract that from the height of whole div.
		}
		//there are 2 separate div's, cause sometimes I might need to color in red just one of those or sth.
		if(sig_height > 150) {
			var div = document.createElement('div');
			div.className = 'smallfont';
			div.style.clear = 'left';
			div.appendChild(document.createTextNode(append_text));
			div.style.color = 'red';
			alt2.appendChild(div);

			var div = document.createElement('div');
			div.className = 'smallfont';
			div.appendChild(document.createTextNode(append_text2));
			if(sig_height > 166) div.style.color = 'red';
			alt2.appendChild(div);
		}
		if(has_sig) remove_warnings_from_images(td_post.childNodes[17]); //should delay it? those things don't always appear the instant window.onload is fired
	}
}

function fix_layout(top) {
	var td_post = top.childNodes[3];
	var alt2 = top.childNodes[1];

	var title = td_post.childNodes[3];
	if(title.childNodes.length < 5) {
		title.style.display = 'none';
		td_post.childNodes[5].style.display = 'none'; //<hr />
	}

	var avatar = alt2.childNodes[5].childNodes[2];
	if(avatar.nodeName === 'A') {//avatar
		alt2.childNodes[5].style.cssFloat = 'left';
		alt2.childNodes[5].style.marginRight = '5px';
		var meta = alt2.childNodes[7];
	} else {
		var meta = alt2.childNodes[5];
	}
	try{
		var meta = meta.childNodes, x = meta.length;
		for(var i = 0; x > i; i++) {
			if(meta[i].nodeType !== 1 || meta[i].hasChildNodes()===false || meta[i].firstChild.nodeType === 1 || meta[i].firstChild.textContent.match(/^\s*$/)) continue;
			var parts = meta[i].textContent.split(/:/, 2);
			var b = document.createElement('b');
			if(parts[0] === 'Join Date') parts[0] = 'Joined';
			b.textContent = parts[0];
			meta[i].removeChild(meta[i].firstChild);
			meta[i].appendChild(b);
			meta[i].appendChild(document.createTextNode(':'+parts[1]));
		}
	}catch(e){}
	
	try {
		var bottom_row = top.nextSibling.nextSibling;
		var report_button = bottom_row.childNodes[1].childNodes, x = report_button.length, div = document.createElement('div');
		for(var i = 0; x > i; i++) {
			div.appendChild(report_button[i].cloneNode(true));
		}
		bottom_row.removeChild(bottom_row.childNodes[1]);
		alt2.setAttribute('rowspan', '2');
		alt2.style.borderBottom = '1px solid black'
		div.className = 'smallfont';
		alt2.appendChild(div);
	}catch(e){}

        //causing overlay issues
	/*td_post.style.borderBottom = '1px solid black';
	bottom_row.style.cssFloat = 'right';
	bottom_row.style.height = '0px';
	bottom_row.style.position = 'relative';
	bottom_row.style.top = '-22px';
	
	bottom_row.childNodes[2].style.border = '0';
	bottom_row.childNodes[2].style.borderRight = '1px solid black';
	bottom_row.childNodes[2].style.padding = '0';
	bottom_row.childNodes[2].style.paddingRight = '6px';*/

	//this is not good. Too much hassle to move those buttons and make em working again. CSS hack above should be better
	/*try {
		var quote_button = bottom_row.childNodes[2].childNodes, x = quote_button.length, div = document.createElement('div');
		for(var i = 0; x > i; i++) {
			div.appendChild(quote_button[i].cloneNode(true));
		}
		bottom_row.parentNode.removeChild(bottom_row);
		alt2.setAttribute('rowspan', '1');
		td_post.style.borderBottom = '1px solid black'
		div.className = 'smallfont';
		div.style.cssFloat = 'right';
		
		var lastDiv = td_post.lastChild;
		while(lastDiv.nodeType !== 1) {
			lastDiv = lastDiv.previousSibling;
		}
		lastDiv.appendChild(div);
	}catch(e){}*/
}

function remove_warnings_from_images(el) {
	return false; // comment this if you want this function to try and remove those yellow warnings above images
	if(!el.getElementsByClassName) return false;
	var warnings = el.getElementsByClassName('ncode_imageresizer_warning'), x = warnings.length;
	for(var i = 0; x > i; i++) {
		warnings[0].parentNode.removeChild(warnings[0]);
	}
}

//It doesn't wait for images to load, so it was a bad idea to use this ~_~
//document.addEventListener('DOMContentLoaded', calculate_signatures_height, false);
//thats better... I hope
window.onload = calculate_signatures_height();
