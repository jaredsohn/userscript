// ==UserScript==
// @name        Neopets Encryptor Class
// @namespace   Made by Lightning on Neofriends.net
// @version     1
// ==/UserScript==
function Encryptor()
{
	// BEGIN: Declarations
    var BASE_URL = "http://www.neopets.com/high_scores/process_flash_score.phtml";
	var encryptions = {};
	// END: Declarations
	
	
	
	// BEGIN: Basic Functions	
    this.hasEncryption = function(name)
	{
        return (encryptions[name] !== undefined);
    };
	
	this.setEncryption = function(name, decimals)
	{
		var arrKeys = [];
		var rgxDecimal = /\d+/g;
		
		for (var i = 0; i < decimals.length; i++)
		{
			var strHex = "";
			while ((match = rgxDecimal.exec(decimals[i])) !== null)
			{
				strHex += String.fromCharCode(Number(match[0]));
			}
			arrKeys.push(strHex);
		}
	
		encryptions[name] = arrKeys;
		/*
		if (!this.hasEncryption(name))
		{
			encryptions.push(function() Encryption(name, arrKeys));
		}
		else
		{
			encryptions[getEncryption(name)] = new Encryption(name, arrKeys);
		}
		*/
	}
	
	this.getURL = function(encrypt_name, username, s_hash, s_key, gameID, waitMillisec, score)
	{
		if (!this.hasEncryption(encrypt_name))
			return "";
		
		var encrypt_dec = encryptions[encrypt_name];
		
		// Building URL
		var strURL = BASE_URL + "?cn=" + String(Number(gameID) * 300) + "&gd=" + String(waitMillisec);
		strURL += "&r=0." + randomString("0123456789", randomNumber(13, 18));
		
		var strEncrypt = "ssnhsh=" + s_hash + "&ssnky=" + s_key + "&gmd=" + String(gameID) + "&scr=" + String(score) + "&frmrt=" + String(randomNumber(15, 30)) + "&chllng=&gmdrtn=" + String(waitMillisec);
		
		return strURL + "&gmd_g=" + String(gameID) + "&mltpl_g=0&gmdt_g=" + addSlashes(encrypt_dec, strEncrypt, s_hash, s_key) + "&sh_g=" + s_hash + "&sk_g=" + s_key + "&usrnm_g=" + username + "&dc_g=0&cmgd_g=89198&ddNcChallenge=0&fs_g=0";
	}
	// END: Basic Functions
	
	
	
	
	// BEGIN: Random Generation Functions
	function randomString(characters, length)
	{
		var random = "";
		for (var i = 0; i < length; i++)
		{
			random += characters[randomNumber(0, characters.length)];
		}
		return random;
	}
	
	function randomNumber(min, max)
	{
		return Math.floor((Math.random()*max) + min);
	}
	// END: Random Generation Functions
	
	
	
	
	// BEGIN: Neopets Encryption Algorithms
	function addSlashes(encrypt_dec, strEncrypt, s_hash, s_key)
	{
		return escapeString(stringToHex(encrypt_dec, strEncrypt, s_hash, s_key));
	}
	
	function stringToHex(decimals, strEncrypt, s_hash, s_key)
	{
		var strBin = s_hash + s_key;
		var strResult = "";
		var intRandom = randomNumber(0, decimals.length - 1);
		var index = 0, count = 0;

		var strKey = String(decimals[intRandom]);
		while (index < strEncrypt.length)
		{
			if (count >= strBin.length) count = 0;

			var current = strKey.indexOf(strEncrypt.charAt(index));
			if (current >= 0)
			{
				current = (current + strKey.indexOf(strBin.charAt(count))) % strKey.length;
				strResult += strKey.charAt(current);
			}
			else
			{
				strResult += strEncrypt.charAt(index);
			}
			++count;
			++index;
		}
		
		return strResult + (intRandom >= 10 ? intRandom.toString() : "0" + intRandom.toString());
	}
	
	function escapeString(s)
	{
		var strResult = "", strCurrent = "";

		for (var intIndex = 0; intIndex < s.length; intIndex++)
		{
			strCurrent = String(s.charCodeAt(intIndex));
			while (strCurrent.length < 3)
			{
				strCurrent = "0" + strCurrent;
			}
			strResult += strCurrent;
		}
		return strResult;
	}
	// END: Neopets Encryption Algorithms
}
var encryptor = new Encryptor();