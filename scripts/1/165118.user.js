// ==UserScript==
// @name        Improved Garmin Calendar
// @namespace   http://userscripts.org/users/rsee
// @include     http://connect.garmin.com/calendar*
// @version     1
// ==/UserScript==

setInterval(function() {
  var activities = document.querySelectorAll("div.item-activity-txt");
  if (activities.length > 0) {
    for (var i = 0; i < activities.length; i++) {
      var activity = activities[i];
      for (var j = 0; j < activity.childNodes.length; j++) {
        var childNode = activity.childNodes[j];
        switch (childNode.className) {
                      
          case "item-content":
          if(childNode.innerHTML !== activity.title)
          {
          childNode.innerHTML = (activity.title.replace(/\bnull/, "&nbsp;").trim() + "<br>" + childNode.innerHTML.trim());
          activity.title = childNode.innerHTML;
          }
          break;
           
          case "item-icon icon-other":
            activity.style.color = "gray";
            activity.style.borderStyle = "solid";
            activity.style.borderWidth = 1;
            activity.style.borderColor = "gray";
            break;
          case "item-icon icon-run":
            activity.style.color = "blue";
            activity.style.borderStyle = "solid";
            activity.style.borderWidth = 1;
            activity.style.borderColor = "blue";            
            break;
          case "item-icon icon-swim":
            activity.style.color = "orange";
            activity.style.borderStyle = "solid";
            activity.style.borderWidth = 1;
            activity.style.borderColor = "orange";
            break;
          case "item-icon icon-fitness":
            activity.style.color = "green";
            activity.style.borderStyle = "solid";
            activity.style.borderWidth = 1;
            activity.style.borderColor = "green";
            break;
          case "item-icon icon-cycle":
            activity.style.color = "red";
            activity.style.borderStyle = "solid";
            activity.style.borderWidth = 1;
            activity.style.borderColor = "red";
            break;
          case "item-icon icon-walk":
            activity.style.color = "green";
            break;
        }
      }
    }
  }
}, 100);