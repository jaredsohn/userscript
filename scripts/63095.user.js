// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by thedieyna (http://dieyna-afieyna.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kawaii Emoticons
// @namespace      http://dieyna-afieyna.blogspot.com/
// @description    You can use emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
                      
        
buttons += emoticonButton("happy birthday", "http://i1001.photobucket.com/albums/af135/bananarepub/108c.gif");
buttons += emoticonButton("aescha", "http://i1001.photobucket.com/albums/af135/bananarepub/aesha.gif");
buttons += emoticonButton("cyera", "http://i1001.photobucket.com/albums/af135/bananarepub/cyera.gif");
buttons += emoticonButton("lidya", "http://i1001.photobucket.com/albums/af135/bananarepub/lidya.gif")
buttons += emoticonButton("apple pie", "http://i1001.photobucket.com/albums/af135/bananarepub/applepie.gif")
buttons += emoticonButton("beg", "http://i1001.photobucket.com/albums/af135/bananarepub/bag.gif")
buttons += emoticonButton("ice blend", "http://i1001.photobucket.com/albums/af135/bananarepub/blender.gif")
buttons += emoticonButton("farez", "http://i1001.photobucket.com/albums/af135/bananarepub/boyis.gif")
buttons += emoticonButton("study", "http://i1001.photobucket.com/albums/af135/bananarepub/boyis.gif")
buttons += emoticonButton("cars", "http://i1001.photobucket.com/albums/af135/bananarepub/car.gif")
buttons += emoticonButton("jc0", "http://i1001.photobucket.com/albums/af135/bananarepub/donut.gif")
buttons += emoticonButton("error", "http://i1001.photobucket.com/albums/af135/bananarepub/error.gif")
buttons += emoticonButton("blinkies", "http://i1001.photobucket.com/albums/af135/bananarepub/flies.gif")
buttons += emoticonButton("call", "http://i1001.photobucket.com/albums/af135/bananarepub/fon.gif")
buttons += emoticonButton("housie", "http://i1001.photobucket.com/albums/af135/bananarepub/house.gif")
buttons += emoticonButton("mr puyuh", "http://i1001.photobucket.com/albums/af135/bananarepub/itek.gif")
buttons += emoticonButton("lalala", "http://i1001.photobucket.com/albums/af135/bananarepub/lalala.gif")
buttons += emoticonButton("mail", "http://i1001.photobucket.com/albums/af135/bananarepub/mail.gif")
buttons += emoticonButton("ubat", "http://i1001.photobucket.com/albums/af135/bananarepub/medicine.gif")
buttons += emoticonButton("mcd", "http://i1001.photobucket.com/albums/af135/bananarepub/mekdi.gif")
buttons += emoticonButton("parcel", "http://i1001.photobucket.com/albums/af135/bananarepub/parcel.gif")
buttons += emoticonButton("bank in", "http://i1001.photobucket.com/albums/af135/bananarepub/pos.gif")
buttons += emoticonButton("psp", "http://i1001.photobucket.com/albums/af135/bananarepub/psp.gif")
buttons += emoticonButton("shopping", "http://i1001.photobucket.com/albums/af135/bananarepub/shoppig.gif")
buttons += emoticonButton("hanger", "http://i1001.photobucket.com/albums/af135/bananarepub/th258394.gif")
buttons += emoticonButton("mandi","http://i1001.photobucket.com/albums/af135/bananarepub/tinibathtub.gif")
buttons += emoticonButton("wani", "http://i1001.photobucket.com/albums/af135/bananarepub/wani.gif")
buttons += emoticonButton("yummy", "http://i1001.photobucket.com/albums/af135/bananarepub/yummyfood.gif")
buttons += emoticonButton("blink", "http://i1001.photobucket.com/albums/af135/bananarepub/blinkies.gif")
buttons += emoticonButton("x02", "http://i1001.photobucket.com/albums/af135/bananarepub/x02.gif")
buttons += emoticonButton("trolley", "http://i1001.photobucket.com/albums/af135/bananarepub/trolley.gif")
buttons += emoticonButton("snowman", "http://i1001.photobucket.com/albums/af135/bananarepub/snowman.gif")
buttons += emoticonButton("sad", "http://i1001.photobucket.com/albums/af135/bananarepub/sad.gif")
buttons += emoticonButton("planet", "http://i1001.photobucket.com/albums/af135/bananarepub/planet.gif")
buttons += emoticonButton("music", "http://i1001.photobucket.com/albums/af135/bananarepub/music.gif")
buttons += emoticonButton("couple", "http://i1001.photobucket.com/albums/af135/bananarepub/couple-1.gif")
buttons += emoticonButton("down", "http://i1001.photobucket.com/albums/af135/bananarepub/kebawah.gif")
buttons += emoticonButton("up", "http://i1001.photobucket.com/albums/af135/bananarepub/keatas.gif")
buttons += emoticonButton("jumpies", "http://i1001.photobucket.com/albums/af135/bananarepub/jump2.gif")
buttons += emoticonButton("handphone", "http://i1001.photobucket.com/albums/af135/bananarepub/fon-1.gif")
buttons += emoticonButton("shit", "http://i1001.photobucket.com/albums/af135/bananarepub/taik.gif")
buttons += emoticonButton("vacum", "http://i1001.photobucket.com/albums/af135/bananarepub/vacuum.gif")
buttons += emoticonButton("water drop", "http://i1001.photobucket.com/albums/af135/bananarepub/air2.gif")
buttons += emoticonButton("hk", "http://i1001.photobucket.com/albums/af135/bananarepub/hk2.gif")
buttons += emoticonButton("watch", "http://i1001.photobucket.com/albums/af135/bananarepub/jam-1.gif")
buttons += emoticonButton("bom", "http://i1001.photobucket.com/albums/af135/bananarepub/bom.gif")
buttons += emoticonButton("cup", "http://i1001.photobucket.com/albums/af135/bananarepub/cup.gif")
buttons += emoticonButton("game", "http://i1001.photobucket.com/albums/af135/bananarepub/game.gif")
buttons += emoticonButton("pital", "http://i1001.photobucket.com/albums/af135/bananarepub/hospital.gif")
buttons += emoticonButton("sapu", "http://i1001.photobucket.com/albums/af135/bananarepub/menyapu.gif")
buttons += emoticonButton("pc", "http://i1001.photobucket.com/albums/af135/bananarepub/pc2.gif")
buttons += emoticonButton("skull", "http://i1001.photobucket.com/albums/af135/bananarepub/skull.gif")
buttons += emoticonButton("plane", "http://i1001.photobucket.com/albums/af135/bananarepub/plane.gif")
buttons += emoticonButton("icescream", "http://i1001.photobucket.com/albums/af135/bananarepub/aiskrim2.gif")
buttons += emoticonButton("grr", "http://i1001.photobucket.com/albums/af135/bananarepub/geram.gif")
buttons += emoticonButton("sedih", "http://i1001.photobucket.com/albums/af135/bananarepub/sedih.gif")
buttons += emoticonButton("tdo", "http://i1001.photobucket.com/albums/af135/bananarepub/tdo.gif")
buttons += emoticonButton("wanie", "http://i1001.photobucket.com/albums/af135/bananarepub/th_wani-1.jpg");
buttons += emoticonButton("pig", "http://i1001.photobucket.com/albums/af135/bananarepub/th_babi.gif");
buttons += emoticonButton("luggage", "http://i1001.photobucket.com/albums/af135/bananarepub/th_bag-1.jpg");
buttons += emoticonButton("bakery", "http://i1001.photobucket.com/albums/af135/bananarepub/th_bakerybun.gif");
buttons += emoticonButton("bath tub", "http://i1001.photobucket.com/albums/af135/bananarepub/th_bathtub.png");
buttons += emoticonButton("bikini", "http://i1001.photobucket.com/albums/af135/bananarepub/th_bikini.gif");
buttons += emoticonButton("borderopen", "http://i1001.photobucket.com/albums/af135/bananarepub/th_border.gif");
buttons += emoticonButton("borderclosed", "http://i1001.photobucket.com/albums/af135/bananarepub/th_border2.gif");
buttons += emoticonButton("bus", "http://i1001.photobucket.com/albums/af135/bananarepub/th_bus.jpg");
buttons += emoticonButton("cake", "http://i1001.photobucket.com/albums/af135/bananarepub/th_cake.gif");
buttons += emoticonButton("celebration", "http://i1001.photobucket.com/albums/af135/bananarepub/th_celebration-1.gif");
buttons += emoticonButton("donut", "http://i1001.photobucket.com/albums/af135/bananarepub/th_donut-1.gif");
buttons += emoticonButton("fairy", "http://i1001.photobucket.com/albums/af135/bananarepub/th_fairy.gif");
buttons += emoticonButton("pumpkin", "http://i1001.photobucket.com/albums/af135/bananarepub/th_hallowween.gif");
buttons += emoticonButton("handbag", "http://i1001.photobucket.com/albums/af135/bananarepub/th_handbag.jpg");
buttons += emoticonButton("duhh", "http://i1001.photobucket.com/albums/af135/bananarepub/th_hk-duhh.gif");
buttons += emoticonButton("grr", "http://i1001.photobucket.com/albums/af135/bananarepub/th_hk-grr.gif");
buttons += emoticonButton("happy", "http://i1001.photobucket.com/albums/af135/bananarepub/th_hk-happy.gif");
buttons += emoticonButton("iskk", "http://i1001.photobucket.com/albums/af135/bananarepub/th_hk-isk.gif");
buttons += emoticonButton("love", "http://i1001.photobucket.com/albums/af135/bananarepub/th_hk-love.gif");
buttons += emoticonButton("ouch", "http://i1001.photobucket.com/albums/af135/bananarepub/th_hk-ouch.gif");
buttons += emoticonButton("sleep", "http://i1001.photobucket.com/albums/af135/bananarepub/th_hk-sleep.gif");
buttons += emoticonButton("wtever", "http://i1001.photobucket.com/albums/af135/bananarepub/th_hk-wever.gif");
buttons += emoticonButton("house", "http://i1001.photobucket.com/albums/af135/bananarepub/th_house-1.gif");
buttons += emoticonButton("iron", "http://i1001.photobucket.com/albums/af135/bananarepub/th_iron.png");
buttons += emoticonButton("cooking", "http://i1001.photobucket.com/albums/af135/bananarepub/th_masak.gif");
buttons += emoticonButton("laundry", "http://i1001.photobucket.com/albums/af135/bananarepub/th_laundry.gif");
buttons += emoticonButton("lemonade", "http://i1001.photobucket.com/albums/af135/bananarepub/th_lemoande.gif");
buttons += emoticonButton("makeup", "http://i1001.photobucket.com/albums/af135/bananarepub/th_makeup.jpg");
buttons += emoticonButton("moon", "http://i1001.photobucket.com/albums/af135/bananarepub/th_moon.gif");
buttons += emoticonButton("parcel", "http://i1001.photobucket.com/albums/af135/bananarepub/th_parcel-1.gif");
buttons += emoticonButton("shoes", "http://i1001.photobucket.com/albums/af135/bananarepub/th_shoe.gif");
buttons += emoticonButton("spec", "http://i1001.photobucket.com/albums/af135/bananarepub/th_shades.gif");
buttons += emoticonButton("scissors", "http://i1001.photobucket.com/albums/af135/bananarepub/th_scissors.gif");
buttons += emoticonButton("tb", "http://i1001.photobucket.com/albums/af135/bananarepub/th_tb.jpg");
buttons += emoticonButton("ichigo", "http://i1001.photobucket.com/albums/af135/bananarepub/th_strawberi.gif");
buttons += emoticonButton("pants", "http://i1001.photobucket.com/albums/af135/bananarepub/th_trousers.jpg");
buttons += emoticonButton("trolley", "http://i1001.photobucket.com/albums/af135/bananarepub/th_trolley-1.gif");
buttons += emoticonButton("umbrella", "http://i1001.photobucket.com/albums/af135/bananarepub/th_umbrella.gif");
buttons += emoticonButton("!!", "http://i1001.photobucket.com/albums/af135/bananarepub/th_c6013877.gif");
buttons += emoticonButton("!?", "http://i1001.photobucket.com/albums/af135/bananarepub/th_hah.gif");
buttons += emoticonButton("camera", "http://i1001.photobucket.com/albums/af135/bananarepub/th_camera.gif");
buttons += emoticonButton("zero", "http://i1001.photobucket.com/albums/af135/bananarepub/7f9c029f.gif");
buttons += emoticonButton("one", "http://i1001.photobucket.com/albums/af135/bananarepub/th_1-1.gif");
buttons += emoticonButton("two", "http://i1001.photobucket.com/albums/af135/bananarepub/th_2-1.gif");
buttons += emoticonButton("three", "http://i1001.photobucket.com/albums/af135/bananarepub/th_3-1.gif");
buttons += emoticonButton("four", "http://i1001.photobucket.com/albums/af135/bananarepub/th_4-1.gif");
buttons += emoticonButton("five", "http://i1001.photobucket.com/albums/af135/bananarepub/5.gif");
buttons += emoticonButton("six", "http://i1001.photobucket.com/albums/af135/bananarepub/th_6.gif");
buttons += emoticonButton("seven","http://i1001.photobucket.com/albums/af135/bananarepub/th_7.gif");
buttons += emoticonButton("eight", "http://i1001.photobucket.com/albums/af135/bananarepub/th_8.gif");
buttons += emoticonButton("nine", "http://i1001.photobucket.com/albums/af135/bananarepub/th_9.gif");
buttons += emoticonButton("tear drop", "http://i1001.photobucket.com/albums/af135/bananarepub/th_95866f11393c9e5ce1e21147fd12793a.gif");
buttons += emoticonButton("aiskrim", "http://i1001.photobucket.com/albums/af135/bananarepub/th_aiskim.gif");
buttons += emoticonButton("awan", "http://i1001.photobucket.com/albums/af135/bananarepub/th_awan.gif");
buttons += emoticonButton("bath tub", "http://i1001.photobucket.com/albums/af135/bananarepub/th_bathtub-1.gif");
buttons += emoticonButton("ciken", "http://i1001.photobucket.com/albums/af135/bananarepub/th_ciken-1.gif");
buttons += emoticonButton("cucuk", "http://i1001.photobucket.com/albums/af135/bananarepub/th_cucuk.gif");
buttons += emoticonButton("house", "http://i1001.photobucket.com/albums/af135/bananarepub/th_house2.gif");
buttons += emoticonButton("lorry", "http://i1001.photobucket.com/albums/af135/bananarepub/th_lori.gif");
buttons += emoticonButton("medicine", "http://i1001.photobucket.com/albums/af135/bananarepub/th_medicine-1.gif");
buttons += emoticonButton("mee", "http://i1001.photobucket.com/albums/af135/bananarepub/th_mee2.gif");
buttons += emoticonButton("movie", "http://i1001.photobucket.com/albums/af135/bananarepub/th_movie.gif");
buttons += emoticonButton("postbox", "http://i1001.photobucket.com/albums/af135/bananarepub/th_postbox.gif");
buttons += emoticonButton("ribbon", "http://i1001.photobucket.com/albums/af135/bananarepub/th_ribbon.gif");
buttons += emoticonButton("skola", "http://i1001.photobucket.com/albums/af135/bananarepub/th_skola.gif");
buttons += emoticonButton("stokin", "http://i1001.photobucket.com/albums/af135/bananarepub/th_stoking.gif");
buttons += emoticonButton("sun", "http://i1001.photobucket.com/albums/af135/bananarepub/th_sun.gif");
buttons += emoticonButton("wire", "http://i1001.photobucket.com/albums/af135/bananarepub/th_wire2.gif");
buttons += emoticonButton("purse", "http://i1001.photobucket.com/albums/af135/bananarepub/th_wallet.gif");
buttons += emoticonButton("bunny", "http://i1001.photobucket.com/albums/af135/bananarepub/th_bunny.gif");
buttons += emoticonButton("dress", "http://i1001.photobucket.com/albums/af135/bananarepub/th_dress.gif");
buttons += emoticonButton("boy", "http://i1001.photobucket.com/albums/af135/bananarepub/th_boy.gif");
buttons += emoticonButton("girl", "http://i1001.photobucket.com/albums/af135/bananarepub/th_girl-1.gif");
buttons += emoticonButton("nenek", "http://i1001.photobucket.com/albums/af135/bananarepub/th_nnek.gif");
buttons += emoticonButton("pineapple", "http://i1001.photobucket.com/albums/af135/bananarepub/th_pineapple.gif");
buttons += emoticonButton("stars", "http://i1001.photobucket.com/albums/af135/bananarepub/starts.gif");
buttons += emoticonButton("whale", "http://i1001.photobucket.com/albums/af135/bananarepub/ikanpaus.gif");
buttons += emoticonButton("penguin", "http://i1001.photobucket.com/albums/af135/bananarepub/penguin.gif");
buttons += emoticonButton("badminton", "http://i1001.photobucket.com/albums/af135/bananarepub/badminton.gif");
buttons += emoticonButton("bola jaring", "http://i1001.photobucket.com/albums/af135/bananarepub/bolajaring.gif");
buttons += emoticonButton("guitar", "http://i1001.photobucket.com/albums/af135/bananarepub/guitar.gif");
buttons += emoticonButton("bintang", "http://i1001.photobucket.com/albums/af135/bananarepub/bintang.gif");
buttons += emoticonButton("sofbol", "http://i1001.photobucket.com/albums/af135/bananarepub/sofbol.gif");
buttons += emoticonButton("books", "http://i1001.photobucket.com/albums/af135/bananarepub/books.gif");

buttons += emoticonButton("baby", "http://i1001.photobucket.com/albums/af135/bananarepub/th_baby.gif");
buttons += emoticonButton("atok", "http://i1001.photobucket.com/albums/af135/bananarepub/th_atok.gif");
buttons += emoticonButton("couple 1", "http://i1001.photobucket.com/albums/af135/bananarepub/th_cpel.gif");
buttons += emoticonButton("couple 2", "http://i1001.photobucket.com/albums/af135/bananarepub/th_couple-2.gif");
buttons += emoticonButton("makcik", "http://i1001.photobucket.com/albums/af135/bananarepub/th_macik.gif");
buttons += emoticonButton("mesin jahit", "http://i1001.photobucket.com/albums/af135/bananarepub/th_mesinjait.gif");
buttons += emoticonButton("mickey", "http://i1001.photobucket.com/albums/af135/bananarepub/th_mickeyfg.gif");
buttons += emoticonButton("minnie", "http://i1001.photobucket.com/albums/af135/bananarepub/th_minnie.gif");
buttons += emoticonButton("skirt", "http://i1001.photobucket.com/albums/af135/bananarepub/th_skirt.gif");
buttons += emoticonButton("paip api", "http://i1001.photobucket.com/albums/af135/bananarepub/th_paipapi.gif");
buttons += emoticonButton("smile", "http://i1001.photobucket.com/albums/af135/bananarepub/th_smile.gif");
buttons += emoticonButton("raining", "http://i1001.photobucket.com/albums/af135/bananarepub/th_thmini014.gif");
buttons += emoticonButton("twitter", "http://i1001.photobucket.com/albums/af135/bananarepub/twiitergif.jpg" );
buttons += emoticonButton("toxic", "http://i1001.photobucket.com/albums/af135/bananarepub/toxic.gif");
buttons += emoticonButton("tissue box", "http://i1001.photobucket.com/albums/af135/bananarepub/tissuebox.gif");
buttons += emoticonButton("tees", "http://i1001.photobucket.com/albums/af135/bananarepub/tees.gif" );
buttons += emoticonButton("teddy", "http://i1001.photobucket.com/albums/af135/bananarepub/teddy.gif");
buttons += emoticonButton("study", "http://i1001.photobucket.com/albums/af135/bananarepub/study.gif");
buttons += emoticonButton("stars", "http://i1001.photobucket.com/albums/af135/bananarepub/stars.gif");
buttons += emoticonButton("skype", "http://i1001.photobucket.com/albums/af135/bananarepub/skype.gif");
buttons += emoticonButton("singing", "http://i1001.photobucket.com/albums/af135/bananarepub/singing.gif");
buttons += emoticonButton("ribbon", "http://i1001.photobucket.com/albums/af135/bananarepub/ribbon2.gif");
        

	
 buttons += emoticonButton("microwave", "http://i1001.photobucket.com/albums/af135/bananarepub/microwave.jpg" );
buttons += emoticonButton("mail", "http://i1001.photobucket.com/albums/af135/bananarepub/mail-1.gif");
buttons += emoticonButton("kiddos", "http://i1001.photobucket.com/albums/af135/bananarepub/kiddos.gif");
buttons += emoticonButton("kettle", "http://i1001.photobucket.com/albums/af135/bananarepub/kettle.gif");
buttons += emoticonButton("kerusi", "http://i1001.photobucket.com/albums/af135/bananarepub/kerusi.gif");
buttons += emoticonButton("huhu", "http://i1001.photobucket.com/albums/af135/bananarepub/huhu.gif");
buttons += emoticonButton("heart", "http://i1001.photobucket.com/albums/af135/bananarepub/heart.gif");
buttons += emoticonButton("girl2", "http://i1001.photobucket.com/albums/af135/bananarepub/girl2.gif");
buttons += emoticonButton("lady", "http://i1001.photobucket.com/albums/af135/bananarepub/girl-2.png");
buttons += emoticonButton("flower", "http://i1001.photobucket.com/albums/af135/bananarepub/flower.png");
buttons += emoticonButton("flag", "http://i1001.photobucket.com/albums/af135/bananarepub/flag.gif");
buttons += emoticonButton("eyeliner", "http://i1001.photobucket.com/albums/af135/bananarepub/eyeliner.gif");
buttons += emoticonButton("cupcake", "http://i1001.photobucket.com/albums/af135/bananarepub/cupcake.gif");

buttons += emoticonButton("checked", "http://i1001.photobucket.com/albums/af135/bananarepub/checked.gif");
buttons += emoticonButton("cerek", "http://i1001.photobucket.com/albums/af135/bananarepub/cerek.gif");
buttons += emoticonButton("bunnies", "http://i1001.photobucket.com/albums/af135/bananarepub/bunnies.gif");
buttons += emoticonButton("bubbles", "http://i1001.photobucket.com/albums/af135/bananarepub/bubbles.gif");
buttons += emoticonButton("blinkk", "http://i1001.photobucket.com/albums/af135/bananarepub/blinkies-1.gif");
buttons += emoticonButton("blaa", "http://i1001.photobucket.com/albums/af135/bananarepub/blaa.gif");
buttons += emoticonButton("bees", "http://i1001.photobucket.com/albums/af135/bananarepub/bee.gif");
buttons += emoticonButton("beautyset", "http://i1001.photobucket.com/albums/af135/bananarepub/beautyset.gif");
buttons += emoticonButton("auntie anne", "http://i1001.photobucket.com/albums/af135/bananarepub/auntieanne.png");
buttons += emoticonButton("walk", 
"http://1.bp.blogspot.com/_OV52K-4p-GQ/SpQAqVFxiAI/AAAAAAAAE7s/AUF4XnvuMlA/s1600/jalan.gif");


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

    