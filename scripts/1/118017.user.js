// ==UserScript==
// @name Liga Sagres
// @namespace 	http://userscripts.org/users/171918
// @description sagres
// @version     2.6
// @date 	2010-02-10
// @creator 	webmaster
// @include        http://www.lpfp.pt/liga_zon_sagres/pages/jogo.aspx?epoca=20112012&jornada=*&jogo=*
// ==/UserScript==






window.addEventListener('load', function(event) {
	
	WriteTest();
 
}, 'false');


function XMLWriter()
{
    this.XML=[];
    this.Nodes=[];
    this.State="";
    this.FormatXML = function(Str)
    {
        if (Str)
            return Str.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return ""
    }
    this.BeginNode = function(Name)
    {
        if (!Name) return;
        if (this.State=="beg") this.XML.push(">");
        this.State="beg";
        this.Nodes.push(Name);
        this.XML.push("<"+Name);
    }
    this.EndNode = function()
    {
        if (this.State=="beg")
        {
            this.XML.push("/>");
            this.Nodes.pop();
        }
        else if (this.Nodes.length>0)
            this.XML.push("</"+this.Nodes.pop()+">");
        this.State="";
    }
    this.Attrib = function(Name, Value)
    {
        if (this.State!="beg" || !Name) return;
        this.XML.push(" "+Name+"=\""+this.FormatXML(Value)+"\"");
    }
    this.WriteString = function(Value)
    {
        if (this.State=="beg") this.XML.push(">");
        this.XML.push(this.FormatXML(Value));
        this.State="";
    }
    this.Node = function(Name, Value)
    {
        if (!Name) return;
        if (this.State=="beg") this.XML.push(">");
        this.XML.push((Value=="" || !Value)?"<"+Name+"/>":"<"+Name+">"+this.FormatXML(Value)+"</"+Name+">");
        this.State="";
    }
    this.Close = function()
    {
        while (this.Nodes.length>0)
            this.EndNode();
        this.State="closed";
    }
    this.ToString = function(){return this.XML.join("");}
}




var newdiv = document.createElement('div');
newdiv.innerHTML = "XML " + " <br><input type='text' name='myInput'  style='width:100% ; height:100px'>";
document.getElementById("layout").appendChild(newdiv);


	
		function goal(s,m){
			this.score= s;
			this.min = m;			
		}
		
		function toDate(date){
		var month = 10;
				XML.BeginNode("when");
				XML.WriteString("2011"+date);
				XML.EndNode();
		}
		function processHomeTeamSubs(){
		homeTeam.rows[3].childNodes[4].textContent;
		}


	function tiraAcento(text) { 
  text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a'); 
  text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e'); 
  text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i'); 
  text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o'); 
  text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u'); 
  text = text.replace(new RegExp('[Ç]','gi'), 'c'); 
  return text; 
} 	

function getElementsByClassName(oElm, strTagName, strClassName){
var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
	    var arrReturnElements = new Array();
	    strClassName = strClassName.replace(/\-/g, "\\-");
	    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	    var oElement;
	    for(var i=0; i<arrElements.length; i++){
	        oElement = arrElements[i];
	        if(oRegExp.test(oElement.className)){
	            arrReturnElements.push(oElement);
	        }
	    }
	    return (arrReturnElements)
	}


function WriteTest()
{
            try
            {
                var XML = new XMLWriter();
				var academica = new Array();
				academica[1]="peiser_aac"
				academica[2]="joaod_aac"
				academica[3]="sissoko_aac"
				academica[4]="flavio_aac"
				academica[5]="berger_aac"
				academica[7]="hugom_aac"
				academica[8]="habib_aac"
				academica[9]="fabioa_aac"
				academica[10]="adrien_aac"
				academica[11]="ouattara_aac"
				academica[12]="ricardo_aac"
				academica[13]="joaor_aac"
				academica[15]="orlando_aac"
				academica[17]="ederzito_aac"
				academica[19]="ruir_aac"
				academica[20]="mario_aac"
				academica[21]="abdoulaye_aac"
				academica[23]="diogov_aac"
				academica[24]="fabios_aac"
				academica[25]="jeremias_aac"
				academica[26]="nivaldo_aac"
				academica[41]="cedric_aac"
				academica[50]="diogom_aac"
				academica[55]="helder_aac"
				academica[85]="digog_aac"
				academica[88]="julio_aac"
				academica[99]="danilo_aac"
				
				var nacional = new Array();
				nacional[1]="elisson_cdn"
				nacional[2]="claudemir_cdn"
				nacional[3]="felipe_cdn"
				nacional[4]="danielson_cdn"
				nacional[5]="nunop_cdn"
				nacional[6]="ivan_cdn"
				nacional[7]="rené_cdn"
				nacional[8]="dejan_cdn"
				nacional[9]="mateus_cdn"
				nacional[10]="diego_cdn"
				nacional[11]="danielc_cdn"
				nacional[12]="marcelo_cdn"
				nacional[14]="juliano_cdn"
				nacional[18]="máriof_cdn"
				nacional[19]="anselmo_cdn"
				nacional[20]="joséc_cdn"
				nacional[21]="andrés_cdn"
				nacional[22]="joãoa_cdn"
				nacional[23]="oliver_cdn"
				nacional[24]="vladan_cdn"
				nacional[25]="thiago_cdn"
				nacional[27]="andrén_cdn"
				nacional[29]="márcio_cdn"
				nacional[33]="luísn_cdn"
				nacional[44]="zarko_cdn"
				nacional[55]="danijel_cdn"
				nacional[66]="elizeu_cdn"
				nacional[88]="luíss_cdn"
				
				var pferreira = new Array();
				//pferreira[]="nunos_fcpf"
				//subtituir o ozeia por nº23
				
				pferreira[1]="cássio_fcpf"
				pferreira[4]="fábio_fcpf"
				pferreira[5]="javier_fcpf"
				pferreira[6]="vitore_fcpf"
				pferreira[7]="josué_fcpf"
				pferreira[8]="andrél_fcpf"
				pferreira[9]="vitors_fcpf"
				pferreira[10]="luiz_fcpf"
				pferreira[11]="ruic_fcpf"
				pferreira[12]="pedrog_fcpf"
				pferreira[14]=" eridson_fcpf"
				pferreira[15]="luisp_fcpf"
				pferreira[16]="michel_fcpf"
				pferreira[17]="nunof_fcpf"
				pferreira[18]="jiliardo_fcpf"
				pferreira[20]="bacar_fcpf"
				pferreira[22]=" marcelo_fcpf"
				pferreira[23]="diogof_fcpf"
				pferreira[24]="luís_fcpf"
				pferreira[25]=" lorenzo_fcpf"
				pferreira[26]="joãob_fcpf"
				pferreira[27]="sandro_fcpf"
				pferreira[30]="michel_fcpf"
				pferreira[45]="antónioc_fcpf"
				pferreira[81]="manuelv_fcpf"
				pferreira[96]="filipea_fcpf"
				pferreira[99]="william_fcpf"
				pferreira[2] = pferreira[14];
				
				var feirense = new Array();
				feirense[1]="paulol_cdf"
				feirense[2]="william_cdf"
				feirense[3]="jeferson_cdf"
				feirense[4]="luciano_cdf"
				feirense[5]="hugoc_cdf"
				feirense[6]="pauloq_cdf"
				feirense[7]="diogoc_cdf"
				feirense[8]="sergioc_cdf"
				feirense[9]="ludovic_cdf"
				feirense[12]="douglas_cdf"
				feirense[13]="michael_cdf"
				feirense[17]="brunoc_cdf"
				feirense[18]="sténio_cdf"
				feirense[19]="tiagoa_cdf"
				feirense[21]="fernandov_cdf"
				feirense[23]="diogor_cdf"
				feirense[24]="miguela_cdf"
				feirense[30]="carlosm_cdf"
				//
				feirense[10]="miguela_cdf"
				feirense[14]="jonathan_cdf"
				feirense[22]="ianique_cdf" 
				feirense[26]="siaka_cdf" 
				feirense[33]="hugoh_cdf"
				feirense[15]="uanderson_cdf"
				feirense[27]="andréf_cdf"
				 
				
				var maritimo = new Array();
				maritimo[0]="cristiano_csm"
				maritimo[1]="peterson_csm"
				maritimo[2]="igor_csm"
				maritimo[3]="robson_csm"
				maritimo[5]="alonso_csm"
				maritimo[6]="sérgiom_csm"
				maritimo[7]="marco_csm"
				maritimo[8]="roberto_csm"
				maritimo[9]="papa_csm"
				maritimo[10]=" christian_csm"
				maritimo[11]=" ibrahim_csm"
				maritimo[13]="olberdam_csm"
				maritimo[15]=" edivândio_csm"
				maritimo[16]="valentin_csm"
				maritimo[17]=" leocisio_csm"
				maritimo[18]="luísa_csm"
				maritimo[20]="heldon_csm"
				maritimo[21]="nunos_csm"
				maritimo[22]="joãof_csm"
				maritimo[23]="hassan_csm"
				maritimo[24]="ruin_csm"
				maritimo[25]="rafael-csm"
				maritimo[27]="gonçalo_csm"
				maritimo[28]="joãov_csm"
				maritimo[29]="valdecir_csm"
				maritimo[30]="danilo_csm"
				maritimo[31]="hugob_csm"
				maritimo[32]="ruim_csm"
				maritimo[33]="filipep_csm"
				maritimo[34]="ricardoa_csm"
				maritimo[35]="philipe_csm"
				maritimo[36]="valter_csm"
				maritimo[37]="nunor_csm"
				maritimo[38]="carlosl_csm"
				maritimo[39]="ricardor_csm"
				maritimo[40]="andréf_csm"
				maritimo[41]="rubenf_csm"
				maritimo[42]="paulog_csm"
				maritimo[43]="tito_csm"
				maritimo[44]="joãoa_csm "
				maritimo[45]="dino_csm"
				maritimo[46]="joãov_csm"
				maritimo[47]="abelf_csm"
				maritimo[48]="fábio_csm"
				maritimo[49]="armandof_csm"
				maritimo[52]="romeu_csm"
				maritimo[53]="vladimir_csm"
				maritimo[54]="tiagog_csm"
				maritimo[55]="pedron_csm"
				maritimo[56]="andrés_csm"
				maritimo[57]="filipeb_csm"
				maritimo[58]="luísm_csm"
				maritimo[77]=" romain_csm"
				maritimo[81]="selim_csm"
				
				var porto = new Array();
				porto[1]="helton_fcp"
				porto[4]="maicon_fcp"
				porto[5]="alvaro_fcp"
				porto[6]="fredy_fcp"
				porto[7]="fernandob_fcp"
				porto[8]="joãom_fcp"
				porto[10]="cristian_fcp"
				porto[11]="kléber_fcp"
				porto[12]="givanildo_fcp"
				porto[13]="Jorge_fcp"
				porto[14]="rolando_fcp"
				porto[17]="silvestre_fcp"
				porto[18]=" walter_fcp"
				porto[19]="james_fcp"
				porto[20]="djalma_fcp"
				porto[21]="cristians_fcp"
				porto[22]="eliaquim_fcp"
				porto[23]="josef_fcp"
				porto[25]="fernandor_fcp"
				porto[27]="juan_fcp"
				porto[28]="alex_fcp"
				porto[30]="nicolas_fcp"
				porto[31]="rafael_fcp"
				porto[35]="steven_fcp"
				porto[41]="aldo_fcp"
				porto[42]="tomas_fcp"
				porto[43]="tiagof_fcp"
				porto[44]="andres_fcp"
				porto[45]="luisa_fcp"
				porto[46]="ndubisi_fcp"
				porto[47]="fabio_fcp"
				porto[48]="Enoch_fcp"
				porto[49]="Gonçalo_fcp"
				porto[50]="ricardos_fcp"
				porto[51]="joãoc_fcp"
				porto[52]="frédéric_fcp"
				porto[59]="joaquiml_fcp"
				
				porto[9]=porto[20]
				
				var gvicente = new Array();
				gvicente[1]="adriano_gvfc"
				gvicente[3]="joãos_gvfc"
				gvicente[4]="sandro_gvfc"
				gvicente[5]="ruif_gvfc"
				gvicente[6]="sandro_gvfc"
				gvicente[6]="daniel_gvfc"
				gvicente[7]="laionel_gvfc"
				gvicente[8]="pedrom_gvfc"
				gvicente[9]="antónios_gvfc"
				gvicente[10]="andréc_gvfc"
				gvicente[11]="sidne_gvfc"
				gvicente[12]="leandro_gvfc"
				gvicente[13]="kalidou_gvfc"
				gvicente[16]="paulol_gvfc"
				gvicente[19]="mauro_gvfc"
				gvicente[20]="eder_gvfc"
				gvicente[21]="jorgeb_gvfc"
				gvicente[22]="pauloa_gvfc"
				gvicente[29]="roberto_gvfc"
				gvicente[30]="brunot_gvfc"
				gvicente[40]="guilherme_gvfc"
				gvicente[44]="cláudio_gvfc"
				gvicente[54]=" halisson_gvfc"
				gvicente[58]="luísl_gvfc"
				gvicente[66]="luísp_gvfc"
				gvicente[70]="hugoo_gvfc"
				gvicente[77]="joãov_gvfc"
				gvicente[79]="vitorm_gvfc"
				gvicente[80]="uilson_gvfc"
				gvicente[89]="richard_gvfc"
				
				var rioAve = new Array();
				rioAve[1]="rafael_rafc"
				rioAve[2]="joséa_rafc"
				rioAve[4]="ricardop_rafc"
				rioAve[5]="jeferson_rafc"
				rioAve[6]="jean_rafc"
				rioAve[7]="kelvin_rafc"
				rioAve[8]="ricardom_rafc"
				rioAve[9]="joãot_rafc"
				rioAve[10]="vitors_rafc"
				rioAve[11]="brunob_rafc"
				rioAve[13]="joãom_rafc"
				rioAve[14]="brunos_rafc"
				rioAve[15]="tiagop_rafc"
				rioAve[16]="joséb_rafc"
				rioAve[17]="saulo_rafc"
				rioAve[18]="josés_rafc"
				rioAve[20]="christian_rafc"
				rioAve[22]="andréd_rafc"
				rioAve[23]="andréb_rafc"
				rioAve[25]="jorges_rafc"
				rioAve[29]=""
				rioAve[28]="huanderson_rafc"
				rioAve[30]="wires_rafc"
				rioAve[33]="eder_rafc"
				rioAve[38]="paulos_rsfc"
				rioAve[88]="yazalde_rafc"
				
				var beiramar = new Array();
				//beiramar[]="edsons_scbm"
				//beiramar[]="eduardo_scbm"
				beiramar[1]="enoque_scbm"
				beiramar[2]="jaime_scbm"
				beiramar[4]="yohan_scbm"
				beiramar[5]="hugov_scbm"
				beiramar[6]="nunoc_scbm"
				beiramar[7]="artur_scbm"
				beiramar[9]="élio_scbm"
				beiramar[10]="cristiano_scbm"
				beiramar[12]="jonas_scbm"
				beiramar[13]="fernando_scbm"
				beiramar[14]="jaime_scbm"
				beiramar[16]="evanildo_scbm"
				beiramar[17]="atila_scbm"
				beiramar[18]="pedrom_scbm"
				beiramar[19]="dominic_scbm"
				beiramar[20]="andrém_scbm"
				beiramar[21]="javier_scbm"
				beiramar[22]="tiagob_scbm"
				beiramar[23]="miguelg_scbm"
				beiramar[23]="joãog_scbm"
				beiramar[24]="ruir_scbm"
				beiramar[25]="eduardor_scbm"
				beiramar[27]="ricardod_scbm"
				beiramar[28]="chengdong_scbm"
				beiramar[29]="douglas_scbm"
				beiramar[30]="sérgio_scbm"
				
				var benfica = new Array();
				benfica[1]="artur_slb"
				benfica[3]="emerson_slb"
				benfica[4]="anderson_slb"
				benfica[5]="ruben_slb"
				benfica[6]="francisco_slb"
				benfica[7]="óscar_slb"
				benfica[8]="brunoz_slb"
				benfica[9]="manuel_slb"
				benfica[10]="pablo_slb"
				benfica[11]="franco_slb"
				benfica[14]="victorio_slb"
				benfica[16]="nelson_slb"
				benfica[19]="rodrigo_slb"
				benfica[20]="osvaldo_slb"
				benfica[21]="nemamja_slb"
				benfica[22]="rodrigo_slb"
				benfica[24]="ezequiel_slb"
				benfica[25]="paulop_slb"
				benfica[26]="davids_slb"
				benfica[27]="miguelv_slb"
				benfica[28]="witsel_slb"
				benfica[30]="javier_slb"
				benfica[33]="jardel_slb"
				benfica[35]="enzo_slb"
				benfica[36]="luísm_slb"
				benfica[36]="enzo_slb"
				benfica[37]="ruben_slb"
				benfica[38]="juan_slb"
				benfica[39]="michael_slb"
				benfica[47]="eduardo_slb"
				benfica[51]="joséc_slb"
				benfica[52]=" brunov_slb"
				benfica[53]="brunog_slb"
				benfica[54]="joãoc_slb"
				benfica[55]=" hélder_slb"
				benfica[56]="diego_slb"
				benfica[57]="andrég_slb"
				benfica[58]="ivan_slb"
				benfica[59]="sancidino_slb"
				
				var braga = new Array();
				braga[1]="joaquims_scb"
				braga[2]="rodrigo_scb"
				braga[4]="nunoc_scb"
				braga[5]="ewerton_scb"
				braga[6]="vinicius_scb"
				braga[8]="joséc_scb"
				braga[9]="paulor_scb"
				braga[10]="helder_scb"
				braga[11]="edson_scb"
				braga[15]="wanderson_scb"
				braga[17]="franciscop_scb"
				braga[18]="rodrigo_scb"
				braga[19]="albert_scb"
				braga[20]="elderson_scb"
				braga[21]="nunor_scb"
				braga[22]="mahamat_scb"
				braga[23]="emmanuel_scb"
				braga[25]="leandro_scb"
				braga[26]="paulon_scb"
				braga[27]="custódio_scb"
				braga[30]="alan_scb"
				braga[31]="luis_scb"
				braga[32]="tommaso_scb"
				braga[39]="erivaldo_scb"
				braga[42]="ruiv_scb"
				braga[43]="andréc_scb"
				braga[44]="douglas_scb"
				braga[45]="hugo_scb"
				braga[46]="mário_scb"
				braga[48]="nunov_scb"
				braga[50]="hernâni_scb"
				braga[51]="ricardoc_scb"
				braga[54]="hugor_scb"
				braga[56]="rómulo_scb"
				braga[57]="nygel_scb"
				braga[58]="emre_scb"
				braga[60]="tiagov_scb"
				braga[62]="matheus_scb"
				braga[70]="julian_scb"
				braga[76]="tiagor_scb"
				braga[83]="carloss_scb"
				braga[86]="wanderson_scb"
				braga[89]="joséo_scb"
				braga[93]="brunom_scb"
				braga[94]="artur_scb"
				
				var olhanense = new Array();
				//olhanense[]="luíss_sco"
				olhanense[1]="brunov_sco"
				olhanense[3]="andrép_sco"
				//olhanense[3]="luísf_sco"
				olhanense[4]="paulor_sco"
				olhanense[5]="maurício_sco"
				olhanense[6]="nunoa_sco"
				olhanense[7]=" ismaily_sco"
				olhanense[8]="mateus_sco"
				olhanense[9]=" vitorc_sco"
				olhanense[10]="ivanildo_sco"
				olhanense[11]=" djalmir_sco"
				olhanense[12]="vitorv_sco"
				olhanense[13]="jander_sco"
				olhanense[14]="luísp_sco"
				olhanense[16]="ruid_sco"
				olhanense[17]="wilson_sco"
				olhanense[18]=" cauê_sco"
				olhanense[19]="victorm_sco"
				olhanense[20]="eduardog_sco"
				olhanense[22]="fabiano_sco"
				olhanense[23]="salvador_sco"
				olhanense[24]="hugog_sco"
				olhanense[26]="andrép_sco"
				olhanense[28]="joãog_sco"
				olhanense[30]="edson_sco"
				olhanense[41]="gerson_sco"
				olhanense[42]=" elson_sco"
				olhanense[43]="ricardom_sco"
				olhanense[44]="edon_sco"
				olhanense[46]="joãov_sco"
				olhanense[65]="fernandoa_sco"
				olhanense[99]="jean_sco"
				olhanense[21]="luísfa_sco"
				
				var sporting = new Array();
				sporting[1]="ruip_scp"
				sporting[2]="albertov_scp"
				sporting[3]="daniel_scp"
				sporting[4]="anderson_scp"
				sporting[5]="oguchialu_scp"
				sporting[6]=" evaldo_scp"
				sporting[7]="valeri_scp"
				sporting[8]="stephanus_scp"
				sporting[9]="ricky_scp"
				sporting[10]="marat_scp"
				sporting[11]="diegoc_scp"
				sporting[12]="marcelo_scp"
				sporting[14]="matías_scp"
				sporting[16]="tiagof_scp"
				sporting[17]="jeffren_scp"
				sporting[18]="andred_scp"
				sporting[19]="santiago_scp"
				sporting[21]="fabián_scp"
				sporting[22]=" luísb_scp"
				sporting[25]="brunop_scp"
				sporting[26]="andrés_scp"
				sporting[28]="andrém_scp"
				sporting[33]="diego_scp"
				sporting[34]="tiagoi_scp"
				sporting[47]="joãop_scp"
				sporting[48]="emiliano_scp"
				sporting[77]="elias_scp"
				sporting[20]=sporting[18];
				sporting[23]=sporting[33];
				
				var leiria = new Array(); 
				leiria[1]="eduardog_udl"
				leiria[2]="ivo_udl"
				leiria[3]="milos_udl"
				leiria[4]="manuelc_udl "
				leiria[5]="hugoa_udl"
				leiria[8]="ruben_udl"
				leiria[9]="luísa_udl"
				leiria[11]="jorgec_udl"
				leiria[12]="luizb_udl"
				leiria[14]="andréa_udl"
				leiria[15]="edson_udl"
				leiria[16]="tiagot_udl"
				leiria[17]="jorges_udl"
				leiria[19]="elvis_udl"
				leiria[20]="marco_udl"
				leiria[21]="marcos_udl"
				leiria[23]="valério_udl"
				leiria[29]="lucas_udl"
				leiria[30]="josiel_udl"
				leiria[33]="diego_udl"
				leiria[35]="josés_udl"
				leiria[37]=" yann_udl"
				leiria[41]="Robert_udl"
				leiria[70]=" maykon_udl"
				leiria[80]="patrick_udl"
				leiria[93]="jan_udl"
				leiria[99]="brunom_udl"
				
				var vsetubal = new Array();
				//vsetubal[]="peter_vfc"
				vsetubal[1]="ricardom_vfc"
				vsetubal[3]="ricardos_vfc"
				vsetubal[4]="anderson_vfc"
				vsetubal[5]="joséa_vfc"
				vsetubal[7]="brunof_vfc"
				vsetubal[8]="bernardo_vfc"
				vsetubal[9]="rafael_vfc"
				vsetubal[10]=" alexander_vfc"
				vsetubal[11]="josés_vfc"
				vsetubal[13]="igor_vfc"
				vsetubal[19]="jorgeg_vfc"
				vsetubal[20]="hugol_vfc"
				vsetubal[21]="joãos_vfc"
				vsetubal[22]="jean_vfc"
				vsetubal[25]="diego_vfc"
				vsetubal[28]="brunos_vfc"
				vsetubal[37]="brunob_vfc"
				vsetubal[68]="uedson_vfc"
				vsetubal[70]="gonçalo_vfc"
				vsetubal[76]="ricardop_vfc"
				vsetubal[87]="claudio_vfc"
				vsetubal[88]="thiago_vfc"
				vsetubal[90]="henrique_vfc"
				vsetubal[91]="franciscor_vfc"
				vsetubal[93]="gonçalo_vfc"
				vsetubal[98]="moisés_vfc"
				vsetubal[99]="joãof_vfc"
				
				vsetubal[2]="petert_vfc"
				
				var vguimaraes = new Array();
				//vguimaraes[]="tiagos_vsc"
				vguimaraes[1]="nilson_vsc"
				vguimaraes[2]="leandro_vsc"
				vguimaraes[3]="rodrigo_vsc"
				vguimaraes[4]="pedrom_vsc"
				vguimaraes[5]="issam_vsc"
				vguimaraes[6]="brunot_vsc"
				vguimaraes[7]="tiagoj_vsc"
				vguimaraes[8]="marcelo_vsc"
				vguimaraes[10]="nuno_vsc"
				vguimaraes[11]="renan_vsc"
				vguimaraes[14]="jean_vsc"
				vguimaraes[17]="jonathan_vsc"
				vguimaraes[18]="leonel_vsc"
				vguimaraes[19]="ruia_vsc"
				vguimaraes[20]="mohammed_vsc"
				vguimaraes[22]="elarabi_vsc"
				vguimaraes[23]="paulog_vsc"
				vguimaraes[24]="andrép_vsc"
				vguimaraes[27]="sérgioa_vsc"
				vguimaraes[29]="edgar_vsc"
				vguimaraes[33]="anderson_vsc"
				vguimaraes[39]="pedrol_vsc"
				vguimaraes[40]="joãoa_vsc"
				vguimaraes[44]="mahamadou_vsc"
				vguimaraes[55]="anthony_vsc"
				vguimaraes[77]="rogério_vsc"
				vguimaraes[79]="domingosc_vsc"
				vguimaraes[80]="joãoa_vsc "
				vguimaraes[83]="douglas_vsc"
				vguimaraes[88]="maurício_vsc"
				
				var cidsID = {
				"Porto" : "fcp",
				"Benfica" : "slb",
				"Sporting" : "scp",
				"Maritimo" : "csm",
				"Braga" : "scb",
				"Olhanense" : "sco",
				"Academica" : "aac",
				"G.Vicente" : "gfc",
				"V.Setubal" : "vfc",
				"V.Guimaraes" : "vsc",
				"Beira-Mar": "scbm",
				"Nacional" : "cdn",
				"Leiria" : "udl",
				"RioAve": "rafc", 
				"P.Ferreira" : "pfc",
				"Feirense": "cdf"	
				};	
				
				var cids = { 
				"Porto" : porto,
				"Benfica" : benfica,
				"Sporting" : sporting,
				"Maritimo" : maritimo,
				"Braga" : braga,
				"Olhanense" : olhanense,
				"Academica" : academica,
				"G.Vicente" : gvicente,
				"V.Setubal" : vsetubal,
				"V.Guimaraes" : vguimaraes,
				"Beira-Mar": beiramar,
				"Nacional" : nacional,
				"Leiria" : leiria,
				"RioAve": rioAve,	
				"P.Ferreira" : pferreira,
				"Feirense": feirense
				};	
				
                var subMinList = [] ;
					
               
				XML.BeginNode("game");
				
				var InfoClubs = document.getElementsByClassName("headerFichaJogo");
				
				var HomeTeamName = tiraAcento(getElementsByClassName(document, 'span', 'branco')[0].textContent).replace(" ", '');
				
				var AwayTeamName = tiraAcento(getElementsByClassName(document, 'span', 'branco')[1].textContent).replace(" ", '');
	
			
				var homeTeam =  document.getElementsByClassName("table1")[0]
				var homeTeamSubs = document.getElementsByClassName("table1")[2]
				var awayTeamLineUp =  document.getElementsByClassName("table1")[1]
				var awayTeamSubs = document.getElementsByClassName("table1")[3]
				
				//Resultado
				var homeScore = document.getElementsByClassName("golosClube left")[0].textContent;
				var awayScore = document.getElementsByClassName("golosClube left")[1].textContent;
				var homePoints=0;
				var awayPoints=3;
				if(homeScore>awayScore){
					homePoints = 3;
					awayPoints = 0;
				}
				if(homeScore==awayScore){
					homePoints = 1;
					awayPoints = 1;
				}
			
				var scoreBoard = homeScore+"-"+awayScore;
				
				var awayTeam = document.getElementById("teamAway");
				var data = document.getElementsByClassName("dia")[0].textContent.split(' ');
				var dia = data[0];
				var meses = { "Agosto" : "08" , "Setembro" : "09" , "Outubro": "10" , "Novembro" : "11"};
				var mes = meses[data[1]];
				var year = "2011";
				
				var stadiumName = document.getElementsByClassName("local left")[0].childNodes[1].textContent.replace("," , '');
				var spectators = document.getElementsByClassName("barGraph left")[6].parentNode.lastChild.textContent.split(' ')[0].replace(".","");

			
				
				
				XML.BeginNode("where");
				XML.WriteString(stadiumName);
				XML.EndNode();
				XML.BeginNode("when");
				XML.WriteString(year+"-"+mes+"-"+dia);
				XML.EndNode();
				XML.BeginNode("n_spectators");
				XML.WriteString(spectators);
				XML.EndNode();
				XML.BeginNode("result");
				XML.WriteString(scoreBoard);
				XML.EndNode();
				XML.BeginNode("playing_teams");
				<!-- HOME TEAM !-->
					XML.BeginNode("home_team");
					XML.Attrib("cid_ref",cidsID[HomeTeamName]);
						XML.BeginNode("starting_lineup")
						var goals;
						var subMinList = new Array();
						var goalsList = new Array();					
						var mySubArray = new Array();
						for(var i =2 ; i<homeTeam.rows.length; i++){
							var mySub = new Object();
							var minSub = 0;
							var minGoal= 0;
							var allGoals = [];
							var number = homeTeam.rows[i].childNodes[0].textContent;
							var pid_ref = cids[HomeTeamName][number];
							var playa = tiraAcento(homeTeam.rows[i].childNodes[1].textContent.replace(' ',''));
							minSub = homeTeam.rows[i].childNodes[4].textContent.replace("'","");
							allGoals = homeTeam.rows[i].childNodes[5].textContent.split("'");
							
							//GOLOS
							if(allGoals.length>1){
								for(var j = 0 ; j < allGoals.length-1;j++){
								minGoal = allGoals[j];
								if(allGoals[j].indexOf("+")!=-1){
								
									var all = allGoals[j].split("+");
									minGoal = parseInt(all[0])+ parseInt(all[1]);
								}
								minGoal = minGoal.toString();
								goals = new goal(pid_ref,minGoal);
								goalsList.push(goals);
								}
							
							}
							
							if(minSub!=0){
								mySub.min = minSub;
								mySub.player = pid_ref;
								
								if(minSub.indexOf("+")!=-1){
									var all = minSub.split("+");
									var totalMIN = parseInt(all[0])+ parseInt(all[1]);
									mySub.min = totalMIN;
									mySub.player = pid_ref;
									mySubArray.push(mySub);
								}
								else{
								mySubArray.push(mySub);
								}
							}
							
							XML.BeginNode("starting_player");
							XML.Attrib("pid_ref",pid_ref);
							XML.EndNode();
						} 
						XML.EndNode();
	
						
						XML.BeginNode("substitutions");
						for(var i =2 ; i<homeTeamSubs.rows.length; i++){
							var allGoals = [];
							var minSub = 0;
							var minGoal= 0;
							var number = homeTeamSubs.rows[i].childNodes[0].textContent;
							var pid_ref = cids[HomeTeamName][number];
							var playa = tiraAcento(homeTeamSubs.rows[i].childNodes[1].textContent.split(' ').join(''));
							minSub = homeTeamSubs.rows[i].childNodes[4].textContent.replace("'","");							
							minGoal = homeTeamSubs.rows[i].childNodes[5].textContent.replace("'","");
							
							allGoals = homeTeamSubs.rows[i].childNodes[5].textContent.split("'");
							
							//GOLOS
							if(allGoals.length>1){
								for(var j = 0 ; j < allGoals.length-1;j++){
								minGoal = allGoals[j];
								if(allGoals[j].indexOf("+")!=-1){
								
									var all = allGoals[j].split("+");
									minGoal = parseInt(all[0])+ parseInt(all[1]);
								}
								minGoal = minGoal.toString();
								goals = new goal(pid_ref,minGoal);
								goalsList.push(goals);
								}
							
							}
												
							if(minSub!=0){
								

								if(minSub.indexOf("+")!=-1){
								
									var all = minSub.split("+");
									minSub = parseInt(all[0])+ parseInt(all[1]);
								}
								
								for(var t = 0; t < mySubArray.length; t++){
									if(mySubArray[t].min == minSub){
										exitP = mySubArray[t].player;
										mySubArray.splice(t,1);
										break;
									}
								}

								
								minSub = minSub.toString();
								XML.BeginNode("substitution");
								XML.Attrib("entered", pid_ref);
								XML.Attrib("left", exitP);
								XML.Attrib("min", minSub);	
								XML.EndNode();
							}
						} 
						XML.EndNode();
	
						
						if(goalsList.length>0){
						XML.BeginNode("goals");
							for(var i = 0 ; i < goalsList.length; i ++){
								XML.BeginNode("goal");
									XML.Attrib("scored_by", goalsList[i].score);
									XML.Attrib("min", goalsList[i].min);	
									XML.EndNode();
							}
						XML.EndNode();
						}
						
						XML.BeginNode("points_earned");
						XML.WriteString(homePoints.toString());						
						XML.EndNode();
						XML.EndNode();
					/*********************************************************

										<!-- AWAY TEAM !--> 

					*********************************************************/
	
					XML.BeginNode("away_team");
					XML.Attrib("cid_ref",cidsID[AwayTeamName]);
						XML.BeginNode("starting_lineup")
						var goals;
						var subMinList = new Array();
						var goalsList = new Array();					
						
						for(var i =2 ; i<awayTeamLineUp.rows.length; i++){
							var minSub = 0;
							var minGoal= 0;
							var allGoals = [];
							var mySub = new Object();
							var number = awayTeamLineUp.rows[i].childNodes[0].textContent;
							var pid_ref = cids[AwayTeamName][number];
							var playa = tiraAcento(awayTeamLineUp.rows[i].childNodes[1].textContent);
							minSub = awayTeamLineUp.rows[i].childNodes[4].textContent.replace("'","");
							minGoal = awayTeamLineUp.rows[i].childNodes[5].textContent.replace("'","");
						allGoals = awayTeamLineUp.rows[i].childNodes[5].textContent.split("'");
							
							//GOLOS
							if(allGoals.length>1){
								for(var j = 0 ; j < allGoals.length-1;j++){

								minGoal = allGoals[j];
								if(allGoals[j].indexOf("+")!=-1){
								
									var all = allGoals[j].split("+");
									minGoal = parseInt(all[0])+ parseInt(all[1]);
								}
								minGoal = minGoal.toString();
								goals = new goal(pid_ref,minGoal);
								goalsList.push(goals);
								}
							
							}
							if(minSub!=0){
								mySub.min = minSub;
								mySub.player = pid_ref;
								
								if(minSub.indexOf("+")!=-1){
									var all = minSub.split("+");
									var totalMIN = parseInt(all[0])+ parseInt(all[1]);
									mySub.min = totalMIN;
									mySub.player = pid_ref;
									mySubArray.push(mySub);
								}
								else{
								mySubArray.push(mySub);
								}
							}
							XML.BeginNode("starting_player");
							XML.Attrib("pid_ref", pid_ref);
							XML.EndNode();
						} 
						XML.EndNode();
						//Subs
						
						XML.BeginNode("substitutions");
						for(var i =2 ; i<awayTeamSubs.rows.length; i++){
							var minSub = 0;
							var minGoal= 0;
							var number = awayTeamSubs.rows[i].childNodes[0].textContent;
							var pid_ref = cids[AwayTeamName][number];
							var playa = tiraAcento(awayTeamSubs.rows[i].childNodes[1].textContent);
							minSub = awayTeamSubs.rows[i].childNodes[4].textContent.replace("'","");
								minGoal = awayTeamSubs.rows[i].childNodes[5].textContent.replace("'","");
							
							if(minGoal!=0){
							
								if(minGoal.indexOf("+")!=-1){
								
									var all = minGoal.split("+");
									minGoal = parseInt(all[0])+ parseInt(all[1]);
								}
								minGoal = minGoal.toString();
								goals = new goal(pid_ref,minGoal);
								goalsList.push(goals);
								 
							}
						if(minSub!=0){
								
								if(minSub.indexOf("+")!=-1){
								
									var all = minSub.split("+");
									minSub = parseInt(all[0])+ parseInt(all[1]);
								}
								
								for(var t = 0; t < mySubArray.length; t++){
									if(mySubArray[t].min == minSub){
										exitP = mySubArray[t].player;
										mySubArray.splice(t,1);
										break;
									}
								}
				
								
							minSub = minSub.toString();
								XML.BeginNode("substitution");
								XML.Attrib("entered", pid_ref);
								XML.Attrib("left", exitP);
								XML.Attrib("min", minSub);	
								XML.EndNode();
							}
						} 
						XML.EndNode();
			
						if(goalsList.length>0){
							XML.BeginNode("goals");
							for(var i = 0 ; i < goalsList.length; i ++){
									
									XML.BeginNode("goal");
									XML.Attrib("scored_by", goalsList[i].score);
									XML.Attrib("min", goalsList[i].min);	
									XML.EndNode();
							}
							XML.EndNode();
						}
					
		

						XML.BeginNode("points_earned");
						XML.WriteString(""+awayPoints);						
						XML.EndNode();
				
				XML.EndNode();
			
				
				
	
                
               
                XML.Close(); // Takes care of unended tags.
                // The replace in the following line are only for making the XML look prettier in the textarea.
                document.getElementsByName("myInput")[0].value=XML.ToString().replace(/</g,"\n<");
            }
            catch(Err)
            {
                alert("Error: " + Err.description);
				 alert("Error: " + Err.message+ "Linha:"+Err.lineNumber);
            }
            return false;
        }
		
		//WriteTest();
		//window.setTimeout("WriteTest()", 20000);