// ==UserScript==
// @name           BD HKBoard
// @namespace      HK.IK
// @version        0.01
// @author        kinn
// @description   
// @icon http://www.bjdvd.org/favicon.ico
// @include    http://s*.ikariam.*/*
// @include    http://s*.*.ikariam.*/*
// @exclude    http://support.ikariam.*/*
// @exclude    http://board.*.ikariam.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://code.jquery.com/ui/1.8.18/jquery-ui.min.js
// @resource       http://code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css
// ==/UserScript==
$('head').append("<link href='http://code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css' type='text/css' rel='stylesheet'>");
//http://jqueryui.com/demos/progressbar/images/pbar-ani.gif

//if('error' == $('body').attr('id')){
//	window.location='http://s2.hk.ikariam.com/index.php';
//}

if (!HKBoard) var HKBoard = {};
HKBoard ={
    /* Requires modules */
    Log:             {},
    DOM:             {},
    Util:            {},
    Core:            {},
    DB:              {},
    Cache:           {},
    Renders:         {},
    Handlers:        {},
    Updater:         {},
   
    StartTime:         0,
    EndTime:         0,
    LogEnabled:         false,
    Token:             '',
    CityNVs:         null,
    MainID:             'HKBoard',
   
    /* Script metas */
    ScriptName:         'Ikariam HK Board',
    Version:         '0.0.1',
    HomePage:         '',
    ScriptURL:         '',
    UserScriptsID:     127946
};

HKBoard.Init = function(){
    this.StartTime = new Date().getTime();
    this.HomePage         = 'http://userscripts.org/scripts/show/'+this.UserScriptsID;
    this.ScriptURL         = 'http://userscripts.org/scripts/source/'+this.UserScriptsID+'.user.js';
   
    this.CityNVs = new Array();
    var _self=this;
    $("#citySelect option").each(function() {
        var cityVO = new Object();
        cityVO.name = $(this).text();
        cityVO.value = $(this).val();
        _self.CityNVs.push(cityVO);
    });
   
    /* Init Log */
    this.Log.Init(this);
    this.Log._Enabled = this.LogEnabled;
    this.Log.Add('Start...');

    this.DOM.Init(this);
    this.DB.Init(this);
    this.Cache.Init(this);
    this.Core.Init(this);
    this.Renders.Init(this);
    this.Util.Init(this);
    
};

HKBoard.Start = function(){
	this.DB.LoadData();
    this.Cache.GatherData();
    this.Renders.Draw();
    this.Cache.MergeTimer();
}
/*LOG MODULE*/
HKBoard.Log ={
    _Parent: null,
    _Enabled: false
};
   
HKBoard.Log.Init = function(parent){
    this._Parent = parent;
};
   
HKBoard.Log.Add = function(msg){
    if (this._Enabled == true){
        GM_log(msg);
    }
};
   
/*DOM MODULE*/
HKBoard.DOM ={
    _Parent: null
};

HKBoard.DOM.Init = function(parent){
    this._Parent = parent;
};

HKBoard.DOM.CreateDocument = function(responseText){
    var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
    var doc = document.implementation.createDocument('', '', dt);
    var html = doc.createElement('html');

    html.innerHTML = responseText;
    doc.appendChild(html);

    return doc;
};

HKBoard.DOM.GetNodes = function(path, root){
    var contextNode = root ? root.evaluate ? root : root.ownerDocument : document;
    return contextNode.evaluate(path, contextNode, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
};
   
HKBoard.DOM.HasNode = function(path, root){
    var value = this.GetNodes(path, root);
    if (value.snapshotLength >= 1){
        return true;
    }else{
        return false;
    }
};
   
HKBoard.DOM.GetFirstNode = function(path, root){
    var value = this.GetNodes(path, root);
    if (value.snapshotLength >= 1){
        return value.snapshotItem(0);
    }
    return null;
};
   
HKBoard.DOM.GetLastNode = function(path, root){
    var value = this.GetNodes(path, root);
    if (value.snapshotLength >= 1){
        return value.snapshotItem(value.snapshotLength-1);
    }
    return null;
};
   
HKBoard.DOM.GetFirstNodeValue = function(path, defaultValue, root)
    {
    var value = this.GetFirstNode(path, root);
    if (value != null){
        return value.value;
    }else{
        return defaultValue;
    }
};
   
HKBoard.DOM.GetLastNodeValue = function(path, defaultValue, root){
    var value = this.GetLastNode(path, root);
    if (value != null){
        return value.value;
    }else{
        return defaultValue;
    }
};
   
HKBoard.DOM.GetFirstNodeTextContent = function(path, defaultValue, root)
    {
    var value = this.GetFirstNode(path, root);
    if (value != null){
        return value.textContent;
    }else{
    return defaultValue;
    }
};

HKBoard.DOM.GetLastNodeTextContent = function(path, defaultValue, root)
    {
    var value = this.GetLastNode(path, root);
    if (value != null){
        return value.textContent;
    }else{
		return defaultValue;
    }
};

HKBoard.DOM.GetFirstNodeTitle = function(path, defaultValue, root){
    var value = this.GetFirstNode(path, root);
    if ((value != null) && (value.title != '')) {
        return value.title;
    } else{
        return defaultValue;
    }
};
   
HKBoard.DOM.HasClassName = function(oElm, strClassName){
    var arrayClassNames = oElm.className.split(' ');
    var found = false;
    var arrayClassNamesLength = arrayClassNames.length;
    for (var k = 0; k < arrayClassNamesLength; k++){
        if (arrayClassNames[k] == strClassName){
            found = true;
            break;
        }
    }
    return found;
};

/*DB MODULE*/
HKBoard.DB ={
    _Parent: null,
    _Cities: null,
    _ResourceType: new Array('wood','wine','marble','glass','sulfur'),
    _BuildingType: new Array(
        "townHall",
        "temple",
        "dump",
        "academy",
        "port",
        "shipyard",
        "warehouse",
        "wall",
        "tavern",
        "museum",
        "palace",
        "palaceColony",
        "embassy",
        "branchOffice",
        "safehouse",
        "barracks",
        "workshop",
        "carpentering",
        "forester",
        "stonemason",
        "glassblowing",
        "winegrower",
        "alchemist",
        "architect",
        "optician",
        "vineyard",
        "fireworker"
        ),
    _ArmyType: new Array(
        {'name':'slinger','id':301,'label':'投石兵'},
        {'name':'swordsman','id':302,'label':'剑士'},
        {'name':'phalanx','id':303,'label':'重装'},
        {'name':'marksman','id':304,'label':'火枪'},
        {'name':'mortar','id':305,'label':'迫击炮'},
        {'name':'catapult','id':306,'label':'投石车'},
        {'name':'ram','id':307,'label':'攻城'},
        {'name':'steamgiant','id':308,'label':'蒸汽巨人'},
        {'name':'bombardier','id':309,'label':'气球'},
        {'name':'cook','id':310,'label':'厨师'},
        {'name':'medic','id':311,'label':'医生'},
        {'name':'gyrocopter','id':312,'label':'旋翼'},
        {'name':'archer','id':313,'label':'弓箭'},
        {'name':'spearman','id':315,'label':'长矛'}
        ),
    _ShipType: new Array(
        {'name':'ship_ram','id':210,'label':'冲撞'},
        {'name':'ship_flamethrower','id':211,'label':'喷火'},
        {'name':'ship_submarine','id':212,'label':'潜艇'},
        {'name':'ship_ballista','id':213,'label':'强弩'},
        {'name':'ship_catapult','id':214,'label':'投石船'},
        {'name':'ship_mortar','id':215,'label':'迫击炮船'},
        {'name':'ship_steamboat','id':216,'label':'蒸汽冲撞'},
        {'name':'ship_rocketship','id':217,'label':'弩炮船'},
        {'name':'ship_paddlespeedship','id':218,'label':'轮桨快艇'},
        {'name':'ship_ballooncarrier','id':219,'label':'航母'},
        {'name':'ship_tender','id':220,'label':'维修'}
        ),
    _BFlag: false,
    _RFlag: false,
    _THFlag: false,
    _BARFlag: false,
    _SHIPFlag: false
};

HKBoard.DB.Init = function(parent){
    this._Parent = parent;
	
	
	var version=window.localStorage.getItem("Version");
	if(version==null ||version!=this._Parent.Version){
		window.localStorage.clear();
	}
	window.localStorage.setItem("Version",this._Parent.Version);
	
    var flag=window.localStorage.getItem("BFlag");
    if("Y"==flag){
        var time1 = window.localStorage.getItem("BTime");
        if(time1 !=null && (new Date().getTime()-parseInt(time1)<900000)){
            this._BFlag=true;
        }
    }
	//debug
    //this._BFlag=false;
    
    flag=window.localStorage.getItem("RFlag");
    if("Y"==flag){
        var time1 = window.localStorage.getItem("RTime");
        if(time1 !=null && (new Date().getTime()-parseInt(time1)<900000)){
            this._RFlag=true;
        }
    }
    //debug
    //this._RFlag=false;
    
    flag=window.localStorage.getItem("THFlag");
    if("Y"==flag){
        var time1 = window.localStorage.getItem("THTime");
        if(time1 !=null && (new Date().getTime()-parseInt(time1)<900000)){
            this._THFlag=true;
        }
    }
    //debug
    //this._THFlag=false;
    
    flag=window.localStorage.getItem("BARFlag");
    if("Y"==flag){
        var time1 = window.localStorage.getItem("BARTime");
        if(time1 !=null && (new Date().getTime()-parseInt(time1)<900000)){
            this._BARFlag=true;
        }
    }
    //debug
    //this._BARFlag=false;
    
    
    flag=window.localStorage.getItem("SHIPFlag");
    if("Y"==flag){
        var time1 = window.localStorage.getItem("SHIPTime");
        if(time1 !=null && (new Date().getTime()-parseInt(time1)<900000)){
            this._SHIPFlag=true;
        }
    }
    //debug
    //this._SHIPFlag=false;
    

};

HKBoard.DB.Serialize = function(data){
    return uneval(data);
};

HKBoard.DB.UnSerialize = function(data){
    return eval(data);
};

HKBoard.DB.GetData = function(varname, vardefault) {
  //var res = GM_getValue("HKIK"+varname);

  var res = this.UnSerialize(window.localStorage.getItem("HKIK"+varname));
  if (res == undefined) {
    return vardefault;
  }
  return res;
}

HKBoard.DB.SaveData = function(varname,varvalue){
    window.localStorage.setItem("HKIK"+varname, this.Serialize(varvalue));
};

HKBoard.DB.GetCity = function() {
    if(this._Cities==null || this._Cities.length ==0){
        var _self=this;
        this._Cities=this._Parent.CityNVs.slice(0);
    }
    return this._Cities.shift();
}

HKBoard.DB.IsFin = function() {
    return !(this._Cities.length>0);
}

HKBoard.DB.LoadData = function() {
    if(typeof(_self) == "undefined"){
        _self=this;
    };  
    var cityId=_self.GetCity().value;
   
    //暂时实时加载
    //var globalVO = new Object();
    //globalVO.accountTransporter=$("#accountTransporter").text();
    //globalVO.value_gold=$("#value_gold").text();
    //_self._Parent.DB.SaveData("GlobalInfo",globalVO);
	var now =new Date().getTime();
	
    if(!_self._BFlag){
        //加载建筑
		var data=_self._Parent.DB.GetData(cityId+"Building",null);
		if(data==null||(now-data.bTime)>600000){
			$.ajax({
					url: "http://s2.hk.ikariam.com/index.php?view=city&id="+cityId,
					cache: false,
					dataType: 'text',
					type: 'post',
					beforeSend: function(XMLHttpRequest){
						XMLHttpRequest.setRequestHeader("User-agent", window.navigator.userAgent);
						XMLHttpRequest.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
						XMLHttpRequest.setRequestHeader("Accept", 'text/html,application/xhtml+xml,application/xml');
						XMLHttpRequest.setRequestHeader("Referer", window.location);
						XMLHttpRequest.setRequestHeader("Cookie", document.cookie);
						XMLHttpRequest.overrideMimeType('text/html; charset='+document.characterSet);
					},
					success: function(data){
						var doc = _self._Parent.DOM.CreateDocument(data);
						_self._Parent.Token=_self._Parent.DOM.GetFirstNodeValue("//input[@name='actionRequest']","",doc);
					   
						var buildingVO = new Object();
						buildingVO.cityId=cityId;
						var cityName = _self._Parent.DOM.GetFirstNodeTextContent("id('breadcrumbs')/*[@class='city']","",doc);
						buildingVO.cityName=cityName;
						var islandId = _self._Parent.DOM.GetFirstNodeTextContent("id('breadcrumbs')//a[@class='island']","",doc);
						if ( islandId == undefined || islandId == 0 ){
							islandId = /\[[0-9:]+\]/.exec(_self._Parent.DOM.GetFirstNode("id('breadcrumbs')//a[contains(@href,'view=island')]",doc).innerHTML)[0];
						}
					   
						$(_self._BuildingType).each(function(n,type) {
							var building = _self._Parent.DOM.GetFirstNodeTextContent("//div[@id='mainview']//ul[@id='locations']//li[@class='"+type+"']/a/@title","-",doc);
							buildingVO[type+"lv"] = building.replace(/[^0-9]/g, "");
							building = _self._Parent.DOM.GetFirstNodeTextContent("//div[@id='mainview']//ul[@id='locations']//li[@class='"+type+"']/div[@class='timetofinish']/span[@id='cityCountdown']","-",doc);
							buildingVO[type+"time"] = building;
							building = _self._Parent.DOM.GetFirstNodeTextContent("//div[@id='mainview']//ul[@id='locations']//li[@class='"+type+"']/a/@href","-",doc);
							buildingVO[type+"url"] = building;
							
						});
		   
						buildingVO.bTime=new Date().getTime();
						_self._Parent.DB.SaveData(cityId+"Building",buildingVO);
						
						if(_self.IsFin()){
							_self._BFlag=true;
							_self._Cities=_self._Parent.CityNVs.slice(0);
							
							window.localStorage.setItem("BFlag","Y");
							window.localStorage.setItem("BTime",new Date().getTime());
						}
						_self.LoadData();
					},
					data:{'actionRequest':_self._Parent.Core.GetToken(),'function':'changeCurrentCity','oldView':'city','id':cityId},
					error: function(XMLHttpRequest, textStatus, errorThrown){
					}
				});
		}
    }else if(!_self._RFlag){
        //加载资源数据(ajax方式导致资源与建筑信息脱节；建设信息不受影响；资源信息需要到仓库中查询)
        //需要建筑数据中的位置 dump warehouse
        var buildingVO=_self._Parent.DB.GetData(cityId+"Building",null);
		var data=_self._Parent.DB.GetData(cityId+"City",null);
        if(buildingVO != null&&(data==null||(now-data['bTime'])>600000)){
            var typeurl=buildingVO.dumpurl=="-"?buildingVO.warehouseurl:buildingVO.dumpurl;
            var type=buildingVO.dumpurl=="-"?"warehouse":"dump";
            if(typeurl!='-'){
                var position=typeurl.slice(typeurl.lastIndexOf("=")+1);
                $.ajax({
                        url: "http://s2.hk.ikariam.com/index.php"+typeurl,
                        cache: false,
                        dataType: 'text',
                        type: 'post',
                        beforeSend: function(XMLHttpRequest){
                            XMLHttpRequest.setRequestHeader("User-agent", window.navigator.userAgent);
                            XMLHttpRequest.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                            XMLHttpRequest.setRequestHeader("Accept", 'text/html,application/xhtml+xml,application/xml');
                            XMLHttpRequest.setRequestHeader("Referer", window.location);
                            XMLHttpRequest.setRequestHeader("Cookie", document.cookie);
                            XMLHttpRequest.overrideMimeType('text/html; charset='+document.characterSet);
                        },
                        success: function(data){
                            var doc = _self._Parent.DOM.CreateDocument(data);
                            _self._Parent.Token=_self._Parent.DOM.GetFirstNodeValue("//input[@name='actionRequest']","",doc);
                           
                            //TODO 未重构
                            var cityVO = new Object();
                            cityVO.cityId=cityId;
                            var cityName = _self._Parent.DOM.GetFirstNodeTextContent("id('breadcrumbs')/*[@class='city']","",doc);
                            cityVO.cityName=cityName;
                            var islandId = _self._Parent.DOM.GetFirstNodeTextContent("id('breadcrumbs')//a[@class='island']","",doc);
                            if ( islandId == undefined || islandId == 0 ){
                                islandId = /\[[0-9:]+\]/.exec(_self._Parent.DOM.GetFirstNode("id('breadcrumbs')//a[contains(@href,'view=island')]",doc).innerHTML)[0];
                            }
                            cityVO.islandId=islandId;
                            
                            
                            var res = _self._Parent.Util.ToInteger(_self._Parent.DOM.GetFirstNodeTextContent("//tr[@class='capacitiesTableResult']/td[2]","",doc));
                            cityVO['safe']=res;
                            res = _self._Parent.Util.ToInteger(_self._Parent.DOM.GetFirstNodeTextContent("//tr[@class='capacitiesTableResult']/td[3]","",doc));
                            cityVO['total']=res;
                           
                            $(_self._ResourceType).each(function(n,type) {
                                var res = _self._Parent.Util.ToInteger(_self._Parent.DOM.GetFirstNodeTextContent("//td[@class='gesamt']//table//tr["+(n+1)+"]//td[2]","",doc));
                                
                                if(type=="glass"){
                                    cityVO["crystal"] =res;
                                }else{
                                    cityVO[type] =res;
                                }

                                res = _self._Parent.Util.ToInteger(_self._Parent.DOM.GetFirstNodeTextContent("//td[@class='klaubar']//table//tr["+(n+1)+"]//td[2]","",doc));
                                cityVO[type+"over"] = res;
                                //res.split(":").length-1)>1(判断字符出现次数)
                                if(type=="glass"){
                                    cityVO["crystalover"] =res;
                                }else{
                                    cityVO[type+"over"] =res;
                                }
                                
                                //TODO(增长量) ajax时，资源信息错位；目前通过Cache辅助生成
                                cityVO[type+"grow"] ="0";
                                cityVO["crystalgrow"] ="0";
                                
                            });   
                           
							cityVO.rTime=new Date().getTime();
                            _self._Parent.DB.SaveData(cityId+"City",cityVO);
                            
                            if(_self.IsFin()){
                                _self._RFlag=true;
                                _self._Cities=_self._Parent.CityNVs.slice(0);
                                
                                window.localStorage.setItem("RFlag","Y");
                                window.localStorage.setItem("RTime",new Date().getTime());
                                
                            }
                            window.setTimeout(_self.LoadData,"3000");
                        },
                        data:{'actionRequest':_self._Parent.Core.GetToken(),'function':'changeCurrentCity','oldView':type,'id':cityId,'position':position},
                        error: function(XMLHttpRequest, textStatus, errorThrown){
                        }
                });
            }
            
        }
    }else if(!_self._THFlag){
        //加载城镇数据
		var data=_self._Parent.DB.GetData(cityId+"TownHall",null);
		if(data==null||(now-data['thTime'])>600000){
			$.ajax({
					url: "http://s2.hk.ikariam.com/index.php?view=townHall&id="+cityId,
					cache: false,
					dataType: 'text',
					type: 'post',
					beforeSend: function(XMLHttpRequest){
						XMLHttpRequest.setRequestHeader("User-agent", window.navigator.userAgent);
						XMLHttpRequest.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
						XMLHttpRequest.setRequestHeader("Accept", 'text/html,application/xhtml+xml,application/xml');
						XMLHttpRequest.setRequestHeader("Referer", window.location);
						XMLHttpRequest.setRequestHeader("Cookie", document.cookie);
						XMLHttpRequest.overrideMimeType('text/html; charset='+document.characterSet);
					},
					success: function(data){
						var doc = _self._Parent.DOM.CreateDocument(data);
						_self._Parent.Token=_self._Parent.DOM.GetFirstNodeValue("//input[@name='actionRequest']","",doc);
						$('#actionRequest').val(_self._Parent.Token);
					   
						var townHallVO = new Object();
						townHallVO.cityId=cityId;
						var cityName = _self._Parent.DOM.GetFirstNodeTextContent("id('breadcrumbs')/*[@class='city']","",doc);
						townHallVO.cityName=cityName;
						var islandId = _self._Parent.DOM.GetFirstNodeTextContent("id('breadcrumbs')//a[@class='island']","",doc);
						if ( islandId == undefined || islandId == 0 ){
							islandId = /\[[0-9:]+\]/.exec(_self._Parent.DOM.GetFirstNode("id('breadcrumbs')//a[contains(@href,'view=island')]",doc).innerHTML)[0];
						}
						townHallVO.islandId=islandId;
						
						var res = _self._Parent.DOM.GetFirstNodeTextContent("//ul[@class='stats']//li[@class='space']","",doc);
						townHallVO.inhabitants=res.replace(/[^-0-9\/]+/g,"");
						
						res = _self._Parent.DOM.GetFirstNodeTextContent("//span[@class='value total']","",doc);
						townHallVO.totalHouse=res;
						
						res = _self._Parent.DOM.GetFirstNodeTextContent("id('PopulationGraph')//div[@class='citizens']//span[@class='count']","",doc);
						townHallVO.citizens=res;
						
						res = _self._Parent.DOM.GetFirstNodeTextContent("id('PopulationGraph')//div[@class='woodworkers']//span[@class='count']","",doc);
						townHallVO.woodworkers=res;
						
						res = _self._Parent.DOM.GetFirstNodeTextContent("id('PopulationGraph')//div[@class='specialworkers']//span[@class='count']","",doc);
						townHallVO.specialworkers=res;
						
						res = _self._Parent.DOM.GetFirstNodeTextContent("id('PopulationGraph')//div[@class='scientists']//span[@class='count']","",doc);
						townHallVO.scientists=res;
						
						res = _self._Parent.DOM.GetFirstNodeTextContent("id('PopulationGraph')//div[@class='priests']//span[@class='count']","",doc);
						townHallVO.priests=res;
						
						
						res = _self._Parent.DOM.GetFirstNodeTextContent("id('populationGrowthValue')","",doc);
						townHallVO.populationGrowthValue=res;
						
						 res = _self._Parent.DOM.GetFirstNodeTextContent("//li[@class='garrisonLimit']/span[@class='value occupied']","",doc);
						townHallVO.garrisonLimit=res;
						
						res = _self._Parent.DOM.GetFirstNodeTextContent("//li[@class='garrisonLimitSea']/span[@class='value occupied']","",doc);
						townHallVO.garrisonLimitSea=res;
						
						res = _self._Parent.DOM.GetFirstNodeTextContent("id('happinessLarge')/div/@class","",doc);
						townHallVO.happiness=res.slice(res.lastIndexOf('_')+1);
						
						res = _self._Parent.DOM.GetFirstNodeTextContent("id('incomeGoldValue')","",doc);
						townHallVO.incomeGoldValue=res;
						
						
						var cityVO=_self._Parent.DB.GetData(cityId+"City",null);
						if(cityVO!=null){
							res=_self._Parent.Util.ToInteger(_self._Parent.DOM.GetLastNodeTextContent("id('PopulationGraph')/div[@class='woodworkers']/span[@class='production']","",doc));
							cityVO['woodgrow']=res;
							res=_self._Parent.Util.ToInteger(_self._Parent.DOM.GetLastNodeTextContent("id('PopulationGraph')/div[@class='specialworkers']/span[@class='production']","",doc));
							var type=_self._Parent.DOM.GetLastNodeTextContent("id('PopulationGraph')/div[@class='specialworkers']/span[@class='production']/img/@src","",doc);
							type=type.slice(type.lastIndexOf('_')+1);
							type=type.substring(0,type.lastIndexOf('.'));
							cityVO[type+'grow']=res;
							if(type=="glass"){
								cityVO["crystalgrow"] =res;
							}
							_self._Parent.DB.SaveData(cityId+"City",cityVO);
						}
						
						townHallVO.thTime=new Date().getTime();
						_self._Parent.DB.SaveData(cityId+"TownHall",townHallVO);
						
						if(_self.IsFin()){
							_self._THFlag=true;
							_self._Cities=_self._Parent.CityNVs.slice(0);
							
							window.localStorage.setItem("THFlag","Y");
							window.localStorage.setItem("THTime",new Date().getTime());
						}
						window.setTimeout(_self.LoadData,"3000");
					},
					data:{'actionRequest':_self._Parent.Core.GetToken(),'function':'changeCurrentCity','oldView':'townHall','id':cityId},
					error: function(XMLHttpRequest, textStatus, errorThrown){
					}
			});
		}
    }else if(!_self._BARFlag){
        //需要建筑数据中的位置 barracks
        var buildingVO=_self._Parent.DB.GetData(cityId+"Building",null);
        var data=_self._Parent.DB.GetData(cityId+"Bar",null);
        if(buildingVO != null&&(data==null||(now-data['barTime'])>600000)){
            var typeurl=buildingVO.barracksurl;
            if(typeurl!="-"){
                var position=typeurl.slice(typeurl.lastIndexOf("=")+1);
                
                $.ajax({
                        url: "http://s2.hk.ikariam.com/index.php"+typeurl,
                        cache: false,
                        dataType: 'text',
                        type: 'post',
                        beforeSend: function(XMLHttpRequest){
                            XMLHttpRequest.setRequestHeader("User-agent", window.navigator.userAgent);
                            XMLHttpRequest.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                            XMLHttpRequest.setRequestHeader("Accept", 'text/html,application/xhtml+xml,application/xml');
                            XMLHttpRequest.setRequestHeader("Referer", window.location);
                            XMLHttpRequest.setRequestHeader("Cookie", document.cookie);
                            XMLHttpRequest.overrideMimeType('text/html; charset='+document.characterSet);
                        },
                        success: function(data){
                        
                            var doc = _self._Parent.DOM.CreateDocument(data);
                            _self._Parent.Token=_self._Parent.DOM.GetFirstNodeValue("//input[@name='actionRequest']","",doc);
							$('#actionRequest').val(_self._Parent.Token);
                           
                            var barVO = new Object();
                            barVO.cityId=cityId;
                            var cityName = _self._Parent.DOM.GetFirstNodeTextContent("id('breadcrumbs')/*[@class='city']","",doc);
                            barVO.cityName=cityName;
                            var islandId = _self._Parent.DOM.GetFirstNodeTextContent("id('breadcrumbs')//a[@class='island']","",doc);
                            if ( islandId == undefined || islandId == 0 ){
                                islandId = /\[[0-9:]+\]/.exec(_self._Parent.DOM.GetFirstNode("id('breadcrumbs')//a[contains(@href,'view=island')]",doc).innerHTML)[0];
                            }
                            barVO.islandId=islandId;
                            
                            
                           //士兵建造时间，有必要？海军同理？
                           //防守和占领信息也是一样?
                            $(_self._ArmyType).each(function(n,unit) {
                                var res = _self._Parent.Util.ToInteger(_self._Parent.DOM.GetFirstNodeTextContent("//li[@class='unit "+unit.name+"']//div[@class='unitcount']","",doc));
                                barVO[unit.id] =res;
                                
                            });   
                          
							barVO.barTime=new Date().getTime();
                            _self._Parent.DB.SaveData(cityId+"Bar",barVO);
                            
                            if(_self.IsFin()){
                                _self._BARFlag=true;
                                _self._Cities=_self._Parent.CityNVs.slice(0);
                                
                                window.localStorage.setItem("BARFlag","Y");
                                window.localStorage.setItem("BARTime",new Date().getTime());
                                
                            }
                            window.setTimeout(_self.LoadData,"3000");
                        },
                        data:{'actionRequest':_self._Parent.Core.GetToken(),'function':'buildUnits','oldView':'','id':cityId,'position':position,'action':'CityScreen'},
                        error: function(XMLHttpRequest, textStatus, errorThrown){
                        }
                });
            }
            
        }
    
    }else if(!_self._SHIPFlag){
        //需要建筑数据中的位置  shipyard
        var buildingVO=_self._Parent.DB.GetData(cityId+"Building",null);
        var data=_self._Parent.DB.GetData(cityId+"Ship",null);
        if(buildingVO != null&&(data==null||(now-data['shipTime'])>600000)){
            var typeurl=buildingVO.shipyardurl;
            if(typeurl!="-"){
                var position=typeurl.slice(typeurl.lastIndexOf("=")+1);
                $.ajax({
                        url: "http://s2.hk.ikariam.com/index.php"+typeurl,
                        cache: false,
                        dataType: 'text',
                        type: 'post',
                        beforeSend: function(XMLHttpRequest){
                            XMLHttpRequest.setRequestHeader("User-agent", window.navigator.userAgent);
                            XMLHttpRequest.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                            XMLHttpRequest.setRequestHeader("Accept", 'text/html,application/xhtml+xml,application/xml');
                            XMLHttpRequest.setRequestHeader("Referer", window.location);
                            XMLHttpRequest.setRequestHeader("Cookie", document.cookie);
                            XMLHttpRequest.overrideMimeType('text/html; charset='+document.characterSet);
                        },
                        success: function(data){
                            var doc = _self._Parent.DOM.CreateDocument(data);
                            _self._Parent.Token=_self._Parent.DOM.GetFirstNodeValue("//input[@name='actionRequest']","",doc);
							$('#actionRequest').val(_self._Parent.Token);
                           
                            var shipVO = new Object();
                            shipVO.cityId=cityId;
                            var cityName = _self._Parent.DOM.GetFirstNodeTextContent("id('breadcrumbs')/*[@class='city']","",doc);
                            shipVO.cityName=cityName;
                            var islandId = _self._Parent.DOM.GetFirstNodeTextContent("id('breadcrumbs')//a[@class='island']","",doc);
                            if ( islandId == undefined || islandId == 0 ){
                                islandId = /\[[0-9:]+\]/.exec(_self._Parent.DOM.GetFirstNode("id('breadcrumbs')//a[contains(@href,'view=island')]",doc).innerHTML)[0];
                            }
                            shipVO.islandId=islandId;
                            
                            
                           //士兵建造时间，有必要？海军同理？
                           //防守和占领信息也是一样?
                            $(_self._ShipType).each(function(n,unit) {
                                var res = _self._Parent.Util.ToInteger(_self._Parent.DOM.GetFirstNodeTextContent("//li[@class='unit "+unit.name+"']//div[@class='unitcount']","",doc));
                                shipVO[unit.id] =res;
                                
                            });   
                           
						   shipVO.shipTime=new Date().getTime();
                            _self._Parent.DB.SaveData(cityId+"Ship",shipVO);
                            
                            if(_self.IsFin()){
                                _self._BARFlag=true;
                                _self._Cities=_self._Parent.CityNVs.slice(0);
                                
                                window.localStorage.setItem("SHIPFlag","Y");
                                window.localStorage.setItem("SHIPTime",new Date().getTime());
                                
                            }
                            window.setTimeout(_self.LoadData,"3000");
                        },
                        data:{'actionRequest':_self._Parent.Core.GetToken(),'function':'buildUnits','oldView':'','id':cityId,'position':position,'action':'CityScreen'},
                        error: function(XMLHttpRequest, textStatus, errorThrown){
                        }
                });
            }
            
        }
    }else{
        //加载其他数据
    }
   
}

HKBoard.DB.AutoLoad = function() {
    this._Cities=this._Parent.CityNVs.slice(0);
    this._BFlag=false;
    this._RFlag=false;
    this._THFlag=false;
    var _self=this;
    window.setInterval(this.LoadData,"1800000");
}

/*Cache MODULE*/
HKBoard.Cache ={
    _Parent:             null,
    _CurrentId:            null,
    _CacheDate:            null
};

HKBoard.Cache.Init = function(parent){
    this._Parent = parent;
    this._CurrentId=$("#citySelect").val();
    this._CacheTime=new Date().getTime();
};

HKBoard.Cache.GatherData= function(){

    var _self = this;
    var cityVO = new Object();
    $(_self._Parent.DB._ResourceType).each(function(n,type) {
        cityVO[type]=_self._Parent.Util.ToInteger($("#value_"+type).text(),0);
        var res =_self._Parent.DOM.GetFirstNodeTextContent("//li[@class='"+type+"']/div[@class='tooltip']","");
        if((res.split(":").length-1)==2){
            res = res.slice(res.indexOf(":")+1,res.lastIndexOf(":"));
            cityVO[type+"grow"] = parseInt(res.replace(/[^0-9]/g, ""));
        }else if((res.split(":").length-1)>2){
            res = res.slice(res.indexOf(":")+1,res.lastIndexOf(":"));
			res = res.slice(0,res.indexOf(":"));
            cityVO[type+"grow"] = parseInt(res.replace(/[^0-9]/g, ""));
        }else{
             cityVO[type+"grow"] = 0;
         }
    });
    cityVO['crystal']=this._Parent.Util.ToInteger($("#value_crystal").text(),0);
    var res =_self._Parent.DOM.GetFirstNodeTextContent("//li[@class='glass']/div[@class='tooltip']","");
    if((res.split(":").length-1)>1){
        res = res.slice(res.indexOf(":")+1,res.lastIndexOf(":"));
         cityVO['crystalgrow'] = parseInt(res.replace(/[^0-9]/g, ""));
    }else{
     cityVO['crystalgrow'] = 0;
    }
    _self._Parent.DB.SaveData(_self._CurrentId+"CacheCity",cityVO);
    
};

HKBoard.Cache.MergeData= function(){
    if(typeof(_self) == "undefined"){
        _self=this;
    };    
    $(HKBoard.CityNVs).each(function(n,nv) {
        var dbCityVO=_self._Parent.DB.GetData(nv.value+"City",null);
        var cityVO=_self._Parent.DB.GetData(nv.value+"CacheCity",null);
        if(dbCityVO!=null&&cityVO!==null){
            $(_self._Parent.DB._ResourceType).each(function(n,type) {
                dbCityVO[type]=cityVO[type];
                dbCityVO[type+"grow"]=cityVO[type+"grow"];
            });
            dbCityVO['crystal']=cityVO['crystal'];
            dbCityVO['crystalgrow']=cityVO['crystalgrow'];
        
            _self._Parent.DB.SaveData(nv.value+"City",dbCityVO);    
        }
    });
}

HKBoard.Cache.MergeTimer= function(){
    var _self=this;
    window.setInterval(this.MergeData,"30000");
}

/*Render MODULE*/
HKBoard.Renders ={
    _Parent:             null,
    _ImgYes: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVHjatJbdK0NhHMd/Oy5ES5oUF/I2skySaBx5acWNXCrhwkuGC+IPIS4w5Qopl3JDLbOMFZLQxAy5mPKStJQL5vddz7RwZrPjV989ned0Pt+z55zn9z2aQCBAESqVVcYqYWlZWWL+huVnHbEOWE9KAI2CQQqrhSXP7y5IGx47Pb48kvvWHTxpyDCQLllHDfp66qzoeOcpJ2uF9RyNQTHLMrE5mTi1NU1vgbdI/5ASNAk0WDNAw3VDr3xoZZ1EMjA7Lhyti/tLZDuzUSxlLjRTe3kb1ebXLvOh7SeDUlZ/43ST5H24pL9UXlourQ+sYclmWIeYk8IeZlf3Uu+f4ShcCwZYgvlp0DxmH0/i5aF4CwywwAwZ6PC2WJ2zpFYJlgw2DCpntq3Sb29LLAUWmGDjx+D0Okntcl25MBTBICOeB6tU53ceDJkw0GKXql2CqZXonwsGfvQVtUsw/TC4xQ5UuwrS9Rh8MHDLebLqBqYcE4ZTGOz1V1ve0RXVKrDABBsG9+jnFrlPNQPBwua6D71Fq6P1I6/cauOGgwEWmOHNDpE3h34ezwPHtWCAFYrRb4HDQRMMnFg7K+4ccA4excAJD54ebrmJ6IrRRCbWXCzLXChofgv9VBH6VeGhf+w7Dp40Zhq/hv6OCP2naL8qlD5bssX8dbSfLR8CDACURMy5Nc8LLAAAAABJRU5ErkJggg==",
    _ImgWait:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH/SURBVHjatJbNSwJRFMWvg2DCGFKEComLCLIPMqIiWlW7qCSIiDYRLfof2rduGS0k2lS0CSvaVauQqEjpwyCCwkDDCkmhhNDuGd6EfahjTheOMG+c35l5b+aeZ8hms1SgrKw2VgtLZjnFeISVYp2xTlmJfABDHoNK1jCrx7/3JB2GkpRIvtNN5E05WeesIKvFSF2tFvL2VWd46IC1yXrRYtDEmln2P5hWtuOUyRR8QpIkA00M1tCk15bmw0XWRSGD/qPz5NjW/jMFgi9USnV7Kmmot4o6mi3rfLirjhtz/tPKGl1YjVIklqZSCzd0z9d1zFlG+fCRFVKeMGcxp2bnb6W/wNXCtWCAJZifBoNLGw9mnh4qt8AAC0zVoApvy9pOnPQqweoBGwadPCAVe1tKKbDABBs/7pPLFOldwbDCbICB/b6Mhc1Xd1GF6YCBjK9U7xJMWaJ/Lhik0Ff0LsFMwSBWazfpbuByKMwoDMLtjbLuBh63wryCwfH4QE0GXVG3eWcWmGBLojEd8IBuBoKFjHhU36LtqRFbmltt2XAwwAIzt9kh8nzo584yFhzXggGWGqM/Aof7uhI4pXZW3DngHDxfAue3yETwTHPLNaEraolMzLmYFp8aNMVC3ypCvzs39K/vXpWT9S7z99APiNBPaN1V5Nu2uNRepnXb8iHAALTTzrv1a76ZAAAAAElFTkSuQmCC",
    _ImgNo:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH6SURBVHjatJa7S8NgFMVvo7UGiq9JBxGnWkTEwYoPXFzFRelc6VDp0H/A2X9B7FDoXHQRVxfxgQ8QEalOUhx0EFu10NZq6jkxkfpIjTZeOP1ISn43373kns9VqVSkRrRBQ9AA5IW6jftXUB46hY6hnBXAZZGgBZqBxouplFLe3pZKNivPFxf6n40+n7ja28U9MSHNwaCGWzvQOvRgJ0E/FCnE455CIiGiaVIzFEXUcFjUSKSEqzh0VivBVHl3N1haXZWnrS35TTRNTopnbk7cY2MpXG5+l2AQWrifnVVeMhn5SzT09Ejr2hq3vAKd6Busaub8Yyz2ZziDz5JBlsF8TzBdWF5WUR6pN8ggi0yzRB1Yl+4CAeXHhtoNNL7j4ICwRe4gUEwmnYMzwNKZYPPHX97fF6ejfHjIpY8JOutprGXDLy+5dDGBV8NX6nQYTK8i/xxMkFcwVxwHvzHzTHDDL9DpaOjt5XLNBGn3yIjjCdzDw1zOmeCoORTS+HE4Vx9FdCbYpN5ynquhkGN8g0WPuDVfe0ONRksYtfWXBgyyyKwedrS8BOd5PQ3ns2SQZdroF8OB0eiG89vJyjcnHMZjaTjVxhPGyPUUkkl7lomaG2VJmEbzk+m3GaY/+sH00+k30/f7P5v+nmH6ObunCqtji9mgjN1jy6sAAwD9Hc4TcS9VxQAAAABJRU5ErkJggg==",
    _ImgUnknown:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHmSURBVHjatJYxT8JQFIUvXYgJGOJkQ0zDpoiIDCbGsWETSUjjbhz8MfwCBzcmQ0gQN9LRuBhERHQjjSE4MBBhYSne0zwIqMXW1pscmj5433m8tvc0MJlMaElFWHusHVaItSHG31gj1hPrgTWwAwRsDFZZx6zDWq0mNRoNGg6HZBiG9aWiKBQOhymVSlEmkzF56JZ1zfpwYrDNOi+Xy8FKpUKmaS77hyRJEuVyOcrn82M+vWA9LzNQm83mia7rVK/XyU2l02lSVZWSyeQVn+qzBcz9ZpelFYtF13AU5mAuGIK1YICLeVooFKRer0d/LcwFAyzBnBkclUqlFd4e8lpggAXm1GANd0u1WiW/SrAOwYbBPg9Iv90tbgosMMHGx1ar1SK/q91u47AJg3UvF9auut0uDjIMQnhK/S7BDEn0zwWDEfqK3yWYIxi8y7Lsu0E0GrWePRi8JBIJ3w3i8TgOrzC4z2azJrqib/vOLDDBBrWPfs4DvhkIFjKiP132jaZpY261nuFggAXmfLND5F2in3u54JgLBljTGP0WONzXrcBx21mxcsA5eBYC56fIRFicccsNois6iUzsudgWrPzRSehHROgfzId+p9OxvozFYl9D/06E/sDpW4Xda4sixg2nry2fAgwA7hjKmyGdaWoAAAAASUVORK5CYII=",
    _ImgWood: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAMCAYAAAC9QufkAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVHjadJJNSNNxGMc///lvrb3828q1FJ1MKHCjlF4ouihJB4O69HJO8FCX6NC5a0XdeoGgc5ZEkIJ1iBpJRQmh4jxs2pZzm5ub/jfHxl7s3/6/sbJgz+V5+fF9nu/z/T1S6ttTtlsur2rBuWcUkmX6zlxBsdolmpjhf+Ce1p2cPD2Mu8/F/Mt7yKai1gwsN4ItaUaTJJVSyS7yHbt2E4+pvB99wn5Ht3Zw4LzUdHIhr/7jDdUi6Vyte3aNdOQrQf+41nRy+MdPPN1dwjsdGULTUfxhCKQLuCy/6N+Y1JtonsER2jo9goWkC6bvtZ4u4R+7jd3RxoOJVVrym9y6uI+FUEowKJvstBtVEV+9+0iAZV2kaOgzxbWIYPB4NERLzd+84aOz18viizf4zFmShTowXZT/0rbYIrglM7R7ReG6IcaJ4UsE5mbJb2Q4erafpS9BvJWseM/EEiSiYU2nLusC5TYLVIpZjDYLkVhdMN/hXlLRJRSbGbPLyKvn66LedaiHwMP79Axd1mQd2Pgahayg1mioOPayHC+Ig1EcVqaiW0xOrOA2QeunMWSb9RSR8OvaJRlZnklyZ0rj2OyCYGGoWsnMR/n4ISwGDDqr4KwBFYiX7XW19R3evR1nerHCiqqxmkhx7VwHRwYO8N0f+lPv2HapF4aO81uAAQAil+gxsz59XAAAAABJRU5ErkJggg==",
    _ImgWine:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHGSURBVHjaYnx1ag4DOtj38OT/vefPM4iJMjDoyhgy2MmaM7AwMTAiq2FhwAKWnFgGpr//YmH4wXSP4SfTKwZPBl8UNUzomv78Y/gvIAYx78OrPwxf3/1jePLwBYbhGBpBThJXYYbzv7z7z2Dy3Q9DIyOyH1+/+/B/3oTdDFsunmeQU2cFi7Ebf2CQ0YCwHQRCGZzkzRlRbARpOrnkIsOD128YfPQNGfK1/BkaLKIZXh3mhtt8X3YDOODgGs/fePk/KLGLQYyPlyHR3JxBW0SMYcO1ywzzTxxnUDaTAWsC+ffh5d8MZ37thngJFBi/TzwF2wJS/P7zNwYFURGGwzdvMrz4+JlhUpcbw+79dxnUrdihNn9g2M6w+T/L+w8fGNp372JINrdkuPrmFcPqU2cYJJ7xMpQ7u4MVXr59GEyDQpdbCOKzZ/+OIeJx6/VrYNpFUwtMq8tIMtx88pzhxrnX8MARkUaENrP8N56Gjz9+MJjJyzOEm5kwCLFzMtx+85ph/YULDOefPmGYlFPKoH5eg+EYwxkGMQVmhm+f/zNE/KuERAcoREGmgKJCVUWVwS/GACOJgQLwDOcmhndMtxmSuKsYAAIMAHIKugpSnTR5AAAAAElFTkSuQmCC",
    _ImgMarble:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGoSURBVHjahFJdL8NgFH46XddtXZdN4yOWmBAXSCSEGy5dSvxB/8MdQUSQIBIuFqLD0q7ZlK5dt7a8+p6Jj2Tm3PT07Xue83xUsE63MahYqsAcYRRC4xLpdBrJISb8/C4OGg7fBCYWF1C/ucLxwQ1EgWFtuczKE8NfIIlBw5VmqteHXQQdH1G8fPe4Ar3WZP8CXOghtJExRP4LvJaLtufiLQZqOQ529mJGlzrrC8A111Fm2ZxCW4/2D8D7jc2tWH+PeRAE+JMBN0yWZahqHr7fQUbJYW5xhdhIchrFQv7X/b4SnBcbRq0Wuy7Tdi6jeneL6r1OIJqm4cF4JS/6AvDNk9MzKE3Nkn5ejboJv+1BkmRksgqdnVw9fcdIkZXWKbJ8oUAyLOORgNqdEE37FS3Xg+vYcD2fZorDxR7Ac6CwIbWETjxwdrgLMSnCcVyiOr+0Cnl8HO9Rl4YMo46cqpKR/E6Cbw4lDRk5iYZlovvpcBQGeKjquD4/JU8SYu+f4DLEpEQ9jzZhhiP0YpoWPXnOPL5ULIEXpyxEPlzbQk7J0pndbHz59SHAAPFG0oxdJVVKAAAAAElFTkSuQmCC",
    _ImgSulfur:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH0SURBVHjajJJNaxNRFIafGZNp08zEJE3EaFOTCNFaRFqUggURddWFKC5cCP4H8V+4cVNc6cK6caMuBEGQaoVGLA1aJVosbZqONmnMh81kMu1UM85MQYrU4IELF877de49QnnmLp3KK723PmRyDJy8JuzWFzuSg6LVNosMnx1hLjtltdtb1n8L+A8mLYkiohRDbxyiNxrk47sMf4vsKuCAjPIL2FpCil7GaL1lLf+K0sJLHtwZ75wgfPyKpcTT7BE0TO8oPitDfypKS9NpapvIXWXu3bpp3R+/bf0zQXXxKR5JRtkrYKwvs6HXiCfDyEoXP+omp88NUy8v83VlzvojIHp9luP+bfo6oUg3tdUc048maAtR8vN5egIBhkbTLtbn07h0dYDnDye2Ezjk4NExNPUJ4QOD/DSbzL7OkUjLmM0F1KXvtBoNO5Gfvn4FNV9zTzAkIe4kO69eKZWYfPyMUxcuumKLuYI7f7Wyibauc2ZsiC+fqrSaJqrawuPbtx/1zQ032sq8DdYrHDmRwN+tUvhcd53KRQ3ZJvT4I8TiEuljvWRn1kimDiO632VXvaZgCn0Mjpy3QSGaDdON7Tg5FYmFXHGnHANF9rh3YecqO/+vKLP2CqYw9ASGsbq9kaLszCo4fX+gQL2yQaX8i+zkFL8FGABBCeG3MCTxbAAAAABJRU5ErkJggg==",
    _ImgCrystal:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAMCAYAAAC9QufkAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVHjabFLPTxNREP62u12WbdfSLiVSa1OgGIEABWMImiByENFoAvwBXLh68MK/4cmb8Wi4kXA0Bi7EH5Sfxq5GGzCSIpTYlO12a9utD3aq1Y2dy8y8N9+bb755XGb9GRrZT+ZmCWEY160tSFyFa1QjNDp8uhdix3wQ0VAL0uId3JC+skgx+d8Drkbg7SxPvlCuwixb+PgritWMh9lsHODPeYktcvfZ88okS5bb6wVKE49iqUxFacPCk2UNb05EJ+10kYcpWZS84waQ9cnn0QblplVrlNLek7/UXHXS1gwfbnW1UiKLAr78MCFIMpjohSxweL2r4UPiLSYnRuGPz+Jf6q5e7ykuuIFuVab5bOtq9ZA/KZSQ2VmjONYzBL3i1IazVzW/cZndi3cipTM0N4lI7h9g+loMS5sp9Mt5DMRHsJw8JMCjKwb+KE9qDwWqePnpCBFVqYu0+z2PQFXH3fHbuBqUEQkotf17onXqLjt40OcnqmLFwGC7gottbUT58cxETSivG2MdKhbGY3ih6bA/D4G/GTxe6WGoahAre7nafs+7P+wLUZw4yDnmtO92dOXvzHNLBuu4OYWwWMJYLAi/r4W6LW7uY7AzjMOcCfP3OIWCgaxRpLozAQYAw+q/LLa8YygAAAAASUVORK5CYII=",
    _ImgScrollLeft_1:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAuCAYAAAAcEfjaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEPSURBVHjaYmQAgtZg8/8g+tMPFobP738wTDt2lpEBB2BC4f37z0AIMP55svP/h6NNDOeOXGfYe/YHg6oMC4O9IRfDvK1fGIx1VRjExf8yKOoqMwjwczCwcTEBbfjzA6jvPwPjf2aG/yD8j5GBiZkJjw2fn/z/8fIMw6OLRxke3brLICbJyCAkwcFw7DgLg5axIQM/PyODoIotAycHDwMzOwsDEwOJYFTDqIZRDaMaRjWMahiuGlgY3p5n+HG2i+HxwTsMu85+BdfTzsYcDJf3fmVge3URXE+zvtnPwAKspxnB9TTDP1Dty8DM8o+BnZURiP8zMDPiaQnsnl34/9SOYwxEtzVcU/sZSWlrAAQYAKhSVaS8GpLcAAAAAElFTkSuQmCC",
    _ImgScrollRight_1:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAuCAYAAAAcEfjaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADpSURBVHjaYmTAA1qDzf+D6E8/WBg+v//BMO3YWUYmBmLAv/9wJuOvY1Fg3q9v/xg+fPwBFry69xiDc9Vihg9HmxjOHbnOsPfsDwZVGRYGe0MuBtw2/AFp/s/A+J+Z4T8I/2NkYGJmYmD88+Ue2Ia/P/8wfP/xBaz2y9MbDBKadgw/Xp5heHTxKMOjW3cZxCQZGYQkOBiI8wMSGNUwqmFUw6iGUQ2jGoarBpZ/l2rAjN/AevoLUj0tUTaX4cfZLobHB+8w7Dr7FVxPOxvjrUX/gep9BmaWfwzsrIxA/J+BmREkQuu2BkCAAQA7Pl6Fy9SDcAAAAABJRU5ErkJggg==",
    _ImgScrollMiddle_1:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAuCAYAAADp73NqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAmSURBVHjaYvj//z8DA5j4dSzqPxMDCPz5cg/CGooEkj/gfgMIMAB2KxZChMiVfwAAAABJRU5ErkJggg==",
    _ImgScrollLeft_2:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAABmCAYAAAD/GnDbAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEgSURBVHja7Ni9SgNREIbhd3ZPkjUIqxZGwUaMjZAibGElFuIVeA1egLcg2NjY2QjeheAPQQQTQVwlWAREm5hGURRjYIu4x802YhGNlc18MByGw8P0n5BkY2Xe9t63yNB+idiuhUKfON+22PJbpNs6sK/VdS5PG1TCiNkpw2I5z+7eO0GpSKHwwXRphhHfI5t3kgvdKHEWsS62N7HguM4PF9otGz1c0KxXad7cMT4pjE141M4Mc0EZ3xdGiwsMecO4OYPDH6NAgQIFChQoUKBAgQIFChQoUKDg/4Dh+Yoo3OT+5JbDsJP2S0uBx3WlQ/axnvZLmadjjO8hab9EnDjBNTG5jCRjcaX/BTnaWbPn+7V0GagjW17d+vocoCP7FGAAffVWFCyKGPAAAAAASUVORK5CYII=",
    _ImgScrollRight_2:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAABmCAYAAAD/GnDbAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEBSURBVHja7Ni/agJBEAbwb+5OIpYpwgm2KVJKinRJ4SOky4NYBCvBxgews8pbCBaBeJUXSCAkhGhhsLDy32k25tzV2yLY5LAQ0nwDw84O+2PYdgQpUbu+MMk5Ux7mY4VGEIqDfUKb31JWwY29rZYak6myzZd2gNLtHSadKh4fXtEOFU4LHq6KOfw9IU6wgRgXJkktcFwHEkd9O2H9HeNLRfZtNHyDf3YJNepi8NTB4L2Hk7zg2M9ivz/sBAEBAQEBAQEBAQEBAQEBAQHB/wFPP1ds8bPUiHb2S365CRXW8Xn/gVa4sPul0nnq9kdvU+B6GkcZ2aaBK0knJQ6yI9sIMADZCV71Yy13bQAAAABJRU5ErkJggg==",
    _ImgScrollMiddle_2:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABmCAYAAAAK5PtrAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAtSURBVHjaYv7//z8DEwMQMP0+Hv0fzGL48+UehDVKDB+C4dexKGj8wuMcIMAAUqQQxLAX0V0AAAAASUVORK5CYII=",
    _Positions:{
        // palace
        "palace" : [
            { "x" : 40, "y" : 70 },        // positioning the icon
            { "x" : 10, "y" : 96 },        // positioning the info box
        ],
        
        // palaceColony
        "palaceColony" : [
            { "x" : 40, "y" : 70 },
            { "x" : 10, "y" : 96 },
        ],
        
        // academy
        "academy" : [
            { "x" : 50, "y" : 60 },
            { "x" : 20, "y" : 12 },
        ],
        
        // townHall
        "townHall" : [
            { "x" : 35, "y" : 85 },
            { "x" : 10, "y" : 38 },
        ],

        // architect
        "architect" : [
            { "x" : 50, "y" : 65 },
            { "x" : 22, "y" : 18 },
        ],

        // safehouse
        "safehouse" : [
            { "x" : 40, "y" : 42 },
            { "x" : -6, "y" : -6 },
        ],

        //wall
        "wall" : [
            { "x" : 150, "y" : 40 },
            { "x" : 500, "y" : 64 },
        ],

        // shipyard
        "shipyard" : [
            { "x" : 30, "y" : 60 },
            { "x" : 22, "y" : 12 },
        ],

        // port
        "port" : [
            { "x" : 40, "y" : 70 },
            { "x" : 60, "y" : 24 },
        ],

        // glassblowing
        "glassblowing" : [
            { "x" : 50, "y" : 60 },
            { "x" : 20, "y" : 12 },
        ],

        // warehouse
        "warehouse" : [
            { "x" : 60, "y" : 60 },
            { "x" : 16, "y" : 12 },
        ],

        // museum
        "museum" : [
            { "x" : 45, "y" : 60 },
            { "x" : 6, "y" : 12 },
        ],

        // workshop
        "workshop" : [
            { "x" : 30, "y" : 60 },
            { "x" : 20, "y" : 12 },
        ],

        // forester
        "forester" : [
            { "x" : 45, "y" : 50 },
            { "x" : 26, "y" : 3 },
        ],

        // optician
        "optician" : [
            { "x" : 50, "y" : 60 },
            { "x" : 20, "y" : 12 },
        ],

        // barracks
        "barracks" : [
            { "x" : 40, "y" : 60 },
            { "x" : 10, "y" : 12 },
        ],

        // carpentering
        "carpentering" : [
            { "x" : 50, "y" : 60 },
            { "x" : 16, "y" : 12 },
        ],

        // embassy
        "embassy" : [
            { "x" : 40, "y" : 60 },
            { "x" : 0, "y" : 12 },
        ],
        
        // stonemason
        "stonemason" : [
            { "x" : 50, "y" : 50 },
            { "x" : 16, "y" : 3 },
        ],

        // fireworker
        "fireworker" : [
            { "x" : 50, "y" : 60 },
            { "x" : 22, "y" : 12 },
        ],

        // winegrower
        "winegrower" : [
            { "x" : 50, "y" : 60 },
            { "x" : 20, "y" : 12 },
        ],

        // vineyard
        "vineyard" : [
            { "x" : 50, "y" : 60 },
            { "x" : 26, "y" : 12 },
        ],

        // tavern
        "tavern" : [
            { "x" : 40, "y" : 50 },
            { "x" : 20, "y" : 3 },
        ],

        // alchemist
        "alchemist" : [
            { "x" : 50, "y" : 60 },
            { "x" : 20, "y" : 12 },
        ],
        
        // branchOffice
        "branchOffice" : [
            { "x" : 50, "y" : 60 },
            { "x" : 10, "y" : 12 },
        ],
        
        // temple
        "temple" : [
            { "x" : 26, "y" : 50 },
            { "x" : -8, "y" : 3 },
        ],
		
		// dump
        "dump" : [
            { "x" : 40, "y" : 50 },
            { "x" : 12, "y" : 12 },
        ],
        
        // construction spot
        "constructionSite" : [
            { "x" : 45, "y" : 59 },
            { "x" : 18, "y" : 15 },
            { "x" : 18, "y" : -40 },    // special for colony and palace
        ]        
    }
};

HKBoard.Renders.Init = function(parent){
    this._Parent = parent;
};

HKBoard.Renders.SetCommonStyles = function()
    {
    var default_style = <><![CDATA[
   
    #container {
        position:relative;
        top:32px;
        }
    #GF_toolbar {
        position:absolute;
        top:34px;
        }
   
    /****************** main div *******************/
   
    #HKBoard {
        width: 990px;
        margin: 0 auto;
        padding: 15px 0;
        }
   
    #HKBoard.LtoR,
    #HKBoard.LtoR *    {
        direction: ltr;
        }
   
    #HKBoard.RtoL,
    #HKBoard.RtoL * {
        direction: rtl;
        }
   
    /****************** overview tables *******************/
   
    #HKBoard div.Table {
        margin-bottom: 2px;
        }
   
    #HKBoard table.Overview {
        width: 100% !important;
        margin-bottom: 3px;
        background-color: #F6EBBA;
        text-align: center;
        border-collapse: collapse;
        border: 2px solid #fff;
        box-shadow: 3px 3px 0 #AB9166;
        }
       
    #HKBoard table.Overview thead {
        background: #F8E7B3 url(skin/input/button.gif) repeat-x scroll 0 bottom;
        }
   
    #HKBoard table.Overview tfoot {
        background: #E7C680 url(skin/input/button.gif) repeat-x scroll 0 0;
        border-top: 2px solid #CB9B6A;
        }

    #HKBoard table.Overview tbody tr {
        border-top: 1px solid #ECCF8E;
        }
       
    #HKBoard table.Overview tr.odd {
        background-color: #FDF1D4;
        }
   
    #HKBoard table.Overview tr.current {
        background-color: #FAE3B8;
        }
       
    #HKBoard table.Overview tbody tr:hover {
        background-color: #fff;
        border:1px solid #CB9B6A;
        }
   
    #HKBoard table.Overview tfoot tr {
        border-top: 1px solid #CB9B6A;
        }
   
    #HKBoard table.Overview th,
    #HKBoard table.Overview td {
        border-left: 1px solid #ECCF8E;
        }
       
    #HKBoard.RtoL table.Overview th,
    #HKBoard.RtoL table.Overview td {
        border-left: inherit;
        border-right: 1px solid #ECCF8E;
        }
       
    #HKBoard table.Overview th {
        height: 22px;
        width: auto;
        padding: 1px;
        padding-bottom: 2px;
        padding-left: 3px;
        text-align: center !important;
        color: #542C0F;
        font-weight: bold;
        text-shadow:0 1px #FFFFFF;
        }
       
    #HKBoard table.Overview td {
        height: auto;
        line-height: 11px;
        font-size: 11px;
        min-width: 10px;
        padding: 1px;
        vertical-align: top;
        text-align: right;
        color: #542C0F;
        text-shadow:0 1px #FFFFFF;
        }
       
    #HKBoard table.Overview th.lf,
    #HKBoard table.Overview td.lf {
        border-left: 2px solid #CB9B6A;
        }
    #HKBoard.RtoL table.Overview th.lf,
    #HKBoard.RtoL table.Overview td.lf {
        border-left: inherit;
        border-right: 2px solid #CB9B6A;
        }
       
    #HKBoard table.Overview th.nolf,
    #HKBoard table.Overview td.nolf {
        border-left: none;
        }
    #HKBoard.RtoL table.Overview th.nolf,
    #HKBoard.RtoL table.Overview td.nolf {
        border-left: inherit;
        border-right: none;
        }
       
    #HKBoard table.Overview th.city_name,
    #HKBoard table.Overview td.city_name {
        overflow: hidden;
        }

    #HKBoard table.Overview th.actions,
    #HKBoard table.Overview td.actions,
    #HKBoard table.Overview th.lfdash,
    #HKBoard table.Overview td.lfdash {
        border-left: 1px dashed #ECCF8E;
        }
    #HKBoard.RtoL table.Overview th.actions,
    #HKBoard.RtoL table.Overview td.actions,
    #HKBoard.RtoL table.Overview th.lfdash,
    #HKBoard.RtoL table.Overview td.lfdash {
        border-left: inherit;
        border-right: 1px dashed #ECCF8E;
        }
       
    #HKBoard table.Overview th.city_name {
        width: 95px !important;
        max-width: 95px;
        }
    #HKBoard.RtoL table.Overview th.city_name {}
   
    #HKBoard table.Overview th.actions {
        width: 62px;
        max-width: 62px;
        padding-left: 2px;
        padding-bottom: 3px;
        text-align: right !important;
        vertical-align: bottom;
        }

    #HKBoard table.Buildings th.build_name0,
    #HKBoard table.Buildings th.build_name1,
    #HKBoard table.Buildings th.build_name2,
    #HKBoard table.Buildings th.build_name3,
    #HKBoard table.Buildings th.build_name4,
    #HKBoard table.Buildings th.build_name5,
    #HKBoard table.Buildings th.build_name6,
    #HKBoard table.Buildings th.build_name7,
    #HKBoard table.Buildings th.build_name8,
    #HKBoard table.Buildings th.build_name9,
    #HKBoard table.Buildings th.build_name10,
    #HKBoard table.Buildings th.build_name11,
    #HKBoard table.Buildings th.build_name12 { max-width: 25px; overflow: hidden; cursor: default;}
    #HKBoard table.Buildings th.build_name2 { max-width: 45px;}
    #HKBoard table.Buildings th.build_name3 { max-width: 65px;}
    #HKBoard table.Buildings th.build_name4 { max-width: 80px;}
    #HKBoard table.Buildings th.build_name5 { max-width: 95px;}
    #HKBoard table.Buildings th.build_name6 { max-width: 105px;}
    #HKBoard table.Buildings th.build_name7 { max-width: 115px;}
    #HKBoard table.Buildings th.build_name8 { max-width: 125px;}
    #HKBoard table.Buildings th.build_name9 { max-width: 135px;}
    #HKBoard table.Buildings th.build_name10 { max-width: 140px;}
    #HKBoard table.Buildings th.build_name11 { max-width: 145px;}
    #HKBoard table.Buildings th.build_name12 { max-width: 150px;}
   
    #HKBoard table.Army th.unit_name { min-width: 25px; max-width: 35px; overflow: hidden; cursor: default;}
   
    #HKBoard table.Army th.upkeep { min-width: 20px; overflow: hidden; cursor: default; }

    #HKBoard table.Overview tfoot td {
        font-weight: bold;
        }
   
    #HKBoard table.Buildings td {vertical-align: middle;}
   
    #HKBoard table.Overview td.city_name {
        width: 110px;
        max-width: 110px;
        padding-left: 3px;
        text-align: left;
        }
       
    #HKBoard.RtoL table.Overview td.city_name { text-align: right; }
   
    #HKBoard table.Overview td.actions {  text-align: right; line-height:12px; padding-right:3px;}
    #HKBoard.RtoL table.Overview td.actions { }

    #HKBoard table.Overview th.actions img,
    #HKBoard table.Overview td.actions img { margin-left: 1px; border: none; max-height: 15px;}
    #HKBoard table.Overview td.actions img.Action { height: 12px; margin-top: 1px; }

    #HKBoard.RtoL table.Overview td.sigma {
        text-align: left;
        }
       
    #HKBoard table.Overview .More {
        font-size: 10px;
        line-height: 10px !important;
        height: 10px !important;
        margin-top:-1px;
        clear: both;
        display: block;
        cursor: default;
        text-shadow: none;
        }
    #HKBoard table.Resources .MoreGoods { margin-top:0; }
    #HKBoard table.Overview tbody .More { color: #CB9B6A;}

    #HKBoard table.Buildings td.current {
        }
    #HKBoard table.Buildings td.current a {
        color: #542C0F;
        }

    /****************** progress bar styles *******************/
    #HKBoard table.Overview table.myPercent {
        height: auto !important;
        width: 92%;
        margin-top: 2px;
        margin-left: 2px;
        margin-right: 2px;
        background-color: !transparent !important;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.6);
        }
    #HKBoard table.Overview table.myPercent td {
        height: 4px !important;
        min-width: 0px !important;
        padding: 0px !important;
        background-color: #CB9B6A;
        border: 1px solid #FDF7DD;
        }
    #HKBoard table.Overview table.myPercent td.Normal { background-color: #73443E;}
    #HKBoard table.Overview table.myPercent td.Warning { background-color: #8F1D1A;}
    #HKBoard table.Overview table.myPercent td.AlmostFull { background-color: #B42521;}
    #HKBoard table.Overview table.myPercent td.Full { background-color: #ff0000;}
    /****************** alerts *******************/
    #HKBoard sup {
        vertical-align: top !important;
        font-size: 9px;
        line-height: 9px;
        margin-left: 1px;
        }
    #HKBoard .Bold,
    #HKBoard .Brown,
    #HKBoard .DarkRed,
    #HKBoard .Red {font-weight: bold;}
    #HKBoard .Green {  color: green !important;}
    #HKBoard .Brown {  color: #8F1D1A !important;}
    #HKBoard .DarkRed {  color: #CC3300 !important;}
    #HKBoard .Red {  color: red !important;}
    #HKBoard img.Safe { height: 11px; }
    #HKBoard table.Overview td img.Safe {float: left; margin-left: 1px; margin-right: 1px;}

    /****************** footer *******************/

    #HKBoard p {text-align: left; display: block;  }
    #HKBoard.RtoL p {text-align: right;}
    #HKBoard p.Caption { font-size: 9px; margin: 0 2px;}

    #HKBoardSettings {}
    #HKBoardSettings td {border: none !important;}
    #HKBoardSettings input.button {margin-right: 5px;}
   
    #HKBoard #HKBoardAddons { float: left; text-align: left;}
    #HKBoard.RtoL #HKBoardAddons { text-align: right;}
    #HKBoardAddons u { font-weight: bold; }
    #HKBoardAddons li { list-style-type: disc; list-style-position: inside; padding-left: 15px; }

    #HKBoard p.Footer {text-align: right; clear: both;}
    #HKBoard.RtoL p.Footer {text-align: left;}
    #HKBoard p.Footer .button {}

    /****************** tooltip *******************/
    #HKBoardTooltip {
        position:absolute;
        z-index: 2000;
        box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
        }

    .TTContent {
        padding: 3px;
        color: #542C0F;
        background-color: #FDF7DD;
        border: 1px solid #BE8D53;
        border-top-width: 4px;
        text-align:left;
        }
    .RtoL .TTContent { text-align: right; }
    .TTTitle {
        font-weight: bold;
        background-color: #FAE0AE;
        padding: 3px;
        margin: -3px;
        margin-bottom:4px;
        text-align:left;
        }
    .RtoL .TTTitle { text-align: right; }
   
    .TTContent table tbody {background-color: #FAEAC6; border-bottom-width: 3px; border-bottom-color: #FDF7DD;border-bottom-style: solid;}
    .TTContent table tfoot {background-color: #FAE0AE;}
    .TTContent table td {padding: 2px; height: auto !important;}
    .TTContent table .Small td {
        padding-top: 0px;
        font-size: 10px !important;
        line-height: 10px !important;
        }
    .TTContent table td.Mission img { max-height: 15px;}
    ]]></>.toXMLString();
   
    GM_addStyle(default_style);
};

HKBoard.Renders.Draw = function(){
    this.SetCommonStyles();
    $('<div id="HKBoard" dir="ltr" class="LtoR"></div>').appendTo('body');
   
    $('<div class="Table" id="HKBoardBuildings"></div><BR>').appendTo($('#HKBoard'));
    var buildingStr='<table id="HKBoardBuildingsTable" class="Overview Buildings"><thead><tr><th nowrap="" class="nolf city_name">城镇</th>'
                    +'<th nowrap="" class="actions"><a title="View research library" href="#" cityid="" view="researchOverview"><img align="absmiddle" src="skin/buildings/x40_y40/academy.gif"></a><a title="View research advisor" href="?view=researchAdvisor" view="researchAdvisor"><img align="absmiddle" src="skin/resources/icon_scientist.gif"></a>&nbsp;</th>'
                    +'<th nowrap="" class="lf build_name build_name1 townHall" building="townHall">市府</th>'
                    +'<th nowrap="" class=" build_name build_name1 palace" building="palace">皇宫</th>'
                    +'<th nowrap="" class=" build_name build_name1 palaceColony" building="palaceColony">总督</th>'
                    +'<th nowrap="" class=" build_name build_name1 tavern" building="tavern">酒馆</th>'
                    +'<th nowrap="" class=" build_name build_name1 museum" building="museum">博物</th>'
                    +'<th nowrap="" class="lf build_name build_name1 academy" building="academy">学院</th>'
                    +'<th nowrap="" class="lf build_name build_name1 embassy" building="embassy">使馆</th>'
                    +'<th nowrap="" class="lf build_name build_name1 warehouse" building="warehouse">仓库</th>'
                    +'<th nowrap="" class=" build_name build_name1 dump" building="dump">货栈</th>'
                    +'<th nowrap="" class=" build_name build_name1 port" building="port">港口</th>'
                    +'<th nowrap="" class="lf build_name build_name1 wall" building="wall">城墙</th>'
                    +'<th nowrap="" class=" build_name build_name1 barracks" building="barracks">兵营</th>'
                    +'<th nowrap="" class=" build_name build_name1 shipyard" building="shipyard">船坞</th>'
                    +'<th nowrap="" class="lf build_name build_name1 forester" building="forester">木＋</th>'
                    +'<th nowrap="" class=" build_name build_name1 carpentering" building="carpentering">木－</th>'
                    +'<th nowrap="" class="lf build_name build_name1 winegrower" building="winegrower">葡＋</th>'
                    +'<th nowrap="" class=" build_name build_name1 vineyard" building="vineyard">葡－</th>'
                    +'<th nowrap="" class="lf build_name build_name1 stonemason" building="stonemason">石＋</th>'
                    +'<th nowrap="" class=" build_name build_name1 architect" building="architect">石－</th>'
                    +'<th nowrap="" class=" build_name build_name1 fireworker" building="fireworker">烟火</th>'
                    +'</tr></thead><tbody id="HKBoardBuildingsContent"></tbody>';
    $(buildingStr).appendTo($('#HKBoardBuildings'));
    $('<div class="Table" id="HKBoardResources"></div><BR>').appendTo($('#HKBoard'));
    var resourceStr='<table id="HKBoardResourcesTable" class="Overview Resources"><thead><tr><th nowrap="" class="nolf city_name">城镇</th>'
                    +'<th nowrap="" class="actions"><a title="View merchant navy" view="merchantNavy" href="?view=merchantNavy"><img align="absmiddle" src="skin/img/city/building_port.gif"></a><a title="View finances" view="finances" href="?view=finances"><img align="absmiddle" src="skin/img/city/building_townhall.gif"></a><a title="View premium features" view="premium" href="?view=premium"><img align="absmiddle" src="skin/premium/ambrosia_icon.gif"></a></th>'
                    +'<th nowrap="" class="lf population" colspan="2">人口(闲人/采木/采奢/研究/神棍)</th>'
                    +'<th nowrap="" class="growth" colspan="1">成長率</th>'
                    +'<th nowrap="" class="lf incomes" colspan="1">收入</th>'
                    +'<th class="lf wood" colspan="2">木材</th>'
                    +'<th class="lf wine" colspan="2">葡萄</th>'
                    +'<th class="lf marble" colspan="2">大理石</th>'
                    +'<th class="lf crystal" colspan="2">水晶</th>'
                    +'<th class="lf sulfur" colspan="2">硫磺</th>'
                    +'</tr></thead><tbody id="HKBoardResourcesContent"></tbody>';
    $(resourceStr).appendTo($('#HKBoardResources'));
    $('<div class="Table" id="HKBoardArmy"></div>').appendTo($('#HKBoard'));
    var armyStr='<table id="HKBoardArmyTable" class="Overview Army"><thead><tr><th nowrap="" class="nolf city_name">城鎮</th>'
                    +'<th nowrap="" class="actions">&nbsp;<a title="View combat reports" href="?view=militaryAdvisorCombatReports" view="militaryAdvisorCombatReports"><img align="absmiddle" src="skin/layout/medallie32x32_gold.gif"></a>&nbsp;<a title="View military advisor" href="?view=militaryAdvisorMilitaryMovements" view="militaryAdvisorMilitaryMovements"><img align="absmiddle" src="skin/relatedCities/general.gif"></a>&nbsp;</th>'
                    
                    $(HKBoard.DB._ArmyType).each(function(n,army){
                        armyStr=armyStr+'<th nowrap="" class="lf unit_name '+army.name+'" unit="'+army.name+'">'+army.label+'</th>';
                    });
                    
                    $(HKBoard.DB._ShipType).each(function(n,ship){
                        armyStr=armyStr+'<th nowrap="" class="lf unit_name '+ship.name+'" unit="'+ship.name+'">'+ship.label+'</th>';
                    });

                    armyStr=armyStr+'</tr></thead><tbody id="HKBoardArmyContent"></tbody>';
    $(armyStr).appendTo($('#HKBoardArmy'));
    this.DrawData();
    this.DrawLV();
};
HKBoard.Renders.DrawLV = function(){
    if('city' == $('body').attr('id')){
        var n=$("li[id*='position']").length;
        for(var i=0;i<n;i++){
            var li =$("#position"+i);
            var div =$("#position"+i+" div:first-child");
            if('flag'!=div.attr("class") &&null!=div.attr("class")){
                $(div).attr("style","font-weight: bold; color: white");
                $('<div style="position: absolute; z-index: 501; padding-top: 5px; height: 19px; width: 24px; text-align: center; top: '+this._Positions[li.attr('class')][0]["y"]+'px; right: '+this._Positions[li.attr('class')][0]["x"]+'px; background-image: url('+this._ImgWait+');" id="postionlv'+i+'">'+ this._Parent.Util.ToInteger($("#position"+i+" a").text(),0) +'</div>').appendTo(div);
            }
        };

    }
}
HKBoard.Renders.DrawData = function(){
    var _self=this;
    this.DrawBuildingData();
    this.DrawResourceData();
    this.DrawArmyData();
    window.setInterval(this.DrawBuildingData,"5000");
    window.setInterval(this.DrawResourceData,"5000");
    window.setInterval(this.DrawArmyData,"5000");
};
HKBoard.Renders.DrawBuildingData = function(){
    $("#HKBoardBuildingsTable tr:not(:first)").remove();
    if(typeof(_self) == "undefined"){
        _self=this;
    };    
    
    var buildingStr="";
    function updateStr(lv,time){
        if(time!="-"){
            return '<a href="#" class="changeCity Green Bold" cityid="">'+lv+"»"+(parseInt(lv)+1)+'</a>';
        }else{
            return lv==""?"-":lv;
        }
    }
    $(HKBoard.CityNVs).each(function(n,nv) {
        var buildingVO=_self._Parent.DB.GetData(nv.value+"Building",null);
        if(buildingVO!=null){
            buildingStr=buildingStr+'<tr><td nowrap="" class="nolf city_name">'+buildingVO.cityName+'</td>'
                            +'<td nowrap="" class="actions"><a title="View research library" href="#" cityid="" view="researchOverview"><img align="absmiddle" src="skin/buildings/x40_y40/academy.gif"></a><a title="View research advisor" href="?view=researchAdvisor" view="researchAdvisor"><img align="absmiddle" src="skin/resources/icon_scientist.gif"></a>&nbsp;</td>'
                            +'<td nowrap="" class="lf townHall" building="townHall">'+updateStr(buildingVO.townHalllv,buildingVO.townHalltime)+'</td>'
                            +'<td nowrap="" class="palace" building="palace">'+updateStr(buildingVO.palacelv,buildingVO.palacetime)+'</td>'
                            +'<td nowrap="" class=" palaceColony" building="palaceColony">'+updateStr(buildingVO.palaceColonylv,buildingVO.palaceColonytime)+'</td>'
                            +'<td nowrap="" class=" tavern" building="tavern">'+updateStr(buildingVO.tavernlv,buildingVO.taverntime)+'</td>'
                            +'<td nowrap="" class=" museum" building="museum">'+updateStr(buildingVO.museumlv,buildingVO.museumtime)+'</td>'
                            +'<td nowrap="" class="academy" building="academy">'+updateStr(buildingVO.academylv,buildingVO.academytime)+'</td>'
                            +'<td nowrap="" class="embassy" building="embassy">'+updateStr(buildingVO.embassylv,buildingVO.embassytime)+'</td>'
                            +'<td nowrap="" class="warehouse" building="warehouse">'+updateStr(buildingVO.warehouselv,buildingVO.warehousetime)+'</td>'
                            +'<td nowrap="" class="dump" building="dump">'+updateStr(buildingVO.dumplv,buildingVO.dumptime)+'</td>'
                            +'<td nowrap="" class=" port" building="port">'+updateStr(buildingVO.portlv,buildingVO.porttime)+'</td>'
                            +'<td nowrap="" class="wall" building="wall">'+updateStr(buildingVO.walllv,buildingVO.walltime)+'</td>'
                            +'<td nowrap="" class=" barracks" building="barracks">'+updateStr(buildingVO.barrackslv,buildingVO.barrackstime)+'</td>'
                            +'<td nowrap="" class=" shipyard" building="shipyard">'+updateStr(buildingVO.shipyardlv,buildingVO.shipyardtime)+'</td>'                    
                            +'<td nowrap="" class=" forester" building="forester">'+updateStr(buildingVO.foresterlv,buildingVO.forestertime)+'</td>'
                            +'<td nowrap="" class=" carpentering" building="carpentering">'+updateStr(buildingVO.carpenteringlv,buildingVO.carpenteringtime)+'</td>'
                            +'<td nowrap="" class=" winegrower" building="winegrower">'+updateStr(buildingVO.winegrowerlv,buildingVO.winegrowertime)+'</td>'
                            +'<td nowrap="" class=" vineyard" building="vineyard">'+updateStr(buildingVO.vineyardlv,buildingVO.vineyardtime)+'</td>'
                            +'<td nowrap="" class=" stonemason" building="stonemason">'+updateStr(buildingVO.stonemasonlv,buildingVO.stonemasontime)+'</td>'
                            +'<td nowrap="" class=" architect" building="architect">'+updateStr(buildingVO.architectlv,buildingVO.architecttime)+'</td>'
                            +'<td nowrap="" class=" fireworker" building="fireworker">'+updateStr(buildingVO.fireworkerlv,buildingVO.fireworkertime)+'</td>'

                            +'</tr>';
        };
    });
    
    $(buildingStr).appendTo($('#HKBoardBuildingsContent'));
};

HKBoard.Renders.DrawResourceData = function(){
    $("#HKBoardResourcesTable tr:not(:first)").remove();
    if(typeof(_self) == "undefined"){
        _self=this;
    };    
    
    var resourceStr="";
    
    //v2 safe number
    function isSafe(v1,v2){
        if(v1>v2){
            return "";
        }else{
            return '<img title="Safety resources" class="Safe" src="skin/layout/icon-wall.gif">';
        }
    }
    
    function getPerc1(v1,v2){
        return Math.min(100, Math.round(v1 / v2 * 100.0));
    }
    
    function getPerc2(v1,v2){
        return 100-Math.min(100, Math.round(v1 / v2 * 100.0));
    }


    $(HKBoard.CityNVs).each(function(n,nv) {

        var cityVO=_self._Parent.DB.GetData(nv.value+"City",null);
        var townHallVO=_self._Parent.DB.GetData(nv.value+"TownHall",null);
        if(cityVO!=null&&townHallVO!=null){
            resourceStr=resourceStr+'<tr><td nowrap="" class="nolf city_name">'+cityVO.cityName+'</td>'
                            +'<td nowrap="" class="actions"> <a title="View world map" href="#"><img align="absmiddle" src="skin/layout/icon-world.gif"></a><a title="View island" href="#"><img align="absmiddle" src="skin/layout/icon-island.gif"></a><a title="View island agora" href="#" class=""><img align="absmiddle" hspace="3" height="12" src="skin/board/schriftrolle_offen2.gif"></a><br><a title="View island saw mill" href="#" cityid="" class="changeCity"><img align="absmiddle" height="12" src="skin/resources/icon_wood.gif"></a>&nbsp;<a title="View island vineyard" href="#"cityid="" class="changeCity"><img align="absmiddle" height="12" src="skin/resources/icon_wine.gif"></a>&nbsp;<img align="absmiddle" src="skin/actions/transport_disabled.gif" class="Action"></td>'
                            +'<td class="lf"><span title="Citizens">'+townHallVO.inhabitants+'</span></td>'
                            +'<td title="" class="nolf">'+townHallVO.citizens+"/"+townHallVO.woodworkers+"/"+townHallVO.specialworkers+"/"+townHallVO.scientists+"/"+townHallVO.priests+'</td>'
                            +'<td class=""><img align="left" vspace="0" hspace="2" height="18" title="Total satisfaction: " src="skin/smilies/'+townHallVO.happiness+'_x25.gif">+'+townHallVO.populationGrowthValue+'</td>'
                            +'<td class="lf">'+townHallVO.incomeGoldValue+'</td>'
                            +'<td resource="wood" class="lf">'+isSafe(cityVO.wood,cityVO.safe)+cityVO.wood+'<font class="More">-&nbsp;</font><table tooltip="" class="myPercent"><tbody><tr><td width="'+getPerc1(cityVO.wood,cityVO.total)+'%" class="Normal"></td><td width="'+getPerc2(cityVO.wood,cityVO.total)+'%"></td></tr></tbody></table></td>'
                            +'<td class="lfdash"><span tooltip="">+'+cityVO.woodgrow+'</span></td>'
                            +'<td resource="wine" class="lf"><span tooltip="">'+isSafe(cityVO.wine,cityVO.safe)+cityVO.wine+'</span><font class="More">-&nbsp;</font><table tooltip="" class="myPercent"><tbody><tr><td width="'+getPerc1(cityVO.wine,cityVO.total)+'%" class="Normal"></td><td width="'+getPerc2(cityVO.wine,cityVO.total)+'%"></td></tr></tbody></table></td>'
                            +'<td class="lfdash"><span tooltip="">+'+cityVO.winegrow+'</span></td>'
                            +'<td resource="marble" class="lf">'+isSafe(cityVO.marble,cityVO.safe)+cityVO.marble+'<font class="More">-&nbsp;</font><table tooltip="" class="myPercent"><tbody><tr><td width="'+getPerc1(cityVO.marble,cityVO.total)+'%" class="Normal"></td><td width="'+getPerc2(cityVO.marble,cityVO.total)+'%"></td></tr></tbody></table></td>'
                            +'<td class="lfdash"><span tooltip="">+'+cityVO.marblegrow+'</span></td>'
                            +'<td resource="glass" class="lf">'+isSafe(cityVO.crystal,cityVO.safe)+cityVO.crystal+'<font class="More">-&nbsp;</font><table tooltip="" class="myPercent"><tbody><tr><td width="'+getPerc1(cityVO.crystal,cityVO.total)+'%" class="Normal"></td><td width="'+getPerc2(cityVO.crystal,cityVO.total)+'%"></td></tr></tbody></table></td>'
                            +'<td class="lfdash"><span tooltip="">+'+cityVO.crystalgrow+'</span></td>'
                            +'<td resource="sulfur" class="lf">'+isSafe(cityVO.sulfur,cityVO.safe)+cityVO.sulfur+'<font class="More">-&nbsp;</font><table tooltip="EmpireBoard10" class="myPercent"><tbody><tr><td width="'+getPerc1(cityVO.sulfur,cityVO.total)+'%" class="Normal"></td><td width="'+getPerc2(cityVO.sulfur,cityVO.total)+'%"></td></tr></tbody></table></td>'
                            +'<td class="lfdash"><span tooltip="">+'+cityVO.sulfurgrow+'</span></td>'
                            +'</tr>';
                    
        };
    });
    
    $(resourceStr).appendTo($('#HKBoardResourcesContent'));
};

HKBoard.Renders.DrawArmyData = function(){
    $("#HKBoardArmyTable tr:not(:first)").remove();
    if(typeof(_self) == "undefined"){
        _self=this;
    };    
    
    var armyStr="";
    
    $(HKBoard.CityNVs).each(function(n,nv) {
        var barVO=_self._Parent.DB.GetData(nv.value+"Bar",null);
        var shipVO=_self._Parent.DB.GetData(nv.value+"Ship",null);

        if(barVO!=null&&shipVO!=null){
            armyStr=armyStr+'<tr coord="" islandid="" cityid="" class=" "><td nowrap="" class="nolf city_name"><a onclick="" title="Change current city" href="">'+barVO.cityName+'</a><sup title="Available action points" class="Green"></sup><font class="More"></font><font class="More Red"></font></td>'
            +'<td nowrap="" class="actions"><a title="View army overview" cityid="" class="changeCity" href="?view=cityMilitary-army&amp;id=99529"><img align="absmiddle" src="skin/img/city/building_barracks.gif"></a>&nbsp;<a title="Deploy troops" href="?view=deployment&amp;deploymentType=army&amp;destinationCityId=99529" deploymenttype="army" view="deployment"><img align="absmiddle" src="skin/actions/move_army.gif" class="Action"></a><br><a title="View fleet overview" cityid="99529" class="changeCity" href="?view=cityMilitary-fleet&amp;id=99529"><img align="absmiddle" src="skin/img/city/building_shipyard.gif"></a>&nbsp;<a title="Station fleets" href="?view=deployment&amp;deploymentType=fleet&amp;destinationCityId=99529" deploymenttype="fleet" view="deployment"><img align="absmiddle" src="skin/actions/move_fleet.gif" class="Action"></a></td>';
            
            var str1="";
            $(_self._Parent.DB._ArmyType).each(function(n,army) {
                str1=str1+'<td nowrap="" class="lf unit_name '+army.name+'" unit="'+army.name+'">'+barVO[army.id]+'</td>';
            });
            armyStr=armyStr+str1;
            
            var str2="";
            $(_self._Parent.DB._ShipType).each(function(n,ship) {
                str2=str2+'<td nowrap="" class="lf unit_name '+ship.name+'" unit="'+ship.name+'">'+shipVO[ship.id]+'</td>';
            });
            armyStr=armyStr+str2;
            
            armyStr=armyStr+'</tr>';
        }
        
        
     });
    $(armyStr).appendTo($('#HKBoardArmyContent'));
}

/*Core MODULE*/
HKBoard.Core ={
    _Parent: null,
};

HKBoard.Core.Init = function(parent){
    this._Parent = parent;
};

HKBoard.Core.GetToken = function(){
    if(this._Parent.Token ==""){
        this._Parent.Token=$("input[name='actionRequest']").val();
    }
    return this._Parent.Token;
};

/*Util Module*/
HKBoard.Util.Init = function(parent){
    this._Parent = parent;
};

HKBoard.Util.Trim = function(str){
    if (str != undefined){
        str = str.replace(/&nbsp;/gi, " ");
        str = str.replace(/\t/gi, " ");
        str = str.replace(/\v/gi, "");
        str = str.replace(/\f/gi, "");
        str = str.replace(/\n/gi, "");
        str = str.replace(/\r/gi, "");
        //str = str.replace(/\e/gi, "");
        str = str.replace(/\s/gi, " ");
       
        while(str.charAt(0) == (" ")){
            str = str.substring(1);
        }
        while(str.charAt(str.length-1) == " " ){
            str = str.substring(0,str.length-1);
        }
    }
    return str;
};

HKBoard.Util.TrimDoubleQuotes = function(str){
    str = str.replace(/["]{1}/gi, "");
    return str;
};

HKBoard.Util.TrimBrackets = function(str){
    str = str.replace(/\(.+\)/gi, "");
   
    return str;
};
   
HKBoard.Util.TrimAccodances = function(str){
    str = str.replace(/\[.+\]/gi, "");
   
    return str;
};

HKBoard.Util.TwoDigit = function(val){
    val = parseInt(val);
    if (val == 0){
        val = "00";
    }else if (val < 10){
        return "0"+val;
    }
    return val;
};

HKBoard.Util.ToInteger = function(str, defaultValue){
    // Support signed integers
    var temp = ""+str;
    temp = temp.replace(/[^-0-9]+/g, "");
    temp = parseInt(temp,10);
    if (((temp == undefined) || (""+temp == "NaN")) && (defaultValue != undefined)){
        return defaultValue;
    }
    return temp;
};

// decimalPoint = '.' or ','
HKBoard.Util.ToFloat = function(str, defaultValue, decimalPoint){
    if (decimalPoint == undefined) decimalPoint = this._decimalPoint;
    // Support signed integers
    var temp = ""+str;
    if (decimalPoint == '.'){
        temp = temp.replace(/[^-0-9\.]+/g, "");
    }else if (decimalPoint == ','){
        temp = temp.replace(/[^-0-9\,]+/g, "");
    }else{
        temp = temp.replace(/[^-0-9]+/g, "");
    }
    temp = Number(temp);
    if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN"))){
        return defaultValue;
    }
    return temp;
};



//Running
$(document).ready(function(){
	HKBoard.Init();
	HKBoard.Start();
});