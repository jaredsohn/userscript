// ==UserScript==
// @name           Better LegendasDivx
// @description    Add a smiles/tags toolbar in comments and new subtitle posts at LegendasDivx.com
// @include        http://*legendasdivx.com/modules.php?name=Downloads&d_op=viewdownloaddetails&lid=*
// @include        http://*legendasdivx.com/modules.php?name=Downloads&d_op=Comment
// @include        http://*legendasdivx.com/modules.php?name=Downloads&d_op=AddDownload*
// @copyright      Pacheco
// @version        0.9.9
// ==/UserScript==

/* Changelog:

v0.1:
  - first release
  - only smiles available

v0.2:
  - added tags (bold, italic, underline, strike, img, and ahref)

v0.3:
  - modded the submit button [NEEDED in order to work]
  - added more smiles
  - changed layout

v0.3.1:
  - corrected a wrong parameter in form submit

v0.4:
  - Now is possible to send BADs and REPORTS... :)

v0.4.1:
  - Solved a problem with Opera not having text on buttons

v0.5:
  - Added Preview button, to preview comment before posting

v0.5.1: (BETA)
  - Redirect from comment page to post page on comment submit...
  (tagged as Beta, because i had to change the scope where script acts...
	  don't know if it interfere with other pages of the same website)

v0.5.2: (BETA)
  - Corrected a problem that might avoid post new subtitles with my script activated
  (tagged as Beta, because i had to change the scope where script acts...
	  don't know if it interfere with other pages of the same website)

v0.5.3: (RC)
   - a little regression is layout, to be more usable in the post textarea too
   
v0.6:
   - removed the last regression (somehow)
   - re-added the better layout, now compatible with comment and post textareas
   - A few cleanings of the code
   - Corrected some uncompleted tags (missing or close missing)
   
v0.6.2 & v0.6.2a:
   - solved a problem (return) that prevent the script from running in Opera
   - solved the access from "http://legendas..." instead of "http://www.legendas..."
   - some other little bug fixing (v0.6.2a)
   
v0.6.6:
	- solved an error message that was wrongly shown when posting a comment
	- added support to the "post new subtitle" chosen by imdb search (instead of by LD database)
	- added center tag
	- pre-added (disabled) text color support
	
v0.8:
	- Re-written some of the code to use functions (finally get it how they can be called!)
	- added text color support
	- added a few details in tags like img or url to be more intuitive
	
v0.8.1:
	- Corrected the code to work with Opera!
	( inside quotes, the "<" char has to be alone, or it won't work! (Example: see in function section) )
	
v0.9.2: (BETA)! 
	- Added a quote option for every comment
	- Corrected the code to work with Opera! (again)
	- Corrected a few bytes of the code (put functions in functions section, etc...)
	- Quoted comment is inserted at cursor, instead of at the beginning of textbox
	
v0.9.4 ~ v0.9.9:
	- Enhancements in preview windows'...
	- Opera's corrections... :S
	- Changed the way of detecting/including "send new subtitles" page
	- Solved a little bug with "enter's" in quotes
	- Opera now can send New Subtitles
	- Opera now can "preview New Subtitles" (nasty trick)
*/

// variaveis de controlo da pagina em que se está!
if (location.href.indexOf("Comment")>55)
	var is_comment_page = true;
else if (location.href.indexOf("AddDownload")>55)
	var is_new_subtitle_page = true;
else if (location.href.indexOf("viewdownloaddetails&lid=")>55)
	var is_newcomment_page = true;

// acabar com a pagina da submissão (para evitar multiplos posts)
if (is_comment_page)
{
	window.stop();
	window.location.replace('http://www.legendasdivx.com/modules.php?name=Downloads&d_op=viewdownloaddetails&lid=' + document.body.getElementsByTagName("input")[7].value);
	alert('O seu comentário foi postado com sucesso...') // para parar a execução do script!
}

// get necessary fields (before modifying the page)
var txtarea = document.body.getElementsByTagName("textarea")[0];
var txt = txtarea.parentNode;

var inputs = document.body.getElementsByTagName("input");
var send_btn = (inputs[inputs.length-1]);

//txt.parentNode.removeChild(txt);return // testar a caixa de texto!!!
//javascript:alert(document.body.getElementsByTagName("textarea")[0].parentNode.innerHTML)

/////////////////////////////////// TABLE to replace the textarea ///////////////////////
var table = document.createElement("table");
var tr = document.createElement("tr");
tr.setAttribute('class','colour12');

/////////////////////////////////////// TD1 (TAGS) //////////////////////////////////////
var td1 = document.createElement("td");
td1.setAttribute('align','left');
td1.setAttribute('valign','top');

var center = document.createElement("center");

var oFragment = document.createDocumentFragment();

	tag_list= ['bold', 'italic', 'underline', 'strike', 'img', 'link', 'center', 'list'];
	for (i=0,ctr=0; i<tag_list.length; i+=1, ctr+=1) {
		tag = document.createElement("input");
		tag.setAttribute('value',tag_list[i]);
		tag.name = tag_list[i];
		tag.id = tag_list[i];
		tag.type="button"
		tag.setAttribute('onclick','addTAG(this.value)');
		oFragment.appendChild(tag);
	}

var cores = document.createElement("select");
cores.id = 'cores'
cores.name = 'cores'
cores.setAttribute('onChange',"addCOLOR(cores.value)")

	cor=document.createElement("option");
	cor.setAttribute('value','none');
	cor.appendChild(document.createTextNode("cores:"));
	cores.appendChild(cor)

	var custom_colors = ['black', 'gray', 'silver', 'white', 'navy', 'blue', 'teal', 'aqua', 'olive', 'green', 'lime', 'purple', 'magenta', 'red', 'maroon', 'yellow'];
	for (i=0; i<custom_colors.length; i+=1) {
		cor=document.createElement("option");
		cor.setAttribute('value',custom_colors[i]);
		cor.appendChild(document.createTextNode(custom_colors[i]));
		cores.appendChild(cor)
	}

	cor=document.createElement("option");
	cor.setAttribute('value','other');
	cor.appendChild(document.createTextNode("escolher..."));
	cores.appendChild(cor)

oFragment.appendChild(cores);

center.appendChild(oFragment);

////////////////////////// (td2) SMILES /////////////////////////

var td2 = document.createElement("td");

var oFragment2 = document.createDocumentFragment();

	smiles_list= ['biggrin2', 'smile_normal', 'wink4', 'triste', 'wacko', 'tongue', 'laugh2', '14', 'eek', 'blink', 'dirol', 'upshy', 'doh', 'mad2', 'nono', 'pcorn', 'yahoo'];
	for (i=0,ctr=0; i<smiles_list.length; i+=1, ctr+=1) {
		smile=document.createElement("img");
		smile.src = "modules/Forums/images/smiles/" + smiles_list[i] + ".gif"
		smile.id = smiles_list[i];
		smile.setAttribute('onclick','addSMILE(this)');
		oFragment2.appendChild(smile);
		if (ctr==2) {
			oFragment2.appendChild(document.createElement("br"));
			ctr=0;
		}
	}

/////////////////////////// (finally) MODIFY THE LAYOUT ///////////////////////////
//<textarea style="font-size: 9px; font-family: Verdana;" name="description" cols="99" rows="3" maxsize="25">
var mytxtarea = document.createElement("textarea");
mytxtarea.setAttribute('style','font-size: 9px; font-family: Verdana;')
mytxtarea.setAttribute('name',txtarea.name)
mytxtarea.setAttribute('id','caixa_texto')
mytxtarea.setAttribute('rows','14')

td1.appendChild(center);
td1.appendChild(mytxtarea);
td2.appendChild(oFragment2);
tr.appendChild(td1);
tr.appendChild(td2);
table.appendChild(tr);

if (is_new_subtitle_page) {
	//alert('POST')
	mytxtarea.setAttribute('cols','113')
	var tipo=1;
} else if (is_newcomment_page) {
	//alert('COMMENT')
	mytxtarea.setAttribute('cols','125')
	var tipo=2;
} else if (is_comment_page) {
	// DO NOTHING!!!
} else {
	alert('Problema com o script!')
	throw new Error('Script running in a wrong site... Debug it or report the problem please!')
}

txt.replaceChild(table,txtarea)

var form = document.body.getElementsByTagName("form");
form=form[form.length-1]; // o ultimo form da página!!

var tabela=form.parentNode
var tabela2=form.parentNode.parentNode

// duplicar o form antes de o apagar (apaga-se o form danificado)
var myform=document.createElement("form");
//myform.setAttribute('enctype',"multipart/form-data");
myform.setAttribute('enctype',form.enctype);
//myform.setAttribute('method',"post");
myform.setAttribute('method',form.method);
//myform.setAttribute('action',"modules.php?name=Downloads&d_op=AddDownload4");
myform.setAttribute('action',form.action);

// Para compatibilidade com o Opera:
opera_tmp = form.getElementsByTagName("input");
	//alert(opera_tmp.length); // no Opera dá 2!
for (i=opera_tmp.length-1; i>=0; i--)
{
		//alert(i + "\n\n" + opera_tmp[i].name);
	myform.appendChild(opera_tmp[i]);
}
/////////////////////////////////////

// remover o form antigo (o que fica danificado pela modificação)
tabela.removeChild(form);

if (is_new_subtitle_page) {
	old_form_content = document.body.getElementsByTagName("table");
	old_form_content = old_form_content[old_form_content.length-3];
	tmp=old_form_content.parentNode.lastChild.previousSibling.previousSibling
	myform.appendChild(old_form_content)
	tmp.parentNode.insertBefore(myform, tmp)
} else if (is_newcomment_page) {
	old_form_content = tabela.getElementsByTagName("input")[0].parentNode;
	tmp=old_form_content.parentNode
	myform.appendChild(old_form_content)
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		td.appendChild(myform)
		tr.appendChild(td)

	tmp.appendChild(tr)
}

//////////////////////////////////// PREVIEW BUTTON ////////////////////////////
var preview = document.createElement("input");
preview.setAttribute('name','preview');
preview.setAttribute('value','Pré-Visualizar');
preview.setAttribute('id','preview');
preview.setAttribute('type','button');
preview.setAttribute('onclick','btn_preview('+tipo+')');
send_btn.parentNode.insertBefore(preview,send_btn)
espaco=document.createTextNode("\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0");
send_btn.parentNode.insertBefore(espaco,send_btn)

/*var form = document.body.getElementsByTagName("form");
form=form[form.length-1]; // o ultimo form da página!!
alert(form.parentNode.parentNode.parentNode.parentNode.innerHTML)*/

//////////////////////////////////////////////////////////////////////
////////////////////////////// FUNCTIONS /////////////////////////////
//////////////////////////////////////////////////////////////////////

//////// ADD TAGS
var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML = '\
function addTAG(tag) {\
	tag=tag.replace("bold","b");\
	tag=tag.replace("italic","i");\
	tag=tag.replace("underline","u");\
	tag=tag.replace("strike","s");\
	tag=tag.replace("list","li");\
	txtarea=document.getElementById("caixa_texto");\
	txtarea.focus();\
	selLength = txtarea.textLength;\
	selStart = txtarea.selectionStart;\
	selEnd = txtarea.selectionEnd;\
	s1 = (txtarea.value).substring(0,selStart);\
	s2 = (txtarea.value).substring(selStart, selEnd);\
	s3 = (txtarea.value).substring(selEnd, selLength);\
	if (tag == "img") {\
		if( s2.length > 0) {\
			txtarea.value = s1 + "<" + \'img src="\' + s2 + \'">\' + s3;\
		} else {\
			url=prompt("insira o url da imagem:","http\://");\
			if (url == null) url="";\
			txtarea.value = s1 + "<" + \'img src="\' + url + \'">\' + s3;\
		}\
	} else if (tag == "link") {\
		url=prompt("insira o url:","http\://");\
		if (url == null) url="";\
		if( s2.length > 0) {\
			txtarea.value = s1 + "<" + \'a href="\' + url + \'">\' + s2 + "<" + "/a>" + s3;\
		} else {\
			texto=prompt("texto a ficar com o link:","");\
			if (texto == null) texto="";\
			txtarea.value = s1 + "<" + \'a href="\' + url + \'">\' + texto + "<" + "/a>" + s3;\
		}\
	} else {\
		txtarea.value = s1 + "<" + tag + ">" + s2 + "<\\/" + tag + ">" + s3;\
	}\
}\
';
document.getElementsByTagName("head")[0].appendChild(scriptElement);

//////// ADD SMILES
var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML =  '\
function addSMILE(smile) {\
	txtarea=document.getElementById("caixa_texto");\
	if (txtarea.selectionStart || txtarea.selectionStart == \'0\') {\
		startPos = txtarea.selectionStart;\
		endPos = txtarea.selectionEnd;\
		txtarea.value = txtarea.value.substring(0, startPos) + "<" + \'img src="\' + smile.src + \'">\' + txtarea.value.substring(endPos, txtarea.value.length);\
	} else {\
		txtarea.value += "<" + \'img src="\' + smile.src + \'">\';\
	}\
}\
';
document.getElementsByTagName("head")[0].appendChild(scriptElement);

//////// ADD COLOR for text
var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML =  '\
function addCOLOR(cor) {\
	dropmenu=document.getElementById("cores");\
	dropmenu[0].selected = "1";\
	if (cor == "none") {\
		return false;\
	} else if (cor == "other") {\
		cor=prompt("Codigo hex(6) da cor: (RGB)", "000000");\
		if (cor == null) return false;\
		cor = "#" + cor;\
	}\
	txtarea=document.getElementById("caixa_texto");\
	txtarea.focus();\
	selLength = txtarea.textLength;\
	selStart = txtarea.selectionStart;\
	selEnd = txtarea.selectionEnd;\
	s1 = (txtarea.value).substring(0,selStart);\
	s2 = (txtarea.value).substring(selStart, selEnd);\
	s3 = (txtarea.value).substring(selEnd, selLength);\
	if( s2.length > 0) {\
		txtarea.value = s1 + "<" + \'font color="\' + cor + \'">\' + s2 + "<" + "/font>" + s3;\
	} else {\
		texto=prompt("texto a ficar com a cor " + cor,"");\
		if (texto == null) texto="";\
		txtarea.value = s1 + "<" + \'font color="\' + cor + \'">\' + texto + "<" + "/font>" + s3;\
	}\
}\
';
document.getElementsByTagName("head")[0].appendChild(scriptElement);

//////// PREVIEW text
var scriptElement = document.createElement('script');
scriptElement.type = 'text/javascript';
scriptElement.innerHTML =  '\
function btn_preview(tipo) {\
	html=document.getElementById("caixa_texto").value;\
	html=html.replace(\/\\n\/g, "<" + \'br>\');\
	myWindow=window.open(\'\',\'\',\'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,innerWidth=790,innerHeight=600\');\
	if (tipo == 1) {\
		if (navigator.appName == "Opera") {\
			var oNewWin = window.open("about:blank", "newwindow", "innerHeight=600,innerWidth=790,resizable=no");\
			oNewWin.document.open();\
			oNewWin.document.write("<" + "html>" + "<" + \'link rel="StyleSheet" href="http://www.legendasdivx.com/themes/subSilver/style/style.css" type="text/css">\' + "<" + \'link rel="StyleSheet" href="http://www.legendasdivx.com/modules/Downloads/css/style.css" type="text/css">\' + "<" + "body>" + "<" + "center>" + "<" + \'div class="sub_box">\' + "<" + \'div class="sub_header">\' + "<" + "b>PREVIEW" + "<" + "/b> (9999) &nbsp; - &nbsp; Enviada por: " + "<" + \'a href="">\' + "<" + "b>PREVIEW" + "<" + "/b>" + "<" + "/a> &nbsp; em 9999-99-99 99:99:99" + "<" + "/div>" + "<" + \'table class="sub_main color1" cellspacing="0">\' + "<" + "tr>" + "<" + \'th class="color2">Idioma:\' + "<" + "/th>" + "<" + "td>" + "<" + \'img width="18" height="12" src="http://www.legendasdivx.com/modules/Downloads/img/portugal.gif">\' + "<" + "/td>" + "<" + "th>CDs:" + "<" + "/th>" + "<" + "td>&nbsp;" + "<" + "/td>" + "<" + "th>FrameRate:" + "<" + "/th>" + "<" + "td>&nbsp;" + "<" + "/td>" + "<" + \'td rowspan="2" class="td_right color2">\' + "<" + \'a href="">Classifique esta Legenda\' + "<" + "/a>" + "<" + "/td>" + "<" + "/tr>" + "<" + "tr>" + "<" + \'th class="color2">Hits:\' + "<" + "/th>" + "<" + "td>0" + "<" + "/td>" + "<" + "th>Pedidos:" + "<" + "/th>" + "<" + "td>0&nbsp;" + "<" + "/td>" + "<" + "th>Origem:" + "<" + "/th>" + "<" + "td>Tradução&nbsp;" + "<" + "/td>" + "<" + "/tr>" + "<" + "tr>" + "<" + \'th class="color2">Descrição:\' + "<" + "/th>" + "<" + \'td colspan="5" class="td_desc brd_up">\' + html + "<" + "/td>" + "<" + \'td class="td_right brd_up color2">Mais Legendas \' + "<" + "br>" + "<" + \'a class="pt" href="">0\' + "<" + "/a>" + "<" + "/td>" + "<" + "/tr>" + "<" + "/table>" + "<" + \'div class="sub_footer">\' + "<" + \'a class="sub_download" href="">Download (0.0 Kb)\' + "<" + "/a>" + "<" + \'a class="sub_details" href="">Detalhes/Coment&#225;rios (0)\' + "<" + "/a>" + "<" + \'a class="sub_request" href="">Pedir Legenda\' + "<" + "/a>" + "<" + "/div>" + "<" + "/div>" + "<" + "/center>" + "<" + "/body>" + "<"+ "/html>");\
			oNewWin.document.close();\
			myWindow.close();\
		} else \
			myWindow.document.write("<" + "html>" + "<" + \'link rel="StyleSheet" href="http://www.legendasdivx.com/themes/subSilver/style/style.css" type="text/css">\' + "<" + \'link rel="StyleSheet" href="http://www.legendasdivx.com/modules/Downloads/css/style.css" type="text/css">\' + "<" + "body>" + "<" + "center>" + "<" + \'div class="sub_box">\' + "<" + \'div class="sub_header">\' + "<" + "b>PREVIEW" + "<" + "/b> (9999) &nbsp; - &nbsp; Enviada por: " + "<" + \'a href="">\' + "<" + "b>PREVIEW" + "<" + "/b>" + "<" + "/a> &nbsp; em 9999-99-99 99:99:99" + "<" + "/div>" + "<" + \'table class="sub_main color1" cellspacing="0">\' + "<" + "tr>" + "<" + \'th class="color2">Idioma:\' + "<" + "/th>" + "<" + "td>" + "<" + \'img width="18" height="12" src="http://www.legendasdivx.com/modules/Downloads/img/portugal.gif">\' + "<" + "/td>" + "<" + "th>CDs:" + "<" + "/th>" + "<" + "td>&nbsp;" + "<" + "/td>" + "<" + "th>FrameRate:" + "<" + "/th>" + "<" + "td>&nbsp;" + "<" + "/td>" + "<" + \'td rowspan="2" class="td_right color2">\' + "<" + \'a href="">Classifique esta Legenda\' + "<" + "/a>" + "<" + "/td>" + "<" + "/tr>" + "<" + "tr>" + "<" + \'th class="color2">Hits:\' + "<" + "/th>" + "<" + "td>0" + "<" + "/td>" + "<" + "th>Pedidos:" + "<" + "/th>" + "<" + "td>0&nbsp;" + "<" + "/td>" + "<" + "th>Origem:" + "<" + "/th>" + "<" + "td>Tradução&nbsp;" + "<" + "/td>" + "<" + "/tr>" + "<" + "tr>" + "<" + \'th class="color2">Descrição:\' + "<" + "/th>" + "<" + \'td colspan="5" class="td_desc brd_up">\' + html + "<" + "/td>" + "<" + \'td class="td_right brd_up color2">Mais Legendas \' + "<" + "br>" + "<" + \'a class="pt" href="">0\' + "<" + "/a>" + "<" + "/td>" + "<" + "/tr>" + "<" + "/table>" + "<" + \'div class="sub_footer">\' + "<" + \'a class="sub_download" href="">Download (0.0 Kb)\' + "<" + "/a>" + "<" + \'a class="sub_details" href="">Detalhes/Coment&#225;rios (0)\' + "<" + "/a>" + "<" + \'a class="sub_request" href="">Pedir Legenda\' + "<" + "/a>" + "<" + "/div>" + "<" + "/div>" + "<" + "/center>" + "<" + "/body>" + "<"+ "/html>");\
	} else\
		myWindow.document.write("<" + "html>" + "<" + \'link rel="StyleSheet" href="http://www.legendasdivx.com/themes/subSilver/style/style.css" type="text/css">\' + "<" + "body>" + "<" + "center>" + "<" + \'table class="forumborder2" align="center" border="0" cellpadding="0" cellspacing="0" width="780">\' + "<" + "tbody>" + "<" + "tr>" + "<" + \'td class="titleoverallheader2" colspan="1" style="border-top: 0px none; border-right: 0px none; border-left: 0px none;" align="center" background="http://www.legendasdivx.com/modules/Forums/templates/chunkstyle/imagesnew/forumtop.jpg">\' + "<" + "b>Preview do Comentário" + "<" + "/b>" + "<" + "/td>" + "<" + "/tr>" + "<" + "tr>" + "<" + \'td colspan="2" bgcolor="#c7c7c7" width="100%">\' + "<" + \'table bgcolor="#c7c7c7" border="0" cellpadding="0" cellspacing="0" width="100%">\' + "<" + "tbody>" + "<" + "tr>" + "<" + \'td align="left" bgcolor="#c7c7c7" width="50%">\' + "<" + \'font color="#000000">\' + "<" + "b>" + "<" + \'a href="http://">\' + "<" + "b>PREVIEW" + "<" + "/b>" + "<" + "/a>: " + "<" + "/b>" + "<" + "/font>" + "<" + "/td>" + "<" + \'td align="right" bgcolor="#c7c7c7" width="50%">\' + "<" + \'font color="#000000">30 de Fevereiro, 9999 (23:59:59)\' + "<" + "/font>" + "<" + "/td>" + "<" + "/tr>" + "<" + "/tbody>" + "<" + "/table>" + "<" + "/td>" + "<" + "/tr>" + "<" + "tr>" + "<" + \'td class="colour12" colspan="2" align="left">\' + html + "<" + "/td>" + "<" + "/tr>" + "<" + "/tbody>" + "<" + "/table>" + "<" + "/center>" + "<" + "/body>" + "<" + "/html>");\
	myWindow.focus();\
}\
';
document.getElementsByTagName("head")[0].appendChild(scriptElement);


///////////////////////// Adicionar o botão de Quote aos comentários ja existentes!
if (is_newcomment_page) {
	//alert(tabela.innerHTML)
	var scriptElement = document.createElement('script');
	scriptElement.type = 'text/javascript';
	scriptElement.innerHTML = '\
		form = document.body.getElementsByTagName("form");\
		form=form[form.length-1];\
		tabela=form.parentNode.parentNode.parentNode.parentNode;\
		num_coments = tabela.getElementsByTagName("tbody").length;\
		for (i=1;i<=3*num_coments;i+=3) {\
			name_line=tabela.getElementsByTagName("tr")[i];\
			name=name_line.firstChild.getElementsByTagName("a")[0].innerHTML;\
			time=name_line.firstChild.getElementsByTagName("font")[1];\
			coment_line=tabela.getElementsByTagName("tr")[i+2];\
			coment=coment_line.firstChild.innerHTML;\
			newtd = document.createElement("td");\
			btn = document.createElement("input");\
			btn.setAttribute("name",i);\
			btn.setAttribute("value","quote");\
			btn.type="button";\
				btn.setAttribute("onclick", "quote(this.name)" );\
			newtd.appendChild(btn);\
			time.parentNode.parentNode.appendChild(newtd);\
		}\
	';
	document.getElementsByTagName("head")[0].appendChild(scriptElement);


	var scriptElement = document.createElement('script');
	scriptElement.type = 'text/javascript';
	scriptElement.innerHTML = '\
	function quote(i) {\
		ii=eval(i + "+2");\
		txtarea = document.body.getElementsByTagName("textarea")[0];\
		form = document.body.getElementsByTagName("form");\
		form=form[form.length-1];\
		tabela=form.parentNode.parentNode.parentNode.parentNode;\
			name_line=tabela.getElementsByTagName("tr")[i];\
			name=name_line.firstChild.getElementsByTagName("a")[0].innerHTML;\
			time=name_line.firstChild.getElementsByTagName("font")[1].innerHTML;\
			coment_line=tabela.getElementsByTagName("tr")[ii];\
			coment=coment_line.firstChild.innerHTML;\
			coment=coment.replace(\/\\n\/g, "");\
				txtarea.focus();\
				if (txtarea.selectionStart || txtarea.selectionStart == \'0\') {\
					startPos = txtarea.selectionStart;\
					endPos = txtarea.selectionEnd;\
					txtarea.value = txtarea.value.substring(0, startPos) + "<" + "fieldset>" + "<" + "legend>" + name + " @ " + time + "<" + "/legend>" + coment + "<" + "/fieldset>\\n" + txtarea.value.substring(endPos, txtarea.value.length);\
				} else {\
					txtarea.value += "<" + "fieldset>" + "<" + "legend>" + name + " @ " + time + "<" + "/legend>" + coment + "<" + "/fieldset>\\n";\
				}\
	}\
	';
	document.getElementsByTagName("head")[0].appendChild(scriptElement);
}

///////////////////// PODE SER PRECISO (apagar)
/*
function displaymessage(lol) {
alert("Hello World!"+lol);
}

var teste = document.createElement("input");
teste.setAttribute('value','teste');
teste.type="button"
teste.setAttribute('onclick',"checkForOrders(3)");
teste.addEventListener('click',displaymessage(5),true);

document.body.appendChild(teste)*/