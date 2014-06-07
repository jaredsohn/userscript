// ==UserScript==
// @name       Blackboard Connect Content Collection Folder Bookmarking
// @namespace  http://connect.ubc.ca
// @version    1.0
// @description  Allows bookmarking of favourite folders when adding files from the content collection.
// @match      https://connect.ubc.ca/webapps/*
// @copyright  2013+, Bill Pickard
// ==/UserScript==


//w3schools setcookie function
function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

//w3schools getcookie function
function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

//get element using the xpath (found on stackOverflow)
function getElementByXpath (path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
};

//modification of the above function to grab the course name (possibly rewrite and combine for next version)
function getCourseName(path){
    var cc = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
    return cc.trim();

}

//delete the cookie (not hooked into anything currently)
function clearBookMarks(){
 var bookmarkstring = "";
 setCookie("bbBookmarks",bookmarkstring,-1);
}

//update the cookie with the bookmark array
function saveBookMarks(){
    var bookmarkstring = JSON.stringify(bookMarksArray);
    setCookie("bbBookmarks",bookmarkstring,365);
}

//display the bookmark list
function updateBookMarkList(){
   
    //find the div just above the file list
    var targetTable = getElementByXpath('//*[@id="containerdiv"]/div[2]');
    
    //remove the current style (default style disables mouse input)
    targetTable.setAttribute("style","");
    
    //define the bookmark element and bookmark list
	var bmElement = document.getElementById("bbBookmarks")
    var bmList;
    
    //if the bookmark element doesn't exist create it, otherwise use the existing one
    if(bmElement==null){
	    bmList = document.createElement('div');
        targetTable.appendChild(bmList);
    	bmList.setAttribute("id","bbBookmarks");
        
    }else{
     	bmList = bmElement; 
        bmList.innerHTML = '';
    }
    
    
    if(bookMarksArray.length == undefined){
     return;   
    }
    
    //create the bookmark link and create the bookmark removal link
    for(var q=0;q<bookMarksArray.length;q++){
           var rLink = document.createElement("a")
           rLink.setAttribute("myid",String(q));
           rLink.setAttribute("href","#");
           rLink.setAttribute("style","color:red");
           rLink.innerText = "[X]";
           rLink.addEventListener("click",removeMe)
     	   var cName = bookMarksArray[q].course;
           var cLink = bookMarksArray[q].link;
           var cTextN = bookMarksArray[q].textName;
           var cItem = document.createElement("p")
           cItem.innerHTML = '<b>Bookmark:</b> ['+cName+']:<a href="#" onclick="'+cLink+'">'+cTextN+'</a> ';
     	   bmList.appendChild(cItem);
   		   cItem.appendChild(rLink);
    }
    
    
}

//remove the bookmark from the array and update the cookie
function removeMe(e){
    var linkToRemove = e.target.getAttribute("myid");
    bookMarksArray.splice(linkToRemove,1)
    saveBookMarks();
    updateBookMarkList();
}

//create the bookmark object and save it to the cookie
function bookMarkMe(e){
	var linkToBookmark = e.target.getAttribute("mylink");
    var bookMarkObject = new Object();
    bookMarkObject.link = linkToBookmark;
    bookMarkObject.course = courseName;
    bookMarkObject.textName = e.target.getAttribute("textName");
    bookMarksArray.push(bookMarkObject);
    saveBookMarks();
    updateBookMarkList();
}
  
//END FUNCTION DEFINITION

var ccTable = document.getElementById("listContainer_databody");
var tableLinks;
var linkArray;
var courseName;
var bookMarksArray;

//only run if the course list table is present
if(ccTable != null){
  tableLinks = ccTable.getElementsByTagName("a");
  linkArray = [];
  courseName = getCourseName('//*[@id="quickPath"]/div/div[2]/ol/li');
  bookMarksArray = [];

  //check if bookmarks array exists in cookie, and if so, populate the array from the cookie
  if(getCookie("bbBookmarks") != null && getCookie("bbBookmarks") != undefined){
   bookMarksArray = eval(getCookie("bbBookmarks"));  
  }
  //otherwise, if the cookie returns a zero length array, redefine the array
  if(bookMarksArray == undefined){
   bookMarksArray = [];   
  }

  //loop through the links in the table, push folder links into the array and discard file objects
  for(var i=0;i<tableLinks.length;i++){
      if(tableLinks[i].getAttribute("class")==null){
     	  linkArray.push(tableLinks[i]);   
      }
  }

    //for each folder link we find, add a [+] bookmark link, set a listener on that link to the bookmark function
  for(var j=0;j<linkArray.length;j++){
      var bookMarkLink = document.createElement("a")
      bookMarkLink.innerHTML = " [+]";
      bookMarkLink.setAttribute("style","color:red;");
      bookMarkLink.setAttribute("href","#");
      bookMarkLink.setAttribute("myvalue",linkArray[j]);
      bookMarkLink.setAttribute("textName",linkArray[j].innerHTML);
      bookMarkLink.setAttribute("mylink",linkArray[j].getAttribute("onclick"));
      bookMarkLink.addEventListener("click",bookMarkMe);
      linkArray[j].parentNode.appendChild(bookMarkLink);
  }

   //if there are bookmarks present, display them
  if(bookMarksArray.length){
     updateBookMarkList();
  }
}