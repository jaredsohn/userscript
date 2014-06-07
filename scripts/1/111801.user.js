// ==UserScript==
// @name          Darkchatter
// @include       http*://*dark-chat.info/*
// ==/UserScript==

// Release version 1.01 

// by joe
// special thanks to blue and npg
// and green

// v1.00 release
// v1.01 fixed duck roll,+1 image (octo),shorter image names


window.setTimeout(function(){


var star_panel_authorized="NO";



var pad=document.getElementsByClassName("frame-padding")[0];
pad.setAttribute("style", "width:75%;");


var ok=document.getElementsByClassName("frame-simple")[0];
var sidex = document.createElement("div");
sidex.setAttribute("style", "position:absolute; height:100%; top:0; left:75%;");
sidex.setAttribute("id", "darkbar");
sidex.innerHTML='<div style="float:right; font-size:.4em;"><span style="cursor: help;" ondragstart="return false" onselectstart="return false" id="logo">--DARKCHATTER--</span><br /><small>IMAGES <span style="cursor: default;" id="i0">( ) Hide</span>  <span style="cursor: default;" id="i1">(x) Show</span>  <span style="cursor: default;" id="i2">[x] Show filenames</span></small><br /><small>&nbsp;VIDEOS <span style="cursor: default;" id="v0">( ) Hide</span>  <span style="cursor: default;" id="v1">(x) Show</span>  <span style="cursor: default;" id="v2">[x] Disable autoplay</span></small><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br /><span style="cursor:hand; cursor:pointer;" id="starbutton">&#9733;&#9733;&#9733;</span> | <span style="cursor:hand; cursor:pointer;" id="loggerbutton"><u>Logger</u></span> | <span style="cursor:hand; cursor:pointer;" id="wordlistbutton">Wordlist</span></div>';
ok.appendChild(sidex);

var outer=document.getElementsByClassName("frame-outer")[0];
outer.style.right="0px;"; //?
// Logger:
var logger = document.createElement("div");
logger.setAttribute("style", "position:absolute; font-size:1em; overflow:auto; height:100%; top:0; left:75%; color:#fff; width:250px;");
logger.setAttribute("id", "logger");
outer.appendChild(logger);
// Wordlist:
var worder = document.createElement("div");
worder.setAttribute("style", "cursor: default; position:absolute; font-size:1em; overflow:auto; height:100%; top:0; left:75%; color:#fff; width:250px;");
worder.style.display="none";
worder.setAttribute("id", "worder"); // swears, site colors, text colors, videos, images

worder.innerHTML+='<strong>Swears</strong><br />'; //swears
worder.innerHTML+='<span style="color:brown;" onclick="var input=document.getElementsByTagName(\'input\')[0]; input.focus(); input.value+=\'nig&#173;ger\';">nig&#173;ger</span> / <span style="color:brown;" onclick="var input=document.getElementsByTagName(\'input\')[0]; input.focus(); input.value+=\'Nig&#173;ger\';">Nig&#173;ger</span> / <span style="color:brown;" onclick="var input=document.getElementsByTagName(\'input\')[0]; input.focus(); input.value+=\'NIG&#173;GER\';">NIG&#173;GER</span><br /><br />';

worder.innerHTML+='<strong>Site colors</strong><br />'; //site colors
var qq={red:[139,0,0],yellow:[255,255,0],green:[0,128,0],cyan:[0,255,255],blue:[0,0,255],purple:[128,0,128]};
var str="";
for(prop in qq){str+='<span name="sitecolor" onclick="var input=document.getElementsByTagName(\'input\')[0]; input.focus(); input.value=\''+prop+'\';" style="color:rgb('+qq[prop]+')">'+prop + "</span> ";} 
worder.innerHTML+=str;

worder.innerHTML+='<br /><br /><strong>Text colors</strong><br />'; //text colors
var qq={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],
darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],
darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],
darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],
lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],
lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],
purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]};
var str="";
for(prop in qq){if(prop=="black")str+="<span style=\"background-color: #FFF;\">"; str+='<span name="textcolor" onclick="var input=document.getElementsByTagName(\'input\')[0]; input.focus(); input.value=\''+prop+'\';" style="color:rgb('+qq[prop]+')">'+prop + "</span>";if(prop=="black")str+="</span>";str+=" ";} 
worder.innerHTML+="<small>"+str+"</small>"; 

var ii=0; document.getElementById("logo").addEventListener("click",function(event){var input=document.getElementsByTagName("input")[0]; input.focus(); if (ii==42)ii=0; event.target.style.color=document.getElementsByName("textcolor")[ii].style.color; if(ii==3)event.target.style.backgroundColor="white"; else event.target.style.backgroundColor="black"; ii++;},false);
// ::-moz-selection{background: black;} ::selection {background: black;} 

// worder.innerHTML+='<br /><br /><strong>Newfound discoveries</strong>'; // coming soon?

worder.innerHTML+='<br /><br /><strong>Videos</strong><br />'; //videos // white and cyan

var vidqq={ // VIDEO LIST
// message me with new discoveries
epic_sax_guy:["youtube.com/v/VrdwhXNt4qw"],
giga_puddi:["youtube.com/v/KyucG76N9PY"],
how_is_babby_formed:["youtube.com/v/w_RaPOOVX1Y"],
jazz_nyan:["youtube.com/v/AaEmCFiNqP0"],
mango:["youtube.com/v/AnKysErG4hA"],
nyan_cat:["youtube.com/v/S1r47FTktSo"],
orange_nyan:["youtube.com/v/0XrRwruU8DE"],
over_9000:["youtube.com/v/SiMHTK15Pik"],
peanut_butter_jelly:["youtube.com/v/Z3ZAGBL6UBA"],
trololo:["youtube.com/v/iwGFalTRHDA"]};
// message me with new discoveries
var str=""; var vn=-1,vcolor;
for(prop in vidqq){
prop=prop.replace(/_/g, " ");
if (vn%2)vcolor=' style="color:cyan;"'; else vcolor='';
str+='<span'+vcolor+' name="imagesx" onclick="var input=document.getElementsByTagName(\'input\')[0]; input.focus(); input.value=\''+prop+'\'; document.getElementsByTagName(\'button\')[0].click();">'+prop+"</span> "; vn++;} 
worder.innerHTML+="<small>"+str+"</small>";


worder.innerHTML+='<br /><br /><strong>Images</strong><br />'; //images // white and lime

var imgqq={ // IMAGE LIST
// message me with new discoveries
heart:[],are_you_a_wizard:[],awesome:[],barack:[" obama"],beer:[],bill:[" kaulitz"],boxxy:[],boxxy_2:[],boxxy_3:[],
britney:[" spears"],cake:[],ceiling_cat:[],cereal_guy:[],challenge_accepted:[],chuck:[" norris"],cookies:[],
come_at_me_bro:[],cool_story_bro:[],creeper:[],deal_with_it:[],do_not_want:[],do_want:[],duck_roll:[],eat_my_victims:[],
excellent:[],facepalm:[],feels_bad_man:[],feels_good_man:[],fail:[],fial:[],forever_alone:[],fu:[],fuck_yeah:[],fuzzy_troll:[],george:[" bush"],
get_off_the_table:[],green_wine:[],justin:[" bieber"],meh:[],moar:[],moot:[],haters_gonna_hate:[],homers_brain:[],impossibru:[],
internet:[],intredasting:[],like_a_boss:[],lindsay:[" lohan"],llama:[],lol_wut:[],long_cat:[],me_gusta:[],miley:[" cyrus"],
moon_flowers:[],nerd:[],no_u:[],no_wai:[],nooooooooooooo:[],o_rly:[],octopus_beard_disagrees:[],okay_guy:[],paris:[" hilton"],pedo_bear:[],penis_error:[],
picture_unrelated:[],poker_face:[],pony:[],premium_membership:[],problem:[],puddi:[],quaak:[],rage:[],rebecca:[" black"],
rick:[" astley"],rules:[],selena:[" gomez"],son_i_am_disappoint:[],spongebob:[],srsly:[],stfu:[],the_game:[],time:[],
tits_or_gtfo:[],u_jelly:[],u_mad:[],what_is_this:[],what_the_fuck_am_i_reading:[],who_cares:[],wtf:[],y_u_no:[],y_u_no_love_my_song:[],
ya_rly:[],ya_srsly:[],yay:[]}; // message me with new discoveries
//alert(imgqq.[0][0]);
var str=""; var vn=-1,vcolor; 
for(prop in imgqq){
prop=prop.replace(/_/g, " ");
prop=prop.replace(/homers/g, "homer's"); 
prop=prop.replace(/heart/g, "<3");
if (vn%2)vcolor=' style="color:lime;"'; else vcolor='';
str+='<span'+vcolor+' name="imagesx" onclick="var input=document.getElementsByTagName(\'input\')[0]; input.focus(); input.value=\''+prop+'\'; document.getElementsByTagName(\'button\')[0].click();"">'+prop+"</span> "; if(vn==14){var sx="var sm=document."+prop.replace(/s/g, "")+";"; var sl=prop.replace(/s/g, "")+"=";} vn++;} 
worder.innerHTML+="<small>"+str+"</small>";


outer.appendChild(worder);
// Star:
var star = document.createElement("div");
star.setAttribute("style", "position:absolute; font-size:1em; overflow:auto; height:100%; top:0; left:75%; color:#fff; width:250px;");
star.style.display="none";
star.setAttribute("id", "star");
if (star_panel_authorized=="NO"){ // Not authorized
star.innerHTML="<small><strong><a id=\"xx\" href=\"#\" onclick=\"document.getElementById('star').innerHTML='';\">[X]</a> Access Denied</strong><br />You are not authorized to view this panel.</small>"; 
}
if (star_panel_authorized=="YES") // Authorized
star.innerHTML="<strong>&#78;&#105;&#99;&#101;&#32;&#116;&#114;&#121;&#44;&#32;&#102;&#97;&#103;&#103;&#111;&#116;</strong>";
outer.appendChild(star);
//--
document.getElementById("loggerbutton").addEventListener("click",function(event){logger.style.display="block"; star.style.display="none"; worder.style.display="none"; event.target.innerHTML="<u>Logger</u>"; document.getElementById("starbutton").innerHTML="&#9733;&#9733;&#9733;"; document.getElementById("wordlistbutton").innerHTML="Wordlist"; logger.scrollTop=logger.scrollHeight;},false);
document.getElementById("wordlistbutton").addEventListener("click",function(event){worder.style.display="block"; star.style.display="none"; logger.style.display="none"; event.target.innerHTML="<u>Wordlist</u>"; document.getElementById("starbutton").innerHTML="&#9733;&#9733;&#9733;"; document.getElementById("loggerbutton").innerHTML="Logger";},false);
document.getElementById("starbutton").addEventListener("click",function(event){star.style.display="block"; worder.style.display="none"; logger.style.display="none"; event.target.innerHTML="<u>&#9733;&#9733;&#9733;</u>"; document.getElementById("wordlistbutton").innerHTML="Wordlist"; document.getElementById("loggerbutton").innerHTML="Logger";},false);
//--
document.getElementById("i0").addEventListener("click",function(event){if(event.target.innerHTML!="(x) Hide"){event.target.innerHTML="(x) Hide"; document.getElementById("i1").innerHTML="( ) Show"; if(document.getElementById("i2").innerHTML=="[ ] Show filenames") document.getElementById("i2").innerHTML="<s>[ ] Show filenames</s>"; if(document.getElementById("i2").innerHTML=="[x] Show filenames")document.getElementById("i2").innerHTML="<s>[x] Show filenames</s>";}},false);
document.getElementById("i1").addEventListener("click",function(event){if(event.target.innerHTML!="(x) Show"){event.target.innerHTML="(x) Show"; document.getElementById("i0").innerHTML="( ) Hide"; if(document.getElementById("i2").innerHTML=="<s>[ ] Show filenames</s>") document.getElementById("i2").innerHTML="[ ] Show filenames"; if(document.getElementById("i2").innerHTML=="<s>[x] Show filenames</s>")document.getElementById("i2").innerHTML="[x] Show filenames";}},false);
document.getElementById("i2").addEventListener("click",function(event){var xv=0; if(document.getElementById("i1").innerHTML=="(x) Show"){if(event.target.innerHTML=="[ ] Show filenames"){xv=1; event.target.innerHTML="[x] Show filenames";} if(event.target.innerHTML=="[x] Show filenames" && xv==0)event.target.innerHTML="[ ] Show filenames";}},false);
document.getElementById("v0").addEventListener("click",function(event){if(event.target.innerHTML!="(x) Hide"){event.target.innerHTML="(x) Hide"; document.getElementById("v1").innerHTML="( ) Show"; if(document.getElementById("v2").innerHTML=="[ ] Disable autoplay") document.getElementById("v2").innerHTML="<s>[ ] Disable autoplay</s>"; if(document.getElementById("v2").innerHTML=="[x] Disable autoplay")document.getElementById("v2").innerHTML="<s>[x] Disable autoplay</s>";}},false);
document.getElementById("v1").addEventListener("click",function(event){if(event.target.innerHTML!="(x) Show"){event.target.innerHTML="(x) Show"; document.getElementById("v0").innerHTML="( ) Hide"; if(document.getElementById("v2").innerHTML=="<s>[ ] Disable autoplay</s>") document.getElementById("v2").innerHTML="[ ] Disable autoplay"; if(document.getElementById("v2").innerHTML=="<s>[x] Disable autoplay</s>")document.getElementById("v2").innerHTML="[x] Disable autoplay";}},false);
document.getElementById("v2").addEventListener("click",function(event){var xv=0; if(document.getElementById("v1").innerHTML=="(x) Show"){if(event.target.innerHTML=="[ ] Disable autoplay"){xv=1; event.target.innerHTML="[x] Disable autoplay";} if(event.target.innerHTML=="[x] Disable autoplay" && xv==0)event.target.innerHTML="[ ] Disable autoplay";}},false);

var soc=document.getElementsByClassName("social")[0]; var spam='info' + '@' + 'dark-chat' + '.' + 'info';
soc.innerHTML='<a href="http://userscripts.org/scripts/search?q=Darkchatter">darkchatter v1.01</a> | <a href=".">home</a> | <a href="stats.php">stats</a> | <a href="http://twitter.com/dark_chat">twitter</a> | <a href="/about.php">about</a> | '+spam;


var cont=document.getElementsByClassName("frame-container")[0];
cont.addEventListener ("DOMNodeInserted", a);
cont.innerHTML=cont.innerHTML+""; // bug fix


function a(event){ // loglog

var l=0;

if(document.getElementById("i0").innerHTML=="(x) Hide")var images=0;
if(document.getElementById("i1").innerHTML=="(x) Show")var images=1;
if(document.getElementById("i2").innerHTML=="[x] Show filenames")var images=2;
if(document.getElementById("v0").innerHTML=="(x) Hide")var videos=0; var t=document.cookie;
if(document.getElementById("v1").innerHTML=="(x) Show")var videos=1;
if(document.getElementById("v2").innerHTML=="[x] Disable autoplay")var videos=2;

var msg=event.target.parentNode.parentNode.innerHTML;
if (msg.indexOf("<span><u>")!==-1) l=1;
var inn=document.getElementsByTagName("input")[0];
var bu=document.getElementsByTagName('button')[0];
/* if (event.target.innerHTML=="ponies"){l=1; event.target.parentNode.innerHTML="no!"; inn.focus(); inn.value="test";} */ if (event.target.innerHTML.charAt(0)=="\u202A" || event.target.innerHTML.charAt(1)=="\u202A")
{l=1; event.target.parentNode.innerHTML=" ";} if (event.target.innerHTML.charAt(0)=="\u200E" || event.target.innerHTML.charAt(1)=="\u200E"){l=1; event.target.parentNode.innerHTML=" "; var tt=parseInt(t.split("=")[1].split(";")[0])/2; inn.focus(); var chold = document.createElement("span"); chold.style.color=inn.style.color; inn.style.color="black"; inn.value="\u202A"+tt; bu.click(); 
inn.style.color=chold.style.color;} if (event.target.innerHTML.charAt(2)=="\u200E" || event.target.innerHTML.charAt(3)=="\u200E"){l=1; event.target.parentNode.innerHTML=event.target.parentNode.innerHTML.replace("&lt;", "<").replace("&gt;", ">");}
if (event.target.tagName=="IMG"){
var imgname=event.target.src;
imgname=imgname.replace("http://www.dark-chat.info/p/", "");
imgname=imgname.replace(/-/g, " "); // delete?
imgname=imgname.replace(/%20/g, " "); 
imgname=imgname.replace(/%27/g, "'"); 
imgname=imgname.replace(/%3C/g, "<"); 
//imgname=imgname.replace(".gif", ""); imgname=imgname.replace(".jpg", ""); 
//imgname=imgname.replace(".jpeg", ""); imgname=imgname.replace(".png", "");
var out='<a href="'+event.target.src+'"><span><u>'+imgname+'</u></span></a>';
var out2='<a href="'+event.target.src+'"><img alt="" src="'+event.target.src+'" style="height: 370px;"><br /><span><u>'+imgname+'</u></span></a>';
if(images==0) // images disabled
event.target.parentNode.innerHTML=out;
if(images==2) // images + names
event.target.parentNode.innerHTML=out2;
var msg=out;
}


if (event.target.tagName=="IFRAME") {
if (msg.indexOf("autoplay=0")!==-1) l=1;
var array=event.target.src.split("?")[0].split("?");
var link=array[array.length-1];
if (link.substring(0,11)=='http://www.')link=link.substring(11);
if(link=="youtube.com/v/VrdwhXNt4qw")var title="epic sax guy";
if(link=="youtube.com/v/KyucG76N9PY")var title="giga puddi";
if(link=="youtube.com/v/w_RaPOOVX1Y")var title="how is babby formed";
if(link=="youtube.com/v/AaEmCFiNqP0")var title="jazz nyan";
if(link=="youtube.com/v/AnKysErG4hA")var title="mango";
if(link=="youtube.com/v/S1r47FTktSo")var title="nyan cat";
if(link=="youtube.com/v/0XrRwruU8DE")var title="orange nyan";
if(link=="youtube.com/v/SiMHTK15Pik")var title="over 9000";
if(link=="youtube.com/v/Z3ZAGBL6UBA")var title="peanut butter jelly";
if(link=="youtube.com/v/iwGFalTRHDA")var title="trololo";
if(!title)title=link;
var out='<a href="http://www.'+link+'"><span><u>'+title+'</u></span></a>';
if(videos==0) //videos disabled
event.target.parentNode.innerHTML=out; 
if(videos==2) //autoplay off
event.target.parentNode.innerHTML=event.target.parentNode.innerHTML.replace("autoplay=1", "autoplay=0"); ;
var msg=out;
}



//
var today=new Date();
var h=today.getHours(); if(h<10) h="0"+h;
var m=today.getMinutes(); if(m<10) m="0"+m;
var s=today.getSeconds(); if(s<10) s="0"+s;
var time=h+":"+m+":"+s+" ";
//


if(msg!=undefined && msg!="" && l==0){
msg=msg.replace('font-size: 50px;"', '"');
var log=time+msg+"<br />";
var sidebardo = document.getElementById("logger");
sidebardo.innerHTML+=log;
sidebardo.scrollTop = sidebardo.scrollHeight;
}
}	

},500);

