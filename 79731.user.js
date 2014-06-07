// ==UserScript==
// @name           Twitter Twitpic, Youtu.be, Tweetphoto Parser
// @namespace      -
// @description    Preview Twitpic, Tweetphoto and Youtu.be links on Twitter.
// @include        http://twitter.com/*
// @version        0.2
// ==/UserScript==

function insertAfter(rN, nN) { rN.parentNode.insertBefore(nN, rN.nextSibling); }

function nodeGetElementById(node, id) {
	for(var i=0;i<node.childNodes.length;) {
		var child= node.childNodes[i++];
		if (child.nodeType!==1) continue;
		if (child.id===id) return child;
		child = nodeGetElementById(child, id);
		if (child!==null) return child;
	}
	return null;
}

function addPreview(a, typ) {
	GM_xmlhttpRequest({
		method: "GET",
		overrideMimeType: "text/html",
		url: a.href,
		onload: function(page) {
      switch(typ) {
        case 'youtube': {
        	var preview = document.createElement("div");
        	preview.id = "preview-" + a.href;
        	
          var youtubeurl = (a.href.replace('http://youtu.be/', '')).replace('?a', '');

          preview.innerHTML = '<object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/' + youtubeurl + '&hl=de_DE&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + youtubeurl + '&hl=de_DE&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>';
          insertAfter(a.parentNode.parentNode.parentNode.parentNode, preview);
          break;
        }
        case 'twitpic': {
        	var preview = document.createElement("img");
        	preview.alt = a.href;
        	preview.id = "preview-" + a.href;
	
    			var fragment = document.createDocumentFragment();
    			var pageContainer = document.createElement("div");
    			pageContainer.innerHTML = page.responseText;
    			fragment.appendChild(pageContainer);
    			var picture = nodeGetElementById(fragment, "photo-display");

    			preview.src = picture.src;
    			insertAfter(a.parentNode.parentNode.parentNode.parentNode, preview);
          break;
        }
        case 'tweetphoto': {
        	var preview = document.createElement("img");
        	preview.alt = a.href;
        	preview.id = "preview-" + a.href;
        	
    			var fragment = document.createDocumentFragment();
    			var pageContainer = document.createElement("div");
    			pageContainer.innerHTML = page.responseText;
    			fragment.appendChild(pageContainer);
    			var picture = nodeGetElementById(fragment, "medium_photo");

    			preview.src = picture.src;
    			insertAfter(a.parentNode.parentNode.parentNode.parentNode, preview);
          break;
        }
      }
		}
	});
}

document.addEventListener("click", function(e) {
	if(e.target.href) {
    // Twitpic
    if(e.target.href.indexOf("youtu.be") != -1) {
			var newPrev = document.getElementById("preview-" + e.target.href);
			if(newPrev) {
				if(newPrev.style.display == "none") {
					newPrev.style.display = "";
				} else {
					newPrev.style.display = "none";
				}
			}
			else {
				addPreview(e.target, 'youtube');
			}
			e.preventDefault();
			return false;
		}
	
    // Twitpic
    if(e.target.href.indexOf("twitpic.com") != -1) {
			var newPrev = document.getElementById("preview-" + e.target.href);
			if(newPrev) {
				if(newPrev.style.display == "none") {
					newPrev.style.display = "";
				} else {
					newPrev.style.display = "none";
				}
			}
			else {
				addPreview(e.target, 'twitpic');
			}
			e.preventDefault();
			return false;
		}
		
		// Tweetphoto
		if(e.target.href.indexOf("tweetphoto.com") != -1) {
      var newPrev = document.getElementById("preview-" + e.target.href);
			if(newPrev) {
				if(newPrev.style.display == "none") {
					newPrev.style.display = "";
				}
				else {
					newPrev.style.display = "none";
				}
			}
			else {
				addPreview(e.target, 'tweetphoto');
			}
      e.preventDefault();
			return false;
		}
	}
	
	if(e.target.id.indexOf("preview-") != -1) e.target.style.display = "none";
}, true);