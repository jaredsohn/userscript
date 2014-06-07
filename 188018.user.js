// ==UserScript==
// @name        		NumExpress vGates
// @namespace   		NumExpress vGates
// @description 		NumExpress vGates
// @include     		http://10.25.97.161/numexpress/resultat_version_3_0.php*
// @version     		0.9.2
// @require     		https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @updateURL     		https://userscripts.org/scripts/source/188018.meta.js
// @downloadURL     	https://userscripts.org/scripts/source/188018.user.js
// ==/UserScript==


var NDI = "";
var gix_auth_try = true;

GM_registerMenuCommand("Set GIX login/Password", Set_Login_GIX);

function Set_Login_GIX() {

    var login_gix = prompt("Renseignez votre Login Gix", "");
    GM_setValue("login_gix", login_gix);

    var password_gix = prompt("Renseignez mot de passe Gix en clair", "");
    GM_setValue("password_gix", password_gix);
}

var wait_en_boucle = setInterval(WaitMyRecherheNDI, 2000);
// Test_GIX_Auth();

function WaitMyRecherheNDI() {

    if ($("center > b:eq(0)").size() == 0) return;
    else {
        clearInterval(wait_en_boucle);

        NDI = $("center > b:eq(0)").text();
        // alert("gogogogo");
        Go_GIX();
        MEP_Resume();
        MEP_Log();
        $("big:eq(1)").text("NumExpress WEB vGates");

        Go_APNF();

    }
}

function GIX_Auth() {

    GM_xmlhttpRequest({
        method: "POST",
        url: 'http://gix-prod-neufcegetel.private.sfr.com:6665/verifierlogin.php',
        data: 'login=' + GM_getValue("login_gix") + '&password=' + GM_getValue("password_gix") + '&authenticate=1',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(response) {
            console.log("POST auth GIX envoyé");
            gix_auth_try = false;
            Go_GIX();
        }
    });
}

function GoNumex(ndi_ou_prefix) {

    $("<tr id=Log_Numex></tr>").appendTo("table#log_vgates");

    GM_xmlhttpRequest({
        method: "POST",
        url: 'http://10.25.97.161/numexpress/resultat_version_3_0.php',
        data: 'ChoixFormulaire=Recherche d un numero&BoutonValidation=Valider&Attributaire=' + encodeURIComponent("*") + '&Numero=' + ndi_ou_prefix,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onerror: function(response) {
            // alert("on error POST");
            $("#Log_Numex").text("NumExpress HS").css({
                "color": "red"
            });
        },
        onload: function(response) {
            // alert("in GM_xmlhttpRequest POST")

            $("#Log_Numex").text("NumExpress - OK").css({
                "color": "green"
            });

            var codeHTML = response.responseText;
            // alert(codeHTML);

            var center = $(codeHTML).find("table").html();

            var table_numex_1 = $(codeHTML).find('table[width="80%"]').eq(0);
            var table_numex_2 = $(codeHTML).find('table[width="80%"]').eq(1);
            // alert(center);

            var tableau1 = '<br>NumExpress - ' + ndi_ou_prefix + '<br>';
            tableau1 += '<table id="Numex_vGates_1" width="80%" border="1" align="center">';
            tableau1 += table_numex_1.html();
            tableau1 += '</table>';

            var tableau2 = '<br>NumExpress - ' + ndi_ou_prefix + '<br>';
            tableau2 += '<table id="Numex_vGates_2" width="80%" border="1" align="center">';
            tableau2 += table_numex_2.html();
            tableau2 += '</table>';

            $("<div>" + tableau1 + "</div>").appendTo("body");
            $("<div>" + tableau2 + "</div>").appendTo("body");

            var SWITCH_CIBLE = $("table#Numex_vGates_2 tr:eq(1) td:eq(11)").text();
            var Techno = $("table#Numex_vGates_2 tr:eq(1) td:eq(10)").text();
            // alert(SWITCH_CIBLE);

            // $('<tr>Switch : '+SWITCH_CIBLE+'</tr>').appendTo("div#resume");
            $("tr#switch").text("Switch : " + SWITCH_CIBLE);
            $("tr#techno").text("Techno : " + Techno);

            Go_Intranet_NDI('crm');

        }
    });
}

function Go_GIX() {

    // $("<tr id=Log_GIX></tr>").appendTo("table#log_vgates");

    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://gix-prod-neufcegetel.private.sfr.com:6665/main.php?display=listnp&test=NDI&prefixe=&prefixeadmin=&numero=' + NDI + '&TypeNumero=NDI&domaine=',
        onload: function(response) {

            $("<tr id=Log_GIX></tr>").appendTo("table#log_vgates");

            $("#Log_GIX").text("GIX chargé").css({
                "color": "black"
            });

            var codeHTML = '<div>' + response.responseText + '</div>';
            codeHTML = codeHTML.replace(/<img[^>]*>/g, "");

            // alert(codeHTML);
            if ($(codeHTML).find('h3').text() == 'GIX - Authentification') {
                // alert($(codeHTML).find('h3').text());
                // alert("GIX - Authentification");
                $("#Log_GIX").html("GIX - <a target=_blank href=http://gix-prod-neufcegetel.private.sfr.com:6665/authentification.php>Authentification</a>").css({
                    "color": "red"
                });

                if (gix_auth_try) {
                    GIX_Auth();
                }

            } else {

                $("#Log_GIX").text("GIX - OK").css({
                    "color": "green"
                });

                var tab_gix = $(codeHTML).find("table.contour");

                var tableau = 'GIX - ' + NDI + '<br>';
                tableau += '<table id="Gix_vGates" class="contour" width="100%" cellspacing="0" cellpadding="5" border="0" align="center">';
                tableau += tab_gix.html();
                tableau += '</table>';

                $("<div>" + tableau + "</div>").appendTo("body");

                ApplyCSS_GIX();

                var test_result = $(codeHTML).find("table tr:eq(2)").text();
                // alert(test_result);

                if (test_result != "0 - 0 sur (0)") {

                    var prefix = $("#Gix_vGates tr:eq(1) td:eq(1)").text()

                    GoNumex(prefix);
                    // alert("go numex prefix");
                } else {
                    Go_Intranet_NDI('crm');
                }


                Go_Calypso();

            }
        }
    });
}

function Go_Calypso() {

    $("<tr id=Log_Calypso></tr>").appendTo("table#log_vgates");

    GM_xmlhttpRequest({
        method: "POST",
        url: 'http://calypso.private.sfr.com/calypso/actionSuiviRechercher.do?ndi=' + NDI,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded ; charset=ISO-8859-1"
        }, // charset=ISO-8859-1'  charset=UTF-8
        onload: function(response) {

            $("#Log_Calypso").text("Calypso en cours").css({
                "color": "black"
            });

            var codeHTML = '<div>' + response.responseText + '</div>';
            // alert(codeHTML);
            codeHTML = codeHTML.replace(/<img[^>]*>/g, "");

            var testlogin = $(codeHTML).find("div#pageErreur").size();

            if (testlogin != 0) {
                // alert("pas d'autehntification Calypso");
                $("#Log_Calypso").text("Calypso non logué").css({
                    "color": "red"
                });

                GM_xmlhttpRequest({
                    method: "POST",
                    url: 'http://calypso.private.sfr.com/calypso/actionLogin.do',
                    data: 'userName=stc&password=stc',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded ; charset=ISO-8859-1"
                    },
                    onload: function(response) {
                        // alert("log in Calypso");
                        $("#Log_Calypso").text("Calypso Authentication en cours").css({
                            "color": "red"
                        });
                        Go_Calypso();
                    }
                });

            } else {

                $("#Log_Calypso").text("Calypso - OK").css({
                    "color": "green"
                });

                var tab_calypso = $(codeHTML).find("div#laListe");
                var nbr_result = $(codeHTML).find("div.textdonnees");

                var tableau = '<br>Calypso - ' + NDI + '<br>';
                // tableau += '<table id="Calypso_vGates" color="#000000">';
                tableau += tab_calypso.html();
                // tableau += '</table>';
                tableau += nbr_result.html();

                $("<div id='Calypso_vGates'>" + tableau + "</div>").appendTo("body");

                ApplyCSS_Calypso();

                var nombre_de_resultat = $("#Calypso_vGates").text();
                nombre_de_resultat = nombre_de_resultat.charAt(nombre_de_resultat.length - 3);
                // alert(nombre_de_resultat);
                if (nombre_de_resultat != 0) {
                    $("tr#vgast").text("VGAST");
                };

            }
        }
    });
}

function Go_Intranet_NDI(base) {
    // alert("in");
    $("<tr id=Log_Intranet_NDI></tr>").appendTo("table#log_vgates");

    GM_xmlhttpRequest({
        method: "POST",
        // url: 'http://intrandi.prod.ld/menu_principal/etat_reseau/'+base+'.php', 
        url: 'http://intrandi-prod.private.sfr.com/menu_principal/etat_reseau/' + base + '.php',
        data: 'ndi=' + NDI.substr(1),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onerror: function(response) {
            // alert("on error POST");

            $("#Log_Intranet_NDI").text("Intranet NDI HS").css({
                "color": "red"
            });
        },
        onload: function(response) {

            $("#Log_Intranet_NDI").text("Intranet NDI - OK").css({
                "color": "green"
            });

            var codeHTML = '<div>' + response.responseText + '</div>';

            console.log(codeHTML);


            var tableau = '<br>Intranet NDI - ' + base + '<br>';
            tableau += '<table id="Intranet_NDI_' + base + '"><tr class="entete"></tr><tr class="info"></tr></table>';

            $("<div id='Intranet_NDI_" + base + "''>" + tableau + "</div>").appendTo("body");

            var nbr_colone_entete = 0;
            var nbr_colone_autre = 0;
            var nbr_ligne = 1;

            if (base == 'details') {
                var info = $(codeHTML).find("div:eq(0)").html();
                $("<br>" + info + "<br>").appendTo("div#Intranet_NDI_" + base);

                codeHTML = $(codeHTML).find("div:eq(1)").html();
                codeHTML = '<div>' + codeHTML + '</div>';

            }


            $(codeHTML).find("div#entete").each(function() {

                nbr_colone_entete++;
                var TD = '<td>' + $(this).html() + '</td>';
                $(TD).appendTo("table#Intranet_NDI_" + base + " tr:eq(0)");

            });

            $(codeHTML).find("div div:not(#entete)").each(function() {
                nbr_colone_autre++;

                if (nbr_colone_autre > nbr_colone_entete) {
                    nbr_ligne++;
                    nbr_colone_autre = 1;
                    $('<tr class="info"></tr>').appendTo("table#Intranet_NDI_" + base);
                }

                var TD = '<td>' + $(this).html() + '</td>';
                $(TD).appendTo("table#Intranet_NDI_" + base + " tr:eq(" + nbr_ligne + ")");

            });


            ApplyCSS_Intranet_NDI();

            if (base == 'crm') {
                Go_Intranet_NDI('cerbere');
            } else if (base == 'cerbere') {
                Go_Intranet_NDI('saphir');
            } else if (base == 'saphir') {
                Go_Intranet_NDI('details');
            } else if (base == 'details') {
                // $(codeHTML).appendTo("table#Intranet_NDI_"+base);
            }
        }
    });
}

function Go_APNF() {
    $("<tr id=Log_APNF></tr>").appendTo("table#log_vgates");

    var init_J_ID = GM_xmlhttpRequest({
        method: "GET",
        url: 'http://10.118.8.94/sic/admin/faces/referentiel/historique.jsp',
        synchronous: true,
    });

    init_J_ID = init_J_ID.responseText;
    init_J_ID = init_J_ID.replace(/<img[^>]*>/g, "");

    var J_ID = $(init_J_ID).find("input#javax\\.faces\\.ViewState").attr("value");
    var J_ID_JSP = $(init_J_ID).find("form").attr("id");
    var J_ID_JSP_long = J_ID_JSP + ":" + J_ID_JSP.substring(0, J_ID_JSP.lastIndexOf("_"));

    console.log(J_ID);
    console.log(J_ID_JSP);
    console.log(J_ID_JSP_long);


    GM_xmlhttpRequest({
        method: "POST",
        url: 'http://10.118.8.94/sic/admin/faces/referentiel/historique.jsp',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded ; charset=ISO-8859-1"
        }, // charset=ISO-8859-1'  charset=UTF-8
        data: J_ID_JSP + '=' + J_ID_JSP + '&' + J_ID_JSP_long + '_7=0&' + J_ID_JSP_long + '_10=' + NDI + '&' + J_ID_JSP_long + '_14=on&' + J_ID_JSP_long + '_16=on&javax.faces.ViewState=' + J_ID + '&' + J_ID_JSP_long + '_19=' + J_ID_JSP_long + '_19',
        // data: 'j_id_jsp_1342688964_2=j_id_jsp_1342688964_2&j_id_jsp_1342688964_2:j_id_jsp_1342688964_7=0&j_id_jsp_1342688964_2:j_id_jsp_1342688964_10=' + NDI + '&j_id_jsp_1342688964_2:j_id_jsp_1342688964_14=on&j_id_jsp_1342688964_2:j_id_jsp_1342688964_16=on&javax.faces.ViewState=' + J_ID + '&j_id_jsp_1342688964_2:j_id_jsp_1342688964_19=j_id_jsp_1342688964_2:j_id_jsp_1342688964_19',

        onload: function(response) {

            var codeHTML = '<div>' + response.responseText + '</div>';
            codeHTML = codeHTML.replace(/<img[^>]*>/g, "");

            $("#Log_APNF").text("APNF en cours").css({
                "color": "black"
            });

            // alert(response.finalUrl);

            if (response.finalUrl == "http://10.118.8.94/sic/admin/faces/security/captcha.jsp") {

                $("#Log_APNF").html("APNF - <a target=_blank href=http://10.118.8.94/sic/admin/faces/security/captcha.jsp>CAPTCHA</a>").css({
                    "color": "red"
                });


            } else if ($(codeHTML).find("h1:eq(0)").text() == 'Erreur') {


                $("#Log_APNF").html("APNF - J_ID").css({
                    "color": "red"
                });

            } else {


                console.log(codeHTML);

                var tableau = '<br>APNF - ' + NDI + ' - Historique du Numéro<br>';

                tableau += '<table class="APNF">'
                tableau += $(codeHTML).find("table.resultattab").eq(0).html();
                tableau += '</table>'

                tableau += '<br>APNF -  ' + NDI + ' - Annonce en Cours <br>';

                tableau += '<table class="APNF">'
                tableau += $(codeHTML).find("table.resultattab:eq(1)").html();
                tableau += '</table>'


                // console.log(tableau);

                $("<div>" + tableau + "</div>").appendTo("body");

                ApplyCSS_APNF();

                $("#Log_APNF").text("APNF - OK").css({
                    "color": "green"
                });
            }


        }
    });
}

function MEP_Resume() {
    $("<div id=resume><center><b>Résumé</b></center><table id='resume'><tr id='NDI'></tr><tr id='switch'></tr><tr id='techno'></tr><tr id='vgast'></tr></table></div>")
        .css({
            "top": "100px",
            "left": "10%",
            "position": "absolute",
            "padding": "10px"
        })
        .appendTo("body");

    $("table#resume").css({
        "border": "1px solid black",
        "background-color": "#ECF2ED"
    });

    // $("<tr>NDI : "+NDI+"</tr>").appendTo("div#resume");
    $("tr#NDI").text("NDI : " + NDI);
}

function MEP_Log() {
    $("<div id=log_vgates><center><b>Log </b>(<a id=log_vgates href=#><small>hide</small></a>)</center><table id='log_vgates'></table></div>")
        .css({
            "top": "100px",
            "right": "10%",
            "position": "absolute",
            "padding": "10px"
        })
        .appendTo("body");

    $("table#log_vgates").css({
        "border": "1px solid black",
        "background-color": "#ECF2ED"
    });

    $("a#log_vgates").click(function() {
        $("table#log_vgates").toggle();

        if ($("a#log_vgates small").text() == "show") {
            $("a#log_vgates small").text("hide");
        } else if ($("a#log_vgates small").text() == "hide") {
            $("a#log_vgates small").text("show");
        };
    });

    // $("tr#log_GIX").text("Gogogogo");
}

function ApplyCSS_GIX() {

    $("tr.gixtitle").css({
        "background-color": "#820052",
        "color": "white",
        "FONT-WEIGHT": "bold",
        "text-align": "center"
    });

    $("table.contour").css({
        "border": "1px solid #CCCCCC",
        "border-collapse": "collapse",
        "background-color": "#f5f5f5",
        "FONT-SIZE": "11px",
        "FONT-STYLE": "normal",
        "FONT-FAMILY": "Verdana, Arial"
    });
}

function ApplyCSS_Calypso() {

    $("td.FORM_Layout").css({
        "background-color": "#EEEEEE",
        "font-family": "Arial,Helvetica",
        "font-size": "12px",
        "font-weight": "normal",
        "text-align": "center",
        "text-decoration": "none"
    });

    $("th.FORM_Layout").css({
        "border-color": "#B8B8B8",
        "border-left": "1px solid #B8B8B8",
        "border-right": "1px solid #B8B8B8",
        "border-style": "solid",
        "border-width": "1px",
        "font-family": "Arial,Helvetica",
        "font-size": "12px",
        "font-weight": "bold",
        "text-align": "center",
        "text-decoration": "none"
    });
}

function ApplyCSS_Intranet_NDI() {

    $("table[id^='Intranet']").css({
        "border": "1px solid black",
        // "float": "left",
        "text-align": "center",
    });

    $("tr.entete").css({
        "background-color": "#ECF2ED",
        "border-top": "1px solid #000000",
        "font-weight": "bold"
    });

    $("tr.info").css({
        "border": "1px solid #ECF2ED",
    });
}

function ApplyCSS_APNF() {

    $("table.APNF").css({
        "border": "1px solid #00567C",
        "border-spacing": "1px",
        "margin": "10px auto",
        "padding": "1px",
        "text-align": "center",
        "color": "#00567C",
        "font-family": "Helvetica,Arial",
        "font-size": "12px"
    });


    $(".tabheader").css({
        "background": "none repeat scroll 0 0 #97BFDA",
        "font-weight": "bold"
    });

    $(".tabrow").css({
        "background": "none repeat scroll 0 0 #BBCBD2",
    });

    $("a.infobulle").css({
        "cursor": "help",
        "position": "relative",
        "text-decoration": "none"
    });

    $("a.infobullefin").css({
        "cursor": "help",
        "position": "relative",
        "text-decoration": "none"
    });

    $("a.infobullefin span").css({
        "left": "-5000em",
        "position": "absolute"
    });


    $("a.infobullefin").mouseover(function() {
        $(this).find("span").css({
            "background": "none repeat scroll 0 0 #DAE9ED",
            "border": "2px dashed #FFF0C4",
            "color": "#086989",
            "font": "12px Verdana,Arial,Helvetica,sans-serif",
            "height": "auto",
            "left": "-200px",
            "padding": "2px 3px",
            "top": "5px",
            "visibility": "visible",
            "width": "200px",
            "z-index": "99"
        });
    });


    $("a.infobullefin").mouseout(function() {
        $(this).find("span").css({
            "left": "-5000em",
            "position": "absolute"
        });
    });


    $("a.infobulle").mouseover(function() {
        $(this).find("span").css({
            "background": "none repeat scroll 0 0 #DAE9ED",
            "border": "2px dashed #FFF0C4",
            "color": "#086989",
            "font": "12px Verdana,Arial,Helvetica,sans-serif",
            "height": "auto",
            "left": "50px",
            "padding": "2px 3px",
            "top": "5px",
            "visibility": "visible",
            "width": "200px",
            "z-index": "99"
        });
    });


    $("a.infobulle").mouseout(function() {
        $(this).find("span").css({
            "left": "-5000em",
            "position": "absolute"
        });
    });

}