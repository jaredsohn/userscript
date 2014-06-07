// ==UserScript==
// @name           Facebook Smiley Imzers
// @namespace      http://www.imzers.org
// @description    The 2nd For Script UserJS
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @version        1.2 fixed url
// ==/UserScript==
//
//      -Imzers- Emoticons Relased
//      
//      Copyright 2011 Shaman Imzers <o.topeng.o@facebook.com>
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
//		All rights Reserved This Script Modified By Shaman On Imzers
//		-[PERINGATAN]- MEMBER IMZERS BOLEH MEMODIFIKASI SCRIPT INI
//		But Respect To Owner 
//		Start Begin on code

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
	emoticons[":ampundj:"] = {
		src: "http://www.imzers.org/images/image/ampundj.gif",
		alt: "csgakmod"
	};
	
	emoticons[":apple:"] = {
		src: "http://www.imzers.org/images/image/apple.gif",
		alt: "csgakmod"
	};
	
	emoticons[":asu:"] = {
		src: "http://www.imzers.org/images/image/asu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ayam:"] = {
		src: "http://www.imzers.org/images/image/ayam.gif",
		alt: "csgakmod"
	};
	
	emoticons[":back2topic:"] = {
		src: "http://www.imzers.org/images/image/back2topic.gif",
		alt: "csgakmod"
	};
	
	emoticons[":beer:"] = {
		src: "http://www.imzers.org/images/image/beer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":birthday:"] = {
		src: "http://www.imzers.org/images/image/birthday.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bouquet:"] = {
		src: "http://www.imzers.org/images/image/bouquet.gif",
		alt: "csgakmod"
	};
	
	emoticons[":broken:"] = {
		src: "http://www.imzers.org/images/image/broken.gif",
		alt: "csgakmod"
	};
	
	emoticons[":buahaha:"] = {
		src: "http://www.imzers.org/images/image/bunga.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bunuh:"] = {
		src: "http://www.imzers.org/images/image/bunuh.gif",
		alt: "csgakmod"
	};
	
	emoticons[":burger:"] = {
		src: "http://www.imzers.org/images/image/burger.gif",
		alt: "csgakmod"
	};
	
	emoticons[":buttie:"] = {
		src: "http://www.imzers.org/images/image/buttie.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bye:"] = {
		src: "http://www.imzers.org/images/image/bye.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cafelatte:"] = {
		src: "http://www.imzers.org/images/image/cafelatte.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cake:"] = {
		src: "http://www.imzers.org/images/image/cake.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cape:"] = {
		src: "http://www.imzers.org/images/image/cape.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cocktail:"] = {
		src: "http://www.imzers.org/images/image/cocktail.gif",
		alt: "csgakmod"
	};
	
	emoticons[":dj:"] = {
		src: "http://www.imzers.org/images/image/dj.gif",
		alt: "csgakmod"
	};
	
	emoticons[":duduaku:"] = {
		src: "http://www.imzers.org/images/image/duduaku.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gatax:"] = {
		src: "http://www.imzers.org/images/image/gatax.gif",
		alt: "csgakmod"
	};
	
	emoticons[":giggling:"] = {
		src: "http://www.imzers.org/images/image/giggling.gif",
		alt: "csgakmod"
	};
	
	emoticons[":guesuka:"] = {
		src: "http://www.imzers.org/images/image/guesuka.gif",
		alt: "csgakmod"
	};
	emoticons[":hammer:"] = {
		src: "http://www.imzers.org/images/image/hammer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":heart:"] = {
		src: "http://www.imzers.org/images/image/heart.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hebat:"] = {
		src: "http://www.imzers.org/images/image/hebat.gif",
		alt: "csgakmod"
	};
	
	emoticons[":imzers:"] = {
		src: "http://www.imzers.org/images/image/imzers.gif",
		alt: "csgakmod"
	};
	
	emoticons[":inlove:"] = {
		src: "http://www.imzers.org/images/image/inlove.gif",
		alt: "csgakmod"
	};
	
	emoticons[":jreng:"] = {
		src: "http://www.imzers.org/images/image/jreng.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kabur:"] = {
		src: "http://www.imzers.org/images/image/kabur.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kenthu:"] = {
		src: "http://www.imzers.org/images/image/kenthu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu:"] = {
		src: "http://www.imzers.org/images/image/malu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":marah:"] = {
		src: "http://www.imzers.org/images/image/marah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mikir:"] = {
		src: "http://www.imzers.org/images/image/mikir.gif",
		alt: "csgakmod"
	};
	
	emoticons[":monyet:"] = {
		src: "http://www.imzers.org/images/image/monyet.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mumet:"] = {
		src: "http://www.imzers.org/images/image/mumet.gif",
		alt: "csgakmod"
	};
	
	emoticons[":muter:"] = {
		src: "http://www.imzers.org/images/image/muter.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nunggu:"] = {
		src: "http://www.imzers.org/images/image/nunggu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nyerah:"] = {
		src: "http://www.imzers.org/images/image/nyerah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":oot:"] = {
		src: "http://www.imzers.org/images/image/oot.gif",
		alt: "csgakmod"
	};
	
	emoticons[":peace:"] = {
		src: "http://www.imzers.org/images/image/peace.gif",
		alt: "csgakmod"
	};
	
	emoticons[":pentil:"] = {
		src: "http://www.imzers.org/images/image/pentil.gif",
		alt: "csgakmod"
	};
	
	emoticons[":pornomatika:"] = {
		src: "http://www.imzers.org/images/image/pornomatika.gif",
		alt: "csgakmod"
	};
	
	emoticons[":prex:"] = {
		src: "http://www.imzers.org/images/image/prex.gif",
		alt: "csgakmod"
	};
	
	emoticons[":pukul:"] = {
		src: "http://www.imzers.org/images/image/pukul.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rock:"] = {
		src: "http://www.imzers.org/images/image/rock.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rokok:"] = {
		src: "http://www.imzers.org/images/image/rokok.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rose:"] = {
		src: "http://www.imzers.org/images/image/rose.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sapu:"] = {
		src: "http://www.imzers.org/images/image/sapu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sedih:"] = {
		src: "http://www.imzers.org/images/image/sedih.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sensor:"] = {
		src: "http://www.imzers.org/images/image/sensor.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shock:"] = {
		src: "http://www.imzers.org/images/image/shock.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sial:"] = {
		src: "http://www.imzers.org/images/image/sial.gif",
		alt: "csgakmod"
	};
	
	emoticons[":spam:"] = {
		src: "http://www.imzers.org/images/image/spam.gif",
		alt: "csgakmod"
	};
	
	emoticons[":takdung:"] = {
		src: "http://www.imzers.org/images/image/takdung.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tidur:"] = {
		src: "http://www.imzers.org/images/image/tidur.gif",
		alt: "csgakmod"
	};
	
	emoticons[":wah:"] = {
		src: "http://www.imzers.org/images/image/wah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":what:"] = {
		src: "http://www.imzers.org/images/image/what.gif",
		alt: "csgakmod"
	};
	
	emoticons[":you:"] = {
		src: "http://www.imzers.org/images/image/you.gif",
		alt: "csgakmod"
	};
	
	emoticons["8-)"] = {
		src: "http://www.imzers.org/images/icon/icon_8.gif",
		alt: "csgakmod"
	};
	
	emoticons[":("] = {
		src: "http://www.imzers.org/images/icon/icon_3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":)"] = {
		src: "http://www.imzers.org/images/icon/icon_2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":))"] = {
		src: "http://www.imzers.org/images/icon/icon_7.gif",
		alt: "csgakmod"
	};
	
	emoticons[":-)"] = {
		src: "http://www.imzers.org/images/icon/icon_1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":-p"] = {
		src: "http://www.imzers.org/images/icon/icon_13.gif",
		alt: "csgakmod"
	};
	
	emoticons[":-S"] = {
		src: "http://www.imzers.org/images/icon/icon_6.gif",
		alt: "csgakmod"
	};
	
	emoticons[":-]"] = {
		src: "http://www.imzers.org/images/icon/icon_17.gif",
		alt: "csgakmod"
	};
	
	emoticons[":?"] = {
		src: "http://www.imzers.org/images/icon/icon_18.gif",
		alt: "csgakmod"
	};
	
	emoticons[":D"] = {
		src: "http://www.imzers.org/images/icon/icon_4.gif",
		alt: "csgakmod"
	};
	
	emoticons[":o"] = {
		src: "http://www.imzers.org/images/icon/icon_10.gif",
		alt: "csgakmod"
	};
	
	emoticons[":o)"] = {
		src: "http://www.imzers.org/images/icon/icon_5.gif",
		alt: "csgakmod"
	};
	
	emoticons[":x"] = {
		src: "http://www.imzers.org/images/icon/icon_9.gif",
		alt: "csgakmod"
	};
	
	emoticons[";-)"] = {
		src: "http://www.imzers.org/images/icon/icon_11.gif",
		alt: "csgakmod"
	};
	
	emoticons["=))"] = {
		src: "http://www.imzers.org/images/icon/icon_14.gif",
		alt: "csgakmod"
	};
	
	emoticons["=D"] = {
		src: "http://www.imzers.org/images/icon/icon_15.gif",
		alt: "csgakmod"
	};
	
	emoticons[">:o"] = {
		src: "http://www.imzers.org/images/icon/icon_12.gif",
		alt: "csgakmod"
	};
	
	emoticons[">=)"] = {
		src: "http://www.imzers.org/images/icon/icon_20.gif",
		alt: "csgakmod"
	};
	
	emoticons["S-o"] = {
		src: "http://www.imzers.org/images/icon/icon_19.gif",
		alt: "csgakmod"
	};
	
	emoticons[":aman"] = {
		src: "http://www.imzers.org/images/emoticon/aman.gif",
		alt: "csgakmod"
	};
	
	emoticons[":apa"] = {
		src: "http://www.imzers.org/images/emoticon/apa.gif",
		alt: "csgakmod"
	};
	
	emoticons[":asyik"] = {
		src: "http://www.imzers.org/images/emoticon/asyik.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bau"] = {
		src: "http://www.imzers.org/images/emoticon/bau.gif",
		alt: "csgakmod"
	};
	
	emoticons[":belanja"] = {
		src: "http://www.imzers.org/images/emoticon/belanja.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bengong"] = {
		src: "http://www.imzers.org/images/emoticon/bengong.gif",
		alt: "csgakmod"
	};
	
	emoticons[":blank"] = {
		src: "http://www.imzers.org/images/emoticon/blank.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bobok"] = {
		src: "http://www.imzers.org/images/emoticon/bobok.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bulanku"] = {
		src: "http://www.imzers.org/images/emoticon/bulanku.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bunga"] = {
		src: "http://www.imzers.org/images/emoticon/bunga.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bwek"] = {
		src: "http://www.imzers.org/images/emoticon/bwek.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekikikan"] = {
		src: "http://www.imzers.org/images/emoticon/cekikikan.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cling"] = {
		src: "http://www.imzers.org/images/emoticon/cling.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cool"] = {
		src: "http://www.imzers.org/images/emoticon/cool.gif",
		alt: "csgakmod"
	};
	
	emoticons[":curiga"] = {
		src: "http://www.imzers.org/images/emoticon/curiga.gif",
		alt: "csgakmod"
	};
	
	emoticons[":dadah"] = {
		src: "http://www.imzers.org/images/emoticon/dadah.gif",
		alt: "csgakmod"
	};

	emoticons[":deg"] = {
		src: "http://www.imzers.org/images/emoticon/deg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":emas"] = {
		src: "http://www.imzers.org/images/emoticon/emas.gif",
		alt: "csgakmod"
	};
	
	emoticons[":emosi"] = {
		src: "http://www.imzers.org/images/emoticon/emosi.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fyuh"] = {
		src: "http://www.imzers.org/images/emoticon/fyuh.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hancurhatiku"] = {
		src: "http://www.imzers.org/images/emoticon/hancurhatiku.gif",
		alt: "csgakmod"
	};
	
	emoticons[":haru"] = {
		src: "http://www.imzers.org/images/emoticon/haru.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hikz"] = {
		src: "http://www.imzers.org/images/emoticon/hikz.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hmmm"] = {
		src: "http://www.imzers.org/images/emoticon/hmmm.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hohoho"] = {
		src: "http://www.imzers.org/images/emoticon/hohoho.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hoi"] = {
		src: "http://www.imzers.org/images/emoticon/hoi.gif",
		alt: "csgakmod"
	};
	
	emoticons[":huekz"] = {
		src: "http://www.imzers.org/images/emoticon/huekz.gif",
		alt: "csgakmod"
	};
	
	emoticons[":huft"] = {
		src: "http://www.imzers.org/images/emoticon/huft.gif",
		alt: "csgakmod"
	};
	
	emoticons[":huwaa"] = {
		src: "http://www.imzers.org/images/emoticon/huwaa.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ide"] = {
		src: "http://www.imzers.org/images/emoticon/ide.gif",
		alt: "csgakmod"
	};
	
	emoticons[":itung2"] = {
		src: "http://www.imzers.org/images/emoticon/itung-itung.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kabur"] = {
		src: "http://www.imzers.org/images/emoticon/kabur.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kado"] = {
		src: "http://www.imzers.org/images/emoticon/kado.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kaget"] = {
		src: "http://www.imzers.org/images/emoticon/kaget.gif",
		alt: "csgakmod"
	};
	
	emoticons[":lol"] = {
		src: "http://www.imzers.org/images/emoticon/lol.gif",
		alt: "csgakmod"
	};
	
	emoticons[":love"] = {
		src: "http://www.imzers.org/images/emoticon/love.gif",
		alt: "csgakmod"
	};
	emoticons[":malu"] = {
		src: "http://www.imzers.org/images/emoticon/malu.gif",
		alt: "csgakmod"
	};
	emoticons[":meledak"] = {
		src: "http://www.imzers.org/images/emoticon/meledak.gif",
		alt: "csgakmod"
	};
	emoticons[":melet"] = {
		src: "http://www.imzers.org/images/emoticon/melet.gif",
		alt: "csgakmod"
	};
	emoticons[":mencemaskan"] = {
		src: "http://www.imzers.org/images/emoticon/mencemaskan.gif",
		alt: "csgakmod"
	};
	emoticons[":muach"] = {
		src: "http://www.imzers.org/images/emoticon/muach.gif",
		alt: "csgakmod"
	};
	emoticons[":naah"] = {
		src: "http://www.imzers.org/images/emoticon/naah.gif",
		alt: "csgakmod"
	};
	emoticons[":nangis"] = {
		src: "http://www.imzers.org/images/emoticon/nangis.gif",
		alt: "csgakmod"
	};
	emoticons[":ngences"] = {
		src: "http://www.imzers.org/images/emoticon/ngences.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngiler"] = {
		src: "http://www.imzers.org/images/emoticon/ngiler.gif",
		alt: "csgakmod"
	}
		
	emoticons[":nunggu"] = {
		src: "http://www.imzers.org/images/emoticon/nunggu.gif",
		alt: "csgakmod"
	}
	
	emoticons[":nyamar"] = {
		src: "http://www.imzers.org/images/emoticon/nyamar.gif",
		alt: "csgakmod"
	}
	
	emoticons[":nyerah"] = {
		src: "http://www.imzers.org/images/emoticon/nyerah.gif",
		alt: "csgakmod"
	}
	
	emoticons[":ok"] = {
		src: "http://www.imzers.org/images/emoticon/ok.gif",
		alt: "csgakmod"
	}
	
	emoticons[":payah"] = {
		src: "http://www.imzers.org/images/emoticon/payah.gif",
		alt: "csgakmod"
	}
	
	emoticons[":peluh"] = {
		src: "http://www.imzers.org/images/emoticon/peluh.gif",
		alt: "csgakmod"
	}
	
	emoticons[":piss"] = {
		src: "http://www.imzers.org/images/emoticon/piss.gif",
		alt: "csgakmod"
	}
	
	emoticons[":plakz"] = {
		src: "http://www.imzers.org/images/emoticon/plakz.gif",
		alt: "csgakmod"
	}
	
	emoticons[":pliss"] = {
		src: "http://www.imzers.org/images/emoticon/pliss.gif",
		alt: "csgakmod"
	}

	emoticons[":pssst"] = {
		src: "http://www.imzers.org/images/emoticon/pssst.gif",
		alt: "csgakmod"
	};
	
	emoticons[":pussy"] = {
		src: "http://www.imzers.org/images/emoticon/pussy.gif",
		alt: "csgakmod"
	};

	emoticons[":puyeng"] = {
		src: "http://www.imzers.org/images/emoticon/puyeng.gif",
		alt: "csgakmod"
	};
	
	emoticons[":romantis"] = {
		src: "http://www.imzers.org/images/emoticon/romantis.gif",
		alt: "csgakmod"
	};

	emoticons[":sakit"] = {
		src: "http://www.imzers.org/images/emoticon/sakit.gif",
		alt: "csgakmod"
	};
	
	emoticons[":semoga"] = {
		src: "http://www.imzers.org/images/emoticon/semoga.gif",
		alt: "csgakmod"
	};

	emoticons[":senangnya"] = {
		src: "http://www.imzers.org/images/emoticon/senangnya.gif",
		alt: "csgakmod"
	};
	
	emoticons[":senyum"] = {
		src: "http://www.imzers.org/images/emoticon/senyum.gif",
		alt: "csgakmod"
	};
	
	emoticons[":serem"] = {
		src: "http://www.imzers.org/images/emoticon/serem.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shock"] = {
		src: "http://www.imzers.org/images/emoticon/shock.gif",
		alt: "csgakmod"
	};
	
	emoticons[":silahkan"] = {
		src: "http://www.imzers.org/images/emoticon/silahkan_disantap.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sinimaju"] = {
		src: "http://www.imzers.org/images/emoticon/sinimaju.gif",
		alt: "csgakmod"
	};
	emoticons[":sip"] = {
		src: "http://www.imzers.org/images/emoticon/sip.gif",
		alt: "csgakmod"
	};
	emoticons[":suka"] = {
		src: "http://www.imzers.org/images/emoticon/suka.gif",
		alt: "csgakmod"
	};
	emoticons[":tepuktangan"] = {
		src: "http://www.imzers.org/images/emoticon/tepuktangan.gif",
		alt: "csgakmod"
	};
	emoticons[":timeup"] = {
		src: "http://www.imzers.org/images/emoticon/timeup.gif",
		alt: "csgakmod"
	};
	emoticons[":toss"] = {
		src: "http://www.imzers.org/images/emoticon/toss.gif",
		alt: "csgakmod"
	};
	emoticons[":wahaha"] = {
		src: "http://www.imzers.org/images/emoticon/wahaha.gif",
		alt: "csgakmod"
	};
	emoticons[":wekz"] = {
		src: "http://www.imzers.org/images/emoticon/wekz.gif",
		alt: "csgakmod"
	};
	emoticons[":wkwkwk"] = {
		src: "http://www.imzers.org/images/emoticon/wkwkwk.gif",
		alt: "csgakmod"
	};
	emoticons[":xixixi"] = {
		src: "http://www.imzers.org/images/emoticon/xixixi.gif",
		alt: "csgakmod"
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