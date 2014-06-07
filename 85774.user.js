// ==UserScript==
// @name			Befehlszähler
// @namespace		
// @description		Fuegt die möglichikeit Befehle und  ihre Truppen zu zaehlen
// @include			http://*.die-staemme.*/game.php?*screen=overview_villages*
// ==/UserScript==


//***************************************************************************
//***                           command_counter.user.js
//**                           -----------------------
//*   author               Dömel
//**  copyright            © Dömel
//***
//***************************************************************************/

if ( document.getElementById( 'overview_menu' ).getElementsByTagName( 'td' )[4].className == 'selected' ) {
   command_table = document.getElementById( 'commands_table' );
   document.getElementById( 'paged_view_content' ).removeChild( command_table );
   document.getElementById( 'paged_view_content' ).appendChild( createMenue() );
   document.getElementById( 'paged_view_content' ).appendChild( command_table );
}

function createInputCell( name , value , width ) {
   var input = document.createElement( 'input' );
   input.type = 'text';
   input.name = name;
   input.id = 'cc_' + name;
   input.value = value;
   input.size = width;
   var cell = document.createElement( 'td' );
   cell.appendChild( input );
   return cell;
}

function createHeadCell( content ) {
   var head = document.createElement( 'th' );
   head.innerHTML = content;
   return head;
}

function createCountButton() {
   var button = document.createElement( 'input' );
   button.type = 'button';
   button.value = 'Zaehlen';
   button.addEventListener( 'click' , count , false );
   return button;
}

function createSaveButton() {
   var button = document.createElement( 'input' );
   button.type = 'button';
   button.value = 'Speichern';
   button.addEventListener( 'click' , save , false );
   return button;
}

function createMenue() {
   var menue = document.createElement( 'table' );
   var head_row = document.createElement( 'tr' ) ;
   var input_row = document.createElement( 'tr' ) ;
   
   var cookie = _getCookie('cc');
   if (!cookie) {
		cookie = ',,,';
   }
   var savings = cookie.split(',');
   
   head_row.appendChild( createHeadCell( 'Ziel' ) );
   input_row.appendChild( createInputCell( 'aim' , savings[0] , 5 ) );
   
   head_row.appendChild( createHeadCell( 'Herkunft' ) );
   input_row.appendChild( createInputCell( 'from' , savings[1] , 5 ) );
   
   head_row.appendChild( createHeadCell( 'Ankunft bis' , "datetime" ) );
   input_row.appendChild( createInputCell( 'arrive' , savings[2].replace('_',' ') , 30 ) );
   
   head_row.appendChild( createHeadCell( '' ) );
   input_row.appendChild( createCountButton() );

   head_row.appendChild( createHeadCell( '' ) );
   input_row.appendChild( createSaveButton() );
   
   menue.appendChild( head_row );
   menue.appendChild( input_row );
   return menue;
}

function getTimestamp(date) {
	if (!date) {
		return null;
	}
	var year =  parseInt(document.getElementById("serverDate").innerHTML.split('/')[2]);
	var time = date.match(/(\d+).(\d+).\d?\d? ?u?m? (\d+):(\d+):(\d+)/);
	var timestamp = new Date(year,time[2]-1,time[1],time[3],time[4],time[5]); 
	return timestamp.getTime()/1000;
}

function count() {
   var cmds = document.getElementById("commands_table").getElementsByTagName("tr");
	var cmd, aim , from , arrive , units , today , tomorrow , counter;
	units = new Array();
	today = document.getElementById("serverDate").innerHTML.split('/');
	tomorrow = "am "+(parseInt(today[0])+1)+"."+today[1]+".";
	today = "am "+today[0]+"."+today[1]+".";
	counter = 0;
	var filter_aim = document.getElementById('cc_aim').value;
	var filter_from = document.getElementById('cc_from').value;
	var filter_arrive_rough = document.getElementById('cc_arrive').value;
	var filter_arrive = getTimestamp(filter_arrive_rough.replace(/heute/,today).replace(/morgen/,tomorrow));
	for (u=3; u < cmds[0].getElementsByTagName("th").length; u++) {
		units[u-3] = 0;
	}
	for (i=1; i < cmds.length; i++ ) {
		cmd = cmds[i];
		if (filter_aim && filter_aim != 'xxxx|yyy' ) {
			aim = cmd.getElementsByTagName("td")[0].innerHTML.match(/\((\d+)\|(\d+)\)/);
			if (aim[1]+"|"+aim[2]!=filter_aim) {
				cmd.style.display="none";
				continue;
			}
			else {
				cmd.style.display="";
			}
		}
		if (filter_from && filter_from != 'xxx|yyy' ) {
			from = cmd.getElementsByTagName("td")[1].innerHTML.match(/\((\d+)\|(\d+)\)/);
			if (from[1]+"|"+from[2]!=filter_from) {
				cmd.style.display="none";
				continue;
			}
			else {
				cmd.style.display="";
			}
		}
		if (filter_arrive) {
			arrive = cmd.getElementsByTagName("td")[2].innerHTML.replace(/heute/,today).replace(/morgen/,tomorrow);
			arrive = getTimestamp(arrive);
			if (arrive>filter_arrive) {
				cmd.style.display="none";
				continue;
			}
			else {
				cmd.style.display="";
			}
		}
		for (u=3; u < cmd.getElementsByTagName("td").length; u++) {
			units[u-3] += parseInt(cmd.getElementsByTagName("td")[u].innerHTML);
		}
		counter++;
	}
	var result_show = document.createElement( 'tr' );
	if ( filter_aim ) {
		result_show.appendChild( createHeadCell( counter + ' Befehele nach ' + filter_aim) );
	}
	else {
		result_show.appendChild( createHeadCell( counter + ' Befehele' ) );
	}
	if ( filter_from ) {
		result_show.appendChild( createHeadCell( 'Aus ' + filter_aim ) );
	}
	else {
		result_show.appendChild( createHeadCell( '' ) );
	}
	if ( filter_arrive_rough ) {
		result_show.appendChild( createHeadCell( "bis " + filter_arrive_rough ) );
	}
	else {
		result_show.appendChild( createHeadCell( '' ) );
	}
	for ( u=3; u < cmds[0].getElementsByTagName("th").length; u++ ) {
		result_show.appendChild( createHeadCell( units[u-3] ) );
	}
	document.getElementById("commands_table").appendChild( result_show );
}

function save() {
	var toSave = document.getElementById('cc_aim').value.replace(',','')+","+document.getElementById('cc_from').value.replace(',','')+','+document.getElementById('cc_arrive').value.replace(',','').replace(' ','_')+',';
	var date = new Date();
	date = new Date(date.getTime()+1000*60*60*24*365);
	document.cookie = "cc=" + toSave + "; expires=" + date.toGMTString();
}

function _getCookie(name) {
	if(document.cookie.split(name + "=").length > 1) {
		var value = document.cookie.split(name + "=")[1].split(";")[0];
	} else {
		var value = false;
	}
	
	return value;
}
