// ==UserScript==
// @name       Campusnet Agenda Creator
// @namespace  http://k-moeller.dk/
// @version    0.7
// @description  Creating agenda from calender
// @match      https://www.campusnet.iha.dk/cnnet/calendar/Default*
// @match      https://www.campusnet.iha.dk/cnnet/calendar/default*
// @copyright  2012+, Kalle R. Moeller
// ==/UserScript==

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <userscripts.org@k-moeller.dk> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Kalle R. Møller
 * ----------------------------------------------------------------------------
 */

function addMiscItems() {

	$("#LeftMenuHeader").html('<img id="CollapseLeftMenuLinks" class="collapse" src="' + blue_down + '" width="10">'+$("#LeftMenuHeader").html());
	

}

function removedText() {
	var number = 0;
	for (id in agenda_data) {
		if (agenda_data[id]['state'] == 'removed') {
			number++;
		}
	}
	return "("+number+" hidden)";
}
 
function createAgendaMenu() {
    
    document.getElementById("LeftMenu").style.marginBottom="10px";
    
    var agendahtml = '<div id="LeftAgendaHeader"><img id="CollapseLeftAgendaLinks" class="collapse" src="' + blue_down + '" width="10"> Agenda</div>';
    agendahtml += '<div id="LeftAgendaLinks">';
	agendahtml += '<div id="agenda_Removed" style="float: right;"><div class="agenda_removed"><a href="javascript:" id="toogle_removed">'+removedText()+'</a></div></div>';
    agendahtml += '<div id="agenda_Mandag"><div class="agenda_day">Mandag</div></div>';
    agendahtml += '<div id="agenda_Tirsdag"><div class="agenda_day">Tirsdag</div></div>';
    agendahtml += '<div id="agenda_Onsdag"><div class="agenda_day">Onsdag</div></div>';
    agendahtml += '<div id="agenda_Torsdag"><div class="agenda_day">Torsdag</div></div>';
    agendahtml += '<div id="agenda_Fredag"><div class="agenda_day">Fredag</div></div>';
    agendahtml += '<div id="agenda_Lørdag"><div class="agenda_day">Lørdag</div></div>';
    agendahtml += '<div id="agenda_Søndag"><div class="agenda_day">Søndag</div></div>';
    agendahtml += '</div>';
    
    var agendanode = document.createElement("DIV");
    agendanode.setAttribute("id","LeftAgenda");
    agendanode.innerHTML = agendahtml;
    
    var list = document.getElementById("maincontainer");
    list.insertBefore(agendanode,list.childNodes[5]);
    
    $('#LeftAgenda').css('float','left');
    $('#LeftAgenda').css('width','235px');
    
    $('#LeftAgendaHeader').css('background','url(/cnnet/Resources/IHA/Images/bg_nav_over.gif) left bottom repeat-x');
    $('#LeftAgendaHeader').css('font-size','13px');
    $('#LeftAgendaHeader').css('color','#fff');
    $('#LeftAgendaHeader').css('font-weight','bold');
    $('#LeftAgendaHeader').css('border','1px solid #bfbfbf');
    $('#LeftAgendaHeader').css('border-bottom','0');
    $('#LeftAgendaHeader').css('padding','9px 15px 9px 15px');
    
    $('#LeftAgendaLinks').css('border','1px solid #bfbfbf');
    $('#LeftAgendaLinks').css('padding','9px 15px 9px 15px');
    $('#LeftAgendaLinks').css('font-size','10px');
    
    $('.agenda_day').css('padding-bottom','2px');
    $('.agenda_day').css('border-bottom','thin solid #000');
    
}

function fetchTimeslotHtml(id) {
    var raw_html = getDataFromId(id)[13];
    if (raw_html == "") {
        return raw_html;
    }
    var cleaned_html = raw_html.replace(/background-color:rgb\([\d]+,[\d]+,[\d]+\)/g,'');
    cleaned_html = cleaned_html.replace(/color:rgb\([\d]+,[\d]+,[\d]+\)/g,'');
    cleaned_html = cleaned_html.replace(/___(_)+/g,'');
    return cleaned_html;
}

function saveAgendaData() {
    var serialized_agenda_data = JSON.stringify( agenda_data );
    localStorage.setItem('agenda_' + week, serialized_agenda_data);   
}

function fetchAgendaData() {
    
    var agenda_live = {};
    var agenda_saved = {};
    
    //Fetch new data
    $( '[id^=AnchorID]' ).each(function( index ) {
        var id = $( this ).attr('id').replace('AnchorID','');
        agenda_live[id] = {};
        agenda_live[id]['state'] = 'visible';
        agenda_live[id]['data'] = fetchTimeslotHtml(id);
		agenda_live[id]['day'] = getDataFromId(id)[1];
		agenda_live[id]['time'] = getDataFromId(id)[5] + "" + getDataFromId(id)[6];        
    });
    
    //Load saved data
    var agenda_saved_serialized = localStorage.getItem('agenda_' + week);
    
    //Nothing saved using live data
    if (agenda_saved_serialized == null) {
        agenda_data = agenda_live;
    } else {
        agenda_saved = JSON.parse(agenda_saved_serialized);
        for ( var id in agenda_live ) {
            //New events are just added
            if (agenda_saved[id] == null) {
                agenda_data[id] = agenda_live[id];
            } else {
                //If the data is different, use the new and thereby make it visible
                if (agenda_live[id]['data'] != agenda_saved[id]['data']) {
                	agenda_data[id] = agenda_live[id];
                } else {
                	agenda_data[id] = agenda_saved[id];
                }
            }
            //Reset all times, incase the class has been moved
            agenda_data[id]['time'] = agenda_live[id]['time'];
            agenda_data[id]['day'] = agenda_live[id]['day'];
        }

    }
    
    for (var id in agenda_data) {
        if (agenda_data[id]['data'] == '' && agenda_data[id]['state'] != 'removed') {
            agenda_data[id]['state'] = 'empty';
        }
    }
    
    saveAgendaData();
}

function createTimeSlotIcons(id, state) {
	var innerhtml = $('#Appointment' + id).html();
	var icon = green_check;
	if (state != 'empty') {
		if (state == 'visible') {
			icon = red_check;
		}
		innerhtml = '<img id="timeslot_check_' + id + '" class="timeslot_check" src="' + icon + '" width="14" style="float: right;">' + innerhtml;
	}
    innerhtml = '<img id="timeslot_remove_' + id + '" class="timeslot_remove" src="' + cross + '" width="14" style="float: right;">' + innerhtml;
	
	$('#Appointment' + id).html(innerhtml);
}

function createAgendaNode(id, state) {
    var agendanode = document.createElement("DIV");
    agendanode.setAttribute("id","agenda_"+id);
    agendanode.setAttribute("class","agenda_item time_" + agenda_data[id]['time']);
    if (state == 'hidden' || state == 'removed') {
		agendanode.setAttribute("style","display: none");
    }
    agendanode.innerHTML = '<input id="agenda_chkbox_' + id + '" class="agenda_check" type="checkbox" checked="checked">' + agenda_data[id]['data'];
    
    
    var agenda_day = agenda_data[id]['day'];
    var agenda_time = agenda_data[id]['time'];
    var agenda_day_node = document.getElementById('agenda_'+agenda_day);
    var node_infront = $("#agenda_" + agenda_day).children().filter(".agenda_item").filter(function(index) { return (this.getAttribute("class").replace('agenda_item time_','') > agenda_time); } )[0];
    if (node_infront == undefined) {   	
    	agenda_day_node.appendChild(agendanode);
    } else {
    	agenda_day_node.insertBefore(agendanode, node_infront);   
    }
}

function createAgendaNodes () {
    for (var id in agenda_data) {
        var state = agenda_data[id]['state'];
		var previous_state = agenda_data[id]['previous_state']
        
        if (state != 'empty') {
        
            createAgendaNode(id, state);
        }
		createTimeSlotIcons(id, state);
        changeTimeslot(id, state, previous_state);
		createDummyTimeslot(id, state);
    }
    
    $('.agenda_item').css('border','none');
    $('.agenda_item').css('padding','5px');
    $('.agenda_item').css('background-color','#ffffff');
    $('.agenda_check').css("float", "right");
      
}

function createDummyTimeslot(id, state) {
	var timeslot = $("#Appointment"+id).parent();
	var rowspan = timeslot.attr("rowspan");
	var context_class = timeslot.parent().children().first().attr("class")
	if (rowspan == undefined) {rowspan = 1} else {rowspan = parseInt(rowspan)};
	var colspan = timeslot.attr("colspan");
	if (colspan == undefined) {colspan = 1} else {colspan = parseInt(colspan)};
	var display_style = '';
	if (state != 'removed') {display_style = 'style="display: none;"';}
	var table = '<td id="dummy_timeslot_'+id+'" rowspan="'+rowspan+'" colspan="'+colspan+'" '+display_style+'><table width="100%" border="0" cellspacing="0" cellpadding="0">';
	for (var i=1; i <= rowspan; i++) {
		table += '<tr>';
			for (var j=1; j<= colspan; j++){
				table += '<td class="' + context_class + '" style="text-align: right; vertical-align: top">&nbsp;</td>'
			}
		table += '</tr>';
		if (context_class == 'context_alternating') {context_class = 'context_direct';} else {context_class = 'context_alternating';}
	}
	table += '</table></td>';
	timeslot.after(table);
	if (state == 'removed') {
		timeslot.hide();
	}
}

function toogleRemoved() {
	display_removed = !display_removed;
	for (id in agenda_data) {
		if (agenda_data[id]['state'] == 'removed') {
			setAgendaState(id, agenda_data[id]['state']);
		}
	}
}

function setAgendaState(id, state) {
	if (state == agenda_data[id]['state']) {
		var previous_state = agenda_data[id]['previous_state'];
	} else {
		var previous_state = agenda_data[id]['state']
		agenda_data[id]['previous_state'] = previous_state;
		agenda_data[id]['state'] = state;
	}
	$("#toogle_removed").html(removedText());
    saveAgendaData();
    changeTimeslotCheck(id, state, previous_state);
	changeTimeslot(id, state, previous_state);
	changeCheckboxAgenda(id, state);
	changeAgenda(id, state);
}

function changeAgenda(id, state) {
	if (state == 'visible') {
		$("#agenda_" + id).slideDown();
	}

	if (state == 'hidden' || state == 'removed') {
		$("#agenda_" + id).slideUp();
	}
}

function changeTimeslotCheck(id, state, previous_state) {
	if(state == 'visible') {
		$('#timeslot_check_' + id).attr("src",red_check);
	}
	if(state == 'hidden') {
		$('#timeslot_check_' + id).attr("src",green_check);
	}
	if(state == 'removed') {
		if(previous_state == 'visible') {
			$('#timeslot_check_' + id).attr("src",red_check);
		}
		if(previous_state == 'hidden') {
			$('#timeslot_check_' + id).attr("src",green_check);
		}
	}
}

function changeCheckboxAgenda(id, state) {

	if (state == 'visible') {
		$('#agenda_chkbox_' + id).attr("checked","checked");
	}

	if (state == 'hidden' || state == 'hidden') {
		$('#agenda_chkbox_' + id).removeAttr("checked");
	}

}

function fetchColorState(state) {
	var color;
	switch (state) {
		case 'empty':
		case 'hidden':
		case 'removed':
			color = 'rgba(169,245,169,0.5)';
			break;
		case 'highlight':
			color = '#f7d358';
			break;
		case 'visible':
		default:
			color = '#dedede';
			break;
		
	}
	return color;
}

function changeTimeslot(id, state, previous_state) {

	var color = fetchColorState(state);
	var previous_color = fetchColorState(previous_state);
	var opacity = '1';
	
	
 
	if (state == 'removed') {
		if (display_removed) {
			$("#dummy_timeslot_"+id).hide();
			$('#Appointment' + id).parent().show();
			color = previous_color;
			opacity = '0.5';
		} else {
			$("#dummy_timeslot_"+id).show();
			$('#Appointment' + id).parent().hide();
		}
	} else {
		if (previous_state == 'removed') {
			$("#dummy_timeslot_"+id).hide();
			$('#Appointment' + id).parent().show();
		}
	}
	
	$('#Appointment' + id).parent().css('background-color', color);
	$('#Appointment' + id).parent().css('opacity', opacity);
    
}

function removeTimeslot(id) {
	var timeslot = $("#Appointment"+id).parent();
	var rowspan = timeslot.attr("rowspan");
	var context_class = timeslot.parent().children().first().attr("class")
	if (rowspan == undefined) {rowspan = 1} else {rowspan = parseInt(rowspan)};
	var colspan = timeslot.attr("colspan");
	if (colspan == undefined) {colspan = 1} else {colspan = parseInt(colspan)};
	
	var table = '<td id="removed_td_'+id+'" rowspan="'+rowspan+'" colspan="'+colspan+'"><table width="100%" border="0" cellspacing="0" cellpadding="0">';
	for (var i=1; i <= rowspan; i++) {
		table += '<tr>';
			for (var j=1; j<= colspan; j++){
				table += '<td class="' + context_class + '" style="text-align: right; vertical-align: top">&nbsp;</td>'
			}
		table += '</tr>';
		if (context_class == 'context_alternating') {context_class = 'context_direct';} else {context_class = 'context_alternating';}
	}
	table += '</table></td>';
	timeslot.after(table);
	timeslot.hide();
}

function addFunctions() {
	$(".collapse").click(function() {
       var menu = $(this).attr('id');
       menu = menu.replace("Collapse","");
	   menu_state = $('#'+menu).attr("class");
	   if (menu_state == undefined || menu_state == 'down') {
			$(this).attr('src', blue_right);
			$('#'+menu).slideUp();
			$('#'+menu).attr("class","up");
		} else {
			$(this).attr('src', blue_down);
			$('#'+menu).slideDown();
			$('#'+menu).attr("class","down");
		}
    });
	
	$(".agenda_item").hover(function(){
        $(this).css("background-color","#dedede");
        $(this).css('border','thin solid #000000');
        $(this).css('padding','4px');
        var id = $(this).attr('id').replace('agenda_','');
        
        changeTimeslot(id,'highlight',agenda_data[id]['previous_state']);
    },function(){
        $(this).css("background-color","#ffffff");
        $(this).css('border','none');
        $(this).css('padding','5px');
        var id = $(this).attr('id').replace('agenda_','');
        changeTimeslot(id,agenda_data[id]['state'],agenda_data[id]['previous_state']);
    });
	
	$( ".agenda_check" ).click(function() {
        var attr_id = $( this ).attr('id');
        var id = attr_id.replace('agenda_chkbox_','');
        setAgendaState(id,'hidden');
    });
    
    $( ".timeslot_check" ).click(function() {
        var attr_id = $( this ).attr('id');
        var id = attr_id.replace('timeslot_check_','');
        
		
        if (agenda_data[id]['state'] == 'hidden') {
			setAgendaState(id,'visible');
        } else {
			if (agenda_data[id]['state'] == 'visible') {
				setAgendaState(id,'hidden');
			} else {
				if (agenda_data[id]['state'] == 'removed') {
					if (agenda_data[id]['previous_state'] == 'visible') {
						setAgendaState(id,'hidden');
					} else {
						setAgendaState(id,'visible');
					}
				} else {
					setAgendaState(id,'visible');
				}
			}
        }
    });
	
	$( ".timeslot_remove" ).click(function() {
        var id = $( this ).attr('id');
        id = id.replace('timeslot_remove_','');
		if (agenda_data[id]['state'] == 'removed') {
			setAgendaState(id,agenda_data[id]['previous_state']);
		} else {
			setAgendaState(id,'removed');
		}
    });
	
	$("#toogle_removed").click(function() {
        toogleRemoved();
    });
	
}

//Getting mondays date from the calendar
var week = $("small")[0].innerHTML.replace(/[(\/)]/g,'');
//Agenda_data global settings etc
var agenda_data = {};

//Removed as default;
var display_removed = false;
var number_removed = 0;

//Different icons used
var red_check = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB0VBMVEUAAAD95+L+7+v6xrj3pJD1jHHzfF76zML0kXryd1v6ysD0hG3yc1j97er1koDyblX70Mnycl3xaVL6xb3xZFD6w7zxYE36zMfwW0r96unxYVPwV0f0fXPwUkT5vbjvTUHxX1bvSD/5ubbvRDzxY17uPznvS0X95+fuOzbvR0P829r////0hYL4qKbuNjPvQ0D82tr0goDzcnHtMTHuPj782dn0f3/vRkjtLC7uOTv82Nn7y8vtKCvwUFP+8vP4r7DuNTj82Nj+8vLsIyjwTFD4ra/tMTX819j71tfsHybwSU/4rK7tLTTwSE771dfrHCT6x8n4qq3sKjLvR03qHCTycXb3qq3rKjLuR03oHSXxcnf3q67pKzPsSE7qOUDnHSXwcnf4ubvtZGnlHSXvcnf98vLqSE7znaDkHiXuc3fpSE785OXjHibuc3joSE/nSE/hHibsc3jzrK7gHybmSU/jO0LfHyfrc3jlSVDyrK/dHyfqc3jjSVDlWF3cICfjSlDgPEL75OXcLjXaICfzurzZICjwrK/YISjWISjyur3YLzbVISn65OXfWV/UIinvra/YPkTSIinura/aTFHRIin55OXrn6LfaG3VP0XPIyr21tjks+dGAAAAAXRSTlMAQObYZgAAAAFiS0dEKyS55AgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAHcSURBVBgZjcGJQwxxGAbgt0sppSQpSbIpPoVCYXPMFruOWcc4FhVlFMV2KIpKyVK6lA79tXZ+c+zcM88D2ElLgx/pGZlZu5iszIx0uMnO2W2Qkw0nuXl7LPJyYSe/YK+tgnxYFBbtc1BUCJPi/S6KYVBywFUJdEoPeiiFpqz8kIfyMqgqDnuqgKLyiA+VkFUd9aEKTPUxX6ohCdQ4Ox6oUQWQVFvn7MRJOlWnqgVQ3+Do9BkiOtugqAfQ2OTk3HmSXGiSNQJobnFw8RIxl1tkzQCCmtYrV4Mp164Tw7UGFQBCqjaOqD2kunGTGK4tpALCEcUtjpJuR2R3wsRwdyOaMPio4h4x96OSBzwx3MNoCg8IikckeywIwhOeGO6poAMgpnpGsuexFzwxXEdMD0Bnl+olyV7xxHAdXXqdALp7NK9JT3zTY9ANoLcv5S2liO/6jHoB9A/ovCeV+GHApB9J8UGdIZKJ8UGTOCTDI3pDJBE/jpgNgxkd0/tEROLnMbNRyMYnDL6Q+HXCYhyKySmD6W9TFpNQzcx+9zA7A83cDw9z0En8dJWAQeKXiwRM5hd+O1iYh8Xi0rKtpUXYWVn9Y7G6Aidr638N1tfgZmNza/sfs721uQE/dnZg5z+C05sfrM1B8gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNC0wMy0wNFQyMzozOTowMyswMTowMOG4nrEAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTQtMDMtMDRUMjM6Mzk6MDMrMDE6MDCQ5SYNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==";
var green_check = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABy1BMVEUAAADr89ff7MDW56/Q46Tt9dzX6LPO46Ls9NvS5qvN4qDX6bbL4Z7u9eDM4qHJ4Jzq89nH4Jnp89jF35fs9d7E3pXG35rC3ZPQ5q3A3ZHn8tW+3I/E4Jq9243m8dO72ovG4Z652om93JDG4Z+32Ye824/y+On////S57Tf7sm12IS62ozR57LL5Km014K52orx+OjQ5rG825Cy1oC32Yjs9eCw1n6/3pb6/ffi8M+12Ybx9+ev1Xy+3ZXh78602ITw9+e93ZXw9+at1Hq83JPg782y14L6/Per03jq9N6w1oC625Go0nXI46jf7syt1X7v9+a42o6m0HLH4qbe7sqs03vv9+W22Y2v1YGjz2/F4aXj8NPu9uW02Iq+3Zugzm3E4KP5/Pay14jV6b6ezGrC36Gw1oaby2fB36Cu1YSs1IGZymS/3p6r1IHY68WWyGK93Zyq0n+hznOUx1+83Jun0nzW6sKRxly625n4/PWm0Xur04OPxFmjz3icy26Tx2GMw1bb7MqJwlTS6L6HwFHR572Ev07Y68iKwlaCvkvw9+mfzXd/vEnP5rqNxF19u0bN5bmTx2Z6ukPv9ujE4ayiz32IwVh3uEDm8twCL2QEAAAAAXRSTlMAQObYZgAAAAFiS0dEJy0PqCMAAAAJcEhZcwAACxMAAAsTAQCanBgAAAHOSURBVDjLpdVFd4QwGEDR1N3dvam7TL2l7u3U3d3d3d3l5zZAgCCBOad3xUfeggVJAFCwsrax5dhYWwFddvYOMvZ21NTRyVnFyVG7dXHV5KKRurl7ULi7KVtPLx2e8tbbR5c32fr6GfAlYv8AA/5SGxhkKFBog0MsEIzj0DALhPJteIRFwrk4MoouOkZ8jOTiWLq4eJggDmybmESVHA8hTBGmRBSnptGkZ0BWJh5TUZyVTZHDtzAXz1kozhPlmwqkIa+wiG9N+cIbFBcLSkwQlopTWTluK8RXADCVWJWJXavGUw1ua6sqRQxg6rB6frWaGxoY3DbWSRgAmrBmfhm2oOfWNty2NxHQN5sFHbjuNHd147bHTEJxb5+gH9cDg7gd6iP1onh4RDQKSWPjIzLDKJ6YlEyR7fSk3AT7c8wQZqV2bkaB++vmFwiLQru0oDDPxcsrpFW+XVtRWua3yvoGaZNttzaU1vEe3N6R2YV7+zsq28L2PjiUOTo+VDmQDo6TUwMnxIl0dm7gjDzsLi51XciP0atrHVfKA/rm9o7i9kZ99N8/PGp6uNe8VJ6eX1Sen6j31evbu8zbq+5N+PH59f3D+f76/ACW+P0F//YHXyCCmpC+9c4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDMtMDRUMjM6NDA6MTArMDE6MDDJ1Lr7AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTAzLTA0VDIzOjQwOjEwKzAxOjAwuIkCRwAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=";
var cross = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABhlBMVEUAAADY9P3l+P6i5fps1vdEy/Uqw/Ov6PtQzfUowvOu6PpAyfQmwfLk9/1a0PUkwPK66/svw/Miv/Ks5/ogvvKr5voevfG46vscvPHj9/0nv/Iau/FRy/UXuvGo5fkVufAxwfITuPAivPE/xfOm5PkRt/AgvPHT8vz///9r0vY8xPMPtvAeu/Fp0fbi9v0Nte8cuvDT8fxo0fWV3vgLs+85wfJn0PVWyvQJsu9mz/Umu/EHse9kzvUFsO9jzvUDr+5izfTQ8PwBru5hzPQAre1gzPQArOxgy/MAq+sgte0AqupgyvJQw/AAqOlgyfGQ2fUAp+kwuO1gyPHg9PwApugQrOnQ7/swtuwApecQq+nQ7vtgx/Cg3fYApOYQqujQ7vpgxu8grugAouUQqOcwtOqg3PUAoeRAuOoAoOPg8/sQpeQAn+Kw4fYAnuGg2vMAnOAAm9+w4PUQoOAAmt5As+YAmd2g2fIgpeAAmNyg2PIwquIAltvg8vuQ0e9Qt+Ygot8AldrQ6/hrgUnlAAAAAXRSTlMAQObYZgAAAAFiS0dEKL2wtbIAAAAJcEhZcwAACxMAAAsTAQCanBgAAAHWSURBVBgZjcEJIxtBGAbg11VKKVVVqiqIfARxxBF3XHFGRBBH3KpRTUuVUuc/b3ZnzexsNrt5HsBMVhYykZ2Tm/dKlZebkw0r+QWvJQX5SKew6E2KokKYKS55a6qkGClKy96lUVYKg/L3FsohqfhgqQI6lR9tVIKrqv5ko7oKL2o+26qBpvZLBmrB1DmE+gYH11DvEOqganQKTS5qdmqaydXkFBqhaHFzrS4ianOr2ojI1ermWpDU7uE6OknR5UnqIkVnh4drB9Dt5XqI6fV6e4np8XLdAPr6BR8xPh8xvn6hD8DAoM4QSYYGdQYADEtGSGdkWAJgVDZG3NioDPCPG0yQZmLcwA//pMEUaaYmDfzAtCxAXGBaBmBGEiCdwIwEwOyczjxJ5ud0ZgEsLApBYoJBYoKLwgKApRC3TEw4FAoTsxzilgCsRLjVNVKEI0lhUqytRrgVJK1HuY1NItqKqraIaHMjyq1DsR0TdnZpL6bZo92dmLAN1f6BcHh0wB0dHgj7YI6/ZuAYmpNvtk7wIn763cZpHNzZDxtn0En8tJSAJPHLQgIG5xe/07g4R4r45R9Tl3GYubr+m+L6Cunc3P6T3N7Ayt39w+OT6vHh/g6ZeH6Gmf/lMmbuKkHSOgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNC0wMy0wNFQyMzozNToyNiswMTowMOuZVuUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTQtMDMtMDRUMjM6MzU6MjYrMDE6MDCaxO5ZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==";
var blue_down = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAMAAADWg4HyAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABa1BMVEUAAADY9P3l+P6v6fts1vdRzvUqw/PK8Pxr1fcowvPJ8Pxc0fUmwfLy+/6E3PgjwPJLy/Qhv/LW8/0twvMfvvIrwfIdvfFFyPQbu/Fj0PXH7vx92PcZuvFh0PX////F7vwXufHG7vxPyvQUuPDx+/7E7fsSt/BbzfUQtvDi9v0OtfCk4/kMtO9Wy/QKs+9m0PU2wPIHsu+j4vmT3fgmvPEFsO80v/JjzvXw+v4Dr+6h4flizfTQ8PwBru6Q3PhhzPQAre0gt+9gzPQArOxgy/MAq+swue4AqepgyfJgyfEAqOmg3vYAp+hgyPHg9PwApudgyPBQwe4ApOZgxu/A6PkAo+VAuesAouRgxe7A6PgAoeNgxO5wye8An+Jgw+3w+f0wsOcAnuEgquWAz/AQo+IAneDQ7fkQouEAnN8wreQAmt5wxuwAmd3A5vdAsuUAmNzA5fZQuOYAl9vg8vug2PJgvukwqeEAldrQ6/gYW+dEAAAAAXRSTlMAQObYZgAAAAFiS0dEHnIKICsAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAHgSURBVBgZpcEJNxtRGAbg11ZKR5Wq/bPVrprQkJBhyFhiJ/ZtbKWqlFrq5/fON5PMvZPlOKfPA2SQl4dXyC8oLHrDigoL8pFDcclbRUkxsigte5emrBQZaOXvMyrX4KdVfMiiQoOqsupjVlWVkGnVn3Ko1uDRampldfX1dbWyGg0pDY2yJhKaGmUNSGpuUbSS0NqiaIarrV1Bts/tijY4OjpVxDpVHWBd3Spi3aou2Hp6fYj1+vRA6Ov3Idbv0wfhy4APsQGfrxACQRYYHAoEGbEg+zY0GAiyAIQQGyZhJGQjFrKNhInCwyEGIcJGyTYWEYhFhDGyjUYYgKjOxolN6LpOTNf1CWLjOosCUYNNholNGQYxw5giFp40WBRAzGGSw4wRi5nkMGMOCNMukxwmMZMc5rQLwsysa44cYZLMzbpmIMTnk+KUJj6fFIewsJiyRD5LiykLEJZXPKukWF3xLMO2tu5JkCSx7lkD29iUJCglsSnZgGNrW7JDrp1tyRZcu3uyfWL7e7JdJB0cyo6IyDo6lB0gxTo+kZ2enZ2eyI4teKzz7zmcW5BdXP7I6vICKuvqZxZXFvys618ZXVvI4Ob2d5rbG2Rxd/9HcX+HHB4en57/suenxwe8wssL/tc/LhMbjZvNFW8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDMtMDRUMjM6MzI6MjcrMDE6MDCvMkYoAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTAzLTA0VDIzOjMyOjI3KzAxOjAw3m/+lAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=";
var blue_right = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABqlBMVEUAAADY9P3l+P6v6fts1vdRzvUqw/PK8Pxr1fcowvPJ8Pxc0fUmwfLy+/6E3PgjwPJLy/Qhv/LW8/0twvMfvvIrwfIdvfFIyfSr5vqd4vlFyPQbu/FGyPT///9x1fZ92PcZuvGp5fpw1PbF7vwXufGa4flu0/ZPyvQUuPAxwfLx+/5s0/bE7fsSt/Br0vZbzfUQtvBq0fbi9v0OtfBo0fZp0fak4/kMtO9n0PVWy/QKs+9m0PU2wPIHsu9kz/Vlz/UFsO9TyfTB7PtjzvUDr+5SyPPw+v4jufDQ8PwBru7A6/uA1/cAre2A1vYArOxQxvIgtu4Aq+tQxfHA6vpgy/Mwue4AqepgyfJgyfEAqOmg3vYAp+hgyPHg9PwApudgyPBQwe4ApOZgxu/A6PkAo+VAuesAouQwtOlgxe7A6PgAoeOQ1vNgxO5wye8An+Kg2/Rgw+3w+f0wsOcAnuFgw+wQo+IAneAwr+ag2vOQ1PIgqeTQ7fkQouEAnN8wreQAmt5wxuwAmd3A5vdAsuUAmNzA5fZQuOYAl9vg8vug2PJgvukwqeEAldrQ6/h48d93AAAAAXRSTlMAQObYZgAAAAFiS0dEHesDcZEAAAAJcEhZcwAACxMAAAsTAQCanBgAAAHOSURBVBgZpcGLOxRRGAfgn1tEIxGKviiKyl0hS6nQKCkV1p11KYqaFV0IEbnkf7Znvtk9Z3bOeDyP9wXOLCEBp5GYlJxyzpaSnJSIk6SmnXdJS4Wf9IwLHhnp0DEyL2plGvAwsi75yDIQJzvnsq+cbLgYuXlS/pWr+XmqXAMKo6BQukYR1wtVBQakomLFDRJuFquKEFNSqrpFttulqhJElZWr7twl271yRRkcFZVuVcSqKhUVYNU1cWqJ1dZI1bDV1XvcJ/agXqqD0NDo1USsqTGmAcLDZo0AsUBzVABCS6vOI2KPWx0tENocT566kONZmwNCO+sgvc7n7QwRZhd7QT5edjETgNnNTPLxqpuZiOhhr0mv800Pg9DrePuOdN73OiD09esMEBvod/RBCA5qBIkFB6OCEIaGvUaIjQzHDEEYHfMYJzY+Jo3CNjEZJ0QsNClNgE1Nu4WIhaYVU3DMzKo+EPs4q5hB1Ny86hPZPs+r5hCzsKj4QsLXRdUCJCu8JIWJyPq2pApbUFjLK9L3Hz9/raiWLbisrv32tbaKONb6ho91Cx7W5h+tTQs6W9t/Pba34Gdn95/L7g5Osrd/cPjfdniwv4fTODrCmR0D8TZO0xu0Ls4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTQtMDMtMDVUMDA6MjQ6MzArMDE6MDCYY+5NAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE0LTAzLTA1VDAwOjI0OjMwKzAxOjAw6T5W8QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=";

window.onload = function () {  
    
	fetchAgendaData();
    createAgendaMenu();
    createAgendaNodes();
    addMiscItems();
    addFunctions();
    
}