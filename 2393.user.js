// ==UserScript==
// @namespace     http://www.tweaksthelimbs.org/greasemonkey/
// @name          eBay Auto Feedback
// @description   Fetches random feedback from The eBay Feedback Generator (http://thesurrealist.co.uk/feedback) and fills in the comment field on eBay feedback pages.
// @include       http://feedback.ebay.com/*
// @version	   0.1
// @GM_version	   0.6.4
// @FF_version    1.5
// ==/UserScript==

//***Configuration***
var frivolous = false; //set to true if you want frivolous vocabulary
var quality = true; //set to true to enable content about item quality in message
var packing = false; //set to true to enable content about item packaginging in message
var speed = false; //set to true to enable content about item speed in message
var rating = true; //set to true to enable content about rating in message
//******************

//***Initialization***
var inputs = document.getElementsByTagName('input');
var commentField = inputs.namedItem('comment');
var commentField0 = inputs.namedItem('comment0');
if(commentField||commentField0) addCommentLink();

//***Fectch feedback***
function getFeedback(e){
	var index = e.target.getAttribute('id').replace(/commentLink/,'');
	var myCommentField = commentField ? inputs.namedItem('comment') : inputs.namedItem('comment'+index);
	for(i=0;i<inputs.length;i++){
		if(inputs[i].name=='which'+index && inputs[i].checked==true){
			var mood=(inputs[i].value=='neutral'?'indifferent':inputs[i].value);
		}
		if(inputs[i].name=='party'+index && inputs[i].checked==true){
			var party=inputs[i].value;
		}
	}
	if(mood == 'none'){
		alert('Please select a Positive, Negative or Neutral rating, and try fetching a message again.');
		return;
	}
	else if(mood){
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: 'http://thesurrealist.co.uk/feedback?who='+party+(quality?'&quality=on':'')+(speed?'&speed=on':'')+(packing?'&packing=on':'')+(rating?'&rating=on':'')+'&maxlen=80&mood='+mood+(frivolous?'&vocab=frivolous':'&vocab=basic'),
		    onreadystatechange: function(responseDetails) {
		    		myCommentField.value = 'Fetching comment...';
		    },
		    onerror: function(responseDetails) {
		    		myCommentField.value = 'Error fetching comment...';
		    },
		    onload: function(responseDetails) {
		        var details = responseDetails.responseText;
		        var tt = details.slice(details.indexOf('<tt>')+4,details.indexOf('</tt>'));
		        var feedback = tt.split(' <br>');
		        myCommentField.value = feedback[0];
		        myCommentField.focus();
		    }
		});
	}
}

//***Add new elements to page***
function addCommentLink(){
	var b = document.getElementsByTagName('b');
	var c = commentField ? '' : 0;
	for(i=0;i<b.length;i++){
	   if(/Comment/.test(b[i].innerHTML)){
			b[i].innerHTML = '<a href="javascript:;" title="Click to fetch a feedback comment." id="commentLink'+c+'">Fetch Comment:</a>';
			tr = b[i].parentNode.parentNode;
			party = document.createElement('tr');
			party.setAttribute('align','left');
			label = document.createElement('td');
			label.setAttribute('valign','top');			
			label.setAttribute('width','18%');			
			label.setAttribute('height','30');
			label.setAttribute('style','font-weight:bold');	
			label.innerHTML = 'Feedback for:';
			party.appendChild(label);		
			content = document.createElement('td');
			content.setAttribute('valign','top');			
			content.setAttribute('colspan','2');
			content.innerHTML = '<input type="radio" name="party'+c+'" value="seller" checked>Seller<img src="http://pics.ebaystatic.com/aw/pics/spacer.gif" width="13" height="1" alt=" " title=""><input type="radio" name="party'+c+'" value="buyer">Buyer';			
			party.appendChild(content);		
			tr.parentNode.insertBefore(party,tr);
			document.getElementById('commentLink'+c).addEventListener('click',getFeedback,false);
			if(!commentField) c++;
	   }
	}
}

