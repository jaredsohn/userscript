// ==UserScript==
// @name       India Cup Fixtures Script
// @namespace  http://playerx.hitwicket.com/
// @version    1.0
// @description  To show the match fixtures along side group list
// @require		http://code.jquery.com/ui/1.10.4/jquery-ui.js
// @resource	jqUI_CSS	http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css
// @include      http://*hitwicket.com/indiaCup/*
// @grant    GM_addStyle
// @grant    GM_getResourceText
// @copyright  2012+, PlayerX
// ==/UserScript==

var jqUI_CssSrc = GM_getResourceText ("jqUI_CSS");
GM_addStyle (jqUI_CssSrc);


function interceptAjax () {        
    var loader = "<span class='loader' style='display: none;'><img src='/images/ajax-loader.gif'></span>";
    
    function refreshFixturesButtonForGroup(groupnum) {
        return "<button type='button' class='btn btn-default btn-md pull-top' id='group" + groupnum + "'>" +
                        "<span class='glyphicon glyphicon-refresh'> </span> Load Fixtures" +
                        "    </button><br/>" + loader;
    }
    
    var fragments = ["dummy","#fragment-1","#fragment-2","#fragment-3","#fragment-4"];
    function loadMatchData(groupurl,groupnum) {
     	$.ajax({
          url: groupurl,
          cache: false,
            beforeSend: function( xhr ) {
                $(".loader").show();
            }
        })
          .done(function( html ) {
              var refreshButton = refreshFixturesButtonForGroup(groupnum);
              var divid=fragments[groupnum];
              $( divid).html(refreshButton);
              var matchtimes = $(html).find("span.match_time");
              var matchlist = $(html).find("ul.match_list2");
              $.each(matchtimes,function( index, value ) {
                  $( divid).append(value);
                  $( divid).append($(matchlist).get(index));
              });
              $(".loader").hide();
          });   
    }
    
    $('body').ajaxSuccess (
        function (event, requestData)
        {
			
            if($("#tabs").size() != 0) {
                return;
            }
            var matchListingDiv = "<div id='tabs' style='width:400px;float:right;margin-top:-1700px;clear:right;'>\n" +
                "  <ul>\n" +
                "    <li><a href='#fragment-1'><span>Group 1</span></a></li>\n" +
                "    <li><a href='#fragment-2'><span>Group 2</span></a></li>\n" +
                "    <li><a href='#fragment-3'><span>Group 3</span></a></li>\n" +
                "    <li><a href='#fragment-4'><span>Group 4</span></a></li>\n" +
                "  </ul>\n" +
                "  <div id='fragment-1'>\n" +
               		refreshFixturesButtonForGroup("1") +
                "  </div>\n" +
                "  <div id='fragment-2'>\n" +
               		refreshFixturesButtonForGroup("2") +
                "  </div>\n" +
                "  <div id='fragment-3'>\n" +
               		refreshFixturesButtonForGroup("3") +
                "  </div>\n" +
                "  <div id='fragment-4'>\n" +
             		refreshFixturesButtonForGroup("4") +
                "  </div>\n" +
                "</div>";
            //$("div#cup_stage_data").append(matchListingDiv);
            $("section.col-md-11").append(matchListingDiv);
            
            $( "#tabs" ).tabs();
			//loadMatchData();
            $("button#group1").click(function(){loadMatchData("http://hitwicket.com/cupGroup/592",1);});
            $("button#group2").click(function(){loadMatchData("http://hitwicket.com/cupGroup/593",2);});
            $("button#group3").click(function(){loadMatchData("http://hitwicket.com/cupGroup/594",3);});
            $("button#group4").click(function(){loadMatchData("http://hitwicket.com/cupGroup/595",4);});
        }
    );
    
}		

function addJS_Node (text, s_URL, funcToRun) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ    = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

addJS_Node ("updateEligibilityInfo", null, interceptAjax);
//interceptAjax();
