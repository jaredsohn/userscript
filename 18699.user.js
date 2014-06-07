// ==UserScript==
// @name ogame - Menu Ressource
// @author Call Of Duty & Poulet Nucléaire
// @description modifie le menu resource
// @include http://*/game/*
// @exclude http://*/game/*imperium&session*
// @exclude http://*/game/*galaxy*

(function(){

	/*
      ::::::::::::::::::::::::::::::::::::::::::::::::
      :::   					   :::
      :::             Menu Ressources              :::
      :::					   :::
      ::::::::::::::::::::::::::::::::::::::::::::::::
*/

GM_addStyle('center table tr td center table tr td img { border : 0px #FFFFFF ridge; height : 0px; width : 0px;}');

GM_addStyle('div#header_top table.header { width : 180px;}');

GM_addStyle('body div#header_top { display : block; padding : 0px; text-align : right; vertical-align : top; position : fixed; right : 0px; top : 0px; left : auto; background-image : url("http://skin_graph.strategie-expert.com/d_build/img/bg_interface.gif"); background-color : transparent; height : 225px; width : 180px; border : 0px;}');

/*Plan�te Small*/
GM_addStyle('div#header_top img[width="50"][height="50"] { position : fixed; right : 2px; top : 5px; border : 0px; height : 90px; width : 90px;}');

/*Images ressources*/
GM_addStyle('div#header_top img[width="42"][height="22"] { line-height : 0px; height : 0px; width : 0px; border : 0px;}');


/*Metal, Cristal, Deut, AntiM, Energie*/
GM_addStyle('table tr table tr td i b font, table tr table tr td i b { letter-spacing : 0px; font-family : Tahoma; font-style : normal; font-weight : normal; font-size : 10px; line-height : 13px; color : #969696;}');

/*D�calage titre Ressources*/
GM_addStyle('div#header_top table.header[id="resources"] tr.header + tr.header td.header { font-size : 9px; text-align : left; width : 145px; position : fixed; right : 1px; top : 145px;}');
GM_addStyle('div#header_top table.header[id="resources"] tr.header + tr.header td.header + td.header {top: 160px;}');
GM_addStyle('div#header_top table.header[id="resources"] tr.header + tr.header td.header + td.header + td.header {top: 175px;}');
GM_addStyle('div#header_top table.header[id="resources"] tr.header + tr.header td.header + td.header + td.header + td.header {top: 190px;}');
GM_addStyle('div#header_top table.header[id="resources"] tr.header + tr.header td.header + td.header + td.header + td.header + td.header {top: 205px;}');

/*Decalage Ressources*/
GM_addStyle('div#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header { text-align : right; width : 90px; position : fixed; right : 25px; top : 145px;}');
GM_addStyle('div#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header + td.header {top: 160px;}');
GM_addStyle('div#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header + td.header + td.header {top: 175px;}');
GM_addStyle('div#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header + td.header + td.header + td.header {top: 190px;}');
GM_addStyle('div#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header + td.header + td.header + td.header + td.header {top: 205px;}');

/*Images Officiers*/
GM_addStyle('div#header_top table.header tr.header td.header[align="center"][width="35"] a img { height : 15px; width : 15px;}');

GM_addStyle('div#header_top table.header tr.header td.header[align="center"][width="35"] a { display : block; text-align : right; width : 15px; height : 15px; position : fixed; right : 76px; top : 127px;}');
GM_addStyle('div#header_top table.header tr.header td.header + td.header[align="center"][width="35"] a {right: 58px;}');
GM_addStyle('div#header_top table.header tr.header td.header + td.header + td.header[align="center"][width="35"] a {right: 40px;}');
GM_addStyle('div#header_top table.header tr.header td.header + td.header + td.header + td.header[align="center"][width="35"] a {right: 22px;}');
GM_addStyle('div#header_top table.header tr.header td.header + td.header + td.header + td.header + td.header[align="center"][width="35"] a {right: 4px;}');

/*Menu deroulant*/
GM_addStyle('div#header_top table.header tr.header td.header table.header tr.header td.header select { position : fixed; right : 2px; top : 97px; font-size : 10px; font-weight : normal; font-family : Tahoma; color : #969696; background-color : #000000; border : 1px #969696 ridge;}');

/*Couleur des noms*/
GM_addStyle('#header_top table.header[id="resources"] tr.header + tr.header td.header font[color="#ffffff"]{color:969696}');
GM_addStyle('#header_top table.header[id="resources"] tr.header + tr.header td.header + td.header font[color="#ffffff"]{color:969696}');
GM_addStyle('#header_top table.header[id="resources"] tr.header + tr.header td.header + td.header + td.header font[color="#ffffff"]{color:969696}');
GM_addStyle('#header_top table.header[id="resources"] tr.header + tr.header td.header + td.header + td.header + td.header font[color="#ffffff"]{color:969696}');

/*Couleurs des ressources*/
GM_addStyle('#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header{color:969696}');
GM_addStyle('#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header + td.header{color:969696}');
GM_addStyle('#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header + td.header + td.header{color:969696}');
GM_addStyle('#header_top table.header[id="resources"] tr.header + tr.header + tr.header td.header + td.header + td.header + td.header{color:969696}');

/*Exces de ressources*/
GM_addStyle('tr .header td font[color="#ff0000"] { color:#FF0000; text-decoration: blink;}');

/*Compte rebours construction*/
GM_addStyle('th[colspan="2"] > br + center { padding-left : 25px; padding-top : 35px; position : fixed; right : 0px; top : 219px; display : block; width : 155px; height : 31px; text-align : left; font-size : 10px; background-image : url("http://skin_graph.strategie-expert.com/d_build/img/bg_interface_bau.gif");}');

/*Ordre de libre-�change*/
GM_addStyle('th[colspan="2"] > br + center:first-line { color : #969696; font-size : 9px;}');

/*Orientations Compteurs*/
GM_addStyle('th[colspan="2"] > br + center div#bxx, th[colspan="2"] > br + center div#bxy { position : fixed; right : 2px; top : 233px; display : block; text-align : center; font-size : 10px; color :#969696; background-color : transparent; width : 84px !important; height : 12px !important; padding-left : 0px; border-bottom : 1px #969696 solid; border-top : 0px #969696 solid; border-left : 1px #272727 solid; border-right : 0px #272727 solid;}');

/*Deplacement New Messages*/
GM_addStyle('body div#content center table[width="519"] tr + tr th[colspan="4"] { padding : 0px; padding-top : 17px; background-repeat : no-repeat; background-image : url("http://skin_graph.strategie-expert.com/d_build/img/m.gif"); background-position : top center; border : 0px; background-color : transparent; width : 70px; position : fixed; right : 95px; top : 40px; font-size : 9px; font-weight : normal; text-align : center; text-decoration : bold;}');

/*Couleur New Messages*/

GM_addStyle('body div#content center table[width="519"] tr + tr th[colspan="4"] a { color : #969696; text-decoration : blink;}');

/*Correction*/
GM_addStyle('body div#content center form table[width="519"] tr th[colspan="4"], body div#content center table tr td table[width="519"] tr th[colspan="4"], body div#content center table tr td table[width="519"] tr + tr th[colspan="4"] { empty-cells : hide; padding-top : 0px; background-image : none; text-align : center; border : 1px #272727 ridge; width : auto; position : relative;}');
GM_addStyle('div#content { overflow : visible; position : relative; top : 200px !important; left : 14%; width : 75%; height : auto;}');

GM_addStyle('div#header_top table.header tr.header td.header table.header tr.header td.header a#MondPlani { position : fixed; right : 15px; top : 125px;}');
GM_addStyle('div#header_top table.header tr.header td.header table.header tr.header td.header a#NachURL { position : fixed; right : 3px; top : 100px;}');
GM_addStyle('div#header_top table.header tr.header td.header table.header tr.header td.header a#VorhURL { position : fixed; right : 130px; top : 100px;}');

/*Menülinks*/
GM_addStyle('#menu div a, #menu div a:link, #menu div a:visited { display : block; height : 13px; width : 100%; color : #FFFFFF; font-size : 10px; font-family : Verdana, Tahoma, Helvetica, sans-serif; background-image : url(http://skin_graph.strategie-expert.com/d_build_v2/img/bkd_menu_inactiv.gif); background-color : transparent; background-position : center; background-repeat : repeat;}');

GM_addStyle('#menu div a:hover { display : block; height : 100%; width : 100%; text-decoration : none; font-size : 10px; font-family : Verdana, Tahoma, Helvetica, sans-serif; background-image : url(http://skin_graph.strategie-expert.com/d_build_v2/img/bkd_menu_activ.gif); background-color : transparent; background-position : center; background-repeat : repeat;}');

})();