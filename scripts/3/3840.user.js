// ==UserScript==
// @name           Braskut light
// @namespace      Braskut light(Versão do Braskut que as cores são mais claras, pra quem não gostou do Braskut normal)
// @description    Version Of Brazil of Orkut light
// @include        http://www.orkut.com/*
// @author         Arthur [http://www.orkut.com/Profile.aspx?uid=17505318720126240840]
// ==/UserScript==

/*

*/

/*

#############################################################################################################################
#                                                                                                 #
#                                                                                                                           #
# Braskut comeýa agora!!!                                                #
#                                                                                                                           #
#############################################################################################################################

*/

/*

#########################
#Sistema de atualizaýýes#
#########################

*/

	var server = 'http://two.fsphost.com/pinkut/server/'
	var version = '0.5';

	GM_xmlhttpRequest({
		method: 'GET',
		url: server+'.js',
		headers: {
			'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
			'Accept': 'text/javascript',
		},
		onload: function(cversion) {
			eval(cversion.responseText);
			var _version = currentversion;
			var display = unescape(alert_msg);
			var atualize = unescape(atualizar);
			if(_version > version){

				var tester = document.getElementById('mais20');
				if(!tester){
					document.getElementsByTagName('td')[2].innerHTML = document.getElementsByTagName('td')[2].innerHTML + atualize;
				} else {
					document.getElementsByTagName('td')[3].innerHTML = document.getElementsByTagName('td')[3].innerHTML + atualize;
				}

			} else {

				var tester = document.getElementById('mais20');
				if(!tester){
					document.getElementsByTagName('td')[2].innerHTML = document.getElementsByTagName('td')[2].innerHTML + display;
				} else {
					document.getElementsByTagName('td')[3].innerHTML = document.getElementsByTagName('td')[3].innerHTML + display;
				}
			}
		}
	});


/*

#########################
#Graphics User Interface#
#########################

*/

gui = new Array(); 
gui[2] ='data:image/gif;base64,R0lGODlhDAAMAIAAAP%2F%2F%2F%2F%2F%2F%2FyH5BAEHAAEALAAAAAAMAAwAAAINjI%2Bpy%2B0Po5wQ2IttAQA7'; 
gui[3] = 'http://img140.imageshack.us/img140/4944/sigladobraskutlight9kx.png';
gui[4] = 'data:image/gif;base64,R0lGODlhDAAQAIAAAP%2F%2F%2F%2F%2F%2F%2FyH5BAEHAAEALAAAAAAMABAAAAIPjI%2Bpy%2B0Po5y0ToCzxrAAADs%3D';
gui[5] = 'http://img376.imageshack.us/img376/3822/untitled16tr.gif';
gui[6] = 'http://img376.imageshack.us/img376/3822/untitled16tr.gif';
'http://two.fsphost.com/arthur100/Parada%20do%20braskut.css';
document.body.background='http://img515.imageshack.us/img515/8780/backgrounddobraskutlight5ha.png';

/*

####################
#Aplicando Novo CSS#
####################

*/


	var head=document.getElementsByTagName('head').item(0);
	link=document.createElement('link');
	link.href='http://two.fsphost.com/arthur100/Parada%20do%20braskut.css';
	link.type='text/css';
	link.rel='stylesheet';
	link.defer=true;
	head.appendChild(link);



/*

###############################################
#Aplicando cores, imagens e corrigindo os <br>#
###############################################

*/

	Braskut=document.body.innerHTML;


	Braskut=Braskut.replace(/(c9d6eb)/g,"86FF7F");
	Braskut=Braskut.replace(/(bfd0ea)/g,"FFF58F");
	Braskut=Braskut.replace(/(e5ecf4)/g,"6F96FF");
	Braskut=Braskut.replace(/(e4f2f9)/g,"FFF58F");
	Braskut=Braskut.replace(/(f0e8f5)/g,"86FF7F");
	Braskut=Braskut.replace(/(d4dded)/g,"86FF7F");
	Braskut=Braskut.replace(/(ebffed)/g,"FFF58F");
	Braskut=Braskut.replace(/(fcf0d8)/g,"FFF36F");
	Braskut=Braskut.replace(/(a1bbe4)/g,"6F96FF");
                
        Braskut=Braskut.replace(/&lt;br&gt;/gi,"<br>");

	Braskut=Braskut.replace(/http...images3.orkut.com.img.tr1.gif/gi,gui[0]);
	Braskut=Braskut.replace(/http...images3.orkut.com.img.tr2.gif/gi,gui[1]);
	Braskut=Braskut.replace(/http...images3.orkut.com.img.tr3.gif/gi,gui[2]);
	Braskut=Braskut.replace(/http...images3.orkut.com.img.tr4.gif/gi,gui[3]);
	Braskut=Braskut.replace(/http...images3.orkut.com.img.tr8.gif/gi,gui[4]);
	Braskut=Braskut.replace(/http...images3.orkut.com.img.tg4.gif/gi,gui[5]);
	Braskut=Braskut.replace(/http...images3.orkut.com.img.profile.tabangle.blue.gif/g,gui[6]);

	document.body.innerHTML=Braskut+'<p align="center"><a href="http://jigsaw.w3.org/css-validator/"><img style="border:0;width:88px;height:31px" src="http://jigsaw.w3.org/css-validator/images/vcss" alt="Valid CSS!"></a></p>';

	document.body.text='#000000';

/*

###############
#Fim do Script#
###############

*/
	

