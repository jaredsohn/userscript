// ==UserScript==
// @name          Last FM Growl JPC
// @namespace     http://www.bluecombats.blogspot.com
// @description	  Sends Growl notifications from the Last.fm website when the currently playing track changes. Changes to when track is changed, also scrobble notification should work better.
// @icon             http://www.growlforwindows.com/gfw/images/plugins/lastfm.png
// @include       http://last.fm/listen*
// @include       http://www.last.fm/listen*
// @include       http*last.fm/listen*
// @include       http*www.last.fm/listen*
// @version        1.31
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
        function LastFMGrowlinit(appname){
            console.log('Starting '+  'Last FM Growl JPC');
            
            var ntNewSong = {};
            ntNewSong.name ='songplayed';
            ntNewSong.displayName = 'Song Played';
            ntNewSong.enabled = true;

            var ntUserStats = {};
            ntUserStats.name = 'scrobbleStats';
            ntUserStats.displayName =  'Scrobble Stats';
            ntUserStats.enabled = true;

            var types = [ntNewSong, ntUserStats];
            GrowlMonkey.register(appname, "http://www.growlforwindows.com/gfw/images/plugins/lastfm.png", types);
        }
        function LastFMGrowlinterval(originalTitle,appname){
            var newTitle=document.title;
            console.log("current Title:"+newTitle);
            console.log("original title: "+originalTitle);
            if(document.getElementById("radioTrackMeta")){
                var creator=document.getElementById("radioTrackMeta").getElementsByTagName('p')[0].getElementsByClassName("artist")[0].getElementsByTagName('a')[0].innerHTML;
                var name=document.getElementById("radioTrackMeta").getElementsByTagName('p')[0].getElementsByClassName("track")[0].getElementsByTagName('a')[0].innerHTML;
            }
            else{
                var creator="Unknown";
                var name="Unknown";
            }
            //var  albumImage=null;
            //console.log("ARTIST "+creator);
            //console.log("TRACK "+name);
            if (newTitle !== originalTitle) {
                originalTitle=newTitle;
                console.log('Sent Last.fm Growl notification');
                //GrowlMonkey.notify("APPLICATION NAME", "NOTIFICATION TYPE", "TITLE", "TEXT", "ICON URL");
                GrowlMonkey.notify(appname, 'songplayed',creator, name);
                scrobble="UNKNOWN";
                scrobble=LastFMScrobble(appname,creator,name,scrobble);
            }
            else{
                console.log('same song');
            }
            return [originalTitle,creator,name];
        }
        function LastFMScrobble(appname,creator,name,scrobble){
            oldScrobble=scrobble;
            console.log('Getting User statistics');
            //get total artist plays
            if(document.getElementById("userStats")){
                if(document.getElementById("userStats").getElementsByTagName('p')[0]){
                    if(document.getElementById("userStats").getElementsByTagName('p')[0].getElementsByTagName('a')[1]){
                            console.log("getting total plays");
                            var TotalPlays=document.getElementById("userStats").getElementsByTagName('p')[0].getElementsByTagName('a')[1].innerHTML;
                            TotalPlays=removeHtml(TotalPlays);
                        
                    }
                    else{
                        console.log("TotalPlays1 FAIL");
                        var TotalPlays=null;
                    }
                }
                else{
                    console.log("TotalPlays2 FAIL");
                    var TotalPlays=null;
                }
            }
            else{
                console.log("TotalPlays3 FAIL");
                var TotalPlays=null;
            }
            //Indivplays
            if(document.getElementById("userStats")){
                if(document.getElementById("userStats").getElementsByTagName('p')[0]){
                    if(document.getElementById("userStats").getElementsByTagName('p')[0].getElementsByTagName('a')[3]){
                        console.log("getting indiv plays");
                        var IndivPlays=document.getElementById("userStats").getElementsByTagName('p')[0].getElementsByTagName('a')[3].innerHTML;
                        IndivPlays=removeHtml(IndivPlays);
                        //console.log("INDIV PLAYS"+IndivPlays);
                    }
                    else{
                        console.log("IndivPlays1 FAIL");
                        var IndivPlays=null;
                    }
                }
                else{
                    console.log("IndivPlays2 FAIL");
                    var IndivPlays=null;
                }
            }
            else{
                console.log("IndivPlays3 FAIL");
                var IndivPlays=null;
            }
            //scrobble
            //userstats/3rd papragraph 1st link
            //radioControlScrobbleToggle/div[0]
            //class=lfmradio:scrobbleToggle enabled
            //id radioControlScrobbleToggle
            if(document.getElementsByClassName("lfmradio:scrobbleToggle enabled")[0]){
                    scrobble="Turn scrobbling off";
            }
            else if(document.getElementsByClassName("lfmradio:scrobbleToggle")[0]){
                    scrobble="Turn scrobbling on";
            }
            else{
                console.log("Scrobble FAIL 1");
            }
            //default settings
            if(TotalPlays){
                if(TotalPlays=="Your Library"){
                    var TotalPlays="0 times";
                    var IndivPlays="0 times";
                }
            }else{
                console.log("default total plays 0 times");
                //var TotalPlays="0 times";
            }
            if(IndivPlays){
                if(IndivPlays=="Your Library"){
                    var IndivPlays="0 times";
                }
            }else{
                console.log("default individual plays 0 times");
                //var IndivPlays="0 times";
            }
            if(scrobble=="Turn scrobbling on"||scrobble=="Turn scrobbling off"){
            }
            else{
                console.log("default scrobble status unknown");
                var scrobble="UNKNOWN";
            }
            scrobble=scrobble.trim();
            
            //console check
            console.log("TOTAL PLAYS:"+TotalPlays);
            console.log("INDIVI PLAYS:"+IndivPlays);
            console.log("OLDSCROBBLE:"+oldScrobble);
            console.log("NEWSCROBBLE:"+scrobble);
            //plays stats is it not null
            if(TotalPlays){
                //has scrobble changed
                if(oldScrobble!==scrobble){
                    //if off text should read
                    if(scrobble=="Turn scrobbling on"){
                        console.log('scrobble OFF "'+creator+'\" '+TotalPlays + "\n" + ' and "'+name+'\" '+IndivPlays);
                        //GrowlMonkey.notify("APPLICATION NAME", "NOTIFICATION TYPE", "TITLE", "TEXT", "ICON URL");
                        GrowlMonkey.notify(appname, 'scrobbleStats', 'Scrobble is OFF', 'You have played "'+creator+'\" '+TotalPlays + "\n" + ' and "'+name+'\" '+IndivPlays);
                    }
                    //if on text should read
                    else if(scrobble=="Turn scrobbling off"){
                        console.log('scrobble ON "'+creator+'\" '+TotalPlays + "\n" + ' and "'+name+'\" '+IndivPlays);
                        //GrowlMonkey.notify("APPLICATION NAME", "NOTIFICATION TYPE", "TITLE", "TEXT", "ICON URL");
                        GrowlMonkey.notify(appname, 'scrobbleStats', 'Scrobble is ON', 'You have played "'+creator+'\" '+TotalPlays + "\n" + ' and "'+name+'\" '+IndivPlays);
                    }
                    else{
                        console.log("NO DATA");
                    }
                }
            }
            else{
                //no change in scrobble
            }
            return scrobble;
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
//Display fix when zooming in and out
//leftcolumn
document.getElementById("leftColumn").style.width="560px";
//rightcolumn
document.getElementById("rightColumn").style.width="350px";
        var appname= 'Last FM Growl JPC';
        LastFMGrowlinit(appname);
        var originalTitle = document.title;
        console.log("Original Title:"+originalTitle);
        scrobble="UNKNOWN";
        //var count=0;
        MyVar=setInterval(function(){
            var returnVar=LastFMGrowlinterval(originalTitle,appname);
            originalTitle=returnVar[0];
            creator=returnVar[1];
            name=returnVar[2];
            scrobble=LastFMScrobble(appname,creator,name,scrobble);
            //destroy growl html elements
            destroyGrowl();
            //count++;
            //console.log(count);
            //if(count>20){
                //clearInterval(MyVar);
            //}
        },3000);		      
    }
    catch(err){
        txt="There was an error on this page.\n";   
        txt+="Error description: " + err.message + "\n";
        txt+="Error line"+err.lineNumber+ "\n";
        txt+="Click OK to continue.\n\n";   
        console.log(txt);
    }
    console.log("end of loop");