// ==UserScript==
// @name           barafranca_roulet
// @namespace      C:\wamp\www\grease_test
// @description    See gambling history
// @include      	http://www.barafranca.com/*
// ==/UserScript==


// @include      	http://www.barafranca.com/gambling/roulette.php
//reset_autogamble();
//clear_number_history();


var number_history = GM_getValue("number_storage", "");
var max_numbers_stored = 40;


//auto gamble on/off
var auto_gamble =  GM_getValue("auto_gamble", false);
//stores the timeout of outbet 
var timeout = false;


//bet statistics
var not_low = GM_getValue("not_low", 0);
var not_middle = GM_getValue("not_middle", 0);
var not_high = GM_getValue("not_high", 0);
var current_number = false;

//bet settings (defaults)
var start_bet = GM_getValue("start_bet", 10);
var current_bet = GM_getValue("current_bet", 0);
var maximum_bet = GM_getValue("maximum_bet", 1000);
var maximum_total_loss =  GM_getValue("maximum_loss", -50000);
var start_on_last_seen = GM_getValue("start_on_last_seen", 6);

//current bet field (field that is being gambled)
var current_bet_field = GM_getValue("current_bet_field", "red_black");
var next_bet_field = "red_black";

//profit made
var profit = GM_getValue("profit", 0);

//fields available for gamble
var low_field = document.getElementsByName('ett')[0];
var middle_field = document.getElementsByName('dtv')[0];
var high_field = document.getElementsByName('vtz')[0];
var red_field = document.getElementsByName('r')[0];
var black_field = document.getElementsByName('b')[0];




//number information
var numberinfo = [];
numberinfo[0] = ['green'];
numberinfo[1] = ['red'];
numberinfo[2] = ['black'];
numberinfo[3] = ['red'];
numberinfo[4] = ['black'];
numberinfo[5] = ['red'];
numberinfo[6] = ['black'];
numberinfo[7] = ['red'];
numberinfo[8] = ['black'];
numberinfo[9] = ['red'];
numberinfo[10] = ['black'];
numberinfo[11] = ['black'];
numberinfo[12] = ['red'];
numberinfo[13] = ['black'];
numberinfo[14] = ['red'];
numberinfo[15] = ['black'];
numberinfo[16] = ['red'];
numberinfo[17] = ['black'];
numberinfo[18] = ['red'];
numberinfo[19] = ['red'];
numberinfo[20] = ['black'];
numberinfo[21] = ['red'];
numberinfo[22] = ['black'];
numberinfo[23] = ['red'];
numberinfo[24] = ['black'];
numberinfo[25] = ['red'];
numberinfo[26] = ['black'];
numberinfo[27] = ['red'];
numberinfo[28] = ['black'];
numberinfo[29] = ['black'];
numberinfo[30] = ['red'];
numberinfo[31] = ['black'];
numberinfo[32] = ['red'];
numberinfo[33] = ['black'];
numberinfo[34] = ['red'];
numberinfo[35] = ['black'];
numberinfo[36] = ['red'];



function update_settings()	{
	
	//update is only active until next page refresh(a next gamble)
	input_start_bet = document.getElementById('start_bet').value;
	GM_setValue("start_bet", parseInt(input_start_bet));
	
	input_maximum_bet = document.getElementById('maximum_bet').value;
	GM_setValue("maximum_bet", parseInt(input_maximum_bet));
	
	input_max_total_loss = document.getElementById('max_total_loss').value;
	GM_setValue("maximum_loss", parseInt(input_max_total_loss));
	
	input_start_last_seen = document.getElementById('start_last_seen').value;
	GM_setValue("start_on_last_seen", parseInt(input_start_last_seen));	
}


function handle_roulette_spin()	{	
	
	store_current_number();
	
	if(auto_gamble === true)	{
		auto_gamble_handler();			
	}	
	
}


function auto_gamble_handler()	{	

	//check if there is a current_number
	if(current_number !== false)	{

		generate_statistics();
		track_profit();
	
		//keep gambling if profit is greater then total maximum loss
		if(profit > maximum_total_loss)	{
			
			//place bets, if no valid bet can be made it will deactivate (not valid is exceding max bet, or max loss after calculating next bet)
			if( place_bets() === true )	{
				//var millisec  = ((Math.floor(Math.random()* 5)) + 7) * 1000;
				var millisec = 13490;
				timeout = setTimeout(auto_spin,millisec);				
			}
			else	{
				deactivate_auto_gamble();
			}		
	
		}
		else	{
			deactivate_auto_gamble();
		}
	}
	
	//first spin witout any manual clicks(WERKT NIET)
	else	{
		if( place_bets() === true )	{			
			auto_spin();			
		}
		else	{
			deactivate_auto_gamble();
		}	
	}
	
}



function on_of()	{
	if(auto_gamble === true)	{
		deactivate_auto_gamble();					
	}
	else	{
		activate_auto_gamble();	
	}
}

function activate_auto_gamble()	{
	auto_gamble = true;
	GM_setValue("auto_gamble", auto_gamble);
	auto_gamble_handler();
	document.getElementById('state').innerHTML = "State: running"; 
}

function deactivate_auto_gamble()	{
	first_form.reset();
	clearTimeout(timeout);	
	auto_gamble = false;	
	GM_setValue("auto_gamble", auto_gamble);
	delete_gamble_vars();	
	document.getElementById('state').innerHTML = "State: not active"; 	
}

function generate_statistics()	{
		
	number_int = parseInt(current_number);	
	
	//count last seen conditions (to determe when to start gambling)
	not_low = ((number_int >  12) || (number_int ===  0))  ? not_low + 1 : 0 ;
	not_middle = ((number_int <  13) || (number_int >  24)) ?  not_middle + 1 : 0 ; 
	not_high = (number_int <  25) ? not_high + 1 : 0 ;
	
	//update html
	document.getElementById('low').innerHTML = not_low;
	document.getElementById('middle').innerHTML = not_middle;
	document.getElementById('high').innerHTML = not_high;
	
	//update last seen conditions
	GM_setValue("not_low", not_low);
	GM_setValue("not_middle", not_middle);
	GM_setValue("not_high", not_high);
}

function track_profit()	{
	
	var winnings = 0;										
	
	//no red or black field means gambling on number ranges
	if(current_bet_field !== "red_black")	{
		
		if( (not_low === 0) && (current_bet_field === "low") )	{
			winnings = current_bet * 3;					
		}	
		if( (not_middle === 0) && (current_bet_field === "middle") )	{
			winnings = current_bet * 3;				
		}	
		if( (not_high === 0) && (current_bet_field === "high") )	{
			winnings = current_bet * 3;				
		}
		
		//calculate profits, and reset betting field and bet amount
		if(winnings !== 0)	{
			//set next bet field to red_black
			next_bet_field = "red_black";			
			profit += winnings - current_bet;
		}
		else	{
			//no winnings (keep betting on current_bet_field)
			next_bet_field = current_bet_field;
			profit -=  current_bet;
		}		
		
	}
	else	{
		//only with number 0 loss
		if(current_number === 0)	{
			profit -= 2;
		}
	}
	
	
	//update profit
	GM_setValue("profit", profit);	
	var html_profit = document.getElementById('profit');
		
	//update html profit
	var css_color = "black";	
	if(profit < 0) { css_color = "red";	}
	if(profit > 0) { css_color = "green"; }
	html_profit.className = css_color;
	html_profit.innerHTML = "<b>"+profit+"</b>";
	
	//update html current bet
	html_current_bet = document.getElementById('current_bet');
	html_current_bet.innerHTML = current_bet_field;
}



function place_bets()	{		

	var spin = false;
	
	//no real gamble active or maxbet reached(on maxbet begin again with startbet)
	if( (next_bet_field === "red_black") || (current_bet === maximum_bet) )	{	
	
		//determe wich field is going to be betted
		if(not_low >= start_on_last_seen)	{
			next_bet_field = "low";			
			low_field.value = start_bet;
			GM_setValue("current_bet", start_bet);
		}
		else if(not_middle >= start_on_last_seen)	{
			next_bet_field = "middle";
			middle_field.value = start_bet;
			GM_setValue("current_bet", start_bet);
		}
		else if(not_high >= start_on_last_seen)	{
			next_bet_field = "high";
			high_field.value = start_bet;
			GM_setValue("current_bet", start_bet);
		}
		else	{
			red_field.value = 1;
			black_field.value = 1;	
			GM_setValue("current_bet", 0);
		}		
		
		//store this field to remembers wich field is the next current
		GM_setValue("current_bet_field", next_bet_field);
		
		//update html next bet
		html_next_bet = document.getElementById('next_bet');
		html_next_bet.innerHTML = next_bet_field;
		
		//set flag true to spin this bet
		spin = true;	
	}
	
	//real gamble active 
	else	{
		
		//multiply current bet by two to make profit
		var new_bet = ((current_bet * 2) <= maximum_bet) ? current_bet * 2 : maximum_bet;
		
		//check if total loss isnt exceeded after placing final bet 	
		if( (profit - new_bet) > maximum_total_loss)	{		
		
			//determe wich field is going to be betted on
			if(next_bet_field === "low")	{
				low_field.value = new_bet;
			}
			else if(next_bet_field === "middle")	{
				middle_field.value = new_bet;
			}
			else 	{				
				high_field.value = new_bet;
			}	
			
			//update html next bet
			html_next_bet = document.getElementById('next_bet');
			html_next_bet.innerHTML = next_bet_field;			
			
			//store the amount that is betted
			GM_setValue("current_bet", new_bet);		
			
			//set flag true to spin this bet
			spin = true;
			
		}	
		
	}//end real gamble		
	
	return spin;
	
}


function auto_spin()	{
	first_form.submit();
}


function reset_autogamble()	{	
	
	
	//reset bet settings (back to defaults)
	GM_deleteValue("start_bet");
	GM_deleteValue("current_bet");
	GM_deleteValue("maximum_bet");
	GM_deleteValue("maximum_loss");	
	GM_deleteValue("start_on_last_seen");
	
	GM_deleteValue("current_bet_field");
	GM_deleteValue("profit");
	
}

function delete_gamble_vars()	{
	
	//delete statistics
	GM_deleteValue('not_low');
	GM_deleteValue('not_middle');
	GM_deleteValue('not_high');	
	not_low = null;
	not_middle = null;
	not_high = null; 
	
	//reset current bet	
	GM_deleteValue('current_bet');
	current_bet = 0;
	
	//reset bet field
	GM_deleteValue('current_bet_field');
	current_bet_field = "red_black";
	next_bet_field = "red_black";
	
	//set profit to 0
	GM_deleteValue('profit');
	profit = 0;

}







function store_current_number()	{	
		
		number_history += (number_history !== "") ? ", "+ current_number : current_number;	
		
		//remove last number from history if there is a max number active
		if(	max_numbers_stored !== false )	{
			
			var numbers_array = number_history.split(", ");	
			if(numbers_array.length > max_numbers_stored )	{
				numbers_array.shift();
				number_history = numbers_array.join(", ");				
			}			
		}			
		GM_setValue("number_storage", number_history);		
}

function clear_number_history()	{
	
	number_history = "";
	GM_deleteValue('number_storage');
	var history_container = document.getElementById('history_container');
	history_container.innerHTML = "History removed";	
}

function generate_history_html()	{	

	//create array from string and reverse it
	var numbers_array = number_history.split(", ");		
	numbers_array.reverse();
	
	var number_int = "";	
	var number_color = "";		
	
	var history_container = document.createElement('div');
	history_container.id = "history_container";
	
	var number_history_html = "<ul>";
	
	for( var i = 0; i < numbers_array.length; i++)	{		
		number_int = parseInt(numbers_array[i]);	
		number_color = numberinfo[number_int][0];			
		number_history_html += 	"<li class=\""+number_color+"\" >" + number_int + "</li>";		
	}
	number_history_html += 		"<li class=\"center\" ><button id=\"button_clear\" >Clear</button></li>";
	number_history_html += "</ul>";
	//number_history_html += "<tr><td width=566 ><button onclick='clear_number_history();'>Clear</button></td></tr>";
	
	history_container.innerHTML = number_history_html; 
	table_data.parentNode.appendChild(history_container); 
	
	var clear_button = document.getElementById('button_clear');
	clear_button.addEventListener("click", clear_number_history);
} 


function generate_auto_gamble_html()	{	

		
	var autogamble_container = document.createElement('div');
	autogamble_container.id = "autogamble_container";
	
	

	var state = (auto_gamble) ? "running" : "not active";
	
	autogamble_container.innerHTML = 	"<table>" +
										"	<form>" +
										"		<tr class='tr_spacer'></tr>" +
										"		<tr><td colspan='2' id='state'>State: "+ state +"</td></tr>" +
										"		<tr class='tr_spacer'></tr>" +
										"		<tr><td>Start bet:</td><td><input id='start_bet' type='text' value='"+start_bet+"' /></td></tr>" +
										"		<tr><td>Max bet:</td><td><input id='maximum_bet' type='text' value='"+maximum_bet+"' /></td></tr>" +										
										"		<tr><td>Max total loss:</td><td><input id='max_total_loss' type='text' value='"+maximum_total_loss+"' /></td></tr>" +
										"		<tr><td>Not seen start:</td><td><input id='start_last_seen'type='text' value='"+start_on_last_seen+"' /></td></tr>" +
										"		<tr class='tr_spacer'></tr>" +
										"		<tr>" +
										"			<td colspan='2' class='buttons'>" +
										"				<button id='update'>Update</button>" +
										"				<button id='toggle_autogamble'>On/Off</button>" +
										"			</td>" +
										"		</tr>" +
										"		<tr class='tr_spacer'></tr>" +
										"		<tr class='tr_spacer'></tr>" +
										"		<tr><td>Profit made: &#36;</td><td id='profit'><b>"+profit+"</b></td></tr>" +									
										"		<tr><td>Betted:</td><td id='current_bet' ></td></tr>" +
										"		<tr><td>Next bet: </td><td id='next_bet' ></td></tr>" +
										"		<tr><td>Not low: </td> <td id='low'></td></tr>" +
										"		<tr><td>Not middle:</td><td id='middle'></td></tr>" +
										"		<tr><td>Not high:</td><td id='high'></td></tr>" +
										"		<tr class='tr_spacer'></tr>" +
										"	</form>" +
										"</table>";
	table_data.parentNode.appendChild(autogamble_container); 
	
	var toggle_autogamble = document.getElementById('toggle_autogamble');
	toggle_autogamble.addEventListener("click", on_of);
	
	var update = document.getElementById('update');
	update.addEventListener("click", update_settings);
} 




var first_form = document.forms[0];

if( (typeof(first_form) !== "undefined") && (first_form.action === "http://www.barafranca.com/gambling/roulette.php") )	{
	
	var table_data = document.getElementsByTagName('table')[0];
	var td_data = table_data.childNodes[0].childNodes[0];	
	var td_b_data = td_data.getElementsByTagName('b')[0];
	var gamble_check = (td_b_data.innerHTML.search("This Roulette Table is owned by ") === -1) ? true : false;	
	
	//alert("JAAAA");
	
	//always give possibility to start auto gambling
	generate_auto_gamble_html();
	
	GM_addStyle(" 	#history_container { margin: 0; padding:0; position:absolute; right:0; top:50px; border:1px solid black; background:#FFF; } " +
				"	#history_container ul { margin:0; padding:5px; float:left; width:90px; list-style:none;} " +
				"	#history_container ul li { margin:0; padding:0; float:left; font-size:13px; font-weight:bold; text-align:left; width:100px; height:20px; } " +
				"	#history_container ul li.center { text-align:center; } " +
				"	#history_container .green 	{ color:green; } " +
				"	#history_container .black 	{ color:black; } " +
				"	#history_container .red 	{ color:red; } " +			
				"	#button_clear  { " +						
								"	background:#CFCFCF; " + 
								"	border:1px solid #404040; " +  
								"	margin-right: 5px; " + 
								"	color:#404040; " + 
								"	font-family:Verdana,Tahoma; " + 
								"	font-size:x-small; " + 
								"	} " +
				"	#autogamble_container { margin: 0; padding:0; position:absolute; left:0; top:50; border:1px solid black; background:#FFF; } " +
				"	#autogamble_container .green 	{ color:green; } " +
				"	#autogamble_container .black 	{ color:black; } " +
				"	#autogamble_container .red 	{ color:red; } " +		
				"	#autogamble_container tr.tr_spacer { height:10px; } " +
				"	#autogamble_container td { margin: 0; padding:0; font-size:12px;  } " +
				"	#autogamble_container td input { width:55px; } " +
				"	#autogamble_container td.buttons { text-align:center; } " +
				"	#autogamble_container td.buttons button	{ " +
								"	background:#CFCFCF; " + 
								"	border:1px solid #404040; " +  
								"	margin-right: 5px; " + 
								"	color:#404040; " + 
								"	font-family:Verdana,Tahoma; " + 
								"	font-size:x-small; " + 
								"	}" );	
		
	if(gamble_check === true)	{
		current_number = td_b_data.innerHTML.substr(-6,3);		
		first_form.onsubmit = handle_roulette_spin();	
	}
	
	
	if(number_history !== "")	{
		generate_history_html();	
	}	
	
}
else	{	
	//GM_deleteValue('number_storage');
	//alert("DELETE NUMBERS");		
}


