// ==UserScript==
// @name       Bolagsverket Phonescraper Dev
// @namespace  http://Webpage/
// @version    0.6
// @description  enter something useful
// @match      https://poit.bolagsverket.se/poit/PublikSokKungorelse.do?method=redirect&forward=main.no.sidebar.sokresultat
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2012+, You
// @grant      GM_xmlhttpRequest
// ==/UserScript==
//todo: 
//c/o adresser fuckas upp för att det är ett kommatecken med.
//här är sverige med, då funkar det inte heller.
//kolla hur många items det finns i listan. och trycka på next
//Organistionstyp

$(function() {
	var selector = ".result tbody tr";
	var postsremaining = $(selector).length;
	var savesmade = 0;
	$(selector).each(function(indexInArray) {
		var announcementID = $(this).find('[headers=h-diarienummer] a').text();

		setTimeout( function () {
			postsremaining--;
			var mypost = new post(announcementID);
			//visit every company-page.
			mypost.getData(function(){
				mypost.parsedata();
				mypost.addContact();
				mypost.addCompany();

				//make contact based on mypost results
				var myperson = new person(mypost.contact);
				myperson.makeContact();
				myperson.addCompany(mypost);

				//checking phonenumbers with various firstnames
				var namesremaining = myperson.firstname.length;
				for (var name in myperson.firstname){
					var firstname =  myperson.firstname[name];
					var myphone = new phone(myperson, firstname);

					myphone.get(function(phonenumbers){
						namesremaining--;
						//If a phonenumber is found. 
						if(myphone.phonearray){
							myperson.addPhone(myphone);
							//if all iterations are done, save.
							if(namesremaining === 0){
								//Either everything is is done, ending with a save or with a final search for a name.
								savesmade++;
								console.log(savesmade);
								myperson.save(function(){
									savesmade--;
									if(namesremaining === 0 && postsremaining === 0 && savesmade === 0){
										console.log('alldone1')
									}
								});
							}
						}

						//If everything is done, next page
						if(namesremaining === 0 && postsremaining === 0 && savesmade === 0){
							console.log('alldone2');
						}
					});
				}
			});
			//adding delay for every itteration.
		}, indexInArray * 350);
	});
});

function phone(person, firstname){
	this.person = person;
	this.where = person.searchadress+' '+person.postal+' '+person.city;
	this.who = firstname+' '+person.lastname;
	this.url = 'http://personer.eniro.se/resultat/'+this.who+'/'+this.where;
}

phone.prototype.get = function(callback){
	myself = this;
	GM_xmlhttpRequest({
		method: "GET",
		url: this.url,
		onload: function(data) {
			data = $.parseHTML(data.responseText);
			var results = $(data).find('.vcard');

			//if exactly one person is found.
			if(results.length === 1){
				thephone = $(data).find('.tel a').map(function (i, el) {
					return $(el).attr('href').substring(8);
				}).get();
				myself.phonearray = thephone;
			}

			callback();
		}
	});
};


function person(data){
	this.data = data;
}
person.prototype.addPhone = function(myphone){
	this.OfficePhone = this.polishphone(myphone.phonearray[0]);
	if(phone[1]){
		this.mobilePhone = this.polishphone(myphone.phonearray[1]);
	}
};
person.prototype.polishphone =function(phonenumber){
	if( phonenumber.substring(0, 2) == '46'){
		phonenumber = phonenumber.substring(2);
	}
	phonenumber = '0'+phonenumber;
	return phonenumber;
};

person.prototype.addCompany =function(post){
	this.company = post.company;
	this.notes = post.notes;
};
person.prototype.makeContact = function(){
	//id and first/lastname are in the same string.
	this.id = this.data[0].substring(0,13);
	this.lastname = $.trim(this.data[0].substring(13,this.data[0].length));
	firstname = $.trim(this.data[1]);
	this.firstname = firstname.split(' ');
	this.adress = $.trim(this.data[2]);
	searchadress = this.adress.split('lgh');
	searchadress = searchadress[0].split('Lgh');
	this.searchadress = searchadress[0];
	//some sneaky stuff to get the right value for postalnumber
	var lastitem = this.data.length-1;
	if(this.data[lastitem] === ""){
		var postalkey = this.data.length-2;
	}else{
		var postalkey = this.data.length-1
	}
	var postalnadress = $.trim(this.data[postalkey]);
	this.postal = postalnadress.substring(0,6);
	this.city = postalnadress.substring(7,postalnadress.length);
	return;
};

person.prototype.save = function(callback){
	console.log(this);

	var dataarray = []
	dataarray.push("entry.862681100="+this.firstname);
	dataarray.push("entry.1562637774="+this.lastname);
	dataarray.push("entry.1838427135="+this.OfficePhone);
	dataarray.push("entry.1797452570="+this.mobilePhone);
	dataarray.push("entry.1336105403="+this.company);
	dataarray.push("entry.1731685114="+this.email);
	dataarray.push("entry.282778658="+this.adress);
	dataarray.push("entry.1805054419="+this.adress2);
	dataarray.push("entry.1289811726="+this.city);
	dataarray.push("entry.792124068="+this.postal);
	dataarray.push("entry.1734642792="+this.notes);
	dataarray.push("entry.647986117="+this.website);
	dataarray.push("entry.915808908="+this.id);
	dataarray = dataarray.join('&');
    GM_xmlhttpRequest({
        method: "post",
        url: "https://docs.google.com/forms/d/1WZc_P9LhC6yDNRw-fw3vQeEn4KSNIrsNuyoxtSdJP4I/formResponse",
        headers: { "Content-type" : "application/x-www-form-urlencoded" },
        data: encodeURI(dataarray),
        onload: function(e) { callback(); }
	});
 };

function post(announcementID){
	this.url = 'https://poit.bolagsverket.se/poit/PublikSokKungorelse.do?method=presenteraKungorelse&diarienummer_presentera='+announcementID;
}

post.prototype.getData = function(callback){
	var myself = this;
	GM_xmlhttpRequest({
		method: "GET",
		url: this.url,
		onload: function(data) {
			myself.html = $.parseHTML(data.responseText);
			callback(); 
		}
	})
}

post.prototype.parsedata = function(callback){
	//find the right tablecell
	var content = $.trim($(this.html).find('.kungtext').text());
	var nicerows= {};
	//split each line into rows.
	var rows = content.split("\n");
	//use the stuff before the colon as key.
	for (var i=0; i<rows.length; i++) {
		var arr = rows[i].split(':');
		nicerows[arr[0]] = $.trim(arr[1]);
	};
	this.postDetails = nicerows;
}

post.prototype.addContact = function(){
	var rawdata = this.postDetails
	//add contact
	var names = ["Bolagsmän", "Komplementär(er)", "Innehavare", "Styrelseledamot, verkställande direktör", "Styrelseledamöter"];
	var contact;
	myself = this
	names.some(function(name){
		if (name in rawdata){
			myself.contact = (rawdata[name].split(', ').slice(0, 4));
			return true; // Breaks the loop
		}
	});
}

post.prototype.addCompany = function(){
	//@todo, behöver fixas för AB
	this.company = this.postDetails.Firma
	this.notes = this.postDetails.Verksamhet
}