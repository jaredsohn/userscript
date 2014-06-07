// ==UserScript==
// @name       DS-R collect purge stones info
// @namespace  http://www.ds-revolution.net/recipe_list.php?view=purge
// @version    0.2
// @description  will collect your breedstones info and input it in the page in a table that can be copied in excel
// @match      http://www.ds-revolution.net/recipe_list.php?view=purge
// @copyright  2012+, Krokador
// ==/UserScript==
var $ = unsafeWindow.jQuery;
$(document).ready(function(){
    var tResult = new Array();
    tResult.push("<table>");
    
    tResult.push("<tr>");
    tResult.push("<th>");
    tResult.push("breed");
    tResult.push("</th>"); 
    tResult.push("<th>");
    tResult.push("type");
    tResult.push("</th>");    
    tResult.push("<th>");
    tResult.push("skill");
    tResult.push("</th>");    
    tResult.push("<th>");
    tResult.push("damage");
    tResult.push("</th>");    
    tResult.push("<th>");
    tResult.push("damage%");
    tResult.push("</th>");    
    tResult.push("<th>");
    tResult.push("defense");
    tResult.push("</th>");    
    tResult.push("<th>");
    tResult.push("defense%");
    tResult.push("</th>");

	tResult.push("<th>");
    tResult.push("health");
    tResult.push("</th>");    
    tResult.push("<th>");
    tResult.push("regen");
    tResult.push("</th>");    
    tResult.push("<th>");
    tResult.push("block%");
    tResult.push("</th>");    
    tResult.push("<th>");
    tResult.push("crit%");
    tResult.push("</th>");
    tResult.push("<th>");
    tResult.push("-crit%");
    tResult.push("</th>");    

    tResult.push("<th>");
    tResult.push("fire");
    tResult.push("</th>");    
    tResult.push("<th>");
    tResult.push("earth");
    tResult.push("</th>");    
    tResult.push("<th>");
    tResult.push("water");
    tResult.push("</th>");    
    tResult.push("<th>");
    tResult.push("wind");

    tResult.push("</th>");

	tResult.push("</tr>");

    
    $("a.info2 > span > div", "#page_content").each(function(idx){
        tResult.push("<tr>");
        tResult.push("<td>");
        tResult.push(getBreed($(this)));
        tResult.push("</td>");       
        tResult.push("<td>");
        tResult.push(getType($(this)));
        tResult.push("</td>");        
        tResult.push("<td>");
        tResult.push(getSkill($(this)));
        tResult.push("</td>");

		//extra skills are a bit of a doozy to get. I'm gonna split the content of the div with br. Extra stats start at idx = 6
		var extraStats = $(this).html().split("<br>");
		var elemStatsIdx = extraStats.indexOf("<font class=\"orange\">Elemental Effects:</font>");

		//json object to make it easier to insert into td
		var templateStats = {
			Damage: "",
			Defense: "",
			DamagePct: "",
			DefensePct: "",
			Health: "",
			Regen: "",
			Block: "",
			Critical: "",
			MinusCrit: ""
		};

		for(var i=6; i<elemStatsIdx ;i++)
		{

			var stat = extraStats[i];
			var cutStat = stat.substr(stat.indexOf(">") + 1);
			if(stat.toLowerCase().indexOf("damage") > -1)
			{
				if(cutStat.indexOf("%") > -1)
					templateStats.DamagePct = cutStat.substring(1, cutStat.indexOf("%"));
				else
					templateStats.Damage = cutStat.substring(1, cutStat.indexOf("<"));
			}
			else if(stat.toLowerCase().indexOf("defense") > -1)
			{
				if(cutStat.indexOf("%") > -1)
					templateStats.DefensePct = cutStat.substring(1, cutStat.indexOf("%"));
				else
					templateStats.Defense = cutStat.substring(1, cutStat.indexOf("<"));
			}
			else if(stat.toLowerCase().indexOf("regen") > -1)
			{
				templateStats.Regen = cutStat.substring(1, cutStat.indexOf("<"));
			}
			else if(stat.toLowerCase().indexOf("health") > -1)
			{
				templateStats.Health = cutStat.substring(1, cutStat.indexOf("<"));
			}
			else if(stat.toLowerCase().indexOf("block") > -1)
			{
				templateStats.Block = cutStat.substring(1, cutStat.indexOf("%"));
			}
			else if(stat.toLowerCase().indexOf("crit") > -1)
			{
				if(cutStat.indexOf("-") > -1)
					templateStats.MinusCrit = cutStat.substring(0, cutStat.indexOf("%"));
				else
					templateStats.Critical = cutStat.substring(1, cutStat.indexOf("%"));
			}

		}

		tResult.push("<td>");
        tResult.push(templateStats.Damage);
        tResult.push("</td>");        
        tResult.push("<td>");
        tResult.push(templateStats.DamagePct);
        tResult.push("</td>");        
        tResult.push("<td>");
        tResult.push(templateStats.Defense);
        tResult.push("</td>");        
        tResult.push("<td>");
        tResult.push(templateStats.DefensePct);
        tResult.push("</td>");     

		tResult.push("<td>");
        tResult.push(templateStats.Health);
        tResult.push("</td>");        
        tResult.push("<td>");
        tResult.push(templateStats.Regen);
        tResult.push("</td>");        
        tResult.push("<td>");
        tResult.push(templateStats.Block);
        tResult.push("</td>");        
        tResult.push("<td>");
        tResult.push(templateStats.Critical);
        tResult.push("</td>");  
		tResult.push("<td>");
        tResult.push(templateStats.MinusCrit);
        tResult.push("</td>"); 


		//elem stats basically start after the idx found previously
		var templateElem = {
			Fire: "",
			Earth: "",
			Water: "",
			Wind: ""
		};

		for (var j=elemStatsIdx + 1; j<extraStats.length ;j++ )
		{
			var elem = extraStats[j];
			var elemProperty = elem.substr(elem.indexOf("+") + 1);
			elemProperty = elemProperty.substring(0, elemProperty.indexOf("<"));
			if(elem.toLowerCase().indexOf("fire") > -1)
			{
				templateElem.Fire = elemProperty;
			}
			else if(elem.toLowerCase().indexOf("water") > -1)
			{
				templateElem.Water = elemProperty;
			}
			else if(elem.toLowerCase().indexOf("earth") > -1)
			{
				templateElem.Earth = elemProperty;
			}
			else if(elem.toLowerCase().indexOf("wind") > -1)
			{
				templateElem.Wind = elemProperty;
			}
		}

		tResult.push("<td>");
        tResult.push(templateElem.Fire);
        tResult.push("</td>");        
        tResult.push("<td>");
        tResult.push(templateElem.Earth);
        tResult.push("</td>");        
        tResult.push("<td>");
        tResult.push(templateElem.Water);
        tResult.push("</td>");        
        tResult.push("<td>");
        tResult.push(templateElem.Wind);
        tResult.push("</td>");

        tResult.push("</tr>");
    });
    tResult.push("</table>");

    
    $("#page_content").append(tResult.join(""));
});

function getSkill($theDiv)
{
    return $("img",$theDiv).next().text();
}

function getBreed($theDiv)
{
    return $("br:nth-child(3)",$theDiv).prev().text();
}

function getType($theDiv)
{
    return $("font[class=green]",$theDiv).text();
}