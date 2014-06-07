// ==UserScript==
// @name           Xbox Live Better Friends List
// @namespace      http://www.ckx3.com
// @include        http://live.xbox.com/*/profile/Friends.aspx
// @include        http://live.xbox.com/*/profile/FriendsOfFriend.aspx*
// @description    Shows the title or icon of the game your friends are playing in a separate column on the Xbox Live friends page.
// ==/UserScript==

var useGameIcons = true;

var gamesIDontCareAbout = [ 'Netflix', 'Xbox 360 Dashboard', 'Windows Media Center' ];

var gameDescriptionPNodes = document.evaluate(
	"//table[@class='XbcProfileTable XbcFriendsListTable']/tbody/tr/td[@class='XbcGamerDescription']/p",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null
);

var gameIcons = createGameIconsArray();
	
if ( gameDescriptionPNodes && gameDescriptionPNodes.snapshotLength > 0 )
{
	for( var i = 0; i < gameDescriptionPNodes.snapshotLength; i++ )
	{
		var gameDescriptionP = gameDescriptionPNodes.snapshotItem(i);
		
		if ( isFriendOnline( gameDescriptionP ) )
		{			
			createGameColumn( gameDescriptionP );
		}
		else
		{
			createEmptyCell( gameDescriptionP );
		}
	}
}

function isFriendOnline( gameDescriptionP )
{
	var status = gameDescriptionP.parentNode.previousSibling.firstChild.innerHTML;
	
	return status != 'Offline';
}

function createEmptyCell( gameDescriptionP )
{
	insertGameCell( createCell( "&nbsp;" ), gameDescriptionP );	
}

function createGameColumn( gameDescriptionP )
{
	var gameDescription = gameDescriptionP.innerHTML;
	
	var gameName = '';
	var gameColumnMarkup = '';
	
	if ( /Playing \w+/i.test( gameDescription ) )
	{
		var matches = /Playing ([^<]+)/i.exec( gameDescription );
		
		gameName = matches[1];
		
		if ( isAGameIDontCareAbout( gameName ) )
		{
			gameColumnMarkup = '&nbsp;';
		}
		else
		{
			if ( useGameIcons && gameIcons[gameName] != null )
			{
				gameColumnMarkup = '<img src="' + gameIcons[gameName] + '" style="width: 32px; height: 32px;"/>';
			}
			else
			{
				gameColumnMarkup = '<b>' + gameName + '<b>';
			}
		}
	}
	
	insertGameCell( createCell( gameColumnMarkup ), gameDescriptionP );	
}

function insertGameCell( gameCell, gameDescriptionP )
{
	//the gameDescriptionP.parentNode.parentNode is the tr.
	//gameDescriptionP.parentNode is the td of the game description.
	gameDescriptionP.parentNode.parentNode.insertBefore( gameCell, gameDescriptionP.parentNode );
}

function createCell( markup )
{
	var gameNameCell = document.createElement("td");
	gameNameCell.innerHTML = markup;
	gameNameCell.style.textAlign = 'left';
	gameNameCell.style.whiteSpace = 'nowrap';
	
	return gameNameCell;
}

function isAGameIDontCareAbout( gameName )
{
	for( var i = 0; i < gamesIDontCareAbout.length; i++ )
	{
		if ( gameName == gamesIDontCareAbout[i] )
		{
			return true;
		}
	}
	
	return false;
}

function createGameIconsArray()
{
	var a = new Array();
	
	a["1942: Joint Strike"] = "http://tiles.xbox.com/tiles/4b/wy/12dsb2JhbC9ECgUAGwEfVi4iL2ljb24vMC84MDAwAAAAAAAAAPgdvP4=.jpg";
	a["3 on 3 NHL® Arcade"] = "http://tiles.xbox.com/tiles/8Y/8l/0mdsb2JhbC9ECgUAGwEfV1hWL2ljb24vMC84MDAwAAAAAAAAAP0Kj+4=.jpg";
	a["3D Ultra™ Minigolf"] = "http://tiles.xbox.com/tiles/oV/s2/0Gdsb2JhbC9ECgUAGwEfVltSL2ljb24vMC84MDAwAAAAAAAAAP8ZW74=.jpg";
	a["50 Cent: BotS"] = "http://tiles.xbox.com/tiles/WW/AI/1mdsb2JhbC9ECgUMGgEfVlwhL2ljb24vMC84MDAwAAAAAAAAAPknYEY=.jpg";
	a["5th Grader"] = "http://tiles.xbox.com/tiles/zb/Kx/12dsb2JhbC9ECgUAGwEfV19TL2ljb24vMC84MDAwAAAAAAAAAPiestI=.jpg";
	a["A Kingdom for Keflings"] = "http://tiles.xbox.com/tiles/LC/8n/1mdsb2JhbC9ECgUAGwEfVishL2ljb24vMC84MDAwAAAAAAAAAPkILzM=.jpg";
	a["AFRO SAMURAI"] = "http://tiles.xbox.com/tiles/dy/V+/0Wdsb2JhbC9ECgR9G3QfWStbL2ljb24vMC84MDAwAAAAAAAAAP5RJWg=.jpg";
	a["ARMORED CORE4"] = "http://tiles.xbox.com/tiles/ny/Ck/02dsb2JhbC9ECgQOGgMfWStVL2ljb24vMC84MDAwAAAAAAAAAPyLIIA=.jpg";
	a["Aegis Wing"] = "http://tiles.xbox.com/tiles/Lo/Cd/0mdsb2JhbC9ECgUAGwEfVlwgL2ljb24vMC84MDAwAAAAAAAAAP2ygDE=.jpg";
	a["Age of Booty"] = "http://tiles.xbox.com/tiles/Vq/Y8/1mdsb2JhbC9ECgUAGwEfVilTL2ljb24vMC84MDAwAAAAAAAAAPkTpkk=.jpg";
	a["Alien Hominid HD"] = "http://tiles.xbox.com/tiles/OZ/ke/1mdsb2JhbC9ECgUAGwEfVltVL2ljb24vMC84MDAwAAAAAAAAAPkxmSY=.jpg";
	a["American Wasteland"] = "http://tiles.xbox.com/tiles/li/uQ/0Wdsb2JhbC9ECgQJGgYfWStXL2ljb24vMC84MDAwAAAAAAAAAP6-K4k=.jpg";
	a["Amped 3"] = "http://tiles.xbox.com/tiles/bR/WZ/1mdsb2JhbC9ECgUMGgQfWStXL2ljb24vMC84MDAwAAAAAAAAAPm2FXI=.jpg";
	a["Arkadian Warriors"] = "http://tiles.xbox.com/tiles/04/Dp/0Gdsb2JhbC9ECgUAGwEfVl9UL2ljb24vMC84MDAwAAAAAAAAAP-GgMw=.jpg";
	a["Army of Two™"] = "http://tiles.xbox.com/tiles/Bk/DN/1mdsb2JhbC9ECgQNGwEfWSlbL2ljb24vMC84MDAwAAAAAAAAAPniQBk=.jpg";
	a["Assassin's Creed"] = "http://tiles.xbox.com/tiles/sJ/m9/0Wdsb2JhbC9ECgUNGgMfWStXL2ljb24vMC84MDAwAAAAAAAAAP6Sma8=.jpg";
	a["Assault Heroes 2"] = "http://tiles.xbox.com/tiles/mz/Up/12dsb2JhbC9ECgUAGwEfVixQL2ljb24vMC84MDAwAAAAAAAAAPgGNYQ=.jpg";
	a["Assault Heroes"] = "http://tiles.xbox.com/tiles/+K/2S/12dsb2JhbC9ECgUAGwEfWSkmL2ljb24vMC84MDAwAAAAAAAAAPi9rec=.jpg";
	a["Asteroids &amp; Deluxe"] = "http://tiles.xbox.com/tiles/Kn/ys/1Gdsb2JhbC9ECgUAGwEfVlsmL2ljb24vMC84MDAwAAAAAAAAAPuDfDU=.jpg";
	a["Astropop"] = "http://tiles.xbox.com/tiles/S0/ut/0Gdsb2JhbC9ECgUAGwEfWSlRL2ljb24vMC84MDAwAAAAAAAAAP+CS1Q=.jpg";
	a["At World’s End"] = "http://tiles.xbox.com/tiles/EW/1U/0Gdsb2JhbC9ECgQKGgYfWStSL2ljb24vMC84MDAwAAAAAAAAAP97bQ4=.jpg";
	a["BC:Rearmed"] = "http://tiles.xbox.com/tiles/vu/Zf/12dsb2JhbC9ECgUAGwEfVilSL2ljb24vMC84MDAwAAAAAAAAAPhw5qE=.jpg";
	a["BF: Bad Company"] = "http://tiles.xbox.com/tiles/7g/Cu/12dsb2JhbC9ECgQNGwEfWSlaL2ljb24vMC84MDAwAAAAAAAAAPiBAPE=.jpg";
	a["Band of Bugs"] = "http://tiles.xbox.com/tiles/kc/hX/02dsb2JhbC9ECgUAGwEfVl0lL2ljb24vMC84MDAwAAAAAAAAAPx4yI4=.jpg";
	a["Banjo Kazooie: N&amp;B"] = "http://tiles.xbox.com/tiles/No/gc/1mdsb2JhbC9ECgR8GgMfWSonL2ljb24vMC84MDAwAAAAAAAAAPkziCk=.jpg";
	a["Banjo-Kazooie"] = "http://tiles.xbox.com/tiles/mO/OM/0Gdsb2JhbC9ECgUAGwEfV1pXL2ljb24vMC84MDAwAAAAAAAAAP+j44c=.jpg";
	a["Bankshot Billiards 2"] = "http://tiles.xbox.com/tiles/-g/g3/1mdsb2JhbC9ECgUAGwEfWSogL2ljb24vMC84MDAwAAAAAAAAAPkYCOE=.jpg";
	a["Battle Fantasia"] = "http://tiles.xbox.com/tiles/Wy/1R/12dsb2JhbC9ECgQJGgcfWStXL2ljb24vMC84MDAwAAAAAAAAAPh+LUQ=.jpg";
	a["Battlestar Galactica"] = "http://tiles.xbox.com/tiles/IH/f8/02dsb2JhbC9ECgUAGwEfVllSL2ljb24vMC84MDAwAAAAAAAAAPzTdz8=.jpg";
	a["Beautiful Katamari"] = "http://tiles.xbox.com/tiles/S-/xU/0Wdsb2JhbC9ECgR9G3QfWSsgL2ljb24vMC84MDAwAAAAAAAAAP57-FQ=.jpg";
	a["Bejeweled 2"] = "http://tiles.xbox.com/tiles/ym/dn/02dsb2JhbC9ECgUAGwEfWStRL2ljb24vMC84MDAwAAAAAAAAAPxIZ9U=.jpg";
	a["BioShock"] = "http://tiles.xbox.com/tiles/4i/qM/0Wdsb2JhbC9ECgUMGgQfWStbL2ljb24vMC84MDAwAAAAAAAAAP6jKv0=.jpg";
	a["Blacksite"] = "http://tiles.xbox.com/tiles/Vz/AI/0Gdsb2JhbC9ECgR8GgcfWStUL2ljb24vMC84MDAwAAAAAAAAAP8nMEg=.jpg";
	a["Blazing Angels"] = "http://tiles.xbox.com/tiles/6z/-h/12dsb2JhbC9ECgUNGgMfWSshL2ljb24vMC84MDAwAAAAAAAAAPjOP-Q=.jpg";
	a["Bomberman LIVE"] = "http://tiles.xbox.com/tiles/Zs/Nz/1mdsb2JhbC9ECgUAGwEfVlwlL2ljb24vMC84MDAwAAAAAAAAAPlcw3k=.jpg";
	a["Boogie Bunnies"] = "http://tiles.xbox.com/tiles/70/tT/1mdsb2JhbC9ECgUAGwEfVitQL2ljb24vMC84MDAwAAAAAAAAAPl8S-A=.jpg";
	a["Boom Boom Rocket"] = "http://tiles.xbox.com/tiles/C1/Pr/0mdsb2JhbC9ECgUAGwEfVlkiL2ljb24vMC84MDAwAAAAAAAAAP3EUxQ=.jpg";
	a["Braid"] = "http://tiles.xbox.com/tiles/wJ/N1/0Wdsb2JhbC9ECgUAGwEfViwmL2ljb24vMC84MDAwAAAAAAAAAP5ak98=.jpg";
	a["Brain Challenge™"] = "http://tiles.xbox.com/tiles/Qb/+-/0mdsb2JhbC9ECgUAGwEfVi4mL2ljb24vMC84MDAwAAAAAAAAAP2Qv14=.jpg";
	a["BulletWitch"] = "http://tiles.xbox.com/tiles/wf/Rg/1mdsb2JhbC9ECgQBGwcfWSshL2ljb24vMC84MDAwAAAAAAAAAPlP9N4=.jpg";
	a["Bully Scholarship Ed."] = "http://tiles.xbox.com/tiles/qN/0k/0Wdsb2JhbC9ECgUMGgQfVl4iL2ljb24vMC84MDAwAAAAAAAAAP4L3bc=.jpg";
	a["Burnout Paradise"] = "http://tiles.xbox.com/tiles/iX/a0/12dsb2JhbC9ECgQNGwEfVl9VL2ljb24vMC84MDAwAAAAAAAAAPibdpY=.jpg";
	a["Burnout Revenge"] = "http://tiles.xbox.com/tiles/u7/Ut/1Wdsb2JhbC9ECgQNGwEfWSsgL2ljb24vMC84MDAwAAAAAAAAAPoCtaQ=.jpg";
	a["Call Of Duty 3"] = "http://tiles.xbox.com/tiles/KW/Na/0Gdsb2JhbC9ECgQJGgYfWSpSL2ljb24vMC84MDAwAAAAAAAAAP91YzY=.jpg";
	a["Call of Duty 2"] = "http://tiles.xbox.com/tiles/3m/h+/1Wdsb2JhbC9ECgQJGgYfWStSL2ljb24vMC84MDAwAAAAAAAAAPpRaME=.jpg";
	a["Call of Duty 4"] = "http://tiles.xbox.com/tiles/sa/Fy/1mdsb2JhbC9ECgQJGgYfWSpVL2ljb24vMC84MDAwAAAAAAAAAPldoa4=.jpg";
	a["Call of Duty: WaW"] = "http://tiles.xbox.com/tiles/g2/Lr/1Gdsb2JhbC9ECgQJGgYfVl4gL2ljb24vMC84MDAwAAAAAAAAAPvEYpw=.jpg";
	a["Carcassonne"] = "http://tiles.xbox.com/tiles/SR/tV/0Wdsb2JhbC9ECgUAGwEfVltTL2ljb24vMC84MDAwAAAAAAAAAP56G1Y=.jpg";
	a["Castle Crashers"] = "http://tiles.xbox.com/tiles/zD/2A/12dsb2JhbC9ECgUAGwEfVi1UL2ljb24vMC84MDAwAAAAAAAAAPivPdM=.jpg";
	a["Castlevania: SOTN"] = "http://tiles.xbox.com/tiles/0d/l9/12dsb2JhbC9ECgUAGwEfVltUL2ljb24vMC84MDAwAAAAAAAAAPhS2c4=.jpg";
	a["Catan"] = "http://tiles.xbox.com/tiles/Xg/LW/1Wdsb2JhbC9ECgUAGwEfVlwmL2ljb24vMC84MDAwAAAAAAAAAPr5AkE=.jpg";
	a["Centipede &amp; Millipede"] = "http://tiles.xbox.com/tiles/Wv/7n/02dsb2JhbC9ECgUAGwEfVlsgL2ljb24vMC84MDAwAAAAAAAAAPzI-kU=.jpg";
	a["Chromehounds"] = "http://tiles.xbox.com/tiles/TA/iz/1Wdsb2JhbC9ECgULGwUfWStXL2ljb24vMC84MDAwAAAAAAAAAPqcCFM=.jpg";
	a["Civilization Revolut'n"] = "http://tiles.xbox.com/tiles/cl/7e/0mdsb2JhbC9ECgUMGgQfWSpWL2ljb24vMC84MDAwAAAAAAAAAP3xXm0=.jpg";
	a["Cloning Clyde"] = "http://tiles.xbox.com/tiles/dS/+t/0mdsb2JhbC9ECgUAGwEfWSpUL2ljb24vMC84MDAwAAAAAAAAAP2CL2o=.jpg";
	a["Command &amp; Conquer 3"] = "http://tiles.xbox.com/tiles/mp/MG/1Wdsb2JhbC9ECgQNGwEfVl8mL2ljb24vMC84MDAwAAAAAAAAAPopk4U=.jpg";
	a["Commanders: Attack"] = "http://tiles.xbox.com/tiles/Ii/5o/1Gdsb2JhbC9ECgUAGwEfVl1SL2ljb24vMC84MDAwAAAAAAAAAPtHLj0=.jpg";
	a["Conan"] = "http://tiles.xbox.com/tiles/Ri/Ij/1Gdsb2JhbC9ECgUMGgEfWSsiL2ljb24vMC84MDAwAAAAAAAAAPsMIlk=.jpg";
	a["Condemned 2: Bloodshot"] = "http://tiles.xbox.com/tiles/QK/ZG/02dsb2JhbC9ECgULGwUfWSolL2ljb24vMC84MDAwAAAAAAAAAPxppl8=.jpg";
	a["Condemned"] = "http://tiles.xbox.com/tiles/PI/r4/0mdsb2JhbC9ECgULGwUfWStRL2ljb24vMC84MDAwAAAAAAAAAP3XiiM=.jpg";
	a["Contra"] = "http://tiles.xbox.com/tiles/k3/V9/0Wdsb2JhbC9ECgUAGwEfVl5bL2ljb24vMC84MDAwAAAAAAAAAP5SdYw=.jpg";
	a["Crackdown"] = "http://tiles.xbox.com/tiles/WU/EQ/1Wdsb2JhbC9ECgR8GgMfWSsgL2ljb24vMC84MDAwAAAAAAAAAPo-QUY=.jpg";
	a["Crystal Quest"] = "http://tiles.xbox.com/tiles/jo/p8/0Wdsb2JhbC9ECgUAGwEfWSomL2ljb24vMC84MDAwAAAAAAAAAP5TipE=.jpg";
	a["Culdcept SAGA"] = "http://tiles.xbox.com/tiles/sq/20/1Gdsb2JhbC9ECgQKGwEfWSsnL2ljb24vMC84MDAwAAAAAAAAAPubra0=.jpg";
	a["Cyberball 2072"] = "http://tiles.xbox.com/tiles/mZ/qT/02dsb2JhbC9ECgUAGwEfVltRL2ljb24vMC84MDAwAAAAAAAAAPy8moY=.jpg";
	a["DBZ: BURST LIMIT"] = "http://tiles.xbox.com/tiles/Km/+c/0mdsb2JhbC9ECgQKGwEfWSsgL2ljb24vMC84MDAwAAAAAAAAAP2zbzU=.jpg";
	a["DDR/DS Universe"] = "http://tiles.xbox.com/tiles/Fy/Ak/0Gdsb2JhbC9ECgR6G3UfWSsgL2ljb24vMC84MDAwAAAAAAAAAP8LIAg=.jpg";
	a["DEAD OR ALIVE 4"] = "http://tiles.xbox.com/tiles/5f/Fu/02dsb2JhbC9ECgUMGwMfWStSL2ljb24vMC84MDAwAAAAAAAAAPxB8fo=.jpg";
	a["DEAD OR ALIVE Xtreme 2"] = "http://tiles.xbox.com/tiles/3T/DL/0Gdsb2JhbC9ECgUMGwMfWStRL2ljb24vMC84MDAwAAAAAAAAAP-kMMI=.jpg";
	a["DEAD RISING"] = "http://tiles.xbox.com/tiles/fN/eP/0mdsb2JhbC9ECgQLGwMfWStRL2ljb24vMC84MDAwAAAAAAAAAP2g12M=.jpg";
	a["DEF JAM: ICON™"] = "http://tiles.xbox.com/tiles/PD/xC/12dsb2JhbC9ECgQNGwEfWSomL2ljb24vMC84MDAwAAAAAAAAAPhtPCM=.jpg";
	a["DIG DUG"] = "http://tiles.xbox.com/tiles/Te/dk/12dsb2JhbC9ECgUAGwEfVlxVL2ljb24vMC84MDAwAAAAAAAAAPhL51I=.jpg";
	a["DMMM:Elements"] = "http://tiles.xbox.com/tiles/4T/3d/1mdsb2JhbC9ECgUNGgMfVl9XL2ljb24vMC84MDAwAAAAAAAAAPnyPf4=.jpg";
	a["DOOM"] = "http://tiles.xbox.com/tiles/am/2G/0Gdsb2JhbC9ECgUAGwEfVl1XL2ljb24vMC84MDAwAAAAAAAAAP+pbXU=.jpg";
	a["Dash of Destruction"] = "http://tiles.xbox.com/tiles/Nh/dg/1Gdsb2JhbC9ECgUAGwEfV18hL2ljb24vMC84MDAwAAAAAAAAAPtPFyk=.jpg";
	a["Dead Space™"] = "http://tiles.xbox.com/tiles/lG/Rn/1Gdsb2JhbC9ECgQNGwEfVlpUL2ljb24vMC84MDAwAAAAAAAAAPtIZIs=.jpg";
	a["Defender"] = "http://tiles.xbox.com/tiles/8q/+u/1mdsb2JhbC9ECgUAGwEfVl1QL2ljb24vMC84MDAwAAAAAAAAAPmBr+0=.jpg";
	a["DiRT™"] = "http://tiles.xbox.com/tiles/WG/Xh/0Wdsb2JhbC9ECgQLG3QfWSshL2ljb24vMC84MDAwAAAAAAAAAP7OZUc=.jpg";
	a["Domino Master"] = "http://tiles.xbox.com/tiles/EL/y0/1mdsb2JhbC9ECgUAGwEfVlZaL2ljb24vMC84MDAwAAAAAAAAAPmbvA8=.jpg";
	a["Double Dragon"] = "http://tiles.xbox.com/tiles/5b/Yt/0mdsb2JhbC9ECgUAGwEfVlolL2ljb24vMC84MDAwAAAAAAAAAP0Ctvo=.jpg";
	a["Duke Nukem 3D"] = "http://tiles.xbox.com/tiles/Jf/LS/1mdsb2JhbC9ECgUAGwEfV19SL2ljb24vMC84MDAwAAAAAAAAAPn98jo=.jpg";
	a["E4"] = "http://tiles.xbox.com/tiles/77/19/1Wdsb2JhbC9ECgUAGwEfVlhRL2ljb24vMC84MDAwAAAAAAAAAPpSvfA=.jpg";
	a["EA SPORTS FN 3"] = "http://tiles.xbox.com/tiles/yz/dm/0mdsb2JhbC9ECgQNGwEfWSsmL2ljb24vMC84MDAwAAAAAAAAAP1JN9Q=.jpg";
	a["EXIT"] = "http://tiles.xbox.com/tiles/uh/pu/0Wdsb2JhbC9ECgUAGwEfVi5UL2ljb24vMC84MDAwAAAAAAAAAP5BGqU=.jpg";
	a["EarthDefenseForce 2017"] = "http://tiles.xbox.com/tiles/QL/zG/1Gdsb2JhbC9ECgQMGgAfWStQL2ljb24vMC84MDAwAAAAAAAAAPvpvF8=.jpg";
	a["Ecco the Dolphin"] = "http://tiles.xbox.com/tiles/T7/7w/0Gdsb2JhbC9ECgUAGwEfVlhVL2ljb24vMC84MDAwAAAAAAAAAP-fvlA=.jpg";
	a["Eets: Chowdown"] = "http://tiles.xbox.com/tiles/gi/3l/0Wdsb2JhbC9ECgUAGwEfVl1WL2ljb24vMC84MDAwAAAAAAAAAP7KLZ0=.jpg";
	a["ElementsOfDestruction"] = "http://tiles.xbox.com/tiles/UP/W3/1Gdsb2JhbC9ECgUAGwEfVllUL2ljb24vMC84MDAwAAAAAAAAAPuY9U8=.jpg";
	a["F.E.A.R."] = "http://tiles.xbox.com/tiles/aI/Nj/12dsb2JhbC9ECgUOGgUfWStaL2ljb24vMC84MDAwAAAAAAAAAPhMg3c=.jpg";
	a["FIFA 06 RTFWC"] = "http://tiles.xbox.com/tiles/MJ/K3/0Wdsb2JhbC9ECgQNGwEfWStUL2ljb24vMC84MDAwAAAAAAAAAP6Yki8=.jpg";
	a["FIFA 07"] = "http://tiles.xbox.com/tiles/BP/3n/1Gdsb2JhbC9ECgQNGwEfWSolL2ljb24vMC84MDAwAAAAAAAAAPvI-Rs=.jpg";
	a["FIFA 08"] = "http://tiles.xbox.com/tiles/VV/mH/02dsb2JhbC9ECgQNGwEfVl4lL2ljb24vMC84MDAwAAAAAAAAAPyoWUo=.jpg";
	a["Fable II"] = "http://tiles.xbox.com/tiles/I8/gL/1Wdsb2JhbC9ECgR8GgMfWSlSL2ljb24vMC84MDAwAAAAAAAAAPokyDw=.jpg";
	a["Fable® II Pub Games"] = "http://tiles.xbox.com/tiles/sZ/4P/1mdsb2JhbC9ECgUAGwEfV14nL2ljb24vMC84MDAwAAAAAAAAAPkgnq4=.jpg";
	a["Fallout 3"] = "http://tiles.xbox.com/tiles/+T/6a/0mdsb2JhbC9ECgQKGgMfWStWL2ljb24vMC84MDAwAAAAAAAAAP21PuY=.jpg";
	a["Far Cry® 2"] = "http://tiles.xbox.com/tiles/tj/V0/1mdsb2JhbC9ECgUNGgMfVl5TL2ljb24vMC84MDAwAAAAAAAAAPlbNak=.jpg";
	a["Fatal Fury Special"] = "http://tiles.xbox.com/tiles/-g/Fb/0Gdsb2JhbC9ECgUAGwEfVlwiL2ljb24vMC84MDAwAAAAAAAAAP90AeE=.jpg";
	a["Feeding Frenzy"] = "http://tiles.xbox.com/tiles/c4/oI/02dsb2JhbC9ECgUAGwEfWSlSL2ljb24vMC84MDAwAAAAAAAAAPwnimw=.jpg";
	a["Fracture"] = "http://tiles.xbox.com/tiles/84/rE/02dsb2JhbC9ECgR7GwEfWStXL2ljb24vMC84MDAwAAAAAAAAAPzriuw=.jpg";
	a["Frogger"] = "http://tiles.xbox.com/tiles/hI/hA/0Gdsb2JhbC9ECgUAGwEfVl5QL2ljb24vMC84MDAwAAAAAAAAAP9viJs=.jpg";
	a["Frontlines:Fuel of War"] = "http://tiles.xbox.com/tiles/qn/rP/1mdsb2JhbC9ECgUMGgEfWStbL2ljb24vMC84MDAwAAAAAAAAAPngerU=.jpg";
	a["Full Auto"] = "http://tiles.xbox.com/tiles/pE/jQ/1Gdsb2JhbC9ECgULGwUfWStWL2ljb24vMC84MDAwAAAAAAAAAPv-SLs=.jpg";
	a["G.R.A.W."] = "http://tiles.xbox.com/tiles/WN/ne/0Gdsb2JhbC9ECgUNGgMfWStWL2ljb24vMC84MDAwAAAAAAAAAP-x2Uc=.jpg";
	a["GALAGA"] = "http://tiles.xbox.com/tiles/bM/gj/0Wdsb2JhbC9ECgUAGwEfVl5RL2ljb24vMC84MDAwAAAAAAAAAP4MyHM=.jpg";
	a["GRAW 2"] = "http://tiles.xbox.com/tiles/kb/b6/12dsb2JhbC9ECgUNGgMfWSlTL2ljb24vMC84MDAwAAAAAAAAAPjVto4=.jpg";
	a["GRID"] = "http://tiles.xbox.com/tiles/eU/qm/12dsb2JhbC9ECgQLG3QfWSklL2ljb24vMC84MDAwAAAAAAAAAPiJSmY=.jpg";
	a["GTA IV"] = "http://tiles.xbox.com/tiles/nL/sY/0mdsb2JhbC9ECgUMGgQfWSlRL2ljb24vMC84MDAwAAAAAAAAAP03u4M=.jpg";
	a["Gauntlet"] = "http://tiles.xbox.com/tiles/QU/D9/12dsb2JhbC9ECgUAGwEfWSslL2ljb24vMC84MDAwAAAAAAAAAPjSQF4=.jpg";
	a["Gears of War 2"] = "http://tiles.xbox.com/tiles/EQ/uS/12dsb2JhbC9ECgR8GgMfVl0nL2ljb24vMC84MDAwAAAAAAAAAPi9Cw4=.jpg";
	a["Gears of War"] = "http://tiles.xbox.com/tiles/Au/dM/02dsb2JhbC9ECgR8GgMfWStWL2ljb24vMC84MDAwAAAAAAAAAPxj5x0=.jpg";
	a["Geometry Wars Evolved"] = "http://tiles.xbox.com/tiles/Zs/of/0Gdsb2JhbC9ECgUAGwEfWSonL2ljb24vMC84MDAwAAAAAAAAAP8wynk=.jpg";
	a["Geon"] = "http://tiles.xbox.com/tiles/6R/jY/1Gdsb2JhbC9ECgUAGwEfVltXL2ljb24vMC84MDAwAAAAAAAAAPv3GPY=.jpg";
	a["Golden Axe"] = "http://tiles.xbox.com/tiles/GL/ZZ/0Gdsb2JhbC9ECgUAGwEfVllRL2ljb24vMC84MDAwAAAAAAAAAP92tgc=.jpg";
	a["Golden Axe:Beast Rider"] = "http://tiles.xbox.com/tiles/U0/P0/0Wdsb2JhbC9ECgULGwUfWSpWL2ljb24vMC84MDAwAAAAAAAAAP7bQ0w=.jpg";
	a["Golf: Tee It Up!"] = "http://tiles.xbox.com/tiles/yp/gl/1mdsb2JhbC9ECgUAGwEfVi5SL2ljb24vMC84MDAwAAAAAAAAAPkKmNU=.jpg";
	a["Guitar Hero II"] = "http://tiles.xbox.com/tiles/We/ER/12dsb2JhbC9ECgQJGgYfWSpUL2ljb24vMC84MDAwAAAAAAAAAPg+4UY=.jpg";
	a["Guitar Hero III"] = "http://tiles.xbox.com/tiles/L8/b-/0Wdsb2JhbC9ECgQJGgYfWSlUL2ljb24vMC84MDAwAAAAAAAAAP7QxjA=.jpg";
	a["Guitar Hero World Tour"] = "http://tiles.xbox.com/tiles/U+/Mt/1mdsb2JhbC9ECgQJGgYfVl4iL2ljb24vMC84MDAwAAAAAAAAAPkC40w=.jpg";
	a["Gyruss"] = "http://tiles.xbox.com/tiles/JI/vN/1Wdsb2JhbC9ECgUAGwEfVl5UL2ljb24vMC84MDAwAAAAAAAAAPriizs=.jpg";
	a["Halo 3"] = "http://tiles.xbox.com/tiles/zS/3N/1Wdsb2JhbC9ECgR8GgMfWSpVL2ljb24vMC84MDAwAAAAAAAAAPriLdI=.jpg";
	a["Halo Wars Demo"] = "http://tiles.xbox.com/tiles/W5/Ju/1Wdsb2JgbA9ECgR8GgMfVl9bL2ljb24vMC84MDAwIAABAAAAAPpBkkQ=.jpg";
	a["Halo Wars"] = "http://tiles.xbox.com/tiles/W5/Ju/1Wdsb2JgbA9ECgR8GgMfVl9bL2ljb24vMC84MDAwIAABAAAAAPpBkkQ=.jpg";
	a["Hardwood Hearts"] = "http://tiles.xbox.com/tiles/Ii/cE/0mdsb2JhbC9ECgUAGwEfWStQL2ljb24vMC84MDAwAAAAAAAAAP0rJz0=.jpg";
	a["Hardwood Spades"] = "http://tiles.xbox.com/tiles/Te/4I/0Wdsb2JhbC9ECgUAGwEfWSpXL2ljb24vMC84MDAwAAAAAAAAAP4n7lI=.jpg";
	a["Heavy Weapon"] = "http://tiles.xbox.com/tiles/vE/nl/02dsb2JhbC9ECgUAGwEfVl5TL2ljb24vMC84MDAwAAAAAAAAAPzKSaM=.jpg";
	a["Hexic 2"] = "http://tiles.xbox.com/tiles/uu/xA/0mdsb2JhbC9ECgUAGwEfVl1VL2ljb24vMC84MDAwAAAAAAAAAP1v7KU=.jpg";
	a["Hexic HD"] = "http://tiles.xbox.com/tiles/8q/bC/0Gdsb2JhbC9ECgUAGwEfWStSL2ljb24vMC84MDAwAAAAAAAAAP-tpu0=.jpg";
	a["Hitman: Blood Money"] = "http://tiles.xbox.com/tiles/Z8/5t/1mdsb2JhbC9ECgULGwMfWSshL2ljb24vMC84MDAwAAAAAAAAAPlCzng=.jpg";
	a["Ikaruga"] = "http://tiles.xbox.com/tiles/EA/Aj/1Wdsb2JhbC9ECgUAGwEfVlhbL2ljb24vMC84MDAwAAAAAAAAAPoMAA8=.jpg";
	a["Iron Man"] = "http://tiles.xbox.com/tiles/va/Yy/0Wdsb2JhbC9ECgULGwUfWSlRL2ljb24vMC84MDAwAAAAAAAAAP4dpqI=.jpg";
	a["Jetpac Refuelled"] = "http://tiles.xbox.com/tiles/YG/+6/0Wdsb2JhbC9ECgUAGwEfWSkhL2ljb24vMC84MDAwAAAAAAAAAP6Vb38=.jpg";
	a["Jewel Quest"] = "http://tiles.xbox.com/tiles/Lo/nx/1Gdsb2JhbC9ECgUAGwEfWSoiL2ljb24vMC84MDAwAAAAAAAAAPveiTE=.jpg";
	a["KUF: Circle of Doom"] = "http://tiles.xbox.com/tiles/VJ/zP/0Gdsb2JhbC9ECgQKGwUfWStSL2ljb24vMC84MDAwAAAAAAAAAP-gnEs=.jpg";
	a["Kameo"] = "http://tiles.xbox.com/tiles/mi/Vk/1Wdsb2JhbC9ECgR8GgMfWStRL2ljb24vMC84MDAwAAAAAAAAAPpLJYU=.jpg";
	a["Kane &amp; Lynch: Dead Men"] = "http://tiles.xbox.com/tiles/a2/CY/0Gdsb2JhbC9ECgULGwMfWSpTL2ljb24vMC84MDAwAAAAAAAAAP+3YHQ=.jpg";
	a["LEGO Batman"] = "http://tiles.xbox.com/tiles/6r/GU/1Wdsb2JhbC9ECgUPGgIfWStUL2ljb24vMC84MDAwAAAAAAAAAPq7sfU=.jpg";
	a["LEGO Star Wars II"] = "http://tiles.xbox.com/tiles/u8/kq/12dsb2JhbC9ECgR7GwEfWStSL2ljb24vMC84MDAwAAAAAAAAAPgFyaQ=.jpg";
	a["LEGO Star Wars: TCS"] = "http://tiles.xbox.com/tiles/y0/th/0Gdsb2JhbC9ECgR7GwEfWStUL2ljb24vMC84MDAwAAAAAAAAAP9OS9Q=.jpg";
	a["LEGO® Indiana Jones™"] = "http://tiles.xbox.com/tiles/CC/8V/0Gdsb2JhbC9ECgR7GwEfWSslL2ljb24vMC84MDAwAAAAAAAAAP86Lxc=.jpg";
	a["LOST PLANET"] = "http://tiles.xbox.com/tiles/lJ/fs/02dsb2JhbC9ECgQLGwMfWStQL2ljb24vMC84MDAwAAAAAAAAAPzDl4s=.jpg";
	a["LOTR: Conquest"] = "http://tiles.xbox.com/tiles/3C/eJ/0Gdsb2JhbC9ECgQNGwEfVlpRL2ljb24vMC84MDAwAAAAAAAAAP+mJ8M=.jpg";
	a["LUMINES LIVE!"] = "http://tiles.xbox.com/tiles/tP/bz/0Gdsb2JhbC9ECgUAGwEfWSlbL2ljb24vMC84MDAwAAAAAAAAAP-c9qs=.jpg";
	a["Left 4 Dead"] = "http://tiles.xbox.com/tiles/j9/MR/1mdsb2JhbC9ECgQNGwEfVlxTL2ljb24vMC84MDAwAAAAAAAAAPk+05A=.jpg";
	a["Lost Cities"] = "http://tiles.xbox.com/tiles/rQ/Pt/1Wdsb2JhbC9ECgUAGwEfVikhL2ljb24vMC84MDAwAAAAAAAAAPrCA7I=.jpg";
	a["Luxor 2"] = "http://tiles.xbox.com/tiles/wG/Vb/0mdsb2JhbC9ECgUAGwEfVl8nL2ljb24vMC84MDAwAAAAAAAAAP10Zd8=.jpg";
	a["MEGA MAN 9"] = "http://tiles.xbox.com/tiles/j-/oP/1Gdsb2JhbC9ECgUAGwEfV10iL2ljb24vMC84MDAwAAAAAAAAAPsg+pA=.jpg";
	a["MLB® Stickball"] = "http://tiles.xbox.com/tiles/9P/wl/1Gdsb2JhbC9ECgUAGwEfVi1XL2ljb24vMC84MDAwAAAAAAAAAPsK-Os=.jpg";
	a["MOH Airborne"] = "http://tiles.xbox.com/tiles/Wf/4e/02dsb2JhbC9ECgQNGwEfWSlVL2ljb24vMC84MDAwAAAAAAAAAPwx-kY=.jpg";
	a["MONOPOLY"] = "http://tiles.xbox.com/tiles/IS/f9/0mdsb2JhbC9ECgQNGwEfVlklL2ljb24vMC84MDAwAAAAAAAAAP3SJz4=.jpg";
	a["MS.PAC-MAN"] = "http://tiles.xbox.com/tiles/pa/cH/1mdsb2JhbC9ECgUAGwEfVlxUL2ljb24vMC84MDAwAAAAAAAAAPkop7o=.jpg";
	a["Mad Tracks"] = "http://tiles.xbox.com/tiles/Aw/hD/1Gdsb2JhbC9ECgUAGwEfWSlUL2ljb24vMC84MDAwAAAAAAAAAPtsCBw=.jpg";
	a["Madden NFL 08"] = "http://tiles.xbox.com/tiles/hd/hB/0Wdsb2JhbC9ECgQNGwEfVl4nL2ljb24vMC84MDAwAAAAAAAAAP5u2Jo=.jpg";
	a["Madden NFL 09"] = "http://tiles.xbox.com/tiles/2o/Is/0Wdsb2JhbC9ECgQNGwEfVllXL2ljb24vMC84MDAwAAAAAAAAAP4DgsU=.jpg";
	a["Marathon: Durandal"] = "http://tiles.xbox.com/tiles/3X/eI/0Wdsb2JhbC9ECgUAGwEfVlomL2ljb24vMC84MDAwAAAAAAAAAP6nd8I=.jpg";
	a["Marble Blast Ultra"] = "http://tiles.xbox.com/tiles/gi/SJ/12dsb2JhbC9ECgUAGwEfWStUL2ljb24vMC84MDAwAAAAAAAAAPimJJ0=.jpg";
	a["Marvel Ult. Alliance"] = "http://tiles.xbox.com/tiles/9U/xp/1Gdsb2JhbC9ECgQJGgYfWSsiL2ljb24vMC84MDAwAAAAAAAAAPtGTOo=.jpg";
	a["Mass Effect"] = "http://tiles.xbox.com/tiles/kp/Me/0Gdsb2JhbC9ECgR8GgMfWSpbL2ljb24vMC84MDAwAAAAAAAAAP8xk40=.jpg";
	a["Mercenaries 2"] = "http://tiles.xbox.com/tiles/V+/St/0Wdsb2JhbC9ECgQNGwEfVl1bL2ljb24vMC84MDAwAAAAAAAAAP6C5Eg=.jpg";
	a["Metal Slug 3"] = "http://tiles.xbox.com/tiles/+F/LQ/0mdsb2JhbC9ECgUAGwEfViwlL2ljb24vMC84MDAwAAAAAAAAAP3-Uuc=.jpg";
	a["Midnight Club: LA"] = "http://tiles.xbox.com/tiles/Yw/ZG/0mdsb2JhbC9ECgUMGgQfWSlbL2ljb24vMC84MDAwAAAAAAAAAP1pBnw=.jpg";
	a["Mirror's Edge™"] = "http://tiles.xbox.com/tiles/DK/ZP/0mdsb2JhbC9ECgQNGwEfVlpTL2ljb24vMC84MDAwAAAAAAAAAP1gphM=.jpg";
	a["Missile Command"] = "http://tiles.xbox.com/tiles/wj/zP/1Wdsb2JhbC9ECgUAGwEfVlsnL2ljb24vMC84MDAwAAAAAAAAAPrgPN0=.jpg";
	a["Monster Madness"] = "http://tiles.xbox.com/tiles/Md/pE/1Gdsb2JhbC9ECgULGgAfWStSL2ljb24vMC84MDAwAAAAAAAAAPtr2i4=.jpg";
	a["Mortal Kombat vs. DCU"] = "http://tiles.xbox.com/tiles/-4/X-/0Gdsb2JhbC9ECgR8GgcfWSpaL2ljb24vMC84MDAwAAAAAAAAAP-QheA=.jpg";
	a["Mutant Storm Empire"] = "http://tiles.xbox.com/tiles/3y/4c/1mdsb2JhbC9ECgUAGwEfVl4mL2ljb24vMC84MDAwAAAAAAAAAPkzLsA=.jpg";
	a["Mutant Storm Reloaded"] = "http://tiles.xbox.com/tiles/2Y/LV/0Wdsb2JhbC9ECgUAGwEfWSsiL2ljb24vMC84MDAwAAAAAAAAAP76gsY=.jpg";
	a["N+"] = "http://tiles.xbox.com/tiles/rf/XD/1mdsb2JhbC9ECgUAGwEfVlogL2ljb24vMC84MDAwAAAAAAAAAPns9bI=.jpg";
	a["NBA LIVE 08"] = "http://tiles.xbox.com/tiles/g3/3k/0Gdsb2JhbC9ECgQNGwEfVl0hL2ljb24vMC84MDAwAAAAAAAAAP-LfZw=.jpg";
	a["NBA LIVE 09"] = "http://tiles.xbox.com/tiles/Tu/7x/0Wdsb2JhbC9ECgQNGwEfVlgiL2ljb24vMC84MDAwAAAAAAAAAP7e7lE=.jpg";
	a["NBA STREET Homecourt"] = "http://tiles.xbox.com/tiles/sb/59/0mdsb2JhbC9ECgQNGwEfWSlUL2ljb24vMC84MDAwAAAAAAAAAP1Svq4=.jpg";
	a["NCAA® Football 09"] = "http://tiles.xbox.com/tiles/h4/HV/1mdsb2JhbC9ECgQNGwEfVlonL2ljb24vMC84MDAwAAAAAAAAAPn6gZg=.jpg";
	a["NEW RALLY-X"] = "http://tiles.xbox.com/tiles/dS/bB/1Gdsb2JhbC9ECgUAGwEfVlxWL2ljb24vMC84MDAwAAAAAAAAAPvuJmo=.jpg";
	a["NFS Most Wanted"] = "http://tiles.xbox.com/tiles/by/xk/1Gdsb2JhbC9ECgQNGwEfWStaL2ljb24vMC84MDAwAAAAAAAAAPtLLHA=.jpg";
	a["NINJA BLADE"] = "http://tiles.xbox.com/tiles/KN/4U/12dsb2JhbC9ECgQOGgMfWStaL2ljb24vMC84MDAwAAAAAAAAAPg73jc=.jpg";
	a["NINJA GAIDEN 2"] = "http://tiles.xbox.com/tiles/Rf/Lj/1mdsb2JhbC9ECgUMGwMfWStWL2ljb24vMC84MDAwAAAAAAAAAPnM8lo=.jpg";
	a["Naruto Rise Of A Ninja"] = "http://tiles.xbox.com/tiles/r9/L6/1Wdsb2JhbC9ECgUNGgMfWSpWL2ljb24vMC84MDAwAAAAAAAAAPrV0rA=.jpg";
	a["Need for Speed™ Carbon"] = "http://tiles.xbox.com/tiles/TL/4J/0Gdsb2JhbC9ECgQNGwEfWSogL2ljb24vMC84MDAwAAAAAAAAAP8mvlM=.jpg";
	a["Ninety-Nine Nights"] = "http://tiles.xbox.com/tiles/sQ/Fz/1Gdsb2JhbC9ECgR8GgMfWSshL2ljb24vMC84MDAwAAAAAAAAAPtcAa4=.jpg";
	a["Novadrome"] = "http://tiles.xbox.com/tiles/Kp/F+/12dsb2JhbC9ECgUAGwEfWSpaL2ljb24vMC84MDAwAAAAAAAAAPhRkTU=.jpg";
	a["Oblivion"] = "http://tiles.xbox.com/tiles/WT/0X/12dsb2JhbC9ECgQKGgMfWStSL2ljb24vMC84MDAwAAAAAAAAAPg4PUY=.jpg";
	a["Outpost Kaloki X"] = "http://tiles.xbox.com/tiles/4U/Nw/0mdsb2JhbC9ECgUAGwEfWSshL2ljb24vMC84MDAwAAAAAAAAAP1fQ-4=.jpg";
	a["Over-G"] = "http://tiles.xbox.com/tiles/Gm/pq/1Gdsb2JhbC9ECgUMGwkfWStSL2ljb24vMC84MDAwAAAAAAAAAPtFagU=.jpg";
	a["Overlord"] = "http://tiles.xbox.com/tiles/64/Pe/1mdsb2JhbC9ECgQLG3QfWStWL2ljb24vMC84MDAwAAAAAAAAAPnxg-Q=.jpg";
	a["PAC-MAN"] = "http://tiles.xbox.com/tiles/VA/mG/0mdsb2JhbC9ECgUAGwEfVl5SL2ljb24vMC84MDAwAAAAAAAAAP2pCUs=.jpg";
	a["PGR 3"] = "http://tiles.xbox.com/tiles/ou/TB/1mdsb2JhbC9ECgR8GgMfWStSL2ljb24vMC84MDAwAAAAAAAAAPnu5L0=.jpg";
	a["Pac-Man C.E."] = "http://tiles.xbox.com/tiles/p-/6T/0Wdsb2JhbC9ECgUAGwEfVlhUL2ljb24vMC84MDAwAAAAAAAAAP68-rg=.jpg";
	a["Paperboy"] = "http://tiles.xbox.com/tiles/DR/Lw/1mdsb2JhbC9ECgUAGwEfVl1aL2ljb24vMC84MDAwAAAAAAAAAPnfEhI=.jpg";
	a["Penny Arcade Episode 1"] = "http://tiles.xbox.com/tiles/Rp/Ur/02dsb2JhbC9ECgUAGwEfV18nL2ljb24vMC84MDAwAAAAAAAAAPwElVk=.jpg";
	a["Penny Arcade Episode 2"] = "http://tiles.xbox.com/tiles/1F/xT/0mdsb2JhbC9ECgUAGwEfV11UL2ljb24vMC84MDAwAAAAAAAAAP18XMs=.jpg";
	a["Perfect Dark Zero"] = "http://tiles.xbox.com/tiles/cm/UH/1Gdsb2JhbC9ECgR8GgMfWStQL2ljb24vMC84MDAwAAAAAAAAAPsoZW0=.jpg";
	a["Phantasy Star Universe"] = "http://tiles.xbox.com/tiles/I8/G-/1mdsb2JhbC9ECgULGwUfWSpQL2ljb24vMC84MDAwAAAAAAAAAPmQwTw=.jpg";
	a["Pinball FX"] = "http://tiles.xbox.com/tiles/nW/ai/1Wdsb2JhbC9ECgUAGwEfVlxXL2ljb24vMC84MDAwAAAAAAAAAPqNZoI=.jpg";
	a["PlayOnline Viewer"] = "http://tiles.xbox.com/tiles/xB/0g/0Wdsb2JhbC9ECgULGgEfWStRL2ljb24vMC84MDAwAAAAAAAAAP4PHds=.jpg";
	a["Pocketbike Racer"] = "http://tiles.xbox.com/tiles/yu/uU/0Wdsb2JhbC9ECgR8GgMXVl9QL2ljb24vMC84MDAwAAAAAAAAAP6769U=.jpg";
	a["Portal: Still Alive"] = "http://tiles.xbox.com/tiles/Ts/fv/02dsb2JhbC9ECgUAGwEfV1lTL2ljb24vMC84MDAwAAAAAAAAAPzAx1E=.jpg";
	a["PowerUp Forever"] = "http://tiles.xbox.com/tiles/G5/bS/1Gdsb2JhbC9ECgUAGwEfV1xXL2ljb24vMC84MDAwAAAAAAAAAPv9lgQ=.jpg";
	a["Prey"] = "http://tiles.xbox.com/tiles/Oh/0w/1mdsb2JhbC9ECgUMGgQfWSpTL2ljb24vMC84MDAwAAAAAAAAAPkfHSU=.jpg";
	a["Prince of Persia"] = "http://tiles.xbox.com/tiles/Ut/vi/0Wdsb2JhbC9ECgUNGgMfVl8gL2ljb24vMC84MDAwAAAAAAAAAP7N200=.jpg";
	a["Prince of Persia"] = "http://tiles.xbox.com/tiles/gH/Rx/1mdsb2JhbC9ECgUAGwEfVllWL2ljb24vMC84MDAwAAAAAAAAAPledJ8=.jpg";
	a["Puzzle Fighter HD"] = "http://tiles.xbox.com/tiles/q1/Bm/12dsb2JhbC9ECgUAGwEfVlkmL2ljb24vMC84MDAwAAAAAAAAAPhJULQ=.jpg";
	a["Puzzle Quest"] = "http://tiles.xbox.com/tiles/p0/IE/0mdsb2JhbC9ECgUAGwEfVlZVL2ljb24vMC84MDAwAAAAAAAAAP0rQrg=.jpg";
	a["RESIDENT EVIL 5"] = "http://tiles.xbox.com/tiles/DF/XE/1Wdsb2JhbC9ECgQLGwMfWStXL2ljb24vMC84MDAwAAAAAAAAAPrrVRM=.jpg";
	a["Rainbow Six® Vegas 2"] = "http://tiles.xbox.com/tiles/2f/x4/1Wdsb2JhbC9ECgUNGgMfVl9UL2ljb24vMC84MDAwAAAAAAAAAPpX-MY=.jpg";
	a["Rainbow Six® Vegas"] = "http://tiles.xbox.com/tiles/YB/h7/02dsb2JhbC9ECgUNGgMfWStVL2ljb24vMC84MDAwAAAAAAAAAPxUGH8=.jpg";
	a["Rez HD"] = "http://tiles.xbox.com/tiles/bD/4N/0mdsb2JhbC9ECgUAGwEfVi1QL2ljb24vMC84MDAwAAAAAAAAAP0iPnM=.jpg";
	a["RoboBlitz"] = "http://tiles.xbox.com/tiles/pa/5r/0Gdsb2JhbC9ECgUAGwEfWSpWL2ljb24vMC84MDAwAAAAAAAAAP9Erro=.jpg";
	a["Robotron: 2084"] = "http://tiles.xbox.com/tiles/7e/2F/1Gdsb2JhbC9ECgUAGwEfWSpTL2ljb24vMC84MDAwAAAAAAAAAPuq7fI=.jpg";
	a["Rock Band 2"] = "http://tiles.xbox.com/tiles/vf/1a/12dsb2JhbC9ECgQNGwEfVllaL2ljb24vMC84MDAwAAAAAAAAAPh1-aI=.jpg";
	a["Rock Band"] = "http://tiles.xbox.com/tiles/v6/TO/0Gdsb2JhbC9ECgQNGwEfVl1aL2ljb24vMC84MDAwAAAAAAAAAP-hpKA=.jpg";
	a["RocketBowl"] = "http://tiles.xbox.com/tiles/d3/9V/02dsb2JhbC9ECgUAGwEfVlhWL2ljb24vMC84MDAwAAAAAAAAAPx6f2g=.jpg";
	a["Root Beer Tapper"] = "http://tiles.xbox.com/tiles/QU/mR/0Wdsb2JhbC9ECgUAGwEfVl0nL2ljb24vMC84MDAwAAAAAAAAAP6+SV4=.jpg";
	a["Rumble Roses Double X"] = "http://tiles.xbox.com/tiles/7I/X1/02dsb2JhbC9ECgR6G3UfWStSL2ljb24vMC84MDAwAAAAAAAAAPzahfM=.jpg";
	a["Rush'n Attack"] = "http://tiles.xbox.com/tiles/ez/Ue/0Gdsb2JhbC9ECgUAGwEfVl5aL2ljb24vMC84MDAwAAAAAAAAAP8xNWQ=.jpg";
	a["SEGA Superstars Tennis"] = "http://tiles.xbox.com/tiles/JW/Qa/12dsb2JhbC9ECgULGwUfWSlWL2ljb24vMC84MDAwAAAAAAAAAPg1ZDo=.jpg";
	a["SONIC THE HEDGEHOG"] = "http://tiles.xbox.com/tiles/nI/l1/12dsb2JhbC9ECgULGwUfWStVL2ljb24vMC84MDAwAAAAAAAAAPhaiYM=.jpg";
	a["SONIC UNLEASHED"] = "http://tiles.xbox.com/tiles/mi/W8/0Gdsb2JhbC9ECgULGwUfVl5RL2ljb24vMC84MDAwAAAAAAAAAP+TJYU=.jpg";
	a["SOULCALIBUR"] = "http://tiles.xbox.com/tiles/bb/E8/0mdsb2JhbC9ECgUAGwEfV19XL2ljb24vMC84MDAwAAAAAAAAAP0TsXI=.jpg";
	a["STREET FIGHTER IV"] = "http://tiles.xbox.com/tiles/sx/0O/1Gdsb2JhbC9ECgQLGwMfWSpSL2ljb24vMC84MDAwAAAAAAAAAPshHaw=.jpg";
	a["Saints Row 2"] = "http://tiles.xbox.com/tiles/F4/8v/1Wdsb2JhbC9ECgUMGgEfWSkgL2ljb24vMC84MDAwAAAAAAAAAPoAjwg=.jpg";
	a["Saints Row"] = "http://tiles.xbox.com/tiles/bQ/Y0/1Wdsb2JhbC9ECgUMGgEfWStSL2ljb24vMC84MDAwAAAAAAAAAPobBnI=.jpg";
	a["Scramble"] = "http://tiles.xbox.com/tiles/HE/po/1mdsb2JhbC9ECgUAGwEfVl5XL2ljb24vMC84MDAwAAAAAAAAAPlHSgM=.jpg";
	a["Screwjumper!"] = "http://tiles.xbox.com/tiles/n4/Oh/0Wdsb2JhbC9ECgUAGwEfVlZWL2ljb24vMC84MDAwAAAAAAAAAP6Og4A=.jpg";
	a["Shadowrun"] = "http://tiles.xbox.com/tiles/Oi/bp/0Gdsb2JhbC9ECgR8GgMfWStVL2ljb24vMC84MDAwAAAAAAAAAP-GJiU=.jpg";
	a["Shrek-n-Roll"] = "http://tiles.xbox.com/tiles/Oz/ak/0mdsb2JhbC9ECgUAGwEfVixUL2ljb24vMC84MDAwAAAAAAAAAP2LNiQ=.jpg";
	a["Silent Hill Homecoming"] = "http://tiles.xbox.com/tiles/u4/1c/02dsb2JhbC9ECgR6G3UfWSpWL2ljb24vMC84MDAwAAAAAAAAAPxzjaQ=.jpg";
	a["Skate 2"] = "http://tiles.xbox.com/tiles/1i/zZ/12dsb2JhbC9ECgQNGwEfVlglL2ljb24vMC84MDAwAAAAAAAAAPj2LMk=.jpg";
	a["SmackDown vs. RAW 2009"] = "http://tiles.xbox.com/tiles/JU/y2/12dsb2JhbC9ECgUMGgEfVl1VL2ljb24vMC84MDAwAAAAAAAAAPiZTDo=.jpg";
	a["Small Arms"] = "http://tiles.xbox.com/tiles/Uq/VP/1Wdsb2JhbC9ECgUAGwEfWStWL2ljb24vMC84MDAwAAAAAAAAAPpgpU0=.jpg";
	a["Smash TV"] = "http://tiles.xbox.com/tiles/Ba/3m/1Wdsb2JhbC9ECgUAGwEfWSpSL2ljb24vMC84MDAwAAAAAAAAAPrJrRo=.jpg";
	a["Sneak King"] = "http://tiles.xbox.com/tiles/Iq/v3/0Gdsb2JhbC9ECgR8GgMXVl9RL2ljb24vMC84MDAwAAAAAAAAAP-Yqz0=.jpg";
	a["Soltrio Solitaire"] = "http://tiles.xbox.com/tiles/tk/K1/1Gdsb2JhbC9ECgUAGwEfVlwnL2ljb24vMC84MDAwAAAAAAAAAPuaQqk=.jpg";
	a["Sonic The Hedgehog 2"] = "http://tiles.xbox.com/tiles/8P/Y6/0Wdsb2JhbC9ECgUAGwEfVllQL2ljb24vMC84MDAwAAAAAAAAAP4V9u8=.jpg";
	a["Sonic The Hedgehog"] = "http://tiles.xbox.com/tiles/aD/QS/12dsb2JhbC9ECgUAGwEfVllXL2ljb24vMC84MDAwAAAAAAAAAPg9NHc=.jpg";
	a["Soulcalibur IV"] = "http://tiles.xbox.com/tiles/rx/LC/1mdsb2JhbC9ECgR9G3QfWSpTL2ljb24vMC84MDAwAAAAAAAAAPntErA=.jpg";
	a["Space Giraffe"] = "http://tiles.xbox.com/tiles/WK/dz/1Gdsb2JhbC9ECgUAGwEfVl8gL2ljb24vMC84MDAwAAAAAAAAAPtcp0c=.jpg";
	a["Speedball 2"] = "http://tiles.xbox.com/tiles/q+/zx/1Gdsb2JhbC9ECgUAGwEfVlcnL2ljb24vMC84MDAwAAAAAAAAAPve7LQ=.jpg";
	a["Spider-Man 3"] = "http://tiles.xbox.com/tiles/Ea/L-/02dsb2JhbC9ECgQJGgYfWSpRL2ljb24vMC84MDAwAAAAAAAAAPzQog4=.jpg";
	a["Spidey: Web of Shadows"] = "http://tiles.xbox.com/tiles/2M/S3/0mdsb2JhbC9ECgQJGgYfVl5WL2ljb24vMC84MDAwAAAAAAAAAP2YxMc=.jpg";
	a["Splinter Cell D.A."] = "http://tiles.xbox.com/tiles/iF/gY/0mdsb2JhbC9ECgUNGgMfWStUL2ljb24vMC84MDAwAAAAAAAAAP03WJc=.jpg";
	a["SpongeBob UnderPants!"] = "http://tiles.xbox.com/tiles/jG/YT/02dsb2JhbC9ECgUAGwEfVlYlL2ljb24vMC84MDAwAAAAAAAAAPw8ZpM=.jpg";
	a["Spyglass Board Games"] = "http://tiles.xbox.com/tiles/04/mF/1mdsb2JhbC9ECgUAGwEfWSlWL2ljb24vMC84MDAwAAAAAAAAAPmqicw=.jpg";
	a["Star Ocean: TLH"] = "http://tiles.xbox.com/tiles/n7/t8/12dsb2JhbC9ECgULGgEfWSsnL2ljb24vMC84MDAwAAAAAAAAAPhTu4A=.jpg";
	a["Stranglehold"] = "http://tiles.xbox.com/tiles/H3/Pm/1Gdsb2JhbC9ECgR8GgcfWStRL2ljb24vMC84MDAwAAAAAAAAAPvJcwA=.jpg";
	a["Street Fighter II' HF"] = "http://tiles.xbox.com/tiles/O8/nm/12dsb2JhbC9ECgUAGwEfWSlXL2ljb24vMC84MDAwAAAAAAAAAPjJySQ=.jpg";
	a["Street Trace:NYC"] = "http://tiles.xbox.com/tiles/m8/pr/0mdsb2JhbC9ECgUAGwEfWSlTL2ljb24vMC84MDAwAAAAAAAAAP1EyoQ=.jpg";
	a["Streets of Rage 2"] = "http://tiles.xbox.com/tiles/Qx/AF/1mdsb2JhbC9ECgUAGwEfVlknL2ljb24vMC84MDAwAAAAAAAAAPkqEFw=.jpg";
	a["Super Contra"] = "http://tiles.xbox.com/tiles/fy/2R/02dsb2JhbC9ECgUAGwEfVl4iL2ljb24vMC84MDAwAAAAAAAAAPy+LWA=.jpg";
	a["SuperStreetFighter2THD"] = "http://tiles.xbox.com/tiles/gt/vL/0mdsb2JhbC9ECgUAGwEfVi5XL2ljb24vMC84MDAwAAAAAAAAAP3k250=.jpg";
	a["Switchball"] = "http://tiles.xbox.com/tiles/PW/Uv/0Gdsb2JhbC9ECgUAGwEfVlxTL2ljb24vMC84MDAwAAAAAAAAAP8AZSI=.jpg";
	a["TMNT 1989 Arcade"] = "http://tiles.xbox.com/tiles/Pz/y7/12dsb2JhbC9ECgUAGwEfVlhTL2ljb24vMC84MDAwAAAAAAAAAPiUPCA=.jpg";
	a["TMNT"] = "http://tiles.xbox.com/tiles/vo/pi/1Wdsb2JhbC9ECgUNGgMfWSlbL2ljb24vMC84MDAwAAAAAAAAAPpNiqE=.jpg";
	a["TNA iMPACT!™"] = "http://tiles.xbox.com/tiles/lF/R8/0Gdsb2JhbC9ECgR8GgcfWSslL2ljb24vMC84MDAwAAAAAAAAAP9TVIs=.jpg";
	a["Tales of Vesperia"] = "http://tiles.xbox.com/tiles/aG/45/1Wdsb2JhbC9ECgR9G3QfWSpaL2ljb24vMC84MDAwAAAAAAAAAPoWbnc=.jpg";
	a["Tenchu Z"] = "http://tiles.xbox.com/tiles/d2/DH/0mdsb2JhbC9ECgQOGgMfWStUL2ljb24vMC84MDAwAAAAAAAAAP3oYGg=.jpg";
	a["Test Drive Unlimited"] = "http://tiles.xbox.com/tiles/ml/I8/0Gdsb2JhbC9ECgQBGwcfWStXL2ljb24vMC84MDAwAAAAAAAAAP8TUoU=.jpg";
	a["Tetris Evolution"] = "http://tiles.xbox.com/tiles/HY/R-/0mdsb2JhbC9ECgUMGgEfWStUL2ljb24vMC84MDAwAAAAAAAAAP1QhAI=.jpg";
	a["Tetris Splash"] = "http://tiles.xbox.com/tiles/xs/D+/02dsb2JhbC9ECgUAGwEfVlwhL2ljb24vMC84MDAwAAAAAAAAAPzRwNk=.jpg";
	a["Texas Hold'em"] = "http://tiles.xbox.com/tiles/60/gg/1Wdsb2JhbC9ECgUAGwEfWSlVL2ljb24vMC84MDAwAAAAAAAAAPoPSPQ=.jpg";
	a["The Darkness"] = "http://tiles.xbox.com/tiles/WX/rJ/02dsb2JhbC9ECgUMGgQfWSomL2ljb24vMC84MDAwAAAAAAAAAPzmekY=.jpg";
	a["The Force Unleashed"] = "http://tiles.xbox.com/tiles/gw/iP/1Gdsb2JhbC9ECgR7GwEfWStRL2ljb24vMC84MDAwAAAAAAAAAPugCJw=.jpg";
	a["The Godfather™"] = "http://tiles.xbox.com/tiles/mC/dA/0Wdsb2JhbC9ECgQNGwEfWSpaL2ljb24vMC84MDAwAAAAAAAAAP5vJ4c=.jpg";
	a["The Incredible Hulk™"] = "http://tiles.xbox.com/tiles/hW/eX/0mdsb2JhbC9ECgULGwUfWSlSL2ljb24vMC84MDAwAAAAAAAAAP24Z5o=.jpg";
	a["The Last Remnant"] = "http://tiles.xbox.com/tiles/1-/iS/02dsb2JhbC9ECgULGgEfWSsiL2ljb24vMC84MDAwAAAAAAAAAPy9+Mg=.jpg";
	a["The Maw"] = "http://tiles.xbox.com/tiles/c3/VK/1mdsb2JhbC9ECgUAGwEfVixRL2ljb24vMC84MDAwAAAAAAAAAPlldWw=.jpg";
	a["The Orange Box"] = "http://tiles.xbox.com/tiles/ol/Kj/1mdsb2JhbC9ECgQNGwEfVl8lL2ljb24vMC84MDAwAAAAAAAAAPmMUr0=.jpg";
	a["The Simpsons™ Game"] = "http://tiles.xbox.com/tiles/Po/gE/02dsb2JhbC9ECgQNGwEfVl9aL2ljb24vMC84MDAwAAAAAAAAAPwriCE=.jpg";
	a["Ticket to Ride™"] = "http://tiles.xbox.com/tiles/M2/Rg/0mdsb2JhbC9ECgUAGwEfViogL2ljb24vMC84MDAwAAAAAAAAAP1PZCw=.jpg";
	a["TigerWoodsPGATOUR® 09"] = "http://tiles.xbox.com/tiles/jY/qF/0Wdsb2JhbC9ECgQNGwEfVlhTL2ljb24vMC84MDAwAAAAAAAAAP6qipI=.jpg";
	a["Time Pilot"] = "http://tiles.xbox.com/tiles/9A/oL/12dsb2JhbC9ECgUAGwEfVl5WL2ljb24vMC84MDAwAAAAAAAAAPgkCus=.jpg";
	a["Tom Clancy's EndWar™"] = "http://tiles.xbox.com/tiles/55/EU/0Wdsb2JhbC9ECgUNGgMfWSpTL2ljb24vMC84MDAwAAAAAAAAAP47kfg=.jpg";
	a["Tomb Raider Underworld"] = "http://tiles.xbox.com/tiles/eI/Uq/0mdsb2JhbC9ECgULGwMfWSogL2ljb24vMC84MDAwAAAAAAAAAP0FhWc=.jpg";
	a["Tony Hawk's Project 8"] = "http://tiles.xbox.com/tiles/vQ/+H/0Gdsb2JhbC9ECgQJGgYfWSsnL2ljb24vMC84MDAwAAAAAAAAAP+oD6I=.jpg";
	a["TotemBall"] = "http://tiles.xbox.com/tiles/1S/VM/0Wdsb2JhbC9ECgUAGwEfVlxSL2ljb24vMC84MDAwAAAAAAAAAP5jJco=.jpg";
	a["Track and Field"] = "http://tiles.xbox.com/tiles/R+/w0/0Gdsb2JhbC9ECgUAGwEfVl4hL2ljb24vMC84MDAwAAAAAAAAAP8b7Fg=.jpg";
	a["Transformers: The Game"] = "http://tiles.xbox.com/tiles/X0/S0/1mdsb2JhbC9ECgQJGgYfWSlSL2ljb24vMC84MDAwAAAAAAAAAPmbREA=.jpg";
	a["Two Worlds"] = "http://tiles.xbox.com/tiles/eZ/mq/0Gdsb2JhbC9ECgULGgAfWStXL2ljb24vMC84MDAwAAAAAAAAAP+FmWY=.jpg";
	a["UNO"] = "http://tiles.xbox.com/tiles/ow/vO/0Wdsb2JhbC9ECgUAGwEfWSlQL2ljb24vMC84MDAwAAAAAAAAAP7hC7w=.jpg";
	a["Ultimate MK3"] = "http://tiles.xbox.com/tiles/Ba/SK/02dsb2JhbC9ECgUAGwEfVlxQL2ljb24vMC84MDAwAAAAAAAAAPylpBo=.jpg";
	a["Undertow"] = "http://tiles.xbox.com/tiles/B-/0e/1Gdsb2JhbC9ECgUAGwEfVlhQL2ljb24vMC84MDAwAAAAAAAAAPsx-Rg=.jpg";
	a["Viva Pi&#241;ata"] = "http://tiles.xbox.com/tiles/Gw/mu/1mdsb2JhbC9ECgR8GgMfWSlRL2ljb24vMC84MDAwAAAAAAAAAPmBCQQ=.jpg";
	a["Viva Piñata"] = "http://tiles.xbox.com/tiles/Gw/mu/1mdsb2JhbC9ECgR8GgMfWSlRL2ljb24vMC84MDAwAAAAAAAAAPmBCQQ=.jpg";
	a["WOTB: Commando 3"] = "http://tiles.xbox.com/tiles/2X/2X/1Gdsb2JhbC9ECgUAGwEfVi4hL2ljb24vMC84MDAwAAAAAAAAAPu4fcY=.jpg";
	a["Wik: Fable of Souls"] = "http://tiles.xbox.com/tiles/kc/E7/1Wdsb2JhbC9ECgUAGwEfWSsnL2ljb24vMC84MDAwAAAAAAAAAPoUwY4=.jpg";
	a["Wing Commander™ Arena"] = "http://tiles.xbox.com/tiles/5w/sH/0Gdsb2JhbC9ECgUAGwEfVllbL2ljb24vMC84MDAwAAAAAAAAAP8oC-g=.jpg";
	a["Wits &amp; Wagers"] = "http://tiles.xbox.com/tiles/Ul/oN/0Gdsb2JhbC9ECgUAGwEfVi5VL2ljb24vMC84MDAwAAAAAAAAAP8iWk0=.jpg";
	a["Word Puzzle"] = "http://tiles.xbox.com/tiles/nz/82/0mdsb2JhbC9ECgUAGwEfVlhXL2ljb24vMC84MDAwAAAAAAAAAP0ZP4A=.jpg";
	a["Worms"] = "http://tiles.xbox.com/tiles/eY/FY/1Gdsb2JhbC9ECgUAGwEfWSsmL2ljb24vMC84MDAwAAAAAAAAAPt3gWY=.jpg";
	a["XEVIOUS"] = "http://tiles.xbox.com/tiles/d8/PC/0Gdsb2JhbC9ECgUAGwEfVlZXL2ljb24vMC84MDAwAAAAAAAAAP-tw2g=.jpg";
	a["Yaris"] = "http://tiles.xbox.com/tiles/ZJ/rn/0Wdsb2JhbC9ECgUAGwEfVlglL2ljb24vMC84MDAwAAAAAAAAAP7Imns=.jpg";
	a["Yie Ar Kung-Fu"] = "http://tiles.xbox.com/tiles/zM/uu/1Gdsb2JhbC9ECgUAGwEfVl5VL2ljb24vMC84MDAwAAAAAAAAAPuBy9M=.jpg";
	a["Zuma"] = "http://tiles.xbox.com/tiles/tk/vZ/0mdsb2JhbC9ECgUAGwEfWSolL2ljb24vMC84MDAwAAAAAAAAAP32S6k=.jpg";
	a["skate."] = "http://tiles.xbox.com/tiles/Nj/5+/1mdsb2JhbC9ECgQNGwEfVl5QL2ljb24vMC84MDAwAAAAAAAAAPlRPik=.jpg";

	return a;
}