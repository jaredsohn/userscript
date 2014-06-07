// ==UserScript==
// @name          Ogame Cargo
// @namespace     http://www.example.com/gmscripts
// @description   Displays the sum of all your resources in motion.
// @require 	  http://code.jquery.com/jquery-1.7.1.js
// @include		  http://*.ogame.*/game/index.php?page=movement
// @creator 	  Johnsen92
// @version       1.0
// ==/UserScript==
$(document).ready(
    function() {
		var restmp = new Array(0,0,0);
		var res = new Array(0,0,0);
		$('.fleetDetails').each( function() {
			var tabla = $(this).find('.starStreak .route div table');
			restmp = getRecursosFlota(tabla);
			res[0]+=parseInt(delPoints(restmp[0]));
			res[1]+=parseInt(delPoints(restmp[1]));
			res[2]+=parseInt(delPoints(restmp[2]));
		});
		$("#inhalt").append('<div style="height: 85px; background: none repeat scroll 0 0 #0D1014; border: 1px solid #000000; color: #7C8E9A; font: 10px/24px Verdana,Arial,Helvetica,sans-serif; margin: 5px auto 0; overflow: hidden; position: relative; width: 656px;">&nbsp;&nbsp;Resources in motion:<br><table style="width: 100%; padding: 0px;"><tr><td style="text-align: center; width: 33%; padding: 0px;"><img src="http://gf3.geo.gfsrv.net/cdn59/ccdb3fc0cb8f7b4fc8633f5f5eaa86.gif"><br>'+addPoints(res[0])+'</td><td style="text-align: center; width: 33%; padding: 0px;"><img src="http://gf2.geo.gfsrv.net/cdna9/452d7fd11d754e0f09ec2b2350e063.gif"><br>'+addPoints(res[1])+'</td><td style="text-align: center; width: 33%; padding: 0px;"><img  src="http://gf1.geo.gfsrv.net/cdn9c/e37d45b77518ddf8bbccd5e772a395.gif"><br>'+addPoints(res[2])+'</td></tr></table>');
		$("#inhalt").append('<div style="height: 20px; margin-top: 10px;"></div>');
	}
)
function getRecursosFlota(tabla)
{
	var recursos = new Array(0,0,0);
	var i = 0;
	var trs = tabla.find('tr').length;
	tabla.find('tr').each( function( intIndex ) {
		if (intIndex>=(trs-3))
		{
			recursos[i] = jQuery.trim( $(this).find('td:last').html() );
			i++;
		}
	});
	return recursos;
}

function delPoints(str)
{	var newstr="";
	for(var i=0; i<str.length; i++)
	{	if(str[i]!='.')
		{	newstr+=str[i];
		}
	}
	return newstr;
}

function addPoints(num)
{	var str="";
	for(var i=0;i<num.toString().length;i++)
	{	str+=num.toString()[i];
		if((num.toString().length-i-1)%3==0&&(i+1)!=num.toString().length)
			str+='.';
	}
	return str;
}