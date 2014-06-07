// ==UserScript==
// @name		draugiem.lv mass letter personalization
// @version		1
// @namespace		uudens
// @description		Personalize mass draugiem.lv letters
// @author		Kārlis Biķis (uudens.lv)
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include		http://www.draugiem.lv/messages/?tab=new
// @include		http://www.draugiem.lv/messages/?tab=new#
// @include		http://www.draugiem.lv/messages/?tab=inbox
// ==/UserScript==


(function()
{
	//
	// variables
	//
	var friendsString;
	var friends;
	
	//
	// functions
	//
	
	// function to get first name from full name
	var getFirstName = function( $fullName ){ return $fullName.split(" ").shift() };
	
	// function to return the vocative form of a latvian name
	var getVocative = function( $name )
	{
 		// some of the formation rules can be found here: http://www.liis.lv/latval/morfol/lietv-dekl.htm
		
	 	// capitalize first letter, and make others lowercase
		var s = $name.charAt(0).toUpperCase() + $name.toLowerCase().slice(1);

		// 2nd declination
		if( s.match(/is$/) ) return s.slice( 0, -1 ); // ex.: Kārlis to Kārli
		if( s.match(/^(mēness|meeness|akmens|asmens|rudens|ūdens|uudens|zibens|suns|sāls|saals)$/i) ) return s.slice(0, -1) + "i"; // ex.: Asmens to Asmeni
		
		// 3rd declination
		if( s.match(/us$/) ) return s; // ex.: Mikus to Mikus
		
		// 1st declination
		if( s.match(/(s|š)$/) ) return s.slice( 0, -1 ); // ex.: Artūrs to Artūr
		
		// others
		return s;
	}
	
	// function to do all the work once a recipient list has been stored in memory
	var personalize = function()
	{
		// if a personalized letter has just been sent, redirect to the "new message" page
		if( window.location.href == "http://www.draugiem.lv/messages/?tab=inbox" )
		{
			window.location.href = "http://www.draugiem.lv/messages/?tab=new";
			return;
		}
		
		// decode json friend list
		friends = unsafeWindow.JSON.decode( friendsString );
		
		// check if it's not empty
		if (friends[0].name == undefined )
		{
			friendsString = "";
			return;
		}
		
		var friend = friends.shift();
		var friendVoc = getVocative( getFirstName(friend.name) );
		var newFriendsString = unsafeWindow.JSON.encode( friends );
		
		// get message
		var msg = GM_getValue("msg").replace(/%draugs/gi, friendVoc );
		
		// fill the fields
		$('body').append('<script type="text/javascript">$("div.multiACInput > input").prop("multi_ac").addValue({ caption: "' + friend.name + '", value: "' + friend.id + '" });</script>');
		$('input#mailSubject').val( GM_getValue("subject").replace(/%draugs/gi, friendVoc ) );
		$('textarea#mailBody').val( msg );
		
		// show send details above form
		$('form#mailForm').prepend('Notiek automātiska vēstules aizpildīšana cilvēkam "' + friend.name + '". Bez viņa, saņēmēju sarakstā atlikuši vēl <a href="#" onclick="javascript:showCurrentList()">' + friends.length + ' cilvēki</a>.<br />Pārbaudi, vai vēstule aizpildīta pareizi, un spied "Sūtīt". Pēc tam automātiski tiks aizpildīti dati nākošajam cilvēkam saņēmēju sarakstā.<br /><br />');
		
		// disable the recipient input
		$('div.multi_ac div.multiACInput, div.multi_ac a.closeIcon').hide();
		$('div.multi_ac div.multiACValue div').css('margin-right','4px');
	
		// listen to form submit
		$('form#mailForm').submit(function( $event )
		{
			// re-save names
			setTimeout( function()
			{
				GM_setValue("friends", newFriendsString);
			}, 0 );
		});
	}
	
	var init = function()
	{
		// check if letter sending in progress
		friendsString = GM_getValue("friends");
		friendsString = friendsString == "[]" ? undefined : friendsString;
		if( friendsString ) personalize();
		
		// add links
		if( !friendsString ) $('td.leftButtons').eq(0).append('<a href="#" onclick="javascript:sendPersonalized()">Sūtīt visiem personalizēti</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="javascript:help()">Kā personalizēt?</a>');
 		else $('td.leftButtons').eq(0).append('<a href="#" onclick="javascript:cancelPersonalized()">Atcelt personalizēto sūtīšanu</a>');
	}
	
	
	//
	// unsafe window functions
	//
	
	// function for saving data
	unsafeWindow.sendPersonalized = function()
	{
		// determine name/id pairs for friends
		var names = [];
		$('div.multiACValue > div').each( function( index, el )
		{
			names.push( $(this).text() );
		});
		var ids = $('input[name="mail[receivers]"]').val().split(",");
		var friends = [];
		for( var i in ids ) friends.push({ name: names[i], id: ids[i] });
		var friendsString = unsafeWindow.JSON.encode( friends );
		
		// determine subject
		var subject = $('input#mailSubject').val();
		
		// determine message
		var msg = $('textarea#mailBody').val();


		// store this determined data
		setTimeout( function()
		{
			GM_setValue("friends", friendsString ); // store name/id pairs for friends in JSON string format
			GM_setValue("subject", subject );
			GM_setValue("msg", msg );
		}, 0);
		
		
		// refresh window to take action
		window.location.reload();
		
		return false;
	}
	
	// cancelling function
	unsafeWindow.cancelPersonalized = function()
	{
		// delete values
		setTimeout( function()
		{
			GM_deleteValue("friends");
			GM_deleteValue("subject");
			GM_deleteValue("msg");
		}, 0);
		
		// reload window
		window.location.reload();
		
		return false;
	}
	
	// function to show current recipient list
	unsafeWindow.showCurrentList = function()
	{
		var str = '';
		for( var i in friends ) str += friends[i].name + ', ';
		
		if( str == '' )
		{
			alert('Šis ir pēdējais cilvēks sarakstā');
			return false;
		}
		
		str = str.slice(0,-2);
		alert('Pašreizējais saņēmēju saraksts. Sarakstā redzami cilvēki, kuriem vēl jānosūta vēstule. Tie, kam vēstule jau nosūtīta, sarakstā vairs neuzrādās.\n\n' + str);
		
		return false;
	}
	
	// help alert
	unsafeWindow.help = function()
	{
		alert('Kā personalizēt vēstuli:\n\n1. Kā parasti, izvēlies visus adresātus, ieraksti vēstules Tematu\n2. Vēstules tekstā, vietā, kur vēlies, lai automātiski ievietotu tava drauga vārdu, raksti "%draugs". Vēstules teksta piemērs:\n\nČau, %draugs!\nIelūdzu tevi, %draugs, uz savu dzimšanas dienu piektdien 19:00 :)\n\n3.NEspied "Sūtīt", bet gan \n4.Spied "Sūtīt visiem personalizēti"');
		
		return false;
	}

	// call init
	init();
	
})();