// ==UserScript==
// @name        BluxPick
// ==/UserScript==

// javascript:(function(){dirtypop();function%20dirtypop()%20{var%20generator=window.open(%27%27,%27name%27,%27height=500,width=500%27);var%20alllinks%20=%20document.getElementsByTagName(%27a%27);var%20links%20=%20unique(alllinks);generator.document.write(%27<html><head><title>Your%20Friends%20Selector%20Bmlet</title>%27);generator.document.write(%27</head><body>%27);generator.document.write(%27<pre>Friends%20Selector%20BMLEt</pre><textarea%20rows=%2220%22%20cols=%22100%22>%27);generator.document.write(%27javascript:(function(){%20function%20checkFrames(w)%20{try%20{var%20inputs%20=%20w.document.getElementsByTagName(%22input%22);for%20(var%20i=0;%20i%20<%20inputs.length;%20i++){if%20(inputs[i].type%20&&%20inputs[i].type%20==%20%22checkbox%22){%27);for(i%20=%200;%20i%20<%20links.length;%20i++)%20{if%20(match=/[profile.php?]id=(\d+)/.exec(links[i].href))%20{generator.document.write(%27if(inputs[i].value==%22%27+match[1]+%27%22)inputs[i].checked=true;%27);}}generator.document.write(%27}}}catch%20(e){}if(w.frames%20&&%20w.frames.length>0){for(var%20i=0;i<w%20.frames.length;i++){var%20fr=w.frames[i];checkFrames(fr);}}}checkFrames(window);})()%27);generator.document.write(%27</textarea><pre><a%20href=%22javascript:self.close()%22>Close</a>%20the%20popup.</pre>%27);generator.document.write(%27</body></html>%27);generator.document.close();function%20unique(a)%20{var%20o%20=%20{},%20i,%20l%20=%20a.length,%20r%20=%20[];for(i=0;%20i<l;i++)%20o[a[i]]%20=%20a[i];for(i%20in%20o)%20r.push(o[i]);return%20r;}}})()

(function(){

  dirtypop();

	function dirtypop() {
		var generator=window.open('','name','height=500,width=500');
		//var alllinks = Array.filter( document.getElementsByClassName('info'), function(elem){  
 		//return elem.nodeName == 'A';});
		var alllinks =document.getElementsByClassName('info');
		//var alllinks = document.getElementsByTagName('a');
		var links=[];
		for(i = 0; i < alllinks.length; i++) {
		if ((match=/[profile.php?]id=(\d+)/.exec(alllinks[i].innerHTML))&&(/Mafia Wars/.test(alllinks[i].innerHTML))) {
		links.push(match[1]);
		}
		}
		var uniquelinks = unique(links);
		generator.document.write('<html><head><title>Your Friends Selector Bmlet</title>');
		generator.document.write('</head><body>');
		generator.document.write('<pre>Pistol Pete People Picker BMLEt Builder</pre><br>Drag this BMlet to your Toolbar<br><a href="');
		generator.document.write('javascript:(function(){	function checkFrames(w) {try {var inputs = w.document.getElementsByTagName(%27input%27);for (var i=0; i < inputs.length; i++){if (inputs[i].type && inputs[i].type == %27checkbox%27){');
		
		for(i = 0; i <= 40; i++) {			
			generator.document.write('if(inputs[i].value==%27'+uniquelinks[i]+'%27)inputs[i].checked=true;');	
		}
		
		generator.document.write('}}}catch (e){}if(w.frames && w.frames.length>0){for(var i=0;i<w .frames.length;i++){var fr=w.frames[i];checkFrames(fr);}}}checkFrames(window);})()');

		generator.document.write('">PP People Picker</a><pre><a href="javascript:self.close()">Close</a> the popup.</pre>');
		generator.document.write('</body></html>');
		generator.document.close();

function unique(a) {

    var o = {}, i, l = a.length, r = [];
    for(i=0; i<l;i++) o[a[i]] = a[i];
    for(i in o) r.push(o[i]);
    return r;
}

}  


}
)()



