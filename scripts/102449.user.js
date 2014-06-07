// ==UserScript==
// @name        MU Video Player
// @namespace   RedAnime
// @version			1.0
// @date			07/05/2011
// @author			JNeutron
// @description MegaUpload Video Player
// @include     *.megaupload.*/?*
// ==/UserScript==

(function(){
    var url = window.location.href;
    if(url.indexOf('gm=true') > 0){
        document.title = "Procesando...";
        var mask = document.createElement('div');
        var diag = document.createElement('div');
        // MASK
        mask.innerHTML = '';
        mask.style.top = 0;
        mask.style.left = 0;
        mask.style.position = 'fixed';
        mask.style.backgroundColor = '#111';
        mask.style.height = document.height + 'px';
        mask.style.width = '100%';
        mask.style.zIndex = '99999999998';
        document.body.appendChild(mask)
        // DIALOG
        diag.style.width = '300px';
        diag.style.display = 'block';
        diag.style.border = '3px solid #B5AF9F';
        diag.style.textAlign = 'center';
        diag.style.zIndex = '1000001';
        diag.style.backgroundColor = '#F4F1E9';
        diag.style.position = 'fixed';
        diag.style.padding = '25px';
        diag.style.fontWeight = 'bold';
        diag.style.fontFamily = 'Arial';
        diag.innerHTML = '<img src="http://static.ak.fbcdn.net/rsrc.php/yb/r/GsNJNwuI-UM.gif"/> Por favor espere<br><div id="count_ra">--</div> segundos <br><span style="font-size:9px;">Es necesario esperar para poder ver el video, cosa de MegaUpload.</span>';
        var x = (640 / 2) - 150;
        var y = (420 / 2) - 60;
        diag.style.left = x + 'px';
        diag.style.top = y + 'px';
        diag.style.zIndex = '99999999999';
        document.body.appendChild(diag)
        //
	   var cra = document.getElementById('countdown').innerHTML;
	   count_ra(cra);
    }
})();

function count_ra(cra){
    if(cra > 0 ) {
        cra--;
        if(cra <= 0){
    		var downlink = document.getElementById('downloadlink');
    		var dhref = downlink.getElementsByTagName('a')
    		var video_path = (dhref[0].getAttribute("href"));
            video_path = Base64.encode(video_path)
            // URL DE RETORNO
            var url = window.location.href;
            var mu_vars = url.split('&');
            var gm_url_return = 'http://' + mu_vars[1].substr(4);
            // RETORNO
    		window.location.href = gm_url_return + '?gmv=' + video_path;
        }
        if(cra > 0){
            document.getElementById("count_ra").innerHTML = cra;
            setTimeout(function(){ count_ra(cra)},1000);
        }
    }
}

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},


	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	}
}