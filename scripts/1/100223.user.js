// ==UserScript==
// @name           AutoFill
// @namespace      Dillon 
// @description    Auto fills forms with random data
// ==/UserScript==

function findElements(){}
function getRandomString(){}
function getRandomNumber1(){}

window.onload=function()
{
findElements();
};

findElements()
{
        var elem = document.childNodes;
        
        
        	
        	for(var i = 0; i < elem.length; i++)
        		{
        		if (elem[i].childNodes === null)
        			{
				if(typeof(elem[i] === "object"))
					{try { elem[i].innerHTML=getRandomString();}catch(err){}}
				}
			else
				{
				for(var k = 0; k < elem[i].childNodes.length; k++)
					{
					if (elem[i].childNodes[k].childNodes === null)
						{
						if(typeof(elem[i].childNodes[k].childNodes === "object"))
							{try { elem[i].innerHTML=getRandomString();}catch(err){}}
						}
					}
				}
			}
					

}

function getRandomString()
{
	var alphabet= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	var i = 0;
	var loopCount= getRandomNumber1(10);
	var string = "";
		while(i<loopCount)
			{
			string= string + alphabet[getRandomNumber1(25)]
			i++;
			}
	return string;
}


function getRandomNumber1(upperLimit)
{
var randomNumber;
var signOfParameter;
if (upperLimit < 1)
{
signOfParameter=-1;
upperLimit=Math.abs(upperLimit);
}
else
{
signOfParameter=1;
}
upperLimit= Math.floor(upperLimit);
randomNumber=Math.floor(Math.random()*(upperLimit + 1));
randomNumber=randomNumber*signOfParameter;
return randomNumber;
}