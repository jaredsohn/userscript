// ==UserScript==
// @name           Moving ST plays
// @namespace      GLB Move ST Plays
// @include        http://test.goallineblitz.com/game/team_create_specialteam.pl?team_id=*
// ==/UserScript==

window.setTimeout( function(){

get_ownership()
get_teams()
add_title()

function playbook_exporter(team_id, permission)
{
//alert("team# " + team_id + " |page type:" + off_def_st() + " |permission=" + permission)
  if(permission == off_def_st() || permission == 3){
	var button = document.createElement("img")
	button.setAttribute("id",team_id)
	button.setAttribute("class","team_planner")
	button.setAttribute("height", "75")
	button.setAttribute("width", "75")
	button.setAttribute("style", "opacity:0.3;margin: 5px 5px 5px 5px")
	button.setAttribute("src","http://goallineblitz.com/game/team_pic.pl?team_id=" + team_id)
	button.addEventListener('click',function (e) {export_playbook(team_id)},false)
	
   var node_list = document.getElementsByTagName('input')
   for (var i = 0; i < node_list.length; i++) {
   var node = node_list[i];
   if (node.getAttribute('value') == 'Save') {
	//node.parentNode.setAttribute("class","content_container ai_input")
	node.parentNode.insertBefore(button, node)
   }
   }
  }
  
};


function export_playbook(num)
{	
   var deselect = getElementsByClassName('team_planner',document)
   
   for (var i = 0; i < deselect.length; i++) {
   	var des = deselect[i];
   	des.setAttribute("style", "opacity:0.3;margin: 5px 5px 5px 5px")
   	des.setAttribute("height", "75")
   	des.setAttribute("width", "75")
   }
	   
   var team_icon = document.getElementById(num)
   team_icon.setAttribute("style", "opacity:1.0;margin: 5px 5px 5px 5px; border: thick solid #FF1212")
   team_icon.setAttribute("width", "85")
   team_icon.setAttribute("height", "85")
   
   var node_list = document.getElementsByTagName('input');
   for (var i = 0; i < node_list.length; i++) {
   	var node = node_list[i]
   	if (node.getAttribute('name') == 'team_id') {
   		node.value = num
   		}
   }
   
   //export_update()
};


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
	var els = par.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
	return a;
};

function get_teams(){
GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://goallineblitz.com/game/user_gm.pl',
   headers: {
       'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
       'Accept': 'application/atom+xml,application/xml,text/xml',
   },
   onload: function(teams) {
	    var response1=teams.responseText
		var permission
		var n = 1
		var e = 10
		do{
			var team=response1.split('<a href="/game/team.pl?team_id=')
			var team1=team[n].split('">')
			var teamnumber=team1[0]
			
			var perm=response1.split('<td class="priv">')
			var perm1=perm[e].split('</td>')
			var perm2=perm[e+1].split('</td>')
			var planperm1=perm1[0]
			var planperm2=perm2[0]
			
			if (planperm1 == 'X')
			{ var num1 = 1 }
			else { var num1 = 0 }
			
			if (planperm2 == 'X')
			{ var num2 = 2 }
			else { var num2 = 0 }
			
			permission = num1 + num2			
			playbook_exporter(teamnumber, permission)
		e=e+9
		n++
		}while (teamnumber != null)
	} 
	});
};

function get_ownership(){
GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://goallineblitz.com/game/home.pl',
   headers: {
       'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
       'Accept': 'application/atom+xml,application/xml,text/xml',
   },
   onload: function(teams) {
	    var response1=teams.responseText
		var team=response1.split('<div id="teams">')
		var team1=team[1].split('</div><div class="team_league">')
		var teamnumber=team1[0]
		var owner=teamnumber.split('<a href="/game/team.pl?team_id=')
		var owner1=owner[1].split('">')
		var ownernumber=owner1[0]
		playbook_exporter(ownernumber, 3)
	} 
	});
};

function add_title(){
	var title = document.createElement("div")
   title.innerHTML = '<div class="small_head">Playbook Export Tool (Allows You To Transfer Custom Defensive Plays.  Select the icon of the team to send the play to, and hit "Save")<br/><br/></div>'
   var node_list = document.getElementsByTagName('input')
   for (var i = 0; i < node_list.length; i++) {
   var node = node_list[i];
   if (node.getAttribute('name') == 'action') {
	node.parentNode.insertBefore(title, node)
   }
   }
};
},100);