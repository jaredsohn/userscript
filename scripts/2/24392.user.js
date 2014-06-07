// ==UserScript==
// @name           ScoreHero - Gold Star Cutoffs
// @version        1.5
// @description    Adds a field to show the gold star cutoffs on Scorehero: RockBand.
// @include        http://rockband.scorehero.com/manage_scores.php?*
// @include        http://rockband.scorehero.com/scores.php?*
// @author         based on original code of Jason MacLean
// @author         modified by qirex
// @author         modified by GuestWednesday
// @author	   maintained by de1337ed
// ==/UserScript==

// Replace all non numeric characters with empty strings
function removeNonNumbers(strValue) {
   return strValue.replace(/[^0-9]/g,'');
}

// Format an integer with commas
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

var searchString = document.location.search;
// strip off the leading '?'
searchString = searchString.substring(1);
var nvPairs = searchString.split("&");
for (i = 0; i < nvPairs.length; i++)
{
   var nvPair = nvPairs[i].split("=");
   if (nvPair[0]=='group'){
      var group = nvPair[1];
   } else if (nvPair[0]=='diff'){
      var diff = nvPair[1];
   } else if (nvPair[0]=='size'){
      var size = nvPair[1];
   } else if (nvPair[0]=='platform'){
      var platform = nvPair[1];
   }
}

// Exit if difficulty isn't expert
if (diff!=4) return;

var songs = [
"Say it Ain't So",
"In Bloom",
"I Think I'm Paranoid",
"Mississippi Queen",
"Here It Goes Again",
"29 Fingers",
"Creep",
"Wave of Mutilation",
"Should I Stay or Should I Go",
"Maps",
"Seven",
"Gimme Shelter",
"Sabotage",
"Blitzkrieg Bop",
"Celebrity Skin",
"I'm So Sick",
"Time We Had",
"When You Were Young",
"Black Hole Sun",
"Blood Doll",
"Wanted Dead or Alive",
"Day Late, Dollar Short",
"Learn to Fly",
"Nightmare",
"Orange Crush",
"Main Offender",
"The Hand That Feeds",
"Epic",
"Suffragette City",
"Ballroom Blitz",
"Dead on Arrival",
"Train Kept a Rollin'",
"Are You Gonna Be My Girl",
"Pleasure (Pleasure)",
"Paranoid",
"Brainpower",
"Welcome Home",
"Can't Let Go",
"Go With the Flow",
"Dani California",
"(Don't Fear) The Reaper",
"I Get By",
"Outside",
"Reptilia",
"Electric Version",
"Vasoline",
"Detroit Rock City",
"Timmy & the Lords of the Underworld",
"Next To You",
"Cherub Rock",
"Tom Sawyer",
"Enter Sandman",
"Green Grass and High Tides",
"Highway Star",
"Foreplay/Long Time",
"Flirtin' With Disaster",
"Won't Get Fooled Again",
"Run to the Hills",
"...And Justice For All",
"3's & 7's",
"Action",
"All the Small Things",
"Attack",
"Bang a Gong",
"Beethoven's C***",
"Blackened",
"Blinded By Fear",
"Brass In Pocket",
"Buddy Holly",
"Calling Dr. Love",
"Can't Stand Losing You",
"Casey Jones",
"Cherry Bomb",
"China Cat Sunflower",
"Complete Control",
"Crushcrushcrush",
"Die, All Right!",
"Dirty Little Secret",
"D.O.A.",
"Don't Look Back in Anger",
"El Scorcho",
"Ever Fallen in Love",
"Fortunate Son",
"Franklin's Tower",
"Gimme Three Steps",
"Hard To Handle",
"Heroes",
"Hitch a Ride",
"I Fought the Law",
"I Need A Miracle",
"Interstate Love Song",
"Joker & The Thief",
"Juke Box Hero",
"Last Train to Clarksville",
"Limelight",
"Little Sister",
"Live Forever",
"March Of The Pigs",
"Moonage Daydream",
"More Than a Feeling",
"Move Along",
"My Iron Lung",
"My Sharona",
"N.I.B.",
"Peace of Mind",
"Queen Bitch",
"Ride the Lightning",
"Roam",
"Rock and Roll Band",
"Rock Rebellion",
"Rockaway Beach",
"Roxanne",
"Sex Type Thing",
"Shake",
"Shockwave",
"Sick, Sick, Sick",
"Siva",
"Smokin'",
"Something About You",
"Song With a Mission",
"Sprode",
"Sugar Magnolia",
"Sweet Leaf",
"Synchronicity II",
"Teenage Lobotomy",
"Ten Speed (Of God's Blood And Burial)",
"The Collector",
"The Kill",
"The Number of the Beast",
"The Perfect Drug",
"Thrasher",
"Truckin'",
"Truth Hits Everybody",
"War Pigs",
"We Care A Lot",
"Why Do You Love Me",
"Wonderwall",
"Working Man",
"Still Alive",
"Message In A Bottle",
"Call Me",
"Simple Man",
"Saints of Los Angeles",
"(Take These) Chains",
"Bloodstone",
"Devil's Child",
"Fever",
"Pain And Pleasure",
"Riding on the Wind",
"Screaming For Vengeance",
"The Hellion/Electric Eye",
"You've Got Another Thing Comin'",
"Red Tandy",
"Time Sick Son of a Grizzly Bear",
"Zero",
"This Ain't A Scene, It's An Arms Race",
"Date With The Night",
"It Hurts",
"Kool Thing",
"Train in Vain (Stand By Me)",
"Hanging on the Telephone",
"Beetlebum",
"Hier Kommt Alex",
"Countdown to Insanity",
"Perfekte Welle",
"Manu Chao",
"Hysteria",
"Rock 'n' Roll Star",
"New Wave",
"Monsoon",
"All Mixed Up",
"Moving in Stereo",
"Bye Bye Love",
"Don't Cha Stop",
"Good Times Roll",
"I'm in Touch with Your World",
"Just What I Needed",
"My Best Friend's Girl",
"You're All I've Got Tonight",
"Margaritaville",
"Cheeseburger in Paradise",
"Volcano",
"Indestructible",
"Inside the Fire",
"Perfect Insanity",
"Moving to Seattle",
"A Clean Shot",
"Bullets & Guns",
"Girls Who Play Guitars",
"Afterlife",
"Critical Acclaim",
"Hammerhead",
"Rock 'n' Roll Dream",
"Crackity Jones",
"Dead",
"Debaser",
"Gouge Away",
"Here Comes Your Man",
"Hey",
"I Bleed",
"La la Love You",
"Monkey Gone To Heaven",
"Mr. Grieves",
"No. 13 Baby",
"Silver",
"Tame",
"There Goes My Gun",
"Dreamin'",
"The Greatest Man That Ever Lived",
"Troublemaker",
"Down At The Whisky",
"Promised Land",
"Time Is Running Out",
"Who's Going Home With You Tonight",
"Closer to the Heart",
"Snow ((Hey Oh))",
"Tell Me Baby",
"Working Man (Vault Edition)",
"Amazing Journey",
"Baba O'Riley",
"Behind Blue Eyes",
"Eminence Front",
"Going Mobile",
"Leaving Here",
"My Generation (Live at Leeds)",
"Real Good Looking Boy",
"Sea and Sand",
"Summertime Blues (Live at Leeds)",
"Who Are You",
"Young Man Blues (Live at Leeds)",
"Burn",
"Capital G",
"Last",
"Devour",
"Junkies For Fame",
"They Say",
"This Is It",
"Electric Crown",
"Yomp",
"Rescue Me",
"Face Down In The Dirt",
"Life Is Beautiful",
"B.Y.O.B.",
"Toxicity",
"Runnin' Wild",
"Clouds Over California",
"Constant Motion",
"My Curse",
"Aesthetics Of Hate",
"Sleepwalker"
];
if (platform==1 || platform==2 || platform==3) { // could have separate PS2 (platform=1) scores
	if (size==1) {
		if (group==1) {
			
			// All cutoffs GUITAR
			
			cutoffs = [
96173,        //  Say it Ain't So
187135,        //  In Bloom
89908,        //  I Think I'm Paranoid
50924,        //  Mississippi Queen
138420,        //  Here It Goes Again
144824,        //  29 Fingers
114701,        //  Creep
78941,        //  Wave of Mutilation
106386,        //  Should I Stay or Should I Go
84647,        //  Maps
313572,        //  Seven
161989,        //  Gimme Shelter
134582,        //  Sabotage
132624,        //  Blitzkrieg Bop
114370,        //  Celebrity Skin
126598,        //  I'm So Sick
101551,        //  Time We Had
109532,        //  When You Were Young
110082,        //  Black Hole Sun
101389,        //  Blood Doll
132060,        //  Wanted Dead or Alive
103930,        //  Day Late, Dollar Short
156353,        //  Learn to Fly
145625,        //  Nightmare
80742,        //  Orange Crush
111826,        //  Main Offender
123111,        //  The Hand That Feeds
116807,        //  Epic
171881,        //  Suffragette City
158952,        //  Ballroom Blitz
207670,        //  Dead on Arrival
160154,        //  Train Kept a Rollin'
132208,        //  Are You Gonna Be My Girl
127571,        //  Pleasure (Pleasure)
160542,        //  Paranoid
69860,        //  Brainpower
223427,        //  Welcome Home
131040,        //  Can't Let Go
153597,        //  Go With the Flow
177217,        //  Dani California
180525,        //  (Don't Fear) The Reaper
127915,        //  I Get By
189250,        //  Outside
137828,        //  Reptilia
170356,        //  Electric Version
120350,        //  Vasoline
90110,        //  Detroit Rock City
83234,        //  Timmy & the Lords of the Underworld
116623,        //  Next To You
208381,        //  Cherub Rock
108134,        //  Tom Sawyer
181412,        //  Enter Sandman
413095,        //  Green Grass and High Tides
241616,        //  Highway Star
216687,        //  Foreplay/Long Time
185111,        //  Flirtin' With Disaster
213447,        //  Won't Get Fooled Again
170105,        //  Run to the Hills
376480,        //  …And Justice for All 
138059,        //  3’s & 7’s 
103189,        //  Action 
146479,        //  All the Small Things 
176299,        //  Attack 
231581,        //  Bang a Gong 
103667,        //  Beethoven's C*** 
257627,        //  Blackened 
137544,        //  Blinded By Fear 
102185,        //  Brass In Pocket 
124617,        //  Buddy Holly 
85682,        //  Calling Dr. Love
114609,        //  Can’t Stand Losing You 
115271,        //  Casey Jones 
113445,        //  Cherry Bomb 
128746,        //  China Cat Sunflower 
119550,        //  Complete Control 
108453,        //  Crushcrushcrush 
163991,        //  Die, All Right! 
161801,        //  Dirty Little Secret 
131056,        //  D.O.A.
119761,        //  Don't Look Back In Anger 
78597,        //  El Scorcho 
165248,        //  Ever Fallen In Love 
63522,        //  Fortunate Son 
132615,        //  Franklin's Tower 
199597,        //  Gimme Three Steps 
106582,        //  Hard To Handle 
145331,        //  Heroes 
135386,        //  Hitch a Ride 
88979,        //  I Fought The Law 
85820,        //  I Need A Miracle 
137630,        //  Interstate Love Song 
189662,        //  Joker & The Thief 
106880,        //  Juke Box Hero 
111033,        //  Last Train to Clarksville 
131680,        //  Limelight 
164708,        //  Little Sister 
117243,        //  Live Forever 
83578,        //  March of The Pigs 
137981,        //  Moonage Daydream 
140400,        //  More Than A Feeling 
175957,        //  Move Along 
112957,        //  My Iron Lung 
170792,        //  My Sharona 
162044,        //  N.I.B
206330,        //  Peace of Mind 
146387,        //  Queen Bitch 
310558,        //  Ride the Lightning 
186901,        //  Roam 
110797,        //  Rock and Roll Band 
123739,        //  Rock Rebellion 
150012,        //  Rockaway Beach 
117518,        //  Roxanne 
137117,        //  Sex Type Thing 
171091,        //  Shake 
173274,        //  Shockwave 
160716,        //  Sick, Sick, Sick 
130365,        //  Siva 
189936,        //  Smokin
135669,        //  Something About You 
131743,        //  Song With A Mission 
77509,        //  Sprode 
122906,        //  Sugar Magnolia 
163508,        //  Sweet Leaf 
161189,        //  Synchronicity II 
123232,        //  Teenage Lobotomy 
117546,        //  Ten Speed 
64407,        //  The Collector 
195298,        //  The Kill 
241726,        //  The Number Of The Beast 
175801,        //  The Perfect Drug 
231721,        //  Thrasher 
200284,        //  Truckin' 
124737,        //  Truth Hits Everybody 
177915,        //  War Pigs 
102707,        //  We Care A Lot 
145947,        //  Why Do You Love Me? 
227843,        //  Wonderwall 
239973,        //  Working Man 
91806,        //  Still Alive
134370,        //  Message In A Bottle
103970,        //  Call Me
151919,        //  Simple Man
132316,        //  Saints Of Los Angeles
92430,        //  (Take These) Chains
131168,        //  Bloodstone
125585,        //  Devil's Child
157798,        //  Fever
133529,        //  Pain And Pleasure
105832,        //  Riding on the Wind
214156,        //  Screaming For Vengeance
160837,        //  The Hellion/Electric Eye
155671,        //  You've Got Another Thing Comin'
208279,        //  Red Tandy
126991,        //  Time Sick Son of a Grizzly Bear
106570,        //  Zero
198369,        //  This Ain't A Scene, It's An Arms Race
117000,        //  Date With The Night
164818,        //  It Hurts
160172,        //  Kool Thing
81972,        //  Train in Vain (Stand By Me)
75704,        //  Hanging on the Telephone
167259,        //  Beetlebum
203480,        //  Hier Kommt Alex
137199,        //  Countdown to Insanity
101515,        //  Perfekte Welle
145055,        //  Manu Chao
124368,        //  Hysteria
204858,        //  Rock 'n' Roll Star
84458,        //  New Wave
155682,        //  Monsoon
123204,        //  All Mixed Up
113710,        //  Moving in Stereo
121229,        //  Bye Bye Love
122057,        //  Don't Cha Stop
119028,        //  Good Times Roll
83451,        //  I'm in Touch with Your World
124523,        //  Just What I Needed
139233,        //  My Best Friend's Girl
145335,        //  You're All I've Got Tonight
231243,        //  Margaritaville
98009,        //  Cheeseburger in Paradise
152466,        //  Volcano
198338,        //  Indestructible
164807,        //  Inside the Fire
170938,        //  Perfect Insanity
145473,        //  Moving to Seattle
131663,        //  A Clean Shot
112498,        //  Bullets & Guns
142846,        //  Girls Who Play Guitars
256370,        //  Afterlife
166252,        //  Critical Acclaim
227648,        //  Hammerhead
129689,        //  Rock 'n' Roll Dream
90695,        //  Crackity Jones
64426,        //  Dead
128928,        //  Debaser
75453,        //  Gouge Away
108716,        //  Here Comes Your Man
100033,        //  Hey
63529,        //  I Bleed
71356,        //  La la Love You
67465,        //  Monkey Gone To Heaven
74047,        //  Mr. Grieves
164526,        //  No. 13 Baby
55168,        //  Silver
54891,        //  Tame
70458,        //  There Goes My Gun
205621,        //  Dreamin'
148341,        //  The Greatest Man That Ever Lived
137285,        //  Troublemaker
132933,        //  Down At The Whisky
116204,        //  Promised Land
131871,        //  Time Is Running Out
139587,        //  Who's Going Home With You Tonight
96441,        //  Closer to the Heart
339908,        //  Snow ((Hey Oh))
135978,        //  Tell Me Baby
255531,        //  Working Man (Vault Edition)
128897,        //  Amazing Journey
98698,        //  Baba O'Riley
126877,        //  Behind Blue Eyes
185720,        //  Eminence Front
142953,        //  Going Mobile
118487,        //  Leaving Here
149289,        //  My Generation (Live at Leeds)
153893,        //  Real Good Looking Boy
149714,        //  Sea & Sand
102560,        //  Summertime Blues (Live at Leeds)
149552,        //  Who Are You
181702,        //  Young Man Blues (Live at Leeds)
85130,        //  Burn
137397,        //  Capital G
141129,        //  Last
181591,        //  Devour
126662,        //  Junkies For Fame
137659,        //  They Say
119735,        //  This is It
193582,        //  Electric Crown
55757,        //  Yomp
128704,        //  Rescue Me
183986,        //  Face Down In The Dirt
113171,        //  Life Is Beautiful
238786,        //  B.Y.O.B.
144752,        //  Toxicity
156772,        //  Runnin' Wild
221865,        //  Clouds Over California
410577,        //  Constant Motion
208546,        //  My Curse
240740,        //  Aesthetics Of Hate
310964        //  Sleepwalker
];
		} else if (group==2) {

			// All cutoffs BASS

			cutoffs = [
72055,        //  Say it Ain't So
161968,        //  In Bloom
85705,        //  I Think I'm Paranoid
72457,        //  Mississippi Queen
96641,        //  Here It Goes Again
127700,        //  29 Fingers
86322,        //  Creep
88717,        //  Wave of Mutilation
71322,        //  Should I Stay or Should I Go
73780,        //  Maps
236700,        //  Seven
171679,        //  Gimme Shelter
142253,        //  Sabotage
108625,        //  Blitzkrieg Bop
107485,        //  Celebrity Skin
156165,        //  I'm So Sick
114200,        //  Time We Had
141111,        //  When You Were Young
97557,        //  Black Hole Sun
93400,        //  Blood Doll
59000,        //  Wanted Dead or Alive
148900,        //  Day Late, Dollar Short
123613,        //  Learn to Fly
169400,        //  Nightmare
101309,        //  Orange Crush
76935,        //  Main Offender
119658,        //  The Hand That Feeds
125398,        //  Epic
148329,        //  Suffragette City
160600,        //  Ballroom Blitz
172400,        //  Dead on Arrival
193700,        //  Train Kept a Rollin'
120600,        //  Are You Gonna Be My Girl
131900,        //  Pleasure (Pleasure)
143200,        //  Paranoid
96550,        //  Brainpower
256000,        //  Welcome Home
168000,        //  Can't Let Go
167818,        //  Go With the Flow
178300,        //  Dani California
189900,        //  (Don't Fear) The Reaper
130800,        //  I Get By
137500,        //  Outside
169024,        //  Reptilia
127204,        //  Electric Version
116351,        //  Vasoline
110541,        //  Detroit Rock City
84000,        //  Timmy & the Lords of the Underworld
135000,        //  Next To You
204600,        //  Cherub Rock
116900,        //  Tom Sawyer
209000,        //  Enter Sandman
427700,        //  Green Grass and High Tides
334452,        //  Highway Star
206500,        //  Foreplay/Long Time
259800,        //  Flirtin' With Disaster
250200,        //  Won't Get Fooled Again
253000,        //  Run to the Hills
408900,        //  …And Justice for All 
133200,        //  3’s & 7’s 
155873,        //  Action 
175583,        //  All the Small Things 
143500,        //  Attack 
163000,        //  Bang a Gong 
105528,        //  Beethoven's C*** 
283596,        //  Blackened 
176108,        //  Blinded By Fear 
103600,        //  Brass In Pocket 
112700,        //  Buddy Holly 
96399,        //  Calling Dr. Love
114776,        //  Can’t Stand Losing You 
153998,        //  Casey Jones 
101300,        //  Cherry Bomb 
150049,        //  China Cat Sunflower 
121069,        //  Complete Control 
89422,        //  Crushcrushcrush 
121748,        //  Die, All Right! 
120600,        //  Dirty Little Secret 
170334,        //  D.O.A.
139692,        //  Don't Look Back In Anger 
86352,        //  El Scorcho 
142300,        //  Ever Fallen In Love 
103100,        //  Fortunate Son 
145635,        //  Franklin's Tower 
190000,        //  Gimme Three Steps 
127900,        //  Hard To Handle 
246600,        //  Heroes 
127938,        //  Hitch a Ride 
104600,        //  I Fought The Law 
85167,        //  I Need A Miracle 
103026,        //  Interstate Love Song 
104500,        //  Joker & The Thief 
139000,        //  Juke Box Hero 
76474,        //  Last Train to Clarksville 
147200,        //  Limelight 
129800,        //  Little Sister 
114970,        //  Live Forever 
154797,        //  March of The Pigs 
134600,        //  Moonage Daydream 
146478,        //  More Than A Feeling 
154600,        //  Move Along 
148200,        //  My Iron Lung 
179900,        //  My Sharona 
188700,        //  N.I.B
208412,        //  Peace of Mind 
108100,        //  Queen Bitch 
358000,        //  Ride the Lightning 
175410,        //  Roam 
120656,        //  Rock and Roll Band 
165493,        //  Rock Rebellion 
124200,        //  Rockaway Beach 
69300,        //  Roxanne 
132659,        //  Sex Type Thing 
137229,        //  Shake 
181199,        //  Shockwave 
143100,        //  Sick, Sick, Sick 
180393,        //  Siva 
184845,        //  Smokin
128336,        //  Something About You 
145100,        //  Song With A Mission 
183441,        //  Sprode 
139618,        //  Sugar Magnolia 
169800,        //  Sweet Leaf 
243200,        //  Synchronicity II 
102507,        //  Teenage Lobotomy 
135559,        //  Ten Speed 
66453,        //  The Collector 
179900,        //  The Kill 
265874,        //  The Number Of The Beast 
129170,        //  The Perfect Drug 
290222,        //  Thrasher 
185216,        //  Truckin' 
137442,        //  Truth Hits Everybody 
227004,        //  War Pigs 
135050,        //  We Care A Lot 
161906,        //  Why Do You Love Me? 
100277,        //  Wonderwall 
280323,        //  Working Man 
57490,        //  Still Alive
144982,        //  Message In A Bottle
95592,        //  Call Me
207030,        //  Simple Man
157207,        //  Saints Of Los Angeles
106590,        //  (Take These) Chains
184201,        //  Bloodstone
201484,        //  Devil's Child
89893,        //  Fever
49597,        //  Pain And Pleasure
158944,        //  Riding on the Wind
307525,        //  Screaming For Vengeance
203000,        //  The Hellion/Electric Eye
218920,        //  You've Got Another Thing Comin'
230372,        //  Red Tandy
99274,        //  Time Sick Son of a Grizzly Bear
107959,        //  Zero
150011,        //  This Ain't A Scene, It's An Arms Race
142224,        //  Date With The Night
118828,        //  It Hurts
157040,        //  Kool Thing
88733,        //  Train in Vain (Stand By Me)
103255,        //  Hanging on the Telephone
121839,        //  Beetlebum
164853,        //  Hier Kommt Alex
107666,        //  Countdown to Insanity
83661,        //  Perfekte Welle
114502,        //  Manu Chao
230965,        //  Hysteria
231266,        //  Rock 'n' Roll Star
92254,        //  New Wave
209787,        //  Monsoon
119671,        //  All Mixed Up
83154,        //  Moving in Stereo
133582,        //  Bye Bye Love
117760,        //  Don't Cha Stop
93024,        //  Good Times Roll
53454,        //  I'm in Touch with Your World
137112,        //  Just What I Needed
91070,        //  My Best Friend's Girl
113864,        //  You're All I've Got Tonight
122953,        //  Margaritaville
90035,        //  Cheeseburger in Paradise
89607,        //  Volcano
170355,        //  Indestructible
176624,        //  Inside the Fire
190208,        //  Perfect Insanity
127369,        //  Moving to Seattle
98806,        //  A Clean Shot
118808,        //  Bullets & Guns
121023,        //  Girls Who Play Guitars
259726,        //  Afterlife
159289,        //  Critical Acclaim
188872,        //  Hammerhead
116882,        //  Rock 'n' Roll Dream
92664,        //  Crackity Jones
84287,        //  Dead
117542,        //  Debaser
115360,        //  Gouge Away
119275,        //  Here Comes Your Man
96535,        //  Hey
85127,        //  I Bleed
100805,        //  La la Love You
86993,        //  Monkey Gone To Heaven
45009,        //  Mr. Grieves
103574,        //  No. 13 Baby
23000,        //  Silver
118275,        //  Tame
71343,        //  There Goes My Gun
127577,        //  Dreamin'
143949,        //  The Greatest Man That Ever Lived
56692,        //  Troublemaker
167223,        //  Down At The Whisky
117850,        //  Promised Land
90398,        //  Time Is Running Out
106429,        //  Who's Going Home With You Tonight
95119,        //  Closer to the Heart
338657,        //  Snow ((Hey Oh))
195340,        //  Tell Me Baby
300956,        //  Working Man (Vault Edition)
94022,        //  Amazing Journey
73148,        //  Baba O'Riley
77808,        //  Behind Blue Eyes
136850,        //  Eminence Front
134343,        //  Going Mobile
75328,        //  Leaving Here
183533,        //  My Generation (Live at Leeds)
116939,        //  Real Good Looking Boy
160208,        //  Sea & Sand
175149,        //  Summertime Blues (Live at Leeds)
103878,        //  Who Are You
208160,        //  Young Man Blues (Live at Leeds)
94797,        //  Burn
80572,        //  Capital G
248646,        //  Last
161580,        //  Devour
140511,        //  Junkies For Fame
105730,        //  They Say
88460,        //  This is It
269117,        //  Electric Crown
92164,        //  Yomp
134398,        //  Rescue Me
183833,        //  Face Down In The Dirt
209251,        //  Life Is Beautiful
251281,        //  B.Y.O.B.
174588,        //  Toxicity
190429,        //  Runnin' Wild
240621,        //  Clouds Over California
384702,        //  Constant Motion
165163,        //  My Curse
257143,        //  Aesthetics Of Hate
331818        //  Sleepwalker
];
		} else if (group==3) {

			// All cutoffs DRUMS

			cutoffs = [
111335,        //  Say it Ain't So
181155,        //  In Bloom
140972,        //  I Think I'm Paranoid
106895,        //  Mississippi Queen
130427,        //  Here It Goes Again
90022,        //  29 Fingers
134423,        //  Creep
99680,        //  Wave of Mutilation
127319,        //  Should I Stay or Should I Go
189369,        //  Maps
179268,        //  Seven
185151,        //  Gimme Shelter
92132,        //  Sabotage
127874,        //  Blitzkrieg Bop
124544,        //  Celebrity Skin
92909,        //  I'm So Sick
159731,        //  Time We Had
162395,        //  When You Were Young
143081,        //  Black Hole Sun
91799,        //  Blood Doll
123656,        //  Wanted Dead or Alive
178046,        //  Day Late, Dollar Short
163727,        //  Learn to Fly
148964,        //  Nightmare
225777,        //  Orange Crush
99347,        //  Main Offender
149075,        //  The Hand That Feeds
210459,        //  Epic
183264,        //  Suffragette City
200580,        //  Ballroom Blitz
166946,        //  Dead on Arrival
251973,        //  Train Kept a Rollin'
126875,        //  Are You Gonna Be My Girl
131981,        //  Pleasure (Pleasure)
138863,        //  Paranoid
96572,        //  Brainpower
229995,        //  Welcome Home
155291,        //  Can't Let Go
187260,        //  Go With the Flow
194475,        //  Dani California
319351,        //  (Don't Fear) The Reaper
206463,        //  I Get By
320239,        //  Outside
180267,        //  Reptilia
186816,        //  Electric Version
136088,        //  Vasoline
199137,        //  Detroit Rock City
113777,        //  Timmy & the Lords of the Underworld
162950,        //  Next To You
231752,        //  Cherub Rock
233214,        //  Tom Sawyer
234990,        //  Enter Sandman
440321,        //  Green Grass and High Tides
273164,        //  Highway Star
298927,        //  Foreplay/Long Time
240207,        //  Flirtin' With Disaster
374297,        //  Won't Get Fooled Again
296596,        //  Run to the Hills
425024,        //  …And Justice for All 
158510,        //  3’s & 7’s 
135533,        //  Action 
142859,        //  All the Small Things 
126208,        //  Attack 
204353,        //  Bang a Gong 
141749,        //  Beethoven's C*** 
345325,        //  Blackened 
216896,        //  Blinded By Fear 
111889,        //  Brass In Pocket 
121768,        //  Buddy Holly 
139196,        //  Calling Dr. Love
144080,        //  Can’t Stand Losing You 
208460,        //  Casey Jones 
128983,        //  Cherry Bomb 
163061,        //  China Cat Sunflower 
139196,        //  Complete Control 
120436,        //  Crushcrushcrush 
175826,        //  Die, All Right! 
111445,        //  Dirty Little Secret 
205574,        //  D.O.A.
172718,        //  Don't Look Back In Anger 
134090,        //  El Scorcho 
183263,        //  Ever Fallen In Love 
104674,        //  Fortunate Son 
232215,        //  Franklin's Tower 
166280,        //  Gimme Three Steps 
122363,        //  Hard To Handle 
275616,        //  Heroes 
165392,        //  Hitch a Ride 
151517,        //  I Fought The Law 
161840,        //  I Need A Miracle 
121879,        //  Interstate Love Song 
168278,        //  Joker & The Thief 
133868,        //  Juke Box Hero 
116329,        //  Last Train to Clarksville 
201245,        //  Limelight 
157289,        //  Little Sister 
165059,        //  Live Forever 
129871,        //  March of The Pigs 
143078,        //  Moonage Daydream 
183500,        //  More Than A Feeling 
186815,        //  Move Along 
172496,        //  My Iron Lung 
226663,        //  My Sharona 
207350,        //  N.I.B
246756,        //  Peace of Mind 
164726,        //  Queen Bitch 
357979,        //  Ride the Lightning 
248754,        //  Roam 
146050,        //  Rock and Roll Band 
165059,        //  Rock Rebellion 
133313,        //  Rockaway Beach 
121324,        //  Roxanne 
125653,        //  Sex Type Thing 
170498,        //  Shake 
160952,        //  Shockwave 
183485,        //  Sick, Sick, Sick 
188480,        //  Siva 
210346,        //  Smokin
160175,        //  Something About You 
144857,        //  Song With A Mission 
170054,        //  Sprode 
190700,        //  Sugar Magnolia 
205400,        //  Sweet Leaf 
226665,        //  Synchronicity II 
128428,        //  Teenage Lobotomy 
160064,        //  Ten Speed 
180266,        //  The Collector 
148631,        //  The Kill 
189701,        //  The Number Of The Beast 
221558,        //  The Perfect Drug 
196361,        //  Thrasher 
345658,        //  Truckin' 
172940,        //  Truth Hits Everybody 
294891,        //  War Pigs 
95128,        //  We Care A Lot 
198914,        //  Why Do You Love Me? 
148375,        //  Wonderwall 
313690,        //  Working Man 
95863,        //  Still Alive
256413,        //  Message In A Bottle
185594,        //  Call Me
171941,        //  Simple Man
132202,        //  Saints Of Los Angeles
134645,        //  (Take These) Chains
150185,        //  Bloodstone
236211,        //  Devil's Child
163394,        //  Fever
100234,        //  Pain And Pleasure
165614,        //  Riding on the Wind
249309,        //  Screaming For Vengeance
164393,        //  The Hellion/Electric Eye
258855,        //  You've Got Another Thing Comin'
202466,        //  Red Tandy
116551,        //  Time Sick Son of a Grizzly Bear
106117,        //  Zero
134867,        //  This Ain't A Scene, It's An Arms Race
126763,        //  Date With The Night
205019,        //  It Hurts
259632,        //  Kool Thing
149075,        //  Train in Vain (Stand By Me)
141749,        //  Hanging on the Telephone
130648,        //  Beetlebum
163949,        //  Hier Kommt Alex
122212,        //  Countdown to Insanity
101233,        //  Perfekte Welle
122545,        //  Manu Chao
141749,        //  Hysteria
279612,        //  Rock 'n' Roll Star
161285,        //  New Wave
146078,        //  Monsoon
164282,        //  All Mixed Up
156956,        //  Moving in Stereo
193142,        //  Bye Bye Love
154736,        //  Don't Cha Stop
128428,        //  Good Times Roll
76036,        //  I'm in Touch with Your World
161174,        //  Just What I Needed
154070,        //  My Best Friend's Girl
246876,        //  You're All I've Got Tonight
193253,        //  Margaritaville
146633,        //  Cheeseburger in Paradise
161174,        //  Volcano
200468,        //  Indestructible
196472,        //  Inside the Fire
197915,        //  Perfect Insanity
142970,        //  Moving to Seattle
176492,        //  A Clean Shot
140528,        //  Bullets & Guns
170165,        //  Girls Who Play Guitars
241206,        //  Afterlife
238209,        //  Critical Acclaim
251307,        //  Hammerhead
137309,        //  Rock 'n' Roll Dream
75925,        //  Crackity Jones
116440,        //  Dead
151517,        //  Debaser
111778,        //  Gouge Away
157400,        //  Here Comes Your Man
91254,        //  Hey
104674,        //  I Bleed
123322,        //  La la Love You
109891,        //  Monkey Gone To Heaven
65491,        //  Mr. Grieves
169125,        //  No. 13 Baby
21645,        //  Silver
97126,        //  Tame
81919,        //  There Goes My Gun
115330,        //  Dreamin'
177425,        //  The Greatest Man That Ever Lived
111667,        //  Troublemaker
172052,        //  Down At The Whisky
108892,        //  Promised Land
101122,        //  Time Is Running Out
124210,        //  Who's Going Home With You Tonight
91465,        //  Closer to the Heart
222669,        //  Snow ((Hey Oh))
190145,        //  Tell Me Baby
332671,        //  Working Man (Vault Edition)
150296,        //  Amazing Journey
144302,        //  Baba O'Riley
67933,        //  Behind Blue Eyes
186260,        //  Eminence Front
190035,        //  Going Mobile
171608,        //  Leaving Here
190145,        //  My Generation (Live at Leeds)
207572,        //  Real Good Looking Boy
245757,        //  Sea & Sand
185816,        //  Summertime Blues (Live at Leeds)
219449,        //  Who Are You
268068,        //  Young Man Blues (Live at Leeds)
292044,        //  Burn
229440,        //  Capital G
211346,        //  Last
179550,        //  Devour
148187,        //  Junkies For Fame
104674,        //  They Say
124321,        //  This is It
290823,        //  Electric Crown
127207,        //  Yomp
0,        //  Rescue Me
175250,        //  Face Down In The Dirt
121075,        //  Life Is Beautiful
0,        //  B.Y.O.B.
184425,        //  Toxicity
214900,        //  Runnin' Wild
0,        //  Clouds Over California
378150,        //  Constant Motion
160425,        //  My Curse
284475,        //  Aesthetics Of Hate
0        //  Sleepwalker
];
		} else if (group==4) {

			// All cutoffs VOX

			cutoffs = [
148080,        //  Say it Ain't So
243360,        //  In Bloom
168480,        //  I Think I'm Paranoid
91240,        //  Mississippi Queen
215280,        //  Here It Goes Again
111015,        //  29 Fingers
173160,        //  Creep
70200,        //  Wave of Mutilation
170730,        //  Should I Stay or Should I Go
132805,        //  Maps
290160,        //  Seven
191270,        //  Gimme Shelter
135720,        //  Sabotage
131040,        //  Blitzkrieg Bop
201240,        //  Celebrity Skin
121680,        //  I'm So Sick
112320,        //  Time We Had
159120,        //  When You Were Young
229320,        //  Black Hole Sun
168480,        //  Blood Doll
145080,        //  Wanted Dead or Alive
186395,        //  Day Late, Dollar Short
215280,        //  Learn to Fly
113640,        //  Nightmare
141470,        //  Orange Crush
91795,        //  Main Offender
187200,        //  The Hand That Feeds
253610,        //  Epic
252720,        //  Suffragette City
272400,        //  Ballroom Blitz
210420,        //  Dead on Arrival
222530,        //  Train Kept a Rollin'
179480,        //  Are You Gonna Be My Girl
127430,        //  Pleasure (Pleasure)
107640,        //  Paranoid
102960,        //  Brainpower
276120,        //  Welcome Home
131040,        //  Can't Let Go
145080,        //  Go With the Flow
219225,        //  Dani California
184925,        //  (Don't Fear) The Reaper
249110,        //  I Get By
212545,        //  Outside
191825,        //  Reptilia
163800,        //  Electric Version
121680,        //  Vasoline
154330,        //  Detroit Rock City
131040,        //  Timmy & the Lords of the Underworld
219960,        //  Next To You
159120,        //  Cherub Rock
160455,        //  Tom Sawyer
182520,        //  Enter Sandman
140000,        //  Green Grass and High Tides
280525,        //  Highway Star
252485,        //  Foreplay/Long Time
190215,        //  Flirtin' With Disaster
260945,        //  Won't Get Fooled Again
177840,        //  Run to the Hills
226880,        //  …And Justice for All 
150275,        //  3’s & 7’s 
177840,        //  Action 
152580,        //  All the Small Things 
219960,        //  Attack 
182520,        //  Bang a Gong 
210600,        //  Beethoven's C*** 
218725,        //  Blackened 
107640,        //  Blinded By Fear 
145080,        //  Brass In Pocket 
163800,        //  Buddy Holly 
155260,        //  Calling Dr. Love
201240,        //  Can’t Stand Losing You 
213600,        //  Casey Jones 
154440,        //  Cherry Bomb 
165175,        //  China Cat Sunflower 
201240,        //  Complete Control 
257400,        //  Crushcrushcrush 
157815,        //  Die, All Right! 
149760,        //  Dirty Little Secret 
196560,        //  D.O.A.
222835,        //  Don't Look Back In Anger 
215280,        //  El Scorcho 
140400,        //  Ever Fallen In Love 
131040,        //  Fortunate Son 
214350,        //  Franklin's Tower 
205785,        //  Gimme Three Steps 
210420,        //  Hard To Handle 
177840,        //  Heroes 
174440,        //  Hitch a Ride 
154400,        //  I Fought The Law 
200310,        //  I Need A Miracle 
113695,        //  Interstate Love Song 
155260,        //  Joker & The Thief 
177410,        //  Juke Box Hero 
205115,        //  Last Train to Clarksville 
156385,        //  Limelight 
135720,        //  Little Sister 
218475,        //  Live Forever 
107640,        //  March of The Pigs 
163455,        //  Moonage Daydream 
137985,        //  More Than A Feeling 
205920,        //  Move Along 
187200,        //  My Iron Lung 
174010,        //  My Sharona 
181050,        //  N.I.B
202450,        //  Peace of Mind 
201240,        //  Queen Bitch 
179730,        //  Ride the Lightning 
203865,        //  Roam 
182035,        //  Rock and Roll Band 
182520,        //  Rock Rebellion 
187200,        //  Rockaway Beach 
107640,        //  Roxanne 
182520,        //  Sex Type Thing 
268510,        //  Shake 
137915,        //  Shockwave 
168480,        //  Sick, Sick, Sick 
123000,        //  Siva 
162315,        //  Smokin
168480,        //  Something About You 
186090,        //  Song With A Mission 
210600,        //  Sprode 
217280,        //  Sugar Magnolia 
203060,        //  Sweet Leaf 
191325,        //  Synchronicity II 
102960,        //  Teenage Lobotomy 
165245,        //  Ten Speed 
154440,        //  The Collector 
154440,        //  The Kill 
185605,        //  The Number Of The Beast 
215280,        //  The Perfect Drug 
126360,        //  Thrasher 
243360,        //  Truckin' 
190950,        //  Truth Hits Everybody 
134820,        //  War Pigs 
191880,        //  We Care A Lot 
238680,        //  Why Do You Love Me? 
172355,        //  Wonderwall 
184495,        //  Working Man 
182520,        //  Still Alive
279120,        //  Message In A Bottle
130985,        //  Call Me
257470,        //  Simple Man
198185,        //  Saints Of Los Angeles
200060,        //  (Take These) Chains
153385,        //  Bloodstone
0,        //  Devil's Child
157760,        //  Fever
0,        //  Pain And Pleasure
136040,        //  Riding on the Wind
219600,        //  Screaming For Vengeance
188270,        //  The Hellion/Electric Eye
244680,        //  You've Got Another Thing Comin'
145375,        //  Red Tandy
116445,        //  Time Sick Son of a Grizzly Bear
168300,        //  Zero
0,        //  This Ain't A Scene, It's An Arms Race
0,        //  Date With The Night
203865,        //  It Hurts
0,        //  Kool Thing
0,        //  Train in Vain (Stand By Me)
0,        //  Hanging on the Telephone
221405,        //  Beetlebum
200935,        //  Hier Kommt Alex
0,        //  Countdown to Insanity
0,        //  Perfekte Welle
0,        //  Manu Chao
105600,        //  Hysteria
0,        //  Rock 'n' Roll Star
0,        //  New Wave
219960,        //  Monsoon
195700,        //  All Mixed Up
111725,        //  Moving in Stereo
151275,        //  Bye Bye Love
0,        //  Don't Cha Stop
0,        //  Good Times Roll
158940,        //  I'm in Touch with Your World
199380,        //  Just What I Needed
0,        //  My Best Friend's Girl
186730,        //  You're All I've Got Tonight
191075,        //  Margaritaville
0,        //  Cheeseburger in Paradise
194630,        //  Volcano
265580,        //  Indestructible
184965,        //  Inside the Fire
258900,        //  Perfect Insanity
0,        //  Moving to Seattle
0,        //  A Clean Shot
0,        //  Bullets & Guns
0,        //  Girls Who Play Guitars
0,        //  Afterlife
0,        //  Critical Acclaim
0,        //  Hammerhead
0,        //  Rock 'n' Roll Dream
0,        //  Crackity Jones
0,        //  Dead
0,        //  Debaser
0,        //  Gouge Away
0,        //  Here Comes Your Man
0,        //  Hey
0,        //  I Bleed
0,        //  La la Love You
0,        //  Monkey Gone To Heaven
0,        //  Mr. Grieves
0,        //  No. 13 Baby
0,        //  Silver
0,        //  Tame
0,        //  There Goes My Gun
0,        //  Dreamin'
0,        //  The Greatest Man That Ever Lived
0,        //  Troublemaker
0,        //  Down At The Whisky
0,        //  Promised Land
0,        //  Time Is Running Out
0        //  Who's Going Home With You Tonight

];
		} else return;
	} else if (size==2) {
		if (group==5) {
		// All Guitar/Bass
			cutoffs = [

240615,        //  Say it Ain't So
481987,        //  In Bloom
237471,        //  I Think I'm Paranoid
162139,        //  Mississippi Queen
331409,        //  Here It Goes Again
371274,        //  29 Fingers
277891,        //  Creep
222767,        //  Wave of Mutilation
250288,        //  Should I Stay or Should I Go
218081,        //  Maps
764533,        //  Seven
449738,        //  Gimme Shelter
377705,        //  Sabotage
328512,        //  Blitzkrieg Bop
300140,        //  Celebrity Skin
376253,        //  I'm So Sick
287829,        //  Time We Had
328555,        //  When You Were Young
284460,        //  Black Hole Sun
266017,        //  Blood Doll
278328,        //  Wanted Dead or Alive
337498,        //  Day Late, Dollar Short
388445,        //  Learn to Fly
418199,        //  Nightmare
240378,        //  Orange Crush
263867,        //  Main Offender
330582,        //  The Hand That Feeds
324075,        //  Epic
437329,        //  Suffragette City
428367,        //  Ballroom Blitz
514067,        //  Dead on Arrival
441615,        //  Train Kept a Rollin'
341100,        //  Are You Gonna Be My Girl
347808,        //  Pleasure (Pleasure)
415612,        //  Paranoid
217238,        //  Brainpower
633459,        //  Welcome Home
410818,        //  Can't Let Go
428393,        //  Go With the Flow
491688,        //  Dani California
495882,        //  (Don't Fear) The Reaper
351359,        //  I Get By
463844,        //  Outside
404915,        //  Reptilia
415772,        //  Electric Version
323802,        //  Vasoline
262360,        //  Detroit Rock City
202835,        //  Timmy & the Lords of the Underworld
332497,        //  Next To You
560610,        //  Cherub Rock
300828,        //  Tom Sawyer
519167,        //  Enter Sandman
1139351,        //  Green Grass and High Tides
755171,        //  Highway Star
574007,        //  Foreplay/Long Time
578550,        //  Flirtin' With Disaster
613936,        //  Won't Get Fooled Again
573404,        //  Run to the Hills
9999999,        //  …And Justice for All 
374947,        //  3’s & 7’s 
337492,        //  Action 
430041,        //  All the Small Things 
441631,        //  Attack 
9999999,        //  Bang a Gong 
282799,        //  Beethoven's C*** 
9999999,        //  Blackened 
470015,        //  Blinded By Fear 
280063,        //  Brass In Pocket 
324409,        //  Buddy Holly 
245854,        //  Calling Dr. Love
311589,        //  Can’t Stand Losing You 
358505,        //  Casey Jones 
9999999,        //  Cherry Bomb 
428739,        //  China Cat Sunflower 
326094,        //  Complete Control 
278459,        //  Crushcrushcrush 
442380,        //  Die, All Right! 
389726,        //  Dirty Little Secret 
402813,        //  D.O.A.
353532,        //  Don't Look Back In Anger 
220431,        //  El Scorcho 
426742,        //  Ever Fallen In Love 
213986,        //  Fortunate Son 
452961,        //  Franklin's Tower 
545227,        //  Gimme Three Steps 
311944,        //  Hard To Handle 
531657,        //  Heroes 
377981,        //  Hitch a Ride 
301869,        //  I Fought The Law 
250132,        //  I Need A Miracle 
334324,        //  Interstate Love Song 
389862,        //  Joker & The Thief 
350929,        //  Juke Box Hero 
278096,        //  Last Train to Clarksville 
383530,        //  Limelight 
472348,        //  Little Sister 
349945,        //  Live Forever 
402934,        //  March of The Pigs 
376986,        //  Moonage Daydream 
386890,        //  More Than A Feeling 
466952,        //  Move Along 
344059,        //  My Iron Lung 
492374,        //  My Sharona 
488716,        //  N.I.B
592732,        //  Peace of Mind 
362141,        //  Queen Bitch 
963610,        //  Ride the Lightning 
490191,        //  Roam 
310803,        //  Rock and Roll Band 
381519,        //  Rock Rebellion 
386600,        //  Rockaway Beach 
266875,        //  Roxanne 
374833,        //  Sex Type Thing 
460314,        //  Shake 
474432,        //  Shockwave 
9999999,        //  Sick, Sick, Sick 
462535,        //  Siva 
512683,        //  Smokin
373243,        //  Something About You 
370419,        //  Song With A Mission 
334821,        //  Sprode 
364487,        //  Sugar Magnolia 
453017,        //  Sweet Leaf 
554974,        //  Synchronicity II 
385074,        //  Teenage Lobotomy 
340789,        //  Ten Speed 
201172,        //  The Collector 
512106,        //  The Kill 
687073,        //  The Number Of The Beast 
439111,        //  The Perfect Drug 
9999999,        //  Thrasher 
535677,        //  Truckin' 
433146,        //  Truth Hits Everybody 
539077,        //  War Pigs 
359124,        //  We Care A Lot 
428321,        //  Why Do You Love Me? 
478008,        //  Wonderwall 
685867,        //  Working Man 
210511,        //  Still Alive
433643,        //  Message In A Bottle
271796,        //  Call Me
500243,        //  Simple Man
425601        //  Saints Of Los Angeles
]
		} else return;

	} else if (size==4) {
		// All FULL BAND

			cutoffs = [
817822,        //  Say it Ain't So
1460885,        //  In Bloom
934000,        //  I Think I'm Paranoid
600900,        //  Mississippi Queen
1115034,        //  Here It Goes Again
874012,        //  29 Fingers
1016185,        //  Creep
654189,        //  Wave of Mutilation
953516,        //  Should I Stay or Should I Go
935151,        //  Maps
1935541,        //  Seven
1346570,        //  Gimme Shelter
934716,        //  Sabotage
993129,        //  Blitzkrieg Bop
1070262,        //  Celebrity Skin
906117,        //  I'm So Sick
935290,        //  Time We Had
1099856,        //  When You Were Young
1110991,        //  Black Hole Sun
865006,        //  Blood Doll
1025958,        //  Wanted Dead or Alive
1324727,        //  Day Late, Dollar Short
1281764,        //  Learn to Fly
1055724,        //  Nightmare
1035972,        //  Orange Crush
808316,        //  Main Offender
1156747,        //  The Hand That Feeds
1518902,        //  Epic
1454768,        //  Suffragette City
1574619,        //  Ballroom Blitz
1437380,        //  Dead on Arrival
1569813,        //  Train Kept a Rollin'
1102795,        //  Are You Gonna Be My Girl
966827,        //  Pleasure (Pleasure)
1072345,        //  Paranoid
682969,        //  Brainpower
1856101,        //  Welcome Home
1060677,        //  Can't Let Go
1229013,        //  Go With the Flow
1451067,        //  Dani California
1649572,        //  (Don't Fear) The Reaper
1423451,        //  I Get By
1679470,        //  Outside
1255642,        //  Reptilia
1259678,        //  Electric Version
927144,        //  Vasoline
1053337,        //  Detroit Rock City
837339,        //  Timmy & the Lords of the Underworld
1206857,        //  Next To You
1618020,        //  Cherub Rock
1171496,        //  Tom Sawyer
1545532,        //  Enter Sandman
2591900,        //  Green Grass and High Tides
2095148,        //  Highway Star
1865403,        //  Foreplay/Long Time
1594167,        //  Flirtin' With Disaster
2160358,        //  Won't Get Fooled Again
1760085,        //  Run to the Hills
9999999,        //  …And Justice for All 
1094711,        //  3’s & 7’s 
1070419,        //  Action 
1211787,        //  All the Small Things 
1342119,        //  Attack 
9999999,        //  Bang a Gong 
1112280,        //  Beethoven's C*** 
9999999,        //  Blackened 
9999999,        //  Blinded By Fear 
986735,        //  Brass In Pocket 
1023330,        //  Buddy Holly 
928773,        //  Calling Dr. Love
1176624,        //  Can’t Stand Losing You 
1506128,        //  Casey Jones 
9999999,        //  Cherry Bomb 
1187408,        //  China Cat Sunflower 
1134740,        //  Complete Control 
1108189,        //  Crushcrushcrush 
1281779,        //  Die, All Right! 
1061324,        //  Dirty Little Secret 
1127858,        //  D.O.A.
1239360,        //  Don't Look Back In Anger 
1218966,        //  El Scorcho 
1248755,        //  Ever Fallen In Love 
782153,        //  Fortunate Son 
1529607,        //  Franklin's Tower 
1398620,        //  Gimme Three Steps 
1164764,        //  Hard To Handle 
1646385,        //  Heroes 
1148641,        //  Hitch a Ride 
978706,        //  I Fought The Law 
1069557,        //  I Need A Miracle 
909788,        //  Interstate Love Song 
1205882,        //  Joker & The Thief 
1041605,        //  Juke Box Hero 
1042249,        //  Last Train to Clarksville 
1301032,        //  Limelight 
1179998,        //  Little Sister 
1542732,        //  Live Forever 
1156326,        //  March of The Pigs 
1110110,        //  Moonage Daydream 
1152115,        //  More Than A Feeling 
1463143,        //  Move Along 
1285726,        //  My Iron Lung 
1442567,        //  My Sharona 
1376754,        //  N.I.B
1608195,        //  Peace of Mind 
9999999,        //  Queen Bitch 
9999999,        //  Ride the Lightning 
1616130,        //  Roam 
1177036,        //  Rock and Roll Band 
1183294,        //  Rock Rebellion 
1252993,        //  Rockaway Beach 
850098,        //  Roxanne 
1290997,        //  Sex Type Thing 
1501690,        //  Shake 
1249663,        //  Shockwave 
9999999,        //  Sick, Sick, Sick 
1146771,        //  Siva 
1523491,        //  Smokin
1153246,        //  Something About You 
1181680,        //  Song With A Mission 
1198520,        //  Sprode 
1639074,        //  Sugar Magnolia 
9999999,        //  Sweet Leaf 
1506102,        //  Synchronicity II 
911233,        //  Teenage Lobotomy 
1221851,        //  Ten Speed 
1068651,        //  The Collector 
1410173,        //  The Kill 
1837509,        //  The Number Of The Beast 
9999999,        //  The Perfect Drug 
9999999,        //  Thrasher 
1916210,        //  Truckin' 
1345780,        //  Truth Hits Everybody 
1690356,        //  War Pigs 
1129930,        //  We Care A Lot 
1413052,        //  Why Do You Love Me? 
1439936,        //  Wonderwall 
1874484,        //  Working Man 
1013894,        //  Still Alive
1766290,        //  Message In A Bottle
1092927,        //  Call Me
1643171,        //  Simple Man
1166482        //  Saints Of Los Angeles
];

	} else return;
} else return;

if (document.URL.substr(30,17)=='manage_scores.php') {
	scoreCol = 7; songCol = 5;
} else if (document.URL.substr(30,10)=='scores.php') {
	scoreCol = 5; songCol = 3;
} else return;

var trs = document.getElementsByTagName('tr');
for(i = 0; i < trs.length; i++)
{
	tds = trs[i].getElementsByTagName('td');
	if (tds.length > scoreCol) {
		song = songs.indexOf(tds[songCol].textContent);
		if (song!=-1) {
			scoreCell = tds[scoreCol];
			score = removeNonNumbers(scoreCell.textContent);
			if(score < cutoffs[song]) {
				var difference = cutoffs[song] - score;
				scoreCell.innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutoffs[song]) + '</font> <font color="red" style="font-size:8px">(-' + addCommas(difference) + ')</font>';
			} else if(score > cutoffs[song]) {
				var difference = score - cutoffs[song];
				scoreCell.innerHTML += '<br/><font color="black" style="font-size: 10px">' + addCommas(cutoffs[song]) + '</font> <font color="green" style="font-size:8px">(+' + addCommas(difference) + ')</font>';
			} else if(score = cutoffs[song]) {
				var difference = score - cutoffs[song];
				scoreCell.innerHTML += '<br/><font color="black" style="font-size: 10px">' + addCommas(cutoffs[song]) + '</font> <font color="blue" style="font-size:8px">(' + addCommas(difference) + ')</font>';		
			}
		}
	}
}
