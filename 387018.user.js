// ==UserScript==
// @name       Neverwinter Profession Shrewd Queuer
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @namespace  http://www.shrewdlogarithm.com
// @version    0.1
// @description Auto-start/gather queued jobs in the Neverwinter Profession Gateway
// @include    http://gateway.playneverwinter.com/*
// @include    https://gateway.playneverwinter.com/*
// @grant      GM_getValue
// @grant      GM_setValue
// @grant      GM_listValues
// @grant      GM_deleteValue
// @copyright  Schmoppyright
// ==/UserScript==

// Delete GMs - uncomment the 2 lines below to reset all selections
//var keys = GM_listValues();
//for (var i=0, key=null; key=keys[i]; i++) GM_deleteValue(key);

var stopgo=0; // are we running?
var nexttask; // background task reference
var donechar=[]; // which characters we've checked for outstanding tasks
var doneprof=[]; // which professions we've checked for outstanding tasks

// Stop/Go Button

$("body").append(
    $("<div/>",{"id": "stopgo", "style": "background-color: red; color: white; font-size: 24px; position: fixed; top: 0px; right: 0px; z-index: 99999","text": "Go"}).bind("click",function() {
        if (stopgo) {
            $(this).css("background-color","red");
            doneprof=[];
        	stopgo=0;
            clearTimeout(nexttask);
    	} else {
            $(this).css("background-color","green");
    		stopgo=1;
            gonext("",1000);
    	}
    })
);

// Add Checkboxes

addcheckboxes(); // this auto-repeats...

// Process the page

function go() {
	//Collect Rewards
    if (selectit($(".professions-rewards-modal").find("button"),"Collect Reward")) return;
    
    //Complete Tasks
    if (selectit($(".task-slot-finished").find("button"),"Complete Task")) return;
    
    //Start a Task
    if (selectit($("#update-content-professions-details-1").find("div.epic:not(.disabled) > button"),"Task Start")) {
        doneprof=[];
        return;
    }

	// Select a Profession and a Task
    var slotsfree = $(".task-slot-open").find("button").length;
    var tasklist = $(".page-professions-tasklist");
    if (tasklist.length > 0 || slotsfree > 0) {
        if (slotsfree > 0) {
            if (selectall("a",10000,true)) return;
        } else {
    	    if (!$($(".fake-options input")[0]).prop("checked"))
	            $($(".fake-options label")[0]).click(); // this was a bastard tricky thing as it's a fake input box
			if (selectall("button")) return;
			//if (selectit($(".paginate_enabled_next"),"next page")) return;
            if (selectall("a",10000,true)) return;
			doneprof=[];
        }
     }

    // Char Homepage - choose Professions Page
    if ($("h2.front-charname").length > 0)
    	if (selectit($("a.nav-professions:not(.disabled)"),"Professions Page")) return;

    // Choose Character
    var chlist = $("h4.char-list-name");
    if (chlist.length > 0) {
        for (var i = 0;i < chlist.length;i++) {
            var chn = $(chlist[i]).text();
			if (donechar.indexOf(chn) == -1 && GM_getValue(";;"+chn+";;")) {
				donechar.push(chn);
				chlist[i].click();
				gonext("Chose character " + chn);
				return;
			}
		}
		donechar=[];
    }

    // Something went wrong or nothing to do - back to the start with a long pause
    $('a[data-url="#/characterselect"]')[0].click();
    gonext("Got Nothing - Choosing diff Char",30000);
    
}

// select and click elements

function isavailable(selector) {
	return selector.length > 0;
}

function selectit(selector,desc,delay) {
	if (isavailable(selector)) {
        if (selector[0].attributes.getNamedItem("onclick") && selector[0].attributes.getNamedItem("onclick").value) {
            var taskstart = selector[0].attributes.onclick.nodeValue;
            taskstart = taskstart.replace("client.professionStartAssignment('","");
            taskstart = taskstart.replace("')","");
            for (var i in GM_listValues()) {
                var key = GM_listValues()[i];
                if (key.indexOf(taskstart) != -1) {
                    if (!isNaN(GM_getValue(key))) GM_setValue(key,GM_getValue(key)-1);
                    if (!isNaN(GM_getValue(key)) && GM_getValue(key) <= 0) GM_setValue(key,"-") // exhausted tasks marked '-'
                }
            }
        }
		selector[0].click();
		gonext(desc,delay);
		return true;
	} else
		return false;
}

function selectall(type,duration,isprof) {
    var charname = $(".name-char").text();
    var pass = 0; // 2 passes, the first does 'making' tasks, the second does 'gathering' tasks if nothing else was found
    while (1==1) { // nasty but we don't have repeat/until...
        for (var i in GM_listValues()) {
            var key = GM_listValues()[i];
            var task = key.split(/;;/); // charname,taskname,dataurl
            if (GM_getValue(key) != "-" && GM_getValue(key) != "0" && task[0] == charname) {
                var sel = $("" + type+"[data-url='" + task[2] + "']");
                if (doneprof.indexOf(task[2]) == -1 && isavailable(sel)) {
                    if (isprof || pass==1 || !task[2].match(/gather/i)) { // no gathering tasks on pass 0 - could be enhanced quite a bit!!
                    	selectit(sel,"Selected " + task[1],duration);
                        doneprof.push(task[2]);
                        return true;
                    } 
                }
            }
        }
        if (!selectit($(".paginate_enabled_next"),"next page",-1)) { // no pages of tasks left
            if (isprof) break;
            pass++;
            if (pass > 1) break;
            while (selectit($(".paginate_enabled_previous"),"prev page",-1)){}; // back to first page of tasks for second pass
        }
    }
    return false;
}

// create checkboxes

function addcheckbox(cb) {
    return function() {
		var name = $(this).find(""+cb.name+"").text();
        var link="";
        if (cb.link && cb.attr) link = $(this).find(""+cb.link+"")[0].attributes.getNamedItem(cb.attr).value;
        var data = cb.char + ";;" + name + ";;" + link;
        $(this).prepend(
            $("<input/>",{"type":cb.type,"id": data,"style":"position:relative;float:left;display:inline;z-index:999;width:20px;"}).prop(cb.prop,GM_getValue(data))
            .bind("change",function() {
                if ($(this).attr(cb.prop) && $(this).attr(cb.prop) != 0)
                	GM_setValue($(this).attr("id"),$(this).attr(cb.prop));
                else
                    GM_deleteValue($(this).attr("id"));
				dumpvals();
                return true;
            })
        )
    }
}

function addcheckboxes() {
	var charname = $(".name-char").text();
	var cbtargets = [
		{"sel":"li:has(.char-list-name)","name": ".char-list-name", "type":"checkbox","prop":"checked","char":""},
        {"sel":"li:has(.professions-tab-name:not(.no-bar))","name": ".professions-tab-name", "link": "a[data-url]","attr":"data-url","type":"checkbox","prop":"checked","char":charname},
		{"sel":".task-list-entry","name":"h4 span","link": "button[data-url]","attr":"data-url","type":"text","prop":"value","char":charname}
	];
    for (var i = 0;i < cbtargets.length;i++) {
        var objs = $(""+cbtargets[i].sel+"").filter(":not(:has(input))");
        if (objs.length > 0) {
            objs.each(addcheckbox(cbtargets[i]));
    	}
    }
    setTimeout(addcheckboxes,2000);
}

// go around for the next job

function gonext(done,dur) {
    if (done) console.log(done);
    if (stopgo && (!dur || dur > -1)) nexttask = setTimeout(go,dur||3000);
}

//testing - coming soon, listing all your outstanding jobs!!

function dumpvals() {
    var lvs = [];
    for (var lv in GM_listValues()) lvs.push(GM_listValues()[lv]);
    lvs.sort();
    for (var lv in lvs) console.log(lvs[lv] + "-" + GM_getValue(lvs[lv]));
}
