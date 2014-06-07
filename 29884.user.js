// ==UserScript==

// @name           individual avatars

// @namespace      Dudeamis Griff

// @description    individual animated gifs for every player

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

else if (id == '36705') //if Hunter Haywood
	
	//if offense is facing down
	if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) < 6.5)
	
		//if playing offense
		if (thisDiv.innerHTML == '<img src="/images/LOT.png">' || thisDiv.innerHTML == '<img src="/images/ROT.png">' || thisDiv.innerHTML == '<img src="/images/C.png">' || thisDiv.innerHTML == '<img src="/images/LG.png">' || thisDiv.innerHTML == '<img src="/images/RG.png">' || thisDiv.innerHTML == '<img src="/images/TE.png">' || thisDiv.innerHTML == '<img src="/images/QB.png">' || thisDiv.innerHTML == '<img src="/images/WR.png">' || thisDiv.innerHTML == '<img src="/images/HB.png">' || thisDiv.innerHTML == '<img src="/images/FB.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB26front.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB26back.gif">';}
		
		
	//offense is facing up
	else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) < parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) < 6.5)
		
		//if playing offense
		if (thisDiv.innerHTML == '<img src="/images/LOT.png">' || thisDiv.innerHTML == '<img src="/images/ROT.png">' || thisDiv.innerHTML == '<img src="/images/C.png">' || thisDiv.innerHTML == '<img src="/images/LG.png">' || thisDiv.innerHTML == '<img src="/images/RG.png">' || thisDiv.innerHTML == '<img src="/images/TE.png">' || thisDiv.innerHTML == '<img src="/images/QB.png">' || thisDiv.innerHTML == '<img src="/images/WR.png">' || thisDiv.innerHTML == '<img src="/images/HB.png">' || thisDiv.innerHTML == '<img src="/images/FB.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB26back.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB26front.gif">';}


	//d is kicking down
	else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) > 6.5)
		
		//if on KRS
		if (thisDiv.innerHTML == '<img src="/images/KRS.png">' || thisDiv.innerHTML == '<img src="/images/KR.png">' || thisDiv.innerHTML == '<img src="/images/PR.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB26back.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB26front.gif">';}

	//d is kicking up
	else 
		//if on KRS
		if (thisDiv.innerHTML == '<img src="/images/KRS.png">' || thisDiv.innerHTML == '<img src="/images/KR.png">' || thisDiv.innerHTML == '<img src="/images/PR.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB26front.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB26back.gif">';}



else if (id == '415893') //if Devil Dawgg
	
	//if offense is facing down
	if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) < 6.5)
	
		//if playing offense
		if (thisDiv.innerHTML == '<img src="/images/LOT.png">' || thisDiv.innerHTML == '<img src="/images/ROT.png">' || thisDiv.innerHTML == '<img src="/images/C.png">' || thisDiv.innerHTML == '<img src="/images/LG.png">' || thisDiv.innerHTML == '<img src="/images/RG.png">' || thisDiv.innerHTML == '<img src="/images/TE.png">' || thisDiv.innerHTML == '<img src="/images/QB.png">' || thisDiv.innerHTML == '<img src="/images/WR.png">' || thisDiv.innerHTML == '<img src="/images/HB.png">' || thisDiv.innerHTML == '<img src="/images/FB.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB23front.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB23back.gif">';}
		
		
	//offense is facing up
	else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) < parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) < 6.5)
		
		//if playing offense
		if (thisDiv.innerHTML == '<img src="/images/LOT.png">' || thisDiv.innerHTML == '<img src="/images/ROT.png">' || thisDiv.innerHTML == '<img src="/images/C.png">' || thisDiv.innerHTML == '<img src="/images/LG.png">' || thisDiv.innerHTML == '<img src="/images/RG.png">' || thisDiv.innerHTML == '<img src="/images/TE.png">' || thisDiv.innerHTML == '<img src="/images/QB.png">' || thisDiv.innerHTML == '<img src="/images/WR.png">' || thisDiv.innerHTML == '<img src="/images/HB.png">' || thisDiv.innerHTML == '<img src="/images/FB.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB23back.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB23front.gif">';}


	//d is kicking down
	else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) > 6.5)
		
		//if on KRS
		if (thisDiv.innerHTML == '<img src="/images/KRS.png">' || thisDiv.innerHTML == '<img src="/images/KR.png">' || thisDiv.innerHTML == '<img src="/images/PR.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB23back.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB23front.gif">';}

	//d is kicking up
	else 
		//if on KRS
		if (thisDiv.innerHTML == '<img src="/images/KRS.png">' || thisDiv.innerHTML == '<img src="/images/KR.png">' || thisDiv.innerHTML == '<img src="/images/PR.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB23front.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB23back.gif">';}

else if (id == '416253') //if Clinton Dark Horse
	
	//if offense is facing down
	if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) < 6.5)
	
		//if playing offense
		if (thisDiv.innerHTML == '<img src="/images/LOT.png">' || thisDiv.innerHTML == '<img src="/images/ROT.png">' || thisDiv.innerHTML == '<img src="/images/C.png">' || thisDiv.innerHTML == '<img src="/images/LG.png">' || thisDiv.innerHTML == '<img src="/images/RG.png">' || thisDiv.innerHTML == '<img src="/images/TE.png">' || thisDiv.innerHTML == '<img src="/images/QB.png">' || thisDiv.innerHTML == '<img src="/images/WR.png">' || thisDiv.innerHTML == '<img src="/images/HB.png">' || thisDiv.innerHTML == '<img src="/images/FB.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB83front.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB83back.gif">';}
		
		
	//offense is facing up
	else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) < parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) < 6.5)
		
		//if playing offense
		if (thisDiv.innerHTML == '<img src="/images/LOT.png">' || thisDiv.innerHTML == '<img src="/images/ROT.png">' || thisDiv.innerHTML == '<img src="/images/C.png">' || thisDiv.innerHTML == '<img src="/images/LG.png">' || thisDiv.innerHTML == '<img src="/images/RG.png">' || thisDiv.innerHTML == '<img src="/images/TE.png">' || thisDiv.innerHTML == '<img src="/images/QB.png">' || thisDiv.innerHTML == '<img src="/images/WR.png">' || thisDiv.innerHTML == '<img src="/images/HB.png">' || thisDiv.innerHTML == '<img src="/images/FB.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB83back.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB83front.gif">';}


	//d is kicking down
	else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) > 6.5)
		
		//if on KRS
		if (thisDiv.innerHTML == '<img src="/images/KRS.png">' || thisDiv.innerHTML == '<img src="/images/KR.png">' || thisDiv.innerHTML == '<img src="/images/PR.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB83back.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB83front.gif">';}

	//d is kicking up
	else 
		//if on KRS
		if (thisDiv.innerHTML == '<img src="/images/KRS.png">' || thisDiv.innerHTML == '<img src="/images/KR.png">' || thisDiv.innerHTML == '<img src="/images/PR.png">')
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB83front.gif">';}
		else
		{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTB83back.gif">';}

else
{thisDiv.innerHTML = '<img src="http://i184.photobucket.com/albums/x276/dudeamis/CTBfront.gif">';}

}



}

)





