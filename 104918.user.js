// ==UserScript==
// @name          LibreOffice BugZilla grease
// @description   QA/dev Helper for LibreOffice BugZilla @ FreeDesktop.org
// @include       https://bugs.freedesktop.org/*
// ==/UserScript==

addEventListener('load', function (e)
{
            // backstop @include  
    if (-1 == location.hostname.indexOf('freedesktop.org')) { return; }

            // skip broken, csv, xml pages
    if (!document.body) { return; }    

    var BZGlocation;    // which page as string
    var BZGmsg = '';    // shown on screen
    var BZGstatus = '0.0';

    if (-1 != location.href.indexOf('query'))
    {       // BZ Search page action
            // FUTURE: ===== Add search helpers here =====
            //   -- buttons that add LibreOffice custom or commonly used qa selects 
            //       - UI, FILEOPEN/SAVE, ... select insert/delete
            //       - NeedInfo button that cycles only/exclude/don't care selects
            //   -- buttons that run common or useful qa/dev searches 
            //       - move My Bugs to top of page 
            //       - find New in last day/week, ...

        BZGlocation = ' Query';

            // Always select LibreOffice in Product dropdown
        setProduct(); 

        setupQueryButtons();

        buttonPrep('btn33sel', '+ 3.3', 0, add33sel);
        buttonPrep('btn34sel', '+ 3.4', 0, add34sel);
        //buttonPrep('btn33sel', '3.5.x', 0, add35sel);

        buttonPrep('btnNIsel', 'Only Need Info', 0, onlyNeedInfo);

    }
    else if (-1 != location.href.indexOf('buglist'))
    {       // BZ Search result list page 
            // FUTURE: ===== Add search result highlight options here =====
            // e.g highlight NeedInfo (so load lots of bug info only upon request)
        BZGlocation = ' QueryResult';


    }
    else if (-1 != location.href.indexOf('show_bug'))
    {       // BZ Bug Edit page 
            // does NeedInfo and EasyHack Set/Clear action 

            // FUTURE: ===== 
            //   --  Add list related bugs after tree / graph links
            //   --  Edit Last Search, Show Similar button 
            //   --  One-click self-assign, easier See Also...

            // status widget prep
        var BNloc = document.title.indexOf('Bug') + 4;
        var BNlen = document.title.indexOf(' ', BNloc);
        BZGlocation = ' Bug' + document.title.substring( BNloc, BNlen);

        setupShowBugButtons();

        var NIre = new RegExp('needinfo', 'i');
        if ( NIre.exec(document.getElementById('keywords').value) ) 
             {  buttonPrep('NIsetclear', 'Clear Need Info', 0, clearNeedInfo); }
        else {  buttonPrep('NIsetclear', 'Set Need Info', 0, setNeedInfo);  }

        var EHre = new RegExp('EasyHack', 'i');
        if ( EHre.exec(document.getElementById('status_whiteboard').value)
          || EHre.exec(document.getElementById('short_desc').value) ) 
             {  buttonPrep('EHsetclear', 'Clear Easy Hack', 0, clearEasyHack); }
        else {  buttonPrep('EHsetclear', 'Set Easy Hack', 0, setEasyHack);  }

    }

    // show script status widget in top right 
    // as telltale for script activity
    // FUTURE: ===== could become home for: 
    //    --  links to recent bugs/searches &/or standard searches
    //    --  NEEDINFO highlight on/off control
    BZGmsg = BZGmsg + BZGstatus + BZGlocation
    var mydiv = document.createElement('div');
    mydiv.style.position = 'fixed';
    mydiv.style.top = '0px';
    mydiv.style.right = '0px';
    mydiv.style.border = '1px solid #000';
    mydiv.style.backgroundColor = '#fff';
    mydiv.style.color = '#8f8';
    mydiv.appendChild(document.createTextNode(BZGmsg));
    document.body.appendChild(mydiv);

                // end of addEventListener('load'... inline/anonymous function
}, false);      // false is apply in bubbling phase of event action 


addEventListener('submit', function (e)
{
            // backstop @include  
    if (-1 == location.hostname.indexOf('freedesktop.org')) { return; }

            // skip broken, csv, xml pages
    if (!document.body) { return; }    

    var delNode;

    if ( delNode = document.getElementById('btn33sel') )    { delNode.parentNode.removeChild(delNode); }
    if ( delNode = document.getElementById('btn34sel') )    { delNode.parentNode.removeChild(delNode); }
    if ( delNode = document.getElementById('btnNIsel') )    { delNode.parentNode.removeChild(delNode); }
    if ( delNode = document.getElementById('NIsetclear') )  { delNode.parentNode.removeChild(delNode); }
    if ( delNode = document.getElementById('EHsetclear') )  { delNode.parentNode.removeChild(delNode); }

    // txt nodes and div don't submit so don't require delete

                //  end of addEventListener('submit'... inline/anonymous function
}, false);      // false is apply in bubbling phase of event action 


//  General functions 
//===============================================================================
function setupButton(btn, id, title, w, h)
{
    btn.name = id;
    btn.id = id;
    btn.type = 'button';
    btn.title = title;
    btn.value = title;
    btn.width = w;
    btn.height = h;
}

function buttonPrep(btnid, label, rmvListnr, addListnr) 
{
    var btn = document.getElementById(btnid);
    btn.title = label;
    btn.value = label;
    if (rmvListnr)  { btn.removeEventListener('click', rmvListnr, false); }
    btn.addEventListener('click', addListnr, false)
}

//  Query page 
//===============================================================================
function setProduct()
{   
        // don't cancel prodect select event to allow changes in component and version options
    var Pnode = document.getElementById("product");
    for( var i=0; i<Pnode.childNodes.length; i++ ) 
    {
        if( 'LibreOffice' == Pnode.childNodes(i).value ) 
        {
            Pnode.selectedIndex = i;
            break;
        }
    }
}

function setupQueryButtons()
{
    var divBtnBoxVer = document.createElement('div');
    var btn33sel = document.createElement('input');
    var btn34sel = document.createElement('input');
    //var btn35sel = document.createElement('input');

    setupButton(btn33sel, 'btn33sel', '+ 3.3', 50, 50);
    setupButton(btn34sel, 'btn34sel', '+ 3.4', 50, 50);
    //setupButton(btn33sel, 'btn35sel', '+ 3.5', 50, 50);

    divBtnBoxVer.appendChild(btn33sel)
    divBtnBoxVer.appendChild(btn34sel)
    //divBtnBoxVer.appendChild(btn35sel)

    document.getElementById('version').parentNode.appendChild(divBtnBoxVer);

    var divBtnBoxSel = document.createElement('div');
    var btnNIsel = document.createElement('input');
    setupButton(btnNIsel, 'btnNIsel', 'Only NeedInfo', 223, 50);
    divBtnBoxSel.appendChild(btnNIsel);

    document.getElementById('keywords').parentNode.insertBefore(btnNIsel, document.getElementById('keywords').nextSibling);
}

function add33sel(e) 
{
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var VerSel = document.getElementById('version');
    for( var i=0; i<VerSel.options.length; i++ ) 
    {
        if( -1 != VerSel.options[i].value.indexOf( "3.3" ) ) 
        {  VerSel.options[i].selected = true;  }
    }
    buttonPrep('btn33sel', '- 3.3', add33sel, rmv33sel);
    return 0;
}
function rmv33sel(e) 
{
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var VerSel = document.getElementById('version');
    for( var i=0; i<VerSel.options.length; i++ ) 
    {
        if( -1 != VerSel.options[i].value.indexOf( "3.3" ) ) 
        {  VerSel.options[i].selected = false;  }
    }
    buttonPrep('btn33sel', '+ 3.3', rmv33sel, add33sel);
    return 0;
}

function add34sel(e) 
{
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var VerSel = document.getElementById('version');
    for( var i=0; i<VerSel.options.length; i++ ) 
    {
        if( -1 != VerSel.options[i].value.indexOf( "3.4" ) ) 
        {  VerSel.options[i].selected = true;  }
    }
    buttonPrep('btn34sel', '- 3.4', add34sel, rmv34sel);
    return 0;
}
function rmv34sel(e) 
{
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var VerSel = document.getElementById('version');
    for( var i=0; i<VerSel.options.length; i++ ) 
    {
        if( -1 != VerSel.options[i].value.indexOf( "3.4" ) ) 
        {  VerSel.options[i].selected = false;  }
    }
    buttonPrep('btn34sel', '+ 3.4', rmv34sel, add34sel);
    return 0;
}


function onlyNeedInfo(e) 
{
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var KWnode = document.getElementById('keywords');
    var KWNItagre = new RegExp('needinfo', 'i');
    if ( ! KWNItagre.exec(KWnode.value) )
    {
        KWnode.value = 'NEEDINFO ' + KWnode.value;
        KWnode.value.trim();
    }   
    var KWtype = document.getElementsByName('keywords_type');
    for( var i=0; i<KWtype[0].childNodes.length; i++ ) 
    {
        if( 'allwords' == KWtype[0].childNodes(i).value ) 
        {
            KWtype[0].selectedIndex = i;
            break;
        }
    }
    buttonPrep('btnNIsel', 'Exclude NeedInfo', onlyNeedInfo, exclNeedInfo);
    return 0;
}
function exclNeedInfo(e) 
{
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var KWnode = document.getElementById('keywords');
    var KWNItagre = new RegExp('needinfo', 'i');
    if ( ! KWNItagre.exec(KWnode.value) )
    {
        KWnode.value = 'NEEDINFO ' + KWnode.value;
        KWnode.value.trim();
    }   
    var KWtype = document.getElementsByName('keywords_type');
    for( var i=0; i<KWtype[0].childNodes.length; i++ ) 
    {
        if( 'nowords' == KWtype[0].childNodes(i).value ) 
        {
            KWtype[0].selectedIndex = i;
            break;
        }
    }
    buttonPrep('btnNIsel', 'Don\'t Care NeedInfo', exclNeedInfo, noselNeedInfo);
    return 0;
}
function noselNeedInfo(e) 
{
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var KWnode = document.getElementById('keywords');
    var KWNItagre = new RegExp('needinfo', 'i');
    KWnode.value = KWnode.value.replace(KWNItagre, ''); 
    KWnode.value = KWnode.value.trim(); 
    document.getElementsByName('keywords_type')[0].selectedIndex = 0;
    buttonPrep('btnNIsel', 'Only NeedInfo', noselNeedInfo, onlyNeedInfo);
    return 0;
}


//  Show Bug page 
//===============================================================================
function setupShowBugButtons() 
{
    var btnStrip = document.createElement('div');
    document.getElementById('keywords').parentNode.insertBefore(btnStrip, document.getElementById('keywords').nextSibling);

    var btnNeedInfo = document.createElement('input');
    var btnEasyHack = document.createElement('input');

    setupButton(btnEasyHack, 'EHsetclear', 'Set Easy Hack', 223, 50);
    setupButton(btnNeedInfo, 'NIsetclear', 'Set Need Info', 223, 50);
    btnStrip.appendChild(btnNeedInfo);
    btnStrip.appendChild(btnEasyHack);
}

function setNeedInfo( e ) 
{
        // prevent button from submitting, etc. by canceling click event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var reporterEmail = getReporterEmail();

    var KWnode = document.getElementById('keywords');
    var WBnode = document.getElementById('status_whiteboard');
    var KWNItpre = new RegExp('needinfo', 'i');
    var WBNItpre = new RegExp('infoprovider:' + reporterEmail, 'i');

    if ( ! KWNItpre.exec(KWnode.value) )
    {
        KWnode.value = 'NEEDINFO ' + KWnode.value;
        KWnode.value.trim();
    }   
    if ( ! WBNItpre.exec(WBnode.value) && reporterEmail.length )
    {
        WBnode.value = 'infoprovider:' + reporterEmail + ' ' + WBnode.value;
        WBnode.value.trim();
    }
    buttonPrep('NIsetclear', 'Clear Need Info', setNeedInfo, clearNeedInfo);
    return 0;
}
function clearNeedInfo( e ) 
{
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var reporterEmail = getReporterEmail();

    var KWnode = document.getElementById('keywords');
    var WBnode = document.getElementById('status_whiteboard');
    var KWNItagre = new RegExp('needinfo', 'i');
    var WBNItagre = new RegExp('infoprovider:', 'i');
    var WBNIemailre = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+[.][A-Z]{2,4}', 'i');

    KWnode.value = KWnode.value.replace(KWNItagre, ''); 
    KWnode.value = KWnode.value.trim(); 

    WBnode.value = WBnode.value.replace(WBNItagre, ''); 
    WBnode.value = WBnode.value.replace(WBNIemailre, ''); 
    WBnode.value = WBnode.value.trim(); 

    buttonPrep('NIsetclear', 'Set Need Info', clearNeedInfo, setNeedInfo);
    return 0;
}


function setEasyHack( e ) 
{
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var WBnode = document.getElementById('status_whiteboard');
    var DEnode = document.getElementById('short_desc');
    var DTnode = document.getElementById('short_desc_nonedit_display');
    var EHre = new RegExp('[\[\s]*(EasyHack)(s){0,1}', 'i');

    if ( ! EHre.exec(WBnode.value) )
    {
        WBnode.value = 'EasyHack ' + WBnode.value;
        WBnode.value.trim();
    }   
    if ( ! EHre.exec(DEnode.value) )
    {
        DEnode.value = 'EasyHack: ' + DEnode.value;
        DEnode.value.trim();
    }
    if ( ! EHre.exec(DTnode.value) )
    {
        DTnode.innerText = 'EasyHack: ' + DTnode.innerText;
        DTnode.innerText.trim();
    }
    buttonPrep('EHsetclear', 'Clear Easy Hack', setEasyHack, clearEasyHack);
    return 0;
}
function clearEasyHack( e ) 
{
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    var WBnode = document.getElementById('status_whiteboard');
    var DEnode = document.getElementById('short_desc');
    var DTnode = document.getElementById('short_desc_nonedit_display');
    var EHre   = new RegExp('[\[\s]*(EasyHack)(s){0,1}', 'i');

        // Opera seem to have trouble with ] in a set as in [\s:\]]
        // LO for leftOvers e.g. ' : ]  ]] ' or less
    var LOre1 = new RegExp('^[?:\s]+', 'i');    
    var LOre2 = new RegExp('^[\]\s]+', 'i');    

    WBnode.value = WBnode.value.replace(EHre, ''); 
    WBnode.value = WBnode.value.trim(); 

    DEnode.value = DEnode.value.replace(EHre, ''); 
    DEnode.value = DEnode.value.replace(LOre1, ''); 
    DEnode.value = DEnode.value.replace(LOre2, ''); 
    DEnode.value = DEnode.value.trim(); 
        // ugly kluge to get rid of initial close brackets
    while( ']' == DEnode.value.charAt(0) ) { 
        DEnode.value = DEnode.value.substring(1).trim(); 
    }

    DTnode.innerText = DTnode.innerText.replace(EHre, ''); 
    DTnode.innerText = DTnode.innerText.replace(LOre1, ''); 
    DTnode.innerText = DTnode.innerText.replace(LOre2, ''); 
    DTnode.innerText = DTnode.innerText.trim(); 
        // ugly kluge to get rid of initial close brackets
    while( ']' == DTnode.innerText.charAt(0) ) { 
        DTnode.innerText = DTnode.innerText.substring(1).trim(); 
    }

    buttonPrep('EHsetclear', 'Set Easy Hack', clearEasyHack, setEasyHack);
    return 0;
}

function getReporterEmail()
{
    var repEmail = '';
    var rightCol = document.getElementById('bz_show_bug_column_2').innerHTML;
    var tgtSpot = rightCol.indexOf('mailto:') + 7;  // 7 == length of 'mailto:'
    var emailre = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+[.][A-Z]{2,4}', 'i');

    if ( tgtSpot ) { 
        repEmail = emailre.exec(rightCol.substr(tgtSpot));
    }
    return repEmail;
}

