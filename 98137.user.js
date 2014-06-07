// ==UserScript==
// @name           Test emo v.1
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// @version        1.0
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
	emoticons[":ilovekaskus"] = {
		src: "http://www.kaskus.us/images/smilies/s_sm_ilovekaskus.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kiss"] = {
		src: "http://www.kaskus.us/images/smilies/cewek.gif",
		alt: "csgakmod"
	};
	
	emoticons[":najis"] = {
		src: "http://www.kaskus.us/images/smilies/najis.gif",
		alt: "csgakmod"
	};

	emoticons[":marah"] = {
		src: "http://www.kaskus.us/images/smilies/marah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu"] = {
		src: "http://www.kaskus.us/images/smilies/malu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost"] = {
		src: "http://www.kaskus.us/images/smilies/s_sm_repost1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sup2:"] = {
		src: "http://www.kaskus.us/images/smilies/sundul.gif",
		alt: "csgakmod"
	};
	
	emoticons[":batabig"] = {
		src: "http://www.kaskus.us/images/smilies/s_big_batamerah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":takut"] = {
		src: "http://www.kaskus.us/images/smilies/takut.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpm"] = {
		src: "http://www.kaskus.us/images/smilies/cekpm.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammer"] = {
		src: "http://www.kaskus.us/images/smilies/hammer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":toast"] = {
		src: "http://www.kaskus.us/images/smilies/toastcendol.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cystg"] = {
		src: "http://www.kaskus.us/images/smilies/cystg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":iloveindonesia"] = {
		src: "http://www.kaskus.us/images/smilies/I-Luv-Indonesia.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maho"] = {
		src: "http://www.kaskus.us/images/smilies/s_sm_maho.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nosara"] = {
		src: "http://www.kaskus.us/images/smilies/nosara.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berduka"] = {
		src: "http://www.kaskus.us/images/smilies/berduka.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak"] = {
		src: "http://www.kaskus.us/images/smilies/ngakak.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost2"] = {
		src: "http://www.kaskus.us/images/smilies/s_sm_repost2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendolbig"] = {
		src: "http://www.kaskus.us/images/smilies/s_big_cendol.gif",
		alt: "csgakmod"
	};
	
	emoticons[":recsel"] = {
		src: "http://www.kaskus.us/images/smilies/recseller.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngacir2"] = {
		src: "http://www.kaskus.us/images/smilies/ngacir2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bingung"] = {
		src: "http://www.kaskus.us/images/smilies/bingung.gif",
		alt: "csgakmod"
	};
	emoticons[":bingung:"] = {
		src: "http://static.slowbos.com/emot/mky/bingung.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cd"] = {
		src: "http://www.kaskus.us/images/smilies/capede.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hoax"] = {
		src: "http://www.kaskus.us/images/smilies/hoax.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendols"] = {
		src: "http://www.kaskus.us/images/smilies/cendols.gif",
		alt: "csgakmod"
	};
	
	emoticons[":p"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/6.gif",
		alt: "csgakmod"
	};
	
	emoticons[":iloveindonesias"] = {
		src: "http://www.kaskus.us/images/smilies/iloveindonesias.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berdukas"] = {
		src: "http://www.kaskus.us/images/smilies/berdukas.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bingungs"] = {
		src: "http://www.kaskus.us/images/smilies/bingungs.gif",
		alt: "csgakmod"
	};
	
	emoticons[":najiss"] = {
		src: "http://www.kaskus.us/images/smilies/najiss.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ilovekaskuss"] = {
		src: "http://www.kaskus.us/images/smilies/iluvkaskuss.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mads"] = {
		src: "http://www.kaskus.us/images/smilies/mads.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sundulgans"] = {
		src: "http://www.kaskus.us/images/smilies/sundulgans.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammers"] = {
		src: "http://www.kaskus.us/images/smilies/hammers.gif",
		alt: "csgakmod"
	};
	
	emoticons[":batas"] = {
		src: "http://www.kaskus.us/images/smilies/batas.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpms"] = {
		src: "http://www.kaskus.us/images/smilies/cekpms.gif",
		alt: "csgakmod"
	};
	
	emoticons[":capedes"] = {
		src: "http://www.kaskus.us/images/smilies/capedes.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahos"] = {
		src: "http://www.kaskus.us/images/smilies/mahos.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malus"] = {
		src: "http://www.kaskus.us/images/smilies/malus.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kisss"] = {
		src: "http://www.kaskus.us/images/smilies/kisss.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakaks"] = {
		src: "http://www.kaskus.us/images/smilies/ngakaks.gif",
		alt: "csgakmod"
	};
	
	emoticons[":takuts"] = {
		src: "http://www.kaskus.us/images/smilies/takuts.gif",
		alt: "csgakmod"
	};
	
	emoticons[":reposts"] = {
		src: "http://www.kaskus.us/images/smilies/reposts.gif",
		alt: "csgakmod"
	};
	
	emoticons[":genit:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/q03.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tabrakan:"] = {
		src: "http://www.kaskus.us/images/smilies/tabrakan.gif",
		alt: "csgakmod"
	};
	
	emoticons[":linux1:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/25.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nohope:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/q11.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":)"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/15.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck3:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/fuck-8.gif",
		alt: "csgakmod"
	};
	
	emoticons[":doctor:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/18.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rose:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/34.gif",
		alt: "csgakmod"
	};
	
	emoticons[":angel:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/017.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kagets:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":eek:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/4.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fm:"] = {
		src: "http://www.kaskus.us/images/smilies/smileyfm329wj.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/fuck-4.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammer:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/8.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rolleyes:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/01.gif",
		alt: "csgakmod"
	};
	
	emoticons[":amazed:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/amazed.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shutup:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/5.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berbusa:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/q20.gif",
		alt: "csgakmod"
	};
	
	emoticons[":D"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/14.gif",
		alt: "csgakmod"
	};
	
	emoticons[":thumbdown"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/48.gif",
		alt: "csgakmod"
	};
	
	emoticons[":heart:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/37.gif",
		alt: "csgakmod"
	};
	
	emoticons[":linux2:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/26.gif",
		alt: "csgakmod"
	};
	
	emoticons[":matabelo:"] = {
		src: "http://static.slowbos.com/emot/mky/matabelo.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kissmouth"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/36.gif",
		alt: "csgakmod"
	};
	
	emoticons[":("] = {
		src: "http://static.slowbos.com/emot/mky/frown.gif",
		alt: "csgakmod"
	};
	
	emoticons[":siul:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/020.gif",
		alt: "csgakmod"
	};
	
	emoticons[":army:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/24.gif",
		alt: "csgakmod"
	};
	
	emoticons[":confused:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/7.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngacir:"] = {
		src: "http://static.slowbos.com/emot/mky/kabur.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck2:"] = {
		src: "http://www.kaskus.us/images/smilies/ngacir.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tv:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/44.gif",
		alt: "csgakmod"
	};
	
	emoticons[":medicine:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/33.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kissing:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/014.gif",
		alt: "csgakmod"
	};
	
	emoticons[":wowcantik"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/001.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mad:"] = {
		src: "http://static.slowbos.com/emot/mky/mad.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ck"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/kaskuslove.gif",
		alt: "csgakmod"
	};
	
	emoticons[":flower:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/e03.gif",
		alt: "csgakmod"
	};
	
	emoticons[":coffee:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/31.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sun:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/008.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bikini:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/vana-bum-vanaweb-dot-com.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cool"] = {
		src: "http://static.kaskus.us/images/smilies/cool2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gila:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/crazy.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rain:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/60.gif",
		alt: "csgakmod"
	};
	
	emoticons[":present:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/40.gif",
		alt: "csgakmod"
	};
	
	emoticons[":think:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/006.gif",
		alt: "csgakmod"
	};
	
	emoticons[";)"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/13.gif",
		alt: "csgakmod"
	};
	
	emoticons[":beer"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/smiley_beer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shakehand"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/49.gif",
		alt: "csgakmod"
	};

	emoticons[":shakehand2"] = {
		src: "http://www.kaskus.us/images/smilies/shakehand2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":breakheart"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/38.gif",
		alt: "csgakmod"
	};
	
	emoticons[":babi:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/27.gif",
		alt: "csgakmod"
	};
	
	emoticons[":Peace:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/005.gif",
		alt: "csgakmod"
	};
	
	emoticons[":o"] = {
		src: "http://static.slowbos.com/emot/mky/o.gif",
		alt: "csgakmod"
	};
	
	emoticons[":afro:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/kribo.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost:"] = {
		src: "http://www.kaskus.us/images/smilies/fd_7.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bigo:"] = {
		src: "http://www.kaskus.us/images/smilies/fd_3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cd:"] = {
		src: "http://www.kaskus.us/images/smilies/fd_2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kts:"] = {
		src: "http://www.kaskus.us/images/smilies/fd_6.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kodok"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/iwig2a.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tai:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/shit-3.gif",
		alt: "csgakmod"
	}
		
	emoticons[":rate1:"] = {
		src: "http://www.kaskus.us/images/rating/rating_1.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate2:"] = {
		src: "http://www.kaskus.us/images/rating/rating_2.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate3:"] = {
		src: "http://www.kaskus.us/images/rating/rating_3.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate4:"] = {
		src: "http://www.kaskus.us/images/rating/rating_4.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate5:"] = {
		src: "http://www.kaskus.us/images/rating/rating_5.gif",
		alt: "csgakmod"
	}
	
	emoticons[":dp"] = {
		src: "http://www.kaskus.us/images/smilies/dp.gif",
		alt: "csgakmod"
	}
	
	emoticons[":selamat"] = {
		src: "http://www.kaskus.us/images/smilies/selamat.gif",
		alt: "csgakmod"
	}
	
	emoticons[":2thumbup"] = {
		src: "http://www.kaskus.us/images/smilies/jempol2.gif",
		alt: "csgakmod"
	}
	
	emoticons[":thumbup"] = {
		src: "http://www.kaskus.us/images/smilies/jempol1.gif",
		alt: "csgakmod"
	}

	emoticons[":thumbup:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/47.gif",
		alt: "csgakmod"
	};
	
	emoticons[":metal:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/q17.gif",
		alt: "csgakmod"
	};

	emoticons[":hi:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/hi.gif",
		alt: "csgakmod"
	};

	emoticons[":peluk"] = {
		src: "http://www.kaskus.us/images/smilies/peluk.gif",
		alt: "csgakmod"
	};
	
	emoticons[":baby:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/30.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kucing:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/28.gif",
		alt: "csgakmod"
	};
	
	emoticons[":norose:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/35.gif",
		alt: "csgakmod"
	};
	
	emoticons[":Onigiri:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/rice.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ricebowl:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/32.gif",
		alt: "csgakmod"
	};
	emoticons[":mewek"] = {
		src: "http://www.kaskus.us/images/smilies/mewek.gif",
		alt: "csgakmod"
	};
	emoticons[":angel"] = {
		src: "http://www.kaskus.us/images/smilies/angel1.gif",
		alt: "csgakmod"
	};
	emoticons[":matabelo"] = {
		src: "http://www.kaskus.us/images/smilies/matabelo1.gif",
		alt: "csgakmod"
	};
	emoticons[":request"] = {
		src: "http://static.kaskus.us/images/smilies/request.gif",
		alt: "csgakmod"
	};
	emoticons[":kr"] = {
		src: "http://static.kaskus.us/images/smilies/kaskus_radio.gif",
		alt: "csgakmod"
	};
	emoticons[":nohope"] = {
		src: "http://static.kaskus.us/images/smilies/nohope.gif",
		alt: "csgakmod"
	};
	emoticons[":sorry"] = {
		src: "http://static.kaskus.us/images/smilies/sorry.gif",
		alt: "csgakmod"
	};


	emoticons[":sokpintar:"] = {
		src: "http://static.slowbos.com/emot/mky/sokpintar.gif",
		alt: "csgakmod"
	};

	emoticons[":soktua:"] = {
		src: "http://static.slowbos.com/emot/mky/soktua.gif",
		alt: "csgakmod"
	};

	emoticons[":hela:"] = {
		src: "http://static.slowbos.com/emot/mky/hela.gif",
		alt: "csgakmod"
	};

	emoticons[":pusing:"] = {
		src: "http://static.slowbos.com/emot/mky/pusing.gif",
		alt: "csgakmod"
	};

	emoticons[":kaget:"] = {
		src: "http://static.slowbos.com/emot/mky/kaget.gif",
		alt: "csgakmod"
	};

	emoticons[":cool:"] = {
		src: "http://static.slowbos.com/emot/mky/cool.gif",
		alt: "csgakmod"
	};

	emoticons[":nafsu:"] = {
		src: "http://static.slowbos.com/emot/mky/nafsu.gif",
		alt: "csgakmod"
	};

	emoticons[":bye:"] = {
		src: "http://static.slowbos.com/emot/mky/bye.gif",
		alt: "csgakmod"
	};

	emoticons[":smgt:"] = {
		src: "http://static.slowbos.com/emot/mky/semangat.gif",
		alt: "csgakmod"
	};

	emoticons[":tidur:"] = {
		src: "http://static.slowbos.com/emot/mky/tidur.gif",
		alt: "csgakmod"
	};

	emoticons[":duit:"] = {
		src: "http://static.slowbos.com/emot/mky/duit.gif",
		alt: "csgakmod"
	};

	emoticons[":pikir:"] = {
		src: "http://static.slowbos.com/emot/mky/berpikir.gif",
		alt: "csgakmod"
	};

	emoticons[":sukses:"] = {
		src: "http://static.slowbos.com/emot/mky/sukses.gif",
		alt: "csgakmod"
	};

	emoticons[":demo:"] = {
		src: "http://static.slowbos.com/emot/mky/demo.gif",
		alt: "csgakmod"
	};

	emoticons[":thank:"] = {
		src: "http://static.slowbos.com/emot/mky/thank.gif",
		alt: "csgakmod"
	};

	emoticons[":takut:"] = {
		src: "http://static.slowbos.com/emot/mky/takut.gif",
		alt: "csgakmod"
	};

	emoticons[":tajir:"] = {
		src: "http://static.slowbos.com/emot/mky/tajir.gif",
		alt: "csgakmod"
	};

	emoticons[":siul:"] = {
		src: "http://static.slowbos.com/emot/mky/siul.gif",
		alt: "csgakmod"
	};

	emoticons[":korban:"] = {
		src: "http://static.slowbos.com/emot/mky/korban.gif",
		alt: "csgakmod"
	};

	emoticons[":berhasil:"] = {
		src: "http://static.slowbos.com/emot/mky/berhasil.gif",
		alt: "csgakmod"
	};

	emoticons[":ic:"] = {
		src: "http://static.slowbos.com/emot/mky/ic.gif",
		alt: "csgakmod"
	};

	emoticons[":tajir2"] = {
		src: "http://static.slowbos.com/emot/mky/tajir2.gif",
		alt: "csgakmod"
	};

	emoticons[":nyimak:"] = {
		src: "http://static.slowbos.com/emot/mky/nyimak.gif",
		alt: "csgakmod"
	};

	emoticons[":ngakak:"] = {
		src: "http://static.slowbos.com/emot/mky/ngakak.gif",
		alt: "csgakmod"
	};

	emoticons[":bajak:"] = {
		src: "http://static.slowbos.com/emot/mky/bajak.gif",
		alt: "csgakmod"
	};

	emoticons[":diam:"] = {
		src: "http://static.slowbos.com/emot/mky/diam.gif",
		alt: "csgakmod"
	};

	emoticons[":kenyang:"] = {
		src: "http://static.slowbos.com/emot/mky/kny.gif",
		alt: "csgakmod"
	};

	emoticons[":mesum:"] = {
		src: "http://static.slowbos.com/emot/mky/mesum.gif",
		alt: "csgakmod"
	};

	emoticons[":aduh:"] = {
		src: "http://static.slowbos.com/emot/mky/aduh.gif",
		alt: "csgakmod"
	};

	emoticons[":bahagia:"] = {
		src: "http://static.slowbos.com/emot/mky/bahagia.gif",
		alt: "csgakmod"
	};

	emoticons[":belajar:"] = {
		src: "http://static.slowbos.com/emot/mky/belajar.gif",
		alt: "csgakmod"
	};

	emoticons[":berbusa:"] = {
		src: "http://static.slowbos.com/emot/mky/berbusa.gif",
		alt: "csgakmod"
	};

	emoticons[":bom:"] = {
		src: "http://static.slowbos.com/emot/mky/bom.gif",
		alt: "csgakmod"
	};

	emoticons[":curiga:"] = {
		src: "http://static.slowbos.com/emot/mky/curiga.gif",
		alt: "csgakmod"
	};

	emoticons[":ejek:"] = {
		src: "http://static.slowbos.com/emot/mky/ejek.gif",
		alt: "csgakmod"
	};

	emoticons[":foto:"] = {
		src: "http://static.slowbos.com/emot/mky/foto.gif",
		alt: "csgakmod"
	};

	emoticons[":game:"] = {
		src: "http://static.slowbos.com/emot/mky/game.gif",
		alt: "csgakmod"
	};

	emoticons[":gemas:"] = {
		src: "http://static.slowbos.com/emot/mky/gemas.gif",
		alt: "csgakmod"
	};

	emoticons[":gosip:"] = {
		src: "http://static.slowbos.com/emot/mky/gosip.gif",
		alt: "csgakmod"
	};

	emoticons[":hajar:"] = {
		src: "http://static.slowbos.com/emot/mky/hajar.gif",
		alt: "csgakmod"
	};

	emoticons[":hantu:"] = {
		src: "http://static.slowbos.com/emot/mky/hantu.gif",
		alt: "csgakmod"
	};

	emoticons[":hantu2:"] = {
		src: "http://static.slowbos.com/emot/mky/hantu2.gif",
		alt: "csgakmod"
	};

	emoticons[":tolong:"] = {
		src: "http://static.slowbos.com/emot/mky/tolong.gif",
		alt: "csgakmod"
	};

	emoticons[":kencan:"] = {
		src: "http://static.slowbos.com/emot/mky/kencan.gif",
		alt: "csgakmod"
	};

	emoticons[":latihan:"] = {
		src: "http://static.slowbos.com/emot/mky/latihan.gif",
		alt: "csgakmod"
	};

	emoticons[":lm:"] = {
		src: "http://static.slowbos.com/emot/mky/lookme.gif",
		alt: "csgakmod"
	};

	emoticons[":ml:"] = {
		src: "http://static.slowbos.com/emot/mky/majuloe.gif",
		alt: "csgakmod"
	};

	emoticons[":makan:"] = {
		src: "http://static.slowbos.com/emot/mky/makan.gif",
		alt: "csgakmod"
	};

	emoticons[":malu2:"] = {
		src: "http://static.slowbos.com/emot/mky/malu.gif",
		alt: "csgakmod"
	};

	emoticons[":mandi:"] = {
		src: "http://static.slowbos.com/emot/mky/mandi.gif",
		alt: "csgakmod"
	};

	emoticons[":mandi2:"] = {
		src: "http://static.slowbos.com/emot/mky/mandi2.gif",
		alt: "csgakmod"
	};

	emoticons[":mesum2:"] = {
		src: "http://static.slowbos.com/emot/mky/mesum.gif",
		alt: "csgakmod"
	};

	emoticons[":nafsu2:"] = {
		src: "http://static.slowbos.com/emot/mky/nafsu2.gif",
		alt: "csgakmod"
	};

	emoticons[":ngacir2:"] = {
		src: "http://static.slowbos.com/emot/mky/ngacir2.gif",
		alt: "csgakmod"
	};

	emoticons[":ngupil:"] = {
		src: "http://static.slowbos.com/emot/mky/ngupil.gif",
		alt: "csgakmod"
	};

	emoticons[":ngantuk2:"] = {
		src: "http://static.slowbos.com/emot/mky/ngtk2.gif",
		alt: "csgakmod"
	};

	emoticons[":ngerap:"] = {
		src: "http://static.slowbos.com/emot/mky/ngerap.gif",
		alt: "csgakmod"
	};

	emoticons[":nunggu:"] = {
		src: "http://static.slowbos.com/emot/mky/nunggu.gif",
		alt: "csgakmod"
	};

	emoticons[":nyanyi:"] = {
		src: "http://static.slowbos.com/emot/mky/nyanyi.gif",
		alt: "csgakmod"
	};

	emoticons[":panas:"] = {
		src: "http://static.slowbos.com/emot/mky/panas.gif",
		alt: "csgakmod"
	};

	emoticons[":pantau:"] = {
		src: "http://static.slowbos.com/emot/mky/pantau.gif",
		alt: "csgakmod"
	};

	emoticons[":pesta2:"] = {
		src: "http://static.slowbos.com/emot/mky/pesta2.gif",
		alt: "csgakmod"
	};

	emoticons[":pesta:"] = {
		src: "http://static.slowbos.com/emot/mky/pesta.gif",
		alt: "csgakmod"
	};

	emoticons[":renang:"] = {
		src: "http://static.slowbos.com/emot/mky/renang.gif",
		alt: "csgakmod"
	};

	emoticons[":sindir:"] = {
		src: "http://static.slowbos.com/emot/mky/sindir.gif",
		alt: "csgakmod"
	};

	emoticons[":sakit:"] = {
		src: "http://static.slowbos.com/emot/mky/sakit.gif",
		alt: "csgakmod"
	};

	emoticons[":stress:"] = {
		src: "http://static.slowbos.com/emot/mky/stress.gif",
		alt: "csgakmod"
	};

	emoticons[":tabok:"] = {
		src: "http://static.slowbos.com/emot/mky/tabok.gif",
		alt: "csgakmod"
	};

	emoticons[":taktik:"] = {
		src: "http://static.slowbos.com/emot/mky/taktik.gif",
		alt: "csgakmod"
	};

	emoticons[":takut2:"] = {
		src: "http://static.slowbos.com/emot/mky/takut2.gif",
		alt: "csgakmod"
	};

	emoticons[":terbang:"] = {
		src: "http://static.slowbos.com/emot/mky/terbang.gif",
		alt: "csgakmod"
	};

	emoticons[":terkejut:"] = {
		src: "http://static.slowbos.com/emot/mky/terkejut.gif",
		alt: "csgakmod"
	};

	emoticons[":telepon:"] = {
		src: "http://static.slowbos.com/emot/mky/telpon.gif",
		alt: "csgakmod"
	};

	emoticons[":tank:"] = {
		src: "http://ceriwis.us/images/smilies/tambahan/tank.gif",
		alt: "csgakmod"
	};
	emoticons[":helpme:"] = {
		src: "http://ceriwis.us/images/smilies/new-onion/helpme.gif",
		alt: "csgakmod"
	};

	emoticons[":sengsara:"] = {
		src: "http://ceriwis.us/images/smilies/new-onion/sengsara.gif",
		alt: "csgakmod"
	};

	emoticons[":gay:"] = {
		src: "http://ceriwis.us/images/smilies/gay.gif",
		alt: "csgakmod"
	};

	emoticons[":rokok:"] = {
		src: "http://ceriwis.us/images/smilies/new-onion/rokok.gif",
		alt: "csgakmod"
	};

	emoticons[":blink:"] = {
		src: "http://ceriwis.us/images/smilies/asia/blink.gif",
		alt: "csgakmod"
	};

	emoticons[":ohno:"] = {
		src: "http://ceriwis.us/images/smilies/new-onion/ohno.gif",
		alt: "csgakmod"
	};

	emoticons[":gomen:"] = {
		src: "http://ceriwis.us/images/smilies/asia/gomen.gif",
		alt: "csgakmod"
	};


	emoticons[":mati:"] = {
		src: "http://ceriwis.us/images/smilies/asia/cebollita_animated_onion-04.gif",
		alt: "csgakmod"
	};

	emoticons[":wtf:"] = {
		src: "http://ceriwis.us/images/smilies/tambahan/wtf.png",
		alt: "csgakmod"
	};

        emoticons[":konak:"] = {
		src: "http://ceriwis.us/images/smilies/additional_asia/oniondinkgo6.gif",
		alt: "csgakmod"
	};

	emoticons[":beloved:"] = {
		src: "http://static.kaskus.us/customavatars/avatar1949786_13.gif",
		alt: "csgakmod"
	};

        emoticons[":air:"] = {
		src: "http://static.slowbos.com/emot/slbs/air.gif",
		alt: "csgakmod"
	};

        emoticons[":api:"] = {
		src: "http://static.slowbos.com/emot/slbs/api.gif",
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

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://www.slowbos.com/misc.php?do=getsmilies','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://a2.sphotos.ak.fbcdn.net/hphotos-ak-snc6/190637_1760816054938_1075154263_31866276_5333781_n.jpg\" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; left: 0px; bottom: -2px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://www.kaskus.us/misc.php?do=getsmilies','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://a1.sphotos.ak.fbcdn.net/hphotos-ak-ash4/189917_1760794614402_1075154263_31866218_1006418_n.jpg\" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; left: 40px; bottom: -2px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);

function listen(evt){
var node = evt.target;if (node.nodeType == document.ELEMENT_NODE) replaceElement(node, yemo); if (node.nodeType == document.TEXT_NODE) {var parent = node.parentNode;var span = replaceTextNode(node, yemo);if (span) parent.replaceChild(span, node);}}document.body.addEventListener('DOMNodeInserted', listen, true);