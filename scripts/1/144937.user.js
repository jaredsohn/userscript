// ==UserScript==
// @name           FuckingHomePageInAustralia
// @namespace      FuckingHomePage
// @description    FuckingHomePage
// @include        http://fuckinghomepage.com/*
// @version        1.0
// ==/UserScript==

var title = document.getElementsByClassName('Title');

pageDay = " ";
pageMonth = " ";
pageDayNumber = " ";
pageYear = " ";

localDay = " ";
localMonth = " ";
localDayNumber = " ";
localYear = " ";
console.log(title[1].innerHTML);
if (title[1].innerHTML.indexOf("JANUARY") > -1)
{
    pageMonth = "JANUARY";
}
else if (title[1].innerHTML.indexOf("FEBRUARY") > -1)
{
    pageMonth = "FEBRUARY";
}
else if (title[1].innerHTML.indexOf("MARCH") > -1)
{
    pageMonth = "MARCH";
}
else if (title[1].innerHTML.indexOf("APRIL") > -1)
{
    pageMonth = "APRIL";
}
else if (title[1].innerHTML.indexOf("MAY") > -1)
{
    pageMonth = "MAY";
}
else if (title[1].innerHTML.indexOf("JUNE") > -1)
{
    pageMonth = "JUNE";
}
else if (title[1].innerHTML.indexOf("JULY") > -1)
{
    pageMonth = "JULY";
}
else if (title[1].innerHTML.indexOf("AUGUST") > -1)
{
    pageMonth = "AUGUST";
}
else if (title[1].innerHTML.indexOf("SEPTEMBER") > -1)
{
    pageMonth = "SEPTEMBER";
}
else if (title[1].innerHTML.indexOf("OCTOBER") > -1)
{
    pageMonth = "OCTOBER";
}
else if (title[1].innerHTML.indexOf("NOVEMBER") > -1)
{
    pageMonth = "NOVEMBER";
}
else if (title[1].innerHTML.indexOf("DECEMBER") > -1)
{
    pageMonth = "DECEMBER";
}

if (title[1].innerHTML.indexOf(" 1, ") > -1)
{
    pageDayNumber = "1";
}

else if (title[1].innerHTML.indexOf(" 2, ") > -1)
{
    pageDayNumber = "2";
}

else if (title[1].innerHTML.indexOf(" 3, ") > -1)
{
    pageDayNumber = "3";
}

else if (title[1].innerHTML.indexOf(" 4, ") > -1)
{
    pageDayNumber = "4";
}

else if (title[1].innerHTML.indexOf(" 5, ") > -1)
{
    pageDayNumber = "5";
}

else if (title[1].innerHTML.indexOf(" 6, ") > -1)
{
    pageDayNumber = "6";
}

else if (title[1].innerHTML.indexOf(" 7, ") > -1)
{
    pageDayNumber = "7";
}

else if (title[1].innerHTML.indexOf(" 8, ") > -1)
{
    pageDayNumber = "8";
}

else if (title[1].innerHTML.indexOf(" 9, ") > -1)
{
    pageDayNumber = "9";
}

else if (title[1].innerHTML.indexOf(" 10, ") > -1)
{
    pageDayNumber = "10";
}

else if (title[1].innerHTML.indexOf(" 11, ") > -1)
{
    pageDayNumber = "11";
}

else if (title[1].innerHTML.indexOf(" 12, ") > -1)
{
    pageDayNumber = "12";
}

else if (title[1].innerHTML.indexOf(" 13, ") > -1)
{
    pageDayNumber = "13";
}

else if (title[1].innerHTML.indexOf(" 14, ") > -1)
{
    pageDayNumber = "14";
}

else if (title[1].innerHTML.indexOf(" 15, ") > -1)
{
    pageDayNumber = "15";
}

else if (title[1].innerHTML.indexOf(" 16, ") > -1)
{
    pageDayNumber = "16";
}

else if (title[1].innerHTML.indexOf(" 17, ") > -1)
{
    pageDayNumber = "17";
}

else if (title[1].innerHTML.indexOf(" 18, ") > -1)
{
    pageDayNumber = "18";
}

else if (title[1].innerHTML.indexOf(" 19, ") > -1)
{
    pageDayNumber = "19";
}

else if (title[1].innerHTML.indexOf(" 20, ") > -1)
{
    pageDayNumber = "20";
}

else if (title[1].innerHTML.indexOf(" 21, ") > -1)
{
    pageDayNumber = "21";
}

else if (title[1].innerHTML.indexOf(" 22, ") > -1)
{
    pageDayNumber = "22";
}

else if (title[1].innerHTML.indexOf(" 23, ") > -1)
{
    pageDayNumber = "23";
}

else if (title[1].innerHTML.indexOf(" 24, ") > -1)
{
    pageDayNumber = "24";
}

else if (title[1].innerHTML.indexOf(" 25, ") > -1)
{
    pageDayNumber = "25";
}

else if (title[1].innerHTML.indexOf(" 26, ") > -1)
{
    pageDayNumber = "26";
}

else if (title[1].innerHTML.indexOf(" 27, ") > -1)
{
    pageDayNumber = "27";
}

else if (title[1].innerHTML.indexOf(" 28, ") > -1)
{
    pageDayNumber = "28";
}

else if (title[1].innerHTML.indexOf(" 29, ") > -1)
{
    pageDayNumber = "29";
}

else if (title[1].innerHTML.indexOf(" 30, ") > -1)
{
    pageDayNumber = "30";
}

else if (title[1].innerHTML.indexOf(" 31, ") > -1)
{
    pageDayNumber = "31";
}



if (title[1].innerHTML.indexOf(", 2012") > -1)
{
    pageYear = "2012";
}

else if (title[1].innerHTML.indexOf(", 2013") > -1)
{
    pageYear = "2013";
}

else if (title[1].innerHTML.indexOf(", 2014") > -1)
{
    pageYear = "2014";
}

else if (title[1].innerHTML.indexOf(", 2015") > -1)
{
    pageYear = "2015";
}

else if (title[1].innerHTML.indexOf(", 2016") > -1)
{
    pageYear = "2016";
}

else if (title[1].innerHTML.indexOf(", 2017") > -1)
{
    pageYear = "2017";
}


var day1 = document.getElementsByClassName("PostBody");
var day2 = day1[0].getElementsByTagName("p");
var day3 = day2[0].getElementsByTagName("strong");

if (day3[0].innerHTML.indexOf("IT’S FUCKING MONDAY.") > -1)
{
    pageDay = "IT’S FUCKING MONDAY."
        }
else if (day3[0].innerHTML.indexOf("IT’S FUCKING TUESDAY.") > -1)
{
    pageDay = "IT’S FUCKING TUESDAY."
        }
else if (day3[0].innerHTML.indexOf("IT’S FUCKING WEDNESDAY.") > -1)
{
    pageDay = "IT’S FUCKING WEDNESDAY."
        }
else if (day3[0].innerHTML.indexOf("IT’S FUCKING THURSDAY.") > -1)
{
    pageDay = "IT’S FUCKING THURSDAY."
        }
else if (day3[0].innerHTML.indexOf("IT’S FUCKING FRIDAY.") > -1)
{
    pageDay = "IT’S FUCKING FRIDAY."
        }
else if (day3[0].innerHTML.indexOf("IT’S FUCKING SATURDAY.") > -1)
{
    pageDay = "IT’S FUCKING SATURDAY."
        }
else if (day3[0].innerHTML.indexOf("IT’S FUCKING SUNDAY.") > -1)
{
    pageDay = "IT’S FUCKING SUNDAY."
        }

/////////////////////////////////////////////////////////////////////////////////////
////////PARSE OUTPUT OF NEW DATE() AND MAKE IT CONFORM TO THE FUCKING THING//////////
/////////////////////////////////////////////////////////////////////////////////////

var date = new Date().toString();
localDay = " ";
localMonth = " ";
localDayNumber = " ";
localYear = " ";
if (date.indexOf("Mon") > -1)
{
    localDay = "IT'S FUCKING MONDAY."
        }
else if (date.indexOf("Tue") > -1)
{
    localDay = "IT'S FUCKING TUESDAY."
        }
else if (date.indexOf("Wed") > -1)
{
    localDay = "IT'S FUCKING WEDNESDAY."
        }
else if (date.indexOf("Thu") > -1)
{
    localDay = "IT'S FUCKING THURSDAY."
        }
else if (date.indexOf("Fri") > -1)
{
    localDay = "IT'S FUCKING FRIDAY."
        }
else if (date.indexOf("Sat") > -1)
{
    localDay = "IT'S FUCKING SATURDAY"
        }
else if (date.indexOf("Sun") > -1)
{
    localDay = "IT'S FUCKING SUNDAY."
        }


if (date.indexOf("Jan") > -1)
{
    localMonth = "JANUARY";
}

else if (date.indexOf("Feb") > -1)
{
    localMonth = "FEBRUARY";
}

else if (date.indexOf("Mar") > -1)
{
    localMonth = "MARCH";
}

else if (date.indexOf("Apr") > -1)
{
    localMonth = "APRIL";
}

else if (date.indexOf("May") > -1)
{
    localMonth = "MAY";
}

else if (date.indexOf("Jun") > -1)
{
    localMonth = "JUNE";
}

else if (date.indexOf("Jul") > -1)
{
    localMonth = "JULY";
}

else if (date.indexOf("Aug") > -1)
{
    localMonth = "AUGUST";
}

else if (date.indexOf("Sep") > -1)
{
    localMonth = "SEPTEMBER";
}

else if (date.indexOf("Oct") > -1)
{
    localMonth = "OCTOBER";
}

else if (date.indexOf("Nov") > -1)
{
    localMonth = "NOVEMBER";
}

else if (date.indexOf("Dec") > -1)
{
    localMonth = "DECEMBER";
}
if (date.indexOf(" 01 ") > -1)
{
    localDayNumber = "1";
}

else if (date.indexOf(" 02 ") > -1)
{
    localDayNumber = "2";
}

else if (date.indexOf(" 03 ") > -1)
{
    localDayNumber = "3";
}

else if (date.indexOf(" 04 ") > -1)
{
    localDayNumber = "4";
}

else if (date.indexOf(" 05 ") > -1)
{
    localDayNumber = "5";
}

else if (date.indexOf(" 06 ") > -1)
{
    localDayNumber = "6";
}

else if (date.indexOf(" 07 ") > -1)
{
    localDayNumber = "7";
}

else if (date.indexOf(" 08 ") > -1)
{
    localDayNumber = "8";
}

else if (date.indexOf(" 09 ") > -1)
{
    localDayNumber = "9";
}

else if (date.indexOf(" 10 ") > -1)
{
    localDayNumber = "10";
}

else if (date.indexOf(" 11 ") > -1)
{
    localDayNumber = "11";
}

else if (date.indexOf(" 12 ") > -1)
{
    localDayNumber = "12";
}

else if (date.indexOf(" 13 ") > -1)
{
    localDayNumber = "13";
}

else if (date.indexOf(" 14 ") > -1)
{
    localDayNumber = "14";
}

else if (date.indexOf(" 15 ") > -1)
{
    localDayNumber = "15";
}

else if (date.indexOf(" 16 ") > -1)
{
    localDayNumber = "16";
}

else if (date.indexOf(" 17 ") > -1)
{
    localDayNumber = "17";
}

else if (date.indexOf(" 18 ") > -1)
{
    localDayNumber = "18";
}

else if (date.indexOf(" 19 ") > -1)
{
    localDayNumber = "19";
}

else if (date.indexOf(" 20 ") > -1)
{
    localDayNumber = "20";
}

else if (date.indexOf(" 21 ") > -1)
{
    localDayNumber = "21";
}

else if (date.indexOf(" 22 ") > -1)
{
    localDayNumber = "22";
}

else if (date.indexOf(" 23 ") > -1)
{
    localDayNumber = "23";
}

else if (date.indexOf(" 24 ") > -1)
{
    localDayNumber = "24";
}

else if (date.indexOf(" 25 ") > -1)
{
    localDayNumber = "25";
}

else if (date.indexOf(" 26 ") > -1)
{
    localDayNumber = "26";
}

else if (date.indexOf(" 27 ") > -1)
{
    localDayNumber = "27";
}

else if (date.indexOf(" 28 ") > -1)
{
    localDayNumber = "28";
}

else if (date.indexOf(" 29 ") > -1)
{
    localDayNumber = "29";
}

else if (date.indexOf(" 30 ") > -1)
{
    localDayNumber = "30";
}

else if (date.indexOf(" 31 ") > -1)
{
    localDayNumber = "31";
}


////////////////////////////////////////////////////////////////////
////////WHAT THE BITCH? LETS INJECT THESE FUCKING VARIABLES!////////
////////////////////////////////////////////////////////////////////

document.body.innerHTML = document.body.innerHTML.replace((pageMonth+" "+pageDayNumber+", "+pageYear), (localMonth+" "+localDayNumber+", "+pageYear));
document.body.innerHTML = document.body.innerHTML.replace(pageDay, localDay);