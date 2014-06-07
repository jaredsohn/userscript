// ==UserScript==
// @name           GLB Return of the Quote Pyramid
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_thread.pl*
// ==/UserScript==

window.setTimeout( function() 
{
	main();
}, 100);

function main() {
	var elPostButtons = getElementsByClassName("post_buttons",document);
	for(var j=0; j<elPostButtons.length; j++) {
		var elButtons = getElementsByClassName("buttonSmall",elPostButtons[j])
		for(var i=0; i<elButtons.length; i++) {
			if(elButtons[i].innerHTML=="<span>Quote</span>") {
				elButtons[i].name=j;
				elButtons[i].addEventListener("click", buttonClick, false);
			}
		}
	}	
};

function buttonClick() {
	var postNum = this.name;
	var content = getElementsByClassName("post_content_inner",document)[postNum].innerHTML;
	var userName = getElementsByClassName("user_name", document)[postNum];
	var user = userName.getElementsByTagName("a")[0].innerHTML;
	
	console.log('test');
	content = content.replace(/\<span class=\"?quote\"?\>Originally posted by \<b\>([^\<]*)\<\/b\>/gim, "[QUOTE=$1]");
	content = content.replace(/\<span style=\"?\"? class=\"?quote\"?\>Originally posted by \<b\>([^\<]*)\<\/b\>/gim, "[QUOTE=$1]");
	content = content.replace(/\<span class=\"?quote\"? style=\"?\"?\>Originally posted by \<b\>([^\<]*)\<\/b\>/gim, "[QUOTE=$1]");
	content = content.replace(/\<\/span\>/gim, "[/QUOTE]");
	content = reply_replace(content);
	document.getElementById('reply_box').value = "[QUOTE=" + user +"]" + content + "[/QUOTE]\n\n";
};

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

function reply_replace(content) {
	content = content.replace(/<br>/gi, "\n");
	content = content.replace(/<b>/gi, "[B]");
	content = content.replace(/<\/b>/gi, "[/B]");
	content = content.replace(/<i>/gi, "[I]");
	content = content.replace(/<\/i>/gi, "[/I]");
	content = content.replace(/<u>/gi, "[U]");
	content = content.replace(/<\/u>/gi, "[/U]");
	content = content.replace(/<img src="\/images\/game\/forum\/smileys\/smile.gif">/gi, ":)");
	content = content.replace(/<img src="\/images\/game\/forum\/smileys\/wink.gif">/gi, ";)");
	content = content.replace(/<img src="\/images\/game\/forum\/smileys\/tongue.gif">/gi, ":P");
	content = content.replace(/<img src="\/images\/game\/forum\/smileys\/biggrin.gif">/gi, ":D");
	content = content.replace(/<img src="\/images\/game\/forum\/smileys\/blink.gif">/gi, "o_O");
	content = content.replace(/<img src="\/images\/game\/forum\/smileys\/sad.gif">/gi, ":(");
	content = content.replace(/<[^>]*>/gi, '');
	content = content.replace(/^\n\n/i, '');
	return content;
};
