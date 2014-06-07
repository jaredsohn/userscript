// ==UserScript==
// @id             
// @name           Anime Club script
// @version        134 Jan,03 ,2013
// @author         Shinypony
// @description    This script is for the emotes in the Anime Club synchtube.
// @include        http://www.synchtube.com/r/animeclassics*
// @run-at         document-end
// ==/UserScript==
(function(){
document.addEventListener("DOMContentLoaded", function(){
var facecodes={

//emotes
":haruhi:":'<img src="http://i.imgur.com/WUwvapY.gif">',
":yui:":'<img src="http://i.imgur.com/lUYbbrR.gif" height="80px">',
":faggotalert:":'<img src="http://i.imgur.com/rnSUHBt.gif" height="80px">',
":masturbating:":'<img src="http://i.imgur.com/B3jV82V.png" height="80px">',
":frustrated:":'<img src="http://i.imgur.com/kjzdm0l.gif" height="80px">',
":feels:":'<img src="http://i.imgur.com/y8hFxhP.gif">',
//":name here:":'<img src="imgurlink" width="x" height="y">',

//Text Filters
//":word to filter:":'filters to this',
"anime":'animu',
"Anime":'animu',
"faggots":'wonderful and creative people',
"faggot":'wonderful and creative person',
"9000":'8999',
"9001":'8999',
"nine thousand":'8999',
"ninethousand":'8999',
"NINE THOUSAND":'8999',
"NINETHOUSAND":'8999',
"nine thousand one":'8999',
"ninethousandone":'8999',
"nine thousand and one":'8999',
"ninethousandandone":'8999',

// Colored text:
':end:' : '</span>',
':e:' : '</span>',
':b:' : '<b>',
':/b:' : '</b>',
':yellow:' : '<span style="color:#eeda3d">',
':blue:' : '<span style="color:#088bcb">',
':cyan:' : '<span style="color:cyan">',
':red:' : '<span style="color:#e52f35">',
':green:' : '<span style="color:#4cac37">',
':violet:' : '<span style="color:violet">',
':purple:' : '<span style="color:#5d2484">',
':orange:' : '<span style="color:#ffaf4c">',
':brown:' : '<span style="color:brown">',
':deeppink:' : '<span style="color:deeppink">',
':indigo:' : '<span style="color:indigo">',
':pink:' : '<span style="color:pink">',
':chocolate:' : '<span style="color:chocolate">',
':silver:' : '<span style="color:silver">',
':tan:' : '<span style="color:tan">',
':implying:' : '<span style="color:#789922">',
'shinypony:' : '<span style="color:red; font-weight:bold;">Shiny the Great:</span>',
'shinypony' : '<span style="color:red; font-weight:bold;">Shinypony</span>',
'shiny' : '<span style="color:red; font-weight:bold;">Shinypony</span>',
'Faggot666:' : '<font color="Purple">Faggot</font><font color="Pink">666</font>:',
':s:':'<span class="spoiler">',
'CoInPo:' : '<HTML><FONT COLOR="#FF0000">C</FONT><FONT COLOR="#FFFF00">o</FONT><FONT COLOR="#FFff00">I</FONT><FONT COLOR="#00ff00">n</FONT><FONT COLOR="#00ff00">P</FONT><FONT COLOR="#00ffFF">o</FONT></HTML>',
 
}
		var id= document.getElementById("chat_list");
		var chatstring;
		id.addEventListener("DOMNodeInserted", function(event){
			var element = event.target;
			if(element.innerHTML){
				chatstring=element.innerHTML;
				for(var emotes in facecodes){
					var regexps=new RegExp(emotes,'g');
					chatstring = chatstring.replace(regexps,facecodes[emotes]);
				}
				element.innerHTML=chatstring;
			}
		});
}, false);
})();