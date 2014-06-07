// ==UserScript==
// @name           Kaskus Emoticon For Facebook
// @namespace      Kaskus Emoticon
// @description    Kaskus Emoticon for Status, wall and chat Facebook
// @include        http://www.facebook.com/*
// @version        1.1.6
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
		src: "http://static.kaskus.us/images/smilies/s_sm_ilovekaskus.gif",
		alt: ":ilovekaskus"
	};
	emoticons[":kiss"] = {
		src: "http://static.kaskus.us/images/smilies/cewek.gif",
		alt: ":kiss"
	};
	emoticons[":najis"] = {
		src: "http://static.kaskus.us/images/smilies/najis.gif",
		alt: ":najis"
	};
	emoticons[":marah"] = {
		src: "http://static.kaskus.us/images/smilies/marah.gif",
		alt: ":marah"
	};
	emoticons[":malu"] = {
		src: "http://static.kaskus.us/images/smilies/malu.gif",
		alt: ":malu"
	};
	emoticons[":repost"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_repost1.gif",
		alt: ":repost"
	};
	emoticons[":sup2:"] = {
		src: "http://static.kaskus.us/images/smilies/sundul.gif",
		alt: ":sup2:"
	};
	emoticons[":batabig"] = {
		src: "http://static.kaskus.us/images/smilies/s_big_batamerah.gif",
		alt: ":batabig"
	};
	emoticons[":takut"] = {
		src: "http://static.kaskus.us/images/smilies/takut.gif",
		alt: ":takut"
	};
	emoticons[":shakehand2"] = {
		src: "http://static.kaskus.us/images/smilies/shakehand2.gif",
		alt: ":shakehand2"
	};
	emoticons[":cekpm"] = {
		src: "http://static.kaskus.us/images/smilies/cekpm.gif",
		alt: ":cekpm"
	};
	emoticons[":hammer"] = {
		src: "http://static.kaskus.us/images/smilies/hammer.gif",
		alt: ":hammer"
	};
	emoticons[":toast"] = {
		src: "http://static.kaskus.us/images/smilies/toastcendol.gif",
		alt: ":toast"
	};
	emoticons[":cystg"] = {
		src: "http://static.kaskus.us/images/smilies/cystg.gif",
		alt: ":cystg"
	};
	emoticons[":selamat"] = {
		src: "http://static.kaskus.us/images/smilies/selamat.gif",
		alt: ":selamat"
	};
	emoticons[":2thumbup"] = {
		src: "http://static.kaskus.us/images/smilies/jempol2.gif",
		alt: ":2thumbup"
	};
	emoticons[":matabelo"] = {
		src: "http://static.kaskus.us/images/smilies/matabelo1.gif",
		alt: ":matabelo"
	};
	emoticons[":request"] = {
		src: "http://static.kaskus.us/images/smilies/request.gif",
		alt: ":request"
	};
	emoticons[":babyboy1"] = {
		src: "http://static.kaskus.us/images/smilies/babyboy1.gif",
		alt: ":babyboy1"
	};
	emoticons[":sorry"] = {
		src: "http://static.kaskus.us/images/smilies/sorry.gif",
		alt: ":sorry"
	};
	emoticons[":travel"] = {
		src: "http://static.kaskus.us/images/smilies/traveller.gif",
		alt: ":travel"
	};
	emoticons[":kimpoi"] = {
		src: "http://static.kaskus.us/images/smilies/kimpoi.gif",
		alt: ":kimpoi"
	};
	emoticons[":ultah"] = {
		src: "http://static.kaskus.us/images/smilies/ultah.gif",
		alt: ":ultah"
	};
	emoticons[":rate5"] = {
		src: "http://static.kaskus.us/images/smilies/rate5.gif",
		alt: ":rate5"
	};
	emoticons[":kts:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_6.gif",
		alt: ":kts:"
	};
	emoticons[":kbgt:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_4.gif",
		alt: ":kbgt:"
	};
	emoticons[":bigo:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_3.gif",
		alt: ":bigo:"
	};
	emoticons[":cd:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_2.gif",
		alt: ":cd:"
	};
	emoticons[":iloveindonesia"] = {
		src: "http://static.kaskus.us/images/smilies/I-Luv-Indonesia.gif",
		alt: ":iloveindonesia"
	};
	emoticons[":maho"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_maho.gif",
		alt: ":maho"
	};
	emoticons[":nosara"] = {
		src: "http://static.kaskus.us/images/smilies/nosara.gif",
		alt: ":nosara"
	};
	emoticons[":berduka"] = {
		src: "http://static.kaskus.us/images/smilies/berduka.gif",
		alt: ":berduka"
	};
	emoticons[":ngakak"] = {
		src: "http://static.kaskus.us/images/smilies/ngakak.gif",
		alt: ":ngakak"
	};
	emoticons[":repost2"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_repost2.gif",
		alt: "repost2"
	};
	emoticons[":cendolbig"] = {
		src: "http://static.kaskus.us/images/smilies/s_big_cendol.gif",
		alt: ":cendolbig"
	};
	emoticons[":recsel"] = {
		src: "http://static.kaskus.us/images/smilies/recseller.gif",
		alt: ":recsel"
	};
	emoticons[":ngacir2"] = {
		src: "http://static.kaskus.us/images/smilies/ngacir2.gif",
		alt: ":ngacir2"
	};
	emoticons[":bingung"] = {
		src: "http://static.kaskus.us/images/smilies/bingung.gif",
		alt: ":bingung"
	};
	emoticons[":cd"] = {
		src: "http://static.kaskus.us/images/smilies/capede.gif",
		alt: ":cd"
	};
	emoticons[":peluk"] = {
		src: "http://static.kaskus.us/images/smilies/peluk.gif",
		alt: ":peluk"
	};
	emoticons[":hoax"] = {
		src: "http://static.kaskus.us/images/smilies/hoax.gif",
		alt: ":hoax"
	};
	emoticons[":dp"] = {
		src: "http://static.kaskus.us/images/smilies/dp.gif",
		alt: ":dp"
	};
	emoticons[":thumbup"] = {
		src: "http://static.kaskus.us/images/smilies/jempol1.gif",
		alt: ":thumbup"
	};
	emoticons[":angel"] = {
		src: "http://static.kaskus.us/images/smilies/angel1.gif",
		alt: ":angel"
	};
	emoticons[":mewek"] = {
		src: "http://static.kaskus.us/images/smilies/mewek.gif",
		alt: ":mewek"
	};
	emoticons[":babyboy"] = {
		src: "http://static.kaskus.us/images/smilies/babyboy.gif",
		alt: ":babyboy"
	};
	emoticons[":babygirl"] = {
		src: "http://static.kaskus.us/images/smilies/babygirl.gif",
		alt: ":babygirl"
	};
	emoticons[":kr"] = {
		src: "http://static.kaskus.us/images/smilies/kaskus_radio.gif",
		alt: ":kr"
	};
	emoticons[":nohope"] = {
		src: "http://static.kaskus.us/images/smilies/nohope.gif",
		alt: ":nohope"
	};
	emoticons[":ngacir"] = {
		src: "http://static.kaskus.us/images/smilies/ngacir3.gif",
		alt: ":ngacir"
	};
	emoticons[":salahkamar"] = {
		src: "http://static.kaskus.us/images/smilies/salah_kamar.gif",
		alt: ":salahkamar"
	};
	emoticons[":jrb:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_1.gif",
		alt: ":jrb:"
	};
	emoticons[":sup:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_5.gif",
		alt: ":sup:"
	};
	emoticons[":kacau:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_8.gif",
		alt: ":kacau:"
	};
	emoticons[":repost:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_7.gif",
		alt: ":repost:"
	};
	emoticons[":cendolb"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_cendol.gif",
		alt: ":cendolb"
	};
	emoticons[":)b"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_smile.gif",
		alt: ":)b"
	};
	emoticons[":cendols"] = {
		src: "http://static.kaskus.us/images/smilies/cendols.gif",
		alt: ":cendols"
	};
	emoticons[":iloveindonesias"] = {
		src: "http://static.kaskus.us/images/smilies/iloveindonesias.gif",
		alt: ":iloveindonesias"
	};
	emoticons[":berdukas"] = {
		src: "http://static.kaskus.us/images/smilies/berdukas.gif",
		alt: ":berdukas"
	};
	emoticons[":bingungs"] = {
		src: "http://static.kaskus.us/images/smilies/bingungs.gif",
		alt: ":bingungs*"
	};
	emoticons[":najiss"] = {
		src: "http://static.kaskus.us/images/smilies/najiss.gif",
		alt: ":najiss"
	};
	emoticons[":ilovekaskuss"] = {
		src: "http://static.kaskus.us/images/smilies/iluvkaskuss.gif",
		alt: ":ilovekaskuss"
	};
	emoticons[":mads"] = {
		src: "http://static.kaskus.us/images/smilies/mads.gif",
		alt: ":mads"
	};
	emoticons[":sundulgans"] = {
		src: "http://static.kaskus.us/images/smilies/sundulgans.gif",
		alt: ":sundulgans"
	};
	emoticons[":hammers"] = {
		src: "http://static.kaskus.us/images/smilies/hammers.gif",
		alt: ":hammers"
	};
	emoticons[":bata"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_batamerah.gif",
		alt: ":bata"
	};
	emoticons[":Yb"] = {
		src: "http://static.kaskus.us/images/smilies/s_sm_peace.gif",
		alt: ":Yb"
	};
	emoticons[":batas"] = {
		src: "http://static.kaskus.us/images/smilies/batas.gif",
		alt: ":batas"
	};
	emoticons[":cekpms"] = {
		src: "http://static.kaskus.us/images/smilies/cekpms.gif",
		alt: ":cekpms"
	};
	emoticons[":capedes"] = {
		src: "http://static.kaskus.us/images/smilies/capedes.gif",
		alt: ":capedes"
	};
	emoticons[":mahos"] = {
		src: "http://static.kaskus.us/images/smilies/mahos.gif",
		alt: ":mahos"
	};
	emoticons[":malus"] = {
		src: "http://static.kaskus.us/images/smilies/malus.gif",
		alt: ":malus"
	};
	emoticons[":kisss"] = {
		src: "http://static.kaskus.us/images/smilies/kisss.gif",
		alt: ":kisss"
	};
	emoticons[":ngakaks"] = {
		src: "http://static.kaskus.us/images/smilies/ngakaks.gif",
		alt: ":ngakaks"
	};
	emoticons[":takuts"] = {
		src: "http://static.kaskus.us/images/smilies/takuts.gif",
		alt: ":takuts"
	};
	emoticons[":reposts"] = {
		src: "http://static.kaskus.us/images/smilies/reposts.gif",
		alt: ":reposts"
	};
	emoticons[":afro:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/kribo.gif",
		alt: ":afro:"
	};
	emoticons[":linux2:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/26.gif",
		alt: ":linux2:"
	};
	emoticons[":thumbup:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/47.gif",
		alt: ":thumbup:"
	};
	emoticons[":genit:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/q03.gif",
		alt: ":genit:"
	};
	emoticons[":hi:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/hi.gif",
		alt: ":hi:"
	};
	emoticons[":linux1:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/25.gif",
		alt: ":linux1:"
	};
	emoticons[":siul:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/020.gif",
		alt: ":siul:"
	};
	emoticons[":norose:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/35.gif",
		alt: ":norose:"
	};
	emoticons[":army:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/24.gif",
		alt: ":army:"
	};
	emoticons[":Paws:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/paw.gif",
		alt: ":Paws:"
	};
	emoticons[":ngacir:"] = {
		src: "http://static.kaskus.us/images/smilies/ngacir.gif",
		alt: ":ngacir:"
	};
	emoticons[":rose:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/34.gif",
		alt: ":rose:"
	};
	emoticons[":fuck2:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/fuck-6.gif",
		alt: ":fuck2:"
	};
	emoticons[":tv:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/44.gif",
		alt: ":tv:"
	};
	emoticons[":eek:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/4.gif",
		alt: ":eek:"
	};
	emoticons[":kissing:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/014.gif",
		alt: ":kissing:"
	};
	emoticons[":wowcantik"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/001.gif",
		alt: ":wowcantik"
	};
	emoticons[":ck"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/kaskuslove.gif",
		alt: ":ck"
	};
	emoticons[":ricebowl:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/32.gif",
		alt: ":ricebowl:"
	};
	emoticons[":flower:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/e03.gif",
		alt: ":flower:"
	};
        emoticons[":clock:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/42.gif",
		alt: ":clock:"
	};
	emoticons[":rolleyes:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/01.gif",
		alt: ":rolleyes:"
	};
	emoticons[":sun:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/008.gif",
		alt: ":sun:"
	};
	emoticons[":bikini:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/vana-bum-vanaweb-dot-com.gif",
		alt: ":bikini:"
	};
	emoticons[":gila:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/crazy.gif",
		alt: ":gila:"
	};
	emoticons[":baby:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/30.gif",
		alt: ":baby:"
	};
	emoticons[":rain:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/60.gif",
		alt: ":rain:"
	};
	emoticons[":present:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/40.gif",
		alt: ":present:"
	};
	emoticons[":p"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/6.gif",
		alt: ":p"
	};
	emoticons[":think:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/006.gif",
		alt: ":think:"
	};
	emoticons[":Onigiri:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/rice.gif",
		alt: ":Onigiri:"
	};
	emoticons[":beer:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/smiley_beer.gif",
		alt: ":beer:"
	};
	emoticons[":kucing:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/28.gif",
		alt: ":kucing:"
	};
	emoticons[":shakehand"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/49.gif",
		alt: ":shakehand"
	};
	emoticons[":breakheart"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/38.gif",
		alt: ":breakheart"
	};
	emoticons[":D"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/14.gif",
		alt: ":D"
	};
	emoticons[":Peace:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/005.gif",
		alt: ":Peace:"
	};
	emoticons[":metal:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/q17.gif",
		alt: ":metal:"
	};
	emoticons[":bingung:"] = {
		src: "http://static.kaskus.us/images/smilies/bolakbalik.gif",
		alt: ":bingung:"
	};
	emoticons[":o"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/07.gif",
		alt: ":o"
	};
	emoticons[":matabelo:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/004.gif",
		alt: ":matabelo:"
	};
	emoticons[":tabrakan:"] = {
		src: "http://static.kaskus.us/images/smilies/tabrakan.gif",
		alt: ":tabrakan:"
	};
	emoticons[":kissmouth"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/36.gif",
		alt: ":kissmouth"
	};
	emoticons[":("] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/06.gif",
		alt: ":("
	};
	emoticons[":nohope:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/q11.gif",
		alt: ":nohope:"
	};
	emoticons[":malu:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/1.gif",
		alt: ":malu:"
	};
	emoticons[":)"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/15.gif",
		alt: ":)"
	};
	emoticons[":fuck3:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/fuck-8.gif",
		alt: ":fuck3:"
	};
	emoticons[":doctor:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/18.gif",
		alt: ":doctor:"
	};
	emoticons[":confused:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/7.gif",
		alt: ":confused:"
	};
	emoticons[":angel:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/017.gif",
		alt: ":angel:"
	};
	emoticons[":kagets:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/3.gif",
		alt: ":kagets:"
	};
	emoticons[":fm:"] = {
		src: "http://static.kaskus.us/images/smilies/smileyfm329wj.gif",
		alt: ":fm:"
	};
	emoticons[":medicine:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/33.gif",
		alt: ":medicine:"
	};
	emoticons[":fuck:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/fuck-4.gif",
		alt: ":fuck:"
	};
	emoticons[":email:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/43.gif",
		alt: ":email:"
	};
	emoticons[":mad:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/12.gif",
		alt: ":mad:"
	};
	emoticons[":hammer:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/8.gif",
		alt: ":hammer:"
	};
	emoticons[":buldog:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/woof.gif",
		alt: ":buldog:"
	};
	emoticons[":amazed:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/amazed.gif",
		alt: ":amazed:"
	};
	emoticons[":coffee:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/31.gif",
		alt: ":coffee:"
	};
	emoticons[":rainbow:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/e02.gif",
		alt: ":rainbow:"
	};
	emoticons[":Phone:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/41.gif",
		alt: ":Phone:"
	};
	emoticons[":cool:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/05.gif",
		alt: ":cool:"
	};
	emoticons[":moon:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/007.gif",
		alt: ":moon:"
	};
	emoticons[":tai:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/shit-3.gif",
		alt: ":tai:"
	};
	emoticons[":kimpoi:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/smiley_couple.gif",
		alt: ":kimpoi:"
	};
	emoticons[":anjing:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/29.gif",
		alt: ":anjing:"
	};
	emoticons[":exclamati"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/52.gif",
		alt: ":exclamati"
	};
	emoticons[":table:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/39.gif",
		alt: ":table:"
	};
	emoticons[";)"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/13.gif",
		alt: ";)"
	};
	emoticons[":shutup:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/5.gif",
		alt: ":shutup:"
	};
	emoticons[":berbusa:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/q20.gif",
		alt: ":berbusa:"
	};
	emoticons[":frog:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/frog.gif",
		alt: ":frog:"
	};
	emoticons[":babi:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/27.gif",
		alt: ":babi:"
	};
	emoticons[":thumbdown"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/48.gif",
		alt: ":thumbdown"
	};
	emoticons[":heart:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/37.gif",
		alt: ":heart:"
	};
	emoticons[":cool"] = {
		src: "http://static.kaskus.us/images/smilies/cool2.gif",
		alt: ":cool"
	};
	emoticons[":bola"] = {
		src: "http://static.kaskus.us/images/smilies/bola.gif",
		alt: ":bola"
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