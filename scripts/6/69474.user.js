// ==UserScript==
// @name           Tumblr 2 OPML
// @namespace      FB55
// @description    Converts the list of people you follow into a handy opml-file which you can import into your favorite RSS-Reader (Google Reader etc.).
// @include        http://www.tumblr.com/following
// @include        http://www.tumblr.com/following/
// ==/UserScript==

var following, follono, name, link, opml, dlfy, swfo, but, not, dlfi, conta;

dlfy = document.createElement("script");
dlfy.src = "http://dl.dropbox.com/u/2242871/Webcontent/JS/Frameworks/dcneiner-Downloadify-8b1d240/js/swfo_dlfy.js";

document.getElementsByTagName("head")[0].appendChild(dlfy);

following = document.getElementsByClassName("follower");
follono = following.length;
if (follono > 0){
opml = ['<?xml version="1.0" encoding="UTF-8"?><opml version="1.0"><head><title>Tumblr following</title></head><body><outline title="Tumblr following" text="Tumblr following">'];
	var i = follono-1;
	while (i >= 0) {
		conta = following[i].getElementsByClassName("name")[0];
		name = conta.getElementsByTagName("a")[0].innerHTML;
		link = conta.getElementsByTagName("a")[0].getAttribute("href");
		opml.push('<outline text="'+name+'" title="'+name+'" type="rss" xmlUrl="'+link+'rss" htmlUrl="'+link+'"></outline>');

		i--;
	}
opml.push("</outline></body></opml>");
opml = opml.join(" ");

}
else { opml = "You have to subcribe to some tumblogs to use this plugin."; }

but = document.createElement("p");
but.innerHTML = "<p>Loading... <br/> This script needs Flash 10 to create a downloadable file.</p>"
but.setAttribute("style","text-align: center;");
but.id = "opmldlb";
not = document.createElement("div");
not.setAttribute("class","blue_note");
not.setAttribute("style","margin-top:30px; padding:10px 15px;font:normal 13px \'Lucida Grande\',Verdana; line-height:19px;");
not.innerHTML = "<p>Click DOWNLOAD to create an opml file out of your subcribtions!</p>";
not.appendChild(but);

document.getElementById("right_column").appendChild(not);

dlfi = document.createElement("script");
dlfi.innerHTML = "Downloadify.create('opmldlb',{filename:'tumblr-subscriptions.xml',data:'"+opml+"',onCopmlete:function(){},onCancel:function(){},onError:function(){alert('Fail!')},swf:'http://dl.dropbox.com/u/2242871/Webcontent/JS/Frameworks/dcneiner-Downloadify-8b1d240/media/downloadify.swf',downloadImage:'http://dl.dropbox.com/u/2242871/Webcontent/JS/Frameworks/dcneiner-Downloadify-8b1d240/images/download.png',width:100,height:30,transparent:true,append:false});"

document.getElementsByTagName("head")[0].appendChild(dlfi);