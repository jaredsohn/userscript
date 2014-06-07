// ==UserScript==
// @name         Reddit Growl JPC
// @namespace     http://www.bluecombats.blogspot.com
// @description	  Sends Growl notifications from the Reddit website when the page refreshes.
// @icon             http://www.redditstatic.com/about/assets/reddit-alien.png
// @include       http://www.reddit.com*
// @version        1.25
// ==/UserScript==

GrowlMonkey = function(){
    function fireGrowlEvent(type, data){
        var element = document.createElement("GrowlEventElement");
        element.setAttribute("data", JSON.stringify(data));
        document.documentElement.appendChild(element);

        var evt = document.createEvent("Events");
        evt.initEvent(type, true, false);
        element.dispatchEvent(evt);
    }
    
    return {
        register : function(appName, icon, notificationTypes){
            var r = {};
            r.appName = appName;
            r.icon = icon;
            r.notificationTypes = notificationTypes;
            fireGrowlEvent("GrowlRegister", r);
        },
        
        notify : function(appName, notificationType, title, text, icon){
            var n = {};
            n.appName = appName;
            n.type = notificationType;
            n.title = title;
            n.text = text;
            n.icon = icon;
            fireGrowlEvent("GrowlNotify", n);
        }
    }
}();

	try{
        function RedditGrowlinit(appname){
            console.log('Starting '+  'Reddit Growl JPC');
            
            var ntNewItem = {};
            ntNewItem.name ='notification';
            ntNewItem.displayName = 'Notification';
            ntNewItem.enabled = true;

            var types = [ntNewItem];
            GrowlMonkey.register(appname, "http://www.redditstatic.com/about/assets/reddit-alien.png", types);
        }
        function RedditGrowlinterval(appname,RPost){
			var item,image,title,downVote,upVote,vote;
			var site, user, subreddit, submitted;
			var reddit=document.title;
            if(document.getElementById("siteTable")){
                var Board=document.getElementById("siteTable");
				var check="okay";
				var i=0;
				//get div array
				aArray=Board.getElementsByTagName("div");
				a=0;
				while(aArray[a]){
					//aArray[a] class name should contain 'thing'
					//console.log(aArray[a].className);
					if(aArray[a].className.search("thing")!=-1){
						item=aArray[a];
						console.log(item.className);
						//we have an item
						if(i<RPost){
							console.log("item number:"+i);
							//check if there is an image
							//a class=thumbnail loggedin/""
							if(item.getElementsByTagName("a")[0].getElementsByTagName("img")[0]){
								console.log(item.getElementsByTagName("a")[0].className);
								image=item.getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
							}
							else{
								image="http://www.redditstatic.com/about/assets/reddit-alien.png";
							}
							//get title
							//2nd div class=entry unvoted/upvoted/downvoted?
							//p class=title
							//a class title=title loggedin/""
							title=item.getElementsByClassName("title")[0].getElementsByTagName("a")[0].innerHTML;
							//get site
							site=item.getElementsByClassName("title")[0].getElementsByTagName("span")[0].getElementsByTagName("a")[0].innerHTML;
							//get time
							submitted=item.getElementsByClassName("tagline")[0].getElementsByTagName("time")[0].innerHTML;
							//get subreddit
							var bArray=item.getElementsByClassName("tagline")[0].getElementsByTagName("a");
							var b=0;
							while(bArray[b]){
								console.log(b+" classname:"+bArray[b].className);
								//subreddit class name contains subreddit
								if(bArray[b].className.search("subreddit")!=-1){
									subreddit=bArray[b].innerHTML;
								}
								//user who submitted article class contains author
								if(bArray[b].className.search("author")!=-1){
									user=bArray[b].innerHTML;
								}
								b=b+1;
							}
							//get vote
							//item property "data-ups"-"data-downs" absolute
							downVote=item.getAttribute("data-downs");
							upVote=item.getAttribute("data-ups");
							vote=upVote-downVote;
							//check output
							console.log(i+" image:"+image);
							console.log(i+" title:"+title);
							console.log(i+" vote:"+vote);
							console.log(i+" site:"+site);
							console.log(i+" time submitted:"+submitted);
							console.log(i+" subreddit:"+subreddit);
							console.log(i+" user:"+user);
							//send growl notification
							console.log('Sent Reddit Growl notification');
							//GrowlMonkey.notify("APPLICATION NAME", "NOTIFICATION TYPE", "TITLE", "TEXT", "ICON URL");
							GrowlMonkey.notify(appname, 'notification',reddit,i+" ("+vote+") "+title+"\n\n"+submitted,image);
							i=i+1;
						}
						else{
							check="stop";
							console.log("more than 10 items");
						}
					}
					else{
						//can't find 'thing' in className
					}
					a=a+1;
				}
			}
			else{
				console.log("can't find 'siteTable'");
			}
        }
        function removeHtml(tweet){
            //find 1st occurence of <
            var lessthan=tweet.indexOf("<");
            while(lessthan!=-1){
                //console.log("check: "+tweet);
                //find 1st occurence of >
                var greaterthan=tweet.indexOf(">");
                //the html stuff
                var htmlstuff=tweet.substring(lessthan,greaterthan+1);
                //replacing html with nothing
                //console.log("<:"+lessthan+" >:"+greaterthan+" htmlstuff:"+htmlstuff);
                tweet=tweet.replace(htmlstuff,"");
                //console.log("newtweet: "+tweet);
                //update lessthan
                lessthan=tweet.indexOf("<");
            }
            //console.log("end of if statements");
            return tweet;
        }
        function destroyGrowl(){
            var growlexist="exist";
            while( growlexist=="exist"){
                if(document.getElementsByTagName("growleventelement")[0]){
                    growlexist="exist";
                    var parent=document.getElementsByTagName("html")[0];
                    var child=document.getElementsByTagName("growleventelement")[0];
                    parent.removeChild(child);
                }
                else{
                    //doesn't exist
                    growlexist=" doesn't exist";
                }
            }
        }
		
		//Main Script starts here
        var appname= 'Reddit Growl JPC';
		//enter number of reddit posts you want to display
		//default 10
		var RPost=10;
		//time to start (give time for page to load) 5 seconds
		setTimeout(function(){
			RedditGrowlinit(appname);
            RedditGrowlinterval(appname,RPost);
            //destroy growl html elements
            //destroyGrowl();		
        },5000);
    }
    catch(err){
        txt="There was an error on this page.\n";   
        txt+="Error description: " + err.message + "\n";
        txt+="Error line"+err.lineNumber+ "\n";
        console.log(txt);
    }
    console.log("end of loop");