// ==UserScript==

// @name           Google News newspaper last page

// @namespace      maeki.org

// @description    Start viewing newspapers from the last page on Google News

// @include        http://news.google.com/newspapers*

// @require        https://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js

// ==/UserScript==



var jtp = document.getElementById('jtp');

var pageCountString = jtp.nextSibling.textContent;

var pageCount = pageCountString.substring(4,pageCountString.length);

if(document.location.href.indexOf("&jtp")<1) {

  document.location.href = document.location.href+"&jtp="+(pageCount);

 }

 else {

   var fs_btn = $('div.SPRITE_fullscreen-2')[0];

   fireEvent(fs_btn, 'click');



   var currentIssueString = $('div#volume_title>strong>a>nobr')[0].textContent;

   var currentIssue = 

     currentIssueString

     .match(/[A-S][a-u][b-y] [1-3]?[0-9], [1-2][0-9][0-9][0-9]/);



   var ci_date = Date.parse(currentIssue);

   var nday = getOffsetURL(ci_date, 1);

   var nweek = getOffsetURL(ci_date, 7);

   var pday = getOffsetURL(ci_date, -1);

   var pweek = getOffsetURL(ci_date, -7);

   

   var ban_link = $('div#volume_title')[2];

   $(ban_link).clone(true).appendTo(ban_link.parentNode);

   $(ban_link).clone(true).appendTo(ban_link.parentNode);



   var nday_link = $('div#volume_title')[3];

   nday_link.childNodes[0].childNodes[0].setAttribute('href', nday.URL);

   nday_link.childNodes[0].childNodes[0].childNodes[0].textContent = "Skip to " + nday.dateString + " Â»";
   nday_link.style.backgroundColor = '#6da641';
   nday_link.childNodes[0].childNodes[0].style.color = 'black';	



var nweek_link = $('div#volume_title')[4];

   nweek_link.childNodes[0].childNodes[0].setAttribute('href', nweek.URL);

   nweek_link.childNodes[0].childNodes[0].childNodes[0].textContent = "Skip to " + nweek.dateString + " Â»";
   nweek_link.style.backgroundColor = '#40ff00';
 	  nweek_link.childNodes[0].childNodes[0].style.color = 'black';


   var pday_link = $(nweek_link).clone(true).prependTo(ban_link.parentNode);

   var pweek_link = $(nweek_link).clone(true).prependTo(ban_link.parentNode);



   var pweek_link = $('div#volume_title')[0];

   pweek_link.childNodes[0].childNodes[0].setAttribute('href', pweek.URL);

   pweek_link.childNodes[0].childNodes[0].childNodes[0].textContent = "Â« Back to " + pweek.dateString;
   pweek_link.style.backgroundColor = '#e42219';

   

   var pday_link = $('div#volume_title')[1];

   pday_link.childNodes[0].childNodes[0].setAttribute('href', pday.URL);

   pday_link.childNodes[0].childNodes[0].childNodes[0].textContent = "Â« Back to " + pday.dateString;
   pday_link.style.backgroundColor = '#d0364e';

   var p1_link = document.createElement('a');
   p1_link.href=document.location.href.replace(/jtp=[0-9]+/, 'jtp=1');
   p1_link.textContent = 'P1';
   p1_link.style.backgroundColor = 'yellow';
   $(p1_link).prependTo(jtp.parentNode.parentNode); 
   p1_link.style.paddingRight='3px'; 

   create_calendar(ci_date);

   document.getElementById('jtp_form').removeChild(document.getElementById('jtp_form').childNodes[1]);
 }



function fireEvent(element, event)

{

  if (document.createEventObject)

    {

      // dispatch for IE

      var evt = document.createEventObject();



      try 

	{

	  return element.fireEvent('on' + event, evt);

	} 

      finally 

		{

		  element = undefined;

		  event = undefined;

		  evt = undefined;

		}

    }

	else

	  {

		// dispatch for firefox + others

	    var evt = document.createEvent("HTMLEvents");

	    evt.initEvent(event, true, true ); // event type,bubbling,cancelable

	    

	    try 

	      {

		return !element.dispatchEvent(evt);

	      } 

	    finally 

		{

		  element = undefined;

		  event = undefined;

		  evt = undefined;

		}

	}

}



function getOffsetURL(ci_date, offset)

{

  var ni_date = ci_date + offset * 1000 * 3600 * 24;

  var nextIssueDate=new Date(ni_date);

  var ni_day = nextIssueDate.getDate();

  if(ni_day<10)

    ni_day = new String("0") + ni_day;

  var ni_month = nextIssueDate.getMonth()+1;

  if(ni_month<10)

    ni_month = new String("0") + ni_month;

  var ni_year = nextIssueDate.getFullYear();

  var ni_param = new String(ni_year)+new String(ni_month)+ new String(ni_day);

  

    var hrefstring = document.location

    .href.replace(/[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/, 

		  ni_param);

  hrefstring = hrefstring.replace(/\&jtp=[0-9]+/, "");

  var returnObject = new Object;

  returnObject.URL = hrefstring;

  returnObject.dateString = nextIssueDate.toDateString();

  return returnObject;

}

function create_calendar(a_date) {
  var float_cal = document.createElement("div");
  float_cal.id='popup_calendar';
  float_cal.style.display='none';
  float_cal.style.float="left";
  float_cal.style.backgroundColor='#44FF99';
  float_cal.style.position="absolute";
  float_cal.style.top="0";
  float_cal.style.left=$("div#volume_title")[2].offsetLeft+"px";
  float_cal.innerHTML="<table><tr><td>S</td><td>M</td><td>T</td><td>W</td><td>T</td><td>F</td><td>S</td></tr></table>";
  float_cal.style.width="160px";

  var tempCal = new Date(a_date);
  var today = tempCal.getDate();
  tempCal.setDate(1);

  var daynum = 1;
  var dow = tempCal.getDay();
  var curr_month = tempCal.getMonth();
  var new_row = document.createElement('tr');
  var first_row = 'true';
  new_row.id='cal_firstrow';
  float_cal.childNodes[0].childNodes[0].appendChild(new_row);
  for (var i=0;i<dow;i++) {
    var empty_cell = document.createElement('td');
    empty_cell.innerHTML = "&nbsp;";
    new_row.appendChild(empty_cell);
  }
  while(daynum<32 && tempCal.getMonth() == curr_month) {
    var new_cell = document.createElement('td');
    var new_link = document.createElement('a');
    new_link.appendChild(document.createTextNode(daynum));
    new_link.href = getOffsetURL(tempCal.getTime(), 0).URL;
    if(daynum == today)
      new_link.style.fontWeight='bold';
    new_cell.appendChild(new_link);
    if(first_row=='true')
      new_row.appendChild(new_cell);
    else
      float_cal.childNodes[0].lastChild.appendChild(new_cell);
    daynum++;
    dow++;
    if(dow==7) {
      dow = 0;
      var new_tr = document.createElement('tr');
      new_cell.parentNode.parentNode.appendChild(new_tr);
      first_row = "false";
    }
    tempCal.setDate(daynum);
  }
  
  document.getElementById("viewport").appendChild(float_cal);

  $('div#volume_title')[2].addEventListener('mouseover', showPopupCalendar, true);
  document.getElementById('popup_calendar').addEventListener('click', hidePopupCalendar, true);
}

function showPopupCalendar() {
  document.getElementById('popup_calendar').style.display='block';
}

function hidePopupCalendar() {
  document.getElementById('popup_calendar').style.display='none';
}

