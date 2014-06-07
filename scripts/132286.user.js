// ==UserScript==
// @name           sokpinter KL Smiley Script V.3.0.0
// @namespace      http://julianto.co.tv
// @description    The 2nd For Script UserJS
// @include        http://www.facebook.com/*
// @include		   http://julianto.co.tv/*
// ==/UserScript==
//
//      Clubbing Kapanlagi Emoticons Updated Relased
//      
//      Copyright 2011-2012 sokpinter <sokpinter@ovi.com>

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
	emoticons[":sokpinter:"] = {
		src: "http://sokpinter.com/sopi.gif",
		alt: "sokpinter"
	};
	emoticons[":tank:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/tank.gif",
		alt: "tank"
	};
	emoticons[":jetf4:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/jetf4.gif",
		alt: "jetf4"
	};
	emoticons[":ajeb2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ajeb2.gif",
		alt: "ajeb2"
	};
	emoticons[":zombiegal:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/zombiegal.gif",
		alt: "zombiegal"
	};
	emoticons[":zombie2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/zombie2.gif",
		alt: "zombie2"
	};
	emoticons[":zombie1:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/zombie1.gif",
		alt: "zombie1"
	};
	emoticons[":tankfire:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/tankfire.gif",
		alt: "tankfire"
	};
	emoticons[":miku:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/miku.gif",
		alt: "Miku"
	};
	
	emoticons[":terrypawaa:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/powerwave.gif",
		alt: "Pawaa Wavee!!"
	};
	
	emoticons[":maiyes:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/maiyes.gif",
		alt: "yatta"
	};
	
	emoticons[":kyonono:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/kyononono.gif",
		alt: "NO NO No!"
	};

	emoticons[":sunny:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/sunflower.gif",
		alt: "Sunny"
	};

	emoticons[":bunny:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/bunny.gif",
		alt: "Bunny"
	};
	
	emoticons[":joerun:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/joerun.gif",
		alt: ".......!!"
	};
	

	emoticons[":kwek:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/kwek.gif",
		alt: ".......!!"
	};

	emoticons[":ioringakak:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ioringakak.gif",
		alt: "GYA HA HA HA HA!!"
	};
	
	emoticons[":dongdance:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/dumbdance.gif",
		alt: "yay! yay! yay!"
	};
	
	emoticons[":okami:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/chibiterasu.gif",
		alt: "woof...woof!"
	};
	
	emoticons[":okamiwait:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/okami_wait.gif",
		alt: "waiting..."
	};
	
	emoticons[":supersaiyan:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/supergoku.gif",
		alt: "HEAAAAAAA!!"
	};

	emoticons[":mikusleep:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/mikusleeep.gif",
		alt: "oyasumi..."
	};
	
	emoticons[":mikusing:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/miku-sing.gif",
		alt: "mikusing"
	};
	
	emoticons[":guys:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/guys3.gif",
		alt: "guys"
	};

	emoticons[":takut:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/takut.gif",
		alt: "takut"
	};
	
	emoticons[":tat2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/TAT2.gif",
		alt: "tat2"
	};
	
	emoticons[":triping:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/wawa2.gif",
		alt: "triping"
	};
	
	emoticons[":shiver:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/shiver.gif",
		alt: "shiver"
	};
	
	emoticons[":away:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/away.gif",
		alt: "away"
	};
	
	emoticons[":bye bye:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/mite.gif",
		alt: "sokpinter"
	};
	
	emoticons[":sweat:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/sweat.gif",
		alt: "sokpinter"
	};
	
	emoticons[":border:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/border.gif",
		alt: "sokpinter"
	};
	
	emoticons[":atsui:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/atsui.gif",
		alt: "sokpinter"
	};
	
	emoticons[":blood:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/blood.gif",
		alt: "sokpinter"
	};
	
	emoticons[":good:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/good.gif",
		alt: "sokpinter"
	};
	
	emoticons[":stress:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/stress.gif",
		alt: "sokpinter"
	};
	emoticons[":blink:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/blink.gif",
		alt: "sokpinter"
	};
	
	emoticons[":are:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/are.gif",
		alt: "sokpinter"
	};
	
	emoticons[":yellow:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/yellowc.gif",
		alt: "sokpinter"
	};
	
	emoticons[":deff:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/deff.gif",
		alt: "sokpinter"
	};
	
	emoticons[":give:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/give.gif",
		alt: "sokpinter"
	};
	
	emoticons[":shout:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/shout.gif",
		alt: "sokpinter"
	};
	
	emoticons[":bfft:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/bfft.gif",
		alt: "sokpinter"
	};
	
	emoticons[":araara:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/araara.gif",
		alt: "sokpinter"
	};
	
	emoticons[":depresed:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/depresed.gif",
		alt: "sokpinter"
	};
	
	emoticons[":gg:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/gg.gif",
		alt: "sokpinter"
	};
	
	emoticons[":shine:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/shine.gif",
		alt: "sokpinter"
	};
	
	emoticons[":ngambek:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/iiyada.gif",
		alt: "sokpinter"
	};
	
	emoticons[":yatta:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/yatta.gif",
		alt: "sokpinter"
	};
	
	emoticons[":dry:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/dry.gif",
		alt: "sokpinter"
	};
	
	emoticons[":hehehe:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ehehehehehe.gif",
		alt: "sokpinter"
	};
	
	emoticons[":rain:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/rain.gif",
		alt: "sokpinter"
	};
	
	emoticons[":ai:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ai.gif",
		alt: "sokpinter"
	};
	
	emoticons[":he:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/he.gif",
		alt: "sokpinter"
	};
	
	emoticons[":dizzy:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/dizzy.gif",
		alt: "sokpinter"
	};
	
	emoticons[":hipnotis:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/hypnotic.gif",
		alt: "sokpinter"
	};
	
	emoticons[":barf:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/barf.gif",
		alt: "sokpinter"
	};
	
	emoticons[":ack:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ack.gif",
		alt: "sokpinter"
	};
	
	emoticons[":sini:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/knife.gif",
		alt: "sokpinter"
	};
	
	emoticons[":shimata:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/shimata.gif",
		alt: "sokpinter"
	};
	
	emoticons[":dead:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/dead.gif",
		alt: "sokpinter"
	};
	
	emoticons[":punch:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/punch.gif",
		alt: "sokpinter"
	};
	
	emoticons[":hai:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/hi.gif",
		alt: "sokpinter"
	};
	
	emoticons[":2good:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/2good.gif",
		alt: "sokpinter"
	};
	
	emoticons[":ting:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ting.gif",
		alt: "sokpinter"
	};
	
	emoticons[":ngupil:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/nosepick.gif",
		alt: "sokpinter"
	};
	
	emoticons[":red card:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/redc.gif",
		alt: "sokpinter"
	};
	
	emoticons[":hope:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/hope.gif",
		alt: "sokpinter"
	};
	
	emoticons[":ancur2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/swell.gif",
		alt: "sokpinter"
	};
	
	emoticons[":courage:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/courage.gif",
		alt: "sokpinter"
	};
	
	emoticons[":onfire:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/onfire.gif",
		alt: "sokpinter"
	};
	
	emoticons[":kenyang:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/full.gif",
		alt: "sokpinter"
	};
	
	emoticons[":swt:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/swt.gif",
		alt: "sokpinter"
	};
	
	emoticons[":huaaa:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/huaa.gif",
		alt: "sokpinter"
	};
	
	emoticons[":catch:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/catch.gif",
		alt: "sokpinter"
	};
	
	emoticons[":nyahaha:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/nyahaha.gif",
		alt: "sokpinter"
	};
		
	emoticons[":napsu:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/mupeng.gif",
		alt: "sokpinter"
	};
	
	emoticons[":egp:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/emang%20gue%20pikirin.gif",
		alt: "sokpinter"
	};
	
	emoticons[":kedip:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/kedip.gif",
		alt: "sokpinter"
	};
	
	emoticons[":weeek2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/weeek2.gif",
		alt: "sokpinter"
	};
	
	emoticons[":gamer:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/gamer.gif",
		alt: "sokpinter"
	};
	
	emoticons[":dimasak:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/dimasak.gif",
		alt: "sokpinter"
	};
	
	emoticons[":shock:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/shock.gif",
		alt: "sokpinter"
	};
	
	emoticons[":gemes:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/gemes.gif",
		alt: "sokpinter"
	};
	
	emoticons[":gampar:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/gampar.gif",
		alt: "sokpinter"
	};
	
	emoticons[":kekanan:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/kekanan.gif",
		alt: "sokpinter"
	};
	
	emoticons[":kekiri:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/kekiri.gif",
		alt: "sokpinter"
	};
	
	emoticons[":santa2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/santa.gif",
		alt: "sokpinter"
	};
	
	emoticons[":bye2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/bye2.gif",
		alt: "sokpinter"
	};
	
	emoticons[":tuing2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/tuing2.gif",
		alt: "sokpinter"
	};
	
	emoticons[":cubit:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/cubit.gif",
		alt: "sokpinter"
	};
	
	emoticons[":joget:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/yoyojoget.gif",
		alt: "sokpinter"
	};
	
	emoticons[":ancur:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ancur.gif",
		alt: "sokpinter"
	};
	
	emoticons[":hehe2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/hehe2.gif",
		alt: "sokpinter"
	};
	
	emoticons[":bunuh:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/bunuh_drubicza.gif",
		alt: "sokpinter"
	};
	
	emoticons[":muncrat:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/muncrat.gif",
		alt: "sokpinter"
	};
	
	emoticons[":ngakak:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ngejek.gif",
		alt: "sokpinter"
	};
	
	emoticons[":monyet2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/yociexpress09.gif",
		alt: "sokpinter"
	};
	
	emoticons[":hajar:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/hajaaaaaaaaar.gif",
		alt: "sokpinter"
	};
	
	emoticons[":plis deh:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/keringat_dingin.gif",
		alt: "sokpinter"
	};
	
	emoticons[":tunduk:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/tunduk.gif",
		alt: "sokpinter"
	};
	
	emoticons[":babibuta:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/membabi_buta.gif",
		alt: "sokpinter"
	};
	
	emoticons[":mupeng:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/mimisan.gif",
		alt: "sokpinter"
	};
	
	emoticons[":monyet1:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/yociexpress01.gif",
		alt: "sokpinter"
	};
	
	emoticons[":mesum:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/mikir.gif",
		alt: "sokpinter"
	};
	
	emoticons[":umm"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/umm.gif",
		alt: "sokpinter"
	};

	emoticons[":lirik:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/melirik.gif",
		alt: "sokpinter"
	};
	
	emoticons[":eerrr"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/lirik.gif",
		alt: "sokpinter"
	};
	
	emoticons[":maling:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ninja_gadungan.gif",
		alt: "sokpinter"
	};
	
	emoticons[":sing:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/rocker.gif",
		alt: "sokpinter"
	};
	
	emoticons[":meledak:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/meledak.gif",
		alt: "sokpinter"
	};
	
	emoticons[":pede:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/hadooh.gif",
		alt: "sokpinter"
	};
	
	emoticons[":yeap:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/yeap.gif",
		alt: "sokpinter"
	};
	
	emoticons[":nonono:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/nonono.gif",
		alt: "sokpinter"
	};
	
	emoticons[":love u:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/love_cyn.gif",
		alt: "sokpinter"
	};
	
	emoticons[":benjol:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/benjo.gif",
		alt: "sokpinter"
	};
	
	emoticons[":geram:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/geram.gif",
		alt: "sokpinter"
	};
	
	emoticons[":angin2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/angin2.gif",
		alt: "sokpinter"
	};
	
	emoticons[":belo:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/matabelo.gif",
		alt: "sokpinter"
	};
	
	emoticons[":nyerah:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/nyerah.gif",
		alt: "sokpinter"
	};
	
	emoticons[":jepret:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/jepret.gif",
		alt: "sokpinter"
	};
	
	emoticons[":bawabom:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/bawa_bom.gif",
		alt: "sokpinter"
	};
	
	emoticons[":timpuk:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/disawat.gif",
		alt: "sokpinter"
	};
	
	emoticons[":doa:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/amitaba.gif",
		alt: "sokpinter"
	};
	
	emoticons[":mataduitan:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/mata_duit2.giff",
		alt: "sokpinter"
	};
	
	emoticons[":wow:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/wow.gif",
		alt: "sokpinter"
	};
	emoticons[":puyeng:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/puyeng.gif",
		alt: "sokpinter"
	};
	emoticons[":pantatyoyo:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/pantatyoyo.gif",
		alt: "sokpinter"
	};
	emoticons[":detektif"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/detektif.gif",
		alt: "sokpinter"
	};
	emoticons[":teriak:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/teriak.gif",
		alt: "sokpinter"
	};
	emoticons[":menang:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/jadi_superstar_menang.gif",
		alt: "sokpinter"
	};
	emoticons[":waspada:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/waspada.gif",
		alt: "sokpinter"
	};
	emoticons[":rokok:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/rokok.gif",
		alt: "sokpinter"
	};
	emoticons[":bisik:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/bisik.gif",
		alt: "sokpinter"
	};
	
	emoticons[":malu:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/malu.gif",
		alt: "sokpinter"
	}
		
	emoticons[":jadies:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/jadi_es.gif",
		alt: "sokpinter"
	}
	
	emoticons[":cup:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/cup_hihihi.gif",
		alt: "sokpinter"
	}
	
	emoticons[":Pe:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/P.gif",
		alt: "sokpinter"
	}
	
	emoticons[":tutup mulut:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/shutup.gif",
		alt: "sokpinter"
	}
	
	emoticons[":hantu:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/hantu_penasaran.gif",
		alt: "sokpinter"
	}
	
	emoticons[":bengong"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/bengong.gif",
		alt: "sokpinter"
	}
	
	emoticons[":tepuk:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/tepuk.gif",
		alt: "sokpinter"
	}
	
	emoticons[":ke surga:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ke%20surga.gif",
		alt: "sokpinter"
	}
	
	emoticons[":pipis:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/siram_air.gif",
		alt: "sokpinter"
	}

	emoticons[":lewat:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/arabian.gif",
		alt: "sokpinter"
	};
	
	emoticons[":hehe3:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/hehe3.gif",
		alt: "sokpinter"
	};

	emoticons[":tendang:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/tendangan_maut.gif",
		alt: "sokpinter"
	};
	
	emoticons[":ngelamun:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ngelamun.gif",
		alt: "sokpinter"
	};

	emoticons[":bangga:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/bangga.gif",
		alt: "sokpinter"
	};
	
	emoticons[":ayo1:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ayo1.gif",
		alt: "sokpinter"
	};

	emoticons[":babipingsan:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/babipingsan.gif",
		alt: "sokpinter"
	};
	
	emoticons[":babingamuk:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/babingamuk.gif",
		alt: "sokpinter"
	};
	
	emoticons[":babijoget:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/babijoget.gif",
		alt: "sokpinter"
	};
	
	emoticons[":babiedan:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/babiedan.gif",
		alt: "sokpinter"
	};
	
	emoticons[":babistress:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/babistress.gif",
		alt: "sokpinter"
	};
	
	emoticons[":babikentut:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/babibuntut.gif",
		alt: "sokpinter"
	};
	emoticons[":babibobo:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/babi_bobo.gif",
		alt: "sokpinter"
	};
	emoticons[":babingakak:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/babi_ngakak.gif",
		alt: "sokpinter"
	};
	emoticons[":babinangis:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/babi_nangis.gif",
		alt: "sokpinter"
	};
	emoticons[":babiangguk:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/yesyesyes.gif",
		alt: "sokpinter"
	};
	emoticons[":babigeram2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/babi_geram2.gif",
		alt: "sokpinter"
	};
	emoticons[":snif:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/babi_jelek.gif",
		alt: "sokpinter"
	};
	emoticons[":heartshot:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/heartshott.gif",
		alt: "sokpinter"
	};
	emoticons[":m e"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/aromaterasy.gif",
		alt: "sokpinter"
	};
	emoticons[":banzai:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/banzai.gif",
		alt: "sokpinter"
	};
	emoticons[":headshot:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/headshot.gif",
		alt: "sokpinter"
	};
	emoticons[":bee:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/bee.gif",
		alt: "sokpinter"
	};
	emoticons[":drift:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/drifttttt.gif",
		alt: "sokpinter"
	};
	emoticons[":ganbatte:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/semangatt.gif",
		alt: "sokpinter"
	};
	emoticons[":awawaw:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/gunshottt.gif",
		alt: "sokpinter"
	};
	emoticons[":tembaak:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/bantaiii.gif",
		alt: "sokpinter"
	};
	emoticons[":riposwoi:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/repostwoiii.gif",
		alt: "Repost Woi By sokpinter"
	};
	emoticons[":silatlidah:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/silatlidaah.gif",
		alt: "sokpinter"
	};
	emoticons[":plant:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/plant.gif",
		alt: "sokpinter"
	};
	emoticons[":mukelujauh:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/mukelujauhh.gif",
		alt: "sokpinter"
	};
	emoticons[":riposabon:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/riposabon.gif",
		alt: "sokpinter"
	};
	emoticons[":terpaku:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/terpakuu.gif",
		alt: "sokpinter"
	};
	emoticons[":drift2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/driftttgtr.gif",
		alt: "sokpinter"
	};
	emoticons[":tidak:"] = {
		src: "http://www.laymark.com/i/o/81.gif",
		alt: ""
	};
	emoticons[":mukamerah:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/goldy36.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":thumbdown:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/thumbdown.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":tepuktangan:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/goldy10.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":repost:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/repost.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":top:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/goldy2.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":nepsong:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/heart_eyes.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":devil:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/devilf.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":bonk:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/66.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":toeng2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/toeng2.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":clueless:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/28.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":bazooka:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/bazooka.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":week:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/47.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":suicide:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/suicide.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":hug:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_hug.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":wish:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_pray.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":kado:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AllSmail%20(19).gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":sorrriie:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/91.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":jempol:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/thumb3d.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":cups:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/cupss.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":teevee:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_teevee.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":pergikau:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AllSmail%20(30).gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":smile:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/71.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":DJ:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AllSmail%20(9).gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":mad:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/mad.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":keepout:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/Keep_out_of_my_sister.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":jepit:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/crowded.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":stupid:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_stupid.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":mikir:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AllSmail%20(5).gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":barbel:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AllSmail%20(11).gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":managuetau:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/shrug.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":sniperhit:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/sniperhit.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":bingung2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/confused2.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":ancurin:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AllSmail%20(2).gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":aww:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/11.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":yes:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AllSmail%20(6).gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":cool:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/cool.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":sst:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/shhh.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":sniper:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/sniper.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":laughing:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/21.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":sprint:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_sprint.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":angered:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/14.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":telpon:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/phone_call.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":??:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/heran.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":handshake:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_handshake.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":nirvana:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/15.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":cabul:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/pervert1.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":bounce:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/67.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":mrgreen:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_mrgreen.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":cinta:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/lovestruck.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":bored:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/37.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":picnic:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AllSmail%20(55).gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":omg:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/43.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":doh:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/doh.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":boo:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/5.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":pentung:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AllSmail%20(24).gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":):"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/smile.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":confuse:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_confuse.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":nana:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_nana.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":shutup:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/32.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":dos:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/96.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":kekekek:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_rofl.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":makan:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AllSmail%20(21).gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":("] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/frown.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":angel:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/25.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":layu:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AddEmoticons04216.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":1write:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/93.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":lonly:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/12.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":deal:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/deal.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":whisper:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_whisper.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":blownose:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/88.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":hungry:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_hungry.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":puke:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_puke.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":santa:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AllSmail%20(18).gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":confused:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/confused.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":fear:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/17.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":wataw:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AddEmoticons04222.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":party:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/36.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":KL Emot, for more info visit http://clubbing.kapanlagi.commungkin:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/KL Emot, for more info visit http://clubbing.kapanlagi.commungkin.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":clap:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/41.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":cups2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/cupss2.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":wierdface:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/23.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":blowkiss:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/90.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":eek:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/eek.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":piss:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AddEmoticons04257.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":omfg:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/87.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":chew:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/65.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":forget:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/40.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":banned:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_banned.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":popcorn:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_popcorn.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":evil:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/19.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":tampar:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AddEmoticons04249.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":ohmygod:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_ohmygod.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":bobo:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/sleep2.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":chainsaw:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_chainsaw.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":licking:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_licking.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":b0x0rz:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/95.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":heartbreaker:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_heartbreaker.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":please:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_please.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":rolleyes:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/rolleyes.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":fiuhhh:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/18.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":number1:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/30.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":censored:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_censored.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":lick:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_lick.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":steaming:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_steaming.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":headbang:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_headbang.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":pissedoff:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/85.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":droll:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/38.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":nod:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/39.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":bye:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_bye.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":pisanggitar:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/bannana_guitar.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":wink:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/3.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":pills:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_pills.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":p"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/tongue.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":disbelief:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/13.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":no:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/9.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":brushteeth:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_brushteeth.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":nono:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/68.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":pray:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/63.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":airborne:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/94.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":picknose:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_picknose.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[";)"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/wink.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":date:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/89.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":jawdrop:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_jawdrop.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":sniff:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_sniff.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":giggle:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/78.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":petting:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_petting.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":D"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/biggrin.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":crazy:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/35.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":matre:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/64.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":weeek:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/AddEmoticons04287.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":hiphop:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/92.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":sleep:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_sleep.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":idea:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/69.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":banana:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/81.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":o"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/redface.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":queasy:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/31.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":fallinlove:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/8.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":worship:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/77.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":imslow:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_imslow.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":sick:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_sick.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":piz:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/86.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":fork:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_fork.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":pee:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/icon_pee.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":ngintip:"] = {
		src: "http://www.laymark.com/i/m/m092.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":ehem:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ehem.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":TS:"] = {
		src: "http://i948.photobucket.com/albums/ad324/sokpinter/KL%20Deface/th_Untitled-1.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":hoax:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/nopic-hoax.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":garuk kaki:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/garuk-kaki.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":sebel2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/sebel2.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":nessie:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/nessi3.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":shoryuken:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/shin_shoryuken2.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":sebel:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/sebel.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":ngitungduit:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/ngitung%2520duit.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":nyebur:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/nyebur-2.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":tendang2:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/tendaang2.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
	};
	emoticons[":becaak:"] = {
		src: "http://clubbing.kapanlagi.com/images/smilies/drift2.gif",
		alt: "KL Emot, for more info visit http://clubbing.kapanlagi.com"
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
