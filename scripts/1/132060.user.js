// ==UserScript==
// @name           YouTube Auto Signup
// @namespace      YouTube Auto Signup
// @include        https://accounts.google.com/SignUp*
// ==/UserScript==

/* Definitions */
var password	= ""; // Password for new Google accounts
var phonenum	= ""; // Phone number - optional!
var ctusername 	= ""; // Captchatrader Username
var ctpasswd 	= ""; // Captchatrader Password

/* Information */
var FirstNames = new Array (
"Jorek",
"Meo",
"Hennes",
"Yuma",
"Mirac",
"Lian",
"Rafail",
"Elian",
"Leland",
"Malwin",
"Milian",
"Lysander",
"Lemar",
"Kendrick",
"Aurelius",
"Espen",
"Arjen",
"Levente",
"Junes",
"Diogo",
"Natahniel",
"Zino",
"Demian",
"Juliano",
"Josias",
"Jerik",
"Maximus",
"Taylor",
"Noam",
"Laurentin",
"Cosmo",
"Evan",
"Meeno",
"Ferris"
);

var LastNames = new Array (
"Dearing","Coleman","Havering","Collister","Anderson","Johnson",
"Cunningham",
"Edwards",
"Black",
"Connor",
"Firestone",
"Brown",
"Smith",
"Hilton",
"Young",
"Franklin",
"Baker",
"Carter",
"Caviness",
"Warren",
"Harsen",
"Blair",
"Bennett",
"Armstrong"
);

var Genders = new Array (
"MALE",
"FEMALE",
"OTHER"
);

var eMailProviders = new Array (
"gmx.net",
"emailgo.de",
"web.de",
"yahoo.com",
"t-online.de",
"arcor.de",
"freenet.de",
"mail.de",
"live.com",
"hotmail.com"
);

var CountryCodes = new Array (
"AF",
"EG",
"AX",
"AL",
"DZ",
"VI",
"UM",
"AS",
"AD",
"AO",
"AI",
"AQ",
"AG",
"GQ",
"AR",
"AM",
"AW",
"AZ",
"ET",
"AU",
"BS",
"BH",
"BD",
"BB",
"BY",
"BE",
"BZ",
"BJ",
"BM",
"BT",
"BO",
"BA",
"BW",
"BV",
"BR",
"VG",
"IO",
"BN",
"BG",
"BF",
"BI",
"CL",
"CN",
"CK",
"CR",
"CI",
"DK",
"KP",
"DE",
"DM",
"DO",
"DJ",
"EC",
"SV",
"ER",
"EE",
"FK",
"FO",
"FJ",
"FI",
"FR",
"TF",
"GF",
"PF",
"GA",
"GM",
"GE",
"GH",
"GI",
"GD",
"GR",
"GL",
"GP",
"GU",
"GT",
"GG",
"GN",
"GW",
"GY",
"HT",
"HM",
"HN",
"HK",
"IN",
"ID",
"IQ",
"IR",
"IE",
"IS",
"IM",
"IL",
"IT",
"JM",
"JP",
"YE",
"JE",
"JO",
"KY",
"KH",
"CM"
);

/* Captchatrader API */
function CaptchaTrader(apiKey, username, password) {
	/**
	 * Authentication credentials.
	 */
	var _apiKey = apiKey, _username = username, _password = password;
	/**
	 * The ticket id of the last submitted CAPTCHA.
	 */
	var _activeJobId = null;
	/**
	 * Set a new username to run under.
	 * @param username The username to run under.
	 * @return This CaptchaTrader instance.
	 */
	this.setUsername = function(username) {
		_username = username
		return this;
	};
	/**
	 * Set a new password. This does not change the user's password.
	 * @param password The password of the user.
	 * @return This CaptchaTrader instance.
	 */
	this.setPassword = function(password) {
		_password = password;
		return this;
	};
	/**
	 * Submit a CAPTCHA already hosted on an existing website with a match parameter.
	 *
	 * Usage example:
	 * 
	 *   CaptchaTrader.submit({type:<image type>, url:<image url>[, match:<image match>]}, function(response)[, function(response)]);
	 *
	 * @param url The URL of the CAPTCHA image.
	 * @param imageType The type of image.
	 * @param match The object to match to
	 * @param success Success callback
	 */
	this.submit = function(params, success, failure) {
		if(params.match === undefined) {
			submitJob("username=" + _username + "&password=" + _password + "&api_key=" + _apiKey + "&type=" + params.imageType + "&value=" + params.url, success, failure);
		} else {
			submitJob("username=" + _username + "&password=" + _password + "&api_key=" + _apiKey + "&type=" + params.imageType + "&value=" + params.url + "&match=" + params.match, success, failure);
		}
	};
	/**
	 * Complete a job submission.
	 * @param params The parameter string
	 * @param success Success callback
	 * @param failure Failure callback
	 */
	function submitJob(params, success, failure) {
		var request = new XMLHttpRequest();
		request.open("POST", "http://api.captchatrader.com/submit", true);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.setRequestHeader("Content-length", params.length);
		request.setRequestHeader("Connection", "close");
		request.onreadystatechange = function() {
			if(request.readyState == 4 && request.status == 200) {
				var response = eval(request.responseText);
				if(response[0] == -1) {
					if(failure) {
						failure(response[1]);
					}
				} else {
					_activeJobId = response[0];
					success(response[1]);
				}
			}
		};
		request.send(params);
	}
	/**
	 * Respond to the last sent job.
	 * @param isCorrect Whether the job was correct or not.
	 */
	this.respond = function(isCorrect) {
		if(_activeJobId) {
			var params = "username=" + _username + "&password=" + _password + "&ticket=" + _activeJobId + "&is_correct=" + isCorrect;
			var request = new XMLHttpRequest();
			request.open("POST", "http://api.captchatrader.com/respond", true);
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			request.setRequestHeader("Content-length", params.length);
			request.setRequestHeader("Connection", "close");
			request.send(params);
			_activeJobId = null;
		}
	};
	/**
	 * Get the credits remaining on the current user.
	 * @return The number of credits remaining.
	 */
	this.getCredits = function(success, failure) {
		var request = new XMLHttpRequest();
		request.open("GET", "http://api.captchatrader.com/get_credits/username:" + _username + "/password:" + _password + "/");
		request.onreadystatechange = function() {
			if(request.readyState == 4 && request.status == 200) {
				var response = eval(request.responseText);
				if(response[0] == -1) {
					if(failure) {
						failure(response[1]);
					}
				} else {
					success(response[1]);
				}
			}
		};
		request.send(null);
	};
}

/* Some functions */
// Create random number
function randomnum(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

// Number to string with specific length
function numtostrlength(num, leng) {
  newstring = num.toString();
  
  for (i = newstring.length; i < leng; i++) {
    newstring = '0' + newstring;
  }
  
  return newstring;
}

/* Fill in */
// Name
document.getElementById('FirstName').value			= FirstNames[randomnum(0, FirstNames.length - 1)];
document.getElementById('LastName').value			= LastNames[randomnum(0, LastNames.length - 1)];

// New GMail Address
document.getElementById('GmailAddress').value		= document.getElementById('FirstName').value + document.getElementById('LastName').value + randomnum(1000, 9999);

// Password
document.getElementById('Passwd').value				= password;
document.getElementById('PasswdAgain').value		= password;

// Birth Date
document.getElementById('BirthDay').value			= randomnum(1, 25);
document.getElementById('HiddenBirthMonth').value	= numtostrlength(randomnum(1, 12), 2);
document.getElementById('BirthYear').value 			= randomnum(1950, 1990);

// Gender
document.getElementById('HiddenGender').value		= Genders[randomnum(0, 2)];

// Phone Number if given
if (phonenum) {
  document.getElementById('RecoveryPhoneNumber').value = phonenum;
}

// Recovery Mail Address
document.getElementById('RecoveryEmailAddress').value = document.getElementById('FirstName').value + document.getElementById('LastName').value + '@' + eMailProviders[randomnum(0, eMailProviders.length - 1)];

// Country
document.getElementById('HiddenCountryCode').value = CountryCodes[randomnum(0, CountryCodes.length - 1)];

// Check "Terms of Service accepted"
document.getElementById('TermsOfService').checked = true;

// Uncheck Personalization
document.getElementById('Personalization').checked = false;

/* Submit Captcha */
var captchaTrader = new CaptchaTrader("3630743b82a0235e2d40c23484e3efec", ctusername, ctpasswd);

captchaTrader.submit({
  type: 'image/jpeg',
  url: document.getElementById('recaptcha_image').getElementsByTagName('img')[0].src
},

function(response) {
  document.getElementById('recaptcha_response_field').click();
  document.getElementById('recaptcha_response_field').value = response;
  
  captchaTrader.respond(true);
  
  setTimeout("document.getElementById('submitbutton').click()", 2000);
},

function(error) {
	alert('There was a Captcha Error!');
});
