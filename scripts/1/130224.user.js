// ==UserScript==
// @name           chat porevo.info
// @namespace      text_chat_porevo_info
// @version        0.2.4
// @description    Добавляет панель с смайлами в текстовый чат сайта porevo.info
// @include        http://porevo.info/messenger/modules/chatrooms/index.php?id=1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==


/***************************************************************************************************
Добавляем смайлы на панель!
****************************************************************************************************/

function add_smile(text_code){
	$(".cometchat_textarea").attr("value", $(".cometchat_textarea").attr("value")+text_code);
	$(".cometchat_textarea").focus();
};

function add_username_textarea(text_code){
	$(".cometchat_textarea").attr("value", text_code + ", " + $(".cometchat_textarea").attr("value"));
	$(".cometchat_textarea").focus();
};

$('.topbar_text').append("<div id=\"smiles\" style=\"position: absolute; left: 90px; top: 18px; display: block; height: 39px; width: 485px; padding: 5px; border: solid 1px black; background-color: #F7EEB7; border-radius: 4px 4px 4px 4px;\"></div>");

$('#smiles').append("<img id=\"add_smile_ulybka\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(smile)\" src=\"/messenger/images/smileys/../../../map/e_smile.gif\">");

$('#add_smile_ulybka').click(
  function(){
    add_smile(' :)');
  }
);

$('#smiles').append("<img id=\"add_smile_haha\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(haha)\" src=\"/messenger/images/smileys/../../../map/e_haha.gif\">");

$('#add_smile_haha').click(
  function(){
    add_smile(' )))');
  }
);

$('#smiles').append("<img id=\"add_smile_tink\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(tink)\" src=\"/messenger/images/smileys/../../../map/e_tink.gif\">");

$('#add_smile_tink').click(
  function(){
    add_smile(' (tink)');
  }
);

$('#smiles').append("<img id=\"add_smile_cool\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(cool)\" src=\"/messenger/images/smileys/../../../map/e_cool.gif\">");

$('#add_smile_cool').click(
  function(){
    add_smile(' (cool)');
  }
);

$('#smiles').append("<img id=\"add_smile_redface\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(red)\" src=\"/messenger/images/smileys/../../../map/e_redface.gif\">");

$('#add_smile_redface').click(
  function(){
    add_smile(' (red)');
  }
);

$('#smiles').append("<img id=\"add_smile_lick\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(lick)\" src=\"/messenger/images/smileys/../../../map/e_licklips.gif\">");

$('#add_smile_lick').click(
  function(){
    add_smile(' (lick)');
  }
);

$('#smiles').append("<img id=\"add_smile_dream\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(dream)\" src=\"/messenger/images/smileys/../../../map/e_rolleyes.gif\">");

$('#add_smile_dream').click(
  function(){
    add_smile(' (dream)');
  }
);

$('#smiles').append("<img id=\"add_smile_unsure\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(unsure)\" src=\"/messenger/images/smileys/../../../map/e_unsure.gif\">");

$('#add_smile_unsure').click(
  function(){
    add_smile(' (unsure)');
  }
);

$('#smiles').append("<img id=\"add_smile_aww\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(aww)\" src=\"/messenger/images/smileys/../../../map/e_aww.gif\">");

$('#add_smile_aww').click(
  function(){
    add_smile(' (aww)');
  }
);

$('#smiles').append("<img id=\"add_smile_wow\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(wow)\" src=\"/messenger/images/smileys/../../../map/e_ooo.gif\">");

$('#add_smile_wow').click(
  function(){
    add_smile(' (wow)');
  }
);

$('#smiles').append("<img id=\"add_smile_yes\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(yes)\" src=\"/messenger/images/smileys/../../../map/e_yes.gif\">");

$('#add_smile_yes').click(
  function(){
    add_smile(' (yes)');
  }
);

$('#smiles').append("<img id=\"add_smile_grin\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(grin)\" src=\"/messenger/images/smileys/../../../map/e_grin.gif\">");

$('#add_smile_grin').click(
  function(){
    add_smile(' (grin)');
  }
);

$('#smiles').append("<img id=\"add_smile_tongue\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(tongue)\" src=\"/messenger/images/smileys/../../../map/e_tongue.gif\">");

$('#add_smile_tongue').click(
  function(){
    add_smile(' (tongue)');
  }
);

$('#smiles').append("<img id=\"add_smile_blush\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(blush)\" src=\"/messenger/images/smileys/../../../map/e_blush.gif\">");

$('#add_smile_blush').click(
  function(){
    add_smile(' (blush)');
  }
);

$('#smiles').append("<img id=\"add_smile_spite\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(spite)\" src=\"/messenger/images/smileys/../../../map/e_spite.gif\">");

$('#add_smile_spite').click(
  function(){
    add_smile(' (spite)');
  }
);

$('#smiles').append("<img id=\"add_smile_angry\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(angry)\" src=\"/messenger/images/smileys/../../../map/e_angry.gif\">");

$('#add_smile_angry').click(
  function(){
    add_smile(' (angry)');
  }
);

$('#smiles').append("<img id=\"add_smile_bad\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(bad)\" src=\"/messenger/images/smileys/../../../map/e_bad.gif\">");

$('#add_smile_bad').click(
  function(){
    add_smile(' (bad)');
  }
);

$('#smiles').append("<img id=\"add_smile_fie\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(fie)\" src=\"/messenger/images/smileys/../../../map/e_fie.gif\">");

$('#add_smile_fie').click(
  function(){
    add_smile(' (fie)');
  }
);

$('#smiles').append("<img id=\"add_smile_wacko\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(wacko)\" src=\"/messenger/images/smileys/../../../map/e_wacko.gif\">");

$('#add_smile_wacko').click(
  function(){
    add_smile(' (wacko)');
  }
);

$('#smiles').append("<img id=\"add_smile_heart\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(heart)\" src=\"/messenger/images/smileys/../../../map/e_heart.gif\">");

$('#add_smile_heart').click(
  function(){
    add_smile(' (heart)');
  }
);

$('#smiles').append("<img id=\"add_smile_chmok\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(chmok)\" src=\"/messenger/images/smileys/../../../newsmiles/chmok.gif\">");

$('#add_smile_chmok').click(
  function(){
    add_smile(' (chmok)');
  }
);

$('#smiles').append("<img id=\"add_smile_buket\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(buket)\" src=\"/messenger/images/smileys/../../../newsmiles/buket.gif\">");

$('#add_smile_buket').click(
  function(){
    add_smile(' (buket)');
  }
);

$('#smiles').append("<img id=\"add_smile_tort\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(tort)\" src=\"/messenger/images/smileys/../../../newsmiles/tort.gif\">");

$('#add_smile_tort').click(
  function(){
    add_smile(' (tort)');
  }
);

$('#smiles').append("<img id=\"add_smile_rose\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(rose)\" src=\"/messenger/images/smileys/../../../newsmiles/rose.gif\">");

$('#add_smile_rose').click(
  function(){
    add_smile(' (rose)');
  }
);

$('#smiles').append("<img id=\"add_smile_pletka\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(pletka)\" src=\"/messenger/images/smileys/../../../newsmiles/pletka.gif\">");

$('#add_smile_pletka').click(
  function(){
    add_smile(' (pletka)');
  }
);

$('#smiles').append("<img id=\"add_smile_sado\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(sado)\" src=\"/messenger/images/smileys/../../../newsmiles/sado.gif\">");

$('#add_smile_sado').click(
  function(){
    add_smile(' (sado)');
  }
);

$('#smiles').append("<span id=\"notka_1\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>♫</span> ");

$('#notka_1').click(
  function(){
    add_smile('♫');
  }
);

$('#smiles').append("<span id=\"notka_2\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>♪</span> ");

$('#notka_2').click(
  function(){
    add_smile('♪');
  }
);

$('#smiles').append("<span id=\"beskonechnost\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>∞</span> ");

$('#beskonechnost').click(
  function(){
    add_smile('∞');
  }
);

$('#smiles').append("<span id=\"zerkalce_venery\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>♀</span> ");

$('#zerkalce_venery').click(
  function(){
    add_smile('♀');
  }
);

$('#smiles').append("<span id=\"shit_marsa\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>♂</span> ");

$('#shit_marsa').click(
  function(){
    add_smile('♂');
  }
);

$('#smiles').append("<span id=\"solnyshko\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>☼</span> ");

$('#solnyshko').click(
  function(){
    add_smile('☼');
  }
);

$('#smiles').append("<span id=\"jakor\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>⚓</span> ");

$('#jakor').click(
  function(){
    add_smile('⚓');
  }
);

$('#smiles').append("<span id=\"zontik\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>☂</span> ");

$('#zontik').click(
  function(){
    add_smile('☂');
  }
);

$('#smiles').append("<span id=\"loshad\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>♞</span> ");

$('#loshad').click(
  function(){
    add_smile('♞');
  }
);

$('#smiles').append("<span id=\"serp_molot\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>☭</span> ");

$('#serp_molot').click(
  function(){
    add_smile('☭');
  }
);

$('#smiles').append("<span id=\"zvezda\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>★</span> ");

$('#zvezda').click(
  function(){
    add_smile('★');
  }
);

$('#smiles').append("<span id=\"sneginka\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>✱</span> ");

$('#sneginka').click(
  function(){
    add_smile('✱');
  }
);

$('#smiles').append("<span id=\"telefon\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>☎</span> ");

$('#telefon').click(
  function(){
    add_smile('☎');
  }
);

$('#smiles').append("<span id=\"sabli\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>⚔</span> ");

$('#sabli').click(
  function(){
    add_smile('⚔');
  }
);

$('#smiles').append("<span id=\"para\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>⚤</span> ");

$('#para').click(
  function(){
    add_smile('⚤');
  }
);

$('#smiles').append("<span id=\"nognici_1\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>✂</span> ");

$('#nognici_1').click(
  function(){
    add_smile('✂');
  }
);

$('#smiles').append("<span id=\"nognici_2\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>✄</span> ");

$('#nognici_2').click(
  function(){
    add_smile('✄');
  }
);

$('#smiles').append("<span id=\"cvetok\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>✿</span> ");

$('#cvetok').click(
  function(){
    add_smile('✿');
  }
);

$('#smiles').append("<span id=\"kofe\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>☕</span> ");

$('#kofe').click(
  function(){
    add_smile('☕');
  }
);

$('#smiles').append("<span id=\"korona\" style=\'margin-left: 1px; margin-right: 1px; cursor: pointer; font: bold 13pt arial\'>♛</span> ");

$('#korona').click(
  function(){
    add_smile('♛');
  }
);


$('#smiles').append("<img id=\"add_smile_female\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(sado)\" src=\"/messenger/images/smileys/../../../newsmiles/user_female.png\">");

$('#add_smile_female').click(
  function(){
    add_smile(' (f)');
  }
);

$('#smiles').append("<img id=\"add_smile_male\" style=\"cursor: pointer; margin:2px\"  height=\"14\" width=\"14\" alt=\"(sado)\" src=\"/messenger/images/smileys/../../../newsmiles/user_male.png\">");

$('#add_smile_male').click(
  function(){
    add_smile(' (m)');
  }
);


/***************************************************************************************************
Добавляем ссылку на добавление ника в строку сообщения
****************************************************************************************************/

function add_user_name(){

  // находим все div 
  var div_users_chat = $('div.cometchat_userlist')
  
  // перебераем массив и добавляем в дивы метку добавления ника в строку
  for(var i=0; i<div_users_chat.length; i++){
    var y = parseInt($("#"+div_users_chat[i]['id']).offset().top)+4
    var x = parseInt($("#"+div_users_chat[i]['id']).offset().left)+115
    $("#"+div_users_chat[i]['id']).append("<div class=\"username_add\" id=\"add_username\" style=\"position: absolute; left: "+x+"px; top: "+y+"px; height: 12px; width: 12px; border: solid 1px black; background-color: #F7EEB7; border-radius: 6px 6px 6px 6px; font: 8pt sherif; text-align: center; vertical-align: middle;\">☘</div>")  
  }
}

//$('#smiles').append("<div id=\"username_add\"></div>")

//$("#username_add").click(
//  alert('ok!');
//)

