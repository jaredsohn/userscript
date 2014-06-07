// ==UserScript==
// @name		Poke Application for Twitter
// @version		1.0.3
// @description		Adds Poke Link to Twitter
// @include		http://twitter.com/*
// @include		https://twitter.com/*
// @include		http://www.twitter.com/*
// @include		https://www.twitter.com/*
// ==/UserScript==


// Stylesheet First

newStyle = document.createElement("link");
newStyle.rel = "stylesheet";
newStyle.href = "http://twitter.koneko-chan.net/superpoke/static/twitter.css";
document.getElementsByTagName("head")[0].appendChild(newStyle);
newStyle = null;

// Poke Icons

window.twitterPokeApp = function()
{
	if(document.body.id == "profile")
	{
		var sn = document.getElementsByClassName("profile-user")[0].getElementsByClassName("screen-name")[0].innerHTML;
		var statuses = document.getElementById("timeline").getElementsByClassName("status");
		for(var i in statuses)
		{
			if(statuses[i].getElementsByClassName && !statuses[i].getElementsByClassName("konekochan-poke").length)
			{
				var tempsn = sn;
				if(statuses[i].getElementsByClassName("big-retweet-icon").length)
					{ tempsn = statuses[i].getElementsByClassName("screen-name")[0].innerHTML; }
				var id = statuses[i].id.split("_")[1];
				var text = "Poke";
				if(statuses[i].getElementsByClassName("entry-meta")[0].innerHTML.split("☞")[1])
					{ text = "Retaliate"; }
				var hover = statuses[i].getElementsByClassName("actions-hover")[0];
				hover.innerHTML = '<li><span class="poke-link konekochan-poke"><span class="poke-icon icon" onclick="document.location=\'http://twitter.koneko-chan.net/superpoke/poke.php?rsn='+tempsn+'&amp;reply='+id+'\'"></span><a href="http://twitter.koneko-chan.net/superpoke/poke.php?rsn=' + tempsn + '&amp;reply=' + id + '">'+text+'</a></span></li>' + hover.innerHTML;
			}
		}
		if(document.getElementsByClassName("user")[0].getElementsByClassName("user-actions")[0].getElementsByClassName("action-menu")[0].getElementsByClassName("round").length && !document.getElementsByClassName("user")[0].getElementsByClassName("user-actions")[0].getElementsByClassName("action-menu")[0].getElementsByClassName("round")[0].getElementsByClassName("poke-user").length)
		{
			var ele = document.getElementsByClassName("user")[0].getElementsByClassName("user-actions")[0].getElementsByClassName("action-menu")[0].getElementsByClassName("round")[0];
			var newLI = document.createElement("li");
			newLI.setAttribute("class","poke-user");
			newLI.innerHTML = '<a href="http://twitter.koneko-chan.net/superpoke/poke.php?rsn=' + sn + '"><i></i>Poke <span>' + sn + '</span></a>';
			newLI.onclick = function() { document.location = "http://twitter.koneko-chan.net/superpoke/poke.php?rsn=" + sn; }
			ele.appendChild(newLI);
		}
	} else if(document.body.id != "show") {
		var statuses = document.getElementsByClassName("actions-hover");
		var users = document.getElementsByClassName("tweet-url screen-name");
		var ids = document.getElementsByClassName("status");
		for ( var i in statuses )
		{
			if(statuses[i].getElementsByClassName && !statuses[i].getElementsByClassName("konekochan-poke").length && document.body.id != "profile")
			{
				if(ids[i].getElementsByClassName("status").length && document.body.id == "show")
					{ ids[i] = ids[i].getElementsByClassName("status")[0]; }
				var user = users[i].innerHTML;
				var text = "Poke";
				if(ids[i].getElementsByClassName("entry-meta")[0].innerHTML.split("☞")[1])
					{ text = "Retaliate"; }
				statuses[i].innerHTML = '<li><span class="poke-link konekochan-poke"><span class="poke-icon icon" onclick="document.location=\'http://twitter.koneko-chan.net/superpoke/poke.php?rsn='+user+'&amp;reply='+ids[i].id.split("_")[1]+'\'"></span><a href="http://twitter.koneko-chan.net/superpoke/poke.php?rsn=' + user + '&amp;reply=' + ids[i].id.split("_")[1] + '">'+text+'</a></span></li>' + statuses[i].innerHTML;
			}
		}
	}
	/*
	if(document.getElementsByClassName("action-menu").length)
	{
		for(var i in document.getElementsByClassName("action-menu"))
		{
			if(document.getElementsByClassName("action-menu")[i].getElementsByClassName("round").length && !document.getElementsByClassName("action-menu")[i].getElementsByClassName("poke-user").length)
			{
				var ele = document.getElementsByClassName("action-menu")[i].getElementsByClassName("round")[0];
				
			}
		}
	}
	*/
}
window.twitterPokeApp();
window.twitterPokeAppInterval = setInterval(function() { window.twitterPokeApp(); },100);

if(document.body.id == "show")
{
	var holder = document.getElementById("permalink");
	var id = document.getElementById("permalink").getElementsByClassName("status")[0].id.split("_")[1];
	var sn = holder.getElementsByClassName("user-info")[0].getElementsByClassName("tweet-url screen-name")[0].innerHTML;
	var actions = holder.getElementsByClassName("actions-hover")[0];
	var text = "Poke";
	if(holder.getElementsByClassName("entry-meta")[0].innerHTML.split("☞")[1])
		{ text = "Retaliate"; }
	actions.innerHTML = '<li><span class="poke-link konekochan-poke"><span class="poke-icon icon" onclick="document.location=\'http://twitter.koneko-chan.net/superpoke/poke.php?rsn='+sn+'&amp;reply='+id+'\';"></span><a href="http://twitter.koneko-chan.net/superpoke/poke.php?rsn='+sn+'&amp;reply='+id+'">'+text+'</a></span></li>' + actions.innerHTML;
}