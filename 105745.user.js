// ==UserScript==
// @name          top ten
// @namespace     http://supunpraneeth.blogspot.com
// @description	  top ten
// @homepage      http://supunpraneeth.blogspot.com
// @include       http://www.the-top-tens.com/lists/top-10-avenged-sevenfold-songs.asp
// ==/UserScript==

s=0;
while(s=11){
recordvote2('258756','2537');
}


    
function recordvote2(itemID,listID){ 
  var span = document.getElementsByTagName("span");
    for(i=0; i<span.length; i++)if(span[i].id.match("i"))
        {
        $(span[i].id).innerHTML = '<img src="http://static.thetoptens.com/img/ajax-loader.gif" style="width:16px;height:16px;">';
        }
	
	var ajaxRequestVote;  // The variable that makes Ajax possible!
	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequestVote = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequestVote = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequestVote = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				//alert("Your browser broke!");
				return false;
			}
		}
	}
	
	// Create a function that will receive data sent from the server
	ajaxRequestVote.onreadystatechange = function(){
		if(ajaxRequestVote.readyState == 4){
			var ajaxDisplay = $('ajaxSwapSpace');
			ajaxDisplay.innerHTML = ajaxRequestVote.responseText;
			
			for(i=0; i<span.length; i++)if(span[i].id.match("i"))
			{
				if ( $('v' + span[i].id.slice(1)) )
				{
					if ($('v' + span[i].id.slice(1)).value == 'n/a')
					{
						$(span[i].id).innerHTML = "";
					}
					else
					{
						$(span[i].id).innerHTML = '<div class="voted"><i>' + $('v' + span[i].id.slice(1)).value + '</i></div>';
					}
				}
			}
			
			if ($('c' + itemID) && ajaxRequestVote.responseText.match('comment'))	
			{
				newItem = document.createElement("div");
				newItem.id = 'commentform';
				newItem.innerHTML = ajaxRequestVote.responseText.substr(ajaxRequestVote.responseText.indexOf("<div"));
				$('c' + itemID).insertBefore(newItem,$('c' + itemID).firstChild);
			}
			ajaxDisplay.innerHTML = "";
		}
	}
	
	alert('ok');

	var queryString = "id=" + itemID + "&list=" + listID;
	ajaxRequestVote.open("POST", "/recordvote.asp", true);
	ajaxRequestVote.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	ajaxRequestVote.send(queryString); 
	//pageTracker._trackEvent(itemID, 'Vote');
} 
