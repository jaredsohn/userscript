// ==UserScript==
// @name           Futbol24 - Open stat pages in new tabs
// @namespace      http://userscripts.org/scripts/show/132324
// @include        http://futbol24.com/*
// @include        http://futbol24.com
// @include        http://www.futbol24.com/*
// @include        http://www.futbol24.com/Live/*
// ==/UserScript==

var script = document.createElement("script");
script.type = "text/javascript";
script.textContent = "(" + Futbol24.toString() + ")(jQuery)";
document.body.appendChild(script);

function Futbol24($) {
                    var links_set = false;

                    $(document).ajaxComplete(function(event, request, settings) {
                        if(request.status == 200) {
                            setLinks();
                        }
                    });

                    $('body').live("mouseover",function(){
                        if(links_set == false) {
                            setLinks();
			    links_set = true;
                        }
                    });

                    function setLinks() {
                        $('.status_1').each(function() {
                            var teamcmp = $(this).find("span.teamcmp");
                            var row_id = $(this).attr("id");
                            match_id = row_id.split("_");
                            match_id = match_id[2];                            
                            teamcmp.html("<div style='width: 65px; height: 20px;'><a style='width: 100%; height: 100%; display: block;' href='http://www.futbol24.com/ml/matchRedirect/?TypeId=4&TypeHash=faf6a&MId=" + match_id +
                                "&Ao=0'></a></div>");
                        });                        
                    }

                }