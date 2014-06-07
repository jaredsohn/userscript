// ==UserScript==
// @name    VG nattkommentarer
// @version 0.2
// @include https://www.vg.no/*
// @include http://www.vg.no/*
// @icon    http://i.imgur.com/yJTKOHU.png
// ==/UserScript==

var kommentarer = document.getElementById('commentLateNight');

if(typeof kommentarer !== "undefined" && kommentarer != null){
	kommentarer.innerHTML = '\
<a name="facebook_comments"></a> \
<img src="http://static.vg.no/gfx/kommentartopp.gif"> \
<p style="font-family: arial; font-size: 11px; margin: 0; padding-bottom: 4px;"> \
<img src="http://i.imgur.com/OLoycNU.jpg" alt="" style="height: 78px; width: 63px; float: left; margin-right: 5px;"> \
Her "inviterer" vi deg til å komme med informasjon, argumenter og \
synspunkter. Vi krever fullt navn — slik at du ikke kan uttrykke kontroversielle og radikale meninger uten frykt for represalier. Vi vil ikke ha innlegg fra personer \
som enten ikke har en A4-døgnrytme eller som ikke befinner \
seg i den norske tidssonen, det ville ha ført til en åpen og skikkelig debatt - noe vi ikke kan fordra. \
<br> \
Vennlig hilsen Egon Olsen, redaktør digital. <span><a href="http://static.vg.no/disclaimer/facebook.html?ta&amp;keepThis=true&amp;TB_iframe=true&amp;height=730&amp;width=650" class="kontaktoss thickbox">Les mer om vår sensur</a></span> \
</p> \
<fb:comments href="' + window.location.href + '" num_posts="20" width="468" migrated="1" fb-xfbml-state="rendered" class="fb_iframe_widget"><span style="height: 6835px; width: 468px;"><iframe id="f28fa3822c" name="f35b71fa58" scrolling="no" style="border: none; overflow: hidden; height: 6835px; width: 468px;" class="fb_ltr" src="https://www.facebook.com/plugins/comments.php?api_key=152316758161786&amp;locale=nb_NO&amp;href=' + window.location.href + '"></iframe></span></fb:comments>';

	kommentarer.id = 'nattkommentarer';
}