// ==UserScript==
// @name          vwGiftSpammer
// @namespace     facebook
// @description   Send a specified amount of any gift you have, to any of your clan members
// @version       0.4.3
// @include       http://apps.facebook.com/vampiresgame/*
// @include       http://apps.new.facebook.com/vampiresgame/*
// ==/UserScript==

// Script details for use within the script
var SCRIPT = {
	url: 'http://userscripts.org/scripts/show/47469',
	version: '0.4.3',
	name: 'vampiresgame',
	appID: 'app25287267406',
	presentationurl: 'http://userscripts.org/scripts/show/47469'
};

// v0.1: initial release
// v0.2: Fix: Title Bar of dialog wasn't always displayed because of using static links
//       Fix: The link was set incorrectly for any Purchasable items
// v0.3: Add: Now has it's own 'interface'
//       Add: Uses AJAX to send gifts
//       Add: Displays the time, the running number, and running total of Pyros received
// v0.3.1 Add: Opens the spamming in a new tab/window
//        Fix: Will now show the last item in the list (Thanx John New)
// v0.4: Fix: Changed the URL to the normal group.php URL. On some ISPs a Error 404 was given when pointing to the non existant URL (Thanx Feriya)
// v0.4.1 Fix: Zynga has gone and changed logic. It's no longer the Group.php page that sends the gifts, but a new page called gift_give.php
// v0.4.2 Fix: A null value was returned causing the Spammer to stop working.
// v0.4.3 Fix: Zynga has gone and changed logic again with the resend. They added a hash value for resending, without which the Spammer would not send again.
//        Change: Also reverted back to the proper numbering system (starting at one)

document.getElementsByPartialAttribute = function(attr,cl) {
  var retnode = [];
  var myAttReg = new RegExp(cl);
  var elem = this.getElementsByTagName('*');
  for (var i = 0; i < elem.length; i++) {
    var atts = elem[i].getAttribute(attr);
    if (myAttReg.test(atts)) retnode.push(elem[i]);
  }
  return retnode;
};

function giftType(qty,type) {
  this.qtyOwned = qty;
  this.itemType= type;
}

// Settings
var spamDelay = 500;
var OwnedAbilities = new giftType();

startSpam();

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars(custom) {
  var vars = [], hash;
  var url;
  if (custom != null) {
    url = custom;
  } else {
    url = window.location.href;
  }
  var hashes = url.slice(url.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
  }
  return vars;
}

function startSpam() {
  var giftcount = 0;
  var giftmax = 0;
  var urluser = 0;
  var gift_id = 0;
  var item_type = 0;
  var hashval = 0;
  var urlv = getUrlVars();

  giftcount = parseInt(urlv['giftcount']);
  giftmax = parseInt(urlv['giftmax']);
  urluser = urlv['target_id'];
  gift_id = urlv['item_id'];
  item_type = urlv['item_type'];
  hashval = urlv['hash'];

  if ((giftcount == 'undefined') || (giftcount == 'NaN')) { giftcount = 0; }
  if (!giftmax) { giftmax = 1; }
  if (!giftcount) {giftcount = 0;}
  if (giftcount == 0) { giftcount++; }
  if (giftcount+1 <= giftmax) {
     if ((urluser != null) && (urluser != "")) {
       window.name = "GiftSpammer";
       document.title = "GiftSpammer";
       document.body.style.backgroundColor = '#000000';
       //giftcount++;
       setTimeout(function(e) {spamGift(urluser,gift_id,giftcount,giftmax,item_type,hashval)},spamDelay);
       return;
     }
  }
  buildDialog();
}

function spamGift(xuser,gift_id,xgift,xmax,xtype,hashval) {
  if (xuser == null) {
    // The button has just been clicked (first time)
    var user = document.getElementById('spam_gift_user').value;
    var gift = document.getElementById('spam_gift_gift').value;
    var giftcount = 0;
    var max = document.getElementById('spam_gift_max').value;
    var item_type = document.getElementById('spam_gift_type').value;
    var hash_val = document.getElementById('spam_hash_val').value;
  } else {
    // This will only happen if we have already started sending
    var user = xuser;
    var gift = gift_id;
    var giftcount = xgift;
    var max = xmax;
    var item_type = xtype;
    var hash_val = hashval;
  }
  var url = 'http://apps.facebook.com/vampiresgame/group.php?target_id='+user+'&item_id='+gift+'&item_type='+item_type+'&do_gift=1&giftcount='+giftcount+'&giftmax='+max+'&hash='+hash_val;
  if (location.href.indexOf(SCRIPT.name+'/group.php') != -1) {
    if (location.href.indexOf('giftcount') != -1) {
      // Check if this is the first time...
      var div = document.getElementById('GiftSpamMessages');
      if (div == null) {
         // Get our new ParentDiv
         // Add a DIV that will be controlled by me. This will have a list stating the qty sent, and whether santa visited or not
        div = document.createElement('div');
        //div.setAttribute('style','width:700px;height:80%;background:#000;border:1px solid #400;position:absolute;display:block;color:#FFF;overflow:auto;padding:1px;');
        div.className = 'requests clearfix';
        div.id = 'GiftSpamMessages';
        var mDiv = document.getElementById('app25287267406_content');
        mDiv.removeChild(mDiv.getElementsByTagName('ul')[0]);
        removeAll(mDiv);
        mDiv.appendChild(div);
        setTimeout(function(e) {spamAJAX(user,gift,giftcount,max,item_type,hash_val)},spamDelay);
      }
    } else {
      return;
    }
  } else if(user != null) {
    window.location = url;
  }
}

function removeAll(parent) {
  while (parent.getElementsByTagName('*').length > 0) {
    parent.removeChild(parent.lastChild);
  }
}

function GetAJAX() {
    var xmlHTTP = null;
    try { xmlHTTP = new XMLHttpRequest(); // FF, O, S
    } catch(e) {
        try { xmlHTTP = new ActiveXObject("Msxml2.XMLHTTP"); // IE6+
        } catch (e) {
            try { xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP"); // IE5.5+
            } catch (e) {
                alert("Your browser does not support AJAX!");
                return null;
            }
        }
    }
    return xmlHTTP;
}

var cDiv;
var cCount;
var cMax;
var cUser;
var cGift;
var cType;
var cSanta = 0;
var cHashVal = 0;

function spamAJAX(user,gift,count,max,type,hashval) {
    ajax = GetAJAX();
    if (ajax == null) {
        return;
    }
    var url = 'http://apps.facebook.com/vampiresgame/gift_give.php?'
    url += 'target_id='+user+'&item_id='+gift+'&item_type='+type+'&do_gift=1&hash='+hashval;
    cUser = user;
    cGift = gift;
    cType = type;
    cCount = count;
    cMax = max;
    cHashVal = hashval;
    if (cDiv == null) { cDiv = document.getElementById('GiftSpamMessages'); }
    addLog(url,"#400");
    ajax.onreadystatechange = spamStateChange;
    ajax.open("GET", url, true);
    ajax.send(null);
}

function spamStateChange() {
    if (ajax.readyState == 4) {
      var retVal = ajax.responseText;
      var p = document.createElement('p');
      p.innerHTML = retVal;
      var spans = p.getElementsByTagName('div');
      for (var i = 0; i < spans.length; i++) {
        var atts = spans[i].className;
        if (atts == 'messages'){
          var retValu = spans[i].innerHTML;
        }
      }
      if (retValu == null) {
        addLog(p.innerHTML,"#F00");
        return;
      }
      p.innerHTML = retValu;
      retVal = retValu;

      var myRegExp = /(?:<[^<]+?>)\bYou gave (.*?) to (.*?)<[^<]+?>/gi;
      var giftSanta = /\bYou have received (?:.*?>)(\b.*?)<\W*?a>/gi;
      var noAbility = /(?:<[^<]+?>)You don.*?(?:<[^<]+?>)/gi;

      var successSent_Gift = null;
      var successSent_User = null;
      var successSanta = null;
      var failedNoAbility = null;
      var fullMatch = null;
      var mI = retVal.replace(myRegExp, function($0,$1,$2) { fullMatch = $0; successSent_Gift = $1; successSent_User = $2; });
      var tmp = retVal.replace(giftSanta, function($0,$1) {fullMatch = $0;successSanta = $1;});
      if (successSent_Gift == null) {
        // Wasn't sent. Get the failed message
        tmp = retVal.replace(noAbility, function($0,$1) {fullMatch = $0; failedNoAbility = $1;});
      }

      // Add the log entry!
      var txt = "";
      if (successSent_Gift != null) {
        // Insert positive message!
        txt += "(" + cCount + "/" + cMax+") Sent: " + successSent_Gift + " to " + successSent_User;
        cCount++;
        if (successSanta != null) {
          cSanta++;
          txt += " and Santa came for a visit! You got a " + successSanta + " (" + cSanta + ")";
        }
        addLog(txt,"#FFF");
        if (cCount <= cMax){
          setTimeout(function(e) {spamAJAX(cUser,cGift,cCount,cMax,cType,cHashVal)},spamDelay);
        } else {
          addLog('Finished!',"#FFF");
          addLog('You received ' + cSanta + ' Pyros for sending ' + cMax + ' gifts.');
        }
      } else {
        // Warn the user, and abort the script
        txt += failedNoAbility;
        addLog(txt,"#400");
      }
      //ajax = null;
      return;
    }
}

function addLog(msg,color) {
  var now = new Date();
  var tim = now.getDate()+ "/" + now.getMonth()+ "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " ";
  var txt = document.createElement('font');
  txt.setAttribute('style','font-family: lucinda grande; font-size: 11px; text-decoration: none; color:'+color+'; height: 0px; margin-right: 5px;');
  txt.innerHTML = tim + " " + msg;
  cDiv.appendChild(txt);
  txt = document.createElement('br');
  cDiv.appendChild(txt);
  cDiv.scrollTop = cDiv.scrollHeight;
}

var tmp_hash_val;
function populateGifts(sel) {
  OwnedAbilities = new Array();
  var divid = SCRIPT.appID+'_content';
  var div = document.getElementById(divid);
  var tbls = div.getElementsByTagName('table');
  var index = 0;
  var tbl;
  for (index=0;index<=tbls.length-1;index++) {
    if (tbls[index].parentNode.id == divid) {
      tbl = tbls[index];
      break;
    }
  }
  if (tbl == null) { return false; }
  var trs = tbl.getElementsByTagName('tr');
  var it = document.createElement('option');
  it.value = '0';
  it.text = 'Select Ability';
  it.style.disabled = 'disabled';
  sel.options.add(it);
  for(var i=0;i<trs.length;i++){
    var href = trs[i].getElementsByTagName('td')[0].getElementsByTagName('a')[0].href;
    var hvars = getUrlVars(href);
    var desc = trs[i].getElementsByTagName('td')[2].innerHTML;
    desc = trim(desc);
    var owned = trs[i].getElementsByTagName('td')[5].innerHTML.split(':')[1];
    owned = trim(owned);
    var item_id = parseInt(hvars['item_id']);
    var item_type = parseInt(hvars['item_type']);
    var hash_val = hvars['hash'];
    tmp_hash_val = hash_val;
    var gt = new giftType(owned,item_type);
    OwnedAbilities.splice(i,0,gt);
    var it = document.createElement('option');
    it.value = item_id;
    it.text = desc;
    sel.options.add(it);
  }
  return true;
}

function trim(str, chars) { return ltrim(rtrim(str, chars), chars); }
function ltrim(str, chars) { chars = chars || "\\s"; return str.replace(new RegExp("^[" + chars + "]+", "g"), ""); }
function rtrim(str, chars) { chars = chars || "\\s"; return str.replace(new RegExp("[" + chars + "]+$", "g"), ""); }

function getOwnedQty(item_id) {
  var tb = document.getElementById('spam_gift_max');
  var hd = document.getElementById('spam_gift_type');
  var btn = document.getElementById('spam_gift_go');
  if (item_id.selectedIndex == 0) {
    btn.disabled = "disabled";
    btn.value = "Select Ability";
    tb.value = '';
    hd.value = '';
  } else {
    btn.disabled = "";
    btn.value = "Spam";
    tb.value = OwnedAbilities[item_id.selectedIndex-1].qtyOwned;
    hd.value = OwnedAbilities[item_id.selectedIndex-1].itemType;
  }
}

function buildDialog() {
  if (location.href.indexOf(SCRIPT.name+'/gift.php') != -1) {
    // Get the User_ID from the URL
    // Get a list of abilities (ID, Name, and Owned Qty)
    var urlv = getUrlVars();
    urluser = urlv['user_id'];
  } else {
    return false;
  }

  var closeButtonImg = document.getElementsByPartialAttribute('class','close_button')[0].getElementsByTagName('img')[0].src;
  var div = document.createElement('div');
  var tbl = document.createElement('table');
  tbl.border = "0";
  tbl.cellSpacing = "0";
  tbl.cellPadding = "2px";
  var tr = document.createElement('tr');
  var td;
  td = document.createElement('td');
  td.colSpan = "2";
  td.style.textAlign = "right";
  td.innerHTML = '<img src="'+closeButtonImg+'" onclick="document.getElementById(\'spam_gift_div\').style.display=\'none\'" />';
  tr.appendChild(td);
  tbl.appendChild(tr);
  tr = document.createElement('tr');
  td = document.createElement('td');
  td.innerHTML = "<font color='#400'>User ID:</font>";
  tr.appendChild(td);
  td = document.createElement('td');
  td.innerHTML = '<input type="text" id="spam_gift_user" name="spam_gift_user" style="border:1px solid #400;color:#400;background:#FFF" ' + ((urluser != "") ? 'value="'+urluser+'"' : '') + '/>';
  tr.appendChild(td);
  tbl.appendChild(tr);
  tr = document.createElement('tr');
  td = document.createElement('td');
  td.innerHTML = "<font color='#400'>Gift ID:</font>";
  tr.appendChild(td);
  var loadedDD = false;
  if (location.href.indexOf(SCRIPT.name+'/gift.php') != -1) {
    // We are on the gifts page. Get a list of all the items (ID, Name, Owned) and present in a neat little SELECT
    td = document.createElement('td');
    var sel = document.createElement('select');
        sel.style.border = "1px solid #400";
        sel.style.color = "#400";
        sel.style.background = "#FFF";
        sel.id = 'spam_gift_gift';
        XBrowserAddHandler(sel, 'change', function(e) { getOwnedQty(this); });
    td.appendChild(sel); tr.appendChild(td);
    loadedDD = populateGifts(sel);
  }
  if (loadedDD == false) {
    // We are not on the gift page or there was an error. I'm assuming the user knows what the ID of the item is that he wants to send
    td = document.createElement('td');
    td.innerHTML = '<input type="text" id="spam_gift_gift" name="spam_gift_gift" style="border:1px solid #400;color:#400;background:#FFF" />';
    tr.appendChild(td);
  }
  tbl.appendChild(tr); tr = document.createElement('tr');
  tr = document.createElement('tr');
  td = document.createElement('td');
  td.innerHTML = "<font color='#400'>Max Gifts:</font>";
  tr.appendChild(td);
  td = document.createElement('td');
  td.innerHTML = '<input type="text" id="spam_gift_max" name="spam_gift_max" style="border:1px solid #400;color:#400;background:#FFF" /><input type="hidden" id="spam_gift_type" name="spam_gift_type" /><input type="hidden" id="spam_hash_val" value="'+tmp_hash_val+'"/>';
  tr.appendChild(td);
  tbl.appendChild(tr); tr = document.createElement('tr');
  var btn = document.createElement('input');
      btn.type = 'button';
      btn.value = 'Select Ability';
      btn.id = "spam_gift_go";
      btn.name = "spam_gift_go";
      btn.disabled = "disabled";
      XBrowserAddHandler(btn, 'click', function(e) { spamGift() });
      btn.style.border = "1px solid #400";
      btn.style.color = "#400";
      btn.style.background = "#FFF";
  tr = document.createElement('tr');
  td = document.createElement('td'); td.colSpan = "2"; td.style.textAlign = "center"; td.appendChild(btn); tr.appendChild(td);
  tbl.appendChild(tr);
  var giftImage = document.getElementsByPartialAttribute('id',SCRIPT.appID+'_giftButtonOn_')[0].getElementsByTagName('img')[0].src;
  div.appendChild(tbl);
  div.style.position = "fixed";
  div.style.left = "0px";
  div.style.top = "25px";
  div.style.border = "1px solid #400";
  div.style.background='#FFF url('+giftImage+') top left no-repeat';
  div.id = "spam_gift_div";
  div.style.padding = "2px";
  div.style.display = "block";
  document.body.appendChild(div);
}

function XBrowserAddHandler(target,eventName,handlerName)
{
    if ( target.addEventListener )
      target.addEventListener(eventName, handlerName, false);
    else if ( target.attachEvent )
      target.attachEvent("on" + eventName, handlerName);
    else
      target["on" + eventName] = handlerName;
}