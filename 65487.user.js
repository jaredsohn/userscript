// ==UserScript==
// @name           FB Profile Dropdown Menu
// @description    Add a dropdown menu for the profile tab on the top bar
// @author         ftbhrygvn
// @namespace      ftbhrygvn
// @include        http://www.facebook.com*
// @include        http://apps.facebook.com*
// @version	       1.1
// @license        Creative Commons Attribution-Share Alike 3.0 Hong Kong
// ==/UserScript==

l = GM_getValue('l','').split(';')
for(e in l) l[e] = l[e].split(',')

function $(i){return document.getElementById(i)}
function node(n){
	if(n=='text') return document.createTextNode(arguments[1])
	o = document.createElement(n)
	for(j=1;typeof arguments[j]=='string';j+=2){
		o.setAttribute(arguments[j],arguments[j+1])
	}
	if(arguments[j]) o.appendChild(arguments[j])
	return o
}

function update(){
	if($('profile_tabs') && $('profile_tabs').childElementCount-2==l.length || ($('profile_name') && $('profile_name').innerHTML!=$('fb_menu_account').textContent)) return
	l = new Array()
	Array.forEach($('profile_tabs').childNodes,function(e,i){
		if(e.id.indexOf('profile_tab')==-1){
			l[i] = [e.textContent.replace(/^\s/,''),e.firstChild.href]
		}
	})
	GM_setValue('l',l.join(';'))
	while(l.length > d.childElementCount) d.appendChild(node('div','class','fb_menu_item',node('a','class','fb_menu_item_link','href',l.slice(d.childElementCount-l.length)[0][1],node('text',l.slice(d.childElementCount-l.length)[0][0]))))
	if(l.length < d.childElementCount){
		for(j=d.childElementCount-1;j>=0;j--) d.removeChild(d.childNodes[j])
		l.forEach(function(e,x){d.appendChild(node('div','class','fb_menu_item',node('a','class','fb_menu_item_link','href',e[1],node('text',e[0]))))})
	}

}
if($('profile_name') && $('profile_name').innerHTML==$('fb_menu_account').textContent) setInterval(update,1000)

document.body.addEventListener('load',function(v){
	if($('fb_menu_profile_dropdown')) return
	$('fb_menu_profile').appendChild(d = node('div','id','fb_menu_profile_dropdown','class','fb_menu_dropdown clearfix'))
	l.forEach(function(e,x){d.appendChild(node('div','class','fb_menu_item',node('a','class','fb_menu_item_link','href',e[1],node('text',e[0]))))})
},true)