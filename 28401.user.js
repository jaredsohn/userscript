// ==UserScript==

// @name           Highlight Attributes

// @namespace      http://goallinebliz.com

// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*

// ==/UserScript==
window.setTimeout( function() 
{


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

function testFunc(testing)
{
	var testContainer = document.getElementById("attribute_list").firstChild;
	var testElement = document.createElement("p");
	testElement.innerHTML = testing;
	//testContainer.appendChild(testElement);
	testContainer.parentNode.insertBefore(testElement,testContainer);
}

function build(n,keyAt,otherAt,example)
{
	this.name = n;
	this.url = example;
	this.keys = keyAt.split(",");
	this.other = otherAt.split(",");
}

var positionText = document.getElementById("position").innerHTML;
var position = positionText.substring(positionText.indexOf(": ")+2);
var buildTypes = new Array();
var AucklandThread = "http://mbd.scout.com/mb.aspx?S=192#s=192&f=2495&t=2566955&p=1";

if(position == "FB")
{
	buildTypes[0] = new build("Balanced","Blocking,Strength,Speed","Agility,Vision","http://goallineblitz.com/game/player.pl?player_id=70335");
	buildTypes[1] = new build("Blocking","Blocking,Strength,Vision","Agility,Speed","http://goallineblitz.com/game/player.pl?player_id=113087");
	buildTypes[2] = new build("Rushing","Agility,Strength,Vision","Carrying,Blocking","http://goallineblitz.com/game/player.pl?player_id=27426");
	buildTypes[3] = new build("Auckland FB","Strength,Blocking,Agility,Carrying","Confidence,Vision,Catching,Tackling,Stamina",AucklandThread);

}
else if(position == "QB")
{
	buildTypes[0] = new build("Pocket","Throwing,Vision,Strength","Confidence,Agility","http://goallineblitz.com/game/player.pl?player_id=50738");
	buildTypes[1] = new build("Rushing","Speed,Agility,Vision","Throwing,Strength,Confidence","#");
	buildTypes[2] = new build("Auckland QB","Strength,Throwing,Vision,Confidence,Stamina","Agility,Jumping,Carrying,Speed,Catching",AucklandThread);
}
else if(position == "HB")
{
	buildTypes[0] = new build("Power","Agility,Strength,Speed","Vision,Carrying","http://goallineblitz.com/game/player.pl?player_id=143990");
	buildTypes[1] = new build("Elusive/Speed","Speed,Agility,Vision","Strength,Carrying","http://goallineblitz.com/game/player.pl?player_id=234173");
	buildTypes[2] = new build("Dual Threat Running/Catching","Agility,Catching,Vision","Speed,Carrying,Strength","#");
	buildTypes[3] = new build("KR/PR","Speed,Agility","Vision","http://goallineblitz.com/game/player.pl?player_id=43165");
	buildTypes[4] = new build("Auckland HB","Agility,Speed,Strength,Vision,Confidence,Carrying","Catching,Blocking,Jumping,Throwing,Stamina",AucklandThread);

}
else if(position == "WR")
{
	buildTypes[0] = new build("Speed","Speed,Agility","Catching,Vision,Jumping","http://goallineblitz.com/game/player.pl?player_id=96246");
	buildTypes[1] = new build("Possession","Catching,Agility,Speed","Jumping,Vision,Confidence","http://goallineblitz.com/game/player.pl?player_id=27220");
	buildTypes[2] = new build("Balanced","Catching,Agility,Speed","Jumping,Vision","http://goallineblitz.com/game/player.pl?player_id=73885");
	buildTypes[3] = new build("KR/PR","Speed,Agility","Vision","http://goallineblitz.com/game/player.pl?player_id=43165");
	buildTypes[4] = new build("Auckland WR","Speed,Agility,Catching,Jumping,Vision,Stamina","Confidence,Carrying",AucklandThread);
}
else if(position == "TE")
{
	buildTypes[0] = new build("Recieving","Catching,Speed,Agility,Strength","Vision,Jumping","http://goallineblitz.com/game/player.pl?player_id=102646");
	buildTypes[1] = new build("Blocking","Blocking,Strength","Agility,Vision","http://goallineblitz.com/game/player.pl?player_id=268731");
	buildTypes[2] = new build("Balanced","Blocking,Strength,Catching","Agility,Vision","http://goallineblitz.com/game/player.pl?player_id=139990");
	buildTypes[3] = new build("Auckland TE","Strength,Blocking,Catching,Vision","Agility,Speed,Confidence,Carrying,Stamina,Tackling",AucklandThread);

}
else if(position == "C")
{
	buildTypes[0] = new build("Center","Blocking,Strength,Vision,Agility","Speed,Confidence","http://goallineblitz.com/game/player.pl?player_id=35473");
	buildTypes[1] = new build("Balanced O-lineman","Strength,Blocking","Vision,Agility,Speed","http://goallineblitz.com/game/player.pl?player_id=73347");
	buildTypes[2] = new build("Auckland C","Strength,Blocking","Confidence,Agility,Vision,Tackling,Stamina",AucklandThread);
}
else if(position == "G")
{
	buildTypes[0] = new build("Right Guard","Speed,Agility,Strength,Blocking","Vision","http://goallineblitz.com/game/player.pl?player_id=32210");
	buildTypes[1] = new build("Left Guard","Strength,Blocking","Vision,Agility ","http://goallineblitz.com/game/player.pl?player_id=73965");
	buildTypes[2] = new build("Balanced O-lineman","Strength,Blocking","Vision,Agility,Speed","http://goallineblitz.com/game/player.pl?player_id=73347");
	buildTypes[3] = new build("Auckland G","Strength,Blocking,Confidence","Agility,Vision,Tackling,Stamina",AucklandThread);

}
else if(position == "OT")
{
	buildTypes[0] = new build("ROT","Strength,Blocking","Vision,Agility,Speed","http://goallineblitz.com/game/player.pl?player_id=33093");
	buildTypes[1] = new build("LOT","Strength,Blocking,Agility","Vision,Speed","http://goallineblitz.com/game/player.pl?player_id=42216");
	buildTypes[2] = new build("Balanced O-lineman","Strength,Blocking","Vision,Agility,Speed","http://goallineblitz.com/game/player.pl?player_id=73347");	
	buildTypes[3] = new build("Auckland OT","Strength,Blocking,Confidence,Agility,Vision","Tackling,Stamina",AucklandThread);

}
else if(position == "DT")
{
	buildTypes[0] = new build("Run Stopping","Strength,Agility","Tackling,Vision","http://goallineblitz.com/game/player.pl?player_id=235603");
	buildTypes[1] = new build("Pass Rush","Strength,Agility","Speed,Vision,Tackling","http://goallineblitz.com/game/player.pl?player_id=235671");
	buildTypes[2] = new build("Balanced","Strength,Agility,Tackling","Vision,Speed","http://goallineblitz.com/game/player.pl?player_id=26849");
	buildTypes[3] = new build("Auckland DT","Strength,Tackling,Agility","Blocking,Confidence,Vision,Speed,Stamina",AucklandThread);

}
else if(position == "DE")
{
	buildTypes[0] = new build("Run Stopping","Strength,Agility,Tackling","Vision,Speed","#");
	buildTypes[1] = new build("Pass Rush","Strength,Agility","Speed,Vision,Tackling","http://goallineblitz.com/game/player.pl?player_id=102668");
	buildTypes[2] = new build("Balanced","Strength,Agility","Vision,Tackling,Speed","http://goallineblitz.com/game/player.pl?player_id=185710");
	buildTypes[3] = new build("Auckland DE","Strength,Tackling,Agility,Speed","Blocking,Confidence,Vision,Jumping,Stamina",AucklandThread);

}
else if(position == "LB")
{
	buildTypes[0] = new build("Blitzing LOLB","Speed,Agility,Vision,Strength","Tackling","http://goallineblitz.com/game/player.pl?player_id=116529");
	buildTypes[1] = new build("Coverage LOLB","Speed,Agility,Vision","Jumping,Tackling,Catching","#");
	buildTypes[2] = new build("Run Stuffing LOLB","Speed,Agility,Vision,Tackling","Strength","http://goallineblitz.com/game/player.pl?player_id=27087");
	buildTypes[3] = new build("Run Stuffing MLB","Tackling,Strength,Vision","Agility,Speed","http://goallineblitz.com/game/player.pl?player_id=32103");
	buildTypes[4] = new build("ROLB","Tackling,Agility,Vision,Strength","Speed","http://goallineblitz.com/game/player.pl?player_id=36646");	
	buildTypes[5] = new build("Auckland LB","Strength,Vision,Tackling,Agility,Confidence,Stamina","Speed,Jumping,Blocking,Catching",AucklandThread);

}
else if(position == "CB")
{
	buildTypes[0] = new build("Cornerback","Speed,Agility,Vision","Jumping,Catching","http://goallineblitz.com/game/player.pl?player_id=33072");
	buildTypes[1] = new build("KR/PR","Speed,Agility","Vision","http://goallineblitz.com/game/player.pl?player_id=43165");
	buildTypes[2] = new build("Auckland CB","Speed,Agility,Jumping,Vision,Catching,Stamina","Strength,Tackling,Confidence,Carrying",AucklandThread);

}
else if(position == "SS")
{
	buildTypes[0] = new build("Run Stuffing","Vision,Tackling,Strength","Speed,Agility","#");
	buildTypes[1] = new build("Coverage","Speed,Vision","Agility,Tackling,Jumping","http://goallineblitz.com/game/player.pl?player_id=26755");
	buildTypes[2] = new build("Balanced","Speed,Vision,Tackling","Strength,Agility","http://goallineblitz.com/game/player.pl?player_id=95567");	
	buildTypes[3] = new build("Auckland SS","Strength,Speed,Vision,Tackling,Stamina","Agility,Jumping,Confidence,Blocking,Catching,Carrying",AucklandThread);

}
else if(position == "FS")
{
	buildTypes[0] = new build("Run Stuffing","Vision,Tackling,Strength","Speed,Agility","#");
	buildTypes[1] = new build("Coverage","Speed,Vision","Agility,Tackling,Jumping","http://goallineblitz.com/game/player.pl?player_id=40458");
	buildTypes[2] = new build("Balanced","Speed,Vision,Tackling","Strength,Agility","http://goallineblitz.com/game/player.pl?player_id=31310");
	buildTypes[3] = new build("Auckland FS","Speed,Vision,Tackling,Catching,Stamina","Agility,Jumping,Strength,Confidence,Blocking,Carrying",AucklandThread);

}
else if(position == "K")
{
	buildTypes[0] = new build("Kicker","Kicking,Strength,Vision","Confidence,Agility,Speed","http://goallineblitz.com/game/player.pl?player_id=28748");	
	buildTypes[1] = new build("Auckland K","Kicking,Confidence","Strength,Vision,Agility,Speed,Jumping,Throwing",AucklandThread);

}
else if(position == "P")
{
	buildTypes[0] = new build("Punter","Punting","Strength,Vision,Agility,Speed,Jumping,Confidence","http://goallineblitz.com/game/player.pl?player_id=28642");
	buildTypes[1] = new build("Auckland P","Punting,Confidence","Strength,Vision,Agility,Speed,Jumping,Throwing",AucklandThread);

}



var container = document.getElementById("attribute_list");

var selectBuild = document.createElement("select");
selectBuild.id = "selectBuild";
var options = "<option value=''>Select Build Type</option>";

for(var i=0; i<buildTypes.length; i++)
{
	options+="<option value='"+buildTypes[i].name+"'>"+buildTypes[i].name+"</option>";
}

selectBuild.innerHTML = options;
container.insertBefore(selectBuild,container.firstChild);

var selectBuildElement = document.getElementById("selectBuild");
selectBuildElement.addEventListener("change",highlight,true);


function highlight()
{

var oSelect = document.getElementById("selectBuild");
var selectedName = oSelect.options[oSelect.selectedIndex].value;
var type;
if(selectedName!='')
{
	for(var i=0; i<buildTypes.length; i++)
	{
		if(buildTypes[i].name == selectedName)
			type = buildTypes[i];
	}
	var exampleURL = document.getElementById("exampleURL");
	if(!exampleURL){
		exampleURL = document.createElement("a");
		exampleURL.id="exampleURL";
	}
	var importantColor = "#59FF61";
	var otherColor = "#59CDFF";
	var colorKeyDiv = document.getElementById("colorKeyDiv");
	if(!colorKeyDiv)
	{
		colorKeyDiv = document.createElement("div");	
		colorKeyDiv.id = "colorKeyDiv";
		colorKeyDiv.innerHTML = "<span style='background:#59FF61;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-Major <span style='background:#59CDFF;'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-Minor";
		container.insertBefore(colorKeyDiv,oSelect.firstSibling);
	}
	exampleURL.href=type.url;
	exampleURL.innerHTML="Example Build";
	container.insertBefore(exampleURL,oSelect.firstSibling);
	
	var attributes = getElementsByClassName("attribute_name",document);

	

	for(var i=0; i<attributes.length; i++)
		attributes[i].style.background="none";

	for(var i=0; i<type.keys.length; i++)
	{
		for(var j=0; j<attributes.length; j++)
		{
			if(type.keys[i] == attributes[j].innerHTML)
			{	
				attributes[j].style.background = importantColor;
			}
		}
	}

	for(var i=0; i<type.other.length; i++)
	{
		for(var j=0; j<attributes.length; j++)
		{
			if(type.other[i] == attributes[j].innerHTML)
			{	
				attributes[j].style.background = otherColor;
			}
		}
	}	
}
}

},100);