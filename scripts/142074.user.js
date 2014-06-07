// ==UserScript==
// @name       T-I Ratio Proofer
// @namespace  http://www.torrent-invites.com/bittorrent-discussion/208843-aegan1s-ratio-proof-creator.html
// @version    0.56
// @description  For certain private tracker websites, it hides info with the click of a button. To create a ratio proof, all you have to do is take a screenshot and save! No editing required! That being said, make sure to double check your screenshots regardless, before submitting them, incase this script malfunctions or is outdated. Press the "H" key (don't press shift) to toggle.
// @match      http://*
// @match      https://*
// @copyright  2012+, Aegan1
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// ==/UserScript==
var tracker_urls = ["127.0.0.1","acetorrents.net","acid-lounge.org.uk","adult-cinema-network.net","all4nothin.net","allotracker.com","anvilofsound.com","appzuniverse.org","arabfilms.org","arabseries.org","asiatorrents.com","asiandvdclub.org","forum.audionews.org","audiozonetorrents.com","avlossless.no-ip.org","awesome-hd.net","bibliotik.org","bit-hdtv.com","bitemytorrent.com","bitgamer.com","bitgamer.su","bithq.org","bithumen.be","bitme.org","bitmetv.org","bitseduce.com","bitshock.org","bitsoup.org","bitspyder.net","bitvaulttorrent.com","blackcats-games.net","blu-torrents.net","brasiltorrents.com","btarg.com.ar","broadcasthe.net","cartoonchaos.org","chdbits.org","cheggit.net","choicebits.info","cinematik.net","confidencialpt.net","concen.org","crazysaloon.com","dcshare.org","definitive-scene.net","demonoid.me","deviloid.net","digitalhive.org","djleak.com","docspedia.org","ebookvortex.com","elbitz.net","elite-tracker.net","evil-zone.org","evoleech.org","evopt.org","exigomusic.org","extremebits.org","filelist.ro","filemp3.org","fileporn.org","footytorrents.co.uk","freethescene.net","feedthe.net","funfile.org","fusion-torrent.net","gameupdates.org","gazellegames.net","h33t.com","hd-life.net","hd-bits.ro","hd-mkv.me","hd-space.org","hd-torrents.org","hdahoy.org","hdbits.org","hdfrench.com","hdme.eu","hdstar.org","hdtracker.ru","hdts.ru","i-console.net","ilovetorrents.com","immortalseed.com","iptorrents.com","itoma.info","karagarga.net","lasttorrents.org","learnbits.me","libble.me","linkomanija.net","linuxtracker.org","lostfilm.tv","mazetorrents.net","megaups.com","metal.iplay.ro","midnight-scene.com","mojblink.com","myanonamouse.net","mybadbits.org","nhltorrents.co.uk","nono-friends.net","nordic-t.org","ntorrents.net","passthepopcorn.me","btmusic.eu","pianosheets.org","pornbay.org","pornoplace.lv","pornoplus.org","pornorip.net","preto.me","proaudiotorrents.org","puretna.com","pussytorrents.org","pythons-lair.com","racethe.net","redskunk.org","dc.ru-board.com","scene-inspired.com","scene-project.com","sceneaccess.org","scenefz.net","scenehd.org","scene-rush.com","scenexpress.net","sciencehd.info","secret-cinema.net","seedmore.org","sendthatshit.org","shadowtorrents.com","tracker.sharereactor.ro","sharetheremote.org","shareyourbooty.com","shareyourbytes.com","shellife.eu","soulbitz.com","speed.cd","sport-scene.net","sport-scene.net","supertorrents.org","syncthebits.com","teamfx.org","tehconnection.eu","the-bigbox.com","thecandy-store.org","thedarksyndicate.com","thebox.bz","thedvdclub.org","thegt.net","tti.nu","thescn.net","thevault.bz","topbytes.net","torrentkids.org","torrent-damage.net","torrent411.com","torrentbits.ro","torrentbytes.net","torrentleech.org","torrentmaniacs.org","torrentmonsters.com","torrentsforall.net","torrentvault.org","trackerzone.co.uk","trackerx.com.ar","tranceroute.com","tv-vault.org","tvtorrents.com","freshon.tv","tvtorrentz.org","underground-gamer.com","unlimited-tracker.net","vipmusic.org","waffles.fm","what.cd","wild-bytes.net","world-in-hd.net","worldwrestlingtorrents.net","wunza.ws","bt.xbox-sky.cc","xthor.net","xtremespeeds.net","xtremewrestlingtorrents.net","zionteam.org","tracker.0day.kiev.ua","0day.ro","3xp3rim3nt.info","420project.org","7track.org"];
var tracker_url="";
var isHidden=false;

for(i=0; i<tracker_urls.length;i++){
	var patt=new RegExp(tracker_urls[i],'i');
	if(window.location.href.search(patt)!=-1){
		tracker_url = tracker_urls[i];
		break;
	}
}



//Check if a username is stored
if(!GM_getValue("username","")&&tracker_url){
	var usernameprompt= prompt("This seems to be your first time using Aegan1's T-I Ratio Proofer. Please enter in the username you use for most torrent sites.");
	if(usernameprompt!=null){
		GM_setValue("username",usernameprompt);
		alert('Username: "'+usernameprompt+'" was stored! To use this userscript, simply press the "h" key to toggle screenshot mode. You can alternatively use the "+" and "-" keys. "+" shows everything (disabling screenshot mode), and "-" hides the elements necessary for a ratio proofer on the T-I forums.');
		alert("This script was made for the convenience of T-I members. You should however, always double check your screenshots to make sure they meet the forum's requirements.");
	}
	if(!GM_getValue("TIUsername","")){
		alert("You can also now set your T-I Forum Username. This will be displayed at the bottom of the screen. It will say something along the lines of"+'"'+"Username's Ratio Proof"+'" Make sure this is your T-I User name and not the username for any private tracker sites!!!'+"If you don't want your T-I username to be displayed, simply leave the following form blank. It can be changed later on if you change your mind.");
		setTIUser();
	}
}
var username=GM_getValue("username","");

const HANDLERS_TABLE = {
    // + : show
	187: showInfo,
    // - : hide
	189: hideInfo,
    // + : show2
	107: showInfo,
    // - : hide2
	109: hideInfo,
	// 'h' : toggle
	72: toggleInfo,
};
//Add the keypress handler
if(tracker_url&&(username||GM_getValue(tracker_url,""))){
	var pressedakey=0;
	var runthrough
	var replace_str;
	var selector;
	//Add Event Handlers
	window.addEventListener('keydown', keyHandler, false);
}

//Functions
function hideInfo(){
	if(!isHidden)
		toggleInfo();
}
function showInfo(){
	if(isHidden)
		toggleInfo();
}
function toggleInfo(){
	if(!runthrough){
		pressedakey++;
		setTimeout(doubleCheck,100);
		//Add Classes
		//Username
		
		if(GM_getValue(tracker_url))
			username = GM_getValue(tracker_url,"");
		var user_regx=new RegExp(username+"(?![^><]*>)",'gi');
	if(pressedakey<2){
		if(tracker_url=='hd-space.org'){
			if(!$('#overDiv + div').last().html().match(user_regx))
				usernameNotFound();
			replace_str = $('#overDiv + div').last().html().replace(user_regx, '<span class="tiratioproofer tiratioseperator">'+username+'</span>');
			$('#overDiv + div').last().html(replace_str);
		}
		else{
			if(!$('body').html().match(user_regx))
				usernameNotFound();
			replace_str = $('body').html().replace(user_regx, '<span class="tiratioproofer tiratioseperator">'+username+'</span>');
			$('body').html(replace_str);
		}
		var usernamefreq=$('.tiratioproofer').length;
	}
		//Find Parent DIV
		if(selector==undefined)
		selector=$(".tiratioproofer");
		if(selector.parent().closest($("div,table,body")).html()!=undefined)
			selector = selector.parent().closest($("div,table,body"));
		selector.addClass("ratioprooferselector");
		//Extras/Misc
		var extras_regx=/(<span class="tiratioproofer">)?(\d+\.?\d*)(?![^><]*>)(<\/span>)?/gi;
		selector.html(function(index,oldhtml){return oldhtml.replace(extras_regx, '<span class="tiratioproofer">$2</span>');});
		//Ratio
	if(pressedakey<2){
		var uldl_regx=/<span class="tiratioproofer">(\d+\.?)(\d*)<\/span>(\s?)((K|M|G|T)I?B)/gi;
		var uldl = selector.html().match(uldl_regx);
		var ul = uldl[0].match(/(\d+\.?)(\d*)/)[0];
		var dl = uldl[1].match(/(\d+\.?)(\d*)/)[0];
		var ulbydl = (Math.round(ul/dl*10)/10).toString().split(".");
		var dlbyul = (Math.round(dl/ul*10)/10).toString().split(".");
		var ulbydl_regx=new RegExp('<span class="tiratioproofer">('+ulbydl[0]+')\\.('+ulbydl[1]+'\\d*)<\\/span>');
		var dlbyul_regx=new RegExp('<span class="tiratioproofer">('+dlbyul[0]+')\\.('+dlbyul[1]+'\\d*)<\\/span>');
		if(ulbydl[0]==0&&ulbydl[0]==0)
			ulbydl_regx=/123456789123456789/;
		if(dlbyul[0]==0&&dlbyul[0]==0)
			dlbyul_regx=/123456789123456789/;
		selector.html(function(index,oldhtml){return oldhtml.replace(ulbydl_regx, '<span style="opacity:1!important;">$1.</span><span class="tiratioproofer ratiogotten">$2</span>');});
		selector.html(function(index,oldhtml){return oldhtml.replace(dlbyul_regx, '<span style="opacity:1!important;">$1.</span><span class="tiratioproofer ratiogotten">$2</span>');});
		if($('.ratiogotten').html()==undefined){
		var ulbydl_regx=new RegExp('<span class="tiratioproofer">('+ulbydl[0]+')\\.(\\d*)<\\/span>');
		var dlbyul_regx=new RegExp('<span class="tiratioproofer">('+dlbyul[0]+')\\.(\\d*)<\\/span>');
		if(ulbydl[0]==0)
			ulbydl_regx=/123456789123456789/;
		if(dlbyul[0]==0)
			dlbyul_regx=/123456789123456789/;
		selector.html(function(index,oldhtml){return oldhtml.replace(ulbydl_regx, '<span style="opacity:1!important;">$1.</span><span class="tiratioproofer ratiogotten">$2</span>');});
		selector.html(function(index,oldhtml){return oldhtml.replace(dlbyul_regx, '<span style="opacity:1!important;">$1.</span><span class="tiratioproofer ratiogotten">$2</span>');});
		}
	}
		if($('.ratiogotten').length<usernamefreq||usernamefreq==undefined&&pressedakey<3){
			selector.html(function(index,oldhtml){return oldhtml.replace(ulbydl_regx, '<span style="opacity:1!important;">$1.</span><span class="tiratioproofer ratiogotten">$2</span>');});
			selector.html(function(index,oldhtml){return oldhtml.replace(dlbyul_regx, '<span style="opacity:1!important;">$1.</span><span class="tiratioproofer ratiogotten">$2</span>');});
			return;
		}
		//Whole Numbers Only Please!
		var uldl_regx=/<span class="tiratioproofer">(\d+\.?)(\d*)<\/span>(\s?)((K|M|G|T)I?B)/gi;
		selector.html(function(index,oldhtml){return oldhtml.replace(uldl_regx, '<span style="opacity:1!important;">$1</span><span class="tiratioproofer">$2$3</span><span style="opacity:1!important;">$4</span>');});
		//Reputation
		$("img[title*='reputation']").addClass("tiratioproofer");
		$("img[src*='reputation']").addClass("tiratioproofer");
		$("img[alt*='reputation']").addClass("tiratioproofer");
		
		$(".ratioprooferselector td:contains('Rank')").last().addClass("tiratioproofer");
		
		//Add Credits
		var credits = "<div style='bottom:-100px;position:fixed;z-index:9999;width:100%;text-align:center;' id='ratioprooferhead'><h3 style='border:3px solid #222;color:#fff;margin:0 auto;padding:15px;width:80%;' class='ratioproofergradient'><span id='TIUsername'></span>Screenshot made with Aegan1's T-I Ratio Proofer</br><button id='TIUsernameprompt'>Set T-I Username</button><button id='usernameglobalprompt'>Set Default Username</button><button id='usernamesiteprompt'>Set Username For "+tracker_url+"</button></h3></div>";
		//Add gradient css
		credits += "<style type='text/css'>.ratioproofergradient{background: #4c4c4c; /* Old browsers *//* IE9 SVG, needs conditional override of 'filter' to 'none' */background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzRjNGM0YyIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEyJSIgc3RvcC1jb2xvcj0iIzU5NTk1OSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjI1JSIgc3RvcC1jb2xvcj0iIzY2NjY2NiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjM5JSIgc3RvcC1jb2xvcj0iIzQ3NDc0NyIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzJjMmMyYyIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjUxJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjYwJSIgc3RvcC1jb2xvcj0iIzExMTExMSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9Ijc2JSIgc3RvcC1jb2xvcj0iIzJiMmIyYiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjkxJSIgc3RvcC1jb2xvcj0iIzFjMWMxYyIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxMzEzMTMiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background: -moz-linear-gradient(top,  #4c4c4c 0%, #595959 12%, #666666 25%, #474747 39%, #2c2c2c 50%, #000000 51%, #111111 60%, #2b2b2b 76%, #1c1c1c 91%, #131313 100%); /* FF3.6+ */background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#4c4c4c), color-stop(12%,#595959), color-stop(25%,#666666), color-stop(39%,#474747), color-stop(50%,#2c2c2c), color-stop(51%,#000000), color-stop(60%,#111111), color-stop(76%,#2b2b2b), color-stop(91%,#1c1c1c), color-stop(100%,#131313)); /* Chrome,Safari4+ */background: -webkit-linear-gradient(top,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* Opera 11.10+ */background: -ms-linear-gradient(top,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* IE10+ */background: linear-gradient(to bottom,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4c4c4c', endColorstr='#131313',GradientType=0 ); /* IE6-8 */}#TIUsername{color:lime;display:block;}</style>";
		//IE9 Conditionals. Bleh
		credits += "<!--[if gte IE 9]><style type='text/css'>.ratioproofergradient{filter: none;}</style><![endif]-->";
		if(tracker_url=='hd-space.org'){
			$("#overDiv + div").last().prepend(credits);
		}
		else{
			$("body").prepend(credits);
		}
		if(GM_getValue("TIUsername",""))
			$("#TIUsername").html(GM_getValue("TIUsername","")+"'s Ratio Proof");
		document.getElementById("TIUsernameprompt").addEventListener("click", setTIUser, false);
		document.getElementById("usernameglobalprompt").addEventListener("click", setUserGlobal, false);
		document.getElementById("usernamesiteprompt").addEventListener("click", setUserSite, false);
		runthrough=true;
	}
	if(isHidden){
		$(".tiratioproofer").fadeTo(500,1);
		$("#ratioprooferhead").animate({bottom:'-100px'}, 500, 'swing');
		isHidden=false;
	}
	else{
		$(".tiratioproofer").fadeTo(500,0);
		$("#ratioprooferhead").animate({bottom:'0px'}, 500, 'swing');
		isHidden=true;
	}
}

function keyHandler(event) {
  // Check for modifier keys
  if (event.altKey || event.ctrlKey || event.metaKey || event.keyCode == 16) {
    return false;
  }
  
  // Check if user is typing
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && event.target.type &&
         event.target.type.toLowerCase() == "text")) {
      return false;
    }
  }
 
  //alert("Event: " + event.keyCode);
  
  if (event.keyCode in HANDLERS_TABLE) {
	if(event.keyCode==72)
		toggleInfo();
	if(event.keyCode==(187||107))
		showInfo();
	if(event.keyCode==(189||109))
		hideInfo();
    return true;
  }
  
  return false;
}
function setTIUser(){
	var usernameprompt = prompt("Set Your Torrent-Invites Forum Username! This should not be the same or similar to usernames you use on private trackers:",GM_getValue("TIUsername",""));
	if(usernameprompt==(GM_getValue("username","")||GM_getValue(tracker_url,""))){
		alert('Shame! Did you not read the warning!?! Your T-I username can NOT be the same as any of your private tracker username!');
		return;
	}
	if(usernameprompt!=null){
		GM_setValue("TIUsername",usernameprompt);
		$("#TIUsername").html(usernameprompt+"'s Ratio Proof");
	}
	if(!GM_getValue("TIUsername","")){
		$("#TIUsername").html('');
	}
	return;
}
function setUserGlobal(){
	var usernameprompt = prompt("Set Global Username To:",GM_getValue("username",""));
	if(usernameprompt!=null)
		GM_setValue("username",usernameprompt);
	return;
}
function setUserSite(){
	var usernameprompt = prompt("Set "+tracker_url+" Username To:",GM_getValue(tracker_url,""));
	if(usernameprompt!=null)
		GM_setValue(tracker_url,usernameprompt);
	username = usernameprompt;
	return;
}
function usernameNotFound(){
	alert('Username was not found. Please set a username specific to this site.');
	setUserSite();
	return;
}
function doubleCheck(){
if(!runthrough&&pressedakey<3){
toggleInfo();
setTimeout(doubleCheck,100);
}
return;
}