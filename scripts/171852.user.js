// ==UserScript==
// @author      mase
// @name        JIRA Edit Subtasks
// @namespace   com.skidata.jira
// @version     0.0.1
// @include     https://sdjirasrv.skidata.net/jira/browse/*
// ==/UserScript==

var createLink = document.getElementById('create-subtask');
if(createLink) {
    var editEntry = document.createElement('li');
    editEntry.className = 'aui-list-item';
    createLink.parentNode.parentNode.appendChild(editEntry);
    
    var editLink = document.createElement('a');
    editLink.appendChild(document.createTextNode("Edit Sub-Tasks"));
    editLink.className = 'aui-list-item-link opsbar-operations';
    editLink.title = 'Edit sub-tasks of this issue';
    editLink.addEventListener("click", editClick, false);
    editEntry.appendChild(editLink);
}

function editClick() {
    var issueKey = document.getElementById('key-val').innerHTML;
    
    var subTaskQuery = 'bulkedit_'+ document.getElementById('key-val').getAttribute('rel') +'=on&';
    var rows = document.getElementsByClassName('issuerow');
    for(var i=0; i<rows.length; i++) { 
        subTaskQuery = subTaskQuery +'bulkedit_'+ rows[i].getAttribute('rel') +'=on&';
    }

    GM_xmlhttpRequest({
      method: "GET",
      url: '/jira/secure/IssueNavigator!executeAdvanced.jspa?runQuery=true&clear=true&jqlQuery=parent%3D'+ issueKey +'+OR+key%3D'+ issueKey,
      onload: function(response) {
		GM_xmlhttpRequest({
          method: "POST",
          url: '/jira/secure/views/bulkedit/BulkEdit1.jspa?'+ subTaskQuery,
          onload: function(response) {
			GM_xmlhttpRequest({
			  method: "POST",
			  url: '/jira/secure/views/bulkedit/BulkChooseOperation.jspa?operation=bulk.edit.operation.name',
			  onload: function(response) {
				window.location = '/jira/secure/views/bulkedit/BulkEditDetails.jspa';
			  }
			});
          }
        });
      }
    });
}

