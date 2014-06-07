// ==UserScript==
// @name           GLB AI and DPC Play Transfer
// @namespace      GLB
// @include        http://goallineblitz.com/game/team_create_defense.pl?team_id=*
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// @include        http://goallineblitz.com/game/team_offense_ai.pl?team_id=*
// ==/UserScript==

window.setTimeout( function(){

add_title()

function playbook_exporter(team_id)
{
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
   if (node.getAttribute('value') == 'Update') {
	//node.parentNode.setAttribute("class","content_container ai_input")
	node.parentNode.insertBefore(button, node)
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
   team_icon.setAttribute("style", "opacity:1.0;margin: 5px 5px 5px 5px;")
   team_icon.setAttribute("width", "75")
   team_icon.setAttribute("height", "75")
   
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

GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://goallineblitz.com/game/home.pl',
   headers: {
       'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
       'Accept': 'application/atom+xml,application/xml,text/xml',
   },
   onload: function(teams) {
	var response1=teams.responseText
	var team=response1.split('/team_finances.pl?team_id=')
	for(var i=0,j=team.length; i<j; i++){
		var test = team[i+1].split('">', 2)
		var test2 = test[0]
		playbook_exporter(test2)
  		}
	} 
});

function add_title(){
	var title = document.createElement("div")
   title.innerHTML = '<div class="small_head">To transfer to another team, select the icon of the team to send the play or AI to, and hit "Save")<br/><br/></div>'
   var node_list = document.getElementsByTagName('input')
   for (var i = 0; i < node_list.length; i++) {
   var node = node_list[i];
   if (node.getAttribute('name') == 'action') {
	node.parentNode.insertBefore(title, node)
   }
   }
};
},100);