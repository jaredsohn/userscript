/* 
 * Livejournal Twit
 * Author: Serguei Trouchelle (http://trouchelle.com/)
 * Version: 1.3
 */

// ==UserScript==
// @name        LiveJournal Twit
// @namespace   trouchelle.com
// @description Twit dumb comments
// @version     1.3
// @include     http://*.livejournal.com/*
// @exclude     http://pics.livejournal.com/*
// ==/UserScript==

// Get and parse twitlist


function MagentizeLinks () {
  if (!GM_getValue('nomagentize')) {
    var twitlist = GM_getValue('twitlist');
    if (twitlist != '' && twitlist != undefined) {
      var twits1 = twitlist.split(',');
      var twits = new Array;
      var reURL = /\_/gi;
      for (var j = 0; j < twits1.length; j++) {
        twits.push(twits1[j]);
        var twit2 = twits1[j].replace(reURL, '-');
        if (twits1[j] != twit2) {
          twits.push(twit2);
        }
      }

      var allLinks, thisLink;
      allLinks = document.evaluate(
          "//a",
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null);

      var color = GM_getValue("linkcolor");
      if (color == '' || color == undefined) {
        color = 'magenta'; // default
      }

      for (var i = 0; i < allLinks.snapshotLength; i++) {
        thisLink = allLinks.snapshotItem(i);
        var href = thisLink.getAttribute('href');
        var jlink, username;

        if (href != '' && href != undefined) { // check regular links... http://XXX.livejournal.com/
          jlink = /^http:\/\/(.*)\.livejournal\.com\/.*$/;
          username = href.replace(jlink, "$1");
          if (href == username ||
              username == 'www' || username == "pic" ||
              username == "community" || username == "users") {
            username = ''; // 
          }
          if (username == '') { // check another links... http://users.livejournal.com/XXX/...
            jlink = /^http:\/\/users\.livejournal\.com\/(.*)\/.*$/;
            username = href.replace(jlink, "$1");
            if (href == username ||
                0) {
              username = ''; // not found
            }
            if (username == '') { // check another links... http://community.livejournal.com/XXX/...
              jlink = /^http:\/\/community\.livejournal\.com\/(.*)\/.*$/;
              username = href.replace(jlink, "$1");
              if (href == username ||
                  0) {
                username = ''; // not found
              }
              if (username == '') { // and another links... ...?user=XXX
                jlink = /^http:\/\/www\.livejournal\.com\/.*\?user=(.*)$/;
                username = href.replace(jlink, "$1");
                if (href == username ||
                    0) {
                  username = ''; // not found
                }
                if (username == '') { // and old style links...
                  jlink = /^http:\/\/www\.livejournal\.com\/users\/(.*)\/.*$/;
                  username = href.replace(jlink, "$1");
                  if (href == username ||
                      0) {
                    username = ''; // not found
                  }
                  if (username == '') { // and /~username...
                    jlink = /^http:\/\/www\.livejournal\.com\/~(.*)\/.*$/;
                    username = href.replace(jlink, "$1");
                    if (href == username ||
                        0) {
                      username = ''; // not found
                    }
                  }
                }
              }
            }
          }

          if (username != '' && username != undefined) {
            //GM_log("\nFound username:" + username, 0);
            // Search twitlist
            for (var j = 0; j < twits.length; j++) {
              if (username == twits[j]) {
                thisLink.setAttribute("oldbackground", thisLink.style.background);
                thisLink.style.background = color;
                thisLink.setAttribute("magentized", 1);
              }
            }
          }
        }
      }
    }
  } else {
    // remove magentized background
    var allLinks, thisLink;
    allLinks = document.evaluate(
        "//a",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    for (var i = 0; i < allLinks.snapshotLength; i++) {
      thisLink = allLinks.snapshotItem(i);
      if (thisLink.getAttribute("magentized")) {
        thisLink.style.background = thisLink.getAttribute("oldbackground");
        thisLink.setAttribute("magentized", 0);
      }
    }
  }
}

function FilterTwits () {
  if (!GM_getValue("nofilter")) {
    var twitlist = GM_getValue('twitlist');

    //GM_log(twitlist, 1);
    if (twitlist != '' && twitlist != undefined) {

      var twits = twitlist.split(',');

      var allComments, thisComment;
      allComments = document.evaluate(
          "//table[@class='talk-comment']",
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null);

      for (var i = 0; i < allComments.snapshotLength; i++) {
        thisComment = allComments.snapshotItem(i);

        var id = thisComment.id;

        var spans = thisComment.getElementsByTagName("span");
        if (spans.length > 0) {
          var bolds = spans[0].getElementsByTagName("b");
          var username = bolds[0].innerHTML;

          // GM_log("Found username:" + username, 0);
          // Search twitlist
          for (var j = 0; j < twits.length; j++) {
            if (username == twits[j]) {
              // Leave first <td> -- maintain indents
              //var tds = thisComment.getElementsByTagName("td");
              //var td1 = tds[0].innerHTML;
              var tr1 = thisComment.firstChild.firstChild;
              var tds = tr1.getElementsByTagName("td");
              thisComment.oldValue = thisComment.innerHTML;
              // Kill'em!
              var buttonStyle = 'font-size: 8pt; border: 1px solid #333333; margin-right: 2ex; padding: 1px;';
              var formStyle = 'margin: 0px; padding: 0px; display: inline;';
              if (GM_getValue("fullremove")) {
                thisComment.innerHTML = '<tr><td>' + tds[0].innerHTML +
                  '<td style="background: magenta; height="0px;" width="100%"></td></tr>';
              } else {
                thisComment.innerHTML = '<tr><td>' + tds[0].innerHTML + '<td style="border: 1px solid magenta; background: #cccccc; " width="100%">' + 
                  '<!--form style="' + formStyle + '"><input style="' + buttonStyle + '" type="button" value="View" /><input style="' + buttonStyle + '" type="button" value="Unblock-head" /></form-->' + 
                  'Filtered out comment from ' + UserLink(username) +
                  '</td></tr>';
  /*        thisComment.firstChild.firstChild.childNodes[1].addEventListener("click", RemoveTwit(username), false); */
  //GM_log(thisComment.firstChild.firstChild.childNodes[1].childNodes[0]);
  //        thisComment.firstChild.firstChild.childNodes[1].childNodes[1].addEventListener("click", RemoveTwit(username), false);
              }
            }
          }
        }
      }
    }
  }
}


function UserLink (username) {
  var color;
  if (GM_getValue("nomagentize")) {
    color = 'transparent';
  } else {
    color = GM_getValue("linkcolor");
    if (color == '' || color == undefined) {
      color = 'magenta'; // default
    }
  }

  return '<span class="ljuser" style="white-space: nowrap; background: ' +  color + '"><a href="http://www.livejournal.com/users/' + 
         username + '/profile"><img src="http://stat.livejournal.com/img/userinfo.gif" alt="[info]" style="border: 0pt none ; vertical-align: bottom;" height="17" width="17"></a><a href="http://www.livejournal.com/users/' +
         username + '/"><b>' + username + '</b></a></span>';
}

function AddTwit () {
  //twitting ... ;
  var twit = document.getElementById("trouchelletwitadd").value;
  var ntwit = twit.toLowerCase()
  var re = /[\s\W]/gi;
  twit = ntwit.replace(re, '');
  if (twit == '') {
    window.status = 'Livejournal Twit: Please Specify Blockheaded UserName';
  } else {
    GM_setValue('twitlist', GM_getValue('twitlist') + ',' + twit);
    document.getElementById("trouchelletwitadd").value = '';
    FilterTwits();
    window.status = 'Livejournal Twit: Blockheaded ' + twit;
    MagentizeLinks();
  }
}

function RemoveTwit () {
  //untwitting ... ;
  var twit = document.getElementById("trouchelletwitadd").value;
	  var ntwit = twit.toLowerCase()
  var re = /[\s\W]/gi;
  twit = ntwit.replace(re, '');

  var twitlist = GM_getValue('twitlist');
  var twits = twitlist.split(',');
  var newtwits = '';
  for (var j = 0; j < twits.length; j++) {
    if (twit != twits[j] && twits[j] != 'undefined') {
      if (newtwits == '') {
        newtwits = twits[j]; // because there`s no "join" in js...
      } else {
        newtwits = newtwits + ',' + twits[j];
      }
    }
  }
  GM_setValue('twitlist', newtwits);
  FilterTwits();
  window.status = 'Livejournal Twit: Unblockheaded ' + twit;
// MagentizeLinks(); 
}

function ShowSetup () {
  document.getElementById("trouchelletwitsetup").style.display = 'block';
}

function SaveSetup () {
  // saving setup...
  var noFilter = document.getElementById("trouchelletwitsetup1c").checked;
  var noMagentize = document.getElementById("trouchelletwitsetup2c").checked;
  var fullRemove = document.getElementById("trouchelletwitsetup3c").checked;
  var linkColor = document.getElementById("trouchelletwitsetup4c").value;
  GM_setValue("nofilter", noFilter);
  GM_setValue("nomagentize", noMagentize);
  GM_setValue("fullremove", fullRemove);
  GM_setValue("linkcolor", linkColor);
  window.status = 'Livejournal Twit: Settings Saved';
  document.getElementById("trouchelletwitsetup").style.display = 'none';
  FilterTwits();
  MagentizeLinks();
}

var addform = document.createElement('div');
addform.id = "add";
var fieldStyle1  = 'border: 1px solid #999999; height: 16px; width: 60px; padding: 0px; margin: 0px 2px 2px 2px; font-size: 7pt; font-weight: bold; ';
var buttonStyle1 = 'border: 1px solid #999999; height: 18px; width: 18px; padding: 0px; margin: 2px 2px 0px 0px; font-size: 10px; font-weight: normal; line-height: 12px; background: #cccccc; '; 
addform.innerHTML = '' +
 '<input id="trouchelletwitadd" style="' + fieldStyle1 + '" value="" />' +
 '<input style="' + buttonStyle1 + '" type="button" value="+" title="Add to filter list" />' + 
 '<input style="' + buttonStyle1 + '" type="button" value="-" title="Remove from filter list" />' +
 '<input style="' + buttonStyle1 + '" type="button" value="&#1758;" title="Edit settings" />';
addform.style.border = '1px solid #999999';
addform.style.top = '0px';
addform.style.right = '0px';
addform.style.margin = '10px';
addform.style.padding = '0px';
addform.style.backgroundColor = '#ffffff';
addform.style.width = '126px';
addform.style.textAlign = 'left';
addform.style.fontSize = '7pt';

addform.style.position = 'fixed';

addform.childNodes[1].addEventListener("click", AddTwit, false);
addform.childNodes[2].addEventListener("click", RemoveTwit, false);
addform.childNodes[3].addEventListener("click", ShowSetup, false);
document.body.appendChild(addform);

FilterTwits();
MagentizeLinks();

// Get Setup Values

var noFilter = GM_getValue("nofilter");
var noMagentize = GM_getValue("nomagentize");
var fullRemove = GM_getValue("fullremove");
var linkColor = GM_getValue("linkcolor") || '';

var noFilterValue = '';
var noMagentizeValue = '';
var fullRemoveValue = '';

if (noFilter)    { noFilterValue = 'checked="checked"'; }
if (noMagentize) { noMagentizeValue = 'checked="checked"'; }
if (fullRemove)  { fullRemoveValue = 'checked="checked"'; }


var checkBoxStyle = 'font-size: 8pt; height: 8pt;';
var inputStyle = 'font-size: 10pt; width: 130px; border: 1px solid #999999;';
var spanStyle = 'width: 50px;';

var submitStyle = 'width: 140px; border: 1px solid #999999; background: #cccccc; text-transform: uppercase; font-family: Tahoma, Verdana, sans-serif; font-weight: bold; font-size: 9pt;';
var headStyle = 'font-size: 8pt; padding: 0px 0px 2px 0px; margin: 0px 0px 2px 0px; background: #999999; text-transform: uppercase; color: #ffffff; text-align: center; font-family: Tahoma, Verdana, sans-serif; font-weight: bold; ';

var setup = document.createElement('div');
setup.id = "trouchelletwitsetup";
setup.innerHTML =
 '<div style="'+ headStyle + '">Filtering settings</div>' +
 '<span title="Leave any comments as is.">' +
 '<input id="trouchelletwitsetup1c" type="checkbox" style="' + checkBoxStyle + '" ' + noFilterValue + ' value="1">' +
 'Don`t Filter Comments</span><br>' +
 '<input id="trouchelletwitsetup2c" type="checkbox" style="' + checkBoxStyle + '" ' + noMagentizeValue + ' value="1">' +
 'Don`t highlight links<br>' +
 '<input id="trouchelletwitsetup3c" type="checkbox" style="' + checkBoxStyle + '" ' + fullRemoveValue + ' value="1">' +
 'Completely remove comments<br>' +
 '<div style="'+ headStyle + '">Color settings</div>' +
 '<span style="' + spanStyle + '">Link color:</span>' +
 '<input id="trouchelletwitsetup4c" type="text" style="' + inputStyle + '" value="' + linkColor + '">' +

 '<div style="text-align: center; margin: 4px 0px 4px 0px;">' +
 '<input id="trouchellesetupsubmit" type="submit" style="' + submitStyle + '" value="Save">' +
 '</div>';

setup.style.border = '1px solid #999999';
setup.style.top = '30px';
setup.style.right = '0px';
setup.style.margin = '10px';
setup.style.padding = '0px';
setup.style.backgroundColor = '#ffffff';
setup.style.width = '200px';
setup.style.textAlign = 'left';
setup.style.fontSize = '10pt';
setup.style.fontFamily = 'Tahoma, Verdana, sans-serif';
setup.style.position = 'fixed';
setup.style.display = 'none';

document.body.appendChild(setup);
document.getElementById("trouchellesetupsubmit").addEventListener("click", SaveSetup, false);

// '<input id="trouchelletwitsetup1v" style="' + valueStyle + '" value="' + 

//GM_log(document.getElementById("trouchelletwitadd"), 0);

/* What's new:
    1.3    2006/06/20 Fixed magentizing of links with underscores, added old-style links
    1.2    2006/06/20 Configuration implemented
*/