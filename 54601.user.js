// ==UserScript==
// @name           GLB Mass Update Equipment
// @namespace      GLB
// @description    mass update equip fund
// @include        http://goallineblitz.com/game/team_item_fund.pl?team_id=*
// @include        http://goallineblitz.com/game/new_message.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @author         ddcunderground
// ==/UserScript==
// 


$(document).ready(function(){

	// functions
	var buildobj = function(a){
		var newobj = document.createElement(arguments[0]);
		for (var varval = 1; varval < arguments.length; varval++) {
			newobj.setAttribute(arguments[varval],arguments[varval+1]);
			varval++;
		};
		return newobj;
	};


	var cururl = window.location.href;

/*

 */

	function ApplytoAll (){
        var allallowtext = $('#allallowances').attr('value');
        var allallowtypes = $('#allowance_types').attr('value');
		if ($('#chkmodval').attr('checked')) {
			$('input[name*="allowance_"]','#allowances').attr('value',allallowtext);
		}
		if ($('#chkmodsel').attr('checked')) {
			$('select[name*="allowance_type_"]>option[value="'+allallowtypes+'"]','#allowances').attr('selected', 'selected');
		}
    }

	var sendingpms = GM_getValue('DDCsendpmeq', '0');
	if (sendingpms != '0') {
		var split1 = sendingpms.split(';');
		var playersloop = new Array;
		for (var z=0; z<split1.length-1;z++) {
			playersloop[z] = new Array;
			var split2 = split1[z].split(',');
			for (var t=0;t<split2.length;t++) {
				playersloop[z][t]= split2[t];
			}
		}
		var count = playersloop.length;
		var dochtml = $('div[class="medium_head"]',$('#allowances')).html();
		$('div[class="medium_head"]',$('#allowances')).html('Sending PMs for equipment upgrades...');
		$('table',$('#allowances')).hide();
		$('input[src="/images/game/buttons/update.gif"]').hide();
		for (var we=0;we<playersloop.length;we++) {
			$.get('http://goallineblitz.com'+playersloop[we][0],function(return_data){
				var curpid = $('img[src*="/game/player_pic.pl?player_id="]',return_data).attr('src');
				curpid = '/game/player.pl?player_id=' + curpid.substring(curpid.indexOf('=')+1);
				var teamname = $('a[href*="/game/team.pl?team_id="]:last',return_data).text();
				var agentname = $('a[href*="/game/home.pl?user_id="]',return_data).text();
				for (var j=0;j<playersloop.length;j++) {
					if(curpid==playersloop[j][0]) {
						playersloop[j][4] = agentname;
						playersloop[j][5] = teamname;
						$.post('http://goallineblitz.com/game/new_message.pl', 'to=&to_name='+playersloop[j][4]+'&subject=' + playersloop[j][1] + ' has had a change to his Equipment Fund' + '&message=' + playersloop[j][1] + ' of the team ' + playersloop[j][5] + ', has had his equipment fund amount changed from $' + playersloop[j][2] + ' to $' + playersloop[j][3] + '.&action=Send');
					}
				}
				count = count-1;
				if (count==0) {
					$('div[class="medium_head"]',$('#allowances')).html(dochtml);
					$('table',$('#allowances')).show();
					$('input[src="/images/game/buttons/update.gif"]').show();
				}
			})
		}
		
		
		GM_setValue('DDCsendpmeq','0');
	}


	var playereqinfo = new Array;
	//build array for all players links and current equip fund amount
	$('tr[class="alternating_color1"],tr[class="alternating_color2"]').each(function(i){
		playereqinfo[i] = new Array;
		//player link
		playereqinfo[i][0] = $('a:first', $(this)).attr('href');
		//player name
		playereqinfo[i][1] = $('a:first', $(this)).text();
		//current equip value
		playereqinfo[i][2] = $('input[name*="allowance_"]:first', $(this)).attr('value');
	})

    var modspan = document.createElement('span');
    modspan.setAttribute('style','font-size: 14px; font-family:Arial; font-weight: bold;');
    var modtext = document.createTextNode('Mass Update Values: ');
    var modspaces = document.createTextNode('    ');
	var modcheckval = buildobj('input','type','checkbox','id','chkmodval', 'checked',true);
    var modvalue = document.createElement('input');
    modvalue.setAttribute('type','text');
    modvalue.setAttribute('name','allallowances');
    modvalue.setAttribute('id','allallowances');
    modvalue.setAttribute('value','0');
    modvalue.setAttribute('size','6');
	var modchecksel = buildobj('input','type','checkbox','id','chkmodsel', 'checked',true);
	var modselect = document.createElement('select');
    modselect.setAttribute('id','allowance_types');
    modselect.setAttribute('name','allowance_types');
    modselect.setAttribute('style','width: 200px;');
    modselect.options[0] = new Option('Spend Player Cash First','player_first', false, false);
    modselect.options[1] = new Option('Spend EQ Fund First, Always','team_first', true, true);
    modselect.options[2] = new Option('Spend EQ Fund first unless player has enough cash','team_emergency', false, false);
    
    //build button
    var subpagehidden = document.createElement("input");
    subpagehidden.setAttribute("name", "Apply to All");
    subpagehidden.setAttribute("type", "button");
    subpagehidden.setAttribute("id", "multibutton")
    subpagehidden.setAttribute("value", "Apply to All");
    subpagehidden.addEventListener("click", ApplytoAll,false);

	//build checkbox for send pm 
	var chksendpm = document.createElement("input");
	chksendpm.setAttribute('type','checkbox');
	chksendpm.setAttribute('id','DDCsendpmeq');
	chksendpm.setAttribute('checked', true);

	var txtsendpm = document.createTextNode("Send PM if funding has changed");

	var linebreak = document.createElement('br');

	modspan.appendChild(chksendpm);
	modspan.appendChild(txtsendpm);
	modspan.appendChild(linebreak);
    modspan.appendChild(modtext);
	modspan.appendChild(modcheckval);
    modspan.appendChild(modvalue);
    modspan.appendChild(modspaces);
	modspan.appendChild(modchecksel);
	modspan.appendChild(modselect);
    $('#allowances').prepend(subpagehidden);
    $('#allowances').prepend(modspan);
    $('input[src="/images/game/buttons/update.gif"]').click(function(i){
		var ischecked = $('#DDCsendpmeq').attr('checked');
		if (ischecked) {
			var tosendpms = new Array;
			$('tr[class="alternating_color1"],tr[class="alternating_color2"]').each(function(z){
				playereqinfo[z][3] = $('input[name*="allowance_"]:first', $(this)).attr('value');
			})
			var sendstring = '';
			for (var q=0;q<playereqinfo.length;q++) {
				if (playereqinfo[q][2] != playereqinfo[q][3]) {
					sendstring += playereqinfo[q].join(',') + ';';
				}
			}
			
			GM_setValue('DDCsendpmeq', sendstring);
		}
	})
})
