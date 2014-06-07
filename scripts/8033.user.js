// Copyright (c) 2007 Noel O'Boyle <baoilleach@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          PDB Jmol
// @namespace     http://www.redbrick.dcu.ie/~noel/PDBJmol
// @description   Annotates PDB codes with links to FirstGlance in Jmol
// @include       http://*
// ==/UserScript==
//
// CHANGELOG
//
// 22-Oct-07: Added updater code adapted from
//            http://userscripts.org/scripts/show/12193
// 26-Jun-07: The general regexp missed 583 out of 44200 PDB codes.
//            Now, a less strict regexp is used to catch the remaining PDB
//            codes, which are then checked against the list of 583 codes.
// 25-Jun-07: To reduce false positives, the script is only run on pages
//            containing the words "PDB", "protein" or "enzyme"
// 31-Mar-07: now handles PDB codes in links correctly by adding the
//            Jmol link after the original link
// 23-Mar-07: complete rewrite of the code to iterate over TextNodes
// 22-Mar-07: workaround for Google bug is to exclude Google...the bug fix is
//            probably to loop over document.getElementsByTagName('*')
//            like a normal person, instead of editing the innerHTML directly
// 21-Mar-07: changed regexp from a number followed by 3 letters to a
//            number followed by a letter followed by two of either
// 21-Mar-07: fixed logical error (OR to AND) to prevent the script
//            altering text within an HTML tag
// 21-Mar-07: prevented error message popping up whenever no <body>
//            is present

var pdb_a = /\b(\d[a-zA-Z][a-zA-Z0-9]{2})\b/g; // Regexp for 99% of PDB codes
var pdb_b = /\b(\d[a-zA-Z0-9]{3})\b/g; // Regexp for 100% of PDB codes
var proteinpage = /(protein|pdb|enzyme)/i;
var pdb_b_codes = "100d-200d-200l-300d-400d-101d-101m-201d-201l-301d-401d-202d-102d-102l-102m-302d-402d-103d-103l-103m-203d-303d-403d-104d-104l-104m-204d-304d-404d-105d-105m-205d-205l-305d-405d-106d-106m-206d-206l-306d-406d-107d-107l-107m-207d-207l-307d-407d-108d-108l-108m-208d-208l-308d-408d-109d-109l-109m-209d-209l-309d-409d-20gs-10gs-10mh-110d-110l-110m-210d-210l-310d-410d-111d-111l-111m-211d-211l-311d-411d-112d-112l-112m-212d-212l-312d-412d-113d-113l-213d-213l-313d-413d-114d-114l-214d-214l-314d-414d-115d-115l-215d-215l-315d-116d-216d-216l-316d-117d-117e-217d-217l-317d-417d-118d-118l-218d-218l-318d-418d-119d-119l-219d-219l-319d-419d-11as-11ba-11bg-21bi-31bi-41bi-11gs-21gs-120l-220d-220l-320d-420d-121d-121p-221d-221l-221p-321d-421d-421p-521p-621p-721p-821p-122d-122l-222d-222l-322d-422d-123d-123l-223d-223l-323d-423d-124d-224d-224l-324d-424d-125l-225d-225l-325d-425d-126d-126l-226d-226l-326d-426d-127d-127l-227d-227l-327d-427d-128d-128l-228l-328d-428d-129d-129l-229d-229l-329d-429d-12as-12ca-32c2-12e8-12gs-22gs-130d-130l-230d-230l-330d-430d-830c-131d-131l-231d-231l-331d-431d-132d-132l-232d-232l-332d-432d-133d-133l-233d-233l-333d-433d-134d-134l-234d-234l-334d-434d-135l-135d-235d-235l-335d-435d-136d-236d-236l-336d-436d-137d-137l-237d-237l-337d-437d-138d-138l-238d-238l-338d-438d-239d-139d-139l-239l-339d-439d-43c9-43ca-13gs-13pk-140d-140l-240d-240l-340d-440d-141d-141l-241d-241l-341d-441d-142d-142l-242d-242l-342d-442d-143d-143l-243d-243l-343d-443d-144d-144l-244d-244l-344d-444d-145d-145l-245d-245l-345d-445d-146d-146l-246d-246l-346d-446d-147l-247d-247l-447d-148d-148l-248d-248l-348d-448d-149d-149l-249d-249l-349d-449d-14gs-150d-150l-250d-250l-151d-151l-251d-251l-351c-351d-451c-152d-152l-252d-252l-352d-452d-153d-153l-253d-253l-353d-453d-154d-154l-254d-254l-354d-454d-155c-155l-255d-255l-355d-455d-156d-156l-256b-256d-256l-456c-456d-157d-157l-257d-257l-357d-457d-158d-158l-258d-258l-358d-458d-159d-159l-259d-259l-359d-459d-15c8-25c8-35c8-160d-160l-260d-260l-360d-460d-161d-161l-261d-261l-361d-461d-162l-262l-362d-462d-163l-263d-363d-463d-164l-264d-364d-464d-165d-165l-265d-365d-465d-166d-166l-266d-366d-466d-966c-167d-167l-267d-367d-467d-168d-168l-268d-368d-468d-169d-169l-269d-369d-469d-16gs-16pk-16vp-170d-170l-270d-370d-470d-171d-171l-271d-371d-471d-172d-172l-272d-372d-472d-173d-173l-473d-174l-274d-474d-175d-175l-275d-375d-176d-176l-276d-376d-476d-177d-177l-277d-377d-477d-178d-178l-278d-378d-478d-179d-179l-279d-379d-479d-17gs-17ra-180d-180l-280d-380d-480d-181d-181l-281d-381d-481d-182d-182l-282d-382d-482d-183d-183l-283d-383d-483d-184d-184l-284d-384d-484d-185d-185l-285d-385d-485d-186d-186l-286d-386d-486d-187d-187l-287d-387d-487d-188d-188l-288d-388d-488d-189d-189l-289d-389d-28dn-18gs-28sp-28sr-190l-190d-290d-390d-191l-1914-191d-291d-391d-192l-192d-292d-392d-193d-193l-293d-393d-194d-194l-294d-394d-195d-195l-295d-395d-196d-196l-296d-396d-197d-197l-297d-397d-198d-198l-298d-398d-199d-199l-299d-399d-19gs-19hc";
var StartTag = "<a href='http://firstglance.jmol.org/fg.htm?mol=";
var EndTag = "' target=_blank>Jmol</a>";

function isInLink(node) {
  // Returns 0 if this node is not in the DOM subtree of an <a>
  //           else returns the <a> node
  node = node.parentNode;
  while (node.parentNode && node.nodeName!='A') {
    node = node.parentNode;
  }
  if (node.nodeName=='A')
    return node;
  else
    return 0;
}

function debug() {
  alert(document.getElementsByTagName("a")[0].nodeName);
}

function searchandreplace(textNode) {
  alltext = textNode.nodeValue;
  startsearch = 0;
  finished = false;
  while (!finished) { // Keep looking until neither pattern a nor b matches the remaining text
    sometext = alltext.substr(startsearch);
    MAXVAL = 999999;
    match_a_i = MAXVAL;
    match_b_i = MAXVAL;
    match_i = MAXVAL;

    // The next block sets the value of match_i to the index of the first
    // *valid* PDB code in sometext
    if (sometext.match(pdb_a))
      match_a_i = pdb_a.exec(sometext).index;
    if (sometext.match(pdb_b))
      match_b_i = pdb_b.exec(sometext).index;
    if (match_a_i <= match_b_i)
      match_i = match_a_i;
    else { // Either (just b matched) or (both a and b matched but b matched first)
      protein = sometext.substr(match_b_i, 4);
      re = new RegExp(protein, "i"); // Case-insensitive match
      ok = pdb_b_codes.match(re);
      if (ok)
        match_i = match_b_i;
    }
    // At this point, either
    //   match_i==match_a_i==match_b_i==MAXVAL and we should just leave the function
    //   match_i==match_a_i < MAXVAL and we should continue with adding the Jmol link
    //   match_i==match_b_i < MAXVAL and we should continue with adding the Jmol link
    //   match_i==MAXVAL and match_b_i < MAXVAL and we should continue to search the remaining substring
    if (!(match_i == MAXVAL && match_b_i < MAXVAL))
      finished = true;
    else // Keep looking
      startsearch += match_b_i + 4;
  }
  match_i += startsearch; // Correct match_i for alltext

  if (match_i < MAXVAL) { // There is a valid match at index match_i
    protein = alltext.substr(match_i, 4);
    starttext = alltext.substring(0, match_i + 4);
    endtext = alltext.substring(match_i + 4);

    newnode = document.createElement('sup');
    newnode.style.color = 'blue';
    newnode.style.backgroundColor = 'yellow';
    newnode.innerHTML = StartTag + protein + EndTag;

    starttextnode = document.createTextNode(starttext);
    endtextnode = document.createTextNode(endtext);

    linknode=isInLink(textNode); // False if text not in link
    if (!linknode) {
      // If the PDB code is not in a link, then split the current node
      // into two separate text nodes and insert the new Jmol link inbetween
      myparent = textNode.parentNode;
      myparent.replaceChild(newnode, textNode);
      myparent.insertBefore(starttextnode, newnode);
      myparent.insertBefore(endtextnode, newnode.nextSibling);
      
      searchandreplace(endtextnode); // There may be another PDB code here
    }
    else {
      // If the PDB code is in a link, then insert the new Jmol link
      // after the link node
      linkparent = linknode.parentNode;
      linkparent.insertBefore(newnode, linknode.nextSibling);
    } 
  }
}

function run() {
  if (!document.body || typeof(document.body.innerHTML) == "undefined") {
    return false;
  }
  var xPathResult = document.evaluate(
    './/text()[normalize-space(.) != ""]',
    document.body,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
    );
  var this_is_a_protein_page = false;
  for (var i = 0, l = xPathResult.snapshotLength; i < l; i++) {
    var textNode = xPathResult.snapshotItem(i);
    var alltext = textNode.nodeValue;
    if (alltext.match(proteinpage)) {
      this_is_a_protein_page = true;
      break;
      }
  }

  if (this_is_a_protein_page) {
    for (var i = 0, l = xPathResult.snapshotLength; i < l; i++) {
      var textNode = xPathResult.snapshotItem(i);
      searchandreplace(textNode);
    }
  }
}

// MAIN
run();

var d = new Date();
var curr_date = d.getDate();
var date_last_checked= GM_getValue("check_updates", 0);
if (date_last_checked != curr_date)
{
  GM_setValue("check_updates", curr_date);
  // Modified the code by Seifer at http://userscripts.org/users/33118
  script_name = 'PBDJmol';
  script_num = '8033';
  script_href = "http://blueobelisk.svn.sf.net/svnroot/blueobelisk/userscripts/trunk/PDBJmol.user.js";
  script_as_text = "http://blueobelisk.svn.sourceforge.net/viewvc/*checkout*/blueobelisk/userscripts/trunk/PDBJmol.user.js?content-type=text%2Fplain";
  script_version=1.0;
  script_updatetext='ADD UPDATE TEXT HERE';

  GM_xmlhttpRequest({
      method: "GET",
      url: script_as_text,
      onload: function(responseDetails) {
        var text = responseDetails.responseText;
        var update_version = text.substring(text.indexOf("script_version=")+15,text.indexOf("\n",text.indexOf("script_version="))-2);
        var update_text = text.substring(text.indexOf("script_updatetext=")+19,text.indexOf("\n",text.indexOf("script_updatetext="))-3);
      if(update_version > script_version) {
          newversion = document.createElement("div");
          newversion.setAttribute("id", "gm_update_alert");
          newversion.setAttribute("style", "background-color:yellow; width:100%; position:absolute; z-index:99; top:0px; left:0px; text-align:center; font-size:11px; font-family: Tahoma");
          newversion.innerHTML = "<a href='#' onclick='document.body.removeChild(document.getElementById(&quot;gm_update_alert&quot;))' style='color:red'>Close</a><font color='yellow'>--------</font><font color='red'>There is a new version of the &quot;"+script_name+"&quot; script. You are currently running version "+script_version+".</font><br><font color='yellow'>----------------</font>The latest version is "+update_version+". <a href='#' onclick='document.getElementById(&quot;gm_update_alert_info&quot;).setAttribute(&quot;style&quot;, &quot;display:block&quot;)' style='color:green'>Click here for more info</a> or <a style='color:green' href='" + script_href + "'><b>Click here to download the latest version</b></a><span id='gm_update_alert_info' style='display:none'><b>Here's a short description of the latest update...</b><br>"+update_text+"</span>";
          document.body.appendChild(newversion);
        }
      }
  });
}


