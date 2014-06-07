// ==UserScript==
// @id             
// @name           logo
// @version        5555
// @author         hasbromlp
// @description    
// @include        http://www.synchtube.com/r/HasbroMLP
// @include        http://www.synchtube.com/r/HasbroMLP#
// @include        http://www.synchtube.com/r/HasbroMLP?chat_only
// @include        http://www.sycnhtube.com/r/HasbroMLP?chat_only#
// @include        http://www.synchtube.com/r/HasbroMLPPMV
// @include        http://www.synchtube.com/r/HasbroMLPPMV#
// @include        http://www.synchtube.com/r/HasbroMLPPMV?chat_only
// @include        http://www.sycnhtube.com/r/HasbroMLPPMV?chat_only#
// ==/UserScript==

/* Script written by HasbroMLP of Hasbromlp */



function loadExternalJS() {

var facecodes = {

// Emotes:

// Sock emotes:

":angel:":'<img src="" width="80" height="80">',

":applebloom:":'<img src="http://i.imgur.com/t0IuE.png" width="62" height="80">',

":applefritter:":'<img src="http://i.imgur.com/71ZTs.png" width="76" height="80">',

":applejack:":'<img src="http://i.imgur.com/DPlMs.png" width="71" height="80">',

":berrypunch:":'<img src="http://i.imgur.com/CVy1q.png" width="96" height="60">',

":bestship:":'<img src="http://i.imgur.com/ZbcQq.png" width="90" height="68">',

":bigmacintosh:":'<img src="http://i.imgur.com/g6dus.png" width="73" height="80">',

":celestia:":'<img src="http://i.imgur.com/djo0G.jpg" width="100" height="42">',

":cheerilee:":'<img src="http://i.imgur.com/hn7Xg.png" width="125" height="64">',

":cheeselegs:":'<img src="http://i.imgur.com/UnOk0.png" width="90" height="51">',

":derpyhooves:":'<img src="http://i.imgur.com/lzyq6.png" width="80" height="80">',

":fluttershy:":'<img src="http://i.imgur.com/0FJJx.png" width="80" height="68">',

":gilda:":'<img src="http://i.imgur.com/alupK.png" width="107" height="90">',

":goldenharvest:":'<img src="http://i.imgur.com/4JTeo.png" width="98" height="60">',

":grannysmith:":'<img src="http://i.imgur.com/dKANG.png" width="69" height="90">',

":littlestrongheart:":'<img src="http://i.imgur.com/WAGn1.jpg" width="83" height="100">',

":luna:":'<img src="http://i.imgur.com/5L0vn.png" width="90" height="56">',

":lyraheartstrings:":'<img src="http://i.imgur.com/guu6E.png" width="55" height="80">',

":minty:":'<img src="http://i.imgur.com/MPUef.png" width="78" height="80">',

":minuette:":'<img src="http://i.imgur.com/fTHGe.png" width="81" height="60">',

":octavia:":'<img src="http://i.imgur.com/9FgpO.png" width="103" height="80">',

":pinkiepie:":'<img src="http://i.imgur.com/ERrvb.png" width="78" height="80">',

":pipsqueak:":'<img src="http://i.imgur.com/Kceyv.png" width="62" height="80">',

":rainbowdash:":'<img src="http://i.imgur.com/KOkiy.png" width="80" height="56">',

":rarity:":'<img src="http://i.imgur.com/hN0sg.png" width="80" height="80">',

":roseluck:":'<img src="http://i.imgur.com/MHiwz.png" width="104" height="80">',

":royalguard:":'<img src="http://i.imgur.com/ixeLW.png" width="71" height="80">',

":scootaloo:":'<img src="http://i.imgur.com/S6tOq.png" width="72" height="80">',

":snails:":'<img src="http://i.imgur.com/5dYgz.png" width="74" height="80">',

":soarin:":'<img src="http://i.imgur.com/RuoMj.png" width="61" height="70">',

":spike:":'<img src="http://i.imgur.com/f78IW.png" width="96" height="77">',

":spitfire:":'<img src="http://i.imgur.com/oRjeX.png" width="74" height="80">',

":sweetiebelle:":'<img src="http://i.imgur.com/lyryF.png" width="67" height="81">',

":trixie:":'<img src="http://i.imgur.com/Xb4np.png" width="147" height="80">',

":twilightsparkle:":'<img src="http://i.imgur.com/ER6uH.png" width="80" height="56">',

":twinkleshine:":'<img src="http://i.imgur.com/l7b8j.png" width="68" height="80">',

":twist:":'<img src="http://i.imgur.com/9ghcy.png" width="73" height="80">',

":wub:":'<img src="http://i.imgur.com/tWlGu.gif" width="80" height="76">',

":zecora:":'<img src="http://i.imgur.com/j0Anw.jpg" width="80" height="80">',

":daringdoo:":'<img src="http://i.imgur.com/FVeYx.png" width="80" height="80">',

":gun:":'<img src="http://i.imgur.com/hzqzF.gif" width="90" height="90">',


// Ponies without emotes:

// Bonbon
// Cadance/Cadence
// Cancer Pony
// Carrot Cake
// Cloudchaser
// Cranky Doodle Donkey
// Cup Cake
// Diamond Tiara
// Flitter
// Pound Cake
// Pumpkin Cake
// Screwball
// Screwloose
// Shining Armor
// Silver Spoon
// Snips
// Soarin'



// Pony and people emotes:

":chicken:":'<img src="http://i.imgur.com/WzvS9.png" width="68" height="80">',

":correspondent:":'<img src="http://i.imgur.com/7vT7z.png" width="62" height="80">',

":faust:":'<img src="http://i.imgur.com/TSz2m.png" width="80" height="74">',

":futashy:":'<img src="http://i.imgur.com/i8AGg.png" width="80" height="64">',

":pinkamenadianepie:":'<img src="http://i.imgur.com/FPFAd.gif" width="73" height="80">',

":tarastrong:":'<img src="http://i.imgur.com/Cp90O.png" width="80" height="80">',

":tara:":'<img src="http://i.imgur.com/lxjRu.jpg" width="80: height="80">',





// Autism emotes:

":ricky:":'<img src="http://i.imgur.com/N5yvR.jpg" width="80" height="80">',

":autism:":'<img src="http://i.imgur.com/yJnky.png" width="70" height="54">',

":bestbrony:":'<img src="http://i.imgur.com/u5uGd.png" width="80" height="79">',

":brony:":'<img src="http://i.imgur.com/VOdl7.gif" width="65" height="33">',

":chrischan:":'<img src="http://i.imgur.com/BAwiN.png" width="60" height="80">',

":cinnamongroove:":'<img src="http://i.imgur.com/JEFMH.png" width="62" height="80">',

":friendshipismagic:":'<img src="http://i.imgur.com/lRrWg.png" width="80" height="80">',

":foamadventure:":'<img src="http://i.imgur.com/OQN9u.png" width="90" height="59">',

":meelz:":'<img src="http://i.imgur.com/VfMIY.png" width="69" height="73">',

":nathan:":'<img src="http://i.imgur.com/sImry.png" width="63" height="80">',

":rainboomcrash:":'<img src="http://i.imgur.com/Den1v.png" width="60" height="60">',


// Other emotes:

":420:":'<img src="http://i.imgur.com/rMIpu.png" width="80" height="66">',

":america:":'<img src="http://i.imgur.com/yAVSi.png" width="80" height="60">',

":basicmushroom:":'<img src="http://i.imgur.com/hLC1b.png" width="65" height="80">',

":baww:":'<img src="http://i.imgur.com/QcmJw.png" width="80" height="64">',

":bongrips:":'<img src="http://i.imgur.com/mM6FE.png" width="59" height="60">',

":usa:":'<img src="http://i.imgur.com/5Ke6f.gif" width="62" height="70">',

":clop:":'<img src="http://i.imgur.com/M8aYv.png" width="71" height="80">',

":coolstorybro:":'<img src="http://i.imgur.com/QITik.png" width="120" height="90">',

":cumonstepitup:":'<img src="http://i.imgur.com/RjfKr.gif" width="80" height="56">',

":cupcakes:":'<img src="http://i.imgur.com/LTner.gif" width="80" height="67">',

":datplot:":'<img src="http://i.imgur.com/x5mxh.png" width="68" height="80">',

":facepalm:":'<img src="http://i.imgur.com/phT05.png" width="67" height="80">',

":flutterface:":'<img src="http://i.imgur.com/YuiAj.png" width="69" height="98">',

":fuckthepolice:":'<img src="http://i.imgur.com/nJjCc.png" width="60" height="79">',

":gildamenow:":'<img src="http://i.imgur.com/o42gF.png" width="80" height="59">',

":go:":'<img src="http://i.imgur.com/Vo97C.gif" width="50" height="38">',

":gottagofast:":'<img src="http://i.imgur.com/koTZA.gif" width="97" height="73">',

":heilcelestia:":'<img src="http://i.imgur.com/NnX3n.png" width="80" height="71">',

":ISHYGDDT:":'<img src="http://i.imgur.com/Bftfr.png" width="80" height="80">',

":jump:":'<img src="http://i.imgur.com/UPhKb.gif" width="81" height="90">',

":killmenow:":'<img src="http://i.imgur.com/ses8j.png" width="62" height="80">',

":laughingponywhores:":'<img src="http://i.imgur.com/1w3cJ.png" width="80" height="64">',

":lolcocks:":'<img src="http://i.imgur.com/PWPzE.png" width="80" height="57">',

":love:":'<img src="http://i.imgur.com/GykMH.png" width="16" height="16">',

":motherland:":'<img src="http://i.imgur.com/aC1U7.png" width="58" height="80">',

":ohmy:":'<img src="http://i.imgur.com/j1qzz.png" width="74" height="80">',

":rape:":'<img src="http://i.imgur.com/hfzwS.png" width="80" height="70">',

":sanic:":'<img src="http://i.imgur.com/0CfVp.png" width="46" height="80">',

":soon:":'<img src="http://i.imgur.com/i93A3.png" width="88" height="60">',

":stanza:":'<img src="http://i.imgur.com/Bftfr.png" width="80" height="80">',

":stonerrarity:":'<img src="http://i.imgur.com/IWpZF.png" width="95" height="94">',

":stonershy:":'<img src="http://i.imgur.com/UIiEr.gif" width="76" height="90">',

":techno:":'<img src="http://i.imgur.com/R79sX.gif" width="150" height="93">',

":tulpa:":'<img src="http://i.imgur.com/61k96.png" width="84" height="80">',

":whatever:":'<img src="http://i.imgur.com/WrtrT.png" width="60" height="59">',

":yourtooslow:":'<img src="http://i.imgur.com/3vanI.gif" width="97" height="73">',

":iwatchforthis:":'<img src="http://i.imgur.com/KatYs.png" width="80" height="85">',



// Non-pony:

":burd:": '<img src="http://i.imgur.com/agpKo.gif" width="35" height="36">',

":duane:":'<img src="http://i.imgur.com/Z7AK4.gif" width="70" height="47">',

":mario:":'<img src="http://i.imgur.com/sRoH1.gif" width="37" height="70">',

":smokeweed:":'<img src="http://i.imgur.com/5rq0l.gif" width="21" height="49">',

":nigga:":'<img src="http://i.imgur.com/YZZj5.gif" width="75" height="75">',

":troll:":'<img src="http://i.imgur.com/w0wFN.png" width="30" height="25">',

":D":'<img src="http://i.imgur.com/STgsM.png" width="40" height="40">',

"D:":'<img src="http://i.imgur.com/oA2l2.gif" width="40" height="40">',




// New emotes:

":ohgodwhat:":'<img src="http://i.imgur.com/xMSMj.png" width="82" height="80">',

":scootaluna:":'<img src="http://i.imgur.com/kOhsl.png" width="72" height="80">',

":uncle:":'<img src="http://i.imgur.com/X9JVs.png" width="62" height="80">',

":greenandpurple:":'<img src="http://i.imgur.com/LM734.png" width="80" height="73">',

":ohyou:": '<img src="http://i.imgur.com/d1vK4.png" width="70" height="70">',

":pokerface:": '<img src="http://i.imgur.com/o8C2u.gif" width="54" height="60">',

":1000years:": '<img src="http://i.imgur.com/AnqS7.gif" width="74" height="80">',

":snoop:": '<img src="http://i.imgur.com/wywzX.gif" width="50" height="55">',

":feel:": '<img src="http://i.imgur.com/vk10K.png" width="65" height="65">',

":world:": '<img src="http://i.imgur.com/E5I6b.gif" width="65" height="65">',

":lamp:":'<img src="http://i.imgur.com/vmc2Y.gif" width="71" height="80">',

":douevenlift:":'<img src="http://i.imgur.com/qw382.gif" width="71" height="80">',

":cocaine:":'<img src="http://i.imgur.com/FUSU9.png" width="71" height="80">',

":daringjump:": '<img src="http://i.imgur.com/IV1ul.gif" width="50" height="55">',

// Unused emotes:

":dontgiveafuck:":'<img src="http://i.imgur.com/hqGYX.gif" width="100" height="65">',

":pomf:":'<img src="http://i.imgur.com/a3MoR.png" width="68" height="55">',

":sweetcelestia:":'<img src="http://i.imgur.com/zfMGs.png" width="71" height="80">',

"epample":"EXAPMLE",

":tongue:":'<img src="http://i.imgur.com/w1p4h.gif" width="71" height="80">',

":alex:": '<img src="http://i.imgur.com/3f8fo.jpg" width="54" height="60">',
// Colored text:

':end:' : '</span>',
':e:' : '</span>',
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

':s:':'<span class="spoiler">',

};



  var showfcmenu = false;
  

    helpers.animateEmotes = function(el) {
message_chat = ' '+el.html()+' ';

$.each(facecodes, function(code, image) {
regexp = new RegExp(code,'g');

message_chat = message_chat.replace(regexp, image);
});
el.html(message_chat);
    };

$('.controls').append('<br>');

var menuHTML = '';
var menuCount = 0;
$.each(facecodes, function(code, image) {
menuHTML = menuHTML+ '<a href="#" onclick="addFaceCode(\''+code+'\')">'+image+'</a> ';
menuCount = menuCount+1;
if(menuCount == 7) {
menuCount = 0;
menuHTML = menuHTML+'<br>';
}
});

$('#chat').append('<div id="facecodesmenu" class="hide" style="position:absolute;left:5px;top:5px;z-index:1;background-color:#AD9090;">'+menuHTML+'</div>');

$("#showfacecodes").click(function() {
if(showfcmenu == false) {
$("#facecodesmenu").removeClass('hide');
showfcmenu = true;
}else{
$("#facecodesmenu").addClass('hide');
showfcmenu = false;
}
});

jQuery.fn.extend({
insertAtCaret: function(myValue){
return this.each(function(i) {
if (document.selection) {
//For browsers like Internet Explorer
this.focus();
sel = document.selection.createRange();
sel.text = myValue;
this.focus();
}
else if (this.selectionStart || this.selectionStart == '0') {
//For browsers like Firefox and Webkit based
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

addFaceCode = function (code) {
$("#facecodesmenu").addClass('hide');
showfcmenu = false;
//$('#cin').val($('#cin').val()+' '+code);
$('#cin').insertAtCaret(code);
};

}

setTimeout(loadExternalJS, 3000);



var descr="",descr=descr+'<p style="font-family: Palatino; text-align: center; ">',descr=descr+'\t<span style="color:#003399;"><strong style="font-size: 20pt; ">HasbroMLP</strong></span></p>',descr=descr+'<p style="font-family: Palatino; font-size: 16pt; text-align: center; ">',descr=descr+'\t<strong>Best Pony Room on Synchtube/> </strong></p>',descr=descr+'<p style="font-family: Palatino; font-size: 16pt; text-align: center; ">',descr=descr+"\t\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582</p>",
descr=descr+'<p style="font-family: Palatino; font-size: 14pt; text-align: center; ">',descr=descr+'\t<span style="font-size: 14pt; ">Welcome To The Show</span></p>',descr=descr+'<p style="font-family: Palatino; font-size: 14pt; text-align: center; ">',descr=descr+'\t<span style="color:#003399;">Live 24/7/365 </span></p>',descr=descr+'<p style="font-family: Palatino; font-size: 12pt; text-align: center; ">',descr=descr+"\tAll of our videos are SFW</p>",
descr=descr+'<p style="font-family: Palatino; font-size: 16pt; text-align: center; ">',descr=descr+"\t\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582\u2582</p>",descr=descr+'<p style="font-family: Palatino; font-size: 18pt; text-align: center; ">',descr=descr+'\t<span style="color:#003399;"><strong>Rules&nbsp;</strong></span></p>',descr=descr+'<p style="font-family: Palatino; font-size: 14pt; text-align: center; ">',
descr=descr+"\t1. No Spam</p>",descr=descr+'<p style="font-family: Palatino; font-size: 14pt; text-align: center; ">',descr=descr+"\t2. Please don&#39;t beg for Ops/Mod</p>",descr=descr+'<p style="font-family: Palatino; font-size: 14pt; text-align: center; ">',descr=descr+"\t3. &nbsp;Rainbowdash is best pony</p>",descr=descr+'<p style="font-family: Palatino; font-size: 14pt; text-align: center; ">',descr=descr+"\t&nbsp;</p>",descr=
descr+'<p style="font-family: Palatino; font-size: 14pt; text-align: center; ">',descr=descr+"\tWe have Season 1/2/3 episode's  that play in order  &nbsp;</p>",descr=descr+'<p style="font-family: Palatino; font-size: 14pt; text-align: center; ">',descr=descr+"\tIf a video goes down tweet me @rickysplinter and let me know the Episode# + season # <BR> For chatcode's go here http://69.160.42.249/chatcodes.htm <BR> userscript http://userscripts.org/scripts/show/151285 <BR> download tamper monkey chrome https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo <BR> firefox greasemonkey https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/ <BR> SEEN ON EQD http://www.equestriaforums.com/index.php?topic=9687.0 under the pizza hut part. </p>",descr=descr+'<p style="font-family: Palatino; font-size: 14pt; text-align: center; ">',descr=descr+"</p>",descr=
descr+'<p style="font-family: Palatino; font-size: 14pt; text-align: center; ">',descr=descr+'\t<strong><span style="color:#003399; font-family: Palatino; font-size: 18pt; "</span></strong></p>',descr=descr+'<p style="text-align: center; ">',descr=descr+'</a></p>',
descr=descr+'<p style="text-align: center; ">',descr=descr+"\t&nbsp;</p>",descr=descr+'<p style="text-align: center; ">',descr=descr+"\t&nbsp;</p>",descr=descr+'<p style="text-align: center; ">',descr=descr+"\t&nbsp;</p>",descr=descr+'<p style="text-align: center; ">',descr=descr+'\t<strong><span style="color:#003399;"><span style=" font-family: Palatino; font-size: 18pt; ">Connect with Hasbromlp in other ways!</span></span></strong></p>',descr=descr+'<p style="text-align: center; ">',descr=descr+
"\t&nbsp;</p>",descr=descr+'<p style="text-align: center; ">',descr=descr+'\t</></a></p>',descr=descr+'<p style="text-align: center; ">',descr=descr+'\t</a><a href="http://twitter.com/rickysplinter/"><img src="http://i.imgur.com/iC5Vc.png?4" /></a></p>',descr=descr+'<script type="text/javascript" src="http://script.footprintlive.com/?site=www.synchtube.com"><\/script><noscript><a href="http://www.footprintlive.com" target="_blank"><img src="http://img.footprintlive.com/?cmd=nojs&site=www.synchtube.com" alt="user analytics" border="0"></a></noscript>';
$("#description .description").html(descr);function externalscript(b){var c=document.createElement("script");c.type="text/javascript";c.async=!0;c.src=b;b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(c,b)}var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-30714113-1"]);_gaq.push(["_trackPageview"]);
(function(){var b=document.createElement("script");b.type="text/javascript";b.async=!0;b.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)})();setupFilters=function(){forced_filters=[{pat:/\|([^\|]*)\|/g,target:"[spoiler]$1[/spoiler]"}];word_filters=window.Cookie&&Cookie.readCookie("shitty_workaroundafasdf")?[]:[{pat:/weeaboo/ig,target:"kawaii"},{pat:/youtube.com/ig,target:" "},{pat:/weeaboo/ig,target:"kawaii"},{pat:/weeaboos/ig,target:"kawaii"},{pat:/weeboo/ig,target:"kawaii"},{pat:/weeabuu/ig,target:"kawaii"},{pat:/v4c/ig,target:"derp"},{pat:/koreaboo/ig,target:"sexy beast"},{pat:/video4chan/ig,target:"derp"},{pat:/vidya4chan/ig,target:"derp"},
{pat:/weeabo/ig,target:"kawaii"},{pat:/weeabo/ig,target:"kawaii"},{pat:/weabo/ig,target:"kawaii"},{pat:/weabu/ig,target:"kawaii"},{pat:/4chan/ig,target:"4skin"},{pat:/SKlP/ig,target:"UPVOTE"},{pat:/skip/ig,target:"UPVOTE"},{pat:/skip/ig,target:"UPVOTE"},{pat:/sk@p/ig,target:"UPVOTE"},{pat:/skipp/ig,target:"UPVOTE"},{pat:/skip/ig,target:"UPVOTE"},{pat:/shkeep/ig,target:"UPVOTE"},{pat:/shkip/ig,target:"UPVOTE"},{pat:/sk!p/ig,target:"UPVOTE"},{pat:/sk1p/ig,target:"UPVOTE"},{pat:/s k i p/ig,target:"UPVOTE"},
{pat:/sk i p/ig,target:"UPVOTE"},{pat:/ski p/ig,target:"UPVOTE"},{pat:/s kip/ig,target:"UPVOTE"},{pat:/sk ip/ig,target:"UPVOTE"},{pat:/sk ip/ig,target:"UPVOTE"},{pat:/\bmod\b/ig,target:"faggotking"},{pat:/club/ig,target:"party"}]};setupFilters();function filterIllegal(b){return b=b.replace(/\xad/ig,"")}
Message_one.fn.prepareItem.$instrumented||(Message_one.fn.prepareItemOld=Message_one.fn.prepareItem,Message_one.fn.prepareItemOld.$instrumented=!0,Message_one.fn.prepareItem=function(){var b=this.master.last_sid;if(this.item.$irc||"dingdongbannu"===this.item.nick.toLowerCase())this.master.last_sid=null,this.$instrumented=!0;var c=Message_one.fn.prepareItemOld.apply(this,arguments);b&&(this.master.last_sid=b);return c});
Message_one.fn.render.$instrumented||(Message_one.fn.renderOld=Message_one.fn.render,Message_one.fn.renderOld.$instrumented=!0,Message_one.fn.render=function(){var b;if(this&&this.item&&this.item.nick&&"dingdongbannu"===this.item.nick.toLowerCase()&&(match=this.item.msg.match(/^\((\S+)\) (.*)/))&&match&&match[1]&&match[2])this.item.msg=match[2],this.item.nick=match[1],this.item.$irc=!0;this&&this.item&&this.item.nick&&this.item.nick.toLowerCase();if((helpers&&helpers.linkify&&helpers.linkify(this.item.msg)||
this.item.msg)===this.item.msg){var c=this.item.msg.hashCode()+this.item.sid.hashCode(),d={};this.item.msg=filterIllegal(this.item.msg);for(b=0;b<forced_filters.length;b++)this.item.msg=this.item.msg.replace(forced_filters[b].pat,forced_filters[b].target);this.item.origMsg=this.item.msg;for(b=0;b<word_filters.length;b++){var e=this.item.msg;this.item.msg=this.item.msg.replace(word_filters[b].pat,word_filters[b].target);e!==this.item.msg&&d[this.item.msg]?this.item.msg=e:d[this.item.msg]=!0}0===c%
150&&(this.item.msg+=" Welcome")}b=Message_one.fn.renderOld.apply(this,arguments);this.item.$irc&&(c=b.el.find("span.cun"),d=c.html(),d=d.replace(/:/,"-IRC:"),c.html(d));return b},Message_one.fn.render.$instrumented=!0,$desc=$("#leader-welcome-message-textarea").val(),String.prototype.hashCode=function(){var b=0;if(0==this.length)return b;for(i=0;i<this.length;i++)char2=this.charCodeAt(i),b=(b<<5)-b+char2,b&=b;return b},$("#leader-welcome-message-textarea").val($desc.replace(/onload/g,
"oonloadnload")),Message&&Message.clear(),window.sp&&window.sp.messages&&window.sp.messages.addAll());var newSpan='<span class="pl-list-link jq-icon jq-icon-closethick link-elem"></span>';$(".pl-info .pl-list-destroy").before(newSpan);$(".pl-list-link").hide();$(".pl-list-link").css("background-position","-240px -112px").css("right","6px").css("top","1px").css("position","absolute");
var getLinkURL=function(b){b=$(b).closest('li[id^="media"]').attr("id").replace("media_","");b=Media.records[b];return"yt"===b.mtype?"http://www.youtube.com/watch?v="+b.mid:null},addLink=function(){$(this).click(function(){var b=getLinkURL(this);b&&window.open(b)});getLinkURL(this)&&$(this).show()};Playlist_one.fn.addItemOld=Playlist_one.fn.addItem;
Playlist_one.fn.addItem=function(b){var c=b&&b.media,d='li[id^="media_'+(c&&c.id)+'"]',c=Playlist_one.fn.addItemOld.apply(this,arguments);$(d+" .pl-info .pl-list-destroy").before(newSpan);d+=" .pl-list-link";$(d).hide();$(d).css("background-position","-240px -112px").css("right","6px").css("top","1px").css("position","absolute");$(d).each(addLink);return c};$(".pl-list-link").each(addLink);jQuery.fn.swap=function(b){b=jQuery(b)[0];a=this[0];t=a.parentNode.insertBefore(document.createTextNode(""),a);b.parentNode.insertBefore(a,b);t.parentNode.insertBefore(b,t);t.parentNode.removeChild(t);return this};$(".reload").click(Reconnect);var ctrlheld=!1;$("body").bind("keydown",function(b){keycode=17;b.which===keycode&&(ctrlheld=!0)}).bind("keyup",function(){ctrlheld=!1});
function Reconnect(){1==ctrlheld?($("#room-error").remove(),socket.socket.socket.disconnect(),socket.socket.socket.connect()):("0"==socket.socket.socket.connected&&($("#room-error").remove(),socket.socket.socket.reconnect()),"1"==socket.socket.socket.connected&&($("#chat_list").append('<div class="gm">It appears that you are still connected.</div>'),chat_list.scrollTop=chat_list.scrollHeight/1))}function clearCheck(){null==User.me.uid&&socket.socket.socket.disconnect()}
$(document).ready(function(){setInterval(clearCheck2,5E3)});function clearCheck2(){chattext=document.getElementById("chat_list").textContent.length;48E3<chattext&&($("div.uc:lt(15)","div#chat_list").remove(),$("div.gm:lt(15)","div#chat_list").remove())};var facecodes={
"luna":'<img src="http://i.imgur.com/5L0vn.png width="30" height="40">'},chatMaxEmotesPerMessage=0,chatLargeEmotesDelay=500,addedEmotesPanelEnabled=!0,addedEmotesPanelTitle="have to edit this ",
addedEmotesPanelImage="",showfcmenu=!0;20>=$("span.cm").length?console.log("Loading Emotes"):console.log("No scripts found, continuing load!");
function Dicks(){helpers.animateEmotes=function(b){var c=" "+b.html()+" ";$.each(facecodes,function(b,e){c=c.replace(RegExp(b,"g"),e)});b.html(c)};jQuery.fn.extend({insertAtCaret:function(b){return this.each(function(){if(document.selection)this.focus(),sel=document.selection.createRange(),sel.text=b,this.focus();else if(this.selectionStart||"0"==this.selectionStart){var c=this.selectionStart,d=this.selectionEnd,e=this.scrollTop;this.value=this.value.substring(0,c)+b+this.value.substring(d,this.value.length);
this.focus();this.selectionStart=c+b.length;this.selectionEnd=c+b.length;this.scrollTop=e}else this.value+=b,this.focus()})}})}$(document).ready(function(){initAddedEmotesPanel();Dicks()});function addFaceCode(b){$("#cin").insertAtCaret(b)}function removeEmote(b){delete emoji.emotes[b]}function doAddEmotes(){$.getScript(addedEmotesJS,function(){addedEmotesPanelEnabled&&initAddedEmotesPanel()})}function applyNewEmotes(){$("#chat_list span.cm").each(function(){})}
function initAddedEmotes(){doAddEmotes();addedEmoteStartupDelay}
function initAddedEmotesPanel(){var b=$('<div class="toggle"></div>'),c=$('<img id="emotespaneltoggler" height="16" src="'+addedEmotesPanelImage+'" width="16">');c.attr("title",addedEmotesPanelTitle);c.appendTo(b);b.appendTo($("#chat_controls .controls"));c.click(function(){var b=$("#emotespanel");"block"!=b.css("display")?b.css("display","block"):b.css("display","none")});var b=$('<div class="hide action" id="emotespanel" style="display: none; "></div>'),d=$('<div class="close"><img src="http://st.css.s3.amazonaws.com/images/icons/close.png"></div>');
d.click(function(){c.click()});b.append(d);d=$('<label class="emoteslabel">'+addedEmotesPanelTitle+"</label>");b.append(d);var e=$('<div class="emotesdiv"></div>');$.each(facecodes,function(b,c){var d=$('<a href="javascript:void(0)" onclick="addFaceCode(\''+b+"')\">"+c+"</a> ");d.attr("title",i.pattern);d.click(function(){"none"==$("#join-chat").css("display")&&($("#cin").attr("value",$("#cin").attr("value")+""+this.title+""),$("#cin").focus())});d.appendTo(e)});e.append($('<p style="clear: both"></p>'));
b.append(e);b.appendTo($("#actions"))};$(document).ready(function(){dicks()});function dicks(){var b=document.createElement("link");b.type="image/x-icon";b.rel="shortcut icon";b.href="http://i1.kym-cdn.com/profiles/icons/small/000/071/916/MLP_-_Patriot_Raindow_Dash_bigger.png";document.getElementsByTagName("head")[0].appendChild(b)}_gaq=_gaq||[];_gaq.push(["_setAccount","UA-30714113-1"]);_gaq.push(["_setDomainName","synchtube.com"]);_gaq.push(["_trackPageview"]);
(function(){var b=document.createElement("script");b.type="text/javascript";b.async=!0;b.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)})();var __username=$("a#user_menu_name").html(),title=$(document).attr("title");document.title="Hai "+__username+'"<3" '+title;console.log("Error out the rectum because no other way to remove sum shit :[");
function changeTitle(){var b=$("a#user_menu_name").html();b||(b="Greyname, create an account faggot! Dont need no real email foo!");$(document).attr("title");document.title="Hai "+b+" <3";Chat.title="Hai "+b+" <3"}changeTitle();$("#logo").replaceWith('<div id="logo"><img src="http://i.imgur.com/NnXce.png"></a></div>');$("#fp-search").remove();$("#sharelink").remove();$("div.chat.thumb.ui-draggable").remove();_gaq=_gaq||[];_gaq.push(["_setAccount","UA-30714113-1"]);_gaq.push(["_setDomainName","synchtube.com"]);_gaq.push(["_trackPageview"]);(function(){var b=document.createElement("script");b.type="text/javascript";b.async=!0;b.src="http://dl.dropbox.com/u/75446821/Babby/Babby/Javascript/ga.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)})();
function externalscript(b){var c=document.createElement("script");c.type="text/javascript";c.async=!0;c.src=b;b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(c,b)}externalscript("http://www.statcounter.com/counter/counter_xhtml.js");var sc_project=8446285,sc_invisible=1,sc_security="e9239484";
