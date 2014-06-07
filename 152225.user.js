// ==UserScript==
// @name           Autologare TMD (eu|me|com)
// @description    Autologare pe http://torrentsmd.*/*
// @author         Godina Nicolae
// @include        http://*torrentsmd.*
// @include        http://*torrentsmoldova.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/152225.user.js
// @version        1.0
// ==/UserScript==

jQuery(document).ready(function($) {
    // Setam login si parola cu care se v-a loga
    var login = "", // USERNAME
        pass  = ""; // PASSWORD

    if (login == "" || pass == "") {
      alert("TMD Logger: Editati userscript-ul introducind datele pentru logare :)");
    } else {
      // Verificam daca deja nu este logat
      if ($('#login_form').length != 0) {
        // Ne logam
        $.post("takelogin.php", { username: login, password: pass },
          // Reinoim pagina 
          function(data) { location.reload(); }
        );
      }
    }
});