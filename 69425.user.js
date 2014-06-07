// ==UserScript==
// @name           FAC
// @namespace      http://www.brice.com
// @description    Stuff
// @author         Brice
// @version        1.0
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==


//*******************
//Change these variables
var emailTail = "@spankyspooks.com";
var password = "gbconfirm";

//*******************
var firstNameArray = new Array
( 'Donkeypunch', 'Ralph',  'Amelia',  'Andrew',  'Arthur',  'Audrey',  'Becky',  'Bernice',  'Blanche',  'Brian',  'Bridget',  'Bruce',  'Candace',  'Carla',  'Carole',  'Cassandra',  'Charlotte',  'Christopher',  'Claudia',  'Cynthia',  'Daniel',  'Dennis',  'Donald',  'Edna',  'Emily',  'Ethel',  'Eva',  'Flora',  'Fred',  'Gary',  'Glenn',  'Grace',  'Harold',  'Harry',  'Hattie',  'Hilda',  'Holly',  'Howard',  'Jack',  'Jacob',  'Jeff',  'Jeffrey',  'Jimmy',  'Joe',  'John',  'Joseph',  'Julie',  'Kathleen',  'Kenneth',  'Kimberly',  'Lawrence',  'Louis',  'Margarita',  'Marianne',  'Marie',  'Martin',  'Marvin',  'Megan',  'Michele',  'Myrtle',  'Nicholas',  'Opal',  'Patrick',  'Patty',  'Peter',  'Ralph',  'Raymond',  'Renee',  'Richard',  'Robert',  'Roberta',  'Rodney',  'Roger',  'Rohrer',  'Ronald',  'Russell',  'Ryan',  'Scott',  'Shelly',  'Stanley',  'Stephen',  'Steve',  'Tammy',  'Terry',  'Tony',  'Vickie',  'Vincent',  'Walter',  'Wilma' );
var lastNameArray = new Array 
( 'Vanwinkle', 'Alcantara', 'Alcaraz', 'Alleman', 'Angeles', 'Averill', 'Barnette', 'Barrington', 'Blakemore', 'Bradbury', 'Brewer', 'Brigham', 'Brooks', 'Burd', 'Cantwell', 'Carrasquillo', 'Carrol', 'Chester', 'Clay', 'Colin', 'Counts', 'Dansby', 'Delisle', 'Deltoro', 'Dobbins', 'Dodge', 'Doll', 'Donald', 'Dufrene', 'Eley', 'Enos', 'Ferrara', 'Gartner', 'Gordy', 'Graves', 'Grice', 'Haase', 'Hankins', 'Hartley', 'Heffner', 'Helmer', 'Hermosillo', 'Ingraham', 'Isaacson', 'Kempf', 'Lafferty', 'Lang', 'Larry', 'Lathan', 'Layman', 'Leake', 'Lear', 'Leyba', 'Leyva', 'Lipsey', 'Lowell', 'Lueck', 'Malek', 'Mansell', 'Marek', 'Marion', 'Mccomas', 'Mckay', 'Meador', 'Miramontes', 'Morin', 'Pankey', 'Pinder', 'Pippin', 'Plunkett', 'Porch', 'Proffitt', 'Quirk', 'Randolph', 'Reinhart', 'Reynolds', 'Rivas', 'Robledo', 'Ruggiero', 'Rumph', 'Ruppert', 'Sain', 'Shaffer', 'Shively', 'Sibley', 'Snowden', 'Spence', 'Sykes', 'Tincher', 'Trevino', 'Ulloa', 'Usher', 'Waddle', 'Washburn', 'Weiler', 'Winkle', 'Wise', 'Yamamoto', 'Youngman' );

button = document.createElement("input");
button.type = "button";
button.value = "Fake it 'till you make it";




function infoFill(){

		var sexVar=Math.floor(Math.random()*2)+1;
		var monthVar=Math.floor(Math.random()*12) + 1;
		var dayVar=Math.floor(Math.random()*28) + 1;
		var yearVar=Math.floor(Math.random()*44) + 1950;
		var firstRandom = Math.floor(Math.random()*firstNameArray.length)
		var firstnamegen = firstNameArray[firstRandom];
		var lastRandom = Math.floor(Math.random()*lastNameArray.length)
		var lastnamegen = lastNameArray[lastRandom];
		var prEmail = prompt("Input email prefix ");
		var email = prEmail+emailTail;
		
		document.getElementById("firstname").focus();
		document.getElementById("firstname").value = firstnamegen;
		document.getElementById("lastname").value = lastnamegen;
		document.getElementById("reg_email__").value = email;//Change this depending on your email!
		document.getElementById("reg_passwd__").value = password;
		document.getElementById("sex").value = sexVar;
		document.getElementById("birthday_month").value = monthVar;
		document.getElementById("birthday_day").value = dayVar;
		document.getElementById("birthday_year").value = yearVar;

		var links = document.getElementsByClassName('UIButton_Text');
		links[1].click();
		GM_openInTab("http://webaccounts.miningbased.com/webaccounts/create?email="+email+"&password=gbconfirm&network_id=1&status=inactive")
		

}

function skipCheck(){
	
	var emailBanner = document.getElementsByClassName('confirm_banner_text');
	if (emailBanner[0] != null)
		//GM_log('Go confirm this email. . .');

	var capchaBox = document.getElementById('captcha_response');
	if (capchaBox != null){
		capchaBox.focus();
		//GM_log('Captcha found!');
		}

	if (document.title == "Facebook | Getting Started"){  
		var link = document.getElementsByClassName("UIEncapsulatedPage_ControllerLink");
		GM_log(link)
		document.location = link[0].href;
	}
	GM_log(document.title);
}

function checKey(e){
	if (e.ctrlKey==true && (String.toUpperCase(String.fromCharCode(e.keyCode)) == "F")){
		prEmail = prompt("Enter email address","");
		infoFill();
	}
}


if (document.title == "Welcome to Facebook"){
	var place = document.getElementsByClassName('reg_btn clearfix');
	place[0].appendChild(button);
	button.focus();
	}
skipCheck();
button.addEventListener("click", infoFill ,false)




