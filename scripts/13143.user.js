// ==UserScript==
// @name           Isn't that work email?
// @namespace      http://protocol7.com/ns/gm/workemail/
// @description    Reminds you to choose the correct From adress based on the receipient emails
// @include        http*://mail.google.tld/mail/*
// @include        http*://mail.google.tld/a/*
// @version        0.2
// ==/UserScript==

var workMail = "foo@example.com";
var recipients = "foo bar";

if (!GM_getValue("work_email")) {
    setWorkEmailTrigger();
} else {
    workMail = GM_getValue("work_email");
}

if (!GM_getValue("email_patterns")) {
    setEmailPatternsTrigger();
} else {
    recipients = GM_getValue("email_patterns");
}

GM_registerMenuCommand('Set work email', setWorkEmailTrigger);
GM_registerMenuCommand('Set email patterns', setEmailPatternsTrigger);

function setWorkEmailTrigger(){
    workMail = prompt('Enter your work email', workMail);
    GM_setValue('work_email', workMail );
}

function setEmailPatternsTrigger(){
    recipients = prompt('Enter your email patterns to search for (seperate multiple with spaces)', recipients);
    GM_setValue('email_patterns', recipients );
}

document.addEventListener('click', function(event) {
  if (event.target.id=='snd') {
    var to = "";

    if(document.getElementById('to_compose')) {
      to = document.getElementById('to_compose').value;
    } else {
      var textAreas = document.getElementsByTagName('textarea');
      
      var found = false;
      
      for (var i = 0; i <textAreas.length; i++) {
        if(textAreas[i].name.indexOf("to") == 0) {
          to = to + textAreas[i].value;
          found = true;
        }     
      }
      
      if(!found) {
        GM_log("Can't find To field, user script broken!")
        return;
      }
    }
      
      var seemsLikeWorkMail = false;
      
      var recipientsArray = recipients.split(" ");
      for (var i = 0; i <recipientsArray.length; i++) {
        if(to.indexOf(recipientsArray[i]) > -1) {
          seemsLikeWorkMail = true;
        }
      }
      
      if(seemsLikeWorkMail) {
        var selects = document.getElementsByTagName('select');
        var from;
        var foundFrom = false;

        for (var i = 0; i <selects.length; i++) {
          if(selects[i].name == "from") {
            from = selects[i].value; 
            foundFrom = true;
          }
        }         
        
        if(foundFrom) {
          if(from != workMail) {
            if(!confirm('That sure looks like work mail, really want to send from ' + from + '?')){
              event.stopPropagation();
              event.preventDefault();
            }
          }
        } else {
          GM_log("Could not find From select, user script broken!")
        }
      }
    }
}, true);
