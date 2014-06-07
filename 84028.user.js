// ==UserScript==
// @name          Reddit Trollban
// @description   Allows the user to ban trolls for their own browser.
// @include http://*.reddit.com/*
// @match http://*.reddit.com/*
// ==/UserScript==

//Find any element which is tagged with the class name given.

function getElementsByClass(searchClass,node,tag)
{
   //Code for this function by Dustin Diaz
   //http://www.dustindiaz.com/getelementsbyclass/

   try
   {
      var classElements = new Array();
      if ( node == null )
         node = document;
      if ( tag == null )
         tag = '*';

      var els = node.getElementsByTagName(tag);
      var elsLen = els.length;
      var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');

      for(i = 0, j = 0; i < elsLen; i++)
      {
         if(pattern.test(els[i].className))
         {
            classElements[j] = els[i];
            j++;
         }
      }

      return classElements;
   }
   catch(err)
   {
      alert("Error in getElementsByClass:\n\n" + err);
   }
}

//Fetch the list of trolls from local storage
function getTrolls()
{
   try
   {
      if(localStorage)
         if(localStorage.getItem("trollList"))
            var trollList = localStorage.getItem("trollList").split(',');
         else
            var trollList = new Array();

      //return whatever exists
      return trollList;
   }
   catch(err)
   {
      alert('Error attempting to get troll list from localstorage:\n\n' + err);
   }
}

//Adds a new troll to the list of posts to remove
function bantroll()
{
   var currentNode;
   var parent = this.parentNode;
   var trollName = '';

   //Fetch the username from within the hyperlink.  Some are empty, ignore those.
   if(parent.getElementsByTagName('a').length > 0)
   {
      var i = parent.getElementsByTagName('a').length;

      //There can be multiple links in the div, find the one that has the username and return it.
      while(i--)
      {
         currentNode = parent.getElementsByTagName('a')[i];

         if(currentNode.className.indexOf('author')!=-1)
            trollName = currentNode.innerHTML;
      }
   }

   boolbantroll = confirm("Are you sure you want to ban '" + trollName + "' as a troll?");

   if(boolbantroll)
   {
      try
      {
         //Fetch the list of trolls
         var trollList = getTrolls();

         //If this is the first time a troll has been banned, fill the array.
         if(trollList.length == 0)
         {
            var trollList = new Array();
            trollList[0]=trollName;
         }
         //Otherwise, add them to the existing array
         else
            trollList[trollList.length]=trollName;

         //Store it to local storage
         window.localStorage.setItem('trollList',trollList.join(','));

         //Call trollblocker to mop their posts up
         trollblocker();
      }
      catch(err)
      {
         alert('Error attempting to add troll to localstorage:\n\n' + err);
      }
   }
}

//Unbans a troll already banned
function unbantroll(trollName)
{
   boolUnbantroll = confirm("Are you sure you want to unban the troll '" + trollName + "'?");
   if(boolUnbantroll)
   {
      //Fetch the list of trolls
      var trollList = getTrolls();

      for(troll in trollList)
      {
         if(trollList[troll] == trollName)
         {
            trollList.splice(troll,1);
         }
      }

      //Store it to local storage
      window.localStorage.setItem('trollList',trollList.join(','));

      //Since the posts have already been deleted, the page must be reloaded to see them
      window.location.reload();
   }
}

//Searches out posts by trolls and removes them
function trollblocker()
{
   //Localize globals for performance
   var doc = document;
   var windoc = window.document;
   pageFooter = getElementsByClass("footer rounded");

   //If the page footer has not yet loaded, refresh

   if(pageFooter.length == 0 && !windoc.body.hasAttribute('_loadsuccess'))
   {
      //Once the page has sufficiently loaded, don't run this script again (used like a global var)
      windoc.body.setAttribute('_loadsuccess',true);

      setTimeout(trollblocker,500);
      return;
   }

   var trollPost;			//A troll.
   var userName;			//Holds a poster's name to check against troll list
   var trollsFoundOnPage = new Array();	//Contains the names of trolls on a page for inclusion in the sidebar
   var trollInArray = false;		//If the troll is already in the array, don't add again
   var boolUserIsTroll = false;		//If the user was located on the master list of trolls
   var userNameElement;			//The element that contains a user's name
   var boolBanLinksAdded = false;	//Have the links already been added to the page

   var linkFragment;			//Stores everything for a ban link to add just once

   var i=0;				//Generic iterators
   var j=0;

   try
   {

      //The reddit 'tagline' element contains a user's name, among other things
      namedElements = getElementsByClass("tagline");

      //Treated like a global variable, if ban links have been added don't add them again.
      boolBanLinksAdded = windoc.body.hasAttribute('_banlinksadded');

      //Fetch the master list of trolls from localStorage
      var trollList = getTrolls();

      i=namedElements.length;

      //Run the loop backwards to save an instruction and increase speed
      while (i--)
      {
         var currentObject = namedElements[i];

         boolUserIsTroll = false; //Reset this
         userName = "";

         //All ordinary Reddit pages follow the same format
         if(doc.title != "messages: inbox")
            userNameElement = currentObject;
         //The inbox is different
         else
            userNameElement = currentObject.getElementsByTagName('span')[0].getElementsByTagName('b')[0];

         //Fetch the username from within the hyperlink.
         var j = userNameElement.getElementsByTagName('a').length;

         //There can be multiple links in the div, find the one that has the username and return it.
         while(j--)
         {
            currentNode = userNameElement.getElementsByTagName('a')[j];

            if(currentNode.className.indexOf('author')!=-1)
               userName = currentNode.innerHTML;
         }

         //Check the master troll list
         j=trollList.length;

         while(j--)
         {
            if(userName == trollList[j])
            {
               boolUserIsTroll = true;
               break;
            }
         }

         //Troll was found on the master list, remove their posts
         if(boolUserIsTroll)
         {
            trollInArray = false; //Reset so that this doesn't skip remaining trolls
            boolParentFound = false;

            var trollsFoundOnPageCount = trollsFoundOnPage.length;
            //Check the array to see if this troll has been added
            while(trollsFoundOnPageCount--)
            {
               if(trollsFoundOnPage[trollsFoundOnPageCount] == userName)
               {
                  trollInArray = true;
                  break;
               }
            }

            //If the troll is already in the array, don't add it
            if(!trollInArray)
               trollsFoundOnPage[trollsFoundOnPage.length] = userName;

            //Set the first object to be the parent
            var parent = currentObject;

            //Loop through the object's parentage to find the correct one to remove
            while (parent)
            {
               if (parent.className.indexOf("thing") != -1)
               {
                  trollPost = parent;
                  break;
               }
               else
                  parent = parent.parentNode;
            }

            trollPost.parentNode.removeChild(trollPost);
         }
         else
         {
            //Add a link to the end of the tagline to provide the option to ban
            //Once they've been added there's no need to add them again.
            if (!boolBanLinksAdded)
            {
               if(userName.trim() != '')
               {
                  linkFragment = doc.createDocumentFragment();

                  var banLink = doc.createElement("a");
                  //The mouse cursor won't become a "hand" unless there's something in the href
                  banLink.setAttribute("href","javascript:void();");
                  banLink.appendChild(doc.createTextNode("[ban]"));
                  banLink.addEventListener("click", bantroll, false);

                  linkFragment.appendChild(doc.createTextNode(" "));
                  linkFragment.appendChild(banLink);
                  currentObject.appendChild(linkFragment);
               }
            }

         }
      }

      //Mark the links as having been added (used like a global var)
      windoc.body.setAttribute('_banlinksadded',true);

      //Add a list of trolls removed to the sidebar so that they can be unbanned
      if(trollsFoundOnPage.length > 0)
      {
         var pageSide = getElementsByClass("side");

         //The inbox does not have a sidebar.
         if(pageSide.length > 0)
         {
            var trollBox = doc.createElement("div");
            var trollBoxContent = doc.createElement("div");
            var trollBoxHeader = doc.createElement("H1");

            trollBoxHeader.innerHTML = "TROLLS BANNED";

            trollBox.setAttribute('class','sidecontentbox');
            trollBoxContent.setAttribute('class','content');
            trollBox.appendChild(trollBoxHeader);
            trollBox.appendChild(trollBoxContent);

            var pageTrollCount = trollsFoundOnPage.length;
            while(pageTrollCount--)
            {
               var unbanLink = doc.createElement("a");
               unbanLink.appendChild(doc.createTextNode("[unban]"));

               var trollName = trollsFoundOnPage[pageTrollCount];

               //Create a closure to pass userName by value instead of by reference
               (function (trollName)
               {
                  unbanLink.addEventListener("click", function(){unbantroll(trollName);}, false);
               })(trollName);

               //The mouse cursor won't become a "hand" unless there's something in the href
               unbanLink.setAttribute("href","javascript:void();");

               trollBoxContent.appendChild(doc.createTextNode(trollName + " "));
               trollBoxContent.appendChild(unbanLink);
               trollBoxContent.appendChild(doc.createElement("br"));
            }

            pageSide[0].appendChild(trollBox);

         }
      }

      //Nothing left to process for this page.
      return;
   }

   catch(err)
   {
      alert('There is an error in the trollban script:\n\n' + err);
   }

}

//This script only runs on Reddit
if(document.location.href.indexOf('reddit.com') != -1)
{

   //Set the script to run after the page is loaded so it can find elements
   setTimeout(trollblocker,500);
}

