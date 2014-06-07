// ==UserScript==
// @id             
// @name           MareMen synchtube script
// @version        1.07b 03/11/2013
// @author         HoloDash, hasbromlp
// @description    This script is for the emotes in the MareMen synchtube room
// @include        http://togethertube.com/rooms/0a0b55db-2c7e-48a0-8975-8909a32e141f*
// @include        http://www.togethertube.com*
// @run-at         document-end
// ==/UserScript==
//THE ABOVE IS NOT A COMMENT! IT IS FORMATTING DATA FOR USERSCRIPTS.ORG! DO NOT FUCK WITH THIS!
(function(){
document.addEventListener("DOMContentLoaded", function(){
var facecodes={
//Proper fucking formating for emotes
//":name here:":'<img src="imgurlink" width="x" height="y" title="name here">',
//the width and height tags are not nessecary if the image is already 80px or less high and a reasonable width.

//Emotes
//Other:
":1000years:": '<img src="http://i.imgur.com/AnqS7.gif" width="74" height="80" title="1000years">',
":420:":'<img src="http://i.imgur.com/rMIpu.png" width="80" height="66" title="420">',
":adrienbrody:":'<img src="http://i.imgur.com/1QOvjd6.gif" width="124" height="70" title="adrienbrody">',
":america:":'<img src="http://i.imgur.com/tfirKFj.png" title="america">',
":anhero:":'<img src="http://i.imgur.com/5RcdHjR.png" title="anhero">',
":annoyed:":'<img src="http://i.imgur.com/BDeYb4I.gif" title="annoyed">',
":applefwitter:":'<img src="http://i.imgur.com/qSIvAgi.png" title="applefwitter">',
":autism:":'<img src="http://i.imgur.com/yJnky.png" width="70" height="54" title="autism">',
":awesome:":'<img src="http://i.imgur.com/PewaljT.png" title="awesome">',
":badonkadonk:":'<img src="http://i.imgur.com/0z6TGp9.gif" title="badonkadonk">',
":bananas:":'<img src="http://i.imgur.com/d9nVwJD.gif" title="bananas">',
":bateman:":'<img src="http://i.imgur.com/HFv0cpH.jpg" title="bateman">',
":basicmushroom:":'<img src="http://i.imgur.com/hLC1b.png" width="65" height="80" title="basicmushroom">',
":baww:":'<img src="http://i.imgur.com/QcmJw.png" width="80" height="64" title="baww">',
":bedroomeyes:":'<img src="http://i.imgur.com/rv5GO.png" title="bedroomeyes">',
":bestbrony:":'<img src="http://i.imgur.com/u5uGd.png" width="80" height="79" title="bestbrony">',
":bestoc:":'<img src="http://i.imgur.com/OZ9Xkd3.png" title="bestoc">',
":bestship:":'<img src="http://i.imgur.com/xWlE944.png" title="bestship">',
":bigbosssalute:":'<img src="http://i.imgur.com/1fVTpxi.jpg" title="bigbosssalute">',
":bluesbrothers:":'<img src="http://i.imgur.com/Hht5Luc.png" title="bluesbrothers">',
":bongrips:":'<img src="http://i.imgur.com/mM6FE.png" width="59" height="60" title="bongrips">',
":brony:":'<img src="http://i.imgur.com/VOdl7.gif" width="65" height="33" title="brony">',
":burd:": '<img src="http://i.imgur.com/agpKo.gif" width="35" height="36" title="burd">',
":chicken:":'<img src="http://i.imgur.com/WzvS9.png" width="68" height="80" title="chicken">',
":chrischan:":'<img src="http://i.imgur.com/BAwiN.png" width="60" height="80" title="chrischan">',
":cinnamongroove:":'<img src="http://i.imgur.com/JEFMH.png" width="62" height="80" title="cinnamongroove">',
":clop:":'<img src="http://i.imgur.com/M8aYv.png" width="71" height="80" title="clop">',
":cocaine:": '<img src="http://i.imgur.com/FUSU9.png" width="65" height="65" title="cocaine">',
":coolstorybro:":'<img src="http://i.imgur.com/QITik.png" width="120" height="90" title="coolstorybro">',
":correspondent:":'<img src="http://i.imgur.com/7vT7z.png" width="62" height="80" title="correspondent">',
":cuminside:":'<img src="http://i.imgur.com/eBtww.png" title="cuminside">',
":cumonstepitup:":'<img src="http://i.imgur.com/RjfKr.gif" width="80" height="56" title="cumonstepitup">',
":cupcakes:":'<img src="http://i.imgur.com/LTner.gif" width="80" height="67" title="cupcakes">',
":daringjump:": '<img src="http://i.imgur.com/IV1ul.gif" width="65" height="65" title="daringjump">',
":datplot:":'<img src="http://i.imgur.com/x5mxh.png" width="68" height="80" title="datplot">',
":dealwithit:":'<img src="http://i.imgur.com/9RlhTks.gif" title="dealwithit">',
":disapproval:":'<img src="http://i.imgur.com/hLqQdV2.jpg" title="disapproval">',
":disco:":'<img src="http://i.imgur.com/12Q4GhT.gif" title="disco">',
":dog:":'<img src="http://i.imgur.com/Ox31lYe.gif" title="dog">',
":dolan:":'<img src="http://i.imgur.com/X9JVs.png" width="62" height="80" title="dolan">',
":dontgiveafuck:":'<img src="http://i.imgur.com/hqGYX.gif" width="100" height="65" title="dontgiveafuck">',
":douevenlift: ": '<img src="http://i.imgur.com/qw382.gif" width="65" height="65" title="douevenlift">',
":duane:":'<img src="http://i.imgur.com/Z7AK4.gif" width="70" height="47" title="duane">',
":facepalm:":'<img src="http://i.imgur.com/phT05.png" width="67" height="80" title="facepalm">',
":faust:":'<img src="http://i.imgur.com/TSz2m.png" width="80" height="74" title="faust">',
":feel:": '<img src="http://i.imgur.com/vk10K.png" width="65" height="65" title="feel">',
":fillydelphia:":'<img src="http://i.imgur.com/qsRXtjl.png" title="fillydelphia">',
":flutterface:":'<img src="http://i.imgur.com/YuiAj.png" width="69" height="98" title="flutterface">',
":flutterrage:":'<img src="http://i.imgur.com/Y10bZLk.gif" title="flutterrage">',
":foamadventure:":'<img src="http://i.imgur.com/OQN9u.png" width="90" height="59" title="foamadventure">',
":freddie:":'<img src="http://i.imgur.com/p4CpVeV.png" title="freddie">',
":friendshipismagic:":'<img src="http://i.imgur.com/lRrWg.png" width="80" height="80" title="friendshipismagic">',
":fuckingmetal:":'<img src="http://i.imgur.com/qfaNpRE.gif" title="fuckingmetal">',
":fuckthepolice:":'<img src="http://i.imgur.com/nJjCc.png" width="60" height="79" title="fuckhepolice">',
":futashy:":'<img src="http://i.imgur.com/i8AGg.png" width="80" height="64" title="futashy">',
":gildamenow:":'<img src="http://i.imgur.com/o42gF.png" width="80" height="59" title="gildamenow">',
":gendo:":'<img src="http://i.imgur.com/wKFkDz3.png" title="gendo">',
":go:":'<img src="http://i.imgur.com/Vo97C.gif" width="50" height="38" title="go">',
":gone:":'<img src="http://i.imgur.com/8evWa5S.png" title="gone">',
":goodship:":'<img src="http://i.imgur.com/ZbcQq.png" width="90" height="68" title="goodship">',
":gottagofast:":'<img src="http://i.imgur.com/koTZA.gif" width="97" height="73" title="gottagofast">',
":greenandpurple:":'<img src="http://i.imgur.com/LM734.png" width="80" height="73" title="greenandpurple">',
":gun:":'<img src="http://i.imgur.com/hzqzF.gif" width="90" height="90" title="gun">',
":happy:":'<img src="http://i.imgur.com/V8bdCnM.gif" title="happy">',
":hasbro:":'<img src="http://i.imgur.com/zg7DE.gif" title="hasbro">', 
":heilcelestia:":'<img src="http://i.imgur.com/NnX3n.png" width="80" height="71" title="heilcelestia">',
":headbang:":'<img src="http://i.imgur.com/q3Xvy.gif" width="45" height="70" title="headbang">',
":hipster:":'<img src="http://i.imgur.com/zpJr8.png" title="hipster">',
":horatio:":'<img src="http://i.imgur.com/LZqlxwZ.gif" title="horatio">',
":holopone:":'<img src="http://i.imgur.com/AtmABIr.png" title="holopone">',
":horse:":'<img src="http://i.imgur.com/qHZLk.png" title="horse">',
":humans:":'<img src="http://i.imgur.com/JQmps.png" title="humans">',
":ISHYGDDT:":'<img src="http://i.imgur.com/Bftfr.png" width="80" height="80" title="ISHYGDDT">',
":ilovecheese:":'<img src="http://i.imgur.com/Uf2saT8.png" title="ilovecheese">',
":imafilly:":'<img src="http://i.imgur.com/5gPlRwy.png" title="imafilly">',
":implyra:":'<img src="http://i.imgur.com/Q2R53C0.gif" title="implyra">',
":incestisbest:":'<img src="http://i.imgur.com/uKpGTZ3.png" title="incestisbest">',
":iwatchforthis:":'<img src="http://i.imgur.com/KatYs.png" width="80" height="85" title="iwatchforthis">',
":jump:":'<img src="http://i.imgur.com/UPhKb.gif" width="81" height="90" title="jump">',
":killmenow:":'<img src="http://i.imgur.com/ses8j.png" width="62" height="80" title="killmenow">',
":kramer:":'<img src="http://i.imgur.com/a9kBAOv.gif" title="kramer">',
":lamp:":'<img src="http://i.imgur.com/vmc2Y.gif" width="65" height="65" title="lamp">',
":laughingponywhores:":'<img src="http://i.imgur.com/1w3cJ.png" width="80" height="64" title="laughingponywhores">',
":lenny:":'<img src="http://i.imgur.com/xj4Ywxd.gif" width="80" height="80" title="lenny">', 
":letsflytothecastle:":'<img src="http://i.imgur.com/0IiBjXc.gif" title="letsflytothecastle">',
":liarjack:": '<img src="http://i.imgur.com/o8C2u.gif" width="54" height="60" title="liarjack">',
":loadsamoney:":'<img src="http://i.imgur.com/4QZriOW.gif" width="79" height="70" title="loadsamoney">',
":manebang:":'<img src="http://i.imgur.com/7SiJVVZ.gif" title="manebang">',
":mario:":'<img src="http://i.imgur.com/sRoH1.gif" width="37" height="70" title="mario">',
":meelz:":'<img src="http://i.imgur.com/VfMIY.png" width="69" height="73" title="meelz">',
":molestia:":'<img src="http://i.imgur.com/Vroj50b.gif" title="molestia">',
":motherland:":'<img src="http://i.imgur.com/aC1U7.png" width="58" height="80" title="motherland">',
":mu:":'<img src="http://i.imgur.com/NupmKsP.jpg" title="mu">',
":nathan:":'<img src="http://i.imgur.com/sImry.png" width="63" height="80" title="nathan">',
":nigga:":'<img src="http://i.imgur.com/YZZj5.gif" width="75" height="75" title="nigga">',
":NO:":'<img src="http://i.imgur.com/QOqtDIb.gif" title="NO">',
":ohgodwhat:":'<img src="http://i.imgur.com/xMSMj.png" width="82" height="80" title="ohgodwhat">',
":ohmy:":'<img src="http://i.imgur.com/j1qzz.png" width="74" height="80" title="ohmy">',
":ohyou:": '<img src="http://i.imgur.com/d1vK4.png" width="70" height="70" title="ohyou">',
":ooooo:":'<img src="http://i.imgur.com/EbVmtj1.gif" title="ooooo">',
":partysoft:":'<img src="http://i.imgur.com/SEuAuEp.gif" title="partysoft">',
":pinkamena:":'<img src="http://i.imgur.com/FPFAd.gif" width="73" height="80" title="pinkamena">',
":pomf:":'<img src="http://i.imgur.com/a3MoR.png" width="68" height="55" title="pomf">',
":rainboomcrash:":'<img src="http://i.imgur.com/Den1v.png" width="60" height="60" title="rainboomcrash">',
":rainbowdosh:":'<img src="http://i.imgur.com/ybJdGTp.png" title="rainbowdosh">',
":rainbowmaid:":'<img src="http://i.imgur.com/IJG6spP.png" title="rainbowmaid">',
":rainbowthrash:":'<img src="http://i.imgur.com/Ry44xtb.png" title="rainbowthrash">',
":rage:":'<img src="http://i.imgur.com/PT1XW.png" title="rage">',
":rape:":'<img src="http://i.imgur.com/iWhQMRO.jpg" title="rape">',
":removekebab:":'<img src="http://i.imgur.com/9vFH0pb.jpg?1" title="removekebab">',
":ricky:":'<img src="http://i.imgur.com/N5yvR.jpg" width="80" height="80" title="ricky">',
":rustled:":'<img src="http://i.imgur.com/Iywwprn.gif" title="rustled">',
":salute:":'<img src="http://i.imgur.com/ddJAI6I.png" title="salute">',
":sanic:":'<img src="http://i.imgur.com/0CfVp.png" width="46" height="80" title="sanic">',
":science:":'<img src="http://i.imgur.com/LMMxD.png" title="science">',
":scootaluna:":'<img src="http://i.imgur.com/kOhsl.png" width="72" height="80" title="scootaluna">',
":screamsinternally:":'<img src="http://i.imgur.com/fk0FYnf.jpg" title="screamsinternally">',
":seriously:":'<img src="http://i.imgur.com/QLGkdEn.png" title="seriously">',
":shakeyobooty:":'<img src="http://i.imgur.com/j5naXH6.gif" title="shakeyobooty">',
":shiggydiggy:":'<img src="http://i.imgur.com/RauQazC.png" title="shiggydiggy">',
":smokeweed:":'<img src="http://i.imgur.com/5rq0l.gif" width="21" height="49" title="smokeweed">',
":snoop:": '<img src="http://i.imgur.com/wywzX.gif" width="50" height="55" title="snoop">',
":soawesome:":'<img src="http://i.imgur.com/leMkNtB.jpg" title="soawesome">',
":soon:":'<img src="http://i.imgur.com/i93A3.png" width="88" height="60" title="soon">',
":spoiler:":'<img src="http://i.imgur.com/qJhAp21.jpg" title="spoiler">',
":stanza:":'<img src="http://i.imgur.com/cHMmhCQ.jpg" title="stanza">',
":startrek:":'<img src="http://i.imgur.com/9kTvVwy.jpg" title="startrek">',
":stonerrarity:":'<img src="http://i.imgur.com/IWpZF.png" width="95" height="94" title="stonerrarity">',
":stonershy:":'<img src="http://i.imgur.com/UIiEr.gif" width="76" height="90" title="stonershy">',
":swag:":'<img src="http://i.imgur.com/pyHF6gu.jpg" title="swag">',
":sweetcelestia:":'<img src="http://i.imgur.com/zfMGs.png" width="71" height="80" title="sweetcelestia">',
":tara:":'<img src="http://i.imgur.com/lxjRu.jpg" width="80: height="80" title="tara">',
":tarastrong:":'<img src="http://i.imgur.com/Cp90O.png" width="80" height="80" title="tarastrong">',
":techno:":'<img src="http://i.imgur.com/R79sX.gif" width="150" height="93" title="techno">',
":tongue:":'<img src="http://i.imgur.com/w1p4h.gif" width="71" height="80" title="tongue">',
":troll:":'<img src="http://i.imgur.com/w0wFN.png" width="30" height="25" title="troll">',
":tulpa:":'<img src="http://i.imgur.com/61k96.png" width="84" height="80" title="tulpa">',
":twhylight:":'<img src="http://i.imgur.com/xbkwV.jpg" title="twhylight">',
":twily":'<img src="http://i.imgur.com/3u8dS.jpg" title="twily">',
":uk:":'<img src="http://i.imgur.com/VCGPJXm.png" title="uk">',
":usa:":'<img src="http://i.imgur.com/5Ke6f.gif" width="62" height="70" title="usa">',
":ussr:":'<img src="http://i.imgur.com/eTPae1Q.png" title="ussr">',
":whatever:":'<img src="http://i.imgur.com/WrtrT.png" width="60" height="59" title="whatever">',
":wink:":'<img src="http://i.imgur.com/tekFGbc.png" title="wink">',
":woopwoop:":'<img src="http://i.imgur.com/FitiS3y.gif" title="woopwoop">',
":world:": '<img src="http://i.imgur.com/E5I6b.gif" width="65" height="65" title="world">',
":wub:":'<img src="http://i.imgur.com/tWlGu.gif" width="80" height="76" title="wub">',
":youreawesome:":'<img src="http://i.imgur.com/B8oZntn.gif" width="106" height="80" title="youreawesome">',
":yourtooslow:":'<img src="http://i.imgur.com/3vanI.gif" width="97" height="73" title="yourtooslow">',

//Mane Six
":applejack:":'<img src="http://i.imgur.com/gtdbiwW.png" title="applejack">',
":fluttershy:":'<img src="http://i.imgur.com/St5O068.jpg" title="fluttershy">',
":pinkiepie:":'<img src="http://i.imgur.com/JZRpb7s.png" title="pinkiepie">',
":rainbowdash:":'<img src="http://i.imgur.com/lff8bJv.png" title="rainbowdash">',
":rarity:":'<img src="http://i.imgur.com/kSxy4Ei.png" title="rarity">',
":twilightsparkle:":'<img src="http://i.imgur.com/dCNSFJE.png" title="twilightsparkle">',

//CMC
":applebloom:":'<img src="http://i.imgur.com/t0IuE.png" width="62" height="80" title="applebloom">',
":cmc:":'<img src="http://i.imgur.com/mHgnnbQ.png" title="cmc">',
":scootaloo:":'<img src="http://i.imgur.com/S6tOq.png" width="72" height="80" title="scootaloo">',
":sweetiebelle:":'<img src="http://i.imgur.com/lyryF.png" width="67" height="81" title="sweetiebelle">',

//Princessess
":cadence:":'<img src="http://i.imgur.com/R1F0R.jpg" title="cadence">',
":celestia:":'<img src="http://i.imgur.com/djo0G.jpg" width="100" height="42" title="celestia">',
":luna:":'<img src="http://i.imgur.com/bfnQdkT.png" title="luna">',
":twilicorn:":'<img src="http://i.imgur.com/242TVza.png" title="twilicorn">',

//BG Characters
":applefritter:":'<img src="http://i.imgur.com/71ZTs.png" width="76" height="80" title="applefritter">',
":berrypunch:":'<img src="http://i.imgur.com/CVy1q.png" width="96" height="60" title="berrypunch">',
":bonbon:":'<img src="http://i.imgur.com/VMwDOgu.png" title="bonbon">',
":braeburn:":'<img src="http://i.imgur.com/7JqGcpP.png" title="braeburn">',
":bigmacintosh:":'<img src="http://i.imgur.com/g6dus.png" width="73" height="80" title="bigmacintosh">',
":cheerilee:":'<img src="http://i.imgur.com/hn7Xg.png" width="125" height="64" title="cheerilee">',
":cheeselegs:":'<img src="http://i.imgur.com/UnOk0.png" width="90" height="51" title="cheeselegs">',
":cloudchaser:":'<img src="http://i.imgur.com/rvETZ.png"title="cloudchaser">',
":colgate:":'<img src="http://i.imgur.com/LHJbLa5.png" title="colgate">',
":derpyhooves:":'<img src="http://i.imgur.com/CSHo2.png" title="derpyhooves">',
":daringdo:":'<img src="http://i.imgur.com/UmlnjXP.png" title="daringdo">',
":firefly:":'<img src="http://i.imgur.com/3xo6F.png" title="firefly">',
":flitter:":'<img src="http://i.imgur.com/HvpMf.png" title="flitter">',
":gilda:":'<img src="http://i.imgur.com/alupK.png" width="107" height="90" title="gilda">',
":goldenharvest:":'<img src="http://i.imgur.com/4JTeo.png" width="98" height="60" title="goldenharvest">',
":grannysmith:":'<img src="http://i.imgur.com/dKANG.png" width="69" height="90" title="grannysmith">',
":hoitytoity:":'<img src="http://i.imgur.com/IxNCsEu.jpg" title="hoitytoity">',
":littlestrongheart:":'<img src="http://i.imgur.com/WAGn1.jpg" width="83" height="100" title="littlestrongheart">',
":lyraheartstrings:":'<img src="http://i.imgur.com/AIkhlpT.png" title="lyraheartstrings">',
":minty:":'<img src="http://i.imgur.com/MPUef.png" width="78" height="80" title="minty">',
":nurseredheart:":'<img src="http://i.imgur.com/ogI9c.png" title="nurseredheart">',
":octavia:":'<img src="http://i.imgur.com/9FgpO.png" width="103" height="80" title="octavia">',
":pipsqueak:":'<img src="http://i.imgur.com/Kceyv.png" width="62" height="80" title="pipsqueak">',
":roseluck:":'<img src="http://i.imgur.com/MHiwz.png" width="104" height="80" title="roseluck">',
":royalguard:":'<img src="http://i.imgur.com/ixeLW.png" width="71" height="80" title="royalguard">',
":snails:":'<img src="http://i.imgur.com/5dYgz.png" width="74" height="80" title="snails">',
":soarin:":'<img src="http://i.imgur.com/RuoMj.png" width="61" height="70" title="soarin">',
":spike:":'<img src="http://i.imgur.com/f78IW.png" width="96" height="77" title="spike">',
":spitfire:":'<img src="http://i.imgur.com/oRjeX.png" width="74" height="80" title="spitfire">',
":stevenmagnet:":'<img src="http://i.imgur.com/9B76z.png" title="stevenmagnet">',
":thunderlane:":'<img src="http://i.imgur.com/RlnqJ.png" title="thunderlane">',
":trixie:":'<img src="http://i.imgur.com/xxN6cQw.png" title="trixie" title="trixie">',
":twinkleshine:":'<img src="http://i.imgur.com/l7b8j.png" width="68" height="80" title="twinkleshine">',
":twist:":'<img src="http://i.imgur.com/9ghcy.png" width="73" height="80" title="twist">',
":vinylscratch:":'<img src="http://i.imgur.com/xmBpSfE.jpg" title="vinylscratch">',
":zecora:":'<img src="http://i.imgur.com/j0Anw.jpg" width="80" height="80" title="zecora">',

//User emotes:
":captainussr:":'<img src="http://i.imgur.com/UvmKKpl.png" title="captainussr">',
":coinpo:":'<img src="http://i.imgur.com/VUj4XDv.png" width="70" height="70" title="coinpo">',
":holodash:":'<img src="http://i.imgur.com/HddvoYi.png" title="holodash">',
":pooptickler1:":'<img src="http://i.imgur.com/9CJ0nLc.jpg" title="pooptickler1">',
":seiko:":'<img src="http://i.imgur.com/bLHzd9e.jpg" title="seiko">',
":yesfan:":'<img src="http://i.imgur.com/oT0asVF.jpg" width="124" height="70" title="yesfan">',


//User names:
'AnusVulture:' : '<span style="font-weight:bold;"><font color=pink>Anus</font><font color=brown>Vulture</font>:</span>',
'BAYNUBS:' : '<span style="color:orange; font-weight:bold;">BAYNUBS</span><span style="font-weight:bold;">:</span>',
'Beefmann:' : '<span style="font-weight:bold;"><font color=silver>Beef</font>mann:</span>',
'CaptainUSSR:' : '<span class="Unicode"><span style="color:#FDD700">&#9773</span></span><span style="color:#CC0000; font-weight:bold;">CaptainUSSR</span><span style="font-weight:bold;">:</span>',
'CMCSpitfire:' : '<span style="font-weight:bold;"><font color=#070B75>C</font><font color=#0E1281>M</font><font color=#161A8D>C</font><font color=#1D2299>S</font><font color=#2529A5>p</font><font color=#2C31B1>i</font><font color=#3439BD>t</font><font color=#3B40C9>f</font><font color=#4348D5>i</font><font color=#4A50E1>r</font><font color=#5258ED>e</font>:</span>',
'dantheponyman:' : '<span style="font-weight:bold;"><font color="#54277A">danthe</font><font color="#C53282">pony</font><font color="#FFE67A">man</font>:</span>',
'DocBlock:' : '<span style="font-weight:bold;"><font color=#000099>Doc</font><font color=#006600>Block</font>:</span>',
'GrimGravy:' : '<span style="font-weight:bold;"><font color="#002868">Grim</font><font color="#708090">Gravy</font>:</span>',
'hardcorn:' : '<span style="font-weight:bold;"><FONT COLOR="#3C4D85">hard</FONT><FONT COLOR="#F0599C">c</FONT><FONT COLOR="#7744A1">o</FONT><FONT COLOR="#3C4D85">rn</FONT>:</span>',
'HoloDash:' : '<span style="font-weight:bold;"><FONT COLOR="#FF0000">H</FONT><FONT COLOR="#FF8000">o</FONT><FONT COLOR="#FFff00">l</FONT><FONT COLOR="#00ff00">o</FONT><FONT COLOR="#00ff80">D</FONT><FONT COLOR="#00ffff">a</FONT><FONT COLOR="#0080ff">s</FONT><FONT COLOR="#4700ff">h</FONT>:</span>',
'FinchiBird:' : '<span style="font-weight:bold;"><font color=green>Finchi</font><font color=gold>Burd</font>:</span>',
'MareMen:' : '<span style="color:green; font-family:terminal;">MareBot:</span>',
'pooptickler1:' : '<span style="color:#522900; font-weight:bold;">pooptickler1:</span>',
'Porkboy:' : '<span style="color:#FFC36B; font-weight:bold;">Porkboy</span><span style="font-weight:bold;">:</span>',
'RedneckRampage:' : '<span style="font-weight:bold;"><font color="#BF0A30">Redneck</font><font color="#002868">Rampage</font>:</span>',
'Seiko:' : '<span style="color:pink; font-weight:bold;">Seikonyaa</span><span style="font-weight:bold;">:</span>',
'Yesfan:' : '<span style="color:#F7438C; font-weight:bold;">Yesfan</span><span style="font-weight:bold;">:</span>',

//Wordfilters:
"epample":"EXAPMLE",


//Text formatting:
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

':b:' : '<span style="font-weight:bold">',
':i:' : '<span style="font-style:italic">',
':u:' : '<span style="text-decoration:underline">',
':x:' : '<span style="text-decoration:line-through">',

':comicsans:' : '<span style="font-family: fantasy, cursive, Serif">',
':terminal:' : '<span style="font-family:terminal">',

':end:' : '</span>',
':e:' : '</span>',


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

