// ==UserScript==

// @name           User Notes

// @namespace      GLB
// @description    Adds a User Note to the user page, player pages and AI Pages.

// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @include        http://goallineblitz.com/game/home.pl?user_id=*
// @include        http://goallineblitz.com/game/team_offense_ai.pl?*
// @include        http://goallineblitz.com/game/team_defense_ai.pl?*
// @include		   http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==



$(document).ready(function(){

var buildobj = function(a){
	var newobj = document.createElement(arguments[0]);
	for (var varval = 1; varval < arguments.length; varval++) {
		newobj.setAttribute(arguments[varval],arguments[varval+1]);
		varval++;
	};
	return newobj;
};

var uid;
var url = window.location.href;
if (url.indexOf('home.pl')>-1) {
    if (url == 'http://goallineblitz.com/game/home.pl') {
        uid= url.substring(url.indexOf('_id=')+4, url.length);
    } else if (url.indexOf('/home.pl?user_id')>-1){
        var ava = document.getElementById("user_avatar");
        var ids = ava.innerHTML.split("?user_id=");
        var id = ids[1].split('" ');
        uid = id[0];
    }else if (url.indexOf('player_id=')>-1) {
    
    }
    
    //create save link
          var saveLink = document.createElement('div');
          saveLink.innerHTML = "<span style='cursor:pointer;'><u>Save User Notes</u></span><div style='clear: both;'>&nbsp;</div>";
          saveLink.addEventListener('click',saveNotes, false);
    
    var container=document.getElementById('my_account')
    
    var userNotes = document.createElement('div');
    
    userNotes.innerHTML = '<div style="clear: both;">&nbsp;</div><div class="medium_head">User Notes</div>'  + 
        '<div id="player_notes" class="content_container">' +
        '<textarea style="width:100%;" rows=5 id="txtNotes"></textarea>'
        '</div>'
    
    userNotes.appendChild(saveLink);
    
    container.parentNode.insertBefore(userNotes, container.nextSibling);
    
    var currentNotes = GM_getValue(uid  + "_notes", null);
    
    if (currentNotes != null) {
        var notesbox = document.getElementById('txtNotes');
        notesbox.value = currentNotes;	
    }
}else if (url.indexOf('player_id=')>-1) {
    var uid= url.substring(url.indexOf('_id=')+4, url.length);
    
    //create save link
    var saveLink = document.createElement('div');
    saveLink.innerHTML = "<span style='cursor:pointer;'><u>Save Player Notes</u></span>";
    saveLink.addEventListener('click',saveNotes, false);
    
    var container=document.getElementById('player_training_tactics')
    if (!container) {
    	container=document.getElementById('career_stats')	;
    }
    
    var plyrNotes = document.createElement('div');
    
    plyrNotes.innerHTML = '<div style="clear: both;">&nbsp;</div><div class="medium_head">Player Notes</div>'  + 
    	'<div id="player_notes" class="content_container">' +
    	'<textarea style="width:100%;" rows=5 id="txtNotes"></textarea>'
    	'</div>'
    
    plyrNotes.appendChild(saveLink);
    
    container.parentNode.insertBefore(plyrNotes, container.nextSibling);
    
    var currentNotes = GM_getValue(uid  + "_notes", null);
    
    if (currentNotes != null) {
    	var notesbox = document.getElementById('txtNotes');
    	notesbox.value = currentNotes;	
    }
        
} else if (url.indexOf('team_offense_ai.')>-1 || url.indexOf('team_defense_ai.')>-1) {

    //var uid= url.substring(url.indexOf('_id=')+4, url.length);
    
    //create save link
    var saveLink = document.createElement('div');
    saveLink.innerHTML = "<span style='cursor:pointer;'><u>Save AI Notes</u></span><br>";
    saveLink.addEventListener('click',saveAINotes, false);
    var insertpoint = getElementsByClassName('small_head',document);
    insertpoint[0].innerHTML += '<br>';
    insertpoint[0].appendChild(saveLink);
    var aiinputs = getElementsByClassName('input_name', document);
    var aiid = '';
    for (var w=0;w<aiinputs.length;w++) {
        aiid = aiinputs[w].innerHTML.substring(aiinputs[w].innerHTML.indexOf('i_input_name_') + 15,aiinputs[w].innerHTML.indexOf('"',aiinputs[w].innerHTML.indexOf('i_input_name_')+15));
        var textinput = document.createElement('textarea');
        //textinput.setAttribute('type','text');
        textinput.setAttribute('id',aiid);
        textinput.setAttribute('name','ainotes');
        textinput.setAttribute('cols','48');
        textinput.setAttribute('rows','3');
        var cookieval = GM_getValue(aiid + '_notes','');
        textinput.value =cookieval;
        aiinputs[w].innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Notes:';
        aiinputs[w].appendChild(textinput);
    }

    

}else if (url.indexOf('forum_thread.pl')>-1) {

	$('div[id*="post_"]').each(function(q){
		if ($(this).hasClass('post')) {
			
			var userlink = $('a[id*="user_name_"]',$(this)).attr('href');
			var userpostid = userlink.substring(userlink.indexOf('user_id=')+8, userlink.length);
			var usernotes = GM_getValue(userpostid + "_notes",null);
			if (usernotes != null) {
				if ($('.signature',$(this)).length !=1) {
					var newsig = buildobj('div','class','signature');
					$('div[class="post_content"]',$(this)).append(newsig);
				}
				$('.signature',$(this)).html(usernotes);
			}
		}
	})
}

function saveNotes(){
    var notesbox = document.getElementById('txtNotes');
    GM_setValue(uid  + "_notes",notesbox.value);
    alert ("User note saved.");
}

function saveAINotes(){
    var noteboxes = document.getElementsByName('ainotes');
    for (var i=0;i<noteboxes.length;i++) {
        if (noteboxes[i].value != '' && noteboxes[i].value != null) {
            GM_setValue(noteboxes[i].id + '_notes',noteboxes[i].value);
        }
    };
    alert('AI notes saved');
}

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



})
