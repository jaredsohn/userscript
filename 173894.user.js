// ==UserScript==
// @name        Fox Sports College Football Team List
// @namespace   http://msn.foxsports.com
// @description Add a list of links to other FBS team pages
// @include     http://msn.foxsports.com/collegefootball/team/*
// @include     https://msn.foxsports.com/collegefootball/team/*
// @version     1.2
// ==/UserScript==
// Initiate custom CSS function




var teamList = ["Air Force","Akron","Alabama","Arizona","Arizona State","Arkansas","Arkansas State",
	"Army","Auburn","BYU","Ball State","Baylor","Boise State","Boston College","Bowling Green","Buffalo",
	"California","Central Michigan","Cincinnati","Clemson","Colorado","Colorado State","Connecticut","Duke",
	"East Carolina","Eastern Michigan","Florida","Florida Atlantic","Florida International","Florida State",
	"Fresno State","Georgia","Georgia Tech","Hawai'i","Houston","Idaho","Illinois","Indiana",
	"Iowa","Iowa State","Kansas","Kansas State","Kent State","Kentucky","LSU","Louisiana Tech",
	"Louisiana-Lafayette","Louisiana-Monroe","Louisville","Marshall","Maryland","Massachusetts","Memphis",
	"Miami (Florida)","Miami (Ohio)","Michigan","Michigan State","Middle Tennessee","Minnesota","Mississippi",
	"Mississippi State","Missouri","Navy","Nebraska","Nevada","New Mexico","New Mexico State","North Carolina",
	"North Carolina State","North Texas","Northern Illinois","Northwestern","Notre Dame","Ohio","Ohio State",
	"Oklahoma","Oklahoma State","Oregon","Oregon State","Penn State","Pittsburgh","Purdue","Rice","Rutgers","SMU",
	"San Diego State","San Jose State","South Alabama","South Carolina","South Florida","Southern Mississippi",
	"Stanford","Syracuse","TCU","Temple","Tennessee","Texas","Texas A&M","Texas State","Texas Tech","Toledo","Troy",
	"Tulane","Tulsa","UAB","UCF","UCLA","UNLV","USC","UTEP","UTSA","Utah","Utah State","Vanderbilt","Virginia",
	"Virginia Tech","Wake Forest","Washington","Washington State","West Virginia","Western Kentucky",
	"Western Michigan","Wisconsin","Wyoming"];
teamList.reverse();
var teamPages = [
"http://msn.foxsports.com/collegefootball/team/air-force-falcons-football/86148",
"http://msn.foxsports.com/collegefootball/team/akron-zips-football/86084",
"http://msn.foxsports.com/collegefootball/team/alabama-crimson-tide-football/86100",
"http://msn.foxsports.com/collegefootball/team/arizona-wildcats-football/86087",
"http://msn.foxsports.com/collegefootball/team/arizona-state-sun-devils-football/86088",
"http://msn.foxsports.com/collegefootball/team/arkansas-razorbacks-football/86105",
"http://msn.foxsports.com/collegefootball/team/arkansas-state-red-wolves-football/86071",
"http://msn.foxsports.com/collegefootball/team/army-black-knights-football/86143",
"http://msn.foxsports.com/collegefootball/team/auburn-tigers-football/86104",
"http://msn.foxsports.com/collegefootball/team/brigham-young-cougars-football/86152",
"http://msn.foxsports.com/collegefootball/team/ball-state-cardinals-football/86083",
"http://msn.foxsports.com/collegefootball/team/baylor-bears-football/86127",
"http://msn.foxsports.com/collegefootball/team/boise-state-broncos-football/86069",
"http://msn.foxsports.com/collegefootball/team/boston-college-eagles-football/86049",
"http://msn.foxsports.com/collegefootball/team/bowling-green-falcons-football/86082",
"http://msn.foxsports.com/collegefootball/team/buffalo-bulls-football/86080",
"http://msn.foxsports.com/collegefootball/team/california-golden-bears-football/86089",
"http://msn.foxsports.com/collegefootball/team/central-michigan-chippewas-football/86075",
"http://msn.foxsports.com/collegefootball/team/cincinnati-bearcats-football/86142",
"http://msn.foxsports.com/collegefootball/team/clemson-tigers-football/86040",
"http://msn.foxsports.com/collegefootball/team/colorado-buffaloes-football/86137",
"http://msn.foxsports.com/collegefootball/team/colorado-state-rams-football/86155",
"http://msn.foxsports.com/collegefootball/team/connecticut-huskies-football/86122",
"http://msn.foxsports.com/collegefootball/team/duke-blue-devils-football/86041",
"http://msn.foxsports.com/collegefootball/team/east-carolina-pirates-football/86141",
"http://msn.foxsports.com/collegefootball/team/eastern-michigan-eagles-football/86076",
"http://msn.foxsports.com/collegefootball/team/florida-gators-football/86097",
"http://msn.foxsports.com/collegefootball/team/florida-atlantic-owls-football/2570",
"http://msn.foxsports.com/collegefootball/team/florida-international-golden-panthers-football/86327",
"http://msn.foxsports.com/collegefootball/team/florida-state-seminoles-football/86043",
"http://msn.foxsports.com/collegefootball/team/fresno-state-bulldogs-football/86115",
"http://msn.foxsports.com/collegefootball/team/georgia-bulldogs-football/86108",
"http://msn.foxsports.com/collegefootball/team/georgia-tech-yellow-jackets-football/86042",
"http://msn.foxsports.com/collegefootball/team/hawaii-warriors-football/86113",
"http://msn.foxsports.com/collegefootball/team/houston-cougars-football/86144",
"http://msn.foxsports.com/collegefootball/team/idaho-vandals-football/86072",
"http://msn.foxsports.com/collegefootball/team/illinois-fighting-illini-football/86057",
"http://msn.foxsports.com/collegefootball/team/indiana-hoosiers-football/86067",
"http://msn.foxsports.com/collegefootball/team/iowa-hawkeyes-football/86058",
"http://msn.foxsports.com/collegefootball/team/iowa-state-cyclones-football/86136",
"http://msn.foxsports.com/collegefootball/team/kansas-jayhawks-football/86135",
"http://msn.foxsports.com/collegefootball/team/kansas-state-wildcats-football/86134",
"http://msn.foxsports.com/collegefootball/team/kent-state-golden-flashes-football/86086",
"http://msn.foxsports.com/collegefootball/team/kentucky-wildcats-football/86098",
"http://msn.foxsports.com/collegefootball/team/lsu-tigers-football/86103",
"http://msn.foxsports.com/collegefootball/team/louisiana-tech-bulldogs-football/86125",
"http://msn.foxsports.com/collegefootball/team/louisiana-lafayette-ragin%27-cajuns-football/86121",
"http://msn.foxsports.com/collegefootball/team/louisiana-monroe-warhawks-football/86120",
"http://msn.foxsports.com/collegefootball/team/louisville-cardinals-football/86145",
"http://msn.foxsports.com/collegefootball/team/marshall-thundering-herd-football/86074",
"http://msn.foxsports.com/collegefootball/team/maryland-terrapins-football/86048",
"http://msn.foxsports.com/collegefootball/team/massachusetts-minutemen-football/1376032",
"http://msn.foxsports.com/collegefootball/team/memphis-tigers-football/86147",
"http://msn.foxsports.com/collegefootball/team/miami-(fl)-hurricanes-football/86056",
"http://msn.foxsports.com/collegefootball/team/miami-(oh)-redhawks-football/86077",
"http://msn.foxsports.com/collegefootball/team/michigan-wolverines-football/86059",
"http://msn.foxsports.com/collegefootball/team/michigan-state-spartans-football/86066",
"http://msn.foxsports.com/collegefootball/team/middle-tennessee-state-blue-raiders-football/86118",
"http://msn.foxsports.com/collegefootball/team/minnesota-golden-gophers-football/86060",
"http://msn.foxsports.com/collegefootball/team/mississippi-rebels-football/86102",
"http://msn.foxsports.com/collegefootball/team/mississippi-state-bulldogs-football/86101",
"http://msn.foxsports.com/collegefootball/team/missouri-tigers-football/86133",
"http://msn.foxsports.com/collegefootball/team/navy-midshipmen-football/86119",
"http://msn.foxsports.com/collegefootball/team/nebraska-cornhuskers-football/86132",
"http://msn.foxsports.com/collegefootball/team/nevada-wolf-pack-football/86117",
"http://msn.foxsports.com/collegefootball/team/new-mexico-lobos-football/86153",
"http://msn.foxsports.com/collegefootball/team/new-mexico-state-aggies-football/86070",
"http://msn.foxsports.com/collegefootball/team/north-carolina-tar-heels-football/86047",
"http://msn.foxsports.com/collegefootball/team/north-carolina-state-wolfpack-football/86044",
"http://msn.foxsports.com/collegefootball/team/north-texas-mean-green-football/86068",
"http://msn.foxsports.com/collegefootball/team/northern-illinois-huskies-football/86081",
"http://msn.foxsports.com/collegefootball/team/northwestern-wildcats-football/86065",
"http://msn.foxsports.com/collegefootball/team/notre-dame-fighting-irish-football/86126",
"http://msn.foxsports.com/collegefootball/team/ohio-bobcats-football/86085",
"http://msn.foxsports.com/collegefootball/team/ohio-state-buckeyes-football/86061",
"http://msn.foxsports.com/collegefootball/team/oklahoma-sooners-football/86131",
"http://msn.foxsports.com/collegefootball/team/oklahoma-state-cowboys-football/86130",
"http://msn.foxsports.com/collegefootball/team/oregon-ducks-football/86096",
"http://msn.foxsports.com/collegefootball/team/oregon-state-beavers-football/86090",
"http://msn.foxsports.com/collegefootball/team/penn-state-nittany-lions-football/86064",
"http://msn.foxsports.com/collegefootball/team/pittsburgh-panthers-football/86050",
"http://msn.foxsports.com/collegefootball/team/purdue-boilermakers-football/86062",
"http://msn.foxsports.com/collegefootball/team/rice-owls-football/86110",
"http://msn.foxsports.com/collegefootball/team/rutgers-scarlet-knights-football/86051",
"http://msn.foxsports.com/collegefootball/team/southern-methodist-mustangs-football/86112",
"http://msn.foxsports.com/collegefootball/team/san-diego-state-aztecs-football/86154",
"http://msn.foxsports.com/collegefootball/team/san-jose-state-spartans-football/86116",
"http://msn.foxsports.com/collegefootball/team/south-alabama-jaguars-football/1376035",
"http://msn.foxsports.com/collegefootball/team/south-carolina-gamecocks-football/86107",
"http://msn.foxsports.com/collegefootball/team/south-florida-bulls-football/103087",
"http://msn.foxsports.com/collegefootball/team/southern-mississippi-golden-eagles-football/86139",
"http://msn.foxsports.com/collegefootball/team/stanford-cardinal-football/86091",
"http://msn.foxsports.com/collegefootball/team/syracuse-orange-football/86055",
"http://msn.foxsports.com/collegefootball/team/texas-christian-horned-frogs-football/86111",
"http://msn.foxsports.com/collegefootball/team/temple-owls-football/86052",
"http://msn.foxsports.com/collegefootball/team/tennessee-volunteers-football/86099",
"http://msn.foxsports.com/collegefootball/team/texas-longhorns-football/86138",
"http://msn.foxsports.com/collegefootball/team/texas-a&m-aggies-football/86129",
"http://msn.foxsports.com/collegefootball/team/texas-state-bobcats-football/1376033",
"http://msn.foxsports.com/collegefootball/team/texas-tech-red-raiders-football/86128",
"http://msn.foxsports.com/collegefootball/team/toledo-rockets-football/86078",
"http://msn.foxsports.com/collegefootball/team/troy-trojans-football/2098",
"http://msn.foxsports.com/collegefootball/team/tulane-green-wave-football/86140",
"http://msn.foxsports.com/collegefootball/team/tulsa-golden-hurricane-football/86109",
"http://msn.foxsports.com/collegefootball/team/uab-blazers-football/86146",
"http://msn.foxsports.com/collegefootball/team/central-florida-knights-football/86123",
"http://msn.foxsports.com/collegefootball/team/ucla-bruins-football/86094",
"http://msn.foxsports.com/collegefootball/team/unlv-rebels-football/86151",
"http://msn.foxsports.com/collegefootball/team/usc-trojans-football/86095",
"http://msn.foxsports.com/collegefootball/team/utep-miners-football/86114",
"http://msn.foxsports.com/collegefootball/team/texas-san-antonio-roadrunners-football/1376034",
"http://msn.foxsports.com/collegefootball/team/utah-utes-football/86150",
"http://msn.foxsports.com/collegefootball/team/utah-state-aggies-football/86073",
"http://msn.foxsports.com/collegefootball/team/vanderbilt-commodores-football/86106",
"http://msn.foxsports.com/collegefootball/team/virginia-cavaliers-football/86046",
"http://msn.foxsports.com/collegefootball/team/virginia-tech-hokies-football/86054",
"http://msn.foxsports.com/collegefootball/team/wake-forest-demon-deacons-football/86045",
"http://msn.foxsports.com/collegefootball/team/washington-huskies-football/86092",
"http://msn.foxsports.com/collegefootball/team/washington-state-cougars-football/86093",
"http://msn.foxsports.com/collegefootball/team/west-virginia-mountaineers-football/86053",
"http://msn.foxsports.com/collegefootball/team/western-kentucky-hilltoppers-football/2609",
"http://msn.foxsports.com/collegefootball/team/western-michigan-broncos-football/86079",
"http://msn.foxsports.com/collegefootball/team/wisconsin-badgers-football/86063",
"http://msn.foxsports.com/collegefootball/team/wyoming-cowboys-football/86149"
];
teamPages.reverse();
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
var counterFox = 0;

for (var team in teamList){
	for (var website in teamPages){			
		var elmNewContent = document.createElement('a');
	    elmNewContent.href = teamPages[counterFox];
		elmNewContent.appendChild(document.createElement("br"));
	    elmNewContent.appendChild(document.createTextNode(teamList[counterFox]));
		}
	    var elmFoo = document.getElementById('teamCenter');
	    elmFoo.parentNode.insertBefore(elmNewContent, elmFoo.nextSibling);
		counterFox++}

	
	
