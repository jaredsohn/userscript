// ==UserScript==
// @name        star textbox
// @namespace   http://www.userscripts.org
// @description Gives a textbox above the movie titles that only shows results with listed text
// @include     http://www.iafd.com/person.rme/perfid=*
// @version     1
// @grant       none
// ==/UserScript==              
			  
			  var gifilter = gifilter || {};
                gifilter.filter = "txtFilter";
                gifilter.clearfilter = "btnClearFilter";
                gifilter.table = "personal";
                gifilter.filterlink = "#";
                gifilter.links = [];

                gifilter.createDataList = function(id, list) {
                    str = "<datalist id='" + id + "list'>";
                    for (i in list) {
                        str += "<option value='" + list[i] + "'>";
                    }
                    str += "</datalist>";
                    return str;
                }

                gifilter.filterResults = function(str) {
                    if (str == "") {
                        var rows = $("#" + gifilter.table).find("tr").show();
                        $("#" + gifilter.filter).val("");
                        return;
                    }

                    if ($("#" + gifilter.filter).val() == "") {
                        $("#" + gifilter.filter).val(str);
                    }
                    var rows = $("#" + gifilter.table).find("tr").hide();
                    $("#" + gifilter.table).find("tr:first-child").show();

                    data = str.split("`");
                    var r = new RegExp(data, 'i');
                    $.each(data, function(i, v) {
                        rows.filter(function() {
                            return $(this).text().match(r)
                        }).show();
                    });
                }

                gifilter.sortAndUnique = function(links) {
                    links.sort();
                    for (var i = 1; i < links.length; i++) {
                        if (links[i] === links[ i - 1 ]) {
                            links.splice(i--, 1);
                        }
                    }
                    return links;
                }

                $(function() {
                    $("#" + gifilter.table).prepend("<p><input id='" + gifilter.filter + "' placeholder='filter' value='' list='" + gifilter.filter + "list' /><button id='" + gifilter.clearfilter + "'>Clear</button></p>");
                    $("#" + gifilter.clearfilter).bind('click', function() {
                        gifilter.filterResults("");
                    });

                    $("#" + gifilter.table + " a").each(function() {
                        var text = $(this).text();
                        gifilter.links.push(text);
                    });

                    $("#" + gifilter.table + " td").each(function() {
                        var text = $(this).text();
                        gifilter.links.push(text);
$(this).prepend("<a href='javascript:{}' onclick='gifilter.filterResults(\"" + text + "\")'>" + gifilter.filterlink + "</a> ");
                    });

                    gifilter.links = gifilter.sortAndUnique(gifilter.links);

                    $("#" + gifilter.filter).keyup(function() {
                        gifilter.filterResults(this.value);
                    });

                    $("body").append(gifilter.createDataList(gifilter.filter, gifilter.links));
                });