// ==UserScript==
// @name           Veekun Comparison Highlighter
// @namespace      tag://veekun
// @description    Highlights moves exclusive to pre-evolutions on veekun.com's family comparison pages (user-defined colors available)
// @include        http://veekun.com/dex/gadgets/*
// @author         Matthew Ammann
// @version        1.0.3
// @date           3/14/11
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

/*
Goal: Change checkmark color & move name to user-specified color on family comparison pages if 
[DONE] Baby poke has a LEVEL-UP move unlearned by any evolutions
	[DONE] a) Make sure move is not a TM or tutor move
[DONE] Any other mid-evolution has a move unlearnable by a final evo (Caterpie, Weedle families)
	[DONE] a) Make sure move is not a TM or tutor move
[DONE] Any pre-evo has a TUTOR move unlearned by any evo (Murkrow in HG/SS)
[DELAYED] Implement auto-update after uploading to userscripts.org

Credits: Brock Adams, for helping with Chrome compatibility
		 Metalkid, for the jQuery consult
*/

var isLevelupMove = false;
var isTutorMove = false;
var isTM = false;
var TMhead = $('#moves\\:machine');
var hasSecondEvo = false;
var hasFinalEvo1 = false;
var hasFinalEvo2 = false;
var header = $('.header-row').eq(1);
var TMmoves = new Array();

//This section deals with the user-defined colors 

GM_registerMenuCommand("Color for pre-evolutionary-only moves", prevoColorPrompt)
GM_registerMenuCommand("Color for first evolution-only moves", evoColorPrompt)

if(localStorage.getItem('prevoColor') == null || localStorage.getItem('evoColor') == null)
{
	localStorage.setItem('prevoColor', '#FF0000');//red
	localStorage.setItem('evoColor', '#339900');//shade of green
}

var prevoColor = localStorage.getItem('prevoColor');
var evoColor = localStorage.getItem('evoColor');

function prevoColorPrompt()
{
	var input = prompt("Please enter a desired 6-digit hex color-code for pre-evolutionary pokemon:") 
	localStorage.setItem('prevoColor', '#'+input);
}

function evoColorPrompt()
{
	var input = prompt("Please enter the desired 6-digit hex color-code for first-evolution pokemon:") 
	localStorage.setItem('evoColor', '#'+input);
}

//This loop tests each 'th' element in a sample header row, determining how many Evos are currently present in the chart.

$('.header-row').eq(1).find('th').each(function(index) 
{
	if($(this).find('a').length != 0)
	{
		switch(index)
		{
			case 2:
			hasSecondEvo = true;
			break;
			
			case 3:
			hasFinalEvo1 = true;
			break;
			
			case 4:
			hasFinalEvo2 = true;
			break;
		}
	}
});

//This array puts only the names of the available TMs into the TMmoves array
TMhead.nextAll().each(function(index)
{
	TMmoves.push($(this).children(":first").find('a').eq(0).html());
});

$('tr').each(function(index) 
{
	var moveName = $(this).children(":first").find('a').eq(0).html();	
	moveName = $.trim(moveName);
	
	switch($(this).attr('id'))
	{
		case 'moves:level-up':
			isLevelupMove = true;	
			break;
			
		case 'moves:egg':
			isLevelupMove = false;
			break;	
			
		case 'moves:tutor':
			isTutorMove = true;
			
		case 'moves:machine':
			isTM = true;	
	}
	
	if(isLevelupMove || isTutorMove)
	{
		var babyMoveCell = $(this).find('td').eq(0);
		babyMoveText = $.trim(babyMoveCell.html());
		
		secondEvoCell = babyMoveCell.next();
		secondEvoText = $.trim(secondEvoCell.html());
		
		finalEvo1Cell = secondEvoCell.next();
		finalEvo1Text = $.trim(finalEvo1Cell.html());
		
		finalEvo2Cell = finalEvo1Cell.next();
		finalEvo2Text = $.trim(finalEvo2Cell.html());
		
		//This checks if evolutions have checkmarks
		
		if(babyMoveText.length > 0)
		{
			if(hasSecondEvo && secondEvoText.length == 0 || hasFinalEvo1 && finalEvo1Text.length == 0 || 
				hasFinalEvo2 && finalEvo2Text.length == 0)
			{
				//See if the move is a TM before proceeding	
				var tm = tmCheck(moveName);
				
				if(!tm)
				{
					
					if(secondEvoText.length > 0)
					{		
						babyMoveCell.css("color", evoColor);
						secondEvoCell.css("color", evoColor);
						babyMoveCell.prev().find('a').eq(0).css("color", evoColor); //highlights move name
					}
					else
					{
						babyMoveCell.css("color", prevoColor);
						babyMoveCell.prev().find('a').eq(0).css("color", prevoColor);
					}
				}
			}
		}
		else if(secondEvoText.length > 0)
		{
			if(hasFinalEvo1 && finalEvo1Text.length == 0 || hasFinalEvo2 && finalEvo2Text.length == 0)
			{
				var tm = tmCheck(moveName); 
				
				if(!tm)
				{
					secondEvoCell.css("color", evoColor);
					babyMoveCell.prev().find('a').eq(0).css("color", evoColor);
				}
			}
		}
	}
	
});

function tmCheck(input)
{
	var isTM = false;

	//Iterate through TMmoves array to see if the input matches any entries
	for(var i = 0; i < TMmoves.length; i++)
	{	
		if(input == TMmoves[i])
		{
			isTM = true;
			break;
		}
	}
	
	if(isTM == true)
		return true;
	else
		return false;		
}

//alert("evoColor: " + localStorage.getItem('evoColor') + ". prevoColor: " + localStorage.getItem('prevoColor'));
