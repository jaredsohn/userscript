// ==UserScript==
// @name       Space Walrus Forums Fixes
// @namespace  http://space-walrus.com/
// @version    1.1.6
// @description  Some fixes for the Space Walrus forums, including timezone
// @include     http://www.space-walrus.com/*
// @include     http://www.space-walrus.net/*
// @include     http://space-walrus.com/*
// @include     http://space-walrus.net/*
// @exclude     http://space-walrus.com/skin/*
// @exclude     http://space-walrus.net/skin/*
// @copyright  2014, Quinny898
// ==/UserScript==


//Welcome to the script. You can customise settings here:

//This value is your time offset from GMT. Use a converter to work out what offset you are on 
offset = 1

//This boolean determines if you want to use a 12h or 24h clock. READ: true = 12h, false = 24h
timeType = true

//This string is the time zone name, eg. BST or GMT
//Summer is what it's called when daylight saving is applied
tzName = "GMT"
tzNameSummer = "BST"

//This boolean turns the search button (top left) on or off (on = true)
useSearch = true

//This boolean turns the time conversion on or off (on = true)
useTimeCv = true

//This boolean turns the small button changes (eg. To the topic!) on or off (on = true)
sBChg = true

//END OF SETTINGS
if (window.top != window.self)  //don't run on frames or iframes
    return;
var imported = document.createElement('script');
document.head.appendChild(imported);

$(window).bind("load", function() {
    if(window.location.href.indexOf("/sticky") > -1) {
        lock();
    }
    if(window.location.href.indexOf("/success") > -1) {
        lock();
    }
    if(window.location.href.indexOf("/lock") > -1) {
        lock();
    }
    if(window.location.href.indexOf("/topic/") > -1) {
        if(!window.location.href.indexOf("/success") > -1) {
            fixTimeInTopic();
        } 
    }
    if(window.location.href.indexOf("/post/") > -1) {
        if(!window.location.href.indexOf("/success") > -1) {
            fixTimeInTopic();
        } 
        
    }
    function fixTimeInTopic(){
        if(useTimeCv){
            for(var i = 0; i < 15; i++)
                if(typeof document.getElementsByClassName("date")[i] != 'undefined'){
                    replaceTime(document.getElementsByClassName("date")[i]);
                }
                //Thanks to Ikkerens for this code
                }
    }    
    
    function lock(){
        if(sBCh){
            input = document.getElementsByTagName('input.info_link');
            btn = document.getElementsByClassName('info_link')[0]
            btn2 = document.getElementsByClassName('info_link')[1]
            btn3 = document.getElementsByClassName('info_link')[2]
            
            if(btn.value == "To the topic."){
                btn.value = "To the topic!"
            }
            if(btn2.value == "Go back to the forum."){
                btn2.value = "Go back to the forum"
            }
            if(btn3.value == "Back to the forum main page."){
                btn3.value = "Back to the forum main page"
            }}
    }
    
    function replaceTime(span){
        var re;
        var replace = " CET";
        var replaceWith = tzName;
        //Regex for format the forum uses:
        if(span.innerHTML.indexOf("CET")!=-1){
        	re = /^ (?:[A-z]{5,9}), the ([0-9]{1,2})(?:st|nd|th|rd) of ([A-z]{3,12}) ([0-9]{4}) at ([0-9]{1,2}):([0-9]{1,2}) CET $/;
        }else{
       		re = /^ (?:[A-z]{5,9}), the ([0-9]{1,2})(?:st|nd|th|rd) of ([A-z]{3,12}) ([0-9]{4}) at ([0-9]{1,2}):([0-9]{1,2}) CEST $/;
            replace = " CEST";
            replaceWith = tzNameSummer;
        }
        //**VARIABLES START**// 
        var sourcestring = span.innerHTML;
        var matches = re.exec(sourcestring);     
        var months = {
            'January': 0,
            'February': 1,
            'March': 2,
            'April': 3,
            'May': 4,
            'June': 5,
            'July': 6,
            'August': 7,
            'September': 8,
            'October': 9,
            'November': 10,
            'December': 11
        };
        var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];            
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var date = new Date(
            matches[3], //year
            months[matches[2]], // month
            matches[1], // day
            matches[4], // hour
            matches[5], // minute
            0, // seconds
            0 // miliseconds
        );
        //**VARIABLES END**//
        
        //Add the "add hours" function to date - this makes it easier than UTC
        Date.prototype.addHours= function(h){
            this.setHours(this.getHours()+h);
            return this;
        }
        
        //Fix date:
        date.addHours(-2 + offset)
        hour = date.getHours();
        if(timeType){
            if (hour > 12){
                timeText = "pm"
            }else{
                timeText = "am"
            }
            hour = ((hour + 11) % 12 + 1);
            
        }else{
            timeText = ""
        }
        
        //Let's replace the span values with these new ones:
        
        //Hour:
        spanout = span.innerHTML.replace(matches[4] + ":", hour + ":");
        
        //Timezone name:
        spanout = spanout.replace(replace, timeText + " " + replaceWith);
        
        //Day:
        spanout = spanout.replace(days[matches[1]], days[date.getDay]);
        
        //Month:
        spanout = spanout.replace(matches[2], monthNames[date.getMonth()]);
        
        //Date:
        spanout = spanout.replace(matches[1], date.getDate());
        
        //Quickfix of "on" to "at":
        spanout = spanout.replace(" on ", " at ");
        
        //Output back to the span:
        span.innerHTML = spanout;
    }
    
    //Search button
    /*--- Create a button in a container div.  It will be styled and
    positioned with CSS.
*/
    if(useSearch){
        var zNode       = document.createElement ('div');
        zNode.innerHTML = '<button id="myButton" style="border: 0px outset buttonface; height:64px; width:64px; background: 			url(http://quinny898.co.uk/images/ic_action_search.png) no-repeat top left" type="button">'
        + '</button>'
        ;
        zNode.setAttribute ('id', 'myContainer');
        document.body.appendChild (zNode);
        
        //--- Activate the newly added button.
        document.getElementById ("myButton").addEventListener (
            "click", ButtonClickAction, false
        );
        
        function ButtonClickAction (zEvent) {
            location.href="http://quinny898.co.uk/sw-search.php"
        }
        
        //--- Style our newly added elements using CSS.
        GM_addStyle ( multilineStr ( function () {/*!
    #myContainer {
        position:               absolute;
        top:                    0;
        left:                   0;
        font-size:              20px;
        background:             transparent;
        border:                 0px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;
    }
    #myButton {
    	
        cursor:                 pointer;
    }
    #myContainer p {
        color:                  red;
        background:             transparent;
    }
*/} ) );}
    
    function multilineStr (dummyFunc) {
        var str = dummyFunc.toString ();
        str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
        .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
        .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
        ;
        return str;
    }
});