// ==UserScript==
//
//
//         Entrez votre numéro de connexion (ex. e1234567)
//         puis votre mot de passe et cliquez "Enregistrer"
//
//         Codé par Thibaut Guénédal
//
//
// @name       ENT UBS: Connexion automatique
// @version    2.0
// @match      http://ent.univ-ubs.fr/uPortal/*
// @match      http://cas.univ-ubs.fr/login?service=https://ent.univ-ubs.fr/uPortal/Login
// @match      https://ent.univ-ubs.fr/uPortal/*
// @match      https://cas.univ-ubs.fr/login?service=https://ent.univ-ubs.fr/uPortal/Login
// @copyright  2012+, Thibaut Guénédal
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


//    GM_setValue("GM_username", "0");GM_setValue("GM_password", "0");alert(GM_getValue('GM_username'));
//    Debug line: enlever les // devant la ligne, enregistrer puis lancer la page ENT pour réinitialiser les infos de connexion.


var resetlink = "<a href=\"#\" id=\"linkreset\" style=\"\r\n  z-index:11;  margin-top: 13px;text-decoration: underline;\r\n    margin-left: 280px;display: block;width: 290px;\r\n\">(Plugin) R\u00E9initialiser les informations de connexion<\/a>";
    $("#portalPageBar").prepend(resetlink);
$("#portalWelcome").css( "z-index", "0" );


        $("#linkreset").click(function() {
      GM_setValue("GM_username", "0");
    GM_setValue("GM_password", "0");
     $('body').append('<meta http-equiv="refresh" content="0, url=https://cas.univ-ubs.fr/logout?service=https://ent.univ-ubs.fr/uPortal/Login"/>');            
 	});



var psets = GM_getValue("GM_username", "0");
if (psets != 0) {
if (window.location.href.match('cas.')) {

    if ($("#msg").length != 0) {
      GM_setValue("GM_username", "0");
    GM_setValue("GM_password", "0");
     $('body').append('<meta http-equiv="refresh" content="0, url=https://ent.univ-ubs.fr/uPortal/render.userLayoutRootNode.uP"/>');
    } // msg exists
        if ($("#msg").length == 0) {


    var us = GM_getValue("GM_username", "0");
    var ps = GM_getValue("GM_password", "0");
$("#username").attr( "value", us );
$("#password").attr( "value", ps );
    
    $("input[name='submit']").attr( "name", "nem" );
    $("#fm1").submit();
    } // msg doesnt exist
} // end CAS

if (!window.location.href.match('cas.')) {
    
    if ($("#portalPageBarLogin").length) {

 $('body').append('<meta http-equiv="refresh" content="0, url=https://cas.univ-ubs.fr/login?service=https://ent.univ-ubs.fr/uPortal/Login"/>');

    }
      
if ($("#portalPageBarLogin").length == 0) {
    
    var stuff = "<a id=\"edtlink\" href=\"https:\/\/ent.univ-ubs.fr\/uPortal\/render.userLayoutRootNode.uP?uP_sparam=activeTab&amp;activeTab=2&amp;uP_root=u9l1n50\" style=\"\r\n   display:none; opacity: 0.9; position: absolute;\r\n    z-index: 3000;\r\n    right: 40px;\r\n    top: 10px;\r\n\"><img src=\"http:\/\/i.imgur.com\/TYzK36i.png\"><\/a>"
    
    $("#portalPageHeaderInner").append(stuff);
    $("#edtlink").fadeIn(1000);
    $("#edtlink")
  .mouseover(function() {
    $("#edtlink").animate({
    opacity: 1,
    right: "43px",
        top: "9px"
       
  }, 200 );
  })
  .mouseout(function() {
      $("#edtlink").animate({
    opacity: 0.9,
    right: "40px",
          top: "10px"
  }, 50 );
  });
    
    
} //endif

} // end ENT
} // if settings

else {

// old panel    var settings_panel = "<div id=\"panel\" style=\"position:absolute;height:100%;width:100%;background-color: rgb(33, 43, 44);top: 0;z-index: 4000;text-align: center;\"><div id=\"under_panel\" style=\"margin-top: 255px; margin-bottom: 100px;\"><input style=\"\r\n    height: 24px;\r\n    width: 80px;\r\n    font-size: 18px;\r\n    color: rgb(69, 69, 90);\r\n    padding: 0px 5px 0px 5px;\r\n\" type=\"text\" id=\"usern\"><br>\r\n<input style=\"\r\n    height: 24px;\r\n    width: 80px;\r\n    font-size: 15px;\r\n    color: rgb(69, 69, 90);\r\n    padding: 0px 5px 0px 5px;\r\n    margin-top: 0px;\r\n    margin-left: 4px;\r\n\" type=\"password\" id=\"passw\">\r\n<br>\r\n<button value=\"Enregistrer\" id=\"settings_button\" style=\"\r\n    height: 28px;  \r\n    width: 105px;  \r\n    font-size: 18px;  \r\n    color: rgb(230, 230, 230);  \r\n    padding: 0px 5px 5px 5px;\r\n    margin-top: -3px;\r\n    background-color: rgb(84, 100, 180);\r\n    border: solid rgb(62, 78, 107) 2px;\r\n    cursor: pointer;\r\n\">Enregistrer<\/button><\/div>\r\n<\/div>"; 
    var settings_panel = "<div id=\"theater\">\r\n  <div id=\"background\" style=\"position: absolute;\r\nheight: 100%;\r\nwidth: 100%;\r\nbackground-color: rgba(0, 0, 0, 0.67);\r\ntop: 0;\r\nz-index: 4000;\r\ntext-align: center;\r\n                       box-shadow: inset 0 0 100px #000000;-moz-box-shadow: inset 0 0 100px #000000;\"><\/div>\r\n<div id=\"noise\" style=\"position: absolute;\r\nheight: 100%;\r\nwidth: 100%;\r\nbackground-image: url(http:\/\/img.ffffound.com\/static-data\/assets\/6\/2f3e5d15c7479b825cf5d647f782ee1042c13ca1_m.gif);\r\ntop: 0;\r\nz-index: 4000;\r\ntext-align: center;\r\n                       opacity: 0.04;\"><\/div><div id=\"panel\" style=\"position:absolute;height:100%;width: 277px;top: 0;z-index: 4000;text-align: center;                                            left:0;          right:0;                    margin: auto;\"><div id=\"under_panel\" style=\"margin-top: 255px; margin-bottom: 100px;position: relative;background-color: rgb(78, 78, 78);padding: 20px;-moz-border-radius: 15px;  border-radius: 10px;box-shadow: 0px 0px 30px #363636, 0px 0px 12px #000000, inset 0px 0px 25px #3D3D3D;\"><div style=\"\r\n    display: inline;\r\n    color: white;\r\n    font-size: 18px;\r\n    font-family: helvetica;\r\n    margin-left: 26px;\r\n    text-shadow: 0 0 5px rgb(29, 29, 29);\r\n\">Identifiant: <input style=\"\r\n    height: 24px;\r\n    width: 80px;\r\n    font-size: 18px;\r\n    color: rgb(69, 69, 90);\r\n    padding: 0px 5px 0px 5px;\r\n                   \r\n    margin-left: 5px;\r\n\" type=\"text\" id=\"usern\"><\/div><br><br>\r\n<div style=\"\r\n    display: inline;  color: white;  \r\n    font-size: 18px;  font-family: helvetica;\r\n    text-shadow: 0 0 5px rgb(36, 36, 36);\r\n\">Mot de passe:<input style=\"\r\n    height: 24px;\r\n    width: 80px;\r\n    font-size: 15px;\r\n    color: rgb(69, 69, 90);\r\n    padding: 0px 5px 0px 5px;\r\n    margin-top: 0px;\r\n    margin-left: 9px;\r\n                   \" type=\"password\" id=\"passw\"><\/div>\r\n<br><br>\r\n<button value=\"Enregistrer\" id=\"settings_button\" style=\"\r\n    height: 28px;  \r\n    width: 105px;  \r\n    font-size: 18px;  \r\n    color: rgb(255, 255, 255);  \r\n    padding: 0px 5px 5px 5px;\r\n    margin-top: 3px;\r\n    background-color: rgb(39, 92, 117);\r\n    border: solid rgb(211, 211, 211) 2px;\r\n    cursor: pointer;\r\n                                                        \r\n    text-align: right;\r\n\">Enregistrer<\/button><\/div><\/div>\r\n\r\n\r\n\r\n<\/div>";
    $("body").append(settings_panel);
  
         $("#settings_button").click(function(){
    var usern = $("#usern").val();
    var passw = $("#passw").val();
    GM_setValue("GM_username", usern);
    GM_setValue("GM_password", passw);
    window.location.reload();
    });
   
} //end else