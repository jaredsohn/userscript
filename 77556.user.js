// ==UserScript==
// @name           AI DC
// @namespace      chazno
// @description    Compare other players with your own pinned player.
// @include        http://goallineblitz.com/game/team_offense_ai.pl?team_id=*
// @include        http://goallineblitz.com/game/team_defense_ai.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// @version        05.23.10
// ==/UserScript==
     


var depthChart = [];
        
        
        $(document).ready( function()
        {
            var url = window.location.href;
            var side = url.match(/game\/team_(.+?)_ai/)[1];
            var teamId = parseInt(url.match(/team_id=(\d+)/)[1]);
            
 //           GM_log(side);
            
            var but = document.createElement("input");
        	 
        	    //Assign different attributes to the element.
        	    but.setAttribute("type", 'Button');
        	    but.setAttribute("value", 'Refresh DepthChart');
        	   // but.setAttribute("class", 'AIDC');
        	 
        	    
                $('#quarter_0').before(but);
                $(but).click(function(){

             GM_deleteValue(teamId + side + "dc");
            loadDepth(side);
            $('.AIDC').remove();
            showTips();
            }
            );
            
           
        var depth = eval(GM_getValue(teamId+side+"dc"));
            
            if(depth==undefined){
                loadDepth(side);
            
            }
            else{
       
           showTips();
        
        
             }
 //           GM_log(depth);
 //           GM_log(depth.length);
        
        }
        );
        
        
        function showTips()
        {
             
                
            
                    
               //     if(depth != undefined){
               //         if(depth.length > 0){
                    
                            var selects = $("select[id*='_dc_']");
                            for (var e = 0; e < selects.length; e ++ ){
                    
                                $(selects[e]).parent().append("<img class=\"AIDC\" onmouseout=\"unset_tip()\" onmouseover=\"set_tip('"+ getPlayerIDs($(selects[e]).val()) + "', 0, 1, 1, 1)\" src=\" /images/question.gif\">" )
                            }
             //           }
             //       }
            
                    $("select[id*='_dc_']").find("option").mouseover(function()
                    {
                
                        unsafeWindow.set_tip(getPlayerIDs(this.value), 0, 1, 1, 1);
                        
                    }
                    ).mouseout(function()
                    {
                        unsafeWindow.unset_tip();
                    }
                    );
           
        
        }
        
        function getPlayerIDs(val)
        {
        
                var url = window.location.href;
            var side = url.match(/game\/team_(.+?)_ai/)[1];
            var teamId = parseInt(url.match(/team_id=(\d+)/)[1]);
            var depthChart = eval(GM_getValue(teamId+side+"dc"));
            
            if(depthChart!=undefined)
            for (var i = 0; i < depthChart.length; i ++ )
            {
        
                if(val.toLowerCase() == depthChart[i].Pos.toLowerCase())
                return depthChart[i].Ids;
            }
        
            return "Not Found";
        }
        
        
        function loadDepth(side)
        {
            // {{{2
            var depthChart = [];
            var url = window.location.href;
            var teamId = parseInt(url.match(/team_id=(\d+)/)[1]);

            GM_xmlhttpRequest(
            {
                method: 'GET',
                url: 'http://goallineblitz.com/game/depth_chart.pl?team_id=' + teamId,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml'
                }
                ,
                onload: function(depthPage) {
                    var res = depthPage.responseText;
                    var regex = /./;
                    if (side == "offense")
                        regex = /(positionIds)\['(fb.?|hb.?|qb.?|te.?)'\] = \['(.+?)'\]/g
                    else
                        regex = /(positionIds)\['(rolb.?|rilb.?|lolb.?|mlb.?|lilb.?|nt.?)'\] = \['(.+?)'\]/g
                    var s = res.split(regex);
                    //   var t = .split(/ \{id : '(.+?)'/g);
                    var t = s[0].split(/(id) \: '(.+?)'/g);
                    var u = s[0].split(/(name) \: "(.+?)"/g);

                    GM_log(t.length);
                    GM_log(u.length);
                    //      GM_log(s);
                    for (var i = 1; i < s.length; i += 4) {
                        if (s[i] != 'positionIds') {
                            //  alert(i);
                            break;
                        }
                        var depthChartPosition = {};
                        
                            var names = "";
                        //      GM_log(s[i + 2]);
                        var pIDs = (s[i + 2]).split(",");
                        //    GM_log(pIDs);
                        //    GM_log(pIDs.length);
                        for (var j = 0; j < pIDs.length; j++) {
                            for (var a = 1; a < t.length; a += 3) {
                                if (t[a] != 'id') {
                                    //  alert("a=" + a);
                                    break;
                                }
                                pIDs[j] = pIDs[j].replace(/[^a-zA-Z 0-9]+/g, '');
                                //                    GM_log("pid" + i + "=" + pIDs[j] + "-" + "t" + a + "=" + t[a + 1]);
                                if (pIDs[j] == t[a + 1]) {
                                    if (names == "") {
                                        names = u[a + 1];
                                        GM_log(a + "-" + t[a + 1] + "-" + u[a + 1])
                                    }
                                    else
                                        names = names + "," + u[a + 1];
                                //    GM_log(a + "-" + t[a + 1] + "-" + u[a + 1]);
                                    break;
                                }
                            }
                        }
                        depthChartPosition.Pos = s[i + 1];
                        depthChartPosition.Ids = names;


                        // if($.inArray(depthChartPosition.Pos , neededPos)>=0){
                        depthChart.push(depthChartPosition);

                        //       }
                    }
                    GM_setValue(teamId + side + 'dc', depthChart.toSource());
                    GM_log(depthChart.toSource());
                }

            }
            );
        
        }