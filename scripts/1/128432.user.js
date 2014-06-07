// ==UserScript==
// @name           dadiro
// @namespace      dadiro
// @description    dadiro
// @author         algkmn
// @grants         none
// @include        *eksisozluk.com*
// @include        www.eksisozluk.com*
// @include        http://www.eksisozluk.com*
// @include        http://*warez-bb.org/search.php*
// @include        http://www.gfxtra.com/*
// @include        *://kickass.to/*
// @include        http://localhost/phpmyadmin/*
// @include        https://real-debrid.fr/torrents
// @include        *:2082/*
// ==/UserScript==

var objecta = document.createElement('script');
objecta.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
objecta.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(objecta);


function wait(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(wait, 100);
    }
    else {
        $ = unsafeWindow.jQuery;
        main();
    }
}

wait();



function main(){

	//Wbb Search
	$('.multi[name="search_forum[]"]').attr("size", "20");
	$('.multi[name="search_forum[]"]').val(4);
	
	$('[name="db_collation"]').val("utf8_turkish_ci");
	

	// Ekşi
	$('html.ad-sitewide #index-section').css('margin-top',0);
	
	// Kickass.to
	/*$(".buttonsline").append("<input type=\"text\" id=\"maglink\" style=\"width:70%;\" />");
	var maglink = $("a.magnetlinkButton").attr("href");
	alert(maglink);
	$("#maglink").val(maglink);
	$("#maglink").click(function () {
        $(this).select();
    });*/
    
    
    //Real Debrid
    
    $(".full_width_wrapper").append("<form method=\"post\" action=\"./downloader\"><textarea id=\"links_2180278\" class=\"aabbcc\"></textarea><br><input type=\"submit\" value=\"Send\"></form>");
    var kactane = $('[name="links"]').length;
    var deger = 0;
    var i;
    for (i=0;i<kactane;i++){
        var deger = $('[name="links"]').eq(i).val() + '\n';
        if (deger != '\n')
        $(".aabbcc").append(deger);
    }
    
    $(".aabbcc").click(function () {
        $(this).select();
    });
	
	
	//Gfxtra
  var keyStr = "ABCDEFGHIJKLMNOP" +
               "QRSTUVWXYZabcdef" +
               "ghijklmnopqrstuv" +
               "wxyz0123456789+/" +
               "=";
 function decode64(input) {
     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;

     // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
     var base64test = /[^A-Za-z0-9\+\/\=]/g;
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

     do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
           output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
           output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

     } while (i < input.length);

     return unescape(output);
  }
  
	while ($('a[href^="http://www.gfxtra.com/engine/go.php?url="]').attr("href"))
	{
   var link = $('a[href^="http://www.gfxtra.com/engine/go.php?url="]').attr("href");
   var hex = link.split("=");
   var cc = hex[1].replace("%3D","");
   var cc = cc.replace("%3D","");
   
   $('a[href^="http://www.gfxtra.com/engine/go.php?url='+hex[1]+'"]').text(decode64(cc));
   $('a[href^="http://www.gfxtra.com/engine/go.php?url='+hex[1]+'"]').attr("href",decode64(cc));
  }

	
	

}
   