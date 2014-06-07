// ==UserScript==
// @name           SMz addons
// @namespace      surrealmoviez.info
// @description    Add extra functionalities to SMz
// @updateURL      https://userscripts.org/scripts/source/156051.meta.js
// @downloadURL    https://userscripts.org/scripts/source/156051.user.js
// @include        http://www.surrealmoviez.info/*
// @exclude        http://www.surrealmoviez.info/game.php
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest 
// @version        1.1.2
// ==/UserScript==

function wrapTextjQ(element_name, openTag, closeTag) {
    var textArea = $("[name=" + element_name + "]");
    var text = textArea.val();
    var oldScrollTop = $(textArea)[0].scrollTop;
    var start = $(textArea)[0].selectionStart;
    var end = $(textArea)[0].selectionEnd;
    var selectedText = text.substring(start, end);
    var replacement = openTag + selectedText + closeTag;
    textArea.val(text.substring(0, start) + replacement + text.substring(end));
    var openTagchars = openTag.length;
    var closeTagchars = closeTag.length;
    if (openTag.indexOf("a href") !== -1 || openTag.indexOf("url") !== -1) {
        start += openTagchars;
        openTagchars = 0;
        closeTagchars = 0;
    }
    $(textArea)[0].selectionStart = start;
    $(textArea)[0].selectionEnd = start + selectedText.length + openTagchars + closeTagchars;
    $(textArea)[0].scrollTop = oldScrollTop;
    $(textArea)[0].focus();
}

function replaceText(elname, newtext) {
    var textArea = $("[name=" + elname + "]");
    var text = textArea.val();
    var oldScrollTop = $(textArea)[0].scrollTop;

    var start = $(textArea)[0].selectionStart;
    var end = $(textArea)[0].selectionEnd;

    textArea.val(text.substring(0, start) + newtext + text.substring(end));

    $(textArea)[0].selectionStart = start;
    $(textArea)[0].selectionEnd = start + newtext.length;
    $(textArea)[0].scrollTop = oldScrollTop;
    $(textArea)[0].focus();
}

function extractSelectedText(elname) {
    var selectedText = "";
    var textArea = $('[name="' + elname + '"]').get(0);
    var start = textArea.selectionStart;
    var end = textArea.selectionEnd;

    selectedText = $(textArea).val().substring(start, end);

    return selectedText;
}

function formatFields(nameLinks, nameCaps, nameSpecs, nameCommms, namePass) {
    var cont_downlinks = $('[name="' + nameLinks + '"]').val();
    var cont_caps = $('[name="' + nameCaps + '"]').val();
    var cont_specs = $('[name="' + nameSpecs + '"]').val();
    var cont_comm = $('[name="' + nameCommms + '"]').val();
    var cont_pass = $('[name="' + namePass + '"]').val();
    var txt_downlinks = "";
    var txt_caps_start = "";
    var txt_caps_end = "";
    var txt_specs_start = "";
    var txt_specs_end = "";
    var txt_comm = "";
    var txt_mirror_by = "";
    var txt_altver_by = "";
    var txt_pass_start = "";
    var txt_pass_end = "";
    var handle_five_fields = true;
    var temp_username = $('td:contains("Edit Profile")').text();
    var username = temp_username.substring(temp_username.lastIndexOf(".:: ") + 4, temp_username.lastIndexOf(" ::."));
    var usercolor = "";
    var temp_usercolor = "";
    var txt_usercolor_start = "<span style='color:";
    var txt_usercolor_mid = ";'>";
    var txt_usercolor_end = "</span>";
    if ($('[name="' + nameLinks + '"]').length === 0) {
        handle_five_fields = false;
        cont_downlinks = "";
        cont_comm = "";
    }
    if (cont_downlinks !== "" && handle_five_fields) {
        txt_downlinks = "<b>Download Links:</b>\n";
        if (nameLinks.indexOf("mirror") !== -1) {
            txt_downlinks = "OR";
        }
    }
    if (cont_caps !== "") {
        cont_caps = formatImages(cont_caps);
        txt_caps_start = "\n\n\n";
        txt_caps_end = "\n";
        if (nameLinks.indexOf("capsspecs") !== -1) {
            txt_caps_start = "";
        }
    }
    if (cont_specs !== "") {
        if (cont_specs.indexOf("<") === 0) {
            txt_specs_start = "\n\n";
            txt_specs_end = "";
        } else {
            txt_specs_start = "\n\n<b>Technical specs:</b>\n<blockquote><tt><span style='color:silver;font-size:7.5pt'>";
            txt_specs_end = "</span></tt></blockquote>";
        }
    }
    if (cont_comm !== "" && handle_five_fields) {
        txt_comm = "\n\n\n";
    }

    if (cont_pass !== "" && handle_five_fields) {
        txt_pass_start = "\n\n<b>Rar Password:</b> " + cont_pass;
        if (txt_caps_start !== "\n\n\n") {
            txt_pass_end = "\n\n";
        }
    }

    if (cont_pass === "" && handle_five_fields && nameLinks.indexOf("reup") !== -1) {
        txt_pass_start = "\n\n<b>Rar Password:</b> None";
    }

    if (cont_pass === "" && handle_five_fields && nameLinks.indexOf("altrip") !== -1) {
        txt_pass_start = "\n\n<b>Rar Password:</b> None";
    }

    if (nameLinks.indexOf("mirror") !== -1) {
        try {
            temp_usercolor = $('span:contains(' + username + ')').get()[0].outerHTML;
            if (temp_usercolor.length !== 0) {
                usercolor = $('span:contains(' + username + ')').css('color');
            }
        }
        catch (err) {
            usercolor = "green";
        }

        txt_mirror_by = " (mirror provided by <b>" + txt_usercolor_start + usercolor + txt_usercolor_mid + username + txt_usercolor_end + "</b>)\n\n";
    }
    if (nameLinks.indexOf("altrip") !== -1) {
        try {
            temp_usercolor = $('span:contains(' + username + ')').get()[0].outerHTML;
            if (temp_usercolor.length !== 0) {
                usercolor = $('span:contains(' + username + ')').css('color');
            }
        }
        catch (err) {
            usercolor = "green";
        }
        txt_altver_by = "<hr>\n\n\n<center><span style='color:orange'><b>[Alternative rip provided by " + txt_usercolor_start + usercolor + txt_usercolor_mid + username + txt_usercolor_end + "]</b></span></center>\n\n\n";
    }
    $('[name="comment_message"]').val($('[name="comment_message"]').val() + '*****************\n\n' + txt_altver_by + txt_downlinks + txt_mirror_by + cont_downlinks + txt_pass_start + txt_pass_end + txt_caps_start + cont_caps + txt_caps_end + txt_specs_start + cont_specs + txt_specs_end + txt_comm + cont_comm + '\n\n*****************\n\n\n');
}

function formatImages(rawImgs) {
    var extractedImgs = [];
    var formattedImgs = "";
    var tempDom = $("<div>" + rawImgs + "</div>");
    var imgs = $("img", tempDom);

    if (imgs.length !== 0) {
        imgs.map(function() {
            extractedImgs.push(this.src);
        }).get();
        formattedImgs = '<center><img src="' + extractedImgs.join('">\n\n<img src="') + '"></center>';
    }
    else if (rawImgs.indexOf("http") === 0 || rawImgs.indexOf("www") === 0) {
        var lines = rawImgs.replace(/^\s+|\s+$/g, "");
        lines = lines.split(/\n/);
        for (var i = 0; i < lines.length; i++) {
            // only push this line if it contains a non whitespace character.
            if (/\S/.test(lines[i])) {
                extractedImgs.push($.trim(lines[i]));
            }
        }
        formattedImgs = '<center><img src="' + extractedImgs.join('">\n\n<img src="') + '"></center>';
    }
    else {
        formattedImgs = rawImgs;
    }

    return formattedImgs;
}

function parseImdbInfo(rawHtml, mode) {
    var notFoundAlert = "NOT FOUND, CHECK MANUALLY.";
    if (mode === 1) {
        var directorsArray = [];
        var director = notFoundAlert;
        var title = notFoundAlert;
        var date = notFoundAlert;
        var extendedAka = "";
        var rating = "";
        var extendedRating = "";
        var languages = notFoundAlert;
        var countries = notFoundAlert;

        // Extract director(s)
        $("#director-info a", $(rawHtml)).each(function(index) {
            directorsArray.push($(this).text());
        });
        if (directorsArray.length === 1) {
            director = directorsArray[0];
        } else if (directorsArray.length > 1) {
            director = directorsArray.join(" | ");
        }

        // Extract title
        title = $.trim($("#tn15title h1", $(rawHtml)).clone().children().remove().end().text());

        // Extract AKA if provided instead of the title
        extendedAka = $.trim($("#tn15title .title-extra", $(rawHtml)).text());
        if (extendedAka.indexOf("(original title)") !== -1) {
            title = $.trim($("#tn15title .title-extra", $(rawHtml)).clone().children().remove().end().text());
        }

        // Extract date
        date = $.trim($("#tn15title > h1 > span > a", $(rawHtml)).text());
        if (date.length !== 4) {
            var arr = date.match(/\d\d\d\d/g);
            date = arr[0];
        }

        // Extract rating
        extendedRating = $("#tn15rating .general", $(rawHtml)).text();
        if (extendedRating.indexOf("(awaiting 5 votes)") === -1 && extendedRating !== "") {
            rating = $("#tn15rating .general .starbar-meta b", $(rawHtml)).text();
        } else if (extendedRating.indexOf("(awaiting 5 votes)") !== -1)
            rating = "Awaiting 5 votes";

        // Extract languages
        var divLanguage = $('.info h5:contains("Language:")', $(rawHtml)).parent();
        if (divLanguage) {
            languages = $('.info-content', divLanguage).text();
        }

        // Extract countries
        var divCountries = $('.info h5:contains("Country:")', $(rawHtml)).parent();
        if (divCountries) {
            countries = $('.info-content', divCountries).text();
        }

        $('[name="article_subject"]').val(title + " (" + date + ")");
        $('[name="article_rating"]').val(rating);
        $('[name="article_lang"]').val(languages);
        $('[name="article_country"]').val(countries);
        $('[name="article_director"]').val(director);

    } else if (mode === 2) {
        var castArray = [];
        var cast = notFoundAlert;
        var ellipse = " ... ";

        $(".cast_list tr", $(rawHtml)).each(function() {
            if ($(this).hasClass("even") || $(this).hasClass("odd")) {
                var castLine = "";
                var actorName = $("span.itemprop", $(this)).text();
                var characterName = $.trim($("td.character > div", $(this)).text().replace(/\n/g, "").replace(/       /g, " "));

                castLine = actorName;

                if (characterName !== "") {
                    castLine = actorName + ellipse + characterName;
                }

                castArray.push(castLine);
            }
        });

        if (castArray.length > 0) {
            cast = castArray.join("\n");
        }

        $('[name="article_cast"]').val(cast);

    } else if (mode === 3) {
        var divTable = '<br><input id="close_akas" type="button" class="button" value="Close AKAs" style="float:right;display:inline;"><input id="show_akas" type="button" class="button" value="Show AKAs" style="float:right;display:none;"><br><div id="div_akas" style="border:1px solid; border-radius:5px; opacity:0.8; margin-top:5px; margin-bottom: 5px;"><span id="msg_akas" style="display: block; margin: 0px auto; text-align: center;">Available AKAs. Select the best one if needed.</span></div>';
        $(divTable).insertAfter('[name="article_subject"]');

        $('#close_akas').click(function() {
            $("#div_akas").hide();
            $('#close_akas').hide();
            $("#show_akas").show();
        });

        $('#show_akas').click(function() {
            $("#div_akas").show();
            $('#show_akas').hide();
            $('#close_akas').show();
        });

        var table = $("table#akas", $(rawHtml)).html();
        table = table.replace(/tbody/g, "table");
        $("<br><br>" + table).insertAfter("#msg_akas");
    }
}

function extractImbdId() {
    var imdbUrl = $('[name="article_imdb"]').val();
    if (imdbUrl === "") {
        return ("");
    }

    var idStart = imdbUrl.indexOf("/tt") + 1;
    var idEnd = imdbUrl.indexOf("/", idStart);

    if (idEnd === -1) {
        idEnd = imdbUrl.length;
    }

    if (imdbUrl.indexOf("imdb.com/") !== -1 && idStart !== 0) {
        imdbUrl = imdbUrl.substring(idStart, idEnd);
        return imdbUrl;
    } else
        return false;
}

// Creates a table with private messages backup
// Displayed in a new window
function createMessagesTable(section, arrayMessages) {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;

    var page_beginning = '<html><head><title>SMz ' + section + ' PMs backup (' + today + ')</title>'
            + '<style media="screen" type="text/css">  a.reportdl:link {color: #FFFFFF; text-decoration: none; } a.reportdl:visited {color: #FFFFFF; text-decoration: none; } a.reportdl:hover {color: #CCCCCC; text-decoration: underline; } a.reportdl:active {color: #FFFFFF; text-decoration: none; }  a.newmessage:link {color: #FF0000; text-decoration: none; } a.newmessage:visited {color: #FF0000; text-decoration: none; } a.newmessage:hover {color: #880000; text-decoration: underline; } a.newmessage:active {color: #FF0000; text-decoration: none; }  a { color:#777; text-decoration:none; } a:hover { color:#999; text-decoration:underline; }  a.side { color:#777; text-decoration:none; } a:hover.side { color:#999; text-decoration:underline; }  a.white { color:#ccc; text-decoration:none; } a:hover.white { color:#ccc; text-decoration:underline; }  body { 	font-family:Verdana,Tahoma,Arial,Sans-Serif; 	font-size:11px; 	background-image: url(images/bg.jpg); 	margin:10px; }  form { margin:0px 0px 0px 0px; }  hr { height:2px; border-bottom:#333 1px solid; border-top:#000 1px solid; } hr.side-hr { height:2px; border-bottom:#333 1px solid; border-top:#000 1px solid; }  td { font-family:Verdana,Tahoma,Arial,Sans-Serif; font-size:11px; }  pre { font-family:Verdana,Tahoma,Arial,Sans-Serif; font-size:10px; }  .alt { color:#aaa; }  .white-header { 	font-family:Verdana,Tahoma,Arial,Sans-Serif; 	font-size:10px; 	color:#ccc; 	padding:4px 4px 6px 4px; }  .full-header { 	font-family:Verdana,Tahoma,Arial,Sans-Serif; 	font-size:10px; 	color:#eee; }  .button { 	font-family:Tahoma,Arial,Verdana,Sans-Serif; 	font-size:10px; 	color:#aaa; background-color:#222; 	height:19px; 	border:1px #333 solid; margin-top:2px; }  .button_link { 	font-family:Tahoma,Arial,Verdana,Sans-Serif; 	font-size:10px; 	color:green; background: none; 	height:19px; 	border: none; } 	 .textbox { 	font-family:Verdana,Tahoma,Arial,Sans-Serif; 	font-size:10px; 	color:#aaa; background-color:#222; 	border:1px #333 solid; }  .main-body { 	font-size:11px; 	color:#ccc;background-color:#000; 	padding:4px 4px 5px 4px; }  .side-body { 	font-size:10px; 	color:#ccc; 	background-color:#000; 	padding:4px; }  .main-bg { padding:0px 0px 5px 0px; }  .border { border:1px #333 solid; }  .side-border-left { padding:0px 10px 0px 0px; } .side-border-right { padding:0px 0px 0px 10px; }  .news-footer { 	font-size:9px; 	color:#ccc;background-color:#000; 	padding:3px 4px 4px 4px; }  .barmain { 	font-family:Verdana,Tahoma,Arial,Sans-Serif; 	font-size:10px; 	color:#aaa; 	padding:4px 4px 4px 4px; }  .readart { 	font-family:Verdana,Tahoma,Arial,Sans-Serif; 	font-size:10px; 	font-weight:bold; 	color:#FFFFFF; }  .capmain { 	font-family:Verdana,Tahoma,Arial,Sans-Serif; 	font-size:10px; 	font-weight:bold; 	color:#FFFFFF;background-image: url(images/tdbg.gif); 	padding:4px 4px 2px 4px; }  .scapmain { 	font-family:Verdana,Tahoma,Arial,Sans-Serif; 	font-size:10px; 	font-weight:bold; 	color:#FFFFFF;background-image: url(images/tdbg.gif); 	padding:4px 4px 1px 4px; }  .tbl-border { background-color:#333; } .tbl { font-size:11px; padding:4px; } .tbl1 { font-size:11px; color:#ccc; background-color:#000; padding:4px; } .tbl2 { font-size:11px; color:#ccc; background-color:#222; padding:4px; }  .tblx { font-size:11px; color:#ccc; } .tblxx { font-size:11px; color:orange; } .tbl3 { font-size:9px; color:#ccc; background-color:#111; padding:2px; } .tbl4 { font-size:9px; color:#ccc; background-color:#222; padding:2px; } .tbl5 { font-size:10px; color:#ccc; background-color:#222; padding:4px; } 	 .forum-caption { 	font-size:10px; 	color:#cc0000;background-color:#000; 	height:20px; 	padding:0px 4px 2px 4px; }  .quote { 	color:#aaa;background-color:#222; 	padding:2px; 	margin:0px 20px 0px 20px; 	border:1px #444 solid; } 	 .poll { height:12px; border:1px #000 solid; }  .comment-name {	font-weight:bold; color:#bbb; }  .shoutboxname { font-weight:bold; color:#ccc; } .shoutbox { color:#888; } .shoutboxdate { font-size:9px; color:#999; }  .small { font-size:10px; font-weight:normal; } .small2 { font-size:10px; font-weight:normal; color:#777; } .side-small { font-size:10px; font-weight:normal; color:#777; } .side-label { padding:2px; }  .gallery { padding: 16px 0px 8px 0px; } .gallery img { border: 1px solid #ccc; filter: gray; } .gallery:hover img { border: 1px solid red; filter: none; } img.activegallery { border: 1px solid green; filter: none; }  .szajs { width:100%; } .szajs img { float:left; width:99%;border:none; }   .szajs2 { width:100%; } .szajs2 img { float:left; width:25%;border:none; }   .dhtmltooltip{ position: absolute; width: 150px; border: 2px solid black; padding: 2px; background-color: lightyellow; visibility: hidden; z-index: 100; /*Remove below line to remove shadow. Below line should always appear last within this CSS*/ filter: progid:DXImageTransform.Microsoft.Shadow(color=gray,direction=135); }  </style>'
            + '</head><body bgcolor="#000000" text="#888888">';
    var page_end = "</body></html>";

    var tables = arrayMessages.join("<br><br>");

    var page_table = page_beginning + tables + page_end;

    addJS_Node(null, null, fireNewTab(page_table));

//    var j = window.open('', '_blank');
//    j.document.write('<html><head></head><body> <ul><li>a</li><li>b</li><li>c</li></ul> </body></html>');
//    j.document.close();
}

function fireNewTab(html) {
    var newTab = window.open('about:blank', '_blank');
    newTab.addEventListener(
            "load",
            function() {
                //--- Now process the popup/tab, as desired.
                var destDoc = newTab.document;
                destDoc.open();
                destDoc.write(html);
                destDoc.close();
            },
            false
            );
}

function addJS_Node(text, s_URL, funcToRun, runOnLoad) {
    var D = document;
    var scriptNode = D.createElement('script');
    if (runOnLoad) {
        scriptNode.addEventListener("load", runOnLoad, false);
    }
    scriptNode.type = "text/javascript";
    if (text)
        scriptNode.textContent = text;
    if (s_URL)
        scriptNode.src = s_URL;
    if (funcToRun)
        scriptNode.textContent = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    targ.appendChild(scriptNode);
}

function gmGet(name) {
    var value = GM_getValue(name);
    if (typeof (value === 'undefined'))
        value = "";
    return value;
}

function gmSet(name, value) {
    GM_setValue(name, value);
}

// Profile box modifier, script menu
if ($("td.scapmain:contains('User Info')").length > 0) {
    var prevWidth = $(".main-bg").width();
    var menuScript = '<div id="script-preferences" class="custom-preferences" style="display: none; width: ' + prevWidth + '; text-align: center; border: 1px solid #333333; overflow: hidden; padding-bottom: 10px;">'
            + '<p style="width: 100%; text-align: left; font-family: Verdana,Tahoma,Arial,Sans-Serif; font-size: 10px; font-weight: bold; color: #FFF; padding-top: 4px; padding-left: 4px; margin-top: 0px; background-image: url(\'http://www.surrealmoviez.info/themes/Darken/images/tdbg.gif\');">Script Preferences</p>'
            + '<p style="width: 100%; text-align: left; font-family: Verdana,Tahoma,Arial,Sans-Serif; font-size: 10px; font-weight: bold; margin-left: 10px;">Submission preferences</p><br>'
            + '<table align="center" cellspacing="0" cellpadding="0">'
            + '<tbody>'
            + '<tr>'
            + '<td class="tbl">Custom Password:</td>'
            + '<td class="tbl">'
            + '<input type="text" style="width:200px;" class="textbox" name="gm-value" gm-name="custom-password">'
            + '</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>'
            + '<br><br>'
            + '<input id="update-script-preferences" class="button" type="submit" value="Update Script Preferences">'
            + '<br>'
            + '<span id="script-precereces-updated" style="display: none; font-family: Verdana,Tahoma,Arial,Sans-Serif; font-size: 10px; font-weight: bold; color: #008000;">Preferences updated</span>'
            + '</div>';
    $(menuScript).insertBefore(".main-bg");

    var editScript = '<br><img src="http://www.surrealmoviez.info/themes/Darken/images/bullet.gif"> <a id="script-preferences-link" class="side" href="#">Script Preferences<span id="close-script-preferences" style="display: none;"> [x]</span></a>';
    $(editScript).insertAfter("a.side:contains('Private Messages')");

    var alreadyLoaded = false;

    $("#script-preferences-link").click(function(evt) {
        evt.preventDefault();

        // Populate fields
        if (!alreadyLoaded) {
            $("#script-preferences input[name=gm-value]").each(function(i, v) {
                var name = $(this).attr("gm-name");
                $(this).val(gmGet(name).toString());
            });
            alreadyLoaded = true;
        }

        $(".main-bg").toggle();
        $("#script-preferences").toggle();
        $("#close-script-preferences").toggle();
    });

    $("#update-script-preferences").click(function(evt) {
        evt.preventDefault();
        $("#script-preferences input[name=gm-value]").each(function(i, v) {
            var name = $(this).attr("gm-name");
            var value = $(this).val();
            gmSet(name, value);
            $("#script-precereces-updated").show().delay(2000).fadeOut();
        });
    });
}

// Determine if the Submit Movie page is running
if (document.documentURI.indexOf("surrealmoviez.info/submit.php?stype=a") !== -1) {

    // Delete the rules and instructions when previewing
    if ($(".capmain").length === 2) {
        var summaryInstructions = '<br>For detailed explanations of each field, check this <a href="http://www.surrealmoviez.info/forum/viewthread.php?forum_id=27&amp;thread_id=8135" style="text-decoration:underline">tutorial</a>.<br>'
                + 'For re-ups, mirrors and upgrades of existing articles, check this <a href="http://www.surrealmoviez.info/forum/viewthread.php?forum_id=27&amp;thread_id=11733" style="text-decoration:underline">tutorial</a><br><br>';
        $(summaryInstructions).insertBefore("#submit_instructions");
        $("#submit_instructions").remove();
    }

    // Define the buttons for the Color area
    var color_col = "<input id='color_col' type='button' value='color' class='button' style='width:33px;'>";
    var bw_col = "<input id='bw_col' type='button' value='B&W' class='button' style='width:35px;'>";
    var mixed_col = "<input id='mixed_col' type='button' value='color/B&W' class='button' style='width:63px;'>";
    // Define the buttons for the IMDb URL area
    var fetch_imdb = "<input id='fetch_imdb' type='button' value='Autocomplete Submission' class='button'>";
    // Define the button for the Director area
    var link_director = "<input id='link_director' type='button' value='link' class='button' style='width:25px;'>";
    // Define the button for the Cast area
    var link_cast = "<input id='link_cast' type='button' value='link' class='button' style='width:25px;'>";
    // Define the buttons for the Description area
    var b_desc = "<input id='b_desc' type='button' value='b' class='button' style='font-weight:bold;width:25px;'>";
    var i_desc = "<input id='i_desc' type='button' value='i' class='button' style='font-style:italic;width:25px;'>";
    var u_desc = "<input id='u_desc' type='button' value='u' class='button' style='text-decoration:underline;width:25px;'>";
    var center_desc = "<input id='center_desc' type='button' value='center' class='button' style='width:40px;'>";
    var link_desc = "<input id='link_desc' type='button' value='link' class='button' style='width:25px;'>";
    var anonlink_desc = "<input id='anonlink_desc' type='button' value='anon-link' class='button' style='width:55px;'>";
    var img_desc = "<input id='img_desc' type='button' value='img' class='button' style='width:25px;'>";
    var small_desc = "<input id='small_desc' type='button' value='small' class='button' style='width:29px;'>";
    var blockquote_desc = "<input id='blockquote_desc' type='button' value='blockquote' class='button' style='width:57px;'>";
    var tt_desc = "<input id='tt_desc' type='button' value='tt' class='button' style='width:25px;'>";
    var format_imgs_desc = "<input id='format_imgs_desc' type='button' value='Format Images' class='button' style='width:75px;'>";
    var alignright_desc = "<input id='alignright_desc' type='button' value='align-right' class='button' style='width:70px;'>";
    // Define the buttons for the Additional Info area
    var b_xinfo = "<input id='b_xinfo' type='button' value='b' class='button' style='font-weight:bold;width:25px;'>";
    var i_xinfo = "<input id='i_xinfo' type='button' value='i' class='button' style='font-style:italic;width:25px;'>";
    var u_xinfo = "<input id='u_xinfo' type='button' value='u' class='button' style='text-decoration:underline;width:25px;'>";
    var center_xinfo = "<input id='center_xinfo' type='button' value='center' class='button' style='width:40px;'>";
    var link_xinfo = "<input id='link_xinfo' type='button' value='link' class='button' style='width:25px;'>";
    var anonlink_xinfo = "<input id='anonlink_xinfo' type='button' value='anon-link' class='button' style='width:55px;'>";
    var img_xinfo = "<input id='img_xinfo' type='button' value='img' class='button' style='width:25px;'>";
    var small_xinfo = "<input id='small_xinfo' type='button' value='small' class='button' style='width:29px;'>";
    var blockquote_xinfo = "<input id='blockquote_xinfo' type='button' value='blockquote' class='button' style='width:57px;'>";
    var tt_xinfo = "<input id='tt_xinfo' type='button' value='tt' class='button' style='width:25px;'>";
    var techspecs_xinfo = "<input id='techspecs_xinfo' type='button' value='Technical specs' class='button' style='width:80px;'>";
    var format_imgs_xinfo = "<input id='format_imgs_xinfo' type='button' value='Format Images' class='button' style='width:75px;'>";
    var alignright_xinfo = "<input id='alignright_xinfo' type='button' value='align-right' class='button' style='width:70px;'>";
    // Define the buttons for the Password area
    var none_pass = "<input id='none_pass' type='button' value='None' class='button' style='width:30px;'>";
    var custom_pass = "<i> </i><input id='custom_pass' type='button' value='' class='button'>";
    var SMz_pass = "<input id='SMz_pass' type='button' value='SMz' class='button' style='width:25px;'>";
    var surrealmoviez_pass = "<input id='surrealmoviez_pass' type='button' value='surrealmoviez.info' class='button' style='width:87px;'>";

    // Place new buttons for Article edits
    $("<br>" + color_col + " " + bw_col + " " + mixed_col).insertAfter('[name="article_color"]');
    $("<br>" + fetch_imdb).insertAfter('[name="article_imdb"]');
    $("<br>" + link_director).insertAfter('[name="article_director"]');
    $("<br>" + link_cast).insertAfter('[name="article_cast"]');
    $("<br>" + b_desc + " " + i_desc + " " + u_desc + " " + center_desc + " " + link_desc + " " + anonlink_desc + " " + img_desc + " " + small_desc + "<br>" + blockquote_desc + " " + tt_desc + " " + alignright_desc + " " + format_imgs_desc).insertAfter('[name="article_desc"]');
    $("<br>" + b_xinfo + " " + i_xinfo + " " + u_xinfo + " " + center_xinfo + " " + link_xinfo + " " + anonlink_xinfo + " " + img_xinfo + " " + small_xinfo + "<br>" + blockquote_xinfo + " " + tt_xinfo + " " + alignright_xinfo + " " + format_imgs_xinfo + " " + techspecs_xinfo).insertAfter('[name="article_xinfo"]');
    $(".small2").html(none_pass + " " + SMz_pass + " " + surrealmoviez_pass);

    // Generate the functions for the previously created buttons

    $('#color_col').click(function() {
        $('[name="article_color"]').val('Color');
    });

    $('#bw_col').click(function() {
        $('[name="article_color"]').val('Black & White');
    });

    $('#mixed_col').click(function() {
        $('[name="article_color"]').val('Color | Black & White');
    });

    $('#fetch_imdb').click(function() {
        // Delete previous results
        $("#message_languages_autocomplete").remove();
        $("#div_akas").remove();
        $("#show_akas").remove();
        $("#close_akas").remove();
        $("#smz-results-aimdb").empty();
        $("#smz-results-atitle").empty();
        $("#smz-results-ftitle").empty();

        var mainPageImdb = "";
        var castPageImdb = "";
        var imdbId = extractImbdId();
        var msgLanguage = '<span id="message_languages_autocomplete" style="color:#FE2E2E;opacity:0.35;font-size:10; display: block;">Don\'t forget to add the specific language info of your rip</span>';
        $('<div id="smz-results" style="display:none;"><div id="smz-results-aimdb"></div><div id="smz-results-atitle"></div><div id="smz-results-ftitle"></div></div>').insertAfter('#fetch_imdb');

        if (imdbId && imdbId !== "") {

            // Extract main info
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://www.imdb.com/title/" + imdbId + "/reference",
                onload: function(response) {
                    if (response.status === 200) {
                        mainPageImdb = response.responseText;
                        if (mainPageImdb && mainPageImdb !== "") {
                            parseImdbInfo(mainPageImdb, 1);
                            $(msgLanguage).insertAfter('[name="article_lang"]');
                            $('[name="article_imdb"]').val("www.imdb.com/title/" + imdbId);
                        } else
                            alert("An error ocurred. No data was found in the retrieved HTML.");
                    } else if (response.status === 404) {
                        alert("A 404 error was retrieved. You probably entered a wrong IMDb URL.");
                    } else {
                        alert("An error from IMDb was retrieved. Please check your link manually.");
                    }
                }
            });

            // Extract the cast
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://www.imdb.com/title/" + imdbId + "/fullcredits",
                onload: function(response) {
                    if (response.status === 200) {
                        castPageImdb = response.responseText;
                        if (castPageImdb && castPageImdb !== "") {
                            parseImdbInfo(castPageImdb, 2);
                        } else
                            alert("An error ocurred. No data was found in the retrieved HTML.");
                    } else if (response.status === 404) {
                        alert("A 404 error was retrieved. You probably entered a wrong IMDb URL.");
                    } else {
                        alert("An error from IMDb was retrieved. Please check your link manually.");
                    }
                }
            });

            // Extract AKAs
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://www.imdb.com/title/" + imdbId + "/releaseinfo",
                onload: function(response) {
                    if (response.status === 200) {
                        castPageImdb = response.responseText;
                        if (castPageImdb && castPageImdb !== "") {
                            parseImdbInfo(castPageImdb, 3);
                        } else
                            alert("An error ocurred. No data was found in the retrieved HTML.");
                    } else if (response.status === 404) {
                        alert("A 404 error was retrieved. You probably entered a wrong IMDb URL.");
                    } else {
                        alert("An error from IMDb was retrieved. Please check your link manually.");
                    }
                }
            });

            $("#smz-results").show();
            var basicSearchUrl = 'http://www.surrealmoviez.info/search.php';
            var advancedSearchUrl = 'http://www.surrealmoviez.info/advanced_search.php';

            // Get articles with the same IMDb in SMz
            $.ajax({
                type: "POST",
                url: basicSearchUrl,
                data: {stext: imdbId, search: "Search"},
                async: false
            }).done(function(response) {
                var nrResults = $(".main-body > a", $(response)).length;
                if (nrResults === 0) {
                    $("#smz-results-aimdb").append('0 articles with the same IMDb');
                } else {
                    if (nrResults > 9) {
                        nrResults = "10+";
                    }
                    $("#smz-results-aimdb").append('<a href="' + basicSearchUrl + '?' + 'stext=' + imdbId + '&search=Search">' + nrResults + ' article(s) with the same ID</a>');
                }
            }).fail(function() {
                $("#smz-results-aimdb").append('Error retrieving IMDb search results (articles)');
            });

            var tries = 0;
            var waitForTitle = setInterval(function() {
                var title = $('[name="article_subject"]').val();
                if (tries === 20) {
                    $("#smz-results-atitle").append('No title to search for in the articles');
                    $("#smz-results-ftitle").append('No title to search for in the forums');
                    window.clearInterval(waitForTitle);
                } else if (title === "") {
                    tries++;
                } else {
                    if (title.indexOf("(") !== -1) {
                        title = $.trim(title.substring(0, title.indexOf("(")));
                    }

                    // Get articles with the same title in SMz
                    $.ajax({
                        type: "POST",
                        url: advancedSearchUrl,
                        data: {stype: "a", stitle: title, syearmin: "", syearmax: "", slanguage: "", scountry: "", color: "", simdb: "", sdirector: "", scast: "", sdescription: "", sgenre: "All", skeyword: "", slinks: "", results_number: "10", search: "Search"},
                        async: false
                    }).done(function(response) {
                        var nrResults = $(".main-body > a", $(response)).length;
                        if (nrResults === 0) {
                            $("#smz-results-atitle").append('0 articles with the same title');
                        } else {
                            if (nrResults > 9) {
                                nrResults = "10+";
                            }
                            $("#smz-results-atitle").append('<a href="' + advancedSearchUrl + '?' + 'stype=a&stitle=' + title + '&syearmin=&syearmax=&slanguage=&scountry=&color=&simdb=&sdirector=&scast=&sdescription&sgenre=All&skeyword=&slinks=&results_number=10&search=Search">' + nrResults + ' article(s) with the same title</a>');
                        }
                    }).fail(function() {
                        $("#smz-results-atitle").append('Error retrieving title search results (articles)');
                    });

                    // Get forum posts mentioning the title in SMz
                    $.ajax({
                        type: "POST",
                        url: basicSearchUrl,
                        data: {stext: title, search: "Search", stype: "f"},
                        async: false
                    }).done(function(response) {
                        var nrResults = $(".main-body > a", $(response)).length;
                        if (nrResults === 0) {
                            $("#smz-results-ftitle").append('0 forum posts mentioning the title');
                        } else {
                            if (nrResults > 9) {
                                nrResults = "10+";
                            }
                            $("#smz-results-ftitle").append('<a href="' + basicSearchUrl + '?' + 'stext=' + title + '&search=Search&stype=f">' + nrResults + ' forum post(s) mentioning the title</a>');
                        }
                    }).fail(function() {
                        $("#smz-results-ftitle").append('Error retrieving title search results (forums)');
                    });
                    window.clearInterval(waitForTitle);
                }
            }, 1000);





        }
        else if (imdbId === "") {
            alert("You must provide a IMDb URL first.");
        }
        else
            alert("No valid IMDb ID could be created.");
    });

    $('#article_director').click(function() {
        wrapTextjQ('article_director', '<a href="">', '</a>');
    });

    $('#link_cast').click(function() {
        wrapTextjQ('article_cast', '<a href="">', '</a>');
    });

    $('#b_desc').click(function() {
        wrapTextjQ('article_desc', '<b>', '</b>');
    });

    $('#i_desc').click(function() {
        wrapTextjQ('article_desc', '<i>', '</i>');
    });

    $('#u_desc').click(function() {
        wrapTextjQ('article_desc', '<u>', '</u>');
    });

    $('#center_desc').click(function() {
        wrapTextjQ('article_desc', '<center>', '</center>');
    });

    $('#link_desc').click(function() {
        wrapTextjQ('article_desc', '<a href="">', '</a>');
    });

    $('#anonlink_desc').click(function() {
        wrapTextjQ('article_desc', '<a href="http://anonym.to/?">', '</a>');
    });

    $('#img_desc').click(function() {
        wrapTextjQ('article_desc', '<img src="', '">');
    });

    $('#small_desc').click(function() {
        wrapTextjQ('article_desc', '<small>', '</small>');
    });

    $('#blockquote_desc').click(function() {
        wrapTextjQ('article_desc', '<blockquote>', '</blockquote>');
    });

    $('#tt_desc').click(function() {
        wrapTextjQ('article_desc', '<tt>', '</tt>');
    });

    $('#alignright_desc').click(function() {
        wrapTextjQ('article_desc', '<span style="display:block;text-align:right;">', '</span>');
    });

    $('#format_imgs_desc').click(function() {
        replaceText("article_desc", formatImages(extractSelectedText("article_desc")));
    });

    $('#b_xinfo').click(function() {
        wrapTextjQ('article_xinfo', '<b>', '</b>');
    });

    $('#i_xinfo').click(function() {
        wrapTextjQ('article_xinfo', '<i>', '</i>');
    });

    $('#u_xinfo').click(function() {
        wrapTextjQ('article_xinfo', '<u>', '</u>');
    });

    $('#center_xinfo').click(function() {
        wrapTextjQ('article_xinfo', '<center>', '</center>');
    });

    $('#link_xinfo').click(function() {
        wrapTextjQ('article_xinfo', '<a href="">', '</a>');
    });

    $('#anonlink_xinfo').click(function() {
        wrapTextjQ('article_xinfo', '<a href="http://anonym.to/?">', '</a>');
    });

    $('#img_xinfo').click(function() {
        wrapTextjQ('article_xinfo', '<img src="', '">');
    });

    $('#small_xinfo').click(function() {
        wrapTextjQ('article_xinfo', '<small>', '</small>');
    });

    $('#blockquote_xinfo').click(function() {
        wrapTextjQ('article_xinfo', '<blockquote>', '</blockquote>');
    });

    $('#tt_xinfo').click(function() {
        wrapTextjQ('article_xinfo', '<tt>', '</tt>');
    });

    $('#techspecs_xinfo').click(function() {
        wrapTextjQ('article_xinfo', '<b>Technical specs:</b>\n<blockquote><tt><span style="color:silver;font-size:7.5pt">', '</span></tt></blockquote>');
    });

    $('#format_imgs_xinfo').click(function() {
        replaceText("article_xinfo", formatImages(extractSelectedText("article_xinfo")));
    });

    $('#alignright_xinfo').click(function() {
        wrapTextjQ('article_xinfo', '<span style="display:block;text-align:right;">', '</span>');
    });

    $('#none_pass').click(function() {
        $('[name="article_pass"]').val('None');
    });

    var customPass = gmGet("custom-password");
    if (customPass.toString() !== "") {
        var $custom_pass = $(custom_pass);
        $custom_pass.attr("value", customPass);
        $custom_pass.insertAfter("#none_pass");
        $custom_pass.click(function() {
            $('[name="article_pass"]').val(customPass);
        });
    }

    $('#SMz_pass').click(function() {
        $('[name="article_pass"]').val('SMz');
    });

    $('#surrealmoviez_pass').click(function() {
        $('[name="article_pass"]').val('surrealmoviez.info');
    });

    // More characters to write the title, date and aka
    $('[name="article_subject"]').attr('maxlength', '120');

    // Set a predefined password as standard for every submission ( change $('[name="article_pass"]').val('YOUR_PASS_HERE') )
    if ($(".capmain").length === 1) {
        $('[name="article_pass"]').val('');
    }
}

// Determine if an Article page is running
if (document.documentURI.indexOf("surrealmoviez.info/readarticle.php?article_id=") !== -1) {

    // Remove the "mail" and "youtube" buttons
    $('[value="mail"]').remove();

    // Define new buttons
    var anonlink_article = "<input id='anonlink_article' type='button' value='anon-link' class='button' style='width:55px;'>";
    var anon_article = "<input id='anon_article' type='button' value='anon' class='button' style='width:30px;'>";

    // Place new buttons for Forum's new threads edits
    $("<i> </i>" + anonlink_article + " " + anon_article).insertAfter('[value="url"]');

    // Add functionalities to the text-edition buttons
    $('#anonlink_article').click(function() {
        wrapTextjQ('comment_message', '[url=http://anonym.to/?]', '[/url]');
    });

    $('#anon_article').click(function() {
        wrapTextjQ('comment_message', 'http://anonym.to/?', '');
    });

    // Create new buttons to submit new material
    var art_button = "<input id='art_button' type='button' value='New Links / New Content' class='button' style='font-weight:bold;width:140px;'>";
    var art_button_adv = "<input id='art_button_adv' type='button' value='HTML editing box' class='button' style='font-weight:bold;width:120px;'>";
    $("<br><br>" + art_button + " " + art_button_adv).insertAfter('[value="spoiler"]');

    // Measure the window, create margins
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var marginTop = Math.floor((winHeight - 550) / 2);
    var marginLeft = Math.floor((winWidth - 700) / 2);

    // Define the different forms for simplified posting
    var body_reup = "<table id='table_reup' border='0' bordercolor='#FFCC00' style='background-color:#F7E4E4' width='680' cellpadding='0' cellspacing='5'>"
            + "<tr>"
            + "<td>Links:<br>"
            + "<textarea style='width:320px; background-color:#D1C5C5' rows='11' name='reup_links'></textarea></td>"
            + "<td>Screencaps <span id='spanhelpimages'><b>[<i>i</i>]</b>:</span><br>"
            + "<textarea style='width:320px; background-color:#D1C5C5' rows='11' name='reup_caps' placeholder='Will be auto-formatted'></textarea></td>"
            + "</tr>"
            + "<tr>"
            + "<td>"
            + "<table id='table_reup_inner' border='0' bordercolor='#FFCC00' style='background-color:#F7E4E4' cellpadding='0' cellspacing='0'>"
            + "<tr>Technical Specs <span id='spanhelpspecs'><b>[<i>i</i>]</b>:</span><br><textarea style='width:320px; background-color:#D1C5C5' rows='10' name='reup_specs' placeholder='Will be auto-formatted'></textarea></tr>"
            + "<tr>Pass: <input name='reup_pass' type='text' style='width:250px; background-color:#D1C5C5' placeholder='Only if new one needed'></tr>"
            + "</table>"
            + "</td>"
            + "<td>Comments:<br>"
            + "<textarea style='width:320px; background-color:#D1C5C5' rows='10' name='reup_comm' placeholder='All HTML format must be done by you'></textarea>"
            + "<br><input id='b_reup_comm' type='button' value='b' class='button' style='font-weight:bold;width:25px;'> "
            + "<input id='i_reup_comm' type='button' value='i' class='button' style='font-style:italic;width:25px;'> "
            + "<input id='center_reup_comm' type='button' value='cntr' class='button' style='width:30px;'> "
            + "<input id='link_reup_comm' type='button' value='link' class='button' style='width:25px;'> "
            + "<input id='anon_reup_comm' type='button' value='anon' class='button' style='width:30px;'> "
            + "<input id='img_reup_comm' type='button' value='img' class='button' style='width:25px;'> "
            + "<select class='textbox' id='color_reup_comm' style='margin-top:5px;' name='setcolor'>"
            + "<option value=''>--</option>"
            + "<option style='color:maroon;' value='maroon'>•</option>"
            + "<option style='color:red;' value='red'>•</option>"
            + "<option style='color:orange;' value='orange'>•</option>"
            + "<option style='color:brown;' value='brown'>•</option>"
            + "<option style='color:yellow;' value='yellow'>•</option>"
            + "<option style='color:green;' value='green'>•</option>"
            + "<option style='color:lime;' value='lime'>•</option>"
            + "<option style='color:olive;' value='olive'>•</option>"
            + "<option style='color:cyan;' value='cyan'>•</option>"
            + "<option style='color:blue;' value='blue'>•</option>"
            + "<option style='color:navy;' value='navy'>•</option>"
            + "<option style='color:purple;' value='purple'>•</option>"
            + "<option style='color:violet;' value='violet'>•</option>"
            + "<option style='color:black;' value='black'>•</option>"
            + "<option style='color:gray;' value='gray'>•</option>"
            + "<option style='color:silver;' value='silver'>•</option>"
            + "<option style='color:white;' value='white'>•</option>"
            + "</select></td>"
            + "</tr>"
            + "</table>"
            + "<center>___________________________<br><input id='ready_reup' class='button' type='submit' value='Ready'></center>";
    var body_mirror = "<table id='table_mirror' border='0' bordercolor='#FFCC00' style='background-color:#F7E4E4' width='680' cellpadding='0' cellspacing='5'>"
            + "<tr>"
            + "<td>Links:<br>"
            + "<textarea style='width:320px; background-color:#D1C5C5' rows='11' name='mirror_links'></textarea></td>"
            + "<td>Screencaps <span id='spanhelpimages'><b>[<i>i</i>]</b>:</span><br>"
            + "<textarea style='width:320px; background-color:#D1C5C5' rows='11' name='mirror_caps' placeholder='Will be auto-formatted'></textarea></td>"
            + "</tr>"
            + "<tr>"
            + "<td>"
            + "<table id='table_mirror_inner' border='0' bordercolor='#FFCC00' style='background-color:#F7E4E4' cellpadding='0' cellspacing='0'>"
            + "<tr>Technical Specs <span id='spanhelpspecs'><b>[<i>i</i>]</b>:</span><br><textarea style='width:320px; background-color:#D1C5C5' rows='10' name='mirror_specs' placeholder='Will be auto-formatted'></textarea></tr>"
            + "<tr>Pass: <input name='mirror_pass' type='text' style='width:250px; background-color:#D1C5C5' placeholder='Only if new one needed'></tr>"
            + "</table>"
            + "</td>"
            + "<td>Comments / Credits:<br>"
            + "<textarea style='width:320px; background-color:#D1C5C5' rows='10' name='mirror_comm' placeholder='All HTML format must be done by you'></textarea>"
            + "<br><input id='b_mirror_comm' type='button' value='b' class='button' style='font-weight:bold;width:25px;'> "
            + "<input id='i_mirror_comm' type='button' value='i' class='button' style='font-style:italic;width:25px;'> "
            + "<input id='center_mirror_comm' type='button' value='cntr' class='button' style='width:30px;'> "
            + "<input id='link_mirror_comm' type='button' value='link' class='button' style='width:25px;'> "
            + "<input id='anon_mirror_comm' type='button' value='anon' class='button' style='width:30px;'> "
            + "<input id='img_mirror_comm' type='button' value='img' class='button' style='width:25px;'> "
            + "<select class='textbox' id='color_mirror_comm' style='margin-top:5px;' name='setcolor'>"
            + "<option value=''>--</option>"
            + "<option style='color:maroon;' value='maroon'>•</option>"
            + "<option style='color:red;' value='red'>•</option>"
            + "<option style='color:orange;' value='orange'>•</option>"
            + "<option style='color:brown;' value='brown'>•</option>"
            + "<option style='color:yellow;' value='yellow'>•</option>"
            + "<option style='color:green;' value='green'>•</option>"
            + "<option style='color:lime;' value='lime'>•</option>"
            + "<option style='color:olive;' value='olive'>•</option>"
            + "<option style='color:cyan;' value='cyan'>•</option>"
            + "<option style='color:blue;' value='blue'>•</option>"
            + "<option style='color:navy;' value='navy'>•</option>"
            + "<option style='color:purple;' value='purple'>•</option>"
            + "<option style='color:violet;' value='violet'>•</option>"
            + "<option style='color:black;' value='black'>•</option>"
            + "<option style='color:gray;' value='gray'>•</option>"
            + "<option style='color:silver;' value='silver'>•</option>"
            + "<option style='color:white;' value='white'>•</option>"
            + "</select></td>"
            + "</tr>"
            + "</table>"
            + "<center>___________________________<br><input id='ready_mirror' class='button' type='submit' value='Ready'></center>";
    var body_altrip = "<table id='table_altrip' border='0' bordercolor='#FFCC00' style='background-color:#F7E4E4' width='680' cellpadding='0' cellspacing='5'>"
            + "<tr>"
            + "<td>Links:<br>"
            + "<textarea style='width:320px; background-color:#D1C5C5' rows='11' name='altrip_links'></textarea></td>"
            + "<td>Screencaps <span id='spanhelpimages'><b>[<i>i</i>]</b>:</span><br>"
            + "<textarea style='width:320px; background-color:#D1C5C5' rows='11' name='altrip_caps' placeholder='Will be auto-formatted'></textarea></td>"
            + "</tr>"
            + "<tr>"
            + "<td>"
            + "<table id='table_altrip_inner' border='0' bordercolor='#FFCC00' style='background-color:#F7E4E4' cellpadding='0' cellspacing='0'>"
            + "<tr>Technical Specs <span id='spanhelpspecs'><b>[<i>i</i>]</b>:</span><br><textarea style='width:320px; background-color:#D1C5C5' rows='10' name='altrip_specs' placeholder='Will be auto-formatted'></textarea></tr>"
            + "<tr>Pass: <input name='altrip_pass' type='text' style='width:250px; background-color:#D1C5C5' placeholder='Only if new one needed'></tr>"
            + "</table>"
            + "</td>"
            + "<td>Comments / Credits:<br>"
            + "<textarea style='width:320px; background-color:#D1C5C5' rows='10' name='altrip_comm' placeholder='All HTML format must be done by you'></textarea>"
            + "<br><input id='b_altrip_comm' type='button' value='b' class='button' style='font-weight:bold;width:25px;'> "
            + "<input id='i_altrip_comm' type='button' value='i' class='button' style='font-style:italic;width:25px;'> "
            + "<input id='center_altrip_comm' type='button' value='cntr' class='button' style='width:30px;'> "
            + "<input id='link_altrip_comm' type='button' value='link' class='button' style='width:25px;'> "
            + "<input id='anon_altrip_comm' type='button' value='anon' class='button' style='width:30px;'> "
            + "<input id='img_altrip_comm' type='button' value='img' class='button' style='width:25px;'> "
            + "<select class='textbox' id='color_altrip_comm' style='margin-top:5px;' name='setcolor'>"
            + "<option value=''>--</option>"
            + "<option style='color:maroon;' value='maroon'>•</option>"
            + "<option style='color:red;' value='red'>•</option>"
            + "<option style='color:orange;' value='orange'>•</option>"
            + "<option style='color:brown;' value='brown'>•</option>"
            + "<option style='color:yellow;' value='yellow'>•</option>"
            + "<option style='color:green;' value='green'>•</option>"
            + "<option style='color:lime;' value='lime'>•</option>"
            + "<option style='color:olive;' value='olive'>•</option>"
            + "<option style='color:cyan;' value='cyan'>•</option>"
            + "<option style='color:blue;' value='blue'>•</option>"
            + "<option style='color:navy;' value='navy'>•</option>"
            + "<option style='color:purple;' value='purple'>•</option>"
            + "<option style='color:violet;' value='violet'>•</option>"
            + "<option style='color:black;' value='black'>•</option>"
            + "<option style='color:gray;' value='gray'>•</option>"
            + "<option style='color:silver;' value='silver'>•</option>"
            + "<option style='color:white;' value='white'>•</option>"
            + "</select></td>"
            + "</tr>"
            + "</table>"
            + "<center>___________________________<br><input id='ready_altrip' class='button' type='submit' value='Ready'></center>";
    var body_capsspecs = "<table id='table_capsspecs' border='0' bordercolor='#FFCC00' style='background-color:#F7E4E4' width='680' cellpadding='0' cellspacing='5'>"
            + "<tr>"
            + "<td style='height:420px; width:340px'>Technical Specs <span id='spanhelpspecs'><b>[<i>i</i>]</b>:</span><br>"
            + "<textarea style='width:320px; background-color:#D1C5C5' rows='22' name='capsspecs_specs' placeholder='Will be auto-formatted'></textarea></td>"
            + "<td>Screencaps <span id='spanhelpimages'><b>[<i>i</i>]</b>:</span><br>"
            + "<textarea style='width:320px; background-color:#D1C5C5' rows='22' name='capsspecs_caps' placeholder='Will be auto-formatted'></textarea></td>"
            + "</tr>"
            + "</table>"
            + "<center>___________________________<br><input id='ready_capsspecs' class='button' type='submit' value='Ready'></center>";

    // Define the form for advanced HTML editing	
    var body_adv_comm = "<textarea style='width:680px; background-color:#D1C5C5' rows='28' name='post_adv_html'></textarea>"
            + "<br><input id='b_adv_comm' type='button' value='b' class='button' style='font-weight:bold;width:25px;'> "
            + "<input id='i_adv_comm' type='button' value='i' class='button' style='font-style:italic;width:25px;'> "
            + "<input id='center_adv_comm' type='button' value='center' class='button' style='width:35px;'> "
            + "<input id='link_adv_comm' type='button' value='link' class='button' style='width:25px;'> "
            + "<input id='anonlink_adv_comm' type='button' value='anon-link' class='button' style='width:53px;'> "
            + "<input id='anon_adv_comm' type='button' value='anon' class='button' style='width:30px;'> "
            + "<input id='img_adv_comm' type='button' value='img' class='button' style='width:25px;'> "
            + "<input id='small_adv_comm' type='button' value='small' class='button' style='width:29px;'> "
            + "<input id='blockquote_adv_comm' type='button' value='blockquote' class='button' style='width:57px;'> "
            + "<input id='tt_adv_comm' type='button' value='tt' class='button' style='width:25px;'> "
            + "<input id='techspecs_adv_comm' type='button' value='Technical specs' class='button' style='width:80px;'> "
            + "<input type='button' id='format_adv_comm' value='Format Imgs' class='button' style='width:80px;'> "
            + "<select class='textbox' id='color_adv_comm' style='margin-top:5px;' name='setcolor'>"
            + "<option value=''>--</option>"
            + "<option style='color:maroon;' value='maroon'>•</option>"
            + "<option style='color:red;' value='red'>•</option>"
            + "<option style='color:orange;' value='orange'>•</option>"
            + "<option style='color:brown;' value='brown'>•</option>"
            + "<option style='color:yellow;' value='yellow'>•</option>"
            + "<option style='color:green;' value='green'>•</option>"
            + "<option style='color:lime;' value='lime'>•</option>"
            + "<option style='color:olive;' value='olive'>•</option>"
            + "<option style='color:cyan;' value='cyan'>•</option>"
            + "<option style='color:blue;' value='blue'>•</option>"
            + "<option style='color:navy;' value='navy'>•</option>"
            + "<option style='color:purple;' value='purple'>•</option>"
            + "<option style='color:violet;' value='violet'>•</option>"
            + "<option style='color:black;' value='black'>•</option>"
            + "<option style='color:gray;' value='gray'>•</option>"
            + "<option style='color:silver;' value='silver'>•</option>"
            + "<option style='color:white;' value='white'>•</option>"
            + "</select>"
            + "<center>___________________________<br><input id='ready_adv' class='button' type='submit' value='Ready'></center>";

    // Define the text for the help popups
    var help_type = "<b>Re-up:</b> Replacement file for a previously posted version (<i>exactly</i> the same file). <b>Use this option if all previous links are dead!</b><br><br>Please include screencaps and/or specs if they're missing.<br><br>"
            + "<b>Mirror:</b> Alternative links for an existing film. If the Article has different versions, specify which one are you mirroring.  Include screencaps and/or specs if they're missing.<br><br>"
            + "<b>Alternative rip:</b> New version of an existing film. Upgrades, extended editions, different formats are examples of alternative rips. Don't forget to include screencaps and specs (min.3).<br><br>"
            + "<b>New Caps/Specs:</b> Use this form to post missing screencaps and/or specs for an existing film.<br><br>"
            + "For more information and how-to guides, visit the Tutorials!";
    var help_images = "Insert one image per line, as direct url (<i>http://www.yourhost.com/youriage1.jpg</i>) or &lt;img&gt;-tagged, whatever suits you best.<br><br>"
            + "Remember that <b>at least 3 caps are mandatory</b> if you're posting a new rip or the previous one has none.<br><br>"
            + "For more information and how-to guides, visit the Tutorials!";
    var help_specs = "Minimal File Specifications are <b>file size, format and resolution</b>, but more detailed specs are also welcomed.<br><br>"
            + "Remember that specs are mandatory for new rips or if the previous one has none.<br><br>"
            + "For more information and how-to guides, visit the Tutorials!";

    // Create the new dialogue layer
    $("body").append(""
            // Simplified posting
            + "<div id='fullContainer'><div id='formContainer'>"
            + "<div id='formHeader'>"
            + "<center><form method='post'>"
            + "<input type='radio' value='1' id='opt_reup' name='opts_script'><label for='opt_reup'> Re-Up </label>"
            + "<input type='radio' value='2' id='opt_mirror' name='opts_script'><label for='opt_mirror'> Mirror </label>"
            + "<input type='radio' value='3' id='opt_altrip' name='opts_script'><label for='opt_altrip'> Alternative Rip </label>"
            + "<input type='radio' value='4' id='opt_capsspecs' name='opts_script'><label for='opt_capsspecs'> New Caps/Specs</label>"
            + "</form><br>___________________________</center>"
            + "</div>"

            + "<div id='formBody'>"
            + "<br><br><br><center>Select an option<br><br><span id='spanhelptype'><i> </i><b>[<i>i</i>]</b><i> </i></span></center>"
            + "</div>"

            + "<div id='formBodyReup'>" + body_reup + "</div>"
            + "<div id='formBodyMirror'>" + body_mirror + "</div>"
            + "<div id='formBodyAltrip'>" + body_altrip + "</div>"
            + "<div id='formBodyCapsspecs'>" + body_capsspecs + "</div>"

            + "</div>"

            + "<div id='transparentFilm'></div></div>"

            // Advanced HTML editing
            + "<div id='fullContainerAdv'><div id='formContainerAdv'>"
            + "<div id='formBodyAdv'>"
            + body_adv_comm
            + "</div>"
            + "</div>"
            + "<div id='transparentFilmAdv'></div></div>"

            // Help popups
            + "<div id='bodyHelpType'>"
            + help_type
            + "</div>"

            + "<div id='bodyHelpImages'>"
            + help_images
            + "</div>"

            + "<div id='bodyHelpSpecs'>"
            + help_specs
            + "</div>"
            );

    // Define position and styles for the created divs
    $("#fullContainer")
            .height(winHeight)
            .hide()
            .css({
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'width': '100%',
                'z-index': 30
            });
    $("#transparentFilm")
            .height(winHeight)
            .css({
                'opacity': 0.8,
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'background-color': 'black',
                'width': '100%',
                'z-index': 50
            });
    $("#formContainer")
            .height(winHeight)
            .css({
                'position': 'fixed',
                'top': marginTop,
                'left': marginLeft,
                'background-color': '#F7E4E4',
                'border-radius': '15px',
                'width': '700px',
                'height': '550px',
                'z-index': 60
            });
    $("#formHeader")
            .height(winHeight)
            .css({
                'position': 'absolute',
                'top': 10,
                'left': 10,
                'width': '680px',
                'height': '50px',
                'z-index': 70
            });
    $("#formBody")
            .height(winHeight)
            .css({
                'position': 'absolute',
                'top': 60,
                'left': 10,
                'width': '680px',
                'height': '480px',
                'z-index': 71
            });
    $("#formBodyReup")
            .height(winHeight)
            .hide()
            .css({
                'position': 'absolute',
                'top': 60,
                'left': 10,
                'width': '680px',
                'height': '480px',
                'z-index': 71
            });
    $("#formBodyMirror")
            .height(winHeight)
            .hide()
            .css({
                'position': 'absolute',
                'top': 60,
                'left': 10,
                'width': '680px',
                'height': '480px',
                'z-index': 71
            });
    $("#formBodyAltrip")
            .height(winHeight)
            .hide()
            .css({
                'position': 'absolute',
                'top': 60,
                'left': 10,
                'width': '680px',
                'height': '480px',
                'z-index': 71
            });
    $("#formBodyCapsspecs")
            .height(winHeight)
            .hide()
            .css({
                'position': 'absolute',
                'top': 60,
                'left': 10,
                'width': '680px',
                'height': '480px',
                'z-index': 71
            });
    $("#fullContainerAdv")
            .height(winHeight)
            .hide()
            .css({
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'width': '100%',
                'z-index': 30
            });
    $("#formContainerAdv")
            .height(winHeight)
            .css({
                'position': 'fixed',
                'top': marginTop,
                'left': marginLeft,
                'background-color': '#F7E4E4',
                'border-radius': '15px',
                'width': '700px',
                'height': '550px',
                'z-index': 60
            });
    $("#formBodyAdv")
            .height(winHeight)
            .css({
                'position': 'absolute',
                'top': 10,
                'left': 10,
                'width': '680px',
                'height': '530px',
                'z-index': 71
            });
    $("#transparentFilmAdv")
            .height(winHeight)
            .css({
                'opacity': 0.8,
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'background-color': 'black',
                'width': '100%',
                'z-index': 50
            });
    $("#bodyHelpType")
            .hide()
            .css({
                'position': 'fixed',
                'top': 20,
                'left': 20,
                'background-color': '#F7E4E4',
                'padding': '15px',
                'border-radius': '10px',
                'box-shadow': '0px 0px 10px 8px black',
                'width': '300px',
                'min-height': '50px',
                'z-index': 600
            });
    $("#bodyHelpImages")
            .hide()
            .css({
                'position': 'fixed',
                'top': 20,
                'left': 20,
                'background-color': '#F7E4E4',
                'padding': '15px',
                'border-radius': '10px',
                'box-shadow': '0px 0px 10px 8px black',
                'width': '300px',
                'min-height': '50px',
                'z-index': 600
            });
    $("#bodyHelpSpecs")
            .hide()
            .css({
                'position': 'fixed',
                'top': 20,
                'right': 20,
                'background-color': '#F7E4E4',
                'padding': '15px',
                'border-radius': '10px',
                'box-shadow': '0px 0px 10px 8px black',
                'width': '300px',
                'min-height': '50px',
                'z-index': 600
            });

    // Make the popups behave like popups
    $("span#spanhelptype").hover(
            function() {
                $("#bodyHelpType").show().animate({
                    opacity: 1
                }, 500);
            },
            function() {
                $("#bodyHelpType").show().animate({
                    opacity: 0
                }, 200);
            }
    );

    $("span#spanhelpimages").hover(
            function() {
                $("#bodyHelpImages").show().animate({
                    opacity: 1
                }, 500);
            },
            function() {
                $("#bodyHelpImages").show().animate({
                    opacity: 0
                }, 200);
            }
    );

    $("span#spanhelpspecs").hover(
            function() {
                $("#bodyHelpSpecs").show().animate({
                    opacity: 1
                }, 500);
            },
            function() {
                $("#bodyHelpSpecs").show().animate({
                    opacity: 0
                }, 200);
            }
    );

    // Modify the simplified form according to the selected option
    $(document).ready(function() {
        $("input[name$='opts_script']").click(function() {
            var radio_value = $(this).val();
            if (radio_value === '1') {
                $("#formBody").hide();
                $("#formBodyMirror").hide();
                $("#formBodyAltrip").hide();
                $("#formBodyCapsspecs").hide();
                $("#formBodyReup").show();
            }
            else if (radio_value === '2') {
                $("#formBody").hide();
                $("#formBodyReup").hide();
                $("#formBodyAltrip").hide();
                $("#formBodyCapsspecs").hide();
                $("#formBodyMirror").show();
            }
            else if (radio_value === '3') {
                $("#formBody").hide();
                $("#formBodyMirror").hide();
                $("#formBodyReup").hide();
                $("#formBodyCapsspecs").hide();
                $("#formBodyAltrip").show();
            }
            else if (radio_value === '4') {
                $("#formBody").hide();
                $("#formBodyMirror").hide();
                $("#formBodyAltrip").hide();
                $("#formBodyReup").hide();
                $("#formBodyCapsspecs").show();
            }
        });
        $("#art_button").click(function() {
            $("#fullContainer").show("slow");
        });
        $("#art_button_adv").click(function() {
            $("#fullContainerAdv").show("slow");
        });
    });

    // Hide the dialogue layer when the transparent black film is clicked
    $(document).mouseup(function(e) {
        var container_sel = $("#formContainer");
        var container_tohide = $("#fullContainer");
        if (container_sel.has(e.target).length === 0) {
            container_tohide.hide("slow");
        }
    });

    $(document).mouseup(function(e) {
        var container_sel = $("#formContainerAdv");
        var container_tohide = $("#fullContainerAdv");
        if (container_sel.has(e.target).length === 0) {
            container_tohide.hide("slow");
        }
    });

    // Add functionalities to the text-edition buttons
    $('#b_reup_comm').click(function() {
        wrapTextjQ('reup_comm', '<b>', '</b>');
    });
    $('#i_reup_comm').click(function() {
        wrapTextjQ('reup_comm', '<i>', '</i>');
    });
    $('#center_reup_comm').click(function() {
        wrapTextjQ('reup_comm', '<center>', '</center>');
    });
    $('#link_reup_comm').click(function() {
        wrapTextjQ('reup_comm', '<a href="">', '</a>');
    });
    $('#anon_reup_comm').click(function() {
        wrapTextjQ('reup_comm', 'http://anonym.to/?', '');
    });
    $('#img_reup_comm').click(function() {
        wrapTextjQ('reup_comm', '<img src="', '">');
    });
    $('#color_reup_comm').on("change", function() {
        wrapTextjQ('reup_comm', '<span style=\'color:' + this.options[this.selectedIndex].value + ';\'>', '</span>');
        this.selectedIndex = 0;
    });
    $('#b_mirror_comm').click(function() {
        wrapTextjQ('mirror_comm', '<b>', '</b>');
    });
    $('#i_mirror_comm').click(function() {
        wrapTextjQ('mirror_comm', '<i>', '</i>');
    });
    $('#center_mirror_comm').click(function() {
        wrapTextjQ('mirror_comm', '<center>', '</center>');
    });
    $('#link_mirror_comm').click(function() {
        wrapTextjQ('mirror_comm', '<a href="">', '</a>');
    });
    $('#anon_mirror_comm').click(function() {
        wrapTextjQ('mirror_comm', 'http://anonym.to/?', '');
    });
    $('#img_mirror_comm').click(function() {
        wrapTextjQ('mirror_comm', '<img src="', '">');
    });
    $('#color_mirror_comm').on("change", function() {
        wrapTextjQ('mirror_comm', '<span style=\'color:' + this.options[this.selectedIndex].value + ';\'>', '</span>');
        this.selectedIndex = 0;
    });
    $('#b_altrip_comm').click(function() {
        wrapTextjQ('altrip_comm', '<b>', '</b>');
    });
    $('#i_altrip_comm').click(function() {
        wrapTextjQ('altrip_comm', '<i>', '</i>');
    });
    $('#center_altrip_comm').click(function() {
        wrapTextjQ('altrip_comm', '<center>', '</center>');
    });
    $('#link_altrip_comm').click(function() {
        wrapTextjQ('altrip_comm', '<a href="">', '</a>');
    });
    $('#anon_altrip_comm').click(function() {
        wrapTextjQ('altrip_comm', 'http://anonym.to/?', '');
    });
    $('#img_altrip_comm').click(function() {
        wrapTextjQ('altrip_comm', '<img src="', '">');
    });
    $('#color_altrip_comm').on("change", function() {
        wrapTextjQ('altrip_comm', '<span style=\'color:' + this.options[this.selectedIndex].value + ';\'>', '</span>');
        this.selectedIndex = 0;
    });
    $('#b_adv_comm').click(function() {
        wrapTextjQ('post_adv_html', '<b>', '</b>');
    });
    $('#i_adv_comm').click(function() {
        wrapTextjQ('post_adv_html', '<i>', '</i>');
    });
    $('#center_adv_comm').click(function() {
        wrapTextjQ('post_adv_html', '<center>', '</center>');
    });
    $('#link_adv_comm').click(function() {
        wrapTextjQ('post_adv_html', '<a href="">', '</a>');
    });
    $('#anonlink_adv_comm').click(function() {
        wrapTextjQ('post_adv_html', '<a href="http://anonym.to/?">', '</a>');
    });
    $('#anon_adv_comm').click(function() {
        wrapTextjQ('post_adv_html', 'http://anonym.to/?', '');
    });
    $('#img_adv_comm').click(function() {
        wrapTextjQ('post_adv_html', '<img src="', '">');
    });
    $('#color_adv_comm').on("change", function() {
        wrapTextjQ('post_adv_html', '<span style=\'color:' + this.options[this.selectedIndex].value + ';\'>', '</span>');
        this.selectedIndex = 0;
    });
    $('#small_adv_comm').click(function() {
        wrapTextjQ('post_adv_html', '<small>', '</small>');
    });
    $('#blockquote_adv_comm').click(function() {
        wrapTextjQ('post_adv_html', '<blockquote>', '</blockquote>');
    });
    $('#tt_adv_comm').click(function() {
        wrapTextjQ('post_adv_html', '<tt>', '</tt>');
    });
    $('#techspecs_adv_comm').click(function() {
        wrapTextjQ('post_adv_html', '<b>Technical specs:</b>\n<blockquote><tt><span style="color:silver;font-size:7.5pt">', '</span></tt></blockquote>');
    });
    $('#format_adv_comm').click(function() {
        replaceText("post_adv_html", formatImages(extractSelectedText("post_adv_html")));
    });

    // Create actions for the "Ready" buttons
    $('#ready_reup').click(function() {
        // Disable smileys
        $('input[name=disable_smileys]').attr('checked', true);
        formatFields('reup_links', 'reup_caps', 'reup_specs', 'reup_comm', 'reup_pass');
        $("#fullContainer").hide("slow");
    });
    $('#ready_mirror').click(function() {
        // Disable smileys
        $('input[name=disable_smileys]').attr('checked', true);
        formatFields('mirror_links', 'mirror_caps', 'mirror_specs', 'mirror_comm', 'mirror_pass');
        $("#fullContainer").hide("slow");
    });
    $('#ready_altrip').click(function() {
        // Disable smileys
        $('input[name=disable_smileys]').attr('checked', true);
        formatFields('altrip_links', 'altrip_caps', 'altrip_specs', 'altrip_comm', 'altrip_pass');
        $("#fullContainer").hide("slow");
    });
    $('#ready_capsspecs').click(function() {
        // Disable smileys
        $('input[name=disable_smileys]').attr('checked', true);
        formatFields('capsspecs_links', 'capsspecs_caps', 'capsspecs_specs', 'capsspecs_comm', 'capsspecs_pass');
        $("#fullContainer").hide("slow");
    });
    $('#ready_adv').click(function() {
        // Disable smileys
        $('input[name=disable_smileys]').attr('checked', true);
        $('[name="comment_message"]').val($('[name="comment_message"]').val() + $('[name="post_adv_html"]').val());
        $("#fullContainerAdv").hide("slow");
    });
}


// Determine if the index page is running
if (document.documentURI.indexOf("www.surrealmoviez.info/news.php") !== -1) {

    // Define the buttons for the Shoutbox
    var b_shout = "<input id='b_shout' type='button' value='b' class='button' style='font-weight:bold;width:25px;'>";
    var i_shout = "<input id='i_shout' type='button' value='i' class='button' style='font-style:italic;width:25px;'>";
    var u_shout = "<input id='u_shout' type='button' value='u' class='button' style='text-decoration:underline;width:25px;'>";
    var link_shout = "<input id='link_shout' type='button' value='link' class='button' style='width:25px;'>";
    var anonlink_shout = "<input id='anonlink_shout' type='button' value='anon-link' class='button' style='width:55px;'>";
    var red_shout = "<input id='red_shout' type='button' value='•' class='button' style='width:15px;color:red;'>";
    var green_shout = "<input id='green_shout' type='button' value='•' class='button' style='width:15px;color:green;'>";
    var blue_shout = "<input id='blue_shout' type='button' value='•' class='button' style='width:15px;color:blue;'>";
    var yellow_shout = "<input id='yellow_shout' type='button' value='•' class='button' style='width:15px;color:yellow;'>";
    var violet_shout = "<input id='violet_shout' type='button' value='•' class='button' style='width:15px;color:violet;'>";

    // Place the new buttons
    $('a:contains("BB-Codes")').replaceWith(b_shout + " " + i_shout + " " + u_shout + " " + link_shout + " " + anonlink_shout + " " + red_shout + " " + green_shout + " " + blue_shout + " " + yellow_shout + " " + violet_shout);

    // Add functionalities to the text-edition buttons
    $('#b_shout').click(function() {
        wrapTextjQ('thepost', '[b]', '[/b]');
    });
    $('#i_shout').click(function() {
        wrapTextjQ('thepost', '[i]', '[/i]');
    });
    $('#u_shout').click(function() {
        wrapTextjQ('thepost', '[u]', '[/u]');
    });
    $('#link_shout').click(function() {
        wrapTextjQ('thepost', '[url]', '[/url]');
    });
    $('#anonlink_shout').click(function() {
        wrapTextjQ('thepost', '[url]http://anonym.to/?', '[/url]');
    });
    $('#red_shout').click(function() {
        wrapTextjQ('thepost', '[red]', '[/red]');
    });
    $('#green_shout').click(function() {
        wrapTextjQ('thepost', '[green]', '[/green]');
    });
    $('#blue_shout').click(function() {
        wrapTextjQ('thepost', '[blue]', '[/blue]');
    });
    $('#yellow_shout').click(function() {
        wrapTextjQ('thepost', '[yellow]', '[/yellow]');
    });
    $('#violet_shout').click(function() {
        wrapTextjQ('thepost', '[violet]', '[/violet]');
    });
}

// Determine if a forum page, a forum 'post reply' or a PM-compose-page is running
if (document.documentURI.indexOf("www.surrealmoviez.info/forum/viewthread.php?") !== -1 ||
        document.documentURI.indexOf("www.surrealmoviez.info/forum/post.php?action=reply") !== -1 ||
        document.documentURI.indexOf("www.surrealmoviez.info/messages.php?msg_send=") !== -1 ||
        document.documentURI.indexOf("www.surrealmoviez.info/messages.php?folder=inbox&msg_send=") !== -1) {

    // Remove the "mail" button
    $('[value="mail"]').remove();

    // Define new buttons
    var anonlink_forum = "<input id='anonlink_forum' type='button' value='anon-link' class='button' style='width:55px;'>";
    var anon_forum = "<input id='anon_forum' type='button' value='anon' class='button' style='width:30px;'>";
    var color_forum = "<select class='textbox' id='color_forum' style='margin-top:5px;' name='setcolor'>"
            + "<option value=''>--</option>"
            + "<option style='color:maroon;' value='maroon'>•</option>"
            + "<option style='color:red;' value='red'>•</option>"
            + "<option style='color:orange;' value='orange'>•</option>"
            + "<option style='color:brown;' value='brown'>•</option>"
            + "<option style='color:yellow;' value='yellow'>•</option>"
            + "<option style='color:green;' value='green'>•</option>"
            + "<option style='color:lime;' value='lime'>•</option>"
            + "<option style='color:olive;' value='olive'>•</option>"
            + "<option style='color:cyan;' value='cyan'>•</option>"
            + "<option style='color:blue;' value='blue'>•</option>"
            + "<option style='color:navy;' value='navy'>•</option>"
            + "<option style='color:purple;' value='purple'>•</option>"
            + "<option style='color:violet;' value='violet'>•</option>"
            + "<option style='color:black;' value='black'>•</option>"
            + "<option style='color:gray;' value='gray'>•</option>"
            + "<option style='color:silver;' value='silver'>•</option>"
            + "<option style='color:white;' value='white'>•</option>"
            + "</select>";

    // Place new buttons for Forum's posts edits
    $("<i> </i>" + anonlink_forum + " " + anon_forum).insertAfter('[value="url"]');
    $("<i> </i>" + color_forum).insertAfter('[value="spoiler"]');

    // Add functionalities to the text-edition buttons
    $('#anonlink_forum').click(function() {
        wrapTextjQ('message', '[url=http://anonym.to/?]', '[/url]');
    });
    $('#anon_forum').click(function() {
        wrapTextjQ('message', 'http://anonym.to/?', '');
    });
    $('#color_forum').on("change", function() {
        wrapTextjQ('message', '[color=' + this.options[this.selectedIndex].value + ']', '[/color]');
        this.selectedIndex = 0;
    });
}

// Determine if a "New Thread" forum page is running
if (document.documentURI.indexOf("www.surrealmoviez.info/forum/post.php?action=newthread&") !== -1) {

    // Remove the "mail" and "youtube"´buttons
    $('[value="mail"]').remove();
    $('[value="youtube"]').remove();

    // Define new buttons
    var anonlink_newthread = "<input id='anonlink_newthread' type='button' value='anon-link' class='button' style='width:55px;'>";
    var anon_newthread = "<input id='anon_newthread' type='button' value='anon' class='button' style='width:30px;'>";

    // Place new buttons for Forum's new threads edits
    $("<i> </i>" + anonlink_newthread + " " + anon_newthread).insertAfter('[value="url"]');

    // Add functionalities to the text-edition buttons
    $('#anonlink_newthread').click(function() {
        wrapTextjQ('message', '[url=http://anonym.to/?]', '[/url]');
    });
    $('#anon_newthread').click(function() {
        wrapTextjQ('message', 'http://anonym.to/?', '');
    });
}

// Determine if a "Edit Forum Post" is running
if (document.documentURI.indexOf("www.surrealmoviez.info/forum/post.php?action=edit") !== -1) {

    // Remove the "mail" and "youtube" buttons
    $('[value="mail"]').remove();
    $('[value="youtube"]').remove();

    // Define new buttons
    var anonlink_editpost = "<input id='anonlink_editpost' type='button' value='anon-link' class='button' style='width:55px;'>";
    var anon_editpost = "<input id='anon_editpost' type='button' value='anon' class='button' style='width:30px;'>";

    // Place new buttons for Forum's new threads edits
    $("<i> </i>" + anonlink_editpost + " " + anon_editpost).insertAfter('[value="url"]');

    // Add functionalities to the text-edition buttons
    $('#anonlink_editpost').click(function() {
        wrapTextjQ('message', '[url=http://anonym.to/?]', '[/url]');
    });
    $('#anon_editpost').click(function() {
        wrapTextjQ('message', 'http://anonym.to/?', '');
    });
}

// Determine if the "Private Messages" are running
if (document.documentURI.indexOf("www.surrealmoviez.info/messages.php") !== -1) {

    // Determine inbox/outbox/archive
    var docURI = document.documentURI;
    var positionEquals = docURI.indexOf("=") + 1;
    var positionLastAnd = docURI.indexOf("&", positionEquals);
    var section;
    if (positionEquals !== 0) {
        section = docURI.substring(positionEquals);
        if (positionLastAnd !== -1) {
            section = section.substring(0, section.indexOf("&"));
        }
    } else {
        section = "inbox";
    }

    // Define new elements
    var backupButton = '<input id="backupButton" type="button" value="Backup ' + section + '" class="button">';
    var div_waiting = "<div id='transparentLayerWaiting'></div><div id='containerWaiting'>"
            + "<img src='http://i.imgur.com/uQqkT4p.png' title='absolutely'>"
            + '<br><br><span>Currently in page <span id="pageNumber"></span>. Messages done: <span id="messagesDone"></span></span>'
            + "</div>";

    // Place new elements
    $("<i></i> | " + backupButton).insertAfter('.tbl > a:contains("Uncheck all")');
    $("body").append(div_waiting);

    // CSS
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var marginTopW = Math.floor((winHeight - 200) / 2);
    var marginLeftW = Math.floor((winWidth - 200) / 2);
    $("#transparentLayerWaiting")
            .hide()
            .css({
                'opacity': 0.9,
                'position': 'fixed',
                'top': '0px',
                'left': '0px',
                'right': '0px',
                'bottom': '0px',
                'background-color': 'black',
                'width': '100%',
                'z-index': 3001
            });

    $("#containerWaiting")
            .hide()
            .css({
                'position': 'fixed',
                'top': marginTopW,
                'left': marginLeftW,
                'z-index': 4001
            });

    // Add functionality to the backup button
    $('#backupButton').click(function() {
        $("#transparentLayerWaiting").show();
        $("#containerWaiting").show();

        var msgsHtml = "";
        var arrayMsgs = [];
        var pages = $("table.tbl-border tr td.tbl2 span.small").text();
        if (pages) {
            pages = pages.substring(pages.lastIndexOf(" ") + 1);
        } else {
            pages = 1;
        }
        var msgCount = 0;
        var everythingFine = true;

        $("#messagesDone").text(msgCount);

        // Iterate over the message pages
        for (var i = 0; i < pages; i++) {

            $("#pageNumber").text(i + 1);

            $.ajaxSetup({
                'beforeSend': function(xhr) {
                    xhr.overrideMimeType('text/html; charset=iso-8859-1');
                }
            });

            // Grab the HTML content of the message page
            $.ajax({
                type: "GET",
                url: "http://www.surrealmoviez.info/messages.php?folder=" + section + "&rowstart=" + i * 20,
                async: false,
                success: function(text) {
                    msgsHtml = text;
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert("Could not retrieve info from page " + i + ".\nPlease try again later\n\n(" + thrownError + ")");
                    everythingFine = false;
                }
            });

            if (!everythingFine) {
                break;
            }

            // Iterate over the links to the actual messages
            $("table.tbl-border:eq(0) tr td.tbl1:first-child a", $(msgsHtml)).each(function(i, v) {
                msgCount++;
                $("#messagesDone").text(msgCount);
                var msgHref = $(this).attr('href');
                var msgHtml = "";
                var msgTable = "";
                $.ajax({
                    type: "GET",
                    url: "http://www.surrealmoviez.info/" + msgHref,
                    async: false,
                    success: function(text) {
                        msgHtml = text;
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        alert("Could not retrieve the HTML from " + msgHref + ".\nPlease try again later\n\n(" + thrownError + ")");
                        everythingFine = false;
                    }
                });

                if (!everythingFine) {
                    return false;
                }

                msgTable = '<table class="tbl-border" width="100%" cellspacing="1" cellpadding="0">' + $("form table.tbl-border", $(msgHtml)).html() + '</table>';
                arrayMsgs.push(msgTable);
            });

        }

        if (everythingFine) {
            $("#transparentLayerWaiting").hide();
            $("#containerWaiting").hide();
            createMessagesTable(section, arrayMsgs);
        }
    });
}