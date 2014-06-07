// ==UserScript==
// @name           Tiberium Alliances Management
// @namespace	   TAManagement
// @description    Alliance Management, shows importance of Pois and Location of players
// @version        0.7
// @author         Pyrania
// @include	   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @copyright	   2012+, Pyrania
// @require http://sizzlemctwizzle.com/updater.php?id=138792
// ==/UserScript==
(function() {
    var TAManagement_script = function() {
	TAManagement = {}
	TAManagement.Convenience = {
	    _paintNumber:function(number){
		var addon = '';
		if(number >= 100000){
		    var addon = 'K';
		    number = Math.round(number /1000);
		}
		if(number > 100000){
		    var addon = 'M';
		    number = Math.round(number /1000);
		}
		return number+addon;
	    },
            _getDistanceSquare:function(obj,obj2){
		var x = (obj.x-obj2.x)*(obj.x-obj2.x);
		var y = (obj.y-obj2.y)*(obj.y-obj2.y);
		return x+y;
	    },
	    _getMyCities:function(){
		return ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d;
	    },
	    _getObjectAtLocation:function(x,y){
		ClientLib.Data.MainData.GetInstance().get_World().GetObjectFromPosition(x,y);
	    }
	}
	TAManagement.POIInfo = {
	    init:function(data){
		try{
		    this.onCitiesChange = webfrontend.gui.region.RegionPointOfInterestStatusInfo.prototype.onCitiesChange;
		    webfrontend.gui.region.RegionPointOfInterestStatusInfo.getInstance().onCitiesChange= function () {
			var lvl = this.__QE.get_Level();
			var type = this.__QE.get_Type();
			var aid = this.__QE.get_OwnerAllianceId();
			TAManagement.POIInfo.onCitiesChange.call(this);
			TAManagement.POIInfo.setPoiInfo(lvl,type,aid);
		    }
		    console.log('TAM_POIInfo loaded');
		}catch(e){
		    console.log(e);
		}
	    
	    },
	    setPoiInfo:function(lvl,type,aid){
		type = type +1;
		var poiInfo = webfrontend.gui.region.RegionPointOfInterestStatusInfo.getInstance().getChildren()[0];
		var alliancePois = this._getAlliancePOIs();
		var score = this._getScoreFromPoi(lvl);
		var allianceboni = this._getScoreBoni(alliancePois[type],type);//alliance Bonus
        
		if(aid == ClientLib.Data.MainData.GetInstance().get_Alliance().get_Id()){
		    var within = this._getScoreBoni(alliancePois[type]-score,type);//without that Poi
		    var dif = allianceboni.c-within.c
		}else{
		    var within = this._getScoreBoni(alliancePois[type]+score,type);//within that Poi
		    var dif = within.c-allianceboni.c
		}
        
		var addon = '/h';
		if( type > 4 ){
		    addon = '%';
		}
		if(this._info){
		    poiInfo.remove(this._info);
		}        
		if(allianceboni.c != within.c){
		    this._info = new qx.ui.basic.Label("needed! for +"+TAManagement.Convenience._paintNumber(dif)+addon);
		    this._info.setTextColor('#ff8888');
		}else{
		    this._info = new qx.ui.basic.Label("niceToHave: "+Math.round(score/allianceboni.s*100)+"% next Lvl in: " +TAManagement.Convenience._paintNumber(allianceboni.n));
		    this._info.setTextColor('#cccccc');
		}
		poiInfo.add(this._info);
	    },
	    _getAlliancePOIs:function(){
		var Pois = ClientLib.Data.MainData.GetInstance().get_Alliance().get_OwnedPOIs();
		var data = {}
		for(var x in Pois){
		    data[Pois[x].t] = data[Pois[x].t] || 0;
		    data[Pois[x].t] += this._getScoreFromPoi(Pois[x].l);
		}
		return data;
	    },
	    _getPOIType:function(type){
		var types = {
		    2:'Tiberium',
		    3:'Crystal',
		    4:'Power',
		    5:'Infantry',
		    6:'Vehiclies',
		    7:'Aircraft',
		    8:'Defense'
		}
		return types[type];
	    },
	    _getScoreBoni:function(score,type){
		if(type <= 4){
		    type = 'a';
		}else{
		    type = 'b';
		}
		var boni = {
		    1:{
			a:1200,
			b:5
		    },
		    4:{
			a:2000,
			b:10
		    },
		    9:{
			a:3000,
			b:14
		    },
		    16:{
			a:4000,
			b:17
		    },
		    27:{
			a:5500,
			b:20
		    },
		    50:{
			a:7000,
			b:23
		    },
		    90:{
			a:8500,
			b:26
		    },
		    160:{
			a:10000,
			b:29
		    },
		    260:{
			a:12000,
			b:32
		    },
		    420:{
			a:15000,
			b:35
		    },
		    750:{
			a:18000,
			b:38
		    },
		    1300:{
			a:22000,
			b:41
		    },
		    2200:{
			a:26000,
			b:44
		    },
		    3600:{
			a:30000,
			b:47
		    },
		    5700:{
			a:36000,
			b:50
		    },
		    9700:{
			a:45000,
			b:53
		    },
		    16400:{
			a:60000,
			b:56
		    },
		    28000:{
			a:80000,
			b:58
		    },
		    44000:{
			a:105000,
			b:60
		    },
		    68000:{
			a:135000,
			b:62
		    },
		    115000:{
			a:170000,
			b:64
		    },
		    190000:{
			a:215000,
			b:66
		    },
		    330000:{
			a:270000,
			b:68
		    },
		    510000:{
			a:330000,
			b:70
		    },
		    800000:{
			a:400000,
			b:72
		    },
		    1350000:{
			a:480000,
			b:74
		    },
		    2200000:{
			a:580000,
			b:76
		    },
		    3600000:{
			a:700000,
			b:78
		    },
		    6000000:{
			a:830000,
			b:80
		    },
		    9000000:{
			a:1000000,
			b:82
		    },
		    15000000:{
			a:1200000,
			b:84
		    },
		    25000000:{
			a:1450000,
			b:86
		    },
		    42000000:{
			a:1770000,
			b:88
		    }
		}
		var data = {
		    c:0
		};
		var y = 0;
		for(var x in boni){
		    if(x>score){
			data.s = x-y;
			data.n =  x-score
			break;
		    }
		    y = x
		    data.c = boni[x][type];
		}
		return data;
	    },
	    _getScoreFromPoi:function(level){
		var score = {
                    12:1,
		    13:3,
		    14:6,
		    15:10,
		    16:15,
		    17:25,
		    18:40,
		    19:65,
		    20:100,
		    21:150,
		    22:250,
		    23:400,
		    24:650,
		    25:1000,
		    26:1500,
		    27:2500,
		    28:4000,
		    29:6500,
		    30:10000,
		    31:15000,
		    32:25000,
		    33:40000,
		    34:65000,
		    35:100000,
		    36:150000,
		    37:250000,
		    38:400000,
		    39:650000,
		    40:1000000,
		    41:1500000,
		    42:2500000,
		    43:4000000,
		    44:6500000,
		    45:10000000
		}
		return score[level];
	    }
	}
	TAManagement.PlayerInfo = {
	    _error:false,
	    _success:false,
	    _page:null,
	    _playerInfoWindow:null,
	    _playerId:null,
	    _bases:null,
	    _canvas:null,
	    _showRadius:true,
	    _showOwnBase:true,
	    _showHoldingPois:true,
	    _showBase:true,
	    _showAllyBase:false,
	    _map:null,
	    _baseColor:'#00ccff',
	    _settingColumn:null,
	    _backgroundImg:null,
	    _info:null,
	    init:function(){
		try{
		    //there is always only one playerinfo window at a time..why ever it's singelton
		    var pIWindow = webfrontend.gui.info.PlayerInfoWindow.getInstance();
		    var proto = webfrontend.gui.info.PlayerInfoWindow.prototype;
		    proto.onPlayerInfo2 = proto._onPlayerInfo;
		    pIWindow._onPlayerInfo = function(a,b){
			this.onPlayerInfo2(a,b);
			TAManagement.PlayerInfo.set(b.i,b.c);
		    }
		    this._page = new qx.ui.tabview.Page("Location");
		    this._page.setLayout(new qx.ui.layout.Grid());
		    this._page.setHeight(400);
		    this._page.setPadding(10);
		    pIWindow.getChildren()[0].add(this._page);
		    var wdgt = new qx.ui.core.Widget();
		    wdgt.setMinHeight(300);
		    wdgt.setMinWidth(300);
		    wdgt.setHeight(300);
		    wdgt.setWidth(300);
		    this._page.add(wdgt,{
			column:0,
			row:0
		    });
		    this._mapWidget = new qx.html.Element("canvas", null, {
			id : "map",
			width : 300,
			height : 300
		    });
		    this._mapWidget.addListener("appear", function() {//fuck this framework
			if(!this._canvas){
			    var canvas = this._mapWidget.getDomElement();
			    this._canvas = canvas;
			}
			this.paintMap();
			this.paintSetting();
		    },this);
		    wdgt.getContentElement().add(this._mapWidget);
		    this._settingColumn = new qx.ui.container.Composite();
		    this._settingColumn.set({
			width : 300
		    });
		    this._settingColumn.setPadding(10);
		    var layout = new qx.ui.layout.Grid();
		    this._settingColumn.setLayout(layout);            
		    this._page.add(this._settingColumn,{
			column:1,
			row:0
		    });
            
		    this._backgroundImg = new Image(); 
		    this._backgroundImg.src = 'http://verplanmich.dnsalias.net/TA/radar.png';  
            
		    console.log('TAM_PlayerInfo loaded');
		}catch(e){
		    console.log(e);
		}
	    },
	    set:function(playerId,bases){
		this._playerId = playerId;
		this._bases = bases;
	    },
	    paintMap:function(){
		try{
		    this._clearMap();
		    if(this._showBase){
			for(var x in this._bases){
			    this._paintBase(this._bases[x]);
			}
		    }
		    if(this._showOwnBase){
			var myCities = TAManagement.Convenience._getMyCities();
			for(var x in myCities){
			    var base = {
				x: myCities[x].get_PosX(),
				y: myCities[x].get_PosY(),
				color:this._baseColor
			    }
			    this._paintBase(base);
			}  
		    }
		    if(this._showHoldingPois){
			var pois = this._getHoldingPOIs();//Todo buffer
			for(var x in pois){
			    this._paintPoi(pois[x]);
			}
		    }
            
		}catch(e){
		    console.log(e);
		}
	    },
	    paintSetting:function(){
		try{
		    this._settingColumn.removeAll();
		    var row = 0;
		    row = this._paintSetBases(row);
		    row = this._paintSetRadius(row);
		    row = this._paintSetOwn(row);
		    row = this._paintHoldingPois(row);
		}catch(e){
		    console.log(e);
		}
	    },
	    _paintSetRadius:function(row){        
		this._enableRadiusCBx = new qx.ui.form.CheckBox('enable Radius');
		this._enableRadiusCBx.setValue(this._showRadius);
		this._settingColumn.add(this._enableRadiusCBx,{
		    row:row,
		    column:0
		});
		this._enableRadiusCBx.addListener("click",function(){
		    this._showRadius = this._enableRadiusCBx.getValue();
		    this.paintMap();
		},this)
		row++;
        
		return row;
	    },
	    _paintSetBases:function(row){        
		this._showBaseCBx = new qx.ui.form.CheckBox('show Bases');  
		this._showBaseCBx.setValue(this._showBase);
		this._settingColumn.add(this._showBaseCBx,{
		    row:row,
		    column:0
		});
		this._showBaseCBx.addListener("click",function(){
		    this._showBase = this._showBaseCBx.getValue();
		    this.paintMap();
		},this)
		row++;
        
		return row;
	    },
    
	    _paintSetOwn:function(row){        
		this._showOwnCBx = new qx.ui.form.CheckBox('show my Bases');  
		this._showOwnCBx.setValue(this._showOwnBase);
		this._settingColumn.add(this._showOwnCBx,{
		    row:row,
		    column:0
		});
		this._showOwnCBx.addListener("click",function(){
		    this._showOwnBase = this._showOwnCBx.getValue();
		    this.paintMap();
		},this)
		row++;
        
		return row;
	    },
	    _paintSetAlliance:function(row){        
		this._showAllyCBx = new qx.ui.form.CheckBox('show Alliance');  
		this._showAllyCBx.setValue(this._showAllyBase);
		this._settingColumn.add(this._showAllyCBx,{
		    row:row,
		    column:0
		});
		this._showAllyCBx.addListener("click",function(){
		    this._showAllyBase = this._showAllyCBx.getValue();
		    this.paintMap();
		},this)
		row++;
        
		return row;
	    },
	    _paintHoldingPois:function(row){
		this._showHPoisCBx = new qx.ui.form.CheckBox('show Pois');  
		this._showHPoisCBx.setValue(this._showHoldingPois);
		this._settingColumn.add(this._showHPoisCBx,{
		    row:row,
		    column:0
		});
		this._showHPoisCBx.addListener("click",function(){
		    this._showHoldingPois = this._showHPoisCBx.getValue();
		    this.paintMap();
		},this);
		var pois = this._getHoldingPOIs();//Todo buffer
		var score = 0
		for(var x in pois){
		    score += TAManagement.POIInfo._getScoreFromPoi(pois[x].l);
		}
		var lbl =  new qx.ui.basic.Label('POI Score: '+TAManagement.Convenience._paintNumber(score));
		lbl.setTextColor('#333333');
		this._settingColumn.add(lbl,{
		    row:row,
		    column:1
		});
		var alliancePois = TAManagement.POIInfo._getAlliancePOIs();
		for(var x in pois){
		    row++;
		    var score = TAManagement.POIInfo._getScoreFromPoi(pois[x].l);
		    var lbl =  new qx.ui.basic.Label(TAManagement.POIInfo._getPOIType(pois[x].t)+':'+TAManagement.Convenience._paintNumber(score));
		    lbl.setTextColor('#333333');
		    this._settingColumn.add(lbl,{
			row:row,
			column:0
		    });
            
		    var allianceboni = TAManagement.POIInfo._getScoreBoni(alliancePois[pois[x].t],pois[x].t);//alliance Bonus
		    var without = TAManagement.POIInfo._getScoreBoni(alliancePois[pois[x].t]-score,pois[x].t);//without that Poi
		    var addon = '/h';
		    if( pois[x].t > 4 ){
			addon = '%';
		    }
		    if(allianceboni.c != without.c){
			var lbl =  new qx.ui.basic.Label('needed! for +'+TAManagement.Convenience._paintNumber(allianceboni.c-without.c)+addon);
			lbl.setTextColor('#993333');
			this._settingColumn.add(lbl,{
			    row:row,
			    column:1
			});
		    }else{
			var lbl =  new qx.ui.basic.Label('niceToHave: '+Math.round(score/allianceboni.s*100)+'%');
			lbl.setTextColor('#333333');
			this._settingColumn.add(lbl,{
			    row:row,
			    column:1
			});
		    }
		    var lbl =  new qx.ui.basic.Label(' next Lvl in: +'+TAManagement.Convenience._paintNumber(allianceboni.n));
		    lbl.setTextColor('#333333');
		    this._settingColumn.add(lbl,{
			row:row,
			column:2
		    });
		}
        
		row++;
		return row;
	    },
	    _clearMap:function(){
		var ctx = this._canvas.getContext('2d');
		ctx.clearRect(0, 0, 300, 300);
		ctx.drawImage(this._backgroundImg,0,0);
	    },
	    _paintPoi:function(obj,zoom){
		zoom = zoom || 1
		var factor = 10/3;
		var ctx = this._canvas.getContext('2d');
		ctx.strokeStyle = obj.color || "#cccc33";
		ctx.beginPath();
		ctx.rect((obj.x*zoom/factor)-1, (obj.y*zoom/factor)-1, 3, 3);
		ctx.fillStyle = '#dddd66';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#cccc33';
		ctx.stroke();
	    },
	    _paintBase:function(obj,zoom){
		zoom = zoom || 1
		var factor = 10/3;
		var ctx = this._canvas.getContext('2d');
		ctx.strokeStyle = obj.color || "#ffffff";
		ctx.beginPath();
		ctx.arc(obj.x*zoom/factor,obj.y*zoom/factor,zoom,0*Math.PI,2*Math.PI);
		ctx.stroke();
		if(this._showRadius){//radius
		    ctx.beginPath();
		    ctx.strokeStyle = obj.color || "#ffffff";
		    ctx.arc(obj.x*zoom/factor,obj.y*zoom/factor,zoom*20/factor,0*Math.PI,2*Math.PI);
		    ctx.stroke();
		}
	    },
	    _paintDistanceToMe:function(){
        
	    },
	    _calculateDistanceToMe:function(){
        
	    },
	    _getClosestMember:function(){
        
	    },
	    _getClosestPOI:function(){
        
	    },
            _getHoldingPOIs:function(){
		var Pois = ClientLib.Data.MainData.GetInstance().get_Alliance().get_OwnedPOIs();
		var holdingPois = {};
		for(var x in Pois){
		    var Poi = Pois[x];
		    for (var y in this._bases){
			var city = this._bases[y];
                        
			if(TAManagement.Convenience._getDistanceSquare(city,Poi)<=5){
			    holdingPois[x] = Poi;
			    break;
			}
		    }
		}
		return holdingPois;
	    }
	}
	
	TAManagement.loader = function() {
	    try {
		if ( typeof qx != 'undefined') {
		    var a = qx.core.Init.getApplication();
		    // application
		    var mb = qx.core.Init.getApplication().getMenuBar();
		    if (a && mb) {
			TAManagement.POIInfo.init();
			TAManagement.PlayerInfo.init();
		    } else{
			window.setTimeout(TAManagement.loader, 1000);
		    }
		} else {
		    window.setTimeout(TAManagement.loader, 1000);
		}
	    } catch (e) {
		if ( typeof console != 'undefined')
		    console.log(e);
		else if (window.opera)
		    opera.postError(e);
		else
		    GM_log(e);
	    }
	}
	if (/commandandconquer\.com/i.test(document.domain)) {
	    window.setTimeout(TAManagement.loader, 1000);
	}
    }
    // injecting, because there seem to be problems when creating game interface with unsafeWindow
    var script = document.createElement("script");
    var txt = TAManagement_script.toString();
    script.innerHTML = "(" + txt + ")();";
    script.type = "text/javascript";
    if (/commandandconquer\.com/i.test(document.domain)) {
	document.getElementsByTagName("head")[0].appendChild(script);
    }
 
})();