// ==UserScript==
// @id             150353
// @name           The LGS Script
// @version        1.5.1
// @namespace      surewhatever
// @author         Anonguy
// @description    I'd like to thank the line of script I stole from some faggots script that made this possible. Also no one likes trixie. 
// @include        http://www.synchtube.com/r/littlegirlshow 
// @include        http://www.synchtube.com/r/littlegirlshow# 
// @include        http://www.synchtube.com/r/littlegirlshow?chat_only
// @include        http://www.sycnhtube.com/r/littlegirlshow?chat_only#
// @run-at         document-end
// ==/UserScript==



(function(){
document.addEventListener("DOMContentLoaded", function(){
var facecodes={
":angel:":'<img src="http://i.imgur.com/fw5zm.png" width="80" height="80">',

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

":spike:":'<img src="http://i.imgur.com/f78IW.png" width="96" height="77">',

":spitfire:":'<img src="http://i.imgur.com/oRjeX.png" width="74" height="80">',

":sweetiebelle:":'<img src="http://i.imgur.com/lyryF.png" width="67" height="81">',

":trixie:":'<img src="http://i.imgur.com/Xb4np.png" width="147" height="80">',

":twilightsparkle:":'<img src="http://i.imgur.com/ER6uH.png" width="80" height="56">',

":twinkleshine:":'<img src="http://i.imgur.com/l7b8j.png" width="68" height="80">',

":twist:":'<img src="http://i.imgur.com/9ghcy.png" width="73" height="80">',

":wub:":'<img src="http://i.imgur.com/tWlGu.gif" width="80" height="76">',

":zecora:":'<img src="http://i.imgur.com/j0Anw.jpg" width="80" height="80">',

":soarin:":'<img src="http://i.imgur.com/74RXz.png" width="61" height="70">',


":chicken:":'<img src="http://i.imgur.com/WzvS9.png" width="68" height="80">',

":correspondent:":'<img src="http://i.imgur.com/7vT7z.png" width="62" height="80">',

":faust:":'<img src="http://i.imgur.com/TSz2m.png" width="80" height="74">',

":futashy:":'<img src="http://i.imgur.com/i8AGg.png" width="80" height="64">',

":lyra:":'<img src="http://i.imgur.com/MXsKC.png" width="80" height="77">',

":pinkamenadianepie:":'<img src="http://i.imgur.com/FPFAd.gif" width="73" height="80">',

":tarastrong:":'<img src="http://i.imgur.com/Cp90O.png" width="80" height="80">',


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


":bestmod:":'<img src="http://i.imgur.com/G5M5n.png" width="77" height="86">',

":jewclops:":'<img src="http://i.imgur.com/o2vNw.png" width="80" height="74">',

":jewswaifu:":'<img src="http://i.imgur.com/XUfe1.png" width="71" height="80">',

":lgsclops:":'<img src="http://i.imgur.com/4tzBr.png" width="75" height="61">',

":littlegirlshow:":'<img src="http://i.imgur.com/K9RSr.png" width="80" height="52">',

":mrchess:":'<img src="http://i.imgur.com/ECfaj.png" width="68" height="60">',

":penspin:":'<img src="http://i.imgur.com/L7dKb.gif" width="80" height="80">',

":rightye:":'<img src="http://i.imgur.com/ifJJH.png" width="85" height="80">',

":senor:":'<img src="http://i.imgur.com/QJsS6.png" width="50" height="55">',

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

":burd:": '<img src="http://i.imgur.com/agpKo.gif" width="35" height="36">',

":duane:":'<img src="http://i.imgur.com/Z7AK4.gif" width="70" height="47">',

":mario:":'<img src="http://i.imgur.com/sRoH1.gif" width="37" height="70">',

":smokeweed:":'<img src="http://i.imgur.com/5rq0l.gif" width="21" height="49">',

":ohgodwhat:":'<img src="http://i.imgur.com/xMSMj.png" width="82" height="80">',

":scootaluna:":'<img src="http://i.imgur.com/kOhsl.png" width="72" height="80">',

":uncle:":'<img src="http://i.imgur.com/X9JVs.png" width="62" height="80">',

":greenandpurple:":'<img src="http://i.imgur.com/LM734.png" width="80" height="73">',

":ohyou:": '<img src="http://i.imgur.com/d1vK4.png" width="70" height="70">',

":pokerface:": '<img src="http://i.imgur.com/o8C2u.gif" width="54" height="60">',

":1000years:": '<img src="http://i.imgur.com/AnqS7.gif" width="74" height="80">',

":snoop:": '<img src="http://i.imgur.com/wywzX.gif" width="50" height="55">',

":feel:": '<img src="http://i.imgur.com/vk10K.png" width="65" height="65">',

":dontgiveafuck:":'<img src="http://i.imgur.com/hqGYX.gif" width="100" height="65">',

":pomf:":'<img src="http://i.imgur.com/a3MoR.png" width="68" height="55">',

":sweetcelestia:":'<img src="http://i.imgur.com/zfMGs.png" width="71" height="80">',



"brohoof":"brofist",

"Brohoof":"Brofist",

"BroHoof":"BroFist",

"BROHOOF":"BROFIST",

"bro hoof":"brofist",

"Bro hoof":"Brofist",

"Bro Hoof":"BroFist",

"BRO HOOF":"BROFIST",

"brohoove":"brofist",

"Brohoove":"Brofist",

"BroHoove":"BroFist",

"BROHOOVE":"BROFIST",

"bro hoove":"brofist",

"Bro hoove":"Brofist",

"Bro Hoove":"BroFist",

"BRO HOOVE":"BROFIST",

"everypony":"everybody",

"Everypony":"Everybody",

"EVERYPONY":"EVERYBODY",

"EveryPony":"EveryBody",

"everypone":"everybody",

"Everypone":"Everybody",

"EVERYPONE":"EVERYBODY",

"EveryPone":"EveryBody",

"everyponi":"everybody",

"Everyponi":"Everybody",

"EVERYPONI":"EVERYBODY",

"EveryPoni":"EveryBody",

"anypony":"anybody",

"Anypony":"Anybody",

"ANYPONY":"ANYBODY",

"AnyPony":"Anybody",

"anypone":"anybody",

"Anypone":"Anybody",

"ANYPONE":"ANYBODY",

"AnyPone":"AnyBody",

"anyponi":"anybody",

"Anyponi":"Anybody",

"ANYPONI":"ANYBODY",

"AnyPoni":"AnyBody",

"somepony":"somebody",

"Somepony":"Somebody",

"SOMEPONY":"SOMEBODY",

"SomePony":"SomeBody",

"somepone":"somebody",

"Somepone":"Somebody",

"SOMEPONE":"SOMEBODY",

"SomePone":"SomeBody",

"someponi":"somebody",

"Someponi":"Somebody",

"SOMEPONI":"SOMEBODY",

"SomePoni":"SomeBody",

"nopony":"nobody",

"Nopony":"Nobody",

"NOPONY":"NOBODY",

"NoPony":"NoBody",

"nopone":"nobody",

"Nopone":"Nobody",

"NOPONE":"NOBODY",

"NoPone":"NoBody",

"noponi":"nobody",

"Noponi":"Nobody",

"NOPONI":"NOBODY",

"NoPoni":"NoBody",

"what the hay":"what the hell",

"What the hay":"What the hell",

"WHAT THE HAY":"WHAT THE HELL",

"lemonkeyface":"I am a faggot",

"lemonkey face":"I am a faggot",

"Iemonkeyface":"I am a faggot",

"Iemonkey face":"I am a faggot",

"PONIES ARE FOR FAGGOTS":"VIDYA4CHAN IS FOR FAGGOTS",

"PONIESAREFORFAGGOTS":"VIDYA4CHANISFORFAGGOTS",

"PONYS ARE FOR FAGGOTS":"VIDYA4CHAN IS FOR FAGGOTS",

"PONYSAREFORFAGGOTS":"VIDYA4CHANISFORFAGGOTS",


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
