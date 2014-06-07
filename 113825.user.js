// ==UserScript==
// @name           estado jugadores
// @namespace      estados_jugadores
// @description    Deteccion de actividad de usuario
// @include        http://*.ogame*/game/index.php?page=galaxy*
// @include        http://*.ogame*/game/index.php?page=overview*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/*VERSION*/var Version = '2.0.6';/*VERSION*/

var url = document.location.href;
uni = url.toUpperCase().match(/:\/\/([a-z0-9]+)\./i);
uni = uni ? uni[1] : '0';
uni = uni.replace('UNI', '');
script_name = 'estados_jugador';
array_users = new Array();
    
(function(){
    try{
        
        if (navigator.userAgent.indexOf('Firefox')>-1)  {var FireFox = true;}
        else 											{var FireFox = false;}
        if (navigator.userAgent.indexOf('Opera')>-1) 	var Opera = true;
        else 											var Opera = false;

        if(!FireFox) 
        {
        	function GM_getValue(key,defaultVal) 
        	{
        		var retValue = localStorage.getItem(key);
        		if ( !retValue ) 
        		{
        			return defaultVal;
        		}
        		return retValue;
        	}
        
        	function GM_setValue(key,value) 
        	{
        		localStorage.setItem(key, value);            
        	}
        }
        
        function saveValue(key, value) {
            setTimeout(function(){GM_setValue(key, value)},0);
        }                       

    	if (typeof unsafeWindow === 'undefined') {
    		unsafeWindow = window;
    	}
        
    	function safeWrap(f) {
    		return function() {
    			setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
    		};
    	}
       
        if (document.location.href.indexOf("page=galaxy") != -1 && document.location.href.indexOf('notaddspan=1') == -1) {
            array_users = new Array();
    		unsafeWindow.$("#galaxyContent").ajaxSuccess(safeWrap(function(e,xhr,settings){
    			if (settings.url.indexOf("page=galaxyContent") == -1) return;  
                unsafeWindow.$("#galaxytable tr.row td.playername").each(function() {
                        var user_id = unsafeWindow.$(this).find('a:first').attr('rel');
                        if(typeof(user_id) != 'undefined') {
                            user_id = user_id.replace('player', '');
                            var spanObj = unsafeWindow.$(this).find('a:first span').first();
                            var name = unsafeWindow.$(spanObj).text().trim();
                            var selfName = unsafeWindow.$('span.textBeefy').text().trim();
                            if(name != '' && name != selfName) {
                                var key = uni+"_"+name+"_"+getToday()+"_estados";
                                setTimeout(function(){addPanelToGalaxy(name, unsafeWindow.$(spanObj), user_id)}, 0);
                            } 
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
        
        function updateObject(key, obj, where) {
            try{
                item_value = eval(unsafeWindow.$(where).attr('estados'));       
                var array_valores = new Array();
                for(var i = 0; i < item_value.length; i++) {
                    if(item_value[i].c == obj.c) {
                        item_value[i].m = (obj.m == '*'?14:parseInt(obj.m));
                    }
                    var valor = "{'c':'"+item_value[i].c+"','m':"+item_value[i].m+", 'id': "+item_value[i].id+"}";
                    array_valores.push(valor);            
                }
                var stringFinal = '['+array_valores.join(',')+']';
                unsafeWindow.$(where).attr('estados', stringFinal);
                refreshActivities(key, where);
            } catch(e) {  
                alert(e.message);
            }    
        }
        
        function refreshActivities(key, where) {
            try{
                item_value = eval(unsafeWindow.$(where).attr('estados'));
                var result = new Array();
                var last_activity = 60;
                
                for(var i = 0; i < item_value.length; i++) {
                   
                    if(item_value[i].m != 0) {
                       if(item_value[i].m < last_activity && item_value[i].m != -1) {
                            last_activity = item_value[i].m; 
                       }
                       result.push(item_value[i].c+" - "+(item_value[i].m == -1?'Off':(item_value[i].m > 14?item_value[i].m+' mins':'On')));
                    } else {
                       result.push(item_value[i].c+" - Checking.."); 
                    }
                }
                if(last_activity > 14 && last_activity < 60) {
                    var strAc = last_activity+' mins ago';
                    var color = 'yellow';
                }
                if(last_activity == 14) {
                    var strAc = ' ON - < 15 min';
                    var color = 'red';
                }
                if(last_activity == 60) {
                    var strAc = ' OFF - > 60 min';
                    var color = 'green';
                }        
                
                where.title = result.join(' | ')+' | Last Activity: '+strAc;
                where.style.color = color;        
            } catch(e) {  
                alert(e.message);
            }     
        }

        function checkValores(key, where, obj) {
            var g = obj.c.split(':')[0];
            var s = obj.c.split(':')[1];
            var p = obj.c.split(':')[2];
            var ajax_url = location.href.replace('galaxy', 'galaxyContent')+"&ajax=1&notaddspan=1";
            try {
            unsafeWindow.$.ajax({
              type: 'POST',
              url: ajax_url,
              data: {
                galaxy: g,
                system: s
              },
              success: function(responseDetails) {
                var planeta_id = obj.id;
                unsafeWindow.$(responseDetails).find('.microplanet').each(function() {
                    if(unsafeWindow.$(this).attr('data-planet-id').trim() == planeta_id) {
                        var estado = unsafeWindow.$(this).find('div.activity').html();
                        obj.m = -1;
                        if(typeof(estado) != 'undefined') {
                            if(estado.indexOf('<img') > - 1) {
                                obj.m = 14;
                            } else {
                                obj.m = unsafeWindow.$.trim(estado);
                            }
                        }

                        //if(obj.m == -1) {
                            if(unsafeWindow.$(this).parent().find('td.moon div.activity').length > 0) {
                                var estado = unsafeWindow.$(this).parent().find('td.moon div.activity').html();
                                if(typeof(estado) != 'undefined') {
                                    if(estado.indexOf('<img') > - 1) {
                                        obj.m = 14;
                                    } else {
                                        obj.m = unsafeWindow.$.trim(estado);
                                    }
                                }  
                            }
                        //}
                        updateObject(key, obj, where);
                        return;
                    }
                });

            },
              dataType: 'html'
            });
            
            } catch(e) {  
                alert(e.message);
            }        
        }

        function addActivityPlanetsInfo(key, where, stringFinal) {
            try{
 
                var item_value = eval(stringFinal);      
                var result = new Array();
                for(var i = 0; i < item_value.length; i++) {                        
                    result.push(item_value[i].c+" - Checking..");               
                    checkValores(key, where, item_value[i]);        
                }
                unsafeWindow.$(where).attr('estados', stringFinal);
                where.title = result.join(' | ');        
            } catch(e) {  
                alert(e.message);
            }  
        }
        
        
        function checkUserPlanets(user, where, user_id) {
            unsafeWindow.$.get(
                'http://'+document.domain+'/api/playerData.xml?id='+user_id,
                    function(responseDetails){
                        
                        try{
                            var arrayPlanetas = new Array();
                            unsafeWindow.$(responseDetails).find('planet').each(function() {
                                var c = unsafeWindow.$(this).attr('coords');
                                var idp = unsafeWindow.$(this).attr('id');
                                var strValues = "{'c':'"+c+"', 'm':0, 'id':"+idp+"}";
                                arrayPlanetas.push(strValues);
                            });
                            var stringFinal = '['+arrayPlanetas.join(',')+']';
                            var key = uni+"_"+user+"_"+getToday()+"_"+script_name;
                            GM_setValue(key, stringFinal);    
                            addActivityPlanetsInfo(key, where, stringFinal);
                        } catch(e) {
                            alert(e.message);
                            return;
                        }
                        
                    },
                    "xml"
            );
   
        }
        
        function addPanelToGalaxy(name, where, user_id) {
            try{
                if(unsafeWindow.$(where).parent().parent().find('.player_activity').length == 0) {
                    
                    var newspan = document.createElement('span');
                    newspan.setAttribute('class', 'player_activity');
                    newspan.style.color = 'grey';
                    newspan.style.cursor = 'pointer';
                    newspan.style.padding = '3px';
                    newspan.style.fontSize = '16px';            
                    newspan.innerHTML = '&#9679;';
                    newspan.title = "Click to load activity info...";         
                    unsafeWindow.$(where).parent().parent().append(newspan);
                    unsafeWindow.$(newspan).click(function() { 
                       checkUserPlanets(name, newspan, user_id);
                    });     
                }   
            } catch(e) {  
                alert(e.message);
            } 
        }       

        function inArray(user) {
            for(var i = 0; i < array_users.length; i++) {
                if(array_users[i].username == user) {
                    return array_users[i];
                }
            }
            return false;
        }
        
        
        checkVersion();                            
                
    } catch(e) {
        
    }
 
})();