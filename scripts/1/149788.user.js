
// ==UserScript==
// @name        Fb Smile (custom)
// @namespace   slengineeging.sbsmile
// @include     https://www.facebook.com/
// @include     https://www.facebook.com/*
// @include     https://www.facebook.com/messages/*
// @include     https://www.facebook.com/messages/
// @version     2
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

	var count = 9;
	var divsCount = 2;
	var smiles = new Array(
							[":asd:", "<img src = 'http://forum.gamesvillage.it/images/smilies/asd.gif' />"],
							["asd", "<img src = 'http://forum.gamesvillage.it/images/smilies/asd.gif' />"],
							[":rock:", "<img src = 'http://forum.gamesvillage.it/images/smilies/tunz.gif' />"],
							[":ahsisi:", "<img src = 'http://forum.gamesvillage.it/images/smilies/ahsisi.gif' />"],
							[":sisi:", "<img src = 'http://forum.gamesvillage.it/images/smilies/sisi.gif' />"],
							[":fermosi:", "<img src = 'http://forum.gamesvillage.it/images/smilies/fermosi.gif' />"],
							[":facciadicazzo:", "<img src = 'http://img213.imageshack.us/img213/8272/rorrisokg1zc3.png' />"],
							[":penis:", "<img src = 'http://img1.coolspacetricks.com/images/commentgraphics/funny/81519.gif' />"],
							[":rotfl:", "<img src = 'http://forum.gamesvillage.it/images/smilies/rovatfl.gif' />"]);
							
	var divs = new Array(".fbChatMessage", ".content");
		
	
	$(document).ready(function() {
		setInterval(function(){
		
			for(var i = 0; i < count; i++)
			{
				for(var k = 0; k < divsCount; k++)
				{				
					$("" +  divs[k] + ":contains('" + smiles[i][0] + "')").each(function(index) {
						$(this).html($(this).html().replace(smiles[i][0], smiles[i][1]));
					});
				}
			}	
			
		}
		
		,3000);
	});