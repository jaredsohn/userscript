// ==UserScript==
// @name Auto Battledomer
// @namespace http://nq2guy.tz/
// @description Automates One Player Challenger
// @include http://www.neopets.com/battledome/*
// ==/UserScript==

var strHTML = document.body.innerHTML; //For the purpose

//of looking for a text in a page.
var minRefresh = 1500;

//Min refresh rate.
var maxRefresh = 3100;

//Max refresh rate.
var refreshRate = (maxRefresh - minRefresh)*Math.random() + minRefresh; //Randomised click rate.
var select_PetandAbility = document.getElementsByTagName('select'); //Looks for elements that have dropdown

//menus.
var select_weapon = document.getElementsByTagName('http://images.neopets.com/items/alm_magic_compass.gif'); //Looks for elements that are

//images.
var fierce_id = 'abil_10013'; //Berserk

//ID. To change abilities, find the value of the ability by viewing the page source.
var pet_name = 'Conformiste';

//Insert your battling pet's name.
var enemy_id = '20';

//Insert challenger ID number only. Refer to the list below.

/* ID List(Alphabetical)
Advisor Broo 86
Balthazar 7
Boochi 90
Cave Chia 37
Chia Clown 31
Chiazilla 24
Commander Garoo 63
Count Von Roo 2
Down For Maintenance Pteri 103
Edna 5
Evil Sloth Clone 14
Eyrieki 159
Flaming Meerca 1
Ghost Lupe 66
Giant Ghostkerchief 89
Giant Hungry Malevolent Chomby 92
Grarrg 38
Greedy Kadoatie 157
Harry the Mutant Moehog 3
Highland Chia 27
Inflatable Balthazar 20
Jelly Chia 28
Kastraliss 105
Kasuki Lu 62
Kauvara 34
Koi Warrior 26
Lab Ray Scientist 104
Lady Frostbite 178
Lava Ghoul 13
Magnus the Torch 17
Meerca Henchmen 88
Meuka 60
Mootix Warrior 102
Mr. Chuckles 158
Mummy 4
Pant Devil 11
Plumbeard 87
Punchbag Bob/Punchbag Sid 57
Qasalan Mummy 153
Quiggle Warlord 32
Robo Grarrl 19
Ryshu The Nimmo 35
Sabre-X 39
Shadow Usul 18
Sidney 85
Slug Monster 125
Snow Beast 91
Snow Faerie 33
Space Faerie 12
Spider Grundo 25
Tax Beast 83
Tekkitu the Witch Doctor 61
The Black Pteri 30
The Brain Tree 9
The Esophagor 8
The Snowager 36
Tiki Tack Man 23
Turmaculus 93
Vira 65
Zafara Rogue 22

ID source:"http://thinkfacility.frihost.net/games/neochallengers.php" just in case I made any errors in copying

If I left out any IDs, simply hover over the opponent you want to fight and look at the redirect link below. The number

between the () is the ID.
*/

window.setTimeout(function() {

//If you are at the front page, this will redirect you to the page that allows you

//to choose your opponent.
if(document.location.href.match('battledome.phtml')) {


document.location.href="http://www.neopets.com/battledome/battledome.phtml?type=oneplayer&subtype=challenge";
}

//If you are at the opponent selection page, this will select the your battling

//pet and click the opponent you want to battle.
if(document.location.href.match('type=oneplayer&subtype=challenge')) {
for(var i=0; i<select_PetandAbility.length; i++){
if(select_PetandAbility[i].name == 'petselect') {
select_PetandAbility[i].value = pet_name;
}
}
document.location.href= "javascript:MakeOnePlayerChallenge("+enemy_id+")";
}

//If you are in battle, this will select the 2 fixed weapons and your ability to

//use throughout the entire battle.
if(document.location.href.match('fight.phtml')) {
document.location.href="javascript:activate_equip(1);";//Please change the

//numbers in the brackets to the weapon you want to use.
document.location.href="javascript:activate_equip(2);";//The numbers are

//the position your weapons are in from the left. Eg. If Lightning Beam is the second weapon from the left, the number would

//be 2.



for(var k=0; k<select_PetandAbility.length; k++) {
if(select_PetandAbility[k].name == 'selectmove') {
select_PetandAbility[k].value = fierce_id;
}
}
document.location.href="javascript:SubmitFightForm();";

//If you reach the page which says that you have beaten your opponent,

//this will redirect you to the end page. If you happen to lose or draw, an alert will pop up asking you to heal your pet.
if(strHTML.indexOf("You have beaten") > 1) {


document.location.href="http://www.neopets.com/battledome/battledome_fightend.phtml";
}
else if(strHTML.indexOf("You have lost this fight") > 1|strHTML.indexOf

("This match was a draw") > 1) {
alert('Heal your pet before battling again.');
}
}

//This will redirect you from the end page to the opponent selection page and

//restart the entire script again.
if(document.location.href.match('battledome_fightend.phtml')) {


document.location.href="http://www.neopets.com/battledome/battledome.phtml?type=oneplayer&subtype=challenge";
}
},refreshRate);