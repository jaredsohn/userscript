// ==UserScript==
// @name           FWZ NOT Orange Navigation Bar
// @namespace      http://userscripts.org/users/livinskull
// @author         livinskull
// @version        v1.01
// @description    Adds customizable navigation bar like fwz orange
// @include        http://www.forumwarz.com/*
// @include        http://forumwarz.com/*
// @exclude        http://www.forumwarz.com/forums/battle/*
// ==/UserScript==

// predefinded tabs
var aLinks = new Array(
    //standard tabs
    ['Character', '/characters/me', 'other'],
    ['Bookmarks', '/bookmarks', 'other'],
    ['sTalk', '#', 'other'],
    ['Multiplayer', '/multiplayer', 'other'],
    ['Klans', '/klans', 'other'],
    ['FlameBate', '/discussions', 'other'],    
    ['Wiki', '/spoilers', 'other'],    
    ['Support Us!', '/buy_stuff', 'other'],    
    ['forums', '/bookmarks/by_type/forums', 'other'],
    ['community forums', '/bookmarks/community', 'other'],
    ['IDC', '/idc', 'other'],
    ['Bruce Bear','/services/bruce', 'service'],
    ['Crazy Careers', '/job_board', 'service'],
    ['Kyoubai', '/auctions', 'service'],
    ['Sentrillion', '/services/sentrillion', 'service'],
    ['TubMail', '/inbox/mail', 'service'],
    ['SpendFriend', '/spendfriend', 'service'],
    ['A&A Computer Services', '/stores/superior_acquisition', 'store'],
    ['AllOfWarez.ru', '/stores/allofwarez', 'store'],
    ['Dr Jojos Storeroom', '/stores/dr_jojos', 'store'],
    ['Drugs R Fun', '/stores/drugs_fun', 'store'],
    ['Drugs R Fun Under The Counter', '/stores/under_counter', 'store'],
    ['Herbal Assault', '/stores/gods', 'store'],
    ['itembuildr consumers co-op', '/stores/item_buildr', 'store'],
    ['plum computers', '/stores/plum', 'store'],
    ['TallJungleBitch', '/stores/junglebitch', 'store'],
    ['The Ppwn Shoppe', '/stores/ppwn', 'store'],
    ['von Neumanns', '/stores/von_vm', 'store'],
    // troll
    ['Under The Bridge', '/stores/under_bridge', 'store'],
    ['Illegalities', '/stores/illegalities', 'store'],
    ['Aunt Jomamas Authentic Voodo Emporium', '/stores/jomama', 'store'],
    ['The Electric Fence', '/stores/fence', 'store'],
    // emo kid
    ['Infections ink', '/stores/infections', 'store'],
    ['The Puncture Juncture', '/stores/puncture', 'store'],
    // camwhore
    ['Stunglasses', '/stores/stunglasses', 'store'],
    ['Female Dominance', '/stores/dominance', 'store'],
    ['Spex Offender', '/stores/spex', 'store'],
    ['The Camels Toe', '/stores/camel_toe', 'store'],
    // multiplayer
    ['itembuildr', '/item_buildr', 'multiplayer'],
    ['INCIT', '/incit', 'multiplayer'],
    ['Domination', '/domination', 'multiplayer'],
    ['forumbuildr', '/forum_buildr', 'multiplayer'],
    ['leaderboard', '/leaderboard/top_rankings', 'multiplayer'],
    ['my ranking', '/leaderboard', 'multiplayer'],
    ['Vanilla Helper', '/domination/vanilla', 'multiplayer']
    );

//injecting Modalbox stylesheet
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://www.forumwarz.com/stylesheets/modalbox.css';
document.getElementsByTagName("head")[0].appendChild(link);
    
var Element = unsafeWindow['Element'];
var Effect = unsafeWindow['Effect'];
$ = unsafeWindow['window'].$;

var aAllTabs = new Array();
var oTabs = document.getElementById('header_tabs');

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}

function Tab(link, title, color, indent) {
    this.sLink = link;
    this.sTitle = title;
    this.sColor = color;
    this.bIndent = indent;
    
    this.getLi = function() {
        var newli = document.createElement('li');
    
        if (this.bIndent)
            newli.className = 'indent';
        if (this.sTitle == 'sTalk')
            newli.innerHTML = '<a href=\"' + this.sLink + '\" onClick="open_stalk(); return false;"' + 'class=\"' + ('not_current' + (this.sColor != ''?' ' + this.sColor:'')) + '\"><span class=\'inner\'>' + this.sTitle + '</span></a></li>';
        else
            newli.innerHTML = '<a href=\"' + this.sLink + '\"' + 'class=\"' + (document.location.href.indexOf(this.sLink) == document.location.href.length-this.sLink.length?'current':('not_current' + (this.sColor != ''?' ' + this.sColor:''))) + '\"><span class=\'inner\'>' + this.sTitle + '</span></a></li>';
            
        return newli;
    }
}

// add settings div
var oSettingsDiv = document.createElement('div');
oSettingsDiv.id = 'MB_window';
oSettingsDiv.style.zIndex = '999999';
oSettingsDiv.style.position = 'absolute';
oSettingsDiv.style.left = '30%';
oSettingsDiv.style.top = '30%';
oSettingsDiv.style.display = 'none';
document.body.appendChild(oSettingsDiv);

// get Tabs from config
var bar = GM_getValue('tabs', '');
if (bar == '') {
    //create default tabs
    bar = 'Character||/characters/me||||0;'
        + 'Bookmarks||/bookmarks||||0;'
        + 'sTalk||#||||0;'
        + 'Multiplayer||/multiplayer||blue||1;'
        + 'Klans||/klans||blue||0;'
        + 'Flamebate||/discussions||red||1;'
        + 'Wiki||/spoilers||red||0;'
        + 'Support Us!||/buy_stuff||yellow||1';
}

bar = bar.split(';');
for (i=0; i<bar.length; ++i) {
    x = bar[i].split('||');
    aAllTabs.push(new Tab(x[1], x[0], x[2], x[3]=='1'?true:false));
}

// remove standard tabs
while (oTabs.hasChildNodes()) {
    while (oTabs.childNodes.length >= 1)
        oTabs.removeChild(oTabs.firstChild);
}
    
for (i=0; i<aAllTabs.length; ++i)
    oTabs.appendChild(aAllTabs[i].getLi());

var oConfigLi = document.createElement('li');
oConfigLi.className = 'indent';
oConfigLi.innerHTML = '<a href=\"#\" title=\"Configure Tabs\" id=\"FWZNONAV\" class=\"current\"><span class=\"inner\">+</span></a>';

oTabs.appendChild(oConfigLi);
document.getElementById('FWZNONAV').addEventListener('click', showOptions, true);

function showOptions() {
    var settingsHTML    = '<div id="MB_frame" style="bottom: 0px">'
                        + '<div id="MB_header"><div id="MB_caption">FWZ No Orange Navigation Settings</div>'
                        + '<a id="MB_close" title="Close window" href="#" onClick="closeWindow()"><span>×</span></a></div>'
                        + '<div id="MB_content" style="position: relative;">'
                        + 'Add new tab: <select id="newtab_select" onChange="selectChanged()">';
    
    for (i=0; i<aLinks.length; ++i)
        settingsHTML += '<option>' + aLinks[i][0] + '</option>';
    
    settingsHTML += '</select><br /><br />title: <input type="text" id="newtab_title" />';
    settingsHTML += '&nbsp;link: <input type="text" id="newtab_link" />';
    settingsHTML += '&nbsp;color: <select id="newtab_color">';
    settingsHTML += '<option value="">brown</option>';
    settingsHTML += '<option value="red">red</option>';
    settingsHTML += '<option value="yellow">yellow</option>';
    settingsHTML += '<option value="blue">blue</option>';
    settingsHTML += '<option value="black">black</option></select>';
    settingsHTML += '&nbsp;indent: <input type="checkbox" id="newtab_indent" >';
    settingsHTML += '<input type="button" value="Add" onClick="addTab()" /><br />';
    
    settingsHTML += '<br /><br /><table style="float: left;"><tr><td>Existing Tabs</td><td></td><tr><td><select size="10" id="existing_tabs" onChange="existingSelectChanged()" style="width:200px">';
    
    for (i=0; i<aAllTabs.length; ++i)
        settingsHTML += '<option>' + aAllTabs[i].sTitle + '</option>';
    
    settingsHTML += '</select></td><td><br /><br /><br /><input type="button" value="&nbsp;&nbsp;up&nbsp;&nbsp;" onClick="moveUp()" /><br /><br /><input type="button" value="down" onClick="moveDown()" /></td><td>'
                  + 'title: <input type="text" id="existingtab_title" /><br /><br />'
                  + 'link: <input type="text" id="existingtab_link" /><br /><br />'
                  + 'color: <select id="existingtab_color">'
                  + '<option value="">brown</option>'
                  + '<option value="red">red</option>'
                  + '<option value="yellow">yellow</option>'
                  + '<option value="blue">blue</option>'
                  + '<option value="black">black</option></select><br /><br />'
                  + 'indent: <input type="checkbox" id="existingtab_indent" ><br /><br />'
                  + '<input type="button" value="Edit" onClick="editTab()" />&nbsp;<input type="button" value="Delete" onClick="deleteTab()" /></td></tr>';
    settingsHTML += '</table>';
    
    settingsHTML += '<div style="float: right;"><img src="http://livinskull.ath.cx/files/other/livinskull_ava.jpg" /><br /></div>';
    
    settingsHTML += '<br /><br /><input onclick="closeSettings();" type="button" value="Save" style="width:100%; margin-top: 10px;" />';
    
    settingsHTML += '</div>';
    
    oSettingsDiv.innerHTML = settingsHTML;
    oSettingsDiv.style.display = '';
    Effect.Fade($('MB_window'), {from: 0, to: 100, duration: 5});
    
}

unsafeWindow['document'].closeSettings = function() {
	window.setTimeout(function() {
        orderedtabs = new Array();
        existingtabs = document.getElementById('existing_tabs').options;
        for (i=0; i<existingtabs.length; ++i) {
            for (j=0; j<aAllTabs.length; ++j) {
                if (aAllTabs[j].sTitle == existingtabs[i].text) {
                    orderedtabs.push(aAllTabs[j]);
                    break;
                }
            }
        }
    
        aAllTabs = orderedtabs;
    
		// save settings
        foo = '';
        for (i=0; i<aAllTabs.length; ++i) {
            foo += aAllTabs[i].sTitle + '||' + aAllTabs[i].sLink + '||' + aAllTabs[i].sColor + '||' + (aAllTabs[i].bIndent?'1':'0');
            foo += ';';
        }
        foo = foo.substr(0, foo.length-1);
        
        GM_setValue('tabs', foo);
    }, 0);
	
	//Effect.Fade($('settings_div'), {from: 100, to: 0, duration: 1});
    oSettingsDiv.style.display = 'none';
}

unsafeWindow['document'].closeWindow = function() {
    oSettingsDiv.style.display = 'none';
    //Effect.Fade($('MB_window'), {from: 100, to: 0, duration: 5});
}

unsafeWindow['document'].moveUp = function() {
    existingtabs = document.getElementById('existing_tabs');
    
    if (existingtabs.selectedIndex > 0) {
        // move in realtime
        alltabsindex = 0;
        for (i=0; i<aAllTabs.length; ++i) {
            if (aAllTabs[i].sTitle == existingtabs.options[existingtabs.selectedIndex].text) {
                alltabsindex = i;
                break;
            }
        }
        
        spans = oTabs.getElementsByTagName('span');
        for (i=0; i<spans.length; ++i) {
            if (spans[i].innerHTML == existingtabs.options[existingtabs.selectedIndex-1].text) {
                oTabs.insertBefore(aAllTabs[alltabsindex].getLi(), spans[i].parentNode.parentNode);
                oTabs.removeChild(spans[i+2].parentNode.parentNode);       
                break;
            }
        }       
    
        // move in selectbox
        foo = existingtabs.options[existingtabs.selectedIndex-1].text;
        existingtabs.options[existingtabs.selectedIndex-1].text = existingtabs.options[existingtabs.selectedIndex].text;
        existingtabs.options[existingtabs.selectedIndex].text = foo;
        existingtabs.selectedIndex--;       
    }
    
}

unsafeWindow['document'].moveDown = function() {
    existingtabs = document.getElementById('existing_tabs');
    
    
    if (existingtabs.selectedIndex < existingtabs.length-1) {
        // move in realtime
        alltabsindex = 0;
        for (i=0; i<aAllTabs.length; ++i) {
            if (aAllTabs[i].sTitle == existingtabs.options[existingtabs.selectedIndex].text) {
                alltabsindex = i;
                break;
            }
        }
        
        spans = oTabs.getElementsByTagName('span');
        // check if only one element on the right side
        if (existingtabs.selectedIndex == existingtabs.length-2) {
            for (i=0; i<spans.length; ++i) {
                if (spans[i].innerHTML == existingtabs.options[existingtabs.selectedIndex].text) {
                    oTabs.removeChild(spans[i].parentNode.parentNode);       
                    break;
                }
            }  
            oTabs.insertBefore(aAllTabs[alltabsindex].getLi(), document.getElementById('FWZNONAV').parentNode);
        } else {
            for (i=0; i<spans.length; ++i) {
                if (spans[i].innerHTML == existingtabs.options[existingtabs.selectedIndex+2].text) {
                    oTabs.insertBefore(aAllTabs[alltabsindex].getLi(), spans[i].parentNode.parentNode);
                    oTabs.removeChild(spans[i-2].parentNode.parentNode);       
                    break;
                }
            } 
        }               
    
        // move in selectbox
        foo = existingtabs.options[existingtabs.selectedIndex+1].text;
        existingtabs.options[existingtabs.selectedIndex+1].text = existingtabs.options[existingtabs.selectedIndex].text;
        existingtabs.options[existingtabs.selectedIndex].text = foo;
        existingtabs.selectedIndex++;
    }
}

unsafeWindow['document'].addTab = function() {
    window.setTimeout(function() {
        aAllTabs.push(new Tab(document.getElementById('newtab_link').value,
                            document.getElementById('newtab_title').value,
                            document.getElementById('newtab_color').value,
                            document.getElementById('newtab_indent').checked
                            ));
        oTabs.insertBefore(aAllTabs[aAllTabs.length - 1].getLi(), document.getElementById('FWZNONAV').parentNode);
        
        document.getElementById('existing_tabs').innerHTML += '<option>' + document.getElementById('newtab_title').value + '</option>';
    }, 0);
}

unsafeWindow['document'].editTab = function() {
    window.setTimeout(function() {
    
        // update internal list
        alltabsindex = 0;
        for (i=0; i<aAllTabs.length; ++i) {
            if (aAllTabs[i].sTitle == document.getElementById('existing_tabs').value) {
                aAllTabs[i].sTitle = document.getElementById('existingtab_title').value;
                aAllTabs[i].sLink = document.getElementById('existingtab_link').value;
                aAllTabs[i].sColor = document.getElementById('existingtab_color').value;
                aAllTabs[i].bIndent = document.getElementById('existingtab_indent').checked;
                alltabsindex = i;
                break;
            }
        }
        
        // update shown tabs
        spans = oTabs.getElementsByTagName('span');
        for (i=0; i<spans.length; ++i) {
            if (spans[i].innerHTML == document.getElementById('existing_tabs').value) {
                oTabs.insertBefore(aAllTabs[alltabsindex].getLi(), spans[i].parentNode.parentNode);
                oTabs.removeChild(spans[i+1].parentNode.parentNode);       
                break;
            }
        }
        
        //  update existing_tabs list
        existingtabs = document.getElementById('existing_tabs');
        existingtabs.options[existingtabs.selectedIndex].text = aAllTabs[alltabsindex].sTitle;
        
    }, 0);
}
unsafeWindow['document'].deleteTab = function() {
    window.setTimeout(function() {
        for (i=0; i<aAllTabs.length; ++i) {
            if (aAllTabs[i].sTitle == document.getElementById('existingtab_title').value) {
                aAllTabs.remove(i);
                break;
            }
        }
        
        // update shown tabs
        spans = oTabs.getElementsByTagName('span');
        for (i=0; i<spans.length; ++i) {
            if (spans[i].innerHTML == document.getElementById('existingtab_title').value) {
                oTabs.removeChild(spans[i].parentNode.parentNode);
                break;
            }
        }
    
        // remove from existing_tabs list
        existingtabs = document.getElementById('existing_tabs');
        existingtabs.remove(existingtabs.selectedIndex);
        
        // clear inputs
        document.getElementById('existingtab_title').value = '';
        document.getElementById('existingtab_link').value = '';
        document.getElementById('existingtab_color').selectedIndex = 0;
        document.getElementById('existingtab_indent').checked = false;
    
    }, 0);
}

unsafeWindow['document'].selectChanged = function() {
    window.setTimeout(function() {
        var name = document.getElementById('newtab_select').value;
    
        for (i=0; i<aLinks.length; ++i) {
            if (name == aLinks[i][0]) {
                document.getElementById('newtab_title').value = name;
                document.getElementById('newtab_link').value = aLinks[i][1];
                break;
            }
        }
    }, 0);
}

unsafeWindow['document'].existingSelectChanged = function() {
    window.setTimeout(function() {
        var name = document.getElementById('existing_tabs').value;
    
        for (i=0; i<aAllTabs.length; ++i) {
            if (name == aAllTabs[i].sTitle) {
                document.getElementById('existingtab_title').value = aAllTabs[i].sTitle;
                document.getElementById('existingtab_link').value = aAllTabs[i].sLink;
                options = document.getElementById('existingtab_color').options;
                document.getElementById('existingtab_color').options[0].selected = true;
                for (j=0; j<options.length; ++j) {
                    if (aAllTabs[i].sColor == options[j].text)
                        document.getElementById('existingtab_color').options[j].selected = true;
                }
                document.getElementById('existingtab_indent').checked = aAllTabs[i].bIndent;
                    
            }
        }
    }, 0);
}
