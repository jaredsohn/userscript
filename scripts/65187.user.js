// ==UserScript==
// @name           Total RapidPoints
// @namespace      rapidshare
// @description    Adding Free RapidPoints and Premium RapidPoints to a total, giving an easy view of how much points are avaliable and how much you need to extend your account.
// @include        *rapidshare.com/*
// ==/UserScript==


//Getting points
var freepoints = document.getElementById ('rpo');
var premiumpoints = document.getElementById ('rppo');

//Calculating total points
var x = freepoints.innerHTML*1;
var y = Math.floor(premiumpoints.innerHTML*1.25);
var total = x+y;
var difference = 10000-total;

//Percent for graphical percent-bar
var percent = Math.floor(total/10000*100);
if(percent>100)
{
	percent=100;
}


//Creating texts

	//Time for expiration
		//Get expiration date and today's date
var expdd = document.getElementById('p1').childNodes[1].childNodes[1].childNodes[0].childNodes[5].childNodes[0].innerHTML;
var todaydd = document.getElementById('p1').childNodes[1].childNodes[1].childNodes[2].childNodes[5].childNodes[0].innerHTML;

		//Convert expdd to Date
var expDate = expdd.split(" ")[1];
expDate = expDate.split(".")[0];

var expMonth = expdd.split(" ")[2];
  var toreplace = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  var withthis = ["1","2","3","4","5","6","7","8","9","10","11","12"];

  for (var i=0; i<toreplace.length; i++) {
     expMonth = expMonth.replace(toreplace[i], withthis[i]);
  }

var expYear = expdd.split(" ")[3];

var expD = new Date(expYear,expMonth-1,expDate);

		//Convert todaydd toDate
var todayDate = todaydd.split(".")[0];
var todayMonth = todaydd.split(".")[1];
var todayYear = todaydd.split(".")[2];
todayYear = todayYear.split(" ")[0];

var todayD = new Date(todayYear,todayMonth-1,todayDate);

	//Days left on the account
var days = (expD - todayD)/(1000*60*60*24);	

	//Points per day
var ppd = Math.ceil(difference/days);


//Graphical percent-bar
var imgspercent = Math.floor(-120+(1.2*percent));
var imgs = '<img style="margin: 0pt; padding: 0pt; width: 120px; height: 12px; background-position:' + imgspercent + 'px 50%; background-image: url(http://i244.photobucket.com/albums/gg27/Mavyon/percentImage_back1.png);" alt="percent" src="http://i244.photobucket.com/albums/gg27/Mavyon/percentImage.png" /> <b>';

//Texts

	//Total points and needed points
var text1 = '<p style="width:50%;float:left;text-align:"left";>Total RapidPoints: <b>' + total + '</b><br />';
		//If not enough points
var text12 = 'You need <b>' + difference + '</b> points to extend your account.</p>';
		//If enough points
var text13 = '<font color="darkgreen"><b>You have enough points to extend your account.</b></font></p>';


	//Graphical procent-bar
var text2 = '<p style="width:50%;float:right;text-align:right;"><span style="padding-right:45px;"><b>' + percent + '%</b></span><br />' + imgs + '</b></p>';

	//Days left
var daytext = "days";
if(days == 1)
{
	daytext = "day";
}
var text4 = '<p style="clear:both;">Your account expires in <b>' + days + '</b> ' + daytext + '.';
	
	
	//Poins per day
var text5 = ' You need <b>' + ppd + '</b> points per day.</p>';


//Writing texts

divbox = document.getElementById ('refinfo');

if(difference>0)
{
	divbox.innerHTML = text1 + text12 + text2 + text4 + text5 + divbox.innerHTML;
}
else
{
	divbox.innerHTML = text1 + text13 + text2 + text4 + '</p>' + divbox.innerHTML;
}