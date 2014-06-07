// ==UserScript==
// @name           rtsports Fantasy Football Rookies
// @namespace   none
// @description    das Script markiert bekannte Rookies in den Spielerlisten auf Real Time Sports
// @include        http://blue.rtsports.com/cgi-bin/display_team_rosters*
// @include        http://blue.rtsports.com/cgi-bin/modify_roster*
// @include        http://blue.rtsports.com/cgi-bin/display_rosters*
// @include        http://blue.rtsports.com/cgi-bin/waiver_wire_wish_list*
// @include        http://blue.rtsports.com/cgi-bin/display_transactions*
// @include        http://blue.rtsports.com/cgi-bin/display_top_players*
// @include        http://blue.rtsports.com/cgi-bin/welcome_page*
// @copyright 	   2013, gemgon
// @version        3.2

// ==/UserScript==


var myurl=document.URL;

// i: variable zum Ansteuern der Spieler-Tabelle
if (myurl.match(/display_team_rosters*/))  {
var i = 4
var sub = 3
}

if (myurl.match(/modify_roster*/))  {
var i = 4
var sub = 0
}

var vets = new Array('Charles Johnson');
var rookies2012 = new Array('Vontaze Burfict','William Powell','Brandon Bolden','T Y Hilton','Rod Streater','Justin Tucker','Josh Gordon','Dale Moss','Chris Polk','Andrew Luck','Robert Griffin','Trent Richardson','Justin Blackmon','Morris Claiborne','Mark Barron','Ryan Tannehill','Luke Kuechly','Stephon Gilmore','Dontari Poe','Fletcher Cox','Michael Floyd','Michael Brockers','Bruce Irvin','Quinton Coples','Dre Kirkpatrick','Melvin Ingram','Shea McClellin','Kendall Wright','Chandler Jones','Brandon Weeden','Dont\'a Hightower','Whitney Mercilus','Nick Perry','Harrison Smith','A.J. Jenkins','Doug Martin','David Wilson','Brian Quick','Coby Fleener','Courtney Upshaw','Derek Wolfe','Andre Branch','Janoris Jenkins','Stephen Hill','Alshon Jeffery','Mychal Kendricks','Bobby Wagner','Tavon Wilson','Kendall Reyes','Isaiah Pead','Jerel Worthy','Zach Brown','Devon Still','Ryan Broyles','Brock Osweiler','Lavonte David','Vinny Curry','LaMichael James','Casey Hayward','Rueben Randle','Dwayne Allen','Trumaine Johnson','Josh Robinson','Ronnie Hillman','DeVier Posey','T.J. Graham','Bryan Anger','Oliver Vernon','Brandon Taylor','Russell Wilson','Demario Davis','Michael Egnew','Brandon Hardin','Jamell Fleming','Tyrone Crawford','Mike Martin','Mohamed Sanu','Bernard Pierce','Dwight Bentley','Sean Spence','John Hughes','Nick Foles','Akiem Hicks','Jake Bequette','Ty Hilton','Brandon Thompson','Jayron Hosley','Chris Givens','Lamar Miller','Travis Benjamin','Omar Bolden','Kirk Cousins','Frank Alexander','Joe Adams','Nigel Bradham','Robert Turbin','Devon Wylie','Alameda Ta\'amu','Ladarius Green','Evan Rodriguez','Kyle Wilber','Jaye Howard','Coty Sensabaugh','Orson Charles','Jarius Wright','Keenan Robinson','James-Michael Johnson','Keshawn Martin','Nick Toon','Brandon Boykin','Ron Brooks','Ronnell Lewis','Jared Crick','Adrien Robinson','Rhett Ellison','Miles Burris','Christian Thompson','Mike Daniels','Jerron McMillian','Greg Childs','Matt Johnson','Josh Chapman','Malik Jackson','Tahir Whitehead','Robert Blanton','Najee Goode','Josh Norman','Taylor Thompson','DeQuan Menzie','Tank Carder','Chris Greenwood','Danny Coale','Korey Toomer','Josh Kaddu','Shaun Prater','Bradie Ewing','Jack Crawford','Chris Rainey','Randy Bullock','Corey White','Terrell Manning','Jonathan Massaquoi','Darius Fleming','Marvin Jones','George Iloka','Juron Criner','Asa Jackson','Vick Ballard','Greg Zuerlein','Jeremy Lane','Alfred Morris','Keith Tandy','Blair Walsh','Mike Harris','Justin Bethel','Trent Robinson','Guy Winston','Cyrus Gray','B.J. Cunningham','Isaiah Frey','Ryan Lindley','James Hanna','Josh Bush','Danny Trevathan','Christo Bilukidi','Markelle Martin','Dan Herron','Charles Mitchell','Marvin McNutt','Jonte Green','Nate Ebner','Tommy Streeter','Terrance Ganaway','Emmanuel Acho','Billy Winn','LaVon Brazill','Brad Nortman','Aaron Brown','Audie Cole','Scott Solomon','Michael Smith','Richard Crawford','Tim Fugger','Kheeston Randall','D.J. Campbell','Jordan Bernstine','Jerome Long','Trevor Guyton','Greg McCoy','Caleb McSurdy','Travis Lewis','Alfonzo Dennard','JR Sweezy','Rishard Matthews','Jeris Pendleton','Bryce Brown','Nathan Stupar','Toney Clemons','Greg Scruggs','Drake Dunsmore','Jeremy Ebert','Deangelo Tyson','Cam Johnson','Junior Hemingway','Markus Kuhn','David Paulson','Antonio Allen','B.J. Coleman','Jordan White','Trevin Wade','Terrence Frederick','Brad Smelley','Travian Robertson','Edwin Baker','John Potter','Daryl Richardson','Chandler Harnish');

var rookies = new Array('Paul Worrilow','Benny Cunningham','Timothy Wright','Havard Rugland','Oday Aboushi','Robert Alford','Keenan Allen','Kiko Alonso','David Amerson','Ezekiel Ansah','Marc Anthony','Terron Armstead','Tavon Austin','Johnny Adams','Ryan Allen','Zach Allen','C.J. Anderson','Ryan Aplin','Ray Ray Armstrong','Jeff Baca','Stedman Bailey','David Bakhtiari','Montee Ball','Johnthan Banks','Matt Barkley','Kenjon Barner','Sam Barrington','David Bass','Steve Beauharnais','Le\'Veon Bell','Giovani Bernard','Tommy Bohanon','Travis Bond','Alan Bonner','Jon Bostic','Michael Bowie','Josh Boyce','Josh Boyd','John Boyett','Arthur Brown','Justin Brown','Armonty Bryant','Michael Buchanan','Rex Burkhead','Brice Butler','Carter Bykowski','Alvin Bailey','Chris Barker','T.J. Barnes','Nick Becton','Mario Benavides','Emory Blake','Zach Boren','A.J. Bouye','Tyler Bray','Dylan Breeding','Sam Brenner','Corey Broomfield','Braden Brown','Marlon Brown','Matt Brown','Terrence Brown','Dan Buckner','Chad Bumphis','Adrian Bushell','William Campbell','Cornellius Carradine','Mike Catapano','Jamie Collins','Sanders Commings','Jonathan Cooper','Marcus Cooper','Michael Cox','Justice Cunningham','John Cyprien','Kenny Cain','Colby Cameron','Anthony Cantele','Joe Caprioglio','Alex Carder','Braxston Cave','DeVonte Christopher','Nick Clancy','Michael Clay','Emmett Cleary','Jasper Collins','Will Compton','Dan Conroy','Ben Cotton','Bobby Cowan','Jordan Cowart','Marcus Cromartie','Izaan Cross','B.J. Daniels','Knile Davis','Will Davis','Everett Dawkins','Quinton Dial','Aaron Dobson','Kevin Dorsey','Zac Dysert','Cody Davis','Keenan Davis','Marcus Davis','Alex Debniak','Kenny Demens','Jordan Devey','R.J. Dill','Jack Doyle','Alex Dunnachie','Reggie Dunn','Josh Dworaczyk','Lavar Edwards','Tyler Eifert','Matt Elam','Andre Ellington','Zach Ertz','Gavin Escobar','Josh Evans','Kip Edwards','Mike Edwards','Eric Fisher','Sharrif Floyd','D.J. Fluker','Reid Fragel','Johnathan Franklin','Travis Frederick','Corey Fuller','Chris Faulk','Joseph Fauria','James Ferentz','Manase Foketi','Blaize Foltz','Michael Ford','Glenn Foster','Dalton Freeman','Drew Frey','Matt Furstenburg','William Gholston','Garrett Gilkey','Mike Gillislee','Mike Glennon','Zaviar Gooden','Malliciah Goodman','Marquise Goodwin','Chris Gragg','Dwayne Gratz','Khaseem Greene','Ryan Griffin','Rogers Gaines','Kwame Geathers','Tyrone Goard','Theo Goins','Mike Golic','Ray Graham','MarQueis Gray','Ryan Griffin','Cory Grissom','Cobi Hamilton','Johnathan Hankins','Duron Harmon','Chris Harper','Jeremy Harris','Tanner Hawkinson','Terry Hawthorne','D.J. Hayden','Brandon Hepburn','Eric Herman','Jordan Hill','Gerald Hodges','DeVonte Holloman','Khaled Holmes','DeAndre Hopkins','Dustin Hopkins','Montori Hughes','Justin Hunter','Margus Hunt','Micah Hyde','Rashard Hall','Braden Hansen','D.J. Harper','Demetrius Harris','Montel Harris','Mark Harrison','Demetrius Hartsfield','Caylin Hauptmann','Aaron Hester','Alonzo Highsmith','Erik Highsmith','David Hinds','Wes Horton','Travis Howard','Josh Hubner','Alex Hurst','Demontre Hurst','Kemal Ishmael','Luke Ingram','Mike James','Jawan Jamison','D.C. Jefferson','Brandon Jenkins','Jelani Jenkins','John Jenkins','Ryan Jensen','Luke Joeckel','Charles Johnson','Lane Johnson','Nico Johnson','Rufus Johnson','T.J. Johnson','Barrett Jones','Chris Jones','Datone Jones','Don Jones','Jarvis Jones','Landry Jones','Dion Jordan','Kyle Juszczyk','Mark Jackson','Marquis Jackson','Josh Jarboe','Stefphon Jefferson','Tony Jefferson','Jamaal Johnson-Webb','Darius Johnson','Dennis Johnson','Josh Johnson','Keelan Johnson','Orhian Johnson','Oscar Johnson','Travis Johnson','Abry Jones','DeQuinta Jones','Nick Kasa','Travis Kelce','David King','Tavarres King','A.J. Klein','Joe Kruger','Edmund Kugbila','Eric Kush','Brandon Kaufman','Uona Kaveinga','Colin Kelly','La\'Rod King','Collin Klein','Josh Kline','Jake Knott','Jordan Kovacs','Scott Kovanda','Eddie Lacy','Marcus Lattimore','Corey Lemonier','Kapron Lewis-Moore','Jeff Locke','Bennie Logan','Kyle Long','Star Lotulelei','Ryan Lacy','Cameron Lawrence','Kendial Lawrence','Javone Lawson','Alec Lemon','Robert Lester','Zach Line','P.J. Lonergan','Travis Long','John Lotulelei','Philip Lutzenkirchen','EJ Manuel','Stansly Maponga','Sam Martin','Tyrann Mathieu','Michael Mauti','Demetrius McCray','T.J. McDonald','Vance McDonald','Leon McFadden','Brandon McGee','Stacy McGee','Steven Means','Jonathan Meeks','Aaron Mellette','Christine Michael','Dee Milliner','Jordan Mills','Barkevious Mingo','Kevin Minter','Sam Montgomery','Nick Moody','Damontre Moore','Sio Moore','Zeke Motta','Latavius Murray','Brad Madison','Joe Madsen','Lamar Mady','Brandon Magee','Brett Maher','Nigel Malone','Luke Marquardt','Cameron Marshall','Eric Martin','Miguel Maysonet','Onterio McCalebb','Anthony McCloud','Lerentee McCray','Chris McDonald','Bradley McDougald','Jamarkus McFarland','Sam McGuffie','Rashaan Melvin','Cameron Meredith','Jamal Miles','Rontez Miles','Stephane Milhim','T.J. Moe','Brandon Moore','Martel Moore','Stephon Morris','Ryan Nassib','Xavier Nixon','Uzoma Nwachukwu','Alec Ogletree','Alex Okafor','Dann O\'Neill','Lawrence Okoye','Patrick Omameh','Ryan Otten','Vinston Painter','Nate Palmer','Cordarrelle Patterson','Quinton Patton','Sean Porter','Ty Powell','Jordan Poyer','Justin Pugh','Kyle Padron','Chris Pantale','Gilbert Pena','Graham Pocic','Ray Polk','Keith Pough','Sheldon Price','Lonnie Pryor','David Quessenberry','Bacarri Rambo','Joseph Randle','Jordan Reed','Eric Reid','Sean Renfree','Xavier Rhodes','Sheldon Richardson','Theo Riddick','Mychal Rivera','Denard Robinson','Logan Ryan','Zachary Ramirez','Kevin Reddick','Kyler Reed','Greg Reid','Adam Replogle','Jackson Rice','Kejuan Riley','Nickell Robey','Jordan Rodgers','Da\'Rick Rogers','Zach Rogers','Craig Roh','Roy Roundtree','Robbie Rouse','Brent Russell','Ace Sanders','Brian Schwenke','Ryan Seymour','Kawann Short','John Simon','Tharold Simon','Dion Sims','Jamoris Slaughter','Darius Slay','Geno Smith','Jared Smith','Quanterus Smith','Brad Sorensen','Akeem Spence','Zac Stacy','Daimion Stafford','Kenny Stills','Caleb Sturgis','D.J. Swearinger','Ryan Swope','Etienne Sabino','Marcus Sales','Lanear Sampson','Matt Scott','Darrington Sentimore','Quinn Sharp','Russell Sheppard','Rodney Smith','Iso Sofele','Ryan Spadola','Damion Square','Matt Stankiewitch','Jawanza Starling','Baker Steinkuhler','Phillip Steward','Walter Stewart','Jake Stoneburner','Troy Stoudermire','Zach Sudfeld','John Sullen','Matt Summers-Gavin','Daxton Swanson','Rod Sweeting','Cooper Taylor','Devin Taylor','Jamar Taylor','Stepfan Taylor','Manti Te\'o','Dallas Thomas','Phillip Thomas','Shamarko Thomas','Chris Thompson','Hugh Thornton','Levine Toilolo','J.C. Tretter','Desmond Trufant','Kenny Tate','Bruce Taylor','Mike Taylor','Chase Thomas','Kenbrell Thompkins','Carson Tinker','Aaron Tipoti','Matthew Tucker','Jeff Tuel','Taimi Tutogi','Omoregie Uzzi','Kenny Vaccaro','James Vandenberg','Conner Vernon','Ricky Wagner','Spencer Ware','Larry Warford','Chance Warmack','Cornelius Washington','Earl Watford','Menelik Watson','B.W. Webb','Kayvon Webster','Bjoern Werner','Markus Wheaton','J.J. Wilcox','Brandon Williams','Brennan Williams','Duke Williams','Jesse Williams','Kerwynn Williams','Michael Williams','Nick Williams','Shawn Williams','Steve Williams','Sylvester Williams','Terrance Williams','Tourek Williams','Trevardo Williams','Vince Williams','Luke Willson','Braden Wilson','Marquess Wilson','Tyler Wilson','Brian Winters','Earl Wolff','Robert Woods','Khalid Wooten','Blidi Wreh-Wilson','LaAdrian Waddle','Trabis Ward','Jason Weaver','John Wetzel','Anthony Rashad White','Melvin White','Mitchell White','Nate Williams','Ridge Wilson','Shaq Wilson','Trey Wilson','Brad Wing','George Winn','Cierre Wood','Tom Wort');


function suchen(arr, obj){
for (var k=0; k<arr.length; k++){
if (arr[k] == obj) return true;
}
}


var norookies = 0;
var novets = 0;

addon_form2013 =" <span style=\"color: orange\"> (Rookie)</span>";
//addon_form2012 =" <span style=\"color:#336600\"> (Rookie 2012)</span>";
addon_form2012 ="";
addon_formvet =" <span style=\"color:#FF0000\"> (evtl. Rookie)</span>";

if (myurl.match(/display_team_rosters*/) || myurl.match(/modify_roster*/))  {
var nolinks = document.getElementsByTagName("table")[i].getElementsByTagName("a"); 

for (var n = 0; n < nolinks.length; n++) {

				var player = nolinks[n];
				var playerName = player.innerHTML;
				var isrookie =  suchen(rookies, playerName);
				var isrookie2012 =  suchen(rookies2012, playerName);
				var isvet =  suchen(vets, playerName);
				
				if(isrookie2012 == true) {
				if(isvet == true) {
				player.innerHTML = player.innerHTML + addon_formvet;
				}
				else{
				player.innerHTML = player.innerHTML + addon_form2012;					
				}
				}
				if(isrookie == true) {
					if(isvet == true) {
					player.innerHTML = player.innerHTML + addon_formvet;
					novets= novets +1;
					}
					else{
					player.innerHTML = player.innerHTML + addon_form2013;
					norookies = norookies +1;
					}	
					
}

} // Linkschleife



// Ausgabe Anzahl und Warnhinweis

if (myurl.match(/display_team_rosters*/))  { 

if(novets>0){
var msg = " | Anzahl Rookies im Team: " + norookies + " sowie " + novets + " unbestimmte(r)"

} 
else{
var msg = " | Anzahl Rookies im Team: " + norookies 
}

if (norookies<5) {

if (novets>0)
{
alert ("eventuell zu wenige Rookies im Team: " + norookies + " sowie " + novets + " unbestimmte(r)")
}
else{
alert ("eventuell zu wenige Rookies im Team: " + norookies)
}

}


var targetOwner=document.getElementsByTagName("table")[i-2].getElementsByTagName("tr")[0].getElementsByTagName("td")[0];
targetOwner.innerHTML = targetOwner.innerHTML + msg;

}

} // if display_team_rosters OR modify_roster
else if(myurl.match(/waiver_wire_wish_list*/i)){ // waiver wire

var nohdreis = document.getElementsByTagName("h3");

for (var i=0; i<nohdreis.length; i++){
var targethdrei=nohdreis[i];
var playerName=targethdrei.innerHTML.split(",")[0]
var isrookie =  suchen(rookies, playerName);
if(isrookie == true){
targethdrei.innerHTML = targethdrei.innerHTML + addon_form2013;
}
}

var nobs = document.getElementsByTagName("b");

for (var i=0; i<nobs.length; i++){
var targetb=nobs[i];
var playerName=targetb.innerHTML;
var isrookie =  suchen(rookies, playerName);
if(isrookie == true){
targetb.innerHTML = targetb.innerHTML + addon_form2013;
}
}


} // end if waiver wire

else if(myurl.match(/welcome_page*/)){ // startseite

for (var j=31; j<33; j++){

if(j==31){k=2;}
if(j==32){k=1;}
var rows = document.getElementsByTagName("table")[j].getElementsByTagName("tr");

for (var i=k; i<rows.length; i++){

var targettr=rows[i];
var player=targettr.getElementsByTagName("A")[0];
var playerName=player.innerHTML.split(" <img")[0];



var isrookie =  suchen(rookies, playerName);
var isrookie2012 =  suchen(rookies2012, playerName);
				var isvet =  suchen(vets, playerName);
				if(isrookie2012 == true) {
					if(isvet == true) {
					player.innerHTML = player.innerHTML + addon_formvet;
					}
					else{
					player.innerHTML = player.innerHTML + addon_form2012;					
					}
					}		

				if(isrookie == true) {
					if(isvet == true) {
					player.innerHTML = player.innerHTML + addon_formvet;
					novets= novets +1;
					}
					else{
					player.innerHTML = player.innerHTML + addon_form2013;
					norookies = norookies +1;
					}	
				}	
				



}
}


} // end if welcome_page


else{ // Uebersichtsseite aller Teams /Transactions /Top players

if (myurl.match(/display_rosters*/))  {
var tablestart = 6;
}
else if (myurl.match(/display_transactions*/)){
var tablestart = 4;

}
else if (myurl.match(/display_top_players*/)){
var tablestart = 4;
}

else{
}

var notables = document.getElementsByTagName("table"); 
if (myurl.match(/display_top_players*/)){
notables.length = 5;
}
	for (var m = tablestart; m < notables.length; m=m+3){ // Teamschleife
	
	norookies = 0;
	novets = 0;
	
		var nolinks = document.getElementsByTagName("table")[m].getElementsByTagName("a"); 

			for (var n = 0; n < nolinks.length; n++) {
				var player = nolinks[n];


			if (myurl.match(/display_top_players*/)){
				var myplayer = player.innerHTML;
				var surname= myplayer.split(" ")[1];
				var name = myplayer.split(" ")[0].split(",")[0];
				var playerName=surname + " " + name;
			}
			else{
			var playerName = player.innerHTML;
			}
				var isrookie =  suchen(rookies, playerName);
				var isrookie2012 =  suchen(rookies2012, playerName);
				var isvet =  suchen(vets, playerName);
				if(isrookie2012 == true) {
					if(isvet == true) {
					player.innerHTML = player.innerHTML + addon_formvet;
					}
					else{
					player.innerHTML = player.innerHTML + addon_form2012;					
					}
					}		

				if(isrookie == true) {
					if(isvet == true) {
					player.innerHTML = player.innerHTML + addon_formvet;
					novets= novets +1;
					}
					else{
					player.innerHTML = player.innerHTML + addon_form2013;
					norookies = norookies +1;
					}	
				}	
		}

// Ausgabe Anzahl und Warnhinweis

if (myurl.match(/display_rosters*/))  {
if(novets>0){
var msg = " | Anzahl Rookies im Team: " + norookies + " sowie " + novets + " unbestimmte(r)"
}
else{
var msg = " | Anzahl Rookies im Team: " + norookies 
}
var targetOwner=document.getElementsByTagName("table")[m-1].getElementsByTagName("tr")[0].getElementsByTagName("td")[0];
targetOwner.innerHTML = targetOwner.innerHTML + msg;
} // end display rosters


}


} // end else