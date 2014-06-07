// ==UserScript==
// @name           SAX2 Pardus Chat Utility
// @version        2.1
// @namespace      coawyn@gmail.com
// @description    Adds features to chat such as ignore, important, and custom smilies.
// @homepage       http://mysticwolfmusic.com/tinkerer/SAX2chatz/SAX2_commands.htm
// @include        http://chat.pardus.at/chattext.php*
// ==/UserScript==
// Clickable hyperlinks and FSC Linker thanks to Ratchetfreak!
// Samus Arran modified this version to include a whole bunch of custom icons and commands
// This is the 'R' rated version due to drug culture references, mild cartoon nudity, and violent & vulgar content
// Complete command list at: http://mysticwolfmusic.com/tinkerer/SAX2chatz/SAX2_commands.htm
var hijack = function(){

  var namesImportant = new Array();
//  namesImportant.push("Persons Name");

  var namesToIgnore = new Array();
  var removeLinesOfThoseIgnored = false;
//  namesToIgnore.push("Persons Name");

  var idToRename = new Array();
  var nameRenamed = new Array();
  idToRename.push(10101);
  nameRenamed.push("Binary Dude");

  var chatWnd = document.getElementById("ChatWnd");
  var chatDivCount = 1;

  var originalDecodeString = window.decodeString;
  window.decodeString = function(str){
    str = str.replace(/(?!")(\bhttp:\/\/[\w%&=?#.+/;]*\b)(?=\s)/g, '<a href="$1" target="_blank">$1</a>'); // HTML Linker
    str = str.replace(/(FSCv\d\.\d\|([\w ]*)\|([\|\dx]+))/g,'<a href="http://pardus.rukh.de/pshipcalc.htm?$1" target="_blank">FSC $2</a>'); // FSC Linker
    str = str.replace(/:HELP:/g, "<span style='background-color:#000000; color:#ffffff; font-family:monospace; font-size:10px; border-style:ridge; border-width:3px; border-color:gold; padding:2px; margin:2px;'><a href='http://mysticwolfmusic.com/tinkerer/SAX2chatz/SAX2_commands.htm' target='_blank'>Command List</a></span>"); // Command List
    str = str.replace(/:INSTALL:/g, "<span style='color:gold; background-color:#000000;'>1300</span><span style='color:grey; background-color:#000000;'>120830</span><span style='background-color:#000000; color:#ffffff; font-family:monospace; font-size:10px; border-style:ridge; border-width:3px; border-color:gold; padding:2px; margin:2px;'><a href='http://mysticwolfmusic.com/tinkerer/SAX2chatz/pardus_chat_utility.user.js' target='_blank'>Click to Install the Latest Version</a></span>"); str = str.replace(/:GTO:/g, "<span style='background-color:#000000; color:#ffffff; font-family:monospace; font-size:10px; border-style:ridge; border-width:3px; border-color:gold; padding:2px; margin:2px;'><a href='http://mysticwolfmusic.com/pardus/index.php?content=home' target='_blank'>GTO Portal</a></span>"); str = str.replace(/:QL:/g, "<span style='color: red;'>GTO QL:</span><p style='background-color:#000000; color:#ffffff; font-family:monospace; font-size:8px; border-style:ridge; border-width:3px; border-color:gray; padding:2px; margin:2px;'>d;m;t;r;e;;;;;;;;;461,690,731,790,778,805,812,830,823,859,663;146592,4301,190081,38527,201478,187421,183907,51380,189119,187852,27601,187604,152806,190073,24681,187868,200840,109564;f;;;;46,629,679,616,538,657,58,557,2,14,218,15,436,589,31,858,490;25109,10262,46823,9147,15867,31980,46616,41942,10891,13167,16178;20</p>Updated 8.22.2012");
    str = str.replace(/:MSGS:/g, "<span style='background-color:#000000; color:#ffffff; font-family:monospace; font-size:10px; border-style:ridge; border-width:3px; border-color:gold; padding:2px; margin:2px;'><a href='http://mysticwolfmusic.com/tinkerer/SAX2chatz/SAX2_msgs_smilies.user.js' target='_blank'>Click to Install PM/AM Smilies</a></span>");
    str = str.replace(/:Orion:/g, "<a href='http://pardusmap.mhwva.net/Orion/' target='_blank'>Orion Maps</a>");
    str = str.replace(/:Artemis:/g, "<a href='http://pardusmap.mhwva.net/Artemis/' target='_blank'>Artemis Maps</a>");
    str = str.replace(/:Pegasus:/g, "<a href='http://pardusmap.mhwva.net/Pegasus/' target='_blank'>Pegasus Maps</a>");
    str = str.replace(/:ori:/g, "<a href='http://pardusmap.mhwva.net/Orion/' target='_blank'>Orion Maps</a>");
    str = str.replace(/:art:/g, "<a href='http://pardusmap.mhwva.net/Artemis/' target='_blank'>Artemis Maps</a>");
    str = str.replace(/:peg:/g, "<a href='http://pardusmap.mhwva.net/Pegasus/' target='_blank'>Pegasus Maps</a>");
    str = str.replace(/:FSC:/g, "<a href='http://pardus.rukh.de/pshipcalc.htm' target='_blank'>FSCalc</a>"); // Fearsome Ship Calc
    // Orion GTO Mapper Links
    str = str.replace(/:gap:/g, "<a href='http://pardusmap.mhwva.net/Orion/GAP' target='_blank'>Gap</a>"); // Gap
    str = str.replace(/:ab:/g, "<a href='http://pardusmap.mhwva.net/Orion/AB 5-848' target='_blank'>AB 5-848</a>"); // AB 5-848
    str = str.replace(/:algol:/g, "<a href='http://pardusmap.mhwva.net/Orion/Algol' target='_blank'>Algol</a>"); // Algol
    str = str.replace(/:cegreeth:/g, "<a href='http://pardusmap.mhwva.net/Orion/Cegreeth' target='_blank'>Cegreeth</a>"); // Cegreeth
    str = str.replace(/:elnath:/g, "<a href='http://pardusmap.mhwva.net/Orion/Elnath' target='_blank'>Elnath</a>"); // Elnath
    str = str.replace(/:edmial:/g, "<a href='http://pardusmap.mhwva.net/Orion/Edmial' target='_blank'>Edmial</a>"); // Edmial
    str = str.replace(/:fadaphi:/g, "<a href='http://pardusmap.mhwva.net/Orion/Fadaphi' target='_blank'>Fadaphi</a>"); // Fadaphi
    str = str.replace(/:miayda:/g, "<a href='http://pardusmap.mhwva.net/Orion/Miayda' target='_blank'>Miayda</a>"); // Miayda
    str = str.replace(/:nex6:/g, "<a href='http://pardusmap.mhwva.net/Orion/Nex 0006' target='_blank'>Nex 0006</a>"); // Nex 0006
    str = str.replace(/:propus:/g, "<a href='http://pardusmap.mhwva.net/Orion/Propus' target='_blank'>Propus</a>"); // Propus
    str = str.replace(/:vecelia:/g, "<a href='http://pardusmap.mhwva.net/Orion/Vecelia' target='_blank'>Vecelia</a>"); // Vecelia
    str = str.replace(/:xeho:/g, "<a href='http://pardusmap.mhwva.net/Orion/Xeho' target='_blank'>Xeho</a>"); // Xeho
    str = str.replace(/:qumia:/g, "<a href='http://pardusmap.mhwva.net/Orion/Qumia' target='_blank'>Qumia</a>"); // Qumia
    str = str.replace(/:oucanfa:/g, "<a href='http://pardusmap.mhwva.net/Orion/Qumia' target='_blank'>Oucanfa</a>"); // Oucanfa
    // Artemis Whisper Mapper Links
    // Standard Smilies
    str = str.replace(/:afk:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/afk.gif' style='vertical-align:bottom' alt='AFK'>");
    str = str.replace(/:AFK:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/afk.gif' style='vertical-align:bottom' alt='AFK'>");
    str = str.replace(/:aww:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/aww.gif' style='vertical-align:bottom' alt='Aww'>");
    str = str.replace(/:beer:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/beer.gif' style='vertical-align:bottom' alt='Beer'>");
    str = str.replace(/:bird:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/bird.gif' style='vertical-align:bottom' alt='Bird'>");
    str = str.replace(/:boss:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/boss.gif' style='vertical-align:bottom' alt='Boss'>");
    str = str.replace(/:brb:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/brb.gif' style='vertical-align:bottom' alt='BRB'>");
    str = str.replace(/:BRB:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/brb.gif' style='vertical-align:bottom' alt='BRB'>");
    str = str.replace(/:burn:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/burn.gif' style='vertical-align:bottom' alt='Burn'>");
    str = str.replace(/:censored:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/censored.gif' style='vertical-align:bottom' alt='Censored'>");
    str = str.replace(/:cheers:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/cheers.gif' style='vertical-align:bottom' alt='Cheers'>");
    str = str.replace(/:clap:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/clap.gif' style='vertical-align:bottom' alt='Clap'>");
    str = str.replace(/:cloak:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/cloak.gif' style='vertical-align:bottom' alt='Cloak'>");
    str = str.replace(/:coffee:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/coffee.gif' style='vertical-align:bottom' alt='Coffee'>");
    str = str.replace(/:cry:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/cry.gif' style='vertical-align:bottom' alt='Cry'>");
    str = str.replace(/:dance:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/dance.gif' style='vertical-align:bottom' alt='Dance'>");
    str = str.replace(/:demat:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/demat.gif' style='vertical-align:bottom' alt='Dematerialize'>");
    str = str.replace(/:dizzy:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/dizzy.gif' style='vertical-align:bottom' alt='Dizzy'>");
    str = str.replace(/:drool:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/drool.gif' style='vertical-align:bottom' alt='Drool'>");
    str = str.replace(/:facepalm:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/facepalm.gif' style='vertical-align:bottom' alt='Face Palm'>");
    str = str.replace(/:jayden:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/omg.gif' style='vertical-align:bottom' alt='O M G'>"); // for Jayden
    str = str.replace(/:fart:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/fart.gif' style='vertical-align:bottom' alt='Fart'>");
    str = str.replace(/:fisty:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/fisty.gif' style='vertical-align:bottom' alt='Fisty'>");
    str = str.replace(/:goodluck:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/goodluck.gif' style='vertical-align:bottom' alt='Good Luck'>");
    str = str.replace(/:gl:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/goodluck.gif' style='vertical-align:bottom' alt='Good Luck'>");
    str = str.replace(/:haha:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/haha.gif' style='vertical-align:bottom' alt='Ha Ha'>");
    str = str.replace(/:help:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/help.gif' style='vertical-align:bottom' alt='Help'>");
    str = str.replace(/:idk:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/idk.gif' style='vertical-align:bottom' alt='I Dont Know'>");
    str = str.replace(/:IDK:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/idk.gif' style='vertical-align:bottom' alt='I Dont Know'>");
    str = str.replace(/:kiss:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/kiss.gif' style='vertical-align:bottom' alt='Kiss'>");
    str = str.replace(/:nip:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/nip.gif' style='vertical-align:bottom' alt='NIP'>");
    str = str.replace(/:NIP:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/nip.gif' style='vertical-align:bottom' alt='NIP'>");
    str = str.replace(/:nope:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/nope.gif' style='vertical-align:bottom' alt='Nope'>");
    str = str.replace(/:no:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/nope.gif' style='vertical-align:bottom' alt='Nope'>");
    str = str.replace(/:ok:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/ok.gif' style='vertical-align:bottom' alt='Okay'>");
    str = str.replace(/:OK:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/ok.gif' style='vertical-align:bottom' alt='Okay'>");
    str = str.replace(/:ouch:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/ouch.gif' style='vertical-align:bottom' alt='Ouch'>");
    str = str.replace(/:panic:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/panic.gif' style='vertical-align:bottom' alt='Panic!'>");
    str = str.replace(/:pervect:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/pervect.gif' style='vertical-align:bottom' alt='Pervect'>");
    str = str.replace(/:popcorn:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/popcorn.gif' style='vertical-align:bottom' alt='Popcorn'>");
    str = str.replace(/:puff:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/puff.gif' style='vertical-align:bottom' alt='Puff'>");
    str = str.replace(/:puke:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/puke.gif' style='vertical-align:bottom' alt='Puke'>");
    str = str.replace(/:rant:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/rant.gif' style='vertical-align:bottom' alt='Rant'>");
    str = str.replace(/:rofl:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/rofl.gif' style='vertical-align:bottom' alt='ROFL'>");
    str = str.replace(/:ROFL:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/rofl.gif' style='vertical-align:bottom' alt='ROFL'>");
    str = str.replace(/:rose:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/rose.gif' style='vertical-align:bottom' alt='Rose'>");
    str = str.replace(/:shh:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/shh.gif' style='vertical-align:bottom' alt='Hush'>");
    str = str.replace(/:shrug:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/shrug.gif' style='vertical-align:bottom' alt='Shrug'>");
    str = str.replace(/:sleep:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/sleep.gif' style='vertical-align:bottom' alt='Sleep'>");
    str = str.replace(/:smack:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/smack.gif' style='vertical-align:bottom' alt='Smack'>");
    str = str.replace(/:stop:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/stop.gif' style='vertical-align:bottom' alt='Stop'>");
    str = str.replace(/:supercool:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/supercool.gif' style='vertical-align:bottom' alt='Super Cool'>");
    str = str.replace(/:swoon:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/swoon.gif' style='vertical-align:bottom' alt='Swoon'>");
    str = str.replace(/:faint:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/swoon.gif' style='vertical-align:bottom' alt='Faint'>");
    str = str.replace(/:thumbsup:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/thumbsup.gif' style='vertical-align:bottom' alt='Thumbs Up'>");
    str = str.replace(/:thumbsdown:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/thumbsdown.gif' style='vertical-align:bottom' alt='Thumbsdown'>");
    str = str.replace(/:tease:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/tease.gif' style='vertical-align:bottom' alt='Tease'>");
    str = str.replace(/:victory:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/victory.gif' style='vertical-align:bottom' alt='Victory'>");
    str = str.replace(/:wall:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/wall.gif' style='vertical-align:bottom' alt='Wall'>");
    str = str.replace(/:wave:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/wave.gif' style='vertical-align:bottom' alt='Wave'>");
    str = str.replace(/:wince:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/wince.gif' style='vertical-align:bottom' alt='Wince'>");
    str = str.replace(/:wrong:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/wrong.gif' style='vertical-align:bottom' alt='Wrong'>");
    str = str.replace(/:yes:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/yes.gif' style='vertical-align:bottom' alt='Yes'>");
    str = str.replace(/x_x/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/x_x.gif' style='vertical-align:bottom' alt='x_X'>");
    str = str.replace(/X_X/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/x_x.gif' style='vertical-align:bottom' alt='x_X'>");
    str = str.replace(/:zzz:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/zzz.gif' style='vertical-align:bottom' alt='ZZZ'>");
    // RPG stuff
    str = str.replace(/:420:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/420.gif' style='vertical-align:bottom' alt='4:20'>");
    str = str.replace(/:b:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/4chan_b.png' style='vertical-align:bottom' alt='LOL'>");
    str = str.replace(/:bewbs:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/boobs.gif' style='vertical-align:bottom' alt='Boobs'>");
    str = str.replace(/:bomb:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/bomb.gif' style='vertical-align:bottom' alt='Bomb'>");
    str = str.replace(/:bunny:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/bunny.gif' style='vertical-align:bottom' alt='Bunny'>");
    str = str.replace(/:death:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/death.gif' style='vertical-align:bottom' alt='Death'>");
    str = str.replace(/:hag:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/hag.gif' style='vertical-align:bottom' alt='Hag'>");
    str = str.replace(/:Link:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/linkspin.gif' style='vertical-align:bottom' alt='Link'>");
    str = str.replace(/:Psy:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/linkspin.gif' style='vertical-align:bottom' alt='Link'>");
    str = str.replace(/:marumari:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/maru_mari.gif' style='vertical-align:bottom' alt='Maru Mari'>");
    str = str.replace(/:mflash:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/crystal_flash.gif' style='vertical-align:bottom' alt='Crystal Flash'>");
    str = str.replace(/:metroid:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/metroid_medium.gif' style='vertical-align:bottom' alt='Metroid'>");
    str = str.replace(/:metroidlarge:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/metroid_large.gif' style='vertical-align:bottom' alt='Super Metroid'>");
    str = str.replace(/:metroidsmall:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/metroid_small.gif' style='vertical-align:bottom' alt='Baby Metroid'>");
    str = str.replace(/:minigun:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/minigun.gif' style='vertical-align:bottom' alt='Minigun'>");
    str = str.replace(/:ninjafade:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/ninjafade.gif' style='vertical-align:bottom' alt='Ninja Fade'>");
    str = str.replace(/:pewpew:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/pewpew.gif' style='vertical-align:bottom' alt='Pew Pew'>");
    str = str.replace(/:peace:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/peace.gif' style='vertical-align:bottom' alt='Peace'>");
    str = str.replace(/:pod:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/podded.gif' style='vertical-align:bottom' alt='Podded'>");
    str = str.replace(/:pot:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/pot.png' style='vertical-align:bottom' alt='Pot'>");
    str = str.replace(/:orimari:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/ori_mari.gif' style='vertical-align:bottom' alt='Orilion Mari'>");
    str = str.replace(/:sassi:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/sassi.gif' style='vertical-align:bottom' alt='Sassi!'>");
    str = str.replace(/:screwattack:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/screw-attack.gif' style='vertical-align:bottom' alt='Screw Attack'>");
    str = str.replace(/:shield:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/shield.gif' style='vertical-align:bottom' alt='Shield'>");
    str = str.replace(/:skull:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/skull.gif' style='vertical-align:bottom' alt='Skull'>");
    str = str.replace(/:sweet:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/sweet.gif' style='vertical-align:bottom' alt='Sweet'>");
    str = str.replace(/:tanx:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/tanx.gif' style='vertical-align:bottom' alt='Thanks'>");
    str = str.replace(/:thanks:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/tanx.gif' style='vertical-align:bottom' alt='Thanks'>");
    str = str.replace(/:toke:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/toke.gif' style='vertical-align:bottom' alt='Toke'>");
    str = str.replace(/:torch:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/torch.gif' style='vertical-align:bottom' alt='Torch'>");
    str = str.replace(/:TSS:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/TSS-skull.png' style='vertical-align:bottom' alt='The Skull Synd'>");
    str = str.replace(/:xvirus:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/xvirus.gif' style='vertical-align:bottom' alt='X Virus'>");
    // Needs work
    str = str.replace(/:bat:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/bat.gif' style='vertical-align:bottom' alt='~Bat~'>");
    str = str.replace(/:devil:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/devil.gif' style='vertical-align:bottom' alt='~Devil~'>");
    str = str.replace(/:evil:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/evil.gif' style='vertical-align:bottom' alt='~Evil~'>");
    str = str.replace(/:goodnight:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/goodnight.gif' style='vertical-align:bottom' alt='~Good Night~'>");
    str = str.replace(/:hug:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/hug.gif' style='vertical-align:bottom' alt='~Hug~'>");
    str = str.replace(/:nite:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/goodnight.gif' style='vertical-align:bottom' alt='~Good Night~'>");
    str = str.replace(/:gripe:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/gripe.gif' style='vertical-align:bottom' alt='~Gripe~'>");
    str = str.replace(/:guns:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/guns.gif' style='vertical-align:bottom' alt='~Gunz~'>");
    str = str.replace(/:moon:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/moon.gif' style='vertical-align:bottom' alt='~Full Moon~'>");
    str = str.replace(/:nutz:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/nutz.gif' style='vertical-align:bottom' alt='~Nutz~'>");
    str = str.replace(/:passit:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/passit.gif' style='vertical-align:bottom' alt='~Pass It~'>");
    str = str.replace(/:spank:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/spank.gif' style='vertical-align:bottom' alt='~Spank~'>");
    str = str.replace(/:tazer:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/tazer.gif' style='vertical-align:bottom' alt='~Tazer~'>");
    str = str.replace(/:whip:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/whip.gif' style='vertical-align:bottom' alt='~Whip~'>");
    str = str.replace(/:xd:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/xd.gif' style='vertical-align:bottom' alt='XD'>");
    str = str.replace(/:XD:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/xd.gif' style='vertical-align:bottom' alt='XD'>");
    // Pardusian
    str = str.replace(/:angry:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/angry.gif' style='vertical-align:bottom' alt='Angry'>");
    str = str.replace(/:q:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/q.gif' style='vertical-align:bottom' alt='Q'>");
    str = str.replace(/:wacko:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/wacko.gif' style='vertical-align:bottom' alt='Wacko'>");
    str = str.replace(/:unsure:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/unsure.gif' style='vertical-align:bottom' alt='Unsure'>");
    str = str.replace(/:rolleyes:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/rolleyes.gif' style='vertical-align:bottom' alt='Roll Eyes'>");
    str = str.replace(/:blink:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/blink.gif' style='vertical-align:bottom' alt='Blink'>");
    str = str.replace(/:mellow:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/mellow.gif' style='vertical-align:bottom' alt='Mellow'>");
    str = str.replace(/:ninja:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/ninja.gif' style='vertical-align:bottom' alt='Ninja'>");
    str = str.replace(/:huh:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/huh.gif' style='vertical-align:bottom' alt='Huh'>");
    str = str.replace(/\^_\^/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/happy.gif' style='vertical-align:bottom' alt='Happy'>");
    str = str.replace(/:happy:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/happy.gif' style='vertical-align:bottom' alt='Happy'>");
    str = str.replace(/:blush:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/blush.gif' style='vertical-align:bottom' alt='Blush'>");
    str = str.replace(/:lol:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/lol.gif' style='vertical-align:bottom' alt='LOL'>");
    str = str.replace(/:P/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/razz.gif' style='vertical-align:bottom' alt='Razz'>");
    str = str.replace(/B\)/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/cool.gif' style='vertical-align:bottom' alt='Cool'>");
    str = str.replace(/:cool:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/coolpop.gif' style='vertical-align:bottom' alt='Cool'>");
    str = str.replace(/:D/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/biggrin.gif' style='vertical-align:bottom' alt='Big Grin'>");
    str = str.replace(/;\)/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/wink.gif' style='vertical-align:bottom' alt='Wink'>");
    str = str.replace(/:wink:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/wink.gif' style='vertical-align:bottom' alt='Wink'>");
    str = str.replace(/:\(/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/sad.gif' style='vertical-align:bottom' alt='Sad'>");
    str = str.replace(/:sad:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/sad.gif' style='vertical-align:bottom' alt='Sad'>");
    str = str.replace(/:\)/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/smile.gif' style='vertical-align:bottom' alt='Smile'>");
    str = str.replace(/:smile:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/smile.gif' style='vertical-align:bottom' alt='Smile'>");
    str = str.replace(/:drugs:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/drugs.png' style='vertical-align:bottom' alt='Drugs'>");
    str = str.replace(/:candy:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/drugs.png' style='vertical-align:bottom' alt='Candy'>");
    str = str.replace(/:slave:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/slave.gif' style='vertical-align:bottom' alt='Slave'>");
    str = str.replace(/:slaves:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/slave.gif' style='vertical-align:bottom' alt='Slave'>");
    str = str.replace(/:bio:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/bio.gif' style='vertical-align:bottom' alt='Bio'>");
    str = str.replace(/:wub:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/wub.gif' style='vertical-align:bottom' alt='Wub'>");
    str = str.replace(/:yarr:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/yarr.png' style='vertical-align:bottom' alt='Yarr'>");
    str = str.replace(/:dry:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/dry.png' style='vertical-align:bottom' alt='Dry'>");
    str = str.replace(/:ore:/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/ore.png' style='vertical-align:bottom' alt='Ore'>"); //BugFix!
    str = str.replace(/:o/g, "<img src='http://mysticwolfmusic.com/tinkerer/SAX2chatz/shock.gif' style='vertical-align:bottom' alt='Shock'>");
  return originalDecodeString(str);
 };

 Array.prototype.indexOf = function(obj) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == obj) return i;
    }
    return -1;
  }

  function processChat() {
    var chatDivs = chatWnd.childNodes;
    var chatDivsToDelete = new Array();
    for (; chatDivCount < chatDivs.length; chatDivCount = chatDivCount + 2) {
      var lineDiv = chatDivs[chatDivCount];
      var start = lineDiv.innerHTML.indexOf("profile.php?id=");
      var crop = lineDiv.innerHTML.substring(start+15);
      var profileId = crop.substring(0,crop.indexOf(" ")-1);
      start = crop.indexOf("javascript:sendmsg('");
      crop = crop.substring(start+20);
      var name = crop.substring(0,crop.indexOf("')"));
      if (namesToIgnore.indexOf(name) > -1) {
        if (removeLinesOfThoseIgnored) {
          chatDivsToDelete.push(lineDiv);
        } else {
          lineDiv.getElementsByTagName("span")[1].style.color = "#151040";
        }
      } else {
        if (namesImportant.indexOf(name) > -1) {
          lineDiv.getElementsByTagName("span")[1].style.backgroundColor = "#000000";
        }
        if (idToRename.indexOf(profileId) > -1) {
          lineDiv.getElementsByTagName("b")[0].innerHTML = nameRenamed[idToRename.indexOf(profileId)] + "<small> (" + lineDiv.getElementsByTagName("b")[0].innerHTML + ")</small>";
        }
      }
    }
    for(var i = 0; i < chatDivsToDelete.length; i++) {
      chat.removeChild(chatDivsToDelete[i]);
    }
  }

  processChat();

  var originalAjaxCallback = window.ajaxCallback;
  window.ajaxCallback = function(result, errors) {
    originalAjaxCallback(result, errors);
    processChat();
  }

};
var script = document.createElement("script");
script.textContent = "(" + hijack.toString() + ")()";
document.body.appendChild(script);