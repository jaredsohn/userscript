// ==UserScript==
// @name           RebeldeKUT
// @namespace      RebeldeKUT
// @description    Orkut Versýo Rebelde
// @include        http://www.orkut.com/*
// @author         Victor [http://www.orkut.com/Profile.aspx?uid=5796590649311324067]
// ==/UserScript==

/*

*/

/*

#############################################################################################################################
#                                                                                                 #
#                                                                                                                           #
# RebeldeKUT 'Y Soy Rebelde'                                               #
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


/*#########################
#Graphics User Interface#
#########################

*/

gui = new Array(); 
gui[2] ='data:image/gif;base64,R0lGODlhDAAMAIAAAP%2F%2F%2F%2F%2F%2F%2FyH5BAEHAAEALAAAAAAMAAwAAAINjI%2Bpy%2B0Po5wQ2IttAQA7'; 
gui[3] = 'http://img205.imageshack.us/img205/7840/rebeldelogo4of.png';
gui[4] = 'data:image/gif;base64,R0lGODlhDAAQAIAAAP%2F%2F%2F%2F%2F%2F%2FyH5BAEHAAEALAAAAAAMABAAAAIPjI%2Bpy%2B0Po5y0ToCzxrAAADs%3D';
gui[5] = 'http://img240.imageshack.us/img240/1355/fundo2ry.gif';
gui[6] = 'http://img240.imageshack.us/img240/1355/fundo2ry.gif';
'http://two.fsphost.com/arthur100/Parada%20do%20braskut.css';
document.body.background='http://img240.imageshack.us/img240/9660/fundo6du.png';

/*

####################
#Aplicando Novo CSS#
####################

*/


	var head=document.getElementsByTagName('head').item(0);
	link=document.createElement('link');
	link.href='http://www.xthost.info/arthur100/C%F3digo%20CSS%20do%20braskut%20light%20normal.css';
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


	RebeldeKUT=RebeldeKUT.replace(/(c9d6eb)/g,"FF0033");
	RebeldeKUT=RebeldeKUT.replace(/(bfd0ea)/g,"FFFFCC");
	RebeldeKUT=RebeldeKUT.replace(/(e5ecf4)/g,"FFFF99");
	RebeldeKUT=RebeldeKUT.replace(/(e4f2f9)/g,"FFFFCC");
	RebeldeKUT=RebeldeKUT.replace(/(f0e8f5)/g,"FF0033");
	RebeldeKUT=RebeldeKUT.replace(/(d4dded)/g,"FF0033");
	RebeldeKUT=RebeldeKUT.replace(/(ebffed)/g,"FFFFCC");
	RebeldeKUT=RebeldeKUT.replace(/(fcf0d8)/g,"FF0033");
	RebeldeKUT=RebeldeKUT.replace(/(a1bbe4)/g,"FFFF99");
                
        RebeldeKUT=RebeldeKUT.replace(/&lt;br&gt;/gi,"<br>");

	RebeldeKUT=RebeldeKUT.replace(/http...images3.orkut.com.img.tr1.gif/gi,gui[0]);
	RebeldeKUT=RebeldeKUT.replace(/http...images3.orkut.com.img.tr2.gif/gi,gui[1]);
	RebeldeKUT=RebeldeKUT.replace(/http...images3.orkut.com.img.tr3.gif/gi,gui[2]);
	RebeldeKUT=RebeldeKUT.replace(/http...images3.orkut.com.img.tr4.gif/gi,gui[3]);
	RebeldeKUT=RebeldeKUT.replace(/http...images3.orkut.com.img.tr8.gif/gi,gui[4]);
	RebeldeKUT=RebeldeKUT.replace(/http...images3.orkut.com.img.tg4.gif/gi,gui[5]);
	RebeldeKUT=RebeldeKUT.replace(/http...images3.orkut.com.img.profile.tabangle.blue.gif/g,gui[6]);

	document.body.innerHTML=Braskut+'<p align="center"><a href="http://jigsaw.w3.org/css-validator/"><img style="border:0;width:88px;height:31px" src="http://jigsaw.w3.org/css-validator/images/vcss" alt="Valid CSS!"></a></p>';

	document.body.text='#000000';

/*

###############
#Fim do Script#
###############

*/
