// Drunken Boxer Encryption for LiveJournal
// Limned in swirling colours on tanned and furnace-blasted beasthide by Prince Megahit
// [http://vargtimmen.livejournal.com/]
// version 1.0
// 2007.01.10
// This software released under the BPL v1.0
// (http://www.encyclopediadramatica.com/index.php/BPL)
// My thanks to evil-weev for telling me easier ways to code things a week after I already wrote them
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Drunken Boxer Encryption", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Drunken Boxer Encryption
// @namespace     http://drunkenboxer.taizong.org/
// @description   Encodes and decodes LiveJournal entries with pseudo-Chinese that uses the box radical (hence the name). Uses the xxTEA encryption algorithm and supports the entire Unicode spectrum.
// @include       http://www.livejournal.com/update.bml*
// @include       http://www.livejournal.com/editjournal.bml*
// @include       http://*.livejournal.com/*.html*
// ==/UserScript==


var encryptionOffset = 22120;	// this marks the section of the Unicode charset that's used for encryption. The box radical characters are clumped together around this area, giving the output its neat "boxy" look. You can easily change this to make the output look like Bangla, Inuktitut, Glagolithic, whatever you'd like; but I prefer Chinese because there are so few undefined characters in this range (which shew up as questions marks, and make for quite the eyesore).

var redirectscript = 'http://www.google.com/url?sa=t&ct=res&cd=1&url=';

GM_registerMenuCommand('Change Drunken Boxer passphrase', change_passphrase);

function change_passphrase() {
	GM_setValue('drunken_passphrase', prompt("Please enter a passphrase you'd like to use to communicate with your compatriots."));
}

if (!GM_registerMenuCommand) { alert('Please upgrade to the latest version of Greasemonkey.'); }

if (!GM_getValue('drunken_passphrase')) {	GM_setValue('drunken_passphrase', prompt("Please enter a passphrase you'd like to use to communicate with your compatriots.")); }

window.addEventListener('load', putbuttons, true);

// salts the passphrase hash with delicious dong flavor
var dongsalt = sha1(GM_getValue('drunken_passphrase') + '!@&*dongs');

// Use Block TEA to encrypt plaintext using password
// Note plaintext & password must be strings not string objects
//
function TEAencrypt(plaintext, password)
{
    if (plaintext.length == 0) return('');  // nothing to encrypt
    // 'escape' plaintext so chars outside ISO-8859-1 work in single-byte packing, but  
    // keep spaces as spaces (not '%20') so encrypted text doesn't grow too long, and 
    // convert result to longs
    var v = strToLongs(escape(plaintext).replace(/%20/g,' '));
    if (v.length <= 1) v[1] = 0;  // algorithm doesn't work for n<2 so fudge by adding nulls
    var k = strToLongs(password.slice(0,16));  // simply convert first 16 chars of password as key
    var n = v.length;

    var z = v[n-1], y = v[0], delta = 0x9E3779B9;
    var mx, e, q = Math.floor(6 + 52/n), sum = 0;

    while (q-- > 0) {  // 6 + 52/n operations gives between 6 & 32 mixes on each word
        sum += delta;
        e = sum>>>2 & 3;
        for (var p = 0; p < n-1; p++) {
            y = v[p+1];
            mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
            z = v[p] += mx;
        }
        y = v[0];
        mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
        z = v[n-1] += mx;
    }
    // note use of >>> in place of >> due to lack of 'unsigned' type in JavaScript 
    // (thanks to Karsten Kraus @ swr3 for this)

    var ciphertext = longsToStr(v);

    return escCtrlCh(ciphertext);
}


// Use Block TEA to decrypt ciphertext using password
//
function TEAdecrypt(ciphertext, password)
{
    if (ciphertext.length == 0) return('');
    var v = strToLongsDecrypt(unescCtrlCh(ciphertext));
    var k = strToLongs(password.slice(0,16)); 
    var n = v.length;

    var z = v[n-1], y = v[0], delta = 0x9E3779B9;
    var mx, e, q = Math.floor(6 + 52/n), sum = q*delta;

    while (sum != 0) {
        e = sum>>>2 & 3;
        for (var p = n-1; p > 0; p--) {
            z = v[p-1];
            mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
            y = v[p] -= mx;
        }
        z = v[n-1];
        mx = (z>>>5 ^ y<<2) + (y>>>3 ^ z<<4) ^ (sum^y) + (k[p&3 ^ e] ^ z);
        y = v[0] -= mx;
        sum -= delta;
    }

    var plaintext = longsToStrDecrypt(v);

    // strip trailing null chars resulting from filling 4-char blocks:
    plaintext = plaintext.replace(/\0+$/,'');

    return unescape(plaintext);
}

// sha-1 hash of passphrase
//
function sha1(msg)
{
    // constants [4.2.1]
    var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];

    // PREPROCESSING 
 
    msg += String.fromCharCode(0x80); // add trailing '1' bit to string [5.1.1]

    // convert string msg into 512-bit/16-integer blocks arrays of ints [5.2.1]
    var l = Math.ceil(msg.length/4) + 2;  // long enough to contain msg plus 2-word length
    var N = Math.ceil(l/16);              // in N 16-int blocks
    var M = new Array(N);
    for (var i=0; i<N; i++) {
        M[i] = new Array(16);
        for (var j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
            M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) | 
                      (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
        }
    }
    // add length (in bits) into final pair of 32-bit integers (big-endian) [5.1.1]
    M[N-1][14] = ((msg.length-1) >>> 30) * 8;
    M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;

    // set initial hash value [5.3.1]
    var H0 = 0x67452301;
    var H1 = 0xefcdab89;
    var H2 = 0x98badcfe;
    var H3 = 0x10325476;
    var H4 = 0xc3d2e1f0;

    // HASH COMPUTATION [6.1.2]

    var W = new Array(80); var a, b, c, d, e;
    for (var i=0; i<N; i++) {

        // 1 - prepare message schedule 'W'
        for (var t=0;  t<16; t++) W[t] = M[i][t];
        for (var t=16; t<80; t++) W[t] = ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);

        // 2 - initialise five working variables a, b, c, d, e with previous hash value
        a = H0; b = H1; c = H2; d = H3; e = H4;

        // 3 - main loop
        for (var t=0; t<80; t++) {
            var s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
            var T = (ROTL(a,5) + f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
            e = d;
            d = c;
            c = ROTL(b, 30);
            b = a;
            a = T;
        }

        // 4 - compute the new intermediate hash value
        H0 = (H0+a) & 0xffffffff;  // note 'addition modulo 2^32'
        H1 = (H1+b) & 0xffffffff; 
        H2 = (H2+c) & 0xffffffff; 
        H3 = (H3+d) & 0xffffffff; 
        H4 = (H4+e) & 0xffffffff;
    }

    return H0.toString(16) + H1.toString(16) + H2.toString(16) + H3.toString(16) + H4.toString(16);
}


    // Decrypts entry and comments (if they're encrypted). Before I started using a block cipher,
    // I could get away with stripping out just the wbr tags. With xxTEA, obviously anything
    // that's not part of the cipher needs to be stripped out before decryption is attempted.
    //
    function decryptbutton()
    {
	var someFonts;

	someFonts = document.getElementsByTagName("font");
	for (var i = 0; i < someFonts.length; i++) {
	  if (someFonts[i].getAttribute("face") == dongsalt) {

		var tempstring = someFonts[i].innerHTML;
		var outputstring = '';
		for (var j = 0; j < tempstring.length; j++) {
			if ((tempstring.charCodeAt(j) >= encryptionOffset) && (tempstring.charCodeAt(j) < encryptionOffset + 257)) { outputstring += tempstring.charAt(j); }
		}
		someFonts[i].innerHTML = TEAdecrypt(outputstring, GM_getValue('drunken_passphrase')).replace(/\n/gi, "<br>");

		var allLinks, thisLink;
		allLinks = someFonts[i].getElementsByTagName("a");
		for (var k = 0; k < allLinks.length; k++) {
		    thisLink = allLinks.item(k);
		    if (thisLink.getAttribute('href').indexOf('://') == -1) {
		    	thisLink.setAttribute("href", redirectscript + "http%3A//" + escape(thisLink.getAttribute("href")));
		    } else {
		    	thisLink.setAttribute("href", redirectscript + escape(thisLink.getAttribute("href")));
		    }
		}
        }
	}

   }

   // Take careful note of the difference in size of the decrypt and encrypt functions (lulz)
   //
   function encryptbutton()
   {
      var myForm = document.getElementById('draft');
	myForm.value = '<font face="' + dongsalt + '">' + TEAencrypt(myForm.value, GM_getValue('drunken_passphrase')) + '</font>';
   }

   function encryptcommentbutton()
   {
	var commentbody = document.getElementById("body");
	if (commentbody == undefined) { commentbody = document.getElementById("commenttext"); }
	commentbody.value = '<font face="' + dongsalt + '">' + TEAencrypt(commentbody.value, GM_getValue('drunken_passphrase')) + '</font>';
   }

// Decide which if any buttons to insert into the DOM
//
function putbuttons() {

	// add encrypt entry button to DOM
	if (document.getElementById('updateForm') != undefined) {
		var allDIVs = document.getElementsByTagName("div");
		var newindex;
		for (var i=0; i < allDIVs.length; i++) {
			if (allDIVs[i].id == 'security_container') { newindex = i }
		}
		var sendrow = allDIVs[newindex];

		var divTag = document.createElement("div");
		divTag.setAttribute('id', 'encryptdiv');
		divTag.setAttribute('style', '-moz-border-radius: 10px; background: wheat; margin: 10px 7px 0 0; padding: 3px;');
		divTag.setAttribute('align', 'center');
		sendrow.appendChild(divTag);

		//Add the encryption button
		var EncryptButton = document.createElement("button");
		EncryptButton.setAttribute('id', 'encrypt');
		EncryptButton.setAttribute('type', 'button');
		EncryptButton.addEventListener("click", encryptbutton, true);
		EncryptButton.innerHTML='<font color="blue">Drunken Boxer Encrypt</font>';
      	divTag.appendChild(EncryptButton);
    	}

	var submitpostgay = document.evaluate("//input[@name='submitpost']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	// add encrypt comment button to DOM
	if (submitpostgay.snapshotItem(0) != undefined) {
		var commentplace = submitpostgay.snapshotItem(0).parentNode;

		var commentTag = document.createElement("div");
		commentTag.setAttribute('id', 'encryptdiv');
		commentTag.setAttribute('style', '-moz-border-radius: 10px; background: wheat; margin: 10px 7px 0 0; padding: 3px;');
		commentTag.setAttribute('align', 'center');
		commentplace.insertBefore(commentTag, submitpostgay.snapshotItem(0));

		//Add the comment encryption button
	      var EncryptButton = document.createElement("button");
	      EncryptButton.setAttribute('id', 'encrypt');
		EncryptButton.setAttribute('type', 'button');
		EncryptButton.addEventListener("click", encryptcommentbutton, true);
		EncryptButton.innerHTML='<font color="blue">Drunken Boxer Encrypt</font>';
      	commentTag.appendChild(EncryptButton);
	}


	// add decrypt (entry & comments) button to the DOM
	var someFonts;
	

	someFonts = document.getElementsByTagName("font");
	for (var i = 0; i < someFonts.length; i++) {
	  if (someFonts[i].getAttribute("face") == dongsalt) {

		    var sendrow = someFonts[i];

		    var divTag = document.createElement("div");
		    divTag.setAttribute('id', 'encryptdiv');
		    divTag.setAttribute('style', '-moz-border-radius: 10px; background: wheat; margin: 10px 7px 0 0; padding: 3px;');
		    divTag.setAttribute('align', 'center');
		    sendrow.appendChild(divTag);

		    //Add the decryption button
	          var DecryptButton = document.createElement("button");
	          DecryptButton.setAttribute('id', 'decrypt');
		    DecryptButton.addEventListener("click", decryptbutton, true);
		    DecryptButton.innerHTML='<font color="blue">Drunken Boxer Decrypt</font>';
	          divTag.appendChild(DecryptButton);

		    i = someFonts.length;
		}
	  }
   }


//
// Auxiliary functions section
//
function strToLongs(s) {  // convert string to array of longs, each containing 4 chars
    // note chars must be within ISO-8859-1 (with Unicode code-point < 256) to fit 4/long
    var l = new Array(Math.ceil(s.length/4));
    for (var i=0; i<l.length; i++) {
        // note little-endian encoding - endianness is irrelevant as long as 
        // it is the same in longsToStr() 
        l[i] = s.charCodeAt(i*4) + (s.charCodeAt(i*4+1)<<8) + 
               (s.charCodeAt(i*4+2)<<16) + (s.charCodeAt(i*4+3)<<24);
    }
    return l;  // note running off the end of the string generates nulls since 
}              // bitwise operators treat NaN as 0

function strToLongsDecrypt(s) {  // convert string to array of longs, each containing 4 chars
    // note chars must be within ISO-8859-1 (with Unicode code-point < 256) to fit 4/long
    var l = new Array(Math.ceil(s.length/4));
    for (var i=0; i<l.length; i++) {
        // note little-endian encoding - endianness is irrelevant as long as 
        // it is the same in longsToStr() 
        l[i] = (s.charCodeAt(i*4) - encryptionOffset) + ((s.charCodeAt(i*4+1) - encryptionOffset)<<8) + 
               ((s.charCodeAt(i*4+2) - encryptionOffset)<<16) + ((s.charCodeAt(i*4+3) - encryptionOffset)<<24);
    }
    return l;  // note running off the end of the string generates nulls since 
}              // bitwise operators treat NaN as 0

function longsToStr(l) {  // convert array of longs back to string
    var a = new Array(l.length);
    for (var i=0; i<l.length; i++) {
        a[i] = String.fromCharCode((l[i] & 0xFF) + encryptionOffset, (l[i]>>>8 & 0xFF) + encryptionOffset, 
                                   (l[i]>>>16 & 0xFF) + encryptionOffset, (l[i]>>>24 & 0xFF) + encryptionOffset);
    }
    return a.join('');  // use Array.join() rather than repeated string appends for efficiency
}

function longsToStrDecrypt(l) {  // convert array of longs back to string
    var a = new Array(l.length);
    for (var i=0; i<l.length; i++) {
        a[i] = String.fromCharCode((l[i] & 0xFF), (l[i]>>>8 & 0xFF), 
                                   (l[i]>>>16 & 0xFF), (l[i]>>>24 & 0xFF));
    }
    return a.join('');  // use Array.join() rather than repeated string appends for efficiency
}

function escCtrlCh(str) {  // escape control chars which might cause problems with encrypted texts
    return str.replace(/[\0\t\n\v\f\r\xa0!]/g, function(c) { return '!' + c.charCodeAt(0) + '!'; });
}                          // \xa0 to cater for bug in Firefox...

function unescCtrlCh(str) {  // unescape potentially problematic nulls and control characters
    return str.replace(/!\d\d?\d?!/g, function(c) { return String.fromCharCode(c.slice(1,-1)); });
}

// function 'f' [4.1.1]
//
function f(s, x, y, z) 
{
    switch (s) {
    case 0: return (x & y) ^ (~x & z);
    case 1: return x ^ y ^ z;
    case 2: return (x & y) ^ (x & z) ^ (y & z);
    case 3: return x ^ y ^ z;
    }
}

// rotate left (circular left shift) value x by n positions
//
function ROTL(x, n)
{
    return (x<<n) | (x>>>(32-n));
}