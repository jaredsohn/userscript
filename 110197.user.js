// ==UserScript==
// @name       Report2Image
// @namespace  http://report2image.tk/
// @version    0.2
// @description  Jotta scripti toimisi, sinun on asennettava myös CR-Converter, ja laitettava se ensimmäiseksi suoritettavaksi scriptiksi.
// @include    http://s*.fi.ikariam.com/index.php?view=militaryAdvisorReportView&combatId=*
// @copyright  2011+, Vili Kinnunen
// ==/UserScript==

function createBox()
	{
	var element = document.getElementById("backTo");
	var box = document.createElement('div');
	var innerHTML = '<div class="dynamic" id="Report2Image">';
	innerHTML += '<h3 class="header">Report2Image</h3>';
	innerHTML += '<div class="content">';
        innerHTML += '<br><center><form action="http://report2image.tk/report2image/image.php" method="post" target="_blank"><textarea id="text123" style="display:none;" name="text"></textarea><input type="submit" value="Convert"></center><br>';
	innerHTML += '</div><div class="footer"></div></div>';
	box.innerHTML = innerHTML;
	element.parentNode.insertBefore(box, element.nextSibling);
	}

createBox();

var text2 = document.getElementsByTagName("textarea")[1].value;

var text = document.getElementById("text123");
var arr = text2.split("\n");

for (i=0;i<=arr.length - 1; i++)
	{
	if (i != arr.length - 1)
		{
		arr[i] = arr[i] + "#";
		if (arr[i].match("Voittajat:") == null)
			{
			arr[i] = "|"+getColor(i,arr.length)+"|"+arr[i];
			}
		else
			{
			arr[i] = "|0,0,112|"+arr[i];
			}
		}
	}
arr[arr.length-1] = "|55,25,1|Created using Ikariam CR-Converter and Report2Image";

for (z=0;z<=arr.length - 1; z++)
	{
	text.value=text.value+arr[z];
	}

for (i=0; i<= 500; i++)
{
   text.value=text.value.replace("ä","a").replace("ö","o"); 
}

function getColor(line,arrlength)
	{
	if (line == 0 || line == 1)
		{
		return "0,0,112";
		}
		
	if (line == 3)
		{
		return "112,0,0";
		}
		
	if (line == 5)
		{
		return "0,112,0";
		}
		
	else
		{
		return "55,25,1";
		}
	}