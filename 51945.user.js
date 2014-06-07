// ==UserScript==
// @name           Monster Level Calculator
// @namespace      http://userscripts.org/scripts/show/51945
// @description    Calculates average speed and moster HP for Maze Defense
// @include        http://apps.new.facebook.com/mazedefense/mymaze.aspx*
// @include        http://apps.facebook.com/mazedefense/mymaze.aspx*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

/* By Brian Ballsun-Stanton. 
	GPL v3 license. See the GPL website for details. 
	Version 0.1
		Initial program made
	Version 0.2
		Added debugging stuff in GM_log for requests:
		http://www.facebook.com/apps/application.php?id=14618023107#/topic.php?uid=14618023107&topic=13432
	Version 0.3 
		Added difficulty warning if present wave is more than 10% above weighted average.
	Version 0.4
		Cleaned up the UI a bit.
	Version 0.4.1
		Adjusted moving average. Now it won't drop on easier mazes. 
	Version 0.5
		Added record of difficulty of last 5 levels played.
	Version 0.5.1
		Some bugfixes.
	Version 0.6
		Reverted cookie code due to um... bugs.
	Version 0.7
		Reverted some more.
*/
// ==UserScript==
// @name           Monster Level Calculator
// @namespace      http://www.ballsun.com
// @description    Calculates average speed and moster HP for Maze Defense
// @include        http://apps.facebook.com/mazedefense/mymaze.aspx
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.js
// ==/UserScript==

/* By Brian Ballsun-Stanton. 
	GPL v3 license. See the GPL website for details. 
	Version 0.1
		Initial program made
*/




outContainer =  "<tr><th class='detached_label'><label style='vertical-align:top;line-height:13.1pt'>";
outContainer += "Total: <br>&Sigma;(HP*Spd*Count): <br>Max Wave Speed:</label></td>";
outContainer += "<td id='calDet' style='vertical-align:baseline;line-height:13.1pt;padding-top:15px'>&nbsp</td></tr>";
$("#app14618023107_monstersDetails").parent().parent().before(outContainer);

function calculateDiff(){
	totalCount=0;
	icky=0;
	maxSpeed=0;

	$(".md_monster_array").each(function(){	
		content = $(this).text();

		content = content.split("\n");
		count = content[0].replace(" × ",'')*1.0;
		hp=content[1]*1.0;
		speed=content[2]*1.0;

		//alert (count +" "+hp+" "+speed);
		totalCount += count;
		icky+=count*hp*speed;
		if (speed > maxSpeed)
			maxSpeed = speed;

	});

	icky = Math.round((icky*100))/100;

	out = totalCount+"<br>"+addCommas(icky)+"<br>"+maxSpeed;
	$("#calDet").html(out);
}

calculateDiff();
$("#app14618023107_difficulty").bind("change", calculateDiff);

function addCommas(number){
	txt = ""+Math.round(number);
	needComma = /([0-9]{3,3})(?:,[0-9]{1,3})*$/gm
	foo = 0;
	isOK = /^([0-9]{1,3},)*([0-9]{1,3})$/gm
	while (!isOK.test(txt)) {
		foo = txt.search(needComma)
		txt = txt.slice(0,foo)+","+txt.slice(foo);

	}
	return txt;
}