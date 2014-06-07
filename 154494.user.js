// ==UserScript==
// @name       Hide Unused Options (Shrink Nav Bar) And More
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://elevationdcmedia.com/cms/Modules/IMG/ContentHero/*
// @copyright  2012+, You
// ==/UserScript==

//remove useless links from nav bar on side, replace icons for "edit" and "delete" with text
var links = document.getElementsByTagName('a');
for (var i = 0; i<links.length; i++){
    if (links[i].className == "copy action" || links[i].href == "http://elevationdcmedia.com/cms/Modules/IMG/ContentHero/Image/AddImage.aspx"){
        links[i].setAttribute("style","display:none;");
        console.log("removed link");
    }
    if (links[i].className == "action pageEdit"){
        links[i].setAttribute("class","");
       links[i].insertAdjacentHTML("beforeEnd","Edit");        
    }
    if (links[i].className == "action delete"){
        links[i].setAttribute("class","");
       links[i].insertAdjacentHTML("beforeEnd","Delete");        
    }
}

//replace "list image" and "image" with useful text
var imagelabels = document.getElementsByTagName('label');
if (imagelabels){
for (var i = 0; i <imagelabels.length; i++){
    if (imagelabels[i].innerText == "List Image:"){
        imagelabels[i].innerText = "Thumbnail image";
    }
    else if (imagelabels[i].innerText == "Image:"){
        imagelabels[i].innerText = "Full-size image";

        }
    }
}


///remove fields in main CMS that aren't used
var annoyingfield = document.getElementById('ctl00_Main_TextBoxNewsSourceLink');
if (annoyingfield){
    console.log(annoyingfield);
annoyingfield.setAttribute("style","display:none");
                   console.log("annoying field is now less annoying");
                  }

var annoyingfield2 = document.getElementById('ctl00_Main_TextBoxLink');
if (annoyingfield2){
annoyingfield2.setAttribute("style","display:none");
console.log("annoying field is now less annoying");
}

var annoyingfield3 = document.getElementById('ctl00_Main_TextBoxSubtitle');
if (annoyingfield3){
annoyingfield3.setAttribute("style","display:none");
console.log("annoying field is now less annoying");
}

//remove labels for fields removed above
var labels = document.getElementsByTagName('label');
if (labels){
for (var i = 0; i<labels.length; i++){
    if (labels[i].htmlFor == "TextBoxNewsSourceLink" || labels[i].htmlFor == "TextBoxLink" || labels[i].htmlFor == "TextBoxSubtitle"){
        labels[i].setAttribute("style","display:none;");
    }
}
}

//remove tooltips since they're useless
var tooltips = document.getElementsByClassName('toolTip');
if (tooltips) {
for (var i=0; i<tooltips.length; i++){
    tooltips[i].setAttribute("style","display:none;");
}
}

//make butterfly boxes in issue builder a lot bigger
console.log("imma make these boxes bigger");
var selectDivs = document.getElementsByClassName('fileMultiSelect');
//console.log("got selectdivs?");
for (var i=0; i<selectDivs.length; i++){
    selectDivs[i].setAttribute("style","width:950px;");
}

var selectSelectors = document.getElementsByClassName('fileMultiSelectListBox');
for (var i=0; i<selectSelectors.length; i++){
    selectSelectors[i].setAttribute("style","width:350px;height:200px;");

}


//make butterfly boxes display last modified date; sorting comes later
var iHateTheseSelectors = new Array("ctl00_Main_MultiSelectFeatureNews_ListBoxAvailable", "ctl00_Main_MultiSelectInnovationNews_ListBoxAvailable","ctl00_Main_MultiSelectDevelopmentNews_ListBoxAvailable","ctl00_Main_MultiSelectInTheNews_ListBoxAvailable");

for (var i=0; i<iHateTheseSelectors.length; i++){
    fixthese(iHateTheseSelectors[i]);

}
function fixthese(theSelector){
var featuresbox = document.getElementById(theSelector);
    var fancyfeaturesarray = new Array();
    if (featuresbox){
var featuresboxen = featuresbox.options;
for (var i=0; i<featuresboxen.length; i++){
    newtitle = featuresboxen[i].title.substring(9, featuresboxen[i].title.length);
   // console.log(newtitle);
  //  featuresboxen[i].insertAdjacentHTML("afterBegin", newtitle + "  ");
    
    //convert date string into utc date
    var newtitleDate = new Date(newtitle);
    
    //put this into a new array that GM can handle
    fancyfeaturesarray[i]={date:newtitleDate,title:featuresboxen[i].text,value:featuresboxen[i].value}
}
        //sort that array
        fancyfeaturesarray.sort(function(a,b){return b.date-a.date});
                console.log(fancyfeaturesarray);

        //make a new selector using this info
        featuresboxen.length=0;
        for (var i = 0; i<fancyfeaturesarray.length; i++){
            featuresboxen[i]=new Option(fancyfeaturesarray[i].title,fancyfeaturesarray[i].value,false, false);
        }
}
}
//some very page-specific stuff

var currentPage = document.URL;
console.log(currentPage);

if (currentPage == "http://elevationdcmedia.com/cms/Modules/IMG/ContentHero/Project/AddDevProject.aspx?ContentName=DevProject"){
//auto-fill city and state for projects page
    var companycity = document.getElementById("ctl00_Main_TextBoxCompanyCity");
    var companystate = document.getElementById("ctl00_Main_TextBoxCompanyState");
companycity.setAttribute("value","Washington");
    companystate.setAttribute("value","DC");
}

//stop sending me to useless blank page on log-in
else if (currentPage == "http://elevationdcmedia.com/cms/Login.aspx?ReturnUrl=%2fcms%2fDefault.aspx"){
    var postbutton = document.getElementById("Form1");
    document.getElementById("CheckBoxPersist").checked = true;
    postbutton.setAttribute("action", "Login.aspx?ReturnUrl=%2fcms%2fModules%2fIMG%2fContentHero%2fFeatureStory%2fListFeatureStory.aspx");
}
