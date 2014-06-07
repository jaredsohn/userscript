// ==UserScript==
// @name        Tribalwars Auto Builder
// @namespace   atutility.com
// @include     http://en64.tribalwars.net/*
// @grant       none
// @version     1
// ==/UserScript==

var screen = getURLParameter("screen");
var trycmd= getURLParameter("try");
var mode= getURLParameter("mode");
var myid= getURLParameter("village");
var buildings= document.getElementById("buildings");

var village_options="";
var villages= localStorage.getItem("villages");
if( villages != null){
	
	var vs= villages.split(",");
	var get_resource = sessionStorage.getItem("get_resource");
	
	if( vs.length >1 ){
		village_options="<option value=''>Select village...</option>";
		for( var i=0; i<vs.length; i++){
			var vid= vs[i].substr(0, vs[i].indexOf("="));
			var vtext= vs[i].substr(vs[i].indexOf("=")+1);
			if( vid== get_resource){
				village_options+="<option value='"+vid+"' selected>"+vtext+"</option>";
			}else{
				village_options+="<option value='"+vid+"'>"+vtext+"</option>";
			}
		}
		
	}
}
	
if( buildings){
	
	var html='<button id="button_get_resource">Get Resource From</button>'+'<select id="resource_villages"  >'+village_options+"</select>";
	if( sessionStorage.getItem("auto_build") == 1){
		html+='<button id="button_auto_builder">Auto Building</button>';
	}else {
		html+='<button id="button_auto_builder">Start Auto Build</button>';
	}
	
	if( sessionStorage.getItem("post_build") == 1){
		html+='<button id="button_post_builder">Post Building</button>';
	}else {
		html+='<button id="button_post_builder">Start Post Build</button>';
	}
	
	html+='Message:<span id="auto_build_message"></span>';
	jQuery("#contentContainer").after(html);
	
	jQuery("#button_get_resource").click(function(){
		sessionStorage.setItem("get_resource", jQuery("#resource_villages").val());
	});
	jQuery("#button_auto_builder").click(function(){
		if( $(this).text() == "Start Auto Build"){
			sessionStorage.setItem("auto_build", 1);
			jQuery("#button_auto_builder").text("Auto Building");
			autoreload(10*1000);
		}else{
			sessionStorage.setItem("auto_build", 0);
			jQuery("#button_auto_builder").text("Start Auto Build");
		}
		
	});
	
	jQuery("#button_post_builder").click(function(){
		if( $(this).text() == "Start Post Build"){
			sessionStorage.setItem("post_build", 1);
			jQuery("#button_post_builder").text("Post Building");
			autoreload(10*1000);
		}else{
			sessionStorage.setItem("post_build", 0);
			jQuery("#button_post_builder").text("Start Post Build");
		}
		
	});
	
	if( sessionStorage.getItem("post_build")==1 && $("#buildqueue > tr").size() <7){
		var buildings= unsafeWindow.game_data.village.buildings;
		buildings= update_build_queue(buildings);
		
		var next_building="";
		if( next_building == ""){
			if( parseInt(buildings.wall) < 20 ){
				next_building= "wall";
			}
		}
		
		if( next_building == "" ){
			if( parseInt(buildings.market) < 21 ){
				next_building= "market";
			}
		}
		
		if( next_building == ""){
			if( parseInt(buildings.barracks) <20){
				next_building="barracks";
			}else if( parseInt(buildings.stable) <15){
				next_building="stable";
			}else if( parseInt(buildings.garage) <10){
				next_building="garage";
			}
		}
		if( next_building == ""){
			next_building = get_stone_wood_iron(30);
		}
		if( next_building == ""){
			if( parseInt(buildings.storage) < 30 ){
				next_building= "storage";
			}
		}
		
		
		if( document.getElementById( "main_buildlink_"+next_building)){
			window.setTimeout( function(){jQuery("#main_buildlink_"+next_building).click();  }, 10000);
			autoreload(60*1000); //reload in 60 seconds to decide if need to build next building
		}
	}
	
	//if there's less than 2 build
	if( sessionStorage.getItem("auto_build") == 1 && $("#buildqueue > tr").size() <7){
		//decide the next build 
		var buildings= unsafeWindow.game_data.village.buildings;
		buildings= update_build_queue(buildings);
		
		var next_building="";
		if( next_building==""){
			next_building= get_basic_building( 5);
		}
		if( next_building==""){
			next_building= get_main_building( 10 );
		}
		if( next_building == ""){
			next_building = get_stone_wood_iron(10);
		}
		if( next_building==""){
			next_building= get_main_building( 15 );
		}
		
		
		if( next_building == ""){
			if( parseInt(buildings.main) < 20){
				next_building="main";
			}else if( parseInt(buildings.storage) < 24 ){
				next_building= "storage";
			}
		}
		if( next_building == ""){
			next_building = get_stone_wood_iron(15);
		}
		
		if( next_building == ""){
			if( parseInt(buildings.barracks) <10){
				next_building="barracks";
			}else if( parseInt(buildings.smith) <10){
				next_building="smith";
			}else if( parseInt(buildings.stable) <10){
				next_building="stable";
			}else if( parseInt(buildings.garage) <5){
				next_building="garage";
			}
		}
		
		
		
		if( next_building == "" ){
			if( parseInt(buildings.farm) < 20){
				next_building="farm";
			}else if( parseInt(buildings.market) < 10 ){
				next_building= "market";
			}
		}
		if( next_building == ""){
			if( parseInt(buildings.smith) < 15){
				next_building="smith";
			}
		}
		if( next_building == "" ){
			if( parseInt(buildings.farm) < 25){
				next_building="farm";
			}
		}
		
		if( next_building == ""){
			next_building = get_stone_wood_iron(25);
		}
		if( next_building == ""){
			if( parseInt(buildings.storage) < 25 ){
				next_building= "storage";
			}
		}
		
		/*
		if( next_building == ""){
			if( parseInt(buildings.barracks) <15){
				next_building="barracks";
			}else if( parseInt(buildings.stable) <10){
				next_building="stable";
			}
		}*/
		if( next_building == ""){
			if( parseInt(buildings.smith) < 20){
				next_building="smith";
			}
		}
		if( next_building == ""){
			if( parseInt(buildings.storage) < 26 ){
				next_building= "storage";
			}
		}
		if( next_building == "" ){
			if( parseInt(buildings.farm) < 28){
				next_building="farm";
			}
		}
		if( next_building == ""){
			next_building = get_stone_wood_iron(30);
		}
		if( next_building == ""){
			if( parseInt(buildings.storage) < 27 ){
				next_building= "storage";
			}
		}
		if( next_building == "" ){
			if( parseInt(buildings.farm) < 29){
				next_building="farm";
			}
		}
		if( next_building == "" ){
			if( parseInt(buildings.snob) < 1){
				next_building="snob";
			}
		}
		if( next_building == "" ){
			if( parseInt(buildings.farm) < 30){
				next_building="farm";
			}
		}
		
		
		
		console.log("Going to upgrade:"+next_building);
		jQuery("#auto_build_message").text( "Going to upgrade "+next_building);
		
		//if the build link is there, then we click it
		if( document.getElementById( "main_buildlink_"+next_building)){
			window.setTimeout( function(){jQuery("#main_buildlink_"+next_building).click();  }, 10000);
			autoreload(60*1000); //reload in 60 seconds to decide if need to build next building
		}else{
			//decide the resource and get it from the provider
			console.log("Not enough resource");
			var res= unsafeWindow.game_data.village.res;
			var my_wood= res[0];
			var my_stone= res[2];
			var my_iron= res[4];
			var my_storage= parseInt(res[6]);
			
			var n_wood= parseInt(jQuery("#main_buildrow_"+next_building).children('td').eq(1).text());
			var n_stone= parseInt(jQuery("#main_buildrow_"+next_building).children('td').eq(2).text());
			var n_iron= parseInt(jQuery("#main_buildrow_"+next_building).children('td').eq(3).text());
			
			var wood=0; var stone=0; var iron=0;
			
			if( n_wood > my_wood){wood= n_wood-my_wood; }
			if( n_stone > my_stone){  stone= n_stone-my_stone; }
			if( n_iron > my_iron){ iron= n_iron- my_iron; }
			
			/*
			my_storage= Math.round(my_storage*0.4);
			if( n_wood <my_storage )wood= my_storage- my_wood;
			if( n_stone<my_storage )stone=  my_storage- my_stone;
			if( n_iron<my_storage )iron=  my_storage- my_iron;*/
				
			console.log("Need Wood:"+wood+" Stone:"+stone+" Iron"+iron);
			
			if( wood >0 || stone>0 || iron>0){
				jQuery("#auto_build_message").text(jQuery("#auto_build_message").text()+" Need Wood:"+wood+" Stone:"+stone+" Iron:"+iron);
				var get_resource = sessionStorage.getItem("get_resource");
				if( get_resource){
					var coord= unsafeWindow.game_data.village.coord;
					var w= window.open("http://en64.tribalwars.net/game.php?village="+get_resource+"&screen=market", "auto_transfer_"+coord+"_"+wood+"|"+stone+"|"+iron);
					//autoreload(30*60*1000);
					window.name="auto_builder";
					window.setTimeout( function(){window.location= "http://en64.tribalwars.net/game.php?village="+myid+"&screen=market"; }, 60000);
				}
			}
		}
	}
	
	/*else if (jQuery("#buildqueue tr").length >=3){
		jQuery("#auto_build_message").text( "Queue is full!");
		
		//fill in resources
		
		var res= unsafeWindow.game_data.village.res;
		var my_wood= res[0];
		var my_stone= res[2];
		var my_iron= res[4];
		var my_storage= parseInt(res[6]);
		my_storage= Math.round(my_storage*0.3);
		var wood=0; var stone=0; var iron=0;
		if(  my_wood <my_storage )	wood= my_storage- my_wood;
		if( my_stone < my_storage) 	stone= my_storage- my_stone;
		if( my_iron < my_storage) 	iron= my_storage- my_iron;
		
		console.log("Need Wood:"+wood+" Stone:"+stone+" Iron"+iron);
		jQuery("#auto_build_message").text("Queue is full! Fill in resource Wood:"+wood+" Stone:"+stone+" Iron:"+iron);
		if( wood >0 || stone>0 || iron>0){
			var get_resource = sessionStorage.getItem("get_resource");
			if( get_resource){
				var coord= unsafeWindow.game_data.village.coord;
				var w= window.open("http://en64.tribalwars.net/game.php?village="+get_resource+"&screen=market", "auto_transfer_"+coord+"_"+wood+"|"+stone+"|"+iron);
				autoreload(60*60*1000);
				
			}
		}
	}*/
}

var production_table =document.getElementById("production_table");
if( production_table){
	var html="";
	
	var buildings={"main":"HQ", "train":"Recruit", "snob":"Academy", "smith":"Smithy", "place":"Rally point", "market":"Market", "map":"Map", "easy_farmer":"Easy Farmer", "own_offer":"Own Offers", "flags":"Flags"};
	html="";
	
	var options="";
	for( b in buildings){
		options+= "<option value='"+b+"'>"+buildings[b]+"</option>";
	}
	html= "Building: <select id='building'>"+options+"</select>";
	html+="<button id='button_building_link'>Building Link</button>";
	html+="<button id='get_merchant_info'>Get Merchants Info</button>";
	html+="<button id='get_settlers'>Get Settlers</button>";
	jQuery("#production_table").after(html);
	jQuery("#button_building_link").click(function(){
		var building= jQuery("#building").val();
		var building_name= jQuery("#building option:selected").text();
		for( var i=1; i< production_table.rows.length; i++){
			var row= production_table.rows[i];
			var cell= row.cells[0];
			var vid= cell.childNodes[1].id.substr(6);
			var td= document.createElement("td");
			var aElem = document.createElement('a');
			if( building == "easy_farmer"){
				aElem.href="http://en64.tribalwars.net/game.php?village="+vid+"&screen=map&mycmd=easy_farmer";
				aElem.setAttribute("class", "easy_farmer");
				aElem.setAttribute("onclick", "this.style.display='none'; return true;");
				aElem.setAttribute("target", "_blank");
			}else if( building =="own_offer"){
				aElem.href="http://en64.tribalwars.net/game.php?village="+vid+"&screen=market&mode=own_offer";
			}else{
				aElem.href="http://en64.tribalwars.net/game.php?village="+vid+"&screen="+building;
			}
            //Create a text node to hold the text of the <a>
            var aElemTN = document.createTextNode(building_name);
            //Append the <a> text node to the <a> element
            aElem.appendChild(aElemTN);
			td.appendChild(aElem);
            row.appendChild( td);
		}
	});
	
	jQuery("#get_settlers").click(function(){
		var villages= unsafeWindow.TWMap.villages;
		
		for( v in villages ){
			
			var village= villages[v];
			if( village.img==50 && village.name=="Settler camp"){
				console.log( village.xy);
			}
		}
	});
	jQuery("#get_merchant_info").click(function(){
		var village_ids= localStorage.getItem("village_ids");
		if( village_ids){
			sessionStorage.setItem("get_merchant_info", 1);
			
			//goto 1st village
			var ids= village_ids.split(",");
			var id= ids.pop();
			sessionStorage.setItem("get_merchant_info_village_ids", ids.join(","));
			window.setTimeout( function(){window.location=  "http://en64.tribalwars.net/game.php?village="+id+"&screen=market";}, 5000);
			
		}
	});
	
	//show the merchant info data
	for( var i=1; i< production_table.rows.length; i++){
		var row= production_table.rows[i];
		var cell= row.cells[0];
		var vid= cell.childNodes[1].id.substr(6);
		
		var td= document.createElement("td");
		
		var text="";
		if( localStorage.getItem(vid+"_merchant")){
			text = localStorage.getItem(vid+"_merchant");
		}
		td.appendChild(document.createTextNode(text));
		row.appendChild( td);
		
		var td= document.createElement("td");
		text="";
		if( localStorage.getItem(vid+"_barracks")>0){
			text += "B["+localStorage.getItem(vid+"_barracks")+"]";
		}
		if( localStorage.getItem(vid+"_stable")>0){
			text += "S["+localStorage.getItem(vid+"_stable")+"]";
		}
		if( localStorage.getItem(vid+"_garage")>0){
			text += "W["+localStorage.getItem(vid+"_garage")+"]";
		}
		td.appendChild(document.createTextNode(text));
		row.appendChild( td);
	}
		
	
	html="";
	html+="<button id='button_academy_x'>Academy-X</button><button id='button_academy_r1'>Academy-R1</button><button id='button_academy_r2'>Academy-R2</button><button id='button_academy_u1'>Academy-U1</button>";
	jQuery("#production_table").after(html);
	jQuery("#button_academy_x").click(function(){
		var vs=[98914, 90209, 102820, 99165,94911, 98223,94144,98255, 90711, 92557, 99612, 90999, 94890, 100514, 92157, 92432, 95290, 99702,94725, 93076];
		for( v in vs){
			var w= window.open("http://en64.tribalwars.net/game.php?village="+vs[v]+"&screen=snob", vs[v]+"_academy");
		} 
	});
	jQuery("#button_academy_r1").click(function(){
		var vs=[226346, 439592, 439616,723467,356030,432028,567890,240753,447448,200493,726610,723642,369464,445657,188088,439598,374227,376308,609823,724148,357905,447113,727591,360719,478316,441790,723992,188159,422119, 260725, 728303, 728811, 440118, 609827, 727442, 188427, 726452, 188340, 726542, 672882,726088, 726504,727936,369468,385768, 731318, 735888,732249,734476,732146 ];
		for( v in vs){
			var w= window.open("http://en64.tribalwars.net/game.php?village="+vs[v]+"&screen=snob", vs[v]+"_academy");
		} 
	});
	jQuery("#button_academy_r2").click(function(){
		var vs=[728734, 187667,731561,959019,186190,187490,724511 ];
		for( v in vs){
			var w= window.open("http://en64.tribalwars.net/game.php?village="+vs[v]+"&screen=snob", vs[v]+"_academy");
		} 
	});

	jQuery("#button_academy_u1").click(function(){
		var vs=[725584,183924,726548,348824,731686,730537,725825, 248690, 725879,732059,731890,727751,724834, 725121, 730406, 345829, 728911, 182243];
		for( v in vs){
			var w= window.open("http://en64.tribalwars.net/game.php?village="+vs[v]+"&screen=snob", vs[v]+"_academy");
		} 
	});
	html="Wood:<input id='twood' value='0' size=5> Clay:<input id='tstone' value='0' size=5> Iron:<input id='tiron' value='0' size=5>";
	html+="<select id='from_village'>"+village_options+"</select>";
	html+="<select id='to_village'>"+village_options+"</select>";
	html+="<button id='button_transfer'>Transfer</button>";
	html+="<button id='button_fill'>Fill</button>";
	html+="%<input id='percent' value='0' size=3 /> <button id='button_fill_percent'>Fill %</button>";
	html+="<br>";
	jQuery("#production_table").after(html);
	
	jQuery("#button_transfer").click(function(){
		
		var from_village= jQuery("#from_village").val();
		var to_village= jQuery("#to_village option:selected").text();
		to_village= to_village.substr( to_village.indexOf("(")+1);
		to_village= to_village.substr(0, to_village.indexOf(")"));
		
		var wood= parseInt(jQuery("#twood").val());
		var stone= parseInt(jQuery("#tstone").val());
		var iron= parseInt(jQuery("#tiron").val());
		if( wood >0 || stone >0 || iron >0){
			var w= window.open("http://en64.tribalwars.net/game.php?village="+from_village+"&screen=market", "auto_transfer_"+to_village+"_"+wood+"|"+stone+"|"+iron);
		}
		
	});
	
	jQuery("#button_fill").click(function(){
		var from_village= jQuery("#from_village").val();
		var to_village= jQuery("#to_village option:selected").text();
		to_village= to_village.substr( to_village.indexOf("(")+1);
		to_village= to_village.substr(0, to_village.indexOf(")"));
		
		var wood= parseInt(jQuery("#twood").val());if( isNaN(wood)) wood=0;
		var stone= parseInt(jQuery("#tstone").val()); if( isNaN(stone)) stone=0;
		var iron= parseInt(jQuery("#tiron").val());if( isNaN(iron)) iron=0;
		
		if( wood >0 || stone >0 || iron >0){
			var to_vid= jQuery("#to_village").val();
			var c_wood=0, c_stone=0, c_iron=0;
			for( var i=1; i< production_table.rows.length; i++){
					var row= production_table.rows[i];
					var cell= row.cells[0];
					//console.log(cell.childNodes[1].id);
					var vid= cell.childNodes[1].id.substr(6);
					if( vid== to_vid){
						console.log(vid);
						cell= row.cells[2];
						console.log( cell.childNodes[0].textContent+" "+cell.childNodes[2].textContent+" "+cell.childNodes[4].textContent);
						c_wood= parseInt( cell.childNodes[0].textContent.replace(".",""));
						c_stone= parseInt( cell.childNodes[2].textContent.replace(".",""));
						c_iron= parseInt( cell.childNodes[4].textContent.replace(".",""));
						
						break;
					}
			}
			wood= wood- c_wood; if( wood <0) wood=0;
			stone= stone- c_stone; if( stone <0) stone=0;
			iron= iron- c_iron; if( iron <0) iron=0;
			if( wood >0 || stone >0 || iron >0){
				var w= window.open("http://en64.tribalwars.net/game.php?village="+from_village+"&screen=market", "auto_transfer_"+to_village+"_"+wood+"|"+stone+"|"+iron);
			}
		}
	});
	
	jQuery("#button_fill_percent").click(function(){
		var percent= parseInt(jQuery("#percent").val());
		if( percent>0){
			
			var from_village= jQuery("#from_village").val();
			var to_village= jQuery("#to_village option:selected").text();
			to_village= to_village.substr( to_village.indexOf("(")+1);
			to_village= to_village.substr(0, to_village.indexOf(")"));
			
			var to_vid= jQuery("#to_village").val();
			var c_wood=0, c_stone=0, c_iron=0, c_storage=0;
			for( var i=1; i< production_table.rows.length; i++){
					var row= production_table.rows[i];
					var cell= row.cells[0];
					//console.log(cell.childNodes[1].id);
					var vid= cell.childNodes[1].id.substr(6);
					if( vid== to_vid){
						console.log(vid);
						cell= row.cells[2];
						console.log( cell.childNodes[0].textContent+" "+cell.childNodes[2].textContent+" "+cell.childNodes[4].textContent);
						c_wood= parseInt( cell.childNodes[0].textContent.replace(".",""));
						c_stone= parseInt( cell.childNodes[2].textContent.replace(".",""));
						c_iron= parseInt( cell.childNodes[4].textContent.replace(".",""));
						
						cell= row.cells[3];
						c_storage= parseInt(cell.textContent);
						
						break;
					}
			}
			
			c_percent= c_storage * percent / 100;
			var wood= c_percent - c_wood; if( wood <0) wood=0;
			var stone= c_percent - c_stone; if( stone<0) stone=0;
			var iron= c_percent - c_iron; if( iron<0) iron=0;
			if( wood >0 || stone >0 || iron >0){
				var w= window.open("http://en64.tribalwars.net/game.php?village="+from_village+"&screen=market", "auto_transfer_"+to_village+"_"+wood+"|"+stone+"|"+iron);
			}
		}
	
	});
}


if( "market"== screen){
	if( window.name.indexOf("auto_transfer") >= 0){
		
		var coord= window.name.substr( window.name.indexOf("auto_transfer")+14);
		//console.log(s1_village);
		var x= coord.substr(0,3);
		var y= coord.substr(4,3);
		jQuery("#inputx").val(x);
		jQuery("#inputy").val(y);
		
		var resources= window.name.substr( window.name.indexOf("auto_transfer")+14+8);
		var fields= resources.split("|");
		jQuery("input[name='wood']").val(fields[0]);
		jQuery("input[name='stone']").val(fields[1]);
		jQuery("input[name='iron']").val(fields[2]);
		
		window.name="confirm";
		window.setTimeout( function(){jQuery("input[type='submit']").click(); }, 10000);
	}else if( window.name=="confirm"){
		if( "confirm_send"== trycmd){
			window.name="close";
			window.setTimeout( function(){jQuery("input[type='submit']").click(); }, 10000);
		}
	}else if( window.name=="close"){
		autoclose();
	}else if( window.name=="auto_builder"){
		var h3= jQuery("h3").text();
		if( h3.indexOf("Incoming transports") <0) {
			window.setTimeout( function(){window.location= "http://en64.tribalwars.net/game.php?village="+myid+"&screen=main"; }, 10000);
		}else{
			var get_resource = sessionStorage.getItem("get_resource");
			var find_link= false;
			jQuery("a").each( function(i){
				if( $(this).attr("href") == "/game.php?village="+myid+"&id="+get_resource+"&screen=info_village"){
					find_link=true;
				}
				
			});
			if( find_link== true){
				console.log("wait for resource");
			}else{
				window.setTimeout( function(){window.location= "http://en64.tribalwars.net/game.php?village="+myid+"&screen=main"; }, 10000);
			}
		}
	}else if("own_offer"==mode){
		var html="<select id='offer_type'><option>wood</option><option>clay</option></select>";
		html+="<input id='offer_count' ><button id='create_offer'>Create Offer</button>";
		jQuery("#contentContainer").after(html);
		jQuery("#create_offer").click(function(){
			var offer_type= jQuery("#offer_type").val();
			var offer_count= jQuery("#offer_count").val();
			console.log(offer_type+" "+offer_count);
			
			if( offer_count>0){
				jQuery("#res_sell_iron").attr("checked",true);
				if( offer_type=='wood'){
					jQuery("#res_buy_wood").attr("checked",true);
				}else{
					jQuery("#res_buy_stone").attr("checked",true);
				}
				jQuery("input[name='sell']").val(10000);
				jQuery("input[name='buy']").val(10000);
				jQuery("input[name='max_time']").val(20);
				jQuery("input[name='multi']").val(offer_count);
				jQuery("input[value='Create']").click();
			}
		});
	}
	
	if( sessionStorage.getItem("get_merchant_info")){
		window.setTimeout( function(){
			console.log(unsafeWindow.Market.Data.Trader.total);
			localStorage.setItem(myid+"_merchant", unsafeWindow.Market.Data.Trader.total);
			//goto next village
			var village_ids= sessionStorage.getItem("get_merchant_info_village_ids");
			var ids= village_ids.split(",");
			var id= ids.pop();
			if( id){
				sessionStorage.setItem("get_merchant_info_village_ids", ids.join(","));
				window.setTimeout( function(){window.location=  "http://en64.tribalwars.net/game.php?village="+id+"&screen=market";}, 5000);
			}else{
				sessionStorage.removeItem("get_merchant_info");
				window.setTimeout( function(){window.location=  "http://en64.tribalwars.net/game.php?screen=overview_villages";}, 5000);
			}
		}, 5000);
	}else{
		//get_merchant_info();
	}
	
	
}else if( "snob"==screen){
	if( window.name.indexOf("academy") >0){
		window.setTimeout( function(){jQuery("input[value='Store']").click(); autoclose(); }, 10000);
		
	}
}else if("train"==screen){
	//get the train time 
	var barracks=0;
	
	barracks+= parseInt(jQuery("#trainqueue_wrap_barracks span[class=timer]").text());
	jQuery("#trainqueue_wrap_barracks td[width=120]").each(function(){
		barracks+= parseInt($(this).text());
	});
	if( isNaN(barracks)) barracks=0;
	localStorage.setItem(myid+"_barracks", barracks);
	
	var stable=0;
	stable+= parseInt(jQuery("#trainqueue_wrap_stable span[class=timer]").text());
	jQuery("#trainqueue_wrap_stable td[width=120]").each(function(){
		stable+= parseInt($(this).text());
	});
	if( isNaN(stable)) stable=0;
	localStorage.setItem(myid+"_stable", stable);
	
	var garage=0;
	garage+= parseInt(jQuery("#trainqueue_wrap_garage span[class=timer]").text());
	jQuery("#trainqueue_wrap_garage td[width=120]").each(function(){
		garage+= parseInt($(this).text());
	});
	if( isNaN(garage)) garage=0;
	localStorage.setItem(myid+"_garage", garage);
}

function get_merchant_info(){
	window.setTimeout( function(){
		localStorage.setItem(myid+"_merchant", unsafeWindow.Market.Data.Trader.total);
	}, 5000);
}

function autoclose(){
	window.setTimeout( function(){window.close();}, 10000);
}

function autoreload(time){
	var sec= time/1000;
	jQuery("#auto_build_message").text( jQuery("#auto_build_message").text()+" Reloading in:"+sec +" seconds");
	window.setTimeout( function(){window.location.reload();}, time);
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function update_build_queue(buildings){
	var buildqueue=  document.getElementById("build_queue");
	if( buildqueue && buildqueue.rows.length>0){
		var buildqueue=  document.getElementById("build_queue");
		var buildingnames={"Village Headquarters":"main", "Barracks":"barracks", "Stable":"stable", 
			"Smithy":"smith", "Market":"market", "Timber camp":"wood", "Clay pit":"stone", "Iron mine":"iron", "Farm":"farm",
			"Warehouse":"storage", "Wall":"wall" ,"Academy":"snob"};
		for( var i=1; i< buildqueue.rows.length; i++){
			var row= buildqueue.rows[i];
			var cell= row.cells[0];
			console.log( cell.textContent.trim());
			var name= cell.textContent.trim();
			var building= buildingnames[name.substr(0, name.indexOf("(")).trim()];
			console.log(building);
			var level= name.substring( name.indexOf("Level")+5, name.indexOf(")") ).trim();
			console.log(level);
			buildings[building]=level;
			
		}
		console.log(buildings);
	
	}
	
	return buildings;
}

function get_next_building(buildings){
	var next_building= false;
	
	
	if( get_building( buildings, "storage", 5)) return "storage";
	if( get_building( buildings, "main", 5)) return "main";
	if( get_building( buildings, "farm", 5)) return "farm";
	
	if( get_building( buildings, "storage", 10)) return "storage";
	if( get_building( buildings, "main", 15)) return "main";
	if( get_building( buildings, "farm", 10)) return "farm";
	
	if( get_building( buildings, "storage", 15)) return "storage";
	if( get_building( buildings, "main", 20)) return "main";
	
	if( get_building( buildings, "wood", 5)) return "storage";
}

function get_building(buildings, building, level){
	var l= parseInt( buildings[building]);
	if( level > l ){
		return true;
	}else{
		return false;
	}
}

function get_basic_building(level){
	var buildings= unsafeWindow.game_data.village.buildings;
	var next_building="";
	var stone= parseInt(buildings.stone);
	var wood= parseInt(buildings.wood);
	var iron= parseInt(buildings.iron);
	var main= parseInt(buildings.main);
	var storage= parseInt(buildings.storage);
	var farm= parseInt(buildings.farm);
	var m= Math.min( stone, wood, iron, main, storage, farm);
	if( m < level){
		if( main == m) next_building="main";
		else if( storage == m) next_building="storage";
		else if( stone == m) next_building="stone";
		else if( wood == m) next_building="wood";
		else if( iron == m) next_building="iron";
		else if( wood == m) next_building="wood";
		else if( farm == m) next_building="farm";
	}
	return next_building;
}
function get_main_building(level){
	var buildings= unsafeWindow.game_data.village.buildings;
	var next_building="";
	
	var main= parseInt(buildings.main);
	var storage= parseInt(buildings.storage);
	var farm= parseInt(buildings.farm);
	var m= Math.min( main, storage, farm);
	
	
	if( m < level){
		if( main == m) next_building="main";
		else if( storage == m) next_building="storage";
		else if( farm == m) next_building="farm";
	}
	return next_building;
}

function get_stone_wood_iron(level){
	var buildings= unsafeWindow.game_data.village.buildings;
	var next_building="";
	var stone= parseInt(buildings.stone);
	var wood= parseInt(buildings.wood)+2;
	var iron= parseInt(buildings.iron)+3;
	var m= Math.min( stone, wood, iron);
	if( m < level){
		if( stone == m) next_building="stone";
		else if( wood == m) next_building="wood";
		else if( iron == m) next_building="iron";
	}
	return next_building;
}