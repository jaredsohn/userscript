// ==UserScript==
// @name           Asterisk Recordings Convert Seconds
// @namespace      http://asterisk/recordings/
// @include        http://asterisk/recordings/index.php?m=Callmonitor&q=&sort=desc&order=calldate&duration_filter=&start=0
// ==/UserScript==


(function(){
    var re1=/(\d+)\s*[sec]/;                     // set up regular expressions used in processing
    var re2=/\d{2}:\d{2}:\d{2}/;
    var re3=/(\d+)\s*[sec|min]/;
    var re4=/Monitor/;
    var textnodes = document.evaluate(           // get all lines of text from page
	"//text()",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

    timeArray = [];
    for(i=0; i<textnodes.snapshotLength; i++) {
	s=textnodes.snapshotItem(i).data;            // loop through each line of text on page
	if(s.match(re1)){                            // if it matches regular expression,
		x=parseInt(RegExp.$1);                   // pull out duration (seconds)
		if(x>=60){                               // convert seconds and round if duration more than 60 seconds
			y=Math.round((x/60)*10)/10;
			s=y +' min';
			textnodes.snapshotItem(i).data=s;    // set text line to string with new time
		}
		t=timeArray.length-1;                    // stores data for operation below
		timeArray[t][1]=x;
	}
	if(s.match(re2)){                            // stores data for operation below
		timeArray.push([s.split(':'),0]);
	}
    }
    
    count=0;
    next=0;
	var cells = document.getElementsByTagName('td');
    for(var i=0; i < cells.length; i++){
      if(next!=0){                               // if flag is set process 'Time 2' column
            	numSec=timeArray[count][1];      // use stored timeArray data 
            	h=timeArray[count][0][0];
            	m=timeArray[count][0][1];
            	s=timeArray[count++][0][2];
            	s=s.replace(/^0?/,'');           // javascript does not like to parseInt if there is a leading 0 it seems, remove leading 0
            	m=m.replace(/^0?/,'');
            	h=h.replace(/^0?/,'');
            	valH=parseInt(h);
				valM=parseInt(m);
            	valS=parseInt(s);
            	valSec=parseInt(numSec);
            	valSec+=valS;
            	valS=valSec%60;                  // perform time calculations
            	if(valS>=60){valS%=60; valM+=1;}
            	valM+=parseInt(valSec/60);
            	if(valM>=60){valH+=parseInt(valM/60); valM%=60;}
            	valH=valH>=24?valH-=24:valH;
            	s=valS+'';
            	s=s.length<2?'0'+s:s;            // pad times to two digits
            	m=valM+'';
            	m=m.length<2?'0'+m:m;
            	h=valH+'';
            	h=h.length<2?'0'+h:h;            // finally set time value (next line) 
            	cells.item(i).textContent=h +':'+ m +':'+ s;  
            	next=0;                          // reset flag
      }
      if(cells.item(i).textContent.match(re3)){
      	next=1;                                  // flag - next column is where 'Time 2' is written
      }
   }
   var cells = document.getElementsByTagName('th');
   for(var i=0; i < cells.length; i++){
   	if(cells.item(i).textContent.match(re4)){
    		cells.item(i).textContent='Time 2';  // change 'Monitor' column heading to 'Time 2'
    	}
    }
    
}
)();
