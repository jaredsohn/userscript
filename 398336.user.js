// ==UserScript==
// @name           flickrAwardCounter
// @namespace www.phazeshift.co.uk/download/
// @description Greasemonkey script to count flickr award images

// @include *://flickr.com/*photos/*/*
// @include *://flickr.com/groups/*/discuss/*
// @include *://flickr.com/groups/*/pool/*
// @include *://flickr.com/groups/*
// @include *://www.flickr.com/*photos/*/*
// @include *://www.flickr.com/groups/*/discuss/*
// @include *://www.flickr.com/groups/*/pool/*
// ==/UserScript==

/*

 About
 =====
 This is a GreaseMonkey script for Flickr.com More information about GreaseMonkey can be found here: http://diveintogreasemonkey.org/install/what-is-greasemonkey.html

 Installation
 ============
 First you need firefox http://mozilla.org/firefox then you need to install GreaseMonkey http://greasemonkey.mozdev.org
 Restart your browser then revisit this script. You should now see a button in the top right hand corner, click it to install.

 Release Notes
 ============
 v1.0  ????        Counts the comments on the current photo page using javascript
 v2.0  ????        Counts the comments for a photo using the flickr API on Group, Pool and Photo pages
 v2.1  ????        Updated to be more compatible with other scripts; no longer removes PoolList class from pool page. Fixed reloading of comments when clicking Show all.
 v2.2  ????        Allows multiple images to be specified per award, (separated with ';') and allows dupes for certain people to be ignored (separated with ';')
 v2.3  ????	   Config dialog allows more awards to be added instead of being off the page.
 v2.4  ????        Added Sort & Edit options to config. Added Auto update function.
 v2.5  ????        Added option to display number favourites.
 v2.6  ????        Fixed clear config option
 v2.7  ????        Changed search code to find text that isn't in image tags
 v2.8  ????        Added option to hide awards with count = 0
 v2.9  ????        Fixed multiple URL config option & counting multiple awards in single comment
                   Added option to save settings online and tidied config page
                   Fixed version check code
 v2.10 ????	   Applied Alesas patch to work with the new flickr layout. Thanks to Alesa for the patch and Tambako for letting me know about the new layout.
		   Added option to display number of galleries.
 v2.11 ????	   Fixed an issue that caused script version to be checked on every page load when running under some Greasemonkey emulators that don't support storing settings.
                   Changed SaveCloudSettings to use a post request to prevent errors with long URLs
                   Added option to export counter settings to a string
		   Fixed compatibility issue with 'Flickr Group Pool Admin - Warn + Delete' script
		   Updated Pool display technique to interfere less with other scripts
 v2.12 ????	   Added Aleas patch for update check exception handler
                   Reverted change to pool handling as award counts were unreadable
                   Fixed detection of image url for pool photos after recent flickr change
 v2.13 ????	   Fixed detection of image id for individual photos after recent flickr change
 v2.14 ????	   Fixed count display spacing on comment threads
                   Fixed counter to work with new pool layout
 v2.15 ????	   Fixed show all on group disussion page


 Known Issues
 ============
 There may be some incompatibilities with other flickr scripts. Please report them if you find them
 I'm using an onClick listener for all interactions with the user page - this means I don't have to register a bunch of functions on unsafeWindow but it will probably be a bit slower.
 It also makes parameters a bit more tricky to pass but should cause less interferance with other scripts and causes less problems with the scope of GM functions.

 Credits
 =======
 http://diveintogreasemonkey.org/ for a useful reference to greasemonkey

*/

// ===================================================================
// Config Stuff

var glblConfigAwards = undefined;
var glblAllPhotos = undefined;
var glblCommentsText = undefined;
var glblLastPhotoId = undefined;
var glblPhotoId = undefined;
var glblMode = undefined;
var glblAllowDupesFrom = undefined;
var glblVersion = '2.15';
var glblServerVersion = glblVersion;
var glblLastCheckedVersion = undefined;
var glblScriptUrl = 'http://www.phazeshift.co.uk/files/flickrawardcounter.user.js';
var glblScriptVersionUrl = 'http://www.phazeshift.co.uk/flickrawardcounterversion.php';
var glblCloudSettingsUrl = 'http://www.phazeshift.co.uk/flickrawardcountersettings.php?';
var glblCloudSettingsId = "";
var glblUpdateCheck = true;
var glblFavourites = false;
var glblGalleries = false;
var glblHideZeroCount = false;
var glblApiKey = 'cf7bfd7c92fcbea46bb7bce79b81ead7';
const SinglePhotoMode = 'Single';
const GroupMode = 'Group';
const PoolMode = 'Pool';
const ConfigureLink = '<small>( <a href="#flickrawardconfig-configure" class="Plain">configure</a> )</small>';
const AwardCounter = '<small>flickr Award Counter</small> ';
const PoolAwardXPath = "//div[@class='flickraward']";
const AwardInnerXPath = ".//span[@id='flickraward-awardcount-inner']";
const AwardFooterXPath = ".//span[@id='awardcount-awardfooter']";
const AwardToHideXPath = ".//span[@id='flickraward-awardcount-tohide']";

function Save()
{
GM_setValue('awards', CreateSaveAwardStr());
if (glblAllowDupesFrom) {
  GM_setValue('awards-allow-dupes-from', glblAllowDupesFrom.join(';').toLowerCase());
  }
GM_setValue('favourites',glblFavourites);
GM_setValue('galleries',glblGalleries);
GM_setValue('hidezerocount',glblHideZeroCount);
GM_setValue('updatecheck',glblUpdateCheck);
SaveCloudSettingsId();
}

function SaveCloudSettingsId() {
  GM_setValue('cloudsettingsid',glblCloudSettingsId);
}

function SaveUpdateInfo()
{
GM_setValue('serverversion',glblServerVersion);
if (glblLastCheckedVersion) { GM_setValue('lastcheckedversion',glblLastCheckedVersion.getTime().toString()); }
}

function GmSettingsWorking()
{
GM_setValue('gmsettingstest',glblVersion);
return (glblVersion == GM_getValue('gmsettingstest',''));
}

function Load()
{
ParseSaveAwardStr(GM_getValue('awards', ''));
buf = GM_getValue('awards-allow-dupes-from', '');
if (buf.length > 0){
  glblAllowDupesFrom = buf.toLowerCase().split(';');
  }
glblServerVersion = GM_getValue('serverversion',glblServerVersion);
buf = GM_getValue('lastcheckedversion');
if (buf && buf != ''){
   glblLastCheckedVersion = new Date();
   glblLastCheckedVersion.setTime(buf);
   }
glblUpdateCheck = GM_getValue('updatecheck',glblUpdateCheck);
if (!GmSettingsWorking())
  glblUpdateCheck = false;  
glblFavourites = GM_getValue('favourites',glblFavourites);
glblGalleries = GM_getValue('galleries',glblGalleries);
glblHideZeroCount = GM_getValue('hidezerocount',glblHideZeroCount);
glblCloudSettingsId = GM_getValue('cloudsettingsid',glblCloudSettingsId);
}

function CreateSaveAwardStr()
{
var buf = "";
for (var i = 0; i < glblConfigAwards.length; i++) {
  if (glblConfigAwards[i] != undefined)
    {
    buf = buf + escape(glblConfigAwards[i]["Name"]) + ',' + escape(glblConfigAwards[i]["Url"].join(';')) + "|";
    }
  }
buf = buf.substring(0,buf.length-1);
return buf;
}

function ParseSaveAwardStr(buf)
{
glblConfigAwards = new Array();
if (buf == undefined) { return; }
Items = buf.split('|');
for (var i = 0; i < Items.length; i++) {
  if (Items[i] != '')
    {
    Items2 = Items[i].split(',');
    try {
      AddAward(unescape(Items2[0]),unescape(Items2[1]));
    } catch (ex) {
      alert(ex)
      }
    }
  }
}

function CmpConfigAwards(a,b)
{
  var x = a["Name"].toLowerCase();
  var y = b["Name"].toLowerCase();
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function Sort()
{
glblConfigAwards.sort(CmpConfigAwards);
ConfigDisplayAwards();
}

function SortOne(awardId,up)
{
  var i = FindAwardPosByName(awardId);
  if (i == -1) {return; }
  var tmpAward = glblConfigAwards[i];
  if (up) { newPos = i - 1; }
   else { newPos = i + 1; }
  if ((newPos < 0) || newPos > glblConfigAwards.length - 1) { return; }
  glblConfigAwards[i] = glblConfigAwards[newPos];
  glblConfigAwards[newPos] = tmpAward;
  ConfigDisplayAwards();
}

function FindAwardByName(awardid) {
  var i = FindAwardPosByName(awardid);
  if (i == -1) return undefined;
  return glblConfigAwards[i];
}

function FindAwardPosByName(awardid){
  for (i=0; i < glblConfigAwards.length; i++) {
    if (glblConfigAwards[i] != undefined)
    {
    Award = glblConfigAwards[i];
    if (Award["Name"] == awardid)
      {
        return i;
      }
      }
    }
    return -1;
}

function ConfigDisplayAwardRow(buf,Award,pos,total)
{
  var buf = '<div STYLE="border:thin solid;border-color:#999999;padding:5px;margin:5px;"><table><tr><td width="150">' + ConvertTags(Award["Name"]) + '</td><td width="480">' + ConvertTags(Award["Url"].join(';')) + '</td>';
  buf += '<td width="30"><a href="#flickrawardconfig-edit-'+escape(Award["Name"])+'" class="AwardCounterButton">Edit</a></td>';
  buf += '<td width="30"><a href="#flickrawardconfig-remove-'+escape(Award["Name"])+'" class="AwardCounterButton">Remove</a></td>';
  buf += '<td width="15">';
  if (pos != 0) buf += '<a href="#flickrawardconfig-sortup-'+escape(Award["Name"])+'" class="AwardCounterButtonSmall">/\\</a>';
  buf += '</td><td width="15">';
  if (pos != total) buf += '<a href="#flickrawardconfig-sortdown-'+escape(Award["Name"])+'" class="AwardCounterButtonSmall">\\/</a>';
  buf += '</td></tr></table></div>';
  return buf;
}

function ConfigDisplayAwards()
{
var varElement = document.getElementById("AwardCounterVarList");
buf = '';
var i;
var awardAdded = false;
for (i=0; i < glblConfigAwards.length; i++) {
    if (glblConfigAwards[i]) {
      Award = glblConfigAwards[i];
      buf += ConfigDisplayAwardRow(buf,Award,i,glblConfigAwards.length-1);
      awardAdded = true;
      }
    }
buf += '';
if (!awardAdded)
  {
  buf = 'None defined';
  }
// Replace html with new stuff
varElement.innerHTML = buf;
}

function DeleteElement(elementname)
{
  var varElement = document.getElementById(elementname);
  if (varElement) {
    varElement.parentNode.removeChild(varElement);
    }
}

function SafeSetElementValue(elename, elevalue){
  var varElement = document.getElementById(elename);
  if (varElement) {
    varElement.value = elevalue;
    }                          
}


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function TrimArray(arr){
for (i = 0; i<arr.length; i++) {
  arr[i] = trim(arr[i]);
  }
  return arr;
}

function CheckString(Value){
if (Value.indexOf('|') > -1) return false;
if (Value.indexOf(',') > -1) return false;
return true;
}

function AddAward(Name, Url)
{
var newAward = true;
if (!Name) {return};
if (!Url) {return};
Name = RemoveTags(Name);
var Award = FindAwardByName(Name);
if (!CheckString(Name)) {
  throw('Name contains a \'|\' or a \',\' which isn\'t valid');
}
if (!CheckString(Url)) {
  throw('Url contains a \'|\' or a \',\' which isn\'t valid');
}
if (Award != undefined) {
    newAward = false;
    }
if (newAward)
  {
  Award = {"Name" : "", "Url" : ""};
  }
Award["Name"] = Name;
Award["Url"] = TrimArray(Url.split(';'));
if (newAward)
  {
  glblConfigAwards[glblConfigAwards.length] = Award;
  }
}

function EditAward(Name) {
  var Award = FindAwardByName(Name);
  if (Award == undefined) return;
  document.getElementById("AwardName").value = Award["Name"];
  document.getElementById("AwardUrl").value = Award["Url"].join(';');
}

function RemoveAward(Name)
{
var i = FindAwardPosByName(Name);
if (i != -1) {
  glblConfigAwards[i] = undefined;
  }
ConfigDisplayAwards();
}

function NewerVersion(serverVersion, currentVersion){
  serverVersion = serverVersion.split(".");
  currentVersion = currentVersion.split(".");
  var i;
  for (i=0;i<serverVersion.length;i++) {
    if (parseInt(serverVersion[i]) > parseInt(currentVersion[i])) return true;
    }
  return false;
}

function UpdateHTML()
{
if (glblUpdateCheck) {
  var buf = '<small> Update status: ';
  if (NewerVersion(glblServerVersion,glblVersion)) {
    buf += ' <a href="' + glblScriptUrl + '">New version '+ glblServerVersion +'</a> ';
    } else buf += 'None available ';
  if (glblLastCheckedVersion) buf += ' (Checked: '+ glblLastCheckedVersion.toLocaleDateString() + ' ' + glblLastCheckedVersion.toLocaleTimeString() +')';
  buf += '</small>';
  return buf;
  }
return '';
}

function CreateConfigPage()
{
var buf = "";
buf += '<div STYLE="position:absolute;z-index:10000; font-family: Arial; top: ';
buf += document.body.scrollTop + 50;
buf += 'px; font-size: 12px; left: ';
buf +=  document.body.scrollLeft + 40;
buf += 'px; text-align: left; width: 800px; background-color:#EEEEEE; color:black; border:thin solid; padding: 20px;" id="flickrawardconfig-main">';
buf += '<span><p><h3>flickr Award Counter</h3></p><span>';
buf += '<p><small>(v'+ glblVersion +')</small> <small>Copyright 2007 <a href="http://www.phazeshift.co.uk/" class="Plain">Phazeshift</a>. All rights reserved. </small><br/>';
buf += UpdateHTML();
buf += '</p>';
buf += '<p>This is a small GreaseMonkey script to count the number of awards given to photos in groups on flickr. It will count any number of different awards given by users. ';
buf += 'It will ignore duplicate awards of the same type from a user. To start, just add a name for the award below and paste the location of the image file for the award, click Add, then click Save.</p>';
buf += '<div STYLE="border:thin solid;border-color:#999999;padding:5px;margin:5px;"><b>Existing Items</b><br/>';
buf += '<div style="width: 780px; padding: 5px;" id="AwardCounterVarList"></div>';
buf += '<div style="width: 750px; height: 20px; padding: 5px;"><div style="float: right; right: 20px;">';
buf += '<a href="#flickrawardconfig-sort" class="AwardCounterButton">Sort</a> ';
buf += '<a href="#flickrawardconfig-clear" class="AwardCounterButton">Remove All</a></div></div>';
buf += '<div style="width: 750px; padding: 5px;"><table><tr><td><b>Award Name</b></td><td><b>Award Image Url</b></td><td></td></tr>';
buf += '<tr><td><input type="text" size="30" id="AwardName" name="AwardName"/></td>';
buf += '<td><input type="text" size="80" id="AwardUrl" name="AwardUrl"/></td>';
buf += '<td><a href="#flickrawardconfig-add" class="AwardCounterButton">Add</a></td></tr>';
buf += '<tr><td colspan="2">';
buf += "<small>You can enter multiple images per award, Separate each item with ';'. Don't include spaces before or after items.</small></td></tr></table></div></div>";
buf += '<div STYLE="border:thin solid;border-color:#999999;padding:5px;margin:5px;"><table><tr><td><b>Allow Duplicates From </b>';
buf += '<input type="text" size="80" id="AwardAllowDupesFrom"/></td></tr>';
buf += '<tr><td><small>You can specify a list of users to allow duplicate awards on the same photo for. ';
buf += "Separate each item with ';'. Don't include spaces before or after items.</small></td></tr></table></div>";
buf += '<div STYLE="border:thin solid;border-color:#999999;padding:5px;margin:5px;"><table><tr><td><b>Update Check</b> <input type="checkbox" ';
if (glblUpdateCheck) buf += ' checked="checked" ';
buf += 'id="AwardUpdatesEnabled"/></td></tr>';
buf += '<tr><td><small>This option will notify you if a new version of flickr Award Counter is released. ';
buf += ' It will check with phazeshift.co.uk once a week for a new version. The current status is displayed at the top of this window when it is enabled.</small></td></tr></table></div>';
buf += '<div STYLE="border:thin solid;border-color:#999999;padding:5px;margin:5px;"><table><tr><td><b>Favourites</b> <input type="checkbox" ';
if (glblFavourites) buf += ' checked="checked" ';
buf += 'id="AwardFavouritesEnabled"/></td></tr>';
buf += '<tr><td><small>This option will show the number of users that have added a picture as a favourite. This option is a little slower, as it requires a second call to flickr.</small></td></tr></table></div> ';
buf += '<div STYLE="border:thin solid;border-color:#999999;padding:5px;margin:5px;"><table><tr><td><b>Galleries</b> <input type="checkbox" ';
if (glblGalleries) buf += ' checked="checked" ';
buf += 'id="AwardGalleriesEnabled"/></td></tr>';
buf += '<tr><td><small>This option will show the number of galleries a picture has been added to. This option is a little slower, as it requires a second call to flickr.</small></td></tr></table></div> ';
buf += '<div STYLE="border:thin solid;border-color:#999999;padding:5px;margin:5px;"><table><tr><td><b>Hide zero count</b> <input type="checkbox" ';
if (glblHideZeroCount) buf += ' checked="checked" ';
buf += 'id="AwardHideZeroCountEnabled"/></td><td><small>This option will hide awards with a count of zero.</small></td></tr></table></div> ';

buf += '<div STYLE="border:thin solid;border-color:#999999;padding:5px;margin:5px;"><table><tr><td><b>Cloud settings</b>';
buf += ' Id: <input type="text" size="30" id="AwardCloudSettingsId" name="AwardCloudSettingsId" value="' + glblCloudSettingsId + '"/>';
buf += '<a href="#flickrawardconfig-loadcloudsettings" class="AwardCounterButton">Load</a> ';
buf += '<a href="#flickrawardconfig-savecloudsettings" class="AwardCounterButton">Save</a></td></tr>';
buf += '<tr><td><small>This option will allow you to save and restore your awards from the web. To save your settings, leave the id box blank and click save. ';
buf += 'Make a note of your settings ID when the save is completed. To load your settings, enter your settings ID and click load. these settings are ';
buf += 'not private or encrypted and can be accessed from any machine with your ID.</small></td></tr><tr><td><b>Export settings</b>';
buf += ' Settings: <input type="text" size="30" id="ExportSettings" name="ExportSettings" value=""/>';
buf += '<a href="#flickrawardconfig-exportsettings" class="AwardCounterButton">Export</a> ';
buf += '<a href="#flickrawardconfig-importsettings" class="AwardCounterButton">Import</a></td></tr>';
buf += '<tr><td><small>This option will allow you to save and restore your awards as a string that can be copied to a text file.'
buf += '</small></td></tr></table></div>';

buf += '<div style="width: 750px; height: 20px; padding: 5px;"><div style="float: right; right: 20px;">';
buf += '<a href="#flickrawardconfig-save" class="AwardCounterButton">Save</a> ';
buf += '<a href="#flickrawardconfig-cancel" class="AwardCounterButton">Cancel</a>';
buf += '</div></div>';
buf += '</div>';
var newDiv = document.createElement('div');
newDiv.setAttribute('id','flickrawardconfig-container');
newDiv.innerHTML = buf;
document.body.insertBefore(newDiv, document.body.firstChild);
}

// ===================================================================
// Handle Events

function EventAdd()
{
try {
  var AwardName = document.getElementById("AwardName").value;
  var AwardUrl = document.getElementById("AwardUrl").value;
  AddAward(AwardName,AwardUrl);
  document.getElementById("AwardName").value = '';
  document.getElementById("AwardUrl").value = '';
  ConfigDisplayAwards();
  } catch (ex) {
    alert(ex);
  }
}

function EventCancel()
{
  Load();
  DeleteElement("flickrawardconfig-container");
}

function EventExportSettings()
{
  document.getElementById("ExportSettings").value = CreateSaveAwardStr();
}

function EventImportSettings()
{
  ParseSaveAwardStr(document.getElementById("ExportSettings").value);
  ConfigDisplayAwards();
}

function EventSaveCloudSettings()
{
  glblCloudSettingsId = document.getElementById("AwardCloudSettingsId").value;
  SaveCloudSettingsId();
  Save();
  SaveCloudSettings();
}

function EventLoadCloudSettings()
{
  glblCloudSettingsId = document.getElementById("AwardCloudSettingsId").value;
  SaveCloudSettingsId();
  LoadCloudSettings();
}

function EventSave()
{
  var buf = document.getElementById("AwardAllowDupesFrom").value;
  if (buf.length > 0) {
    glblAllowDupesFrom = TrimArray(buf.toLowerCase().split(';'));
  }
  glblUpdateCheck = document.getElementById("AwardUpdatesEnabled").checked;
  glblFavourites = document.getElementById("AwardFavouritesEnabled").checked;
  glblGalleries = document.getElementById("AwardGalleriesEnabled").checked;
  glblHideZeroCount = document.getElementById("AwardHideZeroCountEnabled").checked;
  glblCloudSettingsId = document.getElementById("AwardCloudSettingsId").value;
  Save();
  EventCancel();
  GetAwardCounts();
}

function EventSortAll()
{
  Sort();
}

function GetIdFromClicked(clickedOn,eventType){
   var idstart = clickedOn.indexOf(eventType) + eventType.length + 1;
   var awardid = clickedOn.substring(idstart,255);
   return unescape(awardid);
}

function EventRemove(clickedOn)
{
   var awardid = GetIdFromClicked(clickedOn,'remove');
   RemoveAward(awardid);
}

function EventEdit(clickedOn)
{
   var awardid = GetIdFromClicked(clickedOn,'edit');
   EditAward(awardid);
}

function EventSortOne(clickedOn,up)
{
   var awardid;
   if (up) {
     awardid = GetIdFromClicked(clickedOn,'-sortup');
   } else {
     awardid = GetIdFromClicked(clickedOn,'-sortdown');
   }
   SortOne(awardid,up);
}

function EventCountShow(clickedOn)
{
   var photoid = GetIdFromClicked(clickedOn,'countshow');
   var theElement = GetDisplayElement(photoid);
   var theElement = FindFirstElement(theElement,AwardInnerXPath);
   theElement.innerHTML = 'Retrieving comments, please wait...';
   GetCommentsForPhotoId(photoid);
}

function EventCountAllShow()
{
   glblAllPhotos = new Array();
   var PhotoDetails = undefined;
   var theElement = undefined;
   var allPhotoElements = document.evaluate(
    PoolAwardXPath,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
   for (var i = 0; i < allPhotoElements.snapshotLength; i++) {
     theElement = allPhotoElements.snapshotItem(i);
     PhotoId = theElement.id.substring(theElement.id.lastIndexOf('-')+1,255);
     PhotoDetails = new Array();
     PhotoDetails['PhotoId'] = PhotoId;
     PhotoDetails['Done'] = false;
     glblAllPhotos[i] = PhotoDetails;
   }
   theElement = document.getElementById('flickraward-awardcountall');
   if (theElement)
   {
   theElement.innerHTML = '<small>Retrieving comments, please wait...</small>';
   }
   DisplayNextPhotoDetails();
}

function EventCountHideAll()
{
ToggleAll(false)
}

function ToggleAll(Visible)
{
var theElement = undefined;
   var allPhotoElements = document.evaluate(
    PoolAwardXPath,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
   for (var i = 0; i < allPhotoElements.snapshotLength; i++) {
     theElement = allPhotoElements.snapshotItem(i);
     PhotoId = theElement.id.substring(theElement.id.lastIndexOf('-')+1,255);
     ToggleDisplayAwards(PhotoId,Visible);
   }
ToggleShowHideAll(Visible);
}

function EventCountReshowAll()
{
ToggleAll(true);
}

function EventClear()
{
var Ok = confirm("Do you really want to delete the awards you have set up??");
if (!Ok) { return; }
GM_setValue('awards', '');
GM_setValue('awards-allow-dupes-from', '');
GM_setValue('lastcheckedversion', '');
Load();
ConfigDisplayAwards();
}

function EventCountHide(clickedOn)
{
   clickedOn = unescape(clickedOn);
   var idstart = clickedOn.indexOf('counthide') + 10;
   var PhotoId = clickedOn.substring(idstart,255);
   ToggleDisplayAwards(PhotoId, false);
}

function EventCountReshow(clickedOn)
{
   clickedOn = unescape(clickedOn);
   var idstart = clickedOn.indexOf('countreshow') + 12;
   var PhotoId = clickedOn.substring(idstart,255);
   ToggleDisplayAwards(PhotoId,true);
}


function EventConfigPage()
{
// Do our config page stuff
CreateConfigPage();
if (glblConfigAwards == undefined) {
  Load();
  }
ConfigDisplayAwards();
if (glblAllowDupesFrom) {
  var varElement = document.getElementById("AwardAllowDupesFrom");
  varElement.value = glblAllowDupesFrom.join(';');
  }
}

// ===================================================================
// Configure Event Handler

function EndsWith(str, substr){
return (str.lastIndexOf(substr) == str.length - substr.length);
}

function ConfigureEvents()
{
document.addEventListener('click', function(event) {
    // event.target is the element that was clicked
    var clickedOn = event.target.toString();
    if (clickedOn.indexOf('#flickrawardconfig-') > -1)
    {
    if (EndsWith(clickedOn,'save'))
      {
        EventSave();
      }
    if (EndsWith(clickedOn,'sort'))
      {
        EventSortAll();
      }
    if (EndsWith(clickedOn,'cancel'))
      {
        EventCancel();
      }
    if (EndsWith(clickedOn,'add'))
      {
        EventAdd();
      }
    if (EndsWith(clickedOn,'exportsettings'))
      {
        EventExportSettings();
      }
    if (EndsWith(clickedOn,'importsettings'))
      {
        EventImportSettings();
      }
    if (EndsWith(clickedOn,'savecloudsettings'))
      {
        EventSaveCloudSettings();
      }
    if (EndsWith(clickedOn,'loadcloudsettings'))
      {
        EventLoadCloudSettings();
      }              
    if (EndsWith(clickedOn,'configure'))
      {
        EventConfigPage();
      }
    if (clickedOn.indexOf('-remove-') > 0)
      {
        EventRemove(clickedOn);
      }
    if (clickedOn.indexOf('-sortup-') > 0)
      {
        EventSortOne(clickedOn,true);
      }
    if (clickedOn.indexOf('-sortdown-') > 0)
      {
        EventSortOne(clickedOn,false);
      }
    if (clickedOn.indexOf('-edit-') > 0)
      {
        EventEdit(clickedOn);
      }
    if (clickedOn.indexOf('countshow') > 0)
      {
        EventCountShow(clickedOn);
      }
    if (clickedOn.indexOf('countallhide') > 0)
      {
        EventCountHideAll(clickedOn);
      }
    if (clickedOn.indexOf('countallreshow') > 0)
      {
        EventCountReshowAll(clickedOn);
      }
    if (clickedOn.indexOf('counthide') > 0)
      {
        EventCountHide(clickedOn);
      }
    if (clickedOn.indexOf('countreshow') > 0)
      {
        EventCountReshow(clickedOn);
      }
    if (clickedOn.indexOf('countallshow') > 0)
      {
        EventCountAllShow();
      }
    if (clickedOn.indexOf('clear') > 0)
      {
        EventClear();
      }
    // we handled the event so stop propagation
    event.stopPropagation();
    event.preventDefault();
    }
}, true);
}

// ===================================================================
// Search Stuff

function CallFlickrMethod(method, params, onLoadFunction)
{
	params['format'] = 'json';
	params['nojsoncallback'] = 1;
	params['method'] = method;
	var url = "http://api.flickr.com/services/rest?";
	CallMethod(url,params,onLoadFunction);
}

function CallMethod(url,params,onLoadFunction)
{
        for(key in params){
		url += "&" + key + "=" + params[key];
	}
	GM_xmlhttpRequest({
          method:"GET",
          url:url,
          headers:{
          "User-Agent":"monkeyagent",
          "Accept":"text/monkey,text/xml",
        },
  onload:onLoadFunction
});
}

function CallPostMethod(url,params,onLoadFunction)
{
        var data = "";
	for(key in params){
		data += key + "=" + params[key] + "&";
	}	
	GM_xmlhttpRequest({
          method:"POST",
          url:url,
	  data:data,
          headers:{
          "User-Agent":"monkeyagent",
          "Accept":"text/monkey,text/xml",
	  "Content-Type": "application/x-www-form-urlencoded"
        },
  onload:onLoadFunction
});
}

function GetCommentsForPhotoId(PhotoId)
{
// Have we already cached the comments?
if (glblLastPhotoId != PhotoId || glblCommentsText == undefined) {
  var params = new Array();
  glblPhotoId = PhotoId;
  params['photo_id'] = PhotoId;
  params['api_key'] = glblApiKey;
  var onLoadFunction = function(details) {
      ProcessComments(details.responseText);
    }
  CallFlickrMethod('flickr.photos.comments.getList', params, onLoadFunction);
  } else
  {
    ProcessComments(glblCommentsText);
  }
}

function GetFavouritesForPhotoId(PhotoId)
{
  var params = new Array();
  params['photo_id'] = PhotoId;
  params['per_page'] = 1;
  params['api_key'] = glblApiKey;
  var onLoadFunction = function(details) {
      ProcessFavourites(details.responseText);
    }
  CallFlickrMethod('flickr.photos.getFavorites', params, onLoadFunction);
}

function GetGalleriesForPhotoId(PhotoId)
{
  var params = new Array();
  params['photo_id'] = PhotoId;
  params['per_page'] = 1;
  params['api_key'] = glblApiKey;
  var onLoadFunction = function(details) {
      ProcessGalleries(details.responseText,PhotoId);
    }
  CallFlickrMethod('flickr.galleries.getListForPhoto', params, onLoadFunction);
}


function CountAwardsPresentInText(intext, awardtextarr)
{
result = 0;
for (var i = 0; i < awardtextarr.length;i++) {
  // Todo : Maybe make this 2.7 change optional in future
  // if (intext.toLowerCase().indexOf('src="' + awardtextarr[i].toLowerCase() + '"') > 0)
  if (intext.toLowerCase().indexOf(awardtextarr[i].toLowerCase()) > -1)
    { result++; }
  }
return result;
}

function inArray(arr, str)
{
for (var i=0; i<arr.length; i++)
  {
  if (arr[i] == str)
    { return true; }
  }
return false;
}

function AllowDupes(who){
  if (!glblAllowDupesFrom) return false;
  return inArray(glblAllowDupesFrom,who.toLowerCase())
}

function ProcessFavourites(favouriteText) {
  var photoId = 0;
  var obj = eval('(' + favouriteText + ')');
  if (obj.stat == 'fail') { return;  }
  photoId = obj.photo.id;
  DisplayFavourites(obj.photo.total,photoId);
}

function ProcessGalleries(galleryText,photoId) {
  var obj = eval('(' + galleryText + ')');
  if (obj.stat == 'fail') { return;  }
  DisplayGalleries(obj.galleries.total,photoId);
}


function ProcessComments(commentsText)
{
glblCommentsText = commentsText;
var awardCount, who, whoAwarded;
// initialize everything
var CommentCount = 0;
var PhotoId = 0;
var dupesAllowed = false;
var WhoAwardedAwards = new Array();
var AwardCounts = new Array();
for (i=0;i<glblConfigAwards.length;i++)
  {
  WhoAwardedAwards[i] = new Array();
  AwardCounts[i] = 0;
  }
var obj = eval('(' + commentsText + ')');
if (obj.stat == 'fail')
  {
    if (obj.code == 1)
      DisplayError(glblPhotoId, obj.message + " (maybe it's private and I can't grab the comments?)");
      else DisplayError(glblPhotoId,'Code: ' + obj.code + ' Message: ' + obj.message);
  }
  else
  {
  PhotoId = obj.comments.photo_id;
  glblLastPhotoId = PhotoId;
  var comments = obj.comments.comment;
  if (comments)
    {
    CommentCount = comments.length;
    for(var i = 0; i < comments.length; i++)
      {
      var comment = comments[i];
      who = comment.authorname;
        for (var i2=0;i2<glblConfigAwards.length;i2++)
        {
          Award = glblConfigAwards[i2];
          if (Award == undefined) { continue; }
          awardCount = CountAwardsPresentInText(comment._content,Award["Url"]);
          if (awardCount > 0)
            {
              whoAwarded = WhoAwardedAwards[i2];
              dupesAllowed = AllowDupes(who);
              if (inArray(whoAwarded,who) && !dupesAllowed) 
                { continue; }
              if (!dupesAllowed)
                { awardCount = 1; }
              AwardCounts[i2] = AwardCounts[i2] + awardCount;
              whoAwarded[whoAwarded.length] = who;
            }
        }
      }
    }
  DisplayAwards(AwardCounts,CommentCount,PhotoId);
  if (glblFavourites) { GetFavouritesForPhotoId(PhotoId); }
  if (glblGalleries) { GetGalleriesForPhotoId(PhotoId); }  
}
if (glblAllPhotos)
  {
  DisplayNextPhotoDetails();
  }
}

function DisplayNextPhotoDetails()
{
if (glblAllPhotos)
  {
  for (var i = 0; i < glblAllPhotos.length; i++)
    {
      if (!glblAllPhotos[i].Done)
        {
          glblAllPhotos[i].Done = true;
          var AwardDivOuter = GetDisplayElement(glblAllPhotos[i].PhotoId);
          if (AwardDivOuter)
            {
              var AwardDivInner = FindFirstElement(AwardDivOuter,AwardInnerXPath);
              if (AwardDivInner.innerHTML == '')
                {
                GetCommentsForPhotoId(glblAllPhotos[i].PhotoId);
                }
                else
                {
                ToggleDisplayAwards(glblAllPhotos[i].PhotoId,true);
                }
            }
        }
    }
  glblAllPhotos = undefined;
  theElement = document.getElementById('flickraward-awardcountall');
  if (theElement)
    {
    theElement.innerHTML = AwardCounter + ' ' + ConfigureLink + ' <span id="flickaward-showhideall"></span>';
    ToggleShowHideAll(true);
    }
  }
}

function ToggleShowHideAll(Visible)
{
var theElement = document.getElementById('flickaward-showhideall');
  if (theElement)
    {
      if (Visible)
      { 
        theElement.innerHTML = '<small>( <a href="#flickrawardconfig-countallhide" class="Plain">hide all awards</a> )</small>';
      }
      else
      {
        theElement.innerHTML = '<small>( <a href="#flickrawardconfig-countallreshow" class="Plain">show all awards</a> )</small>';
      }
    }
}

function GetAwardCounts()
{
var PhotoId = GetPhotoId();
GetCommentsForPhotoId(PhotoId);
}

function GetPhotoId()
{
var Id = '';
//<link id="image-src" href="http://farm8.staticflickr.com/7207/7122222123_e75d17f0f0_m.jpg" rel="image_src">
var allPhotoUrls = document.evaluate(
    ".//link[@id='image-src']/@href",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if (allPhotoUrls.snapshotLength === 0) { // old layout
    allPhotoUrls = document.evaluate(
    ".//div[@class='photoImgDiv']/img/@src",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    }
if (allPhotoUrls.snapshotLength === 0) { // new layout
    allPhotoUrls = document.evaluate(
    ".//div[@class='photo-div']/img/@src",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    }
for (var i = 0; i < allPhotoUrls.snapshotLength; i++) {
    thisElement = allPhotoUrls.snapshotItem(i);
    if (thisElement.value) {
      Id = GetImageId(thisElement.value);
      break;
      }
    }
return Id;
}

function CreateAwardPane(pane)
{
if (pane) {
  newElement = document.createElement('p');
  newElement.setAttribute('id','flickraward-awardcount');
  var buf = '<p><h3>Awards</h3></p><p><span id="flickraward-awardcount-inner" class="AwardCount">Retrieving comments, please wait...</span><br/>' + AwardCounter + ConfigureLink + '</p>';
  newElement.innerHTML = buf;
  pane.parentNode.insertBefore(newElement, pane);
  }
}

function GetDisplayElement(PhotoId)
{
   if (glblMode == SinglePhotoMode)
   {
     return document.getElementById('flickraward-awardcount');
   }
   else
   {
     var buf = 'flickraward-awardcount-' + PhotoId;
     return document.getElementById(buf);
   }
}

function DisplayError(PhotoId, errorstr)
{
    var AwardDivOuter = GetDisplayElement(PhotoId);
    if (AwardDivOuter) {
       var AwardDivInner = FindFirstElement(AwardDivOuter,AwardInnerXPath);
       AwardDivInner.innerHTML = 'Error: ' + errorstr;
    if (glblMode != SinglePhotoMode)
      {
      ToggleDisplayAwards(PhotoId,true);
      }
    }
}

function ToggleDisplayAwards(PhotoId,Visible)
{
var AwardDivOuter = GetDisplayElement(PhotoId);
if (AwardDivOuter)
  {
  var Footer = FindFirstElement(AwardDivOuter,AwardFooterXPath);
  var AwardDivToHide = FindFirstElement(AwardDivOuter,AwardToHideXPath);
  if (!Visible)
    {
    var buf = '';
    if (glblMode == GroupMode)
      { buf += AwardCounter; }
     buf += '<small>( <a href="#flickrawardconfig-countreshow-'+PhotoId+'" class="Plain">show awards</a> )</small>';
     Footer.innerHTML = buf;
    }
    else
    {
    Footer.innerHTML = '';
    }
  if (Visible)
    {
    AwardDivToHide.style.visibility = 'visible';
    AwardDivToHide.style.display = 'inline';
    AwardDivToHide.style.lineHeight = 'normal';
    }
    else
    {
    AwardDivToHide.style.visibility = 'hidden';
    AwardDivToHide.style.display = 'none';
    }
    FixHeights();
  }
}

function DisplayFavourites(favCount, PhotoId){
  var AwardDivOuter = GetDisplayElement(PhotoId);
  if (AwardDivOuter) {
    var AwardDiv = FindFirstElement(AwardDivOuter,AwardInnerXPath);
    AwardDiv.innerHTML += '&nbsp; <b>' + favCount + '</b> favourites<br/>';
    }
}

function DisplayGalleries(galCount, PhotoId){
  var AwardDivOuter = GetDisplayElement(PhotoId);
  if (AwardDivOuter) {
    var AwardDiv = FindFirstElement(AwardDivOuter,AwardInnerXPath);
    AwardDiv.innerHTML += '&nbsp; <b>' + galCount + '</b> galleries<br/>';
    }
}


function DisplayAwards(AwardCounts, CommentCount, PhotoId)
{
  var AwardDivOuter = GetDisplayElement(PhotoId);
  if (AwardDivOuter) {
    var AwardDiv = FindFirstElement(AwardDivOuter,AwardInnerXPath);
    // Iterate over awards
    var addedAward = false;
    var buf = 'This photo has:<br/>';
    for (i=0;i<glblConfigAwards.length;i++)
      {
      Award = glblConfigAwards[i];
      if (Award != undefined) {
        // Stick our content into the page before comments
        if ((!glblHideZeroCount) || (AwardCounts[i] != 0)) {
          buf += '&nbsp;&nbsp;&nbsp;&nbsp;<b>' + AwardCounts[i] + '</b> ' + Award["Name"] + '<br/>';
          }
        addedAward = true;
        }
      }
    buf += '&nbsp; <b>' + CommentCount + '</b> comments<br/>';
    if (!addedAward){
      buf += 'No awards configured, please click configure to set some up<br/>';
      }
    AwardDiv.innerHTML = buf;
    if (glblMode != SinglePhotoMode)
     {
       ToggleDisplayAwards(PhotoId,true);
     }
   }
}

function GetImageId(url)
{
   url = url.substring(url.lastIndexOf('/') + 1,255);
   url = url.substring(0,url.indexOf('_'));
   return url;
}

function FindPhotoIdInElement(theElement)
{
  var imgEnd = '_m\.jpg';
  var thisElement;
  var allImgs = document.evaluate(
    ".//img",
    theElement,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allImgs.snapshotLength; i++) {
    thisElement = allImgs.snapshotItem(i);
    if (thisElement.src.match('^https:\/\/(.*)\.yimg\.com\/(.*)\/(.*)$'))
      {
      var buf = GetImageId(thisElement.src);
      return buf;
      }
    if (thisElement.src.match('^(.*):\/\/(.*)\.staticflickr\.com\/(.*)$'))
      {
      var buf = GetImageId(thisElement.src);
      return buf;
      }
    }
return '';
}

function GetCommentCountLink(ImageId)
{
if (glblMode == PoolMode)
  {
  return '<span id="awardcount-awardfooter"><small>( <a href="#flickrawardconfig-countshow-'+ ImageId +'" class="Plain">show awards</a> )</small></p>';
  }
  else
  {
  return '<span id="awardcount-awardfooter"><small>flickr Award Counter ( <a href="#flickrawardconfig-countshow-'+ ImageId +'" class="Plain">show awards</a> )</small></p>';
  }
}

function AddGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function AddCommentCountLinks(xPath,into)
{
var allElements = document.evaluate(
    xPath,
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var thisElement;

for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    if (thisElement.innerHTML.indexOf('flickraward-awardcount-') > -1) { 
      continue; 
      }
    var ImageId = FindPhotoIdInElement(thisElement);
    if (ImageId != '')
      {
         newElement = document.createElement('div');
         newElement.setAttribute('id','flickraward-awardcount-' + ImageId);
         newElement.setAttribute('style','z-index: 9000; margin-top: 8px; text-align:left; ! important');
         newElement.setAttribute('class','flickraward');
         buf = '<span id="flickraward-awardcount-tohide" style="display:none;visibility:hidden;">';
         buf += '<span id="flickraward-awardcount-inner" class="AwardCount"></span>';
         buf += '<small>( <a href="#flickrawardconfig-counthide-'+ImageId+'" class="Plain">hide awards</a> )</small>';
         buf += '</span>' + GetCommentCountLink(ImageId);
         newElement.innerHTML = buf;
         //todo : change this to insert after poollist
         if (into)
         {
           thisElement.appendChild(newElement);
         }
         else
         {
           thisElement.parentNode.insertBefore(newElement,thisElement.nextSibling);
         }
         //newElement.parentNode.style.height = '145px';
      }
    }
}

function ProcessFlickrPhotoPage()
{
var discussPane, newElement;
discussPane = document.getElementById('DiscussPhoto');
if (!discussPane) // new layout?
  {
  discussPane = document.getElementById('meta');
  }
if (discussPane)
  {
  CreateAwardPane(discussPane);
  // Get the number of images on the page
  GetAwardCounts();
  }
}

function ProcessFlickrGroupPage()
{
AddCommentCountLinks("//td[@class='Said']",true);
var thisElement = document.getElementById('DiscussTopic');
CreateCountAllDiv(thisElement);
}

function FindFirstElement(root, xPath)
{
var allElements = document.evaluate(
    xPath,
    root,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var thisElement = null;
if (allElements.snapshotLength > 0)
  thisElement = allElements.snapshotItem(0);
return thisElement;
}

function CreatePoolViewErrorDiv(Parent){
if (Parent)
  {
  newElement = document.createElement('div');
  newElement.setAttribute('id','flickraward-errordiv');
  var buf = AwardCounter + ' ' + ConfigureLink + ' <small>( Cannot show awards in justified view, please change to a thumbnail view )</small>';
  newElement.innerHTML = buf;
  Parent.parentNode.insertBefore(newElement, Parent);
  }
}

function CreateCountAllDiv(Parent)
{
if (Parent)
  {
  newElement = document.createElement('div');
  newElement.setAttribute('id','flickraward-awardcountall');
  var buf = AwardCounter + ' ' + ConfigureLink + ' <small>( <a href="#flickrawardconfig-countallshow" class="Plain">show all awards</a> )</small>';
  newElement.innerHTML = buf;
  Parent.parentNode.insertBefore(newElement, Parent);
  }
}

function ProcessFlickrPoolPage()
{
AddGlobalStyle('.AwardCount { font-size: 11px; padding: 0px; text-align: left; ! important; }');
// Spaceball / spaceout.gif can cover the next image in the grid and cause the wrong link to be clicked
AddGlobalStyle('.spaceball, .spaceout.gif { display: none !important; }');

var thisElement = FindFirstElement(document, "//div[@id='pool-photos']");

var varElement = document.getElementById("options-thumb");
if (varElement.innerHTML.indexOf("Justified") > -1) {
  CreatePoolViewErrorDiv(thisElement);
  return;
}

CreateCountAllDiv(thisElement);
setInterval (function() {
  AddCommentCountLinks("//div[@class='pool-photo photo-display-item' and not(div[class='flickraward'])]",true); }, 1000);
}

function FixHeights(){
  var allElements = document.evaluate(
    "//div[@class='pool-photo photo-display-item']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var thisElement;
var maxHeight = 0;
var rowElements = []; 
var lastTop = allElements.snapshotItem(0).offsetTop;
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    if (thisElement.offsetTop != lastTop) {
      for (var k = 0; k < rowElements.length; k++) {
        rowElement = rowElements[k];
        rowElement.style.height = maxHeight + 'px';
        }
      rowElements = [];
      maxHeight = 0;
      lastTop = thisElement.offsetTop;
    }
      rowElements.push(thisElement);
      var totalHeight = 30;
      for (j = 0; j < thisElement.childNodes.length; j++ ){
        totalHeight += thisElement.childNodes[j].offsetHeight;
      }
      if (totalHeight > maxHeight) {
        maxHeight = totalHeight;
        }
  }
  for (var k = 0; k < rowElements.length; k++) {
        rowElement = rowElements[k];
        rowElement.style.height = maxHeight + 'px';
        }
}

function RemoveTags(theString)
{
theString = theString.replace('<', '');
theString = theString.replace('>', '');
return theString;
}

function ConvertTags(theString)
{
theString = theString.replace('<', '&lt;');
theString = theString.replace('>', '&gt;');
return theString;
}

function DateDiffDays(date1, date2)
{
var one_day=1000*60*60*24;
return Math.ceil((date1.getTime()-date2.getTime())/(one_day));
}

function ProcessUpdateInfo(updateInfo){
  try {
    var obj = eval('(' + updateInfo + ')');
    if (obj.error) {
      alert('Update check error: ' + obj.error);
    } else {
      glblServerVersion = obj.version;
    }
    glblLastCheckedVersion = new Date();
    SaveUpdateInfo();
    if (NewerVersion(glblServerVersion,glblVersion)) {
      alert('There is a flickr Award Counter update available. Please check the configuration page for details');
      }
    } catch (e) {
       GM_log("error processing updateinfo: " + e + " - updateInfo=\"" + updateInfo + "\"");
    }
}

function CheckForUpdates()
{
  if (!glblUpdateCheck) { 
    return; 
    }
  var currentDate = new Date();
  if ((glblLastCheckedVersion != undefined) && (DateDiffDays(currentDate,glblLastCheckedVersion) < 7)) { 
    return; 
    }
  var onLoadFunction = function(details) {
      ProcessUpdateInfo(details.responseText);
    }
  CallMethod(glblScriptVersionUrl,new Array(),onLoadFunction);
}

function LoadCloudSettings()
{
  var onLoadFunction = function(details) {
      ProcessCloudSettings(details.responseText);
    }
  var params = new Array();
  params['action'] = 'load';
  params['settingsid'] = glblCloudSettingsId;
  CallPostMethod(glblCloudSettingsUrl,params,onLoadFunction);
}

function SaveCloudSettings(){
  var onSaveFunction = function(details) {
      ProcessCloudSettings(details.responseText);
    }
  var params = new Array();
  params['action'] = 'save';
  params['settingsid'] = glblCloudSettingsId;
  params['settings'] = CreateSaveAwardStr();
  CallPostMethod(glblCloudSettingsUrl,params,onSaveFunction);
}

function EvalReturnValue(val){
  try {
    return eval('(' + val + ')');
  } 
  catch (e) {
    alert("Oops! Could not parse the value returned from the webserver! \r\n" + e.name + " " + e.message + " '" + val + "'");
  }
}

function ProcessCloudSettings(cloudSettings){
  var obj = EvalReturnValue(cloudSettings);
  var msg;
  if (obj.error) {
    alert('Settings error: ' + obj.error);
    return;
  }
  if ((!obj.settingsid) || (!obj.action)) {
    alert('Settings error: Server returned invalid data');
    return;
  }
  glblCloudSettingsId = obj.settingsid;
  SaveCloudSettingsId();
  SafeSetElementValue("AwardCloudSettingsId",glblCloudSettingsId);
  if (obj.action == 'save') {
    msg = "Settings saved";
  }
  if (obj.action == 'load') {
    ParseSaveAwardStr(obj.settings);
    ConfigDisplayAwards();
    msg = "Settings loaded";
  }
  alert(msg);
}

// ===================================================================
// Main script

function Main()
{
GM_registerMenuCommand("Configure flickrAwardCounter",EventConfigPage);
GM_registerMenuCommand("Clear flickrAwardCounter config",EventClear);
AddGlobalStyle('.AwardCounterButton:link, .AwardCounterButton:visited { padding: 2px 4px 2px 4px; margin: 0px; text-decoration: none; width: 65px; text-align: center; border: 1px solid; border-color: #aaa #000 #000 #aaa; background: #BBBBBB; ! important; }');
AddGlobalStyle('.AwardCounterButtonSmall:link, .AwardCounterButtonSmall:visited { padding: 2px 4px 2px 4px; margin: 0px; text-decoration: none; width: 10px; text-align: center; border: 1px solid; border-color: #aaa #000 #000 #aaa; background: #BBBBBB; ! important; }');
AddGlobalStyle('.AwardCounterButton:hover, .AwardCounterButtonSmall:hover { border-color: #000 #aaa #aaa #000; ! important; }');
AddGlobalStyle('.AwardCount { text-align: left; ! important; }');
if (glblConfigAwards == undefined) {
  Load();
  }
ConfigureEvents();
if (document.location.href.match('^http:\/\/(.*)\/groups\/(.*)\/discuss\/(.*)$'))
  {
    // this is a group thread
    glblMode = GroupMode;
    ProcessFlickrGroupPage();
  }
  else if (document.location.href.match('^http:\/\/(.*)\/groups\/(.*)\/pool\/(.*)$'))
  {
    // this is a pool thread
    glblMode = PoolMode;
    ProcessFlickrPoolPage();
  }
  else
  {
    // this is a photo page
    glblMode = SinglePhotoMode;
    ProcessFlickrPhotoPage();
  }
  CheckForUpdates();
}

Main();