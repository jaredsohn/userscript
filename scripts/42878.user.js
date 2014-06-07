// ==UserScript==
// @name           zapemo
// @namespace      http://www.userscripts.org/
// @include        *:88/forums.php?*
// @include        *:88/comment.php?*
// @include        *:88/markets.php?*

// ==/UserScript==

var str =eval("[[':-)','smile1.gif'],[':smile:','smile2.gif'],[':-D','grin.gif'],[':lol:','laugh.gif'],[':w00t:','w00t.gif'],[':-P','tongue.gif'],[';-)','wink.gif'],[':-|','noexpression.gif'],[':-/','confused.gif'],[':-(','sad.gif'],[':weep:','weep.gif'],[':innocent:','innocent.gif'],[':whistle:','whistle.gif'],[':unsure:','unsure.gif'],[':closedeyes:','closedeyes.gif'],[':cool:','cool2.gif'],[':fun:','fun.gif'],[':thumbsup:','thumbsup.gif'],[':thumbsdown:','thumbsdown.gif'],[':blush:','blush.gif'],[':yes:','yes.gif'],[':?:','question.gif'],[':!:','excl.gif'],[':idea:','idea.gif'],[':arrow:','arrow.gif'],[':arrow2:','arrow2.gif'],[':hmm:','hmm.gif'],[':hmmm:','hmmm.gif'],[':huh:','huh.gif'],[':geek:','geek.gif'],[':look:','look.gif'],[':rolleyes:','rolleyes.gif'],[':wacko:','wacko.gif'],[':alien:','alien.gif'],[':wizard:','wizard.gif'],[':wave:','wave.gif'],[':wavecry:','wavecry.gif'],[':baby:','baby.gif'],[':angry:','angry.gif'],[':ras:','ras.gif'],[':sly:','sly.gif'],[':devil:','devil.gif'],[':evil:','evil.gif'],[':evilmad:','evilmad.gif'],[':sneaky:','sneaky.gif'],[':axe:','axe.gif'],[':slap:','slap.gif'],[':wall:','wall.gif'],[':jump:','jump.gif'],[':yucky:','yucky.gif'],[':nugget:','nugget.gif'],[':smart:','smart.gif'],[':shutup:','shutup.gif'],[':shutup2:','shutup2.gif'],[':crockett:','crockett.gif'],[':zorro:','zorro.gif'],[':snap:','snap.gif'],[':rambo:','rambo.gif'],[':ninja:','ninja.gif'],[':hannibal:','hannibal.gif'],[':party:','party.gif'],[':snorkle:','snorkle.gif'],[':evo:','evo.gif'],[':king:','king.gif'],[':chef:','chef.gif'],[':mario:','mario.gif'],[':pope:','pope.gif'],[':fez:','fez.gif'],[':cap:','cap.gif'],[':cowboy:','cowboy.gif'],[':pirate:','pirate.gif'],[':pirate2:','pirate2.gif'],[':rock:','rock.gif'],[':cigar:','cigar.gif'],[':icecream:','icecream.gif'],[':oldtimer:','oldtimer.gif'],[':trampoline:','trampoline.gif'],[':banana:','bananadance.gif'],[':smurf:','smurf.gif'],[':yikes:','yikes.gif'],[':osama:','osama.gif'],[':saddam:','saddam.gif'],[':santa:','santa.gif'],[':indian:','indian.gif'],[':pimp:','pimp.gif'],[':nuke:','nuke.gif'],[':jacko:','jacko.gif'],[':ike:','ike.gif'],[':greedy:','greedy.gif'],[':super:','super.gif'],[':wolverine:','wolverine.gif'],[':spidey:','spidey.gif'],[':spider:','spider.gif'],[':bandana:','bandana.gif'],[':construction:','construction.gif'],[':sheep:','sheep.gif'],[':police:','police.gif'],[':detective:','detective.gif'],[':clover:','clover.gif']]");
var logo = document.createElement("div");

function insertAtCursor(myField, myValue) {
	var startPos = myField.selectionStart;
	var endPos = myField.selectionEnd;
	myField.value = myField.value.substring(0, startPos)
							+ myValue
							+ myField.value.substring(endPos, myField.value.length);
}


function setsmile(event){
      if(window.location.href.toLowerCase().match("comment.php?")){
		insertAtCursor(document.getElementsByName("text")[0],event.target.id);
		document.getElementsByName("text")[0].focus();

      }else if(window.location.href.toLowerCase().match("forums.php?") || window.location.href.toLowerCase().match("markets.php?")){
		insertAtCursor(document.getElementsByName("body")[0],event.target.id);
		document.getElementsByName("body")[0].focus();
      }
}

var HTML = "<div align='center'>";

for (var i=0; i < str.length ; i++) {

	var suggest = "<img src='/pic/smilies/"+str[i][1]+"' id='"+str[i][0]+"' />";
	
	if((i+1) % 25 ==0) suggest += "<br>";
	HTML += suggest;
}

HTML += "</div>";
logo.innerHTML = HTML;

if(window.location.href.toLowerCase().match("comment.php?")){
     toolb = document.getElementsByName("text")[0]
     toolb.parentNode.insertBefore(logo,toolb);

}else if(window.location.href.toLowerCase().match("forums.php?") || window.location.href.toLowerCase().match("markets.php?")){
     toolb = document.getElementsByName("body")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}

for (var i=0; i < str.length ; i++) {
	document.getElementById(str[i][0]).addEventListener("click", setsmile, true);	
}