// ==UserScript==
// @name          Rabbit Tuzki Smileys (By-HB)
// @namespace     http://www.orkut.co.in/Main#Profile?uid=563787369546797333
// @author	HB
// @description   Made this just for fun :D (please respect the creator of this smiley)..
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

/********************************************************
//smileys appear below the reply box as well.
//Made the smileys just for fun and thought to share with you all..!!
*********************************************************/

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
	smileyarr["Appetit_9"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wXCugJCwI/AAAAAAAAADA/Lpy9rKJRHOc/abra_kazam.gif";
smileyarr["Appetit_8"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wXCwwIYPI/AAAAAAAAADE/EH-L6kB5240/at_your_service.gif";
smileyarr["Appetit_7"]="http://lh5.ggpht.com/_42J4KumwbR8/S3wXCyVtR5I/AAAAAAAAADI/nmBkBUxqEx8/bed_time.gif";
smileyarr["Appetit_6"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wXC8QcLjI/AAAAAAAAADM/Pfgue5ia7v8/bugers.gif";
smileyarr["Appetit_5"]="http://lh5.ggpht.com/_42J4KumwbR8/S3wXDI1EXCI/AAAAAAAAADQ/ebPP1RfH7FY/busy_eating.gif";
smileyarr["Appetit_46"]="http://lh5.ggpht.com/_42J4KumwbR8/S3wZPn4SoYI/AAAAAAAAADg/f7eG1ReS48k/bye_bye.gif";
smileyarr["Appetit_45"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wZP2T09cI/AAAAAAAAADk/LSMHAMUlQwA/cant_escape.gif";
smileyarr["Appetit_44"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wZQPLfu2I/AAAAAAAAADo/sHGymR7aKLk/coming_through.gif";
smileyarr["Appetit_43"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wZQVcCCKI/AAAAAAAAADs/sg9NNTMJXJM/cool_dance.gif";
smileyarr["Appetit_42"]="http://lh6.ggpht.com/_42J4KumwbR8/S3wZQ3-KawI/AAAAAAAAADw/iz-M3ir6-5E/crawling.gif";
smileyarr["Appetit_41"]="http://lh3.ggpht.com/_42J4KumwbR8/S3wZYTId9dI/AAAAAAAAAD0/krZFrpc2jpI/cry.gif";
smileyarr["Appetit_40"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wZYmGJLmI/AAAAAAAAAD4/1hbXAo9ux8M/dance_left.gif";
smileyarr["Appetit_4"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wZY18cDEI/AAAAAAAAAD8/GpwndJl4ISw/dance_right.gif";
smileyarr["Appetit_39"]="http://lh3.ggpht.com/_42J4KumwbR8/S3wZZOVSEJI/AAAAAAAAAEA/2al3s7fnM2U/dizzy.gif";
smileyarr["Appetit_38"]="http://lh3.ggpht.com/_42J4KumwbR8/S3wZZYdtORI/AAAAAAAAAEE/TDeOKpda3WE/dont_touch.gif";
smileyarr["Appetit_37"]="http://lh5.ggpht.com/_42J4KumwbR8/S3wZvnTm6YI/AAAAAAAAAEI/3TLOIjTZpIQ/drowsy.gif";
smileyarr["Appetit_36"]="http://lh3.ggpht.com/_42J4KumwbR8/S3wZv-bzGyI/AAAAAAAAAEM/82SW8FjRPJo/dunno.gif";
smileyarr["Appetit_35"]="http://lh3.ggpht.com/_42J4KumwbR8/S3wZwH1CYsI/AAAAAAAAAEQ/iJ1INeHBptE/ear_poke.gif";
smileyarr["Appetit_34"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wZwa8yuiI/AAAAAAAAAEU/1EqEn2VEymE/eating_shish_kabobs.gif";
smileyarr["Appetit_33"]="http://lh3.ggpht.com/_42J4KumwbR8/S3wZwdeB3AI/AAAAAAAAAEY/askt4Jd-Qg0/floaty.gif";
smileyarr["Appetit_32"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wZ2UVinvI/AAAAAAAAAEc/4GUvesJNWLE/get_me_out.gif";
smileyarr["Appetit_31"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wZ2XUervI/AAAAAAAAAEg/rTRPAPv4k4U/get_out.gif";
smileyarr["Appetit_30"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wZ2xL8K0I/AAAAAAAAAEk/S1aG51Ye1Mk/go_stars_go.gif";
smileyarr["Appetit_3"]="http://lh5.ggpht.com/_42J4KumwbR8/S3wZ20v9t8I/AAAAAAAAAEo/JRHTyTIsQXo/happy.gif";
smileyarr["Appetit_29"]="http://lh3.ggpht.com/_42J4KumwbR8/S3wZ3P7aTkI/AAAAAAAAAEs/A-nEjFRwLHQ/headbutt.gif";
smileyarr["Appetit_28"]="http://lh6.ggpht.com/_42J4KumwbR8/S3waEhFbICI/AAAAAAAAAEw/dYb68ARP8s0/hehehe.gif";
smileyarr["Appetit_27"]="http://lh5.ggpht.com/_42J4KumwbR8/S3waEuS23II/AAAAAAAAAE0/ScNkpdyaMXw/hit_and_run.gif";
smileyarr["Appetit_26"]="http://lh3.ggpht.com/_42J4KumwbR8/S3waE5JvYmI/AAAAAAAAAE4/G1hkALl5P3I/horizon_check.gif";
smileyarr["Appetit_25"]="http://lh5.ggpht.com/_42J4KumwbR8/S3waFAiUqFI/AAAAAAAAAE8/coWLNc3gbOY/hot_kiss.gif";
smileyarr["Appetit_24"]="http://lh5.ggpht.com/_42J4KumwbR8/S3waFNqc9vI/AAAAAAAAAFA/OI08EeluPHc/hug.gif";
smileyarr["Appetit_23"]="http://lh5.ggpht.com/_42J4KumwbR8/S3waJ_gpFFI/AAAAAAAAAFE/ZQ43p-brIL0/hula_dance.gif";
smileyarr["Appetit_22"]="http://lh5.ggpht.com/_42J4KumwbR8/S3waKNjw2oI/AAAAAAAAAFI/oNpeFodRwQg/hypno_dance.gif";
smileyarr["Appetit_21"]="http://lh5.ggpht.com/_42J4KumwbR8/S3waKboHDDI/AAAAAAAAAFM/EUFxpf-gyJU/knife_dodge.gif";
smileyarr["Appetit_20"]="http://lh5.ggpht.com/_42J4KumwbR8/S3waKZtfsNI/AAAAAAAAAFQ/FwEKE4B7qs8/let_me_at_it.gif";
smileyarr["Appetit_2"]="http://lh4.ggpht.com/_42J4KumwbR8/S3waKvONkVI/AAAAAAAAAFU/2HFBTAoglMM/listening_to_music.gif";
smileyarr["Appetit_19"]="http://lh3.ggpht.com/_42J4KumwbR8/S3waPu4Me5I/AAAAAAAAAFY/Ylh5bqMQDns/lonely_star.gif";
smileyarr["Appetit_18"]="http://lh6.ggpht.com/_42J4KumwbR8/S3waP8UeEaI/AAAAAAAAAFc/VRTFkX1i8XE/milk_hug.gif";
smileyarr["Appetit_17"]="http://lh5.ggpht.com/_42J4KumwbR8/S3waP8CBT2I/AAAAAAAAAFg/1uGqeVN7y1M/more_music.gif";
smileyarr["Appetit_16"]="http://lh3.ggpht.com/_42J4KumwbR8/S3waQJNGxAI/AAAAAAAAAFk/3NyjpJmdb1Y/multicultural_dance.gif";
smileyarr["Appetit_15"]="http://lh5.ggpht.com/_42J4KumwbR8/S3waQQd_yUI/AAAAAAAAAFo/d8K_cy93t6o/nightmare.gif";
smileyarr["Appetit_14"]="http://lh3.ggpht.com/_42J4KumwbR8/S3waXFHK-AI/AAAAAAAAAFs/riLQI67lMjA/no_good.gif";
smileyarr["Appetit_13"]="http://lh6.ggpht.com/_42J4KumwbR8/S3waXYPIQ0I/AAAAAAAAAFw/_hdKhHslh7k/OMG.gif";
smileyarr["Appetit_12"]="http://lh5.ggpht.com/_42J4KumwbR8/S3waXkFqjGI/AAAAAAAAAF0/rutJz7YcoHs/self_blinding.gif";
smileyarr["Appetit_11"]="http://lh5.ggpht.com/_42J4KumwbR8/S3waXiIGg2I/AAAAAAAAAF4/UYA2CzJZ2c4/skipping.gif";
smileyarr["Appetit_10"]="http://lh4.ggpht.com/_42J4KumwbR8/S3waXsEFuAI/AAAAAAAAAF8/LBnwNhjgNVQ/skippy.gif";
smileyarr["Appetit_1"]="http://lh3.ggpht.com/_42J4KumwbR8/S3waeBJqzFI/AAAAAAAAAGA/OrbS5WaK4u8/stab.gif";
smileyarr["Appetit"]="http://lh6.ggpht.com/_42J4KumwbR8/S3waeeYcYAI/AAAAAAAAAGE/xIT53oIAJIY/stay_awake.gif";
smileyarr["Appetit_47"]="http://lh3.ggpht.com/_42J4KumwbR8/S3waef5x7zI/AAAAAAAAAGI/ZvJtQIuUoyw/stretchy_arms.gif";
smileyarr["Appetit_48"]="http://lh4.ggpht.com/_42J4KumwbR8/S3waeg41StI/AAAAAAAAAGM/VxN5K9WUTGQ/sweat.gif";
smileyarr["Appetit_49"]="http://lh6.ggpht.com/_42J4KumwbR8/S3waeh_XMNI/AAAAAAAAAGQ/yv2xg56BggE/tai_chi.gif";
smileyarr["Appetit_50"]="http://lh3.ggpht.com/_42J4KumwbR8/S3waksP03WI/AAAAAAAAAGU/bAOmKEfvR_g/thinking_of_you.gif";
smileyarr["Appetit_51"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wakgWBLPI/AAAAAAAAAGY/1rJZ3DKI3uc/too_much.gif";
smileyarr["Appetit_52"]="http://lh6.ggpht.com/_42J4KumwbR8/S3wakvA_JhI/AAAAAAAAAGc/JkG-Yh89X94/trapped.gif";
smileyarr["Appetit_53"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wak_0ggSI/AAAAAAAAAGg/el4CjFWPIsE/tuzki_bad_mood.gif";
smileyarr["Appetit_54"]="http://lh5.ggpht.com/_42J4KumwbR8/S3wak7g5txI/AAAAAAAAAGk/WZVuBwPvqsc/tuzki_balerina.gif";
smileyarr["Appetit_55"]="http://lh5.ggpht.com/_42J4KumwbR8/S3waq5T1dzI/AAAAAAAAAGo/MXsJEJU5Skc/tuzki_in_jail.gif";
smileyarr["Appetit_56"]="http://lh3.ggpht.com/_42J4KumwbR8/S3warD7yDfI/AAAAAAAAAGs/LXMKxiaQ3SY/tuzki_patpat_dance.gif";
smileyarr["Appetit_57"]="http://lh4.ggpht.com/_42J4KumwbR8/S3warYM2MbI/AAAAAAAAAGw/WriCNvTsNZE/tuzki_rescue.gif";
smileyarr["Appetit_58"]="http://lh5.ggpht.com/_42J4KumwbR8/S3warbGjCqI/AAAAAAAAAG0/_RZCnpSCRfw/tuzkiman.gif";
smileyarr["Appetit_59"]="http://lh3.ggpht.com/_42J4KumwbR8/S3warmBsP1I/AAAAAAAAAG4/caIQBsp67lc/wake_up.gif";
smileyarr["Appetit_60"]="http://lh3.ggpht.com/_42J4KumwbR8/S3wawglwozI/AAAAAAAAAG8/33ljZ7GbXks/weird_dance.gif";
smileyarr["Appetit_61"]="http://lh4.ggpht.com/_42J4KumwbR8/S3wawyLUdLI/AAAAAAAAAHA/YpoilG1T-X4/whatever.gif";
smileyarr["Appetit_62"]="http://lh6.ggpht.com/_42J4KumwbR8/S3waxANx0MI/AAAAAAAAAHE/G6Opqm9lyek/why.gif";
smileyarr["Appetit_63"]="http://lh3.ggpht.com/_42J4KumwbR8/S3waxPXWsLI/AAAAAAAAAHI/o-vOw1LFaTM/wooot.gif";
smileyarr["Appetit_64"]="http://lh3.ggpht.com/_42J4KumwbR8/S3waxbfddWI/AAAAAAAAAHM/krKlrNDqOvQ/WTF.gif";
smileyarr["Appetit_65"]="http://lh5.ggpht.com/_42J4KumwbR8/S3wa04jRsxI/AAAAAAAAAHQ/MwNUQwe2CX4/yesss.gif";
smileyarr["Appetit_66"]="http://lh5.ggpht.com/_42J4KumwbR8/S3wa0x9h-WI/AAAAAAAAAHU/p2fxNV8C9Ds/you_cant_have_it.gif";


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

// HB's script