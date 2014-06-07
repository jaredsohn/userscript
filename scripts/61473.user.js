// ==UserScript==
// @name           Castle Age - World Call to Arms list
// @description    Displays a list of Call to Arms links for World-type monsters (currently, the only one of that type is Cronus, the World Hydra) when your Facebook News Feed is filtered to the Castle Age application.
// @copyright      2009, Benjamin Sorensen
// @license        GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include        http://www.facebook.com/home.php?filter=app_46755028429
// @namespace      http://userscripts.org/users/sparafucile
// @version        1
// ==/UserScript==
function $e(id) { return document.getElementById(id); }
function $x(x, t, r) {
  if (t && t.nodeType)
    var h = r, r = t, t = h;
  var d = r ? r.ownerDocument || r : r = document, p;
  switch (t) {
    case 1:
      p = 'numberValue';
      break;
    case 2:
      p = 'stringValue';
      break;
    case 3:
      p = 'booleanValue';
      break;
    case 8: case 9:
      p = 'singleNodeValue';
      break;
    default:
      return d.evaluate(x, r, null, t || 6, null);
  }
  return d.evaluate(x, r, null, t, null)[p];
}
function $x1(x, r) { return $x(x, 9, r); }
function createElements(obj) {
  if (typeof obj['tagName'] == 'string') {
    var root = document.createElement(obj['tagName']);
    for (var prop in obj) {
      if (prop == 'tagName') continue;
      else if (typeof obj[prop] == 'object') {
        var child = createElements(obj[prop]);
        root.appendChild(child);
      } else if (prop == 'text') {
        var text = document.createTextNode(obj[prop]);
        root.appendChild(text);
      } else if (/^on.+/.test(prop)) root.addEventListener(prop.substring(2), obj[prop], false);
      else if (prop == 'style') root.setAttribute(prop, obj[prop]);
      else root[prop] = obj[prop];
    }
    return root;
  }
}
var UserID = [];
var UserNames = {};
var GetUserID = /user=(\d+)/;
function CAnf_CallToArmsWorld_Fill() {
  var MonsterList = $e('CAnf_CallToArmsWorld');
  if (!MonsterList) {
    GM_log('Error - could not find my custom list element, "CAnf_CallToArmsWorld", in this document.');
    return;
  }
  // find the stories we want
  var MonsterNames = $x(".//DIV[@class='UIStoryAttachment_Title']/A[1][contains(@href,'/castle_age/battle_monster.php')][contains(@href,'action=doObjective&mpool=3')]", 7);
  var MonsterName;
  var user;
  var SiegeName;
  var siege;
  var UserName;
  var UserComment;
  var Markup;
  for (var idx = 0; idx < MonsterNames.snapshotLength; idx++) {
    MonsterName = MonsterNames.snapshotItem(idx);
    // extract the user id
    user = Number(GetUserID.exec(MonsterName.href)[1]);
    // get the name of the user that posted this
    UserName = $x1("../A[1]/parent::DIV/parent::DIV/parent::DIV/preceding-sibling::H3/A[@class='GenericStory_Name']", MonsterName);
    // is this user id already in the list?
    if (UserID.indexOf(user) == -1) {
      // it isn't
      // remember that we have seen this user id
      UserID.push(user);
      // remember that this user posted
      UserNames['' + user] = [];
      UserNames['' + user].push(UserName.textContent);
      // add a new item to the list
      Markup = createElements(
        { tagName: 'div', id: 'CAnf_CallToArmsWorld_' + user, className: 'UIFilterList_Item', style: 'height:auto;',
          A3: { tagName: 'a', className: 'UIFilterList_ItemLink', style: 'padding-left:4px;padding-top:4px;padding-bottom:2px;', href: 'http://apps.facebook.com/castle_age/battle_monster.php?user=' + user + '&mpool=3&action=doObjective',
            A4: { tagName: 'div', className: 'UIImageBlock clearfix',
              A5: { tagName: 'div', id: 'CAnf_CallToArmsWorld_' + user + '_siege', className: 'UIImageBlock_Image UIImageBlock_ICON_Image UIButton UIButton_Gray', style: 'padding:1px 2px;', textContent: '?' },
              A6: { tagName: 'div', className: 'UIFilterList_Title UIImageBlock_Content UIImageBlock_ICON_Content', style: 'margin-top:2px;', textContent: MonsterName.textContent }
            }
          },
          A7: { tagName: 'a', href: UserName.href, style: 'float:right;white-space:nowrap;', textContent: UserName.textContent }
        }
      );
      MonsterList.appendChild(Markup);
    } else if (UserNames['' + user].indexOf(UserName.textContent) == -1) {
      // it is
      UserNames['' + user].push(UserName.textContent);
      $e('CAnf_CallToArmsWorld_' + user).appendChild(createElements({ tagName: 'a', href: UserName.href, style: 'float:right;white-space:nowrap;', textContent: UserName.textContent }))
    }
  }
  for (var idx = MonsterNames.snapshotLength - 1; idx >= 0; idx--) {
    MonsterName = MonsterNames.snapshotItem(idx);
    // extract the user id
    user = Number(GetUserID.exec(MonsterName.href)[1]);
    // determine the siege number
    SiegeName = $x1("../A[1]/parent::DIV/following-sibling::DIV/B[2]", MonsterName);
    if (!SiegeName) {
      GM_log('Error - cannot find siege attack name on User ID ' + user + '.');
      continue;
    }
    switch (SiegeName.textContent) {
      case 'Catapult':
        siege = '1';
        break;
      case 'Ballista':
        siege = '2';
        break;
      case 'Cannons':
        siege = '3';
        break;
      case 'Blizzard':
        siege = '4';
        break;
      case 'Firestorm':
        siege = '5';
        break;
      case 'Last Stand':
        siege = '6';
        break;
      default:
        siege = '?';
    }
    $e('CAnf_CallToArmsWorld_' + user + '_siege').textContent = siege;
  }
  window.setTimeout(CAnf_CallToArmsWorld_Fill, 30000);
}
function mainBBS61473() {
  var FilterList = $e('home_filter_list');
  if (!FilterList) {
    GM_log('Error - could not find the Facebook newsfeed filter list, "home_filter_list", in this document.');
    return;
  }

  var Markup = createElements(
    { tagName: 'div', id: 'CAnf', className: 'UIFilterList', style: '-moz-user-select:none;',
      A1: { tagName: 'div', id: 'CAnf_CallToArmsWorld', className: 'UIFilterList_List',
        A2: { tagName: 'div', className: 'UIFilterList_Item selected',
          A3: { tagName: 'a', className: 'UIFilterList_ItemLink', style: 'cursor:default;',
            A4: { tagName: 'div', className: 'UIImageBlock clearfix',
              A6: { tagName: 'div', className: 'UIFilterList_Title UIImageBlock_Content UIImageBlock_ICON_Content', textContent: 'Call to Arms - World' }
            }
          }
        }
      }
    }
  );

  FilterList.appendChild(Markup);
  CAnf_CallToArmsWorld_Fill();
}
window.addEventListener('load', function(event) {
  mainBBS61473();
  this.removeEventListener('load', arguments.callee, false);
}, false);