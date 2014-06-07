// ==UserScript==
// @name          Diag vGates N1 sur Userscript
// @namespace     Diag vGates N1 sur Userscript
// @description   Diag vGates pour ouverture de sig au N1
// @include       https://www.diag.sfr.net/index.php?task=homepage&*
// @updateURL     https://userscripts.org/scripts/source/148983.meta.js
// @downloadURL   https://userscripts.org/scripts/source/148983.user.js
// @version       10.4
// @require       http://code.jquery.com/jquery-2.0.0.min.js
// ==/UserScript==


Main();
var wait_en_boucle = 0;

function Main() {

    // on recupre tout le bloc pour le JSON
    var monblocscript = $("script:contains(Diag.JSON.init)").text();
    // var monblocscript = $("div#overDiv + script").text();

    // on separe par ligne, puis on extrait juste le string JSON
    var ma_ligne_json_init = monblocscript.split('\n')[5];

    // var mon_json_init = ma_ligne_json_init.replace('json_init(','').replace(');',''); // AVANT MAJ Juillet 213
    var mon_json_init = ma_ligne_json_init.substring(ma_ligne_json_init.indexOf('custinfo = ') + 11, ma_ligne_json_init.lastIndexOf(';'));

    //var  JSON
    var obj = jQuery.parseJSON(mon_json_init);

    // modif du title de la page en fonction du nom du client 
    document.title = obj.CltNom;

    var Nom_Client = obj.CltNom.replace(/'/g, " "); // probleme de l'apostrophe dans teraterm pour la connexion CPE
    var Nom_OFFRE = obj.realNameOffre;
    var ID_LDCOM = obj.idLdcom;
    var Infra = obj.infra;


    // var ref FT dans chaine technique
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
    var SAV_Offre = '';
    var SAV_DSLAM = '';
    var SAV_CPE = '';
    var SAV_CPE_L2L3 = '';
    var SAV_CPE_Tab = new Array();
    var SAV_CPE_Barre_STC = '';
    var SAV_CPE_Barre_STC_Tab = new Array();

    //var label="Script SUPER GG";
    var label = "";

    var menu_debut = '';
    var menu_fin = '';

    var menu_IP_CPE_A = '';
    var menu_IP_CPE_P = '';
    var menu_IP_CPE_L2 = '';
    var menu_IP_CPE_L3 = '';

    var menu_conf_CPE_A = '';
    var menu_conf_CPE_P = '';
    //var menu_conf_CPE_L3 = '';

    var menu_debut_1 = '';
    var menu_fin_1 = '';
    var menu_tableau = '';
    //var menu_tableau_cache = '';
    var menu_tableau_cache_2 = '';
    var menu_popup = '';
    var menu_popup_1 = '';
    var menu_popup_2 = '';
    var menu_listing_service = '';

    var menu_info_DSL = '';
    var menu_info_DSL_N2 = '';
    var menu_info_THD_N2 = '';
    var menu_info_DSL_Barre_STC = '';
    var menu_info_DSL_code_offre = '';
    var menu_info_DSL_SAV = '';

    var Nom_OFFRE_URL = '';
    var Nom_OFFRE_URL_2 = '';

    // Tableau des oFFres DSL
    var tableauOffreDSL = new Array();
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

    tableauOffreDSL["ACC-SAIE-401"] = "SDSL EFM 4-Paires 1 Mbits/s (1152 kbps)";
    tableauOffreDSL["ACC-SAIE-402"] = "SDSL EFM 4-Paires 2 Mbits/s (2234 kbps)";
    tableauOffreDSL["ACC-SAIE-404"] = "SDSL EFM 4-Paires 4 Mbits/s (4608 kbps)";
    tableauOffreDSL["ACC-SAIE-408"] = "SDSL EFM 4-Paires 8 Mbits/s (9216 kbps)";
    tableauOffreDSL["ACC-SAIE-412"] = "SDSL EFM 4-Paires 12 Mbits/s (13409 kbps)";


    tableauOffreDSL["ACC-SCEE-402"] = "Collecte CEE FT - 2 Mbit/s SDSL 4-Paires";
    tableauOffreDSL["ACC-SCEE-404"] = "Collecte CEE FT - 4 Mbit/s SDSL 4-Paires";

    tableauOffreDSL["ACC-SCBE-208"] = "Collecte CEE FT - 8 Mbit/s SDSL Bis Bipaire (9216 kbps)";
    tableauOffreDSL["ACC-SCBE-412"] = "Collecte CEE FT - 12 Mbit/s SDSL Bis Quadri Paire";

    tableauOffreDSL["ACC-SAIB-228"] = "Offre SDSL.bis à débit crête ACC-SAIB 8Mb/s bipaire";

    tableauOffreDSL["ACC-SAIB-226"] = "Collecte CEE FT - 2 Mbit/s SDSL EFM";

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



    // REF CPE

    var div_hades = '';

    var ID_Societe = '';
    var Nom_Site = '';

    var Nbr_CPE = 0;
    var Nbr_CPE_count = 0;
    var Nbr_M2DB_count = 0;
    var Topologie = '';

    var hostnameCPE = '';
    var hostnameCPE_L3 = '';

    var CPE_1_Hostname = '';
    var CPE_2_Hostname = '';
    var CPE_3_Hostname = '';
    var CPE_4_Hostname = '';

    var CPE_1_IP = '';
    var CPE_2_IP = '';
    var CPE_3_IP = '';
    var CPE_4_IP = '';

    var CPE_1_Modele = '';
    var CPE_2_Modele = '';
    var CPE_3_Modele = '';
    var CPE_4_Modele = '';

    var CPE_1_Topologie = '';
    var CPE_2_Topologie = '';
    var CPE_3_Topologie = '';
    var CPE_4_Topologie = '';

    // Aire de Lancement 
    // alert("launch");

    var first = true;

    // Launch_Info_DSL();
    GetInfoCPE();
    MEP_Baniere();


    function GetInfoCPE() {
        GM_xmlhttpRequest({
            method: "GET",
            url: 'http://10.92.252.131:8080/reporting/supstat/sites_cpe.php?gid_master=' + obj.masterID + '&option=',
            onload: function(response) {
                var codeHTML = response.responseText;
                codeHTML = codeHTML.replace(/<img[^>]*>/g, "");
                var codeHTML_div = '<div>' + response.responseText + '</div>';
                codeHTML_div = codeHTML_div.replace(/<img[^>]*>/g, "");

                ID_Societe = $(codeHTML).find('#tab-resultat tbody a').eq(0).html();
                Nom_Site = $(codeHTML).find('#tab-resultat tbody tr td').eq(5).text();

                Nbr_CPE = $(codeHTML).find('#tab-resultat tbody tr').size();
                Nbr_CPE_count = Nbr_CPE;
                // alert(Nbr_CPE);

                if (Nbr_CPE > 0) {

                    if (Nbr_CPE > 0) {
                        //alert("1 seul CPE");
                        CPE_1_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(6).text();
                        CPE_1_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(8).text();
                        CPE_1_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(9).text();

                        var debut_hostname_1 = CPE_1_Hostname.substring(0, 5)
                        var fin_hostname_CPE_1 = CPE_1_Hostname.substr(CPE_1_Hostname.length - 2);

                        if (debut_hostname_1 == 'HW2EN' || debut_hostname_1 == 'CPEL2') {
                            CPE_1_Modele = 'L2_HUAWEI';
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
                        }

                        Launch_Infos_CPE(CPE_4_Hostname, 4, Nbr_CPE);
                    }

                    wait_en_boucle = setInterval(WAITchainetechRecapClient, 500);

                    // Launch_Listing_Service_et_Stats();
                    // Launch_Entete_Service();
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

                        // Launch_Listing_Service_et_Stats();
                        // Launch_Entete_Service();

                        SAV_CPE = '<br>Pas d Info CPE retrouvée (BUG M2DB)';
                        SAV_CPE_Barre_STC = '<br>Pas d Info CPE retrouvée (BUG M2DB)';

                        Outils_SAV();
                        Outils_Barre_STC();
                    }
                } else {
                    // alert('pas de CPE retrouvé pour'+obj.masterID);

                    //alert(obj.masterID);
                    hostnameCPE = obj.login.split('@')[0];
                    // Launch_Conf_et_CVS();
                    wait_en_boucle = setInterval(WAITchainetechRecapClient, 500);

                    // Launch_Listing_Service_et_Stats();
                    // Launch_Entete_Service();
                }
            }
        });
    }

    function WAITchainetechRecapClient() {
        if (document.getElementById("chainetechRecapClient").getElementsByClassName('tdSoap')[3].innerHTML == '') return;
        else {
            clearInterval(wait_en_boucle);
            // alert("dans la chaine récap");

            if ($("#chainetechACCESCE2O\\ FT").size() > 0) {
                CE2O_feuille = document.getElementById("chainetechACCESCE2O FT").getElementsByClassName('tdSoap')[3].innerHTML;
                CE2O_tronc = document.getElementById("chainetechACCESCE2O FT").getElementsByClassName('tdSoap')[9].innerHTML;
                CE2O_vlan = document.getElementById("chainetechACCESCE2O FT").getElementsByClassName('tdSoap')[14].innerHTML;

                Launch_Info_THD();
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


                // var dslam_ISAM_alias = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[0].innerHTML;
                // var dslam_ISAM_rack = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[7].innerHTML;
                var dslam_ISAM_sous_rack = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[8].innerHTML;
                var dslam_ISAM_slot = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[9].innerHTML;
                var dslam_ISAM_port = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[10].innerHTML;

                var dslam_ISAM_alias = $("#chainetechDSLAMISAM\\ 7302\\ FD table tr td:contains('Alias')").next("td.tdSoap").text();
                var dslam_ISAM_rack = $("#chainetechDSLAMISAM\\ 7302\\ FD table tr td:contains('Rack')").next("td.tdSoap").text();


                var dslam_adresse = $("#chainetechDSLAMISAM\\ 7302\\ FD table tr td:contains('Adresse'):not(':contains(Adresse\u00a0IP)')").next("td.tdSoap").text();
                // var dslam_adresse = "toto";

                SAV_DSLAM += '<br>DSLAM : ' + dslam_ISAM_alias;
                SAV_DSLAM += '<br>Rack / Sous Rack : ' + dslam_ISAM_rack + ' / ' + dslam_ISAM_sous_rack;
                SAV_DSLAM += '<br>Slot / Port : ' + dslam_ISAM_slot + ' / 0 / ' + dslam_ISAM_port;
                SAV_DSLAM += '<br>Adresse : ' + dslam_adresse;
                SAV_DSLAM += '<br>';

            }


            if ($("#chainetechDSLAMMA5300").size() > 0) {
                var dslam5300_alias = document.getElementById("chainetechDSLAMMA5300").getElementsByClassName('tdSoap')[0].innerHTML;
                var dslam5300_slot = document.getElementById("chainetechDSLAMMA5300").getElementsByClassName('tdSoap')[9].innerHTML;
                var dslam5300_port = document.getElementById("chainetechDSLAMMA5300").getElementsByClassName('tdSoap')[10].innerHTML;
                var dslam5300_vlan = document.getElementById("chainetechDSLAMMA5300").getElementsByClassName('tdSoap')[13].innerHTML;
                var dslam5300_ip = document.getElementById("chainetechDSLAMMA5300").getElementsByClassName('tdSoap')[16].innerHTML;
                var dslam_adresse = $("#chainetechDSLAMMA5300 table tr td:contains('Adresse'):not(':contains(Adresse\u00a0IP)')").next("td.tdSoap").text();

                SAV_DSLAM += '<br>DSLAM : ' + dslam5300_alias;
                SAV_DSLAM += '<br>Vlan : ' + dslam5300_vlan;
                SAV_DSLAM += '<br>Slot / Port : ' + dslam5300_slot + ' / 0 / ' + dslam5300_port;
                SAV_DSLAM += '<br>Adresse : ' + dslam_adresse;
                SAV_DSLAM += '<br>';

            }


            if ($("#chainetechDSLAMMA5600T").size() > 0) {
                var dslam5600_alias = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[0].innerHTML;
                var dslam5600_slot = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[8].innerHTML;
                var dslam5600_port = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[9].innerHTML;
                var dslam5600_vlan = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[12].innerHTML;

                var dslam_adresse = $("#chainetechDSLAMMA5600T tr:has(td:contains('Adresse'))").not(":contains(Adresse\u00a0IP)").find("td.tdSoap").text();


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

                var dslam_adresse = $("#chainetechDSLAMMA5600T\\ -\\ Niveau\\ 2 table tr td:contains('Adresse'):not(':contains(Adresse\u00a0IP)')").next("td.tdSoap").text();


                SAV_DSLAM += '<br>DSLAM : ' + dslam5600_alias;
                SAV_DSLAM += '<br>Vlan : ' + dslam5600_vlan;
                SAV_DSLAM += '<br>Slot / Port : ' + dslam5600_slot + ' / 0 / ' + dslam5600_port;
                SAV_DSLAM += '<br>Adresse : ' + dslam_adresse;
                SAV_DSLAM += '<br>';

            }

            Outils_Barre_STC("appel Barre STC via WAITchainetechRecapClient");
            Launch_Info_DSL(ID_LDCOM);
            // alert("fin WAITchainetechRecapClient");

        }
    }


    function Launch_Infos_CPE(hostname, num_cpe, Total_CPE) {

        GM_xmlhttpRequest({
            method: "GET",
            url: 'http://10.92.252.131:8080/SupCPE/infos_cpe.php?cpe=' + encodeURIComponent(hostname) + '&master_id=' + encodeURIComponent(obj.masterID) + '',
            //onprogress: function(response) { alert('on progress CPE'); },
            onload: function(response) {
                // var codeHTML = response.responseText;
                var codeHTML = '<div>' + response.responseText + '</div>';
                codeHTML = codeHTML.replace(/<img[^>]*>/g, "");

                // alert(hostname);


                var hostname_CPE = $(codeHTML).find('#informations_cpe div:contains(' + hostname + ')').find("tbody tr td").eq(3).text();
                var IP_CPE = $(codeHTML).find('#informations_cpe div:contains(' + hostname + ')').find("tbody tr td").eq(5).text();
                var Marque_CPE = $(codeHTML).find('#informations_cpe div:contains(' + hostname + ')').find("tbody tr td").eq(9).text();
                var serial_CPE = $(codeHTML).find('#informations_cpe div:contains(' + hostname + ')').find("tbody tr td").eq(23).text();
                var ID_CPE = $(codeHTML).find('#informations_cpe div:contains(' + hostname + ')').find("tbody tr td").eq(25).text();

                var URL_CVS_CPE = $(codeHTML).find('#informations_cpe div:contains(' + hostname + ')').find("a:contains('Configuration')").attr('href');
                var url_formatee = '' + URL_CVS_CPE + '';
                // alert(hostname_CPE+' '+url_formatee);

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


                /////////////////  PARTIE N2 AVEC LA CONF CPE  ////////////////////////
                // if (URL_CVS_CPE != 'undefined'){
                //   GM_xmlhttpRequest({
                //     method: "GET",
                //     url: url_formatee,
                //     onerror: function() {
                //       alert("on error");
                //     },
                //     onload: function(response) { 
                //       // alert("dans la recherche du CVS");
                //       var codeHTMLduCVS = '<div>'+response.responseText+'</div>';
                //       codeHTMLduCVS = codeHTMLduCVS.replace(/<img[^>]*>/g,"");
                //       var URL_CONF_CPE = $(codeHTMLduCVS).find('a').eq(9).attr('href');


                //       URL_CONF_CPE_formatee = URL_CONF_CPE.substring(URL_CONF_CPE.indexOf("?"));

                //       var lien_conf_CPE = url_formatee+URL_CONF_CPE_formatee ;

                //       SAV_CPE_Tab[num_cpe] = '<br><br>Nom du CPE : '+hostname_CPE;
                //       SAV_CPE_Tab[num_cpe] += '<br>Adresse IP : '+IP_CPE;
                //       SAV_CPE_Tab[num_cpe] += '<br>Marque CPE : '+Marque_CPE;
                //       // SAV_CPE_Tab[num_cpe] += '<br>Numéro de série : '+serial_CPE;
                //       SAV_CPE_Tab[num_cpe] += '<br>Product ID : '+ID_CPE;
                //       SAV_CPE_Barre_STC_Tab[num_cpe] = SAV_CPE_Tab[num_cpe];
                //       SAV_CPE_Tab[num_cpe] += '<br>Conf CPE : '+lien_conf_CPE;

                //       Nbr_CPE_count = Nbr_CPE_count-1;
                //       if(Nbr_CPE_count == 0) {
                //         SAV_CPE_Barre_STC ='OK le compte est bon'; 
                //         Outils_Barre_STC("appel Barre STC via Info CPE");
                //       }

                //     }
                //   });
                // }
                // else {
                //   // alert('pas de CPE trouvée');

                //   // menu_conf_CPE += ' pas de conf trouvée';

                //   // SAV_CPE = '<br>Pas d Info CPE retrouvée';
                //   SAV_CPE_Barre_STC = '<br>Pas d Info CPE retrouvée';

                //   Outils_Barre_STC("appel de la barre STC via ELSE d info CPE"); 
                // }

                /////////////////  PARTIE N1 SANS LA CONF CPE  ////////////////////////

                GM_xmlhttpRequest({
                    method: "GET",
                    url: 'http://intranetstc.private.sfr.com:8091/flux.php?action=getInfosCPE&ROUTEUR=' + encodeURIComponent(ID_CPE),
                    //onprogress: function(response) { alert('on progress CPE'); },
                    onload: function(response) {

                        var cpe_ref_mainteneur = response.responseText

                        if (ID_CPE == '' && Marque_CPE == 'ONE_ACCESS') {
                            if (serial_CPE.substring(5, 12) == '0045040') {
                                cpe_ref_mainteneur = 'One20D';
                            } else if (serial_CPE.substring(5, 12) == '0051240') {
                                cpe_ref_mainteneur = 'ONE80-XM';
                            } else {
                                cpe_ref_mainteneur = '';
                            }
                        }

                        // CPE_Conf_CVS_Tab[num_cpe] = menu_conf_CPE;

                        SAV_CPE_Tab[num_cpe] = '<br><br>Nom du CPE ' + ID_CPE_Barre_STC + ' : ' + hostname_CPE;
                        SAV_CPE_Tab[num_cpe] += '<br>Adresse IP ' + ID_CPE_Barre_STC + ' : ' + IP_CPE;
                        SAV_CPE_Tab[num_cpe] += '<br>Marque CPE ' + ID_CPE_Barre_STC + ' : ' + Marque_CPE;
                        SAV_CPE_Tab[num_cpe] += '<br>Product ID ' + ID_CPE_Barre_STC + ' : ' + ID_CPE;
                        SAV_CPE_Tab[num_cpe] += '<br>Numéro de série ' + ID_CPE_Barre_STC + ' : ' + serial_CPE;
                        SAV_CPE_Tab[num_cpe] += '<br>Ref Mainteneur ' + ID_CPE_Barre_STC + ' : ' + cpe_ref_mainteneur;
                        SAV_CPE_Barre_STC_Tab[num_cpe] = SAV_CPE_Tab[num_cpe];
                        // SAV_CPE_Tab[num_cpe] += '<br>Conf CPE '+ID_CPE_Barre_STC+' : '+lien_conf_CPE;

                        Nbr_CPE_count = Nbr_CPE_count - 1;
                        if (Nbr_CPE_count == 0) {
                            SAV_CPE_Barre_STC = 'OK le compte est bon';
                            Outils_Barre_STC("tous les CPEs OK");
                        }
                    }
                });


                // SAV_CPE_Tab[num_cpe] = '<br><br>Nom du CPE : '+hostname_CPE;
                // SAV_CPE_Tab[num_cpe] += '<br>Adresse IP : '+IP_CPE;
                // SAV_CPE_Tab[num_cpe] += '<br>Marque CPE : '+Marque_CPE;
                // // SAV_CPE_Tab[num_cpe] += '<br>Numéro de série : '+serial_CPE;
                // SAV_CPE_Tab[num_cpe] += '<br>Product ID : '+ID_CPE;
                // SAV_CPE_Barre_STC_Tab[num_cpe] = SAV_CPE_Tab[num_cpe];

                // Nbr_CPE_count = Nbr_CPE_count-1;
                // if(Nbr_CPE_count == 0) {
                //   SAV_CPE_Barre_STC ='OK le compte est bon'; 
                //   Outils_Barre_STC("appel Barre STC via Info CPE");
                // }

            }
        });
    }


    function Launch_Info_DSL(Ref_Refpase) {

        // alert("Launch_Info_DSL");
        // alert(obj.dslInfos[0].type);
        // alert(obj.isTDSL);

        // if (obj.dslInfos[0].option == 1) {

        if (obj.isTDSL != 1 && Nom_OFFRE.substring(0, 3) != "LPT" && obj.dslInfos[0].type != "basCEE") { // Lien en Option 1

            GM_xmlhttpRequest({
                method: "GET",
                // url: 'http://nr0u0086.cbv.ldcom.ld:8083/pegase/admin/infos_refpase.jsp?ndi='+ID_LDCOM+'&submit=Rechercher',
                // url: 'http://w4hermes.prod.neufcegetel.ld:8083/pegase/admin/infos_refpase.jsp?ndi='+ID_LDCOM+'&submit=Rechercher',
                url: 'http://su10022.cbv.it.ld:8083/pegase/admin/infos_refpase.jsp?ndi=' + Ref_Refpase + '&login=login_tmp_pase_stcent&pass=login_tmp_pase_stcent',
                // onabort: function(response) { alert('on abort'); },
                // onprogress: function(response) { alert('on progress'); },
                onerror: function(response) {

                    //alert('Refpase dans les choux \n \nAllez dans Cerbere/Ulysse pour les constitutions');

                    menu_info_DSL_N2 += 'Info DSL <hr>';
                    menu_info_DSL_N2 += '<div id= tableauInfoDSL class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';

                    menu_info_DSL += '<br>Refpase dans les choux <br><br>Allez dans Cerbere/Ulysse pour les constitutions<br>';

                    menu_info_DSL_N2 += menu_info_DSL;
                    menu_info_DSL_N2 += '</table></div>';

                    menu_info_DSL_Barre_STC = menu_info_DSL;

                    menu_popup_2 += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoDSL\',headingText:\'Informations DSL\'});" href="#" style="cursor: pointer;" class=" ">Informations DSL</a>';

                    SAV_NDI += '<br>Constitutions non récupérées dans REFPASE (car site HS)<br>'

                    var codeOffreDSL = obj.nomRessource.split('-')[1] + "-" + obj.nomRessource.split('-')[2] + "-" + obj.nomRessource.split('-')[3];

                    menu_info_DSL_code_offre += '<br>' + tableauOffreDSL[codeOffreDSL];

                    menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
                    menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';

                    // MEP_info_DSL();

                    SAV_Offre += '<br>';
                    SAV_Offre += ID_LDCOM + ' - ' + codeOffreDSL;
                    SAV_Offre += '<br>';
                    SAV_Offre += tableauOffreDSL[codeOffreDSL];
                    SAV_Offre += '<br>';

                    Outils_Barre_STC("refpase dans les choux");


                },

                onload: function(response5) {
                    var codeHTML_5 = '<div>' + response5.responseText + '</div>';
                    codeHTML_5 = codeHTML_5.replace(/<img[^>]*>/g, "");
                    var menu_info_DSL_brute = '';

                    menu_info_DSL_N2 += 'Info DSL <hr>';

                    // alert("refpase chargé");


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

                    //menu_info_DSL_brute = $(codeHTML_5).find("tbody").eq(3).find("tr").last().find("td").eq(9).text();

                    if (menu_info_DSL_brute == '') { // pas d'info retrouvé sur les NDi

                        menu_info_DSL_N2 += '<div id= tableauInfoDSL class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';
                        menu_info_DSL += '<br>Aucune Info sur la ligne retrouvée dans REFPASE<br>';

                        menu_info_DSL_N2 += menu_info_DSL;
                        menu_info_DSL_Barre_STC = menu_info_DSL;

                        SAV_DSLE += '<br>Aucune Info sur le ligne retrouvée dans REFPASE<br>';

                        Outils_Barre_STC("aucune info Refpase");

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

                    //alert(obj.nomRessource);
                    // recherche dans le JSON
                    var codeOffreDSL = obj.nomRessource.split('-')[1] + "-" + obj.nomRessource.split('-')[2] + "-" + obj.nomRessource.split('-')[3];

                    // ou dans le code source de la page
                    // var tempo = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody tr td").eq(9).text();
                    // var codeOffreDSL = tempo.substring(tempo.indexOf("(")+1,tempo.indexOf(")"));

                    menu_info_DSL_code_offre += '<br>' + tableauOffreDSL[codeOffreDSL];

                    // avant que fuschia-barricou ne me fasse chier
                    menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
                    menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';


                    SAV_Offre += '<br>';
                    SAV_Offre += ID_LDCOM + ' - ' + codeOffreDSL;
                    SAV_Offre += '<br>';
                    SAV_Offre += tableauOffreDSL[codeOffreDSL];
                    SAV_Offre += '<br>';
                    // alert(SAV_Offre);

                    Outils_Barre_STC("appel BarreSTC via Fin Laucnh Info DSL");

                }
            });
        } else if (obj.isTDSL == 1 && Nom_OFFRE.substring(0, 3) != "LPT") { // TDSL 

            var tempo = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody tr td:contains('Offre')").next("td").text();

            var codeOffreDSL = tempo.substring(tempo.indexOf("(") + 1, tempo.indexOf(")"));

            menu_info_DSL_N2 += 'Info DSL <hr>';
            menu_info_DSL_N2 += '<a target=_blank href="' + url_ipsite_bench + '">IPSITE BENCH</a>';
            menu_info_DSL_N2 += '<br>' + obj.nomRessource + '<br>' + tableauOffreDSL[codeOffreDSL];

            menu_info_DSL_Barre_STC += 'DSLE : ';
            menu_info_DSL_Barre_STC += obj.nomRessource + '<br>' + tableauOffreDSL[codeOffreDSL];
            menu_info_DSL_Barre_STC += '<br>';

            menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
            menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';

            SAV_DSLE += '<br>' + obj.nomRessource + '<br>' + tableauOffreDSL[codeOffreDSL] + '<br>';

            Outils_Barre_STC("TDSL");

        } else if (Nom_OFFRE.substring(0, 3) == "LPT") {
            menu_info_DSL_N2 += 'Info LPT <hr>';
            menu_info_DSL_N2 += '<a target=_blank href="' + url_ipsite_bench + '">IPSITE BENCH</a>';
            menu_info_DSL_N2 += '<br>' + ref_LPT;
            menu_info_DSL_N2 += '<br>' + Nom_OFFRE;

            menu_info_DSL_Barre_STC += 'LPT : ' + ref_LPT;
            menu_info_DSL_Barre_STC += '<br>' + Nom_OFFRE + '<br>';

            menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
            menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';

            SAV_LPT += '<br>' + ref_LPT + '<br>';

            Outils_Barre_STC("LPT");
        } else if (obj.dslInfos[0].type == "basCEE") {

            var tempo = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody tr td:contains('Offre')").next("td").text();

            var codeOffreDSL = tempo.substring(tempo.indexOf("(") + 1, tempo.indexOf(")"));

            var Remote_ID_CEE = $("#chainetechDSLAMFT td:contains('RemoteId')").next("td").text();

            menu_info_DSL_N2 += 'Info DSL <hr>';
            menu_info_DSL_N2 += '<a target=_blank href="' + url_ipsite_bench + '">IPSITE BENCH</a>';
            menu_info_DSL_N2 += '<br>' + obj.nomRessource + '<br>' + tableauOffreDSL[codeOffreDSL];

            menu_info_DSL_Barre_STC += 'DSLE : ';
            menu_info_DSL_Barre_STC += obj.nomRessource + '<br>' + tableauOffreDSL[codeOffreDSL];
            menu_info_DSL_Barre_STC += '<br>Remote ID : ' + Remote_ID_CEE;
            menu_info_DSL_Barre_STC += '<br>';

            menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
            menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';

            SAV_DSLE += '<br>' + obj.nomRessource + '<br>' + tableauOffreDSL[codeOffreDSL] + '<br>';

            Outils_Barre_STC("basCEE");

        } else {
            alert("type de lien non déterminé");
        }
    }


    function Launch_Info_THD() {
        //alert(CE2O_feuille);

        menu_info_THD_N2 += 'Info CE2O <hr>';
        menu_info_THD_N2 += '<a target=_blank href="' + url_ipsite_bench + '">IPSITE BENCH</a>';
        menu_info_THD_N2 += '<br> Feuille : ' + CE2O_feuille;
        menu_info_THD_N2 += '<br> Tronc &nbsp: ' + CE2O_tronc + ' - Vlan : ' + CE2O_vlan;

        menu_info_DSL_Barre_STC += 'CE2O : ' + CE2O_feuille;
        menu_info_DSL_Barre_STC += '<br>CE2O-VLAN : ' + CE2O_vlan;

        menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
        menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';

        SAV_CE2O += '<br>' + CE2O_feuille;
        SAV_CE2O += '<br>VLAN : ' + CE2O_vlan + '<br>';

        Outils_Barre_STC("THD CE2O");
    }


    function Outils_Barre_STC(tqui) {

        // alert(tqui);

        if (((SAV_Offre != '' && SAV_NDI != '' && SAV_DSLAM != '') || SAV_DSLE != '' || SAV_LPT != '' || SAV_CE2O != '') && SAV_CPE_Barre_STC != '') {

            var menu_tableau_cache = '';
            // alert("génération encours");

            menu_tableau_cache += '<div id= BarreSTC class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';

            menu_tableau_cache += '<br><br><br><br><br>'

            menu_tableau_cache += '######## INFORMATION BOUCLE LOCALE ########<br><br>';

            menu_tableau_cache += '<table cellpadding=0 cellspacing=0>';
            menu_tableau_cache += menu_info_DSL_Barre_STC;
            menu_tableau_cache += '</table>';

            menu_tableau_cache += '<br>######## INFORMATION LIGNE / DSLAM ########<br>';

            menu_tableau_cache += SAV_LPT;
            menu_tableau_cache += SAV_CE2O;
            menu_tableau_cache += SAV_DSLE;
            menu_tableau_cache += SAV_Offre;
            menu_tableau_cache += SAV_DSLAM;
            menu_tableau_cache += SAV_NDI;

            menu_tableau_cache += '<br>######## INFORMATION ROUTEUR ########<br>';


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
            menu_tableau_cache += '<br><br><br><br><br>'

            menu_tableau_cache += '</div>';

            //alert("generation barre STC");
            MEP_DIV_cachee(menu_tableau_cache);
            MEP_BARRE_STC();

            $("a#copier").click(function() {

                var back_slashed_tab = $(menu_tableau_cache).html();
                back_slashed_tab = back_slashed_tab.replace(/<br>/gi, "\r\n");
                back_slashed_tab = back_slashed_tab.replace(/<tr.+?>/gi, "");
                back_slashed_tab = back_slashed_tab.replace(/<.tr>/gi, "\r\n");
                back_slashed_tab = back_slashed_tab.replace(/<td>/gi, "");
                back_slashed_tab = back_slashed_tab.replace(/<.td>/gi, "\t");
                back_slashed_tab = back_slashed_tab.replace(/<.+>/gi, "");
                // alert(back_slashed_tab);
                GM_setClipboard(back_slashed_tab);

            });
        };
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

    function MEP_BARRE_STC() {
        var link_barre_stc = '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'BarreSTC\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Copier/Coller pour Barre STC</a>';

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

    function MEP_Baniere() {

        $("#banner_top .banner_logo").remove();

        $("<h1 id='maBAN'>Diag vGates N1</h1>")
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
    }

}