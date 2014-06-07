// ==UserScript==
// @name           OGame Redesign: Spy Report Extender
// @namespace      userscripts.org
// @description    Add info in spy report
// @description    Use fragments of code from AntiGame, Firefox toolbar for the Ogame Galaxytool
// @version        0.11
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// @history        0.11 Get playername and planetname from tooltips
// @history        0.10 Fix for 3.x.x
// @history        0.8 Fix message about missile attack
// @history        0.7 Fix.
// @history        0.6 Fix.
// @history        0.5 Colored player's info and moved it outside of the link.
// @history        0.4 Antigame compatibility. Change format of player's info
// @history        0.3 release with update checker
// @history        0.2 Improved algorithm. Player's info in another report of cat=4 
// @history        0.0 First release
// ==/UserScript==

(function() 
{
    var CoordT = /\d+\:\d+\:\d+/i;
    var CoordT0 = /\d+\:\d+/i;
    var CoordT1 = /\[\d+\:\d+\:\d+\]/i;
    var Cat4 = /cat=4/i;
    
    var color_abbr_active="#fff";
    var color_abbr_vacation="aqua";
    var color_abbr_longinactive="#4F4F4F";
    var color_abbr_inactive="#6E6E6E";
    var color_abbr_banned="#fff";
    var color_abbr_strong="#f00";
    var color_abbr_noob="#lime";
    var color_abbr_outlaw="##FF33FF";
   
	var colorRank = '#DDDDDD';
	var colorRank10 = '#FFFF40';
	var colorRank50 = '#FFDF00';
	var colorRank100 = '#FFBF00';
	var colorRank200 = '#FF8F00';
	var colorRank800 = '#33FF33';
	var colorRank0 = '#305060';

    var colorAlly = "#fff";
    
	var ogameserver = window.location.host.split('.')[0];

	var Name2Num = [
		["uni101", "andromeda"],
		["uni102", "barym"],
		["uni103", "capella"],
		["uni104", "draco"],
		["uni105", "electra"],
		["uni106", "fornax"],
		["uni107", "gemini"],
		["uni108", "hydra"],
		["uni109", "io"],
		["uni110", "jupiter"],
		["uni111", "kassiopeia"],
		["uni112", "leo"],
		["uni113", "mizar"],
		["uni114", "nekkar"],
		["uni115", "orion"],
		["uni116", "pegasus"],
		["uni117", "quantum"],
		["uni118", "rigel"],
		["uni119", "sirius"],
		["uni120", "taurus"],
		["uni121", "ursa"],
		["uni122", "vega"],
		["uni123", "wasat"],
		["uni124", "xalynth"],
		["uni125", "yakini"],
		["uni126", "zagadra"]
	];

	for(var i = 0; i < Name2Num.length; i++) {
		ogameserver = ogameserver.replace(Name2Num[i][1], Name2Num[i][0]);
	}

	ogameserver += window.location.host.split('.')[2];

	var trimString = function(string) 
    {
	    // Return empty if nothing was passed in
	    if (!string) return "";
	
	    // Efficiently replace any leading or trailing whitespace
	    var value = string.replace(/^\s+/, '');
	    value = value.replace(/\s+$/, '');
	
	    // Replace any multiple whitespace characters with a single space
	    value = value.replace(/\s+/g, ' ');
	
	    // Return the altered string
	    return value;
	}

	// =======================================================================
	// functions for Galaxy view
	// =======================================================================
	var Galaxy =
	{
		GalaxyDOMNodeInserted: function(e)
		{
			if(!e || !e.target || !e.target.id) return;
			if( e.target.id == "galaxytable")  Galaxy.CatchGalaxy();
		},

		CatchGalaxy: function ()
		{
			try 
            {
				document.body.removeEventListener("DOMNodeInserted", Galaxy.GalaxyDOMNodeInserted, false);
                
                var galaxy = document.getElementsByName("galaxy")[0].value;
                var system = document.getElementsByName("system")[0].value;
                var lll = new Array();
			
				var rows = document.getElementById('galaxytable').rows;
                try 
                {
                    for(var i = 2; i < rows.length; i++) 
                    {
                        if (rows[i].getAttributeNode("class").value == "row") 
                        {
                            cells = rows[i].cells;
			
                            // reset data
                            position = 0;
                            moonsize = 0;
                            playerstatus = "";
                            playername = "";
                            planetname = "";
                            alliance = "";
                            player_rank = 0;
                            alliance_rank = 0;
                            alliance_member = 0;
				        		
                            // planet position
                            position = cells[1].innerHTML;
			
                            // planetname
							planetname = cells[2].innerHTML.match(/<span class="textNormal">.+<\/span><\/span><\/h4>/i);
							if(!planetname) continue;
							planetname = planetname.toString().substring(25,planetname.toString().indexOf("</span"));
        
                            // playername
                            try 
                            {
                                playername = cells[7].getElementsByTagName("h4")[0].getElementsByTagName("span")[1].innerHTML;
                            } 
                            catch(no_error) 
                            {
                                // no player or own player
                                try 
                                {
                                    playername = cells[7].getElementsByTagName("span")[0].innerHTML;
                                } 
                                catch(no_error2) 
                                {
                                    playername = "";	
                                }
                            }

                            // player status - transfer the english letters for them
                            var tmp = cells[7].getAttributeNode("class").value;
                            if (tmp.indexOf("vacation") > -1) 
                            {
                                playerstatus += "v";
                            }
                            if (tmp.indexOf("longinactive") > -1) 
                            {
                                playerstatus += "I";
                            }
                            else if (tmp.indexOf("inactive") > -1) 
                            {
                                playerstatus += "i";
                            }
                            if (tmp.indexOf("banned") > -1) 
                            {
                                playerstatus += "b";
                            }
                            if (tmp.indexOf("strong") > -1) 
                            {
                                playerstatus += "s";
                            }			
                            if (tmp.indexOf("noob") > -1) 
                            {
                                playerstatus += "n";
                            }			
                            if (tmp.indexOf("outlaw") > -1) 
                            {
                                playerstatus += "o";
                            }			
					
                            // ally tag
                            alliance = cells[9].innerHTML;
					
                            alliance = alliance.substring(alliance.indexOf(">")+1);
                            alliance = alliance.substring(0,alliance.indexOf("<"));
                            // player rank
                            if (playername != "") 
                            {
                                try 
                                {
                                    var tmp = cells[7].getElementsByTagName("li")[0].innerHTML;
									var rank_tmp = tmp.match(/\d+</);
									var rank_test = /-/;
									if(!rank_tmp) {
										if(rank_test.test(tmp)) 
										{
											tmp = "0";
										}
										tmp = tmp.replace(/[^0-9]/g,"");
										player_rank = parseInt(tmp);
									}
									else player_rank = parseInt(rank_tmp);
                                } catch(no_error) {
                                    // own player
                                    try 
                                    {
                                        player_rank = document.getElementById("bar").getElementsByTagName("li")[2].innerHTML.match(/\((\d+)\)/)[1];
                                    } 
                                    catch(arabic_ogame) 
                                    {
                                        //right to left ogame
                                        player_rank = document.getElementById("bar").getElementsByTagName("li")[3].innerHTML.match(/\((\d+)\)/)[1];
                                    }
                                }
                            }

                            // ally rank + member
                            if (alliance != "") 
                            {
                                var tmp = cells[9].getElementsByTagName("li")[0].innerHTML;
								var rank_tmp = tmp.match(/\d+</);
								if(!rank_tmp) {
									tmp = tmp.replace(/[^0-9]/g,"");
									alliance_rank = parseInt(tmp);
								}
								else alliance_rank = parseInt(rank_tmp);
                            
                                var tmp = cells[9].getElementsByTagName("li")[1].innerHTML;
                                tmp = tmp.replace(/[^0-9]/g,"");
                                alliance_member = parseInt(tmp);
                        
                            } 
                            else 
                            {
                            //Antigame 
                                if(cells[9].childNodes.length > 1)
                                {
                                     alliance = cells[9].childNodes[1].textContent;
                                     var tmp = cells[9].childNodes[3].text;
                                     alliance_member = parseInt(tmp.substring(tmp.indexOf("/")+1));
                                     alliance_rank = parseInt(tmp.substring(tmp.indexOf("#")+1));
                                }
                            }
                            // delete all \n within this string
                            if (position < 16) 
                            {
                                // do not collect position 16 here (if displayed)
                                playerstatus =  trimString(playerstatus.replace(/\n+/,""));
                                playername = trimString(playername.replace(/\n+/,""));
                                planetname = trimString(planetname.replace(/\n+/,""));
                                alliance = trimString(alliance.replace(/\n+/,""));
                                //Store collect info
                                if (playername != "") 
                                {
                                    var key =galaxy.toString()+":"+system.toString()+":"+position.toString();
                                    try 
                                    {
                                        lll.push([key, [moonsize,playerstatus,playername,planetname,alliance,player_rank,alliance_rank,alliance_member]]);
                                    }
                                    catch (e)
                                    {
                                        alert(e);
                                    }
                                }
                            }
                        }

                    } 
			
                } 
                catch(error) 
                {
                    alert("Unexpected error: "+error);
                }
                if(lll)
                {
                    var iii = JSON.stringify(lll);
                    localStorage.setItem(ogameserver+galaxy.toString()+":"+system.toString(),iii);
                }
				document.body.addEventListener("DOMNodeInserted", Galaxy.GalaxyDOMNodeInserted, false);	
			}
			catch(e) {}
		},

		Run: function()
		{
			document.body.addEventListener("DOMNodeInserted", Galaxy.GalaxyDOMNodeInserted, false);
		}
    }

	try {
		if (document.location.href.indexOf('page=galaxy') > -1) 
        {
			Galaxy.Run();
        }
		if (document.location.href.indexOf('page=showmessage') > -1) 
        {
            var divs = document.getElementsByTagName ("div");
            var planetOwner = '';
            for (var i = 0; i < divs.length; i++)
            {
                var div = divs [i];
                if (div.className == "infohead")
                {
                    var tab = document.getElementsByTagName ("tr");
                    planetOwner = trimString(tab[1].cells[1].innerHTML.replace(/\n+/,""));
                }
                if (div.className == "note")
                {
                    if(Cat4.exec(document.baseURI))
                    {
                        var planet = CoordT1.exec(div.innerHTML).toString();
                        //alert("1 "+planet);
                        var coords = CoordT.exec(planet).toString();
                        //alert("2 "+coords);
                        var coords0 = CoordT0.exec(planet).toString();
                        //alert("3 "+coords0);
                        var pinfo = " ( ";
                        var infos = localStorage.getItem(ogameserver+coords0);
                        infos = JSON.parse(infos);
                        for(var j = 0; j < infos.length; j++)
                        {   
                            if(infos[j][0] == coords)
                            {
                                info = infos[j][1];
                                if(info)
                                {
                                    if(planetOwner != info[2])
                                    {   
                                        var color=color_abbr_active;
                                        var txtdec = "";

                                        if(info[1].match("v"))
                                        {
                                            color=color_abbr_vacation;
                                        }
                                        else if (info[1].match("I"))
                                        {
                                            color=color_abbr_longinactive;
                                        }
                                        else if (info[1].match("i"))
                                        {
                                            color=color_abbr_inactive;
                                        }
                                        else if (info[1].match("b"))
                                        {
                                            color=color_abbr_banned;
                                            txtdec="line-through";
                                        }
                                        else if (info[1].match("s"))
                                        {
                                            color=color_abbr_strong;
                                        }
                                        else if (info[1].match("n"))
                                        {
                                            color=color_abbr_noob;
                                        }
                                        else if (info[1].match("o"))
                                        {
                                            color=color_abbr_outlaw;
                                        }

                                        var newNode = document.createElement('span');
                                        var newNode0 = document.createElement('span');
                                        newNode0.innerHTML = ' ( '+info[2];
                       					newNode0.style.color = color;
                                        if(txtdec) newNode0.style.textDecoration = txtdec;
                                        newNode.appendChild(newNode0);

                                        if(info[1]) newNode.innerHTML += ' (' + info[1] + ")";
                       					newNode.style.color = color;
                                        if(txtdec) newNode.style.textDecoration = txtdec;

                                        var newNode3 = document.createElement('span');
                                        newNode3.innerHTML = ' ) ';
                       					newNode3.style.color = color;

                                        var color=colorRank;
                                        var tmp = parseInt(info[5]);
                                        if (tmp==0) color=colorRank;
                                        else if (tmp<=10) color=colorRank10;
                                        else if (tmp<=50) color=colorRank50;
                                        else if (tmp<=100) color=colorRank100;
                                        else if (tmp<=200) color=colorRank200;
                                        else if (tmp<=800) color=colorRank800;
                                        
                                        var newNode1 = document.createElement('span');
                                        newNode1.innerHTML = ' #'+info[5]+' ';
                       					newNode1.style.color = color;

                                        if(info[4]) 
                                        {
                                            var newNode2 = document.createElement('span');
                                            newNode2.innerHTML = ' '+info[4]+" #" + info [6] + "/" + info [7];
                                            newNode2.style.color = colorAlly;
                                        }

                                        newNode.appendChild(newNode1);
                                        if(info[4]) newNode.appendChild(newNode2);
                                        newNode.appendChild(newNode3);
										var expr = new RegExp('\\('+info[2]+'\\)', 'ig');
										var isplayer = div.innerHTML.match(expr);

                                        if(!isplayer)
										{
											if(div.childElementCount == 3 || div.childElementCount == 2 || div.childElementCount == 7)
											{
												var Ctl = div.children[0];
											}
											else 
											{
												var Ctl = div.children[1];
											}
											var Sibling = Ctl.nextSibling;
											Ctl.parentNode.insertBefore(newNode,Sibling);
										}
										else
										{
											div.innerHTML = div.innerHTML.replace(expr, newNode.innerHTML);
										}
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }
	}
	catch (e) {}
    
}) ()
