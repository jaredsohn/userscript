// ==UserScript==
// @name Senate Vote Tabulator
// @author Terr 
// @namespace http://deltanin.blogspot.com/ 
// @version 1.0.0
// @description  Automatically tallies totals in US Senate votes, by party and by vote type..
// @include http://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm*
// @include http://experts-exchange.com/*
// ==/UserScript==


	document.addEventListener('load', function(ev) {	    		
			
	// Find senators by name--easier to parse. There should be only one
	// <a name="name"></a> Element
	var a_named = document.getElementsByName('name');		
	var name_marker = a_named.item(0);
	
	// Advance to the first table
	var current = name_marker;		
	while(true){
		current = current.nextSibling;
		if((current == null) || (current.nodeName.toLowerCase() == 'table')){
			break;
		}
	}
	if(current == null){
		alert("Error in UserJS script: Cannot find vote table in page");	
	}
	/* 
	So we have the table.  Expect a tbody, then one row, and 
	inside that row some cells (three, generally).
	
	Senators are in the form
	
	Lastname (X-ST), <B>votelabel</b><br>
	
	Where votelabel is "Yea", "Not Voting", "Nay"
	
	*/
	
			
	var temp_recs = [];				
	var robj = new RegExp('^\\s*([\\w-]+)\\s*\\((\\w+)-(\\w\\w)\\),?\\s*$','');		
	var element_tr = current.firstChild.firstChild;
	for(var i = 0; i < element_tr.childNodes.length; i++){
		var cur_rec = [];
		var element_td = element_tr.childNodes[i];			
		for(var j = 0; j < element_td.childNodes.length; j++){				
			var piece = element_td.childNodes[j];				
			// Push text, vote, br					
			if(piece.nodeName.toLowerCase() == 'br'){										
				temp_recs.push(cur_rec);
				cur_rec = [];
			}else if(piece.nodeName.toLowerCase() == 'b'){					
				cur_rec.push(piece.firstChild);
			}else if(cur_rec.length >= 3){
				temp_recs.push(cur_rec);
				cur_rec = [];
				cur_rec.push(piece);
			}else{
				cur_rec.push(piece);
			}
		}
	}
	/* 
		Votes will be an array of arrays. 
		Sub-arrays will contain:
		Name, Party, State, Vote
	*/
	var finalresults = [];
	for(var i = 0; i < temp_recs.length; i++){
		var cur_rec = temp_recs[i];			
		var lump = cur_rec[0].data; // Should be "Name (X-ST),"
		var position = cur_rec[1].data; // "Yea","Nay","Not Voting"			
		var bits = robj.exec(lump);			
		if(bits == null){
			alert("Error in UserJS script: Cannot parse out senator/party/state data: '"+lump+"'");
			return;
		}
		var name = bits[1];			
		var party = bits[2];
		if((party != 'D') && (party != 'R')){
			party = 'I';
			// Recently, Sen. Lieberman is down as "ID" for "Independent Democrat".
			// This way we condense all third parties into "I".
		}
		var state = bits[3];
		var ret = [name,party,state,position];
		finalresults.push(ret);						
	}
	/* 
		Stored in 3x3 array
		vote_totals[party][voted] = total;
	*/
	var vote_totals = {
		"D":{"Yea":0,"Nay":0,"Not Voting":0},
		"R":{"Yea":0,"Nay":0,"Not Voting":0},
		"I":{"Yea":0,"Nay":0,"Not Voting":0}
	};
	
	for(var i = 0; i < finalresults.length; i++){
		var bits = finalresults[i];
		var pty = bits[1];
		var vt = bits[3];		
		
		vote_totals[pty][vt] = vote_totals[pty][vt]+1;
	}
	
	
	var table = document.createElement('table');
	table.setAttribute('border',1);
	var header = document.createElement('tr');
	table.appendChild(header);
	var th = document.createElement('th');
	th.appendChild(document.createTextNode(''));
	header.appendChild(th);		
	
	for(vote in vote_totals['D']){
		var th = document.createElement('th');
		th.appendChild(document.createTextNode(vote));
		header.appendChild(th);
	}
	// Header constructed, do body.		
		
	for(party in vote_totals){				
		var tr = document.createElement('tr');
		table.appendChild(tr);
		var th = document.createElement('th');
		th.appendChild(document.createTextNode(party));
		tr.appendChild(th);
		for(vote in vote_totals[party]){
			var td = document.createElement('td');
			tr.appendChild(td);
			td.appendChild(document.createTextNode(vote_totals[party][vote]));				
		}
		
	
	}				
	var details = location.search.replace('?','');
	details = details.split("&")		
	var newwin = window.open('about:blank','voteresults_'+location.search,'height=300,width=300');
	newwin.document.body.onload = function(){	
		var header = document.createElement('h2');
		header.appendChild(document.createTextNode('Senate Vote Summary'));
		this.appendChild(header);
		for(var i = 0; i < details.length; i++){
			var dheader = document.createElement('p');
			dheader.appendChild(document.createTextNode(details[i]));
			this.appendChild(dheader);
		}
					
		
		this.appendChild(table);	
		this.appendChild(document.createTextNode("Senate Vote Tabulator by Terr"));
	};
		
	
	
	//alert(vote_totals);
	
	

}, false);			


