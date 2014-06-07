// ==UserScript==
// @name		LockerzFullAutofill
// @include		*lockerz*
// @author         	Freamer
// ==/UserScript==

// READ HERE
//   ||
//    V

// Personal Data
// Here you have to fill in your data. You have to fill in everything, else it would not work.
// and NO, nothing is going to be send to google or somebody else.
var email = "wiktor515.95@gmail.com";      // email
var pass = "gremlin";               // password
var fname = "Wiktor";                   // first name
var lname = "Franus";                  // last name
var street1 = "Poludniowa 31";     // street
var street2 = "";                      // second box for street (leave it clear if the first street is not longer than 31 chars)
var city = "Staszow";                 // town
var state = "PL";                      // state (if you are NOT from the USA or Canada just type in the name of your state. if you ARE from Canada or the USA you have to type in your state code. like NY for New York. always 2 caps chars. you should know what i mean.)
var country = "Poland";               // country (written in english! all listed in the countries.txt . only the country, NOT the countrycode)
var ccode = "PL";                      // countrycode (all listed in the countrys.txt . only the countriecode, NOT the name of the country)
var zip = "28200";                     // zip code
var tele = "0048794219943";          // your complete phone numer (0049 stands for +49 if you don't know. in this case its germany)
var tele1 = ""                      // only for usa and canada, else make it blank. blank is "". first 3 digits of your phone number
var tele2 = ""                      // only for usa and canada, else make it blank. blank is "". 4-6 digit of your phone number
var tele3 = ""                     // only for usa and canada, else make it blank. blank is "". 7-10 digit of your phone number
var blank = "";                        // leave this as it is
// There are two other things you have to fill in. the category and the prize.
// Just scroll through the code, you will find them.

//    ^
//   ||
// READ HERE


// shortens the code

function $$(a) {
    return document.getElementById(a);
}



// login at ptzplace.lockerz.com

if (location.href.indexOf("welcome") > -1 || location.href == "http://ptzplace.lockerz.com/") {
	$$("email").value = email;
	$$("combination").value = pass;
	$$("loginForm").submit();
}

// READ HERE
//   ||
//    V


// this skips the screen where can select your category and clicks on a category.
// now it is set to electronics.
// if you want cool brands write 'Cool' where 'Electro' stands and 'b=1' where 'b=2' stands.
// if you want lockerz exclusive write 'Exclusive' where 'Electro' stands and 'b=3' where 'b=2' stands.

if (location.href.indexOf("home") > -1) {	
	redeemshome = document.evaluate("//a[contains(@href,'Electro')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(@href,'b=2')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
}

//    ^
//   ||
// READ HERE

// READ HERE TOO
//   ||
//    V


// this part checks if the prize you want is still there and selects it
// it is sorted after priorities. if the first prize is not there, it checks the second one etc.
// in this example first it looks after a xbox, then the beatles drum set for wii and than a purple nano.
// a priority is made of 4 search blocks with the same search words.
// here are the search words for the xbox: 'Xbox' and 'System'
// for the beatles pack : 'Beatles' , 'Value' and 'Wii'.
// you can add, delete or change priorities.
// you can search everything what you see on the redeem page on lockerz.com. just change the search-words.
// if you are too dumb for this you don't deserve.


if (location.href.indexOf("prizes") > -1) {	



	redeemshome = document.evaluate("//a[contains(@href,'MacBook')][contains(@href,'1000')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span,'MacBook')][contains(span,'1000')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[3],'MacBook')][contains(span[3],'1000')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[2],'MacBook')][contains(span[2],'1000')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}




	redeemshome = document.evaluate("//a[contains(@href,'iPod')][contains(@href,'Touch')][contains(@href,'32')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span,'iPod')][contains(span,'Touch')][contains(span,'32')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[3],'iPod')][contains(span[3],'Touch')][contains(span[3],'32')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[2],'iPod')][contains(span[2],'Touch')][contains(span[2],'32')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}


	redeemshome = document.evaluate("//a[contains(@href,'iPod')][contains(@href,'Touch')][contains(@href,'8')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span,'iPod')][contains(span,'Touch')][contains(span,'8')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[3],'iPod')][contains(span[3],'Touch')][contains(span[3],'8')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[2],'iPod')][contains(span[2],'Touch')][contains(span[2],'8')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}



	redeemshome = document.evaluate("//a[contains(@href,'Nano')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span,'Nano')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[3],'Nano')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[2],'Nano')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}


	redeemshome = document.evaluate("//a[contains(@href,'MacBook')][contains(@href,'Pro')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span,'MacBook')][contains(span,'Pro')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[3],'MacBook')][contains(span[3],'Pro')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[2],'MacBook')][contains(span[2],'Pro')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}

	redeemshome = document.evaluate("//a[contains(@href,'Dell')][contains(@href,'Black')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span,'Dell')][contains(span,'Black')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[3],'Dell')][contains(span[3],'Black')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[2],'Dell')][contains(span[2],'Black')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}


	redeemshome = document.evaluate("//a[contains(@href,'netbook')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span,'netbook')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[3],'netbook')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[2],'netbook')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}


	redeemshome = document.evaluate("//a[contains(@href,'PayPal')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span,'PayPal')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[3],'Paypal')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
	redeemshome = document.evaluate("//a[contains(span[2],'PayPal')]", document, null,7, null); 
	redeemhome = redeemshome.snapshotItem(0);
	if (this.redeemhome != null) {
		window.location = redeemhome;
	}
}

//    ^
//   ||
// READ HERE TOO


// hides all redeemed prizes
// only comes to action when no priority is left
// jea, this part is stolen :-)

if (location.href.indexOf("prizes") > -1) {	
if(GM_getValue("sold") == undefined || GM_getValue("redeem") == undefined )
{
	GM_setValue("sold", false);
	GM_setValue("redeem", true);
};


if (GM_getValue("sold") == false) {
GM_registerMenuCommand('LA > Show Sold-out Items',
	            function () 
	            {
	                GM_setValue("sold", true);
			 		window.location.reload();
	            });
};

if (GM_getValue("sold") == true) {
GM_registerMenuCommand('LA > Hide Sold-out Items',
	            function () 
	            {
	                GM_setValue("sold", false);
			 		window.location.reload();
	            });
};
if (GM_getValue("redeem") == false) {
GM_registerMenuCommand('LA > Autoclick \'Redeem\'',
	            function () 
	            {
	                GM_setValue("redeem", true);
			 		window.location.reload();
	            });
};

if (GM_getValue("redeem") == true) {
GM_registerMenuCommand('LA > Don\'t Autoclick \'Redeem\'',
	            function () 
	            {
	                GM_setValue("redeem", false);
			 		window.location.reload();
	            });
};

if (GM_getValue("sold") == false) {
GM_addStyle("div.soldOut { display: none; }");
GM_addStyle("div.productFrame { display: none; }");
};
}



// skips the prize details

if (location.href.indexOf("prizedetail") > -1) {	
	redeembuttons = document.evaluate("//a[contains(@class,'btnRedeem')]", document, null,7, null); 
	redeembutton = redeembuttons.snapshotItem(0);
	if (this.redeembutton != null) {
		window.location = redeembutton;
	}
	redeembuttons = document.evaluate("//a[contains(@href,'redeem')]", document, null,7, null); 
	redeembutton = redeembuttons.snapshotItem(0);
	if (this.redeembutton != null) {
		window.location = redeembutton;
	}

}



// fills in the forms and selects the captcha window

if (location.href.indexOf("redeem") > -1) {
if (document.body.innerHTML.indexOf("country") > -1) {
	$$("country").value = ccode;
}
if (document.body.innerHTML.indexOf("countryDetails") > -1) {
	$$("countryDetails").value = country;
}
if (document.body.innerHTML.indexOf("firstName") > -1) {
	$$("firstName").value = fname;
}
if (document.body.innerHTML.indexOf("lastName") > -1) {
	$$("lastName").value = lname;
}
if (document.body.innerHTML.indexOf("address1") > -1) {
	$$("address1").value = street1;
}
if (document.body.innerHTML.indexOf("address2") > -1) {
	$$("address2").value = street2;
}
if (document.body.innerHTML.indexOf("city") > -1) {
	$$("city").value = city;
}
if (document.body.innerHTML.indexOf("state") > -1) {
	$$("state").value = state;
}
if (document.body.innerHTML.indexOf("zip") > -1) {
	$$("zip").value = zip;
}
if (document.body.innerHTML.indexOf("phoneOne") > -1) {
	$$("phoneOne").value = tele1;
}
if (document.body.innerHTML.indexOf("phoneTwo") > -1) {
	$$("phoneTwo").value = tele2;
}
if (document.body.innerHTML.indexOf("phoneThree") > -1) {
	$$("phoneThree").value = tele3;
}
if (document.body.innerHTML.indexOf("phoneWhole") > -1) {
	$$("phoneWhole").value = tele;
}
if (document.body.innerHTML.indexOf("recaptcha_response_field") > -1) {
	$$('recaptcha_response_field').focus();
}
	$$("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = country
	$$("countryDetails").value = country;
	unsafeWindow.manipulateForm(ccode);

if (document.body.innerHTML.indexOf("recaptcha_response_field") > -1) {
	$$('recaptcha_response_field').focus();
}
}