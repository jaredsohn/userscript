// Crown of Thrones spoiler display
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// This is a user script.  To install it, you need Greasemonkey 0.8 or
// later. Get it at https://addons.mozilla.org/en-US/firefox/addon/748
// To uninstall, go to Tools/Manage User Scripts, select "Throne Spoiler",
// check "Also uninstall associated preferences" and click "Uninstall".
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// 
// ==UserScript==
// @name           	Throne Spoiler
// @namespace      	http://noblesse-oblige.org/Hellion/throne
// @include        	*kingdomofloathing.com/familiar.php
// @description    	Display info about what a familiar will do when placed in the Crown of Thrones
// @version			0.21
// @author			Hellion
// @require     	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var FamArray = {
1:["+20% Weapon Damage","5-6 MP (1st 3 rounds)"],
2:["+20% Meat","5-15 meat (1st 3 rounds)"],
3:["+20% Initiative","5-6 HP, 3-4 MP (1st 3 rounds)"],
4:["+15% Muscle","goat cheese pizza"],
5:["+15% Moxie","delevel"],
6:["+10 All Attributes","30% chance to stun"],
7:["+5 Fam Wt","stun"],
8:["+5 Fam Wt","30% chance to do 11-30 damage"],
9:["+10% Spell Damage","30% chance to do 10-15 <font color='green'>stench</font> and <font color='blueviolet'>sleaze</font> damage"],
10:["+15% Muscle","20-30 damage (lose 10-15 HP)"],
11:["+15% Mysticality","33% chance to do 20-25 spooky</font> damage"],
12:["+2 Mox stats/fight","30% chance to do 15-20 <font color='gray'>spooky</font> damage"],
13:["(LOOKIT ME, I'M NOT HERE)","Hyuk hyuk"],
14:["Regenerate 2-8 HP, MP","30% chance to do 15-25 <font color='green'>stench</font> damage"],
15:["+10 Weapon Damage","3-5 HP, 3-5 MP (1st 3 rounds)"],
16:["+10 All Attributes","white chocolate chips"],
17:["+10% Spell Damage","?-100 damage"],
18:["+2 Mys stats/fight","30% chance to do 15-25 <font color='gray'>spooky</font> damage"],
19:["+5 Fam Wt","8-10 HP (1st 3 rounds)"],
20:["+2 Mus stats/fight","8-10 HP (1st 3 rounds)"],
21:["+10% Spell Damage","15-25 <font color='blue'>cold</font> damage"],
22:["+20% Meat","5-6 MP"],
23:["+2 Mys stats/fight","8-10 HP (1st 3 rounds)"],
24:["+2 Mox stats/fight","8-10 HP (1st 3 rounds)"],
25:["+20% Meat","5-15 meat (1st 3 rounds)"],
26:["+10 Weapon Damage","candy cane/cold hots candy/wint-o-fresh mint"],
27:["+10 All Attributes","delevel"],
28:["+10% Spell Damage","delevel"],
29:["+20% Initiative","5-6 HP and 3-4 MP (1st 3 rounds)"],
30:["+20% Initiative","stun"],
31:["+10 All Attributes","X HP, X MP (1st 3 rounds)"],
32:["+15% Moxie","delevel by 3-5 points (1st 3 rounds)"],
33:["+15% Muscle","30% chance to stun"],
34:["+20 <font color='red'>hot</font> damage","hot nuggets"],
35:["+20 <font color='blue'>cold</font> damage","cold nuggets"],
36:["+20 <font color='green'>stench</font> damage","stench nuggets"],
37:["+20 <font color='gray'>spooky</font> damage","spooky nuggets"],
38:["+15% Mysticality","block"],
39:["+2 Mys stats/fight","5-6 HP, 3-4 MP (1st 3 rounds)"],
40:["(can't sit on throne)","(nothing)"],
41:["+20% Meat","chorizo brownie/WCT Pizza/carob chunk noodles"],
42:["+2 Mox stats/fight","18 damage"],
43:["+20% Initiative","5-8 meat (1st 3 rounds)"],
44:["Regenerate 2-8 HP, MP","Crimbo food"],
45:["So-So Resistance to All Elements","30% chance of 20-50 damage"],
46:["+15% Mysticality","5-6 HP, 3-4 MP (1st 3 rounds)"],
47:["+20% Initiative","(some) <font color='blueviolet'>sleaze</font> damage"],
48:["+10 All Attributes","10=15 HP, 8-10 MP (1st 3 rounds)"],
49:["+20 <font color='blueviolet'>sleaze</font> damage","sleaze nuggets"],
50:["+10 All Attributes","5-6 HP, 3-4 MP (1st 3 rounds)"],
51:["+15% Muscle","16 <font color='green'>stench</font> damage"],
52:["+15% Booze Drops","6-15 meat (1st 3 rounds)"],
53:["+10 Max HP/MP","2 Mushrooms on 3rd round"],
54:["(can't sit on throne)","(nothing)"],
55:["+5 Fam Wt","21-62 <font color='gray'>spooky</font> damage, 5-15 meat (1st 3 rounds)"],
56:["+15% Mysticality","5-6 MP (1st 3 rounds)"],
57:["+20% Meat","34 <font color='green'>stench</font> damage, 8-10 HP (1st 3 rounds)"],
58:["+2 Mox stats/fight","8-10 HP (1st 3 rounds)"],
59:["+15% Item Drops","blackberry"],
60:["+20% Initiative","5-6 MP (1st 3 rounds)"],
61:["+15% Moxie","5-6 MP (1st 3 rounds)"],
62:["+20% Initiative","stun"],
63:["So-So Resistance to All Elements","45 damage"],
64:["(HAHA THIS FAMILIAR DOESN'T EXIST YOU FOOL)",""],
65:["Regenerate 2-8 HP, MP","~30% chance of Crimbo food"],
66:["Regenerate 2-8 HP, MP","delevel"],
67:["-10 All Attributes","increase ML"],
68:["+5 Fam Wt","30% chance to do 15-30 damage"],
69:["+20 Weapon Damage","4-10 HP, 2-8 MP (1st 3 rounds)"],
70:["+10 Max HP/MP","20% chance to drop a bottle of tequila"],
71:["+15% Mysticality","delevel"],
72:["So-So Resistance to All Elements","19 damage"],
73:["+10% Spell Damage","5 MP"],
74:["+15% Food Drops","(regular/enchanted/jumping) bean burrito"],
75:["+20% Meat","16-20 HP, 9-11 MP (1st 3 rounds)"],
76:["+2 Mus stats","skeleton bone"],
77:["+10 All Attributes","delevel by 3-5"],
78:["So-So Resistance to All Elements","nothing"],
79:["+20% Initiative","22 <font color='blueviolet'>sleaze</font> damage"],
80:["+10 All Attributes","stun"],
81:["+10 ML","10-15 MP (1st 3 rounds)"],
82:["(can't sit on throne)","(nothing)"],
83:["Regenerate 2-8 HP, MP","~35% chance of (elemental) nuggets"],
84:["+20% Initiative","turtlemail bits/snailmail bits/turtle wax"],
85:["+5 Fam Wt","30% chance of 20-50 damage"],
86:["+15% Spell Damage","5-15 HP, 2-8 MP (1st 3 rounds)"],
87:["+5 Fam Wt","delevel by 5-9"],
88:["+2 Mox stats/fight","50% chance to stun"],
89:["+25% Meat","15-25 <font color='red'>hot</font> damage, delevel by 3-5 (1st 3 rounds)"],
90:["+10 Max HP/MP","5-6 MP (1st 3 rounds)"],
91:["+20% Initiative","cotton candy pinch"],
92:["(can't sit on throne)","(nothing)"],
93:["-10 All Attributes","lose 30-40 HP and 20-30 meat every round"],
94:["+2 Mys stats/fight","15-25 damage"],
95:["+20% Meat","delevel by 3-5 points"],
96:["+2 Mus stats/fight","15-25 damage"],
97:["+20 hot damage","15-25 damage"],
98:["+20% Meat ","15-25 damage"],
99:["Regenerate 2-8 HP, MP","delevel?"],
100:["+20% Initiative","22 <font color='blueviolet'>sleaze</font> damage"],
101:["+2 Mys stats/fight","20 damage"],
102:["+15% Muscle","33% chance to do 2x 15-20 damage"],
103:["+5 Fam Wt","30% chance to stun"],
104:["+15% Spell Damage","8-10 HP (1st 3 rounds)"],
105:["+2 stats/fight","2-4 prismatic damage"],
106:["+10% Spell Damage","30% chance to stun"],
107:["+20% Initiative","stun"],
108:["+2 Mus stats/fight","30% chance to do 15-25 <font color='gray'>spooky</font> damage"],
109:["+2 stats/fight","30% chance to do 40-50 damage"],
110:["+15% Muscle","5-15 meat (1st 3 rounds)"],
111:["+10 Max HP/MP","50% chance to stun"],
112:["+15% Weapon Drops","9-16 damage, delevel"],
113:["+10 All Attributes","5-15 meat (1st 3 rounds)"],
114:["+15% Spell Damage","11-15 MP (1st 3 rounds)"],
115:["+10 Weapon Damage","28 damage"],
116:["+20% Meat ","30% chance to do 15-25 <font color='blueviolet'>sleaze</font> damage"],
117:["+20% Initiative","30 <font color='gray'>spooky</font> damage"],
118:["+20% Meat ","delevel"],
119:["+2 Mus stats/fight","33% chance of 15-25 <font color='blueviolet'>sleaze</font> damage"],
120:["+10 All Attributes","a piece of candy"],
121:["+10% Spell Damage","stun"],
122:["+2 stats/fight","delevel by 3-5"],
123:["+10% All Attributes","BRICKO brick (1/combat)"],
124:["-10 All Attributes, +2 stats/fight","nothing"],
125:["",""],
126:["",""],
127:["",""],
128:["",""],
129:["",""],
130:["",""],
131:["",""],
132:["",""],
133:["",""],
134:["+10% Spell Damage","17 <font color='gray'>spooky</font> damage"],
135:["+10% Spell Damage","15-20 damage"],
136:["+10 All Attributes","10-20HP, 8-10MP (1st 3 rounds)"],
137:["+10 <font color='red'>hot</font> damage","volcanic ash"],
138:["+20% Meat","delevel"],
139:["+25% Meat","5-15 Meat (1st 3 rounds)"],
140:["+20% Meat","beertini/papaya slung/salty slug/tomato daiquiri"],
141:["+2 Myst stats/fight","delevels and heals 2-3 HP"],
142:["+3 stats/fight","(some) <font color='gray'>spooky</font> damage"],
143:["+10 All Attributes","eggnog/candy canes/gingerbread bugbear/fruitcake"],
144:["So-So Resistance to All Elements","(nothing)"],
145:["",""],
146:["+20% Meat","5-6 MP (1st 3 rounds)"]

};

var throneCheck = $('a.fave:first').text();
if (throneCheck.indexOf("Thrones") == -1) {
//	GM_log("Crown of Thrones not found in first fave-class <a> text.");
	return;
}
$('img[onclick*="fam"]').each(function(){
	var famID = this.getAttribute("onclick").match(/(\d+)/)[1];
//	GM_log("fam ID="+famID);
	if (famID > 146) return;
	$(this).parent().next().children("font").append("<font color='blue'>&nbsp;&nbsp;"+FamArray[famID][0]+";</font><font color='black'>&nbsp;&nbsp;"+FamArray[famID][1]+"</font>");
});

