// ==UserScript==
// @name           facebook.com - Özellestirici
// @version        1.0
// @description    Facebooku Özellestirin
// @namespace      http://msnkopatforum.tk
// @author         msnkopatforum.tk <mustafa3403@gmail.com>

// @require        http://buzzy.hostoi.com/AutoUpdater.js

// @include        http://www.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://www.facebook.com/*
// @match          https://*.facebook.com/*

// @exclude        http://*.facebook.com/sharer*
// @exclude        http://*.facebook.com/ajax/*
// @exclude        http://*.facebook.com/plugins/*

// @exclude        http://apps.facebook.com/*
// @exclude        http://facebook.com/apps/*
// ==/UserScript==

const DEBUG = false;

const script_id = 88633;
const script_version = '1.0';

const gm_class = ' gm_simplified_wall';

/* default settings */
var extras = new Array();
extras['friendships']  = {'hide':false};
extras['likes']        = {'hide':false};
extras['applications'] = {'hide':true};

extras['links']        = {'hide':false};
extras['photos']       = {'hide':false};
extras['groups']       = {'hide':false};
extras['events']       = {'hide':false};


var sty = new Array();
sty[8]   = 'friendships';   sty[12]  = 'friendships';
sty[11]  = 'likes';         sty[161] = 'likes';       sty[282] = 'likes';       sty[283] = 'likes';       sty[7]  = 'likes';
sty[4]   = 'groups';
sty[38]  = 'events';        sty[178] = 'events';
sty[6]   = 'photos';        sty[7]   = 'photos';      sty[60]  = 'photos';
sty[65]  = 'photos';        sty[247] = 'photos';
sty[5]   = 'links';         sty[263] = 'links';
sty[237] = 'applications';  sty[313] = 'applications';

/* images */
var image = new Array;
image['friendships']  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABGUlEQVR42mL89/f/fwYKAAsyZ+WO6wxv3n9n+PHzD0NxghlRBjDBGHtOPGR48OQjw5evvxj+/PnHsOfEQ9IMuHrnNYoEOp+gARSHAQsL1CxGBgaG/wh+9lprhntvr6BoUhLWYZgafBSiHBYLD55/ZFi59ToDAwMDw7FfaQy/WBBhsCPjI4oBHjP4GbanfUT1goIkPwMz1NZfLA8ZOn3XMHT6riHeC6t33WA4/C0FxWZkG7G5BG7AhCWnGX7++Au3GRnA+OWbQ7DHAkwz2bGArJntjzzcJkI2e87iZ1AS1mFg+fz1G8Ov338YGBgYGNQZehgYGBgYLvOFoihG9zuM7zGDHxGNyAA97rEFHl4D8BmGnqAYKc3OgAEAcDyFP7wFB6YAAAAASUVORK5CYII=';
image['likes']        = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABH0lEQVR42mL8////fwYKAAsDAwPDrFWnGa7cfkWyZh1VMYgBV26/YmjKdWRgZmIiWvPff/8Y6ibvhxjAwMDA8O/ff4Z///5iKPTLWsIgLMDFML8tCKtBeK0s6tjGcGRZOl6X4DXgzqN3DAwMDAxvP3wj3YAV2y4zWBvJExcL2MCyLRdRnO+XtYSBgYGBwdJAjqEyzQ5hQFL1WoZb99/AFcAAsmZktk3UTFQX3Lr/hiHMU5eBgYGBYdX2ywQDDasXnr78RFlKJBU0TD2AmhJJNiDTkoGBgYGBjY0N0wBYIFkbyTP4O2syWBmiRqW8lACDkJAQwgtqiiIMR889hAtsmBrDwMDAwHDmylOGDXuuM5R170DRPLHaB8VARkqzM2AAVfFZlaoTn9QAAAAASUVORK5CYII=';
image['groups']       = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAA7ElEQVR42mL8////fwYKAMuWZb0MD26dJ0uzgpohA8uDW+cZkqOdyDJg7tJ9DEwMFAIWBgYGBnZJPTK174MYgAw2r1rNcPrYcQZTK0sG37BQBgYGBoaLZ84yPLp3j0FOSYlB38QYRT2GF04fO45CMzAwMDy6dw+FxmsAqQDDAGlZWRSagYGBgV9QEIXGa0BIXAwKzcDAwGBsaYFCY8QCegAyMDAwTGxtZzC1smSQU1KC+33ftu0YAcmELQCR+egBh85HcUHThD7KA5HklCgho8bQVddIlmYVLVMGxs+fP///9esXWQawsbExAAYAS9RLk0BrJx8AAAAASUVORK5CYII=';
image['events']       = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABEUlEQVR42mL89/f/fwYKAMu6AD+GO5s3k6xRxdeXIWjDJgaWO5s3M9g6O5NswGGopSwMDAwMv3/9It8LlBrAUBkX958cUBkX9//f3///mZANu3DuJENsmAdDbJgHw4olsyEWFKczVBank+6CmFB3rGx0F7CgGxgb5sHAxyfA4O0XTFQQMKELLF61g2HqnBUMWzetJc8AWFjwCwgyXLpwhmFibxMDH78AQ3piCMOlC2ewRyOyxt6OegZ+AUEGGzsnBj0DEwY9AxPC6QAGDIzMGRav2kFaQnr28CHD3g0bSE4/zx4+hBggICzM8PfPHwZhMTGiNb999YpBQFgYYoCknBzDnI4Okl1gbGvLwMDAwAAYAKNFvfW9NNRIAAAAAElFTkSuQmCC';
image['photos']       = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFRQTFRFhlUY8/PztHIg46lhoGYdomcdkVwa6b2Fwnwj46pjp2oe2o0t2o4u46he1YcmlF4bvnkiqmwetnQh6r6Hk5OTflAXnazL7+/v68KP////fX19////U3yTvAAAABx0Uk5T////////////////////////////////////ABey4tcAAABuSURBVHjaVM5ZEoAgDANQFPd9q23h/ve01EEkn29IiblcyuW9Nw45Bp0C3zEcIWsFyFoKTER2ryYiTnAAmPNM0ILE/oAGgPV9gawwG9j0RvgzANUwKhSIjvulbORo2QnIuHyHQL5UQFpfikeAAQDfnBU4ilUuIAAAAABJRU5ErkJggg==';
image['links']        = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADlQTFRFxM3g5eXlWXOo3drUXWqIaWZpQF2b8O/wh5m/7e3ttMDX2cOT1Lh2O1mY7OHJcF5Qj4Rv////////mSm1QAAAABN0Uk5T////////////////////////ALJ93AgAAABcSURBVHjadI9bDoAgDARbER9ApXL/wyqWjUTi/HWyabtUKvmFTBzAhDZShDgfNKYqSGQmE5aQEGSSLnGLZRPvv4n1f8dwpRNIOAh82man6ILPmXkvVq5jEJcAAwDJzQ7zfrx8lwAAAABJRU5ErkJggg==';
image['applications'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAE5QTFRF4OTv+LE1enp6i1gAhYyctra2+b1TXlE8MDAwRkZGmJiYf39/rKyswoopAAAAkZGR9fX17+/v68KPODg41tbW3NzciYmJ////a2tr////FPwI9wAAABp0Uk5T/////////////////////////////////wAUIgDaAAAAh0lEQVR42mSO2w6DMAxDA5Rx3QZt0yT//6OLCxoS+KXqiWOHikLFzEp9SHcR2dWBbpsC9CGEXjFnds/f4XNm95BKjFEccNUFHisGD0IftXYTpXVZVktWnW+A7ErJ1KNeTecr3xMQ4e9gynkyOIamQ4vN4zijlD4D6dHSIh0ZcoC2knKe8xNgAEYsFLCnqRP9AAAAAElFTkSuQmCC';


/* whitelist */
const whitelist = new Array(
    46 // statuses
);

const whitelist_regex = new RegExp(whitelist.join("|"));

var content, stories;


  /**
   * Local storage/greasemonkey Functions
   */

var storage = 'localstorage';

if (typeof GM_deleteValue === "function") {
    storage = 'greasemonkey';
}


function setValue(key, value)
{
    switch (storage) {
        case 'greasemonkey':
        GM_setValue(key, value);
        break;

        case 'localstorage':
        localStorage.setItem(key , value);
        break;
    }
    return false;
}


function getValue(key)
{
    switch (storage) {
        case 'greasemonkey':
        return GM_getValue(key);
        break;

        case 'localstorage':
        var val = localStorage.getItem(key);
        if (val == 'true') { return true; }
        else if (val == 'false') { return false; }
        else if (val) { return val; }
        break;
    }
    return false;
}


function deleteValue(key)
{
    switch (storage) {
        case 'greasemonkey':
        GM_deleteValue(key);
        break;

        case 'localstorage':
        localStorage.removeItem(key);
        break;
    }
    return false;
}


function log(text)
{
    if (DEBUG === true && typeof GM_log === 'function' && text !== '') {
        GM_log(text);
    }
    return false;
}


function g(id)
{
    if (id && typeof id === 'string') {
        id = document.querySelectorAll(id);
    }
    return id||null;
}


function edit_wall()
{
    var story, story_class, story_data, story_type, substories, icon_wrapper, icon, names_count, story_content, attach, pic, header;

    for (i = 0; i <= stories.length-1; i++) {

        story = stories.item(i);
        story_class = story.className;

        if (story_class.indexOf(gm_class) >= 0) {
        	continue;
        }

        story_data = story.getAttribute('data-ft'); if(!story_data) continue;
        story_type = story_data.match(/\"sty\":(\d+)/)[1];
        substories = story_data.match(/\"substories\":(\d+)/);

        extra_type = sty[story_type];

        /* add gm class */
        story.className += extra_type ? gm_class + ' gm_' + extra_type : gm_class;

        /* hide story */
        if (extra_type != null && extras[extra_type]['hide'] == true) {
            story.style.display = 'none';
        }

        if (
          story_class.indexOf('uiSubStream') >= 0
          || story.getElementsByClassName('uiStreamPassive').length == 0
          || !whitelist_regex.test(story_type)
        ) {
            continue;
        }

        story_content = story.getElementsByClassName('UIImageBlock_Content').item(0);

        /* count names in message */
        names_count  = story_content.getElementsByClassName('passiveName').length;
        names_count += story_content.getElementsByClassName('uiTooltip').length;

        /* get icon */
        icon_wrapper = story_content.getElementsByClassName('uiStreamSource').item(0);
        if (icon_wrapper == null) continue;

        icon = icon_wrapper.getElementsByClassName('img').item(0);

        if (icon != null && !substories) {

            if (attach = story.getElementsByClassName('uiStreamAttachments').item(0)) {
                if (extra_type == 'friendships' || extra_type == 'events') {
                    story_content.removeChild(attach);
                } else if (names_count <= 1) {
                    continue;
                }
            }

            story.className += ' simplified';

            /* remove avatar */
            pic = story.getElementsByClassName('UIImageBlock_Image').item(0);
            pic.parentNode.removeChild(pic);

            /* message */
            header = story_content.getElementsByClassName('uiStreamMessage').item(0);

            header.innerHTML = '<span class="icon"></span>' + header.innerHTML;
            header.firstChild.appendChild(icon);

            /* remove original icon or time */
            if (icon_wrapper && icon_wrapper.lastChild.className == 'timestamp') {
                story_content.removeChild(icon_wrapper.parentNode);
            }

            continue;
        }

        else if (names_count > 1 || substories != null || story_type == 60) { // 60 = xy and x others changed their profile pictures

            story.className += substories ? ' substories' : ' no-avatar';

            /* remove avatar */
            pic = story.getElementsByClassName('UIImageBlock_Image').item(0);
            pic.parentNode.removeChild(pic);

            continue;
        }
    }

    delete story, story_class, story_data, story_type, substories, icon_wrapper, icon, names_count, story_content, attach, pic, header;

    /* update counter */
    for (extra_type in extras) {
        updateCounter(extra_type);
    }

    return false;
}

var gm_class_length = 0;

function check_wall()
{
    isBox = createBox();

    stories = g('ul#home_stream li.uiListLight');
    var stories_length = stories.length;

    if (stories && isBox && stories_length != 0 && stories_length != gm_class_length) {
        if (content = document.getElementById("home_stream")) {
            edit_wall();
            gm_class_length = stories_length;
        }
    }

    delete stories, stories_length, content;

    return false;
}


function updateCounter(extra_type)
{
    var extra_class = 'gm_' + extra_type;

    if (count_el = document.getElementById('sx_' + extra_type +'_count')) {

        var count = document.getElementsByClassName(extra_class).length;

        if (count > 0) {
            count_el.parentNode.style.display = 'inline';
            count_el.innerHTML = count;
        } else {
            count_el.parentNode.style.display = 'none';
        }
    }

    delete extra_class, count_el;

    return false;
}


function toggleExtras(extra_type)
{
    var extra_class, els, length, display, parent;

    extra_class = 'gm_' + extra_type;

    els = content.getElementsByClassName(extra_class);
    length = els.length - 1;

    if (length >= 0) {

        display = '';

        if (extras[extra_type]['hide'] == true) {
            display = 'none';
        }

	    for (i = 0; i <= length; i++) {
            parent = els.item(i);
            parent.style.display = display;
        }
    }

    delete extra_class, els, length, display, parent;

    saveSettings();

    return false;
}


function addEvents()
{
    var extra_class;

    try {

        for (extra_type in extras) {
            extra_class = 'sx_' + extra_type;
            document.getElementById(extra_class).addEventListener("change", function () { changeSettings(this.getAttribute('data-gm-type'), this); }, false);
        }

        /* More link event */
        document.getElementById('navMoreLink').addEventListener("click", toggleBox, false);
        document.getElementById('navLessLink').addEventListener("click", toggleBox, false);
    } catch (e) {
        log(e);
    }

    delete extra_class;

    return false;
}


function createBox()
{
    if (!document.getElementById('home_stream')) return false;
    if (document.getElementById('pagelet_simplifiedwallbox')) { addEvents(); return true; }

    var col = document.getElementById('rightCol');

    var box = document.createElement('div');
        box.setAttribute('id', 'pagelet_simplifiedwallbox');

    var boxTitle = document.createElement('div');
        boxTitle.setAttribute('class', 'uiHeader uiHeaderTopAndBottomBorder mbm pbs');

    var boxTitle_HTML  = '<div class="clearfix uiHeaderTop">'
                       + '<div class="uiTextSubtitle uiHeaderActions rfloat"><a href="http://msnkopatcocuk.yetkinforum.com/index.htm" title="Sitemize Girmek İçin Tıklayınız" target="_blank">Sitemiz :)</a></div>'
                       + '<div><h4 class="uiHeaderTitle">Özellestirici <small>v'+script_version+'<small></h4></div>'
                       + '</div>';

    boxTitle.innerHTML = boxTitle_HTML;
    box.appendChild(boxTitle);

    var boxContent = document.createElement('div');

    box.appendChild(boxContent);
    col.appendChild(box);

    delete col, boxTitle, boxTitle_HTML;

    var i = 1;

    var extra_class, section, section_HTML, input;

    for (extra_type in extras) {

        extra_class = 'sx_' + extra_type;

        section = document.createElement('div');
        section.setAttribute('class', 'UIImageBlock clearfix mbs');

        if (i > 3) {
            section.className += ' hidden';
        }

        section_HTML = ''
                     + '<img class="img UIImageBlock_Image UIImageBlock_ICON_Image" src="'+ image[extra_type] +'">'
                     + '<div class="UIImageBlock_Content UIImageBlock_ICON_Content">'
                     + '<input type="checkbox" id="'+ extra_class +'" data-gm-type="'+ extra_type +'">'
                     + '<label for="'+ extra_class +'">Hide '+ extra_type +'</label>'
                     + ' <small style="display: none;"><span id="'+ extra_class +'_count">0</span></small>'
                     + '</div>'

        section.innerHTML += section_HTML;

        boxContent.appendChild(section);

        if (extras[extra_type]['hide'] == true) {
            input = section.getElementsByTagName('input')[0];
            input.setAttribute('checked', 'true');
        }

        i++;
    }

    delete extra_class, section, section_HTML, input;

    var moreText;
    var lessText;

    // more text
    try { moreText = g('div#bookmarks_menu div.navMoreLess .navMore a')[0].innerHTML;}
    catch (e) { moreText = 'Çogalt'; log(e); }

    // less link
    try { lessText = g('div#bookmarks_menu div.navMoreLess .navLess a')[0].innerHTML;}
    catch (e) { lessText = 'Azalt'; log(e); }

    var links_HTML  = '<div class="navMoreLess">'
                    + '<div class="navMore">'
                    + '<a href="#" class="" id="navMoreLink">'+ moreText +'</a>'
                    + '</div>'
                    + '<span class="navLess"><a href="#" id="navLessLink">'+ lessText +'</a></span>'
                    + '</div>';

    box.innerHTML += links_HTML;

    delete box, boxContent, moreText, lessText, links_HTML;

    /* set events for checkboxes */
    addEvents();

    return true;
}


  /**
   *  Settings functions
   */

function saveSettings()
{
    var source;

    for (extra_type in extras) {

        if (storage == 'greasemonkey') {
            source = extras[extra_type].toSource();
        } else { // chrome

            source = '({';

            for (val in extras[extra_type]) {
                source += val + ':' + '"' + extras[extra_type][val] + '", ';
            }

            re = new RegExp('[, ]+$', 'g');
            source = source.replace(re, '');

            source += '})';
        }

        if (source.length <= 4) continue;

        setValue(extra_type, source);
    }

    delete source;

    return false;
}

function loadSettings()
{
    var value;

    for (extra_type in extras) {

        value = getValue(extra_type);

        if (value) {
            extras[extra_type] = eval(value);

            if (extras[extra_type]['hide'] == 'true') {
                extras[extra_type]['hide'] = true;
            }
        }
    }

    delete value;

    return false;
}

function changeSettings(extra_type, el)
{
    extras[extra_type]['hide'] = el.checked;

    toggleExtras(extra_type);
    saveSettings();

    return false;
}


  /**
   * Toggle class
   */
function toggleBox(evt)
{
    var els, el, display;

    try {
        els = g('#pagelet_simplifiedwallbox div.hidden');

        for (i=0; i<=els.length-1; i++) {
            el = els.item(i);
            display  = el.style.display;

            if (display == '' || display == 'none') {
                el.style.display = 'block';
            } else {
                el.style.display = 'none';
            }
        }

        if (display == '' || display == 'none') {
            g('#pagelet_simplifiedwallbox div.navMore')[0].style.display = 'none';
            g('#pagelet_simplifiedwallbox span.navLess')[0].style.display = 'inline-block';
        } else {
            g('#pagelet_simplifiedwallbox .navLess')[0].style.display = 'none';
            g('#pagelet_simplifiedwallbox .navMore')[0].style.display = 'block';
        }
    } catch(e) {
        log(e);
    }

    delete els, el, display;

    return false;
}

  /**
   * CSS Styles
   */

function addStyle(css)
{
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else if (head = document.getElementsByTagName('head')[0]) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		head.appendChild(style);
	}

    delete head, style, css;

    return false;
}

function cssStyles()
{
    /* box */
    addStyle(
     ' #pagelet_simplifiedwallbox div.UIImageBlock {  }'
    +' #pagelet_simplifiedwallbox div.UIImageBlock img.img { margin-top: 1px; }'
    +' #pagelet_simplifiedwallbox div.UIImageBlock_ICON_Content label { vertical-align: text-top; }'
    +' #pagelet_simplifiedwallbox div.UIImageBlock_ICON_Content small { background-color: #D8DFEA; color: #3B5998; font-size: 9px; font-weight: bold; float: right; line-height: 16px; padding: 0 4px; -moz-border-radius: 2px; }'
    +' #pagelet_simplifiedwallbox input { cursor: pointer; margin: 0 5px 0 0; padding: 0px; position: relative; top: 2px; }'
    +' #pagelet_simplifiedwallbox .uiHeaderTitle small { font-size: smaller; font-weight: normal; }'
    +' #pagelet_simplifiedwallbox div.hidden { display: none; }'
    +' #pagelet_simplifiedwallbox div.navMoreLess { padding-left: 21px; }'
    );

    /* simplified messages */
    addStyle(
     ' .gm_simplified_wall.simplified { min-height: 18px; padding: 0px; }'
    +' .gm_simplified_wall.simplified.uiListLight {  font-size: 10px;padding: 5px 2px; }'
    +' .gm_simplified_wall.simplified .uiStreamMessage { font-size: 11px !important; margin: 0px; padding-left: 20px; margin-left: -20px; }'
    +' .gm_simplified_wall.simplified .uiStreamMessage i.img { margin: 0 4px 0 0; vertical-align: text-top; }'
    +' .gm_simplified_wall.simplified .uiStreamMessage span.icon .img { margin: 0 4px 0 0; vertical-align: text-top; }'
    +' .gm_simplified_wall.simplified .uiStreamMessage span.text_exposed_link { margin: 5px 0; padding-left: 20px;}'
    +' .gm_simplified_wall.simplified form.commentable_item, .gm_simplified_wall.simplified .uiStreamSubstories { font-size: 11px !important; margin-left: 20px; padding: 2px 0 0px; }'
    +' .gm_simplified_wall.simplified div.mvm { margin: 3px 0 3px 20px; }'
    +' .gm_simplified_wall.simplified.normal-font div.mvm { margin: 10px 0 10px 20px; }'
    +' .gm_simplified_wall.simplified div.uiStreamAttachments img.img { max-height: 80px; }'
    );

    /* messages without avatar */
    addStyle(
     ' .gm_simplified_wall.no-avatar { height: 18px; min-height: 18px; padding: 0px; }'
    +' .gm_simplified_wall.no-avatar.uiListLight { font-size: 10px; padding: 5px 2px; }'
    +' .gm_simplified_wall.no-avatar a.UIImageBlock_MED_Image { display: none; }'
    +' .gm_simplified_wall.no-avatar .uiStreamMessage { font-size: 11px !important; }'
    +' .gm_simplified_wall.no-avatar .uiListHorizontal { display: none; }'
    +' .gm_simplified_wall.no-avatar .uiStreamSource { display: none; }'
    );

    /* substories */
    /*
    addStyle(
     ' .gm_simplified_wall.substories { padding-left: 20px; }'
    +' .gm_simplified_wall.substories .uiStreamMessage.uiStreamPassive { margin-left: -20px; }'
    );
    */

    return false;
}

function starter()
{
    cssStyles();
    loadSettings();
    check_wall();

    var home_stream;

    if (home_stream = document.getElementById('content')) {
        var t; // timeout
        setTimeout ( function () {
            home_stream.addEventListener("DOMNodeInserted", function () { clearTimeout(t); t = setTimeout( check_wall, 50 ); }, false);
        }, 500);
    }

    delete home_stream;

    if (typeof autoUpdate == 'function' && isBox) {
        autoUpdate (script_id, script_version);
    }

    return false;
}

starter();