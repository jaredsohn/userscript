// ==UserScript==
// @name           Reddit/RES Image Links Fixer
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @include        https://reddit.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.thing a.title.visited { color:#551a8b }');

var sstorage = localStorage.viewedimgs;

unsafeWindow.img_expand = function(id){
	var link = document.getElementById(id);
	//console.log("link: " + link.getAttribute("href"));
	if(link.getAttribute('class').indexOf('visited') == -1)
		link.setAttribute('class', link.getAttribute('class') + ' visited');
	if(sstorage.indexOf(link.getAttribute("href")) == -1){
		sstorage += link.getAttribute("href") + "\n";
		//alert(sstorage);
		localStorage.viewedimgs = sstorage;
	}
	
}

//  javascript:alert(localStorage.viewedimgs)

//var all_a = document.getElementsByTagName("a");
var j = 0;

unsafeWindow.process_imgs = function(all_a){
	for(i = 0; i < all_a.length; i++){
		if(all_a[i].getAttribute("class") != null){
			if(all_a[i].getAttribute("class").indexOf("expando-button") > -1){
				//if(!s) alert("asdf");
				//s = true;
				var expbutton = all_a[i];
				//expbutton.parentNode.childNodes[0].childNodes[0].id = "asdf123";
				//alert(expbutton.parentNode.childNodes[0].childNodes.length);
				if(expbutton.parentNode.firstChild != null){
					j++;
					var link = expbutton.parentNode.firstChild.firstChild;
					link.setAttribute("id", "visited_link_" + j);
					expbutton.setAttribute("onclick", "img_expand('" + "visited_link_" + j + "')");
					//console.log(sstorage + "\n" + link.getAttribute("href"));
					if(link.getAttribute("href").indexOf("imgur") != -1){
						if(sstorage.indexOf(link.getAttribute("href").substring(link.getAttribute("href").lastIndexOf("/"))) != -1){
							// weird imgur link transformation
							//console.log("found a viewed link " + link.getAttribute("href"));
							if(link.getAttribute('class').indexOf('visited') == -1)
								link.setAttribute('class', link.getAttribute('class') + ' visited');
						}
					}
					if(sstorage.indexOf(link.getAttribute("href")) != -1){
						// already viewed this link!
						//console.log("found a viewed link " + link.getAttribute("href"));
						if(link.getAttribute('class').indexOf('visited') == -1)
							link.setAttribute('class', link.getAttribute('class') + ' visited');
					}
					//link.setAttribute("class", link.getAttribute("class" + " visited"));
				}
			}
		}
	}
}



		
document.body.addEventListener('DOMNodeInserted', function(event) {
	if(event.target.tagName == 'DIV' && event.target.getAttribute('id') == 'siteTable'){
		
		unsafeWindow.process_imgs(event.target.getElementsByTagName("a"));
		//console.log("wtf");
	}
}, true);

unsafeWindow.process_imgs(document.getElementsByTagName("a"));