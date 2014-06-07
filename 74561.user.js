// ==UserScript==
// @name           MyEpisodes.com Links to RLSlog.net
// @namespace      ghoofy007
// @description    It creates links next to each episode and season to search at rlslog.net
// @include        http://www.myepisodes.com/*
// ==/UserScript==

// I hope the guys at the forum myepisodes.com don't mind that I kind of copied their NZB-search script and rewrote it to
// let it search on rlslog.net

// Version 1.00

// Find all the rows in the table that makes up the
// episodes list.
var mylistRows = document.evaluate(
    '//table[@class="mylist"]/tbody/tr',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

var seasonHeaders = new Array();
var showName;
    
for(var i=0 ; i < mylistRows.snapshotLength ; i++){
   var row = mylistRows.snapshotItem(i);
   if(row.className == "header"){
      // Header row, need only extend it to add rls colum
      th = getEmptyHeaderCell();
      row.appendChild(th);
      if(row.childNodes[1].className=="season"){
         seasonHeaders[seasonHeaders.length]=th;
      }
      
   } else if(row.className.substring(0,7)=="Episode"){
      // Episode row. Extract information and add link.
      
      // Find episode data
      var theDate;
      var episodeNumber;
      var episodeName;
      
      for(var j=0 ; j<row.childNodes.length; j++){
         var td = row.childNodes[j];
         
         // DATE
         if(td.className=="date"){
            // Date can also be time.
            // Proper date contains either an A tag or is 11 characters
            // dd-MM-yyyy, either way the innerHTML length is > 6
            if(td.innerHTML.length>6){
               // Got the one.
               if(td.childNodes[0].nodeType==1){
                  // Date is inside an A tag.
                  theDate = td.childNodes[0].innerHTML;
               } else {
                  theDate = td.innerHTML;
               }
            }
            
         // SHOW NAME
         } else if(td.className=="showname"){
            // May be inside an A tag
            if(td.childNodes[0].nodeType==1){
               // Date is inside an A tag.
               showName = td.childNodes[0].innerHTML;
            } else {
               showName = td.innerHTML;
            }
         
         // EPISODE NUMBER
         } else if(td.className=="longnumber"){
            episodeNumber = "S"+ td.innerHTML.replace("x","E");
            
         // EPISODE NAME
         } else if(td.className=="epname"){
            // Always inside an A tag
            episodeName = td.childNodes[0].innerHTML;
         }
            
      }
      
      // Add link.
      row.appendChild(
         getRLScell(
            createSearchURL(
               showName,
               episodeNumber,
               episodeName),
            hasNotAired(theDate)
            )
         );
   }

}

for(var i=0 ; i<seasonHeaders.length ; i++){
   var th = seasonHeaders[i];
   th.appendChild(getShowSeasonLink(showName,i+1));
   th.style.paddingRight="2px";
}

if(seasonHeaders.length>0){
   // Add Episodes by Show link to find all episodes on ThePirateBay
   var offset = 11;
   
   // Check if the episode is on 'my list'
   var tvRageLink = document.evaluate(
         '/html/body/table/tbody/tr/td[2]/div[@id="divContainer"]/div[@id="myepisodes_views"]/table[5]/tbody/tr[2]/td/a',
         document,
         null,
         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
         null).snapshotItem(0);
   if(tvRageLink==null){
      tvRageLink = document.evaluate(
            '/html/body/table/tbody/tr/td[2]/div[@id="divContainer"]/div[@id="myepisodes_views"]/table[2]/tbody/tr[2]/td/a',
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
      offset = 5;
   }
   
   tvRageLink.innerHTML="Info"
   
   var theDiv = document.evaluate(
         '//div[@id="myepisodes_views"]',
         document,
         null,
         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
         null).snapshotItem(0);
    
}



// ***************
// Functions begin
// ***************


// Create empty header cell (th) used for cosmetic effect
function getEmptyHeaderCell(){
   var th = document.createElement("th");
   th.appendChild(document.createTextNode("\u00a0"));
   return th;
}

// Create the table cell (td) that contains the rlslog link.
function getRLScell(linkURL, fadeLink){
   var td = document.createElement("td");
   td.style.paddingLeft="2px";
   td.style.paddingRight="2px";

   var link = document.createElement("a");
   link.href=linkURL;
   link.target = "_blank";
   link.addEventListener("mouseover",linkOver,false);
   link.addEventListener("mouseout",linkOut,false);
   link.appendChild(document.createTextNode("rls"));
   if(fadeLink){
      link.style.color = "grey";
   }

   td.appendChild(link);
   return td;
}

function getShowSeasonLink(showName, season){
   var link = document.createElement("a");
   link.href= createSimpleSearchURL(showName + " Season " + season);
   link.target = "_blank";
   link.addEventListener("mouseover",linkOver,false);
   link.addEventListener("mouseout",linkOut,false);
   link.appendChild(document.createTextNode("rls"));
   link.style.fontWeight="normal";
   return link;
}

// Create the RLSlog search URL
function createSearchURL(showName, episodeNumber, episodeName){
   searchterm = showName + " " + trimNumber(episodeNumber);
   return createSimpleSearchURL(searchterm);
}

function createSimpleSearchURL(searchterm){
   var url = "http://www.rlslog.net/?s=" +
          searchterm;
   return url;
}

// Trim leading zeros from episode number
function trimNumber(s) {
   return s.replace(/^0+/, '');
}

// Event handler when mouseover a link
function linkOver(){
   this.style.textDecoration = "underline";
}

// Event handler when mouseout a link
function linkOut(){
   this.style.textDecoration = "none";
}

// Is the supplied date in the future?
// dateString format: dd-MMM-yyyy (e.g. 16-Dec-2008)
function hasNotAired(dateString){
   if(dateString == "Unknown"){
      return true;
   }
   var theDate = new Date();
   year = dateString.substring(7,11);
   day = dateString.substring(0,2);
   month = dateString.substring(3,6);
   
   switch(month) {
      case "Jan": month = 0; break;   
      case "Feb": month = 1; break;   
      case "Mar": month = 2; break;   
      case "Apr": month = 3; break;   
      case "May": month = 4; break;   
      case "Jun": month = 5; break;   
      case "Jul": month = 6; break;   
      case "Aug": month = 7; break;   
      case "Sep": month = 8; break;   
      case "Okt": month = 9; break;   
      case "Nov": month = 10; break;   
      case "Dec": month = 11; break;   
      default: month = 1;
   }
   theDate.setFullYear(year,month,day);
   
   var today = new Date();
   
   return theDate>today;

}