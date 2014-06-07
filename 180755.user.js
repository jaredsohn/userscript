// ==UserScript==
// @name           Ranking de flotas en vista de galaxia
// @namespace      ranking_flotas_galaxia
// @description    Ranking de flotas en vista de galaxia
// @include        http://*.ogame*/game/index.php?page=galaxy*
// @include        http://*.ogame*/game/index.php?page=overview*
// @include        http://*.ogame*/game/index.php?page=statistics*
// @include        http://*.ogame*/game/index.php?page=highscore*
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

/*VERSION*/var Version = '3.0.1';/*VERSION*/

function getMetaContent(mn){var m = document.getElementsByTagName('meta'); for(var i in m){if(m[i].name == mn){return m[i].content;}} return "";}

var uni = (getMetaContent("ogame-universe")).split("-")[0];

array_users = new Array();
    
(function(){
    try{      
        if (navigator.userAgent.indexOf('Firefox')>-1)  {var FireFox = true;} else {var FireFox = false;}
        if (navigator.userAgent.indexOf('Opera')>-1) {var Opera = true;} else {var Opera = false;}
        if(!FireFox) {
        	function GM_getValue(key,defaultVal) 	{
        		var retValue = localStorage.getItem(key);
        		if ( !retValue ) {return defaultVal;}
        		return retValue;
        	}
        	function GM_setValue(key,value) {localStorage.setItem(key, value);}
        }
        function saveValue(key, value) {setTimeout(function(){GM_setValue(key, value)},0);}       
                        
      	if (typeof unsafeWindow === 'undefined') {unsafeWindow = window;}
      	
        function safeWrap(f) {
      		return function() {
      			setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
      		};
      	}
        
        var srv = 'es';
        /*var orgUrl = 'uni'+uni.toString()+'.ogame.org';
        if(url.indexOf('.ogame.fr') > - 1)
            srv = 'fr';
        else if(url.indexOf('.ogame.de') > -1)
            srv = 'de';
        else if(url.indexOf('.ogame.pl') > -1)
            srv = 'pl';        
        else if(url.indexOf('.ogame.us') > -1)
            srv = 'us';
        else if(url == orgUrl)
            srv = 'org';
        else if(url.indexOf('es.ogame.gameforge.com') > -1)
            srv = 'es';  */                       
        
        LangLabes = new Object();
        
        if(srv == 'fr') {
            LangLabes.inthelast = 'Points dans le dernier';
            LangLabes.days = 'jours';
            LangLabes.fleetpoints = 'Points flotte';
            LangLabes.won = 'Gagné';
            LangLabes.lost = 'Perdu';
            LangLabes.rank = 'Classement';
        } else if (srv == 'de') {
            LangLabes.inthelast = 'Punkte in den letzten';
            LangLabes.days = 'tags';
            LangLabes.fleetpoints = 'Flotte Punkte';
            LangLabes.won = 'Gewonnen';
            LangLabes.lost = 'Verloren';
            LangLabes.rank = 'Rang';
        } else if (srv == 'pl') {
            LangLabes.inthelast = 'Punktów w ostatnich';
            LangLabes.days = 'dnis';
            LangLabes.fleetpoints = 'Punkty floty';
            LangLabes.won = 'Wygral';
            LangLabes.lost = 'Zgubione';
            LangLabes.rank = 'Ranking';
        } else if (srv == 'org' || srv == 'us') {
            LangLabes.inthelast = 'points in the last';
            LangLabes.days = 'days';
            LangLabes.fleetpoints = 'Fleet Points';
            LangLabes.won = 'Won';
            LangLabes.lost = 'Lost';
            LangLabes.rank = 'Rank';
        } else if (srv == 'es') {
            LangLabes.inthelast = 'puntos en los últimos';
            LangLabes.days = 'días';
            LangLabes.fleetpoints = 'Puntos Flota';
            LangLabes.won = 'Ganó';
            LangLabes.lost = 'Perdió';
            LangLabes.rank = 'Rank';
        }        
        
        /* if (document.location.href.indexOf("page=statistics") != -1) {
        		unsafeWindow.$("#statisticsContent").ajaxSuccess(safeWrap(function(e,xhr,settings){
        			if (settings.url.indexOf("page=statisticsContent") == -1) return;
                    if (settings.data.indexOf("type=fleet") == -1) return;
                    unsafeWindow.$("table#ranks tr").each(function() {
                        if(unsafeWindow.$(this).find('td.score').html() != null && unsafeWindow.$(this).find('td.score').html().trim() != '') {
                            var score = unsafeWindow.$(this).find('td.score').html().trim();
                            var user = unsafeWindow.$(this).find('td.name a[target!="_ally"]').html().trim();
                            var position = unsafeWindow.$(this).find('td.position').html().trim();
                            key = uni+"_"+user+"_"+getToday();
                            var valor = '{username:"'+user+'", points:"'+score+'", rank:"'+position+'"}';
                            saveValue(key, valor);                     
                        }                                                               
                    });    
        		}));
        } */
        
        if (document.location.href.indexOf("page=highscore") != -1) {      

                unsafeWindow.$(document).ajaxSuccess(safeWrap(function(e,xhr,settings){

                    if(unsafeWindow.$('a#player').attr('class').indexOf('active') > -1) {
                        var count_ranks = unsafeWindow.$("table#ranks tr").length-1;
                        var scanned = -1;
                        if(unsafeWindow.$('#scaned').length == 0) {
                            unsafeWindow.$('#highscoreContent div.header').append('<div style="float:right;margin-right:15px;padding:3px;background:silver;color:black;">'+LangLabes.fleetpoints+' <span id="scaned">0</span> / <span id="scaned_count">'+count_ranks+'</span></div>');    
                        } else {
                            scanned = -1;    
                            unsafeWindow.$("#scaned").text(scanned);
                            unsafeWindow.$("#scaned_count").text(count_ranks);
                        }

                        unsafeWindow.$("table#ranks tr").each(function() {
                            if(unsafeWindow.$(this).find('td.score').html() != null && unsafeWindow.$(this).find('td.score').html().trim() != '') {
                                var score = unsafeWindow.$(this).find('td.score').html().trim();
                                var naves = unsafeWindow.$(this).find('td.score').attr('title');
                                
                                if(naves){
                                  unsafeWindow.$(this).find('td.score').html( unsafeWindow.$(this).find('td.score').html() + '<br />' + naves );
                                  
                                  var user = unsafeWindow.$(this).find('td.name span.playername').text().trim();
                                  var position = unsafeWindow.$(this).find('td.position').html().trim();
                                  key = uni+"_"+user+"_"+getToday()+"_gm1";
                                  var valor = '{username:"'+user+'", points:"'+score+'", rank:"'+position+'", naves:"'+naves+'"}';
  
                                  saveValue(key, valor);          
                                  scanned++;
                                  unsafeWindow.$("#scaned").text(scanned);
                                }          
                            }                                                               
                        });
                        
                    }
                }));
        }
        
        if (document.location.href.indexOf("page=galaxy") != -1) {
        		unsafeWindow.$(document).ajaxSuccess(safeWrap(function(e,xhr,settings){
        			if (settings.url.indexOf("page=galaxyContent") == -1) return;  
                    unsafeWindow.$("#galaxytable tr.row td.playername").each(function() {
                            var spanObj = unsafeWindow.$(this).find('a:first span').first();
                            var name = unsafeWindow.$(spanObj).text().trim();
                            var selfName = unsafeWindow.$('span.textBeefy').text().trim();
                            if(name != '' && name != selfName) {
                                var key = uni+"_"+name+"_"+getToday()+"_gm1";
                                setTimeout(function(){addToGalaxy(key, unsafeWindow.$(spanObj), name)}, 0);
                            }                                    
                        });
                  
        		}));
        }        

        function getToday() {
            var dateObj = new Date();
            var month = dateObj.getUTCMonth();
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            return year+"_"+month+"_"+day;
        }

        function inArray(user) {
            for(var i = 0; i < array_users.length; i++) {
                if(array_users[i].username == user) {
                    return array_users[i];
                }
            }
            return false;
        }
        
        function getOlderPoints(user, ac_points) {
            var dateObj = new Date();
            var oneDay = 86400*1000;
            for(i = 1; i < 10; i++) {
                m1day = dateObj.getTime() - oneDay*i;
                var ndate = new Date(m1day);
                
                var month = ndate.getUTCMonth();
                var day = ndate.getUTCDate();
                var year = ndate.getUTCFullYear();
                var today = year+"_"+month+"_"+day;
                
                var item_value = GM_getValue(uni+"_"+user+"_"+today);
                if(typeof(item_value) != 'undefined') {            
                    obj = eval('('+item_value+')');
                    if(obj.points != ac_points) {
                        return new Array(obj.points, i);
                        break;                
                    }
                }              
            }
            return null;
        }
        
        function putUserPoints(user, where, search) {
            
            if(typeof(search) == 'undefined') {
                url = 'http://www.war-riders.de/'+srv+'/'+uni+'/details/player/'+user;
            } else {
                url = 'http://www.war-riders.de/'+srv+'/'+uni+'/search/player/'+user;
            }
            GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
            },
            onload: function(responseDetails) {
        
                if(responseDetails.responseText.indexOf('short downtime') > -1 && typeof(search) == 'undefined') {
                    putUserPoints(user, where, true);
                    return
                }
                if(responseDetails.responseText.split('table class=border').length < 3){
                    return;
                }
                
                try{
                    var points = responseDetails.responseText.split('<table')[2].split('<tr>')[7].split('<td class=s>')[4].replace('</td></tr>', '');
                    var rank = responseDetails.responseText.split('<table')[2].split('<tr>')[7].split('<td class=s>')[1].replace('</td>', '');  
                    var aux = new Object();
                    aux.username = user;
                    aux.points = points;
                    aux.rank = rank;
                    addToGalaxy(aux, where, user, true);
                    var mdate = new Date();
                    GM_setValue(uni+"_"+user+"_"+getToday(), '{username:"'+aux.username.trim()+'", points:"'+aux.points.trim()+'", rank:"'+aux.rank.trim()+'"}');        
                    array_users.push(aux);
                } catch(e) {

                    return;
                }

            }
            });    
        }
        
        function searchForOlderPoints(user, where) {
            for(var i = 1; i < 7; i++) {
                var nd = new Date();
                var tmp = nd.getTime();
                var prev_day = tmp - 86400*i*1000;
                var dateObj = new Date(prev_day);
                var month = dateObj.getUTCMonth();
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();
                var tmp_key_day = year+"_"+month+"_"+day;
                var tmp_key = uni+"_"+user+"_"+tmp_key_day+"_gm1";
                var item_value = GM_getValue(tmp_key);
                if(typeof(item_value) != 'undefined') {
                    addToGalaxy(tmp_key, where, user, i);
                    break;
                }
            }
        }        
        
        function addToGalaxy(key, where, user, days_ago) {
            try{
                if(unsafeWindow.$(where).parent().parent().find('.rank_flota2').length > 0) return;
                if(typeof(key) != 'object') {
                    var item_value = GM_getValue(key);
                    if(typeof(item_value) != 'undefined') {
                        obj = eval('('+item_value+')'); 
                    } else {
                        obj = inArray(name);
                        if( obj == false) {
                            searchForOlderPoints(user, where);
                            //setTimeout(function(){putUserPoints(user, where);},0);                            
                            return;
                        }
                    }                        
                } else {
                    obj = key;
                }                                       
                var newspan = document.createElement('span');
                newspan.setAttribute('class', 'rank_flota2');
                newspan.style.color = '#f48635';
                newspan.style.fontSize = '9px';
                var color = 'white';
                if(parseInt(obj.rank.replace('.', '')) < 801 && parseInt(obj.rank) > 0) {
                    color = '#878A8C';
                }
                if(parseInt(obj.rank.replace('.', '')) < 401 && parseInt(obj.rank) > 0) {
                    color = 'yellow';
                }                     
                if(parseInt(obj.rank.replace('.', '')) < 201 && parseInt(obj.rank) > 0) {
                    color = '#F2134B';
                }
                if(parseInt(obj.rank.replace('.', '')) < 101 && parseInt(obj.rank) > 0) {
                    color = '#FF0000';
                }
                
                //var olderPoints = getOlderPoints(user, obj.points);
                var charop = '';
                var texto_dif = '';  
                var titulo = obj.naves+(typeof(days_ago)!='undefined'?' ('+days_ago+' days ago)':'');
                //newspan.innerHTML = '<br />'+LangLabes.fleetpoints+': <span title="'+titulo+'" style="color:'+color+';font-size:11px;cursor:pointer">'+charop+obj.points+'</span>';            
                
                newspan.innerHTML = '<br />'+titulo;
                unsafeWindow.$(where).parent().parent().append(newspan);

            } catch(e) {                
            } 
        }
        
        function checkVersion() {
            GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://userscripts.org/scripts/source/180755.user.js',
            headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
            },
            onload: function(responseDetails) {
                var vrs = responseDetails.responseText.split('/*VERSION*/');
                eval(vrs[1].replace('var Version', 'var Version2'));
                if(Version2 > Version) {
                    var box_top = '<div class="content-box-s" style="display: block; position: fixed; top: 10px; right: 10px; z-index: 999;" id="new_version_fleet_points"><div class="header"><a class="close_details" style="float: right; margin: 5px;" onclick="document.getElementById(\'new_version_fleet_points\').style.display = \'none\';" href="#"></a><h3 style="font-weight: bold;">New version available</h3></div><div class="content" style="max-height: 200px; max-width: 190px; overflow: auto;">';
                    var box_bottom = '</div><div class="footer"></div></div>';
                    var link = box_top +'<a style="color:red;right:10px;font-size:12px;text-decoration:underline;font-weight:bold" onclick="this.innerHTML=\'\';" href="http://userscripts.org/scripts/source/100800.user.js">Fleet Points: '+Version2+'. Install!</a><br />'+box_bottom;
                    document.body.innerHTML = document.body.innerHTML +link; 
                    
                }
            }
            });    
        }        
        
        checkVersion();                            
                
    } catch(e) {
        
    }
 
})();