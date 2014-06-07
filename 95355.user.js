// ==UserScript==
// @name            empty_string
// @author          botnet
// @namespace       127.0.0.1
// @include         http://boards.adultswim.com/*
// @include         https://login.adultswim.com/services/aswim/flow/login?
// @include         http://www.adultswim.com/*
// @include         http://adultswim.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js

// ==/UserScript==
		

$(document).ready(function(){
var shortcut1, shortcut2, shortcut3, shortcut4, shortcut5, shortcut6, shortcut7, shortcut8, shortcut9, shortcut0;
var binding = document.cookie.split(';');
for(i=0;i<binding.length;i++){
  if(binding[i].indexOf("board_1") != -1){
    shortcut1 = binding[i];
  }
  if(binding[i].indexOf("board_2") != -1){
    shortcut2 = binding[i];
  }
  if(binding[i].indexOf("board_3") != -1){
    shortcut3 = binding[i];
  }
  if(binding[i].indexOf("board_4") != -1){
    shortcut4 = binding[i];
  }
  if(binding[i].indexOf("board_5") != -1){
    shortcut5 = binding[i];
  }
  if(binding[i].indexOf("board_6") != -1){
    shortcut6 = binding[i];
  }
  if(binding[i].indexOf("board_7") != -1){
    shortcut7 = binding[i];
  }
  if(binding[i].indexOf("board_8") != -1){
    shortcut8 = binding[i];
  }
  if(binding[i].indexOf("board_9") != -1){
    shortcut9 = binding[i];
  }
  if(binding[i].indexOf("board_0") != -1){
    shortcut0 = binding[i];
  }
}
if(shortcut1){
  shortcut1 = shortcut1.replace('board_1=', '');
}
if(shortcut2){
  shortcut2 = shortcut2.replace('board_2=', '');
}
if(shortcut3){
  shortcut3 = shortcut3.replace('board_3=', '');
}
if(shortcut4){
  shortcut4 = shortcut4.replace('board_4=', '');
}
if(shortcut5){
  shortcut5 = shortcut5.replace('board_5=', '');
}
if(shortcut6){
  shortcut6 = shortcut6.replace('board_6=', '');
}
if(shortcut7){
  shortcut7 = shortcut7.replace('board_7=', '');
}
if(shortcut8){
  shortcut8 = shortcut8.replace('board_8=', '');
}
if(shortcut9){
  shortcut9 = shortcut9.replace('board_9=', '');
}
if(shortcut0){
  shortcut0 = shortcut0.replace('board_0=', '');
}

function addBackground(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


var keyBind = $('ul.lia-tabs-standard').append('<li class="lia-tabs-inactive lia-tabs keybindings-tab"><span><a href="#keyPref">Key Bindings</a></span></li>');
$(keyBind).css('cursor', 'pointer');
var keyBox = document.createElement('div');
var profile = $('#viewUserProfile').attr('href');
var select = '<option value=""><span class="selectTitle">Select location</span></option><option value="http://boards.adultswim.com/">Board index</option>'
+ '<option value="http://boards.adultswim.com/t5/Incoherent-Babbling/bd-p/2/">Incoherent Babbling</option>'
+ '<option value="http://boards.adultswim.com/t5/Babbling/bd-p/9/">Babbling</option>'
+ '<option value="http://boards.adultswim.com/t5/Rants/bd-p/8/">Rants</option>'
+ '<option value="http://boards.adultswim.com/t5/General-Games-Discussion/bd-p/generalgames/">General Games</option>'
+ '<option value="http://boards.adultswim.com/t5/General-Music-Discussion/bd-p/generalmusic/">General Music</option>'
+ '<option value="http://boards.adultswim.com/t5/General-Action-Discussion/bd-p/6/">General Action</option>'
+ '<option value="http://boards.adultswim.com/t5/The-Big-O/bd-p/bigo/">The Big O</option>'
+ '<option value="http://boards.adultswim.com/t5/Blood/bd-p/bloodPlus/">Blood+</option>'
+ '<option value="http://boards.adultswim.com/t5/Cowboy-Bebop/bd-p/cowboybebop/">Cowboy Bebop</option>'
+ '<option value="http://boards.adultswim.com/t5/Fullmetal-Alchemist/bd-p/fullmetal/">Fullmetal Alchemist</option>'
+ '<option value="http://boards.adultswim.com/t5/InuYasha/bd-p/inuyasha/">InuYasha</option>'
+ '<option value="http://boards.adultswim.com/t5/Moribito-Guardian-of-the-Spirit/bd-p/moribito/">Moribito</option>'
+ '<option value="http://boards.adultswim.com/t5/Fan-Fiction/bd-p/fanfiction/">Fan Fiction</option>'
+ '<option value="http://boards.adultswim.com/t5/Bleach/bd-p/bleach/">Bleach</option>'
+ '<option value="http://boards.adultswim.com/t5/Code-Geass/bd-p/codegeass/">Code Geass</option>'
+ '<option value="http://boards.adultswim.com/t5/Death-Note/bd-p/deathnote/">Death Note</option>'
+ '<option value="http://boards.adultswim.com/t5/Ghost-in-the-Shell/bd-p/ghostshell/">Ghost in the Shell</option>'
+ '<option value="http://boards.adultswim.com/t5/Kekkaishi/bd-p/kekkaishi/">Kekkaishi</option>'
+ '<option value="http://boards.adultswim.com/t5/Other-Anime/bd-p/4/">Other Anime</option>'
+ '<option value="http://boards.adultswim.com/t5/General-Comedy-Discussion/bd-p/5/">General Comedy</option>'
+ '<option value="http://boards.adultswim.com/t5/American-Dad/bd-p/americandad/">American Dad</option>'
+ '<option value="http://boards.adultswim.com/t5/Assy-McGee/bd-p/assy/">Assy McGee</option>'
+ '<option value="http://boards.adultswim.com/t5/Check-It-Out-with-Steve-Brule/bd-p/checkitout/">Check it Out!</option>'
+ '<option value="http://boards.adultswim.com/t5/Delocated/bd-p/delocated/">Delocated</option>'
+ '<option value="http://boards.adultswim.com/t5/Family-Guy/bd-p/familyguy/">Family Guy</option>'
+ '<option value="http://boards.adultswim.com/t5/Freaknik-The-Musical/bd-p/freaknik/">Freaknik</option>'
+ '<option value="http://boards.adultswim.com/t5/Harvey-Birdman-Attorney-at-Law/bd-p/birdman/">Harvey Birdman</option>'
+ '<option value="http://boards.adultswim.com/t5/King-of-the-Hill/bd-p/kingofthehill/">King of the Hill</option>'
+ '<option value="http://boards.adultswim.com/t5/Lucy-Daughter-of-the-Devil/bd-p/lucy/">Lucy, Daughter of the Devil</option>'
+ '<option value="http://boards.adultswim.com/t5/Metalocalypse/bd-p/metal/">Metalocalypse</option>'
+ '<option value="http://boards.adultswim.com/t5/Mongo-Wrestling-Alliance/bd-p/mongowrestlingalliance/">Mongo Wrestling Alliance</option>'
+ '<option value="http://boards.adultswim.com/t5/The-Office/bd-p/theoffice/">The Office</option>'
+ '<option value="http://boards.adultswim.com/t5/Sealab-2021/bd-p/sealab/">Sealab 2021</option>'
+ '<option value="http://boards.adultswim.com/t5/Squidbillies/bd-p/squidbillies/">Squidbillies</option>'
+ '<option value="http://boards.adultswim.com/t5/Tim-Eric-Awesome-Show-Great-Job/bd-p/timanderic/">Tim & Eric</option>'
+ '<option value="http://boards.adultswim.com/t5/Venture-Bros/bd-p/venturebros/">Venture Bros.</option>'
+ '<option value="http://boards.adultswim.com/t5/12-Oz-Mouse/bd-p/mouse/">12 Oz. Mouse</option>'
+ '<option value="http://boards.adultswim.com/t5/Aqua-Teen-Hunger-Force/bd-p/athf/">Aqua Teen Hunger Force</option>'
+ '<option value="http://boards.adultswim.com/t5/The-Boondocks/bd-p/boondocks/">The Boondocks</option>'
+ '<option value="http://boards.adultswim.com/t5/Childrens-Hospital/bd-p/childrenshospital/">Childrens Hospital</option>'
+ '<option value="http://boards.adultswim.com/t5/The-Drinky-Crow-Show/bd-p/drinkycrow/">The Drinky Crow Show</option>'
+ '<option value="http://boards.adultswim.com/t5/Fat-Guy-Stuck-in-Internet/bd-p/fatguy/">Fat Guy Stuck in the Internet</option>'
+ '<option value="http://boards.adultswim.com/t5/Frisky-Dingo/bd-p/frisky/">Frisky Dingo</option>'
+ '<option value="http://boards.adultswim.com/t5/Home-Movies/bd-p/homemovies/">Home Movies</option>'
+ '<option value="http://boards.adultswim.com/t5/Look-Around-You/bd-p/lookaroundyou/">Look Around You</option>'
+ '<option value="http://boards.adultswim.com/t5/Mary-Shelley-s-Frankenhole/bd-p/frankenhole/">Merry Shelley\'s Frankenhole</option>'
+ '<option value="http://boards.adultswim.com/t5/The-Mighty-Boosh/bd-p/mightyboosh/">The Mighty Boosh</option>'
+ '<option value="http://boards.adultswim.com/t5/Moral-Orel/bd-p/moralorel/">Moral Orel</option>'
+ '<option value="http://boards.adultswim.com/t5/Robot-Chicken/bd-p/robotchicken/">Robot Chicken</option>'
+ '<option value="http://boards.adultswim.com/t5/Space-Ghost-Coast-to-Coast/bd-p/spaceghost/">Space Ghost</option>'
+ '<option value="http://boards.adultswim.com/t5/Superjail/bd-p/superjail/">Superjail!</option>'
+ '<option value="http://boards.adultswim.com/t5/Titan-Maximum/bd-p/titan/">Titan Maximum</option>'
+ '<option value="http://boards.adultswim.com/t5/Xavier-Renegade-Angel/bd-p/xavier/">Xavier</option>'
+ '<option value="http://boards.adultswim.com/t5/General-Adult-Swim-Discussion/bd-p/3/">General AS Discussion</option>'
+ '<option value="http://boards.adultswim.com/t5/Adult-Swim-Games/bd-p/asgames/">AS Games</option>'
+ '<option value="http://boards.adultswim.com/t5/Show-Suggestions/bd-p/showsuggestions/">Show Suggestions</option>'
+ '<option value="http://boards.adultswim.com/t5/AdultSwim-com-and-Site-Support/bd-p/support/">Site Support</option>'
+ '<option value="http://boards.adultswim.com/t5/Bumps/bd-p/bumps/">Bumps</option>'
+ '<option value="'+profile+'">Your Profile</option>'
+''
+'</select>';

$(keyBox).html('<div id="keyPref"><fieldset><legend>Keybinding Preferences</legent><div class="keyPrefBox"><div class="keyTitle">Configure your shortcuts <span class="HelpIcon"><a class="keyHelp" title="Configure keyboard shortcuts here"><img src="http://adultswim.i.lithium.com/skins/images/715F4DBB007B74690496AC6A92AF074B/base/images/icon_help.png" id="display_1"></a></span></div><div class="keyBox"><ul class="keySelect"><li><span>Alt+1</span><span><select class="keyDrop" style="background: black" onchange="if(options[selectedIndex].value) document.cookie=\'board_1=\'+(options[selectedIndex].value)+\'; expires=01/01/2015 00:00:00; path=/\'">'+select+'</span></li><li><span>Alt+2</span><span><select class="keyDrop" style="background: black" onchange="if(options[selectedIndex].value) document.cookie=\'board_2=\'+(options[selectedIndex].value)+\'; expires=01/01/2015 00:00:00; path=/\'">'+select+'</span></li><li><span>Alt+3</span><span><select class="keyDrop" style="background: black" onchange="if(options[selectedIndex].value) document.cookie=\'board_3=\'+(options[selectedIndex].value)+\'; expires=01/01/2015 00:00:00; path=/\'">'+select+'</span></li><li><span>Alt+4</span><span><select class="keyDrop" style="background: black" onchange="if(options[selectedIndex].value) document.cookie=\'board_4=\'+(options[selectedIndex].value)+\'; expires=01/01/2015 00:00:00; path=/\'">'+select+'</span></li><li><span>Alt+5</span><span><select class="keyDrop" style="background: black" onchange="if(options[selectedIndex].value) document.cookie=\'board_5=\'+(options[selectedIndex].value)+\'; expires=01/01/2015 00:00:00; path=/\'">'+select+'</span></li><li><span>Alt+6</span><span><select class="keyDrop" style="background: black" onchange="if(options[selectedIndex].value) document.cookie=\'board_6=\'+(options[selectedIndex].value)+\'; expires=01/01/2015 00:00:00; path=/\'">'+select+'</span></li><li><span>Alt+7</span><span><select class="keyDrop" style="background: black" onchange="if(options[selectedIndex].value) document.cookie=\'board_7=\'+(options[selectedIndex].value)+\'; expires=01/01/2015 00:00:00; path=/\'">'+select+'</span></li><li><span>Alt+8</span><span><select class="keyDrop" style="background: black" onchange="if(options[selectedIndex].value) document.cookie=\'board_8=\'+(options[selectedIndex].value)+\'; expires=01/01/2015 00:00:00; path=/\'">'+select+'</span></li><li><span>Alt+9</span><span><select class="keyDrop" style="background: black" onchange="if(options[selectedIndex].value) document.cookie=\'board_9=\'+(options[selectedIndex].value)+\'; expires=01/01/2015 00:00:00; path=/\'">'+select+'</span></li><li><span>Alt+0</span><span><select class="keyDrop" style="background: black" onchange="if(options[selectedIndex].value) document.cookie=\'board_0=\'+(options[selectedIndex].value)+\'; expires=01/01/2015 00:00:00; path=/\'">'+select+'</span></li></ul><br><input type="button" class="saveBindings lia-button lia-button-primary" onclick="window.location.href=\'http://boards.adultswim.com/t5/user/myprofilepage/tab/personal-profile\'" value="Save"></div></div></fieldset><div>');

$(keyBind).click(function(){
  $('#tabGroup').append(keyBox);
  addBackground(".keyTitle{width: 33% !important;font-weight: bold;text-align: right;float: left;padding: 0 10px 0 0;}.keyBox{float: left;width: 66%;}ul.keySelect li{padding: 5px 0 !important;}ul.keySelect li span{padding: 0 4px !important;}ul.keySelect li span select{background-color: #111 !important;color: #fff;border:1px solid #444 !important}");
});

document.addEventListener('keypress', keyHandler, true);
function keyHandler(e) {
	var keyCode = e.which;
  if (keyCode == '49' && e.altKey) { 
		window.location.href = shortcut1;
	}
  if (keyCode == '50' && e.altKey) { 
		window.location.href = shortcut2;
	}
  if (keyCode == '51' && e.altKey) { 
		window.location.href = shortcut3;
	}
  if (keyCode == '52' && e.altKey) { 
		window.location.href = shortcut4;
	}
  if (keyCode == '53' && e.altKey) { 
		window.location.href = shortcut5;
	}
  if (keyCode == '54' && e.altKey) { 
		window.location.href = shortcut6;
	}
  if (keyCode == '55' && e.altKey) { 
		window.location.href = shortcut7;
	}
  if (keyCode == '56' && e.altKey) { 
		window.location.href = shortcut8;
	}
  if (keyCode == '57' && e.altKey) { 
		window.location.href = shortcut9;
	}
  if (keyCode == '48' && e.altKey) { 
		window.location.href = shortcut0;
	}
}

});


