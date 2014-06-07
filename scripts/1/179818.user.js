// ==UserScript==
// @name       SalesForceJiraMirra
// @namespace  http://jason.henriksen.noncom/
// @version    1
// @description  A tool that replaces all links to Jira in a SalesForce page with additional information about the linked ticket: Status, Priority, FixVersion
// @match      *.salesforce.com*
// @copyright  2013+, Jason Henriksen
// ==/UserScript==
// NOTE: Replaces ever LINK to a Jira ticket that appears in Salesforce with additional information about that ticket
//       You can engineer your Salesforce repors to have a spot for the associated jira ticket.  Then use a concatonated column
//       in sales force to turn the column into a link.
//       You must already be logged in to both salesforce and jira for this replacement to work.


var foo='';
var elements = document.getElementsByTagName('a');

var first=true;
for (var i = 0; i < elements.length; i++) { 
    var txt = elements[i].innerText;
    if(txt.indexOf('LT')==0){
        if(!first){
            foo+=',';
        }
        else{
            first=false;
        }
        foo+=txt;
        elements[i].innerText+=' (...)';
    }
  } 

console.log(foo);

GM_xmlhttpRequest({
  method: "GET",
  url: "https://laruten.atlassian.net/rest/api/latest/search?jql=key+in+("+foo+")&fields=status,priority,fixVersions&maxResults=200",
  onload: function(response) {
      var jiraData =JSON.parse(response.responseText);
      
      // table lookup would be so much faster.  But it's 1AM, my kids are finally in bed and my javascript is pretty bleary eyed at the moment.
      // who knows.  It might take longer to build the map than to do the simple look ups on this small a list.  (tho with string compare I doubt it)
      var elements2 = document.getElementsByTagName('a');
      for (var i = 0; i < elements2.length; i++) { 
        for(var ctr=0;ctr<jiraData.issues.length;ctr++){
            // closed:  green
            // non-closed:
            //    major || critical || blocker : red
            //    all else: yellow
            if(elements2[i].innerText.indexOf(jiraData.issues[ctr].key)==0){
                elements2[i].innerText= jiraData.issues[ctr].key+" "+jiraData.issues[ctr].fields.status.name;
                try{
                  elements2[i].innerText+=" "+jiraData.issues[ctr].fields.fixVersions[0].name;
                }
                catch(err){
                  elements2[i].innerText+=" NO-VERSION";
                }
                
                if(jiraData.issues[ctr].fields.status.name==='Closed'){
                    elements2[i].style.color='darkgreen';
                }
                else{
                    elements2[i].style.color='red';
                    if('Major'===jiraData.issues[ctr].fields.priority.name ||
                       'Blocker'===jiraData.issues[ctr].fields.priority.name ||
                       'Critical'===jiraData.issues[ctr].fields.priority.name){
                      elements2[i].style.fontWeight='bold';
                    }
                }
                
                break;
            }
        }
      }
  }
});