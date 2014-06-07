// ==UserScript==
// @name           Basecamp Writeboard Sorting
// @namespace      http://www.thenewgroup.com/gmscripts
// @description    Allows you to sort the list of writeboards for a Basecamp project
// @include        https://*.basecamphq.com/projects/*/writeboards*
// @copyright      2010+, The New Group (http://theNewGroup.com)
// @author         Kory Paulsen
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        1.2.0
// ==/UserScript==

// Jarett's update checker (http://userscripts.org/scripts/review/20145)
var SUC_script_num = 66314; // Basecamp Writeboard Sorting UserScripts script id
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

function addGlobalStyle(css) { try { var elmHead, elmStyle; elmHead = document.getElementsByTagName('head')[0]; elmStyle = document.createElement('style'); elmStyle.type = 'text/css'; elmHead.appendChild(elmStyle); elmStyle.innerHTML = css; } catch (e) { if (!document.styleSheets.length) { document.createStyleSheet(); } document.styleSheets[0].cssText += css; } }


var debug = false;

// Array to hold all WriteBoard data
var arrWb;

// reference objects for sort links
var aElTitleSort;
var aElCreateDateSort;
var aElModifyDateSort;
var aElModifyBySort;
var aElPrivateSort;

// Object to hold active sort parameters
var sort =
{
  button : aElTitleSort,
  field : 'title',
  order : ascIcon
}

// configure UI
var sortBarHTML = '<strong>Sort:</strong> <a id="titleSort" class="sorter" href="#">title</a> | <a id="createDateSort" class="sorter" href="#">creation date</a> | <a id="modifyDateSort" class="sorter" href="#">modified date</a> | <a id="modifyBySort" class="sorter" href="#">modified by</a> | <a id="privateSort" class="sorter" href="#">privacy</a>';
var ascIcon = '&#9650;';
var descIcon = '&#9660;';
addGlobalStyle('.sorter { text-decoration:none; }');


function getWriteBoardAge( wbDetails )
{
  var detailAgePart = wbDetails.substring( wbDetails.indexOf('Updated ')+8, wbDetails.indexOf(' ago') );
  var ageUnitX = 1;
  switch ( detailAgePart.substring( detailAgePart.lastIndexOf(' ')+1 ) )
  {
    case 'minute'  :
    case 'minutes' :
      ageUnitX = 60;
      break;
    case 'hour'    :
    case 'hours'   :
      ageUnitX = 3600;
      break;
    case 'day'     :
    case 'days'    :
      ageUnitX = 86400;
      break;
    case 'month'     :
    case 'months'    :
      ageUnitX = 2629800;
      break;
    case 'year'    :
    case 'years'   :
      ageUnitX = 31557600;
      break;
  }
  var ageUnitMod = 0;
  switch ( detailAgePart.substring( 0, 4 ) )
  {
    case 'less' :
      ageUnitMod = -1;
      break;
    case 'over' :
      ageUnitMod = 1;
      break;
  }
  var ageUnitQty = detailAgePart.match(/\d+/);
  // qty_units x unit_multiplier +/- modifier (over / less than);
  return ageUnitQty*ageUnitX+ageUnitMod;
}

function getWriteBoardEditor( wbDetails )
{
  return wbDetails.substring( wbDetails.indexOf(' by ')+4 );
}

function parseWriteBoards( writeBoards )
{
  var wbs = writeBoards.children;
  var wbArray = new Array(wbs.length);
  for ( var i=0; i<wbs.length; i++ )
  {
    // get writeboard details
    var wbLastMod,wbEditor;
    try
    {
      var detailXpath = "//li[@id='" + wbs[i].id + "']//div/span[@class='detail']";
      var wbDetails = document.evaluate( detailXpath, wbs[i], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.innerHTML;
      wbLastMod = getWriteBoardAge( wbDetails );   // get approximate # of seconds since last modified
      wbEditor = getWriteBoardEditor( wbDetails ); // get name of last editor
    }catch(e){
      if (debug) alert('Could not retrieve details for writeboard id: ' + wbs[i].id);
    }

    // check if private
    var wbPrivate = false;
    try
    {
      var privateXpath = "//li[@id='" + wbs[i].id + "']/div[@class='PrivateWriteboard']";
      var wbPrivateNode = document.evaluate( privateXpath, wbs[i], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
      if (wbPrivateNode != null)
        wbPrivate = true;
    } catch(e) {
      if (debug) alert('Could not retrieve private/public status of writeboard id: ' + wbs[i].id);
    }

    wbArray[i] =
    {
      'wbId'       : wbs[i].id,
      'id'         : wbs[i].id.substring(11),
      'title'      : wbs[i].getElementsByTagName('a')[0].innerHTML,
      'lastModify' : wbLastMod,
      'lastEditor' : wbEditor,
      'isPrivate'  : wbPrivate
    }
  }
  return wbArray;
}

function resetSortButtons()
{
  aElTitleSort.innerHTML = 'title';
  aElCreateDateSort.innerHTML = 'creation date';
  aElModifyDateSort.innerHTML = 'modified date';
  aElModifyBySort.innerHTML = 'modified by';
  aElPrivateSort.innerHTML = 'private';
}

function initSortClick(field, asc)
{
  if ( typeof(asc) != 'boolean' )
  { // toggle if a sort order was not specified
    if ( field != sort['field'] )
    { // except, always sort asc if the field is changed
      resetSortButtons();
      sort['order'] = ascIcon;
    }
    else
    { // sort order not specified - toggle it
      if ( sort['order'] == ascIcon )
      {
        sort['order'] = descIcon;
      }
      else
      {
        sort['order'] = ascIcon;
      }
    }
  }
  else
  {
    if ( asc )
    {
      sort['order'] = ascIcon;
    }
    else
    {
      sort['order'] = descIcon;
    }
  }
  sort['field'] = field;
}

function refreshList()
{
  for ( var i=0; i<arrWb.length; i++ )
  {
    wbList.appendChild( wbList.removeChild( document.getElementById(arrWb[i].wbId) ) );
    if (debug)
    {
      var wbLI = document.getElementById(arrWb[i].wbId);
      if (document.getElementById('debug_'+arrWb[i].id) == null)
      {
        var debugContent =
          '<br/>wbId: ' + arrWb[i].wbId +
          '<br/>id: ' + arrWb[i].id +
          '<br/>title: ' + arrWb[i].title +
          '<br/>lastModify: ' + arrWb[i].lastModify +
          '<br/>lastEditor: ' + arrWb[i].lastEditor +
          '<br/>isPrivate: ' + arrWb[i].isPrivate;
        var debugDiv = document.createElement('div');
        debugDiv.id = 'debug_' + arrWb[i].id;
        debugDiv.innerHTML = debugContent;
        wbLI.appendChild( debugDiv );
      }
    }
  }
}


function sortTitle(asc)
{
  initSortClick('title', asc);
  sort['button'] = aElTitleSort;
  arrWb.sort( function(){ return (arguments[0].title.toLowerCase() > arguments[1].title.toLowerCase()) } )
  sort['order'] == ascIcon ? true : arrWb.reverse();
  sort['button'].innerHTML = sort['field'] + sort['order'];
  refreshList();
}

function sortCreateDate(asc)
{
  initSortClick('creation date', asc);
  sort['button'] = aElCreateDateSort;
  arrWb.sort( function(){ return (arguments[0].id - arguments[1].id) } )
  sort['order'] == ascIcon ? true : arrWb.reverse();
  sort['button'].innerHTML = sort['field'] + sort['order'];
  refreshList();
}

function sortModifyDate(asc)
{
  initSortClick('modified date', asc);
  sort['button'] = aElModifyDateSort;
  arrWb.sort( function(){ return (arguments[1].lastModify - arguments[0].lastModify) } )
  sort['order'] == ascIcon ? true : arrWb.reverse();
  sort['button'].innerHTML = sort['field'] + sort['order'];
  refreshList();
}

function sortModifyBy(asc)
{
  initSortClick('modified by', asc);
  sort['button'] = aElModifyBySort;
  arrWb.sort( function(){ return (arguments[0].lastEditor > arguments[1].lastEditor) } )
  sort['order'] == ascIcon ? true : arrWb.reverse();
  sort['button'].innerHTML = sort['field'] + sort['order'];
  refreshList();
}

function sortPrivate(asc)
{
  initSortClick('private', asc);
  sort['button'] = aElPrivateSort;
  arrWb.sort( function(){ return (arguments[0].isPrivate < arguments[1].isPrivate) } )
  sort['order'] == ascIcon ? true : arrWb.reverse();
  sort['button'].innerHTML = sort['field'] + sort['order'];
  refreshList();
}


var wbHeader =
  document.evaluate(
    "//div[@id='screen_body']/table//td[@class='left']//div[@class='col']/div[@class='page_header']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
if ( wbHeader )
{
  var sortBar = document.createElement('div');
  sortBar.style.font = 'normal 10pt Arial,sans-serif';
  sortBar.style.margin = '1em 0 0';
  sortBar.innerHTML = sortBarHTML;
  wbHeader.appendChild(sortBar);

  // link sort link objects to sort links
  aElTitleSort = document.getElementById('titleSort');
  aElCreateDateSort = document.getElementById('createDateSort');
  aElModifyDateSort = document.getElementById('modifyDateSort');
  aElModifyBySort = document.getElementById('modifyBySort');
  aElPrivateSort = document.getElementById('privateSort');

  // click events for sort links
  aElTitleSort.addEventListener('click', sortTitle, true);
  aElCreateDateSort.addEventListener('click', sortCreateDate, true);
  aElModifyDateSort.addEventListener('click', sortModifyDate, true);
  aElModifyBySort.addEventListener('click', sortModifyBy, true);
  aElPrivateSort.addEventListener('click', sortPrivate, true);
}

var wbList = document.getElementById('writeboards');

if ( wbList )
{
  // parse writeboard data and store in global array
  arrWb = parseWriteBoards( wbList );

  // default sort
  sortModifyDate(false);  // true=ascending, false=descending
}
