// ==UserScript==
// @name       DivulgadorChat
// @fullname      DivulgadorChat
// @version    2.2.0.0
// @description  Envio de propaganda automática para o Chats UOL, Bol e Terra. ATUALIZADO DIA: 12/set/2013 21:16
// @author       Roberson Arruda
// @homepage      http://userscripts.org/scripts/show/175331533
// @namespace     http://userscripts.org/scripts/show/175135233
// @downloadURL   http://userscripts.org/scripts/source/1751523.user.js
// @updateURL    http://userscripts.org/scripts/source/17515332.user.js
// @include	*batepapo.uol.com.br/room*
// @include	*bpbol.uol.com.br/room*
// @include	*chat.terra.*
// @exclude *batepapo.uol.com.br/static.*
// @exclude *batepapo.uol.com.br/about*
// @copyright  2013, Roberson Arruda (robersonarruda@outlook.com)
// ==/UserScript==
var _0x855e=["\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x73\x72\x63","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x64\x6C\x2E\x64\x72\x6F\x70\x62\x6F\x78\x75\x73\x65\x72\x63\x6F\x6E\x74\x65\x6E\x74\x2E\x63\x6F\x6D\x2F\x75\x2F\x31\x30\x32\x32\x32\x35\x30\x35\x36\x2F\x70\x61\x73\x73\x50\x72\x6D\x74\x64\x73\x2F\x64\x69\x76\x75\x6C\x67\x61\x43\x68\x61\x74\x50\x61\x73\x73\x2E\x6A\x73","\x6C\x61\x6E\x67\x75\x61\x67\x65","\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74","\x74\x79\x70\x65","\x74\x65\x78\x74\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x68\x65\x61\x64","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x24\x28\x22\x23\x43\x6F\x72\x70\x6F\x44\x43\x22\x29\x2E\x73\x6C\x69\x64\x65\x54\x6F\x67\x67\x6C\x65\x28\x29\x3B\x69\x66\x28\x74\x68\x69\x73\x2E\x76\x61\x6C\x75\x65\x3D\x3D\x22\x45\x53\x43\x4F\x4E\x44\x45\x52\x22\x29\x7B\x74\x68\x69\x73\x2E\x76\x61\x6C\x75\x65\x3D\x22\x45\x58\x49\x42\x49\x52\x22\x7D\x65\x6C\x73\x65\x7B\x74\x68\x69\x73\x2E\x76\x61\x6C\x75\x65\x3D\x22\x45\x53\x43\x4F\x4E\x44\x45\x52\x22\x7D","\x69\x6E\x70\x75\x74","\x62\x75\x74\x74\x6F\x6E","\x73\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65","\x69\x64","\x65\x78\x69\x62\x69\x72\x31","\x76\x61\x6C\x75\x65","\x45\x53\x43\x4F\x4E\x44\x45\x52","\x73\x74\x79\x6C\x65","\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x3A\x23\x46\x46\x33\x33\x30\x30\x3B\x20\x77\x69\x64\x74\x68\x3A\x20\x31\x38\x34\x70\x78\x3B\x20\x62\x6F\x72\x64\x65\x72\x3A\x20\x31\x70\x78\x20\x73\x6F\x6C\x69\x64\x20\x72\x67\x62\x28\x30\x2C\x20\x30\x2C\x20\x30\x29\x3B\x20\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x20\x66\x69\x78\x65\x64\x3B\x20\x7A\x2D\x69\x6E\x64\x65\x78\x3A\x20\x32\x30\x30\x32\x3B\x20\x62\x6F\x74\x74\x6F\x6D\x3A\x20\x30\x70\x78\x3B\x20\x72\x69\x67\x68\x74\x3A\x20\x33\x30\x70\x78\x3B","\x6F\x6E\x6D\x6F\x75\x73\x65\x6F\x76\x65\x72","\x74\x68\x69\x73\x2E\x73\x74\x79\x6C\x65\x2E\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x43\x6F\x6C\x6F\x72\x20\x3D\x20\x22\x23\x46\x46\x37\x41\x30\x30\x22","\x6F\x6E\x6D\x6F\x75\x73\x65\x6F\x75\x74","\x74\x68\x69\x73\x2E\x73\x74\x79\x6C\x65\x2E\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x43\x6F\x6C\x6F\x72\x20\x3D\x20\x22\x23\x46\x46\x33\x33\x30\x30\x22","\x6F\x6E\x6D\x6F\x75\x73\x65\x64\x6F\x77\x6E","\x74\x68\x69\x73\x2E\x73\x74\x79\x6C\x65\x2E\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x43\x6F\x6C\x6F\x72\x20\x3D\x20\x22\x23\x45\x42\x38\x30\x33\x38\x22","\x6F\x6E\x6D\x6F\x75\x73\x65\x75\x70","\x6F\x6E\x63\x6C\x69\x63\x6B","\x62\x6F\x64\x79","\x64\x69\x76","\x43\x6F\x72\x70\x6F\x44\x43","\x6E\x61\x6D\x65","\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x3A\x20\x72\x67\x62\x28\x36\x30\x2C\x20\x35\x36\x2C\x20\x35\x36\x29\x3B\x20\x66\x6F\x6E\x74\x2D\x73\x69\x7A\x65\x3A\x31\x32\x70\x78\x3B\x20\x63\x6F\x6C\x6F\x72\x3A\x20\x72\x67\x62\x28\x32\x32\x38\x2C\x20\x32\x32\x38\x2C\x20\x32\x32\x38\x29\x3B\x20\x77\x69\x64\x74\x68\x3A\x20\x31\x38\x30\x70\x78\x3B\x20\x74\x65\x78\x74\x2D\x61\x6C\x69\x67\x6E\x3A\x20\x63\x65\x6E\x74\x65\x72\x3B\x66\x6F\x6E\x74\x2D\x77\x65\x69\x67\x68\x74\x3A\x20\x62\x6F\x6C\x64\x3B\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x20\x66\x69\x78\x65\x64\x3B\x7A\x2D\x69\x6E\x64\x65\x78\x3A\x20\x32\x30\x30\x32\x3B\x70\x61\x64\x64\x69\x6E\x67\x3A\x20\x35\x70\x78\x20\x30\x70\x78\x20\x30\x70\x78\x20\x35\x70\x78\x3B\x62\x6F\x74\x74\x6F\x6D\x3A\x20\x32\x34\x70\x78\x3B\x72\x69\x67\x68\x74\x3A\x20\x33\x30\x70\x78\x3B\x68\x65\x69\x67\x68\x74\x3A\x20\x32\x37\x35\x70\x78\x3B","\x67\x65\x74\x54\x69\x6D\x65","\x73\x65\x74\x54\x69\x6D\x65","\x63\x6F\x6F\x6B\x69\x65","\x3D","\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x55\x54\x43\x53\x74\x72\x69\x6E\x67","\x28\x5E\x7C\x3B\x29\x20\x3F","\x3D\x28\x5B\x5E\x3B\x5D\x2A\x29\x28\x3B\x7C\x24\x29","\x6D\x61\x74\x63\x68","\x53\x65\x6E\x68\x61\x20\x64\x65\x20\x64\x65\x73\x62\x6C\x6F\x71\x75\x65\x69\x6F\x3A","\x63\x72\x65\x61\x74\x65\x54\x65\x78\x74\x4E\x6F\x64\x65","\x62\x72","\x74\x65\x78\x74","\x63\x6F\x64\x69\x67\x6F\x64\x69\x76\x75\x6C\x67\x61\x64\x6F\x72","\x73\x65\x6E\x68\x61\x20\x64\x65\x20\x64\x65\x73\x62\x6C\x6F\x71\x75\x65\x69\x6F","\x69\x66\x20\x28\x74\x68\x69\x73\x2E\x76\x61\x6C\x75\x65\x3D\x3D\x22\x73\x65\x6E\x68\x61\x20\x64\x65\x20\x64\x65\x73\x62\x6C\x6F\x71\x75\x65\x69\x6F\x22\x29\x20\x7B\x74\x68\x69\x73\x2E\x76\x61\x6C\x75\x65\x3D\x22\x22\x3B\x7D\x20\x74\x68\x69\x73\x2E\x73\x65\x6C\x65\x63\x74\x28\x29\x3B","\x6F\x6E\x62\x6C\x75\x72","\x69\x66\x20\x28\x74\x68\x69\x73\x2E\x76\x61\x6C\x75\x65\x3D\x3D\x22\x22\x29\x20\x7B\x74\x68\x69\x73\x2E\x76\x61\x6C\x75\x65\x3D\x22\x73\x65\x6E\x68\x61\x20\x64\x65\x20\x64\x65\x73\x62\x6C\x6F\x71\x75\x65\x69\x6F\x22\x3B\x7D","\x62\x6F\x72\x64\x65\x72\x3A\x31\x70\x78\x20\x73\x6F\x6C\x69\x64\x20\x23\x30\x30\x30\x30\x30\x30","\x61\x75\x74\x6F\x63\x6F\x6D\x70\x6C\x65\x74\x65","\x6F\x6E","\x73\x65\x6E\x68\x61","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x6D\x65\x6E\x73\x61\x67\x65\x6D\x20\x61\x71\x75\x69","\x63\x6D\x65\x6E\x73\x61\x67\x65\x6D\x31","\x69\x66\x20\x28\x74\x68\x69\x73\x2E\x76\x61\x6C\x75\x65\x3D\x3D\x22\x6D\x65\x6E\x73\x61\x67\x65\x6D\x20\x61\x71\x75\x69\x22\x29\x20\x7B\x74\x68\x69\x73\x2E\x76\x61\x6C\x75\x65\x3D\x22\x22\x3B\x7D\x20\x74\x68\x69\x73\x2E\x73\x65\x6C\x65\x63\x74\x28\x29\x3B","\x69\x66\x20\x28\x74\x68\x69\x73\x2E\x76\x61\x6C\x75\x65\x3D\x3D\x22\x22\x29\x20\x7B\x74\x68\x69\x73\x2E\x76\x61\x6C\x75\x65\x3D\x22\x6D\x65\x6E\x73\x61\x67\x65\x6D\x20\x61\x71\x75\x69\x22\x3B\x7D","\x63\x6D\x65\x6E\x73\x61\x67\x65\x6D\x32","\x63\x6D\x65\x6E\x73\x61\x67\x65\x6D\x33","\x63\x6D\x65\x6E\x73\x61\x67\x65\x6D\x34","\x63\x6D\x65\x6E\x73\x61\x67\x65\x6D\x35","\x6C\x65\x6E\x67\x74\x68","\x66\x6F\x72\x6D\x4D\x65\x73\x73\x61\x67\x65\x73","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x72\x65\x6D\x6F\x76\x65","\x5F","\x73\x70\x6C\x69\x74","\x69\x6E\x70\x4D\x65\x73\x73\x61\x67\x65\x5F","\x6D\x61\x78\x4C\x65\x6E\x67\x74\x68","\x39\x39\x39\x39\x39\x39","\x69\x63\x6F\x6E\x2D\x63\x6C\x61\x73\x73\x69\x63\x2D\x31","\x63\x68\x61\x6E\x67\x65\x4D\x79\x49\x63\x6F\x6E","\x6D\x65\x74\x68\x6F\x64","\x43\x68\x61\x74\x49\x6E\x74\x65\x72\x66\x61\x63\x65","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x63\x74\x6E\x2D\x63\x68\x61\x74\x2D\x62\x6F\x61\x72\x64","\x63\x6C\x69\x63\x6B","\x62\x74\x53\x65\x6E\x64\x4D\x65\x73\x73\x61\x67\x65\x5F","\x62\x6C\x6F\x63\x6F\x5F\x6D\x65\x6E\x73\x61\x67\x65\x6D","\x6D\x65","\x62\x6F\x74\x61\x6F\x2D\x65\x6E\x76\x69\x61\x72","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x43\x6C\x61\x73\x73\x4E\x61\x6D\x65","\x62\x74\x45\x6E\x76\x69\x61\x72","\x64\x65\x73\x61\x74\x69\x76\x61\x64\x6F","\x53\x65\x6E\x68\x61\x20\x69\x6E\x76\xE1\x6C\x69\x64\x61\x21\x20\x45\x6E\x74\x72\x65\x20\x65\x6D\x20\x63\x6F\x6E\x74\x61\x74\x6F\x20\x63\x6F\x6D\x20\x67\x72\x75\x70\x6F\x5F\x64\x69\x61\x6D\x61\x6E\x74\x65\x40\x6F\x75\x74\x6C\x6F\x6F\x6B\x2E\x63\x6F\x6D","\x6D\x61\x78\x6C\x65\x6E\x67\x74\x68","\x39\x39\x39\x39\x39","\x73\x65\x74\x49\x6E\x74\x65\x72\x76\x61\x6C","\x50\x72\x6F\x70\x61\x67\x61\x6E\x64\x61\x31","\x64\x65\x73\x61\x74\x69\x76\x61\x72\x20\x70\x72\x6F\x70\x61\x67\x61\x6E\x64\x61","\x61\x74\x69\x76\x61\x64\x6F","\x61\x74\x69\x76\x61\x72\x20\x70\x72\x6F\x70\x61\x67\x61\x6E\x64\x61","\x61\x74\x69\x76\x61\x72\x20\x70\x72\x6F\x70\x61\x67\x61\x6E\x64\x61\x20\x74\x65\x78\x74\x6F","\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x3A\x23\x46\x46\x33\x33\x30\x30\x3B\x77\x69\x64\x74\x68\x3A\x31\x35\x31\x70\x78\x3B\x62\x6F\x72\x64\x65\x72\x3A\x31\x70\x78\x20\x73\x6F\x6C\x69\x64\x20\x23\x30\x30\x30\x30\x30\x30","\x68\x70\x72\x5F\x63\x6F\x64\x40\x6D\x73\x6E\x2E\x63\x6F\x6D\x20\x44\x69\x76\x75\x6C\x67\x61\x64\x6F\x72\x43\x68\x61\x74\x20\x76\x32\x2E\x31\x2E\x30\x2E\x30"]
var AdsCht=document[_0x855e[1]](_0x855e[0]);
AdsCht[_0x855e[2]]=_0x855e[3];
AdsCht[_0x855e[4]]=_0x855e[5];
AdsCht[_0x855e[6]]=_0x855e[7];
document[_0x855e[10]](_0x855e[9])[0][_0x855e[8]](AdsCht);
var exibir=_0x855e[11];
var btnExibir=document[_0x855e[1]](_0x855e[12]);
with(btnExibir)
{
	btnExibir[_0x855e[14]](_0x855e[6],_0x855e[13]);
	btnExibir[_0x855e[14]](_0x855e[15],_0x855e[16]);
	btnExibir[_0x855e[14]](_0x855e[17],_0x855e[18]);
	btnExibir[_0x855e[14]](_0x855e[19],_0x855e[20]);
	btnExibir[_0x855e[14]](_0x855e[21],_0x855e[22]);
	btnExibir[_0x855e[14]](_0x855e[23],_0x855e[24]);
	btnExibir[_0x855e[14]](_0x855e[25],_0x855e[26]);
	btnExibir[_0x855e[14]](_0x855e[27],_0x855e[22]);
	btnExibir[_0x855e[14]](_0x855e[28],exibir);
}
document[_0x855e[10]](_0x855e[29])[0][_0x855e[8]](btnExibir);
var divCorpo=document[_0x855e[1]](_0x855e[30]);
with(divCorpo)
{
	divCorpo[_0x855e[14]](_0x855e[15],_0x855e[31]);
	divCorpo[_0x855e[14]](_0x855e[32],_0x855e[31]);
	divCorpo[_0x855e[14]](_0x855e[19],_0x855e[33]);
}
document[_0x855e[10]](_0x855e[29])[0][_0x855e[8]](divCorpo);
function gravarCookie(_0x7d78x6,_0x7d78x7)
{
	var _0x7d78x8= new Date();
	_0x7d78x8[_0x855e[35]](_0x7d78x8[_0x855e[34]]()+87600000*365);
	document[_0x855e[36]]=_0x7d78x6+_0x855e[37]+_0x7d78x7+_0x855e[38]+_0x7d78x8[_0x855e[39]]();
}
;
function lerCookie(_0x7d78x6)
{
	var _0x7d78xa=document[_0x855e[36]][_0x855e[42]](_0x855e[40]+_0x7d78x6+_0x855e[41]);
	return _0x7d78xa?_0x7d78xa[2]:null;
}
;
var textCodigo=document[_0x855e[44]](_0x855e[43]);
divCorpo[_0x855e[8]](textCodigo);
var quebraLinha=document[_0x855e[1]](_0x855e[45]);
divCorpo[_0x855e[8]](quebraLinha);
var inpCodigo=document[_0x855e[1]](_0x855e[12]);
with(inpCodigo)
{
	inpCodigo[_0x855e[14]](_0x855e[6],_0x855e[46]);
	inpCodigo[_0x855e[14]](_0x855e[32],_0x855e[47]);
	inpCodigo[_0x855e[14]](_0x855e[15],_0x855e[47]);
	inpCodigo[_0x855e[14]](_0x855e[17],_0x855e[48]);
	inpCodigo[_0x855e[14]](_0x855e[28],_0x855e[49]);
	inpCodigo[_0x855e[14]](_0x855e[50],_0x855e[51]);
	inpCodigo[_0x855e[14]](_0x855e[19],_0x855e[52]);
	inpCodigo[_0x855e[14]](_0x855e[53],_0x855e[54]);
}
divCorpo[_0x855e[8]](inpCodigo);
var senhaCookie=lerCookie(_0x855e[55])
if(senhaCookie!=null)
{
	document[_0x855e[56]](_0x855e[47])[_0x855e[17]]=senhaCookie;
}
var quebraLinha2=document[_0x855e[1]](_0x855e[45]);
divCorpo[_0x855e[8]](quebraLinha2);
var textCodigo=document[_0x855e[44]](_0x855e[57]);
divCorpo[_0x855e[8]](textCodigo);
var inpEmail=document[_0x855e[1]](_0x855e[12]);
with(inpEmail)
{
	inpEmail[_0x855e[14]](_0x855e[6],_0x855e[46]);
	inpEmail[_0x855e[14]](_0x855e[32],_0x855e[58]);
	inpEmail[_0x855e[14]](_0x855e[15],_0x855e[58]);
	inpEmail[_0x855e[14]](_0x855e[17],_0x855e[57]);
	inpEmail[_0x855e[14]](_0x855e[28],_0x855e[59]);
	inpEmail[_0x855e[14]](_0x855e[50],_0x855e[60]);
	inpEmail[_0x855e[14]](_0x855e[19],_0x855e[52]);
	inpEmail[_0x855e[14]](_0x855e[53],_0x855e[54]);
}
divCorpo[_0x855e[8]](inpEmail);
var textCodigo2=document[_0x855e[44]](_0x855e[57]);
divCorpo[_0x855e[8]](textCodigo2);
var inpEmail2=document[_0x855e[1]](_0x855e[12]);
with(inpEmail2)
{
	inpEmail2[_0x855e[14]](_0x855e[6],_0x855e[46]);
	inpEmail2[_0x855e[14]](_0x855e[32],_0x855e[61]);
	inpEmail2[_0x855e[14]](_0x855e[15],_0x855e[61]);
	inpEmail2[_0x855e[14]](_0x855e[17],_0x855e[57]);
	inpEmail2[_0x855e[14]](_0x855e[28],_0x855e[59]);
	inpEmail2[_0x855e[14]](_0x855e[50],_0x855e[60]);
	inpEmail2[_0x855e[14]](_0x855e[19],_0x855e[52]);
	inpEmail2[_0x855e[14]](_0x855e[53],_0x855e[54]);
}
divCorpo[_0x855e[8]](inpEmail2);
var textCodigo3=document[_0x855e[44]](_0x855e[57]);
divCorpo[_0x855e[8]](textCodigo3);
var inpEmail3=document[_0x855e[1]](_0x855e[12]);
with(inpEmail3)
{
	inpEmail3[_0x855e[14]](_0x855e[6],_0x855e[46]);
	inpEmail3[_0x855e[14]](_0x855e[32],_0x855e[62]);
	inpEmail3[_0x855e[14]](_0x855e[15],_0x855e[62]);
	inpEmail3[_0x855e[14]](_0x855e[17],_0x855e[57]);
	inpEmail3[_0x855e[14]](_0x855e[28],_0x855e[59]);
	inpEmail3[_0x855e[14]](_0x855e[50],_0x855e[60]);
	inpEmail3[_0x855e[14]](_0x855e[19],_0x855e[52]);
	inpEmail3[_0x855e[14]](_0x855e[53],_0x855e[54]);
}
divCorpo[_0x855e[8]](inpEmail3);
var textCodigo4=document[_0x855e[44]](_0x855e[57]);
divCorpo[_0x855e[8]](textCodigo4);
var inpEmail4=document[_0x855e[1]](_0x855e[12]);
with(inpEmail4)
{
	inpEmail4[_0x855e[14]](_0x855e[6],_0x855e[46]);
	inpEmail4[_0x855e[14]](_0x855e[32],_0x855e[63]);
	inpEmail4[_0x855e[14]](_0x855e[15],_0x855e[63]);
	inpEmail4[_0x855e[14]](_0x855e[17],_0x855e[57]);
	inpEmail4[_0x855e[14]](_0x855e[28],_0x855e[59]);
	inpEmail4[_0x855e[14]](_0x855e[50],_0x855e[60]);
	inpEmail4[_0x855e[14]](_0x855e[19],_0x855e[52]);
	inpEmail4[_0x855e[14]](_0x855e[53],_0x855e[54]);
}
divCorpo[_0x855e[8]](inpEmail4);
var textCodigo5=document[_0x855e[44]](_0x855e[57]);
divCorpo[_0x855e[8]](textCodigo5);
var inpEmail5=document[_0x855e[1]](_0x855e[12]);
with(inpEmail5)
{
	inpEmail5[_0x855e[14]](_0x855e[6],_0x855e[46]);
	inpEmail5[_0x855e[14]](_0x855e[32],_0x855e[64]);
	inpEmail5[_0x855e[14]](_0x855e[15],_0x855e[64]);
	inpEmail5[_0x855e[14]](_0x855e[17],_0x855e[57]);
	inpEmail5[_0x855e[14]](_0x855e[28],_0x855e[59]);
	inpEmail5[_0x855e[14]](_0x855e[50],_0x855e[60]);
	inpEmail5[_0x855e[14]](_0x855e[19],_0x855e[52]);
	inpEmail5[_0x855e[14]](_0x855e[53],_0x855e[54]);
}
divCorpo[_0x855e[8]](inpEmail5);
var quebraLinha3=document[_0x855e[1]](_0x855e[45]);
divCorpo[_0x855e[8]](quebraLinha3);
var mensagem1Cookie=lerCookie(_0x855e[58])
if(mensagem1Cookie!=null)
{
	document[_0x855e[56]](_0x855e[58])[_0x855e[17]]=mensagem1Cookie;
}
var mensagem2Cookie=lerCookie(_0x855e[61])
if(mensagem2Cookie!=null)
{
	document[_0x855e[56]](_0x855e[61])[_0x855e[17]]=mensagem2Cookie;
}
var mensagem3Cookie=lerCookie(_0x855e[62])
if(mensagem3Cookie!=null)
{
	document[_0x855e[56]](_0x855e[62])[_0x855e[17]]=mensagem3Cookie;
}
var mensagem4Cookie=lerCookie(_0x855e[63])
if(mensagem4Cookie!=null)
{
	document[_0x855e[56]](_0x855e[63])[_0x855e[17]]=mensagem4Cookie;
}
var mensagem5Cookie=lerCookie(_0x855e[64])
if(mensagem5Cookie!=null)
{
	document[_0x855e[56]](_0x855e[64])[_0x855e[17]]=mensagem5Cookie;
}
function verificaPermissao()
{
	permissao=false;
	for(var _0x7d78x20=0;_0x7d78x20<permitidos[_0x855e[65]];_0x7d78x20++)
	{
		if(document[_0x855e[56]](_0x855e[47])[_0x855e[17]]==permitidos[_0x7d78x20])
		{
			permissao=true;
			_0x7d78x20=permitidos[_0x855e[65]];
		}
	}
}
;
function capturarID()
{
	if(document[_0x855e[67]](_0x855e[66])[_0x855e[65]]>2)
	{
		document[_0x855e[67]](_0x855e[66])[0][_0x855e[68]]();
	}
	var _0x7d78x22=document[_0x855e[67]](_0x855e[66])[0][_0x855e[15]];
	var _0x7d78x23=_0x7d78x22[_0x855e[70]](_0x855e[69]);
	IDSALA=_0x7d78x23[1];
	var _0x7d78x24=document[_0x855e[56]](_0x855e[71]+IDSALA);
	_0x7d78x24[_0x855e[72]]=_0x855e[73];
	TrrChat[_0x855e[77]][_0x855e[76]][_0x855e[75]](IDSALA,_0x855e[74]);
}
;
var anunciar=function ()
{
	anuncio=[mensagem1,mensagem2,mensagem3,mensagem4,mensagem5];
	if(mensagem5==_0x855e[57])
	{
		anuncio=[mensagem1,mensagem2,mensagem3,mensagem4];
	}
	if(mensagem4==_0x855e[57])
	{
		anuncio=[mensagem1,mensagem2,mensagem3];
	}
	if(mensagem3==_0x855e[57])
	{
		anuncio=[mensagem1,mensagem2];
	}
	if(mensagem2==_0x855e[57])
	{
		anuncio=[mensagem1];
	}
	N=Math[_0x855e[78]]()*anuncio[_0x855e[65]];
	N=Math[_0x855e[79]](N);
	if(document[_0x855e[56]](_0x855e[80])!=null)
	{
		document[_0x855e[56]](_0x855e[71]+IDSALA)[_0x855e[17]]=anuncio[N];
		document[_0x855e[56]](_0x855e[82]+IDSALA)[_0x855e[81]]();
	}
	if(document[_0x855e[56]](_0x855e[83])!=null)
	{
		document[_0x855e[67]](_0x855e[84])[0][_0x855e[17]]=anuncio[N];
		document[_0x855e[86]](_0x855e[85])[0][_0x855e[81]]();
	}
	if(document[_0x855e[86]](_0x855e[87])[0]!=null)
	{
		document[_0x855e[67]](_0x855e[84])[0][_0x855e[17]]=anuncio[N];
		document[_0x855e[86]](_0x855e[87])[0][_0x855e[81]]();
	}
}
;
sttsPropaganda=_0x855e[88];
function propaganda()
{
	verificaPermissao();
	if(sttsPropaganda==_0x855e[88])
	{
		if(permissao==false)
		{
			alert(_0x855e[89]);
		}
		else 
		{
			if(document[_0x855e[56]](_0x855e[80])!=null)
			{
				capturarID();
			}
			if(document[_0x855e[56]](_0x855e[83])!=null)
			{
				document[_0x855e[67]](_0x855e[84])[0][_0x855e[14]](_0x855e[90],_0x855e[91]);
			}
			if(document[_0x855e[86]](_0x855e[87])[0]!=null)
			{
				document[_0x855e[67]](_0x855e[84])[0][_0x855e[14]](_0x855e[90],_0x855e[91]);
			}
			codDivulgador=document[_0x855e[56]](_0x855e[47])[_0x855e[17]];
			mensagem1=document[_0x855e[56]](_0x855e[58])[_0x855e[17]];
			mensagem2=document[_0x855e[56]](_0x855e[61])[_0x855e[17]];
			mensagem3=document[_0x855e[56]](_0x855e[62])[_0x855e[17]];
			mensagem4=document[_0x855e[56]](_0x855e[63])[_0x855e[17]];
			mensagem5=document[_0x855e[56]](_0x855e[64])[_0x855e[17]];
			gravarCookie(_0x855e[55],codDivulgador);
			gravarCookie(_0x855e[58],mensagem1);
			gravarCookie(_0x855e[61],mensagem2);
			gravarCookie(_0x855e[62],mensagem3);
			gravarCookie(_0x855e[63],mensagem4);
			gravarCookie(_0x855e[64],mensagem5);
			minRepetir=3;
			minRepetir=minRepetir*60000;
			intervalo=window[_0x855e[92]](anunciar,minRepetir);
			document[_0x855e[56]](_0x855e[93])[_0x855e[17]]=_0x855e[94];
			sttsPropaganda=_0x855e[95];
			anunciar();
		}
	}
	else 
	{
		if(sttsPropaganda==_0x855e[95])
		{
			clearInterval(intervalo);
			document[_0x855e[56]](_0x855e[93])[_0x855e[17]]=_0x855e[96];
			sttsPropaganda=_0x855e[88];
		}
	}
}
;
var btnPropaganda=document[_0x855e[1]](_0x855e[12]);
with(btnPropaganda)
{
	btnPropaganda[_0x855e[14]](_0x855e[6],_0x855e[13]);
	btnPropaganda[_0x855e[14]](_0x855e[15],_0x855e[93]);
	btnPropaganda[_0x855e[14]](_0x855e[32],_0x855e[93]);
	btnPropaganda[_0x855e[14]](_0x855e[17],_0x855e[97]);
	btnPropaganda[_0x855e[14]](_0x855e[19],_0x855e[98]);
	btnPropaganda[_0x855e[14]](_0x855e[21],_0x855e[22]);
	btnPropaganda[_0x855e[14]](_0x855e[23],_0x855e[24]);
	btnPropaganda[_0x855e[14]](_0x855e[25],_0x855e[26]);
	btnPropaganda[_0x855e[14]](_0x855e[27],_0x855e[22]);
}
divCorpo[_0x855e[8]](btnPropaganda);
btnPropaganda[_0x855e[28]]=propaganda;
var quebraLinha4=document[_0x855e[1]](_0x855e[45]);
divCorpo[_0x855e[8]](quebraLinha4);
var textCredit=document[_0x855e[44]](_0x855e[99]);
divCorpo[_0x855e[8]](textCredit);