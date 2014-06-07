// ==UserScript==
// @name           EstadistiquesUoc
// @namespace      campus.uoc.es
// @include        http://cv.uoc.edu/*cgi-bin/ma_buttons*
// @include        http://cv.uoc.edu/*cgi-bin/ma_folders*
// @include        http://cv.uoc.edu/*cgi-bin/ma_mssgs*
// @include				 http://cv.uoc.edu/webapps/classroom/032_common/menu.jsp*
// ==/UserScript==
//*******************************   GLOBALS
///UOC/mc-icons/mail/file_upload.gif
//http://cv.uoc.edu/webapps/classroom/032_common/users.jsp?s=fbf0385a700c93886a9469d71253857da4e7962ed848088d4e87b2b0e59e998bbc4a9d3e9e9ae2deae8bdcf630c6e3b1a649b1587cbf080b2a0c5bfc8e7dc44c&domainId=170060&domainsId=170060&appId=UOC&idLang=a
//http://cv.uoc.edu/webapps/classroom/032_common/menu.jsp?s=fbf0385a700c93886a9469d71253857da4e7962ed848088d4e87b2b0e59e998bbc4a9d3e9e9ae2deae8bdcf630c6e3b1a649b1587cbf080b2a0c5bfc8e7dc44c&domainId=170060



const KEY_CARPETAS='_Carpetas';
const KEY_SESSION='_SessionId';
const KEY_LOGIN='_Login';
const KEY_USER='_UserId';
const KEY_NUMMSGS='_NumMsgPerPag';
const KEY_URLMSGS='_UrlMsgs';
const KEY_DOMAINID='_DomainId';
const NUM_TAULA_BOTONERA="document.getElementsByTagName('TABLE')[5]";
const DESCRIPCIO_BOTO='Estadístiques';
//*******************************   NAVEGACIO
const PAG_UNDEF=0;
const PAG_INFO_CARPETAS=1;
const PAG_HTML_CARPETAS=2;
const PAG_HTML_BUTTONS=3;
const PAG_HTML_MSGS=4;
const PAG_MENU_AULA=5;
var ENTRADAAULA=false;


function QuinaPagina(aWnd)
{
	switch(aWnd.name.toUpperCase())
	{
	
		case 'FRM_FOLDERS':  								
  		if (unsafeWindow.aFoldersArray) {return PAG_INFO_CARPETAS};
  		break
		case 'DATA': 						
			if (aWnd.document.forms&&aWnd.document.forms.length==1&&aWnd.document.forms[0].name=='folders'){return PAG_HTML_CARPETAS;}			
  		break
  	case 'FRM_BUTTONS':
  		if (aWnd.document.forms&&aWnd.document.forms.length==2&&aWnd.document.forms[0].name=='buttons'){return PAG_HTML_BUTTONS;}  		
  		break
  	case 'FRM_MSSGS':
  		if (unsafeWindow.blockSize) {return PAG_HTML_MSGS;}
  		break
  	case 'CL_MENU':
  		if (unsafeWindow.domainId) {return PAG_MENU_AULA;}
		default:				
		  return PAG_UNDEF;
  		break
	}
}

//*******************************   UTILITATS
function SortByPath(a,b) { return a.path!=b.path ? a.path<b.path ? -1 : 1 : 0;}

function Crea_Element(aObj,aDoc,aParent)
{
	var iEle;	
	if (typeof aObj=='string')
	{
		iEle=aDoc.createTextNode(aObj);
	}else{
		iEle=aDoc.createElement(aObj.n);
		if (aObj.n)
		{
			iAttr=aObj.a;
			for (var iKey in iAttr)
			{
				if (iKey.charAt(0)=='@')
				{
					iEle.setAttribute(iKey.substring(1),iAttr[iKey]);
				}else{
					iEle[iKey]=iAttr[iKey];
				}
			}
		}
		if (aObj.evl){iEle.addEventListener(aObj.evl.type,aObj.evl.f,aObj.evl.bubble);}
		if (aObj.c)	{iEle.c.forEach(function (v,i,a){Crea_Element(v,iEle);})}		
	}
	if (aParent){	aParent.appendChild(iEle);}
	return iEle;
}
//*******************************  DATA
function getCarpetasArray(){return eval(GM_getValue(KEY_CARPETAS,'({})'));}
function getSessionId(){return GM_getValue(KEY_SESSION,'');}
function getLogin(){return GM_getValue(KEY_LOGIN,'');}
function getUser(){return GM_getValue(KEY_USER,'');}
function getNumMsgs(){return GM_getValue(KEY_NUMMSGS,0);}
function getUrlMsgs(){return GM_getValue(KEY_URLMSGS,'');}
function getDomainId() {return GM_getValue(KEY_DOMAINID,'');}
//*******************************   Alumnes
//(Request-Line):GET /cgi-bin/domainstatistics?s=7b3358ea602c43a7ba955980727a950644b7968778f9d848fead32c2b53269158c592d254e1db2780ecdbcefa055b3e50612d1c2fcf3c81ffa4c0b11be89843a&c=061_10_000_03&sort=name HTTP/1.1
//Accept:image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/x-shockwave-flash, application/vnd.ms-powerpoint, application/vnd.ms-excel, application/msword, */*
//Accept-Language:es
//Accept-Encoding:gzip, deflate
//User-Agent:Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)
//Host:cv.uoc.edu
//Connection:Keep-Alive
//Cookie:a2aa55c54260945353a2e8687d342c26=90d25d58303f1a7e5762b1ac70dce147; BALANCERID=balancer.belize; __utma=181554083.669536022.1187273008.1189066049.1189154174.7; __utmb=181554083; __utmz=181554083.1187273008.1.1.utmccn=(direct)|utmcsr=(direct)|utmcmd=(none); __utmc=181554083
//*******************************   INTERFAZ

function Tkonmouseout()
{
	self.status="";
	return true
}
function Tkonmouseover()
{
	self.status=DESCRIPCIO_BOTO;
	return true
}
function InsertaBoto()
{
	iTbl=eval(NUM_TAULA_BOTONERA);
	var iCell=iTbl.rows[0].insertCell(0);
	var iLnkCopia=iTbl.rows[0].cells[2].getElementsByTagName('a')[0];
	iCell.className=iCellModel=iTbl.rows[0].cells[2].className;
	var iObj={n:'a',a:{'@class':iTbl.rows[0].cells[3].getElementsByTagName('a')[0].className,'@href':'#'},evl:{type:'click',f:function(){NovaFinestra();}}};	
	var iLink=Crea_Element(iObj,document,iCell);		
	
	iImgBase="data:image/gif,GIF89a%10%00%10%00%E6%00%00%00f%00%91%CC%8Cr%98X%ED%F1%EC%5C%7D%3E%D5%DF%D2F%5CHy%B2j%C4%DC%C5%5E%9AJ8m.G%89%26pyr%86%B4%80%5E%8DQ%AA%CF%AC%F8%FC%F7%83%AEr%E1%E8%DFG%7B%3A%25s%1BL%91G8%876f%99f%92%B9%82fffi%91D%90%C4%84L%89DFt%3Cu%A4e~%9Fqo%AAdW%88F%A9%B3%9D%7C%BC%7B%1B%60%14%B5%D2%B4%F4%F6%F2%E2%EF%E0%C9%E5%C2%24w%2B%D9%EB%D5%8F%A3%83%99%CC%99g%99UR%87D%3E%8F5A~%3Bd%82bv%A7h%80%90vg%91XV%9CQ%86%BF%82%89%B8v%FF%FF%FFShS%E7%F6%E9%D5%E6%D3I%9DA%8D%C9z7s%2CX%92B%5D%A7X%1Al%16%CF%DE%CE%D1%E5%CF%F7%EF%F7w%ADlD%9E8%1D%80%1B%83%B2sc%A4ea%85Ky%8D%7DPp%40%EB%F5%EA%89%9Bzm%BD%60%60%88Q%9A%C3%85%E5%E8%E4%90%C0%80%BE%DA%BE%8D%C3%89o%9AaL%88%2F%E0%EF%DF%B0%D4%A4%A6%CA%A8T%89Q%D1%EB%CA%84%BDu%DA%E9%D8F%872i%95NB%837k%A5k%CC%DB%C8%8E%B2%89%F7%F5%F9%D3%E6%CFf%99Udsgn%B4i_%8CF*l%2BR%A2Nd%A5O%7B%A2k%AC%D4%AA%EF%F6%EF%91%B9%89R%8DEHwD%CE%E6%D6~%ABnk%9BZW%94H%3Dt4R%84J%85%B3%7F%98%C5%8D%E1%EF%D8f%93U%E6%F0%E5y%B5u!%F9%04%04%14%00%FF%00%2C%00%00%00%00%10%00%10%00%00%07%F5%80SSHuu%1EV%02%60%0E%0EJ%04ssL%18oo%2C%2C%7B%7BQqz7%11%1E%9En%92p%26%A3%A4%03'%A7~%3BvHo%108%AF%B0%B18%12-u%2C8Y%5D%1B2c8c1NN%22%03%7D%11%B756%5Dmu%2B%1F%09wAAp4%1E%7B%10%08IU%01%40%13wOG%00%0F*%60VQ%268%25I6%23l%3F%14GT8C%1A%02q%03%E7%7F%2F%5D%07r%240CZT%A8%01%D3%E0%04%0E.%3D%8C%F0(%22%86%83%02%3Cd%BC%B8pp%A3%09%8A0%3E%5C%90H%91%06D%05%05%2B%BC%84P%12%01N%80%18h%D00%98caK%875%0AN%B8%20%E0%01%8B%2C%3E3%0C%E4%C8%B1%C4%CB%979%1E%FC%94)%E3%A7%A8%0E%08H%91%0A%F9%C2%C4M%01)%3B%86H%15B%B5*%95%05M%ED%9C9C%83%86%065.B%84%F8%F2e%C1%95%40%00%3B";
	var iObj={n:'img',a: {'@src':iImgBase,'@height':'12','@width':'12','@border':'0','@align':'middle'}};
	var iImg=Crea_Element(iObj,document,iLink);
	var iTxt=Crea_Element('  '+DESCRIPCIO_BOTO,document,iLink);		
	//iLink.onmouseout=Tkonmouseout;
	//iLink.onmouseover=Tkonmouseover;	
	return true;
}

function getScript()
{

	var iCad='<script type="application/javascript" charset="ISO-8859-1">'+'\n';
	iCad=iCad+'var SessionId="'+getSessionId()+'";'+'\n';	
	iCad=iCad+'var DomainId="'+getDomainId()+'";'+'\n';
	iCad=iCad+'var ArrayMissatges=new Array;'+'\n';
	iCad=iCad+'var Login="'+getLogin()+'";'+'\n';
	iCad=iCad+'var ArrayCarpetes='+uneval(getCarpetasArray())+';'+'\n';
	iCad=iCad+'var NumMsg="'+getNumMsgs()+'";'+'\n';
	iCad=iCad+'var UrlMsg="'+getUrlMsgs()+'";'+'\n';
	iCad=iCad+'var Orden="";'+'\n';
	iCad=iCad+'var TxtPrg="";'+'\n';
	iCad=iCad+'var IDINTERVAL;'+'\n';	
	iCad=iCad+'var CARPETESSELECCIONADES=new Array;'+'\n';	
	iCad=iCad+'var AutoFiltre=false;'+'\n';
	iCad=iCad+'var ArrayColumnes=new Array;'+'\n';
	iCad=iCad+'var Agrupacion="*|*";'+'\n';
	iCad=iCad+'var Agrupado=false;'+'\n';
	iCad=iCad+'var ArrayAlumnes=new Array;'+'\n';
	iCad=iCad+'var ArrayGrups=new Array;'+'\n';
	iCad=iCad+'var CLIPBOARD="";'+'\n';
	iCad=iCad+'var vbCr = "\\r";'+'\n';
	iCad=iCad+'var vbLf = "\\n";'+'\n';
	iCad=iCad+'var vbCrLf = vbCr+vbLf;'+'\n';
	iCad=iCad+'var vbTab = "\\t";'+'\n';
	
	
	iCad=iCad+'function Columna(aId,aTitol,aPropietat,aFiltre,aOrdre,aFuncOrdre,aFuncOrdreDesc){'+'\n';		
	iCad=iCad+'this.Id=aId;'+'\n';
	iCad=iCad+'this.Titol=aTitol;'+'\n';
	iCad=iCad+'this.Propietat=aPropietat;'+'\n';
	iCad=iCad+'this.Filtre=aFiltre;'+'\n';
	iCad=iCad+'this.Ordre=aOrdre;'+'\n';
	iCad=iCad+'this.FuncOrdre=aFuncOrdre;'+'\n';
	iCad=iCad+'this.FuncOrdreDesc=aFuncOrdreDesc;'+'\n';
	iCad=iCad+'this.Visible=true;'+'\n';
	iCad=iCad+'this.IsLink=false;'+'\n';
	iCad=iCad+'this.IsImatge=false;'+'\n';
	iCad=iCad+'this.Agrupador=true;'+'\n';
	iCad=iCad+'this.Agrupat=false;'+'\n';
	iCad=iCad+'this.TextLink="";'+'\n';
	iCad=iCad+'this.ArrayLinks=false;'+'\n';
	iCad=iCad+'this.Link="";'+'\n';
	iCad=iCad+'this.IncOrdre=function (){if (this.Ordre=="+") {this.Ordre="-";} else {this.Ordre="+";}}'+'\n';
	iCad=iCad+'return this;'+'\n';	
	iCad=iCad+'}'+'\n';



	iCad=iCad+'function ToExcel(){;'+'\n';		
	iCad=iCad+'	if (CLIPBOARD!="") window.open("data:application/vnd.ms-excel;base64,"+btoa(CLIPBOARD.replace(/###/gi,"\\n")));'+'\n';
	iCad=iCad+'	}'+'\n';	
	//iCad=iCad+'window.open("data:application/vnd.ms-excel;base64,"+btoa(iCad));'+'\n';
	//iCad=iCad+'window.open("data:application/vnd.ms-excel;base64,"+btoa(iCad));'+'\n';
	//iCad=iCad+'	oExcel.Visible = true;'+'\n';	
	//iCad=iCad+'	oExcel.UserControl = true;'+'\n';	
	//iCad=iCad+'}'+'\n';	
	//iCad=iCad+'}'+'\n';	

	iCad=iCad+'function GetObjFromId(aCol,aId){'+'\n';		
	iCad=iCad+'var iCad="";iCad=aId.toUpperCase();'+'\n';	
	iCad=iCad+'for (var i=0;i<aCol.length;i++){if (iCad==aCol[i].Id.toUpperCase()){return i;}}'+'\n';
	iCad=iCad+'return -1;'+'\n';	
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function GetObjFromid(aCol,aId){'+'\n';		
	iCad=iCad+'var iCad="";iCad=aId.toUpperCase();'+'\n';	
	iCad=iCad+'for (var i=0;i<aCol.length;i++){if (iCad==aCol[i].id.toUpperCase()){return i;}}'+'\n';
	iCad=iCad+'return -1;'+'\n';	
	iCad=iCad+'}'+'\n';


	iCad=iCad+'function GetObjFromProp(aCol,aProp){'+'\n';		
	iCad=iCad+'var iCad="";iCad=aProp.toUpperCase();'+'\n';	
	iCad=iCad+'for (var i=0;i<aCol.length;i++){if (iCad==aCol[i].Propietat.toUpperCase()){return i;}}'+'\n';
	iCad=iCad+'return -1;'+'\n';	
	iCad=iCad+'}'+'\n';
	
		
	iCad=iCad+'function IndexByProp(aArray,aProp){'+'\n';		
	iCad=iCad+'var iArr0=new Array;'+'\n';
	iCad=iCad+'for (var i=0;i<aArray.length;i++){'+'\n';
	iCad=iCad+'	eval("var iCad=aArray[i]."+aProp);'+'\n';
	iCad=iCad+'	iArr0[iCad]=aArray[i];'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'return iArr0;'+'\n';	
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function Alumne(aId,Nom){'+'\n';		
	iCad=iCad+'this.Id=aId;'+'\n';
	iCad=iCad+'this.UltimaConnexioAula=null;'+'\n';
	iCad=iCad+'this.UltimaConnexioCampus=null;'+'\n';
	iCad=iCad+'this.Nom=Nom;'+'\n';
	iCad=iCad+'this.TipusUsuari="";'+'\n';
	iCad=iCad+'this.UrlImg="";'+'\n';
	iCad=iCad+'this.UserId=aId;'+'\n';
	iCad=iCad+'this.EnviaMissatge="";'+'\n';
	iCad=iCad+'this.Perfil="";'+'\n';
	iCad=iCad+'this.Grup="";'+'\n';
	iCad=iCad+'return this;'+'\n';	
	iCad=iCad+'}'+'\n';
	
	
	iCad=iCad+'function AssignGrups(){'+'\n';		
	iCad=iCad+'var iArrAls=GetArrayAlumnes();var iArr1=new Array;var iArr=new Array;iArr=GetArrayGrups();'+'\n';	
	iCad=iCad+'for (var i=0;i<iArr.length;i++) {'+'\n';
	iCad=iCad+'	iArr1=RecuperaGrup(iArr[i]);'+'\n';	
	iCad=iCad+'	for (var j=0;j<iArr1.length;j++){'+'\n';	
	iCad=iCad+'		var iNum=-1;'+'\n';
	iCad=iCad+'		iNum=GetAlumneFromNom(iArr1[j]);'+'\n';
	iCad=iCad+'		if (iNum>-1) iArrAls[iNum].Grup=iArr[i].title;'+'\n';	
	iCad=iCad+'	}'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function LTrim(str) {if (str==undefined||str==""||typeof(str)!="string") return "";	for (var k=0; k<str.length && str.charAt(k)<=" " ; k++) ;return str.substring(k,str.length);}'+'\n';
	iCad=iCad+'function RTrim(str) {if (str==undefined||str==""||typeof(str)!="string") return "";for (var j=str.length-1; j>=0 && str.charAt(j)<=" " ; j--) ;return str.substring(0,j+1);}'+'\n';
	iCad=iCad+'function trim(str) {return LTrim(RTrim(str));}'+'\n';
	
	
	
	
	iCad=iCad+'function RecuperaGrup(aGrup){'+'\n';				
	iCad=iCad+'var iObj=GetNewReq();'+'\n';
	iCad=iCad+'iObj.open("GET", encodeURI(aGrup.GetUrlAdmin()), false);'+'\n';	
	iCad=iCad+'iObj.setRequestHeader("User-agent", "Mozilla/5.0 (Windows; U; Windows NT 5.1; es-ES; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6");'+'\n';
	iCad=iCad+'iObj.setRequestHeader("Accept", "*/*");'+'\n';	
	iCad=iCad+'iObj.setRequestHeader("Host", "cv.uoc.edu");'+'\n';		
	iCad=iCad+'iObj.send();'+'\n';
	iCad=iCad+'if (iObj.status != 200) return null;'+'\n';
	iCad=iCad+'iCad=iObj.responseText;'+'\n';
	iCad=iCad+'var iCad1="<SELECT NAME=" + String.fromCharCode(34) + "selectName"+String.fromCharCode(34);'+'\n';
	iCad=iCad+'if (iCad.indexOf(iCad1)==-1) return null;'+'\n';
	iCad=iCad+'var iArr1=new Array;var iArr=new Array;iArr=iCad.split(iCad1);iCad=trim(iArr[1].split("</SELECT>")[0]);iArr=iCad.split("<OPTION>");iArr.splice(0,1);'+'\n';		
	iCad=iCad+'		for (var i=0;i<iArr.length;i++) {'+'\n';	
	iCad=iCad+'			if (iArr[i].indexOf("</OPTION>")>-1) {iArr[i]=trim(iArr[i].replace("</OPTION>",""));}'+'\n';			
	iCad=iCad+'		}'+'\n';			      	     
	iCad=iCad+'return iArr;'+'\n';			
	iCad=iCad+'}'+'\n';



	iCad=iCad+'function Grup(aSes){'+'\n';		
	iCad=iCad+'this.SessionId=aSes;'+'\n';
	iCad=iCad+'this.title="";'+'\n';
	iCad=iCad+'this.code="";'+'\n';
	iCad=iCad+'this.domainid="";'+'\n';
	iCad=iCad+'this.domaintypeid="";'+'\n';
	iCad=iCad+'this.domainfatherid="";'+'\n';	
	iCad=iCad+'this.GetUrlAdmin=function (){ return "/cgi-bin/admgr?s="+this.SessionId+"&domType="+this.domaintypeid+"&code="+this.code+"&assType=ESTUDIANT&domFather="+this.domainfatherid+"&opId=list";}'+'\n';	
	iCad=iCad+'return this;'+'\n';	
	iCad=iCad+'}'+'\n';
	
	
	iCad=iCad+'function GetArrayGrups(){'+'\n';	
	iCad=iCad+'var iArrGr=new Array;'+'\n';
	iCad=iCad+'if (ArrayGrups.length==0){'+'\n';
	iCad=iCad+'	iFrm=$("FrmGrups");'+'\n';
	iCad=iCad+'	if (iFrm){'+'\n';	
	iCad=iCad+'		var iArr=window.frames[2].aulas;'+'\n';
	iCad=iCad+'		for (var i=0;i<iArr.length;i++){'+'\n';
	iCad=iCad+'			var iGrup=new Grup(SessionId);iGrup.title=iArr[i].title;iGrup.code=iArr[i].code;iGrup.domainid=iArr[i].domainid;iGrup.domaintypeid=iArr[i].domaintypeid;iGrup.domainfatherid=iArr[i].domainfatherid;'+'\n';
	iCad=iCad+'			ArrayGrups[ArrayGrups.length]=iGrup;'+'\n';		
	iCad=iCad+'		}'+'\n';
	iCad=iCad+'	}'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'for (var i=0;i<ArrayGrups.length;i++){'+'\n';
	iCad=iCad+'	iArrGr[iArrGr.length]=ArrayGrups[i];'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'return iArrGr;'+'\n';
	iCad=iCad+'}'+'\n';	
	
	
	iCad=iCad+'function GetArrayAlumnes(){'+'\n';	
	iCad=iCad+'var iArrNew=new Array;'+'\n';	
	iCad=iCad+'if (ArrayAlumnes.length==0){'+'\n';
	iCad=iCad+'	iFrm=$("FrmMembres");'+'\n';
	iCad=iCad+'	if(iFrm){'+'\n';
	iCad=iCad+'		for (var i=0;i<window.frames[1].usersDomainName.length;i++){'+'\n';
	iCad=iCad+'   	var iNom=window.frames[1].usersDomainName[i];'+'\n';
	iCad=iCad+'   	var iTipus=window.frames[1].usersDomainType[i];'+'\n';
	iCad=iCad+'   	var iUserId=window.frames[1].usersDomainLogin[i];'+'\n';
	iCad=iCad+'   	var iEnviaMsg=window.frames[1].usersDomainSendmess[i];'+'\n';
	iCad=iCad+'   	var iPerfil=window.frames[1].usersDomainResume[i];'+'\n';
	iCad=iCad+'   	var iAl=new Alumne(iUserId,iNom);'+'\n';
	iCad=iCad+'   	iAl.TipusUsuari=iTipus;'+'\n';
	iCad=iCad+'   	iAl.EnviaMissatge=iEnviaMsg;'+'\n';
	iCad=iCad+'   	iAl.Perfil=iPerfil;'+'\n';	
	iCad=iCad+'   	iAl.UrlImg="http://cv.uoc.edu/UOC/mc-icons/fotos/"+iUserId+".jpg"'+'\n';
	iCad=iCad+'			ArrayAlumnes[ArrayAlumnes.length]=iAl;'+'\n';	
	iCad=iCad+'		}'+'\n';
	iCad=iCad+'		for (var i=0;i<window.frames[1].responsableDomainName.length;i++){'+'\n';
	iCad=iCad+'   	var iNom=window.frames[1].responsableDomainName[i];'+'\n';
	iCad=iCad+'   	var iTipus=window.frames[1].responsableDomainType[i];'+'\n';
	iCad=iCad+'   	var iUserId=window.frames[1].responsableDomainLogin[i];'+'\n';
	iCad=iCad+'   	var iEnviaMsg=window.frames[1].responsableDomainSendmess[i];'+'\n';
	iCad=iCad+'   	var Perfil=window.frames[1].responsableDomainResume[i];'+'\n';
	iCad=iCad+'   	var iAl=new Alumne(iUserId,iNom);'+'\n';
	iCad=iCad+'   	iAl.TipusUsuari=iTipus;'+'\n';
	iCad=iCad+'   	iAl.EnviaMissatge=iEnviaMsg;'+'\n';
	iCad=iCad+'   	iAl.Perfil=iPerfil;'+'\n';	
	
	iCad=iCad+'			ArrayAlumnes[ArrayAlumnes.length]=iAl;'+'\n';	
	iCad=iCad+'		}'+'\n';
	iCad=iCad+'		iFrm=$("FrmAlumnes");'+'\n';
	iCad=iCad+'		if(iFrm){'+'\n';
	iCad=iCad+'			var iArr2=new Array;iArr2=IndexByProp(ArrayAlumnes,"Nom");'+'\n';
	iCad=iCad+'   	var iTbl=iFrm.contentWindow.document.getElementsByTagName("table")[4];'+'\n';
	iCad=iCad+'   	if (iTbl!=undefined){'+'\n';
	iCad=iCad+'   		for (var i=1;i<iTbl.rows.length;i++){'+'\n';
	iCad=iCad+'   			var iNom=iTbl.rows[i].cells[0].getElementsByTagName("a")[0].innerHTML;'+'\n';	
	iCad=iCad+'   			if (iArr2[iNom]){'+'\n';	
	iCad=iCad+'   				iArr2[iNom].UltimaConnexioAula=iTbl.rows[i].cells[1].getElementsByTagName("span")[0].innerHTML;'+'\n';
	iCad=iCad+'   				iArr2[iNom].UltimaConnexioCampus=iTbl.rows[i].cells[2].getElementsByTagName("span")[0].innerHTML;'+'\n';
	iCad=iCad+'   			}'+'\n';
	iCad=iCad+'   		}'+'\n';
	iCad=iCad+'   	}'+'\n';
	iCad=iCad+'		}'+'\n';
	iCad=iCad+'	}'+'\n';
	iCad=iCad+'	AssignGrups();'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'for (var i=0;i<ArrayAlumnes.length;i++){iArrNew[iArrNew.length]=ArrayAlumnes[i];}'+'\n';	
	iCad=iCad+'return iArrNew;'+'\n';	
	iCad=iCad+'}'+'\n';
	
	
	iCad=iCad+'function Converteix(aCad){'+'\n';
	iCad=iCad+'var iCad=escape(aCad);iR=/%u[A-Z0-9]{4}/gi;'+'\n';	
	iCad=iCad+'iCad=String(iCad).replace(iR,".");'+'\n';
	iCad=iCad+'return unescape(iCad);'+'\n';
	iCad=iCad+'}'+'\n';
	
	
	
	
	iCad=iCad+'function GetAlumneFromNom(aNom){'+'\n';	
	iCad=iCad+'iArrAls=GetArrayAlumnes();'+'\n';		
	
	iCad=iCad+'iNom=Converteix(aNom);'+'\n';	
	iCad=iCad+'var re=new RegExp(iNom,"ig");'+'\n';			
	iCad=iCad+'for (var i=0;i<iArrAls.length;i++){if (re.test(String(iArrAls[i].Nom))){return i;}}'+'\n';		
	iCad=iCad+'return -1;'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function GetArrayColumnes(){'+'\n';	
	
	iCad=iCad+'if (ArrayColumnes.length==0){'+'\n'; 	
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.Num!=b.Num ? a.Num<b.Num ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.Num!=b.Num ? a.Num>b.Num ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="Num";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);ArrayColumnes[ArrayColumnes.length-1].Agrupador=false;'+'\n';
	
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.NomCarpeta!=b.NomCarpeta ? a.NomCarpeta<b.NomCarpeta ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.NomCarpeta!=b.NomCarpeta ? a.NomCarpeta>b.NomCarpeta ? -1 : 1 : 0;}'+'\n';	
	iCad=iCad+'   var iId="NomCarpeta";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.Tema!=b.Tema ? a.Tema<b.Tema ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.Tema!=b.Tema ? a.Tema>b.Tema ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="Tema";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';

	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.UrlImg!=b.UrlImg ? a.UrlImg<b.UrlImg ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.UrlImg!=b.UrlImg ? a.UrlImg>b.UrlImg ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="UrlImg";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);ArrayColumnes[ArrayColumnes.length-1].IsImatge=true;'+'\n';


	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.Autor!=b.Autor ? a.Autor<b.Autor ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.Autor!=b.Autor ? a.Autor>b.Autor ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="Autor";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';
	
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.FechaTxt!=b.FechaTxt ? a.FechaTxt<b.FechaTxt ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.FechaTxt!=b.FechaTxt ? a.FechaTxt>b.FechaTxt ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="Fecha";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';
	
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.Hora!=b.Hora ? a.Hora<b.Hora ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.Hora!=b.Hora ? a.Hora>b.Hora ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="Hora";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';
	
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.Semana!=b.Semana ? a.Semana<b.Semana ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.Semana!=b.Semana ? a.Semana>b.Semana ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="Semana";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';	
	
	iCad=iCad+'   var iFuncOrdre=function (a,b){return parseInt(a.TotalAgrupat)!=parseInt(b.TotalAgrupat) ? parseInt(a.TotalAgrupat)<parseInt(b.TotalAgrupat) ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return parseInt(a.TotalAgrupat)!=parseInt(b.TotalAgrupat) ? parseInt(a.TotalAgrupat)>parseInt(b.TotalAgrupat) ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="TotalAgrupat";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);ArrayColumnes[ArrayColumnes.length-1].Visible=false;ArrayColumnes[ArrayColumnes.length-1].Agrupador=false;ArrayColumnes[ArrayColumnes.length-1].Agrupat=true;'+'\n';
	
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.Msggrupats!=b.Msggrupats ? a.Msggrupats<b.Msggrupats ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.Msggrupats!=b.Msggrupats ? a.Msggrupats>b.Msggrupats ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="Msggrupats";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);ArrayColumnes[ArrayColumnes.length-1].Visible=false;ArrayColumnes[ArrayColumnes.length-1].Agrupador=false;ArrayColumnes[ArrayColumnes.length-1].Agrupat=true;ArrayColumnes[ArrayColumnes.length-1].ArrayLinks=true;ArrayColumnes[ArrayColumnes.length-1].IsLink=true;ArrayColumnes[ArrayColumnes.length-1].TextLink="TextLink";ArrayColumnes[ArrayColumnes.length-1].Link="LinkMissatge";'+'\n';
	
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.TipusUsuari!=b.TipusUsuari ? a.TipusUsuari<b.TipusUsuari ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.TipusUsuari!=b.TipusUsuari ? a.TipusUsuari>b.TipusUsuari ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="TipusUsuari";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';
	
	
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.UserId!=b.UserId ? a.UserId<b.UserId ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.UserId!=b.UserId ? a.UserId>b.UserId ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="UserId";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';
	
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.UltimaConnexioAula!=b.UltimaConnexioAula ? a.UltimaConnexioAula<b.UltimaConnexioAula ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.UltimaConnexioAula!=b.UltimaConnexioAula ? a.UltimaConnexioAula>b.UltimaConnexioAula ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="UltimaConnexioAula";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';
		
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.UltimaConnexioCampus!=b.UltimaConnexioCampus ? a.UltimaConnexioCampus<b.UltimaConnexioCampus ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.UltimaConnexioCampus!=b.UltimaConnexioCampus ? a.UltimaConnexioCampus>b.UltimaConnexioCampus ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="UltimaConnexioCampus";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';

	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.Fil!=b.Fil ? a.Fil<b.Fil ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.Fil!=b.Fil ? a.Fil>b.Fil ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="Fil";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';

	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.MsgPare!=b.MsgPare ? a.MsgPare<b.MsgPare ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.MsgPare!=b.MsgPare ? a.MsgPare>b.MsgPare ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="MsgPare";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';

	
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.LinkMissatge!=b.LinkMissatge ? a.LinkMissatge<b.LinkMissatge ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.LinkMissatge!=b.LinkMissatge ? a.LinkMissatge>b.LinkMissatge ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="LinkMissatge";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);ArrayColumnes[ArrayColumnes.length-1].IsLink=true;ArrayColumnes[ArrayColumnes.length-1].TextLink="IdMissatge";ArrayColumnes[ArrayColumnes.length-1].Link="LinkMissatge";'+'\n';
	
	iCad=iCad+'   var iFuncOrdre=function (a,b){return a.Grup!=b.Grup ? a.Grup<b.Grup ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iFuncOrdreDesc=function (a,b){return a.Grup!=b.Grup ? a.Grup>b.Grup ? -1 : 1 : 0;}'+'\n';
	iCad=iCad+'   var iId="Grup";ArrayColumnes[ArrayColumnes.length]=new Columna(iId,iId,iId,"","+",iFuncOrdre,iFuncOrdreDesc);'+'\n';


	iCad=iCad+'}'+'\n';			  	
	iCad=iCad+'return ArrayColumnes;'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function GetArrayColumnesVisibles(aId){'+'\n';	
	iCad=iCad+'if (Agrupado&&Agrupacion.substring(0,2)!="*|"&&Agrupacion!=""){return GetArrayColumnesAgr();}'+'\n';
	iCad=iCad+'var iArrOld=GetArrayColumnes();var iArrNew=new Array;'+'\n';
	iCad=iCad+'for (var i=0;i<iArrOld.length;i++){'+'\n';
	iCad=iCad+'   if (iArrOld[i].Visible){iArrNew[iArrNew.length]=iArrOld[i];}'+'\n';
	iCad=iCad+'}'+'\n';	
	iCad=iCad+'return iArrNew;'+'\n';	
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function html_entity_decode(str) {'+'\n';
	iCad=iCad+'if (str==undefined) return;'+'\n';
  iCad=iCad+'var ta=document.createElement("textarea");'+'\n';
  iCad=iCad+'ta.innerHTML=str.replace(/</g,"&lt;").replace(/>/g,"&gt;");'+'\n';
  iCad=iCad+'return ta.value;'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function GetArrayColumnesAgr(aId){'+'\n';	
	
	iCad=iCad+'var iArrOld=GetArrayColumnes();'+'\n';
	iCad=iCad+'var iArrNew=new Array;'+'\n';
	iCad=iCad+'var iArrFields=Agrupacion.split("|");'+'\n';
	iCad=iCad+'for (var i=0;i<iArrFields.length;i++){'+'\n';
	iCad=iCad+'if (iArrFields[i]!="*"&&iArrFields[i]!=""){'+'\n';		
	iCad=iCad+'   	 var j=GetObjFromProp(iArrOld,iArrFields[i]);'+'\n';		
	iCad=iCad+' 	  if (j>-1) {iArrNew[iArrNew.length]=iArrOld[j];}'+'\n';		
	iCad=iCad+'	}'+'\n';	
	iCad=iCad+'}'+'\n';	
	iCad=iCad+'for (var i=0;i<iArrOld.length;i++){'+'\n';	
	iCad=iCad+'	if (iArrOld[i].Agrupat) iArrNew[iArrNew.length]=iArrOld[i];'+'\n';			
	//iCad=iCad+'	var i=GetObjFromProp(iArrOld,"TotalAgrupat");'+'\n';		
	//iCad=iCad+'	if (i>-1) {iArrNew[iArrNew.length]=iArrOld[i];}'+'\n';				
	iCad=iCad+'}'+'\n';	
	iCad=iCad+'return iArrNew;'+'\n';	
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function SetAutoFiltre(aObj){'+'\n';	
	iCad=iCad+'AutoFiltre=aObj.checked;'+'\n';	
	iCad=iCad+'var iArrCols=GetArrayColumnes();for (var i=0;i<iArrCols.length;i++) iArrCols[i].Filtre="";'+'\n';
	iCad=iCad+'MakeTable(ArrayMissatges);'+'\n';
	iCad=iCad+'return false;'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function Buscar(){'+'\n';		
	iCad=iCad+'var iCtnls=new Array;'+'\n';	
	iCad=iCad+'var iCont=0;'+'\n';
	iCad=iCad+'Orden="";'+'\n';
	iCad=iCad+'var iArr=document.getElementById("Carpetes").getElementsByTagName("input");'+'\n';
	iCad=iCad+'for (var i=0;i<iArr.length;i++){'+'\n';
	iCad=iCad+'   if (iArr[i].getAttribute("tipus")=="chkcarpeta"&&iArr[i].checked==true) {'+'\n';
	iCad=iCad+'      iCtnls[iCont]=iArr[i]'+'\n';
	iCad=iCad+'      iCont++;'+'\n';
	iCad=iCad+'   }'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'ProcessaCarpetes(iCtnls);'+'\n';
	iCad=iCad+'}'+'\n';
	
	
	iCad=iCad+'function IndexaArrayFromProp(aArray,aProp){'+'\n';	
	iCad=iCad+'var iArr=new Array;'+'\n';	
	iCad=iCad+'for (var i=0;i<aArray.length;i++){'+'\n';	
	iCad=iCad+'	eval("var iCadP=aArray[i]."+aProp);'+'\n';	
	iCad=iCad+'	iArr[iCadP]=i;'+'\n';	
	iCad=iCad+'}'+'\n';	
	iCad=iCad+'return iArr;'+'\n';	
	iCad=iCad+'}'+'\n';	
	
	iCad=iCad+'function Click_Chk1(aId){'+'\n';	
	iCad=iCad+'iObj=(aId.id==undefined)?this:aId;'+'\n';
	iCad=iCad+'var iId=iObj.id;'+'\n';
	iCad=iCad+'if (iId!="Totes"){'+'\n';
	iCad=iCad+'	var iArr=IndexaArrayFromProp(ArrayCarpetes,"id");'+'\n';	
	iCad=iCad+'	if (iObj.checked){'+'\n';
	iCad=iCad+'			if (CARPETESSELECCIONADES[iId]==undefined) CARPETESSELECCIONADES[iId]=iArr[iId];'+'\n';
	iCad=iCad+'	}else{'+'\n';
	iCad=iCad+'			if (CARPETESSELECCIONADES[iId]!=undefined) delete CARPETESSELECCIONADES[iId];'+'\n';		
	iCad=iCad+'	}'+'\n';
	//iCad=iCad+'	for (var iKey in CARPETESSELECCIONADES) alert(iKey);'+'\n';
	iCad=iCad+'}else{alert("ara");}'+'\n';
	iCad=iCad+'var iLi=this.parentNode;'+'\n';
	iCad=iCad+'var iLis=iLi.getElementsByTagName("li");'+'\n';				
	iCad=iCad+'for (var i=0;i<iLis.length;i++){'+'\n';
	iCad=iCad+'	var iChk2=iLis[i].getElementsByTagName("input")[0];'+'\n';
	iCad=iCad+'	iChk2.checked=iObj.checked;'+'\n';
	iCad=iCad+'	Click_Chk1(iChk2);'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'return false;'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function Click_Chk(aId,aValue){'+'\n';	
	iCad=iCad+'var iChk=document.getElementById(aId);'+'\n';
	iCad=iCad+'if (aValue!=undefined){iChk.checked=aValue};'+'\n';
	iCad=iCad+'var iLi=iChk.parentNode;'+'\n';
	iCad=iCad+'var iLis=iLi.getElementsByTagName("li");'+'\n';			
	iCad=iCad+'for (var i=0;i<iLis.length;i++){'+'\n';
	iCad=iCad+'var iChk2=iLis[i].getElementsByTagName("input")[0]'+'\n';
	iCad=iCad+'Click_Chk(iChk2.id,iChk.checked);'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'return false;'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function PrintPrg(){'+'\n';	
	iCad=iCad+'var iDiv=$("DvPrg");'+'\n';
	iCad=iCad+'iObj=new Date();	TxtPrg = iObj.getSeconds();'+'\n';	
	iCad=iCad+'window.status=TxtPrg;'+'\n';
	iCad=iCad+'iDiv.innerHTML=TxtPrg;'+'\n';	
	iCad=iCad+'return true;'+'\n';	
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function IniProgress(){'+'\n';
	iCad=iCad+'FinProgress();'+'\n';	
	iCad=iCad+'var iFunc=PrintPrg;'+'\n';	
	iCad=iCad+'IDINTERVAL=setInterval("PrintPrg()", 1000);'+'\n';		
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function FinProgress(){'+'\n';
	iCad=iCad+'clearInterval(IDINTERVAL);'+'\n';
	iCad=iCad+'TxtPrg="";'+'\n';
	iCad=iCad+'PrintPrg;'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function UpdateProgress(aValue){'+'\n';
	iCad=iCad+'var iDiv=document.getElementById("prg");'+'\n';	
	iCad=iCad+'var iValue=(aValue>100)?100:aValue;'+'\n';	
	iCad=iCad+'iDiv.style.width=iValue;'+'\n';	
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function ProcessaCarpetes(aArr){'+'\n';
	iCad=iCad+'if (aArr.length==0){return false;};'+'\n';
	iCad=iCad+'IniProgress();'+'\n';
	
	iCad=iCad+'ArrayMissatges=new Array;'+'\n';
	iCad=iCad+'for (var i=0;i<aArr.length;i++){'+'\n';
	//iCad=iCad+'   UpdateProgress(((i+1)*100)/aArr.length);'+'\n';	
	iCad=iCad+'   ProcessaCarpeta(aArr[i])'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'FinProgress();'+'\n';
	
	iCad=iCad+'MakeTable(ArrayMissatges);'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function VerMsg(){'+'\n';
	iCad=iCad+'window.open(this.id);'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function SetOrder(){'+'\n';
	iCad=iCad+'var iArrCols=GetArrayColumnesVisibles();'+'\n';	
	iCad=iCad+'var iCol=GetObjFromId(iArrCols,this.id);'+'\n';
	iCad=iCad+'if (iCol<0||iArrCols.length==0) return false;'+'\n';	
	iCad=iCad+'iArrCols[iCol].IncOrdre();'+'\n';
	iCad=iCad+'Orden=iArrCols[iCol].Id;'+'\n';	
	iCad=iCad+'MakeTable(ArrayMissatges);'+'\n';	
	iCad=iCad+'return false;'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function doClick(e){'+'\n';
  iCad=iCad+'var key;'+'\n';
  iCad=iCad+'if(window.event) key = window.event.keyCode; else key = e.which;'+'\n';
  iCad=iCad+'if (key == 13){'+'\n';
  iCad=iCad+'   SetFilter(this);}'+'\n';
  iCad=iCad+'}'+'\n';
        
	iCad=iCad+'function SetFilter(aObj){'+'\n';
	iCad=iCad+'var iArrCols=GetArrayColumnesVisibles();'+'\n';
	iCad=iCad+'var iCol=GetObjFromId(iArrCols,aObj.getAttribute("colid"));'+'\n';
	iCad=iCad+'if (iCol<0) return false;'+'\n';
	iCad=iCad+'iArrCols[iCol].Filtre=aObj.value;'+'\n';
	iCad=iCad+'MakeTable(ArrayMissatges);'+'\n';
	iCad=iCad+'return true;'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function D2(inValue) {'+'\n';
	iCad=iCad+'var iCad="";'+'\n';
  iCad=iCad+'var numVal = parseInt(inValue, 10);'+'\n';
  iCad=iCad+'if (numVal < 10) {iCad="0" + numVal;}else {iCad=numVal;}'+'\n';
	iCad=iCad+'return iCad;}'+'\n';

iCad=iCad+'function AgrupaArray(aArr){'+'\n';
iCad=iCad+'	var iArr=new Array;var iArrAgr=new Array;var iArrMsg=new Array;var iArrTxt=new Array;var iArrNo=new Array;'+'\n';

iCad=iCad+'	if (Agrupado==false||String(Agrupacion).substring(0,2)=="*|") return aArr;'+'\n';
iCad=iCad+'	var iAgrFields=Agrupacion.split("|");'+'\n';
iCad=iCad+'	if (iAgrFields[1]=="*") iAgrFields[1]="";'+'\n';
iCad=iCad+'	for (var i=0;i<aArr.length;i++){'+'\n';

iCad=iCad+'		if (iAgrFields[1]==""){'+'\n';
iCad=iCad+'			eval("var iValue0=aArr[i]."+iAgrFields[0]);'+'\n';                                          
iCad=iCad+'			iValue0=(iValue0 instanceof Date)?D2(iValue0.getDate())+"/"+D2(iValue0.getMonth())+"/"+iValue0.getFullYear():iValue0;'+'\n';
iCad=iCad+'			if (iArrAgr[iValue0]){iArrAgr[iValue0]=iArrAgr[iValue0]+1;}else{iArrAgr[iValue0]=1;}'+'\n'; 
iCad=iCad+'			var iLnk=aArr[i].LinkMissatge'+'\n'; 
iCad=iCad+'			if (iArrMsg[iValue0]){iArrMsg[iValue0]=iArrMsg[iValue0]+"#"+iLnk;}else{iArrMsg[iValue0]=iLnk;}'+'\n'; 
iCad=iCad+'			var iLnk=aArr[i].Tema'+'\n'; 
iCad=iCad+'			if (iArrTxt[iValue0]){iArrTxt[iValue0]=iArrTxt[iValue0]+"#"+iLnk;}else{iArrTxt[iValue0]=iLnk;}'+'\n'; 
iCad=iCad+'		}else{'+'\n';
iCad=iCad+'			eval("var iValue1=aArr[i]."+iAgrFields[1]);'+'\n';  
iCad=iCad+'			iValue1=(iValue1 instanceof Date)?D2(iValue1.getDate())+"/"+D2(iValue1.getMonth())+"/"+iValue1.getFullYear():iValue1;'+'\n';
iCad=iCad+'			eval("var iValue0=aArr[i]."+iAgrFields[0]);'+'\n';                                                        
iCad=iCad+'			iValue0=(iValue0 instanceof Date)?D2(iValue0.getDate())+"/"+D2(iValue0.getMonth())+"/"+iValue0.getFullYear():iValue0;'+'\n';                                                            
iCad=iCad+'			if (iArrAgr[iValue0+"#"+iValue1]){iArrAgr[iValue0+"#"+iValue1]=iArrAgr[iValue0+"#"+iValue1]+1;}else{iArrAgr[iValue0+"#"+iValue1]=1;}'+'\n';
iCad=iCad+'			var iLnk=aArr[i].LinkMissatge'+'\n'; 
iCad=iCad+'			if (iArrMsg[iValue0+"#"+iValue1]){iArrMsg[iValue0+"#"+iValue1]=iArrMsg[iValue0+"#"+iValue1]+"#"+iLnk;}else{iArrMsg[iValue0+"#"+iValue1]=iLnk;}'+'\n'; 
iCad=iCad+'			var iLnk=aArr[i].Tema'+'\n'; 
iCad=iCad+'			if (iArrTxt[iValue0+"#"+iValue1]){iArrTxt[iValue0+"#"+iValue1]=iArrTxt[iValue0+"#"+iValue1]+"#"+iLnk;}else{iArrTxt[iValue0+"#"+iValue1]=iLnk;}'+'\n'; 

iCad=iCad+'		}'+'\n';
iCad=iCad+'	}'+'\n';
iCad=iCad+'	for (var iKey0 in iArrAgr){'+'\n';  
iCad=iCad+'		var iK0=(iKey0.indexOf("#")>-1)?iKey0.split("#")[0]:iKey0;'+'\n';     
iCad=iCad+'		var iK1=(iKey0.indexOf("#")>-1)?iKey0.split("#")[1]:"";'+'\n';
iCad=iCad+'		var iMsg=new Message();'+'\n';

iCad=iCad+'		if (iAgrFields[1]==""){'+'\n';
iCad=iCad+'			eval("iMsg."+iAgrFields[0]+"=iKey0");'+'\n';
iCad=iCad+'			iMsg.TotalAgrupat=iArrAgr[iKey0];'+'\n';
iCad=iCad+'			iMsg.Msggrupats=iArrMsg[iKey0];'+'\n';
iCad=iCad+'				iMsg.LinkMissatge=iArrMsg[iKey0];'+'\n';			
iCad=iCad+'				iMsg.TextLink=iArrTxt[iKey0];'+'\n';			
iCad=iCad+'		}else{'+'\n';
iCad=iCad+'				eval("iMsg."+iAgrFields[0]+"=iK0");'+'\n';
iCad=iCad+'				eval("iMsg."+iAgrFields[1]+"=iK1");'+'\n';
iCad=iCad+'				iMsg.TotalAgrupat=iArrAgr[iK0+"#"+iK1];'+'\n';
iCad=iCad+'				iMsg.Msggrupats=iArrMsg[iK0+"#"+iK1];'+'\n';			
iCad=iCad+'				iMsg.LinkMissatge=iArrMsg[iK0+"#"+iK1];'+'\n';			
iCad=iCad+'				iMsg.TextLink=iArrTxt[iK0+"#"+iK1];'+'\n';			
iCad=iCad+'		}'+'\n';
iCad=iCad+'		iArr[iArr.length]=iMsg;'+'\n';
iCad=iCad+'	}'+'\n';
iCad=iCad+'	if (iAgrFields[0]=="Autor"){'+'\n';
iCad=iCad+'		for (var i=0;i<ArrayAlumnes.length;i++){'+'\n';
iCad=iCad+'			var iTrobat=false;'+'\n';
iCad=iCad+'			for (var j=0;j<iArr.length;j++){'+'\n';
iCad=iCad+'				if (ArrayAlumnes[i].Nom==iArr[j].Autor){iTrobat=true;break;}'+'\n';
iCad=iCad+'			}'+'\n';
iCad=iCad+'			if (iTrobat==false){'+'\n';
iCad=iCad+'				var iMsg=new Message;iMsg.Autor=ArrayAlumnes[i].Nom;iMsg.TotalAgrupat=0;iMsg.Msggrupats="";iArr[iArr.length]=iMsg;'+'\n';
iCad=iCad+'			}'+'\n';
iCad=iCad+'		}'+'\n';
iCad=iCad+'	}'+'\n';
iCad=iCad+'	return iArr;'+'\n';
iCad=iCad+'}'+'\n';
	
	
	
	
	
	
	
	  
	iCad=iCad+'function OrdenaArray(aArr){'+'\n';
	iCad=iCad+'var iArrCols=GetArrayColumnesVisibles();'+'\n';	
	iCad=iCad+'var iCol=GetObjFromId(iArrCols,Orden);'+'\n';
	iCad=iCad+'var iArr=new Array;iArr=aArr;'+'\n';
	iCad=iCad+'if (iCol>-1) iArr.sort((iArrCols[iCol].Ordre=="+")?iArrCols[iCol].FuncOrdre:iArrCols[iCol].FuncOrdreDesc);'+'\n';
	iCad=iCad+'return iArr;'+'\n';	
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function FiltreArray(aArr){'+'\n';	
	iCad=iCad+'var iArrCols=GetArrayColumnesVisibles();'+'\n';	
	iCad=iCad+'var iArr=new Array;'+'\n';
	iCad=iCad+'var iAfegir=false;'+'\n';		
	iCad=iCad+'for (var i=0;i<aArr.length;i++){'+'\n';
	iCad=iCad+'		iAfegir=true;'+'\n';	
	iCad=iCad+'		for (var j=0;j<iArrCols.length;j++){'+'\n';
	iCad=iCad+'				if (iArrCols[j].Filtre!=""){'+'\n';
	iCad=iCad+'		      iAfegir=false;'+'\n';
	iCad=iCad+'					var iValue=String(eval("aArr[i]."+iArrCols[j].Propietat));'+'\n';
	iCad=iCad+'					var re = new RegExp(iArrCols[j].Filtre,"i");'+'\n';		
	iCad=iCad+'					if (re.test(iValue)){iAfegir=true;}'+'\n';
	iCad=iCad+'				}'+'\n';
	iCad=iCad+'		}'+'\n';
	iCad=iCad+'		if (iAfegir){iArr[iArr.length]=aArr[i];}'+'\n';
	iCad=iCad+'}'+'\n';	
	iCad=iCad+'return iArr;'+'\n';	
	iCad=iCad+'}'+'\n';
	
	
	iCad=iCad+'function MakeCell(aCad,aRow,aCodeLink,aIdLnk){'+'\n';
	iCad=iCad+'iCol=document.createElement("TD");'+'\n';
	iCad=iCad+'if (aCodeLink) {var iLnk=document.createElement("A");iLnk.href="#";iLnk.id=aIdLnk;iLnk.onclick=aCodeLink;iCol.appendChild(iLnk);}'+'\n';  
  iCad=iCad+'iTxt=document.createTextNode(aCad);'+'\n';
  iCad=iCad+'var iCad=(String(aCad).indexOf("/")>-1)?String.fromCharCode(32)+aCad:aCad;'+'\n';
  iCad=iCad+'CLIPBOARD=CLIPBOARD+iCad+"\\t";'+'\n';
  iCad=iCad+'if (aCodeLink) {iLnk.appendChild(iTxt);}else{iCol.appendChild(iTxt);}'+'\n';  
  iCad=iCad+'iCol.className="fnt112";'+'\n';
  iCad=iCad+'aRow.appendChild(iCol);'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function MakeCellLink(aRow,aTxt,aLink,aTarget,aMulti){'+'\n';		
	iCad=iCad+'aTxt=(aTxt==undefined)?"":aTxt;iCol=document.createElement("TD");'+'\n';
	iCad=iCad+'var iTxtClip="";'+'\n';
	iCad=iCad+'if (aMulti==false){;'+'\n';
	iCad=iCad+'	var iLnk=document.createElement("A");iLnk.href=aLink;iLnk.id=aLink;iCol.appendChild(iLnk);'+'\n';  
	iCad=iCad+'	if (aTarget!=undefined) iLnk.setAttribute("TARGET",aTarget);'+'\n';  
  iCad=iCad+'	iTxt=document.createTextNode(aTxt);'+'\n';
  iCad=iCad+'	iLnk.appendChild(iTxt);'+'\n';  
  iCad=iCad+'	iTxtClip=aTxt;'+'\n';
  iCad=iCad+'}else{;'+'\n';
  iCad=iCad+' var iArrLinks=aLink.split("#");'+'\n';
  iCad=iCad+' var iArrTxt=aTxt.split("#");'+'\n';
  iCad=iCad+' for (var i=0;i<iArrLinks.length;i++){'+'\n';  
  iCad=iCad+'		var iLnk=document.createElement("A");iLnk.href=iArrLinks[i];iLnk.id=iArrLinks[i];iCol.appendChild(iLnk);'+'\n';
  iCad=iCad+'		if (aTarget!=undefined) iLnk.setAttribute("TARGET",aTarget);'+'\n';  
  iCad=iCad+'		iTxt=document.createTextNode(iArrTxt[i]);'+'\n';
  iCad=iCad+'		iLnk.appendChild(iTxt);'+'\n';  
  iCad=iCad+'		iTxt1=document.createTextNode(" ");iCol.appendChild(iTxt1);iTxtClip=iTxtClip+iArrTxt[i];'+'\n';
  iCad=iCad+'	};'+'\n';
  iCad=iCad+'};'+'\n';
  iCad=iCad+'CLIPBOARD=CLIPBOARD+iTxtClip+"\\t";'+'\n';
  iCad=iCad+'iCol.className="fnt112";'+'\n';
  
  iCad=iCad+'aRow.appendChild(iCol);'+'\n';
  
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function MakeCellInput(aId,aValue,aRow,onKeyEvent){'+'\n';
	iCad=iCad+'iCol=document.createElement("TD");'+'\n';
	iCad=iCad+'iLnk=document.createElement("input");'+'\n';
	iCad=iCad+'iLnk.type="TEXT";'+'\n';
	iCad=iCad+'iLnk.id="Txt_"+aId;'+'\n';  
	iCad=iCad+'iLnk.setAttribute("colid",aId);'+'\n';
  iCad=iCad+'iLnk.value=aValue;'+'\n';
  iCad=iCad+'iLnk.onkeypress=onKeyEvent;'+'\n';
  iCad=iCad+'iCol.appendChild(iLnk);'+'\n';  
  iCad=iCad+'iCol.className="fnt112";'+'\n';
  iCad=iCad+'aRow.appendChild(iCol);'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function MakeCellImg(aId,aValue,aRow){'+'\n';
	iCad=iCad+'iCol=document.createElement("TD");'+'\n';
	iCad=iCad+'iLnk=document.createElement("img");'+'\n';
	iCad=iCad+'iLnk.src=aValue;'+'\n';
	iCad=iCad+'iLnk.setAttribute("heigth","20");'+'\n';
	iCad=iCad+'iLnk.setAttribute("width","20");'+'\n';
	iCad=iCad+'iLnk.id="Img_"+aId;'+'\n';  
	iCad=iCad+'iCol.appendChild(iLnk);'+'\n';  
  iCad=iCad+'iCol.className="fnt112";'+'\n';
  iCad=iCad+'aRow.appendChild(iCol);'+'\n';
  iCad=iCad+'CLIPBOARD=CLIPBOARD+aValue+"\\t";'+'\n';
	iCad=iCad+'}'+'\n';
	 
	iCad=iCad+'function MakeRow(aObj,aBody,aArrCols){'+'\n';	
	iCad=iCad+'iRow=document.createElement("TR");'+'\n';
	iCad=iCad+'for (var i=0;i<aArrCols.length;i++){'+'\n';
	iCad=iCad+'	eval("var iCad=aObj."+aArrCols[i].Propietat+";");'+'\n';
	iCad=iCad+'	iCad= (iCad instanceof Date)?D2(iCad.getDate())+"/"+D2(iCad.getMonth())+"/"+iCad.getFullYear():iCad;'+'\n';
	
	iCad=iCad+'	if (aArrCols[i].IsImatge==false){'+'\n';
	iCad=iCad+'		if (aArrCols[i].IsLink==false){'+'\n';
	iCad=iCad+'			MakeCell(iCad,iRow);'+'\n';
	iCad=iCad+'		}else{'+'\n';	
	iCad=iCad+'			eval("var iCad1=aObj."+aArrCols[i].TextLink);'+'\n';
	iCad=iCad+'			eval("var iCad2=aObj."+aArrCols[i].Link);'+'\n';			
	iCad=iCad+'			MakeCellLink(iRow,iCad1,iCad2,"_BLANK",aArrCols[i].ArrayLinks);'+'\n';
	iCad=iCad+'		}'+'\n';
	iCad=iCad+'	}else{'+'\n';
	iCad=iCad+'		MakeCellImg(iCad,iCad,iRow);'+'\n';
	iCad=iCad+'	}'+'\n';		
	iCad=iCad+'}'+'\n';
	iCad=iCad+'	CLIPBOARD=CLIPBOARD+"###";'+'\n'
	iCad=iCad+'aBody.appendChild(iRow);'+'\n';
	iCad=iCad+'}'+'\n';


	iCad=iCad+'function MakeTable(aArr){'+'\n';		           
	
	iCad=iCad+'var iArrCols=GetArrayColumnesVisibles();'+'\n';	
	iCad=iCad+'CLIPBOARD="";'+'\n';
	iCad=iCad+'if (iArrCols.length==0||aArr.length==0){return false;}'+'\n';	
	iCad=iCad+'var iDiv=document.getElementById("Results");'+'\n';
	
	
	iCad=iCad+'iTbl1 = document.getElementById("TblResults");'+'\n';
	iCad=iCad+'if (iDiv&&iTbl1) {iDiv.removeChild(iTbl);}'+'\n';
	
	iCad=iCad+'iTbl=document.createElement("TABLE");'+'\n';	
	iCad=iCad+'iTbl.id="TblResults";'+'\n';
	iCad=iCad+'iTbl.width="100%";'+'\n';
	
	iCad=iCad+'iTblHead=document.createElement("THEAD");'+'\n';	
	iCad=iCad+'iTblHeadR=document.createElement("TR");'+'\n';
	
	
	iCad=iCad+'for (var i=0;i<iArrCols.length;i++){if (iArrCols[i].IsImatge==false){MakeCell(iArrCols[i].Titol+iArrCols[i].Ordre,iTblHeadR,SetOrder,iArrCols[i].Id);}else{MakeCell(iArrCols[i].Titol,iTblHeadR);}}CLIPBOARD=CLIPBOARD+"###";'+'\n';
	iCad=iCad+'iTblHead.appendChild(iTblHeadR);'+'\n';	
	
	iCad=iCad+'if (AutoFiltre){'+'\n';	
	iCad=iCad+'   iTblHeadR=document.createElement("TR");'+'\n';	
	iCad=iCad+'   for (var i=0;i<iArrCols.length;i++){'+'\n';
	iCad=iCad+'      if (iArrCols[i].IsImatge==false){MakeCellInput(iArrCols[i].Id,iArrCols[i].Filtre,iTblHeadR,doClick)}else{MakeCell("",iTblHeadR)};'+'\n';
	iCad=iCad+'   }'+'\n';
	iCad=iCad+'   iTblHead.appendChild(iTblHeadR);'+'\n';
	iCad=iCad+'}'+'\n';
	
	
	iCad=iCad+'var iArr=OrdenaArray(aArr);'+'\n';
	iCad=iCad+'var iArr=FiltreArray(aArr);'+'\n';
	iCad=iCad+'if (Agrupado&&Agrupacion!="*|*"&&Agrupacion!=""){ var iArr=AgrupaArray(iArr);iArr=OrdenaArray(iArr);}'+'\n';
		
	iCad=iCad+'iTblBody=document.createElement("TBODY");iTblBody.id="BodyResults";'+'\n';	
  iCad=iCad+'for (var i=0;i<iArr.length;i++){MakeRow(iArr[i],iTblBody,iArrCols);}'+'\n';     
  iCad=iCad+'iTbl.appendChild(iTblHead);'+'\n';
  iCad=iCad+'iTbl.appendChild(iTblBody);'+'\n';
	iCad=iCad+'iDiv.appendChild(iTbl);'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function ProcessaCarpeta(aChk){'+'\n';	
	iCad=iCad+'var iId=aChk.id;'+'\n';		
	iCad=iCad+'var iName=aChk.name;'+'\n';
	iCad=iCad+'var iTotal=aChk.getAttribute("msgTotals");'+'\n';
	iCad=iCad+'var iPath=aChk.getAttribute("path");'+'\n';
	iCad=iCad+'Recupera(iId,iName,iTotal,iPath);'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function Recupera(aId,aName,aTotal,aPath){'+'\n';		
	iCad=iCad+'var iIters=GetNumInters(aTotal);'+'\n';
	iCad=iCad+'var iCad="";'+'\n';
	iCad=iCad+'for (var i=0;i<iIters;i++){'+'\n';
	iCad=iCad+'   var iUri=encodeURI("s=" + SessionId + "&aula=&l=" + Login + "&folderid=" + aId + "&f=" + aPath + "&justnew=0&page=" + i + "&cache=&showtitles=0&cb=&orden=&forcecache=");'+'\n';
	iCad=iCad+'   var iObj=GetNewReq();'+'\n';
	iCad=iCad+'   iObj.open("POST", UrlMsg, false);'+'\n';
	iCad=iCad+'   iObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");'+'\n';
	iCad=iCad+'   iObj.setRequestHeader("User-agent", "Mozilla/5.0 (Windows; U; Windows NT 5.1; es-ES; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6");'+'\n';
	iCad=iCad+'   iObj.setRequestHeader("Accept", "*/*");'+'\n';
	iCad=iCad+'   iObj.setRequestHeader("Rerefer", UrlMsg);'+'\n';
	iCad=iCad+'   iObj.setRequestHeader("Host", "cv.uoc.edu");'+'\n';	
	iCad=iCad+'   iObj.setRequestHeader("Accept-Charset", "utf-8");'+'\n';
	iCad=iCad+'   iObj.send(iUri);'+'\n';
	iCad=iCad+'   if (iObj.status != 200) {return false;}'+'\n';
	iCad=iCad+'   iCad=iObj.responseText;'+'\n';
	iCad=iCad+'   var iArrMsgs=MakeArrayMsg(iCad,aId,aPath);'+'\n';
	iCad=iCad+'   for (j=0;j<iArrMsgs.length;j++){iArrMsgs[j].Num=ArrayMissatges.length+1;ArrayMissatges[ArrayMissatges.length]=iArrMsgs[j];}'+'\n';	
	iCad=iCad+'}'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function MakeArrayMsg(aCad,aIdCarpeta,aNomCarpeta,aPath){'+'\n';		
	iCad=iCad+'var iArrMsg=new Array;';	
	iCad=iCad+'var iCad="";'+'\n';
	iCad=iCad+'var iLastParent="";iMsgPare="";'+'\n';	
	iCad=iCad+'var iReg = /(appendMssgToTree.*)\((.*)(\));/img;'+'\n';
	iCad=iCad+'var iArr=aCad.match(iReg);'+'\n';
	iCad=iCad+'if (!iArr) {return iArrMsg;}'+'\n';
	
	iCad=iCad+'for (var i=0;i<iArr.length;i++){'+'\n';	
	iCad=iCad+'   iCad=iArr[i]'+'\n';
	iCad=iCad+'   iCad=iArr[i]'+'\n';
	iCad=iCad+'   iCad=iCad.replace("appendMssgToTree","");'+'\n';
	iCad=iCad+'   iCad=iCad.replace("(","");'+'\n';
	iCad=iCad+'   iCad=iCad.replace(");","");'+'\n';
	iCad=iCad+'   iCad=iCad.replace(");","");'+'\n';
	iCad=iCad+'   iCad=(decodeURI(iCad));'+'\n';
	
	iCad=iCad+'   eval("var iArry1=new Array("+iCad+");");'+'\n';		
	iCad=iCad+'   iArrMsg[iArrMsg.length]=new Message(iArry1[0],iArry1[1],iArry1[2],iArry1[3],iArry1[4],iArry1[5],iArry1[6],iArry1[7],iArry1[8],iArry1[9],iArry1[10],iArry1[11],iArry1[12],iArry1[13],aNomCarpeta,aIdCarpeta,iArry1.length,0,aPath);'+'\n';	
	iCad=iCad+'   var iLevel=parseInt(iArry1[1]);'+'\n';	
	iCad=iCad+'   if (iLevel==1){iMsgPare="INICI FIL";iLastParent=iArrMsg[iArrMsg.length-1].Tema;}else{iMsgPare=iArrMsg[iArrMsg.length-2].Tema+ " (" +iArrMsg[iArrMsg.length-2].Autor+")";}'+'\n';	
	iCad=iCad+'   iArrMsg[iArrMsg.length-1].Fil=iLastParent;'+'\n';
	iCad=iCad+'   iArrMsg[iArrMsg.length-1].MsgPare=iMsgPare;'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'return iArrMsg'+'\n';
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function GetNewReq(){'+'\n';	
	iCad=iCad+'   return new XMLHttpRequest()'+'\n';
	iCad=iCad+'}'+'\n';	
		
	iCad=iCad+'function Data2Txt(aData){'+'\n';
	iCad=iCad+'var iAny="20"+aData.substring(6,8);'+'\n';
	iCad=iCad+'var iMes=aData.substring(3,5);'+'\n';
	iCad=iCad+'var iDia=aData.substring(0,2);'+'\n';
	iCad=iCad+'var iHora=aData.substring(9,14);'+'\n';
	iCad=iCad+'return iAny+""+iMes+""+iDia+" "+iHora;'+'\n';	
	iCad=iCad+'}'+'\n';

	iCad=iCad+'function GetSemana(aData){'+'\n';	
	iCad=iCad+'return GetWeek(aData.getFullYear(),aData.getMonth(),aData.getDate());'+'\n';	
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function copy(o) {'+'\n';
	iCad=iCad+'if (typeof o != "object" || o === null) return o;'+'\n';
  iCad=iCad+'var r = o.constructor == Array ? [] : {};'+'\n';
  iCad=iCad+'for (var i in o) {r[i] = copy(o[i]);} '+'\n';
  iCad=iCad+'return r;'+'\n';	  
  iCad=iCad+'}'+'\n';  
    
	
	iCad=iCad+'function GetNumInters(aTotal){'+'\n';	
	iCad=iCad+'   var iIter=0;'+'\n';	
	iCad=iCad+'   var iTotal=parseInt(aTotal);'+'\n';
	iCad=iCad+'   if (iTotal==0) {return iIter;}'+'\n';
	iCad=iCad+'   var iNum=parseInt(NumMsg);'+'\n';
	iCad=iCad+'   if (iTotal<=iNum){'+'\n';	
	iCad=iCad+'      iIter=1'+'\n';
	iCad=iCad+'   }else{'+'\n';	
	iCad=iCad+'      iIter=parseInt(aTotal/NumMsg);'+'\n';
	iCad=iCad+'      iIter=iIter+((iTotal%iNum>0)?1:0);'+'\n';		
	iCad=iCad+'   }'+'\n';
	iCad=iCad+'   return iIter;'+'\n';
	iCad=iCad+'}'+'\n';	
	//function appendMssgToTree (mssgId, mssgLevel, mssgStatus, mssgHasAttach, mssgIsDraft, mssgUserType, mssgFrom, mssgTema, mssgIsExternal, mssgUserMark, mssgDate, mssgDescription, mssgVoteAverage, postitIconId)
	iCad=iCad+'function GetFechaDDMMYYYY(aFecha){'+'\n';
	//iCad=iCad+'	if (aFecha.length!=8) return 	null;'+'\n';
	iCad=iCad+'	var iDia=aFecha.substring(0,2);'+'\n';
	iCad=iCad+'	var iMes=aFecha.substring(3,5);'+'\n';
	iCad=iCad+'	var iAny=aFecha.substring(6,8);'+'\n';
	iCad=iCad+'	if (iAny.length==2) iAny="20" +iAny;'+'\n';	
	iCad=iCad+'	return new Date(iAny,iMes,iDia);'+'\n';		
	iCad=iCad+'}'+'\n';
	
	iCad=iCad+'function Message(id, level, status, attach, draft, userType, Autor, Tema, isExternal, userMark, Fecha, description, vote, postitIconId,NomCarpeta,IdCarpeta,NumProperties,TotalAgrupat,aPath)'+'\n';
	iCad=iCad+'{'+'\n';		
	iCad=iCad+'iArr=GetArrayAlumnes();'+'\n';
	iCad=iCad+'this.id = id;'+'\n';
	iCad=iCad+'this.IdMissatge = id;'+'\n';	
	iCad=iCad+'if (id!=undefined) this.IdAlumne = id.split("_")[0];'+'\n';
	iCad=iCad+'this.parent = 0;'+'\n';
	iCad=iCad+'this.level = level;'+'\n';
	iCad=iCad+'this.isOpen = true;'+'\n';
	iCad=iCad+'this.visible = true;'+'\n';
	iCad=iCad+'this.status = status;'+'\n';
	iCad=iCad+'this.attach = attach;'+'\n';
	iCad=iCad+'this.draft = draft;'+'\n';
	iCad=iCad+'this.userType = userType;'+'\n';
	iCad=iCad+'var iNum=GetAlumneFromNom(Autor);'+'\n';
	iCad=iCad+'this.UltimaConnexioCampus=(iNum>-1)?iArr[iNum].UltimaConnexioCampus:"";'+'\n';
	iCad=iCad+'this.UltimaConnexioAula=(iNum>-1)?iArr[iNum].UltimaConnexioAula:"";'+'\n';
	iCad=iCad+'this.TipusUsuari=(iNum>-1)?iArr[iNum].TipusUsuari:"";'+'\n';
	iCad=iCad+'this.UserId=(iNum>-1)?iArr[iNum].UserId:"";'+'\n';
	iCad=iCad+'this.UrlImg=(iNum>-1)?iArr[iNum].UrlImg:"";'+'\n';
	iCad=iCad+'this.Grup=(iNum>-1)?iArr[iNum].Grup:"";'+'\n';	
	iCad=iCad+'if (this.Grup=="") this.Grup="Cap";'+'\n';	
	iCad=iCad+'this.Autor = (iNum>-1)?iArr[iNum].Nom:Autor;'+'\n';
	iCad=iCad+'this.Tema = (Tema=="")?"Cap":html_entity_decode(Tema);'+'\n';
	iCad=iCad+'this.isExternal = isExternal;'+'\n';
	iCad=iCad+'this.userMark = userMark;'+'\n';
	iCad=iCad+'iData=(Fecha!=undefined&&Fecha.indexOf(" ")>-1)?GetFechaDDMMYYYY(Fecha.split(" ")[0]):null;'+'\n';
	iCad=iCad+'this.Fecha = (iData!=null)?iData:"";'+'\n';
	iCad=iCad+'this.Hora = (iData!=null)?Fecha.split(" ")[1]:"";'+'\n';
	iCad=iCad+'this.Semana = (iData!=null)?GetWeek(iData.getFullYear(),iData.getMonth(),iData.getDate()):"";'+'\n';
	iCad=iCad+'this.FechaTxt=(iData!=null)?iData.getFullYear()+D2(iData.getMonth())+D2(iData.getDate()):"";'+'\n';	
	iCad=iCad+'this.description = description;'+'\n';
	iCad=iCad+'this.vote = vote;'+'\n';
	iCad=iCad+'this.postitIconId= postitIconId;'+'\n';
	iCad=iCad+'this.NomCarpeta=NomCarpeta;'+'\n';
	iCad=iCad+'this.PathCarpeta=aPath;'+'\n';
	iCad=iCad+'this.IdCarpeta=IdCarpeta;'+'\n';	
	iCad=iCad+'this.NumProperties=NumProperties;'+'\n';	
	iCad=iCad+'this.TotalAgrupat=TotalAgrupat;'+'\n';	
	iCad=iCad+'this.Msggrupats="";'+'\n';
	iCad=iCad+'this.Fil="";'+'\n';	
	iCad=iCad+'this.MsgPare="";'+'\n';		
	iCad=iCad + 'this.LinkMissatge="http://cv.uoc.edu/UOC/a/cgi-bin/ma_mssgPreview?s="+SessionId+"&aula=&l="+ Login +"&m=" + id + "&f=" + this.NomCarpeta + "&cache=&vote=0&mailindex=0";'+'\n';
	iCad=iCad+'return this;'+'\n';
	iCad=iCad+'}'+'\n';
	
	
	iCad=iCad+'function GetWeek(year,month,aday){'+'\n';
	iCad=iCad+'var iData = new Date(year,month,aday);'+'\n';
	iCad=iCad+'var iCont=0;iContador=new Date(year,0,1);'+'\n';
	iCad=iCad+'while (true) {'+'\n';
	iCad=iCad+'  iCont++;'+'\n';
	iCad=iCad+'  iContador=new Date(iContador.getFullYear(),iContador.getMonth(),iContador.getDate()+7);'+'\n';
	iCad=iCad+'  if (iContador>=iData) break;'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'return iCont;'+'\n';
  iCad=iCad+'}'+'\n';
  
  iCad=iCad+'function $(aId){'+'\n';  
  iCad=iCad+'return document.getElementById(aId);'+'\n';  
  iCad=iCad+'}'+'\n';  
  
  iCad=iCad+'function SetAgrupacio(){'+'\n';  
  iCad=iCad+'var iAgr1=$("Agr0").value;var iAgr2=$("Agr1").value;'+'\n';  
  iCad=iCad+'Agrupacion=iAgr1+"|"+iAgr2;'+'\n';    
  iCad=iCad+'MakeTable(ArrayMissatges);'+'\n';
  iCad=iCad+'}'+'\n';
  
  iCad=iCad+'function SetVisible(){'+'\n';  
  iCad=iCad+'var iChks=$("xColsVisibles").getElementsByTagName("input");'+'\n';  
  iCad=iCad+'for (var i=0;i<iChks.length;i++){'+'\n';    
  iCad=iCad+'	var iNum=iChks[i].getAttribute("NumCol","-1");'+'\n';    
  iCad=iCad+'	if (parseInt(iNum)>-1) ArrayColumnes[iNum].Visible=iChks[i].checked;'+'\n';    
  iCad=iCad+'}'+'\n';    
  iCad=iCad+'MakeTable(ArrayMissatges);'+'\n';
  iCad=iCad+'}'+'\n';
  
  
  
  iCad=iCad+'function ShowVisible(aObj){'+'\n';
  iCad=iCad+'var iTbl=$("TblVisible");'+'\n';	
  iCad=iCad+'var iTBody=$("BodyVisible");'+'\n';	  
  iCad=iCad+'var iArrCols=GetArrayColumnes();'+'\n';
  iCad=iCad+'if (aObj.checked){'+'\n';	  
  iCad=iCad+'			for (var j=0;j<iArrCols.length;j++){'+'\n';		
  iCad=iCad+'				if (iArrCols[j].Agrupat==false){'+'\n';		
  iCad=iCad+'				iTr=document.createElement("TR");'+'\n';
	iCad=iCad+'				iTd=document.createElement("TD");'+'\n';		
	iCad=iCad+'				iTr.appendChild(iTd);'+'\n';	
	iCad=iCad+'				iTBody.appendChild(iTr);'+'\n';			
  iCad=iCad+'					iLbl=document.createElement("label");'+'\n';		
  iCad=iCad+'					iLbl.className="fnt112";'+'\n';		  
  iCad=iCad+'					iLbl.innerHTML=iArrCols[j].Propietat;'+'\n';		
	iCad=iCad+'					iOpt=document.createElement("input");'+'\n';		
	iCad=iCad+'					iOpt.type="CheckBox";'+'\n';			
	iCad=iCad+'					iOpt.checked=iArrCols[j].Visible;'+'\n';				
	iCad=iCad+'					iOpt.setAttribute("Numcol",j);'+'\n';				
	iCad=iCad+'					iOpt.value=iArrCols[j].Propietat;'+'\n';		
	iCad=iCad+'					iTd.appendChild(iOpt);'+'\n';		
	iCad=iCad+'					iTd.appendChild(iLbl);'+'\n';		
	//iCad=iCad+'					iOpt.addEventListener("click",SetVisible,false);'+'\n';				
	iCad=iCad+'				}'+'\n';			
	iCad=iCad+'			}'+'\n';
  iCad=iCad+'				iTr=document.createElement("TR");'+'\n';
	iCad=iCad+'				iTd=document.createElement("TD");'+'\n';		
	iCad=iCad+'				iTr.appendChild(iTd);'+'\n';	
	iCad=iCad+'				iTBody.appendChild(iTr);'+'\n';				
	iCad=iCad+'					iCmd=document.createElement("input");'+'\n';			
	iCad=iCad+'					iCmd.type="button";'+'\n';
	iCad=iCad+'					iCmd.value="Aplicar";'+'\n';			
	iCad=iCad+'					iCmd.addEventListener("click",SetVisible,false);'+'\n';				
	iCad=iCad+'				iTd.appendChild(iCmd);'+'\n';		
  
  iCad=iCad+'}else{'+'\n';	
  iCad=iCad+'		while (iTBody.rows.length>1) {'+'\n';	
	iCad=iCad+'			iTBody.deleteRow(iTBody.rows.length-1);'+'\n';			
	iCad=iCad+'		}'+'\n';	
	iCad=iCad+'		MakeTable(ArrayMissatges);'+'\n';	
  iCad=iCad+'}'+'\n';
  iCad=iCad+'}'+'\n';
  
  
  
  
  
  
  
  iCad=iCad+'function GetContentFromItem(aParent,aId,aCarpetes){'+'\n';
	iCad=iCad+'var iNx=-1;iNx=GetObjFromid(aCarpetes,aId);'+'\n';
	iCad=iCad+'if (iNx>-1){'+'\n';
	iCad=iCad+'	 var iL=document.createElement("li");'+'\n';
	iCad=iCad+'	 var iA=document.createTextNode(aCarpetes[iNx].name + " (" + aCarpetes[iNx].msgNoread + "/" + aCarpetes[iNx].msgTotals + ")");'+'\n';	
	iCad=iCad+'	 var iInput=document.createElement("input");'+'\n';	
	iCad=iCad+'	 iL.appendChild(iInput);'+'\n';		
	iCad=iCad+'	 iL.appendChild(iA);'+'\n';		
	iCad=iCad+'	 aParent.appendChild(iL);'+'\n';			
	iCad=iCad+'	 iL.className="fnt112";'+'\n';	
	iCad=iCad+'	 iInput.type="checkbox";'+'\n';	
	iCad=iCad+'	 iInput.value=aCarpetes[iNx].name;'+'\n';	
	iCad=iCad+'	 iInput.setAttribute("path",aCarpetes[iNx].path);'+'\n';	
	iCad=iCad+'	 iInput.setAttribute("msgTotals",aCarpetes[iNx].msgTotals);'+'\n';	
	iCad=iCad+'	 iInput.setAttribute("msgNoread",aCarpetes[iNx].msgNoread);'+'\n';	
	iCad=iCad+'	 iInput.setAttribute("parentId",aCarpetes[iNx].parentId);'+'\n';
	iCad=iCad+'	 iInput.setAttribute("tipus","chkcarpeta");'+'\n';
	iCad=iCad+'	 iInput.setAttribute("level",aCarpetes[iNx].level);'+'\n';
	iCad=iCad+'	 iInput.setAttribute("id",aCarpetes[iNx].id);'+'\n';
	iCad=iCad+'	 iInput.setAttribute("name",aCarpetes[iNx].name);'+'\n';	
	iCad=iCad+'	 iInput.addEventListener("click",Click_Chk1,false);'+'\n';		
	iCad=iCad+'		iUl=document.createElement("ul");'+'\n';
	iCad=iCad+'	for (var i=0;i<aCarpetes.length;i++){'+'\n';			
	iCad=iCad+'		if (aCarpetes[iNx].id==aCarpetes[i].parentId){'+'\n';
	
	iCad=iCad+'		 iL.appendChild(iUl);'+'\n';
	iCad=iCad+'		 GetContentFromItem(iUl,aCarpetes[i].id,aCarpetes);'+'\n';	
	iCad=iCad+'		}'+'\n';
	iCad=iCad+'	}'+'\n';
	iCad=iCad+'}'+'\n';		
	iCad=iCad+'}'+'\n';

  
  
  iCad=iCad+'function ShowCarpetes(aObj){'+'\n';  
  iCad=iCad+'var iR=0;var iT=0;var iMin=10000;var iMax=0;'+'\n';	  
  iCad=iCad+'var iTBody=$("BodyCarpetes");'+'\n';	  
  iCad=iCad+'var iCarpetes=new Array;'+'\n';	    
  iCad=iCad+'	if (aObj.checked){'+'\n';		
	iCad=iCad+'			iTr=document.createElement("TR");'+'\n';
	iCad=iCad+'			iTd=document.createElement("TD");'+'\n';		
	iCad=iCad+'			iTr.appendChild(iTd);'+'\n';	
	iCad=iCad+'			iTBody.appendChild(iTr);'+'\n';	
	iCad=iCad+'			var iSelect=document.createElement("ul");'+'\n';		
	iCad=iCad+'			for (var i=0;i<ArrayCarpetes.length;i++){'+'\n';		
	iCad=iCad+'				iR=iR+parseInt(ArrayCarpetes[i].msgNoread);iT=iT+parseInt(ArrayCarpetes[i].msgTotals);'+'\n';
	iCad=iCad+'				iMax=(ArrayCarpetes[i].level>iMax)?ArrayCarpetes[i].level:iMax;'+'\n';
	iCad=iCad+'				iMin=(ArrayCarpetes[i].level<iMin)?ArrayCarpetes[i].level:iMin;'+'\n';
	iCad=iCad+'			}'+'\n';		
	
	iCad=iCad+'			var iUl=document.createElement("ul");'+'\n';			
	iCad=iCad+'			var iL=document.createElement("li");'+'\n';			
	iCad=iCad+'	 		var iInput=document.createElement("input");'+'\n';	
	iCad=iCad+'	 		var iA=document.createTextNode("Totes (" + iR + "/" + iT + ")");'+'\n';	
	iCad=iCad+'			iL.appendChild(iInput);'+'\n';				
	iCad=iCad+'			iL.appendChild(iA);'+'\n';					
	iCad=iCad+'			iUl.appendChild(iL);'+'\n';			
	iCad=iCad+'			iTd.appendChild(iUl);'+'\n';					
	
	iCad=iCad+'	 		iL.className="fnt112";'+'\n';
	iCad=iCad+'	 		iInput.type="checkbox";'+'\n';	
	iCad=iCad+'	 		iInput.value="Total";'+'\n';	
	iCad=iCad+'	 		iInput.setAttribute("path","");'+'\n';	
	iCad=iCad+'	 		iInput.setAttribute("msgTotals",0);'+'\n';	
	iCad=iCad	+'	 	iInput.setAttribute("msgNoread",0);'+'\n';	
	iCad=iCad+'	 		iInput.setAttribute("parentId","");'+'\n';
	iCad=iCad+'	 		iInput.setAttribute("tipus","chkcarpeta");'+'\n';	
	iCad=iCad+'	 		iInput.setAttribute("level",1);'+'\n';
	iCad=iCad+'	 		iInput.setAttribute("id","Total");'+'\n';
	iCad=iCad+'	 		iInput.setAttribute("name","Total");'+'\n';			
	iCad=iCad+'	 		iInput.addEventListener("click",Click_Chk1,false);'+'\n';		
	
	iCad=iCad+'			for (var i=0;i<ArrayCarpetes.length;i++){'+'\n';		
	iCad=iCad+'				var iUl1=document.createElement("ul");'+'\n';		
	iCad=iCad+'				iL.appendChild(iUl1);'+'\n';		
	iCad=iCad+'				if (ArrayCarpetes[i].level==iMin) {GetContentFromItem(iUl1,ArrayCarpetes[i].id,ArrayCarpetes);}'+'\n';	
	iCad=iCad+'			}'+'\n';		
	
	iCad=iCad+'}else{'+'\n';	
	iCad=iCad+'		while (iTBody.rows.length>1) {'+'\n';	
	iCad=iCad+'			iTBody.deleteRow(iTBody.rows.length-1);'+'\n';			
	iCad=iCad+'		}'+'\n';	
	iCad=iCad+'		MakeTable(ArrayMissatges);'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'return false;'+'\n';	
	iCad=iCad+'}'+'\n';
  
  
  iCad=iCad+'function ShowAgrupar(aObj){'+'\n';
  //ad=iCad+'var iTbl=$("TblOrdre");'+'\n';	
  iCad=iCad+'var iTBody=$("BodyAgrupacio");'+'\n';	  
  iCad=iCad+'var iArrCols=GetArrayColumnes();'+'\n';
  iCad=iCad+'Agrupacion="*|*";'+'\n';
  iCad=iCad+'Agrupado=aObj.checked;'+'\n';
	iCad=iCad+'	if (aObj.checked){'+'\n';	
	iCad=iCad+'		for (var i=0;i<2;i++){;'+'\n';
	iCad=iCad+'			iTr=document.createElement("TR");'+'\n';
	iCad=iCad+'			iTd=document.createElement("TD");'+'\n';		
	iCad=iCad+'			iTr.appendChild(iTd);'+'\n';	
	iCad=iCad+'			iTBody.appendChild(iTr);'+'\n';	
	iCad=iCad+'			var iSelect=document.createElement("SELECT");iSelect.id="Agr"+i;'+'\n';		
	iCad=iCad+'			iOpt=document.createElement("option");iOpt.text="Cap";iOpt.value="*";'+'\n';		
	iCad=iCad+'			iOpt.addEventListener("click",SetAgrupacio,false);'+'\n';			
	iCad=iCad+'			iSelect.appendChild(iOpt);'+'\n';		
	iCad=iCad+'			for (var j=0;j<iArrCols.length;j++){'+'\n';		
	iCad=iCad+'				if (iArrCols[j].Agrupador){'+'\n';		
	iCad=iCad+'					iOpt=document.createElement("option");'+'\n';		
	iCad=iCad+'					iOpt.text=iArrCols[j].Id;'+'\n';		
	iCad=iCad+'					iOpt.value=iArrCols[j].Propietat;'+'\n';		
	iCad=iCad+'					iSelect.appendChild(iOpt);'+'\n';		
	iCad=iCad+'					iOpt.addEventListener("click",SetAgrupacio,false);'+'\n';			
	iCad=iCad+'				}'+'\n';		
	iCad=iCad+'			}'+'\n';		
	iCad=iCad+'			iTd.appendChild(iSelect);'+'\n';		 
	iCad=iCad+'		}'+'\n';
	iCad=iCad+'}else{'+'\n';	
	iCad=iCad+'		while (iTBody.rows.length>1) {'+'\n';	
	iCad=iCad+'			iTBody.deleteRow(iTBody.rows.length-1);'+'\n';			
	iCad=iCad+'		}'+'\n';	
	iCad=iCad+'		MakeTable(ArrayMissatges);'+'\n';
	iCad=iCad+'}'+'\n';
	iCad=iCad+'return false;'+'\n';	
	iCad=iCad+'}'+'\n';

  
	iCad=iCad+'</script>'+'\n';
	return iCad;
}
//
//
function getHeader()
{
	var iCad='<head>'+'\n';
	//iCad=iCad+'<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">'+'\n';
	iCad=iCad+'<meta http-equiv="Content-Type" content="text/xml; charset=iso-8859-1">'+'\n';
	//header('Content-Type: text/xml; charset=ISO-8859-1');
	iCad=iCad+'<Title>Estadístiques</Title>'+'\n';
	iCad=iCad+getScript();
	iCad=iCad+'</head>'+'\n';
	iCad=iCad+'<link rel="stylesheet" type="text/css" media="screen" href="/UOC/stylesheet/styleICV.css">';
	return iCad;
}
function getIndexCarpetaFromId(aId,aCarpetes)
{
	for (var i=0;i<aCarpetes.length;i++)
	{
		if (aCarpetes[i].id.toUpperCase()==aId.toUpperCase()){return i};
	}
	return -1;
}
function GetContentFromItem(aId,aCarpetes)
{
	var iCad="";
	var iCad1="";
	var iCad2="";
	var iNx=-1;
	iNx=getIndexCarpetaFromId(aId,aCarpetes);	
	for (var i=0;i<aCarpetes.length;i++)	{if (aCarpetes[iNx].id==aCarpetes[i].parentId){iCad1=iCad1+GetContentFromItem(aCarpetes[i].id,aCarpetes);}}
	if (iCad1!="") {iCad1='\n<ul>\n'+iCad1+'</ul>\n';}
	iCad2='<input path="' + aCarpetes[iNx].path +'" type="checkbox" msgTotals="' + aCarpetes[iNx].msgTotals + '" msgNoread="' + aCarpetes[iNx].msgNoread + '" parentId="' + aCarpetes[iNx].parentId + '" tipus="chkcarpeta" level="' + aCarpetes[iNx].level +'" id="' + aCarpetes[iNx].id + '" name="' +aCarpetes[iNx].name+'" value="' + aCarpetes[iNx].name +'" onclick=Click_Chk(this.id)>';
	iCad=iCad+'<li class="fnt112">'+iCad2+ aCarpetes[iNx].name + ' (' + aCarpetes[iNx].msgNoread + '/' + aCarpetes[iNx].msgTotals +')' +iCad1 + '</li>\n';
	return iCad;
}
function getCarpetes()
{
	var iCad='<div id="Carpetes">\n<ul>'+'\n';
	var iMin=10000;
	var iMax=0;
	var iT=0;
	var iR=0;
	var iCarpetes=getCarpetasArray();
	iCarpetes.sort(SortByPath);
	for (var i=0;i<iCarpetes.length;i++){iR=iR+parseInt(iCarpetes[i].msgNoread);iT=iT+parseInt(iCarpetes[i].msgTotals);iMax=(iCarpetes[i].level>iMax)?iCarpetes[i].level:iMax;iMin=(iCarpetes[i].level<iMin)?iCarpetes[i].level:iMin;}
	iCad=iCad+'<li class="fnt112"><input path="" type="checkbox" msgTotals=0 msgNoread=0 parentId="" level=1 id="Total" name="Total" value="Total" onclick=Click_Chk(this.id)>Tots (' + iR + '/' + iT + ')<ul>';
	for (var i=0;i<iCarpetes.length;i++)
	{
		if (iCarpetes[i].level==iMin)
		{
			iCad=iCad+GetContentFromItem(iCarpetes[i].id,iCarpetes);
		}
		
	}
	iCad=iCad+'</ul></li>\n</div>';
	return iCad;
}

function getAgrupacio()
{
	var iCad='<TABLE id="TblOpcions"><TBODY id="BodyOpcions"><TR><TD>'+'\n';	
	
	iCad=iCad+'	<div id="xCarpetes">'+'\n';
	iCad=iCad+'		<TABLE id="TblCarpetes"><TBODY id="BodyCarpetes">'+'\n';	
	iCad=iCad+'			<TR><TD class="fnt112"><input id="ChkCarpetes" type="checkbox" onclick=ShowCarpetes(this);>Carpetes</TD></TR>';		
	iCad=iCad+'		</TBODY></TABLE>\n';	
	iCad=iCad+'	</div>';
	
	iCad=iCad+'	<div id="xFiltres">'+'\n';
	iCad=iCad+'		<TABLE id="TblAgrupacio"><TBODY id="BodyAgrupacio">'+'\n';	
	iCad=iCad+'			<TR><TD class="fnt112"><input id="ChkAgrupar" type="checkbox" onclick=ShowAgrupar(this);>Agrupar</TD></TR>';		
	iCad=iCad+'		</TBODY></TABLE>\n';	
	iCad=iCad+'	</div>';
	
	iCad=iCad+'	</TD></TR><TR><TD>';
	
	iCad=iCad+'	<div id="xColsVisibles">'+'\n';
	iCad=iCad+'		<TABLE id="TblVisible"><TBODY id="BodyVisible">'+'\n';	
	iCad=iCad+'			<TR><TD class="fnt112"><input id="ChkVisible" type="checkbox" onclick=ShowVisible(this);>Columnes Visibles</TD></TR>';		
	iCad=iCad+'		</TBODY></TABLE>\n';	
	iCad=iCad+'	</div>';	
	
	
	iCad=iCad+'	</TD></TR></TBODY></TABLE>';
	return iCad;
}



function GetBotoneraCmd()
{
	var iCad="";
	iCad='<input type="button" value="Buscar" onClick="Buscar()">\n';
	iCad=iCad+'<input type="button" value="Excel" onClick="ToExcel()">\n';	
	iCad=iCad+'<input type="button" value="Grups" onClick="TestGrups()">\n';	
	iCad=iCad + '<label class="fnt112">AutoFiltre<input id="chkAutoFiltre" type="checkbox" onClick="SetAutoFiltre(this)"></label>\n';
	return iCad;
}
function getBody()
{
	var iCad='<body>'+'\n';
	iCad=iCad+'<div id="Cmd">'+'\n';
	iCad=iCad+getCarpetes();
	iCad=iCad+getAgrupacio();	
	iCad=iCad + GetBotoneraCmd();
	iCad = iCad +'</div>'+'\n';
	iCad=iCad+'<hr>'+'\n';
	iCad=iCad+'<div id="DvPrg" width="100%"></div>'+'\n';	
	iCad=iCad+'<div id="Results"></div>'+'\n';	
	iCad=iCad+'<iframe id="FrmAlumnes" name="I1" src="http://cv.uoc.edu/cgi-bin/domainstatistics?s='+ getSessionId() +'&c='+getLogin().substring(0,13)+ '&amp;sort=name" height="0" width="0" scrolling="no" border="0" frameborder="0"></iframe>'+'\n';	
	if (getDomainId()!="") iCad=iCad+'<iframe id="FrmMembres" name="I2" src="http://cv.uoc.edu/webapps/classroom/032_common/users.jsp?s='+getSessionId()+ '&domainId=' + getDomainId() + '&domainsId=' + getDomainId() + '&appId=UOC&idLang=a" height="0" width="0" scrolling="no" border="0" frameborder="0"></iframe>'+'\n';
	iCad=iCad+'<iframe id="FrmGrups" name="FrmGrups" src=http://cv.uoc.edu/cgi-bin/hola?s='+ getSessionId() +'&t=Grups/grups.tmpl&domainFather=g071_11_092_01 height="0" width="0" scrolling="no" border="0" frameborder="0"></iframe>'+'\n';
	//iCad=iCad+'<TextArea rows=500 cols=500 id="TxtTest"></textarea>'+'\n';
	

	iCad=iCad+'</body>'+'\n';
	return iCad;
}

function getHtml()
{
	var iCad='<html>'+'\n';
	iCad=iCad+getHeader();
	iCad=iCad+getBody();
	iCad=iCad+'</html>'+'\n';
	return iCad;
}

function NovaFinestra()
{
	iWnd=window.open('about:blank');
	if (iWnd)
	{
		iWnd.opener=self;	
		iWnd.document.charset="iso-8859-1";	
		iWnd.document.open();					
		
		iWnd.document.write(getHtml());		
		iWnd.document.close();	
		
		return iWnd;
	}
	return null;
}
function CarregaUI()
{		

	switch(QuinaPagina(window))
	{
		case PAG_INFO_CARPETAS:  								
  		GM_setValue(KEY_CARPETAS,uneval(unsafeWindow.aFoldersArray));
  		break
		case PAG_HTML_CARPETAS: 															
  		break
  	case PAG_HTML_BUTTONS: 		
  		//if (ENTRADAAULA==false) GM_setValue(KEY_DOMAINID,"");
  		InsertaBoto();
  		GM_setValue(KEY_SESSION,unsafeWindow.sessionId);
  		GM_setValue(KEY_LOGIN,unsafeWindow.login);
  		GM_setValue(KEY_USER,unsafeWindow.userId);
  		break
  	case PAG_MENU_AULA:
  		//http://cv.uoc.edu/webapps/classroom/032_common/menu.jsp
  		ENTRADAAULA=true;
  		GM_setValue(KEY_DOMAINID,unsafeWindow.domainId);
  		break
  	case PAG_HTML_MSGS:
  		GM_setValue(KEY_URLMSGS,String(unsafeWindow.document.location).split('?')[0]);
  		GM_setValue(KEY_NUMMSGS,unsafeWindow.blockSize);  		
		default:					
  		break
	}
	return true;	
}
//*******************************   INICI

window.addEventListener("load", CarregaUI, false);