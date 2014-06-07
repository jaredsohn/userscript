// ==UserScript==
// @name        Improved Garmin Calendar
// @namespace   http://userscripts.org/users/ikapoc
// @include     http://connect.garmin.com/calendar*
// @version     1
// ==/UserScript==

setInterval(function()
{
   var activities = document.querySelectorAll("div.item-activity-txt");
   if(activities.length > 0)
   {
      for(var i=0;i<activities.length;i++)
      {
         var activity = activities[i];
         for(var j=0;j<activity.childNodes.length;j++)
         {
            var childNode = activity.childNodes[j];
            switch(childNode.className)
            {
               case "item-content":
                  if(childNode.innerHTML !== activity.title)
                  {
                     childNode.innerHTML = (activity.title.replace(/\bnull/, "Untitled").trim() + "\n" + childNode.innerHTML.trim());
					 activity.title = childNode.innerHTML;
                  }
                  break;
               case "item-icon icon-run":
                  activity.style.color = "blue";
                  break;
               case "item-icon icon-swim":
                  activity.style.color = "orange";
                  break;
               case "item-icon icon-cycle":
                  activity.style.color = "red";
                  break;
               case "item-icon icon-walk":
                  activity.style.color = "green";
                  break;
            }
         }
      }
   }
}, 100);