//-----------------------------------------------------------------------//
// Kawaii and cute emoticons Najwa
// Ynn Version
// Visit my blog at http://ainurnajwarozaidi.blogspot.com
//-----------------------------------------------------------------------//

//Credits to original author : blogmenjerit (http://blogmenjerit.blogspot.com/)
//credits to cik cechoki (http://www.chokilala.com)


// ==UserScript==
// @name          QQ penguin smiley
// ==/UserScript==

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

window.addEventListener("load", function(e) {

function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	
	buttons += emoticonButton(":3:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/5-1.gif");
	buttons += emoticonButton(":5:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/yummyfood-1.gif");
	buttons += emoticonButton(":7:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/youtube.png");
	buttons += emoticonButton(":8:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/x2.png");
	buttons += emoticonButton(":9:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/vacuum.gif");
	buttons += emoticonButton(":10:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/vacuum-1.png");
	buttons += emoticonButton(":12:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/wek.png");
	buttons += emoticonButton(":16:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/x02.gif");
	buttons += emoticonButton(":17:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/tv1.png");
	buttons += emoticonButton(":18:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/tulip.png");
	buttons += emoticonButton(":21:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/trolley.gif");
	buttons += emoticonButton(":22:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/toxic.gif");
	buttons += emoticonButton(":23:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thwallet.gif");
	buttons += emoticonButton(":24:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thx2rara.gif");
	buttons += emoticonButton(":25:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/tissuebox.gif");
	buttons += emoticonButton(":26:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/ththtonguepoke.gif");
	buttons += emoticonButton(":27:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thtrousers.jpg");
	buttons += emoticonButton(":31:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thumbrella.gif");
	buttons += emoticonButton(":33:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thup.gif");
	buttons += emoticonButton(":34:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/ththquest.gif");
	buttons += emoticonButton(":37:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/ththmoocow.gif");
	buttons += emoticonButton(":38:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/ththmini014.gif");
	buttons += emoticonButton(":40:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/ththlove.gif");
	buttons += emoticonButton(":44:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/ththcottoncandy.gif");
	buttons += emoticonButton(":20:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/ththhelp.gif");
	buttons += emoticonButton(":39:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/ththlaugh.gif");
	buttons += emoticonButton(":42:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thth097.gif");
	buttons += emoticonButton(":35:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thth078.gif");
	buttons += emoticonButton(":36:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thsun.gif");
	buttons += emoticonButton(":11:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thtb.jpg");
	buttons += emoticonButton(":13:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thsmile.gif");
	buttons += emoticonButton(":1a:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thstart.gif");
	buttons += emoticonButton(":1s:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thstoking.gif");
	buttons += emoticonButton(":1f:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thstrawberi.gif");
	buttons += emoticonButton(":1d:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thskola.gif");
	buttons += emoticonButton(":2d:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thshoe.gif");
	buttons += emoticonButton(":1s:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thshades.gif");
	buttons += emoticonButton(":1w:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thscissors.gif");
	buttons += emoticonButton(":1e:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thribbon.gif");
	buttons += emoticonButton(":15:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thrara2-1.gif");
	buttons += emoticonButton(":1r:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thrara1.gif");
	buttons += emoticonButton(":1t:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thparcel-1.gif");
	buttons += emoticonButton(":1h:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thnnek.gif");
	buttons += emoticonButton(":1n:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thmymelo.gif");
	buttons += emoticonButton(":1m:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thmymelo.gif");
	buttons += emoticonButton(":1v:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thmoon.gif");
	buttons += emoticonButton(":1b:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thmee2.gif");
	buttons += emoticonButton(":1x:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thmesinjait.gif");
	buttons += emoticonButton(":1c:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thmickeyfg.gif");
	buttons += emoticonButton(":1g:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thminnie.gif");
	buttons += emoticonButton(":2q2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thmedicine-1.gif");
	buttons += emoticonButton(":2w2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thmasak.gif");
	buttons += emoticonButton(":2e2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thmakeup.jpg");
	buttons += emoticonButton(":2r2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thlove.gif");
	buttons += emoticonButton(":2t2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thlori.gif");
	buttons += emoticonButton(":2y2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thlipstick.gif");
	buttons += emoticonButton(":2u2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thlemoande.gif");
	buttons += emoticonButton(":2i2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thlaundry.gif");
	buttons += emoticonButton(":2o2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thlappyrara.gif");
	buttons += emoticonButton(":2p2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thkitty.gif");
	buttons += emoticonButton(":2a2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thkekasih.gif");
	buttons += emoticonButton(":2s2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thiron.png");
	buttons += emoticonButton(":2d2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thichigo.gif");
	buttons += emoticonButton(":2f2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thhouse2.gif");
	buttons += emoticonButton(":2g2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thhk-wever.gif");
	buttons += emoticonButton(":2h2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thhk-sleep.gif");
	buttons += emoticonButton(":2j2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thhk-ouch.gif");
	buttons += emoticonButton(":2k2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thhk-love.gif");
	buttons += emoticonButton(":2l2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thhk-happy.gif");
	buttons += emoticonButton(":2z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thhk-grr.gif");
	buttons += emoticonButton(":2x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thhk-duhh.gif");
	buttons += emoticonButton(":2c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thheart3.gif");
	buttons += emoticonButton(":2v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thHANDPHONE.gif");
	buttons += emoticonButton(":2b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thhandbag.jpg");
	buttons += emoticonButton(":2n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thhallowween.gif");
	buttons += emoticonButton(":3m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thhah.gif");
	buttons += emoticonButton(":3u2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thgirl-1.gif");
	buttons += emoticonButton(":3i2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thflowerheart.gif");
	buttons += emoticonButton(":3o2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thfc683a0c8aac72a7a652eee2463067db.gif");
	buttons += emoticonButton(":3p2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thfairy.gif");
	buttons += emoticonButton(":3a2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thf61277627febd023076ea45f54db81b0.gif");
	buttons += emoticonButton(":3s2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thf9dd2c72e7e85ad7aa7aa3e3ed38e806.gif");
	buttons += emoticonButton(":3d2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thf4c98e4f66531cbd43d6c7668c75e853.gif");
	buttons += emoticonButton(":3f2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thend.gif");
	buttons += emoticonButton(":3g2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/themoji2.gif");
	buttons += emoticonButton(":3h2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/themo11.gif");
	buttons += emoticonButton(":3j2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/themo10.gif");
	buttons += emoticonButton(":3k2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/themo5.gif");
	buttons += emoticonButton(":3l2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thecb8490e625f26ab2aa3a370a2c7e39a.gif");
	buttons += emoticonButton(":3z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thebbcc478720f997b9d9443b11fd817ec.gif");
	buttons += emoticonButton(":3x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/the99e1c976e1132d21ccc0a4151ebbf9c.gif");
	buttons += emoticonButton(":3c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thdress.gif");
	buttons += emoticonButton(":3v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thdf4e49c47a1e18b94d10a99777999272.gif");
	buttons += emoticonButton(":3b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thdc1d4ba3a490597ac9f4dfbdd43bf31d.gif");
	buttons += emoticonButton(":3n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thd2653e73bbb25278d94e64c02d2ef0fc.gif");
	buttons += emoticonButton(":3m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thd9f22118dbf3ee2b94a71e0efd7656ad.gif");
	buttons += emoticonButton(":4u2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thd6df4cc19952da5632f5b000a6bd28f5.gif");
	buttons += emoticonButton(":4i2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thd3e0516dbcd687783fee9b5a17e35082.gif");
	buttons += emoticonButton(":4o2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thd1d7ba7377500188f299b06e431cb4ce.gif");
	buttons += emoticonButton(":4p2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcpel.gif");
	buttons += emoticonButton(":4a2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcouple-1.gif");
	buttons += emoticonButton(":4s2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcm3_wink.gif");
	buttons += emoticonButton(":4d2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcm3_tongue.gif");
	buttons += emoticonButton(":4f2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcm3_smile.gif");
	buttons += emoticonButton(":4g2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcm3_sad.gif");
	buttons += emoticonButton(":4h2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcm3_nod.gif");
	buttons += emoticonButton(":4j2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcm3_lol.gif");
	buttons += emoticonButton(":4k2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcm3_laugh.gif");
	buttons += emoticonButton(":4l2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcm3_cool.gif");
	buttons += emoticonButton(":4z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcf38cfff66928c5e0a9392a3a056443d.gif");
	buttons += emoticonButton(":4x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcelebration-1.gif");
	buttons += emoticonButton(":4c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thCELCOM.gif");
	buttons += emoticonButton(":4v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcar-2.gif");
	buttons += emoticonButton(":4b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcar.gif");
	buttons += emoticonButton(":4n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcamera.gif");
	buttons += emoticonButton(":4m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thcake.gif");
	buttons += emoticonButton(":5u2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thc6013877.gif");
	buttons += emoticonButton(":5i2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thbus.jpg");
	buttons += emoticonButton(":5o2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thboy.gif");
	buttons += emoticonButton(":5p2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thborder2.gif");
	buttons += emoticonButton(":5a2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thborder.gif");
	buttons += emoticonButton(":5s2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thbikini.gif");
	buttons += emoticonButton(":5d2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thbe36a4169370fe500bcdc087f08336f2.gif");
	buttons += emoticonButton(":5f2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thbathtub-1.gif");
	buttons += emoticonButton(":5g2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thbathtub.png");
	buttons += emoticonButton(":5h2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thbag-1.jpg");
	buttons += emoticonButton(":5j2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thbabyalive-3.png");
	buttons += emoticonButton(":5k2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thbaby.gif");
	buttons += emoticonButton(":5l2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thbabi.gif");
	buttons += emoticonButton(":5z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thb36db721310ea1966de1e1085593cd7d.gif");
	buttons += emoticonButton(":5x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thawan.gif");
	buttons += emoticonButton(":5c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thand-1.gif");
	buttons += emoticonButton(":5v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thand.gif");
	buttons += emoticonButton(":5b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thaiskim.gif");
	buttons += emoticonButton(":5n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thads.gif");
	buttons += emoticonButton(":5m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thabfc7734cb7df3536bbe8a31e94a08d3.gif");
	buttons += emoticonButton(":6u2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/thaa6be342d40d547115739186cf1e399b.gif");
	buttons += emoticonButton(":6i2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/tha9593363a9061124fdf8354dad4c4a4e.gif");
	buttons += emoticonButton(":6o2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/tha6827213c01325bc029c22e7825f34f3.gif");
	buttons += emoticonButton(":6p2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/tha5a3fc9e6c0fbe3d9ea6cc90398e5a8d.gif");
	buttons += emoticonButton(":6a2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/tha3a7fca6efa64cb91382e71ef6411c7f.gif");
	buttons += emoticonButton(":6s2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/tha0d779e4ad67853d4a73079576889c94.gif");
	buttons += emoticonButton(":6d2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th33540710a3bd98189ba3b35399ee9dc3.gif");
	buttons += emoticonButton(":6f2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1528960vmqvpw4jt3.gif");
	buttons += emoticonButton(":6g2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1328324hbsz9p9v7o.gif");
	buttons += emoticonButton(":6h2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th01253381cea557394528d4c2afe509b5.gif");
	buttons += emoticonButton(":6j2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1096633gqlmgwntdc.gif");
	buttons += emoticonButton(":6k2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1093162.gif");
	buttons += emoticonButton(":6l2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1059163vjojv4a7vp.gif");
	buttons += emoticonButton(":6z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th998820.gif");
	buttons += emoticonButton(":6x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th821724a8948a4438c5a4dff10e85fd02.gif");
	buttons += emoticonButton(":6c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th586712.gif");
	buttons += emoticonButton(":6v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th468865.gif");
	buttons += emoticonButton(":6b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th111243a7e23ff3777627d9b5e7c86a5d.gif");
	buttons += emoticonButton(":6n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th95866f11393c9e5ce1e21147fd12793a.gif");
	buttons += emoticonButton(":6m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th75750b57a5254d663cbcac65c1067d61.gif");
	buttons += emoticonButton(":7i2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th74063a4bbb07c486396c0f273b882de8.gif");
	buttons += emoticonButton(":7o2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th73169d6b071649edb910c27f3cf1e599.gif");
	buttons += emoticonButton(":7p2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th9327c499e6b8436d8b0de5aa8e50dfac.gif");
	buttons += emoticonButton(":7a2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th4609ac71fac501e0687628c6f68de5a5.gif");
	buttons += emoticonButton(":7s2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th03123dc41a41c071ecf023ec11e21645-1.gif");
	buttons += emoticonButton(":7d2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th0912f28e4324dcd21f217a55bea11913.gif");
	buttons += emoticonButton(":7f2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th677c78e8cefc4a35a83a10a2740b6daa.gif");
	buttons += emoticonButton(":7g2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th673f75a2f1b9c536aabc410e74740457.gif");
	buttons += emoticonButton(":7h2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th627efbdd2622aa9ef584525db4b29183.gif");
	buttons += emoticonButton(":7j2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th250c967ad9f8a9092de959d37c3ebbeb.gif");
	buttons += emoticonButton(":7k2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th237.gif");
	buttons += emoticonButton(":7l2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th236.gif");
	buttons += emoticonButton(":7z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th221c986518e1348ea9ebbfb8d1c9a938.gif");
	buttons += emoticonButton(":7x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th208d2892a1c66613ee7dbd70db4a21c7.gif");
	buttons += emoticonButton(":7c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th150faa4c05906c05a2c1eae6ab8ef42d.gif");
	buttons += emoticonButton(":7v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th107.gif");
	buttons += emoticonButton(":7b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th86f1567f4f372596f17a0fc7748ba4e5.gif");
	buttons += emoticonButton(":7n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th67bb19fe36c037cb32b64f1f31ae1b64-1.gif");
	buttons += emoticonButton(":7m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th60.gif");
	buttons += emoticonButton(":8i2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th49dace614700c33783c6d4c26e1039dc.gif");
	buttons += emoticonButton(":8o2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th43-1.gif");
	buttons += emoticonButton(":8p2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th22d30637f777d0213398629fc8accb98.gif");
	buttons += emoticonButton(":8a2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th22b18afb8b93719ee5a1ee015a6a743c.gif");
	buttons += emoticonButton(":8s2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th15.gif");
	buttons += emoticonButton(":8d2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th13f3a046b7844188c83857590d2980e6.gif");
	buttons += emoticonButton(":8f2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th12dee06bc3cf473825e4ee35eb5be36f.gif");
	buttons += emoticonButton(":8g2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th9dd6312f4397b49730b213367e519df7.gif");
	buttons += emoticonButton(":8h2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th9b800c0aba9563a86e446c8d53c419a7.gif");
	buttons += emoticonButton(":8j2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th9aa39c8b0d3e2ead1f9c2f16ab07c730.gif");
	buttons += emoticonButton(":8k2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th9.gif");
	buttons += emoticonButton(":8l2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th8e4a89749c3eccd5af8501baf19416c5.gif");
	buttons += emoticonButton(":8z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th8.gif");
	buttons += emoticonButton(":8x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th7ffc5d74ed033c0a1bb463124644d281.gif");
	buttons += emoticonButton(":8c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th7fba24c58b4cef89e92d022e0e1413b3.gif");
	buttons += emoticonButton(":8v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th7f469042d188796e8f987378e26d4e5a.gif");
	buttons += emoticonButton(":8b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th7c3379f6ed61cd1c74f2045571a4c304.gif");
	buttons += emoticonButton(":8n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th7.gif");
	buttons += emoticonButton(":8m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th6.gif");
	buttons += emoticonButton(":9i2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th5f48c6ce6600f624c998d2eb38ac1937.gif");
	buttons += emoticonButton(":9o2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th5eb6d9b176f9932e811e2bc42babe44f.gif");
	buttons += emoticonButton(":9p2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th5d092f7e726d7da16e5186fb0976af0c.gif");
	buttons += emoticonButton(":9a2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th5cd56e441e4685ab93bf4a2a97d4d417.gif");
	buttons += emoticonButton(":9s2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th5bcbf674c20324a70e3ebfddfa275d20.gif");
	buttons += emoticonButton(":9d2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th5b9cbbdaea93190d082ce9cda398c596.gif");
	buttons += emoticonButton(":9f2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th5ad501860c247be256ec9b53c87ecba1.gif");
	buttons += emoticonButton(":9g2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th4fb6967c0529cf9283df8e86a433f6b4.gif");
	buttons += emoticonButton(":9h2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th4ede5150f085a79656d3a93ebd4a4918.gif");
	buttons += emoticonButton(":9j2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th04c9daf52db9e3df9b5bd42cdbad7dba.gif");
	buttons += emoticonButton(":9k2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th04c09d02e31656e9683763e1fab14aec.gif");
	buttons += emoticonButton(":9l2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th4c5fa1bc07dccb76c04c1ad2083db537.gif");
	buttons += emoticonButton(":9z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th04b8097bbfda153bc7613c00830a32fc.gif");
	buttons += emoticonButton(":9x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th4-1.gif");
	buttons += emoticonButton(":9c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th3cb2b21c1d3258b172a00eb5ad0ef0ea.gif");
	buttons += emoticonButton(":9v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th3-1.gif");
	buttons += emoticonButton(":9b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th2fe72b356473eb9e51a7a6ee523ac28b-1.gif");
	buttons += emoticonButton(":9n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th2-1.gif");
	buttons += emoticonButton(":9m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1tenki.gif");
	buttons += emoticonButton(":0i2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1shobon.gif");
	buttons += emoticonButton(":0o2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1lunch.gif");
	buttons += emoticonButton(":0p2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1home2.gif");
	buttons += emoticonButton(":0a2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1guji_p.gif");
	buttons += emoticonButton(":0s2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1ea7f963104c3abc371cd348fbee35d3.gif");
	buttons += emoticonButton(":0d2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1carani.gif");
	buttons += emoticonButton(":0f2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1cakeset_p.gif");
	buttons += emoticonButton(":0g2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1aniko1_p.gif");
	buttons += emoticonButton(":0h2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th1-1.gif");
	buttons += emoticonButton(":0j2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th0e7f5fbb992636e3842ad0e07081130b.gif");
	buttons += emoticonButton(":0k2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/th258394.gif");
	buttons += emoticonButton(":0l2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/tees.gif");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/teddy.gif");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/taik.gif");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/tablelamp1.png");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/study.gif");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/starts.gif");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/stars.gif");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/sosad.png");
	buttons += emoticonButton(":0i2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/sobs.png");
	buttons += emoticonButton(":0o2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/snowman.gif");
	buttons += emoticonButton(":0p2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/smilegift.png");
	buttons += emoticonButton(":0a2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/sleeps.png");
	buttons += emoticonButton(":0s2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/skull.gif");
	buttons += emoticonButton(":0d2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/singing.gif");
	buttons += emoticonButton(":0f2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/showergel.png");
	buttons += emoticonButton(":0g2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/shoppig.gif");
	buttons += emoticonButton(":0h2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/sheep.gif");
	buttons += emoticonButton(":0j2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/sewing.png");
	buttons += emoticonButton(":0k2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/sedih.gif");
	buttons += emoticonButton(":0l2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/scared.png");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/sad.gif");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/rose.png");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/ribbon2.gif");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/ribbon.png");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/raining.png");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/q3.png");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/pumpkin.gif");
	buttons += emoticonButton(":0i2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/pregnant.png");
	buttons += emoticonButton(":0o2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/prawn.png");
	buttons += emoticonButton(":0p2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/plant.png");
	buttons += emoticonButton(":0a2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/planet.gif");
	buttons += emoticonButton(":0s2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/plane-1.png");
	buttons += emoticonButton(":0d2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/plane.gif");
	buttons += emoticonButton(":0f2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/pinkcart.png");
	buttons += emoticonButton(":0g2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/pinkcar.png");
	buttons += emoticonButton(":0h2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/penguin.gif");
	buttons += emoticonButton(":0j2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/pencil.png");
	buttons += emoticonButton(":0k2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/pc2.gif");
	buttons += emoticonButton(":0l2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/najwa-1.gif");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/music.gif");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/mmuah.gif");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/milk.png");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/midnight.gif");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/microwave.jpg");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/mekdi.gif");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/medicine.gif");
	buttons += emoticonButton(":0i2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/makeups.png");
	buttons += emoticonButton(":0o2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/makan-1.gif");
	buttons += emoticonButton(":0p2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/mail-1.gif");
	buttons += emoticonButton(":0a2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/mail.gif");
	buttons += emoticonButton(":0s2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/LVbag2.png");
	buttons += emoticonButton(":0d2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/luckygirl.png");
	buttons += emoticonButton(":0f2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/lovey.png");
	buttons += emoticonButton(":0g2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/look-up.png");
	buttons += emoticonButton(":0h2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/laptop.png");
	buttons += emoticonButton(":0j2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/lalala.gif");
	buttons += emoticonButton(":0k2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/kitchen.png");
	buttons += emoticonButton(":0l2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/key.png");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/keitai2.png");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/kebawah.gif");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/keatas.gif");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/jump2.gif");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/juliasobbyfaces.png");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/jam-1.gif");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/inlove.png");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/ikanpaus.gif");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/huhu.gif");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/house.gif");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/hotweather.png");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/hospital.gif");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/hk-watermelon.png");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/hk-shy.png");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/hk-giggles.png");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/Hkcry.png");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/hk-blur.png");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/hk-3.gif");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/hk2.gif");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/him2.png");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/heartbroken1.png");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/heart.gif");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/happy.png");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/handbag2.png");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/guitar.gif");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/girlsleepy.png");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/girl-singing.png");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/girlsing.png");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/girlok.png");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/girlhoorey1.png");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/girlheart.png");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/girlgood.png");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/girlcamera.png");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/girl2.gif");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/geram.gif");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/gem.png");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/fruitcake.png");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/friedrice.png");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/fon-1.gif");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/flykiss2.png");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/flowery.png");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/flower3.png");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/flower1.png");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/flagsudan.png");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/flag.gif");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/fish.png");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/ferriswheel.png");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/fatbelly.gif");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/eyeliner.gif");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/error.gif");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/email.png");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/elephant.png");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/eatrice3.png");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/eatrice1.png");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/dresses.png");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/dress-1.gif");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/donut.gif");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/dizzy.png");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/desserts.png");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/dating.png");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/cupcake.gif");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/cup.gif");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/cry2.png");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/cry1.png");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/cries.png");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/couple-1.gif");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/coffee.png");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/chocolate.png");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/checked.gif");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/cart.png");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/car.gif");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/camera.gif");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/cake.png");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/bye.gif");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/bunnies-1.png");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/bunnies.gif");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/bra.png");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/books.gif");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/bom.gif");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/blog.png");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/blinkies-1.gif");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/blinkies.gif");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/blaa.gif");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/bintang.gif");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/below.png");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/beautyset.gif");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/bath1.png");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/balloons.png");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/bag.gif");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/babymilkbottle.png");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/babygirl.png");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/baby.png");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/atuk.png");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/angry.png");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/and1.png");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/aiskrim2.gif");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/above.png");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/687438-1.gif");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/7f9c029f-1.gif");
	buttons += emoticonButton(":0v2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/7Eleven-1.gif");
	buttons += emoticonButton(":0b2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/yummyfood.gif");
	buttons += emoticonButton(":0n2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/5.gif");
	buttons += emoticonButton(":0m2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/989358q68j6aq442.gif");
	buttons += emoticonButton(":0z2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/divider2.png");
	buttons += emoticonButton(":0x2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/divider.png");
	buttons += emoticonButton(":0c2:", "http://i596.photobucket.com/albums/tt44/ainurnajwastory/emoticons/1198628i1pc0pp8co.gif");
	

    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);

    
