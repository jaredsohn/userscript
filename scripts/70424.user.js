// ==UserScript==
// @name           Yahoo Account Creation
// @namespace      
// @description    Stuff
// @author         Brice
// @version        1.1
// @include        http://*.yahoo.com*
// @include        https://*.yahoo.com*
// ==/UserScript==

//*************CHANGE THESE VARIABLES********************
var password = "gbconfirm";
var emailTail = "@spankyspooks.com";
//*************CHANGE THESE VARIABLES********************

var companyArray = new Array
( '3M Company', 'a21', 'Aaron Rents', 'Abbott Laboratories', 'Abercrombie & Fitch', 'ABM Industries', 'ABX Air, Inc.', 'AC Lens', 'Accent Network', 'ACCO Brands', 'Ace Hardware', 'Acme Brick Company', 'Acme Markets', 'ACN Inc.', 'Activision Blizzard', 'Acuity Brands', 'ADC Telecommunications', 'Adobe Systems Inc.', 'Advance Auto Parts', 'Advanced Processing & Imaging', 'Aéropostale', 'AES', 'Aetna', 'Affiliated Computer Services', 'AFLAC', 'AGCO', 'Agilent Technologies', 'AGL Resources', 'Air Products & Chemicals', 'Airgas', 'AirTran Holdings', 'AK Steel Holding', 'Alaska Air Group', 'Albemarle', 'Albertsons', 'Alcoa', 'Aleris International', 'Alexander & Baldwin', 'Allegheny Energy', 'Allegheny Technologies', 'Allen Organ Company', 'Allergan', 'Alliant Energy', 'Alliant Techsystems', 'Allstate', 'Altria Group (formerly Philip Morris Companies)', 'Amazon.com', 'AMC Entertainment', 'AMD', 'Ameren', 'America Online', 'American Airlines', 'American Axle & Manufacturing', 'American Apparel', 'American Broadcasting Company', 'American Eagle Outfitters', 'American Electric Power', 'American Express', 'American Family Insurance Group', 'American Financial Group', 'American Greetings', 'American Hofmann', 'American Home Mortgage', 'American International Group', 'American Reprographics Company', 'AmeriCredit', 'Amerigroup', 'Ameriprise Financial', 'AmerisourceBergen', 'Ametek', 'Amgen', 'Amiga', 'Amkor Technology', 'Amphenol Corporation', 'AMR', 'Amtrak (National Railroad Passenger Corporation)', 'Amy\'s Kitchen', 'Anadarko Petroleum', 'Analog Devices', 'AnaSpec', 'Anchor Bay Entertainment', 'AND1', 'Anixter International', 'Ann Taylor', 'Aon', 'Aol Inc.', 'Aol Time Warner', 'Apache Software Foundation', 'Apollo Group', 'Applebee\'s', 'Apple Inc.', 'Applied Biosystems', 'Applied Industrial Technologies', 'Applied Materials', 'Aramark', 'Arbitron', 'Arch Coal', 'Archer Daniels Midland', 'Arctic Cat', 'Ariba', 'Armstrong World Industries', 'Arrow Electronics', 'Arryx', 'ArvinMeritor', 'ASARCO (American Smelting And Refining Company)', 'Asbury Automotive Group', 'Ashland, Inc.', 'AskMeNow', 'Aspyr Media Inc.', 'Assurant', 'Atmos Energy', 'AT&T', 'Atari', 'Autodesk', 'Autoliv', 'Automatic Data Processing', 'AutoNation', 'Auto-Owners Insurance', 'Autozone', 'Avaya', 'Avery Dennison', 'Avis Budget Group', 'Avnet', 'Avon Products', 'AVST', 'Babcock & Wilcox', 'Baker Hughes', 'Baldor Electric', 'Ball', 'Bank of America Corp.', 'Bank of New York Mellon Corp.', 'Barnes & Noble', 'Bath & Body Works', 'Baxter International', 'BB&T Corp.', 'BE Aerospace', 'Beaner\'s Gourmet Coffee', 'BearingPoint', 'Beazer Homes USA', 'Bechtel Corporation', 'Beckman Coulter', 'Becton Dickinson', 'Bed Bath & Beyond', 'Belden', 'Belk', 'Belkin', 'Bemis', 'Benchmark Electronics', 'W.R. Berkley', 'Berkshire Hathaway', 'Berry Plastics', 'Best Buy', 'Big Lots', 'Binney & Smith', 'Bio-Rad Laboratories', 'Biogen Idec', 'Biomet', 'Birdwell', 'BJ Services', 'BJ\'s Wholesale Club', 'Black & Decker', 'BlackRock', 'Blockbuster Video', 'BlueLinx Holdings', 'BMC Software', 'Bob Evans Farms', 'Boeing', 'Boise', 'Borders Group', 'BorgWarner', 'Bosch Brewing Company', 'Boston Scientific', 'Boyd Gaming', 'Bradley Pharmaceuticals', 'Briggs & Stratton', 'Brightpoint', 'Brinks', 'Brinker International', 'Bristol-Myers Squibb', 'Broadcom', 'Brookdale Senior Living', 'Brown-Forman', 'Brunswick Corporation', 'Bucyrus International', 'Burger King Holdings', 'Burlington Coat Factory', 'Burlington Northern Santa Fe', 'CA, Inc.', 'Calpine', 'Capital One', 'Cartoon Network Studios', 'Caterpillar Inc.', 'CBS Corporation', 'Cerner Corporation', 'C.H. Robinson Worldwide', 'Chem-Dry', 'Chevron', 'Chicago Bridge & Iron Company', 'Chrysler', 'CIGNA', 'Citigroup', 'Citrix', 'Cisco Systems, Inc.', 'CKE Restaurants', 'Clear Channel Communications', 'CNA', 'CNET', 'The Coca-Cola Company', 'Cognizant Technology Solutions', 'Colgate-Palmolive', 'Colt Defense', 'Colt\'s Manufacturing Company', 'Columbia Pictures', 'Comcast', 'Comodo', 'ConocoPhillips', 'Conseco', 'Continental Airlines', 'Control Data Corporation (CDC)', 'Convergys Corp.', 'Converse', 'Corning Incorporated', 'Costco', 'Coventry Health Care', 'Crazy Eddie', 'Crowley Maritime Corporation', 'CVS Pharmacy', 'Danaher', 'Darden Restaurants', 'DaVita', 'Dean Foods', 'Deere & Company', 'Del Monte Foods', 'Dell, Inc.', 'Delphi', 'Delta Air Lines', 'Dereon', 'Devon Energy', 'Dick\'s Sporting Goods', 'DiC Entertainment', 'Diebold', 'Digi-Key', 'Dillard\'s', 'DineEquity', 'DirecTV Group', 'Discovery Communications', 'DISH Network', 'The Walt Disney Company', 'Doculabs', 'Dole Foods', 'Dollar General', 'Dollar Tree', 'Dominion Resources', 'Domtar', 'Donaldson', 'R. H. Donnelley', 'R. R. Donnelley & Sons', 'Dover', 'The Dow Chemical Company', 'Dow Jones & Company', 'Dr Pepper Snapple Group', 'Dresser Inc.', 'DRS Technologies', 'DST Systems', 'DTE Energy', 'Duke Energy', 'Dun & Bradstreet', 'DuPont (E.I. du Pont de Nemours)', 'DynCorp International', 'Dynegy', 'Eastman Chemical Company', 'Eastman Kodak', 'eBay', 'Ecolab', 'El Paso Corp.', 'Electric Boat', 'Electronic Data Systems', 'Eli Lilly and Company', 'EMC Corporation', 'Emcor Group', 'Emerson Electric Company', 'Energy East', 'Entergy', 'Enterprise GP Holdings', 'Equifax', 'Erie Insurance Group', 'Estée Lauder Companies', 'Exelon Corporation', 'Expeditors International', 'Express Scripts Incorporated', 'ExxonMobil', 'FedEx', 'Fidelity Investments', 'FileMaker Inc., formerly Claris Corp.', 'Ford Motor Company', 'Forum Communications', 'Fox Film Corporation', 'FreeWave Technologies, Inc.', 'Frontier Airlines', 'Federal Home Loan Mortgage Corporation', 'Federal National Mortgage Association', 'Gap', 'Gartner', 'Gateway Computers', 'Gatorade', 'General Dynamics', 'General Electric', 'General Mills', 'General Motors', 'Gentiva Health Services', '[Georgetown Learning Centers]', 'Georgia Pacific', 'Giant Food', 'Global Insight', 'Go Daddy', 'Goldman Sachs', 'Goodyear Tire and Rubber Company', 'Google', 'H&R Block', 'Hallmark Cards', 'Halliburton', 'Hardee\'s', 'Harley-Davidson', 'Hasbro', 'Hastings Entertainment', 'Hawaiian Airlines', 'H-E-B', 'Hewlett-Packard', 'Hi-Point Firearms', 'Hilton Hotels Corporation', 'H. J. Heinz Company', 'Home City Ice Co.', 'Home Depot', 'Honeywell', 'Hot Topic', 'Hyland Software', 'Informix', 'Infor', 'Intel', 'International Business Machines (IBM)', 'International Game Technology (IGT)', 'International Paper', 'Interplay Entertainment', 'Interstate Batteries', 'Intuit', 'ION Media Networks', 'iRobot', 'i-flex Solutions', 'JetBlue Airways', 'JN-International Medical Corporation', 'Jones Soda Co.', 'Johnson & Johnson', 'Johnson Controls', 'Journal Communications', 'J. P. Morgan Chase and Co.', 'J. C. Penny', 'KBR', 'KFC', 'Kellogg Company', 'Kerr-McGee', 'Kimberly-Clark', 'Kmart', 'KPMG', 'Kraft Foods', 'Kroger', 'Kohler', 'Kurzweil Educational Systems', 'Laserfiche', 'LeapFrog Enterprises', 'The Liberty Corporation', 'Limited Brands', 'Liz Claiborne', 'Lowe\'s', 'Lumencraft', 'L.L.Bean', 'Local Matters', 'Lockheed Martin', 'Louisiana Pacific', 'Louis M. Gerson Company', 'Lucasfilm', 'Lucas Oil', 'Lingo Graphics', 'Lear Capital', 'Marathon Oil', 'Mars Incorporated', 'Marsh & McLennan', 'Marshall Pottery Inc.', 'Martha Stewart Living Omnimedia', 'Martin Marietta Materials', 'MasterCard', 'Mattel', 'McDonald\'s Corporation', 'MCI', 'Medimix International', 'Meijer', 'Merck and Company', 'Microsoft', 'Midway Games', 'Midwest Communications', 'Miller Brewing', 'Minnesota IMPLAN Group', 'Miro Technologies', 'Monsanto Company', 'Morgan Stanley', 'Motorola', 'Musco Lighting', 'Mutual of Omaha', 'Nabisco', 'Nationwide Insurance', 'NBC Universal', 'NCR Corporation', 'NetApp', 'Netcordia', 'NetZero', 'New Balance', 'New Era Tickets', 'News Corporation', 'Nike', 'Northrop Grumman', 'Northwest Airlines', 'Novell', 'Novellus Systems', 'Office Depot', 'Office Max', 'Oracle Corporation', 'PACCAR', 'Pacific Gas & Electric Company (PG&E)', 'PalmOne, Inc.', 'PalmSource, Inc.', 'Paramount Pictures', 'PepsiCo', 'Pinnacle Systems', 'Pizza Hut', 'Pfizer', 'Polaroid Corporation', 'Precision Castparts Corporation', 'Price Waterhouse Coopers', 'Principal Financial Group', 'Procter & Gamble', 'Publix', 'Qualcomm', 'Quantrix', 'Quest Software', 'Quincy Newspapers', 'Qwest', 'RadioShack', 'Raytheon', 'RCA', 'Red Hat', 'Red River Broadcasting', 'Regis Corporation', 'Respironics', 'Rockwell Automation', 'Rockwell Collins', 'Russell Investment Group', 'Russell Stovers', 'Safeco Corporation', 'Safeway Inc.', 'Salem Communications', 'SBC Communications', 'Science Applications International Corporation (SAIC)', 'Schuan Food Companies', 'Sears', 'Service Corporation International (SCI)', 'Sequoia Voting Systems', 'Six Flags', 'Silicon Graphics', 'SkyWest Airlines', 'Skype', 'Snap-on Tools', 'Softscape', 'Sony Pictures Entertainment', 'Southern California Edison', 'Southwest Airlines', 'Sprint Nextel Corporation', 'Spanx', 'Staples, Inc.', 'Starbucks', 'Starz', 'State Street Corporation', 'Steinway & Sons', 'Sterling Ledet & Associates, Inc.', 'Sterling Commerce', 'Stewart-Warner', 'STX', 'Subway', 'Sun Microsystems', 'Sunny Delight Beverages', 'Sunoco', 'Syntel', 'Target Corporation', 'Tesla Motors', 'Texas Instruments', 'Textron Inc.', 'Time Warner Cable', 'Topmedia Inc.', 'Towers Perrin', 'Trinity Industries Inc.', 'Ubu Productions', 'Union Oil Company of California (Unocal)', 'Union Pacific Railroad', 'Unisys', 'United Airlines', 'United Parcel Service', 'United Technologies', 'Universal Studios', 'US Airways', 'U.S. Robotics', 'UTStarcom', 'United Services Automobile Association', 'US Cellular', 'Valero Energy Corporation', 'The Vanguard Group', 'VIZ Media', 'Vizio', 'Vectren', 'Verizon', 'Verizon Wireless', 'Viacom', 'Visa Inc.', 'VMware', 'Vocera Communications', 'Washington Mutual', 'Walmart', 'Walgreens', 'Walt Disney Company', 'Warner Bros. Entertainment', 'The Weinstein Company', 'Welch\'s', 'Wells Fargo Bank, N.A.', 'Wendy\'s/Arby\'s Group', 'Westat', 'West Liberty Foods', 'Wizards of the Coast', 'Whole Foods Market', 'World Financial Group', 'World Wrestling Entertainment', 'Xerox', 'Xilinx', 'XPLANE', 'Yahoo!', 'YRC Worldwide Inc.', 'Yum! Brands, Inc.', 'Zapata', 'Zappos.com' );
var title1Array = new Array
( 'Lead',  'Senior',  'Direct',  'Corporate',  'Dynamic',  'Future',  'Product',  'National',  'Regional',  'District',  'Central',  'Global',  'Customer',  'Investor',  'Dynamic',  'International',  'Legacy',  'Forward',  'Internal',  'Human',  'Chief',  'Principal' ); 
var title2Array = new Array
( 'Solutions',  'Program',  'Brand',  'Security',  'Research',  'Marketing',  'Directives',  'Implementation',  'Integration',  'Functionality',  'Response',  'Paradigm',  'Tactics',  'Identity',  'Markets',  'Group',  'Division',  'Applications',  'Optimization',  'Operations',  'Infrastructure',  'Intranet',  'Communications',  'Web',  'Branding',  'Quality',  'Assurance',  'Mobility',  'Accounts',  'Data',  'Creative',  'Configuration',  'Accountability',  'Interactions',  'Factors',  'Usability',  'Metrics' ); 
var title3Array = new Array
('Supervisor',  'Associate',  'Executive',  'Liason',  'Officer',  'Manager',  'Engineer',  'Specialist',  'Director',  'Coordinator',  'Administrator',  'Architect',  'Analyst',  'Designer',  'Planner',  'Orchestrator',  'Technician',  'Developer',  'Producer',  'Consultant',  'Assistant',  'Facilitator',  'Agent',  'Representative',  'Strategist' ); 
var firstNameArray = new Array
( 'Donkeypunch', 'Ralph',  'Amelia',  'Andrew',  'Arthur',  'Audrey',  'Becky',  'Bernice',  'Blanche',  'Brian',  'Bridget',  'Bruce',  'Candace',  'Carla',  'Carole',  'Cassandra',  'Charlotte',  'Christopher',  'Claudia',  'Cynthia',  'Daniel',  'Dennis',  'Donald',  'Edna',  'Emily',  'Ethel',  'Eva',  'Flora',  'Fred',  'Gary',  'Glenn',  'Grace',  'Harold',  'Harry',  'Hattie',  'Hilda',  'Holly',  'Howard',  'Jack',  'Jacob',  'Jeff',  'Jeffrey',  'Jimmy',  'Joe',  'John',  'Joseph',  'Julie',  'Kathleen',  'Kenneth',  'Kimberly',  'Lawrence',  'Louis',  'Margarita',  'Marianne',  'Marie',  'Martin',  'Marvin',  'Megan',  'Michele',  'Myrtle',  'Nicholas',  'Opal',  'Patrick',  'Patty',  'Peter',  'Ralph',  'Raymond',  'Renee',  'Richard',  'Robert',  'Roberta',  'Rodney',  'Roger',  'Rohrer',  'Ronald',  'Russell',  'Ryan',  'Scott',  'Shelly',  'Stanley',  'Stephen',  'Steve',  'Tammy',  'Terry',  'Tony',  'Vickie',  'Vincent',  'Walter',  'Wilma' );
var lastNameArray = new Array 
( 'Vanwinkle', 'Alcantara', 'Alcaraz', 'Alleman', 'Angeles', 'Averill', 'Barnette', 'Barrington', 'Blakemore', 'Bradbury', 'Brewer', 'Brigham', 'Brooks', 'Burd', 'Cantwell', 'Carrasquillo', 'Carrol', 'Chester', 'Clay', 'Colin', 'Counts', 'Dansby', 'Delisle', 'Deltoro', 'Dobbins', 'Dodge', 'Doll', 'Donald', 'Dufrene', 'Eley', 'Enos', 'Ferrara', 'Gartner', 'Gordy', 'Graves', 'Grice', 'Haase', 'Hankins', 'Hartley', 'Heffner', 'Helmer', 'Hermosillo', 'Ingraham', 'Isaacson', 'Kempf', 'Lafferty', 'Lang', 'Larry', 'Lathan', 'Layman', 'Leake', 'Lear', 'Leyba', 'Leyva', 'Lipsey', 'Lowell', 'Lueck', 'Malek', 'Mansell', 'Marek', 'Marion', 'Mccomas', 'Mckay', 'Meador', 'Miramontes', 'Morin', 'Pankey', 'Pinder', 'Pippin', 'Plunkett', 'Porch', 'Proffitt', 'Quirk', 'Randolph', 'Reinhart', 'Reynolds', 'Rivas', 'Robledo', 'Ruggiero', 'Rumph', 'Ruppert', 'Sain', 'Shaffer', 'Shively', 'Sibley', 'Snowden', 'Spence', 'Sykes', 'Tincher', 'Trevino', 'Ulloa', 'Usher', 'Waddle', 'Washburn', 'Weiler', 'Winkle', 'Wise', 'Yamamoto', 'Youngman' );

button = document.createElement("input");
button.type = "button";
button.value = "Crunchetize me Captain!";

function fillPrimaryPage(){
		
		var sexVar=Math.floor(Math.random()*2)+1;
		var monthVar=Math.floor(Math.random()*12) + 1;
		var dayVar=Math.floor(Math.random()*28) + 1;
		var yearVar=Math.floor(Math.random()*44) + 1950;
		var firstRandom = Math.floor(Math.random()*firstNameArray.length);
		var firstRandom2 = Math.floor(Math.random()*firstNameArray.length);
		var firstnamegen = firstNameArray[firstRandom];
		var lastRandom = Math.floor(Math.random()*lastNameArray.length);
		var lastRandom2 = Math.floor(Math.random()*lastNameArray.length);
		var lastnamegen = lastNameArray[lastRandom];
		var email = firstnamegen+lastnamegen+dayVar+emailTail;
		var zipVar=Math.floor(Math.random()*89999) + 10000;
		var sq1Var=Math.floor(Math.random()*9) +1;
		var sq2Var=Math.floor(Math.random()*18) +1;
		
		
		
		document.getElementById("firstname").value = firstnamegen;
		document.getElementById("secondname").value = lastnamegen;
		if (sexVar == 1)
			document.getElementById("gender").value = "m";
		else
			document.getElementById("gender").value = "f";
		document.getElementById("mm").value = monthVar;
		document.getElementById("dd").value = dayVar;
		document.getElementById("yyyy").value = yearVar;
		document.getElementById("postalcode").value = zipVar;
		document.getElementById("yahooid").focus();
		var yahooId = prompt("Enter Yahoo ID", "sporks7384");
		document.getElementById("yahooid").value = yahooId;
		
		document.getElementById("password").value = password;
		document.getElementById("passwordconfirm").value = password;
		document.getElementById("altemail").value = email;
		
		document.getElementById("secquestion").value = "What is the first name of your favorite uncle?";
		document.getElementById("secquestionanswer").value = firstNameArray[firstRandom2];
		document.getElementById("secquestion2").value = "What was your first pet's name?";
		document.getElementById("secquestionanswer2").value = lastNameArray[lastRandom2];;
		
		
		document.getElementById("yidHelperBtn").click();
		document.getElementById("cword").focus();
		
		
		
		
		//document.getElementById("btn-submit").click();
}

function infoFill(){
	

	if (document.title == "Yahoo!"){
		GM_log("Yahoo!");
		var links = document.getElementsByClass("y-hdr-link");
		links[0].click();
		var place = document.getElementById("default-p_29445946_cf9-bd");
		place.appendChild(button);
	}
	
	if (document.title == "Sign In | LinkedIn"){
		document.getElementById("session_password-login").value = password;
		document.getElementsByName("session_login")[0].click();
	}
	
	if (document.title == "Build Your Profile | LinkedIn"){
		var zipVar=Math.floor(Math.random()*89999) + 10000; 
		var companyRandom = Math.floor(Math.random()*companyArray.length);
		var company = companyArray[companyRandom];
		var jobTitle1Random = Math.floor(Math.random()*title1Array.length); var jobTitle2Random = Math.floor(Math.random()*title2Array.length); var jobTitle3Random = Math.floor(Math.random()*title3Array.length); 
		var jobTitle = title1Array[jobTitle1Random]+" "+title2Array[jobTitle2Random]+" "+title3Array[jobTitle3Random];
		var industry = Math.floor(Math.random()*145) + 1;
		
		document.getElementById("postalCode-location-basicProfileForm").value = zipVar;
		document.getElementById("companyName-companyInfo-professionalStatus-professionalBasics-basicProfileForm").value = company;
		document.getElementById("workCompanyTitle-professionalStatus-professionalBasics-basicProfileForm").value = jobTitle;
		document.getElementById("industryChooser-professionalBasics-basicProfileForm").value = industry;
		document.getElementById("btn-submit").click();
	}

	if (document.title == "Upload Webmail Contacts | LinkedIn"){
		document.location = "http://www.linkedin.com/reg/webmail-import-success";
	}
	
	if (document.title == "Confirm Your Email Address | LinkedIn"){
		if (document.getElementsByName("confirm")[0]){
			document.getElementsByName("confirm")[0].click();
		}
	}
	
	if (document.title == "Home | LinkedIn"){
		document.title = "All done, let's log out. . .";
		setTimeout("location.replace('https://www.linkedin.com/secure/login?session_full_logout=&trk=hb_signout')", 2000);
	}
	
	if (document.title == "Signed Out | LinkedIn"){
		location.replace("http://www.linkedin.com/home");
	}
	
	

}



if (document.title = "Yahoo! Registration")
	fillPrimaryPage();
//button.addEventListener('click', fillPrimaryPage, false);
