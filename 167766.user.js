// ==UserScript==
// @name           Xbox.com Achievement Timestamps (Test before update)
// @description    Show full timestamps for xbox.com achievements.
// @author         acdougla17
// @include        http*://live.xbox.com*
// @version        0.2
// ==/UserScript==

window.addEventListener("load", function(e) {


	var myGamertag;
	var theirGamertag;				/*person being compared to*/
	var isComparing;				/*am I comparing games or looking at my own achievement list?*/
	var rawData = new Array();		/*The raw achievement data that contains timestamp info*/
	var achCounter = -1;			/*counter for iterating through achievements*/
	var curAch;
	
	
	var achievements = null;        /*holds achievement list HTML*/
	var temp = document.getElementsByTagName("ol");	/*grab the full HTML containing all the achievements (possibly some extra)*/
	for(i=0;i<temp.length;i++){		/*make sure we have the correct <ol> (encase xbox.com changes anything)*/
		if(temp[i].className == "achievements")
			achievements = temp[i];
	}
	if(!achievements)	return false;			/*if the achievement list is not found*/
	var achItems = achievements.getElementsByTagName("li");	/*all the <li> elements within the achievement list*/
	
	isComparing = findGamertags();  /*find out if I am comparing games or looking at my own achievement list*/
	getRawAchievementData();		/*grab all the achievement data in its raw form*/
	
	if(isComparing){                /*if we are comparing achievements with someone*/
		for(i=0;i<achItems.length;i++){   /*loop through the HTML achievement list (all the <li>'s)*/
			if(i%3 == 0){                 /*the first of every set of 3 <li>'s contains the achievement title, point value, and description*/
				var tempTitle = achItems[i].getElementsByClassName("name"); /*get the achievement name*/
				curAch = tempTitle[0].innerHTML;    /*set the name as the current Achievement (curAch)*/
				achCounter++;                       /*increment the achievement counter (achCounter)*/
			}
			if((i-1)%3 == 0){             /*the second of every set of 3 <li>'s contains their achievement status (unlocked or not)*/
				getTimestamp(theirGamertag);    /*go find the raw timestamp for this achievement (looks like this Date(1349238432487))*/
			}
			else if((i-2)%3 == 0)         /*the third of every set of 3 <li>'s contains my achievement status (unlocked or not)*/
				getTimestamp(myGamertag);
		}
	}
	else{                          /*not comparing games with someone*/
		for(i=0;i<achItems.length;i++){   /*loop through the HTML achievement list*/
			var tempTitle = achItems[i].getElementsByClassName("name");  /*get the achievement name*/
			curAch = tempTitle[0].innerHTML;     /*set the name as the current Achievement (curAch)*/
			achCounter++;                        /*increment the achievement counter (achCounter)*/
			getTimestamp(myGamertag);            /*go find the raw timestamp for this achievement (looks like this Date(1349238432487))*/
		}
	}
	
	/*
	 * This function searches the webpage to determine if you are comparing games with another player, or just viewing your own achievement list
	 * returns true if you are comparing games with someone. Otherwise it will return false
	 */
	function findGamertags(){
        
        /*this regular expression is used to cut out the section of code that contains the player information*/
	    var playersRegExp = new RegExp(/{"Players":(.*?)"LastPlayed"/g);
	    var playerData = playersRegExp.exec(document.body.innerHTML);      /*run the regular expression to get the result*/
	    /*this regular expression is used to find the gamertags within the player information*/
		var gamertagExp = new RegExp(/[\[,]{"Gamertag":"(.*?)","Gamerpic"/g);
		
		/*after executing the regular expression once, it will return the gamertag of the person being compared to (or your gamertag if not comparing)*/
		theirGamertag = gamertagExp.exec(playerData)[1];  
		/*after executing the regular expression again, it will return your gamertag regardless of whether you are comparing or not*/
		var myGamertag = gamertagExp.exec(playerData)[1];
	
		if(myGamertag == theirGamertag)   /*if my gamertag is the same as their gamertag, it means I am not comparing games*/
			return false;
		else              /*otherwise, I am comparing games with someone*/
			return true;
		
	}

    /*
     * This function uses a regular expression to go through the page and find all the achievements raw data (unlock status, if the achievement is secret
     * and should it be hidden from the viewee, the raw time stamp which is in epoch format) 
     */
	function getRawAchievementData(){
	
		var achRegExp = new RegExp(/{"Id":(.*?)}}}[,\]]/g); /*each achievement starts with   {"Id":    and ends with    }}}   and ends with either   ,  or  ]  */
		while(true){
			var result = achRegExp.exec(document.body.innerHTML);
			if(!result)  /*if there are no more results, then exit loop*/
				break;
			else
				rawData.push(result);   /*push the achievement into the array*/
		}
	
	}

	function getTimestamp(gamer){
		var tempAch = achItems[i].getElementsByClassName("earnedOn")[0];   /*if the achievement is not unlocked, tempAch will be null*/
		if(!tempAch) return false;
		if(tempAch.innerHTML != "unlocked"){  /*offline achievements will simply have the text "unlocked"*/
			var achFound = -1;       /*used to determine if the matching raw data was found for the achievement*/
			searchAch = curAch.toLowerCase();    /*make the current achievement all lowercase*/
			//searchAch = searchAch.replace(/[\']/g,"(\\\\u0027)");     /*deal with achievements that have single quotes(')*/
			searchAch = searchAch.replace(/[\"]/g,"(\\\\u0022)");     /*deal with achievements that have double quotes (")*/
			searchAch = searchAch.replace(/[&]/g,"(\\\\u0026)");     /*deal with achievements that have ampersand (&)*/
			searchReg = new RegExp(searchAch);   /*create a regular expression to search with*/
			
			for(j=0;j<rawData.length;j++){	/*loop through the raw data to find timestamp for this achievement*/
				var d = String(rawData[j]).toLowerCase();	/*typecast to string and make it all lowercase*/
				if(d.search(searchReg) != -1)	/*if raw data contains current achievement*/
				{
					achFound = j;      /*achFound now holds location of raw data in the array*/
					break;
				}
			}
			if(achFound == -1){	/*if the achievement was not found anywhere (this should never be true)*/
                var gameId = new RegExp(/"Game":{"Id":(.*?),"Name":/g).exec(document.body.innerHTML)[1];
			    tempAch.innerHTML += "<br><a href='http://www.gamercardcreator.netai.net/timestamps/brokenstamp.php?t=" + gameId + "' target='_blank'>Report Broken Timestamp</a>";
				return false;
			}
			var achData = String(rawData[achFound]); /*raw data for this specific achievement*/
			if(achData.search(gamer) != -1){         /*search the acheivement data to see if the gamertag of current "gamer" is found*/
				var dateRegExp = new RegExp(/"EarnedOn":"\\\/Date\(.*?\)\\\/","IsOffline":false/g);  /*gets the epoch time*/ 
				var dateRaw = dateRegExp.exec(achData);
				
				if((i-2)%3 == 0 && isComparing) /*if comparing games and we are looking for my achievement data, execute regular expression again*/
					dateRaw = dateRegExp.exec(achData);
					
				if(dateRaw != null){
					var timestamp = dateRaw[0].replace(/.*\(([0-9]*)\).*/, "$1");
					var date = new Date(parseInt(timestamp));      /*convert the timestamp to an acceptable format*/
					var formattedDate = date.toUTCString();        /*now convert the date to readable string*/
					formattedDate = formattedDate.replace(" GMT", "");  /*remove the timezone*/
					//formattedDate = formattedDate.substring(formattedDate.length-8,formattedDate.length);
					formattedDate += "." + date.getUTCMilliseconds();  /*add the milliseconds to timestamp*/
    	       		tempAch.innerHTML = formattedDate;    /*update the timestamp on the webpage*/
				}
			}
		}
		else  /*achievement is unlocked offline*/
			tempAch.innerHTML += " offline"; /*add the text "offline" so it will now say "unlocked offline"*/
		return true;
	}
		
}, false);
