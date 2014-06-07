// ==UserScript==
// @name          DPC Additions
// @description   Adds some key features that are not included with the site DPC.
// @include       http://www.dpchallenge.com/*
// @include       http://www.dpchallenge.com/forum.php*
// @include       http://www.dpchallenge.com/preferences.php*
// @include       http://www.dpchallenge.com/image.php*
// @include       http://www.dpchallenge.com/challenge_stats.php*
// @include       http://www.dpchallenge.com/challenge_results.php*
// @include		  http://www.dpchallenge.com/challenge_vote_image.php*
// @include       http://userscripts.org/scripts/show/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version       20130701a

// ==/UserScript==

function correct() {

  var has_www = /www\.dpchallenge/.test(window.location);

  var as = document.body.getElementsByTagName("a");
  for (var i in as) {
    if (as[i]) {
      if (as[i].href) {
        var str = "" + as[i].href;
        if (/dpchallenge\.com/.test(str)) {
          if (has_www) {
            str = str.replace(/\/\/dpc/, "//www.dpc");
          } else {
            str = str.replace(/\/\/www\.dpc/, "//dpc");
          }
          if (as[i].href != str) {
            //console.log("Replacing "+as[i].href+" with "+str);
            as[i].href = str;
          }
        }
      }
    }
  }
}

window.addEventListener(
    'load',
    correct,
    true);

//===========================================================================\\
//======| DPC Profile Images in Forum Threads v1.7 (Jan 21, 2010) |==========\\
//=========== | http://onetacoshort.com/dpcmod - Jeff Ward  | ===============\\
//===========================================================================\\

if (typeof unsafeWindow != 'object') {
  window.unsafeWindow = window;
}

if(GM_getValue("DPC_center_profile_images") == null) {
  GM_setValue("DPC_center_profile_images", 1);
}
if(GM_getValue("DPC_center_profile_username") == null) {
  GM_setValue("DPC_center_profile_username", 0);
}
if(GM_getValue("DPC_show_profile_images") == null) {
  GM_setValue("DPC_show_profile_images", 1);
}
if(GM_getValue("DPC_profile_img_size") == null) {
  GM_setValue("DPC_profile_img_size", 100);
}

window.addEventListener(
        'load',
        function() {

  var toremove = new Array();
  var inserted=0;
  var tds = document.body.getElementsByTagName("td");
  for (var i in tds) {
    if (tds[i].getElementsByTagName) {
      var isrc=null;
      var as = tds[i].childNodes;

      for (var j in as) {
        if (as[j].nodeName == "DIV") {
          var s = as[j].innerHTML;
          if (s) {
            if (s.match && !inserted) {
              if (s.match(/Reverse Replies/i)) {
                var ntr = document.createElement('tr');
                var ntd1 = document.createElement('td');
                var ntd2 = document.createElement('td');
                ntd1.setAttribute("align", "right");
                ntd1.setAttribute("valign", "top");
                ntd1.innerHTML = "<input type=\"checkbox\" name=\"FORUM_PROFILE_IMAGES\" id=\"dpc_pi_12345\" onclick=\"dpcmpisetchk(this,'DPC_show_profile_images')\">";
                ntd2.innerHTML = "<div class=\"prefs-subhead\">Show User Profile Images in Forums</div>Shows the profile images of users next to their forum posts.  <a href=\"http://onetacoshort.com/DPCmod/\">DPCmod</a> by <a href=\"http://www.dpchallenge.com/profile.php?USER_ID=65858\">smurfguy</a><br>Image size: <input id=\"dpc_is_42315\" type=\"text\" name=\"FORUM_PROFILE_IMAGE_SIZE\" value=\""+GM_getValue("DPC_profile_img_size")+"\" size=10>%<br>Center the <input type=\"checkbox\" name=\"FORUM_PROFILE_IMAGES\" id=\"dpc_pi_34576\" onclick=\"dpcmpisetchk(this,'DPC_center_profile_images')\"> image and/or the <input type=\"checkbox\" name=\"FORUM_PROFILE_IMAGES\" id=\"dpc_pi_56724\" onclick=\"dpcmpisetchk(this,'DPC_center_profile_username')\"> username</div>";
                tds[i].parentNode.parentNode.insertBefore(ntr, tds[i].parentNode);
                ntr.appendChild(ntd1);
                ntr.appendChild(ntd2);
                inserted=1;
                if (GM_getValue("DPC_show_profile_images")) {
                  document.getElementById("dpc_pi_12345").setAttribute("checked", 1);
                }
                if (GM_getValue("DPC_center_profile_images")) {
                  document.getElementById("dpc_pi_34576").setAttribute("checked", 1);
                }
                if (GM_getValue("DPC_center_profile_username")) {
                  document.getElementById("dpc_pi_56724").setAttribute("checked", 1);
                }
              }
            }
          }
        }

        if (as[j].getAttribute) {
          var s = as[j].getAttribute("href");
          if (s && GM_getValue("DPC_show_profile_images")) {
            if (s.match(/profile.php/) && s.match(/USER_ID=\d+/)) {
              var p = s.replace(/.*USER_ID=/, "");
                          var indx = 0;
                          while (p >= indx) indx += 5000;
                          indx -= 5000;
              isrc="http://images.dpchallenge.com/images_profile/" + indx + "-" + (indx + 4999) + "/120/" + p + ".jpg";
            }
            if (s.match(/camera.php/)) {
              if (isrc) {
                if (!tds[i].pid) {
                  var pid = document.createElement('div');
                  pid.style.paddingTop = "2px";
                  pid.style.width = "100%";
                  if (GM_getValue("DPC_center_profile_images")) {
                    pid.style.textAlign = "left";
                  }
                  if (GM_getValue("DPC_center_profile_username")) {
                    tds[i].style.textAlign = "center";
                  }
                  pid.innerHTML = "<a href=\"profile.php?USER_ID="+p+"\"><img onmouseover=\" this.style.border = '1px solid black' \" onmouseout=\" this.style.border = '1px solid rgba(0,0,0,.4)' \" style=\"padding:2px; margin:10px; border: 1px solid rgba(0,0,0,.4); visibility: hidden\" src=\""+isrc+"\" onload=\"if (this.width>this.height) { this.style.width="+Math.floor(GM_getValue('DPC_profile_img_size')*1.2)+"+'px'; } else { this.style.height="+Math.floor(GM_getValue('DPC_profile_img_size')*1.2)+"+'px'; } this.style.visibility='visible'; \" /></a>";
                  tds[i].insertBefore(pid, as[j].nextSibling);
                  if(pid.nextSibling.nextSibling != null){ /**anand**/
                      if (pid.nextSibling.tagName=='BR') { toremove.push(pid.nextSibling); }
                      if (pid.nextSibling.nextSibling.tagName=='BR') { toremove.push(pid.nextSibling.nextSibling); }
                  }
                  tds[i].pid = pid;
                }
              }
            }
          }
        }
      }

      if (tds[i].className=="textsm") {
        if (tds[i].innerHTML) {
          var s = tds[i].innerHTML;
          var s2 = window.location+" ---- ";
          if (s.match(/\d+\/\d+\/\d+/) && s2.match(/forum\.php/)) {
            tds[i].style.height="15px";
          }
        }
      }
    }
  }


  for each (var e in toremove) {
    if (e && e.parentNode) { e.parentNode.removeChild(e); }
  }

  try {
    addImgResizeList();
  } catch (e) { }

},true);

function chk_box(obj, name) {
  if (obj.checked) {
    GM_setValue(name, 1);
  } else {
    GM_setValue(name, 0);
  }
}

unsafeWindow.dpcmpisetchk = chk_box;


function pi_resize(obj) {
  var v = obj.value;
  if (v<0)   { v=0; }
  if (v>100) { v=100; }
  GM_setValue("DPC_profile_img_size", (v+0));
}

//unsafeWindow.dpcmpisetv = pi_resize;

function addImgResizeList() {
  document.getElementById("dpc_is_42315").addEventListener('change', function() {
    var v = document.getElementById("dpc_is_42315").value;
    if (v<0)   { v=0; }
    if (v>100) { v=100; }
    GM_setValue("DPC_profile_img_size", v);
  }, true);
}

function parseHTML(text){/**anand**/
    var dt = document.implementation.createDocumentType("html", 
      "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
    var doc = document.implementation.createDocument('', '', dt);
    var html = doc.createElement('html');

    html.innerHTML = text;
    doc.appendChild(html);
    return doc;
}



//===================================================================\\
//========= | DPC New Comments/Favorites Highlighter v1.5 | =========\\
//========= | http://onetacoshort.com/dpcmod - Jeff Ward  | =========\\
//===================================================================\\
if (document.URL.search(/dpchallenge.com\/profile.php/i) >= 0){
NewComments ();

	}
	
// Version 1.5

function NewComments(){
	
var USER_ID = 0;
var newComment = 0;
var newFavorite = 0;

if (typeof unsafeWindow != 'object') {
  window.unsafeWindow = window;
}

unsafeWindow.dpm_clearComments = function(n) {
  GM_setValue("DPC_TOTALCOMMENTS", n);
  if (unsafeWindow.challengeList!=null) {
    var d = unsafeWindow.challengeList.dataList;
    for (var i in d) {
      GM_setValue("DPC_NCD_"+d[i][0], d[i][3]);
    }
    var d = unsafeWindow.portfolioList.dataList;
    for (var i in d) {
      GM_setValue("DPC_NCD_"+d[i][0], d[i][3]);
    }
  }
}

window.addEventListener('load', function () {
  if (unsafeWindow.getPortfolioImageURL) {
      var url = unsafeWindow.getPortfolioImageURL(0);
      USER_ID = url.match(/\/\d+\//)[0].replace(/\//g, "");
  }

  // Change in the 'comments received' number
  var as = document.getElementsByTagName('a');
  var totalComments;
  var tcRef;
  for (var i in as) {
    if (as[i].href) {
      if (/comment_browse.*TYPE=recd/i.test(as[i].href) && !/helpful/i.test(as[i].href)) {
        totalComments = as[i].innerHTML+"";
        totalComments = totalComments.replace('/[^\d]/g', '');
        tcRef = as[i];
      }
    }
  }
  if (GM_getValue("DPC_TOTALCOMMENTS")==null || /[^\d]/.test(GM_getValue("DPC_TOTALCOMMENTS"))) {
   GM_setValue("DPC_TOTALCOMMENTS", totalComments);
  }
  else if (GM_getValue("DPC_TOTALCOMMENTS") != totalComments) {
    tcRef.innerHTML = "<span onclick=\"dpm_clearComments("+totalComments+")\"><b style=\"color: #f00\">&raquo;</b> "+totalComments+" <b style=\"color: #f00\">&laquo;</b></span>";
    var s = document.createElement('span');
    s.innerHTML = "(+"+(totalComments-GM_getValue("DPC_TOTALCOMMENTS"))+")&nbsp;";
    tcRef.parentNode.insertBefore(s, tcRef);

    // Clear newcomment list on total mouseover
  }

  if (unsafeWindow.challengeList!=null) {

    var d = unsafeWindow.challengeList.dataList;
    for (var i in d) {
      if (GM_getValue("DPC_NCD_"+d[i][0])==null) {
        GM_setValue("DPC_NCD_"+d[i][0], d[i][3]);
      }
      if (GM_getValue("DPC_NFD_"+d[i][0])==null) {
        GM_setValue("DPC_NFD_"+d[i][0], d[i][5]);
      }
    }

    if (USER_ID) {
      var d = unsafeWindow.portfolioList.dataList;
      for (var i in d) {
        if (GM_getValue("DPC_NCD_"+d[i][0])==null) {
          GM_setValue("DPC_NCD_"+d[i][0], d[i][3]);
        }
        if (GM_getValue("DPC_NFD_"+d[i][0])==null) {
          GM_setValue("DPC_NFD_"+d[i][0], d[i][5]);
        }
      }
    }

    if (unsafeWindow.renderChallengeList) {
      formatDate = unsafeWindow.formatDate;

      newComment = 0;
      newFavorite = 0;
      unsafeWindow.challengeList.renderList = unsafeWindow.newRenderChallengeList;
      unsafeWindow.renderChallengeList = unsafeWindow.newRenderChallengeList;
      unsafeWindow.newRenderChallengeList(unsafeWindow.challengeList);

      var q = document.getElementsByTagName('b');
      for (var i in q) {
        if (q[i].innerHTML == 'Challenge Entries') {
          var message = 'Challenge Entries';
          if (newComment) {
            message += " - <i style=\"color: #ff0000\">New comments!</i>";
          } else {
            message += "<i style=\"color: #aaa\"> - No new comments</i>";
          }
          if (newFavorite) {
            message += " - <i style=\"color: #ff0000\">New favorites!</i>";
          } else {
            message += "<i style=\"color: #aaa\"> - No new favorites</i>";
          }
          q[i].innerHTML = message;
        }
      }

      if (USER_ID) {
        newComment = 0;
        newFavorite = 0;
        unsafeWindow.portfolioList.renderList = unsafeWindow.newRenderPortfolioList;
        unsafeWindow.renderPortfolioList = unsafeWindow.newRenderPortfolioList;
        unsafeWindow.newRenderPortfolioList(unsafeWindow.portfolioList);

      var q = document.getElementsByTagName('a');
      for (var i in q) {
        if (q[i].innerHTML == 'Portfolio Images') {
          var message = 'Portfolio Images';
          if (newComment) {

            message += " - <i style=\"color: #ff0000\">New comments!</i>";
          } else {
            message += "<i style=\"color: #aaa\"> - No new comments</i>";
          }
          if (newFavorite) {
            message += " - <i style=\"color: #ff0000\">New favorites!</i>";
          } else {
            message += "<i style=\"color: #aaa\"> - No new favorites</i>";
          }
          q[i].innerHTML = message;
        }
      }
}
    }
  }
}, true);


unsafeWindow.GM_setC = function (n, v) { GM_setValue("DPC_NCD_"+n, v); }
unsafeWindow.GM_setF = function (n, v) { GM_setValue("DPC_NFD_"+n, v); }

unsafeWindow.newRenderChallengeList = function(obj)
                {
                        var myObj;
                        if (obj==null) { myObj=this; } else { myObj = obj; }

                        myObj.renderPagingLinks();

                        var imageListContent = '';

                        imageListContent += '<table width="95%" cellspacing="0" cellpadding="3" style="border: 1px solid black; margin-left: 10px;">';
                        imageListContent += '<tr class="tableheading">';
                        imageListContent += '<td><img src="images/mag-glass-all.gif" id="mag-all-challengeImageList" align="absmiddle" style="cursor:pointer;" onclick="showHideThumbAll(challengeList);"> Title ' + myObj.getSortLinks(1) + '</td>';
                        imageListContent += '<td width="200">Challenge ' + myObj.getSortLinks(6) + '</td>';
                        imageListContent += '<td align="center" width="75">Date ' + myObj.getSortLinks(2) + '</td>';

                        imageListContent += '<td align="center" width="50">Avg ' + myObj.getSortLinks(9) + '</td>';
                        imageListContent += '<td align="center" width="70">Place ' + myObj.getSortLinks(10) + '</td>';
                        imageListContent += '<td align="center" width="50">% ' + myObj.getSortLinks(12) + '</td>';

                        imageListContent += '<td align="center" width="85">Comments ' + myObj.getSortLinks(3) + '</td>';
                        imageListContent += '<td align="center" width="55">Views ' + myObj.getSortLinks(4) + '</td>';
                        imageListContent += '<td align="center" width="55">Faves ' + myObj.getSortLinks(5) + '</td>';
                        imageListContent += '</tr>';

                        var lowerBound = ((myObj.currentPage-1) * myObj.imagesPerPage);
                        var upperBound = ((myObj.currentPage-1) * myObj.imagesPerPage + myObj.imagesPerPage);

                        for (var i = lowerBound; i < upperBound; i++)
                        {
                                if (i < myObj.dataList.length)
                                {
                                        if (myObj.dataList[i][13] == 1)
                                                var trClass = '_flag1'
                                        else if (myObj.dataList[i][10] == 9999)
                                                var trClass = '_flag2'
                                        else
                                                var trClass = ((i % 2 == 0) ? '1' : '2');

                                        imageListContent += '<tr class="forum-bg' + trClass + '">';
                                        if (myObj.dataList[i][13] == 0 && myObj.dataList[i][10] > 0 && myObj.dataList[i][10] < 4)
                                                var image = 'rib' + myObj.dataList[i][10] + 'center.gif';
                                        else if (myObj.dataList[i][13] == 0 && myObj.dataList[i][10] > 0 && myObj.dataList[i][10] < 11)
                                                var image = 'star.gif';
                                        else
                                                var image = 'mag-glass.gif';

                                        imageListContent += '<td><img src="http://www.dpchallenge.com/images/' + image + '" id="mag' + myObj.dataList[i][0] + '" align="absmiddle" style="cursor:pointer;" onclick="showHideThumb(challengeList, challengeList.dataList[' + i + '], ' + myObj.dataList[i][0] + ')"> <a target="_top" onclick="GM_setC(\''+myObj.dataList[i][0]+'\', '+myObj.dataList[i][3]+');" href="image.php?IMAGE_ID=' + myObj.dataList[i][0] + '">' + myObj.dataList[i][1] + '<br><img style="margin: 5px; display: none; border: 1px solid black;" id="img' + myObj.dataList[i][0] + '"></a></td>';
                                        imageListContent += '<td valign="top"><a target="_top" href="challenge_results.php?CHALLENGE_ID=' + myObj.dataList[i][7] + '">' + myObj.dataList[i][6] + '</a></td>';
                                        imageListContent += '<td align="center" valign="top">' + ((myObj.dataList[i][2] != '') ? formatDate(myObj.dataList[i][2]) : 'N/A') + '</td>';

                                        imageListContent += '<td align="center" valign="top">' + ((myObj.dataList[i][13] == 1) ? '~' : myObj.dataList[i][9]) + '</td>';
                                        imageListContent += '<td align="center" valign="top">' + ((myObj.dataList[i][13] == 1) ? '~' : myObj.dataList[i][10] + ' / ' + myObj.dataList[i][11])  + '</td>';
                                        imageListContent += '<td align="center" valign="top">' + ((myObj.dataList[i][13] == 1) ? '~' : myObj.dataList[i][12] + '%') + '</td>';

                                        if (myObj.dataList[i][3] != GM_getValue("DPC_NCD_"+myObj.dataList[i][0])) {
                                          imageListContent += '<td align="center" valign="top" style="color: #00f; font-weight: bold"><span style=\"color: #f00; font-weight: bold\">&raquo;</span><a target="_top" onclick="GM_setC(\''+myObj.dataList[i][0]+'\', '+myObj.dataList[i][3]+');" href="image.php?IMAGE_ID=' + myObj.dataList[i][0] + '">' + myObj.dataList[i][3] + '</a><span style=\"color: #f00; font-weight: bold\">&laquo;</span></td>';
                                          newComment = 1;
                                        } else {
                                          imageListContent += '<td align="center" valign="top">' + myObj.dataList[i][3] + '</td>';
                                        }
                                        imageListContent += '<td align="center" valign="top">' + myObj.dataList[i][4] + '</td>';

                                        if (myObj.dataList[i][5] != GM_getValue("DPC_NFD_"+myObj.dataList[i][0])) {
                                          imageListContent += '<td align="center" valign="top" style="color: #00f; font-weight: bold"><span style=\"color: #f00; font-weight: bold\">&raquo;</span><a target="_top" onclick="GM_setF(\''+myObj.dataList[i][0]+'\', '+myObj.dataList[i][5]+');" href="favorites.php?IMAGE_ID=' + myObj.dataList[i][0] + '">' + myObj.dataList[i][5] + '</a><span style=\"color: #f00; font-weight: bold\">&laquo;</span></td>';
                                          newFavorite = 1;
                                        } else {
                                            imageListContent += '<td align="center" valign="top">' + ((myObj.dataList[i][5]) ? '<a target="_top" href="favorites.php?IMAGE_ID=' + myObj.dataList[i][0] + '">' + myObj.dataList[i][5] + '</a>' : myObj.dataList[i][5]) + '</td>';
                                        }

                                        imageListContent += '</tr>';
                                }
                        }

                        if (myObj.dataList.length < upperBound)
                        {
                                trClass = trClass.replace('_flag1', '').replace('_flag2', '');

                                //alert('render ' + (upperBound-myObj.dataList.length) + ' more');
                                for (var i = 0; i < (upperBound - myObj.dataList.length); i++)
                                {
                                        imageListContent += '<tr class="forum-bg' + trClass + '"><td colspan="9" height="22"><br></td></tr>';
                                }
                        }

                        document.getElementById(myObj.listId).innerHTML = imageListContent;

                }


unsafeWindow.newRenderPortfolioList = function(obj)
                {
                        var myObj;
                        if (obj==null) { myObj=this; } else { myObj = obj; }
                        var d = unsafeWindow.d;

                        var imageListName = 'portfolioList';

                        myObj.renderPagingLinks();

                        var imageListContent = '';

                        imageListContent += '<table width="95%" cellspacing="0" cellpadding="3" style="border: 1px solid black; margin-left: 10px;">';
                        imageListContent += '<tr class="tableheading">';
                        imageListContent += '<td><img src="images/mag-glass-all.gif" id="mag-all-portfolioImageList" align="absmiddle" style="cursor:pointer;" onclick="showHideThumbAll(portfolioList);"> Title ' + myObj.getSortLinks(1) + '</td>';
                        imageListContent += '<td width="160">Collection ' + myObj.getSortLinks(6) + '</td>';
                        imageListContent += '<td align="center" width="75">Taken ' + myObj.getSortLinks(2) + '</td>';
                        imageListContent += '<td align="center" width="75">Uploaded ' + myObj.getSortLinks(9) + '</td>';
                        imageListContent += '<td align="center" width="85">Comments ' + myObj.getSortLinks(3) + '</td>';
                        imageListContent += '<td align="center" width="65">Viewed ' + myObj.getSortLinks(4) + '</td>';
                        imageListContent += '<td align="center" width="75">Favorites ' + myObj.getSortLinks(5) + '</td>';
                        imageListContent += '</tr>';

                        var lowerBound = ((myObj.currentPage-1) * myObj.imagesPerPage);
                        var upperBound = ((myObj.currentPage-1) * myObj.imagesPerPage + myObj.imagesPerPage);

                        for (var i = lowerBound; i < upperBound; i++)
                        {
                                if (i < d.length)
                                {
                                        imageListContent += '<tr class="forum-bg' + ((i % 2 == 0) ? '1' : '2') + '">';
                                        imageListContent += '<td><img src="images/mag-glass.gif" id="mag' + d[i][0] + '" align="absmiddle" style="cursor:pointer;" onclick="showHideThumb(portfolioList, portfolioList.dataList[' + i + '], ' + myObj.dataList[i][0] + ')"> <a target="_top" onclick="GM_setC(\''+d[i][0]+'\', '+d[i][3]+');" href="image.php?IMAGE_ID=' + d[i][0] + '">' + d[i][1] + '<br><img style="margin: 5px; display: none; border: 1px solid black;" id="img' + d[i][0] + '"></a></td>';
                                        imageListContent += '<td valign="top"><a target="_top" href="portfolio.php?USER_ID='+USER_ID+'&collection_id=' + d[i][7] + '">' + d[i][6] + '</a></td>';
                                        imageListContent += '<td align="center" valign="top">' + ((d[i][2] != '') ? formatDate(d[i][2]) : 'N/A') + '</td>';
                                        imageListContent += '<td align="center" valign="top">' + formatDate(d[i][9]) + '</td>';


                                        if (d[i][3] != GM_getValue("DPC_NCD_"+d[i][0])) {
                                          imageListContent += '<td align="center" valign="top"><span style=\"color: #f00; font-weight: bold\">&raquo;</span><a target="_top" onclick="GM_setC(\''+d[i][0]+'\', '+d[i][3]+');" href="image.php?IMAGE_ID=' + d[i][0] + '">' + d[i][3] + '</a><span style=\"color: #f00; font-weight: bold\">&laquo;</span></td>';
                                          newComment = 1;
                                        } else {
                                          imageListContent += '<td align="center" valign="top">' + d[i][3] + '</td>';
                                        }

                                        imageListContent += '<td align="center" valign="top">' + d[i][4] + '</td>';
                                        if (myObj.dataList[i][5] != GM_getValue("DPC_NFD_"+myObj.dataList[i][0])) {
                                          imageListContent += '<td align="center" valign="top" style="color: #00f; font-weight: bold"><span style=\"color: #f00; font-weight: bold\">&raquo;</span><a target="_top" onclick="GM_setF(\''+myObj.dataList[i][0]+'\', '+myObj.dataList[i][5]+');" href="favorites.php?IMAGE_ID=' + myObj.dataList[i][0] + '">' + myObj.dataList[i][5] + '</a><span style=\"color: #f00; font-weight: bold\">&laquo;</span></td>';
                                          newFavorite = 1;
                                        } else {
                                            imageListContent += '<td align="center" valign="top">' + ((myObj.dataList[i][5]) ? '<a target="_top" href="favorites.php?IMAGE_ID=' + myObj.dataList[i][0] + '">' + myObj.dataList[i][5] + '</a>' : myObj.dataList[i][5]) + '</td>';
                                        }
                                }
                        }

                        if (myObj.dataList.length < upperBound)
                        {
                                //alert('render ' + (upperBound-myObj.dataList.length) + ' more');
                                for (var i = 0; i < (upperBound - myObj.dataList.length); i++)
                                {
                                        imageListContent += '<tr class="forum-bg' + (((myObj.dataList.length - 1) % 2 == 0) ? '1' : '2') + '"><td colspan="9" height="22"><br></td></tr>';
                                }
                        }

                        document.getElementById(myObj.listId).innerHTML = imageListContent;
                }
				
				
} ;
//===================================================================\\
//======= | DPC Custom Quicklinks in the 'My Home' Menu v1.2 | ======\\
//========= | http://onetacoshort.com/dpcmod - Jeff Ward  | =========\\
//===================================================================\\

// Version 1.1 - Fixed "not logged in" problem of menu disappearing
// Version 1.2 - Should work for SC

if (typeof unsafeWindow != 'object') {
  window.unsafeWindow = window;
}

function quickLinks() {

  if (!GM_getValue("DPCMOD_Quicklink_init") &&
      !GM_getValue("DPCMOD_Quicklink_key_0") &&
      !GM_getValue("DPCMOD_Quicklink_key_1") &&
      !GM_getValue("DPCMOD_Quicklink_key_2")) {
    GM_setValue("DPCMOD_Quicklink_init", 1);
    GM_setValue("DPCMOD_Quicklink_key_0", "Update");
    GM_setValue("DPCMOD_Quicklink_val_0", "/challenge_stats.php?action=update");
    GM_setValue("DPCMOD_Quicklink_key_1", "Watched Threads");
    GM_setValue("DPCMOD_Quicklink_val_1", "/forum.php?action=show_watched");
  }



  var mod = function() {
    if (typeof unsafeWindow.Menu1_1 == 'undefined') { return; }

    unsafeWindow.CloseMenu();
    var q = document.getElementsByTagName('div');
    for (var i in q) { if (q[i]) { if (q[i].style) { if (q[i].SetUp) { q[i].style.display = "none"; } } }}
    unsafeWindow.FrstCntnr.parentNode.removeChild(unsafeWindow.FrstCntnr);
    unsafeWindow.Ldd = 0;

    var lnks = new Object;
    var max = 1;
    for (i=0; i<100; i++) {
      var k = GM_getValue("DPCMOD_Quicklink_key_"+i);
      var v = GM_getValue("DPCMOD_Quicklink_val_"+i);
      if (k && v) {
        lnks[max] = new Object;
        lnks[max].k = k;
        lnks[max].v = v;
        lnks[max].i = i;
        //console.log(i+": "+lnks[max].k);
        max++;
      }
    }

    var tmp_mn = 1;
    if (/home/i.test(unsafeWindow.Menu1[0])) {
      unsafeWindow.Menu1=new Array("My Home","/index.php","",6+max,15,66,"","","","","","",-1,-1,-1,"","");
      unsafeWindow.Menu1_6=new Array("<hr>","","",0,15,160,"","","","","","",-1,-1,-1,"","");
      tmp_mn = 1;
    } else {
      unsafeWindow.Menu2=new Array("My Home","/index.php","",6+max,15,66,"","","","","","",-1,-1,-1,"","");
      unsafeWindow.Menu2_6=new Array("<hr>","","",0,15,160,"","","","","","",-1,-1,-1,"","");
      tmp_mn = 2;
    }

    //console.log(max);
    for (i=1; i<max; i++) {
      eval('unsafeWindow.Menu'+tmp_mn+'_'+(i+6)+"=new Array(\"<b onmouseover='window.dm_delobj = this; window.dm_delme=function() { dmql_rem("+(lnks[i].i)+") };' onmouseout='window.dm_delme=null;' style='margin-left: 2px'>"+lnks[i].k+'</b>","'+lnks[i].v+'","",0,15,160,"","","","","","",-1,-1,-1,"","");');
    }

    var q = "unsafeWindow.Menu"+tmp_mn+"_"+(max+6)+"=new Array(\"<i onclick='dm_almo_125()' id='dpcmod_add_link' style='color: #590; cursor: pointer'>Add a link</i>\",\"\",\"\",0,15,160,\"\",\"\",\"\",\"\",\"\",\"\",-1,-1,-1,\"\",\"\");";
    eval(q);

    unsafeWindow.Go();

  }
  setTimeout(function() { mod(); }, 10);

}

var load = function() {
  if (unsafeWindow.Ldd && unsafeWindow.FrstCntnr) {
    setTimeout(function() { quickLinks(); }, 10);
  } else {
    setTimeout(function() { load(); }, 200);
  }
}

load();

//window.addEventListener(
//    'load',
//    quickLinks,
//    true);

window.addEventListener(
    'keyup',
    function(e) {
      //console.log("keycode: "+e.keyCode);
      if (e.keyCode==46) {
        if (typeof unsafeWindow.dm_delme == 'function') {
          //console.log("Calling delme");
          unsafeWindow.dm_delme();
        }
      }
    },
    true);

unsafeWindow.dm_almo_125 = function() {
  var name = prompt("Enter the name of this link:");
  if (name) {
    var link = prompt("Enter the web address of this link:\n - /challenge_stats.php?action=update\n - http://www.dpchallenge.com/forum.php?action=show_watched\n - http://www.google.com/");
    if (link) {
      for (i=0; i<100; i++) {
        var k = GM_getValue("DPCMOD_Quicklink_key_"+i);
        if (!k) { j = i; i = 101; }
      }
      GM_setValue("DPCMOD_Quicklink_key_"+j, name);
      GM_setValue("DPCMOD_Quicklink_val_"+j, link);
      if (!GM_getValue("DPCMOD_Quicklink_set_msg")) {
        GM_setValue("DPCMOD_Quicklink_set_msg", 1);
        alert("Ok - you'll need to refresh\nfor it to show in the menu.\nAlso, to delete links, hover\nthe mouse over the link\ntext and press the delete\nkey on the keyboard.\n\nThis message will not show again.");
      }
      //setTimeout(function() { quickLinks(); }, 100);
    }
  }
}

//unsafeWindow.gv = GM_getValue;
//unsafeWindow.sv = GM_setValue;

unsafeWindow.dmql_rem = function(i) {
  //console.log("rem with i="+i);
  while (GM_getValue("DPCMOD_Quicklink_key_"+i)) {
    eval('GM_setValue("DPCMOD_Quicklink_key_'+i+'", 0);');
    GM_setValue("DPCMOD_Quicklink_val_"+i, 0);
  }
  for (j=i; j>0; j--) {
    var k = GM_getValue("DPCMOD_Quicklink_key_"+(j-1));
    var v = GM_getValue("DPCMOD_Quicklink_val_"+(j-1));
    if (k) {
      GM_setValue("DPCMOD_Quicklink_key_"+j, k);
      GM_setValue("DPCMOD_Quicklink_val_"+j, v);
      GM_setValue("DPCMOD_Quicklink_key_"+(j-1), 0);
      GM_setValue("DPCMOD_Quicklink_val_"+(j-1), 0);
    }
  }
  if (unsafeWindow.dm_delobj) {
    unsafeWindow.dm_delobj.style.display = "none";
  }
  //setTimeout(function() { quickLinks(); }, 100);
}



//===================================================================\\
//============ | DPC Image Thread Search Link v1.0 | ================\\
//========= | http://onetacoshort.com/dpcmod - Jeff Ward  | =========\\
//===================================================================\\


window.addEventListener(
        'load',
        function() {


  var a = document.getElementsByTagName("div");

  for (i=0; i<a.length; i++) {
    if (a[i].className == "imagetitle") {
      var img_id = a[i].parentNode.innerHTML;
      img_id = img_id.match(/(\d+)\.jpg/)[1];
      var srch = 'http://www.google.com/search?hl=en&q="'+img_id+'.jpg"+forum.php+site%3Awww.dpchallenge.com&btnG=Search';

      var d = document.createElement("a");
      d.href = srch;
      d.target = "new";
      d.innerHTML = "<br>Google for threads containing this image";
      a[i].parentNode.appendChild(d);
    }
  }


},true);

//===================================================================\\
//=============== | DPC Voting Enhancements v1.0 | ==================\\
//========= | http://onetacoshort.com/dpcmod - Jeff Ward  | =========\\
//===================================================================\\

if (document.URL.search(/dpchallenge.com\/challenge_vote_image.php/i) >= 0){
ScrollWindow ();

	}
	
// Version 1.5

function ScrollWindow(){
	
	


var win = unsafeWindow ? unsafeWindow : window;

window.addEventListener(
        'load',
        function() {
  var frm = win.document.frmVote;
  var url = "http://images.dpchallenge.com/images_challenge/"+frm.CHALLENGE_ID.value+"/Copyrighted_Image_Reuse_Prohibited_"+frm.NEXT_ID.value+".jpg";
  var i = document.createElement("img");
  i.src=url;
  i.style.display="none";
  document.body.appendChild(i);
},true);

scrollTo(null, 120);

}

//=============================================\\
//==========| Image Hover v 2.0.0 |============\\
//==========| - Last Update 20130701 - |=======\\
//=============================================\\

'use strict';

var d = document, wn = window, $ = function(id) { return d.getElementById(id); }, cur = {}, hosts;

var cfg = {
	delay: GM_getValue('delay', 100),
	thumbsonly: GM_getValue('thumbsonly', true),
	key: GM_getValue('key', false),
	zoom: GM_getValue('zoom', 'context'),
	halfzoom: GM_getValue('halfzoom', true),
	img: GM_getValue('img', false),
	css: GM_getValue('css', ''),
	hosts: GM_getValue('hosts', '')
};

function loadHosts() {
	var hosts = [
        {r:/dpchallenge\.com\/image\.php/, q:'#img_container img+img'},
        {r:/dpchallenge\.com\/challenge_vote_image\.php/, q:'#img_container img+img'},
        {r:/dpchallenge\.com\/photo_browse\.php/, q:'#img_container img+img'},
	{r:/\/\/[^\?:]+\.(jpe?g|gif|png|svg)($|\?)/i}
	];
	if(cfg.hosts) {
		var lines = cfg.hosts.split(/,?[\r\n\t]+/);
		for(var i = lines.length, s; i-- && (s = lines[i]);) {
			if(!s) continue;
			try {
				var h = JSON.parse(s);
				if(!h || !h.r) throw 'property r missing';
				h.r = new RegExp(h.r, 'i');
				if(h.s && h.s.indexOf('return ') > -1) h.s = new Function('m', 'node', h.s);
				if(h.q && h.q.indexOf('return ') > -1) h.q = new Function('text', h.q);
				hosts.splice(0, 0, h);
			} catch(ex) {
				GM_log('Invalid host: ' + s + '\nReason: ' + ex);
			}
		}
	}
	return hosts;
}

function onMouseOver(e) {
	if(e.shiftKey || cur.zoom || !activate(e.target)) return;
	cur.cx = e.clientX;
	cur.cy = e.clientY;
	if(cfg.key)
		if(e.ctrlKey)
			startPopup();
		else
			setZoomCursor(cur.node);
	else
		cur.timeout = wn.setTimeout(startPopup, cfg.delay);
}

function onMouseMove(e) {
	if(e.shiftKey) return;
	cur.cx = e.clientX;
	cur.cy = e.clientY;
	var r = cur.rect;
	if(!cur.zoomed && (cur.cx > r.right + 1 || cur.cx < r.left - 1 || cur.cy > r.bottom + 1 || cur.cy < r.top - 1)) return deactivate();
	placeStatus();
	if(cur.zoom) placePopup();
}

function onMouseDown(e) {
	if(e.which != 3 && !e.shiftKey) deactivate(true);
}

function onMouseOut(e) {
	if(!e.relatedTarget) deactivate();
}

function onMouseScroll(e) {
	var dir = e.detail || -e.wheelDelta;
	if(cur.zoom) {
		e.preventDefault();
		cur.scale *= dir > 0 ? 0.5 : 2;
		if(cur.scale < cur.minScale) {
			if(cur.gItems) {
				cur.zoom = false;
			} else {
				return deactivate(true);
			}
		}
		placePopup();
		setTitle();
	} else if(cur.gItems && getPopup()) {
		e.preventDefault();
		nextGalleryItem(dir);
	} else if(cfg.zoom == 'wheel' && dir < 0 && getPopup()) {
		e.preventDefault();
		toggleZoom();
	} else {
		deactivate();
	}
}

function onKeyDown(e) {
	if(e.keyCode == 17 && cfg.key && !getPopup()) {
		cur.node.style.cursor = '';
		startPopup();
	}
}

function onKeyUp(e) {
	switch(e.keyCode) {
		case 16:
			toggleZoom();
			break;
		case 17:
			if(!cfg.key) deactivate(true);
			break;
		case 27:
			if(e.shiftKey) {
				off(d.body, 'mouseover', onMouseOver);
				deactivate();
			} else {
				deactivate(true);
			}
			break;
		case 74:
			e.preventDefault();
			nextGalleryItem(1);
			break;
		case 75:
			e.preventDefault();
			nextGalleryItem(-1);
			break;
		case 84:
			GM_openInTab(getPopup().src);
			break;
		default:
			deactivate(true);
	}
}

function onContext(e) {
	if(e.shiftKey) return;
	if(cfg.zoom == 'context' && getPopup() && !getStatus() && toggleZoom())
		e.preventDefault();
	else
		deactivate();
}

function startPopup() {
	if(cur.g)
		startGalleryPopup();
	else
		startSinglePopup(cur.url);
}

function startSinglePopup(url) {
	if(cur.g) setPopup(false);
	setStatus(cur.xhr ? 'xhr' : 'loading');
	if(cur.q) {
		downloadPage(url, cur.post, function(text) {
			var iurl = parseHtml(text, cur.q, url);
			if(!iurl) throw 'Image URL not found in node: ' + cur.q;
			if(cur.follow) {
				var info = findInfo([iurl], cur.node);
				if(info) {
					for(var prop in info) {
						cur[prop] = info[prop];
					}
					return startSinglePopup(cur.url);
				} else {
					throw 'Unable to follow unsupported URL: ' + iurl;
				}
			}
			if(hasAcceptableSize(cur.node, iurl)) return setStatus(false);
			if(cur.xhr) downloadImage(iurl, url); else setPopup(iurl);
		});
	} else {
		if(cur.xhr) {
			downloadImage(url, cur.url);
		} else {
			setPopup(url);
		}
	}
}

function startGalleryPopup() {
	setStatus('loading');
	downloadPage(cur.url, cur.post, function(text) {
		cur.gItems = parseGallery(text, cur.g.entry, cur.g.image, cur.g.caption, cur.g.title);
		cur.gIndex = -1;
		if(cur.gItems) {
			nextGalleryItem(1);
		} else {
			GM_log('Empty gallery: ' + cur.url);
			deactivate();
		}
	});
}

function nextGalleryItem(dir) {
	if(dir > 0 && ++cur.gIndex >= cur.gItems.length) {
		cur.gIndex = 0;
	} else if(dir < 0 && --cur.gIndex < 0) {
		cur.gIndex = cur.gItems.length - 1;
	}
	var item = cur.gItems[cur.gIndex];
	startSinglePopup(item.url);
}

function activate(node) {
	if(node.id == 'mpiv-popup') return false;
	var info = parseNode(node);
	if(!info.url || info.url == cur.url || hasAcceptableSize(node, info.url)) return false;
	deactivate();
	cur = info;
	var largest = node, nodes = node.querySelectorAll('*');
	for(var i = nodes.length, n; i-- && (n = nodes[i]);) {
		if(!largest || n.clientHeight > largest.clientHeight)
			largest = n;
	}
	var quirks = d.compatMode == 'BackCompat';
	cur.node = node;
	cur.rect = largest.getBoundingClientRect();
	cur.cw = quirks ? d.body.clientWidth  : d.documentElement.clientWidth;
	cur.ch = quirks ? d.body.clientHeight : d.documentElement.clientHeight;
	on(d, 'mousemove', onMouseMove);
	on(d, 'mousedown', onMouseDown);
	on(d, 'contextmenu', onContext);
	on(d, 'keydown', onKeyDown);
	on(d, 'keyup', onKeyUp);
	on(d, 'DOMMouseScroll', onMouseScroll);
	on(d, 'mousewheel', onMouseScroll);
	on(d, 'mouseout', onMouseOut);
	return true;
}

function deactivate(wait) {
	wn.clearTimeout(cur.timeout);
	if(cur.req && typeof cur.req.abort == 'function') cur.req.abort();
	if(cur.node) cur.node.style.cursor = '';
	setTitle(true);
	cur = {};
	off(d, 'mousemove', onMouseMove);
	off(d, 'mousedown', onMouseDown);
	off(d, 'contextmenu', onContext);
	off(d, 'keydown', onKeyDown);
	off(d, 'keyup', onKeyUp);
	off(d, 'DOMMouseScroll', onMouseScroll);
	off(d, 'mousewheel', onMouseScroll);
	off(d, 'mouseout', onMouseOut);
	setStatus(false);
	setPopup(false);
	setCaption(false);
	if(wait) {
		off(d.body, 'mouseover', onMouseOver);
		wn.setTimeout(function() { on(d.body, 'mouseover', onMouseOver); }, 200);
	}
}

function parseNode(node) {
	var info;
	if(node.tagName == 'IMG' && node.src.substr(0, 5) != 'data:') {
		var src = rel2abs(node.src, location.href);
		info = findInfo([src], node);
		if(info && info.url != src) return info;
	}
	if(node.parentNode.tagName == 'A') node = node.parentNode; else if(node.parentNode.parentNode.tagName == 'A') node = node.parentNode.parentNode;
	if(node.tagName == 'A') {
		if(cfg.thumbsonly && !node.querySelector('img, i') && !hasBg(node) && !hasBg(node.parentNode) && !hasBg(node.firstElementChild)) return false;
		var url  = decodeURIComponent(node.getAttribute('data-expanded-url') || node.href);
		var urls = url.indexOf('//t.co/') > -1 ? ['http://' + node.textContent] : parseUrls(url);
		info = findInfo(urls, node);
		if(info) return info;
	}
	if(cfg.img && (node.tagName == 'IMG' || node.tagName == 'A' && (node = node.querySelector('img')))) {
		return {url: node.src};
	}
	return false;
}

function findInfo(urls, node) {
	var html = node.outerHTML;
	if(!hosts) hosts = loadHosts();
	for(var i = 0, len = hosts.length, h, m; i < len && (h = hosts[i]); i++) {
		if(!(m = h.html ? h.r.exec(html) : findMatch(urls, h.r))) continue;
		var info = {
			url: h.hasOwnProperty('s') ? (typeof h.s == 'function' ? h.s(m, node) : replace(h.s, m)) : m.input,
			q: h.q,
			g: h.g,
			xhr: h.xhr,
			post: h.post,
			follow: h.follow
		};
		if(info.url === false) continue;
		return info;
	};
	return false;
}

function downloadPage(url, post, cb) {
	var opts = {
		method: 'GET',
		url: url,
		ignoreCache: true,
		onload: function(req) {
			try {
				delete cur.req;
				cb(req.responseText);
			} catch(ex) {
				showError(ex);
			}
		},
		onerror: showError
	};
	if(post) {
		opts.method = 'POST';
		opts.data = post;
		opts.headers = {'Content-Type':'application/x-www-form-urlencoded','Referer':url};
	}
	cur.req = GM_xmlhttpRequest(opts);
}

function downloadImage(url, referer) {
	cur.req = GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		overrideMimeType: 'text/plain; charset=x-user-defined',
		headers: {'Accept':'image/png,image/*;q=0.8,*/*;q=0.5','Referer':referer},
		onprogress: function(e) {
			if(e.lengthComputable) {
				var per = parseInt(e.loaded / e.total * 100, 10) + '%';
				getStatus().style.background = 'linear-gradient(to right, #bdd6ee ' + per + ', white ' + per + ') padding-box';
			}
		},
		onload: function(req) {
			try {
				delete cur.req;
				var txt = req.responseText, ui8 = new Uint8Array(txt.length);
				for(var i = txt.length; i--;) {
					ui8[i] = txt.charCodeAt(i);
				}
				var b = new Blob([ui8.buffer]);
				var u = wn.URL || wn.webkitURL;
				if(u) {
					setPopup(u.createObjectURL(b));
				} else {
					var fr = new FileReader();
					fr.onload = function() { setPopup(fr.result); };
					fr.onerror = showError;
					fr.readAsDataURL(b);
				}
			} catch(ex) {
				showError(ex);
			}
		},
		onerror: showError
	});
}

function parseHtml(html, q, url) {
	if(typeof q == 'function') return q(html);
	var node, path, doc = d.implementation.createHTMLDocument('MPIV');
	doc.documentElement.innerHTML = html;
	if(typeof q == 'string') {
		node = doc.querySelector(q);
	} else {
		for(var i = 0, len = q.length; i < len; i++) {
			node = doc.querySelector(q[i]);
			if(node) break;
		}
	}
	if(!node) throw 'Node not found: ' + q + '\nPage: ' + url;
	switch(node.tagName) {
		case 'IMG':
			path = node.getAttribute('src').trim();
			break;
		case 'A':
			path = node.getAttribute('href').trim();
			break;
		default:
			path = node.outerHTML.match(/https?:\/\/[.\/a-z0-9_+%\-]+\.(jpe?g|gif|png|svg)/i)[0];
	}
	return rel2abs(path, html.match(/<base[^>]+href=["']([^>]+)["']/i) ? RegExp.$1 : url);
}

function parseGallery(html, qE, qI, qC, qT) {
	var doc = d.implementation.createHTMLDocument('MPIV');
	doc.documentElement.innerHTML = html;
	var nodes = doc.querySelectorAll(qE);
	var items = [];
	for(var i = 0, node, len = nodes.length; i < len && (node = nodes[i]); i++) {
		var item = {url:node.querySelector(qI).src};
		try {
			item.desc = node.querySelector(qC).textContent;
		} catch(ex) {}
		items.push(item);
	}
	var title = doc.querySelector(qT);
	if(title) items.title = title.getAttribute('value') || title.textContent;
	return items;
}

function checkProgress(start) {
	if(start === true) {
		wn.clearInterval(checkProgress.interval);
		checkProgress.interval = wn.setInterval(checkProgress, 150);
		return;
	}
	var p = getPopup();
	if(!p) return wn.clearInterval(checkProgress.interval);
	if(p.naturalHeight) {
		setStatus(false);
		wn.clearInterval(checkProgress.interval);
		p.style.display = '';
		placePopup();
		setTitle();
		cur.large = p.naturalWidth > p.clientWidth + cur.mbw || p.naturalHeight > p.clientHeight + cur.mbh;
		if(cur.large) {
			setZoomCursor(p);
			setZoomCursor(cur.node);
		}
		if(cur.gItems) {
			var item = cur.gItems[cur.gIndex];
			var c = '[' + (cur.gIndex + 1) + '/' + cur.gItems.length + '] ';
			if(cur.gIndex == 0 && cur.gItems.title) c += cur.gItems.title + (item.desc ? ' - ' : '');
			if(item.desc) c += item.desc + ' ';
			setCaption(c.trim());
		}
	}
}

function setZoomCursor(node) {
	node.style.cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABD5JREFUeNqclFtsVFUUhr99LkPn0jKd0kIJVCgRWlvAxmCUVohBTSQ8QIxGYySoPOiDgZj4YqI+GR950AQeSNBAJDyYoDEkYqS0BhWo1laowlCYIqWdmdKZ6Uzndm6umSFRLi+yk5U5s8/a//nXv/61FXwIFODFJ2FZB2QznaRKz1FUz+OqHpQ3iekep9E3QLBhACcJx05DypFzBncv2cnJzzwoW8CcfcTtvQ890sTTHSFagjq5stdyfqLQc354VtLK39LivcFcTlAlH/MeQMXD+2v7y1ec9LcvffbAy63s3LSo+uq/a2BsjneOTvLHSHyayavryBaT92OoeHdYmKl9Ptvd+/vHa+hsDVRf3MzKdyRfedAoW3p112P9+2OMTpQu0mp043r3Adx9vp2p4viRjzp5dUMTsbQrYIqAT74vaD5D4brQsACW1iviOYvWt4bxNG8nPv3w3YAaqfkdy9Y3CliYXMnlzxmPSFBh2S7HziWZnbeJhBRTOY9UwWVxyOSlLYvhVuGVmvb5O0Jj3tu2rStEpaiRaYu85XIjVeZKokAiaxFNFJm4ZVN2XK6lnSqLHV1Boa8/IWeCFU41QWphYJiPR0ypCYt0yRNGFieGU1KmRzigM3gpwy/jWbY+GqG+rqZk2Cfa+YxGlLlKRBu90zaOezXv0A0OqbzFXFmxYVWItJQ6Npmnc2mAtqYFsu9WWVZkr1SB7Vp49tS9Gta535y6VpTHEmsaLG5kHQJ+g4UhQ2zn0CAsF4ofY1Jug2ZVK+mPil62cwIq1ilRC8HwXAFs9H89OpThx4vzbGjXWBko0X+txETGobMtRLLoVv8HBWzTQw5z6TyfnhScgHkJ5ReQutshfVBFUXHLnkkRZHP/5cLKt/vq6F0lHc6VmSl4uJqGrlzWhm3e7PbQ5dxPk34uJh1uTmTXUmdMoWsjtcaIr7SYCNJ3VJTUwvhbLnf3NDd/tTvM6pUyOo7HvFglGNCqk5SJ2wzeCjKaNlndpHHwuxuc7J8W15u7xLBf4FYAo8Lw+gqIXSnSs+TLRKGp97NTqWVjcY9M1uam2OXXv8scGMiz+2CSs3GHZ7rqGZ+12NgRxjYV0b/mtmMKNc0YQc1WBvaDf2+b5Z0wk3mdlLUV3XwKn1qM7RXF5d/jV1flPtjT29vMC31LuJQss7p5ASfOxvlhMAH1wdcwx44YtUvgdrgSpnOIiHsITZQ2jHZsawbXTqAqqf6hM2cSh326xubHFnHuep6N65rIyAQNDc8dxqiPiVM3U72KupbLwDZDudJ+Ma6m2+h6Uqwg8yW+U5KqjFF8Wiw2nt3uirQdbQEuTJdYuyJE1pJGTvv6NP7PqhSiSQOCxq7BnxOcHpqhtUHHL15taRQLuFabwYOsCqhcEr9dSH+elQlqjfg4Ny5md539DwZYZSugpopFo5lPopbXTMQ4Tkl/7x8BBgA15NXR6NAotQAAAABJRU5ErkJggg=="), all-scroll';
}

function placePopup() {
	var p = getPopup();
	if(!p) return;
	if(typeof cur.pw == 'undefined') {
		var s = wn.getComputedStyle(p);
		cur.pw = styleSum(s, ['padding-left', 'padding-right']);
		cur.ph = styleSum(s, ['padding-top', 'padding-bottom']);
		cur.mbw = styleSum(s, ['margin-left', 'margin-right', 'border-left-width', 'border-right-width']);
		cur.mbh = styleSum(s, ['margin-top', 'margin-bottom', 'border-top-width', 'border-bottom-width']);
	}
	var cw = cur.cw, ch = cur.ch;
	if(cur.zoom || cur.gItems) {
		if(cur.gItems && !cur.zoom) cur.scale = Math.min(1, scale(p, false));
		var cx = cur.cx, cy = cur.cy, nw = cur.scale * p.naturalWidth, nh = cur.scale * p.naturalHeight;
		p.style.maxWidth  = 'none';
		p.style.maxHeight = 'none';
		p.style.width  = nw + 'px';
		p.style.height = nh + 'px';
		p.style.left = Math.round((cw > nw ? cw/2 - nw/2 : -1 * Math.min(1, Math.max(0, 5/3*(cx/cw-0.2))) * (nw - cw)) - (cur.pw + cur.mbw)/2) + 'px';
		p.style.top  = Math.round((ch > nh ? ch/2 - nh/2 : -1 * Math.min(1, Math.max(0, 5/3*(cy/ch-0.2))) * (nh - ch)) - (cur.ph + cur.mbh)/2) + 'px';
	} else {
		var r = cur.rect, rx = (r.left + r.right) / 2, ry = (r.top + r.bottom) / 2;
		p.style.maxWidth  = cw - cur.pw - cur.mbw + 'px';
		p.style.maxHeight = ch - cur.ph - cur.mbh + 'px';
		p.style.width  = 'auto';
		p.style.height = 'auto';
		var w = p.clientWidth + cur.mbw, h = p.clientHeight + cur.mbh;
		var x =  Math.min(cw - w, Math.max(0, r.left + (w && rx > cw/2 ? -w -20 : r.width  + 20)));
		var y =  Math.min(ch - h, Math.max(0, r.top  + (h && ry > ch/2 ? -h -20 : r.height + 20)));
		if(h < ch - 80 && (x > r.right || x + w < r.left)) {
			y = Math.min(Math.max(ry - h/2, 40), ch - h - 40);
		} else if(w < cw - 80 && (y > r.bottom || y + h < r.bottom)) {
			x = Math.min(Math.max(rx - w/2, 40), cw - w - 40);
		}
		p.style.left = x + 'px';
		p.style.top  = y + 'px';
	}
}

function placeStatus() {
	var s = getStatus();
	if(s) {
		s.style.left = cur.cx + 'px';
		s.style.top  = cur.cy + 'px';
	}
}

function toggleZoom() {
	var p = getPopup();
	if(!p || !p.naturalHeight) return;
	p.style.cursor = '';
	cur.node.style.cursor = '';
	cur.zoom = !cur.zoom;
	cur.zoomed = true;
	cur.scale = cur.minScale = scale(p, cur.large);
	placePopup();
	setTitle();
	return cur.zoom;
}

function showError(o) {
	setStatus('error');
	if(!o.responseText && !o.target) GM_log(o);
}

function getStatus() {
	return $('mpiv-status');
}

function setStatus(status) {
	var s = getStatus();
	if(s) s.parentNode.removeChild(s);
	if(!status) return;
	var svg = status == 'error' ? '<svg xmlns="http://www.w3.org/2000/svg" xmlns:x="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"><g><polygon id="p" points="43,5 57,5 57,43 95,43 95,57 57,57 57,95 43,95 43,57 5,57 5,43 43,43" transform="rotate(43 50 50)" style="fill:#a20e11;stroke-width:3;stroke:#990000"/></g></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" xmlns:x="http://www.w3.org/1999/xlink" viewBox="0 0 100 100"><defs><style>.r {fill:#9dbbc8;stroke-width:0.3;stroke:gray} .a {fill:#3b5059;stroke-width:0} .b {fill:#4c6772;stroke-width:0} .c {fill:#648896;stroke-width:0} .d {fill:#78a2b3; stroke-width:0;}</style><rect id="r" x="45.5" y="9" width="7" height="23" rx="3" ry="3"/><filter id="f"><feColorMatrix type="saturate" values="0"/></filter></defs><g filter=""><use x:href="#r" class="r"/><use x:href="#r" class="r" transform="rotate(30 50 50)"/><use x:href="#r" class="r" transform="rotate(60 50 50)"/><use x:href="#r" class="r" transform="rotate(90 50 50)"/><use x:href="#r" class="r" transform="rotate(120 50 50)"/><use x:href="#r" class="r" transform="rotate(150 50 50)"/><use x:href="#r" class="r" transform="rotate(180 50 50)"/><use x:href="#r" class="r" transform="rotate(210 50 50)"/><use x:href="#r" class="r" transform="rotate(240 50 50)"/><use x:href="#r" class="r" transform="rotate(270 50 50)"/><use x:href="#r" class="r" transform="rotate(300 50 50)"/><use x:href="#r" class="r" transform="rotate(330 50 50)"/><g><animateTransform attributeName="transform" type="rotate" values="0 50 50; 30 50 50; 60 50 50; 90 50 50; 120 50 50; 150 50 50; 180 50 50; 210 50 50; 240 50 50; 270 50 50; 300 50 50; 330 50 50" dur="1s" repeatCount="indefinite" calcMode="discrete"/><use x:href="#r" class="a" transform="rotate(30 50 50)"/><use x:href="#r" class="b" transform="rotate(0 50 50)"/><use x:href="#r" class="c" transform="rotate(330 50 50)"/><use x:href="#r" class="d" transform="rotate(300 50 50)"/></g></g></svg>';
	if(status == 'xhr') svg = svg.replace('""', '"url(#f)"').replace('1s', '3s');
	s = d.createElement('div');
	s.id = 'mpiv-status';
	s.setAttribute('status', status);
	s.style.cssText = 'position:fixed;z-index:2147483647;left:' + cur.cx + 'px;top:' + cur.cy + 'px;height:40px;width:40px;margin:20px 0 0 20px;padding:0;background:white padding-box;border:1px solid gray;border-radius:8px';
	s.innerHTML = '<img style="border:0;margin:0" src="data:image/svg+xml;base64,' + wn.btoa(svg) + '">';
	d.body.appendChild(s);
}

function getPopup() {
	return $('mpiv-popup');
}

function setPopup(src) {
	var s = getPopup();
	if(!s && !src) return;
	if(!s) {
		s = d.createElement('img');
		s.id = 'mpiv-popup';
		s.style.cssText = 'display:none;border:1px solid gray;background-color:white;position:fixed;z-index:2147483647;margin:0;cursor:default;' + cfg.css;
		on(s, 'error', showError);
		d.body.appendChild(s);
	}
	if(src) {
		s.src = src;
		s.style.display = 'none';
		checkProgress(true);
	} else {
		cur.zoom = false;
		off(s, 'error', showError);
		s.parentNode.removeChild(s);
		if(cur.node) cur.node.style.cursor = '';
	}
}

function getCaption() {
	return $('mpiv-caption');
}

function setCaption(caption) {
	var c = getCaption();
	if(!caption) {
		if(c) c.parentNode.removeChild(c);
		return
	}
	if(!c) {
		c = d.createElement('div');
		c.id = 'mpiv-caption';
		c.style.cssText = 'position:fixed;z-index:2147483647;left:0;right:0;top:-50px;transition:top 500ms;text-align:center;font-family:sans-serif;font-size:15px;font-weight:bold;background:rgba(0, 0, 0, 0.6);color:white;padding:4px 10px';
		wn.setTimeout(function() { c.style.top = '0px'; }, 500);
	}
	d.body.appendChild(c);
	c.textContent = caption;
}

function setTitle(reset) {
	if(reset) {
		if(cur.title) d.title = cur.title;
	} else {
		if(!cur.title) cur.title = d.title;
		var p = getPopup();
		d.title = p.naturalWidth + 'x' + p.naturalHeight + ' @ ' + Math.round((p.clientHeight - cur.ph) / p.naturalHeight * 100) + '%';
	}
}

function parseUrls(url) {
	var end = url.length - 1, urls = [];
	if(url.charAt(end) == '#') return urls;
	while(true) {
		var pos = url.lastIndexOf('http', end);
		if(pos === 0 && urls.length === 0) {
			urls.push(url);
			break;
		}
		if(pos == -1) break;
		if(/https?:\/\/[^&]+/.exec(url.substring(pos, end + 1))) {
			urls.push(RegExp.lastMatch);
		}
		if(pos === 0) break;
		end = pos - 1;
	}
	return urls;
}

function findMatch(a, re) {
	for(var i = a.length; i--;) {
		var m = re.exec(a[i]);
		if(m) return m;
	}
	return false;
}

function rel2abs(rel, abs) {
	if(rel.indexOf('//') === 0) rel = 'http:' + rel;
	var re = /^([a-z]+:)?\/\//;
	if(re.test(rel))  return rel;
	if(!re.exec(abs)) return false;
	if(rel[0] == '/') return abs.substr(0, abs.indexOf('/', RegExp.lastMatch.length)) + rel;
	return abs.substr(0, abs.lastIndexOf('/')) + '/' + rel;
}

function replace(s, m) {
	for(var i = m.length; i--;) {
		s = s.replace('$'+i, m[i]);
	}
	return s;
}

function styleSum(s, p) {
	for(var i = p.length, x = 0; i--;) {
		x += parseInt(s.getPropertyValue(p[i], 10), 10) || 0;
	}
	return x;
}

function scale(p, large) {
	return large ? (cfg.halfzoom && (p.naturalHeight / cur.ch > 3 && p.naturalWidth > cur.cw || p.naturalWidth / cur.cw > 3 && p.naturalHeight > cur.ch) ? 0.5 : 1) : Math.min((cur.cw - cur.mbw)/p.naturalWidth, (cur.ch - cur.mbh)/p.naturalHeight);
}

function hasBg(node) {
	return node ? wn.getComputedStyle(node).getPropertyValue('background-image') != 'none' : false;
}

function hasAcceptableSize(node, url) {
	if(!(node.tagName == 'IMG' || (node = node.querySelector('img')))) return false;
	return node.src == url && (!cfg.img || node.clientHeight >= node.naturalHeight);
}

function on(node, e, f) {
	node.addEventListener(e, f, false);
}

function off(node, e, f) {
	node.removeEventListener(e, f, false);
}

function setup() {
	if($('mpiv-setup')) return;
	GM_addStyle('\
		#mpiv-setup { position:fixed;z-index:2147483647;top:40px;right:40px;padding:20px 30px;background:white;width:550px;border:1px solid black; }\
		#mpiv-setup * { color:black;text-align:left;line-height:normal;font-size:12px;font-family:sans-serif; }\
		#mpiv-setup a { color:black;text-decoration:underline; }\
		#mpiv-setup div { text-align:center;font-weight:bold;font-size:14px; }\
		#mpiv-setup ul { margin:15px 0 15px 0;padding:0;list-style:none;background:white;border:0; }\
		#mpiv-setup input { border:1px solid gray;padding:1px;background:none;position:relative;bottom:-2px; }\
		#mpiv-setup input[type=text] { width:40px; }\
		#mpiv-setup li { margin:0;padding:6px 0;vertical-align:middle;background:white;border:0 }\
		#mpiv-setup p { background:white;color:gray;padding:2px 0; margin:0; }\
		#mpiv-setup textarea { height:100px;width:100%;font-size:11px;font-family:monospace;background:none;border:1px solid gray;padding:1px; }\
		#mpiv-setup #mpiv-setup-css { height:30px; }\
		#mpiv-setup button { width:150px;margin:0 10px;text-align:center; }\
	');
	var div = d.createElement('div');
	div.id = 'mpiv-setup';
	d.body.appendChild(div);
	div.innerHTML = '<div>Mouseover Popup Image Viewer</div><ul><li><input type="checkbox" id="mpiv-setup-thumbsonly"> Allow popup over text-only links (e.g. headlines)</li><li><input type="checkbox" id="mpiv-setup-img"> Allow popup over images that have been scaled down in HTML</li><li>Popup activation: automatically after <input id="mpiv-setup-delay" type="text"/> ms or <input type="checkbox" id="mpiv-setup-key"> manually with Ctrl instead</li><li>Zoom activation: <select><option id="mpiv-setup-shift">shift</option><option id="mpiv-setup-wheel">mouse wheel up or shift</option><option id="mpiv-setup-context">right mouse button or shift</option></select></li><li><input type="checkbox" id="mpiv-setup-halfzoom"> Use initial zoom factor of 50% for very large images</li><li>Custom CSS for popup image (units in px):<textarea id="mpiv-setup-css" spellcheck="false"></textarea></li><li>Custom host rules (one per line):<p>Format: {"r":"urlpattern", "s":"urlsubstitution", "q":"selector", "xhr":true, "html":true}&nbsp;&nbsp;<a href="http://w9p.co/userscripts/mpiv/host_rules.html" target="_blank">more info...</a></p><textarea id="mpiv-setup-hosts" spellcheck="false"></textarea></li></ul><div><button id="mpiv-setup-ok">OK</button><button id="mpiv-setup-cancel">Cancel</button></div>';
	div = null;
	var close = function() { var div = $('mpiv-setup'); div.parentNode.removeChild(div); };
	on($('mpiv-setup-ok'), 'click', function() {
		var delay = parseInt($('mpiv-setup-delay').value, 10);
		if(!isNaN(delay) && delay >= 0) GM_setValue('delay', cfg.delay = delay);
		GM_setValue('thumbsonly', cfg.thumbsonly = !$('mpiv-setup-thumbsonly').checked);
		GM_setValue('img', cfg.img = !!$('mpiv-setup-img').checked);
		GM_setValue('key', cfg.key = !!$('mpiv-setup-key').checked);
		GM_setValue('zoom', cfg.zoom = $('mpiv-setup-context').selected ? 'context' : ($('mpiv-setup-wheel').selected ? 'wheel' : 'shift'));
		GM_setValue('halfzoom', cfg.halfzoom = !!$('mpiv-setup-halfzoom').checked);
		GM_setValue('css', cfg.css = $('mpiv-setup-css').value.trim());
		GM_setValue('hosts', cfg.hosts = $('mpiv-setup-hosts').value.trim());
		hosts = loadHosts();
		close();
	});
	on($('mpiv-setup-cancel'), 'click', close);
	$('mpiv-setup-delay').value = cfg.delay;
	$('mpiv-setup-thumbsonly').checked = !cfg.thumbsonly;
	$('mpiv-setup-img').checked = cfg.img;
	$('mpiv-setup-key').checked = cfg.key;
	$('mpiv-setup-' + cfg.zoom).selected = true;
	$('mpiv-setup-halfzoom').checked = cfg.halfzoom;
	$('mpiv-setup-css').value = cfg.css;
	$('mpiv-setup-hosts').value = cfg.hosts;
}

on(d.body, 'mouseover', onMouseOver);
GM_registerMenuCommand('Set up Mouseover Popup Image Viewer', setup);

//===================================================================\\
//=============== |Add Online Status Badges v1.0 | ==================\\
//========= | http://designsweeter.com/ - Jackson Gariety | =========\\
//===================================================================\\

// In progress....
// ~ Jackson