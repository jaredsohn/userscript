// ==UserScript==
// @name           RTM Projects v3
// @author         Magnus Torfason (Based on code by Landon Springer)
// @namespace      rtm-projects-v3
// @include        http://*.rememberthemilk.tld/*
// @include        https://*.rememberthemilk.tld/*
// ==/UserScript==
//////////////////////////////////////////////////////


var project_delin    = '.'; // e.g. '.project1.subproject1.subsubproject1'.
var project_titletag = '-'; // Tag tasks with this tag to make them into title tasks

var project_color_level_1 = '#d4dff0';
var project_color_level_2 = '#e4eff0';
var project_color_level_3 = '#f4fff0';
var project_color_level_4 = '#f4fff0';

var firebug_logging = false; // set to "true" if you have the firebug addon


//////////////////////////////////////////////////////

var tasks = '';
var tasks_div = '';
var ut;
var lastCalled = new Date().getTime();
window.sortTasksIntoProjects = function() 
{
    // store all task rows into an array
    var task_array = [];
    var task_hash = [];

    delin = project_delin.replace('.','\\.');
    pRegEx  = new RegExp(delin+'(.*?),','i');
    ptRegEx = new RegExp(project_titletag+',','i');

    if(tasks.entries == null || tasks.entries.length == 0) 
    {
        setTimeout(window.sortTasksIntoProjects,100);
        return;
    }

    tasks.window.taskList.doDues();

    // This removes the keyboard arrow, but causes a whole lot of trouble
    //ut.removeClass(tasks.table.tBodies[0].rows[0],'xtr_keyboard');

    priorTitleTasks = false;
    for(var i=0; i<tasks.entries.length;i++) 
    {
        task_name = tasks.entries[i][2];
        task_tags = (tasks.entries[i][4] != null) ? tasks.entries[i][4].join(', ') : null;

        isProjectTask = false;

        if(task_tags != null) 
        {
            task_tags += ','; // so that every tag has a ',' after it
            // check to see if it has a project-related tag...
            search = pRegEx.exec(task_tags);
            if(search != null) 
            {
                p = search[1];
                s = p.split(project_delin);
                if(task_hash[p] == null) 
                { 
                    task_hash[p] = []; 
                }

                // Check if current task is the project title task:
                //    A project title task must either be named to match the project tag,
                //    or it will contain the special project title tag (defaulting to "-")
                n = task_name.replace(/ /g,'_').toLowerCase();              
                titlesearch = ptRegEx.exec(task_tags);
                if( (n == s[s.length-1]) || (titlesearch != null) ) 
                {
                    if ( titlesearch!=null ) 
                    {
                        task_tags = task_tags.replace(titlesearch[0],'');
                    }

                    if ( !priorTitleTasks )
                    {
                        // This would remove the task keyboard arrow for project views,
                        // which has both benefits and drawbacks.
                        //ut.removeClass(tasks.table.tBodies[0].rows[0],'xtr_keyboard');
                        priorTitleTasks = true;
                    }

                    newIndex = '_TITLE_';
                    tasks.table.tBodies[0].rows[i].childNodes[3].firstChild.innerHTML = ""
                            + "<a href=\"javascript:void(0)\" style=\"font-size:10px; \" onclick=\"document.getElementById('listFilter').value = 'tagContains: "+project_delin+p+" OR tag:"+project_titletag+"'; control.updateListFilter(); return false; \">[+]</a>  &nbsp;"
                            + task_name
                            //  + " &nbsp; &nbsp; <a href=\"javascript:void(0)\" style=\"font-size:10px; \" onclick=\"document.getElementById('listFilter').value = 'tagContains: "+project_delin+p+"'; control.updateListFilter(); return false; \">(only this)</a>"
                            ;
                } 
                else 
                {
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
        if(!isProjectTask) 
        {
            // append to the main stack
            task_array.push(new Array(tasks.table.tBodies[0].rows[i], tasks.entries[i]));
        }

    }
    // now go through the task_hash, and arrange the projects...
    // sort task_hash by keys

    if(firebug_logging) 
    {
        console.group("RTM Projects");
        console.dir(task_hash);
        console.groupEnd();
    }

    keys = [];
    for(i in task_hash) keys.push(i);
    keys.sort();
    keys.reverse();

    for(var i in keys) 
    {
        obj = task_array;
        s = keys[i].split('.');
        for(var j=0; j<s.length; j++) 
        {
            a = s.slice(0,j+1).join('.');
            //alert('a -> '+a);
            if(task_hash[a] == null) task_hash[a] = [];
            if(task_hash[a]['_TITLE_'] != null) 
            {
                if(obj[s[j]] == null) obj[s[j]] = [];
                //alert('s[j] -> '+s[j]);
                obj = obj[s[j]];
            } // The break that used to be here caused a bug in displaying subtasks
        }
        for(j in task_hash[keys[i]]) 
        {
            if(Number(j) == j) 
            {
                obj.push(task_hash[keys[i]][j]);
            } 
            else 
            {
                if(obj[j] == null) 
                {
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


    for(i=0;i<toWrite.length;i++) 
    {
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

function orderNodes(n,l) 
{
    if(typeof n.length === 'number') 
    {
        var keys_numeric = new Array();
        var keys_string = new Array();
        n = sortArray(n);
        for(var i in n) 
        {
            if(Number(i)==i) 
            {
                keys_numeric.push(i);
            } 
            else 
            {
                if(i.substring(0,1)!='_') keys_string.push(i);
            }
        }
        if(n['_TITLE_'] != null) 
        {
            // formatting for a project title...
            ut.addClass(n['_TITLE_'][0],'xtr_project_title');
            ut.addClass(n['_TITLE_'][0],'xtr_project_title_level_'+l); // Allows different formatting by level
            n['_TITLE_'][0].childNodes[3].style.paddingLeft = (20*l)+'px';
            entry = [];
            entry.item = n['_TITLE_'];
            toWrite.push(entry);
        }
        for(var i in keys_string) 
        {
            orderNodes(n[keys_string[i]],l+1);
        }
        var num = [];
        for(var i=0; i<keys_numeric.length;i++) 
        {
            n[keys_numeric[i]][0].childNodes[3].style.paddingLeft = (20*(l+1))+'px';
            entry = [];
            for(var j=0; j<tasks.sortFields.length; j++) 
            {
                entry.push(eval('tasks.hashMap[n[i][1][0]].'+tasks.sortFields[j]));
            }
            entry.item = n[keys_numeric[i]];
            num.push(entry);
        }
        num.sort(tasks.doSort);
        toWrite = toWrite.concat(num);
    }
}

function sortArray(arr) 
{
    var ret = [];
    ret = ret.concat(arr);

    var keys = [];
    for(var i in arr) 
    {
        if(Number(i) != i) keys.push(i);
    }
    keys.sort();
    for(var i in keys) ret[keys[i]] = arr[keys[i]];

    return ret;
}

window.startSort = function() 
{
    if(this.taskList == null) 
    {
        setTimeout("startSort()",2000)
        return false;
    }
    tasks = this.taskList.list;
    tasks.window = this;
    ut = this.Utility;

    // overriding tasks functions...
    tasks.tmpSort = tasks.sort;
    tasks.sortTasksIntoProjects = sortTasksIntoProjects;
    tasks.sort = function() 
    {
        tasks.tmpSort()
        tasks.sortTasksIntoProjects.call(this.window);
    }
    tasks.tmpFireSelectionFinished = tasks.fireSelectionFinished;
    tasks.fireSelectionFinished = function() 
    {
        tasks.tmpFireSelectionFinished();
        tasks.sortTasksIntoProjects.call(this.window);
    }
    sortTasksIntoProjects();
}

st = document.createElement('style');
st.type = 'text/css';
st.innerHTML = '.xtr_project_title_level_1 { background-color:'+project_color_level_1+'; } '
             + '.xtr_project_title_level_2 { background-color:'+project_color_level_2+'; } '
             + '.xtr_project_title_level_3 { background-color:'+project_color_level_3+'; } '
             + '.xtr_project_title_level_4 { background-color:'+project_color_level_4+'; } '
             + '.xtr_project_title .xtd_text .xtd_task_name {  font-weight:bold; color:#0060BF; padding:3px; }'; //font-size:14px;
document.body.appendChild(st);

window.addEventListener('load', window.startSort, false);


