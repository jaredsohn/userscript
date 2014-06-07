// ==UserScript==
// @name          Pantip.com/cafe show only voted items
// @namespace     http://userstyles.org
// @description	  nineoat's show only voted items
// @author        nineoat
// @homepage      http://twitter.com/nineoat
// @include       http://www.pantip.com/cafe/
// @include       http://www.pantip.com/cafe/siam/listerF.php?nineoat
// @include       http://www.pantip.com/cafe/chalermthai/listerA.php?nineoat
// @include       http://www.pantip.com/cafe/chalermkrung/listerC.php?nineoat
// @include       http://www.pantip.com/cafe/jatujak/listerJ.php?nineoat
// @include       http://www.pantip.com/cafe/food/listerD.php?nineoat
// @include       http://www.pantip.com/cafe/home/listerR.php?nineoat
// @include       http://www.pantip.com/cafe/ratchada/listerV.php?nineoat
// @include       http://www.pantip.com/cafe/mbk/listerT.php?nineoat
// @include       http://www.pantip.com/cafe/supachalasai/listerS.php?nineoat
// @include       http://www.pantip.com/cafe/blueplanet/listerE.php?nineoat
// @include       http://www.pantip.com/cafe/camera/listerO.php?nineoat
// @include       http://www.pantip.com/cafe/lumpini/listerL.php?nineoat
// @include       http://www.pantip.com/cafe/woman/listerQ.php?nineoat
// @include       http://www.pantip.com/cafe/family/listerN.php?nineoat
// @include       http://www.pantip.com/cafe/klaibann/listerH.php?nineoat
// @include       http://www.pantip.com/cafe/library/listerK.php?nineoat
// @include       http://www.pantip.com/cafe/religious/listerY.php?nineoat
// @include       http://www.pantip.com/cafe/wahkor/listerX.php?nineoat
// @include       http://www.pantip.com/cafe/silom/listerB.php?nineoat
// @include       http://www.pantip.com/cafe/social/listerU.php?nineoat
// @include       http://www.pantip.com/cafe/isolate/listerM.php?nineoat
// @include       http://www.pantip.com/cafe/sinthorn/listerI.php?nineoat


// ==/UserScript==

// Add jQuery  http://joanpiedra.com/jquery/greasemonkey/
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {

/// nineoat

		if(location.href.indexOf("nineoat") > -1){
			val = $(" table.themebg tr td:contains('กระทู้แนะนำโดย') p").slice(0 ,1).html()
			$("body").html(val )
		}else{
			var myWeb= new Array();
			myWeb[0]="http://www.pantip.com/cafe/siam/listerF.php?nineoat";
			myWeb[1]="http://www.pantip.com/cafe/chalermthai/listerA.php?nineoat";
			myWeb[2]="http://www.pantip.com/cafe/chalermkrung/listerC.php?nineoat";
			myWeb[3]="http://www.pantip.com/cafe/jatujak/listerJ.php?nineoat";
			myWeb[4]="http://www.pantip.com/cafe/food/listerD.php?nineoat";
			myWeb[5]="http://www.pantip.com/cafe/home/listerR.php?nineoat";
			myWeb[6]="http://www.pantip.com/cafe/ratchada/listerV.php?nineoat";
			myWeb[7]="http://www.pantip.com/cafe/mbk/listerT.php?nineoat";
			myWeb[8]="http://www.pantip.com/cafe/supachalasai/listerS.php?nineoat";
			myWeb[9]="http://www.pantip.com/cafe/blueplanet/listerE.php?nineoat";
			myWeb[10]="http://www.pantip.com/cafe/camera/listerO.php?nineoat";
			myWeb[11]="http://www.pantip.com/cafe/lumpini/listerL.php?nineoat";
			myWeb[12]="http://www.pantip.com/cafe/woman/listerQ.php?nineoat";
			myWeb[13]="http://www.pantip.com/cafe/family/listerN.php?nineoat";
			myWeb[14]="http://www.pantip.com/cafe/klaibann/listerH.php?nineoat";
			myWeb[15]="http://www.pantip.com/cafe/library/listerK.php?nineoat";
			myWeb[16]="http://www.pantip.com/cafe/religious/listerY.php?nineoat";
			myWeb[17]="http://www.pantip.com/cafe/wahkor/listerX.php?nineoat";
			myWeb[18]="http://www.pantip.com/cafe/silom/listerB.php?nineoat";
			myWeb[19]="http://www.pantip.com/cafe/social/listerU.php?nineoat";
			myWeb[20]="http://www.pantip.com/cafe/isolate/listerM.php?nineoat";
			myWeb[21]="http://www.pantip.com/cafe/sinthorn/listerI.php?nineoat";


			newDiv = "" ;
			for (i=0;i<myWeb.length;i++){
			    newDiv  +="<iframe id='frame"+i+"' src ='"+myWeb[i]+"' width='99%' height='330'/>";
			}
			$("body").html(newDiv  ) ;
		}



    }






