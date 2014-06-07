// ==UserScript==
// @name           Twitter Youtube Prev
// @namespace      youtube
// @description    View Youtube Videos on Twitter directly
// @include        http://twitter.com/*
// ==/UserScript==
f = document.getElementById("profile");
f.innerHTML = f.innerHTML+"<span id='yt1' style='position: fixed; bottom: 240px; right: 5px; color: #ff0000; font-weight: bold; font-size: 20px; background-color: #999; padding: 5px; cursor: pointer; display: none;' onclick=\"document.getElementById('yt').style.display = 'none'; document.getElementById('yt1').style.display = 'none'; \">X</span><div id='yt' style='display: none; position: fixed; bottom: 0; right: 0; width: 320px; height: 240px; background-color: #fff; border-top: 1px solid #000; border-left: 1px solid #000; z-index: 20;'></div>";
  var myLinks = document.links;
  for(var i=0;i < myLinks.length;i++) {
    var thehref = myLinks[i].href.toString();
    if(thehref.indexOf("youtube.com") != -1){
	vid = thehref.split("http://www.youtube.com/watch?v=")[1];
	myLinks[i].setAttribute('onmouseover',"document.getElementById('yt').style.display = 'block'; document.getElementById('yt1').style.display = 'block'; document.getElementById('yt').innerHTML = '<object type=\"application/x-shockwave-flash\" style=\"width:320px; height:240px;\" data=\"http://www.youtube.com/v/"+vid+"&amp;hl=de&amp;fs=1&amp;rel=0&amp;color1=0xfff&amp;color2=0x999&amp;hd=1\"><param name=\"movie\" value=\"http://www.youtube.com/v/"+vid+"&amp;hl=de&amp;fs=1&amp;rel=0&amp;color1=0xfff&amp;color2=0x999&amp;hd=1\"></object>'");
	} else if(thehref.indexOf("youtu.be") != -1) {
	vid = thehref.split("/")[3];
	myLinks[i].setAttribute('onmouseover',"document.getElementById('yt').style.display = 'block'; document.getElementById('yt1').style.display = 'block'; document.getElementById('yt').innerHTML = '<object type=\"application/x-shockwave-flash\" style=\"width:320px; height:240px;\" data=\"http://www.youtube.com/v/"+vid+"&amp;hl=de&amp;fs=1&amp;rel=0&amp;color1=0xfff&amp;color2=0x999&amp;hd=1\"><param name=\"movie\" value=\"http://www.youtube.com/v/"+vid+"&amp;hl=de&amp;fs=1&amp;rel=0&amp;color1=0xfff&amp;color2=0x999&amp;hd=1\"></object>'");
	}
  }