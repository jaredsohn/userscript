// ==UserScript==
// @name         cyberbit's Group Mods
// @version      1.0.2
// @namespace    cyberbitsgroupmods
// @include      http://soundation.com/groups*
// @include      http://soundation.com/account/groups*
// @author       cyberbit
// @description  Functions to improve the Soundation group experience.
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var includeFunctions = [toggleOldGroups, toggleOnlyAdminGroups, resetModLinks, minifyGroups];
    var script = document.createElement("script");
    script.setAttribute("src", "http://code.jquery.com/jquery-1.10.2.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        var sIncludeFunctions = "";
        includeFunctions.forEach(function (f) {
            sIncludeFunctions += f.toString();
        });
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();" + sIncludeFunctions;
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {
    var minifiedStyles = "div.row.group.minified { padding: 4px; } div.img.minified, div.img.minified img { width: 20px !important; height: 20px !important; } div.info.minified { min-height: 20px !important; margin-left: 24px !important; } p.last-activity.minified { float: right; display: inline; } p.last-activity.minified:before { content: \"(\"; } p.last-activity.minified:after { content: \")\"; } div.admin.minified a { margin-top: -2px !important; }";
    var style = document.createElement("style");
    style.textContent = minifiedStyles;
    style.setAttribute("type", "text/css");
    document.head.appendChild(style);
    jQ("div#main h2").after("<div id=\"groupmods\" style=\"padding: 8px; background: #e5f3d6; border: 1px solid #709343; border-radius: 2px\">cyberbit's Group Mods: <p><a id=\"oldgroups\" href=\"javascript:;\" onclick=\"toggleOldGroups(0)\">Hide Old Groups</a> | <a id=\"admingroups\"href=\"javascript:;\" onclick=\"toggleOnlyAdminGroups(0)\">Show Only Admin Groups</a> | <a id=\"minifygroups\"href=\"javascript:;\" onclick=\"minifyGroups(1)\">Minify Groups</a></p></div>");
    jQ("div#groupmods").hide();
    $(document).ready(function () {
        jQ("div#groupmods").fadeIn(2000);
    });
}

function toggleOldGroups(iToggle) {
    resetModLinks(1, iToggle);
    jQ("div.row.group").each(function (i, e) {
        elem = jQ(this).find("p.last-activity")[0];
        if ((typeof elem === 'undefined' || elem.innerHTML.indexOf("year") >= 0 || elem.innerHTML.indexOf("month") >= 0 || elem.innerHTML.search("([5-9]|[123]\\d) days") >= 0) && !(jQ(this).find("div.admin").length > 0)) {
            node = jQ(this);
            (iToggle ? node.slideDown(600) : node.slideUp(600));
        } else {
            node = jQ(this);
            node.slideDown(600);
        }
    });
    resetModLinks(2, 1);
}

function toggleOnlyAdminGroups(iToggle) {
    resetModLinks(2, iToggle);
    jQ("div.row.group").each(function (i, e) {
        if (jQ(this).find("div.admin").length === 0) {
            node = jQ(this);
            (iToggle ? node.slideDown(600) : node.slideUp(600));
        }
    });
    (iToggle ? resetModLinks(1, iToggle) : null);
}

function resetModLinks(iMode, iToggle) {
    switch (iMode) {
        case 0: //All links reset
            jQ("a#oldgroups").attr("onclick", "toggleOldGroups(" + (iToggle ? "0" : "1") + ")").html((iToggle ? "Hide" : "Show") + " Old Groups");
            jQ("a#admingroups").attr("onclick", "toggleOnlyAdminGroups(" + (iToggle ? "0" : "1") + ")").html((iToggle ? "Show Only Admin" : "Show All") + " Groups");
            break;
        case 1: //Old groups link reset
            jQ("a#oldgroups").attr("onclick", "toggleOldGroups(" + (iToggle ? "0" : "1") + ")").html((iToggle ? "Hide" : "Show") + " Old Groups");
            break;
        case 2: //Admin groups link reset
            jQ("a#admingroups").attr("onclick", "toggleOnlyAdminGroups(" + (iToggle ? "0" : "1") + ")").html((iToggle ? "Show Only Admin" : "Show All") + " Groups");
            break;
    }
}

function minifyGroups(iToggle) {
    jQ("div.row.group").each(function (i, e) {
        isAdmin = jQ(this).find("div.admin").length > 0;
        img = jQ(this).find("div.img")[0].outerHTML;
        link = jQ(this).find("a.name")[0].outerHTML;
        vLastActivity = jQ(this).find("p.last-activity");
        lastActivity = (vLastActivity.length > 0 ? vLastActivity[0].outerHTML.replace("Last activity ", "").replace(" ago", "") : '');
        minifiedContent = img + "<div class=\"info\">" + link + (isAdmin ? "<span id=\"spacer\" style=\"width: 80px; height: 20px; float:right;\"></span>" : "") + lastActivity;
        if (isAdmin) {
            adminButton = jQ(this).find("div.admin a")[0].outerHTML;
            jQ(this).find("div.admin").html(adminButton);
            admin = jQ(this).find("div.admin")[0].outerHTML;
            minifiedContent += admin + "</div>";
        }
        jQ(this).html(minifiedContent);
    });
    jQ("div.row.group, div.img, div.info, p.last-activity, div.admin").addClass("minified");
}

// load jQuery and execute the main function
addJQuery(main);