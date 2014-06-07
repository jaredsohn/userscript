// ==UserScript==
// @name           BvS BillyCon Enhancer
// @include        http://*animecubed.com/billy/bvs/billycon-schedule.html*
// @include        http://*animecubed.com/billy/bvs/billycon-character.html
// @include        http://*animecubed.com/billy/bvs/billycon.html
// @namespace      North
// @description    Enhances the BillyCon pages
// @version        4.10
// @history        4.10 Fixed issue for parsing xp values.
// @history        4.9 Marked cosplay parts that you have more than two with yellow color
// @history        4.8 Fixed data for Hungry Spirit Exorcising (misspelled Nom)
// @history        4.7 Fixed bug (skill can go up to 199 now)
// @history        4.6 Firefox broke something, I fixed it
// @history        4.5 Hightlighted Hot Cosplays
// @history        4.5 Added tooltip for number of cosplay parts (when more than one)
// @history        4.4 Pet Points doubled during main events
// @history        4.3 Updated rewards (pet points)
// @history        4.2 Highlighted Rave skills
// @history        4.2 Sorting the Full column for Cosplay parts improved (first line is best choice)
// @history        4.1 Fixed packing issue (couldn't pack certain parts)
// @history        4.0 The state of the BillyCon Schedule selection can be saved
// @history        4.0 The character data loaded in the Schedule can be changed
// @history        4.0 Packing page overhauled
// @history        4.0 Cosplay parts displayed in a sortable table (character page)
// @history        4.0 Auto-update works again
// @history        3.13 Firefox 4 compatibility
// @history        3.9 Added toggle button for the skills (default is always hidden)
// @history        3.4 Added Glomped on the Schedule page
// @history        3.3 Low-Cut Kimono and Import Rig bonuses added on the schedule page
// @history        3.1 IO level detection fixes
// @history        3.1 Added new hotkey on the billycon page (press A to see total XP)
// @history        3.1 Low-Cut Kimono/Import Rig bonus added to the BillyCon Page
// @history        3.1 Flow (F) and Strut Stuff (S) hotkeys added on the schedule page
// @history        3.0 Schedule page Enhancements
// @history        2.9 Main Events and Dealer Room can now be toggled
// @history        2.7 Added effects for rewards on the Schedule Page (H for hot keys)
// @history        2.6 Fmproved Schedule tooltip
// @history        2.5 Stuffsed and Front Row are now used for Success Chance
// @history        2.3 Added IO3 toggle and Front Row effect
// @history        2.1 Stats can be changed now on the Schedule Page (Press H for hot keys)
// @history        2.1 Click an event on the Schedule page to select it
// @history        2.0 Success chance based on your skills added to the Schedule page
// @history        1.9 Added hotkeys. Press "H" for more info
// @history        1.8 Skills display enhancements
// @history        1.7 Added Chance to get rewards(base code from Gary)
// @history        1.6 Added Backstage events
// @history        1.5 Sorts skills by level now; added progress bars
// @history        1.3 Changed style for the tooltips
// @history        1.2 Added Auto-Updater
// @history        1.1 Styled the Schedule tables
// @history        1.0 Cross-browser compatible
// @history        0.9 Initial Release
// ==/UserScript==

function Spinner() {
    var min, max;
    var update;
    var stat;

    var getTarget = function (e) {
        e = e || window.event;
        return e.target || e.srcElement;
    };

    var onMouseOver = function (e) {
        var target = getTarget(e);
        if (target.nodeName.toLowerCase() === 'button') {
            target.style.backgroundColor = "#d2eafe";
        }
    };
    var onMouseOut = function (e) {
        var target = getTarget(e);
        if (target.nodeName.toLowerCase() === 'button') {
            target.style.backgroundColor = "#c9d8fc";
        }
    };
    var onMouseDown = function (e) {
        var target = getTarget(e);
        if (target.nodeName.toLowerCase() === 'button') {
            target.style.backgroundColor = "#93acf2";
        }
    };
    var onMouseUp = function (e) {
        var target = getTarget(e);
        if (target.nodeName.toLowerCase() === 'button') {
            target.style.backgroundColor = "#d2eafe";
            var oldValue = parseInt(target.parentNode.firstChild.data, 10);
            var newValue = (target.className === "up" ? 1 : -1) + oldValue;
            if (newValue > max) {
                newValue = max;
            }
            if (newValue < min) {
                newValue = min;
            }
            if (newValue !== oldValue) {
                update(stat, newValue);
                target.parentNode.firstChild.data = newValue;
            }
        }
    };

    return {
        init: function (element, value, minValue, maxValue, updateFunction, statToUpdate) {
            element = element.wrappedJSObject || element;
            update = updateFunction;
            stat = statToUpdate;
            min = minValue;
            max = maxValue;
            element.className = "spinner";
            element.innerHTML = value;
            element.style.backgroundColor = "#f4f5ff";
            element.addEventListener('mouseover', onMouseOver, false);
            element.addEventListener('mouseout', onMouseOut, false);
            element.addEventListener('mousedown', onMouseDown, false);
            element.addEventListener('mouseup', onMouseUp, false);

            var node = document.createElement("button");
            node.type = 'button';
            node.className = "up";
            element.appendChild(node);

            node = document.createElement("button");
            node.type = 'button';
            node.className = "down";
            element.appendChild(node);
        }
    };
}

function TabView() {
    var tabViewDiv;
    var activeTabIndex;

    var addStyle = function (css) {
        var head = document.getElementsByTagName("head")[0];
        if (!head) {
            return;
        }
        var style = document.createElement("style");
        style.type = "text/css";
        style.textContent = css;
        head.appendChild(style);
    };

    var showTab = function (tabIndex) {
        var parentId_div = tabViewDiv.id;

        if (activeTabIndex >= 0) {
            if (activeTabIndex === tabIndex) {
                return;
            }

            document.getElementById(parentId_div + "_tab_" + activeTabIndex).className = 'tabInactive';
            document.getElementById(parentId_div + "_tabView_" + activeTabIndex).style.display = 'none';
        }

        document.getElementById(parentId_div + "_tab_" + tabIndex).className = 'tabActive';
        document.getElementById(parentId_div + "_tabView_" + tabIndex).style.display = 'block';

        activeTabIndex = tabIndex;
    };

    var tabClick = function () {
        var idArray = this.id.split('_');
        showTab(idArray[idArray.length - 1].replace(/[^0-9]/gi, ''));
    };

    var rolloverTab = function () {
        if (this.className.indexOf('tabInactive') >= 0) {
            this.className = 'inactiveTabOver';
        }
    };

    var rolloutTab = function () {
        if (this.className === 'inactiveTabOver') {
            this.className = 'tabInactive';
        }
    };

    var initTabView = function (mainContainerID, tabTitles, activeTab, width, height) {
        tabViewDiv = document.getElementById(mainContainerID);

        width = width ? width + '' : '';
        if (width.indexOf('%') < 0) {
            width = width + 'px';
        }
        tabViewDiv.style.width = width;

        height = height ? height + '' : '';
        if (height.length > 0) {
            if (height.indexOf('%') < 0) {
                height = height + 'px';
            }
            tabViewDiv.style.height = height;
        }

        var tabDiv = document.createElement('DIV');
        tabViewDiv.insertBefore(tabDiv, tabViewDiv.firstChild);
        tabDiv.className = 'tabview_tabPane';

        var i;
        for (i = 0; i < tabTitles.length; i++) {
            var aTab = document.createElement('DIV');
            aTab = aTab.wrappedJSObject || aTab;
            aTab.id = mainContainerID + "_tab_" +  i;
            aTab.onmouseover = rolloverTab;
            aTab.onmouseout = rolloutTab;
            aTab.onclick = tabClick;
            aTab.className = 'tabInactive';
            aTab.innerHTML = tabTitles[i];
            tabDiv.appendChild(aTab);
        }

        var tabs = tabViewDiv.children;
        for (i = 1; i < tabs.length; i++) {
            if (height.length > 0) {
                tabs[i].style.height = height;
            }
            tabs[i].className = "tabview_aTab";
            tabs[i].style.display = 'none';
            tabs[i].id = mainContainerID + "_tabView_" + (i - 1);
        }

        showTab(activeTab);
    };

    return {
        init: function (mainContainerID, tabTitles, activeTab, width, height) {
            addStyle([
                ".tabview_tabPane{height: 24px; border-bottom: 4px solid #2647a0;}",
                ".tabview_aTab{border: 1px solid #808080; border-bottom: 1px solid #243356; padding: 5px; background-color: #f4f5ff}",
                ".tabview_tabPane DIV{float: left; font-size: 12px; cursor: pointer; position: relative; padding-left: 5px; padding-right: 5px; line-height: 22px; border-top-left-radius: 1ex; border-top-right-radius: 1ex; border: 1px solid #a3a3a3; border-bottom-width: 0; bottom: 1px;}",
                ".tabview_tabPane .tabActive{background: #2647a0 url(data:image/gif;base64,R0lGODlhAQAoAMQAAEBr1CtOqyhMpjljyDlhxEBt1jBWtTtlyy5SsEBs1Tdfwj1nzj9q0TNbvEFu10Jv2SZHoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABACgAAAUV4CM6TpEADLMcA6E0jYEEAmTfeI6HADs=) top left repeat-x; border: 1px solid #243356; border-bottom-width: 0; line-height: 24px; color: white;}",
                ".tabview_tabPane .tabInactive{background: #d8d8d8 url(data:image/gif;base64,R0lGODlhAQAoALMAAOzs7fv7++Xm5vb29+/w8Pz8/Pn5+eHi49zd3/T19fr6+vHy8ujq6v7+/v///9jY2iH5BAAAAAAALAAAAAABACgAAAQS0EnXWgnKjLQIYMKBPGRpnmgEADs=) top left repeat-x; margin-top: 2px;}",
                ".tabview_tabPane .inactiveTabOver{background: #bfdaff url(data:image/gif;base64,R0lGODlhAQAoAMQAAObx/+fx/9zs/9Xn/+fy/8ff/+Lu/+Pw/9fo/+Xw/9Hm/8vi/8/j/8Td/9/t/9rp/+Dt/7/a/+jy/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABACgAAAUWoCRKRAAAyWFAjvAgg8IsRRPdeK7jIQA7) top left repeat-x; margin-top: 2px;}"
            ].join("\n"));
            initTabView(mainContainerID, tabTitles, activeTab, width, height);
        }
    };
}

function AutoComplete() {
    var acArray;
    var node;

    var complete = function (e) {
        e = e || window.event;
        if (e.keyCode === 16) {
            return;
        }
        var sVal = node.value.toLowerCase();
        if (e.keyCode === 8) {
            sVal = sVal.substring(0, sVal.length - 1);
        }
        if (sVal.length < 1) {
            return;
        }
        var nI;
        for (nI = 0; nI < acArray.length; nI++) {
            var acOption = acArray[nI];
            var nIdx = acOption.toLowerCase().indexOf(sVal, 0);
            if (nIdx === 0 && acOption.length > sVal.length) {
                node.value = acArray[nI];
                if (node.createTextRange) {
                    var hRange = node.createTextRange();
                    hRange.findText(acArray[nI].substr(sVal.length));
                    hRange.select();
                } else {
                    node.setSelectionRange(sVal.length, acOption.length);
                }
                return;
            }
        }
    };

    return {
        init: function (element, autoCompleteArray) {
            node = element;
            acArray = autoCompleteArray;
            node.addEventListener('keyup', complete, false);
        }
    };
}

function BoxOver() {
    var boxElement;
    var currentElement;
    var hidden = true;

    var initDiv = function () {
        boxElement = document.createElement("div");
        boxElement.appendChild(document.createElement("div"));
        boxElement.appendChild(document.createElement("div"));
        boxElement.style.position = 'absolute';
        boxElement.style.visibility = 'hidden';
        document.body.appendChild(boxElement);
    };

    var positionBoxOver = function (e) {
        var posx = e.pageX + 10;
        var posy = e.pageY + 10;
        if (window.innerWidth < e.clientX + boxElement.offsetWidth + 10) {
            posx -= boxElement.offsetWidth + 10 + e.clientX - window.innerWidth;
        }
        if (window.innerHeight < e.clientY + boxElement.offsetHeight + 10) {
            posy -= boxElement.offsetHeight + 10;
        }
        boxElement.style.left = posx;
        boxElement.style.top = posy;
    };

    var display = function (e) {
        var target = e.target || e.srcElement;
        target = target.wrappedJSObject || target;

        boxElement.firstChild.innerHTML = target.boxOverHeader;
        boxElement.lastChild.innerHTML = target.boxOverBody;
        boxElement.firstChild.setAttribute("class", target.boxOverHeaderCSS);
        boxElement.lastChild.setAttribute("class", target.boxOverBodyCSS);
        positionBoxOver(e);
    };

    function getException(e) {
        e = e || window.event;
        e = e.wrappedJSObject || e;

        return e;
    }
    function getTarget(e) {
        var target = e.target || e.srcElement;
        target = target.wrappedJSObject || target;

        return target;
    }

    var onMouseMove = function (e) {
        e = getException(e);
        var target = getTarget(e);

        if (!hidden && target.boxOver) {
            e.cancelBubble = true;
            positionBoxOver(e);
        }
    };

    var onMouseOver = function (e) {
        e = getException(e);
        var target = getTarget(e);

        if (target.boxOver) {
            e.cancelBubble = true;
            if (hidden) {
                display(e);
                boxElement.style.visibility = 'visible';
                hidden = false;
                currentElement = e.target || e.srcElement;
            }
        }
    };

    var onMouseOut = function (e) {
        e = getException(e);
        var target = getTarget(e);

        if (target.boxOver) {
            e.cancelBubble = true;
            if (!hidden) {
                boxElement.style.visibility = 'hidden';
                hidden = true;
            }
        }
    };

    var addEvents = function (element) {
        element.addEventListener('mouseover', onMouseOver, false);
        element.addEventListener('mouseout', onMouseOut, false);
        element.addEventListener('mousemove', onMouseMove, false);
    };

    return {
        init: function () {
            initDiv();
            return this;
        },

        addToolTip: function (element, header, body, headerCSS, bodyCSS) {
            element = element.wrappedJSObject || element;
            element.boxOver = true;
            element.boxOverHeader = header;
            element.boxOverBody = body;
            element.boxOverHeaderCSS = headerCSS;
            element.boxOverBodyCSS = bodyCSS;
            addEvents(element);
        },

        updateToolTip: function (element, header, body) {
            element.boxOverHeader = header;
            element.boxOverBody = body;
            if (!hidden && element === currentElement) {
                boxElement.firstChild.innerHTML = header;
                boxElement.lastChild.innerHTML = body;
            }
        }
    };
}

function BillyCon() {
    var intentObservation = 3;
    var useFlow = false;
    var strutStuff = false;
    var sunGlasses = false;
    var foamHand = false;
    var niceBoat = false;
    var lowCutKimono = false;
    var importRig = false;
    var frontRow = 0;
    var glomped = 0;
    var boxOver = BoxOver().init();
    var playerName;

    var parsedSkills = false;
    var container, skillsDisabled, nomMessage, descriptions;
    var factorial = [1];
    var skills = [];
    var skillLevel = [];
    var events = {
        //Odd Jobs
        "Work a Booth" : [6, "-4 Nom, -4 Sleep, +2 Stink", "Staring 1+, Staring 2+, Staring 4+, Stink <-2, Sleep 6+", "Stink 3+, Staring <1", "0: -1 Cool / +3 Monies<br/>1: +4 Monies / +20 Staring XP<br/>2: +6 Monies / +30 Staring XP<br/>4+: +8 Monies / +30 Veteran XP / 1 11% Chance for a Manly Apron Award"],

        // Video 1
        "9001" : [5, "-2 Nom, -2 Sleep, +1 Stink", "Stink <4, Cool 4+, Videogaming 2+, Chillaxing 1+, Veteran 1+", "Stink 4+, Cool <1", "0: +10 Flipping Out XP<br/>1: +25 Flipping Out XP<br/>2: +30 Flipping Out XP / +1 Cool<br/>3+: +50 Flipping Out XP / +1 Cool"],
        "Bishounen and Bunny DX" : [5, "-2 Nom, -2 Sleep, +1 Stink", "Stink <1, Cool 1+, Cool 6+, Chillaxing 1+, Knowledge 1+", "Stink 4+, Cool <1", "0: +10 Cosplay XP<br/>1: +25 Cosplay XP<br/>2: +30 Cosplay XP / +1 Cool / +1 Pet Point<br/>3+: +30 Wrangling XP / +1 Cool / +1 Pet Point"],
        "Candy Rage" : [5, "-1 Nom, -1 Sleep", "Stink <4, Stink <-2, Drama 1+, Knowledge 1+, Chillaxing 1+", "Stink 4+, Cool <1", "0: +10 Flipping Out XP<br/>1: +25 Flipping Out XP<br/>2: +30 Flipping Out XP / +1 Cool<br/>3+: +50 Posing XP / +1 Cool"],
        "Detergent" : [5, "-2 Nom, -2 Sleep, +1 Stink", "Stink <4, Nom 5+, Cool 6+, Shopping 1+, Posing 1+", "Stink 4+, Cool <1", "0: +10 Flipping Out XP<br/>1: +25 Chillaxing XP<br/>2: +30 Flipping Out XP / +1 Cool<br/>3+: 30 Combat Sewing XP / +1 Cool"],
        "Emo Suki" : [5, "-2 Nom, -1 Sleep, +1 Stink", "Stink<1, Chillaxing 1+, Knowledge 2+, Chillaxing 1+, Schmoozing 1+", "Stink 4+, Cool <1", "0: +10 Drama XP<br/>1: +25 Drama XP<br/>2: +30 Drama XP / +1 Cool<br/>3+: +50 Drama XP / +1 Cool"],
        "Euchre Angel Susie" : [6, "-1 Nom, -1 Sleep", "Stink <-2, Cool 3+, Antidrama 1+, Macking 2+, Artsiness 1+", "Stink 4+, Cool <1", "0: +10 Cosplay XP<br/>1: +25 Cosplay XP<br/>2: +30 Cosplay XP / +1 Cool<br/>3+: +50 Cosplay XP / +1 Cool"],
        "Game Defeater Yuri" : [6, "-2 Nom, -2 Sleep, +1 Stink", "Stink <2, Cool 4+, Videogaming 1+, Knowledge 1+, Videogaming 2+", "Stink 4+, Cool <1", "0: +10 Videogaming XP<br/>1: +25 Videogaming XP<br/>2: +30 Videogaming XP / +1 Cool<br/>3+: +50 Videogaming XP / +1 Cool"],
        "Grind Warriors" : [7, "-2 Nom, -2 Sleep, +1 Stink", "Cool 1+, Cool 4+, Videogaming 1+, Silence 1+, Chillaxing 1+", "Stink 4+, Cool <1", "0: +1 Cool<br/>1: +2 Cool / +25 Chillaxing XP<br/>2: +30 GeoSense XP / +3 Cool<br/>3+: +50 Knowledge XP / +4 cool"],
        "Hey Baby, I'm a Ninja" : [5, "-2 Nom, -2 Sleep, +1 Stink", "Stink <1, Cool 1+, Macking 1+, Chillaxing 1+, Cosplay 1+", "Stink 4+, Cool <1", "0: +10 Drama XP<br/>1: +25 Macking XP<br/>2: +30 Macking XP / +1 Cool<br/>3+: +50 Posing XP / +1 Cool"],
        "Junk X Blocker!!" : [5, "-1 Nom, -1 Sleep, +1 Stink", "Cool 2+, Silence 1+, Drama 1+, Cosplay 1+, Nom 1+", "Stink 4+, Cool <1", "0: +10 Photography XP<br/>1: +25 Photography XP<br/>2: +30 Photography XP / +1 Cool<br/>3+: +50 Posing XP / +1 Cool"],
        "Kawaii + Kowai" : [5, "-2 Nom, -1 Sleep", "Stink <1, Nom 4+, Cosplay 2+, Chillaxing 1+, Artsiness 1+", "Stink 4+, Cool <1", "0: +10 Macking XP<br/>1: +25 Macking XP<br/>2: +30 Macking XP / +1 Cool<br/>3+: +30 Posing XP / +1 Cool"],
        "Love Hexagon" : [6, "-2 Nom, -2 Sleep, +1 Stink", "Stink <1, Cool 2+, Knowledge 2+, Chillaxing 1+, Silence 1+", "Stink 4+, Cool <1", "0: +10 Drama XP<br/>1: +25 Drama XP<br/>2: +30 Drama XP / +1 Cool<br/>3+: +50 Drama XP / +1 Cool"],
        "Music Video Rejects" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <1, Chillaxing 2+, Sleep 3+, Silence 1+, Knowledge 3+", "Stink 4+, Cool <1", "0: +10 Chillaxing XP<br/>3: +80 Photography XP<br/>4+: +80 Photography XP / +40 Artsiness XP"],
        "Night of the Looper" : [6, "-1 Nom, -1 Sleep", "Stink <1, Cool 3+, Knowledge 1+, Chillaxing 1+, GeoSense 1+", "Stink 4+, Cool <1", "0: +10 Silence XP<br/>1: +25 Chillaxing XP<br/>2: +30 Chillaxing XP / +1 Cool<br/>3+: +50 Antidrama XP / +1 Cool"],
        "Ninja Elementary" : [5, "-2 Nom, -2 Sleep, +1 Stink", "Stink <1, Cool 1+, Cool 4+, Knowledge 1+, Chillaxing 1+", "Stink 4+, Cool <1", "0: +10 Drama XP<br/>1: +25 Dance XP<br/>2: +30 Dance XP / +1 Cool<br/>3+: +30 Macking XP / +1 Cool"],
        "No Such Thing As Boys" : [5, "-2 Nom, -2 Sleep, +1 Stink", "Stink <1, Chillaxing 1+, Knowledge 2+, Chillaxing 1+, Silence 1+", "Stink 4+, Cool <0", "0: +10 Chillaxing XP<br/>1: +25 Chillaxing XP<br/>2: +30 Chillaxing XP / +1 Cool<br/>3+: +50 Chillaxing XP / +1 Cool"],
        "PizzaWatch" : [5, "-2 Nom, -2 Sleep, +1 Stink", "Cool 1+, Cool 4+, Videogaming 1+, Crowdswimming 1+, Knowledge 1+", "Stink 4+, Cool <1", "0: +10 Videogaming XP<br/>1: +25 Videogaming XP<br/>2: +30 Crowdswimming XP / +1 Cool<br/>3+: +50 Crowdswimming XP / +1 Cool"],
        "Pop Idol Werewolf" : [7, "-1 Nom, -1 Sleep", "Stink <2, Cool 2+, Dance 1+, Wrangling 1+, Cosplay 2+", "Stink 4+, Cool <1", "0: +10 Dance XP<br/>1: +25 Dance XP<br/>2: +30 Dance XP / +1 Cool / +1 Pet Point<br/>3+: +50 Schmoozing XP / +1 Pet Point / +2 Cool"],
        "Reaper Cooking Parade" : [7, "-1 Nom, -2 Sleep, +1 Stink", "Stink <1, Cool 1+, Combat Sewing 1+, Drama 1+, Videogaming 1+", "Stink 4+, Cool <1", "0: +10 Artsiness XP<br/>1: +25 Artsiness XP<br/>2: +30 Artsiness XP / +1 Cool<br/>3+: +50 Artsiness XP / +1 Cool"],
        "Speed Rider" : [6, "-1 Nom, -1 Sleep", "Cool 1+, Cool 4+, Videogaming 1+, Crowdswimming 1+, Knowledge 1+", "Stink 4+, Cool <1", "0: +1 Cool<br/>1: +25 Videogaming XP / +2 Cool<br/>2: +30 GeoSense XP / +3 Cool<br/>3+: +50 Videogaming XP / +4 Cool"],
        "Speed Rider XD6" : [5, "-1 Nom, -1 Sleep, +1 Stink", "Cool 3+, Cool 6+, Videogaming 2+, Crowdswimming 1+, Knowledge 2+", "Stink 4+, Cool <1", "0: +1 Cool<br/>1: +1 Cool / +25 Videogaming XP<br/>2: +40 Videogaming XP / +3 Cool<br/>3+: +50 GeoSense XP / +4 Cool"],
        "Spoon of the Twilight" : [7, "-1 Nom, -1 Sleep", "Stink <1, Cool 1+, Combat Sewing 1+, Drama 1+, Videogaming 1+", "Stink 4+, Cool <1", "0: +10 Drama XP<br/>1: +25 Drama XP<br/>2: +30 Drama XP / +1 Cool<br/>3+: +50 Drama XP / +1 Cool"],
        "Tea-Chan, Ganbatte" : [5, "-1 Nom, -1 Sleep", "Stink <1, Videogaming 1+, Drama 1+, Drama 2+, Artsiness 1+", "Stink 4+, Cool <1", "0: +10 Chillaxing XP<br/>1: +25 Chillaxing XP<br/>2: +30 Chillaxing XP / +1 Sleep<br/>3+: +50 Knowledge XP / +2 Sleep"],
        "What?! Panties" : [7, "-1 Nom, -1 Sleep", "Stink <0, Cool 1+, Macking 1+, Chillaxing 1+, Wrangling 1+", "Stink 4+, Cool <1", "0: +10 Photography XP<br/>1: +15 Photography XP<br/>2: +20 Photography XP / +1 Cool<br/>3+: +40 Photography XP / +1 Cool"],
        "Who Wears That to School?" : [5, "-1 Nom, -1 Sleep", "Cool 2+, Photography 1+, Cosplay 1+, Cosplay 2+, Combat Sewing 1+", "Stink 4+, Cool <1", "0: +10 Cosplay XP<br/>1: +25 Cosplay XP<br/>2: +30 Cosplay XP / +1 Cool<br/>3+: +50 Combat Sewing XP / +1 Cool"],
        // All night events
        "Dub This!" : [5, "-1 Nom", "Stink<1, Glowsticking 1+, Knowledge 1+, Glowsticking 2+, Artsiness 1+", "Stink 4+, Cool <1", "0: +10 Chillaxing XP<br/>1: +45 Macking XP<br/>2: +60 Artsiness XP/+1 Cool<br/>3+: +80 Glowsticking XP / +3 Cool"],
        "Overnight Team" : [6, "-1 Nom", "Stink <-2, Cool 3+, Dance 1+, Macking 1+, Cosplay 1+", "Stink 4+, Cool <1", "0: +20 Macking XP<br/>1: +45 Macking XP<br/>2: +60 Macking XP / +2 Cool<br/>3+: +80 Wrangling XP / +4 Cool"],

        // Panels 1
        "11DBHK Meetup" : [5, "-1 Nom", "Stink <-2, Chillaxing 1+, Cool 6+, Knowledge 1+, Veteran 1+", "Stink 4+, Cool <1", "0: +10 Chillaxing XP<br/>1: +20 Chillaxing XP<br/>2: +30 Chillaxing XP<br/>3: +30 Chillaxing XP / +30 Knowledge XP<br/>4+: +30 Chillaxing XP / +50 Knowledge XP / 1 11% Chance for a BillyCon Emblem Award"],
        "Being the Center of Attention" : [5, "-2 Nom, -2 Sleep, +1 Stink", "Stink <-1, Macking 1+, Cool 6+, Posing 1+, Drama 4+", "Stink 4+, Cool <1", "0: +5 Drama XP<br/>1: +10 Drama XP<br/>2: +20 Drama XP / +2 Cool<br/>3: +40 Drama XP / +3 Cool<br/>4+: +40 Posing XP / +4 Cool"],
        "Bingo Practice" : [6, "-1 Nom, -1 Sleep, +1 Stink", "Sleep 5+, Cool 4+, Knowledge 4+, Silence 2+, Cosplay 2+", "Stink 4+, Cool <1", "0: +5 GeoSense XP<br/>1: +10 GeoSense XP<br/>2: +20 GeoSense XP / +2 Cool<br/>3: +30 GeoSense XP / +3 Cool<br/>4+: +40 Glowsticking XP"],
        "Books to Eat" : [5, "-1 Nom, -1 Sleep, +2 Stink", "Stink <1, Sleep 3+, Nom 5+, Shopping 1+, Knowledge 2+", "Stink 4+, Cool <1", "0: +10 Knowledge XP<br/>1: +20 Knowledge XP<br/>2: +30 Knowledge XP<br/>3: +40 Knowledge XP / +3 Nom<br/>4+: +40 Knowledge XP / +5 Nom"],
        "Books to Read" : [6, "-2 Nom, -2 Sleep, +2 Stink", "Stink <1, Sleep 5+, Nom 2+, Silence 1+, Knowledge 2+", "Stink 4+, Cool <1", "0: +10 Knowledge XP<br/>1: +20 Knowledge XP<br/>2: +30 Knowledge XP<br/>3: +40 Knowledge XP / +20 Artsiness XP<br/>4+: +40 Knowledge XP / +40 Artsiness XP"],
        "Button Mashing" : [6, "-1 Nom, -1 Sleep, +1 Stink", "Videogaming 2+, Videogaming 4+, Cool 2+, Knowledge 1+, Veteran 1+", "Stink 4+, Cool <1", "0: +5 Videogaming XP<br/>1: +10 Videogaming XP<br/>2: +20 Videogaming XP<br/>3: +30 Videogaming XP<br/>4+: +40 Videogaming XP / +5 Monies"],
        "Coming Up With Panel Names" : [5, "-1 Nom, -1 Sleep, +1 Stink", "Nom 4+, Knowledge 1+, Knowledge 3+, Chillaxing 1+, Sleep 4+", "Stink 4+, Cool <1", "0: +10 Knowledge XP<br/>1: +20 Artsiness XP<br/>2: +30 Artsiness XP<br/>3: +30 Artsiness XP / +2 Cool<br/>4+: +30 Artsiness XP / +30 Veteran XP"],
        "EZ Ramen" : [6, "-2 Nom, -2 Sleep, +1 Stink", "Stink <4, Chillaxing 1+, Cool 1+, Sleep 2+, Nom 2+", "Stink 4+, Cool <1", "0: +5 Chillaxing XP<br/>1: +10 Chillaxing XP<br/>2: +20 Chillaxing XP / +2 Nom<br/>3: +40 Chillaxing XP / +3 Nom<br/>4+: +40 Chillaxing XP / +4 Nom"],
        "Finding Free Time" : [5, "-1 Nom, -1 Sleep, +1 Stink", "Cool 4+, Chillaxing 1+, Chillaxing 3+, Stink <1, Antidrama 1+", "Stink 4+, Cool <1", "0: +5 Chillaxing XP<br/>1: +10 Chillaxing XP<br/>2: +20 Chillaxing XP<br/>3: +40 Chillaxing XP<br/>4+: +40 Chillaxing XP / +40 Knowledge XP"],
        "Getting the Look Right" : [7, "-1 Nom, -2 Sleep, +2 Stink", "Cosplay 1+, Cosplay 3+, Artsiness 2+, Posing 1+, Stink <0", "Stink 4+, Cool <1", "0: +5 GeoSense XP<br/>1: +10 GeoSense XP<br/>2: +20 GeoSense XP / +2 Cool<br/>3: +30 GeoSense XP / +3 Cool<br/>4+: +40 Glowsticking XP"],
        "How to Draw Ninjas" : [5, "-2 Nom, -2 Sleep, +1 Stink", "Cool 1+, Photography 1+, Artsiness 1+, Artsiness 2+, Monies 5+", "Stink 4+, Cool <1", "0: +5 Artsiness XP / -1 Cool<br/>1: +5 Artsiness XP<br/>2: +20 Artsiness XP<br/>3: +50 Artsiness XP / +2 Cool<br/>4+: 80 Macking XP / +3 Cool / 1 +25% Event Find on Regular Mission Award"],
        "Introduction to Mahjong" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <1, Videogaming 2+, Cool 6+, Chillaxing 2+, Sleep 5+", "Stink 4+, Cool <1", "0: +10 Chillaxing XP<br/>3: +60 Knowledge XP<br/>4+: +60 Knowledge XP / +5 Monies / 1 +25% MJXP Award"],
        "Ninja Speed Dating" : [5, "-1 Nom, -1 Sleep, +1 Stink", "Stink <0, Stink <-2, Macking 1+, Macking 2+, Chillaxing 1+", "Stink 4+, Cool <1", "0: +5 Macking XP<br/>1: +10 Macking XP<br/>2: +20 Macking XP / +3 Cool<br/>3: +40 Macking XP / +3 Cool<br/>4+: +40 Antidrama XP"],
        "Missions and You" : [5, "-1 Nom, -1 Sleep, +1 Stink", "Stink <1, Nom 4+, Knowledge 2+, GeoSense 1+, Drama 3+", "Stink 4+, Cool <1", "0: +5 Knowledge XP<br/>1: +10 Knowledge XP<br/>2: +20 Knowledge XP / +3 Cool<br/>3: +40 Knowledge XP<br/>4+: 1 +50 Stamina Award"],
        "Ride Tuning" : [6, "-1 Nom, -1 Sleep, +1 Stink", "Cool 4+, Cool 8+, Veteran 1+, Sleep 4+, GeoSense 1+", "Stink 4+, Cool <1", "0: +5 Drama XP<br/>1: +10 Drama XP<br/>2: +20 Drama XP<br/>3: +40 Drama XP<br/>4+: +40 Antidrama XP"],
        "Robots are Awesome" : [6, "-1 Nom, -1 Sleep, +1 Stink", "Cool 6+, Artsiness 2+, Shopping 2+, Knowledge 2+, Artsiness 4+", "Stink 4+, Cool <1", "0: +5 Knowledge XP<br/>1: +10 Knowledge XP<br/>2: +20 Knowledge XP<br/>3: +40 Knowledge XP<br/>4+: +40 Combat Sewing XP"],
        "Sports For Ninjas" : [5, "-1 Nom, -1 Sleep, +1 Stink", "Sleep 3+, Combat Sewing 1+, Dance 2+, Cosplay 1+, Nom 4+", "Stink 4+, Cool <1", "0: +10 Dance XP<br/>1: +20 Dance XP<br/>2: +30 Dance XP<br/>3: +30 Dance XP / +1 Cool<br/>4+: +30 Dance XP / +30 Glowsticking XP"],
        "TACOS and You" : [6, "-4 Nom, -3 Sleep, +2 Stink", "Stink <1, Shopping 1+, Shopping 3+, Nom 5+, Knowledge 2+", "Stink 4+, Cool <1", "0: +20 Chillaxing XP<br/>1: +30 Chillaxing XP<br/>2: +40 Chillaxing XP / +2 Nom<br/>3: +40 Chillaxing XP / +4 Nom<br/>4+: +60 Macking XP"],
        "That's What She Said" : [5, "-2 Nom, -2 Sleep, +2 Stink", "Stink <0, Cool 3+, Artsiness 1+, Chillaxing 2+, Veteran 1+", "Stink 4+, Cool <1", "0: +1 Cool<br/>1: +2 Cool<br/>2: +4 Cool<br/>3: +4 Cool / +20 Drama XP<br/>4+: +4 Cool / +20 Antidrama XP"],
        "The Loop Conspiracy" : [5, "-1 Nom, -1 Sleep, +1 Stink", "Stink <3, GeoSense 1+, Sleep 3+, Nom 3+, Knowledge 3+", "Stink 4+, Cool <1", "0: +5 Knowledge XP<br/>1: +10 Knowledge XP<br/>2: +20 Knowledge XP<br/>3: +30 Knowledge XP<br/>4+: +50 Knowledge XP"],
        "Village Meetup" : [6, "-3 Nom, -3 Sleep, +3 Stink", "Stink <1, Wrangling 1+, Cool 4+, Knowledge 1+, Nom 2+", "Stink 4+, Cool <1", "0: +15 Chillaxing XP<br/>1: +25 Chillaxing XP<br/>2: +50 Chillaxing XP / +2 Cool<br/>3: +40 Schmoozing XP / +3 Cool<br/>4+: +40 Schmoozing XP / +4 Cool"],
        "What Not To Buy" : [6, "-1 Nom, -1 Sleep, +1 Stink", "Monies 4+, Stink <4, Shopping 1+, Shopping 2+, Knowledge 1+", "Stink 4+, Cool <1", "0: +10 Shopping XP<br/>1: +20 Shopping XP<br/>2: +30 Shopping XP<br/>3: +40 Shopping XP / +2 Monies<br/>4+: +40 Shopping XP / +4 Monies"],
        "What's for Lunch" : [5, "-1 Nom, +3 Sleep, +2 Stink", "Shopping 1+, Shopping 2+, Nom 3+, Nom 5+, Monies 2+", "Stink 4+, Cool <1", "0: +10 Knowledge XP<br/>1: +20 Knowledge XP / +3 Nom<br/>2: +20 Knowledge XP / +4 Nom<br/>3: +30 Dance XP / +1 Cool<br/>4+: +30 Shopping XP / +30 Chillaxing XP / +4 Nom"],
        "When Is Houses Coming Out?" : [5, "-2 Nom, -2 Sleep, +2 Stink", "Stink <1, Knowledge 1+, Chillaxing 2+, Antidrama 2+, Schmoozing 1+", "Stink 4+, Cool <1", "0: +5 Drama XP / -2 Cool<br/>1: +20 Drama XP / -1 Cool<br/>2: +40 Drama XP / -1 Cool<br/>3: +40 Drama XP<br/>4+: +40 Antidrama XP"],
        "Yaoi Panel" : [5, "-1 Nom, -1 Sleep, +1 Stink", "Stink <-1, Posing 2+, Knowledge 2+, Wrangling 3+, Drama 4+", "Stink 4+, Cool <1", "0: +5 Drama XP<br/>1: +10 Drama XP<br/>2: +20 Drama XP<br/>3: +40 Drama XP<br/>4+: +40 Antidrama XP"],
        "You and Your Kunai" : [5, "-1 Nom, -1 Sleep, +1 Stink", "Cool 4+, Cool 8+, Artsiness 3+, Veteran 1+, Antidrama 1+", "Stink 4+, Cool <1", "0: +5 Dance XP<br/>1: +10 Videogame XP<br/>2: +20 Combat Sewing XP<br/>3: +40 Combat Sewing XP<br/>4+: +60 Combat Sewing XP / +30 Glowsticking XP"],
        // All night events
        "All Night Gaming" : [5, "-1 Nom", "Stink <4, Chillaxing 2+, Silence 1+, Antidrama 1+, Sleep 3+", "Stink 4+, Cool <1", "0: +5 Videogaming XP<br/>1: +40 Videogaming XP<br/>2: +70 Videogaming XP<br/>3: +80 Videogaming XP<br/>4+: +100 Videogaming XP"],
        "Staring at People" : [5, "-1 Nom", "Stink <0, Silence 1+, GeoSense 1+, Photography 2+, Crowdswimming 1+", "Stink 4+, Cool <1", "0: +10 Silence XP<br/>1: +30 Silence XP<br/>2: +50 Silence XP / +40 Photography XP<br/>3: +60 Silence XP / +40 Photography XP<br/>4+: +80 Silence XP / +50 Photography XP"],

        // Panels 2
        "Basic Dance Moves" : [7, "-2 Nom, -1 Sleep, +1 Stink", "Stink <1, Dance 1+, Dance 2+, Glowsticking 2+, Cool 5+", "Stink 4+, Cool <1", "0: +20 Dance XP<br/>3: +80 Dance XP<br/>4+: +80 Dance XP / +80 Glowsticking XP"],
        "Charity Auction" : [7, "-1 Nom, -1 Sleep, +1 Stink, -2 Monies", "Crowdswimming 3+, Shopping 1+, Shopping 4+, Knowledge 3+", "Stink 4+, Cool <1", "0: +10 Shopping XP<br/>3: +80 Shopping XP<br/>4+: +80 Shopping XP / 1 +25% Ryo on Regular Missions Award"],
        "Chillin' With The Guests" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <-1, Schmoozing 1+, Schmoozing 3+, Cool 6+, Drama 1+", "Stink 4+, Cool <1", "0: -2 Cool<br/>3: +80 Schmoozing XP<br/>4+: +80 Veteran XP / +6 Cool"],
        "Comics are Awesome" : [7, "-2 Nom, -1 Sleep, +1 Stink", "Stink <1, Chillaxing 1+, Knowledge 2+, Shopping 1+, Monies 2+", "Stink 4+, Cool <1", "0: +5 Artsiness XP<br/>3: +80 Artsiness XP<br/>4+: +120 Artsiness XP"],
        "Convention Wrap-up" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <1, Chillaxing 1+, Cool 5+, Schmoozing 3+, Crowdswimming 2+", "Stink 4+, Cool <1", "0: +10 Veteran XP<br/>3: +60 Veteran XP<br/>4+: +80 Schmoozing XP / Backstage Pass (Permanent Effect)"],
        "Cosplaying As Yourself" : [7, "-2 Nom, -1 Sleep, +1 Stink", "Stink <1, Cosplay 1+, Cosplay 2+, Posing 2+, Chillaxing 2+", "Stink 4+, Cool <1", "0: +10 Cosplay XP<br/>3: +80 Cosplay XP<br/>4+: +60 Posing XP / +80 Cosplay XP / 1 +100 Stamina Award"],
        "Cute Cat Pictures" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <1, Chillaxing 1+, Artsiness 2+, Wrangling 2+, Nom 5+", "Stink 4+, Cool <1", "0: +1 Pet Point<br/>3: +40 Staring XP / +60 Photography XP / +1 Pet Point<br/>4+: +80 Chillaxing XP / +80 Flipping Out XP / +2 Pet Points"],
        "Does Anyone Hear That?" : [7, "-2 Nom, -1 Sleep, +1 Stink", "Stink <1, Silence 1+, Silence 2+, Knowledge 2+, Chillaxing 2+", "Stink 4+, Cool <1", "0: +10 Silence XP<br/>3: +80 Silence XP<br/>4+: +60 Posing XP / +80 Cosplay XP"],
        "Good Morning BillyCon" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <3, Chillaxing 2+, Cosplay 2+, Photography 2+, Nom 4+", "Stink 4+, Cool <1", "0: +5 Posing XP<br/>3: +80 Posing XP<br/>4+: +120 Posing XP"],
        "Highschool Girls on Guitar" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <1, Dance 1+, Glowsticking 1+, Crowdswimming 1+, Chillaxing 3+", "Stink 4+, Cool <1", "0: +5 Artsiness XP<br/>3: +80 Artsiness XP<br/>4+: +80 Crowdswimming XP / 1 +25% Event Find on Regular Missions Award"],
        "History via Bishounen" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <1, Drama 1+, Drama 3+, Wrangling 1+, Posing 1+", "Stink 4+, Cool <1", "0: +5 Chillaxing XP<br/>3: +80 Drama XP<br/>4+: +120 Drama XP"],
        "It's Only Cheese if you Lose" : [7, "-2 Nom, -1 Sleep, +1 Stink", "Stink <1, Chillaxing 1+, Videogaming 1+, Videogaming 3+, Sleep 4+, Antidrama 1+", "Stink 4+, Cool <1", "0: -2 Cool<br/>3: +80 Videogaming XP<br/>4+: +80 Videogaming XP / +2 Cool / 1 +25% Bits/Core Award"],
        "Kekekekeke" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <1, Videogaming 1+, Videogaming 3+, GeoSense 1+, Sleep 4+", "Stink 4+, Cool <1", "0: +5 Videogame XP<br/>3: +80 Videogaming XP<br/>4+: +120 Videogaming XP"],
        "Learn 2 Laundry" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <4, Antidrama 1+, Veteran 1+, Cool 2+, Combat Sewing 1+", "Stink 4+, Cool <1", "0: +5 Cosplay XP<br/>3: -5 Stink<br/>4+: -8 Stink"],
        "Local Highlights" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <1, Photography 1+, Silence 1+, Glowsticking 2+, Cool 5+", "Stink 4+, Cool <1", "0: +10 GeoSense XP<br/>3: +60 GeoSense XP<br/>4+: +60 GeoSense XP / +60 Chillaxing XP"],
        "Look at my Horse" : [7, "-2 Nom, -1 Sleep, +1 Stink", "Stink <1, Chillaxing 1+, Dance 1+, Macking 1+, Artsiness 1+", "Stink 4+, Cool <1", "0: +5 Dance XP<br/>3: +80 Dance XP<br/>4+: +120 Flipping Out XP / 1 +1 Drop on MegaMissions Award"],
        "Mmm Pancakes" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <1, Chillaxing 1+, Knowledge 1+, Cool 8+, Chillaxing 3+", "Stink 4+, Cool <1", "0: +5 Dance XP<br/>3: +80 Dance XP<br/>4+: +120 Flipping Out XP / 1 +10 Appetite Award"],
        "Monolingual Dub-Haters" : [7, "-2 Nom, -1 Sleep, +1 Stink", "Stink <1, Chillaxing 1+, Posing 1+, Knowledge 1+, Knowledge 3+", "Stink 4+, Cool <1", "0: +5 Knowledge XP<br/>3: +80 Knowledge XP<br/>4+: +80 Antidrama XP"],
        "Netdecking for Second Place" : [7, "-2 Nom, -1 Sleep, +1 Stink", "Stink <4, Videogaming 1+, Chillaxing 2+, Shopping 3+, Sleep 5+", "Stink 4+, Cool <1", "0: +5 Videogaming XP<br/>3: +40 Posing XP / +5 Cool<br/>4+: +80 Knowledge XP / +80 Silence XP"],
        "People With Blogs" : [7, "-2 Nom, -1 Sleep, +1 Stink", "Stink <1, Chillaxing 3+, Drama 5+, Wrangling 2+, Videogaming 3+", "Stink 4+, Cool <1", "0: -2 Cool<br/>3: +40 Knowledge XP / +40 Artsiness XP<br/>4+: +60 Posing XP / +60 Antidrama XP / 1 +5% Party House Discount Award"],
        "Talking About Cool Stuffs" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <-1, Chillaxing 2+, Cool 10+, Schmoozing 1+, Knowledge 4+", "Stink 4+, Cool <1", "0: +10 Chillaxing XP<br/>3: +80 Chillaxing XP<br/>4+: +80 Chillaxing XP / +40 Veteran XP / 1 20 Appetite Award"],
        "Talking Loudly About Spoilers" : [7, "-2 Nom, -1 Sleep, +1 Stink", "Stink <1, Silence 1+, Wrangling 3+, Antidrama 1+, Cool 8+", "Stink 4+, Cool <1", "0: -4 Cool<br/>3: +2 Cool / +60 Schmoozing XP<br/>4+: +4 Cool / +120 Knowledge XP"],
        "Way More Than 150" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <3, Chillaxing 1+, Chillaxing 2+, GeoSense 1+, Veteran 3+", "Stink 4+, Cool <1", "0: +10 Videogaming XP<br/>3: +40 Videogaming XP / +60 Photography XP<br/>4+: +80 Videogaming XP / +80 Photography XP / 1 +50 Stamina Award"],
        "Your Favorite Show Rocks" : [7, "-3 Nom, -1 Sleep, +1 Stink", "Stink <1, Chillaxing 1+, Drama 3+, Antidrama 1+, Cool 8+", "Stink 4+, Cool <1", "0: +1 Cool<br/>3: +1 Cool / +60 Antidrama XP<br/>4+: +2 Cool / +120 Crowdswimming XP"],
        "Your Favorite Show Sucks" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Stink <1, Chillaxing 1+, Drama 3+, Antidrama 1+, Cool 8+", "Stink 4+, Cool <1", "0: +5 Wrangling XP<br/>3: +80 Wrangling XP<br/>4+: +120 Wrangling XP"],
        // All night events
        "Falling Asleep at the Con" : [7, "-1 Nom", "Stink <1, Chillaxing 1+, Chillaxing 3+, Silence 1+, Veteran 1+", "Stink 4+, Cool <1", "0: +3 Stink / +3 Sleep<br/>3: +1 Stink / +5 Sleep / +50 Wrangling XP<br/>4+: +1 Stink / +7 Sleep / +80 Macking XP / +80 Chillaxing XP"],
        "So Many Tropes" : [7, "-1 Nom", "Knowledge 1+, Knowledge 3+, Knowledge 5+, Veteran 2+, Sleep 3+", "Stink 4+, Cool <1", "0: -2 Cool<br/>3: +40 Chillaxing XP/+40 Knowledge XP<br/>4+: +80 Chillaxing XP / +2 Cool"],

        // Panels 3
        "Advanced Cosplay" : [7, "-2 Nom, -2 Sleep, +2 Stink", "Photography 3+, Cosplay 2+, Combat Sewing 3+, Knowledge 3+, Cool 6+", "Cosplay <1, Cosplay <2, Cool <3, Stink 2+, Photography <2", "0: -1 Cool<br/>3+: +100 Cosplay XP / +60 Combat Sewing XP / 1 +5% Party House Discount Award"],
        "Advanced Lulz" : [7, "-2 Nom, -2 Sleep, +1 Stink", "Flipping Out 3+, Chillaxing 2+, Artsiness 3+, GeoSense 3+, Monies 8+", "Flipping Out <1, Flipping Out <2, Cool <3, Stink 2+, Chillaxing <2", "0: -1 Cool<br/>3+: +120 Drama XP / +120 Crowdswimming XP / 1 +100 Stamina Award"],
        "Ancient History" : [7, "-2 Nom, -2 Sleep, +1 Stink", "Knowledge 3+, GeoSense 2+, Veteran 3+, Antidrama 3+, Sleep 6+", "Knowledge <1, Knowledge <2, Cool <3, Stink 2+, Veteran <2", "0: -1 Cool<br/>3+: +100 Knowledge XP / +100 GeoSense XP / 1 +1 Drop on MegaMissions Award"],
        "Bawwing for Fun and Profit" : [7, "-2 Nom, -2 Sleep, +1 Stink", "Drama 3+, Drama 4+, Flipping Out 3+, Cool 6+", "Drama <1, Drama <2, Cool <3, Stink 2+, Antidrama <2", "0: -1 Cool<br/>3+: +100 Schmoozing XP / +100 Wrangling XP / 1 +25% Event Find on Regular Missions Award"],
        "Cats - Nature's Ninjas" : [7, "-3 Nom, -3 Sleep, +2 Stink", "Dance 3+, Drama 2+, Antidrama 3+, Wrangling 3+, Cool 6+", "Silence <1, Silence <2, Cool <3, Stink 2+, GeoSense <2", "0: +1 Pet Point<br/>3+: +100 Silence XP / +50 Flipping Out XP / 1 +25% Event Find on Regular Missions Award / +2 Pet Points"],
        "Chords of the World" : [7, "-2 Nom, -2 Sleep, +2 Stink", "Silence 3+, Rocking 2+, Chillaxing 3+, GeoSense 3+, Cool 6+", "Chillaxing <1, Chillaxing <2, Cool <3, Stink 2+, Artsiness <2", "0: -1 Cool<br/>3+: +100 Rocking XP / 1 +25% MJXP Award"],
        "Hiding in Plain Sight" : [7, "-2 Nom, -2 Sleep, +1 Stink", "Photography 3+, GeoSense 2+, Silence 3+, Macking 3+, Sleep 5+", "Silence <1, Silence <2, Cool <3, Stink 2+, Sleep <3", "0: -1 Cool<br/>3+: +120 Silence XP / +80 Chillaxing XP / 1 +25% Bits/Core Award"],
        "Jutsu Per Minute" : [7, "-1 Nom, -1 Sleep, +3 Stink", "Photography 3+, Chillaxing 2+, Glowsticking 3+, Crowdswimming 3+, Cool 6+", "Dance <1, Dance <2, Cool <3, Stink 2+, Glowsticking <2", "0: -1 Cool<br/>3+: +70 Glowsticking XP / +70 Rocking XP / 1 +50 Stamina Award"],
        "Let's Exercise!" : [5, "-3 Nom, -5 Sleep, +4 Stink", "Combat Sewing 3+, Videogaming 3+, Sleep 6+, Cool 4+", "Dance <1, Dance <2, Cool <3, Stink 2+, Posing <2", "0: -1 Cool<br/>3+: +150 Dance XP / 1 +100 Stamina Award"],
        "Name That Tune" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Dance 3+, Videogaming 2+, Knowledge 3+, Cool 6+", "Dance <1, Dance <2, Cool <3, Stink 2+, Knowledge <2", "0: -1 Cool<br/>3+: +70 Knowledge XP / +70 Dance XP / 1 +20 Appetite Award"],
        "Ninja Detective Skills" : [6, "-2 Nom, -1 Sleep, +2 Stink", "Photography 3+, Antidrama 2+, Wrangling 3+, Knowledge 3+, Cool 6+", "Knowledge <1, Knowledge <2, Cool <3, Stink 2+, Cosplay <1", "0: -1 Cool<br/>3+: +120 Photography XP / 1 +1 Drop on MegaMissions Award"],
        "Ninja World Geography" : [7, "-2 Nom, -1 Sleep, +2 Stink", "GeoSense 3+, Knowledge 2+, Knowledge 4+, Shopping 3+, Cool 6+", "Knowledge <1, Knowledge <2, Cool <3, Stink 2+, GeoSense <1", "0: -1 Cool<br/>3+: +100 GeoSense XP / 1 +50 Stamina Award"],
        "One More Spin" : [7, "-1 Nom, -1 Sleep", "Drama 3+, Crowdswimming 2+, Rocking 3+, Shopping 3+, Monies 15+", "Veteran <1, Veteran <2, Cool <3, Stink 2+, Macking <2", "0: -1 Cool<br/>3+: +8 Monies / 2 +5% Party House Discount Award"],
        "Product Placement" : [7, "-2 Nom, -2 Sleep, +1 Stink", "Shopping 3+, Artsiness 2+, Cosplay 3+, Videogaming 3+, Cool 6+", "Shopping <1, Shopping <2, Cool <3, Stink 2+, Chillaxing <2", "0: -1 Cool<br/>3+: +150 Shopping XP / 1 +10 Appetite Award"],
        "Relaxing With The Rack" : [7, "-2 Nom, -2 Sleep, +1 Stink", "Shopping 3+, Photography 2+, Videogaming 3+, Macking 3+, Cool 6+", "Chillaxing <1, Chillaxing <2, Cool <3, Stink 2+, Macking <2", "0: -1 Cool<br/>3+: +120 Chillaxing XP / +4 Cool / 1 +20 Appetite Award"],
        "Rocking Out" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Flipping Out 3+, Chillaxing 2+, Wrangling 3+, Artsiness 3+, Cool 6+", "Chillaxing <1, Chillaxing <2, Cool <3, Stink 2+, Rocking <2", "0: -1 Cool<br/>3+: +100 Rocking XP / 2 +50 Stamina Award"],
        "The Many Uses of Glowsticks" : [7, "-2 Nom, -2 Sleep, +1 Stink", "Knowledge 3+, Photography 2+, Chillaxing 3+, Sleep 7+, Cool 6+", "Knowledge <1, Knowledge <2, Cool <3, Stink 2+, Cosplay <2", "0: -1 Cool<br/>3+: +100 Glowsticking XP / +100 Combat Sewing XP / 1 +5% Party House Discount Award"],
        "The Music Within" : [7, "-2 Nom, -2 Sleep, +1 Stink", "Glowsticking 3+, Knowledge 2+, Chillaxing 3+, Sleep 7+, Cool 6+", "Artsiness <1, Artsiness <2, Cool <3, Stink 2+, Rocking <2", "0: -1 Cool<br/>3+: +150 Artsiness XP / 1 25% Ryo on Regular Missions Award"],
        "Use Your Crazy" : [7, "-1 Nom, -1 Sleep, +1 Stink", "Drama 3+, Flipping Out 3+, Flipping Out 4+, Macking 2+, Cool 6+", "Flipping Out <1, Flipping Out <2, Drama <2, Cool <3, Stink 2+", "0: -1 Cool<br/>3+: +100 Flipping Out XP / 1 +25% Event Find on Regular Missions Award"],
        "Vogue" : [7, "-2 Nom, -2 Sleep, +1 Stink", "Posing 3+, Drama 2+, Macking 3+, Artsiness 3+, Cool 8+", "Posing <1, Posing <2, Cool <3, Stink 2+, Artsiness <2", "0: -1 Cool<br/>3+: +150 Posing XP / 1 +25% Event Find on Regular Missions Award"],
        // All night events
        "Cosplay After-Hours" : [7, "-1 Nom", "Combat Sewing 3+, Schmoozing 2+, Cosplay 3+, Posing 3+, Stink <1", "Artsiness <1, Artsiness <2, Cool <3, Stink 2+, Cosplay <2", "0: -1 Cool<br/>3+: +70 Combat Sewing XP / +70 Cosplay XP / 1 +10 Appetite Award"],
        "Meditation" : [7, "-1 Nom", "Silence 3+, Flipping Out 3+, Videogaming 3+, Sleep 5+", "Silence <1, Silence <2, Cool <3, Stink 2+, Chillaxing <2", "0: -1 Cool<br/>3+: +100 Chillaxing XP / +50 Glowsticking XP / 1 +25% Event Find on Regular Missions Award"],

        // Backstage 1
        "Bingoing Rulebreakers" : [6, "-3 Nom, -5 Sleep, +4 Stink", "GeoSense 4+, Silence 4+, Cosplay 4+, Artsiness 4+, Glomping 1+", "Cool <10, Stink 2+, GeoSense <3, Silence <3, Cosplay <3", "0: -1 Cool<br/>2: +15 Reputation XP<br/>4+: +30 Reputation XP / +40 Sense Motive XP"],
        "Bomb Disposal" : [6, "-2 Nom, -3 Sleep, +3 Stink", "Cosplay 4+, Artsiness 4+, Veteran 4+, Drama 4+, The Angles 1+", "Cool <10, Stink 2+, Cosplay <3, Artsiness <3, Veteran <3", "0: -1 Cool<br/>2: +10 Reputation XP<br/>4+: +20 Reputation XP / +25 Spot XP"],
        "Bootleg Detection" : [6, "-1 Nom, -2 Sleep, +2 Stink", "Artsiness 4+, Veteran 4+, Drama 4+, Antidrama 4+, Glomping 1+", "Cool <10, Stink 2+, Artsiness <3, Veteran <3, Drama <3", "0: -1 Cool<br/>2: +5 Reputation XP<br/>4+: +10 Reputation XP / +10 Sense Motive XP"],
        "Destankifying" : [6, "-1 Nom, -2 Sleep, +2 Stink", "Veteran 4+, Drama 4+, Antidrama 4+, Flipping Out 4+, The Angles 1+", "Cool <10, Stink 2+, Veteran <3, Drama <3, Antidrama <3", "0: -1 Cool<br/>2: +5 Reputation XP<br/>4+: +10 Reputation XP / +10 Search XP"],
        "Drama Exacerbation" : [6, "-2 Nom, -3 Sleep, +3 Stink", "Flipping Out 4+, Knowledge 4+, Wrangling 4+, GeoSense 4+, Glomping 1+", "Cool <10, Stink 2+, Flipping Out <3, Knowledge <3, Wrangling <3", "0: -1 Cool<br/>2: +10 Reputation XP<br/>4+: +20 Reputation XP / +25 Detect Traps XP"],
        "Field Defense" : [6, "-2 Nom, -3 Sleep, +3 Stink", "Antidrama 4+, Flipping Out 4+, Knowledge 4+, Wrangling 4+, Crossplay 1+", "Cool <10, Stink 2+, Antidrama <3, Flipping Out <3, Knowledge <3", "0: -1 Cool<br/>2: +10 Reputation XP<br/>4+: +20 Reputation XP / +25 Hide XP"],
        "Food Testing" : [6, "-2 Nom, -3 Sleep, +3 Stink", "Cosplay 4+, Wrangling 4+, GeoSense 4+, Silence 4+, Crossplay 1+", "Cool <10, Stink 2+, Wrangling <3, GeoSense <3, Silence <3", "0: -1 Cool<br/>2: +10 Reputation XP<br/>4+: +20 Reputation XP / +25 Bluff XP"],
        "Guest  Management" : [6, "-1 Nom, -2 Sleep, +2 Stink", "Drama 4+, Antidrama 4+, Flipping Out 4+, Knowledge 4+, Crossplay 1+", "Cool <10, Stink 2+, Drama <3, Antidrama <3, Flipping Out <3", "0: -1 Stink<br/>2: +5 Reputation XP<br/>4+: +10 Reputation XP / +10 Spot XP"],
        "Hotel Cleansing" : [6, "-2 Nom, -3 Sleep, +3 Stink", "Veteran 4+, Drama 4+, Antidrama 4+, Flipping Out 4+, Glomping 1+", "Cool <10, Stink 2+, Veteran <3, Drama <3, Antidrama <3", "0: -1 Cool<br/>2: +10 Reputation XP<br/>4+: +20 Reputation XP / +25 Detect Traps XP"],
        "Hungry Spirit Exorcising" : [6, "-2 Nom, -3 Sleep, +3 Stink", "Knowledge 4+, Wrangling 4+, GeoSense 4+, Silence 4+, The Angles 1+", "Cool <10, Stink 2+, Knowledge <3, Wrangling <3, GeoSense <3", "0: -1 Cool<br/>2: +10 Reputation XP<br/>4+: +20 Reputation XP / +25 Bluff XP"],
        "Monies Verification" : [6, "-4 Nom, -6 Sleep, +4 Stink", "Cosplay 4+, Artsiness 4+, Veteran 4+, Drama 4+, Crossplay 1+", "Cool <10, Stink 2+, Cosplay <3, Artsiness <3, Veteran <3", "0: -1 Cool<br/>2: +20 Reputation XP<br/>4+: +40 Reputation XP / +50 Search XP"],
        "Line Management" : [6, "-1 Nom, -2 Sleep, +2 Stink", "Flipping Out 4+, Knowledge 4+, Wrangling 4+, GeoSense 4+, The Angles 1+", "Cool <10, Stink 2+, Flipping Out <3, Knowledge <3, Wrangling <3", "0: -1 Cool<br/>2: +5 Reputation XP<br/>4+: +10 Reputation XP / +10 Detect Traps XP"],
        "Pajama Bugging" : [6, "-2 Nom, -3 Sleep, +3 Stink", "Drama 4+, Antidrama 4+, Flipping Out 4+, Knowledge 4+, The Angles 1+", "Cool <10, Stink 2+, Drama <3, Antidrama <3, Flipping Out <3", "0: -1 Cool<br/>2: +10 Reputation XP<br/>4+: +20 Reputation XP / +25 Bluff XP"],
        "Panelist Reanimation" : [6, "-4 Nom, +4 Sleep, -3 Stink", "Staring 1+, Staring 2+, Staring 4+, Stink <-2, Sleep 6+", "Stink 3+, Staring <1", "0: -1 Cool / +3 Monies<br/>1: +4 Monies / +20 Staring XP<br/>2: +6 Monies / +30 Staring XP<br/>4+: +8 Monies / +30 Use Rope XP / 1 11% Chance for a Manly Apron Award"],
        "Pizza Delivery" : [6, "-3 Nom, -5 Sleep, +4 Stink", "Silence 4+, Cosplay 4+, Artsiness 4+, Veteran 4+, The Angles 1+", "Cool <10, Stink 2+, Silence <3, Cosplay <3, Artsiness <3", "0: -1 Cool<br/>2: +15 Reputation XP<br/>4+: +30 Reputation XP / +40 Spot XP"],
        "Security Detail" : [6, "-2 Nom, -3 Sleep, +3 Stink", "Artsiness 4+, Veteran 4+, Drama 4+, Antidrama 4+, Crossplay 1+", "Cool <10, Stink 2+, Artsiness <3, Veteran <3, Drama <3", "0: -1 Cool<br/>2: +10 Reputation XP<br/>4+: +20 Reputation XP / +25 Hide XP"],
        "Shoplifter Detection" : [6, "-1 Nom, -2 Sleep, +2 Stink", "Antidrama 4+, Flipping Out 4+, Knowledge 4+, Wrangling 4+, Glomping 1+", "Cool <10, Stink 2+, Antidrama <3, Flipping Out <3, Knowledge <3", "0: -1 Cool<br/>2: +5 Reputation XP<br/>4+: +10 Reputation XP / +10 Hide XP"],
        "Underground Dweller Hunting" : [6, "-1 Nom, -2 Sleep, +2 Stink", "Cosplay 4+, Artsiness 4+, Veteran 4+, Drama 4+, Crossplay 1+", "Cool <10, Stink 2+, Cosplay <3, Artsiness <3, Veteran <3", "0: -1 Cool<br/>2: +5 Reputation XP<br/>4+: +10 Reputation XP / +10 Use Rope XP"],
        "Zombie Dispersal" : [6, "-1 Nom, -2 Sleep, +2 Stink", "Knowledge 4+, Wrangling 4+, GeoSense 4+, Silence 4+, Crossplay 1+", "Cool <10, Stink 2+, Knowledge <3, Wrangling <3, GeoSense <3", "0: -1 Cool<br/>2: +5 Reputation XP<br/>4+: +10 Reputation XP / +10 Sense Motive XP"]
    };
    var getTarget = function (e) {
        e = e || window.event;
        return e.target || e.srcElement;
    };

    var addStyle = function (css) {
        var head = document.getElementsByTagName("head")[0];
        if (!head) {
            return;
        }
        var style = document.createElement("style");
        style.type = "text/css";
        style.textContent = css;
        head.appendChild(style);
    };

    var restyleTable = function () {
        var snap = document.evaluate("//td[contains(text(),'Pre-Registration')]", document, null, 7, null);
        snap.snapshotItem(0).innerHTML = "VGT/C Pre-Registration";

        snap = document.evaluate("//table[@width='100%']", document, null, 7, null);
        var i, j;
        var onCellClick = function () {
            this.className = (this.className === "" ? "conSelected" : "");
        };
        for (i = 0; i < snap.snapshotLength; i++) {
            var rows = snap.snapshotItem(i).rows;
            snap.snapshotItem(i).width = (rows[0].cells.length * 63 + 7) + "px";
            snap.snapshotItem(i).style.tableLayout = "fixed";

            for (j = 1; j < rows.length; j++) {
                rows[j].cells[0].height = "30px";
            }

            for (j = 1; j < rows[2].cells.length && i < 2; j++) {
                if (rows[2].cells[j].textContent.length > 1) {
                    rows[2].cells[j].addEventListener("click", onCellClick, false);
                }
            }

            rows[0].cells[0].width = "70px";
            for (j = 1; j < rows[0].cells.length; j++) {
                rows[0].cells[j].width = "63px";
            }
        }

        snap = document.evaluate("//td[@colspan='8']", document, null, 7, null);
        for (i = 0; i < snap.snapshotLength; i++) {
            var x = snap.snapshotItem(i);
            x.parentNode.style.backgroundColor = "#002266";

            for (j = 0; j < 8; j++) {
                var newCell = document.createElement("td");
                newCell.style.border = "1px solid black";
                newCell.textContent = "Open";
                newCell.addEventListener("click", onCellClick, false);

                if (x.parentNode.lastChild === x) {
                    x.parentNode.appendChild(newCell);
                } else {
                    x.parentNode.insertBefore(newCell, x.nextSibling);
                }
            }

            x.parentNode.removeChild(x);
        }
    };

    var addTimes = function () {
        var snap = document.evaluate("//table[@width='100%']", document, null, 7, null);
        var i, j, k;
        for (i = 0; i < snap.snapshotLength; i++) {
            var table = snap.snapshotItem(i);
            for (j = (i < 2 ? 3 : 2); j < table.rows.length; j++) {
                var cellPosition = i > 0 ? 0 : 3;
                for (k = 1; k < table.rows[j].cells.length; k++) {
                    var element = table.rows[j].cells[k];
                    element = element.wrappedJSObject || element;
                    element.time = cellPosition;
                    element.day = i + 1;
                    cellPosition += element.colSpan;
                }
            }
        }
    };

    var applySkill = function (s) {
        var i, n = 0;
        s = s.split(', ');

        for (i = 0; i < s.length; i++) {
            var level = skillLevel[s[i].match(/[\w ]+(?= [<\d])/)];
            if (level === undefined) {
                level = 0;
            }
            var requirement = s[i].match(/[-\d]{1,2}/);
            if (s[i][s[i].length - 1] === '+') {
                if (level >= requirement) {
                    s[i] = "<b><i>" + s[i] + "</i></b>";
                    n++;
                }
            } else {
                if (level < requirement) {
                    s[i] = "<b><i>" + s[i] + "</i></b>";
                    n++;
                }
            }
        }

        return [n, s.join(', ')];
    };

    var applyBonus = function (s, doubleRewards) {
        var stuffs = doubleRewards + (foamHand ? 0.1 : 0) + (niceBoat ? skillLevel['Knowledge'] / 10 : 0);
        var ioBonus = (10 + intentObservation) / 10;

        var splited = s.split('<br/>');
        var i, j;
        for (i = 0; i < splited.length; i++) {
            var xpValues = splited[i].match(/\d{1,3} [\w ]{4,14}(?= XP\b)/g);
            if (xpValues) {
                for (j = xpValues.length - 1; j >= 0; j--) {
                    var  xpStat = xpValues[j].match(/\d{1,3}(?= ([\w ]{4,14}))/);
                    var lowCutKimonoStat = "Posing" === xpStat[1] || "Cosplay" === xpStat[1];
                    var importRigStat = "Videogaming" === xpStat[1];
                    splited[i] = splited[i].replace((xpValues[j]), Math.floor(xpStat[0] * (stuffs + ((lowCutKimono && lowCutKimonoStat) || (importRig && importRigStat) ? 0.3 : 0)) * ioBonus) + " " + xpStat[1]);
                }
            }

            if (doubleRewards === 2) {
                xpValues = splited[i].match(/[+-]\d [\w\s]{3,10}(?=$|<| \/)/g);
                if (xpValues) {
                    for (j = xpValues.length - 1; j >= 0; j--) {
                        splited[i] = splited[i].replace((xpValues[j] + ''), xpValues[j][0] + xpValues[j][1] * 2 + xpValues[j].slice(2));
                    }
                }
                splited[i] = splited[i].replace(/ 2 /, ' 4 ');
                splited[i] = splited[i].replace(/ 1 /, ' 2 ');
            }
        }

        return splited.join('<br/>');
    };

    var applySuccess = function (bonus, difficulty, s, doubleRewards) {
        s = applyBonus(s, doubleRewards);
        s = s.split("<br/>");

        var rolls = 1 + bonus + (useFlow ? 1 : 0);
        var range = (intentObservation === 3 ? 11 : 10) + (strutStuff ? 1 : 0);
        var strength = (intentObservation === 3 ? 1 : 0) + (strutStuff ? 1 : 0) - glomped;

        var p = (difficulty <= range) ? (range - difficulty + strength + 1) / range : 0;
        if (p > 1) {
            p = 1;
        }
        var i, k, prob = [];
        for (k = 0; k <= rolls; k++) {
            prob[k] = Math.pow(p, k) * Math.pow(1 - p, rolls - k) * factorial[rolls] / (factorial[k] * factorial[rolls - k]);
        }

        var last = rolls + 1;
        for (i = s.length - 1; i >= 0; i--) {
            var chance = 0;
            for (k = s[i][0]; k < last && k <= rolls; k++) {
                chance += prob[k];
            }
            last = s[i][0];

            chance = (chance * 100).toFixed(2) + '';
            s[i] = '(' + (chance.length === 4 ? '_' : '') + chance + '%) ' + (s[i][1] === '+' ? '' : '_') + s[i];
        }

        return s.join("<br/>");
    };

    var addEventToolTip = function (myCell, cssClass) {
        var cellTitle = myCell.innerHTML;

        var bonuses = applySkill(events[cellTitle][2]);
        var penalties = applySkill(events[cellTitle][3]);
        myCell = myCell.wrappedJSObject || myCell;
        var doubleRewards = (myCell.day === 2 && (myCell.time + myCell.colSpan > 4) && myCell.time < 16) ? 2 : 1;
        var difficulty = events[cellTitle][0] + 2 * penalties[0] - 2 * frontRow - (sunGlasses && myCell.time < 6 ? 1 : 0);
        var successes = applySuccess(bonuses[0], difficulty, events[cellTitle][4], doubleRewards);
        var boHDR = "<b>" + cellTitle + "</b> (Difficulty: <b>" + difficulty + "</b>)";
        var boBDY = "<table class='conTable'><tr><td>Cost:</td><td>" + events[cellTitle][1] + "</td><tr><td>Bonuses (" + bonuses[0] + "):</td><td>" + bonuses[1] + "</td><tr><td>Penalties (" + penalties[0] + "):</td><td>" + penalties[1] + "</td><tr><td>Successes:</td><td>" + successes + "</td><tr></table>";
        if (!parsedSkills) {
            boxOver.addToolTip(myCell, boHDR, boBDY, cssClass + "H", cssClass);
            myCell.addEventListener("click", function () {
                this.className = (this.className === "" ? "conSelected" : "");
            }, false);
        } else {
            boxOver.updateToolTip(myCell, boHDR, boBDY);
        }
    };

    var addEventsData = function () {
        var snap = document.evaluate("//td/b[contains(text(),'Panels')]", document, null, 7, null);
        var i, j, myRow;
        for (i = 0; i < snap.snapshotLength; i++) {
            var pn = snap.snapshotItem(i).textContent[7];
            myRow = snap.snapshotItem(i).parentNode.parentNode;
            for (j = 1; j < myRow.cells.length; j++) {
                addEventToolTip(myRow.cells[j], "conPanels" + pn);
            }
        }

        snap = document.evaluate("//td/b[contains(text(),'Video')]", document, null, 7, null);
        for (i = 0; i < snap.snapshotLength; i++) {
            myRow = snap.snapshotItem(i).parentNode.parentNode;
            for (j = 1; j < myRow.cells.length; j++) {
                addEventToolTip(myRow.cells[j], "conVideo1");
            }
        }

        snap = document.evaluate("//td/b[contains(text(),'Backstage')]", document, null, 7, null);
        for (i = 0; i < snap.snapshotLength; i++) {
            myRow = snap.snapshotItem(i).parentNode.parentNode;
            for (j = 1; j < myRow.cells.length; j++) {
                if (myRow.cells[j].innerHTML.length > 0) {
                    addEventToolTip(myRow.cells[j], "conBackstage1");
                }
            }
        }

        snap = document.evaluate("//td[contains(text(),'Work a Booth')]", document, null, 7, null);
        for (i = 0; i < snap.snapshotLength; i++) {
            addEventToolTip(snap.snapshotItem(i), "conOddJobs");
        }

        parsedSkills = true;
    };

    var addMissingRewards = function () {
        var lowCutKimonoStat, importRigStat;

        var multiplier = 0;
        var knowledgeLevel = 0;

        var i, j;
        for (i = 0; i < skills.length; i++) {
            for (j = 0; j < skills[i].length; j++) {
                if (skills[i][j][0] === "Knowledge") {
                    knowledgeLevel = i;
                }
            }
        }

        var stuffs = "";
        try {
            stuffs = document.evaluate("//*[contains(@title, '[Stuffs]')]", document, null, 7, null).snapshotItem(0).innerHTML;
        } catch (e) {}
        niceBoat = /Nice Boat/.test(stuffs);
        foamHand = /Giant Foam Hand/.test(stuffs);
        lowCutKimono = /Low-Cut Kimono/.test(stuffs);
        importRig = /Import Rig/.test(stuffs);
        stuffs = 1 + (foamHand ? 0.1 : 0) + 0.1 * (niceBoat ? knowledgeLevel : 0);

        var snap = document.evaluate("//table[@cellpadding='3']/tbody/tr/td/b[contains(text(),'Successes:')]/..", document, null, 7, null);
        for (i = 0; i < snap.snapshotLength; i++) {
            var tdNode = snap.snapshotItem(i);
            var eventName = tdNode.childNodes[4].firstChild.textContent;
            var eventBonuses = events[eventName][4];

            var doubleRewards = /All Rewards Doubled/.test(tdNode.textContent) ? 2 : 1;

            var xpStat;
            if (!multiplier) {
                var temp = eventBonuses.split(/<br\/>/);
                xpStat = tdNode.childNodes[tdNode.childNodes.length - 4].textContent.match(/\d{2,3}(?= ([\w ]{5,14}) XP)/);
                if (xpStat) {
                    lowCutKimonoStat = "Posing" === xpStat[1] || "Cosplay" === xpStat[1];
                    importRigStat = "Videogaming" === xpStat[1];
                    multiplier = xpStat[0];
                    multiplier /= temp[temp.length - 2].match(/\d{1,3}(?= [\w ]{5,14} XP)/);
                    intentObservation = Math.round(multiplier / (doubleRewards - 1 + stuffs + ((lowCutKimono && lowCutKimonoStat) || (importRig && importRigStat) ? 0.3 : 0)) * 10) - 10;

                    var savedData = JSON.parse(localStorage.getItem("BvS_BillyCon_Data") || "{}");
                    savedData.playerData = savedData.playerData || {};
                    savedData.playerData[playerName] = savedData.playerData[playerName] || {};
                    savedData.playerData[playerName].intentObservation = intentObservation;
                    localStorage.setItem("BvS_BillyCon_Data", JSON.stringify(savedData));
                } else {
                    try {
                        intentObservation = JSON.parse(localStorage.getItem("BvS_BillyCon_Data")).playerData[playerName].intentObservation;
                    } catch (ex) {
                        intentObservation = 0;
                    }
                }
            }

            var newTextContent = eventBonuses.slice(eventBonuses.search(/[34]\+:/) + 3);
            var xpValues = newTextContent.match(/\d{2,3} [\w ]{4,14}(?= XP\b)/g);
            if (xpValues) {
                for (j = xpValues.length - 1; j >= 0; j--) {
                    xpStat = xpValues[j].match(/\d{2,3}(?= ([\w ]{4,14}))/);
                    lowCutKimonoStat = "Posing" === xpStat[1] || "Cosplay" === xpStat[1];
                    importRigStat = "Videogaming" === xpStat[1];
                    newTextContent = newTextContent.replace((xpValues[j]), Math.floor(xpStat[0] * (doubleRewards - 1 + stuffs + ((lowCutKimono && lowCutKimonoStat) || (importRig && importRigStat) ? 0.3 : 0)) * (10 + intentObservation) / 10) + " " + xpStat[1]);
                }
            }

            if (doubleRewards === 2) {
                xpValues = newTextContent.match(/[+-]\d [\w ]{3,10}(?=$|<| \/)/g);
                if (xpValues) {
                    for (j = xpValues.length - 1; j >= 0; j--) {
                        newTextContent = newTextContent.replace((xpValues[j] + ''), xpValues[j][0] + xpValues[j][1] * 2 + xpValues[j].slice(2));
                    }
                }
                newTextContent = newTextContent.replace(/ 2 /, ' 4 ');
                newTextContent = newTextContent.replace(/ 1 /, ' 2 ');
            }

            tdNode.lastChild.textContent = newTextContent;
        }
    };

    var computeChance = function () {
        var base = 1;
        var range = intentObservation === 3 ? 11 : 10;
        var strength = intentObservation === 3 ? 1 : 0;
        var effects = document.evaluate("//*[contains(@title, '[Effects]')]", document, null, 7, null);
        var frontRow = 0;
        var glomped = 0;
        if (effects.snapshotLength > 0) {
            frontRow = effects.snapshotItem(0).textContent.match(/Front\sRow( \(\d\))?/);
            if (frontRow) {
                if (typeof frontRow[1] === "undefined") {
                    frontRow = 1;
                } else {
                    frontRow = frontRow[1][2];
                }
            } else {
                frontRow = 0;
            }

            glomped = effects.snapshotItem(0).textContent.match(/Glomped(\s\(\d\))?/);
            if (glomped) {
                if (typeof glomped[1] === "undefined") {
                    glomped = 1;
                } else {
                    glomped = glomped[1][2];
                }
            } else {
                glomped = 0;
            }
        }

        strength -= glomped;

        var stuffsed = document.getElementsByClassName('constats');
        stuffsed = stuffsed[0].rows[stuffsed[0].rows.length - 1].textContent;
        if (/Stuffsed/.test(stuffsed)) {
            stuffsed = stuffsed[12];
        } else {
            stuffsed = 0;
        }
        strength -= stuffsed;

        if (document.getElementById("useflow").checked) {
            base++;
        }

        var strut = document.getElementsByName("strut");
        if (strut.length > 0 && strut[0].checked) {
            range++;
            strength++;
        }

        var snap = document.evaluate("//table[@cellpadding='3']/tbody/tr/td/b[contains(text(),'Successes:')]/..", document, null, 7, null);

        var i, k;
        for (i = 0; i < snap.snapshotLength; i++) {
            var node = snap.snapshotItem(i);
            var rolls = base + parseInt(node.textContent.match(/Bonuses \(([0-9]+)\)/)[1], 10);
            var diff = parseInt(node.textContent.match(/Difficulty: ([0-9]+)/)[1], 10) - 2 * frontRow;
            if (rolls < 0) {
                rolls = 0;
            }

            var p = (diff <= range) ? (range - diff + strength + 1) / range : 0;
            if (p > 1) {
                p = 1;
            }
            if (p < 0) {
                p = 0;
            }
            var prob = [];
            for (k = 0; k <= rolls; k++) {
                prob[k] = Math.pow(p, k) * Math.pow(1 - p, rolls - k) * factorial[rolls] / (factorial[k] * factorial[rolls - k]);
            }

            var textNode = node.lastChild.previousSibling;
            textNode.textContent = textNode.textContent.replace(/\(.+%\) /, '');
            var not0 = true;
            var last = rolls + 1;
            while (not0) {
                if (textNode.textContent[0] === '0') {
                    not0 = false;
                }
                var chance = 0;
                for (k = parseInt(textNode.textContent[0], 10); k < last && k <= rolls; k++) {
                    chance += prob[k];
                }
                last = parseInt(textNode.textContent[0], 10);

                chance = (chance * 100).toFixed(2) + '';
                textNode.textContent = '(' + (chance.length === 4 ? '_' : '') + chance + '%) ' + textNode.textContent;

                textNode = textNode.previousSibling.previousSibling.previousSibling;
                textNode.textContent = textNode.textContent.replace(/\(.+%\) /, '');
            }
        }
    };

    var sortSkills = function () {
        var i, j;
        var settings = JSON.parse(localStorage.getItem("BvS_BillyCon_Settings") || "{}");
        var raveSkills = {
            'Artsiness': 1,
            'Wrangling': 1,
            'Posing': 1,
            'Rocking': 1,
            'Silence': 1,
            'Dance': 1,
            'Drama': 1,
            'Videogaming': 1,
            'Macking': 1,
            'Chillaxing': 1,
            'Flipping Out': 1
        };
        if (!parsedSkills) {
            addStyle([
                ".skillBack {background: #500000; position: relative; height: 14px; padding: 0;}",
                ".skillFront {background: #071e4a url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAKCAIAAAD6sKMdAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMElEQVR42gXBiQoAEBBAQfvKj/tXkXKkHFvEjLHuIWNAbVAL0jPMgKjHaOSuxNn5A21aFILfIZVwAAAAAElFTkSuQmCC) repeat-x left top; height: 14px;}",
                ".skillFrontNPB {background: #500000; height: 14px;}",
                ".skillText {position: absolute; top: 0; left: 3px;}"
            ].join("\n"));

            var skillCells = document.evaluate("//span/table/tbody/tr/td/b", document, null, 7, null);
            for (i = 0; i < 200; i++) {
                skills[i] = [];
            }
            var descriptionsNode = skillCells.snapshotItem(0).parentNode.parentNode.parentNode.parentNode.parentNode;
            descriptionsNode = descriptionsNode.wrappedJSObject || descriptionsNode;
            descriptions = descriptionsNode.title;
            if (descriptions.length === 0) {
                descriptions = descriptionsNode.boBDY;
            }
            descriptions = descriptions.slice(22, descriptions.length - 39).replace(/\([\d.k]+\/[\d.k]+\)/g, "").split(/.<br>/);

            for (i = 0; i < skillCells.snapshotLength; i++) {
                var level = parseInt(skillCells.snapshotItem(i).textContent.match(/\d+/), 10);
                var descriptionSplit = descriptions[i].split(/: | - h/g);
                var xp = [skillCells.snapshotItem(i).nextSibling.textContent.match(/\d+(?=\/)/), (level + 1) * (level + 1) * 100];
                var width = xp[0] / xp[1] * 100;
                skills[level].push([descriptionSplit[0], xp, width, descriptionSplit[1],  (typeof (descriptionSplit[2]) === 'undefined' ? '' : 'H' + descriptionSplit[2])]);
            }

            container = skillCells.snapshotItem(0).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            skillsDisabled = container.getAttribute("bgcolor") === "#444444";
            if (skillsDisabled) {
                nomMessage = container.firstChild.lastChild.previousSibling;
            }

            var skillsObject = [];
            for (i = 0; i < skills.length; i++) {
                if (skills[i].length) {
                    skillsObject[i] = [];
                    for (j = 0; j < skills[i].length; j++) {
                        skillsObject[i].push(skills[i][j][0].replace(/\s/, ' '));
                    }
                }
            }
            var savedData = JSON.parse(localStorage.getItem("BvS_BillyCon_Data") || "{}");
            savedData.lastPlayer = playerName;
            savedData.playerData = savedData.playerData || {};
            savedData.playerData[playerName] = savedData.playerData[playerName] || {};
            savedData.playerData[playerName].skills = skillsObject;
            localStorage.setItem("BvS_BillyCon_Data", JSON.stringify(savedData));
            parsedSkills = true;
        }

        var skillsTable = document.createElement("table");
        skillsTable.style.width = '95%';

        for (i = 0; i < skills.length; i++) {
            if (skills[i].length) {
                var row = skillsTable.insertRow(skillsTable.rows.length);
                var cell = row.insertCell(0);
                cell.align = "center";
                cell.colSpan = settings.compactSkills ? "4" : "3";
                cell.style.border = "0";
                cell.style.backgroundColor = skillsDisabled ? "#666" : "#900";
                cell.innerHTML = "<b>Level " + i + " Skills</b> (" + skills[i].length + ")";
                var cellNr = settings.compactSkills ? 4 : 3;
                for (j = 0; j < skills[i].length; j++) {
                    if (cellNr === (settings.compactSkills ? 4 : 3)) {
                        row = skillsTable.insertRow(skillsTable.rows.length);
                        cellNr = 0;
                    }
                    cell = row.insertCell(cellNr++);
                    cell.className = "skillBack";
                    if (raveSkills[skills[i][j][0]]) {
                        cell.style.borderColor = '#ababab';
                    }
                    cell.innerHTML = '<div class="skillBack">'
                        + '<div class="skillFront' + (settings.skillProgressBar ? '' : 'NPB') + '" style="width:' + skills[i][j][2] + '%;"/>'
                        + '<div class="skillText"><b>' + skills[i][j][0] + '</b></div>'
                        + (settings.compactSkills ? '' : '<div class="skillText" style="right:3px; text-align:right;">' + (settings.xpNeeded ? skills[i][j][1][1] - skills[i][j][1][0] : skills[i][j][1].join('/')) + '</div>')
                        + '</div>';
                    cell.firstChild.title = "header=[" + skills[i][j][0] + " (" + skills[i][j][1].join('/') + ")]"
                        + "body=[" + (settings.skillDescription ? skills[i][j][3] + (skills[i][j][4].length ? "<br/><i>" + skills[i][j][4] + "</i>" : "") + "<br/><br/>" : "") + "<b>XP needed:</b> " + (skills[i][j][1][1] - skills[i][j][1][0]) + "]"
                        + "thin=[1]";
                    if (skillsDisabled) {
                        cell.firstChild.style.backgroundColor = "#333";
                    }
                }
            }
        }
        if (settings.skillsHidden) {
            skillsTable.style.display = 'none';
        }

        var onShowSkillsBar = function (e) {
            var element = getTarget(e);
            var settings = 0;
            settings = JSON.parse(localStorage.getItem("BvS_BillyCon_Settings") || "{}");

            if (element.innerHTML === "Show Skills") {
                element.nextSibling.style.display = 'table';
                element.innerHTML = "Hide Skills";
                settings.skillsHidden = false;
            } else {
                element.nextSibling.style.display = 'none';
                element.innerHTML = "Show Skills";
                settings.skillsHidden = true;
            }

            localStorage.setItem("BvS_BillyCon_Settings", JSON.stringify(settings));
        };

        var showSkillsBar = document.createElement("div");
        showSkillsBar = showSkillsBar.wrappedJSObject || showSkillsBar;
        showSkillsBar.style.width = '30%';
        showSkillsBar.style.textAlign = 'center';
        showSkillsBar.style.backgroundColor = skillsDisabled ? "#666" : "#900";
        showSkillsBar.style.fontWeight = 'bold';
        showSkillsBar.style.cursor = 'pointer';
        showSkillsBar.style.border = '1px outset ' + (skillsDisabled ? "#666" : "#900");
        showSkillsBar.innerHTML = settings.skillsHidden ? "Show Skills" : "Hide Skills";
        showSkillsBar.onclick = onShowSkillsBar;

        container.innerHTML = '';
        container.appendChild(showSkillsBar);
        container.appendChild(skillsTable);
        if (skillsDisabled) {
            container.appendChild(nomMessage);
        }
    };

    var switchOption = function (e) {
        e = e || window.event;
        if (!e.ctrlKey && !e.altKey) {
            var key = e.keyCode - 49;
            if (key > -1 && key < 4 && e.shiftKey) {
                var settings = JSON.parse(localStorage.getItem("BvS_BillyCon_Settings") || "{}");
                var settingsNames = ["compactSkills", "xpNeeded", "skillDescription", "skillProgressBar"];

                settings[settingsNames[key]] = settings[settingsNames[key]] ? false : true;
                localStorage.setItem("BvS_BillyCon_Settings", JSON.stringify(settings));

                sortSkills();
            } else if (key === 16) {
                var i, j, total = 0, xp = 0;
                for (i = 0; i < skills.length; i++) {
                    xp += i * i * 100;
                    for (j = 0; j < skills[i].length; j++) {
                        total += parseInt(skills[i][j][1][0], 10) + xp;
                    }
                }
                alert("Total XP gained: " + total);
            } else if (key === 23) {
                alert("Hot Keys (hold Shift):\n1: Toggle Compact Skills\n2: Toggle XP needed to level up (not in compact mode)\n3: Toggle Skill description on the tooltip\n4: Toggle Progress Bars\n\nA: Show Total XP gained.");
            }
        }
    };

    var updateStat = function (stat, value) {
        skillLevel[stat] = value;
        addEventsData();
    }

    var updateTune = function (stat, value) {
        if (stat.indexOf("Front Row") >= 0) {
            frontRow = value;
        }
        if (stat.indexOf("Intent Observation") >= 0) {
            intentObservation = value;
        }
        if (stat.indexOf("Glomped") >= 0) {
            glomped = value;
        }

        addEventsData();
    };

    var updateToggle = function (e) {
        var element = getTarget(e);
        if (element.id === 'useflow') {
            useFlow = element.checked;
        } else if (element.id === 'strutstuff') {
            strutStuff = element.checked;
        } else if (element.id === 'sunglasses') {
            sunGlasses = element.checked;
        } else if (element.id === 'foamhand') {
            foamHand = element.checked;
        } else if (element.id === 'niceboat') {
            niceBoat = element.checked;
        } else if (element.id === 'lowcutkimono') {
            lowCutKimono = element.checked;
        } else if (element.id === 'importrig') {
            importRig = element.checked;
        }

        addEventsData();
    };

    var searchReward = function (e) {
        var i;
        e = e || window.event;
        if (e.keyCode === 13) {
            var searchString = (e.target || e.srcElement).value;

            var snap = document.evaluate("//tr[position()>1]/td[position()>0]", document, null, 7, null);

            var divElement = document.createElement("div");
            for (i = 0; i < snap.snapshotLength; i++) {
                var tdElement = snap.snapshotItem(i);
                tdElement = tdElement.wrappedJSObject || tdElement;
                if (tdElement.boxOver) {
                    divElement.innerHTML = tdElement.boxOverBody;
                    var rewards = divElement.firstChild.rows[3].cells[1].textContent;
                    snap.snapshotItem(i).style.border = (rewards.indexOf(searchString) === -1) ? "1px solid black" : "1px solid #3F3";
                }
            }
        }
    };

    var getScheduleState = function () {
        var snap = document.evaluate("//td[@width=904]//td/table//tr[position() > 1]/td[position() > 1]", document, null, 7, null);
        var i, state = [];
        for (i = 0; i < snap.snapshotLength; i++) {
            state[i] = snap.snapshotItem(i).className;
        }

        return state;
    };

    var loadScheduleState = function (state) {
        var snap = document.evaluate("//td[@width=904]//td/table//tr[position() > 1]/td[position() > 1]", document, null, 7, null);
        if (state.length === snap.snapshotLength) {
            var i;
            for (i = 0; i < snap.snapshotLength; i++) {
                snap.snapshotItem(i).className = state[i];
            }
        }
    };

    var initSchedule = function () {
        addStyle([
            ".conTable {width: 100%; border-spacing: 0px; color:white; font-size:11px; margin-top: 10px; margin-bottom: 5px;}",
            ".conTable tbody tr td {border: 1px solid white; padding: 3px; font-family: Arial; font-size:11px;}",
            ".conVideo1 {background-color: #005300; padding:5px; min-width:365px; max-width:500px;}",
            ".conPanels1 {background-color: #000060; padding:5px; min-width:365px; max-width:500px;}",
            ".conPanels2 {background-color: #004444; padding:5px; min-width:365px; max-width:500px;}",
            ".conPanels3 {background-color: #444400; padding:5px; min-width:365px; max-width:500px;}",
            ".conOddJobs {background-color: #440044; padding:5px; min-width:365px; max-width:500px;}",
            ".conBackstage1 {background-color: #660000; padding:5px; min-width:365px; max-width:500px;}",
            ".conVideo1H {background: #005300 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAUCAIAAADDbMD2AAAAHElEQVQImWNgmMrAxPCXgYnhD5T+i4WPi40pBwD8ehN9h+QXNAAAAABJRU5ErkJggg==) repeat-x top left; color: white; padding-left: 10px;}",
            ".conPanels1H {background: #000060 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAUCAIAAADDbMD2AAAAGElEQVQImWNgYFjCxMDwl4mB4Q8aTZYYAO1dE4oKaHmWAAAAAElFTkSuQmCC) repeat-x top left; color: white; padding-left: 10px;}",
            ".conPanels2H {background: #004444 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAUCAIAAADDbMD2AAAAFklEQVQImWNgyM5mYvj3jzD+/58YdQDNfSazfj4KhQAAAABJRU5ErkJggg==) repeat-x top left; color: white; padding-left: 10px;}",
            ".conPanels3H {background: #444400 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAUCAIAAADDbMD2AAAAFUlEQVQImWPIzmZg+vePMP7/nyh1APQJJrNBRmMcAAAAAElFTkSuQmCC) repeat-x top left; color: white; padding-left: 10px;}",
            ".conOddJobsH {background: #444400 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAUCAIAAADDbMD2AAAAF0lEQVQImWOoZ6hn+svwlyD+x/CPGHUA508mtdHTxuUAAAAASUVORK5CYII=) repeat-x top left; color: white; padding-left: 10px;}",
            ".conBackstage1H {background: #660000 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAUCAIAAADDbMD2AAAAE0lEQVQImWP4yMDA9JMI/Is4dQAhsBOUXuZveAAAAABJRU5ErkJggg==) repeat-x top left; color: white; padding-left: 10px;}",
            ".conSelected {background-color: #D3FEFA; color: black;}"
        ].join("\n"));

        addStyle([
            ".spinner {width: 20px; height: 20px; border: 1px solid #7f9db9; position: relative; padding-right: 15px; text-align: right;}",
            ".spinner button {width: 11px; height: 10px; padding: 0px; position: absolute; right: 0; border: 0px; border-left: 1px solid #7f9db9;}",
            ".spinner .up {top: 0; background: #c9d8fc url(data:image/gif;base64,R0lGODlhCQAFAIABAE1hhf%2F%2F%2FyH5BAEAAAEALAAAAAAJAAUAAAIMjAOnwIrcDHxpSlYAADs%3D) left center no-repeat;}",
            ".spinner .down {bottom: 0; background: #c9d8fc url(data:image/gif;base64,R0lGODlhCQAFAIABAE1hhf%2F%2F%2FyH5BAEAAAEALAAAAAAJAAUAAAIMhIMGoXypFoJyJlsAADs%3D) left center no-repeat;}"
        ].join("\n"));

        addTimes();
        restyleTable();

        var searchBox = document.createElement("input");
        searchBox.type = "text";
        searchBox.style.position = "fixed";
        searchBox.style.top = "3px";
        searchBox.style.left = "5px";
        var acOptions = ["Alpha Cancel", "Antidrama", "Artsiness",
                "Chillaxing", "Combat Sewing", "Crossplay", "Cosplay", "Crowdswimming",
                "Dance", "Drama", "Flipping Out", "Frame Advantage",
                "GeoSense", "Glomping", "Glowsticking", "Guard Crush",
                "Knowledge", "Macking", "Photography", "Posing",
                "Reputation", "Rocking", "Schmoozing", "Shopping",
                "Silence", "Staring", "Tech Punish", "The Angles",
                "Use Rope", "Veteran", "Videogaming", "Wake-Up Reversal", "Wrangling",
                "Cool", "Monies", "Nom", "Sleep", "Stink", "Award"
                ];
        AutoComplete().init(searchBox, acOptions);
        searchBox.addEventListener("keyup", searchReward, false);
        document.body.appendChild(searchBox);

        var tabViewDiv = document.createElement("div");
        tabViewDiv.id = "tabView";
        tabViewDiv.style.position = "fixed";
        tabViewDiv.style.top = "3px";
        tabViewDiv.style.right = "5px";
        document.body.appendChild(tabViewDiv);

        /******************************  Skills tab  ******************************/
        var skillsDiv = document.createElement("div");
        skillsDiv.innerHTML = skillLevel;

        var savedData = JSON.parse(localStorage.getItem("BvS_BillyCon_Data") || "{}");
        var getSkillsInnerHTML = function (playerData) {
            var i, j;
            var skillsObject = playerData.skills;
            intentObservation = playerData.intentObservation || 3;
            var skillsInnerHTML = '<table width="95%">';
            for (i = 0; i < skillsObject.length; i++) {
                if (skillsObject[i]) {
                    skillsInnerHTML += '<tr><td style="background-color: #dee0f2; text-align: center;"><b>Level ' + i + '</b></td></tr><tr><td>';
                    for (j = 0; j < skillsObject[i].length; j++) {
                        skillLevel[skillsObject[i][j]] = i;
                        skillsInnerHTML += '<div style="border-left:2px solid #d4d6ee; padding-left: 0.4em">' + skillsObject[i][j] + '</div>';
                    }
                    skillsInnerHTML += '</td></tr>';
                }
            }
            skillsInnerHTML += '</table>';
            return skillsInnerHTML;
        };

        if (savedData.lastPlayer) {
            skillsDiv.innerHTML = getSkillsInnerHTML(savedData.playerData[savedData.lastPlayer]);
            skillsDiv.style.maxHeight = "400px";
            skillsDiv.style.overflowY = "scroll";
        } else {
            skillsDiv.innerHTML = "Skills could not be loaded.<br/>You need to visit your BillyCon Page. If you still can't see them, update your browser.";
        }
        skillLevel["Sleep"] = 8;
        skillLevel["Stink"] = -4;
        skillLevel["Nom"] = 8;
        skillLevel["Cool"] = 11;
        skillLevel["Monies"] = 22;

        /******************************  Tunning tab  ******************************/
        var tuningDiv = document.createElement("div");
        var i;
        tuningDiv.innerHTML = "<table style='text-align:right'>"
            + "<tr><td>Intent Observation:</td><td/></tr>"
            + "<tr><td>Front Row:</td><td/></tr>"
            + "<tr><td>Glomped:</td><td/></tr>"
            + "<tr><td>Use Flow:</td><td><input type='checkbox' id='useflow'/></td></tr>"
            + "<tr><td>Strut Stuff:</td><td><input type='checkbox' id='strutstuff'/></td></tr>"
            + "<tr><td>Sun Glasses:</td><td><input type='checkbox' id='sunglasses'/></td></tr>"
            + "<tr><td>Foam Hand:</td><td><input type='checkbox' id='foamhand'/></td></tr>"
            + "<tr><td>Nice Boat:</td><td><input type='checkbox' id='niceboat'/></td></tr>"
            + "<tr><td>Low-Cut Kimono:</td><td><input type='checkbox' id='lowcutkimono'/></td></tr>"
            + "<tr><td>Import Rig:</td><td><input type='checkbox'id='importrig'/></td></tr>"
            + "</table>";
        var div = document.createElement("div");
        Spinner().init(div, intentObservation, 0, 3, updateTune, "Intent Observation");
        tuningDiv.firstChild.rows[0].cells[1].appendChild(div);
        var intentObservationDiv = div;
        div = document.createElement("div");
        Spinner().init(div, 0, 0, 2, updateTune, "Front Row");
        tuningDiv.firstChild.rows[1].cells[1].appendChild(div);
        div = document.createElement("div");
        Spinner().init(div, 0, 0, 5, updateTune, "Glomped");
        tuningDiv.firstChild.rows[2].cells[1].appendChild(div);
        for (i = 3; i < 10; i++) {
            if (tuningDiv.firstChild.rows[i].cells[1].firstChild.wrappedJSObject) {
                tuningDiv.firstChild.rows[i].cells[1].firstChild.wrappedJSObject.onclick = updateToggle;
            } else {
                tuningDiv.firstChild.rows[i].cells[1].firstChild.onclick = updateToggle;
            }
        }

        /******************************  Stats tab  ******************************/
        var statsDiv = document.createElement("div");
        statsDiv.innerHTML = "<table style='text-align: right'>"
            + "<tr><td>Sleep:</td><td/></tr>"
            + "<tr><td>Stink:</td><td/></tr>"
            + "<tr><td>Nom:</td><td/></tr>"
            + "<tr><td>Cool:</td><td/></tr>"
            + "<tr><td>Monies:</td><td/></tr>"
            + "</table>";
        div = document.createElement("div");
        Spinner().init(div, 8, 0, 15, updateStat, "Sleep");
        statsDiv.firstChild.rows[0].cells[1].appendChild(div);
        div = document.createElement("div");
        Spinner().init(div, -4, -4, 10, updateStat, "Stink");
        statsDiv.firstChild.rows[1].cells[1].appendChild(div);
        div = document.createElement("div");
        Spinner().init(div, 8, 0, 8, updateStat, "Nom");
        statsDiv.firstChild.rows[2].cells[1].appendChild(div);
        div = document.createElement("div");
        Spinner().init(div, 11, -9, 30, updateStat, "Cool");
        statsDiv.firstChild.rows[3].cells[1].appendChild(div);
        div = document.createElement("div");
        Spinner().init(div, 22, 0, 50, updateStat, "Monies");
        statsDiv.firstChild.rows[4].cells[1].appendChild(div);

        /******************************  Load tab  ******************************/
        var scheduleStates = JSON.parse(localStorage.getItem("BvS_BillyCon_Schedule") || '{}');

        var onSaveButton = function (e) {
            var target = getTarget(e);
            var name = target.previousSibling.value;
            target.previousSibling.value = "";
            var state = getScheduleState();
            if (name.length) {
                if (scheduleStates[name] === null) {
                    var option = document.createElement("option");
                    option.text = name;
                    option.value = name;
                    target.parentNode.parentNode.nextElementSibling.firstChild.firstChild.add(option, null);
                }
                scheduleStates[name] = state;
                localStorage.setItem("BvS_BillyCon_Schedule", JSON.stringify(scheduleStates));
            } else {
                alert("Please enter a name");
            }
        };
        var onDeleteButton = function (e) {
            var target = getTarget(e);
            var selectList = target.parentNode.firstChild;
            var selectedIndex = selectList.selectedIndex;
            if (selectedIndex !== -1) {
                delete scheduleStates[selectList[selectedIndex].value];
                selectList.remove(selectedIndex);
                localStorage.setItem("BvS_BillyCon_Schedule", JSON.stringify(scheduleStates));
            }
        };
        var onLoadButton = function (e) {
            var target = getTarget(e);
            var selectList = target.parentNode.firstChild;
            var selectedIndex = selectList.selectedIndex;
            if (selectedIndex !== -1) {
                loadScheduleState(scheduleStates[selectList[selectedIndex].value]);
            }
        };
        var onChangePlayer = function (e) {
            var playerData = savedData.playerData[getTarget(e).value];
            skillsDiv.innerHTML = getSkillsInnerHTML(playerData);
            intentObservationDiv.firstChild.data = playerData.intentObservation;
            addEventsData();
        };
        var loadDiv = document.createElement("div");
        var loadDivInnerHTML = '<b>Schedule State:</b><table>'
            + '<tr><td><input type="text" size=10/><button type="button">Save</button></td></tr>'
            + '<tr><td><select>';
        for (i in scheduleStates) {
            if (scheduleStates.hasOwnProperty(i)) {
                loadDivInnerHTML += '<option value="' + i + '">' + i + '</option>';
            }
        }
        loadDivInnerHTML += '</select><button type="button">Load</button><button type="button">Delete</button></td></tr></table>';
        loadDivInnerHTML += '<hr/><b>Player:</b><select>';
        var playerName, indexToSelect = 0;
        i = 0;
        for (playerName in savedData.playerData) {
            if (savedData.playerData.hasOwnProperty(playerName)) {
                loadDivInnerHTML += '<option value="' + playerName + '">' + playerName + '</option>';
                if (playerName === savedData.lastPlayer) {
                    indexToSelect = i;
                }
                i++;
            }
        }
        loadDivInnerHTML += '</select>';
        loadDiv.innerHTML = loadDivInnerHTML;
        if (loadDiv.wrappedJSObject) {
            loadDiv.children[1].rows[0].cells[0].lastChild.wrappedJSObject.onclick = onSaveButton;
            loadDiv.children[1].rows[1].cells[0].lastChild.wrappedJSObject.onclick = onDeleteButton;
            loadDiv.children[1].rows[1].cells[0].children[1].wrappedJSObject.onclick = onLoadButton;
            loadDiv.lastChild.wrappedJSObject.selectedIndex = indexToSelect;
            loadDiv.lastChild.wrappedJSObject.onchange = onChangePlayer;
        } else {
            loadDiv.children[1].rows[0].cells[0].lastChild.onclick = onSaveButton;
            loadDiv.children[1].rows[1].cells[0].lastChild.onclick = onDeleteButton;
            loadDiv.children[1].rows[1].cells[0].children[1].onclick = onLoadButton;
            loadDiv.lastChild.selectedIndex = indexToSelect;
            loadDiv.lastChild.onchange = onChangePlayer;
        }

        tabViewDiv.appendChild(document.createElement("div"));
        tabViewDiv.appendChild(tuningDiv);
        tabViewDiv.appendChild(statsDiv);
        tabViewDiv.appendChild(skillsDiv);
        tabViewDiv.appendChild(loadDiv);
        TabView().init("tabView", ["Hide", "Tuning", "Stats", "Skills", "Load"], 0, 200);

        addEventsData();

        var changeStats = function (event) {
            if (!event.ctrlKey && !event.altKey && event.target.tagName !== "INPUT") {
                if (event.keyCode === 72) {
                    alert("Hot Keys:\nF: Toogle Flow\nS: Toggle Strut Stuff");
                } else {
                    if (event.keyCode === 70) {
                        useFlow = !useFlow;
                        document.getElementById("useflow").checked = useFlow;
                        addEventsData();
                    }
                    if (event.keyCode === 83) {
                        strutStuff = !strutStuff;
                        document.getElementById("strutstuff").checked = strutStuff;
                        addEventsData();
                    }
                }
            }
        };
        window.addEventListener("keyup", changeStats, false);
    };

    var initPacking = function () {
        var i, j;
        var form = document.forms;
        if (form.wrappedJSObject) {
            form = form.wrappedJSObject;
            i = 0;
            while (form[i].name !== 'conroom') {
                i++;
            }
            form = form[i];
            if (form.wrappedJSObject) {
                form = form.wrappedJSObject;
            }
        } else {
            form = form['conroom'];
        }

        if (form && /name="packit"/.test(form.innerHTML)) {
            addStyle([
                ".spinner {width: 20px; height: 20px; border: 1px solid #7f9db9; position: relative; padding-right: 15px; text-align: right;}",
                ".spinner button {width: 11px; height: 10px; padding: 0px; position: absolute; right: 0; border: 0px; border-left: 1px solid #7f9db9;}",
                ".spinner .up {top: 0; background: #c9d8fc url(data:image/gif;base64,R0lGODlhCQAFAIABAE1hhf%2F%2F%2FyH5BAEAAAEALAAAAAAJAAUAAAIMjAOnwIrcDHxpSlYAADs%3D) left center no-repeat;}",
                ".spinner .down {bottom: 0; background: #c9d8fc url(data:image/gif;base64,R0lGODlhCQAFAIABAE1hhf%2F%2F%2FyH5BAEAAAEALAAAAAAJAAUAAAIMhIMGoXypFoJyJlsAADs%3D) left center no-repeat;}",
                ".cppselected {background-image: none !important;}",
                ".partsTable {border-collapse: collapse}",
                ".partsTable td{background-color: #f4f9fe; border: 1px solid #888; padding-left: 4px; padding-right: 4px;}",
                ".partsTable th{background: #d4deef url(\"data:image/gif;base64,R0lGODlhAQAUAMQAAPT3+9Te79rj8eju9vn6/d/m8+Ho9Pf5/Ovv9/H1+uXr9dXf79fh8P3+/vz8/u7y+dzk8v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABABQAAAUQYCQ2DnEAyYMMilFAArMEIQA7\") center repeat-x; border: 1px solid #888; cursor: pointer;}"
            ].join("\n"));

            var data = form.innerHTML;
            var itemsRegExp = /<input type="text" name="(pack-\w{2})" value="0" size="2"> (\d) <b>(.+?)<\/b> \(Size: (\d)\)<br><i>\((.+?)\)/g;

            var items = [];
            i = 0;
            var match = itemsRegExp.exec(data);
            if (match === null) {
                itemsRegExp = /<input name="(pack-\w{2})" value="0" size="2" type="text"> (\d) <b>(.+?)<\/b> \(Size: (\d)\)<br><i>\((.+?)\)/g;
                match = itemsRegExp.exec(data);
            }
            while (match !== null) {
                items[i++] = [match[1], match[2], match[3], match[4], match[5]];
                if (form[match[1]]) {
                    form[match[1]].type = 'hidden';
                } else {
                    for (j = 0; j < form.children.length; j++) {
                        if (form.children[j].name === match[1]) {
                            form.children[j].type = 'hidden';
                        }
                    }
                }
                match = itemsRegExp.exec(data);
            }
            items.sort(function (a, b) {
                return a[2] > b[2];
            });
            form.innerHTML = form.innerHTML.replace(/ \d <b>.+?<\/b> \(Size: \d\)<br><i>\(.+?\)<\/i><br><br>/g, "");

            var spaces = parseInt(form.parentNode.innerHTML.match(/[\d]{1,2}(?= Spaces)/), 10);

            var totalElement = document.createElement('div');
            totalElement.style.textAlign = 'center';
            totalElement.style.width = '100%';
            i = document.createElement('b');
            i.innerHTML = 'Total Packed: ';
            totalElement.appendChild(i);
            i = document.createElement('span');
            i.style.paddingLeft = '5px';
            i.style.paddingRight = '5px';
            totalElement.appendChild(i);
            form.parentNode.insertBefore(totalElement, form);

            var link = document.createElement('a');
            link.href = 'javascript:document.conroom.submit();';
            link.style.color = '#a10000';
            link.style.fontWeight = 'bold';
            link.innerHTML = 'Choose These Stuffs &gt;';
            totalElement.parentNode.insertBefore(link, totalElement);

            totalElement = i;


            var partsTable = document.createElement('table');
            partsTable.className = 'partsTable';
            var partsTotalElement = document.createElement('span');

            var getAverage = function (s, extraDie) {
                var partValueRegExp = /(\d)d(\d{1,2})([-+]\d)?/;
                var match = partValueRegExp.exec(s);
                var die = parseInt(match[1], 10) + extraDie;
                var range = parseInt(match[2], 10);
                var bonus = match[3] ? parseInt(match[3], 10) : 0;
                return (die + bonus * 2 + die * range) / 2;
            };
            var updateTotal = function () {
                var i, j, total = 0;
                for (i = 0; i < items.length; i++) {
                    if (form[items[i][0]]) {
                        total += form[items[i][0]].value * items[i][3];
                    } else {
                        for (j = 0; j < form.children.length; j++) {
                            if (form.children[j].name === items[i][0]) {
                                total += form.children[j].value * items[i][3];
                            }
                        }
                    }
                }

                var parts = partsTable.getElementsByTagName('input');
                var partsAverage = 0;
                var boxOfHedz = document.getElementById('pack-bh');
                boxOfHedz = boxOfHedz ? (boxOfHedz.checked ? 1 : 0) : 0;
                var selectedParts = [];
                
                j = 0;
                for (i = 0; i < parts.length; i++) {
                    if (parts[i].checked) {
                        total++;
                        partsAverage += getAverage(parts[i].nextSibling.innerHTML, boxOfHedz);
                        selectedParts[j++] = parts[i];
                    }
                }
                if (selectedParts.length === 3) {
                    if (selectedParts[0].parentNode.parentNode === selectedParts[1].parentNode.parentNode && selectedParts[0].parentNode.parentNode === selectedParts[2].parentNode.parentNode) {
                        partsAverage += getAverage(selectedParts[0].parentNode.parentNode.lastChild.innerHTML, 0);
                    }
                }
                partsTotalElement.innerHTML = partsAverage;

                if (total < spaces) {
                    totalElement.style.backgroundColor = '#CFF';
                    total = '&nbsp;&nbsp;' + total;
                } else if (total === spaces) {
                    totalElement.style.backgroundColor = '#6F6';
                } else {
                    totalElement.style.backgroundColor = '#F99';
                }
                totalElement.innerHTML = total;

            };
            updateTotal();

            var updateSpinner = function (input, newValue) {
                var i;
                if (form[input]) {
                    form[input].value = newValue;
                } else {
                    for (i = 0; i < form.children.length; i++) {
                        if (form.children[i].name === input) {
                            form.children[i].value = newValue;
                        }
                    }
                }
                updateTotal();
            };

            var newForm = document.createElement("form");
            var spinnerContainer = document.createElement("div");
            form.parentNode.insertBefore(spinnerContainer, form);
            for (i = 0; i < items.length; i++) {
                var sizeLabel = document.createElement("span");
                var infoLabel = document.createElement("span");

                if (items[i][0][5] !== 'x') {
                    var checkbox = document.createElement("input");
                    checkbox.id = items[i][0];
                    checkbox.name = items[i][0];
                    checkbox.type = 'checkbox';
                    sizeLabel.innerHTML = "Size: " + items[i][3];
                    infoLabel.innerHTML = '<label for="' + items[i][0] + '"><b>' + items[i][2] + "</b> <i>(" + items[i][4] + ")</i></label>";
                    newForm.appendChild(sizeLabel);
                    newForm.appendChild(checkbox);
                    newForm.appendChild(infoLabel);
                    newForm.appendChild(document.createElement("br"));
                } else {
                    var spinner = document.createElement("span");
                    Spinner().init(spinner, 0, 0, items[i][1], updateSpinner, items[i][0]);

                    sizeLabel.innerHTML = "Size: " + items[i][3] + " ";
                    infoLabel.innerHTML = " <b>" + items[i][2] + "</b> <i>(" + items[i][4] + ")</i>";
                    spinnerContainer.appendChild(sizeLabel);
                    spinnerContainer.appendChild(spinner);
                    spinnerContainer.appendChild(infoLabel);
                    spinnerContainer.appendChild(document.createElement("br"));
                }
            }
            form.parentNode.insertBefore(newForm, form);
            var onInputClick = function (e) {
                var i, target = getTarget(e);
                if (target.nodeName.toLowerCase() === 'input') {
                    if (form[target.name]) {
                        form[target.name].value = target.checked ? 1 : 0;
                    } else {
                        for (i = 0; i < form.children.length; i++) {
                            if (form.children[i].name === target.name) {
                                form.children[i].value = target.checked ? 1 : 0;
                            }
                        }
                    }
                    updateTotal();
                }
            };
            newForm = newForm.wrappedJSObject || newForm;
            newForm.onclick = onInputClick;

            /* Cosplay Parts */
            var table = form.getElementsByTagName('table')[0];
            var ul = table.parentNode;

            var partsRegExp = />(.+?) (\w{4}) \(([-+\dd]{3,6})( Qty: (\d))?\) \(Full set bonus ([-+\dd]{3,6})\)/;
            var cosplays = [];
            var cosplayNames = [];
            var rows = table.rows;
            for (i = 0; i < rows.length; i++) {
                match = partsRegExp.exec(rows[i].cells[1].innerHTML);
                var id = rows[i].cells[0].firstChild.id.slice(3);
                if (cosplayNames[cosplayNames.length - 1] !== match[1]) {
                    cosplayNames.push(match[1]);
                    cosplays[match[1]] = [];
                    cosplays[match[1]]['Full'] = match[6];
                }
                cosplays[match[1]][match[2]] = [match[3], match[5] || 1, id];
            }
            var onPartClick = function (e) {
                var target = getTarget(e);
                if (target.nodeName.toLowerCase() === 'input') {
                    updateTotal();
                }
            }
            for (i = 0; i < cosplayNames.length; i++) {
                var name = cosplayNames[i];
                var cosplay = cosplays[name];
                var head = cosplay['Head'] === undefined ? false : cosplay['Head'];
                var body = cosplay['Body'] === undefined ? false : cosplay['Body'];
                var prop = cosplay['Prop'] === undefined ? false : cosplay['Prop'];
                var row = partsTable.insertRow(-1);
                row.innerHTML = "<td>" + name + "</td>" +
                    '<td style="background-color: ' + (head ? (head[1] > 1 ? (head[1] > 2 ? '#FF0' :'#6FF') : '#9F9') : '#FC9') + '"' + ((head && head[1] > 1) ? 'title="' + head[1] + '"' : '') + '>' + (head ? '<input type="checkbox" name="pack&' + head[2] + '" id ="cpp' + head[2] + '"><label for="cpp' + head[2] + '" title="Average: ' + getAverage(head[0], 0) + " | with BOX O' HEDZ: " + getAverage(head[0], 1) + '">' + head[0] + "</label>" : "") + "</td>" +
                    '<td style="background-color: ' + (body ? (body[1] > 1 ? (body[1] > 2 ? '#FF0' :'#6FF') : '#9F9') : '#FC9') + '"' + ((body && body[1] > 1) ? 'title="' + body[1] + '"' : '') + '>' + (body ? '<input type="checkbox" name="pack&' + body[2] + '" id ="cpp' + body[2] + '"><label for="cpp' + body[2] + '" title="Average: ' + getAverage(body[0], 0) + '">' + body[0] + "</label>" : "") + "</td>" +
                    '<td style="background-color: ' + (prop ? (prop[1] > 1 ? (prop[1] > 2 ? '#FF0' :'#6FF') : '#9F9') : '#FC9') + '"' + ((prop && prop[1] > 1) ? 'title="' + prop[1] + '"' : '') + '>' + (prop ? '<input type="checkbox" name="pack&' + prop[2] + '" id ="cpp' + prop[2] + '"><label for="cpp' + prop[2] + '" title="Average: ' + getAverage(prop[0], 0) + '">' + prop[0] + "</label>" : "") + "</td>" +
                    '<td title="' + (cosplay['Full'] === undefined ? "" : "Average: " + getAverage(cosplay['Full'], 0)) + '">' + (cosplay['Full'] === undefined ? "" : cosplay['Full']) + "</td>";
            }

            var sortParts = function (e) {
                var target = getTarget(e);
                var i;
                if (target.nodeName.toLowerCase() === 'th') {
                    var children = target.parentNode.children;
                    var index = -1;
                    for (i = 0; i < children.length; i++) {
                        children[i].className = '';
                        if (children[i] === target) {
                            index = i;
                        }
                    }
                    children[index].className = 'cppselected';

                    var tbody = document.createElement('tbody');
                    var table = target.parentNode.parentNode.parentNode;
                    var oldTbody = table.lastChild;
                    table.removeChild(oldTbody);
                    oldTbody = oldTbody.children;

                    var boxOfHedz = document.getElementById('pack-bh');
                    boxOfHedz = boxOfHedz ? (boxOfHedz.checked ? 1 : 0) : 0;
                    while (oldTbody.length > 0) {
                        var min = index === 0 ? oldTbody[0].children[index].innerHTML : 0;
                        var indexMin = 0;
                        for (i = 0; i < oldTbody.length; i++) {
                            var rowValue = 0;
                            switch (index) {
                                case 0:
                                    rowValue = oldTbody[i].children[index].innerHTML;
                                    break;
                                case 1:
                                    if (oldTbody[i].children[index].children.length > 0) {
                                        rowValue = getAverage(oldTbody[i].children[index].lastChild.innerHTML, boxOfHedz);
                                    }
                                    break;
                                case 2:
                                case 3:
                                    if (oldTbody[i].children[index].children.length > 0) {
                                        rowValue = getAverage(oldTbody[i].children[index].lastChild.innerHTML, 0);
                                    }
                                    break;
                                case 4:
                                    var j, totalAverage = 0;
                                    for (j = 1; j < 4; j++) {
                                        if (oldTbody[i].children[j].innerHTML !== "") {
                                            rowValue += 10 + j;
                                            totalAverage += getAverage(oldTbody[i].children[j].lastChild.innerHTML, j === 1 ? boxOfHedz : 0);
                                        }
                                        if (rowValue > 30) {
                                            rowValue += totalAverage + getAverage(oldTbody[i].children[4].innerHTML, 0);
                                        }
                                    }
                                    break;
                            }

                            if (index === 0 ? min > rowValue : min < rowValue) {
                                min = rowValue;
                                indexMin = i;
                            }
                        }

                        tbody.appendChild(oldTbody[indexMin]);
                    }

                    table.appendChild(tbody);
                }
            };

            var tableHead = document.createElement('thead');
            var headRow = document.createElement('tr');
            headRow.addEventListener('click', sortParts, false);
            tableHead.appendChild(headRow);
            var headCell = document.createElement('th');
            headCell.innerHTML = "Cosplay";
            headCell.className = 'cppselected';
            headRow.appendChild(headCell);
            headCell = document.createElement('th');
            headCell.innerHTML = "Head";
            headRow.appendChild(headCell);
            headCell = document.createElement('th');
            headCell.innerHTML = "Body";
            headRow.appendChild(headCell);
            headCell = document.createElement('th');
            headCell.innerHTML = "Prop";
            headRow.appendChild(headCell);
            headCell = document.createElement('th');
            headCell.innerHTML = "Full";
            headRow.appendChild(headCell);

            partsTable.insertBefore(tableHead, partsTable.firstChild);

            ul.parentNode.insertBefore(partsTable, ul);
            ul.parentNode.removeChild(ul);
            partsTable.addEventListener('click', onPartClick, false);

            ul = document.createElement('div');
            ul.innerHTML = "<b>Selected Parts Average:</b> ";
            ul.appendChild(partsTotalElement);
            partsTable.parentNode.insertBefore(ul, partsTable);
        }
    };

    var initCosplayChar = function () {
        var i, j;
        addStyle([
            '.cppselected {background-image: none !important;}',
            '.partsTable {border-collapse: collapse; margin: 10px 0px;}',
            '.partsTable td{background-color: #f4f9fe; border: 1px solid #888; padding-left: 4px; padding-right: 4px;}',
            '.partsTable th{background: #d4deef url("data:image/gif;base64,R0lGODlhAQAUAMQAAPT3+9Te79rj8eju9vn6/d/m8+Ho9Pf5/Ovv9/H1+uXr9dXf79fh8P3+/vz8/u7y+dzk8v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABABQAAAUQYCQ2DnEAyYMMilFAArMEIQA7") center repeat-x; border: 1px solid #888; cursor: pointer;}'
        ].join('\n'));

        var cosplay, cosplays = [];
        var snap = document.evaluate('//table[@width="80%"]//table/tbody/tr[position()>1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (i = 0; i < snap.snapshotLength; i += 2) {
            cosplay = [];
            cosplay[0] = snap.snapshotItem(i).textContent.replace(/\s+\(Hot!\)/i, '');
            var stats = snap.snapshotItem(i + 1).textContent.match(/(Qty: \d+\()?\d+d\d+([+-]\d+)?|\?{3}/g);
            if (stats.length === 4) {
                for (j = 0; j < 4; j++) {
                    if (stats[j] !== '???') {
                        var match = stats[j].match(/(\d+)?\(?(\d+d\d+([+-]\d+)?)/i);
                        cosplay[j + 1] = [match[1] === undefined ? 0 : match[1], match[2]];
                    } else {
                        cosplay[j + 1] = false;
                    }
                }
                if (/\s+\(Hot!\)/i.test(snap.snapshotItem(i).textContent)) {
                    cosplay.push(true);
                }
                cosplays.push(cosplay);
            }
        }
        var partsTable = document.createElement('table');
        partsTable.className = 'partsTable';

        for (i = 0; i < cosplays.length; i++) {
            cosplay = cosplays[i];
            var cosplayRow = '<td' + (cosplay[5] ? ' style="background-color: #9F9;" title="Hot"' : '') + '>' + cosplay[0] + '</td>';
            for (j = 1; j < 4; j++) {
                var color = cosplay[j] ? (cosplay[j][0] > 1 ? (cosplay[j][0] > 2 ? '#FF0' : '#6FF') : '#9F9') : '#FC9';
                cosplayRow += '<td style="background-color: ' + color + '"' + (cosplay[j][0] > 1 ? 'title="' + cosplay[j][0] + '"' : '') + '>' + (cosplay[j] ? cosplay[j][1] : '') + '</td>';
            }
            cosplayRow += '<td>' + cosplay[4][1] + '</td>';

            var row = partsTable.insertRow(-1);
            row.innerHTML = cosplayRow;
        }

        var getAverage = function (s, extraDie) {
            var partValueRegExp = /(\d)d(\d{1,2})([-+]\d)?/;
            var match = partValueRegExp.exec(s);
            var die = parseInt(match[1]) + extraDie;
            var range = parseInt(match[2]);
            var bonus = match[3] ? parseInt(match[3]) : 0;
            return (die + bonus * 2 + die * range) / 2;
        };
        var sortParts = function(e) {
            var target = getTarget(e);
            if(target.nodeName.toLowerCase() === 'th') {
                var children = target.parentNode.children;
                var index = -1;
                for (var i = 0; i < children.length; i++) {
                    children[i].className = '';
                    if (children[i] === target) {
                        index = i;
                    }
                }
                children[index].className = 'cppselected';

                var tbody = document.createElement('tbody');
                var table = target.parentNode.parentNode.parentNode;
                var oldTbody = table.lastChild;
                table.removeChild(oldTbody);
                oldTbody = oldTbody.children;

                var boxOfHedz = document.getElementById('pack-bh');
                boxOfHedz = boxOfHedz ? (boxOfHedz.checked ? 1 : 0) : 0;
                while (oldTbody.length > 0) {
                    var min = index === 0 ? oldTbody[0].children[index].innerHTML : 0;
                    var indexMin = 0;
                    for (i = 0; i < oldTbody.length; i++) {
                        var rowValue = 0;
                        switch (index) {
                            case 0:
                                rowValue = oldTbody[i].children[index].innerHTML;
                                break;
                            case 1:
                                if (oldTbody[i].children[index].innerHTML !== '') {
                                    rowValue = getAverage(oldTbody[i].children[index].innerHTML, boxOfHedz);
                                }
                                break;
                            case 2:
                            case 3:
                                if (oldTbody[i].children[index].innerHTML !== '') {
                                    rowValue = getAverage(oldTbody[i].children[index].innerHTML, 0);
                                }
                                break;
                            case 4:
                                var totalAverage = 0;
                                for (j = 1; j < 4; j++) {
                                    if (oldTbody[i].children[j].innerHTML !== '') {
                                        rowValue += 10 + j;
                                        totalAverage += getAverage(oldTbody[i].children[j].innerHTML, j == 1 ? boxOfHedz : 0);
                                    }
                                    if (rowValue > 30){
                                        rowValue += totalAverage + getAverage(oldTbody[i].children[4].innerHTML, 0);
                                    }
                                }
                                break;
                        }

                        if(index === 0 ? min > rowValue : min < rowValue){
                            min = rowValue;
                            indexMin = i;
                        }
                    }

                    tbody.appendChild(oldTbody[indexMin]);
                }

                table.appendChild(tbody);
            }
        }

        var tableHead = document.createElement('thead');
        var headRow = document.createElement('tr');
        headRow.addEventListener('click', sortParts, false);
        tableHead.appendChild(headRow);
        var headCell = document.createElement('th');
        headCell.innerHTML = "Cosplay";
        headCell.className = 'cppselected';
        headRow.appendChild(headCell);
        headCell = document.createElement('th');
        headCell.innerHTML = "Head";
        headRow.appendChild(headCell);
        headCell = document.createElement('th');
        headCell.innerHTML = "Body";
        headRow.appendChild(headCell);
        headCell = document.createElement('th');
        headCell.innerHTML = "Prop";
        headRow.appendChild(headCell);
        headCell = document.createElement('th');
        headCell.innerHTML = "Full";
        headRow.appendChild(headCell);

        partsTable.insertBefore(tableHead, partsTable.firstChild);

        var originalTable = snap.snapshotItem(0).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        originalTable.parentNode.insertBefore(partsTable, originalTable);
        originalTable.style.display = 'none';

        var boh = document.createElement('div');
        boh.innerHTML = '<input type="checkbox" id="pack-bh"/><label for="pack-bh"><b>BOX O\' HEDZ</b></label>';
        partsTable.parentNode.insertBefore(boh, partsTable);
    }

    return{
        init:function(){
            var i;
            for (i = 1; i < 10; i++)
                factorial[i] = factorial[i - 1] * i;

            if(/billycon-schedule\.html/.test(location.pathname)){
                initSchedule();
            } else {
                playerName = document.getElementsByName("player")[0].value;
                sortSkills();
                if (/billycon-character.html/.test(location.pathname)) {
                    initCosplayChar();
                } else if (/billycon\.html/.test(location.pathname)) {
                    addMissingRewards();
                    
                    try {
                        document.getElementById("useflow").addEventListener("click", computeChance, true);
                        var strut = document.getElementsByName("strut");
                        if (strut.length > 0) {
                            strut[0].addEventListener("click", computeChance, true);
                        }
                        computeChance();
                    } catch (e) {}

                    try {
                        initPacking();
                    } catch (e) {}
                    
                }
                window.addEventListener("keyup", switchOption, false);
            }
        }
    }
}

BillyCon().init();