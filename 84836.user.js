// ==UserScript==
// @name           TVCatchup Enhancer
// @namespace      http://www.networkg3.com/gmscripts
// @description    Adds various features to TVCatchup's website
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_deleteValue
// @version        0.9.9.1
// @history        0.9.9.1 Updated for the new layout, increased red line to 2 pixels and some small fixes. ------CHROME USERS: please visit homepage or the thread in forums for instruction on how to install this script!!!
// @history        0.9.9 Added reminders, fixed updates(should work on Firefox and Chrome), graphics updated
// @history        0.9.8.4 Image location changed, etc
// @history        0.9.8.3 Image location changed which made the script not work, fixed
// @history        0.9.8.2 Fixed Opera's display bug, where the time was vertical
// @history        0.9.8.1 'Special Even' Bug fix
// @history        0.9.8 Bug fix for Chrome and Opera
// @history        0.9.7 Made it work with the new version of the TVGuide
// @history        0.9.6 Bug fix
// @history        0.9.5 Bug fix
// @history        0.9.4 Added red time line
// @history        0.9.3 Opera support
// @history        0.9.2 Chrome support
// @history        0.9.1 Bug fix
// @history        0.9 Initial release
// @include        http://tvcatchup.com/guide.html*
// @include        http://www.tvcatchup.com/guide.html*
// @include        http://tvcatchup.com/watch.html?c=*
// @include        http://www.tvcatchup.com/watch.html?c=*
// ==/UserScript==

(function (){

const defaultColor = '9CEF4A';
const PREFIX = "NG3_";

var prefs = [];
	prefs['timeLeft'] = {
		"DisplayName" : "Display time left:",
		"name" : "timeLeft",
		"type" : "checkbox",
		"defaultt" : true
	};
	prefs['imdbLink'] = {
		"DisplayName" : "Display IMDB link:",
		"name" : "imdbLink",
		"type" : "checkbox",
		"defaultt" : true
	};
	prefs['textColor'] = {
		"DisplayName" : "Colour of text(hex only):",
		"name" : "textColor",
		"type" : "text",
		"defaultt" : defaultColor,
		"size" : 6
	};
	prefs['redLine'] = {
		"DisplayName" : "Display red time line:",
		"name" : "redLine",
		"type" : "checkbox",
		"defaultt" : true
	};
	prefs['reminder'] = {
		"DisplayName" : "Enable reminders:",
		"name" : "reminder",
		"type" : "checkbox",
		"defaultt" : true
	};


function ev(xpa){
	var snapLink = document.evaluate(xpa, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    return (snapLink.snapshotLength>0)?snapLink:null;
}
function formatTime(time){return(time<10)?'0'+time:time;} // 9 => 09
/*http://blog.stevenlevithan.com/archives/faster-trim-javascript*/
function trim (str) {
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}
function getElementByClass(theClass) {
	var allHTMLTags=document.body.getElementsByTagName('div');
	for (i=0; i<allHTMLTags.length; i++)
		if (allHTMLTags[i].className==theClass)
			return allHTMLTags[i];
}


////console.debug(GM_getValue.toString());
if ((typeof GM_getValue == 'undefined') || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")!==-1) || (GM_getValue('a', 'b') == undefined)) {
    
	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		window.localStorage.setItem(PREFIX+name, value);
	}

	GM_deleteValue = function(name) {
		window.localStorage.removeItem(PREFIX+name);
	}
    
	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(PREFIX+name);
		var charr;
		if(!value){return defaultValue;}else{
			charr = value[0];
			value = value.substring(1);
			switch(charr){
				case 'b':
					value = (value == 'true');
					break;
				default:
					break;
			}
			return value;
		}
	}
    
	GM_addStyle = function(css){
		var pa= document.getElementsByTagName('head')[0] ;
		var el= document.createElement('style');
		el.type= 'text/css';
		el.media= 'screen';
		if(el.styleSheet) el.styleSheet.cssText= css;// IE method
		else el.appendChild(document.createTextNode(css));// others
		pa.appendChild(el);
	}
}
var Prefrences = {
    savePrefs: function(obj){
        var x, child;
        for(x=0;x<obj.children.length;x++){
            child = obj.children[x];
            //console.debug(child);
            if(child.nodeName == 'INPUT'){
                switch(child.type){
                    case 'text':
                        if(GM_getValue(child.id, prefs[child.id].defaultt)!=child.value)
                            GM_setValue(child.id, child.value);
                        break;
                    case 'checkbox':
                        if(GM_getValue(child.id, prefs[child.id].defaultt)!=child.checked)
                            GM_setValue(child.id, child.checked);
                        break;
                    default:
                        break;
                }
            }
        }
        window.location = window.location.href; //reload page
    },
    
    printPrefs: function(def){
        var temp = ' ';
        var realValue, x;
        //if(prefs.length>0){
            for (x in prefs){
                realValue = GM_getValue(prefs[x].name, prefs[x].defaultt);
                temp += '<label for="'+prefs[x].name+'">'+prefs[x].DisplayName+'</label><input id="'+prefs[x].name+'" type="'+prefs[x].type+'"';
                switch(prefs[x].type){
                    case 'text':
                        temp += ' value="'+realValue.replace(/&/g, "").replace(/>/g, "").replace(/</g, "").replace(/"/g, "")+'" maxlength="'+ prefs[x].size +'" size="'+ prefs[x].size +'" /><br />';
                        break;
                    case 'checkbox':
                        realValue = (realValue===true) ? 'checked="checked" ' : '';
                        temp += ' value="'+prefs[x].name+'" '+realValue+'/><br />';
                        break;
                    default:
                        temp += ' />';
                        break;
                }
            }
        //}
        return temp;
    },
    
    openPrefs: function(){
        if(!(document.getElementById(PREFIX+'o_container'))){
            var myDiv = document.createElement('div');
            myDiv.id = PREFIX+'o_container';
            myDiv.className = 'nround_border nborder_box';
            myDiv.innerHTML = '<div class="nround_border ncontainer"><div class="nround_border title">TVCatchup Script Preferences</div>\
                               <div class="content"><b>Script homepage:</b> <a href="http://userscripts.org/scripts/show/' + Updater.id + '">http://userscripts.org/scripts/show/' + Updater.id + '</a><br/>'+Prefrences.printPrefs()+'\
                               <div class="buttons"><a class="button_important '+PREFIX+'pointer" id="savePrefs">Save</a> <a class="'+PREFIX+'pointer" id="closePrefs">Close</a></div></div></div>';
            document.body.appendChild(myDiv);
            
            document.getElementById('savePrefs').addEventListener("click", function (){Prefrences.savePrefs(this.parentNode.parentNode)}, false);
            document.getElementById('closePrefs').addEventListener("click", function (){Prefrences.closePrefs(this.parentNode.parentNode)}, false);
        }else{
            Prefrences.closePrefs();
        }
    },

    closePrefs: function(){
        var chldDiv = document.getElementById(PREFIX+'o_container');
        document.body.removeChild(chldDiv);
    }
};

var Updater = {
    id: 84836,
    curVersion: '0.9.9.1',
    lastUpdate: parseInt(GM_getValue('intLastUpdate', '1310000000')),
    updateEveryHours: 72,
    d: new Date(),
    checkForUpdate: function () {
        //console.debug('Last update since: %d', (Updater.d.getTime() / 1000 - Updater.lastUpdate));
        if ((Updater.d.getTime() / 1000 - Updater.lastUpdate) > (60 * 60 * Updater.updateEveryHours)) {
            //we need to update
            //console.debug('We are going to update.');
            Updater.Update();
        }
    },
    Update: function () {
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://userscripts.org/scripts/source/" + Updater.id + ".meta.js",
            headers: {
                /*"User-agent": "Mozilla/5.0",*/
                "Accept": "text/html"
            },
            onload: function (response) {
                //console.debug('Response(%s): %d', Updater.id, response.status);
                if (response.status == 200 && !response.reponseText)
                    Updater.parseUpdateResponse(response.responseText);
            }
        });
    },
    parseUpdateResponse: function (response) {
        var history = response.match(/\@history\s+([\d.-]+\s+.*)/gi);
        var version = response.match(/\@version\s+([\d.-]+)/i);
        version = version[1];
        history = history.join("<br>\n");
        history = history.replace(/\@history\s+/gi, '');
        //console.debug('Version: %s', version);
        //console.debug('History: %s', history);


        Updater.lastUpdate = Updater.d.getTime() / 1000;
        GM_setValue('intLastUpdate', Updater.lastUpdate.toString());
        //console.debug(Updater.lastUpdate);
        if (Updater.curVersion != version)
            Updater.displayUpdateBox(version, history);
    },
    displayUpdateBox: function (cvers, history) {
        var div = document.createElement('div');
        div.id = PREFIX+'u_container';
        div.className = 'nround_border nborder_box';
        div.innerHTML = '<div class="nround_border ncontainer"><div class="nround_border title">TVCatchup Enhancer is outdated</div>\
                         <div class="content">\
                             <p>A new version of TVCatchup Enhancer has been released. <br/> Please update the script. <br/>\
                             <b>Script homepage:</b> <a target="_blank" href="http://userscripts.org/scripts/show/' + Updater.id + '">http://userscripts.org/scripts/show/' + Updater.id + '</a></p>\
                             <p><b>New version: </b> <span class="gray">' + cvers + '</span></p>\
                             <p><b>Your current version: </b> <span class="gray">'+Updater.curVersion+'</span></p>\
                             <p><b>Version History:</b><br><span class="gray">\
                                 ' + history + '\
                             </span></p>\
                         <div class="buttons"><a class="button_important '+PREFIX+'pointer" id="'+PREFIX+'u_update">Update</a> <a class="'+PREFIX+'pointer" id="'+PREFIX+'u_dismiss">Dismiss</a></div></div> </div>';

        document.body.appendChild(div);
        document.getElementById(PREFIX+'u_update').addEventListener("click", function () { document.body.removeChild(document.getElementById(PREFIX+'u_container')); window.location = "http://userscripts.org/scripts/source/" + Updater.id + ".user.js"; }, false);
        document.getElementById(PREFIX+'u_dismiss').addEventListener("click", function () { document.body.removeChild(document.getElementById(PREFIX+'u_container')); }, false);
        //document.body.innerHTML += '<div id="'+PREFIX+'boxPrefs">Test</div>';
        //console.debug('Displaying update box.');
    }
};

var bTimeLeft = GM_getValue('timeLeft', prefs['timeLeft'].defaultt);
var bImdbLink = GM_getValue('imdbLink', prefs['imdbLink'].defaultt);
var bRedLine = GM_getValue('redLine', prefs['redLine'].defaultt);
var strTextColor = GM_getValue('textColor', prefs['textColor'].defaultt);
var bReminder = GM_getValue('reminder', prefs['reminder'].defaultt);
//var jsonReminder = JSON.parse(GM_getValue('strReminder', '{"Reminders":[]}'));
////console.debug(JSON.stringify(jsonReminder));
//console.debug(bImdbLink);
var d = new Date();
var curTime = d.getTime();
var strLoc = document.location.href.toString();


GM_addStyle('.nround_border{-moz-border-radius:6px;-webkit-border-radius:6px;-khtml-border-radius:6px;border-radius:6px;}\
.nborder_box{text-align:left;color:#444;left:50%;top:10px;position:fixed;width:450px;height:auto;min-height:100px;margin-left:-200px;background:rgba(255,255,255,0.1);z-index:9999;font-family: "Helvetica Neue",Arial,Helvetica,Geneva,sans-serif;font-size:14px;-moz-background-clip:padding;-webkit-background-clip:padding;background-clip:padding-box;border:4px solid rgba(255,255,255,0.1);}\
.ncontainer{background:#1f1f1f;width:450px;height:auto;}\
.ncontainer .title{font-size:15px;text-align:center;min-height:30px;width:100%;padding:6px 0 2px 0;font-weight:bold;text-shadow:1px 1px 0px #000;color:#fff;background:url(http://i.imgur.com/HhtzI.png) repeat-x;}\
.ncontainer .content{width:422px;min-height:100px;overflow:auto;padding:10px;color:#fff;line-height:1.5;}\
.ncontainer .content a{color:#84f125; text-decoration:none;}\
.ncontainer .content p{margin-bottom:10px;}\
.ncontainer .content b{font-weight:bold;}\
.ncontainer .buttons{width:100%; height:100%; text-align:right;}\
.ncontainer .buttons a{text-decoration:none; color:#fff; padding:10px;}\
.ncontainer .buttons a:hover{color:#ccc;}\
.ncontainer .button_important{background:#d6481f url(http://i.imgur.com/HhtzI.png) repeat-x; padding:6px 15px 6px 15px !important;}\
.ncontainer .gray{color:#b7b7b7;}\
.ncontainer input[type=\'checkbox\']{float:right;}\
.ncontainer input[type=\'text\']{float:right;}\
.ncontainer label{margin-top:10px;}\
\
.'+PREFIX+'custlink{color:#'+strTextColor+';}\
.'+PREFIX+'custlink a{color:#'+strTextColor+';}\
.'+PREFIX+'custlink a:hover{color:#fff;}\
.'+PREFIX+'reminder{color:#5c5c5c;}\
.'+PREFIX+'reminder_active{color:#de696f;}\
.'+PREFIX+'pointer{cursor:pointer;}\
.'+PREFIX+'pointer:hover{color:#fff;}\
.'+PREFIX+'reminder_close{cursor:pointer; float:right; margin:4px 5px 5px 0; width:10px; height:11px; \
                    background-image: url(http://i.imgur.com/r3A2O.png);}\
.'+PREFIX+'reminder_container{width:100%; height:100%; background-color:#ed3b19; color:#fff; padding:5px 0 5px 0; \
                        text-shadow: 1px 1px 0px #832817; border-top:4px solid #000; font-style:italic; text-align:center;}\
.'+PREFIX+'reminder_container a{color:#ffffa6;}\
.'+PREFIX+'reminder_container a:hover{color:#fff;}');


 var Reminder = {
    jsonReminder: JSON.parse(GM_getValue('strReminder', '{"Reminders":[]}')),
    REMINDER_BACK: 'http://i.imgur.com/qiFTI.png',

    addReminderLink: function(ob){
        if(ob.children[1].textContent.length > 0){
            var timeStart = parseInt(ob.children[4].textContent);
            if(timeStart>curTime/1000){ //check if the show already has aired
                var channelId = ob.children[3].textContent;

                divTemp = document.createElement('div');
                divTemp.innerHTML += '[R]';
                divTemp.addEventListener("click", Reminder.remind, false);
                ob.appendChild(divTemp);

                var posReminders = Reminder.inReminders(channelId, timeStart);
                if(posReminders!==false)
                    Reminder.styleSelected(ob);
                else
                    Reminder.styleNormal(ob);
            }
        }
    },
    remind: function(){
        var ob = this.parentNode;
        var channelName;
        if(ob.className == 'line') channelName = ob.parentNode.parentNode.parentNode.children[0].children[0].title;
        else channelName = ob.parentNode.parentNode.children[0].children[0].title;
        var timeStart = parseInt(ob.children[4].textContent);
        var show = ob.children[0].textContent;
        var channelId = ob.children[3].textContent;

        var posReminders = Reminder.inReminders(channelId, timeStart);

        if(posReminders !== false){
            //reminder already exists, so we delete it?
            //console.debug('%d: %s, %s', posReminders, channelName, timeStart);

            Reminder.styleNormal(ob);

            remndr.removeReminderAtPos(posReminders);
            //console.debug(JSON.stringify(Reminder.jsonReminder));
        }else{
            //console.debug('%s, %s, %s, %s', channelName, channelId, show, timeStart);

            Reminder.styleSelected(ob);

            Reminder.jsonReminder.Reminders.push({"time" : timeStart, "show" : show, "channelName" : channelName,
                "channelId" : channelId});
            Reminder.saveReminders();
            //console.debug(JSON.stringify(Reminder.jsonReminder));
        }

    },
    styleNormal: function(ob) {
        Reminder.setReminderBack(ob, 'background:none;');
        ob.children[6].setAttribute('class', 'subtitle '+PREFIX+'reminder '+PREFIX+'pointer');
    },
    styleSelected: function(ob) {
        Reminder.setReminderBack(ob, 'background:url('+Reminder.REMINDER_BACK+') repeat-x;');
        ob.children[6].setAttribute('class', 'subtitle '+PREFIX+'reminder_active '+PREFIX+'pointer');
    },
    removeStartedReminders: function(){
        for (var i = Reminder.jsonReminder.Reminders.length-1; i >= 0; i--) {
            //console.debug('%s, %s, %s', (parseInt(Reminder.jsonReminder.Reminders[i].time) < curTime/1000),Reminder.jsonReminder.Reminders[i].time,curTime/1000);
            if(Reminder.jsonReminder.Reminders[i].time < curTime/1000)
                remndr.removeReminderAtPos(i);
        }
        Reminder.saveReminders();
    },
    inReminders: function(channelId, timeStart){
        for (var i = 0; i < Reminder.jsonReminder.Reminders.length; i++) {
            ////console.debug('%s, %s', channelName, (jsonReminder.Reminders[i].time == timeStart && jsonReminder.Reminders[i].channelName == channelName));
            if(Reminder.jsonReminder.Reminders[i].time == timeStart && Reminder.jsonReminder.Reminders[i].channelId == channelId)
                return i;
        }
        return false;
    },
    setReminderBack: function(ob, css){
        if(ob.className == 'line'){
            ob.parentNode.style.cssText += css;
        }else{
            ob.style.cssText += css;
        }
    },
    scheduleReminder: function(){
        for (var i = remndr.jsonReminder.Reminders.length-1; i >= 0; i--){
            //console.debug(i)
            var tout = parseInt((remndr.jsonReminder.Reminders[i].time-(curTime/1000))*1000-60000);
            if(tout>0){
                //console.debug('Setting timeout for %s (watch.html?c=%s) at %d', remndr.jsonReminder.Reminders[i].show,
                //                                                                remndr.jsonReminder.Reminders[i].channelId, tout);

                //window.setTimeout(function(j){showReminder(jsonReminder.Reminders[j]);}(i), 1000+i*100);
                window.setTimeout(remndr.showReminder, tout, remndr.jsonReminder.Reminders[i]);
            }else{
                if(strLoc.indexOf('watch.html?c='+remndr.jsonReminder.Reminders[i].channelId)===-1){
                    //console.debug('<=0 so, showing reminder, %d', tout);
                    remndr.showReminder(remndr.jsonReminder.Reminders[i]);
                }else{
                    remndr.removeReminderAtPos(i);;
                }
            }
        }
    },
    showReminder: function(ob){
        if(strLoc.indexOf('watch.html?c='+ob.channelId)===-1){
            var quality = strLoc.match(/_lq|_hq/g);
            var ihtml = 'Reminder: <a href="/watch.html?c='+ob.channelId+((quality)?quality:'')+'">'+ob.show+' on '+ob.channelName+
                        ((((ob.time-(curTime/1000))*1000)<0) ?
                            ' has already started.' :
                            ' is starting in one minute.')+
                        ' &rarr;</a>';

            var reminderDiv = document.createElement('div');
            reminderDiv.innerHTML = ihtml;
            reminderDiv.className = PREFIX+'reminder_container';

            var closeLink = document.createElement('a');
            closeLink.className = PREFIX+'reminder_close';
            closeLink.addEventListener("click", function (){ reminderDiv.style.display = 'none'; }, false);
            reminderDiv.appendChild(closeLink);

            var container = document.getElementById('InSkinContainer_myInSkin1');
            container.parentNode.insertBefore(reminderDiv, container);
        }

        for (var i = 0; i < Reminder.jsonReminder.Reminders.length; i++) {
            if(Reminder.jsonReminder.Reminders[i].time == ob.time && Reminder.jsonReminder.Reminders[i].channelId == ob.channelId){
                //console.debug('Removing element at: '+i);
                Reminder.removeReminderAtPos(i);
                return;
            }
        }
    },
    removeReminderAtPos: function(i){
        Reminder.jsonReminder.Reminders.splice(i,1);
        Reminder.saveReminders();
    },
    saveReminders: function(){
        GM_setValue('strReminder', JSON.stringify(Reminder.jsonReminder));
    },
    getReminders: function(){
        return JSON.stringify(Reminder.jsonReminder);
    }
 };

var remndr = Reminder;

if(strLoc.indexOf('guide.html')!==-1){

	//if it's opera, we fix the display bug - don't really need it anymore for the current opera version, will leave it incase it still messes up for users with older versions
	if(window.opera) {
		var f = getElementByClass('filters');
		var parentdiv = f.parentNode;
		parentdiv.removeChild(f);
		document.getElementById('filters').appendChild(f);
	}else{
        //ugh can't do the update in opera
        //check for update after everything is done loading
        Updater.checkForUpdate();
    }

    function calcWidth(){//for the timeline
        var timeStart = trim(document.getElementById('timeline').children[1].textContent);

        var timeStartS = timeStart.split(":");
        var newDate = new Date();
        newDate.setHours(parseInt(timeStartS[0], 10),parseInt(timeStartS[1], 10),0,0);
        if(newDate.getHours>d.getHours()) newDate.setDate(newDate.getDate-1);

        var timeBetween = new Date(d.getTime()-newDate.getTime());
        var totalmin = (timeBetween.getHours()*60) + timeBetween.getMinutes();

        if(totalmin<250){return (totalmin*4)+65;}
        else{return 0;}
    }


    var snapPanels, z, timeLeft, timeEnd, hours, minutes, shtml, temp, title, divTemp;

    function formatProgramme(ob){
        divTemp = document.createElement('div');
        divTemp.setAttribute('class', 'subtitle '+PREFIX+'custlink');

        if(bTimeLeft){
            timeEnd = ob.children[5].textContent;
            timeLeft = (timeEnd*1000)-(curTime);
            if(timeLeft>0){
                timeLeft = new Date(timeLeft);
                hours = formatTime(timeLeft.getHours());
                minutes = formatTime(timeLeft.getMinutes());
            }else{
                hours = "00";
                minutes = "00";
            }
            divTemp.innerHTML += '[' + hours + ':' + minutes + '] ';
        }
        if(bImdbLink){
            title = encodeURIComponent(trim(ob.children[0].textContent));
            divTemp.innerHTML += '[<a href="http://www.imdb.com/find?s=all&q=' + title + '" target="_blank">IMDB</a>]';
        }
        ob.appendChild(divTemp);
    }


    if(bTimeLeft || bImdbLink || bReminder){
        if(bReminder) snapPanels = ev("//div[contains(@class,'programme') and not(@class='programmes')]");
        else snapPanels = ev("//div[contains (@style,'images/themes/grey/guide_row_now.png')]");
        //console.debug(remndr.getReminders());
        remndr.removeStartedReminders();
        //console.debug(remndr.getReminders());
        //console.debug(snapPanels);
        if(snapPanels!=null){
            for (z = 0; z < snapPanels.snapshotLength; z++) {
                shtml = snapPanels.snapshotItem(z);
                sback = shtml;
                if(shtml.children.length == 1) shtml = shtml.children[0];
                if(shtml.children.length == 1) shtml = shtml.children[0];

                if(shtml.children.length >= 5){
                    if(sback.style.backgroundImage.indexOf('guide_row_now.png') != -1){
                        //on right now
                        formatProgramme(shtml);
                    }else{
                        if(bReminder) remndr.addReminderLink(shtml);
                    }
                }
            }
        }
    }

    if(bRedLine){
        GM_addStyle('#'+PREFIX+'redline{position:absolute; width:1px; border-right:2px solid #FF1F1F; left:'+calcWidth()+'px; top:0; bottom:0;}');
        var divRedLine = document.createElement('div');
        divRedLine.id = PREFIX+'redline';
        divRedLine.innerHTML = ' ';
		document.getElementById('programmes').style.position = 'relative';
        document.getElementById('programmes').appendChild(divRedLine);
    }


}else if(strLoc.indexOf('watch.html')!==-1 && bReminder){
    remndr.scheduleReminder();
}

var prefsLink = document.getElementById('user');
if(prefsLink != null){
	var divPrefsLink = document.createElement('li');
	divPrefsLink.id = 'openPrefs';
	divPrefsLink.innerHTML = ' | TVCE Options';

	prefsLink.firstChild.appendChild(divPrefsLink);
	divPrefsLink.addEventListener("click", function (){ Prefrences.openPrefs(); }, false);
}
})();