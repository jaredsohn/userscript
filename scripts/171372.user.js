// ==UserScript==
// @name          	KLP CLEANER
// @description	  	Cleans KLP interface to get rid of spam and comments system
// @author	  	 	Daniel Skowroński <d.skowronski@ds.lublin.pl>
// @version       	0.3
// @match         	http://*.klp.pl/*
// @match         	http://klp.pl/*
//

// ==/UserScript==

function addjQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

jQuery('a[href="http://pogotowiematuralne.pl"]').remove();
jQuery('ul.menu').last().remove();
jQuery('ul.menu').last().remove();
jQuery('iframe').remove();
jQuery('div#zdjecie').last().remove();

jQuery('a.bbtWord').each(function(index, value) {
       this.html=this.val();
   });
   
jQuery('#adKontekst_0').remove();
jQuery('table').remove();   
jQuery('ul.komentarze').remove();   
jQuery('#gl2').css('height', '100%');
jQuery('div[style="clear:both;"]').remove()


/*
var value = $("#text").val(); // value = 9.61 use $("#text").text() if you are not on select box...
value = value.replace(".", ":"); // value = 9:61
// can then use it as
$("#anothertext").val(value);
<a id="anchorbbtBubble46" href="javascript:void(0)" redirect="http://new.smartcontext.pl/core/ad_transaction?bdid=3704f5e43f85d9dedba5fd5359c82a47ef1bda60&amp;att=4&amp;atd=144;3832383752557687272;647356880;958;39;75566;2905;3965776708655282801;25;2;6;3483924747&amp;curl=http%3A%2F%2Fpl.search.etargetnet.com%2Fgeneric%2Fbublina.go.php%3Futm_campaign%3D958%26utm_term%3DREKLAMA%26utm_medium%3Dintext%26utm_source%3DSmartContext%26kwl%3DREKLAMA%26bdid%3D3704f5e43f85d9dedba5fd5359c82a47ef1bda60%26ref%3D18269" class="bbtWord double">reklam</a>

*/