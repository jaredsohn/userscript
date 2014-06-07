// ==UserScript==
// @name           HELLBAN SCRIPT
// @namespace      WHAT THE FUCK IS THIS FOR?
// @description    I'M REDOING THE IDIOT ERASER CAUSE IT DOESN'T WORK FOR SOME REASON
// @include        http://*forumwarz.com/*
// @include        http://forumwarz.com/*
// @exclude        http://www.forumwarz.com/discussions/reply/*
// ==/UserScript==

oc = function (a){
	var o = {};
	for(var i=0;i<a.length;i++){o[a[i]]='';}
	return o;
}
	
var bar = GM_getValue('tards', '');

//injecting Modalbox stylesheet
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://www.forumwarz.com/stylesheets/modalbox.css';
document.getElementsByTagName("head")[0].appendChild(link);
    
var Element = unsafeWindow['Element'];
var Effect = unsafeWindow['Effect'];
$ = unsafeWindow['window'].$;

var fwz_retards = new Array();

bar = bar.split(';');
for (i=0; i<bar.length; ++i) {fwz_retards.push(bar[i]);}

// add settings div
var oSettingsDiv = document.createElement('div');
oSettingsDiv.id = 'MB_window';
oSettingsDiv.style.zIndex = '999999';
oSettingsDiv.style.position = 'absolute';
oSettingsDiv.style.left = '30%';
oSettingsDiv.style.top = '30%';
oSettingsDiv.style.display = 'none';
document.body.appendChild(oSettingsDiv);

var oConfigLi = document.createElement('span');
oConfigLi.className = 'indent';
oConfigLi.innerHTML = '<b><a href=\"#\" title=\"Hellban Settings\" id=\"HELLBANSCRIPT\" style=\"color:white\"><span class=\"inner\">HELLBAN SETTINGS</span></a></b><br />';

document.getElementById('logged_in_status').appendChild(oConfigLi);
document.getElementById('HELLBANSCRIPT').addEventListener('click', showOptions, true);

function showOptions() {
    var settingsHTML    = '<div id="MB_frame" style="bottom: 0px">'
                        + '<div id="MB_header"><div id="MB_caption">Hellban Script Settings</div>'
                        + '<a id="MB_close" title="Close window" href="#" onClick="closeWindow()"><span>×</span></a></div>'
                        + '<div id="MB_content" style="position: relative;">'
    settingsHTML += 'Retard: <input type="text" id="retard_name" />';
    settingsHTML += '<input type="button" value="Add" onClick="addTard()" /><br />';
    settingsHTML += '<br /><br /><table style="float: left;"><tr><td>Hellban List</td><td></td><tr><td><select size="10" id="existing_tards" onChange="existingSelectChanged()" style="width:200px">';
    
    for (i in fwz_retards)
		if(fwz_retards[i]!='')
			settingsHTML += '<option>' + fwz_retards[i] + '</option>';
    
    settingsHTML += '</select></td><td><br /><br /><br /><input type="button" value="Delete" onClick="deleteTard()" /></td></tr>';
    settingsHTML += '</table>';
    settingsHTML += '<br /><br /><input onclick="closeSettings();" type="button" value="Save" style="width:100%; margin-top: 10px;" />';
    settingsHTML += '</div>';
    
    oSettingsDiv.innerHTML = settingsHTML;
    oSettingsDiv.style.display = '';
    Effect.Fade($('MB_window'), {from: 0, to: 100, duration: 5});
}

unsafeWindow.closeWindow = function() {
    oSettingsDiv.style.display = 'none';
    //Effect.Fade($('MB_window'), {from: 100, to: 0, duration: 5});
}

unsafeWindow.addTard = function() {
    window.setTimeout(function() {
        fwz_retards.push(document.getElementById('retard_name').value);        
        document.getElementById('existing_tards').innerHTML += '<option>' + document.getElementById('retard_name').value + '</option>';
		document.getElementById('retard_name').value = '';
    }, 0);
}

unsafeWindow.deleteTard = function() {
    window.setTimeout(function() {
        existingtabs = document.getElementById('existing_tards');
        existingtabs.remove(existingtabs.selectedIndex);
        document.getElementById('retard_name').value = '';
    }, 0);
}

unsafeWindow.closeSettings = function() {
	window.setTimeout(function() {
        orderedtabs = new Array();
        existingtabs = document.getElementById('existing_tards').options;
        for(i in existingtabs) {
            for (j in fwz_retards) {
                if (fwz_retards[j] == existingtabs[i].text) {
                    orderedtabs.push(fwz_retards[j]);
                    break;
                }
            }
        }
        fwz_retards = orderedtabs;
		// save settings
        foo = '';
        for (i=0; i<fwz_retards.length; ++i) {
            foo += fwz_retards[i]+';';
        }
        foo = foo.substr(0, foo.length-1);
        GM_setValue('tards', foo);
    }, 0);
	//Effect.Fade($('settings_div'), {from: 100, to: 0, duration: 1});
    oSettingsDiv.style.display = 'none';
	hide_tards();
}

/*
Oh Jegus Christ Firefox doesn't seem to like nextSibling.
Well it does but it doesn't work very well.
Thanks Stack Overflow I guess.
http://stackoverflow.com/questions/868407/hide-an-elements-next-sibling-with-javascript
*/
function next(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1);
    return elem;                
}

//yeah lets try and redo this without JQuery cause it kinda breaks when I have two of them or something idk
function hide_tards(){
	var h1 = document.getElementsByTagName("h1");
	for(var i=0;i<h1.length;i++) {
		if(h1[i].children[0].innerHTML.replace("-<br>","") in oc(fwz_retards)) {
			next(h1[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode).style.display = "none";
			h1[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
		}else{
			next(h1[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode).style.display = "";
			h1[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "";
		}
	}
}

//ok since Habort can't spell names I thought I'd make it easier by having a "hellban this user" button
var h1 = document.getElementsByTagName("h1");
var funcador = [];
var newElement = [];
var name = [];

function tard_button(e){
	name = e.parentNode.children[0].children[0].children[0].children[0].innerHTML.replace("-<br>","");
	if(!confirm("Are you sure you want to hellban "+name))
		return;
	fwz_retards.push(name);
	foo = '';
    for (i=0; i<fwz_retards.length; ++i) {
        foo += fwz_retards[i]+';';
    }
    foo = foo.substr(0, foo.length-1);
    GM_setValue('tards', foo);
	hide_tards();
}

for(var i=0;i<h1.length;i++) {
	newElement = document.createElement('input');
	newElement.setAttribute("value", "HELLBAN THIS USER");
	newElement.setAttribute("id", i);
	newElement.setAttribute("type", "button");
	newElement.addEventListener('click', function(){ tard_button(this); }, false);
	h1[i].parentNode.parentNode.parentNode.appendChild(newElement);
}


var idiots_erased = 0;

if(document.URL.replace(/.*\//,"") == "discussions"){
	//do rp
	var rp = document.getElementById("rp").children[1].children[0].children[0].children;
	for(var i=1;i<rp.length;i++){
		user_name = rp[i].children[0].children[0].title.replace(/.*?by: /, "");
		if(user_name in oc(fwz_retards)){
			rp[i].style.display = "none";
			idiots_erased++;
		}
	}
	//ok I need some code to get some "decent" rp threads. can't be assed to do this tbh.
	
	//cd too
	var cd = document.getElementById("civil").children[1].children[0].children[0].children;
	for(var i=1;i<cd.length;i++){
		user_name = cd[i].children[0].children[0].title.replace(/.*?by: /, "");
		if(user_name in oc(fwz_retards)){
			cd[i].style.display = "none";
			idiots_erased++;
		}
	}
	//ok I need some code to get some "decent" cd threads. can't be assed to do this tbh.
}

if(document.URL.replace(/.*\//,"") == "rp"){
	//do rp
	var rp = document.getElementById("rp").children[2].children[0].children;
	for(var i=1;i<rp.length;i++){
		user_name = rp[i].children[1].children[0].title.replace(/.*?by: /, "");
		if(user_name in oc(fwz_retards)){
			rp[i].style.display = "none";
			idiots_erased++;
		}
	}
	//ok I need some code to get some "decent" rp threads. can't be assed to do this tbh.
}

if(document.URL.replace(/.*\//,"") == "civil"){
	//do cd
	var cd = document.getElementById("civil").children[2].children[0].children;
	for(var i=1;i<cd.length;i++){
		user_name = cd[i].children[1].children[0].title.replace(/.*?by: /, "");
		if(user_name in oc(fwz_retards)){
			cd[i].style.display = "none";
			idiots_erased++;
		}
	}
	//ok I need some code to get some "decent" cd threads. can't be assed to do this tbh.
}

hide_tards();