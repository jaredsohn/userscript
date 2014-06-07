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
	emoticons[":ikhwan"] = {
		src: "http://dia.muk.su/emoticon/ikhwan.gif",
		alt: "csgakmod"
	};
	
	emoticons[":poca"] = {
		src: "http://dia.muk.su/emoticon/poca.gif",
		alt: "csgakmod"
	};

	emoticons[":alis"] = {
		src: "http://dia.muk.su/emoticon/alis.gif",
		alt: "csgakmod"
	};

	emoticons[":amitaba"] = {
		src: "http://dia.muk.su/emoticon/amitaba.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ancur"] = {
		src: "http://dia.muk.su/emoticon/ancur.gif",
		alt: "csgakmod"
	};	
	
	emoticons[":angguk"] = {
		src: "http://dia.muk.su/emoticon/angguk.gif",
		alt: "csgakmod"
	};

	emoticons[":angguk2"] = {
		src: "http://dia.muk.su/emoticon/angguk2.gif",
		alt: "csgakmod"
	};	
	
	emoticons[":angin2"] = {
		src: "http://dia.muk.su/emoticon/angin2.gif",
		alt: "csgakmod"
	};	

	emoticons[":angindingin"] = {
		src: "http://dia.muk.su/emoticon/angindingin.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ayo1"] = {
		src: "http://dia.muk.su/emoticon/ayo1.gif",
		alt: "csgakmod"
	};	
	
	emoticons[":ayo2"] = {
		src: "http://dia.muk.su/emoticon/ayo2.gif",
		alt: "csgakmod"
	};	
	
	emoticons[":angguk"] = {
		src: "http://dia.muk.su/emoticon/angguk.gif",
		alt: "csgakmod"
	};

	emoticons[":babi_bobo"] = {
		src: "http://dia.muk.su/emoticon/babi_bobo.gif",
		alt: "csgakmod"
	};

	emoticons[":babi_geram"] = {
		src: "http://dia.muk.su/emoticon/babi_geram.gif",
		alt: "csgakmod"
	};

	emoticons[":babi_geram2"] = {
		src: "http://dia.muk.su/emoticon/babi_geram2.gif",
		alt: "csgakmod"
	};

	emoticons[":babi_jelek"] = {
		src: "http://dia.muk.su/emoticon/babi_jelek.gif",
		alt: "csgakmod"
	};

	emoticons[":babi_kaget"] = {
		src: "http://dia.muk.su/emoticon/babi_kaget.gif",
		alt: "csgakmod"
	};

	emoticons[":babi_makan"] = {
		src: "http://dia.muk.su/emoticon/babi_makan.gif",
		alt: "csgakmod"
	};

	emoticons[":babi_malu"] = {
		src: "http://dia.muk.su/emoticon/babi_malu.gif",
		alt: "csgakmod"
	};

	emoticons[":babi_nangis"] = {
		src: "http://dia.muk.su/emoticon/babi_nangis.gif",
		alt: "csgakmod"
	};

	emoticons[":babi_ngakak"] = {
		src: "http://dia.muk.su/emoticon/babi_ngakak.gif",
		alt: "csgakmod"
	};

	emoticons[":babi2"] = {
		src: "http://dia.muk.su/emoticon/babi2.gif",
		alt: "csgakmod"
	};

	emoticons[":balon"] = {
		src: "http://dia.muk.su/emoticon/balon.gif",
		alt: "csgakmod"
	};

	emoticons[":bangga"] = {
		src: "http://dia.muk.su/emoticon/bangga.gif",
		alt: "csgakmod"
	};

	emoticons[":banguntidur"] = {
		src: "http://dia.muk.su/emoticon/banguntidur.gif",
		alt: "csgakmod"
	};

	emoticons[":bedak"] = {
		src: "http://dia.muk.su/emoticon/bedak.gif",
		alt: "csgakmod"
	};

	emoticons[":beku"] = {
		src: "http://dia.muk.su/emoticon/beku2.gif",
		alt: "csgakmod"
	};

	emoticons[":bengong"] = {
		src: "http://dia.muk.su/emoticon/bengong.gif",
		alt: "csgakmod"
	};

	emoticons[":benjol"] = {
		src: "http://dia.muk.su/emoticon/benjo.gif",
		alt: "csgakmod"
	};

	emoticons[":bingung2"] = {
		src: "http://dia.muk.su/emoticon/bingung3.gif",
		alt: "csgakmod"
	};

	emoticons[":bokong"] = {
		src: "http://dia.muk.su/emoticon/bokong.gif",
		alt: "csgakmod"
	};

	emoticons[":bom"] = {
		src: "http://dia.muk.su/emoticon/bom.gif",
		alt: "csgakmod"
	};

	emoticons[":bom2"] = {
		src: "http://dia.muk.su/emoticon/bom2.gif",
		alt: "csgakmod"
	};

	emoticons[":bonutang"] = {
		src: "http://dia.muk.su/emoticon/bonutang.gif",
		alt: "csgakmod"
	};
	
		emoticons[":bunga"] = {
		src: "http://dia.muk.su/emoticon/bunga.gif",
		alt: "csgakmod"
	};

	emoticons[":cengengesan"] = {
		src: "http://dia.muk.su/emoticon/cengengesan.gif",
		alt: "csgakmod"
	};

	emoticons[":cinta"] = {
		src: "http://dia.muk.su/emoticon/cinta.gif",
		alt: "csgakmod"
	};

	emoticons[":cling2"] = {
		src: "http://dia.muk.su/emoticon/cling2.gif",
		alt: "csgakmod"
	};

	emoticons[":congratz"] = {
		src: "http://dia.muk.su/emoticon/congratz.gif",
		alt: "csgakmod"
	};

	emoticons[":sembur"] = {
		src: "http://dia.muk.su/emoticon/cuih3.gif",
		alt: "csgakmod"
	};

	emoticons[":cup"] = {
		src: "http://dia.muk.su/emoticon/cup.gif",
		alt: "csgakmod"
	};

	emoticons[":default"] = {
		src: "http://dia.muk.su/emoticon/default.gif",
		alt: "csgakmod"
	};

	emoticons[":detektif"] = {
		src: "http://dia.muk.su/emoticon/detektif.gif",
		alt: "csgakmod"
	};

	emoticons[":diomeli"] = {
		src: "http://dia.muk.su/emoticon/diomeli.gif",
		alt: "csgakmod"
	};

	emoticons[":ehem"] = {
		src: "http://dia.muk.su/emoticon/ehem.gif",
		alt: "csgakmod"
	};

	emoticons[":elus2"] = {
		src: "http://dia.muk.su/emoticon/elus2.gif",
		alt: "csgakmod"
	};

	emoticons[":elvis"] = {
		src: "http://dia.muk.su/emoticon/elvis.gif",
		alt: "csgakmod"
	};

	emoticons[":evilolipop"] = {
		src: "http://dia.muk.su/emoticon/evilolipop.gif",
		alt: "csgakmod"
	};

	emoticons[":foto"] = {
		src: "http://dia.muk.su/emoticon/foto.gif",
		alt: "csgakmod"
	};

	emoticons[":gagah"] = {
		src: "http://dia.muk.su/emoticon/gagah.gif",
		alt: "csgakmod"
	};

	emoticons[":gajian"] = {
		src: "http://dia.muk.su/emoticon/gajian.gif",
		alt: "csgakmod"
	};

	emoticons[":rapercoyo"] = {
		src: "http://dia.muk.su/emoticon/gakpercaya.gif",
		alt: "csgakmod"
	};

	emoticons[":ganteng2"] = {
		src: "http://dia.muk.su/emoticon/ganteng2.gif",
		alt: "csgakmod"
	};

	emoticons[":garukpantat"] = {
		src: "http://dia.muk.su/emoticon/garukpantat.gif",
		alt: "csgakmod"
	};

	emoticons[":geleng2"] = {
		src: "http://dia.muk.su/emoticon/geleng2.gif",
		alt: "csgakmod"
	};

	emoticons[":gelisah"] = {
		src: "http://dia.muk.su/emoticon/gelisah.gif",
		alt: "csgakmod"
	};

	emoticons[":genit"] = {
		src: "http://dia.muk.su/emoticon/genit.gif",
		alt: "csgakmod"
	};

	emoticons[":haredang"] = {
		src: "http://dia.muk.su/emoticon/gerah2.gif",
		alt: "csgakmod"
	};

	emoticons[":glodak"] = {
		src: "http://dia.muk.su/emoticon/glodak.gif",
		alt: "csgakmod"
	};

	emoticons[":gosip"] = {
		src: "http://dia.muk.su/emoticon/gosip.gif",
		alt: "csgakmod"
	};

	emoticons[":guebanget"] = {
		src: "http://dia.muk.su/emoticon/guebanget.gif",
		alt: "csgakmod"
	};

	emoticons[":guling2"] = {
		src: "http://dia.muk.su/emoticon/guling2.gif",
		alt: "csgakmod"
	};

	emoticons[":hai"] = {
		src: "http://dia.muk.su/emoticon/hai.gif",
		alt: "csgakmod"
	};

	emoticons[":hajar"] = {
		src: "http://dia.muk.su/emoticon/hajaar.gif",
		alt: "csgakmod"
	};

	emoticons[":hantu"] = {
		src: "http://dia.muk.su/emoticon/hantu.gif",
		alt: "csgakmod"
	};

	emoticons[":hehe"] = {
		src: "http://dia.muk.su/emoticon/hehe.gif",
		alt: "csgakmod"
	};

	emoticons[":hei"] = {
		src: "http://dia.muk.su/emoticon/hei.gif",
		alt: "csgakmod"
	};

	emoticons[":hiphop"] = {
		src: "http://dia.muk.su/emoticon/hiphop.gif",
		alt: "csgakmod"
	};

	emoticons[":hormat"] = {
		src: "http://dia.muk.su/emoticon/hormat.gif",
		alt: "csgakmod"
	};

	emoticons[":hula2"] = {
		src: "http://dia.muk.su/emoticon/hula2.gif",
		alt: "csgakmod"
	};

	emoticons[":hush"] = {
		src: "http://dia.muk.su/emoticon/hush.gif",
		alt: "csgakmod"
	};

	emoticons[":isin"] = {
		src: "http://dia.muk.su/emoticon/isin.gif",
		alt: "csgakmod"
	};

	emoticons[":cao"] = {
		src: "http://dia.muk.su/emoticon/jalan.gif",
		alt: "csgakmod"
	};

	emoticons[":kebelet"] = {
		src: "http://dia.muk.su/emoticon/kebelet.gif",
		alt: "csgakmod"
	};	
	
	emoticons[":kabur"] = {
		src: "http://dia.muk.su/emoticon/kabur.gif",
		alt: "csgakmod"
	};

	emoticons[":balangsendal"] = {
		src: "http://dia.muk.su/emoticon/kenasandal.gif",
		alt: "csgakmod"
	};

	emoticons[":keringatdingin"] = {
		src: "http://dia.muk.su/emoticon/keringatdingin.gif",
		alt: "csgakmod"
	};

	emoticons[":wc"] = {
		src: "http://dia.muk.su/emoticon/keringatdingin2.gif",
		alt: "csgakmod"
	};

	emoticons[":ketakutan"] = {
		src: "http://dia.muk.su/emoticon/ketakutan.gif",
		alt: "csgakmod"
	};

	emoticons[":kutubuku"] = {
		src: "http://dia.muk.su/emoticon/kutubuku.gif",
		alt: "csgakmod"
	};

	emoticons[":laripagi"] = {
		src: "http://dia.muk.su/emoticon/laripagi.gif",
		alt: "csgakmod"
	};

	emoticons[":lewat"] = {
		src: "http://dia.muk.su/emoticon/lewat.gif",
		alt: "csgakmod"
	};

	emoticons[":lirik"] = {
		src: "http://dia.muk.su/emoticon/lirik.gif",
		alt: "csgakmod"
	};

	emoticons[":lolipop"] = {
		src: "http://dia.muk.su/emoticon/lolipop.gif",
		alt: "csgakmod"
	};

	emoticons[":love3"] = {
		src: "http://dia.muk.su/emoticon/love3.gif",
		alt: "csgakmod"
	};

	emoticons[":love4"] = {
		src: "http://dia.muk.su/emoticon/love4.gif",
		alt: "csgakmod"
	};

	emoticons[":love5"] = {
		src: "http://dia.muk.su/emoticon/love5.gif",
		alt: "csgakmod"
	};

	emoticons[":love6"] = {
		src: "http://dia.muk.su/emoticon/love6.gif",
		alt: "csgakmod"
	};

	emoticons[":sip"] = {
		src: "http://dia.muk.su/emoticon/m01.gif",
		alt: "csgakmod"
	};

	emoticons[":m04"] = {
		src: "http://dia.muk.su/emoticon/m04.gif",
		alt: "csgakmod"
	};

	emoticons[":m07"] = {
		src: "http://dia.muk.su/emoticon/m07.gif",
		alt: "csgakmod"
	};

	emoticons[":m08"] = {
		src: "http://dia.muk.su/emoticon/m08.gif",
		alt: "csgakmod"
	};

	emoticons[":m09"] = {
		src: "http://dia.muk.su/emoticon/m09.gif",
		alt: "csgakmod"
	};

	emoticons[":m10"] = {
		src: "http://dia.muk.su/emoticon/m10.gif",
		alt: "csgakmod"
	};

	emoticons[":telpong"] = {
		src: "http://dia.muk.su/emoticon/m11.gif",
		alt: "csgakmod"
	};

	emoticons[":m28"] = {
		src: "http://dia.muk.su/emoticon/m28.gif",
		alt: "csgakmod"
	};

	emoticons[":m33"] = {
		src: "http://dia.muk.su/emoticon/m33.gif",
		alt: "csgakmod"
	};

	emoticons[":m34"] = {
		src: "http://dia.muk.su/emoticon/m34.gif",
		alt: "csgakmod"
	};

	emoticons[":m35"] = {
		src: "http://dia.muk.su/emoticon/m35.gif",
		alt: "csgakmod"
	};

	emoticons[":maap"] = {
		src: "http://dia.muk.su/emoticon/m107.gif",
		alt: "csgakmod"
	};

	emoticons[":maaf"] = {
		src: "http://dia.muk.su/emoticon/maaf.gif",
		alt: "csgakmod"
	};

	emoticons[":ngalamun"] = {
		src: "http://dia.muk.su/emoticon/ngelamun.gif",
		alt: "csgakmod"
	};

	emoticons[":ngegame"] = {
		src: "http://dia.muk.su/emoticon/main.gif",
		alt: "csgakmod"
	};

	emoticons[":makan_jagung"] = {
		src: "http://dia.muk.su/emoticon/makan_jagung.gif",
		alt: "csgakmod"
	};

	emoticons[":makan3"] = {
		src: "http://dia.muk.su/emoticon/makan3.gif",
		alt: "csgakmod"
	};

	emoticons[":makanmie"] = {
		src: "http://dia.muk.su/emoticon/makanmie.gif",
		alt: "csgakmod"
	};

	emoticons[":maling"] = {
		src: "http://dia.muk.su/emoticon/maling.gif",
		alt: "csgakmod"
	};

	emoticons[":isin2"] = {
		src: "http://dia.muk.su/emoticon/malu4.gif",
		alt: "csgakmod"
	};

	emoticons[":mandikucing"] = {
		src: "http://dia.muk.su/emoticon/mandikucing.gif",
		alt: "csgakmod"
	};

	emoticons[":manja"] = {
		src: "http://dia.muk.su/emoticon/manja.gif",
		alt: "csgakmod"
	};

	emoticons[":matabengkak"] = {
		src: "http://dia.muk.su/emoticon/matabelo.gif",
		alt: "csgakmod"
	};

	emoticons[":mataduit"] = {
		src: "http://dia.muk.su/emoticon/mataduit.gif",
		alt: "csgakmod"
	};

	emoticons[":melet"] = {
		src: "http://dia.muk.su/emoticon/melet.gif",
		alt: "csgakmod"
	};

	emoticons[":membabi_buta"] = {
		src: "http://dia.muk.su/emoticon/membabi_buta.gif",
		alt: "csgakmod"
	};

	emoticons[":metal"] = {
		src: "http://dia.muk.su/emoticon/metal.gif",
		alt: "csgakmod"
	};

	emoticons[":mikir"] = {
		src: "http://dia.muk.su/emoticon/mikir.gif",
		alt: "csgakmod"
	};

	emoticons[":mimisan"] = {
		src: "http://dia.muk.su/emoticon/mimisan1.gif",
		alt: "csgakmod"
	};

	emoticons[":mobil"] = {
		src: "http://dia.muk.su/emoticon/mobil.gif",
		alt: "csgakmod"
	};

	emoticons[":monyet"] = {
		src: "http://dia.muk.su/emoticon/monyet.gif",
		alt: "csgakmod"
	};

	emoticons[":mupeng"] = {
		src: "http://dia.muk.su/emoticon/mupeng.gif",
		alt: "csgakmod"
	};

	emoticons[":mupeng2"] = {
		src: "http://dia.muk.su/emoticon/mupeng2.gif",
		alt: "csgakmod"
	};

	emoticons[":mwach"] = {
		src: "http://dia.muk.su/emoticon/mwach.gif",
		alt: "csgakmod"
	};

	emoticons[":vespa"] = {
		src: "http://dia.muk.su/emoticon/naek_vespa_aaah.gif",
		alt: "csgakmod"
	};

	emoticons[":nangis"] = {
		src: "http://dia.muk.su/emoticon/nangis.gif",
		alt: "csgakmod"
	};

	emoticons[":ngamuk"] = {
		src: "http://dia.muk.su/emoticon/ngamuk2.gif",
		alt: "csgakmod"
	};

	emoticons[":ngamuk3"] = {
		src: "http://dia.muk.su/emoticon/ngamuk3.gif",
		alt: "csgakmod"
	};

	emoticons[":ngantuk"] = {
		src: "http://dia.muk.su/emoticon/ngantuk.gif",
		alt: "csgakmod"
	};

	emoticons[":ngayal"] = {
		src: "http://dia.muk.su/emoticon/ngayal.gif",
		alt: "csgakmod"
	};

	emoticons[":ngece"] = {
		src: "http://dia.muk.su/emoticon/ngejek.gif",
		alt: "csgakmod"
	};

	emoticons[":ngelamun"] = {
		src: "http://dia.muk.su/emoticon/ngelamun.gif",
		alt: "csgakmod"
	};

	emoticons[":ngelu"] = {
		src: "http://dia.muk.su/emoticon/ngelu.gif",
		alt: "csgakmod"
	};

	emoticons[":ngikik"] = {
		src: "http://dia.muk.su/emoticon/ngikik.gif",
		alt: "csgakmod"
	};

	emoticons[":nonono"] = {
		src: "http://dia.muk.su/emoticon/nonono.gif",
		alt: "csgakmod"
	};

	emoticons[":nunjuk"] = {
		src: "http://dia.muk.su/emoticon/nunjuk.gif",
		alt: "csgakmod"
	};

	emoticons[":nyanyi"] = {
		src: "http://dia.muk.su/emoticon/nyanyi.gif",
		alt: "csgakmod"
	};

	emoticons[":nyelam"] = {
		src: "http://dia.muk.su/emoticon/nyelam_dulu_a.gif",
		alt: "csgakmod"
	};

	emoticons[":nyerah"] = {
		src: "http://dia.muk.su/emoticon/nyerah.gif",
		alt: "csgakmod"
	};

	emoticons[":nyet"] = {
		src: "http://dia.muk.su/emoticon/nyet.gif",
		alt: "csgakmod"
	};

	emoticons[":olahraga"] = {
		src: "http://dia.muk.su/emoticon/olahraga.gif",
		alt: "csgakmod"
	};

	emoticons[":orang_kaya"] = {
		src: "http://dia.muk.su/emoticon/orang_kaya.gif",
		alt: "csgakmod"
	};

	emoticons[":p"] = {
		src: "http://dia.muk.su/emoticon/P1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":paham"] = {
		src: "http://dia.muk.su/emoticon/paham.gif",
		alt: "csgakmod"
	};	
	
	emoticons[":pengen_turu"] = {
		src: "http://dia.muk.su/emoticon/pengen_turu.gif",
		alt: "csgakmod"
	};

	emoticons[":petasan"] = {
		src: "http://dia.muk.su/emoticon/petasan.gif",
		alt: "csgakmod"
	};

	emoticons[":pilek"] = {
		src: "http://dia.muk.su/emoticon/pilek.gif",
		alt: "csgakmod"
	};

	emoticons[":pipis"] = {
		src: "http://dia.muk.su/emoticon/pipis.gif",
		alt: "csgakmod"
	};

	emoticons[":puyeng"] = {
		src: "http://dia.muk.su/emoticon/puyeng.gif",
		alt: "csgakmod"
	};

	emoticons[":roket"] = {
		src: "http://dia.muk.su/emoticon/roket.gif",
		alt: "csgakmod"
	};

	emoticons[":rokok"] = {
		src: "http://dia.muk.su/emoticon/rokok2.gif",
		alt: "csgakmod"
	};

	emoticons[":sabunan"] = {
		src: "http://dia.muk.su/emoticon/sabunan.gif",
		alt: "csgakmod"
	};

	emoticons[":lara_untu"] = {
		src: "http://dia.muk.su/emoticon/sakit_gigi.gif",
		alt: "csgakmod"
	};
	
	emoticons[":santet"] = {
		src: "http://dia.muk.su/emoticon/santet2.gif",
		alt: "csgakmod"
	};

	emoticons[":sebel"] = {
		src: "http://dia.muk.su/emoticon/sebel.gif",
		alt: "csgakmod"
	};

	emoticons[":semangat"] = {
		src: "http://dia.muk.su/emoticon/semangat.gif",
		alt: "csgakmod"
	};

	emoticons[":senang"] = {
		src: "http://dia.muk.su/emoticon/senang.gif",
		alt: "csgakmod"
	};

	emoticons[":seram"] = {
		src: "http://dia.muk.su/emoticon/seram.gif",
		alt: "csgakmod"
	};

	emoticons[":seram3"] = {
		src: "http://dia.muk.su/emoticon/seram3.gif",
		alt: "csgakmod"
	};

	emoticons[":seram4"] = {
		src: "http://dia.muk.su/emoticon/seram4.gif",
		alt: "csgakmod"
	};

	emoticons[":seram5"] = {
		src: "http://dia.muk.su/emoticon/seram5.gif",
		alt: "csgakmod"
	};

	
	emoticons[":sikut"] = {
		src: "http://dia.muk.su/emoticon/sikut.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shutup"] = {
		src: "http://dia.muk.su/emoticon/shutup.gif",
		alt: "csgakmod"
	};

	emoticons[":sikatan"] = {
		src: "http://dia.muk.su/emoticon/sikatan.gif",
		alt: "csgakmod"
	};

	emoticons[":sokimut"] = {
		src: "http://dia.muk.su/emoticon/sok_imut.gif",
		alt: "csgakmod"
	};

	emoticons[":somel"] = {
		src: "http://dia.muk.su/emoticon/somel.gif",
		alt: "csgakmod"
	};

	emoticons[":superstar"] = {
		src: "http://dia.muk.su/emoticon/superstar.gif",
		alt: "csgakmod"
	};

	emoticons[":syalala"] = {
		src: "http://dia.muk.su/emoticon/sylalala.gif",
		alt: "csgakmod"
	};

	emoticons[":takut"] = {
		src: "http://dia.muk.su/emoticon/takut.gif",
		alt: "csgakmod"
	};

	emoticons[":tampar"] = {
		src: "http://dia.muk.su/emoticon/tampar.gif",
		alt: "csgakmod"
	};

	emoticons[":tendanganmaut"] = {
		src: "http://dia.muk.su/emoticon/tendanganmaut.gif",
		alt: "csgakmod"
	};

	emoticons[":tepuk"] = {
		src: "http://dia.muk.su/emoticon/tepuk.gif",
		alt: "csgakmod"
	};

	emoticons[":terharu"] = {
		src: "http://dia.muk.su/emoticon/terharu.gif",
		alt: "csgakmod"
	};

	emoticons[":terompet"] = {
		src: "http://dia.muk.su/emoticon/terompet.gif",
		alt: "csgakmod"
	};

	emoticons[":terompet2"] = {
		src: "http://dia.muk.su/emoticon/terompet2.gif",
		alt: "csgakmod"
	};

	emoticons[":towel"] = {
		src: "http://dia.muk.su/emoticon/towel.gif",
		alt: "csgakmod"
	};

	emoticons[":triping"] = {
		src: "http://dia.muk.su/emoticon/triping.gif",
		alt: "csgakmod"
	};

	emoticons[":uadem"] = {
		src: "http://dia.muk.su/emoticon/uadem_sumpaah.gif",
		alt: "csgakmod"
	};

	emoticons[":udah_gila"] = {
		src: "http://dia.muk.su/emoticon/udah_gila.gif",
		alt: "csgakmod"
	};

	emoticons[":umbel"] = {
		src: "http://dia.muk.su/emoticon/umbel.gif",
		alt: "csgakmod"
	};

	emoticons[":umm"] = {
		src: "http://dia.muk.su/emoticon/umm.gif",
		alt: "csgakmod"
	};

	emoticons[":waspada"] = {
		src: "http://dia.muk.su/emoticon/waspada.gif",
		alt: "csgakmod"
	};

	emoticons[":woy"] = {
		src: "http://dia.muk.su/emoticon/woy.gif",
		alt: "csgakmod"
	};

	emoticons[":xmas_babi"] = {
		src: "http://dia.muk.su/emoticon/xmas_babi.gif",
		alt: "csgakmod"
	};	

	emoticons[":yesyesyes"] = {
		src: "http://dia.muk.su/emoticon/yesyesyes.gif",
		alt: "csgakmod"
	};	

	emoticons[":panggang"] = {
		src: "http://dia.muk.su/emoticon/yoyopanggang.gif",
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
