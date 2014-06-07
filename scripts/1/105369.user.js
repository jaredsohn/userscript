// ==UserScript==
// @name       xxx
//@description    The 2nd 
// ==/UserScript==


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
	emoticons[":gg"] = {
		src: "http://www.esc-creation.org/images/smiles4/gg.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":najis"] = {
		src: "http://www.kaskus.co.id/images/smilies/najis.gif",
		alt: "csgakmod"
	};
	
	emoticons[":marah"] = {
		src: "http://www.kaskus.co.id/images/smilies/marah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu"] = {
		src: "http://www.kaskus.co.id/images/smilies/malu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost"] = {
		src: "http://www.kaskus.co.id/images/smilies/s_sm_repost1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sup2:"] = {
		src: "http://www.kaskus.co.id/images/smilies/sundul.gif",
		alt: "csgakmod"
	};
	
	emoticons[":batabig"] = {
		src: "http://www.kaskus.co.id/images/smilies/s_big_batamerah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":takut"] = {
		src: "http://www.kaskus.co.id/images/smilies/takut.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpm"] = {
		src: "http://www.kaskus.co.id/images/smilies/cekpm.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammer"] = {
		src: "http://www.kaskus.co.id/images/smilies/hammer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":toast"] = {
		src: "http://www.kaskus.co.id/images/smilies/toastcendol.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":halah"] = {
		src: "http://i1064.photobucket.com/albums/u364/Andrexix/Troll%20sad%20emoticon/111.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hai"] = {
		src: "http://i1064.photobucket.com/albums/u364/Andrexix/Troll%20sad%20emoticon/14.gif",
		alt: "csgakmod"
	};
	
	emoticons[":uahaha"] = {
		src: "http://i1064.photobucket.com/albums/u364/Andrexix/Troll%20sad%20emoticon/118.gif",
		alt: "csgakmod"
	};
	
	emoticons[":yihihi"] = {
		src: "http://i1064.photobucket.com/albums/u364/Andrexix/Troll%20sad%20emoticon/121.gif",
		alt: "csgakmod"
	};
	
	emoticons[":huha"] = {
		src: "http://i1064.photobucket.com/albums/u364/Andrexix/Troll%20sad%20emoticon/129.gif",
		alt: "csgakmod"
	};
	
	emoticons[":omg"] = {
		src: "http://i45.tinypic.com/15alar.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mangan"] = {
		src: "http://i46.tinypic.com/30u3kgi.gif",
		alt: "csgakmod"
	};
	
	emoticons[":jiancuk"] = {
		src: "http://i1064.photobucket.com/albums/u364/Andrexix/Troll%20sad%20emoticon/KRyBm.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mangkal"] = {
		src: "http://i1064.photobucket.com/albums/u364/Andrexix/Troll%20sad%20emoticon/6421206420111011165051026.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gendong"] = {
		src: "http://i1064.photobucket.com/albums/u364/Andrexix/Troll%20sad%20emoticon/LiuBaJinGuanChang028.gif",
		alt: "csgakmod"
	};
	
	
	
	
	
	
	emoticons[":iloveindonesia"] = {
		src: "http://www.kaskus.co.id/images/smilies/I-Luv-Indonesia.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":nosara"] = {
		src: "http://www.kaskus.co.id/images/smilies/nosara.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berduka"] = {
		src: "http://www.kaskus.co.id/images/smilies/berduka.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":repost2"] = {
		src: "http://www.kaskus.co.id/images/smilies/s_sm_repost2.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":ngacir2"] = {
		src: "http://www.kaskus.co.id/images/smilies/ngacir2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bingung"] = {
		src: "http://www.kaskus.co.id/images/smilies/bingung.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":cd"] = {
		src: "http://www.kaskus.co.id/images/smilies/capede.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hoax"] = {
		src: "http://www.kaskus.co.id/images/smilies/hoax.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendols"] = {
		src: "http://www.kaskus.co.id/images/smilies/cendols.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":bingungs"] = {
		src: "http://www.kaskus.co.id/images/smilies/bingungs.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":rose:"] = {
		src: "http://www.kaskus.co.id/images/smilies/sumbangan/34.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":shock"] = {
		src: "http://www.esc-creation.org/images/smiles5/shock.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":Peace"] = {
		src: "http://www.kaskus.co.id/images/smilies/sumbangan/005.gif",
		alt: "csgakmod"
	};
	
	;
	
	emoticons[":sorak"] = {
		src: "http://www.esc-creation.org/images/smiles1/thewave.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost:"] = {
		src: "http://www.kaskus.co.id/images/smilies/fd_7.gif",
		alt: "csgakmod"
	};
	
	emoticons[":capek:"] = {
		src: "http://www.esc-creation.org/images/smiles7/capek.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cd:"] = {
		src: "http://www.kaskus.co.id/images/smilies/fd_2.gif",
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
		src: "http://www.kaskus.co.id/images/smilies/sumbangan/shit-3.gif",
		alt: "csgakmod"
	}
		
	emoticons[":rate1:"] = {
		src: "http://www.kaskus.co.id/images/rating/rating_1.gif",
		alt: "csgakmod"
	}
	
	
	emoticons[":peluk"] = {
		src: "http://www.kaskus.co.id/images/smilies/peluk.gif",
		alt: "csgakmod"
	};
	
	emoticons[":anjing:"] = {
		src: "http://www.kaskus.co.id/images/smilies/sumbangan/29.gif",
		alt: "csgakmod"
	};

	emoticons[":moon:"] = {
		src: "http://www.kaskus.co.id/images/smilies/sumbangan/007.gif",
		alt: "csgakmod"
	};
	
	emoticons[":baby:"] = {
		src: "http://www.kaskus.co.id/images/smilies/sumbangan/30.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kucing:"] = {
		src: "http://www.kaskus.co.id/images/smilies/sumbangan/28.gif",
		alt: "csgakmod"
	};
	
	emoticons[":norose:"] = {
		src: "http://www.kaskus.co.id/images/smilies/sumbangan/35.gif",
		alt: "csgakmod"
	};
	
	emoticons[":Onigiri:"] = {
		src: "http://www.kaskus.co.id/images/smilies/sumbangan/rice.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ricebowl:"] = {
		src: "http://www.kaskus.co.id/images/smilies/sumbangan/32.gif",
		alt: "csgakmod"
	};
	emoticons[":mewek"] = {
		src: "http://www.kaskus.co.id/images/smilies/mewek.gif",
		alt: "csgakmod"
	};
	emoticons[":angel"] = {
		src: "http://www.kaskus.co.id/images/smilies/angel1.gif",
		alt: "csgakmod"
	};
	emoticons[":matabelo"] = {
		src: "http://www.kaskus.co.id/images/smilies/matabelo1.gif",
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	emoticons[":gha"] = {
		src: "http://www.esc-creation.org/images/smiles11/ghamod.gif",
		alt: "csgakmod"
	};
	emoticons[":mimis"] = {
		src: "http://www.esc-creation.org/images/smiles11/what.gif",
		alt: "csgakmod"
	};
	emoticons[":pika"] = {
		src: "http://www.esc-creation.org/images/smiles9/pika.gif",
		alt: "csgakmod"
	};
	emoticons[":ganteng"] = {
		src: "http://www.esc-creation.org/images/smiles12/lebay.gif",
		alt: "csgakmod"
		};
	emoticons[":repost"] = {
		src: "http://www.esc-creation.org/images/smiles1/fd_7.gif",
		alt: "csgakmod"
		};
	emoticons[":hula"] = {
		src: "http://www.esc-creation.org/images/smiles11/hula.gif",
		alt: "csgakmod"
		};
	emoticons[":jus"] = {
		src: "http://www.esc-creation.org/images/smiles6/jus.gif",
		alt: "csgakmod"
		};
	emoticons[":hihi"] = {
		src: "http://www.esc-creation.org/images/smiles2/hihi.gif",
		alt: "csgakmod"
		};
	emoticons[":ngeces"] = {
		src: "http://www.esc-creation.org/images/smiles11/ngeces.gif",
		alt: "csgakmod"
		};
	emoticons[":lirik"] = {
		src: "http://www.esc-creation.org/images/smiles11/lirik.gif",
		alt: "csgakmod"
		};
	emoticons[":mikir"] = {
		src: "http://www.esc-creation.org/images/smiles11/mikir.gif",
		alt: "csgakmod"
		};
		emoticons[":mumet"] = {
		src: "http://www.esc-creation.org/images/single/mumet.gif",
		alt: "csgakmod"
		};
	emoticons[":gaul"] = {
		src: "http://smiles.vinaget.us/74.gif",
		alt: "csgakmod"
		};
	emoticons[":loncat"] = {
		src: "http://www.esc-creation.org/images/smiles10/loncat.gif",
		alt: "csgakmod"
		};
	emoticons[":cuek"] = {
		src: "http://www.esc-creation.org/images/smiles10/cuek.gif",
		alt: "csgakmod"
		};
	emoticons[":takut"] = {
		src: "http://www.esc-creation.org/images/smiles10/takut.gif",
		alt: "csgakmod"
		};
	emoticons[":bukan"] = {
		src: "http://www.esc-creation.org/images/smiles10/bukan.gif",
		alt: "csgakmod"
		};
	emoticons[":smoke"] = {
		src: "http://www.esc-creation.org/images/smiles10/smoke.gif",
		alt: "csgakmod"
		};
	emoticons[":pesona"] = {
		src: "http://www.esc-creation.org/images/smiles10/pesona.gif",
		alt: "csgakmod"
		};

	emoticons[":jalan"] = {
		src: "http://www.esc-creation.org/images/smiles10/jalan.gif",
		alt: "csgakmod"
		};
	emoticons[":tidur"] = {
		src: "http://www.esc-creation.org/images/smiles10/tiduran.gif",
		alt: "csgakmod"
		};
	emoticons[":hulahop"] = {
		src: "http://www.esc-creation.org/images/smiles10/hulahop.gif",
		alt: "csgakmod"
		};
	emoticons[":wk"] = {
		src: "http://www.esc-creation.org/images/smiles10/wk.gif",
		alt: "csgakmod"
		};
	emoticons[":goyang"] = {
		src: "http://www.esc-creation.org/images/smiles10/goyang.gif",
		alt: "csgakmod"
		};
	emoticons[":bisik"] = {
		src: "http://www.esc-creation.org/images/smiles9/bisik.gif",
		alt: "csgakmod"
		};
	emoticons[":maju"] = {
		src: "http://www.esc-creation.org/images/smiles9/maju.gif",
		alt: "csgakmod"
		};
	emoticons[":mandi"] = {
		src: "http://www.esc-creation.org/images/smiles9/mandi.gif",
		alt: "csgakmod"
		};
	emoticons[":gergaji"] = {
		src: "http://www.esc-creation.org/images/smiles7/gergaji.gif",
		alt: "csgakmod"
		};
	emoticons[":shy"] = {
		src: "http://www.esc-creation.org/images/smiles7/shy.gif",
		alt: "csgakmod"
		};
	emoticons[":awas"] = {
		src: "http://www.esc-creation.org/images/smiles7/awas.gif",
		alt: "csgakmod"
		};
	emoticons[":call"] = {
		src: "http://www.esc-creation.org/images/smiles7/call.gif",
		alt: "csgakmod"
		};
	emoticons[":periksa"] = {
		src: "http://www.esc-creation.org/images/smiles7/periksa.gif",
		alt: "csgakmod"
		};
	emoticons[":duit"] = {
		src: "http://www.esc-creation.org/images/smiles7/duit.gif",
		alt: "csgakmod"
		};
	emoticons[":foto"] = {
		src: "http://www.esc-creation.org/images/smiles6/jepret.gif",
		alt: "csgakmod"
		};
	emoticons[":gembira"] = {
		src: "http://www.esc-creation.org/images/smiles1/m121.gif",
		alt: "csgakmod"
		};
	emoticons[":pingin"] = {
		src: "http://www.esc-creation.org/images/smiles4/pingin.gif",
		alt: "csgakmod"
		};
	emoticons[":gosip"] = {
		src: "http://www.esc-creation.org/images/smiles4/nyimak.gif",
		alt: "csgakmod"
		};
		
		
		
		
		
		
		
		
		
	emoticons[":no"] = {
		src: "http://smiles.vinaget.us/102.gif",
		alt: "csgakmod"
		};
	emoticons[":nangis"] = {
		src: "http://www.esc-creation.org/images/smiles3/nangis.gif",
		alt: "csgakmod"
		};
		
	emoticons[":tinju"] = {
		src: "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/yoyo/yoyo-emoticon-1-074.gif",
		alt: "csgakmod"
		};
		
		
		
		
		
		emoticons[":kepruk"] = {
		src: "http://smiles.vinaget.us/hambalos1.gif",
		alt: "csgakmod"
		};
	

	emoticons[":striptis"] = {
		src: "http://smiles.vinaget.us/muacot.gif",
		alt: "csgakmod"
		};
		
		
	emoticons[":ciu"] = {
		src: "http://smiles.vinaget.us/10minu.gif",
		alt: "csgakmod"
		};
		
		
		
		
	
	emoticons[":ihwaw"] = {
		src: "http://i1064.photobucket.com/albums/u364/Andrexix/Troll%20sad%20emoticon/116.gif",
		alt: "csgakmod"
		};
	emoticons[":ejek"] = {
		src: "http://www.smileycodes.info/emo/yoyocici/201.gif",
		alt: "csgakmod"
		};
	emoticons[":fantasi"] = {
		src: "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/yoyo/yoyo-emoticon-1-054.gif",
		alt: "csgakmod"
		};
	emoticons[":finger"] = {
		src: "http://www.smileycodes.info/emo/onion/93.gif",
		alt: "csgakmod"
		};

	
	emoticons[":latah"] = {
		src: "http://www.smileycodes.info/emo/yoyocici/208.gif",
		alt: "csgakmod"
		};
	emoticons[":nyerah"] = {
		src: "http://www.esc-creation.org/images/smiles3/nyerah.gif",
		alt: "csgakmod"
		};
	emoticons[":mohon"] = {
		src: "http://www.esc-creation.org/images/smiles1/m107.gif",
		alt: "csgakmod"
		};
	emoticons[":grpme"] = {
		src: "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/yoyo/yoyo-emoticon-2-016.gif",
		alt: "csgakmod"
		};
	emoticons[":ngadem"] = {
		src: "http://smiles.vinaget.us/mat.gif",
		alt: "csgakmod"
		};
	emoticons[":intip"] = {
		src: "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/yoyo/yoyo-emoticon-2-032.gif",
		alt: "csgakmod"
		};
	emoticons[":tersipu"] = {
		src: "http://smiles.vinaget.us/12.gif",
		alt: "csgakmod"
		};
	emoticons[":nyoh"] = {
		src: "http://smiles.vinaget.us/12.gif",
		alt: "csgakmod"
		};
	emoticons[":aini"] = {
		src: "http://www.esc-creation.org/images/smilies-a/aini.gif",
		alt: "csgakmod"
		};
	emoticons[":lari"] = {
		src: "http://www.esc-creation.org/images/smiles1/lari.gif",
		alt: "csgakmod"
		};
	emoticons[":siso"] = {
		src: "http://www.esc-creation.org/images/smilies-a/siso.gif",
		alt: "csgakmod"
		};
	emoticons[":belajar"] = {
		src: "http://smiles.vinaget.us/motsach.gif",
		alt: "csgakmod"
		};
	
	emoticons[":sinau"] = {
		src: "http://www.smileycodes.info/emo/onion/109.gif",
		alt: "csgakmod"
		};
	emoticons[":bego"] = {
		src: "http://cdn-u.kaskus.co.id/46/rxvmmqtr.gif",
		alt: "csgakmod"
		};
	emoticons[":garang"] = {
		src: "http://smiles.vinaget.us/nhanhiem.gif",
		alt: "csgakmod"
		};
	emoticons[":kaget"] = {
		src: "http://smiles.vinaget.us/1.gif",
		alt: "csgakmod"
		};
	emoticons[":bye"] = {
		src: "http://smiles.vinaget.us/Orion_34.gif",
		alt: "csgakmod"
		};
	
	
	emoticons[":nesu"] = {
		src: "http://cdn-u.kaskus.co.id/46/fkjvkpqi.gif",
		alt: "csgakmod"
		};
	emoticons[":ngamuk"] = {
		src: "http://www.laymark.com/l/o/31.gif",
		alt: "csgakmod"
		};
	emoticons[":nothear"] = {
		src: "http://www.esc-creation.org/images/smiles4/nothear.gif",
		alt: "csgakmod"
		};
	emoticons[":dead"] = {
		src: "http://www.esc-creation.org/images/smiles4/dead.gif",
		alt: "csgakmod"
		};
	emoticons[":away"] = {
		src: "http://www.esc-creation.org/images/smiles4/away.gif",
		alt: "csgakmod"
		};
	emoticons[":pol"] = {
		src: "http://smiles.vinaget.us/pei4.gif",
		alt: "csgakmod"
		};
	emoticons[":ultah"] = {
		src: "http://www.esc-creation.org/images/smiles1/birthday.gif",
		alt: "csgakmod"
		};
	emoticons[":turu"] = {
		src: "http://www.esc-creation.org/images/smiles10/tiduran.gif",
		alt: "csgakmod"
		};
	emoticons[":tolong"] = {
		src: "http://cdn-u.kaskus.co.id/46/s5gte4fw.gif",
		alt: "csgakmod"
		};
	emoticons[":barbel"] = {
		src: "http://smiles.vinaget.us/tapta.gif",
		alt: "csgakmod"
		};
	emoticons[":zoro"] = {
		src: "http://www.smileycodes.info/emo/onion/115.gif",
		alt: "csgakmod"
		};
	emoticons[":hipnotis"] = {
		src: "http://www.smileycodes.info/emo/onion/102.gif",
		alt: "csgakmod"
		};
	emoticons[":tinjau"] = {
		src: "http://smiles.vinaget.us/th_JFBQ00156070205A.gif",
		alt: "csgakmod"
		};
	emoticons[":mau"] = {
		src: "http://www.esc-creation.org/images/smiles4/mau.gif",
		alt: "csgakmod"
		};
	emoticons[":lulus"] = {
		src: "http://www.smileycodes.info/emo/onion/119.gif",
		alt: "csgakmod"
		};
	emoticons[":ting"] = {
		src: "http://www.laymark.com/l/o/11.gif",
		alt: "csgakmod"
		};
		
		
	emoticons[":teriak"] = {
		src: "http://www.esc-creation.org/images/smiles4/teriak.gif",
		alt: "csgakmod"
		};
	emoticons[":ocha"] = {
		src: "http://www.esc-creation.org/images/smiles4/ocha.gif",
		alt: "csgakmod"
		};
	emoticons[":pray"] = {
		src: "http://www.esc-creation.org/images/smiles4/pray.gif",
		alt: "csgakmod"
		};
	emoticons[":hun"] = {
		src: "http://www.esc-creation.org/images/smiles4/hun.gif",
		alt: "csgakmod"
		};
	emoticons[":rokok"] = {
		src: "http://www.esc-creation.org/images/smiles4/rokok.gif",
		alt: "csgakmod"
		};
	emoticons[":seram"] = {
		src: "http://www.esc-creation.org/images/smiles8/takut.gif",
		alt: "csgakmod"
		};
	emoticons[":ngambek"] = {
		src: "http://www.esc-creation.org/images/smiles6/ngambek.gif",
		alt: "csgakmod"
		};
	emoticons[":kiss"] = {
		src: "http://www.esc-creation.org/images/smiles6/kiss.gif",
		alt: "csgakmod"
		};
	
		
	emoticons[":perhatian"] = {
		src: "http://www.esc-creation.org/images/smiles7/perhatian.gif",
		alt: "csgakmod"
		};
	
	emoticons[":nyesel"] = {
		src: "http://www.esc-creation.org/images/single/nyesel.gif",
		alt: "csgakmod"
		};
	emoticons[":hah"] = {
		src: "http://www.esc-creation.org/images/smiles11/hah.gif",
		alt: "csgakmod"
		};
	emoticons[":tanya"] = {
		src: "http://www.esc-creation.org/images/smiles1/yociexp113.gif",
		alt: "csgakmod"
		};
	emoticons[":huft"] = {
		src: "http://www.esc-creation.org/images/smiles2/swt.gif",
		alt: "csgakmod"
		};
	emoticons[":tapuk"] = {
		src: "http://www.esc-creation.org/images/smiles2/tapuk.gif",
		alt: "csgakmod"
		};
	emoticons[":metal"] = {
		src: "http://www.esc-creation.org/images/smiles1/metal.png",
		alt: "csgakmod"
		};
	emoticons[":gy"] = {
		src: "http://www.esc-creation.org/images/smiles10/gy.gif",
		alt: "csgakmod"
		};
	emoticons[":puss"] = {
		src: "http://www.esc-creation.org/images/smiles1/pussy.gif",
		alt: "csgakmod"
		};
	emoticons[":sakit"] = {
		src: "http://www.esc-creation.org/images/smiles12/sakit.gif",
		alt: "csgakmod"
		};
	emoticons[":tunggu"] = {
		src: "http://www.esc-creation.org/images/smiles12/tunggu.gif",
		alt: "csgakmod"
		};
	emoticons[":sapu"] = {
		src: "http://www.esc-creation.org/images/smiles9/sapu.gif",
		alt: "csgakmod"
		};
	emoticons[":pm"] = {
		src: "http://www.esc-creation.org/images/smiles9/pm.gif",
		alt: "csgakmod"
		};
	emoticons[":lebay"] = {
		src: "http://www.esc-creation.org/images/smiles9/cabul.gif",
		alt: "csgakmod"
		};
	emoticons[":panik"] = {
		src: "http://www.esc-creation.org/images/smiles14/panik.gif",
		alt: "csgakmod"
		};
	emoticons[":guguk"] = {
		src: "http://www.esc-creation.org/images/smiles14/guguk.gif",
		alt: "csgakmod"
		};
	emoticons[":itu"] = {
		src: "http://www.esc-creation.org/images/smiles14/itu.gif",
		alt: "csgakmod"
		};
	emoticons[":asik"] = {
		src: "http://www.esc-creation.org/images/smiles14/asik.gif",
		alt: "csgakmod"
		};
	emoticons[":mantab"] = {
		src: "http://www.esc-creation.org/images/smiles14/mantab.gif",
		alt: "csgakmod"
		};
	emoticons[":oi"] = {
		src: "http://www.esc-creation.org/images/smiles14/oi.gif",
		alt: "csgakmod"
		};
	emoticons[":apa"] = {
		src: "http://www.esc-creation.org/images/smiles14/apa.gif",
		alt: "csgakmod"
		};
	emoticons[":gemes"] = {
		src: "http://www.esc-creation.org/images/smiles14/gemes.gif",
		alt: "csgakmod"
		};
	emoticons[":manja"] = {
		src: "http://www.esc-creation.org/images/smiles14/manja.jpg",
		alt: "csgakmod"
		};
	emoticons[":icik"] = {
		src: "http://www.esc-creation.org/images/smiles14/icik.gif",
		alt: "csgakmod"
		};
	emoticons[":help"] = {
		src: "http://www.esc-creation.org/images/smiles14/help.gif",
		alt: "csgakmod"
		};
	emoticons[":haru"] = {
		src: "http://www.esc-creation.org/images/smiles16/haru.gif",
		alt: "csgakmod"
		};
	emoticons[":mak"] = {
		src: "http://www.esc-creation.org//images/smiles16/mak.gif",
		alt: "csgakmod"
		};
	emoticons[":sapu"] = {
		src: "http://www.esc-creation.org/images/smiles9/sapu.gif",
		alt: "csgakmod"
		};
	emoticons[":hope"] = {
		src: "http://www.esc-creation.org/images/smiles4/hope.gif",
		alt: "csgakmod"
		};
	emoticons[":senang"] = {
		src: "http://4.bp.blogspot.com/-4PAnP21db38/TgMRojmYIXI/AAAAAAAAATk/NTDUPiefN3U/s1600/paopaobing110.gif",
		alt: "csgakmod"
		};	
	emoticons[":huahaha"] = {
		src: "http://4.bp.blogspot.com/-jiQy87xmo5w/TgMRre5h-xI/AAAAAAAAATw/i1pkF7bfbaY/s1600/paopaobing120.gif",
		alt: "csgakmod"
		};	
	emoticons[":murung"] = {
		src: "http://www.esc-creation.org//images/smiles16/murung.gif",
		alt: "csgakmod"
		};	
	emoticons[":brem"] = {
		src: "http://3.bp.blogspot.com/-obaXdEYstJk/TgMOE01hM3I/AAAAAAAAAS4/6uhDop29AYk/s1600/paopaobing57.gif",
		alt: "csgakmod"
		};	
	emoticons[":huaa"] = {
		src: "http://www.smileycodes.info/emo/babysoldier/52.gif",
		alt: "csgakmod"
		};	
	emoticons[":hehe"] = {
		src: "http://www.esc-creation.org/images/smiles14/hehe.gif",
		alt: "csgakmod"
		};	
	emoticons[":miaw"] = {
		src: "http://1.bp.blogspot.com/-az59YR-Z_Ao/TgMRqbUwRHI/AAAAAAAAATs/iX7qMI0xCk0/s1600/paopaobing112.gif",
		alt: "csgakmod"
		};	
	emoticons[":dont"] = {
		src: "http://www.smileycodes.info/emo/babysoldier/76.gif",
		alt: "csgakmod"
		};	
	emoticons[":mlaku"] = {
		src: "http://www.smileycodes.info/emo/babysoldier/35.gif",
		alt: "csgakmod"
		};	
	emoticons[":juss"] = {
		src: "http://www.smileycodes.info/emo/babysoldier/96.gif",
		alt: "csgakmod"
		};	
	emoticons[":sing"] = {
		src: "http://www.smileycodes.info/emo/babysoldier/90.gif",
		alt: "csgakmod"
		};	
	emoticons[":fuck"] = {
		src: "http://www.smileycodes.info/emo/babysoldier/43.gif",
		alt: "csgakmod"
		};	
		
		
		emoticons[":goyang"] = {
		src: "http://www.laymark.com/l/m/m022.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tarzan"] = {
		src: "http://www.laymark.com/l/m/m019.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kipas"] = {
		src: "http://www.laymark.com/l/m/m137.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maju"] = {
		src: "http://www.esc-creation.org/images/smiles9/maju.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cute"] = {
		src: "http://www.laymark.com/l/m/m161.gif",
		alt: "csgakmod"
	};
	

	
	emoticons[":mantab"] = {
		src: "http://www.esc-creation.org/images/smiles14/mantab.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":sombong"] = {
		src: "http://smiles.vinaget.us/11.gif",
		alt: "csgakmod"
	};
	

	
	
	
	emoticons[":gembira"] = {
		src: "http://www.esc-creation.org/images/smiles1/m121.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak"] = {
		src: "http://www.esc-creation.org/images/smiles1/haha.gif",
		alt: "csgakmod"
	};
	

	
	emoticons[":gege"] = {
		src: "http://www.laymark.com/l/m/m131.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":geleng"] = {
		src: "http://www.laymark.com/l/m/m052.gif",
		alt: "csgakmod"
	};
	
	emoticons[":heeh"] = {
		src: "http://www.esc-creation.org/images/smilies-a/hihi.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bau"] = {
		src: "http://www.esc-creation.org/images/smilies-a/bau.gif",
		alt: "csgakmod"
	};
	
	emoticons[":suit"] = {
		src: "http://www.esc-creation.org/images/smilies-a/suit.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hoho"] = {
		src: "http://www.esc-creation.org/images/smilies-a/hoho.gif",
		alt: "csgakmod"
	};
	emoticons[":ajib"] = {
		src: "http://www.esc-creation.org/images/smilies-a/sip.gif",
		alt: "csgakmod"
	};
	emoticons[":iwakpeyek"] = {
		src: "http://1.bp.blogspot.com/-x94WBTRYbJA/T9S43DocnKI/AAAAAAAAAJ0/fLrW4HEA7gY/s1600/hrmxwtt5.gif",
		alt: "csgakmod"
	};
	
		emoticons[":iwk"] = {
		src: "http://4.bp.blogspot.com/-I_6JMuOyHTk/T9S41uTHq5I/AAAAAAAAAJs/aLrPdmUSeGk/s1600/g0rclb6n.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":sodok"] = {
		src: "http://www.laymark.com/l/m/m009.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mandi"] = {
		src: "http://www.laymark.com/l/m/m115.gif",
		alt: "csgakmod"
	};
	
	emoticons[":lico"] = {
		src: "http://www.semprot.com/x_img/em/konak.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malaikat"] = {
		src: "http://www.laymark.com/l/m/m073.gif",
		alt: "csgakmod"
	};
	emoticons[":hi"] = {
		src: "http://www.laymark.com/l/m/m139.gif",
		alt: "csgakmod"
	};
	

	
	emoticons[":yoyo"] = {
		src: "http://www.laymark.com/l/m/m036.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nyanyi"] = {
		src: "http://smiles.vinaget.us/169.gif",
		alt: "csgakmod"
	};
	
	emoticons[":smangad"] = {
		src: "http://smiles.vinaget.us/Yoyo_26.gif",
		alt: "csgakmod"
	};
	
	emoticons[":game"] = {
		src: "http://www.laymark.com/l/m/m102.gif",
		alt: "csgakmod"
	};
	
	emoticons[":makan"] = {
		src: "http://www.laymark.com/l/m/m148.gif",
		alt: "csgakmod"
	};
	
	emoticons[":petasan"] = {
		src: "http://www.laymark.com/l/m/m135.gif",
		alt: "csgakmod"
	};
	
	emoticons[":dolar"] = {
		src: "http://www.laymark.com/l/m/m151.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bintang"] = {
		src: "http://www.laymark.com/l/m/m153.gif",
		alt: "csgakmod"
	};
	
	emoticons[":permen"] = {
		src: "http://www.laymark.com/l/m/m154.gif",
		alt: "csgakmod"
	};
	
	emoticons[":terharu"] = {
		src: "http://www.laymark.com/l/m/m204.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kenyang"] = {
		src: "http://smiles.vinaget.us/336-.gif",
		alt: "csgakmod"
	};
	

	
	emoticons[":mati"] = {
		src: "http://www.laymark.com/l/m/m098.gif",
		alt: "csgakmod"
	};
	
		
	
	
	emoticons[":loveu"] = {
		src: "http://smiles.vinaget.us/119.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ye"] = {
		src: "http://www.laymark.com/l/m/m208.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sadis:"] = {
		src: "http://www.laymark.com/l/m/m101.gif",
		alt: "csgakmod"
	};
	
	emoticons[":flu"] = {
		src: "http://i306.photobucket.com/albums/nn252/cebong_ipit/ALL%20EMOTICON/yoyo/yoyo-emoticon-1-053.gif",
		alt: "csgakmod"
	};
	
	emoticons[":diam"] = {
		src: "http://www.esc-creation.org/images/smiles3/bingung.gif",
		alt: "csgakmod"
	};
	
	emoticons[":alone"] = {
		src: "http://www.laymark.com/l/m/m068.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sujud"] = {
		src: "http://smiles.vinaget.us/icon_bow.gif",
		alt: "csgakmod"
	};
	

	emoticons[":kebelet"] = {
		src: "http://smiles.vinaget.us/ditdo.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngeng"] = {
		src: "http://smiles.vinaget.us/232.gif",
		alt: "csgakmod"
	};
	
	emoticons[":huft"] = {
		src: "http://www.laymark.com/l/m/m187.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sugoii"] = {
		src: "http://smiles.vinaget.us/2onion16.gif",
		alt: "csgakmod"
	};
	

	emoticons[":ayam"] = {
		src: "http://www.laymark.com/l/m/m200.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hormat"] = {
		src: "http://smiles.vinaget.us/anhso-26_chao.gif",
		alt: "csgakmod"
	};
	
	emoticons[":laugh"] = {
		src: "http://smiles.vinaget.us/cuoiranuocmat.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gepuk"] = {
		src: "http://smiles.vinaget.us/hambalos1.gif",
		alt: "csgakmod"
	};
	
	
	
	emoticons[":koran"] = {
		src: "http://smiles.vinaget.us/hac_1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tos"] = {
		src: "http://smiles.vinaget.us/chucmung.gif",
		alt: "csgakmod"
	};
	
	emoticons[":yowes"] = {
		src: "http://photoserver.ws/images/CDKW4de3b6a3750e2.gif",
		alt: "csgakmod"
	};
		
	emoticons[":ckaka"] = {
		src: "http://www.esc-creation.org/images/smilies-a/ckaka.gif",
		alt: "csgakmod"
	};









	
	emoticons[":wg"] = {
		src: "http://emoticoner.com/files/emoticons/soldier-baby/clapping-soldier-baby-emoticon.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":yowes"] = {
		src: "http://photoserver.ws/images/CDKW4de3b6a3750e2.gif",
		alt: "csgakmod"
	};
	
		
		
		
		
		
		
		
	emoticons[":hot"] = {
		src: "http://www.esc-creation.org/images/smiles7/hot.gif",
		alt: "csgakmod"
		};	
	emoticons[":angkattangan"] = {
		src: "http://2.bp.blogspot.com/-4L2n0NrYIsY/TgMN66FpGJI/AAAAAAAAAS0/QWeJujNy0E0/s1600/paopaobing43.gif",
		alt: "csgakmod"
		};		
	emoticons[":hmmm"] = {
		src: "http://2.bp.blogspot.com/-3SatrImAp2M/TgMU-3YBLEI/AAAAAAAAAT0/q4b-dSPvn_w/s1600/paopaobing121.gif",
		alt: "csgakmod"
		};		
	emoticons[":ngantuk"] = {
		src: "http://www.smileycodes.info/emo/babysoldier/33.gif",
		alt: "csgakmod"
		};		
	emoticons[":wawwaw"] = {
		src: "http://www.smileycodes.info/emo/babysoldier/56.gif",
		alt: "csgakmod"
		};		
	emoticons[":mandibusa"] = {
		src: "http://www.smileycodes.info/emo/babysoldier/64.gif",
		alt: "csgakmod"
		};		
	emoticons[":wiiw"] = {
		src: "http://i655.photobucket.com/albums/uu273/cebongipiet/bigpaopaobing/smriwing.gif",
		alt: "csgakmod"
		};		
	emoticons[":ngambek1"] = {
		src: "http://www.smileycodes.info/emo/babysoldier/100.gif",
		alt: "csgakmod"
		};		
	emoticons[":ngupil"] = {
		src: "http://i655.photobucket.com/albums/uu273/cebongipiet/bigpaopaobing/ngupil.gif",
		alt: "csgakmod"
		};		
		
	emoticons[":depresi"] = {
		src: "http://www.esc-creation.org/images/smiles4/depresi.gif",
		alt: "csgakmod"
		};		
	emoticons[":trims"] = {
		src: "http://www.esc-creation.org/images/smiles1/terimakasih.gif",
		alt: "csgakmod"
		};		
	emoticons[":ehm"] = {
		src: "http://www.esc-creation.org/images/smiles4/ehm.gif",
		alt: "csgakmod"
		};	

	emoticons[":tuken"] = {
		src: "http://i45.tinypic.com/33kr9c8.jpg",
		alt: "csgakmod"
		};	

		
	emoticons[":cool"] = {
		src: "http://smiles.vinaget.us/th_yociexp21.gif",
		alt: "csgakmod"
		};		
	emoticons[":tapir"] = {
		src: "http://i655.photobucket.com/albums/uu273/cebongipiet/bigpaopaobing/hoeekzz.gif",
		alt: "csgakmod"
		};		
	emoticons[":gitar"] = {
		src: "http://i655.photobucket.com/albums/uu273/cebongipiet/bigpaopaobing/gitaran_dolo_agh.gif",
		alt: "csgakmod"
		};		
	emoticons[":udut"] = {
		src: "http://4.bp.blogspot.com/-sSuqzaKJvh0/TgMVUw6EnDI/AAAAAAAAAUA/omQSZ4aqL5w/s1600/paopaobing126.gif",
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
