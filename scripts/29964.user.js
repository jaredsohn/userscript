// ==UserScript==

// @name           Individual Animated Avatars

// @namespace      Dudeamis Griff

// @description    Each player now has their own animated avatars

// @include        http://goallineblitz.com/game/replay.pl?pbp_id=*

// ==/UserScript==




window.setTimeout( function()
{



var allDivs, thisDiv, id;
allDivs = document.evaluate(
    "//*[@class='player_icon']", //FIND THOSE PLAYERS
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) 
{


    
    thisDiv = allDivs.snapshotItem(i);


    id = thisDiv.id; //WHERE DA ID AT
    
if (id=='ball')
{thisDiv.innerHTML = '<img src="http://goallineblitz.com/images/ball.gif">';}

else if (id == 'ds') //fixes conflict with first down marker script
{}

else if (id == '36705' || id == '415893' || id == '416253' || id == '372980' || id == '409340' || id == '87816' || id == '425043' || id == '511757' || id == '379276' || id == '296393' || id == '466921' || id == '405766' || id == '514452' || id == '423329' || id == '423329' || id == '503786' || id == '567124' || id == '512186' || id == '300106' || id == '295211' || id == '124565' || id == '444886' || id == '469287' || id == '395278' || id == '300141' || id == '565493' || id == '418770' || id == '564008' || id == '78740' || id == '300127'  || id== '517334' || id== '388691' || id== '76618' || id== '432881' || id== '343682' || id== '466824' || id== '389157' || id== '182148' || id== '487769' || id== '416251' || id== '345590' || id== '291818' || id== '528270' || id== '338753' || id== '514536' || id== '514987' || id== '61576' || id== '394109' || id== '565925' || id== '509812' || id== '511767' || id== '349551' || id== '531828' || id== '296356' || id== '445132' || id== '182078' || id== '371969' || id== '424088' || id == '511830' || id == '510870' || id == '510889')
	
	//if offense is facing down
	if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) < 6.5)
	
		//if playing offense
		if (thisDiv.innerHTML == '<img src="/images/LOT.png">' || thisDiv.innerHTML == '<img src="/images/ROT.png">' || thisDiv.innerHTML == '<img src="/images/C.png">' || thisDiv.innerHTML == '<img src="/images/LG.png">' || thisDiv.innerHTML == '<img src="/images/RG.png">' || thisDiv.innerHTML == '<img src="/images/TE.png">' || thisDiv.innerHTML == '<img src="/images/QB.png">' || thisDiv.innerHTML == '<img src="/images/WR.png">' || thisDiv.innerHTML == '<img src="/images/HB.png">' || thisDiv.innerHTML == '<img src="/images/FB.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/' +id+ 'front.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/' +id+ 'back.gif">';}
		
		
	//offense is facing up
	else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) < parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) < 6.5)
		
		//if playing offense
		if (thisDiv.innerHTML == '<img src="/images/LOT.png">' || thisDiv.innerHTML == '<img src="/images/ROT.png">' || thisDiv.innerHTML == '<img src="/images/C.png">' || thisDiv.innerHTML == '<img src="/images/LG.png">' || thisDiv.innerHTML == '<img src="/images/RG.png">' || thisDiv.innerHTML == '<img src="/images/TE.png">' || thisDiv.innerHTML == '<img src="/images/QB.png">' || thisDiv.innerHTML == '<img src="/images/WR.png">' || thisDiv.innerHTML == '<img src="/images/HB.png">' || thisDiv.innerHTML == '<img src="/images/FB.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/' +id+ 'back.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/' +id+ 'front.gif">';}


	//d is kicking down
	else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) > 6.5)
		
		//if on KRS
		if (thisDiv.innerHTML == '<img src="/images/KRS.png">' || thisDiv.innerHTML == '<img src="/images/KR.png">' || thisDiv.innerHTML == '<img src="/images/PR.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/' + id + 'back.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/' + id + 'front.gif">';}

	//d is kicking up
	else 
		//if on KRS
		if (thisDiv.innerHTML == '<img src="/images/KRS.png">' || thisDiv.innerHTML == '<img src="/images/KR.png">' || thisDiv.innerHTML == '<img src="/images/PR.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/' +id+ 'front.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/' +id+ 'back.gif">';}




else
	//if offense is facing down
	if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) < 6.5)
	
		//if playing offense
		if (thisDiv.innerHTML == '<img src="/images/LOT.png">' || thisDiv.innerHTML == '<img src="/images/ROT.png">' || thisDiv.innerHTML == '<img src="/images/C.png">' || thisDiv.innerHTML == '<img src="/images/LG.png">' || thisDiv.innerHTML == '<img src="/images/RG.png">' || thisDiv.innerHTML == '<img src="/images/TE.png">' || thisDiv.innerHTML == '<img src="/images/QB.png">' || thisDiv.innerHTML == '<img src="/images/WR.png">' || thisDiv.innerHTML == '<img src="/images/HB.png">' || thisDiv.innerHTML == '<img src="/images/FB.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/NAfront.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/NABback.gif">';}
		
		
	//offense is facing up
	else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) < parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) < 6.5)
		
		//if playing offense
		if (thisDiv.innerHTML == '<img src="/images/LOT.png">' || thisDiv.innerHTML == '<img src="/images/ROT.png">' || thisDiv.innerHTML == '<img src="/images/C.png">' || thisDiv.innerHTML == '<img src="/images/LG.png">' || thisDiv.innerHTML == '<img src="/images/RG.png">' || thisDiv.innerHTML == '<img src="/images/TE.png">' || thisDiv.innerHTML == '<img src="/images/QB.png">' || thisDiv.innerHTML == '<img src="/images/WR.png">' || thisDiv.innerHTML == '<img src="/images/HB.png">' || thisDiv.innerHTML == '<img src="/images/FB.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/NABback.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/NAfront.gif">';}


	//d is kicking down
	else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) > 6.5)
		
		//if on KRS
		if (thisDiv.innerHTML == '<img src="/images/KRS.png">' || thisDiv.innerHTML == '<img src="/images/KR.png">' || thisDiv.innerHTML == '<img src="/images/PR.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/NABback.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/NAfront.gif">';}

	//d is kicking up
	else 
		//if on KRS
		if (thisDiv.innerHTML == '<img src="/images/KRS.png">' || thisDiv.innerHTML == '<img src="/images/KR.png">' || thisDiv.innerHTML == '<img src="/images/PR.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/NAfront.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/NABback.gif">';}


}



}

)