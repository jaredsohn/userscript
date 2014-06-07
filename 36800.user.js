// JavaScript Document
// ==UserScript==
// @name           ------------
// @autor          ------------
// @e-mail         -----------------
// @description    -----------
// @include        ---------
// @exclude        ---------
// ==/UserScript==

// ---- Version 1.01 ---- 

var horalocal = new Date();
var hora = Horalocal.getHours()

function Jour(css) {

if ( hora >= 1 && hora <= 0 || hora >= 0 && hora <= 1 )

    {var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);}

// ---------- Jour -----------
//-----------------------------------Batiment--------------------------------

Jour('#city #container #mainview #locations .shipyard .buildingimg {	left:-22px; top:-20px; width:129px; height:100px; background-image:url(http://img4.hostingpics.net/pics/912078chantier_navale.gif);	}'       );
Jour('#city #container #mainview #locations .museum .buildingimg {	left:-8px; top:-38px; width:105px; height:85px;  background-image:url(http://img4.hostingpics.net/pics/149955musee.gif);	}');
Jour('#city #container #mainview #locations .warehouse .buildingimg {	left:0px; top:-33px; width:126px; height:86px;  background-image:url(http://img4.hostingpics.net/pics/29590entrepot.gif);	}');
Jour('#city #container #mainview #locations .wall .buildingimg {	left:-500px; top:-15px; width:720px; height:137px;   background-image:url(http://img4.hostingpics.net/pics/759812mur.gif);	}');
Jour('#city #container #mainview #locations .tavern .buildingimg {	left:-10px; top:-15px; width:111px; height:65px;  background-image:url(http://img4.hostingpics.net/pics/87092taverne.gif);	}');
Jour('#city #container #mainview #locations .palace .buildingimg {	left:-10px; top:-42px; width:106px; height:97px;  background-image:url(http://img4.hostingpics.net/pics/402031palais.gif);	}');
Jour('#city #container #mainview #locations .academy .buildingimg {	left:-19px; top:-31px; width:123px; height:90px; background-image:url(http://img4.hostingpics.net/pics/892141academie.gif);	}');
Jour('#city #container #mainview #locations .workshop-army .buildingimg {	left:-19px; top:-31px; width:106px; height:85px; background-image:url(http://img4.hostingpics.net/pics/875704atelier.gif);}');
Jour('#city #container #mainview #locations .safehouse .buildingimg {	left:5px; top:-15px; width:84px; height:58px; background-image:url(http://img4.hostingpics.net/pics/366800cachette.gif);	}');
Jour('#city #container #mainview #locations .branchOffice .buildingimg {	left:-19px; top:-31px; width:109px; height:84px; background-image:url(http://img4.hostingpics.net/pics/674350comptoir.gif);}');
Jour('#city #container #mainview #locations .embassy .buildingimg {	left:-5px; top:-31px; width:93px; height:85px; background-image:url(http://img4.hostingpics.net/pics/518942consulat.gif);	}');
Jour('#city #container #mainview #locations .palaceColony .buildingimg {	left:-10px; top:-42px; width:109px; height:95px;  background-image:url(http://img4.hostingpics.net/pics/202306residence.gif);	}');
Jour('#city #container #mainview #locations .townHall .buildingimg {	left:-5px; top:-60px; width:104px; height:106px; background-image:url(http://img4.hostingpics.net/pics/769083hotel_de_ville.gif);	}');
Jour('#city #container #mainview #locations .barracks .buildingimg {	left:0px; top:-33px; width:100px; height:76px; background-image:url(http://img4.hostingpics.net/pics/468808caserne.gif);	}');
Jour('#city #container #mainview #locations .port .buildingimg {	left:-65px; top:-35px; width:163px; height:131px; background-image:url(http://img4.hostingpics.net/pics/644529port.gif);	}');
Jour('#city #container #mainview #locations li .constructionSite { left:-20px; top:-30px; width:114px; height:81px; background-image:url(http://img4.hostingpics.net/pics/507216chantier.gif);	}');
