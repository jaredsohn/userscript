// ==UserScript==
// @name        Aquatiquecity Club-C
// @namespace   Aquatiquecityclubc
// @description Script ajoutant quelques fonctionnalités sur Aquatiquecity, pour le club les Poissons d'Argents
// @include     http://www.aquatiquecity.net/index2.php*
// @include     http://www.aquatiquecity.net/jeu.php*
// @version     4
// @grant       none
// ==/UserScript==
  jQuery.ajaxSetup({ cache: true });
  
  jQuery.getScript("https://static.jappix.com/server/get.php?l=fr&t=js&g=mini.xml", function() {
     JappixMini.launch({
        connection: {
           domain: "anonymous.jappix.com",
        },

        application: {
           network: {
              autoconnect: false,
           },

           interface: {
              showpane: true,
              animate: false,
           },

           user: {
              random_nickname: false,
           },

           groupchat: {
              open: ["aquatiquecity@muc.jappix.com"],
           },
        },
     });
  });