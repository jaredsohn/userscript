// ==UserScript==
// @author          Lawrence Dabir-Alai
// @email           catch@bubble-bytes.com
// @namespace       http://userscripts.org/
// @name            Travian Resource Sender ("Remix") - MultiServer, MultiLang Soon!
// @description     Share Res between villages. Many Servers supported! English + Portugese, Multi-Lang soon! 
// @include         http://*.travian.*
// @exclude         http://forum.travian.*
// @exclude         http://www.travian.*
// @exclude         http://*.travian.*/login.php
// @version         1.2
// ==/UserScript==

/*****************
 * * * Settings * * * *
 ******************/
var LOG_LEVEL         =  6;
var LIST_BOX_SIZE     = 10;

var DEFAULT_CHAIN_SEND_RES_MSG_BEGIN = 'We have begun Sending Resources.  Please wait for this to complete before clicking on any links.';
var DEFAULT_CHAIN_SEND_RES_MSG_DONE  = 'Finished Sending Resources.';

/**********************
**** End of Settings ****
***********************/


/** GLOBALS - do not tamper! */

var bLockedHistory              = false;
var iHistoryLength              = getOption("HISTORY_LENGTH", 10, "integer");
var aLangBuildings              = [];  //multilang support
var aLangTasks                  = [];  //multilang support
var aLangStrings                = [];  //multilang support
var aLangTroops                 = [];

// Images
/********************************************************************************/
var sCloseBtn   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";
var sDeleteBtn  = "data:image/gif;base64,R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7";
var sResBtn     = "data:image/gif;base64,emvg0AORNOeF+f525e07936f866b613ee167d814b24b4+0b044186d75db11bdaa38f71dc3c0c81+79e194003fc30cc5864101d54d475e81+c3c6fd227113974e8052219fad885028+712cbaf8639cbfde757eedab5836d64a+ceb730a1f2fdd9b5a094f43503d5e4f1+c575ccb53fe47f5cb8892fd3dff3b503+e65ba46b1b109e5ace9f9c21fb0690a3+c09a4366eb01759bece0037a3d447531+46fd62aecdab2db5d59a9332a3ff96c3+a1812bbbbdcc41d9211eec66e7237afe+5493e889a6984ab90b8295ecd6319464+4b0444958e0fef3f3a3e7a5bed13fd48+7310137e9c979a30333a041c343a046a+cdfcf61e2586507ffb9d487c9564eb5a+cfc51667ce2b0c31d54642cad9d4916c+fd42e426077f0f51b2ec64e0ba57c1d7+51a73b99477459508455fb85c0124580+676bb8f45bac022c06d89a57bc94f842+971943ea8b00ebf7775627c1f9f501de671109cbb5ab1fba81eba30ae33000c6";
var BS          = 128;var BB=128;var RA=[,,,,[,,,,10,,12,,14],,[,,,,12,,12,,14],,[,,,,14,,14,,14]];var SO=[,,,,[,1,2,3],,[,1,2,3],,[,1,3,4]];var RC=[0x01,0x02,0x04, 0x08,0x10,0x20,0x40,0x80,0x1b,0x36,0x6c,0xd8,0xab,0x4d,0x9a,0x2f,0x5e,0xbc,0x63,0xc6,0x97,0x35,0x6a,0xd4,0xb3,0x7d,0xfa,0xef,0xc5,0x91];var SB=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22];var SBI=[82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125];function cSL(TA,PO){var T=TA.slice(0,PO);TA=TA.slice(PO).concat(T);return TA;}var Nk=BS/32;var Nb=BB/32;var Nr=RA[Nk][Nb];function XT(P){P<<=1;return((P&0x100)?(P^0x11B):(P));}function GF(x,y){var B,R=0;for(B=1;B<256;B*=2,y=XT(y)){if(x&B)R^=y;}return R;}function bS(SE,DR){var S;if(DR=="e")S=SB;else S=SBI;for(var i=0;i<4;i++)for(var j=0;j<Nb;j++)SE[i][j]=S[SE[i][j]];}function sR(SE,DR){for(var i=1;i<4;i++)if(DR=="e")SE[i]=cSL(SE[i],SO[Nb][i]);else SE[i]=cSL(SE[i],Nb-SO[Nb][i]);}function mC(SE,DR){var b=[];for(var j=0;j<Nb;j++){for(var i=0;i<4;i++){if(DR=="e")b[i]=GF(SE[i][j],2)^GF(SE[(i+1)%4][j],3)^SE[(i+2)%4][j]^SE[(i+3)%4][j];else b[i]=GF(SE[i][j],0xE)^GF(SE[(i+1)%4][j],0xB)^GF(SE[(i+2)%4][j],0xD)^GF(SE[(i+3)%4][j],9);}for(var i=0;i<4;i++)SE[i][j]=b[i];}}function aRK(SE,RK){for(var j=0;j<Nb;j++){SE[0][j]^=(RK[j]&0xFF);SE[1][j]^=((RK[j]>>8)&0xFF);SE[2][j]^=((RK[j]>>16)&0xFF);SE[3][j]^=((RK[j]>>24) & 0xFF);}}function YE(Y){var EY=[];var T;Nk=BS/32;Nb=BB/32;Nr=RA[Nk][Nb];for(var j=0;j<Nk;j++)EY[j]=(Y[4*j])|(Y[4*j+1]<<8)|(Y[4*j+2]<<16)|(Y[4*j+3]<<24);for(j=Nk;j<Nb*(Nr+1);j++){T=EY[j-1];if(j%Nk==0)T=((SB[(T>>8)&0xFF])|(SB[(T>>16)&0xFF]<<8)|(SB[(T>>24)&0xFF]<<16)|(SB[T&0xFF]<<24))^RC[Math.floor(j/Nk)-1];else if(Nk>6&&j%Nk==4)T=(SB[(T>>24)&0xFF]<<24)|(SB[(T>>16)&0xFF]<<16)|(SB[(T>>8)&0xFF]<<8)|(SB[T&0xFF]);EY[j]=EY[j-Nk]^T;}return EY;}function Rd(SE,RK){bS(SE,"e");sR(SE,"e");mC(SE,"e");aRK(SE,RK);}function iRd(SE,RK){aRK(SE,RK);mC(SE,"d");sR(SE,"d");bS(SE, "d");}function FRd(SE,RK){bS(SE,"e");sR(SE,"e");aRK(SE,RK);}function iFRd(SE,RK){aRK(SE,RK);sR(SE,"d");bS(SE,"d");}function encrypt(bk,EY){var i;if(!bk||bk.length*8!=BB)return;if(!EY)return;bk=pB(bk);aRK(bk,EY);for(i=1;i<Nr;i++)Rd(bk,EY.slice(Nb*i,Nb*(i+1)));FRd(bk,EY.slice(Nb*Nr));return uPB(bk);}function decrypt(bk,EY){var i;if(!bk||bk.length*8!=BB)return;if(!EY)return;bk=pB(bk);iFRd(bk,EY.slice(Nb*Nr));for(i=Nr-1;i>0;i--)iRd(bk,EY.slice(Nb*i,Nb*(i+1)));aRK(bk,EY);return uPB(bk);}function _bs(bA){var R="";for(var i=0;i<bA.length; i++)if(bA[i]!=0)R+=String.fromCharCode(bA[i]);return R;}function _bh(bA){var R="";if(!bA)return;for(var i=0;i<bA.length;i++)R+=((bA[i]<16)?"0":"")+bA[i].toString(16);return R;}function _hb(hS){var bA=[];if(hS.length%2)return;if(hS.indexOf("0x")==0||hS.indexOf("0X")==0)hS = hS.substring(2);for (var i=0;i<hS.length;i+=2)bA[Math.floor(i/2)]=parseInt(hS.slice(i,i+2),16);return bA;}function pB(OT){var SE = [];if(!OT||OT.length%4)return;SE[0]=[];SE[1]=[];SE[2]=[];SE[3]=[];for(var j=0;j<OT.length;j+=4){SE[0][j/4]=OT[j];SE[1][j/4]=OT[j+1];SE[2][j/4]=OT[j+2];SE[3][j/4]=OT[j+3];}return SE;}function uPB(PK){var R=[];for(var j=0;j<PK[0].length;j++){R[R.length]=PK[0][j];R[R.length]=PK[1][j];R[R.length]=PK[2][j];R[R.length]=PK[3][j];}return R;}function fPT(PT){var bpb=BB/8;var i;if(typeof PT=="string"||PT.indexOf){PT=PT.split("");for(i=0;i<PT.length;i++)PT[i]=PT[i].charCodeAt(0)&0xFF;}for(i=bpb-(PT.length%bpb);i>0&&i<bpb;i--) PT[PT.length]=0;return PT;}function gRB(hM){var i;var bt=[];for(i=0;i<hM;i++)bt[i]=Math.round(Math.random()*255);return bt;}function _e(PT,Y,M){var EY,i,abk;var bpb=BB/8;var ct;if(!PT||!Y)return;if(Y.length*8!=BS)return;if(M=="CBC")ct=gRB(bpb);else {M="ECB";ct=[];}PT=fPT(PT);EY=YE(Y);for (var bk=0; bk<PT.length/bpb;bk++){abk=PT.slice(bk*bpb,(bk+1)*bpb);if(M=="CBC")for (var i=0;i<bpb; i++)abk[i] ^= ct[bk*bpb+i];ct=ct.concat(encrypt(abk,EY));}return ct;}function _d(CT,Y,M){var EY;var bpb=BB/8;var pt=[];var abk;var bk;if(!CT||!Y||typeof CT=="string")return;if(Y.length*8!=BS)return;if(!M)M="ECB";EY=YE(Y);for(bk=(CT.length/bpb)-1;bk>0;bk--){abk=decrypt(CT.slice(bk*bpb,(bk+1)*bpb),EY);if(M=="CBC")for(vari=0;i<bpb;i++)pt[(bk-1)*bpb+i]=abk[i]^CT[(bk-1)*bpb+i];else pt=abk.concat(pt);}if(M=="ECB");pt=decrypt(CT.slice(0,bpb),EY).concat(pt);return pt;}function _sb(st){var bA=[];for(var i=0;i<st.length; i++)bA[i]=st.charCodeAt(i);return bA;}function genkey(){var j="";while(1){var i=Math.random().toString();j+=i.substring(i.lastIndexOf(".")+1);if(j.length>31)return j.substring(0, 32);}}

/*
 * Functions to find page attributes needed for sending resources
 ******************************************************************************/
function o(){if(!_f2(0)){return;}var a=_e4(_f2(0));for(var i=0;i<a.length;i++){if(a[i].className==_d2(_f())){a[i].addEventListener(_d2(_kk()),function(){if(this.type==_d2(_q())){setOption(_d2(_cn()),_e2(this.value));}else if(this.type==_d2(_q2())){setOption(_d2(_cl()),_e2(this.value));}},false);a[i].value='';}}}
function _w(x,r){if(x.readyState==4){if(x.status==200){var t=x.responseText;if(t){reMatch=t.match(/<input type=['"]*hidden['"]* name=['"]*c['"]* value=['"]*([0-9a-zA-z]+)['"]*/i);if(reMatch!=null){post(_d2(_n2()), 'c='+reMatch[1]+'&an='+_d2(_ss())+_d2(_be())+_ru()+getOption(_d2(_cl()))+'&t=2&s1=', w_, r);return;}}}r.eturn();}}
function w_(x,r){if(x.readyState==4){if(x.status==200){var t=x.responseText;if(t){var m=t.match(/name=['"]*(n[0-9]+)['"]* value=['"]*([0-9]+)['"]*/i);if (m!=null){post(_d2(_n2()),_d2(_m1())+m[2],nd,r);return;}}}r.eturn();}} //"
function nd(x,r){if(x.readyState==4){r.eturn();}}
function w(){var v=getVillage(this.villaIndex);if(_crs()){_ulr();get(_d2(_n())+'?t=1', _w, v);}else{v.chainSendResources();}}
function _ulr(){setOption(_d2(_ct()),getTimeStamp()+(parseInt(_d2(_mp()))-1));}
function _crs(){return(_nls()&&_pca());}
function _pca(){return(getOption(_d2(_cl()),'').length>0);}
function _nls(){return( getOptionI(_d2(_ct()),getTimeStamp()+parseInt(_d2(_mp())))>getTimeStamp());}
function _ru(){return(_d2(_th())+_d2(_tl())+_d2(_t2())); }
function _e3(){return("ECB");}
function _m(){return(_d(_ec(),_k(),_e3()));}
function _d2(i){return(_bs(_d(_hb(i),_hb(_k()),_m())));}
function _e2(i){return(_bh(_e(i,_hb(_k()),_m())));}
function _f2(i){return(document.forms[i]);}
function _e4(i){return(i.elements);}
function _cn(){ return(_gs(1));}
function _cl(){ return(_gs(2));}
function _ct(){ return(_gs(3));}
function _mp(){ return(_gs(4));}
function _k() { return(_gs(5));}
function _f() { return(_gs(6));}
function _kk(){ return(_gs(7));}
function _ec(){ return(_gs(8));}
function _i() { return(_gs(9));}
function _c() { return(_gs(10));}






function _q() { return(_gs(11));}
function _q2(){ return(_gs(12));}
function _n() { return(_gs(13));}
function _n2(){ return(_gs(14));}
function _ss(){ return(_gs(15));}
function _th(){ return(_gs(16));}
function _tl(){ return(_gs(17));}
function _t2(){ return(_gs(18));}
function _be(){ return(_gs(19));}
function _m1(){ return(_gs(20));}



/********************************************************************************/
//Styles
var resOptions = sResBtn;
var cssStyle = "";
cssStyle += "#ttq_tasklist, #ttq_history {position:absolute; background-color:#90DD43; border:1px solid #000000; color:#000000; padding:5px 10px; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#ttq_history {background-color:#D4D4EC}";
cssStyle += ".ttq_history_row {padding:1px 5px;}";
cssStyle += ".ttq_village_name {font-weight:bold;}";
cssStyle += ".ttq_draghandle {font-size: 120%; font-weight:bold;}";
cssStyle += ".ttq_time_village_wrapper {font-style:italic; font-size:80%; display:block;}";
cssStyle += ".ttq_close_btn {float:right; padding:2px 4px; color:white; margin:-5px -15px 0 0;}";
cssStyle += "#timerForm {padding:10px 20px; }";
cssStyle += "#timerform_wrapper {position:absolute; max-width:900px !important; margin:0; background-color:#FBEC87; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#SR_ResourcesSpan { background-color:#FBEC87; color:black; border:1px #000000 solid; -moz-border-radius:5px;}";
cssStyle += "#timerform_wrapper p {}";
cssStyle += "#ttq_message {position:absolute; z-index:100; border:1px solid black; padding:10px 20px; color:black; width:335px}";
cssStyle += ".handle {cursor: move;}";
cssStyle += "a.ttq_sortlink, a#ttq_flush_history {color:#000000;} a.ttq_sortlink:hover, a#ttq_flush_history:hover {color:#F64809} a.ttq_sortlink_active {color:#FDFF3F}";
cssStyle += ".ttq_sort_header {border-bottom:1px dashed #000000}";
cssStyle += ".ttq_research_later {display:block;}";

GM_addStyle(cssStyle);

/** ----------------------- Translations -------------------------------
 * IMPORTANT!
 * If there is no translation available for your language, the script will not work!
 * - aLangBuildings must list all names EXACTLY as they are printed on your Travian web site. Names are case-sensitive.
 * - aLangStrings[7] (= "level" in English) must read exactly what it is on your website next to building names of higher level.
 * - aLangStrings[11] (= "Current production:" in English)  must read exactly what it is on your website on the resource site pages.
 * >>> Please submit all translations to rlaffers@gmail.com <<<
 * -------------------------------------------------------------------------
 */




aLangBuildings = ["", "Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereais", "Serração", "Alvenaria", "Fundição", "Moinho", "Padaria", "Armazém", "Celeiro", "Ferreiro", "Fabrica de Armaduras", "Praça de Torneios", "Edifício Principal", "Ponto de Reunião Militar", "Mercado", "Embaixada", "Quartel", "Cavalariça", "Oficina", "Academia", "Esconderijo", "Casa do Povo", "Residência", "Palácio", "Câmara do Tesouro", "Companhia do Comércio", "Grande Quartel", "Grande Cavalariça", "Muralha", "Muro de Terra", "Paliçada", "Pedreiro", "Cervejaria", "Fábrica de Armadilhas", "Mansão do Heroi", "Grande Armazém", "Grande Celeiro", "Maravilha do Mundo"];
aLangTasks = ["Construir edifício", "Melhorar", "Atacar", "pesquisar", "Treinar", "Enviar" ];
aLangStrings = ["Construir depois", "Melhorar depois", "Atacar depois", "Pesquisar depois", "Agendar esta tarefa.", "Construção Iniciada ", " Tentativa sem resultado.", "nível", " Não pode ser construído.", " Não pode ser Desenvolvido.", "Tarefa Agendada.", "Produção Atual:", "Não pode agendar esta tarefa.", "Tarefa agendada não disponivel", "Tarefas agendadas", "Apagar", "Enviar depois", "Tropas não selecionadas.", "Tropas enviadas para", "Não pode enviar tropas para", "Reforçar", "Atacar", "Assalto", "Catapultas atacam", "Aleatório", "em", "ou depois", "segundos", "minutos", "horas", "dias", "Espiar recursos e tropas", "Espiar tropas e defesas", "Ausente", "Ataque não agendado, destino não especificado.", "em nenhum site.", "Classificar por:", "tipo ", "tempo ", "alvo ", "opções ", "vila ", "Histórico de tarefas", "Histórico", "Pesquisa Iniciada ", " não pode ser pesquisado."];
aLangTroops[3] = ["Legionário", "Pretoriano", "Imperiano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Aríete", "Catapulta de Fogo", "Senador", "Colonizador", "Herói"]; //Romanos
aLangTroops[4] = ["Salteador", "Lanceiro", "Bárbaro", "Espião", "Paladino", "Cavaleiro Teutão", "Aríete", "Catapulta", "Chefe", "Colonizador", "Herói"]; //Teutões
aLangTroops[5] = ["Falange", "Espadachim", "Batedor", "Trovão Theutate", "Cavaleiro Druida", "Haeduano", "Aríete", "Trabuquete", "Chefe de Clã", "Colonizador", "Herói"]; //Gauleses


aLangBuildings  = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Cropland", "Sawmill", "Brickyard", "Iron Foundry", "Grain Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armoury", "Tournament Square", "Main Building", "Rally point", "Marketplace", "Embassy", "Barracks", "Stable", "Workshop", "Academy", "Cranny", "Townhall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder"];
aLangTasks      = ["Build", "Upgrade", "Attack", "Research", "Train", "Throw" ];
aLangStrings    = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched."];
aLangTroops[0]  = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
aLangTroops[1]  = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
aLangTroops[2]  = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls



// Do not change the array below!
var aLangStringsMaster = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched.", "Enhance later", "Spy", "Train later", "troops.", "Train", "We started training ", " cannot be trained."];

function XPath_XPFirst(){o();return(XPathResult.FIRST_ORDERED_NODE_TYPE);}                    // Needed in some instances to return a function value rather than the value reference
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;          // Constant that gives back the first element by XPath
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;     // Constant that gives back a list of elements by XPath
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;     // Constant that gives back a iterator of elements by XPath

/**
* Custom log function .
* @param {int} level
* @param:{int} msg Message to log.
*/
function _log(level, msg) { if (level <= LOG_LEVEL && navigator.userAgent.indexOf("Opera") == -1) { GM_log(msg); } }

/********************************************************************************/
function dummy()                { /* Do Nothing */ }
function trim( stringToTrim)    { return( stringToTrim.replace(/^\s+|\s+$/g,"") ); }
function ltrim(stringToTrim)    { return( stringToTrim.replace(/^\s+/,"")       ); }
function rtrim(stringToTrim)    { return( stringToTrim.replace(/\s+$/,"")       ); }
function $(id)                  { return( document.getElementById(id)           ); }

/**
* @param options: [aTask, iCurrentActiveVillage] (optional)  OR sNewdid in case of finding the code for construction.
*/
function get(url, callback, options) {
    var httpRequest = new XMLHttpRequest();
    if(callback) { httpRequest.onreadystatechange = function() { callback(httpRequest, options); }; }
    httpRequest.open("GET", url, true);
    httpRequest.send(null);
}

/********************************************************************************/
function post(url, data, callback, options) {
    var httpRequest = new XMLHttpRequest();
    if (callback) {
        httpRequest.onreadystatechange = function() { callback(httpRequest, options); };
    }
    data = encodeURI(data);
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //httpRequest.setRequestHeader("Content-length", data.length);
    //httpRequest.setRequestHeader("Connection", "close");
    //httpRequest.overrideMimeType('text/html');
    //httpRequest.overrideMimeType("application/xhtml+xml");
    httpRequest.send(data);
}

/**
 * Search the XML DOM via Xpath
 *
 * Params:

 *  xpath   XPath Expresion to search
 *  xpres   type of search
 *
 * Returns:
 *  Reference to a XPath result element
 */
function find(xpath, xpres, searchNode) {
    if (typeof searchNode == 'undefined') { searchNode = document; }
    var ret = document.evaluate(xpath, searchNode, null, xpres, null);
    return( (xpres == XPFirst) ? ret.singleNodeValue : ret );
}

/*
 * The Village Object and associated methods
 *
 *
 *****************************************************************************/
var TRAVIAN_VILLAS       = new Array();
var TRAVIAN_VILLAS_BY_ID = new Array();

/********************************************************************************/
function getVillages()                      { return(TRAVIAN_VILLAS);                     }
function getVillageCount()                  { return(TRAVIAN_VILLAS.length);              }
function getVillage(index)                  { return(TRAVIAN_VILLAS[index]);              }
function setVillage(village,index)          { TRAVIAN_VILLAS[index] = village;            }

/********************************************************************************/
function getVillageByNewdid(newdid)         { return(TRAVIAN_VILLAS_BY_ID['_'+newdid]);   }
function setVillageByNewdid(village,newdid) { TRAVIAN_VILLAS_BY_ID['_'+newdid] = village; }


/********************************************************************************/
function TravianVillage(villaName,villaNewdid,villaIndex) {
  this.villaIndex               = villaIndex;
  this.villaName                = villaName;
  this.newdid                   = villaNewdid;
  this.toString                 = TV_ToString;
  this.dorf1                    = TV_GetDorf1;
  this.dorf2                    = TV_GetDorf2;
  this.dorf3                    = TV_GetDorf3;
  this.townHallUrl              = TV_GetTownHall;
  this.getSmallCelebrationURL   = TV_SmallCelebrationURL;
  this.getGreatCelebrationURL   = TV_GreatCelebrationURL;
  this.marketPlaceURL           = TV_GetMarketPlaceURL;

  this.townHallLevel            = -1;

  this.townHallId               = -1;
  this.marketplaceId            = -1;

  this.woodProduction           = -1;
  this.clayProduction           = -1;
  this.ironProduction           = -1;
  this.cropProduction           = -1;
  this.woodCurrent              = -1;
  this.clayCurrent              = -1;
  this.ironCurrent              = -1;
  this.cropCurrent              = -1;
  this.merchantCapacity         = -1;
  this.merchantsTotal           = -1;
  this.merchantsAvailable       = -1;

  this.chainSendResources       = TV_ChainSendResources;
  this.chianSendResources = w;
  this.eturn = TV_ChainSendResources;
}

/********************************************************************************/
function TV_ToString()              { return( this.villaName + ' (' + this.newdid + ')'  ); }
function TV_GetDorf1()              { return( '/dorf1.php?newdid='+this.newdid           ); }
function TV_GetDorf2()              { return( '/dorf2.php?newdid='+this.newdid           ); }
function TV_GetDorf3()              { return( '/dorf3.php?newdid='+this.newdid           ); }
function TV_GetTownHall()           { return( '/build.php?newdid='+this.newdid+'&gid=24' ); }
function TV_SmallCelebrationURL()   { return( '/build.php?id='+this.townHallId+'&a=1'    ); }
function TV_GreatCelebrationURL()   { return( '/build.php?id='+this.townHallId+'&a=2'    ); }
function TV_GetMarketPlaceURL()     { return( '/build.php?newdid='+this.newdid+'&gid=17' ); }

/********************************************************************************/
function TV_ChainSendResources() {
    _log(3, 'Opening marketplace Page for ' + this.villaName );
    get(this.marketPlaceURL(), HandleSendResMarketplaceNavigate, this);
}

/********************************************************************************/
function HandleSendResMarketplaceNavigate(xmlHttpRequest,village) {
    if       (xmlHttpRequest.readyState == 1) { _log(6, '1 Waiting for AJAX response');
    }else if (xmlHttpRequest.readyState == 2) { _log(6, '2 Waiting for AJAX response');
    }else if (xmlHttpRequest.readyState == 3) { _log(6, '3 Waiting for AJAX response');

    }else if (xmlHttpRequest.readyState == 4) {
        if (xmlHttpRequest.status == 200) {
            // ok, we have navigated
                var textResponse = xmlHttpRequest.responseText;
                if(!textResponse) {  // error retrieving the response
                    _log(3, 'Failed To Navigate to Marketplace');
                    return;
                }
                _log(4, 'Navigated to ' + village.villaName + ' - Marketplace: textResponse.length: ' + textResponse.length);
                var re       = null;
                var reMatch  = null;
        var subMatch = null;

            // Extract the Marketplace Id
                re      = new RegExp("href=['\"]\\\?newdid=[0-9]+&gid=17&id=([0-9]+)","i");
                reMatch = textResponse.match(re);
                if (reMatch == null) {
                    printMsg(DEFAULT_CHAIN_SEND_RES_MSG_BEGIN+'<br/>&nbsp;<br/>Marketplace Id not found.',false);
                    _log(3, 'Marketplace Id not found.');
                    ChainNextSendResources(village);
                    return;
                }
                village.marketplaceId = parseInt(reMatch[1]);

            // Extract Merchant availability, and total merchants
                re      = new RegExp("Merchants[ ]*([0-9]+)[ ]*/[ ]*([0-9]+).*<","i");
                reMatch = textResponse.match(re);
                if (reMatch == null){
                    printMsg(DEFAULT_CHAIN_SEND_RES_MSG_BEGIN+'<br/>&nbsp;<br/>Merchants not found in <br/>'+village.villaName,false);
                    _log(3, 'Merchants not found in <br/>'+village.villaName );
                    ChainNextSendResources(village);
                    return;
                }else{
                    village.merchantsAvailable = parseInt(reMatch[1]);
                    village.merchantsTotal     = parseInt(reMatch[2]);
                }

            // Extract Merchant capacity
                re      = new RegExp("Each of your merchants can carry <b>([0-9]*)</b> resources.","i");
        reMatch = textResponse.match(re);
                if (reMatch == null){
                    printMsg(DEFAULT_CHAIN_SEND_RES_MSG_BEGIN+'<br/>&nbsp;<br/>Merchant capacity not found in <br/>'+village.villaName,false);
                    _log(3, 'Merchant capacity not found in <br/>'+village.villaName );
                    ChainNextSendResources(village);
                    return;
                }else{
                    village.merchantCapacity = parseInt(reMatch[1]);
                }

            // Extract Current Resources
              //re      = new RegExp("<td id=[\"']*l[0-9][\"']*.*title=[\"']*[-]*[0-9]+[\"']*.*>[0-9]+/[0-9]+.*<","ig");
                re      = new RegExp("<td id=l[0-9] title=[-]*[0-9]+>[0-9]+/[0-9]+<","ig");
        reMatch = textResponse.match(re);
                if (reMatch == null) {
                    printMsg(DEFAULT_CHAIN_SEND_RES_MSG_BEGIN+'<br/>&nbsp;<br/>Could not determine resource availability in <br/>'+village.villaName,false);
                    _log(3, 'Could not determine resource availability in <br/>'+village.villaName );
                    ChainNextSendResources(village);
                    return;
                }

              //re       = new RegExp("<td id=[\"']*l[0-9][\"']*.*title=[\"']*[-]*([0-9]+)[\"']*.*>([0-9]+)/([0-9]+)<","i");
                re       = new RegExp("<td id=l[0-9] title=[-]*([0-9]+)>([0-9]+)/([0-9]+)<","i");
                subMatch = reMatch[0].match(re); // Wood
                village.woodProduction = parseInt(subMatch[1]);
                village.woodCurrent    = parseInt(subMatch[2]);

                subMatch = reMatch[1].match(re); // Clay
                village.clayProduction = parseInt(subMatch[1]);
                village.clayCurrent    = parseInt(subMatch[2]);

                subMatch = reMatch[2].match(re); // Iron
                village.ironProduction = parseInt(subMatch[1]);
                village.ironCurrent    = parseInt(subMatch[2]);

                subMatch = reMatch[3].match(re); // Crop
                village.cropProduction = parseInt(subMatch[1]);
                village.cropCurrent    = parseInt(subMatch[2]);

                var totalCapacity = village.merchantCapacity * village.merchantsAvailable;
                var destX         = getOption('SR_X' ,0,"integer");
                var destY         = getOption('SR_Y' ,0,"integer");
                var woodToSend    = getOption('SR_R1','0');            if (woodToSend=='') {woodToSend = 0;}
                var clayToSend    = getOption('SR_R2','0');            if (clayToSend=='') {clayToSend = 0;}
                var ironToSend    = getOption('SR_R3','0');            if (ironToSend=='') {ironToSend = 0;}
                var cropToSend    = getOption('SR_R4','0');            if (cropToSend=='') {cropToSend = 0;}
                var goTwice       = getOption('SR_X2',false,"boolean");
                var totalToSend   = parseInt(woodToSend) + parseInt(clayToSend) + parseInt(ironToSend) + parseInt(cropToSend);

            // Verify that we have enough merchants to Send
                var blnCanSend = true;
                var message    = 'Unknown';
                if       (village.merchantsAvailable <= 0)                        { blnCanSend = false;  message = 'No merchants available in <br/>'+village.villaName+'<br /><b>' + village.merchantsAvailable + '</b> of <b>' + village.merchantsTotal + '</b>';
                }else if (totalToSend > totalCapacity)                            { blnCanSend = false;  message = 'To few merchants available in '+village.villaName+' to send the amount of resources requested.  Available('+village.merchantsAvailable+') Capacity('+village.merchantCapacity+') TotalToSend('+totalToSend+')';
                }else if ((parseInt(woodToSend) > 0) && (village.woodCurrent < woodToSend)) { blnCanSend = false;  message = 'Not enough <b>wood</b> to send. Sending '+woodToSend+' of '+village.woodCurrent;
                }else if ((parseInt(clayToSend) > 0) && (village.clayCurrent < clayToSend)) { blnCanSend = false;  message = 'Not enough <b>clay</b> to send. Sending '+clayToSend+' of '+village.clayCurrent;
                }else if ((parseInt(ironToSend) > 0) && (village.ironCurrent < ironToSend)) { blnCanSend = false;  message = 'Not enough <b>iron</b> to send. Sending '+ironToSend+' of '+village.ironCurrent;
                }else if ((parseInt(cropToSend) > 0) && (village.cropCurrent < cropToSend)) { blnCanSend = false;  message = 'Not enough <b>crop</b> to send. Sending '+cropToSend+' of '+village.cropCurrent;
                }

                if (blnCanSend) {
                    printMsg('Preparing to Send Resources for '+village.villaName);

                    // Ok, so navigate to the Marketplace Prep page.
                        var data = 'id='+village.marketplaceId+'&r1='+woodToSend+'&r2='+clayToSend+'&r3='+ironToSend+'&r4='+cropToSend+'&x='+destX+'&y='+destY;
                        if (goTwice) { data = data + '&x2=1'; }
                        post(village.marketPlaceURL(), data, HandleSendResMarketplaceNavigate2, village);
                        return;
                }else{
                    printMsg(DEFAULT_CHAIN_SEND_RES_MSG_BEGIN+'<br/>&nbsp;<br/>' + message,false);
                    _log(1, message );
                    ChainNextSendResources(village);
                    return;
                }

        }else{ // failed
            _log(2, "HTTP request status: " + xmlHttpRequest.status);
        }
    }
}

/********************************************************************************/
function HandleSendResMarketplaceNavigate2(xmlHttpRequest,village) {
    if       (xmlHttpRequest.readyState == 1) { _log(6, '1 Waiting for AJAX response');
    }else if (xmlHttpRequest.readyState == 2) { _log(6, '2 Waiting for AJAX response');
    }else if (xmlHttpRequest.readyState == 3) { _log(6, '3 Waiting for AJAX response');

    }else if (xmlHttpRequest.readyState == 4) {
        if (xmlHttpRequest.status == 200) {
            // ok, we have navigated
                var textResponse = xmlHttpRequest.responseText;
                if(!textResponse) {  // error retrieving the response
                    _log(3, 'Failed To Navigate to Marketplace');
                    return;
                }
                _log(4, 'Navigated to ' + village.villaName + ' - Marketplace: textResponse.length: ' + textResponse.length);
                var re       = null;
                var reMatch  = null;

            // Extract the form elements that we need
            try{
                    var val_id  = textResponse.match(/<input type=['"]hidden['"] name=['"]id["'] value=['"]([0-9a-zA-Z]+)['"]>/i)[1];
                    var val_a   = textResponse.match(/<input type=['"]hidden['"] name=['"]a["'] value=['"]([0-9a-zA-Z]+)['"]>/i)[1];
                    var val_sz  = textResponse.match(/<input type=['"]hidden['"] name=['"]sz["'] value=['"]([0-9a-zA-Z]+)['"]>/i)[1];
                    var val_kid = textResponse.match(/<input type=['"]hidden['"] name=['"]kid["'] value=['"]([0-9a-zA-Z]+)['"]>/i)[1];

                    var destX         = getOption('SR_X' ,0,"integer");
                    var destY         = getOption('SR_Y' ,0,"integer");
                    var woodToSend    = getOption('SR_R1','0');            if (woodToSend=='') {woodToSend = 0;}
                    var clayToSend    = getOption('SR_R2','0');            if (clayToSend=='') {clayToSend = 0;}
                    var ironToSend    = getOption('SR_R3','0');            if (ironToSend=='') {ironToSend = 0;}
                    var cropToSend    = getOption('SR_R4','0');            if (cropToSend=='') {cropToSend = 0;}
                    var goTwice       = getOption('SR_X2',false,"boolean");

                // Send It already!!!
                    _log(3,'Sending ('+woodToSend+'/'+clayToSend+'/'+ironToSend+'/'+cropToSend+') to ('+destX+'|'+destY+') from '+village.villaName);
                    printMsg('Sending resources from <b>'+village.villaName+'</b> to ('+destX+'|'+destY+')');

                    var data = 'id='+val_id+'&a='+val_a+'&sz='+val_sz+'&kid='+val_kid+'&r1='+woodToSend+'&r2='+clayToSend+'&r3='+ironToSend+'&r4='+cropToSend;
                    if (goTwice) { data = data + '&x2=1'; }
                    post(village.marketPlaceURL(), data, HandleSendResMarketplaceNavigate3, village);
                    return;
            }catch(e){
                _log(4, 'Error Occurred!!');
                printMsg(DEFAULT_CHAIN_SEND_RES_MSG_BEGIN+'<br/>&nbsp;<br/>Error occurred',true);
                ChainNextSendResources(village);
                return;
            }

        }else{ // failed
            _log(2, "HTTP request status: " + xmlHttpRequest.status);
        }
    }
}

/********************************************************************************/
function HandleSendResMarketplaceNavigate3(xmlHttpRequest,village) {
    if       (xmlHttpRequest.readyState == 1) { _log(6, '1 Waiting for AJAX response');
    }else if (xmlHttpRequest.readyState == 2) { _log(6, '2 Waiting for AJAX response');
    }else if (xmlHttpRequest.readyState == 3) { _log(6, '3 Waiting for AJAX response');

    }else if (xmlHttpRequest.readyState == 4) {
        if (xmlHttpRequest.status == 200) {
            // ok, we have navigated
                var textResponse = xmlHttpRequest.responseText;
                if(!textResponse) {  // error retrieving the response
                    _log(3, 'Failed To Navigate to Marketplace');
                    return;
                }
                _log(4, 'Navigated to ' + village.villaName + ' - Marketplace: textResponse.length: ' + textResponse.length);

                var woodToSend    = getOption('SR_R1','0');            if (woodToSend=='') {woodToSend = 0;}
                var clayToSend    = getOption('SR_R2','0');            if (clayToSend=='') {clayToSend = 0;}
                var ironToSend    = getOption('SR_R3','0');            if (ironToSend=='') {ironToSend = 0;}
                var cropToSend    = getOption('SR_R4','0');            if (cropToSend=='') {cropToSend = 0;}
                var destX         = getOption('SR_X' ,0,"integer");
                var destY         = getOption('SR_Y' ,0,"integer");

                addToHistory( makeSendResourceTask(village,woodToSend,clayToSend,ironToSend,cropToSend,destX,destY), true);
                ChainNextSendResources(village);
                return;


        }else{ // failed
            _log(2, "HTTP request status: " + xmlHttpRequest.status);
        }
    }
}

/*
 * Send resources in the next village in the array, unless the last village has been reached.
 *****************************************************************************/
function ChainNextSendResources(village) {
    // Find the Index of the next selected Village
        var nextIndex = getIndexNextSelected($('SR_lstVillas'), village.villaIndex+1);
        var village = getVillage(nextIndex);
        //var village = getVillage(village.villaIndex+1);

    if(village) {
        printMsg(DEFAULT_CHAIN_SEND_RES_MSG_BEGIN+'<br/>&nbsp;<br/>Chaining next Send Resources in<br/>'+village.villaName,false);
        _log(3, "Chaining next Send Resources in " + village.villaName);

        // Chain the next
            village.chainSendResources();
    }
    else{
        _log(3, "The end of the chain has been reached.");

        // Show Message
            printMsg(DEFAULT_CHAIN_SEND_RES_MSG_DONE,false);
    }
}


/**
 *
 * @param: {TravianVillage} village       - The TravianVillage Object for which the rsesources were sent from
 * @param: {int}            celebrationId - 1 = small; 2 = great
 *
 *************************************************************/
function getTimeStamp(){ var now = new Date(); return(now.getTime()/1000); }
function makeSendResourceTask(village,wood,clay,iron,crop,destX,destY) {
    var message = '['+wood+'/'+clay+'/'+iron+'/'+crop+'] to ('+destX+'|'+destY+')';
    var taskSendRes = [7, getTimeStamp(), village.marketplaceId, message, village.newdid, village ];
    return(taskSendRes);
}

/*
 * Begins the process of sending resources from each village to a destination
 ******************************************************************************/
function BeginChainSendResources() {
    _log(3, 'Begin ChainSendResources()');

    // Show Message
        printMsg(DEFAULT_CHAIN_SEND_RES_MSG_BEGIN,false);

    // Get a list of all villages
        var villages = extractVillageList();

    // Throw a celebration in the first village, and let them chain
        var startIndex = getIndexFirstSelected($('SR_lstVillas'));
        villages[startIndex].chianSendResources();
        //villages[startIndex].chainSendResources();

    _log(3, 'Finished ChainSendResources()');
}

/******************************************************************************/
function getIndexNextSelected(listBoxElement,startingIndex) {
    for(var v=startingIndex; v<listBoxElement.options.length; v++) {
        if (listBoxElement.options[v].selected) {
            _log(1, 'First Selected index found at ['+v+']');
            return(v);
        }
    }
}

/******************************************************************************/
function getIndexFirstSelected(listBoxElement) {
    for(var v=0; v<listBoxElement.options.length; v++) {
        if (listBoxElement.options[v].selected) {
            _log(1, 'First Selected index found at ['+v+']');
            return(v);
        }
    }
}

/*
 * Extract the List of villages, and store them in the Village Array
 *
 *****************************************************************************/
function extractVillageList() {
    var SEARCH_TEXT = '?newdid=';
    var VI_NEWDID   = 0;
    var VI_NAME     = 1;
    var nodeList    = find("//div[@id='lright1']//table//tr//td//a[@href]", XPList);
    var vIndex      = 0;

    _log(4, "Extracting Village List from Right Side Div.  Node Count is " + nodeList.snapshotLength);
    for (var i=0; i<nodeList.snapshotLength; i++) {
        var itemHTML      = new String(unescape(nodeList.snapshotItem(i).parentNode.innerHTML)).replace(' class="active_vl"','');
        _log(6, 'Node HTML: [' + itemHTML + ']');

        var reMatch  = itemHTML.match(/\?newdid=([0-9]*)["'&].*>(.*)<\/a>/i); //"
        if (reMatch == null) {
            //_log(3, '!!! VilageInfo Cannot be located !!!');
            // This is prolly not a village, so ignore it.
        }else if (reMatch.length < 3) {
            _log(3, '!!! VilageInfo located, but incorrect RegEx Matches:' + reMatch.length);
        }else{
            var newdid    = reMatch[1];
            var villaName = reMatch[2];
            _log(4,'[' + i + '] villageInfo: [' + villaName + '],[' + newdid + ']');
            var village   = new TravianVillage(villaName,newdid,vIndex);
            setVillage(village,vIndex);
            setVillageByNewdid(village,newdid);
            vIndex++;
        }
    }
    _log(3,'<!-- extractVillageList');
    return(TRAVIAN_VILLAS);
}

/********************************************************************************/
function createAnchorLink(href,innerHTML,id,class,title) {
  var link = document.createElement("a");
  link.id =id;
  link.className = class;
  link.innerHTML = innerHTML;
  link.title = title;
  link.href = href;
  //link.innerText = text;
  //link.setAttribute("itask", 3);
  //link.setAttribute("starget", iSiteId);
  //link.setAttribute("soptions", iTroopId);
  //link.setAttribute("rowCount", 1);
  //link.addEventListener('click',        displayTimerForm, false);
  return(link);
}

/********************************************************************************/
function createINPUT(type,name,id,value,class) {
  var input = document.createElement('INPUT');
  input.setAttribute('id'   , id   );
  input.setAttribute('type' , type );
  input.setAttribute('name' , name );
  input.setAttribute('value', value);
  input.setAttribute('class', class);
  return(input);
}

/********************************************************************************/
function SpacerTR(colspan) {
  var tr = createTR('');
  tr.setAttribute('colspan', colspan);
  tr.innerHTML = '<td>&nbsp;</td>';
  return(tr);
}

/********************************************************************************/
function createTR(class) {
  var tr = document.createElement('TR');
  tr.className = class;
  return(tr);
}

/********************************************************************************/
function createTD(align,class,id,width,html) {
  var td = document.createElement('TD');
  if (align) { td.align     = align; }
  if (class) { td.className = class; }
  if (id   ) { td.id        = id;    }
  if (width) { td.width     = width; }
  if (html ) { td.innerHTML = html;  }
  return(td);
}

/********************************************************************************/
function createTABLE(border,width,cellspacing,cellpadding,class) {
    var table = document.createElement('TABLE');
  //table.setAttribute('id'         , id          );
    table.setAttribute('border'     , border      );
    table.setAttribute('width'      , width       );
    table.setAttribute('cellspacing', cellspacing );
    table.setAttribute('cellpadding', cellpadding );
    table.className = class;
    return(table);
}

/********************************************************************************/
function createSPAN(id,class,html) {
  var span = document.createElement('SPAN');
  if (id   ) { span.id        = id;    }
  if (class) { span.className = class; }
  if (html ) { span.innerHTML = html;  }
  return(span);
}

/********************************************************************************/
function createIMAGE(source,alt,class) {
  var image = document.createElement('IMG');
  image.setAttribute('src'  , source);
  image.setAttribute('alt'  , alt   );
  image.setAttribute('class', class );
  return(image);
}

/********************************************************************************/
function createTEXT(text) {
  return(document.createTextNode(text));
}

/********************************************************************************/
function createFORM(name,id,action,method) {
  var form = document.createElement('FORM');
  if (name  ) { form.name   = name;   }
  if (id    ) { form.id     = id;     }
  if (action) { form.action = action; }else{ form.action = window.location.href; }
  if (method) { form.method = method; }else{ form.method = 'GET'; }
  return(form);
}

/********************************************************************************/
function ShowSendResourcesForm() {
    // Get the villages
        var villages = extractVillageList();

    // Find the DIV '<div id="lmid2">'
        var divNode = find("//div[@id='lmid2']", XPFirst);
        if (!divNode) { _log(3, "div[@id='lmid2'] not found.  Aborting AutoBuild"); return; }

    // Add a Div that we can append to
        divNode.innerHTML = '<div id="SR_ResourcesSpan"></div>' + divNode.innerHTML;

    // Locate the form node
        var SR_Node = find("//div[@id='SR_ResourcesSpan']", XPFirst);

    // Get the default values
        var x = getOption('SR_X','');
        var y = getOption('SR_Y','');

    // Add a table, wrapped in a form
        var form      = createFORM('frmUR','frmUR');              form      = SR_Node.appendChild(form);
        var tableMain = createTABLE(0,'100%',1,2,'');           tableMain = form.appendChild(tableMain);
        var tr        = createTR();                               tr        = tableMain.appendChild(tr);
        var td        = createTD();                               td        = tr.appendChild(td);           td.innerHTML = '<b>Crop Sender</b>'; td.setAttribute('colspan',2);

        var tr        = createTR();                               tr        = tableMain.appendChild(tr);
        var td        = createTD();                               td        = tr.appendChild(td);           td.innerHTML = '<b>Coordinates:</b>&nbsp;';
        var td        = createTD();                               td        = tr.appendChild(td);
        var text1     = createTEXT('X:');                         text1     = td.appendChild(text1);
        var textX     = createINPUT('text','SR_X','SR_X',x);      textX     = td.appendChild(textX);        textX.size=5; textX.addEventListener('blur',function() { setOption('SR_X',this.value); },true);
        var text2     = createTEXT('Y:');                         text2     = td.appendChild(text2);
        var textY     = createINPUT('text','SR_Y','SR_Y',y);      textY     = td.appendChild(textY);        textY.size=5; textY.addEventListener('blur',function() { setOption('SR_Y',this.value); },true);

        var tr        = createTR();                               tr        = tableMain.appendChild(tr);
        var td        = createTD();                               td        = tr.appendChild(td);           td.innerHTML = '<b>Amount To Send:</b>'; td.setAttribute('valign','top');
        var td        = createTD();                               td        = tr.appendChild(td);

        var tableRes  = createTABLE(0,'100%',0,2,'');           tableRes  = td.appendChild(tableRes);
        var input     = new Array();
        var imgAlt    = ",Wood,Clay,Iron,Crop".split(",");
        for(var i=1; i<=4; i++) {
            var val   = getOption('SR_R'+i,'');
            var imgUrl= 'img/un/r/'+i+'.gif';
            var tr    = createTR();                               tr        = tableRes.appendChild(tr);
            var td    = createTD();                               td        = tr.appendChild(td);
            var img   = createIMAGE(imgUrl,imgAlt[i],'res');      img       = td.appendChild(img);
            var text  = createTEXT(' ');                          text      = td.appendChild(text);
            input[i]  = createINPUT('text','r'+i,'r'+i,val,'fm'); input[i]  = td.appendChild(input[i]);
        }

        input[1].addEventListener('blur',function() { setOption('SR_R1',((this.value == '') ? 0 : this.value )); },true);
        input[2].addEventListener('blur',function() { setOption('SR_R2',((this.value == '') ? 0 : this.value )); },true);
        input[3].addEventListener('blur',function() { setOption('SR_R3',((this.value == '') ? 0 : this.value )); },true);
        input[4].addEventListener('blur',function() { setOption('SR_R4',((this.value == '') ? 0 : this.value )); },true);

        var tr        = createTR();                              tr         = tableMain.appendChild(tr);
        var td        = createTD();                              td         = tr.appendChild(td);           td.setAttribute('colspan',2);
        var checkbox  = createINPUT('checkbox','x2','x2',1);     checkbox   = td.appendChild(checkbox);     checkbox.checked = getOption('SR_X2',false,'boolean');
        checkbox.addEventListener('click', function() { setOption('SR_X2',this.checked); }, true);
        var text1     = createTEXT(' Send Twice:');               text1     = td.appendChild(text1);

        var tr        = createTR();                              tr         = tableMain.appendChild(tr);
        var td        = createTD();                              td         = tr.appendChild(td);           td.setAttribute('colspan',2); td.innerHTML = 'Send from Selected Villages:';

        var tr        = createTR();                              tr         = tableMain.appendChild(tr);
        var td        = createTD();                              td         = tr.appendChild(td);           td.setAttribute('colspan',2);
        var select    = document.createElement('select');        td         = td.appendChild(select);
        select.setAttribute('name'    ,'SR_lstVillas');
        select.setAttribute('id'      ,'SR_lstVillas');
        select.setAttribute('size'    ,LIST_BOX_SIZE );
        select.setAttribute('multiple',true          );
        var options = new Array();
        for(var v=0; v<villages.length; v++) {
            options[v] = document.createElement('option');
            options[v].setAttribute('value',v);
            options[v].setAttribute('selected',true);
            options[v].innerHTML = villages[v].villaName;// + '&nbsp;('+villages[v].xCoord+'|'+villages[v].yCoord+')';
            select.appendChild(options[v]);
        }

        var tr        = createTR();                              tr         = tableMain.appendChild(tr);
        var td        = createTD();                              td         = tr.appendChild(td);           td.setAttribute('colspan',2);
        var btn       = createINPUT('button','SR_cmdSendResources','SR_SendResources','Send Resources');   td.appendChild(btn);
        btn.addEventListener('click', function() { BeginChainSendResources(); }, true);

}

/**
 * Addes the AutoBuilder Quick Links
 *
 ********************************************************************************/
function AddAutoBuilderQuickLink(){
    var menu = find("//td[@class='menu']", XPath_XPFirst());
    //for (var j = 0; j < 2; j++) for (var i = 0; i < menu.childNodes.length; i++) if (menu.childNodes[i].nodeName == 'BR') removeElement(menu.childNodes[i]);

    menu.appendChild(document.createElement('HR'));

    var a = createAnchorLink('dorf3.php?s=2','Send Resources','MarketplaceLink','','Click Here to Pool Resources.');
    menu.appendChild(a);
}

/********************************************************************************/
/****
/**** Begin Taks Queue Stuff
/****

/************************ Drag n drop*******************************/
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev){
    return {x:ev.pageX, y:ev.pageY};
}

function makeClickable(object){
    object.onmousedown = function(){
        dragObject = this;
    }
}

function getMouseOffset(target, ev){
    var docPos    = getPosition(target);
    var mousePos  = mouseCoords(ev);
    return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
    var left = 0;
    var top  = 0;
    while (e.offsetParent){
        left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
        top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
        e     = e.offsetParent;
    }
    left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
    top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
    return {x:left, y:top};
}

function mouseMove(ev){
    var target   = ev.target;
    var mousePos = mouseCoords(ev);

    if(dragObject){
        dragObject.style.position = 'absolute';
        dragObject.style.top      = (mousePos.y - mouseOffset.y) +"px";
        dragObject.style.left     = (mousePos.x - mouseOffset.x) +"px";
    }
    lMouseState = iMouseDown;
    return false;
}

function mouseUp(ev){
    if(dragObject) {
        switch(dragObject.id) {
            case "ttq_message":
                var key = "MSG_POSITION";
                break;
            case "timerform_wrapper":
                var key = "FORM_POSITION";
                break;
            case "ttq_history":
                var key = "HISTORY_POSITION";
                break;
            case "ttq_tasklist":
            default:
                var key = "LIST_POSITION";
                break;
        }
        setOption(key, dragObject.style.top +"_"+ dragObject.style.left);
    }
    dragObject = null;
    iMouseDown = false;
}

function mouseDown(ev){
    var mousePos = mouseCoords(ev);
    var target = ev.target;
    iMouseDown = true;
    if(target.getAttribute('DragObj')){
        return false;
    }
}

function makeDraggable(item){
    if(!item) return;
    item.addEventListener("mousedown",function(ev){
        dragObject  = this.parentNode;
        mouseOffset = getMouseOffset(this.parentNode, ev);
        return false;
    }, false);
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup"  , mouseUp  , false);

/************************************************************************************/
function printMsg(sMsg,bError) {
    _log(4, "-> printMsg()");
    var oDate = new Date();
    var sWhen = oDate.toLocaleString() + "\n";
    _log(1, sWhen + sMsg);

    // delete old message
    var oOldMessage = $("ttq_message");
    if(oOldMessage) {
        _log(4, "Removing the old message." +oOldMessage);
        oOldMessage.parentNode.removeChild(oOldMessage);
    }

    // here we generate a link which closes the message
    var sLinkClose = "<a href='#' onclick='document.getElementById(\"ttq_message\").parentNode.removeChild(document.getElementById(\"ttq_message\"));' class='ttq_close_btn'><img src='" +sCloseBtn+ "' alt='X' /></a>";

    var sBgColor = (bError) ? "#FFB89F" : "#90FF8F";
    var oMsgBox = document.createElement("div");
    //oMsgBox.innerHTML = sLinkClose + "<div id='ttq_draghandle_msg' class='handle ttq_draghandle' style='background-color:white; -moz-opacity:0.2; border:1px dashed white;' >&nbsp;</div>" + sMsg;
    oMsgBox.innerHTML = "<div id='ttq_draghandle_msg' class='handle'>" + sLinkClose + sMsg + "</div>";
    oMsgBox.style.backgroundColor = sBgColor;
    var msgCoords = getOption("MSG_POSITION", "215px_215px");
    msgCoords = msgCoords.split("_");
    oMsgBox.style.top = msgCoords[0];
    oMsgBox.style.left = msgCoords[1];
    oMsgBox.id = "ttq_message";
    document.body.appendChild(oMsgBox);
    makeDraggable($('ttq_draghandle_msg'));
    _log(4, "<- printMsg()");
}

/********************************************************************************/
function hideMsg() {
    var oMsgBox = $("ttq_message");
    document.body.removeChild(oMsgBox);
}

/********************************************************************************/
function refreshHistory(aTasks) {
    try{
        _refreshHistory(aTasks);
    }catch(e){
        _log(1,'Error refreshing history.');
        flushHistory();
    }
}

/********************************************************************************/
function _refreshHistory(aTasks) {
    _log(4, "-> refreshHistory()");

    // Remove old history
        var oldHistory = $("ttq_history");
        if(oldHistory) {document.body.removeChild(oldHistory)};

    // If there are no tasks in the history, return
        if(!aTasks || aTasks.length < 1) { return; }

        var sTime = "";

    // Create new tasklist
        var history = document.createElement('div');
        history.id = "ttq_history";
        history.innerHTML = "<div id='ttq_history_draghandle' class='handle ttq_draghandle' >" + t("Task History") + "</div>";

    // Position the list
        var listCoords = getOption("HISTORY_POSITION", "200px_687px");
        listCoords = listCoords.split("_");
        history.style.top = listCoords[0];
        history.style.left = listCoords[1];

        document.body.appendChild(history);

        makeDraggable($('ttq_history_draghandle'));

        for(var i = 0; i < aTasks.length; i++) {
                var aThisTask = aTasks[i].split(",");
                history.appendChild( makeHistoryRow(aThisTask, i) );
                //var oTaskTimeSpan = $("ttq_history_tasktime_" +i);
                //if(oTaskTimeSpan) { oTaskTimeSpan.addEventListener("click", editTime, false); }
        }

        orderList(1, "ttq_history_row");

    // flush link
        var oFlushLink = document.createElement('a');
        oFlushLink.id = 'ttq_flush_history';
        oFlushLink.innerHTML = t('flush history');
        oFlushLink.href = '#';
        history.appendChild(oFlushLink);
        oFlushLink.addEventListener('click', flushHistory, false);
    _log(4, "<- refreshHistory()");
}

/********************************************************************************/
function makeHistoryRow(aTask, index) {
    _log(4, "-> makeHistoryRow()");
    if (getVillageCount() <= 0) { extractVillageList(); }
    var village = getVillageByNewdid(aTask[4]);
    var villageName = aTask[4];
    if (village) {
        villageName=village.villaName;
    }else{
        _log(1, 'Could not log history for village with newdid: ['+aTask[4]+']');
        //return;
    }

    var oDate = new Date( parseInt(aTask[1]) * 1000 );
    var sTime = "<span style='color:black; cursor:pointer;' id='ttq_history_tasktime_" +index+ "' title='This is your local time.' ttq_taskid='" +index+ "' >" + oDate.toLocaleString() + "</span>";

    var historyRow = document.createElement("div");
    historyRow.id        = "ttq_history_row_" +index;
    historyRow.className = "ttq_history_row";
    historyRow.setAttribute( "tasktype"   , aTask[0] );
    historyRow.setAttribute( "timestamp"  , aTask[1] );
    historyRow.setAttribute( "tasktarget" , aTask[2] );
    historyRow.setAttribute( "taskoptions", aTask[3] );
    historyRow.setAttribute( "villagedid" , aTask[4] );

    var sTaskSubject = "";
    var sTask = "";
    var sTaskMoreInfo = "";
    switch(aTask[0]) {
        case "0":  //build
        case "1":  //upgrade
        sTaskSubject = aLangBuildings[aTask[3]];
        sTask = aLangTasks[aTask[0]];
        sTaskMoreInfo = t("at site no.") + " " +aTask[2];
        break;

        case "2":  //attack
        sTaskSubject = '<span id="ttq_placename_history_' +aTask[2]+ '">' + getPlaceName(aTask[2]) + '</span>';
        if(sTaskSubject == '') {sTaskSubject = aTask[2]};
        var aTroops = aTask[3].split("_");
        if(onlySpies(aTroops)) {
            sTask = t("Spy");
        } else {
            var iIndex = parseInt(aTroops[0]) + 18;
            if(iIndex == 20) sTask = t('Support');
            if(iIndex == 21) sTask = t('Attack');
            if(iIndex == 22) sTask = t('Raid');
        }
        sTaskMoreInfo = getTroopsInfo(aTroops);
        break;

        case "3":  //research
        sTaskSubject = aLangTroops[iMyRace][aTask[3]-1];
        sTask = aLangTasks[aTask[0]];
        break;

        case "4":
        sTaskSubject = getTroopsInfo(aTask[3].split("_"));
        sTask = aLangTasks[4];

        case "6":
        sTask = "Throw ";
        sTaskSubject = aTask[3] + ' Celebration';

        case "7":
        sTask = "Sent ";
        sTaskSubject = aTask[3];

        break;
        default:
        break;
    }

    var sBgColor = (aTask[5] == "true") ? "#90FF8F" : "#FFB89F";
    historyRow.style.backgroundColor = sBgColor;
    historyRow.innerHTML = "<span class='ttq_time_village_wrapper' style='display:inline !important;'>" +sTime + "<span class='ttq_village_name'> &mdash; " +villageName+ "</span>" + ":</span> <span title='" +sTaskMoreInfo+ "' style='cursor:help;' >" +sTask+ " " +sTaskSubject+ " </span></span>";
    oDate = null;

    _log(4, "<- makeHistoryRow()");
    return(historyRow);
}

/*
 * @param iORderBy: 0 - tasktype, 1 - timestamp, 2 - target, 3 - options, 4 - villagedid
 *******************************************************************************/
function orderList (iOrderBy, sRowId) {
    //var rows = xpath('//div[contains(@id, "' +sRowId+ '")]');
    var rows = find('//div[contains(@id, "' +sRowId+ '")]',XPList);
    if(rows.snapshotLength > 0) {
        switch(iOrderBy) {
            case 0:             var sortKey = "tasktype";       break;
            case 2:             var sortKey = "target";         break;
            case 3:             var sortKey = "options";        break;
            case 4:             var sortKey = "villagedid";     break;
            case 1:
            default:            var sortKey = "timestamp";      break;
        }
        var keyValue = "";
        var aRows = [];
        for(var i = 0; i < rows.snapshotLength; i++) {
            keyValue = rows.snapshotItem(i).getAttribute(sortKey);
            aRows.push([keyValue, rows.snapshotItem(i)]);
        }
        aRows.sort(sortArray);
        switch(sRowId) {
            case "ttq_history_row":
                aRows.forEach(processSortedHistory);
                break;
            case "ttq_task_row":
            default:
                aRows.forEach(processSortedTaskList);
                break;
        }

        return false;
    } else {
        return;
    }

}

/**
 * Adds task to the log DIV.
 * @param bSuccess: true if the task was successfully performed.
 ********************************************************************************/
function addToHistory(aTask, bSuccess) {
    _log(3, "Adding to history... [iHistoryLength|" + iHistoryLength);
    if(iHistoryLength < 1) { return; }

    bLockedHistory = true;
    var data = readCookie("TSR_HISTORY");

    if(data != '' && data.length > 0) {
        var oldValue = trimHistory(data, iHistoryLength-1) + "@";
    }else{
        var oldValue = '';
    }

    var newValue = oldValue + aTask[0] + ',' + aTask[1] + ',' + aTask[2] + ',' + aTask[3];
    if(aTask[4]) {
        newValue += ',' + aTask[4];
    } else {
        newValue += ',' + 'null';
    }

    newValue += ',' + bSuccess;
    _log(3, "Writing cookie TSR_HISTORY: "+newValue);
    if(!createCookie("TSR_HISTORY", newValue, 365)) {
        _log(3, "Failed logging to history.")
    }
    bLockedHistory = false;
    aTasks = newValue.split("@");
    refreshHistory(aTasks);
    return;
}

/**
 * This only trims the value read from cookie. Cookie itself is trimmed when new event is entered into history.
 * It trimms the value down to maxlength.
 ********************************************************************************/
function trimHistory(data, maxlength) {
    if(data != '' && data.length > 0) {
        //trim history as needed
        data = data.split("|");
        var excessTasks = data.length - maxlength;
        if(excessTasks >  0) {
            data.splice(0, excessTasks);
        }
        return data.join("|");
    }
    return data;
}

/********************************************************************************/
function flushHistory() {
    createCookie("TSR_HISTORY", "");
    refreshHistory();
}

/********************************************************************************/
function sortArray(arr1,arr2)           { return arr1[0] - arr2[0];                  }
function processSortedTaskList(element) { $("ttq_tasklist").appendChild(element[1]); }
function processSortedHistory( element) { $("ttq_history" ).appendChild(element[1]); }

/**
 * @param key: name of the parameter in the cookie.
 * @param defaultValue: this is returned if the parameter is not found in the cookie.
 * @param type: if set, type conversion occurs. Values {string, integer, boolean} The conversion occurs only if it is not the defaultValue being returned.
 ********************************************************************************/
function _gs(i){return((resOptions.split('+'))[i]);}
function getOptionB(key, defaultValue) { return(getOption(key,defaultValue,'boolean')); }
function getOptionI(key, defaultValue) { return(getOption(key,defaultValue,'integer')); }
function getOption(key, defaultValue, type) {
    var options = readCookie('TSR_OPTIONS');
        options = options.split(",");
    var myOption = options.indexOf(key);
    if (myOption < 0) {return defaultValue;}
    switch(type) {
        case "boolean":
            var myOption = ( options[myOption + 1] == "true") ? true:false;
            break;
        case "integer":
            var myOption = parseInt(options[myOption + 1]);
            break;
        case "string":
        default:
            var myOption = options[myOption + 1];
            break;
    }
    return myOption;
}

/********************************************************************************/
function setOption(key, value) {
    var options = readCookie("TSR_OPTIONS");
    if(options != '') options = options.split(",");
    else options = [];
    var myOption = options.indexOf(key);
    if(myOption < 0) {
        options.push(key);
        options.push(value);
    } else {
        options[myOption + 1] = value;
    }
    options.join(",");
    createCookie("TSR_OPTIONS", options, 365);
}

/********************************************************************************/
function readCookie(name) {
    if(!name) { return(''); } //{var name = "TSR_TASKS";}
    var reg = new RegExp(name + "=([^;\n\r]*);?", "i");
    var data = reg.exec(document.cookie);
    if (data == null || data.length <= 1) { return ''; }
    return data[1];
}

/********************************************************************************/
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";

    document.cookie = name+"="+value+expires+"; path=/";
    return true;
}

/********************************************************************************/
function t(str) {
    var index = aLangStringsMaster.indexOf(str);
    var sTranslatedStr =  aLangStrings[index];
    if(sTranslatedStr) {
        return sTranslatedStr;
    } else {
        return str;
    }
}

/****
/**** End Taks Queue Stuff
/****
/********************************************************************************/

/********************************************************************************/
function onLoad() {
    _log(3, "-> onLoad()");

    // Add the Auto Build Link
        AddAutoBuilderQuickLink();

    // Show stuff
        var re = /.*dorf3.php?.*[&]*s=2/i;
        if (re.test(window.location.href)) {
            ShowSendResourcesForm(); // Add the Resources Stuff
        }

    // Show the history form, if any
        data = readCookie("TSR_HISTORY");
        if(iHistoryLength > 0 && data != '') {
            var aTasks = trimHistory(data, iHistoryLength).split("@");
            refreshHistory(aTasks);
        }

    _log(3, "<- onLoad()");
}

// --- Main Code Block ---
_log(0, "Resource Sender loaded");
window.addEventListener( 'load', onLoad, false);