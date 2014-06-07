// ==UserScript==
// @name           FitocracyQuestExtension
// @namespace      FitocracyQuestExtension
// @description   Add a link to the quest page
// @include        http://www.fitocracy.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var QuestExtension = {
	AddProfileSection: function(){
		var checkForUserProfile = setInterval(function(){
			if ($('#profile-sidebar-achievement-container').length)
			{
				clearInterval(checkForUserProfile);
				$('#profile-sidebar-achievement-container').after("<div id='profile-sidebar-quests'><h3>Quests</h3><img id='LoadingQuests' src='http://static.fitocracy.com/site_media/images/stream_loader.gif' /></div>");
				$.ajax({
					url: "http://www.fitocracy.com/quest_stream_menu/",
					success: function(response){
						$("#LoadingQuests").replaceWith(response);				
					},
					dataType: "html"
				});							
			}
		}, 200);
	},
	StyleGetQuestPage: function(){
		
		var link = window.document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = 'http://static.fitocracy.com/site_media/css/style.css?version=32';
		document.getElementsByTagName("HEAD")[0].appendChild(link);

		GM_addStyle((<><![CDATA[		   
		   .quest_wrapper{ margin:auto; width: 50%; }
		]]></>).toString());
		
		$(".quest_wrapper").wrap("<div class='box_960 clearfix' />");
		$(".box_960").wrap("<div id='wrapper' />").before(QuestExtension.RetardedHeaderString);
		$("#wrapper").after(QuestExtension.RetardedFooterString);
	},
	Init: function(){
		if (window.location.href.indexOf("/profile/") > 0)
		{
			QuestExtension.AddProfileSection();
		}
		else if (window.location.href.indexOf("/get_quest/") > 0)
		{
			QuestExtension.StyleGetQuestPage();
		}
	},
	RetardedHeaderString: (<><![CDATA[<div id="top_header_bg">      <div id="top_header"><a href="http://www.fitocracy.com/" id="logo"><img alt="Fitocracy Logo" title="Oh hai!" src="http://static.fitocracy.com/site_media/images/beta_logo.png">        </a>        <ul id="user-menu"><li>    <a href="#"><img height="24" width="24" alt="User Miniature Image" title="You're lookin' mighty fine today!" src="http://www.picslap.com/sites/default/files/field/image/lift.jpg">      </a>  <div style="display:none;" id="global_notifications">    <div class="notifications_triangle"></div>    <div id="global_notifications_inner">       <button id="" class="sexybutton sexysimple sexysmall sexysilver fr clear_notifications" type="submit">Clear All</button>      <h3>Notifications</h3>      <div>        <ul id="get_notifications">        <div style="display:none;" class="ajax_load"><img src="http://static.fitocracy.com/site_media/images/ajax-loader.gif"></div>        </ul>      </div>    </div>  </div></li><li>  <a href="/profile/">SexxxyMuscles420</a></li><li><a href="/invite/">Invite Friends</a></li><li><a href="/become_a_hero/">Become A Hero</a></li><li><a href="/general_settings/">Settings</a></li><li><a href="/accounts/logout/">Sign Out</a></li>        </ul>      </div>    </div>	<div id="sub_header_bg">    <!--============Header Wrapper============-->      <div id="sub_header">        <ul id="mainnav"><li id="home"><a href="/home/">Home</a></li><li id="profile"><a href="/profile/">Profile</a></li><li id="play"><a href="/play/">Play</a></li><li id="nav_ldrbrd"><a href="/leaderboard/">Leaderboard</a></li>		  <li id="groups"><a href="/group_home/">Groups</a></li><li id="forum"><a href="/forum/">Forum</a></li>        </ul>        <form method="GET" action="/username_search/" id="nav_search"><input name="username_search" id="username_search" value="Search by username or tag"><button>Search</button>        </form>      </div>    </div>]]></>).toString(),
	RetardedFooterString: (<><![CDATA[<div id="footer"><div><a href="/">Home</a><a href="/getting_started/">Getting Started</a><a href="/faq/">FAQ</a>      <a href="/become_a_hero/">Become A Hero</a>      <a href="/mobile_info/">Mobile</a>      <a href="/about_us/">About</a>      <a href="http://blog.fitocracy.com">Blog</a>      <a href="/jobs/">Jobs</a>      <a href="/privacy_policy/">Privacy</a>      <a href="/tos/">Terms</a>      <a href="/contact/">Contact</a>      <p>        <small>Copyright (C) 2011 Fitocracy. All Rights Reserved.</small>      </p>    </div>  </div>]]></>).toString()

};

QuestExtension.Init();

