// ==UserScript==
// @name           Last.fm ignore shouts
// @namespace      http://
// @author         diggingforfire@gmail.com
// @version        1.0
// @description    Allows the user to ignore shouts from targeted users by keeping an ignorelist
// @include        http://www.last.fm/music/*
// ==/UserScript==

///////////////
// "Members" //
///////////////

// Fetch the stored ignorelist 
var ignoreList = deserialize('ignorelist');
 
// If nothing's stored, initialize a new array. I do this, because without 'strong typing' it like this, 
// it seems that array functions like push don't work, unless I'm crazy and it was way too late when typing this.
// Either way, it works

if (ignoreList == undefined || ignoreList[0] == undefined)
{
    ignoreList = new Array();
}

// The parentnode of the list of shouts
var shoutList = document.getElementById("shoutList");
 
// The amount of people that have been ignored
var amountIgnored = 0;

// The node that contains the title of the shoutbox
var shoutBoxTitle = document.getElementById("shoutbox").childNodes[0].childNodes[0].childNodes[0];

// An array of all the shoutnodes
var shoutNodes = getShoutNodes();

//////////////////
// Program flow //
//////////////////
    
// Iterate the shouts and append "Ignore user" to the actions 
for (var i = 0; i < shoutNodes.length; i++)
{
    var shoutNode = shoutNodes[i];
 
    for (var k = 0; k < shoutNode.childNodes.length; k++)
    {
         var shoutSubNode = shoutNode.childNodes[k];
            
         // Actions means, the bar of actions at the bottom of each shout ('View profile', 'Leave shout', and so on)
         if (shoutSubNode.className == 'actions')
         {
             // Create the anchor that we'll be adding
             var ignoreAnchor = document.createElement('a');
             ignoreAnchor.href = 'javascript:return;';
 
             // Attach a callback to the click event, let the callback handle feting the name and adding it to the list
             // This way, we don't need to use a closure to ensure the correct scope for the username variable
             var callback = function(event) { fetchUserNameAndAddUserToIgnoreList(this);};
             ignoreAnchor.addEventListener('click', callback, false);
             ignoreAnchor.appendChild(document.createTextNode('Ignore user'));
            
             shoutSubNode.appendChild(document.createTextNode(' | '));
             shoutSubNode.appendChild(ignoreAnchor);
         }
    }
}

removeShouts(shoutNodes);

function removeShouts(shoutNodes)
{
    // Iterate the shouts and remove the shouts from people in the ignore list
    for (var i = 0; i < shoutNodes.length; i++)
    {
        var shoutNode = shoutNodes[i];

        for (var k = 0; k < shoutNode.childNodes.length; k++)
        {
            var shoutSubNode = shoutNode.childNodes[k];
            
            // Match nodes for either regular users or subscribers
            if (shoutSubNode.className == 'author user' || shoutSubNode.className == 'author subscriber')
            {
                for (var j = 0; j < shoutSubNode.childNodes.length; j++)
                {
                    var authorSubNode = shoutSubNode.childNodes[j];
                  
                    // The anchor that contains the name of the author
                    if (authorSubNode.nodeName == 'A')
                    {
                        var authorName = authorSubNode.childNodes[2].nodeValue.trim();

                        if (contains(ignoreList, authorName))
                        {
                            if (shoutNode.parentNode != null)
                            {
                                shoutList.removeChild(shoutNode);
                                amountIgnored++;
                            }
                        }
                        
                        break;
                    }
                }
                
                break;
            }
        }
    }
    
    // Show how many shouts have been ignored on this page of the shoutbox
    shoutBoxTitle.nodeValue = 'Shoutbox - ' + amountIgnored + ' shouts ignored';
}
 
///////////////////////////////////
// Program flow helper functions //
///////////////////////////////////

// Get the author name from a shoutnode
// This authorname is the unique key for the ignorelist
function getAuthorNameFromShoutNode(shoutNode)
{
    var retVal = '';
    for (var k = 0; k < shoutNode.childNodes.length; k++)
    {
        var shoutSubNode = shoutNode.childNodes[k];
 
          // Match nodes for either regular users or subscribers
        if (shoutSubNode.className == 'author user' || shoutSubNode.className == 'author subscriber')
        {
            for (var j = 0; j < shoutSubNode.childNodes.length; j++)
            {
                var authorSubNode = shoutSubNode.childNodes[j];
              
                if (authorSubNode.nodeName == 'A')
                {
                    // The username always contains leading whitespaces
                    retVal = authorSubNode.childNodes[2].nodeValue.trim();
                    break;
                }
            }
            
            break;
        }
    }
    
    return retVal;
}

// Fetches a username from a shoutnode and adds it to the ignorelist, then stores the list persistently
function fetchUserNameAndAddUserToIgnoreList(node)
{   
    ignoreList.push(getAuthorNameFromShoutNode(node.parentNode.parentNode));
    serialize("ignorelist", ignoreList);
    
    removeShouts(shoutNodes);
}

/////////////////////////////
// Global helper functions //
/////////////////////////////

function getShoutNodes()
{
    var nodes = new Array();
    for (var i = 0; i < shoutList.childNodes.length; i++)
    {
        var shout = shoutList.childNodes[i];
        nodes.push(shout);
    }
    return nodes;
}
// Fetch data from persistent storage
function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

// Save data to persistent storage
function serialize(name, val) {
  GM_setValue(name, uneval(val));
}

// Determine whether an array contains a certain object
function contains(a, obj){
  for(var i = 0; i < a.length; i++) {
    if(a[i] === obj){
      return true;
    }
  }
  return false;
}