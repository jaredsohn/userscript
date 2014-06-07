// ==UserScript==
// @name           GLBForumMultiSelect
// @namespace      GLB
// @description    Select Multiple Items to modify for forums
// @include        http://goallineblitz.com/game/forum_thread_list.pl?*
// ==/UserScript==
// 
// 
// 
//function to allow for searching and retrieving elements by class name
function getElementsByClassName(classname, par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};

function SelAll(){
    var selectallobj = document.getElementsByClassName('forummulti', document);
    for (var k=0;k<selectallobj.length;k++) {
        selectallobj[k].setAttribute("checked", true);
    }
}

function MakeSticky(){

    //disable button and change display
	var button = document.getElementsByClassName('jbuttons');
    for (var butlist = 0; butlist < button.length; butlist++) {
    
        button[butlist].setAttribute("disabled", true);
        button[butlist].setAttribute("value", "Working...")

    }

	var gonethrough =0;
	var goalnum =0;
	
	//pull each new post element  : sticky_thread thread thread_new_posts   alternating_color2 thread thread_new_posts
	var stickies = getElementsByClassName('forummulti',document);
	var pagelink = '';
    
    for (var j = 0; j <stickies.length; j++) {
        if (stickies[j].checked) {
            goalnum = goalnum + 1;
        }
    }
    var teamstartpoint = window.location.href.indexOf('team_id=') + 8
    var teamendpoint = window.location.href.indexOf('&', teamstartpoint)
    if (teamstartpoint > teamendpoint) {
        var teamid = window.location.href.substr(teamstartpoint);
    }else{
        var teamid = window.location.href.substring(teamstartpoint, teamendpoint);
    }


	window.goalnum = goalnum;
	//if no new posts just reload page
	if (goalnum ==0) {
		window.location.reload();
	}

	//loop through links and open last page of new posts
	for (var i = 0;i<stickies.length;i++) {
        if (stickies[i].checked) {
            pagelink = '/game/forum_thread_list.pl?forum_id=0&team_id=' + teamid + '&thread_id=' + stickies[i].id + '&sticky=1';
            
            //load link in GETHTTP request
            window.setTimeout(function(arg1){return function(){DoPage(arg1);}}(pagelink),window.timeouttime);
            
            window.timeouttime +=1500;
        }
		
		
	}
}

function MakeLock(){


    //disable button and change display
	var button = document.getElementsByClassName('jbuttons');
    for (var butlist = 0; butlist < button.length; butlist++) {
    
        button[butlist].setAttribute("disabled", true);
        button[butlist].setAttribute("value", "Working...")

    }

	var gonethrough =0;
	var goalnum =0;
	
	//pull each new post element  : sticky_thread thread thread_new_posts   alternating_color2 thread thread_new_posts
	var stickies = getElementsByClassName('forummulti',document);
	var pagelink = '';
    
    for (var j = 0; j <stickies.length; j++) {
        if (stickies[j].checked) {
            goalnum = goalnum + 1;
        }
    }
    var teamstartpoint = window.location.href.indexOf('team_id=') + 8
    var teamendpoint = window.location.href.indexOf('&', teamstartpoint)
    if (teamstartpoint > teamendpoint) {
        var teamid = window.location.href.substr(teamstartpoint);
    }else{
        var teamid = window.location.href.substring(teamstartpoint, teamendpoint);
    }


	window.goalnum = goalnum;
	//if no new posts just reload page
	if (goalnum ==0) {
		window.location.reload();
	}

	//loop through links and open last page of new posts
	for (var i = 0;i<stickies.length;i++) {
        if (stickies[i].checked) {
            pagelink = '/game/forum_thread_list.pl?forum_id=0&team_id=' + teamid + '&thread_id=' + stickies[i].id + '&lock=1';
            //load link in GETHTTP request
            window.setTimeout(function(arg1){return function(){DoPage(arg1);}}(pagelink),window.timeouttime);
            window.timeouttime +=1500;
        }
		
		
	}

}


function MakeUnSticky(){

    //disable button and change display
	var button = document.getElementsByClassName('jbuttons');
    for (var butlist = 0; butlist < button.length; butlist++) {
    
        button[butlist].setAttribute("disabled", true);
        button[butlist].setAttribute("value", "Working...")

    }

	var gonethrough =0;
	var goalnum =0;
	
	//pull each new post element  : sticky_thread thread thread_new_posts   alternating_color2 thread thread_new_posts
	var stickies = getElementsByClassName('forummulti',document);
	var pagelink = '';
    
    for (var j = 0; j <stickies.length; j++) {
        if (stickies[j].checked) {
            goalnum = goalnum + 1;
        }
    }
    var teamstartpoint = window.location.href.indexOf('team_id=') + 8
    var teamendpoint = window.location.href.indexOf('&', teamstartpoint)
    if (teamstartpoint > teamendpoint) {
        var teamid = window.location.href.substr(teamstartpoint);
    }else{
        var teamid = window.location.href.substring(teamstartpoint, teamendpoint);
    }


	window.goalnum = goalnum;
	//if no new posts just reload page
	if (goalnum ==0) {
		window.location.reload();
	}

	//loop through links and open last page of new posts
	for (var i = 0;i<stickies.length;i++) {
        if (stickies[i].checked) {
            pagelink = '/game/forum_thread_list.pl?forum_id=0&team_id=' + teamid + '&thread_id=' + stickies[i].id + '&sticky=0';
            
            //load link in GETHTTP request
            window.setTimeout(function(arg1){return function(){DoPage(arg1);}}(pagelink),window.timeouttime);
            
            window.timeouttime +=1500;
        }
		
		
	}
}

function MakeUnLock(){


    //disable button and change display
	var button = document.getElementsByClassName('jbuttons');
    for (var butlist = 0; butlist < button.length; butlist++) {
    
        button[butlist].setAttribute("disabled", true);
        button[butlist].setAttribute("value", "Working...")

    }

	var gonethrough =0;
	var goalnum =0;
	
	//pull each new post element  : sticky_thread thread thread_new_posts   alternating_color2 thread thread_new_posts
	var stickies = getElementsByClassName('forummulti',document);
	var pagelink = '';
    
    for (var j = 0; j <stickies.length; j++) {
        if (stickies[j].checked) {
            goalnum = goalnum + 1;
        }
    }
    var teamstartpoint = window.location.href.indexOf('team_id=') + 8
    var teamendpoint = window.location.href.indexOf('&', teamstartpoint)
    if (teamstartpoint > teamendpoint) {
        var teamid = window.location.href.substr(teamstartpoint);
    }else{
        var teamid = window.location.href.substring(teamstartpoint, teamendpoint);
    }


	window.goalnum = goalnum;
	//if no new posts just reload page
	if (goalnum ==0) {
		window.location.reload();
	}

	//loop through links and open last page of new posts
	for (var i = 0;i<stickies.length;i++) {
        if (stickies[i].checked) {
            pagelink = '/game/forum_thread_list.pl?forum_id=0&team_id=' + teamid + '&thread_id=' + stickies[i].id + '&lock=0';
            //load link in GETHTTP request
            window.setTimeout(function(arg1){return function(){DoPage(arg1);}}(pagelink),window.timeouttime);
            window.timeouttime +=1500;
        }
		
		
	}

}




function MakeDelete(){

    if (confirm("Really delete these thread?")) {



    //disable button and change display
    var button = document.getElementsByClassName('jbuttons');
    for (var butlist = 0; butlist < button.length; butlist++) {
    
        button[butlist].setAttribute("disabled", true);
        button[butlist].setAttribute("value", "Working...")

    }

    var gonethrough =0;
    var goalnum =0;

    //pull each new post element  : sticky_thread thread thread_new_posts   alternating_color2 thread thread_new_posts
    var stickies = getElementsByClassName('forummulti',document);
    var pagelink = '';

    for (var j = 0; j <stickies.length; j++) {
        if (stickies[j].checked) {
            goalnum = goalnum + 1;
        }
    }
    var teamstartpoint = window.location.href.indexOf('team_id=') + 8
    var teamendpoint = window.location.href.indexOf('&', teamstartpoint)
    if (teamstartpoint > teamendpoint) {
        var teamid = window.location.href.substr(teamstartpoint);
    }else{
        var teamid = window.location.href.substring(teamstartpoint, teamendpoint);
    }


    window.goalnum = goalnum;
    //if no new posts just reload page
    if (goalnum ==0) {
        window.location.reload();
    }

    //loop through links and open last page of new posts
    for (var i = 0;i<stickies.length;i++) {
        if (stickies[i].checked) {
            pagelink = '/game/forum_thread_list.pl?forum_id=0&team_id=' + teamid + '&thread_id=' + stickies[i].id + '&delete=0';
            //load link in GETHTTP request
            window.setTimeout(function(arg1){return function(){DoPage(arg1);}}(pagelink),window.timeouttime);
            window.timeouttime +=1500;
        }


    }

    }

}


// 
// check to see if have mod rights
if (document.body.innerHTML.indexOf('Delete</a>')>0) {
    // build check boxes
    var trows = document.getElementsByTagName('tr');
    var forumid = 'all';
    var startpoint = 0;
    trows[0].innerHTML = '<td></td>' + trows[0].innerHTML;
    for (var i = 1; i<trows.length; i++) {
        startpoint = trows[i].innerHTML.indexOf('deleteThread(') + 14;
        forumid = trows[i].innerHTML.substring(startpoint, trows[i].innerHTML.indexOf("');", startpoint));
        trows[i].innerHTML = '<td><center><INPUT TYPE=CHECKBOX class="forummulti" ID="' + forumid + '"></center></td>' + trows[i].innerHTML;
    }
    
    // build buttons

    var subpageMakeSticky = document.createElement("input");
    subpageMakeSticky.setAttribute("name", "Sticky");
    subpageMakeSticky.setAttribute("type", "button");
    subpageMakeSticky.setAttribute("id", "stickybutton")
    subpageMakeSticky.setAttribute("value", "Sticky");
    subpageMakeSticky.setAttribute("class", "jbuttons");
    subpageMakeSticky.addEventListener("click", MakeSticky,false);


    var subpageMakeLock = document.createElement("input");
    subpageMakeLock.setAttribute("name", "Lock");
    subpageMakeLock.setAttribute("type", "button");
    subpageMakeLock.setAttribute("id", "lockbutton")
    subpageMakeLock.setAttribute("value", "Lock");
    subpageMakeLock.setAttribute("class", "jbuttons");
    subpageMakeLock.addEventListener("click", MakeLock,false);


    var subpageMakeDelete = document.createElement("input");
    subpageMakeDelete.setAttribute("name", "Delete");
    subpageMakeDelete.setAttribute("type", "button");
    subpageMakeDelete.setAttribute("id", "deletebutton")
    subpageMakeDelete.setAttribute("value", "Delete");
    subpageMakeDelete.setAttribute("class", "jbuttons");
    subpageMakeDelete.addEventListener("click", MakeDelete,false);


    var subpageSelAll = document.createElement("input");
    subpageSelAll.setAttribute("name", "Select All");
    subpageSelAll.setAttribute("type", "button");
    subpageSelAll.setAttribute("id", "selallbutton")
    subpageSelAll.setAttribute("value", "Select All");
    subpageSelAll.setAttribute("class", "jbuttons");
    subpageSelAll.addEventListener("click", SelAll,false);


    var subpageMakeUnSticky = document.createElement("input");
    subpageMakeUnSticky.setAttribute("name", "Un-Sticky");
    subpageMakeUnSticky.setAttribute("type", "button");
    subpageMakeUnSticky.setAttribute("id", "unstickybutton")
    subpageMakeUnSticky.setAttribute("value", "Un-Sticky");
    subpageMakeUnSticky.setAttribute("class", "jbuttons");
    subpageMakeUnSticky.addEventListener("click", MakeUnSticky,false);


    var subpageMakeUnLock = document.createElement("input");
    subpageMakeUnLock.setAttribute("name", "Un-Lock");
    subpageMakeUnLock.setAttribute("type", "button");
    subpageMakeUnLock.setAttribute("id", "unlockbutton")
    subpageMakeUnLock.setAttribute("value", "Un-Lock");
    subpageMakeUnLock.setAttribute("class", "jbuttons");
    subpageMakeUnLock.addEventListener("click", MakeUnLock,false);





    var insertobj = document.getElementsByClassName('medium_head');
    insertobj[0].innerHTML = '<div id="jhold"></div><br><br>' + insertobj[0].innerHTML + '<br><br>';
    var insertobj2 = document.getElementById('jhold');
    insertobj2.appendChild(subpageSelAll);
    insertobj2.appendChild(subpageMakeSticky);
    insertobj2.appendChild(subpageMakeLock);
    insertobj2.appendChild(subpageMakeDelete);
    insertobj2.appendChild(subpageMakeUnSticky);
    insertobj2.appendChild(subpageMakeUnLock);

}

//build global variables and functions whereas setTimeout can be utilized.
window.reload = function(){
	window.location.reload();
}
window.DoPage = function(pagepath){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://goallineblitz.com' + pagepath,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function() {
			 window.gonethrough++;
			 window.timeouttime +=1500;
			 if (window.gonethrough == window.goalnum) {
				 window.location.reload()
			 }
		}
		});

}
window.gonethrough=0;
window.goalnum =0;
window.timeouttime=1500;

