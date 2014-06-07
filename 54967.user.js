// ==UserScript==
// @name           MafiaWars - Tabbed Mafia Invite
// @namespace      mw_tabbed_invite
// @description    Automatically opens "Add Requests" for all "unadded" Friends
// @include        http://apps.facebook.com/inthemafia/*
// ==/UserScript==

//<label class="clearfix"><input class="inputcheckbox " id="ids[]" name="ids[]" value="550169434" fb_protected="true" type="checkbox"><span>Daniel Koh</span></label>

var invitelist = false;
var inviteidx = 0;

function onInvitePage() {
  // Return true if we're on the home page, false otherwise.
  if (document.evaluate('.//input[@id="ids[]"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue) {
    return true;
  }

  return false;
}

function getIdList()
{
  var list = [];
  var b = onInvitePage();

  if(!b)
    return list;

  var Items = document.getElementsByName("ids[]");

  for(var i = 0; i < Items.length; i++)
    if(Items[i].value && Items[i].parentNode.parentNode.attributes[0].nodeValue == "unselected_list")
      list.push(Items[i].value);

  return list;
}

function showInvitableIds()
{
  var l = getIdList();
  if(l.length > 0)
    alert(l.join(";"));
  else
    alert("Sorry, no ids found...");
}

function inviteInvitableIds()
{
  invitelist = getIdList();
  inviteidx = 0;
  doInvite();

}

function doInvite()
{
  if(invitelist != false && inviteidx < invitelist.length)
  {
    var item = invitelist[inviteidx];
//    window.open("http://apps.facebook.com/inthemafia/status_invite.php?from="+item,"Invite");
    window.open("http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=war&xw_action=add&xw_city=1&friend_id="+item, "Invite");
    this.focus();
    inviteidx++;

    //set timeout between 10 and 15 seconds
    timeout = 10000 + parseInt( Math.random() * 5000);
    setTimeout(doInvite, timeout);
  }
  else 
  {
    invitelist = false;
    alert("Inviting finished, you can continue browsing...");
  }
}

GM_registerMenuCommand('FB Mafia Wars AutoInvite - Show invitables', showInvitableIds);
GM_registerMenuCommand('FB Mafia Wars AutoInvite - Invite invitables', inviteInvitableIds);

//
//process();
