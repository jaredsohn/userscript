// ==UserScript==
// @name           GLB Return of the Quote Pyramid (Updated to add new smilies)
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
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/boohoo.gif">/gi, ":boohoo:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/grin.gif">/gi, ":grin:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/happy.gif">/gi, ":happy:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/love.gif">/gi, ":love:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/confused.gif">/gi, ":confused:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/evil.gif">/gi, ":evil:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/omg.gif">/gi, ":omg:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/eyeroll.gif">/gi, ":eyeroll:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/kiss.gif">/gi, ":kiss:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/irked.gif">/gi, ":irked:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/angry.gif">/gi, ":angry:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/worried.gif">/gi, ":worried:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/clap.gif">/gi, ":clap:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/skeptical.gif">/gi, ":skeptical:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/meh.gif">/gi, ":meh:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/bow.gif">/gi, ":bow:");
                  content = content.replace(/<img src="\/images\/game\/forum\/smileys\/rofl.gif">/gi, ":rofl:");
	content = content.replace(/<img src="\/images\/game\/forum\/smileys\/xd.gif">/gi, "XD");
	content = content.replace(/<img src="\/images\/game\/forum\/smileys\/neenerneener.gif">/gi, ":neenerneener:");
	content = content.replace(/<img src="\/images\/game\/forum\/smileys\/police.gif">/gi, ":cop:");
	content = content.replace(/<img src="\/images\/game\/forum\/smileys\/facepalm.gif">/gi, ":facepalm:");

	content = content.replace(/<[^>]*>/gi, '');
	content = content.replace(/^\n\n/i, '');
	return content;
};
