// ==UserScript==
// @name           DiagVGates sur Userscript
// @namespace      DiagVGatessurUserscript
// @version        11.1
// @updateURL      https://userscripts.org/scripts/source/131666.meta.js
// @downloadURL    https://userscripts.org/scripts/source/131666.user.js
// @description    script sur le serveur
// @include        https://www.diag.sfr.net/index.php?task=homepage&*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


// var GM_serveur='10.92.80.21:8113';  // preprod
// var GM_serveur = 'intranetstc-dev.private.sfr.com:8113'; // preprod
var GM_serveur = 'intranetstc.private.sfr.com:8113'; // Prod

var GM_dossier = 'http://' + GM_serveur + '/macro/'; // HTTP
// var GM_dossier = 'https://' + GM_serveur + '/macro/'; // HTTPS

// var GM_serveur='10.102.233.50:80';
// var GM_dossier='http://'+GM_serveur+'/GM/';


//alert(jQuery(document).jquery);

GM_registerMenuCommand("Login Encara", Set_Login_Encara);
GM_registerMenuCommand("Password Encara", Set_Password_Encara);

GM_registerMenuCommand("Set Ulysses login/Password", Set_Login_Ulysses);


var nbr_auth_encara = 0;
var nbr_auth_encara_retry = 0;
var auth_ref_cpe = false;

var wait_en_boucle = 0;

function Set_Login_Encara() {

    var login_encara = prompt("Renseignez votre gros U", "");
    GM_setValue("login_encara", login_encara);
}

function Set_Password_Encara() {

    var password_encara = prompt("Renseignez votre mot de passe en clair :)", "");
    GM_setValue("password_encara", password_encara);
}

function Set_Login_Ulysses() {

    var login_ulysses = prompt("Renseignez votre Login Ulysses", "");
    GM_setValue("login_ulysses", login_ulysses);

    var password_ulysses = prompt("Renseignez mot de passe Ulysses en clair", "");
    GM_setValue("password_ulysses", password_ulysses);
}

var monblocscript = $("script:contains(Diag.JSON.init)").text();

var ma_ligne_json_init = monblocscript.split('\n')[5];

var mon_json_init = ma_ligne_json_init.substring(ma_ligne_json_init.indexOf('custinfo = ') + 11, ma_ligne_json_init.lastIndexOf(';'));

var obj = jQuery.parseJSON(mon_json_init);

document.title = obj.CltNom;

var Nom_Client = obj.CltNom.replace(/'/g, " "); // probleme de l'apostrophe dans teraterm pour la connexion CPE
var Nom_OFFRE = obj.realNameOffre;
var ID_LDCOM = obj.idLdcom;
var Infra = obj.infra; //alert(Infra);

var inverse = false;
var modif_interface = true;
var bloc_tech_avant_modif;
var bloc_tech_apres_modif;

var url_ipsite_bench = 'https://www.e-sav-test.operateurs.orange-business.com/ipsiteBench/searchDiagnosticFormDisplay.do?dontReset=true';

var CE2O_feuille = 'NC';
var CE2O_tronc = 'NC';
var CE2O_vlan = 'NC';
var ref_LPT = 'NC';

// var Outils SAV
var SAV_NDI = '';
var SAV_DSLE = '';
var SAV_LPT = '';
var SAV_CE2O = '';
var SAV_Fibre_SFR = '';
var SAV_Offre = '';
var SAV_DSLAM = '';
var SAV_CPE = '';
var SAV_CPE_L2L3 = '';
var SAV_CPE_Tab = new Array();
var SAV_CPE_Barre_STC = '';
var SAV_CPE_Barre_STC_Tab = new Array();

var menu_info_DSL_Barre_STC = '';

var Nom_OFFRE_URL = '';
var Nom_OFFRE_URL_2 = '';

// REF CPE

var CPE_Conf_CVS_Tab = new Array();

var ID_Societe = '';
var Nom_Site = '';

var Nbr_CPE = 0;
var Nbr_CPE_count = 0;
var Nbr_CPE_L2_count = 0;
var nbr_L2_loop = 1;
var Nbr_M2DB_count = 0;
var Topologie = '';


GetInfoCPE();
Remove_Logo();
MEP_Baniere();
MEP_Fleche();
MEP_Carte();

Ulysses_Services();

MEP_Listing_Site();
MEP_Info_Lien();
MEP_SAV();
MEP_Bloc_Technique();
MEP_listing_Service();

if (Infra != 'thd') {
    Launch_Info_DSL(ID_LDCOM);
} else {
    // Launch_Info_THD();
    // à la fin de la chaine technique
}

function GetInfoCPE() {
    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://toolbox-cpe-prod-neuf.private.sfr.com:8080/reporting/supstat/sites_cpe.php?gid_master=' + encodeURIComponent(obj.masterID) + '&option=',
        onload: function(response) {
            var codeHTML = response.responseText;
            codeHTML = codeHTML.replace(/<img[^>]*>/g, "");

            var codeHTML_div = '<div>' + response.responseText + '</div>';
            codeHTML_div = codeHTML_div.replace(/<img[^>]*>/g, "");

            ID_Societe = $(codeHTML).find('#tab-resultat tbody a').eq(0).html();
            Nom_Site = $(codeHTML).find('#tab-resultat tbody tr td').eq(5).text();

            if (Nom_OFFRE == 'LPT Locale 2048k') {
                Nom_OFFRE = $(codeHTML).find('#tab-resultat tbody tr td').eq(3).text();
            }

            Launch_Listing_Service_et_Stats();
            Launch_Entete_Service();
            wait_en_boucle = setInterval(WAITchainetechRecapClient, 500);

            Nbr_CPE = $(codeHTML).find('#tab-resultat tbody tr').size();
            Nbr_CPE_count = Nbr_CPE;


            if (Nbr_CPE > 0) {

                // Title " Nom Client | Nom Site "
                document.title = $(codeHTML).find('#tab-resultat tbody a').eq(1).html() + ' | ' + Nom_Site;

                var num_cpe = 0;

                $(codeHTML).find('#tab-resultat tbody tr').each(function() {
                    var CPE_Hostname = $(this).find('td').eq(6).text();
                    var CPE_IP = $(this).find('td').eq(8).text();
                    var CPE_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(9).text();
                    var CPE_Modele = 'NC';

                    var debut_hostname = CPE_Hostname.substring(0, 5);

                    if (debut_hostname == 'HW2EN' || debut_hostname == 'CPEL2') {
                        Nbr_CPE_L2_count = Nbr_CPE_L2_count + 1;
                    }

                    num_cpe++;

                    $("p#Topologie").html(Nom_OFFRE + " - " + CPE_Topologie);

                    $("table#Bloc_Technique_CPE").append("<tr id='" + CPE_Hostname + "'><td></td> <td>b</td> <td width=9 align='right'>[</td><td id='CVS'></td> <td> - </td> <td id='lastRev'></td> <td>] - </td> <td></td> </tr>")

                    $("table#Bloc_Technique_CPE tr#" + CPE_Hostname + " td:eq(1)").html('<a title="' + CPE_IP + '"target=_blank href="' + GM_dossier + 'CreationBat.php?action=cpetoolbox&hostname=' + CPE_IP + '&typeCPE=' + CPE_Modele + '&typeOffre=' + encodeURIComponent(obj.realNameOffre) + '&NomClient=' + encodeURIComponent(Nom_Client) + '">' + CPE_Hostname + '</a>')

                    $("table#Bloc_Technique_CPE tr#" + CPE_Hostname + " td:eq(7)").html('[<a target=_blank href="http://toolbox-cpe-prod-neuf.private.sfr.com:8080/SupCPE/infos_cpe.php?cpe=' + CPE_Hostname + '&master_id=' + obj.masterID + '">Sup</a>]');

                    HADES(CPE_IP, num_cpe, CPE_Hostname);
                    Launch_Infos_CPE(CPE_Hostname, num_cpe, Nbr_CPE);
                });

            } else if ($(codeHTML_div).find(":contains('MDB2')").size() > 0) {
                // alert("bug MDB2");
                Nbr_M2DB_count = Nbr_M2DB_count + 1;

                if (Nbr_M2DB_count < 4) {
                    //en plein de dans
                    setTimeout(function() {
                        GetInfoCPE()
                    }, 2000);
                } else {

                    SAV_CPE = '<br>Pas d Info CPE retrouvée (BUG M2DB)';
                    SAV_CPE_Barre_STC = '<br>Pas d Info CPE retrouvée (BUG M2DB)';

                    Outils_SAV();
                    Outils_Barre_STC("Pas d Info CPE retrouvée (BUG M2DB)");
                }
            } else {
                var hostnameCPE = obj.login.split('@')[0];
                Launch_Infos_CPE(hostnameCPE, 1, 1);

            }
        }
    });
}

function GetInfoCPE_old() {
    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://toolbox-cpe-prod-neuf.private.sfr.com:8080/reporting/supstat/sites_cpe.php?gid_master=' + encodeURIComponent(obj.masterID) + '&option=',
        onload: function(response) {
            var codeHTML = response.responseText;
            codeHTML = codeHTML.replace(/<img[^>]*>/g, "");

            var codeHTML_div = '<div>' + response.responseText + '</div>';
            codeHTML_div = codeHTML_div.replace(/<img[^>]*>/g, "");

            ID_Societe = $(codeHTML).find('#tab-resultat tbody a').eq(0).html();
            Nom_Site = $(codeHTML).find('#tab-resultat tbody tr td').eq(5).text();

            if (Nom_OFFRE == 'LPT Locale 2048k') {
                Nom_OFFRE = $(codeHTML).find('#tab-resultat tbody tr td').eq(3).text();
            }

            Nbr_CPE = $(codeHTML).find('#tab-resultat tbody tr').size();
            Nbr_CPE_count = Nbr_CPE;
            //alert(Nbr_CPE);

            $(codeHTML).find('#tab-resultat tbody tr').each(function() {
                var CPE_Hostname = $(this).find('td').eq(6).text();
                var CPE_IP = $(this).find('td').eq(8).text();
                var CPE_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(9).text();

                $("p#Topologie").html(Nom_OFFRE + " - " + CPE_Topologie);

                $("table#Bloc_Technique_CPE").append("<tr id='" + CPE_Hostname + "'><td></td> <td>b</td> <td width=9 align='right'>Conf : </td><td></td> <td> - </td> <td></td> </tr>")

                $("table#Bloc_Technique_CPE tr#" + CPE_Hostname + " td:eq(1)").html('<a title="' + CPE_IP + '"target=_blank href="' + GM_dossier + 'CreationBat.php?action=cpetoolbox&hostname=' + CPE_IP + '&typeCPE=' + CPE_1_Modele + '&typeOffre=' + encodeURIComponent(obj.realNameOffre) + '&NomClient=' + encodeURIComponent(Nom_Client) + '">' + CPE_Hostname + '</a>')

                HADES(CPE_IP, 1, CPE_Hostname);
            });

            // GM_addStyle(".#Bloc_Technique_CPE tr {border-color: #999999; border-style: solid; border-width: 1px;padding: 0px;}");

            if (Nbr_CPE > 0) {

                // Title " Nom Client | Nom Site "
                document.title = $(codeHTML).find('#tab-resultat tbody a').eq(1).html() + ' | ' + Nom_Site;

                if (Nbr_CPE > 0) {
                    //alert("1 seul CPE");
                    CPE_1_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(6).text();
                    CPE_1_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(8).text();
                    CPE_1_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(9).text();

                    var debut_hostname_1 = CPE_1_Hostname.substring(0, 5);
                    var fin_hostname_CPE_1 = CPE_1_Hostname.substr(CPE_1_Hostname.length - 2);

                    if (debut_hostname_1 == 'HW2EN' || debut_hostname_1 == 'CPEL2') {
                        CPE_1_Modele = 'L2_HUAWEI';
                        Nbr_CPE_L2_count = Nbr_CPE_L2_count + 1;
                    }
                    // else{ CPE_1_Modele = obj.iadModel; }

                    hostnameCPE = CPE_1_Hostname;
                    Topologie = CPE_1_Topologie;

                    Launch_Infos_CPE(CPE_1_Hostname, 1, Nbr_CPE);
                }

                if (Nbr_CPE > 1) {
                    //alert("2 CPE");

                    CPE_2_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(6).text();
                    CPE_2_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(8).text();
                    CPE_2_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(9).text();

                    if (CPE_1_Topologie == 'adduction' && CPE_2_Topologie == 'adduction') {
                        Topologie = 'Adduction';
                    } else {
                        Topologie = CPE_1_Topologie + ' + ' + CPE_2_Topologie;
                    }

                    var debut_hostname_2 = CPE_2_Hostname.substring(0, 5);
                    var fin_hostname_CPE_2 = CPE_2_Hostname.substr(CPE_2_Hostname.length - 2);

                    if (fin_hostname_CPE_2 == '_A') {
                        hostnameCPE = CPE_2_Hostname;
                        Topologie = CPE_2_Topologie;
                    }
                    if (debut_hostname_2 == 'HW2EN' || debut_hostname_2 == 'CPEL2') {
                        CPE_2_Modele = 'L2_HUAWEI';
                        Topologie = CPE_1_Topologie;
                        Nbr_CPE_L2_count = Nbr_CPE_L2_count + 1
                    }

                    Launch_Infos_CPE(CPE_2_Hostname, 2, Nbr_CPE);
                }

                if (Nbr_CPE > 2) {
                    //alert("3 CPE");

                    CPE_3_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(2).find('td').eq(6).text();
                    CPE_3_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(2).find('td').eq(8).text();
                    CPE_3_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(2).find('td').eq(9).text();

                    var debut_hostname_3 = CPE_3_Hostname.substring(0, 5);
                    var fin_hostname_CPE_3 = CPE_3_Hostname.substr(CPE_3_Hostname.length - 2);


                    if (fin_hostname_CPE_3 == '_A') {
                        hostnameCPE = CPE_3_Hostname;
                        Topologie = CPE_3_Topologie;
                    }
                    if (debut_hostname_3 == 'HW2EN' || debut_hostname_3 == 'CPEL2') {
                        CPE_3_Modele = 'L2_HUAWEI';
                        Nbr_CPE_L2_count = Nbr_CPE_L2_count + 1
                    }

                    Launch_Infos_CPE(CPE_3_Hostname, 3, Nbr_CPE);
                }

                if (Nbr_CPE > 3) {
                    //alert("4 CPE");

                    CPE_4_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(3).find('td').eq(6).text();
                    CPE_4_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(3).find('td').eq(8).text();
                    CPE_4_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(3).find('td').eq(9).text();

                    var debut_hostname_4 = CPE_4_Hostname.substring(0, 5);
                    var fin_hostname_CPE_4 = CPE_4_Hostname.substr(CPE_4_Hostname.length - 2);


                    if (fin_hostname_CPE_4 == '_A') {
                        hostnameCPE = CPE_4_Hostname;
                        Topologie = CPE_4_Topologie;
                    }
                    if (debut_hostname_4 == 'HW2EN' || debut_hostname_4 == 'CPEL2') {
                        CPE_4_Modele = 'L2_HUAWEI';
                        Nbr_CPE_L2_count = Nbr_CPE_L2_count + 1
                    }

                    Launch_Infos_CPE(CPE_4_Hostname, 4, Nbr_CPE);
                }

                wait_en_boucle = setInterval(WAITchainetechRecapClient, 500);

                Launch_Listing_Service_et_Stats();
                Launch_Entete_Service();
            } else if ($(codeHTML_div).find(":contains('MDB2')").size() > 0) {
                // alert("bug MDB2");
                Nbr_M2DB_count = Nbr_M2DB_count + 1;

                if (Nbr_M2DB_count < 4) {
                    //en plein de dans
                    setTimeout(function() {
                        GetInfoCPE()
                    }, 2000);
                } else {
                    wait_en_boucle = setInterval(WAITchainetechRecapClient, 500);

                    Launch_Listing_Service_et_Stats();
                    Launch_Entete_Service();

                    SAV_CPE = '<br>Pas d Info CPE retrouvée (BUG M2DB)';
                    SAV_CPE_Barre_STC = '<br>Pas d Info CPE retrouvée (BUG M2DB)';

                    Outils_SAV();
                    Outils_Barre_STC("Pas d Info CPE retrouvée (BUG M2DB)");
                }
            } else {
                // alert('pas de CPE retrouvé pour'+obj.masterID);

                //alert(obj.masterID);
                hostnameCPE = obj.login.split('@')[0];
                // Launch_Conf_et_CVS();
                wait_en_boucle = setInterval(WAITchainetechRecapClient, 500);

                Launch_Listing_Service_et_Stats();
                Launch_Entete_Service();
            }
        }
    });
}

function WAITchainetechRecapClient() {
    if (document.getElementById("chainetechRecapClient").getElementsByClassName('tdSoap')[3].innerHTML == '') return;
    else {
        clearInterval(wait_en_boucle);

        $("li#diagbloc_graph").clone().attr("id", "diagbloc_graph_vGates").insertBefore("li#diagbloc_resume").hide();

        $("li#diagbloc_graph_vGates td.window_borderline").wrap("<table id='table_bloc_vGates' class='window_borderline' style='color:#000000 ; background-color:#FFFFFF' width='100%'></table>");
        $("<td id='bloc_vGates' width='500px'><table><tr id='a'></tr><tr id='b'></tr><tr id='c'></tr></table></td>").insertBefore("li#diagbloc_graph_vGates td.window_borderline");

        $("li#diagbloc_graph_vGates td.window_borderline").attr({
            "align": "right",
            "id": "zobi",
            "style": "display:block; background-color:#ffffff",
            "class": "zobi"
        });

        $("table#table_bloc_vGates div#wind_784d5e4b446d070995191863a346a0d9").attr("style", "display:block; background-color:#ffffff; color:#222222");

        // $("table#table_bloc_vGates").attr("style","display:block; background-color:#ffffff");

        // $("td#bloc_vGates table tr").attr("style","display:block; background-color:#ffffff");

        // var mep = '<br>';
        // $("div#Bloc_Technique_Eqt").append(mep);

        /////////////////// PE LNS ET CISCO //////////////////////////////

        if ($("#chainetechPELNS").size() > 0) {
            var mep = '<br><p>';
            var PelnsHDTest = obj.pelns.match(/[\w]{4}-(LNSHD|PELNS)-(N|B|OSM)-(1|2|3|4)/i);
            if (PelnsHDTest != null) {
                mep += 'PE LNS HD : <a title="' + obj.login + ' | ' + obj.context + '" target=_blank href="' + GM_dossier + 'CreationBat.php?action=pelnshd&login=' + encodeURIComponent(obj.login) + '&pelnshd=' + encodeURIComponent(obj.pelns) + '&context=' + encodeURIComponent(obj.context) + '">' + obj.pelns + '</a>';
            }
            // Sinon PE CISCO
            else if (typeof obj.dslInfos[0].VpVc != 'undefined') {
                var pecisco_vp = obj.dslInfos[0].VpVc.split('/')[0];
                var pecisco_vc = obj.dslInfos[0].VpVc.split('/')[1];
                mep += 'PE Cisco : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pecisco&pecisco=' + encodeURIComponent(obj.pelns) + '&pecisco_vp=' + encodeURIComponent(pecisco_vp) + '&pecisco_vc=' + encodeURIComponent(pecisco_vc) + '">' + obj.pelns + '</a>';
            } else if (typeof obj.dslInfos[0].vpvc != 'undefined') {
                var pecisco_vp = obj.dslInfos[0].vpvc.split('/')[0];
                var pecisco_vc = obj.dslInfos[0].vpvc.split('/')[1];
                mep += 'PE Cisco : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pecisco&pecisco=' + encodeURIComponent(obj.pelns) + '&pecisco_vp=' + encodeURIComponent(pecisco_vp) + '&pecisco_vc=' + encodeURIComponent(pecisco_vc) + '">' + obj.pelns + '</a>';
            }

            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);
        }

        if ($("#chainetechPEMPLS").size() > 0) {
            var PE_CISCO_Alias = $("#chainetechPEMPLS tr:has(td:contains('Nom'))").find("td.tdSoap").text();
            var PE_CISCO_VP = $("#chainetechPEMPLS tr:has(td:contains('Vp'))").find("td.tdSoap").text();
            var PE_CISCO_VC = $("#chainetechPEMPLS tr:has(td:contains('Vc'))").find("td.tdSoap").text();



            // var PelnsHDTest = obj.pelns.match(/[\w]{4}-(LNSHD|PELNS)-(N|B|OSM)-(1|2|3|4)/i);
            // if (PelnsHDTest != null) {
            //     mep += '<br>PE LNS HD : <a title="' + obj.login + ' | ' + obj.context + '" target=_blank href="' + GM_dossier + 'CreationBat.php?action=pelnshd&login=' + encodeURIComponent(obj.login) + '&pelnshd=' + encodeURIComponent(obj.pelns) + '&context=' + encodeURIComponent(obj.context) + '">' + obj.pelns + '</a>';
            // }
            // // Sinon PE CISCO
            // else if (typeof obj.dslInfos[0].VpVc != 'undefined') {
            //     var pecisco_vp = obj.dslInfos[0].VpVc.split('/')[0];
            //     var pecisco_vc = obj.dslInfos[0].VpVc.split('/')[1];
            //     mep += '<br>PE Cisco : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pecisco&pecisco=' + encodeURIComponent(obj.pelns) + '&pecisco_vp=' + encodeURIComponent(pecisco_vp) + '&pecisco_vc=' + encodeURIComponent(pecisco_vc) + '">' + obj.pelns + '</a>';
            // } else if (typeof obj.dslInfos[0].vpvc != 'undefined') {
            //     var pecisco_vp = obj.dslInfos[0].vpvc.split('/')[0];
            //     var pecisco_vc = obj.dslInfos[0].vpvc.split('/')[1];
            //     mep += '<br>PE Cisco : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pecisco&pecisco=' + encodeURIComponent(obj.pelns) + '&pecisco_vp=' + encodeURIComponent(pecisco_vp) + '&pecisco_vc=' + encodeURIComponent(pecisco_vc) + '">' + obj.pelns + '</a>';
            // }

            var mep = '<br><p>';
            mep += 'PE Cisco : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pecisco&pecisco=' + encodeURIComponent(PE_CISCO_Alias) + '&pecisco_vp=' + encodeURIComponent(PE_CISCO_VP) + '&pecisco_vc=' + encodeURIComponent(PE_CISCO_VC) + '">' + obj.pelns + '</a>';
            mep += '</p>';
            $("div#Bloc_Technique_Eqt").append(mep);

        }

        /////////////////// CPE L2 - FIBRE SFR //////////////////////////////

        if ($("#chainetechCPE\\ L2").size() > 0) {
            var CPE_L2_Nom = $("#chainetechCPE\\ L2 tr:has(td:contains('Nom'))").find("td.tdSoap").text();
            var CPE_L2_Port_Out = $("#chainetechCPE\\ L2 tr:has(td:contains('Interface\u00a0Port\u00a0Out'))").find("td.tdSoap").text();

            SAV_Fibre_SFR += "<br>CPE L2 Nom : " + CPE_L2_Nom;
            SAV_Fibre_SFR += "<br>CPE L2 Port Out: " + CPE_L2_Port_Out;

        }


        /////////////////// DSLAM - CE2O //////////////////////////////

        if ($("#chainetechACCESCE2O\\ FT").size() > 0) {
            CE2O_feuille = document.getElementById("chainetechACCESCE2O FT").getElementsByClassName('tdSoap')[3].innerHTML;
            CE2O_tronc = document.getElementById("chainetechACCESCE2O FT").getElementsByClassName('tdSoap')[9].innerHTML;
            CE2O_vlan = document.getElementById("chainetechACCESCE2O FT").getElementsByClassName('tdSoap')[14].innerHTML;

            var menu_info_THD_N2 = 'Info CE2O <hr>';
            menu_info_THD_N2 += '<a target=_blank href="' + url_ipsite_bench + '">IPSITE BENCH</a>';
            menu_info_THD_N2 += '<br> Feuille : ' + CE2O_feuille;
            menu_info_THD_N2 += '<br> Tronc &nbsp: ' + CE2O_tronc + ' - Vlan : ' + CE2O_vlan;

            $("div#MEP_Info_Lien").append(menu_info_THD_N2);

        }

        if ($("#chainetechDSLAMAxione").size() > 0) {
            var dslam_AXIONE_alias = document.getElementById("chainetechDSLAMAxione").getElementsByClassName('tdSoap')[0].innerHTML;
            var dslam_AXIONE_type = document.getElementById("chainetechDSLAMAxione").getElementsByClassName('tdSoap')[1].innerHTML;
            var dslam_AXIONE_slot = document.getElementById("chainetechDSLAMAxione").getElementsByClassName('tdSoap')[2].innerHTML;
            var dslam_AXIONE_port = document.getElementById("chainetechDSLAMAxione").getElementsByClassName('tdSoap')[3].innerHTML;


            SAV_DSLAM += '<br>DSLAM : ' + dslam_AXIONE_alias;
            SAV_DSLAM += '<br>Type : ' + dslam_AXIONE_type;
            SAV_DSLAM += '<br>Slot / Port : ' + dslam_AXIONE_slot + ' / 0 / ' + dslam_AXIONE_port;
            SAV_DSLAM += '<br>';
        }

        if ($("#chainetechSDH").size() > 0) {
            ref_LPT = document.getElementById("chainetechSDH").getElementsByClassName('tdSoap')[3].innerHTML;
        }

        if ($("#chainetechDSLAM7301").size() > 0) {
            //alert("7301");
            var dslam_ASAM_alias = document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[0].innerHTML;
            var dslam_ASAM_rack = document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[6].innerHTML;
            var dslam_ASAM_sous_rack = document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[7].innerHTML;
            var dslam_ASAM_slot = document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[8].innerHTML;
            var dslam_ASAM_port = document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[9].innerHTML;
            // if (typeof document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[14].innerHTML != 'undefined') {
            //   var dslam_adresse = document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[14].innerHTML;
            // }
            // else {
            //   var dslam_adresse = 'NC';
            // }
            var dslam_adresse = $("#chainetechDSLAM7301 table tr td:contains('Adresse'):not(':contains(Adresse\u00a0IP)')").next("td.tdSoap").text();

            SAV_DSLAM += '<br>DSLAM : ' + dslam_ASAM_alias;
            SAV_DSLAM += '<br>Rack / Sous Rack : ' + dslam_ASAM_rack + ' / ' + dslam_ASAM_sous_rack;
            SAV_DSLAM += '<br>Slot / Port : ' + dslam_ASAM_slot + ' / 0 / ' + dslam_ASAM_port;
            SAV_DSLAM += '<br>Adresse : ' + dslam_adresse;
            SAV_DSLAM += '<br>';
        }

        if ($("#chainetechDSLAM7301_1").size() > 0) {
            var dslam_ISAM_alias = document.getElementById("chainetechDSLAM7301_1").getElementsByClassName('tdSoap')[0].innerHTML;
            var dslam_ISAM_rack = document.getElementById("chainetechDSLAM7301_1").getElementsByClassName('tdSoap')[6].innerHTML;
            var dslam_ISAM_sous_rack = document.getElementById("chainetechDSLAM7301_1").getElementsByClassName('tdSoap')[7].innerHTML;
            var dslam_ISAM_slot = document.getElementById("chainetechDSLAM7301_1").getElementsByClassName('tdSoap')[8].innerHTML;
            var dslam_ISAM_port = document.getElementById("chainetechDSLAM7301_1").getElementsByClassName('tdSoap')[9].innerHTML;
            // var dslam_adresse = document.getElementById("chainetechDSLAM7301_1").getElementsByClassName('tdSoap')[14].innerHTML;
            var dslam_adresse = $("#chainetechDSLAM7301_1 table tr td:contains('Adresse'):not(':contains(Adresse\u00a0IP)')").next("td.tdSoap").text();



            SAV_DSLAM += '<br>DSLAM : ' + dslam_ISAM_alias;
            SAV_DSLAM += '<br>Rack / Sous Rack : ' + dslam_ISAM_rack + ' / ' + dslam_ISAM_sous_rack;
            SAV_DSLAM += '<br>Slot / Port : ' + dslam_ISAM_slot + ' / 0 / ' + dslam_ISAM_port;
            SAV_DSLAM += '<br>Adresse : ' + dslam_adresse;
            SAV_DSLAM += '<br>';
        }

        if ($("#chainetechDSLAMISAM\\ 7302").size() > 0) {
            var dslam_ISAM_alias = document.getElementById("chainetechDSLAMISAM 7302").getElementsByClassName('tdSoap')[0].innerHTML;
            var dslam_ISAM_rack = document.getElementById("chainetechDSLAMISAM 7302").getElementsByClassName('tdSoap')[7].innerHTML;
            var dslam_ISAM_sous_rack = document.getElementById("chainetechDSLAMISAM 7302").getElementsByClassName('tdSoap')[8].innerHTML;
            var dslam_ISAM_slot = document.getElementById("chainetechDSLAMISAM 7302").getElementsByClassName('tdSoap')[9].innerHTML;
            var dslam_ISAM_port = document.getElementById("chainetechDSLAMISAM 7302").getElementsByClassName('tdSoap')[10].innerHTML;
            // var dslam_adresse = document.getElementById("chainetechDSLAMISAM 7302").getElementsByClassName('tdSoap')[19].innerHTML;
            var dslam_adresse = $("#chainetechDSLAMISAM\\ 7302 table tr td:contains('Adresse'):not(':contains(Adresse\u00a0IP)')").next("td.tdSoap").text();



            SAV_DSLAM += '<br>DSLAM : ' + dslam_ISAM_alias;
            SAV_DSLAM += '<br>Rack / Sous Rack : ' + dslam_ISAM_rack + ' / ' + dslam_ISAM_sous_rack;
            SAV_DSLAM += '<br>Slot / Port : ' + dslam_ISAM_slot + ' / 0 / ' + dslam_ISAM_port;
            SAV_DSLAM += '<br>Adresse : ' + dslam_adresse;
            SAV_DSLAM += '<br>';
        }

        if ($("#chainetechDSLAMISAM\\ 7302\\ FD").size() > 0) {
            var dslam_ISAM_alias = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[0].innerHTML;
            var dslam_ISAM_rack = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[7].innerHTML;
            var dslam_ISAM_sous_rack = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[8].innerHTML;
            var dslam_ISAM_slot = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[9].innerHTML;
            var dslam_ISAM_port = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[10].innerHTML;
            // var dslam_adresse = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[19].innerHTML;
            var dslam_adresse = $("#chainetechDSLAMISAM\\ 7302\\ FD table tr td:contains('Adresse'):not(':contains(Adresse\u00a0IP)')").next("td.tdSoap").text();


            SAV_DSLAM += '<br>DSLAM : ' + dslam_ISAM_alias;
            SAV_DSLAM += '<br>Rack / Sous Rack : ' + dslam_ISAM_rack + ' / ' + dslam_ISAM_sous_rack;
            SAV_DSLAM += '<br>Slot / Port : ' + dslam_ISAM_slot + ' / 0 / ' + dslam_ISAM_port;
            SAV_DSLAM += '<br>Adresse : ' + dslam_adresse;
            SAV_DSLAM += '<br>';
        }

        if ($("#chainetechDSLAMMA5300").size() > 0) {
            var dslam5300_alias = $("#chainetechDSLAMMA5300 tr:has(td:contains('Alias'))").find("td.tdSoap").text();
            var dslam5300_vlan = $("#chainetechDSLAMMA5300 tr:has(td:contains('Vlan'))").find("td.tdSoap").text();
            var dslam5300_slot = $("#chainetechDSLAMMA5300 tr:has(td:contains('Slot\u00a0Carte'))").find("td.tdSoap").text();
            var dslam5300_port = $("#chainetechDSLAMMA5300 tr:has(td:contains('Port\u00a0Carte'))").find("td.tdSoap").text();
            var dslam_adresse = $("#chainetechDSLAMMA5300 table tr td:contains('Adresse'):not(':contains(Adresse\u00a0IP)')").next("td.tdSoap").text();

            var mep = '<br><p>';
            mep += 'DSLAM IP 5300 : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5300_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5300_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5300_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5300_port) + '&typedslam=MA5300&do_it=nothing">' + dslam5300_alias + '</a>';
            mep += ' - [ <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5300_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5300_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5300_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5300_port) + '&typedslam=MA5300&do_it=lock">Lock</a> ]';
            mep += ' - [ <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5300_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5300_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5300_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5300_port) + '&typedslam=MA5300&do_it=reset">Reset</a> ]';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);

            SAV_DSLAM += '<br>DSLAM : ' + dslam5300_alias;
            SAV_DSLAM += '<br>Vlan : ' + dslam5300_vlan;
            SAV_DSLAM += '<br>Slot / Port : ' + dslam5300_slot + ' / 0 / ' + dslam5300_port;
            SAV_DSLAM += '<br>Adresse : ' + dslam_adresse;
            SAV_DSLAM += '<br>';

        }

        if ($("#chainetechDSLAM5300").size() > 0) {
            var dslam5300_alias = $("#chainetechDSLAM5300 tr:has(td:contains('Alias'))").find("td.tdSoap").text();
            var dslam5300_vlan = $("#chainetechDSLAM5300 tr:has(td:contains('Vlan'))").find("td.tdSoap").text();
            var dslam5300_slot = $("#chainetechDSLAM5300 tr:has(td:contains('Slot\u00a0Carte'))").find("td.tdSoap").text();
            var dslam5300_port = $("#chainetechDSLAM5300 tr:has(td:contains('Port\u00a0Carte'))").find("td.tdSoap").text();
            var dslam_adresse = $("#chainetechDSLAM5300 table tr td:contains('Adresse'):not(':contains(Adresse\u00a0IP)')").next("td.tdSoap").text();

            var mep = '<br><p>';
            mep += 'DSLAM IP 5300 : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5300_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5300_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5300_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5300_port) + '&typedslam=MA5300&do_it=nothing">' + dslam5300_alias + '</a>';
            mep += ' - [ <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5300_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5300_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5300_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5300_port) + '&typedslam=MA5300&do_it=lock">Lock</a> ]';
            mep += ' - [ <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5300_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5300_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5300_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5300_port) + '&typedslam=MA5300&do_it=reset">Reset</a> ]';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);

            SAV_DSLAM += '<br>DSLAM : ' + dslam5300_alias;
            SAV_DSLAM += '<br>Vlan : ' + dslam5300_vlan;
            SAV_DSLAM += '<br>Slot / Port : ' + dslam5300_slot + ' / 0 / ' + dslam5300_port;
            SAV_DSLAM += '<br>Adresse : ' + dslam_adresse;
            SAV_DSLAM += '<br>';

        }


        if ($("#chainetechDSLAMMA5600T").size() > 0) {
            var dslam5600_alias = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[0].innerHTML;
            // var dslam5600_slot = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[9].innerHTML;
            // var dslam5600_port = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[10].innerHTML;
            // var dslam5600_vlan = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[12].innerHTML;
            // var dslam_adresse = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[19].innerHTML;
            // var dslam_adresse = $("#chainetechDSLAMMA5600T tr:has(td:contains('Adresse')) td.tdSoap").text();

            var dslam_adresse = $("#chainetechDSLAMMA5600T tr:has(td:contains('Adresse'))").not(":contains(Adresse\u00a0IP)").find("td.tdSoap").text();
            var dslam5600_vlan = $("#chainetechDSLAMMA5600T tr:has(td:contains('Vlan'))").find("td.tdSoap").text();
            var dslam5600_slot = $("#chainetechDSLAMMA5600T tr:has(td:contains('Slot\u00a0Carte'))").find("td.tdSoap").text();
            var dslam5600_port = $("#chainetechDSLAMMA5600T tr:has(td:contains('Port\u00a0Carte'))").find("td.tdSoap").text();

            var mep = '<br><p>';
            mep += 'DSLAM IP 5600T : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5600_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5600_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5600_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5600_port) + '&typedslam=MA5600T&do_it=nothing">' + dslam5600_alias + '</a>';
            mep += ' - [ <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5600_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5600_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5600_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5600_port) + '&typedslam=MA5600T&do_it=lock">Lock</a> ]';
            mep += ' - [ <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5600_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5600_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5600_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5600_port) + '&typedslam=MA5600T&do_it=reset">Reset</a> ]';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);

            SAV_DSLAM += '<br>DSLAM : ' + dslam5600_alias;
            SAV_DSLAM += '<br>Vlan : ' + dslam5600_vlan;
            SAV_DSLAM += '<br>Slot / Port : ' + dslam5600_slot + ' / 0 / ' + dslam5600_port;
            SAV_DSLAM += '<br>Adresse : ' + dslam_adresse;
            SAV_DSLAM += '<br>';
        }

        if ($("#chainetechDSLAMMA5600T\\ -\\ Niveau\\ 2").size() > 0) {
            var dslam5600_alias = document.getElementById("chainetechDSLAMMA5600T - Niveau 2").getElementsByClassName('tdSoap')[0].innerHTML;
            var dslam5600_slot = document.getElementById("chainetechDSLAMMA5600T - Niveau 2").getElementsByClassName('tdSoap')[9].innerHTML;
            var dslam5600_port = document.getElementById("chainetechDSLAMMA5600T - Niveau 2").getElementsByClassName('tdSoap')[10].innerHTML;
            var dslam5600_vlan = document.getElementById("chainetechDSLAMMA5600T - Niveau 2").getElementsByClassName('tdSoap')[13].innerHTML;
            // var dslam_adresse = document.getElementById("chainetechDSLAMMA5600T - Niveau 2").getElementsByClassName('tdSoap')[21].innerHTML;

            // var dslam_adresse = $("#chainetechDSLAMMA5600T\\ -\\ Niveau\\ 2 tr:has(td:contains('Adresse'):not(':contains(Adresse\u00a0IP)')) td.tdSoap").text();

            // var dslam_adresse = $('#chainetechDSLAMMA5600T\\ -\\ Niveau\\ 2 tr:has(td:contains("Adresse\u00a0IP")) td.tdSoap').text();

            //STACK
            // var dslam_adresse = $('#chainetechDSLAMMA5600T\\ -\\ Niveau\\ 2 table tr:has(td:contains("teur"):not(:contains("prout"))) td.tdSoap').text();
            // var dslam_adresse = $('#chainetechDSLAMMA5600T\\ -\\ Niveau\\ 2 table tr:has(td:contains("Adresse\u00a0IP")) td.tdSoap').text();
            // var dslam_adresse = $('#chainetechDSLAMMA5600T\\ -\\ Niveau\\ 2 table tr:has(td:contains("teur")) td.tdSoap').text();

            //STACK 2:
            var dslam_adresse = $("#chainetechDSLAMMA5600T\\ -\\ Niveau\\ 2 table tr td:contains('Adresse'):not(':contains(Adresse\u00a0IP)')").next("td.tdSoap").text();
            // var dslam_adresse = $("#chainetechDSLAMMA5600T\\ -\\ Niveau\\ 2 table tr td:contains('Adresse'):not(':contains(Adresse\u00a0IP)') + td.tdSoap").text();

            // OK ONE
            // var dslam_adresse = $("#chainetechDSLAMMA5600T\\ -\\ Niveau\\ 2 tr:has(td:contains('Adresse'))").not(":contains(Adresse\u00a0IP)").find("td.tdSoap").text();

            // alert(dslam_adresse);

            var mep = '<br><p>';
            mep += 'DSLAM IP 5600T : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5600_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5600_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5600_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5600_port) + '&typedslam=MA5600T&do_it=nothing">' + dslam5600_alias + '</a>';
            mep += ' - [ <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5600_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5600_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5600_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5600_port) + '&typedslam=MA5600T&do_it=lock">Lock</a> ]';
            mep += ' - [ <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5600_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5600_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5600_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5600_port) + '&typedslam=MA5600T&do_it=reset">Reset</a> ]';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);

            SAV_DSLAM += '<br>DSLAM : ' + dslam5600_alias;
            SAV_DSLAM += '<br>Vlan : ' + dslam5600_vlan;
            SAV_DSLAM += '<br>Slot / Port : ' + dslam5600_slot + ' / 0 / ' + dslam5600_port;
            SAV_DSLAM += '<br>Adresse : ' + dslam_adresse;
            SAV_DSLAM += '<br>';
        }

        //chainetechDSLAM5600T
        if ($("#chainetechDSLAM5600T").size() > 0) {
            var dslam5600_alias = $("#chainetechDSLAM5600T tr:has(td:contains('Alias'))").find("td.tdSoap").text();
            var dslam5600_vlan = $("#chainetechDSLAM5600T tr:has(td:contains('Vlan'))").find("td.tdSoap").text();
            var dslam5600_slot = $("#chainetechDSLAM5600T tr:has(td:contains('Slot\u00a0Carte'))").find("td.tdSoap").text();
            var dslam5600_port = $("#chainetechDSLAM5600T tr:has(td:contains('Port\u00a0Carte'))").find("td.tdSoap").text();
            var dslam_adresse = $("#chainetechDSLAM5600T table tr td:contains('Adresse'):not(':contains(Adresse\u00a0IP)')").next("td.tdSoap").text();

            var mep = '<br><p>';
            mep += 'DSLAM IP 5300 : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5600_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5600_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5600_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5600_port) + '&typedslam=MA5300&do_it=nothing">' + dslam5600_alias + '</a>';
            mep += ' - [ <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5600_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5600_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5600_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5600_port) + '&typedslam=MA5300&do_it=lock">Lock</a> ]';
            mep += ' - [ <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(dslam5600_alias) + '&dslamIP_vlan=' + encodeURIComponent(dslam5600_vlan) + '&dslamIP_slot=' + encodeURIComponent(dslam5600_slot) + '&dslamIP_port=' + encodeURIComponent(dslam5600_port) + '&typedslam=MA5300&do_it=reset">Reset</a> ]';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);

            SAV_DSLAM += '<br>DSLAM : ' + dslam5600_alias;
            SAV_DSLAM += '<br>Vlan : ' + dslam5600_vlan;
            SAV_DSLAM += '<br>Slot / Port : ' + dslam5600_slot + ' / 0 / ' + dslam5600_port;
            SAV_DSLAM += '<br>Adresse : ' + dslam_adresse;
            SAV_DSLAM += '<br>';

        }



        if ($("#chainetechISU\\ 5300").size() > 0) {
            var carteISU_alias = document.getElementById("chainetechISU 5300").getElementsByClassName('tdSoap')[0].innerHTML;
            var carteISU_14 = document.getElementById("chainetechISU 5300").getElementsByClassName('tdSoap')[1].innerHTML;
            var carteISU_15 = document.getElementById("chainetechISU 5300").getElementsByClassName('tdSoap')[3].innerHTML;

            var mep = '<br><p>';
            mep += 'ISU : ' + carteISU_alias + '';
            mep += '<br>CARTE ISU 14 : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(carteISU_14) + '&dslamIP_vlan=' + encodeURIComponent(dslam5300_vlan) + '">' + carteISU_14 + '</a>';
            mep += '<br>CARTE ISU 15 : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(carteISU_15) + '&dslamIP_vlan=' + encodeURIComponent(dslam5300_vlan) + '">' + carteISU_15 + '</a>';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);
        }

        if ($("#chainetechCARTEISU").size() > 0) {
            var carteISU_alias = document.getElementById("chainetechCARTEISU").getElementsByClassName('tdSoap')[0].innerHTML;
            var carteISU_14 = document.getElementById("chainetechCARTEISU").getElementsByClassName('tdSoap')[1].innerHTML;
            var carteISU_15 = document.getElementById("chainetechCARTEISU").getElementsByClassName('tdSoap')[3].innerHTML;

            var mep = '<br><p>';
            mep += 'ISU : ' + carteISU_alias + '';
            mep += '<br>CARTE ISU 14 : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(carteISU_14) + '&dslamIP_vlan=' + encodeURIComponent(dslam5300_vlan) + '">' + carteISU_14 + '</a>';
            mep += '<br>CARTE ISU 15 : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=dslamip&dslamip=' + encodeURIComponent(carteISU_15) + '&dslamIP_vlan=' + encodeURIComponent(dslam5300_vlan) + '">' + carteISU_15 + '</a>';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);

        }

        /////////////////// ATM //////////////////////////////

        if ($("#chainetechPPIN").size() > 0) {
            //alert ('atm');
            var switch_atm_in = document.getElementById("chainetechPPIN").getElementsByClassName('tdSoap')[0].innerHTML;
            var switch_atm_in_slot = document.getElementById("chainetechPPIN").getElementsByClassName('tdSoap')[1].innerHTML;
            var switch_atm_in_port = document.getElementById("chainetechPPIN").getElementsByClassName('tdSoap')[2].innerHTML;
            var switch_atm_in_vp = document.getElementById("chainetechPPIN").getElementsByClassName('tdSoap')[3].innerHTML;
            var switch_atm_in_vc = document.getElementById("chainetechPPIN").getElementsByClassName('tdSoap')[4].innerHTML;

            var switch_atm_out = document.getElementById("chainetechPPOUT").getElementsByClassName('tdSoap')[0].innerHTML;
            var switch_atm_out_slot = document.getElementById("chainetechPPOUT").getElementsByClassName('tdSoap')[1].innerHTML;
            var switch_atm_out_port = document.getElementById("chainetechPPOUT").getElementsByClassName('tdSoap')[2].innerHTML;
            var switch_atm_out_vp = document.getElementById("chainetechPPOUT").getElementsByClassName('tdSoap')[3].innerHTML;
            var switch_atm_out_vc = document.getElementById("chainetechPPOUT").getElementsByClassName('tdSoap')[4].innerHTML;

            var mep = '<br>';
            mep += '<p>PP ATM IN &nbsp;&nbsp;&nbsp;&nbsp;: <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=ppatm&ppatm=' + encodeURIComponent(switch_atm_in) + '&switch_atm_slot=' + encodeURIComponent(switch_atm_in_slot) + '&switch_atm_port=' + encodeURIComponent(switch_atm_in_port) + '&switch_atm_vp=' + encodeURIComponent(switch_atm_in_vp) + '&switch_atm_vc=' + encodeURIComponent(switch_atm_in_vc) + '">' + switch_atm_in + '</a></p>';
            mep += '<p>PP ATM OUT : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=ppatm&ppatm=' + encodeURIComponent(switch_atm_out) + '&switch_atm_slot=' + encodeURIComponent(switch_atm_out_slot) + '&switch_atm_port=' + encodeURIComponent(switch_atm_out_port) + '&switch_atm_vp=' + encodeURIComponent(switch_atm_out_vp) + '&switch_atm_vc=' + encodeURIComponent(switch_atm_out_vc) + '">' + switch_atm_out + '</a></p>';

            $("div#Bloc_Technique_Eqt").append(mep);
        }

        /////////////////// BAS //////////////////////////////

        if ($("#chainetechBASse1200").size() > 0) {
            var BASse1200_alias = document.getElementById("chainetechBASse1200").getElementsByClassName('tdSoap')[0].innerHTML;
            // var BASse1200_alias = $("#chainetechPEMS tr:has(td:contains('Alias'))").find("td.tdSoap").text();

            var mep = '<br><p>';
            mep += 'BAS SE1200 : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=BAS_IP&BAS_IP=' + encodeURIComponent(BASse1200_alias) + '&login=' + encodeURIComponent(obj.login) + '">' + BASse1200_alias + '</a>';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);
        }

        if ($("#chainetechBASse800").size() > 0) {

            var BASse800_alias = $("#chainetechBASse800 .tdSoap:eq(0)").text();
            var BASse800_slot = $("#chainetechBASse800 .tdSoap:eq(2)").text();
            var BASse800_port = $("#chainetechBASse800 .tdSoap:eq(4)").text();
            var BASse800_vp = $("#chainetechBASse800 .tdSoap:eq(5)").text();
            var BASse800_vc = $("#chainetechBASse800 .tdSoap:eq(6)").text();

            var mep = '<br><p>';
            if (!(typeof obj.dslInfos[0].bas == 'undefined') && $("#chainetechDSLAMFT .tdSoap:eq(0)").text() != "EFM") {


                var BAS_VPespaceVC = obj.dslInfos[0].basVpVc.replace('/', ' ');
                mep += 'BAS : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=BAS_ATM&BAS_ATM=' + encodeURIComponent(obj.dslInfos[0].bas) + '&basslotport=' + encodeURIComponent(obj.dslInfos[0].basSlotPort) + '&vpvc=' + encodeURIComponent(BAS_VPespaceVC) + '">' + obj.dslInfos[0].bas + '</a>';
            }
            // BAS IP
            else {
                mep += 'BAS SE800 : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=BAS_IP&BAS_IP=' + encodeURIComponent(BASse800_alias) + '&login=' + encodeURIComponent(obj.login) + '">' + BASse800_alias + '</a>';
            }

            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);

            // $("#chainetechBASse800 .tdSoap:eq(1)").replaceWith('<td class="tdSoap">YEAHHHH</td>');

            // var link_bas_IP = '<a target=_blank href="' + GM_dossier + 'CreationBat.php?action=BAS_IP&BAS_IP=' + encodeURIComponent(BASse800_alias) + '&login=' + encodeURIComponent(obj.login) + '">' + BASse800_alias + '</a>';
            // var link_bas_IP_2 = GM_dossier + 'CreationBat.php?action=BAS_IP&BAS_IP=' + encodeURIComponent(BASse800_alias) + '&login=' + encodeURIComponent(obj.login);
            // $("#chainetechBASse800 .tdSoap:eq(0)").replaceWith('<td class="tdSoap">' + link_bas_IP + '</td>');

            // Modif_Map("chainetechBASse800", link_bas_IP_2);
        }

        if ($("#chainetechBAS").size() > 0) {
            // var BASse100_alias = document.getElementById("chainetechBAS").getElementsByClassName('tdSoap')[0].innerHTML;
            var BASse100_alias = $("#chainetechBAS tr:has(td:contains('Alias'))").find("td.tdSoap").text();

            var mep = '<br><p>';
            mep += 'BAS : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=BAS_IP&BAS_IP=' + encodeURIComponent(BASse100_alias) + '&login=' + encodeURIComponent(obj.login) + '">' + BASse100_alias + '</a>';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);
        }

        /////////////////// GAO-NG //////////////////////////////

        if ($("#chainetechSWITCHAGGREG").size() > 0) {
            var SWAGR_Alias = document.getElementById("chainetechSWITCHAGGREG").getElementsByClassName('tdSoap')[0].innerHTML;
            var SWAGR_IP = document.getElementById("chainetechSWITCHAGGREG").getElementsByClassName('tdSoap')[1].innerHTML;
            var SWAGR_Vlan = document.getElementById("chainetechSWITCHAGGREG").getElementsByClassName('tdSoap')[2].innerHTML;

            var mep = '<br><p>';
            mep += 'SW AGR : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=swagr&swagr=' + encodeURIComponent(SWAGR_Alias) + '&swagr_vlan=' + encodeURIComponent(SWAGR_Vlan) + '">' + SWAGR_Alias + '</a><br>';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);
        }

        if ($("#chainetechPEMS").size() > 0) {

            var PEMS_Alias = $("#chainetechPEMS tr:has(td:contains('Nom'))").not(":contains(Nom\u00a0Vpls)").not(":contains(Back)").find("td.tdSoap").text();
            var PEMS_IP = $("#chainetechPEMS tr:has(td:contains('Adresse\u00a0IP'))").find("td.tdSoap").text();
            var PEMS_Classe = $("#chainetechPEMS tr:has(td:contains('Classe'))").find("td.tdSoap").text();
            var PEMS_vlan = $("#chainetechPEMS tr:has(td:contains('Vlan'))").find("td.tdSoap").text();

            var PEMS_Code_G2R = $("#chainetechPEMS tr:has(td:contains('Code\u00a0G2R'))").find("td.tdSoap").text();

            var mep = '<br><p>';
            mep += 'PE MS ' + PEMS_Classe + ' : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pesms&pesms=' + encodeURIComponent(PEMS_IP) + '&pesms_vlan=' + encodeURIComponent(PEMS_vlan) + '">' + PEMS_Alias + '</a><br>';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);

        }

        if ($("#chainetechPESMS").size() > 0) {
            var PESPOKE_Alias = document.getElementById("chainetechPESMS").getElementsByClassName('tdSoap')[0].innerHTML;
            var PESPOKE_IP = document.getElementById("chainetechPESMS").getElementsByClassName('tdSoap')[1].innerHTML;
            var PESPOKE_Classe = document.getElementById("chainetechPESMS").getElementsByClassName('tdSoap')[2].innerHTML;
            var PESPOKE_vlan = document.getElementById("chainetechPESMS").getElementsByClassName('tdSoap')[3].innerHTML;

            var mep = '<br><p>';
            mep += 'PEL2VPN ' + PESPOKE_Classe + ' : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pel2vpnspoke&pel2vpnspoke=' + encodeURIComponent(PESPOKE_IP) + '&pel2vpnspoke_vlan=' + encodeURIComponent(PESPOKE_vlan) + '">' + PESPOKE_Alias + '</a>';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);
        }

        if ($("#chainetechPEHMS").size() > 0) {
            var PEHMS_Alias = $("#chainetechPEHMS tr:has(td:contains('Nom'))").not(":contains(Nom\u00a0Vpls)").not(":contains(Back)").find("td.tdSoap").text();
            var PEHMS_Modele = $("#chainetechPEHMS tr:has(td:contains('Type'))").find("td.tdSoap").text();
            var PEHMS_IP = $("#chainetechPEHMS tr:has(td:contains('Adresse'))").find("td.tdSoap").text();
            var PEHMS_Classe = $("#chainetechPEHMS tr:has(td:contains('Classe'))").find("td.tdSoap").text();
            var PEHMS_PseudoWire = $("#chainetechPEHMS tr:has(td:contains('Id\u00a0Vpls'))").find("td.tdSoap").text();
            var PEHMS_Vlan = $("#chainetechPEHMS tr:has(td:contains('Vlan'))").find("td.tdSoap").text();
            var PEHMS_Alias_BKP = $("#chainetechPEHMS tr:has(td:contains('Nom\u00a0PEHMS\u00a0Back\u00a0Up'))").find("td.tdSoap").text();
            var PEHMS_IP_BKP = $("#chainetechPEHMS tr:has(td:contains('Ip\u00a0PEHMS\u00a0Back\u00a0Up'))").find("td.tdSoap").text();

            var mep = '<br><p>';

            if (typeof PEHMS_Vlan != 'undefined' && PEHMS_Vlan != '') {
                var PEHMS_PseudoWire_court = PEHMS_PseudoWire.substring(3, 10);
                mep += 'PEL2VPN ' + PEHMS_Classe + ' : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pel2vpnhub&pel2vpnhub=' + encodeURIComponent(PEHMS_IP) + '&pel2vpnhub_VC_ID=' + encodeURIComponent(PEHMS_PseudoWire_court) + '&pel2vpnhub_VC_ID_long=' + encodeURIComponent(PEHMS_PseudoWire) + '&pel2vpnhub_vlan=' + encodeURIComponent(PEHMS_Vlan) + '&pel2vpnhub_model=' + encodeURIComponent(PEHMS_Modele) + '">' + PEHMS_Alias + '</a>';
                if (typeof PEHMS_Alias_BKP != 'undefined' && PEHMS_Alias_BKP != '') {
                    // alert(typeof PEHMS_Alias_BKP);
                    mep += '<br> PEL2VPN ' + PEHMS_Classe + ' BKP : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pel2vpnhub&pel2vpnhub=' + encodeURIComponent(PEHMS_IP_BKP) + '&pel2vpnhub_VC_ID=' + encodeURIComponent(PEHMS_PseudoWire_court) + '&pel2vpnhub_VC_ID_long=' + encodeURIComponent(PEHMS_PseudoWire) + '&pel2vpnhub_vlan=' + encodeURIComponent(PEHMS_Vlan) + '&pel2vpnhub_model=' + encodeURIComponent(PEHMS_Modele) + '">' + PEHMS_Alias_BKP + '</a>';
                }
            } else {
                var PEHMS_PseudoWire_court = PEHMS_PseudoWire.substring(1, 8);
                mep += 'PEL2VPN ' + PEHMS_Classe + ' : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pel2vpnhub&pel2vpnhub=' + encodeURIComponent(PEHMS_IP) + '&pel2vpnhub_VC_ID=' + encodeURIComponent(PEHMS_PseudoWire_court) + '&pel2vpnhub_VC_ID_long=' + encodeURIComponent(PEHMS_PseudoWire) + '&pel2vpnhub_vlan=nc&pel2vpnhub_model=' + encodeURIComponent(PEHMS_Modele) + '">' + PEHMS_Alias + '</a>';
                if (typeof PEHMS_Alias_BKP != 'undefined') {
                    mep += '<br> PEL2VPN ' + PEHMS_Classe + ' BKP : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pel2vpnhub&pel2vpnhub=' + encodeURIComponent(PEHMS_IP_BKP) + '&pel2vpnhub_VC_ID=' + encodeURIComponent(PEHMS_PseudoWire_court) + '&pel2vpnhub_VC_ID_long=' + encodeURIComponent(PEHMS_PseudoWire) + '&pel2vpnhub_vlan=nc&pel2vpnhub_model=' + encodeURIComponent(PEHMS_Modele) + '">' + PEHMS_Alias_BKP + '</a>';
                }
            }
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);
        }

        if ($("#chainetechPESPOKE").size() > 0) {
            var PESPOKE_Alias = document.getElementById("chainetechPESPOKE").getElementsByClassName('tdSoap')[0].innerHTML;
            var PESPOKE_IP = document.getElementById("chainetechPESPOKE").getElementsByClassName('tdSoap')[1].innerHTML;
            var PESPOKE_Classe = document.getElementById("chainetechPESPOKE").getElementsByClassName('tdSoap')[5].innerHTML;
            var PESPOKE_vlan = document.getElementById("chainetechPESPOKE").getElementsByClassName('tdSoap')[6].innerHTML;

            // $("#chainetechPESPOKE .tdSoap:eq(2)").replaceWith('<td class="tdSoap">YEAHHHH</td>');

            var mep = '<br><p>';
            mep += 'PEL2VPN ' + PESPOKE_Classe + ' : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pel2vpnspoke&pel2vpnspoke=' + encodeURIComponent(PESPOKE_IP) + '&pel2vpnspoke_vlan=' + encodeURIComponent(PESPOKE_vlan) + '">' + PESPOKE_Alias + '</a>';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);

        }

        if ($("#chainetechPEHUB").size() > 0) {
            var PEHUB_Alias = $("#chainetechPEHUB tr:has(td:contains('Nom'))").not(":contains(Nom\u00a0Vpls)").not(":contains(Back)").find("td.tdSoap").text();
            var PEHUB_IP = $("#chainetechPEHUB tr:has(td:contains('Adresse'))").find("td.tdSoap").text();
            var PEHUB_MODEL = $("#chainetechPEHUB tr:has(td:contains('Type'))").find("td.tdSoap").text();


            var PEHUB_Classe = $("#chainetechPEHUB tr:has(td:contains('Classe'))").find("td.tdSoap").text();
            var PEHUB_PseudoWire = $("#chainetechPEHUB tr:has(td:contains('Id\u00a0Pseudowire'))").find("td.tdSoap").text();
            var PEHUB_vlan = $("#chainetechPEHUB tr:has(td:contains('Vlan'))").find("td.tdSoap").text();


            if (PEHUB_vlan == '') {
                PEHUB_vlan = 'nc';
            }
            if (PEHUB_PseudoWire == '') {
                PEHUB_VC_ID = 'nc';
            } else {
                var PEHUB_VC_ID = PEHUB_PseudoWire;
                var PEHUB_VC_ID_long = PEHUB_VC_ID.substring(1);

                if (PEHUB_MODEL == 'SE800s') {
                    PEHUB_VC_ID = PEHUB_VC_ID.substring(1, 8);
                } else if (PEHUB_MODEL == 'SE100') {
                    PEHUB_VC_ID = PEHUB_VC_ID.substring(1);
                } else if (PEHUB_MODEL == 'SE400' && PEHUB_VC_ID != 'nc') {
                    PEHUB_VC_ID = PEHUB_VC_ID.substring(1);
                }
            }

            var mep = '<br><p>';
            mep += 'PEL2VPN ' + PEHUB_Classe + ' : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pel2vpnhub&pel2vpnhub=' + encodeURIComponent(PEHUB_IP) + '&pel2vpnhub_VC_ID=' + encodeURIComponent(PEHUB_VC_ID) + '&pel2vpnhub_VC_ID_long=' + encodeURIComponent(PEHUB_VC_ID_long) + '&pel2vpnhub_vlan=' + encodeURIComponent(PEHUB_vlan) + '&pel2vpnhub_model=' + encodeURIComponent(PEHUB_MODEL) + '">' + PEHUB_Alias + '</a>';
            mep += '</p>';

            $("div#Bloc_Technique_Eqt").append(mep);


            // var PEHUB_Alias = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[0].innerHTML;
            // var PEHUB_IP = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[1].innerHTML;
            // var PEHUB_MODEL = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[2].innerHTML;

            //alert(PEHUB_MODEL);


            if (PEHUB_MODEL == 'SE800s') {
                //alert("SE800");
                var PEHUB_Classe = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[3].innerHTML;
                var PEHUB_VC_ID = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[5].innerHTML;
            } else if (PEHUB_MODEL == 'SE400' || PEHUB_MODEL == 'SE100') {
                //alert("SE400");

                var PEHUB_test_vlan_ou_PW = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[7].innerHTML;

                var PEHUB_Classe = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[5].innerHTML;
                var PEHUB_VC_ID = 'nc';
                var PEHUB_vlan = 'nc';

                if (PEHUB_test_vlan_ou_PW != 'L2VPN') {
                    PEHUB_VC_ID = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[7].innerHTML;
                } else {
                    PEHUB_vlan = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[6].innerHTML;
                }
            }
            // else if (PEHUB_MODEL == 'SE100') {
            //   alert("SE100");
            // }
            else if (PEHUB_MODEL == 'ERROR') {
                //alert("info en ERROR");
                var PEHUB_Classe = 'nc';
                var PEHUB_vlan = PEHUB_VC_ID = 'nc';
            }
        }

        /////////////////// PE THD //////////////////////////////

        if ($("#chainetechPETHD").size() > 0) {
            var PETHD_Nominal_Alias = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[0].innerHTML;
            var PETHD_Nominal_IP = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[1].innerHTML;
            var PETHD_BackUp_Alias = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[9].innerHTML;
            var PETHD_BackUp_IP = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[8].innerHTML;
            var PETHD_vlan = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[3].innerHTML;
            var PETHD_PseudoWire = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[7].innerHTML;

            // var test_PETHD_BackUp_Alias = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoapBold')[7].innerHTML;
            // alert(test_PETHD_BackUp_Alias);

            if (PETHD_BackUp_Alias == 'LAG_L3') {
                PETHD_BackUp_IP = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[6].innerHTML;
                PETHD_BackUp_Alias = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[7].innerHTML;
            }

            var mep = '<br><p>';
            mep += 'PE THD Nominal : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pethd&pethd=' + encodeURIComponent(PETHD_Nominal_Alias) + '&pethd_vlan=' + encodeURIComponent(PETHD_vlan) + '">' + PETHD_Nominal_Alias + '</a>';
            mep += '<br> PE THD Secondaire: <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pethd&pethd=' + encodeURIComponent(PETHD_BackUp_Alias) + '&pethd_vlan=' + encodeURIComponent(PETHD_vlan) + '">' + PETHD_BackUp_Alias + '</a>';
            mep += '</p>';
            $("div#Bloc_Technique_Eqt").append(mep);
        }

        /////////////////// PEL3VPN - LNS HD POUR THD  //////////////////////////////

        if ($("#chainetechPEL3VPN").size() > 0) {
            var PE_L3VPN_Alias = $("#chainetechPEL3VPN tr:has(td:contains('Nom'))").find("td.tdSoap").text();
            var PE_L3VPN_Vlan = $("#chainetechPEL3VPN tr:has(td:contains('Vlan'))").find("td.tdSoap").text();

            if (PE_L3VPN_Vlan == '') {
                PE_L3VPN_Vlan = 'nc';
            }

            var mep = '<br><p>';
            mep += 'PE LNS HD : <a target=_blank href="' + GM_dossier + 'CreationBat.php?action=pelnshd_thd&pelnshd=' + encodeURIComponent(PE_L3VPN_Alias) + '&vlan=' + encodeURIComponent(PE_L3VPN_Vlan) + '">' + obj.pelns + '</a>';
            mep += '</p>';
            $("div#Bloc_Technique_Eqt").append(mep);
        }

        /////////////////// LOGIN RADIUS //////////////////////////////

        if (typeof obj.login != 'undefined' && obj.login != '') {

            var mep = '';

            mep += '<br>Syslog  : [ <a title="' + obj.login + '" target=_blank href="' + GM_dossier + 'CreationBat.php?action=rad-ent&login=' + encodeURIComponent(obj.login) + '">rad-ent</a> ]';
            mep += ' - [ <a title="' + obj.login + '" target=_blank href="' + GM_dossier + 'CreationBat.php?action=prx-cpe&login=' + encodeURIComponent(obj.login) + '">prx-cpe</a> ]';
            // mep+='<br>Radius Administration : <a title="'+obj.login+'" target=_blank href="http://rad-ent-vel1.rent.n9uf.net/adminradius/acceuil.php?action=attuser&usr='+obj.login+'">Radius Web Interface</a>';
            mep += '<br>Radius Administration : <a title="' + obj.login + '" target=_blank href="http://86.65.62.10/adminradius/acceuil.php?action=attuser&usr=' + obj.login + '">Radius Web Interface</a>';

            $("div#Bloc_Technique_Eqt").append(mep);
        }

        Launch_Info_THD();
        Outils_SAV();
        Outils_Barre_STC("fin wait chaine technique");

        /////// à refaire ?  ///////

        // if (Infra != 'thd') {
        //     Launch_Info_DSL(ID_LDCOM);
        // } // pour les DSLE trop rapide :)
        // else {
        //     Launch_Info_THD();
        // }


        // ChaineTechnique(
        //     switch_atm_in, switch_atm_in_slot, switch_atm_in_port, switch_atm_in_vp, switch_atm_in_vc,
        //     switch_atm_out, switch_atm_out_slot, switch_atm_out_port, switch_atm_out_vp, switch_atm_out_vc,

        //     dslam5300_alias, dslam5300_slot, dslam5300_port, dslam5300_vlan, dslam5300_ip,
        //     dslam5600_alias, dslam5600_slot, dslam5600_port, dslam5600_vlan,

        //     dslam_adresse,

        //     carteISU_alias, carteISU_14, carteISU_15,
        //     BASse100_alias,
        //     BASse1200_alias,
        //     BASse800_alias, BASse800_slot, BASse800_port, BASse800_vp, BASse800_vc,

        //     PETHD_Nominal_Alias, PETHD_Nominal_IP, PETHD_PseudoWire, PETHD_BackUp_Alias, PETHD_BackUp_IP, PETHD_vlan,
        //     PEMS_Alias, PEMS_IP, PEMS_Classe, PEMS_vlan,
        //     SWAGR_Alias, SWAGR_IP, SWAGR_Vlan,
        //     PESPOKE_Alias, PESPOKE_IP, PESPOKE_Classe, PESPOKE_vlan,
        //     PEHUB_Alias, PEHUB_IP, PEHUB_Classe, PEHUB_VC_ID, PEHUB_MODEL, PEHUB_vlan,
        //     PEHMS_Alias, PEHMS_IP, PEHMS_Classe, PEHMS_PseudoWire, PEHMS_Vlan, PEHMS_Modele, PEHMS_Alias_BKP, PEHMS_IP_BKP
        // );
    }
}

function Launch_Infos_CPE(hostname, num_cpe, Total_CPE) {

    var menu_conf_CPE = '';

    var Gespack_ID = Get_Gespack_ID(hostname);
    // if (Gespack_ID == "need_auth") {
    //   alert("need_auth");
    //   // Gespack_ID = setTimeout(Get_Gespack_ID(hostname),4000);;
    //   setTimeout(function(){Gespack_ID = Get_Gespack_ID(hostname);},1000);
    //   var Gespack_OS = Get_IOS_Gespack(Gespack_ID);
    // }
    var Gespack_OS = Get_IOS_Gespack(Gespack_ID);
    // alert(Gespack_OS);



    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://toolbox-cpe-prod-neuf.private.sfr.com:8080/SupCPE/infos_cpe.php?cpe=' + encodeURIComponent(hostname) + '&master_id=' + encodeURIComponent(obj.masterID) + '',
        // onprogress: function(response) {
        //     alert('on progress CPE');
        // },
        onload: function(response) {
            // var codeHTML = response.responseText;
            var codeHTML = '<div>' + response.responseText + '</div>';
            codeHTML = codeHTML.replace(/<img[^>]*>/g, "");

            var hostname_CPE = $(codeHTML).find('#informations_cpe div:contains(' + hostname + ')').find("tbody tr td").eq(3).text();
            var IP_CPE = $(codeHTML).find('#informations_cpe div:contains(' + hostname + ')').find("tbody tr td").eq(5).text();
            var Marque_CPE = $(codeHTML).find('#informations_cpe div:contains(' + hostname + ')').find("tbody tr td").eq(9).text();
            var serial_CPE = $(codeHTML).find('#informations_cpe div:contains(' + hostname + ')').find("tbody tr td").eq(23).text();
            var ID_CPE = $(codeHTML).find('#informations_cpe div:contains(' + hostname + ')').find("tbody tr td").eq(25).text();

            var URL_CVS_CPE = $(codeHTML).find('#informations_cpe div:contains(' + hostname + ')').find("a:contains('Configuration')").attr('href');
            var url_formatee = '' + URL_CVS_CPE + '';
            // alert(hostname_CPE + ' ' + url_formatee);
            // console.log(url_formatee);

            $("table#Bloc_Technique_CPE tr#" + hostname + " td:eq(3)").html('<a target=_blank href=' + url_formatee + '>CVS</a>');

            var debut_hostname = hostname_CPE.substring(0, 5);
            var fin_hostname_CPE = hostname_CPE.substr(hostname_CPE.length - 2);

            var ID_CPE_Barre_STC = '';

            if (Total_CPE != 1) {

                if (fin_hostname_CPE == '_A') {
                    ID_CPE_Barre_STC = '1';
                }
                if (fin_hostname_CPE == '_P') {
                    ID_CPE_Barre_STC = '2';
                }
                if (debut_hostname == 'HW2EN' || debut_hostname == 'CPEL2') {
                    ID_CPE_Barre_STC = Total_CPE - Nbr_CPE_L2_count + nbr_L2_loop;
                    nbr_L2_loop = nbr_L2_loop + 1;
                }
            }

            // alert(URL_CVS_CPE.size());

            // if ($(URL_CVS_CPE).size() > 0){
            if (URL_CVS_CPE != 'undefined') {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: url_formatee,
                    // onerror: function() {alert("on error");},
                    onload: function(response) {
                        // alert("OK");
                        var codeHTMLduCVS = '<div>' + response.responseText + '</div>';
                        codeHTMLduCVS = codeHTMLduCVS.replace(/<img[^>]*>/g, "");

                        // alert($(codeHTMLduCVS).find("title").text().substring(3));


                        if ($(codeHTMLduCVS).find("div#error").size() > 0) {
                            menu_conf_CPE += 'Pas de Conf :';
                            menu_conf_CPE += ' <a target=_blank href=' + url_formatee + '>CVS</a>';
                            var lien_conf_CPE = url_formatee
                        } else if ($(codeHTMLduCVS).find("title").text().substring(0, 3) == "TPE") {
                            // alert("TPE");
                            menu_conf_CPE += 'TPE :';
                            menu_conf_CPE += ' <a target=_blank href=' + url_formatee + '>CVS</a>';
                            var lien_conf_CPE = url_formatee
                        } else {

                            var URL_CONF_CPE = $(codeHTMLduCVS).find('a').eq(9).attr('href');

                            URL_CONF_CPE_formatee = URL_CONF_CPE.substring(URL_CONF_CPE.indexOf("?"));

                            menu_conf_CPE += 'Conf :';
                            menu_conf_CPE += ' <a target=_blank href=' + url_formatee + '>CVS</a>';
                            menu_conf_CPE += ' - <a target=_blank href="' + url_formatee + '' + URL_CONF_CPE_formatee + '">Last Rev</a>';
                            var lien_conf_CPE = url_formatee + URL_CONF_CPE_formatee;

                            $("table#Bloc_Technique_CPE tr#" + hostname + " td:eq(5)").html('<a target=_blank href="' + url_formatee + '' + URL_CONF_CPE_formatee + '">Last Rev</a>');
                        }

                        var cpe_ref_mainteneur = "NC";

                        if (ID_CPE == '' && Marque_CPE == 'ONE_ACCESS') {
                            if (serial_CPE.substring(5, 12) == '0045040') {
                                cpe_ref_mainteneur = 'One20D';
                            } else if (serial_CPE.substring(5, 12) == '0051240') {
                                cpe_ref_mainteneur = 'ONE80-XM';
                            } else {
                                cpe_ref_mainteneur = '';
                            }
                        } else {
                            cpe_ref_mainteneur = BAO_Ref_Mainteneur(ID_CPE);
                        }


                        CPE_Conf_CVS_Tab[num_cpe] = menu_conf_CPE;

                        SAV_CPE_Tab[num_cpe] = '<br><br>Nom du CPE ' + ID_CPE_Barre_STC + ' : ' + hostname_CPE;
                        SAV_CPE_Tab[num_cpe] += '<br>Adresse IP ' + ID_CPE_Barre_STC + ' : ' + IP_CPE;
                        SAV_CPE_Tab[num_cpe] += '<br>Marque CPE ' + ID_CPE_Barre_STC + ' : ' + Marque_CPE;
                        SAV_CPE_Tab[num_cpe] += '<br>Product ID ' + ID_CPE_Barre_STC + ' : ' + ID_CPE;
                        SAV_CPE_Tab[num_cpe] += '<br>Numéro de série ' + ID_CPE_Barre_STC + ' : ' + serial_CPE;
                        SAV_CPE_Tab[num_cpe] += '<br>Ref Mainteneur ' + ID_CPE_Barre_STC + ' : ' + cpe_ref_mainteneur;
                        // SAV_CPE_Tab[num_cpe] += '<br>ID Gespact '+ID_CPE_Barre_STC+' : '+Gespack_ID;
                        SAV_CPE_Tab[num_cpe] += '<br>OS Gespack ' + ID_CPE_Barre_STC + ' : ' + Gespack_OS;
                        SAV_CPE_Tab[num_cpe] += '<br>Lien Conf ' + ID_CPE_Barre_STC + ' : ' + lien_conf_CPE.substring(lien_conf_CPE.indexOf(".cgi") + 5, lien_conf_CPE.indexOf("?rev"));
                        SAV_CPE_Barre_STC_Tab[num_cpe] = SAV_CPE_Tab[num_cpe];
                        SAV_CPE_Tab[num_cpe] += '<br>Conf CPE ' + ID_CPE_Barre_STC + ' : ' + lien_conf_CPE;


                        Nbr_CPE_count = Nbr_CPE_count - 1;
                        if (Nbr_CPE_count == 0) {
                            SAV_CPE = 'OK le compte est bon';
                            Outils_SAV();
                            Outils_Barre_STC("tous les CPEs OK");
                        }

                        //lancé aussi à la fin du bloc technique
                        // MEP_conf_CVS_CPE(menu_conf_CPE,num_cpe);
                        // MEP_conf_CVS_CPE(num_cpe);

                    }
                });
            } else {
                // alert('pas de Conf CPE trouvée');

                // menu_conf_CPE += ' pas de conf trouvée';

                SAV_CPE = '<br>Pas d Info CPE retrouvée';
                SAV_CPE_Barre_STC = '<br>Pas d Info CPE retrouvée';

                Outils_SAV();
                Outils_Barre_STC("Pas d Info CPE retrouvée");
            }
        }
    });
}

function BAO_Ref_Mainteneur(ID_CPE) {

    var Retour_BAO = GM_xmlhttpRequest({
        method: "GET",
        url: 'http://intranetstc.private.sfr.com:8091/flux.php?action=getInfosCPE&ROUTEUR=' + encodeURIComponent(ID_CPE),
        synchronous: true,
    });

    var cpe_ref_mainteneur = Retour_BAO.responseText
    return cpe_ref_mainteneur;
}

function Get_Gespack_ID(hostname) {
    var codeHTML = GM_xmlhttpRequest({
        method: "POST",
        url: 'http://refcpe-prod.private.sfr.com:7190/cpe/recherche_resultat',
        data: 'MASTER_ID=&CONTRAT=&NOM_CLIENT=&ID_CLIENT=&NOM_SITE=&ID_SITE=&ADR_IP=&NOM_CPE=' + hostname + '&OS=&OFFRE=&__export=',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        synchronous: true,
    });

    codeHTML = codeHTML.responseText;
    codeHTML = codeHTML.replace(/<img[^>]*>/g, "");

    var auth = $(codeHTML).find("h5").text();

    if (auth == "Authentification") {


        var need_ref_cpe_auth = "need_auth";

        nbr_auth_encara++;
        nbr_auth_encara_retry++;

        if (nbr_auth_encara_retry > 2) {
            return;
        } else if (nbr_auth_encara > 1) {
            // GM_setValue("login_encara",prompt("Renseignez votre gros U",""));
            // GM_setValue("password_encara",prompt("Renseignez votre mot de passe en clair :)",""));
            // alert("need changer le passer Encara ?");

            nbr_auth_encara = 0;
            return need_ref_cpe_auth;
        } else {
            // alert("auth de ref CPE");
            Auth_Ref_CPE();

            return need_ref_cpe_auth;
        }

    } else {
        var gespack_id = $(codeHTML).find("table#resultat tbody td").last().text();
        return gespack_id;
    }
}

function Auth_Ref_CPE() {
    GM_xmlhttpRequest({
        method: "POST",
        url: 'http://refcpe-prod.private.sfr.com:7190/login',
        data: 'login=' + GM_getValue("login_encara") + '&password=' + GM_getValue("password_encara"),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(response) {
            // alert(response.responseText);

            auth_ref_cpe = true;
            Get_Gespack_ID(hostname);
        }
    });
}

function Get_IOS_Gespack(gespack_id) {

    var codeHTML_recherche = GM_xmlhttpRequest({
        method: "POST",
        url: 'http://gestpack.private.sfr.com/gestpack/index.php?O=gestpack&A=idv2',
        data: 'pkgid=' + gespack_id + '&ver=&manuf=-&desg=&stat=LIVEorEOS&scre=-&dcre=&smod=-&dmod=&stage=process',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        synchronous: true,
    });

    codeHTML_recherche = codeHTML_recherche.responseText;
    codeHTML_recherche = codeHTML_recherche.replace(/<img[^>]*>/g, "");

    var fin_url_gespack_id = $(codeHTML_recherche).find("a:contains('" + gespack_id + "')").attr('href');

    var codeHTML_fiche_ID = GM_xmlhttpRequest({
        method: "GET",
        url: "http://gestpack.private.sfr.com/gestpack/index.php" + fin_url_gespack_id,
        synchronous: true,
    });

    codeHTML_fiche_ID = codeHTML_fiche_ID.responseText;
    codeHTML_fiche_ID = codeHTML_fiche_ID.replace(/<img[^>]*>/g, "");

    var gespack_IOS = $(codeHTML_fiche_ID).find("td:contains('Fichier IOS')").next().text();
    return gespack_IOS;
}

function Launch_Entete_Service() {

    var compteur = 0;

    if (Nom_OFFRE == '9iPnet') {
        Nom_OFFRE_URL = '9+IP+NET';
    } else if (Nom_OFFRE == '9connect') {
        Nom_OFFRE_URL = '9+CONNECT';
    } else if (Nom_OFFRE == 'Fedelan') {
        Nom_OFFRE_URL = 'FEDELAN';
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://toolbox-cpe-prod-neuf.private.sfr.com:8080/reporting/supstat/sites_cpe.php?gid_client=' + ID_Societe + '&offre=' + Nom_OFFRE_URL,
        onload: function(response2) {
            var codeHTML_listing_VPN = '<div>' + response2.responseText + '</div>';
            codeHTML_listing_VPN = codeHTML_listing_VPN.replace(/<img[^>]*>/g, "");
            var compteur = 0;

            $("div#MEP_listing_Site p:eq(0)").append('<span>Infos sur les sites ' + Nom_OFFRE + ' </span><hr>');
            $("div#MEP_listing_Site p:eq(0)").append('<br>Accès au <a target=_blank href="http://toolbox-cpe-prod-neuf.private.sfr.com:8080/reporting/supstat/sites_cpe.php?gid_client=' + ID_Societe + '&offre=' + Nom_OFFRE_URL + '">Reporting du ' + Nom_OFFRE + '</a>');

            var menu_tableau = '<div id= tableauSiteVPN class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';

            $(codeHTML_listing_VPN).find("#tab-resultat tbody tr").each(function() {
                compteur = compteur + 1;
                menu_tableau += '<tr>';
                menu_tableau += '<td>' + $(this).find("td").eq(5).text() + '</td>';
                menu_tableau += '<td>' + $(this).find("td").eq(7).text() + '</td>';
                menu_tableau += '<td>' + $(this).find("td").eq(6).text() + '</td>';
                //menu_tableau += '<td>'+$(this).find("td").eq(8).text()+'</td>';
                menu_tableau += '<td><a target=_blank href="' + GM_dossier + 'CreationBat.php?action=cpetoolbox&hostname=' + $(this).find("td").eq(8).text() + '&typeCPE=CISCO&typeOffre=' + Nom_OFFRE + '&NomClient=' + encodeURIComponent(Nom_Client) + '">' + $(this).find("td").eq(8).text() + '</a></td>';
                menu_tableau += '</tr>';
            });

            menu_tableau += '</table></div>';

            MEP_DIV_cachee(menu_tableau);

            $("div#MEP_listing_Site p:eq(0)").append('<br> <a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauSiteVPN\',headingText:\'Listing des Sites ' + Nom_OFFRE + ' Raccrochés à l ID société\'});" href="#" style="cursor: pointer;" class=" ">Liste des Sites du ' + Nom_OFFRE + ' (' + compteur + ')</a>');

        }
    });
}

function Launch_Listing_Service_et_Stats() {

    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://toolbox-cpe-prod-neuf.private.sfr.com:8080/reporting/supstat/clients.php?gid_client=' + ID_Societe,
        onload: function(response) {
            var codeHTML_sID = '<div>' + response.responseText + '</div>';
            codeHTML_sID = codeHTML_sID.replace(/<img[^>]*>/g, "");

            // Listing Services

            var nrb_services = 0;
            var tab_services = new Array;
            var fin_url_service = '';

            var menu_popup = '<span>Listing Service du Client </span><hr>';

            $(codeHTML_sID).find("#tab-resultat tbody tr").each(function() {
                var nom_du_service = $(this).find("td").eq(4).text();
                var contrat_du_service = $(this).find("td").eq(3).text();

                fin_url_service = $(this).find("td a").eq(1).attr('href');

                tab_services[nrb_services] = fin_url_service;

                // menu_popup += '<br> <a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauService'+nrb_services+'\',headingText:\'Listing des Sites Raccrochés à l ID société\'});" href="#" style="cursor: pointer;" class=" ">Liste des Sites du '+nom_du_service+' ('+compteur+')</a>';
                menu_popup += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauService' + nrb_services + '\',headingText:\'Listing des Sites ' + nom_du_service + ' Raccrochés à l ID société\'});" href="#" style="cursor: pointer;" class=" ">' + nom_du_service + ' (contrat : ' + contrat_du_service + ')</a><br>';

                nrb_services = nrb_services + 1;

            });

            for (var i = 0; i < tab_services.length; i++) {
                Generation_Div_Services(i, tab_services);
                // alert(tab_services[i]);
            }

            $("div#MEP_listing_Service").append(menu_popup);
            // MEP_listing_Service();


            // Acces aux Stats

            // var url_stats = ''; no more used
            var url_stats_onclick = '';
            var url_stats_onclick_formatee = '';

            var Nom_OFFRE_formatee = Nom_OFFRE;

            if (Nom_OFFRE == '9iPnet') {
                Nom_OFFRE_formatee = '9 IP NET';
            } else if (Nom_OFFRE == '9IPNET') {
                Nom_OFFRE_formatee = '9 IP NET';
            } else if (Nom_OFFRE == '9connect') {
                Nom_OFFRE_formatee = '9 CONNECT';
            } else if (Nom_OFFRE == '9CONNECT') {
                Nom_OFFRE_formatee = '9 CONNECT';
            } else if (Nom_OFFRE == '9Connect') {
                Nom_OFFRE_formatee = '9 CONNECT';
            } else if (Nom_OFFRE == 'Fedelan') {
                Nom_OFFRE_formatee = 'FEDELAN';
            }

            $(codeHTML_sID).find("#tab-resultat tbody tr").each(function() {
                if (Nom_OFFRE_formatee == $(this).find("td").eq(4).text()) {
                    url_stats_onclick = $(this).find("td a").eq(0).attr('onclick');
                }
            });

            // url_stats = $(codeHTML_sID).find('#tab-resultat tbody tr td').eq(0).html(); no more used
            //var url_stats_onclick = $(codeHTML_sID).find('#tab-resultat tbody tr td a').eq(0).attr('onclick'); //avant l'affinage => donc premier ligne du tableau

            if (url_stats_onclick != null) {

                url_stats_onclick_formatee = '"' + url_stats_onclick + '"';
                // console.log(url_stats_onclick_formatee);
                url_stats_onclick_formatee = url_stats_onclick_formatee.substr(url_stats_onclick_formatee.indexOf("https"));
                // console.log(url_stats_onclick_formatee);
                url_stats_onclick_formatee = url_stats_onclick_formatee.substring(0, url_stats_onclick_formatee.indexOf("\""));
                // console.log(url_stats_onclick_formatee);

                // menu_fin_1 += '<br>&nbsp&nbsp&nbsp <a target=_blank href="' + url_stats_onclick_formatee + '">Accès aux statistiques de l extranet client</a>';
                $("div#MEP_listing_Site p:eq(1)").append('<a id="pastille" href="#" style="cursor: pointer;" class=" "></a> <a target=_blank href="' + url_stats_onclick_formatee + '">Accès aux statistiques de l extranet client</a>');

                //Pour test d'afichage
                // $("ul#MEP_listing_Site a#pastille").attr("onclick", "copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'Mercure\',headingText:\'Go Stats, Go !\'});");
                // $("ul#MEP_listing_Site a#pastille").html('<img width="12" height="12" src=' + GM_dossier + '/image/vert.jpg >');

                // Mercures(url_stats_onclick_formatee);  // Pour Soulager Barricou
                Go_Stats_Recup_Url_All(url_stats_onclick_formatee);

            } else {
                // menu_fin_1 += '<br>Pas d accès aux Statistiques - à configurer dans StatSsup - RefCPE'
                $("div#MEP_listing_Site p:eq(1)").append('Stats non configurée OU Sats Caviar');
            }

        }
    });
}

function Launch_Info_DSL(Ref_Refpase) {

    var menu_info_DSL = '';
    var menu_info_DSL_N2 = '';
    var menu_info_DSL_SAV = '';
    var menu_popup_2 = '';

    if (obj.isTDSL != 1 && obj.realNameOffre.substring(0, 3) != "LPT" && obj.dslInfos[0].type != "basCEE") { // Lien en Option 1

        GM_xmlhttpRequest({
            method: "GET",
            // url: 'http://nr0u0086.cbv.ldcom.ld:8083/pegase/admin/infos_refpase.jsp?ndi='+ID_LDCOM+'&submit=Rechercher',
            // url: 'http://w4hermes.prod.neufcegetel.ld:8083/pegase/admin/infos_refpase.jsp?ndi='+Ref_Refpase+'&submit=Rechercher',
            url: 'http://su10022.cbv.it.ld:8083/pegase/admin/infos_refpase.jsp?ndi=' + Ref_Refpase + '&login=login_tmp_pase_stcent&pass=login_tmp_pase_stcent',
            // onabort: function(response) { alert('on abort'); },
            // onprogress: function(response) { alert('on progress'); },
            onerror: function(response) {

                // alert('Refpase dans les choux \n \nAllez dans Cerbere/Ulysse pour les constitutions');

                menu_info_DSL_N2 += 'Info DSL <hr>';

                menu_info_DSL_N2 += '<div id= tableauInfoDSL class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';

                menu_info_DSL += '<br>Refpase dans les choux <br><br>Allez dans Cerbere/Ulysse pour les constitutions<br>';

                menu_info_DSL_N2 += menu_info_DSL;
                menu_info_DSL_N2 += '</table></div>';

                $("div#MEP_Info_Lien").append(menu_info_DSL_N2);

                menu_info_DSL_Barre_STC = menu_info_DSL;

                menu_popup_2 += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoDSL\',headingText:\'Informations DSL\'});" href="#" style="cursor: pointer;" class=" ">Informations DSL</a>';

                SAV_NDI += '<br>Constitutions non récupérées dans REFPASE (car site HS)<br>'

                //alert(obj.nomRessource);
                // recherche dans le JSON
                var codeOffreDSL = obj.nomRessource.split('-')[1] + "-" + obj.nomRessource.split('-')[2] + "-" + obj.nomRessource.split('-')[3];

                // ou dans le code source de la page
                // var tempo = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody tr td").eq(9).text();
                // var codeOffreDSL = tempo.substring(tempo.indexOf("(")+1,tempo.indexOf(")"));

                // menu_info_DSL_code_offre += '<br>' + Liste_Code_Offre(codeOffreDSL);
                $("div#MEP_Info_Lien").append('<br>' + Liste_Code_Offre(codeOffreDSL));

                menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
                menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';
                $("div#MEP_SAV").append(menu_info_DSL_SAV);

                // MEP_info_DSL();

                SAV_Offre += '<br>';
                SAV_Offre += ID_LDCOM + ' - ' + codeOffreDSL;
                SAV_Offre += '<br>';
                SAV_Offre += Liste_Code_Offre(codeOffreDSL);
                SAV_Offre += '<br>';

                Outils_SAV();
                Outils_Barre_STC("refapase dans les choux");
                // MEP_SAV();

            },

            onload: function(response5) {
                var codeHTML_5 = '<div>' + response5.responseText + '</div>';
                codeHTML_5 = codeHTML_5.replace(/<img[^>]*>/g, "");
                var menu_info_DSL_brute = '';

                menu_info_DSL_N2 += 'Info DSL <hr>';
                $("div#MEP_Info_Lien").append(menu_info_DSL_N2);

                $(codeHTML_5).find("tbody").eq(3).find("tr").each(function() {
                    var temp_td = $(this).find("td").eq(9).text();
                    var temp_ndi = temp_td.split(';')[100];
                    // alert(temp_td);
                    // alert(temp_ndi);          
                    if (temp_ndi != null && temp_ndi != '') {
                        //if (temp_ndi != null && temp_ndi.match(/[0-9][0-9]/)) {  
                        menu_info_DSL_brute = temp_td;
                    };
                });

                // if (Ref_Refpase == obj.ndiFT) {

                //     menu_info_DSL_brute = $(codeHTML_5).find("tbody eq(3)").find("tr:eq(1)").find("td:eq(9)").text();
                // }

                //menu_info_DSL_brute = $(codeHTML_5).find("tbody").eq(3).find("tr").last().find("td").eq(9).text();

                // alert(menu_info_DSL_brute);

                if (menu_info_DSL_brute == '') { // pas d'info retrouvé sur les NDi

                    // if (Ref_Refpase == ID_LDCOM) {
                    //   // alert("pas d'info retrouvé sur l ID LDCOM - test avec NFI FT");
                    //   // alert(obj.ndiFT);
                    //   Launch_Info_DSL(obj.ndiFT);
                    //   return;
                    // }
                    // else{
                    // menu_info_DSL_N2 += '<div id= tableauInfoDSL class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';
                    menu_info_DSL += 'Aucune Info sur la ligne retrouvée dans REFPASE<br>';

                    var tableau_cache_DSL = '<div id= tableauInfoDSL class="highslide-maincontent"><table cellpadding=0 cellspacing=10><table>';
                    tableau_cache_DSL += menu_info_DSL;
                    tableau_cache_DSL += '</table></div>';

                    $(tableau_cache_DSL).appendTo("body");

                    // $("div#MEP_Info_Lien").append(menu_info_DSL);

                    // menu_info_DSL_N2 += menu_info_DSL;
                    menu_info_DSL_Barre_STC = menu_info_DSL;

                    SAV_DSLE += '<br>Aucune Info sur le ligne retrouvée dans REFPASE<br>';
                    Outils_SAV();
                    Outils_Barre_STC("Info DSL - Pas dinfo refpase");
                    // }

                } else { // info OK dans Refpase

                    var info_DSL_NDI = menu_info_DSL_brute.split(';')[100];
                    var info_DSL_calibre_longueur = menu_info_DSL_brute.split(';')[102];
                    var info_DSL_TETE = menu_info_DSL_brute.split(';')[107];
                    var info_DSL_Amorce = menu_info_DSL_brute.split(';')[108];
                    var info_DSL_Paire = menu_info_DSL_brute.split(';')[109];
                    var info_DSL_Plot = menu_info_DSL_brute.split(';')[14];


                    var info_DSL_NDI_tab = new Array();
                    var info_DSL_calibre_longueur_tab = new Array();
                    var info_DSL_TETE_tab = new Array();
                    var info_DSL_Amorce_tab = new Array();
                    var info_DSL_Paire_tab = new Array();
                    var info_DSL_Plot_tab = new Array();


                    var info_DSL_Code_URA = menu_info_DSL_brute.split(';')[104].substr(0, 2) + menu_info_DSL_brute.split(';')[103];
                    if (info_DSL_Code_URA == '') {
                        info_DSL_Code_URA = 'NC';
                    }


                    var tableau_cache_DSL = '<div id= tableauInfoDSL class="highslide-maincontent"><table cellpadding=0 cellspacing=10><table>';

                    menu_info_DSL += '<tr><td>ADV FT - 0810 022 421</td></tr>';

                    menu_info_DSL += '<tr><td>CODE URA</td>';
                    menu_info_DSL += '<td>' + info_DSL_Code_URA + '</td>';
                    menu_info_DSL += '</tr>';

                    menu_info_DSL += '<tr></tr>';

                    menu_info_DSL += '<tr id="Ndi_Construit"><td>NDI construit</td></tr>';
                    menu_info_DSL += '<tr id="Calibre_Longeur"><td>Calibre et longueur</td></tr>';
                    menu_info_DSL += '<tr id="Tete_FT"><td>Tete FT</td></tr>';
                    menu_info_DSL += '<tr id="Amorce_FT"><td>Amorce</td></tr>';
                    menu_info_DSL += '<tr id="Paire_FT"><td>Paire</td></tr>';
                    menu_info_DSL += '<tr id="Plot_DSLAM"><td>Plot DSLAM</td></tr>';

                    tableau_cache_DSL += menu_info_DSL;
                    tableau_cache_DSL += '</table></div>';

                    $(tableau_cache_DSL).appendTo("body");

                    var nbr_ndi_construits = info_DSL_NDI.split('#').length;


                    for (var i = 0; i < nbr_ndi_construits; i++) {
                        // alert("tout");
                        info_DSL_NDI_tab[i + 1] = info_DSL_NDI.split('#')[i];
                        info_DSL_calibre_longueur_tab[i + 1] = info_DSL_calibre_longueur.split('#')[i];
                        info_DSL_TETE_tab[i + 1] = info_DSL_TETE.split('#')[i];
                        info_DSL_Amorce_tab[i + 1] = info_DSL_Amorce.split('#')[i];
                        info_DSL_Paire_tab[i + 1] = info_DSL_Paire.split('#')[i];
                        info_DSL_Plot_tab[i + 1] = info_DSL_Plot.split('#')[i];

                        if (typeof info_DSL_calibre_longueur_tab[i + 1] == 'undefined' || info_DSL_calibre_longueur_tab[i + 1] == '') {
                            info_DSL_calibre_longueur_tab[i + 1] = 'NC';
                        };

                        if (typeof info_DSL_TETE_tab[i + 1] == 'undefined' || info_DSL_TETE_tab[i + 1] == '') {
                            info_DSL_TETE_tab[i + 1] = 'NC';
                            info_DSL_Amorce_tab[i + 1] = 'NC';
                            info_DSL_Paire_tab[i + 1] = 'NC';
                        };

                        SAV_NDI += '<br>NDI construit : ' + info_DSL_NDI_tab[i + 1];
                        SAV_NDI += '<br>Plot DSLAM : ' + info_DSL_Plot_tab[i + 1];
                        SAV_NDI += '<br>Calibre et longueur : ' + info_DSL_calibre_longueur_tab[i + 1];
                        SAV_NDI += '<br>Constitution : ' + info_DSL_TETE_tab[i + 1] + ' ' + info_DSL_Amorce_tab[i + 1] + ' ' + info_DSL_Paire_tab[i + 1];
                        SAV_NDI += '<br>';

                        $("div#tableauInfoDSL tr#Ndi_Construit").append("<td>" + info_DSL_NDI_tab[i + 1] + "</td>");
                        $("div#tableauInfoDSL tr#Calibre_Longeur").append("<td>" + info_DSL_calibre_longueur_tab[i + 1] + "</td>");
                        $("div#tableauInfoDSL tr#Tete_FT").append("<td>" + info_DSL_TETE_tab[i + 1] + "</td>");
                        $("div#tableauInfoDSL tr#Amorce_FT").append("<td>" + info_DSL_Amorce_tab[i + 1] + "</td>");
                        $("div#tableauInfoDSL tr#Paire_FT").append("<td>" + info_DSL_Paire_tab[i + 1] + "</td>");
                        $("div#tableauInfoDSL tr#Plot_DSLAM").append("<td>" + info_DSL_Plot_tab[i + 1] + "</td>");
                    }

                    menu_info_DSL = $("div#tableauInfoDSL").html();

                }

                menu_info_DSL_Barre_STC = menu_info_DSL;

                menu_popup_2 += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoDSL\',headingText:\'Informations DSL\'});" href="#" style="cursor: pointer;" class=" ">Informations DSL</a>';
                $("div#MEP_Info_Lien").append(menu_popup_2);

                //alert(obj.nomRessource);
                // recherche dans le JSON
                var codeOffreDSL = obj.nomRessource.split('-')[1] + "-" + obj.nomRessource.split('-')[2] + "-" + obj.nomRessource.split('-')[3];

                // ou dans le code source de la page
                // var tempo = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody tr td").eq(9).text();
                // var codeOffreDSL = tempo.substring(tempo.indexOf("(")+1,tempo.indexOf(")"));

                // menu_info_DSL_code_offre += '<br>' + Liste_Code_Offre(codeOffreDSL);
                $("div#MEP_Info_Lien").append('<br>' + Liste_Code_Offre(codeOffreDSL));

                // avant que fuschia-barricou ne me fasse chier
                menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
                menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';
                $("div#MEP_SAV").append(menu_info_DSL_SAV);

                SAV_Offre += '<br>';
                SAV_Offre += ID_LDCOM + ' - ' + codeOffreDSL;
                SAV_Offre += '<br>';
                SAV_Offre += Liste_Code_Offre(codeOffreDSL);
                SAV_Offre += '<br>';
                //alert(SAV_Offre);

                Outils_SAV();
                Outils_Barre_STC("Info DSL - OPT1");
                // MEP_SAV();

            }
        });
    } else if (obj.isTDSL == 1 && Nom_OFFRE.substring(0, 3) != "LPT") { // TDSL 

        var tempo = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody tr td:contains('Offre')").next("td").text();

        var codeOffreDSL = tempo.substring(tempo.indexOf("(") + 1, tempo.indexOf(")"));

        menu_info_DSL_N2 += 'Info DSL <hr>';
        menu_info_DSL_N2 += '<a target=_blank href="' + url_ipsite_bench + '">IPSITE BENCH</a>';
        menu_info_DSL_N2 += '<br>' + obj.nomRessource + '<br>' + Liste_Code_Offre(codeOffreDSL);

        $("div#MEP_Info_Lien").append(menu_info_DSL_N2);

        menu_info_DSL_Barre_STC += 'DSLE : ';
        menu_info_DSL_Barre_STC += obj.nomRessource + '<br>' + Liste_Code_Offre(codeOffreDSL);
        menu_info_DSL_Barre_STC += '<br>';

        menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
        menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';
        $("div#MEP_SAV").append(menu_info_DSL_SAV);

        SAV_DSLE += '<br>' + obj.nomRessource + '<br>' + Liste_Code_Offre(codeOffreDSL) + '<br>';

        // MEP_info_DSL();

        Outils_SAV();
        Outils_Barre_STC("Info DSL - TDSL");

        // MEP_SAV();
    } else if (obj.realNameOffre.substring(0, 3) == "LPT") { // LPT

        menu_info_DSL_N2 += 'Info LPT <hr>';
        menu_info_DSL_N2 += '<a target=_blank href="' + url_ipsite_bench + '">IPSITE BENCH</a>';
        menu_info_DSL_N2 += '<br>' + ref_LPT;
        menu_info_DSL_N2 += '<br>' + obj.realNameOffre;

        $("div#MEP_Info_Lien").append(menu_info_DSL_N2);

        menu_info_DSL_Barre_STC += 'LPT : ' + ref_LPT;
        menu_info_DSL_Barre_STC += '<br>' + obj.realNameOffre + '<br>';

        menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
        menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';
        $("div#MEP_SAV").append(menu_info_DSL_SAV);

        SAV_LPT += '<br>' + ref_LPT + '<br>';

        // MEP_info_DSL();

        Outils_SAV();
        Outils_Barre_STC("Info DSL - LPT");

        // MEP_SAV();
    } else if (obj.dslInfos[0].type == "basCEE") { // CEE FT

        var tempo = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody tr td:contains('Offre')").next("td").text();

        var codeOffreDSL = tempo.substring(tempo.indexOf("(") + 1, tempo.indexOf(")"));

        // var Remote_ID_CEE = $("#chainetechDSLAMFT td:contains('RemoteId')").next("td").text();
        var Remote_ID_CEE = obj.dslInfos[0].remoteId;

        menu_info_DSL_N2 += 'Info DSL <hr>';
        menu_info_DSL_N2 += '<a target=_blank href="' + url_ipsite_bench + '">IPSITE BENCH</a>';
        menu_info_DSL_N2 += '<br>' + obj.nomRessource + '<br>' + Liste_Code_Offre(codeOffreDSL);

        $("div#MEP_Info_Lien").append(menu_info_DSL_N2);

        menu_info_DSL_Barre_STC += 'CEE-FT : ';
        menu_info_DSL_Barre_STC += obj.nomRessource + '<br>' + Liste_Code_Offre(codeOffreDSL);
        menu_info_DSL_Barre_STC += '<br>Remote ID : ' + Remote_ID_CEE;
        menu_info_DSL_Barre_STC += '<br>';

        menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
        menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';
        $("div#MEP_SAV").append(menu_info_DSL_SAV);

        SAV_DSLE += '<br>' + obj.nomRessource + '<br>' + Liste_Code_Offre(codeOffreDSL) + '<br>';

        // MEP_info_DSL();

        Outils_SAV();
        Outils_Barre_STC("Info DSL - basCEE");

        // MEP_SAV();
    } else {
        alert("type de lien non déterminé");
    }
}

function Liste_Code_Offre(Code) {

    var tableauOffreDSL = new Array();

    tableauOffreDSL["ACC-SAIC-003"] = "SDSL Monopaire 2 Mbits/s (2048 kbps)";

    tableauOffreDSL["ACC-SAIP-001"] = "SDSL Monopaire 256 kbits/s (320 kbps)";
    tableauOffreDSL["ACC-SAIP-002"] = "SDSL Monopaire 512 kbits/s (640 kbps)";
    tableauOffreDSL["ACC-SAIP-003"] = "SDSL Monopaire 1 Mbits/s (1280 kbps)";
    tableauOffreDSL["ACC-SAIP-004"] = "SDSL Monopaire 2 Mbits/s (2048 kbps)";
    tableauOffreDSL["ACC-SAIP-025"] = "SDSL Monopaire 4 Mbits/s (4096 kbps)";
    tableauOffreDSL["ACC-SAIP-202"] = "SDSL Bipaire 512 kbits/s (2x320 kbps)";
    tableauOffreDSL["ACC-SAIP-203"] = "SDSL Bipaire 1 Mbits/s (2x640 kbps)";
    tableauOffreDSL["ACC-SAIP-204"] = "SDSL Bipaire 2 Mbits/s (2x1024 kbps)";
    tableauOffreDSL["ACC-SAIP-205"] = "SDSL Bipaire 4 Mbits/s (2x2048 kbps)";
    tableauOffreDSL["ACC-SAIP-222"] = "SDSL Bipaire 3 Mbits/s (2x1536 kbps)";

    tableauOffreDSL["ACC-SAIL-021"] = "SDSL Bipaire 512 kbits/s (640 kbps)";
    tableauOffreDSL["ACC-SAIL-022"] = "SDSL Bipaire 1 Mbits/s (1280 kbps)";
    tableauOffreDSL["ACC-SAIL-003"] = "SDSL Monopaire 2 Mbits/s (2048 kbps)";
    tableauOffreDSL["ACC-SAIL-023"] = "SDSL Bipaire 2 Mbits/s (2048 kbps)";
    tableauOffreDSL["ACC-SAIL-025"] = "SDSL Bipaire 4 Mbits/s (4096 kbps)";

    tableauOffreDSL["ACC-SAIO-023"] = "TDSL 2CS option1 (bi-paire)";

    tableauOffreDSL["ACC-CRUI-006"] = "Cruise 2048 / (SDSL en DSL-D)";
    tableauOffreDSL["ACC-CRUI-025"] = "Cruise 1280 BIPAIRE / (SDSL en DSL-D)";
    tableauOffreDSL["ACC-CRUI-028"] = "Cruise 4096 BIPAIRE / (SDSL en DSL-D)";


    tableauOffreDSL["ACC-SAIE-202"] = "SDSL EFM 2-Paires 2 Mbits/s (2234 kbps)";
    tableauOffreDSL["ACC-SAIE-204"] = "SDSL EFM 2-Paires 4 Mbits/s (4608 kbps)";

    tableauOffreDSL["ACC-SAIE-401"] = "SDSL EFM 4-Paires 1 Mbits/s (1152 kbps)";
    tableauOffreDSL["ACC-SAIE-402"] = "SDSL EFM 4-Paires 2 Mbits/s (2234 kbps)";
    tableauOffreDSL["ACC-SAIE-404"] = "SDSL EFM 4-Paires 4 Mbits/s (4608 kbps)";
    tableauOffreDSL["ACC-SAIE-408"] = "SDSL EFM 4-Paires 8 Mbits/s (9216 kbps)";
    tableauOffreDSL["ACC-SAIE-412"] = "SDSL EFM 4-Paires 12 Mbits/s (13409 kbps)";


    tableauOffreDSL["ACC-SCEE-102"] = "Collecte CEE FT - 2 Mbit/s SDSL 1-Paire";
    tableauOffreDSL["ACC-SCEE-200"] = "Collecte CEE FT - 0.5 Mbit/s SDSL 2-Paires";
    tableauOffreDSL["ACC-SCEE-204"] = "Collecte CEE FT - 4 Mbit/s SDSL 2-Paires";
    tableauOffreDSL["ACC-SCEE-401"] = "Collecte CEE FT - 1 Mbit/s SDSL 4-Paires";
    tableauOffreDSL["ACC-SCEE-402"] = "Collecte CEE FT - 2 Mbit/s SDSL 4-Paires";
    tableauOffreDSL["ACC-SCEE-404"] = "Collecte CEE FT - 4 Mbit/s SDSL 4-Paires";
    tableauOffreDSL["ACC-SCEE-408"] = "Collecte CEE FT - 8 Mbit/s SDSL 4-Paires";

    tableauOffreDSL["ACC-SCBE-208"] = "Collecte CEE FT - 8 Mbit/s SDSL Bis Bipaire (9216 kbps)";
    tableauOffreDSL["ACC-SCBE-412"] = "Collecte CEE FT - 12 Mbit/s SDSL Bis Quadri Paire";

    tableauOffreDSL["ACC-SAIB-205"] = "Offre SDSL.bis à débit crête ACC-SAIB 5Mb/s bipaire";
    tableauOffreDSL["ACC-SAIB-228"] = "Offre SDSL.bis à débit crête ACC-SAIB 8Mb/s bipaire";

    tableauOffreDSL["ACC-WINP-001"] = "ADSL 512 kbits/s";
    tableauOffreDSL["ACC-WINP-002"] = "ADSL 1 Mbits/s";
    tableauOffreDSL["ACC-WINP-003"] = "ADSL 2 Mbits/s";
    tableauOffreDSL["ACC-WINP-006"] = "ADSL 512 kbits/s";

    tableauOffreDSL["ACC-SURT-199"] = "Surfer MAX (entreprise ACC-SURT-199)";

    tableauOffreDSL["ACC-DSLE-003"] = "ADSL crt 2048 / 320 gar 250 K 1P";
    tableauOffreDSL["ACC-DSLE-007"] = "SDSL crt 640 gar 75 K 1P";
    tableauOffreDSL["ACC-DSLE-207"] = "SDSL crt 640 gar 75 K 2P";
    tableauOffreDSL["ACC-DSLE-030"] = "SDSL crt 1280 gar 75 K 1P";
    tableauOffreDSL["ACC-DSLE-230"] = "SDSL crt 1280 gar 75 K 2P";
    tableauOffreDSL["ACC-DSLE-208"] = "SDSL crt 1280 gar 150 K 2P";
    tableauOffreDSL["ACC-DSLE-031"] = "SDSL crt 2048 gar 75 K 1P";
    tableauOffreDSL["ACC-DSLE-211"] = "SDSL gar 640 K 2P";
    tableauOffreDSL["ACC-DSLE-012"] = "SDSL gar 1280 K 1P";
    tableauOffreDSL["ACC-DSLE-212"] = "SDSL gar 1280 K 2P";
    tableauOffreDSL["ACC-DSLE-213"] = "SDSL gar 2048 K 2P";
    tableauOffreDSL["ACC-DSLE-215"] = "SDSL crt 4096 gar 2000 K 2P";
    tableauOffreDSL["ACC-DSLE-216"] = "SDSL gar 4096 K 2P";
    tableauOffreDSL["ACC-DSLE-231"] = "SDSL crt 2048 gar 75 K 2P";
    tableauOffreDSL["ACC-DSLE-233"] = "SDSL crt 4096 gar 500 K 2P";

    tableauOffreDSL["ACC-PTPE-099"] = "ADSL 8M/640k";

    return tableauOffreDSL[Code];
}

function Launch_Info_THD() {

    var menu_info_THD_N2 = '';
    var menu_info_DSL_SAV = '';

    // alert(obj.thdInfos[0].DSPCE2O);

    // if (CE2O_feuille != 'NC') {
    if (obj.thdInfos[0].DSPCE2O == 'CE2O') {

        // menu_info_THD_N2 += 'Info CE2O <hr>';
        // menu_info_THD_N2 += '<a target=_blank href="' + url_ipsite_bench + '">IPSITE BENCH</a>';
        // menu_info_THD_N2 += '<br> Feuille : ' + CE2O_feuille;
        // menu_info_THD_N2 += '<br> Tronc &nbsp: ' + CE2O_tronc + ' - Vlan : ' + CE2O_vlan;

        // $("div#MEP_Info_Lien").append(menu_info_THD_N2);

        menu_info_DSL_Barre_STC += 'CE2O : ' + CE2O_feuille;
        menu_info_DSL_Barre_STC += '<br>CE2O-VLAN : ' + CE2O_vlan;
        menu_info_DSL_Barre_STC += '<br>';

        menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
        menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';
        $("div#MEP_SAV").append(menu_info_DSL_SAV);

        SAV_CE2O += '<br>' + CE2O_feuille;
        SAV_CE2O += '<br>VLAN : ' + CE2O_vlan + '<br>';

    } else {
        menu_info_THD_N2 += 'Info FIBRE SFR <hr>';
        menu_info_THD_N2 += ' Peut etre un jour ...';

        $("div#MEP_Info_Lien").append(menu_info_THD_N2);

        menu_info_DSL_Barre_STC += 'Info FIBRE SFR \r\n';
        menu_info_DSL_Barre_STC += 'Peut etre un jour ...';
        menu_info_DSL_Barre_STC += '<br>';

        menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
        // menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';
        // menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoDSL\',headingText:\'Informations DSL\'});" href="#" style="cursor: pointer;" class=" ">Informations DSL</a>';
        menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';


        $("div#MEP_SAV").append(menu_info_DSL_SAV);

        SAV_Fibre_SFR += '<br>Ref de la Fibre : peut etre un jour ...';
        SAV_Fibre_SFR += '<br>VLAN : Pareil <br>';

        // var wait_CPE_L2 =

        Outils_Barre_STC("Info THD");
    }

    // MEP_info_THD();

    Outils_SAV();
    // Outils_Barre_STC("Info THD");

    // MEP_SAV();
}

function Outils_SAV() {

    if (((SAV_Offre != '' && SAV_NDI != '' && SAV_DSLAM != '') || SAV_DSLE != '' || SAV_LPT != '' || SAV_CE2O != '' || SAV_Fibre_SFR != '') && (SAV_CPE != '' || SAV_CPE_Barre_STC != '')) {

        var menu_tableau_cache = '';

        menu_tableau_cache += '<div id= tableauInfoSAV class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';

        menu_tableau_cache += '######## INFORMATION LIGNE ########<br>';

        menu_tableau_cache += SAV_CE2O;
        menu_tableau_cache += SAV_Fibre_SFR;
        menu_tableau_cache += SAV_LPT;
        menu_tableau_cache += SAV_DSLE;
        menu_tableau_cache += SAV_Offre;
        menu_tableau_cache += SAV_DSLAM;
        menu_tableau_cache += SAV_NDI;

        menu_tableau_cache += '<br>######## INFORMATION ROUTEUR ########<br>'

        if (Nbr_CPE > 0) {
            menu_tableau_cache += SAV_CPE_Tab[1];
        }
        if (Nbr_CPE > 1) {
            menu_tableau_cache += SAV_CPE_Tab[2];
        }
        if (Nbr_CPE > 2) {
            menu_tableau_cache += SAV_CPE_Tab[3];
        }
        if (Nbr_CPE > 3) {
            menu_tableau_cache += SAV_CPE_Tab[4];
        }

        menu_tableau_cache += '</div>';


        MEP_DIV_cachee(menu_tableau_cache);
    };
}

function Outils_Barre_STC(tqui) {

    // alert(tqui);
    console.log(tqui);

    if (((SAV_Offre != '' && SAV_NDI != '' && SAV_DSLAM != '') || SAV_DSLE != '' || SAV_LPT != '' || SAV_CE2O != '' || SAV_Fibre_SFR != '') && (SAV_CPE_Barre_STC != '' || SAV_CPE != '')) {

        var menu_tableau_cache = '';

        menu_tableau_cache += '<div id= BarreSTC class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';

        // menu_tableau_cache += '<br><br><center><a id="copier" href="#"">Copier le Bloc Résumé</a></center><br><br><br>'
        menu_tableau_cache += '<br><br><center><button id="copier">Copier le Bloc Résumé</button></center><br><br><br>'
        menu_tableau_cache += '################ Référence ##############<br><br>';
        menu_tableau_cache += 'Référence : ' + obj.masterID + ' - ' + obj.idLdcom + '<br><br>';
        menu_tableau_cache += '######## INFORMATION BOUCLE LOCALE ########<br><br>';

        menu_tableau_cache += '<table cellpadding=0 cellspacing=0>';
        menu_tableau_cache += menu_info_DSL_Barre_STC;
        menu_tableau_cache += '</table>';

        menu_tableau_cache += '<br>######## INFORMATION LIEN / RACCORDEMENT ########<br>';

        menu_tableau_cache += SAV_CE2O;
        menu_tableau_cache += SAV_Fibre_SFR;
        menu_tableau_cache += SAV_LPT;
        menu_tableau_cache += SAV_DSLE;
        menu_tableau_cache += SAV_Offre;
        menu_tableau_cache += SAV_DSLAM;
        menu_tableau_cache += SAV_NDI;

        menu_tableau_cache += '<br>######## INFORMATION ROUTEUR ########';

        if (Nbr_M2DB_count > 3) {
            menu_tableau_cache += SAV_CPE;
        }
        if (Nbr_CPE > 0) {
            menu_tableau_cache += SAV_CPE_Barre_STC_Tab[1];
        }
        if (Nbr_CPE > 1) {
            menu_tableau_cache += SAV_CPE_Barre_STC_Tab[2];
        }
        if (Nbr_CPE > 2) {
            menu_tableau_cache += SAV_CPE_Barre_STC_Tab[3];
        }
        if (Nbr_CPE > 3) {
            menu_tableau_cache += SAV_CPE_Barre_STC_Tab[4];
        }

        menu_tableau_cache += '<br><br>#################################';
        menu_tableau_cache += '<br><br><br><br><br>';

        menu_tableau_cache += '</div>';


        MEP_DIV_cachee(menu_tableau_cache);
        MEP_BARRE_STC();

        // $("a#copier").click(function() {
        $("button#copier").click(function() {

            var back_slashed_tab = $(menu_tableau_cache).html();
            back_slashed_tab = back_slashed_tab.replace(/<br>/gi, "\r\n");
            back_slashed_tab = back_slashed_tab.replace(/<tr.+?>/gi, "");
            back_slashed_tab = back_slashed_tab.replace(/<.tr>/gi, "\r\n");
            back_slashed_tab = back_slashed_tab.replace(/<td>/gi, "");
            back_slashed_tab = back_slashed_tab.replace(/<.td>/gi, "\t");
            back_slashed_tab = back_slashed_tab.replace(/\s\s:/gi, " :");
            back_slashed_tab = back_slashed_tab.replace(/<.+>/gi, "");
            // alert(back_slashed_tab);
            GM_setClipboard(back_slashed_tab);

        });

    };
}

function HADES(HADrESse_IP, num_cpe, hostname) {

    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://10.102.233.34/Hades/logcpe_diagvgates.php?IP=' + HADrESse_IP + '&offre=' + Nom_OFFRE,
        onload: function(response) {
            var codeHTML = '<div>' + response.responseText + '</div>';
            codeHTML = codeHTML.replace(/<img[^>]*>/g, "");
            //alert("ok hades");
            //alert(HADrESse_IP);

            // var debut_info = response.responseText.search("Dernier reboot");
            var debut_info = response.responseText.search("<center><a href");
            var bloc_info = response.responseText.substring(debut_info);
            // bloc_info = bloc_info.replace(/image/g,"http://10.102.233.34/Hades/image");

            var etat = 'vert';

            if (bloc_info.match('Undefined') != null) {
                etat = 'HS';
            }
            // if (bloc_info.match('Pas de connexion au routeur SFR possible via') != null) { etat = 'orange'; }
            if (bloc_info.match("Le routeur SFR n'est pas joignable") != null) {
                etat = 'rouge';
            }
            // if (bloc_info.match('Les logs du routeur ne sont pas exploitables') != null) { etat = 'violet'; }

            //alert(etat);

            var menu_tableau_cache = '';
            menu_tableau_cache += '<div id= HADES_' + HADrESse_IP + ' class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';
            menu_tableau_cache += bloc_info;
            menu_tableau_cache += '</div>';

            MEP_DIV_cachee(menu_tableau_cache);
            // MEP_HADES(HADrESse_IP, num_cpe, etat);

            var bouton_hades = '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'HADES_' + HADrESse_IP + '\',headingText:\'Powered by HADES - ' + HADrESse_IP + '\'});" href="#" style="cursor: pointer;" class=" "><img width="11" height="11" src=' + GM_dossier + '/image/' + etat + '.jpg ></a>';

            $("table#Bloc_Technique_CPE tr#" + hostname + " td:eq(0)").html(bouton_hades);
        }
    });
}

function Mercures(url) {

    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://10.102.233.34/Mercure/stat.php?url=' + encodeURIComponent(url) + '&site=' + encodeURIComponent(Nom_Site) + '&offre=' + encodeURIComponent(Nom_OFFRE),
        onload: function(response) {
            var codeHTML = '<div>' + response.responseText + '</div>';
            codeHTML = codeHTML.replace(/<img[^>]*>/g, "");

            // alert('http://10.102.233.34/Mercure/stat.php?url='+encodeURIComponent(url)+'&site='+encodeURIComponent(Nom_Site)+'&offre='+encodeURIComponent(Nom_OFFRE));

            var menu_tableau_cache = '<div id= Mercure class="highslide-maincontent">' + codeHTML + '</div>';

            var pastille_mercure = '';
            pastille_mercure += '<div id= Mercure class="highslide-maincontent">';
            // pastille_mercure += '<br><a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'Mercure_MOISSTATSVPN\',headingText:\'Powered by Mercure\'});" href="#" style="cursor: pointer;" class=" ">Site Jour</a>';
            // pastille_mercure += '<br><a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'Mercure_MOISSTATSITE\',headingText:\'Powered by Mercure\'});" href="#" style="cursor: pointer;" class=" ">Site Mois</a>';
            pastille_mercure += $(codeHTML).find('#JOURSTATSITE').html();
            // pastille_mercure += '<br>';
            // pastille_mercure += $(codeHTML).find('#MOISSTATSITE').html();
            pastille_mercure += '<br><center>'
            pastille_mercure += '<br><a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'Mercure_JOURSTATSVPN\',headingText:\'Powered by Mercure\'});" href="#" style="cursor: pointer;" class=" ">Vue du Jour pour les autres accès du ' + Nom_OFFRE + '</a>';
            pastille_mercure += '<br><br><a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'Mercure_MOISSTATSVPN\',headingText:\'Powered by Mercure\'});" href="#" style="cursor: pointer;" class=" ">Vue du Mois pour les autres accès du ' + Nom_OFFRE + '</a>';
            pastille_mercure += '</center></div>';

            var tableau_site_jour = '<div id= Mercure_JOURSTATSITE class="highslide-maincontent">' + $(codeHTML).find('#JOURSTATSITE').html() + '</div>';
            var tableau_site_mois = '<div id= Mercure_MOISSTATSITE class="highslide-maincontent">' + $(codeHTML).find('#MOISSTATSITE').html() + '</div>';
            var tableau_VPN_jour = '<div id= Mercure_JOURSTATSVPN class="highslide-maincontent">' + $(codeHTML).find('#JOURSTATSVPN').html() + '</div>';
            var tableau_VPN_mois = '<div id= Mercure_MOISSTATSVPN class="highslide-maincontent">' + $(codeHTML).find('#MOISSTATSVPN').html() + '</div>';


            MEP_DIV_cachee(tableau_site_jour);
            MEP_DIV_cachee(tableau_site_mois);
            MEP_DIV_cachee(tableau_VPN_jour);
            MEP_DIV_cachee(tableau_VPN_mois);

            MEP_DIV_cachee(pastille_mercure);

            MEP_Mercure();
        }
    });
}

function Ulysses_Services() {
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://ulysseservices-prod-neuf.private.sfr.com:8083/ULYSSE_SERVICES_2/action/login",
        data: "srv=&wfs=w4adm&cmd=login&nextPage=corbeille&login.actorName=" + GM_getValue("login_ulysses") + "&login.password=" + GM_getValue("password_ulysses") + "&Submit=Connexion",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(response) {
            var codeHTML = response.responseText;
            codeHTML = codeHTML.replace(/<img[^>]*>/gi, "");

            var link_recherche = $(codeHTML).find("ul.buttons2 a:eq(1)").attr("href");

            link_recherche = "http://ulysseservices-prod-neuf.private.sfr.com:8083/" + link_recherche;

            GM_xmlhttpRequest({
                method: "POST",
                url: link_recherche,
                data: "cmd=&masterID=" + obj.masterID + "&ndi=&raiSoc=&ville=&idCommande=&ipIAD=&dateRdv_day=&dateRdv_month=&dateRdv_year=&dateRdv=",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                onload: function(response) {
                    var codeHTML = response.responseText;
                    codeHTML = codeHTML.replace(/<img[^>]*>/gi, "");

                    var i_ref = $(codeHTML).find("table.corbeille a:eq(0)").attr("href");

                    i_ref = i_ref.substring(i_ref.indexOf("(") + 1, i_ref.indexOf(")") - 1);
                    // alert(i_ref);

                    // link_i = "http://ulysseservices-prod-neuf.private.sfr.com:8083/" + link_recherche;

                    var i_href = "http://ulysseservices-prod-neuf.private.sfr.com:8083/ULYSSE_SERVICES_2/EtatDossier.neuf?BDSID=" + i_ref;

                    var mep = "<p><a href='" + i_href + "'target='_blank'>Ulysses Services</a></p>";

                    $("div#Bloc_Technique_Info").append(mep);

                    // alert(link_recherche);

                }
            });

        }
    });
}

function Go_Stats_Recup_Url_All(url_stats) {

    GM_addStyle(".ReportTableHeader {background-color: #CCC5C5; color: #FFFFFF; font-size: 13px; font-weight: normal;}");
    GM_addStyle(".ReportTableSubHeader {background-color: #CCC5C5; font-size: 1em; vertical-align: top;}");
    GM_addStyle(".ReportTableRowAltBgColor {background-color: #EDEDED;}");
    GM_addStyle(".ReportTableRowBgColor {background-color: #DDDDDD;}");
    GM_addStyle(".ReportTableSubHeader a {color: #FFFFFF;}");
    GM_addStyle(".pv-table a {color: #000000; text-decoration: none;}");
    GM_addStyle(".pv-table table {border-collapse: collapse; border-color: #999999; border-spacing: 0; border-style: solid; border-width: 1px; font-size: 0.9em;}");
    GM_addStyle(".pv-table td {border-color: #999999; border-style: solid; border-width: 1px;padding: 3px;}");

    $("<div id='Mercure' class='pv-table highslide-maincontent'></div>").appendTo("body");

    var Debut_URL_stats = 'https://perfs.sfrbusinessteam.fr/PV/SilverStream/Pages/';
    var Nom_Site_en_forme = Nom_Site.replace(/'/gi, " ' ");
    // alert(Nom_Site_en_forme);

    GM_xmlhttpRequest({
        method: "GET",
        url: url_stats,
        onload: function(response) {
            // Get Cookie
            var url_finale = response.finalUrl;
            // alert(url_finale);
            // console.log(url_finale);

            if (Nom_OFFRE == '9CONNECT' || Nom_OFFRE == '9connect') {
                var URL_tableau_mois_All = url_finale

                var URL_tableau_jour_All = URL_tableau_mois_All.replace(/timeSpan=month/gi, "timeSpan=day");

                Go_Stats_Tab(URL_tableau_jour_All, "Jour", "All");
                Go_Stats_Tab(URL_tableau_mois_All, "Mois", "All");


                GM_xmlhttpRequest({
                    method: "GET",
                    url: url_finale,
                    onload: function(response) {

                        var codeHTML = response.responseText;
                        codeHTML = codeHTML.replace(/<img[^>]*>/gi, "");

                        // alert($(codeHTML).find(".NavTable a").text());

                        var URL_tableau_mois_Site = $(codeHTML).find(".NavTable a:contains('" + Nom_Site_en_forme + "')").attr("href");
                        URL_tableau_mois_Site = URL_tableau_mois_Site.substring(2);

                        URL_tableau_mois_Site = Debut_URL_stats + URL_tableau_mois_Site;
                        // alert(URL_tableau_mois_Site);

                        Go_Stats_Recup_Url_Site(URL_tableau_mois_Site);

                    }
                });

            } else if (Nom_OFFRE == '9iPnet' || Nom_OFFRE == '9IPNET') {
                GM_xmlhttpRequest({
                    method: "GET",
                    url: url_finale,
                    onload: function(response) {
                        var codeHTML = response.responseText;
                        codeHTML = codeHTML.replace(/<img[^>]*>/gi, "");
                        // console.log(codeHTML);

                        var URL_tableau_mois_All = $(codeHTML).find("a:contains('Chargement de Liens Débit Garanti')").attr("href");
                        URL_tableau_mois_All = URL_tableau_mois_All.substring(2);
                        URL_tableau_mois_All = Debut_URL_stats + URL_tableau_mois_All;

                        var URL_tableau_jour_All = URL_tableau_mois_All.replace(/timeSpan=month/gi, "timeSpan=day");

                        // console.log(URL_tableau_jour_All);
                        // console.log(URL_tableau_mois_All);

                        Go_Stats_Tab(URL_tableau_jour_All, "Jour", "All");
                        Go_Stats_Tab(URL_tableau_mois_All, "Mois", "All");



                        var URL_tableau_mois_Site = $(codeHTML).find(".NavTable a:contains('" + Nom_Site_en_forme + "')").attr("href");
                        URL_tableau_mois_Site = URL_tableau_mois_Site.substring(2);
                        URL_tableau_mois_Site = Debut_URL_stats + URL_tableau_mois_Site;
                        // alert(URL_tableau_mois_Site);

                        Go_Stats_Recup_Url_Site(URL_tableau_mois_Site);

                    }
                });
            }

        }
    });
}

function Go_Stats_Recup_Url_Site(url_all) {

    GM_xmlhttpRequest({
        method: "GET",
        url: url_all,
        onload: function(response) {
            var codeHTML = response.responseText;
            codeHTML = codeHTML.replace(/<img[^>]*>/gi, "");
            // alert(codeHTML);

            var Debut_URL_stats = 'https://perfs.sfrbusinessteam.fr/PV/SilverStream/Pages/';

            var URL_tableau_mois_Site = $(codeHTML).find("a.NavLink:contains('Site')").attr("href");
            URL_tableau_mois_Site = URL_tableau_mois_Site.substring(2);
            URL_tableau_mois_Site = Debut_URL_stats + URL_tableau_mois_Site;
            // alert(URL_tableau_mois_Site);

            if (Nom_OFFRE == '9CONNECT' || Nom_OFFRE == '9connect') {
                var URL_tableau_jour_Site = URL_tableau_mois_Site.replace(/timeSpan=month/gi, "timeSpan=day");

                Go_Stats_Tab(URL_tableau_jour_Site, "Jour", "Site");
                Go_Stats_Tab(URL_tableau_mois_Site, "Mois", "Site");
            }

            GM_xmlhttpRequest({
                method: "GET",
                url: URL_tableau_mois_Site,
                onload: function(response) {
                    var codeHTML = response.responseText;
                    codeHTML = codeHTML.replace(/<img[^>]*>/gi, "");

                    URL_tableau_mois_Site = $(codeHTML).find("a:contains('Chargement de Liens Débit Garanti')").attr("href");
                    URL_tableau_mois_Site = URL_tableau_mois_Site.substring(2);
                    URL_tableau_mois_Site = Debut_URL_stats + URL_tableau_mois_Site;

                    var URL_tableau_jour_Site = URL_tableau_mois_Site.replace(/timeSpan=month/gi, "timeSpan=day");

                    Go_Stats_Tab(URL_tableau_jour_Site, "Jour", "Site");
                    Go_Stats_Tab(URL_tableau_mois_Site, "Mois", "Site");
                }
            });
        }
    });
}

function Go_Stats_Tab(url_tab, periode, site_ou_tout) {

    var Debut_URL_stats = 'https://perfs.sfrbusinessteam.fr/PV/SilverStream/Pages/';
    console.log(url_tab);

    GM_xmlhttpRequest({
        method: "GET",
        url: url_tab,
        onload: function(response) {

            var codeHTML = response.responseText;
            codeHTML = codeHTML.replace(/<img[^>]*>/gi, "");
            codeHTML = codeHTML.replace(/href="./gi, "href=" + Debut_URL_stats);

            var link = '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'Stats_all_' + periode + '\',headingText:\'Go Stats du ' + periode + ', Go ! \'});" href="#" style="cursor: pointer;" class=" ">All</a>';

            // var link = '<a href=# >All</a>';

            if (periode == "Jour") {
                // alert(codeHTML);
                codeHTML = codeHTML.replace(/<caption.+caption>/g, "<center>Vue du Jour [" + link + "]</center>");
                // alert(url_tab);
            } else if (periode == "Mois") {
                codeHTML = codeHTML.replace(/<caption.+caption>/g, "<center>Vue du Mois [" + link + "]</center>");
            }

            if (site_ou_tout == "Site") {
                var ze_tab = $(codeHTML).find("div.pv-table").last().html();
                // alert(ze_tab);
                // $("<div id='Mercure' class='pv-table highslide-maincontent'>"+ze_tab+"</div>").appendTo("body");
                $(ze_tab).appendTo("div#Mercure");
            } else if (site_ou_tout == "All") {
                var ze_tab = $(codeHTML).find("div.pv-table").last().html();
                $("<div id='Stats_all_" + periode + "' class='pv-table highslide-maincontent'>" + ze_tab + "</div>").appendTo("body");
                // $(ze_tab).appendTo("div#Mercure");
            }

            $("div.pv-table tr").each(function() {

                var alerte_down = $(this).find("td:nth-child(11)").text();
                var time_down = parseInt($(this).find("td:nth-child(12)").text());
                var alerte_up = $(this).find("td:nth-child(16)").text();
                var time_up = parseInt($(this).find("td:nth-child(17)").text());

                if (alerte_down > 0 || alerte_up > 0) {
                    $(this).css({
                        "color": "orange"
                    });
                    $("a", this).css({
                        "color": "orange"
                    });
                };
                if (alerte_down > 4 || alerte_up > 4) {
                    $(this).css({
                        "color": "red"
                    });
                    $("a", this).css({
                        "color": "red"
                    });
                };
                if (time_down > 3 || time_up > 3) {
                    $(this).css({
                        "color": "red"
                    });
                    $("a", this).css({
                        "color": "red"
                    });
                };

            })

            $("div#MEP_listing_Site a#pastille").attr("onclick", "copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'Mercure\',headingText:\'Go Stats, Go !\'});");
            $("div#MEP_listing_Site a#pastille").html('<img width="12" height="12" src=' + GM_dossier + '/image/vert.jpg >');

        }
    });
}

function MEP_Carte() {
    $("<div id='Cartes'></div>")
        .css({
            "top": "0px",
            "right": "50%",
            "position": "absolute",
            "backgroundColor": "#fff",
        })
        .appendTo("body");

    Carte_Incidents();
    Carte_France();
}

function Carte_France() {
    //alert(obj.CltCodePostal);
    var departement = obj.CltCodePostal.substr(0, 2);

    if (departement == '20') {
        if (obj.CltCodePostal < 20200) {
            departement = '2A';
        } else {
            departement = '2B';
        }
    }
    //alert(departement);

    var tableauCarteDepartement = new Array();
    tableauCarteDepartement["01"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/D%C3%A9partement_01_in_France.svg/300px-D%C3%A9partement_01_in_France.svg.png ';
    tableauCarteDepartement["02"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/1/18/D%C3%A9partement_02_in_France.svg/300px-D%C3%A9partement_02_in_France.svg.png ';
    tableauCarteDepartement["03"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/D%C3%A9partement_03_in_France.svg/300px-D%C3%A9partement_03_in_France.svg.png ';
    tableauCarteDepartement["04"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/D%C3%A9partement_04_in_France.svg/300px-D%C3%A9partement_04_in_France.svg.png ';
    tableauCarteDepartement["05"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Hautes-Alpes_departement_locator_map.svg/300px-Hautes-Alpes_departement_locator_map.svg.png ';
    tableauCarteDepartement["06"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Alpes-Maritimes_departement_locator_map.svg/280px-Alpes-Maritimes_departement_locator_map.svg.png ';
    tableauCarteDepartement["07"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Ard%C3%A8che_departement_locator_map.svg/300px-Ard%C3%A8che_departement_locator_map.svg.png ';
    tableauCarteDepartement["08"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Ardennes_departement_locator_map.svg/300px-Ardennes_departement_locator_map.svg.png ';
    tableauCarteDepartement["09"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Ari%C3%A8ge_departement_locator_map.svg/300px-Ari%C3%A8ge_departement_locator_map.svg.png ';
    tableauCarteDepartement["10"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Aube_departement_locator_map.svg/300px-Aube_departement_locator_map.svg.png ';
    tableauCarteDepartement["11"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Aude_departement_locator_map.svg/300px-Aude_departement_locator_map.svg.png ';
    tableauCarteDepartement["12"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Aveyron_departement_locator_map.svg/300px-Aveyron_departement_locator_map.svg.png ';
    tableauCarteDepartement["13"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Bouches-du-Rh%C3%B4ne_departement_locator_map.svg/300px-Bouches-du-Rh%C3%B4ne_departement_locator_map.svg.png ';
    tableauCarteDepartement["14"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Calvados_departement_locator_map.svg/300px-Calvados_departement_locator_map.svg.png ';
    tableauCarteDepartement["15"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Cantal_departement_locator_map.svg/300px-Cantal_departement_locator_map.svg.png ';
    tableauCarteDepartement["16"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Charente_departement_locator_map.svg/300px-Charente_departement_locator_map.svg.png ';
    tableauCarteDepartement["17"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Charente-Maritime-Position.svg/300px-Charente-Maritime-Position.svg.png ';
    tableauCarteDepartement["18"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Cher-Position.svg/300px-Cher-Position.svg.png ';
    tableauCarteDepartement["19"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Corr%C3%A8ze-Position.svg/300px-Corr%C3%A8ze-Position.svg.png ';
    tableauCarteDepartement["2A"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Corse-du-Sud-Position.svg/300px-Corse-du-Sud-Position.svg.png ';
    tableauCarteDepartement["2B"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Haute-Corse-Position.svg/300px-Haute-Corse-Position.svg.png';
    tableauCarteDepartement["21"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/98/C%C3%B4te-d%E2%80%99Or-Position.svg/300px-C%C3%B4te-d%E2%80%99Or-Position.svg.png ';
    tableauCarteDepartement["22"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/D%C3%A9partement_22_in_France.svg/300px-D%C3%A9partement_22_in_France.svg.png ';
    tableauCarteDepartement["23"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Creuse-Position.svg/250px-Creuse-Position.svg.png ';
    tableauCarteDepartement["24"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dordogne-Position.svg/300px-Dordogne-Position.svg.png';
    tableauCarteDepartement["25"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Doubs-Position.svg/300px-Doubs-Position.svg.png ';
    tableauCarteDepartement["26"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Dr%C3%B4me_departement_locator_map.svg/300px-Dr%C3%B4me_departement_locator_map.svg.png ';
    tableauCarteDepartement["27"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Eure-Position.svg/300px-Eure-Position.svg.png ';
    tableauCarteDepartement["28"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Eure-et-Loir-Position.svg/300px-Eure-et-Loir-Position.svg.png ';
    tableauCarteDepartement["29"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Finist%C3%A8re_departement_locator_map.svg/300px-Finist%C3%A8re_departement_locator_map.svg.png ';
    tableauCarteDepartement["30"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Gard-Position.svg/300px-Gard-Position.svg.png ';
    tableauCarteDepartement["31"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Haute-Garonne-Position.svg/300px-Haute-Garonne-Position.svg.png ';
    tableauCarteDepartement["32"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Gers-Position.svg/300px-Gers-Position.svg.png ';
    tableauCarteDepartement["33"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Gironde-Position.svg/300px-Gironde-Position.svg.png ';
    tableauCarteDepartement["34"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/94/H%C3%A9rault-Position.svg/300px-H%C3%A9rault-Position.svg.png ';
    tableauCarteDepartement["35"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ille-et-Vilaine-Position.svg/300px-Ille-et-Vilaine-Position.svg.png ';
    tableauCarteDepartement["36"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Indre-Position.svg/300px-Indre-Position.svg.png ';
    tableauCarteDepartement["37"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Indre-et-Loire-Position.svg/300px-Indre-et-Loire-Position.svg.png ';
    tableauCarteDepartement["38"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Is%C3%A8re-Position.svg/300px-Is%C3%A8re-Position.svg.png ';
    tableauCarteDepartement["39"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Jura-Position.svg/250px-Jura-Position.svg.png ';
    tableauCarteDepartement["40"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Landes-Position.svg/300px-Landes-Position.svg.png ';
    tableauCarteDepartement["41"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Loir-et-Cher-Position.svg/300px-Loir-et-Cher-Position.svg.png ';
    tableauCarteDepartement["42"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Loire-Position.svg/250px-Loire-Position.svg.png ';
    tableauCarteDepartement["43"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Haute-Loire-Position.svg/250px-Haute-Loire-Position.svg.png ';
    tableauCarteDepartement["44"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Loire-Atlantique-Position.svg/250px-Loire-Atlantique-Position.svg.png ';
    tableauCarteDepartement["45"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Loiret-Position.svg/250px-Loiret-Position.svg.png ';
    tableauCarteDepartement["46"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Lot-Position.svg/300px-Lot-Position.svg.png ';
    tableauCarteDepartement["47"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Lot-et-Garonne-Position.svg/300px-Lot-et-Garonne-Position.svg.png ';
    tableauCarteDepartement["48"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Loz%C3%A8re-Position.svg/300px-Loz%C3%A8re-Position.svg.png ';
    tableauCarteDepartement["49"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Maine-et-Loire-Position.svg/300px-Maine-et-Loire-Position.svg.png ';
    tableauCarteDepartement["50"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Manche-Position.svg/300px-Manche-Position.svg.png ';
    tableauCarteDepartement["51"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Marne-Position.svg/300px-Marne-Position.svg.png';
    tableauCarteDepartement["52"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Haute-Marne-Position.svg/300px-Haute-Marne-Position.svg.png ';
    tableauCarteDepartement["53"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Mayenne-Position.svg/300px-Mayenne-Position.svg.png ';
    tableauCarteDepartement["54"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Meurthe-et-Moselle-Position.svg/300px-Meurthe-et-Moselle-Position.svg.png ';
    tableauCarteDepartement["55"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Meuse-Position.svg/300px-Meuse-Position.svg.png ';
    tableauCarteDepartement["56"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Morbihan-Position.svg/250px-Morbihan-Position.svg.png ';
    tableauCarteDepartement["57"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Moselle-Position.svg/300px-Moselle-Position.svg.png ';
    tableauCarteDepartement["58"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Ni%C3%A8vre-Position.svg/300px-Ni%C3%A8vre-Position.svg.png ';
    tableauCarteDepartement["59"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Nord-Position.svg/250px-Nord-Position.svg.png ';
    tableauCarteDepartement["60"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Oise-Position.svg/300px-Oise-Position.svg.png ';
    tableauCarteDepartement["61"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Orne-Position.svg/300px-Orne-Position.svg.png ';
    tableauCarteDepartement["62"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Pas-de-Calais-Position.svg/300px-Pas-de-Calais-Position.svg.png ';
    tableauCarteDepartement["63"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Puy-de-D%C3%B4me-Position.svg/250px-Puy-de-D%C3%B4me-Position.svg.png ';
    tableauCarteDepartement["64"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Pyr%C3%A9n%C3%A9es-Atlantiques-Position.svg/300px-Pyr%C3%A9n%C3%A9es-Atlantiques-Position.svg.png ';
    tableauCarteDepartement["65"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Hautes-Pyr%C3%A9n%C3%A9es-Position.svg/300px-Hautes-Pyr%C3%A9n%C3%A9es-Position.svg.png ';
    tableauCarteDepartement["66"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Pyr%C3%A9n%C3%A9es-Orientales-Position.svg/300px-Pyr%C3%A9n%C3%A9es-Orientales-Position.svg.png ';
    tableauCarteDepartement["67"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Bas-Rhin-Position.svg/250px-Bas-Rhin-Position.svg.png ';
    tableauCarteDepartement["68"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Haut-Rhin-Position.svg/250px-Haut-Rhin-Position.svg.png ';
    tableauCarteDepartement["69"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Rh%C3%B4ne-Position.svg/250px-Rh%C3%B4ne-Position.svg.png ';
    tableauCarteDepartement["70"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Haute-Sa%C3%B4ne-Position.svg/300px-Haute-Sa%C3%B4ne-Position.svg.png ';
    tableauCarteDepartement["71"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Sa%C3%B4ne-et-Loire-Position.svg/250px-Sa%C3%B4ne-et-Loire-Position.svg.png';
    tableauCarteDepartement["72"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sarthe-Position.svg/250px-Sarthe-Position.svg.png ';
    tableauCarteDepartement["73"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Savoie-Position.svg/250px-Savoie-Position.svg.png ';
    tableauCarteDepartement["74"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Haute-Savoie_departement_locator_map.svg/300px-Haute-Savoie_departement_locator_map.svg.png ';
    tableauCarteDepartement["75"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/France_location_map-Regions_and_departements.svg/270px-France_location_map-Regions_and_departements.svg.png ';
    tableauCarteDepartement["76"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Seine-Maritime-Position.svg/300px-Seine-Maritime-Position.svg.png ';
    tableauCarteDepartement["77"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Seine-et-Marne-Position.svg/250px-Seine-et-Marne-Position.svg.png ';
    tableauCarteDepartement["78"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Yvelines-Position.svg/300px-Yvelines-Position.svg.png ';
    tableauCarteDepartement["79"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Deux-S%C3%A8vres-Position.svg/300px-Deux-S%C3%A8vres-Position.svg.png ';
    tableauCarteDepartement["80"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Somme-Position.svg/300px-Somme-Position.svg.png ';
    tableauCarteDepartement["81"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Tarn-Position.svg/300px-Tarn-Position.svg.png ';
    tableauCarteDepartement["82"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Tarn-et-Garonne-Position.svg/300px-Tarn-et-Garonne-Position.svg.png ';
    tableauCarteDepartement["83"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Var-Position.svg/280px-Var-Position.svg.png ';
    tableauCarteDepartement["84"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vaucluse-Position.svg/300px-Vaucluse-Position.svg.png ';
    tableauCarteDepartement["85"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Vend%C3%A9e-Position.svg/300px-Vend%C3%A9e-Position.svg.png ';
    tableauCarteDepartement["86"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Vienne-Position.svg/300px-Vienne-Position.svg.png ';
    tableauCarteDepartement["87"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Haute-Vienne-Position.svg/300px-Haute-Vienne-Position.svg.png ';
    tableauCarteDepartement["88"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Vosges-Position.svg/300px-Vosges-Position.svg.png ';
    tableauCarteDepartement["89"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yonne-Position.svg/250px-Yonne-Position.svg.png ';
    tableauCarteDepartement["90"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Territoire_de_Belfort-Position.svg/300px-Territoire_de_Belfort-Position.svg.png ';
    tableauCarteDepartement["91"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Essonne-Position.svg/250px-Essonne-Position.svg.png ';
    tableauCarteDepartement["92"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hauts-de-Seine-Position.svg/250px-Hauts-de-Seine-Position.svg.png ';
    tableauCarteDepartement["93"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Seine-Saint-Denis-Position.svg/300px-Seine-Saint-Denis-Position.svg.png ';
    tableauCarteDepartement["94"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Val-de-Marne-Position.svg/300px-Val-de-Marne-Position.svg.png ';
    tableauCarteDepartement["95"] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Val-d%E2%80%99Oise-Position.svg/300px-Val-d%E2%80%99Oise-Position.svg.png ';

    var menu_MEP = '<img width="131" height="144" src="' + tableauCarteDepartement[departement] + '">';

    $("<div id='Carte_France'>" + menu_MEP + "</div>")
        .css({
            "top": "0px",
            "left": "40%",
            "position": "absolute",
            "backgroundColor": "#fff",
        })
        .appendTo("div#Cartes");
}

function Carte_Incidents() {

    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://intranetstc.private.sfr.com:8099/gates.php?city=all',
        onload: function(response1) {

            var debut_svg = response1.responseText.indexOf("<svg");
            var fin_svg = response1.responseText.indexOf("</svg");

            var the_svg = response1.responseText.substring(debut_svg, fin_svg + 5);

            $("<div id='Carte_Incidents'>" + the_svg + "</div>")
                .css({
                    "top": "0px",
                    "right": "45%",
                    "position": "absolute",
                    "backgroundColor": "#fff",
                })
                .appendTo("div#Cartes");
        }
    });
}

function Generation_Div_Services(i, tab_services) {

    var compteur = 0;

    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://toolbox-cpe-prod-neuf.private.sfr.com:8080/reporting/supstat/' + tab_services[i],
        onload: function(response5) {
            var codeHTML5 = '<div>' + response5.responseText + '</div>';
            codeHTML5 = codeHTML5.replace(/<img[^>]*>/g, "");

            var menu_tableau_cache = ''

            menu_tableau_cache += '<div id= tableauService' + i + ' class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';

            $(codeHTML5).find("#tab-resultat tbody tr").each(function() {
                compteur = compteur + 1;
                menu_tableau_cache += '<tr>';
                menu_tableau_cache += '<td>' + $(this).find("td").eq(5).text() + '</td>';
                menu_tableau_cache += '<td>' + $(this).find("td").eq(7).text() + '</td>';
                menu_tableau_cache += '<td>' + $(this).find("td").eq(6).text() + '</td>';
                //menu_tableau += '<td>'+$(this).find("td").eq(8).text()+'</td>';
                menu_tableau_cache += '<td><a target=_blank href="' + GM_dossier + 'CreationBat.php?action=cpetoolbox&hostname=' + $(this).find("td").eq(8).text() + '&typeCPE=CISCO&typeOffre=' + Nom_OFFRE + '&NomClient=' + encodeURIComponent(Nom_Client) + '">' + $(this).find("td").eq(8).text() + '</a></td>';
                menu_tableau_cache += '</tr>';
            });

            menu_tableau_cache += '</table></div>';

            MEP_DIV_cachee(menu_tableau_cache);
        }
    });
}

function MEP_Listing_Site() {
    $("<div id='MEP_listing_Site'><p></p><p></p></div>")
        .css({
            "top": "85px",
            // "left": "899px",
            // "right": "40px",
            "left": "79%",
            "position": "fixed",
            // "position": "absolute",
            "padding": "10px",
            "backgroundColor": "#fff",
        })
        .appendTo("body");
}

function MEP_HADES(HADrESse_IP, num_cpe, etat) {

    var posY = 310;

    posY = posY + num_cpe * 15;


    var menu_MEP = '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'HADES_' + HADrESse_IP + '\',headingText:\'Powered by HADES - ' + HADrESse_IP + '\'});" href="#" style="cursor: pointer;" class=" "><img width="12" height="12" src=' + GM_dossier + '/image/' + etat + '.jpg ></a>';
    menuobj = document.createElement('ul');
    menuobj.id = 'MEP_HADES';
    menuobj.style.position = 'fixed';
    menuobj.style.top = posY + 'px';
    menuobj.style.left = '913px';
    menuobj.style.padding = '0px';
    menuobj.style.backgroundColor = '#fff';
    menuobj.innerHTML = menu_MEP;
    body = document.getElementsByTagName('body')[0];
    body.appendChild(menuobj);
}

function MEP_conf_CVS_CPE(num_cpe) {

    var posY = 310;

    posY = posY + num_cpe * 15;

    // var menu_MEP = menu_conf_CPE;
    var menu_MEP = CPE_Conf_CVS_Tab[num_cpe];
    menuobj = document.createElement('ul');
    menuobj.id = 'MEP_conf_CVS_CPE';
    menuobj.style.position = 'fixed';
    menuobj.style.top = posY + 'px';
    menuobj.style.left = '1144px';
    menuobj.style.padding = '0px';
    menuobj.style.backgroundColor = '#fff';
    menuobj.innerHTML = menu_MEP;
    body = document.getElementsByTagName('body')[0];
    body.appendChild(menuobj);
}

function MEP_listing_Service() {

    $("<div id='MEP_listing_Service'></div>")
        .css({
            "top": "696px",
            // "left": "899px",
            // "right": "40px",
            "left": "79%",
            "position": "fixed",
            "padding": "10px",
            "backgroundColor": "#fff",
        })
        .appendTo("body");

    // var menu_MEP = menu_popup;
    // menuobj = document.createElement('ul');
    // menuobj.id = 'MEP_listing_Service';
    // menuobj.style.position = 'fixed';
    // menuobj.style.top = '696px';
    // menuobj.style.left = '899px';
    // menuobj.style.padding = '10px';
    // menuobj.style.backgroundColor = '#fff';
    // menuobj.innerHTML = menu_MEP;
    // body = document.getElementsByTagName('body')[0];
    // body.appendChild(menuobj);

    // $("<p>"+menu_MEP+"</p>").appendTo("td#bloc_vGates tr#c");
    // alert(menu_MEP);
}

function MEP_DIV_cachee(menu_tableau_cache) {
    var menu_MEP = menu_tableau_cache;
    menuobj = document.createElement('div');
    menuobj.style.position = 'fixed';
    menuobj.style.top = '5px';
    menuobj.style.left = '5px';
    menuobj.style.padding = '17px';
    menuobj.style.backgroundColor = '##fff';
    menuobj.innerHTML = menu_MEP;
    body = document.getElementsByTagName('body')[0];
    body.appendChild(menuobj);
}

function MEP_Info_Lien() {
    $("<div id='MEP_Info_Lien'></div>")
        .css({
            "top": "550px",
            // "left": "899px",
            // "right": "40px",
            "left": "79%",
            "position": "fixed",
            // "position": "absolute",
            "padding": "10px",
            "backgroundColor": "#fff",
        })
        .appendTo("body");
}

function MEP_SAV() {
    $("<div id='MEP_SAV'></div>")
        .css({
            "top": "636px",
            "left": "79%",
            "position": "fixed",
            "padding": "10px",
            "backgroundColor": "#fff",
        })
        .appendTo("body");
}

function MEP_BARRE_STC() {
    var link_barre_stc = '<a id="CCBarreSTC" onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'BarreSTC\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Copier/Coller pour Barre STC</a>';

    var menu_MEP = '<b><font color="#F7F9FA"' + link_barre_stc + '</font></b>';
    menuobj = document.createElement('ul');
    menuobj.style.position = 'absolute';
    menuobj.style.top = '105px';
    menuobj.style.left = '155px';
    menuobj.style.padding = '10px';
    menuobj.style.backgroundColor = '#8B0000';
    //menu_MEP.style.fontcolor("green");
    menuobj.innerHTML = menu_MEP;
    body = document.getElementsByTagName('body')[0];
    body.appendChild(menuobj);
}

function MEP_Bloc_Technique() {
    $("<div id='Bloc_Technique'></div>")
        .css({
            "top": "185px",
            // "left": "899px",
            // "right": "40px",
            "left": "79%",
            "position": "fixed",
            // "position": "absolute",
            "padding": "10px",
            "backgroundColor": "#fff",
        })
        .appendTo("body");

    $("<div id='Bloc_Technique_Info'></div>").appendTo("div#Bloc_Technique");

    $("<table id='Bloc_Technique_CPE'></table>").appendTo("div#Bloc_Technique");

    $("<div id='Bloc_Technique_Eqt'></div>").appendTo("div#Bloc_Technique");


    var Link_vers_Info_MID_CPE = '<p>Accès vers les infos CPE / Site <hr>';

    // Link_vers_Info_MID_CPE += '<br><a target=_blank href="http://toolbox-cpe-prod-neuf.private.sfr.com:8080/SupCPE/infos_cpe.php?cpe=' + hostnameCPE + '&master_id=' + obj.masterID + '">SUP CPE (conf et recette)</a>';

    Link_vers_Info_MID_CPE += '<br><a target=_blank href="http://refcpe-prod.private.sfr.com:7190/cpe/recherche">Ref CPE</a>';
    Link_vers_Info_MID_CPE += '<br><a target=_blank href="http://toolbox-cpe-prod-neuf.private.sfr.com:8080/reporting/supstat/sites_cpe.php?gid_master=' + obj.masterID + '&option=">Reporting CPETOOLBOX</a>';

    if (Nom_OFFRE == '9LINK') {
        Link_vers_Info_MID_CPE += '<br><a target=_blank href="http://ulysseservices-prod-neuf.private.sfr.com:8083/cwd2/documentList.htm?xs_type=ismid&xs_id=' + obj.masterID + '&origine=operateur&bdstype=site">Documents Clarify</a>';
    } else {
        Link_vers_Info_MID_CPE += '<br><a target=_blank href="http://ulysseservices-prod-neuf.private.sfr.com:8083/cwd2/documentList.htm?xs_type=ismid&xs_id=' + obj.masterID + '&origine=clarify&bdstype=site">Documents Clarify</a>';
    }

    // var menu_debut += '<br><br>Connexion vers les Equipements<hr>';
    $("table#Bloc_Technique_CPE").before("<br>Connexion vers les Equipements<hr><br>");

    $("table#Bloc_Technique_CPE").before("<p id='Topologie'>" + obj.realNameOffre + " - " + Topologie + "</p>");

    $("div#Bloc_Technique_Info").append(Link_vers_Info_MID_CPE);
}

function MEP_Bloc_Technique_old() {
    // var menu_MEP = label + menu_debut + menu_IP_CPE_A + menu_IP_CPE_P + menu_IP_CPE_L2 + menu_IP_CPE_L3 + menu_fin;
    var menu_MEP = menu_debut + menu_IP_CPE_L3 + menu_fin;
    menuobj = document.createElement('ul');
    menuobj.id = 'MEP_Bloc_Technique';
    menuobj.style.position = 'fixed';
    menuobj.style.top = '185px';
    menuobj.style.left = '899px';
    //menuobj.style.padding = '20px';
    menuobj.style.padding = '10px';
    menuobj.style.backgroundColor = '#fff';
    menuobj.innerHTML = menu_MEP;
    body = document.getElementsByTagName('body')[0];
    body.appendChild(menuobj);

    // if (Nbr_CPE > 0 && CPE_Conf_CVS_Tab[1] != "undefined") {
    //     MEP_conf_CVS_CPE(1);
    // }
    // if (Nbr_CPE > 1 && CPE_Conf_CVS_Tab[2] != "undefined") {
    //     MEP_conf_CVS_CPE(2);
    // }
    // if (Nbr_CPE > 2 && CPE_Conf_CVS_Tab[3] != "undefined") {
    //     MEP_conf_CVS_CPE(3);
    // }
    // if (Nbr_CPE > 3 && CPE_Conf_CVS_Tab[4] != "undefined") {
    //     MEP_conf_CVS_CPE(4);
    // }

    $(menu_MEP).appendTo("td#bloc_vGates tr#b");
    $("<br><br>").appendTo("td#bloc_vGates tr#b");

    var MEP_listing_Site = $("ul#MEP_listing_Site").html();

    $(MEP_listing_Site).appendTo("td#bloc_vGates tr#a");
    $("<br>").appendTo("td#bloc_vGates tr#a");

    var MEP_listing_Service = $("ul#MEP_listing_Service").html();
    $(MEP_listing_Service).appendTo("td#bloc_vGates tr#c");
    $("<br>").appendTo("td#bloc_vGates tr#a");
}

function MEP_Baniere() {
    // var menu_MEP = '<h1 onclick=alert("toto");><b><font color="#F7F9FA" size=6>vGates</font></b></h1>';
    // var menu_MEP = '<h1 id="maBAN"><b><font color="#F7F9FA" size=6>Diag vGates</font></b></h1>';
    // menuobj = document.createElement('ul');
    // menuobj.style.position = 'absolute';
    // menuobj.style.top = '13px';
    // menuobj.style.left = '55px';
    // menuobj.style.padding = '10px';
    // menuobj.style.backgroundColor = '##fff';
    // menuobj.style.textShadow = "2px 2px #000000";
    // menuobj.innerHTML = menu_MEP;
    // body = document.getElementsByTagName('body')[0];
    // body.appendChild(menuobj);

    //Jquery Style 
    $("<h1 id='maBAN'>Diag vGates</h1>")
        .css({
            "top": "24px",
            "left": "69px",
            "font-size": "30px",
            "color": "#F7F9FA",
            "backgroundColor": "##fff",
            "color": "#F7F9FA",
            "textShadow": "2px 2px #000000",
            "position": "absolute",
        })
        .appendTo("body");

    // .offset({top: 13, left:55})

    // Old School
    // document.getElementById("maBAN").onclick=function(){Switch_Interface()};
    $("h1#maBAN").click(function() {
        // Switch_Interface();
        $(this).slideUp(500, "swing").slideDown(500, "swing");



        $("li#diagbloc_resume").toggle("slow");
        $("li#diagbloc_graph").toggle("slow");

        $("li#diagbloc_graph_vGates").toggle("slow");

        $("ul#MEP_Bloc_Technique").toggle("slow");
        $("ul#MEP_SAV").toggle("slow");
        $("ul#MEP_listing_Site").toggle("slow");
        $("ul#MEP_HADES").toggle("slow");
        $("ul#MEP_Mercure").toggle("slow");
        $("ul#MEP_conf_CVS").toggle("slow");
        $("ul#MEP_conf_CVS_CPE_L3").toggle("slow");
        $("ul#MEP_conf_CVS_CPE").toggle("slow");
        $("ul#MEP_info_DSL").toggle("slow");
        $("ul#MEP_listing_Service").toggle("slow");
        $("ul#MEP_info_THD").toggle("slow");

        $("img#reverse-droite").toggle("slow");
        $("img#reverse-gauche").toggle("slow");

    })
}

function MEP_Fleche() {
    $("<img id='reverse-droite' width='16' height='16' src='" + GM_dossier + "/image/vert.jpg'>")
        .css({
            "top": "130px",
            "left": "1069px",
            "textShadow": "2px 2px #000000",
            "position": "absolute",
        })
        .appendTo("body").hide();

    $("img#reverse-droite").click(function() {
        $(this).slideUp(500, "swing").slideDown(500, "swing");
        $("td#bloc_vGates").insertBefore("td#zobi");
    })

    //http://soccyr.perso.sfr.fr/dossiericon/flecheG.padding
    //http://www.crasc-dz.org/IMG/Image/fleche.png

    $("<img id='reverse-gauche' width='16' height='16' src='" + GM_dossier + "/image/vert.jpg'>")
        .css({
            "top": "130px",
            "left": "1169px",
            "textShadow": "2px 2px #000000",
            "position": "absolute",
        })
        .appendTo("body").hide();

    $("img#reverse-gauche").click(function() {
        $(this).slideUp(500, "swing").slideDown(500, "swing");
        $("td#bloc_vGates").insertAfter("td#zobi");
    })
}

function Test_Modif() {

    // if (document.getElementById("chainetechRecapClient").getElementsByClassName('tdSoap')[3].innerHTML == '') return;

    var bloc_A_Tej = document.getElementById("banner_top");

    // var Rosie, AltRosie;

    // Rosie = document.getElementsByClassName("tableSection2")[1];

    // AltRosie = document.createTextNode(Rosie.alt);
    // Rosie.parentNode.replaceChild(AltRosie, Rosie);

    // bloc_A_Tej.parentNode.removeChild(bloc_A_Tej);


    var logoDV4, AltlogoDV4, LocImg;
    logoDV4 = document.getElementById("banner_top").getElementsByClassName('banner_logo')[0];
    //AltlogoDV4 = document.createTextNode(LocImg.alt);
    AltlogoDV4 = document.createTextNode("DvG");
    // logoDV4.parentNode.replaceChild(AltlogoDV4, logoDV4);
    logoDV4.parentNode.removeChild(logoDV4);


    $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody > tr:eq(0) > td:eq(2)").insertBefore("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody > tr:eq(1)");

    var bloc_info_client = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody").html();
    bloc_info_client = '<table><td>' + bloc_info_client + '</td></table>';

    $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody").replaceWith(bloc_info_client);

    // // $("#status_graph").insertAfter("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody > tr:eq(1)");

    // var graph = $('#status_graph').html();
    // //var graph = $('#diagbloc_graph').html(); //
    // // var graph = $('#wind_784d5e4b446d070995191863a346a0d9').html();
    // graph = '<div onclick="register_resultdiv("wind_b1f975d5e57f73d265bd450020825183");"'+graph+'</div>'
    // graph = '<td>'+graph+'</td>';

    // // $(graph).insertAfter("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody > tr:eq(1) td:eq(0)");
    // $(graph).appendTo("#wind_4427af7c8d6032aa911660768dd4fbe3 table:eq(0)");



    var monTD = '<td></td>';
    $(monTD).appendTo("#wind_4427af7c8d6032aa911660768dd4fbe3 table:eq(0)");
    $("#status_graph").prependTo("#wind_4427af7c8d6032aa911660768dd4fbe3 table:eq(0) > td:eq(0)");

    $("#diagbloc_graph").remove();
    // $("#diagbloc_graph table:eq(0)").remove();
}

function Remove_Logo() {

    // var logoDV4;
    // logoDV4 = document.getElementById("banner_top").getElementsByClassName('banner_logo')[0];
    // logoDV4.parentNode.removeChild(logoDV4);

    $("#banner_top .banner_logo").remove();
}

function Modif_Interface() {

    // Old School

    $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody > tr:eq(0) > td:eq(2)").insertBefore("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody > tr:eq(1)"); //.wrap("<tr></tr>")

    var bloc_info_client = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody").html();
    bloc_info_client = '<table><td>' + bloc_info_client + '</td></table>';

    $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody").replaceWith(bloc_info_client);

    // var monTD = '<td></td>';
    // $(monTD).appendTo("#wind_4427af7c8d6032aa911660768dd4fbe3 table:eq(0) "); 
    // $("#status_graph").appendTo("#wind_4427af7c8d6032aa911660768dd4fbe3 table:eq(0) > td:eq(0)"); 



    // Full Jquery

    // $("#wind_4427af7c8d6032aa911660768dd4fbe3 table:eq(0) tbody:eq(0) > tr:eq(0)").attr("id","les2TRs");

    // $("tr#les2TRs").unwrap();
    // $("#wind_4427af7c8d6032aa911660768dd4fbe3 table:eq(0) tbody:eq(0)").unwrap();

    // $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody > tr:eq(0) > td:eq(2)").insertBefore("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody > tr:eq(1)");  //.wrap("<tr></tr>")

    // $("#wind_4427af7c8d6032aa911660768dd4fbe3 table:eq(0) tr:eq(0)").wrap("<table><td></td></table>");

    $("#status_graph").appendTo("#wind_4427af7c8d6032aa911660768dd4fbe3 table:eq(0)").wrap("<td></td>");

    $("#diagbloc_graph").remove();

    bloc_tech_apres_modif = $("ul#table_content_top").html(); //useless
}

function Switch_Interface() {

    var div_hades = '';

    if (modif_interface == false) {
        modif_interface = true;
        // $("ul#table_content_top").replaceWith(bloc_tech_avant_modif);
        $("ul#table_content_top").html(bloc_tech_avant_modif);
        MEP_Bloc_Technique();
        MEP_SAV();
        MEP_listing_Site();
        MEP_Mercure();
        if (Infra == 'thd') {
            MEP_info_THD();
        } else {
            MEP_info_DSL();
        }
        MEP_listing_Service();


        $("body").append(div_hades);
        // body.appendChild(div_hades);


    } else {
        modif_interface = false;
        // $("ul#table_content_top").replaceWith(bloc_tech_apres_modif);
        // $("ul#table_content_top").html(bloc_tech_apres_modif);
        Modif_Interface();

        div_hades = $("ul#MEP_HADES").clone();

        $("ul#MEP_Bloc_Technique").remove();
        $("ul#MEP_SAV").remove();
        $("ul#MEP_listing_Site").remove();
        $("ul#MEP_HADES").remove();
        $("ul#MEP_Mercure").remove();
        $("ul#MEP_conf_CVS").remove();
        $("ul#MEP_conf_CVS_CPE_L3").remove();
        $("ul#MEP_conf_CVS_CPE").remove();
        $("ul#MEP_info_DSL").remove();
        $("ul#MEP_listing_Service").remove();
        $("ul#MEP_info_THD").remove();
    }
}

function Inversion() {
    if (inverse == false) {
        $("#diagbloc_graph").insertBefore("#diagbloc_resume");
        inverse = true;
    } else {
        $("#diagbloc_resume").insertBefore("#diagbloc_graph");
        inverse = false;
    }

    // Inversion des 2 blocs Old School

    // var bloc_graph, bloc_resume,
    // bloc_graph = document.getElementById("diagbloc_graph");
    // bloc_resume = document.getElementById("diagbloc_resume");

    // bloc_resume.parentNode.insertBefore(bloc_graph, bloc_resume);
}

function Modif_Map(Chaine, link_tera_term) {

    var coords = $('#mapchainetech area[onclick*="' + Chaine + '"]').attr("coords");
    var coords_X1 = parseInt(coords.split(',')[0]);
    var coords_Y1 = parseInt(coords.split(',')[1]);
    var coords_X2 = parseInt(coords.split(',')[2]);
    var coords_Y2 = parseInt(coords.split(',')[3]);

    var coords_Y3 = (coords_Y2 - coords_Y1) / 2 + coords_Y1;


    $('#mapchainetech area[onclick*="' + Chaine + '"]').clone().appendTo('#mapchainetech');


    $('#mapchainetech area[onclick*="' + Chaine + '"]:eq(1)').attr("target", "_blank");
    $('#mapchainetech area[onclick*="' + Chaine + '"]:eq(1)').attr("href", link_tera_term);
    $('#mapchainetech area[onclick*="' + Chaine + '"]:eq(1)').attr("coords", coords_X1 + ',' + coords_Y1 + ',' + coords_X2 + ',' + coords_Y3);
    $('#mapchainetech area[onclick*="' + Chaine + '"]:eq(1)').removeAttr("onclick")

    $('#mapchainetech area[onclick*="' + Chaine + '"]:eq(0)').attr("coords", coords_X1 + ',' + coords_Y3 + ',' + coords_X2 + ',' + coords_Y2);
}