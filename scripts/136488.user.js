// ==UserScript==
// @name          Xltronic Points Visualizator
// @namespace     http://xltronic.com/xltpointsvisualizator
// @version		  0.1
// @description   Visualizes points of xltronikers when clicked. For fun purposes.
// @include       http://xltronic.com/mb/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @icon          http://matvey.kiev.ua/points/icon.png
// ==/UserScript==


defaultTop = 0;
defaultLeft = -5000 + 'px';

//create the overlay
box = document.createElement('div');
box.style.position = 'absolute';
box.style.width = 399+'px';
box.style.zIndex = 500;
box.style.top = defaultTop;
box.style.marginTop = 8+'px';
box.style.left = defaultLeft;
box.style.boxShadow = '0 0 5px #444';
box.style.backgroundColor = '#fff';
box.style.padding = 15 + 'px';
box.id = 'xltPointsVisualizator';
document.body.appendChild(box);
box = document.getElementById('xltPointsVisualizator');
//create the placeholder for points
place = document.createElement('div');
box.appendChild(place);
//create the arrowie
arrow = document.createElement('u');
arrow.style.display = 'block';
arrow.style.position = 'absolute';
arrow.style.bottom = 100 + '%';
arrow.style.left = 7 + 'px';
arrow.style.width = 15 + 'px';
arrow.style.height = 8 + 'px';
arrow.style.margin = '0 0 0 -7px';
arrow.style.zIndex = 7;
arrow.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAICAYAAAAm06XyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAENJREFUeNpi+P//PwMOLA3EB4BYEZcafBpv/4eAJ7gMIKTxPz4DiNGI0wBiNWI1gBSNGAaQqhHFAJDmXf/JAycBAgwA3E6l2NcVVT8AAAAASUVORK5CYII=')";
box.appendChild(arrow);
//create the close linkie
closeX = document.createElement('a');
closeX.style.position = 'absolute';
closeX.style.top = 0;
closeX.style.right = 5 + 'px';
closeX.style.cursor = 'pointer';
closeX.innerHTML = '&times;';
$(closeX).click(function(){
	hidePoints();
});
box.appendChild(closeX);


//move the points box off the viewport
hidePoints = function(){
	box.style.top = defaultTop;
	box.style.left = defaultLeft;
}

//fill the overlay with proper amount of points and move it to where it now belongs
showPoints = function(points,el){

	//position the arrow to ~50% of points width
	arrow.style.left = Math.floor(el.offsetWidth / 2) + 10 + 'px';
	
	//draw the points
	pts = parseInt(points, 10);	
	console.log(pts);
	all_str="";
	if(!isNaN(pts)){
		rows=Math.floor(pts/133);
		last=pts/133-rows;
		if(rows>=1){
			h=rows*3;
			all_str=all_str+"<table cellspacing=0 height="+h+" width='100%'><tr><td style=\"background-color:#EBEBD6; background-image:url('data:image/png;base64,R0lGODlhAwADAIABAAAAAP///yH5BAEAAAEALAAAAAADAAMAAAIEjAMXBQA7');background-repeat:repeat;\" width=100% height=100%></td></tr></table>";
		}
		if(last>0){
			percents=399*last;
			percents2=399-percents;
			all_str=all_str+"<table cellspacing=0><tr height=3><td style=\"background-color:#EBEBD6; background-image:url('data:image/png;base64,R0lGODlhAwADAIABAAAAAP///yH5BAEAAAEALAAAAAADAAMAAAIEjAMXBQA7');background-repeat:repeat;\" width="+percents+"></td><td width="+percents2+"></td></tr></table>";
		}
		place.innerHTML=all_str;
	}
	else{
		place.innerHTML="<b style='font:13px Arial;'>Feed me <a href='http://en.wikipedia.org/wiki/Natural_numbers'>natural</a> <a href='http://en.wikipedia.org/wiki/Decimal_numbers'>decimal</a> <a href='http://en.wiktionary.org/wiki/number'>numbers</a> and <a href='http://en.wikipedia.org/wiki/Zero'>zero</a>.</b>";
	}
	
	//position the overlay
	box.style.left = el.offsetLeft -10 + 'px';
	box.style.top = el.offsetTop + el.offsetHeight + 'px';
}



//find <b> nodes containing points in the classless web1.0-style markup with jQuery and CSS3 selectors) 
//style them and attach the handler
$('td[background="/media/images/system/mb_userinfo_bg.gif"] font[ color="#B6B66D"]').children('b').each(function(index){
    if(index / 2 - Math.floor(index / 2) == 0){
	 $(this).css('position','relative').css('text-decoration','underline').css('cursor','pointer').click(function(){
		showPoints($(this).text(), this);
     }).hover(function(){
		$(this).css('backgroundColor','#fff');
	 }, function(){
		$(this).css('backgroundColor','transparent');
	 });
	}
});
