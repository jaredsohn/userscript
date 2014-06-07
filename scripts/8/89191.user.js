// ==UserScript==
// @name          facebook.com - Özellestirici Versiyon 2.0
// @version       2.0
// @require       msnkopatcocuk.yetkinforum.com/index.htm
// @description   Paylasım Gizleyici Versiyon 2.0
// @namespace     http://www.msnkopatforum.tk
// @original      msnkopatforum.tk <mustafa3403@gmail.com> 
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @match         http://*.facebook.com/*
// @match         https://*.facebook.com/*
// @exclude       http://*.facebook.com/sharer*
// @exclude       http://*.facebook.com/ajax/*
// @exclude       http://*.facebook.com/plugins/*
// @exclude       http://apps.facebook.com/*
// @exclude       http://facebook.com/apps/*
// ==/UserScript==

var script_id = 89191;
var script_version = '2.0';

var gm_class = ' gm_simplified_wall_fix';

sty = new Array();
sty[8] = 'friendships'; sty[12] = 'friendships';
sty[161] = 'likes'; sty[283] = 'likes';
sty[4] = 'groups';
sty[1] = 'events'; sty[38] = 'events'; sty[178] = 'events';
sty[6] = 'photo'; sty[7] = 'photo'; sty[60] = 'photo'; sty[65] = 'photo'; sty[247] = 'photo';
sty[5] = 'link'; sty[263] = 'link';
sty[173] = 'application'; sty[237] = 'application';
sty[2] = 'note'; sty[66] = 'note'; sty[68] = 'note';
sty[10] = 'relationship';
sty[3] = 'video'; sty[130] = 'video';
sty[282] = 'activities';

var image_simplified = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAMAAADHVLbdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADZQTFRFbH2sQ1aSQ1iSQleSQlaSOE2LQ1eTMUSGMEOFMUWGQlaRRFeSRFiSQ1eSylwY/cGBwsze////UYQQ+AAAABJ0Uk5T//////////////////////8A4r+/EgAAAF5JREFUeNpczgkKACEIBVBbZlfT+192/A0UzQeJZ4iSu1Nh5lJZJBOFxUaEVLVOF9LW7ukHTtMJXucXZ5h//yRSNwxjf7jnMNtxW+xHS/W0DEeFNZ4rDYNfuif9FWAA7bMLnsUPHhAAAAAASUVORK5CYII=';

image = new Array();
image['friendships'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABGUlEQVR42mL89/f/fwYKAAsyZ+WO6wxv3n9n+PHzD0NxghlRBjDBGHtOPGR48OQjw5evvxj+/PnHsOfEQ9IMuHrnNYoEOp+gARSHAQsL1CxGBgaG/wh+9lprhntvr6BoUhLWYZgafBSiHBYLD55/ZFi59ToDAwMDw7FfaQy/WBBhsCPjI4oBHjP4GbanfUT1goIkPwMz1NZfLA8ZOn3XMHT6riHeC6t33WA4/C0FxWZkG7G5BG7AhCWnGX7++Au3GRnA+OWbQ7DHAkwz2bGArJntjzzcJkI2e87iZ1AS1mFg+fz1G8Ov338YGBgYGNQZehgYGBgYLvOFoihG9zuM7zGDHxGNyAA97rEFHl4D8BmGnqAYKc3OgAEAcDyFP7wFB6YAAAAASUVORK5CYII=';
image['likes']     = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABH0lEQVR42mL8////fwYKAAsDAwPDrFWnGa7cfkWyZh1VMYgBV26/YmjKdWRgZmIiWvPff/8Y6ibvhxjAwMDA8O/ff4Z///5iKPTLWsIgLMDFML8tCKtBeK0s6tjGcGRZOl6X4DXgzqN3DAwMDAxvP3wj3YAV2y4zWBvJExcL2MCyLRdRnO+XtYSBgYGBwdJAjqEyzQ5hQFL1WoZb99/AFcAAsmZktk3UTFQX3Lr/hiHMU5eBgYGBYdX2ywQDDasXnr78RFlKJBU0TD2AmhJJNiDTkoGBgYGBjY0N0wBYIFkbyTP4O2syWBmiRqW8lACDkJAQwgtqiiIMR889hAtsmBrDwMDAwHDmylOGDXuuM5R170DRPLHaB8VARkqzM2AAVfFZlaoTn9QAAAAASUVORK5CYII=';
image['groups']    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAA7ElEQVR42mL8////fwYKAMuWZb0MD26dJ0uzgpohA8uDW+cZkqOdyDJg7tJ9DEwMFAIWBgYGBnZJPTK174MYgAw2r1rNcPrYcQZTK0sG37BQBgYGBoaLZ84yPLp3j0FOSYlB38QYRT2GF04fO45CMzAwMDy6dw+FxmsAqQDDAGlZWRSagYGBgV9QEIXGa0BIXAwKzcDAwGBsaYFCY8QCegAyMDAwTGxtZzC1smSQU1KC+33ftu0YAcmELQCR+egBh85HcUHThD7KA5HklCgho8bQVddIlmYVLVMGxs+fP///9esXWQawsbExAAYAS9RLk0BrJx8AAAAASUVORK5CYII=';
image['events']    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABEUlEQVR42mL89/f/fwYKAMu6AD+GO5s3k6xRxdeXIWjDJgaWO5s3M9g6O5NswGGopSwMDAwMv3/9It8LlBrAUBkX958cUBkX9//f3///mZANu3DuJENsmAdDbJgHw4olsyEWFKczVBank+6CmFB3rGx0F7CgGxgb5sHAxyfA4O0XTFQQMKELLF61g2HqnBUMWzetJc8AWFjwCwgyXLpwhmFibxMDH78AQ3piCMOlC2ewRyOyxt6OegZ+AUEGGzsnBj0DEwY9AxPC6QAGDIzMGRav2kFaQnr28CHD3g0bSE4/zx4+hBggICzM8PfPHwZhMTGiNb999YpBQFgYYoCknBzDnI4Okl1gbGvLwMDAwAAYAKNFvfW9NNRIAAAAAElFTkSuQmCC';
image['photo']    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFRQTFRFhlUY8/PztHIg46lhoGYdomcdkVwa6b2Fwnwj46pjp2oe2o0t2o4u46he1YcmlF4bvnkiqmwetnQh6r6Hk5OTflAXnazL7+/v68KP////fX19////U3yTvAAAABx0Uk5T////////////////////////////////////ABey4tcAAABuSURBVHjaVM5ZEoAgDANQFPd9q23h/ve01EEkn29IiblcyuW9Nw45Bp0C3zEcIWsFyFoKTER2ryYiTnAAmPNM0ILE/oAGgPV9gawwG9j0RvgzANUwKhSIjvulbORo2QnIuHyHQL5UQFpfikeAAQDfnBU4ilUuIAAAAABJRU5ErkJggg==';
image['link']    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADlQTFRFxM3g5eXlWXOo3drUXWqIaWZpQF2b8O/wh5m/7e3ttMDX2cOT1Lh2O1mY7OHJcF5Qj4Rv////////mSm1QAAAABN0Uk5T////////////////////////ALJ93AgAAABcSURBVHjadI9bDoAgDARbER9ApXL/wyqWjUTi/HWyabtUKvmFTBzAhDZShDgfNKYqSGQmE5aQEGSSLnGLZRPvv4n1f8dwpRNIOAh82man6ILPmXkvVq5jEJcAAwDJzQ7zfrx8lwAAAABJRU5ErkJggg==';
image['note']    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRQTFRF9a+SwsfQ6+70h4eHt7e34eHhpaWl/7eXaWlp2N/q////////MW+naAAAAAx0Uk5T//////////////8AEt/OzgAAADhJREFUeNpi4ObmZuFAAGYGoAAHEzsXFDBxgATYWOECXGABDi40ATZGBk4YGFwq0P2C4VsUABBgALWxCO+Nt4dEAAAAAElFTkSuQmCC';
image['application']    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAE5QTFRF4OTv+LE1enp6i1gAhYyctra2+b1TXlE8MDAwRkZGmJiYf39/rKyswoopAAAAkZGR9fX17+/v68KPODg41tbW3NzciYmJ////a2tr////FPwI9wAAABp0Uk5T/////////////////////////////////wAUIgDaAAAAh0lEQVR42mSO2w6DMAxDA5Rx3QZt0yT//6OLCxoS+KXqiWOHikLFzEp9SHcR2dWBbpsC9CGEXjFnds/f4XNm95BKjFEccNUFHisGD0IftXYTpXVZVktWnW+A7ErJ1KNeTecr3xMQ4e9gynkyOIamQ4vN4zijlD4D6dHSIh0ZcoC2knKe8xNgAEYsFLCnqRP9AAAAAElFTkSuQmCC';
image['relationship']    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJBQTFRFtDc39+3t2lxczlBQ266u8uHh4r+/qkBArjIyrTEx5MPDwkVFrjExtjk5wENDwHJy1VhY2Fpa2qysqCsr16Wlqzo6xkhI+vT0q0FB1VdX7dbWvGpqxn9/48HB2aurqjk58uLit15euFlZyIWF9uvrqjU1qjY2pzQ02aqq8uPjpzMzzE5Oqjo6yISE32Fh////t8FOXwAAADB0Uk5T//////////////////////////////////////////////////////////////8AYqXQeAAAAI5JREFUeNpkzccSgzAQA9C16b13COk91v//XcBhHDLRYXf0LiKg6q06MmBEtdVXIKDz4qZ8Hseyib1ugjYTU7S9Nr+sJegkpMhLOiEPxDdBTjDtFdgmgV246vzOppVDqCB8zbOsSJaeFGwGuM4CjgsJuH6WaYMFkPpccD+FAgynx3nACrDd3fADKn/wFmAAMxYlPW/wElwAAAAASUVORK5CYII=';
image['video']    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAMAAADarb8dAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9QTFRFvbOsinpyYlVOxLu2////JiVNewAAAAV0Uk5T/////wD7tg5TAAAAPElEQVR42qyNMQ4AIAwCAfn/mzVqO7Rxk6klFw6WNW7WaVjKgtqF2QicH0koUgnVDVbLm2gbIeEnyxRgAD+bAn96eqGtAAAAAElFTkSuQmCC';
image['activities']    = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAMAAAD+iNU2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRFrY1V1t3qu6J3xM3gwoUb0MKq5+DUXlE8ybeZ+9iarbrUiZzB+LE1i1gAAAAA////QVbWpgAAABB0Uk5T////////////////////AOAjXRkAAABXSURBVHjaVM5ZDsAgCARQqnZRRO5/2yoti5Pw8UIyAOyhORBYSzTV3ot7sROJm5F/K5v4UE4jZttmRPAqqZ2Gyyk+H+PyuFNSigfA9wTrPd7dgnHPK8AAMHgMHWvZOJwAAAAASUVORK5CYII=';

// default settings
var extras = new Array();
extras['friendships'] = {'hide':true, 'class':'sx_7265c3'};
extras['likes']     = {'hide':true, 'class':'sx_eff5a1'};
extras['groups']    = {'hide':true, 'class':'sx_cc2fb5'};
extras['events']    = {'hide':true, 'class':'sx_2fab9c'};
extras['photo']    = {'hide':true, 'class':'sx_823c2e'};
extras['link']    = {'hide':true, 'class':'sx_36ce04'};
extras['note']    = {'hide':true, 'class':'sx_aeb811'};
extras['application']    = {'hide':true, 'class':'sx_application'};
extras['relationship']    = {'hide':true, 'class':'sx_relationship'};
extras['video']    = {'hide':true, 'class':'sx_video'};
extras['activities']    = {'hide':true, 'class':'sx_activities'};

// whitelist
whitelist = new Array(
  46, 11 // statuses
);

var whitelist_regex = new RegExp(whitelist.join("|"));

var content; var stories;


  /**
   * Local storage/greasemonkey Functions
   */

storage = 'localstorage';

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

function edit_wall()
{

  for (i = 0; i <= stories.length-1; i++) {

    var story = stories.item(i);

    var story_data = story.getAttribute('data-ft'); if(!story_data) continue;
    var story_type = story_data.match(/\"sty\":(\d+)/)[1]; if(!story_type) continue;
    var story_type_app = story_data.match(/\"app_id\":(\d+),?/);

    var substories = story_data.match(/\"substories\":(\d+)/);

    if (
      story.getElementsByClassName('uiStreamMessage').length == 0
      //story.getElementsByClassName('uiStreamPassive').length == 0
      || whitelist_regex.test(story_type)
    ) {
      continue;
    }

    var story_class = story.className;

    var extra_type = sty[story_type];

    if (story_class.indexOf(gm_class) >= 0 || story_class.indexOf('uiSubStream') >= 0) {
    	continue;
    } else {
    	//story.className += gm_class;
    	story.className += extra_type ? ' sx_' + extra_type + gm_class : gm_class;
    }

    // count names in message
    var names_count = story.getElementsByClassName('passiveName').length;
    var names_count2 = story.getElementsByClassName('uiTooltip').length;
    var names_count3 = story.getElementsByTagName("a").length;

    if (
      names_count > 1
      || (names_count && names_count2) // ex ; X likes A and B others
      || (names_count && names_count3 >=2) // ex ; X likes A and B
      || substories != null
      || story_type == 60 // 60 = xy and x others changed their profile pictures
    ) {

      if (substories == null) {
        story.className += ' no-avatar simple';
      } else {
        story.className += ' substories';
      }

      //var ico = document.createElement('i'); ico.className="img spritemap_cgl95w sx_5c9337";
      var ico = document.createElement('img'); ico.src = image_simplified;
      var h6 = story.getElementsByClassName('uiStreamMessage').item(0);
      h6.className += ' stripped';
      h6.parentNode.insertBefore(ico, h6);

      // remove avatar
      var pic = story.getElementsByClassName('UIImageBlock_Image').item(0);
      if (pic) pic.parentNode.removeChild(pic);

    }

    var story_content = story.getElementsByClassName('UIImageBlock_Content').item(0);


    // get icon
    if (story_content) {
      var icon_wrapper = story_content.getElementsByClassName('uiStreamSource').item(0);
      var icon = icon_wrapper.getElementsByClassName('img').item(0);
    }

    //if (icon != null && !substories) {
    if (!substories) {
      if (icon != null) {
        var icon_class = icon.getAttribute('class').match(/sx_[^ ]+/);

        if (icon_class != null)
          icon_class = icon_class[0].toString();
      }
      var attach = story.getElementsByClassName('uiStreamAttachments').item(0);

      if (extra_type != null) {
        if (icon_class != null) extras[extra_type]['class'] = icon_class;

        if (extras[extra_type]['hide'] == true) {
          story.style.display = 'none';
        }
      }

      if (attach) {
        if (extra_type == 'friendships' || extra_type == 'events') {
          if (story_content) story_content.removeChild(attach);
        } else if (names_count <= 1) {
          continue;
        }

      }

      if(whitelist_regex.test(story_type)){
        story.className += ' simplified';
        // remove avatar
        var pic = story.getElementsByClassName('UIImageBlock_Image').item(0);
        pic.parentNode.removeChild(pic);

        // message
        var header = story_content.getElementsByClassName('uiStreamMessage').item(0);

        //header.innerHTML = '<i class="' + icon.getAttribute('class') + '"></i>' + header.innerHTML;
        header.innerHTML = '<span class="icon"></span>' + header.innerHTML;
        header.firstChild.appendChild(icon);

        // remove original icon or time
        if (story_content && icon_wrapper && icon_wrapper.lastChild.className == 'timestamp') {
          story_content.removeChild(icon_wrapper.parentNode);
        }
      }

      //continue;
    }


  }

  delete story; delete story_content; delete icon_wrapper; delete icon; delete icon_class; delete attach;
  delete pic; delete header;

  // update counter
  for (extra_type in extras) {
    updateCounter(extra_type);
  }

  saveSettings();

  return false;
}


function check_wall()
{

  isBox = createBox();

	stories = document.getElementsByClassName("uiListLight");
  gm_class_length = document.getElementsByClassName(gm_class).length;

  if (stories.length != 0 && stories.length != gm_class_length) {

    if (content = document.getElementById("home_stream")) {
      edit_wall();
    }
  }

  delete stories;
  delete content;

  return false;
}


function updateCounter(extra_type)
{

  //extra_class = extras[extra_type]['class'];
  extra_class = 'sx_' + extra_type;

  count = content.getElementsByClassName(extra_class).length;

  if (count_el = document.getElementById('sx_' + extra_type +'_count')) {
    count_el.innerHTML = count;

    if (count > 0) {
      count_el.parentNode.style.display = 'inline';
    } else {
      count_el.parentNode.style.display = 'none';
    }
  }
  return false;
}


function toggleExtras(extra_type)
{

  //extra_class = extras[extra_type]['class'];
  extra_class = 'sx_' + extra_type;

  els = content.getElementsByClassName(extra_class);

  length = els.length - 1;

  if (length >= 0) {

    if (extras[extra_type]['hide'] == true) {
      display = 'none';
    } else {
      display = '';
    }


	  for (i = 0; i <= length; i++) {
      //parent = els.item(i).parentNode.parentNode.parentNode.parentNode.parentNode;
      parent = els.item(i);
      if (parent.className.indexOf('simplified') >= 0) {
        parent.style.display = display;
      }
    }

  }

  delete display;
  delete parent;
  delete els;

  saveSettings();

  return false;
}



function addEvents()
{

  for (extra_type in extras) {
    extra_class = 'sx_' + extra_type;
    document.getElementById(extra_class).addEventListener("change", function () { changeSettings(this.getAttribute('gm_type'), this); }, false);
  }

  return false;
}

function createBox()
{

  if (!document.getElementById('home_stream')) return false;

  if (document.getElementById('pagelet_simplifiedwallbox_fix')) return true;

  //col = document.getElementById('rightCol');
  col = document.getElementById('leftCol');

  box = document.createElement('div');

  box.setAttribute('id', 'pagelet_simplifiedwallbox_fix');
  box.setAttribute('style', 'padding:10px;');

  boxTitle = document.createElement('div');
  boxTitle.setAttribute('class', 'uiHeader uiHeaderBottomBorder pbs');
  boxTitle.innerHTML = '<div class="clearfix uiHeaderTop">';
  boxTitle.innerHTML += '<div class="uiTextSubtitle uiHeaderActions rfloat"><a href="http://userscripts.org/scripts/show/'+script_id+'" target="_blank">&rarr;</a></div>';
  boxTitle.innerHTML += '<div><h4 class="uiHeaderTitle">Özellestirici <small>v'+script_version+'<small></h4></div>';

  boxTitle.innerHTML += '</div>';

  box.appendChild(boxTitle);

  boxContent = document.createElement('div');
  boxContent.setAttribute('class', 'UITitledBox_Content mbm');

  box.appendChild(boxContent);
  col.appendChild(box);

  extras.sort();

  for (extra_type in extras) {

    extra_class = 'sx_' + extra_type;

    var section = document.createElement('span');

    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', extra_class);
    input.setAttribute('gm_type', extra_type);

    if (extras[extra_type]['hide'] == true) {
      input.setAttribute('checked', 'true');
    }

    section.innerHTML = '<img class="img" src="'+ image[extra_type] +'">';

    section.appendChild(input);

    section.innerHTML += '<label for="'+ extra_class +'">Hide '+ extra_type +'</label>';
    section.innerHTML += ' <small style="display: none;">(<span id="'+ extra_class +'_count">0</span>&times;)</small>';
    section.innerHTML += '<br>';

    boxContent.appendChild(section);

  }

  // set events for checkboxes
  addEvents();

  delete col, delete box; delete boxTitle; delete boxContent; delete span, delete input;

  return true;
}


  /**
   *  Settings functions
   */

function saveSettings()
{

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

    //if (source.length <= 5) continue;
    if (source.length <= extras.length) continue;

    setValue(extra_type, source);

    delete source;

  }

  return false;
}

function loadSettings()
{

  for (extra_type in extras) {

    value = getValue(extra_type);

    if (value) {
      extras[extra_type] = eval(value);


      if (extras[extra_type]['hide'] == 'true') {
        extras[extra_type]['hide'] = true;
      }

    }

  }

  return false;
}

function changeSettings(extra_type, el)
{

  extra_class = extras[extra_type]['class'];

  ch = el.checked;

  extras[extra_type]['hide']= ch;

  toggleExtras(extra_type);

  saveSettings();

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

  delete head; delete style; delete css;

  return false;
}

function cssStyles()
{
  // box
  addStyle(
   ' #pagelet_simplifiedwallbox_fix span { line-height: 20px; }'
  +' #pagelet_simplifiedwallbox_fix span input { cursor: pointer; margin: 0px 4px; padding: 0px; position: relative; top: 3px; }'
  +' #pagelet_simplifiedwallbox_fix .img { display: inline-block; margin-top: 0px; vertical-align: text-top; }'
  +' #pagelet_simplifiedwallbox_fix .uiHeaderTitle small { font-size: smaller; font-weight: normal; }'
  );

  // simplified messages
  addStyle(
   ' .gm_simplified_wall_fix.simplified { min-height: 18px; padding: 0px; }'
  +' .gm_simplified_wall_fix.simplified.uiListLight {  font-size: 10px;padding: 5px 2px; }'
  //+' .gm_simplified_wall_fix.simplified .uiStreamMessage { font-size: 11px !important; margin: 0px; padding-left: 20px; margin-left: -20px; }'
  +' .gm_simplified_wall_fix.simplified .uiStreamMessage { font-size: 11px !important; margin: 0px; }'
  +' .gm_simplified_wall_fix.simplified .uiStreamMessage i.img { margin: 0 4px 0 0; vertical-align: text-top; }'
  +' .gm_simplified_wall_fix.simplified .uiStreamMessage span.icon .img { margin: 0 4px 0 0; vertical-align: text-top; }'
  +' .gm_simplified_wall_fix.simplified .uiStreamMessage span.text_exposed_link { margin: 5px 0; padding-left: 20px;}'
  +' .gm_simplified_wall_fix.simplified form.commentable_item, .gm_simplified_wall_fix.simplified .uiStreamSubstories { font-size: 11px !important; margin-left: 20px; padding: 2px 0 0px; }'
  +' .gm_simplified_wall_fix.simplified div.mvm { margin: 3px 0 3px 20px; }'
  +' .gm_simplified_wall_fix.simplified.normal-font div.mvm { margin: 10px 0 10px 20px; }'
  +' .gm_simplified_wall_fix.simplified div.uiStreamAttachments img.img { max-height: 80px; }'
  );

  // messages without avatar

  addStyle(
   ' .gm_simplified_wall_fix.no-avatar h6.stripped{ margin-top: -16px; margin-left: 25px; width: 90%; }'
  //+ ' .gm_simplified_wall_fix.no-avatar { height: 18px; min-height: 18px; padding: 0px; }'
  + ' .gm_simplified_wall_fix.no-avatar { min-height: 18px; padding: 0px; }'
  +' .gm_simplified_wall_fix.no-avatar.uiListLight { font-size: 10px; padding: 5px 2px; }'
  +' .gm_simplified_wall_fix.no-avatar a.UIImageBlock_MED_Image { display: none; }'
  +' .gm_simplified_wall_fix.no-avatar .uiStreamMessage { font-size: 11px !important; }'
  +' .gm_simplified_wall_fix.no-avatar .uiListHorizontal { display: none; }'
  +' .gm_simplified_wall_fix.no-avatar .uiStreamSource { display: none; }'
  +' .gm_simplified_wall_fix.no-avatar .mvm { display: none; }'
  //+' .gm_simplified_wall_fix.no-avatar .commentable_item { width: 100px; }'
  +' .gm_simplified_wall_fix.no-avatar .commentable_item { margin-left: 25px; }'
  );

  // substories
  addStyle(
  // ' .gm_simplified_wall_fix.substories { padding-left: 20px; }'
   ' .gm_simplified_wall_fix.substories h6.stripped{ margin-top: -16px; margin-left: 25px; }'
  //+' .gm_simplified_wall_fix.substories .uiStreamMessage.uiStreamPassive { margin-left: -20px; }'
  );

  return false;
}

function starter()
{

  cssStyles();
  loadSettings();
  check_wall();

  var home_stream;

  if (home_stream = document.getElementById('content')) {
    setTimeout ( function () {
      var t; // timeout
      home_stream.addEventListener("DOMNodeInserted", function () { clearTimeout(t); t = setTimeout( check_wall, 50 ); }, false);
    }, 500);
  }

  delete home_stream;

  //if (typeof autoUpdate == 'function') {
  //  autoUpdate (script_id, script_version);
  //}

  return false;

}

starter();