// ==UserScript==,
// @name       Java Doc System
// @namespace  it.ifritprog.std,
// @version    0.1.25,
// @description  enter something useful,
// @match      http://docs.oracle.com/javase/7/docs/api/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @copyright  2013+, Ifrit_Prog
// ==/UserScript==

var core_css = "body{background-color:#fff;color:#353833;font-family:Arial, Helvetica, sans-serif;font-size:10pt;margin:0}a:link{color:#060;text-decoration:none}a:visited{color:#575;text-decoration:none}a:active{color:#4c6b87;text-decoration:none}a[name]{color:#353833}a[name]:hover{color:#353833;text-decoration:none}h1{font-size:1.8em}h2{font-size:1.5em}h3{font-size:1.4em}h6{font-size:1.1em}ul{list-style-type:disc}table tr td dt code{font-size:1.2em;vertical-align:top}sup{font-size:.6em}.clear{clear:both;height:0;overflow:hidden}.aboutLanguage{float:right;font-size:.8em;margin-top:-7px;padding:0 21px;z-index:200}.legalCopy{margin-left:.5em}.bar a:hover,.bar a:focus{color:#bb7a2a}.tab{background:linear-gradient(tobottom,#1ca8000%,#18900044%,#126c00100%);color:#fff;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#1ca800\',endColorstr=\'#126c00\',GradientType=0);font-weight:700;padding:8px;width:5em}.bar{background-color:#333;color:#FFF;font-size:1em;height:auto;margin:0;padding:.8em .5em .4em .8em}.topNav{background-color:#333;clear:right;color:#FFF;float:left;height:2.8em;overflow:hidden;padding:10px 0 0;width:100%}.bottomNav{background-color:#333;clear:right;color:#FFF;float:left;height:2.8em;margin-top:10px;overflow:hidden;padding:10px 0 0;width:100%}.subNav{background-color:#ccc;border-bottom:1px solid #777;float:left;overflow:hidden;width:100%}.subNav div{clear:left;float:left;padding:0 0 5px 6px}ul.navList,ul.subNavList{float:left;margin:0 25px 0 0;padding:0}ul.navList li{float:left;list-style:none;padding:3px 6px}ul.subNavList li{float:left;font-size:90%;list-style:none}.navBarCell1Rev{background:#1ca800;border:1px solid #ddd;color:#FFF;margin:auto 5px}.header,.footer{clear:both;margin:0 20px;padding:5px 0 0}.indexHeader{margin:10px;position:relative}.title{color:#2c4557;margin:10px 0}.subTitle{margin:5px 0 0}.header ul{margin:0 0 25px;padding:0}.footer ul{margin:20px 0 5px}.header ul li,.footer ul li{font-size:1.2em;list-style:none}ul.blockList ul.blockList li.blockList h3{margin:15px 0;padding:0}ul.blockList li.blockList h2{padding:0 0 20px}.contentContainer,.sourceContainer,.classUseContainer,.serializedFormContainer,.constantValuesContainer{clear:both;padding:10px 20px;position:relative}.indexContainer{font-size:1em;margin:10px;position:relative}.indexContainer h2{font-size:1.1em;padding:0 0 3px}.indexContainer ul li{list-style:none}.contentContainer .description dl dt,.contentContainer .details dl dt,.serializedFormContainer dl dt{color:#4E4E4E;font-size:1.1em;font-weight:700;margin:10px 0 0}.contentContainer .description dl dd,.contentContainer .details dl dd,.serializedFormContainer dl dd{margin:10px 0 10px 20px}.serializedFormContainer dl.nameValue dt{display:inline;font-size:1.1em;font-weight:700;margin-left:1px}.serializedFormContainer dl.nameValue dd{display:inline;font-size:1.1em;margin:0 0 0 1px}ul.horizontal li{display:inline;font-size:.9em}ul.inheritance li{display:inline;list-style:none}ul.inheritance li ul.inheritance{margin-left:15px;padding-left:15px;padding-top:1px}ul.blockList,ul.blockListLast{margin:10px 0;padding:0}ul.blockList li.blockList,ul.blockListLast li.blockList{list-style:none;margin-bottom:25px}ul.blockList ul.blockList li.blockList,ul.blockList ul.blockListLast li.blockList{background-color:#f5f5f5;border:1px solid #ddd;padding:0 20px 5px 10px}ul.blockList ul.blockList ul.blockList li.blockList,ul.blockList ul.blockList ul.blockListLast li.blockList{background-color:#FFF;border:1px solid #aaa;padding:0 0 5px 8px}ul.blockList ul.blockList ul.blockList ul.blockList li.blockList{border-bottom:5px solid red;margin-left:0;padding-bottom:15px;padding-left:0}ul.blockList ul.blockList ul.blockList ul.blockList li.blockListLast{border-bottom:none;list-style:none;padding-bottom:0}table tr td dl,table tr td dl dt,table tr td dl dd{margin-bottom:1px;margin-top:0}.contentContainer table,.classUseContainer table,.constantValuesContainer table{border-bottom:1px solid #555;width:100%}.contentContainer ul li table,.classUseContainer ul li table,.constantValuesContainer ul li table{width:100%}.contentContainer .description table,.contentContainer .details table{border-bottom:none}.contentContainer ul li table th.colOne,.contentContainer ul li table th.colFirst,.contentContainer ul li table th.colLast,.classUseContainer ul li table th,.constantValuesContainer ul li table th,.contentContainer ul li table td.colOne,.contentContainer ul li table td.colFirst,.contentContainer ul li table td.colLast,.classUseContainer ul li table td,.constantValuesContainer ul li table td{padding-right:20px;vertical-align:top}.contentContainer ul li table th.colLast,.classUseContainer ul li table th.colLast,.constantValuesContainer ul li table th.colLast,.contentContainer ul li table td.colLast,.classUseContainer ul li table td.colLast,.constantValuesContainer ul li table td.colLast,.contentContainer ul li table th.colOne,.classUseContainer ul li table th.colOne,.contentContainer ul li table td.colOne,.classUseContainer ul li table td.colOne{padding-right:3px}.overviewSummary caption,.packageSummary caption,.contentContainer ul.blockList li.blockList caption,.summary caption,.classUseContainer caption,.constantValuesContainer caption{background-repeat:no-repeat;clear:none;color:#FFF;font-weight:700;margin:0;overflow:hidden;padding:0;position:relative;text-align:left}caption a:link,caption a:hover,caption a:active,caption a:visited{color:#FFF}.overviewSummary caption span,.packageSummary caption span,.contentContainer ul.blockList li.blockList caption span,.summary caption span,.classUseContainer caption span,.constantValuesContainer caption span{background:#1ca800;border:1px solid #333;border-bottom:none;display:block;float:left;height:18px;padding:5px 10px;white-space:nowrap}.overviewSummary .tabEnd,.packageSummary .tabEnd,.contentContainer ul.blockList li.blockList .tabEnd,.summary .tabEnd,.classUseContainer .tabEnd,.constantValuesContainer .tabEnd{background:#1ca800;float:left;position:relative;width:10px}ul.blockList ul.blockList li.blockList table{margin:0 0 12px;width:100%}.tableSubHeadingColor{background-color:red}.altColor{background-color:#eee}.rowColor{background-color:#fff}.overviewSummary td,.packageSummary td,.contentContainer ul.blockList li.blockList td,.summary td,.classUseContainer td,.constantValuesContainer td{padding:3px 3px 3px 7px;text-align:left}th.colFirst,th.colLast,th.colOne,.constantValuesContainer th{background:#ddd;border-bottom:1px solid #555;border-top:1px solid #555;padding:3px 3px 3px 7px;text-align:left}td.colFirst,th.colFirst{border-left:1px solid #555;white-space:nowrap}td.colLast,th.colLast{border-right:1px solid #555}td.colOne,th.colOne{border-left:1px solid #555;border-right:1px solid #555}table.overviewSummary{margin-left:0;padding:0}.description pre{margin-top:0}.deprecatedContent{margin:0;padding:10px 0}.docSummary{padding:0}.sourceLineNo{color:green;padding:0 30px 0 0}h1.hidden{font-size:.9em;overflow:hidden;visibility:hidden}.block{display:block;margin:3px 0 0}hr{background-color:#333;border:none;height:1px;margin:auto;width:98%}div.custom_note{border:1px solid #ddd;margin:5px 15px 5px auto;padding:2px 2px 5px}div.custom_note:hover{background-color:#ddd;color:#000}div.custom_note div{background:#373;color:#FFF;display:inline-block;font-weight:700;padding:2px 10px}.tabEnd{visibility:collapse}table.custom_bool_return{border:1px solid #ddd!important;border-collapse:collapse;display:inline-block!important;margin:auto 0!important;width:auto!important}table.custom_bool_return tr th{background:#363;border:1px solid #ddd!important;color:#FFF;text-align:center}table.custom_bool_return tr td{border:1px solid #ddd!important;padding:2px 10px!important}span.custom_directive{background-color:#ddd;border:1px solid #5a5;color:#555;font-family:monospace;font-variant:small-caps;margin:0 3px;padding:1px 5px}code{color:#050}a,td.colOne a:link,td.colOne a:active,td.colOne a:visited,td.colOne a:hover,td.colFirst a:link,td.colFirst a:active,td.colFirst a:visited,td.colFirst a:hover,td.colLast a:link,td.colLast a:active,td.colLast a:visited,td.colLast a:hover,.constantValuesContainer td a:link,.constantValuesContainer td a:active,.constantValuesContainer td a:visited,.constantValuesContainer td a:hover,.strong{font-weight:700}a:hover,a:focus,.topNav a:hover,.bottomNav a:hover{color:#bb7a2a;text-decoration:none}pre,h4,.indexHeader h1{font-size:1.3em}h5,code,tt,dt code{font-size:1.2em}.bar a,.bar a:link,.bar a:visited,.bar a:active,.topNav a:link,.topNav a:active,.topNav a:visited,.bottomNav a:link,.bottomNav a:active,.bottomNav a:visited{color:#FFF;text-decoration:none}div.details ul.blockList ul.blockList ul.blockList li.blockList h4,div.details ul.blockList ul.blockList ul.blockListLast li.blockList h4,ul.blockList ul.blockList ul.blockList li.blockList h3{background-color:#e8e8e8;border-bottom:1px solid #aaa;border-top:none;margin:0 0 6px -8px;padding:2px 5px}.indexContainer ul,ul.inheritance{margin:0;padding:0}table.overviewSummary td.colFirst,table.overviewSummary th.colFirst,table.overviewSummary td.colOne,table.overviewSummary th.colOne,table.packageSummary td.colFirst,table.overviewSummary th.colFirst{vertical-align:middle;width:25%}";

var tab_css = ".bar{background-color:#333!important}a{color:#060!important}#saved_item a{color:#606!important;font-weight:700}"

$(function() {

    if ($(".indexContainer").length != 1) {
        $("body").before('<style>' + core_css + '</style>')
        $(".topNav").css("background-image", "none")
        $(".bottomNav").css("background-image", "none")
        return 0;
    }

    var data = $(".indexContainer");
    var allClass = new Array();
    var showClass = new Array();
    var itemForPage = 50;
    var bindingmenu = new Array();
    var saved = new Array();

    createPage();
    initWS();
    scan();
    configSearch();

    function createPage() {
        //$(".bar").before('<LINK href="http://127.0.0.1/chromescript/framejavadoc.css" rel="stylesheet" type="text/css">')
        $(".bar").before('<style> ' + tab_css + ' </style> ')
        $(".bar").css({
            //"background-color" : "#333",
            "background-image" : "none"

        })

        $(".indexContainer").before("<div id=\"ifr_page\" style=\"overflow: hidden; border: 3px solid rgb(221, 221, 221); margin: 5px; padding: 5px; background-color: rgb(245, 245, 245);\"><b>Java API Search</b><br><input id=\"search_field\" style=\"border: 2px solid rgb(221, 221, 221); padding: 2px 5px; margin: 3px auto 3px 3px; display: block; \"><button id=\"sch_bth\">Search</button><button id=\"res_bth\">Reset</button><button id=\"save_bth\">Save Selected</button><table id=\"saved_item\"></table><hr style=\"border: 1px solid #ddd\"><div id=\"menu_custom\" style=\"-webkit-user-select: none;\"><b style=\"margin:0px 5px;\">Page:</b><strong id=\"page_sel\"></strong></div><hr style=\"border: 1px solid #ddd\"><div class=\"indexContainer\"><table><tr><td>Inizializzazione...</td></tr></table></div>")
    }

    function initWS() {
        $("li", data).each(function(index) {
            var name = $("a", $(this)).text().toLowerCase()
            var html = $(this).html();
            allClass.push(new Array(name, html))
        });
        data.remove();
        for (var cnt = 0; cnt < allClass.length; cnt++) {
            showClass[cnt] = allClass[cnt]
        };

    }

    function print(page_sel) {
        var page = Math.floor(showClass.length / (itemForPage))
        if (page_sel < 0) {
            page_sel = 0
        }
        if (page_sel > page) {
            page_sel = page;
        }
        var css_style = {
            "background-color" : "#fff",
            "color" : "#777",
            "padding" : "0px 1px",
            "border" : "2px solid #999",
            "margin" : "auto 1px",
            "cursor" : "pointer"
        };

        $('#page_sel').html("")
        var back = $("<a></a>").css(css_style).text("back");
        var next = $("<a></a>").css(css_style).text("next")
        if (page_sel != 0) {
            $('#page_sel').append(back)
            back.bind('click', function() {
                back.unbind('click')
                next.unbind('click')
                back = null
                next = null
                for (var cnt_0 = 0; cnt_0 < bindingmenu.length; cnt_0++) {
                    $(bindingmenu[cnt_0]).unbind('click')
                    bindingmenu[cnt_0] = null;
                };
                bindingmenu = null;
                bindingmenu = new Array();
                print(page_sel - 1);
            })
        }

        var start = page_sel > 4 ? page_sel - 2 : 0;
        var end = start + 5;
        if (start + 5 > page) {
            start = page - 4
            if (start < 0) {
                start = 0;
            }
            end = page + 1
        }
        for (var cnt = start; cnt < end; cnt++) {
            var hnd = $("<a></a>").css(css_style).text(cnt + 1)
            bindingmenu.push(hnd)
            $(hnd).data("page", cnt)
            $('#page_sel').append(hnd)
            if (cnt == page_sel) {
                hnd.css({
                    "color" : "#A50"
                })
            } else {
                hnd.click('click', function() {
                    back.unbind('click')
                    next.unbind('click')
                    var cnt = $(this).data("page")
                    for (var cnt_0 = 0; cnt_0 < bindingmenu.length; cnt_0++) {
                        $(bindingmenu[cnt_0]).unbind('click')
                        bindingmenu[cnt_0] = null;
                    };
                    bindingmenu = null;
                    bindingmenu = new Array();
                    print(cnt);
                })
            }
        };
        if (page_sel != page) {
            $('#page_sel').append(next)
            next.bind('click', function() {
                back.unbind('click')
                next.unbind('click')
                back = null
                next = null
                for (var cnt_0 = 0; cnt_0 < bindingmenu.length; cnt_0++) {
                    $(bindingmenu[cnt_0]).unbind('click')
                    bindingmenu[cnt_0] = null;
                };
                bindingmenu = null;
                bindingmenu = new Array();
                print(page_sel + 1);
            })
        }

        $('#page_sel').append()
        $(".indexContainer tr").remove()
        var new_html = "";
        for (var cnt = itemForPage * page_sel; cnt < (page_sel + 1) * itemForPage && cnt < showClass.length; cnt++) {
            var cked = "";
            if ($.inArray(showClass[cnt][1], saved) != -1) {
                cked = "checked"
            }
            var type = $(showClass[cnt][1]).attr("title") || ""
            if (type.indexOf('class') != -1) {
                type = "<b style=\" color: #090\"> class</b>";
            } else if (type.indexOf('enum') != -1) {
                type = "<b style=\" color: #990\"> enum</b>";
            } else if (type.indexOf('interface') != -1) {
                type = "<b style=\" color: #099\"> interface</b>";
            } else if (type.indexOf('annotation') != -1) {
                type = "<b style=\" color: #555\"> annotation</b>";
            } else {
                type = "<b style=\" color: #F00\">" + type + "</b>";
            }

            new_html += "<tr><td><input type=\"checkbox\"" + cked + " ></td><td>" + showClass[cnt][1] + "</td><td>" + type + "</td></tr>";

        };
        $(".indexContainer table").html(new_html);
        new_html = null;

    }

    function configSearch() {
        $("#search_field").keypress(function(key) {
            if (key.charCode == 13) {
                scan();
            }
        });

        $("#res_bth").click(function() {
            $("#search_field").attr("value", "")
            scan();
        })
        $("#sch_bth").click(scan);
        $("#save_bth").click(saveLink)
    }

    function scan() {

        var txt = $.trim($("#search_field").attr("value")).toLowerCase()
        showClass = new Array();
        for (var cnt = 0; cnt < allClass.length; cnt++) {
            if ((allClass[cnt][0]).indexOf(txt) != -1 || txt.length == 0) {
                showClass.push(allClass[cnt])
            }
        };
        print(0);
    }

    function saveLink() {
        var added = false;
        $(".indexContainer table tr").each(function(index) {
            if ($("input", $(this)).is(':checked')) {
                var html = $("td:nth-child(2)", $(this)).html();
                if ($.inArray(html, saved) == -1) {
                    saved.push(html)
                    added = true
                }
            }
        });
        if (added) {
            $("#saved_item tr").remove();
            for (var cnt = 0; cnt < saved.length; cnt++) {
                var btn_remove = $('<td></td>').append($("<button></button>").css({
                    "width" : "10px",
                    "height" : "10px",
                    "border" : "none",
                    "background-image" : "url(\"http://img819.imageshack.us/img819/2957/removey.png\")",
                    "background-repeat" : "no-repeat",
                    "background-position" : "center center",
                    "cursor" : "pointer"

                }).click(function() {
                    var ref = $("td:nth-child(2)", $(this).parent().parent())
                    for (var cnt = 0; cnt < saved.length; cnt++) {
                        if (saved[cnt] == ref.html()) {
                            var left = saved.slice(0, cnt);
                            var right = saved.slice(cnt + 1);
                            saved = left.concat(right);
                            break;
                        }
                    }
                    $(this).parent().parent().remove();

                }))
                var reference = $('<td></td>').html(saved[cnt])
                var tmp = $("<tr></tr>").append(btn_remove).append(reference)
                $("#saved_item").append(tmp)
            };
        }
    }
})

