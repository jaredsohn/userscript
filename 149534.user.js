// ==UserScript==
// @name          Custom CSS For Minefield.fr
// @description   Modification du css pour Minefield.fr
// @version	  1.0.0
// @namespace     Css Minefield
// @include       http://minefield.fr/forum/
// @include       http://www.minefield.fr/forum/
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//stylesheet
addGlobalStyle('.navbar { padding-left: 31px; background: url("http://media.minefield.fr/forum/styles/minefield/theme/images/navbar-inner.png") no-repeat scroll 10px 10px #B22222;}');
addGlobalStyle('a.forumtitle { color: #000000; font-family: Merriweather,"Trebuchet MS",Helvetica,Arial,Sans-serif; font-size: 18px; font-weight: bold; text-decoration: none; }');
addGlobalStyle('li.header dt a, li.header dd a { color: #8BAB8D; font-size: 24px; }');
addGlobalStyle('body#phpbb { background: url("http://img15.hostingpics.net/pics/231324Sanstitre2.png") repeat scroll center top #E4E4E4; }');
addGlobalStyle('.forum-title { background: none repeat scroll 0 0 #8BAB8D; line-height: 20px; margin-top: 16px; padding: 10px; }');
addGlobalStyle('p { margin-bottom: 18px; margin-top: 15px; }');
addGlobalStyle('a.sendemail { background-image: none; width: 25px; }');


var Button1       = document.createElement ('div');
Button1.innerHTML = '<button id="myButton1" type="button" location.href="http://www.minefield.fr/forum/nouvelle-azur/">Nouvelle-Azur</button>';
Button1.setAttribute ('id', 'myContainer1');
document.body.appendChild (Button1);

var Button2       = document.createElement ('div');
Button2.innerHTML = '<button id="myButton2" type="button">Nevah</button>';
Button2.setAttribute ('id', 'myContainer2');
document.body.appendChild (Button2);

var Button3       = document.createElement ('div');
Button3.innerHTML = '<button id="myButton3" type="button">RSS</button>';
Button3.setAttribute ('id', 'myContainer3');
document.body.appendChild (Button3);

//--- Activate the newly added button.
document.getElementById ("myButton1").addEventListener ("click", ButtonClickAction1, false);
document.getElementById ("myButton2").addEventListener ("click", ButtonClickAction2, false);
document.getElementById ("myButton3").addEventListener ("click", ButtonClickAction3, false);

function ButtonClickAction1 (zEvent)
{
	document.location.href= "http://www.minefield.fr/forum/nouvelle-azur/";
}

function ButtonClickAction2 (zEvent)
{
	document.location.href= "http://www.minefield.fr/forum/nevah/";
}
function ButtonClickAction3 (zEvent)
{
	document.location.href= "http://www.minefield.fr/forum/feed.php";
}

//--- Style our newly added elements using CSS.
GM_addStyle ( (<><![CDATA[
    #myContainer1 {
        position:               absolute;
		height: 				31px;
		width: 					150px;
        top:                    0px;
        left:                   200px;
        font-size:              20px;
        background:             none;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;

    }
	#myContainer2 {
        position:               absolute;
		height: 				90px;
        top:                    40px;
        left:                   200px;
        font-size:              20px;
        background:             none;
        margin:                 5px;
        opacity:                0.9;
        z-index:                223;
        padding:                5px 20px;
    }
	#myContainer3 {
        position:               absolute;
		height: 				90px;
        top:                    0px;
        left:                   357px;
        font-size:              20px;
        background:             none;
        margin:                 5px;
        opacity:                0.9;
        z-index:                224;
        padding:                5px 20px;
    }
    #myButton1 {
		background:				url("http://www.minefield.fr/wp-content/themes/minefield2012/images/arrow-server.png") no-repeat scroll 95% 50% #1E90FF;
		border: 				0 none;
		color:					#FFFFFF;
		cursor: 				pointer;
		font-family: 			Economica;
		font-size: 				22px;
		font-weight: 			bold;
		height: 				32px;
		line-height: 			32px;
		margin-right: 			-30px;
		padding: 				0 25px 0 5px;
		text-align: 			center;
		width: 					150px;
    }
	
	#myButton2 {
		background: 			url("http://www.minefield.fr/wp-content/themes/minefield2012/images/arrow-server.png") no-repeat scroll 95% 50% #B22222;
		border: 				0 none;
		color:					#FFFFFF;
		cursor: 				pointer;
		font-family: 			Economica;
		font-size: 				22px;
		font-weight: 			bold;
		height: 				32px;
		line-height: 			32px;
		margin-right: 			-30px;
		padding: 				0 25px 0 5px;
		text-align: 			center;
		width: 					150px;
    }
	#myButton3 {
		background: 			url("http://www.minefield.fr/wp-content/themes/minefield2012/images/arrow-server.png") no-repeat scroll 95% 50% #F07000;
		border: 				0 none;
		color:					#FFFFFF;
		cursor: 				pointer;
		font-family: 			Economica;
		font-size: 				22px;
		font-weight: 			bold;
		height: 				32px;
		line-height: 			32px;
		margin-right: 			-30px;
		padding: 				0 25px 0 5px;
		text-align: 			center;
		width: 					85px;
    }
    #myContainer p {
        color:                  red;
        background:             white;
    }
]]></>).toString () );



