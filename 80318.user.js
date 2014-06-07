// ==UserScript==
// @name           MySpace Home-Page Super Mod
// @namespace      urbi();
// @description    Auto-updates, removes ads, removes extra space, enlarges images on hover; adds section arranger, comments & online-friends space, ignore-bulletins feature, live comment form, live friend search, pictures in bulletin space, & plenty more. Read description.
// @include        http://*.myspace.com/*?fuseaction=user*
// @exclude        http://*myspace.com/*?fuseaction=user.*
// @betaURL        http://turibe.com/
// ==/UserScript==
var settings = {//  These are the default settings. If you want to change them, use the Script Controls menu in the navbar or the user script commands.
 friendspace: {   //
  enableLiveFriendSearch:{val: true, msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If false, the search box in your friendspace WON'T display its results dynamically."},
  FSThirdLinkTxt:     {val: "View Pics",msg: "<b>Syntax: &lt;text></b>                                                       <br />\
                                           The text of the third link in the contact div that appears when you hover over a friend's\
                                           link in the top-/online-friends space."},
  FSThirdLinkURL:     {val: "?fuseaction=user.viewAlbums&friendID=",msg: "<b>Syntax: &lt;URL></b>                            <br />\
                                        URL to wherever you'd want the third link in the contact links to lead to, minus the\
                                        friendID. Everything before <i>?fuseaction</i> and after <i>&friendID=</i> can usually, but\
                                        not always, be removed from the URL."},
  addLinksToFS:       {val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           Add contact links to the profile links in the friendspace."},
  updatesInFS:        {val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           Add updates as a tab in the friendspace."},
  updatesHeight:      {val: "500px", msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           The height of the updates box before a scrollbar is added."},
  extendFriendSpace:  {val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If false, friendspace will not have an auto-updating, online-friends section"},
  FSshowOnload:       {val: "comments",msg:"<b>Syntax: online friends | updates | top friends | comments</b>                 <br />\
                                           What to show in friendspace on load."},
  OFSMaxHeight:       {val: true,    msg: "<b>Syntax: auto | &lt;number>px</b>                                               <br />\
                                           Online-friends space's maximum height before scrolling. Default value is 400px"},
  friendsHeight:      {val: "500px", msg: "<b>Syntax: auto | &lt;number>px</b>                                               <br />\
                                           Height of friends list before overflow. Use <c>auto</c> for no scroll."},
 },
 comments: {      //
  addCommentsModule:  {val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If false, comments module WON'T be added to the homepage."},
  commentsBoxPosition:{val: "in friendspace", msg: "<b>Syntax: {before | after} &lt;sectionId> | in friendspace</b>          <br />\
                                           Possible sectionIds: friendspace, bulletins, userstatus. Use <c>in friendspace</c>\
                                           to add the comments as a tab in your friend space"},
  commentsBoxHeight:  {val: "500px", msg: "<b>Syntax: auto | &lt;number>px</b>                                               <br />\
                                           Height of comments box before it begins to scroll."},
  numberOfComments:   {val: 10,      msg: "<b>Syntax: &lt;number></b>                                                        <br />\
                                           Number of comments to show in comments module. 50 is the maximum; 0 is the minimum"},
  hideCommentersNames:{val: false,   msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If false, both the name and picture of friends who gave you comments will be displayed"},
  hideCommentDates:   {val: false,   msg: "<b>Syntax: true | false</b>                                                      <br />\
                                           If false, the date that a comment was posted will be displayed."},
  maxCommentImgWidth: {val: "192px", msg: "<b>Syntax: &lt;number></b>                                                       <br />\
                                           The largest size of image comments possible. Anything larger is shrunk to this size."},
 },
 bulletins: {    //
  bulletinsHeight:    {val: "225px", msg: "<b>Syntax: auto | &lt;number>px</b>                                               <br />\
                                           Height of bulletins before they get a scrollbar. Use <c>auto</c> for no scrollbar"},
  bulletinsOpenWindow:{val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If true, bulletin links open draggable div; if false, links retain default behavior."},
  showPostersPic:     {val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If true, the bulletins table section will show the posters' display pic, like in\
                                           InsaneNinja's 'MySpace - Home Auto-Update' userscript."},
  hidePostersName:    {val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If true, the names of the posters in the bulletin space will be hidden and only their\
                                           picture will show. <c>showPostersPic</c> must be true for this to take effect."},
  compactBulletins:   {val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If true, multiple bulletins from the same poster will be placed on the same row instead\
                                           of taking up several rows. <c>showPostersPic</c> must be on for this to take\
                                           effect. It wouldn't save any space otherwise anyway."},
  enableIgnoreBulletins:{val: true,  msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If true, the bulletin blacklisting feature of Jordon Kalilich's\
                                           <a href='http://userscripts.org/scripts/show/5618'>MySpace Ignore Bulletins</a>\
                                           userscript will be turned on. This feature was replicated because Kalilich's script is\
                                           incompatible with this one."},
  bulletinBlacklist:  {val: "",      msg: "<b>Syntax: [&lt;friendID>, ...]</b>                                               <br />\
                                           The friendIDs or URL suffixes of friends whose bulletins you would like to ignore. This\
                                           is useful for bands, companies, and annoying friends.<br />\
                                           Values can be seperated by any non-alphanumeric character(s). All the following syntaxes\
                                           will block Tom's bulletins (suffix= myspace.com/<b>tom</b>, friendID= <b>6221</b>):<br/>\
                                           <i>$^#@&%*#<b>tom</b>$*(#*</i><br />\
                                           <i>tom</i><br />\
                                           <i>$&#*$<b>6221</b>$^#&</i><br />\
                                           The page does not have to be reloaded for changes to take effect."},
  bulletinsShowOnload:{val: "whitelist",msg:"<b>Syntax: whitelist | blacklist | all</b>                                      <br />\
                                           What to show in the bulletin space when the page loads. If the value isn't one of the\
                                           above, the script will behave as if this setting were set to <c>whitelist</c>"},
 },
 general: {     //
  imgsEnlargeOnHover: {val: false,   msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           Show an enlarged version of a picture when hovered over."},
  maxEnlargedImgWidth:{val: "220px", msg: "<b>Syntax: &lt;number>px</b>                                                      <br />\
                                           The maximum size of the enlarged thumbnail that shows up if <c>imgsEnlargeOnHover</c> is\
                                           set to true."},
  maxSandMHeight:     {val: "220px", msg: "<b>Syntax: &lt;number>px</b>                                                      <br />\
                                           The maximum height of the Status and Mood box before a scrollbar is added to prevent it\
                                           from getting too tall."},
  navbarHeight:       {val: "16px",  msg: "<b>Syntax: &lt;number>px</b>                                                      <br />\
                                           The height of the MySpace navbar. Normally it has a height of 27px."},
  shrinkUserDisplay:  {val: false,   msg: "<b>Syntax: auto | &lt;number>px</b>                                               <br />\
                                           If false, everything below Last Login in the userdisplay box WON'T be hidden."},
  col1Settings:       {val: "width:180px;fontSize:11px;line-height:12px;",
                       msg: "<b>Syntax: col1{&lt;property>:&lt;value>[;...]*}[...]</b>                                       <br />\
                             Style settings for the columns. This setting is for use with the Customize Homepage tab."},
  col2Settings:       {val: "width:440px;fontSize:11px;lineHeight:12px;",
                       msg: "<b>Syntax: col1{&lt;property>:&lt;value>[;...]*}[...]</b>                                       <br />\
                             Style settings for the columns. This setting is for use with the Customize Homepage tab."},
  col3Settings:       {val: "width:347px;fontSize:11px;lineHeight:12px;",
                       msg: "<b>Syntax: col1{&lt;property>:&lt;value>[;...]*}[...]</b>                                       <br />\
                             Style settings for the columns. This setting is for use with the Customize Homepage tab."},
  colOrder:        {val: "col1, col2, col3, ",
                    msg: "<b>Syntax: col*[, col*, ...]</b>                                                                   <br />\
                          The order of the columns, from left to right."},
  col1Sections:    {val: "userdisplay,updates,marketingbox",
                    msg: "<b>Syntax: &lt;sectionId>[, &lt;sectionId>,...]</b>                                                <br />\
                          This setting is for use with the Customize Homepage tab of the Settings Manager. Any non-alphanumeric\
                          characters (except the underscore), in any quantity can be used as a seperator:<br />\
                          <i>userstatus^$*#+bulletins</i> and <i>userstatus, bulletins</i> are equivalent"},
  col2Sections:    {val: "bandshows, userstatus, bulletins",
                    msg: "<b>Syntax: &lt;sectionId>[, &lt;sectionId>,...]</b>                                                <br />\
                          This setting is for use with the Customize Homepage tab of the Settings Manager. Any non-alphanumeric\
                          characters (except the underscore), in any quantity can be used as a seperator:<br />\
                          <i>userstatus^$*#+bulletins</i> and <i>userstatus, bulletins</i> are equivalent"},
  col3Sections:    {val: "friendspace, appslayer",
                    msg: "<b>Syntax: &lt;sectionId>[, &lt;sectionId>,...]</b>                                                <br />\
                          This setting is for use with the Customize Homepage tab of the Settings Manager. Any non-alphanumeric\
                          characters (except the underscore), in any quantity can be used as a seperator:<br />\
                          <i>userstatus^$*#+bulletins</i> and <i>userstatus, bulletins</i> are equivalent"},
  col0Sections:    {val: "birthday, friendUpdate, pymkcol3, pymk, appnavigation, tomannouncement",
                    msg: "<b>Syntax: &lt;sectionId>[, &lt;sectionId>,...]</b>                                                <br />\
                          Sections listed here will be hidden. Any non-alphanumeric, non-underscore character, in any quantity can\
                          be used as a seperator:<br /> <i>userstatus^$*#+bulletins</i> and <i>userstatus, bulletins</i> are\
                          equivalent"},
  hideFooter:         {val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If false, the footer at the bottom of the page WON'T be hidden."},
  hideDateAndTime:    {val: true,   msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If false, the date and time WON'T be hidden. When this and <c>hidePickURL</c> are\
                                           both set to true you get an extra 20px of viewing space. Not that big a deal, but it\
                                           always bothered me so I made it possible to hide them."},
  hidePickURL:        {val: true,   msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If false, the text showing your URL or commanding you to pick a URL will NOT be hidden."},
  removeGoogleBar:    {val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If false, the MySpace logo and google search bar under the top ad will NOT be removed"},
  removeTopAd:        {val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If false, the top ad will NOT be removed"},
  removeSideAds:      {val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If false, the ads on the left and right will NOT be removed"},
 },
 script:{        //
  hasRan:             {val: true,    msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           Indicates whether or not the script has run before. Set to false with the script's tool\
                                           *and* by editing the script if you want to change settings by modifying the script. Set\
                                           to false in just the Setting Manager to reset all settings to default values."},
  interval:           {val: 45000,   msg: "<b>Syntax: &lt;number></b>                                                        <br />\
                                           Time between page updates (in milliseconds; 1000 == 1 second)"},
  reportErrors:       {val: false,   msg: "<b>Syntax: true | false</b>                                                       <br />\
                                           If false, errors will be ignored; if true, error information will be sent to the script\
                                           author. This may help the author fix the problem. When an error occurs, if this is set\
                                           to true, the information sent will be displayed next to the Script Controls menu in the\
                                           MySpace navbar. It is extremely unlikely, but not impossible, that the information could\
                                           be in any way personally identifying."},
  scriptVersion:   {val: "4.8",
                    msg: "<b>Syntax: &lt;number></b>                                                                         <br />\
                          Don't change this. Change <c>lastCheck</c> if you don't want to be prompted to update. If you\
                          really want to change this for whatever reason, you must edit the script. <c>hasRan</c> doesn't have to\
                          be set to false."},
  lastCheck:       {val: "",
                    msg: "<b>Syntax: &lt;month>/&lt;day>/&lt;year></b>                                                     <br />\
                          The date of the last Check. This value will be blank on first run or after changing <c>hasRan</c> to\
                          false."},
 }
}
var bandProfile = !$('bulletins');
/*
    changed the look of the error alerts and script-update notifications.
    made the data sent in error reports more informative about the environment in which the error occurred.
    categorized the settings
    made it so you could use the scroll wheel to navigate the tabs in the friendspace and settings manager.
    made the drag-and-drop functionality of the Arrange Homepage screen more intelligent.
    fixed the problem with bulletin titles in the pseudo-window that were too long.
    fixed the bulletin pseudo-window to follow the mouse at any scroll level.
    Made the enlarged image adjustable in size and fixed it to prevent it from appearing past the top or bottom of the screen.
    made script update the mail button in the navbar too.
    made the status and mood box scrollable
    added button in the Script Controls to stop the auto-update cycle.
    changed the title when you had alerts to look like (M,C,FR) instead of (M)(C)(FR)
    added ability to resize columns, change their font size, or hide them.
    changed the look of the updates tab somewhat.
*/
var iframe =      addElement('iframe', {class: "_GM"}, document.body);
    cmtFrame =    addElement('iframe', {class: "_GM"}, document.body);
    onlineFrame = addElement('iframe', {class: "_GM"}, document.body);
var userId = $('nav1000021').firstChild.href.match(/\d+$/)[0],
    timer = setTimeout(AU, settings.interval);
    
// styling for error-notice div. In case script breaks before applying the rest of the CSS 
GM_addStyle("");

(function(){
try{
    var ctrlMenuButton = addElement('li',  {class:"dropDown GM_menu", style:"cursor:pointer"}, $('leftNav'));
    ctrlMenuButton.innerHTML = "<a id='scriptControlsButton'>Script Controls <small>&#9660;</small></a>";
    var ctrlMenu =       addElement('ul',  {class:"subMenu"}, ctrlMenuButton);
    var settingsDiv =    addElement('div', {id:"settingsDiv", style:"display:none;"}, document.body);
    settingsDiv.innerHTML =
"<div id='window_overlay'></div><div class='appspopup_wrapper'><div class='appspopup_box' id='settings_popup'><div id='settingsPopup_close' title='Click to close'>&times;</div><div class='appspopup_title'>Settings Manager</div>\
  <div class='tabRow settingsTabs' id='settingsTabs'>\
    <gmbuttonwrapper><gmbutton for='settingsPopup_wrapper' id='settingsPopup_tab'>Change Settings</gmbutton></gmbuttonwrapper>\
    <gmbuttonwrapper><gmbutton for='sectionArrange_content'id='sectionArrange_tab'>Customize Homepage</gmbutton></gmbuttonwrapper>\
  </div>\
  <div id='settingsPopup_wrapper'>\
    <div class='appspopup_content settingsPopup_content' id='settingsPopup_content'><div id='settings_subtabRow'></div></div><div id='settingMsg' class='msgArea'>Click on a setting's value to change it. Changes save automatically.<br /> Put the mouse on the row of a setting to see its possible values and description.<br />Hover over a setting's value to see its datatype.</div>\
  </div>\
  <div class='appspopup_content settingsPopup_content' id='sectionArrange_content' draggable='false'>\
  <div id='sectionArrange_modify'>\
    <div><label>Width:</label><span><input id='sectionArrange_modify_colWidth' readVal='offsetWidth' chgVal='width' unit='px'>px</span></div>\
    <div><label>Font Size:</label><span><input id='sectionArrange_modify_fontSize' readVal='fontSize' chgVal='fontSize' in='style' unit='px'/>px</span></div>\
    <div><label>Line height:</label><span><input id='sectionArrange_modify_lnHeight' readVal='lineHeight' chgVal='lineHeight' in='style' unit='px'/>px</span></div>\
  </div>\
  <div id='sectionArrange_wrapper'>\
    <div id='minicol0' col='true' for='col0'></div></div><div id='sectionMsg' class='msgArea'>Drag and drop the sections and columns to your liking. Changes are saved automatically. Drop a section into the the pink area at the top to hide it.<br />If you don't recognize a section, hover over it to view a description and to highlight it (if present) in the background.</div>\
  </div></div></div>";
    Array.forEach( tags($('settingsTabs'), 'gmbutton'), function(elm){
        elm.addEventListener('click', GMButtonClick, false);
        elm.addEventListener('DOMMouseScroll', GMButtonScroll, false);
    } );
    var content = $('settingsPopup_content'),
        settingMsg = $('settingMsg');
    var sections= $('sectionArrange_content'),
        sectionMsg = $('sectionMsg');
    settingMsg.setAttribute('default', settingMsg.innerHTML);
    sectionMsg.setAttribute('default', sectionMsg.innerHTML);
    content.addEventListener('mouseout', showDefaultMessage, false);
    sections.addEventListener('mouseout',showDefaultMessage, false);
    $('settingsPopup_close').addEventListener('click', closeSettings, false);
    GM_setValue('scriptVersion', settings.script.scriptVersion.val);
    var x = -1, row, span, input, value, type;
    if(!GM_getValue('hasRan')){
        for(var i in settings){
            for(var [j, obj] in Iterator(settings[i]))
                GM_setValue(j, obj.val);
        }
        var noticeContent = "Thank you for installing the MySpace Home-Page Super Mod userscript. To change the script's settings\
                             or\ customize your homepage, use the Script Controls menu in the MySpace navbar. You can also use this\
                             menu to update the homepage, stop auto-updating, or to check to see if updates for this script are\
                             available."
        addNotice({id: "versionNotice", class: "versionNotice", style: 'cursor:default'},
                  'Super Mod Tips:' + "<span>"+noticeContent+"</span>", 300, 100);
    }
    var subtabRow = $('settings_subtabRow');
    var GMButton, subSection;
    for(var i in settings){
        GMButton = addElement('GMButton',{class:"settings_subTab",id:"settings_subTab_"+i,for:"settings_subSection_"+i}, subtabRow);
        GMButton.innerHTML = i;
        GMButton.addEventListener('click', GMButtonClick, false);
        GMButton.addEventListener('DOMMouseScroll', GMButtonScroll, false);
        subSection = addElement('div', {class: "settings_subSection", id: "settings_subSection_" + i}, content);
        for(var [index, assoc] in Iterator(settings[i])){
            value = GM_getValue(index);
            if(!value && value !== false)
                GM_setValue(index, value = assoc.val);
            type = typeof value != "number"? typeof value : "integer";
            row =   addElement('div',      {msg: assoc.msg, class: ++x%2? "rowOdd":"rowEven"}, subSection);
            span =  addElement('span',     null, row);
            input = addElement('textarea', {class:"settingField", title:"("+type+")", settingType: type}, row);
            input.value = value;
            input.addEventListener('change', saveSetting, false);
            span.innerHTML = index;
            row.addEventListener('mouseover', readSettingMsg, false);
            settings[index] = value;
            delete settings[i];
        }
    }
    GMButtonClick.apply( $('settings_subTab_friendspace') )
    var buttons = [
        { innerHTML:  "Update Page",
          onclick:    AU,
        },
        { innerHTML:  "Stop Auto-Updating",
          onclick:    AU_stopCycle,
          attributes: {class: "divider"},
        },
        { innerHTML:  "Change Script Settings",
          onclick:    openSettingsManager,
          attributes: {settingTab: 'settingsPopup_tab' }
        },
        { innerHTML:  "Customize Homepage",
          onclick:    openSettingsManager,
          attributes: {settingTab: 'sectionArrange_tab'}
        },
        // { innerHTML:  "Check for Script Update",
          // onclick:    checkForUpdatedVersion,
        // },
    ];
    GM_registerMenuCommand('Change Script Settings', buttons[1].onclick, 'c', 'control shift', 'c');
    GM_registerMenuCommand('Arrange Page Sections',  buttons[2].onclick, 'a', 'control shift', 'a');
    for(var i = -1, len = buttons.length, tmp; ++i < len;){
        tmp = addElement('li', null, ctrlMenu);
        tmp.appendChild(document.createElement('a'));
        tmp.addEventListener('click', buttons[i].onclick || function(){return false}, false);
        tmp.firstChild.innerHTML = buttons[i].innerHTML;
        if(buttons[i].attributes)
            for(var [e, j] in Iterator(buttons[i].attributes))
                tmp.setAttribute(e, j);
    }
    var fsrch = $('friendsearch');
    if(fsrch) $('friends').parentNode.appendChild(fsrch).style.border = "1px solid #ccc";
    // checkForUpdatedVersion();
	applyColumnSettings();
}catch(x){
    reportError(x);
}
})();

function openSettingsManager(){
    $('settingsDiv').style.display = "block";
    GMButtonClick.apply( $(this.getAttribute('settingTab')) );
}

function checkForUpdatedVersion(e){
	var version = settings.scriptVersion,
		date = new Date();
	date = [date.getMonth() + 1, date.getDate(), date.getFullYear()];
	if(!e){
		var now = date[0] + "/" + date[1] + "/" + date[2];
		if(!settings.lastCheck)
			GM_setValue( 'lastCheck', now );
		var savedDate = GM_getValue('lastCheck').match(/\d+/g);
		var timeToCheck = false;
		if(date[1] > savedDate[1] && date[0] >= savedDate[0] && date[2] >= savedDate[2])
			timeToCheck = true;
		else if(date[0] > savedDate[0] && date[2] >= savedDate[2])
			timeToCheck = true;
		else if(date[2] > savedDate[2])
			timeToCheck = true;
		if(!timeToCheck) return false;
		GM_setValue( 'lastCheck', now );
	}
    GM_xmlhttpRequest({
        method : "get",
        url    : "http://turibe.com/GM/supermod_scriptVersion.php",
        onload : function(details){
            if(details.responseText <= version) return false;
            GM_setValue( 'lastCheck', date[0]+"/"+(date[1]-1)+"/"+date[2]);
            var atts = {
                href:       "http://userscripts.org/scripts/show/39150",
                target:     "_blank",
                class:      "versionNotice",
                id:         "versionNotice",
            },
            txt = "New version available: " + details.responseText + "<span> &nbsp; There is a new version of the MySpace Home-Page Super Mod. Click this notice to install the update.</span>";
            addNotice(atts, txt, 246, 46);
        },
    });
}

function reportError(info){
    if(unsafeWindow.console) trace(info);
    if(!GM_getValue('reportErrors')) return false;
    var d = new Date();
    d = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear() + " - " + d.getHours() + ":" + d.getMinutes();
    var str =d+" ---------------------------------------------------------------------------------------------------------------\n";
    str += "version:     " + settings.scriptVersion + "\n";
    str += "agent:       " + navigator.userAgent.match(/Firefox\/[\d\.]*$/i)[0] + "\n";
	str += "userType:    " + (bandProfile? "Artist" : "Normal") + "\n";
    str += "errorType:   " + info.name + "\n";
    str += "message:     " + info.message + "\n";
    str += "line:        " + (info.lineNumber - 329) + "\n\n\n";
    GM_xmlhttpRequest({
        method:  "POST",
        url:     "http://turibe.com/GM/supermod_recordErr.php",
        headers: {'Content-type': "application/x-www-form-urlencoded"},
        data:    "msg=" + str,
        onload:  function(details){
            str  = str.replace(/\n/gm, "<br />").replace(/\s(?=\s)/g, "&nbsp;").replace(/-{3,}/g, "---------------");
            var strArr = str.split(/\s{3,}/g);
            for(var i = -1, len = strArr.length, noticeContent = ""; ++i < len;){
                noticeContent += "<div class='left'>" + strArr[i] + "</div><div class='right'>" + strArr[++i] + "</div>";
            }
            addNotice({id: "versionNotice", class: "versionNotice", style: 'cursor:default'},
                      'Error reported:' + "<span>"+noticeContent+"</span>", 300, 100);
        },
    });
}

function addNotice(atts, txt, maxWidth, maxHeight){
    var noticeDiv = addElement('a', atts, document.body);
    noticeDiv.innerHTML = txt;
    var scb = $('scriptControlsButton'),
        lineHeight = parseInt(getStyle(scb, 'lineHeight')) - 2;
        posRef = scb.offsetParent;
    noticeDiv.style.minHeight = noticeDiv.style.lineHeight = lineHeight + "px";
    noticeDiv.style.left = posRef.offsetLeft + posRef.offsetWidth + 8 + "px";
    noticeDiv.addEventListener('click', removeSelf, false);
    var span = tags(noticeDiv, 'span')[0];
    noticeDiv.addEventListener('mouseover', function(e){
        if(e.relatedTarget == span || e.relatedTarget == this) return;
        tween(span.style, 'minHeight',  span.offsetHeight,  lineHeight + maxHeight || 60,  0.1, 'px');
    }, false);
    noticeDiv.addEventListener('mouseout', function(e){
        if(e.relatedTarget == span || e.relatedTarget == this) return;
        tween(span.style, 'minHeight',  span.offsetHeight,  0, 0.1, 'px');
    }, false);
    tween(noticeDiv.style, 'width', 0, maxWidth || 200,  0.1, 'px');
}
//  Change-Setting Functions
function saveSetting(){//
    var val = (this.getAttribute('settingType') == "boolean" && (this.value == "true" || this.value == "false"))?
        eval(this.value) : this.value;
    var settingName = this.previousSibling.innerHTML;
    GM_setValue(settingName, settings[settingName] = val);
}
function showDefaultMessage(){
	var msgArea = this.id == "settingsPopup_content"? $('settingMsg') : $('sectionMsg');
	msgArea.innerHTML = msgArea.getAttribute('default')
}

function closeSettings(){      $('settingsDiv').style.display = "none" }

function readSettingMsg(){     $('settingMsg').innerHTML = this.getAttribute('msg') }

function readMiniSectMsg(){    $('sectionMsg').innerHTML = this.getAttribute('msg') }

function hiliteRealSection(){
    var sect;
    if(sect=$(this.getAttribute('for'))) sect.style.outline = "5px solid #fc9";
}
function unhiliteRealSection(){
    var sect;
    if(sect=$(this.getAttribute('for'))) sect.style.outline = "none";
}
function colDrag(){
    var offsetX = this.offsetParent.offsetLeft;
    document.addEventListener('mouseup', stopDrag, false);
    document.addEventListener('mousemove', drag, false);
    var _this = this.parentNode;
    _this.style.position = "absolute";
    function drag(e){
        _this.style.left = e.pageX - offsetX + "px";
    }
    function stopDrag(e){
        var realThis = $(_this.getAttribute('for'));
        var tgt = e.target;
        while(!tgt.getAttribute('col') && (tgt.tagName == "DIV" || tgt.tagName == "HANDLE"))
            tgt = tgt.parentNode;
        if(e.target.id == "sectionArrange_content"){
            $('sectionArrange_content').appendChild(_this);
            realThis.parentNode.insertBefore(realThis, realThis.parentNode.lastChild.previousSibling);
        }else if(tgt.getAttribute('col') && tgt.id != "minicol0"){
            placeDroppedSection(tgt, _this, realThis, e.pageX, true)
        }
        _this.style.position = "static";
        saveColOrder();
        document.removeEventListener('mousemove', drag, false);
        document.removeEventListener('mouseup', stopDrag, false);
    }
}
function placeDroppedSection(tgt, _this, realThis, pos, col){
    var rect = tgt.getBoundingClientRect();
    var realTgt = $(tgt.getAttribute('for'));
    pos = pos - (col? rect.left : rect.top);
    var halfDim  = (col? tgt.offsetWidth : tgt.offsetHeight) / 2;
    if(pos > halfDim){
        tgt.parentNode.insertBefore(_this, tgt.nextSibling);
        if(realThis) realTgt.parentNode.insertBefore(realThis, realTgt.nextSibling);
    }else{
        tgt.parentNode.insertBefore(_this, tgt);
        if(realThis) realTgt.parentNode.insertBefore(realThis, realTgt);
    }
}
function startDrag(){
    var offsetX = this.offsetParent.offsetLeft,
        offsetY = this.offsetParent.offsetTop + window.scrollY;
    this.style.width    = this.offsetWidth + "px";
    this.style.height   = this.offsetHeight + "px";
    this.style.position = "absolute";
    this.style.opacity  = "0.8";
    var _this = this;
    document.addEventListener('mouseup', stopDrag, false);
    document.addEventListener('mousemove', drag, false);
    function drag(e){
        _this.style.top  = e.pageY - offsetY + "px";
        _this.style.left = e.pageX - offsetX + "px";
    }
    function stopDrag(e){
        var tgt = e.target,
            realThis = $(_this.getAttribute('for')),
            realTgt = $(tgt.getAttribute('for'));
        if(tgt.getAttribute('msg')){
            placeDroppedSection(tgt, _this, realThis, e.pageY, false);
        }else if(tgt.getAttribute('col')){
            tgt.appendChild(_this);
            if(realThis)
                realTgt.appendChild(realThis);
        }
        _this.style.position = "static";
        _this.style.width    = "auto";
        _this.style.opacity  = "1";
        saveSectionPlacements();
        document.removeEventListener('mousemove', drag, false);
        document.removeEventListener('mouseup', stopDrag, false);
    }
}
function selectCol(){
    changeColumnSettings();
    Array.forEach(tags($('sectionArrange_content'), 'colselect'), function(elm){
        elm.style.backgroundColor = "rgba(255, 195, 79, 0.95)";
        elm.parentNode.style.backgroundColor = "rgba(102, 153, 204, 0.95)";
    });
    this.style.backgroundColor = "rgba(102, 153, 204, 0.95)";
    this.parentNode.style.backgroundColor = "rgba(255, 195, 79, 0.95)";
	var col = $(this.parentNode.parentNode.getAttribute('for'));
	$('sectionArrange_modify').setAttribute('selectedColumn', col.id);
	var sectionArrange_modify_inputs = tags($('sectionArrange_modify'), 'input');
	Array.forEach(sectionArrange_modify_inputs, function(elm, i){
		if(elm.getAttribute('in') == 'style')
			elm.value = parseInt( getStyle(col, elm.getAttribute('readVal')) );
		else
			elm.value = col[elm.getAttribute('readVal')];
	});
}
function saveColOrder(){
    var str = "",
        minicols = $('sectionArrange_content').getElementsByClassName('minicol');
    Array.forEach(minicols, function(elm, i){str += elm.getAttribute('for') + ", "});
    GM_setValue('colOrder', str);
}
function saveSectionPlacements(){
    for(var i = -1, str = "";++i < 4;){
        str = "";
        Array.forEach(tags($('minicol'+i), 'div'), function(elm){
            str += elm.getAttribute('for') + ", ";
        });
        GM_setValue('col'+i+'Sections', str);
    }
}
function fillCols(){try{
    var col0 = addElement('div', {id: "col0", style: "display:none"}, document.body);
    var sectionIds = {
      userdisplay:    {msg:"This is the section containing your display picture, profile views, and last login."},
      updates:        {msg:"This is where the alerts (New Messages, new Comments, etc.) show up."},
      marketingbox:   {msg:"Normally appears at the bottom right of the home page showing Cool Videos, Featured Comedian, etc."},
      friendspace:    {msg:"Self-explanatory."},
      bandshows:      {msg:"On band and artist profiles, this is where upcoming shows are listed."},
      userstatus:     {msg:"Section that shows the status and mood of you and your friends."},
      bulletins:      {msg:"No mystery here."},
      friendUpdate:   {msg:"Friends' activity updates. Disable <c>updatesInFS</c> before unhiding this section, otherwise it\
                            will appear as an empty box."},
      birthday:       {msg:"Shows friends' birthdays so you don't forget again this year."},
      comments:       {msg:"This is the comments module when <c>commentsBoxPosition</c> isn't set to <i>in friendspace</i>."},
      pymk:           {msg:"<b>P</b>eople <b>Y</b>ou <b>M</b>ay <b>K</b>now. Shows friends of friends that you may know."},
      pymkcol3:       {msg:"This section does exactly the same thing as the pymk section, but appears in a different place."},
      appslayer:      {msg:"Your applications, if you have any, appear in this."},
      appnavigation:  {msg:"If you have any apps installed, this is where their links appear."},
      tomannouncement:{msg:"This is where the MySpace Announcements appear."},
    }
    var cols = GM_getValue('colOrder').match(/\w*[^\s\W]/g);
    var sectionArrange_content = $('sectionArrange_wrapper'),
        main = $('mainContent'),
        col, handle, colSelect;
    cols.forEach(function(elm){
        col = addElement('div', {class:"minicol", id:"mini"+elm, for:elm, col:"true"}, sectionArrange_content);
        handle = addElement('handle', null, col);
        handle.addEventListener('mousedown', colDrag, false);
        colSelect = addElement('colselect', null, handle);
        colSelect.addEventListener('click', selectCol, false);
        colSelect.addEventListener('mousedown', stopProp, false);
        main.insertBefore($(elm), main.lastChild.previousSibling);
    });
	Array.forEach( tags($('sectionArrange_modify'), 'input'), function(elm, i){
		elm.addEventListener('blur', changeColumnSettings, false);
		elm.addEventListener('keyup', changeColumnProperty, false);
		elm.addEventListener('keydown', incrementInputValue, false);
	});
    for(var i = -1, sectIds, sect, realSect, col; ++i < 4;){
        sectIds = GM_getValue('col'+i+'Sections').match(/\w*[^\s\W]/g);
        if(sectIds) sectIds.forEach(function(elem){
            sect = addElement( 'div', {
                msg:   sectionIds[elem].msg,
                for:   elem,
            }, $('minicol' + i) );
            sect.className = "minisection " + (sect.id = "mini_" + elem),
            sect.innerHTML = elem;
            if(realSect = $(elem))
                $('col' + i).appendChild(realSect);
            sect.addEventListener('mouseover', readMiniSectMsg, false);
            sect.addEventListener('mouseover', hiliteRealSection, false);
            sect.addEventListener('mouseout',  unhiliteRealSection, false);
            sect.addEventListener('mousedown', startDrag, false);
            sect.addEventListener('mousedown', stopProp, false);
        });
    }
}catch(x){reportError(x)}
}
fillCols();
function incrementInputValue(e){
	if(e.keyCode > 46 && e.keyCode < 96) return e.stopPropagation();
	if(e.keyCode < 41){
		var inc = 0;
		if(e.keyCode == 33)        inc =  10;
		else if(e.keyCode == 34)   inc = -10;
		else if(e.keyCode == 38)   inc =  1;
		else if(e.keyCode == 40)   inc = -1;
		this.value = parseInt(this.value) + inc;
	}
}
function changeColumnProperty(){
	var col = $( $('sectionArrange_modify').getAttribute('selectedColumn') );
	var unit = this.getAttribute('unit') || "";
	col.style[this.getAttribute('chgVal')] = this.value + unit;
	resizeHeaderAndSettings();
}
function applyColumnSettings(){
	for(var i = 0, col, x; x = GM_getValue('col' + (++i) + 'Settings'); ){
        x = x.split(/:|;/g);
        x.pop();
        for(var j = -1, len = x.length, col = $('col' + i); ++j < len;){
            col.style[x[j]] = x[++j];
        }
	}
	setTimeout(resizeHeaderAndSettings, 100);
}
function changeColumnSettings(){
	var sectMod = $('sectionArrange_modify');
    var selectedColID = sectMod.getAttribute('selectedColumn');
    var str = "";
	for( var [i, elm] in Iterator(tags(sectMod, 'input', true)) ){
        if(!elm.value) return;
		str += elm.getAttribute('chgVal') + ":" + elm.value + "px;";
	}
	GM_setValue( selectedColID + 'Settings', str );
}
function resizeHeaderAndSettings(){
	var main = $('main');
	$('header').style.width = main.offsetWidth + "px";
	$('settings_popup').style.width = main.offsetWidth / 1.7 + "px";
}
//
// End of setting functions
function AU(){
    GM_xmlhttpRequest({// <=------------------------------------ General Auto-Update Request
        method:    "get",
        url:    document.URL + "&gm=no",
        onload: function(details){try{
            clearTimeout(timer);
            iframe.contentDocument.documentElement.innerHTML = details.responseText;
            var StatusAndMoodCmtsID = "ctl00_ctl00_cpMain_cpMain_MoveableContainer_ctl00_UserStatusExtendedControl1_sm_hsmComments";
            var sections = {
                friendStatuses: $('friendStatuses'),   // Self Explanatory...
                updates:        $('updates'),          // "New *" notifiers
                tblbulletins:   $('tblbulletins'),     // Bulletins
                friends:        $('friends'),          // Friend space
                views:          $('views'),            // Profile views
                lyrTime2:       $('lyrTime2'),         // Date and time
                nav1000002:     $('nav1000002'),       // Mail button in the navbar.
            };
            for(var i in sections)    updateSection(sections[i], i);
            var notifications = {
                'M':   "indMail",
                'C':   "indComm",
                'FR':  "indFR",
                'V':   "indVids",
                'BD':  "indBD",
                'PC':  "indIC",
                'BP':  "indBlog",
            };
            var titleContents = "";
            for(i in notifications)  if( $(notifications[i]) ) titleContents += i + ",";
            document.title = (titleContents?  "(" + titleContents.replace(/,$/,"") +") " :
                                      "") + "MySpace.com";
            timer = setTimeout(AU, settings.interval);
            var assignHandlers = settings.bulletinsOpenWindow && !settings.compactBulletins;
            if(settings.addLinksToFS)          addComMsgLinks( tags($('friends'), 'a', true) );
            if(!bandProfile){
                if(settings.showPostersPic)        updateBulletins();
                if(settings.enableIgnoreBulletins) prepBulletins();
                if(assignHandlers)                 addBulletinLinkListeners();
            }
            updateActivities();
            if(settings.imgsEnlargeOnHover){
                prepImages($('friends'));
                prepImages($('friendStatuses'));
            }
        }catch(x){ reportError(x) }
        },
    });
    if(settings.addCommentsModule) updateComments();
    if(settings.extendFriendSpace) updateOnlineFriends();
}

function AU_stopCycle(){
    clearTimeout(timer);
}

function updateSection(oldSection, id){
    var newSection = $$(id);
    if(oldSection){
        if(newSection){
            return oldSection.parentNode.replaceChild(newSection, oldSection );
        }
        oldSection.parentNode.removeChild(oldSection);
    }
}

function updateActivities(){
    mkRequest('http://activities.myspace.com/index.cfm?fuseaction=friendupdates.home&id=1&filter=', 'get', null, null,
      function(details){
        var updatesID = "ctl00_ctl00_cpMain_cpMain_MoveableContainer_ctl01_result";
        iframe.contentDocument.documentElement.innerHTML = details.responseText;
        var updates = tags($(updatesID), 'ul')[0],
            newUps = $$('ctl00_ctl00_cpMain_cpMain_FriendUpdate_ctl00_middle');
        newUps = tags(newUps, 'ul')[0];
        var elms = tags(newUps, 'h4');
        for(var i = elms.length; --i > 3;)
            elms[i].parentNode.parentNode.removeChild(elms[i].parentNode);
        elms = tags(newUps, 'a');
        for(var i = -1, len = elms.length;++i < len;)
            if(elms[i].className == "photoContainerLarge"){
                elms[i].className = "photoContainerSmall";
                tags(elms[i], 'img')[0].className = "photoDisplaySmall";
            }
        tags(newUps, 'h4')[0].innerHTML = "Today <span class='activitySettingLinks'><a href='http://activities.myspace.com/index.cfm?fuseaction=friendupdates.home&id=3&filter='>Edit settings</a> | <a href='http://activities.myspace.com/index.cfm?fuseaction=friendupdates.home&id=1&filter='>View all</a></span>";
        updates.parentNode.replaceChild(newUps, updates);
        if(settings.imgsEnlargeOnHover) prepImages(newUps);
        iframe.contentDocument.documentElement.innerHTML = "";
      });
}

function addCommentLinkListener(link){
    var id = link.href.match(/\d{4,}/);
    link.setAttribute('onclick', 'MySpace.UI.ProfileCommentQuickPostPopup.show(event,'+id+')');
    link.addEventListener('click', stopProp, false);
}
function addMessageLinkListener(link){
    addCommentLinkListener(link);
    link.addEventListener('click', function(){
        document.getElementsByClassName('popup_title')[0].innerHTML = "Send Message";
    });
}
function updateBulletins(){
    mkRequest('http://bulletins.myspace.com/index.cfm?fuseaction=bulletin', 'get', null, null,
      function(details){
      try{
        var tmpFrame = addElement('iframe', {class: "_GM"}, document.body);
        tmpFrame.contentDocument.documentElement.innerHTML = details.responseText;
        var newBulTbl = $('col0').appendChild($$('bulletin_inbox', tmpFrame));
        var oldBulTbl = $('tblbulletins');
        var oldCells = XPArr('.//td[position() = 1]', oldBulTbl);
        var imgs = XPArr('.//img[@class="profileimagelink"]', newBulTbl);
        for(var i in imgs){
			if(!oldCells[i]) break;
            oldCells[i].firstChild.className = "photoContainerSmall";
            var first, last;
            if( (first = oldCells[i].firstChild.firstChild) == (last = oldCells[i].firstChild.lastChild) )
                oldCells[i].firstChild.appendChild(imgs[i]);
            else
                oldCells[i].firstChild.replaceChild(imgs[i], oldCells[i].firstChild.lastChild);
            imgs[i].src += ""; // Prevents images from never loading.
        };
        document.body.removeChild(tmpFrame);
        newBulTbl.parentNode.removeChild(newBulTbl);
        if(settings.compactBulletins){
            compactBulletins();
            if(settings.enableIgnoreBulletins) prepBulletins();
        }
        if(settings.imgsEnlargeOnHover) prepImages( oldBulTbl );
      }catch(x){ reportError(x) }
      });
}

function compactBulletins(){
try{
    var authorRows = {};
    var rows = XPArr( 'tbody/tr[position() > 1]', $('tblbulletins') );
    rows.forEach(function(elm, i){
        var authorId = elm.cells[0].getAttribute('authorID');
        if(!authorRows[authorId])
            authorRows[authorId] = [];
        authorRows[authorId].push(elm);
    });
    for(var i in authorRows){
        authorRows[i].forEach(function(row, j){
            var firstRow = authorRows[i][0],
                newRow   = authorRows[i][j];
            if(firstRow.cells[2].innerHTML == newRow.cells[2].innerHTML) return; 
            firstRow.cells[1].innerHTML += "<br />" + newRow.cells[1].innerHTML;
            firstRow.cells[2].innerHTML += newRow.cells[2].innerHTML;
            if(j > 0)
                newRow.parentNode.removeChild(newRow);
        })
    }
    if(settings.bulletinsOpenWindow) addBulletinLinkListeners();
}catch(x){ reportError(x) }
}

function updateComments(){
    mkRequest('http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=' + userId, 'get', null, null,
      function(details){
        var cmtBoxContent = $('commentsContainer');
        cmtFrame.contentDocument.documentElement.innerHTML = details.responseText;
        var comments = tags(cmtFrame.contentDocument, 'table')[0],
            head = tags(comments, 'thead')[0],
            rows = tags(comments, 'tr');
        head.parentNode.removeChild(head);
        comments.className = "cols";
        for(var i = -1, len = rows.length;++i < len;){
            if     (i % 4 == 0){rows[i].className = "roweven"; rows[++i].className = "roweven";}
            else if(i % 2 == 0){rows[i].className = "rowodd";  rows[++i].className = "rowodd"; }
        }
        cmtBoxContent.replaceChild(comments, cmtBoxContent.firstChild);
        XPArr('tbody//th[1]', comments, function(){this.parentNode.removeChild(this)});
        if(settings.numberOfComments < 50 && settings.numberOfComments > -1)
            XPArr('tbody[position()>'+settings.numberOfComments+']', comments, function(){this.parentNode.removeChild(this)});
        XPArr('tbody/tr[2]//a[position()>2]', comments, function(){this.parentNode.removeChild(this)});
        XPArr('tbody/tr[2]//a[position()=1]', comments, function(){addCommentLinkListener(this)});
        var cmtTab = $('FSTab_Comments'),
            ttlTxt = cmtTab.getAttributeNode('titlebarText'),
            totalComments= byClass($$('content', cmtFrame), 'pagingLeft')[0].innerHTML.match(/\d+/g)[2];
        ttlTxt.nodeValue = ttlTxt.nodeValue.replace(/\d*(?=<\/a>)/, totalComments);
        if(cmtTab.className == "active")
            FSTabClick.apply(cmtTab);
        if(settings.imgsEnlargeOnHover) prepImages(cmtBoxContent, true);
        cmtFrame.contentDocument.documentElement.innerHTML = "";
      });
}

function updateOnlineFriends(){
    mkRequest("http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&view=online&friendID=" + userId, 'get', null, null, 
      function(details){
        onlineFrame.contentDocument.documentElement.innerHTML = details.responseText;
        var onlineFriends = $('onlineFriends'),
            newOnlineFriends =  $$('myfriends_grid', onlineFrame),
            display = onlineFriends.style.display;
        if(display == "none") newOnlineFriends.style.display = display;
        onlineFriends.parentNode.replaceChild(newOnlineFriends, onlineFriends);
        newOnlineFriends.id = "onlineFriends";
        XPArr('ul//img[@class="profileimagelink"]', newOnlineFriends, function(){this.src = this.getAttribute('source')});
        XPArr('ul/li[position()mod 4=0]', newOnlineFriends, function() addElement('div',{class:"clear"},this.nextSibling,'insertBefore'));
        if(tags(newOnlineFriends, 'li').length == 0)
            return newOnlineFriends.innerHTML = "<b><center style='line-height:100px'>No friends are online</b></center>"
        addComMsgLinks( XPArr('ul//span[@class="msProfileLink friendToolTipBox"]/a', $('onlineFriends')) );
        var onlineTab  = $('FSTab_Online'),
            ttlTxtAtt = onlineTab.getAttributeNode('titlebarText');
        var nav = $$('nav_bottom', onlineFrame),
            totalOnlineFriends = nav && byClass(nav, 'pgerTitle')[0].innerHTML.match(/\d+/g)[2];
        ttlTxtAtt.nodeValue = ttlTxtAtt.nodeValue.replace(/\d*(?=<\/a>)/, totalOnlineFriends || 0);
        if(onlineTab.className == "active")
            FSTabClick.apply(cmtTab);
        if(settings.imgsEnlargeOnHover) prepImages(newOnlineFriends);
        onlineFrame.contentDocument.documentElement.innerHTML = "";
      });
}

function addComMsgLinks(imgs){
    var linksDiv = $('FSLinksDiv'),
        s = linksDiv.style;
    for(var i=-1, len=imgs.length, id; ++i < len;){
        imgs[i].addEventListener('mouseover', function(){// FSLinksDiv MOUSEOVER EVENT HANDLER
            var id = this.href.match(/\d{4,}/) || this.parentNode.getAttribute('friendid');
            var cmtURL = "http://comment.myspace.com/index.cfm?fuseaction=user.viewProfile_commentForm&friendID=",
                msgURL = "http://messaging.myspace.com/index.cfm?fuseaction=mail.message&friendID=",
                usrURL = settings.FSThirdLinkURL;
            var cmtLink = $('FSCmtBtn');
            cmtLink.href = cmtURL + id;
            addCommentLinkListener(cmtLink);
            $('FSMsgBtn').href = msgURL + id;
            $('FSUsrBtn').href = usrURL + id;
            var rects = this.getBoundingClientRect();
            s.top = rects.top + scrollY + this.offsetHeight + "px";
            s.display = "block";
            s.left = rects.left + this.offsetWidth / 2 - linksDiv.offsetWidth / 2 + "px";
        }, false);
        imgs[i].addEventListener('mouseout', function(e){// FSLinksDiv MOUSEOUT EVENT HANDLER
            if(e.relatedTarget == linksDiv){
                linksDiv.addEventListener('mouseout', function(evt){
                    if(evt.relatedTarget.href || evt.relatedTarget == this) return false;
                    this.style.display = 'none';
                }, false);
                return false;
            }
            s.display = "none";
        }, false);
    }
}
function addBulletinLinkListeners(){
    var bulTbl = $('tblbulletins');
    XPArr('tbody//tr/td[position() = 3]/a', bulTbl, function(){
        this.title = "Left click to open in draggable div";
        this.addEventListener('click', function(e){
            e.preventDefault();
            var from = this.parentNode.parentNode.firstChild.nextSibling.firstChild.innerHTML
            var divWin = GMWindow(this.innerHTML + " - " + from, '<div class="ajaxLoaderGraphic" style="background-position:center"></div>');
            divWin.style.top =  document.documentElement.clientHeight / 2 - 200 + "px";
            divWin.style.left = document.body.clientWidth / 2 - 250 + "px";
            var tmpFrame = addElement('iframe', {class:"_GM"}, document.body);
            GM_xmlhttpRequest({
                method: "get",
                url:    this.href,
                onload: function(details){
                    tmpFrame.contentDocument.documentElement.innerHTML = details.responseText;
                    var contents = document.getElementsByTagName('contents');
                    contents = contents[contents.length - 1];
                    contents.replaceChild( $$('ctl00_ctl00_cpMain_cpMain_BulletinRead_ltl_body', tmpFrame), contents.firstChild);
                    XPArr('span//img', contents, function(){this.src += ""}); // Images don't load without this.
                    var row = document.createElement('div'),
                        controlButtons = tags( tags(tmpFrame.contentDocument, 'table')[4], 'input' );
                    for(var i = -1, link, len = controlButtons.length; ++i < len;){
                        link = row.appendChild(document.createElement('a'));
                        link.innerHTML = controlButtons[i].value;
                        link.href = controlButtons[i].getAttribute('onclick').replace(/(return do\w*\(')|('\))/g, "");
                        link.style.width = 100 / len + "%";
                    }
                    row.className = "bulletinControls middle";
                    contents.insertBefore(row, contents.firstChild);
                    tmpFrame.parentNode.removeChild(tmpFrame);
                },
            });
        }, false);
    });
}

function GMButtonClick(){
    var btns = tags(this.parentNode.parentNode, 'GMButton');
    for(var i = -1, len = btns.length; ++i < len;){
        if(!btns[i].getAttribute('for')) continue;
        btns[i].className = "inactive";
        $(btns[i].getAttribute('for')).style.display = "none";
    }
    this.className = "active";
    $(this.getAttribute('for')).style.display = "block";
}
function GMButtonScroll(e){
    e.preventDefault();
    var btns = tags(this.parentNode.parentNode, 'GMButton');
    for(var i = -1, len = btns.length, index, tabToFocus; ++i < len;){
        if(btns[i].className == "active"){
            index = e.detail > 0? (i + 1 < len? i + 1 : 0) : (i - 1 >= 0? i - 1 : len - 1);
            btns[index].className = "active";
            btns[i].className = "inactive";
            $(btns[index].getAttribute('for')).style.display = "block";
            $(btns[i].getAttribute('for')).style.display = "none";
            break;
        }
    }
    function displaySection(){
        $(this.getAttribute('for')).style.display = "block";
    }
}

function FSTabClick(){  byClass( $('friendspace'), 'title' )[0].innerHTML = this.getAttribute('titlebarText')  }

function GMWindow(title, sectionContents, posX, posY){
    var div = addElement('div', {id: "GMWindow", style: (posX? posX + "px" : "") + (posY? posY + "px" : "")}, document.body);
    div.innerHTML = '<h4 class="top"><div><div><span class="title">'+title+'</span><span class="controlbox" style="visibility: visible;"><a title="Close" class="cbClose" id="GMWindowCloseButton" /></span><div style="padding: 0px; clear: both;"/></div></div></h4><div class="middle GMWindowContents" id="contentWrapper"><contents id="GMWindowContents">'+(sectionContents||" ")+'</contents></div></div><div class="bottom"></div>';
    var difX, difY;
    var titlebar = tags(div, 'h4')[0];
    titlebar.addEventListener('mousedown', function(e){
        difX = e.clientX - div.offsetLeft;
        difY = e.clientY - div.offsetTop - scrollY;
        document.body.setAttribute('style','-moz-user-select:none');
        window.addEventListener('mousemove', drag, false);
        window.addEventListener('mouseup', function(){
            document.body.setAttribute('style', '-moz-user-select:text');
            this.removeEventListener('mousemove', drag, false);
        }, false);
    }, false);
    var closeButton = tags(titlebar, 'a')[0];
    closeButton.addEventListener('click', function(){removeSelf.apply(div)}, false);
    closeButton.addEventListener('mousedown', stopProp,             false);
    function drag(e){
        div.style.left = e.clientX - difX + "px";
        div.style.top  = e.clientY - difY - scrollY + "px";
    }
    return div;
}

function showBulletins(){
    Array.forEach( tags(this.parentNode, 'span'), function(elm){
        elm.className = "inactive";
    });
    this.className = "active";
    this.parentNode.setAttribute('active', this.id);
    var sortMethod = this.getAttribute('show'),
        fromCols = XPArr( 'tbody//td[position()=1]', $('tblbulletins') ),
        ids = GM_getValue('bulletinBlacklist').match(/(\b\w+\b)|\d+/g) || [0];
    var matches, index = -1;
    if(sortMethod == "w")      matches = ['none', 'table-row'];
    else if(sortMethod == "b") matches = ['table-row', 'none'];
    else                       matches = ['table-row', 'table-row'];
    fromCols.forEach(function(elm, i){
        var authorId = elm.getAttribute('authorId');
        elm.parentNode.style.display = matches[1];
        if(sortMethod == "a") 
            return elm.parentNode.className = i % 2? "roweven" : "rowodd";
        ids.forEach(function(id){
            if(id == authorId) elm.parentNode.style.display = matches[0];
        });
        if(elm.parentNode.style.display == "table-row") elm.parentNode.className = ++index % 2? "roweven" : "rowodd";
    });
}

function prepBulletins(){
    var fromCol = XPArr('tbody//td[position()=1]', $('tblbulletins'), function(){
        var authorId = tags(this, 'a')[0].href.match(/\w+$/)[0];
        this.setAttribute('authorId', authorId);
    });
    showBulletins.apply( $($('bulletinBlacklistControls').getAttribute('active')) )
}

function hideFriendSpace(){
    $('friends').style.display = "none";
}
function prepResultsDiv(){
    var searchResults = $('searchResults'),
        friends = $('friends');
    searchResults.innerHTML = " ";
    searchResults.style.display = "block";
    searchResults.style.height = friends.offsetHeight + "px";
    hideFriendSpace();
    if(this.value) friendSearch.apply(this);
    $('friendsParent').addEventListener('DOMNodeInserted', hideFriendSpace, false);
}
function unprepResultsDiv(){
    $('friendsParent').removeEventListener('DOMNodeInserted', hideFriendSpace, false);
    $('friends').style.display = "block";
    $('searchResults').style.display = "none";
    $('resultsFrame').contentDocument.documentElement.innerHTML = "";
}
function friendSearch(){
    if(!this.value)    return $('searchResults').innerHTML = " ";
    mkRequest('http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID=' + userId + '&qFriends=' + this.value,
              'get', null, null,
              function(details){
                  var resultsFrame = $('resultsFrame'),
                      searchResults = $('searchResults');
                  resultsFrame.contentDocument.documentElement.innerHTML = details.responseText;
                  var fg = $$('myfriends_grid', resultsFrame);
                  searchResults.replaceChild(fg, searchResults.firstChild );
                  var imgs = XPArr('ul//img[@class="profileimagelink"]', fg, function(){this.src = this.getAttribute('source')});
                  addComMsgLinks( XPArr('.//span[@class = "msProfileLink friendToolTipBox"]/a', fg) );
                  if(settings.imgsEnlargeOnHover) prepImages(fg);
              });
}
function prepImages(contextNode, log){
    XPArr('.//img[contains(@src, "ac-images.myspacecdn.com")]', contextNode || $('mainContent'), function(){
        this.addEventListener('mouseover', openImgDiv, false);
        this.addEventListener('mouseout', closeImgDiv, false);
    });
}
function openImgDiv(e){
    var imgDiv = $('imgDiv'),
        rects = this.getBoundingClientRect();
    imgDiv.firstChild.src = this.src.replace(/s(?=_|\.jpg|\.png|\.gif)/, 'l');
    imgDiv.style.display = "block";
    imgDiv.style.right = document.body.offsetWidth  - rects.left + 1 + "px";
    imgDiv.style.top  =  rects.top + scrollY + (this.offsetHeight / 2) - 27 + "px";
}
function unhideEnlargedImage(){
    var ps = this.parentNode.style;
    this.style.display = "block";
    var offsetY = parseInt(ps.top) - this.offsetHeight / 2 + 27;
    var docHeight = document.documentElement.clientHeight + scrollY;
    if(offsetY - scrollY < 0)
        offsetY += Math.abs( offsetY ) + 2 + scrollY;
    else if(offsetY + this.offsetHeight > docHeight)
        offsetY -= offsetY + this.offsetHeight - docHeight + 6;
    ps.top = offsetY + "px";
}
function closeImgDiv(e){
    var imgDiv = $('imgDiv');
    imgDiv.style.display = imgDiv.firstChild.style.display = "none";
}
// END FUNCTION ---- MOST STYLES AND DOM CHANGES APPLIED HERE. --------------------------------------------------------------------------------------------
(function(){
try{
    if(settings.imgsEnlargeOnHover){
        var x = addElement('div', {id:"imgDiv", class:"photoContainerSmall", style:"display:none;position:absolute"}, document.body);
        addElement('img', {id: "enlargedImg"}, x).addEventListener('load', unhideEnlargedImage, false);
    }
    if(settings.enableLiveFriendSearch && !bandProfile){
        var searchBox = $('txtFrndSearch');
        addElement('iframe', {class: "_GM", id: "resultsFrame"}, document.body);
        addElement('div',    {id: "searchResults"},              $('friends').nextSibling, 'insertBefore');
        searchBox.addEventListener('focus',   prepResultsDiv,   false);
        searchBox.addEventListener('keyup', friendSearch,     false);
        searchBox.addEventListener('blur',    unprepResultsDiv, false);
    }
    if(settings.addCommentsModule){
        var placement = settings.commentsBoxPosition;
        if(placement != "in friendspace"){
            var cmtBox = $('bulletins').cloneNode(true);
            cmtBox.id = "commentsModule";
            tags(cmtBox, 'span')[0].innerHTML = "Comments";
            var cmtBoxContent = tags(cmtBox, 'div')[3];
            placement = placement.split(/ /);
            if(placement[0] == "before")    var refPoint = $(placement[1]);
            else if(placement[0] == "after")var refPoint = $(placement[1]).nextSibling;
            
            if(refPoint) refPoint.parentNode.insertBefore(cmtBox, refPoint);
            else $(placement[1]).parentNode.appendChild(cmtBox);
        }else{
            var friends = $('friends');
            var cmtBoxContent = friends.parentNode.parentNode.insertBefore(document.createElement('div'), friends.parentNode);
        }
        cmtBoxContent.id = "commentsContainer";
        cmtBoxContent.innerHTML = "<div class='ajaxLoaderGraphic' style='background-position:center'></div>";
        updateComments();
    }
    if(settings.enableIgnoreBulletins && !bandProfile){
        var btnPseudoLbls = { blacklist:'bl_b',   whitelist:'bl_w',   all:'bl_a' };
        var bulTtl = byClass( $('bulletins'), 'title' )[0],
            BLControls = addElement('span', {
                id:     "bulletinBlacklistControls",
                active: btnPseudoLbls[settings.bulletinsShowOnload],
                class:  "title",
            }, bulTtl.nextSibling, 'insertBefore');
        BLControls.innerHTML ="<span id='bl_w' title='Show bulletins from friends not on your blacklist' show='w'>Whitelist</span> |\
                               <span id='bl_b' title='Show bulletins from blacklisted friends'           show='b'>Blacklist</span> |\
                               <span id='bl_a' title='Show bulletins from all friends' show='a'>All Bulletins</span>";
        Array.forEach(tags(BLControls, 'span'), function(elm, i){
            elm.addEventListener('click', showBulletins, false);
        });
        prepBulletins();
    }
    if(settings.updatesInFS || settings.extendFriendSpace || settings.commentsBoxPosition == "in friendspace"){
        var friends = $('friends'),
            par = friends.parentNode.parentNode,
            tabRow = addElement('div', {id: "FSTabRow", class: "tabRow"}, par.firstChild, 'insertBefore');
        friends.parentNode.id = "friendsParent";
        var friendCount = $('friendCount').innerHTML;
        var buttons = {}, names = [
          { txt:    "Top Friends",
            ttlTxt: "<span class='commonIcon'id='friendsicon'></span>Friend Space\
                     (<a 'id='friendCount' href='?fuseaction=user.viewfriends&friendID="+userId+">"+friendCount+"</a>)", },
          { txt:    settings.extendFriendSpace && "Online Now",
            ttlTxt: "<img id='friendsicon'class='titleIcon'src='http://x.myspacecdn.com/modules/common/static/img/onlinenow2.gif'/>\
                     Online Friends (<a id='friendCount' href='?fuseaction=user.viewfriends&view=online&friendID="+userId+"'></a>)"},
          { txt:    settings.addCommentsModule && settings.commentsBoxPosition == "in friendspace" && "Comments",
            ttlTxt: "<span id='friendsicon' class='titleIcon commonIcon commentBack'></span>Comments\
                     (<a id='friendCount' href='?fuseaction=user.viewComments&friendID="+userId+"'></a>)"},
          { txt:    settings.updatesInFS       && "Updates",
            ttlTxt: "<span class='commonIcon' id='friendsupdate'></span>Friend Updates"},
        ];
        for(var i = names.length, key; --i > -1; ){
            if(!(key = names[i].txt)) continue;
            buttons[key] = tabRow.insertBefore(document.createElement('GMButtonWrapper'), tabRow.firstChild).appendChild(document.createElement('GMButton'));
            buttons[key].innerHTML = names[i].txt;
            buttons[key].id = "FSTab_" + names[i].txt.match(/\w*/)[0];
            buttons[key].addEventListener('click', GMButtonClick, false);
            buttons[key].addEventListener('click', FSTabClick,    false);
            buttons[key].addEventListener('DOMMouseScroll', GMButtonScroll, false);
            buttons[key].setAttribute('titlebarText', names[i].ttlTxt);
        }
        buttons['Top Friends'].className = "active";
        buttons['Top Friends'].setAttribute('for', 'friendsParent');
        if(buttons.Comments){
            buttons.Comments.setAttribute('for', 'commentsContainer');
            par.insertBefore($('commentsContainer'), friends.parentNode);
        }
        if(buttons.Updates){
            var updates = par.insertBefore($('ctl00_ctl00_cpMain_cpMain_MoveableContainer_ctl01_result'), friends.parentNode);
            buttons.Updates.setAttribute('for', updates.id);
            $('friendUpdate').style.display = "none";
        }
        if(buttons['Online Now']){
            buttons['Online Now'].setAttribute('for', 'onlineFriends');
            var onlineFriends = addElement('div', {id:"onlineFriends", style: "display:none"}, friends.parentNode, 'insertBefore');
            onlineFriends.innerHTML = "<div class='ajaxLoaderGraphic' style='background-position:center'></div>";
            updateOnlineFriends();
        }
        if(settings.FSshowOnload){
            var def = buttons['Top Friends'];
            var FSopts = {  'top friends':    buttons['Top Friends'],
                            'online friends': buttons['Online Now'] || def,
                            comments:         buttons.Comments      || def,
                            updates:          buttons.Updates       || def,
                         };
            GMButtonClick.apply(FSopts[settings.FSshowOnload]);
            FSTabClick.apply   (FSopts[settings.FSshowOnload]);
        }
    }
    if(settings.bulletinsOpenWindow && !bandProfile) addBulletinLinkListeners();
    if(settings.addLinksToFS){
        var linksDiv = addElement('div', {id: "FSLinksDiv", class: "middle"}, document.body);
            pre = "<a id='",
            class = "'class='commonIcon ",
            post = "'></a>";
        linksDiv.innerHTML = pre+"FSMsgBtn"+"'title='Send Message'"+class+"sendMessage"+post+pre+"FSCmtBtn"+"'title='Add Comment'"+class+"commentBack"+post+pre+"FSUsrBtn"+"'title='View Pictures'"+class+"FSUsrBtn"+post;
        $('FSUsrBtn').innerHTML = settings.FSThirdLinkTxt;
        addComMsgLinks( tags($('friends'), 'a', true) );
    }
    var styleRef= getStyle( tags( $('friendspace'), 'div')[3] ),
        FSStyle = getStyle( $('friendspace') ),
        GMButton_borderColor,
        GMButton_txtColor;
    if(styleRef.borderLeftWidth == "0px")
        GMButton_borderColor = FSStyle.borderLeftColor;
    else if(styleRef.backgroundColor == styleRef.borderLeftColor)
        GMButton_borderColor = "black";
    else
        GMButton_borderColor = styleRef.borderLeftColor;

    var isDark = GMButton_borderColor.match(/\d+/g);
    isDark = isDark? isDark.filter(function(val){return val <= 125}).length == 3 : false;
    if(isDark || GMButton_borderColor == "black")
        GMButton_txtColor = "white";
    else
        GMButton_txtColor = getStyle(tags($('friends'), 'a')[0], 'color');

    GM_addStyle((settings.hideFooter?"#footer,#mainContent>div:last-child,":"")
    +(settings.hidePickURL?"#pickUrl,":"")
    +(settings.hideDateAndTime?"#datetoday,":"")
    +(settings.removeGoogleBar?"div#googlebar,":"")
    +(settings.removeTopAd?"div.clearfix.globalLeaderboard,":"")
    +(settings.removeSideAds?"#googlead,#squareAd,#featuredprofilerounded,#marketingcontent,#googleadtest_A,#googleadtest,":"")
    +'#tblbulletins tr:first-child,span.pilRealName,#moreVids,#formSearch_Footer, #mtSmHistory, #findFriendsLinks, ._GM, #commentsContainer thead, #myMenu, .under18{display:none}'
+  // script item css
'#imgDiv{padding:0px;border:2px solid '+GMButton_borderColor+'!important;background: url(http://x.myspacecdn.com/modules/common/static/img/loadercircles.gif) '+(styleRef.backgroundColor=="transparent"?"white":styleRef.backgroundColor)+' center no-repeat;min-width:50px;min-height:50px;-moz-border-radius:3px;z-index:2000000;max-width:'+settings.maxEnlargedImgWidth+'}handle{display:block;height:14px;background-color:rgba(102, 153, 204, 0.95);-moz-border-radius:7px 7px 0px 0px;margin:-1px -1px 3px;padding:2px}colselect{display:block;height:100%;width:20px;background-color:rgba(255, 195, 79, 0.95);float:right;border:1px solid lightgrey;outline:1px solid rgba(0,0,0,0.15);-moz-outline-radius:3px;-moz-outline-radius-topright:6px;-moz-border-radius-topright:5px;cursor:pointer}.settingsPopup_content .settings_subSection span{float:left;padding-left:6px;-moz-box-sizing:border-box;width:54%;font-weight:bold;display:inline-block;cursor:default} .settingsPopup_content textarea{float:right;width:46%;font-size:10px;font-family:inherit;color:grey;border:solid transparent;border-width:2px 3px 3px 3px;background:transparent;height:17px;}.settingsPopup_content textarea:focus{height:34px;width:45%;-moz-border-radius:0px 0px 4px 4px;position:absolute;z-index:1;background:#ffc} .settingsPopup_content>.settings_subSection>div.rowOdd >textarea:focus{color:black;border-color:#e8e8ff} .settingsPopup_content>.settings_subSection>div.rowEven>textarea:focus{color:black;border-color:#fff} .settingsPopup_content>.settings_subSection>div{line-height:19px;height:19px} .settingsPopup_content>.settings_subSection>div.rowOdd{background:#e8e8ff}.appspopup_content{border-top:2px solid #b9d1f0}.appspopup_wrapper{z-index:1000201; width:100%;position:fixed;top:5%}.appspopup_box *{-moz-box-sizing:border-box}#window_overlay{z-index:1000200; width:100%; opacity:0.4; position:fixed; left:0px; top:0px; height:1240px;}.appspopup_box{-moz-border-radius:6px;padding:0px; overflow:hidden;min-width:500px;width:52%;background:transparent}.appspopup_title{padding:2px 0px 0px 2px; background:none #fff; height:21px}.appspopup_buttons{background:#fff}#settingsPopup_content{overflow:auto; height:346px;background-color:#fff}.settingsPopup_content{padding-top:0px}#settingsPopup_close{color:#d00; position:absolute; top:1px; right:1px; font-size:23px; cursor:pointer}.tabRow{border-top:none!important;text-align:left;border-bottom:1px solid rgba(50, 50, 50, 0.3)!important;margin:0px -2px!important}.settingsTabs{padding-left:3px;background:#fff}.msgArea{color:black;font-weight:normal;padding:4px;text-align:left;min-height:65px;border-top:1px solid #69c;background:#fff}#settingMsg b{font-weight:bold;color:#333}c{font-family:monospace}.activitySettingLinks{float:right;font-weight:normal;font-size:10px;margin:-15px 4px}#topnav ul li a{line-height:'+settings.navbarHeight+'}\
   #sectionArrange_content{background-color:transparent}#sectionArrange_modify{background-color:#b9d1f0;border:1px solid #c1c1c1;border-width:1px 0px;padding-top:1px;font-size:10px}#sectionArrange_modify>div{display:inline-block;padding:0px 5px 0px 1px;border-right:1px solid #69c;margin-bottom:-2px}#sectionArrange_modify>div:last-child{border-right:none}#sectionArrange_modify label{float:left}#sectionArrange_modify input{width:35px; border: 1px solid #69c;margin-left:2px;font-weight:normal}#sectionArrange_modify>div>span{float:right;font-weight:normal}\
 #sectionArrange_wrapper{height:420px;overflow:auto;padding-left:0.33%;-moz-user-select:none;background:transparent!important}\
.minicol{float:left;min-height:100%;margin-right:0.33%;padding:2px;text-align:center;-moz-border-radius:8px;background:rgba(204,204,204,0.5)}#minicol0{height:50px;border-bottom:1px solid #69c;padding:2px;background:rgba(255,224,216,0.8);margin:0px 0px 3px -0.33%;overflow-x:auto;overflow-y:hidden;white-space:nowrap}#minicol1{width:22%}#minicol2{width:45%}#minicol3{width:32%}.minisection{border:2px solid lightgrey;padding:0px 2px;-moz-border-radius:3px;margin-bottom:3px;background:#fff;cursor:default;overflow:hidden;font-family:sans-serif}\
.minicol > .mini_userdisplay     {height:110px !important}\
.minicol > .mini_updates         {height:30px  !important}\
.minicol > .mini_appnavigation   {height:40px  !important}\
.minicol > .mini_marketingbox    {height:150px !important}\
.minicol > .mini_tomannouncement {height:90px  !important}\
.minicol > .mini_friendUpdate    {height:300px !important}\
.minicol > .mini_friendspace     {height:250px !important}\
.minicol > .mini_appslayer       {height:300px !important}\
.minicol > .mini_pymkcol3        {height:90px  !important}\
.minicol > .mini_userstatus      {height:120px !important}\
.minicol > .mini_bulletins       {height:100px !important}\
.mini_friendspace>.minisection{width:25%!important;border:solid white;border-width:1px 0px;float:left;background:lightgrey;font:sans-serif 9px;padding:0px}#mini_FSTabRow{height:16px;border:none!important;background:lightgrey}\
#minicol0>.minisection{height:100% !important;max-height:45px;width:-moz-max-content!important;display:inline-block; margin-right:1px;padding:0px 1px}GMButtonWrapper{display:inline-block;-moz-border-radius:6px 6px 0px 0px}\
GMButton{display:block;text-align:center;cursor:pointer;-moz-border-radius:4px 4px 0px 0px;border-bottom:none 0px!important}\
GMButton.active{font-weight:bold}\
GMButton.inactive{font-weight:normal}\
.settingsTabs GMButtonWrapper{height:17px;margin:2px 1px -1px;}\
.settingsTabs GMButton.active{border:1px solid rgba(0,0,0,0.3);border-bottom:1px solid #b9d1f0!important;background-color:#b9d1f0}\
.settingsTabs GMButton{border:1px solid #a9c1e0;width:145px}\
#settings_subtabRow{height:18px;width:100%;border:solid 1px rgba(0,0,0,0.3);border-style:solid none}\
#settings_subtabRow>GMButton{width:20%;height:100%;line-height:16px;float:left;border-right:1px solid #69c;-moz-border-radius:0px;font-size:10px;color:black;text-transform:capitalize;background-color:#b9d1f0}\
#settings_subtabRow>GMButton.active{background-color:white}\
#settings_subtabRow>GMButton:last-child{border-right:none}'
+  // general css
'#mainContent>div{margin:10px 10px 0px 0px}#mainContent{clear:both;padding:0px 0px 0px 10px}span.title{padding:1px 2px 0px 0px;-moz-user-select:none;height:auto;width:auto;padding:2px 1px 0px 0px !important;line-height:18px}h4.top div div{line-height:20px;padding:0px!important;margin:0px 5px!important}.ajaxLoaderGraphic{height:90px;margin:auto}.controlbox{display:none!important}.top{-moz-user-select:none}#appslayer span.controlbox{display:block!important;width:auto}#updates h4.top div div{height:22px;line-height:20px}#main{padding-top:4px!important;width:-moz-max-content!important}'
+  // bulletins css
'#bulletinBlacklistControls{display:block;float:right;cursor:default;font-size:9px}#col3 #bulletinBlacklistControls span{font-size:11px;font-family:sans-serif;padding:0px!important} #bulletinBlacklistControls span{cursor:pointer;font-weight:normal;padding:0px 7px;width:60px;white-space:nowrap} #bulletinBlacklistControls span:last-child{border-right:none;padding:0px 0px 0px 7px}#bulletinBlacklistControls span.active{font-weight:bold} .bulletinControls+span{display:block;min-height:50px;max-height:400px;overflow:auto;text-align:left;padding:2px}img{max-width:100%!important}#bulletins .middle{padding:0px}#bulletins div.datagrid{padding:0px}#tblbulletins{border-spacing:1px}#tblbulletins a{white-space:nowrap}.cols{margin:0px}.bulletinControls{border-width:1px!important;border-style:none none solid!important;margin:-2px -2px 0px -2px;background:'+styleRef.backgroundColor+';padding:0px!important;text-align:left}.bulletinControls>a{text-align:center;border-right: 1px solid;display:inline-block;height:16px;-moz-box-sizing:border-box;width:33.333%}.bulletinControls>a:last-child{border-right:none}.cols th, .cols td{padding:1px !important}#GMWindow .controlbox{display:block!important;width:auto}#GMWindow{position:fixed;min-width:500px;max-width:885px;z-index:1000002}#GMWindow .title{max-width:95%;overflow:hidden}#GMWindow .title img{display:none}#GMWindow .middle{border-bottom-width:2px'+(styleRef.backgroundColor=="transparent"?";background-color:white":"")+'}#tblCol2{width:60px}#tblCol3{width:auto}.datagrid{max-height:'+settings.bulletinsHeight+';overflow:auto}'+( settings.showPostersPic?"#tblbulletins tr>td:first-child img{width:45px;display:block;max-height:52px}#tblbulletins tr>td:first-child>a{text-align:center;white-space:nowrap}#tblCol1{width:49px}" + (settings.hidePostersName?"#tblbulletins tr>td:first-child>a{font-size:0px!important;line-height:0px}":""):"#tblCol1{width:80px}" )+'#tblbulletins a.photoContainerSmall{margin:0px!important;padding:1px}'
+  // updates css
'ul.activityDates{width:100%;margin:0px;max-height:'+settings.updatesHeight+'!important;overflow:auto;-moz-box-sizing:border-box;padding:0px 1px}.activityDates li h4.dateHeader{border-bottom:1px solid;width:100%;margin-bottom:2px!important;padding:0px!important}.activityDates li div h4{border-bottom:none!important}#col1 .activityDates img,#col3 .activityDates img{height:32px;width:48px}li.photoActivity.media li{margin:4px 4px 0px 0px}a.photoContainerSmall{margin:0px!important}'
+  // comments css
'#comments .roweven img,#comments .rowodd img{max-width:'+settings.maxCommentImgWidth+'}#commentsContainer .cols td{vertical-align:top}#commentsContainer .cols td.name{text-align:center;overflow:hidden;}#comments .cols th{padding:0px}#col2 #comments .msProfileLink{width:50px!important}#col1 #commentsContainer .msProfileLink,#col3 #commentsContainer .msProfileLink{width:40px!important}#comments img[src="http://x.myspacecdn.com/images/onlinenow.gif"]{'+(!$('bulletins')?"display:none;":"")+'max-width:40px;margin:0px -20px}#commentsContainer{max-height:'+settings.commentsBoxHeight+';overflow:auto}td.columnsWidening{vertical-align:top!important}#comments th{text-align:center}img.profileimagelink{width:100%}td.commentCommands{font-size:0px!important;border-top:dashed 1px!important;padding:0px;line-height:10px}td.commentCommands a{font-size:9px;margin-right:12px}#comments .msProfileTextLink + br,#comments .msProfileTextLink{font-size:9px;display:'+(settings.hideCommentersNames?"none":"inline")+';width:100%;overflow:hidden}#comments .msProfileLink + br'+(settings.hideCommentDates?",.columnsWidening h4":"")+',td.check{display:none}'
+  // status css
'#hsmMain{padding:1px 2px}#hsmStatusLine{margin-top:0px}#friendStatuses{max-height:'+settings.maxSandMHeight+';overflow:auto}#col3 #statusUpdates td.col1{width:auto}#col3 #statusUpdates td.col2{padding:1px!important}#col3 #statusUpdates td.col1 img{margin:2px!important}#hsmUpdateDialog{padding:1px;width:434px!important;left:1px!important}#col3 #hsmUpdateDialog{left:10px}#col3 #hsmSmileyPalette{left:0px!important;direction:rtl}#statusUpdates td.col1 img{margin:2px}#userstatus .middle{padding:0px}#userstatus td.col1{width:auto}#statusUpdates td.col2{padding:0px}#col1 #tblbulletins a,#col3 #tblbulletins a,#col1 #userstatus .middle,#col3 #userstatus .middle{font-size:9px}#col1 #userstatus .col1{display:none}#col1 #userstatus .col2{line-height:12px}'
+  // friendspace css
'div#friends{max-height:'+settings.friendsHeight+'!important;overflow:auto;padding:0px!important}#FSLinksDiv{text-align:center;border:2px solid '+GMButton_borderColor+'!important;position:absolute;-moz-box-sizing:border-box;-moz-border-radius:4px;display:none;background:'+(styleRef.backgroundColor!="transparent"?styleRef.backgroundColor:"white")+'}#FSLinksDiv a{display:inline-block;margin:3px;font-size:9px}.msOnlineNow{font-size:9px;font-weight:normal}.FSUsrBtn{display:block;white-space:nowrap;margin:0px}#FSUsrBtn{display:block!important}#friendspace GMButtonWrapper{height:21px;margin:0px .5%;width:24%}\
#friendspace GMButton.active{color:'+GMButton_txtColor+';border:1px solid rgba(0,0,0,0.3);border-bottom:1px solid '+GMButton_borderColor+'!important;background:'+GMButton_borderColor+'}\
#col1 GMButton.active,#col3 GMButton.active{font-weight:normal}\
#col1 GMButton{font:9px sans-serif;overflow:hidden}\
#friendspace GMButton{line-height:20px;border:1px solid '+GMButton_borderColor+'}\
#friendspace .inp{height:20px!important;padding:0px;margin-top:3px}#col3 #friendspace .inp{width:64%}#searchResults{overflow-y:auto;overflow-x:hidden}#searchResults li, #onlineFriends li{float:left;text-align:center; width: 25%;margin:3px 0px}#friendspace div.middle div div div.friend{padding:0px;margin:3px 0px;width:25%}#col1 #friendsParent .msProfileLink,#col1 #onlineFriends .msProfileLink,#col3 #friendsParent .msProfileLink,#col3 #onlineFriends .msProfileLink{width:90%!important}#col1 .msProfileTextLink,#col1 .pilDisplayName{font-size:9px}#onlineFriends{max-height:'+settings.OFSMaxHeight+';overflow:auto}#friendspace .middle > div > div{border-top:solid 3px '+GMButton_borderColor+';margin:-2px;margin-top:0px;border-bottom:none}#friendspace>.middle{-moz-border-radius:0px 0px 8px 8px;border-bottom:solid '+styleRef.borderLeftColor+' 2px;}#friendspace>.bottom{display:none}#friendsearch{-moz-border-radius:0px 0px 5px 5px}#friendsParent>br{display:none}.friend .msOnlineNow img{height:auto!important;width:13px!important}.title .titleIcon{display:block;float:left;margin:0px 5px 3px 1px!important;background-position:2px -6896px !important;width:17px!important;height:18px!important}'
+  // marketingbox css
'#col1 #contentWrapper{font-size:9px!important}#contentWrapper{text-align:center}#contentWrapper>*{text-align:left}#marketingbox div.middle div div{padding:0px}#col1 .video_wrapL, #col1 .video_wrapR{display:inline-block;float:none!important}#col1 #marketingbox .middle{font-size:9px;padding:1px}#td_title{font-size:11px}#col1 .video_wrapL,#col1 .video_wrapR{height:auto!important;width:85px!important;margin-right:0px!important}#col1 .video_wrapL img,#col1 .video_wrapR img{max-height:65px}#col1 .cnv_user{font-size:9px!important}#col1 .cnv_title{font-size:11px!important}'
+  // userdisplay css
(settings.shrinkUserDisplay?"#linksGroup,#viewMyList{display:none}div#userdisplay #stats{border-bottom:none;margin:0px;padding-bottom:0px}":"")
);
}catch(x){
    reportError(x);
}
})();

function mkRequest(url, method, headers, data, onload, onerror, onstatechange){
    GM_xmlhttpRequest({
        url:      url,
        method:   method,
        headers:  headers,
        data:     data,
        onload:   onload,
        onerror:  onerror,
        onreadystatchange: onstatechange,
    });
}

function stopProp(e){e.stopPropagation(); e.preventDefault()}

function removeSelf(){this.parentNode.removeChild(this)}

function XPArr(exp, contextNode, callback, frame){
    var xp = document.evaluate(exp, contextNode, null, 0, null), iter, arr = [];
    while(iter = xp.iterateNext()) arr.push(iter);
    if(callback) arr.forEach(function(elm){callback.apply(elm)});
    return arr;
}
function addElement(tag, atts, tgt, method){
    var elm = document.createElement(tag);
    if(atts) for(var i in atts) elm.setAttribute(i, atts[i]);
    if(tgt){
        if(!method || method == "appendChild")   tgt.appendChild(elm);
        else if(method == "replaceChild")        tgt.parentNode.replaceChild(elm, tgt);
        else if(method == "insertBefore")        tgt.parentNode.insertBefore(elm, tgt);
    }
    return elm;
}
function tween(obj, prop, start, end, duration, unit, onfinish){
    var difference = Math.max(start,end) - Math.min(start,end),
        increment = end>start ? difference/duration/40 : (difference/duration/40)*-1,
        unit = unit || "",
        tmr = setTimeout(tweenFunct, 100);
    return tmr;
    function tweenFunct(){
        if((start+=increment).toFixed(4) == end){
            if(onfinish) onfinish();
            clearTimeout(tmr);
        }else
            setTimeout(tweenFunct);
        obj[prop] = start + unit;
    }
}
function getStyle(elm, prop, state){
    var styleObj = document.defaultView.getComputedStyle(elm, state || null);
    return styleObj[prop] || styleObj;
}
function $(id){return document.getElementById(id)}

function byClass(root, className, toArr){
    return root.getElementsByClassName(className);
    if(toArr)  return Array.filter( nl, function(){ return true } );
    return nl;
}

function $$(id, frame){
    frame = frame || iframe;
    return frame.contentDocument? frame.contentDocument.getElementById(id) : frame.document.getElementById(id);
}
function trace(msg){
    unsafeWindow.console.log(msg);
    return msg;
}
function tags(elm, tag, toArray){
    var list = elm.getElementsByTagName(tag);
    if(toArray)  return Array.filter( list, function(){ return true } );
    return list;
}