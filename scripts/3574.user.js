// ==UserScript==
// @name          Gmail Encrypt Text
// @author        Mark Langenhoven 
// @namespace     http://mark.langenhoven.com/
// @description	Allows the user to encrypt their email conversations
// @include       http*://*mail.google.com/*mail/*
// @date          2006/06/01
// @version       1.02 
// ==/UserScript==


// ------------------------------------------------------------------------
// Copyright (c) 2006, Mark Langenhoven
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// 2006/06/01 Inserted equalsInt from the BigInt scripts. 
//             Corrected for some gmail website changes which prevented some 
//	         people from decrypting their texts.
// 2006/04/03 Minor bugfixes in RSA decryption form
// 2006/03/19 Original version
//
// This script encrypts your email conversation using a system similar to AES 
// and the key to this is encrypted using a public key system similar to RSA.
//
// For more details see http://www.langenhoven.com/code/emailencrypt
// I don't claim to be a security guru. I am simply trying to implement
// what looked to me to be a relatively secure scheme.
//
// Some "BigInt" functionality came from the bigint.js library created
// by Leemon Baird. http://www.leemon.com/crypto/BigInt.html
//
// ------------------------------------------------------------------------

//We have to grab the text in this event listener because it does not exist
//at the time the script is normally called
document.addEventListener('click',function(event) {
	var msg;
	//Grab the text
 	if (event.target.id=='encrypt' || event.target.id=='decrypt') {
		if (document.getElementsByTagName("iframe").length>0) {
			var grabContent=document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("body")[0].cloneNode(true);
			msg=grabContent.innerHTML;
		} else {
			msg=document.getElementsByName('msgbody')[0].value;
		}

		//Encrypt or decrypt the text
		if (event.target.id=='encrypt') {
			msg = RSAencryptText(msg);
		}
		if (event.target.id=='decrypt') {
			msg = RSAdecryptText(msg);
		}

		//update the text
		if (document.getElementsByTagName("iframe").length>0) {
			document.getElementsByTagName("iframe")[0].contentDocument.getElementsByTagName("body")[0].innerHTML=msg;
		} else {
			document.getElementsByName('msgbody')[0].value=msg;
		}


	}
}, true);




// --- bigint initialisations -------------------
//globals
bpe=0;         //bits stored per array element
mask=0;        //AND this with an array element to chop it down to bpe bits
radix=mask+1;  //equals 2^bpe.  A single 1 bit to the left of the last bit of mask.

//the digits for converting to different bases
digitsStr='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\\'\"+-';


//initialize the global variables
for (bpe=0; (1<<(bpe+1)) > (1<<bpe); bpe++);  //bpe=number of bits in the mantissa on this platform
bpe>>=1;                   //bpe=number of bits in one element of the array representing the bigInt
mask=(1<<bpe)-1;           //AND the mask with an integer to get its bpe least-significant bits
radix=mask+1;              //2^bpe.  a single 1 bit to the left of the first bit of mask
one=int2bigInt(1,1,1);     //constant used in powMod_()

//the following global variables are scratchpad memory to 
//reduce dynamic memory allocation in the inner loop
t=new Array(0);
ss=t;       //used in mult_()
s0=t;       //used in multMod_(), squareMod_() 
s1=t;       //used in powMod_(), multMod_(), squareMod_() 
s2=t;       //used in powMod_(), multMod_()
s3=t;       //used in powMod_()
s4=t; s5=t; //used in mod_()
s6=t;       //used in bigInt2str()
s7=t;       //used in powMod_()
T=t;        //used in GCD_()
sa=t;       //used in mont_()
mr_x1=t; mr_r=t; mr_a=t;                                      //used in millerRabin()
eg_v=t; eg_u=t; eg_A=t; eg_B=t; eg_C=t; eg_D=t;               //used in eGCD_(), inverseMod_()
md_q1=t; md_q2=t; md_q3=t; md_r=t; md_r1=t; md_r2=t; md_tt=t; //used in mod_()

primes=t; pows=t; s_i=t; s_i2=t; s_R=t; s_rm=t; s_q=t; s_n1=t; 
  s_a=t; s_r2=t; s_n=t; s_b=t; s_d=t; s_x1=t; s_x2=t, s_aa=t; //used in randTruePrime_()

//end of bigint initialisations

//--- aes initialisations -----------------------
// S-Box substitution table
var S_enc = new Array(
 0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5,
 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0,
 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc,
 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a,
 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0,
 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b,
 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85,
 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5,
 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17,
 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88,
 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c,
 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9,
 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6,
 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e,
 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94,
 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68,
 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16);

// inverse S-Box for decryptions
var S_dec = new Array(
 0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38,
 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb,
 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87,
 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb,
 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d,
 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2,
 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25,
 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16,
 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92,
 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda,
 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a,
 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06,
 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02,
 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b,
 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea,
 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85,
 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e,
 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89,
 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b,
 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20,
 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31,
 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f,
 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d,
 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef,
 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0,
 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26,
 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d);

// convert two-dimensional indicies to one-dim array indices
var I00 = 0;
var I01 = 1;
var I02 = 2;
var I03 = 3;
var I10 = 4;
var I11 = 5;
var I12 = 6;
var I13 = 7;
var I20 = 8;
var I21 = 9;
var I22 = 10;
var I23 = 11;
var I30 = 12;
var I31 = 13;
var I32 = 14;
var I33 = 15;
//--- end of AES inits --------------------------

init();

function mypow(base, exp)
{
	//I didn't find a regular exponentiation function in bigInt
	//so I had to put together this homegrown version
	//This function is missing some error checks, etc, but
	//it works for this purpose

	//Special checks
	if (exp < 1) {
		return str2bigInt('1','10',0);
	}
	if (exp == 1){
		return base;
	}

	var orig = base;
	var origexp = exp;

	//Precalculate some values to cut down on the number of loops
	var val2 = mult(base, base);
	var val4 = mult(val2, val2);
	var val16 = mult(val4, val4);

	var myval = val2;
	var expcount = 2;
	
	while (1>0)
	{
		//prevent long processes from killing the system
		if (exp > 512) {
			alert("Exponent count " + expcount + " -> original " + origexp);
		}
		if (expcount * 2 <= origexp)
		{
			myval = mult(myval, myval);
			expcount = expcount * 2;
		} else {
			var diff = origexp - expcount;
			if (diff>=16) {
				myval = mult(myval,val16);
				expcount = expcount + 16;
				continue;
			}
			if (diff>=4) {
				myval = mult(myval,val4);
				expcount = expcount + 4;
				continue;
			}
			if (diff>=2) {
				myval = mult(myval,val2);
				expcount = expcount + 2;
				continue;
			}
			if (diff==1) {
				myval = mult(myval,orig);
				expcount = expcount + 1;
				continue;
			}
			if (diff<1) {
				return myval;
			}

		}
	}

}

function getpnum(ptext,n)
{
	//convert the plain text into a number
	var bb = '10'; //bigInt base
	var thenum = str2bigInt('0',bb,0);
	var hexbase = str2bigInt('16',bb,0);
	var cval, expval;
	//Grab "n" number of chars from the string to encrypt
	while (ptext.length < n) {
		ptext = ptext.concat('0');
	}

	for (i=0,n;i<n;i++)
	{
		expval = n - (i + 1);
		//Adjust the ASCII codes down so that 0 has
		//a value of 2
		var ccode = ptext.charCodeAt(i);
		//0 has an ASCII value of 48
		//9 = 57, A = 65, F = 70
		if (ccode >=48 && ccode <= 57) {
			ccode = ccode - 48;
		} else {
			ccode = ccode - 55;
		}

		cval = int2bigInt(ccode,0);
		var power = mypow(hexbase, expval );
		cval = mult(cval, power);
		thenum = add(thenum, cval);
	}

	return thenum;
}  //getpnum

function pad(ustr, n) {
	//Pad the ustr to make sure it is "n" chars long
	//this will catch numbers with leading zeroes
	while (ustr.length < n) {
		ustr = '0' + ustr;
	}
	return ustr;
} //pad

function makeKey()
{
	//Create a random AES key. It must be 32 Hex chars long
	var key = '';
	for (i=0,33;i<33;i++)
	{
		var randomnumber=Math.floor(Math.random()*16);
		if (randomnumber <= 9 ) {
			key = key + randomnumber;
		} else if (randomnumber == 10) {
			key = key + 'A';
		} else if (randomnumber == 11) {
			key = key + 'B';
		} else if (randomnumber == 12) {
			key = key + 'C';
		} else if (randomnumber == 13) {
			key = key + 'D';
		} else if (randomnumber == 14) {
			key = key + 'E';
		} else {
			key = key + 'F';
		}
	}
	return key;
}

function RSAencryptText(plainmsg) {
//This function is called by the button click and
//prepares all the pieces of text for the RSA encryption process

	var bb = '10'; //bigint base;


	//Generate a key for the AES encryption process
	var AESkey = makeKey();
	//GM_log("Plain AES key " + AESkey);
	//Encrypt the email
	var aes_text = aes_encrypt(AESkey, plainmsg);

	//Encrypt the key using RSA
	var plaintext = AESkey;

	//Grab the public key 
	var keyspot = document.getElementById("pubkeytext");
	var key = keyspot.value;
	var keys = key.split(":");

	var keymax = keys.length;
	keymax = keymax - 1;
	var keyE = keys[keymax];
	keymax = keymax - 1;
	var keyN = keys[keymax];


	//make the keys "big"
	var bigkeyN = int2bigInt(keyN,20);
	var bigkeyE = int2bigInt(keyE,20);

	//Encrypt the text
	var etext = '';
	while (plaintext.length > 0) 
	{
		var plainnum = getpnum(plaintext,5);

	
		//Check to see if this number is too large to encrypt
		if (greater(plainnum, bigkeyN)) {
			alert("This text cannot be encrypted using keys this small");
			return;
		}	

		var ciphernum = str2bigInt('0',bb,0);
		ciphernum = powMod(plainnum, bigkeyE, bigkeyN);

		if (etext == '') {
			etext = bigInt2str(ciphernum,bb);
		} else {
			etext = etext.concat(';', bigInt2str(ciphernum,bb));
		}
		
		//Cut off the first 5 chars of the string
		plaintext = plaintext.slice(5);
	}

	//GM_log("RSA key " + etext);

	//Combine the RSA encrypted key with the AES encryption
	etext = etext + ':' + aes_text;

	//Mark the text as encrypted so that we know were to start and end with the
	//decryption process
	etext = "--- Start of mailencrypt --- " + etext + " --- End of mailencrypt ---";

	//Return the encrypted text 
	//GM_log("Fully encrypted email " + etext);
	return etext;
} //RSAencryptext

function RSAdecryptText(encryptmsg) {
	//This is called by the decrypt button and gets all the pieces
	//of the process together to call the RSA decryption process

	var bb = '10'; //bigint base;

	//Find the place where the text is stored
	var plaintext = encryptmsg;
	//GM_log("Decrypting " + plaintext);

	//Grab the private key 
	var keyspot = document.getElementById("privkeytext");
	var key = keyspot.value;
	//Split this key into the various components
	var keys = key.split(":");
	var keymax = keys.length;

	//The last value is the D component
	keymax = keymax - 1;
	var keyD = keys[keymax];
	//Second last part is the N component
	keymax = keymax - 1;
	var keyN = keys[keymax];

	//Make the keys big
	var bigkeyN = str2bigInt(keyN,bb,0);
	var bigkeyD = str2bigInt(keyD,bb,0);

	// Strip out all the "> " indendation characters from the message
	var beforepos = 1;
	while ( beforepos > 0 ) {
		beforepos = plaintext.indexOf(">");
		if ( beforepos > 0 ) {
			var afterpos = beforepos + 1;
			plaintext = plaintext.slice(0,beforepos) + plaintext.slice(afterpos);
		} 
	}


	//find the encrypted part of the email
	var beforepos = plaintext.indexOf("--- Start of mailencrypt ---");
	var afterpos = plaintext.indexOf(" --- End of mailencrypt ---");
	if ( beforepos > 0 ) {
		var beforetext = plaintext.slice(0,beforepos);
	} else {
		var beforetext = "";
	}
	if ( afterpos >0 ) {
		var aftertext = plaintext.slice(afterpos + 27);
	} else {
		var aftertext = "";
	}
	plaintext = plaintext.slice(beforepos + 29, afterpos);
	//GM_log("plaintext " + plaintext);

	//split the encrypted email into the key and the AES encrypted portion
	var etexts = plaintext.split(":");

	//the first text is the key which we need to decrypt using RSA
	var ptexts = etexts[0].split(";");

	var i = 0;
	var dtext = '';
	var tmptext = '';
	while ( i < ptexts.length )
	{
		//Turn the ciphertext number into a plaintext number
		var ciphernum = str2bigInt(ptexts[i],bb,0); 
		if (greater(ciphernum, bigkeyN)) {
			alert("This text cannot be decrypted using keys this small");
			return;
		}	


		var plainnum = powMod(ciphernum, bigkeyD, bigkeyN); 
		tmptext = bigInt2str(plainnum,'16'); //use base 16 to convert to hex
		tmptext = pad(tmptext,5);
		if (dtext == '') {
			dtext = tmptext;
		} else {
			dtext = dtext.concat(tmptext);
		}

		i = i + 1;
	}

	//chop off the padding at the end of the string
	dtext = dtext.slice(0,dtext.length-3);

	//Now decrypt the email body using AES
	//GM_log("text to decrypt " + etexts[1]);
	var finaltxt = aes_decrypt(dtext, etexts[1]);

	//Place the other parts of the text back around it again
	finaltxt = beforetext + finaltxt + aftertext;
	return finaltxt;
	//GM_log("Decrypted email " + finaltxt);
} //RSAdecrypttext

function putButtons() {
	//Place the buttons on the screen

	//Find the Send button
	var sendrow;
	if (document.getElementsByTagName("frame").length>0) {
		var framea = document.getElementsByTagName("frame")[0];
		if (framea.contentDocument.getElementsByTagName("iframe").length>0) {
			var iframea = framea.contentDocument.getElementsByTagName("iframe")[0];
			sendrow =iframea.contentDocument.getElementById("st_compose");
			if (!sendrow) {
				//for replies + forwards the send button is placed differently
				var elemname;
				for (var k=0; k<=9; k++) {
					elemname = "st_" + k;
					if (iframea.contentDocument.getElementById(elemname)) {
						sendrow = iframea.contentDocument.getElementById(elemname);
						k = 999;
					}
				}
			}
		}
	} else {
	      sendrow = document.getElementById("st_compose");
		if (!sendrow) {
			var elemname;
			for (var k=0; k<=9; k++) {
				elemname = "st_" + k;
				if (document.getElementById(elemname)) {
					sendrow = document.getElementById(elemname);
					k = 999;
				}
			}
		}
	}
	
	if (!sendrow) {
		window.setTimeout(putButtons, 1000);
		return;
	}

	//Make sure we have not already added the buttons to this tag
	for (var k=0;k<sendrow.childNodes.length; k++) {
		knode = sendrow.childNodes[k];
		if (knode.id == "encryptdiv") {
			window.setTimeout(putButtons, 1000);
			return;
		}
	}	

	//Create a DIV element to visually separate our buttons
	//from the rest of the screen
	var divTag = document.createElement("div");
	divTag.setAttribute('id', 'encryptdiv');
//	divTag.setAttribute('style', 'background-color:wheat');
	divTag.setAttribute('style', '-moz-border-radius: 10px; background: wheat; margin: 10px 7px 0 0; padding: 3px;');
	divTag.setAttribute('align', 'left');
	sendrow.appendChild(divTag);

	var spacetxt = document.createTextNode("  ");
	divTag.appendChild(spacetxt);

	//Add the encryption button
      var EncryptButton = document.createElement("button");
      EncryptButton.setAttribute('id', 'encrypt');
//Click events are handled by the event listener created earlier
//		EncryptButton.addEventListener("click", RSAencryptText, true);
	EncryptButton.innerHTML='<font color="blue">Encrypt</font>';
      divTag.appendChild(EncryptButton);

	//Add the public key
	var pubkeylabel = document.createTextNode(" Public Key: ");
	divTag.appendChild(pubkeylabel);
	var pubkeytext = document.createElement("input");
	pubkeytext.setAttribute('id', 'pubkeytext');
	divTag.appendChild(pubkeytext);

	divTag.appendChild(spacetxt);

	//Add the decryption button
      var DecryptButton = document.createElement("button");
      DecryptButton.setAttribute('id', 'decrypt');
//		DecryptButton.addEventListener("click", RSAdecryptText, true);
	DecryptButton.innerHTML='<font color="blue">Decrypt</font>';
      divTag.appendChild(DecryptButton);

	//Add the private key
	var privkeylabel = document.createTextNode(" Private Key: ");
	divTag.appendChild(privkeylabel);
	var privkeytext = document.createElement("input");
	privkeytext.setAttribute('id', 'privkeytext');
	privkeytext.setAttribute('type', 'password');
	divTag.appendChild(privkeytext);

	//go back and recreate the buttons after any form inputs
	window.setTimeout(putButtons, 5000);
} //putButtons

function init() {
	//GM_log("running the encryption script");
	putButtons();
}//init

//Exit before you execute the other routines
return;

//--- BigInt routines culled from bigint.js -------------------------
//Many functions and comments were stripped from the original file to cut down
//on load size. Please see the file bigint.js in the same location where you 
//originally found this script for full attribution

//return a copy of x with at least n elements, adding leading zeros if needed
function expand(x,n) {
  var ans=int2bigInt(0,(x.length>n ? x.length : n)*bpe,0);
  copy_(ans,x);
  return ans;
}

//return x*y for bigInts x and y. This is faster when y<x.
function mult(x,y) {
  var ans=expand(x,x.length+y.length);
  mult_(ans,y);
  return trim(ans,1);
}

//return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
function powMod(x,y,n) {
  var ans=expand(x,n.length);  
  powMod_(ans,trim(y,2),trim(n,2),0);  //this should work without the trim, but doesn't
  return trim(ans,1);
}

//return (x+y) for bigInts x and y.  
function add(x,y) {
  var ans=expand(x,(x.length>y.length ? x.length+1 : y.length+1)); 
  add_(ans,y);
  return trim(ans,1);
}

//return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
function inverseModInt_(x,n) {
  var a=1,b=0,t;
  for (;;) {
    if (x==1) return a;
    if (x==0) return 0;
    b-=a*Math.floor(n/x);
    n%=x;

    if (n==1) return b; //to avoid negatives, change this b to n-b, and each -= to +=
    if (n==0) return 0;
    a-=b*Math.floor(x/n);
    x%=n;
  }
}

//is bigInt x negative?
function negative(x) {
  return ((x[x.length-1]>>(bpe-1))&1);
}

//is (x << (shift*bpe)) > y?
function greaterShift(x,y,shift) {
  var kx=x.length, ky=y.length;
  k=((kx+shift)<ky) ? (kx+shift) : ky;
  for (i=ky-1-shift; i<kx && i>=0; i++) 
    if (x[i]>0)
      return 1; //if there are nonzeros in x to the left of the first column of y, then x is bigger
  for (i=kx-1+shift; i<ky; i++)
    if (y[i]>0)
      return 0; //if there are nonzeros in y to the left of the first column of x, then x is not bigger
  for (i=k-1; i>=shift; i--)
    if      (x[i-shift]>y[i]) return 1;
    else if (x[i-shift]<y[i]) return 0;
  return 0;
}

//is x > y? (x and y both nonnegative)
function greater(x,y) {
  var i;
  var k=(x.length<y.length) ? x.length : y.length;

  for (i=x.length;i<y.length;i++)
    if (y[i])
      return 0;  //y has more digits

  for (i=y.length;i<x.length;i++)
    if (x[i])
      return 1;  //x has more digits

  for (i=k-1;i>=0;i--)
    if (x[i]>y[i])
      return 1;
    else if (x[i]<y[i])
      return 0;
  return 0;
}

function divide_(x,y,q,r) {
  var kx, ky;
  var i,j,y1,y2,c,a,b;
  copy_(r,x);
  for (ky=y.length;y[ky-1]==0;ky--); //kx,ky is number of elements in x,y, not including leading zeros
  for (kx=r.length;r[kx-1]==0 && kx>ky;kx--);

  //normalize: ensure the most significant element of y has its highest bit set  
  b=y[ky-1];
  for (a=0; b; a++)
    b>>=1;  
  a=bpe-a;  //a is how many bits to shift so that the high order bit of y is leftmost in its array element
  leftShift_(y,a);  //multiply both by 1<<a now, then divide_ both by that at the end
  leftShift_(r,a);

  copyInt_(q,0);                // q=0
  while (!greaterShift(y,r,kx-ky)) {  // while (leftShift_(y,kx-ky) <= r) {
    subShift_(r,y,kx-ky);      //   r=r-leftShift_(y,kx-ky)
    q[kx-ky]++;                  //   q[kx-ky]++;
  }                              // }

  for (i=kx-1; i>=ky; i--) {
    if (r[i]==y[ky-1])
      q[i-ky]=mask;
    else
      q[i-ky]=Math.floor((r[i]*radix+r[i-1])/y[ky-1]);	

    for (;;) {
      y2=(ky>1 ? y[ky-2] : 0)*q[i-ky];
      c=y2>>bpe;
      y2=y2 & mask;
      y1=c+q[i-ky]*y[ky-1];

      c=y1>>bpe;
      y1=y1 & mask;

      if (c==r[i] ? y1==r[i-1] ? y2>(i>1 ? r[i-2] : 0) : y1>r[i-1] : c>r[i]) 
        q[i-ky]--;
      else
        break;
    }

    linCombShift_(r,y,-q[i-ky],i-ky);    //r=r-q[i-ky]*leftShift_(y,i-ky)
    if (negative(r)) {
      addShift_(r,y,i-ky);         //r=r+leftShift_(y,i-ky)
      q[i-ky]--;
    }
  }

  rightShift_(y,a);  //undo the normalization step
  rightShift_(r,a);  //undo the normalization step
}

//return x mod n for bigInt x and integer n.
function modInt(x,n) {
  var i,c=0;
  for (i=x.length-1; i>=0; i--)
    c=(c*radix+x[i])%n;
  return c;
}

function int2bigInt(t,bits,minSize) {   
  var i,k;
  k=Math.ceil(bits/bpe)+1;
  k=minSize>k ? minSize : k;
  buff=new Array(k);
  copyInt_(buff,t);
  return buff;
}

function str2bigInt(s,base,minSize) {
  var d, i, j, x, y, kk;
  var k=s.length;
  if (base==-1) { //comma-separated list of array elements in decimal
    x=new Array(0);
    for (;;) {
      y=new Array(x.length+1);
      for (i=0;i<x.length;i++)
        y[i+1]=x[i];
      y[0]=parseInt(s,10);
      x=y;
      d=s.indexOf(',',0);
      if (d<1) 
        break;
      s=s.substring(d+1);
      if (s.length==0)
        break;
    }
    if (x.length<minSize) {
      y=new Array(minSize);
      copy_(y,x);
      return y;
    }
    return x;
  }

  x=int2bigInt(0,base*k,0);
  for (i=0;i<k;i++) {
    d=digitsStr.indexOf(s.substring(i,i+1),0);
    if (base<=36 && d>=36)  //convert lowercase to uppercase if base<=36
      d-=26;
    if (d<base && d>=0) {   //ignore illegal characters
      multInt_(x,base);
      addInt_(x,d);
    }
  }

  for (k=x.length;k>0 && !x[k-1];k--); //strip off leading zeros
  k=minSize>k+1 ? minSize : k+1;
  y=new Array(k);
  kk=k<x.length ? k : x.length;
  for (i=0;i<kk;i++)
    y[i]=x[i];
  for (;i<k;i++)
    y[i]=0;
  return y;
}

//is the bigInt x equal to zero?
function isZero(x) {
  var i;
  for (i=0;i<x.length;i++)
    if (x[i])
      return 0;
  return 1;
}

//convert a bigInt into a string in a given base, from base 2 up to base 95.
//Base -1 prints the contents of the array representing the number.
function bigInt2str(x,base) {
  var i,t,s="";

  if (s6.length!=x.length) 
    s6=dup(x);
  else
    copy_(s6,x);

  if (base==-1) { //return the list of array contents
    for (i=x.length-1;i>0;i--)
      s+=x[i]+',';
    s+=x[0];
  }
  else { //return it in the given base
    while (!isZero(s6)) {
      t=divInt_(s6,base);  //t=s6 % base; s6=floor(s6/base);
      s=digitsStr.substring(t,t+1)+s;
    }
  }
  if (s.length==0)
    s="0";
  return s;
}

//returns a duplicate of bigInt x
function dup(x) {
  var i;
  buff=new Array(x.length);
  copy_(buff,x);
  return buff;
}

//do x=y on bigInts x and y.  
function copy_(x,y) {
  var i;
  var k=x.length<y.length ? x.length : y.length;
  for (i=0;i<k;i++)
    x[i]=y[i];
  for (i=k;i<x.length;i++)
    x[i]=0;
}

//do x=y on bigInt x and integer y.  
function copyInt_(x,n) {
  var i,c;
  for (c=n,i=0;i<x.length;i++) {
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x+n where x is a bigInt and n is an integer.
//x must be large enough to hold the result.
function addInt_(x,n) {
  var i,k,c,b;
  x[0]+=n;
  k=x.length;
  c=0;
  for (i=0;i<k;i++) {
    c+=x[i];
    b=0;
    if (c<0) {
      b=-(c>>bpe);
      c+=b*radix;
    }
    x[i]=c & mask;
    c=(c>>bpe)-b;
    if (!c) return; //stop carrying as soon as the carry_ is zero
  }
}

//right shift bigInt x by n bits.  0 <= n < bpe.
function rightShift_(x,n) {
  var i;
  var k=Math.floor(n/bpe);
  if (k) {
    for (i=0;i<x.length-k;i++) //right shift x by k elements
      x[i]=x[i+k];
    for (;i<x.length;i++)
      x[i]=0;
    n%=bpe;
  }
  for (i=0;i<x.length-1;i++) {
    x[i]=mask & ((x[i+1]<<(bpe-n)) | (x[i]>>n));
  }
  x[i]>>=n;
}

//left shift bigInt x by n bits.
function leftShift_(x,n) {
  var i;
  var k=Math.floor(n/bpe);
  if (k) {
    for (i=x.length; i>=k; i--) //left shift x by k elements
      x[i]=x[i-k];
    for (;i>=0;i--)
      x[i]=0;  
    n%=bpe;
  }
  if (!n)
    return;
  for (i=x.length-1;i>0;i--) {
    x[i]=mask & ((x[i]<<n) | (x[i-1]>>(bpe-n)));
  }
  x[i]=mask & (x[i]<<n);
}

//do x=x*n where x is a bigInt and n is an integer.
//x must be large enough to hold the result.
function multInt_(x,n) {
  var i,k,c,b;
  if (!n)
    return;
  k=x.length;
  c=0;
  for (i=0;i<k;i++) {
    c+=x[i]*n;
    b=0;
    if (c<0) {
      b=-(c>>bpe);
      c+=b*radix;
    }
    x[i]=c & mask;
    c=(c>>bpe)-b;
  }
}

//do x=floor(x/n) for bigInt x and integer n, and return the remainder
function divInt_(x,n) {
  var i,r=0,s;
  for (i=x.length-1;i>=0;i--) {
    s=r*radix+x[i];
    x[i]=Math.floor(s/n);
    r=s%n;
  }
  return r;
}

//do the linear combination x=a*x+b*(y<<(ys*bpe)) for bigInts x and y, and integers a, b and ys.
//x must be large enough to hold the answer.
function linCombShift_(x,y,b,ys) {
  var i,c,k,kk;
  k=x.length<ys+y.length ? x.length : ys+y.length;
  kk=x.length;
  for (c=0,i=ys;i<k;i++) {
    c+=x[i]+b*y[i-ys];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<kk;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x-(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
//x must be large enough to hold the answer.
function subShift_(x,y,ys) {
  var i,c,k,kk;
  k=x.length<ys+y.length ? x.length : ys+y.length;
  kk=x.length;
  for (c=0,i=ys;i<k;i++) {
    c+=x[i]-y[i-ys];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<kk;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x+y for bigInts x and y.
//x must be large enough to hold the answer.
function add_(x,y) {
  var i,c,k,kk;
  k=x.length<y.length ? x.length : y.length;
  for (c=0,i=0;i<k;i++) {
    c+=x[i]+y[i];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<x.length;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x*y for bigInts x and y.  This is faster when y<x.
function mult_(x,y) {
  var i;
  if (ss.length!=2*x.length)
    ss=new Array(2*x.length);
  copyInt_(ss,0);
  for (i=0;i<y.length;i++)
    if (y[i])
      linCombShift_(ss,x,y[i],i);   //ss=1*ss+y[i]*(x<<(i*bpe))
  copy_(x,ss);
}

//do x=x mod n for bigInts x and n.
function mod_(x,n) {
  if (s4.length!=x.length)
    s4=dup(x);
  else
    copy_(s4,x);
  if (s5.length!=x.length)
    s5=dup(x);  
  divide_(s4,n,s5,x);  //x = remainder of s4 / n
}

//do x=x*y mod n for bigInts x,y,n.
//for greater speed, let y<x.
function multMod_(x,y,n) {
  var i;
  if (s0.length!=2*x.length)
    s0=new Array(2*x.length);
  copyInt_(s0,0);
  for (i=0;i<y.length;i++)
    if (y[i])
      linCombShift_(s0,x,y[i],i);   //s0=1*s0+y[i]*(x<<(i*bpe))
  mod_(s0,n);
  copy_(x,s0);
}

//return x with exactly k leading zero elements
function trim(x,k) {
  var i,y;
  for (i=x.length; i>0 && !x[i-1]; i--);
  y=new Array(i+k);
  copy_(y,x);
  return y;
}

//is bigint x equal to integer y?
//y must have less than bpe bits
function equalsInt(x,y) {
  var i;
  if (x[0]!=y)
    return 0;
  for (i=1;i<x.length;i++)
    if (x[i])
      return 0;
  return 1;
}


//do x=x**y mod n, where x,y,n are bigInts and ** is exponentiation.  0**0=1.
//this is faster when n is odd.  x usually needs to have as many elements as n.
function powMod_(x,y,n) {
  var k1,k2,kn,np;
  if(s7.length!=n.length)
    s7=dup(n);

  //for even modulus, use a simple square-and-multiply algorithm,
  //rather than using the more complex Montgomery algorithm.
  if ((n[0]&1)==0) {
    copy_(s7,x);
    copyInt_(x,1);
    while(!equalsInt(y,0)) {
      if (y[0]&1)
        multMod_(x,s7,n);
      divInt_(y,2);
      squareMod_(s7,n); 
    }
    return;
  }

  //calculate np from n for the Montgomery multiplications
  copyInt_(s7,0);
  for (kn=n.length;kn>0 && !n[kn-1];kn--);
  np=radix-inverseModInt_(modInt(n,radix),radix);
  s7[kn]=1;
  multMod_(x ,s7,n);   // x = x * 2**(kn*bp) mod n

  if (s3.length!=x.length)
    s3=dup(x);
  else
    copy_(s3,x);

  for (k1=y.length-1;k1>0 & !y[k1]; k1--);  //k1=first nonzero element of y
  if (y[k1]==0) {  //anything to the 0th power is 1
    copyInt_(x,1);
    return;
  }
  for (k2=1<<(bpe-1);k2 && !(y[k1] & k2); k2>>=1);  //k2=position of first 1 bit in y[k1]
  for (;;) {
    if (!(k2>>=1)) {  //look at next bit of y
      k1--;
      if (k1<0) {
        mont_(x,one,n,np);
        return;
      }
      k2=1<<(bpe-1);
    }    
    mont_(x,x,n,np);

    if (k2 & y[k1]) //if next bit is a 1
      mont_(x,s3,n,np);
  }
} 

function sub_(x,y) {
  var i,c,k,kk;
  k=x.length<y.length ? x.length : y.length;
  for (c=0,i=0;i<k;i++) {
    c+=x[i]-y[i];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<x.length;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

function mont_(x,y,n,np) {
  var i,j,c,ui,t;
  var kn=n.length;
  var ky=y.length;

  if (sa.length!=kn)
    sa=new Array(kn);

  for (;kn>0 && n[kn-1]==0;kn--); //ignore leading zeros of n
  //this function sometimes gives wrong answers when the next line is uncommented
  //for (;ky>0 && y[ky-1]==0;ky--); //ignore leading zeros of y

  copyInt_(sa,0);

  //the following loop consumes 95% of the runtime for randTruePrime_() and powMod_() for large keys
  for (i=0; i<kn; i++) {
    t=sa[0]+x[i]*y[0];
    ui=((t & mask) * np) & mask;  //the inner "& mask" is needed on Macintosh MSIE, but not windows MSIE
    c=(t+ui*n[0]) >> bpe;
    t=x[i];

    //do sa=(sa+x[i]*y+ui*n)/b   where b=2**bpe
    for (j=1;j<ky;j++) { 
      c+=sa[j]+t*y[j]+ui*n[j];
      sa[j-1]=c & mask;
      c>>=bpe;
    }    
    for (;j<kn;j++) { 
      c+=sa[j]+ui*n[j];
      sa[j-1]=c & mask;
      c>>=bpe;
    }    
    sa[j-1]=c & mask;
  }

  if (!greater(n,sa))
    sub_(sa,n);
  copy_(x,sa);
}

//--- end of BigInt -------------------------------------------------


//--- AES routines --------------------------------------------------
// convert a 8-bit value to a string

function cvt_hex8( val )
{
   var vh = (val>>>4)&0x0f;
   return vh.toString(16) + (val&0x0f).toString(16);
}

// convert a 32-bit value to a 8-char hex string
function cvt_hex32( val )
{
   var str="";
   var i;
   var v;

   for( i=7; i>=0; i-- )
   {
      v = (val>>>(i*4))&0x0f;
      str += v.toString(16);
   }
   return str;
}

// convert a two-digit hex value to a number
function cvt_byte( str )
{
  // get the first hex digit
  var val1 = str.charCodeAt(0);

  // do some error checking
  if ( val1 >= 48 && val1 <= 57 )
      // have a valid digit 0-9
      val1 -= 48;
   else if ( val1 >= 65 && val1 <= 70 )
      // have a valid digit A-F
      val1 -= 55;
   else if ( val1 >= 97 && val1 <= 102 )
      // have a valid digit A-F
      val1 -= 87;
   else
   {
      // not 0-9 or A-F, complain
      window.alert( str.charAt(1)+" is not a valid hex digit" );
      return -1;
   }

  // get the second hex digit
  var val2 = str.charCodeAt(1);

  // do some error checking
  if ( val2 >= 48 && val2 <= 57 )
      // have a valid digit 0-9
      val2 -= 48;
   else if ( val2 >= 65 && val2 <= 70 )
      // have a valid digit A-F
      val2 -= 55;
   else if ( val2 >= 97 && val2 <= 102 )
      // have a valid digit A-F
      val2 -= 87;
   else
   {
      // not 0-9 or A-F, complain
      window.alert( str.charAt(2)+" is not a valid hex digit" );
      return -1;
   }

   // all is ok, return the value
   return val1*16 + val2;
}

// add a byte to the output
function accumulate_byte( label, val )
{
   accumulated_output_info += label + cvt_hex8(val) + "\n";
}

// add a word to the output
function accumulate_wordarray( label, ary )
{
   var i, j;
   accumulated_output_info += label + " ";

   // process the four elements in this word
   for( j=0; j<4; j++ )
      accumulated_output_info += " " + cvt_hex8( ary[j] );

   // mark the end of the word
   accumulated_output_info += "\n";
}

// add an array to the output
function accumulate_array( label, ary )
{
   var i, j;
   var spacer="";

   // build a set of spaces of equal length to the label
   while( spacer.length < label.length )
      spacer += " ";

   // build the table
   for( i=0; i<16; i+= 4 )
   {
      // add label/spaces
      if ( i== 0 )
         accumulated_output_info += label + " ";
      else
         accumulated_output_info += spacer + " ";

      // process the four elements in this "row"
      for( j=0; j<4; j++ )
         accumulated_output_info += " " + cvt_hex8( ary[i+j] );

      // mark the end of this row
      accumulated_output_info += "\n";
   }
}

// conversion function for non-constant subscripts
// assume subscript range 0..3
function I(x,y)
{ return (x*4) + y; }

// remove spaces from input
function remove_spaces( instr )
{
   var i;
   var outstr="";

   for( i=0; i<instr.length; i++ )
   {
      if ( instr.charAt(i) != " " )
      {
	   if (instr.charCodeAt(i) < 9 || instr.charCodeAt(i) > 13  )

         // not a space, include it
         outstr += instr.charAt(i);
      }
   }

   return outstr;
}

// get the message to encrypt/decrypt or the key
// return as a 16-byte array
function ascTo16(str) 
{
	var dbyte = new Array(16);
	var i;
      for( i=0; i<16; i++ )
      {
         dbyte[i] = str.charCodeAt(i);
      }

	return dbyte;
}

function hexTo16(str)
{
	var dbyte = new Array(16);
	var i;
      str = remove_spaces(str);

      for( i=0; i<16; i++ )
      {
         // isolate and convert this substring
         dbyte[i] = cvt_byte( str.substr(i*2,2) );
         if( dbyte[i] < 0 )
         {
            // have an error
            dbyte[0] = -1;
            return dbyte;
         }
      } // for i

	return dbyte;
}
function get_value( lbl, str, isASCII )
{
   var dbyte = new Array(16);
   var i;
   var val;	// one hex digit

   if ( isASCII )
   {
// ??? pad with spaces/nulls if < 16 chars ???
      // check length of data
      if ( str.length != 16 )
      {
         window.alert( lbl + " length wrong: Is " + str.length +
		"characters, but must be 128 bits (16 ASCII characters)");
         dbyte[0] = -1;
         return dbyte;
      }

      // have ASCII data
      for( i=0; i<16; i++ )
      {
         dbyte[i] = str.charCodeAt(i);
      }
   }
   else
   {
      // have hex data - remove any spaces they used, then convert
      str = remove_spaces(str);

      // check length of data
      if ( str.length != 32 )
      {
         window.alert( lbl + " length wrong: Is " + str.length +
		" hex digits, but must be 128 bits (32 hex digits)");
         dbyte[0] = -1;
         return dbyte;
      }

      for( i=0; i<16; i++ )
      {
         // isolate and convert this substring
         dbyte[i] = cvt_byte( str.substr(i*2,2) );
         if( dbyte[i] < 0 )
         {
            // have an error
            dbyte[0] = -1;
            return dbyte;
         }
      } // for i
   } // if isASCII

   // return successful conversion
   return dbyte;
} // get_value

//do the AES GF(2**8) multiplication
// do this by the shift-and-"add" approach
function aes_mul( a, b )
{
   var res = 0;

   while( a > 0 )
   {
      if ( a&1 )
         res = res ^ b;		// "add" to the result
      a >>>= 1;			// shift a to get next higher-order bit
      b <<= 1;			// shift multiplier also
   }

   // now reduce it modulo x**8 + x**4 + x**3 + x + 1
   var hbit = 0x10000;		// bit to test if we need to take action
   var modulus = 0x11b00;	// modulus - XOR by this to change value
   while( hbit >= 0x100 )
   {
      if ( res & hbit )		// if the high-order bit is set
         res ^= modulus;	// XOR with the modulus

      // prepare for the next loop
      hbit >>= 1;
      modulus >>= 1;
   }

   return res;
}

// apply the S-box substitution to the key expansion
function SubWord( word_ary )
{
   var i;

   for( i=0; i<16; i++ )
      word_ary[i] = S_enc[ word_ary[i] ];

   return word_ary;
}

// rotate the bytes in a word
function RotWord( word_ary )
{
   return new Array( word_ary[1], word_ary[2], word_ary[3], word_ary[0] );
}

// calculate the first item Rcon[i] = { x^(i-1), 0, 0, 0 }
// note we only return the first item
function Rcon( exp )
{
   var val = 2;
   var result = 1;

   // remember to calculate x^(exp-1)
   exp--;

   // process the exponent using normal shift and multiply
   while ( exp > 0 )
   {
      if ( exp & 1 )
         result = aes_mul( result, val );

      // square the value
      val = aes_mul( val, val );

      // move to the next bit
      exp >>= 1;
   }

   return result;
}

// round key generation
// return a byte array with the expanded key information
function key_expand( key )
{
   var temp = new Array(4);
   var i, j;
   var w = new Array( 4*11 );

   // copy initial key stuff
   for( i=0; i<16; i++ )
   {
      w[i] = key[i];
   }
   accumulate_wordarray( "w[0] = ", w.slice(0,4) );
   accumulate_wordarray( "w[1] = ", w.slice(4,8) );
   accumulate_wordarray( "w[2] = ", w.slice(8,12) );
   accumulate_wordarray( "w[3] = ", w.slice(12,16) );

   // generate rest of key schedule using 32-bit words
   i = 4;
   while ( i < 44 )		// blocksize * ( rounds + 1 )
   {
      // copy word W[i-1] to temp
      for( j=0; j<4; j++ )
         temp[j] = w[(i-1)*4+j];

      if ( i % 4 == 0)
      {
         // temp = SubWord(RotWord(temp)) ^ Rcon[i/4];
         temp = RotWord( temp );
         accumulate_wordarray( "RotWord()=", temp );
         temp = SubWord( temp );
         accumulate_wordarray( "SubWord()=", temp );
         temp[0] ^= Rcon( i>>>2 );
         accumulate_wordarray( " ^ Rcon()=", temp );
      }

      // word = word ^ temp
      for( j=0; j<4; j++ )
         w[i*4+j] = w[(i-4)*4+j] ^ temp[j];
      accumulate_wordarray( "w["+i+"] = ", w.slice( i*4, i*4+4 ) );

      i++;
   }

   return w;
}

// do S-Box substitution
function SubBytes(state, Sbox)
{
   var i;

   for( i=0; i<16; i++ )
      state[i] = Sbox[ state[i] ];

   return state;
}

// shift each row as appropriate
function ShiftRows(state)
{
   var t0, t1, t2, t3;

   // top row (row 0) isn't shifted

   // next row (row 1) rotated left 1 place
   t0 = state[I10];
   t1 = state[I11];
   t2 = state[I12];
   t3 = state[I13];
   state[I10] = t1;
   state[I11] = t2;
   state[I12] = t3;
   state[I13] = t0;

   // next row (row 2) rotated left 2 places
   t0 = state[I20];
   t1 = state[I21];
   t2 = state[I22];
   t3 = state[I23];
   state[I20] = t2;
   state[I21] = t3;
   state[I22] = t0;
   state[I23] = t1;

   // bottom row (row 3) rotated left 3 places
   t0 = state[I30];
   t1 = state[I31];
   t2 = state[I32];
   t3 = state[I33];
   state[I30] = t3;
   state[I31] = t0;
   state[I32] = t1;
   state[I33] = t2;

   return state;
}

// inverset shift each row as appropriate
function InvShiftRows(state)
{
   var t0, t1, t2, t3;

   // top row (row 0) isn't shifted

   // next row (row 1) rotated left 1 place
   t0 = state[I10];
   t1 = state[I11];
   t2 = state[I12];
   t3 = state[I13];
   state[I10] = t3;
   state[I11] = t0;
   state[I12] = t1;
   state[I13] = t2;

   // next row (row 2) rotated left 2 places
   t0 = state[I20];
   t1 = state[I21];
   t2 = state[I22];
   t3 = state[I23];
   state[I20] = t2;
   state[I21] = t3;
   state[I22] = t0;
   state[I23] = t1;

   // bottom row (row 3) rotated left 3 places
   t0 = state[I30];
   t1 = state[I31];
   t2 = state[I32];
   t3 = state[I33];
   state[I30] = t1;
   state[I31] = t2;
   state[I32] = t3;
   state[I33] = t0;

   return state;
}

// process column info
function MixColumns(state)
{
   var col;
   var c0, c1, c2, c3;

   for( col=0; col<4; col++ )
   {
      c0 = state[I(0,col)];
      c1 = state[I(1,col)];
      c2 = state[I(2,col)];
      c3 = state[I(3,col)];

      // do mixing, and put back into array
      state[I(0,col)] = aes_mul(2,c0) ^ aes_mul(3,c1) ^ c2 ^ c3;
      state[I(1,col)] = c0 ^ aes_mul(2,c1) ^ aes_mul(3,c2) ^ c3;
      state[I(2,col)] = c0 ^ c1 ^ aes_mul(2,c2) ^ aes_mul(3,c3);
      state[I(3,col)] = aes_mul(3,c0) ^ c1 ^ c2 ^ aes_mul(2,c3);
   }

   return state;
}

// inverse process column info
function InvMixColumns(state)
{
   var col;
   var c0, c1, c2, c3;

   for( col=0; col<4; col++ )
   {
      c0 = state[I(0,col)];
      c1 = state[I(1,col)];
      c2 = state[I(2,col)];
      c3 = state[I(3,col)];

      // do inverse mixing, and put back into array
      state[I(0,col)] = aes_mul(0x0e,c0) ^ aes_mul(0x0b,c1)
			^ aes_mul(0x0d,c2) ^ aes_mul(0x09,c3);
      state[I(1,col)] = aes_mul(0x09,c0) ^ aes_mul(0x0e,c1)
			^ aes_mul(0x0b,c2) ^ aes_mul(0x0d,c3);
      state[I(2,col)] = aes_mul(0x0d,c0) ^ aes_mul(0x09,c1)
			^ aes_mul(0x0e,c2) ^ aes_mul(0x0b,c3);
      state[I(3,col)] = aes_mul(0x0b,c0) ^ aes_mul(0x0d,c1)
			^ aes_mul(0x09,c2) ^ aes_mul(0x0e,c3);
   }

   return state;
}

// insert subkey information
function AddRoundKey( state, w, base )
{
   var col;

   for( col=0; col<4; col++ )
   {
      state[I(0,col)] ^= w[base+col*4];
      state[I(1,col)] ^= w[base+col*4+1];
      state[I(2,col)] ^= w[base+col*4+2];
      state[I(3,col)] ^= w[base+col*4+3];
   }

   return state;
}

// return a transposed array
function transpose( msg )
{
   var row, col;
   var state = new Array( 16 );

   for( row=0; row<4; row++ )
      for( col=0; col<4; col++ )
         state[I(row,col)] = msg[I(col,row)];

   return state;
}

// final AES state
var AES_output = new Array(16);

// format AES output
function format_AES_output(what, how)
{
   var i;
   var bits;
   var str="";

   // what type of data do we have to work with?
   if ( how == "asc")
   {
      // convert each set of bits back to ASCII
      for( i=0; i<16; i++ )
         str += String.fromCharCode( what[i] );
   }
   else 
   {
      // output hexdecimal data
      str = cvt_hex8( AES_output[0] );
      for( i=1; i<16; i++ )
      {
		str += " " + cvt_hex8( what[i] );
      }
   }
   return str;
}


// do AES encrytion
function aes_encrypt(key, plainmsg)
{
   var w = new Array( 44 );			// subkey information
   var state = new Array( 16 );			// working state
   var round;
   var finalstr = "";
   var msg = "";

	//Grab the text to encrypt
	var longmsg = plainmsg;
	//GM_log("AES Unencrypted " + longmsg);

	//check the key
	if ( key[0] < 0 )
	{
		alert("There is a problem with the key");
		return;
	}

	// expand the key
	key = hexTo16(key);
	w = key_expand( key );

	while (longmsg.length > 0 )
	{
		msg = longmsg.slice(0,16);
		longmsg = longmsg.slice(16);

		while (msg.length < 16) {
			msg += " ";
		}
		
		msg = ascTo16(msg);

		// problems??
		if ( msg[0] < 0 )
		{
			alert("There is a problem with the message");
			return;
		}


		// initial state = message in columns (transposed from what we input)
		state = transpose( msg );

		state = AddRoundKey(state, w, 0);

		for( round=1; round<10; round++ )
		{
			state = SubBytes(state, S_enc);
			state = ShiftRows(state);
			state = MixColumns(state);
			// note here the spec uses 32-bit words, we are using bytes, so an extra *4
			state = AddRoundKey(state, w, round*4*4);
		}

		SubBytes(state, S_enc);
		ShiftRows(state);
		AddRoundKey(state, w, 10*4*4);

		// process output
		AES_output = transpose( state );
		var tmpstr = format_AES_output(AES_output, "hex");
		if (finalstr == "") {
			finalstr = tmpstr;
		} else {
			finalstr = finalstr + "$" + tmpstr;
		}
	}

	//GM_log("AES Encrypted " + finalstr);

	return finalstr;

}//aes_encrypt

// do AES decryption
function aes_decrypt(key, bodytext)
{
   var w = new Array( 44 );			// subkey information
   var state = new Array( 16 );			// working state
   var round;
   var finalstr = "";
   var msg = "";

   // get the message from the user
	if (bodytext == '') {
		var longmsg = document.getElementById(loc).contentWindow.document.body.innerHTML;
	} else {
		var longmsg = bodytext;
	}

	//check the key
	if ( key[0] < 0 )
	{
		alert("There is a problem with the key");
		return;
	}

	// expand the key
	key = hexTo16(key);
	w = key_expand( key );

	var multmsg = longmsg.split("$");

	var i = 0;
	while (i < multmsg.length)
	{
		msg = hexTo16(multmsg[i]);

		// problems??
		if ( msg[0] < 0 )
		{
			alert("There is a problem with the message")
			return;
		}

		// initial state = message
		state = transpose( msg );

		state = AddRoundKey(state, w, 10*4*4);

		for( round=9; round>=1; round-- )
		{
			state = InvShiftRows(state);
			state = SubBytes(state, S_dec);
			// note here the spec uses 32-bit words, we are using bytes, so an extra *4
			state = AddRoundKey(state, w, round*4*4);
			state = InvMixColumns(state);
		}

		InvShiftRows(state);
		SubBytes(state, S_dec);
		AddRoundKey(state, w, 0);

		// process output
		AES_output = transpose( state );
		var tmpstr = format_AES_output(AES_output, "asc");
		if (finalstr == "") {
			finalstr = tmpstr;
		} else {
			finalstr = finalstr + tmpstr;
		}

		i += 1;
	}

	//GM_log("AES Decrypted " + finalstr);

	return finalstr;
}//aes_decrypt


//--- end of AES routines -------------------------------------------


//This space intentionally left blank
//