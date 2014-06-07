// ==UserScript==
// @name          ebay google calendar button
// @version       0.1
// @description	  Create google calendar appointment for eBay-items. Needs an ebay AppId to determine enddate of items.  Based on Google Calendar ebay reminder v2.5, but without the date-parse code. Tested on ebay.com, be, de.  If you don't have an AppID, you can obtain one by registering with the eBay Developers Program at http://developer.ebay.com, and then generating a set of production keys. 
// @include       http://*ebay*/itm/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==
//
// known issues
// ============
// button also shows up on already ended items
//
var EbayReminder = function() {
    var _public = {};


    // parse the itemID out of the <link rel="canonical" href="">
    function getId() {

        var links = document.getElementsByTagName('head')[0].getElementsByTagName('link');
        for (var i = 0; i < links.length; i++){
            var link = links[i];
            if(link.getAttribute("rel")==="canonical")
            {
                var href= link.getAttribute("href");
                var arr = href.split('/');
                if(arr[3]==='itm')
                {
                    return arr[5];
                }
            }
        }
        //GM_log('ItemID not parsed.');
        throw new Error('ItemID not parsed');
    }

    _public.initt = function initt() {
        var itemId = getId();

        // for some reason the script is executed 3times, but just only once is the itemId found
        if(itemId !== '-1')
        {

        //this is the request URL - for details of the GetSingleItem call see
        //http://developer.ebay.com/DevZone/Shopping/docs/CallRef/GetSingleItem.html
        var ebay_url = "http://open.api.ebay.com/shopping?callname=GetSingleItem&IncludeSelector=Details&ItemId="+itemId+"&appid="+getAppId()+"&version=757&responseencoding=JSON";

        //do XMLHttpRequest
        GM_xmlhttpRequest ({ method: "GET",
                             url:    ebay_url,
                             onerror:function(e){
                                 alert('error getting endTime');
                                 for(n in e)
                                    {
                                        console.log('logging error details: '+n+' ' +e[n]);
                                    }
                             },
                             onload: function(e){
                                         console.log(e.responseText);
                                 var item = $.parseJSON (e.responseText);
                                 var date = new Date(item.Item.EndTime);
                                 var title = "Ebay item " + item.Item.ViewItemURLForNaturalSearch.split('/')[4];
                                 var details = item.Item.ViewItemURLForNaturalSearch;
                                         

                                 var toGoogleDate = function toGoogleDate(dat) {
                                    var f = function f(n) {
                                        return n < 10 ? '0' + n : n;
                                    };
                                    return '' + dat.getUTCFullYear()   + '' +
                                        f(dat.getUTCMonth() + 1) + '' +
                                        f(dat.getUTCDate())      + 'T' +
                                        f(dat.getUTCHours())     + '' +
                                        f(dat.getUTCMinutes())   + '' +
                                        f(dat.getUTCSeconds())   + 'Z';
                                 };
                                 var googledate = toGoogleDate(date);

                                 // http://www.google.com/googlecalendar/event_publisher_guide_detail.html
                                var newButton = document.createElement("DIV");
                                newButton.innerHTML = '<a href="http://www.google.com/calendar/event?action=TEMPLATE&text=' + title + '&dates=' + googledate + "/" + googledate + '&details=' + details +//trp=false does not work but why 
                                            '&sprop=name:ebayReminderscript" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button6.gif" border=0></a>';
        
                                $(newButton).insertAfter( $(".vi-is1-t") );
                             }
                          });
        }
    };

    var appID="";
    function getAppId()
    {
        // put your appID here between the quotes
        // If you don't have an AppID, you can obtain one by registering with the eBay Developers Program at http://developer.ebay.com, and then generating a set of production keys. 
        // Then copy and paste the generated AppID here between the quotes like:
        // appID = "xxxxx-xxx-xxx-xxxx-xxxxx";
        appID = "";

        // don't edit this
        if(appID==="") {
            alert ("This is a message from the \"eBay Reminder\" Greasemonkey script.\n\nPlease enter your eBay AppID in the script.\n\nIf you don't have an AppID, you can obtain one by registering with the eBay Developers Program at http://developer.ebay.com, and then generating a set of production keys. Then copy and paste the generated AppID into the script.", "");
        }

        return appID;
    }
    
    return _public;
}();
EbayReminder.initt();
