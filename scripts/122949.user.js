// ==UserScript==
// @name           MyFitnessPal Weight Watchers Points
// @version 1.1.4
// @description    Adds display of Weightwatcher points to any daily food diary page. Also adds "Real Calories" calcalation based off 4/4/9 algorithm.
// @include        http://www.myfitnesspal.com/food/diary/*
// @include        https://www.myfitnesspal.com/food/diary/*
// ==/UserScript==


var pointsPlus=false;
var precisonWW=false;

if (window.top !== window.self) {
	return; /* do not run in frames */
}

if (typeof unsafeWindow != 'undefined')
{
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = my_src;
    document.body.appendChild(script);
  })();

  return;
}

function startRun() {
  var script = document.createElement("script");
  script.setAttribute("src", "http://www.google.com/jsapi");
  script.addEventListener('load', function() {
      loadscripts_1();
  }, false);
  document.body.appendChild(script);
}

var points, totalPoints=0;
function getPointOld(cal1, fat1, fiber1, carbs, protein)
{
	points=0;
	if (fiber1>4 && !pointsPlus)
		fiber1=4;
	points = cal1/50;
	points += fat1/12;
	points -= fiber1/5;
        if (pointsPlus)
            points = (protein / 10.94) + (carbs / 9.17) + (fat1/3.89)- (fiber1 / 12.49);
	//alert(points);
	if (precisonWW)
	{
		points=Math.round(points)
	}
	else
	{
	var intPoints = Math.floor(points);
	fraction = points - intPoints;
	if (fraction<0.25)
		points = intPoints + 0.0;
	else if (fraction>=0.25 && fraction<0.75)
		points = intPoints +0.5;
	else
		points = intPoints+1;
        }
}

function main()
{
//$("tr:first").append('<col class="col-2" />');
$("tr:first").append('<th >');
$("tr:not(:first)").append("<td>");

	var found=false;
	var totalFound=false;
	var table1 = jQuery('.table0');
	var totalPoints=0;
	//alert($(table1[12]).text());
	var rowInd=-1;
	table1.find('tr').each(function()
	{
		rowInd++;
		var index=0;
		found=false;
		if ($(this).hasClass('meal_header') && rowInd==0)
			$(this).append('<td class="alt">Points</td>');
		if (!totalFound && $(this).hasClass('total'))
		{
			totalFound=true;
			$(this).find('td').eq(7).html(totalPoints);
		}
		var cols=$(this).find('td').each(function()
			{
			if (index==0)
			;
			else if (index==1)
			{
			cal11=($(this).text());
			}
			else if (index==2)
			   carbs=($(this).text());
			else if (index==3)
			fat11=$(this).text();
			else if (index==4)
			fiber11=$(this).text();
			else if (index==5)
			protein=($(this).text());
			else if (index==6 && $(this).hasClass('delete'))
			{
			found=true;
			getPointOld(cal11, fat11, fiber11, carbs, protein);
			totalPoints+=points;
			//$(this).append(points);
			}
			else 
			{
			if (found)
				$(this).append(points);
			/*if (totalFound)
			{
				totalFound=false;
				$(this).append('<td/><td/><td/>'+totalPoints);
			}*/
			}
			index +=1;
			}
	);
	});
}

function loadscripts_1()
{
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
	script.addEventListener('load', function() {
		loadscripts_2();
	}, false);
	document.body.appendChild(script);
}

function loadscripts_2()
{
     jQuery.noConflict();

     /* fix for old prototype conflict with google viz api */
     /* retrieves the Array reduce native function using cleverness */
     var ifr = document.createElement('iframe');
     document.body.appendChild(ifr);
     Array.prototype.reduce = ifr.contentWindow.Array.prototype.reduce;
     document.body.removeChild(ifr);

     google.load( "visualization", "1", {packages:["corechart"],"callback":main} );
}



startRun();