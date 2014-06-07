// ==UserScript==
// @name           Fadilz Script 2nd
// @namespace      http://csmod.uk.to/
// @description    The 2nd For Script UserJS
// @include        http://www.facebook.com/*
// @include		   http://csmod.uk.to/*
// ==/UserScript==
//
//      -KaskuS- Emoticons Relased
//      
//      Copyright 2010 Fadilz <fadilz@null.net>
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
//		All rights ReserveD This Script Modiffed By Pedox A.K.A Fadilz On kaskuser 
//		-[PERINGATAN]- JANGAN MENGAKUI KODE INI MILIK ORANG LAIN 
//		JANGAN MODIFIKASI KODE INI SEIZIN OWNER
//		Respect To Owner 
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
	emoticons[":ilovekaskus"] = {
		src: "http://kaskus.co.id/images/smilies/s_sm_ilovekaskus.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kiss"] = {
		src: "http://kaskus.co.id/images/smilies/cewek.gif",
		alt: "csgakmod"
	};
	
        emoticons[":shotachandaisuki"] = {
		src: "http://media.tumblr.com/tumblr_m7lyaaJGsM1qb9zgv.gif",
		alt: "csgakmod"
	};
	
        emoticons[":cambuk"] = {
		src: "http://www.indowebster.web.id/images/smilies/cambuk3.gif",
		alt: "csgakmod"

        };
	
        emoticons[":Pentung:"] = {
		src: "http://dl.dropbox.com/u/81340284/emote/hajar.gif",
		alt: "csgakmod"

        };
	
        emoticons[":wotagei:"] = {
		src: "http://dl.dropbox.com/u/81340284/emote/otagei.gif",
		alt: "csgakmod"

        };
	
        emoticons[":sembah:"] = {
		src: "http://forum.indowebster.com/images/smilies/jeanovea/sembah.gif",
		alt: "csgakmod"

        };
	
        emoticons[":Puyeng:"] = {
		src: "http://i444.photobucket.com/albums/qq166/sakyaman/Emoticon/th_puyeng.gif",
		alt: "csgakmod"

        };
	
        emoticons[":sempak:"] = {
		src: "http://static.kaskus.co.id/customavatars/avatar1809051_7.gif",
		alt: "csgakmod"

        };
	
        emoticons[":minta:"] = {
		src: "https://dl.dropbox.com/u/80365335/emot/bawang/minta.gif",
		alt: "csgakmod"

        };
	
        emoticons[":ngiler:"] = {
		src: "http://dl.dropbox.com/u/81340284/emote/ngiler.gif",
		alt: "csgakmod"

        };
	
        emoticons[":fakk:"] = {
		src: "https://dl.dropbox.com/u/80365335/KSK48/sekrip%20abuse/emot%20biasa/fakk.jpg",
		alt: "csgakmod"

        };
	
        emoticons[":nangis:"] = {
		src: "https://dl.dropbox.com/u/80365335/emot/bawang/nangis.gif",
		alt: "csgakmod"

        };
	
        emoticons[":nongol:"] = {
		src: "http://i667.photobucket.com/albums/vv32/adiekawaii/Emote/Onion%20Emote/th_nongol.gif",
		alt: "csgakmod"

        };
	
        emoticons[":garing:"] = {
		src: "http://forum.indowebster.com/images/smilies/garing.gif",
		alt: "csgakmod"

        };
	
        emoticons[":hehe:"] = {
		src: "http://www.laymark.com/l/o/80.gif",
		alt: "csgakmod"

        };
	
        emoticons[":kenthu:"] = {
		src: "http://dl.dropbox.com/u/81340284/emote/takdung.gif",
		alt: "csgakmod"

        };
	
        emoticons[":terharus:"] = {
		src: "https://dl.dropbox.com/u/80365335/emot/bawang/terharusurem.gif",
		alt: "csgakmod"

        };
	
        emoticons[":henshin:"] = {
		src: "http://forums.passpofan.com/images/smilies/cz19.gif",
		alt: "csgakmod"


        };
	
        emoticons[":catet:"] = {
		src: "https://dl.dropbox.com/u/80365335/emot/bawang/catet.gif",
		alt: "csgakmod"

        };
	
        emoticons[":gosok:"] = {
		src: "http://dl.dropbox.com/u/81340284/emote/gosok.gif",
		alt: "csgakmod"

        };
	
        emoticons[":kaget:"] = {
		src: "https://dl.dropbox.com/u/80365335/emot/bawang/kaget.gif",
		alt: "csgakmod"

        };
	
        emoticons[":mesum:"] = {
		src: "https://dl.dropbox.com/u/80365335/KSK48/sekrip%20abuse/emot%20gerak/mesum.gif",
		alt: "csgakmod"

        };
	
        emoticons[":tanohammer:"] = {
		src: "https://dl.dropbox.com/u/80365335/KSK48/sekrip%20abuse/emot%20gerak/tanohammer.gif",
		alt: "csgakmod"


        };
	
        emoticons[":keringat:"] = {
		src: "http://www.indowebster.web.id/images/smilies/onion-84.gif",
		alt: "csgakmod"

        };
	
        emoticons[":bobo"] = {
		src: "http://www.laymark.com/l/o/98.gif",
		alt: "csgakmod"

        };
	
        emoticons[":nikmat"] = {
		src: "https://dl.dropbox.com/u/80365335/emot/bawang/nikmat.gif",
		alt: "csgakmod"

        };
	
        emoticons[":Pedono:"] = {
		src: "http://dl.dropbox.com/u/81340284/emote/Pedono.gif",
		alt: "csgakmod"

        };
	
        emoticons[":Pedofuu:"] = {
		src: "http://dl.dropbox.com/u/81340284/emote/Pedofuu.gif",
		alt: "csgakmod"

        };
	
        emoticons[":awas:"] = {
		src: "https://dl.dropbox.com/u/80365335/emot/bawang/awas.gif",
		alt: "csgakmod"

        };
	
        emoticons[":Peluk:"] = {
		src: "https://dl.dropbox.com/u/80365335/emot/bawang/peluk.gif",
		alt: "csgakmod"

        };
	
        emoticons[":Pedocool:"] = {
		src: "http://dl.dropbox.com/u/81340284/emote/Pedocool.gif",
		alt: "csgakmod"


        };
	
        emoticons[":Popcorn:"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/popcorn.JPG",
		alt: "csgakmod"
        };
	
        emoticons[":Onegai:"] = {
		src: "http://www.smileycodes.info/emo/onion/19.gif",
		alt: "csgakmod"

        };
	
        emoticons[":yoroshiku:"] = {
		src: "http://www.smileycodes.info/emo/onion/42.gif",
		alt: "csgakmod"

        };
	
        emoticons[":Pedos:"] = {
		src: "http://dl.dropbox.com/u/81340284/emote/Pedos.gif",
		alt: "csgakmod"

	};

	emoticons[":mamam:"] = {
		src: "http://www.cute-factor.com/images/smilies/missbone/miss-bone-19.gif",
		alt: "csgakmod"
	};
	
	emoticons[":pedobear"] = {
		src: "https://dl.dropbox.com/u/78890602/emot/pedobear/pedomesum.gif",
		alt: "csgakmod"

        };
	
	emoticons[":mojok"] = {
		src: "http://dl.dropbox.com/u/81340284/emote/mojok.gif",
		alt: "csgakmod"

        };
	
	emoticons[":toa"] = {
		src: "http://dl.dropbox.com/u/81340284/emote/toa.gif",
		alt: "csgakmod"


	};

        emoticons[":edobear"] = {
		src: "https://dl.dropbox.com/u/78890602/emot/pedobear/pedomesum.gif",
		alt: "csgakmod"
	};
	
	emoticons[":najis"] = {
		src: "http://kaskus.co.id/images/smilies/najis.gif",
		alt: "csgakmod"

        };
	
	emoticons[":terharu:"] = {
		src: "https://dl.dropbox.com/u/78890602/emot/onion/terharu.gif",
		alt: "csgakmod"

	};
	
	emoticons[":marah"] = {
		src: "http://kaskus.co.id/images/smilies/marah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu"] = {
		src: "http://kaskus.co.id/images/smilies/malu.gif",
		alt: "csgakmod"
	};
	

emoticons[":ngelel"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/baru2/p.jpg",
		alt: "sherzganteng"
	};

        emoticons[":tano:"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/baru2/tanoeek.jpeg",
		alt: "sherzganteng"

        };

        emoticons[":tanongol:"] = {
		src: "https://dl.dropbox.com/u/80365335/KSK48/sekrip%20abuse/emot%20gerak/tanongol.gif",
		alt: "sherzganteng"

	};

emoticons[":bye:"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/baru2/bye.gif",
		alt: "sherzganteng"
	};

emoticons[":gg:"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/baru2/onigg.gif",
		alt: "sherzganteng"
	};

emoticons[":onimalu:"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/baru2/onimalu.gif",
		alt: "sherzganteng"
	};

emoticons[":yip:"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/baru2/yipyip.gif",
		alt: "sherzganteng"
	};
	emoticons[":goyangs"] = {
		src: "http://www.laymark.com/l/cz/cz22.gif",
		alt: "csgakmod"

        };
	emoticons[":fire1"] = {
		src: "http://dl.dropbox.com/u/80365335/KSK48/sekrip%20abuse/emot%20gerak/fireball1.gif",
		alt: "csgakmod"

        };
	emoticons[":fire2"] = {
		src: "http://dl.dropbox.com/u/80365335/KSK48/sekrip%20abuse/emot%20gerak/fireball2.gif",
		alt: "csgakmod"

	};

	emoticons[":kamehameha:"] = {
		src: "http://animegifs.free.fr/anime/dbz/page03/dbz-028.gif",
		alt: "csgakmod"

        };

	emoticons[":kabur"] = {
		src: "https://dl.dropbox.com/u/80365335/KSK48/sekrip%20abuse/emot%20gerak/kabur.gif",
		alt: "csgakmod"

	};
	
	emoticons[":repost"] = {
		src: "http://kaskus.co.id/images/smilies/s_sm_repost1.gif",
		alt: "csgakmod"

        };
	emoticons[":hahai:"] = {
		src: "http://dl.dropbox.com/u/81340284/hahai.gif",
		alt: "csgakmod"

        };
	emoticons[":songong"] = {
		src: "http://www.cute-factor.com/images/smilies/missbone/miss-bone-18.gif",
		alt: "csgakmod"

	};
	
	emoticons[":sup2:"] = {
		src: "http://kaskus.co.id/images/smilies/sundul.gif",
		alt: "csgakmod"
	};
	
	emoticons[":batabig"] = {
		src: "http://kaskus.co.id/images/smilies/s_big_batamerah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":takut"] = {
		src: "http://kaskus.co.id/images/smilies/takut.gif",
		alt: "csgakmod"
        
        };
	
	emoticons[":elegan"] = {
		src: "http://dl.dropbox.com/u/78890602/emot/pedobear/trollelegan.gif",
		alt: "csgakmod"

	};
	
	emoticons[":cekpm"] = {
		src: "http://kaskus.co.id/images/smilies/cekpm.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammer"] = {
		src: "http://kaskus.co.id/images/smilies/hammer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":toast"] = {
		src: "http://kaskus.co.id/images/smilies/toastcendol.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cystg"] = {
		src: "http://kaskus.co.id/images/smilies/cystg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":iloveindonesia"] = {
		src: "http://kaskus.co.id/images/smilies/I-Luv-Indonesia.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maho"] = {
		src: "http://kaskus.co.id/images/smilies/s_sm_maho.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nosara"] = {
		src: "http://kaskus.co.id/images/smilies/nosara.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berduka"] = {
		src: "http://kaskus.co.id/images/smilies/berduka.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak"] = {
		src: "http://kaskus.co.id/images/smilies/ngakak.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost2"] = {
		src: "http://kaskus.co.id/images/smilies/s_sm_repost2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendolbig"] = {
		src: "http://kaskus.co.id/images/smilies/s_big_cendol.gif",
		alt: "csgakmod"
	};
	
	emoticons[":recsel"] = {
		src: "http://kaskus.co.id/images/smilies/recseller.gif",
		alt: "csgakmod"
        };
	
	emoticons[":yukiyuki"] = {
		src: "http://dl.dropbox.com/u/81340284/547063572.gif",
		alt: "csgakmod"
        };
	
	emoticons[":maimai"] = {
		src: "http://dl.dropbox.com/u/81340284/mai.gif",
		alt: "csgakmod"
	};

        emoticons[":hedobang"] = {
		src: "http://files.jwhaley.com/crap/headbang.gif",
		alt: "csgakmod"
        };

        emoticons[":Peluktanotomu:"] = {
		src: "https://dl.dropbox.com/u/80365335/KSK48/meme/peluk.jpg",
		alt: "csgakmod"
	};

        emoticons[":nosebleed"] = {
		src: "https://dl.dropbox.com/u/80365335/emot/bawang/nosebleed.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngacir2"] = {
		src: "http://kaskus.co.id/images/smilies/ngacir2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bingung"] = {
		src: "http://kaskus.co.id/images/smilies/bingung.gif",
		alt: "csgakmod"
	};
	emoticons[":bingung:"] = {
		src: "http://kaskus.co.id/images/smilies/bolakbalik.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cd"] = {
		src: "http://kaskus.co.id/images/smilies/capede.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hoax"] = {
		src: "http://kaskus.co.id/images/smilies/hoax.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendols"] = {
		src: "http://kaskus.co.id/images/smilies/cendols.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bonga"] = {
		src: "http://www.indojpg.com/images/807th_bonga2.gif",
		alt: "csgakmod"
	};

        emoticons[":goyangkuumin"] = {
		src: "http://25.media.tumblr.com/tumblr_m7xd9r9Nd91rqar03o4_250.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berdukas"] = {
		src: "http://kaskus.co.id/images/smilies/berdukas.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bingungs"] = {
		src: "http://kaskus.co.id/images/smilies/bingungs.gif",
		alt: "csgakmod"
	};
	
	emoticons[":najiss"] = {
		src: "http://kaskus.co.id/images/smilies/najiss.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ilovekaskuss"] = {
		src: "http://kaskus.co.id/images/smilies/iluvkaskuss.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mads"] = {
		src: "http://kaskus.co.id/images/smilies/mads.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sundulgans"] = {
		src: "http://kaskus.co.id/images/smilies/sundulgans.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammers"] = {
		src: "http://kaskus.co.id/images/smilies/hammers.gif",
		alt: "csgakmod"
	};
	
	emoticons[":batas"] = {
		src: "http://kaskus.co.id/images/smilies/batas.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpms"] = {
		src: "http://kaskus.co.id/images/smilies/cekpms.gif",
		alt: "csgakmod"
	};
	
	emoticons[":capedes"] = {
		src: "http://kaskus.co.id/images/smilies/capedes.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahos"] = {
		src: "http://kaskus.co.id/images/smilies/mahos.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malus"] = {
		src: "http://kaskus.co.id/images/smilies/malus.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kisss"] = {
		src: "http://kaskus.co.id/images/smilies/kisss.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakaks"] = {
		src: "http://kaskus.co.id/images/smilies/ngakaks.gif",
		alt: "csgakmod"
	};
	
	emoticons[":takuts"] = {
		src: "http://kaskus.co.id/images/smilies/takuts.gif",
		alt: "csgakmod"
	};
	
	emoticons[":reposts"] = {
		src: "http://kaskus.co.id/images/smilies/reposts.gif",
		alt: "csgakmod"
	};
	
	emoticons[":genit:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/q03.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tabrakan:"] = {
		src: "http://kaskus.co.id/images/smilies/tabrakan.gif",
		alt: "csgakmod"
	};
	
	emoticons[":linux1:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/25.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nohope:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/q11.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":)"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/15.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck3:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/fuck-8.gif",
		alt: "csgakmod"
	};
	
	emoticons[":doctor:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/18.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rose:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/34.gif",
		alt: "csgakmod"
	};
	
	emoticons[":angel:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/017.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kagets:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":eek:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/4.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fm:"] = {
		src: "http://kaskus.co.id/images/smilies/smileyfm329wj.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/fuck-4.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammer:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/8.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rolleyes:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/01.gif",
		alt: "csgakmod"
	};
	
	emoticons[":amazed:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/amazed.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shutup:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/5.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berbusa:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/q20.gif",
		alt: "csgakmod"
	};
	
	emoticons[":D"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/14.gif",
		alt: "csgakmod"
	};
	
	emoticons[":thumbdown"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/48.gif",
		alt: "csgakmod"
	};
	
	emoticons[":heart:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/37.gif",
		alt: "csgakmod"
	};
	
	emoticons[":linux2:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/26.gif",
		alt: "csgakmod"
	};
	
	emoticons[":matabelo:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/004.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kissmouth"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/36.gif",
		alt: "csgakmod"
	};
	
	emoticons[":("] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/06.gif",
		alt: "csgakmod"
	};
	
	emoticons[":siul:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/020.gif",
		alt: "csgakmod"
	};
	
	emoticons[":army:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/24.gif",
		alt: "csgakmod"
	};
	
	emoticons[":confused:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/7.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngacir:"] = {
		src: "http://kaskus.co.id/images/smilies/ngacir.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck2:"] = {
		src: "http://kaskus.co.id/images/smilies/ngacir.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tv:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/44.gif",
		alt: "csgakmod"
	};
	
	emoticons[":medicine:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/33.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kissing:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/014.gif",
		alt: "csgakmod"
	};
	
	emoticons[":wowcantik"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/001.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mad:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/12.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ck"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/kaskuslove.gif",
		alt: "csgakmod"
	};
	
	emoticons[":flower:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/e03.gif",
		alt: "csgakmod"
	};
	
	emoticons[":coffee:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/31.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sun:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/008.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bikini:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/vana-bum-vanaweb-dot-com.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cool:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/05.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gila:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/crazy.gif",
		alt: "csgakmod"

        };
	
	emoticons[":ular"] = {
		src: "http://animationsa2z.com/attachments/Image/snake/snake13.gif",
		alt: "csgakmod"

	};
	
	emoticons[":lewat:"] = {
		src: "https://dl.dropbox.com/u/80365335/KSK48/sekrip%20abuse/emot%20gerak/yukolewat.gif",
		alt: "csgakmod"
	};
	
	emoticons[":present:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/40.gif",
		alt: "csgakmod"
	};
	
	emoticons[":think:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/006.gif",
		alt: "csgakmod"
	};
	
	emoticons[";)"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/13.gif",
		alt: "csgakmod"
	};
	
	emoticons[":beer:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/smiley_beer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shakehand"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/49.gif",
		alt: "csgakmod"
	};

	emoticons[":shakehand2"] = {
		src: "http://kaskus.co.id/images/smilies/shakehand2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":breakheart"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/38.gif",
		alt: "csgakmod"
	};
	
	emoticons[":babi:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/27.gif",
		alt: "csgakmod"
	};
	
	emoticons[":Peace:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/005.gif",
		alt: "csgakmod"
	};
	
	emoticons[":o"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/07.gif",
		alt: "csgakmod"
	};
	
	emoticons[":afro:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/kribo.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost:"] = {
		src: "http://kaskus.co.id/images/smilies/fd_7.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bigo:"] = {
		src: "http://kaskus.co.id/images/smilies/fd_3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cd:"] = {
		src: "http://kaskus.co.id/images/smilies/fd_2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kts:"] = {
		src: "http://kaskus.co.id/images/smilies/fd_6.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nangis"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/mewek.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rate:"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/rate.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ht:"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/hotrit.gif",
		alt: "csgakmod"
	};
	
	emoticons[":salam"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/sungkem.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hope"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/hope.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu2"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/malu2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":pertamax"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/pertamax.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nerd"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/nerd.gif",
		alt: "csgakmod"
	};
	
	emoticons[":alay"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/alay.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendol2"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/cendol.gif",
		alt: "csgakmod"
	};
	emoticons[":kodok"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/iwig2a.gif",
		alt: "csgakmod"
	};
	emoticons[":lol"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/Lips.gif",
		alt: "csgakmod"
	};
	emoticons[":gitar"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/Guitar.gif",
		alt: "csgakmod"
	};
	emoticons[":joget"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/nari2.gif",
		alt: "csgakmod"
	};
	emoticons[":kapak"] = {
		src: "http://i43.tinypic.com/2q354j9.gif",
		alt: "csgakmod"
	};
	emoticons[":metal"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/Punk.gif",
		alt: "csgakmod"
	};
	emoticons[":malu3"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/malu2.gif",
		alt: "csgakmod"
	};
	emoticons[":pisang"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/party0010.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tai:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/shit-3.gif",
		alt: "csgakmod"
	}
		
	emoticons[":rate1:"] = {
		src: "http://kaskus.co.id/images/rating/rating_1.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate2:"] = {
		src: "http://kaskus.co.id/images/rating/rating_2.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate3:"] = {
		src: "http://kaskus.co.id/images/rating/rating_3.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate4:"] = {
		src: "http://kaskus.co.id/images/rating/rating_4.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate5:"] = {
		src: "http://kaskus.co.id/images/rating/rating_5.gif",
		alt: "csgakmod"
	}
	
	emoticons[":dp"] = {
		src: "http://kaskus.co.id/images/smilies/dp.gif",
		alt: "csgakmod"
	}
	
	emoticons[":selamat"] = {
		src: "http://kaskus.co.id/images/smilies/selamat.gif",
		alt: "csgakmod"
	}
	
	emoticons[":2thumbup"] = {
		src: "http://kaskus.co.id/images/smilies/jempol2.gif",
		alt: "csgakmod"
	}
	
	emoticons[":thumbup"] = {
		src: "http://kaskus.co.id/images/smilies/jempol1.gif",
		alt: "csgakmod"
	}

	emoticons[":thumbup:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/47.gif",
		alt: "csgakmod"
	};
	
	emoticons[":metal:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/q17.gif",
		alt: "csgakmod"
	};

	emoticons[":hi:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/hi.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hi:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/hi.gif",
		alt: "csgakmod"
	};

	emoticons[":peluk"] = {
		src: "http://kaskus.co.id/images/smilies/peluk.gif",
		alt: "csgakmod"
	};
	
	emoticons[":anjing:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/29.gif",
		alt: "csgakmod"
	};

	emoticons[":moon:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/007.gif",
		alt: "csgakmod"
	};
	
	emoticons[":baby:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/30.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kucing:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/28.gif",
		alt: "csgakmod"
	};
	
	emoticons[":norose:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/35.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ricebowl:"] = {
		src: "http://kaskus.co.id/images/smilies/sumbangan/32.gif",
		alt: "csgakmod"
	};
	emoticons[":mewek"] = {
		src: "http://kaskus.co.id/images/smilies/mewek.gif",
		alt: "csgakmod"
	};
	emoticons[":angel"] = {
		src: "http://kaskus.co.id/images/smilies/angel1.gif",
		alt: "csgakmod"
	};
	emoticons[":matabelo"] = {
		src: "http://kaskus.co.id/images/smilies/matabelo1.gif",
		alt: "csgakmod"
	};
	emoticons[":request"] = {
		src: "http://static.kaskus.co.id/images/smilies/request.gif",
		alt: "csgakmod"
	};
	emoticons[":kr"] = {
		src: "http://static.kaskus.co.id/images/smilies/kaskus_radio.gif",
		alt: "csgakmod"
	};
	emoticons[":nohope"] = {
		src: "http://static.kaskus.co.id/images/smilies/nohope.gif",
		alt: "csgakmod"

	};
	emoticons[":sorry"] = {
		src: "http://static.kaskus.co.id/images/smilies/sorry.gif",
		alt: "csgakmod"

                };
 	emoticons[":2nyanfuu"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/2nyanfuu.gif",
		alt: "sherzganteng"

	};
        emoticons[":bakayuria"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/bakayuria.gif",
		alt: "sherzganteng"

	};
	emoticons[":lemon"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/furesulemon.gif",
		alt: "sherzganteng"

	};
	emoticons[":jgetsemua"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/joget-semua.gif",
		alt: "sherzganteng"

	};
	emoticons[":makan"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/makan.gif",
		alt: "sherzganteng"

	};
	emoticons[":muter"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/muter.gif",
		alt: "sherzganteng"

	};
	emoticons[":nyanfuu"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/nyanfuu.jpg",
		alt: "sherzganteng"

        };
	emoticons[":mungil"] = {
		src: "http://dl.dropbox.com/u/81340284/wasa.png",
		alt: "sherzganteng"

	};
	emoticons[":ranranfuu"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/ranranfuu.jpg",
		alt: "sherzganteng"

	};
	emoticons[":shotafuu"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/shotafuu.jpg",
		alt: "sherzganteng"

	};
	emoticons[":yukifuu"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/yukifuu.jpg",
		alt: "sherzganteng"

	};
	emoticons[":troll"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/troll.png",
		alt: "sherzganteng"

        };
	emoticons[":abuget1:"] = {
		src: "http://dl.dropbox.com/u/80365335/KSK48/sekrip%20abuse/emot%20gerak/abuget1.gif"

        };
	emoticons[":abuget2:"] = {
		src: "http://dl.dropbox.com/u/80365335/KSK48/sekrip%20abuse/emot%20gerak/abuget2.gif"


	};
	emoticons[":cilukba"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/cilukba.gif",
		alt: "sherzganteng"

	};
        emoticons[":ciumkumiin"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/ciumkumiin.gif",
		alt: "sherzganteng"

	};
        emoticons[":clear"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/clear.gif",
		alt: "sherzganteng"

	};
        emoticons[":cometome"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/cometome.gif",
		alt: "sherzganteng"

	};
        emoticons[":eskrim"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/eskrim.gif",
		alt: "sherzganteng"

	};
        emoticons[":grrr"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/grrr.gif",
		alt: "sherzganteng"

	};
        emoticons[":hujanbunga"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/hujanbunga.gif",
		alt: "sherzganteng"

	};
        emoticons[":jujukaget"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/jujukaget.gif",
		alt: "sherzganteng"

	};
        emoticons[":ngantuk"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/ngantuk.gif",
		alt: "sherzganteng"

	};
        emoticons[":ngeyek"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/ngeyek.gif",
		alt: "sherzganteng"

	};
        emoticons[":nyanyi"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/nyanyi.gif",
		alt: "sherzganteng"

	};
        emoticons[":sasshireborn"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/sasshireborn.gif",
		alt: "sherzganteng"

	};
        emoticons[":ssstt"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/ssstt.gif",
		alt: "sherzganteng"

	};
        emoticons[":tarik"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/tarik.gif",
		alt: "sherzganteng"

	};
        emoticons[":tarik2"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/tarik2.gif",
		alt: "sherzganteng"

	};
        emoticons[":terpesona"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/terpesona.gif",
		alt: "sherzganteng"

	};
        emoticons[":yukikaget"] = {
		src: "https://dl.dropbox.com/u/22725508/script%20emot/120811-1707/yukikaget.gif",
		alt: "sherzganteng"

	};
        emoticons[":ngocop:"] = {
		src: "http://2.bp.blogspot.com/_fMCd4YHM8F4/TUUTivXkXdI/AAAAAAAAAuk/1bezCGo_rjs/s1600/emot-pocongkkkkkkkk-kecil-ketawa-ngakak-by-shudai-ajlani.gif",
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