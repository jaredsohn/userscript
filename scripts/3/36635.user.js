// ==UserScript==
// @name           Twitter Sidebar Replies
// @namespace      http://sournote.org/scripts
// @description    Shows replies to a user on that user's Twitter page
// @include        http*://twitter.com/*
// @date           2009-09-17
// @version        1.7
// @GM_version     0.8.20080609.0
// ==/UserScript==


GM_TSR = {
	un : "",
	url : null,
	user : null,
	hash : null,
  rtwt : null,

	init : function()
	{
        GM_registerMenuCommand("TSR: Set Max Replies...", GM_TSR.set_max);
        if( GM_getValue("collapse_sections") ) GM_registerMenuCommand("TSR: Sections behave normally...",GM_TSR.collapse_normal);
        else GM_registerMenuCommand("TSR: Collapse sections automatically...",GM_TSR.collapse_always);
        if( GM_getValue("GM_TSR_hidert") ) GM_registerMenuCommand("TSR: Show retweets",GM_TSR.showrt);
        else GM_registerMenuCommand("TSR: Hide retweets",GM_TSR.hidert);

        var $ = unsafeWindow.$;
        var x = $("#side_base"), ys = x.css("background-color").replace(/rgb[(]|[)]/g,"").split(", "), r = ys[0]*1, g = ys[1]*1, b = ys[2]*1;
        var composite_rgb = "rgb("+Math.floor((255-r)*.4+r)+","+Math.floor((255-g)*.4+g)+","+Math.floor((255-b)*.4+b)+")";
        var border_color = $("#rssfeed hr").css("background-color");
        var divider_color = "rgb("+Math.floor(r*.85)+","+Math.floor(g*.85)+","+Math.floor(b*.85)+")";

        GM_addStyle("#side div.GM_TSR_content { border-top: 1px solid "+border_color+"; }");
		    GM_addStyle("div.GM_TSR_p { border-top: 1px solid "+divider_color+"; padding: 0 0 5px 0; float: left; width: 178px; }");
		    GM_addStyle("div.GM_TSR_p:hover { background-color: "+composite_rgb+" }");
		    GM_addStyle("div.GM_TSR_p em a { color: inherit; text-decoration: none; font-family: georgia; }");
		    GM_addStyle("div.GM_TSR_p em a:hover { text-decoration: underline; }");
		    GM_addStyle("a.GM_TSR_reply { background-color: #fff; -moz-border-radius: 0 0 4px 4px; padding: 0 2px; float: right; margin: 0 0 0 5px; }");
        GM_addStyle(".GM_TSR_clear { display:inline-block; }");
        GM_addStyle(".GM_TSR_clear:after { display:block; visibility:hidden; clear:both; height:0; content: '.'; }");

		GM_TSR.url = new RegExp("((?:https?://)(?:[0-9a-z_!~*'()-]+[.])*(?:[0-9a-z][0-9a-z-]{0,61})?[0-9a-z][.][a-z]{2,6}(?:(?:/[0-9a-z_!~*'().;?:@&=+$,%#-]*)*/?))","gi");
		GM_TSR.user = new RegExp("@([a-zA-Z0-9_]+)","gi");
		GM_TSR.hash = new RegExp("#([a-zA-Z0-9_]+)","gi");

		if( GM_getValue("collapse_sections") )
		{
            $("#trends").addClass("collapsed").find("ul").hide();
            $("#saved_searches").addClass("collapsed").find("ul").hide();
        }

		var loc = (window.location+"").split("/"),meta,i;
		meta = document.getElementsByTagName("meta");
		for( i = 0; i < meta.length; i++ )
		{
			if( meta[i].name == "session-user-screen_name" && GM_TSR.un == "" )
			{
				GM_TSR.un = meta[i].content;
			}
			if( meta[i].name == "page-user-screen_name" )
			{
				GM_TSR.un = meta[i].content;
			}
		}

    GM_TSR.rtwt = new RegExp("(^rt:?[ ]*@"+GM_TSR.un+")|([(]via[ ]*@"+GM_TSR.un+"[)])","ig");

		if( GM_TSR.un != "" )
		{
			GM_xmlhttpRequest({
				method:"GET",
				url:"http://search.twitter.com/search.json?q=%40"+GM_TSR.un,
				headers:{
					"User-Agent":"Mozilla/5.0",
					"Accept":"text/json"
				},
				onload:GM_TSR.handle
			});
		}
	},

	handle : function(response)
	{
		var r = eval("("+response.responseText+")");

		if( r.results && r.results.length > 0 )
		{
			var il, rx, rx_url, h, 
                ds = document.getElementById("side").appendChild(document.createElement("div")), 
                max = (GM_getValue("GM_TSR_MR")) ? GM_getValue("GM_TSR_MR")*1 : 1000000;
			ds.className = "section last GM_TSR_content";
			h = ds.appendChild(document.createElement("div"));
			h.className = "section-header GM_TSR_clear";
			h.appendChild(document.createElement("h1")).appendChild(document.createTextNode("Replies"));

			for( var i=0; i < r.results.length && i < max; i++ )
			{
        console.log(i+" "+r.results[i].text);
        if( !GM_TSR.rtwt.test(r.results[i].text) || !GM_getValue("GM_TSR_hidert") )
        {
  				rx = new RegExp("^[@]"+GM_TSR.un);
  				il = "<div class='GM_TSR_p'>"+
                      "<a class='GM_TSR_reply' href='http://twitter.com/?status=@"+r.results[i].from_user+"%20&in_reply_to_status_id="+r.results[i].id+"&in_reply_to="+r.results[i].from_user+"'><img src='http://s.twimg.com/a/1253048135/images/icon_reply.gif'></a>"+
                      "<p><a href='http://twitter.com/"+r.results[i].from_user+"'>"+
  					r.results[i].from_user+"</a>: "+
  					r.results[i].text
  							.replace(GM_TSR.url,"<a href='$1'>$1</a>")
  							.replace(GM_TSR.user,"@<a href='http://twitter.com/$1'>$1</a>")
  							.replace(GM_TSR.hash,"<a href='http://search.twitter.com/search?q=%23$1'>#$1</a>")+
  					" <em><a href='https://twitter.com/"+r.results[i].from_user+"/status/"+r.results[i].id+"'>"+GM_TSR.tt(new Date(r.results[i].created_at))+"</a></em> "+
  					"</p></div>";
  				ds.innerHTML += il;
        }
			}
		}
	},

	tt : function(dt)
	{
		var nw = new Date(), df = nw - dt, dm = Math.floor(df/60000), dh = Math.floor(dm/60), at = new Date(dt);
		if( dm <= 0 )	{ return "a few seconds ago"; }
		if( dm < 60 )	{ return (dm == 1)?"1 minute ago":dm+" minutes ago"; }
		if( dh <= 1 )	{ return "about 1 hour ago"; }
		if( dh < 24 )	{ return "about " + dh + " hours ago"; }
		if( (nw.getDate() - dt.getDate()) == 1 )	{ return "yesterday"; }
		at.setDate(at.getDate() + 1);
		nw.setDate(nw.getDate() + 1);
		if( (nw.getDate() - at.getDate()) == 1 )	{ return "yesterday"; }
		if( dt.getHours() == 0 ) nw = "12:"+dt.getMinutes()+" AM ";
		else if( dt.getHours() < 12 ) nw = dt.getHours()+":"+dt.getMinutes()+" AM ";
		else nw = (dt.getHours()-12)+":"+dt.getMinutes()+" PM ";
		return nw + ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][dt.getMonth()] + " " + dt.getDate();
	},

    set_max : function()
    {
        var mr = prompt("What is the maximum # of replies you would like to see in the sidebar?");
        if( !isNaN( mr*1 ) )
            GM_setValue("GM_TSR_MR",mr*1);
        else
            GM_deleteValue("GM_TSR_MR");
    },
    
    collapse_normal : function()
    {
        GM_deleteValue("collapse_sections");
    },
    
    collapse_always : function()
    {
        GM_setValue("collapse_sections",1);
    },
    
    showrt : function()
    {
        GM_deleteValue("GM_TSR_hidert");
    },
    
    hidert : function()
    {
      GM_setValue("GM_TSR_hidert",1);
    }



};

GM_TSR.init();


//Check for updates
var SUC_script_num = 36635; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand('TSR: Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
