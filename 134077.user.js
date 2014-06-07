// ==UserScript==

// @name          Webmonkey's Hello World

// @namespace     http://www.webmonkey.com

// @description   A basic example of Greasemonkey that causes an alert at each page load.

// @include       *

// ==/UserScript==



function randomString() {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz|£$%&/()='^ìé+òàù,.-é*§°[]@#{}<>";
	var string_length = 50;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

var keyStr = "ABCDEFGHIJKLMNOP" +
               "QRSTUVWXYZabcdef" +
               "ghijklmnopqrstuv" +
               "wxyz0123456789+/" +
               "=";

  function encode64(input) {
     input = escape(input);
     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;

     do {
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
           keyStr.charAt(enc1) +
           keyStr.charAt(enc2) +
           keyStr.charAt(enc3) +
           keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
     } while (i < input.length);

     return output;
  }

function gpk() 
		{
			var randomtext = randomString();
			var PassPhrase = encode64(randomtext + Math.random());
			return PassPhrase;
		}	

function gsk(PassPhrase) {
			
			var Bits = 1024; 
			var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
			var MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey);
			return MattsPublicKeyString; 
		
		}

function gso(PassPhrase)
			{
				var Bits = 1024; 
				var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
				return MattsRSAkey;
			}


function enc(text,key) 
		{


			var EncryptionResult = cryptico.encrypt(text, key);

			return EncryptionResult.cipher;

			

		}

function dec()
		{
	
			var DecryptionResult = cryptico.decrypt(document.data.ctext.value, gso(document.data.priv.value));
			return DecryptionResult.plaintext;
			//return DecryptionResult.plaintext;
		}
function ifill(namee,text) 
		{
			document.data.namee.value = text;
		}


function start(textt) {
// The passphrase used to repeatably generate this RSA key.
var randomtext = randomString();
var PassPhrase = encode64(randomtext + Math.random());
if(document.data.chiave.value == '') {document.data.chiave.value = PassPhrase;} else {document.data.chiave.value = PassPhrase;}
// The length of the RSA key, in bits.
var Bits = 1024; 

var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);

var MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey);       

document.data.chiavegen.value = MattsPublicKeyString;

var PlainText = document.data.ctesto.value;

var EncryptionResult = cryptico.encrypt(PlainText, MattsPublicKeyString);

document.data.ctext.value = EncryptionResult.cipher;


var DecryptionResult = cryptico.decrypt(EncryptionResult.cipher, MattsRSAkey);

document.data.dtesto.value = DecryptionResult.plaintext;

}