// ==UserScript==
// @name           Nexus Clash Colour Messages 
// @namespace      http://userscripts.org/users/125692
// @description    Message colour coding for Nexus Clash Browser Game
// @include        http://nexusclash.com/modules.php?name=Game*
// @include        http://www.nexusclash.com/modules.php?name=Game*
// @exclude        http://nexusclash.com/modules.php?name=Game&op=disconnect
// @exclude        http://www.nexusclash.com/modules.php?name=Game&op=disconnect
// @grant none
// @version     1.2
// ==/UserScript==

//just a cut and paste of the relevant sections of my larger tweaks script.

(function() {

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
//styles for pet messages
addGlobalStyle('div.MagePetHit {font-size:smaller;color:lightcoral ! important;padding-left:4em;}');
addGlobalStyle('div.MagePetHitMe {font-size:smaller;color:red ! important;padding-left:4em;}');
addGlobalStyle('div.MagePetKill {font-size:smaller;color:crimson;padding-left:4em;}');
addGlobalStyle('div.MagePetMiss {font-size:smaller;color:#CAA083;padding-left:4em;}');
addGlobalStyle('div.MagePetHealOthers {font-size:smaller;color:5050aa;padding-left:4em;}');
addGlobalStyle('div.MagePetHealMe {font-size:smaller;color:0808aa;padding-left:4em;}');
addGlobalStyle('div.MagePetRejuv {font-size:smaller;color:aa50aa;padding-left:4em;}');
addGlobalStyle('div.MagePetDespawn {font-size:smaller;color:ff8000;padding-left:4em;}');
//styles for player attack messages
addGlobalStyle('div.MageAttackHit {color:red ! important;}');
addGlobalStyle('div.MageAttackMiss {color:deeppink;}');
addGlobalStyle('div.MageAttacked {color:red;font-weight:600}');
//environmental damage
addGlobalStyle('div.MageAttackedbyEnvironment {color:red;font-weight:100}');
//player is healed
addGlobalStyle('div.MageHealed {color:0808aa;}');
//style for achievement messages
addGlobalStyle('div.MageAchievement {font-size:smaller;padding-left:4em;}');
addGlobalStyle('span.MageAchievementColour {color:aa0000;}');
addGlobalStyle('div.MageSpeech {color:dodgerblue;}');
addGlobalStyle('div.MageAction {color:aaaaff;}');
addGlobalStyle('div.MageWhisper{color:MediumOrchid;}');
addGlobalStyle('span.MageMe{color:darkblue;}');
addGlobalStyle('div.MageReceivedSomething{color:ff8040;}');
addGlobalStyle('div.MageCraft{color:8d4f9d;}');
addGlobalStyle('div.MageSearchNothing{color:8c8c55;}');
addGlobalStyle('div.MageSearchYay{color:8c8c00;}');

// TWEAK 8 Color hits/misses (and make message box bigger and resizable)
if(document.getElementById("Messages")){
var messages=document.getElementById("Messages");
if (!(messages.previousElementSibling.innerHTML.match(/This Week/))){//ensure we dont do this on log page
    //messages.style.height="145px";//make the message box a bit bigger
    messages.style.resize = "vertical";//allow resizing
}
var alonglist=messages.innerHTML.split("\n");
var a=0;//for testing. count number of certain matches depending on where I left a++; 
var b=0;//for testing. count number of certain matches depending on where I left b++; 

for (i=0;i<alonglist.length;i++){ //For each line
//first check every string for the dreaded a(n) and fix them
	alonglist[i]=alonglist[i].replace(/( a)(\(?(n)\)?( [AEIOUaeiou])|\(?n\)?( [^AEIOUaeiou]))/g,'$1$3$4$5');//fix all ' a(n)'
//regex string for replacing a(n)
//a.replace(/((a)\((n)\)( [AEIOUaeiou])|(a)\(()n\)( [^AEIOUaeiou]))/g,'$2$3$4$5$6$7')	

//You attack and hit
    if(alonglist[i].match(/(- (\(\d+ times\) )?You attack .* with your .* and hit for .* damage..*)<br>/)){
		alonglist[i]="<div class='MageAttackHit'>"+alonglist[i]+"</div>";//colour hits red
	}	
//You attack and miss	
    else if(alonglist[i].match(/(- (\(\d+ times\) )?You attack .* with your .* and miss..*)<br>/)){
        alonglist[i]="<div class='MageAttackMiss'>"+alonglist[i]+"</div>";//colour misses deeppink
	}
//You defend
    else if(alonglist[i].match(/-( (\(\d+ times\) )?.* attacked you with .*)<br>/)){
        alonglist[i]="<div class='MageAttacked'>!"+alonglist[i].substr(1)+"</div>";
	}
//Environmental damage
    else if(alonglist[i].match(/-( (\(\d+ times\) )?.* (Your action causes you to|You|you) take \d+ point(s)? of( \b[a-z]+\b)? damage(.|!)?.*)<br>/)){
        alonglist[i]="<div class='MageAttackedbyEnvironment'>!"+alonglist[i].substr(1)+"</div>";
	}

//and make pet lines smaller font?   serach for    ', belonging to'
//pet is rejuved
	//- Your pet, Judgemaster, has been rejuvenated. You spent 15 Magic Points. (2013-06-25 02:17:16).
    //FFS two spaces before 'You spent...'	
    else if(alonglist[i].match(/(- (\(\d+ times\) )?Your pet, .* has been rejuvenated.  You spent \d+ Magic Point.*)<br>/)){
        alonglist[i]="<div class='MagePetRejuv'>"+alonglist[i]+"</div>";
	}

//Player is healed by pet             
	//- Aethersprite, belonging to kiwimage, healed you. You gain 10 hit points. The poison affecting you has been cured. (2013-06-18 14:12:52).
    else if(alonglist[i].match(/(- (\(\d+ times\) )?.* belonging to .*, healed you. You gain \d+ hit point(s)?.*)<br>/)){
        alonglist[i]="<div class='MagePetHealMe'>"+alonglist[i]+"</div>";
	}
//Player healed by will-o-wisp(possibly also wight)
	//- Will-O-Wisp, belonging to Mr Scavvy, has funneled life energy to you, healing you of 1 points of damage. (2013-06-25 02:38:02). 
	else if(alonglist[i].match(/(- (\(\d+ times\) )?.* belonging to .*, has funneled life energy to you, healing you of \d+ points of damage.*)<br>/)){
        alonglist[i]="<div class='MagePetHealMe'>"+alonglist[i]+"</div>";
	}
//Own pets healing others
	//- Aethersprite, belonging to kiwimage, healed German Shepherd for 10 hit points. (2013-06-18 07:44:32). 
	else if(alonglist[i].match(/(- (\(\d+ times\) )?.*, belonging to .*, healed .* for \d+ hit point.*)<br>/)){
        alonglist[i]="<div class='MagePetHealOthers'>"+alonglist[i]+"</div>";
	}
//own pets attacking
    else if(alonglist[i].match(/(- (\(\d+ times\) )?Your pet .* and hit for .*)<br>/)){
        alonglist[i]="<div class='MagePetHit'>"+alonglist[i]+"</div>";
a++;//MAGE TESTING	
	}
	//bring hit by others pets made slightly more important.(though if you seeing this you are probably dead.)
		
	else if(alonglist[i].match(/(- (\(\d+ times\) )?.*, belonging to .* and hit for .*)<br>/)){
        alonglist[i]="<div class='MagePetHitMe'>!"+alonglist[i].substr(1)+"</div>";
a++;//MAGE TESTING	
	}
    else if(alonglist[i].match(/(- (\(\d+ times\) )?(Your pet |[^,].*, belonging to).*, killing them!.*)<br>/)){
        alonglist[i]="<div class='MagePetKill'>"+alonglist[i]+"</div>";
	}
    else if(alonglist[i].match(/(- (\(\d+ times\) )?(Your pet |[^,].*, belonging to).* and missed.*)<br>/)){
        alonglist[i]="<div class='MagePetMiss'>"+alonglist[i]+"</div>";
b++;//MAGE TESTING			
	}
//others pets attacking
    else if(alonglist[i].match(/-( (\(\d+ times\) )?.* attacked your pet,.*and hit for .*)<br>/)){
        alonglist[i]="<div class='MagePetHit'}>!"+alonglist[i].substr(1)+"</div>";//colour pet getting hit bold red with exclamation mark
	}
    else if(alonglist[i].match(/(- (\(\d+ times\) )?.* attacked your pet,.* killing it!.*)<br>/)){
        alonglist[i]="<div class='MagePetKill'>"+alonglist[i]+"</div>";
	}
    else if(alonglist[i].match(/(- (\(\d+ times\) )?.* attacked .* killing it!.*)<br>/)){
        alonglist[i]="<div class='MagePetKill'>"+alonglist[i]+"</div>";//PET MESSAGES SEEM TO BE ODDLY BORKED IN COMPARISON TO OTHERS
	}
    else if(alonglist[i].match(/(- (\(\d+ times\) )?.* attacked your pet.* and missed.*)<br>/)){
        alonglist[i]="<div class='MagePetMiss'>"+alonglist[i]+"</div>";//NOTE NO COMMA FOR MISS MESSAGES!
	}
//pet despawns
	// - Your pet Lightspawn, a Ghoul, has despawned. (2013-06-21 19:00:07).
	//- Aethersprite, belonging to kiwimage, has despawned. (2013-06-18 07:49:21).     
    else if(alonglist[i].match(/(- (\(\d+ times\) )?(Your pet .*|.*, belonging to .*,) has despawned.*)<br>/)){
        alonglist[i]="<div class='MagePetDespawn'>"+alonglist[i]+"</div>";
	}
	
	
//achievement announcements
    else if(alonglist[i].match(/((- (\(\d+ times\) )?)<font color="#DD0000">(<b>.*<\/b>)<\/font>(.*))<br>/)){
		//BAH EASIER JUST TO USE REPLACE
        //alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?<)font color="#DD0000"(>.*)font>(.*)<br>/g,"<div class='MageAchievement'>$1span class='MageAchievementColour'$2</span>$3</div>");//center annoucements
		alonglist[i]=alonglist[i].replace(/((- (\(\d+ times\) )?)<font color="#DD0000">(<b>.*<\/b>)<\/font>(.*))<br>/,'<div class="MageAchievement">$2<span class="MageAchievementColour">$4</span>$5</div>');//center annoucements
	}
//- <font color="#DD0000"><b><a href="modules.php?name=Game&op=character&id=4876">Abra Cadaver</a> has become a(n) Lich !</b></font> (2012-05-17 01:27:56). <br>/

//colour speech light blue
    else if(alonglist[i].match(/(- (\(\d+ times\) )?)([^,].*)( said, )(\".*)<br>/)){
        //alonglist[i]="<div class='MageSpeech'>"+alonglist[i]+"</div>";
		alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)([^,].*) (said, )(\".*)<br>/,"<div class='MageSpeech'>$1 $3<span class='MageMe'> $4</span>$5</div>");
	}
    else if(alonglist[i].match(/(- (\(\d+ times\) )?)([^,].*)( whispered to you, saying).(\".*)<br>/)){
        //alonglist[i]="<div class='MageSpeech'>"+alonglist[i]+"</div>";
		alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)([^,].*) (whispered to you, saying).(\".*)<br>/,"<div class='MageSpeech'>$1 $3<span class='MageMe'> $4, </span>$5</div>");
	}
	else if(alonglist[i].match(/(- (\(\d+ times\) )?)(You say, )(\".*)<br>/)){
        alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)(You say, )(\".*)<br>/,"<div class='MageSpeech'>$1<span class='MageMe'>$3</span>$4</div>");
	}
    else if(alonglist[i].match(/(- (\(\d+ times\) )?You whisper, \".*)<br>/)){
        //alonglist[i]="<div class='MageSpeech'>"+alonglist[i]+"</div>";
		//Due to wanting to make the you part black but still have the initial - blue doing it with a replace.
		alonglist[i]=alonglist[i].replace(/(- (\(\d+ times\) )?)(You whisper, )(\".*)<br>/,"<div class='MageSpeech'>$1<span class='MageMe'>$3</span>$4</div>");
	}
	else if(alonglist[i].match(/(- (\(\d+ times\) )?[^,].* (said|say), \".*)<br>/)){
        alonglist[i]="<div class='MageSpeech'>"+alonglist[i]+"</div>";
	}
	else if(alonglist[i].match(/(- (\(\d+ times\) )?[^,].* (whispered to you|whisper), saying \".*)<br>/)){
        alonglist[i]="<div class='MageSpeech'>"+alonglist[i]+"</div>";
	}
//colour being given something
    else if(alonglist[i].match(/-( (\(\d+ times\) )?[^,].* gave you a.*)<br>/)){
        alonglist[i]="<div class='MageReceivedSomething'>+"+alonglist[i].substr(1)+"</div>";
	}
//colour crafting
    else if(alonglist[i].match(/(- (\(\d+ times\) )?You call upon your crafting skills.*)<br>/)){
        alonglist[i]="<div class='MageCraft'>"+alonglist[i]+"</div>";
	}
//colour searching
    else if(alonglist[i].match(/(- (\(\d+ times\) )?You search and find nothing.*)<br>/)){
        alonglist[i]="<div class='MageSearchNothing'>"+alonglist[i]+"</div>";
	}
    else if(alonglist[i].match(/(- (\(\d+ times\) )?You search and find a.*)<br>/)){
        alonglist[i]="<div class='MageSearchYay'>+"+alonglist[i].substr(1)+"</div>";
	}
	//Player is healed              You heal yourself and gain 10 hit points
    else if(alonglist[i].match(/(- (\(\d+ times\) )?.*(You heal yourself and|healed you. You) gain \d+ hit point(s)?.*)<br>/)){
        alonglist[i]="<div class='MageHealed'>"+alonglist[i]+"</div>";
	}
}
messages.innerHTML=alonglist.join('');

}

//EOF
})();