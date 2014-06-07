// ==UserScript==
// @name           favotter threshold
// @namespace      http://twitter.com/rokudenashi
// @include        http://favotter.matope.com/user.php*
// ==/UserScript==

var timeline=document.getElementById('timeline')
var url=window.location.href
var ul=document.createElement('ul')
ul.setAttribute('class','thresh-link')
if (!url.match(/threshold=/)) url+='&threshold=0'
threshold=url.match(/threshold=(\d+)/)[1]
function threshold_link(link_threshold,current_threshold,url,color) {
	return '<li><a href="'
		+url.replace(/threshold=\d+/,'threshold='+link_threshold)
		+'" style="'
		+((link_threshold==current_threshold)?
			('background:'+color+';color:white'):
			('color:'+color))
		+'">'+link_threshold+'favs</a></li>'
}
innerHTML=threshold_link(2,threshold,url,'#009900')
innerHTML+=threshold_link(3,threshold,url,'#333399')
innerHTML+=threshold_link(5,threshold,url,'#FF0000')
timeline.parentNode.insertBefore(ul,timeline)
ul.innerHTML=innerHTML
