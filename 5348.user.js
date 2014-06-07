// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "Irish rail Accessibility Remediation", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// www.irishrail.ie:
//	- adds alternative text to images
//	- adds indication concerning the language of the web site
//	- replace misplaced Form associated with the "Search" field
// Possible improvement:
//  The Form works but there is an error on the condition generates by the JavaScript console
//
//
// --------------------------------------------------------------------


// ==UserScript==
// @name Irish rail Accessibility Remediation
// @namespace http://diveintogreasemonkey.org/download/
// @description  Add alternative text to any images contained in the web sites wwww.irishrail.ie,the language and replace a Form element
// @include http://www.irishrail.ie/*
// @include https://www.irishrail.ie/*
// ==/UserScript==/

 
(function(){

var allLinks, thisLink ,allLinks2;
allLinks = document.evaluate('//img',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

var number_images=window.document.images.length;

for (var i = 0; i < allLinks.snapshotLength; i++) {

thisLink = allLinks.snapshotItem(i);
var href =window.location.href;

if(href.match(/^https:\/\/www\.irishrail\.ie\/home/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i==6)
thisLink.alt="";
if(i==7)
thisLink.alt="List of the departure station";
if(i==8)
thisLink.alt="List of the destination station";
if(i==9)
thisLink.alt="Select the date of departure on the calendar";
if(i==10)
thisLink.alt="Select the date of return on the calendar";
if(i==11)
thisLink.alt="Reserve a seat";
if(i==12)
thisLink.alt="this image is a special link if you wish to follow the ryder cup";
if(i==13)
thisLink.alt="Special offers provided by the Website";
if(i==14)
thisLink.alt="Information on student travel card";
if(i==15)
thisLink.alt="Tax saver Tickets purchase";
if(i==16)
thisLink.alt="Information on rail break";
if(i==17)
thisLink.alt="Europe rail";
if(i==18)
thisLink.alt="Commuter tickets purchase";
if(i==19)
thisLink.alt="Information on ireland Rail tours";
if(i==20)
thisLink.alt="Information on Ireland Ferryport";
}
if(href.match(/^http:\/\/www\.irishrail\.ie\/home/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i==6)
thisLink.alt="";
if(i==7)
thisLink.alt="";
if(i==8)
thisLink.alt="List of the departure station";
if(i==9)
thisLink.alt="List of the destination station";
if(i==10)
thisLink.alt="Select the date of departure on the calendar";
if(i==11)
thisLink.alt="Select the date of return on the calendar";
if(i==12)
thisLink.alt="Reserve a seat";
if(i==13)
thisLink.alt="this image is a special link if you wish to follow the ryder cup";
if(i==14)
thisLink.alt="Special offers provided by the Website";
if(i==15)
thisLink.alt="Information on student travel card";
if(i==16)
thisLink.alt="Tax saver Tickets purchase";
if(i==17)
thisLink.alt="Information on rail break";
if(i==18)
thisLink.alt="Europe rail";
if(i==19)
thisLink.alt="Commuter tickets purchase";
if(i==20)
thisLink.alt="Information on ireland Rail tours";
if(i==21)
thisLink.alt="Information on Ireland Ferryport";
}


if(href.match(/^https:\/\/www\.irishrail\.ie\/seat_reservation\/my_account\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<13)
thisLink.alt="";
if(i==13)
thisLink.alt="click here to confitm your inscription at the newsletter";
if(i==14)
thisLink.alt="";
if(i==15)
thisLink.alt="";
if(i==16)
thisLink.alt="Special offers provided by the Website";
if(i==17)
thisLink.alt="Information on student travel card";
if(i==18)
thisLink.alt="Tax saver Tickets purchase";
if(i==19)
thisLink.alt="Information on rail break";
if(i==20)
thisLink.alt="Europe rail";
if(i==21)
thisLink.alt="Commuter tickets purchase";
if(i==22)
thisLink.alt="Information on ireland Rail tours";
if(i==23)
thisLink.alt="Information on Ireland Ferryport";
}

if(href.match(/^https:\/\/www\.irishrail\.ie\/your_journey\/printed_timetables\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<319)
thisLink.alt="";
if(i==319)
thisLink.alt="Special offers provided by the Website";
if(i==320)
thisLink.alt="Information on student travel card";
if(i==321)
thisLink.alt="Tax saver Tickets purchase";
if(i==322)
thisLink.alt="Information on rail break";
if(i==323)
thisLink.alt="Europe rail";
if(i==324)
thisLink.alt="Commuter tickets purchase";
if(i==325)
thisLink.alt="Information on ireland Rail tours";
if(i==326)
thisLink.alt="Information on Ireland Ferryport";

}
if(href.match(/^http:\/\/www\.irishrail\.ie\/your_journey\/printed_timetables\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<320)
thisLink.alt="";
if(i==320)
thisLink.alt="Special offers provided by the Website";
if(i==321)
thisLink.alt="Information on student travel card";
if(i==322)
thisLink.alt="Tax saver Tickets purchase";
if(i==323)
thisLink.alt="Information on rail break";
if(i==324)
thisLink.alt="Europe rail";
if(i==325)
thisLink.alt="Commuter tickets purchase";
if(i==326)
thisLink.alt="Information on ireland Rail tours";
if(i==327)
thisLink.alt="Information on Ireland Ferryport";
}

if(href.match(/^http:\/\/www\.irishrail\.ie\/home\/company_information\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<83)
thisLink.alt="";
if(i==83)
thisLink.alt="Special offers provided by the Website";
if(i==84)
thisLink.alt="Information on student travel card";
if(i==85)
thisLink.alt="Tax saver Tickets purchase";
if(i==86)
thisLink.alt="Information on rail break";
if(i==87)
thisLink.alt="Europe rail";
if(i==88)
thisLink.alt="Commuter tickets purchase";
if(i==89)
thisLink.alt="Information on ireland Rail tours";
if(i==90)
thisLink.alt="Information on Ireland Ferryport";
}
if(href.match(/^https:\/\/www\.irishrail\.ie\/home\/company_information\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<82)
thisLink.alt="";
if(i==82)
thisLink.alt="Special offers provided by the Website";
if(i==83)
thisLink.alt="Information on student travel card";
if(i==84)
thisLink.alt="Tax saver Tickets purchase";
if(i==85)
thisLink.alt="Information on rail break";
if(i==86)
thisLink.alt="Europe rail";
if(i==87)
thisLink.alt="Commuter tickets purchase";
if(i==88)
thisLink.alt="Information on ireland Rail tours";
if(i==89)
thisLink.alt="Information on Ireland Ferryport";
}


if(href.match(/^http:\/\/www\.irishrail\.ie\/your_journey\/specials\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<11)
thisLink.alt="";
if(i==11)
thisLink.alt="Special offers provided by the Website";
if(i==12)
thisLink.alt="Information on student travel card";
if(i==13)
thisLink.alt="Tax saver Tickets purchase";
if(i==14)
thisLink.alt="Information on rail break";
if(i==15)
thisLink.alt="Europe rail";
if(i==16)
thisLink.alt="Commuter tickets purchase";
if(i==17)
thisLink.alt="Information on ireland Rail tours";
if(i==18)
thisLink.alt="Information on Ireland Ferryport";
}
if(href.match(/^https:\/\/www\.irishrail\.ie\/your_journey\/specials\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<10)
thisLink.alt="";
if(i==10)
thisLink.alt="Special offers provided by the Website";
if(i==11)
thisLink.alt="Information on student travel card";
if(i==12)
thisLink.alt="Tax saver Tickets purchase";
if(i==13)
thisLink.alt="Information on rail break";
if(i==14)
thisLink.alt="Europe rail";
if(i==15)
thisLink.alt="Commuter tickets purchase";
if(i==16)
thisLink.alt="Information on ireland Rail tours";
if(i==17)
thisLink.alt="Information on Ireland Ferryport";
}

if(href.match(/^http:\/\/www\.irishrail\.ie\/home\/contact_us\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<8)
thisLink.alt="";
if(i==8)
thisLink.alt="Special offers provided by the Website";
if(i==9)
thisLink.alt="Information on student travel card";
if(i==10)
thisLink.alt="Tax saver Tickets purchase";
if(i==11)
thisLink.alt="Information on rail break";
if(i==12)
thisLink.alt="Europe rail";
if(i==13)
thisLink.alt="Commuter tickets purchase";
if(i==14)
thisLink.alt="Information on ireland Rail tours";
if(i==15)
thisLink.alt="Information on Ireland Ferryport";
}

if(href.match(/^https:\/\/www\.irishrail\.ie\/home\/contact_us\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<7)
thisLink.alt="";
if(i==7)
thisLink.alt="Special offers provided by the Website";
if(i==8)
thisLink.alt="Information on student travel card";
if(i==9)
thisLink.alt="Tax saver Tickets purchase";
if(i==10)
thisLink.alt="Information on rail break";
if(i==11)
thisLink.alt="Europe rail";
if(i==12)
thisLink.alt="Commuter tickets purchase";
if(i==13)
thisLink.alt="Information on ireland Rail tours";
if(i==14)
thisLink.alt="Information on Ireland Ferryport";
}



if(href.match(/^http:\/\/www\.irishrail\.ie\/your_journey\/timetables\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<11)
thisLink.alt="";
if(i==13)
thisLink.alt="Special offers provided by the Website";
if(i==14)
thisLink.alt="Information on student travel card";
if(i==15)
thisLink.alt="Tax saver Tickets purchase";
if(i==16)
thisLink.alt="Information on rail break";
if(i==17)
thisLink.alt="Europe rail";
if(i==18)
thisLink.alt="Commuter tickets purchase";
if(i==19)
thisLink.alt="Information on ireland Rail tours";
if(i==20)
thisLink.alt="Information on Ireland Ferryport";
}

if(href.match(/^https:\/\/www\.irishrail\.ie\/your_journey\/timetables\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<12)
thisLink.alt="";
if(i==12)
thisLink.alt="Special offers provided by the Website";
if(i==13)
thisLink.alt="Information on student travel card";
if(i==14)
thisLink.alt="Tax saver Tickets purchase";
if(i==15)
thisLink.alt="Information on rail break";
if(i==16)
thisLink.alt="Europe rail";
if(i==17)
thisLink.alt="Commuter tickets purchase";
if(i==18)
thisLink.alt="Information on ireland Rail tours";
if(i==19)
thisLink.alt="Information on Ireland Ferryport";
}

if(href.match(/^http:\/\/www\.irishrail\.ie\/home\/search\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<8)
thisLink.alt="";
if(i==8)
thisLink.alt="Special offers provided by the Website";
if(i==9)
thisLink.alt="Information on student travel card";
if(i==10)
thisLink.alt="Tax saver Tickets purchase";
if(i==11)
thisLink.alt="Information on rail break";
if(i==12)
thisLink.alt="Europe rail";
if(i==13)
thisLink.alt="Commuter tickets purchase";
if(i==14)
thisLink.alt="Information on ireland Rail tours";
if(i==15)
thisLink.alt="Information on Ireland Ferryport";

}
if(href.match(/^https:\/\/www\.irishrail\.ie\/home\/search\.asp/i)){
if(i==0)
thisLink.alt="Irishrail logo linked to the home page";
if(i==1)
thisLink.alt="launch any research on the website";
if(i==2)
thisLink.alt="Website's home";
if(i==3)
thisLink.alt="Your account";
if(i==4)
thisLink.alt="Timetables of the trains";
if(i==5)
thisLink.alt="Company's information";
if(i>5 && i<7)
thisLink.alt="";
if(i==7)
thisLink.alt="Special offers provided by the Website";
if(i==8)
thisLink.alt="Information on student travel card";
if(i==9)
thisLink.alt="Tax saver Tickets purchase";
if(i==10)
thisLink.alt="Information on rail break";
if(i==11)
thisLink.alt="Europe rail";
if(i==12)
thisLink.alt="Commuter tickets purchase";
if(i==13)
thisLink.alt="Information on ireland Rail tours";
if(i==14)
thisLink.alt="Information on Ireland Ferryport";

}
}

//set the language
var allLinks2 = document.evaluate('//html',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
thisLink = allLinks2.snapshotItem(0);
thisLink.lang="en";


//replace the form
allLinks = document.evaluate('//table',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var thelink= allLinks.snapshotItem(4);

var thelink2=thelink.lastChild.firstChild.childNodes[3];//form
var thelink3=thelink.lastChild.firstChild.childNodes[5];//td containing the input

thelink3.parentNode.removeChild(thelink3);
thelink2.parentNode.removeChild(thelink2);


var td = document.createElement("TD");
td.innerHTML='<TD valign="center"; align="right";><FORM METHOD="POST"; ACTION="../home/search.asp"; name="frmSearch";<input type = "text"; name ="search"; value = "Site Search"; maxlength = "30"; onFocus="if(this.value=="Site Search")this.value="";" onBlur="if(this.value=="")this.value="Site Search";" ></td>';

var thelink4=thelink.lastChild.firstChild.childNodes[4];
thelink4.parentNode.insertBefore(td, thelink4);

}());


