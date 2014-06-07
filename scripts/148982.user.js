// ==UserScript==
// @name        HISzilla Anfrage Helfer
// @namespace   hiszilla
// @description Hilft einen Bugreport oder Erweiterungswunsch mit den nötigen Daten zu füllen
// @include     https://hiszilla.his.de/hiszilla/enter_bug.cgi?product*
// @include     http://hiszilla.his.de/hiszilla/enter_bug.cgi?product*
// @include     https://hiszilla.his.de/bugzilla/enter_bug.cgi?product*
// @include     http://hiszilla.his.de/bugzilla/enter_bug.cgi?product*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @resource	klammer	http://9tw.de/ext_images/klammer.jpg
// @version     2.0
// ==/UserScript==

var supportText = 
//"Software (HiO, QIS, etc.): \n"+
//"Version: \n"+
"# Verwendete DB: (muster/demo?)\n"+
"# Verwendeter Browser und Version: \n"+
"# Account zum einloggen: \n"+
"# Verwendete Rolle: \n"+
"# Klickpfad zur Funktion: \n"+
"\n"+
"# Genaue Beschreibung des Problems:\n"+
"\n"+
"\n"+
"\n"+
"# Genaue Beschreibung der Anforderung:\n";

var bugreportText = 
//"Software (HiO, QIS, etc.): \n"+
//"Version: \n"+
"# Verwendete DB: (muster/demo?)\n"+
"# Verwendeter Browser und Version: \n"+
"# Account zum einloggen: \n"+
"# Verwendete Rolle: \n"+
"# Klickpfad zur Funktion: \n"+
"\n"+
"# Genaue Beschreibung des Problems:\n"+
"\n"+
"\n"+
"\n"+
"# Genaue Beschreibung der Anforderung:\n";



var extensionText = "# Art der Erweiterung (neue Anforderung oder Erweiterung?): \n"+
"\n"+
"\n"+
"# Klickpfad zur Funktion (falls schon vorhanden): \n"+
"\n"+
"\n"+
"# Genaue Beschreibung der Anforderung:\n"+
"\n"+
"\n"+
"# Grund/Motivation der Anforderung:\n"+
"\n"+
"\n"+
"# Beteiligte Akteure/ Rollen:\n"+
"\n"+
"\n"+
"# Fallbeispiele, Usecases:\n"+
"\n"+
"\n"+
"# Ansprechpartner für Rückfragen (wenn nicht Ticketersteller):\n";
var question = "";
//question += "<div id='tw_container' style='position:absolute; top:0px; bottom:0px;left:0px;right:0px;z-index: 90;' ><div style='top:0px; bottom:0px;left:0px;right:0px;background-color:#eee;  opacity:0.5; '></div><div id='tw_question' style='position:relative; top:100px;z-index: 95;width:450px; height:130px;;margin-left:auto;margin-right:auto; background-color:#eee;  border: solid 3px green; opacity:1.0; padding:10px;'>";
//question += "<strong>Hallo, ich helfe Ihnen alle für die Entwickler erforderlichen Informationen im Ticket zu erfassen.</strong>";


question += "<div id='tw_buttons' style='position:relative;top:0px; height:auto;z-index: 100; border:1px solid grey;'>";
question += "<img src='"+GM_getResourceURL("klammer")+"' style='float:left; width:50px; height:50px;' ></img>";
question += "<div style='display:inline; height:50px;'>";
question += "<strong>Hallo, ich kann dir helfen das Ticket mit benötigten Informationen zu füllen, indem ich Felder sinnvoll vorbelege. <br/> Was möchtest du tun?</strong><br/>";
question += "<input id='btn_bug'  type='button' value='Fehler berichten' />";
question += "<input id='btn_support'  type='button' value='Support erbeten' />";
question += "<input id='btn_ext'  type='button' value='Erweiterung vorschlagen' />";
//question += "<input id='btn_non'  type='button' value='Nichts von alledem' />";
question += "<div id='tw_msg'></div>";
question += "</div>";
question += "<div style'clear:both;'></div>";
question += "</div>";


//question += "</div></div>";

$("#bugzilla-body").prepend(question);

$("#btn_non").ready(function(){
    $("#btn_bug").click(bugClick);
    $("#btn_support").click(supportClick);
    $("#btn_ext").click(extensionClick);
    $("#btn_non").click(nonClick);
});


var bugClick = function(){
    hideMsg();
    //$("#tw_container").hide();
    $("#comment").val(bugreportText);
    $("select[name='bug_severity']").val('Mittelschwerer Fehler');
    $("input[name='short_desc']").val("Bug:");
    $("input[name='keywords']").val("");
};
var supportClick = function(){
    hideMsg();
    //$("#tw_container").hide();
    $("#comment").val(supportText);
    $("select[name='bug_severity']").val('Support-Anfrage');
    $("input[name='short_desc']").val("Support:");
    $("input[name='keywords']").val("");
};
var extensionClick = function(){
    hideMsg();
    //$("#tw_container").hide();
    $("#comment").val(extensionText);
    $("select[name='bug_severity']").val('Erweiterung');
    $("input[name='short_desc']").val("Task:");
    $("input[name='keywords']").val("Task");
    $("#tw_msg").append("<strong style='color:#cc0000'>Vergessen sie nicht den Aufwand zu schätzen!</strong>");
    $("#tw_msg").append(" <input value='0.0' maxlength='6' size='6' id='tw_estimated_time' name='tw_estimated_time' /> Stunden");
    $("#tw_estimated_time").keyup(function(){
            var val = $("#tw_estimated_time").val();
            $("input[name='estimated_time']").val(val);
        });
    //$("#tw_msg").append(" Stunden");
};

var hideMsg = function(){
    $("#tw_msg").html("");
}
var nonClick = function(){
    $("#tw_buttons").hide();
};

