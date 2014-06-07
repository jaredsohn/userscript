// ==UserScript==
// @name           Urban-Rivals Custom Background
// @namespace      http://nunoxavier.site88.net/
// @description    Change background from Urban-Rivals
// @author         Nuno Xavier
// @version        1.0
// @include        http://www.urban-rivals.com/*
// ==/UserScript==

	var d = new Date()
	var horas = d.getHours()
	var url
	if(horas==0){
		url="http://www.raulx64.com/wp-content/uploads/2008/04/i_am_blue_1280x1024_wallpaper.jpg"
	}
	if(horas==1){
		url="http://fc05.deviantart.com/fs20/f/2007/270/3/4/Balance_Wallpaper_by_nxxos.jpg"
	}
	if(horas==2){
		url="http://infoproject.files.wordpress.com/2008/02/vista_wallpaper_by_gr3en_v2_by_gr3en_chronic.jpg"
	}
	if(horas==3){
		url="http://vistadesk.files.wordpress.com/2007/05/light-and-line_4_blue_1280-x-1024.jpg"
	}
	if(horas==4){
		url="http://i218.photobucket.com/albums/cc46/cadastrodejogos1986/Dragon_head_Wallpaper1_1280x1024.jpg"
	}
	if(horas==5){
		url="http://fc05.deviantart.com/fs22/f/2008/017/e/d/Wallpaper_de_Montanhas_by_Lucas3991.jpg"
	}
	if(horas==6){
		url="http://fc05.deviantart.com/fs22/f/2008/014/f/f/Austria_Wallpaper_by_slamdunker.jpg"
	}
	if(horas==7){
		url="http://blogwindows.files.wordpress.com/2007/12/time_machine_leopard_wallpaper_by_stweston.jpg"
	}
	if(horas==8){
		url="http://www.desktoprating.com/wallpapers/games-wallpapers-pictures/sub-zero-mortal-combat-wallpaper.jpg"
	}
	if(horas==9){
		url="http://d.emule.com/evening-at-the-river-wallpaper/evening-at-the-river-wallpaper-.jpg"
	}
	if(horas==10){
		url="http://vistaandxp.files.wordpress.com/2008/03/bye_bye_mr__moon_7___wallpaper_by_tinypilot.jpg"
	}
	if(horas==11){
		url="http://i308.photobucket.com/albums/kk339/WindowsNET/the-beach-wallpaper.jpg"
	}
	if(horas==12){
		url="http://fc15.deviantart.com/fs20/f/2007/303/b/2/Windows_vista__dark_wallpaper_by_tonev.png"
	}
	if(horas==13){
		url="http://deskwinajuda.com/wp-content/uploads/2008/07/wallpaper-leve-e-bonito.jpg"
	}
	if(horas==14){
		url="http://i51.photobucket.com/albums/f354/Felipieh/SpaceWallpaper.jpg"
	}
	if(horas==15){
		url="http://img222.imageshack.us/img222/5803/vista534forestxp9.jpg"
	}
	if(horas==16){
		url="http://h2odeskmod.files.wordpress.com/2007/08/vista-starter-edition-beta-2.jpg"
	}
	if(horas==17){
		url="http://www.thoosje.com/vista-wallpapers/windowsvista/vista_wallpapers(12).jpg"
	}
	if(horas==18){
		url="http://i160.photobucket.com/albums/t171/alanocu/Vistapaper/vista-wallpaper-aero-woods-1024x768.jpg"
	}
	if(horas==19){
		url="http://elt0n.files.wordpress.com/2006/11/vista-wallpaper-8-b.jpg"
	}
	if(horas==20){
		url="http://fc05.deviantart.com/fs22/f/2008/017/e/d/Wallpaper_de_Montanhas_by_Lucas3991.jpg"
	}
	if(horas==21){
		url="http://www.wstaylor.net/walls/vista/Vista%20Starter%20Edition%20Beta%202%20-%20img735.jpg"
	}
	if(horas==22){
		url="http://img96.imageshack.us/img96/9570/explodingwithwater1600ed7.jpg"
	}
	if(horas==23){
		url="http://www.vistaok.com/upimg/userup/0802/0102103H3B.jpg"
	}
	document.body.style.backgroundImage = 'url(' + url +')';