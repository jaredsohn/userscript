// ==UserScript==
// @name           Super Travian Bot Script Injection
// @namespace      http://userscripts.org/scripts/show/63218
// @version        0.63
// @author         www.stbot.net
// @license        Creative Commons
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// @require        http://stbot.net/jquery.json-2.3.min.js
// @require        http://stbot.net/jquery.ajaxmanager.js
// @require        http://stbot.net/jquery.tabletojson.js
// @description    Test script for sending data from Travian to Super Bot Server
// @include        http://*travian*manual.php*
// @include        http://app.stbot.net/*
// ==/UserScript==

//How does this script works:
//
// 1 - A DUMMY page will be loaded in the iframe ( http://ts2.travian.com.br/manual.php?typ=4&gid=10?42&stbot=maininfo&stbotuuid=465465465465465 )
//
// 2 - There are 2 STBot parameters in the URL: stbot and stbotuuid, those are the keys for our system to work. The first one is what info the bot wants from travian. The second one is a unique key for security.
//
// 3 - Based on what info is sent in the stbot variable the script runs.
//
//FAQ : 
//
//Why do we need all this ? We need this due to the cross-domain policy. It is not allowed to access data from a external domain.
//
//Why do we use that dummy page ? That dummy page has MUCH less data than any other travian page, since every time we refresh the IFRAME all the Images, Javascripts and CSS are loaded, we better load this small page and load the content of the other page using ajax.
	
	var location = window.location.hostname;
	
	if(location == 'app.stbot.net'){
		
	console.log('URL Location: ',location);
	
	//alert(location);
	
	//Doesnt work... maybe ??
	//Set the greasemonkey variable that defines if the injector script is installed
	//GM_setValue("injector",true);
	
	
	
	}
	else{
		
	$('body').css('overflow', 'hidden');
	$('body').css('background-color', 'white');
	$('body').css('padding', '5px');
	$('body').html("<a id='btLoad'>Super Travian Bot !</a>");	
	
    var stbot = urlparameter( 'stbot' );
	var uid = urlparameter( 'uid' );
	var csrf_name = urlparameter( 'csrfname' );
	var csrf = urlparameter( 'csrf' );
	
	console.log('Uid: ',uid);
	
	if(stbot == 'login'){
		
		 //Variable with the travian server	
		 var travian_server = urlparameter( 'server' );
		 console.log('Travian Server: ',travian_server);
		
		$('body').html('Geting the login data...');
		
		$.manageAjax.add('getLoginData', {
		  async: false,
		  url: "http://"+travian_server+"/login.php",
		  dataType: "html",
		  success: function(data){
			
		  	var loginvalue = $(data).find('input[name$="login"]').val();
			
			console.log('Login Value',loginvalue);


		//I need to check if travian is already logged in before proceed
		
		$('body').html('Checking Credentials...');
		
		$.manageAjax.add('getLoginData', {
		  async: false,
		  url: "dorf1.php",
		  type: "POST",
		  data: {name : urlparameter('name'), password : urlparameter('password'), login : loginvalue, w : '800:600'},
		  dataType: "html",
		  success: function(data){
				
				//Get the Player Name
			    pname = $(data).find(".sideInfoPlayer a.signLink span.wrap");
				
				//console.log(pname);
				
				var response = [];
				
				var player = {name : pname.html()};
				
				response.player = player;
				
				//Get the Village List
				vlist = $(data).find("div#villageList div.list ul li.entry a");
				
				console.log('Lista de Vilas: ',vlist);
				
				var villages = [];
				
				//Loop over the Village List
				$.each(vlist, function(key, value) { 
				
					console.log('Vila #',key); 
					
					value = $(value);
					
				//Clean the 
					var idn = value.attr('href');
					console.log('Href: ',idn);
					var idnp = idn.replace("?newdid=", "");
					
					console.log('Vila ID#',idnp);
					var village = {name : value.html(), id : idnp};
					
					console.log('Village '+key+' : ',village);
					
					villages.push(village);
					
					
				});
				
				console.log('Villages List: ',villages);
				
				response.villages = villages;
				
				
				
				//var encoded = $.toJSON( response );
				
				//Bconsole.log('Objeto JSON: ',encoded);
				
				var playerjson = JSON.stringify(player, null, 2);
				
				var villagesjson = JSON.stringify(villages, null, 2);
				
				var jsonstring = '{"villages":'+villagesjson+',"player":'+playerjson+'}';
				
				console.log('Objeto com os dados: ',jsonstring);
				
				//GM_setValue(uid, jsonstring);
				
				$('body').html('Login Success. Sending data to server...');
				
				GM_xmlhttpRequest({
				  method: "POST",
				  url: "http://app.stbot.net/stbot/stbotinitdata/",
				  data: "data="+jsonstring+"&type=1&"+csrf_name+"="+csrf+"&uid="+uid,
				  headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				  },
				  onload: function(response) {
					
					//$('body').html(result.html()+', welcome to Super Travian Bot !');
					$('body').html(response.responseText);
				  }
				});
				
		  },
		  error: function(data){
			
			alert('ERROR!');  
		  }
		});
		
		//alert('bbb'+GM_getValue("class")); //OK
		
				  },
		  error: function(data){
			
			alert('ERROR!');  
		  }
		});
		
	}
	
	//Function to get resources data from DORF1.php
	//Data to be get - Resources - Resources Prodution
	if(stbot == 'dorf1info'){
		
		console.log('Requesting DORF1 info...');
		
		$('body').html('<div id="stbot" style="display:none;"><div/>Requesting DORF1 info...');
		
		//First we need to get the villages list			
		//The villages list is defined in the URL parameter "vlist"
		//Each ID value is separeted by ||
		
		//Variable with the travian server	
		 var vilalist = urlparameter( 'vlist' );
		 console.log('Villages List: ',vilalist);
		 
		 var vilas = vilalist.split('||');
		 console.log('Processed Villages List IDs: ',vilas);
		 
		 var villages = [];
		 
		 //Execute the function to get data from each city
		 //Loop over the Village List
		 $.each(vilas, function(key, value) { 
		 
		 	//Clean the variable with the building now list:
			unsafeWindow.bld = false;
			
			//and add an ajaxrequest s4 = Troups
			$.manageAjax.add('getHtmlAjaxData', {
				async: false,
				url: 'dorf1.php?newdid='+value,
				dataType: "html",
				success: function(html) {
					console.log('Got the Resources data from the vila id#'+value);
					
					//
					// We need to get the Current Amount of Resources and Amount that can be stored
					//
							
					//Get lumber
					var d1lumber = $(html).find("ul#res li.r1 p span#l1").html();
					var d1lumberarray = d1lumber.split('/');
					var d1lumbercurrent =  d1lumberarray[0];
					var d1lumbermax =  d1lumberarray[1];
					console.log('Lumber of Village #'+value+" = ", d1lumbercurrent+' of '+d1lumbermax);
					
					//Get clay
					var d1clay = $(html).find("ul#res li.r2 p span#l2").html();
					var d1clayarray = d1clay.split('/');
					var d1claycurrent =  d1clayarray[0];
					var d1claymax =  d1clayarray[1];
					console.log('Clay of Village #'+value+" = ", d1claycurrent+' of '+d1claymax);
					
					//Get iron
					var d1iron = $(html).find("ul#res li.r3 p span#l3").html();
					var d1ironarray = d1iron.split('/');
					var d1ironcurrent =  d1ironarray[0];
					var d1ironmax =  d1ironarray[1];
					console.log('Iron of Village #'+value+" = ", d1ironcurrent+' of '+d1ironmax);
					
					//Get Crop
					var d1crop = $(html).find("ul#res li.r4 p span#l4").html();
					var d1croparray = d1crop.split('/');
					var d1cropcurrent =  d1croparray[0];
					var d1cropmax =  d1croparray[1];
					console.log('crop of Village #'+value+" = ", d1cropcurrent+' of '+d1cropmax);
					
					//Get Crop Consuption
					var d1cropcon = $(html).find("ul#res li.r5 p span#l5").html();
					var d1cropconarray = d1cropcon.split('/');
					var d1cropconcurrent =  d1cropconarray[0];
					var d1cropconmax =  d1cropconarray[1];
					console.log('Crop Consumption of Village #'+value+" = "+ d1cropconcurrent +'. Crop Production: '+d1cropconmax);
					
					//
					//Now get the Resources production per hour
					//
					
					//Get lumber production
					var d1lumberpro = $(html).find("table#production tbody tr:eq(0) td.num").text().trim();
					console.log('Lumber production of Village #'+value+" = ", d1lumberpro);
					
					//Get clay production
					var d1claypro = $(html).find("table#production tbody tr:eq(1) td.num").text().trim();
					console.log('Clay production of Village #'+value+" = ", d1claypro);
					
					//Get iron production
					var d1ironpro = $(html).find("table#production tbody tr:eq(2) td.num").text().trim();
					console.log('Iron production of Village #'+value+" = ", d1ironpro);
					
					//Get crop production
					var d1croppro = $(html).find("table#production tbody tr:eq(3) td.num").text().trim();
					console.log('Crop production of Village #'+value+" = ", d1croppro);
					
					//
					// We need to get the field type for that city
					//
					// We can get that with the class of the DIV #village_map
					//
					
					//Get the field type
			   		ftype = $(html).find("div#content div#village_map");
					
					//The 3-3-3-9 has class f1
					//Crop 9
					if(ftype.hasClass('f1')){
						
						fieldtype = 1;
						console.log('Field Type: 3-3-3-9');
						
					}
					
					//The 3-4-5-6 has class f2
					if(ftype.hasClass('f2')){
						
						fieldtype = 2;
						console.log('Field Type: 3-4-5-6');
						
					}
					
					//The 4-4-4-6 has class f3
					//Default Village Type
					if(ftype.hasClass('f3')){
						
						fieldtype = 3;
						console.log('Field Type: 4-4-4-6');
						
					}
					
					//The 4-5-3-6 has class f4
					if(ftype.hasClass('f4')){
						
						fieldtype = 4;
						console.log('Field Type: 4-5-3-6');
						
					}
					
					//The 5-3-4-6 has class f5
					if(ftype.hasClass('f5')){
						
						fieldtype = 5;
						console.log('Field Type: 5-3-4-6');
						
					}
					
					//The 1-1-1-15 has class f6
					//Crop 15
					if(ftype.hasClass('f6')){
						
						fieldtype = 6;
						console.log('Field Type: 1-1-1-15');
						
					}
					
					//The 3-4-4-7 has class f7
					if(ftype.hasClass('f7')){
						
						fieldtype = 7;
						console.log('Field Type: 4-4-3-7');
						
					}
							
					
					//The 3-4-4-7 has class f8
					if(ftype.hasClass('f8')){
						
						fieldtype = 8;
						console.log('Field Type: 3-4-4-7');
						
					}
										
					//The 4-3-4-7 has class f9
					if(ftype.hasClass('f9')){
						
						fieldtype = 9;
						console.log('Field Type: 4-3-4-7');
						
					}
					
					//The 3-5-4-6 has class f10
					if(ftype.hasClass('f10')){
						
						fieldtype = 10;
						console.log('Field Type: 3-5-4-6');
						
					}
					
					//The 4-3-5-6 has class f11
					if(ftype.hasClass('f11')){
						
						fieldtype = 11;
						console.log('Field Type: 4-3-5-6');
						
					}
					
					//The 5-4-3-6 has class f12
					if(ftype.hasClass('f12')){
						
						fieldtype = 12;
						console.log('Field Type: 5-4-3-6');
						
					}

					
					console.log('Field Type ID : ',fieldtype);
					
					
					//
					// We need to get each field level
					//
					// We can get that from the HTML value of the div.level inside div#village_map
					// Because of fields lelvel 0 we need to get the build lvl by its postion
					//
					
					//Get the field type
			   		flevels = $(html).find("div#content div#village_map div.level");
				
					console.log('Field Levels: ',flevels);
					
						
					//Variable with the build lvl list: pattern: ID : LVL 
					var buildlist = { 'b1':0, 'b2':0, 'b3':0, 'b4':0, 'b5':0, 'b6':0, 'b7':0, 'b8':0, 'b9':0, 'b10':0, 'b11':0, 'b12':0, 'b13':0, 'b14':0, 'b15':0, 'b16':0, 'b17':0, 'b18':0};
					
					 //Loop over each field
					 $.each(flevels, function(key, value) { 
					 
					 	value = $(value);
						
						var left = value.css('left');
						var top = value.css('top');
						
						fid = 0;
						lvl = value.html();
						
						//Field id 1
						if(left == '179px' && top == '79px')
						{
							fid = 1;
							buildlist.b1 = lvl;
						}
						
						//Field id 2
						if(left == '269px' && top == '80px')
						{
							fid = 2;
							buildlist.b2 = lvl;
						}
												//Field id 3
						if(left == '337px' && top == '92px')
						{
							fid = 3;
							buildlist.b3 = lvl;
						}
												//Field id 4
						if(left == '121px' && top == '118px')
						{
							fid = 4;
							buildlist.b4 = lvl;
						}
												//Field id 5
						if(left == '234px' && top == '131px')
						{
							fid = 5;
							buildlist.b5 = lvl;
						}
												//Field id 6
						if(left == '291px' && top == '138px')
						{
							fid = 6;
							buildlist.b6 = lvl;
						}
												//Field id 7
						if(left == '376px' && top == '136px')
						{
							fid = 7;
							buildlist.b7 = lvl;
						}
												//Field id 8
						if(left == '61px' && top == '169px')
						{
							fid = 8;
							buildlist.b8 = lvl;
						}
												//Field id 9
						if(left == '142px' && top == '170px')
						{
							fid = 9;
							buildlist.b9 = lvl;
						}
												//Field id 10
						if(left == '332px' && top == '170px')
						{
							fid = 10;
							buildlist.b10 = lvl;
						}
												//Field id 11
						if(left == '419px' && top == '170px')
						{
							fid = 11;
							buildlist.b11 = lvl;
						}
												//Field id 12
						if(left == '69px' && top == '230px')
						{
							fid = 12;
							buildlist.b12 = lvl;
						}
												//Field id 13
						if(left == '142px' && top == '220px')
						{
							fid = 13;
							buildlist.b13 = lvl;
						}
												//Field id 14
						if(left == '278px' && top == '256px')
						{
							fid = 14;
							buildlist.b14 = lvl;
						}
												//Field id 15
						if(left == '400px' && top == '225px')
						{
							fid = 15;
							buildlist.b15 = lvl;
						}
												//Field id 16
						if(left == '173px' && top == '310px')
						{
							fid = 16;
							buildlist.b16 = lvl;
						}
												//Field id 17
						if(left == '264px' && top == '315px')
						{
							fid = 17;
							buildlist.b17 = lvl;
						}
												//Field id 18
						if(left == '354px' && top == '292px')
						{
							fid = 18;
							buildlist.b18 = lvl;
						}
						
						console.log('Field ID#'+fid+' = ', lvl);	
					 
					 });
					 
					console.log('Build List = ', buildlist);
					
					console.log('Got the Buildings data from the vila id#'+value);
					//console.log(html);
					
	
					//
					// Now we need to get the currently building construction list
					//
					// We just need to read the script under #content
					//
					
					//Remove the HEAD content of the HTML response
					var bbody = html.split("</head>");
					var bcontent = bbody[1];
					//Parse th HTML into the DOM
					$('#stbot').html(bcontent);
					//Get the variable BLD from the HTML response
					var buildingnowvalue = unsafeWindow.bld;
					
					//Remaining Timer 1
					var d1crop = $(html).find("ul#res li.r4 p span#l4").html();
					
					if (buildingnowvalue[0]){
						
						//Remaining Time 1
						var rtime1 = $(html).find("#timer1").html();
						
						buildingnowvalue[0].timer = rtime1;
					}
					
					if (buildingnowvalue[1]){
						
						//Remaining Time 1
						var rtime2 = $(html).find("#timer2").html();
						
						buildingnowvalue[1].timer = rtime2;
					}
					
					console.log('Object with the building now list: ',buildingnowvalue);
					
					//Create the array with the village data
					var village = {id : value, fieldtype :  fieldtype, buildlist : buildlist, buildingnow : buildingnowvalue, lumber : d1lumbercurrent, lumbermax : d1lumbermax, clay : d1claycurrent, claymax : d1claymax, iron : d1ironcurrent, ironmax : d1ironmax, crop : d1cropcurrent, cropmax : d1cropmax, croptotalprod : d1cropconmax, cropcons : d1cropconcurrent, lumberpro : d1lumberpro, claypro : d1claypro, ironpro : d1ironpro, croppro : d1croppro };
					
					
					//Add the array into the variable
					villages.push(village);
					
												  
				},
				error: function() {
															   
					console.log('ERRO!');
															  
				}
														  
			  });//End AJAX Function
					
		  });//End each function
		 
		 ////Now we need to encode the villages variable data as JSON to send it to stbot
		 var villagesjson = JSON.stringify(villages, null, 2);
				
		 console.log('Objeto com os dados: ',villagesjson);
		 
		 //Send the JSON string to server
		 GM_xmlhttpRequest({
		  method: "POST",
		  url: "http://app.stbot.net/stbot/stbotserver/",
		  data: "data="+villagesjson+"&type=2&"+csrf_name+"="+csrf+"&uid="+uid,
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  onload: function(response) {
					
			//$('body').html(result.html()+', welcome to Super Travian Bot !');
			$('body').html(response.responseText);
			//console.log('Response from server after sending the Resources data: ', response.responseText);
		  }
		 });
				
		
		//alert(GM_getValue("class")); //OK
	}
	
	//Function to get resources data from DORF2.php (Just Updating)
	//Buildings List from DORF2.php
	if(stbot == 'dorf2info'){
		
		console.log('Requesting DORF2 info...');
		
		$('body').html('Requesting DORF2 info...');
		
		//First we need to get the villages list			
		//The villages list is defined in the URL parameter "vlist"
		//Each ID value is separeted by ||
		
		//Variable with the travian server	
		 var vilalist = urlparameter( 'vlist' );
		 console.log('Villages List: ',vilalist);
		 
		 var vilas = vilalist.split('||');
		 console.log('Processed Villages List IDs: ',vilas);
		 
		 var villages = [];
		 
		 //Execute the function to get data from each city
		 //Loop over the Village List
		 $.each(vilas, function(key, value) { 
			
			//and add an ajaxrequest s4 = Troups
			$.manageAjax.add('getHtmlAjaxData', {
				async: false,
				url: 'dorf2.php?newdid='+value,
				dataType: "html",
				success: function(html) {
					console.log('Got the DORF2 data from the vila id#'+value);
					//console.log(html);
					
					//
					// We need to get the Current Amount of Resources and Amount that can be stored
					//
					
					
					//Get lumber
					var d1lumber = $(html).find("ul#res li.r1 p span#l1").html();
					var d1lumberarray = d1lumber.split('/');
					var d1lumbercurrent =  d1lumberarray[0];
					var d1lumbermax =  d1lumberarray[1];
					console.log('Lumber of Village #'+value+" = ", d1lumbercurrent+' of '+d1lumbermax);
					
					//Get clay
					var d1clay = $(html).find("ul#res li.r2 p span#l2").html();
					var d1clayarray = d1clay.split('/');
					var d1claycurrent =  d1clayarray[0];
					var d1claymax =  d1clayarray[1];
					console.log('Clay of Village #'+value+" = ", d1claycurrent+' of '+d1claymax);
					
					//Get iron
					var d1iron = $(html).find("ul#res li.r3 p span#l3").html();
					var d1ironarray = d1iron.split('/');
					var d1ironcurrent =  d1ironarray[0];
					var d1ironmax =  d1ironarray[1];
					console.log('Iron of Village #'+value+" = ", d1ironcurrent+' of '+d1ironmax);
					
					//Get Crop
					var d1crop = $(html).find("ul#res li.r4 p span#l4").html();
					var d1croparray = d1crop.split('/');
					var d1cropcurrent =  d1croparray[0];
					var d1cropmax =  d1croparray[1];
					console.log('crop of Village #'+value+" = ", d1cropcurrent+' of '+d1cropmax);
					
					//Get Crop Consuption
					var d1cropcon = $(html).find("ul#res li.r5 p span#l5").html();
					var d1cropconarray = d1cropcon.split('/');
					var d1cropconcurrent =  d1cropconarray[0];
					var d1cropconmax =  d1cropconarray[1];
					console.log('Crop Consumption of Village #'+value+" = "+ d1cropconcurrent +'. Crop Production: '+d1cropconmax);
					
					//
					//Now get the Resources production per hour
					//
					
					//Get lumber production
					var d1lumberpro = $(html).find("table#production tbody tr:eq(0) td.num").text().trim();
					console.log('Lumber production of Village #'+value+" = ", d1lumberpro);
					
					//Get clay production
					var d1claypro = $(html).find("table#production tbody tr:eq(1) td.num").text().trim();
					console.log('Clay production of Village #'+value+" = ", d1claypro);
					
					//Get iron production
					var d1ironpro = $(html).find("table#production tbody tr:eq(2) td.num").text().trim();
					console.log('Iron production of Village #'+value+" = ", d1ironpro);
					
					//Get crop production
					var d1croppro = $(html).find("table#production tbody tr:eq(3) td.num").text().trim();
					console.log('Crop production of Village #'+value+" = ", d1croppro);
					

					//
					// We need to get each field level
					//
					// We can get that from the HTML value of the div.level inside div#village_map
					// Because of fields lelvel 0 we need to get the build lvl by its postion
					//
					
					//Get the buildings list
			   		blevels = $(html).find("div#content div#village_map img.building");
				
					console.log('Building Levels: ',blevels);
					
						
					//Variable with the build lvl list: pattern: ID : LVL 
					var buildlist = { 'b19':{'lvl' : 0, 'aid' : 0}, 'b20':{'lvl' : 0, 'aid' : 0}, 'b21':{'lvl' : 0, 'aid' : 0}, 'b22':{'lvl' : 0, 'aid' : 0}, 'b23':{'lvl' : 0, 'aid' : 0}, 'b24':{'lvl' : 0, 'aid' : 0}, 'b25':{'lvl' : 0, 'aid' : 0}, 'b26':{'lvl' : 0, 'aid' : 0}, 'b27':{'lvl' : 0, 'aid' : 0}, 'b28':{'lvl' : 0, 'aid' : 0}, 'b29':{'lvl' : 0, 'aid' : 0}, 'b30':{'lvl' : 0, 'aid' : 0}, 'b31':{'lvl' : 0, 'aid' : 0}, 'b32':{'lvl' : 0, 'aid' : 0}, 'b33':{'lvl' : 0, 'aid' : 0}, 'b34':{'lvl' : 0, 'aid' : 0}, 'b35':{'lvl' : 0, 'aid' : 0}, 'b36':{'lvl' : 0, 'aid' : 0}, 'b37':{'lvl' : 0, 'aid' : 0}, 'b38':{'lvl' : 0, 'aid' : 0}, 'b39':{'lvl' : 0, 'aid' : 0}, 'b40':{'lvl' : 0, 'aid' : 0}};
					
					 //Loop over each field
					 $.each(blevels, function(key, value) { 
					 
					 	value = $(value);
						
						var left = value.css('left');
						var top = value.css('top');
						
						fid = 0;
						
						//Field id 19
						if(left == '81px' && top == '57px')
						{
							fid = 19;
						}
						
						//Field id 2
						else if(left == '174px' && top == '15px')
						{
							fid = 20;
						}
												//Field id 3
						else if(left == '261px' && top == '-3px')
						{
							fid = 21;
						}
												//Field id 4
						else if(left == '354px' && top == '26px')
						{
							fid = 22;
						}
												//Field id 5
						else if(left == '428px' && top == '69px')
						{
							fid = 23;
						}
												//Field id 6
						else if(left == '42px' && top == '107px')
						{
							fid = 24;
						}
												//Field id 7
						else if(left == '485px' && top == '119px')
						{
							fid = 25;
						}
												//Field id 8
						else if(left == '249px' && top == '71px')
						{
							fid = 26;
						}
												//Field id 9
						else if(left == '68px' && top == '241px')
						{
							fid = 27;
						}
												//Field id 10
						else if(left == '31px' && top == '167px')
						{
							fid = 28;
						}
												//Field id 11
						else if(left == '448px' && top == '170px')
						{
							fid = 29;
						}
												//Field id 12
						else if(left == '153px' && top == '183px')
						{
							fid = 30;
						}
												//Field id 13
						else if(left == '155px' && top == '110px')
						{
							fid = 31;
						}
												//Field id 14
						else if(left == '227px' && top == '230px')
						{
							fid = 32;
						}
												//Field id 15
						else if(left == '476px' && top == '238px')
						{
							fid = 33;
						}
												//Field id 16
						else if(left == '153px' && top == '300px')
						{
							fid = 34;
						}
												//Field id 17
						else if(left == '295px' && top == '391px')
						{
							fid = 35;
						}
												//Field id 18
						else if(left == '404px' && top == '254px')
						{
							fid = 36;
						}
						
						else if(left == '241px' && top == '333px')
						{
							fid = 37;
						}
						
						else if(left == '365px' && top == '318px')
						{
							fid = 38;
						}
						
						else //If it doesnt have the LEFT or TOP attribute and has the class building. It is Rally Point
						{
							fid = 39;
						}
						
						//FID 40 = WALL !
						
						lvl = $(html).find("div#content div#village_map #levels .aid"+fid).html();
						
						//Get the Building Type
						var gid = value.removeClass('building').attr('class');
						
						//Set lvl = 0 if NULL
						if(lvl == null) lvl=0;
						
						buildlist['b'+fid].lvl = lvl;
						
						buildlist['b'+fid].aid = gid;
						
						console.log('Build ID#'+fid+' Lvl = '+lvl+', GID = ', gid);	
					 
					 });
					 
					console.log('Build List = ', buildlist);
					
					console.log('Got the Buildings data from the vila id#'+value);
					
					//
					// Now we need to get the currently building construction list
					//
					// We just need to read the script under #content
					//
					
					//Remove the HEAD content of the HTML response
					var bbody = html.split("</head>");
					var bcontent = bbody[1];
					//Parse th HTML into the DOM
					$('#stbot').html(bcontent);
					//Get the variable BLD from the HTML response
					var buildingnowvalue = unsafeWindow.bld;
					
					//Remaining Timer 1
					var d1crop = $(html).find("ul#res li.r4 p span#l4").html();
					
					if (buildingnowvalue[0]){
						
						//Remaining Time 1
						var rtime1 = $(html).find("#timer1").html();
						
						buildingnowvalue[0].timer = rtime1;
					}
					
					if (buildingnowvalue[1]){
						
						//Remaining Time 1
						var rtime2 = $(html).find("#timer2").html();
						
						buildingnowvalue[1].timer = rtime2;
					}
					
					console.log('Object with the building now list: ',buildingnowvalue);
					
					//Create the array with the village data
					var village = {id : value, buildlist : buildlist, buildingnow : buildingnowvalue, lumber : d1lumbercurrent, lumbermax : d1lumbermax, clay : d1claycurrent, claymax : d1claymax, iron : d1ironcurrent, ironmax : d1ironmax, crop : d1cropcurrent, cropmax : d1cropmax, croptotalprod : d1cropconmax, cropcons : d1cropconcurrent, lumberpro : d1lumberpro, claypro : d1claypro, ironpro : d1ironpro, croppro : d1croppro };
					
					
					//Add the array into the variable
					villages.push(village);
					
												  
				},
				error: function() {
															   
					console.log('ERRO!');
															  
				}
														  
			  });//End AJAX Function
					
		  });//End each function
		 
		 ////Now we need to encode the villages variable data as JSON to send it to stbot
		 var villagesjson = JSON.stringify(villages, null, 2);
				
		 console.log('Objeto com os dados: ',villagesjson);
		 
		 //Send the JSON string to server
		 GM_xmlhttpRequest({
		  method: "POST",
		  url: "http://app.stbot.net/stbot/stbotserver/",
		  data: "data="+villagesjson+"&type=2&"+csrf_name+"="+csrf+"&uid="+uid,
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  onload: function(response) {
					
			//$('body').html(result.html()+', welcome to Super Travian Bot !');
			$('body').html(response.responseText);
			//console.log('Response from server after sending the Resources data: ', response.responseText);
		  }
		 });
		 
		//alert(GM_getValue("class")); //OK
	}
	
}

//
//Function to send ajax request
//
//Author: Gabriel Paiva
//Date: 27/02/2012

function getHtmlAjaxData(url)
{
	
	//console.log('Get AJAX Data in: ',url);
	
	//and add an ajaxrequest 
	$.manageAjax.add('getHtmlAjaxData', {
	  url: url,
	  async: false,
	  dataType: "text",
	  success: function(html) {
		  
		  console.log('SUCCESS! Got data from AJAX request: ', html);
		  return html;
		  
	  },
	  error: function() {
		  
		  console.log('ERRO!');
		  return false;
		  
	  }
	  
	});
}

//
//Function to give Parameter data based on URL
//
//Author: Gabriel Paiva
//Date: 27/02/2012

function urlparameter( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

//
//Function to dynamically load a Javascript or CSS file into the file
//
//Author: Gabriel Paiva
//Date: 27/02/2012
//
//Examples:
//
//loadjscssfile("javascript.php", "js") //dynamically load "javascript.php" as a JavaScript file
//loadjscssfile("mystyle.css", "css") ////dynamically load and add this .css file
//
function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

/**
 * Generates an unique ID. This is 99.99% unique since it takes the current time and 5 random numbers.
 * The only way a user would be able to get the same ID is if the two persons at the same exact milisecond manages
 * to get 5 the same random numbers between 0-65535 it also uses a counter so each call will be guaranteed to be page unique.
 * It's more probable for the earth to be hit with an ansteriod. 
 *
 * @method guid
 * @return {String} Virtually unique id.
 */

function uid() {

    var count = 0

    var guid = new Date().getTime().toString(32),
        i;

    for (i = 0; i < 5; i++) {
        guid += Math.floor(Math.random() * 65535).toString(32);
    }

    return guid + (count++).toString(32);
}

//Help functiom that will clean a string removing spaces
String.prototype.trim = function()
{
	return this.replace(/^\s+|\s+$/g,"");
}