// ==UserScript==
// @name        [2ch.hk]AntiValentineTweek
// @namespace   AntiValentineTweek
// @include     http://2ch.hk/*
// @version     1.1
// @grant       none
// ==/UserScript==

	$('img[src^="/images/smiles/"]').remove();//DELETE Smiles
    
    If ( dd==14 && mm==2 ) {
          	$('link[title="Valentine"]').attr('href', '//2ch.hk   /css/Photon.css?build=31.05.2013');//Photon CSS Theme
			$('div#title>center>iframe').remove();//DELETE Elvis
			snowStorm.stop();//OFF Flying Hearts
    }


//$('script[src$="snowstorm-min.js"]').remove();//DELETE Flying Hearts
//$('div[style$="translate3d(0px"]').css({'display':'none'});//DELETE Flying Hearts