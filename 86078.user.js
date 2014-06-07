// ==UserScript==
// @name           Coordinate Collector 3
// @namespace      Coordinate Collector 3
// @description    Coordinate Collector 3
// @include        http://s*.fi.ikariam.com/index.php*
// ==/UserScript==

GM_registerMenuCommand("Vaihda CoordinateCollector tietokannan tunnus",changePass);

if (document.getElementById("island") == null) return;

var s = location.href.split("http://s")[1].split(".")[0];

var pass = GM_getValue("pass"+s);
if (pass == undefined)
	{
	var newpass = prompt("Anna Coordinate-Collector tietokannan tunnus, jos tämän kyseisen serverin liittoumalla on sellainen (jos ei, anna olla tuon 'osoite|salasana')","osoite|salasana");
	if (newpass != null)
		{
		GM_setValue("pass"+s,newpass);
		location.href=location.href;
		}
	}
	
var url = pass.split("|")[0];
var password = pass.split("|")[1];

function changePass()
	{
	var newpass = prompt("Anna Coordinate-Collector tietokannan tunnus",pass);
	if (newpass != null)
		{
		GM_setValue("pass"+s,newpass);
		location.href=location.href;
		}
	}
	
for (i = 0; i <= 16; i++)
	{
	getCityData(i);
	}
	
function addToDatabase(info)
	{
	var city = { 'name' : info[1], 'size' : info[2], 'id' : info[4], 'coords' : info[0], 'playerId' : info[7], 'playerName' : info[3], 'allyName' : info[5], 'allyId' : info[6], 'islandId' : info[8] }
	request(city);
	}
	
function getCityData(place)
	{
	if (document.getElementById("cityLocation"+place).innerHTML.match('<div class="ownCityImg"></div>') == null && document.getElementById("cityLocation"+place).className != "cityLocation buildplace" && document.getElementById("cityLocation"+place).className != "cityLocation premiumBuildPlace")
		{
		var islandCoords = document.getElementById("breadcrumbs").innerHTML.split('<span class="island">')[1].split("</span>")[0].split("[")[1].split("]")[0];
		var cityHTML = document.getElementById("cityLocation"+place).innerHTML;
		for (x=1; x<=2000; x++)
			{
			var cityHTML = cityHTML.replace(" ","");
			var cityHTML = cityHTML.replace("	","");
			}
		var cityName = cityHTML.split('<tdcolspan="3">')[1].split("(")[0];
		var citySize = cityHTML.split(cityName+'(')[1].split(")")[0];
		var cityOwner = cityHTML.split('<tdcolspan="2">')[1].split("</td>")[0];
		var cityId = cityHTML.split('<ahref="#"id="city_')[1].split('"')[0];
		var playerId = cityHTML.split('receiverId=')[1].split('"')[0];
		var islandId = document.getElementById("cityNav").innerHTML.split('name="id" value="')[1].split('"')[0];
		if (cityHTML.match('allyId') == "allyId")
			{
			var allyId = cityHTML.split('allyId=')[1].split('&')[0];
			var allyName = cityHTML.split('id='+islandId+'">')[1].split('</a>')[0];
			}
		else
			{
			var allyId = "-"
			var allyName = "-"
			}
		var cityInformation = new Array(islandCoords,cityName,citySize,cityOwner,cityId,allyName,allyId,playerId,islandId);
		addToDatabase(cityInformation);
		}
	
	}

function request(data)
	{
	var d = "cityName="+data['name']+"&citySize="+data['size']+"&cityId="+data['id']+"&islandCoords="+data['coords']+"&playerId="+data['playerId']+"&playerName="+data['playerName']+"&allyName="+data['allyName']+"&allyId="+data['allyId']+"&islandId="+data['islandId']+"&pass="+password;
	GM_xmlhttpRequest({
	  method: "POST",
	  url: url+"submit.php",
	  data: d,
	  headers: {
		"Content-Length": d.length,
		"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
	  },
	  onload: function(response) {
		}
	});
	}