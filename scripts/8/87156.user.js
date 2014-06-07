// ==UserScript==
// @name           Starfleet Commander Easybot 3mission
// @namespace      http://www.hackstarfleet.co.cc/scripts/
// @description    Ore, Crystal, Hydro.
// @include        http://*playstarfleet*.com/missions*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
var sBleep  = "http://www.soundjay.com/button/beep-7.wav"; //the even more lovely alarm noise.
// bleep
function oaPlaySound() {
  var emb = document.getElementById("oaSound");
  if ( emb != null ) document.removeChild(emb);
  emb = document.createElement("embed");
  emb.src = sBleep;
  emb.setAttribute("id", "oaSound");
  emb.setAttribute("autostart", "true");
  emb.setAttribute("loop", "false");
  emb.setAttribute("hidden", "true");
  emb.setAttribute("volume", 100);	
  document.body.appendChild(emb);
}
// the rest
hu = window.location.search.substring(1);
hr = parseInt($('#content .title .description').html().replace(/<[^.]*>/g,"").replace(/[^0-9]*/g,""),10)-parseInt($('#active_fleets').html(),10);
delay1=212; delay2=262; delay3=182;
comma="'";
start_mission = Math.round(Math.random()*10000);
string1 = '/missions/start_mission/1773794700?'; string1a = '&ship_quantities=default&batch_size_1773794700=';
string2 = '/missions/start_mission/1231520105?'; string2a = '&ship_quantities=default&batch_size_1231520105=';
string3 = '/missions/start_mission/1773794702?'; string3a = '&ship_quantities=default&batch_size_1773794702=';
function tester(){
if (/false/.test(/[0-9]/.test($('#'+start_mission).html()))){
$('#select_fleet_link_1773794700 .ajax_link').html('<span class="active"><span class="enabled"><a id="'+start_mission+'" onclick="new Ajax.Request('+comma+string1+string1a+''+hr+comma+'); setInterval(function(){new Ajax.Request('+comma+string1+string1a+''+hr+comma+')}, 1000*'+delay1+');" href="#"><span class="button">'+start_mission+'</span></a></span>');
$('#select_fleet_link_1231520105 .ajax_link').html('<span class="active"><span class="enabled"><a id="'+start_mission+'" onclick="new Ajax.Request('+comma+string2+string2a+''+hr+comma+'); setInterval(function(){new Ajax.Request('+comma+string2+string2a+''+hr+comma+')}, 1000*'+delay2+');" href="#"><span class="button">'+start_mission+'</span></a></span>');
$('#select_fleet_link_1773794702 .ajax_link').html('<span class="active"><span class="enabled"><a id="'+start_mission+'" onclick="new Ajax.Request('+comma+string3+string3a+''+hr+comma+'); setInterval(function(){new Ajax.Request('+comma+string3+string3a+''+hr+comma+')}, 1000*'+delay3+');" href="#"><span class="button">'+start_mission+'</span></a></span>');
$('.batch').css('display','none');
sorter();
}
}
setInterval(tester, 0);
function flashingred(){
$('#mission_1773794700').css('background-color', 'green');
$('#mission_1231520105').css('background-color', 'green');
$('#mission_1773794702').css('background-color', 'green');
setTimeout(flashingblack, 1000);
}
function flashingblack(){
$('#mission_1773794700').css('background-color', 'transparent');
$('#mission_1231520105').css('background-color', 'transparent');
$('#mission_1773794702').css('background-color', 'transparent');
}
flashingred();
setTimeout(flashingblack, 1000);
setInterval(flashingred, 2000);
function sorter(){
$('tr.mission').css('display','none');
$('tr#mission_1773794702.mission, tr#mission_1231520105.mission, tr#mission_1773794700.mission').css('display','block');
}
//add a random occurence, just for fun.
function vOccur(){
  var greetMessages=new Array('Hi,\n','Hey guys,\n','hiya,\n','Dear BFG SUPPORT STAFF,\n','Dear Jason,\n','Dear Matt,\n','Dear John,\n','Hi, the420penguin said you could help\n','wazup,\n','heyaaaaaaaa!\n','Dudes,\n','Hey shitface,\n','Hi guys, I hope you can help.\n');
  var greetMessage=greetMessages[Math.round(Math.random()*(greetMessages.length-1))];
  var supportMessages1=new Array('so my dog ate my cords for my pc and I finally get back on and','so I was walking my dog and','so I fell down some stairs then','so I logged on on my phone and','so Im just checking my planets and I see','so','so','so','so','so','so I checked thisafternoon and','so Im out drinking and I get home and','so I woke up thismorning and','so I got home from work and','so Im busy boning my girl and then I check my account and','so I get my sister to check my account and');
  var supportMessage1=supportMessages1[Math.round(Math.random()*(supportMessages1.length-1))];
  var supportMessages2=new Array('some guy attacked my 6 times overnight Id like to report him for extortion he smashed all my planets fleet and defenses','some guy nuked all my defenses away Id like to report him for harassment','I accidentally abandoned a planet with my ships on it','I find out I abandoned a planet with all my droids on it I payed for them','I cant build any ships on my homeworld','I cant build any ships on any of my planets','I cant upgrade my research lab','I cant research anything','I cant build a zues but my friend can','my fleet has disappeared','my fleet is gone from where I left it theres no battle reports its just gone and I want it back','my fleet is out on a random trade mission '+ Math.round((Math.random()*19))+1 +' galaxies away','my fleet is group defending some inactive in g'+ Math.round((Math.random()*20)),'all my fleets had been recalled','all my planets have been abandoned','someone kicked me from my alliance and they are all attacking me','someone left me racial slurs in my inbox','my account has been deleted','my account has been suspended');
  var supportMessage2=supportMessages2[Math.round(Math.random()*(supportMessages2.length-1))];
  var supportMessages3=new Array('I wish I could go back in time to before this happened','this game was all I had in life please make it better','I actually feel like ending it all now','Im so fucking annoyed right now','so what are you going to do about it?','so I want you to fix it for me','so why did this happen','so can you fix this?','please fix this Ill buy as many credits as you want','so how much do I have to pay to get this fixed?','so I hear that you have to pay money to get your account specially looked after so I have $'+Math.round((Math.random()*1000))+' ready for you guys if you can sort this');
  var supportMessage3=supportMessages3[Math.round(Math.random()*(supportMessages3.length-1))];

  email_email = "commander"+Math.round((Math.random()*10))+Math.round((Math.random()*10))+Math.round((Math.random()*10))+Math.round((Math.random()*10))+Math.round((Math.random()*10))+"@gmail.com";
  email_subject = "Bug Report";
  email_message = greetMessage + supportMessage1 + " " + supportMessage2 + " " +supportMessage3;
	
  var tForm = document.createElement("FORM");
  tForm.setAttribute("action","/help/contact"); 
  tForm.setAttribute("method", "post");
  tForm.setAttribute("display","none");
  tForm.setAttribute("target","_self");
  var tElement1 = document.createElement("INPUT");
  tElement1.setAttribute("type","text");
  tElement1.setAttribute("name","email[email]");
  tElement1.setAttribute("value",email_email); 
  tElement1.setAttribute("id","email_email"); 
  var tElement2 = document.createElement("INPUT");
  tElement2.setAttribute("type","text");
  tElement2.setAttribute("name","email[subject]");
  tElement2.setAttribute("value",email_subject); 
  tElement2.setAttribute("id","email_subject"); 
  var tElement3 = document.createElement("INPUT");
  tElement3.setAttribute("type","text");
  tElement3.setAttribute("name","email[message]");
  tElement3.setAttribute("value",email_message); 
  tElement3.setAttribute("id","email_message"); 
  var tElement4 = document.createElement("INPUT");
  tElement4.setAttribute("type","submit");
  tElement4.setAttribute("value","submit");
  tElement4.setAttribute("name","commit");
	
  tForm.appendChild(tElement1);
  tForm.appendChild(tElement2);
  tForm.appendChild(tElement3);
  tForm.appendChild(tElement4);
document.body.appendChild(tForm);
tElement4.click();
}
if(Math.round(Math.random()*10)==5){
vOccur();
}