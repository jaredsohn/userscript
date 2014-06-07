// ==UserScript==
// @name           DiagVGates BETA Test
// @namespace      DiagVGatesBeTa2
// @version        8.7
// @description    pour test avant deploiement
// @updateURL      https://intranetstc-dev.private.sfr.com:8114/Diag_vGates_Beta.meta.js
// @downloadURL    https://intranetstc-dev.private.sfr.com:8114/Diag_vGates_Beta.user.js
// @include        http://diagv3.n9uf.net/index.php?task=homepage*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==



// @updateURL      https://userscripts.org/scripts/source/145546.meta.js
// @downloadURL    https://userscripts.org/scripts/source/145546.user.js


// @updateURL      https://intranetstc-dev.private.sfr.com:8114/Diag_vGates_Beta.meta.js
// @downloadURL    https://intranetstc-dev.private.sfr.com:8114/Diag_vGates_Beta.user.js

var GM_serveur='10.102.233.50:80';
var GM_dossier='http://'+GM_serveur+'/GM/';


//alert(jQuery(document).jquery);
Jquery_RDY();

function Jquery_RDY() {
  if(typeof unsafeWindow.jQuery == 'undefined') { 
    window.setTimeout(Jquery_RDY,50); 
  }
  else { 
    $ = unsafeWindow.jQuery; 
    //letsJQueryServeur();
    Main();
  }
}


function Main() {

  //document.title = "AICH";

  // on recupre tout le bloc pour le JSON
  var monblocscript = $("script:contains(json_init)").text();

  // on separe par ligne, puis on extrait juste le string JSON
  var ma_ligne_json_init = monblocscript.split('\n')[1];
  var ma_actionmap_init = monblocscript.split('\n')[2];

  var mon_json_init = ma_ligne_json_init.replace('json_init(','').replace(');','');
  var mon_actionmap_init = ma_actionmap_init.replace('actionmap_init(','').replace(');','');

  //var 
  var obj = jQuery.parseJSON(mon_json_init);

  // modif du title de la page en fonction du nom du client 
  document.title = obj.CltNom;

  var Nom_Client = obj.CltNom.replace(/'/g," "); // probleme de l'apostrophe dans teraterm pour la connexion CPE
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
  var SAV_CE2O ='';
  var SAV_Offre = '';
  var SAV_DSLAM = '';
  var SAV_CPE = '';
  var SAV_CPE_L2L3 = '';
  var SAV_CPE_Tab = new Array();
  var SAV_CPE_Barre_STC = '';
  var SAV_CPE_Barre_STC_Tab = new Array();

  //var label="Script SUPER GG";
  var label="";

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
  var menu_info_DSL_SAV  = '';

  var Nom_OFFRE_URL = '';
  var Nom_OFFRE_URL_2 = '';

  // Tableau des oFFres DSL
  // Cruise 1280 BIPAIRE / (SDSL en DSL-D)
  // ACC-DSLE-212) - SDSL gar 1280 K 2P
  var tableauOffreDSL = new Array();
  tableauOffreDSL["ACC-SAIP-001"] = "SDSL Monopaire 256 kbits/s (320 kbps)" ;
  tableauOffreDSL["ACC-SAIP-002"] = "SDSL Monopaire 512 kbits/s (640 kbps)" ;
  tableauOffreDSL["ACC-SAIP-003"] = "SDSL Monopaire 1 Mbits/s (1280 kbps)" ;
  tableauOffreDSL["ACC-SAIP-004"] = "SDSL Monopaire 2 Mbits/s (2048 kbps)" ;
  tableauOffreDSL["ACC-SAIP-025"] = "SDSL Monopaire 4 Mbits/s (4096 kbps)" ;
  tableauOffreDSL["ACC-SAIP-202"] = "SDSL Bipaire 512 kbits/s (2x320 kbps)" ;
  tableauOffreDSL["ACC-SAIP-203"] = "SDSL Bipaire 1 Mbits/s (2x640 kbps)" ;
  tableauOffreDSL["ACC-SAIP-204"] = "SDSL Bipaire 2 Mbits/s (2x1024 kbps)" ;
  tableauOffreDSL["ACC-SAIP-205"] = "SDSL Bipaire 4 Mbits/s (2x2048 kbps)" ;
  tableauOffreDSL["ACC-SAIP-222"] = "SDSL Bipaire 3 Mbits/s (2x1536 kbps)" ;

  tableauOffreDSL["ACC-SAIL-021"] = "SDSL Bipaire 512 kbits/s (640 kbps)" ;
  tableauOffreDSL["ACC-SAIL-022"] = "SDSL Bipaire 1 Mbits/s (1280 kbps)" ;
  tableauOffreDSL["ACC-SAIL-003"] = "SDSL Monopaire 2 Mbits/s (2048 kbps)" ;
  tableauOffreDSL["ACC-SAIL-023"] = "SDSL Bipaire 2 Mbits/s (2048 kbps)" ;
  tableauOffreDSL["ACC-SAIL-025"] = "SDSL Bipaire 4 Mbits/s (4096 kbps)" ;

  tableauOffreDSL["ACC-CRUI-025"] = "Cruise 1280 BIPAIRE / (SDSL en DSL-D)" ;
  tableauOffreDSL["ACC-CRUI-006"] = "Cruise 2048 / (SDSL en DSL-D)" ;

  tableauOffreDSL["ACC-SAIE-402"] = "SDSL EFM 4-Paires 2 Mbits/s (2234 kbps)" ;
  tableauOffreDSL["ACC-SAIE-408"] = "SDSL EFM 4-Paires 8 Mbits/s (9216 kbps)" ;

  tableauOffreDSL["ACC-SAIB-226"] = "SDSL Bis BiPaires 6 Mbits/s (6144 kbps)" ;

  tableauOffreDSL["ACC-WINP-001"] = "ADSL 512 kbits/s" ;
  tableauOffreDSL["ACC-WINP-002"] = "ADSL 1 Mbits/s" ;
  tableauOffreDSL["ACC-WINP-003"] = "ADSL 2 Mbits/s" ;
 
  tableauOffreDSL["ACC-DSLE-007"] = "SDSL crt 640 gar 75 K 1P" ;
  tableauOffreDSL["ACC-DSLE-207"] = "SDSL crt 640 gar 75 K 2P" ;
  tableauOffreDSL["ACC-DSLE-030"] = "SDSL crt 1280 gar 75 K 1P" ;
  tableauOffreDSL["ACC-DSLE-230"] = "SDSL crt 1280 gar 75 K 2P" ;
  tableauOffreDSL["ACC-DSLE-031"] = "SDSL crt 2048 gar 75 K 1P" ;
  tableauOffreDSL["ACC-DSLE-211"] = "SDSL gar 640 K 2P" ;
  tableauOffreDSL["ACC-DSLE-212"] = "SDSL gar 1280 K 2P" ;
  tableauOffreDSL["ACC-DSLE-213"] = "SDSL gar 2048 K 2P" ;
  tableauOffreDSL["ACC-DSLE-216"] = "SDSL gar 4096 K 2P" ;
  tableauOffreDSL["ACC-DSLE-231"] = "SDSL crt 2048 gar 75 K 2P" ;
  tableauOffreDSL["ACC-DSLE-233"] = "SDSL crt 4096 gar 500 K 2P" ;



  // REF CPE

  var ID_Societe ='';
  var Nom_Site ='';

  var Nbr_CPE = 0;
  var Nbr_CPE_count = 0;
  var Topologie ='';

  var hostnameCPE ='';
  var hostnameCPE_L3 ='';

  var CPE_1_Hostname ='';
  var CPE_2_Hostname ='';
  var CPE_3_Hostname ='';
  var CPE_4_Hostname ='';

  var CPE_1_IP ='';
  var CPE_2_IP ='';
  var CPE_3_IP ='';
  var CPE_4_IP ='';

  var CPE_1_Modele ='';
  var CPE_2_Modele ='';
  var CPE_3_Modele ='';
  var CPE_4_Modele ='';

  var CPE_1_Topologie ='';
  var CPE_2_Topologie ='';
  var CPE_3_Topologie ='';
  var CPE_4_Topologie ='';
  

  GM_xmlhttpRequest({
      method: "GET",
      url: 'http://10.92.252.131:8080/reporting/supstat/sites_cpe.php?gid_master='+obj.masterID+'&option=',
      onload: function(response) { 
        var codeHTML = response.responseText;

        ID_Societe = $(codeHTML).find('#tab-resultat tbody a').eq(0).html();
        Nom_Site = $(codeHTML).find('#tab-resultat tbody tr td').eq(5).text();

        Launch_Listing_Service_et_Stats();
        Launch_Entete_Service();

        Nbr_CPE = $(codeHTML).find('#tab-resultat tbody tr').size();
        Nbr_CPE_count = Nbr_CPE;
        //alert(Nbr_CPE);

        if (Nbr_CPE == 1) {
          //alert("1 seul CPE");
          CPE_1_Hostname = $(codeHTML).find('#tab-resultat tbody tr td').eq(6).text();
          CPE_1_IP = $(codeHTML).find('#tab-resultat tbody tr td').eq(8).text();
          CPE_1_Topologie = $(codeHTML).find('#tab-resultat tbody tr td').eq(9).text();

          var debut_hostname_1 = CPE_1_Hostname.substring(0,6)

          if (debut_hostname_1 == 'HW2ENT' || debut_hostname_1 == 'CPEL2') { CPE_1_Modele = 'L2_HUAWEI'; }
          else{ CPE_1_Modele = obj.iadModel; }

          hostnameCPE = CPE_1_Hostname;
          Topologie = CPE_1_Topologie;

          Launch_Conf_et_CVS();
          setInterval(WAITchainetechRecapClient,500);

        }
        else if (Nbr_CPE == 2) {
          //alert("2 CPE");

          if (Infra == 'dsl' || Infra =='') {
            //alert("Infra DSL");

          CPE_1_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(6).text();
          CPE_1_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(8).text();
          CPE_1_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(9).text();

          CPE_2_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(6).text();
          CPE_2_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(8).text();
          CPE_2_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(9).text();


          hostnameCPE = CPE_1_Hostname;
          if (CPE_1_Topologie == 'adduction' && CPE_2_Topologie == 'adduction') { Topologie = 'Adduction'; }
          else {Topologie = CPE_1_Topologie+' + '+CPE_2_Topologie; }

          Launch_Conf_et_CVS();
          setInterval(WAITchainetechRecapClient,500);
          }

          else if (Infra == 'thd') {
            //alert("Infra THD");

          CPE_1_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(6).text();
          CPE_1_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(8).text();
          CPE_1_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(9).text();

          CPE_2_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(6).text();
          CPE_2_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(8).text();
          CPE_2_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(9).text();

          var fin_hostname_CPE_1 = CPE_1_Hostname.substr(CPE_1_Hostname.length-2);
          var fin_hostname_CPE_2 = CPE_2_Hostname.substr(CPE_2_Hostname.length-2);

          var debut_hostname_1 = CPE_1_Hostname.substring(0,6);
          var debut_hostname_2 = CPE_2_Hostname.substring(0,6);


          if (fin_hostname_CPE_1 == '_A') { hostnameCPE = CPE_1_Hostname; Topologie = CPE_1_Topologie; CPE_1_Modele = 'CISCO'; CPE_2_Modele = 'L2_HUAWEI';}
          if (fin_hostname_CPE_2 == '_A') { hostnameCPE = CPE_2_Hostname; Topologie = CPE_2_Topologie; CPE_1_Modele = 'L2_HUAWEI'; CPE_2_Modele = 'CISCO';}
          if (fin_hostname_CPE_1 == '_P') { CPE_1_Modele = 'CISCO';}
          if (fin_hostname_CPE_2 == '_P') { CPE_2_Modele = 'CISCO';}
          if (debut_hostname_1 == 'HW2ENT' || debut_hostname_1 == 'CPEL2') { CPE_1_Modele = 'L2_HUAWEI'; }
          if (debut_hostname_2 == 'HW2ENT' || debut_hostname_2 == 'CPEL2') { CPE_2_Modele = 'L2_HUAWEI'; }


          Launch_Conf_et_CVS_CPE_L3(CPE_1_Hostname,1);
          Launch_Conf_et_CVS_CPE_L3(CPE_2_Hostname,2);
          setInterval(WAITchainetechRecapClient,500);
          }
        }

        else if (Nbr_CPE == 3) {
          //alert("3 CPE");

          CPE_1_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(6).text();
          CPE_1_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(8).text();
          CPE_1_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(9).text();

          CPE_2_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(6).text();
          CPE_2_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(8).text();
          CPE_2_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(9).text();

          CPE_3_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(2).find('td').eq(6).text();
          CPE_3_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(2).find('td').eq(8).text();
          CPE_3_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(2).find('td').eq(9).text();

          hostnameCPE = CPE_1_Hostname;

          var fin_hostname_CPE_1 = CPE_1_Hostname.substr(CPE_1_Hostname.length-2);
          var fin_hostname_CPE_2 = CPE_2_Hostname.substr(CPE_2_Hostname.length-2);
          var fin_hostname_CPE_3 = CPE_3_Hostname.substr(CPE_3_Hostname.length-2);

          var debut_hostname_1 = CPE_1_Hostname.substring(0,6);
          var debut_hostname_2 = CPE_2_Hostname.substring(0,6);
          var debut_hostname_3 = CPE_3_Hostname.substring(0,6);

          if (fin_hostname_CPE_1 == '_A') { hostnameCPE = CPE_1_Hostname; Topologie = CPE_1_Topologie; CPE_1_Modele = 'CISCO';}
          if (fin_hostname_CPE_2 == '_A') { hostnameCPE = CPE_2_Hostname; Topologie = CPE_2_Topologie; CPE_2_Modele = 'CISCO';}
          if (fin_hostname_CPE_3 == '_A') { hostnameCPE = CPE_3_Hostname; Topologie = CPE_3_Topologie; CPE_3_Modele = 'CISCO';}

          if (fin_hostname_CPE_1 == '_A' || fin_hostname_CPE_1 == '_P') { CPE_1_Modele = 'CISCO'; } else  { CPE_1_Modele = 'L2_HUAWEI';}
          if (fin_hostname_CPE_2 == '_A' || fin_hostname_CPE_2 == '_P') { CPE_2_Modele = 'CISCO'; } else  { CPE_2_Modele = 'L2_HUAWEI';}
          if (fin_hostname_CPE_3 == '_A' || fin_hostname_CPE_3 == '_P') { CPE_3_Modele = 'CISCO'; } else  { CPE_3_Modele = 'L2_HUAWEI';}

          if (debut_hostname_1 == 'HW2ENT' || debut_hostname_1 == 'CPEL2') { CPE_1_Modele = 'L2_HUAWEI'; }
          if (debut_hostname_2 == 'HW2ENT' || debut_hostname_2 == 'CPEL2') { CPE_2_Modele = 'L2_HUAWEI'; }
          if (debut_hostname_3 == 'HW2ENT' || debut_hostname_3 == 'CPEL2') { CPE_3_Modele = 'L2_HUAWEI'; }

          Launch_Conf_et_CVS_CPE_L3(CPE_1_Hostname,1);
          Launch_Conf_et_CVS_CPE_L3(CPE_2_Hostname,2);
          Launch_Conf_et_CVS_CPE_L3(CPE_3_Hostname,3);
          setInterval(WAITchainetechRecapClient,500);
        }

        else if (Nbr_CPE == 4) {
          //alert("4 CPE");

          CPE_1_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(6).text();
          CPE_1_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(8).text();
          CPE_1_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(0).find('td').eq(9).text();

          CPE_2_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(6).text();
          CPE_2_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(8).text();
          CPE_2_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(1).find('td').eq(9).text();

          CPE_3_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(2).find('td').eq(6).text();
          CPE_3_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(2).find('td').eq(8).text();
          CPE_3_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(2).find('td').eq(9).text();

          CPE_4_Hostname = $(codeHTML).find('#tab-resultat tbody tr').eq(3).find('td').eq(6).text();
          CPE_4_IP = $(codeHTML).find('#tab-resultat tbody tr').eq(3).find('td').eq(8).text();
          CPE_4_Topologie = $(codeHTML).find('#tab-resultat tbody tr').eq(3).find('td').eq(9).text();

          hostnameCPE = CPE_1_Hostname;

          var fin_hostname_CPE_1 = CPE_1_Hostname.substr(CPE_1_Hostname.length-2);
          var fin_hostname_CPE_2 = CPE_2_Hostname.substr(CPE_2_Hostname.length-2);
          var fin_hostname_CPE_3 = CPE_3_Hostname.substr(CPE_3_Hostname.length-2);
          var fin_hostname_CPE_4 = CPE_4_Hostname.substr(CPE_4_Hostname.length-2);

          var debut_hostname_1 = CPE_1_Hostname.substring(0,6);
          var debut_hostname_2 = CPE_2_Hostname.substring(0,6);
          var debut_hostname_3 = CPE_3_Hostname.substring(0,6);
          var debut_hostname_4 = CPE_4_Hostname.substring(0,6);

          if (fin_hostname_CPE_1 == '_A') { hostnameCPE = CPE_1_Hostname; Topologie = CPE_1_Topologie; CPE_1_Modele = 'CISCO';}
          if (fin_hostname_CPE_2 == '_A') { hostnameCPE = CPE_2_Hostname; Topologie = CPE_2_Topologie; CPE_2_Modele = 'CISCO';}
          if (fin_hostname_CPE_3 == '_A') { hostnameCPE = CPE_3_Hostname; Topologie = CPE_3_Topologie; CPE_3_Modele = 'CISCO';}
          if (fin_hostname_CPE_4 == '_A') { hostnameCPE = CPE_4_Hostname; Topologie = CPE_4_Topologie; CPE_4_Modele = 'CISCO';}

          if (fin_hostname_CPE_1 == '_A' || fin_hostname_CPE_1 == '_P') { CPE_1_Modele = 'CISCO';} else  { CPE_1_Modele = 'L2_HUAWEI';}
          if (fin_hostname_CPE_2 == '_A' || fin_hostname_CPE_2 == '_P') { CPE_2_Modele = 'CISCO';} else  { CPE_2_Modele = 'L2_HUAWEI';}
          if (fin_hostname_CPE_3 == '_A' || fin_hostname_CPE_3 == '_P') { CPE_3_Modele = 'CISCO';} else  { CPE_3_Modele = 'L2_HUAWEI';}
          if (fin_hostname_CPE_4 == '_A' || fin_hostname_CPE_4 == '_P') { CPE_4_Modele = 'CISCO';} else  { CPE_4_Modele = 'L2_HUAWEI';}

          if (debut_hostname_1 == 'HW2ENT' || debut_hostname_1 == 'CPEL2') { CPE_1_Modele = 'L2_HUAWEI'; }
          if (debut_hostname_2 == 'HW2ENT' || debut_hostname_2 == 'CPEL2') { CPE_2_Modele = 'L2_HUAWEI'; }
          if (debut_hostname_3 == 'HW2ENT' || debut_hostname_3 == 'CPEL2') { CPE_3_Modele = 'L2_HUAWEI'; }
          if (debut_hostname_4 == 'HW2ENT' || debut_hostname_4 == 'CPEL2') { CPE_4_Modele = 'L2_HUAWEI'; }

          Launch_Conf_et_CVS_CPE_L3(CPE_1_Hostname,1);
          Launch_Conf_et_CVS_CPE_L3(CPE_2_Hostname,2);
          Launch_Conf_et_CVS_CPE_L3(CPE_3_Hostname,3);
          Launch_Conf_et_CVS_CPE_L3(CPE_4_Hostname,4);
          setInterval(WAITchainetechRecapClient,500);
        }
        else {
          alert('pas de CPE retrouvé pour'+obj.masterID+' / ou Rafraichir page');
          //alert(obj.masterID);
          hostnameCPE = obj.login.split('@')[0];
          Launch_Conf_et_CVS();
          setInterval(WAITchainetechRecapClient,500);
        }
      }
    });


  // Aire de Lancement 

  var first = true;
  // setInterval(WAITchainetechRecapClient,500);

  // Launch_Conf_et_CVS(); // lancé après avoir trouvé le CPE
  // Launch_Listing_Service_et_Stats();
  // Launch_Entete_Service();
  //Launch_Info_DSL();

  MEP_Baniere();
  // MEP_test();
  Carte_France();
  Carte_Incidents();


function WAITchainetechRecapClient() {
  if (document.getElementById("chainetechRecapClient").getElementsByClassName('tdSoap')[3].innerHTML == '') return;
  else if (first){
    first = false;
    // alert ('baka');

    if ($("#chainetechACCESCE2O\\ FT").size() > 0) {
      CE2O_feuille = document.getElementById("chainetechACCESCE2O FT").getElementsByClassName('tdSoap')[3].innerHTML;
      CE2O_tronc = document.getElementById("chainetechACCESCE2O FT").getElementsByClassName('tdSoap')[9].innerHTML;
      CE2O_vlan = document.getElementById("chainetechACCESCE2O FT").getElementsByClassName('tdSoap')[14].innerHTML;

      Launch_Info_THD();
    }

    if ($("#chainetechSDH").size() > 0) {
      ref_LPT = document.getElementById("chainetechSDH").getElementsByClassName('tdSoap')[3].innerHTML;
    }

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
    }

    if ($("#chainetechDSLAMMA5300").size() > 0) {
      var dslam5300_alias = document.getElementById("chainetechDSLAMMA5300").getElementsByClassName('tdSoap')[0].innerHTML;
      var dslam5300_slot = document.getElementById("chainetechDSLAMMA5300").getElementsByClassName('tdSoap')[9].innerHTML;
      var dslam5300_port = document.getElementById("chainetechDSLAMMA5300").getElementsByClassName('tdSoap')[10].innerHTML;
      var dslam5300_vlan = document.getElementById("chainetechDSLAMMA5300").getElementsByClassName('tdSoap')[13].innerHTML;
      var dslam5300_ip = document.getElementById("chainetechDSLAMMA5300").getElementsByClassName('tdSoap')[16].innerHTML;
      var dslam_adresse = document.getElementById("chainetechDSLAMMA5300").getElementsByClassName('tdSoap')[20].innerHTML;

      SAV_DSLAM += '<br> DSLAM : '+ dslam5300_alias;
      SAV_DSLAM += '<br> Vlan : '+ dslam5300_vlan;
      SAV_DSLAM += '<br> Slot / Port : '+ dslam5300_slot +' / 0 / '+dslam5300_port;
      SAV_DSLAM += '<br> Adresse : '+ dslam_adresse;
      SAV_DSLAM += '<br>';

      //alert(SAV_DSLAM);

    }

    if ($("#chainetechCARTEISU").size() > 0) {
      var carteISU_alias = document.getElementById("chainetechCARTEISU").getElementsByClassName('tdSoap')[0].innerHTML;
      var carteISU_14 = document.getElementById("chainetechCARTEISU").getElementsByClassName('tdSoap')[1].innerHTML;
      var carteISU_15 = document.getElementById("chainetechCARTEISU").getElementsByClassName('tdSoap')[3].innerHTML;
    }

    if ($("#chainetechDSLAMMA5600T").size() > 0) {
      var dslam5600_alias = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[0].innerHTML;
      var dslam5600_slot = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[8].innerHTML;
      var dslam5600_port = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[9].innerHTML;
      var dslam5600_vlan = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[12].innerHTML;
      var dslam_adresse = document.getElementById("chainetechDSLAMMA5600T").getElementsByClassName('tdSoap')[19].innerHTML;

      SAV_DSLAM += '<br> DSLAM : '+ dslam5600_alias;
      SAV_DSLAM += '<br> Vlan : '+ dslam5600_vlan;
      SAV_DSLAM += '<br> Slot / Port : '+ dslam5600_slot +' / 0 / '+dslam5600_port;
      SAV_DSLAM += '<br> Adresse : '+ dslam_adresse;
      SAV_DSLAM += '<br>';

      }

     if ($("#chainetechISU\\ 5300").size() > 0) {
      var carteISU_alias = document.getElementById("chainetechISU 5300").getElementsByClassName('tdSoap')[0].innerHTML;
      var carteISU_14 = document.getElementById("chainetechISU 5300").getElementsByClassName('tdSoap')[1].innerHTML;
      var carteISU_15 = document.getElementById("chainetechISU 5300").getElementsByClassName('tdSoap')[3].innerHTML;
     }

    if ($("#chainetechDSLAMMA5600T\\ -\\ Niveau\\ 2").size() > 0) {
      var dslam5600_alias = document.getElementById("chainetechDSLAMMA5600T - Niveau 2").getElementsByClassName('tdSoap')[0].innerHTML;
      var dslam5600_slot = document.getElementById("chainetechDSLAMMA5600T - Niveau 2").getElementsByClassName('tdSoap')[9].innerHTML;
      var dslam5600_port = document.getElementById("chainetechDSLAMMA5600T - Niveau 2").getElementsByClassName('tdSoap')[10].innerHTML;
      var dslam5600_vlan = document.getElementById("chainetechDSLAMMA5600T - Niveau 2").getElementsByClassName('tdSoap')[13].innerHTML;
      var dslam_adresse = document.getElementById("chainetechDSLAMMA5600T - Niveau 2").getElementsByClassName('tdSoap')[21].innerHTML;

      SAV_DSLAM += '<br> DSLAM : '+ dslam5600_alias;
      SAV_DSLAM += '<br> Vlan : '+ dslam5600_vlan;
      SAV_DSLAM += '<br> Slot / Port : '+ dslam5600_slot +' / 0 / '+dslam5600_port;
      SAV_DSLAM += '<br> Adresse : '+ dslam_adresse;
      SAV_DSLAM += '<br>';

      }

    if ($("#chainetechBASse1200").size() > 0) {
      var BASse1200_alias = document.getElementById("chainetechBASse1200").getElementsByClassName('tdSoap')[0].innerHTML; 
     }

    if ($("#chainetechBASse800").size() > 0) {
      var BASse800_alias = document.getElementById("chainetechBASse800").getElementsByClassName('tdSoap')[0].innerHTML;
      var BASse800_slot = document.getElementById("chainetechBASse800").getElementsByClassName('tdSoap')[2].innerHTML;
      var BASse800_port = document.getElementById("chainetechBASse800").getElementsByClassName('tdSoap')[4].innerHTML;
      var BASse800_vp = document.getElementById("chainetechBASse800").getElementsByClassName('tdSoap')[5].innerHTML;
      var BASse800_vc = document.getElementById("chainetechBASse800").getElementsByClassName('tdSoap')[6].innerHTML;
     }

      if ($("#chainetechBAS").size() > 0) {
      var BASse100_alias = document.getElementById("chainetechBAS").getElementsByClassName('tdSoap')[0].innerHTML;
     }

    if ($("#chainetechDSLAM7301").size() > 0) {
      //alert("7301");
      var dslam_ASAM_alias = document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[0].innerHTML;
      var dslam_ASAM_rack = document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[6].innerHTML;
      var dslam_ASAM_sous_rack = document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[7].innerHTML;
      var dslam_ASAM_slot = document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[8].innerHTML;
      var dslam_ASAM_port = document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[9].innerHTML;
      if (typeof document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[14].innerHTML != 'undefined') {
        var dslam_adresse = document.getElementById("chainetechDSLAM7301").getElementsByClassName('tdSoap')[14].innerHTML;
      }
      else {
        var dslam_adresse = 'NC';
      }

      SAV_DSLAM += '<br> DSLAM : '+dslam_ASAM_alias;
      SAV_DSLAM += '<br> Rack / Sous Rack : '+dslam_ASAM_rack+' / '+dslam_ASAM_sous_rack;
      SAV_DSLAM += '<br> Slot / Port : '+dslam_ASAM_slot+' / 0 / '+dslam_ASAM_port;
      SAV_DSLAM += '<br> Adresse : '+ dslam_adresse;
      SAV_DSLAM += '<br>';

     }

    if ($("#chainetechDSLAM7301_1").size() > 0) {
      var dslam_ISAM_alias = document.getElementById("chainetechDSLAM7301_1").getElementsByClassName('tdSoap')[0].innerHTML;
      var dslam_ISAM_rack = document.getElementById("chainetechDSLAM7301_1").getElementsByClassName('tdSoap')[6].innerHTML;
      var dslam_ISAM_sous_rack = document.getElementById("chainetechDSLAM7301_1").getElementsByClassName('tdSoap')[7].innerHTML;
      var dslam_ISAM_slot = document.getElementById("chainetechDSLAM7301_1").getElementsByClassName('tdSoap')[8].innerHTML;
      var dslam_ISAM_port = document.getElementById("chainetechDSLAM7301_1").getElementsByClassName('tdSoap')[9].innerHTML;
      var dslam_adresse = document.getElementById("chainetechDSLAM7301_1").getElementsByClassName('tdSoap')[14].innerHTML;


      SAV_DSLAM += '<br> DSLAM : '+dslam_ISAM_alias;
      SAV_DSLAM += '<br> Rack / Sous Rack : '+dslam_ISAM_rack+' / '+dslam_ISAM_sous_rack;
      SAV_DSLAM += '<br> Slot / Port : '+dslam_ISAM_slot+' / 0 / '+dslam_ISAM_port;
      SAV_DSLAM += '<br> Adresse : '+ dslam_adresse;
      SAV_DSLAM += '<br>';

    }

    if ($("#chainetechDSLAMISAM\\ 7302\\ FD").size() > 0) {
      var dslam_ISAM_alias = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[0].innerHTML;
      var dslam_ISAM_rack = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[7].innerHTML;
      var dslam_ISAM_sous_rack = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[8].innerHTML;
      var dslam_ISAM_slot = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[9].innerHTML;
      var dslam_ISAM_port = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[10].innerHTML;
      var dslam_adresse = document.getElementById("chainetechDSLAMISAM 7302 FD").getElementsByClassName('tdSoap')[19].innerHTML;


      SAV_DSLAM += '<br> DSLAM : '+dslam_ISAM_alias;
      SAV_DSLAM += '<br> Rack / Sous Rack : '+dslam_ISAM_rack+' / '+dslam_ISAM_sous_rack;
      SAV_DSLAM += '<br> Slot / Port : '+dslam_ISAM_slot+' / 0 / '+dslam_ISAM_port;
      SAV_DSLAM += '<br> Adresse : '+ dslam_adresse;
      SAV_DSLAM += '<br>';

    }

    if ($("#chainetechDSLAMAxione").size() > 0) {
      var dslam_AXIONE_alias = document.getElementById("chainetechDSLAMAxione").getElementsByClassName('tdSoap')[0].innerHTML;
      var dslam_AXIONE_type = document.getElementById("chainetechDSLAMAxione").getElementsByClassName('tdSoap')[1].innerHTML;
      var dslam_AXIONE_slot = document.getElementById("chainetechDSLAMAxione").getElementsByClassName('tdSoap')[2].innerHTML;
      var dslam_AXIONE_port = document.getElementById("chainetechDSLAMAxione").getElementsByClassName('tdSoap')[3].innerHTML;


      SAV_DSLAM += '<br> DSLAM : '+dslam_AXIONE_alias;
      SAV_DSLAM += '<br> Type : '+dslam_AXIONE_type;
      SAV_DSLAM += '<br> Slot / Port : '+dslam_AXIONE_slot+' / 0 / '+dslam_AXIONE_port;
      SAV_DSLAM += '<br>';

    }

    if ($("#chainetechPETHD").size() > 0) {
      var PETHD_Nominal_Alias = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[0].innerHTML;
      var PETHD_Nominal_IP = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[1].innerHTML;
      var PETHD_BackUp_Alias = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[9].innerHTML;
      var PETHD_BackUp_IP = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[8].innerHTML;
      var PETHD_vlan = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[3].innerHTML;
      var PETHD_PseudoWire = document.getElementById("chainetechPETHD").getElementsByClassName('tdSoap')[7].innerHTML;

    }


    if ($("#chainetechPEMS").size() > 0) {
      var PEMS_Alias = document.getElementById("chainetechPEMS").getElementsByClassName('tdSoap')[0].innerHTML;
      var PEMS_IP = document.getElementById("chainetechPEMS").getElementsByClassName('tdSoap')[1].innerHTML;

      var test_HUB = document.getElementById("chainetechPEMS").getElementsByClassName('tdSoap')[3].innerHTML;
      var test_SPOKE = document.getElementById("chainetechPEMS").getElementsByClassName('tdSoap')[5].innerHTML;
      var test_SPOKE_2 = document.getElementById("chainetechPEMS").getElementsByClassName('tdSoap')[4].innerHTML;

      if (test_HUB == 'HUB') {
        var PEMS_Classe = document.getElementById("chainetechPEMS").getElementsByClassName('tdSoap')[3].innerHTML;
        var PEMS_vlan = document.getElementById("chainetechPEMS").getElementsByClassName('tdSoap')[4].innerHTML;
      }
      else if (test_HUB == 'SPOKE') {
        var PEMS_Classe = document.getElementById("chainetechPEMS").getElementsByClassName('tdSoap')[3].innerHTML;
        var PEMS_vlan = document.getElementById("chainetechPEMS").getElementsByClassName('tdSoap')[4].innerHTML;
      }
      else if (test_SPOKE == 'SPOKE') {
        var PEMS_Classe = document.getElementById("chainetechPEMS").getElementsByClassName('tdSoap')[5].innerHTML;
        var PEMS_vlan = document.getElementById("chainetechPEMS").getElementsByClassName('tdSoap')[6].innerHTML;
      }
    }

    if ($("#chainetechPESMS").size() > 0) {
      var PESPOKE_Alias = document.getElementById("chainetechPESMS").getElementsByClassName('tdSoap')[0].innerHTML;
      var PESPOKE_IP = document.getElementById("chainetechPESMS").getElementsByClassName('tdSoap')[1].innerHTML;
      var PESPOKE_Classe = document.getElementById("chainetechPESMS").getElementsByClassName('tdSoap')[2].innerHTML;
      var PESPOKE_vlan = document.getElementById("chainetechPESMS").getElementsByClassName('tdSoap')[3].innerHTML;
    }

    if ($("#chainetechPEHMS").size() > 0) {
      var PEHMS_Alias = document.getElementById("chainetechPEHMS").getElementsByClassName('tdSoap')[0].innerHTML;
      var PEHMS_IP = document.getElementById("chainetechPEHMS").getElementsByClassName('tdSoap')[1].innerHTML;
      var PEHMS_Classe = document.getElementById("chainetechPEHMS").getElementsByClassName('tdSoap')[2].innerHTML;
      var PEHMS_PseudoWire = document.getElementById("chainetechPEHMS").getElementsByClassName('tdSoap')[3].innerHTML;
    }


    if ($("#chainetechSWITCHAGGREG").size() > 0) {
      var SWAGR_Alias = document.getElementById("chainetechSWITCHAGGREG").getElementsByClassName('tdSoap')[0].innerHTML;
      var SWAGR_IP = document.getElementById("chainetechSWITCHAGGREG").getElementsByClassName('tdSoap')[1].innerHTML;
      var SWAGR_Vlan = document.getElementById("chainetechSWITCHAGGREG").getElementsByClassName('tdSoap')[2].innerHTML;

    }

    if ($("#chainetechPESPOKE").size() > 0) {
      var PESPOKE_Alias = document.getElementById("chainetechPESPOKE").getElementsByClassName('tdSoap')[0].innerHTML;
      var PESPOKE_IP = document.getElementById("chainetechPESPOKE").getElementsByClassName('tdSoap')[1].innerHTML;
      var PESPOKE_Classe = document.getElementById("chainetechPESPOKE").getElementsByClassName('tdSoap')[5].innerHTML;
      var PESPOKE_vlan = document.getElementById("chainetechPESPOKE").getElementsByClassName('tdSoap')[6].innerHTML;

    }

    if ($("#chainetechPEHUB").size() > 0) {
      var PEHUB_Alias = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[0].innerHTML;
      var PEHUB_IP = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[1].innerHTML;
      var PEHUB_MODEL = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[2].innerHTML;

      //alert(PEHUB_MODEL);


      if (PEHUB_MODEL== 'SE800s'){
        //alert("SE800");
        var PEHUB_Classe = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[3].innerHTML;
        var PEHUB_VC_ID = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[5].innerHTML;
      }

      else if (PEHUB_MODEL== 'SE400' || PEHUB_MODEL== 'SE100') {
        //alert("SE400");

        var PEHUB_test_vlan_ou_PW = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[7].innerHTML;

        var PEHUB_Classe = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[5].innerHTML;
        var PEHUB_VC_ID = 'nc';
        var PEHUB_vlan = 'nc';

        if (PEHUB_test_vlan_ou_PW !='L2VPN' ) {
          PEHUB_VC_ID = document.getElementById("chainetechPEHUB").getElementsByClassName('tdSoap')[7].innerHTML;
        }
        else {
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

     
    Outils_SAV(); 
    Outils_Barre_STC(); 


    ChaineTechnique(
      switch_atm_in,switch_atm_in_slot,switch_atm_in_port,switch_atm_in_vp,switch_atm_in_vc,
      switch_atm_out,switch_atm_out_slot,switch_atm_out_port,switch_atm_out_vp,switch_atm_out_vc,

      dslam5300_alias,dslam5300_slot,dslam5300_port,dslam5300_vlan,dslam5300_ip,
      dslam5600_alias,dslam5600_slot,dslam5600_port,dslam5600_vlan,

      dslam_adresse,

      carteISU_alias,carteISU_14,carteISU_15,
      BASse100_alias,
      BASse1200_alias,
      BASse800_alias,BASse800_slot,BASse800_port,BASse800_vp,BASse800_vc,

      PETHD_Nominal_Alias,PETHD_Nominal_IP,PETHD_PseudoWire,PETHD_BackUp_Alias,PETHD_BackUp_IP,PETHD_vlan,
      PEMS_Alias,PEMS_IP,PEMS_Classe,PEMS_vlan,
      SWAGR_Alias,SWAGR_IP,SWAGR_Vlan,
      PESPOKE_Alias,PESPOKE_IP,PESPOKE_Classe,PESPOKE_vlan,
      PEHUB_Alias,PEHUB_IP,PEHUB_Classe,PEHUB_VC_ID,PEHUB_MODEL,PEHUB_vlan,
      PEHMS_Alias,PEHMS_IP,PEHMS_Classe,PEHMS_PseudoWire
    );
  }
}


function ChaineTechnique(
  switch_atm_in,switch_atm_in_slot,switch_atm_in_port,switch_atm_in_vp,switch_atm_in_vc,
  switch_atm_out,switch_atm_out_slot,switch_atm_out_port,switch_atm_out_vp,switch_atm_out_vc,

  dslam5300_alias,dslam5300_slot,dslam5300_port,dslam5300_vlan,dslam5300_ip,
  dslam5600_alias,dslam5600_slot,dslam5600_port,dslam5600_vlan,

  dslam_adresse,

  carteISU_alias,carteISU_14,carteISU_15,
  BASse100_alias,
  BASse1200_alias,
  BASse800_alias,BASse800_slot,BASse800_port,BASse800_vp,BASse800_vc,

  PETHD_Nominal_Alias,PETHD_Nominal_IP,PETHD_PseudoWire,PETHD_BackUp_Alias,PETHD_BackUp_IP,PETHD_vlan,
  PEMS_Alias,PEMS_IP,PEMS_Classe,PEMS_vlan,
  SWAGR_Alias,SWAGR_IP,SWAGR_Vlan,
  PESPOKE_Alias,PESPOKE_IP,PESPOKE_Classe,PESPOKE_vlan,
  PEHUB_Alias,PEHUB_IP,PEHUB_Classe,PEHUB_VC_ID,PEHUB_MODEL,PEHUB_vlan,
  PEHMS_Alias,PEHMS_IP,PEHMS_Classe,PEHMS_PseudoWire
  ) {

  //var hostnameCPE = obj.login.split('@')[0];
  //alert("dans la ChaineTechnique");

  menu_debut+='Accès vers les infos CPE / Site &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<hr>';

  //Liens vers SUP CPE
  menu_debut+='<br><a target=_blank href="http://10.92.252.131:8080/SupCPE/infos_cpe.php?cpe='+hostnameCPE+'&master_id='+obj.masterID+'">SUP CPE (conf et recette)</a>';
  menu_debut+='<br><a target=_blank href="http://10.92.252.131:8080/reporting/supstat/sites_cpe.php?gid_master='+obj.masterID+'&option="> Reporting CPETOOLBOX</a>';
  menu_debut+='<br><a target=_blank href="http://ulysseservices.prod.neuf.ld:8083/cwd2/documentList.htm?xs_type=ismid&xs_id='+obj.masterID+'&origine=clarify&bdstype=site">Documents Clarify - Ulysse Services</a>';

  menu_debut+='<br><br>Connexion vers les Equipements<hr>';

  // Liens vers connexion CPE

  var TypeCPE ='nc';
  menu_debut+='<br>'+obj.realNameOffre+' - '+Topologie;

  // Nouvelle gestion CPE

  if (Infra == 'dsl' || Infra =='') {

    if (Nbr_CPE == 1) {
        menu_IP_CPE_A+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_1_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_1_IP+'&typeCPE='+CPE_1_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_1_Hostname+'</a>';
        HADES(CPE_1_IP,1);
    }
    else if (Nbr_CPE == 2) {
        menu_IP_CPE_A+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_1_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_1_IP+'&typeCPE='+CPE_1_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_1_Hostname+'</a>';
        menu_IP_CPE_P+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_2_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_2_IP+'&typeCPE='+CPE_2_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_2_Hostname+'</a>';
        HADES(CPE_1_IP,1);
        HADES(CPE_2_IP,2);
    }
  }

  else if (Infra == 'thd') {

    if (Nbr_CPE == 1) {
        menu_IP_CPE_L3+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_1_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_1_IP+'&typeCPE='+CPE_1_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_1_Hostname+'</a>';
        HADES(CPE_1_IP,1);
    }
    else if (Nbr_CPE == 2) {
        menu_IP_CPE_L3+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_1_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_1_IP+'&typeCPE='+CPE_1_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_1_Hostname+'</a>';
        menu_IP_CPE_L3+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_2_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_2_IP+'&typeCPE='+CPE_2_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_2_Hostname+'</a>';
        HADES(CPE_1_IP,1);
        HADES(CPE_2_IP,2);
    }
    else if (Nbr_CPE == 3) {
        menu_IP_CPE_L3+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_1_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_1_IP+'&typeCPE='+CPE_1_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_1_Hostname+'</a>';
        menu_IP_CPE_L3+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_2_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_2_IP+'&typeCPE='+CPE_2_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_2_Hostname+'</a>';
        menu_IP_CPE_L3+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_3_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_3_IP+'&typeCPE='+CPE_3_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_3_Hostname+'</a>';
        HADES(CPE_1_IP,1);
        HADES(CPE_2_IP,2);
        HADES(CPE_3_IP,3);
    }
    else if (Nbr_CPE == 4) {
        menu_IP_CPE_L3+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_1_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_1_IP+'&typeCPE='+CPE_1_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_1_Hostname+'</a>';
        menu_IP_CPE_L3+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_2_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_2_IP+'&typeCPE='+CPE_2_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_2_Hostname+'</a>';
        menu_IP_CPE_L3+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_3_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_3_IP+'&typeCPE='+CPE_3_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_3_Hostname+'</a>';
        menu_IP_CPE_L3+='<br>&nbsp;&nbsp;&nbsp;<a title="'+CPE_4_IP+'"target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+CPE_4_IP+'&typeCPE='+CPE_4_Modele+'&typeOffre='+encodeURIComponent(obj.realNameOffre)+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+CPE_4_Hostname+'</a>';
        HADES(CPE_1_IP,1);
        HADES(CPE_2_IP,2);
        HADES(CPE_3_IP,3);
        HADES(CPE_4_IP,4);
    }

  }


  //alert("Liens vers PE THD");

  if (typeof SWAGR_Alias != 'undefined') {
    // menu_fin += '<br>';
    // menu_fin += '<br>'+SWAGR_Alias+' '+SWAGR_IP;
    // menu_fin += '<br> Vlan : '+SWAGR_Vlan;

    menu_fin += '<br>';
    menu_fin += '<br> SW AGR : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=swagr&swagr='+encodeURIComponent(SWAGR_Alias)+'&swagr_vlan='+encodeURIComponent(SWAGR_Vlan)+'">'+SWAGR_Alias+'</a>';

  }

  if (typeof PEMS_Alias != 'undefined') {
    menu_fin += '<br>';
    menu_fin += '<br> PE MS '+PEMS_Classe+' : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=pesms&pesms='+encodeURIComponent(PEMS_IP)+'&pesms_vlan='+encodeURIComponent(PEMS_vlan)+'">'+PEMS_Alias+'</a>';
    // menu_fin += '<br>'+PEMS_Alias+' '+PEMS_IP;
    // menu_fin += '<br> Type : '+PEMS_Classe;
    // menu_fin += '<br> Vlan : '+PEMS_vlan;
  }


  if (typeof PESPOKE_Alias != 'undefined') {
    menu_fin += '<br>';
    menu_fin += '<br> PEL2VPN '+PESPOKE_Classe+' : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=pel2vpnspoke&pel2vpnspoke='+encodeURIComponent(PESPOKE_IP)+'&pel2vpnspoke_vlan='+encodeURIComponent(PESPOKE_vlan)+'">'+PESPOKE_Alias+'</a>';
    // menu_fin += '<br>'+PESPOKE_Alias+' '+PESPOKE_Classe+' '+PESPOKE_IP;
    // menu_fin += '<br> Vlan : '+PESPOKE_vlan;
  }


  if (typeof PEHUB_Alias != 'undefined') {

    if (PEHUB_MODEL != 'ERROR') {

      if (PEHUB_VC_ID != 'nc' || PEHUB_VC_ID != 'ERROR') {

        var PEHUB_VC_ID_long = PEHUB_VC_ID.substring(1);

        if (PEHUB_MODEL == 'SE800s') {
          PEHUB_VC_ID = PEHUB_VC_ID.substring(1,8);
        }
        else if (PEHUB_MODEL == 'SE100') {
          PEHUB_VC_ID = PEHUB_VC_ID.substring(1);
        }
        else if (PEHUB_MODEL == 'SE400' && PEHUB_VC_ID != 'nc') {
          PEHUB_VC_ID = PEHUB_VC_ID.substring(1);
        }
      }

    menu_fin += '<br>';
    menu_fin += '<br> PEL2VPN '+PEHUB_Classe+' : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=pel2vpnhub&pel2vpnhub='+encodeURIComponent(PEHUB_IP)+'&pel2vpnhub_VC_ID='+encodeURIComponent(PEHUB_VC_ID)+'&pel2vpnhub_VC_ID_long='+encodeURIComponent(PEHUB_VC_ID_long)+'&pel2vpnhub_vlan='+encodeURIComponent(PEHUB_vlan)+'&pel2vpnhub_model='+encodeURIComponent(PEHUB_MODEL)+'">'+PEHUB_Alias+'</a>';
    // menu_fin += '<br>'+PEHUB_Alias+' '+PEHUB_Classe+' '+PEHUB_IP;
    // menu_fin += '<br> VC ID : '+PEHUB_VC_ID;
    }

    else { // PEHUB_MODEL == 'ERROR'
      PEHUB_MODEL = 'SE100';
      PEHUB_Classe = 'HUB';
      PEHUB_VC_ID = PEHUB_VC_ID_long = PEHUB_vlan = 'nc';
      menu_fin += '<br>';
      menu_fin += '<br> PEL2VPN '+PEHUB_Classe+' : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=pel2vpnhub&pel2vpnhub='+encodeURIComponent(PEHUB_IP)+'&pel2vpnhub_VC_ID='+encodeURIComponent(PEHUB_VC_ID)+'&pel2vpnhub_VC_ID_long=AUCUN&pel2vpnhub_vlan='+encodeURIComponent(PEHUB_vlan)+'&pel2vpnhub_model='+encodeURIComponent(PEHUB_MODEL)+'">'+PEHUB_Alias+'</a>';

    }

  }

  if (typeof PEHMS_Alias != 'undefined') {
    var PEHMS_model = 'SE800s';
    var PEHMS_PseudoWire_court = PEHMS_PseudoWire.substring(1,8);
    menu_fin += '<br>';
    menu_fin += '<br> PEL2VPN '+PEHMS_Classe+' : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=pel2vpnhub&pel2vpnhub='+encodeURIComponent(PEHMS_IP)+'&pel2vpnhub_VC_ID='+encodeURIComponent(PEHMS_PseudoWire_court)+'&pel2vpnhub_VC_ID_long='+encodeURIComponent(PEHMS_PseudoWire)+'&pel2vpnhub_model='+encodeURIComponent(PEHMS_model)+'">'+PEHMS_Alias+'</a>';
  }

  if (typeof PETHD_Nominal_Alias != 'undefined') {
    // menu_fin += '<br>';
    // menu_fin += '<br>'+PETHD_Nominal_Alias+' '+PETHD_Nominal_IP;
    // menu_fin += '<br>'+PETHD_BackUp_Alias+' '+PETHD_BackUp_IP;
    // menu_fin += '<br> PseudoWire : '+PETHD_PseudoWire+' & vlan : '+PETHD_vlan;

    menu_fin += '<br>';
    menu_fin += '<br> PE THD Nominal : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=pethd&pethd='+encodeURIComponent(PETHD_Nominal_Alias)+'&pethd_vlan='+encodeURIComponent(PETHD_vlan)+'">'+PETHD_Nominal_Alias+'</a>';
    menu_fin += '<br> PE THD Secondaire: <a target=_blank href="'+GM_dossier+'CreationBat.php?action=pethd&pethd='+encodeURIComponent(PETHD_BackUp_Alias)+'&pethd_vlan='+encodeURIComponent(PETHD_vlan)+'">'+PETHD_BackUp_Alias+'</a>';

  }

  //alert("PE LNS HD");

  //alert(Infra);

  if (Infra == 'thd') {
    if (!(typeof obj.pelns == 'undefined')){
      var PelnsHDTest = obj.pelns.match(/[\w]{4}-(LNSHD|PELNS)-(N|B|OSM)-(1|2|3|4)/i);

      if( PelnsHDTest!=null ){

        var VLAN_PE_LNS_HD = 'nc';

        menu_fin+='<br><br>PE LNS HD : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=pelnshd_thd&pelnshd='+encodeURIComponent(obj.pelns)+'&vlan='+encodeURIComponent(VLAN_PE_LNS_HD)+'">'+obj.pelns+'</a>';
      }
    }
  }

  //alert("PE LNS HD DSL");

  if (Infra == 'dsl' || Infra =='') {
  // if (Infra == 'dsl') {

    //Liens vers connexion PE DSL
    if (!(typeof obj.pelns == 'undefined')){
      // Test si PE LNSHD
      //var PelnsHDTest = obj.pelns.match(/[\w]{4}-LNSHD-(N|B)-(1|2|3|4)/i);
      //alert(obj.pelns);
      var PelnsHDTest = obj.pelns.match(/[\w]{4}-(LNSHD|PELNS)-(N|B|OSM)-(1|2|3|4)/i);
      if( PelnsHDTest!=null ){
        menu_fin+='<br><br>PE LNS HD : <a title="'+obj.login+' | '+obj.context+'" target=_blank href="'+GM_dossier+'CreationBat.php?action=pelnshd&login='+encodeURIComponent(obj.login)+'&pelnshd='+encodeURIComponent(obj.pelns)+'&context='+encodeURIComponent(obj.context)+'">'+obj.pelns+'</a>';
        }
        // Sinon PE CISCO
      else if(typeof obj.dslInfos[0].VpVc != 'undefined'){
        var pecisco_vp = obj.dslInfos[0].VpVc.split('/')[0];
        var pecisco_vc = obj.dslInfos[0].VpVc.split('/')[1];
        menu_fin+='<br><br>PE Cisco : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=pecisco&pecisco='+encodeURIComponent(obj.pelns)+'&pecisco_vp='+encodeURIComponent(pecisco_vp)+'&pecisco_vc='+encodeURIComponent(pecisco_vc)+'">'+obj.pelns+'</a>';
      }
      else if(typeof obj.dslInfos[0].vpvc != 'undefined'){
        var pecisco_vp = obj.dslInfos[0].vpvc.split('/')[0];
        var pecisco_vc = obj.dslInfos[0].vpvc.split('/')[1];
        menu_fin+='<br><br>PE Cisco : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=pecisco&pecisco='+encodeURIComponent(obj.pelns)+'&pecisco_vp='+encodeURIComponent(pecisco_vp)+'&pecisco_vc='+encodeURIComponent(pecisco_vc)+'">'+obj.pelns+'</a>';
      }
    }
  }

  // if (Infra =='') {
  //   alert("possible new LPT");
  //   a priori que pour des terminaison sur PE Cisco ?
  // }




  // alert("Liens vers connexion BASse800");

  if (!(typeof BASse800_alias == 'undefined')){
    // BAS ATM
    if (!(typeof obj.dslInfos[0].bas == 'undefined')){
      var BAS_VPespaceVC = obj.dslInfos[0].basVpVc.replace('/',' ');
      menu_fin+='<br><br>BAS : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=BAS_ATM&BAS_ATM='+encodeURIComponent(obj.dslInfos[0].bas)+'&basslotport='+encodeURIComponent(obj.dslInfos[0].basSlotPort)+'&vpvc='+encodeURIComponent(BAS_VPespaceVC)+'">'+obj.dslInfos[0].bas+'</a>';
    }
    // BAS IP
    else {
      menu_fin+='<br><br>BAS SE800 : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=BAS_IP&BAS_IP='+encodeURIComponent(BASse800_alias)+'&login='+encodeURIComponent(obj.login)+'">'+BASse800_alias+'</a>';
    }
  }

  // Lien vers Connexion ATM

  if (!(typeof switch_atm_in == 'undefined')){

    //alert("switch IN");

    menu_fin+='<br><br>PP ATM IN &nbsp;&nbsp;&nbsp;&nbsp;: <a target=_blank href="'+GM_dossier+'CreationBat.php?action=ppatm&ppatm='+encodeURIComponent(switch_atm_in)+'&switch_atm_slot='+encodeURIComponent(switch_atm_in_slot)+'&switch_atm_port='+encodeURIComponent(switch_atm_in_port)+'&switch_atm_vp='+encodeURIComponent(switch_atm_in_vp)+'&switch_atm_vc='+encodeURIComponent(switch_atm_in_vc)+'">'+switch_atm_in+'</a>';
    menu_fin+='<br>PP ATM OUT : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=ppatm&ppatm='+encodeURIComponent(switch_atm_out)+'&switch_atm_slot='+encodeURIComponent(switch_atm_out_slot)+'&switch_atm_port='+encodeURIComponent(switch_atm_out_port)+'&switch_atm_vp='+encodeURIComponent(switch_atm_out_vp)+'&switch_atm_vc='+encodeURIComponent(switch_atm_out_vc)+'">'+switch_atm_out+'</a>';
  }

  // Lien vers Connexion DSLAM IP 5300

  if (!(typeof dslam5300_alias == 'undefined')){

  menu_fin+='<br><br>DSLAM IP 5300 : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=dslamip&dslamip='+encodeURIComponent(dslam5300_alias)+'&dslamIP_vlan='+encodeURIComponent(dslam5300_vlan)+'&dslamIP_slot='+encodeURIComponent(dslam5300_slot)+'&dslamIP_port='+encodeURIComponent(dslam5300_port)+'&typedslam=MA5300&do_it=nothing">'+dslam5300_alias+'</a>';
  menu_fin+=' - [ <a target=_blank href="'+GM_dossier+'CreationBat.php?action=dslamip&dslamip='+encodeURIComponent(dslam5300_alias)+'&dslamIP_vlan='+encodeURIComponent(dslam5300_vlan)+'&dslamIP_slot='+encodeURIComponent(dslam5300_slot)+'&dslamIP_port='+encodeURIComponent(dslam5300_port)+'&typedslam=MA5300&do_it=lock">Lock</a> ]';
  menu_fin+=' - [ <a target=_blank href="'+GM_dossier+'CreationBat.php?action=dslamip&dslamip='+encodeURIComponent(dslam5300_alias)+'&dslamIP_vlan='+encodeURIComponent(dslam5300_vlan)+'&dslamIP_slot='+encodeURIComponent(dslam5300_slot)+'&dslamIP_port='+encodeURIComponent(dslam5300_port)+'&typedslam=MA5300&do_it=reset">Reset</a> ]';


  // Lien vers Connexion Carte ISU derrier 5300
  if (!(typeof carteISU_alias == 'undefined')){

  menu_fin+='<br><br>ISU : '+carteISU_alias+'';
  menu_fin+='<br>CARTE ISU 14 : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=dslamip&dslamip='+encodeURIComponent(carteISU_14)+'&dslamIP_vlan='+encodeURIComponent(dslam5300_vlan)+'">'+carteISU_14+'</a>';
  menu_fin+='<br>CARTE ISU 15 : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=dslamip&dslamip='+encodeURIComponent(carteISU_15)+'&dslamIP_vlan='+encodeURIComponent(dslam5300_vlan)+'">'+carteISU_15+'</a>';
  }
  }

  // Lien vers Connexion DSLAM 5600T
  if (!(typeof dslam5600_alias == 'undefined')){

  menu_fin+='<br><br>DSLAM IP 5600T : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=dslamip&dslamip='+encodeURIComponent(dslam5600_alias)+'&dslamIP_vlan='+encodeURIComponent(dslam5600_vlan)+'&dslamIP_slot='+encodeURIComponent(dslam5600_slot)+'&dslamIP_port='+encodeURIComponent(dslam5600_port)+'&typedslam=MA5600T&do_it=nothing">'+dslam5600_alias+'</a>';
  menu_fin+=' - [ <a target=_blank href="'+GM_dossier+'CreationBat.php?action=dslamip&dslamip='+encodeURIComponent(dslam5600_alias)+'&dslamIP_vlan='+encodeURIComponent(dslam5600_vlan)+'&dslamIP_slot='+encodeURIComponent(dslam5600_slot)+'&dslamIP_port='+encodeURIComponent(dslam5600_port)+'&typedslam=MA5600T&do_it=lock">Lock</a> ]';
  menu_fin+=' - [ <a target=_blank href="'+GM_dossier+'CreationBat.php?action=dslamip&dslamip='+encodeURIComponent(dslam5600_alias)+'&dslamIP_vlan='+encodeURIComponent(dslam5600_vlan)+'&dslamIP_slot='+encodeURIComponent(dslam5600_slot)+'&dslamIP_port='+encodeURIComponent(dslam5600_port)+'&typedslam=MA5600T&do_it=reset">Reset</a> ]';


  // Lien vers Connexion Carte ISU 5300 - derriere 5600T
  if (!(typeof carteISU_alias == 'undefined')){

  menu_fin+='<br><br>ISU : '+carteISU_alias+'';
  menu_fin+='<br>CARTE ISU 14 : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=dslamip&dslamip='+encodeURIComponent(carteISU_14)+'&dslamIP_vlan='+encodeURIComponent(dslam5600_vlan)+'">'+carteISU_14+'</a>';
  menu_fin+='<br>CARTE ISU 15 : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=dslamip&dslamip='+encodeURIComponent(carteISU_15)+'&dslamIP_vlan='+encodeURIComponent(dslam5600_vlan)+'">'+carteISU_15+'</a>';
  }

  // // Lien vers Connexion BAS SE800 - derriere 5600T
  // En doublon ????
  // if (!(typeof BASse800_alias == 'undefined')){

  // menu_fin+='<br><br>BAS SE800 : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=BAS_IP&BAS_IP='+encodeURIComponent(BASse800_alias)+'&login='+encodeURIComponent(obj.login)+'">'+BASse800_alias+'</a>';
  // }

  }

  // Lien vers Connexion BAS SE1200 (derriere 5600T ou ISAM)

  if (!(typeof BASse1200_alias == 'undefined')){

  // test avec le remote-ID
  // var remoteID = ''+obj.ndiFT+'-'+obj.idLdcom+'';
  // menu_fin+='<br><br>BAS SE1200 : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=BAS_IP&BAS_IP='+encodeURIComponent(BASse1200_alias)+'&remoteID='+encodeURIComponent(remoteID)+'">'+BASse1200_alias+'</a>';

  menu_fin+='<br><br>BAS SE1200 : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=BAS_IP&BAS_IP='+encodeURIComponent(BASse1200_alias)+'&login='+encodeURIComponent(obj.login)+'">'+BASse1200_alias+'</a>';
  }

  //Lien vers Connexion BAS SE100 (derriere 5600T)

  if (!(typeof BASse100_alias == 'undefined')){

  menu_fin+='<br><br>BAS SE1200 : <a target=_blank href="'+GM_dossier+'CreationBat.php?action=BAS_IP&BAS_IP='+encodeURIComponent(BASse100_alias)+'&login='+encodeURIComponent(obj.login)+'">'+BASse100_alias+'</a>';
  }

  if (typeof obj.login != 'undefined' && obj.login != ''){
  menu_fin+='<br><br>Syslog  : [ <a title="'+obj.login+'" target=_blank href="'+GM_dossier+'CreationBat.php?action=rad-ent&login='+ encodeURIComponent(obj.login)+'">rad-ent</a> ]';
  menu_fin+=' - [ <a title="'+obj.login+'" target=_blank href="'+GM_dossier+'CreationBat.php?action=prx-cpe&login='+ encodeURIComponent(obj.login)+'">prx-cpe</a> ]';
    menu_fin+='<br>Radius Administration : <a title="'+obj.login+'" target=_blank href="http://rad-ent-vel1.rent.n9uf.net/adminradius/acceuil.php?action=attuser&usr='+obj.login+'">Radius Web Interface</a>';
  }


  MEP_Bloc_Technique();
  //Launch_Conf_et_CVS(); // Lancé avant pour aller plus vite
  MEP_conf_CVS();  // surimpression

  Outils_SAV(); 
  Outils_Barre_STC(); // normalement lancé en dernier

  if (Infra != 'thd') {Launch_Info_DSL();} // pour les DSLE trop rapide :)
}


function Launch_Conf_et_CVS() {

  //alert("conf et vcs");
  //alert(hostnameCPE);

  GM_xmlhttpRequest({
     method: "GET",
     url: 'http://10.92.252.131:8080/SupCPE/infos_cpe.php?cpe='+hostnameCPE+'&master_id='+obj.masterID+'',
     //onprogress: function(response) { alert('on progress CPE'); },
     onload: function(response) { 
      var codeHTML = '<div>'+response.responseText+'</div>';
      
      //alert('dans conf et CVS'+hostnameCPE);

      var nbr_tfoot = 0;
      var nbr_tfoot_a = 0;
      var nbr_bloc_tbody = 0;

      // alert("in");

      nbr_tfoot = $(codeHTML).find('#informations_cpe tfoot').size();
      nbr_tfoot_a = $(codeHTML).find('#informations_cpe tfoot a').size();

      nbr_bloc_tbody = $(codeHTML).find('#informations_cpe div table tbody').size();

      // alert("nbr_tfoot "+nbr_tfoot);
      // alert("nbr_tfoot_a "+nbr_tfoot_a);
      // alert("nbr_bloc_tbody "+nbr_bloc_tbody);

      //alert(nbr_tfoot_a/2);

      if (nbr_tfoot_a%2 != 0) {
        nbr_tfoot_a = nbr_tfoot_a + 1 ;
      };

      if (nbr_bloc_tbody%2 != 0) {
        nbr_bloc_tbody = nbr_bloc_tbody +1 ;
      };

      //on compte les blocs, donc les CPE

      if ($(codeHTML).find('#informations_cpe tfoot').size() > 1) {
        //alert("2 CPE");

        var URL_CVS_CPE_A = $(codeHTML).find('#informations_cpe tfoot a').eq(0).attr('href');
        //var URL_CVS_CPE_A = $(codeHTML).find('#informations_cpe a span').eq(0).html();
        var url_formatee_A = ''+URL_CVS_CPE_A+'';
        
        var URL_CVS_CPE_P = $(codeHTML).find('#informations_cpe tfoot a').eq(nbr_tfoot_a/2).attr('href');
        var url_formatee_P = ''+URL_CVS_CPE_P+'';



        var hostname_CPE_A = $(codeHTML).find('#informations_cpe tbody tr td').eq(3).text();
        var IP_CPE_A = $(codeHTML).find('#informations_cpe tbody tr td').eq(5).text();
        var Marque_CPE_A = $(codeHTML).find('#informations_cpe tbody tr td').eq(7).text();
        var serial_CPE_A = $(codeHTML).find('#informations_cpe tbody tr td').eq(21).text();
        var ID_CPE_A = $(codeHTML).find('#informations_cpe tbody tr td').eq(23).text();

        var hostname_CPE_P = $(codeHTML).find('#informations_cpe div table tbody').eq(nbr_bloc_tbody/2).find('tr td').eq(3).text();
        var IP_CPE_P = $(codeHTML).find('#informations_cpe div table tbody').eq(nbr_bloc_tbody/2).find('tr td').eq(5).text();
        var Marque_CPE_P = $(codeHTML).find('#informations_cpe div table tbody').eq(nbr_bloc_tbody/2).find('tr td').eq(7).text();
        var serial_CPE_P = $(codeHTML).find('#informations_cpe div table tbody').eq(nbr_bloc_tbody/2).find('tr td').eq(21).text();
        var ID_CPE_P = $(codeHTML).find('#informations_cpe div table tbody').eq(nbr_bloc_tbody/2).find('tr td').eq(23).text();

        
      
        
        GM_xmlhttpRequest({
          method: "GET",
          url: url_formatee_A,
          onload: function(response) { 
            var codeHTMLduCVS_A = '<div>'+response.responseText+'</div>';
            var URL_CONF_CPE = $(codeHTMLduCVS_A).find('a').eq(9).attr('href');
            
            URL_CONF_CPE_formatee = URL_CONF_CPE.substring(URL_CONF_CPE.indexOf("?"));
            
            menu_conf_CPE_A += 'Conf :';
            menu_conf_CPE_A += ' <a target=_blank href="'+url_formatee_A+'">CVS</a>';
            menu_conf_CPE_A += ' - <a target=_blank href="'+url_formatee_A+''+URL_CONF_CPE_formatee+'">Last Rev</a>';
            
            var lien_conf_CPE_A = url_formatee_A+URL_CONF_CPE_formatee ;
            
            GM_xmlhttpRequest({
            method: "GET",
            url: url_formatee_P,
              onload: function(response) { 
                var codeHTMLduCVS_P = '<div>'+response.responseText+'</div>';
                var URL_CONF_CPE = $(codeHTMLduCVS_P).find('a').eq(9).attr('href');
                
                URL_CONF_CPE_formatee = URL_CONF_CPE.substring(URL_CONF_CPE.indexOf("?"));
                
                menu_conf_CPE_P += 'Conf :';
                menu_conf_CPE_P += ' <a target=_blank href="'+url_formatee_P+'">CVS</a>';
                menu_conf_CPE_P += ' - <a target=_blank href="'+url_formatee_P+''+URL_CONF_CPE_formatee+'">Last Rev</a>';


                var lien_conf_CPE_P = url_formatee_P+URL_CONF_CPE_formatee ;

                // if (Marque_CPE_A == 'ONE_ACCESS') {Marque_CPE_A = 'ONEACCESS'; }
                // if (Marque_CPE_P == 'ONE_ACCESS') {Marque_CPE_P = 'ONEACCESS'; }

                // var lien_cliquable_CPE_A = '<a target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+IP_CPE_A+'&typeCPE='+Marque_CPE_A+'&typeOffre='+Nom_OFFRE+'" title="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+IP_CPE_A+'&typeCPE='+Marque_CPE_A+'&typeOffre='+Nom_OFFRE+'">'+IP_CPE_A+'</a>';
                // var lien_cliquable_CPE_P = '<a target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+IP_CPE_P+'&typeCPE='+Marque_CPE_P+'&typeOffre='+Nom_OFFRE+'">'+IP_CPE_P+'</a>';

                var SAV_CPE_A = '';
                var SAV_CPE_P = '';


                SAV_CPE_A += '<br>Nom du CPE A : '+hostname_CPE_A;
                SAV_CPE_A += '<br>Adresse IP CPE A : '+IP_CPE_A;
                // SAV_CPE_A += '<br>Adresse IP CPE A : '+lien_cliquable_CPE_A;
                SAV_CPE_A += '<br>Marque CPE A : '+Marque_CPE_A;
                SAV_CPE_A += '<br>Numéro de série CPE A :'+serial_CPE_A;
                SAV_CPE_A += '<br>Product ID  CPE A : '+ID_CPE_A;
                SAV_CPE_Barre_STC = SAV_CPE_A;
                SAV_CPE_A += '<br>Conf CPE A : '+lien_conf_CPE_A;
                SAV_CPE_P += '<br>';
                SAV_CPE_P += '<br>Nom du CPE P : '+hostname_CPE_P;
                SAV_CPE_P += '<br>Adresse IP CPE P : '+IP_CPE_P;
                // SAV_CPE += '<br>Adresse IP CPE P : '+lien_cliquable_CPE_P;
                SAV_CPE_P += '<br>Marque CPE P : '+Marque_CPE_P;
                SAV_CPE_P += '<br>Numéro de série CPE P : '+serial_CPE_P;
                SAV_CPE_P += '<br>Product ID  CPE P : '+ID_CPE_P;
                SAV_CPE_Barre_STC += SAV_CPE_P;
                SAV_CPE_P += '<br>Conf CPE P : '+lien_conf_CPE_P;

                SAV_CPE = SAV_CPE_A+SAV_CPE_P;

                Outils_SAV(); 
                Outils_Barre_STC(); 
                
                //lancé aussi à la fin du bloc technique
                MEP_conf_CVS();
              }
            });
          }
        });
      }
      else if ($(codeHTML).find('#informations_cpe a').size() > 0){
        //alert("1 CPE");
        var URL_CVS_CPE = $(codeHTML).find('#informations_cpe a').eq(0).attr('href');

        var url_formatee = ''+URL_CVS_CPE+'';

        var hostname_CPE = $(codeHTML).find('#informations_cpe tbody tr td').eq(3).text();
        var IP_CPE = $(codeHTML).find('#informations_cpe tbody tr td').eq(5).text();
        Marque_CPE = $(codeHTML).find('#informations_cpe tbody tr td').eq(7).text();
        var serial_CPE = $(codeHTML).find('#informations_cpe tbody tr td').eq(21).text();
        var ID_CPE = $(codeHTML).find('#informations_cpe tbody tr td').eq(23).text();
        
        GM_xmlhttpRequest({
          method: "GET",
          url: url_formatee,
          onload: function(response) { 
            var codeHTMLduCVS = '<div>'+response.responseText+'</div>';
            var URL_CONF_CPE = $(codeHTMLduCVS).find('a').eq(9).attr('href');
            
            URL_CONF_CPE_formatee = URL_CONF_CPE.substring(URL_CONF_CPE.indexOf("?"));
            
            menu_conf_CPE_A += 'Conf :';
            menu_conf_CPE_A += ' <a target=_blank href='+url_formatee+'>CVS</a>';
            menu_conf_CPE_A += ' - <a target=_blank href="'+url_formatee+''+URL_CONF_CPE_formatee+'">Last Rev</a>';

            var lien_conf_CPE = url_formatee+URL_CONF_CPE_formatee ;

            if (Marque_CPE == 'ONE_ACCESS') {Marque_CPE = 'ONEACCESS'; }
            var lien_cliquable_CPE_A = '<a target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+IP_CPE+'&typeCPE='+Marque_CPE+'&typeOffre='+Nom_OFFRE+'">'+IP_CPE+'</a>';
            

            SAV_CPE += '<br>Nom du CPE : '+hostname_CPE;
            SAV_CPE += '<br>Adresse IP : '+IP_CPE;
            // SAV_CPE += '<br>Adresse IP : '+lien_cliquable_CPE_A;
            SAV_CPE += '<br>Marque CPE : '+Marque_CPE;
            SAV_CPE += '<br>Numéro de série : '+serial_CPE;
            SAV_CPE += '<br>Product ID : '+ID_CPE;
            SAV_CPE_Barre_STC = SAV_CPE;
            SAV_CPE += '<br>Conf CPE : '+lien_conf_CPE;

            Outils_SAV(); 
            Outils_Barre_STC(); 

            //lancé aussi à la fin du bloc technique
            MEP_conf_CVS();
          }
        });
      }
      else {
        //alert('pas de CPE trouvée');

        menu_conf_CPE_A += ' pas de conf trouvée';

        SAV_CPE = '<br>Pas d Info CPE retrouvée';
        SAV_CPE_Barre_STC = '<br>Pas d Info CPE retrouvée';

        Outils_SAV(); 
        Outils_Barre_STC(); 

      }
    }
  });
}


function Launch_Conf_et_CVS_CPE_L3(hostname, num_cpe) {

  var menu_conf_CPE_THD = '';

  var fin_hostname = hostname.substr(hostname.length-2);

  if (fin_hostname == '_P') {
    //alert("routeur P");
    GM_xmlhttpRequest({
     method: "GET",
     url: 'http://10.92.252.131:8080/SupCPE/infos_cpe.php?cpe='+hostname+'&master_id='+obj.masterID+'',
     //onprogress: function(response) { alert('on progress CPE'); },
     onload: function(response) { 
        var codeHTML = '<div>'+response.responseText+'</div>';

        var nbr_tfoot = 0;
        var nbr_tfoot_a = 0;
        var nbr_bloc_tbody = 0;


        nbr_tfoot = $(codeHTML).find('#informations_cpe tfoot').size();
        nbr_tfoot_a = $(codeHTML).find('#informations_cpe tfoot a').size();

        nbr_bloc_tbody = $(codeHTML).find('#informations_cpe div table tbody').size();

        if (nbr_tfoot_a%2 != 0) {
          nbr_tfoot_a = nbr_tfoot_a + 1 ;
        };

        if (nbr_bloc_tbody%2 != 0) {
          nbr_bloc_tbody = nbr_bloc_tbody +1 ;
        };




        var hostname_CPE = $(codeHTML).find('#informations_cpe div table tbody').eq(nbr_bloc_tbody/2).find('tr td').eq(3).text();
        var IP_CPE = $(codeHTML).find('#informations_cpe div table tbody').eq(nbr_bloc_tbody/2).find('tr td').eq(5).text();
        var Marque_CPE = $(codeHTML).find('#informations_cpe div table tbody').eq(nbr_bloc_tbody/2).find('tr td').eq(7).text();
        // var serial_CPE = $(codeHTML).find('#informations_cpe div table tbody').eq(nbr_bloc_tbody/2).find('tr td').eq(21).text();
        var ID_CPE = $(codeHTML).find('#informations_cpe div table tbody').eq(nbr_bloc_tbody/2).find('tr td').eq(23).text();

        if ($(codeHTML).find('#informations_cpe a').size() > 0){


        var URL_CVS_CPE = $(codeHTML).find('#informations_cpe tfoot a').eq(nbr_tfoot_a/2).attr('href');
        var url_formatee = ''+URL_CVS_CPE+'';

          GM_xmlhttpRequest({
            method: "GET",
            url: url_formatee,
            onload: function(response) { 
              var codeHTMLduCVS = '<div>'+response.responseText+'</div>';
              var URL_CONF_CPE = $(codeHTMLduCVS).find('a').eq(9).attr('href');

              
              URL_CONF_CPE_formatee = URL_CONF_CPE.substring(URL_CONF_CPE.indexOf("?"));
              
              menu_conf_CPE_THD += 'Conf :';
              menu_conf_CPE_THD += ' <a target=_blank href='+url_formatee+'>CVS</a>';
              menu_conf_CPE_THD += ' - <a target=_blank href="'+url_formatee+''+URL_CONF_CPE_formatee+'">Last Rev</a>';

              var lien_conf_CPE_L3 = url_formatee+URL_CONF_CPE_formatee ;

              SAV_CPE_Tab[num_cpe] = '<br><br>Nom du CPE : '+hostname_CPE;
              SAV_CPE_Tab[num_cpe] += '<br>Adresse IP : '+IP_CPE;
              SAV_CPE_Tab[num_cpe] += '<br>Marque CPE : '+Marque_CPE;
              // SAV_CPE_Tab[num_cpe] += '<br>Numéro de série : '+serial_CPE;
              SAV_CPE_Tab[num_cpe] += '<br>Product ID : '+ID_CPE;
              SAV_CPE_Barre_STC_Tab[num_cpe] = SAV_CPE_Tab[num_cpe];
              SAV_CPE_Tab[num_cpe] += '<br>Conf CPE : '+lien_conf_CPE_L3;

              Nbr_CPE_count = Nbr_CPE_count-1;
              if(Nbr_CPE_count == 0) {SAV_CPE_L2L3 ='OK le compte est bon'; Outils_SAV(); Outils_Barre_STC(); }

              //lancé aussi à la fin du bloc technique
              MEP_conf_CVS_CPE_L3(menu_conf_CPE_THD,num_cpe);
            }
          });
        }
        else {
          //alert('pas de CPE trouvée');

          menu_conf_CPE_THD += ' pas de conf trouvée';

          SAV_CPE = '<br>Pas d Info CPE retrouvée';
          SAV_CPE_Barre_STC = '<br>Pas d Info CPE retrouvée';

          Outils_SAV(); 
          Outils_Barre_STC(); 
        }
      }
    })
  }
  else {
    // alert("les autres CPE => A et HW L2"):
    GM_xmlhttpRequest({
     method: "GET",
     url: 'http://10.92.252.131:8080/SupCPE/infos_cpe.php?cpe='+hostname+'&master_id='+obj.masterID+'',
     //onprogress: function(response) { alert('on progress CPE'); },
     onload: function(response) { 
        var codeHTML = '<div>'+response.responseText+'</div>';

        var hostname_CPE = $(codeHTML).find('#informations_cpe tbody tr td').eq(3).text();
        var IP_CPE = $(codeHTML).find('#informations_cpe tbody tr td').eq(5).text();
        var Marque_CPE = $(codeHTML).find('#informations_cpe tbody tr td').eq(7).text();
        //var serial_CPE = $(codeHTML).find('#informations_cpe tbody tr td').eq(21).text();
        var ID_CPE = $(codeHTML).find('#informations_cpe tbody tr td').eq(23).text();
        

        if ($(codeHTML).find('#informations_cpe a').size() > 0){
          //alert("1 CPE");
          var URL_CVS_CPE = $(codeHTML).find('#informations_cpe a').eq(0).attr('href');

          var url_formatee = ''+URL_CVS_CPE+'';

          GM_xmlhttpRequest({
            method: "GET",
            url: url_formatee,
            onload: function(response) { 
              var codeHTMLduCVS = '<div>'+response.responseText+'</div>';
              var URL_CONF_CPE = $(codeHTMLduCVS).find('a').eq(9).attr('href');

              
              URL_CONF_CPE_formatee = URL_CONF_CPE.substring(URL_CONF_CPE.indexOf("?"));
              
              menu_conf_CPE_THD += 'Conf :';
              menu_conf_CPE_THD += ' <a target=_blank href='+url_formatee+'>CVS</a>';
              menu_conf_CPE_THD += ' - <a target=_blank href="'+url_formatee+''+URL_CONF_CPE_formatee+'">Last Rev</a>';

              var lien_conf_CPE_L3 = url_formatee+URL_CONF_CPE_formatee ;

              SAV_CPE_Tab[num_cpe] = '<br><br>Nom du CPE : '+hostname_CPE;
              SAV_CPE_Tab[num_cpe] += '<br>Adresse IP : '+IP_CPE;
              SAV_CPE_Tab[num_cpe] += '<br>Marque CPE : '+Marque_CPE;
              // SAV_CPE_Tab[num_cpe] += '<br>Numéro de série : '+serial_CPE;
              SAV_CPE_Tab[num_cpe] += '<br>Product ID : '+ID_CPE;
              SAV_CPE_Barre_STC_Tab[num_cpe] = SAV_CPE_Tab[num_cpe];
              SAV_CPE_Tab[num_cpe] += '<br>Conf CPE : '+lien_conf_CPE_L3;

              Nbr_CPE_count = Nbr_CPE_count-1;
              if(Nbr_CPE_count == 0) {SAV_CPE_L2L3 ='OK le compte est bon'; Outils_SAV(); Outils_Barre_STC(); }

              //lancé aussi à la fin du bloc technique
              MEP_conf_CVS_CPE_L3(menu_conf_CPE_THD,num_cpe);
            }
          });
        }
        else {
          //alert('pas de CPE trouvée');

          menu_conf_CPE_THD += ' pas de conf trouvée';

          SAV_CPE = '<br>Pas d Info CPE retrouvée';
          SAV_CPE_Barre_STC = '<br>Pas d Info CPE retrouvée';

          Outils_SAV(); 
          Outils_Barre_STC(); 
        }
      }
    })
  }
}

function Launch_Entete_Service() {

  var compteur = 0;

  if (Nom_OFFRE=='9iPnet'){ Nom_OFFRE_URL = '9+IP+NET';}
  else if (Nom_OFFRE=='9connect'){ Nom_OFFRE_URL = '9+CONNECT';}

  GM_xmlhttpRequest({
    method: "GET",
    url: 'http://10.92.252.131:8080/reporting/supstat/sites_cpe.php?gid_client='+ID_Societe+'&offre='+Nom_OFFRE_URL,
    onload: function(response2) {
      var codeHTML_listing_VPN = '<div>'+response2.responseText+'</div>';
      var compteur = 0;
      
      menu_debut_1 += 'Infos sur les sites '+Nom_OFFRE+' <hr>';
      menu_debut_1 += '<br>Accès au <a target=_blank href="http://10.92.252.131:8080/reporting/supstat/sites_cpe.php?gid_client='+ID_Societe+'&offre='+Nom_OFFRE_URL+'">Reporting du '+Nom_OFFRE+'</a>';


      menu_tableau += '<div id= tableauSiteVPN class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';
      
      $(codeHTML_listing_VPN).find("#tab-resultat tbody tr").each(function(){
        compteur = compteur+1;
        menu_tableau += '<tr>';
        menu_tableau += '<td>'+$(this).find("td").eq(5).text()+'</td>';
        menu_tableau += '<td>'+$(this).find("td").eq(7).text()+'</td>';
        menu_tableau += '<td>'+$(this).find("td").eq(6).text()+'</td>';
        //menu_tableau += '<td>'+$(this).find("td").eq(8).text()+'</td>';
        menu_tableau += '<td><a target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+$(this).find("td").eq(8).text()+'&typeCPE=CISCO&typeOffre='+Nom_OFFRE+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+$(this).find("td").eq(8).text()+'</a></td>';
        menu_tableau += '</tr>';
      });
      
      menu_tableau += '</table></div>';
              
      menu_popup_1 += '<br> <a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauSiteVPN\',headingText:\'Listing des Sites '+Nom_OFFRE+' Raccrochés à l ID société\'});" href="#" style="cursor: pointer;" class=" ">Liste des Sites du '+Nom_OFFRE+' ('+compteur+')</a>';

      
      MEP_listing_Site();
    }
  });

  // menu_debut_1 += 'Infos sur les sites '+Nom_OFFRE+' <hr>';
  // menu_debut_1 += '<br>Accès au <a target=_blank href="http://10.92.252.131:8080/reporting/supstat/sites_cpe.php?gid_client='+ID_Societe+'&offre='+Nom_OFFRE_URL+'">Reporting du '+Nom_OFFRE+'</a>';      
  // menu_popup_1 += '<br> <a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauSiteVPN\',headingText:\'Listing des Sites '+Nom_OFFRE+' Raccrochés à l ID société\'});" href="#" style="cursor: pointer;" class=" ">Liste des Sites du '+Nom_OFFRE+' ('+compteur+')</a>';

  
  // MEP_listing_Site();
}


function Launch_Listing_Service_et_Stats() {
   
  GM_xmlhttpRequest({
    method: "GET",
    url: 'http://10.92.252.131:8080/reporting/supstat/clients.php?gid_client='+ID_Societe,
    onload: function(response) {
      var codeHTML_sID = '<div>'+response.responseText+'</div>';

      // Listing Services

      var nrb_services = 0 ;
      var tab_services = new Array;
      var fin_url_service ='';

      menu_popup = 'Listing Service du Client <hr>'

      $(codeHTML_sID).find("#tab-resultat tbody tr").each(function(){
        var nom_du_service = $(this).find("td").eq(4).text();
        
        fin_url_service = $(this).find("td a").eq(1).attr('href');

        tab_services[nrb_services] = fin_url_service ;

        // menu_popup += '<br> <a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauService'+nrb_services+'\',headingText:\'Listing des Sites Raccrochés à l ID société\'});" href="#" style="cursor: pointer;" class=" ">Liste des Sites du '+nom_du_service+' ('+compteur+')</a>';
        menu_popup += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauService'+nrb_services+'\',headingText:\'Listing des Sites '+nom_du_service+' Raccrochés à l ID société\'});" href="#" style="cursor: pointer;" class=" ">Liste des Sites du '+nom_du_service+'</a><br>';

        nrb_services = nrb_services+1 ;

      });
      
      for (var i = 0 ; i < tab_services.length ; i++) {
        Generation_Div_Services(i,tab_services);
        // alert(tab_services[i]);
      }

      MEP_listing_Service();


      // Acces aux Stats

      var url_stats = '';
      var url_stats_onclick = '';
      var url_stats_onclick_formatee = '';

      var Nom_OFFRE_formatee = Nom_OFFRE;
      
      if (Nom_OFFRE=='9iPnet'){ Nom_OFFRE_formatee = '9 IP NET';}
      else if (Nom_OFFRE=='9IPNET'){ Nom_OFFRE_formatee = '9 IP NET';}
      else if (Nom_OFFRE=='9connect'){ Nom_OFFRE_formatee = '9 CONNECT';}
      else if (Nom_OFFRE=='9CONNECT'){ Nom_OFFRE_formatee = '9 CONNECT';}
      else if (Nom_OFFRE=='9Connect'){ Nom_OFFRE_formatee = '9 CONNECT';}

      
      $(codeHTML_sID).find("#tab-resultat tbody tr").each(function(){
        if (Nom_OFFRE_formatee==$(this).find("td").eq(4).text()){
          url_stats_onclick = $(this).find("td a").eq(0).attr('onclick');
        }
      });
      
      url_stats = $(codeHTML_sID).find('#tab-resultat tbody tr td').eq(0).html();
      //var url_stats_onclick = $(codeHTML_sID).find('#tab-resultat tbody tr td a').eq(0).attr('onclick'); //avant l'affinage => donc premier ligne du tableau
      
      url_stats_onclick_formatee = '"'+url_stats_onclick+'"';
      url_stats_onclick_formatee = url_stats_onclick_formatee.substr(51);
      url_stats_onclick_formatee = url_stats_onclick_formatee.substring(0,url_stats_onclick_formatee.indexOf("\""));
      
      menu_fin_1 += '<br>&nbsp&nbsp&nbsp <a target=_blank href="'+url_stats_onclick_formatee+'">Accès aux statistiques de l extranet client</a>';
      menu_fin_1 += '<br><a target=_blank href="http://10.102.233.34/Mercure/stat.php?url='+encodeURIComponent(url_stats_onclick_formatee)+'&site='+Nom_Site+'">Link vers mercure</a>';

      Mercures(url_stats_onclick_formatee);
              
      MEP_listing_Site();
    }
  });
}


function Launch_Info_DSL() {

  //alert("Launch_Info_DSL");

  // if (obj.dslInfos[0].option == 1) {

  if (obj.isTDSL != 1 && Nom_OFFRE.substring(0,3) != "LPT") { // Lien en Option 1
    
    GM_xmlhttpRequest({
      method: "GET",
      // url: 'http://nr0u0086.cbv.ldcom.ld:8083/pegase/admin/infos_refpase.jsp?ndi='+ID_LDCOM+'&submit=Rechercher',
      url: 'http://w4hermes.prod.neufcegetel.ld:8083/pegase/admin/infos_refpase.jsp?ndi='+ID_LDCOM+'&submit=Rechercher',
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

        //alert(obj.nomRessource);
        // recherche dans le JSON
        var codeOffreDSL = obj.nomRessource.split('-')[1]+"-"+obj.nomRessource.split('-')[2]+"-"+obj.nomRessource.split('-')[3];
        
        // ou dans le code source de la page
        // var tempo = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody tr td").eq(9).text();
        // var codeOffreDSL = tempo.substring(tempo.indexOf("(")+1,tempo.indexOf(")"));

        menu_info_DSL_code_offre += '<br>'+tableauOffreDSL[codeOffreDSL];

        menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
        menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';

        MEP_info_DSL();

        SAV_Offre += '<br>';
        SAV_Offre += ID_LDCOM+' - '+codeOffreDSL;
        SAV_Offre += '<br>';
        SAV_Offre += tableauOffreDSL[codeOffreDSL];
        SAV_Offre += '<br>';

        Outils_SAV(); 
        Outils_Barre_STC();
        MEP_SAV();

      },

      onload: function(response5) { 
        var codeHTML_5 = '<div>'+response5.responseText+'</div>';
        var menu_info_DSL_brute ='';

        menu_info_DSL_N2 += 'Info DSL <hr>';


        $(codeHTML_5).find("tbody").eq(3).find("tr").each(function(){
          var temp_td = $(this).find("td").eq(9).text();
          var temp_ndi = temp_td.split(';')[100];
          // alert(temp_td);
          // alert(temp_ndi);          
           if ( temp_ndi != null && temp_ndi != '' ) {
           //if (temp_ndi != null && temp_ndi.match(/[0-9][0-9]/)) {  
            menu_info_DSL_brute = temp_td ;
          };
        });

        //menu_info_DSL_brute = $(codeHTML_5).find("tbody").eq(3).find("tr").last().find("td").eq(9).text();

        if (menu_info_DSL_brute =='') {  // pas d'info retrouvé sur les NDi

          menu_info_DSL_N2 += '<div id= tableauInfoDSL class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';
          menu_info_DSL += '<br>Aucune Info sur la ligne retrouvée dans REFPASE<br>';

          menu_info_DSL_N2 += menu_info_DSL;
          menu_info_DSL_Barre_STC = menu_info_DSL;

          SAV_DSLE += '<br>Aucune Info sur le ligne retrouvée dans REFPASE<br>';
          Outils_SAV(); 
          Outils_Barre_STC();

        }

        else {  // info OK dans Refpase

          var info_DSL_NDI = menu_info_DSL_brute.split(';')[100];
          var info_DSL_calibre_longueur = menu_info_DSL_brute.split(';')[102];
          var info_DSL_TETE = menu_info_DSL_brute.split(';')[107];
          var info_DSL_Amorce = menu_info_DSL_brute.split(';')[108];
          var info_DSL_Paire = menu_info_DSL_brute.split(';')[109];
          var info_DSL_Plot = menu_info_DSL_brute.split(';')[14];

          // alert(menu_info_DSL_brute.split(';')[100]);

          var info_DSL_Code_URA = menu_info_DSL_brute.split(';')[104].substr(0,2)+menu_info_DSL_brute.split(';')[103];
          if (info_DSL_Code_URA == '') {info_DSL_Code_URA = 'NC';}

          
          menu_info_DSL_N2 += '<div id= tableauInfoDSL class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';

          if (typeof info_DSL_NDI.split('#')[3] != 'undefined') {  //  QuadriPaire
            //alert("quadripaire"); 

            var info_DSL_NDI_1 = info_DSL_NDI.split('#')[0];
            var info_DSL_calibre_longueur_1 = info_DSL_calibre_longueur.split('#')[0];
            var info_DSL_TETE_1 = info_DSL_TETE.split('#')[0];
            var info_DSL_Amorce_1 = info_DSL_Amorce.split('#')[0];
            var info_DSL_Paire_1 = info_DSL_Paire.split('#')[0];
            var info_DSL_Plot_1 = info_DSL_Plot.split('#')[0];

            var info_DSL_NDI_2 = info_DSL_NDI.split('#')[1];
            var info_DSL_calibre_longueur_2 = info_DSL_calibre_longueur.split('#')[1];
            var info_DSL_TETE_2 = info_DSL_TETE.split('#')[1];
            var info_DSL_Amorce_2 = info_DSL_Amorce.split('#')[1];
            var info_DSL_Paire_2 = info_DSL_Paire.split('#')[1];
            var info_DSL_Plot_2 = info_DSL_Plot.split('#')[1];

            var info_DSL_NDI_3 = info_DSL_NDI.split('#')[2];
            var info_DSL_calibre_longueur_3 = info_DSL_calibre_longueur.split('#')[2];
            var info_DSL_TETE_3 = info_DSL_TETE.split('#')[2];
            var info_DSL_Amorce_3 = info_DSL_Amorce.split('#')[2];
            var info_DSL_Paire_3 = info_DSL_Paire.split('#')[2];
            var info_DSL_Plot_3 = info_DSL_Plot.split('#')[2];

            var info_DSL_NDI_4 = info_DSL_NDI.split('#')[3];
            var info_DSL_calibre_longueur_4 = info_DSL_calibre_longueur.split('#')[3];
            var info_DSL_TETE_4 = info_DSL_TETE.split('#')[3];
            var info_DSL_Amorce_4 = info_DSL_Amorce.split('#')[3];
            var info_DSL_Paire_4 = info_DSL_Paire.split('#')[3];
            var info_DSL_Plot_4 = info_DSL_Plot.split('#')[3];



            menu_info_DSL += '<tr><td>ADV FT - 0810 022 421</td></tr>';

            menu_info_DSL += '<tr><td>CODE URA</td>';
              menu_info_DSL +='<td>'+info_DSL_Code_URA+'</td>';
            menu_info_DSL += '</tr>';   

            menu_info_DSL += '<tr></tr>';

            menu_info_DSL += '<tr><td>NDI construit</td>';
              menu_info_DSL +='<td>'+info_DSL_NDI_1+'</td><td>'+info_DSL_NDI_2+'</td><td>'+info_DSL_NDI_3+'</td><td>'+info_DSL_NDI_4+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Calibre et longueur</td>';
              menu_info_DSL +='<td>'+info_DSL_calibre_longueur_1+'</td><td>'+info_DSL_calibre_longueur_2+'</td><td>'+info_DSL_calibre_longueur_3+'</td><td>'+info_DSL_calibre_longueur_4+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Tete FT</td>';
              menu_info_DSL +='<td>'+info_DSL_TETE_1+'</td><td>'+info_DSL_TETE_2+'</td><td>'+info_DSL_TETE_3+'</td><td>'+info_DSL_TETE_4+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Amorce</td>';
              menu_info_DSL +='<td>'+info_DSL_Amorce_1+'</td><td>'+info_DSL_Amorce_2+'</td><td>'+info_DSL_Amorce_3+'</td><td>'+info_DSL_Amorce_4+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Paire</td>';
              menu_info_DSL +='<td>'+info_DSL_Paire_1+'</td><td>'+info_DSL_Paire_2+'</td><td>'+info_DSL_Paire_3+'</td><td>'+info_DSL_Paire_4+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Plot DSLAM</td>';
              menu_info_DSL +='<td>'+info_DSL_Plot_1+'</td><td>'+info_DSL_Plot_2+'</td><td>'+info_DSL_Plot_3+'</td><td>'+info_DSL_Plot_4+'</td>';
              menu_info_DSL += '</tr>';


            SAV_NDI += '<br>NDI construit : '+info_DSL_NDI_1;
            SAV_NDI += '<br>Plot DSLAM : '+info_DSL_Plot_1;
            SAV_NDI += '<br>Calibre et longueur : '+info_DSL_calibre_longueur_1;
            SAV_NDI += '<br>Constitution : '+info_DSL_TETE_1+' '+info_DSL_Amorce_1+' '+info_DSL_Paire_1;
            SAV_NDI += '<br>';
            SAV_NDI += '<br>NDI construit : '+info_DSL_NDI_2;
            SAV_NDI += '<br>Plot DSLAM : '+info_DSL_Plot_2;
            SAV_NDI += '<br>Calibre et longueur : '+info_DSL_calibre_longueur_2;
            SAV_NDI += '<br>Constitution : '+info_DSL_TETE_2+' '+info_DSL_Amorce_2+' '+info_DSL_Paire_2;
            SAV_NDI += '<br>';
            SAV_NDI += '<br>NDI construit : '+info_DSL_NDI_3;
            SAV_NDI += '<br>Plot DSLAM : '+info_DSL_Plot_3;
            SAV_NDI += '<br>Calibre et longueur : '+info_DSL_calibre_longueur_3;
            SAV_NDI += '<br>Constitution : '+info_DSL_TETE_3+' '+info_DSL_Amorce_3+' '+info_DSL_Paire_3;
            SAV_NDI += '<br>';
            SAV_NDI += '<br>NDI construit : '+info_DSL_NDI_4;
            SAV_NDI += '<br>Plot DSLAM : '+info_DSL_Plot_4;
            SAV_NDI += '<br>Calibre et longueur : '+info_DSL_calibre_longueur_4;
            SAV_NDI += '<br>Constitution : '+info_DSL_TETE_4+' '+info_DSL_Amorce_4+' '+info_DSL_Paire_4;
            SAV_NDI += '<br>';

            Outils_SAV(); 
            Outils_Barre_STC();  
          }

          else if (typeof info_DSL_NDI.split('#')[1] != 'undefined') {  // BiPaire
            //alert("bipaire"); 

            var info_DSL_NDI_1 = info_DSL_NDI.split('#')[0];
            var info_DSL_calibre_longueur_1 = info_DSL_calibre_longueur.split('#')[0];
            var info_DSL_TETE_1 = info_DSL_TETE.split('#')[0];
            var info_DSL_Amorce_1 = info_DSL_Amorce.split('#')[0];
            var info_DSL_Paire_1 = info_DSL_Paire.split('#')[0];
            var info_DSL_Plot_1 = info_DSL_Plot.split('#')[0];

            var info_DSL_NDI_2 = info_DSL_NDI.split('#')[1];
            var info_DSL_calibre_longueur_2 = info_DSL_calibre_longueur.split('#')[1];
            var info_DSL_TETE_2 = info_DSL_TETE.split('#')[1];
            var info_DSL_Amorce_2 = info_DSL_Amorce.split('#')[1];
            var info_DSL_Paire_2 = info_DSL_Paire.split('#')[1];
            var info_DSL_Plot_2 = info_DSL_Plot.split('#')[1];

            if (info_DSL_TETE_1 == '') {
              info_DSL_TETE_1 = 'NC';
              info_DSL_Amorce_1 = 'NC';
              info_DSL_Paire_1 = 'NC';
            }

            if (info_DSL_TETE_2 == '' || typeof info_DSL_TETE_2 == 'undefined' ) {
              info_DSL_TETE_2 = 'NC';
              info_DSL_Amorce_2 = 'NC';
              info_DSL_Paire_2 = 'NC';
            }



            menu_info_DSL += '<tr><td>ADV FT - 0810 022 421</td></tr>';

            menu_info_DSL += '<tr><td>CODE URA</td>';
              menu_info_DSL +='<td>'+info_DSL_Code_URA+'</td>';
            menu_info_DSL += '</tr>';   

            menu_info_DSL += '<tr></tr>';

            menu_info_DSL += '<tr><td>NDI construit</td>';
              menu_info_DSL +='<td>'+info_DSL_NDI_1+'</td><td>'+info_DSL_NDI_2+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Calibre et longueur</td>';
              menu_info_DSL +='<td>'+info_DSL_calibre_longueur_1+'</td><td>'+info_DSL_calibre_longueur_2+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Tete FT</td>';
              menu_info_DSL +='<td>'+info_DSL_TETE_1+'</td><td>'+info_DSL_TETE_2+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Amorce</td>';
              menu_info_DSL +='<td>'+info_DSL_Amorce_1+'</td><td>'+info_DSL_Amorce_2+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Paire</td>';
              menu_info_DSL +='<td>'+info_DSL_Paire_1+'</td><td>'+info_DSL_Paire_2+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Plot DSLAM</td>';
              menu_info_DSL +='<td>'+info_DSL_Plot_1+'</td><td>'+info_DSL_Plot_2+'</td>';
              menu_info_DSL += '</tr>';


            SAV_NDI += '<br>NDI construit : '+info_DSL_NDI_1;
            SAV_NDI += '<br>Plot DSLAM : '+info_DSL_Plot_1;
            SAV_NDI += '<br>Calibre et longueur : '+info_DSL_calibre_longueur_1;
            SAV_NDI += '<br>Constitution : '+info_DSL_TETE_1+' '+info_DSL_Amorce_1+' '+info_DSL_Paire_1;
            SAV_NDI += '<br>';
            SAV_NDI += '<br>NDI construit : '+info_DSL_NDI_2;
            SAV_NDI += '<br>Plot DSLAM : '+info_DSL_Plot_2;
            SAV_NDI += '<br>Calibre et longueur : '+info_DSL_calibre_longueur_2;
            SAV_NDI += '<br>Constitution : '+info_DSL_TETE_2+' '+info_DSL_Amorce_2+' '+info_DSL_Paire_2;
            SAV_NDI += '<br>';
            
            //alert(SAV_NDI);

            Outils_SAV(); 
            Outils_Barre_STC(); 
          }

          else {  // MonoaPaire
            //alert("monopaire");

            menu_info_DSL += '<tr><td>ADV FT - 0810 022 421</td></tr>';

            menu_info_DSL += '<tr><td>CODE URA</td>';
              menu_info_DSL +='<td>'+info_DSL_Code_URA+'</td>';
            menu_info_DSL += '</tr>'; 

            menu_info_DSL += '<tr></tr>';

            menu_info_DSL += '<tr><td>NDI construit</td>';
              menu_info_DSL +='<td>'+info_DSL_NDI.split('#')[0]+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Calibre et longueur</td>';
              menu_info_DSL +='<td>'+info_DSL_calibre_longueur.split('#')[0]+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Tete FT</td>';
              menu_info_DSL +='<td>'+info_DSL_TETE.split('#')[0]+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Amorce</td>';
              menu_info_DSL +='<td>'+info_DSL_Amorce.split('#')[0]+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Paire</td>';
              menu_info_DSL +='<td>'+info_DSL_Paire.split('#')[0]+'</td>';
              menu_info_DSL += '</tr>';
            menu_info_DSL += '<tr><td>Plot DSLAM</td>';
              menu_info_DSL +='<td>'+info_DSL_Plot.split('#')[0]+'</td>';
              menu_info_DSL += '</tr>';

            SAV_NDI += '<br>NDI construit : '+info_DSL_NDI.split('#')[0];
            SAV_NDI += '<br>Plot DSLAM : '+info_DSL_Plot.split('#')[0];
            SAV_NDI += '<br>Calibre et longueur : '+info_DSL_calibre_longueur.split('#')[0];
            SAV_NDI += '<br>Constitution : '+info_DSL_TETE.split('#')[0]+' '+info_DSL_Amorce.split('#')[0]+' '+info_DSL_Paire.split('#')[0];
            SAV_NDI += '<br>';

            Outils_SAV(); 
            Outils_Barre_STC();
          }

        }

        menu_info_DSL_N2 += menu_info_DSL;
        menu_info_DSL_N2 += '</table></div>';

        menu_info_DSL_Barre_STC = menu_info_DSL;

        menu_popup_2 += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoDSL\',headingText:\'Informations DSL\'});" href="#" style="cursor: pointer;" class=" ">Informations DSL</a>';

        //alert(obj.nomRessource);
        // recherche dans le JSON
        var codeOffreDSL = obj.nomRessource.split('-')[1]+"-"+obj.nomRessource.split('-')[2]+"-"+obj.nomRessource.split('-')[3];
        
        // ou dans le code source de la page
        // var tempo = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody tr td").eq(9).text();
        // var codeOffreDSL = tempo.substring(tempo.indexOf("(")+1,tempo.indexOf(")"));

        menu_info_DSL_code_offre += '<br>'+tableauOffreDSL[codeOffreDSL];

        // avant que fuschia-barricou ne me fasse chier
        menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
        menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';

        MEP_info_DSL();

        SAV_Offre += '<br>';
        SAV_Offre += ID_LDCOM+' - '+codeOffreDSL;
        SAV_Offre += '<br>';
        SAV_Offre += tableauOffreDSL[codeOffreDSL];
        SAV_Offre += '<br>';
        //alert(SAV_Offre);

        Outils_SAV(); 
        Outils_Barre_STC();
        MEP_SAV();

      }
    });
  }

  else if (obj.isTDSL == 1 && Nom_OFFRE.substring(0,3) != "LPT") {  // TDSL 

    //alert(obj.nomRessource);

    var test_tempo = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody tr td").eq(8).text();
    //alert(test_tempo);
    var i = 9;

    if (test_tempo != "Offre") {
      i = i+2;
    };

    var tempo = $("#wind_4427af7c8d6032aa911660768dd4fbe3 table tbody tr td").eq(i).text();
    //alert(tempo);
    var codeOffreDSL = tempo.substring(tempo.indexOf("(")+1,tempo.indexOf(")"));
    //alert(codeOffreDSL);
    //alert(tableauOffreDSL[codeOffreDSL]);

    menu_info_DSL_N2 += 'Info DSL <hr>';
    menu_info_DSL_N2 += '<a target=_blank href="'+url_ipsite_bench+'">IPSITE BENCH</a>';
    menu_info_DSL_N2 += '<br>'+obj.nomRessource+'<br>'+tableauOffreDSL[codeOffreDSL];

    menu_info_DSL_Barre_STC += 'DSLE : ';
    menu_info_DSL_Barre_STC += obj.nomRessource+'<br>'+tableauOffreDSL[codeOffreDSL];
    menu_info_DSL_Barre_STC += '<br>';

    menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
    menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';

    SAV_DSLE += '<br>'+obj.nomRessource+'<br>'+tableauOffreDSL[codeOffreDSL]+'<br>';

    MEP_info_DSL();

    Outils_SAV(); 
    Outils_Barre_STC();

    MEP_SAV();
  }

  else if (Nom_OFFRE.substring(0,3) == "LPT") {

    menu_info_DSL_N2 += 'Info LPT <hr>';
    menu_info_DSL_N2 += '<a target=_blank href="'+url_ipsite_bench+'">IPSITE BENCH</a>';
    menu_info_DSL_N2 += '<br>'+ref_LPT;
    menu_info_DSL_N2 += '<br>'+Nom_OFFRE;

    menu_info_DSL_Barre_STC += 'LPT : '+ref_LPT;
    menu_info_DSL_Barre_STC += '<br>'+Nom_OFFRE+'<br>';

    menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
    menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';


    SAV_LPT += '<br>'+ref_LPT+'<br>';

    MEP_info_DSL();

    Outils_SAV(); 
    Outils_Barre_STC();

    MEP_SAV();


  }

  else  {
    alert("type de lien non déterminé");
  }
}


function Launch_Info_THD() {
  //alert(CE2O_feuille);

  menu_info_THD_N2 += 'Info CE2O <hr>';
  menu_info_THD_N2 += '<a target=_blank href="'+url_ipsite_bench+'">IPSITE BENCH</a>';
  menu_info_THD_N2 += '<br> Feuille : '+CE2O_feuille;
  menu_info_THD_N2 += '<br> Tronc &nbsp: '+CE2O_tronc+' - Vlan : '+CE2O_vlan;

  menu_info_DSL_Barre_STC += 'CE2O : '+CE2O_feuille; 
  menu_info_DSL_Barre_STC += '<br>CE2O-VLAN : '+CE2O_vlan;

  menu_info_DSL_SAV += 'Copier Coller pour Clarify<hr>';
  menu_info_DSL_SAV += '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'tableauInfoSAV\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Résumé SAV</a>';

  SAV_CE2O += '<br>'+CE2O_feuille;
  SAV_CE2O += '<br>VLAN : '+CE2O_vlan+'<br>';

  MEP_info_THD();

  Outils_SAV(); 
  Outils_Barre_STC();

  MEP_SAV();
}


function Outils_SAV() {

  if (((SAV_Offre != ''  && SAV_NDI != '' && SAV_DSLAM != '') || SAV_DSLE != '' || SAV_LPT != '' || SAV_CE2O != '') && (SAV_CPE != '' || SAV_CPE_L2L3 != '') ) {  

    var menu_tableau_cache ='';

    menu_tableau_cache += '<div id= tableauInfoSAV class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';

    menu_tableau_cache += '######## INFORMATION LIGNE ########<br>';

    menu_tableau_cache += SAV_CE2O;

    menu_tableau_cache += SAV_LPT;

    menu_tableau_cache += SAV_DSLE;

    menu_tableau_cache += SAV_Offre;

    menu_tableau_cache += SAV_DSLAM;

    menu_tableau_cache += SAV_NDI;

    menu_tableau_cache += '<br>######## INFORMATION ROUTEUR ########<br>'

    menu_tableau_cache += SAV_CPE;

    if (Infra == 'thd') {

      if (Nbr_CPE > 0) { menu_tableau_cache += SAV_CPE_Tab[1]; }
      if (Nbr_CPE > 1) { menu_tableau_cache += SAV_CPE_Tab[2]; }
      if (Nbr_CPE > 2) { menu_tableau_cache += SAV_CPE_Tab[3]; }
      if (Nbr_CPE > 3) { menu_tableau_cache += SAV_CPE_Tab[4]; }
    }

    menu_tableau_cache += '</div>';


    MEP_DIV_cachee(menu_tableau_cache);
  };
}


function Outils_Barre_STC() {

  if (((SAV_Offre != ''  && SAV_NDI != '' && SAV_DSLAM != '') || SAV_DSLE != '' || SAV_LPT != '' || SAV_CE2O != '') && (SAV_CPE != '' || SAV_CPE_L2L3 != '' ) ) {  

    var menu_tableau_cache ='';

    menu_tableau_cache += '<div id= BarreSTC class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';

    menu_tableau_cache += '<br><br><br><br><br>'
    menu_tableau_cache += '######## INFORMATION BOUCLE LOCALE ########<br><br>';

    menu_tableau_cache += '<table cellpadding=0 cellspacing=0>';
    menu_tableau_cache += menu_info_DSL_Barre_STC;
    menu_tableau_cache += '</table>';

    menu_tableau_cache += '<br>######## INFORMATION LIEN / RACCORDEMENT ########<br>';

    menu_tableau_cache += SAV_CE2O;
    menu_tableau_cache += SAV_LPT;
    menu_tableau_cache += SAV_DSLE;
    menu_tableau_cache += SAV_Offre;
    menu_tableau_cache += SAV_DSLAM;
    menu_tableau_cache += SAV_NDI;

    menu_tableau_cache += '<br>######## INFORMATION ROUTEUR ########<br>'

    menu_tableau_cache += SAV_CPE_Barre_STC;

    if (Infra == 'thd') {

      if (Nbr_CPE > 0) { menu_tableau_cache += SAV_CPE_Barre_STC_Tab[1]; }
      if (Nbr_CPE > 1) { menu_tableau_cache += SAV_CPE_Barre_STC_Tab[2]; }
      if (Nbr_CPE > 2) { menu_tableau_cache += SAV_CPE_Barre_STC_Tab[3]; }
      if (Nbr_CPE > 3) { menu_tableau_cache += SAV_CPE_Barre_STC_Tab[4]; }
    }

    menu_tableau_cache += '<br><br><br><br><br>'

    menu_tableau_cache += '</div>';


    MEP_DIV_cachee(menu_tableau_cache);
    MEP_BARRE_STC();
  };
}


function HADES(HADrESse_IP,num_cpe) {

  GM_xmlhttpRequest({
    method: "GET",
    url: 'http://10.102.233.34/Hades/logcpe_diagvgates.php?IP='+HADrESse_IP+'&offre='+Nom_OFFRE,
    onload: function(response) {
      var codeHTML = '<div>'+response.responseText+'</div>';
      //alert("ok hades");
      //alert(HADrESse_IP);

      // var debut_info = response.responseText.search("Dernier reboot");
      var debut_info = response.responseText.search("<center><a href");
      var bloc_info = response.responseText.substring(debut_info);
      // bloc_info = bloc_info.replace(/image/g,"http://10.102.233.34/Hades/image");

      var etat = 'vert';

      if (bloc_info.match('Undefined') != null) { etat = 'HS'; }
      // if (bloc_info.match('Pas de connexion au routeur SFR possible via') != null) { etat = 'orange'; }
      if (bloc_info.match("Le routeur SFR n'est pas joignable") != null) { etat = 'rouge'; }
      // if (bloc_info.match('Les logs du routeur ne sont pas exploitables') != null) { etat = 'violet'; }

      //alert(etat);
    
      var menu_tableau_cache ='';
      menu_tableau_cache += '<div id= HADES_'+HADrESse_IP+' class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';
      menu_tableau_cache += bloc_info;
      menu_tableau_cache += '</div>';

      MEP_DIV_cachee(menu_tableau_cache);
      MEP_HADES(HADrESse_IP,num_cpe,etat);
    }
  });
}


function Mercures(url) {

  GM_xmlhttpRequest({
    method: "GET",
    url: 'http://10.102.233.34/Mercure/stat.php?url='+encodeURIComponent(url)+'&site='+encodeURIComponent(Nom_Site)+'&offre='+encodeURIComponent(Nom_OFFRE),
    onload: function(response) {
      var codeHTML = '<div>'+response.responseText+'</div>';

      var menu_tableau_cache ='<div id= Mercure class="highslide-maincontent">'+codeHTML+'</div>';

      var pastille_mercure = '';
      pastille_mercure += '<div id= Mercure class="highslide-maincontent">';
      // pastille_mercure += '<br><a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'Mercure_MOISSTATSVPN\',headingText:\'Powered by Mercure\'});" href="#" style="cursor: pointer;" class=" ">Site Jour</a>';
      // pastille_mercure += '<br><a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'Mercure_MOISSTATSITE\',headingText:\'Powered by Mercure\'});" href="#" style="cursor: pointer;" class=" ">Site Mois</a>';
      pastille_mercure += $(codeHTML).find('#JOURSTATSITE').html();
      // pastille_mercure += '<br>';
      // pastille_mercure += $(codeHTML).find('#MOISSTATSITE').html();
      pastille_mercure += '<br><center>'
      pastille_mercure += '<br><a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'Mercure_JOURSTATSVPN\',headingText:\'Powered by Mercure\'});" href="#" style="cursor: pointer;" class=" ">Vue du Jour pour les autres accès du '+Nom_OFFRE+'</a>';
      pastille_mercure += '<br><br><a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'Mercure_MOISSTATSVPN\',headingText:\'Powered by Mercure\'});" href="#" style="cursor: pointer;" class=" ">Vue du Mois pour les autres accès du '+Nom_OFFRE+'</a>';
      pastille_mercure += '</center></div>';

      var tableau_site_jour = '<div id= Mercure_JOURSTATSITE class="highslide-maincontent">'+$(codeHTML).find('#JOURSTATSITE').html()+'</div>';
      var tableau_site_mois = '<div id= Mercure_MOISSTATSITE class="highslide-maincontent">'+$(codeHTML).find('#MOISSTATSITE').html()+'</div>';
      var tableau_VPN_jour = '<div id= Mercure_JOURSTATSVPN class="highslide-maincontent">'+$(codeHTML).find('#JOURSTATSVPN').html()+'</div>';
      var tableau_VPN_mois = '<div id= Mercure_MOISSTATSVPN class="highslide-maincontent">'+$(codeHTML).find('#MOISSTATSVPN').html()+'</div>';


      MEP_DIV_cachee(tableau_site_jour);
      MEP_DIV_cachee(tableau_site_mois);
      MEP_DIV_cachee(tableau_VPN_jour);
      MEP_DIV_cachee(tableau_VPN_mois);

      MEP_DIV_cachee(pastille_mercure);

      MEP_Mercure();
    }
  });
}


function Carte_France() {
  //alert(obj.CltCodePostal);
  var departement = obj.CltCodePostal.substr(0,2);

  if (departement == '20') {
    if (obj.CltCodePostal < 20200) { departement = '2A';}
    else { departement ='2B';}
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


  // tableauCarteDepartement["71"] = 'src="//upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Sa%C3%B4ne-et-Loire_departement_locator_map.svg/300px-Sa%C3%B4ne-et-Loire_departement_locator_map.svg.png"';




  var menu_MEP = '<img width="131" height="144" src="'+tableauCarteDepartement[departement]+'">';
  //<img class="small" src="http://thecodeplayer.com/uploads/media/iphone.jpg" width="200"/>
  //var menu_MEP = '<div class="magnify"><div class="magnify"><img class="small" width="131" height="144" src="'+tableauCarteDepartement[departement]+'"></div>';
  //var menu_MEP = '<div class="magnify"><div class="magnify"><img class="small" src="http://thecodeplayer.com/uploads/media/iphone.jpg" width="200"/></div>';
  menuobj = document.createElement('ul');
  menuobj.style.position = 'absolute';
  menuobj.style.top = '0px';
  menuobj.style.left = '450px';
  //menuobj.style.padding = '20px';
  menuobj.style.padding = '1px';
  menuobj.style.backgroundColor = '#fff';
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}


function Carte_Incidents() {

  //alert("carte incident");

  // http://stcweb1.prod.ld:8099/gates.php?city=all
  // http://stcweb1.prod.ld:8099/gates.php?city=bordeaux
  // http://10.92.252.131:8080/reporting/supstat/liens.php?gid_master='+obj.masterID+'&option='

  GM_xmlhttpRequest({
   method: "GET",
   url: 'http://stcweb1.prod.ld:8099/gates.php?city=all',
   onload: function(response1) { 

    var debut_svg = response1.responseText.indexOf("<svg");
    var fin_svg = response1.responseText.indexOf("</svg");

    var the_svg = response1.responseText.substring(debut_svg,fin_svg+5);

    // var debut_script_circle = fin_svg+6;
    // var fin_script_circle = response1.responseText.indexOf("</script",fin_svg);

    // var the_script_circle_balise = response1.responseText.substring(debut_script_circle,fin_script_circle+9);
    // var the_script_circle = the_script_circle_balise.substring(9,the_script_circle_balise.indexOf("</script"));

    // alert(the_script_circle);

    // var menu_MEP = '<canvas id="canvas" width="131px" height="144px">'+the_svg+'</canvas>';
    var menu_MEP = the_svg;
    menuobj = document.createElement('ul');
    menuobj.style.position = 'absolute';
    menuobj.style.top = '0px';
    menuobj.style.left = '584px';
    //menuobj.style.padding = '20px';
    menuobj.style.padding = '1px';
    menuobj.style.backgroundColor = '#fff';
    menuobj.innerHTML = menu_MEP;
    body = document.getElementsByTagName('body')[0];
    body.appendChild(menuobj)

    //var talbeau_script = the_script_circle.split(';');

    //addCircleToDepartement(33, 10)

    }
  });
}


function Generation_Div_Services(i,tab_services) {

  var compteur = 0;

  GM_xmlhttpRequest({
    method: "GET",
    url: 'http://10.92.252.131:8080/reporting/supstat/'+tab_services[i],
    onload: function(response5) { 
      var codeHTML5 = '<div>'+response5.responseText+'</div>';

      var menu_tableau_cache = ''

      menu_tableau_cache += '<div id= tableauService'+i+' class="highslide-maincontent"><table cellpadding=0 cellspacing=10>';

      $(codeHTML5).find("#tab-resultat tbody tr").each(function(){
        compteur = compteur+1;
        menu_tableau_cache += '<tr>';
        menu_tableau_cache += '<td>'+$(this).find("td").eq(5).text()+'</td>';
        menu_tableau_cache += '<td>'+$(this).find("td").eq(7).text()+'</td>';
        menu_tableau_cache += '<td>'+$(this).find("td").eq(6).text()+'</td>';
        //menu_tableau += '<td>'+$(this).find("td").eq(8).text()+'</td>';
        menu_tableau_cache += '<td><a target=_blank href="'+GM_dossier+'CreationBat.php?action=cpetoolbox&hostname='+$(this).find("td").eq(8).text()+'&typeCPE=CISCO&typeOffre='+Nom_OFFRE+'&NomClient='+encodeURIComponent(Nom_Client)+'">'+$(this).find("td").eq(8).text()+'</a></td>';
        menu_tableau_cache += '</tr>';
      });

      menu_tableau_cache += '</table></div>';

      MEP_DIV_cachee(menu_tableau_cache);
    }
  });
}

function MEP_listing_Site() {
  var menu_MEP = menu_debut_1+menu_tableau+menu_listing_service+menu_popup_1+menu_fin_1;
  menuobj = document.createElement('ul');
  menuobj.style.position = 'fixed';
  menuobj.style.top = '85px';
  menuobj.style.left = '910px';
  menuobj.style.padding = '10px';
  menuobj.style.backgroundColor = '#fff';
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}

function MEP_HADES(HADrESse_IP,num_cpe,etat) {

  var posY = 310;

  posY = posY+num_cpe*15;
  

  var menu_MEP = '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'HADES_'+HADrESse_IP+'\',headingText:\'Powered by HADES - '+HADrESse_IP+'\'});" href="#" style="cursor: pointer;" class=" "><img width="12" height="12" src='+GM_dossier+'/image/'+etat+'.jpg ></a>';
  menuobj = document.createElement('ul');
  menuobj.style.position = 'fixed';
  menuobj.style.top = posY+'px';
  menuobj.style.left = '913px';
  menuobj.style.padding = '0px';
  menuobj.style.backgroundColor = '#fff';
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}

function MEP_Mercure() {

  var couleur = 'vert';

  var menu_MEP = '<a onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'Mercure\',headingText:\'Powered by Mercure\'});" href="#" style="cursor: pointer;" class=" "><img width="12" height="12" src='+GM_dossier+'/image/'+couleur+'.jpg ></a>';
  menuobj = document.createElement('ul');
  menuobj.style.position = 'fixed';
  menuobj.style.top = '153px';
  menuobj.style.left = '913px';
  menuobj.style.padding = '0px';
  menuobj.style.backgroundColor = '#fff';
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}

function MEP_conf_CVS() {
  var menu_MEP = menu_conf_CPE_A+'<br>'+menu_conf_CPE_P;
  menuobj = document.createElement('ul');
  menuobj.style.position = 'fixed';
  menuobj.style.top = '325px';
  menuobj.style.left = '1144px';
  menuobj.style.padding = '0px';
  menuobj.style.backgroundColor = '#fff';
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}

function MEP_conf_CVS_CPE_L3(menu_conf_CPE_THD,num_cpe) {

  var posY = 310;

  posY = posY+num_cpe*15;

  var menu_MEP = menu_conf_CPE_THD;
  menuobj = document.createElement('ul');
  menuobj.style.position = 'fixed';
  menuobj.style.top = posY+'px';
  menuobj.style.left = '1144px';
  menuobj.style.padding = '0px';
  menuobj.style.backgroundColor = '#fff';
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}

function MEP_listing_Service() {
  var menu_MEP = menu_popup;
  menuobj = document.createElement('ul');
  menuobj.style.position = 'fixed';
  menuobj.style.top = '666px';
  menuobj.style.left = '910px';
  menuobj.style.padding = '10px';
  menuobj.style.backgroundColor = '#fff';
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
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

function MEP_info_DSL() {
  var menu_MEP = menu_info_DSL_N2+menu_popup_2+menu_info_DSL_code_offre;
  menuobj = document.createElement('ul');
  menuobj.style.position = 'fixed';
  menuobj.style.top = '515px';
  menuobj.style.left = '910px';
  menuobj.style.padding = '10px';
  menuobj.style.backgroundColor = '#fff';
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}

function MEP_info_THD() {
  var menu_MEP = menu_info_THD_N2;
  menuobj = document.createElement('ul');
  menuobj.style.position = 'fixed';
  menuobj.style.top = '515px';
  menuobj.style.left = '910px';
  menuobj.style.padding = '10px';
  menuobj.style.backgroundColor = '#fff';
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}

function MEP_SAV() {
  var menu_MEP = menu_info_DSL_SAV;
  menuobj = document.createElement('ul');
  menuobj.style.position = 'fixed';
  menuobj.style.top = '606px';
  menuobj.style.left = '910px';
  menuobj.style.padding = '10px';
  menuobj.style.backgroundColor = '#fff';
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}

function MEP_BARRE_STC() {
  var link_barre_stc = '<a id="CCBarreSTC" onclick="copy_resumeClient(\'copietab\');return hs.htmlExpand(this,{maincontentId:\'BarreSTC\',headingText:\'Info Pour SAV\'});" href="#" style="cursor: pointer;" class=" ">Copier/Coller pour Barre STC</a>';

  var menu_MEP = '<b><font color="#F7F9FA"'+link_barre_stc+'</font></b>';
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
  var menu_MEP = label+menu_debut+menu_IP_CPE_A+menu_IP_CPE_P+menu_IP_CPE_L2+menu_IP_CPE_L3+menu_fin;
  menuobj = document.createElement('ul');
  menuobj.style.position = 'fixed';
  menuobj.style.top = '185px';
  menuobj.style.left = '910px';
  //menuobj.style.padding = '20px';
  menuobj.style.padding = '10px';
  menuobj.style.backgroundColor = '#fff';
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}

function MEP_Baniere() {
  var menu_MEP = '<b><font color="#F7F9FA" size=6>vGates</font></b>';
  menuobj = document.createElement('ul');
  menuobj.style.position = 'absolute';
  menuobj.style.top = '13px';
  menuobj.style.left = '155px';
  menuobj.style.padding = '10px';
  menuobj.style.backgroundColor = '##fff';
  menuobj.style.textShadow = "2px 2px #000000";
  menuobj.innerHTML = menu_MEP;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}

function MEP_test() {
  var menu_MEP_test = '<p id="sang">où doit couler mon sang ?<p>';
  menuobj = document.createElement('ul');

  // menuobj.style.position = 'fixed';
  // menuobj.style.position = 'static';
   menuobj.style.position = 'absolute';
  // menuobj.style.position = 'relative';
  // menuobj.style.position = 'inherit';

  menuobj.style.top = '250px';
  menuobj.style.left = '300px';
  menuobj.style.padding = '10px';

  menuobj.style.backgroundColor = '##efefef';
  menuobj.innerHTML = menu_MEP_test;
  body = document.getElementsByTagName('body')[0];
  body.appendChild(menuobj);
}

}
