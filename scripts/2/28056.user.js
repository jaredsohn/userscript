// ==UserScript==
// @name           Highlight Major and Minor Attributes
// @namespace      Branden Guess
// @description    Highlights the major attributes for your player's position in red, and the minor attributes in blue.
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// ==/UserScript==
function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};


var position = document.getElementById('position')
var positionhtml = position.innerHTML
var list = document.getElementById('attribute_list')
var attributelist = getElementsByClassName("attributes", list)
var att = getElementsByClassName("attribute_name", attributelist[0])
var att1 = getElementsByClassName("attribute_name", attributelist[1])
var att2 = getElementsByClassName("attribute_name", attributelist[2])


if (positionhtml=="Position: WR") {
att[1].innerHTML = '<font color="red">Speed</font>';
att[2].innerHTML = '<font color="red">Agility</font>';
att[3].innerHTML = '<font color="red">Jumping</font>';
att1[1].innerHTML = '<font color="red">Vision</font>';
att1[0].innerHTML = '<font color="red">Stamina</font>';
att1[2].innerHTML = '<font color="blue">Confidence</font>';
att2[3].innerHTML = '<font color="red">Catching</font>';
att2[4].innerHTML = '<font color="blue">Carrying</font>';
};

if (positionhtml=="Position: QB") {
att[0].innerHTML = '<font color="red">Strength</font>';
att2[2].innerHTML = '<font color="red">Throwing</font>';
att1[1].innerHTML = '<font color="red">Vision</font>';
att1[2].innerHTML = '<font color="red">Confidence</font>';
att1[0].innerHTML = '<font color="red">Stamina</font>';
att[2].innerHTML = '<font color="blue">Agility</font>';
att[3].innerHTML = '<font color="blue">Jumping</font>';
att2[4].innerHTML = '<font color="blue">Carrying</font>';
att[1].innerHTML = '<font color="blue">Speed</font>';
att2[3].innerHTML = '<font color="blue">Catching</font>';
};

if (positionhtml=="Position: HB") {
att[2].innerHTML = '<font color="red">Agility</font>';
att[1].innerHTML = '<font color="red">Speed</font>';
att[0].innerHTML = '<font color="red">Strength</font>';
att1[1].innerHTML = '<font color="red">Vision</font>';
att1[2].innerHTML = '<font color="red">Confidence</font>';
att2[4].innerHTML = '<font color="red">Carrying</font>';
att2[3].innerHTML = '<font color="blue">Catching</font>';
att2[0].innerHTML = '<font color="blue">Blocking</font>';
att[3].innerHTML = '<font color="blue">Jumping</font>';
att2[2].innerHTML = '<font color="blue">Throwing</font>';
att1[0].innerHTML = '<font color="blue">Stamina</font>';
};

if (positionhtml=="Position: FB") {
att[0].innerHTML = '<font color="red">Strength</font>';
att2[0].innerHTML = '<font color="red">Blocking</font>';
att[2].innerHTML = '<font color="red">Agility</font>';
att2[4].innerHTML = '<font color="red">Carrying</font>';
att1[2].innerHTML = '<font color="blue">Confidence</font>';
att1[1].innerHTML = '<font color="blue">Vision</font>';
att2[3].innerHTML = '<font color="blue">Catching</font>';
att2[1].innerHTML = '<font color="blue">Tackling</font>';
att1[0].innerHTML = '<font color="blue">Stamina</font>';
};

if (positionhtml=="Position: C") {
att[0].innerHTML = '<font color="red">Strength</font>';
att2[0].innerHTML = '<font color="red">Blocking</font>';
att1[2].innerHTML = '<font color="blue">Confidence</font>';
att[2].innerHTML = '<font color="blue">Agility</font>';
att1[1].innerHTML = '<font color="blue">Vision</font>';
att2[1].innerHTML = '<font color="blue">Tackling</font>';
att1[0].innerHTML = '<font color="blue">Stamina</font>';
};

if (positionhtml=="Position: G") {
att[0].innerHTML = '<font color="red">Strength</font>';
att2[0].innerHTML = '<font color="red">Blocking</font>';
att1[2].innerHTML = '<font color="red">Confidence</font>';
att[2].innerHTML = '<font color="blue">Agility</font>';
att1[1].innerHTML = '<font color="blue">Vision</font>';
att2[1].innerHTML = '<font color="blue">Tackling</font>';
att1[0].innerHTML = '<font color="blue">Stamina</font>';
};

if (positionhtml=="Position: OT") {
att[0].innerHTML = '<font color="red">Strength</font>';
att2[0].innerHTML = '<font color="red">Blocking</font>';
att1[2].innerHTML = '<font color="red">Confidence</font>';
att[2].innerHTML = '<font color="red">Agility</font>';
att1[1].innerHTML = '<font color="red">Vision</font>';
att2[1].innerHTML = '<font color="blue">Tackling</font>';
att1[0].innerHTML = '<font color="blue">Stamina</font>';
};

if (positionhtml=="Position: TE") {
att[0].innerHTML = '<font color="red">Strength</font>';
att2[0].innerHTML = '<font color="red">Blocking</font>';
att2[3].innerHTML = '<font color="red">Catching</font>';
att1[1].innerHTML = '<font color="red">Vision</font>';
att[2].innerHTML = '<font color="blue">Agility</font>';
att[1].innerHTML = '<font color="blue">Speed</font>';
att1[2].innerHTML = '<font color="blue">Confidence</font>';
att2[4].innerHTML = '<font color="blue">Carrying</font>';
att1[0].innerHTML = '<font color="blue">Stamina</font>';
att2[1].innerHTML = '<font color="blue">Tackling</font>';
};

if (positionhtml=="Position: DT") {
att[0].innerHTML = '<font color="red">Strength</font>';
att2[1].innerHTML = '<font color="red">Tackling</font>';
att[2].innerHTML = '<font color="red">Agility</font>';
att2[0].innerHTML = '<font color="blue">Blocking</font>';
att1[2].innerHTML = '<font color="blue">Confidence</font>';
att1[1].innerHTML = '<font color="blue">Vision</font>';
att[1].innerHTML = '<font color="blue">Speed</font>';
att1[0].innerHTML = '<font color="blue">Stamina</font>';
};

if (positionhtml=="Position: DE") {
att[0].innerHTML = '<font color="red">Strength</font>';
att2[1].innerHTML = '<font color="red">Tackling</font>';
att[2].innerHTML = '<font color="red">Agility</font>';
att[1].innerHTML = '<font color="red">Speed</font>';
att2[0].innerHTML = '<font color="blue">Blocking</font>';
att1[2].innerHTML = '<font color="blue">Confidence</font>';
att1[1].innerHTML = '<font color="blue">Vision</font>';
att[3].innerHTML = '<font color="blue">Jumping</font>';
att1[0].innerHTML = '<font color="blue">Stamina</font>';
};

if (positionhtml=="Position: LB") {
att[0].innerHTML = '<font color="red">Strength</font>';
att1[1].innerHTML = '<font color="red">Vision</font>';
att2[1].innerHTML = '<font color="red">Tackling</font>';
att[2].innerHTML = '<font color="red">Agility</font>';
att1[2].innerHTML = '<font color="red">Confidence</font>';
att1[0].innerHTML = '<font color="red">Stamina</font>';
att[1].innerHTML = '<font color="blue">Speed</font>';
att[3].innerHTML = '<font color="blue">Jumping</font>';
att2[0].innerHTML = '<font color="blue">Blocking</font>';
att2[3].innerHTML = '<font color="blue">Catching</font>';
};

if (positionhtml=="Position: CB") {
att[1].innerHTML = '<font color="red">Speed</font>';
att[2].innerHTML = '<font color="red">Agility</font>';
att[3].innerHTML = '<font color="red">Jumping</font>';
att1[1].innerHTML = '<font color="red">Vision</font>';
att2[3].innerHTML = '<font color="red">Catching</font>';
att1[0].innerHTML = '<font color="red">Stamina</font>';
att[0].innerHTML = '<font color="blue">Strength</font>';
att2[1].innerHTML = '<font color="blue">Tackling</font>';
att1[2].innerHTML = '<font color="blue">Confidence</font>';
att2[4].innerHTML = '<font color="blue">Carrying</font>';
};

if (positionhtml=="Position: SS") {
att[0].innerHTML = '<font color="red">Strength</font>';
att[1].innerHTML = '<font color="red">Speed</font>';
att1[1].innerHTML = '<font color="red">Vision</font>';
att2[1].innerHTML = '<font color="red">Tackling</font>';
att1[0].innerHTML = '<font color="red">Stamina</font>';
att[2].innerHTML = '<font color="blue">Agility</font>';
att[3].innerHTML = '<font color="blue">Jumping</font>';
att1[2].innerHTML = '<font color="blue">Confidence</font>';
att2[0].innerHTML = '<font color="blue">Blocking</font>';
att2[3].innerHTML = '<font color="blue">Catching</font>';
att2[4].innerHTML = '<font color="blue">Carrying</font>';
};

if (positionhtml=="Position: FS") {
att[1].innerHTML = '<font color="red">Speed</font>';
att1[1].innerHTML = '<font color="red">Vision</font>';
att2[1].innerHTML = '<font color="red">Tackling</font>';
att2[3].innerHTML = '<font color="red">Catching</font>';
att1[0].innerHTML = '<font color="red">Stamina</font>';
att[2].innerHTML = '<font color="blue">Agility</font>';
att[3].innerHTML = '<font color="blue">Jumping</font>';
att[0].innerHTML = '<font color="blue">Strength</font>';
att1[2].innerHTML = '<font color="blue">Confidence</font>';
att2[0].innerHTML = '<font color="blue">Blocking</font>';
att2[4].innerHTML = '<font color="blue">Carrying</font>';
};

if (positionhtml=="Position: K") {
att2[5].innerHTML = '<font color="red">Kicking</font>';
att1[2].innerHTML = '<font color="red">Confidence</font>';
att[0].innerHTML = '<font color="blue">Strength</font>';
att1[1].innerHTML = '<font color="blue">Vision</font>';
att[2].innerHTML = '<font color="blue">Agility</font>';
att[1].innerHTML = '<font color="blue">Speed</font>';
att[3].innerHTML = '<font color="blue">Jumping</font>';
att2[2].innerHTML = '<font color="blue">Throwing</font>';
};

if (positionhtml=="Position: P") {
att2[6].innerHTML = '<font color="red">Punting</font>';
att1[2].innerHTML = '<font color="red">Confidence</font>';
att[0].innerHTML = '<font color="blue">Strength</font>';
att1[1].innerHTML = '<font color="blue">Vision</font>';
att[2].innerHTML = '<font color="blue">Agility</font>';
att[1].innerHTML = '<font color="blue">Speed</font>';
att[3].innerHTML = '<font color="blue">Jumping</font>';
att2[2].innerHTML = '<font color="blue">Throwing</font>';
};