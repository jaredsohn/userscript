// ==UserScript==
// @name           singlepager
// @namespace      http://userscripts.org/users/21452
// @description    automatically load web pages by scrolling down
// @include        http://*.craigslist.org/*
// @include	http://www.the-huddle.org/*
// ==/UserScript==

window.addEventListener( 'scroll', function (){
 		var height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
		var remain = height - window.innerHeight - window.scrollY;
		if (remain < 320){
			if (window.location.toString().indexOf('craigslist') != -1){
				links = document.getElementsByTagName('a')
				for(i = 0; i < links.length; i++)
				{
					if (/\d+\.html$/.test(links[i].href)){
						GM_xmlhttpRequest({url:links[i].href, method:'get', onload:function(r){
							n = document.body.appendChild(document.createElement('div'))
							n.innerHTML = r.responseText.toString();
							hr = n.getElementsByTagName('hr')
							while(hr[0])
								hr[0].parentNode.removeChild(hr[0])
						}})
						links[i].parentNode.removeChild(links[i])
						break;
					}
				}
			}
			else {
				l = document.getElementsByClassName('tableOfContents')[0].getElementsByTagName('ul')[0].getElementsByTagName('a')[0]
				if(l){
					GM_xmlhttpRequest({url:l.href, method:'get', onload:function(r){
						newContent = document.createElement('div')
						newContent.innerHTML = r.responseText.toString();
						document.body.appendChild(newContent)
						newContent.innerHTML = newContent.getElementsByClassName('article')[0].innerHTML
						newContent.style.width = "27em"
						newContent.style.marginLeft = "2em"
					}})
					l.parentNode.removeChild(l)
					f = document.getElementById('footer')
					if(f)
						f.parentNode.removeChild(f)
				}
			}
		}
}, false)