// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Emoticons for Blogger
// @namespace      http://www.kuribo.info/
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
	buttons += emoticonButton("tutupmulut", "https://lh3.googleusercontent.com/-htuTepYFm8M/T-qK0C947uI/AAAAAAAAA1g/VeTMIMlhE7Q/h120/tutupmulut.gif");
	buttons += emoticonButton("tinju", "https://lh4.googleusercontent.com/-Ya_YJBbfjqo/T-qKx3ciHKI/AAAAAAAAA1Y/bNkByBz6Gq8/h120/tinju.gif");
	buttons += emoticonButton("ting", "https://lh5.googleusercontent.com/-sLy5mD-0hiA/T-qKvCcS7WI/AAAAAAAAA1Q/BPbEZ3267jc/h120/ting.gif");
	buttons += emoticonButton("tidur", "https://lh6.googleusercontent.com/-wX7tNGPQA_Y/T-qKrmj10vI/AAAAAAAAA1I/HCTXtPJehzg/h120/tidur.gif");
	buttons += emoticonButton("tepuktangan", "https://lh6.googleusercontent.com/-FNbAsJrftQA/T-qKp1ZQv8I/AAAAAAAAA1A/DdG2CVBdnQY/h120/tepuktangan.gif");
	buttons += emoticonButton("tampar", "https://lh5.googleusercontent.com/-MAK6tJ9KL2w/T-qKn6W3OaI/AAAAAAAAA04/BnXEswEthNs/h120/tampar.gif");
	buttons += emoticonButton("tameng", "https://lh3.googleusercontent.com/-0edaFg3IG84/T-qKkSTfqHI/AAAAAAAAA0w/0geyQz7E30A/h120/tameng.gif");
	buttons += emoticonButton("swt3", "https://lh5.googleusercontent.com/-h-GEl5dqW8c/T-qKiSthK7I/AAAAAAAAA0o/1WB7ri37Ohc/h120/swt3.gif");
	buttons += emoticonButton("swt2", "https://lh6.googleusercontent.com/-Gm-p9qnZgLA/T-qKga5SN4I/AAAAAAAAA0g/UACJXh69luo/h120/swt2.gif");
	buttons += emoticonButton("swt", "https://lh4.googleusercontent.com/-n6uG3KVY64o/T-qKd9c6pTI/AAAAAAAAA0Y/FZnMRJGXTIs/h120/swt.gif");
	buttons += emoticonButton("sttt", "https://lh6.googleusercontent.com/-GL51kOv5Ljk/T-qKa_os4_I/AAAAAAAAA0Q/Gb-dGcaKT48/h120/sttt.gif");
	buttons += emoticonButton("silau", "https://lh3.googleusercontent.com/-LfvW2BtzkWk/T-qKUwa1roI/AAAAAAAAA0I/F9U0gAN0HwE/h120/silau.gif");
	buttons += emoticonButton("senyum", "https://lh3.googleusercontent.com/-oC1y917kzTo/T-qKSLQAlrI/AAAAAAAAA0A/IiXaek9RAqA/h120/senyum.gif");
	buttons += emoticonButton("sempoa", "https://lh6.googleusercontent.com/-p4wQOsHXPwI/T-qKOiPFCVI/AAAAAAAAAz4/zEkrLfAu4SQ/h120/sempoa.gif");
	buttons += emoticonButton("semangat", "https://lh3.googleusercontent.com/-6K0ZmbRKw-c/T-qKMUFj3bI/AAAAAAAAAzw/RuRTXFDEkBk/h120/semangat.gif");
	buttons += emoticonButton("salaman", "https://lh5.googleusercontent.com/-LvIkg2BVu3Y/T-qKKZPJqcI/AAAAAAAAAzo/5yGL70hVHHw/h120/salaman.gif");
	buttons += emoticonButton("pusing", "https://lh3.googleusercontent.com/-VMa6ThEdFHs/T-qKIystt0I/AAAAAAAAAzg/073HPKscUgY/h120/pusing.gif");
	buttons += emoticonButton("pelayan", "https://lh6.googleusercontent.com/-Q-5oc5ilWXc/T-qKG3igExI/AAAAAAAAAzY/x7GM410z4zU/h120/pelayan.gif");
	buttons += emoticonButton("peace", "https://lh5.googleusercontent.com/-Li85Y83FXwA/T-qKE8NLVbI/AAAAAAAAAzQ/38U81gKjTGI/h120/peace.gif");
	buttons += emoticonButton("omg", "https://lh5.googleusercontent.com/-mdVvbwpniA4/T-qKCwn3egI/AAAAAAAAAzI/PORfZ14MtwI/h120/omg.gif");
	buttons += emoticonButton("ok", "https://lh5.googleusercontent.com/-sGh809JGrSk/T-qKA2QHcbI/AAAAAAAAAzA/BkgzKhjDNkc/h120/ok.gif");
	buttons += emoticonButton("ngiler", "https://lh4.googleusercontent.com/-2brDhyMOUiU/T-qJ0CE9k_I/AAAAAAAAAyY/2LK9cxhtLZ4/h120/ngiler.gif");
	buttons += emoticonButton("ngiler2", "https://lh5.googleusercontent.com/-vfHwMTG1zVc/T-qJ4tO8ECI/AAAAAAAAAyg/-3-_JKNUubc/h120/ngiler2.gif");
	buttons += emoticonButton("nih", "https://lh6.googleusercontent.com/-xtjZW6zhBic/T-qJ7cVaaFI/AAAAAAAAAyo/p3eX0Kuqi94/h120/nih.gif");
	buttons += emoticonButton("ninja", "https://lh6.googleusercontent.com/-iHiEeeAWn1c/T-qJ9CsTmkI/AAAAAAAAAyw/1049ESrtHFM/h120/ninja.gif");
	buttons += emoticonButton("nyerah", "https://lh4.googleusercontent.com/-VuwAs2w4yP4/T-qJ-_-ihfI/AAAAAAAAAy4/NLYDENiipgg/h120/nyerah.gif");
	buttons += emoticonButton("nangis22", "https://lh6.googleusercontent.com/-LWaUQ_r5OAE/T-qJsUNWQlI/AAAAAAAAAyQ/-NnB-Rzr0vA/h120/nangis22.gif");
	buttons += emoticonButton("nangis2", "https://lh3.googleusercontent.com/-63c-vQENT0k/T-qJaLs4rII/AAAAAAAAAyI/j5edNz0bbAU/h120/nangis2.gif");
	buttons += emoticonButton("nangis", "https://lh5.googleusercontent.com/-HRcPUXo1-54/T-qJX4srQUI/AAAAAAAAAyA/OC8tanrCSbE/h120/nangis.gif");
	buttons += emoticonButton("mukamesum", "https://lh3.googleusercontent.com/-TnUCoW9gjuc/T-qJVVpbJtI/AAAAAAAAAx4/MssYi4Zbq-Y/h120/mukamesum.gif");
	buttons += emoticonButton("muah", "https://lh3.googleusercontent.com/-0uKLVo_Mv-8/T-qJTB203KI/AAAAAAAAAxw/DPiW-w2pTdM/h120/muah.gif");
	buttons += emoticonButton("monyong", "https://lh3.googleusercontent.com/-PYfiy7Htdmk/T-qJQkde73I/AAAAAAAAAxo/6to2Kx2An7U/h120/monyong.gif");
	buttons += emoticonButton("miskin", "https://lh3.googleusercontent.com/-BBucbl_7KKg/T-qJOumaXWI/AAAAAAAAAxg/HlHYHzHtAdQ/h120/miskin.gif");
	buttons += emoticonButton("melet", "https://lh3.googleusercontent.com/-EQNJdWOk6as/T-qJMEL4dRI/AAAAAAAAAxY/ZulFiwKOOKo/h120/melet.gif");
	buttons += emoticonButton("megaphone", "https://lh4.googleusercontent.com/-o5V626QqlGU/T-qJKrTHyFI/AAAAAAAAAxQ/4h44ZgNgJE4/h120/megaphone.gif");
	buttons += emoticonButton("mawar", "https://lh5.googleusercontent.com/-jJpfP6g8gec/T-qJHTZpmkI/AAAAAAAAAxI/hdwwbqXRb04/h120/mawar.gif");
	buttons += emoticonButton("mataduitan", "https://lh3.googleusercontent.com/-zOst_414wyE/T-qJFNCsaOI/AAAAAAAAAxA/NxpqDkdc5fM/h120/mataduitan.gif");
	buttons += emoticonButton("manja", "https://lh3.googleusercontent.com/-mF3wFGpKx7w/T-qJCU0naKI/AAAAAAAAAw4/rSkpXk0KBwo/h120/manja.gif");
	buttons += emoticonButton("malu", "https://lh3.googleusercontent.com/-gBE_GwaLid4/T-qI-oOOn7I/AAAAAAAAAww/FYTvAyuVVIc/h120/malu.gif");
	buttons += emoticonButton("malaikat", "https://lh3.googleusercontent.com/-UOUlgt8pnWM/T-qI85t9zZI/AAAAAAAAAwo/nQuHsjoQqMs/h120/malaikat.gif");
	buttons += emoticonButton("lovekiss", "https://lh4.googleusercontent.com/-A_OwORBcdvE/T-qI7LmZUiI/AAAAAAAAAwg/dKlyanngGqY/h120/lovekiss.gif");
	buttons += emoticonButton("lol", "https://lh5.googleusercontent.com/-Duecd3K0GZc/T-qI4yYzMdI/AAAAAAAAAwY/R_O7uTQBuf8/h120/lol.gif");
	buttons += emoticonButton("komunis", "https://lh3.googleusercontent.com/-Phn9vnMzQFg/T-qI3dsvBqI/AAAAAAAAAwQ/_roWtc0LXG4/h120/komunis.gif");
	buttons += emoticonButton("kisss", "https://lh5.googleusercontent.com/-yH97U38f29E/T-qI1Ry5iqI/AAAAAAAAAwI/J8SL8hkK-9g/h120/kisss.gif");
	buttons += emoticonButton("kacapembesar", "https://lh3.googleusercontent.com/-OGc_PCa5GyA/T-qIn8-BPiI/AAAAAAAAAvg/pVdwWLI9E1s/h120/kacapembesar.gif");
	buttons += emoticonButton("kaget", "https://lh5.googleusercontent.com/-5Zt1teRGE9Q/T-qIpXW15PI/AAAAAAAAAvo/oy71eIGQDYo/h120/kaget.gif");
	buttons += emoticonButton("kaget2", "https://lh3.googleusercontent.com/-YVbsW2T8Wns/T-qIse9_LHI/AAAAAAAAAvw/jY0HgfI6vvY/h120/kaget2.gif");
	buttons += emoticonButton("jahat", "https://lh3.googleusercontent.com/-2ZeFcPWJp6M/T-qIfnk6UoI/AAAAAAAAAvQ/hMmTx-il8YE/h120/jahat.gif");
	buttons += emoticonButton("hmm", "https://lh5.googleusercontent.com/-Fc58CymAzPY/T-qITrsQfzI/AAAAAAAAAu4/Vxq_YNIh0v4/h120/hmm.gif");
	buttons += emoticonButton("hmm2", "https://lh4.googleusercontent.com/-ilClkwqFRx8/T-qIYkPXgKI/AAAAAAAAAvA/qnC1YHfP1RE/h120/hmm2.gif");
	buttons += emoticonButton("kembang", "https://lh3.googleusercontent.com/-Is_z0Z61AX0/T-qIzFZE1JI/AAAAAAAAAwA/1ZE6RFNbkTk/h120/kembang.gif");
	buttons += emoticonButton("gembira", "https://lh5.googleusercontent.com/-XOP9ZFW6n-I/T-qIDn5c59I/AAAAAAAAAuY/rnS_j2w8IxA/h120/gembira.gif");
	buttons += emoticonButton("ha", "https://lh3.googleusercontent.com/-Ra8uExylHtk/T-qIFyOJ6cI/AAAAAAAAAug/OODIGCkzMyY/h120/ha.gif");
	buttons += emoticonButton("hahaha2", "https://lh3.googleusercontent.com/-P_xRlNdHVko/T-qII1ZtP4I/AAAAAAAAAuo/m6bvJB2VIRE/h120/hahaha2.gif");
	buttons += emoticonButton("heh", "https://lh4.googleusercontent.com/-fGw7NBH0H1U/T-qILlqrJjI/AAAAAAAAAuw/XxkWGFWNGlg/h120/heh.gif");
	buttons += emoticonButton("cilukba", "https://lh6.googleusercontent.com/-3VNoZzNLp68/T-qH4y8sb2I/AAAAAAAAAtw/AUKINsZyHsE/h120/cilukba.gif");
	buttons += emoticonButton("bosan", "https://lh6.googleusercontent.com/-IneKL2xlwjo/T-qHvJgjyWI/AAAAAAAAAtI/i33WskgmVg4/h120/bosan.gif");
	buttons += emoticonButton("bungkus", "https://lh5.googleusercontent.com/-wKYNiw8uPqQ/T-qHxK-WsZI/AAAAAAAAAtQ/BaD5iAh_kMk/h120/bungkus.gif");
	buttons += emoticonButton("bye", "https://lh3.googleusercontent.com/-OXd6YP76JGU/T-qHzes3WmI/AAAAAAAAAtY/73vDm9uYktk/h120/bye.gif");
	buttons += emoticonButton("cerutu", "https://lh4.googleusercontent.com/-6aWUg2pabH4/T-qH1hSrH2I/AAAAAAAAAtg/uppYarukEnE/h120/cerutu.gif");
	buttons += emoticonButton("chicken", "https://lh3.googleusercontent.com/-iHgzqNFlf7Y/T-qH3PR4kFI/AAAAAAAAAto/We7e6UH27EE/h120/chicken.gif");
	buttons += emoticonButton("entahlah", "https://lh5.googleusercontent.com/-MqaxlaU7ZgI/T-qH-wbXiHI/AAAAAAAAAuI/7Sz6w-t18DM/h120/entahlah.gif");
	buttons += emoticonButton("dokter", "https://lh4.googleusercontent.com/-2kI7g2SvAaE/T-qH81zqGwI/AAAAAAAAAuA/-9Nq1GkqbCk/h120/dokter.gif");
	buttons += emoticonButton("demam", "https://lh4.googleusercontent.com/-bg70ycC7Z4w/T-qH61hCCOI/AAAAAAAAAt4/x7pXYpskoQw/h120/demam.gif");
			
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" width=\\\"15\\\" height=\\\"15\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);