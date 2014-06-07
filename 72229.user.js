// ==UserScript==
// @name           GLB Remove Offers
// @namespace      GLB
// @author         DDCUnderground
// @description    Removes Offers based on position or rejection **** Note if you select either option it will remove all sent Offers for that type the variables are not used in conjunction*****
// @include        http://goallineblitz.com/game/team_offers.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready( function() {
// functions
	function buildelements(){

        var tablist = document.createElement('div');
        tablist.setAttribute('class', 'tabs');
        var tabRemove = document.createElement('div');
        tabRemove.setAttribute('class', 'subtab_off');
        tabRemove.setAttribute('id', 'tabRemove');
        var tabRemovelink = document.createElement('a');
        tabRemovelink.addEventListener('click', showRemove, false);
        tabRemovetextnode = document.createTextNode('Remove');
        tabRemovelink.appendChild(tabRemovetextnode);
        tabRemove.appendChild(tabRemovelink);

        tablist.appendChild(tabRemove);
        
        
        var Removediv = document.createElement('div');
        Removediv.setAttribute('class', 'content_container');
        Removediv.setAttribute('id', 'DDCRemoveDiv');
		$("#sent_offers").prepend('<br><br>');
		$("#sent_offers").prepend(Removediv);
        $("#sent_offers").prepend(tablist);

        buildRemovediv();
    }


	function buildRemovediv(){
        $("#DDCRemoveDiv").html('<b>Remove Options</b><hr />');
	
		var filttable = document.createElement('table');
		var row1 = document.createElement('tr');
		var cell11 = document.createElement('td');
		var cell12 = document.createElement('td');
		var cell13 = document.createElement('td');
		var cell14 = document.createElement('td');
		var row2 = document.createElement('tr');
		var cell21 = document.createElement('td');
		var cell22 = document.createElement('td');
		var cell23 = document.createElement('td');
		var cell24 = document.createElement('td');
		filttable.appendChild(row1);
		row1.appendChild(cell11);
		row1.appendChild(cell12);
		row1.appendChild(cell13);
		row1.appendChild(cell14);
		filttable.appendChild(row2);
		row2.appendChild(cell21);
		row2.appendChild(cell22);
		row2.appendChild(cell23);
		row2.appendChild(cell24);

		var row3 = document.createElement('tr');
		var cell31 = document.createElement('td');
		var cell32 = document.createElement('td');
		var cell33 = document.createElement('td');
		var cell34 = document.createElement('td');

		cell31.setAttribute('width','20%');
		cell32.setAttribute('width','30%');
		cell33.setAttribute('width','20%');
		cell34.setAttribute('width','30%');
		filttable.appendChild(row3);
		row3.appendChild(cell31);
		row3.appendChild(cell32);
		row3.appendChild(cell33);
		row3.appendChild(cell34);


		var row4 = document.createElement('tr');
		var cell41 = document.createElement('td');
		var cell42 = document.createElement('td');
		var cell43 = document.createElement('td');
		var cell44 = document.createElement('td');

		cell41.setAttribute('width','20%');
		cell42.setAttribute('width','30%');
		cell43.setAttribute('width','20%');
		cell44.setAttribute('width','30%');
		filttable.appendChild(row4);
		row4.appendChild(cell41);
		row4.appendChild(cell42);
		row4.appendChild(cell43);
		row4.appendChild(cell44);


		var row5 = document.createElement('tr');
		var cell51 = document.createElement('td');
		var cell52 = document.createElement('td');
		var cell53 = document.createElement('td');
		var cell54 = document.createElement('td');
		cell51.setAttribute('width','20%');
		cell52.setAttribute('width','30%');
		cell53.setAttribute('width','20%');
		cell54.setAttribute('width','30%');
		filttable.appendChild(row5);
		row5.appendChild(cell51);
		row5.appendChild(cell52);
		row5.appendChild(cell53);
		row5.appendChild(cell54);


		var row6 = document.createElement('tr');
		var cell61 = document.createElement('td');
		var cell62 = document.createElement('td');
		var cell63 = document.createElement('td');
		var cell64 = document.createElement('td');
		cell61.setAttribute('width','20%');
		cell62.setAttribute('width','30%');
		cell63.setAttribute('width','20%');
		cell64.setAttribute('width','30%');
		filttable.appendChild(row6);
		row6.appendChild(cell61);
		row6.appendChild(cell62);
		row6.appendChild(cell63);
		row6.appendChild(cell64);



		filttable.setAttribute('cellpadding','3');
		filttable.setAttribute('cellspacing','3');
		filttable.setAttribute('width','90%');



		var filtrejectchk = document.createElement('input');
		filtrejectchk.setAttribute('type','checkbox');
		filtrejectchk.setAttribute('id','chkreject');
		cell12.appendChild(filtrejectchk);
		cell11.innerHTML = '<b>Rejected:</b>'
		

		var filtposition = document.createElement('select');
		filtposition.setAttribute('id', 'filtposition');
		filtposition.options[0]= new Option('None', '', true, true);
		filtposition.options[1]= new Option('QB',"QB", false, false);
		filtposition.options[2]= new Option('HB',"HB", false, false);
		filtposition.options[3]= new Option('WR',"WR", false, false);
		filtposition.options[4]= new Option('TE',"TE", false, false);
		filtposition.options[5]= new Option('G',"G", false, false);
		filtposition.options[6]= new Option('C',"C", false, false);
		filtposition.options[7]= new Option('OT',"OT", false, false);
		filtposition.options[8]= new Option('FB',"FB", false, false);
		filtposition.options[9]= new Option('DT',"DT", false, false);
		filtposition.options[10]= new Option('DE',"DE", false, false);
		filtposition.options[11]= new Option('LB',"LB", false, false);
		filtposition.options[12]= new Option('CB',"CB", false, false);
		filtposition.options[13]= new Option('FS',"FS", false, false);
		filtposition.options[14]= new Option('SS',"SS", false, false);
		filtposition.options[15]= new Option('P',"P", false, false);
		filtposition.options[16]= new Option('K',"K", false, false);
		

		cell14.appendChild(filtposition);
		cell13.innerHTML = '<b>Position:</b> ';

		var updatebutton = document.createElement('input');
        updatebutton.setAttribute('type', 'button');
        updatebutton.setAttribute('value', ' Remove Offers ');
        updatebutton.setAttribute('name', 'Removebut');
        updatebutton.setAttribute('id', 'removebut');
        //updatebutton.setAttribute('alt', 'Update');
        

        cell24.appendChild(updatebutton);

        


        $('#DDCRemoveDiv').append(filttable);
        $('#DDCRemoveDiv').attr('style','display: none');
        /*$('input, select','#DDCRemoveDiv').bind('change',function(e){
            doFilt();
        });*/
		updatebutton.addEventListener('click', doRemove, false);
    }

	function showRemove(){
		if ($('#tabRemove').is('.subtab_off')) {
			$('#tabRemove').removeClass("subtab_off");
			$('#tabRemove').addClass("subtab_on");
			$('#DDCRemoveDiv').show();
		} else {
			$('#tabRemove').removeClass("subtab_on");
			$('#tabRemove').addClass("subtab_off");
			$('#DDCRemoveDiv').hide();
		}
    };

	function doRemove(){
		if (confirm("Are you sure you want to remove the players associated with the variables above?")) {
			// if yes then build list of player ids 
			var offerremoves = '';
			$('div[class*="content_container"]',$('#sent_offers')).each(function(){
				if ($("#chkreject").attr('checked')){
					var j =($('div[class*="offer_rejected"]',$(this)).length);
					if (j > 0) {
						if (offerremoves.length>0) {
							offerremoves += ',';
						}
						var curid = $('a[class*="offer_button"]',$(this)).attr("onClick");
						curid = curid.substring(curid.indexOf("'")+1,curid.indexOf(')')-1);
						offerremoves += curid;
					}
				}
				if( $("#filtposition").attr("value") != ''){
					var FiltPosition = $("#filtposition").attr("value");
					var playerpos = $('div[class*="player_name"]',$(this)).text();
					playerpos = playerpos.substring(playerpos.indexOf('Lvl. ')+5,playerpos.length);
					if (playerpos.indexOf(FiltPosition)>-1) {
						if (offerremoves.length>0) {
							offerremoves += ',';
						}
						var curid = $('a[class*="offer_button"]',$(this)).attr("onClick");
						curid = curid.substring(curid.indexOf("'")+1,curid.indexOf(')')-1);
						offerremoves += curid;
					}
				}
			})
			// see if more than one contract offer exists to be removed
			if (offerremoves.length>0) {
				// parse into array 
				var offersarr = offerremoves.split(',');
				// set first item to be deleted
				var firstdel = offersarr[0];
				if (offersarr.length>1) {
					var otheroffers ='';
					for (var i=1; i<offersarr.length; i++) {
						otheroffers += offersarr[i] +',';
					}
					otheroffers = otheroffers.substring(0,otheroffers.length-1);
					//alert(otheroffers);
					// store player ids into gm object
					GM_setValue('removeoffers',otheroffers);
				}
				//remove first contract offer
				funcremoveOffer(teamid,firstdel);
			}
		}
	}

	function funcremoveOffer(TeamId,OfferId){
		window.location.href="http://goallineblitz.com/game/team_offers.pl?team_id="+TeamId+"&delete_offer="+OfferId;
	}


// get team id
var amploc = window.location.href.indexOf('&');
if (amploc==-1) {
	amploc = window.location.href.length;
}
var teamid = window.location.href.substring(window.location.href.indexOf('team_id=')+8, amploc);
// get gm value
var pulloffers = GM_getValue("removeoffers");
// if value is not empty then process
if (typeof(pulloffers)!='undefined') {
	
	if (pulloffers.length>0) {
		if (pulloffers.indexOf(',')>-1) {
			GM_setValue("removeoffers",pulloffers.substring(pulloffers.indexOf(',')+1,pulloffers.length));
			var remoffer = pulloffers.substring(0,pulloffers.indexOf(','));
			//remove offer
			funcremoveOffer(teamid,remoffer);
		}else{
			GM_setValue("removeoffers",'');
			//remove with pulloffers variable
			funcremoveOffer(teamid,pulloffers);
		}
	}else if (window.location.href.indexOf('&')>-1) {
		window.location.href="http://goallineblitz.com/game/team_offers.pl?team_id="+teamid;
	}

}
// build options
buildelements();
unsafeWindow.changeTab('offers', 1);
})
