// ==UserScript==
// @name           Data Base Smiley Cyber Code
// @namespace      http://cybercode.biz/
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
	////////////////////////////////////////MAHOS////////////////////////////////////////////////////////
	emoticons[":mahobego2"] = {
		src: "http://cybercode.biz/images/smilies/maho/rxvmmqtr.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahobego"] = {
		src: "http://cybercode.biz/images/smilies/maho/1igydljv.gif",
		alt: "csgakmod"
	};
	
	emoticons[":salammaho"] = {
		src: "http://cybercode.biz/images/smilies/maho/ruuf1vt1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahofuck"] = {
		src: "http://cybercode.biz/images/smilies/maho/lmmzx1tg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahohammer"] = {
		src: "http://cybercode.biz/images/smilies/maho/0xpY4d4a413c8a832.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahonajis"] = {
		src: "http://cybercode.biz/images/smilies/maho/nViH4d4a420819154.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahongakak"] = {
		src: "http://cybercode.biz/images/smilies/maho/mcB04d4a420f70979.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahoberduka"] = {
		src: "http://cybercode.biz/images/smilies/maho/us5su9hz.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahomatabelo"] = {
		src: "http://cybercode.biz/images/smilies/maho/VEh44d4a41bb2f0a8.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahonyundul"] = {
		src: "http://cybercode.biz/images/smilies/maho/amhnnynr.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahotakut"] = {
		src: "http://cybercode.biz/images/smilies/maho/2besowo6.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahobaby"] = {
		src: "http://cybercode.biz/images/smilies/maho/5xgL4d4a4105b539b.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahonangis"] = {
		src: "http://cybercode.biz/images/smilies/maho/p8xbgwij.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahomewek"] = {
		src: "http://cybercode.biz/images/smilies/maho/Iwxt4d4a4201d97ae.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maholinux"] = {
		src: "http://cybercode.biz/images/smilies/maho/qssika7r.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahongaceng"] = {
		src: "http://cybercode.biz/images/smilies/maho/ukesf2ka.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahorecsel"] = {
		src: "http://cybercode.biz/images/smilies/maho/kbUn4d4a4216e620d.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahorepost"] = {
		src: "http://cybercode.biz/images/smilies/maho/hi8vy50w.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maho2thumb"] = {
		src: "http://cybercode.biz/images/smilies/maho/HWEi4d4a415458015.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahongacir"] = {
		src: "http://cybercode.biz/images/smilies/maho/phzfiadm.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahobata"] = {
		src: "http://cybercode.biz/images/smilies/maho/grnF4d4a40223adb0.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahobrand"] = {
		src: "http://cybercode.biz/images/smilies/maho/avatar2045707_2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahoindo"] = {
		src: "http://cybercode.biz/images/smilies/maho/zx1J4d4a414597965.gif",
		alt: "csgakmod"
	};
	emoticons[":mahobaby2"] = {
		src: "http://cybercode.biz/images/smilies/maho/Pzxi4d4a4018d99ee.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahothumb"] = {
		src: "http://cybercode.biz/images/smilies/maho/9hPp4d4a414cee67c.gif",
		alt: "csgakmod"
	};
	
	emoticons[":timpukmaho"] = {
		src: "http://cybercode.biz/images/smilies/maho/AccJ4d4a41b232f2b.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahodp"] = {
		src: "http://cybercode.biz/images/smilies/maho/IcWZ4d4a402ab92ff.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahonyedot"] = {
		src: "http://cybercode.biz/images/smilies/maho/qarb4hrf.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tabrakmaho"] = {
		src: "http://cybercode.biz/images/smilies/maho/j3gebv4b.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maholpg"] = {
		src: "http://cybercode.biz/images/smilies/maho/qky4mjlu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahobenjol"] = {
		src: "http://cybercode.biz/images/smilies/maho/lebe-lebe.blogspot.com%20hgjsd.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahogm"] = {
		src: "http://cybercode.biz/images/smilies/maho/lebe-lebe.blogspot.com%20tyfjgfyjg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":dagangmaho"] = {
		src: "http://cybercode.biz/images/smilies/maho/irbswx6o.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hormatmaho"] = {
		src: "http://cybercode.biz/images/smilies/maho/rm6ph4fp.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahokabur"] = {
		src: "http://cybercode.biz/images/smilies/maho/s5gte4fw.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahonani"] = {
		src: "http://cybercode.biz/images/smilies/maho/ortp5ppn.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahogitar"] = {
		src: "http://cybercode.biz/images/smilies/maho/yr7efolo.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahotua"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/old-pervert-46.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahodor"] = {
		src: "http://cybercode.biz/images/smilies/maho/mah0ak472.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahos"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/mahos.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maho"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/maho.gif",
		alt: "csgakmod"
	}
	
	/////////////////////////////////////////////NGAKAK///////////////////////////////////////////////////
	emoticons[":ngakakcaramel"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/Orange_Emoticon_Caramelldansen_by_ardrie123.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakaka"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/ngakaka.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakw"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/nbas8mdh.gif",
		alt: "csgakmod"
	};
	
	emoticons[":wkwkwk"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/n5.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakular"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/lebe-lebe.blogspot.com%2017.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakjakson"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/cm87f2qf.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakterbalik"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/b9p5r4qn.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakgondrong"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/wn8zka5z.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak2thumb"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/avatar2686012_2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakrepost"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/vhjv6i2g.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakputar"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/avatar2596878_1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakdp"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/uy4fbadk.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakakompong"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/th_lebe-lebeblogspotcom-1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak2g"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/52excljpg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak1"] = {
		src: "http://cybercode.biz/images/smilies/ngakak/3ahakuai.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakaks"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/ngakaks.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/ngakak.gif",
		alt: "csgakmod"
	};
	
	
///////////////////////////////////Miss Bone//////////////////////////////////////	
	
	
	
	emoticons[":sedih"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-33.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tua"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-188.gif",
		alt: "csgakmod"
	};
	
	emoticons[":santai"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-129.gif",
		alt: "csgakmod"
	};
	
	emoticons[":iyaya"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-76.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tailo"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/old-pervert-14.gif",
		alt: "csgakmod"
	};
	
	emoticons[":banting"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-31.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ulat"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-187.gif",
		alt: "csgakmod"
	};
	
	emoticons[":harapan"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-128.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mandi"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-74.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ide"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-266.gif",
		alt: "csgakmod"
	};
	
	emoticons[":what"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-22.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bunuhdiri"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-184.gif",
		alt: "csgakmod"
	};
	
	emoticons[":missnyundul"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-126.gif",
		alt: "csgakmod"
	};
	
	emoticons[":love"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-69.gif",
		alt: "csgakmod"
	};
	
	emoticons[":suntik"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-262.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ckckck"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-21.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hajar"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-164.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nyerah"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-118.gif",
		alt: "csgakmod"
	};
	
	emoticons[":missngacir"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-68.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":misshansip"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-18.gif",
		alt: "csgakmod"
	};
	
	emoticons[":muntah"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-162.gif",
		alt: "csgakmod"
	};
	
	emoticons[":minta"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-109.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":sudahlah"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-250.gif",
		alt: "csgakmod"
	};
	
	emoticons[":merah"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-16.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tolol"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-161.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tinju"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-108.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bacok"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-53.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maudong"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-245.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sunat"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/20kvua.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sini"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-156.gif",
		alt: "csgakmod"
	};
	
	emoticons[":misshammer"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-89.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gawat"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-45.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nangis"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-201.gif",
		alt: "csgakmod"
	};
	
	emoticons[":missgoyang"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-147.gif",
		alt: "csgakmod"
	};
	
	emoticons[":top"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-88.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gunting"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-41.gif",
		alt: "csgakmod"
	};
	
	emoticons[":musiksantai"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-200.gif",
		alt: "csgakmod"
	};
	
	emoticons[":wow"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-146.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ampun"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-84.gif",
		alt: "csgakmod"
	};

	
	
	emoticons[":lovely"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-195.gif",
		alt: "csgakmod"
	};
	
	emoticons[":makan"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-138.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rahasia"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-83.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngecrot"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/old-pervert-95.gif",
		alt: "csgakmod"
	};
	
	emoticons[":asah"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-36.gif",
		alt: "csgakmod"
	};
	
	emoticons[":jurussakit1000th"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-189.gif",
		alt: "csgakmod"
	};
	
	
	
	
	
	
	
	
	//////////////////////////////////caramell////////////////////////////////////////
	
	
	emoticons[":caramelblue"] = {
		src: "http://cybercode.biz/images/smilies/caramel/0aso4d841ae5c1fbd.gif",
		alt: "csgakmod"
	};
	
	emoticons[":caramelgreen"] = {
		src: "http://cybercode.biz/images/smilies/caramel/fnXB4d841ae35ea41.gif",
		alt: "csgakmod"
	};
	
	emoticons[":caramelblack"] = {
		src: "http://cybercode.biz/images/smilies/caramel/casm4d841ae30fbd1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":caramelgrey"] = {
		src: "http://cybercode.biz/images/smilies/caramel/Bgjy4d841ae345829.gif",
		alt: "csgakmod"
	};
	
	emoticons[":caramelyellow"] = {
		src: "http://cybercode.biz/images/smilies/caramel/1e0X4d841b61b0ab6.gif",
		alt: "csgakmod"
	};
	
	
	
	
////////////////////kaskus Small//////////////////////////////	
	

	
	emoticons[":reposts"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/reposts.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpms"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/cekpms.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":capedes"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/capedes.gif",
		alt: "csgakmod"
	};
	
	emoticons[":najiss"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/najiss.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":mads"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/mads.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kisss"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/kisss.gif",
		alt: "csgakmod"
	};
	emoticons[":)b"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/b.gif",
		alt: "csgakmod"
	};
	emoticons[":iloveindonesias"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/iloveindonesias.gif",
		alt: "csgakmod"
	};
	
	emoticons[":Yb"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/Yb.gif",
		alt: "csgakmod"
	}
		
	emoticons[":hammers"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/hammers.gif",
		alt: "csgakmod"
	}
	
	emoticons[":takuts"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/takuts.gif",
		alt: "csgakmod"
	}
	
	emoticons[":cendolbig"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/cendolbig.gif",
		alt: "csgakmod"
	};

	
	emoticons[":cendols"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/cendols.gif",
		alt: "csgakmod"
	}
	
	emoticons[":sundulgans"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/sundulgans.gif",
		alt: "csgakmod"
	}
	
	emoticons[":cendolb"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/cendolb.gif",
		alt: "csgakmod"
	}
	
	
	
	emoticons[":berdukas"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/berdukas.gif",
		alt: "csgakmod"
	}
	
	
	
	//////////////////////////KASKUS/////////////////////////////////
	
	
	
	emoticons[":games"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/games.gif",
		alt: "csgakmod"
	}
	
	emoticons[":sorry"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/sorry.gif",
		alt: "csgakmod"
	}
	
	emoticons[":berduka"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/berduka.gif",
		alt: "csgakmod"
	}

	emoticons[":nosara"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/nosara.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kts:"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/kts.gif",
		alt: "csgakmod"
	};

	emoticons[":dp"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/dp.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shakehand2"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/shakehand2.gif",
		alt: "csgakmod"
	};

	
	
	emoticons[":nohope"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/nohope.gif",
		alt: "csgakmod"
	};

	emoticons[":kr"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/kr.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cystg"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/cystg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":selamat"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/selamat.gif",
		alt: "csgakmod"
	};
	
	emoticons[":babygirl"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/babygirl.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":kiss"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/kiss.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":ultah"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/ultah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cool"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/cool.gif",
		alt: "csgakmod"
	};
	
	emoticons[":salahkamar"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/salahkamar.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":babyboy1"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/babyboy1.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":kawin"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/kawin.gif",
		alt: "csgakmod"
	};
	
	emoticons[":traveller"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/traveller.gif",
		alt: "csgakmod"
	};
	
	
		
	
	emoticons["	:request"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/request.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":babyboy"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/babyboy.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":kacau:"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/kacau.gif",
		alt: "csgakmod"
	};
	
	emoticons[":toast"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/toast.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpm"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/cekpm.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":repost:"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/repost3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":angel"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/angel.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":najis"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/najis.gif",
		alt: "csgakmod"
	};
	
	emoticons[":jrb:"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/jrb.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":thumbup"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/thumbup.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":cd:"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/cd1.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":repost2"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/repost2.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":2thumbup"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/2thumbup.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":mewek"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/mewek.gif",
		alt: "csgakmod"
	};
	
	emoticons[":iloveindonesia"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/iloveindonesia.gif",
		alt: "csgakmod"
	};
	
	emoticons[":telkomsel"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/telkomsel.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":cd"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/cd.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/repost.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":matabelo"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/matabelo.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hoax"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/hoax.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":takut"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/takut.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":bola"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/bola.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":recsel"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/recsel.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":marah"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/marah.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":hn"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/hn.gif",
		alt: "csgakmod"
	};
	
	emoticons[":toast"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/toast.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpm"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/cekpm.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":sup2:"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/sup2.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":rate5"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/rate5.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":hammer:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/hammer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammer"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/hammer.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":sup:"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/sup.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":bigo:"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/bigo.gif",
		alt: "csgakmod"
	};
	
	
	
	
	
	

	///////////kaskus standard////////////////////////////////////
	
	emoticons[":ricebowl:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/ricebowl.gif",
		alt: "csgakmod"
	};
	
	emoticons[":exclamati"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/exclamati.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nohope:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/nohope.gif",
		alt: "csgakmod"
	};
	


	emoticons[":mad:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/mad.gif",
		alt: "csgakmod"
	};
	
	emoticons[":beer:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/beer.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":wowcantik"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/wowcantik.gif",
		alt: "csgakmod"
	};
	
	emoticons[":doctor:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/doctor.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":shakehand"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/shakehand.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":Onigiri:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/Onigiri.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":("] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/(.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":gila:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/gila.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":linux2:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/linux2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berbusa:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/berbusa.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tv:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/tv.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":eek:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/eek.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rose:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/rose.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":o"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/o.gif",
		alt: "csgakmod"
	};
	
	emoticons[";)"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/)).gif",
		alt: "csgakmod"
	};
	
	
	
	
	
	emoticons[":linux1:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/linux1.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":bikini:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/bikini.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":thumbup:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/thumbup.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":email:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/email.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rolleyes:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/rolleyes.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":norose:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/norose.gif",
		alt: "csgakmod"
	};
	
	emoticons[":)"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/).gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":heart:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/heart.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":kucing:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/kucing.gif",
		alt: "csgakmod"
	};
	
	
	
	
	
	
	emoticons[":thumbdown"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/thumbdown.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":afro:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/afro.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kissmouth"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/kissmouth.gif",
		alt: "csgakmod"
	};
	
	emoticons[":breakheart"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/breakheart.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":think:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/think.gif",
		alt: "csgakmod"
	};
	
	emoticons[":flower:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/flower.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":rainbow:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/rainbow.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":amazed:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/amazed.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":kissing:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/kissing.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":buldog:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/buldog.giff",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":tai:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/tai.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":fm:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/fm.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rain:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/rain.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":moon:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/moon.gif",
		alt: "csgakmod"
	};
	
	emoticons[":angel:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/angel.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":kawin:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/kawin.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":clock:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/clock.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":tabrakan:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/tabrakan.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":frog:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/frog.gif",
		alt: "csgakmod"
	};
	
	
	
		
	emoticons[":metal:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/metal.gif",
		alt: "csgakmod"
	};
	
	emoticons[":anjing:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/anjing.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":kagets:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/kagets.gif",
		alt: "csgakmod"
	};
	
	emoticons[":coffee:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/coffee.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":table:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/table.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/fuck.gif",
		alt: "csgakmod"
	};
	
	
	
	
	
	emoticons[":medicine:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/medicine.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":army:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/army.gif",
		alt: "csgakmod"
	};
	
	
	
	
	
	
	
	
	emoticons[":confused:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/confused.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sun:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/sun.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":fuck2:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/fuck2.gif",
		alt: "csgakmod"
	};
	
	
	
	
	emoticons[":matabelo:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/matabelo.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":babi:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/babi.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":cool:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/cool.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":siul:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/siul.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":fuck3:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/fuck3.gif",
		alt: "csgakmod"
	};
		
	
	emoticons[":baby:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/baby.gif",
		alt: "csgakmod"
	};
	
	emoticons[":D"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/D.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":shutup:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/shutup.gif",
		alt: "csgakmod"
	};
	emoticons[":genit:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/genit.gif",
		alt: "csgakmod"
	};
	
	
	
	/////////////MALU////////////////////////////
	emoticons[":malubanget"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-260.gif",
		alt: "csgakmod"
	};
	
emoticons[":malubunga"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-39.gif",
		alt: "csgakmod"
};


emoticons[":malus"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/malus.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/malu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/malu.gif",
		alt: "csgakmod"
	};
	
	
	////////////////////////////////////
	
	//////////////////////:P:P:P:P:P:P:P:P////////////
	
	emoticons[":present:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/present.gif",
		alt: "csgakmod"
	};
	
emoticons[":peluk"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/peluk.gif",
		alt: "csgakmod"
	};
	
emoticons[":Phone:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/Phone.gif",
		alt: "csgakmod"
	};
	
emoticons[":Peace:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/Peace.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":Paws:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/Paws.gif",
		alt: "csgakmod"
	};

	
	emoticons[":pis"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-80.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":p"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/p.gif",
		alt: "csgakmod"
	};
	
	////////////////////:P:P:P:P:P:P//////////////////////////////////////////
	
	////////////////:ngacir:////////////////
	emoticons[":ngacir2"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/ngacir2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngacir:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/ngacir.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngacir"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/ngacir.gif",
		alt: "csgakmod"
	};
	
	///////////////////:ngacir:///////////////////////////////
	
	///////////////BATA////////
	emoticons[":batabig"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/batabig.gif",
		alt: "csgakmod"
	};
	
	
emoticons[":batas"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/batas.gif",
		alt: "csgakmod"
};

emoticons[":bata"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/bata.gif",
		alt: "csgakmod"
};
	///////////////////BATA//////////////
	
///////////////HIHIHIHIHIHIHIH//////////////

	emoticons[":hikhikhik"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-64.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hi:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/hi.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":hi"] = {
		src: "http://cybercode.biz/images/smilies/MissBone/miss-bone-134.gif",
		alt: "csgakmod"
	};
	//////////////////////HIHIHIHIHI//////////////////

////////////////////BINGUNG////////////////
emoticons[":bingungs"] = {
		src: "http://cybercode.biz/images/smilies/kaskussmall/bingungs.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":bingung:"] = {
		src: "http://cybercode.biz/images/smilies/kaskusstandard/bingung.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bingung"] = {
		src: "http://cybercode.biz/images/smilies/Kaskus/bingung.gif",
		alt: "csgakmod"
	};
	
	////////////////BINGUNG///////////////
	
	
	
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