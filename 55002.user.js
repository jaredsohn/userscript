// ==UserScript==
// @name           alt gezer auto refresh 
// @namespace      gezer.quark
// @include        http://gezer*.bgu.ac.il/*/crslist.php*
// @include        https://gezer*.bgu.ac.il/*/crslist.php*
// ==/UserScript==

/*

the alternative Gezer auto refresh

Version 0.2 (Added https)

By Quark (t),

Based on a script by Lior Kirsch, taken from http://userscripts.org/scripts/show/32720

*/


var pars = document.forms[0].elements.namedItem('pars');

if(!pars){pars=" "  }

else {pars=pars.value};

var uname = document.forms[0].elements.namedItem('uname');

if(!uname){uname=" "  }

else {uname=uname.value};

var numdept = document.forms[0].elements.namedItem('numdept');	

if(!numdept){numdept=" "  }

else {numdept=numdept.value}; 

var start=new Date();

start=Date.parse(start)/1000;

var StoredDate = GM_getValue('date');

if(StoredDate != null)
  var orig = new Date(StoredDate);
else
  var orig = new Date(0);

count = cmpdates(orig);

if ((count>0)&&(orig != 0)) {//
alert("Check your Gezer, " + count, " new exams");//
};

var counts=500;
	

/********************************************************

	add the button

	if the count > 0 alert the user

*********************************************************/



var newElement;

newElement = document.createElement('div');

newElement.innerHTML = '<form id="refreshSubmit" action="crslist.php" method=POST> <input type="hidden" name="pars" value=' + pars + '>  <input type="hidden" name="uname" value=' + uname + '> <input type="hidden" name="numdept" value=' + numdept + '> <input type=submit name="refresh" value="התחל" ><INPUT TYPE="text" id="clock" SIZE="3" VALUE="10"> </form> <hr> ' + count +" Exams were scanned since "+ orig.toString()+ '</hr>'  ;

document.body.insertBefore(newElement, document.body.firstChild);


/*************************************************

	if there are no new exams try 

	to refresh every couple of minutes

**************************************************/
	

if (count == 0 ) {


	window.setTimeout('countDown()',300);

	

};



/*************************************************

	display counter and count back

**************************************************/

unsafeWindow.countDown = function() {

		var now=new Date();

		now=Date.parse(now)/1000;

		var x=parseInt(counts-(now-start),10);

		document.getElementById('clock').value = x;

		if(x>0){

				timerID=setTimeout("countDown()", 300);

			}else{

				document.getElementById('refreshSubmit').submit();

			};

 		};



/*************************************************

	check for new scan dates, store the most recent one 

**************************************************/





function cmpdates(orig)
{
    var changed = false;
    var count = 0;
    var tempMax = orig;
        
    var tds = document.getElementsByTagName("td");
    for(var i = 0; i< tds.length; i++){
      
       if((tds[i].innerHTML.indexOf("/")==2)) {
         var rawdate = tds[i].innerHTML.substring(0,10).split("/");
         var rawtime = tds[i].innerHTML.substring(11,19).split(":");
         date = new Date(rawdate[2],rawdate[1]-1,rawdate[0],rawtime[0],rawtime[1],rawtime[2]);

         if(date > orig)
            count = count +1;
         if(date > tempMax)
            tempMax = date;
      }
   
   }
   if(count>0){
      GM_setValue('date', tempMax.toString());
}  
   return count;
   
};
