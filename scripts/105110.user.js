// ==UserScript==
// @name           CG: DownFight link
// @namespace      FeuerWasser
// @description    DF: Ajoute un lien vers les cibles max
// @include        http://*.clodogame.fr/*
// @include        http://*.pennergame.de/*
// @require	   http://m42k.info/hk/jquery-1.6.1.min.js
// ==/UserScript==



function CG_TP_main()
{
  var alist = document.getElementsByTagName('a');
  for (idx=0; idx<alist.length; idx++) {
    if ( (alist[idx].innerHTML == "Afficher les joueurs attaquables")
	|| (alist[idx].innerHTML == "Angreifbare Spieler anzeigen") ) {
      var stlink = alist[idx].href;
      var pmin = stlink.indexOf('?');
      var pmax = stlink.indexOf('&');
      var vmax = stlink.substring(pmax+5,stlink.length);
      var vmsz = Math.ceil(Math.log(vmax)/Math.LN10);
      if (vmsz<5) { vmsz=5; }
      var vmpl = Math.pow(10,vmsz-3);
      var newvmin = (Math.floor(vmax/vmpl)*vmpl)-100;
      var newlink = stlink.substring(0,pmin+5)+newvmin+'&amp;max='+vmax;
			alist[idx].innerHTML = '<font color="#12bd12"><img alt="UpFight" style="vertical-align: middle; margin:-17px;" src="http://icons.iconarchive.com/icons/semlabs/web-blog/48/arrow-mini-top-right-icon.png" /> <b>[UP]</b> Liste joueurs attaquables &agrave; limite min.</font>';
      alist[idx].parentNode.innerHTML += '<br>\n<a href="'+newlink+'"><font color="#de2221"><img alt="DownFight" style="vertical-align: middle;" src="http://icons.iconarchive.com/icons/yusuke-kamiyamane/fugue/16/hand-point-270-icon.png" /><b>[DF]</b> Liste joueurs attaquables &agrave; la limite max.</font></a>';
    }
  }
 
}

CG_TP_main();
