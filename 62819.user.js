// ==UserScript==
// @name           LUEquickget - text version
// @namespace      By Kalphak
// @description    Quickly allows you to get MU links from the page
// @include        http://links.endoftheinter.net/links.php*
// @include        https://links.endoftheinter.net/links.php*
// ==/UserScript==

// By Kalphak


var sp=document.getElementsByTagName("td");

function disp_link(link){
	if (link.length > 55){
		return link.slice(0, 25)+'&hellip;'+link.slice(link.length-25, link.length);
	}else{
		return link;
	}
}

function get_link(id,no){
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://links.endoftheinter.net/linkme.php?l='+id,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
    },
    onload: function(responseDetails) {
		var val = sp[no].innerHTML;
		var img="";
                var data = responseDetails.responseText;
		var reg = new RegExp(/<\/h1>\n  <br \/><br \/>\n  <a href="(.+?)" target="_blank">/gi);
		var link = data.match(reg);
		if (link != null){
		link=link.join("").slice(32,-18);
			img = (link.indexOf("megaupload.com") >= 0) ? "http://i4.endoftheinter.net/i/n/3900080b9586ce7a056cc50e71137318/dl.png" : "http://i2.endoftheinter.net/i/n/deca1972ef677a25b18ef8235c232e22/utdfj.png";
			sp[no].innerHTML=val+'<a href="'+link+'" title="'+link+'" target="_blank"><small style="float: right; color:#555;">'+disp_link(link)+'</small></a>';

		}

    }
});
}


var id="";
var link="";
var re = new RegExp(/l=(.+?)">/gi);

//var poop = sp[5].innerHTML.match(re).join("").slice(2, -2);
//alert(poop);
for(var i=0;i<50;i++){
	val = sp[5*i].innerHTML;
	id = sp[5*i].innerHTML.match(re).join("").slice(2, -2);
	get_link(id,(5*i));
}
