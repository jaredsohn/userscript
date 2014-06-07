// ==UserScript==
// @name           RTM Projects
// @author         Landon Springer
// @namespace      rtm
// @include        http://www.rememberthemilk.com/*
// @include        https://www.rememberthemilk.com/*
// @include        http://*.www.rememberthemilk.com/*
// @include        https://*.www.rememberthemilk.com/*
// ==/UserScript==
//////////////////////////////////////////////////////


var project_delin = '.'; // e.g. '.project1.subproject1.subsubproject1'.
var project_color = '#d4dff0';

var firebug_logging = false; // set to "true" if you have the firebug addon


//////////////////////////////////////////////////////

var tasks = '';
var tasks_div = '';
var ut;
var lastCalled = new Date().getTime();
window.sortTasksIntoProjects = function() {

    // store all task rows into an array
    var task_array = [];
    var task_hash = [];

    delin = project_delin.replace('.','\\.');
    pRegEx = new RegExp(delin+'(.*?),','i');

    if(tasks.entries == null || tasks.entries.length == 0) {
      setTimeout(window.sortTasksIntoProjects,100);
      return;
    }

    tasks.window.taskList.doDues();

    ut.removeClass(tasks.table.tBodies[0].rows[0],'xtr_keyboard');


    for(var i=0; i<tasks.entries.length;i++) {
    	    task_name = tasks.entries[i][2];
	    task_tags = (tasks.entries[i][4] != null) ? tasks.entries[i][4].join(', ') : null;

	    isProjectTask = false;

	    if(task_tags != null) {
	        task_tags += ','; // so that every tag has a ',' after it
	        // check to see if it has a project-related tag...
	        search = pRegEx.exec(task_tags);
	        if(search != null) {
	            p = search[1];
	            s = p.split(project_delin);
		    if(task_hash[p] == null) task_hash[p] = [];

	            // check if current task is the project task
	            n = task_name.replace(/ /g,'_').toLowerCase();
	            if(n == s[s.length-1]) {
	                newIndex = '_TITLE_';
			tasks.table.tBodies[0].rows[i].childNodes[3].firstChild.innerHTML = task_name+" &nbsp; &nbsp; <a href=\"javascript:void(0)\" style=\"font-size:10px; \" onclick=\"document.getElementById('listFilter').value = 'tagContains: "+project_delin+p+"'; control.updateListFilter(); return false; \">(show)</a>";
	            } else {
	                newIndex = task_hash[p].length;
	            }

		    // remove the project-related tag from the tag list
		    task_tags = task_tags.replace(search[0],'');
		    tasks.table.tBodies[0].rows[i].childNodes[3].lastChild.innerHTML = task_tags.substring(0,task_tags.length-1);

		    // add to hash
		    task_hash[p][newIndex] = [tasks.table.tBodies[0].rows[i], tasks.entries[i]];

		    // it's a project-related task, so don't append it to the task array
		    isProjectTask = true;
	        }
	    }
	    if(!isProjectTask) {
		// append to the main stack
	        task_array.push(new Array(tasks.table.tBodies[0].rows[i], tasks.entries[i]));
	    }

    }
    // now go through the task_hash, and arrange the projects...
    // sort task_hash by keys

    if(firebug_logging) {
	console.group("RTM Projects");
	console.dir(task_hash);
	console.groupEnd();
    }

    keys = [];
    for(i in task_hash) keys.push(i);
    keys.sort();
    keys.reverse();

    for(var i in keys) {
	obj = task_array;
	s = keys[i].split('.');
	for(var j=0; j<s.length; j++) {
		a = s.slice(0,j+1).join('.');
		//alert('a -> '+a);
		if(task_hash[a] == null) task_hash[a] = [];
		if(task_hash[a]['_TITLE_'] != null) {
			if(obj[s[j]] == null) obj[s[j]] = [];
			//alert('s[j] -> '+s[j]);
			obj = obj[s[j]];
		} else break;
	}
	for(j in task_hash[keys[i]]) {
		if(Number(j) == j) {
			obj.push(task_hash[keys[i]][j]);
		} else {
			if(obj[j] == null) {
				obj[j] = task_hash[keys[i]][j];
			}
		}
	}
    }

    toWrite = new Array();
    orderNodes(task_array,0);

    // create a temporary node to insert before...
    tmp = document.createElement('tr');
    tbody = tasks.table.tBodies[0];
    tbody.appendChild(tmp);


    for(i=0;i<toWrite.length;i++) {
	id = toWrite[i].item[1][0];
    	tasks.map[id] = i;
    	tasks.entries[i] = toWrite[i].item[1];
	tasks.reverseMap[i] = id;
        tbody.insertBefore(toWrite[i].item[0],tmp);
    }
    //remove the temporary node
    tbody.removeChild(tmp);

    tasks.div.style.visibility = 'visible';
}

var counter = 0;
var toWrite = new Array();

function orderNodes(n,l) {
    if(typeof n.length === 'number') {
	var keys_numeric = new Array();
	var keys_string = new Array();
	n = sortArray(n);
	for(var i in n) {
		if(Number(i)==i) {
			keys_numeric.push(i);
		} else {
			if(i.substring(0,1)!='_') keys_string.push(i);
		}
	}
        if(n['_TITLE_'] != null) {
            // formatting for a project title...
	    ut.addClass(n['_TITLE_'][0],'xtr_project_title');
            n['_TITLE_'][0].childNodes[3].style.paddingLeft = (20*l)+'px';
	    entry = [];
	    entry.item = n['_TITLE_'];
            toWrite.push(entry);
        }
        for(var i in keys_string) {
		orderNodes(n[keys_string[i]],l+1);
        }
	var num = [];
        for(var i=0; i<keys_numeric.length;i++) {
        	n[keys_numeric[i]][0].childNodes[3].style.paddingLeft = (20*(l+1))+'px';
		entry = [];
		for(var j=0; j<tasks.sortFields.length; j++) {
			entry.push(eval('tasks.hashMap[n[i][1][0]].'+tasks.sortFields[j]));
		}
		entry.item = n[keys_numeric[i]];
        	num.push(entry);
        }
	num.sort(tasks.doSort);
	toWrite = toWrite.concat(num);
    }
}

function sortArray(arr) {
	var ret = [];
	ret = ret.concat(arr);

	var keys = [];
	for(var i in arr) {
		if(Number(i) != i) keys.push(i);
	}
	keys.sort();
	for(var i in keys) ret[keys[i]] = arr[keys[i]];

	return ret;
}

window.startSort = function() {
	if(this.taskList == null) {
		setTimeout("startSort()",2000)
		return false;
	}
	tasks = this.taskList.list;
	tasks.window = this;
	ut = this.Utility;
	// overriding tasks functions...
	tasks.tmpSort = tasks.sort;
	tasks.sortTasksIntoProjects = sortTasksIntoProjects;
	tasks.sort = function() {
		this.tmpSort.call(this.window);
		this.sortTasksIntoProjects.call(this.window);
	}
	tasks.tmpFireSelectionFinished = tasks.fireSelectionFinished;
	tasks.fireSelectionFinished = function() {
		this.tmpFireSelectionFinished();
		this.sortTasksIntoProjects.call(this.window);
	}
	sortTasksIntoProjects();
}

st = document.createElement('style');
st.type = 'text/css';
st.innerHTML = '.xtr_project_title { background-color:'+project_color+'; } .xtr_project_title .xtd_text .xtd_task_name { font-size:14px; font-weight:bold; color:#0060BF; padding:3px; ';
document.body.appendChild(st);

window.addEventListener('load', window.startSort, false);


