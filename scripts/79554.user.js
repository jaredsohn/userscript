// ==UserScript==
// @name           Convex Traffic Stats Graphs
// @include        https://bill.convex.ru/user/*
// @version        0.3
// ==/UserScript==

 
//Search of max array element.
Array.prototype.max = function() {
var max = this[0];
var len = this.length;
for (var i = 1; i < len; i++) if (this[i] > max) max = this[i];
return max;
}
//Needed for the left axis of the plot, where Mbs are shown.



var cells=document.getElementsByTagName("td"); //Search of every <td> element. All needed data is there.

var cellsNeeded = []; //Array of needed cells.
var count=0;

for (i=5;i<cells.length;i++) {
	if 	(cells.item(i).innerHTML.match(/\d/)) { //if innerHTML of a cell contains a digit - we need that cell
		cellsNeeded[count]=cells.item(i).textContent;	
		//removing whitespaces from Mbs' cells
			var str = "";
			str=cellsNeeded[count].toString();
			str=str.replace(/\s/,"");
			cellsNeeded[count]=str;
		//whitespaces have been removed
		count++;
	}
}

var points = { y:[], m:[] , mb1:[], mb2:[] }; //That's where all the stuff is placed. Years, Months, Mbytes1, Mbytes2.

//Now we need to sort (to structure) our data from "cellsNeeded" to "points".
var year=0, mon=0, mb1=0, mb2=0; //First we "collect" year, month and mbs.
var ok=false; //When collecting is over, "ok" becomes "true" and the data from variables goes to "point".

count=0;
for (i=0;i<cellsNeeded.length;i++) {	//Loop of collection and structure :)	
	ok=false;
	if (cellsNeeded[i].match(/\d{4} /)) {
		year=cellsNeeded[i].match(/\d{4} /);	
	}
	
	if (cellsNeeded[i].match(/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/)) {
		mon=cellsNeeded[i].match(/Январь|Февраль|Март|Апрель|Май|Июнь|Июль|Август|Сентябрь|Октябрь|Ноябрь|Декабрь/);
	}
	if ((cellsNeeded[i].match(/\d\.\d/))) {
		mb1=cellsNeeded[i];
		mb2=cellsNeeded[i+1];
		i++;
		ok=true;
	}

	
			if (ok==true) { 	//Collectict is over, let's fill a "point".
			points.y[count]=year;	
			points.m[count]=mon;
			points.mb1[count]=parseInt(mb1); //We do parseInt to get rid of dot and "00" in the end of every Megabyte's cell.
			points.mb2[count]=parseInt(mb2);
			count++;
			}
} //We're done with "points". Everything is stored there beautifully now.
	

//Now we need to actually draw our plot.
var marginTop=-(points.y.length*26.25);  //Vars to define where to place the plot. The more data we have (the "longer" the table is), the higher we need to move our plot.
var width=(window.innerWidth-635); //Default table has the constant width=600 px. I've experimented with numbers, and this 635 pixels are great for beautiful margins.
var height=(screen.height*0.4); //I've experimented with height as well. 40% of screen height would be okay for the plot.


//Canvas stuff starts here.
	var Canvas = document.createElement("canvas");
	Canvas.width=width;
	Canvas.height=height;
	
	Canvas.style.borderStyle="dashed";
	Canvas.style.borderWidth="1";
	
	Canvas.style.marginTop=marginTop;
	Canvas.style.marginLeft="605"; //Oh, yeah. 605 px is experimental number too :) Looks great, I guess.
	Canvas.style.position="fixed"; //The plot is always on the screen. We scroll the page, we watch the numbers in the table and we still see the plot. I think it's comfortable.
	
	document.body.appendChild(Canvas);
//Canvas is on the document now.

//Legend.
	var test=document.createElement("div");
	test.width=width;
	test.style.marginTop=marginTop+height+10;
	test.style.marginLeft="605";
	test.style.position="fixed";
	test.innerHTML='<p style="color:#ff0000">Общий траффик</p>'+'<p style="color:#0000ff">Внешнегородской траффик</p>';
	document.body.appendChild(test);
//Legend is done


var cc=Canvas.getContext("2d"); //You know what's that if you've read html5 specs.

//FINALLY DRAWING
	(function draw() { 
		cc.clearRect(0,0,width,height);
		
		
		var xx=(width/(points.y.length-1));  //Calculating coefficients for x and y. Necessary for making series fit the plot.
		var yy=(height/(points.mb1.max()));
		
		//Series for Mb1
			cc.beginPath();
			cc.moveTo(0,height-yy*points.mb1[0]);
			for (i=0;i<points.y.length;i++) {
				var yyy=height-yy*points.mb1[i];
				var x=xx*i;
				cc.lineTo(x,yyy);
			}
			cc.strokeStyle = "#ff0000"; //red
			cc.stroke();

		//Series for Mb2
			cc.beginPath();
			cc.moveTo(0,height-yy*points.mb2[0]);
			for (i=0;i<points.y.length;i++) {
				var yyy=height-yy*points.mb2[i];
				var x=xx*i;
				cc.lineTo(x,yyy);
			}
			cc.strokeStyle = "#0000ff"; //blue
			cc.stroke(); 
		
		//Horizontal grid lines. Quarters.
		cc.beginPath();
		cc.moveTo(0,3*height/4);
		cc.lineTo(width,3*height/4);
		cc.moveTo(0,2*height/4);
		cc.lineTo(width,2*height/4);
		cc.moveTo(0,1*height/4);
		cc.lineTo(width,1*height/4);
		
		//Vertical grid lines. If amount of points is greater than 47 — we draw them twice less times. It makes our plot beautiful and not crowded with lines.
		if (points.y.length<=50) {
			for (i=1;i<points.y.length;i++) {
				var x=xx*i;
				cc.moveTo(x,0);
				cc.lineTo(x,height);
			}
			
		}
		else {
			for (i=1;i<points.y.length;i=i+2) {
				var x=xx*i;
				cc.moveTo(x,0);
				cc.lineTo(x,height);
				
		}
		}
		cc.strokeStyle="#cccccc"; //grey
		cc.stroke();
		
		
		//Vertical lines where new years start. Darker than regular lines.
		cc.beginPath();
		for (i=1;i<points.y.length;i++) {
			var x=xx*i;
			if (points.y[i]!=points.y[i+1]) { //Checking if a new year begins.
			cc.moveTo((x+(xx/2)),0);
			cc.lineTo((x+(xx/2)),height);
			}
		}
		cc.strokeStyle="#666666"; //dark grey
		cc.stroke();
		
		
		//Captions for the left axis (Mbs)
		cc.font = "12px sans-serif";
		cc.fillText(points.mb1.max(), 0, 12);
		cc.fillText((3*points.mb1.max()/4),0,(12+1*height/4));
		cc.fillText((2*points.mb1.max()/4),0,(12+2*height/4));
		cc.fillText((1*points.mb1.max()/4),0,(12+3*height/4));
		
		//Captions for the bottom axis (months and years)
		cc.font = "9px sans-serif";
		if (points.y.length<=50) {
		for (i=0;i<points.y.length;i++) {
			cc.fillText(points.m[i].toString().charAt(0),(xx*i),height-14);
		}
		}
		else {
		for (i=1;i<points.y.length;i=i+2) {
			cc.fillText(points.m[i].toString().charAt(0),(xx*i),height-14);
		}
		}
		
		cc.fillText(points.y[0],0,height-3);
		for (i=1;i<points.y.length;i++) {
		if (points.y[i]!=points.y[i+1]) {
				cc.fillText(points.y[i+1],((xx*i+(xx/2))),height-3);
			}
		}
	})();
//YAY!
