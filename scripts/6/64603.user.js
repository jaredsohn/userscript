<?xml version="1.0"?>
<html>
  <head>
    <title>AdminScriptEditor Script Conversion</title>
    <style>
		.Plain\000020Text-DefaultStyle { }
</style>
  </head>
  <body>
    <pre>
<span class="Plain&#x0020;Text-DefaultStyle">// ==UserScript==
// @name          West Smajlíci
// @namespace     Johnny
// @description   Best bb codes for the forum.
// @include       http://zz1w1.tw.innogames.net/game.php*
// @include		  http://w1.public.beta.the-west.net/game.php*
// @include       http://*.tw.ignames.net/game.php*
// ==/UserScript==
      
      // ======== Variables globales del juego ========
            
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
                    '   &lt;td&gt;&lt;a tabindex="1" href="javascript:insertBB(\'smajlik\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/character0176.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="2" href="javascript:insertBB(\'haha\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/laugh1.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="3" href="javascript:insertBB(\'velky usmev\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/biggrin2.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="4" href="javascript:insertBB(\'smutny\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/sad1.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="5" href="javascript:insertBB(\'zmurk\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/wink1.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="6" href="javascript:insertBB(\'ako to\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/blink.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="7" href="javascript:insertBB(\'zavrete oci\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/closedeyes.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="8" href="javascript:insertBB(\'nahnevany\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/mad2.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="9" href="javascript:insertBB(\'jazyk\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/tongue2.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="10" href="javascript:insertBB(\'indian\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/tongue1.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="11" href="javascript:insertBB(\'vyplazeny jazyk\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/186_indian.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="12" href="javascript:insertBB(\'ehmehm\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/dry.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
                    '   &lt;td&gt;&lt;a tabindex="13" href="javascript:insertBB(\'ee zmurk\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/nowink.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="14" href="javascript:insertBB(\'kukam\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/mellow.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="15" href="javascript:insertBB(\'to je teda\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/rolleyes1.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="16" href="javascript:insertBB(\'ninja west\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/ph34r.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="17" href="javascript:insertBB(\'omg\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/ohmy.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="18" href="javascript:insertBB(\'neisty\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/unsure.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
          '   &lt;td&gt;&lt;a tabindex="19" href="javascript:insertBB(\'uplne paf\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/wacko.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="20" href="javascript:insertBB(\'aha ok\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/wub.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="21" href="javascript:insertBB(\'hanbim sa\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/blush.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="22" href="javascript:insertBB(\'stastny\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/happy1.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="23" href="javascript:insertBB(\'huh\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/huh1.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="24" href="javascript:insertBB(\'howgh\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/Laie_612.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="25" href="javascript:insertBB(\'xmas1\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/biggrinx.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="26" href="javascript:insertBB(\'xmas2\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/confusedx.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="27" href="javascript:insertBB(\'xmas3\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/coolx.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="28" href="javascript:insertBB(\'xmas4\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/eekx.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="29" href="javascript:insertBB(\'xmas5\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/frownx.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="30" href="javascript:insertBB(\'xmas6\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/madx.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="31" href="javascript:insertBB(\'xmas7\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/redfacex.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="32" href="javascript:insertBB(\'xmas8\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/rolleyesx.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="33" href="javascript:insertBB(\'xmas9\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/smilex.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
		'   &lt;td&gt;&lt;a tabindex="34" href="javascript:insertBB(\'xmas10\','+random+');"&gt;&lt;img src="http://www.west-smajlici.wz.cz/winkx.gif" /&gt;&lt;/a&gt;&lt;/td&gt;' +
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
         }
      }</span></pre>
  </body>
</html>