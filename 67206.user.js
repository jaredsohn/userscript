// ==UserScript==
// @name        Ikariam City Encyclopedia
// @namespace   sycdan
// @description Collects data about all cities on the islands that you visit, and displays the data in a filterable table.
// @include     http://s*.ikariam.*/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require     http://userscripts.org/scripts/source/57756.user.js
// @version     0.01
// ==/UserScript==

//ScriptUpdater.check(0,'0.01');

GM_addStyle(''
    +'#sycdan_log{position:absolute;display:block;border:1px solid #CB9B6A;background:#FDF7DD;z-index:100;padding:2px;text-align:left;left:0;top:0;}'
    +'#sycdan_log div{vertical-align:top;}'
    +'#sycdan_log span{display:inline;}'
    +'#sycdan_log .success{color:#00aa00;font-weight:bold;}'
    +'#sycdan_log .failure{color:#ff0000;font-weight:bold;}'
);

String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,'');}

function isObject(test){
    return test&&typeof test=='object';
}

function isDate(test){
    return isObject(test)&&typeof test.getTime=='function';
}

function merge(){
    var argCount=arguments.length-1;
    if(argCount<0){
        return;
    }
    var host=arguments[0];
    //new Log('Host: '+uneval(host));
    if(!isObject(host)){
        return false;
    }
    for(var i=1;i<=argCount;i++){
        var add=arguments[i];
        //new Log('Add'+i+': '+uneval(add));
        if(isObject(add)){
            for(var x in add){
                var prop=add[x];
                if(isObject(prop)&&isObject(host[x])){
                    if(isDate(prop)){
                        host[x]=prop;
                    }else{
                        merge(host[x],prop);
                    }
                }else{
                    host[x]=prop;
                }
            }
        }
    }
    //new Log('Final: '+uneval(host));
    return host;
}

function Log(action,params){
    this.step=0;
    this.steps=0;
    
    if(typeof action=='undefined')
        action='';
    else if(typeof action=='object')
        action=uneval(action);
    
    if(typeof params=='boolean'){
        var success=params;
    }else if(typeof parseInt(params)=='number'){
        this.steps=parseInt(params);
    }

    Log.container=$('#sycdan_log');
    if(Log.container.length==0){
        Log.container=document.createElement('div');
        Log.container.id='sycdan_log';
        $('body').append(Log.container);
    }else{
        Log.container=Log.container[0];
    }
    
    this.row=document.createElement('div');
    Log.container.appendChild(this.row);
    this.action=document.createElement('span');
    this.row.appendChild(this.action);
    this.status=document.createElement('span');
    this.row.appendChild(this.status);
    
    this.action.innerHTML=action+(this.steps&&action!=''?'...&nbsp;':'');
    this.draw(success);
}
Log.prototype.clear=function(seconds){
    var log=this;
    if(!seconds)
        seconds=0;
    if(seconds>0)
        window.setTimeout(function(){log.clear()},seconds*1000);
    else
        $(this.row).remove();
        
    if($('*',Log.container).length==0){
        $(Log.container).remove();
    }
}
Log.prototype.draw=function(success){
    if(this.steps){
        if(this.finished()){
            this.row.className='success';
            this.status.innerHTML='done!';
            this.clear(5);
        }else{
            this.status.innerHTML=this.step+'/'+this.steps+' ('+Math.ceil((this.step/this.steps)*100)+'%)';
        }
    }
    if(typeof success!='undefined'){
        this.row.className=success?'success':'failure';
    }
    $(Log.container).css('top',document.documentElement.scrollTop);
    $(Log.container).css('left',document.documentElement.scrollLeft);
    return this;
}
Log.prototype.next=function(step){
    if(this.steps){
        if(!step)
            step=1;
        this.step+=step;
        this.draw();
    }
    return this;
}
Log.prototype.finished=function(){
    return this.step>=this.steps;
}
Log.prototype.append=function(html,status,timeout){
    $(this.action).append(html);
    if(typeof(status)!='undefined')
        this.row.className=status?'success':'failure';
    if(timeout)
        this.clear(timeout);
    return this;
}
Log.prototype.action=function(html,status){
    if(typeof(status)!='undefined')
        this.action.className=status?'success':'failure';
    if(typeof(html)!='undefined'){
        this.action.innerHTML=html;
        return this;
    }
    return this.action.innerHTML;
}

var ICE=new function(){
    var me=this;
    var my={};
    my.debugMode=false;
    my.init=function(){
        try{
            
            if(!my.getServerTime()){
                return;
            }
        
            my.load();
            
            //Set up city list fields
            my.fields={
                keys:[
                    'cityName',
                    'travelTime',
                    'playerName',
                    'playerStatus',
                    'allianceTag',
                    'totalPoints',
                    'militaryPoints',                    
                    'playerStatusChanged'
                ]
            };
            my.fields.cityName={
                caption:'City',
                sort:function(data,desc){
                    data.sort(function(a,b){
                        return desc?a.city.name.toLowerCase()<b.city.name.toLowerCase():a.city.name.toLowerCase()>b.city.name.toLowerCase();
                    });
                },
                draw:function(data){
                    var city=data.city;
                    return '<span class="tooltipAnchor"><a href="/index.php?view=island&cityId='+city.id+'">'+city.name+'</a><div class="tooltip"/></span>';
                },
            };
            my.fields.playerName={
                caption:'Player',
                sort:function(data,desc){
                    data.sort(function(a,b){
                        return desc?a.player.name.toLowerCase()<b.player.name.toLowerCase():a.player.name.toLowerCase()>b.player.name.toLowerCase();
                    });
                },
                draw:function(data){
                    var player=data.player;
                    return '<span class="'+player.status+'" title="'+player.status+'">'+player.name+'</span>';
                },
            };
            my.fields.playerStatus={
                caption:'Status',
                sort:function(data,desc){
                    data.sort(function(a,b){
                        return desc?a.player.status.toLowerCase()<b.player.status.toLowerCase():a.player.status.toLowerCase()>b.player.status.toLowerCase();
                    });
                },
                draw:function(data){
                    var player=data.player;
                    return player.status;
                },
            };
            my.fields.playerStatusChanged={
                caption:'Status Changed',
                sort:function(data,desc){
                    data.sort(function(a,b){
                        var valA=isDate(a.player.statusChanged)?a.player.statusChanged.getTime():false;
                        var valB=isDate(b.player.statusChanged)?b.player.statusChanged.getTime():false;
                        if(valA===false){
                            return true;
                        }else if(valB===false){
                            return false;
                        }else{
                            return desc?valA>valB:valA<valB;
                        }
                    });
                },
                draw:function(data){
                    var statusChanged='Never';
                    var player=data.player;
                    if(isDate(player.statusChanged)){
                        var elapsed=my.serverTime.getTime()-player.statusChanged.getTime();
                        statusChanged='<span title="changed from '+player.lastStatus+'">';
                        if(elapsed>1000)
                            statusChanged+=unsafeWindow.getTimestring(elapsed)+' ago';
                        else
                            statusChanged+='0s ago';
                        statusChanged+='</span>';
                    }
                    return statusChanged;
                },
            };
            my.fields.militaryPoints={
                caption:'Military Points',
                sort:function(data,desc){
                    data.sort(function(a,b){
                        var valA=isObject(a.player.scores.military)?a.player.scores.military.points:false;
                        var valB=isObject(b.player.scores.military)?b.player.scores.military.points:false;
                        if(valA===false||valA=='?'){
                            return false;
                        }else if(valB===false||valB=='?'){
                            return true;
                        }else{
                            return desc?valA<valB:valA>valB;
                        }
                    });
                },
                draw:function(data){
                    var player=data.player;
                    return player.scores&&player.scores.military?my.addCommas(player.scores.military.points):'?';
                },
            };
            my.fields.totalPoints={
                caption:'Total Points',
                sort:function(data,desc){
                    data.sort(function(a,b){
                        var valA=a.player.scores.total.points;
                        var valB=b.player.scores.total.points;
                        return desc?valA<valB:valA>valB;
                    });
                },
                draw:function(data){
                    var player=data.player;
                    return (player.scores&&player.scores.total?my.addCommas(player.scores.total.points):'?');
                },
            };
            my.fields.allianceTag={
                caption:'Ally',
                sort:function(data,desc){
                    data.sort(function(a,b){
                        if(!desc){
                            if(a.alliance&&b.alliance)
                                return a.alliance.name.toLowerCase()>b.alliance.name.toLowerCase();
                            else if(a.alliance)
                                return true;
                            else
                                return false;
                        }else{
                            if(a.alliance&&b.alliance)
                                return a.alliance.name.toLowerCase()<b.alliance.name.toLowerCase();
                            else if(a.alliance)
                                return false;
                            else
                                return true;
                        }
                    });
                },
                draw:function(data){
                    return data.alliance.name?data.alliance.name:'';
                },
            };
            my.fields.travelTime={
                caption:'Travel Time',
                sort:function(data,desc){
                    data.sort(function(a,b){
                        var originCity=my.originCity();
                        var island=data.island;
                        var timeA=my.getTravelTime(originCity.x,originCity.y,a.island.x,a.island.y);
                        var timeB=my.getTravelTime(originCity.x,originCity.y,b.island.x,b.island.y);
                        return desc?timeA<timeB:timeA>timeB;
                    });
                },
                draw:function(data){
                    var originCity=my.originCity();
                    var island=data.island;
                    return (originCity?unsafeWindow.getTimestring(my.getTravelTime(originCity.x,originCity.y,island.x,island.y)):'?');
                },
            };
            
            /*
            var c=my.cities['459302'];
            var p=my.getPlayer(c.playerId);
            new Log(c);
            new Log(p);
            p.status='active';
            */
            
            GM_addStyle(''
                +'#ICE{width:990px;margin:0 auto 15px auto;}'
                //+'#ICE h2{text-align:center;font-weight:bold;font-size:big;}'
                +'#ICE>table{border: 3px double #CB9B6A; background: #FDF7DD; text-align:left;margin-bottom:15px;width:100%;}'
                +'#ICE>table thead{background: #E7C680 url(skin/input/button.gif) repeat-x scroll 0 0;}'
                +'#ICE>table tfoot{text-align:center;}'
                +'#ICE>table th{font-weight:bold;padding:3px 1px 0px 3px;text-align:left;}'
                +'#ICE>table td{border-top:1px solid #eccf8e;padding:0 0 0 2px;}'
                +'#ICE>table .alt{background:#FDF1D4;}'
                +'#ICE input{margin:2px 2px 0 0;}'
                +'#ICE .active{color:#900;}'
                +'#ICE .inactive{color:#999;}'
                +'#ICE .vacation{color:#090;}'
                +'#ICE_cityList .sortable{cursor:pointer;}'
                +'#ICE_cityList .pageSelect{cursor:pointer;}'
                +'#ICE_cityList .pageSelect.current{font-weight:bold;}'
                +'#ICE .tooltipAnchor:hover>.tooltip{display:inline;}'
                +'#ICE .tooltip{display:none;position:absolute;background-color:#F1D7AD;border:1px solid #BE8D53;border-top-width:4px;padding:4px 8px;}'
                +'#ICE fieldset{border:1px solid;padding:2px;background:#FDF7DD;margin:2px 0 4px 0;}'
                +'#ICE legend{border:1px solid;background:#FDF7DD;padding:2px;}'
                +'.center{text-align:center;}'
                +'.left{text-align:left;}'
            );
            
            var view=my.getView();
            if(view){
                if(typeof my['view_'+view]=='function')
                    my['view_'+view]();
            }
            my.draw();
            
            my.rescanIslands();
        }catch(e){
            my.logError(e,'init');
        }
    }
    my.load=function(){
        my.alliances=my.getVal('my.alliances',{keys:[]});
        my.cities=my.getVal('my.cities',{keys:[]});
        my.filter=my.getVal('my.filter',{active:true,inactive:true,vacation:true,results:10,page:1,fields:['cityName','travelTime','playerName','allianceTag','totalPoints','militaryPoints','playerStatusChanged']});
        my.islands=my.getVal('my.islands',{keys:[],coordKeys:{}});
        my.options=my.getVal('my.options',{});
        my.players=my.getVal('my.players',{keys:[]});
        my.self=my.getVal('my.self',{id:0});
        
        //Collect your city data
        my.self.cities={keys:[]};
        $('#citySelect option').each(function(){
            var $this=$(this);
            var city={};
            
            city.id=$this.attr('value');
            
            if($this.hasClass('deployedCities')){
                city.type='deployed';
            }else if($this.hasClass('occupiedCities')){
                city.type='occupied';
            }else{
                city.type=false;
            }
            
            var coords=$this.text().match(/^\s*\[(\d+):(\d+)\]\s+(.*)/);
            if(coords){
                city.x=coords[1];
                city.y=coords[2];
                city.name=coords[3];
            }else{
                city.name=$this.text();
            }
           
            my.self.cities.keys.push(city.id);
            my.self.cities[city.id]=city;
        });
        my.originCity();
    }
    my.originCity=function(p){
        if(isObject(p)){
            my._originCity=p;
        }else if(p){
            my.options.originCityId=p;
            my._originCity=my.self.cities[p];
        }else if(my.options.originCityId){
            my._originCity=my.self.cities[my.options.originCityId];
        }else{
            my._originCity=my.self.cities[my.self.cities.keys[0]];
        }
        
        if(my._originCity){
            my.options.originCityId=my._originCity.id;
            return my._originCity;
        }else{
            return false;
        }
    },
    my.reset=function(){
        my.clearVal('my.alliances');
        my.clearVal('my.cities');
        my.clearVal('my.filter');
        my.clearVal('my.islands');
        my.clearVal('my.options');
        my.clearVal('my.players');
        my.load();
        my.draw();
    }
    my.save=function(){
        my.saveAlliances();
        my.saveCities();
        my.saveFilter();
        my.saveIslands();
        my.saveOptions();
        my.savePlayers();
        my.saveSelf();
    }
    my.addAlliance=function(data){
        if(!isObject(data)||!data.id)
            return;
        
        var idx=my.alliances.keys.indexOf(data.id);
        if(idx<0)
            my.alliances.keys.push(data.id);

        my.alliances[data.id]=data;
        my.saveAlliances();
        return data;
    }
    my.getAlliance=function(id){
        if(typeof id=='object')
            id=id.id;
        var obj=false;
            
        if(id&&id in my.alliances)
            var obj=my.alliances[id];
        return obj;
    }
    my.saveAlliances=function(){
        if(!my.lock)
            my.setVal('my.alliances',my.alliances);
    }
    my.addPlayer=function(data){
        if(!isObject(data)||!data.id)
            return;
        
        var idx=my.players.keys.indexOf(data.id);
        if(idx<0)
            my.players.keys.push(data.id);
            
        //If the player already exists, check to see if their status has changed and record the time
        var oldData=my.players[data.id];            
        if(isObject(oldData)){
            
            if(oldData.status&&data.status&&oldData.status!=data.status){
                data.lastStatus=oldData.status;
                data.statusChanged=my.getServerTime();
                //new Log('O ld : '+uneval(oldData)).clear(50);
                //new Log('New: '+uneval(oldData)).clear(50);
            }
            merge(oldData,data);
            data=oldData;
        }
        
        my.players[data.id]=data;
        my.savePlayers();
        return data;
    }
    my.getPlayer=function(id){
        if(typeof id=='object')
            id=id.id;
        var data=false;
            
        if(id&&id in my.players)
            var data=my.players[id];
            
        return data;
    }
    my.savePlayers=function(){
        if(!my.lock)
            my.setVal('my.players',my.players);
    }
    my.addIsland=function(data){
        if(!isObject(data)||!data.id)
            return;
            
        var idx=my.islands.keys.indexOf(data.id);
        if(idx<0)
            my.islands.keys.push(data.id);
        
        if(data.x&&data.y&&data.id)
            my.islands.coordKeys[data.x+':'+data.y]=data.id;
            
        my.islands[data.id]=data;
        my.saveIslands();
        return data;
    }
    my.getIsland=function(id){
        if(typeof id=='object')
            id=id.id;
        var data=false;
            
        if(id&&id in my.islands)
            data=my.islands[id];
        else if(id&&id.match(/:/)&&id in my.islands.coordKeys)
            data=my.islands[my.islands.coordKeys[id]];
            
        return data;
    }
    my.saveIslands=function(){
        if(!my.lock){
            my.debug('Saving islands');
            my.setVal('my.islands',my.islands);
        }else{
            my.debug('Not saving islands due to lock');
        }
    }
    my.addCity=function(data){
        if(!isObject(data)||!data.id)
            return;
        
        var idx=my.cities.keys.indexOf(data.id);
        if(idx<0)
            my.cities.keys.push(data.id);
            
        my.cities[data.id]=data;
        my.saveCities();
        
        return data;
    }
    my.getCity=function(id){
        try{
            if(isObject(id))
                id=id.id;
            var data=false;
            
            if(id&&id in my.cities)
                data=my.cities[id];
                
            return data;
        }catch(e){
            my.logError(e,'getCity',id);
            return false;
        }
    }
    my.removeCity=function(id){
        try{
            var city=my.getCity(id);
            if(!city)
                return false;
            
            var idx=my.cities.keys.indexOf(city.id);
            if(idx>=0)
                my.cities.keys.splice(idx,1);
                
            delete my.cities[city.id];
            
            my.saveCities();
            return true;
        }catch(e){
            my.logError(e,'removeCity',id);
        }
    }
    my.saveCities=function(){
        if(!my.lock)
            my.setVal('my.cities',my.cities);
    }
    my.saveFilter=function(){
        if(!my.lock)
            my.setVal('my.filter',my.filter);
    }
    my.saveOptions=function(){
        if(!my.lock)
            my.setVal('my.options',my.options);
    }
    my.saveSelf=function(){
        if(!my.lock)
            my.setVal('my.self',my.self);
    }
    my.getServerTime=function(){
        var serverTimeContainer=document.getElementById('servertime');
        if(serverTimeContainer){
            my.serverTime=my.parseTimestamp(serverTimeContainer.innerHTML);
        }else{
            my.serverTime=false;
        }
        return my.serverTime;
    }
    my.getTravelTime=function(x1,y1,x2,y2){
        if(x1==-1||y1==-1||x2==-1||y2==-1)
            return false;
        if(x1==x2&&y1==y2)
            time=1200/60*0.5;
        else
            time=1200/60*(Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2)));
        return time*60*1000;
    }
    my.debug=function(){
        if(!my.debugMode){
            return;
        }else{
            var s='';
            for(var i=0;i<arguments.length;i++){
                s+=(i>0?', ':'')+(isObject(arguments[i])?uneval(arguments[i]):arguments[i]);
            }
            new Log(s);
        }
    }
    my.draw=function(){
        try{
            my.debug('draw');
            
            var div=document.getElementById('ICE');
            if(!div){
                $('body').append('<div id="ICE"/>');
                div=document.getElementById('ICE');
            }else{
                div.innerHTML='';
            }
            my.drawScanForm(div);
            my.drawFilterForm(div);
            my.drawCityList(div);
        }catch(e){
            my.logError(e,'draw');
        }
    }
    my.drawScanForm=function(div){
        var html=[];
        var unknownCoords=false;
        
        html.push('<form id="ICE_scanForm">');
        html.push('<label for="travelHours">Scan islands within <select name="travelHours">');
        for(var i=1;i<=20;i++){
            html.push('<option value="'+i+'"'+(i==my.options.scanDistance?' selected="selected"':'')+'>'+i+'h</option>');
        }
        html.push('</select></label><label for="origin"> of <select name="origin">');
        for(var i=0;i<my.self.cities.keys.length;i++){
            var city=my.self.cities[my.self.cities.keys[i]];
            if(city.x&&city.y){
                html.push('<option value="'+city.id+'"'+(city.id==my.originCity().id?' selected="selected"':'')+'>'+(city.x&&city.y?'['+city.x+':'+city.y+'] ':'')+city.name+'</option>');
            }else{
                if(!unknownCoords){
                    html.push('<option value="unknown location">Unknown Location</option>');
                    unknownCoords=true;
                }
            }
        }
        html.push('</select></label>');
        html.push('<a class="button" id="ICE_scanButton" onclick="return false;">Scan</a>');
        html.push('<a class="button" id="ICE_clearDataButton" onclick="return false;">Clear All Data</a>');
        if(unknownCoords){
            html.push('<div>To scan from your cities, go to Options > Other > Display details in town selection and select "Show coordinates in town naviagtion"</div>');
        }
        html.push('</form>');
        
        //Draw the HTML
        if(div)
            $(div).append(html.join(''));
        else
            $('#ICE_scanForm').replaceWith(html.join(''));
            
        //Add events
        $('#ICE_scanForm [name="origin"]').change(function(){
            my.originCity(this.value);
            my.saveOptions();
            my.drawCityList();
        });
        
        $('#ICE_scanForm [name="travelHours"]').change(function(){
            my.options.scanDistance=this.value.match(/\d+/);
            my.saveOptions();
        });
        my.options.scanDistance=$('#ICE_scanForm [name="travelHours"]').attr('value');
        
        $('#ICE_scanButton',div).click(function(){
            try{
                var city=my.originCity();
                if(city){
                    my.scanAdjacentIslands(city.x,city.y,my.options.scanDistance);
                }else{
                    new Log('Unable to scan from '+my.options.originCityId,false).clear(5);
                }
            }catch(e){
                my.logError(e,'#ICE_scanButton.click');
            }
        });
        
        $('#ICE_clearDataButton',div).click(function(){
            if(confirm('You are about to delete all of your city data.  Are you sure?'))
                my.reset();
        });
    }
    my.drawFilterForm=function(div){
        var html=[];

        html.push('<table id="ICE_filters" class="left"><thead><tr><th>Show</th><th>Filter</th></tr></thead><tbody>');
        var alt=true;
        for(var i=0;i<my.fields.keys.length;i++){
            var fieldId=my.fields.keys[i];
            var field=my.fields[fieldId];
            html.push('<tr class="'+(alt=!alt?'alt':'')+'">');
            html.push('<td><input type="checkbox" id="showField_'+fieldId+'"'+(my.filter.fields.indexOf(fieldId)>=0?' checked="checked"':'')+' />'+field.caption+'</td><td>')
            switch(fieldId){
                case 'playerStatus':
                    var states=['active','inactive','vacation'];
                    for(var j=0;j<states.length;j++){
                        var status=states[j];
                        html.push((j>0?', ':'')+'<input name="showStatus_'+status+'" type="checkbox"'+(my.filter[status]==true?' checked="checked"':'')+'/>'+status);
                    }
                    break;
                case 'totalPoints':
                    html.push('<select name="minTotalPoints">');
                    var options=[0,50,100,500,5000,50000,500000];
                    for(var i=0;i<options.length;i++){
                        var option=options[i];
                        html.push('<option value="'+option+'"'+(my.filter.minTotalPoints==option?' selected="selected"':'')+'>'+option+'</option>');
                    }
                    html.push('</select>minimum');
                    break;
                case 'militaryPoints':
                    
                    break;
                default:
                    html.push('');
                    break;
            }
            html.push('</td>')
            html.push('</tr>');
        }
        
        html.push('<tr><td>Results per page</td><td><select name="resultsPerPage">');
        var perPage=[10,25,50,100,250];
        for(var i=0;i<perPage.length;i++){
            var results=perPage[i];
            html.push('<option value="'+results+'"'+(my.filter.results==results?' selected="selected"':'')+'>'+results+'</option>');
        }
        html.push('</td></tr>');
        
        html.push('</tbody></table>');
        
        //Draw the HTML
        if(div)
            $(div).append(html.join(''));
        else
            $('#ICE_filters').replaceWith(html.join(''));
        
        //Add events
        $('#ICE_filters input[id^="showField_"]').change(function(){
            var fieldId=this.id.match(/showField_(.+)/i)[1];
            var idx=my.filter.fields.indexOf(fieldId);
            if(this.checked){
                if(idx<0){
                    my.filter.fields.push(fieldId);
                }
            }else{
                if(idx>=0){
                    my.filter.fields.splice(idx,1);
                }
            }
            my.saveFilter();
            my.drawCityList();
        });
        
        $('#ICE_filters [name^="showStatus_"]').change(function(){
            var status=this.name.match(/_(.+)/i)[1];
            my.filter[status]=this.checked;
            my.filter.page=1;
            my.saveFilter();
            my.drawCityList();
        });
        $('#ICE_filters [name="minTotalPoints"]').change(function(){
            my.filter.minTotalPoints=parseInt(this.value);
            my.filter.page=1;
            my.saveFilter();
            my.drawCityList();
        });
        $('#ICE_filters [name="resultsPerPage"]').change(function(){
            my.filter.results=parseInt(this.value);
            my.filter.page=1;
            my.saveFilter();
            my.drawCityList();
        });
    }
    my.drawCityList=function(div){
        var alt=true;
        var html=[];
        var showFields=[];
        var showCities=[];
        var shownPlayers=[];
        var serverTime=my.getServerTime();
        
        //Apply filters
        for(var i=0;i<my.cities.keys.length;i++){
            var data={};
            try{
                data.city=my.getCity(my.cities.keys[i]);
                data.player=my.getPlayer(data.city.playerId);
                data.alliance=my.getAlliance(data.player.allianceId);
                data.island=my.getIsland(data.city.islandId);

                if(
                    my.filter[data.player.status]
                    &&(!my.filter.minTotalPoints||(my.filter.minTotalPoints&&data.player.scores.total.points>my.filter.minTotalPoints))
                ){
                    showCities.push(data);
                }
            }catch(e){
                my.logError(e,'drawCityList (apply filters)',data);
            }
        }
        
        //Sort results
        if(my.options.sortField){
            my.debug('Sorting '+showCities.length+' results');
            my.fields[my.options.sortField].sort(showCities,!my.options.sortAsc);
        }
        
        //Get current page from results
        var pages=Math.ceil(showCities.length/my.filter.results);
        var page=my.filter.page;
        var results=my.filter.results;
        showCities=showCities.slice(results*(page-1),results*page);
        
        try{
            html.push('<table id="ICE_cityList"><thead>');
            for(var j=0;j<my.fields.keys.length;j++){
                var fieldId=my.fields.keys[j];
                if(my.filter.fields.indexOf(fieldId)>=0){
                    var field=my.fields[fieldId];
                    showFields.push(field);
                    html.push('<th class="sortable" id="fieldHeader_'+fieldId+'">'+field.caption+(my.options.sortField==fieldId?' '+(my.options.sortAsc?'+':'-'):'')+'</th>');
                }
            }
            html.push('</thead><tbody>');
        }catch(e){
            my.logError(e,'drawCityList (drawing headers)',my.filter.fields,field);
        }
        try{
            if(showCities.length){
                var originCity=my.originCity();
                for(var i=0;i<showCities.length;i++){
                    var data=showCities[i];
                    var city=data.city;
                    var player=data.player;
                    var alliance=data.alliance;
                    var island=data.island;
                    
                    //Add the player to a list of those whose military scores need updating, if it's not been done recently (within an hour)
                    if(shownPlayers.indexOf(player)<0&&(!player.scores.military||(serverTime.getTime()-player.scores.military.updated.getTime())>3600000)){
                        shownPlayers.push(player);
                    }
                    
                    html.push('<tr class="'+(alt=!alt?' alt':'')+'">');
                    for(var j=0;j<showFields.length;j++){
                        var field=showFields[j];
                        html.push('<td>'+field.draw(data)+'</td>');
                    }
                    html.push('</tr>');
                }
                //Show pagination
                html.push('</tbody><tfoot><tr class="'+(alt=!alt?' alt':'')+'"><td colspan="'+my.filter.fields.length+'"><span class="pagination">');
                for(var page=1;page<=pages;page++){
                    html.push('<a class="pageSelect'+(page==my.filter.page?' current':'')+'">['+page+']</a> ');
                }
                html.push('</span></td></tr></tfoot>');
            }else{
                html.push('<tr><td class="center" colspan="7">No Results</td></tr></tbody>');
            }
        }catch(e){
            my.logError(e,'drawCityList (drawing results)');
        }
        html.push('</table>');
        
        //Draw the HTML
        if(div)
            $(div).append(html.join(''));
        else
            $('#ICE_cityList').replaceWith(html.join(''));

        //Add actions
        $('#ICE_cityList a[href*="cityId="]').mouseover(function(){
            try{
                var cityId=this.href.match(/cityId=(\d+)/)[1];
                var $tooltip=$(this).next();
                //$tooltip.html(cityId);
            }catch(e){
                my.logError(e,'#ICE_cityList a[href*="cityId="].mouseover',this);
            }
        });
        $('#ICE_cityList th[id^="fieldHeader_"]').click(function(){
            try{
                var field=this.id.match(/_([^_]+)$/i)[1];
                
                //If the sort field has changed, revert to ascending sort
                if(field!=my.options.sortField){
                    my.options.sortAsc=true;
                }else{
                    my.options.sortAsc=!my.options.sortAsc;
                }
                $(this).addClass(my.options.sortAsc?'asc':'desc');
                $(this).removeClass(my.options.sortAsc?'desc':'asc');
                my.options.sortField=field;
                my.saveOptions();
                my.drawCityList();
            }catch(e){
            }
        });
        $('#ICE_cityList .pagination').click(function(e){
            if(e.target.tagName.match(/^a$/i));
            my.filter.page=parseInt($(e.target).text().match(/\d+/));
            my.saveFilter();
            my.drawCityList();
        });
        
        //Update players' military scores
        try{
            var unlock=my.lock?false:true;
            my.lock=true;
            if(shownPlayers.length){
                var log=new Log('Updating military scores',shownPlayers.length);
                for(var i=0;i<shownPlayers.length;i++){
                    my.playerUpdateMilitaryScore(shownPlayers[i],function(){
                        if(log.next().finished()){
                            if(unlock)
                                my.lock=false;
                            my.savePlayers();
                            my.drawCityList();
                        }
                    });
                }
            }
            my.lock=false;
        }catch(e){
            my.logError(e,'drawCityList (updating military scores)');
        }
    }
    my.showTooltip=function(parent,html){
        var html='<div id="sycdan_tooltip" class="sycdan_tooltip" style="display:block">'+html+'</div>';
        $(parent).append(html);
    }
    my.hideTooltip=function(){
        $('#sycdan_tooltip').remove();
    }
    my.scanAdjacentIslands=function(x,y,maxTravelHours){
        try{
            my.debug('scanAdjacentIslands',x,y,maxTravelHours);
            x=parseInt(x);
            y=parseInt(y);
            maxTravelHours=parseInt(maxTravelHours);
            
            //Create an array of coords to scan
            var scanCoords=[x+':'+y];
            var radius=1;
            var cnt=0;
            for(var distance=1;distance<=50;distance++){
                radius+=2;
                for(var r=0;r<radius;r++){
                    for(var side=0;side<4;side++){
                        switch(side){
                            case 0://top
                                var coords=(x-distance+r)+':'+(y-distance);
                                break;
                            case 1://right
                                var coords=(x+distance)+':'+(y+distance-r);
                                break;
                            case 2://bottom
                                var coords=(x+distance-r)+':'+(y+distance);
                                break;
                            case 3://left
                                var coords=(x-distance)+':'+(y-distance+r);
                                break;
                        }
                        
                        var xy=coords.split(':');
                        var travelHours=my.getTravelTime(x,y,xy[0],xy[1])/1000/60/60;
                        if(travelHours<=maxTravelHours){
                            if(!(coords in my.islands.coordKeys)||my.islands.coordKeys[coords]!=0){
                                if(scanCoords.indexOf(coords)<0)
                                    scanCoords.push(coords);
                            }
                        }
                    }
                }
            }
            
            //Scan all of the islands, obtaining their IDs first
            my.debug('Coords to obtain IDs for: '+scanCoords.length);
            if(scanCoords.length>0){
                var log=new Log('Locating islands',scanCoords.length);
                var valid=[];
                for(var i=0;i<scanCoords.length;i++){
                    my.getIslandIdByCoords(scanCoords[i],function(id,coords){
                        if(id){
                            valid.push(id);
                        }
                        if(log.next().finished()){
                            my.debug('Valid island IDs: '+valid.length);
                            my.cancelRescan();
                            my.rescanIslands(valid.length);
                        }
                    });
                }
            }
        }catch(e){
            my.logError(e,'scanAdjacentIslands');
        }
    }
    my.getIslandIdByCoords=function(coords,callback){
        try{
            var xy=coords.split(':');
            var x=xy[0];
            var y=xy[1];
            
            //Stop if the coords are out of bounds
            if(x<1||y<1||x>100||y>100){
                my.debug('getIslandIdByCoords',coords,'out of bounds');
                if(typeof(callback)=='function')
                    callback(0,coords);
                return;
            }
            
            //Use the ID we've already found, if possible
            if(coords in my.islands.coordKeys){
                my.debug('getIslandIdByCoords',coords,'using existing ID ('+my.islands.coordKeys[coords]+')');
                if(typeof(callback)=='function')
                    callback(my.islands.coordKeys[coords],coords);
                return;
            }
            
            //Find the ID
            my.debug('getIslandIdByCoords',coords,'fetching...');
            my.getDoc('/index.php',function(doc){
                $scripts=$('script:contains("map.handleMapData"):first',doc);
                if($scripts.length){
                    var pattern='"'+x+'":{[^{]*"'+y+'":\\["(\\d+)"';
                    var re=new RegExp(pattern,'i');
                    var m=re.exec($scripts.text());
                }
                var islandId=m?m[1]:0;
                my.debug('Island ID: ',islandId);
                my.islands.coordKeys[coords]=islandId;
                my.saveIslands();
                if(typeof(callback)=='function')
                    callback(islandId,coords);
            },'view=worldmap_iso&islandX='+x+'&islandY='+y);
        }catch(e){
            my.logError(e,'my.getIslandIdByCoords',coords);
        }
    }
    my.scanIsland=function(id,callback){
        try{
            my.debug('scanIsland',id);
            if(!id){
                if(typeof(callback)=='function')
                    callback(id);
                return;
            }
            my.getDoc('/index.php?view=island&id='+id,function(doc){
                my.view_island(doc);
                if(typeof(callback)=='function')
                    callback(id);
            });
        }catch(e){
            my.logError(e,'scanIsland',id,callback);
        }
    }
    my.cancelRescan=function(){
        my.debug('cancelRescan');
        if(my.rescanTimeout){
            window.clearTimeout(my.rescanTimeout);
            delete my.rescanTimeout;
        }
    }
    my.rescanIslands=function(max){
        try{
            var scan=[];
            
            if(my.rescanTimeout){
                my.debug('rescanIslands',max,'scan already scheduled');
                return;
            }
            
            if(!my.scanning){                
                if(typeof max!='number'){
                    max=10;
                }
                
                //Determine which islands should be scanned
                for(var i=0;i<my.islands.keys.length;i++){
                    var island=my.getIsland(my.islands.keys[i]);
                    if(my.shouldScanIsland(island.id)){
                        scan.push(island);
                    }
                }
                //Sort them be descinging time since last scan
                scan.sort(function(a,b){
                    var valA=a.lastScanTime.getTime();
                    var valB=b.lastScanTime.getTime();
                    if(!valA){
                        return true;
                    }else{
                        return valA>valB;
                    }
                });
                /*longServerTime=my.getServerTime().getTime();
                for(var i=0;i<scan.length;i++){
                    new Log('['+scan[i].x+':'+scan[i].y+'] '+unsafeWindow.getTimestring(longServerTime-scan[i].lastScanTime.getTime())).clear(5);
                }*/
                
                //Scan the oldest few
                var factor=Math.random()*1;
                my.debug('Islands to scan: '+scan.length);
                if(scan.length){
                    my.scanning=true;
                    scan=scan.slice(0,Math.ceil(max*factor));
                    var log=new Log('Rescanning islands',scan.length);
                    var unlock=my.lock?false:true;
                    my.lock=true;
                    for(var i=0;i<scan.length;i++){
                        my.scanIsland(scan[i].id,function(id){
                            if(log.next().finished()){
                                my.scanning=false;
                                if(unlock)
                                    my.lock=false;
                                my.save();
                                my.draw();
                            }
                        });
                    }
                }else{
                    new Log('All islands scanned recently!',true).clear(5);
                }
            }else{
                new Log('Alraedy scanning',false).clear(5);
            }
            
            //Set the next scan time (15sec + 0-60sec)
            var secondsFromNow=15+(scan.length==0?60:scan.length*1);
            my.debug('Seconds until next rescan: '+secondsFromNow);
            my.rescanTimeout=window.setTimeout(function(){
                my.debug('Starting scheduled rescan');
                my.cancelRescan();
                my.rescanIslands();
            },secondsFromNow*1000);
        }catch(e){
            my.logError(e,'rescanIslands');
        }
    }
    my.shouldScanIsland=function(id,x,y){
        try{
            var island=my.getIsland(id);
            if(island){
                if(island.lastScanTime){
                    if(x&&y){
                        //We're looking at a single island view, so just rescan that one
                        return true;
                    }else{
                        var elapsed=my.getServerTime().getTime()-island.lastScanTime.getTime();
                        if(elapsed/1000/60/60>=.5){//hours
                            return true;
                        }else{
                            //new Log(island.x+':'+island.y+' was scanned '+unsafeWindow.getTimestring(elapsed)+' ago').clear(5);
                        }
                    }
                }else{
                    return true;
                }
            }else if(x&&y){
                //This is not an island we've scanned before, so check if it's within range before scanning
                var travelTime=my.getTravelTime(my.originCity().x,my.originCity().y,x,y);
                new Log(x+':'+y+': '+unsafeWindow.getTimestring(travelTime)+'/'+(travelTime/1000/60/60));
                if(my.options.scanDistance&&(travelTime/1000/60/60)<my.options.scanDistance){
                    //new Log('should scan');
                    return true;
                }else{
                    //new Log('should not scan, max: '+my.options.scanDistance);
                    return false;
                }
            }
        }catch(e){
            my.logError(e,'shouldScanIsland',id);
        }
        return false;
    }
    my.parseCityLocation=function(cityLocation,islandId){
        try{
            var alliance={id:0};
            var city={id:0};
            var player={scores:{total:{}}};
            
            //Get alliance data
            $allianceLink=$('.cityinfo .ally a:first',cityLocation);
            if($allianceLink.length){
                alliance.id=$allianceLink.attr('href').match(/allyId=(\d+)/i)[1];
                alliance.name=$allianceLink.text();
            }
            
            //Get player data
            $owner=$('.cityinfo .owner',cityLocation);
            $messageSend=$owner.find('.messageSend');
            if($messageSend.length>0){
                player.id=$messageSend.attr('href').match(/receiverId=(\d+)/i)[1];
                player.name=$owner.contents()[1].nodeValue.replace(/\s+$/g,'');
            }else{
                //This is one of yours
                player.id=my.self.id;
                player.name=my.self.name;
            }
            var $a=$('a[id^="city_"]',cityLocation);
            player.status=$('.vacation',$a).length?'vacation':($('.inactivity',$a).length?'inactive':'active');
            player.allianceId=alliance.id;
            player.scores.total.points=parseInt($('.cityinfo .name:eq(1)',cityLocation).contents()[1].nodeValue.replace(/\D/g,''));
            
            //Get city data
            var $cityLink=$('a[id^="city_"]',cityLocation);
            if($cityLink.length)
                city.id=$cityLink.attr('id').match(/_(\d+)/i)[1];
            city.name=$('.cityinfo .name',cityLocation).contents()[1].nodeValue;
            city.islandId=islandId;
            city.playerId=player.id;

            my.addAlliance(alliance);
            my.addCity(city)
            my.addPlayer(player);
            
            return {city:city,player:player,alliance:alliance};
        }catch(e){
            my.logError(e,'parseCityLocation','City: '+uneval(city),'Player: '+uneval(player),'Alliance: '+uneval(alliance),'IslandId: '+islandId);
        }
    }
    my.view_island=function(doc){
        try{
            my.debug('view_island');
            
            if(!doc)
                doc=document;
            var island={};
            var islandCityIds=[];
        
            //Get island ID in whatever way possible
            var jq=$('#cities .cityactions .espionage a:first',doc);
            if(jq.length){
                island.id=jq.attr('href').match(/islandId=(\d+)/i)[1];
            }else{
                jq=$('#cities .cityinfo .ally a:first',doc);
                if(jq.length){
                    island.id=jq.attr('href').match(/[&?]id=(\d+)/i)[1];
                }else{
                    jq=$('#cities .buildplace a:first',doc);
                    if(jq.length)
                        island.id=jq.attr('href').match(/islandId=(\d+)/i)[1];
                }
            }
            
            if(!island.id){
                new Log('Unable to get ID from island',false).clear(5);
                my.debug('Unable to get ID from island');
                return;
            }
            
            //Get island data
            var $crumbs=$('#breadcrumbs .island',doc);
            var m=$crumbs.text().match(/(\w+)\D*(\d+):(\d+)/);
            island.name=m[1];
            island.x=parseInt(m[2]);
            island.y=parseInt(m[3]);
            island.tradeGood=$('#tradegood',doc).attr('class').match(/^\s*(\w+) /i)[1];
            
            //Stop if this is an island we recently scanned or it is too far away
            if(!my.shouldScanIsland(island.id,island.x,island.y)){
                my.debug('Should not scan island');
                return;
            }
            
            //Parse all cities
            var unlock=my.lock?false:true;
            my.lock=true;
            var $cities=$('#mainview #cities .city',doc);
            if($cities.length){
                var log=new Log('Scanning '+island.name+' ['+island.x+':'+island.y+']',$cities.length);
                $cities.each(function(){
                    var data=my.parseCityLocation(this,island.id);
                    islandCityIds.push(data.city.id);
                    log.next();
                });
            }else{
                new Log('No cities found on '+island.name+' ['+island.x+':'+island.y+']').clear(5);
            }
            
            //Remove cities that no longer exists
            var curCityKeys=my.cities.keys.slice(0);
            for(var i=0;i<curCityKeys.length;i++){
                var city=my.getCity(curCityKeys[i]);
                if(city&&city.islandId==island.id){
                    if(islandCityIds.indexOf(city.id)<0){
                        my.removeCity(city);
                        new Log('['+island.x+':'+island.y+'] '+city.name+' no longer exists').clear(5);
                    }
                }
            }
            
            island.lastScanTime=my.getServerTime();
            my.debug('Island data collected',island);
            my.addIsland(island);
            
            if(unlock)
                my.lock=false;
            my.saveIslands();
            my.saveCities();
            my.savePlayers();
            my.saveAlliances();
        }catch(e){
            my.logError(e,'view_island',island);
        }
    }
    my.view_options=function(doc){
        if(!doc)doc=document;
        
        //Get player name and ID
        my.self.name=$('#options_userData input',doc).attr('value');
        my.self.id=$('#options_debug td:first',doc).text().replace(/\s/,'');
        
        my.saveSelf();
    }
    my.getDoc=function(url,callback,data,method){
        method=typeof(method)=='undefined'?'GET':method;
        data=typeof(data)=='undefined'?'':data;
        var headers={
            "User-agent":navigator.userAgent, 
            "Accept":method=='POST'?'application/atom+xml,application/xml,text/xml':'text/html', 
            "Cookie":document.cookie,
            "Referer":'http://'+document.domain+'/index.php',
        }
        if(method=='POST'){
            headers['Content-type']='application/x-www-form-urlencoded';	
        }
        GM_xmlhttpRequest({
            method:method,
            url:'http://'+document.domain+(url.substr(0,1)=='/'?'':'/')+url,
            data:data,
            headers:headers,
            //onerror:function(response){
            //    alert('err');
            //}
            //onreadystatechange :function(response){
            //    var log=new Log('('+response.readyState+') '+this.url+this.data);
            //}
            onload:function(response){
                var html=document.createElement('html');
                html.innerHTML=response.responseText;
                var doc=document.implementation.createDocument('','',null);
                doc.appendChild(html);
                callback(doc);
            }
        }); 
    }
    my.getView=function(doc){
        if(!doc)doc=document;
        return doc.body.id;
    }
    my.setVal=function(key,value){
        GM_setValue(document.domain+'.'+key,uneval(value));
    }
    my.clearVal=function(key){
        GM_deleteValue(document.domain+'.'+key);
    }
    my.getVal=function(key,defaultValue){
        return eval(GM_getValue(document.domain+'.'+key,defaultValue));
    }
    //Create time object from a timestamp
    my.parseTimestamp=function(t,sourceGmtOffset){
        //Assume the timestamp is in GMT unless an hour offset is passed
        var d=new Date();
        if(typeof sourceGmtOffset=='undefined')
            var sourceGmtOffset=0;
        //Get the local GMT offset in hours
        var localGmtOffset=-d.getTimezoneOffset()/60;
        //Attempt to match the constituent parts of the timestamp
        var m=t.match(/(\d+)\.(\d+)\.(\d+)\s+(\d+):(\d+):(\d+)/i);
        if(m){
            d.setTime(0);
            d.setDate(m[1]);
            d.setMonth(m[2]-1);
            d.setFullYear(m[3]);
            d.setHours(m[4]);
            d.setMinutes(m[5]);
            d.setSeconds(m[6]);
            //Adjust the time to get its TZ correct
            d.setTime(d.getTime()+((sourceGmtOffset+localGmtOffset)*60*60000));
        }
        return d;
    }
    my.logError=function(e,where){
        var html='';
        for(var i=2;i<arguments.length;i++)
            html+='<br/>>> Param '+(i-1)+': '+uneval(arguments[i]);
        new Log(e+(where?' in '+where:'')+html);
    }
    my.addCommas=function(val){
        var pt=unsafeWindow.LocalizationStrings.decimalPoint;
        var x=(val+'').split(pt);
        var rgx=/(\d+)(\d{3})/;
        while(rgx.test(x[0])){
            x[0]=x[0].replace(rgx,'$1'+unsafeWindow.LocalizationStrings.thousandSeperator+'$2');
        }
        return x.join(pt);
    }
    my.playerUpdateMilitaryScore=function(player,callback){
        try{
            my.getDoc('/index.php?view=highscore&highscoreType=army_score_main&searchUser='+player.name.replace(/ /g,'%20'),function(doc){
                var $scores=$('#mainview table.table01 tr td.score',doc);
                var found=false;
                //Loop through each row
                $scores.each(function(){
                    var $name=$('td.name',this.parentNode);
                    if($name.length){
                        if($name.text().trim().replace(/\s/g,' ')==player.name.trim().replace(/\s/g,' ')){
                            found=true;
                            player.scores.military={
                                points:parseInt($(this).text().replace(/\D/,''))
                            };
                        }
                    }
                });
                if(!found){
                    player.scores.military={
                        points:'?'
                    };
                }
                player.scores.military.updated=my.getServerTime();
                my.savePlayers();
                if(typeof(callback)=='function')
                    callback(player);
            });
        }catch(e){
            my.logError(e,'playerUpdateMilitaryScore',player);
        }
    }
    
    my.init();
}