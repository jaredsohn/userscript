// ==UserScript==
// @name           LiveJournal Rage Goggles
// @namespace      http://afunamatata.com/greasemonkey/
// @description    Solve an equation before your comment will post. Forces you to think twice before posting that comment you will (potentially) regret.
// @include        http://*.livejournal.com/*.html*
// @include        http://www.livejournal.com/talkpost_do.bml
// @tags           livejournal
// ==/UserScript==

if(document.location.href.indexOf("mode=reply") != -1 || document.location.href.indexOf("replyto=")!=-1)
    initReplyPage();
else if(document.location.href.indexOf("talkpost_do.bml") != -1)
    initTalkpostBml();
else
    initQuickReply();

GM_addStyle(
    "#rageGogglesOptions {position: fixed; width: 50em; height: 20em; left: 20%; top: 20%; background-color: white; opacity: 0.9; border: 3px gray solid; text-align: left; font-size: 100%;}\
    #rageGogglesOptions a {border: 2px gray solid; background-color: white; padding: 0.5em 2em; text-decoration: none; color: gray; margin: 0.5em;} \
    #rageGogglesOptions a:hover {color: #f53; border-color: #f53; }\
    #rageGogglesOptions div.rageGogglesOptionsSection {margin: 1em}\
    img.ragegoggles_on {opacity: 1;}\
    img.ragegoggles_off {opacity: 0.3;}\
    ");

function exclaimReason()
{
    var reasons = [
        "Rage Goggles are on!",
        "Don't say something you might regret!",
        "Math solves all woes, or at least delays them!",
        "Trick or treat? I say:",
        "I have a present for you!",        
        "So, about that calculator...",
        "I promise I love you, but please: ",
        "Don't you miss homework?",
        "First reading, then 'riting, now have some 'rithmetic.",
        "Pick a number, any number.",
    ];
    
    return reasons[Math.floor(Math.random()*reasons.length)];
}

function rageGogglesActivate()
{
    var num1 = Math.floor(Math.random()*50);
    var num2 = Math.floor(Math.random()*50);
    var sum = prompt(exclaimReason()+" Solve this simple equation to post your comment:\n\n\t "+ num1+" + " + num2 + " = ?", "")
    if(!sum) return null;
    GM_log("user entered: " + sum + "; should be "+ num1 + " + " + num2 + " = " + (num1+num2));
    return parseInt(sum) == (num1+num2);
}

function createRageGogglesIcon(insertionPoint)
{
    var image = document.createElement("img");
    image.setAttribute( "src", "data:image/gif;base64," +
"R0lGODlhEQARAPUAAAAAACMAACAgICgoKDExMUkAAE8AAFAAAEAREXAAAH8AAHcMDBkZUAwMYAAM"+
"aIMAAIsAAI0AAOMAAPcAAP8MDP9AQOuIKgwRkDM1qVJTilpbohEZwQwW2Do8yREW6BEW+BYg8P+L"+
"i/+cnP+1tf/V1QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAARABEAAAZ6wJJw"+
"SCwahYiC8lg0hEQk0oEpPFRC0SiCWrhmSVumcjzmJhQSSCRSMKPXbCrCGxWFmQ8oSbSgIicjIxN3"+
"TAABFBQBAABHAgAOHxyLHB8fFwACQwIXGB6VkhwWohwbmSWbHZUgGgAZGq8aGYynAwwODg0EAAS8"+
"vbN+RkEAOw==");
    image.setAttribute("id", "ragegoggles_icon");    
    image.addEventListener("click", createOptionPanel, false);

    insertionPoint.parentNode.insertBefore(image,insertionPoint);
    
    setRageGogglesIconAttributes()
}

function setRageGogglesIconAttributes()
{
    var image = document.getElementById("ragegoggles_icon");
    var goggleson = "Rage Goggles are on! Hit post and solve a simple equation to post this comment.";
    var gogglesoff = "Rage Goggles are off. Click this icon to open the options panel and enable them for this journal.";
    var statusType = getRageGogglesStatus();
    if(statusType=="permanent") {
        image.setAttribute("class", "ragegoggles_off");
        image.setAttribute("title", gogglesoff);
    } else if(statusType=="goggleson") {
        image.setAttribute("class", "ragegoggles_on");
        image.setAttribute("title", goggleson);
    } else {
        image.setAttribute("class", "ragegoggles_off");
        image.setAttribute("title", gogglesoff);
    }
}

function getRageGogglesStatus()
{
    var whitelist = eval(GM_getValue("whitelist", {}));
    var statusType = whitelist[unsafeWindow.Site.currentJournal];
    if(statusType==-1) {
        return "permanent";
    } else if(!statusType || (statusType-Date.now() < 0)) {
        // not whitelisted or was, but is now in the past, so goggles are on
        return "goggleson";
    } else {
        return "day";
    }

}

function createOptionPanel()
{    

    var optionsPanel = document.createElement("div");
    optionsPanel.setAttribute("id", "rageGogglesOptions");
    document.body.appendChild(optionsPanel);

    document.addEventListener("keypress", function(e) {
    if(e.keyCode==e.DOM_VK_ESCAPE)
        destroyOptionPanel(e);
    }, false );

    var save = document.createElement("a");
    save.textContent = "Save";
    save.setAttribute("href", "#");
    save.addEventListener("click", saveOptions, false);
    var cancel = document.createElement("a");
    cancel.textContent = "Cancel (Esc)";
    cancel.setAttribute("href", "#");
    cancel.addEventListener("click", destroyOptionPanel, false );

    optionsPanel.appendChild(save);
    optionsPanel.appendChild(cancel);

    // FEATURE: spellcheck
    var spellcheckDiv = document.createElement("div");
    spellcheckDiv.setAttribute("class", "rageGogglesOptionsSection");
    optionsPanel.appendChild(spellcheckDiv);
    
    var spellcheckCheckbox = document.createElement("input");
    spellcheckCheckbox.setAttribute("type", "checkbox");
    spellcheckCheckbox.setAttribute("id", "ragegoggles_spellcheck");
    spellcheckCheckbox.checked = GM_getValue("spellcheck", false);
    spellcheckDiv.appendChild(spellcheckCheckbox);
    spellcheckDiv.appendChild(createLabel("ragegoggles_spellcheck","Check spelling and preview by default (will only take effect with new pages)"));    
 
    // FEATURE: whitelist
    var whitelistDiv = document.createElement("div");
    whitelistDiv.setAttribute("class", "rageGogglesOptionsSection");
    optionsPanel.appendChild(whitelistDiv);

    var whitelistDay = document.createElement("input");
    whitelistDay.setAttribute("type", "radio");
    var whitelistPermanent = document.createElement("input");
    whitelistPermanent.setAttribute("type", "radio");
    var whitelistNone = document.createElement("input");
    whitelistNone.setAttribute("type", "radio");
    
    var whitelistStatus = document.createElement("div");
    var whitelist = eval(GM_getValue("whitelist", {}));
    var journal = unsafeWindow.Site.currentJournal;

    var statusType = getRageGogglesStatus();
    if(statusType=="permanent") {
        whitelistStatus.textContent = "Journal permanently whitelisted.";
        whitelistPermanent.checked = true;
    } else if(statusType=="goggleson") {
        whitelistStatus.textContent = "Rage goggles are on.";
        whitelistNone.checked = true;
    } else {
        whitelistStatus.textContent = "Journal whitelisted until " + (new Date(whitelist[journal]))+".";
        whitelistDay.checked = true;
    }
    whitelistStatus.textContent += " What do you want to do now?";
    whitelistDiv.appendChild(whitelistStatus);

    whitelistDay.setAttribute("value", (new Date(Date.now()+(86400*1000))).getTime());    
    whitelistDay.setAttribute("name", "ragegoggles_whitelist");
    whitelistDay.setAttribute("id", "ragegoggles_whitelistDay");
    whitelistDiv.appendChild(whitelistDay);
    whitelistDiv.appendChild(createLabel("ragegoggles_whitelistDay", "Whitelist for a day (until " + ((new Date(Date.now()+(86400*1000)))) + ")"));
    whitelistDiv.appendChild(document.createElement("br"));
   
    whitelistPermanent.setAttribute("value", -1);
    whitelistPermanent.setAttribute("name", "ragegoggles_whitelist");
    whitelistPermanent.setAttribute("id", "ragegoggles_whitelistPermanent");
    whitelistDiv.appendChild(whitelistPermanent);
    whitelistDiv.appendChild(createLabel("ragegoggles_whitelistPermanent", "Whitelist permanently"));
    whitelistDiv.appendChild(document.createElement("br"));
    
    whitelistNone.setAttribute("value", "");
    whitelistNone.setAttribute("name", "ragegoggles_whitelist");
    whitelistNone.setAttribute("id", "ragegoggles_whitelistNone");
    whitelistDiv.appendChild(whitelistNone);
    whitelistDiv.appendChild(createLabel("ragegoggles_whitelistNone", "Enable rage goggles"));
}

function saveOptions(event) 
{    
    // FEATURE: spellcheck
    GM_setValue("spellcheck", document.getElementById("ragegoggles_spellcheck").checked);
    
    // FEATURE: whitelist
    var journal = unsafeWindow.Site.currentJournal;
    var whitelist = eval(GM_getValue("whitelist", {}));
    var options = document.getElementsByName("ragegoggles_whitelist");
    for(var i in options)
    {        
        if( options[i].checked)
        {
            if(options[i].value=="")
                delete whitelist[journal];
            else
                whitelist[journal] = parseInt(options[i].value);
            break;
        }
    }
    
    GM_setValue("whitelist", uneval(whitelist));
    setRageGogglesIconAttributes();    
    destroyOptionPanel(event);
}

function destroyOptionPanel(event)
{
    event.preventDefault();
    event.stopPropagation();
    document.body.removeChild(document.getElementById("rageGogglesOptions"));
}

function initReplyPage()
{
    var form = document.getElementById("postform");
    var submit = document.getElementsByName("submitpost")[0];
    var spellcheck = document.getElementById("spellcheck");
    
    if(form)
    {   
        spellcheck.checked = GM_getValue("spellcheck", false);
        
        // remove the inline onclick
        submit.setAttribute("onclick",null);
        
        submit.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();

            // find a way around using unsafeWindow
            if(unsafeWindow.checkLength())
            {
                if(getRageGogglesStatus()=="goggleson")
                {        
                    while(true) {
                        var clearHeadedEnoughToSeePastRageTintedGoggles = rageGogglesActivate();
                        if(clearHeadedEnoughToSeePastRageTintedGoggles == null) return;
                        else if (clearHeadedEnoughToSeePastRageTintedGoggles) break;
                    }
                }
                unsafeWindow.sendForm("postform", "username");
                form.submit();
            }
        }, true);

        createRageGogglesIcon(submit);

    }    
}

function initQuickReply() 
{
    var form = document.getElementById("qrform");
    var submit = document.getElementById("submitpost");
    var spellcheck = document.getElementById("do_spellcheck");
    
    if(form)
    {   
        spellcheck.checked = GM_getValue("spellcheck", false);
        
        // remove the inline onclick
        submit.setAttribute("onclick",null);
        
        submit.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            
            // find a way around using unsafeWindow
            if(unsafeWindow.checkLength())
            {
                if(getRageGogglesStatus()=="goggleson")
                {        
                    while(true) {
                        var clearHeadedEnoughToSeePastRageTintedGoggles = rageGogglesActivate();
                        if(clearHeadedEnoughToSeePastRageTintedGoggles == null) return;
                        else if (clearHeadedEnoughToSeePastRageTintedGoggles) break;
                    }
                }
                unsafeWindow.submitform();
            }
        }, true);

        createRageGogglesIcon(submit);

    }
}

function initTalkpostBml()
{
    var form = document.getElementsByName("submitpreview")[0].form;
    var submit = document.evaluate("//input[@value='Submit']", form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
    var spellcheck = document.getElementById("spellcheck");

    if(form)
    {   
        spellcheck.checked = GM_getValue("spellcheck", false);
        
        submit.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();

            if(getRageGogglesStatus()=="goggleson")
            {        
                while(true) {
                    var clearHeadedEnoughToSeePastRageTintedGoggles = rageGogglesActivate();
                    if(clearHeadedEnoughToSeePastRageTintedGoggles == null) return;
                    else if (clearHeadedEnoughToSeePastRageTintedGoggles) break;
                }
            }
            form.submit();
        }, true);

        createRageGogglesIcon(submit);

    }    
}

function createLabel(radio, text)
{
    var label = document.createElement("label");
    label.setAttribute("for", radio);
    label.textContent = text;
    return label;
}
