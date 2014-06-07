// ==UserScript==
// @name         [En]MegaUpload DownLoad 05/2009
// @namespace    Angelus76
// @version       1.0
// @description   DownLoad directely or whis proxy.
// @include        *megaupload.com/?d=*
// ==/UserScript==
deletestyle = document.getElementsByTagName('style')[0];
deletestyle.parentNode.removeChild(deletestyle);

function addGlobalStyle(css) {
    var head, style, title;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
document.title = "MegaUpload By Angelus76";

addGlobalStyle(
'body {font-size:small; background-color: #333333; font-family: arial; font-size: 11px; font-weight:bold;}'+
'li { display:inline;}'+
'a{color:#FF6600; font-size:small;}'+
'div#conteneur{ margin: auto; width: 800px; height:600px;}'+ 
'div#bandeau { width:800px;	height:52px; background-color:#CCCCCC;}'+
'div#infoflux{ float:left; width:800px;	height:50px; background-color:#E9E9E9; font-size:small; font-weight:bold; padding-top:10px; text-align:left; margin-bottom:1px;}'+
'div#Config { float:left; width:200px; height:100px; background-color:#CCCCCC; text-align:center;}'+
'div#Iframe { clear:both; width:800px; height:450px; background-color:#CCCCCC; padding-top:10px;}'+
'#Reste{margin-left:-30px; color:#6699CC; font-weight:bold;}'+
'.info{color:#CC0000;}');

// Definition des Lien Original //
var Url = window.location.href;
var page=Url.substring(Url.lastIndexOf("?"));
var Origine = "http://www.megaupload.com/mgr_dl.php"+page;

// Verification des Download Autotmatique restent//
GM_xmlhttpRequest({
  method:"POST",
  url:"http://www.megaupload.com/mgr_bdr.php",
  headers:{
    "User-Agent":"Mozilla/5.0",
	"Content-Type" : "application/x-www-form-urlencoded",
    "Accept":"*/*"
  },
  onload:function(response) {
	  var Download = response.responseText;
	  Dlreste(Download);
  }
});

function Dlreste(Reste){
		document.getElementById('Dlreste').innerHTML = '<span id="Reste">'+Reste+'/3</span>';
	}
// Recuperation des Info Mu //
var TABLE = document.getElementsByTagName("table");
TableInfo = TABLE[3].getElementsByTagName("font");
var Extention = TableInfo[1].innerHTML.substring(TableInfo[1].innerHTML.lastIndexOf("."));
var Nom = TableInfo[1].innerHTML;
var Size = TableInfo[5].innerHTML;
var See = TABLE[4].innerHTML;

// Liste des Proxy Enregistrer //
function ListeUrlProxy(){
var Listetotal = GM_listValues().length;
var OptionGlobal = '<option value="#">Liste of Proxy</option>'+
                   '<option value="http://www.privacy4all.info/">Proxy Global 1</option>'+
				   '<option value="http://www.bbcproxy.info/">Proxy Global 2</option>'+
				   '<option value="http://afspy.info/">Proxy Global 3</option>';
UrlListe = '';
var a = 1;
for(e=0; e<Listetotal; e++){
	if(GM_getValue("Proxy_"+e)){
	UrlListe = UrlListe+'<option value="'+GM_getValue("Proxy_"+e)+'">Your Proxy '+a+'</option>';
	a++;
	}
}
return OptionGlobal+UrlListe;
}
// Réecriture de la Page //
var NewPage = '<div id="conteneur">'+
'<div id="bandeau">'+
'<ul><li><img src="http://tmnmap.free.fr/Img/voire.jpg" id="Voire" /></li>'+
'<li><img src="http://tmnmap.free.fr/Img/telecharger.jpg" id="Telecharger" /><span id="Dlreste"></span></li>'+
'<li><img src="http://tmnmap.free.fr/Img/config.jpg" id="DivConfig" /></li>'+
'<li><img src="http://tmnmap.free.fr/Img/stat.jpg" id="Stats" /></li>'+
'<li><img src="http://tmnmap.free.fr/Img/refresh.jpg" id="RefreshPage" /></li>'+
'<li><img src="http://tmnmap.free.fr/Img/finmenu.jpg" /></li></ul>'+
'</div> <div id="infoflux">'+
'<p> Nom : <span class="info">'+Name+'</span> | Size : <span class="info">'+Size+'</span> | Extention : <span class="info">'+Extention+'</span><br>Url a Copier/Coller : <span class="info">'+Origine+'</span></p>'+
'</div> <div id="Config" style="display:none;">'+
'<a href="#" id="AffConfig">Setting</a>/<a href="#" id="AddProxy">Add Proxy</a> ( <span id="Register">'+GM_getValue("ProxyId")+'</span> )'+
'<div id="configScritpt" style="display:none;">'+
'Comin soon...'+
'</div> <div id="addProxy" style="display:none;">'+
'<p><label for="UrlProxyAdd">Url : <input type="text" id="UrlProxyAdd" /></label><br />'+
'<input type="submit" value="Add" id="AddNewProxy" /></p>'+
'</div> </div> <div id="Iframe"><div style="padding-left:10Px;">'+
'Use Proxy ?: <select onchange="document.getElementById(\'proxyurl\').src= this.value;">'+
ListeUrlProxy()+'</select></div>'+
'<iframe src="#" id="proxyurl" width="100%" frameborder="0" height="450" marginheight="10" marginwidth="10" align="middle">'+
'</iframe>'+
'</div> </div>';

document.body.innerHTML=NewPage;

// Liste des ecouteur //
var Voire = document.getElementById("Voire");
	Voire.addEventListener("click",Voires,false);
function Voires(){
	var regvoire= See.replace(/([^\]]*)<a href="([^\]]*)" target="_blank">([^\]]*)/mig,'$2');
		  location.href = regvoire;
		  //alert(regvoire);
}
var Telecharger = document.getElementById("Telecharger");
	Telecharger.addEventListener("click",Telechargers,false);
function Telechargers(){
	location.href = Origine;
	//alert(Origine);
}
var DivConfig = document.getElementById("DivConfig");
	DivConfig.addEventListener("click",DivConfigs,false);
function DivConfigs(){
	if(document.getElementById('Config').style.display == "none"){
            document.getElementById('Config').style.display = "block"; 
            document.getElementById('infoflux').style.width="600px";
			document.getElementById('infoflux').style.height="90px";
	  }
    else{
            document.getElementById('Config').style.display = "none"; 
            document.getElementById('infoflux').style.width="800px";
			document.getElementById('infoflux').style.height="50px";			
	      }
}
var Stats = document.getElementById("Stats");
	Stats.addEventListener("click",Statss,false);
function Statss(){
	alert('Comin soon');
}
var RefreshPage = document.getElementById("RefreshPage");
	RefreshPage.addEventListener("click",RefreshPages,false);
function RefreshPages(){
	alert('Comin soon');
}
var AffConfig = document.getElementById("AffConfig");
	AffConfig.addEventListener("click",AffConfigs,false);
function AffConfigs(){
		document.getElementById('configScritpt').style.display = "block";
        document.getElementById('addProxy').style.display = "none";
}
var AddProxy = document.getElementById("AddProxy");
	AddProxy.addEventListener("click",AddProxys,false);
function AddProxys(){
		document.getElementById('configScritpt').style.display = "none";
       document.getElementById('addProxy').style.display = "block";
}
var AddNewProxy = document.getElementById("AddNewProxy");
	AddNewProxy.addEventListener("click",AddNewProxys,false);
function AddNewProxys(){
	var UrlValue = document.getElementById('UrlProxyAdd');
            if(UrlValue.value != ""){
				GM_setValue("ProxyId", GM_getValue("ProxyId", 0) + 1);
				GM_setValue("Proxy_"+GM_getValue("ProxyId"), UrlValue.value);
				var Register = document.getElementById("Register").innerHTML;
				document.getElementById("Register").innerHTML = parseInt(Register,10)+1;
                UrlValue.value = "";
             }
            else{
              alert("The field is empty ! ");
            }
}