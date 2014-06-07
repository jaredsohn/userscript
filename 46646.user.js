// ==UserScript==

// @name          	Offer Page reWrite

// @description    	Makes contract offers the default start page and adds the ability to automatically delete rejected offers.

// @namespace      	http://goallinebliz.com

// @include        	http://goallineblitz.com/game/team_offers.pl*

// @creator		garrettfoster

// @version    		09.06.14

// ==/UserScript==





window.setTimeout( function() 

{

	//set the contract offers page to default start

	unsafeWindow.changeTab('offers', 1);	

	

	//create a div to put the new buttons in

	var newDiv = document.createElement('div');

	newDiv.setAttribute('id', 'deleteMenu');

	newDiv.align = 'right';

	location = document.getElementsByClassName('tabs')[0];

	location.parentNode.insertBefore(newDiv, location.nextSibling);



	//create a drop down list

	var deleteList = '<select id="deleteList" style="text-align:center;"><option disabled="disabled" selected="selected">---None---</option><option value="all">All Offers</option><option value="rejected">Rejected Offers</option><option disabled="disabled">---By Position----</option><option disabled="disabled">---Offense---</option><option value="QB">QB</option><option value="HB">HB</option><option value="FB">FB</option><option value="WR">WR</option><option value="TE">TE</option><option value="OT">OT</option><option value="G">G</option><option value="C">C</option><option disabled="disabled">---Defense---</option><option value="DT">DT</option><option value="DE">DE</option><option value="LB">LB</option><option value="CB">CB</option><option value="SS">SS</option><option value="FS">FS</option><option disabled="disabled">---Special Teams---</option><option value="K">K</option><option value="P">P</option></select>';

	

	//insert the drop down list into the div

	location = document.getElementById('deleteMenu');

	location.innerHTML = deleteList;



	//create a button to delete the offers

	var deleteButton = document.createElement("input");

	deleteButton.setAttribute("type", "button");

	deleteButton.setAttribute("id", "delete")

	deleteButton.setAttribute("value", "Delete");

	deleteButton.addEventListener("click", deleteOffers,false);

	

	// insert the button into the div

	location = document.getElementById('deleteMenu');

	location.appendChild(deleteButton);



	//nothing to delete

	function noValues(){

		alert('There are no offers to be deleted.');
		deleteButton.removeAttribute("disabled", true);

		deleteButton.setAttribute("value", "Delete")

	}



	// priming the code

	function deleteMarked(markedOffers){

		if (markedOffers.length > 0) {

			

			//make sure they want to do it		

			if (confirm('Really delete ' +  markedOffers.length + ' offer(s)?')) {

	

				//get the teamID

				var url = window.location.href;				
				var teamId = url.split('=', 2)[1];

			

				//loop through the rejections

				for ( var i = 0; i<markedOffers.length; i++){ 	



					//get the offer id

					console.log(markedOffers[i]);					
					var offerId = markedOffers[i].innerHTML.split('deleteOffer(\'', 2)[1].split('\')', 2)[0];
					console.log(offerId);

							

					GM_xmlhttpRequest({

						method: 'GET',

						url: 'http://goallineblitz.com/game/team_offers.pl?team_id=' + teamId + '&delete_offer='+ offerId, 					});

				}



				alert('Selected offers have been deleted.');			

				window.location.reload();



			} else {

				noValues();

			}		

		}

	}







	//funtion to delete messages

	function deleteOffers (){

	

		//lock the button		

		deleteButton.setAttribute("disabled", true);

		deleteButton.setAttribute("value", "Deleting Offers...");



		var deletionFilter = document.getElementById('deleteList').value ;



		var markedOffers = new Array();



		//mark the offers to be deleted for each case

		switch (deletionFilter){



			case 'all':

				markedOffers = document.getElementsByClassName('offer content_container'); 

				if (markedOffers.length == 0) {noValues(); break;}				

				deleteMarked(markedOffers);			

			break;

			case 'rejected':

				var temp = document.getElementsByClassName('offer_rejected');

				if (temp.length == 0) {noValues(); break;}				

				for (var i=0; i<temp.length; i++){

					markedOffers[i] = temp[i].parentNode.parentNode; 

				}	

				deleteMarked(markedOffers);			

			break;

			default: //this means a position has been selected

				var temp = document.getElementsByClassName('player_name'); 

				if (temp.length == 0) {noValues(); break;}

				

				var temp1 = new Array();				

				

				for (var i=0; i<temp.length; i++){

					temp1[i] = temp[i].getElementsByTagName('b')[0]; 

				}	



				var temp2 = new Array();				

                                var k =0;

				for (var j=0; j<temp1.length; j++){

					

					temp2 = temp1[j].innerHTML.split(' ', 3)[2];

					if (temp2 == deletionFilter){

						markedOffers[k] = temp[j].parentNode.parentNode;

						k++;					

					}								

				} 

				if (markedOffers.length == 0) {noValues(); break;}

				deleteMarked(markedOffers);						

		}

	}

	

},60);