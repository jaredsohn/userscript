// ==UserScript==
// @name	Glassy Smiles by Dhawal
// @version	2.5
// @author	Dhawal Agarwal
// @namespace	TEAM BLAKUT
// @description	Use Animated smileys in your ScrapBook and HTML community Forums. Just click on a smiley to insert.
// @include        http://*.orkut.*/CommMsgPost*
// @include        http://*.orkut.*/CommMsgs*
// @include        http://www.orkut.*/Scrapbook*
// ==/UserScript==

/**********************************************************************************************************************************************************

***********************************************************************************************************************************************************/


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();	
	smileyarr["zipped"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZQJevfDI/AAAAAAAAAiM/h8z3Z0MnQdU/zipped.gif";
smileyarr["yep"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZQmJUDTI/AAAAAAAAAiQ/phvlmeVDyE0/yep.gif";
smileyarr["woops"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZRI2Ke8I/AAAAAAAAAiU/G76hfga-JNQ/woops.gif";
smileyarr["wink"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZRraOJ3I/AAAAAAAAAiY/xIa9LWSKtTs/wink.gif";
smileyarr["what"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZSF_67AI/AAAAAAAAAic/eCGYPKTjDvs/what.gif";
smileyarr["ugly_laught"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZSpfJUuI/AAAAAAAAAig/TguCMwDfJIE/ugly_laught.gif";
smileyarr["tongue"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZTPvey5I/AAAAAAAAAik/360RzFW2hHc/tongue.gif";
smileyarr["thinking"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZTl9OfmI/AAAAAAAAAio/eiWA-XeYFMM/thinking.gif";
smileyarr["think"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZUFgUpVI/AAAAAAAAAis/0ZIbhKKeQ0Y/think.gif";
smileyarr["smile"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZUlNXnDI/AAAAAAAAAiw/T0qcQgEW9Ug/smile.gif";
smileyarr["sleeping"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZU0ZSRhI/AAAAAAAAAi0/O4gdkGqfPl4/sleeping.gif";
smileyarr["singing"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZVNiOUaI/AAAAAAAAAi4/7DuGH262jOI/singing.gif";
smileyarr["sick_eyed"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZViYUj8I/AAAAAAAAAi8/-02P5UK2IvA/sick_eyed.gif";
smileyarr["sick"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZWO93zpI/AAAAAAAAAjA/CLNgVCQn6QM/sick.gif";
smileyarr["shy"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZW8GykYI/AAAAAAAAAjE/p9w1luVgETQ/shy.gif";
smileyarr["shh"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZXU-6ZPI/AAAAAAAAAjI/Ue5jGB3l4Ms/shh.gif";
smileyarr["sad_3"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZX4zMR1I/AAAAAAAAAjM/iJF17C9sfVs/sad_3.gif";
smileyarr["sad_2"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZYFTmQFI/AAAAAAAAAjQ/ZMxFhP9SSpg/sad_2.gif";
smileyarr["sad_1"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZYnHVkmI/AAAAAAAAAjU/YXef2ua5ckA/sad_1.gif";
smileyarr["prof"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZZI7bwVI/AAAAAAAAAjY/DW-v9LapaVg/prof.gif";
smileyarr["pray"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZZ86_WJI/AAAAAAAAAjc/OrgwigRSBz0/pray.gif";
smileyarr["playboy"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZaZz7C_I/AAAAAAAAAjg/GhURYhAOwlA/playboy.gif";
smileyarr["okej"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZa7RJbVI/AAAAAAAAAjk/_GatKcXpgAQ/okej.gif";
smileyarr["oh_yeh"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZbXiad0I/AAAAAAAAAjo/13FG3mOBt_A/oh_yeh.gif";
smileyarr["no_clue"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZbmAHLTI/AAAAAAAAAjs/lb72JUBn7iE/no_clue.gif";
smileyarr["no"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZcN6FIJI/AAAAAAAAAjw/M9GpwcL_k5k/no.gif";
smileyarr["nerd_smile"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZc7PuLbI/AAAAAAAAAj0/VxNFAld7nJo/nerd_smile.gif";
smileyarr["nerd"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZdXnAWvI/AAAAAAAAAj4/U_E0x_Sio5g/nerd.gif";
smileyarr["muscle_boy"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZd9_cq8I/AAAAAAAAAj8/V7-xpzIVU3g/muscle_boy.gif";
smileyarr["mad"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZeFOr0hI/AAAAAAAAAkA/Tr6r6iP-0S8/mad.gif";
smileyarr["loser"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZe6vsEPI/AAAAAAAAAkE/0oBrSlf7kFY/loser.gif";
smileyarr["laught"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZfQyrKCI/AAAAAAAAAkI/K1Jhc0ECvdE/laught.gif";
smileyarr["in_love"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZfxdw2eI/AAAAAAAAAkM/BhuL1M2aNOM/in_love.gif";
smileyarr["idea"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZgV4NJtI/AAAAAAAAAkQ/fULtFTJkoB8/idea.gif";
smileyarr["icon_what"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZgjUGOmI/AAAAAAAAAkU/bU8TaRJJp4Y/icon_what.gif";
smileyarr["icon_weather"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZhHnNrgI/AAAAAAAAAkY/q2WIddXWAlc/icon_weather.gif";
smileyarr["icon_talk"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZhUEHnmI/AAAAAAAAAkc/K7oMnTNcAWA/icon_talk.gif";
smileyarr["icon_sick_computer"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZhpJgRXI/AAAAAAAAAkg/5wKD_MyYrRQ/icon_sick_computer.gif";
smileyarr["icon_search"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZiH61NoI/AAAAAAAAAkk/WWg2XV58J18/icon_search.gif";
smileyarr["icon_megafone"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZiRak9nI/AAAAAAAAAko/u-72-daHJ1c/icon_megafone.gif";
smileyarr["icon_love"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZisSplvI/AAAAAAAAAks/ZxjpMjH1_MY/icon_love.gif";
smileyarr["icon_joker"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZjItZ58I/AAAAAAAAAkw/GPruJJ5Kz0k/icon_joker.gif";
smileyarr["icon_computer"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZjZxjqII/AAAAAAAAAk0/JIxyNL_Wc5M/icon_computer.gif";
smileyarr["i_like_you"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZj56s_PI/AAAAAAAAAk4/nlfCHv4Oa2k/i_like_you.gif";
smileyarr["hurray"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZkHKQsoI/AAAAAAAAAk8/n2kRlLNGkQI/hurray.gif";
smileyarr["huh"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZk9W5tJI/AAAAAAAAAlA/hhWuXAq6PLc/huh.gif";
smileyarr["hide"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZlFBqNBI/AAAAAAAAAlE/74Dfq-ePUE0/hide.gif";
smileyarr["handy"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZlwipuvI/AAAAAAAAAlI/nIGptHNKr28/handy.gif";
smileyarr["halt"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZmKQEeRI/AAAAAAAAAlM/ABH3JWWGxGs/halt.gif";
smileyarr["girl"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZmjIOs6I/AAAAAAAAAlQ/aRsQoQhd9rA/girl.gif";
smileyarr["eyes"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZnLn-yaI/AAAAAAAAAlU/johAyyPXMt4/eyes.gif";
smileyarr["ew"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZnxbAmeI/AAAAAAAAAlY/fS97riTDHvk/ew.gif";
smileyarr["evil_mad"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZofbDMGI/AAAAAAAAAlc/4LQmQYnG87A/evil_mad.gif";
smileyarr["evil_laught"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZo4Y9SkI/AAAAAAAAAlg/o7ADQmMj3NA/evil_laught.gif";
smileyarr["evil_f_you"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZpLEi2_I/AAAAAAAAAlk/8wnxyXXdD_Q/evil_f_you.gif";
smileyarr["evil_ass"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZpZmJo1I/AAAAAAAAAlo/BTvtsPX6Q5s/evil_ass.gif";
smileyarr["evil_angry"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZp938JLI/AAAAAAAAAls/LeaZh1xNgGI/evil_angry.gif";
smileyarr["elvis"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZqV6HCbI/AAAAAAAAAlw/P7HNdViQXKY/elvis.gif";
smileyarr["eating_loads"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZrFX5kfI/AAAAAAAAAl0/JAJCgZIRaCk/eating_loads.gif";
smileyarr["death"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZrndGmDI/AAAAAAAAAl4/VO61KME4ID8/death.gif";
smileyarr["crying_on_floor"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZsOEBwxI/AAAAAAAAAl8/DOCqSivouik/crying_on_floor.gif";
smileyarr["crying_loads"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZsnOq7AI/AAAAAAAAAmA/p4UT26LCO2E/crying_loads.gif";
smileyarr["crying_laughter"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZtU-5YRI/AAAAAAAAAmE/_C1315EHmho/crying_laughter.gif";
smileyarr["crying"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZtg6xDlI/AAAAAAAAAmI/DxYZj1YBYSk/crying.gif";
smileyarr["Copy of zipped"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZuWWQRyI/AAAAAAAAAmM/ffAaCovvTGU/Copy%20of%20zipped.gif";
smileyarr["Copy of yep"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZu6mVEKI/AAAAAAAAAmQ/zccM9CnaIwk/Copy%20of%20yep.gif";
smileyarr["Copy of anti"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZvOp-PZI/AAAAAAAAAmU/80cUuc6Cp-0/Copy%20of%20anti.gif";
smileyarr["Copy of angel"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZvkRlUZI/AAAAAAAAAmY/gpDT9pTRpv8/Copy%20of%20angel.gif";
smileyarr["Copy of alien"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZv7nTT8I/AAAAAAAAAmc/_BwEb4q_9Ow/Copy%20of%20alien.gif";
smileyarr["cool"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZwb6VJkI/AAAAAAAAAmg/RaX9ai86bmQ/cool.gif";
smileyarr["coffee"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZw0U228I/AAAAAAAAAmk/wDZBJF0hoxs/coffee.gif";
smileyarr["coctail"]="http://lh4.ggpht.com/_Nhh98Ix90W8/SccZxX3nRkI/AAAAAAAAAmo/jGBIG7uUQLg/coctail.gif";
smileyarr["clown"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZxrKPfnI/AAAAAAAAAms/RPdBOlCF5Ao/clown.gif";
smileyarr["chips"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZyPorfdI/AAAAAAAAAmw/FBrLQcUNFu4/chips.gif";
smileyarr["army"]="http://lh3.ggpht.com/_Nhh98Ix90W8/SccZycCy3BI/AAAAAAAAAm0/YzzjTFdUzwE/army.gif";
smileyarr["anti"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZy-FjHkI/AAAAAAAAAm4/k_RSiWfEupE/anti.gif";
smileyarr["angel"]="http://lh5.ggpht.com/_Nhh98Ix90W8/SccZzXKMfGI/AAAAAAAAAm8/c9Yh1z_sS9g/angel.gif";
smileyarr["alien"]="http://lh6.ggpht.com/_Nhh98Ix90W8/SccZznjsCdI/AAAAAAAAAnA/pvm7ulbRqRg/alien.gif";
	
	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

//~~Happy Orkutting~~
