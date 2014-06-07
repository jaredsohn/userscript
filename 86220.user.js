// ==UserScript==
// @name           Kapi Hospital Berater
// @date           20.02.2013
// @version        2.4.4.1.03
// @include        http://*kapihospital.com/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

window.addEventListener("load", function () {

// Special Characters - DE
    var ae = "\u00E4";
    var oe = "\u00F6";
    var ue = "\u00FC";
    var Ae = "\u00C4";
    var Oe = "\u00D6";
    var Ue = "\u00DC";
    var sz = "\u00DF";

// Special Characters - PL
    var a_pl = "\u0105";    // ą
    var c_pl = "\u0107";    // ć
    var e_pl = "\u0119";    // ę
    var l_pl = "\u0142";    // ł
    var n_pl = "\u0144";    // ń
    var o_pl = "\u00F3";    // ó
    var s_pl = "\u015B";    // ś
    var z_pl = "\u017C";    // ź
    var x_pl = "\u017A";    // ż

// Special Characters - CZ
    var a_cz = "\u00E1";    // á
    var c_cz = "\u010D";    // č
    var d_cz = "\u010F";    // ď
    var e_cz = "\u00E9";    // é
    var i_cz = "\u00ED";    // í
    var o_cz = "\u00F3";    // ó
    var r_cz = "\u0159";    // ř
    var s_cz = "\u0161";    // š
    var t_cz = "\u0165";    // ť
    var u_cz = "\u00FA";    // ú
    var y_cz = "\u00FD";    // ý
    var z_cz = "\u017E";    // ž
    var e2_cz = "\u011B";   // ě
    var u2_cz = "\u016F";   // ů
    var u3_cz = "\u00DA";   // Ú

// global definitions
    var texte = new Object();
    var gamepages = new Object();
    var medi = new Object();

    if (document.location.href.search("de.kapihospital.com") != -1) {
        var lng = "de";
        var gamepage = ".de.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.de\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("uk.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".uk.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.uk\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("nl.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".nl.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.nl\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("fr.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".fr.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.fr\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("tr.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".tr.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.tr\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;

    }
    if (document.location.href.search("bg.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".bg.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.bg\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("es.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".es.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.es\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("pl.kapihospital.com") != -1) {
        var lng = "pl";
        var gamepage = ".pl.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.pl\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("ro.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".ro.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.ro\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("ru.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".ru.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.ru\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("cz.kapihospital.com") != -1) {
        var lng = "cz";
        var gamepage = ".cz.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.cz\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("se.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".se.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.se\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("pt.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".pt.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.pt\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("hu.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".hu.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.hu\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("gr.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".gr.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.gr\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("us.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".us.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.us\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("it.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".it.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.it\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("dk.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".dk.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.dk\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("br.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".br.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.br\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("ir.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".ir.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.ir\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("no.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".no.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.no\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    if (document.location.href.search("ae.kapihospital.com") != -1) {
        var lng = "uk";
        var gamepage = ".ae.kapihospital.com";
        var reg = /http:\/\/s(\d+)\.ae\.kapihospital\.com\/(.*?)\.php(.*)/i;
        var reg2 = /http:\/\/(s\d+\.|www\.|)kapihospital\.com\/(.*)/i;
        var delimThou = ".";
        var regDelimThou = /\./g;
        var delimDeci = ",";
        var regDelimDeci = /,/;
    }

    loadLanguage(lng);
    var gamepages = new Object();
    gamepages["de"] = "http://www.de.kapihospital.com";
    gamepages["uk"] = "http://www.uk.kapihospital.com/";
    gamepages["fr"] = "http://www.fr.kapihospital.com/";
    gamepages["nl"] = "http://www.nl.kapihospital.com/";
    gamepages["tr"] = "http://www.tr.kapihospital.com/";
    gamepages["bg"] = "http://www.bg.kapihospital.com/";
    gamepages["es"] = "http://www.es.kapihospital.com/";
    gamepages["pl"] = "http://www.pl.kapihospital.com/";
    gamepages["ro"] = "http://www.ro.kapihospital.com/";
    gamepages["ru"] = "http://www.ru.kapihospital.com/";
    gamepages["cz"] = "http://www.cz.kapihospital.com/";
    gamepages["se"] = "http://www.se.kapihospital.com/";
    gamepages["pt"] = "http://www.pt.kapihospital.com/";
    gamepages["hu"] = "http://www.hu.kapihospital.com/";
    gamepages["gr"] = "http://www.gr.kapihospital.com/";
    gamepages["us"] = "http://www.us.kapihospital.com/";
    gamepages["it"] = "http://www.it.kapihospital.com/";
    gamepages["dk"] = "http://www.dk.kapihospital.com/";
    gamepages["br"] = "http://www.br.kapihospital.com/";
    gamepages["ir"] = "http://www.ir.kapihospital.com/";
    gamepages["no"] = "http://www.no.kapihospital.com/";
    gamepages["ae"] = "http://www.ae.kapihospital.com/";

//***********************************************************************************************************

    var scriptUrl = "http://userscripts.org/scripts/show/86220";
    var Global = unsafeWindow.Global;
    var loc = reg.exec(document.location.href);
    var all = document.getElementsByTagName("body")[0];
    var now = Math.floor((new Date()).getTime() / 1000);
    var nie = 2147483000;
    var questcnt = 0;

    var server = "";
    var page = "";
    var pageZusatz = "";
    var developer = false;
    var candtable = document.getElementsByTagName("table");
    var username = "";

    var valRackLimit = "";
    var valMaxRackLimit = "";
    var valGlobalClockInTitle = "";
    var questTime = "";
    var valStartQuestAutomatic = false;
    var logindata = new Array;


    if (loc) {
        server = loc[1];
        page = loc[2];
        pageZusatz = loc[3];
        developer = (pageZusatz == "?dev");
        candtable = document.getElementsByTagName("table");
        username = GM_getValue(lng + "_" + server + "_username", "");

        switch (page) {
            case "main":
                do_main();
                break;

            case "logout":
                do_login();
                break;
        }
    }
    else
        do_login();


//***********************************************************************************************************

    function do_main() {
        //if (!username) document.location.href = "http://www"+gamepage;
        // CSS
        GM_addStyle("tr:hover{background-color:lightblue;}");
        GM_addStyle("table.hoveryellow tr:hover{background-color:yellow;}");
        GM_addStyle("div.hoverlightblue:hover{background-color:lightblue;}");
        GM_addStyle("div.hoverblue:hover{background-color:blue;}");
        GM_addStyle("#quicklinks{position:fixed;right:-100px;top:0px;width:100px;height:100%;padding-left:15px;background-color:#999;z-index:200;}");
        GM_addStyle("#quicklinks:hover{right:0px;!important}");
        GM_addStyle("#quicklinks>div{float:left;}");
        GM_addStyle("#quicklinks>div>div{position:relative;width:50px;height:50px;}");
        GM_addStyle(".miniicon{font-weight:bold;padding:2px;border:1px inset white;}");
        GM_addStyle(".allcured{border:3px solid green!important;}");
        GM_addStyle(".needminitreatment{border:3px solid yellow;border-left:3px solid yellow!important;}");
        GM_addStyle(".unhealable{border:3px solid red;border-top:3px solid red!important;border-right:3px solid red!important;}");
        GM_addStyle(".racklow{" + GM_getValue(lng + "_" + server + "_" + username + "_css_racklow", "background-color:orangered;") + "}");
        GM_addStyle(".cursorstandard{ cursor: default!important;}");

        // Updatecheck
        if (GM_getValue("valUpdate", true)) {
            valLastUpdate = GM_getValue("valLastUpdate", "");
            if (valLastUpdate == "") {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "http://userscripts.org/scripts/source/86220.meta.js",
                    onload: function (response) {
                        keyusoversion = /uso:version\s+(\d+)/;
                        serverversion = keyusoversion.exec(response.responseText)[1];
                        GM_setValue("valLastUpdate", serverversion);
                    }
                });
            } else {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "http://userscripts.org/scripts/source/86220.meta.js",
                    onload: function (response) {
                        keyusoversion = /uso:version\s+(\d+)/;
                        serverversion = keyusoversion.exec(response.responseText)[1];
                        if (valLastUpdate != serverversion) {
                            GM_setValue("valLastUpdate", serverversion);
                            if (confirm(texte["confirmUpdate"])) {
                                document.location.href = "http://userscripts.org/scripts/source/86220.user.js";
                            }
                        }
                    }
                });
            }
        }

        var documentTitle = document.title;
        try {
            var maincontainer = $("border4").parentNode;
        } catch (err) {
            var maincontainer = all;
        }
        try {
            var werbecontainer = document.getElementsByTagName("form")[0].parentNode;
        } catch (err) {
            var werbecontainer = all;
        }

        var lastXmlRequest = 0;

        var rooms = new Array();
        var patients = new Array();
        var roomTimes = new Object();

        roomTimes["global"] = [0, 0];
        roomTimes["allrooms"] = [0, 0];
        roomTimes["emptyrooms"] = [0, 0];


        for (var v in Global.availableMedics._object) {
            medi[Global.availableMedics._object[v]["diseases"]] = Global.availableMedics._object[v];
        }
        var cand = document.getElementsByClassName("room");

        valRackLimit = GM_getValue(lng + "_" + server + "_" + username + "_valRackLimit", 50);
        valMaxRackLimit = GM_getValue(lng + "_" + server + "_" + username + "_valMaxRackLimit", 100);
        valGlobalClockInTitle = GM_getValue(lng + "_" + server + "_" + username + "_valGlobalClockInTitle", true);
        questTime = GM_getValue(lng + "_" + server + "_" + username + "_questTime", 0);
        valStartQuestAutomatic = GM_getValue(lng + "_" + server + "_" + username + "_valStartQuestAutomatic", true);

        if (developer)
            createElement("div", {id: "help1", style: "z-index:2;position:absolute;top:15px;left:0px;background-color:#CCC;border:2px solid black;padding:3px;"}, all);


        // punkte
        GM_xmlhttpRequest({
            method: "GET",
            url: "service.help.php?mode=level",
            // synchronous: true,
            onload: function (response) {
                var text = JSON.parse(response.responseText);
                var dom = (new DOMParser()).parseFromString(text["message"], "text/xml");
                var tbdy = dom.getElementsByTagName("tbody").item(0);
                var tz = tbdy.getElementsByTagName("tr");


                $("pkt").addEventListener("mouseover", function () {
                    var punkte = parseInt(this.innerHTML.replace(/\./g, ""), 10);

                    for (var z = 0; z < tz.length; z++)
                        if (punkte < parseInt(tz.item(z).getElementsByTagName("td").item(1).textContent.replace(/\./g, ""), 10))
                            break;

                    this.title = texte["noch"] + " " + number_format(parseInt(tz.item(z).getElementsByTagName("td").item(1).textContent.replace(/\./g, ""), 10) - punkte);
                }, false);
            },
        });

        patientDiseases = new Object();
        // patientDiseases[patientId][diseaseNr]: heartbeat,cured,notreatment,comesnext,""=ill
        // patientDiseases[patientId][room]: current room (type)
        // patientDiseases[patientId][floor]: current floor
        // patientDiseases[patientId][roomX]: needed room to go (type)
        // patientDiseases[patientId][m]: count of needed minitreatments
        // patientDiseases[patientId][state]: 0=waitingroom,1=bed,2=nurse,3=in room,4=treatment,5=cured
        // patientDiseases[patientId][unhealable]: if not healable
        /*try{ patientDiseases = explode(GM_getValue(lng+"_"+server+"_"+username+"_patientDiseases","{}")); }catch(err){}

         for(var pat in patientDiseases)
         {
         if(!Global.refPatients.get("p"+pat)){ delete patientDiseases[pat]; }
         else {
         if(!patientDiseases[pat]["state"]){ patientDiseases[pat]["state"]=1; }
         if(!patientDiseases[pat]["room"]){ patientDiseases[pat]["room"]=6; }
         if(!patientDiseases[pat]["floor"]){ patientDiseases[pat]["floor"]=1; }
         }
         }*/

        //For non Premium Players, read patient stats from Server
        if (!Global.ISPREMIUM) {
            var patids = Global.refPatients.values();
            for (var v = 0; v < patids.length; v++) {
                refreshPatient(patids[v]["id"], false);
            }
        }

        if (developer) {

            $("garten_komplett").addEventListener("mouseover", function (event) {
                $("help1").innerHTML = "";
                var roomId = 0;
                var patientId = 0;
                if (!isNaN(event.target.id.replace("r", ""))) {
                    roomId = event.target.id.replace("r", "");
                    patientId = Global.refRooms.get(event.target.id).patient;
                }
                else if (!isNaN(event.target.id.replace("p", ""))) {
                    roomId = (Global.refPatients.get(event.target.id).room + "").replace("r", "");
                    patientId = event.target.id.replace("p", "");
                }
                if (patientId != 0) {
                    var help = Global.refPatients.get("p" + patientId);
                    for (var v in help) {
                        if (typeof(help[v]) != "function") $("help1").innerHTML += "<br>" + v + " : " + help[v];
                    }
                    $("help1").innerHTML += "<br>"
                    if (patientDiseases[patientId]) {
                        for (var v in patientDiseases[patientId]) {
                            $("help1").innerHTML += "<br>" + v + " : " + patientDiseases[patientId][v];
                        }
                    }

                    $("help1").innerHTML += "<br>"
                }
                if (roomId != 0) {
                    var help = Global.refRooms.get("r" + roomId);
                    for (var v in help) {
                        if (typeof(help[v]) != "function") $("help1").innerHTML += "<br>" + v + " : " + help[v];
                        //else $("help1").innerHTML += "<br>"+v+" : Fkt";
                    }
                    $("help1").innerHTML += "<br>"
                    var help = Global.availableRooms[help["roomid"]];
                    for (var v in help) {
                        if (typeof(help[v]) != "function") $("help1").innerHTML += "<br>" + v + " : " + help[v];
                    }

                }
            }, false);

            help = Global.availableRooms[1];
            help = Global.availableDiseases[6];
            help = Global.availableMedics._object["med6"];
            help = Global.availableMedics._object;
            //Log(help);
        }

        //Mediregal durchblaetterfunktion
        $("racknavigation_right").removeAttribute("onclick");
        $("racknavigation_left").removeAttribute("onclick");

        $("racknavigation_left").addEventListener("click",
            function () {
                var prev = unsafeWindow.Rack._curPage - 1;
                var max = Math.ceil(unsafeWindow.Rack.elements.size() / 16);

                if (unsafeWindow.Rack._curPage == 1)
                    unsafeWindow.Rack.update(max);
                else
                    unsafeWindow.Rack.update(prev);
            }, false);


        $("racknavigation_right").addEventListener("click",
            function () {
                var next = unsafeWindow.Rack._curPage + 1;
                var max = Math.ceil(unsafeWindow.Rack.elements.size() / 16);

                if (next > max)
                    unsafeWindow.Rack.update(1);
                else
                    unsafeWindow.Rack.update(next);

            }, true);


        var newdiv, newdiv1, newbutton;
        // Werbung
        if (werbecontainer) {
            werbecontainer.style.display = "";
            maincontainer.style.marginTop = "5px";
        }
        if ($("getcoinsnow")) {
            $("getcoinsnow").style.display = "none";
        }
        if ($("nicelink")) {
            $("nicelink").style.display = "none";
        }
        newdiv = document.getElementsByTagName("div");
        for (var v = 0; v < newdiv.length; v++) if (newdiv[v].hasAttribute("onclick") && newdiv[v].getAttribute("onclick").search("facebook") != -1) newdiv[v].style.display = "none";

        // MiniIcons
        newdiv = createElement("div", {id: "berater_miniicons ", style: "color:white;height:50px;position:absolute;width:13px;z-index:10;top:186px;left:5px;"}, maincontainer);
        newdiv1 = createElement("div", {class: "miniicon hoverblue cursorclickable", style: "border:0;"}, newdiv, "P");
        newdiv1.addEventListener("click", function () {
            buildInfoPanel("patients");
        }, false);
        createElement("div", {style: "height:10px;"}, newdiv);

        /*
         var floors = 2;
         for(var v=floors;v>0;v--){
         newdiv1 = createElement("div",{id:"miniiconSelectFloor"+v,class:"miniicon hoverblue cursorclickable"},newdiv,v);
         newdiv1.addEventListener("click",function(){unsafeWindow.Map.jumpTo("floor"+this.id.replace("miniiconSelectFloor",""));miniiconSelectFloor();},false);
         }
         function miniiconSelectFloor(){
         for(var v=1;v<=floors;v++) $("miniiconSelectFloor"+v).style.backgroundColor = (v==parseInt(Global.selectedFloor,10)?"blue":"");
         }
         miniiconSelectFloor();
         */

        // Button-Leiste
        newdiv = createElement("div", {style: "position:absolute;top:784px;display:inline;"}, maincontainer);
        newbutton = createElement("button", {type: "button", class: "cursorclickable", style: "margin-left:3px;"}, newdiv, texte["set_ScriptHomepage"]);
        newbutton.addEventListener("click", function () {
            window.open(scriptUrl)
        }, false);
        newbutton.addEventListener("mouseover", function () {
            this.style.backgroundColor = "#cc9"
        }, false);
        newbutton.addEventListener("mouseout", function () {
            this.style.backgroundColor = ""
        }, false);
        newbutton = createElement("button", {id: "berateroptionen", type: "button", class: "cursorclickable", style: "margin-left:3px;"}, newdiv, texte["optionen"]);
        newbutton.addEventListener("click", function () {
            buildInfoPanel("options");
        }, false);
        newbutton.addEventListener("mouseover", function () {
            this.style.backgroundColor = "#cc9"
        }, false);
        newbutton.addEventListener("mouseout", function () {
            this.style.backgroundColor = ""
        }, false);

        // InfoPanel
        createElement("div", {id: "infoPanel", name: "", style: "position:absolute;top:184px;left:252px;width:600px;height:500px;background-image:url('http://pics.kapihospital.de/bg_referral_01.jpg');z-index:101;display:none;"}, all);

        // Quicklinks
        var arrQuicklinks = [
            [],
            ["Apotheke Pillenexpress", "shop1", 1, 1],
            [Ae + "rztevereinigung und Wettbewerb", "guildhouse", 3, 1],
            ["Rathaus", "townhall", 3, 1],
            ["Medizinischer Gro" + sz + "handel", "shop2", 1, 1],
            ["Zeitungsredaktion", "editoraloffice", 3, 1],
            ["Autoh" + ae + "ndler", "ambulancestore", 3, 2],
            ["Forschungszentrum", "rcenter", 3, 2],
            [],
            ["Internetcafe", "shop3", 1, 2],
            ["Architekturb" + ue + "ro", "architect", 3, 2],
            ["Tante-Emma-Laden", "shop4", 1, 2],
            ["Bushaltestelle", "busstop", 3, 1],
            ["Speakers Corner", "speakers", 3, 1],
            ["Garage", "garage", 2, 1],
            ["Bank", "bank", 3, 1],
            ["Patientenb" + oe + "rse", "exchange", 2, 1],
            ["Fr" + ae + "ulein Rosenwasser", "goodgirl", 3, 1],
            ["Dr. Knievel", "badboy", 3, 2]
        ];

        newdiv = createElement("div", {id: "quicklinks"}, all);

        var day = (new Date()).getDay();
        var city2Allowed = (Global.ISPREMIUM || (day == 3) || (day == 6));

        for (var mode = 1; mode < 4; mode++) {
            for (var v = 1; v < arrQuicklinks.length; v++)
                if (arrQuicklinks[v][2] == mode) {
                    var newdiv1 = createElement("div", {id: v, class: "hoverlightblue", title: arrQuicklinks[v][0]}, newdiv);
                    createElement("div", {class: "cursorclickable c1_a_50 c1_" + v + "_50", title: arrQuicklinks[v][0]}, newdiv1);


                    if ((arrQuicklinks[v][3] == 1) || city2Allowed) {
                        newdiv1.addEventListener("click", function () {
                            unsafeWindow.show_page(arrQuicklinks[this.id][1]);
                        }, false);
                    }
                    else {
                        newdiv1.style.opacity = "0.3";
                    }

                }
            createElement("div", {style: "clear:both;"}, newdiv);
            createElement("div", {style: "height:20px;width:100px;"}, newdiv);
        }

        var breaker = createElement("div", {style: "height:20px;width:100px;"}, newdiv);
        createElement("hr", {style: "height:2px;color:blue; background: blue; width:100%;"}, breaker);

        // Neue Autobuttons
        var arrQuicklinks2 = [
            [texte["autoBuy"]],
            [texte["autoNurse"]],
            [texte["autoClean"]],
            [texte["autoDisposeMedi"], 3]
        ];


        for (var v = 0; v < arrQuicklinks2.length; v++) {
            var newdiv1 = createElement("div", {id: "auto" + v, class: "hoverlightblue", title: arrQuicklinks2[v][0]}, newdiv);

            if (v == 0) {
                // Medi Buy Button
                createElement("div", {class: "cursorclickable c1_a_50 c1_" + 15 + "_50", title: arrQuicklinks2[v][0]}, newdiv1);
                newdiv1.addEventListener("click", function () {
                    var medstoBuy = Array();
                    var price_overall = 0.00;
                    //var buytext ="";

                    var dialogdiv = createElement("div", {"id": "buyquest", "style": "text-align:center; background-color:white; padding: 4px; height:500px; position:absolute; left:50%; top:50%; margin-left:-200px; margin-top:-200px; widht:400px; z-index:999;font-size:normal;"}, all);
                    var dialogdiv2 = createElement("div", {"id": "buyquest2", "style": "overflow:auto; width:400px; height:475px;"}, dialogdiv);
                    var dialogdiv3 = createElement("div", {"id": "buyquest3", "style": "height:25px;text-align:center;"}, dialogdiv);

                    createElement("h2", {}, dialogdiv2, "Medis kaufen");

                    var newtab = createElement("table", {border: "1px", cellspacing: "0px", cellpadding: "0px", style: "text-align:left;width:100%;"}, dialogdiv2);
                    tabrow = createElement("tr", "", newtab);
                    createElement("td", {style: "text-align:center;"}, tabrow, "kaufen");
                    createElement("td", {style: "text-align:center;"}, tabrow, "Bezeichnung");
                    createElement("td", {style: "text-align:center;"}, tabrow, "Preis");

                    for (var i = 0; i < unsafeWindow.Rack.elements.length; i++) {
                        for (var k in Global.availableMedics._object) {
                            if (Global.availableMedics._object[k]["id"] == unsafeWindow.Rack.elements[i]["product"]) {
                                if (Global.availableMedics._object[k]["shop"] != 0) {
                                    if (Global.availableMedics._object[k]["shop"] < 3 || city2Allowed) {
                                        //console.log(Global.availableMedics._object[k]);
                                        if (( diff = valMaxRackLimit - parseInt(unsafeWindow.Rack.elements[i]["amount"], 10) ) > 0) {
                                            medprice = number_format((Global.availableMedics._object[k]["price"] * diff), 2, ',', '.');
                                            //console.log("medprice >"+ medprice + "<" );

                                            price_overall += parseFloat((Global.availableMedics._object[k]["price"] * diff), 2);
                                            console.log("price_overall >" + price_overall + "<");

                                            //medstoBuy.push( { "itemid":Global.availableMedics._object[k]["id"], "amount":diff } );
                                            //buytext += diff + " x " +Global.availableMedics._object[k]["name"] + ": " + medprice + Global._KH_CURRENCY + "\n";

                                            tabrow = createElement("tr", "", newtab);
                                            tabcell = createElement("td", {style: "text-align:center;"}, tabrow);

                                            newinput = createElement("input", {"id": Global.availableMedics._object[k]["id"] + "#" + diff, "type": "checkbox", "checked": "checked", "title": Global.availableMedics._object[k]["name"], "style": "margin-right:0px;margin-left:1px;"}, tabcell);
                                            newinput.addEventListener("click", function () {

                                                price = Global.availableMedics._object["med" + this.id.split('#')[0]]["price"];
                                                price *= parseInt(this.id.split('#')[1]);

                                                if (this.checked)
                                                    price_overall = parseFloat(price_overall) + parseFloat(price);
                                                else
                                                    price_overall = parseFloat(price_overall) - parseFloat(price);

                                                if ($('prover'))
                                                    $('prover').innerHTML = hT_format(price_overall);

                                                return;
                                            }, false);

                                            newinput = createElement("input", {"id": "am_" + Global.availableMedics._object[k]["id"], "type": "text", "maxlength": "3", "size": "3", "value": diff, "title": "Menge", "style": "width:25px;margin-left:5px;"}, tabcell);
                                            newinput.addEventListener("keyup", function () {
                                                this.value = keepDigits(this.value);

                                                if (!isNaN(this.value))
                                                    calc_overall();

                                            }, false);


                                            tabcell = createElement("td", "", tabrow, Global.availableMedics._object[k]["name"]);
                                            tabcell = createElement("td", {id: "prc" + Global.availableMedics._object[k]["id"], style: "text-align:right;"}, tabrow, medprice + " " + Global._KH_CURRENCY);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }


                    tabrow = createElement("tr", "", newtab);
                    createElement("td", {}, tabrow, "Gesamtsumme");
                    createElement("td", {id: "prover", colspan: "2", style: "text-align:right;font-color:red;font-weigth:bold;"}, tabrow, hT_format(price_overall));


                    newbutton = createElement("button", {type: "button", class: "cursorclickable", id: "buyok", style: "width:100px;height:20px;margin:3px;"}, dialogdiv3, texte["buy"]);
                    newbutton.addEventListener("click", function () {
                        var checkboxes = dialogdiv2.querySelectorAll('input[type="checkbox"]');
                        for (var i = 0; i < checkboxes.length; i++) {
                            if (checkboxes[i].checked)
                                medstoBuy.push({ "itemid": checkboxes[i].id.split('#')[0], "amount": $('am_' + checkboxes[i].id.split('#')[0]).value });
                        }

                        if (medstoBuy.length > 0) {
                            medstoBuy.push("send");
                            var payload = JSON.stringify(medstoBuy);
                            //console.log(payload);
                            unsafeWindow.Cart._sendRequest("city.shop", "get", payload, true);
                        }

                        all.removeChild(dialogdiv);
                    }, false);

                    newbutton = createElement("button", {type: "button", class: "cursorclickable", id: "buycancel", style: "width:100px;height:20px;margin:3px;"}, dialogdiv3, texte["cancel"]);
                    newbutton.addEventListener("click", function () {
                        all.removeChild(dialogdiv);
                        dialogdiv = null;
                        return;
                    }, false);
                }, false);
            }

            if (v == 1) {
                var actpat;

                // Autoschwester Button
                createElement("div", {class: "cursorclickable c1_a_50 c1_" + 2 + "_50", title: arrQuicklinks2[v][0]}, newdiv1);
                newdiv1.addEventListener("click", function () {
                    rooms = Global.refRooms.values();

                    for (var v = 0; v < rooms.length; v++) {
                        if (( rooms[v].roomid == 6 )) {
                            console.log("Prüfe Raum: " + rooms[v].topleft);

                            //Wenn ein Patient drin liegt
                            if (rooms[v].patient != 0) {
                                console.log("Bett hat Patient: " + rooms[v].patient);
                                refreshPatient(rooms[v].patient, true);
                            }

                        }
                    }

                }, false);
            }

            //Dreckige Räume säubern
            if (v == 2) {
                createElement("div", {class: "cursorclickable c1_a_50 c1_" + 8 + "_50", title: arrQuicklinks2[v][0]}, newdiv1);
                newdiv1.addEventListener("click", cleaningfunc, false);
            }

            //MEdis verteilen
            if (v == 3) {
                createElement("div", {class: "cursorclickable c1_a_50 c1_" + 1 + "_50", title: arrQuicklinks2[v][0]}, newdiv1);
                newdiv1.addEventListener("click", medifunc, false);
            }
        }

        createElement("div", {style: "clear:both;"}, newdiv);
        createElement("div", {style: "height:20px;width:100px;"}, newdiv);


        // Hotkeys
        if (GM_getValue(lng + "_" + server + "_" + username + "_valHotkey", true)) {
            window.addEventListener("keydown", function (event) {
                if (event.altKey) {
                    switch (event.keyCode) {
                        case 49:
                            if ($("floor_jump_1")) {
                                closeInfoPanel();
                                click($("floor_jump_1"));
                            }
                            event.preventDefault();
                            break; // Ebene 1
                        case 50:
                            if ($("floor_jump_2")) {
                                closeInfoPanel();
                                click($("floor_jump_2"));
                            }
                            event.preventDefault();
                            break; // Ebene 2
                        case 51:
                            if ($("floor_jump_3")) {
                                closeInfoPanel();
                                click($("floor_jump_3"));
                            }
                            event.preventDefault();
                            break; // Ebene 3
                        case 52:
                            if ($("floor_jump_4")) {
                                closeInfoPanel();
                                click($("floor_jump_4"));
                            }
                            event.preventDefault();
                            break; // Ebene 3
                        case 66:
                            unsafeWindow.show_page("exchange");
                            event.preventDefault();
                            break; // B:Boerse
                        case 71:
                            unsafeWindow.show_page("garage");
                            event.preventDefault();
                            break; // G:Garage
                        case 80:
                            buildInfoPanel("patients");
                            event.preventDefault();
                            break; // P:Patients
                    }
                }
            }, false);
        }


        window.setInterval(function () {
            now = Math.floor((new Date()).getTime() / 1000);
            rooms = Global.refRooms.values();
            patients = Global.refPatients.values();

            var currPatientId = 0;
            var currRoom = null;

            if (!roomTimes[Global.selectedFloor]) {
                roomTimes[Global.selectedFloor] = new Object;
            }
            var calcGlobalTime = false;
            roomTimes["allrooms"][Global.selectedFloor] = 0;

            // Rooms
            var cand = document.getElementsByClassName("room");

            /* room states ...so far
             0:
             1:
             2: ready
             3: treatment
             4:
             5:
             6: cleaning
             7: dirty

             */
            if (Global.nonEmptyFields[0]) {
                for (var v = 0; v < cand.length; v++) {
                    if ((currRoom = Global.refRooms.get(cand[v].id) )) {
                        if (currRoom["roomid"] == 6) {
                            // Bed
                            if (currPatientId = parseInt(currRoom["patient"], 10)) {
                                if (patientDiseases[currPatientId]) {
                                    if (!$("p" + currPatientId)) {
                                        patientDiseases[currPatientId]["state"] = 2;
                                        patientDiseases[currPatientId]["floor"] = 1;
                                        patientDiseases[currPatientId]["room"] = 6;
                                    }
                                }
                                else {
                                    initPatient(currPatientId);
                                }

                                if ($("treatmentr" + currRoom["topleft"])) {
                                    if ((!roomTimes[Global.selectedFloor][currRoom["topleft"]]) || (currRoom["ends"] != roomTimes[Global.selectedFloor][currRoom["topleft"]][0])) {
                                        roomTimes[Global.selectedFloor][currRoom["topleft"]] = [currRoom["ends"], now + currRoom["ends"], 3];
                                    }

                                    if (!$("timeinfo_" + currRoom["topleft"])) {
                                        createElement("div", {id: "timeinfo_" + currRoom["topleft"], style: "position:absolute;top:0px;left:1px;background-color:white;"}, $("r" + currRoom["topleft"]));
                                    }

                                    //console.log( time2str(roomTimes[Global.selectedFloor][currRoom["topleft"]][1]-now, 2) );
                                    $("timeinfo_" + currRoom["topleft"]).innerHTML = time2str(roomTimes[Global.selectedFloor][currRoom["topleft"]][1] - now, 2);
                                }
                                else {
                                    if ($("timeinfo_" + currRoom["topleft"])) {
                                        removeElement($("timeinfo_" + currRoom.topleft));
                                    }
                                }

                            }
                        }
                        else if ((Global.availableRooms[currRoom["roomid"]] ) && (Global.availableRooms[currRoom["roomid"]]["diseases"].length > 0)) { // Behandlungsraum
                            roomTimes["allrooms"][Global.selectedFloor]++;

                            if (currRoom["state"] == 3 || currRoom["state"] == 6) {

                                if ((!roomTimes[Global.selectedFloor][currRoom["topleft"]]) || (currRoom["ends"] != roomTimes[Global.selectedFloor][currRoom["topleft"]][0])) {
                                    roomTimes[Global.selectedFloor][currRoom["topleft"]] = [currRoom["ends"], now + currRoom["ends"], 3];

                                    if (currRoom["state"] == 3)
                                        calcGlobalTime = true;
                                }

                                if (!$("timeinfo_" + currRoom["topleft"])) {
                                    createElement("div", {id: "timeinfo_" + currRoom["topleft"], style: "position:absolute;bottom:23px;left:13px;font-weight:bold;background-color:white;"}, $("r" + currRoom["topleft"]));
                                }
                                $("timeinfo_" + currRoom["topleft"]).innerHTML = time2str(roomTimes[Global.selectedFloor][currRoom["topleft"]][1] - now);

                                // treatment?
                                if ($("gradient_r" + currRoom["topleft"])) {
                                    if (currRoom["state"] == 3) {
                                        if (currPatientId = parseInt(currRoom["patient"], 10)) {
                                            if (patientDiseases[currPatientId]) {
                                                patientDiseases[currPatientId]["state"] = 4;
                                                patientDiseases[currPatientId]["floor"] = Global.selectedFloor;
                                                patientDiseases[currPatientId]["room"] = currRoom["roomid"];
                                            } else {
                                                initPatient(currPatientId);
                                            }
                                        }

                                        // Medis
                                        if ($("alert" + currRoom.topleft)) {
                                            var currDisease = null;
                                            if (currDisease = calcCurrDisease(currRoom["patient"])) {
                                                if (!$("mediinfo_" + currRoom.topleft)) {
                                                    createElement("div", {id: "mediinfo_" + currRoom.topleft, style: "position:absolute;top:5px;left:5px;font-weight:bold;background-color:white;-moz-border-radius:5px;"}, $("r" + currRoom.topleft));
                                                }
                                                $("mediinfo_" + currRoom.topleft).setAttribute("class", "m_a_30 m_" + medi[currDisease]["id"] + "_30");
                                            }
                                        } else {
                                            if ($("mediinfo_" + currRoom.topleft)) {
                                                removeElement($("mediinfo_" + currRoom.topleft));
                                            }
                                        }
                                    }

                                } else {
                                    if (currRoom["state"] == 3) {
                                        if ($("timeinfo_" + currRoom.topleft)) {
                                            removeElement($("timeinfo_" + currRoom.topleft));
                                        }
                                        if ($("mediinfo_" + currRoom.topleft)) {
                                            removeElement($("mediinfo_" + currRoom.topleft));
                                        }
                                    }
                                }
                            } else {

                                if ((!roomTimes[Global.selectedFloor][currRoom["topleft"]]) || (currRoom["state"] != roomTimes[Global.selectedFloor][currRoom["topleft"]][2])) {
                                    calcGlobalTime = true;
                                }
                                roomTimes[Global.selectedFloor][currRoom["topleft"]] = [0, 0, currRoom["state"]];
                                if ($("timeinfo_" + currRoom.topleft)) {
                                    removeElement($("timeinfo_" + currRoom.topleft));
                                }
                                if ($("mediinfo_" + currRoom.topleft)) {
                                    removeElement($("mediinfo_" + currRoom.topleft));
                                }
                            }
                        }
                    }
                }
            }

            if (roomTimes["global"][0] <= now)
                calcGlobalTime = true;

            if (calcGlobalTime) {
                Log("calcGlobalTime");
                roomTimes["global"][0] = nie;
                //roomTimes["allrooms"][0] = 0;
                roomTimes["emptyrooms"][0] = 0;
                roomTimes["global"][Global.selectedFloor] = nie;
                for (var floor = 1; floor < roomTimes["global"].length; floor++) {
                    roomTimes["global"][floor] = nie;
                    roomTimes["emptyrooms"][floor] = 0;
                    for (var help in roomTimes[floor]) {
                        if (roomTimes[floor][help][1] <= now) {
                            roomTimes["emptyrooms"][floor]++;
                        }
                        else {
                            roomTimes["global"][floor] = Math.min(roomTimes["global"][floor], roomTimes[floor][help][1]);
                        }
                    }
                    roomTimes["global"][0] = Math.min(roomTimes["global"][0], roomTimes["global"][floor]);
                    //roomTimes["allrooms"][0] += roomTimes["allrooms"][floor];
                    roomTimes["emptyrooms"][0] += roomTimes["emptyrooms"][floor];
                }
            }
            if (valGlobalClockInTitle) {
                document.title = (roomTimes["global"][0] < nie ? time2str(roomTimes["global"][0] - now) : texte["fertig"].toUpperCase()) + " - " + roomTimes["emptyrooms"][0] + " - " + documentTitle;
            } else {
                if (!$("globalclock")) {
                    createElement("div", {id: "globalclock", title: "global time", style: "position:absolute;top:0px;left:0px;font-weight:bold;background-color:white;"}, all);
                }
                $("globalclock").innerHTML = (roomTimes["global"][0] < nie ? time2str(roomTimes["global"][0] - now) : texte["fertig"].toUpperCase()) + " - " + roomTimes["emptyrooms"][0];
            }
            if (!$("floorclock")) {
                createElement("div", {id: "floorclock", title: "floor time", style: "position:absolute;top:5px;left:20px;font-weight:bold;background-color:white;"}, $("hospital_content"));
            }
            $("floorclock").innerHTML = ((roomTimes["allrooms"][Global.selectedFloor] > 0) ? (roomTimes["global"][Global.selectedFloor] < nie ? time2str(roomTimes["global"][Global.selectedFloor] - now) : texte["fertig"].toUpperCase()) : "---") + " - " + roomTimes["emptyrooms"][Global.selectedFloor];

            // Patients Divs
            var canddiv = $("hospital_content").getElementsByClassName("patient");
            for (var pat = 0; pat < canddiv.length; pat++) {
                currPatientId = parseInt(canddiv[pat].id.replace("p", ""), 10);
                if (patientDiseases[currPatientId]) {
                    patientDiseases[currPatientId]["floor"] = Global.refPatients.get("p" + currPatientId)["floor"];
                    var classStr = canddiv[pat].getAttribute("class").replace(" allcured", "").replace(" unhealable", "").replace(" needminitreatment", "");

                    //dont remove, its flickring to much
                    if ($("mcont_" + currPatientId)) {
                        //removeElement( $("mcont_"+currPatientId) );
                    }

                    // 0=waitingroom,1=bed,2=nurse,3=in room,4=treatment,5=cured
                    if (patientDiseases[currPatientId]["state"] != 5) {
                        if (patientDiseases[currPatientId]["state"] == 2) {
                            patientDiseases[currPatientId]["m"]++;
                            calcEndTreatment(currPatientId);
                        }
                        else if (patientDiseases[currPatientId]["state"] == 4) {
                            calcEndTreatment(currPatientId);
                        }


                        patientDiseases[currPatientId]["room"] = Global.refRooms.get(Global.refPatients.get("p" + currPatientId)["room"])["roomid"];

                        if (patientDiseases[currPatientId]["room"] == 6) {
                            patientDiseases[currPatientId]["state"] = 1;

                            //in bed
                            if (!$("mcont_" + currPatientId)) {
                                createElement("div", {id: "mcont_" + currPatientId, style: "float:right;background-color:white;margin-right:2px;"}, canddiv[pat]);

                                for (var m = 0; m < patientDiseases[currPatientId]["m"]; m++) {
                                    createElement("div", {style: "width: 7px; height: 7px; margin: 1px;background-color:green;"}, $("mcont_" + currPatientId));
                                }

                                for (; m < 4; m++) {
                                    createElement("div", {style: "width: 7px; height: 7px; margin: 1px;background-color:red;"}, $("mcont_" + currPatientId));
                                }
                            }
                        }
                        else {
                            patientDiseases[currPatientId]["state"] = 3;
                        }

                        //ist zu testen
                        calcEndTreatment(currPatientId);
                    }


                    if (patientDiseases[currPatientId]["state"] != 5) {
                        if (patientDiseases[currPatientId]["m"] < 4) {
                            classStr += " needminitreatment" + (patientDiseases[currPatientId]["unhealable"] ? " unhealable" : "");
                        }
                        else if (patientDiseases[currPatientId]["unhealable"]) {
                            classStr += " unhealable";
                        }
                    }
                    else {
                        classStr += " allcured";
                    }


                    canddiv[pat].setAttribute("class", classStr);
                }
                else {
                    initPatient(currPatientId);
                }
            }

            // waiting patients
            canddiv = $("waitingroom").getElementsByClassName("waitingpatient");
            for (var pat = 0; pat < canddiv.length; pat++) {
                canddiv[pat].style.opacity = ((Global.refPatients.get(canddiv[pat].id).referred != 0) ? "0.4" : "1"); //verkaufte
                var currPatientId = parseInt(canddiv[pat].id.replace("p", ""), 10);
                if (patientDiseases[currPatientId]) {
                    patientDiseases[currPatientId]["floor"] = 0;
                    patientDiseases[currPatientId]["room"] = 0;
                    if (patientDiseases[currPatientId]["unhealable"]) {
                        canddiv[pat].setAttribute("class", canddiv[pat].getAttribute("class").replace(" unhealable", "") + " unhealable");
                    }
                    if (patientDiseases[currPatientId]["state"] > 0) {
                        patientDiseases[currPatientId]["state"] = 0;
                    }
                } else {
                    initPatient(currPatientId);
                }
            }
            canddiv = null;

            // QuestClock
            if (!$("questclock")) {
                createElement("div", {id: "questclock", title: "quest time", style: "position:absolute;bottom:0px;right:0px;font-weight:bold;background-color:white;"}, $("waitingroom"));
            }

            $("questclock").innerHTML = ( (questTime > now) ? time2str(questTime - now) : texte["fertig"].toUpperCase() );

        }, 1000);

        window.setInterval(function () {
            var now = Math.floor((new Date()).getTime() / 1000);

            if (valStartQuestAutomatic) {
                if (!(questTime > now) && questcnt < 8)
                    start_Quest();
            }
        }, 3000);


        window.setInterval(function () { // leaving patient
            var cand = $("goingpatient").getElementsByClassName("patient");
            for (var v = 0; v < cand.length; v++) {
                var currPatientId = parseInt(cand[v].id.replace("p", ""), 10)
                if (patientDiseases[currPatientId]) {
                    delete patientDiseases[currPatientId];
                }
            }
            //<div style="position: absolute; left: 46px; width: 25px; height: 36px; top: 31px;
            //background-image: url(&quot;http://pics.kapihospital.de/patient3_walksaway.gif&quot;); z-index: 1000;"
            //class="patient cursordrag allcured" id="p9233468"></div>
        }, 500);

        window.setInterval(function () {
            var cand = $("rackItems").getElementsByClassName("medamount");
            for (var v in cand) {
                if (cand[v].nodeType === 1) {
                    var help = cand[v].getAttribute("class");

                    if (parseInt(cand[v].innerHTML, 10) < valRackLimit) {
                        if (help.search(" racklow") == -1)
                            cand[v].setAttribute("class", help + " racklow");
                    }
                    else {
                        if (help.search(" racklow") != -1)
                            cand[v].setAttribute("class", help.replace(" racklow", ""));
                    }
                }
            }
            for (var pat in patientDiseases) {
                if ((patientDiseases[pat]["state"] == 0) && (!$("p" + pat))) { // waiting+gone
                    delete patientDiseases[pat];
                }
            }
            GM_setValue(lng + "_" + server + "_" + username + "_patientDiseases", implode(patientDiseases));
            cand = null;
        }, 5000);

        // Patient-MouseOver Diseases
        var beraterDiseaseBubble = createElement("div", {id: "beraterDiseaseBubble", style: "z-index:2000;position:absolute;top:0px;left:0px;background-color:#CCC;-moz-border-radius:10px;border:2px solid black;padding:3px;margin-left:40px;"}, all);
        hiddenPatientDiv = createElement("div", {id: "hiddenPatientDiv", style: "display:;"}, all);

        $("garten_komplett").addEventListener("mouseover", function (event) {
            Log("MOUSEOVER " + event.target.id);
            var patientId = 0;
            if (!isNaN(event.target.id.replace("r", ""))) {
                var currRoom = Global.refRooms.get(event.target.id);
                highlightPatients(currRoom.roomid);
                patientId = currRoom.patient;
            }
            else if (!isNaN(event.target.id.replace("p", ""))) {
                patientId = event.target.id.replace("p", "");
            }
            beraterDiseaseBubble.innerHTML = "";
            if (patientId != 0) {
                beraterDiseaseBubble.style.display = "block";
                beraterDiseaseBubble.setAttribute("name", patientId);
                plotPatient(beraterDiseaseBubble);
                //getPatientData(patientId);

                if (Global.ISPREMIUM) {
                    var patdetail = $("treatico");
                    if (patdetail.childNodes.length > 0) {
                        patientDiseases[patientId]["m"] = 4;
                    }
                }
            }
        }, false);
        $("garten_komplett").addEventListener("mousemove", function (event) {
            beraterDiseaseBubble.style.left = event.pageX + "px";
            beraterDiseaseBubble.style.top = event.pageY + "px";
        }, false);
        $("garten_komplett").addEventListener("mouseout", function (event) {
            beraterDiseaseBubble.style.display = "none";
            unhighlightPatients();
        }, false);

        // Frame Observer
        newswindowObserver = window.setInterval(function () {
            if (($("newswindow").style.display != "none") && (!$("newswindowObserver"))) {
                createElement("h1", {id: "newswindowObserver"}, $("newswindow"));
                if ($("msgwindow")) {
                    var help = $("msgwindow").getAttribute("style");
                    if (help.search("medicalrecord_1.png") != -1) {
                        do_Patientenblatt();
                    }
                    else if (help.search("bg_exchange2.jpg") != -1) {
                        do_Patientenboerse();
                    }
                    else if (help.search("bg_notes.png") != -1) {
                        do_Notepad();
                    }
                    else if (help.search("bg_questfinished") != -1) {
                        do_Quest();
                    }
                    else if (help.search("bg_garage") != -1) {
                        do_Quest();
                    }
                    else if (help.search("quest_bg") != -1) {
                        do_Quest();
                    }
                    else if (help.search("bg_shop") != -1) {
                        do_Shop();
                    }
                    else if (help.search("bg_mail") != -1) {
                        do_Mail();
                    }
                }
            }
        }, 200);

        // Rack
        $("rackItems").addEventListener("dblclick", function (event) {
            var shop = Global.availableMedics._object["med" + event.target.getAttribute("medid")]["shop"];
            if ((shop < 3) || city2Allowed) {
                unsafeWindow.show_page("shop" + shop);
            } else {
                alert(texte["shopHeuteNichtErreichbar"]);
            }
        }, false);

        newdiv = null;
        newdiv1 = null;
        newbutton = null;
    }

    /*************************** end do_main() ******************************************/


    /*************************** definition helper functions ****************************/
    function loadLanguage(lang) {
        switch (lang) {
            case "de":
                texte["berater"] = "Berater";
                texte["autologin1"] = "Ermittle aktive Sessions. Bitte 5 Sekunden warten<br>...";
                texte["autologin2"] = "Alle Accounts eingeloggt.";
                texte["optionen"] = "Optionen";
                texte["fertig"] = "Fertig";
                texte["shopHeuteNichtErreichbar"] = "Shop heute nicht erreichbar";
                texte["noch"] = "noch";
                // options panel
                texte["set_ScriptHomepage"] = "Scripthomepage";
                texte["set_AutoLogin"] = "Automatisch einloggen";
                texte["set_Update"] = "Update";
                texte["set_RackLow"] = "Minimaler Lagerbestand";
                texte["set_RackMax"] = "Maximaler Lagerbestand";
                texte["set_valGlobalClockInTitle"] = "Globale Zeit im Titel";
                texte["set_valStartQuestAutomatic"] = "Quests automatisch";
                texte["info_AutoLogin"] = "Sobald Nutzerdaten und Passwort eingegeben sind, werden die Accounts wieder eingeloggt. Es m" + ue + "ssen Popups erlaubt werden bei mehreren Accounts.";
                texte["info_Update"] = "Es wird gepr" + ue + "ft, ob eine neuere Version dieses Scriptes verf" + ue + "gbar ist.";
                texte["info_RackLow"] = "Ein Medikament wird markiert, falls der Lagerbestand unter diese Grenze f" + ae + "llt.";
                texte["info_RackMax"] = "Es werden beim automatischen Einkauf die Medikamente bis zu diesem Lagerbestand afgef" + ue + "llt.";
                texte["info_valGlobalClockInTitle"] = "Die globale Zeit wird im Fenstertitel angezeigt. Ansonsten im Fenster.";
                texte["info_valStartQuestAutomatic"] = "Soll sofort die nächste Quest gestartet werden, wenn eine beended wurde ( max. 8 )?";
                texte["confirmUpdate"] = "Es liegt eine neue Script-Version vor. Diese installieren?";
                texte["zeigePasswoerter"] = "zeige Passw" + oe + "rter";
                texte["autoLogin"] = "Automatischer Login";
                texte["accountAktiv"] = "Account aktiv";
                texte["server"] = "Server";
                texte["ungueltigerServer"] = "Ungueltiger Server";
                texte["name"] = "Name";
                texte["passwort"] = "Passwort";
                texte["speichern"] = "speichern";
                texte["loeschen"] = "l" + oe + "schen";
                texte["buy"] = "kaufen";
                texte["cancel"] = "Abbrechen";
                texte["autoBuy"] = "automatische Lagerauff" + ue + "llung";
                texte["autoClean"] = "R" + ae + "ume s" + ae + "ubern";
                texte["autoNurse"] = "Krankenschwester rufen";
                texte["autoDisposeMedi"] = "Medikamente verteilen";
                // patients panel
                texte["zeigeGeheilteKrankheiten"] = "Zeige geheilte Krankheiten";
                texte["minipics"] = "Minipics";
                texte["Beschreibung"] = "unbehandelt/Gesamt";
                texte["Beschreibung2"] = "Hilfetext um dieses Fenster zu verstehen: Anzahl dieser Krankheit unbehandelt ohne gerade in Behandlung befindliche/Anzahl Gesamt";
                texte["frei"] = "Krankenbetten";
                texte["inBehandlung"] = "in Behandlung";
                texte["waitingroom"] = "Warteraum";
                texte["Gesamt"] = "Gesamt";
                // boerse
                texte["showUncurable"] = "Zeige Unheilbare";
                //Systemwords
                texte["waehrung"] = "hT"; //Global._KH_CURRENCY
                texte["coins"] = "Coins";
                break;

            case "uk":
                texte["berater"] = "Adviser";
                texte["autologin1"] = "Checking active sessions.  Please wait 5 seconds<br>...";
                texte["autologin2"] = "All accounts logged in.";
                texte["optionen"] = "Options";
                texte["fertig"] = "Done";
                texte["shopHeuteNichtErreichbar"] = "The shop is not available";
                texte["noch"] = "Left";
                // options panel
                texte["set_ScriptHomepage"] = "Script Homepage";
                texte["set_AutoLogin"] = "Automatic login";
                texte["set_Update"] = "Update";
                texte["set_RackLow"] = "Minimal rackamount";
                texte["set_RackMax"] = "Automatic buying limit";
                texte["set_valGlobalClockInTitle"] = "Time in page title";
                texte["set_valStartQuestAutomatic"] = "AutoQuest";
                texte["info_AutoLogin"] = "Once username and password information is given, all accounts will be logged in";
                texte["info_Update"] = "Checks whether an updated version of this Advisor script is available.";
                texte["info_RackLow"] = "A product is marked if its amount in your rack is falling below this value.";
                texte["info_RackMax"] = "By Automatic buying product will be purchased until reaching this number.";
                texte["info_valGlobalClockInTitle"] = "Global clock in title";
                texte["info_valStartQuestAutomatic"] = "Should the next quest start automaticly, if the previous ends?";
                texte["confirmUpdate"] = "There is new version of Kapi Hospital Berater. Would You like to install it?";
                texte["zeigePasswoerter"] = "Show password";
                texte["autoLogin"] = "Automatic loging in";
                texte["accountAktiv"] = "Account is acrive";
                texte["server"] = "Server";
                texte["ungueltigerServer"] = "Wrong server";
                texte["name"] = "Name";
                texte["passwort"] = "Password";
                texte["speichern"] = "Save";
                texte["loeschen"] = "Erase";
                texte["buy"] = "Buy";
                texte["cancel"] = "Cancel";
                texte["autoBuy"] = "Buy medics";
                texte["autoClean"] = "Clean rooms";
                texte["autoNurse"] = "Call nurse";
                texte["autoDisposeMedi"] = "Dispose medics";
                // patients panel
                texte["zeigeGeheilteKrankheiten"] = "Show cured of the disease";
                texte["minipics"] = "Minipics";
                texte["Beschreibung"] = "untreated/overall";
                texte["Beschreibung2"] = "helptext to understand this window: Number of untreated diseases without those currently treated/overall number";
                texte["frei"] = "Hospital beds";
                texte["inBehandlung"] = "in a room";
                texte["waitingroom"] = "Waiting room";
                texte["Gesamt"] = "Overall";
                // boerse
                texte["showUncurable"] = "Show uncurable";
                //Systemwords
                texte["waehrung"] = "hT"; //Global._KH_CURRENCY
                texte["coins"] = "Coins";
                break;

            case "pl":
                texte["berater"] = "Doradca";
                texte["autologin1"] = "Sprawdzenie aktywnych sesji. Prosz" + e_pl + "odczekac 5 sekund<br>...";
                texte["autologin2"] = "Wszystkie konta zalogowane.";
                texte["optionen"] = "Opcje";
                texte["fertig"] = "Gotowe";
                texte["shopHeuteNichtErreichbar"] = "Sklep jest teraz niedost" + e_pl + "pny";
                texte["noch"] = "Pozosta" + l_pl + "o";
                // options panel
                texte["set_ScriptHomepage"] = "Strona domowa skryptu";
                texte["set_AutoLogin"] = "Automatyczne logowanie";
                texte["set_Update"] = "Aktualizacja";
                texte["set_RackLow"] = "Minimalna ilo" + s_pl + c_pl + " lekarstw w regale";
                texte["set_RackMax"] = "Limit zakupu";
                texte["set_valGlobalClockInTitle"] = "Czas w tytule karty.";
                texte["set_valStartQuestAutomatic"] = "AutoQuest.";
                texte["info_AutoLogin"] = "Po wprowadzeniu nazwy uzytkownika i has"+ l_pl + "a nast"+ e_pl + "puje automatyczne logowanie. Pozwala to zachowa" + c_pl + " " + c_pl + "iaglosc grania. Przy wielu kontach musi by" + c_pl + "dozwolone wyskakiwanie okienek.";
                texte["info_Update"] = "Automatycznie sprawdza czy jest nowsza wersja tego skryptu.";
                texte["info_RackLow"] = "Produkt zostanie zaznaczony, gdy jego ilo" + s_pl + c_pl + " w regale spadnie poni" +z_pl + "ej tego poziomu";
                texte["info_RackMax"] = "Poprzez automnatyczny zakup, produkt b" + e_pl + "dzie zape" + l_pl + "niany do tego limitu.";
                texte["info_valGlobalClockInTitle"] = "Czas globalny jest wy" + s_pl + "wietlany w pasku tytu" + l_pl + "owym okna.";
                texte["info_valStartQuestAutomatic"] = "Czy kolejny quest powinien si" + e_pl + " zacz" + a_pl + c_pl + "zaraz po tym, gdy sko" + n_pl + "czy" + l_pl + " si" + e_pl + " poprzedni?";
                texte["confirmUpdate"] = "Jest nowa wersja skryptu Doradca Kapi Hospital. Czy chcesz ja zainstalowac?";
                texte["zeigePasswoerter"] = "Poka" + z_pl + " has" +l_pl + "o";
                texte["autoLogin"] = "Automatyczne logowanie";
                texte["accountAktiv"] = "Konto aktywne";
                texte["server"] = "Serwer";
                texte["ungueltigerServer"] = "B" + l_pl + e_pl + "dny serwer";
                texte["name"] = "Login";
                texte["passwort"] = "Has" + l_pl + "o";
                texte["speichern"] = "Zapisz";
                texte["loeschen"] = "Usu" + n_pl;
                texte["buy"] = "kup";
                texte["cancel"] = "Anuluj";
                texte["autoBuy"] = "Kup leki";
                texte["autoClean"] = "Wyczy" + s_pl + c_pl + "pokoje";
                texte["autoNurse"] = "Zadzwo" + n_pl + " po piel" + e_pl + "gniark" + e_pl + ".";
                texte["autoDisposeMedi"] = "Rozporawd" + x_pl + " leki";
                // patients panel
                texte["zeigeGeheilteKrankheiten"] = "Poka" + z_pl + " wyleczone choroby";
                texte["minipics"] = "Minipics";
                texte["Beschreibung"] = "untreated/overall";
                texte["Beschreibung2"] = "helptext to understand this window: Number of untreated diseases without those currently treated/overall number";
                texte["frei"] = "Wolny";
                texte["inBehandlung"] = "Leczony";
                texte["waitingroom"] = "Poczekalnia";
                texte["Gesamt"] = "Overall";
                // boerse
                texte["showUncurable"] = "Poka" + z_pl + " nieuleczalnych";
                //Systemwords
                texte["waehrung"] = "hT"; //Global._KH_CURRENCY
                texte["coins"] = "Monety";
                break;

            case "cz":
                texte["berater"] = "Poradce";
                texte["autologin1"] = "Kontroluji aktivn" + i_cz + " relace. " + c_cz + "ekejte pros" + i_cz + "m 5 sekund<br>...";
                texte["autologin2"] = "V" + s_cz + "echny " + u_cz + c_cz + "ty p" + r_cz + "ihl" + a_cz + s_cz + "eny.";
                texte["optionen"] = "Mo" + z_cz + "nosti";
                texte["fertig"] = "Hotovo";
                texte["shopHeuteNichtErreichbar"] = "Obchod nen" + i_cz + " dostupn" + y_cz;
                texte["noch"] = "Zb" + y_cz + "v" + a_cz;
                // options panel
                texte["set_ScriptHomepage"] = "Domovsk" + a_cz + " str" + a_cz + "nka Scriptu";
                texte["set_AutoLogin"] = "Automatick" + e_cz + " p" + r_cz + "ihla" + s_cz + "ov" + a_cz + "n" + i_cz;
                texte["set_Update"] = "Aktualizace";
                texte["set_RackLow"] = "Minim" + a_cz + "ln" + i_cz + " z" + a_cz + "soba l" + e_cz + "k" + u2_cz;
                texte["set_RackMax"] = "Automatic buying limit";
                texte["set_valGlobalClockInTitle"] = c_cz + "as v n" + a_cz + "zvu karty.";
                texte["set_valStartQuestAutomatic"] = "AutoQuest";
                texte["info_AutoLogin"] = "Jakmile zad" + a_cz + "te sv" + e_cz + " u" + z_cz + "ivatelsk" + e_cz + " jm" + e_cz + "no a heslo, v" + s_cz + "echny " + u_cz + c_cz + "ty budou p" + r_cz + "ihl" + a_cz + s_cz + "eny.";
                texte["info_Update"] = "Automaticky kontroluje, zda je k dispozici nov" + e2_cz + "j" + s_cz + i_cz + " verze tohoto Poradce.";
                texte["info_RackLow"] = "Ozna" + c_cz + i_cz + " l" + e_cz + "ky, jejich" + z_cz + " mno" + z_cz + "stv" + i_cz + " klesne pod zadanou hodnotu.";
                texte["info_RackMax"] = "By Automatic buying product will be purchased until reaching this number.";
                texte["info_valGlobalClockInTitle"] = "Zobraz" + i_cz + " glob" + a_cz + "ln" + i_cz + " " + c_cz + "as v titulku okna.";
                texte["info_valStartQuestAutomatic"] = "Soll sofort die nächste Quest gestartet werden, wenn eine beended wurde ( max. 8 )?";
                texte["confirmUpdate"] = "Je kdispozici nov" + a_cz + " verze R" + a_cz + "dce Kapi Hospital. Chcete ji nainstalovat?";
                texte["zeigePasswoerter"] = "Uk" + a_cz + "zat heslo";
                texte["autoLogin"] = "Automatick" + e_cz + " p" + r_cz + "ihla" + s_cz + "ov" + a_cz + "n" + i_cz;
                texte["accountAktiv"] = u3_cz + c_cz + "et je aktivn" + i_cz;
                texte["server"] = "Server";
                texte["ungueltigerServer"] = "Neplatn" + y_cz + " server";
                texte["name"] = "Login";
                texte["passwort"] = "Heslo";
                texte["speichern"] = "Ulo" + z_cz + "it";
                texte["loeschen"] = "Vymazat";
                texte["buy"] = "kaufen";
                texte["cancel"] = "Abbrechen";
                texte["autoBuy"] = "automatische Lagerauff" + ue + "llung";
                texte["autoClean"] = "R" + ae + "ume s" + ae + "ubern";
                texte["autoNurse"] = "Krankenschwester rufen";
                texte["autoDisposeMedi"] = "Medikamente verteilen";
                // patients panel
                texte["zeigeGeheilteKrankheiten"] = "Zobrazit vyl" + e_cz + c_cz + "iteln" + e_cz;
                texte["minipics"] = "Miniobr" + a_cz + "zky";
                texte["Beschreibung"] = "unbehandelt/Gesamt";
                texte["Beschreibung2"] = "Hilfetext um dieses Fenster zu verstehen: Anzahl dieser Krankheit unbehandelt ohne gerade in Behandlung befindliche/Anzahl Gesamt";
                texte["frei"] = "Voln" + e_cz;
                texte["inBehandlung"] = "Vyl" + e_cz + c_cz + "eno";
                texte["waitingroom"] = c_cz + "ek" + a_cz + "rna";
                texte["Gesamt"] = "Gesamt";
                // boerse
                texte["showUncurable"] = "Zobrazit nevyl" + e_cz + c_cz + "itelné";
                //Systemwords
                texte["waehrung"] = "hT"; //Global._KH_CURRENCY
                texte["coins"] = "Mince";
                break;
        }
    }



    function $(ID) {
        return document.getElementById(ID)
    }

    function removeElement(node) {
        node.parentNode.removeChild(node)
    }

    function createElement(type, attributes, append, inner) {
        var node = document.createElement(type);

        for (var attr in attributes) {
            if (attr == "checked")
                node.checked = attributes[attr];
            else if (attributes.hasOwnProperty(attr))
                node.setAttribute(attr, attributes[attr]);
        }

        if (append)
            append.appendChild(node);

        if (inner)
            node.innerHTML = inner;

        return node;
    }

    function click(A) {
        var B = document.createEvent("MouseEvents");

        B.initEvent("click", true, true);
        A.dispatchEvent(B);

        if (A.href)
            document.location.href = A.href;
    }

    function mousedown(A) {
        var B = document.createEvent("MouseEvents");

        B.initEvent("mousedown", true, true);
        A.dispatchEvent(B);
    }

    function mousemove(A) {
        var B = document.createEvent("MouseEvents");

        B.initEvent("mousemove", true, true);
        A.dispatchEvent(B);
    }

    function number_format(number, decimals, dec_point, thousands_sep) {
        // http://kevin.vanzonneveld.net
        // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +     bugfix by: Michael White (http://getsprink.com)
        // +     bugfix by: Benjamin Lupton
        // +     bugfix by: Allan Jensen (http://www.winternet.no)
        // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // +     bugfix by: Howard Yeend
        // +    revised by: Luke Smith (http://lucassmith.name)
        // +     bugfix by: Diogo Resende
        // +     bugfix by: Rival
        // %        note 1: For 1000.55 result with precision 1 in FF/Opera is 1,000.5, but in IE is 1,000.6
        // *     example 1: number_format(1234.56);
        // *     returns 1: '1,235'
        // *     example 2: number_format(1234.56, 2, ',', ' ');
        // *     returns 2: '1 234,56'
        // *     example 3: number_format(1234.5678, 2, '.', '');
        // *     returns 3: '1234.57'
        // *     example 4: number_format(67, 2, ',', '.');
        // *     returns 4: '67,00'
        // *     example 5: number_format(1000);
        // *     returns 5: '1,000'
        // *     example 6: number_format(67.311, 2);
        // *     returns 6: '67.31'

        var n = number, prec = decimals;
        n = !isFinite(+n) ? 0 : +n;
        prec = !isFinite(+prec) ? 0 : Math.abs(prec);
        var sep = (typeof thousands_sep == "undefined") ? delimThou : thousands_sep; // changed!
        var dec = (typeof dec_point == "undefined") ? delimDeci : dec_point; // changed!

        var s = (prec > 0) ? n.toFixed(prec) : Math.round(n).toFixed(prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;

        var abs = Math.abs(n).toFixed(prec);
        var _, i;

        if (abs >= 1000) {
            _ = abs.split(/\D/);
            i = _[0].length % 3 || 3;

            _[0] = s.slice(0, i + (n < 0)) +
                _[0].slice(i).replace(/(\d{3})/g, sep + '$1');

            s = _.join(dec);
        }
        else {
            s = s.replace('.', dec);
        }

        return s;
    }

    function hT_format(number) {
        return number_format(number, 2) + "&nbsp;" + Global._KH_CURRENCY;
    }

    function hT_formatgr(number) {
        return number_format(number, 0) + "&nbsp;" + Global._KH_CURRENCY;
    }

    function keepDigits(str) {
        return str.replace(/[^0-9]/g, "");
    }

    function calc_overall() {
        var checkboxes = $('buyquest2').querySelectorAll('input[type="checkbox"]');
        var overall = 0.00;

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                var medid = checkboxes[i].id.split('#')[0];
                var amount = $('am_' + medid).value;

                var medprice = number_format((Global.availableMedics._object["med" + medid]["price"] * amount), 2, ',', '.');
                $('prc' + medid).innerHTML = medprice + " " + Global._KH_CURRENCY;

                overall += parseFloat((Global.availableMedics._object["med" + medid]["price"] * amount), 2);
            }
        }

        if ($('prover'))
            $('prover').innerHTML = hT_format(overall);
    }

    function time2str(time, mode) {
        str = "";
        time = Math.max(0, time);
        tmp = "";

        //seconds
        if (!mode || mode == 2) {
            if (time % 60 >= 10)
                str += ":" + Math.floor(time % 60);
            else
                str += ":0" + Math.floor(time % 60);
        }

        //minutes
        time = time / 60;
        if (mode != 2)
            tmp = ":";

        if (time >= 1) {
            if (time % 60 >= 10)
                str = tmp + Math.floor(time % 60) + str;
            else
                str = tmp + "0" + Math.floor(time % 60) + str;
        }
        else {
            str = tmp + "00" + str;
        }

        if (mode != 2) {
            //hours
            time = time / 60;
            if (time >= 1)
                str = Math.floor(time % 24) + str;
            else
                str = "0" + str;

            //days
            time = time / 24;

            if (time >= 1)
                str = Math.floor(time) + "d " + str;
        }

        return str;
    }

    function uhrzeit(time, mode) {
        var help = new Date(time * 1000);

        if (help.getHours() < 10) {
            var str = "0" + help.getHours();
        }
        else {
            var str = help.getHours();
        }

        if (help.getMinutes() < 10) {
            str += ":0" + help.getMinutes();
        }
        else {
            str += ":" + help.getMinutes();
        }

        if (!mode) {
            if (help.getSeconds() < 10) {
                str += ":0" + help.getSeconds();
            }
            else {
                str += ":" + help.getSeconds();
            }
        }

        return str;
    }

    function explode(str) {
        //GM_log("Begin explode "+ str);
        if (str == "")
            throw("Explode error Argument empty");

        if (str == "undefined")
            throw ("Explode error Argument is undefined");

        if (typeof str != "string")
            throw ("Explode error Argument not a String");

        try {
            return eval('(' + str + ')');
        } catch (err) {
            GM_log("Explode error : " + err);
            throw ("Explode error : " + err);
        }
    }

    function implode(arr) {//--- function written by Jan-Hans
        try {
            var line = new String();
            var InternalCounter = -1;
            var NoKey = new Boolean(false);

            if (typeof arr != "object")
                throw("Argument not a Object or Array" + typeof arr + "<br>");

            var type = (arr instanceof Array); //true->array | false->object

            line = (type) ? "[" : "{";
            for (var i in arr) {
                if (typeof arr[i] == "function")
                    continue;

                InternalCounter++;
                if (type) {
                    while (i > InternalCounter) {
                        line += ",";
                        InternalCounter++;
                    }
                } else { //arr == object
                    line += "\"" + i + "\"";
                    line += ":";
                }

                if (typeof arr[i] == "number" || typeof arr[i] == "boolean") {
                    line += arr[i];
                } else if (typeof arr[i] == "string") {
                    line += "\"" + arr[i] + "\"";
                } else if (typeof arr[i] == "undefined") {
                    line += '';
                } else {
                    line += implode(arr[i]);
                }

                line += ",";
            }

            var endChar = line.substring(line.length - 1, line.length);

            return line.substring(0, line.length - 1) + (("{[".indexOf(endChar) != -1) ? endChar : "") + ((type) ? "]" : "}");
        } catch (err) {
            GM_log("Implode error : " + err);
            throw ("Implode error : " + err);
        }
    }

    function Log(obj, pre) {
        if (developer) {
            if (typeof(pre) == "undefined")
                pre = "";

            if (typeof(obj) == "object") {
                //GM_log("______________________________ object");
                for (var v in obj) Log(obj[v], pre + v + " : ");
                //GM_log("______________________________ object end");
            } else {
                GM_log(pre + obj);
            }
        }
    }

    function closeInfoPanel() {
        $("infoPanel").setAttribute("name", "");
        $("infoPanel").style.display = "none";
    }

    function buildInfoPanel(mode) {

        if (mode == $("infoPanel").getAttribute("name"))
            closeInfoPanel();
        else {
            $("infoPanel").setAttribute("name", mode);
            $("infoPanel").innerHTML = "";
            $("infoPanel").style.display = "block";

            divInfo = createElement("div", {style: "position:absolute;left:20px;top:80px;width:570px;height:400px;overflow:auto;"}, $("infoPanel"));
            newdiv = createElement("img", {class: "cursorclickable", style: "font-size:10px;position:absolute;height:35px;width:35px;right:10px;top:2px;"}, $("infoPanel"));
            newdiv.addEventListener("click", closeInfoPanel, false);

            if (mode == "options") {
                createElement("div", {align: "center", style: "line-height:30px;font-weight:bold;"}, divInfo, texte["optionen"]);
                newtable = createElement("table", {style: "width:100%;", border: "1"}, divInfo);

                newtr = createElement("tr", "", newtable);
                newtd = createElement("td", {align: "center"}, newtr);
                var valUpdate = GM_getValue("valUpdate", true);
                inp = createElement("input", {id: "inputvalUpdate", type: "checkbox", class: "link", checked: valUpdate}, newtd);
                inp.addEventListener("click", function () {
                    valUpdate = this.checked;
                    GM_setValue("valUpdate", valUpdate);
                }, false);
                createElement("td", "", newtr, texte["set_Update"]);
                createElement("td", "", newtr, texte["info_Update"]);

                newtr = createElement("tr", "", newtable);
                newtd = createElement("td", {align: "center"}, newtr);
                inp = createElement("input", {id: "inputvalGlobalClockInTitle", type: "checkbox", class: "link", checked: valGlobalClockInTitle}, newtd);
                inp.addEventListener("click", function () {
                    valGlobalClockInTitle = this.checked;
                    GM_setValue(lng + "_" + server + "_" + username + "_valGlobalClockInTitle", valGlobalClockInTitle);
                }, false);
                createElement("td", "", newtr, texte["set_valGlobalClockInTitle"]);
                createElement("td", "", newtr, texte["info_valGlobalClockInTitle"]);

                newtr = createElement("tr", "", newtable);
                newtd = createElement("td", {align: "center"}, newtr);
                newinput = createElement("input", {id: "inputvalRackLimit", value: valRackLimit, maxlength: "5", size: "5px", style: "background-color:transparent;"}, newtd);
                newinput.addEventListener("focus", function () {
                    this.style.backgroundColor = "lightblue";
                }, false);
                newinput.addEventListener("blur", function () {
                    this.style.backgroundColor = "transparent";
                }, false);
                newinput.addEventListener("keyup", function () {
                    valRackLimit = parseInt(this.value, 10);
                    if (!isNaN(valRackLimit)) {
                        GM_setValue(lng + "_" + server + "_" + username + "_valRackLimit", valRackLimit);
                    }
                    this.value = (isNaN(valRackLimit) ? "" : valRackLimit);
                }, false);
                createElement("td", "", newtr, texte["set_RackLow"]);
                createElement("td", "", newtr, texte["info_RackLow"]);

                newtr = createElement("tr", "", newtable);
                newtd = createElement("td", {align: "center"}, newtr);
                newinput = createElement("input", {id: "inputvalMaxRackLimit", value: valMaxRackLimit, maxlength: "5", size: "5px", style: "background-color:transparent;"}, newtd);
                newinput.addEventListener("focus", function () {
                    this.style.backgroundColor = "lightblue";
                }, false);
                newinput.addEventListener("blur", function () {
                    this.style.backgroundColor = "transparent";
                }, false);
                newinput.addEventListener("keyup", function () {
                    valMaxRackLimit = parseInt(this.value, 10);
                    if (!isNaN(valMaxRackLimit)) {
                        GM_setValue(lng + "_" + server + "_" + username + "_valMaxRackLimit", valMaxRackLimit);
                    }
                    this.value = (isNaN(valMaxRackLimit) ? "" : valMaxRackLimit);
                }, false);
                createElement("td", "", newtr, texte["set_RackMax"]);
                createElement("td", "", newtr, texte["info_RackMax"]);

                newtr = createElement("tr", "", newtable);
                newtd = createElement("td", {align: "center"}, newtr);
                inp = createElement("input", {id: "inputvalStartQuestAutomatic", type: "checkbox", class: "link", checked: valStartQuestAutomatic}, newtd);
                inp.addEventListener("click", function () {
                    valStartQuestAutomatic = this.checked;
                    GM_setValue(lng + "_" + server + "_" + username + "_valStartQuestAutomatic", valStartQuestAutomatic);
                }, false);
                createElement("td", "", newtr, texte["set_valStartQuestAutomatic"]);
                createElement("td", "", newtr, texte["info_valStartQuestAutomatic"]);

                //AutoLogin
                createElement("div", {align: "center", style: "line-height:30px;margin-top:20px;font-weight:bold;"}, divInfo, texte["autoLogin"]);
                newtable = createElement("table", {id: "tableAutologin", align: "center"}, divInfo);

                buildLoginTable(false);

                newdiv = createElement("div", {align: "center"}, divInfo);
                newinput = createElement("input", {type: "checkbox", class: "cursorclickable", checked: false}, newdiv);
                newinput.addEventListener("click", function () {
                    buildLoginTable(this.checked);
                }, false);
                newspan = createElement("span", "", newdiv, texte["zeigePasswoerter"]);


                //CSS
                var cssArr = new Object();
                cssArr["css_racklow"] = [
                    [],
                    "background-color:orangered;"
                ];
                createElement("div", {align: "center", style: "line-height:30px;margin-top:20px;font-weight:bold;"}, divInfo, "CSS");
                newtable = createElement("table", {align: "center"}, divInfo);
                for (var v in cssArr) {
                    newtr = createElement("tr", "", newtable);
                    createElement("td", "", newtr, v);
                    newtd = createElement("td", "", newtr);
                    var help = GM_getValue(lng + "_" + server + "_" + username + "_" + v, cssArr[v][1]);
                    newinput = createElement("input", {id: v, value: help, style: "width:300px;"}, newtd);
                    newinput.addEventListener("keyup", function () {
                        if (this.value == "") this.value = cssArr[this.id][1];
                        GM_setValue(lng + "_" + server + "_" + username + "_" + this.id, this.value);
                        cssArr[this.id][1] = this.value;
                        var help = cssArr[this.id][1];
                        for (var w = 0; w < cssArr[this.id][0].length; w++) {
                            help = cssArr[cssArr[this.id][0][w]][1] + help;
                        }
                        this.parentNode.nextSibling.firstChild.setAttribute("style", help);
                    }, false);
                    newtd = createElement("td", "", newtr);
                    for (var w = 0; w < cssArr[v][0].length; w++) {
                        help = cssArr[cssArr[v][0][w]][1] + help;
                    }
                    newdiv = createElement("div", {style: help}, newtd, "test");
                }
            }

            if (mode == "patients") {
                buildPatientsTable(1, true, false);
            }
        }
    }

    function saveLogin() {
        GM_setValue("logindata", implode(logindata));
    }

    function buildLoginTable(showPW) {

        try {
            logindata = explode(GM_getValue("logindata", "[]"));
        }
        catch (err) {
            logindata = new Array;
        }

        newtable = createElement("table", {align: "center"});
        $("tableAutologin").parentNode.replaceChild(newtable, $("tableAutologin"));
        newtable.id = "tableAutologin";
        newtable.addEventListener("change", saveLogin, false);
        newtr = createElement("tr", {}, newtable);
        createElement("th", {}, newtr, texte["server"]);
        createElement("th", {}, newtr, texte["name"]);
        createElement("th", {}, newtr, texte["passwort"]);

        for (var v = 0; v < logindata.length; v++) {
            newtr = createElement("tr", "", newtable);
            newtd = createElement("td", "", newtr);
            newinp = createElement("input", {id: "loginActive" + v, type: "checkbox", title: texte["accountAktiv"], checked: logindata[v][4]}, newtd);
            newinp.addEventListener("change", function () {
                logindata[this.id.replace("loginActive", "")][4] = this.checked;
            }, false);
            newinp = createElement("input", {id: "loginServer" + v, style: "width:20px", maxlength: "2"}, newtd);

            if (isNaN(logindata[v][1]))
                logindata[v][1] = "0";

            if (logindata[v][1] != "0")
                newinp.value = logindata[v][1];

            newinp.addEventListener("change", function () {
                var readin = parseInt(this.value, 10);
                if (isNaN(readin) || (readin < 1)) {
                    alert(texte["ungueltigerServer"]);
                    this.value = "";
                }
                else {
                    this.value = readin;
                    logindata[this.id.replace("loginServer", "")][1] = readin;
                }
            }, false);

            newselect = createElement("select", {id: "loginLng" + v}, newtd);
            for (var w in gamepages)    createElement("option", {value: w}, newselect, w);
            newselect.value = logindata[v][0];
            newselect.addEventListener("change", function () {
                logindata[this.id.replace("loginLng", "")][0] = this.value;
            }, false);

            newtd = createElement("td", "", newtr);
            newinput = createElement("input", {id: "loginName" + v, style: "width:150px", value: logindata[v][2], maxlength: "20"}, newtd);
            newinput.addEventListener("change", function () {
                logindata[this.id.replace("loginName", "")][2] = this.value;
            }, false);

            newtd = createElement("td", {}, newtr);
            newinput = createElement("input", {id: "loginPW" + v, style: "width:150px", value: logindata[v][3], maxlength: "20"}, newtd);

            if (!showPW)
                newinput.type = "password";

            newinput.addEventListener("change", function () {
                logindata[this.id.replace("loginPW", "")][3] = this.value;
            }, false);

            newtd = createElement("td", "", newtr);
            if (v > 0) {
                newdiv = createElement("div", {id: "loginUp" + v, class: "link2", style: "width:14px;height:10px;"}, newtd);
                createElement("img", {src: "http://dqt9wzym747n.cloudfront.net/pics/quest_up.gif", style: "width:14px;height:10px;"}, newdiv);
                newdiv.addEventListener("mouseover", function () {
                    this.style.backgroundColor = "blue"
                }, false);
                newdiv.addEventListener("mouseout", function () {
                    this.style.backgroundColor = "transparent"
                }, false);
                newdiv.addEventListener("click", function () {
                    var currLine = parseInt(this.id.replace("loginUp", ""), 10);
                    logindata.splice(currLine - 1, 2, logindata[currLine], logindata[currLine - 1]);
                    saveLogin();
                    buildLoginTable(showPW);
                }, false);
            }

            if (v < logindata.length - 1) {
                newdiv = createElement("div", {id: "loginDown" + v, class: "link2", style: "width:14px;height:10px;"}, newtd);
                createElement("img", {src: "http://dqt9wzym747n.cloudfront.net/pics/quest_down.gif", style: "width:14px;height:10px;"}, newdiv);
                newdiv.addEventListener("mouseover", function () {
                    this.style.backgroundColor = "blue"
                }, false);
                newdiv.addEventListener("mouseout", function () {
                    this.style.backgroundColor = "transparent"
                }, false);
                newdiv.addEventListener("click", function () {
                    var currLine = parseInt(this.id.replace("loginDown", ""), 10);
                    logindata.splice(currLine, 2, logindata[currLine + 1], logindata[currLine]);
                    saveLogin();
                    buildLoginTable(showPW);
                }, false);
            }

            newtd = createElement("td", {title: texte["loeschen"], id: "loginDelete" + v}, newtr);
            createElement("img", {src: "http://dqt9wzym747n.cloudfront.net/pics/popin/contracts/anullieren.gif", class: "link2", style: "width: 16px; height: 16px;"}, newtd);
            newtd.addEventListener("mouseover", function () {
                this.style.backgroundColor = "blue"
            }, false);
            newtd.addEventListener("mouseout", function () {
                this.style.backgroundColor = "transparent"
            }, false);
            newtd.addEventListener("click", function () {
                var currLine = this.id.replace("loginDelete", "");
                logindata.splice(currLine, 1);
                saveLogin();
                buildLoginTable(showPW);
            }, false);
        }

        newtr = createElement("tr", "", newtable);
        newtd = createElement("td", {colspan: "5", class: "link", style: "font-weight:bold;font-size:16px;text-align:right;"}, newtr, "+");
        newtd.addEventListener("mouseover", function () {
            this.style.backgroundColor = "blue"
        }, false);
        newtd.addEventListener("mouseout", function () {
            this.style.backgroundColor = "transparent"
        }, false);
        newtd.addEventListener("click", function () {
            logindata.push([lng, "0", "", "", "true"]); // New empty line
            saveLogin();
            buildLoginTable(showPW);
        }, false);
    }

    function buildPatientsTable(mode, showCured, minipic) {
        divInfo.innerHTML = "";
        patients = Global.refPatients.values();
        newtable = createElement("table", {border: "1", width: "100%"}, divInfo);
        newtablehead = createElement("thead", "", newtable);
        newtablebody = createElement("tbody", {style: "overflow-y:auto;overflow-x:hidden;height:365px;"}, newtable);

        newtr = createElement("tr", "", newtablehead);
        newth = createElement("th", {colspan: "5"}, newtr);
        newspan = createElement("span", {style: "margin-right:3px"}, newth);
        newinput = createElement("input", {type: "checkbox", checked: showCured, class: "cursorclickable"}, newspan);
        newinput.addEventListener("click", function () {
            buildPatientsTable(mode, this.checked, minipic);
        }, false);
        createElement("span", "", newspan, texte["zeigeGeheilteKrankheiten"]);
        newspan = createElement("span", {style: "margin-right:3px"}, newth);
        newinput = createElement("input", {type: "checkbox", checked: minipic, class: "cursorclickable"}, newspan);
        newinput.addEventListener("click", function () {
            buildPatientsTable(mode, showCured, this.checked);
        }, false);
        createElement("span", "", newspan, texte["minipics"]);
        newinput = createElement("input", {type: "button", style: "margin-right:3px", value: "Patienten", class: "cursorclickable"}, newth);
        newinput.addEventListener("click", function () {
            buildPatientsTable(1, showCured, minipic);
        }, false);
        newinput = createElement("input", {type: "button", style: "margin-right:3px", value: "R" + ae + "ume", class: "cursorclickable"}, newth);
        newinput.addEventListener("click", function () {
            buildPatientsTable(2, showCured, minipic);
        }, false);

        if (mode == 1) {
            for (var posi = 0; posi < 3; posi++) {
                for (var pat in patientDiseases) {
                    switch (patientDiseases[pat]["state"]) {
                        case 1:
                        case 2:
                            if (posi == 0) {
                                newtr = createElement("tr", {"id": pat, "class": "cursorclickable", "onclick": 'show_page("medical",this)'}, newtablebody);
                                newtr.addEventListener("click", closeInfoPanel, false);
                                createElement("td", "", newtr, pat);
                                createElement("td", {colspan: "2"}, newtr, Global.availableRooms[6]["name"]);
                                newtd = createElement("td", {style: "padding-right:30px"}, newtr);
                                plotPatient(newtd, pat, showCured, minipic);
                            }
                            break;
                        case 3:
                        case 4:
                            if (posi == 1) {
                                newtr = createElement("tr", {"id": pat, "class": "cursorclickable", "onclick": 'show_page("medical",this)'}, newtablebody);
                                newtr.addEventListener("click", closeInfoPanel, false);
                                createElement("td", "", newtr, pat);
                                createElement("td", "", newtr, patientDiseases[pat]["floor"]);
                                createElement("td", "", newtr, Global.availableRooms[patientDiseases[pat]["room"]]["name"]);
                                newtd = createElement("td", {style: "padding-right:30px"}, newtr);
                                plotPatient(newtd, pat, showCured, minipic);
                            }
                            break;
                        case 0:
                            if (posi == 2) {
                                newtr = createElement("tr", {"id": pat, "class": "cursorclickable", "onclick": 'show_page("medical",this)'}, newtablebody);
                                newtr.addEventListener("click", closeInfoPanel, false);
                                createElement("td", "", newtr, pat);
                                createElement("td", {colspan: "2"}, newtr, texte["waitingroom"]);
                                newtd = createElement("td", {style: "padding-right:30px"}, newtr);
                                plotPatient(newtd, pat, showCured, minipic);
                            }
                            break;
                    }
                }
                newtr = createElement("tr", "", newtablebody);
                createElement("td", {colspan: "4"}, newtr, "");
            }
        } else if (mode == 2) {
            var sumDiseases = new Object();
            for (var pat in patientDiseases) {
                for (var disease in patientDiseases[pat]) if (!isNaN(disease)) {
                    var currRoom = Global.availableDiseases[disease]["room"][0];

                    if (!sumDiseases[currRoom])
                        sumDiseases[currRoom] = new Object();

                    if (!sumDiseases[currRoom][disease])
                        sumDiseases[currRoom][disease] = [0, 0, 0, 0, 0, 0];

                    switch (patientDiseases[pat]["state"]) {
                        case 1:
                        case 2:
                            sumDiseases[currRoom][disease][0]++;
                            if ((patientDiseases[pat][disease] != "cured") && (patientDiseases[pat][disease] != "heartbeat"))
                                sumDiseases[currRoom][disease][1]++;
                            break;
                        case 3:
                        case 4:
                            sumDiseases[currRoom][disease][2]++;
                            if ((patientDiseases[pat][disease] != "cured") && (patientDiseases[pat][disease] != "heartbeat"))
                                sumDiseases[currRoom][disease][3]++;
                            break;
                        case 0:
                            sumDiseases[currRoom][disease][4]++;
                            if ((patientDiseases[pat][disease] != "cured") && (patientDiseases[pat][disease] != "heartbeat"))
                                sumDiseases[currRoom][disease][5]++;
                            break;
                    }
                }
            }

            newtr = createElement("tr", "", newtablebody);
            newtd = createElement("td", {title: texte["Beschreibung2"]}, newtr, texte["Beschreibung"]);
            newtd = createElement("td", "", newtr, texte["frei"]);
            newtd = createElement("td", "", newtr, texte["inBehandlung"]);
            newtd = createElement("td", "", newtr, texte["waitingroom"]);
            newtd = createElement("td", "", newtr, texte["Gesamt"]);

            for (var r in sumDiseases) {
                newtr = createElement("tr", "", newtablebody);
                newtd = createElement("td", "", newtr, Global.availableRooms[r].name);
                var totalTotalTime = 0;

                for (var v = 0; v < 4; v++) {
                    var totalTime = 0;
                    newtd = createElement("td", {style: (v == 3 ? "padding-right:30px;" : "")}, newtr);

                    for (var disease in sumDiseases[r]) {
                        if (sumDiseases[r][disease][ 2 * v + ( 1 - showCured ) ] > 0) {
                            newdiv = createElement("div", {style: "float:left;margin-right:2px;"}, newtd);
                            createElement("div", {class: "d_a_30 d_" + disease + "_30"}, newdiv);
                            createElement("div", "", newdiv, time2str(Global.availableDiseases[disease]["basetime"], 1));
                            createElement("div", "", newdiv, sumDiseases[r][disease][2 * v + 1] + "/" + sumDiseases[r][disease][2 * v]);
                            totalTime += sumDiseases[r][disease][2 * v + 1] * Global.availableDiseases[disease]["basetime"];
                        }
                    }

                    totalTotalTime += totalTime;
                    if (v == 3)
                        newdiv = createElement("div", {style: "margin-right:2px;font-weight:bold;padding-top:20px;"}, newtd, time2str(totalTotalTime, 1));
                    else
                        newdiv = createElement("div", {style: "margin-right:2px;font-weight:bold;padding-top:20px;"}, newtd, time2str(totalTime, 1));
                }
            }
        }
    }

// Cleaner Function
    function cleaningfunc() {
        var cleaner = $("cleaner");
        var cur_floor = Global.selectedFloor;
        var floor = 1;

        for (var max_floor = 1; $("floor_jump_" + max_floor); max_floor++);
        max_floor--;

        function initfloor(nfloor) {
            $('floor_jump_' + nfloor).click();

            setTimeout(
                function () {
                    rooms = Global.rooms;

                    for (var v = 0; v < rooms.length; v++) {
                        if (( rooms[v].cleanup ) && ( rooms[v].ends == 0 ) && ( rooms[v].roomid != 6 )) {
                            var croom = Global.refRooms.get("r" + rooms[v].topleft);
                            console.log("cleaner for room: " + rooms[v].topleft);
                            croom._onDrop(cleaner, "", "");
                        }
                    }

                    if (floor < max_floor) {
                        floor++;
                        initfloor(floor);
                    }
                    else {
                        if (floor != cur_floor)
                            $('floor_jump_' + cur_floor).click();
                    }
                }
                , 1000);
        }

        initfloor(floor);
    }

    function medifunc() {
        var cur_floor = Global.selectedFloor;
        var floor = 1;

        for (var max_floor = 1; $("floor_jump_" + max_floor); max_floor++);
        max_floor--;

        function initmedi(nfloor) {
            $('floor_jump_' + nfloor).click();

            setTimeout(
                function () {
                    rooms = Global.rooms;

                    for (var v = 0; v < rooms.length; v++) {
                        if (( currRoom = Global.refRooms.get("r" + rooms[v].topleft) )) {
                            if (currRoom["roomid"] != 6) {
                                if ((Global.availableRooms[currRoom["roomid"]] ) && (Global.availableRooms[currRoom["roomid"]]["diseases"].length > 0 )) { // Behandlungsraum

                                    if (currRoom["state"] == 3) {
                                        if ($("gradient_r" + currRoom["topleft"]) && $("alert" + currRoom.topleft)) {
                                            // Medis

                                            var currDisease = null;
                                            currDisease = calcCurrDisease(currRoom["patient"]);
                                            //console.log(currDisease);

                                            if (currDisease) {
                                                if ($("mediinfo_" + currRoom.topleft)) {
                                                    //console.log( $('rackItem'+medi[currDisease]["id"] ) );

                                                    for (var i = 0; i < unsafeWindow.Rack.elements; i++) {
                                                        if (unsafeWindow.Rack.elements[i]["product"] == medi[currDisease]["id"])
                                                            break;
                                                    }

                                                    var med = createElement("div", {
                                                        id: "rackItem" + medi[currDisease]["id"],
                                                        class: "med ri_a",
                                                        medid: medi[currDisease]["id"],
                                                        amount: unsafeWindow.Rack.elements[i]["amount"],
                                                        rlevel: unsafeWindow.Rack.elements[i]["rlevel"]
                                                    }, null);

                                                    //console.log(med);
                                                    currRoom._onDrop(med, "", "");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (floor < max_floor) {
                        floor++;
                        initmedi(floor);
                    }
                    else {
                        /*
                         * error window is shown, close it and start again
                         * (its when disease array is not complete)
                         */
                        if ($("dlg_message").style.display != "none" && $("btn_info")) {
                            click($("btn_info"));
                            floor = 1;
                            initmedi(floor);
                        }

                        if (floor != cur_floor)
                            $('floor_jump_' + cur_floor).click();
                    }
                }
                , 1500);
        }

        initmedi(floor);
    }

    function initPatient(patientId) {
        if (!patientDiseases[patientId]) {
            //console.log("initPatient "+patientId);
            patientDiseases[patientId] = new Object;
            patientDiseases[patientId]["m"] = 0;
            patientDiseases[patientId]["floor"] = 1;
            //patientDiseases[patientId]["xml"] = 0;

            var help = Global.refPatients.get("p" + patientId);
            if (help)
                patientDiseases[patientId]["floor"] = help["floor"];

            for (var v = 0; v < help["diseases"].length; v++) {
                patientDiseases[patientId][help["diseases"][v]] = "";
                patientDiseases[patientId]["room" + Global.availableDiseases[help["diseases"][v]]["room"][0]] = 1;
            }
        }

        calcPatientState(patientId);
    }

    function refreshPatient(patientId, with_nurse) {
        if (!patientDiseases[patientId])
            initPatient(patientId);

        getPatientInfos(patientId, with_nurse);
    }

    function updPatientState(patientId, infos, with_nurse) {
        var cured = true;
        var obj = infos.find('div#medi_diseases');

        // is not set with special diseases
        if (obj[0]) {
            for (var w = 0; w < obj[0].childNodes.length - 3; w++) {
                var disease = (/d_(\d+)_50/).exec(obj[0].childNodes[w].childNodes[1].getAttribute("class"))[1];

                if (obj[0].childNodes[w].childNodes[1].firstChild) {

                    patientDiseases[patientId][disease] = (/(.+) (.+)/).exec(obj[0].childNodes[w].childNodes[1].firstChild.getAttribute("class"))[2];

                    if (patientDiseases[patientId][disease] == "notreatment")
                        patientDiseases[patientId]["unhealable"] = 1;


                    if (patientDiseases[patientId][disease] != "cured")
                        cured = false;
                    else
                        patientDiseases[patientId]["room" + Global.availableDiseases[disease]["room"][0]] = 0;
                }
                else {
                    patientDiseases[patientId][disease] = "";
                    patientDiseases[patientId]["room" + Global.availableDiseases[disease]["room"][0]] = 1;

                    cured = false;
                }
            }
        }
        else {
            //special disease
            for (var disease in patientDiseases[patientId]) {
                if (!isNaN(disease)) {
                    patientDiseases[patientId][disease] = "cured";
                    break;
                }
            }
        }


        // nurse
        var canddiv = infos.find('.minitreatment');
        patientDiseases[patientId]["m"] = 4;

        for (var v = 0; v < canddiv.length; v++) {
            if (canddiv[v].style.backgroundImage == "") {
                patientDiseases[patientId]["m"]--;
                cured = false;
            }
        }


        if (with_nurse) {
            for (var v = 0; v < canddiv.length; v++) {
                if (canddiv[v].style.backgroundImage == "") {
                    var help = Global.refPatients.get("p" + patientId);
                    if (!( $("treatment" + help["room"]) )) {
                        unsafeWindow.MedicalRecord._onclick(canddiv[v], patientId);
                        break;
                    }
                }
            }
        }

        if (cured)
            patientDiseases[patientId]["state"] = 5;
        else
            calcComesNext(patientId);

        calcPatientState(patientId);
    }

    function calcPatientState(patientId) {
        var help = Global.refPatients.get("p" + patientId);
        var help2 = null;

        if (help)
            help2 = Global.refRooms.get(help["room"]);

        if (patientDiseases[patientId]["state"] != 5) {

            if ($("p" + patientId)) {
                if ($("p" + patientId).getAttribute("class").search("waitingpatient") != -1) {
                    patientDiseases[patientId]["state"] = 0;
                    patientDiseases[patientId]["room"] = 0;
                }
                else {
                    if (help2) {
                        patientDiseases[patientId]["state"] = ( help2["roomid"] == 6 ) ? 1 : 3;
                        patientDiseases[patientId]["room"] = help2["roomid"];
                    }
                    else {
                        patientDiseases[patientId]["state"] = 1;
                        patientDiseases[patientId]["room"] = 6;
                    }
                }
            }
            else {
                if (help2) {
                    patientDiseases[patientId]["state"] = (help2["roomid"] == 6) ? 2 : 4;
                    patientDiseases[patientId]["room"] = help2["roomid"];
                }
                else {
                    patientDiseases[patientId]["state"] = 2;
                    patientDiseases[patientId]["room"] = 6;
                }
            }
        }
    }

    function plotPatient(target, currPatientId, showCured, minipic) { //(target) , (target,showCured)
        if (!isNaN(currPatientId)) {
            if (typeof(showCured) != "boolean")
                showCured = true;
        } else {
            if (typeof(currPatientId) == "boolean")
                showCured = currPatientId;

            else
                showCured = true;

            currPatientId = parseInt(target.getAttribute("name"), 10);
        }

        if (typeof(minipic) != "boolean")
            minipic = false;

        Log("plotPatient " + currPatientId + " " + showCured + " " + minipic);
        target.innerHTML = "";

        initPatient(currPatientId);

        // diseases
        var usedRooms = new Object();
        var newdiv;
        var restlicheZeit = 0;

        for (var disease in patientDiseases[currPatientId]) {
            if (!isNaN(disease)) {
                if (showCured || patientDiseases[currPatientId][disease] != "cured") {
                    newdiv = createElement("div", {style: "float:left;"}, target);
                    if (minipic) {
                        if (patientDiseases[currPatientId][disease] == "cured") {
                            newdiv1 = createElement("div", {class: "d_a_15 d_" + disease + "_15", style: "opacity:0.5;"}, newdiv);
                            createElement("div", {class: "treatment_icon_15 treatment_icon_15_1"}, newdiv1);
                        }
                        else {
                            newdiv1 = createElement("div", {class: "d_a_15 d_" + disease + "_15"}, newdiv);
                        }
                    }
                    else {
                        if (patientDiseases[currPatientId][disease] == "cured") {
                            newdiv1 = createElement("div", {class: "d_a_30 d_" + disease + "_30", style: "opacity:0.3;"}, newdiv);
                            createElement("div", {class: "treatmenticons " + patientDiseases[currPatientId][disease] + "s"}, newdiv1);
                        }
                        else if (patientDiseases[currPatientId][disease]) {
                            newdiv1 = createElement("div", {class: "d_a_30 d_" + disease + "_30"}, newdiv);
                            createElement("div", {class: "treatmenticons " + patientDiseases[currPatientId][disease] + "s"}, newdiv1);
                        }
                        else {
                            newdiv1 = createElement("div", {class: "d_a_30 d_" + disease + "_30"}, newdiv);
                        }

                        if (patientDiseases[currPatientId][disease] != "cured") {
                            newdiv2 = createElement("div", "", newdiv, time2str(Global.availableDiseases[disease]["basetime"], 1));
                            restlicheZeit += Global.availableDiseases[disease]["basetime"];

                            if (!usedRooms[Global.availableDiseases[disease]["room"][0]]) {
                                usedRooms[Global.availableDiseases[disease]["room"][0]] = 1;
                                newdiv2.style.fontWeight = "bold";
                            }
                        }
                    }
                }
            }
        }
        // nurse
        if (patientDiseases[currPatientId]["m"] == 4) {
            if (minipic) {
                newdiv = createElement("div", {style: "position:relative;float:left;"}, target);
                createElement("div", {class: "treatment_icon_15 treatment_icon_15_1"}, newdiv);
            } else {
                newdiv = createElement("div", {style: "position:relative;float:left;margin-left:30px;"}, target);
                createElement("div", {class: "pat_dis1 treatmenticonpa"}, newdiv);
                createElement("div", {class: "treatmenticons cureds"}, newdiv);
                newdiv2 = createElement("div", "", newdiv, time2str(restlicheZeit, 1));
                newdiv2.style.fontWeight = "bold";
            }
        }
        else {
            if (!minipic) {
                newdiv = createElement("div", {style: "position:relative;float:left;margin-left:30px;"}, target);
                createElement("div", {class: "pat_dis1 treatmenticonpa"}, newdiv);
                newdiv2 = createElement("div", "", newdiv, time2str(restlicheZeit, 1));
                newdiv2.style.fontWeight = "bold";
            }
        }
        newdiv = null;
    }

    function getPatientInfos(id, with_nurse) {
        var answ = GM_xmlhttpRequest({
            method: "GET",
            url: "medicalrecord.php?patient=" + id,
            // synchronous: true,
            onload: function (response) {
                var text = JSON.parse(response.responseText);
                updPatientState(id, jQuery(text["message"]), with_nurse);
            },
            onerror: function (response) {
                return "";
            }
        });
    }

    function highlightPatients(roomid) {
        // Patients
        var canddiv = $("garten_komplett").getElementsByClassName("patient");

        for (var v = 0; v < canddiv.length; v++) {
            canddiv[v].style.border = "";

            var currPatientId = parseInt(canddiv[v].id.replace("p", ""), 10);

            if (patientDiseases[currPatientId]) {

                if (patientDiseases[currPatientId]["room" + roomid])
                    canddiv[v].style.border = "3px solid blue";
            }
            else
                initPatient(currPatientId);
        }

        // in Rooms
        var canddiv = $("garten_komplett").getElementsByClassName("room");
        for (var v = 0; v < canddiv.length; v++) {
            canddiv[v].style.backgroundColor = "";
            var currPatientId = Global.refRooms.get(canddiv[v].id)["patient"];
            if (currPatientId) {
                if (!$("p" + currPatientId)) {
                    if (patientDiseases[currPatientId]) {
                        if (patientDiseases[currPatientId]["room" + roomid]) {
                            canddiv[v].style.backgroundColor = "blue";
                        }
                    } else {
                        initPatient(currPatientId);
                    }
                }
            }
        }
        canddiv = null;
    }

    function unhighlightPatients() {
        Log("unhighlightPatients");
        var canddiv = $("garten_komplett").getElementsByClassName("patient");

        for (var v = 0; v < canddiv.length; v++) {
            canddiv[v].style.border = "";
        }
        var canddiv = $("garten_komplett").getElementsByClassName("room");

        for (var v = 0; v < canddiv.length; v++) {
            canddiv[v].style.backgroundColor = "";
        }
        canddiv = null;
    }

    function calcCurrDisease(patientId) { // returns current treatment
        var result = null;
        if (patientDiseases[patientId]) {
            for (var v in patientDiseases[patientId]) if ((!isNaN(v)) && (patientDiseases[patientId][v] == "heartbeat")) {
                result = v;
                break;
            }
            if (!result) { // no treatment found, set one
                var currPatient = Global.refPatients.get("p" + patientId);
                var currRoom = Global.refRooms.get(currPatient["room"]);
                if (currRoom) {
                    if (patientDiseases[patientId]["room" + currRoom.roomid]) delete patientDiseases[patientId]["room" + currRoom.roomid];
                    for (var disease in patientDiseases[patientId]) if ((!isNaN(disease)) && (patientDiseases[patientId][disease] != "cured")) {
                        for (var roomDiseaseNr = 0; roomDiseaseNr < Global.availableRooms[currRoom.roomid]["diseases"][roomDiseaseNr]; roomDiseaseNr++) {
                            if (disease == Global.availableRooms[currRoom.roomid]["diseases"][roomDiseaseNr]) {
                                if (!result) {
                                    patientDiseases[patientId][disease] = "heartbeat";
                                    result = disease;
                                } else {
                                    patientDiseases[patientId]["room" + currRoom.roomid] = 1;
                                }
                            }
                        }
                    }
                }
            }
        } else {
            initPatient(patientId);
            result = calcCurrDisease(patientId);
        }

        calcComesNext(patientId);
        return result;
    }

    function calcComesNext(patientId) {
        Log("calcComesNext " + patientId);
        if (patientDiseases[patientId]) {
            var currRoomId = null;
            for (var disease in patientDiseases[patientId]) if (!isNaN(disease) && (patientDiseases[patientId][disease] == "heartbeat")) {
                currRoomId = Global.availableDiseases[disease]["room"][0];
                break;
            }
            if (currRoomId) {
                for (var disease in patientDiseases[patientId]) if (!isNaN(disease) && (patientDiseases[patientId][disease] == "") && (currRoomId == Global.availableDiseases[disease]["room"])) {
                    patientDiseases[patientId][disease] = "comesnext";
                }
            }
        } else {
            initPatient(patientId);
        }
    }

    function calcEndTreatment(patientId) {
        Log("calcEndTreatment " + patientId);

        if (patientDiseases[patientId]) {
            var cured = true;

            for (var v in patientDiseases[patientId]) if (!isNaN(v)) {
                var currDiseaseRoom = Global.availableDiseases[v]["room"][0];

                if (patientDiseases[patientId][v] == "heartbeat") {
                    patientDiseases[patientId][v] = "cured";
                    if (patientDiseases[patientId]["room" + currDiseaseRoom])
                        delete patientDiseases[patientId]["room" + currDiseaseRoom];
                } else {
                    if (patientDiseases[patientId][v] == "comesnext")
                        patientDiseases[patientId][v] = "";

                    if (patientDiseases[patientId][v] != "cured") {
                        cured = false;
                        patientDiseases[patientId]["room" + currDiseaseRoom] = 1;
                    }
                }
            }

            if (cured && (patientDiseases[patientId]["m"] > 3))
                patientDiseases[patientId]["state"] = 5;

        } else
            initPatient(patientId);
    }

    function do_Patientenblatt() {
        var currPatientId = parseInt((/MedicalRecord\.\_onclick\(this, (\d+)/).exec($("msgwindow").innerHTML)[1], 10);
        var currPatient = Global.refPatients.get("p" + currPatientId);

        // diseases
        var canddiv = $("msgwindow").getElementsByTagName("div");

        for (var v = 0; v < canddiv.length; v++)
            if (canddiv[v].id == "medi_diseases")
                break;

        patientDiseases[currPatientId] = new Object;
        var cured = true;

        for (var w = 0; w < canddiv[v].childNodes.length - 3; w++) {

            var disease = (/d_(\d+)_50/).exec(canddiv[v].childNodes[w].childNodes[1].getAttribute("class"))[1];

            if (canddiv[v].childNodes[w].childNodes[1].firstChild) {
                patientDiseases[currPatientId][disease] = (/(.+) (.+)/).exec(canddiv[v].childNodes[w].childNodes[1].firstChild.getAttribute("class"))[2];
                if (patientDiseases[currPatientId][disease] == "notreatment")
                    patientDiseases[currPatientId]["unhealable"] = 1;

                if (patientDiseases[currPatientId][disease] != "cured")
                    cured = false;
            } else {
                patientDiseases[currPatientId][disease] = "";
                patientDiseases[currPatientId]["room" + Global.availableDiseases[disease]["room"][0]] = 1;
                cured = false;
            }
        }
        // nurse
        var canddiv = $("msgwindow").getElementsByClassName("minitreatment");
        patientDiseases[currPatientId]["m"] = 4;

        for (var v = 0; v < canddiv.length; v++)
            if (canddiv[v].style.backgroundImage == "") {
                patientDiseases[currPatientId]["m"]--;
                cured = false;
            }

        if (cured)
            patientDiseases[currPatientId]["state"] = 5;
        else {
            calcComesNext(currPatientId);
            calcPatientState(currPatientId);
        }

        var maxprice = parseFloat($("med_price").getElementsByTagName("span")[0].innerHTML.split("-")[1].replace(Global._KH_THOUSANDSEPERATOR, "").replace(Global._KH_DECIMALSEPERATOR, "."), 10)
        createElement("div", {"style": "position:absolute;top:380px;right:130px;color:red;"}, $("ref_divdetailsbig"), "85%: " + hT_formatgr(0.85 * maxprice) + ", 90%: " + hT_formatgr(0.9 * maxprice) + ", 95%: " + hT_formatgr(0.95 * maxprice));

        var newimg = createElement("img", {"style": "position:absolute;top:440px;left:219px;width:16px;height:16px;", "src": "http://pics.kapihospital.de/addressbook.gif", "class": "cursorclickable", "title": "Adressbuch"}, $("ref_divdetailsbig"));
        newimg.addEventListener("click", function () {
            var newdiv = createElement("div", {"id": "refAdressBook", "style": "top:70px;width:265px;height:350px;position:absolute;z-index:30;right:0px;background:url('http://pics.kapihospital.de/addressbook_newmsg.gif') no-repeat scroll left top transparent;overflow:visible;"}, $("ref_divdetails"));
            var newdiv1 = createElement("div", {"style": "position:absolute;left:12px;top:5px;z-index:2;width:15px;height:10px;", "class": "cursorclickable", "title": "schlie" + sz + "en"}, newdiv);
            newdiv1.addEventListener("click", function () {
                removeElement($("refAdressBook"));
            }, false);
            createElement("div", {"style": "z-index:1;position:absolute;width:165px;top:15px;left:45px;right:15px;text-align:center;font-weight:bold;font-size:medium;"}, newdiv, "Adressbuch");
            newdiv1 = createElement("div", {"style": "position:absolute;width:180px;height:225px;top:50px;left:45px;right:0px;overflow-y:auto;overflow-x:hidden;"}, newdiv);
            var newtable = createElement("table", {"cellspacing": "0"}, newdiv1);
            contacts = explode(GM_getValue(lng + "_" + server + "_" + username + "_contacts", "[]"));
            for (var v = 0; v < contacts.length; v++) {
                newdiv1 = createElement("div", {"class": "cursorclickable"}, createElement("td", {}, createElement("tr", {}, newtable)), contacts[v]);
                newdiv1.addEventListener("click", function () {
                    $("ref_recipient").value = this.innerHTML;
                    removeElement($("refAdressBook"));
                }, false);
            }
            newdiv = null;
            newdiv1 = null;
            newtable = null;
            newdiv1 = null;
        }, false);
        canddiv = null;
        newimg = null;
    }

    function do_Quest() {
        Log("do_Quest");
        if ($("ga_running")) {
            if ($("ga_running").style.display != "none") {
                questTime = now + unsafeWindow.Garage["ends"];
                GM_setValue(lng + "_" + server + "_" + username + "_questTime", questTime);
            }
            else {
                window.setTimeout(do_Quest, 200);
            }
        }
    }

    function start_Quest() {
        console.log("startQuest");
        unsafeWindow.show_page("garage");

        window.setTimeout(function () {
            if ($("newswindow_badge")) {
                //Erfolgsmeldung wird angezeigt
                console.log("Im Finish");
                unsafeWindow.close_badge();
            }

            window.setTimeout(function () {
                console.log("Suche fenster");
                if ($("ga_new") && $("ga_new").style.display != "none") {
                    console.log("Starte neu");
                    questcnt = $('ga_done').innerHTML[0];
                    console.log(questcnt);

                    if (questcnt < 8)
                        unsafeWindow.Garage.doJob();
                }

                if ($("ga_running") && $("ga_running").style.display != "none")
                    console.log("läuft noch");

                window.setTimeout(unsafeWindow.close_page, 500);

            }, 400);

        }, 500);
    }

    function do_Mail() {
        var keyMsgShow = /showMessage\(['|\s]*(\d+)['|\s]*,'(.*?)'\)/;
        var keyMsgDelete = /deleteMessage\(['|\s]*(\d+)['|\s]*,\s*this,\s*'(.*?)'\)/;
        var candtable = $("msgwindow").getElementsByTagName("table");
        var cand = null;
        var help = null;
        if (candtable[0]) {
            cand = candtable[0].getElementsByTagName("a");
            if (cand[0] && (help = keyMsgShow.exec(cand[0].href))) {
                if (help[2] == "inbox") {
                    // Inbox
                    var msgIdIn = new Array;
                    for (var v = 0; v < cand.length; v++) {
                        help = keyMsgShow.exec(cand[v].href);
                        if (help) {
                            msgIdIn.push(help[1]);
                        }
                    }
                    GM_setValue(lng + "_" + server + "_" + username + "msgIdIn", implode(msgIdIn));
                    cand = candtable[0].getElementsByTagName("input");
                    for (var v = 0; v < cand.length; v++) {
                        cand[v].setAttribute("title", "Alt+Klick um alle Gleichen zu markieren");
                        cand[v].addEventListener("click", function (event) {
                            if (event.altKey) {
                                var cand = this.parentNode.parentNode.getElementsByTagName("a");
                                var cand2 = null;
                                var help = [this.checked, cand[0].innerHTML, cand[1].innerHTML];
                                cand = this.parentNode.parentNode.parentNode.getElementsByTagName("tr");
                                for (var v = 0; v < cand.length; v++) {
                                    cand2 = cand[v].getElementsByTagName("a");
                                    if ((help[1] == cand2[0].innerHTML) && (help[2] == cand2[1].innerHTML)) {
                                        cand[v].getElementsByTagName("input")[0].checked = help[0];
                                    }
                                }
                                cand = null;
                                cand2 = null;
                                help = null;
                            }
                        }, false);
                    }
                }
            } else {
                cand = $("msgNavigation").getElementsByTagName("input");
                if (cand.length > 1) {
                    // InMessage
                    var help = keyMsgDelete.exec(cand[cand.length - 2].getAttribute("onclick"));
                    if (help) {
                        if (help[2] == "inbox") {
                            var msgIdIn = explode(GM_getValue(lng + "_" + server + "_" + username + "msgIdIn", "[]"));
                            for (var c = 0; c < msgIdIn.length; c++) if (msgIdIn[c] == help[1]) break;
                            if (c > 0) createElement("input", {"type": "button", "value": "vorige Nachricht", "onclick": "javascript:Messages.showMessage(" + msgIdIn[c - 1] + ",'inbox');", "class": "cursorclickable msg_input"}, $("msgNavigation"));
                            if (c < msgIdIn.length - 1) createElement("input", {"type": "button", "value": "n" + ae + "chste Nachricht", "onclick": "javascript:Messages.showMessage(" + msgIdIn[c + 1] + ",'inbox');", "class": "cursorclickable msg_input"}, $("msgNavigation"));
                        }
                    }
                }
                if ($("deleteContact")) {
                    // contacts
                    var contacts = new Array();
                    cand = candtable[0].getElementsByTagName("tr");
                    for (var tr = 1; tr < cand.length - 3; tr++) {
                        contacts.push(/(.*?)&nbsp;/.exec(cand[tr].getElementsByTagName("td")[0].innerHTML)[1]);
                    }
                    GM_setValue(lng + "_" + server + "_" + username + "_contacts", implode(contacts));
                }
            }
        }
        candtable = null;
        cand = null;
    }

    function laden(elemente, i) {

        /* loader-Objekt initialisieren */

        loader.onload = function () {
            if (i < (elemente.length - 1)) {
                laden(elemente, i + 1);
            }
            else {
                /* alle Elemente geladen */
            }
        }
    }

    function do_Notepad() {
        removeElement($("premiumicon"));
        $("msg_body").disabled = "";
        $("msg_body").value = GM_getValue(lng + "_" + server + "_" + username + "_notepad", "");
        $("msg_body").addEventListener("keyup", function () {
            GM_setValue(lng + "_" + server + "_" + username + "_notepad", this.value);
        }, false);
    }

    function do_Patientenboerse() {
        Log("do_Patientenboerse");

        createElement("div", {style: "z-index:0;position:absolute;top:0px;right:0px;height:500px;width:250px;background-image: url('http://pics.kapihospital.de/bg_exchange2.jpg');background-position:250px 0px;"}, $("msgwindow"));
        $("msgwindow").style.width = "750px";
        $("ex_bubble").style.width = "";
        $("ex_bubble").style.zIndex = "1";

        /*var newdiv = createElement("div",{style:"position:absolute;bottom:-70px;left:20px;background-color: white;"},$("msgwindow"));*/
        var newtab = createElement("table", {border: "1px", cellspacing: "0px", cellpadding: "0px", style: "text-align:center;position:absolute;bottom:-120px;left:-100px;width:750px;background-color: white;"}, $("msgwindow"));

        var valShowUncurable = GM_getValue(lng + "_" + server + "_" + username + "_valShowUncurable", false);
        var highlightBoerse = new Object;
        var highlightBoerse1 = new Object;
        try {
            highlightBoerse = explode(GM_getValue(lng + "_" + server + "_" + username + "_highlightBoerse", "{}"));
        } catch (err) {
        }
        try {
            highlightBoerse1 = explode(GM_getValue(lng + "_" + server + "_" + username + "_highlightBoerse1", "{}"));
        } catch (err) {
        }

        var blockBoerse = explode(GM_getValue(lng + "_" + server + "_" + username + "_blockBoerse", "{}"));
        //var newdiv1 = createElement("div",{style:"display:block;"},newdiv);
        var tabrow = createElement("tr", "", newtab);
        var tabcell = createElement("td", {colspan: "20"}, tabrow);

        var newinput = createElement("input", {"id": "valShowUncurable", "type": "checkbox", "checked": valShowUncurable}, tabcell);
        newinput.addEventListener("click", function () {
            GM_setValue(lng + "_" + server + "_" + username + "_valShowUncurable", this.checked);
            click($("ex_navi").getElementsByTagName("div")[1]);
        }, false);

        createElement("span", {}, tabcell, texte["showUncurable"]);

        tabrow = createElement("tr", "", newtab);
        tabcell = createElement("td", "", tabrow);

        for (var r in Global.availableRooms) {
            if (Global.availableRooms[r].diseases.length > 0) {
                tabcell = createElement("td", "", tabrow, Global.availableRooms[r].name);
            }
        }

        /*var newdiv1 = createElement("div",{style:"display:block;background-color:green;"},newdiv);
         var newdiv2 = createElement("div",{style:"display:block;background-color:yellow;"},newdiv);
         var newdiv3 = createElement("div",{style:"display:block;background-color:#900;"},newdiv);
         */
        var newrow1 = createElement("tr", {style: "background-color:green;"}, newtab);
        var newrow2 = createElement("tr", {style: "background-color:yellow;"}, newtab);
        var newrow3 = createElement("tr", {style: "background-color:#900;"}, newtab);

        tabcell = createElement("td", "", newrow1, "Hervorheben 1");
        tabcell = createElement("td", "", newrow2, "Hervorheben 2");
        tabcell = createElement("td", "", newrow3, "Verberge");

        for (var r in Global.availableRooms) if (Global.availableRooms[r].diseases.length > 0) {

            tabcell = createElement("td", "", newrow1);
            newinput = createElement("input", {"id": "hl" + r, "type": "checkbox", "checked": highlightBoerse[r], "title": Global.availableRooms[r].name, "style": "margin-right:0px;margin-left:1px;"}, tabcell);
            newinput.addEventListener("click", function () {
                highlightBoerse[this.id.replace("hl", "")] = this.checked;
                GM_setValue(lng + "_" + server + "_" + username + "_highlightBoerse", implode(highlightBoerse));
                click($("ex_navi").getElementsByTagName("div")[1]);
            }, false);

            tabcell = createElement("td", "", newrow2);
            newinput = createElement("input", {"id": "hl1" + r, "type": "checkbox", "checked": highlightBoerse1[r], "title": Global.availableRooms[r].name, "style": "margin-right:0px;margin-left:1px;"}, tabcell);
            newinput.addEventListener("click", function () {
                highlightBoerse1[this.id.replace("hl1", "")] = this.checked;
                GM_setValue(lng + "_" + server + "_" + username + "_highlightBoerse1", implode(highlightBoerse1));
                click($("ex_navi").getElementsByTagName("div")[1]);
            }, false);

            tabcell = createElement("td", "", newrow3);
            newinput = createElement("input", {"id": "bl" + r, "type": "checkbox", "checked": blockBoerse[r], "title": Global.availableRooms[r].name, "style": "margin-right:0px;margin-left:1px;"}, tabcell);
            newinput.addEventListener("click", function () {
                blockBoerse[this.id.replace("bl", "")] = this.checked;
                GM_setValue(lng + "_" + server + "_" + username + "_blockBoerse", implode(blockBoerse));
                click($("ex_navi").getElementsByTagName("div")[1]);
            }, false);
        }
        var candtable = $("msgwindow").getElementsByTagName("table");
        candtable[0].style.width = "650px";
        candtable[0].setAttribute("class", "hoveryellow");
        var candtr = candtable[0].getElementsByTagName("tr");
        var candtd = candtr[0].getElementsByTagName("td");
        candtd[5].innerHTML = "Kaufen";
        createElement("td", {style: "text-align:right;"}, candtr[0], "Differenz");
        createElement("td", {style: "text-align:right;"}, candtr[0], "Restzeit");
        createElement("td", "", candtr[0], "");
        for (var tr = 1; tr < candtr.length; tr++) {
            candtr[tr].setAttribute("onmouseover", "");
            candtr[tr].setAttribute("onmouseout", "");
            candtd = candtr[tr].getElementsByTagName("td");
            var restlicheZeit = 0;
            var help = null;
            var uncurable = false;
            var buyable = false;
            var unwanted = false;
            var mark1 = false;
            for (var c = 0; c < candtd[2].childNodes.length; c++) {
                var disease = Global.availableDiseases[(/d_(\d+?)_15/).exec(candtd[2].childNodes[c].getAttribute("class"))[1]];
                help = candtd[2].childNodes[c].firstChild.getAttribute("class").slice(-1);
                if (help != "1") {
                    restlicheZeit += disease["basetime"];
                    if (help == "2") {
                        uncurable = true;
                    }
                    else if (help == "0") {
                        buyable = true;
                        if (highlightBoerse[disease["room"][0]]) {
                            candtd[2].style.backgroundColor = "green";
                        }
                        if (highlightBoerse1[disease["room"][0]]) {
                            mark1 = true;
                        }
                        if (blockBoerse[disease["room"][0]]) {
                            unwanted = true;
                        }
                    }
                }
            }
            if (uncurable) {
                candtd[2].style.backgroundColor = "red";
                if (unwanted || !buyable || !valShowUncurable) {
                    candtr[tr].style.display = "none";
                }
            } else {
                if (unwanted || !buyable) {
                    candtr[tr].style.display = "none";
                }
                else if (mark1) {
                    candtd[2].style.backgroundColor = "yellow";
                }
            }
            var priceMax = parseFloat(candtd[3].innerHTML.replace(regDelimThou, "").replace(regDelimDeci, "."), 10)
            candtd[3].innerHTML = "&nbsp;" + number_format(priceMax, 2);
            candtd[3].style.textAlign = "right";
            candtd[4].style.textAlign = "right";
            candtd[5].style.textAlign = "right";
            var price = parseFloat(candtd[4].innerHTML.replace(regDelimThou, "").replace(regDelimDeci, "."), 10)
            candtd[4].innerHTML = "&nbsp;" + number_format(price, 2);
            candtd[5].getElementsByTagName("a")[0].innerHTML = "&nbsp;" + number_format(100 * price / priceMax) + "%";
            candtd[5].getElementsByTagName("a")[0].addEventListener("click", function () {
                clickYes = window.setInterval(function () {
                    if (($("dlg_message").style.display != "none") && ($("btn_yes"))) {
                        click($("btn_yes"));
                        clearInterval(clickYes);
                    }
                }, 50);
            }, false);
            createElement("td", {style: "text-align:right;"}, candtr[tr], "&nbsp;" + (price > priceMax ? "+" : "") + number_format(price - priceMax, 2));
            createElement("td", {style: "text-align:right;"}, candtr[tr], "&nbsp;" + time2str(restlicheZeit, 1) + "h");
            createElement("td", {style: "text-align:right;"}, candtr[tr], "&nbsp;" + (price > priceMax ? "---" : number_format((priceMax - price) * 3600 / restlicheZeit)));
        }

        var canddiv = $("ex_navi").getElementsByTagName("div");
        canddiv[1].addEventListener("mouseover", function () {
            this.style.backgroundColor = "blue";
            click(this);
        }, false);
        newdiv = null;
        newselect = null;
        newselect1 = null;
        candtable = null;
        candtr = null;
        candtd = null;
        canddiv = null;
    }

    function do_Shop() {
        var cand = $("dropzonesource").getElementsByTagName("div");
        for (var v in cand) {
            if (cand[v].addEventListener) {
                cand[v].addEventListener("mousedown", function () {
                    $("dropzonetarget").style.border = "2px solid red";
                }, false);

                cand[v].addEventListener("mouseup", function () {
                    $("dropzonetarget").style.border = "";
                }, false);
            }
        }

        cand = null;
    }

//***********************************************************************************************************

    function do_login() {
        var loc = reg2.exec(document.location.href);

        //Auto backing to login page
        if (loc[2].search("logout") != -1) {
            window.setTimeout(function () {
                document.location.href = "http://www" + gamepage;
            }, 100);
        }
        else {
            //login
            try {
                var logindata = explode(GM_getValue("logindata", "[]"));
            }
            catch (err) {
                var logindata = new Array;
            }

            unsafeWindow.showDiv("login_div");
            $("login_div").style.zIndex = "20";
            $("login_div").getElementsByClassName("kh_btn")[0].addEventListener("click", function () {
                var currServer = $("l_server").value;
                var currUser = $("l_loginname").value.toLowerCase();
                GM_setValue(lng + "_" + currServer + "_username", currUser);
            }, false);

            function submit_login(currUserNr) {
                $("l_server").value = logindata[currUserNr][1];
                $("l_loginname").value = logindata[currUserNr][2];
                $("l_password").value = logindata[currUserNr][3];
                $("login_div").getElementsByClassName("kh_btn")[0].click();
            }

            var newdiv = createElement("div", {style: "position:absolute;top:0px;left:0px;width:412px;padding:10px;background-color:#999;-moz-border-radius:10px;"}, $("login_div"));
            var newbutton;
            for (var v = 0; v < logindata.length; v++) if (logindata[v][1] != "0") {
                newbutton = createElement("button", {type: "button", class: "cursorclickable", id: "autologin" + v, style: "width:200px;height:20px;margin:3px;"}, newdiv, texte["server"] + " " + logindata[v][1] + "." + logindata[v][0] + ": " + logindata[v][2]);
                newbutton.addEventListener("click", function () {
                    submit_login(this.id.replace("autologin", ""));
                }, false);
            }
            newdiv = null;
            newbutton = null;
        }
    }

    /*************************** end function declarations **************************/

}, false);