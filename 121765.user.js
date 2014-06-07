// ==UserScript==
// @name           Glitch goto
// @namespace      http://www.glitch.com/profiles/PUV9O37KUTI2GS0/
// @include        http://*.glitch.com/game/*
// ==/UserScript==

// page elements and styling
var swf_div;

var bar = document.createElement("div");
var expanded = false;
var locked = false;
bar.style.cssText = "background-color: #DDE4E6; width: 100%; border-top: 1px solid #B0BDBD; " +
        "text-shadow: 0 1px 0 #FFFFFF;" +
        "height: 29px; position: fixed; bottom: 0; right: 0;" +
        "transition-property: margin; transition-duration: 0.3s; transition-delay: 0.3s; " +
        "-moz-transition-property: margin; -moz-transition-duration: 0.3s; -moz-transition-delay: 0.3s; " +
        "-webkit-transition-property: margin; -webkit-transition-duration: 0.3s; -webkit-transition-delay: 0.3s; " +
        "-o-transition-property: margin; -o-transition-duration: 0.3s; -o-transition-delay: 0.3s; margin-bottom: -30px;";
bar.id = "loc_search_bar";
bar.addEventListener("keyup", function(e) {
    if (e.keyCode == 27 && expanded)
        toggleBar(false);
}, false);
bar.addEventListener("keypress", function(e) {
    if (e.keyCode == 8 && e.target.id != "loc_search_box") {
        e.preventDefault();
    }
}, false);

function toggleBar(expanding) {
    expanded = expanding;
    bar.style.marginBottom = expanded ? "0px" : "-30px";    
    button.textContent = expanded ? "-" : "+";
    if (expanded) {
        box.focus();
        box.select();
    }
}

var button = document.createElement("div");
button.id = "loc_search_bar_button";
button.style.cssText = "width: 18px; height: 28px; position: fixed; " +
    "text-shadow: 0 1px 0 #FFFFFF;" +
    "background-color: #F9ED68; border: 1px solid #DBCB64; border-bottom: 1px solid #EDE165; border-right: 1px solid #EDE165;" +
    "bottom: 0; right: 0; color: #B7A349;" +
    "-webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -o-user-select: none; user-select: none; " +
    "cursor: default; font: 14px/25px arial, sans-serif;";
button.addEventListener("click", function() {
        toggleBar(!expanded);
    }, false);
button.textContent = "+";
        
var labelCSS = "color: #333; float: left; height: 30px; line-height: 30px;";
var label = document.createElement("div");
label.style.cssText = labelCSS + "width: 80px; margin-left: 30px;";
label.textContent = "Find what?";
bar.appendChild(label);    

var box = document.createElement("input");
box.id = "loc_search_box";
box.type = "text";
box.title = "Search for a shrine, vendor, animal, resource, or friend.";
box.style.cssText = "width: 150px; margin-left: 8px; " +
    "float: left; margin-top: 4px; padding: 2px 3px 2px 3px;" +
    "background-color: #fff; border: 1px solid #98C9D2; border-radius: 2px;";
box.addEventListener("keyup", function(e) {
    if (e.keyCode == 13)
        searchSubmit();
}, false);
bar.appendChild(box);

var status = document.createElement("div");
status.id = "loc_search_status";
var statusCSS = labelCSS + "text-align: left; margin-left: 8px; " +
    "position: absolute; left: 286px;";
status.style.cssText = statusCSS;
bar.appendChild(status);

var destCheck = document.createElement("img");
destCheck.src = "http://c1.glitch.bz/img/check-tiny-stroke_28144.png";
destCheck.style.cssText = "display: none; position: absolute; right: 178px; margin-top: 10px;";
bar.appendChild(destCheck);

var destForm = document.createElement("form");
destForm.id = "loc_search_dest_form";
destForm.style.cssText = "display: none; position: absolute; right: 66px;";
destForm.addEventListener("submit", function(e) {    
    destCheck.style.display = "block";
    destBtn.blur();
    if (swf_div)
        swf_div.focus();
    setTimeout(function() {
        if (!locked)
            toggleBar(false);
    }, 4000);
}, false);

var destHidden = document.createElement("input");
destHidden.id = "destHidden";
destHidden.name = "set_as_destination";
destHidden.type = "hidden";
destHidden.value = "1";
destForm.appendChild(destHidden);

var destBtn = document.createElement("input");
destBtn.type = "submit";
destBtn.className = "button-tiny";
destBtn.style.height = "24px";
destBtn.style.width = "108px";
destBtn.style.padding = "2px 9px 3px 9px";
destBtn.style.marginTop = "3px";

var destSink = document.createElement("iframe");
destSink.style.display = "none";
destSink.name = "destSink";
document.body.appendChild(destSink);

destForm.appendChild(destBtn);

bar.appendChild(destForm);

var lockIcon = document.createElement("img");
lockIcon.src = "http://c1.glitch.bz/img/wardrobe/plain-lock_34103.png";
lockIcon.style.cssText = "position: absolute; right: 22px; margin-top: 0px; height: 28px; opacity: 0.5;";
lockIcon.addEventListener("click", function(e) {
    locked = !locked;
    lockIcon.style.opacity = locked ? "1" : "0.5";
}, false);
bar.appendChild(lockIcon);
// end page elements
 
// global vars
var term = "";
var termText = "";
var zogTerm = "";
var playerTSID = "";
var flist = "";

// feature constants
var special = "bureau:bureaucratic hall.crab:crab.dna:dna cluster.crown:game of crowns booth.ghost:ghost sighting.machine:machine room.mail:mailbox.race:race ticket dispenser";
var animals = "batterfl:batterfly.butterfl:butterfly.chick:chicken.firefl:firefly swarm.pig:piggy";
var plots = "crop:crop garden plot.herb:herb garden plot";
var resources = "beryl:beryl rock.dirt:dirt pile.dullite:dullite rock.jelli:jellisac growth.metal:metal rock.barnac:mortar barnacle.dark patch:dark patch.patch:patch.peat:peat bog.sparkly:sparkly rock";
function isRock(term) {
    return (".beryl.dullite.metal.sparkly.".indexOf("." +term+ ".") != -1);  
}
var shrines = "alph:Alph shrine.cosma:Cosma shrine.friendly:Friendly shrine.grendaline:Grendaline shrine.humbaba:Humbaba shrine.lem:Lem shrine.mab:Mab shrine.pot:Pot shrine.spriggan:Spriggan shrine.ti:Ti shrine.zille:Zille shrine";
function isShrine(term) {
    return (shrines.indexOf(term+ ":") != -1);
}
var trees = "bean:bean tree.bubble:bubble tree.egg:egg plant.fruit:fruit tree.gas:gas plant.paper:paper tree.spice:spice plant.wood:wood tree";
var vendors = "alchem:alchemical goods vendor.animal:animal goods vendor.gardening tools:gardening tools vendor.gardening:gardening goods vendor.groceries:groceries vendor.hardware:hardware vendor.kitchen:kitchen tools vendor.meal:meal vendor.mining:mining vendor.produce:produce vendor.tool:tool vendor.toy:toy vendor";
var groups = [ special, animals, plots, resources, shrines, trees, vendors ];
var allFeatures = groups.join(".");

// output functions
function printStatus(html, isError) {    
    status.style.cssText = isError ? statusCSS + "color: #D3321D;" : statusCSS + "color: #333;";
    status.innerHTML = html;
    if (isError) {
        destForm.style.display = "none";
        destCheck.style.display = "none";
    }
}
init();
// browser check, need to change wmode if Chrome
document.addEventListener("DOMNodeInserted", nodeInserted, false);

function nodeInserted(e) {
    if (e.target.id == "swf_div") {
        
        swf_div = e.target;
        
        if (navigator.userAgent.indexOf("Firefox") != -1)
            init();
        else if  (navigator.userAgent.indexOf("Chrome") != -1) {
        
            var params = swf_div.getElementsByTagName("param");
            for (var i = 0; i < params.length; i++) {
                if (params[i].getAttribute("name") == "wmode") {
                    var clone = params[i].cloneNode(true);
                    clone.setAttribute("value", "opaque");
                    params[i].parentNode.replaceChild(clone, params[i]);
                    break;
                }
            }
            
            init();
        }
    }
}

function init() {
    // add GUI
    document.body.appendChild(bar);
    document.body.appendChild(button);
    
    // check if logged into Inventory of Ur
    askZog();
    
        // get player and friends ids
    GM_xmlhttpRequest({
      method: "GET",
      url: "http://www.glitch.com",
      onload: function(response) {
        var tmpDiv = document.createElement("div");
        tmpDiv.innerHTML = response.responseText;
        
        var links = tmpDiv.getElementsByClassName("player-link");            
        for (var i = 0; i < links.length; i++) {
            var link = links[i].parentNode.innerHTML;
            if (link.indexOf("/profiles/") != -1) {
                playerTSID = link.substring(link.indexOf("/profiles/") + 
                    "/profiles/".length, link.length);
                playerTSID = playerTSID.substring(0, playerTSID.indexOf("/")); 
                
                break;
            }
        }
        
        if (playerTSID.length > 0) {
            getFriends();
        }
      }
    });         
}

function getFriends() {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://www.glitch.com/profiles/" +playerTSID+ "/friends/",
        onload: function(response) {
                var tmpDiv = document.createElement("div");
                tmpDiv.innerHTML = response.responseText;

                var users = tmpDiv.getElementsByClassName("users")[0].childNodes;
                for (var i = 0; i < users.length; i++) {
                    if (users[i].nodeType == 1) {
                        var links = users[i].getElementsByTagName("A");
                        var id = links[0].attributes.getNamedItem("href").value + "\n";
                        id = id.substring("/profiles/".length, id.lastIndexOf("/"));
                        var name = links[0].firstChild.attributes.getNamedItem("alt").value;
                        flist += id+ ":" +name+ ".";
                    }
                }
                
                if (flist.charAt(flist.length-1) == ".")
                    flist = flist.substring(0, flist.length-1);
            }
        });
}
 
if (unsafeWindow) {
    api_call = unsafeWindow.api_call;
}

function searchSubmit() {
    
    var term = box.value;
    term = findTerm(term.toLowerCase());
    destForm.style.display = "none";
    destCheck.style.display = "none";

    if (term.length < 1) {
        // try matching in flist
        var friends = flist.split(".");        
        term = box.value;
        for (var i = 0; i < friends.length; i++) {
            if (term == friends[i].split(":")[1].toLowerCase()) {
                termText = friends[i].split(":")[1];
                findFriend(friends[i].split(":")[0]);
                return;
            }
        }
    
        printStatus("Couldn't parse search term.", true);
        return;
    }
    
    printStatus("Searching for nearest <b>" +termText+ "</b>...");
    askZog(term);
}

function findTerm(x) {

    var arr;
    if (x.indexOf("shrine") != -1)
        arr = shrines.split(".");
    else if (x.indexOf("tree") != -1)
        arr = trees.split(".");
    else if (x.indexOf("vendor") != -1 || x.indexOf("spirit") != -1) {
        arr = vendors.split(".");
        if (x.indexOf("garden") != -1 && x.indexOf("gardening") < 0)
            x = x.replace("garden", "gardening");
    }
    else if (x.indexOf("plot") != -1 || (x.indexOf("garden") != -1 && x.indexOf("gardening") < 0))
        arr = plots.split(".");
    else
        arr = allFeatures.split(".");
    
    for (var i = 0; i < arr.length; i++) {    
        if (x.indexOf(arr[i].split(":")[0]) != -1) {
            var term = arr[i].split(":")[0];
            termText = arr[i].split(":")[1];
            
            if (isRock(term))
                term += " rock for mining";
            else if (!isShrine(term))
                term = termText;
            
            return term;
        }
    }
    
    return "";
}

function findFriend(fid) {
    printStatus("Searching for friend <b>" +termText+ "</b>...");
    
    try {
        api_call('players.fullInfo', {player_tsid: fid}, function(e) {
            var locTSID = e.location.tsid;
            termText = e.is_online ? ("friend <b>" +termText+ "</b>") : ("<i>offline</i> friend <b>" +termText+ "</b>");
            setTimeout(function() {    
                findFriendLoc(locTSID);
            }, 0);
        });
    } catch (e) {
        printStatus(e, true);
    }
}

function findFriendLoc(loc) {    
    printStatus("Requesting friend location data...");
    try {
        api_call('locations.streetInfo', {street_tsid: loc}, function(e) {
            setTimeout(function() {
                var output = "Your " +termText+ " is at <b>" +e.name+ ", " +e.hub.name+ ".";
                printStatus(output);
                addDestBtn(loc, true);
            }, 0);
        });
    } catch (e) {
        printStatus(e, true);
    }
}

function askZog(term) {
    var url = "http://zoggish.appspot.com/profiles/me";
    if (term) {
        term = term.split(" ").join("-");
        url = "http://zoggish.appspot.com/find-" + term;
    }
    
    try {
        GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(response) {
                    var tmpDiv = document.createElement("div");
                    tmpDiv.innerHTML = response.responseText;
                    
                    var title = tmpDiv.getElementsByTagName("title")[0].innerHTML;
                    if (title.indexOf("Request for Permission") != -1) {
                    
                        if (term) {
                            printStatus("You're not logged into <a href=\"http://zoggish.appspot.com/locations\" target=\"_blank\">Inventory of Ur</a>. <a href=\"http://zoggish.appspot.com/profiles/me\" target=\"_blank\">Go log in</a>, or there will be no data for you!", true);
                        } else {
                            printStatus("You need to be logged into <a href=\"http://zoggish.appspot.com/locations\" target=\"_blank\">Inventory of Ur</a> to search for features. You can search for your friends without <a href=\"http://zoggish.appspot.com/profiles/me\" target=\"_blank\">logging in.</a>");
                        }
                        return;
                    } else if (!term)
                        return;
                    
                    if (term && title.indexOf("Where to find") < 0) {
                        printStatus("Couldn't get location data from <a href=\"" +url+ "\" target=\"_blank\">" +url+ "</a>.", true);
                        return;
                    }
                    
                    var content = response.responseText.substring(response.responseText.indexOf("<div class=\"content\">"), 
                        response.responseText.indexOf("<div class=\"footer\">"));
                    
                    parseZogReply(content, url);
            }
        });
    } catch (e) {
        printStatus("Request to <a href=\"http://zoggish.appspot.com/locations\">Inventor of Ur</a> failed: " +e, true);
    }
}

function parseZogReply(content, url) {
    printStatus("Reading search results...");
    
    if (content.indexOf("I don't know where") != -1 || content.indexOf("<li>") < 0) {
        printStatus("No <b>" +termText+ "</b> found. (<a href=\"" +url+ "\" target=\"_blank\">More info...</a>)");
        return;
    }
    
    var li = content.substring(content.indexOf("Let's assume"), content.length);
    li = li.substring(li.indexOf("<li>"), li.length);
    
    if (li.indexOf("<ol>") != -1 && li.indexOf("<ol>") < li.indexOf("</li>"))
        li = li.substring(0, li.indexOf("</ol>"));
    else
        li = li.substring(0, li.indexOf("</li>"));
    
    var here = false;
    if (li.indexOf("already there") != -1) {
        li = content.substring(content.indexOf("</li>")+"</li>".length, content.length);
        li = li.substring(0, li.indexOf("</li>"));
        here = true;
    }
    
    var destTSID = li.substring(li.indexOf("locations/")+"locations/".length, li.length);
    destTSID = destTSID.substring(0, destTSID.indexOf("\""));
    
    var streets;
    var stops;
    if (li.indexOf("next door") != -1 || li.indexOf("just a step away") != -1)
        streets = "1";
    else {
        streets = 0;
        var steps = li.split("<li>");
        for (var i = 0; i < steps.length; i++) {
            if (steps[i].indexOf(" streets") != -1) {
                var leg = steps[i].substring(0, steps[i].indexOf(" streets"));
                leg = leg.substring(leg.lastIndexOf(" ")+1, leg.length);
                streets += parseInt(leg);
            } else if (steps[i].indexOf(" stops") != -1) {
                stops = steps[i].substring(0, steps[i].indexOf(" stops"));
                stops = stops.substring(stops.lastIndexOf(" ")+1, stops.length);            
            }
        }
    }
    
    printStatus("Requesting destination data...");
    
    try {
        api_call('locations.streetInfo', {street_tsid: destTSID}, function(e) {
            setTimeout(function() {
                var output = "Nearest <b>" +termText+ "</b>:";
                if (here)
                    output += " here!  Next nearest is at";
                output += " <a href=\"" +url+ "\" target=\"_blank\">" +e.name+ ", " +e.hub.name+ "</a> (" +streets+ " streets away";
                
                if (stops) {
                    output += ", plus " +stops+ " subway stops";
                    addDestBtn(url, false);
                }
                else
                    addDestBtn(destTSID, true);
                
                output += ").";
                printStatus(output);
            }, 0);
        });
    } catch (e) {
        printStatus(e, true);
    }
}

function addDestBtn(dest, isLoc) {
    if (isLoc) {
        destForm.method = "POST";
        destForm.target = "destSink";
        destForm.action = "/locations/" +dest+ "/?destination=1";
        
        if (destHidden.parentNode != destForm)
            destForm.appendChild(destHidden);
            
        destBtn.value = "Set destination";                
    } else {
        destForm.method = "GET";
        destForm.target = "_blank";
        destForm.action = dest;        
        
        if (destHidden.parentNode == destForm)
            destForm.removeChild(destHidden);
            
        destBtn.value = "Get directions";
    }
    
    destForm.style.display = "inline-block";
    destBtn.focus();
}
