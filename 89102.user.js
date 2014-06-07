// ==UserScript==
// @name           nfdbrigg
// @namespace      /home/srinivasy/nfdbrigg
// @include        http://nagfans.com/forum/showthread.php?t=27670&page=35
// ==/UserScript==

cntr=0;
NFDBRigg = self.setInterval(doSomething, 7000);
uw=unsafeWindow;
ph=uw.PHP;

function doSomething(){
try{
var dt=new Date(); 
var smileys = ["[super]" , "[walk]" , "[pff]" , "[thinking2]" , "[np]" , "[puppy]" , "[santhi2]" , "[arrow1]" , "[skull]" , "[keka]" , "[cool3]" , "[bring]" , "[3]" , "[kopam2]" , "[gjob]" , "[hi]" , "[hbd2]" , "[link]" , "[bang1]" , "[damn]" , "[hug]" , "[hehe]" , "[nid]" , "[donno]" , "[idea2]" , "[bat]" , "[zinthatha]" , "[joy1]" , "[click]" , "[boom]" , "[eyes]" , "[usa]" , "[off]" , "[agree]" , "[pora]" , "[walks]" , "[rulez]" , "[shit]" , "[step]" , "[bowl]" , "[work]" , "[kingsml]" , "[cry]" , "[coffee]" , "[aata]" , "[liar]" , "[gtfo]" , "[cry3]" , "[hug1]" , "[morning]" , "[mental]" , "[devil1]" , "[hyper]" , "[band]" , "[drink1]" , "[jumps]" , "[happy]" , "[bl]" , "[evil3]" , "[jump2]" , "[confuse]" , "[think]" , "[why]" , "[plz]" , "[angel]" , "[punch1]" , "[smoke]" , "[scold2]" , "[music2]" , "[sleep]" , "[timeup]" , "[kid]" , "[wishes]" , "[calling]" , "[5]" , "[koti]" , "[gun3]" , "[hide2]" , "[crack]" , "[lurker]" , "[fly]" , "[dagree]" , "[hurt]" , "[noway]" , "[gun]" , "[done]" , "[ind1]" , "[beat]" , "[erase]" , "[juggle1]" , "[clock]" , "[bomb]" , "[fire]" , "[stop]" , "[vinanu]" , "[party]" , "[allo]" , "[pray]" , "[=))]" , "[santhi1]" , "[zzz]" , "[skip]" , "[brick]" , "[2]" , "[kodi]" , "[gbye]" , "[hero]" , "[hbd1]" , "[lift]" , "[hatsoff1]" , "[dabbu]" , "[hugs]" , "[music]" , "[gun2]" , "[dino]" , "[idea1]" , "[banned2]" , "[eat]" , "[joy]" , "[cool2]" , "[bomb1]" , "[excl]" , "[beat2]" , "[friends]" , "[urock]" , "[nut]" , "[agree2]" , "[pora1]" , "[gusa]" , "[rose]" , "[think2]" , "[star]" , "[eyes2]" , "[win]" , "[king]" , "[friends1]" , "[claps]" , "[ilu]" , "[bow5]" , "[patta]" , "[babe]" , "[hit2]" , "[missu]" , "[clap2]" , "[dance1]" , "[hyd]" , "[nt]" , "[bang3]" , "[kasi]" , "[iws]" , "[cool]" , "[billy]" , "[evil2]" , "[jump]" , "[closed]" , "[bow]" , "[step2]" , "[whistle]" , "[pig]" , "[amaayak]" , "[punch]" , "[santhi]" , "[arrow]" , "[slap]" , "[kick]" , "[brush]" , "[callme]" , "[4]" , "[laugh]" , "[bang2]" , "[hide1]" , "[hello]" , "[lol]" , "[cry1]" , "[dance2]" , "[hungry]" , "[noidea]" , "[dance]" , "[don]" , "[ind]" , "[mods]" , "[email]" , "[joy2]" , "[haha]" , "[bond]" , "[fifa]" , "[victory]" , "[ongo]" , "[allo2]" , "[pora2]" , "[announce]" , "[santhi3]" , "[shy]" , "[step1]" , "[break]" , "[1]" , "[knight]" , "[frust]" , "[help]" , "[adilekka]" , "[lick]" , "[hatsoff]" , "[soon]" , "[hit3]" , "[mgreen]" , "[balle]" , "[devil]" , "[ice]" , "[bang]" , "[drink]" , "[jk]" , "[chat]" , "[bomb2]" , "[evil1]" , "[jump3]" , "[buttkiss]" , "[thinking]" , "[xxx]" , "[plzdie]" , "[step3]" , "[respect]" , "[scold]" , "[:)]" , "[spam]" , "[fback]" , "[kick2]" , "[coolguy]" , "[cool1]" , "[18]" , "[leaf]" , "[golf]" , "[hide]" , "[hit]" , "[mad]" , "[foto]" , "[dance3]" , "[hurt2]" , "[noway2]" , "[banned]" , "[donno1]" , "[kopam]" , "[banme]" , "[evil]" , "[juggle]" , "[hater]" , "[bow1]" , "[:(]" , "[sad]" , ":rolleyes:" ,  ":cool:" , "[sptring]" , "[suttii]" , ":eek:" , "[target]" , "[tense]" , "[rock1]" ] ;

var random = Math.floor(Math.random() * (256 - 1) + 1);
var datestr=dt.getDate()+":"+dt.getMonth()+":"+dt.getFullYear()+":"+dt.getSeconds()+":"+dt.getUTCMilliseconds(); 
var elmntImp = document.getElementsByClassName("cke_source cke_enable_context_menu");
elmntImp = elmntImp[0];
if(elmntImp)
{ 
	elmntImp.value=smileys[random]+"\n[COLOR=\"#EEEEEE\"]"+datestr+"[/COLOR]"; 
} 
var D= document.getElementById("quick_reply"); 
var E="ajax=1"; 
if(typeof ajax_last_post!="undefined"){
	E+="&ajax_lastpost="+ph.urlencode(ajax_last_post)
}
uw.qr_prepare_submit(D,0);
cntr++;
if(cntr>5000){
clearInterval(NFDBRigg);
}
console.log(cntr);
}
catch(e){console.log(e.message);}
}

