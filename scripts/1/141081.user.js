// ==UserScript==
// @name        Reddicrypt
// @namespace   Aaron
// @description encrypts reddit using aes256
// @include     http://www.reddit.com/r/reddicrypt*
// @require		http://crypto-js.googlecode.com/svn/tags/3.0.2/build/rollups/aes.js
// @exclude		http://www.reddit.com/r/*/about*
// @version     1
// ==/UserScript==

/*
* Use the crude GUI at bottom right to give the script a password
* this will be saved locally and used to decrypt anything on the page that works
* use that gui again to change password
* when submitting click the "encrypt and submit" button
* when submitting a new topic the script will encrypt but reddit might reject because of captcha
* dont click the button again, use the enter key to submit the new topic
*/


//give it a document.evaluate xpath 6 to try decrypt using the mypass variable
function decrypt_by_xpath(xpath){

var c = 0;
	//for(var i = 0; i < xpath.snapshotLength; i=i+1){
	var i = 0;
	while(i<xpath.snapshotLength){
		var node = xpath.snapshotItem (i);
		if(node.childNodes.length > 1){
		var todecrypt = node.firstChild.innerHTML;
		}else{
		var todecrypt = node.innerHTML;
		}
		var dhex = CryptoJS.AES.decrypt(todecrypt, mypass).toString();

		if(dhex != ''){
		var str = "";
				for (var u = 0; u < dhex.length; u += 2){
					str += String.fromCharCode(parseInt(dhex.substr(u, 2), 16));}
		
		var decrypted = str;
		
		
			node.innerHTML = str;
		}else{
		c++;
		}
		i++;
	}
	if(c == xpath.snapshotLength){
	return false;	
	}


}


function dereddicrypt(){
	

	var titles = document.evaluate( '//a[contains(@class, "title ")]' , document, null, 6, null );
	var titles_l = document.evaluate( '//a[contains(@class, "title loggedin ")]' , document, null, 6, null );
	var titles_l_clicked = document.evaluate( '//a[contains(@class, "title loggedin click")]' , document, null, 6, null );

	
	var longtext = document.evaluate( '//div[contains(@class, "md")]' , document, null, 6, null );
	
	var recently_viewed = document.evaluate( '//a[contains(@class, "reddit-link-title")]' , document, null, 6, null );
	
	
	var rc = [longtext, titles, recently_viewed, titles_l, titles_l_clicked];
	
	var errors = 0;
	for(var y = 0; y<rc.length;y++){
		if(decrypt_by_xpath(rc[y]) == false){
			errors++;
		}
	}

	if(errors == rc.length){
		//GM_deleteValue('mypass');
	}
	
}


var loc_hash = window.location.hash;

if(loc_hash.length!='0'){
	var mypass = loc_hash.replace('#', '');
	GM_setValue('mypass', mypass);
dereddicrypt();
}else{
	if(typeof GM_getValue('mypass')!='undefined'){
		var mypass = GM_getValue('mypass');
		dereddicrypt();
	}else{
	var mypass = document.getElementById('reddicrypt_pass').value;
	}
}



function encrypt_by_xpath(xpath){

	var c = 0;
	for(var i = 0; i < xpath.snapshotLength; i++){
		var node = xpath.snapshotItem (i);
		if(node.childNodes.length > 1){
		var toencrypt = node.firstChild.value;
		}else{
		var toencrypt = node.value;
		}
		var encrypted = CryptoJS.AES.encrypt(toencrypt, mypass);
		if(encrypted != ''){
			node.value = encrypted;
		}else{
			c++;
			null;
		}

	}
	if(c == xpath.snapshotLength){
		return false;
	}

}

function reddicrypt(){

	var input_title = document.evaluate( '//textarea[contains(@name, "title")]' , document, null, 6, null );
	
	var input_comment = document.evaluate( '//textarea[contains(@name, "text")]' , document, null, 6, null );

	var rc = [input_title, input_comment];

	var errors = 0;
	for(var y = 0; y<rc.length;y++){
		if(encrypt_by_xpath(rc[y]) == false){
			errors++;
		}
	}

	if(errors == rc.length){
		//GM_deleteValue('mypass');
	}

}


	var submit_topic = document.evaluate( '//button[contains(@name, "submit")]' , document, null, 4, null ).iterateNext();
	var submit_reply = document.evaluate( '//button[contains(@class, "save")]' , document, null, 6, null );

	if(submit_topic){
		submit_topic.innerHTML = 'Encrypt and Submit';
	}
	if(submit_reply.snapshotLength > 1){
		
		submit_reply.snapshotItem(1).innerHTML = 'Encrypt and Submit';
	}

document.addEventListener('click', function(event) {
	if(event.target.name == "submit" || event.target.className == "save"){
		reddicrypt();
	}
}, true);


var cbox = document.createElement("div");
cbox.innerHTML = '<div style="position:fixed;width:200px;height:50px;bottom:50px;right:100px;background-color:black;color:green">' +
				'Pass: <input type="text" value="" id="reddicrypt_pass" /> <input type="submit" id="rc_decrypt" value="Dereddicrypt" onclick="window.location.hash=document.getElementById(\'reddicrypt_pass\').value;window.location.reload();"/>'+
				'</div>';
document.body.insertBefore(cbox, document.body.firstChild);