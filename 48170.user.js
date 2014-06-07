// ==UserScript==
// @name DT Spy Logger
// @description Logs stats from DT
// ==/UserScript==
          
const db_savelink = "http://dtlog.nxserve.net/new/spylog/savelog.php";//"http://127.0.0.1/savelog.php";  //Save log source
                    const db_loadlink = "http://dtlog.nxserve.net/new/spylog/loadlog.php";
                    const verlink = "http://dtlog.nxserve.net/new/spylog/verify.php";
                    const version_num = "v0.9.3";
                    
                    var query_string = "?"+version_num+"&", load_query = "?"+version_num+"&", verifyName ="?"+version_num+"&";
                    var delim = ",";
                    var doc_title = document.title;
                    var spyAtk, spyLog, spyName, spyResult, verLink, verCode;
                    var targetInfo, targetLog;
                    var targetName, targetID=-1, targetLvl=-1, targetLink;
                    var fortDmg;
                    
                    var data_arr = new Array();
                    data_arr[0] = {'infoCat':'offense','value':-1,'recorded':0};
                    data_arr[1] = {'infoCat':'defense','value':-1,'recorded':0};
                    data_arr[2] = {'infoCat':'spy offense','value':-1,'recorded':0};
                    data_arr[3] = {'infoCat':'spy defense','value':-1,'recorded':0};
                    data_arr[4] = {'infoCat':'Citizens','value':-1,'recorded':0};
                    data_arr[5] = {'infoCat':'Workers','value':-1,'recorded':0};
                    data_arr[6] = {'infoCat':'Soldiers','value':-1,'recorded':0};
                    data_arr[7] = {'infoCat':'Guards','value':-1,'recorded':0};
                    data_arr[8] = {'infoCat':'Knights','value':-1,'recorded':0};
                    data_arr[9] = {'infoCat':'Archers','value':-1,'recorded':0};
                    data_arr[10] = {'infoCat':'Berserkers','value':-1,'recorded':0};
                    data_arr[11] = {'infoCat':'Royal Guards','value':-1,'recorded':0};
                    data_arr[12] = {'infoCat':'Warriors','value':-1,'recorded':0};
                    data_arr[13] = {'infoCat':'Elite Archers','value':-1,'recorded':0};
                    data_arr[14] = {'infoCat':'Spies','value':-1,'recorded':0};
                    data_arr[15] = {'infoCat':'Sentries','value':-1,'recorded':0};
                    data_arr[16] = {'infoCat':'Infiltrators','value':-1,'recorded':0};
                    data_arr[17] = {'infoCat':'Sentinels','value':-1,'recorded':0};
                    data_arr[18] = {'infoCat':'Assassins','value':-1,'recorded':0};
                    data_arr[19] = {'infoCat':'Inquisitors','value':-1,'recorded':0};
                    data_arr[20] = {'infoCat':'life','value':-1,'recorded':0};
                    
                    if (location.href.match("/spy_attack/"))
                    {
                    spyAtk = document.getElementById("attackinfo");
                    spyLog = spyAtk.innerHTML;
                    
                    targetInfo = document.getElementById("versus");
                    targetLog = targetInfo.innerHTML;
                    
                    targetID = getID(spyLog);
                    
                    targetName = getName(targetLog);
                    spyName = getSpy(targetLog);
                    
                    spyResult = getResult(spyLog);
                    if(targetID > 0 && spyResult)
                    {
                      document.title=doc_title+" Sending Spy Log Information to Database... ";
                    
                      if(targetName != "Null")
                      {
                        targetLvl = getLvl(targetLog, targetName);
                        
                        for(var i = 0; i<4; i++)
                        {
                          if (returnStat(spyLog, data_arr[i].infoCat) == -1)
                            data_arr[i].recorded = 0;
                          else
                          {
                            data_arr[i].value = returnStat(spyLog, data_arr[i].infoCat);
                            data_arr[i].recorded = 1;
                          }
                        }
                        
                        for(var i = 4; i<20; i++)
                        {
                          if (i != 7)
                          {
                          if (returnUnit(spyLog, data_arr[i].infoCat, 0) == -1)
                            data_arr[i].recorded = 0;
                          else
                          {
                            data_arr[i].value = returnUnit(spyLog, data_arr[i].infoCat, 0);
                            data_arr[i].recorded = 1;
                          }
                          }
                          else if (i == 7)
                          {
                                  if (returnUnit(spyLog, data_arr[i].infoCat, 1) == -1)
                            data_arr[i].recorded = 0;
                          else
                          {
                            data_arr[i].value = returnUnit(spyLog, data_arr[i].infoCat, 1);
                            data_arr[i].recorded = 1;
                          }
                          }
                        }    
                    
                        if (returnStat(spyLog, data_arr[i].infoCat) == -1)
                            data_arr[i].recorded = 0;
                          else
                          {
                            data_arr[i].value = returnStat(spyLog, data_arr[i].infoCat);
                            data_arr[i].recorded = 1;
                          }
                      }
                    
                      query_string += decHex(targetID) + "&" + targetName + "&" + decHex(targetLvl);
                    
                      for (var i=0;i<data_arr.length;i++)
                      {
                        if (data_arr[i].value >= 0)
                          query_string += "&" + data_arr[i].recorded + decHex(data_arr[i].value);
                        else
                          query_string += "&" + data_arr[i].recorded + i;
                      }
                      
                      query_string += "&" + spyName;
                      
                      sendData(query_string);
                      }
                    }
                    else if (location.href.match("/viewprofile/index/"))
                    {
                      var link, link_reg, reg_arr;
                      link = location.href;
                      link_reg = new RegExp('/viewprofile/index/([0-9]+)');
                     
                      reg_arr = link_reg.exec(link);
                      load_query += reg_arr[1]; 
                    
                      getData(load_query);
                    }
                    /*else if (location.href.match("/overview"))
                    {
                      verLink = document.getElementById("content_holder_div");
                      verCode = verLink.innerHTML;
                      verifyName += make_iframe(verCode);
                    
                      verify(verifyName);
                    }*/
                    
                    function getName(log)
                    {
                      var name, reg_arr;
                      var name_reg = new RegExp('</th>\n+.*<th>\n+.* (.*)\n+.*</th>');
                    
                      if(log.match(name_reg))
                      {
                        reg_arr = name_reg.exec(log);
                        name = reg_arr[1];
                      }
                      else
                        name = "Null";
                        
                      return name;
                    }
                    
                    function getSpy(log)
                    {
                      var name, reg_arr;
                      var name_reg = new RegExp("<tr>\n+.*<th>\n+.* (.*)\n+.*</th>");
                      
                      if(log.match(name_reg))
                      {
                        reg_arr = name_reg.exec(log);
                        name = reg_arr[1];
                      }
                      else
                        name = "Null";
                        
                      return name;
                    }
                    
                    function getResult(spyLog) //boolean return
                    {
                      var result_reg = new RegExp("text-align:center\">(.*) has defeated");
                      var result = false;
                      
                      if(spyLog.match(result_reg))
                        result = false;
                      else
                        result = true;
                        
                      return result;
                    }
                    
                    function getID(spyLog)
                    {
                      var ID, reg_arr;
                      var id_reg = new RegExp("<a href=\"\/spy\/index\/([0-9]+)\"><img alt=");
                    
                      if(spyLog.match(id_reg))
                      {
                        reg_arr = id_reg.exec(spyLog);
                        ID = reg_arr[1];
                      }
                      else
                        ID = 0;
                    
                      ID = parseInt(ID);
                    
                      return ID;
                    }
                    
                    function getLvl(log, targetName)
                    {
                      var lvl, reg_arr;
                      var lvl_reg = new RegExp("</td>\n+.*<td>\n+.*</td>\n+.*<td>\n+.*Level ([0-9]+)", "gm");
                    
                      if(log.match(lvl_reg))
                      {
                        reg_arr = lvl_reg.exec(log);
                        lvl = reg_arr[1];
                      }
                      else
                        lvl = 0;
                    
                      lvl = parseInt(lvl);
                    
                      return lvl;
                    }
                    
                    function returnStat(log, logType)
                    {
                      var stat;
                      var stat_reg = new RegExp('(([0-9]+'+delim+'*)+)(?:<\/span> '+logType+')');
                      
                      if(log.match(stat_reg))
                      {
                        var reg_arr = stat_reg.exec(log);
                        stat = reg_arr[1].replace(/,/g, "");
                      }
                      else
                        stat = -1;
                    
                      stat = parseInt(stat);
                    
                      return stat;
                    }
                    
                    function returnUnit(log, logType, guard)
                    {
                      var unit;
                      var unit_reg = new RegExp('(([0-9]+'+delim+'*)+)(?:<\/span>\n+.*'+logType+')');
                      var unitType;
                    
                      if(log.match(unit_reg))
                      {
                        var reg_arr = unit_reg.exec(log);
                        unit = reg_arr[1].replace(/,/g, "");
                        
                        if (guard != 0 && reg_arr[0].match("Royal"))
                          unit = -1;
                      }
                      else
                        unit = -1;
                        
                      unit = parseInt(unit);
                    
                      return unit;
                    }
                    
                    function decHex(dec)
                    {
                      return dec.toString(16);
                    }
                    
                    function addStyle(css)
                    {
                            var head, style;
                            head = document.getElementsByTagName('head')[0];
                            
                            if (!head) { return; }
                            style = document.createElement('style');
                            style.type = 'text/css';
                            style.innerHTML = css;
                            head.appendChild(style);
                    }
                    
                    function sendData(query_string)
                    {
                      addStyle(
                        '#dataBox {height: 1px; width: 1px; position: relative; left:165px; top:100px; margin:0px 0px 0px 0px; z-index:99; display:block;}');
                        
                        var dtMain = document.getElementById('sidebar-left');
                        var dtNewElement = document.createElement('div');
                        dtNewElement.setAttribute('id', 'dataBox');
                        dtMain.parentNode.insertBefore(dtNewElement, dtMain);
                        document.getElementById("dataBox").innerHTML = "<iframe src=\""+db_savelink+query_string
                            +"\" width=\"200\" height=\"950\" id=\"script\" name=\"script\" frameborder=\"0\"></iframe>";
                    
                       // document.getElementById("dataBox").innerHTML = "<font color='white'>"+query_string+"</font>";    
                        document.title=doc_title+" Information Sent to Database ";
                    }
                    
                    function getData(load_query)
                    {
                        addStyle(
                        '#dataBox {height: 1px; width: 1px; position: relative; left:165px; top:100px; margin:0px 0px 0px 0px; z-index:99; display:block;}');
                        
                        var dtMain = document.getElementById('sidebar-left');
                        var dtNewElement = document.createElement('div');
                        dtNewElement.setAttribute('id', 'dataBox');
                        dtMain.parentNode.insertBefore(dtNewElement, dtMain);
                        document.getElementById("dataBox").innerHTML = "<iframe src=\""+db_loadlink+load_query
                            +"\" width=\"200\" height=\"950\" id=\"script\" name=\"script\" frameborder=\"0\"></iframe>";
                            
                    //    document.getElementById("dataBox").innerHTML = "<font color='white'>"+load_query+"</font>";    
                    }
                    
                    function make_iframe(ifrm) //sets the innerHTML
                    {
                      var reg_arr, verified;
                      var verify_reg = new RegExp("-5px;\">\n +(.*) </span> is an");
                      
                      if(ifrm.match(verify_reg))
                      {
                        reg_arr = verify_reg.exec(ifrm);
                        verified = reg_arr[1];
                      }
                        
                      else
                        verified = false;
                    
                      return verified;
                    }
                    
                    function verify(vername)
                    {
                      addStyle(
                        '#dataBox {display:none;}');
                    
                      var dtMain = document.getElementById('sidebar-left');
                        var dtNewElement = document.createElement('div');
                        dtNewElement.setAttribute('id', 'dataBox');
                        dtMain.parentNode.insertBefore(dtNewElement, dtMain);
                        document.getElementById("dataBox").innerHTML = "<iframe src=\""+verlink+vername+"\" width=\"100\" height=\"100\" id=\"script\" name=\"script\" frameborder=\"0\"></iframe>";
                    }