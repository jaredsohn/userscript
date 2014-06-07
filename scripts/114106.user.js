// ==UserScript==
// @name           Data Base Smiley Cyber Code
// @namespace      http://www.cybercode.biz/
// @description    Data Base Smiley Cyber Code
// @include        http://www.facebook.com/*
// ==/UserScript==
//
//      -KaskuS- Emoticons Relased
//      
//      Copyright 2010 Fadilz <fadilz@null.net>
//      edited by http://www.facebook.com/sukariasa
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



	//////////////////////////KASKUS/////////////////////////////////
	
	emoticons[":maho"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/maho.gif",
		alt: "csgakmod"
	};
	
	emoticons[":games"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/games.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sorry"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/sorry.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berduka"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/berduka.gif",
		alt: "csgakmod"
	};

	emoticons[":nosara"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/nosara.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kts:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/kts.gif",
		alt: "csgakmod"
	};

	emoticons[":dp"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/dp.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shakehand2"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/shakehand2.gif",
		alt: "csgakmod"
	};

	emoticons[":batabig"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/batabig.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nohope"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/nohope.gif",
		alt: "csgakmod"
	};

	emoticons[":kr"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/kr.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cystg"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/cystg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":selamat"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/selamat.gif",
		alt: "csgakmod"
	};
	
	emoticons[":babygirl"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/babygirl.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/ngakak.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kiss"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/kiss.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":ultah"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/ultah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cool"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/cool.gif",
		alt: "csgakmod"
	};
	
	emoticons[":salahkamar"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/salahkamar.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":babyboy1"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/babyboy1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngacir2"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/ngacir2.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":kawin"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/kawin.gif",
		alt: "csgakmod"
	};
	
	emoticons[":traveller"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/traveller.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":cendolbig"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/cendolbig.gif",
		alt: "csgakmod"
	};
	
	
	emoticons["	:request"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/request.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":babyboy"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/babyboy.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":ngacir"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/ngacir.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":kacau:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/kacau.gif",
		alt: "csgakmod"
	};
	
	emoticons[":toast"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/toast.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpm"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/cekpm.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":repost:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/repost3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":angel"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/angel.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":najis"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/najis.gif",
		alt: "csgakmod"
	};
	
	emoticons[":jrb:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/jrb.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":thumbup"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/thumbup.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":cd:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/cd1.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":repost2"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/repost2.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":2thumbup"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/2thumbup.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":mewek"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/mewek.gif",
		alt: "csgakmod"
	};
	
	emoticons[":iloveindonesia"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/iloveindonesia.gif",
		alt: "csgakmod"
	};
	
	emoticons[":telkomsel"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/telkomsel.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":cd"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/cd.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/repost.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":matabelo"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/matabelo.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hoax"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/hoax.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":takut"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/takut.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":bola"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/bola.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":recsel"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/recsel.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":marah"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/marah.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":hn"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/hn.gif",
		alt: "csgakmod"
	};
	
	emoticons[":toast"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/toast.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpm"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/cekpm.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":sup2:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/sup2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bingung"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/bingung.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":rate5"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/rate5.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/malu.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":hammer"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/hammer.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":sup:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/sup.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":bigo:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/bigo.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":peluk"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/Kaskus/peluk.gif",
		alt: "csgakmod"
	};
	
	
	

////////////////////kaskus Small//////////////////////////////	
	

	
	emoticons[":reposts"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/reposts.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpms"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/cekpms.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakaks"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/ngakaks.gif",
		alt: "csgakmod"
	};
	
	emoticons[":capedes"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/capedes.gif",
		alt: "csgakmod"
	};
	
	emoticons[":najiss"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/najiss.gif",
		alt: "csgakmod"
	};
	emoticons[":bingungs"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/bingungs.gif",
		alt: "csgakmod"
	};
	emoticons[":mahos"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/mahos.gif",
		alt: "csgakmod"
	};
	emoticons[":batas"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/batas.gif",
		alt: "csgakmod"
	};
	emoticons[":mads"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/mads.gif",
		alt: "csgakmod"
	};
	emoticons[":bata"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/bata.gif",
		alt: "csgakmod"
	};
	emoticons[":kisss"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/kisss.gif",
		alt: "csgakmod"
	};
	emoticons[":)b"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/b.gif",
		alt: "csgakmod"
	};
	emoticons[":iloveindonesias"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/iloveindonesias.gif",
		alt: "csgakmod"
	};
	
	emoticons[":Yb"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/Yb.gif",
		alt: "csgakmod"
	};
		
	emoticons[":hammers"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/hammers.gif",
		alt: "csgakmod"
	};
	
	emoticons[":takuts"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/takuts.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendols"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/cendols.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sundulgans"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/sundulgans.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendolb"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/cendolb.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malus"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/malus.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berdukas"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskussmall/berdukas.gif",
		alt: "csgakmod"
	};
	
	
	
	///////////kaskus standard////////////////////////////////////
	
	emoticons[":ricebowl:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/ricebowl.gif",
		alt: "csgakmod"
	};
	
	emoticons[":exclamati"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/exclamati.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nohope:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/nohope.gif",
		alt: "csgakmod"
	};
	


	emoticons[":mad:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/mad.gif",
		alt: "csgakmod"
	};
	
	emoticons[":beer:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/beer.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":wowcantik"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/wowcantik.gif",
		alt: "csgakmod"
	};
	
	emoticons[":doctor:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/doctor.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":shakehand"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/shakehand.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":Onigiri:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/Onigiri.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":("] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/(.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":gila:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/gila.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":linux2:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/linux2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berbusa:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/berbusa.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tv:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/tv.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":eek:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/eek.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rose:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/rose.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":o"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/o.gif",
		alt: "csgakmod"
	};
	
	emoticons[";)"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/)).gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":hammer:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/hammer.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":linux1:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/linux1.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":bikini:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/bikini.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":thumbup:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/thumbup.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":email:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/email.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rolleyes:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/rolleyes.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":norose:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/norose.gif",
		alt: "csgakmod"
	};
	
	emoticons[":)"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/).gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":heart:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/heart.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":kucing:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/kucing.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":bingung:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/bingung.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":thumbdown"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/thumbdown.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":afro:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/afro.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kissmouth"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/kissmouth.gif",
		alt: "csgakmod"
	};
	
	emoticons[":breakheart"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/breakheart.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":think:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/think.gif",
		alt: "csgakmod"
	};
	
	emoticons[":flower:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/flower.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":rainbow:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/rainbow.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngacir:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/ngacir.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":amazed:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/amazed.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":kissing:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/kissing.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":buldog:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/buldog.giff",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":tai:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/tai.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":fm:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/fm.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rain:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/rain.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":moon:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/moon.gif",
		alt: "csgakmod"
	};
	
	emoticons[":angel:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/angel.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":kawin:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/kawin.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":clock:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/clock.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":tabrakan:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/tabrakan.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":frog:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/frog.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":present:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/present.gif",
		alt: "csgakmod"
	};
	
	emoticons[":metal:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/metal.gif",
		alt: "csgakmod"
	};
	
	emoticons[":anjing:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/anjing.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":kagets:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/kagets.gif",
		alt: "csgakmod"
	};
	
	emoticons[":coffee:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/coffee.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":table:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/table.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/fuck.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":Phone:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/Phone.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":medicine:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/medicine.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":army:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/army.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":hi:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/hi.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":confused:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/confused.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sun:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/sun.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":fuck2:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/fuck2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":Peace:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/Peace.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":matabelo:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/matabelo.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":babi:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/babi.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":cool:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/cool.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":siul:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/siul.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":fuck3:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/fuck3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":Paws:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/Paws.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/malu.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":baby:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/baby.gif",
		alt: "csgakmod"
	};
	
	emoticons[":D"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/D.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":shutup:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/shutup.gif",
		alt: "csgakmod"
	};
	
	emoticons[":p"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/p.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":genit:"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/kaskusstandard/genit.gif",
		alt: "csgakmod"
	};
	
	
	
	
	
	////////////////////////////////////////MAHOS////////////////////////////////////////////////////////
	emoticons[":mahobego2"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/rxvmmqtr.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahobego"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/1igydljv.gif",
		alt: "csgakmod"
	};
	
	emoticons[":salammaho"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/ruuf1vt1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahofuck"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/lmmzx1tg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahohammer"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/0xpY4d4a413c8a832.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahonajis"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/nViH4d4a420819154.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahongakak"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/mcB04d4a420f70979.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahoberduka"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/us5su9hz.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahomatabelo"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/VEh44d4a41bb2f0a8.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahonyundul"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/amhnnynr.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahotakut"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/2besowo6.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahobaby"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/5xgL4d4a4105b539b.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahonangis"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/p8xbgwij.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahomewek"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/Iwxt4d4a4201d97ae.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maholinux"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/qssika7r.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahongaceng"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/ukesf2ka.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahorecsel"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/kbUn4d4a4216e620d.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahorepost"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/hi8vy50w.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maho2thumb"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/HWEi4d4a415458015.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahongacir"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/phzfiadm.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahobata"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/grnF4d4a40223adb0.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahobrand"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/avatar2045707_2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahoindo"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/zx1J4d4a414597965.gif",
		alt: "csgakmod"
	};
	emoticons[":mahobaby2"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/Pzxi4d4a4018d99ee.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahothumb"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/9hPp4d4a414cee67c.gif",
		alt: "csgakmod"
	};
	
	emoticons[":timpukmaho"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/AccJ4d4a41b232f2b.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahodp"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/IcWZ4d4a402ab92ff.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahonyedot"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/qarb4hrf.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tabrakmaho"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/j3gebv4b.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maholpg"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/qky4mjlu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahobenjol"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/lebe-lebe.blogspot.com%20hgjsd.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahogm"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/lebe-lebe.blogspot.com%20tyfjgfyjg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":dagangmaho"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/irbswx6o.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hormatmaho"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/rm6ph4fp.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahokabur"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/s5gte4fw.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahonani"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/ortp5ppn.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahogitar"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/yr7efolo.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahodor"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/maho/mah0ak472.gif",
		alt: "csgakmod"
	};
	
	/////////////////////////////////////////////NGAKAK///////////////////////////////////////////////////
	emoticons[":ngakakcaramel"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/Orange_Emoticon_Caramelldansen_by_ardrie123.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakaka"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/ngakaka.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakw"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/nbas8mdh.gif",
		alt: "csgakmod"
	};
	
	emoticons[":wkwkwk"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/n5.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakular"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/lebe-lebe.blogspot.com%2017.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakjakson"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/cm87f2qf.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakterbalik"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/b9p5r4qn.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakgondrong"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/wn8zka5z.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak2thumb"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/avatar2686012_2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakrepost"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/vhjv6i2g.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakputar"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/avatar2596878_1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakdp"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/uy4fbadk.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak2g"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/52excljpg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakompong"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/th_lebe-lebeblogspotcom-1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak1"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/ngakak/3ahakuai.gif",
		alt: "csgakmod"
	};
	
	
	
	
///////////////////////////////////Miss Bone//////////////////////////////////////	
	
	
	
	emoticons[":sedih"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-33.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tua"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-188.gif",
		alt: "csgakmod"
	};
	
	emoticons[":santai"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-129.gif",
		alt: "csgakmod"
	};
	
	emoticons[":iyaya"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-76.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tailo"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/old-pervert-14.gif",
		alt: "csgakmod"
	};
	
	emoticons[":banting"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-31.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ulat"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-187.gif",
		alt: "csgakmod"
	};
	
	emoticons[":harapan"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-128.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mandi"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-74.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ide"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-266.gif",
		alt: "csgakmod"
	};
	
	emoticons[":what"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-22.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bunuhdiri"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-184.gif",
		alt: "csgakmod"
	};
	
	emoticons[":missnyundul"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-126.gif",
		alt: "csgakmod"
	};
	
	emoticons[":love"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-69.gif",
		alt: "csgakmod"
	};
	
	emoticons[":suntik"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-262.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ckckck"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-21.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hajar"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-164.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nyerah"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-118.gif",
		alt: "csgakmod"
	};
	
	emoticons[":missngacir"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-68.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malubanget"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-260.gif",
		alt: "csgakmod"
	};
	
	emoticons[":misshansip"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-18.gif",
		alt: "csgakmod"
	};
	
	emoticons[":muntah"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-162.gif",
		alt: "csgakmod"
	};
	
	emoticons[":minta"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-109.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hikhikhik"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-64.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sudahlah"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-250.gif",
		alt: "csgakmod"
	};
	
	emoticons[":merah"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-16.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tolol"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-161.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tinju"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-108.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bacok"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-53.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maudong"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-245.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sunat"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/20kvua.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sini"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-156.gif",
		alt: "csgakmod"
	};
	
	emoticons[":misshammer"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-89.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gawat"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-45.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nangis"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-201.gif",
		alt: "csgakmod"
	};
	
	emoticons[":missgoyang"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-147.gif",
		alt: "csgakmod"
	};
	
	emoticons[":top"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-88.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gunting"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-41.gif",
		alt: "csgakmod"
	};
	
	emoticons[":musiksantai"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-200.gif",
		alt: "csgakmod"
	};
	
	emoticons[":wow"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-146.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ampun"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-84.gif",
		alt: "csgakmod"
	};

	emoticons[":malubunga"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-39.gif",
		alt: "csgakmod"
	};
	
	emoticons[":lovely"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-195.gif",
		alt: "csgakmod"
	};
	
	emoticons[":makan"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-138.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rahasia"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-83.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngecrot"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/old-pervert-95.gif",
		alt: "csgakmod"
	};
	
	emoticons[":asah"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-36.gif",
		alt: "csgakmod"
	};
	
	emoticons[":jurussakit1000th"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-189.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hi"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-134.gif",
		alt: "csgakmod"
	};
	
	emoticons[":pis"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/miss-bone-80.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahotua"] = {
		src: "http://www.cybercode.biz/forum/public/style_emoticons/default/MissBone/old-pervert-46.gif",
		alt: "csgakmod"
	};






//////new/////
	emoticons[":mj:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/mj.gif",
		alt: "csgakmod"
	};

	emoticons[":malu2:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/malu2.gif",
		alt: "csgakmod"
	};

	emoticons[":nerd:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/nerd.gif",
		alt: "csgakmod"
	};

	emoticons[":mewek:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/mewek.gif",
		alt: "csgakmod"
	};

	emoticons[":lapar"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/lapar.gif",
		alt: "csgakmod"
	};

	emoticons[":thanks"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/thanks2.gif",
		alt: "csgakmod"
	};

	emoticons[":siul"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/siul.gif",
		alt: "csgakmod"
	};

	emoticons[":sungkem"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/sungkem.gif",
		alt: "csgakmod"
	};

	emoticons["=))"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/66.gif",
		alt: "csgakmod"
	};

	emoticons[":wanipiro:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/wanipiro.gif",
		alt: "csgakmod"
	};

	emoticons[":bisik:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/bisik.gif",
		alt: "csgakmod"
	};

	emoticons[":2good:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/2good.gif",
		alt: "csgakmod"
	};

	emoticons[":mahongintip:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/mahongintip.gif",
		alt: "csgakmod"
	};

	emoticons[":copaser:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/copaser.gif",
		alt: "csgakmod"
	};

	emoticons[":asik:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/asik.gif",
		alt: "csgakmod"
	};

	emoticons[":mau:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/mau.gif",
		alt: "csgakmod"
	};

	emoticons[":cool2:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/cool.gif",
		alt: "csgakmod"
	};

	emoticons[":bonyok:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/bonyok.gif",
		alt: "csgakmod"
	};

	emoticons[":finger:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/finger.gif",
		alt: "csgakmod"
	};

	emoticons[":klik:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/klik.gif",
		alt: "csgakmod"
	};

	emoticons[":klik:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/klik.gif",
		alt: "csgakmod"
	};

	emoticons[":likes:"] = {
		src: "http://cybercode.biz/forum/public/style_emoticons/default/likes.gif",
		alt: "csgakmod"
	};









/////hidden/////
	emoticons[":misscool"] = {
		src: "http://emo.s2u.vn/DemonSkeleton/emo.s2u.vn_032.gif",
		alt: "csgakmod"
	};

        emoticons[":nangisbugil"] = {
		src: "http://www.cute-factor.com/forum/public/style_emoticons/default/missbone/old-pervert-88.gif",
		alt: "csgakmod"
	};

        emoticons[":feelmissing"] = {
		src: "http://www.cute-factor.com/forum/public/style_emoticons/default/missbone/miss-bone-165.gif",
		alt: "csgakmod"
	};

        emoticons[":lagicoli"] = {
		src: "http://www.cute-factor.com/forum/public/style_emoticons/default/missbone/pig-maniac-24.gif",
		alt: "csgakmod"
	};

emoticons[":missmalu"] = {
		src: "http://www.cute-factor.com/forum/public/style_emoticons/default/missbone/miss-bone-86.gif",
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
	
	if (o1.emoticon < o2.emoticon) 
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
