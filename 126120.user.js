// ==UserScript==
// @name           Web Of Trust for Bungie.net
// @namespace      dazarobbo
// @description    Determines whether a link in a post may be unsafe
// @version		   0.1
// @include        http*://*bungie.net*posts.aspx*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
"use strict";

Array.Add = function(a, o){
	a.push(o);
}
Array.prototype.Add = function(o){
	Array.Add(this,o);
}

Array.Clear = function(a){
	a.length=0;
}
Array.prototype.Clear = function(){
	Array.Clear(this);
}

Array.Contains = function(a, o){
	var l=a.length;
	for(var i=0;i<l;i++){
		if(a[i]===o){
			return true;
		}
	}
	return false;
}
Array.prototype.Contains = function(o){
	return Array.Contains(this,o);
}

Array.Distinct = function(a){
	var h={};
	var r=[];
	var l=a.length;
    for(var i=0;i<l;++i){
        if(!h.hasOwnProperty(a[i])) {
            h[a[i]]=true;
            r.push(a[i]);
        }
    }
	return r;
}
Array.prototype.Distinct = function(){
	var r=Array.Distinct(this);
	var l=r.length;
	this.Clear();
	for(var i=l-1;i>=0;i--){
		this.Add(r[i]);
	}
}


function GetLinks(safeLinks){
	return $(".postbody > p a").filter(function(i){
		if(safeLinks.indexOf(this.hostname) !== -1){
			this.title = "This link has been deemed SAFE.";
			return false;
		}
		return this.hostname != "" && this.hostname.indexOf(".") !== -1;
	});
}

function SetDefaultMessage(links){
	for(var i=0; i<links.length; i++){
		links[i].title = "This link is UNCHECKED";
	}
}

function GetHosts(links){
	var arr = [];
	for(var i=0; i<links.length; i++) arr.push(links[i].hostname);
	return Array.Distinct(arr);
}

function MakeRequest(hosts, links){
	$.ajax({
		url: "http://api.mywot.com/0.4/public_link_json?hosts=" + hosts.join("/") + "/",
		dataType: "json",
		success: function(json){
			RequestCallback(json, links);
		},
		error: function(){
			RequestCallback(null, links);
		}
	});
}

function ReputationToString(rep){
	if(rep >= 80) return "Excellent";
	else if(rep >= 60) return "Good";
	else if(rep >= 40) return "Unsatisfactory";
	else if(rep >= 20) return "Poor";
	else return "Very Poor";
}

function ConfidenceToString(conf){
	if(conf >= 45) return "Very High";
	else if(conf >= 34) return "High";
	else if(conf >= 23) return "Average";
	else if(conf >= 12) return "Low";
	else if(conf >= 6) return "Very Low";
	else return "None";
}

function DetermineSafety(data){
	for(var i=0; i<=4; i = i === 0 ? 1 : i * 2){
		if(data[i][0] <= 20 && data[i][1] >= 23) return false;
	}
	return true;
}

function GenerateWarnings(data, host){
	
	var obj = {
		IsSafe: null,
		Status: "",
		toString: function(){ return this.Status; }
	}
	
	if(data == undefined || data[0] == undefined){
		obj.Status = "No information exists for this link";
		return obj;
	}
	
	obj.IsSafe = DetermineSafety(data);
	
	obj.Status = "The following information about " + host + " was found.\n\n" +
		"TRUSTWORTHINESS: \t\t" + ReputationToString(data[0][0]) + ", " + ConfidenceToString(data[0][1]).toLowerCase() + " reliability\n" +
		"RELIABILITY: \t\t\t\t" + ReputationToString(data[1][0]) + ", " + ConfidenceToString(data[1][1]).toLowerCase() + " reliability\n" +
		"PRIVACY: \t\t\t\t" + ReputationToString(data[2][0]) + ", " + ConfidenceToString(data[2][1]).toLowerCase() + " reliability\n" +
		"CHILD SAFE: \t\t\t\t" + ReputationToString(data[4][0]) + ", " + ConfidenceToString(data[4][1]).toLowerCase() + " reliability\n\n" +
		"This site may be " + (obj.IsSafe ? "" : "un") + "safe to use.";
	
	return obj;
	
}

function RequestCallback(json, links){
	links.each(function(i, e){
	
		if(json == null) return;
	
		var status = GenerateWarnings(json[e.hostname], e.hostname);
		
		if(status.IsSafe == null){
			this.title = "There is no information regarding the safety of this link";
			return;
		}
		else if(status.IsSafe){
			this.title = "This site may be SAFE to visit";
			return;
		}
		
		var href = this.href;
		this.removeAttribute("href");
		this.style.cursor = "pointer";
		this.title = "This link has been deemed UNSAFE and therefore disabled. Click for more information.";
		
		$(this).click(function(ev){
			
			alert(status);
			
			if(confirm("Do you want to enable this link?")){
				this.href = href;
				this.removeAttribute("title");
			}
			
			ev.preventDefault();
			ev.stopPropagation();
			
		});
	
	});
}


(function(){

	var SafeLinks = [
		"bungie.net",
		"www.bungie.net",
		"admin.bungie.net",
		"seventhcolumn.bungie.net",
		"m.bungie.net",
		"flawless.bungie.net",
		"downloads.bungie.net",
		"playtest.bungie.net",
		"66.62.238.10",
		"bungie.com",
		"www.bungie.com",
		"bungiestore.com",
		"xbox.com",
		"halo.xbox.com",
		"google.com",
		"www.google.com",
		"twitter.com",
		"www.facebook.com",
		"youtube.com",
		"www.youtube.com",
		"wikipedia.org",
		"en.wikipedia.org",
		"www.wikipedia.org"
	];
	var Links = GetLinks(SafeLinks);
	SetDefaultMessage(Links);
	var Hosts = GetHosts(Links);

	if(Hosts.length == 0) return;

	MakeRequest(Hosts, Links);

})();

