// ==UserScript==

// @name           EspalWii

// @namespace      http://www.espalwii.com

// @include        *espalwii.com*
// ==/UserScript==

var lueshi = document.createElement("link");
lueshi.type = "image/x-icon";
lueshi.rel = "icon";
lueshi.href ="http://www.espalwii.com/favicon.ico";
document.getElementsByTagName("head")[0].appendChild(lueshi);

var alt = new String(document.location);
if (alt.indexOf("translate")!="-1") {

document.title = "ENGPALWII (a translation of espalwii.com)"
document.body.innerHTML= document.body.innerHTML.replace("Images/menu_home.gif","http://img220.imageshack.us/img220/1508/homezla.gif");
document.body.innerHTML= document.body.innerHTML.replace("Images/menu_noticias.gif","http://img403.imageshack.us/img403/3842/notices.gif");
document.body.innerHTML= document.body.innerHTML.replace("Images/cabecera.jpg","http://img193.imageshack.us/img193/1935/titleloc.jpg");
document.body.innerHTML= document.body.innerHTML.replace("Images/menu_micuenta.gif","http://img208.imageshack.us/img208/7250/accountx.gif");
document.body.innerHTML= document.body.innerHTML.replace("Images/menu_foros.gif","http://img139.imageshack.us/img139/2434/forums.gif");
document.body.innerHTML= document.body.innerHTML.replace("Images/menu_descargas.gif","http://img406.imageshack.us/img406/3559/downloads.gif");
document.body.innerHTML= document.body.innerHTML.replace("Images/arriba_menu2.jpg","http://img505.imageshack.us/img505/5791/newsd.jpg");
document.body.innerHTML= document.body.innerHTML.replace("Images/arriba_menu4.jpg","http://img505.imageshack.us/img505/62/youraccount.jpg");
document.body.innerHTML= document.body.innerHTML.replace("Images/arriba_menu5.jpg","http://img505.imageshack.us/img505/1557/statsz.jpg");
document.body.innerHTML= document.body.innerHTML.replace("Images/titulo_port.jpg","http://img268.imageshack.us/img268/253/sponsors.jpg");
document.body.innerHTML= document.body.innerHTML.replace("images/eyeeasy/misc/header.png","http://img174.imageshack.us/img174/176/engpalwii.gif");
document.body.innerHTML= document.body.innerHTML.replace("Images/menu_home_azul.gif","http://img193.imageshack.us/img193/7803/home2.gif");
document.body.innerHTML= document.body.innerHTML.replace("Images/menu_noticias_azul.gif","http://img104.imageshack.us/img104/102/notices2.gif");
document.body.innerHTML= document.body.innerHTML.replace("Images/menu_micuenta_azul.gif","http://img182.imageshack.us/img182/7187/account2.gif");
document.body.innerHTML= document.body.innerHTML.replace("Images/menu_foros_azul.gif","http://img148.imageshack.us/img148/2294/forum2n.gif");
document.body.innerHTML= document.body.innerHTML.replace("Images/menu_descargas_azul.gif","http://img204.imageshack.us/img204/3190/downloads2w.gif");
}
	
		if (location.pathname == '/translate_c') return;
		
		var elmTranslateDiv = document.createElement('div');
		elmTranslateDiv.style.textAlign = 'right';
		elmTranslateDiv.innerHTML =
			 '<form id="translatepage" method="GET" ' +
			 'action="http://translate.google.com/translate" ' +
			 'style="font-size: small; font-family: sans-serif;">' +

                         '<input type="hidden" name="langpair" value="es|en">' +
			 '<input type="hidden" name="u" value="' + location + '">' +
			 '<input type="hidden" name="hl" value="en">' +
			 '<input type="hidden" name="c2coff" value="1">' +
			 '<input type="hidden" name="ie" value="UTF-8">' +
			 '<input type="hidden" name="oe" value="UTF-8">' +
			 '<input src="http://img529.imageshack.us/img529/2193/flag.gif" type="image" alt="Translate">' +
			 '</form>';
		document.body.insertBefore(elmTranslateDiv, document.body.firstChild); 
		var elmTranslateForm = document.getElementById('translatepage');
		if (!elmTranslateForm) return;
		elmTranslateForm.addEventListener('submit', function(event) {
			 var elmSelect = document.getElementById('langpair');
			 if (!elmSelect) return true;
			 var ssValue = elmSelect.value;
	 var langSource = ssValue.substring(0, ssValue.indexOf('|'));
			 var langTarget = ssValue.substring(ssValue.indexOf('|') + 1);
			 GM_setValue('lang.source', langSource);
			 GM_setValue('lang.target', langTarget);
			 return true;
		}, true);


document.getElementsByTagName("frameset")[0].rows="0,*";
document.getElementsByTagName("frameset")[0].frameborder="0";

