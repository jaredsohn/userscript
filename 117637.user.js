// ==UserScript==
// @name         Ex-Mo Acronyms
// @copyright    2011, BobTMarley
// @namespace    http://www.reddit.com/r/exmormon
// @match        http://www.reddit.com/r/exmormon/*
// @version      0.2
// @download     http://userscripts.org/scripts/source/117637.user.js
// @description  Highlights Ex-Mo Acronyms - Hover for meanings
// @license      MIT; http://en.wikipedia.org/wiki/MIT_License
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var dict = { "AP" : "Assistants to the President",
"BIC" : "Born In the Covenant",
"BIL" : "Brother in Law",
"BKP" : "Boyd K Packer",
"BOA" : "Book of Abraham",
"BOM" : "Book of Mormon",
"BP" : "Branch President",
"BYU" : "Brigham Young University",
"CHI" : "Church Handbook of Instruction",
"CK" : "Celestial Kingdom",
"COB" : "Church Office Building",
"COJCOLDS" : "Church of Jesus Christ of Latter Day Saints",
"COP" : "Corporation of the President",
"CTR" : "Choose the Right",
"D&C" : "Doctrine and Covenants",
"DH" : "Dear Husband",
"DL" : "District Leader",
"EQ" : "Elders Quorum",
"ET" : "Ezra Taft Benson",
"FAIR" : "Foundation for Apologetic Information & Research",
"FARMS" : "Foundation for Ancient Research and Mormon Studies",
"FIL" : "Father in Law",
"FKAM" : "Formerly Known As Mormon",
"FPR" : "Faith Promoting Rumor",
"FS" : "Fast Sunday",
"FTM" : "Fast and Testimony Meeting",
"F&T" : "General Authority",
"GBH" : "High Council",
"HP" : "High Priest",
"HT" : "Home Teacher",
"IMO" : "In My Opinion",
"IMHO" : "In My Humble Opinion",
"IMNSHO" : "In My Not So Humble Opinion",
"ISPART" : "Institute for the Study and Preservation of Ancient Religious Texts",
"JOD" : "Joseph Smith",
"JW" : "Jehovas Witnesses",
"LDS" : "Latter Day Saint",
"MIL" : "Mother in Law",
"MINO" : "Mormon In Name Only",
"MMM" : "Mountain Meadows Massacre",
"MP" : "Mission President",
"MTC" : "Missionary Training Center",
"OMG" : "Oh My God",
"PEC" : "Priesthood Executive Meeting",
"PH" : "Priesthood",
"POP" : "Pearl of Great Price",
"POGP" : "Pearl of Great Price",
"PPI" : "Personal Priesthood Interview",
"RM" : "Returned Missionary",
"RS" : "Relief Society",
"RSP" : "Relief Society President",
"SHC" : "Stake High Council",
"SIL" : "Sister in Law",
"SP" : "Stake President",
"SWQ" : "Spencer W Kimbal",
"TBC" : "True believing Christian",
"TBM" : "True Blue Mormon or True Believing Mormon",
"TSCC" : "The So Called Church",
"VT" : "Visiting Teacher",
"WTG" : "Way To Go",
"YM" : "Young Mens",
"YSA" : "Young Single Adult",
"YW" : "Young Womens",
"ZL" : "Zone Leader, responsible for several districts" }

var highlightstyle = ".highlight{ background-color: yellow;}"
var tooltipstyle = ".tip {  background:#FFFFCC; padding: 5px; overflow: hidden;display: none;	position: absolute;	z-index: 500; no-repeat top;}"
var tooltipdiv = "<div class='tip'></div>";

function addStyle(style) {
	var head = document.getElementsByTagName("HEAD")[0];
	var ele = head.appendChild(window.document.createElement( 'style' ));
	ele.innerHTML = style;
	return ele;
}

addStyle(highlightstyle);
addStyle(tooltipstyle);
$("body").prepend(tooltipdiv);

$.fn.tooltip = function(content, options){
	
	var defaults = {
		speed: 200,
		delay: 300
	};
	
	var options = $.extend(defaults, options);
	
	var $this = $(this);
	var tip = $('.tip');
	
	var offset = $(this).offset();
	var tLeft = offset.left;
	var tTop = offset.top;
	var tWidth = $this.width();
	var tHeight = $this.height();
	
	$this.hover(
		function() {
			tip.html(content);
			setTip(tTop, tLeft);
			setTimer();
		}, 
		function() {
			stopTimer();
			tip.hide();
		}
	);		

	showTip = function(){ return function() {
	stopTimer();
	tip.animate({"top": "+=20px", "opacity": "toggle"}, defaults.speed);
		}
	}	
		
	setTimer = function() {
		var funcref = showTip();
		$this.showTipTimer = setInterval(funcref, defaults.delay);
	}
	
	stopTimer = function() {
		clearInterval($this.showTipTimer);
	}

	setTip = function(top, left){
		var topOffset = tip.height();
		var xTip = (left-30)+"px";
		var yTip = (top-topOffset-30)+"px";
		tip.css({'top' : yTip, 'left' : xTip});
	}		
};
   
$("p").each( function(i)
	{
		for (word in dict)
		{
			var rgxp = new RegExp( "\\b" + word + "\\b", 'gi');
			(this).innerHTML = (this).innerHTML.replace(rgxp, function(matched) {return "<span class='highlight'>" + matched + "</span>";})
		}
	});
$(".highlight").each( function(i)
	{
		var text = (this).innerHTML;
		var tip = dict[text.toUpperCase()];
		$(this).tooltip(tip);	
	});
