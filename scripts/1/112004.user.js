// ==UserScript==
// @name	MinOOn
// @namespace	    http://fondation.oneovernyne.com/
// @description	  Modifie la fenetre du jeux
// @include       http://fondation.oneovernyne.com/chan_box.run?*
// @include       http://fondation.oneovernyne.com/play_web.run?*
// @include       http://fondation.oneovernyne.com/core.run?*
// @include       http://fondation.oneovernyne.com/chan_live.run?*
// @version       1.0
// @author 			Golgotha
// ==/UserScript==

if(document.location.href.indexOf("http://fondation.oneovernyne.com/chan_box.run?*")){

var bool = document.getElementsByClassName("chan2")[0] || 0;
  if(bool) {
      
      document.getElementsByClassName("chan2")[0].style.display = "none";
      document.getElementsByClassName("chan3")[0].style.display = "none";
      document.getElementsByClassName("zone")[0].style.height = "300px";
      
        OBJ = document.getElementById('zone1') ;
        OBJ.style.height = "200px" ;
        window.c_resize(5,true);
   }
}

if(document.location.href.indexOf("http://fondation.oneovernyne.com/play_web.run?*")){

document.getElementById("frmst").cols = "100%,25%";

}



	









