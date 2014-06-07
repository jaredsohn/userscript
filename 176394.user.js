// ==UserScript==
// @name           Icon Chat4u
// @namespace      http://meki/forum/
// @description    Icon Chat4u
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==
//
//      - Icon Chat4ru Relased
//      
//      Copyright 2013 memek <memek.info>
//      edited by http://www.facebook.com/memek
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
//		All rights ReserveD This Script Modiffed By memek
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

///////////////////////////BEGIN EMOTICON//////////////////////////////////////
	
	emoticons[":ngacir"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ngacir.gif",
		alt: "csgakmod"
	};
	
	emoticons[":D"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/hihi.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ehm"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ehem.gif",
		alt: "csgakmod"
	};
	
	emoticons[":joget"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/joget.gif",
		alt: "csgakmod"
	};

	emoticons[":sad"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/sad.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mikir"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/mikir.gif",
		alt: "csgakmod"
	};

	emoticons[":bt"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/bete.gif",
		alt: "csgakmod"
	};
	
	emoticons[":otw"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/otw.gif",
		alt: "csgakmod"
	};

	emoticons[":inlove"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/inlove.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ups"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ups.gif",
		alt: "csgakmod"
	};

	emoticons[":urock"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/urock.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hepi"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/hepi.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cpdeh"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/cpdeh.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kartumerah"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/kartumerah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":pr"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/pr.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mantau"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/mantau.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":makan"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/makan.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hore"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/hore.gif",
		alt: "csgakmod"
	};
	
	emoticons[":(("] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/cengeng.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":mandi"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/sexy.gif",
		alt: "csgakmod"
	};
	
	emoticons[":lulus"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/lulus.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":ckaka"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ckaka.gif",
		alt: "csgakmod"
	};
	
	emoticons[":oprek"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/oprek.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":mau"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/mau.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":police"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/police.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":colek"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/colek.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":berang"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/berang.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":ogah"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ogah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hmm"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/hmm.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maju"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/maju.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":happy"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/happy.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngambek"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ngambek.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":hope"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/hope.gif",
		alt: "csgakmod"
	};
	
	emoticons[":we"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/wex2.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":solved"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/solved.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":copas"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/copaser.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":hopeless"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/hopeless.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":mad"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/mad.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":kabur"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/kabur.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak2"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ngakak2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":stres"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/stres.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":oye"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/oye.gif",
		alt: "csgakmod"
	};
	
	emoticons[":boker"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/boker.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":ngupil"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ngupil.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gpp"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/np.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":football"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/football.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":jgn"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/jangan.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":pm"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/pm.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":puyeng"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/puyeng.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":malu"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/malu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":awas"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/awas.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mabok"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/mabok.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":shuptup"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ssst.gif",
		alt: "csgakmod"
	};
	
	emoticons[":uhuy"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/uhuy.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":boxer"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/boxer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ngakak.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":yes"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/berhasil.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":ting"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ting.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":sincan"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/sincan.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":sadarwoy"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/sadarwoy.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":bingung"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/bingung.gif",
		alt: "csgakmod"
	};
	
	emoticons[":lier"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/lier.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tajir"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/tajir.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hajar"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/babakbelur.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kiss"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/kiss.gif",
		alt: "csgakmod"
	};
	emoticons[":aha"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/aha.gif",
		alt: "csgakmod"
	};
	emoticons[":injek"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/cockroach-killer.gif",
		alt: "csgakmod"
	};
	emoticons[":sentil"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/sentil.gif",
		alt: "csgakmod"
	};
	emoticons[":waterski"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/waterski.gif",
		alt: "csgakmod"
	};
	emoticons[":post"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/post.gif",
		alt: "csgakmod"
	};
	emoticons[":olympic"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/olympic.gif",
		alt: "csgakmod"
	};
	emoticons[":yupi"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/yupi.gif",
		alt: "csgakmod"
	};
	emoticons[":baca"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/baca.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tonjok"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/tonjok.gif",
		alt: "csgakmod"
	};
		
	emoticons[":catet"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/catet.gif",
		alt: "csgakmod"
	};
	
	emoticons[":game"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/game.gif",
		alt: "csgakmod"
	};
	
	emoticons[":love"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/love.gif",
		alt: "csgakmod"
	};
	
	emoticons[":koid"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/koid.gif",
		alt: "csgakmod"
	};
	
	emoticons[":p"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/melet.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hormat"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/sembah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":joget2"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/joget2.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":ampun"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ampun.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shock"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/shock.gif",
		alt: "csgakmod"
	};
	
	emoticons[":("] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/silent.gif",
		alt: "csgakmod"
	};
	


	emoticons[":mak"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/mak.gif",
		alt: "csgakmod"
	};
	
	emoticons[":galau"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/galau.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":duit"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/duit.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hoo"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/hoo.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":))"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ketawa.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":bye"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/bye.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":shake"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/nyengir.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":thumb"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/thumb.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":ciat"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ciat.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cool"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/cool.gif",
		alt: "csgakmod"
	};
	
	emoticons[":finger"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/finger.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":mewek"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/mewek.gif",
		alt: "csgakmod"
	};
	
	emoticons[":genjreng"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/genjreng.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":hai"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/hai.gif",
		alt: "csgakmod"
	};
	
	emoticons[":aah"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/aah.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":muntah"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/hoax.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":yo"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/ho.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":sunat"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/sunat.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[";))"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/keke.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":mantab"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/muantab.gif",
		alt: "csgakmod"
	};
	
	emoticons[":-??"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/pusing2.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":xixi"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/xixi.gif",
		alt: "csgakmod"
	};
	
	emoticons[":periksa"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/periksa.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":dead"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/dead.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":foto"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/foto.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":peace"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/peace.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":misi"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/misi.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":sugoii"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/sugoii.gif",
		alt: "csgakmod"
	};
	
	emoticons[":call"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/call.gif",
		alt: "csgakmod"
	};
	
	emoticons[":)"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/smile1.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":tepar"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/tepar.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bobo"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/bobo.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":kenyot"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/kenyot.gif",
		alt: "csgakmod"
	};
	
	emoticons[":teriak"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/teriak.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":somplak"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/dodol.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":asik"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/somplak.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":bandeng"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/bandeng.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":cis"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/cis.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":fuck"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/fuck.gif",
		alt: "csgakmod"
	};
	
	emoticons[":matabelo"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/matabelo.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":warning"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/warning.gif",
		alt: "csgakmod"
	};
	
	emoticons[":benk"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/benk.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":nyangkul"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/nyangkul.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":qos"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/qos.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":serang"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/serang.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":scooter"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/scooter.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":bump"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/bump.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gun"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/gun.gif",
		alt: "csgakmod"
	};
	
	emoticons[":wao"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/wao.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":pengumuman"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/pengumuman.gif",
		alt: "csgakmod"
	};
	
	emoticons[":prok"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/jalan.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":punch"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/punch.gif",
		alt: "csgakmod"
	};
	
	emoticons[":dj"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/dj.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":pok"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/pok.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":bisik"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/bisik.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":hoho"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/hoho.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":cipok"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/cipok.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":gaya"] = {
		src: "http://bugs4u.info/forum/public/style_emoticons/default/gaya.gif",
		alt: "csgakmod"
	};
	
	
///////////////////////////END EMOTICON//////////////////////////////////////

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