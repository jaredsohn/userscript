// ==UserScript==
// @name           Add Related by CMM ID
// @author         Rodrigo Lacerda (Portuguese Version) | Bean (English Version) 
// @credits        Jerry
// @description    Add Related Community Just by Entering the Community ID
// @include        http://*.orkut.com/CommunitySearch.aspx*
// ==/UserScript==

var sc = function sc(){//////////////* AQUI É O COMEÇO *//////////////

var ar_cmm = document.getElementById('cmm').value;
var ar_ptoken = document.forms['search'].elements[0].value;
var ar_sig = document.forms['search'].elements[1].value;
var ar_tbl = document.getElementsByTagName('table');
var ar_df = document.forms;
var ar_br = "Adicionar pelo CMM";
var ar_us = "Enter ID here";
for(var x=0; x<ar_tbl.length; x++)
{
	if(ar_tbl[x].innerHTML.indexOf('<table') > -1) continue;
	if(ar_tbl[x].innerHTML.match(/(Pesquisar uma comunidade)/)){var lingua=ar_br}else if(ar_tbl[x].innerHTML.match(/(Search for a community)/)){var lingua=ar_us}
	if(lingua)
	{
		ar_tbl[x].innerHTML +='\n'
+'\n	<tr>\n'
+'		<td>\n'
+'			<form name="addRelated" method="post">\n'
+'				<font color="black">\n'
+'					<b>\n'
+'						' + lingua + ':\n'
+'					</b>\n'
+'				</font>\n'
+'				<input type="hidden" name="POST_TOKEN" value="' + ar_ptoken + '" />\n'
+'				<input type="hidden" name="signature" value="'+ ar_sig + '" />\n'
+'				<input id="commId" type="hidden" name="commId" value="' + ar_cmm + '">\n'
+'				<input id="relatedId" type="text" name="relatedId" value="">\n'
+'				<input type="image" name="Action.addRelated" alt="Add Community" title="Add Community" border="0"  src="http://i197.photobucket.com/albums/aa244/beanisback/add1copy.gif" onmouseover="this.src=\'http://i197.photobucket.com/albums/aa244/beanisback/add2.gif\';" onmouseout="this.src=\'http://i197.photobucket.com/albums/aa244/beanisback/add1copy.gif\';" onload="var obtn_add=new Image(); obtn_add.src=\'http://i197.photobucket.com/albums/aa244/beanisback/add2.gif\';">\n'
+'			</form>\n'
+'		</td>\n'
+'	</tr>\n';
		break;
	};
};

for(var x=2; x<ar_df.length; x++)
{
	ar_df[x].action="";
};

}//////////////* AQUI É O FIM */////////////


//--------------------------------------------
// Insere Script na Página
//--------------------------------------------
sc=String(sc);
sc=sc.substring(16,sc.length-2);
script=document.createElement('script');
script.innerHTML=sc;
document.getElementsByTagName('head')[0].appendChild(script);