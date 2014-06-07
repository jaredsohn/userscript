// ==UserScript==
// @name           CyberPhreaking Smiley List
// @namespace      http://awan-crmx.blogspot.com/
// @description    CyberPhreaking smiley list
// @include        http://www.facebook.com/*
// @include		  http://www.cyberphreaking.com/*
// ==/UserScript==
//
//      CyberPhreaking Smiley v.1.0
//      
//      === Thx to Original coder ===
//      
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.
//
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.
//
//		FoxRiver-CRMX just modify, thx to original coder @pedox.tk 

String.prototype.isPrefixOf = function(str, from){
	if (arguments.length < 2) 
		from = 0;
	else 
		from = parseInt(from);
	
	if (from < 0 || from >= str.length) 
		return false;
	
	if (from + this.length > str.length) 
		return false;
	
	for (var i = 0; i < this.length; i++) 
		if (this.charCodeAt(i) != str.charCodeAt(from + i)) 
			return false;
	
	return true;
}
	
	
	var emoticons = [];

	emoticons[":barca:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/103h82b.gif",
		alt: "CP"
	};
	
	emoticons[":homo:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/11561281571211093466.gif",
		alt: "CP"
	};
	
	emoticons[":("] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/2.gif",
		alt: "CP"
	};
	
	emoticons[":linuxlove:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/avatarjg.gif",
		alt: "CP"
	};
	
	emoticons["(:|"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/37.gif",
		alt: "CP"
	};
	
	emoticons[":-B"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/26.gif",
		alt: "CP"
	};
	
	emoticons[">:)"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/19.gif",
		alt: "CP"
	};
	
	emoticons[":socks:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/socks.gif",
		alt: "CP"
	};
	
	emoticons[";;)"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/5.gif",
		alt: "CP"
	};
	
	emoticons[":-SS"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/42.gif",
		alt: "CP"
	};
	
	emoticons[":kamehame:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/lulz4a.gif",
		alt: "CP"
	};
	
	emoticons[";)"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/3.gif",
		alt: "CP"
	};
	
	emoticons[":cucipiring:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/tukangcuci.gif",
		alt: "CP"
	};
	
	emoticons[":|"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/22.gif",
		alt: "CP"
	};
	
	emoticons[":>"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/15.gif",
		alt: "CP"
	};
	
	emoticons[":-S"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/17.gif",
		alt: "CP"
	};
	
	emoticons[":yesno:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yesno.gif",
		alt: "CP"
	};
	
	emoticons[":lari:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/lari.gif",
		alt: "CP"
	};
	
	emoticons[":gtw:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/106.gif",
		alt: "CP"
	};
	
	emoticons[":rokijo:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/rokijo.gif",
		alt: "CP"
	};
	
	emoticons[":gila:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/crazy.gif",
		alt: "CP"
	};
	
	emoticons[":angeldevil:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/angeldevils.gif",
		alt: "CP"
	};
	
	emoticons[":Nyengir:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/grin.gif",
		alt: "CP"
	};
	emoticons["X_X"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/109.gif",
		alt: "CP"
	};
	
	emoticons[":guling2:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/101423.gif",
		alt: "CP"
	};
	
	emoticons[":metal:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/111.gif",
		alt: "CP"
	};
	
	emoticons[":dihammerin:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/hammer%20pingu.gif",
		alt: "CP"
	};
	
	emoticons[":jejadian:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/girl_werewolf.gif",
		alt: "CP"
	};
	
	emoticons[":bebek:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/bqg.gif",
		alt: "CP"
	};
	
	emoticons[":maho:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/ciuman.gif",
		alt: "CP"
	};
	
	emoticons[":cilu baa:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/ngintip.gif",
		alt: "CP"
	};
	
	emoticons[":ngiler:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/38.gif",
		alt: "CP"
	};
	
	emoticons[":thx:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/thx.png",
		alt: "CP"
	};
	
	emoticons[":Rabbit:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/Kebai_Rabbit0025.gif",
		alt: "CP"
	};
	
	emoticons[":drink:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/drink.gif",
		alt: "CP"
	};
	
	emoticons[":hammer:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/hammer.gif",
		alt: "CP"
	};
	
	emoticons[":mikir:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/105.gif",
		alt: "CP"
	};
	
	emoticons[":obat:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/33.gif",
		alt: "CP"
	};
	
	emoticons[":rame:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/party.gif",
		alt: "CP"
	};
	
	emoticons[":sentil:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/lulz1g.gif",
		alt: "CP"
	};
	
	emoticons[":bye:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/ttt.gif",
		alt: "CP"
	};
	
	emoticons[":pf:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/pf.png",
		alt: "CP"
	};
	
	emoticons[":super fight:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/super%20fight.gif",
		alt: "CP"
	};
	
	emoticons[":putty:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/putty.png",
		alt: "CP"
	};
	
	emoticons[":three:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/three.gif",
		alt: "CP"
	};
	
	emoticons[":2jempol:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/113.gif",
		alt: "CP"
	};
	
	emoticons[":2peace:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/2peace.gif",
		alt: "CP"
	};
	
	emoticons[":-o"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/13.gif",
		alt: "CP"
	};
	
	emoticons[":anget:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/anget.gif",
		alt: "CP"
	};
	
	emoticons[":tsel:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/tsel.png",
		alt: "CP"
	};
	
	emoticons[":tabok2:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/sbox_05.gif",
		alt: "CP"
	};
	
	emoticons[":nasi:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/32.gif",
		alt: "CP"
	};
	
	emoticons[":cuek:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/cuek.gif",
		alt: "CP"
	};
	
	emoticons[":kabur:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/nguber.gif",
		alt: "CP"
	};
	
	emoticons[":joget:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/lock.gif",
		alt: "CP"
	};
	
	emoticons[":maap:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/maapdech2.gif",
		alt: "CP"
	};
	
	emoticons[":sadar wooi:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/sadar%20wooi.gif",
		alt: "CP"
	};
	
	emoticons[":malu:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_blush.gif",
		alt: "CP"
	};
	
	emoticons[":maapdech:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/maapdech.gif",
		alt: "CP"
	};
	
	emoticons[":grp:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/s_sm_cendol.gif",
		alt: "CP"
	};
	
	emoticons[":tampar:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/slap.gif",
		alt: "CP"
	};
	
	emoticons[":dance:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/girl_dance.gif",
		alt: "CP"
	};
	
	emoticons[":cs:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/cs.gif",
		alt: "CP"
	};
	
	emoticons[":cupcup:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/cupcup.gif",
		alt: "CP"
	};
	
	emoticons[":ayam2:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/ayam2.gif",
		alt: "CP"
	};
	
	emoticons[":birbetem:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/birbetem.gif",
		alt: "CP"
	};
	
	emoticons[":proxo:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/proxo.png",
		alt: "CP"
	};
	
	emoticons[":mumet:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/bang.gif",
		alt: "CP"
	};
	
	emoticons["=D>"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_clap.gif",
		alt: "CP"
	};
	
	emoticons[":P"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_tongue.gif",
		alt: "CP"
	};
	
	emoticons[":sensor:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/censored.gif",
		alt: "CP"
	};
	
	emoticons[":beer:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/cheers.gif",
		alt: "CP"
	};
	
	emoticons[":ovpn:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/ovpn.png",
		alt: "CP"
	};
	
	emoticons[":polpp:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/cop.gif",
		alt: "CP"
	};
	
	emoticons[":mentari:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/mentari.png",
		alt: "CP"
	};
	
	emoticons[":cool:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/cool1.gif",
		alt: "CP"
	};
	
	emoticons[":as:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/as.png",
		alt: "CP"
	};
	
	emoticons[":cry:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/cry.gif",
		alt: "CP"
	};
	
	emoticons[":mahoan:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/friends.gif",
		alt: "CP"
	};
	
	emoticons[":musik:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/music.gif",
		alt: "CP"
	};
	
	emoticons[":goodpost:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/goodpost.gif",
		alt: "CP"
	};
	
	emoticons[":santai:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/Kebai_Rabbit0021.gif",
		alt: "CP"
	};
	
	emoticons[":sos:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/help.gif",
		alt: "CP"
	};
	
	emoticons[":doh:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_doh.gif",
		alt: "CP"
	};
	
	emoticons[":bobok:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/lazy.gif",
		alt: "CP"
	};
	
	emoticons[":jitak:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/punish.gif",
		alt: "CP"
	};
	
	emoticons[":wew:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/wew.gif",
		alt: "CP"
	};
	
	emoticons[":xixixi:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/mosking.gif",
		alt: "CP"
	};
	
	emoticons[":love:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_love.gif",
		alt: "CP"
	};
	
	emoticons[":read:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/read.gif",
		alt: "CP"
	};
	
	emoticons[":kretek:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/smoke2.gif",
		alt: "CP"
	};
	
	emoticons[":flexy:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/flexy.png",
		alt: "CP"
	};
	
	emoticons[":sepeda:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/bike2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":amin:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_pray.gif",
		alt: "CP"
	};

	emoticons[":dj:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/dj.gif",
		alt: "CP"
	};
	
	emoticons[":-&"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_sick.gif",
		alt: "CP"
	};
	
	emoticons[":intip:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/emoticon-char-053.gif",
		alt: "CP"
	};
	
	emoticons[":mobil:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/emoticon-transport-003.gif",
		alt: "CP"
	};
	
	emoticons[":striptis:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/bunny.gif",
		alt: "CP"
	};
	
	emoticons[":pm:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/mailboxhappy.gif",
		alt: "CP"
	};
	
	emoticons[":ngacir:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/eekout.gif",
		alt: "CP"
	};
	
	emoticons[":nice:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/nicethread.gif",
		alt: "CP"
	};
	
	emoticons[":spam:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/nospamhere.gif",
		alt: "CP"
	};
	
	emoticons["=))"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_rotfl.gif",
		alt: "CP"
	};
	
	emoticons[":oot:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/offtopic.gif",
		alt: "CP"
	};
	
	emoticons["8-|"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_eyeroll.gif",
		alt: "CP"
	};
	
	emoticons[":d"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/smiley-chores014.gif",
		alt: "CP"
	};
	
	emoticons[":cucu:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/smiley-eatdrink008.gif",
		alt: "CP"
	};
	
	emoticons[":tinju2:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/sportsmiley006.gif",
		alt: "CP"
	};
	
	emoticons[":smart:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/smart.png",
		alt: "CP"
	};
	
	emoticons[":patroli:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/smiley-transport020.gif",
		alt: "CP"
	};
	
	emoticons[":loser:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_loser.gif",
		alt: "CP"
	};
	
	emoticons[":sorry:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/sEm_ImSorry.gif",
		alt: "CP"
	};
	
	emoticons[":jenggot:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_think.gif",
		alt: "CP"
	};
	emoticons[":alaygila:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/1t4xa.gif",
		alt: "CP"
	};
	emoticons[":gboleh:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_shame.gif",
		alt: "CP"
	};
	emoticons[":shutup:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/su1ee.gif",
		alt: "CP"
	};
	emoticons[":right:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/t3744.png",
		alt: "CP"
	};
	emoticons[":good:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/oqpbyevqrqgnhysdq1t9.gif",
		alt: "CP"
	};
	emoticons[":banned:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/ubangoee.gif",
		alt: "CP"
	};
	emoticons[":awas:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/10.gif",
		alt: "CP"
	};
	emoticons[":begadang:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/tired1dd.gif",
		alt: "CP"
	};
	
	emoticons[":stress:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/102.gif",
		alt: "CP"
	}
		
	emoticons[":bisikin:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/whjpwpsuusdcu7wf7zwo.gif",
		alt: "CP"
	}
	
	emoticons[":hmm:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/twizt1.gif",
		alt: "CP"
	}
	
	emoticons[":bwee:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/vfea1ax.gif",
		alt: "CP"
	}
	
	emoticons[":alay:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/alay.gif",
		alt: "CP"
	}
	
	emoticons[":hahaha:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/lmao1g.gif",
		alt: "CP"
	}
	
	emoticons[":what:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/mad34.gif",
		alt: "CP"
	}
	
	emoticons[":panda:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/panda.gif",
		alt: "CP"
	}
	
	emoticons[":jatprem:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/67456810fm3.gif",
		alt: "CP"
	}
	
	emoticons[":omg:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/97177gt.gif",
		alt: "CP"
	}

	emoticons[":closed:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/t1228.gif",
		alt: "CP"
	};
	
	emoticons[":wee:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/na.gif",
		alt: "CP"
	};

	emoticons[":topi:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/wave.gif",
		alt: "CP"
	};
	
	emoticons[":8:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/8.png",
		alt: "CP"
	};

	emoticons[":isep:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/sdgys52.gif",
		alt: "CP"
	};
	
	emoticons[":us:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/ultrasurf.png",
		alt: "CP"
	};

	emoticons[":addictcp:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/addictscp.png",
		alt: "CP"
	};
	
	emoticons[":tuwir:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/elder.gif",
		alt: "CP"
	};
	
	emoticons[":cpbest:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/bestcp.png",
		alt: "CP"
	};
	
	emoticons[":ajis:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/ajis.png",
		alt: "CP"
	};
	
	emoticons[":lovecp:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/lovecp.png",
		alt: "CP"
	};
	
	emoticons[":)"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/smile.gif",
		alt: "CP"
	};
	emoticons[":(("] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_cry.gif",
		alt: "CP"
	};
	emoticons[":rules:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/rulescp.png",
		alt: "CP"
	};
	emoticons[":brp:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/s_sm_batamerah.gif",
		alt: "CP"
	};
	emoticons[":siul:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_whistling.gif",
		alt: "CP"
	};
	emoticons[":hepi:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/hepi.png",
		alt: "CP"
	};
	emoticons[":m3:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/m3.png",
		alt: "CP"
	};
	emoticons[":kura2:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/Kuras_Gila.gif",
		alt: "CP"
	};
	emoticons["B-)"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_sunglas.gif",
		alt: "CP"
	};
	emoticons[":jail:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/jail.gif",
		alt: "CP"
	};
	emoticons["^:)^"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_worship.gif",
		alt: "CP"
	};
	emoticons[":goyang:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/00525.gif",
		alt: "CP"
	};
	emoticons[":tonjok:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_beatup.gif",
		alt: "CP"
	};
	emoticons[":dance2:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_dance.gif",
		alt: "CP"
	};
	emoticons[":surfing:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/surfing.gif",
		alt: "CP"
	};
	emoticons[":3:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/3.png",
		alt: "CP"
	};
	emoticons[":sip:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/msn_thumbup.png",
		alt: "CP"
	};
	emoticons[":rokok:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/msn_cigarette.gif",
		alt: "CP"
	};
	emoticons[":eek:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/eek.gif",
		alt: "CP"
	};
	emoticons[":yihaa:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/hfac.gif",
		alt: "CP"
	};
	emoticons[";))"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_giggle.gif",
		alt: "CP"
	};
	emoticons[":gantung:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/gantung.gif",
		alt: "CP"
	};
	emoticons[":gpass:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/gpass.png",
		alt: "CP"
	};
	emoticons[":angry:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_angry.gif",
		alt: "CP"
	};
	emoticons[":wb:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_huggs.gif",
		alt: "CP"
	};
	emoticons[":esia:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/esia.png",
		alt: "CP"
	};
	emoticons[":-h"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/103.gif",
		alt: "CP"
	};
	emoticons[":idea:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_idea.gif",
		alt: "CP"
	};
	emoticons[":alien:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_alien2.gif",
		alt: "CP"
	};
	emoticons[":poker:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/poker.gif",
		alt: "CP"
	};
	emoticons[":mahoo:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/mahoo.gif",
		alt: "CP"
	};
	emoticons[":tinju:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/tinju.gif",
		alt: "CP"
	};
	emoticons[":kopi:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_coffee.gif",
		alt: "CP"
	};
	emoticons[":sini lo:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/sini%20lo.gif",
		alt: "CP"
	};
	emoticons[":D"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_bigsmile.gif",
		alt: "CP"
	};
	emoticons[":-w"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_waiting.gif",
		alt: "CP"
	};
	emoticons[":suling:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/siul2.gif",
		alt: "CP"
	};
	emoticons[":peace:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_peace.gif",
		alt: "CP"
	};
	emoticons[":xl:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/xl.png",
		alt: "CP"
	};
	emoticons[":FunnyFaceb:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/FunnyFaceb.gif",
		alt: "CP"
	};
	emoticons[":))"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yahoo_laughloud.gif",
		alt: "CP"
	};
	emoticons[":semut:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/semut.gif",
		alt: "CP"
	};
	emoticons[":ular:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/Snake_small.png",
		alt: "CP"
	};
	emoticons[":bebek2:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/Duck_small.png",
		alt: "CP"
	};
	emoticons[":scan:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/scan_port.png",
		alt: "CP"
	};
	emoticons[":mahooo:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/mahojoget.gif",
		alt: "CP"
	};
	emoticons[":pocong:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/pocong2.gif",
		alt: "CP"
	};
	emoticons[":senamjari:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/senamjari2.gif",
		alt: "CP"
	};
	emoticons[":pm3:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/pm3.gif",
		alt: "CP"
	};
	emoticons[":ferrari:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/ferrari-046.gif",
		alt: "CP"
	};
	emoticons[":sholat:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/sholat.gif",
		alt: "CP"
	};
	emoticons[":bday:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/bday.gif",
		alt: "CP"
	};
	emoticons[":cekpm:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/cekpm.gif",
		alt: "CP"
	};
	emoticons[":metmakan:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/metmakan.gif",
		alt: "CP"
	};
	emoticons[":marah:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/marah.gif",
		alt: "CP"
	};
	emoticons[":sakit:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/sakit.gif",
		alt: "CP"
	};
	emoticons[":atut:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/atut.gif",
		alt: "CP"
	};
	emoticons[":tandu:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/tandu.gif",
		alt: "CP"
	};
	emoticons[":banjirbrp:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/bata.gif",
		alt: "CP"
	};
	emoticons[":kebab:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/kebab.gif",
		alt: "CP"
	};
	emoticons[":ngacir2:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/ngacir2.gif",
		alt: "CP"
	};
	emoticons[":rapat:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/rapatdulu.gif",
		alt: "CP"
	};
	emoticons[":kudaan:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/69075554716791911582.gif",
		alt: "CP"
	};
	emoticons[":mancing:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/85570514966963111404.gif",
		alt: "CP"
	};
	emoticons[":baca:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/att5.gif",
		alt: "CP"
	};
	emoticons[":cerewet:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/blah.gif",
		alt: "CP"
	};
	emoticons[":mobilan:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/bsg.gif",
		alt: "CP"
	};
	emoticons[":kupu:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/chase.gif",
		alt: "CP"
	};
	emoticons[":hang:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/computer-18.gif",
		alt: "CP"
	};
	emoticons[":hot:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/daf.gif",
		alt: "CP"
	};
	emoticons[":balon:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/egq1rn.gif",
		alt: "CP"
	};
	emoticons[":ampun:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/emot007.gif",
		alt: "CP"
	};
	emoticons[":game:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/gamer4.gif",
		alt: "CP"
	};
	emoticons[":gol:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/goal.gif",
		alt: "CP"
	};
	emoticons[":deddy:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/heyyouee.gif",
		alt: "CP"
	};
	emoticons[":gay:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/ie2fmg.gif",
		alt: "CP"
	};
	emoticons[":kerja:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/m03104.gif",
		alt: "CP"
	};
	emoticons[":robot:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/mazinger-z.gif",
		alt: "CP"
	};
	emoticons[":perkosa:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/mn96.gif",
		alt: "CP"
	};
	emoticons[":pagi:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/mornindd.gif",
		alt: "CP"
	};
	emoticons[":karate:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/p1023.gif",
		alt: "CP"
	};
	emoticons[":barbel:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/sCh_weightlifter2.gif",
		alt: "CP"
	};
	emoticons[":$:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/sdsd.gif",
		alt: "CP"
	};
	emoticons[":sosis:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/smiley2000.gif",
		alt: "CP"
	};
	emoticons[":coding:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/smiley3773.gif",
		alt: "CP"
	};
	emoticons[":barbeque:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/smiley4420.gif",
		alt: "CP"
	};
	emoticons[":telat:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/ulat.gif",
		alt: "CP"
	};
	emoticons[":lonceng:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/winnersmiley.gif",
		alt: "CP"
	};
	emoticons[":malam:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/y_pull_haivfdr201.gif",
		alt: "CP"
	};
	emoticons[":ompong:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/y_toothless_smile1.gif",
		alt: "CP"
	};
	emoticons[":mahogas:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/mahoolpg.gif",
		alt: "CP"
	};
	emoticons[":mumet2:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/414485.gif",
		alt: "CP"
	};
	emoticons[":pm2:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/PEDANGMERAH.png",
		alt: "CP"
	};
	emoticons[":minta:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/blindmonkey_md_wht.gif",
		alt: "CP"
	};
	emoticons[":jilat:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/smilie-gross.gif",
		alt: "CP"
	};
	emoticons[":punk:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/punk_gila.jpg",
		alt: "CP"
	};
	emoticons[":senang:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/6.gif",
		alt: "CP"
	};
	emoticons[":adji:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/puyeng.gif",
		alt: "CP"
	};
	emoticons[":gitar:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/gitaris_gila.jpg",
		alt: "CP"
	};
	emoticons["+x+"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/x2.gif",
		alt: "CP"
	};
        emoticons[":yes:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/sbox_08.gif",
		alt: "CP"
	};
        emoticons[":ultah:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/t9baf.gif",
		alt: "CP"
	};
        emoticons[":kimpoi:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/t5516.gif",
		alt: "CP"
	};
        emoticons[":hore:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/yoci125.gif",
		alt: "CP"
	};
        emoticons["[sepi]"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/kok_sepi_sih.gif",
		alt: "CP"
	};
        emoticons[":kisbai:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/smilie-gross_309.gif",
		alt: "CP"
	};
        emoticons[":wee2:"] = {
		src: "http://www.cyberphreaking.com/Smileys/CP/smilie-gross_324.gif",
		alt: "CP"
	};
var emotxt = [];
var yemo = [];
var c;
for (var emo in emoticons) 
	if (!(emoticons[emo] instanceof Function)) {
		c = emo.charCodeAt(0);
		if (!yemo[c]) 
			yemo[c] = [];
		
		yemo[c].push({
			emoticon: emo,
			src: emoticons[emo].src
		});
	}
	
function f(o1, o2){
	if (o1.emoticon.isPrefixOf(o2.emoticon)) 
		return 1;
	
	if (o1.emoticon > o2.emoticon) 
		return 1;
	
	if (o1.emoticon < o2.emoticon) 
		return -1;
	
	return 0;
}
var i;	
for (i = 0; i < yemo.length; i++) 
	if (yemo[i]) 
		yemo[i].sort(f);
	
function replaceTextNode(textNode, sortedEmoticonSet)
{
	var content = textNode.textContent;
	var currentStopPosition;
	var i, j;
	var firstChar;
	var found = false;
	var htmls = [];
	var img;
	currentStopPosition = i = 0;
	while (i < content.length) {
		firstChar = content.charCodeAt(i);
		if (sortedEmoticonSet[firstChar]) 
			for (j = 0; j < sortedEmoticonSet[firstChar].length; j++) 
				if (sortedEmoticonSet[firstChar][j].emoticon.length && sortedEmoticonSet[firstChar][j].emoticon.isPrefixOf(content, i)) {
					if (currentStopPosition < i) 
						htmls.push(document.createTextNode(content.substr(currentStopPosition, i - currentStopPosition)))
					
					img = document.createElement('img');
					img.src = sortedEmoticonSet[firstChar][j].src;
					img.title = sortedEmoticonSet[firstChar][j].emoticon;
					htmls.push(img);
					
					
					i += sortedEmoticonSet[firstChar][j].emoticon.length;
					currentStopPosition = i;
					found = true;
					break;
				}
		
		if (found) {
			found = false;
			continue;
		}
		i++;
	}
	
	if(currentStopPosition>0&&currentStopPosition<content.length-1)
		htmls.push(document.createTextNode(content.substr(currentStopPosition)));
	
	var span=null;
	if (htmls.length) {
		span=document.createElement('span');
		for (i = 0; i < htmls.length; i++) 
			span.appendChild(htmls[i]);
	}
	return span;
}

function replaceElement(element, emos){
	var pathResult = document.evaluate(".//text()", element, null, 7, null);
	
	for (i = 0; i < pathResult.snapshotLength; i++) {
		var tNode = pathResult.snapshotItem(i);
		if (tNode.parentNode) {
			var span = replaceTextNode(tNode, emos);
			if (span) 
				tNode.parentNode.replaceChild(span, tNode);
		}
	}
}