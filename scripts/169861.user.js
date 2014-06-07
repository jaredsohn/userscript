// ==UserScript==
// @name       	TF2Profiler Script
// @namespace  	TF2Profiler
// @require    	http://code.jquery.com/jquery-latest.min.js
// @version    	0.63
// @homepage   	http://www.kugrian.co.uk/tf2profiler
// @description  tf2Profiler userscript for tf2Lobby.com/etf2l.org/steamcommunity.com/ucgleague.com/wireplay.co.uk
// @downloadURL https://userscripts.org/scripts/source/169861.user.js
// @updateURL   https://userscripts.org/scripts/source/169861.meta.js
// @match		http://tf2lobby.com/*id=*
// @match		http://etf2l.org/*
// @match		http*://steamcommunity.com/id/*
// @match		http*://steamcommunity.com/profiles/*
// @match		http*://steamcommunity.com/groups/*
// @match		http://www.ugcleague.com/players_page.cfm?*
// @match		http://tf2.wireplay.co.uk/*
// @match		http*://userscripts.org/scripts/show/169861
// @grant		unsafeWindow
// @grant		GM_setValue
// @grant		GM_getValue
// @grant      	GM_listValues
// @grant      	GM_deleteValue
// @copyright  2013+, Kugs
// @run-at document-end

// ==/UserScript==

// Thanks to https://userscripts.org/users/redshift for help and cleaning stuff 
//    up
var implode = function (glue, pieces) {  return ((pieces instanceof Array)? pieces.join (glue): pieces);}
var currentURL = (document.location+'');
    console.log(currentURL);
var TF2Profiler_options = false;
var sites = ({ 
   "TF2Profiler" 	: 	"http://www.kugrian.co.uk/tf2profiler/index.php?players=",
   "ETF2L"			:	"http://etf2l.org/search/?q=",
   "UGC"          :	"http://www.ugcleague.com/players_page.cfm?player_id=",
   "Wireplay"     :	"http://tf2.wireplay.co.uk/index.php?pg=search",
   "ESEA"			:	"http://play.esea.net/index.php?s=search&query=",
   "logs.tf"		:	"http://logs.tf/profile/",
   "tf2logs.com"  :  "http://www.tf2logs.com/players/",
   "SizzlingStats":	"http://sizzlingstats.com/player/",
   "TF2lobby.com"	:	"http://tf2lobby.com/profile?fid=",
   "TF2stats.net"	:	"http://tf2stats.net/player_stats/",
   "SteamRep"		:	"http://steamrep.com/search?q=",
   "TF2items.com"	:	"http://www.tf2items.com/profiles/",
   "backpack.tf"  :  "http://backpack.tf/profiles/",
   "tf2b.com"     :  "http://tf2b.com/tf2/",
   "bazaar.tf"    :  "http://bazaar.tf/profiles/",
   "tf2tp.com"    :  "http://tf2tp.com/profile.php?profile=",
});
var TF2Profiler_extraOptions = ({
    "Steamcommunity.com" 	: ({  "show_links"   : "Show Links on Profiles",
                             	   "show_summary" : "Show Full Summary",
                             	   "show_server"  : "Show Server Details on Profiles",
                             	   "group_link"   : "Link to TF2Profiler on Group Pages",
                                 "friend_server_browser" : "Show Friends Playing TF2 Link"}),
       "ETF2L"					: ({  "show_links"   : "Show Links on Profiles",
                                 "team_link"    : "Link to TF2Profiler on Team Pages",
                                 "forum_link"   : "Show Links Arrow on Forum Profiles"}),
       "Wireplay"          : ({  "show_links"   : "Show Links on Profiles",
                                 "search_fix"   : "Show fixes on Search Pages"}),
       "TF2Lobby"          :  ({ "show_links"   : "Show Extra Links on Profiles",
                                 "move_links"   : "Move Links To Top of Page",
                                 "lobby_link"   : "Show TF2Profiler Link in Lobbies"})
});
var TF2Profiler_etf2lPlayers = new Array();

function TF2Profiler_optionsLi (name,value ) {
   var box = document.createElement('input');
   var li = document.createElement('li');
   $(box).attr('type','checkbox');
   $(box).attr('name',name);
   $(box).attr('value',value);

   
  // if (!GM_getValue('setup'))
  //    GM_setValue(name,true);
   var checked = GM_getValue(name);
   console.log(name+" = "+checked);
   if (checked==true)
      $(box).attr('checked',false);
   else 
      $(box).attr('checked',true);

   
   $(box).click(function (e) { 
      if (!$(this).is(':checked')) 
         GM_setValue($(this).attr('name'),true); 
      else
         GM_deleteValue($(this).attr('name'));
      console.log('Checked',$(this).attr('checked'));
      //$(this).css({'outline':'3px solid green'}); 
      $("#TF2Profiler_saved").show('fast',function() { 
         window.setTimeout(function () { $("#TF2Profiler_saved").hide('slow')}, 1000); });
      
   
      e.stopPropagation();
   });
   
   $(li).html($(box));
   $(li).css({'padding-left':'15px'});
   var label = document.createElement('label');
   $(label).css({'padding-left':'5px','color':'#FFFFFF'});
   $(label).text(value);
   $(label).attr('for',name);
   $(li).append($(label));
   return $(li);
}

function TF2Profiler_createOptions () {
   var ulCss = ({'list-style-type':'none','padding':'20px','padding-top':'0px'})
   TF2Profiler_options = document.createElement('div');
   $(TF2Profiler_options).css({"padding":"10px","color":"#FFFFFF","position":"fixed","top":"50px",
      "right":"10px","border":"1px solid #FFFFFF","z-index":"100000","background-color":"#000000",
      "border-radius":"5px",'font-size':'12px'});
   $(TF2Profiler_options).attr('id',"TF2Profiler_options");
   $(TF2Profiler_options).html("<h2 style='float:left;color:#FFFFFF;font-size:14px'>Userscript Options</h2>");
   var links = Object.keys(sites);
   var linkList = document.createElement('ul');
   var siteList = document.createElement('ul');
  
   $(linkList).css(ulCss);
   $(linkList).css({'float':'left','clear':'both'});
   $(linkList).append("<li style='padding-left:5px'><b><u>Links to Show</u></b></li><li>&nbsp;</li>");
   $(siteList).css(ulCss); 
   $(siteList).css({'float':'right'});  
   $(siteList).append("<li style='padding-left:5px'><b><u>Other Sites</u></b></li>");
   for (var x = 0; x < links.length; x++) {
      //if (!GM_getValue('setup'))
      //   GM_setValue(links[x],true);

      $(linkList).append(TF2Profiler_optionsLi(links[x],links[x]));
   }
   //$(linkList).append("<li>&nbsp;</li><li style='padding-left:5px'><b><u>Other Sites</u></b></li>");
   links = Object.keys(TF2Profiler_extraOptions);
   for (var x = 0; x < links.length; x++) {
      var newList2 = document.createElement('ul');
      $(newList2).css({'padding-left':'10px'});
      $(newList2).append("<li>&nbsp;</li>");
      $(newList2).append(links[x]);
      var linksInner = Object.keys(TF2Profiler_extraOptions[links[x]]);

      $(newList2).css({'list-style-type':'none','padding-left':'5px'});
      for (var y = 0; y < linksInner.length; y++) {

         $(newList2).append(TF2Profiler_optionsLi(links[x]+"_"+linksInner[y],TF2Profiler_extraOptions[links[x]][linksInner[y]]));
      }
      $(siteList).append($(newList2));
      
   }
   if (!GM_getValue('setup'))
      GM_setValue('setup',true);
   $(TF2Profiler_options).append($(linkList));
   $(TF2Profiler_options).append($(siteList));
   var resetDiv = document.createElement('div');
   $(resetDiv).css({'float':'right'});
   var a = document.createElement('a');
   $(a).text("Check All");
   $(a).css({'color':'#00FF00','position':'absolute','right':'100px'});
   $(a).attr('href','#TF2ProfilerCheckAllOptions')
   $(a).click(function (e) { 
      e.stopPropagation();
      var keys = GM_listValues();
      for (var i=0, key=null; key=keys[i]; i++) {
         GM_deleteValue(key);
      }
      GM_setValue('setup',false);
      $(this).parent().parent().remove();
      TF2Profiler_createOptions();
      $("#TF2Profiler_saved").show('fast',function() { 
         window.setTimeout(function () { $("#TF2Profiler_saved").hide('slow'); }, 1000); });
   });
   var close = $(document.createElement('a')).text('X');

   $(close).css({"color":"red","padding":"3px","position": "absolute",
      "right":"2px","top":"0px","font-size": "20px"})
   $(close).attr({'href':'#TF2ProfilerCloseOptions','title':'close'});
   $(close).click(function (e) { $('#TF2Profiler_options').fadeOut('slow'); e.stopPropagation();});
   $(resetDiv).html($(close));
   $(resetDiv).append("<br>");
   $(resetDiv).append($(a));
   $(resetDiv).append("<br><a style='color:#000000'>test</a>");
   $($(TF2Profiler_options).find('h2')).after($(resetDiv));
 
   var saved = document.createElement('span');
   $(saved).css({'position':'absolute','bottom':'5px','left':'10px','display':'none','color':'#00FF00'});
   $(saved).text('Saved - Refresh Page to Show');
   $(saved).attr('id','TF2Profiler_saved');
   $(TF2Profiler_options).append($(saved));
   $('body').prepend($(TF2Profiler_options));    
}

function siteList (ul,sid,longLink,linkClass) {
   var pos = 7960265728;
	var pre = '7656119';
   var val = parseInt(sid.substr(pre.length)) - pos;
   var s64 = 'STEAM_0:' + (val & 1) + ':' + (val >> 1);

   $.each(sites, function(name,url) {
      if (!GM_getValue(name) || GM_getValue(name)==false) {

         var li = document.createElement('li');
    	   var a = document.createElement('a');
    	   $(a).attr('target','_blank');
         if (name == "ETF2L" || name=="ESEA") {
            if (name == "ESEA")
                url += s64.replace("STEAM_","");
            else
            	url += s64;
         }
         else
            url += sid;

         if (name == "Wireplay") {
            var form = document.createElement('form');
            $(form).attr({'action':'http://tf2.wireplay.co.uk/index.php?pg=search','method':'post','target':'_blank'});
            var input = document.createElement('input');
            $(input).attr({'type':'hidden','name':'searchterm','value':s64});
            $(form).append($(input));
            var input = document.createElement('input');
            $(input).attr({'type':'hidden','name':'steamid','value':'true','checked':'true'});
            $(form).append($(input));
            $(a).click(function () { $(form).submit(); });
            $(a).css({'cursor':'pointer'});
         } else
    	      $(a).attr('href',url);
        
         if (longLink)
            $(a).html("View "+name+" Profile");
         else
    	      $(a).html(name);
        
         if (linkClass)
            $(a).addClass(linkClass);
    	   $(li).append($(a));
    	   $(ul).append($(li));
    	}
   });
    
    var li = document.createElement('li');
    var span = document.createElement('a');
    if (linkClass)
      $(span).addClass(linkClass);
    
    $(span).text("Userscript Options");
    $(span).attr('href','#TF2ProfilerOptions');
    $(span).click( function (e) {
        if (!TF2Profiler_options)
            TF2Profiler_createOptions();
        else
			$(TF2Profiler_options).fadeToggle('slow');
         $("body").click(function() { $('#TF2Profiler_options').fadeOut('slow'); });
         $(TF2Profiler_options).click(function(e) { e.stopPropagation(); });
         e.stopPropagation();
    });
    $(li).append($(span));
    $(ul).append($(li));

	return s64; // one thing uses it - forget what
}

var websites = [

//----------------------------------------------------------------
// TF2Lobby
//----------------------------------------------------------------
// Features:
//  Add link for players in a lobby
//  Add profile links in the player profile
{// Lobby pages
match: function( url )
{
	return url.match( "http://tf2lobby.com/lobby?" ) && !GM_getValue('TF2Lobby_lobby_link');
},
script: function( site )
{
	var profilerLink = document.createElement('a');
	$(profilerLink).html("View these players on TF2Profiler");
	$(profilerLink).attr("target","_blank");
	$(profilerLink).css({"color":"#000000","font-weight":"bold"});
	$(profilerLink).hover( function() {
  	   var tmp = unsafeWindow.lobby["players"];
        var st = { "red":[],"blu":[],"spec":[] };

   	for (var x = 0; x < Object.keys(tmp).length; x++) {
    	var player = tmp[Object.keys(tmp)[x]];
        if (!st[player['team']])
            st[player['team']] = [player['fid']];
        else
        	{
            var tA = st[player['team']];
        	tA.push(player["fid"]);
            st[player['team']] = tA;
        }
   	}
   	var link = "http://www.kugrian.co.uk/tf2profiler/index.php?";
        console.log(st);
    for (var x = 0; x < Object.keys(st).length; x++) {
        var tt = Object.keys(st)[x];
    	if (st[tt].length) 
            link += tt+"="+implode(",",st[tt])+"&";
    }            

   	$(profilerLink).attr("href",link);
      $(profilerLink).css({"text-decoration":"underline","color":"#FFFFFF"});
   	//window.open("http://www.kugrian.co.uk/tf2profiler/index.php?players="+implode(",",st),'_blank');
	  },function() { $(profilerLink).css({"text-decoration":"none","color":"#000000"});
	});
	
	var div = document.createElement('div');
   $(div).css({'padding': '5px','border': '1px solid #000000', 'border-radius': '10px', 'float': 'right', 
      'background-color':'#9B9CA3'});
	$(div).append(profilerLink);
	$("#lobbyInfo").parent().append($(div));
   console.log("Adding lobby link");
},
},
{// Profile pages
match: function( url )
{
	return url.match("http://tf2lobby.com/profile?") && !GM_getValue('TF2Lobby_show_links');
},
script: function( site )
{
    var sidLink = $('#otherSites').find('a').attr('href');
    var sid = sidLink.replace("http://steamcommunity.com/profiles/","");
    var sNames = Object.keys(sites);

    delete(sites["TF2items.com"]);
    delete(sites["TF2stats.net"]);
    delete(sites["TF2lobby.com"]);
   
    siteList($("#otherSites").children('ul'),sid,false,false);
    
    $("#player").find("p").html("<a href="+sidLink+">"+$("#player").find("p").html());
    
   if (!GM_getValue('TF2Lobby_move_links')) {
      $('#otherSites').find('ul').hide();
      $('#otherSites').find('ul').css({"margin":"10px 10px 0px 25px"});
      $("#lobbyHistory").addClass("next");
      $("#otherSites").removeClass("next");
      $("#lobbyHistory").parent().prepend($("#otherSites"));
      var h2 = $("#otherSites").find('h2');
      $(h2).css({'cursor':'pointer'});
      $(h2).html('Other Sites <span style="font-size: 10pt">(Click to show)</span>');
      $(h2).click(function() { 
         $("#otherSites").find('ul').slideToggle('slow'); 
         if ($("#otherSites").find('ul').is(":hidden"))
            $(h2).find('span').text('(Click to show)');
         else
            $(h2).find('span').text('(Click to hide)');
      });
  }
    

    $($("#header").find('.wrap').children()[1]).html('<a href=http://tf2lobby.com>'
       +$($("#header").find('.wrap').children()[1]).html()+'</a>')
    //$("#player").find("img").html("<a href="+sidLink+">"+$("#player").find("img").html()+"</a>");
    //console.log(s64);
},
},

//----------------------------------------------------------------
// ETF2L
//----------------------------------------------------------------
{// User pages
match: function( url )
{
	return url.match("http://etf2l.org/forum/user/") && !GM_getValue('ETF2L_show_links');
},
script: function( site )
{
   var teams = $($("#rs-discuss").find('ul')[0]);
   var sidLink = $($(".playerinfo").find("a")[0]).attr('href');
   var sid = sidLink.replace("http://steamcommunity.com/profiles/","");
   var ul = document.createElement('ul');
	delete(sites["ETF2L"]);

   siteList($(ul),sid,true,false);
   teams.after($(ul));
   teams.after("<h2>Other Sites</h2><p></p>");
},
},
{// Forum pages
match: function( url )
{
	return url.match("http://etf2l.org/forum/") && !GM_getValue('ETF2L_forum_link');
},
script: function( site )
{
	$.each($('.details'),function(index,details) {
       var a = document.createElement('a');
        var color;

        $(a).html('&#9660;');
        
        if ($(details).parent().hasClass('post-block-odd'))
            color = "#dcddca";
        else
            color = "#e4e5d4";
        $(a).css({'color':'#000000','cursor':'pointer','float':'right'});
        $($(details).children()[1]).prepend($(a));
            var steamid = $($($(details).children()[2]).find('a')).attr('href').
               replace("http://steamcommunity.com/profiles/","").replace("/","");
        $(a).click(function(e) {
			$('.TF2Profiler_playerLinks').fadeOut('slow'); 
            var links = document.getElementById('TF2Profiler_'+steamid);
                            console.log(steamid);
           // console.log(links);
            if (!links) {
               
                console.log(steamid);
               var ul = document.createElement('ul');
                $(ul).css({'list-style-type':'none','padding':'5px','list-style-image':'none'});
               var div = document.createElement('div');
   				$(div).css({'background-color':color,'display':'none','z-index':'200',
                            'position':'absolute','border':'1px solid #a0abb4','border-radius':'5px','left':'150px'}); 
               var s64 = siteList($(ul),steamid,false,'whiteLink');
   			   $(div).append($(ul)); 
               $(div).append('<ul style="list-style-type:none;list-style-image:none;padding:5px"><li>'+steamid+'</li><li>'+s64+'</li></ul>');
               $(div).attr('id','TF2Profiler_'+steamid);
               $(div).addClass('TF2Profiler_playerLinks');
               $(this).after($(div));
               links = $(div);


            }
            $(links).fadeToggle('slow');
            if ($(links).is(":visible")) {
               $("body").click(function() { $('.TF2Profiler_playerLinks').fadeOut('slow'); });
            }

               e.stopPropagation();


        });
        $(a).after(" ");

    });
},
},
{// Team page
match: function( url )
{
	return url.match("http://etf2l.org/teams/") && !GM_getValue('ETF2L_team_link');
},
script: function( site, url )
{
   var tid = url.replace("http://etf2l.org/teams/","");
   tid = tid.replace("/","");
   $(".teamname").append("<a href=http://www.kugrian.co.uk/tf2profiler/index.php?team="+tid+"&org=etf2l "
      +"target=_blank> - View on TF2Profiler</a>");
},
},
//----------------------------------------------------------------
// Steam community
//----------------------------------------------------------------
{
match: function( url )
{
	return url.match(/^https?\:\/\/steamcommunity.com\/(?:id|profiles)/);
},
script: function( site, url )
{
   if (url.match('/friends')) {
      var friends = $('.linkFriend_in-game');
      if (friends.length && !GM_getValue('Steamcommunity.com_friend_server_browser')) {
         var a = document.createElement('a');
         $(a).text('Show Friends Playing TF2');
         $(a).click( function(e) { 
            profileDiv = $('body').find('.TF2ProfilerFriendServers');

            if ($(profileDiv).text())
               $(profileDiv).fadeToggle('slow');
            else {
               console.log('Creating');
               var tmp = [];
               var out = "";
               var loops = 4;

               $.each( $(friends),
                  function(a,b){ 
                     if ($(b).text().match('Team')) {
                        var t = $(b).find('.friend_join_game_link').attr('onClick');
                        if (t) {
                           t = t.replace("window.location='steam://connect/","");
                           var friendBlockContent = $(b).parent().parent();
                           var txt = "<a href="+$($(friendBlockContent).parent().find('a',0)).attr('href')+"><img src="+$($(friendBlockContent).prev().find('img',0)).attr('src')
                              +" height=24px width=24px><span style='padding-left: 5px'>"+$(friendBlockContent).html().split('<br>')[0]+"</span></a>";

                           t = t.replace("';","");
                           if (!tmp[t]) 
                              tmp[t] = [txt];
                           else {
                              var y = tmp[t];
                              tmp[t].push(txt)
                           }
                        }
                     }
               });

               var div = document.createElement('div');
               $(div).addClass('TF2ProfilerFriendServers');
               $(div).css({'position':'absolute','top':'250px','left':'0px','right':'0px','border':'1px solid #FFF',
                  'z-index':'100000',"background":"#000000",'padding':'10px','width':'1000px','overflow':'hidden',
                  'margin-left':'auto','margin-right':'auto','display':'none'});

               var servers = Object.keys(tmp);
               servers.sort(function(a,b) {
                  var diff = tmp[a].length > tmp[b].length;
                  return diff;
                  
               });
               servers.reverse();
               console.log(servers);
               var row = 0;

               var odd = false;

               for (var x = 0; x < servers.length; x++) {
                  var tmpDiv = document.createElement('div');
                  $(tmpDiv).css({'width':'250px','float':'left','display':'inline','margin-bottom':'20px'});
                  if (row==0) {
                     $(tmpDiv).css({'clear':'both'});
                  }
                  row++;
                  var sText = "<iframe src="
                    +"http://module.game-monitor.com/"+servers[x]+"/website.php?s=compatible.css&f=1 frameborder=0 "
                    +"scrolling=no height=240 width=200></iframe>";

                  var serverLink = "<a style='color:#00FF00' href=steam://connect"+servers[x]+">"+servers[x]+"</a>";
                  var players = Object.keys(tmp[servers[x]]);

                  $(tmpDiv).append("<ul style='padding:3px;margin:0px;list-style-type:none;'>"
                     +"<li>"+implode("</li><li>",tmp[servers[x]])
                     +"</li></ul></li></ul>");

                  $(tmpDiv).css({'vertical-align':'top','width':'220px','margin':'5px','padding':'5px','border':'1px solid','border-radius':'5px','margin-bottom':'20px'});
                  if (odd) {
                     odd = false;
                     $(tmpDiv).css({'background':'#303030','color':'#FFFFFF'});

                     $(a).css({'color':'#FFFFFF'});
                  } else {
                     $(tmpDiv).css({'background':'#404040','color':'#EEEEEE'});

                     $(a).css({'color':'#EEEEEE'});
                     odd = true;
                  }
                  $(tmpDiv).append($(sText));
                  if (row==loops) { 
                     row = 0;
                     if (odd)
                        odd = false;
                     else
                        odd = true
                  }
                  $(div).append($(tmpDiv));

               }

               
               var table = document.createElement('table');

               $(div).prepend("<h1>Friends playing TF2</h1>");
               var close = $(document.createElement('a')).text('X');

               $(close).css({"color":"red","padding":"3px","position": "absolute",
                  "right":"2px","top":"0px","font-size": "20px"})
               $(close).attr({'href':'#TF2ProfilerCloseFriendServers','title':'close'});
               $(close).click(function (e) { $('.TF2ProfilerFriendServers').fadeToggle('slow'); e.stopPropagation();});
               $(div).append($(close));
               $(div).fadeIn('slow');              
               $('body').prepend($(div));

            }
               $('.TF2ProfilerFriendServers').click(function(e) { e.stopPropagation(); } );
               $("body").click(function() { $('.TF2ProfilerFriendServers').fadeOut('slow'); });
               e.stopPropagation();
         });
         var div = document.createElement('div');
         $(div).css({'padding':'5px'});
         $(div).append($(a));
         $('.maincontent').prepend($(div));
         if ($('.manage_friends_header')) // Viewing your own profile
            $('.manage_friends_header').after($(a));

      }
   }
   var div = document.createElement('div');
   var old = false;
   $(div).css({'background-color':'#171717','padding':'10px','margin-top':'20px','display':'none','z-index':'200',
      'position':'absolute','right':'280px','border':'2px solid #ffffff','border-radius':'5px'}); 
   $(div).attr('id','TF2Profiler_linkList');
   var ul = document.createElement('ul');
   $(ul).css({'list-style-type':'none','padding-left':'5px'});

    if (!unsafeWindow.g_rgProfileData) { // Older style profile
      if (!unsafeWindow.ajaxFriendUrl) // Get outa here
         throw new Error("Shouldn't be here.  Let's go.");
      var sid = unsafeWindow.ajaxFriendUrl.replace("http://steamcommunity.com/actions/AddFriendAjax/","");
      old = true;
    }
   else
      var sid = unsafeWindow.g_rgProfileData['steamid'];
   
   if (!GM_getValue('Steamcommunity.com_show_links')) {  
      var s64 = siteList($(ul),sid,false,'whiteLink');
      $(div).append($(ul)); 
      $(div).append('<ul style="list-style-type:none;padding-left:5px"><li>'+sid+'</li><li>'+s64+'</li></ul>');
      var tmp = document.createElement('span');
      $(tmp).addClass('whiteLink');
      $(tmp).css({'float':'right','padding-right':'5px'});
      $(tmp).text('View Links');
      
      if (!old) {
         $($('.profile_summary_footer').children()[0]).css({'display':'none'});
      }
      $(tmp).click(function(e) { 
         $(div).fadeToggle('slow');
         if ($(div).is(':hidden'))
            $(tmp).text('View Links');
         else
            $(tmp).text('Hide Links');
         $(div).click(function(e) { e.stopPropagation(); });
         $('body').click(function(e) { $('#TF2Profiler_linkList').fadeOut('slow'); });
         e.stopPropagation();
      });
   }
   if (old) { // Why doesn't jquery work here?  Why? - I know why now.  @require and chrome.  Look at this kugs
      if (!GM_getValue('Steamcommunity.com_show_links')) {
         $(tmp).attr("onClick","var div = this.nextSibling;console.log(div.style.display); "
            +"if (div.style.display=='none' || !div.style.display){"
            +"$(this).innerText='View Links';div.style.display='block';} else {$(this).innerText='Hide Links';"
            +"div.style.display='none';}");
         $(div).css({"right":"450px"});
         $(".mainSectionHeader").append($(tmp));
         $(".mainSectionHeader").append($(div));
      }
      var inGame = $("#statusInGameText");
      if (inGame && !GM_getValue("Steamcommunity.com_show_server")) {
         if ($(inGame).text().match("Team Fortress 2")) {
            var link = $($(inGame).children()[1]).attr('href').replace("steam://connect/","");
            $('#statusInGameText').append(" <a id=TF2Profiler_gameMonitorToggle"
                                     +" style='color:#ebebeb !important; padding-bottom: 10px'>View Server Info</a>");
            $('#OnlineStatus').after(
               "<div id=TF2Profiler_gameMonitor style='display:none;padding-top:10px;z-index:1000000'><iframe src="
               +"http://module.game-monitor.com/"+link+"/website.php?s=compatible.css&f=1 frameborder=0 "
               +"scrolling=no height=240 width=200></iframe></div>");
            $('#TF2Profiler_gameMonitorToggle').click( function(e) { 
               $('#TF2Profiler_gameMonitor').slideToggle('slow'); e. stopPropagation(); });
         }
      }

   } else {
      if (!GM_getValue('Steamcommunity.com_show_summary')) {
   	   $('.profile_summary_footer').append($(tmp));
   	   $('.profile_summary_footer').append($(div));

         if (!$(".profile_summary").text().match("No information given.") || $(".profile_summary").find("a")) {
            var ps = $(".profile_summary").clone(true);
            $(".profile_leftcol").prepend($(ps));
            $(ps).css({"padding":"10px",'margin-bottom':'20px'});
            $(ps).before("<div class='profile_leftcol_header'><h2>Summary</h2></div>");
         }
         // The hide event gets triggered before the show in gm (not in tampermonkey).  Shrug.  This'll do.
         window.setInterval(function(){$('.profile_summary_footer').css({'display':'block'});},100);
      }
      var inGame = $('.profile_in_game_name');
      if (inGame && !GM_getValue("Steamcommunity.com_show_server")) {
         if ($(inGame).text().match("Team Fortress 2")) {
            var link = $($(inGame).next()).attr('href').replace("steam://connect/","");
            $($(inGame).parent()).append(" <a id=TF2Profiler_gameMonitorToggle"
               +" style='color:#ebebeb !important'>View Server Info</a>"
               +"<div id=TF2Profiler_gameMonitor style='display:none;padding-top:10px;'><iframe src="
               +"http://module.game-monitor.com/"+link+"/website.php?s=compatible.css&f=1 frameborder=0 "
               +"scrolling=no height=240 width=200></iframe></div>");
            $('#TF2Profiler_gameMonitorToggle').click( function() { $('#TF2Profiler_gameMonitor').slideToggle('slow') });
         }
      }
   }       
},
},
{// Groups
match: function( url )
{
	return url.match(/^https?\:\/\/steamcommunity\.com\/groups\//);
},
script: function( site, url )
{
    $(".grouppage_header_label").append(" - <a href=http://www.kugrian.co.uk/tf2profiler/index.php?search="+url
       +" target=_blank>Search on TF2Profiler</a>");        
},
},
//----------------------------------------------------------------
// UGC League
//----------------------------------------------------------------
{
match: function( url )
{
	return url.match("http://www.ugcleague.com/players_page.cfm?");
},
script: function( site, url )
{
   var sid = $('small').find('i').html();

   var ul = document.createElement('ul');
   $(ul).css({'list-style-type':'none'});
	delete(sites["UGC"]);       
	siteList($(ul),sid,false,false);
   $($('small')[0]).parent().next().html(ul);
},
},
//----------------------------------------------------------------
// Wireplay
//----------------------------------------------------------------
{
match: function( url )
{
	return url.match("http://tf2.wireplay.co.uk");
},
script: function( site, url )
{
   if (url.match('pg=search') && !GM_getValue("Wireplay_search_fix")) {
      if ($($('input[name="searchterm"]')[0]).attr('value').match("STEAM_")) {
         var link = "";
         var searchType = '6v6';
         if (url.match('9v9')) {
         } else {
            link = "9v9/";
            searchType = '9v9';
         }
         link = 'http://tf2.wireplay.co.uk/'+link+'index.php?pg=search';
            	
         var a = document.createElement('a');
         var form = document.createElement('form');
         $(form).attr({'action':link,'method':'post'});
         var input = document.createElement('input');
         $(input).attr({'type':'hidden','name':'searchterm','value':$($('input[name="searchterm"]')[0]).attr('value')});
         $(form).append($(input));
         var input = document.createElement('input');
         $(input).attr({'type':'hidden','name':'steamid','value':'true','checked':'true'});
         $(form).append($(input));
         $(a).click(function () { $(form).submit(); });
         $(a).css({'cursor':'pointer'});
         //if ($($("#contentColumn").find('tbody').children()[2]).text().match('No players found'))

         $(a).html("<p>Search for this steamid in the "+searchType+" section</p>");
         $(a).attr("href",'#');
         $("#contentColumn").find('table').after($(a));
      }
	} else
   if (url.match('pg=profile&action=viewprofile') && !GM_getValue("Wireplay_show_links")) {
      var ul = document.createElement('ul');
       $(ul).css({'list-style-type':'none','padding':'0px','margin':'0px'});
      var tmp = $('.newsbody').children().children();
      var sid = $($(tmp[tmp.length-1]).find('a')[1]).attr('href');
      sid = sid.replace("steam://friends/add/",""); 
	  delete(sites["Wireplay"]);
      console.log(sid);
	  siteList($(ul),sid,false,false);
	  var trl = document.createElement('tr');
	  $(trl).html("<td valign=top><b>Other Sites</b></td><td valign=top class=newsLBlock></td>");
      $(trl).find('.newsLBlock').append($(ul));
      $($('#tabnav').next().find('tbody')[0]).append($(trl));
   }
},
},
//----------------------------------------------------------------
// Homepage - Safe place for options
//----------------------------------------------------------------
{
match: function( url )
{
	return url.match(/https?\:\/\/userscripts.org\/scripts\/show\/169861/);
},
script: function( site )
{
   var a = document.createElement('a');
   
   $(a).text("Userscript Options");
   $(a).attr('href','#TF2ProfilerOptions');
   $(a).css({'padding-left':'15px'});
   $(a).click( function (e) {
      if (!TF2Profiler_options)
         TF2Profiler_createOptions();
      else 
         $(TF2Profiler_options).fadeToggle('slow');
      $("body").click(function() { $('#TF2Profiler_options').fadeOut('slow'); });
      $(TF2Profiler_options).click(function(e) { e.stopPropagation(); });
      e.stopPropagation();
   });
   $($('#content').find('.script_summary')[0]).after($(a));
},
},


];

// Look up a match and dispatch
var found = 0;
for ( var i = 0; i<websites.length; ++i )
{
	var site = websites[i];
	if ( site.match( currentURL ) )
	{
		site.script( site, currentURL );
		++found;
	}
}
if ( !found ) console.log('No matches for '+currentURL);

/*
var a = document.createElement('a');

$(a).text("Userscript Options");
$(a).css({'position':'absolute','right':'0px','top':'30px','color':'green'});
$(a).click( function () {
TF2Profiler_options = document.getElementById("TF2Profiler_options");
if (!TF2Profiler_options)
   TF2Profiler_createOptions();
else
	$(TF2Profiler_options).toggle();
});

$('body').append($(a));
*/
