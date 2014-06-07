// ==UserScript==
// @name           ۝Emo Ero fun۝ by ◄Putri Dhelika Ahmad►
// @namespace      ۝Emo Ero Fun۝
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @version         1.56
// ==/UserScript==
// ◄Putri Dhelika Ahmad►
// Recognize by ◄Putri Dhelika Ahmad►

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
      }else if(window.location.href.toLowerCase().match("sendmessage.php?")){
		insertAtCursor(document.getElementsByName("msg")[0],event.target.id);
		document.getElementsByName("msg")[0].focus();
      }else if(window.location.href.toLowerCase().match("chat.php?")){
		insertAtCursor(document.getElementsByName("shbox_text")[0],event.target.id);
		document.getElementsByName("shbox_text")[0].focus();

      }
}

var logo = document.createElement("div");
var HTML = "";
var str =eval("[[':-)','smile1.gif'],[':smile:','smile2.gif'],[':-D','grin.gif'],[':lol:','laugh.gif'],[':w00t:','w00t.gif'],[':-P','tongue.gif'],[';-)','wink.gif'],[':-|','noexpression.gif'],[':-/','confused.gif'],[':-(','sad.gif'],[':weep:','weep.gif'],[':innocent:','innocent.gif'],[':whistle:','whistle.gif'],[':unsure:','unsure.gif'],[':closedeyes:','closedeyes.gif'],[':cool:','cool2.gif'],[':fun:','fun.gif'],[':thumbsup:','thumbsup.gif'],[':thumbsdown:','thumbsdown.gif'],[':blush:','blush.gif'],[':yes:','yes.gif'],[':?:','question.gif'],[':!:','excl.gif'],[':idea:','idea.gif'],[':arrow:','arrow.gif'],[':arrow2:','arrow2.gif'],[':hmm:','hmm.gif'],[':hmmm:','hmmm.gif'],[':huh:','huh.gif'],[':geek:','geek.gif'],[':look:','look.gif'],[':rolleyes:','rolleyes.gif'],[':wacko:','wacko.gif'],[':alien:','alien.gif'],[':wizard:','wizard.gif'],[':wave:','wave.gif'],[':wavecry:','wavecry.gif'],[':baby:','baby.gif'],[':angry:','angry.gif'],[':ras:','ras.gif'],[':sly:','sly.gif'],[':devil:','devil.gif'],[':evil:','evil.gif'],[':evilmad:','evilmad.gif'],[':sneaky:','sneaky.gif'],[':axe:','axe.gif'],[':slap:','slap.gif'],[':wall:','wall.gif'],[':jump:','jump.gif'],[':yucky:','yucky.gif'],[':nugget:','nugget.gif'],[':smart:','smart.gif'],[':shutup:','shutup.gif'],[':shutup2:','shutup2.gif'],[':crockett:','crockett.gif'],[':zorro:','zorro.gif'],[':snap:','snap.gif'],[':rambo:','rambo.gif'],[':ninja:','ninja.gif'],[':hannibal:','hannibal.gif'],[':party:','party.gif'],[':snorkle:','snorkle.gif'],[':evo:','evo.gif'],[':king:','king.gif'],[':chef:','chef.gif'],[':mario:','mario.gif'],[':pope:','pope.gif'],[':fez:','fez.gif'],[':cap:','cap.gif'],[':cowboy:','cowboy.gif'],[':pirate:','pirate.gif'],[':pirate2:','pirate2.gif'],[':rock:','rock.gif'],[':cigar:','cigar.gif'],[':icecream:','icecream.gif'],[':oldtimer:','oldtimer.gif'],[':trampoline:','trampoline.gif'],[':banana:','bananadance.gif'],[':smurf:','smurf.gif'],[':yikes:','yikes.gif'],[':osama:','osama.gif'],[':saddam:','saddam.gif'],[':santa:','santa.gif'],[':indian:','indian.gif'],[':pimp:','pimp.gif'],[':nuke:','nuke.gif'],[':jacko:','jacko.gif'],[':ike:','ike.gif'],[':greedy:','greedy.gif'],[':super:','super.gif'],[':wolverine:','wolverine.gif'],[':spidey:','spidey.gif'],[':spider:','spider.gif'],[':bandana:','bandana.gif'],[':construction:','construction.gif'],[':sheep:','sheep.gif'],[':police:','police.gif'],[':detective:','detective.gif'],[':clover:','clover.gif']]");

for (var i=0; i < str.length ; i++) {

	var suggest = "<img src='/pic/smilies/"+str[i][1]+"' id='"+str[i][0]+"' />";
	
	if((i+1) % 25 ==0) suggest += "<br>";
	HTML += suggest;
}

var BB = "<br><img id='[img][/img]' /> <img id='[b][/b]' /> <img id='[i][/i]' /> <img id='[u][/u]' /> <img id='[color=blue][/color]' /> <img id='[color=green][/color]' /> <img id='[color=red][/color]' /> <img id='[color=magenta][/color]' /> <img id='[youtube][/youtube]' /> <img id='[spoiler][/spoiler]' /> <img id='[quote][/quote]' /> <img id='[pre][/pre]' /> <img id='[*]' /> <img id='[size=4][/size]' />";


logo.innerHTML = "<div align='center'><img src='/pic/smilies/yoyo_77.gif' id=':lol2:' /><img src='/pic/smilies/yoyo_65.gif' id=':-O' /><img src='/pic/smilies/yoyo_01.gif' id='8-)' /><img src='/pic/smilies/yociexp26.gif' id=':au:' /><img src='/pic/smilies/yoyo17.gif' id=':a1:' /><img src='/pic/smilies/yoyo72.gif' id=':a2:' /><img src='/pic/smilies/yoyo75.gif' id=':a3:' /><img src='/pic/smilies/yoyox32.gif' id=':a4:' /><img src='/pic/smilies/yoyox48.gif' id=':a5:' /><img src='/pic/smilies/yoyo55.gif' id=':a6:' /><img src='/pic/smilies/yoyo66.gif' id=':a7:' /><img src='/pic/smilies/yoyo126.gif' id=':a8:' /><br><img src='/pic/smilies/yoyo122.gif' id=':a9:' /><img src='/pic/smilies/yoyo04.gif' id=':a0:' /><img src='/pic/smilies/yoyox06.gif' id=':b1:' /><img src='/pic/smilies/1.gif' id=':b2:' /><img src='/pic/smilies/7.gif' id=':b3:' /><img src='/pic/smilies/9.gif' id=':b4:' /><img src='/pic/smilies/11.gif' id=':b5:' /><img src='/pic/smilies/15.gif' id=':b6:' /><img src='/pic/smilies/18.gif' id=':b7:' /><img src='/pic/smilies/19.gif' id=':b8:' /><img src='/pic/smilies/21.gif' id=':b9:' /><img src='/pic/smilies/23.gif' id=':c1:' /><br><img src='/pic/smilies/24.gif' id=':c2:' /><img src='/pic/smilies/29.gif' id=':c3:' /><img src='/pic/smilies/36.gif' id=':c4:' /><img src='/pic/smilies/40.gif' id=':c5:' /><img src='/pic/smilies/44.gif' id=':c6:' /><img src='/pic/smilies/46.gif' id=':c7:' /><img src='/pic/smilies/52.gif' id=':c8:' /><img src='/pic/smilies/63.gif' id=':c9:' /><img src='/pic/smilies/66.gif' id=':d1:' /><img src='/pic/smilies/82.gif' id=':d2:' /><img src='/pic/smilies/85.gif' id=':d3:' /><img src='/pic/smilies/117.gif' id=':d4:' /><br><img src='/pic/smilies/124.gif' id=':d5:' /><img src='/pic/smilies/132.gif' id=':d6:' /><img src='/pic/smilies/162.gif' id=':d7:' /><img src='/pic/smilies/192.gif' id=':d8:' /><img src='/pic/smilies/yoyo_51.gif' id=':d9:' /><img src='/pic/smilies/yoyo_33.gif' id=':e1:' /><img src='/pic/smilies/yoyo_83.gif' id=':e2:' /><img src='/pic/smilies/yoyo_89.gif' id=':e3:' /><img src='/pic/smilies/yoyo_30.gif' id=':e4:' /><img src='/pic/smilies/yoyo_64.gif' id=':e5:' /><img src='/pic/smilies/yoyo_52.gif' id=':e6:' /><img src='/pic/smilies/87.gif' id=':e7:' /><br><img src='/pic/smilies/103.gif' id=':e8:' /><img src='/pic/smilies/114.gif' id=':e9:' /><img src='/pic/smilies/yoyo_67.gif' id=':f1:' /><img src='/pic/smilies/yoyo_71.gif' id=':f2:' /><img src='/pic/smilies/yoyo_72.gif' id=':f3:' /><img src='/pic/smilies/92.gif' id=':f4:' /><img src='/pic/smilies/yoyo_47.gif' id=':no:' /><img src='/pic/smilies/yoyo_24.gif' id=':love:' /><img src='/pic/smilies/yoyo_92.gif' id=':crazy:' /><img src='/pic/smilies/yoyo_53.gif' id=':kiss:' /><br>" + HTML + BB + "</div>";

if(window.location.href.toLowerCase().match("comment.php?")){
     toolb = document.getElementsByName("text")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}else if(window.location.href.toLowerCase().match("forums.php?") || window.location.href.toLowerCase().match("markets.php?")){
     toolb = document.getElementsByName("body")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}else if(window.location.href.toLowerCase().match("sendmessage.php?")){
     toolb = document.getElementsByName("msg")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}else if(window.location.href.toLowerCase().match("chat.php?")){
	 toolb = document.getElementsByName("shbox")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}

document.getElementById(':lol2:').addEventListener("click", setsmile, true);
document.getElementById(':-O').addEventListener("click", setsmile, true);
document.getElementById('8-)').addEventListener("click", setsmile, true);
document.getElementById(':au:').addEventListener("click", setsmile, true);
document.getElementById(':a1:').addEventListener("click", setsmile, true);
document.getElementById(':a2:').addEventListener("click", setsmile, true);
document.getElementById(':a3:').addEventListener("click", setsmile, true);
document.getElementById(':a4:').addEventListener("click", setsmile, true);
document.getElementById(':a5:').addEventListener("click", setsmile, true);
document.getElementById(':a6:').addEventListener("click", setsmile, true);
document.getElementById(':a7:').addEventListener("click", setsmile, true);
document.getElementById(':a8:').addEventListener("click", setsmile, true);
document.getElementById(':a9:').addEventListener("click", setsmile, true);
document.getElementById(':a0:').addEventListener("click", setsmile, true);
document.getElementById(':b1:').addEventListener("click", setsmile, true);
document.getElementById(':b2:').addEventListener("click", setsmile, true);
document.getElementById(':b3:').addEventListener("click", setsmile, true);
document.getElementById(':b4:').addEventListener("click", setsmile, true);
document.getElementById(':b5:').addEventListener("click", setsmile, true);
document.getElementById(':b6:').addEventListener("click", setsmile, true);
document.getElementById(':b7:').addEventListener("click", setsmile, true);
document.getElementById(':b8:').addEventListener("click", setsmile, true);
document.getElementById(':b9:').addEventListener("click", setsmile, true);
document.getElementById(':c1:').addEventListener("click", setsmile, true);
document.getElementById(':c2:').addEventListener("click", setsmile, true);
document.getElementById(':c3:').addEventListener("click", setsmile, true);
document.getElementById(':c4:').addEventListener("click", setsmile, true);
document.getElementById(':c5:').addEventListener("click", setsmile, true);
document.getElementById(':c6:').addEventListener("click", setsmile, true);
document.getElementById(':c7:').addEventListener("click", setsmile, true);
document.getElementById(':c8:').addEventListener("click", setsmile, true);
document.getElementById(':c9:').addEventListener("click", setsmile, true);
document.getElementById(':d1:').addEventListener("click", setsmile, true);
document.getElementById(':d2:').addEventListener("click", setsmile, true);
document.getElementById(':d3:').addEventListener("click", setsmile, true);
document.getElementById(':d4:').addEventListener("click", setsmile, true);
document.getElementById(':d5:').addEventListener("click", setsmile, true);
document.getElementById(':d6:').addEventListener("click", setsmile, true);
document.getElementById(':d7:').addEventListener("click", setsmile, true);
document.getElementById(':d8:').addEventListener("click", setsmile, true);
document.getElementById(':d9:').addEventListener("click", setsmile, true);
document.getElementById(':e1:').addEventListener("click", setsmile, true);
document.getElementById(':e2:').addEventListener("click", setsmile, true);
document.getElementById(':e3:').addEventListener("click", setsmile, true);
document.getElementById(':e4:').addEventListener("click", setsmile, true);
document.getElementById(':e5:').addEventListener("click", setsmile, true);
document.getElementById(':e6:').addEventListener("click", setsmile, true);
document.getElementById(':e7:').addEventListener("click", setsmile, true);
document.getElementById(':e8:').addEventListener("click", setsmile, true);
document.getElementById(':e9:').addEventListener("click", setsmile, true);
document.getElementById(':f1:').addEventListener("click", setsmile, true);
document.getElementById(':f2:').addEventListener("click", setsmile, true);
document.getElementById(':f3:').addEventListener("click", setsmile, true);
document.getElementById(':f4:').addEventListener("click", setsmile, true);
document.getElementById(':no:').addEventListener("click", setsmile, true);
document.getElementById(':love:').addEventListener("click", setsmile, true);
document.getElementById(':kiss:').addEventListener("click", setsmile, true);
document.getElementById(':crazy:').addEventListener("click", setsmile, true);



for (var i=0; i < str.length ; i++) {
	document.getElementById(str[i][0]).addEventListener("click", setsmile, true);	
}

document.getElementById('[img][/img]').src = "data:image/gif;base64,R0lGODlhEgARALMAAJAwL8%2FI%2F2BnAC8wL8%2F%2F%2F5BnAJCXz5DIz5DIL5DIAABnAACXAGCXAAAAAP%2F%2F%2F5DI%2FyH5BAAAAAAALAAAAAASABEAAAR20MlJq2zu6c37w164gc9RPszBGKapkQH6JAljxy6p0rySciATg5dQLDSxV0Y2o9mMrs%2BSwBAkHgtBlqEgKCU2ASOwCADIjAlmkgZkAdXKugIYWC4OhH6PGBT4exg2gwxwcIQ2GEaLC4yOCxiNko%2BODZaXmJmYEQA7";
document.getElementById('[b][/b]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwAAACH5BAAAAAAALAAAAAASABEAAAI3hI9pAeIPo2CyPmornqH7EG0cOEKi56BXc3Wpu5ofHLekmrLvTU96CczZZqFfpnY0GZOzpjNQAAA7";
document.getElementById('[i][/i]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAH9%2Ff%2F%2F%2F%2FwAAAL%2B%2FvyH5BAAAAAAALAAAAAASABEAAAI0jI9pEuMP42CyPmorjqJ3uHECwDUS8JXaKIUOKmgmyLbzm9oiKV9eDrplLsLhpDj8KZe%2FAgA7";
document.getElementById('[u][/u]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAH9%2Ff%2F%2F%2F%2FwAAAL%2B%2FvyH5BAAAAAAALAAAAAASABEAAAI5jI9pEuMP42CyPmornqJzfzWXMEYbV0IniKqiw7Lw29azSsJ5iAMDIJvQPkFhRvPqKJeuo2QJjS4LADs%3D";
document.getElementById('[color=blue][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwAA%2FyH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[color=green][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2FvwDIACH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[color=red][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2Fv%2F8AACH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[color=magenta][/color]').src = "data:image/gif;base64,R0lGODlhEgARAJEAAP%2F%2F%2FwAAAL%2B%2Fv%2F8A%2FyH5BAAAAAAALAAAAAASABEAAAI9hI9pAeIPo2Az2Itto2H4D3rbFpbDOJkh2qkf674TGZ9zWsOrcrdgI%2BGUNpje0HFBNhSGR8AJlEgrmWq1AAA7";
document.getElementById('[youtube][/youtube]').src = "http://www.youtube.com/favicon.ico";
document.getElementById('[spoiler][/spoiler]').src = "http://www.wwe.in.th/forum/images/smilies/spoiler.gif";
document.getElementById('[quote][/quote]').src = "http://webboard.gg.in.th/images/goodgame/buttons/b_quote_post.png";
document.getElementById('[pre][/pre]').src = "http://forum.datatan.net/Themes/Apollobb/images/bbc/pre.gif";
document.getElementById('[*]').src = "http://cdn2.iconfinder.com/data/icons/ledicons/text_list_bullets.png";
document.getElementById('[size=4][/size]').src = "http://www.immigration.go.th/forum/Themes/classic/images/bbc/size.gif";

document.getElementById('[img][/img]').addEventListener("click", setsmile, true);
document.getElementById('[b][/b]').addEventListener("click", setsmile, true);
document.getElementById('[i][/i]').addEventListener("click", setsmile, true);
document.getElementById('[u][/u]').addEventListener("click", setsmile, true);
document.getElementById('[color=blue][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=green][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=red][/color]').addEventListener("click", setsmile, true);
document.getElementById('[color=magenta][/color]').addEventListener("click", setsmile, true);
document.getElementById('[youtube][/youtube]').addEventListener("click", setsmile, true);
document.getElementById('[spoiler][/spoiler]').addEventListener("click", setsmile, true);
document.getElementById('[quote][/quote]').addEventListener("click", setsmile, true);
document.getElementById('[pre][/pre]').addEventListener("click", setsmile, true);
document.getElementById('[*]').addEventListener("click", setsmile, true);
document.getElementById('[size=4][/size]').addEventListener("click", setsmile, true);