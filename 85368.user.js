// ==UserScript==
// @name           SSW Vigenere Decoder
// @namespace      http://www.secretsocietywars.com/crashnburn11
// @description    Decodes degree 33 quest automatically
// @include        *secretsocietywars.com/index.php?p=quests&a=quest&place=distillery_control*
// @include        *secretsocietywars.com*place=rat_shack*
// @include        *secretsocietywars.com/index.php?p=quests&a=quest&place=crash_pod*
// @include        *secretsocietywars.com/index.php?p=lodge&a=lodgemaster*
// ==/UserScript==
LSD = document.evaluate('//img[contains(@alt, "Lucky Spaceman Distilleries")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
GM_log(LSD);
location = window.location.href
var input = GM_getValue("input","");
var key = GM_getValue("key","");
if(location == "http://www.secretsocietywars.com/index.php?p=quests&a=quest&place=distillery_control" || location == "http://www.secretsocietywars.com/index.php?p=quests&a=quest&place=rat_shack" || location == "http://www.secretsocietywars.com/index.php?p=quests&a=quest&place=crash_pod") {
//alert(location);
var logout = document.evaluate('//a[contains(@href, "logout")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
input_link = document.createElement('a');
input_link.innerHTML = "<b>| SET INPUT |<br></b>";
input_link.setAttribute("style", logout.getAttribute("style"));
input_link.style.color = "Red";
input_link.style.cursor = "pointer";
input_link.style.fontSize = "10px";
document.body.insertBefore(input_link, document.body.firstChild);
input_link.addEventListener('click', set_input, false);
key_link = document.createElement('a');
key_link.innerHTML = "<b>| SET KEY |</b>";
key_link.setAttribute("style", logout.getAttribute("style"));
key_link.style.color = "White";
key_link.style.cursor = "pointer";
key_link.style.fontSize = "10px";
document.body.insertBefore(key_link, document.body.firstChild);
key_link.addEventListener('click', set_key, false);
//alert(Vigenere(input,key,false));
if(location == "http://www.secretsocietywars.com/index.php?p=quests&a=quest&place=distillery_control"){
decoded = document.evaluate('//input[@type="text"][@name="accesscode1"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(key != "" && input != ""){ 
decoded.value = Vigenere(input,key,false);
} else if(key=="" && input==""){
decoded.value = "Need key and input";
} else if(key=="" && input!=""){
decoded.value = "Need key";
} else if(input == ""){
decoded.value = "Need input";
}
}
}
if(document.evaluate('//a//text()[contains(., "Explore the Mysteries of the Celestial Dimit")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue){
GM_setValue("key","");
GM_setValue("input","");
}

function set_input()
{
input = prompt('Input value to be decoded',GM_getValue("input",""));
GM_setValue("input",input);
}

function set_key()
{
key = prompt('Input Key',GM_getValue("key",""));
GM_setValue("key",key);
}
function Vigenere (input, key, forward)
{
	if (key == null)
		key = "";
	var alphabet =   "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	               + "abcdefghijklmnopqrstuvwxyz";

	// Validate key:
	key = key . toUpperCase ();
	var key_len = key . length;
	var i;
	var adjusted_key = "";
	for (i = 0; i < key_len; i ++)
	{
		var key_char = alphabet . indexOf (key . charAt (i));
		if (key_char < 0)
			continue;
		adjusted_key += alphabet . charAt (key_char);
	}
	key = adjusted_key;
	key_len = key . length;
	if (key_len == 0)
	{
		alert ('You forgot to supply a key!');
		key = "a";
		key_len = 1;
	}

	// Transform input:
	var input_len = input . length;
	var output = "";
	var key_index = 0;
	var in_tag = false;
	for (i = 0; i < input_len; i ++)
	{
		var input_char = input . charAt (i);
		if (input_char == "<")
			in_tag = true;
		else if (input_char == ">")
			in_tag = false;
		if (in_tag)
		{
			output += input_char;
			continue;
		}
		var input_char_value = alphabet . indexOf (input_char);
		if (input_char_value < 0)
		{
			output += input_char;
			continue;
		}
		var lowercase = input_char_value >= 26 ? true : false;
		if (forward)
			input_char_value += alphabet . indexOf (key . charAt (key_index));
		else
			input_char_value -= alphabet . indexOf (key . charAt (key_index));
		input_char_value += 26;
		if (lowercase)
			input_char_value = input_char_value % 26 + 26;
		else
			input_char_value %= 26;
		output += alphabet . charAt (input_char_value);
		key_index = (key_index + 1) % key_len;

	}
	return output;
}
