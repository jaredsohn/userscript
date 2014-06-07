// ==UserScript==
// @name           tvarsivi.com - bypass ads
// @description    tvarsivi.com - bypass adverts in the player window
// @version        1.3
// @date           22.04.2013
// @author         Volkan K.
// @namespace      http://userscripts.org/users/volkan
// @include        http://tvarsivi.com/player.php*
// @include        http://www.tvarsivi.com/player.php*
// ==/UserScript==

if ('undefined' == typeof __TVARSIVI_PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __TVARSIVI_PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

if (document.getElementById('reklamigec')){
	reklambitti(); return false;
}

function simdiki_adresi_yaz (){
	if ( sonraki_elem=document.getElementById('sonraki') && (zaman != null) ) {
		/*if ( !(simdiki_elem=document.getElementById('simdiki')) ) {
			simdiki_elem=document.createElement('strong');
			simdiki_elem.setAttribute('id', 'simdiki');
			sonraki_elem.parentNode.insertBefore(simdiki_elem, sonraki_elem);
		}*/
		//html_yazi="<a href='?y="+yayin+"&z="+zaman+"'>(Y)</a>";
		/*if ( simdiki_elem.innerHTML.indexOf(zaman) == -1 ) {
			simdiki_elem.innerHTML=html_yazi;
		}*/
		saat_elem=document.getElementById('saat');
		//saat_text=saat_elem.innerHTML;
		if ( saat_elem.innerHTML.indexOf(zaman) == -1 ) {
			saat_text=zaman.split(" ")[1];
			html_yazi="<a href='?y="+yayin+"&z="+zaman+"'>"+saat_text+"</a>";
			saat_elem.innerHTML=html_yazi;
		}
	}
}

setInterval(simdiki_adresi_yaz,1000);
