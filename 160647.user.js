// ==UserScript==
// @name        BroniesNL Emotipons
// @namespace   http://www.bronies.nl
// @include     http://www.bronies.nl/e107_plugins/forum/*
// @include     https://www.bronies.nl/e107_plugins/forum/*
// @include     http://bronies.nl/e107_plugins/forum/*
// @include     https://bronies.nl/e107_plugins/forum/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version     6
// @grant       none
// ==/UserScript==

//Associative array for all emoticons
var emos = {
'applelie':'http://www.bronies.de/images/smilies/applelie.png',
'ajbemused':'http://www.fimfiction-static.net/images/emoticons/ajbemused.png',
'ajsmug':'http://www.fimfiction-static.net/images/emoticons/ajsmug.png',
'ajsleepy':'http://www.fimfiction-static.net/images/emoticons/ajsleepy.png',
'applejackconfused':'http://www.fimfiction-static.net/images/emoticons/applejackconfused.png',
'applejackunsure':'http://www.fimfiction-static.net/images/emoticons/applejackunsure.png',
'asmug':'http://cdn.broni.es/images/emotes/mlp-asmug.png',
'aawkward':'http://cdn.broni.es/images/emotes/mlp-aawkward.png',
'aglaring':'http://cdn.broni.es/images/emotes/mlp-aglaring.png',
'ablush':'http://cdn.broni.es/images/emotes/mlp-ablush.png',
'ashrug':'http://cdn.broni.es/images/emotes/mlp-ashrug.png',

'flutterrage':'http://www.fimfiction-static.net/images/emoticons/flutterrage.png',
'fluttercry':'http://www.fimfiction-static.net/images/emoticons/fluttercry.png',
'fluttershbad':'http://www.fimfiction-static.net/images/emoticons/fluttershbad.png',
'fluttershyouch':'http://www.fimfiction-static.net/images/emoticons/fluttershyouch.png',
'fluttershysad':'http://www.fimfiction-static.net/images/emoticons/fluttershysad.png',
'fluttershyyay':'http://www.fimfiction-static.net/images/emoticons/yay.png',
'fsmug':'http://cdn.broni.es/images/emotes/mlp-fsmug2.png',
'fstern':'http://cdn.broni.es/images/emotes/mlp-fstern.png',
'fpanic':'http://cdn.broni.es/images/emotes/mlp-fpanic.png',
'ffrown':'http://cdn.broni.es/images/emotes/mlp-ffrown.png',
'fpleaseno':'http://cdn.broni.es/images/emotes/mlp-fpleaseno.png',
'fbat':'http://i.imgur.com/o98UzQu.png',

'pinkiecrazy':'http://www.fimfiction-static.net/images/emoticons/pinkiecrazy.png',
'pinkiegasp':'http://www.fimfiction-static.net/images/emoticons/pinkiegasp.png',
'pinkiehappy':'http://www.fimfiction-static.net/images/emoticons/pinkiehappy.png',
'pinkiesad2':'http://www.fimfiction-static.net/images/emoticons/pinkiesad2.png',
'pinkiesick':'http://www.fimfiction-static.net/images/emoticons/pinkiesick.png',
'pinkiesmile':'http://www.fimfiction-static.net/images/emoticons/pinkiesmile.png',
'pido':'http://cdn.broni.es/images/emotes/mlp-pido.png',
'pparty':'http://cdn.broni.es/images/emotes/ppartytime.png',
'pgasp':'http://cdn.broni.es/images/emotes/mlp-pgasp.png',
'pjoy':'http://cdn.broni.es/images/emotes/mlp-pjoy.png',
'pscared':'http://cdn.broni.es/images/emotes/mlp-pscared.png',
'pplotting':'http://cdn.broni.es/images/emotes/mlp-pplotting.png',
'ppunamused':'http://i.imgur.com/XH3faPN.png',

'rainbowderp':'http://www.fimfiction-static.net/images/emoticons/rainbowderp.png',
'rainbowdetermined2':'http://www.fimfiction-static.net/images/emoticons/rainbowdetermined2.png',
'rainbowhuh':'http://www.fimfiction-static.net/images/emoticons/rainbowhuh.png',
'rainbowkiss':'http://www.fimfiction-static.net/images/emoticons/rainbowkiss.png',
'rainbowlaugh':'http://www.fimfiction-static.net/images/emoticons/rainbowlaugh.png',
'rainbowwild':'http://www.fimfiction-static.net/images/emoticons/rainbowwild.png',
'rdlaugh':'http://www.bronies.de/images/smilies/rdlaugh.png',
'rddealwithit':'http://www.bronies.de/images/smilies/dealwithit.png',
'rdwink':'http://i.imgur.com/HL1k4Uy.png',
'rdsexy':'http://cdn.broni.es/images/emotes/mlp-dsexy.png',
'rdsalute':'http://cdn.broni.es/images/emotes/mlp-dsalute.png',
'rdlulz':'http://cdn.broni.es/images/emotes/mlp-dlulz.png',
'rdstare':'http://cdn.broni.es/images/emotes/mlp-dstare.png',
'rdblush':'http://cdn.broni.es/images/emotes/mlp-dblush.png',
'rdflut':'http://cdn.broni.es/images/emotes/mlp-nsiwh.png',
'rdderp':'http://i.imgur.com/ii0O4Mw.png',
'rdsad':'http://i.imgur.com/38UHWxB.png',
'rdstache':'http://i.imgur.com/VsRloiY.png',
'rdsmile':'http://i.imgur.com/NB1Jxdz.png',

'raritycry':'http://www.fimfiction-static.net/images/emoticons/raritycry.png',
'raritydespair':'http://www.fimfiction-static.net/images/emoticons/raritydespair.png',
'raritystarry':'http://www.fimfiction-static.net/images/emoticons/raritystarry.png',
'raritywink':'http://www.fimfiction-static.net/images/emoticons/raritywink.png',
'rarityduck':'http://www.fimfiction-static.net/images/emoticons/duck.png',
'ryell':'http://cdn.broni.es/images/emotes/mlp-ryell.png',
'rsrs':'http://cdn.broni.es/images/emotes/mlp-rseriously.png',
'rwink':'http://cdn.broni.es/images/emotes/mlp-rwink.png',
'rpissed':'http://cdn.broni.es/images/emotes/mlp-rpissed.png',
'rsexy':'http://cdn.broni.es/images/emotes/mlp-rsexy.png',
'rteehee':'http://cdn.broni.es/images/emotes/mlp-rteehee.png',
'rclap':'http://cdn.broni.es/images/emotes/mlp-rclap.png',

'twilightangry2':'http://www.fimfiction-static.net/images/emoticons/twilightangry2.png',
'twilightblush':'http://www.fimfiction-static.net/images/emoticons/twilightblush.png',
'twilightoops':'http://www.fimfiction-static.net/images/emoticons/twilightoops.png',
'twilightsmile':'http://www.fimfiction-static.net/images/emoticons/twilightsmile.png',
'twilightfh':'http://www.fimfiction-static.net/images/emoticons/facehoof.png',
'tannoy':'http://cdn.broni.es/images/emotes/mlp-tannoy.png',
'tsupersad':'http://cdn.broni.es/images/emotes/mlp-tsupersad.png',
'tgrin':'http://cdn.broni.es/images/emotes/mlp-tgrin.png',
'tohdamn':'http://cdn.broni.es/images/emotes/mlp-tohdamn.png',
'tyay':'http://cdn.broni.es/images/emotes/mlp-tyell.png',
'twut':'http://cdn.broni.es/images/emotes/mlp-twut.png',
'tsmug':'http://cdn.broni.es/images/emotes/mlp-tssmug.png',
'twiface':'http://i.imgur.com/L9WqHHQ.png',
'twicane':'http://i.imgur.com/YpSKebb.png',

'applebloomcry':'http://www.fimfiction-static.net/images/emoticons/applecry.png',
'abdoc':'http://cdn.broni.es/images/emotes/mlp-ablupus.png',
'abhap':'http://cdn.broni.es/images/emotes/mlp-abhappy.png',

'coolphoto':'http://www.fimfiction-static.net/images/emoticons/coolphoto.png',
'pfpleased':'http://cdn.broni.es/images/emotes/mlp-pfpleased.png',

'scootangel':'http://www.fimfiction-static.net/images/emoticons/scootangel.png',
'schappy':'http://cdn.broni.es/images/emotes/mlp-schappy.png',
'scgotthis':'http://i.imgur.com/lOTf8qu.png',

'trixieshiftleft':'http://www.fimfiction-static.net/images/emoticons/trixieshiftleft.png',
'trixieshiftright':'http://www.fimfiction-static.net/images/emoticons/trixieshiftright.png',
'trixietest':'http://cdn.broni.es/images/emotes/mlp-trsmug2.png',

'derpy':'http://img854.imageshack.us/img854/7462/derppk.png',
'derpyderp1':'http://www.fimfiction-static.net/images/emoticons/derpyderp1.png',
'derpytongue2':'http://www.fimfiction-static.net/images/emoticons/derpytongue2.png',
'derpysg':'http://cdn.broni.es/images/emotes/mlp-dedealwith2.png',
'derpyhappy':'http://cdn.broni.es/images/emotes/mlp-dehappy.png',

'twistnerd':'http://www.fimfiction-static.net/images/emoticons/twistnerd.png',

'unsuresweetie':'http://www.fimfiction-static.net/images/emoticons/unsuresweetie.png',
'swshock':'http://cdn.broni.es/images/emotes/mlp-swshock.png',
'swlove':'http://cdn.broni.es/images/emotes/mlp-swlove.png',

'cheerilee':'http://www.bronies.de/images/smilies/cheerilee.png',
'chesmile':'http://i.imgur.com/Jkki3Ud.png',
'chsmug':'http://i.imgur.com/odkhzgd.png',

'trollestia':'http://www.bronies.de/images/smilies/trollestia.png',
'trollestia2':'http://www.fimfiction-static.net/images/emoticons/trollestia.png',
'celesyay':'http://cdn.broni.es/images/emotes/mlp-ceyay.png',

'lustare':'http://cdn.broni.es/images/emotes/mlp-lstare.png',
'luhappy':'http://cdn.broni.es/images/emotes/mlp-luhappy.png',
'lufun':'http://cdn.broni.es/images/emotes/mlp-lfun.png',
'lunatic':'http://i.imgur.com/IEV05oY.png',

'pcrolleye':'http://cdn.broni.es/images/emotes/mlp-pcrolleye.png',
'pchappy':'http://cdn.broni.es/images/emotes/mlp-pchappy.png',

'saface':'http://cdn.broni.es/images/emotes/mlp-sacontent.png',

'discord':'http://cdn.broni.es/images/emotes/mlp-discnotamused.png',

'qc':'http://cdn.broni.es/images/emotes/mlp-chrysexy.png',

'som':'http://cdn.broni.es/images/emotes/mlp-somcontent.png',

'moustache':'http://www.fimfiction-static.net/images/emoticons/moustache.png',
'uberspike':'http://cdn.broni.es/images/emotes/mlp-ssmug.png',
'spikesg':'http://cdn.broni.es/images/emotes/mlp-sdealwith.png',
'spikesrs':'http://cdn.broni.es/images/emotes/mlp-spsrsly.png',

'eeyup':'http://www.fimfiction-static.net/images/emoticons/eeyup.png',
'bmgrin':'http://cdn.broni.es/images/emotes/mlp-bmgrin.png',

'lyrawat':'http://bronies.de/images/smilies/lyra.png',
'lyrabon':'http://cdn.broni.es/images/emotes/mlp-lbbhug.png',

'octavia':'http://www.bronies.de/images/smilies/octaviaangry.png',
'octsup':'http://cdn.broni.es/images/emotes/mlp-osurprise.png',
'octhappy':'http://cdn.broni.es/images/emotes/mlp-ohappy.png',
'octhug':'http://i.imgur.com/y4hm0bd.png',
'octmad':'http://i.imgur.com/nlNfR64.png',
'octclap':'http://cdn.broni.es/images/emotes/mlp-oclap.png',

'bssmug':'http://cdn.broni.es/images/emotes/mlp-bssmug.png',
'bshappy':'http://cdn.broni.es/images/emotes/mlp-bshappy.png',

'zecgrin':'http://cdn.broni.es/images/emotes/mlp-zgrin.png',

'vsgrin':'http://cdn.broni.es/images/emotes/mlp-scratch.png',
'vssmug':'http://cdn.broni.es/images/emotes/mlp-vssmug.png',
'vshappy':'http://i.imgur.com/XGPW5t1.png',

'afoops':'http://cdn.broni.es/images/emotes/mlp-afoops.png',

'fluffle':'http://i.imgur.com/TejaU6g.png',

'bmmeh':'http://i.imgur.com/ff1KxNK.png',
'bmno':'http://i.imgur.com/cZYtY2H.gif',
'bmhappy':'http://i.imgur.com/IgrqU4e.png',

'brohoof':'http://www.bronies.de/images/smilies/brohoof.png',

'scemo':'http://i.imgur.com/67AHG4x.png',
'ttemo':'http://i.imgur.com/X0y9Gg7.png',

'heart':'http://images2.wikia.nocookie.net/callofduty4s/images/7/71/Spike_and_rarity_s_heart_shaped_fire_ruby_by_edwardten-d4jbvk5.png',
'heart2':'http://www.fimfiction-static.net/images/emoticons/heart.png',

':\')':'http://i.imgur.com/iLRw3RS.gif',

};

//Demotify when writing a reply
try{
	if($('#post').length != 0) {
		demotify();
	}
} catch(err) {}

//Show normal reply emoticon tools
if($('#post').length != 0) {
	$('.button').click(emotify);
	$('#dataform').append(allEmoticons);
	$('.emotipon').click(insertEmoticon);
}

//Show quick reply emoticon tools
if(document.location.href.indexOf('/forum_viewtopic.php') != -1) {
	if($('.forumheader3 form p .tbox').length != 0) {
		$('.forumheader3 form p .tbox').parent().append(toggleBox);
		$('.toggleemoticons').click(showToggleBox);
		$('.qemotipon').click(insertEmoticonQuick);
		$('.button').click(quickEmotify);
	}
}

//Replace emoticons after normal reply
function emotify() {
	var text = $('#post').val();
	for(emo in emos) {
		var search = "[" + emo + "]";
		//var replace = "[img height=27]" + emos[emo] + "[/img]";
		//New replace technique for resizing
		var replace = "[img style=max-height:27px]" + emos[emo] + "[/img]";
		text = replaceAll(search, replace, text);
	}
	$('#post').val(text);
}

//Replace emoticons after quick reply
function quickEmotify() {
	var text = $('.forumheader3 form p .tbox').val();
	for(emo in emos) {
		var search = "[" + emo + "]";
		//var replace = "[img height=27]" + emos[emo] + "[/img]";
		//New replace technique for resizing
		var replace = "[img style=max-height:27px]" + emos[emo] + "[/img]";
		text = replaceAll(search, replace, text);
	}
	$('.forumheader3 form p .tbox').val(text);
}

//Convert emoticons to tags when editing posts
function demotify() {
	var text = $('#post').val();
	for(emo in emos) {
		//Use both search techniques for backwards compatability
		var search  = "[img height=27]" + emos[emo] + "[/img]";
		var search2 = "[img style=max-height:27px]" + emos[emo] + "[/img]";
		var replace = "[" + emo + "]";
		text = replaceAll(search, replace, text);
		text = replaceAll(search2, replace, text);
	}
	$('#post').val(text);
}

//Show all emoticons
function allEmoticons() {
	var html = '';
	for(emo in emos) {
	html += '<img class="emotipon" src="'+emos[emo]+'" alt="'+emo+'" style="max-height:27px;"/>';
	}
	return html;
}

//Show/hide emoticon box
function showToggleBox(event) {
	if($('.emoticonbox').is(":visible")) {
		$('.emoticonbox').hide();
	} else {
		$('.emoticonbox').show();
	}
}

//HTML code for emoticon toggle box
function toggleBox() {
	var html = '<img src="http://www.fimfiction-static.net/images/emoticons/yay.png" alt="Show/Hide Emotipons" class="toggleemoticons" style="max-height:27px;"></img><BR><div class="emoticonbox" style="color:#FFF;text-align:left;display:none;background:rgba(50,50,50,0.6);border:1px solid rgba(150,150,150,0.5);">';
	for(emo in emos) {
		html += '<img class="qemotipon" src="'+emos[emo]+'" alt="'+emo+'" style="max-height:27px;"/>';
	}
	html += '</div>'
	return html;
	
}

//Insert emoticon event (from normal reply)
function insertEmoticon(event) {
	$('#post').insertAtCaret('['+$(this).attr("alt")+']')
}

//Insert emoticon event (from quick reply)
function insertEmoticonQuick(event) {
	$('.forumheader3 form p .tbox').insertAtCaret('['+$(this).attr("alt")+']')
}

//Replace all occurences in text
function replaceAll(str1, str2, text, ignore)
{
   return text.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
};

jQuery.fn.extend({
insertAtCaret: function(myValue){
  return this.each(function(i) {
    if (this.selectionStart || this.selectionStart == '0') {
      var startPos = this.selectionStart;
      var endPos = this.selectionEnd;
      var scrollTop = this.scrollTop;
      this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
      this.focus();
      this.selectionStart = startPos + myValue.length;
      this.selectionEnd = startPos + myValue.length;
      this.scrollTop = scrollTop;
    } else {
      this.value += myValue;
      this.focus();
    }
  })
}
});