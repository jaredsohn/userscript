// ==UserScript==

// @name           FWZ: Johnalds Domfag Script for Domfags

// @namespace      BRAINFREAZE IS FULL OF OLD PEOPLE

// @description    Making an easy game easier

// @include        http://*.forumwarz.com/*

// @include        http://forumwarz.com/*

// ==/UserScript==



oc = function (a){

	var o = {};

	for(var i=0;i<a.length;i++){o[a[i]]='';}

	return o;

}



hash_len = function(obj) {

    var size = 0, key;

    for (key in obj) {

        if (obj.hasOwnProperty(key)) size++;

    }

    return size;

}



var bar = GM_getValue('forums', '');



//injecting Modalbox stylesheet

var link = document.createElement('link');

link.rel = 'stylesheet';

link.type = 'text/css';

link.href = 'http://www.forumwarz.com/stylesheets/modalbox.css';

document.getElementsByTagName("head")[0].appendChild(link);

    

var Element = unsafeWindow['Element'];

var Effect = unsafeWindow['Effect'];

$ = unsafeWindow['window'].$;



var medalz_forums = [];



//OK ADD SOME CODE HERE THAT CHANGES THE SAVED STUFF TO AN ARRAY OR SOMETHING IDK

bar = bar.split(';');

for (i=0; i<bar.length; ++i) {

    x = bar[i].split('||');

    medalz_forums[x[0]] = x[1];

}

delete medalz_forums['']



// add settings div

var oSettingsDiv = document.createElement('div');

oSettingsDiv.id = 'HDM_window';

oSettingsDiv.style.zIndex = '999999';

oSettingsDiv.style.position = 'absolute';

oSettingsDiv.style.left = '30%';

oSettingsDiv.style.top = '30%';

oSettingsDiv.style.display = 'none';

document.body.appendChild(oSettingsDiv);



var oConfigLi = document.createElement('tr');

oConfigLi.className = 'odd';



var oConfigLiGD = document.createElement('td');

oConfigLiGD.colSpan = '2';



oConfigLiGD.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input width="100%" type="button" value="Forums to Raid" title=\"Forums to Raid List\" id=\"HURFDURFMEDALZSCRIPT\" style=\"margin:0;text-align:center;\" />';



oConfigLi.appendChild(oConfigLiGD);



if(document.getElementById('character_stats')){

	document.getElementById('character_stats').children[0].children[0].appendChild(oConfigLi);

	document.getElementById('HURFDURFMEDALZSCRIPT').addEventListener('click', showOptions, true);

}



function showOptions() {

    var settingsHTML    = '<div id="MB_frame" style="bottom: 0px">'

                        + '<div id="MB_header"><div id="MB_caption">Forums to Raid List</div>'

                        + '<a id="MB_close" title="Close window" href="#" onClick="ds_closeWindow()"><span>×</span></a></div>'

                        + '<div id="MB_content" style="position: relative;">'

    settingsHTML += '<br /><br /><table style="float: left;"><tr><td>Forums</td><td></td><tr><td><select size="10" id="hurfdurf_forums" style="width:200px">';

    

    for (i in medalz_forums)

		if(i!='')

			settingsHTML += '<option>' + i + '</option>';

    

    settingsHTML += '</select></td><td><br /><br /><br /><input type="button" value="Delete" onClick="ds_deleteForum()" /></td></tr>';

    settingsHTML += '</table>';

    settingsHTML += '<br /><br /><input onclick="ds_closeSettings();" type="button" value="Save" style="width:100%; margin-top: 10px;" />';

	settingsHTML += '<br /><input onclick="ds_startRaid();" type="button" value="Raid!!!" style="width:100%; margin-top: 10px;" />';

	settingsHTML += '<br /><input onclick="ds_clearRaid();" type="button" value="Clear All" style="width:100%; margin-top: 10px;" />';

    settingsHTML += '</div>';

    

    oSettingsDiv.innerHTML = settingsHTML;

    oSettingsDiv.style.display = '';

    Effect.Fade($('MB_window'), {from: 0, to: 100, duration: 5});

}



unsafeWindow.ds_closeWindow = function() {

    oSettingsDiv.style.display = 'none';

    //Effect.Fade($('MB_window'), {from: 100, to: 0, duration: 5});

}



unsafeWindow.ds_deleteForum = function() {

    window.setTimeout(function() {

        existingtabs = document.getElementById('hurfdurf_forums');

		//yeah remove it from the array too

		delete medalz_forums[existingtabs.value];

        existingtabs.remove(existingtabs.selectedIndex);

    }, 0);

}



unsafeWindow.ds_startRaid = function() {

	if(hash_len(medalz_forums)){

		if(confirm("Are you ready to raid?")){

			for(i in medalz_forums){

				location.href = medalz_forums[i];

				break;

			}

		}

	}else{

		alert("You have no Forums to raid!");

	}

    //Effect.Fade($('MB_window'), {from: 100, to: 0, duration: 5});

}

unsafeWindow.ds_clearRaid = function() {

	document.getElementById('hurfdurf_forums').innerHTML = "";

	medalz_forums = [];

	GM_setValue('forums', "");

}



unsafeWindow.ds_closeSettings = function() {

	window.setTimeout(function() {

        foo = '';

		for (i in medalz_forums) {

			foo += i+"||"+medalz_forums[i]+';';

		}

		foo = foo.substr(0, foo.length-1);

		GM_setValue('forums', foo);

    }, 0);

	//Effect.Fade($('settings_div'), {from: 100, to: 0, duration: 1});

    oSettingsDiv.style.display = 'none';

}



//buttons on forums

if(location.pathname == "/bookmarks/by_type/forums" || location.pathname == "/bookmarks/community"){

	forums = document.getElementsByTagName("table")[0].children[0].children;

	for(var i=1;i<forums.length;i++) {

		newElement = document.createElement('input');

		newElement.setAttribute("value", "Add Forum");

		newElement.setAttribute("id", i);

		newElement.setAttribute("type", "button");

		newElement.addEventListener('click', function(){ add_forum_button(this); }, false);

		forums[i].children[2].appendChild(newElement);

	}

	

}



function add_forum_button(e){

	if(document.getElementById('display_num_visits').innerHTML == hash_len(medalz_forums) || document.getElementById('display_num_visits').innerHTML == 0){

		alert("You cannot add more forums than you have visits for.");

		return;

	}

	if(location.pathname == "/bookmarks/community"){

		forum_name = e.parentNode.parentNode.children[0].children[0].children[0].innerHTML.replace(/&amp;/,"and");

		forum_url = e.parentNode.parentNode.children[0].children[0].children[0].href;

	}else{

		forum_name = e.parentNode.parentNode.children[1].children[0].children[0].innerHTML.replace(/&amp;/,"and");

		forum_url = e.parentNode.parentNode.children[1].children[0].children[0].href;

	}

	e.value = "Forum Added!";

	//e.parentNode.innerHTML += "Forum Added!";

	medalz_forums[forum_name] = forum_url;

	//save medalz_forums

	foo = '';

    for (i in medalz_forums) {

        foo += i+"||"+medalz_forums[i]+';';

    }

    foo = foo.substr(0, foo.length-1);

    GM_setValue('forums', foo);

}



//now for the actual code that does something

function forum_pwned(){

	if(!document.getElementById('toolbar_items')){

		for(i in medalz_forums){

			delete medalz_forums[i];

			break;

		}

		foo = '';

		for (i in medalz_forums) {

			foo += i+"||"+medalz_forums[i]+';';

		}

		foo = foo.substr(0, foo.length-1);

		GM_setValue('forums', foo);

		if(hash_len(medalz_forums)==0){

			alert("You have no forums left to pwn");
			location.href = "http://www.forumwarz.com/domination";

			return;

		}

		for(i in medalz_forums){

			location.href = medalz_forums[i];

			break;

		}

	}else{

		alert("This forum isn't pwned yet!");

	}

}

document.getElementById('site_controls').children[0].innerHTML += '<input type="button" href="#" id="NEXT_FORUM_BUTTON" value="NEXT FORUM" />';

document.getElementById('NEXT_FORUM_BUTTON').addEventListener('click', forum_pwned, true);