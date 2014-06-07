// ==UserScript==
// @name          Hyperliner
// @namespace     fr.kergoz-panik.watilin
// @version       1.4
// @description   Fait clignoter le titre de la page pour se rappeler qu'il faut jouer
//
// @match         http://www.hyperliner.com/game
// @match         http://www.hyperliner.com/game/play?id=*
// @match         http://www.hyperliner.com/game/play/?id=*
//
// @author        Watilin
// @copyright     2013+, Watilin
// @license       Creative Commons by-nc-sa
// @homepage      http://kergoz-panik.fr/watilin/userscripts/hyperliner/
// @icon          http://kergoz-panik.fr/watilin/userscripts/hyperliner/icon.png
//
// @grant         GM_addStyle
// ==/UserScript==

// TODO:
// – changer la favicon pendant les alertes
// – envoyer des notifications de bureau (Webkit/Opera)
 
function play( ){
   const SECOND = 1000;
   const MINUTE = 60 * SECOND;
   
   var period = 2 * MINUTE;
   
   var blink;
   var unblink;
   var remind;
   
   (function( ){
      GM_addStyle(
         "#watilin-counter {\
            background: #3e1732;\
            border: solid thin #615470;\
            width: 185px;\
            padding: 1ex 1px;\
            margin: 0 0 20px 48px;\
            border-radius: 1px;\
         }\
         #watilin-counter h2 {\
            background-color: #70435a;\
            font-variant: small-caps;\
            text-transform: inherit;\
            line-height: 1.2em;\
            font-size: 9pt;\
            text-align: center;\
            border: none;\
            margin: 0 0 5px;\
         }\
         #watilin-counter p {\
            width: 90%;\
            margin: auto;\
         }\
         #watilin-bar {\
            width: 90%;\
            margin: 1px auto 1ex;\
            height: 1em;\
            border: solid thin #615470;\
            background: -webkit-linear-gradient(top,\
                  rgba(255, 255, 255, 0.2),\
                  rgba(255, 255, 255, 0) 60%),\
               -webkit-linear-gradient(left, #544462, #70435a);\
            background: -moz-linear-gradient(top,\
                  rgba(255, 255, 255, 0.2),\
                  rgba(255, 255, 255, 0) 60%),\
               -moz-linear-gradient(left, #544462, #70435a);\
            background: linear-gradient(top,\
                  rgba(255, 255, 255, 0.2),\
                  rgba(255, 255, 255, 0) 60%),\
               linear-gradient(left, #544462, #70435a);\
         }\
         #watilin-hide {\
             height: 100%;\
             width: 100%;\
             float: right;\
             box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.3);\
             background: #502848;\
         }\
         #watilin-counter input[type=number] {\
            border: solid thin #502848;\
            padding: 1px;\
            background: #280820;\
            color: white;\
            text-align: right;\
            margin-top: 2px;\
            border-radius: 3px;\
            width: 2.2em;\
         }\
         #watilin-counter input[type=number]:hover,\
         #watilin-counter input[type=number]:focus {\
            background: #502848;\
            border-color: #603858;\
         }\
         #shoutBox {\
            margin: 0 0 0 48px;\
            float: none;\
         }"
      );
      
      var $box = document.createElement("div");
      var $title = document.createElement("h2");
      var $pLeft = document.createElement("p");
      var $minutesLeft = document.createElement("strong");
      var $secondsLeft = document.createElement("strong");
      var $bar = document.createElement("div");
      var $hide = document.createElement("div");
      var $pPeriod = document.createElement("p");
      var $minutesInput = document.createElement("input");
      var $secondsInput = document.createElement("input");
      
      $box.appendChild($title);
      $title.appendChild(document.createTextNode("Prochain rappel"));
      
      $box.appendChild($pLeft);
      $pLeft.appendChild($minutesLeft);
      $pLeft.appendChild(document.createTextNode("m "));
      $pLeft.appendChild($secondsLeft);
      $pLeft.appendChild(document.createTextNode("s"));
      
      $box.appendChild($bar);
      $bar.id = "watilin-bar";
      $bar.appendChild($hide);
      $hide.id = "watilin-hide";
      
      $box.appendChild($pPeriod);
      $pPeriod.appendChild(document.createTextNode("Régler sur "));
      $pPeriod.appendChild($minutesInput);
      $pPeriod.appendChild(document.createTextNode("m "));
      $pPeriod.appendChild($secondsInput);
      $pPeriod.appendChild(document.createTextNode("s"));
      
      $minutesInput.type = "number";
      $minutesInput.setAttribute("min", "0");
      $minutesInput.setAttribute("max", "59");
      $minutesInput.value = period / MINUTE | 0;
      $secondsInput.type = "number";
      $secondsInput.setAttribute("min", "0");
      $secondsInput.setAttribute("max", "59");
      $secondsInput.value = (period / SECOND | 0) % 60;
      function setPeriod( ){
         var minutes = parseInt($minutesInput.value, 10) || 0;
         $minutesInput.value = minutes;
         var seconds = parseInt($secondsInput.value, 10) || 0;
         $secondsInput.value = seconds;
         period = minutes * MINUTE + seconds * SECOND;
         reset();
      }
      function deferSetPeriod( ){
         setTimeout(setPeriod, 200);
      }
      $minutesInput.addEventListener("change", setPeriod, false);
      $secondsInput.addEventListener("change", setPeriod, false);
      $minutesInput.addEventListener("keyup", deferSetPeriod, false);
      $secondsInput.addEventListener("keyup", deferSetPeriod, false);
      
      $box.id = "watilin-counter";
      document.addEventListener("DOMContentLoaded", function( ){
         var $right = document.getElementById("right");
         var $shoutBox = document.getElementById("shoutBox");
         if ($shoutBox) {
            $right.insertBefore($box, $shoutBox);
         } else {
            $right.appendChild($box);
         }
      }, false);
      
      var tickTimer;
      function startCounter( ){
         clearInterval(tickTimer);
         tickTimer = setInterval(tick, SECOND);
         $hide.style.width = "100%";
      }
      
      var remaining;
      function tick( ){
         remaining -= SECOND;
         if (remaining >= 0) {
            $minutesLeft.textContent = remaining / MINUTE | 0;
            $secondsLeft.textContent = (remaining / SECOND) % 60;
            $hide.style.width = 100 * remaining / period + "%";
         }
      }
      
      function clearCounter( ){
         clearInterval(tickTimer);
         $minutesLeft.textContent = period / MINUTE | 0;
         $secondsLeft.textContent = (period / SECOND) % 60;
         remaining = period;
      }
      
      var remindTimer;
      remind = function remind( ){
         clearTimeout(remindTimer);
         remindTimer = setTimeout(blink, period);
         clearCounter();
         setTimeout(startCounter, 0);
      };
   }());

   (function( ){
      var blinkTimer1;
      var blinkTimer2;
      var originalTitle = document.title;
      
      blink = function blink( ){
         unblink();
         function blink1( ){
            document.title = "Attention\xa0!";
            blinkTimer1 = setTimeout(blink2, 1000);
         }
         function blink2( ){
            document.title = originalTitle;
            blinkTimer2 = setTimeout(blink1, 1000);
         }
         blink1();
      }
      
      unblink = function unblink( ){
         clearTimeout(blinkTimer1);
         clearTimeout(blinkTimer2);
         document.title = originalTitle;
      }
   }());

   function reset( ){
      unblink();
      remind();
   }
   
   window.addEventListener("focus", reset, false);
   window.addEventListener("click", reset, false);
   setTimeout(reset, 0);
}

function game( ){
   var App = unsafeWindow.App;
   var _onRefreshGame = App.prototype.onRefreshGame;
   var originalTitle = document.title;
   App.prototype.onRefreshGame = function onRefreshGame( data ){
      if (data.indexOf("Retour en jeu") >= 0) {
         setInterval(function( ){
            document.title = "La partie a commencé";
            setTimeout(function( ){
               document.title = originalTitle;
            }, 1500);
         }, 3000);
      }
      _onRefreshGame.apply(this, arguments);
   };
}

switch (location.pathname) {
   case "/game":
      game();
      break;
   case "/game/play":
   case "/game/play/":
      play();
      break;
}