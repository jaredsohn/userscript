// ==UserScript==
// @name           Autovote Crocodile Dundee as Best NZ Film
// @namespace      http://userscripts.org/scripts/show/*****
// @description    Autovote Crocodile Dundee as Best NZ Film
// @include        http://www.thegreatnzfilmpoll.co.nz/vote_and_win.php
// @include        http://www.thegreatnzfilmpoll.co.nz/vote_thanks_2.php
// ==/UserScript==

/////////////////RANDOM NAME GENERATOR CODE FROM SimplytheBest.net altered slighlt by ZW /////////////
// Programmed By: Michael C. Hundt Copyright08-25-99, mchundt@nglic.com, http://www.cinet.net/~mhundt/
// Permission granted to SimplytheBest.net to feature script in its DHTML script collection
// Courtesy of SimplytheBest.net - http://simplythebest.net/scripts/

var MFname = new Array("Allen","Bob","Carlton","David","Ernie","Foster","George","Howard","Ian","Jeffery","Kenneth","Lawernce",
"Michael","Nathen","Orson","Peter","Quinten","Reginald","Stephen","Thomas","Morris","Victor","Walter","Xavier",
"Charles","Anthony","Gordon","Percy","Conrad","Quincey","Armand","Jamal","Andrew","Matthew","Mark","Gerald")
var FFname = new Array("Alice","Bonnie","Cassie","Donna","Ethel","Fannie","Grace","Heather","Jan","Katherine",
"Julie","Marcia","Patricia","Mabel","Jennifer","Dorthey","Mary Ellen","Jacki","Jean","Betty",
"Diane","Annette","Dawn","Jody","Karen","Mary Jane","Shannon","Stephanie","Kathleen","Emily",
"Tiffany","Angela","Christine","Debbie","Karla","Sandy","Marilyn","Brenda","Hayley","Linda")
var Lname = new Array("Adams","Bowden","Conway","Darden","Edwards","Flynn","Gilliam","Holiday","Ingram","Johnson",
"Kraemer","Hunter","McDonald","Nichols","Peirce","Sawyer","Saunders","Schmidt","Schroeder","Smith",
"Douglas","Ward","Watson","Williams","Winters","Yeager","Ford","Forman","Dixon","Clark",
"Churchill","Brown","Blum","Anderson","Black","Cavenaugh","Hampton","Jenkins","Jefferies","Prichard")
var r=0
var i=0
function randomName(gender)
{ 
	r=Math.floor(Math.random() * Lname.length); 
	
	if(gender <= 5)
	{
		i=Math.floor(Math.random() * FFname.length);
		return FFname[i] + Lname[r];
	}
	else
	{ 
		i=Math.floor(Math.random() * MFname.length);
		return MFname[i] + Lname[r] ;
	}
}

//Create form input
function createInput(name,value,type)
{
	var myInput = document.createElement("input") ;
	myInput.setAttribute("name", name) ;
	myInput.setAttribute("value", value);
	myInput.setAttribute("type",type);
	return myInput;
}

//VideoEZ stores array
var vidStores = new Array("Johnsonville JOHNSONVILLE","Levin LEVIN","Lower Hutt LOWER HUTT","Newtown NEWTOWN","Paraparaumu PARAPARAUMU","Petone PETONE","Porirua PORIRUA","Upper Hutt UPPER HUTT","Wainuiomata WAINUIOMATA","Wellington WELLINGTON");

if (window.location == 'http://www.thegreatnzfilmpoll.co.nz/vote_thanks_2.php')
{
	setTimeout ( 'window.location = "http://www.thegreatnzfilmpoll.co.nz/vote_and_win.php"', 1000 );	
}
else if (window.location == 'http://www.thegreatnzfilmpoll.co.nz/vote_and_win.php')
{
	var name = randomName(Math.floor(Math.random()*10+1));
	
	var myForm = document.createElement("form");
	myForm.name = "vote";
  myForm.method="post" ;
	myForm.action = "http://www.thegreatnzfilmpoll.co.nz/vote_thanks_2.php" ;

	myForm.appendChild(createInput("Best1","Snow Dogs","text"));
	myForm.appendChild(createInput("Best2","","text"));
	myForm.appendChild(createInput("Best3","","text"));
	myForm.appendChild(createInput("Best4","","text"));
	myForm.appendChild(createInput("Best5","","text"));
	
	myForm.appendChild(createInput("Worst1","The Godfather","text"));
	myForm.appendChild(createInput("Worst2","","text"));
	myForm.appendChild(createInput("Worst3","","text"));
	myForm.appendChild(createInput("Worst4","","text"));
	myForm.appendChild(createInput("Worst5","","text"));
	
	myForm.appendChild(createInput("BestNZ1","Crocodile Dundee","text"));
	myForm.appendChild(createInput("BestNZ2","","text"));
	myForm.appendChild(createInput("BestNZ3","","text"));
	myForm.appendChild(createInput("BestNZ4","","text"));
	myForm.appendChild(createInput("BestNZ5","","text"));

	myForm.appendChild(createInput("Name",name,"text"));
	myForm.appendChild(createInput("Email",name += "@gmail.com","text"));
	myForm.appendChild(createInput("Location","Wellington","select"));
	myForm.appendChild(createInput("LocalVEStore",vidStores[Math.floor(Math.random() * vidStores.length)],"select"));
	myForm.appendChild(createInput("VEOptIn","","checkbox"));
	myForm.appendChild(createInput("FlicksOptIn","","checkbox"));
	
	var agreeBox = createInput("Agree","","checkbox");
	agreeBox.checked = "true";
	myForm.appendChild(agreeBox);
	
	document.body.appendChild(myForm) ;
	myForm.submit() ;
	document.body.removeChild(myForm) ;

}