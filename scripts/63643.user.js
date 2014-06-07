// ==UserScript==
// @name           TW Show Recruitmens Page (MUI)
// @namespace      http://www.the-west.ro/
// @description    Adds a link to show the recruitments page of a fort battle for viewing acceptance status. [Multilingual User Interface] 
// @include        http://*.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==

function SetFBRLink(div) 
{
    var divInstructions = getElmRE('div', /^fortbattle_placement_map_[0-9]{1,3}_instructions$/);
    var divTerrainBg = getElmRE('div', /^fortbattle_placement_map_[0-9]{1,3}_terrainbackground$/);
    var divRecruitPage = getElmRE('div', /^fortbattle_placement_map_[0-9]{1,3}_recruitpage$/);
    
    var spanRecruits = getElmRE('span', /^fortbattle_placement_map_[0-9]{1,3}_recruits$/);
    var spanRecruitsCancel = getElmRE('span', /^fortbattle_placement_map_[0-9]{1,3}_recruits_cancel$/);
    var spanRecruitsApply = getElmRE('span', /^fortbattle_placement_map_[0-9]{1,3}_recruits_apply$/);
    
    var divLF = document.createElement('br');

    var lnkName = document.getElementById(divRecruitPage).getElementsByTagName('h2')[0].innerHTML;
    
    if(!document.getElementById(spanRecruits))
    {
        var divRecruit = document.createElement('a');
        divRecruit.setAttribute('id', 'LnkRecruit');
        divRecruit.setAttribute('onclick', '$("' + divRecruitPage + '").style.display="block"');
        divRecruit.setAttribute('href', '#')
        divRecruit.innerHTML = lnkName;
        
        if(!document.getElementById('LnkRecruit'))
        {
            document.getElementById(divInstructions).appendChild(divLF);
            document.getElementById(divInstructions).appendChild(divRecruit);
            document.getElementById(spanRecruitsCancel).style.display = 'none';
            document.getElementById(spanRecruitsApply).style.display = 'none';
        }
    }
}

function getElmRE(elm, regexp)
{
    var divEls = document.getElementsByTagName(elm);

    for(i = 0; i < divEls.length; i++)
    {
        if(divEls[i].id.search(regexp) > -1)
        {
            return divEls[i].id;
        }
    }
}

function checkWindows_ToAddFeatures()
{
    var elmID = getElmRE('div', /^fortbattle_screenpage_[0-9]{1,3}/);

    var elm = document.getElementById(elmID);
    
    if (elm)
    {
        SetFBRLink(elmID);
    }  

    setTimeout(checkWindows_ToAddFeatures, 1000);
}

//start up
setTimeout(checkWindows_ToAddFeatures, 1000);

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_94', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_94', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=94&version=0.4';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();