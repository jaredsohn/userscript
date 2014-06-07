// The West Emoticons
// version 1.0 beta
// Copyright (C) 2010 Johnny
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------

// ==UserScript==
// @name           The West Emoticons
// @namespace      Johnny
// @description    The West Emoticons
// @include        http://*.the-west.*/game.php*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @include        http://*.the-west.*/forum.php*
// @include        http://zz1w1.tw.innogames.net/forum.php*
// @include		   http://w1.public.beta.the-west.net/game.php#
// ==/UserScript==
      
      // ======== Variables globales del juego ========
      
      // http://s03.radikal.ru/i176/0909/6a/4138ab37110a.png - fort
      // http://i064.radikal.ru/0909/ce/7988d649bac4.png  -del
      
      var TW_Use_Cache  = true;
      var TW_Image_Base = "/graphic/";
      var TW_World      = null;
      var TWT_World     = null;
      var TW_Domain     = null;
      var TW_DotWhat    = null;
      var TW_Hash       = null;
      var TW_Screen     = null;
      var TW_Mode       = null;
      var TW_Is_Premium = false;
      var TW_Quickbar   = null;
      var TW_Village_Id = null;
      var TW_Player_Id  = null;
      var TW_Villages   = null;
      var TW_Lang       = null;
      var TW_Mpt        = null;
      var TW_Is_Opera   = window.opera ? true : false;
      
      
      // ======== Hagamos los cambios ========
      
      (function(){

         if (location.href.match( /forum\.php/ )) {
            CambiaForo();
            return;
         }

         if (location.href.match( /messages/ )) {
            CambiaCuadroTexto();
            //return;
         }

      })();

      function CambiaForo() {
         
         var adframes = $$("iframe");
         for (i = 0; i &lt; adframes.length; i++) {
            adframes[i].src = 'about:blank';
         }
         var posts = $$("div");
         for (i = 0; i &lt; posts.length; i++) {
            if (posts[i].innerHTML.match(/&lt;iframe/,"gi") != null) {
               posts[i].style.display = "none";
            }
         }
         
         CambiaCuadroTexto();
      }
      
      function CambiaCuadroTexto() {
      
         var body = $$("body");
      
         var random = new Date;
         random = random.getTime();
      
         var xhtml = "&lt;table class='bbcodearea'&gt; " +
                "&lt;tr&gt;    " +
          '   &lt;td&gt;|&lt;/td&gt;' + 
                '   &lt;td&gt;&lt;a tabindex="10" href="javascript:insertBB(\'player\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/player.png" alt="Player" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                '   &lt;td&gt;&lt;a tabindex="11" href="javascript:insertBB(\'town\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/city.png" alt="Town" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                  '   &lt;td&gt;&lt;a tabindex="12" href="javascript:insertBB(\'fort\','+random+');"&gt;&lt;img src="http://s03.radikal.ru/i176/0909/6a/4138ab37110a.png" alt="Fort" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;|&lt;/td&gt;'+
                '   &lt;td&gt;&lt;a tabindex="13" href="javascript:insertBB(\'b\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/b.png" alt="Bold" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                '   &lt;td&gt;&lt;a tabindex="14" href="javascript:insertBB(\'i\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/i.png" alt="Cursive" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                '   &lt;td&gt;&lt;a tabindex="15" href="javascript:insertBB(\'u\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/u.png" alt="Podciarknute" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                 '   &lt;td&gt;&lt;a tabindex="16" href="javascript:insertBB(\'del\','+random+');"&gt;&lt;img src="http://i064.radikal.ru/0909/ce/7988d649bac4.png" alt="Del" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                '   &lt;td&gt;|&lt;/td&gt;' +
                '   &lt;td&gt;&lt;a tabindex="17" href="javascript:insertBB(\'quote\','+random+');"&gt;&lt;img src="http://www.offthemap.com/images/site/blockquote.jpg" alt="Cita" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                '   &lt;td&gt;&lt;a tabindex="18" href="javascript:insertBB(\'url\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/url.png" alt="URL" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                '   &lt;td&gt;&lt;a tabindex="19" href="javascript:insertBB(\'img\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/img.png" alt="Imagen" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;|&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="20" href="javascript:insertBB(\'large text\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/icons/icon14.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="21" href="javascript:insertBB(\'small_text\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/icons/icon13.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +


'   &lt;td&gt;&lt;a tabindex="25" href="javascript:insertBB(\'code\','+random+');"&gt;&lt;img src="http://s02.radikal.ru/i175/0909/bb/d4cca2872746.jpg" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          
          
          
          
          '   &lt;td&gt;|&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="26" href="javascript:insertBB(\'white text\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/white.png" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="27" href="javascript:insertBB(\'black text\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/black.png" /&gt;&lt;/a&gt;&lt;/td&gt;' +   
          '   &lt;td&gt;&lt;a tabindex="28" href="javascript:insertBB(\'red text\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/red.png" /&gt;&lt;/a&gt;&lt;/td&gt;' +   
          '   &lt;td&gt;&lt;a tabindex="29" href="javascript:insertBB(\'yellow text\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/yellow.png" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="30" href="javascript:insertBB(\'green text\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/green.png" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="31" href="javascript:insertBB(\'cyan text\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/cyan.png" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="32" href="javascript:insertBB(\'blue text\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/blue.png" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="33" href="javascript:insertBB(\'violet text\','+random+');"&gt;&lt;img src="http://yad.wz.cz/ext/t-w/violet.png" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;|&lt;/td&gt;' +
                "&lt;/tr&gt;   " +
          '   &lt;td&gt;|&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="34" href="javascript:insertBB(\'smily lol\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_lol.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="35" href="javascript:insertBB(\'smily smile\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/smile.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="36" href="javascript:insertBB(\'smily idea\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_idea.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="37" href="javascript:insertBB(\'smily wink\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_wink.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="38" href="javascript:insertBB(\'smily evil\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_evil.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="39" href="javascript:insertBB(\'smily twisted\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_twisted.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="40" href="javascript:insertBB(\'smily eek\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_eek.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="41" href="javascript:insertBB(\'smily surprised\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_surprised.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="42" href="javascript:insertBB(\'smily cry\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cry.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="43" href="javascript:insertBB(\'smily smile2\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_smile.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="44" href="javascript:insertBB(\'smily cool\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_cool.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="45" href="javascript:insertBB(\'smily sad\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_sad.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="46" href="javascript:insertBB(\'smily confused\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_confused.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="47" href="javascript:insertBB(\'smily rolleyes\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_rolleyes.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="48" href="javascript:insertBB(\'smily briggin\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_biggrin.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="49" href="javascript:insertBB(\'smily redface\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_redface.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="50" href="javascript:insertBB(\'smily razz\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_razz.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="51" href="javascript:insertBB(\'smily neutral\','+random+');"&gt;&lt;img src="http://forum.tribalwars.net/images/smilies/phpbb_smilies/icon_neutral.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;|&lt;/td&gt;' +
          "&lt;/tr&gt;   " +
                "&lt;/table&gt;";
      
         document.body.innerHTML = document.body.innerHTML.replace( /&lt;textarea\s/gi, xhtml+"&lt;textarea id=\"txt_"+random+"\" ");
         
         NuevaFuncionTW("insertBB", function(insertType, ident){
      
               txt = document.getElementById("txt_"+ident);
      
               var start = txt.selectionStart;
               var end   = txt.selectionEnd;
               var txtlength = 0;
               var insertButton = '';
               var txtinsertBefore = '';
               var txtinsertAfter = '';
               var selection = '';
               var selectionBefore = '';
               var selectionAfter = '';
      
               switch (insertType) {
                  case 'player':
                     txtinsertBefore = "[player]";
                     txtinsertAfter = "[/player]";
                     insertButton = 'P';
                     break;
                     
                     
                     
                  case 'town':
                     txtinsertBefore = "[town]";
                     txtinsertAfter = "[/town]";
                     insertButton = 'A';
                     break;
             case 'fort':
                     txtinsertBefore = "[fort]";
                     txtinsertAfter = "[/fort]";
                     insertButton = 'F';
                     break;
                  case 'b':
                     txtinsertBefore = "[b]";
                     txtinsertAfter = "[/b]";
                     insertButton = 'B';
                     break;
                  case 'i':
                     txtinsertBefore = "[i]";
                     txtinsertAfter = "[/i]";
                     insertButton = 'I';
                     break;
                  case 'u':
                     txtinsertBefore = "[u]";
                     txtinsertAfter = "[/u]";
                     insertButton = 'U';
                     break;
                  case 'del':
                     txtinsertBefore = "[del]";
                     txtinsertAfter = "[/del]";
                     insertButton = 'del';
                     break;
                  case 'quote':
                     txtinsertBefore = "[quote]";
                     txtinsertAfter = "[/quote]";
                     insertButton = 'Q';
                     break;
                  case 'url':
                     txtinsertBefore = "[url]";
                     txtinsertAfter = "[/url]";
                     insertButton = 'L';
                     break;
                  case 'img':
                     txtinsertBefore = "[img]";
                     txtinsertAfter = "[/img]";
                     insertButton = 'M';
                     break;
            case 'large text':
                     txtinsertBefore = "[size=20]";
                     txtinsertAfter = "[/size]";
                     insertButton = 'R';
                     break;
            case 'small_text':
                     txtinsertBefore = "[size=8]";
                     txtinsertAfter = "[/size]";
                     insertButton = 'Small';
                     break;
                  
                     case 'code':
                     txtinsertBefore = " [b][CODE][/b] [code]";
                     txtinsertAfter = "[/code]";
                     insertButton = 'code';
                     break;
                     
                     
                     
            case 'smily lol':
                     txtinsertBefore = "[img]http://shareimage.ro/images/dxhv72frj3f1in1ydd.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '1';
                     break;
            case 'smily smile':
                     txtinsertBefore = "[img]http://shareimage.ro/images/qy43x24l9q7t38iuxbwt.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '2';
                     break;
            case 'smily idea':
                     txtinsertBefore = "[img]http://shareimage.ro/images/hvi7vvxc338aif5jjfpt.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '3';
                     break;
                                case 'smily wink':
                     txtinsertBefore = "[img]http://shareimage.ro/images/7jpspzidn5scue8il6b.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '4';
                     break;
            case 'smily evil':
                     txtinsertBefore = "[img]http://shareimage.ro/images/9j7xycbn4pnei6k807f.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '5';
                     break;
            case 'smily twisted':
                     txtinsertBefore = "[img]http://shareimage.ro/images/r91z8vl2m0u5cql0gnuc.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '6';
                     break;
                                case 'smily eek':
                     txtinsertBefore = "[img]http://shareimage.ro/images/zg3nuerhi4fxqr7vppib.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '7';
                     break;
            case 'smily surprised':
                     txtinsertBefore = "[img]http://shareimage.ro/images/y4153s3n4axnfb6pxfvy.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '8';
                     break;
            case 'smily cry':
                     txtinsertBefore = "[img]http://shareimage.ro/images/9o2r9s7bzt4h70o4s1fk.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '9';
                     break;
            case 'smily smile2':
                     txtinsertBefore = "[img]http://shareimage.ro/images/aca8qv1f94jtkingwla1.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '10';
                     break;
            case 'smily cool':
                     txtinsertBefore = "[img]http://shareimage.ro/images/med0k8pui2riqei6s.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '11';
                     break;
            case 'smily sad':
                     txtinsertBefore = "[img]http://shareimage.ro/images/9rz2lhpqvt8lu9jcl3hr.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '12';
                     break;
            case 'smily confused':
                     txtinsertBefore = "[img]http://shareimage.ro/images/25jx6z7q7u0gcizg7k.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '13';
                     break;
            case 'smily rolleyes':
                     txtinsertBefore = "[img]http://shareimage.ro/images/zgacqdgpyq9pza79o0r.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '14';
                     break;
            case 'smily briggin':
                     txtinsertBefore = "[img]http://shareimage.ro/images/t9vc4zvacv7hhrwj3fxo.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '15';
                     break;
            case 'smily redface':
                     txtinsertBefore = "[img]http://shareimage.ro/images/kr3ft4wekip16z9tgr2i.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '16';
                     break;
            case 'smily razz':
                     txtinsertBefore = "[img]http://shareimage.ro/images/ri0ne9jai17mwu4tlk4.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '17';
                     break;
            case 'smily neutral':
                     txtinsertBefore = "[img]http://shareimage.ro/images/b757x7bnd8q9l2iqox.gif";
                     txtinsertAfter = "[/img]";
                     insertButton = '18';
                     break;
            case 'black text':
                     txtinsertBefore = "[color=black]";
                     txtinsertAfter = "[/color]";
                     insertButton = '31';
                     break;
            case 'white text':
                     txtinsertBefore = "[color=white]";
                     txtinsertAfter = "[/color]";
                     insertButton = '32';
                     break;
            case 'red text':
                     txtinsertBefore = "[color=red]";
                     txtinsertAfter = "[/color]";
                     insertButton = '33';
                     break;
            case 'yellow text':
                     txtinsertBefore = "[color=yellow]";
                     txtinsertAfter = "[/color]";
                     insertButton = '34';
                     break;
            case 'green text':
                     txtinsertBefore = "[color=green]";
                     txtinsertAfter = "[/color]";
                     insertButton = '35';
                     break;
            case 'cyan text':
                     txtinsertBefore = "[color=cyan]";
                     txtinsertAfter = "[/color]";
                     insertButton = '36';
                     break;
            case 'blue text':
                     txtinsertBefore = "[color=blue]";
                     txtinsertAfter = "[/color]";
                     insertButton = '37';
                     break;
            case 'violet text':
                     txtinsertBefore = "[color=violet]";
                     txtinsertAfter = "[/color]";
                     insertButton = '38';
                     break;
               }
      
               if (start == end) {
                     txt.value = txt.value.substr(0, start) + txtinsertBefore + txtinsertAfter + txt.value.substr(end, txt.value.length);
                  } else {
                     txtlength = txt.value.length;
                     selection = txt.value.substr(start, (end - start));
                     selectionBefore = txt.value.substr(0, start);
                     selectionAfter = txt.value.substr(end, txtlength);
      
                     if (insertButton == 'V' &amp;&amp; selection.match(/(\d+){3}([\/|]+){1}(\d+){3}/gi)) {
                        selection = selection.replace(/(.*)(\d+)(\d+)(\d+)([\/|]+){1}(\d+)(\d+)(\d+)(.*)/gi, "$2$3$4|$6$7$8");
                     }
      
                     txt.value = selectionBefore + txtinsertBefore + selection + txtinsertAfter + selectionAfter;
                     
                  }
            });
      
         
      }  
      
      
      // ======== Funciones necesarias ========
      
      // Atajos DOM
      function $(elm_id){
         return document.getElementById(elm_id);
      }
      
      function $$(tag_name){
         return document.getElementsByTagName(tag_name);
      }  
      
      function NuevaFuncionTW(func, new_func){
      
       if(typeof unsafeWindow == "object"){
            unsafeWindow[func] = new_func;
         }else if(TW_Is_Opera){
            window[func] = new_func;
            /*
            window.opera.defineMagicFunction(
               func,
               function(oRealFunc, oThis, oParam1, oParam2){
                  return oParam1.getElementById('oParam2').style;
               }
            );
            */
         /////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_84', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_84', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=84&version=1.0';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();