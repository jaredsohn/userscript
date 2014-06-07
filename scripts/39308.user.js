// ==UserScript==
// @name           Ultima Pagina ao Responder - Em testes!
// @namespace      Caminhoneta Walton ;D
// @description    Ao responder a algum tópico, você é levado a última pagina do mesmo. =)
// @include        http://*.orkut.*CommMsgPost.aspx?cmm=*&tid=*
// @include        http://*.orkut.*CommMsgs.aspx?cmm=*&tid=*
// ==/UserScript==

/*
***************************************
***             LEIA!!!             ***
***************************************
*** Alguns erros estao presentes    ***
*** nessa versao, mas nada que      ***
*** prejudique o funcionamento      ***
*** do script. De qualquer modo,    ***
*** tentarei corrigir esses erros   ***
*** nas proximas versoes.           ***
***************************************
*** O SCRIPT ESTA EM PERIODO DE     ***
***         TESTES!!!               ***
***************************************
*/

// ESSE SCRIPT NÃO FOI DESENVOLVIDO POR MIM (DIEGOSCFC).




if (String(location).match(/CommMsgPost.aspx/i)) {

lol = window.location.href ;
lol = lol.split("?");


GM_setValue("UPRlink", lol[1]);

GM_setValue("UPRscript", "sim");

}


if (String(location).match(/CommMsgs.aspx/i)) {

lol = window.location.href ;
lol = lol.split("?");
lol = lol[1].split("&");
lol = lol[0] + "&" + lol[1] ;

link = GM_getValue("UPRlink");
ativado = GM_getValue("UPRscript");

if ( lol == link ) {
if ( ativado == "sim" ) { 
GM_setValue("UPRscript"," ");
link = window.location.href ;
window.location = link + "&na=2" ;
}
}
}