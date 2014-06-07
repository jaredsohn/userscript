// $Id: imdbweaver.user.js 542 2013-02-01 01:00:10Z Chris $
// -----------------------------------------------------------------------------
// This is a Greasemonkey user script.
// To use it, first install Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script
// From the Firefox menu select: Tools -> Install User Script
// Accept the default configuration and install
// Now whenever you visit imdb.com you will see extra functionality
// Documentation here: http://refactoror.net/greasemonkey/imdbWeaver/doc.html
// -----------------------------------------------------------------------------

// ==UserScript==
// @name         IMDb Weaver
// @moniker      iwvr
// @namespace    http://refactoror.net/
// @description  Enhances the content of imdb pages by correlating information from related pages.
// @version      0.3.8.1
// @author       Chris Noe
// @include      imdb.com/*
// @include      *.imdb.com/*
//---------
// @exclude      *.imdb.com/images/*
// @exclude      *doubleclick*
// @exclude      *google_afc*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_log
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var dm = new DomMonkey({
   name : "IMDb Weaver"
  ,moniker : "iwvr"
  ,version : "0.3.8.1"
});


// The values listed here are the first-time-use defaults
// They have NO EFFECT once this script is installed.
prefs.config({
    "ajaxOperationLimit":           10
    ,"all-topnav-isExpanded":       true
    ,"highlightTitleTypes":         true
    ,"firstMatchAccessKey":         "A"
    ,"name-headshotMagnifier":      true
    ,"name-ShowAge":                true
    ,"name-ShowAgeAtTitleRelease":  true
    ,"prefsMenuAccessKey":          "P"
    ,"prefsMenuPosition":           "BR"
    ,"prefsMenuVisible":            true
    ,"removeAds":                   true
    ,"title-attributes":            true
    ,"title-headshotMagnifier":     true
    ,"title-headshotMagnification": 12
    ,"title-ShowAges":              true
    ,"title-StartResearch":         true
});

var titleHighlighers = {
     Khaki:    ["(V)"]  // direct to video, no theatrical release
    ,Lavender: ["(TV)", "TV series", "TV mini-series", "TV episode"]
    ,Pink:     ["(VG)"] // video game
};


// --------------- Page handlers ---------------

tryCatch(dm.metadata["moniker"], function () {
    if (isStaticPageRequest()) {
        // a request from a DocumentContainer object
        log.debug("~~~~~ Static page request, no page processing: " + dm.xdoc.location.href);
        // TBD: need to add "ajaxstatic" param to all URLs to prevent page graph recursion
        dm.xdoc.foreachNode(
            "//a[contains(@href, 'imdb.com')]",
            function(a) {
                a.href = ajaxstaticUrl(a.href);
log.debug("In " + dm.xdoc.location.href + " :: " + a.href);
            }
        );
        return;
    }
    if (window != window.top) {
        log.debug("subordinate window, no page processing: " + document.location.href);
        return; // this is a subordinate window (iframe, etc)
    }

         if (dm.xdoc.location.href.match(/\/title\/tt\d+\/?/))  enhanceTitlePage();
    else if (dm.xdoc.location.href.match(/\/name\/nm\d+\/?/))   enhanceNamePage();
    else if (dm.xdoc.location.href.match(/\/find\?/))           enhanceFindPage();
    else if (dm.xdoc.location.href.match(/\/updates\/history/)) enhanceUpdatePage();
    else {
        log.info("IMDb generic page");
        extendImdbDocument(dm.xdoc);
        enhanceImdbPage(dm.xdoc);
    }
});

function isStaticPageRequest() {
    return dm.xdoc.location.href.match("ajaxstatic");
}


var titleDoc;
var nameDoc;

// --------- Annoying intervening Ad pages ---------

function expediteAdPage()
{
    var i = location.href.indexOf("dest=");
    var redirUrl = "http:" + location.href.substring(i + 12);
    log.info("Ad page, skipping immediately to: " + redirUrl);
//     location.href = redirUrl;
}

// --------------- Title Page handler ---------------

function enhanceTitlePage()
{
    log.info("IMDb Title page");
    titleDoc = extendImdbTitleDocument(dm.xdoc);
    enhanceImdbPage(dm.xdoc);

    dispatchFeature("removeAds", function()
    {
        titleDoc.removeAds();
    });

    // Gallery Magnifier
//     titleDoc.foreachNode("//div[@class='media_strip_thumbs']//img[contains(@src, '._V1._CR')]", function(img) {
//         // substitute the larger image
//         img.src = img.src.replace("_V1._CR75,0,300,300_SS90_.jpg", "_V1._SY400_SX600_.jpg");
//         img.style.cssFloat = "none";
//         var a = img.selectNode("ancestor::a[1]");
//         var wrapper_div = a.wrapIn("div", {className: "iwvr_gallery_pic"} );
//         wrapper_div.style.minWidth = img.clientWidth;
//     });
//     titleDoc.addStyle(
//         "div.iwvr_gallery_pic:hover a img {\n"
//         + "    height: auto;\n"
//         + "    width:  auto;\n"
//         + "    position: absolute;\n"
//         + "    margin-top: +100px;\n"
//         + "    margin-left: -25px;\n"
//         + "}\n"
//     );

//    createImageMagnifiers(titleDoc, "_V1._CR", /_CR[0-9,_]*/, "_SX600_SY400_");

    dispatchFeature("title-headshotMagnifier", function()
    {
        var mag = prefs.get("title-headshotMagnification") || 12;
        var pixels = mag * 32;
        var fileSfx = "_V1._SX" + pixels + "_SY" + pixels + "_";
        createImageMagnifiers(titleDoc, "_V1._SX23_SY30_", /_SX\d+_SY\d+_/, fileSfx);
    });

    dispatchFeature("title-attributes", function()
    {
        addTitleAttrs();
    });

    // Display rating/runtime/language directly below title
    function addTitleAttrs()
    {
        var titleAttrs = new Array();

        var cert = titleDoc.getCertification();
        if (cert != null) {
            titleAttrs.push(cert);
        }
        var runtime = titleDoc.getRuntime();
        if (runtime != null) {
            var rt = runtime + " min";
            if (runtime > 60) {
                rt += " (" + formatHoursMinutes(runtime) + ")";
            }
            titleAttrs.push(rt);
        }
        var lang = titleDoc.getLanguage();
        if (lang != null) {
            titleAttrs.push(lang);
        }

        var languages = [];
        titleDoc.foreachNode("//a[contains(@href,'/language/')]", function(lang_a) {
            languages.push(lang_a.textContent);
        });
        titleAttrs.push(languages.join("/"));

        var title_div = titleDoc.selectNodeNullable("//div[@id='tn15title']");
        if (titleAttrs.length > 0) {
            title_div.appendChildText(titleAttrs.join(", "));
        }
    }

    function formatHoursMinutes(min)
    {
        var m = "0" + min % 60;  // (extra leading zero)
        var h = (min - m) / 60;
        return h + ":" + m.substring(m.length - 2);
    }

    addCastToolbar();

    function addCastToolbar()
    {
        var toolbar_span = titleDoc.createXElement("span", {id: "iwvr_casttoolbar"} );
        var quotedTitle = '"' + titleDoc.getTitle()  + '"';

        dispatchFeature("title-ShowAges", function()
        {
            var showCastAges_button = titleDoc.createXElement("button", {id: "iwvr_showCastAges"} );
            with (showCastAges_button) {
                className = "iwvr_button";
                textContent = "Show Ages";
                title = "Show cast ages when " + quotedTitle  + " was released in " + titleDoc.getTitleYear();
                addEventListener('click', showCastAges, false);
            }
            with (toolbar_span) {
                appendChildTextNbsp(3);
                appendChild(showCastAges_button);
            }
        });

        dispatchFeature("title-StartResearch", function()
        {
            var startResearch_button = titleDoc.createXElement("button", {id: "iwvr_startReasearch"} );
            with (startResearch_button) {
                className = "iwvr_button";
                addEventListener('click', startResearch, false);
                textContent = "Start Research...";
                title = "Mine additional information about " + quotedTitle;
            }
            with (toolbar_span) {
                appendChildTextNbsp(3);
                appendChild(startResearch_button);
            }
        });

        var cast_table = titleDoc.getCast_table();
        if (cast_table != null) {
            cast_table.prependSibling(toolbar_span);
        }
    }

    function showCastAges(event)
    {
        // prevent second execution on same page
        event.target.removeEventListener('click', showCastAges, false);

        // process each cast member name
        var nodeCount = 0;
        var ajaxOperationLimit = prefs.get("ajaxOperationLimit");
        titleDoc.foreachCastMember_tr
        (
            "//td[@class='nm']"
                + titleDoc.CAST_NAMES_A
                + "[not(following-sibling::span[@id='iwvr_age'])]",
            function(a_name)
            {
                if (nodeCount < ajaxOperationLimit || ajaxOperationLimit == -1)
                {
                    var titleDC = new DocumentContainer();
log.debug("%%%%% loadFromSameOrigin: " + a_name.href);
                    titleDC.loadFromSameOrigin(
                        // extract info from the cast member page
                        a_name.href,
                        function(doc) {
                            var nameDoc = extendImdbNameDocument(doc);
                            var titleYear = titleDoc.getTitleYear();
                            if (titleYear == null || titleYear == "") {
                                age = "?";
                            }
                            else {
                                var age = nameDoc.getAge(titleYear);
                                if (age == null)
                                    age = "?";
                            }
//                             var dd_a = nameDoc.selectNodeNullable("//a[contains(@href, 'death_date=')]");
//                             if (dd_a)
//                                 dd = " " + dd_a.textContent;
                            var age_span = titleDoc.createXElement("span", {id: "iwvr_age"} );
                            age_span.appendChildText(" (" + age + ")");
                            a_name.appendSibling(age_span);
                        }
                    );
                }
                nodeCount++;
            }
        )
        event.target.textContent = "Show More Ages";
        event.target.addEventListener('click', showCastAges, false);
    }

    function startResearch()
    {
        if (titleDoc.selectNodeNullable("//div[@id='iwvr_researchItems_dialog']")) {
            return;  // the dialog is already open
        }

        // make all names on page draggable
        titleDoc.foreachNode(
            titleDoc.CAST_NAMES_A,
            function(name_a) {
                name_a.className = "iwvr_researchable_item";
                name_a.addEventListener('draggesture', addResearchItem, false);
            }
        );

        function addResearchItem(event)
        {
            var original_item_a = event.target.parentNode;
            var dragged_item_a = original_item_a.cloneNode(true);

            var tip = titleDoc.selectNodeNullable("//*[@id='draggingTip']");
            if (tip != null)
                tip.remove();

            var ul = titleDoc.selectNode("//ul[@id='iwvr_research_itemlist']");
            var li = titleDoc.createXElement("li");
            li.appendChild(dragged_item_a);
            ul.appendChild(li);

            original_item_a.className = null;
            original_item_a.removeEventListener('draggesture', addResearchItem, false);
        };

        // present the Research dialog
        var researchDialog = new DialogBox(titleDoc, "Research");
        var researchDialog_div = researchDialog.createDialog(
                "iwvr_researchItems",
                "z-index: 999; position: fixed; bottom: 5px; right: 10px;",
                { OK: okResearch, Cancel: cancelResearch }
        );
        researchDialog.main_td.style.padding = "6px";
        with (researchDialog_div)
        {
            style.fontSize = "10pt";
            style.fontFamily = "Arial, Helvetica, sans-serif";

            researchDialog_div.style.overflow = "auto";

            var sel = titleDoc.createSelect(
                "Research",
                { name: "researchmode" },
                { tic: "Titles in common" }, "tic");
            appendChild(sel);

            var scroll_div = titleDoc.createXElement("div");
            with (scroll_div) {
                with (style) {
                    border = "1px inset Black"; margin = 4; padding = 5;
                    width = 200; height = 60; overflow = "auto";
                }

                var items_ul = titleDoc.createXElement("ul", {id: "iwvr_research_itemlist"} );
                with (items_ul.style) {
                    marginTop  = "0px"; paddingTop  = "0px";
                    marginLeft = "0px"; paddingLeft = "1em";
                }
                appendChild(items_ul);

                var tip_div = titleDoc.createXElement("div");
                tip_div.id = "draggingTip";
                with (tip_div.style) { color = "Gray";
                    width = "100%";  textAlign = "center";
                    height = "85%"; verticalAlign = "middle";
                }
                tip_div.appendChildText("Drag Names Here");
                appendChild(tip_div);
            }
            appendChild(scroll_div);

            var includes_div = titleDoc.createTopicDiv("Include");
            includes_div.style.borderColor = "DarkGreen";
//             includes_div.style.backgroundColor = "#66CC33";
            with (includes_div.contentElement)
            {
                appendChild(titleDoc.createCheckbox(
                    "Individual Episodes",
                    {id: "include-episodes"},
                    false
                ));
            }
            appendChild(includes_div);

            var excludes_div = titleDoc.createTopicDiv("Exclude Categories");
            excludes_div.style.borderColor = "#AA0000";
//             excludes_div.style.backgroundColor = "#FF3300";
            with (excludes_div.contentElement)
            {
                appendChild(titleDoc.createCheckbox(
                    "Self",
                    {id: "exclude-self", title: "Examples: Oprah, Letterman"},
                    true
                ));
                appendChildElement("br");
                appendChild(titleDoc.createCheckbox(
                    "Archive Footage",
                    {id: "exclude-archive-footage"},
                    true
                ));
            }
            appendChild(excludes_div);
        }
    }

    function okResearch(doc)
    {
        var titleDoc = extendImdbTitleDocument(doc);

        // get URLs of selected research items
        var peopleUrls = new Array();
        titleDoc.foreachNode("//ul[@id='iwvr_research_itemlist']//a", function(name_a) {
            peopleUrls.push(name_a.href);
        });

        var includeEpisodes = titleDoc.selectNode("//input[@id='include-episodes']").checked;

        var omitCategories = new Array();
        if (titleDoc.selectNode("//input[@id='exclude-self']").checked)
            omitCategories.push("self");
        if (titleDoc.selectNode("//input[@id='exclude-archive-footage']").checked)
            omitCategories.push("archive");

        endResearch(titleDoc);
        if (peopleUrls.length > 0) {
            correlatePeople(peopleUrls, includeEpisodes, omitCategories);
        }
    }

    function cancelResearch(doc)
    {
        var titleDoc = extendImdbTitleDocument(doc);
        endResearch(titleDoc);
    }

    function endResearch(titleDoc)
    {
        // remove class="iwvr_researchable_item"
        titleDoc.foreachNode(
            titleDoc.CAST_NAMES_A,
            function(name_a) {
                name_a.className = null;
            }
        );
    }

    var DEFAULT_JOB_ABBREVS = {
        "A":  "Actor",
        "A'": "Actress",
        "D":  "Director",
        "P":  "Producer",
        "PD": "Production Designer",
        "W":  "Writer",
        "C":  "Composer",
        "ST": "Soundtrack",
        "AD": "Art Department",
        "MC": "Miscellaneous Crew",
        "S":  "Self",
        "Ar": "Archive Footage"
    };

    // gather credits for specified people and
    // determine what titles they have in common
    function correlatePeople(urlList, includeEpisodes, omitCatList)
    {
// foreach (var User in Users)
// {
//   <div class="action-time">[ActionSpan(User)]</div>
//   if (User.IsAnonymous)
//   {
//     <div class="gravatar32">[RenderGravatar(User)]</div>
//     <div class="details">[UserRepSpan(User)]<br/>[UserFlairSpan(User)]</div>
//   }
//   else
//   {
//     <div class="anon">anonymous</div>
//   }
// }
        var jobAbbrevs = new AbbreviationMap(DEFAULT_JOB_ABBREVS);

        var jointCredits_a = new Array();
        var nameSet_a = new Array();

        withDocuments(
            urlList,  // gather credits from each person's page
            function(doc) {
                var nameDoc = extendImdbNameDocument(doc);
                var name_a = nameDoc.getName_a();
                nameSet_a.push(name_a);
                jointCredits_a = jointCredits_a.concat(
                    nameDoc.getCredits_a( {imdbName_a: name_a}, includeEpisodes, omitCatList)
                );
            },
            function(docList)
            {
                // sort combined credits (by url)
                sortBy(jointCredits_a, ["href"] );
                sortBy(nameSet_a, ["textContent"] );

                var creditsInCommon_a = new Array();
                var soloCreditCount = 0;
                foreachGrouping(jointCredits_a, "href", function(creds_a)
                {
                    if (creds_a.length < 2) {
                        soloCreditCount++;
                        return;  // exclude where not in common with anybody else
                    }

                    var nameJobMap = new Array();
                    for (var c in creds_a) {
                        var jobList = jobAbbrevs.registerList(creds_a[c].categoryList);
                        nameJobMap[creds_a[c].propertySet.imdbName_a] = jobList;
                    }

                    var combo_a = creds_a[0].cloneNode(true);
                    combo_a.nameJobMap = nameJobMap;

                    creditsInCommon_a.push(combo_a);
                });

                // sort combined credits (by title)
                sortBy(creditsInCommon_a, ["textContent"] );

                // create information popup
                var resultsWindow = new DialogBox(titleDoc, "Research Results");
                var resultsWindow_div = resultsWindow.createDialog(
                        "iwvr_creditsInCommon",
                        "z-index: 999; position: fixed; left: 15px; top: 20px;",
                        { X: noop }
                );
                resultsWindow.main_td.style.padding = "6px";
                with (resultsWindow_div)
                {
                    style.maxWidth = window.innerWidth - 70;
                    style.maxHeight = window.innerHeight - 90;
//                     style.overflow = "auto";

                    // construct the data table
                    var i = 1;
                    var table = titleDoc.createXElement("table", {className: "iwvr_results"} );
                    var caption = titleDoc.createXElement("caption");
                    caption.appendChildText("Credits in common", ["b"]);
                    table.appendChild(caption);
                    var cellAttrList = [
                        {className: "iwvr_results bulletcol"},
                        {className: "iwvr_results titlecol"}
                    ].concat(
                        dup(nameSet_a.length, {className: "iwvr_results datacol"} )
                    );
                    var thead = titleDoc.createXElement("thead");
                    thead.appendTableRow([null, "Title"].concat(nameSet_a), cellAttrList);
                    table.appendChild(thead);
                    var tbody = titleDoc.createXElement("tbody");
                    for (var c in creditsInCommon_a)
                    {
                        var rowSet = initArrayIndices(2 + nameSet_a.length);
                        rowSet[0] = i + ")";
                        var credit_span = titleDoc.createXElement("span");
                        if (creditsInCommon_a[c].seriesTitle != null) {
                            credit_span.appendChildText(creditsInCommon_a[c].seriesTitle);
                        }
                        credit_span.appendChild(creditsInCommon_a[c]);
                        rowSet[1] = credit_span;
                        for (var name_a in creditsInCommon_a[c].nameJobMap) {
                            var jobList = creditsInCommon_a[c].nameJobMap[name_a];
                            var col = 2 + parseInt(arrayIndexOf(nameSet_a, name_a));
                            rowSet[col] = jobList.sort().join(", ");
                        }
                        tbody.appendTableRow(rowSet, cellAttrList);
                        i++;
                    }
                    var legend_div = jobAbbrevs.toLegend("div",
                        { className: "iwvr_results_legend" } );
                    tbody.appendTableRow(
                        [ legend_div ],
                        [ { colSpan: (2 + nameSet_a.length) } ]
                    );
                    table.appendChild(tbody);

                    appendChild(table);
                }
            }
        );
    }
}


function dup(count, value) {
    var returnValue = new Array();
    for (var i = 0; i < count; i++) {
        returnValue.push(value);
    }
    return returnValue;
}

// --------------- Name Page handler ---------------

function enhanceNamePage()
{
    log.info("IMDb Name page");
    var nameDoc = extendImdbNameDocument(dm.xdoc);
    enhanceImdbPage(dm.xdoc);

    dispatchFeature("removeAds", function()
    {
        nameDoc.removeAds();
    });

    dispatchFeature("name-headshotMagnifier", function()
    {
        createImageMagnifiers(nameDoc, "_V1._SX32_", /_SX\d+_/, "_SX98_SY140_");
    });

    var birthInfo_div = nameDoc.selectNodeNullable(
        "//a[contains(@href, 'birth_year=')]/ancestor::div[1]");
    var age = nameDoc.getAge();

    var deathInfo_div = nameDoc.selectNodeNullable(
        "//a[contains(@href, 'death_date=')]/ancestor::div[1]");
    var ageDeath = nameDoc.getAgeDeath();

    dispatchFeature("highlightTitleTypes", function()
    {
        // first defeat the site's regular even/odd row highlighting
        nameDoc.foreachNode("//tbody[contains(@class, 'row-filmo-')]", function(tbody)
        {
            tbody.style.backgroundColor = "White";
        });
        // now add custom highlighting
        highlightTitleTypes(titleHighlighers);
        function highlightTitleTypes(hSpecs)
        {
            for (var color in hSpecs) {
                var matchStrs = hSpecs[color];
                for (var i in matchStrs) {
                    nameDoc.foreachNode([
                        "//text()[contains(., '" + matchStrs[i] + "')]//ancestor-or-self::tbody[1]",
                        "//text()[contains(., '" + matchStrs[i] + "')]//ancestor-or-self::li[1]"
                    ],
                    function(item)
                    {
                        item.style.backgroundColor = color;
                    });
                }
            }
        }
    });

    dispatchFeature("name-ShowAge", function()
    {
        if (birthInfo_div == null || age == null) {
            log.info("name-ShowAge: no birth year");
        }
        else {
            birthInfo_div.appendChildElement("br");
            birthInfo_div.appendChildText(
                ((nameDoc.getDeathDetails_div() != null) ? "would be " : "is ")
                + age + " years old"
            );
        }

        if (deathInfo_div == null || ageDeath == null) {
            log.info("name-ShowAge: no death year");
        }
        else {
            deathInfo_div.appendChildElement("br");
            deathInfo_div.appendChildText(
                "at age " + ageDeath
            );
        }
    });

    dispatchFeature("name-ShowAgeAtTitleRelease", function()
    {
        // if we are arriving at a person's page from a specific title page
        if (dm.xdoc.referrer.match("imdb.com/title"))
        {
            // trim all but base title URL, (could be arriving from other detail pages)
            dm.xdoc.referrer.match(/(.*tt\d*)/);
            var referrerUrl = RegExp.$1;

            var nameDC = new DocumentContainer();
            nameDC.loadFromSameOrigin(
                // use info from the referring title page
                referrerUrl,
                function(doc)
                {
                    var titleDoc = extendImdbTitleDocument(doc);
                    var titleYear = titleDoc.getTitleYear();
                    var ageThen;
                    if (titleYear == null || titleYear == "") {
                        ageThen = "?";
                    }
                    else {
                        ageThen = nameDoc.getAge(titleYear);
                        if (ageThen == null)
                            ageThen = "?";
                    }

                    if (birthInfo_div == null || age == null) {
                        log.info("name-ShowAgeAtTitleRelease: no birth year");
                        return;
                    }

                    birthInfo_div.appendChildElement("br");
                    var t;
                    if (titleYear > (new Date()).getFullYear())
                        t = '(will be ' + ageThen
                            + ' when "' + titleDoc.getTitle()
                            + '" releases in ' + titleYear + ')'
                        ;
                    else
                        t = '(was ' + ageThen
                            + ' when "' + titleDoc.getTitle()
                            + '" was released in ' + titleYear + ')'
                        ;
                    birthInfo_div.appendChildText(t);
                }
            );
        }
        else {
            if (dm.xdoc.referrer == "") {
                log.warn("The name-ShowAgeAtTitleRelease option is enable"
                    + " , but document.referrer is empty. REFERRER MAY BE DISABLED."
                );
            }
        }
    });
}

// --------------- Find Page handler ---------------

function enhanceFindPage()
{
    log.info("IMDb Find page");
    var findDoc = extendImdbNameDocument(dm.xdoc);
    enhanceImdbPage(dm.xdoc);

    // assign access key to first matching item
    var accessKey = prefs.get("firstMatchAccessKey");
    if (accessKey != null)
    {
        // first text link to "/rg/find-", that is inside a TD
        var firstMatch_a = findDoc.selectNodeNullable(
                    "//td/a[not(img)][contains(@onclick, '/rg/find-')][1]");
        if (firstMatch_a != null) {
            firstMatch_a.accessKey = accessKey.toUpperCase();
            var itemNum_td = firstMatch_a.selectNodeNullable("preceding::td[1]");
            if (itemNum_td != null) {
                var span = findDoc.createXElement("span");
                span.appendChildText("[" + accessKey + "]");
                firstMatch_a.href.match(/\/(\w+)\//);
                var linkType = RegExp.$1; // "title" or "name"
                span.title = "Alt-Shift-" + accessKey + " to go to this " + linkType;
                span.style.fontWeight = "bold";
                itemNum_td.innerHTML = "";
                itemNum_td.appendChild(span);
            }
        }
    }

    dispatchFeature("highlightTitleTypes", function()
    {
        highlightTitleTypes(titleHighlighers);
        function highlightTitleTypes(hSpecs)
        {
            for (var color in hSpecs) {
                var matchStrs = hSpecs[color];
                for (var i in matchStrs) {
                    findDoc.foreachNode("//a[contains(@onclick, '/rg/find-title')]/ancestor::table[1]//text()[contains(., '" + matchStrs[i] + "')]"
                        + "//ancestor-or-self::td[1]", function(item)
                    {
                        item.style.backgroundColor = color;
                    });
                }
            }
        }
    });

//     // Poster Magnifier
//     findDoc.foreachNode("//a[contains(@href, 'title-tiny')]/img", function(img) {
//         // substitute the larger image
//         img.src = img.src.replace(/(\d)t\.(jpg|png|gif)$/, "$1m.$2");
//         img.className = "iwvr_headshot";
//         img.height = null;
//         img.width = null;
//     });
//     titleDoc.addStyle(
//         "img.iwvr_headshot { height: 32px; width: 22px; }\n"
//         + "td:hover img.iwvr_headshot {\n"
//         + "    height: auto;\n"
//         + "    width:  auto;\n"
//         + "    position: absolute;\n"
//         + "    margin-top:   -59px;\n"
//         + "    margin-left: -125px;\n"
//         + "}\n"
//     );
}

// --------------- Find Page handler ---------------

function enhanceUpdatePage()
{
    log.info("IMDb updates page");

    // assign access key to first matching item
    var accessKey = prefs.get("firstMatchAccessKey");
    if (accessKey)
    {
        var updateDoc = extendDocument(dm.xdoc);
        // first update item
        var firstMatch_a = updateDoc.selectNodeNullable("(//a[contains(@href, 'update?load=')])[1]");
        if (firstMatch_a) {
            firstMatch_a.accessKey = accessKey.toUpperCase();
            var item_td = firstMatch_a.selectNodeNullable("ancestor::td[1]");
            if (item_td) {
                var span = updateDoc.createXElement("span");
                span.appendChildText("[" + accessKey + "]");
                span.style.fontWeight = "bold";
                item_td.prependChild(span);
            }
        }
    }
}

// --------------- Find Page handler ---------------

function enhanceImdbPage(imdbDoc)
{
log.info("enhanceImdbPage");
    imdbDoc.removeAds();

    var navbar_div = imdbDoc.selectNodeNullable("//div[@id='nb20']");
    if (navbar_div != null) {
        navbar_div.makeCollapsible("all-topnav-isExpanded", true);
    }
}


// --------------- Title Page extensions ---------------

function extendImdbTitleDocument(titleDoc)
{
    if (titleDoc == null)
        return null;

    extendImdbDocument(titleDoc);

    titleDoc.removeAds_super = titleDoc.removeAds;
    titleDoc.removeAds = function()
    {
        this.removeAds_super();

        titleDoc.foreachNode([
             "//div[@id='tn15shopbox']"
            ,"//div[@id='tn15adrhs']"
            ,"//div[starts-with(@id, 'banner')]"
            ,"//div[@id='tn15tc']"
//            ,"//a[contains(href, NAVSTRIP)]"
            ], function(node) {
                node.remove();
                log.debug("Removing ad element: <" + node.tagName + " id=" + node.id);
            }
        );
    }

    titleDoc.getTitle = function()
    {
        var title;
        var poster_a = this.selectNodeNullable("//a[@name='poster']");
        if (poster_a != null) {
            title = poster_a.title;
        }
        else {
            var title_span = this.selectNode("//title/text()");
            title = title_span.textContent.replace(/\(\d\d\d\d\)/, "");
        }
        return title.stripQuoteMarks().normalizeWhitespace();
    };

    titleDoc.getTitle_a = function()
    {
        var a = this.createXElement("a");
        a.href = this.location.href;
        a.appendChildText(this.getTitle());
        return a;
    }

    titleDoc.getTitleYear = function() {
        var year;

        var airDate = this.selectTextContent(
            "//*[text()='Original Air Date:']/following-sibling::*[1]/text()");
        if (airDate != null) {
            airDate.match(/\d+ \w+ (\d\d\d\d)/);
            year = RegExp.$1;
            return year;
        }

        var year = this.selectTextContent(
            "//div[@id='tn15title']//a[contains(@href, '/year/')]/text()");

        return year;
    };

    titleDoc.getUserRating = function() {
        var userRating = this.selectTextContent(
            "//*[contains(text(), 'User Rating:')]/following-sibling::*[1]");
        if (userRating == null)
            return null;
        userRating = userRating.split("/");
        return userRating[0] / userRating[1];
    };

    titleDoc.getRuntime = function() {
        var runtime_text = this.selectNodeNullable(
            "//*[text()='Runtime:']/following-sibling::*[1]/text()");
        if (runtime_text == null) {
            return null;
        }
        var runtime = runtime_text.textContent.match(/(\d+)/);
        return RegExp.$1;
    };

    titleDoc.getCertification = function(country) {
        if (country == null) {
            country = "USA";
        }
        var cert = this.selectTextContent(
            "//a[starts-with(@href, concat('/List?certificates=', '" + country + ":'))]");
        return cert;
    };

    titleDoc.getLanguage = function() {
        var lang_a = this.selectNodeNullable(
            "//a[starts-with(@href, '/Sections/Languages/')]");
        if (lang_a == null) {
            return null;
        }
        return lang_a.textContent;
    };

    titleDoc.CAST_TABLE =
        "//table[@class='cast']"
    ;
    titleDoc.CAST_NAMES_A = "//a[starts-with(@href, '/name/')]";
    titleDoc.CHARACTER_NAME_A = "//a[@href='quotes']";

    titleDoc.foreachCastMember_tr = function(relativeXpath, func)
    {
        this.foreachNode(
            titleDoc.CAST_TABLE
            + "//tr"
            + relativeXpath,
            func
        );
    }

    titleDoc.getCast_table = function() {
        return this.selectNodeNullable(titleDoc.CAST_TABLE);
    };

    log.debug(
        "extendImdbTitleDocument: "
        + "title='" + titleDoc.getTitle() + "'"
        + ", titleYear=" + titleDoc.getTitleYear()
        + ", userRating=" + titleDoc.getUserRating()
    );

    return titleDoc;
}


// --------------- Title Page extensions ---------------

function extendImdbNameDocument(nameDoc)
{
    if (nameDoc == null)
        return null;

    extendImdbDocument(nameDoc);

    nameDoc.removeAds_super = nameDoc.removeAds;
    nameDoc.removeAds = function()
    {
        this.removeAds_super();

        var ad_div = nameDoc.selectNodeNullable("//div[@id='tn15adrhs']");
        if (ad_div != null) {
            ad_div.remove();
        }
    }

    nameDoc.getName = function() {
        return this.selectTextContent("//title");
    };

    nameDoc.getName_a = function()
    {
        var a = this.createXElement("a");
        a.href = this.location.href;
        a.appendChildText(this.getName());
        return a;
    }

    nameDoc.getAge = function(refYear) {
        if (refYear == null) {
            refYear = (new Date()).getFullYear();
        }
        var birthYear = this.getBirthYear();
        if (birthYear == null) {
            return null;
        }
        var age = refYear - birthYear;
        if (isNaN(age)) {
            return "??";
        }
        else {
            return age;
        }
    };

    nameDoc.getBirthYear = function() {
        var birthYear_a = this.selectNodeNullable(
            "//a[contains(@href, 'birth_year=')]"
        );
        if (birthYear_a == null)
            return null;
        else
            return birthYear_a.textContent;
    };

    nameDoc.getBirthDetails_end = function() {
        var birthDetails_end = this.selectNodeNullable(
            "//a[contains(@href, 'birth_year=')]"
            + "/following::br[1]"
        );
        return birthDetails_end;
    }

    nameDoc.getAgeDeath = function() {
        var deathYear = this.getDeathYear();
        if (deathYear == null) {
            return null;
        }
        var ageDeath = deathYear - this.getBirthYear();
        if (isNaN(ageDeath)) {
            return "??";
        }
        else {
            return ageDeath;
        }
    };

    nameDoc.getDeathYear = function() {
        var deathYear_a = this.selectNodeNullable(
            "//a[contains(@href, 'death_date=')]"
        );
        if (deathYear_a == null)
            return null;
        else
            return deathYear_a.textContent;
    };

    nameDoc.getDeathDetails_div = function() {
        return this.selectNodeNullable(
            "//*[contains(@href, 'death_date=')]"
            + "//ancestor::div[1]"
        );
    }

    nameDoc.CREDIT_CATEGORIES_A =
        "//a[starts-with(@href, '/title/')]"
        + "/ancestor::div[@class='filmo']/descendant::a[@name][1]";

    // Get all the credits on this page, grouped by title.
    // The list of job categories is attached to each "merged" title reference.
    nameDoc.getCredits_a = function(propSet, includeEpisodes, omitCatList)
    {
        var creditList_a = new Array();
        nameDoc.foreachNode(  // Director, Writer, Actor, etc
            nameDoc.CREDIT_CATEGORIES_A,
            function (category_a)
            {
                var catLabel = category_a.textContent.replace(/:/, "");
                if (arrayIndexOf(omitCatList, category_a.name))
                    return;

                var matchCredits = "//a[@name='" + category_a.name + "']"
                    + "/following::ol[1]/li/a[1]";

                nameDoc.foreachNode(  // each credit within a category
                    matchCredits,
                    function (credit_a) {
                        credit_a.category = catLabel;
                        if (propSet != null) {
                            credit_a.propertySet = propSet;
                        }
                        creditList_a.push(credit_a);

                        if (includeEpisodes) {
                            credit_a.foreachNode(  // each sub-credit within a credit
                                "following-sibling::a",
                                function (subCredit_a) {
                                    subCredit_a.category = catLabel;
                                    if (propSet != null) {
                                        subCredit_a.propertySet = propSet;
                                    }
                                    subCredit_a.seriesTitle = credit_a.textContent;
                                    creditList_a.push(subCredit_a);
                                }
                            );
                        }
                });
        });

        return mergeCreditCategories(creditList_a);

        // for each title combine multiple credits into a single object
        // with an array property that lists the category names
        function mergeCreditCategories(creditList_a)
        {
            sortBy(creditList_a, ["href"] );

            var mergedCredits = new Array();
            foreachGrouping(creditList_a, "href", function(creds_a)
            {
                var catList = new Array();
                for (var i in creds_a) {
                    catList.push(creds_a[i].category);
                }

                // reuse first element as a protoype
                var combined_a = creds_a[0].cloneNode(true);
                combined_a.textContent = combined_a.textContent.stripQuoteMarks();
                combined_a.category = null;
                combined_a.categoryList = catList;
                combined_a.propertySet = creds_a[0].propertySet;

                mergedCredits.push(combined_a);
            });
            return mergedCredits;
        }
    }

    log.debug(
        "extendImdbNameDocument: "
        + "name='" + nameDoc.getName() + "'"
        + ", birthYear='" + nameDoc.getBirthYear() + "'"
        + ", age=" + nameDoc.getAge()
    );

    return nameDoc;
}


// --------------- IMDb Page extensions ---------------

function extendImdbDocument(imdbDoc)
{
    extendDocument(imdbDoc);

    addPrefsButton();

    imdbDoc.removeAds = function()
    {
        log.debug("imdbDoc.removeAds");
        this.foreachNode("//div[starts-with(@id, 'swf_')]", function(node) {
                node.remove();
                log.debug("Removing ad element: <" + node.tagName + " id=" + node.id);
            }
        );
//         log.debug("sweeping for DOUBLECLICK:");
//         this.foreachNode("//img[contains(@src, 'doubleclick.net')]/ancestor::d[1]", function(node) {
//                 node.remove();
//                 log.debug("Removing DOUBLECLICK ad div");
//             }
//         );
        this.removeFlashAds();
 
        // experimental
//         this.foreachNode("//area[@alt='Learn more']", function(div) {
//                 div.remove();
//                 log.debug("REMOVING NAVSTRIPE AD");
//             }
//         );
//         this.foreachNode("//a[contains(@href, '_NAVSTRIPE')]//ancestor::div[1]", function(div) {
//                 div.remove();
//                 log.debug("REMOVING NAVSTRIPE AD");
//             }
//         );
        this.foreachNode(
            "//div[starts-with(@id, 'swf_')]",
            function(ad_div) {
                log.debug("REMOVING FLOATER AD");
                ad_div.hideNode();
            }
        );
//         this.removeFloaterAds();
//         imdbDoc.onAppears("//div[starts-with(@id, 'swf_')]", 500, function(ad_div)
//         {
//             log.debug("Removing floater ad");
// alert("Removing floater ad");
//             ad_div.hide();
//         });
    }

    imdbDoc.removeFlashAds = function()
    {
        this.foreachNode(
            "//comment()[contains(., 'FLASH AD BEGINS')]",
            function(adbegin_cmt) {
//                 log.info("COMMENT< '" + adbegin_cmt.textContent + "'");
//                 var adend_cmt = adbegin_cmt.selectNodeNullable(
//                     "//following-sibling::comment()[contains(., 'FLASH AD ENDS')][1]");
//                 if (adend_cmt != null) {
//                     log.info("COMMENT> '" + adend_cmt.textContent + "'");
//                 }
                var ad_div = adbegin_cmt.nextSibling.nextSibling;
                if (ad_div != null) {
                    log.debug("Removing ad element: <" + ad_div.tagName + " id=" + ad_div.id);
                    ad_div.parentNode.removeChild(ad_div);
                }
            }
        );
    }

    // buttons
    imdbDoc.addStyle(
        ".iwvr_button {\n"
        + "    font-size: 8pt;\n"
        + "    font-family: Helvetica Narrow, sans-serif;\n"
        + "}\n"
    );

    // research items
    imdbDoc.addStyle(
          "a.iwvr_researchable_item { background-color: Gold; }\n"
        + "a.iwvr_researchable_item:hover { cursor: crosshair; }\n"
    );

    // research result grid styles
    imdbDoc.addStyle(
          ".iwvr_results {\n"
        + "    padding: 3;\n"
        + "    font-family: Arial Narrow, Helvetica Narrow, sans-serif;\n"
        + "    font-size: small;\n"
        + "}\n"

        + "table.iwvr_results {\n"
        + "    border-collapse: collapse;\n"
        + "    font-family: Arial, Helvetica, sans-serif;\n"
        + "}\n"

        + "td.iwvr_results {\n"
        + "    border: 1px solid Gray;\n"
        + "    padding: 3;\n"
        + "}\n"

        + "div.iwvr_results_legend {\n"
        + "    max-width: 100%;\n"
        + "    text-align: center;\n"
        + "}\n"

        + "td.bulletcol { text-align: right; }\n"
        + "td.titlecol { text-align: left; }\n"
        + "td.datacol { text-align: center; }\n"
    );

    return imdbDoc;
}

// --------------- helper functions ---------------

function createImageMagnifiers(theDoc, imgUrlContains, imgUrlRegex, imgUrlReplacement)
{
    // Headshot Magnifier
    theDoc.foreachNode("//img[contains(@src, '" + imgUrlContains + "')]", function(img) {
        if (img.src.indexOf("addtiny.gif") != -1) {
           return;  // skip place-holders
        }
        // substitute the larger image
        img.src = img.src.replace(imgUrlRegex, imgUrlReplacement);
        img.className = "iwvr_headshot";
        img.height = null;
        img.width = null;
    });
    theDoc.addStyle(
        "img.iwvr_headshot { height: 30px; width: 23px; }\n"
        + "td:hover img.iwvr_headshot {\n"
        + "    height: auto;\n"
        + "    width:  auto;\n"
        + "    z-index: 999;\n"
        + "    position: fixed;\n"
        + "    top: 5%;\n"
        + "    right: 5%;\n"
        + "}\n"
    );
        // zoom visualization graphic
//         var zoom_img = dm.xdoc.createXElement("img");
//         with (zoom_img.style) {
//            position = "absolute";
//            top = "614px";
//            left = "145px";
//         }
//         var zoom_img_src = 'data:image/gif;base64,' +
//             'R0lGODlhGACCAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD/AP//AAAA//8A/wD/////' +
//             '/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
//             'AAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA/wAzAAAzMwAzZgAzmQAzzAAz/wBmAABmMwBmZgBm' +
//             'mQBmzABm/wCZAACZMwCZZgCZmQCZzACZ/wDMAADMMwDMZgDMmQDMzADM/wD/AAD/MwD/ZgD/mQD/zAD/' +
//             '/zMAADMAMzMAZjMAmTMAzDMA/zMzADMzMzMzZjMzmTMzzDMz/zNmADNmMzNmZjNmmTNmzDNm/zOZADOZ' +
//             'MzOZZjOZmTOZzDOZ/zPMADPMMzPMZjPMmTPMzDPM/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYA' +
//             'mWYAzGYA/2YzAGYzM2YzZmYzmWYzzGYz/2ZmAGZmM2ZmZmZmmWZmzGZm/2aZAGaZM2aZZmaZmWaZzGaZ' +
//             '/2bMAGbMM2bMZmbMmWbMzGbM/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5kzAJkz' +
//             'M5kzZpkzmZkzzJkz/5lmAJlmM5lmZplmmZlmzJlm/5mZAJmZM5mZZpmZmZmZzJmZ/5nMAJnMM5nMZpnM' +
//             'mZnMzJnM/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wzAMwzM8wzZswzmcwzzMwz' +
//             '/8xmAMxmM8xmZsxmmcxmzMxm/8yZAMyZM8yZZsyZmcyZzMyZ/8zMAMzMM8zMZszMmczMzMzM/8z/AMz/' +
//             'M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8zAP8zM/8zZv8zmf8zzP8z//9mAP9mM/9mZv9m' +
//             'mf9mzP9m//+ZAP+ZM/+ZZv+Zmf+ZzP+Z///MAP/MM//MZv/Mmf/MzP/M////AP//M///Zv//mf//zP//' +
//             '/ywAAAAAGACCAAAI/wAfCBxIsKBBgggOKlSIIOHChwIbQoTY0OHEgxUvMsyosWBFix0jcgwpcmTIjyA7' +
//             'okx5cSXJBy5JrmRJMabKmSdx3tTZcibNjTwn+pTY06fGoURrDi26VGnTh0iTLowqFSNVp0ihUv1Z8ipQ' +
//             'r1a3Tt1adSDZsl3FGjyLli1NtyzhrpWLkK5ZuCDx5sVbl29atnf1/gUMU69Dw4cNDz67mGxjtYgfe41c' +
//             'WHBlv5QzK75MV7Nlz5g3g+4suvRn06FPq07N2m1gu5YlP+XM+HVt24773sYNlnfWubt9zxYeVHdv47/D' +
//             'HkdudOxy5sU9PoeOEmt04MOVX8e+XXpzodm/2i60bpI8WvHlzeesvv6jzPFMz2t1/z59/JeX8efHT/+l' +
//             '/aPygaefSAPCVOCBDwQEADs=';
//         zoom_img.src = zoom_img_src;
//         titleDoc.body.appendChild(zoom_img);
//         zoom_img.hide();
}


// ==================== AbbreviationMap object ====================

function AbbreviationMap(initMap)
{
    this.map = initMap;

    if (this.map == null) {
        this.map = new Array();
    }

    this.register = function(value)
    {
        var abbrev = arrayIndexOf(this.map, value);
        if (abbrev != null)
            return abbrev;

        for (var len = 1; len < value.length; len++)
        {
            var abbrev = value.substring(0, len);
            if (this.map[abbrev] == null) {
                this.map[abbrev] = value;
                return abbrev;
            }
        }
        throw "Can't abbreviate: '" + value + "'";
    }

    this.registerList = function(theList)
    {
        var abbrevList = new Array();
        for (var i in theList) {
            abbrevList.push(this.register(theList[i]));
        }
        return abbrevList;
    }

    this.toLegend = function(elemType, attrMap)
    {
//         var dm.xdoc = extendDocument(document);
        var node = dm.xdoc.createXElement(elemType, attrMap);
        with (node) {
            for (var i in this.map) {
                appendChildText(i);
                appendChildText(':\u00A0"');
                appendChildText(this.map[i]);
                appendChildText('"');
                appendChildText(' - ');
            }
        }
        return node;
    }
}


// ==================== Preferences Dialog ====================

function addPrefsButton()
{
    configurePrefsButton(function(prefsMgr, prefsDialog_div)
    {
        var table = dm.xdoc.createXElement("table");
        prefsDialog_div.appendChild(table);

        var tr = dm.xdoc.createXElement("tr");
        table.appendChild(tr);

        var td = dm.xdoc.createXElement("td");
        td.style.verticalAlign = "top";
        tr.appendChild(td);
        with (td)
        {
            var features_div = dm.xdoc.createTopicDiv("Enabled Features", td);
            appendChild(features_div);
            with (features_div.contentElement)
            {
                var genFeatures_div = dm.xdoc.createTopicDiv("All Pages", features_div);
                appendChild(genFeatures_div);
                with (genFeatures_div.contentElement)
                {
                    appendChild(prefsMgr.createPreferenceInput(
                        "highlightTitleTypes",
                        "Highlight titles by type",
                        "white: theatrical release / gold: direct to video / blue: TV / pink: video game"
                    ));
                    appendChildElement("br");
                    appendChild(prefsMgr.createPreferenceInput(
                        "removeAds",
                        "Remove advertising",
                        "Remove advertising"
                    ));
                }

                var titleFeatures_div = dm.xdoc.createTopicDiv("On Title Pages", features_div);
                appendChild(titleFeatures_div);
                with (titleFeatures_div.contentElement)
                {
                    appendChild(prefsMgr.createPreferenceInput(
                        "title-attributes",
                        "Display title attributes",
                        "Display rating/runtime/language directly below title"
                    ));
                    appendChildElement("br");
                    appendChild(prefsMgr.createPreferenceInput(
                        "title-ShowAges",
                        "[Show Ages] button",
                        "Compute the ages of cast members"
                    ));
                    appendChildElement("br");
                    appendChild(prefsMgr.createPreferenceInput(
                        "title-StartResearch",
                        "[Start Research] button",
                        "Open the Research dialog"
                    ));
                    appendChildElement("br");
                    appendChild(prefsMgr.createPreferenceInput(
                        "title-headshotMagnifier",
                        "Headshot Magnifier",
                        "Hover mouse to magnify cast pictures"
                    ));
                    appendChildElement("br");
                    appendChild(prefsMgr.createPreferenceInput(
                        "title-headshotMagnification",
                        "Mag level",
                        "Magnification factor",
                        { size:2, maxLength: 2 }
                    )).style.marginLeft = "28px";
                }

                var nameFeatures_div = dm.xdoc.createTopicDiv("On Name Pages", features_div);
                appendChild(nameFeatures_div);
                with (nameFeatures_div.contentElement)
                {
                    appendChild(prefsMgr.createPreferenceInput(
                        "name-ShowAge",
                        "Display age",
                        "Display current age of the person"
                    ));
                    appendChildElement("br");
                    appendChild(prefsMgr.createPreferenceInput(
                        "name-ShowAgeAtTitleRelease",
                        "Display age at release",
                        "Display age at time title was released"
                    ));
                }

                var findFeatures_div = dm.xdoc.createTopicDiv("On Search Results", features_div);
                appendChild(findFeatures_div);
                with (findFeatures_div.contentElement)
                {
                    appendChild(prefsMgr.createPreferenceInput(
                        "firstMatchAccessKey",
                        "Select first match",
                        "Alt-Shift keyboard to navigate to first title matched",
                        { size:1, maxLength: 1 }
                    ));
                }
            }
        }

        var td = dm.xdoc.createXElement("td");
        td.style.verticalAlign = "top";
        tr.appendChild(td);
        with (td) {
            appendChild(prefsMgr.constructDockPrefsMenuSection(td));
            appendChild(prefsMgr.constructAdvancedControlsSection(td));

            var controls_div = dm.xdoc.createTopicDiv("Performance Controls", td);
            with (controls_div.contentElement)
            {
                appendChild(prefsMgr.createPreferenceInput(
                    "ajaxOperationLimit",
                    "Background threads",
                    "Control how many simultaneous background operations are allowed"
                        + ", (primarily affects Show Ages)",
                    { size:1, maxLength: 2 }
                ));
            }
            appendChild(controls_div);
        }

        // Help link
        var docs_div = dm.xdoc.createXElement("div");
        prefsDialog_div.appendChild(docs_div);
        with (docs_div) {
            appendChild(dm.xdoc.createHtmlLink(
                "http://refactoror.com/greasemonkey/imdbWeaver/doc.html#prefs",
                "Help"
            ));
            align = "center";
            style.padding = "3px";
        }
    });
}


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-= refactoror lib -=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// common logic for the way I like to setup Preferences in my apps
// Requires preferences: prefsMenuAccessKey, prefsMenuPosition, prefsMenuVisible, loggerLevel
function configurePrefsButton(dialogConstructor)
{
    // Preferences dialog
    GM_registerMenuCommand(dm.metadata["name"] + " Preferences...", openPrefsDialog);
    createPrefsButton();

    // Prefs dialog
    function createPrefsButton()
    {
        var menuButton = dm.xdoc.createXElement("button", { textContent: "Prefs" });
        setScreenPosition(menuButton, prefs.get("prefsMenuPosition"));
        if (prefs.get("prefsMenuVisible") == false) {
            menuButton.style.opacity = 0; // active but not visibile
            menuButton.style.zIndex = -1; // don't block other content
        }

        with (menuButton) {
            id = dm.metadata["moniker"] + "_prefs_menu_button";
            title = dm.metadata["name"] + " Preferences";
            style.fontSize = "9pt";
            addEventListener('click', openPrefsDialog, false);
//            accessKey = getDeconflicted("prefsMenuAccessKey", "accessKey");
            accessKey = prefs.get("prefsMenuAccessKey");
        }
        if (dm.xdoc.body != null) {
            dm.xdoc.body.appendChild(menuButton);
        }
    }

    function getDeconflicted(prefsName, attrName)
    {
        var prefValue = prefs.get(prefsName);
        var node = xdoc.selectNodeNullable("//*[@" + attrName + "='" + prefValue + "']");
        if (node != null) {
            log.warn("Conflict: <" + node.nodeName + "> element on this page is already using "
                  + attrName + "=" + prefValue);
            prefValue = null;
        }
        return prefValue;
    }

    // Prefs dialog
    function openPrefsDialog(event)
    {
        var prefsMgr = new PreferencesManager(
            dm.xdoc,
            dm.metadata["moniker"] + "_prefs",
            dm.metadata["name"] + " Preferences",
            { OK: function okPrefs(doc) { prefsMgr.storePrefs(); },
              Cancel: noop
            }
        );
        var prefsDialog_div = prefsMgr.open();
        if (prefsDialog_div == null)
            return;  // the dialog is already open

        prefsMgr.constructDockPrefsMenuSection = function(contextNode)
        {
            var prefsDock_div = dm.xdoc.createTopicDiv("Dock [Prefs] Menu", contextNode);
            contextNode.style.verticalAlign = "top";
            with (prefsDock_div.contentElement)
            {
                appendChild(prefsMgr.createPreferenceInput(
                    "prefsMenuVisible",
                    "Visible",
                    "Prefs menu button visible on the screen"
                ));
                with (appendChild(prefsMgr.createScreenCornerPreference("prefsMenuPosition"))) {
                    title = "Screen corner for [Prefs] menu button";
                    style.margin = "1px 0px 3px 20px";
                }
                appendChild(prefsMgr.createPreferenceInput(
                    "prefsMenuAccessKey",
                    "Access Key",
                    "Alt-Shift keyboard shortcut",
                    { size:1, maxLength: 1 }
                ));
            }
            return prefsDock_div;
        }

        prefsMgr.constructAdvancedControlsSection = function(contextNode)
        {
            var controls_div = dm.xdoc.createTopicDiv("Advanced Controls", contextNode);
            with (controls_div.contentElement)
            {
                appendChild(prefsMgr.createPreferenceInput(
                    "loggerLevel",
                    "Logging Level",
                    "Control level of information that appears in the Error Console",
                    null,
                    log.getLogLevelMap()
                ));
            }
            return controls_div;
        }

        dialogConstructor(prefsMgr, prefsDialog_div);
    }

    dispatchFeature("sendAnonymousStatistics", function() {
        if (getElapsed("sendAnonymousStatistics") < 2000) {
log.debug("--------- SKIPPING COUNTER on rapid fire: " + dm.xdoc.location.href);
            return;
        }
log.debug("--------- EMBEDDING COUNTER: " + dm.xdoc.location.href);
//     	var counter_img = document.createElement("img");
//     	counter_img.id = "refactoror.net_counter";
//     	counter_img.src = "http://refactoror.net/spacer.gif?"
//     		+ dm.metadata["moniker"] + "ver=" + dm.metadata["version"]
//     		+ "&od=" + GM_getValue("odometer")
//     	;
// log.debug(counter_img.src + " :: location=" + document.location.href);
//     	dm.xdoc.body.appendChild(counter_img);
    });

    function getElapsed(name) {
        var prev_ms = parseInt(GM_getValue(name + "_ms", "0"));
        var now_ms = Number(new Date());
        GM_setValue(name + "_ms", now_ms.toString());

        return (now_ms - prev_ms);
    }
}


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-= DOM Monkey -=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/* Parses the script headers into the metadata object.
 * Adds constants & utility methods to various javascript objects.
 * Initializes the Preferences object.
 * Initializes the logger object.
 */
function DomMonkey(metadata)
{
    extendJavascriptObjects();

    // DM objects provided on the context

    this.xdoc = extendDocument(document);
    this.metadata = metadata;

    // The values listed here are the first-time-use defaults
    // They have no effect once they are stored as mozilla preferences.
    prefs = new Preferences({
        "loggerLevel":               "WARN"
        ,"sendAnonymousStatistics":  true
    });

    log = new Logger(this.metadata["version"]);

    GM_setValue("odometer", GM_getValue("odometer", 0) + 1);
}


// ==================== DOM object extensions ====================

/** Extend the given document with methods
* for querying and modifying the document object.
*/
function extendDocument(doc)
{
    if (doc == null)
        return null;

    /** Determine if the current document is empty.
    */
    doc.isEmpty = function() {
        return (this.body == null || this.body.childNodes.length == 0);
    };

    /** Report number of nodes that matach the given xpath expression.
    */
    doc.countNodes = function(xpath) {
        var n = 0;
        this.foreachNode(xpath, function(node) {
            n++;
        });
        return n;
    };

    /** Remove nodes that match the given xpath expression.
    */
    doc.removeNodes = function(xpath) {
        this.foreachNode(xpath, function(node) {
            node.remove();
        });
    };

    /** Hide nodes that match the given xpath expression.
    */
    doc.hideNodes = function(xpath)
    {
        if (xpath instanceof Array) {
            for (var xp in xpath) {
                this.foreachNode(xp, function(node) {
                    node.hide();
                });
            }
        }
        else {
            this.foreachNode(xpath, function(node) {
                node.hide();
            });
        }
    };

    /** Make visible the nodes that match the given xpath expression.
    */
    doc.showNodes = function(xpath) {
        this.foreachNode(xpath, function(node) {
            node.show();
        });
    };

    /** Retrieve the value of the node that matches the given xpath expression.
    */
    doc.selectValue = function(xpath, contextNode)
    {
        if (contextNode == null)
            contextNode = this;

        var result = this.evaluate(xpath, contextNode, null, XPathResult.ANY_TYPE, null);
        var resultVal;
        switch (result.resultType) {
            case result.STRING_TYPE:  resultVal = result.stringValue;  break;
            case result.NUMBER_TYPE:  resultVal = result.numberValue;  break;
            case result.BOOLEAN_TYPE: resultVal = result.booleanValue; break;
            default:
                log.error("Unhandled value type: " + result.resultType);
        }
        return resultVal;
    }

    /** Select the first node that matches the given xpath expression.
    * If none found, log warning and return null.
    */
    doc.selectNode = function(xpath, contextNode)
    {
        var node = this.selectNodeNullable(xpath, contextNode);
        if (node == null) {
            // is it possible that the structure of this web page has changed?
            log.warn("XPath returned no elements: " + xpath
                + "\n" + genStackTrace(arguments.callee)
            );
        }
        return node;
    }

    /** Select the first node that matches the given xpath expression.
    * If none found, return null.
    */
    doc.selectNodeNullable = function(xpath, contextNode)
    {
        if (contextNode == null)
            contextNode = this;

        var resultNode = this.evaluate(
            xpath, contextNode, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null);

        if (resultNode.singleNodeValue == null)
            log.debug("null result for: " + xpath);
        return extendNode(resultNode.singleNodeValue);
    }

    /** Select all first nodes that match the given xpath expression.
    * If none found, return an empty Array.
    */
    doc.selectNodes = function(xpath, contextNode)
    {
        var nodeList = new Array();
        this.foreachNode(xpath, function(n) { nodeList.push(n); }, contextNode);
        return nodeList;
    }

    /** Select all nodes that match the given xpath expression.
    * If none found, return null.
    */
    doc.selectNodeSet = function(xpath, contextNode)
    {
        if (contextNode == null)
            contextNode = this;

        var nodeSet = this.evaluate(
            xpath, contextNode, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        return nodeSet;
    }

    /** Iteratively execute the given func for each node that matches the given xpath expression.
    */
    doc.foreachNode = function(xpath, func, contextNode)
    {
        if (contextNode == null)
            contextNode = this;

        // if array of xpath strings, call recursively
        if (xpath instanceof Array) {
            for (var i=0; i < xpath.length; i++)
                this.foreachNode(xpath[i], func, contextNode);
            return;
        }

        var nodeSet = contextNode.selectNodeSet(xpath, contextNode);

        var i = 0;
        var n = nodeSet.snapshotItem(i);
        while (n != null) {
            var result = func(extendNode(n));
            if (result == false) {
                // dispatching func can abort the loop by returning false
                return;
            }
            n = nodeSet.snapshotItem(++i);
        }
    }

    /** Retrieve the text content of the node that matches the given xpath expression.
    */
    doc.selectTextContent = function(xpath) {
        var node = this.selectNodeNullable(xpath, this);
        if (node == null)
            return null;
        return node.textContent.normalizeWhitespace();
    };

    /** Retrieve the text content of the node that matches the given xpath expression,
    * and apply the given regular expression to it, returning the portion that matches.
    */
    doc.selectMatchTextContent = function(xpath, regex) {
        var text = this.selectTextContent(xpath);
        if (text == null)
            return null;
        return text.match(regex);
    };

    /** Replace contents of contextNode (default: body), with specified node.
    * (The specified node is removed, then re-added to the emptied contextNode.)
    * The specified node is expected to be a descendent of the context node.
    * Otherwise the result is probably an error.
    * DOC-DEFAULT
    */
    doc.isolateNode = function(xpath, contextNode)
    {
        if (contextNode == null)
            contextNode = this.body;

        extendNode(contextNode);

        var subjectNode = this.selectNode(xpath);
        if (subjectNode == null || subjectNode.parentNode == null)
            return;

        // gut the parent node (leave script elements alone)
        contextNode.foreachNode("child::*", function(node) {
            if (node.tagName != "SCRIPT" && node.tagName != "NOSCRIPT") {
                node.remove();
            }
        });

        // re-add the subject node
        var replacement_div = this.createElement("div");
        replacement_div.id = "isolateNode:" + xpath;
        replacement_div.appendChild(subjectNode);

        contextNode.appendChild(replacement_div);
        return replacement_div;
    };

    /** Add a <script> reference to this document.
    * DOC-CENTRIC
    */
    doc.addScriptReference = function(url)
    {
        var script = this.createElement("script");
        script.src = url;
        this.selectNode("//head").appendChild(script);

        return script;
    }

    /** Add a CSS style definition to this document.
    * DOC-CENTRIC
    */
    doc.addStyle = function(cssBody, id)
    {
        var style = this.createXElement("style");
        style.innerHTML = cssBody;
        this.selectNode("//head").appendChild(style);

        return style;
    }

    /** Create an "extended" HTML element of the specified type,
    * with the given attributes applied to it.
    * The returned object is extended by extendNode().
    * DOC-NONSPECIFIC
    */
    doc.createXElement = function(tagName, attrMap)
    {
        var node = extendNode(this.createElement(tagName));
        node.applyAttributes(attrMap);
        return node;
    }

    /** Create
    */
    doc.createHtmlLink = function(url, text, attrMap)
    {
        var a = this.createXElement("a");
        a.href = url;
        if (text == null) {
            text = url;
        }
        a.textContent = text;
        a.applyAttributes(attrMap);
        return a;
    }

    /** Create an HTML input field, wrapped in an HTML label,
    * with the given attributes applied to it,
    * The returned HTML objects are extended by extendNode().
    * DOC-NONSPECIFIC
    */
    doc.createInputText = function(labelText, attrMap, defaultVal)
    {
        var span = this.createXElement("label");
        with (span) {
            if (labelText != null)
                appendChildText(labelText + ": ");
            var input = this.createXElement("input", attrMap);
            with (input) {
                type = "text";
                value = defaultVal;
            }
            appendChild(input);
        }
        return span;
    }

    doc.createTextArea = function(labelText, attrMap, defaultVal)
    {
        var span = this.createXElement("label");
        with (span) {
            if (labelText != null)
                appendChildText(labelText + ": ");
            var input = this.createXElement("textarea", attrMap);
            with (input) {
                value = defaultVal;
            }
            appendChild(input);
        }
        return span;
    }

    /** Create an HTML checkbox, wrapped in an HTML label,
    * with the given attributes applied to it,
    * The returned HTML objects are extended by extendNode().
    * DOC-NONSPECIFIC
    */
    doc.createCheckbox = function(labelText, attrMap, isChecked)
    {
        var span = this.createXElement("label");
        with (span) {
            var input = this.createXElement("input", attrMap);
            with (input) {
                type = "checkbox";
                checked = isChecked;
            }
            appendChild(input);
            appendChildText(labelText);
        }
        return span;
    }

    /** Create a set of HTML radio buttons, wrapped in an HTML label element.
    * The returned HTML objects are extended by extendNode().
    * DOC-NONSPECIFIC
    */
    doc.createRadioset = function(attrMap, optionMap, defaultKey)
    {
        var spanList = new Array();

        for (var key in optionMap)
        {
            var label = this.createXElement("label");
            with (label) {
                var input = this.createXElement("input", attrMap);
                with (input) {
                    type = "radio";
                    value = key;
                    if (key == defaultKey)
                        checked = true;
                }
                appendChild(input);
                appendChildText(optionMap[key]);
            }
            spanList.push(label);
        }
        return spanList;
    }

    /** Create an HTML select element, wrapped in an HTML label element.
    * The returned HTML objects are extended by extendNode().
    * DOC-NONSPECIFIC
    */
    doc.createSelect = function(labelText, attrMap, optionMap, defaultKey)
    {
        var span = this.createXElement("label");
        with (span) {
            if (labelText != null)
                appendChildText(labelText + ": ");
            var select = this.createXElement("select", attrMap);
            with (select)
            {
                for (var key in optionMap)
                {
                    var option = this.createXElement("option");
                    with (option) {
                        value = key;
                        if (key == defaultKey) {
                            selected = true;
                        }
                        appendChildText(optionMap[key]);
                    }
                    appendChild(option);
                }
            }
            appendChild(select);
        }
        return span;
    }

    /** Create a labeled/boxed area (eg, typical dialog box component).
    */
    doc.createTopicDiv = function(topicTitle, contextNode)
    {
        var shiftEms = ".7";
        var basecolor = getBaseColor(contextNode);

        var frame_div = this.createXElement("div");
        with (frame_div) {
            with (style) {
                border = "1px solid Gray";
                marginTop = (shiftEms * 1.5) + "em";
                marginLeft = "6px";
                marginRight = "6px";
                MozBorderRadius = "3px";
            }

            // superimposed title
            var title_span = this.createXElement("span");
            with (title_span.style) {
                position = "relative";
                top = -shiftEms + "em";
                fontSize = "10pt";
                color = "Black";
                backgroundColor = basecolor;
                marginLeft = "6px";  // shift title right
                padding = "0px 4px 0px 4px"; // blot out frame on left & right
            }
            title_span.appendChildText(topicTitle);
            appendChild(title_span);
            // maintatin default mouse cursor over the topic label text
            title_span.wrapIn("label");

            // content area
            var content_div = this.createXElement("div");
            content_div.style.marginTop = -shiftEms + "em";
            content_div.style.padding = "6px";
            appendChild(content_div);
        }
        frame_div.contentElement = content_div;

        return frame_div;

        function getBaseColor(contextNode)
        {
            while (contextNode != null && contextNode.tagName != "BODY") {
                var c = contextNode.style.backgroundColor;
                if (c != "") {
                    return c;
                }
                contextNode = contextNode.parentNode;
            }
            return "White";
        }
    }

    return doc;
}

/** Extend the given node with methods
* for querying and modifying the node object.
*/
function extendNode(node)
{
    if (node == null)
        return null;

    /** Create an HTML element of the specified type,
    * with the given attributes applied to it.
    * The returned object is extended by extendNode().
    */
    node.createXElement = function(tagName, attrMap)
    {
        var node = extendNode(this.ownerDocument.createElement(tagName));
        this.applyAttributes(attrMap);
        return node;
    }

    // Selection methods that operate within the scope of this node

    node.selectValue        = function(xpath) { return document.selectValue(xpath, this); }
    node.selectNode         = function(xpath) { return document.selectNode(xpath, this); }
    node.selectNodeNullable = function(xpath) { return document.selectNodeNullable(xpath, this); }
    node.selectNodeSet      = function(xpath) { return document.selectNodeSet(xpath, this); }

    node.foreachNode = function(xpath, func) { document.foreachNode(xpath, func, this); }
    node.isolateNode = function(xpath) { document.isolateNode(xpath, this); }

    node.applyAttributes = function(attrMap) {
        for (var key in attrMap) {
            this[key] = attrMap[key];
        }
    }

    /** &nbsp;
    */
    node.NBSP = "\u00A0";

    /** Create a DOM object of the given type,
    * and append it to this node.
    */
    node.appendChildElement = function(tagName) {
        var newNode = this.createXElement(tagName);
        this.appendChild(newNode);
        return newNode;
    };

    /** Create a text node,
    * optionally wrapped in the given HTML element types,
    * and append it to this node.
    */
    node.appendChildText = function(text, spanList, attrMap)
    {
        var newNode = this.ownerDocument.createTextNode(text);
        // wrap with other elements, if any, (eg: ["b", "i"])
        if (spanList != null) {
            for (var i = spanList.length - 1; i >= 0; i--) {
                var n = this.createXElement(spanList[i]);
                n.appendChild(newNode);
                newNode = n;
            }
        }
        if (attrMap != null) {
            newNode.applyAttributes(attrMap);
        }
        this.appendChild(newNode);
        return newNode;
    };

    /** Create a text node consisting of a series of &nbsp; entities,
    * and append it to this node.
    */
    node.appendChildTextNbsp = function(count) {
        if (count == null)
            count = 1;
        var buf = "";
        for (var i = 0; i < count; i++) {
            buf += this.NBSP;
        }
        return this.appendChildText(buf);
    };

    /** Insert the given node as the first child of this node.
    */
    node.prependChild = function(newNode) {
        this.insertBefore(newNode, this.firstChild);
        return newNode;
    };

    /** Insert the given node in front of this node.
    */
    node.prependSibling = function(newNode) {
        var p = this.parentNode;
        p.insertBefore(newNode, this);
        return newNode;
    };

    /** Insert the given node after this node.
    */
    node.appendSibling = function(newNode) {
        var p = this.parentNode;
        var followingSibling = this.nextSibling;
        p.insertBefore(newNode, followingSibling);
        return newNode;
    };

    /** Create an HTML element of the specified type,
    * with the given attributes applied to it,
    * then move this node inside the newly created node,
    * and attach the newly created node in place of this node
    * returning the newly created object.
    */
    node.wrapIn = function(type, attrs) {
        var wrapperNode = this.createXElement(type, attrs);
        this.prependSibling(wrapperNode);
        this.remove();
        wrapperNode.appendChild(this);
        return wrapperNode;
    };

    /** 
    */
    node.makeCollapsible = function(id, isPersistent, isInitExpanded) {
        return new Collapsible(this, id, isPersistent, isInitExpanded);
    };

    /** Remove this node, and insert the given node in its place.
    * .. more details
    */
    node.replaceWith = function(node) {
        this.appendSibling(node);
        this.remove();
        return node;
    };

    /** Create an HTML table row.
    * .. more details
    */
    node.appendTableRow = function(valueList, tdAttrMapList)
    {
        var tr = this.createXElement("tr");
        for (var i in valueList)
        {
            var td = this.createXElement("td");
            if (tdAttrMapList != null)
                td.applyAttributes(tdAttrMapList[i]);
            if (valueList[i] == null)
                ;
            else if (typeof(valueList[i]) == "string")
                td.appendChild( this.ownerDocument.createTextNode(valueList[i]) );
            else
                td.appendChild( valueList[i] );
            tr.appendChild(td);
        }
        this.appendChild(tr);
    }

    /** Remove this node from the DOM.
    */
    node.remove = function() {
        this.parentNode.removeChild(this);
        return this;
    }

    /** Hide this node.
    */
    node.hide = function() {
        this.style.display = "none";
    }

    /** Hide nodes that are siblings to this node.
    */
    node.hideSiblings = function() {
        this.foreachNode("../child::*", function(node) {
            if (! this.isSameNode(node)) {
                if (node.tagName != "SCRIPT" && node.tagName != "NOSCRIPT")
                    node.hide();
            }
        });
    };

    /** Show this node.
    */
    node.show = function() {
        this.style.display = null;
    }

    /** Calculate the absolute X position of this HTML element.
    */
    node.findPosX = function()
    {
        var x = 0;
        var node = this;
        while (node.offsetParent != null) {
            x += node.offsetLeft;
            node = node.offsetParent;
        }
        if (node.x != null)
            x += node.x;
        return x;
    }

    /** Calculate the absolute Y position of this HTML element.
    */
    node.findPosY = function()
    {
        var y = 0;
        var node = this;
        while (node.offsetParent != null) {
            y += node.offsetTop;
            node = node.offsetParent;
        }
        if (node.y != null)
            y += node.y;
        return y;
    }

    return node;
}


// ==================== TabSet object ====================

var activeTabsets = new Array();

// assumes that doc has already been extended
function TabSet(doc, tabsetId, tabLabels)
{
    this.doc = doc;
    this.tabsetId = tabsetId;
    this.tabLinkMap = new Array();
    this.tabDivMap = new Array();

    // save TabSet object reference for callbacks
    activeTabsets[tabsetId] = this;

    this.getTabContent_div = function(labelText) {
        return this.tabDivMap[labelText];
    }

    this.createTab = function(idx, labelText)
    {
        var a = this.doc.createXElement("a", {
            name: this.tabsetId,
            textContent: labelText,
            className: "DialogBox_clickable"
        });
        with (a.style) {
            padding = "3px 4px";
            border = "1px solid Black";
            MozBorderRadius = "4px";
            borderBottom = "none";
            fontSize = "9pt";
            color = "Black";
            textDecoration = "none";
        }
        return a;
    }

    this.activateTab = function(a) {
        with (a.style) {
            paddingTop = "4px";
            backgroundColor = "LightGray";
        }
        var content_div = this.getTabContent_div(a.textContent);
        content_div.show();
    }

    this.deactivateTab = function(a) {
        with (a.style) {
            paddingTop = "3px";
            backgroundColor = "DarkGray";
        }
        var content_div = this.getTabContent_div(a.textContent);
        content_div.hide();
    }

    this.selectTab = function(selected_a)
    {
        // (can be called from outside this object's context, (ie, click listener))
        var tabset = activeTabsets[selected_a.name];
        // deselect all tabs
        tabset.doc.foreachNode("//a[@name='" + selected_a.name + "']", function(a) {
            tabset.deactivateTab(a);
        });
        // then select the clicked tab
        tabset.activateTab(selected_a);
    }

    this.initialize = function(labelText)
    {
        var maxX = 0;
        var maxY = 0;
        // determine largest width/height across content divs
        for (var d in this.tabDivMap) {
            var div = this.tabDivMap[d];
            if (div.clientWidth  > maxX) maxX = div.clientWidth;
            if (div.clientHeight > maxY) maxY = div.clientHeight;
        }
        // equalize size of content divs to largest
        for (var d in this.tabDivMap) {
            var div = this.tabDivMap[d];
            div.style.width = maxX;
            div.style.height = maxY;
        }
        // select the default tab
        if (labelText == null) {
            labelText = tabLabels[0];
        }
        this.selectTab(this.tabLinkMap[labelText])
    }


    this.container_div = this.doc.createXElement("div", { id: this.tabsetId });

    var ul = this.doc.createXElement("ul");
    this.container_div.appendChild(ul);
    with (ul.style) {
        margin = "13px 7px 1px 12px";
        padding = "0px 0px 0px 0px";
        fontSize = "10pt";
    }

    for (var t in tabLabels)
    {
        var tab_a = this.createTab(t, tabLabels[t]);
        tab_a.addEventListener('click', function(event) {
                // now we're in the isolated context of the click
                // ie, context inferred from event & globals
                var selected_a = event.target;
                var tabset = activeTabsets[selected_a.name];
                tabset.selectTab(selected_a);
            },
            false
        );
        ul.appendChild(tab_a);
        // maintatin default mouse cursor over the topic label text
        tab_a.wrapIn("label");
        this.tabLinkMap[tabLabels[t]] = tab_a;
        // corresponding content div
        var tabContent_div = this.doc.createXElement("div", {
            id: this.tabsetId + ":" + tabLabels[t]
        });
        with (tabContent_div.style) {
            margin = "0px 7px 0px 7px";
            padding = "4px 4px 4px 4px";
            border = "2px outset Black";
        }
        this.container_div.appendChild(tabContent_div);
        this.tabDivMap[tabLabels[t]] = tabContent_div;
    }
}


// ==================== DialogBox object ====================

var activeDialogs = new Array();

// assumes that doc has already been extended
function DialogBox(doc, dialogTitle)
{
    this.doc = doc;
    this.callbacks = null;

    this.createDialog = function(popupName, dialogStyle, buttonDefs)
    {
        this.popupId = popupName + "_dialog";

        var main_div = this.doc.createXElement("div");
        with (main_div) {
            id = this.popupId;
            setAttribute("style", dialogStyle);
            style.maxWidth  = window.innerWidth - 50;
            style.maxHeight = window.innerHeight - 70;
            style.overflow = "auto";
            if (style.backgroundColor == "")
                style.backgroundColor = "White";

            // dialog box structure
            innerHTML =
                // border layers
                  '<div style="border: 1px solid; border-color: Gainsboro DarkSlateGray DarkSlateGray Gainsboro;">'
                + '<div style="border: 1px solid; border-color: White DarkGray DarkGray White;">'
                + '<div style="border: 2px solid Gainsboro;">'
                // grid (has to be a table to acheive float behaviors)
                + '<table cellspacing="0" cellpadding="0">'
                + '<tbody>'
                // titlebar (optional)
                + ((dialogTitle != null) ?
                      '<tr id="' + this.popupId + '_titlebar"><td'
                    + ' style="padding: 2px; background-color: Navy; color: White; font: bold 9pt Arial;"'
                    + '>' + dialogTitle
                    + '</td></tr>'
                    : "")
                // main content area
                + '<tr id="' + this.popupId + '_main" style="overflow: auto;"><td>'
                + '<div id="' + this.popupId + '_content"/>'
                + '</td></tr>'
                // button bar
                + '<tr id="' + this.popupId + '_buttons"><td style="padding: 6px;">'
                + '</td></tr>'
                + '</tbody>'
                + '</table>'
                + '</div>'
                + '</div>'
                + '</div>'
            ;
        }
        this.doc.body.appendChild(main_div);
//        $(main_div).addClass("ui-widget-content ui-draggable");
//        $(main_div).draggable();

        this.main_td = main_div.selectNodeNullable("//tr[@id='" + this.popupId + "_main']/td")
        var content_div = main_div.selectNode("//div[@id='" + this.popupId + "_content']");
        var buttonbar_td = main_div.selectNodeNullable("//tr[@id='" + this.popupId + "_buttons']/td")

        var controlButtons_span = this.doc.createXElement("center");

        if (buttonDefs != null)
        {
            this.callbacks = buttonDefs;
            for (var b in buttonDefs)
            {
                var button = null;
                if (b == "X")
                {
                    var titlebar_td = main_div.selectNodeNullable("//tr[@id='" + this.popupId + "_titlebar']/td")
                    if (titlebar_td != null) {
                        // X close button in the right side of the titlebar
                        button = this.doc.createXElement("a");
                        with (button) {
                            id = this.popupId + "_closer";
                            href = "javascript:void(0)";
                            with (style) {
                                cssFloat = "right";
                                border = "1px solid";
                                borderColor = "White DarkSlateGray DarkSlateGray White";
                                backgroundColor = "LightGray";
                                padding = "0px 1px 0px 2px";
                                font = "bold 9pt Arial";
                                color = "Black";
                                textAlign = "center";
                                lineHeight = "110%";
                            }
                            appendChildText("X");
                        }
                        titlebar_td.prependChild(button);
                    }
                    else {
                        // X close button in the upper-right of window
                        button = this.doc.createXElement("a");
                        with (button) {
                            id = this.popupId + "_closer";
                            href = "javascript:void(0)";
                            with (style) {
                                cssFloat = "right";
                                backgroundColor = "#AA0000";
                                padding = "2px";
                                font = "bold 8pt Arial";
                                textDecoration = "none";
                                color = "White";
                            }
                            appendChildText("X");
                        }
                        content_div.prependSibling(button);
                    }
                }
                else {
                    // a regular button at bottom of window
                    button = this.doc.createXElement("button");
                    with (button.style) {
                        margin = "0px 5px";
                        fontSize = "8pt";
                        fontFamily = "Helvetica, sans-serif";
                    }
                    controlButtons_span.appendChild(button);
                }

                with (button) {
                    name = this.popupId; // name attr associates callbacks with the dialog id
                    className = "DialogBox_clickable";
                    textContent = b;
                    addEventListener('click', function(event) {
                            // now we're in the isolated context of the click
                            // ie, context inferred from event & globals
                            var doc = extendDocument(event.target.ownerDocument);
                            var dialog = activeDialogs[event.target.name];
                            var popupId = event.target.textContent;
                            var callbackFunc = dialog.callbacks[popupId];
                            dialog.hidePopup();
                            callbackFunc(doc);
                            dialog.removePopup();
                        },
                        false
                    );
                }
            }
            buttonbar_td.appendChild(controlButtons_span);

            this.doc.addStyle(
                ".DialogBox_clickable:hover { cursor: pointer; }\n"
            );
        }

        // save DialogBox object reference for callbacks
        activeDialogs[this.popupId] = this;

        return content_div;
    }

    this.hidePopup = function() {
        var div = this.doc.getElementById(this.popupId);
        div.style.display = "none";
    }

    this.removePopup = function() {
        var div = this.doc.getElementById(this.popupId);
        div.parentNode.removeChild(div);

        activeDialogs[this.popupId] = null;
    }
}

function noop() {
}


// ==================== Preferences object ====================

/** (This object is created before the Logger object,
 * therefore the log methods cannot be used. Use GM_log instead.)
*/
function Preferences(defaultValuesMap)
{
    this.defaultValuesMap = defaultValuesMap;
    this.cacheMap = new Object();

    /** Adds additional attributes to the map.
    */
    // TBD: rename (add, merge)
    this.config = function(valuesMap) {
        for (var k in valuesMap) {
            this.defaultValuesMap[k] = valuesMap[k];
        }
    }

    this.get = function(prefName)
    {
        var value = this.cacheMap[prefName];
        if (typeof(value) == "undefined")
        {
            value = GM_getValue(prefName);
            if (typeof(value) == "undefined")
            {
                value = this.defaultValuesMap[prefName];
                if (typeof(value) == "undefined") {
                    GM_log("Unmanaged preference: " + prefName);
                    return value;
                }
            }
            this.set(prefName, value);
        }
        return value;
    }

    this.set = function(prefName, prefValue)
    {
        GM_setValue(prefName, prefValue);
        this.cacheMap[prefName] = prefValue;
    }

    this.getAsList = function(prefName, delim, wrapperType)
    {
        var value = this.get(prefName);
        var valueList;
        if (value != null) {
            valueList = value.split(delim);
        }
        else {
            valueList = new Array();
        }

        if (wrapperType != null) {
            // wrap elements in custom object type
            var wrappedValueList = new Array();
            for (var i=0; i < valueList.length; i++) {
                wrappedValueList[i] = new wrapperType(valueList[i]);
            }
            return wrappedValueList;
        }

        // add utility methods to the resulting Array object

        valueList.contains = function(matchText)
        {
            if (matchText == null) {
                log.error("a null arg: " + this + " " + matchText);
                return false;
            }

            for (var i in this) {
                if (matchText == this[i])
                    return true;
            }
            return false;
        }

        return valueList;
    }
}


// ==================== PreferencesManager object ====================

function setScreenPosition(node, posIndicator)
{
    with (node.style)
    {
        position = "fixed";
        zIndex = 999;
        switch (posIndicator) {
            case "TL": top = 0;    left = 0;  break;
            case "TR": top = 0;    right = 0; break;
            case "BL": bottom = 0; left = 0;  break;
            case "BR": bottom = 0; right = 0; break;
            default:
                log.error("Unrecognized menu position indicator: " + menuPos);
        }
    }
}

function PreferencesManager(doc, uniqId, title, buttonDefs)
{
    this.doc = extendDocument(doc);
    this.uniqId = uniqId;
    this.dialogBox = new DialogBox(this.doc, title);
    this.buttonDefs = buttonDefs;

    /** Display the Preferences dialog.
    */
    this.open = function()
    {
        if (this.doc.selectNodeNullable("//div[@id='" + this.uniqId + "_dialog']")) {
            log.info("Preferences dialog already open");
            return null;  // the dialog is already open
        }

        var dialogBox_div = this.dialogBox.createDialog(
            this.uniqId,
            "z-index: 999; left: 15%; top: 25px; position: fixed;"
            + " background-color: LightGray;",
            this.buttonDefs
        );
        with (dialogBox_div.style) {
            fontSize = "10pt";
            fontFamily = "Arial, Helvetica, sans-serif";
            overflow = "auto";
            backgroundColor = "LightGray";
        }

        return dialogBox_div;
    }

    /** Create an HTML input element associated with the named greasemonkey preference.
    */
    this.createPreferenceInput = function(prefName, titleText, tipText, attrMap, optionMap)
    {
        var prefValue = prefs.get(prefName);
        var item_label;
        var inputTagname = "input";
        switch (typeof(prefValue)) {
            case "boolean":
                item_label = this.doc.createCheckbox(titleText, attrMap, prefValue);
                break;
            case "string":
            case "number":
                if (optionMap != null) {
                    item_label = this.doc.createSelect(titleText, attrMap, optionMap, prefValue);
                    inputTagname = "select";
                }
                else if (attrMap["rows"] != null) {
                    item_label = this.doc.createTextArea(titleText, attrMap, prefValue);
                    inputTagname = "textarea";
                }
                else {
                    item_label = this.doc.createInputText(titleText, attrMap, prefValue);
                }
                break;
            default:
                log.warn("For " + prefName + ", unrecognized type: " + typeof(prefValue));
        }
        item_label.style.fontSize = "9pt";
        if (tipText != null)
            item_label.title = tipText;
        with (item_label.selectNode(inputTagname)) {
            name = prefName;
            className = "preferenceSetting";
            applyAttributes(attrMap);
        }
        return item_label;
    }

    this.createScreenCornerPreference = function(prefName)
    {
        var prefValue = prefs.get(prefName);

        var table = this.doc.createXElement("table", {
            id: prefName + "_2x2"
        });
        with (table) {
            style.borderCollapse = "collapse";
            cellPadding = 0; cellSpacing = 0;

            appendTableRow([ createRadioButton("TL"), null, createRadioButton("TR") ]);
            appendTableRow([          null,           null,          null           ]);
            appendTableRow([ createRadioButton("BL"), null, createRadioButton("BR") ]);

            style.border = "3px inset Black";
            foreachNode(".//input", function(inp) {
                inp.style.margin = "0px";
            });
            with (selectNode(".//tr[2]/td[2]")) {
                // acheive roughly 4/3 aspect ratio
                style.width = "14px";
                style.height = "4px";
            };
        }
        return table;

        function createRadioButton(choiceValue)
        {
            var radio_input = doc.createXElement("input", {
                type: "radio", name: prefName, value: choiceValue,
                className: "preferenceSetting"
            });
            if (choiceValue == prefValue) {
                radio_input.checked = true;
            }
            return radio_input;
        }
    }

    /** Store current screen values into the associated Preferences,
    * but only for values that have changed.
    * (This is the primary logic for the OK button)
    */
    this.storePrefs = function()
    {
        this.doc.foreachNode("//*[@class='preferenceSetting']", function(inputObj) {
            var prefName = inputObj.name;
            var prefValue;
            if (inputObj.type == "checkbox") {
                prefValue = inputObj.checked;
            }
            else if (inputObj.type == "radio") {
                if (inputObj.checked)
                    prefValue = inputObj.value;
                else
                    return; // skip all in group except the checked one
            }
            else {
                prefValue = inputObj.value;
            }

            var oldValue = GM_getValue(prefName, prefValue);
            if (prefValue != oldValue)
            {
                var defaultValue = prefs.get(prefName);
                if (typeof(defaultValue) == "number") {
                    if (isNaN(prefValue)) {
                        alert("Non-numeric value '" + prefValue + "' is invalid for preference " + prefName);
                        return false; // continue on to next preference item
                    }
                    prefValue = parseFloat(prefValue);
                }
                if (typeof(prefValue) == "string")
                    log.info("Setting preference: " + prefName + " => '" + prefValue + "'");
                else
                    log.info("Setting preference: " + prefName + " => " + prefValue);
                prefs.set(prefName, prefValue);
            }
        });
    }
}


// ==================== Collapsible object ====================

function Collapsible(theNode, collapserId, isPersistent, isInitExpanded)
{
    this.node = theNode;
    this.doc = extendDocument(theNode.ownerDocument);

    if (collapserId == null) {
        if (theNode.id == null)
            collapserId = "collapser_" + generateUuid();
        else
            collapserId = theNode.id + "_collapser";
    }

    // maintain object reference(s) for callbacks
    if (document.activeCollapsers == null) {
        document.activeCollapsers = new Object();
    }
    document.activeCollapsers[collapserId] = this;

    this.expand = function(event) {
        collapsible = this;
        if (event != null) {
            var collapserId = event.target.parentNode.id;
            collapsible = document.activeCollapsers[collapserId];
            if (isPersistent) {
                prefs.set(collapserId, true);
            }
        }
        collapsible.node.show();
        collapsible.expander.hide();
        collapsible.collapser.show();
    }

    this.collapse = function(event) {
        var collapsible = this;
        if (event != null) {
            var collapserId = event.target.parentNode.id;
            collapsible = document.activeCollapsers[collapserId];
            if (isPersistent) {
                prefs.set(collapserId, false);
            }
        }
        collapsible.node.hide();
        collapsible.collapser.hide();
        collapsible.expander.show();
    }

    this.createController = function(func, base64) {
        var img = this.doc.createXElement("img");
//         img.title = label;
        img.src = 'data:image/gif;base64,' + base64;
        img.addEventListener('click', func, false);

        with (img.style) {
            cssFloat = "left";
            left = "0px";
            position = "absolute";
            zIndex = 999;
        }
        return img;
    }

    var span = this.doc.createXElement("span", { id: collapserId });
    this.node.prependSibling(span);

    this.expander = this.createController(this.expand,
        'R0lGODlhEAAQAKEDAAAA/wAAAMzMzP///yH5BAEAAAMALAAAAAAQABAAAAIhnI+pywOtwINHTmpvy3rx' +
        'nnABlAUCKZkYoGItJZzUTCMFACH+H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw=='
    );
    span.appendChild(this.expander);

    this.collapser = this.createController(this.collapse,
        'R0lGODlhEAAQAKEDAAAA/wAAAMzMzP///yH5BAEAAAMALAAAAAAQABAAAAIdnI+py+0Popwx0RmEuiAz' +
        '6jVS6HTaY5zoyrZuWwAAIf4fT3B0aW1pemVkIGJ5IFVsZWFkIFNtYXJ0U2F2ZXIhAAA7'
    );
    span.appendChild(this.collapser);

    var isExpanded = isInitExpanded;
    if (isPersistent == true) {
        isExpanded = prefs.get(collapserId);
    }

    if (isExpanded)
        this.expand()
    else
        this.collapse()
}


// ==================== DocumentContainer object ====================

/** Create and manage invisible iframe content loaded from an arbitrary URL.
* If the same URL is requested more than once, it is returned from cache.
* Example:
*    var dc = new DocumentContainer();
*    dc.loadFromSameOrigin("search.do?category=eligible",
*        function(doc) {
*            if (dm.xdoc.selectNode("//text()[.='Dilbert']"))
*                alert("Hide your daughters!");
*        }
*    );
*/
function DocumentContainer(debugFlag)
{
    var iframeCache = new Array();
    this.debug = debugFlag;

    this.loadFromSameOrigin = function(theUrl, theFunc)
    {
        var iframe = iframeCache[theUrl];
        if (iframe != null) {
            if (theFunc != null)
                theFunc(iframe.contentDocument);
            return;
        }

        var iframe = this.attachIframe(theUrl);

        // wait for the DOM to be available, then dispatch
        iframe.addEventListener(
            "load",
            function(evt) {
                var theIframe = evt.currentTarget;
                var therUrl = theIframe.contentWindow.location.href;
                iframeCache[theUrl] = theIframe;
                if (theFunc != null)
                    theFunc(theIframe.contentDocument);
            },
            false
        );

        // load the content
        iframe.contentWindow.location.href = ajaxstaticUrl(theUrl);
    }

    this.loadFromForeignOrigin = function(theUrl, theFunc)
    {
        if (window != top) {
            return;  // prevent infinite recursion
        }
        var iframe = this.attachIframe(theUrl);

        GM_xmlhttpRequest(
        {
            method: "GET",
            url: ajaxstaticUrl(theUrl),
            onload: function(details) {

                // give it a URL so that it will create a .contentDocument property.
                // Make it the same as the current page,
                // Otherwise, same-origin policy would prevent us.
                // TBD: why is this a literal? Would foobar.com work as well??
                iframe.contentWindow.location.href = "http://tv.yahoo.com/";

                // wait for the DOM to be available, then dispatch
                iframe.addEventListener(
                    "DOMContentLoaded",
                    function() {
                        if (theFunc != null)
                            theFunc(iframe.contentDocument);
                    },
                    false
                );

                // write the received content into the document
                iframe.contentDocument.open("text/html");
                iframe.contentDocument.write(details.responseText);
                iframe.contentDocument.close();
            }
        });

        return iframe.contentDocument;
    }

    this.attachIframe = function(theUrl)
    {
        // create an IFRAME element to write the document into.
        // It must be added to the document and rendered (eg, display != none)
        // to be properly initialized.
        var iframe = document.createElement("iframe");
        iframe.id = "DocumentContainer_" + theUrl;
        if (this.debug == null) {
            iframe.width = 0;
            iframe.height = 0;
            iframe.style.display = "none";
        }
        else {
            iframe.width = 800;
            iframe.height = 700;
        }
        document.body.appendChild(iframe);

        iframe.contentWindow.location.href = "about:blank";

        return iframe;
    }

    // private helper methods
}

    /** Add param to URL, marking it as not to be re-processed.
    */
    function ajaxstaticUrl(theUrl)
    {
        var newUrl = theUrl;
        if (newUrl.indexOf("?") == -1)
            newUrl += "?";
        if (newUrl.indexOf("?") != newUrl.length-1)
            newUrl += "&";
        return newUrl + "ajaxstatic";
    }

/** Retrieve each document specified in the urlList
* invoking onloadFunc with each doc,
* and then finally invoking onrendezvousFunc with the assembled list of docs
*/
function withDocuments(urlList, onloadFunc, onrendezvousFunc)
{
    var context = new Object();
    context.resultDocList = new Array();
    context.pendingCount = urlList.length;

    for (var u in urlList)
    {
        var dc = new DocumentContainer();
        dc.loadFromSameOrigin(urlList[u],
            function(curDoc) {
                if (onloadFunc != null) {
                    onloadFunc(curDoc);
                }
                if (--context.pendingCount == 0) {
                    if (onrendezvousFunc != null) {
                        context.resultDocList.push(curDoc);
                        onrendezvousFunc(context.resultDocList);
                    }
                }
            }
        );
    }
}

/** Recursively retrieve each document specified in the urlList,
* then invoke the dispatch function with the list of loaded docs.
*/
function withDocumentsSerialized(urlList, func, docList)
{
    var curUrl = urlList.shift();
    if (docList == null)
        docList = new Array();

    var dc = new DocumentContainer();
    dc.loadFromSameOrigin(curUrl,
        function(curDoc) {
            if (urlList.length > 0)
                withDocuments(urlList, func, docList);
            else
                func(docList);
        }
    );
}



// ==================== Logger object ====================

function Logger(verNum)
{
    this.logLevels = ["ERROR", "WARN", "INFO", "DEBUG", "TRACE"];

    this.level = null;

    this.setLevel = function(level) {
        this.level = level;
        if (level >= 2)
            GM_log("[" + verNum + "] === LOGGER LEVEL: " + this.logLevels[this.level] + " ==="
            + " " + document.location.href);
    }

    this.setLevel(arrayIndexOf(this.logLevels, prefs.get("loggerLevel")));

    this.error = function(msg) { if (this.level >= 0) GM_log("ERROR: " + msg); }
    this.warn  = function(msg) { if (this.level >= 1) GM_log("WARN: " + msg); }
    this.info  = function(msg) { if (this.level >= 2) GM_log("INFO: " + msg); }
    this.debug = function(msg) { if (this.level >= 3) GM_log("DEBUG: " + msg); }
    this.trace = function(msg) { if (this.level >= 4) GM_log("TRACE: " + msg); }

    this.getLogLevelMap = function() { return IdentityMapForArray(this.logLevels); };
}


// ==================== JavaScript object extenstions ====================

function extendJavascriptObjects()
{
    // ---------- String extensions ----------

    /** Format text content as it will appear on a page (before wrapping, etc).
    */
    String.prototype.normalizeWhitespace = function()
    {
        var text = this.replace(/\s+/g, " ");      // reduce internal whitespace
        text = text.replace(/ ([,;:\.!])/g, "$1"); // snug-up punctuation
        return text.trimWhitespace();
    }

    /** Format text content as it will appear on a page (before wrapping, etc).
    */
    String.prototype.trimWhitespace = function()
    {
        return this.replace(/^\s*/, "").replace(/\s*$/, "");
    }

    String.prototype.stripQuoteMarks = function()
    {
        var text = this.replace(/"/g, "");
        return text;
    }

    // ---------- Date extensions ----------

    SECOND = 1000;
    MINUTE = SECOND * 60;
    HOUR = MINUTE * 60;
    DAY = HOUR * 24;
    WEEK = DAY * 7;

    // Example, on the hour: floor(Date.HOUR)
    Date.prototype.floor = function(unit) {
        var floorMilli = Math.floor(this.getTime() / unit) * unit;
        return new Date(floorMilli);
    }

    Date.prototype.add = function(millis) {
        return new Date(this.getTime() + millis);
    }
}


// ---------- Array helpers ----------

function arrayIndexOf(theList, value, attrName)
{
    if (attrName == null) {
        // by element value
        for (var i in theList) {
            if (theList[i] == value)
                return i;
        }
    }
    else {
        if (typeof(value) == "object") {
            // by corresponding attribute in value array
            for (var i in theList) {
                if (theList[i][attrName] == value[attrName])
                    return i;
            }
        }
        else {
            // by attribute value
            for (var i in theList) {
                if (theList[i][attrName] == value) {
                    return i;
                }
            }
        }
    }
    return null;
}

function sortBy(theList, fieldList)
{
    theList.sort( function(a, b)
    {
        for (var i in fieldList) {
            if (a[fieldList[i]] < b[fieldList[i]]) return -1;
            if (a[fieldList[i]] > b[fieldList[i]]) return 1;
        }
        return 0;
    });
    return theList;
}

function sortDescBy(theList, fieldList)
{
    theList.sort( function(a, b)
    {
        for (var i in fieldList) {
            if (a[fieldList[i]] > b[fieldList[i]]) return -1;
            if (a[fieldList[i]] < b[fieldList[i]]) return 1;
        }
        return 0;
    });
    return theList;
}

function numericComparatorAsc(a, b) {
    return (a-b);
}

function numericComparatorDesc(a, b) {
    return (b-a);
}

/** .
*/
function IdentityMapForArray(ary)
{
    var map = new Array();
    for (var i=0; i < ary.length; i++) {
        map[ary[i]] = ary[i];
    }
    return map;
}

/** Create a new Array with pre-defined numeric indices,
* (ie, ready for inserts to random indices).
*/
function initArrayIndices(count) {
    var a = new Array(count);
    for (var i = 0; i < count; i++) {
        a[i] = null;
    }
    return a;
}


/** Dispatch processing for each grouping of elements based upon the named field.
 * Example:
 *   var nodes = dm.xdoc.selectNodes("//*[@class]");
 *   GM_log(nodes.length + " nodes");
 *   foreachGrouping(sortBy(nodes, ["className"] ), "className", function(groups) {
 *     GM_log(groups.length + " nodes with class='" + groups[0].className+ "'");
 *   });
*/
function foreachGrouping(theList, attrName, func)
{
    var curList = new Array();
    var prevValue = null;
    for (var i in theList)
    {
        if (theList[i][attrName] != prevValue)
        {
            if (curList.length > 0) {
                func(curList);
            }
            curList = new Array();
        }
        curList.push(theList[i]);
        prevValue = theList[i][attrName];
    }
}


// ==================== UrlParser object ====================

/** Parsing and formatting of URLs.
* url, params; scheme, host, port, path
*/
function UrlParser(urlString)
{
    var urlParts = urlString.split("?");
    this.url = urlParts[0];
    this.parms = new Array();

    // parse query params into name/value associative list
    if (urlParts[1]) {
        var queryItems = urlParts[1].split("&");

        for (var i in queryItems) {
            var parm = queryItems[i].split("=");
            this.parms[unescape(parm[0])] = unescape(parm[1]);
            // convert to numeric if appropriate
            var num = parseInt(parm[1]);
            if (!isNaN(num) && parm[1].substring(0, 1) != "0") {
                this.parms[unescape(parm[0])] = num;
            }
        }
    }

    // parse http://domain/path into scheme, domain, path
    this.url.match(/(\w+):\/\/([\w\.]+)(\/.*)/);
    this.scheme = RegExp.$1;
    this.host = RegExp.$2;
    this.path = RegExp.$3;

    // METHODS

    // assemble the query part of the URL
    this.getQuery = function()
    {
        queryItems = new Array();
        for (var p in this.parms) {
            if (this.parms[p])
                queryItems.push(escape(p) + "=" + escape(this.parms[p]));
        }
        if (queryItems.length == 0) {
            return "";
        }
        else {
            return "?" + queryItems.join("&");
        }
    }

    // assemble the whole URL
    this.toString = function()
    {
        return this.url + this.getQuery();
    }
}


// --------------- helper functions ---------------

/** Lookup preference setting and conditionally execute with error handling.
*/
function dispatchFeature(feaureName, func)
{
    if (prefs.get(feaureName))
    {
        tryCatch("feature: " + feaureName, func);
    }
}

/** Provide debug info if function throws an exception.
*/
function tryCatch(desc, func)
{
    try { func(); }
    catch(err) {
        log.error(
            "exception @ " + err.lineNumber + " [" + desc + "]" + " : " + err + "\n"
            + genStackTrace(arguments.callee)
        );
    }
}

/** Generate a UUID.
*/
function generateUuid() {
    return (S4()+S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4()+S4()+S4());

    function S4() {
        // 5 digit random #
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
}

// --------------- Stack Trace ---------------

function genStackTrace(func)
{
    var depthLimit = 20;
    var stackTrace = "Stack trace:\n";
    while (func != null) {
        if (--depthLimit < 0) {
            stackTrace += "more ...\n";
            break;
        }
        stackTrace += "called by: " + getFunctionSignature(func) + "\n";
        // TBD: line# within func
        func = func.caller;
    }

    return stackTrace + "\n\n";
}

function getFunctionSignature(func)
{
    var signature = getFunctionName(func);
    signature += "(";
    for (var i = 0; i < func.arguments.length; i++)
    {
        // trim long arguments
        var nextArgument = func.arguments[i];
        if (nextArgument.length > 30)
            nextArgument = nextArgument.substring(0, 30) + "...";

        // apend the next argument to the signature
        signature += "'" + nextArgument + "'";

        // comma separator
        if (i < func.arguments.length - 1)
            signature += ", ";
    }
    signature += ")";

    return signature;
}

function getFunctionName(func)
{
    // mozilla makes it easy
    if (func.name != null) {
        return func.name;
    }

    // try to parse the function name from the defintion
    var definition = func.toString();
    var name = definition.substring(
        definition.indexOf('function') + 8,
        definition.indexOf('(')
    );
    if (name != null)
        return name;

    // sometimes there won't be a function name (eg, dynamic functions)
    return "anonymous";
}
