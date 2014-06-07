// ==UserScript==
// @name	emoticons of frendz4m
// @version	2.00
// @author	rohanpote0@gmail.com
// @description	Use Animated emoticons(for www.frendz4m.com only) in community Forums. Just click on a smiley to insert. Enjoy, love u frendz4m
// @include        http://*.frendz4m.*/*reply.php*
// @include        http://*.frendz4m.*/*forum*/*showthreads*
// @include        http://*.frendz4m.*/*forum*/*edit.php*
// @include        http://*.frendz4m.*/*forum*/*index2.php*
// @include	   http://*.frendz4m.*/forum/index2.php*
// @include	   http://*.frendz4m.*/*forum*/*pm*/*replypm.php*
// @include	   http://*.frendz4m.*/*forum*/*pm*/*writepm.php*
// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "[img]"+image+"[/img]";
}

function dip() {
	var smileyarr = new Array();	

var smileyarr = new Array();	
smileyarr["mellow"]="http://www.frendz4m.com/forum/images/mellow.gif";
smileyarr["huh"]="http://www.frendz4m.com/forum/images/huh.gif";
smileyarr["happy"]="http://www.frendz4m.com/forum/images/happy.gif";
smileyarr["ohmy"]="http://www.frendz4m.com/forum/images/ohmy.gif";
smileyarr["wink"]="http://www.frendz4m.com/forum/images/wink.gif";
smileyarr["tongue"]="http://www.frendz4m.com/forum/images/tongue.gif";
smileyarr["biggrin"]="http://www.frendz4m.com/forum/images/biggrin.gif";
smileyarr["laugh"]="http://www.frendz4m.com/forum/images/laugh.gif";
smileyarr["cool"]="http://www.frendz4m.com/forum/images/cool.gif";
smileyarr["rolleyes"]="http://www.frendz4m.com/forum/images/rolleyes.gif";
smileyarr["sleep"]="http://www.frendz4m.com/forum/images/sleep.gif";
smileyarr["dry"]="http://www.frendz4m.com/forum/images/dry.gif";
smileyarr["smile"]="http://www.frendz4m.com/forum/images/smile.gif";
smileyarr["wub"]="http://www.frendz4m.com/forum/images/wub.gif";
smileyarr["angrymad"]="http://www.frendz4m.com/forum/images/mad.gif";
smileyarr["sad"]="http://www.frendz4m.com/forum/images/sad.gif";
smileyarr["unsure"]="http://www.frendz4m.com/forum/images/unsure.gif";
smileyarr["wacko"]="http://www.frendz4m.com/forum/images/wacko.gif";
smileyarr["blink"]="http://www.frendz4m.com/forum/images/blink.gif";
smileyarr["ph34r"]="http://www.frendz4m.com/forum/images/ph34r.gif";
smileyarr["Pakistan"]="http://www.frendz4m.com/forum/images/Pakistan.gif";
smileyarr["yawn"]="http://www.frendz4m.com/forum/images/yawn.gif";
smileyarr["yeah"]="http://www.frendz4m.com/forum/images/yeah.gif";
smileyarr["please"]="http://www.frendz4m.com/forum/images/please.gif";
smileyarr["notworthy"]="http://www.frendz4m.com/forum/images/notworthy.gif";
smileyarr["drunk"]="http://www.frendz4m.com/forum/images/drunk.gif";
smileyarr["bb"]="http://www.frendz4m.com/forum/images/bb.gif";
smileyarr["clap2"]="http://www.frendz4m.com/forum/images/clap2.gif";
smileyarr["ban"]="http://www.frendz4m.com/forum/images/ban.gif";
smileyarr["yu"]="http://www.frendz4m.com/forum/images/yu.gif";
smileyarr["yahoo"]="http://www.frendz4m.com/forum/images/yahoo.gif";
smileyarr["tease"]="http://www.frendz4m.com/forum/images/tease.gif";
smileyarr["victory"]="http://www.frendz4m.com/forum/images/victory.gif";
smileyarr["sorry"]="http://www.frendz4m.com/forum/images/sorry.gif";
smileyarr["rtfm"]="http://www.frendz4m.com/forum/images/rtfm.gif";
smileyarr["megashok"]="http://www.frendz4m.com/forum/images/mega_shok.gif";
smileyarr["punish"]="http://www.frendz4m.com/forum/images/punish.gif";
smileyarr["help"]="http://www.frendz4m.com/forum/images/help.gif";
smileyarr["crazy"]="http://www.frendz4m.com/forum/images/crazy.gif";
smileyarr["dance2"]="http://www.frendz4m.com/forum/images/dance2.gif";
smileyarr["dance3"]="http://www.frendz4m.com/forum/images/dance3.gif";
smileyarr["dance"]="http://www.frendz4m.com/forum/images/dance.gif";
smileyarr["friends"]="http://www.frendz4m.com/forum/images/friends.gif";
smileyarr["clapping"]="http://www.frendz4m.com/forum/images/clapping.gif";
smileyarr["drinks"]="http://www.frendz4m.com/forum/images/drinks.gif";
smileyarr["bye"]="http://www.frendz4m.com/forum/images/bye.gif";
smileyarr["India"]="http://www.frendz4m.com/forum/images/India.gif";
smileyarr["birthday"]="http://www.frendz4m.com/forum/images/birthday.gif";
smileyarr["crazydance"]="http://www.frendz4m.com/forum/images/crazydance.gif";
smileyarr["Loser1"]="http://www.frendz4m.com/forum/images/Loser1.gif";
smileyarr["winky"]="http://www.frendz4m.com/forum/images/winky.gif";
smileyarr["angel"]="http://www.frendz4m.com/forum/images/angel.gif";
smileyarr["argue"]="http://www.frendz4m.com/forum/images/argue.gif";
smileyarr["biggrin"]="http://www.frendz4m.com/forum/images/biggrin.gif";
smileyarr["blush"]="http://www.frendz4m.com/forum/images/blush.gif";
smileyarr["bored"]="http://www.frendz4m.com/forum/images/bored.gif";
smileyarr["bounce"]="http://www.frendz4m.com/forum/images/bounce.gif";
smileyarr["cry"]="http://www.frendz4m.com/forum/images/cry.gif";
smileyarr["first"]="http://www.frendz4m.com/forum/images/first.gif";
smileyarr["hug"]="http://www.frendz4m.com/forum/images/hug.gif";
smileyarr["livid"]="http://www.frendz4m.com/forum/images/livid.gif";
smileyarr["wacko"]="http://www.frendz4m.com/forum/images/wacko.gif";
smileyarr["walkman"]="http://www.frendz4m.com/forum/images/walkman.gif";
smileyarr["what"]="http://www.frendz4m.com/forum/images/what.gif";


	

	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);
