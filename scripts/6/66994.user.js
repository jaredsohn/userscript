// ==UserScript==
// @name           Allete Intranet - Custom Stock Quotes
// @namespace      bradvido
// @version 	   1.0.3
// @include        http://intranet.mnpower.com/
// @include        http://intranet.mnpower.com/#
// @include        http://intranet.mnpower.com/index.asp
// @include        http://intranet.mnpower.com/index.asp#
// @require        http://sizzlemctwizzle.com/updater.php?id=66994&days=1
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.min.js
// ==/UserScript==

//if jquery 1.4 needed, use this url:
//http://bradvido.com/jquery-1.4.2-for-greasemonkey.js

var stocks = [];
var MAIN_SPLITTER = "~~";
var INNER_SPLITTER = "|";
var GOOGLE_URL = "http://www.google.com/finance?q=";
		
    var addButton =$("<a></a>");
    addButton.html("Customize my stock quotes...");
    addButton.attr("href","#");
	addButton.attr("id","addButton");
	

    var stockList = $("<div></div>");
	stockList.attr("id","stockList");
    stockList.append(
        $("<textarea></textarea>")
        .attr("rows","10")
        .attr("cols","200")
        .attr("wrap","off")
    .css({
        width:"100%",
        overflowX:"scroll"
    }));

    var updateBtn = $("<a></a>")
    .attr("href","#")
	.attr("id","updateButton")
    .css({        
        color:"blue",
        
        fontSize:"larger",
        fontWeight:"bold"
    }); 
    updateBtn.html ("Update stocks!");

    
    stockList.append(updateBtn);
    stockList.hide();
   

var index = 0;
var original;
var panel;
var newContainer;
$(document).ready(function()
{
	original = $(".panel_no_borders div:nth-child(3) img").eq(0);
	//original = $("a[href='http://finance.yahoo.com/q?s=ale']").parent("span");
	//original = original.add(original.siblings("span"));
	panel = $("#left_panel div:nth-child(3)");
	newContainer = $("<div></div>");	
	panel.append(newContainer);	

	try
	{
		original.hide();		       


		original.eq(0).parent().append(addButton);
		original.eq(0).parent().append(stockList);//currently hidden
        
		$("#addButton").click(function()
        {
           configStocks(true);
		});
		$("#updateButton").click(function()
		{
			configStocks(false);
		});
		
		reloadStocks();
        setInterval(reloadStocks, 1000 * 60 * 5);//reload every 5 min
	}
	catch(x)
	{
		console.log("Error: "+ x);
		original.show();
	}
});

    function reloadStocks()
    {
        stocks = getStocks();

        if(stocks == null)
        {
            var initialList = "Dow"+INNER_SPLITTER+".DJI"+MAIN_SPLITTER+"Allete"+INNER_SPLITTER+"ALE";
            createCookie("stockList",initialList,1000);
            stocks = getStocks();
        }

        $(".stockContainer").remove();//remove old ones if any

        for(var i=0;i<stocks.length;i++)
            newContainer.append("<div class=\"stockContainer\" id=\"quote"+i+"\">...</div");//quote containers. to ensure order is same as array
        
        for(index=0;index<stocks.length;index++)
		{
			var stock = stocks[index]
			var url =GOOGLE_URL +stock.symbol;
			var friendlyName = stock.name;
			googleStockQuery(url,friendlyName,index);
		}//endloop
    }
	
    function configStocks(starting)
    {
		
        if(starting)
        {
            stocks = getStocks();

            var str = "NAME[space]SYMBOL\n";//header
            for(var i=0;i<stocks.length;i++)
            {
                var stock = stocks[i];
                str += stock.name + " " + stock.symbol + "\n";
            }
			
            $("#stockList").find("textarea").val(str);
            $("#stockList").slideDown(500);
        }
        else
        {
            $("#stockList").slideUp(500);
            var list = $("#stockList").find("textarea").val();
            var lines = list.split("\n");
            var cookieStr = "";
            for(var c=1;c<lines.length;c++)
            {
                var subArray = lines[c].split(" ");
                //console.log(c +": " + subArray);
                var name = $.trim(subArray[0]);
                var symbol = $.trim(subArray[1]);
                if(name != "" && symbol != "")
                    cookieStr += name+INNER_SPLITTER+symbol+MAIN_SPLITTER;

            }
            cookieStr = cookieStr.substring(0, cookieStr.length - MAIN_SPLITTER.length);
            //console.log(cookieStr);

            createCookie("stockList",cookieStr, 1000);
            reloadStocks();
        }
    }

	function googleStockQuery(url, friendlyName, thisIndex)
	{
        loading(true,thisIndex);
		$.get(url,function(data)
		{
            loading(false,thisIndex);
			data = filterData(data);
			var secretDiv = $("<div></div>");	
			secretDiv.attr("id","secretDiv");
			secretDiv.css("display","none");		
			secretDiv.append(data);
			//console.log("before " + secretDiv.html().length);
			secretDiv.html(secretDiv.find("div#price-panel").html());
			//console.log("after " + secretDiv.html().length);		
			//console.log(secretDiv.html());
			var quote = $("<div></div>");
			quote.css({
				border: "thin solid black",
				marginTop: "4px",
				padding: "2px"
			});
			var quoteInfo = $("<span></span>");
			quoteInfo.html(secretDiv.children("div").eq(0).html());
			var timeInfo = $("<span></span>");
            var timeText = secretDiv.find("span.nwp").find("span").html();
            if(timeText == null || $.trim(timeText) == "")
                timeText = secretDiv.find("span.nwp").text();//usually when market closes, this one is used
            
            if(timeText == null || $.trim(timeText) == "")
            {
                timeText = "";
                ///if(secretDiv.text().indexOf("After Hours") != -1);//usually when market closes, this one is used
                //    timeText = "After Hours";
            }
            if( (timeText != null) && $.trim(timeText) != "")
                timeInfo.html(" @ " +timeText); 
			var changeElem = secretDiv.find("span.ch").children("span").eq(0);			
			change = $.trim(changeElem.text());			
			//alert("'"+change+"'")
			//determine if + or -
			var increased;
			if(change.substring(0,1) == "+")
				increased = true;
			else
				increased = false;						
			if(increased){
				quoteInfo.find(".chg").
				css("color","green");
			}
			else{
				quoteInfo.find(".chg").
				css("color","red");
			}
						
			var info = $("<div></div>");
			info.css({
				fontWeight: "bold"
			});
			timeInfo.css({fontWeight:"normal"});
			quoteInfo.children().eq(0).append(timeInfo);
			info.html(friendlyName + " "+quoteInfo.html());
			quote.append(info);
			quote.find(".chr").eq(0).append("&nbsp;");//add a space after change value and before percent			
			quote.find(".chr").css("fontWeight","normal");
			newContainer.children("div#quote"+thisIndex).append(quote);	
									
			secretDiv.remove();
            
		});
	}
	   
  

var intervals = [];
function loading(loading,index)
{
var elem = $("#quote"+index);
    if(loading)
        intervals[index] = setInterval(function(){
            elem.append("...");
            if(elem.text().length >= 40)
                elem.html("...");
        },250);
    else
    {
        clearInterval(intervals[index]);
        elem.empty();
    }
}
function getStocks()//read from cookie
{
    stocks = [];

    var urlList = readCookie("stockList");
    if(urlList != null && $.trim(urlList) != "" && urlList.indexOf("undefined") == -1)
    {
        var stockArray = urlList.split(MAIN_SPLITTER);
        for(var i=0;i<stockArray.length;i++)
        {
            var subArray = stockArray[i].split(INNER_SPLITTER);
            var s = {};
            s.name = subArray[0];
            s.symbol = subArray[1];
            stocks[i] = s;
        }
        return stocks;
    }

    else
        return null;
}


  
//helpers and plugins below here
function createCookie( name, value, expires, path, domain, secure )
{
	// set time, it's in milliseconds
	var today = new Date();
	today.setTime( today.getTime() );

	/*
	if the expires variable is set, make the correct
	expires time, the current script below will set
	it for x number of days, to make it for hours,
	delete * 24, for minutes, delete * 60 * 24
	*/
	if ( expires )
	{
	expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	
	document.cookie = name + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
	( ( path ) ? ";path=" + path : "" ) +
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );
	
	//console.log("stored: " + name +" with " +value + " expiring on " + expires_date.toGMTString());
}


// this fixes an issue with the old method, ambiguous values
// with this test document.cookie.indexOf( name + "=" );
function readCookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}

function filterData(data)
	{
		// filter all the nasties out
		// no body tags
		data = data.replace(/<?\/body[^>]*>/g,'');
		// no linebreaks
		data = data.replace(/[\r|\n]+/g,'');
		// no comments
		data = data.replace(/<--[\S\s]*?-->/g,'');
		// no noscript blocks
		data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,'');
		// no script blocks
		data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,'');
		// no self closing scripts
		data = data.replace(/<script.*\/>/,'');
		// [... add as needed ...]
		return data;
	}
//cross-site xhrs plugin
// Author: Ryan Greenberg (ryan@ischool.berkeley.edu)
// Date: September 3, 2009
// Version: $Id: gm_jq_xhr.js 94 2009-09-04 08:36:28Z ryan $
//
// Tell jQuery to use the GM_XHR object instead of the standard browser XHR
$.ajaxSetup({
    xhr: function(){return new GM_XHR;}
});

function GM_XHR() {
    this.type = null;
    this.url = null;
    this.async = null;
    this.username = null;
    this.password = null;
    this.status = null;
    this.headers = {};
    this.readyState = null;
    
    this.open = function(type, url, async, username, password) {	
        this.type = type ? type : null;
        this.url = url ? url : null;
        this.async = async ? async : null;
        this.username = username ? username : null;
        this.password = password ? password : null;
        this.readyState = 1;
    };
    
    this.setRequestHeader = function(name, value) {
        this.headers[name] = value;
    };
        
    this.abort = function() {
        this.readyState = 0;
    };
    
    this.getResponseHeader = function(name) {
        return this.headers[name];
    };
    
    this.send = function(data) {
        this.data = data;
        var that = this;
        GM_xmlhttpRequest({
            method: this.type,
            url: this.url,
            headers: this.headers,
            data: this.data,
            onload: function(rsp) {
                // Populate wrapper object with all data returned from GM_XMLHttpRequest
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            },
            onerror: function(rsp) {
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            },
            onreadystatechange: function(rsp) {
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            }
        });
    };
};