// Neopets - All Site Themes
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name          Neopets - All Site Themes
// @namespace     http://userscripts.org/users/22349
// @description   V 1.05 Gives you the ability to change the site theme you use to view Neopets.com
// @include       http://neopets.com/*
// @include       http://www.neopets.com/*
// @version       1.05
// @updated       2009.04.30
// ==/UserScript==
//
// This script doesn't unlock any of the site themes.  It only changes the theme you see.
// You can change your theme by going to your preferences (http://www.neopets.com/preferences.phtml) and changing it there.
// As soon as you pick a theme, it will change immediately so feel free to surf Neopets with your new theme.
// There's no need to press 'Change Your Details'.  If you press the button, either by accident or because you're
// changing one of the other site preferences, don't worry.  Neopets will only think that you've changed your site
// theme to 'Neopets Basic'.
//
(function(){

  function changetheme(){
    var mytheme = GM_getValue('site_theme', '004_bir_a2e60');

    for (var x = 0, linkset; linkset = document.getElementsByTagName('link')[x]; x++){
      if (linkset.href.match('themes')){
        var oldtheme = linkset.href.match(/\/themes\/(\w+)\.css/)[1];
        linkset.href = linkset.href.replace(oldtheme, mytheme);
        for (var y = 0, image; image = document.getElementById('template_nav').getElementsByTagName('img')[y]; y++){
          if (image.src.match(oldtheme)){
            image.src = image.src.replace(oldtheme, mytheme);
          }
        }
        for (var y = 0, image; image = document.getElementById('footer').getElementsByTagName('img')[y]; y++){
          if (image.src.match(oldtheme)){
            image.src = image.src.replace(oldtheme, mytheme);
          }
        }
        break;
      }
    }
  }
  
  changetheme();

  if (document.location.href.match('neopets.com/preferences.phtml')){
    var changethis = document.getElementsByName('user_theme')[0];
    changethis.innerHTML = '\
<option id="010_acp_6ffcb" value="0">Altador Cup</option>\
<option id="011_alc_c1d1c" value="0">Altadorian Constellations</option>\
<option id="008_com_e529a" value="0">Curse of Maraqua</option>\
<option id="012_tcg_d977a" value="0">Cyodrakes Gaze</option>\
<option id="023_dyd_c470b" value="0">Daily Dare</option>\
<option id="004_bir_a2e60" value="0">Happy Birthday</option>\
<option id="003_hws_9bde9" value="0">Haunted Woods</option>\
<option id="000_def_f65b1" value="0">Neopets Basic</option>\
<option id="016_blu_e56fc" value="0">Neopets Blue</option>\
<option id="017_grn_f0c1a" value="0">Neopets Green</option>\
<option id="018_prpl_f65b1" value="0">Neopets Purple</option>\
<option id="015_red_062bf" value="0">Neopets Red</option>\
<option id="014_yel_d187b" value="0">Neopets Yellow</option>\
<option id="020_ppl_3c22d" value="0">Petpet Protection League</option>\
<option id="021_cpa_5ce03" value="0">Puzzle Adventure</option>\
<option id="009_qas_93707" value="0">Qasalan</option>\
<option id="022_lqc_d2d1a" value="0">Quizara\'s Curse</option>\
<option id="007_sfp_273a8" value="0">Space Faerie Premium</option>\
<option id="013_tow_4b54b" value="0">Tale of Woe</option>\
<option id="019_sloth1_7f914" value="0">The Return of Dr. Sloth</option>\
<option id="006_val_d85a0" value="0">Valentines Day</option>\
<option id="005_win_57061" value="0">Winter Holiday</option>';
    changethis.parentNode.parentNode.firstChild.firstChild.nextSibling.innerHTML = 'Theme <font color="red">(All Site Themes - Enabled)</font>';
    document.getElementById(GM_getValue('site_theme', '004_bir_a2e60')).selected = true;

    document.getElementsByName('user_theme')[0].addEventListener('change',function(){
      newtheme = document.getElementsByName('user_theme')[0];
      GM_setValue('site_theme', newtheme.options[newtheme.selectedIndex].id);
      changetheme();
    }, false);
  }

})();