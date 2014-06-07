// ==UserScript==
// @name           Required Statusbooks Scripts (Chrome)
// @namespace      http://www.antarnisti.com
// @description    The Required Script for Statusbooks - Kaskus Emoticon (Chrome)
// @include        http://www.statusbooks.com/*
// @include	   http://statusbooks.com/*
// ==/UserScript==
//
//      -KaskuS- Emoticons Relased
//      
//      Copyleft 2011 Tom Antarnisti <antarnisti@speednet.co.id>
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
//		Script ini dimodifikasi berdasarkan script serupa untuk Facebook, oleh:
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
	emoticons[":addfriends"] = {
		src: "http://static.kaskus.us/images/smilies/add-friend-kecil.gif",
		alt=":addfriends"
	};

	emoticons[":bookmarks"] = {
		src: "http://static.kaskus.us/images/smilies/bookmark-kecil.gif",
		alt=":bookmarks"
	};

	emoticons[":berbusas"] = {
		src: "http://static.kaskus.us/images/smilies/berbusa-kecil.gif",
		alt=":berbusas"
	};

	emoticons[":shutups"] = {
		src: "http://static.kaskus.us/images/smilies/shutup-kecil.gif",
		alt=":shutups"
	};

	emoticons[":armys"] = {
		src: "http://static.kaskus.us/images/smilies/army-kecil.gif",
		alt=":armys"
	};

	emoticons[":cendolb"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_cendol.gif",
		alt=":cendolb"
	};

	emoticons[":bata"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_batamerah.gif",
		alt=":bata"
	};

	emoticons[":)b"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_smile.gif",
		alt=":)b"
	};

	emoticons[":Yb"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_peace.gif",
		alt=":Yb"
	};

	emoticons[":cendols"] = {
		src: "http://static.kaskus.us/images/smilies/cendols.gif",
		alt=":cendols"
	};

	emoticons[":batas"] = {
		src: "http://static.kaskus.us/images/smilies/batas.gif",
		alt=":batas"
	};

	emoticons[":iloveindonesias"] = {
		src: "http://static.kaskus.us/images/smilies/iloveindonesias.gif",
		alt=":iloveindonesias"
	};

	emoticons[":cekpms"] = {
		src: "http://static.kaskus.us/images/smilies/cekpms.gif",
		alt=":cekpms"
	};

	emoticons[":berdukas"] = {
		src: "http://static.kaskus.us/images/smilies/berdukas.gif",
		alt=":berdukas"
	};

	emoticons[":capedes"] = {
		src: "http://static.kaskus.us/images/smilies/capedes.gif",
		alt=":capedes"
	};

	emoticons[":bingungs"] = {
		src: "http://static.kaskus.us/images/smilies/bingungs.gif",
		alt=":bingungs"
	};

	emoticons[":mahos"] = {
		src: "http://static.kaskus.us/images/smilies/mahos.gif",
		alt=":mahos"
	};

	emoticons[":najiss"] = {
		src: "http://static.kaskus.us/images/smilies/najiss.gif",
		alt=":najiss"
	};

	emoticons[":malus"] = {
		src: "http://static.kaskus.us/images/smilies/malus.gif",
		alt=":malus"
	};

	emoticons[":ilovekaskuss"] = {
		src: "http://static.kaskus.us/images/smilies/iluvkaskuss.gif",
		alt=":ilovekaskuss"
	};

	emoticons[":kisss"] = {
		src: "http://static.kaskus.us/images/smilies/kisss.gif",
		alt=":kisss"
	};

	emoticons[":mads"] = {
		src: "http://static.kaskus.us/images/smilies/mads.gif",
		alt=":mads"
	};

	emoticons[":ngakaks"] = {
		src: "http://static.kaskus.us/images/smilies/ngakaks.gif",
		alt=":ngakaks"
	};

	emoticons[":sundulgans"] = {
		src: "http://static.kaskus.us/images/smilies/sundulgans.gif",
		alt=":sundulgans"
	};

	emoticons[":takuts"] = {
		src: "http://static.kaskus.us/images/smilies/takuts.gif",
		alt=":takuts"
	};

	emoticons[":hammers"] = {
		src: "http://static.kaskus.us/images/smilies/hammers.gif",
		alt=":hammers"
	};

	emoticons[":reposts"] = {
		src: "http://static.kaskus.us/images/smilies/reposts.gif",
		alt=":reposts"
	};

	emoticons[":iloveindonesia"] = {
		src: "http://static.kaskus.us/images/smilies/I-Luv-Indonesia.gif",
		alt=":iloveindonesia"
	};

	emoticons[":ilovekaskus"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_ilovekaskus.gif",
		alt=":ilovekaskus"
	};

	emoticons[":kiss"] = {
		src: "http://static.kaskus.us/images/smilies/cewek.gif",
		alt=":kiss"
	};

	emoticons[":maho"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_maho.gif",
		alt=":maho"
	};

	emoticons[":najis"] = {
		src: "http://static.kaskus.us/images/smilies/najis.gif",
		alt=":najis"
	};

	emoticons[":nosara"] = {
		src: "http://static.kaskus.us/images/smilies/nosara.gif",
		alt=":nosara"
	};

	emoticons[":marah"] = {
		src: "http://static.kaskus.us/images/smilies/marah.gif",
		alt=":marah"
	};

	emoticons[":berduka"] = {
		src: "http://static.kaskus.us/images/smilies/berduka.gif",
		alt=":berduka"
	};

	emoticons[":malu"] = {
		src: "http://static.kaskus.us/images/smilies/malu.gif",
		alt=":malu"
	};

	emoticons[":ngakak"] = {
		src: "http://static.kaskus.us/images/smilies/ngakak.gif",
		alt=":ngakak"
	};

	emoticons[":repost"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_repost1.gif",
		alt=":repost"
	};

	emoticons[":repost2"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_repost2.gif",
		alt=":repost2"
	};

	emoticons[":sup2:"] = {
		src: "http://static.kaskus.us/images/smilies/sundul.gif",
		alt=":sup2:"
	};

	emoticons[":cendolbig"] = {
		src: "http://static.kaskus.us/images/smilies/s_big_cendol.gif",
		alt=":cendolbig"
	};

	emoticons[":batabig"] = {
		src: "http://static.kaskus.us/images/smilies/s_big_batamerah.gif",
		alt=":batabig"
	};

	emoticons[":recsel"] = {
		src: "http://static.kaskus.us/images/smilies/recseller.gif",
		alt=":recsel"
	};

	emoticons[":takut"] = {
		src: "http://static.kaskus.us/images/smilies/takut.gif",
		alt=":takut"
	};

	emoticons[":ngacir2"] = {
		src: "http://static.kaskus.us/images/smilies/ngacir2.gif",
		alt=":ngacir2"
	};

	emoticons[":shakehand2"] = {
		src: "http://static.kaskus.us/images/smilies/shakehand2.gif",
		alt=":shakehand2"
	};

	emoticons[":bingung"] = {
		src: "http://static.kaskus.us/images/smilies/bingung.gif",
		alt=":bingung"
	};

	emoticons[":cekpm"] = {
		src: "http://static.kaskus.us/images/smilies/cekpm.gif",
		alt=":cekpm"
	};

	emoticons[":cd"] = {
		src: "http://static.kaskus.us/images/smilies/capede.gif",
		alt=":cd"
	};

	emoticons[":hammer"] = {
		src: "http://static.kaskus.us/images/smilies/hammer.gif",
		alt=":hammer"
	};

	emoticons[":peluk"] = {
		src: "http://static.kaskus.us/images/smilies/peluk.gif",
		alt=":peluk"
	};

	emoticons[":toast"] = {
		src: "http://static.kaskus.us/images/smilies/toastcendol.gif",
		alt=":toast"
	};

	emoticons[":hoax"] = {
		src: "http://static.kaskus.us/images/smilies/hoax.gif",
		alt=":hoax"
	};

	emoticons[":cystg"] = {
		src: "http://static.kaskus.us/images/smilies/cystg.gif",
		alt=":cystg"
	};

	emoticons[":dp"] = {
		src: "http://static.kaskus.us/images/smilies/dp.gif",
		alt=":dp"
	};

	emoticons[":selamat"] = {
		src: "http://static.kaskus.us/images/smilies/selamat.gif",
		alt=":selamat"
	};

	emoticons[":thumbup"] = {
		src: "http://static.kaskus.us/images/smilies/jempol1.gif",
		alt=":thumbup"
	};

	emoticons[":2thumbup"] = {
		src: "http://static.kaskus.us/images/smilies/jempol2.gif",
		alt=":2thumbup"
	};

	emoticons[":angel"] = {
		src: "http://static.kaskus.us/images/smilies/angel1.gif",
		alt=":angel"
	};

	emoticons[":matabelo"] = {
		src: "http://static.kaskus.us/images/smilies/matabelo1.gif",
		alt=":matabelo"
	};

	emoticons[":mewek"] = {
		src: "http://static.kaskus.us/images/smilies/mewek.gif",
		alt=":mewek"
	};

	emoticons[":request"] = {
		src: "http://static.kaskus.us/images/smilies/request.gif",
		alt=":request"
	};

	emoticons[":babyboy"] = {
		src: "http://static.kaskus.us/images/smilies/babyboy.gif",
		alt=":babyboy"
	};

	emoticons[":babyboy1"] = {
		src: "http://static.kaskus.us/images/smilies/babyboy1.gif",
		alt=":babyboy1"
	};

	emoticons[":babygirl"] = {
		src: "http://static.kaskus.us/images/smilies/babygirl.gif",
		alt=":babygirl"
	};

	emoticons[":sorry"] = {
		src: "http://static.kaskus.us/images/smilies/sorry.gif",
		alt=":sorry"
	};

	emoticons[":kr"] = {
		src: "http://static.kaskus.us/images/smilies/kaskus_radio.gif",
		alt=":kr"
	};

	emoticons[":travel"] = {
		src: "http://static.kaskus.us/images/smilies/traveller.gif",
		alt=":travel"
	};

	emoticons[":nohope"] = {
		src: "http://static.kaskus.us/images/smilies/nohope.gif",
		alt=":nohope"
	};

	emoticons[":kimpoi"] = {
		src: "http://static.kaskus.us/images/smilies/kimpoi.gif",
		alt=":kimpoi"
	};

	emoticons[":ngacir"] = {
		src: "http://static.kaskus.us/images/smilies/ngacir3.gif",
		alt=":ngacir"
	};

	emoticons[":ultah"] = {
		src: "http://static.kaskus.us/images/smilies/ultah.gif",
		alt=":ultah"
	};

	emoticons[":salahkamar"] = {
		src: "http://static.kaskus.us/images/smilies/salah_kamar.gif",
		alt=":salahkamar"
	};

	emoticons[":rate5"] = {
		src: "http://static.kaskus.us/images/smilies/rate5.gif",
		alt=":rate5"
	};

	emoticons[":cool"] = {
		src: "http://static.kaskus.us/images/smilies/cool2.gif",
		alt=":cool"
	};

	emoticons[":bola"] = {
		src: "http://static.kaskus.us/images/smilies/bola.gif",
		alt=":bola"
	};

	emoticons[":hn"] = {
		src: "http://static.kaskus.us/images/smilies/hotnews.gif",
		alt=":hn"
	};

	emoticons[":games"] = {
		src: "http://static.kaskus.us/images/smilies/games.gif",
		alt=":games"
	};

	emoticons[":jrb:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_1.gif",
		alt=":jrb:"
	};

	emoticons[":kts:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_6.gif",
		alt=":kts:"
	};

	emoticons[":sup:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_5.gif",
		alt=":sup:"
	};

	emoticons[":kbgt:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_4.gif",
		alt=":kbgt:"
	};

	emoticons[":kacau:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_8.gif",
		alt=":kacau:"
	};

	emoticons[":bigo:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_3.gif",
		alt=":bigo:"
	};

	emoticons[":repost:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_7.gif",
		alt=":repost:"
	};

	emoticons[":cd:"] = {"] = {
		src: "http://static.kaskus.us/images/smilies/fd_2.gif",
		alt=":cd:"
	};

	emoticons[":Peace:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/005.gif",
		alt=":Peace:"
	};

	emoticons[":thumbdown"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/48.gif",
		alt=":thumbdown"
	};

	emoticons[":metal:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/q17.gif",
		alt=":metal:"
	};

	emoticons[":heart:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/37.gif",
		alt=":heart:"
	};

	emoticons[":o"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/07.gif",
		alt=":o"
	};

	emoticons[":linux2:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/26.gif",
		alt=":linux2:"
	};

	emoticons[":afro:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/kribo.gif",
		alt=":afro:"
	};

	emoticons[":matabelo:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/004.gif",
		alt=":matabelo:"
	};

	emoticons[":thumbup:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/47.gif",
		alt=":thumbup:"
	};

	emoticons[":tabrakan:"] = {
		src: "http://static.kaskus.us/images/smilies/tabrakan.gif",
		alt=":tabrakan:"
	};

	emoticons[":genit:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/q03.gif",
		alt=":genit:"
	};

	emoticons[":kissmouth"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/36.gif",
		alt=":kissmouth"
	};

	emoticons[":("] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/06.gif",
		alt=":("
	};

	emoticons[":linux1:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/25.gif",
		alt=":linux1:"
	};

	emoticons[":hi:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/hi.gif",
		alt=":hi:"
	};

	emoticons[":nohope:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/q11.gif",
		alt=":nohope:"
	};

	emoticons[":siul:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/020.gif",
		alt=":siul:"
	};

	emoticons[":malu:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/1.gif",
		alt=":malu:"
	};

	emoticons[":norose:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/35.gif",
		alt=":norose:"
	};

	emoticons[":)"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/15.gif",
		alt=":)"
	};

	emoticons[":army:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/24.gif",
		alt=":army:"
	};

	emoticons[":fuck3:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/fuck-8.gif",
		alt=":fuck3:"
	};

	emoticons[":Paws:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/paw.gif",
		alt=":Paws:"
	};

	emoticons[":doctor:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/18.gif",
		alt=":doctor:"
	};

	emoticons[":ngacir:"] = {
		src: "http://static.kaskus.us/images/smilies/ngacir.gif",
		alt=":ngacir:"
	};

	emoticons[":confused:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/7.gif",
		alt=":confused:"
	};

	emoticons[":rose:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/34.gif",
		alt=":rose:"
	};

	emoticons[":angel:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/017.gif",
		alt=":angel:"
	};

	emoticons[":fuck2:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/fuck-6.gif",
		alt=":fuck2:"
	};

	emoticons[":kagets:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/3.gif",
		alt=":kagets:"
	};

	emoticons[":tv:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/44.gif",
		alt=":tv:"
	};

	emoticons[":fm:"] = {
		src: "http://static.kaskus.us/images/smilies/smileyfm329wj.gif",
		alt=":fm:"
	};

	emoticons[":eek:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/4.gif",
		alt=":eek:"
	};

	emoticons[":medicine:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/33.gif",
		alt=":medicine:"
	};

	emoticons[":kissing:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/014.gif",
		alt=":kissing:"
	};

	emoticons[":fuck:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/fuck-4.gif",
		alt=":fuck:"
	};

	emoticons[":wowcantik"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/001.gif",
		alt=":wowcantik"
	};

	emoticons[":email:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/43.gif",
		alt=":email:"
	};

	emoticons[":ck"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/kaskuslove.gif",
		alt=":ck"
	};

	emoticons[":mad:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/12.gif",
		alt=":mad:"
	};

	emoticons[":ricebowl:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/32.gif",
		alt=":ricebowl:"
	};

	emoticons[":hammer:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/8.gif",
		alt=":hammer:"
	};

	emoticons[":flower:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/e03.gif",
		alt=":flower:"
	};

	emoticons[":buldog:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/woof.gif",
		alt=":buldog:"
	};

	emoticons[":clock:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/42.gif",
		alt=":clock:"
	};

	emoticons[":amazed:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/amazed.gif",
		alt=":amazed:"
	};

	emoticons[":rolleyes:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/01.gif",
		alt=":rolleyes:"
	};

	emoticons[":coffee:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/31.gif",
		alt=":coffee:"
	};

	emoticons[":sun:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/008.gif",
		alt=":sun:"
	};

	emoticons[":rainbow:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/e02.gif",
		alt=":rainbow:"
	};

	emoticons[":bikini:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/vana-bum-vanaweb-dot-com.gif",
		alt=":bikini:"
	};

	emoticons[":Phone:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/41.gif",
		alt=":Phone:"
	};

	emoticons[":cool:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/05.gif",
		alt=":cool:"
	};

	emoticons[":baby:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/30.gif",
		alt=":baby:"
	};

	emoticons[":gila:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/crazy.gif",
		alt=":gila:"
	};

	emoticons[":moon:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/007.gif",
		alt=":moon:"
	};

	emoticons[":rain:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/60.gif",
		alt=":rain:"
	};

	emoticons[":tai:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/shit-3.gif",
		alt=":tai:"
	};

	emoticons[":present:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/40.gif",
		alt=":present:"
	};

	emoticons[":p"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/6.gif",
		alt=":p"
	};

	emoticons[":anjing:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/29.gif",
		alt=":anjing:"
	};

	emoticons[":kimpoi:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/smiley_couple.gif",
		alt=":kimpoi:"
	};

	emoticons[":think:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/006.gif",
		alt=":think:"
	};

	emoticons[":exclamati"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/52.gif",
		alt=":exclamati"
	};

	emoticons[":Onigiri:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/rice.gif",
		alt=":Onigiri:"
	};

	emoticons[":table:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/39.gif",
		alt=":table:"
	};

	emoticons[";)"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/13.gif",
		alt=";)"
	};

	emoticons[":kucing:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/28.gif",
		alt=":kucing:"
	};

	emoticons[":beer:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/smiley_beer.gif",
		alt=":beer:"
	};

	emoticons[":shutup:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/5.gif",
		alt=":shutup:"
	};

	emoticons[":shakehand"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/49.gif",
		alt=":shakehand"
	};

	emoticons[":berbusa:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/q20.gif",
		alt=":berbusa:"
	};

	emoticons[":breakheart"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/38.gif",
		alt=":breakheart"
	};

	emoticons[":D"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/14.gif",
		alt=":D"
	};

	emoticons[":babi:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/27.gif",
		alt=":babi:"
	};

	emoticons[":frog:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/frog.gif",
		alt=":frog:"
	};

	emoticons[":bingung:"] = {
		src: "http://static.kaskus.us/images/smilies/bolakbalik.gif",
		alt=":bingung:"
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
