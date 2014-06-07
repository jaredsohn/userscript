// ==UserScript==
// @name          WebStudy beautifier
// @description   Make WebStudy bearable
// @version       0.1.31.20121001
// @namespace     https://twitter.com/George_Hahn
// @include       *.webstudy.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @require       https://gist.github.com/raw/3123124/grant-none-shim.user.js
// @updateURL     https://github.com/GeorgeHahn/WebStudyBeautifier.JS/raw/master/WebStudyBeautifier.user.js
// @run-at document-start
// @grant none
// ==/UserScript==

// TODO
// Do something about the forum
// Do something about the calendar
// Tear up defframes to make it not load the frames we don't want before they start to load

console.log('WebStudyBeautifier waiting to run');
var haveRun = false;
var readyStateCheckInterval = setInterval(function() {
    if ((document.readyState === "complete") & !haveRun) {
        clearInterval(readyStateCheckInterval);
        haveRun = true;
        console.log('WebStudyBeautifier running');
        LoadCompleteCleanup();
    }
}, 10);

var WSPage = {
  None          : {value: 0, name: "unknown page", page: null},
  LogonPage     : {value: 1, name: "logon page", page: null}, 
  PortalPage    : {value: 2, name: "portal frame", page: "portal/mainnew1.asp"}, 
  TimelinePage  : {value: 3, name: "timeline frame", page: "course/syllabus/mainrd.asp"},
  MainPage      : {value: 4, name: "main frame", page: "course/frntmain1.asp"},
  MainNavPage   : {value: 5, name: "nav frame", page: "course/navigat1.asp"},
  BottomPage    : {value: 6, name: "bottom frame", page: "jump/bottframe.asp"},
  TopNavPage    : {value: 7, name: "top frame", page: "jump/topframe1.asp"},
  FrameContainer: {value: 8, name: "main frame container", page: "jump/defframes.asp"} 
};

function whatPageAreWeOn()
{
    console.log("Running on " + document.location.toString());
	if(document.getElementById('logonImage') != null)
		return WSPage.LogonPage;
	
	for(i in WSPage)
        if(document.location.toString().toLowerCase().indexOf(WSPage[i].page) != -1)
            return WSPage[i];
    return WSPage.None;
}

function LoadCompleteCleanup()
{
    console.log('Cleaning');
    var ourPage = whatPageAreWeOn();
    console.log('Cleaning ' + ourPage.name); 
	switch(ourPage)
	{
		case WSPage.LogonPage:
			removeLoginPopup();
			removeLoginElements();		
			break;
		case WSPage.PortalPage:
			removeUnwantedPortalElements();
			break;
		case WSPage.TimelinePage:
			removeUnwantedTimelineElements();
			break;
		case WSPage.MainPage:
		    removeUnwantedMainpageElements();
		    break;
		case WSPage.MainNavPage:
		    hideNavFrame();
		    break;
		case WSPage.BottomPage:
		    break;
		case WSPage.TopNavPage:
		    removeTopLogo();
		    addNavElements();
		    removeClassMRU();
		    break;
		case WSPage.FrameContainer:
		    hideBottomFrame();
		    break;
		case WSPage.None:
		    break;			
	}
	
	removeMouseTracking();
}

function removeLoginPopup()
{
	// Eliminate login popup
	var loginPopup = document.getElementById('msgBox');
	if(loginPopup != null)
	{
		loginPopup.style.display='none';
		var logonForm = document.body;
		logonForm.setAttribute('onload', 'document.loginform.submit();');
	}
}

function removeLoginElements()
{
	console.log("Removing unwanted elements from login page");
	var unwantedElementIDs = ['logonImage', 'topmenu', 'summer'];
	
	for(o in unwantedElementIDs)
	{
		console.log("Checking for " + unwantedElementIDs[o].toString());
		var element = document.getElementById(unwantedElementIDs[o]);
		if(element != null)
		{
			console.log("Found and removed");
			$(element).remove();
		}
	}
}

function removeUnwantedMainpageElements()
{
    console.log("Removing unwanted mainpage elements");
    //$("div.instLogo").remove();
    //$("div.courseInfo").remove();
    
    var otherInfo = document.getElementById('otherinfo');
    if(otherInfo != null)
    {
        var announcements_content = otherInfo.childNodes[1].childNodes[3].childNodes[1].innerHTML;
        if(announcements_content.indexOf("To contact WebStudy") != -1)
            $("div#otherinfo").remove();
    }    
}

function removeTopLogo()
{
    // Removes the logo at the top of the page
    $(document.getElementsByTagName("a")[0]).remove();
}

function getClassList()
{
    // TODO Load & return classlist
}

function switchToCourse(courseID)
{
    document.getElementById("GoTo").value = intCourseID;
    document.forms["course"].submit();
} 

function addNavElements()
{
    console.log("Adding elements to the navigation bar");
    var menu = document.getElementById('topMenu');
    var homeItem = '<li><a id="home" class="top" target="Main" href="https://cms2.webstudy.com/webcourses/jump/portal/mainnew1.asp" onclick="MakeMenuActive(\'home\');" onmouseover="MakeMenuActive(\'home\', false);">Home</a><ul id="homesub" class="">';
    homeItem = homeItem + '</ul>';
    menu.innerHTML = homeItem + menu.innerHTML;
    console.log("Home button added");
    
    // Load course list from earlier
    var courseCount = GM_getValue("courseCount", 0);
    classes = new Object;
    for(i = 0; i < courseCount; i++)
    {
        classes[i] = new Object;
        classes[i].name = GM_getValue("courseList[" + i + "].name");
        classes[i].description = GM_getValue("courseList[" + i + "].description");
        classes[i].id = GM_getValue("courseList[" + i + "].id");
        classes[i].fn = "$.post(\'https://cms2.webstudy.com/webcourses/jump/topframe1.asp\', {GoTo: " + classes[i].id + "});"
    }
    
    // var classes = {
        // 0 : {name: "Business law", fn: '$.post(\'https://cms2.webstudy.com/webcourses/jump/topframe1.asp\', {GoTo: 54089});'},
        // 1 : {name: "Calc", fn: '$.post(\'https://cms2.webstudy.com/webcourses/jump/topframe1.asp\', {GoTo: 52978});'}
    // };
    
    var navElements = {
      About         : {value: 0, name: "About", page: "About/main.asp"},
      Timeline      : {value: 1, name: "Timeline", page: "syllabus/mainRD.asp"}, 
      News          : {value: 2, name: "News", page: "News/main.asp"}, 
      Links         : {value: 3, name: "Links", page: "Links/main.asp"},
      Students      : {value: 4, name: "Students", page: "students/main.asp"},
      Grades        : {value: 5, name: "Grades", page: "Grades/main.asp"}
    };
    
    for(o in navElements)
        navElements[o].page = 'https://cms2.webstudy.com/webcourses/Course/' + navElements[o].page;
    
    console.log("Adding classes");
    for(c in classes)
    {
        var htmlclassname = classes[c].name.hashCode();
        console.log("Adding " + classes[c].name + "(" + htmlclassname + ")");
        var text = '<li><a id="' + htmlclassname + '" class="top" target="Main" href="https://cms2.webstudy.com/webcourses/Course/frntmain1.asp" ' + 
                   'onclick="' + classes[c].fn + ' MakeMenuActive(\'' + htmlclassname + '\');" onmouseover="MakeMenuActive(\'' + htmlclassname + '\', false);">' + 
                   classes[c].name + '</a><ul id="' + htmlclassname + 'sub" class="">';
        for(o in navElements)
        {
            var item = '<li><a title="' + navElements[o].name + '" href="' + navElements[o].page + '" target="Main" onclick="' +
                classes[c].fn + 'MakeMenuActive(\'' + htmlclassname + '\');" onmouseover="MakeMenuActive(\'' + htmlclassname + 
                '\', false); event.cancelBubble = true;">' + navElements[o].name + '</a></li>';
    
            text = text + item;  
        }
        text = text + '</ul></li>';
        
        menu.innerHTML = menu.innerHTML + text;
    }
}

// Remove the most-recent-class link on the right side of the nav bar
function removeClassMRU()
{
    var classLine = document.getElementsByTagName("form");
    $(classLine[0]).remove();
}

// http://stackoverflow.com/a/3291856
String.prototype.capitalize = function()
{
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// http://stackoverflow.com/a/5122461
String.prototype.capitalizeEach = function()
{
    return this.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
}

// http://snipplr.com/view/14074/
String.prototype.between = function(prefix, suffix)
{
    s = this;
    var i = s.indexOf(prefix);
    if (i >= 0)
        s = s.substring(i + prefix.length);
    else
        return '';
    if (suffix)
    {
        i = s.indexOf(suffix);
        if (i >= 0)
            s = s.substring(0, i);
        else
            return '';
    }
    return s;
}

// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function(){
    var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function extractClassName(desc)
{
    // Extract class title
    desc = desc.slice(0, desc.indexOf('('));
    
    // Nobody likes roman numerals anymore
    desc = desc.replace('Iii', '3').replace('Ii', '2').replace('I', '1');
    
    return desc;
}

function removeUnwantedPortalElements()
{
	console.log("Removing unwanted elements from portal");
	var unwantedElementIDs = ['#wHeader', '#openAll1', '#closeAll1', '#chatCon', '#stuCon', '#coCon'];
	
	var courses = document.getElementById('courseList').getElementsByClassName('WSGroupListItems WSGroupListToToggle')[0].getElementsByTagName('a');
	var courseList = new Object;
	var count = 0;
	for(o in courses)
	{
	    if(courses[o].innerHTML == null)
	       break;
	    
	    count = count + 1;
	       
        courseList[o] = new Object;
        courseList[o].name = extractClassName(courses[o].innerHTML.capitalizeEach());
	    courseList[o].description = courses[o].innerHTML.capitalize();
	    courseList[o].id = courses[o].attributes.onclick.nodeValue.between("(", ")");
	    
        GM_setValue("courseList[" + o + "].name", courseList[o].name);
        GM_setValue("courseList[" + o + "].description", courseList[o].description);
        GM_setValue("courseList[" + o + "].id", courseList[o].id);
        console.log("Course detected: " + courseList[o].name);
        console.log("Course description: " + courseList[o].description);
        console.log("Course id: " + courseList[o].id);
	}
	if(GM_getValue("courseCount", -1) == -1)
	{
	   console.log("Reloading navbar");
	   window.top.window.frames[0].location.reload();   
    }
    
	GM_setValue("courseCount", count);
	
    
    for(o in unwantedElementIDs)
    {
        console.log("Attempting to remove " + unwantedElementIDs[o].toString());
        $(unwantedElementIDs[o]).remove();
    }
}

function removeUnwantedTimelineElements()
{
	console.log("Removing unwanted elements from timeline");
	var unwantedElementIDs = ["#conMenu"];
	
	for(o in unwantedElementIDs)
	{
		console.log("Attempting to remove " + unwantedElementIDs[o].toString());
		$(unwantedElementIDs[o]).remove();
	}
}

function changeMainFrame(URL)
{
    console.log("Loading in main frame: " + URL);
	var mainFrame = window.frames[1].window.frames[0].document.URL = URL; 
}

function hideBottomFrame()
{
    console.log("Hiding bottom frame");
    var frameset = window.top.document.getElementsByTagName("frameset")[0];
    frameset.rows = "61,*,0";
}

function hideNavFrame()
{
    console.log("Hiding navigation frame");
    var frameset = window.top.window.frames[1].document.getElementsByTagName("frameset")[0];
    frameset.cols = "*,0";
}

function removeMouseTracking()
{
    console.log('Removing mouse tracking');
	document.onmousemove = null;
}
