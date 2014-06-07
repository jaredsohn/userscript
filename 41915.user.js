// ==UserScript==
// @name           blu-raystats Checker
// @namespace      lqpu@marvell.com
// @description    blu-raystats Checker
// @include        http://www.blu-raystats.com/Stats/Stats.php
// ==/UserScript==

var thstr ='<a href="#">Select<br/>Disk</a>';
var tdstr ='<a href="#">Select<br/>Disk</a>';

var purchased = [
'Relentless Enemies',
'Chronos',
'Terminator 2: Judgment Day',
'Exotic Saltwater Aquarium',
'Hairspray',
'Beowulf & Grendel',
'HDNet World Report - Shuttle Discovery\'s Historic Mission',
'Disturbia',
'The Architect',
'Swordfish',
'The Transporter',
'Kingdom of Heaven',
'XXX',
'Rescue Dawn',
'The Terminator',
'S.W.A.T.',
'Lord of War',
'Ice Age - The Meltdown',
'Tyler Perry\'s Daddy\'s Little Girls',
'From Hell',
'The Last Waltz',
'Night of the Werewolf / Vengeance of the Zombies',
'Ultimate Force',
'The Phantom of the Opera',
'Legends of Jazz: Showcase',
'Elton John: Elton 60 - Live At Madison Square Garden',
'Nine Inch Nails Live - Beside You in Time',
'Babel',
'TMNT',
'Kiss of the Dragon',
'The Sentinel',
'Eight Below',
'Fantastic Four',
'Failure to Launch',
'Dreamgirls',
'Rumor Has It',
'District B13',
'The Devil Wears Prada',
'Sharkwater',
'Happily N\'Ever After',
'Blood & Chocolate',
'Basic Instinct 2',
'Home of the Brave',
'Category 7: The End of the World',
'Destiny\'s Child: Live in Atlanta',
'The Curse of King Tut\'s Tomb: The Complete Miniseries',
'Invincible',
'Blackbeard',
'Annapolis',
'10.5 Apocalypse',
'The World\'s Fastest Indian',
'Volver',
'Night at the Museum',
'Rocky Balboa',
'Pearl Harbor',
'Kiss Kiss Bang Bang',
'Flyboys',
'Mission Impossible',
'First Blood',
'Good Night and Good Luck',
'Finding Neverland',
'M:I-2',
'Catch and Release',
'No Gut, No Glory',
'AVP',
'10000BC',
'Oldboy',
'Black&White Night',
'Justin Timberlake',
'Chris Botti: Live',
'Bruce Springsteen with the Sessions Band: Live in Dublin',
'Ceclia Baroil/Bryn Terfel:At Glyndebourne',
'Toto - Live in Amsterdam',
'Grand Canyon',
'Yosemite',
'Yellowstone',
'28 Days Later',
'Shinobi - Heart Under Blade',
'Rescue Dawn',
'Animatrix',
'Close Encounters of the Third Kind (30th Anniversary Ultimate Edition)',
'The Day After Tomorrow',
'Chicken Little',
'Pirates of the Caribbean: Dead Man\'s Chest',
'3:10 to YUMA',
'Sunshine',
'Speed',
'The Fly',
'Santa Clause 3: The Escape Clause',
'Ratatouille',
'Waiting... (Unrated and Raw)',
'Meet the Robinsons',
'Fantastic Four',
'Lost - The Complete Third Season',
'Dragon\'s Lair',
'Pirates of the Caribbean: At World\'s End',
'Live Free or Die Hard',
'Nature\'s Journey',
'AC/DC: Live At Donington',
'Space Ace',
'Pirates of the Caribbean: The Curse of the Black Pearl',
'Walk Hard: The Dewey Cox Story',
'The Descent',
'War',
'Cars',
'Behind Enemy Lines',
'Ultimate Avengers Collection',
'The League of Extraordinary Gentlemen',
'Weeds: Season One',
'MIB (Man in Black)',
'The Guardian',
'Cast Away',
'Iron Man',
'Indiana Jones',
'The Jewel of the Nile',
'Matrix Reloader',
'Matrix Revolutions',
'Matrix',
'Hancock',
'The Dark Knight',
'Casino Royale 007',
'Horton',
'Untraceable',
'Super Troopers',
'Mummy',
'MAMMA MIA',
'Wanted',
'Transformers',
'Band of Brothers'
];

function is_purchased(title)
{
	if(!title || typeof(title) == 'undefined') return false;
	for(var i = 0; i < purchased.length; i++)
	{
		var purchaseTitle = purchased[i];
		if(purchaseTitle.indexOf(title) != -1 || title.indexOf(purchaseTitle) != -1)
		{
			return true;
		}
	}
	return false;
}

function get_title(node)
{
	return node.firstChild.firstChild.innerHTML;
}


var gTotal_Price = 0;
var gchkboxCnt = 0;
var gTitles = 0;
function create_purchasingTable(evt)
{
	var Table = document.getElementById('Table');
	var tbody = Table.firstChild.firstChild;

	var chkbox;
	for(var i = 0; i < gchkboxCnt; i++)
	{
		chkbox = document.getElementById('chk_btn' + i);
		if(chkbox && !chkbox.checked)
		{
			tbody.removeChild( chkbox.parentNode.parentNode);
		}
		if(chkbox.parentNode.parentNode.innerHTML == '')
		{
			tbody.removeChild( chkbox.parentNode.parentNode);
		}
	}
	prompt("Price", "Price: $" + gTotal_Price);
	document.body.innerHTML = document.getElementById('Table').innerHTML;
}

function onClick_CheckBox(e)
{
	var targetNode = e.target;
	if(e.target.nodeName != 'INPUT') return;
	
	var pp = targetNode.parentNode.parentNode;
	
	// start index  == 1
	var price = pp.childNodes[11].firstChild.innerHTML;
	price = parseFloat(price.replace(/\$/,''), 10);
	gTotal_Price += targetNode.checked ? price : -price;
	gTitles += targetNode.checked ? 1 : -1;
}

window.addEventListener("keyup", function(e) { 
	       //F2
     if(e.keyCode == 113) {
    		 prompt("prompt", 'titles:' + gTitles + ' price:$' + gTotal_Price);
    		 //F9
    }else if(e.keyCode == 120){
				
			if(typeof(window.document.designMode ) == 'undefined' || window.document.designMode == 'off') {
				window.document.designMode  = "On";
				
			}else {
				window.document.designMode  = 'off';
			}
		}
}, false);	
	

window.addEventListener("load", function(e) { 
	 if(window.parent.document.location != document.location)
   {
            return;
   }
	var Table = document.getElementById('Table');
	var tbody = Table.firstChild.firstChild;
	var th = document.createElement("th");
	th.style.width = "100px";
	th.innerHTML = '<a href="#">Select<br/>Title</a>';
	tbody.firstChild.appendChild(th);
	
	//th = document.createElement("th");
	//th.style.width = "61px";
	//th.innerHTML = '<a href="#">Remove</a>';
	//tbody.firstChild.appendChild(th);
	
	th = document.createElement("th");
	th.style.width = "61px";
	th.innerHTML = '<div class="title"><input type="button" value="Done!" name="Go"/></div>';
	th.addEventListener('click', create_purchasingTable, false);
		
		
	document.getElementById('titlebar').appendChild(th);

	var curTr = tbody.firstChild.nextSibling;
	var lastTr = tbody.lastChild;
	
	var i = 0;
	while(curTr != lastTr)
	{
		if(curTr.nodeName =='TR') 
    {
    	//dump(is_purchased(get_title(curTr)));
				var el = document.createElement('td');
				var str = is_purchased(get_title(curTr)) ? gchkboxCnt.toString() + '(x)' : gchkboxCnt.toString();
				el.innerHTML ='<input type="checkbox" width="30px" id="chk_btn' + gchkboxCnt + '" /><a>'+ str + '</a>';
				gchkboxCnt++;
				el.style.width ='61px';
				el.style.align ='center';
				
				el.addEventListener('click', onClick_CheckBox, false);
					
				curTr.appendChild(el);
				//var a = document.createElement('a');
				//a.innerHTML = 'X';
				//a.style.align ='center';
				//a.href = '#';
				//a.addEventListener('click', function(e){e.target.parentNode.innerHTML="";}, false);
				//curTr.appendChild(a);
		}
		curTr = curTr.nextSibling;
	}
}, false);

