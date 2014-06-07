// ==UserScript==
// @name        Jira Create Issue Template
// @namespace   jira.home24.de
// @description Insert default text into a new ticket, or another text if it is a Live issue.
// @include     http://jira.home24.de/*
// @version     1.1
// @grant       none
// ==/UserScript==

jQuery(document).ready(function($) {
 
modeDiv = document.createElement('div');
modeDiv.setAttribute('style','position:fixed;right:0px;top:0px;');
//document.body.appendChild(modeDiv);
var btn = document.createElement('input');
btn.setAttribute('type',"button");
btn.setAttribute('value',"Live error?");
btn.setAttribute('style','position:relative;right:0px;top:0px;z-Index:1000;');
btn.addEventListener("click", insert_live, true);

function insert_default() {
    var steps = document.getElementById('customfield_10001');
    var description = document.getElementById('description');
    var environment = document.getElementById('environment');
    var discovered = document.getElementById('customfield_10205-1');
    var deployed = document.getElementById('customfield_10000-2');
    
    if(steps != null  && steps.value =='' ){ 
        steps.value = '*Current behavior* \n\n\n*Expected behavior* \n';
    }
    if(environment != null  && environment.value =='' ){ 
        environment.value = 'Testing ';
    }
    if(discovered != null  && discovered.checked == false){ 
        discovered.checked = true;
    }
    if(deployed != null  && deployed.checked == false ){ 
        deployed.checked = true;
    }
    //alert("This is happening!");
    var error_window = document.getElementById("create-issue-dialog");
    error_window.appendChild(btn);
}

function insert_live() {
    var components = document.getElementById('components-textarea');
    var fixVersions = document.getElementById('fixVersions-textarea');
    var asssignee = document.getElementById('assignee-field');
    var steps = document.getElementById('customfield_10001');
    var description = document.getElementById('description');
    var environment = document.getElementById('environment');
    var discovered = document.getElementById('customfield_10205-1');
    var discoveredLive = document.getElementById('customfield_10205-2');
    var deployed = document.getElementById('customfield_10000-2');
    var deployedLive = document.getElementById('customfield_10000-4');
    
    if(components != null){
        components.value = 'Backend';
    }
    if(fixVersions != null){ 
        fixVersions.value = 'Backlog';
    }
    if(asssignee != null){ 
        asssignee.value = 'Lars Schumachenko';
    }
    if(steps != null){ 
        steps.value = '*Current behavior* \nThe issue was observed in the logs on Live.\n\n*Expected behavior* \nNo errors.';
    }
    if(description != null){ 
        description.value = '{code}\n\n{code}\n';
    }
    if(environment != null){ 
        environment.value = 'Live';
    }
    if(discoveredLive != null){ 
        discoveredLive.checked = true;
    }
    if(deployed != null ){ 
        deployed.checked = false;
    }
    if(deployedLive != null){ 
        deployedLive.checked = true;
    }
    //alert("This is happening!");
}

 
JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED, function(e, context) {
 
    insert_default();
 
});
 
});
