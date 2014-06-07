// ==UserScript==
// @name           GT Reborn Autohunt
// @namespace      druvid
// @description    Autohunt for gt
// @include        http://www.ghost-trappers.com/fb/*
// ==/UserScript==

var basetitle = document.title;
var url = document.location.href;
var title = '';
var d, rnd;

var b_tag;

function kickOff(){
//alert(document.getElementById('topHuntActive').firstElementChild.href);

b_tag = document.getElementsByTagName('b')[0];

if(typeof(b_tag) != 'undefined' && b_tag.innerHTML.indexOf('currently doing maintenance')!=-1)
{
  //Random maintWait submit (30-35 mins)
  var maintWaitRandom = randomWait("min", 30, 35);
  title = "<Maintenance> " + "Redirecting on "+nextAvailableTime(maintWaitRandom*1000)
	+" | "+ basetitle;
  
  window.setTimeout(function(){countDown(maintWaitRandom,title,"maintenance");}, 1000);

} 
else if((document.getElementsByName("captcha_id").length)>0)
{
  displayMenu();
  focusCaptcha();

  //Random captchaWait submit (30-35 mins)
  var captchaWaitRandom = randomWait("min", 40, 55);
  title = "*[GT Code]* = " + "Redirecting on "+nextAvailableTime(captchaWaitRandom*1000)
	+" | "+ basetitle;
  
  window.setTimeout(function(){countDown(captchaWaitRandom,title,"captcha");}, 1000);

}   
else if(document.body.innerHTML.indexOf("Decrypt a secret")!=-1 &&
        document.body.innerHTML.indexOf("Please click") != -1  )
{
  displayMenu();
  var captchaImg = null, resumeLink = null;
  var rand = randomWait("sec", 1, 8);
  document.title = "Captcha entered successfully. Submitting in " + (formatCountDown(rand));
  var imgArray = document.getElementsByTagName('img');
  for(var i=0; i<imgArray.length; i++)
    if(imgArray[i].src.indexOf('captcha_arrow.png')!=-1)
      captchaImg = imgArray[i];
  resumeLink = captchaImg.parentNode.getElementsByTagName('a')[0].href;
  
  window.setTimeout(function() {window.location = resumeLink;}, rand*1000);

}
else if(document.title.indexOf("500 - Internal Server Error")!=-1)
{
  var rand = randomWait("sec", 20, 30);
  document.title ="<Server Error> - Reloading in " + (formatCountDown(rand));
  window.setTimeout(function() {window.location = 'http://www.ghost-trappers.com/fb/';}, rand*1000);
}
else if(url.indexOf("scotch_ninth_floor.php?page=tradePost")!=-1)
{
  displayMenu();
  var rand = randomWait("min", 60, 60);
  document.title ="TradePost - Redirecting on "+nextAvailableTime(rand*1000);
  window.setTimeout(function() {window.location = 'http://www.ghost-trappers.com/fb/';}, rand*1000);

  var offer_arr = document.getElementById('offerContainer').getElementsByClassName('offer');
  for(var i=0; i<offer_arr.length; i++)
  {
    var offerAmount = offer_arr[i].getElementsByClassName('offerAmount')[0].innerHTML;
    var offerPrice = offer_arr[i].getElementsByClassName('offerPrice')[0].innerHTML.replace(/,/g,'').replace(' &pound;','');

    offer_arr[i].style.overflow = "visible";
    offer_arr[i].style.width="600px";
    offer_arr[i].innerHTML = offer_arr[i].innerHTML + 
    '<div style="color:black;z-index:300;width:130px;position:relative;float:right;text-align:left;">'+
    '<div style="font-size:80%;background-color:#caa87a;border:1px dotted black;padding:4px;margin:-5px 0 0 0px">'+
    formatCurrency(parseFloat(offerPrice)/parseFloat(offerAmount))+
    '</div></div>';
  }

}
else if(url.indexOf("fb/profiletab/index_intern.php?fbid=")!=-1)
{
  displayMenu();
  var rand = randomWait("min", 15, 20);
  document.title ="GT Profile - Reloading in " + (formatCountDown(rand));
  window.setTimeout(function() {window.location = 'http://www.ghost-trappers.com/fb/';}, rand*1000);
}

else if(url.indexOf("ghost_monster.php?id=")!=-1 && url.indexOf("&test=")!=-1)
{
  var rand = randomWait("min", 5, 8);
  //document.title = "Captcha entered successfully. Submitting in " + (formatCountDown(rand));
  window.setTimeout(function() {window.location = 'http://www.ghost-trappers.com/fb/';}, rand*1000);
  
}
else
{ 
  if (document.getElementById('topHuntMinutes') != null)
  {
    var minutesid = document.getElementById('topHuntMinutes').innerHTML
    var secondsid = document.getElementById('topHuntSeconds').innerHTML
  } 
  else if (document.getElementById('topHuntMinutes') == null)
  {
    var minutesid = '0'
    var secondsid = '0'
  }
  
  //find where the timer call is made and where the c=XXX value is specified
  //linklocation = document.body.innerHTML.search(/hunt.php\?[a-zA-z]+=[0-9]+/);

  //Find hunt url, if not found terminate script (using 'return')
  if(document.getElementById('topHuntActive')){
    var link = document.getElementById('topHuntActive').firstElementChild.href;
  }
  else{
    return;
    //throw new Error("Cannot find hunt link.");
  }

  if(link != -1)
  {
    dcClick(); 
    displayMenu();
    teamScores();

    //Parse out timer values in minutes and seconds
    //magic number: +8 includes all numbers and right parentheses guaranteed (i hope)
    
    minutes = parseInt(minutesid, 10);
    seconds = parseInt(secondsid, 10);
    //add 3-33 seconds onto refresh timer randomly (i hope)
    timeoutvalue = (minutes * 60 + seconds + Math.round((Math.random() * 5)) + 1) * 1000;

    //alert(timeoutvalue + "; " + linklocation);

    setTimeout(function() {document.location = link;} , timeoutvalue);
    
    document.title =  nextAvailableTime(timeoutvalue) + ' -Hunt-';

  }
  else
  {
  document.body.innerHTML = document.body.innerHTML + "<div> Cant bRing DMD!</div>";
  }

}

}
function refreshPage(r)
{
  if (r > 0 )
  {
    document.title = "<Disconnected> Refreshing in "+(FormatCountDown(r--))+"...";
    window.setTimeout(function() { refreshPage(r) }, 1000);
  }
  else if (r == 0)
  { 
    setTimeout(function() { window.location.reload(false); }, 1000) 
  }
}

function nextAvailableTime(zTimeoutvalue)
{
  //Determine the current date, add the timeoutvalue in milliseconds, and
  //return the formatted time.
  d = new Date();

  if(zTimeoutvalue >= 0)
    d.setTime(d.getTime() + zTimeoutvalue);

  hours = d.getHours();
  minutes = d.getMinutes();
  //seconds = d.getSeconds();
  ampm = "am";
  
  if (hours > 12 || hours == 0)
  {
    if(hours == 0) {hours = 12}
    else {hours = hours - 12; ampm = "pm";}
  }

  if (minutes < 10)
  { minutes = "0" + minutes; }

  //if (seconds < 10)
  //{seconds = "0" + seconds;}

  //return hours + ':' + minutes + ':' + seconds +' '+ ampm;
  return hours + ':' + minutes + ampm;
}

function getElementsByClass(theClass,node) {
    var classElements = [];
    var i;
    if ( node == null ) {
    	node = document
    }
    if (node.getElementsByClassName) {
    	var tempCollection = node.getElementsByClassName(theClass);
        for (i = 0; i < tempCollection.length ; i++) {
    		classElements.push(tempCollection[i])
    	}
    }
    else {
    	var els = node.getElementsByTagName("*");
    	var elsLen = els.length;
    	var pattern = new RegExp("(^|\\s)"+theClass+"(\\s|$)");
    	for (i = 0; i < elsLen; i++) {
    		if ( pattern.test(els[i].className) ) {
    			classElements.push(els[i]);
    		}
    	}
    }
    return classElements;
}

function formatCountDown (waktu)
{
   if (!waktu) return false;
   if (isNaN(parseInt(waktu))) return waktu;
   
   var	jam = parseInt(waktu / 3600);
   var	sisawaktu = waktu % 3600;
   var	menit = parseInt(sisawaktu / 60);
   var	detik = sisawaktu % 60;
   var   penampakan = "";
   if (jam < 10) jam = "0" + jam;
   if (menit < 10) menit = "0" + menit;
   if (detik < 10) detik = "0" + detik;
   if (detik <= 0)
   {
      if (menit <= 0)
      {
         if (jam > 0) penampakan = jam + " h";
      }
      else if (jam > 0) penampakan = jam + " h " + menit + " m";
      else penampakan = menit + " m";      
   }
   else
   {
      if (jam <= 0)
      {
         if (menit > 0) penampakan = menit + " m " + detik + " s";
         else penampakan = detik + " s";
      }
      else penampakan = jam + " h " + menit + " m " + detik + " s";
   }
   sisawaktu=null;jam=null;menit=null;detik=null;
   return penampakan;
}



//END CODE

//MY CODE: to display Whisky Armed and Quantity, Cash and Experience points; Plus other useful links
function displayMenu()
{
  try{
    //Get bait name
    var cur_whisky_title = document.getElementById('profile_whisky_img').title;
    //Get bait quantity
    var whisky_quantity = document.getElementById('profile_whisky_quantity').innerHTML;
    //Get cash amount
    var cash = document.getElementById('profile_gbp').innerHTML;  
    //Get exp points
    var expts = document.getElementById('profile_experience').innerHTML;
    //Get cooldown
    var cd = document.getElementById('profile_tsc_breaker').title.split("of ")[1];
    //Chrono charges stored
    var charges;
    var powerhunt_link;
    try{
      var title = document.getElementById('chrono3').getElementsByTagName('a')[0].title;
      charges = title.split("has ")[1].split(" (")[0];
      powerhunt_link = document.getElementById('chrono3').getElementsByTagName('a')[0].href;
    }catch(ch){};
    if(typeof(powerhunt_link) == 'undefined')
      powerhunt_link = 'index.php';
    //Cauldron stats
    var cauld=document.getElementsByClassName('cauldronRightContainer')[0].getElementsByTagName('a')[0].title;
    var mm = cauld.split(' ')[2] +' malty';
    var dru;
    try{ dur = cauld.split('last')[1].split('and')[0].replace(' h','h').replace(' min','m'); }catch(c){}
    if(typeof(dur)=='undefined')
      dur = 'No plasma';
    var cauld_stat = mm+', '+dur; 

  }catch(e){}

if(!document.getElementById('myMenu'))
{
//Generate submenus
subMenus();
var hideAll=
  'document.getElementById(\'baitSubMenu\').style.display=\'none\';'+
  'document.getElementById(\'mechSubMenu\').style.display=\'none\';'+
  'document.getElementById(\'circSubMenu\').style.display=\'none\';'+
  'document.getElementById(\'contSubMenu\').style.display=\'none\';'+
  'document.getElementById(\'compSubMenu\').style.display=\'none\';'+
  'document.getElementById(\'travelSubMenu\').style.display=\'none\';';

var showAll=
  'document.getElementById(\'baitSubMenu\').style.display=\'block\';'+
  'document.getElementById(\'mechSubMenu\').style.display=\'block\';'+
  'document.getElementById(\'circSubMenu\').style.display=\'block\';'+
  'document.getElementById(\'contSubMenu\').style.display=\'block\';'+
  'document.getElementById(\'compSubMenu\').style.display=\'block\';'+
  'document.getElementById(\'travelSubMenu\').style.display=\'block\';';

//Get fbid
var fb = document.getElementById('contractRightContainer').childNodes[3].getAttribute("onclick").split(",");
var fbid = fb[4].replace(/'/g,"").replace('index.php?si=','');

//Creates a div to be appended
var divTag = document.createElement("div");
divTag.id = 'myMenu';
divTag.innerHTML =
'<table style="border: 2px ridge black; background-color: #caa87a; font-weight:bolder;" >'+
 '<tr><td>Ghost Cash: <font color="#cc0000">'+cash+'</font></td></tr>'+
 '<tr><td>Experience: <font color="#cc0000">'+expts+'</font></td></tr>'+
 '<tr><td>Cooldown: <font color="#cc0000">'+cd+'</font></td></tr>'+
 '<tr><td>Mist: <font color="#cc0000">'+cauld_stat+'</font></td></tr>'+
 '<tr><td>Charges: <font color="#cc0000">'+charges+'<a href="'+powerhunt_link+'">~</a>'+'</font></td></tr>'+
 '<tr><td style="border-bottom: 1px solid #916540;">'+cur_whisky_title+
   '(<font color="#cc0000">'+whisky_quantity+'</font>)</td></tr>'+
       
 '<tr><td>'+
 '<ul style="background-color:#ece3a2;margin-top:-2px;padding:2px 5px 2px 7px;list-style-type:none;">'+
  '<li>'+ 
    '<input type="hidden" value="http://wiki.ghost-trappers.com/gtwiki/w/index.php?title=Special%3ASearch&search="/>'+
    '<input type="text" size="16" style="font-size:80%;background-color:#FFFFAF;border-color:#aaa;"/>'+
    '<input type="button" style="border-color:blue;padding:2px;font-size:80%" value="&#216;"'+
    'onclick="window.open(this.previousSibling.previousSibling.value+this.previousSibling.value);return false;"/>'+
  '</li>'+

  '<li>&times <a href="http://www.ghost-trappers.com/fb/dc.php">Reward</a>'+
  '<a href="http://www.ghost-trappers.com/fb/dc.php">-</a>'+
  '<a href="http://www.ghost-trappers.com/fb/trading_gifts.php">Gifting</a></li>'+

  '<li>&times '+
  '<a href="http://www.ghost-trappers.com/fb/scotch_intern.php">Bar</a>-'+
  '<a href="http://www.ghost-trappers.com/fb/scotch_intern.php?type=q">Q</a>-'+
  '<a href="http://www.ghost-trappers.com/fb/scotch_intern.php?type=lab">Lab</a>-'+
  '<a href="http://www.ghost-trappers.com/fb/scotch_intern.php?type=office">Off</a></li>'+

  '<hr color="#916540" />'+
  '<li>&times <a href="http://tinyurl.com/gt-enterraid">Raid</a>-'+
  '<a href="http://www.ghost-trappers.com/fb/raid_unit.php">Unit</a>-'+
  '<a href="http://www.ghost-trappers.com/fb/travel_raid.php?to=29">D</a>-'+
  '<a href="http://www.ghost-trappers.com/fb/travel_raid.php?to=32">G</a>-'+
  '<a href="http://www.ghost-trappers.com/fb/travel_raid.php?to=42">L</a></li>'+

  '<li>&times '+
  '<a href="http://www.ghost-trappers.com/fb/profiletab/index_intern.php?fbid='+fbid+'">Prof</a>-'+
  '<a href="http://www.ghost-trappers.com/fb/scores.php?type=tournament">Miss</a>-'+
  '<a href="http://www.ghost-trappers.com/fb/ghost_monster.php">Jour</a></li>'+
  
  '<hr color="#916540" />'+
  '<li>&times <a href="http://www.ghost-trappers.com/fb/setup.php?type=saved">SS</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/index.php?action=armSetup&slot=0">1st</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/index.php?action=armSetup&slot=1">2nd</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/index.php?action=armSetup&slot=2">3rd</a></li>'+

  '<li>&times <a href="http://www.ghost-trappers.com/fb/setup.php?type=whisky">Bait</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=misc">Misc</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=companion">Comp</a></li>'+
  '<li>&times <a href="http://www.ghost-trappers.com/fb/setup.php?type=contract">Cont</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=mechanism">Mech</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=magic_circle">Circ</a></li>'+

  '<li>&times <a href="http://tinyurl.com/gt-tradepost">TP</a>-'+
  '<a href="http://www.ghost-trappers.com/fb/scotch_ninth_floor.php?page=shop">BS</a>-'+
  '<a href="http://www.ghost-trappers.com/fb/scotch_ninth_floor.php?page=exhibition">Ex</a>-'+
  '<a href="http://forum.diviad.com/forum.php">For</a></li>'+

  '<hr color="#916540" />'+

  //Submenus Toggler
  '<li>'+
  '<a onclick="'+hideAll+'">&times </a>'+ 
  '<a onclick="var e=document.getElementById(\'baitSubMenu\');e.style.display=(e.style.display!=\'none\')?\'none\':\'block\';">Bait</a>-'+
  '<a onclick="var e=document.getElementById(\'mechSubMenu\');e.style.display=(e.style.display!=\'none\')?\'none\':\'block\';">Mech</a>-'+
  '<a onclick="var e=document.getElementById(\'circSubMenu\');e.style.display=(e.style.display!=\'none\')?\'none\':\'block\';">Circ</a>'+
  '</li>'+

  '<li>'+
  '<a onclick="'+showAll+'">&times </a>'+ 
  '<a onclick="var e=document.getElementById(\'travelSubMenu\');e.style.display=(e.style.display!=\'none\')?\'none\':\'block\';">Tra</a>-'+
  '<a onclick="var e=document.getElementById(\'contSubMenu\');e.style.display=(e.style.display!=\'none\')?\'none\':\'block\';">Cont</a>-'+
  '<a onclick="var e=document.getElementById(\'compSubMenu\');e.style.display=(e.style.display!=\'none\')?\'none\':\'block\';">Comp</a>'+
  '</li>'+

  '<hr color="#916540" />'+

  '<li>'+
  '<ul style="font-size:90%;font-weight:normal;padding-left:0px;line-height:90%;list-style-type:none;">'+
    '<li><a href="http://www.ghost-trappers.com/fb/setup.php?type=mechanism" style="color:black;">M:</a>'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=32">Ab</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=42">Ds</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=43">Dm</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=44">EP</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=23">MM</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=37">TPe</a></li>'+

    '<li><a href="http://tinyurl.com/gt-magiccircle" style="color:black;">C:</a>'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=27">Bff</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=17">Ivo</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=26">Wp</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=29">Ls</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=21">Neo</a></li>'+

    '<li><a href="http://www.ghost-trappers.com/fb/setup.php?type=companion" style="color:black;">C:</a>'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=11"'+
        'title="Pixie Normal">P</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=12"'+
        'title="Pixie Special">X</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=29"'+
        'title="Ghost Snake">S</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=32"'+
        'title="Little Cu Sith">C</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=31"'+
        'title="Little Kelpie">K</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=27"'+
        'title="Ghost Seahorse">Se</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=54"'+
        'title="Amber Whelp">W</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=28"'+
        'title="Phoenix">Ph</a></li>'+

    '<li><a href="http://www.ghost-trappers.com/fb/setup.php?type=misc" style="color:black;">ID:</a>'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=misc&arm=17">Cosm</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=misc&arm=18">Twil</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/setup.php?type=misc&arm=11">Puzz</a></li>'+

    '<li><a href="http://www.ghost-trappers.com/fb/travel.php?to_r=3" style="color:black;">R3</a>:'+ 
    '<a href="http://www.ghost-trappers.com/fb/travel.php?to=23&page=0" title="WellsingtonTower">WT</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/travel.php?to=24&page=0" title="Dormont Cemetery">DC</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/travel.php?to=25&page=0" title="Castle McDonohan">CM</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/travel.php?to=26&page=0" title="Count Church">CC</a></li>'+

    '<li><a href="http://www.ghost-trappers.com/fb/travel.php?to_r=4" style="color:black;">R4</a>:'+ 
    '<a href="http://www.ghost-trappers.com/fb/travel.php?to=35&page=0" title="KirkyardCemetery">KC</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/travel.php?to=36&page=0" title="Kirkyard Morgue">KM</a>-'+
    '<a href="http://www.ghost-trappers.com/fb/travel.php?to=37&page=0" title="Kirkyard Crypt">KC</a></li>'+

  '</ul>'+
  '</li>'+ 
  '<hr color="#916540" />'+

  '<li>&times <a onclick="window.scrollBy(0,-10000);" style="color:black;">Top</a>-'+
  '<a onclick="window.scrollBy(0,700);" style="color:black;">Bottom</a></li>'+
  '<li>&times <a href="http://www.ghost-trappers.com/fb" style="color:black;">Back to Camp</a></li>'+
 '</ul>'+
 '</td></tr>'+
//'</table>';

'</table>';


divTag.style.color = "black";
divTag.style.height = "0px";
divTag.style.margin = "0px";
divTag.style.padding = "0px";
divTag.style.position = "fixed";
divTag.style.zIndex = "300";
divTag.style.overflow = "visible";
divTag.style.top = "180px";
divTag.style.left = "50px";
    
//Appends it to an existing div
document.body.appendChild(divTag);


/*
//Tester
document.body.innerHTML = 
'<div style="background-color:red;position:fixed;top:10px;left:20px;z-index:400;">'+
  '<div><a onclick="var e=document.getElementById(\'baitSubMenu\');e.style.display=(e.style.display!=\'none\')?\'none\':\'block\';">'+
    'Click to Toggle'+
  '</a></div><br>'+
  
'<div id="test1" style="display:none;background-color:yellow;">Hello world hvhjvv hjbjhghj jhgjhgj </div>'+
'</div>'+document.body.innerHTML;
*/


} //end of if(!document.getElementById('myMenu'))

}

function subMenus()
{
 if(!document.getElementById('mySubMenu'))
 {
  var div_main_style='background-color:#CEAA7B;display:none;border:1px dotted black;position:fixed;z-index:400';
  var td_main_style='background-color:#EFE3A5;vertical-align:top;padding:4px';
  var div_sub_style='background-color:#CEAA7B;text-align:center;font-weight:bold;padding:3px;margin-bottom:5px';

  //Bait SubMenu
  var baitSubMenu = 
  '<div id="baitSubMenu" style="top:300px;left:230px;'+div_main_style+'">'+
  '<table style="background-color:#CEAA7B;" cellspacing="2"><tr>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Potions</div>'+
    'Green:<br>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=14","WhisperWind")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=8","Glengreen")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=7","Moormist")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=5","Moonshadow")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=4","Silverstar")+
    '<br>'+
    'Blue:<br>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=18","WWb")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=12","GGb")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=11","MMb")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=10","MSb")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=6","SSb")+
    '<br>'+
    'Purple:<br>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=46","WWp")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=43","GGp")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=37","MMp")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=32","MSp")+
    //showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=","")+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Favorites</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=9","Nessys")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=21","Braveheart")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=22","Black Tartan")+ 
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=38","Night Cap")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=20","Highland")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=28","GreenGoddess")+ 
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=25","Devil Driver")+ 
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=41","Black Widow")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=42","Witch Hunt")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=44","Frozen Mist")+   
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Mocktails</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=33","Mistletoe")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=26","Mab Malt")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=45","Pumpkin Punch")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=15","Apple Zapper")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=16","Jack Jones")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=24","Ruby Tuesday")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=29","Jesperian")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=30","Cherry Bomb")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=31","Old Admiral")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=34","Corpse Reviver")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=35","Midnight Smash")+  
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=35","Midnight Rider")+ 
    showA("http://www.ghost-trappers.com/fb/setup.php?type=whisky&arm=39","Nessys PE")+   
  '</td>'+

  '</tr></table>'+ 
  '</div>';


  //Mechanism SubMenu
  var mechSubMenu = 
  '<div id="mechSubMenu" style="top:200px;left:230px;'+div_main_style+'">'+
  '<table style="background-color:#CEAA7B;" cellspacing="2"><tr>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Arcane</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=23","Magic Maze")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=44","Ether Portal")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=32","Abysmal Phone")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=28","X-Kaliboo")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=13","Basilisk Pit")+
    //showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=","")+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Traditional</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=43","Danse Macabre")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=37","Timewarper PE")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=14","Eternal HHB")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=9","SkeletonCoach")+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">High Tech</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=35","Slapping Mach")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=26","SOM 9000")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=10","Black Hole")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=17","Battle Barage")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=15","Addictive PC")+
    '</div>'+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Bio</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=42","Doomshroom")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=mechanism&arm=41","Lucky Rabbit")+
  '</td>'+

  '</tr></table>'+ 
  '</div>';

  //Magic Circle SubMenu
  var circSubMenu = 
  '<div id="circSubMenu" style="top:200px;left:550px;'+div_main_style+'">'+
  '<table style="background-color:#CEAA7B;" cellspacing="2"><tr>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Raw</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=21","Neon Lights")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=29","Laughing Skull")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=27","Bottle FireFlies")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=30","Lightning Coils")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=17","Ivory Candles")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=24","Lava Lamps")+
    //showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=","")+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Mystic</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=26","Wax Pyramid")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=19","Runic Candles")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=28","Black Dragon")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=31","Pumpkin Candles")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=18","Star Light")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=magic_circle&arm=8","Black Candles")+
  '</td>'+

  '</tr></table>'+ 
  '</div>';

  //Contract SubMenu
  var contSubMenu = 
  '<div id="contSubMenu" style="top:85px;left:230px;'+div_main_style+'">'+
  '<table style="background-color:#CEAA7B;" cellspacing="2"><tr>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Arcane</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=23","Countess Wilhelma")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=11","Master Bastian Shaw")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=38","Baltazar the Sorcerer")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=6","Novice Bryan Bigglesworth")+
    //showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=","")+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Traditional</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=37","Sir Hyronimus Quatermain")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=21","Selena Darkblade")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=5","Igidius Brown")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=1","Inspector James Sinclair")+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">High Tech</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=30","Professor Albert Zweistein")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=20","Nurse Chapham")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=8","Sir Overdrive")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=2","Mechanic Daniel Roy")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=16","Dr Fürchtegott Nussbaum")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=19","Engr Clyde Throckmorton")+

    '</div>'+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Bio</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=22","Lorelle Midnight Fairy")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=36","Etain, pict huntress")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=14","Gwynnyth the shaman")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=4","Zoologist Emma Parker")+
  '</td>'+


  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Magic Circle</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=3","Sorceress Alithia Winterborn")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=35","The Chairman")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=contract&arm=42","Dancing skeleton")+
  '</td>'+

  '</tr></table>'+ 
  '</div>';

  //Companion SubMenu
  var compSubMenu = 
  '<div id="compSubMenu" style="top:315px;left:470px;'+div_main_style+'">'+
  '<table style="background-color:#CEAA7B;" cellspacing="2"><tr>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Favorites</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=29","Ghost Snake")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=32","Little Cu Sith")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=54","Amber Dragon")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=18","Little Kelpie")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=12","Special Pixie")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=19","Little Nessy")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=10","Special Racoon")+
    //showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=","")+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Situational</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=27","Seahorse")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=28","Phoenix")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=36","Ghost Seal")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=56","Ghost Goat")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=11","Normal Pixie")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=41","Little Devil")+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Uncommon</div>'+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=45","Ghost Owl")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=15","Normal Spider")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=40","Reindeer")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=33","Ghost Rat")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=24","Ghost Bird")+
    showA("http://www.ghost-trappers.com/fb/setup.php?type=companion&go=1&companion_id=43","Mini Robot")+
  '</td>'+

  '</tr></table>'+ 
  '</div>';

  //Travel SubMenu
  var travelSubMenu = 
  '<div id="travelSubMenu" style="top:445px;left:470px;'+div_main_style+'">'+
  '<table style="background-color:#CEAA7B;" cellspacing="2"><tr>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Region 1</div>'+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=6","Castle McCloud")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=11","Loch Trool")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=13","Glenluck Abbey")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=14","Castle McDougan")+
    //showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=","")+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Region 2</div>'+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=16","Castle McWallace")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=18","Kilwittig House")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=19","Loch Muir")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=20","Castle McKenny")+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Region 3</div>'+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=23","Wellsington Tower")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=24","Dormont Cemetery")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=25","Castle McDonohan")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=26","Count Church")+
    '</div>'+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Region 4a</div>'+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=35","Kirkyard Cemetery")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=36","Kirkyard Morgue")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=0&to=37","Kirkyard Crypt")+
  '</td>'+

  '<td style="'+td_main_style+'">'+
    '<div style="'+div_sub_style+'">Region 4b</div>'+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=3&to=39","DukeLeyton Castle")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=3&to=40","DLC Library")+
    showA("http://www.ghost-trappers.com/fb/travel.php?page=3&to=41","DLC Pinnacle")+
  '</td>'+


  '</tr></table>'+ 
  '</div>';

  //Creates a div to be appended
  var submenu_div = document.createElement("div");
  submenu_div.id = 'mySubMenu';
  submenu_div.innerHTML = baitSubMenu+mechSubMenu+circSubMenu+contSubMenu+compSubMenu+travelSubMenu;

  //Appends it to an existing div
  document.body.appendChild(submenu_div);

//  var submenus = baitSubMenu+mechSubMenu+circSubMenu+contSubMenu+compSubMenu+travelSubMenu;
//  document.body.innerHTML = document.body.innerHTML + submenus;

//  document.body.innerHTML = 
//      baitSubMenu+mechSubMenu+circSubMenu+contSubMenu+compSubMenu+travelSubMenu+document.body.innerHTML;

//  document.getElementById('header').innerHTML = travelSubMenu+document.getElementById('header').innerHTML;
 }
}

//Prints <a></a> tag
function showA(href,urlname)
{
  return ('<a href="'+href+'">'+urlname+'</a><br>');
}

function focusCaptcha()
{
  var index; var elem;

  window.scrollBy(0,900);
  for(var i=0; i<document.forms.length; i++)
    if(document.forms[i].action.indexOf("captcha.php") != -1) index=i;
  
  for(var i=0; i<document.forms[index].length; i++)
    if(document.forms[index][i].name == "captcha_entered_text") elem=i;

  document.forms[index].elements[elem].focus();
}

function teamScores()
{
if(url.indexOf("scores.php")!=-1 && ((url.indexOf("tourna")+url.indexOf("myte")+url.indexOf("chall"))==-3))
{
  var fbarr = document.getElementById('firstTable').getElementsByTagName('a');
  for(var i=5; i<fbarr.length; i++)
    if(fbarr[i].href.indexOf("www.facebook.com/profile.php?id=")!=-1)
    {
      var fbid = fbarr[i].href.split('=')[1]
      var targ = fbarr[i].parentNode.parentNode.getElementsByTagName('td')[5];
      targ.innerHTML = 
        '<b>[<a target="_blank" style="color:#008400;"'+ 
        'href="http://www.ghost-trappers.com/fb/profiletab/index_intern.php?fbid='+fbid+'">P'+
        '</a>]</b> '+ targ.innerHTML;
    }
  var rand = randomWait("min", 15, 20);
  document.title = "Team Ranking.. Returning in " + (formatCountDown(rand));
  window.setTimeout(function() {window.location = 'http://www.ghost-trappers.com/fb/';}, rand*1000);
}
else return;
}

//return a random number in secs or mins
function randomWait(type, min, max)
{
  if(type == "min") { min=min*60; max=max*60; }
  return( min + (Math.floor( (Math.random() * (max-min+1)) )) );
}

function dcClick()
{
  //1:CW, 2:SD, 3:NC, 4:LM, 5:Rider, 6:Smash, 7:Fox, 8:Owl, 9:Beaver, 10:Badger, 11:BTS, 12:MAS

  var dc_link = "http://www.ghost-trappers.com/fb/dc.php";

  if(document.getElementsByClassName('dcReminder').length == 1)
  { 

    var fb = document.getElementById('contractRightContainer').childNodes[3].getAttribute("onclick").split(",");
    var fbid = fb[4].replace(/'/g,"").replace('index.php?si=','');

    var dru = 100000080802434;
    var jen = 100000214767469;
    var jan = 794443536;
    var jai = 100000186507362;
    var sun = 100000254913738;
    var van = 1622834492;

    var rand = randomWait("sec", 3, 9);
    document.title = "<DailyReward> Clicking in " + (formatCountDown(rand))+ " ... ";
    window.setTimeout(function() 
    {
      if(fbid == sun)
        dc_link = dc_link+"?dc_id=2"; 
      else if(fbid == van)
        dc_link = dc_link+"?dc_id=2";
      else if(fbid == jai)
        dc_link = dc_link+"?dc_id=11";
      //else if(fbid == jen)
      //  dc_link = dc_link+"?dc_id=11";
      else 
        dc_link = dc_link+"?dc_id=12";
      window.location = dc_link;
    }, rand*1000);
  }
}

function countDown(time,str,action){

	if(time>0)
	{
		document.title= str +" | "+ formatCountDown(time--);		
		window.setTimeout(function () { countDown(time,str,action); }, 1000);
	}
	else
	{
		if(action=="hunt")
			window.setTimeout(function() {window.location = link;} , 1000);
		else if(action=="captcha")
		{
	    		window.setTimeout(function(){
					document.getElementsByName("captcha_id")[0].parentNode.submit() }, 1000);
		}
		else if(action=="maintenance")
		{
			setTimeout(function(){window.location='http://www.ghost-trappers.com/fb';}, 
				rand*1000);
		}

		else if(action=="wsod")
		{
			window.setTimeout(function() {window.location.reload( false );}, rand);
		}

	}

}

function formatCurrency(strValue)
{
  strValue = strValue.toString().replace(/\$|\,/g,'');
  dblValue = parseFloat(strValue);

  blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
  dblValue = Math.floor(dblValue*100+0.50000000001);
  intCents = dblValue%100;
  strCents = intCents.toString();
  dblValue = Math.floor(dblValue/100).toString();
  if(intCents<10)
    strCents = "0" + strCents;
  for (var i = 0; i < Math.floor((dblValue.length-(1+i))/3); i++)
    dblValue=dblValue.substring(0,dblValue.length-(4*i+3))+','+
    dblValue.substring(dblValue.length-(4*i+3));
  return (((blnSign)?'':'-') + dblValue + '.' + strCents);
}

window.setTimeout(kickOff, 1000);