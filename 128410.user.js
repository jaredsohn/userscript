// ==UserScript==
// @name Latest 17/11/2011
// @namespace http://userscripts.org/scripts/show/57201
// @description testingfdfd
// @include http://singletrackworld.com/forum/*
// @include http://*.singletrackworld.com/forum/*
// @include https://singletrackworld.com/forum/*
// @include https://*.singletrackworld.com/forum/*
// @match http://singletrackworld.com/forum/*
// @match http://*.singletrackworld.com/forum/*
// @match https://singletrackworld.com/forum/*
// @match https://*.singletrackworld.com/forum/*
// @version17 November 2011
// ==/UserScript==;



// use jQuery from STW.com
// Thanks to Shog9 for this idea for making the script work in both
// Chrome and Firefox:
// http://meta.stackoverflow.com/questions/46562
function with_jquery(f)
{

       var script = document.createElement("script");
       script.type = "text/javascript";
       script.textContent = "(" + f.toString() + ")(jQuery)";
       document.body.appendChild(script);
};

with_jquery(function ($)
{
       ///////////// MEAT OF THE WORK STARTS HERE ////////////////////////////////////////////

       function initialise()
       {
                     if (window.top != window.self) //-- Don't run on frames or iframes
                                  return;

            var stwForum = new Forum();
                     
                     var stwData = new Storage();
                     var stwBlackList = new Blacklist();
                     stwForum.BuildForumMenu(stwData, stwBlackList);
                     
                     if(stwForum.inTopicList)
                     {
                                  // loop through forum topics
                                  stwForum.ApplyAll(stwData, stwBlackList);
                     $(window).focus(function(stwData,stwBlackList){
                        var stwForum = new Forum();
                           var stwData = new Storage();
                                 var stwBlackList = new Blacklist();
                        stwForum.ApplyAll(stwData, stwBlackList);
                    });
                     }
                     else if(stwForum.inThread)
                     {
                                  var stwThread = new Thread(stwForum);
                                  // Display thread menu
                                  stwThread.ShowThreadMenu(stwBlackList);
                                  // apply black list settings
                                  stwBlackList.Apply(stwThread);
                     }
       }

       function Topic()
       {
       }

       Topic.stwURL = "http://singletrackworld.com/forum/topic/";

       Topic.RedactTopic = function(topicTitleElement, blacklist, authorName)
       {
              // store the original topic link
                     $(topicTitleElement).attr("originaltopic", $(topicTitleElement).html());
                     
                      // replace!
                     $(topicTitleElement).html("<small>" + blacklist.stwRedactText.replace("StuartBaggs", authorName) + "</small>");
                     // fade a bit
                     $(topicTitleElement).parent().fadeTo('slow', 0.5, function() {
                           // done
                     });
                     
                     // allow the user to click the post to view the original title
                     $(topicTitleElement).click(function ()
                     {
                                  Topic.ShowTopic(this);
                     });
       }

       Topic.ShowTopic = function(topicTitleElement)
       {
                     if($(topicTitleElement).attr("originaltopic") != null)
                     {
                           $(topicTitleElement).fadeOut("fast", function () // fades out the redactText
                           {
                                  $(topicTitleElement).html($(topicTitleElement).attr("originaltopic")); // show the original post
                    $(topicTitleElement).fadeIn('fast', function() {
                                   // done
                             }); // fade it back in
                                   $(topicTitleElement).parent().fadeTo('fast', 1, function() {
                                   // done
                             }); // fade it back in
                                  $(topicTitleElement).unbind(); // remove this click event
                           });
                     }
              }

       Topic.UpdateUnread = function(topicUrl, topicTitleElement, topicCount, forum)
       {
              // if the link hasn't been read then leave it alone
              // if the link has been read, and there are no unread posts, then show and leave as black
              // if there are unread posts, then show unread number in read
              // 
              var unreadText = currentPostCount;
              var currentPostCount = parseInt($(topicCount).text());
              var strippedTopicUrl = topicUrl.replace(Topic.stwURL, "");

              $(forum.metaData).each(function(index, element)
              {
                     if(element.address == strippedTopicUrl)
                     {
                var unreadCount = currentPostCount - element.lastReadCount;
                                         
                           unreadText = currentPostCount + " / " + unreadCount;
                                         
                           var link = "<a href='" + topicUrl + element.lastReplyLink + "'>" + unreadText + "</a>";
                if(unreadCount > 0)
                           {
                                  link = "<span class='comments' style='margin-left:-10px'>" + link + "</span>";
                           }
                           
                           if(forum.stwShowReadCount)
                           {
                                  $(topicCount).html(link);
                                  $(topicCount).width(71); // expand to fit additional info without wrapping
                           }
                           else
                           {
                                  $(topicCount).html(currentPostCount);
                                  $(topicCount).width(0);
                           }

                           return;
                     }
              });
       }

       /////////////// FORUM CLASS ////////////////////////////////////////////////////////
       
       function Forum()
       {
                     var inThread = this.inThread;
                     var inTopicList = this.inTopicList;
                     this.forumList;
                     this.metaData = $.secureEvalJSON(Storage.GetData("STWTopicMeta"));
                     this.stwShowReadCount;
                     if(this.stwShowReadCount == null)
                     {
                                  this.stwShowReadCount = true;
                     }
       }
       Forum.stwRSSUrl = "http://singletrackworld.com/forum/rss/topic/";
       /************ forum getter / setters ***************/
       // method taken from http://ejohn.org/blog/javascript-getters-and-setters/
       Forum.prototype = 
       {
                     get inThread()
                     {
                           if ($("#thread").length > 0)
                           {
                                  return true;
                           }
                           else
                           {
                                  return false;
                           }
                     },
                     get inTopicList()
                     {
                           // see if we're looking at a list of topics
                           var _inTopicList = false;
                           var self = this;
                           $("table").each(function ()
                           {
                           switch ($(this).attr("id").toLowerCase())
                           {
                                         case "latest":
                                         case "history":
                                         case "favorites": // grrr american spelling!
                                                              // set the ForumList property to the table
                                                              self.forumList = this;
                                                              _inTopicList = true;
                                                              break;
                           }
                           });
                                  
                           return _inTopicList;
                     },
                     get stwShowReadCount()
                     {
                           return $.parseJSON(Storage.GetData("STWShowReadCount")); // parse to boolean
                           
                     },
                     set stwShowReadCount(val)
                     {
                           Storage.SetData("STWShowReadCount", val.toString());
                     }
       };
       /************ end of forum getter / setters ***************/
       
       /************ Forum functions ***************/
       Forum.prototype.BuildForumMenu = function(stwData, stwBlackList)
       {
              self = this;
              var showThreadCountText = "Show";
              if(self.stwShowReadCount)
              {
                     showThreadCountText = "Hide";
              }

              var KillFileStatus = "on";
                     
              if(stwBlackList.stwUserKillFile == true)
              {
                     KillFileStatus = "off";
              }

        if($("#bunkMenu").length == 0)
              {
            //$("#latest").before("<div id='#bunkMenu'><textarea id='bunkDebug'></textarea></div>");
        }
                     
//            if($("#bunkMenu").length == 0)
//            {
//            $("#bp-admin-logout").closest("LI").after("<li><a href='#'>Bunk Menu</a><ul id='bunkMenu'></ul></li>");
//                   //$("#account-dropdown").append("<li class='bunkMenu'><a id='bunkThreadCountToggle' href='#'></a></li>");

//            $("#bunkMenu").append("<li><a id='bunkThreadCountToggle' href='#'></a></li>");
//            
//                   $("#bunkThreadCountToggle").click(function()
//                   {
//                         self.stwShowReadCount = self.stwShowReadCount == false; // toggle
//                         self.ApplyAll(stwData, stwBlackList);
//                         // update the menu text
//                         self.BuildForumMenu(stwData, stwBlackList);
//                   });

//            $("#bunkMenu").append("<li><a id='bunkBlacklistToggle' href='#'></a></li>");
//                   
//                   $("#bunkBlacklistToggle").click(function()
//                   {
//                         stwBlackList.stwUserKillFile = stwBlackList.stwUserKillFile == false; // toggle
//                                
//                          self.ApplyAll(stwData, stwBlackList);
//                         // update the menu text
//                         self.BuildForumMenu(stwData, stwBlackList);
//                   });
//            }

              $("#bunkThreadCountToggle").text(showThreadCountText + " unread count");
              $("#bunkBlacklistToggle").text("Turn KillFile " + KillFileStatus);
       }

       Forum.prototype.SaveMetaData = function()
       {
                     Storage.SetData("STWTopicMeta", $.toJSON(this.metaData));
       }

       Forum.prototype.ApplyAll = function(stwData, stwBlackList)
       {
              var self = this;
              var topicRow;
              // loop through the forum table rows
        
              $(this.forumList).find("TR").each(function ()
              {
                     // get the href for the row
                     var topicUrl = $(this).find("A:first").attr("href");
                     // get the topic element
                     var topicTitleElement = $(this).find("td:eq(0)");
                     var topicCount = $(this).find("td:eq(1)");
                     var author = $(this).find("td:eq(2)").text();

                     if(author != "")
                     {
                try
                {
                    if(stwBlackList.IsAuthorInBlacklist(author) == true)
                               {
                        if(stwBlackList.stwUseKillFile)
                                      {
                                             if (stwBlackList.stwRedactBlockedUsers == true)
                                             {
                                                           Topic.RedactTopic(topicTitleElement, stwBlackList, author);
                                             }
                                             else
                                             {
                                                           // just murderise the post
                                                           Topic.HideTopic(this);
                                             }
                                      }
                                      else
                                      {
                                             Topic.ShowTopic(this);
                                      }
                               }
                }
                catch(e)
                {
                    alert(e.message + ". author = " + author );
                }
                     }
                     if(topicUrl != undefined)
                     {
                Topic.UpdateUnread(topicUrl, topicTitleElement, topicCount, self);
                     }
              });
       }

       /************ End Forum functions ***************/

       /////////////// END OF FORUM CLASS ////////////////////////////////////////////////////////


       /////////////// THREAD CLASS ////////////////////////////////////////////////////////
       function Thread(forum)
       {
              this.Summary = new Object();
              this.Summary.filterCount = 0;
              this.Summary.filteredAuthors = "None";
                     
              // get the meta data for the thread, used for the unread count function
              this.meta = new Object();
              var topicMeta = $(".topicmeta").find("LI:first");
              var postCountPos = $(topicMeta).text().search(" post");
              //this.meta.address = document.URL.replace(Topic.stwURL, ""); // get the topic address from the rss link as it doesnt have the page and hashtag in it

              this.meta.address = $("a.rss-link").attr("href").replace(Forum.stwRSSUrl, "");
              this.meta.lastReadCount = parseInt($(topicMeta).text().substring(0,postCountPos));
              this.meta.lastReadDate = new Date();
              if(this.meta.lastReadCount == 1)
              {
                     this.meta.lastReplyLink = $(".poststuff").find("a").attr("href");
              }
              else
              {
                     this.meta.lastReplyLink = $(topicMeta).find("A").attr("href").replace(Topic.stwURL, "").replace(this.meta.address, ""); // strip out everything other than the hashtag
              }
                     
              var self = this;
              var foundTopic = false;
              // find the item in the collection
                     
              $(forum.metaData).each(function(index, element)
              {
                     if(element.address == self.meta.address)
                     {
                           foundTopic = true;
                           forum.metaData[index] = self.meta;
                           return;
                     }
              });

              if(foundTopic == false)
              {
                     if(forum.metaData == null) // if the collection doesnt exist then start i
                     {
                           forum.metaData = new Array();
                           forum.metaData[0] = self.meta;
                     }
                     else
                     {
                           forum.metaData.push(self.meta);
                     }
              }
              forum.SaveMetaData();
       }

       Thread.posts = $(".threadpost");

       // Create Thread Menu
       Thread.prototype.ShowThreadMenu = function(blacklist)
       {
              var self = this;
              // create thread menu
              var filterDetailText = "Posts Replaced";
              if (blacklist.stwRedactBlockedUsers == false) // currently replacing posts
              {
                                  filterDetailText = "Posts Hidden";
              }
                     
              var filterDetailLink = "&nbsp;<a href='#' id='bunkBlacklistChange'>" + filterDetailText + "</a>:&nbsp;<span id='bunkFilteredPostCount'></span>";
              var blackListLink = "<a id='bunkSetBlackList' href='#'>Filtered Authors</a>:&nbsp;<span id='bunkFilteredList'></span>"
              var removeFilterLink = "<a href='#' id='bunkToggleFiltered'>Remove filter for this page</a>";
              $("#bunkThreadMenu").remove();
              $(".topicmeta LI:first").html($(".topicmeta LI:first").html() + "<div id='bunkThreadMenu'> | " + filterDetailLink + " | " + blackListLink + " | " + removeFilterLink + "</div>");
                     
              $("#bunkBlacklistChange").click(function()
              {
                                  blacklist.ModeChange(self);
                                  blacklist.Apply(self);
              });
                     
              $("#bunkSetBlackList").click(function ()
              {
                                  blacklist.StoreBlackList(self);
              });
              $("#bunkToggleFiltered").click(function ()
              {
                                  blacklist.Remove(self);
              });
       }

       Thread.prototype.UpdateThreadSummary = function()
       {
                     $("#bunkFilteredPostCount").text(this.Summary.filterCount);
                     $("#bunkFilteredList").text(this.Summary.filteredAuthors.toString());
       }

       Thread.RedactPost = function(post, blacklist, authorName)
       {
                     var self = this;
                     // store the original post
                     $(post).attr("originalpost", $(post).html());
                     // replace!
                     $(post).html("<p>" + blacklist.stwRedactText.replace("StuartBaggs", authorName) + "</p>");
                     // fade in the redactText
                     $(post).fadeIn();
                     $(post).parent().parent().fadeIn();
                     // allow the user to click the post to view the original post
                     $(post).click(function ()
                     {
                                  self.Show(this);
                     });
       }

       Thread.HidePost = function(post)
       {
              $(post).parent().parent().fadeOut();
       }

       Thread.Show = function(post)
       {
              $(post).fadeOut("fast", function () // fades out the redactText
              {
                     $(post).html($(post).attr("originalpost")); // show the original post
                     $(post).fadeIn("fast"); // fade it back in
                     $(post).unbind(); // remove this click event
              });
       }

       /////////////// END THREAD CLASS ////////////////////////////////////////////////////////
       
       /////////////// BLACKLIST CLASS ////////////////////////////////////////////////////////
       
       function Blacklist()
       {
              this.stwUseKillFile;
              this.stwUserBlacklist;
              this.stwRedactBlockedUsers;
              this.stwRedactText;
                     
              // default values for first load
              if(this.stwUseKillFile == null)
              {
                                  this.stwUseKillFile = true;
              }

              if(this.stwUserBlacklist == null)
              {
                                  this.stwUserBlacklist ="StuartBaggs,Fred,Ro";
              }
                     
              if(this.stwRedactBlockedUsers == null)
              {
                                  this.stwRedactBlockedUsers = true;
              }

              if(this.stwRedactText == null)
              {
                                  this.stwRedactText = "StuartBaggs said something stupid."; //cringe at the way this dates the code!
              }
       }
       
       /************ blacklist getter / setters ***************/
       Blacklist.prototype = 
       {
                     get stwUseKillFile()
                     {
                                  return $.parseJSON(Storage.GetData("STWUseKillFile")); // parse to boolean
                     },
                     set stwUseKillFile(val)
                     {
                                  Storage.SetData("STWUseKillFile", val.toString());
                     },
                     get stwUserBlacklist()
                     {
                           var blacklist = Storage.GetData("STWUserBlacklist");
                           if(blacklist != null)
                           {
                                  blacklist = blacklist.toString().split(",");
                           }
                           
                           return blacklist;
                     },
                     set stwUserBlacklist(val)
                     {
                    Storage.SetData("STWUserBlacklist", val);
                     },
                     get stwRedactBlockedUsers()
                     {
                                  return $.parseJSON(Storage.GetData("STWRedactBlockedUsers")); // parse to boolean
                     },
                     set stwRedactBlockedUsers(val)
                     {
                                  Storage.SetData("STWRedactBlockedUsers", val.toString());
                     },
                     get stwRedactText()
                     {
                     return Storage.GetData("STWRedactText");
                     },
                     set stwRedactText(val)
                     {
                                  Storage.SetData("STWRedactText", val);
                     }
       };

       /************ end of blacklist getter / setters ***************/


       /************ Blacklist functions ***************/
       Blacklist.prototype.ModeChange = function ()
       {
                     if (this.stwRedactBlockedUsers == true) // currently replacing posts
                     {
                                  var changeToBlock = window.confirm("Click OK to completely hide posts from your blacklisted users");

                                  if (changeToBlock == true)
                                  {
                                         this.stwRedactBlockedUsers = false;
                                         //FilterBlacklistPosts(false);
                                         $("#bunkBlacklistChange").text("Posts Hidden");
                                  }
                     }
                     else
                     {
                                  // currently hiding posts
                                  var changeToRedact = window.confirm("Click OK to replace text from blacklisted users");
                                  if (changeToRedact == true)
                                  {
                                         this.stwRedactText = window.prompt("Specify the text that you want to see on blacklisted user posts. 'StuartBaggs' will be replaced by the name of the blocked user", this.stwRedactText);
                                         this.stwRedactBlockedUsers = true;

                                         //FilterBlacklistPosts(false);
                                         $("#bunkBlacklistChange").text("Posts Replaced");
                                  }
                     }
       }

       Blacklist.prototype.StoreBlackList = function(thread)
       {
              var blockedUsers = this.stwUserBlacklist;
              //blockedUsers = window.prompt("Specify the usernames that you want blacklisted. Use Commas to separate users.", blockedUsers.split(","));
        blockedUsers = window.prompt("Specify the usernames that you want blacklisted. Use Commas to separate users.", blockedUsers).split(",");
        var cleanedBlockedUsers = new Array();
              for (var i = 0; i < blockedUsers.length; i++)
              {
                                  // set to lower case and trim spaces
                                  cleanedBlockedUsers[cleanedBlockedUsers.length] = $.trim(blockedUsers[i].toLowerCase());
              }
        this.stwUserBlacklist = cleanedBlockedUsers;
              // reapply filter
              this.Apply(thread);
       }

       Blacklist.prototype.Remove = function(thread)
       {
              var self = this;
              thread.Summary.filterCount = 0;
              thread.Summary.filteredAuthors = "None";
              $(Thread.posts).each(function()
              {
                                  Thread.ShowPost(this);
              });
       }

       Blacklist.prototype.IsAuthorInBlacklist = function(authorName)
       {
        return ($.inArray($.trim(authorName).toLowerCase(), this.stwUserBlacklist) > -1);
    }

       Blacklist.prototype.Apply = function(thread)
       {
                     // get the author of the post
                     var self = this;
                     // summary data
                     var filteredAuthors = new Array();
                     filteredAuthors[0] = "None";
                     thread.Summary.filterCount = 0;
                     thread.Summary.filteredAuthors = "None";
                     $(Thread.posts).each(function()
                     {
                                  var authorName = $(this).find(".threadauthor").find("strong").text();
                                  
                                   // check to see if author is in black list
                                  //if ($.inArray(authorName.toLowerCase(), self.stwUserBlacklist) > -1)
                                  if(self.IsAuthorInBlacklist(authorName) == true)
                                  {
                                         // set up the summary info
                                         if (filteredAuthors[0] == "None")
                                         {
                                                       filteredAuthors.length = 0;
                                         }
                                         // prevent the author appearing more than once in the summary
                                         if ($.inArray(authorName, filteredAuthors) == -1)
                                         {
                                                       filteredAuthors[filteredAuthors.length] = authorName;
                                         }
                                         thread.Summary.filterCount ++;
                                  
                                         $(this).find(".post").fadeOut(function () // fadeout the post and replace with whatever
                                         {
                                                       if (self.stwRedactBlockedUsers == true)
                                                       {
                                                                     Thread.RedactPost(this, self, authorName);
                                                       }
                                                       else
                                                       {
                                                                     // just murderise the post
                                                                     Thread.HidePost(this);
                                                       }
                                         });
                                  }
                     });
                     
                     thread.Summary.filteredAuthors = filteredAuthors;
                     thread.UpdateThreadSummary();
       }
       /************ End Blacklistfunctions ***************/
       /////////////// END OF BLACKLIST CLASS ////////////////////////////////////////////////////////

       /////////////// STORAGE CLASS ////////////////////////////////////////////////////////
       function Storage()
       {
                     
       }
       
       // use these as localstorage may not be totally x browser
       Storage.SetData = function(item, value)
       {
                     var storage = window.localStorage;
                     storage.setItem(item, value);
       }

       Storage.GetData = function (item)
       {
              
                     var storage = window.localStorage;
                     return storage.getItem(item);
       }

       /////////////// END OF STORAGE CLASS ////////////////////////////////////////////////


       /*
* jQuery JSON Plugin
* version: 2.1 (2009-08-14)
*
* This document is licensed as free software under the terms of the
* MIT License: http://www.opensource.org/licenses/mit-license.php
*
* Brantley Harris wrote this plugin. It is based somewhat on the JSON.org 
 * website's http://www.json.org/json2.js, which proclaims:
* "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
* I uphold.
*
* It is also influenced heavily by MochiKit's serializeJSON, which is 
 * copyrighted 2005 by Bob Ippolito.
*/
       /** jQuery.toJSON( json-serializble )
              Converts the given argument into a JSON respresentation.

              If an object has a "toJSON" function, that will be used to get the representation.
              Non-integer/string keys are skipped in the object, as are keys that point to a function.

              json-serializble:
                     The *thing* to be converted.
       **/
       
       
       $.toJSON = function(o)
       {
              if (typeof(JSON) == 'object' && JSON.stringify)
                     return JSON.stringify(o);
              
              var type = typeof(o);
       
              if (o === null)
                     return "null";
       
              if (type == "undefined")
                     return undefined;
              
              if (type == "number" || type == "boolean")
                     return o + "";
       
              if (type == "string")
                     return $.quoteString(o);
       
              if (type == 'object')
              {
                     if (typeof o.toJSON == "function") 
                           return $.toJSON( o.toJSON() );
                     
                     if (o.constructor === Date)
                     {
                           var month = o.getUTCMonth() + 1;
                           if (month < 10) month = '0' + month;

                           var day = o.getUTCDate();
                           if (day < 10) day = '0' + day;

                           var year = o.getUTCFullYear();
                           
                           var hours = o.getUTCHours();
                           if (hours < 10) hours = '0' + hours;
                           
                           var minutes = o.getUTCMinutes();
                           if (minutes < 10) minutes = '0' + minutes;
                           
                           var seconds = o.getUTCSeconds();
                           if (seconds < 10) seconds = '0' + seconds;
                           
                           var milli = o.getUTCMilliseconds();
                           if (milli < 100) milli = '0' + milli;
                           if (milli < 10) milli = '0' + milli;

                           return '"' + year + '-' + month + '-' + day + 'T' +
                                                hours + ':' + minutes + ':' + seconds + 
                                                 '.' + milli + 'Z"'; 
                     }

                     if (o.constructor === Array) 
                     {
                           var ret = [];
                           for (var i = 0; i < o.length; i++)
                                  ret.push( $.toJSON(o[i]) || "null" );

                           return "[" + ret.join(",") + "]";
                     }
              
                     var pairs = [];
                     for (var k in o) {
                           var name;
                           var type = typeof k;

                           if (type == "number")
                                  name = '"' + k + '"';
                           else if (type == "string")
                                  name = $.quoteString(k);
                           else
                                  continue;//skip non-string or number keys
                     
                           if (typeof o[k] == "function") 
                                  continue;//skip pairs where the value is a function.
                     
                           var val = $.toJSON(o[k]);
              
                           pairs.push(name + ":" + val);
                     }

                     return "{" + pairs.join(", ") + "}";
              }
       };

       /** jQuery.evalJSON(src)
              Evaluates a given piece of json source.
       **/
       $.evalJSON = function(src)
       {
              if (typeof(JSON) == 'object' && JSON.parse)
                     return JSON.parse(src);
              return eval("(" + src + ")");
       };
       
       /** jQuery.secureEvalJSON(src)
              Evals JSON in a way that is *more* secure.
       **/
       $.secureEvalJSON = function(src)
       {
              if (typeof(JSON) == 'object' && JSON.parse)
                     return JSON.parse(src);
              
              var filtered = src;
              filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
              filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
              filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
              
              if (/^[\],:{}\s]*$/.test(filtered))
                     return eval("(" + src + ")");
              else
                     throw new SyntaxError("Error parsing JSON, source is not valid.");
       };

       /** jQuery.quoteString(string)
              Returns a string-repr of a string, escaping quotes intelligently.
              Mostly a support function for toJSON.
       
              Examples:
                     >>> jQuery.quoteString("apple")
                     "apple"
              
                     >>> jQuery.quoteString('"Where are we going?", she asked.')
                     "\"Where are we going?\", she asked."
       **/
       $.quoteString = function(string)
       {
              if (string.match(_escapeable))
              {
                     return '"' + string.replace(_escapeable, function (a) 
                     {
                           var c = _meta[a];
                           if (typeof c === 'string') return c;
                           c = a.charCodeAt();
                           return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                     }) + '"';
              }
              return '"' + string + '"';
       };
       
       var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;

       var _meta = {
              '\b': '\\b',
              '\t': '\\t',
              '\n': '\\n',
              '\f': '\\f',
              '\r': '\\r',
              '"' : '\\"',
              '\\': '\\\\'
       };

       initialise();

       ////////////// END OF MEAT ////////////////////////////
});