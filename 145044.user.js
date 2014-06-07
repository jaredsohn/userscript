// ==UserScript==
// @name        Planets.nu Autopilot
// @namespace   planets.nu
// @include     http://planets.nu/home
// @version     0.1
// @grant	none
// ==/UserScript==

function wrapper () { // wrapper for injection

if (typeof vgaPlanets.prototype.setupAddOn=="undefined") vgaPlanets.prototype.setupAddOn = function (addOnName) {
        if (vgaPlanets.prototype.addOns == null) vgaPlanets.prototype.addOns = {};
        vgaPlanets.prototype.addOns[addOnName] = {};
        var settings = localStorage.getItem(addOnName + ".settings");
        if (settings != null)
            vgaPlanets.prototype.addOns[addOnName].settings = JSON.parse(settings);
        else
            vgaPlanets.prototype.addOns[addOnName].settings = {};
        vgaPlanets.prototype.addOns[addOnName].saveSettings = function () {
            localStorage.setItem(addOnName + ".settings", JSON.stringify(vgaPlanets.prototype.addOns[addOnName].settings));
        };
        vgaPlanets.prototype.addOns[addOnName].current = {};
    };
    
vgaPlanets.prototype.setupAddOn("autopilot");

// Set to -USERSCRIPT_ID to try and prevent note type collisions
//vgaPlanets.prototype.addOns.autopilot.notetype = -145044;   //Hier Userscript-ID negativ eingeben!

// END Add-On Header

// Note Storage/Retrieval functions
if (typeof vgaPlanets.prototype.saveObjectAsNote=="undefined") vgaPlanets.prototype.saveObjectAsNote = function (id, type, obj) {
        var note = this.getNote(id, type);
        if (note == null)
            note = this.addNote(id, type);
        note.changed = 1;
        note.body = JSON.stringify(obj);
    };
    
if (typeof vgaPlanets.prototype.getObjectFromNote=="undefined") vgaPlanets.prototype.getObjectFromNote = function (id, type) {
        var note = this.getNote(id, type);
        if (note != null)
            return JSON.parse(note.body);
        else
            return null;
    };

// End Note Storage/Retrieval functions


/* Ideen:

order - params
waypoint - x, y 	Planetenziel über UI, dann in x/y speichern
warp - w
enemy - e
mission - m
fc - f
loadad  n, d, t, m, s, mc, tp, fg
unload  n, d, t, m, s, mc, tp, fg
sellsupplies?
Warnung bei Fehler?

morescreen:
tabelle sortiert nach wann dran?
neue order
order ändern (onclick)
bestimmte löschen
alle löschen


NoteID = turn*1000+shipId 	turn: Zeitpunkt des Baus, sollte also eindeutig sein
notes vernichten, wenn veraltet

ordergroups:
	interval - nach wievielen Turns wiederholen (0=nie/never, 1= jeden/every turn)
	start - in welchem Turn zum ersten mal ausführen, first turn to execute
	stop - in welchem Turn zum letzten mal ausführen, last turn to execute
	lastexecuted - in welchem Turn zuletzt ausgeführt
	
{
	ordergroups: [{
		name: "von deponie laden und nachhause",
		start: 23,
		interval: 5,
		stop: 99,
		lastexecuted: 0,
		orders: [{
			order: "waypoint",
			params: {
				x: 1000,
				y: 1000
			}
		},
		{
			order: "load",
			params: {
				n: 1000,
				mc: 10000
			}
		}]
	}]
}

*/
/*
function dragdrop(){};
dragdrop.prototype={
//source: http://www.quaese.de/HTML-Design/texte/js/scripts/drag_and_drop/drag_and_drop.html
//(adapted)

  objDrag:null,     // Element, über dem Maus bewegt wurde

  //var mouseX:0,       // X-Koordinate der Maus
  mouseY:0,       // Y-Koordinate der Maus

  //var offX:0,           // X-Offset der Maus zur linken oberen Ecke des Elements
  offY:0,           // Y-Offset der Maus zur linken oberen Ecke des Elements
	
	//newX:0,		//neue X-Koordinate nach dem verschieben
	newY:0,		//neue Y-Koordinate nach dem verschieben
  // Browserweiche
  IE:document.all&&!window.opera,
  DOM:document.getElementById&&!this.IE,

  // Initialisierungs-Funktion
  init: function(){
    // Initialisierung der Überwachung der Events
    document.onmousemove = this.doDrag;  // Bei Mausbewegung die Fkt. doDrag aufrufen
    document.onmouseup = this.stopDrag;  // Bei Loslassen der Maustaste die Fkt. stopDrag aufrufen
  },

  // Wird aufgerufen, wenn die Maus über einer Box gedrückt wird
  startDrag: function(objElem) {
    // Objekt der globalen Variabel zuweisen -> hierdurch wird Bewegung möglich
    this.objDrag = objElem;
	this.newY=this.objDrag.offsetTop; //save old value
	
    // Offsets im zu bewegenden Element ermitteln
    //this.offX = this.mouseX - this.objDrag.offsetLeft;
    this.offY = this.mouseY - this.objDrag.offsetTop;
	console.log("start: offY="+this.offY);
	console.log(this.objDrag);
  },

  // Wird ausgeführt, wenn die Maus bewegt wird
  doDrag: function(ereignis) {
    // Aktuelle Mauskoordinaten bei Mausbewegung ermitteln
    //this.mouseX = (this.IE) ? window.event.clientX : ereignis.pageX;
    this.mouseY = (this.IE) ? window.event.clientY : ereignis.pageY;

    // Wurde die Maus über einem Element gedrückt, erfolgt eine Bewegung
    if (this.objDrag != null) {
		// Element neue Koordinaten zuweisen
		//this.objDrag.style.left = (this.mouseX - this.offX) + "px";
		this.objDrag.style.top = (this.mouseY - this.offY) + "px";
		console.log("do: offY="+this.offY);
		if (this.offY>0) {//moving down
			for (var obj=this.objDrag.nextSibling; obj!=null; obj=obj.nextSibling) 
				if (this.mouseY<obj.style.top-10) {
					this.newY=obj.style.top;
					obj.style.top-=obj.previousSibling.height;
				}
		}
		if (this.offY<0) {//moving up
			for (var obj=this.objDrag.previousSibling; obj!=null; obj=obj.previousSibling) 
				if (this.mouseY>obj.style.top+10) {
					this.newY=obj.style.top;
					obj.style.top+=obj.nextSibling.height;
				}
		}
	
      // Position in Statusleiste ausgeben
      //window.status = "Box-Position: " + this.objDrag.style.left + ", " + this.objDrag.style.top;
    }
  },

  // Wird ausgeführt, wenn die Maustaste losgelassen wird
  stopDrag: function(ereignis) {
	//this.objDrag.style.top=this.newY;
	// Objekt löschen -> beim Bewegen der Maus wird Element nicht mehr verschoben
	this.objDrag = null;
  }
};
*/

function Autopilot() {};
Autopilot.prototype = {
	notetype:-145044,    
	shipId: 0,
	load: function(shipId) { //create buttons and environment
		this.shipId=shipId;
		var Btext="Autopilot";
		if (this.getOrders()>0) Btext="<span>" + Btext + "</span>"; //green when there are orders
		var AutopilotButton = "<div id='AutopilotButton'><div class='SepButton' onclick='vgap.save();vgap.addOns.autopilot.toggleEdit(-1);vgap.addOns.autopilot.open();'>" + Btext + "</div></div>";
		$("#NoteButton").before(AutopilotButton);
		//$("div.SepButton:contains('History')").before(AutopilotButton);
		//both suboptimal, maybe a little button next to the ready checkbox?
    },
	groups: [],  
    getOrders: function () {
		var noteId=this.getNoteId(this.shipId);
		if (noteId==0) return -1;
		this.groups=vgap.getObjectFromNote(noteId, this.notetype);
		/*this.groups=[{ 
			id: 0,
			name: "laden und nachhause",
			start: 0,
			interval: 1,
			stop: 99,
			lastexecuted: 0,
			override: true,
			edit: false,
			orders: [{
				id: 0,
				type: "load",
				params: {
					type: "n",
					amount: "-100"
				}
			},
			{
				id: 1,
				type: "warp",
				params: {
					w:9
				}
			},
			{
				id: 2,
				type: "waypoint",
				params: {
					x: 2094,
					y: 2005
				}
			}]
		}];*/
		if (this.groups==null) 
		{ this.groups=[]; return 0;}
		return this.groups.length;
    },
    saveOrders: function() {
	var noteId=this.getNoteId(this.shipId);
	if (noteId==0) return;
	vgap.saveObjectAsNote(noteId, this.notetype, this.groups);
    },
    getNoteId: function (shipId) {
    	var ship=vgap.getArray(vgap.myships, shipId);
		if (!ship) return 0;
		return ship.turn*1000+shipId; //unique id for every ship
    },
    open: function() {
		vgap.hotkeysOn=false;
		var ship=vgap.getArray(vgap.myships, this.shipId);
		if (!ship || ship.turn==0) return;
		var ordergroups=this.groups;
		vgap.more.empty();
		var height=$("#MoreScreen").height();
		if (!height) height=600;
		var style="'overflow:auto; padding: 15px; width: 575px; height:"+(height-200)+"px'";
		var inputstyle="border: 0;  background-color: transparent; color: #ffffff; font-size: 12px; vertical-align: middle;";
		var html = "<div id='AutopilotScreen'><h1>Autopilot</h1>";
		html+="<div id='Orders' style="+style+">";
		if (ordergroups!=null) {
			for (var i=0; i<ordergroups.length; i++)
			{	
				var edit=ordergroups[i].edit;
				html += "<div class='DarkBar' style='cursor:pointer'><div class='SepTitle' ondblclick=\"vgap.septoggle('OrderGr"+i+"');\"><input name='name' size='20' maxlength='20' " + (edit?"":"readonly") + " value='" + ordergroups[i].name + "' style='" + inputstyle + "' onchange='vgap.addOns.autopilot.doEdit("+i+", -1, this.name, this.value);'/><span style='float:right'>&#x2502; <a onclick='vgap.addOns.autopilot.toggleEdit("+ ordergroups[i].id +");'>Edit</a> &#x2502; <a onclick='vgap.addOns.autopilot.remOrderGroup(" + ordergroups[i].id + ");vgap.addOns.autopilot.open();'>Delete</a> &#x2502;</span></div></div>";
				html += "<div class='SepContainer' id='OrderGr"+i+"'>";
				html += "<table style='position:relative; left:40px'>";
				html += "<tr><td align='right'>Start:</td><td align='left'><input name='start' size='4' maxlength='4' " + (edit?"":"readonly") + " value='"+ ordergroups[i].start + "' style='" + inputstyle + "' onchange='vgap.addOns.autopilot.doEdit("+i+", -1, this.name, this.value);'/></td></tr>";
				html += "<tr><td align='right'>Interval:</td><td align='left'><input name='interval' size='4' maxlength='4' " + (edit?"":"readonly") + " value='"+ ordergroups[i].interval + "' style='" + inputstyle + "' onchange='vgap.addOns.autopilot.doEdit("+i+", -1, this.name, this.value);'/></td></tr>";
				html += "<tr><td align='right'>Stop:</td><td align='left'><input name='stop' size='4' maxlength='4' " + (edit?"":"readonly") + " value='"+ ordergroups[i].stop + "' style='" + inputstyle + "' onchange='vgap.addOns.autopilot.doEdit("+i+", -1, this.name, this.value);'/></td></tr>";
				html += "<tr><td align='right'>Last Executed:</td><td align='left'><span>"+ ordergroups[i].lastexecuted + "</span></td></tr>";
				html += "<tr><td align='right'>Execute?</td><td align='left'><input type='checkbox' name='override' " + (edit?"":"disabled ") + (ordergroups[i].override?"checked ":"") + "' style='" + inputstyle + "' onchange='vgap.addOns.autopilot.doEdit("+i+", -1, this.name, this.checked);'/></td></tr>";
				html += "</table>";
				if (ordergroups[i].orders) {
					if (ordergroups[i].orders.length>0) {
						ordergroups[i].orders.sort(function (x,y) {return x.id - y.id;});
						for (var j=0; j<ordergroups[i].orders.length; ++j) {
							var ordertext="";
							var params=ordergroups[i].orders[j].params;
							switch (ordergroups[i].orders[j].type) {
								case "warp":
									if (edit) {
										ordertext+="<select name='w' size='1' style='" + inputstyle +"' onchange='vgap.addOns.autopilot.doEdit("+i+", "+j+", this.name,this.value)'>"; 
										for (var w=0;w<10;++w) ordertext+="<option "+(params["w"]==w?"selected":"")+" value='"+w+"'>"+w+"</option>";
										ordertext+="</select>";
									}
									else ordertext+=params["w"];
									break;
								case "waypoint":
									var x=parseInt(params.x);
									var y=parseInt(params.y);
									if (!x) x=2000;
									if (!y) y=2000;
									var ww=(params.ww==true); //can be undefined
									var planet=vgap.planetAt(x,y);
									if (planet==null||planet==undefined) {
										planet=vgap.warpWell(x,y);
										ww=ww||(planet);
									}
									if (!edit) { 
										if (ww) ordertext+= "Warp Well of ";
										ordertext+=(planet!=null?planet.name:"(Deep Space)");
									}
									else {										
										ordertext+="<select name='planet' size='1' style='" + inputstyle +"' onchange='if (this.value>0) {var p=vgap.getPlanet(this.value); vgap.addOns.autopilot.doEdit("+i+", "+j+", \"x\", p.x);vgap.addOns.autopilot.doEdit("+i+", "+j+", \"y\", p.y); vgap.addOns.autopilot.open();}'>";
										ordertext+="<option " + (planet==null&&!vgap.warpWell(x,y)?"selected":"") + " value='0' >(Deep Space)</option>";
										for (var p=0;p<vgap.planets.length;++p) ordertext+="<option " + (planet!=null&&planet.id==vgap.planets[p].id?"selected":"") + " value='"+vgap.planets[p].id+"' >" + vgap.planets[p].id + ": " + vgap.planets[p].name + "</option>";
										ordertext+="</select>";									
									}
									if (edit) ordertext+="<input name='ww' type='checkbox' style='" + inputstyle +"'" + (ww?"checked ":"") + "onchange='vgap.addOns.autopilot.doEdit("+i+", "+j+", this.name, this.checked);'/><span>WW</span>";
									ordertext+="<input name='x' size='4' maxlength='4' " + (edit?"":"readonly") + " value='"+x+"' style='" + inputstyle + "text-align: right;' onchange='vgap.addOns.autopilot.doEdit("+i+", "+j+", this.name, this.value);'/>, "; 
									ordertext+="<input name='y' size='4' maxlength='4' " + (edit?"":"readonly") + " value='"+y+"' style='" + inputstyle + "text-align: right;' onchange='vgap.addOns.autopilot.doEdit("+i+", "+j+", this.name, this.value);'/>"; 
									
									break;
								case "load":
								case "unload":
									var type="";
									var amount=parseInt(params.amount);
									if (!amount) amount=0;
									var key=params.type;
									type=this.getType(key); 
									if (type) {
										if (edit){
											ordertext+="<select name='type' size='1' style='" + inputstyle +"' onchange='vgap.addOns.autopilot.doEdit("+i+", "+j+", this.name, this.value);'>"; 
											for (var t in this.types)
											{
												ordertext+="<option "+(key==t?"selected":"")+" value='"+t+"'>"+this.types[t]+"</option>";
											}
											ordertext+="</select>";
											ordertext+="<input name='amount' size='5' maxlength='5' " + (edit?"":"readonly") +" value='"+amount+"' style='" + inputstyle + "text-align: right;' onchange='vgap.addOns.autopilot.doEdit("+i+", "+j+", this.name, parseInt(this.value));'/>";
										}
										else {
											ordertext+=type + ": " + (amount<0 ? "all but "+ (0-amount) : amount);
										}
										if (key!="mc"&&key!="c") ordertext+=" kt";
									}
									break;
								case "":
									break;
							}
							if (ordertext!="") ordertext="<span style='width:100%;'>" + ordertext + "</span>"; //style='float:right'
							html += "<div class='DarkBar' id='Order"+ordergroups[i].orders[j].id+"' " /*+  (edit?"onmousedown='vgap.drag.startDrag(this);'":"")*/ + " style='position:relative; left:30px; width:529px; cursor:pointer'><span style='width:100px;float:left;'>" + ordergroups[i].orders[j].type + "</span>" + ordertext + (edit?"<span style='float:right;'> &#x2502; <a onclick='vgap.addOns.autopilot.remOrder(" + ordergroups[i].id + ", " + ordergroups[i].orders[j].id + " );vgap.addOns.autopilot.open();'>Delete</a> &#x2502;</span>":"") + "</div>"; /*onclick=\"vgap.septoggle('Order"+(i*100+j)+"');\"*/
							/*html += "<div class='SepContainer' id='Order"+(i*100+j)+"' style='position:relative; left:50px; width:315px'>";
							html += "<table>";
							for (var par in params) {
								html += "<tr><td align='right'>" + par + ":</td><td align='left'>"+ params[par] + "</td></tr>";
							}
							html += "</table>";
							html += "</div>";*/
						}
					}
					if (edit) { //New Order
						html += "<div class='DarkBar' style='position:relative; left:60px; width:469px;  cursor:pointer'><span style='width:100px;float:left;'>New Order:</span>";
						html += "<select name='ordertype' size='1' onchange='vgap.addOns.autopilot.newordertype=this.value;' style='" + inputstyle +"'>"; 
						for (var t in this.ordertypes) html += "<option value='"+t+"' " + (this.newordertype==t?"selected":"") + " >"+this.ordertypes[t]+"</option>";
						html += "</select>";
						html += "<span style='float:right'> &#x2502; <a onclick='vgap.addOns.autopilot.addOrder("+i+",vgap.addOns.autopilot.newordertype);vgap.addOns.autopilot.open();'>Add</a> &#x2502;</span>";
						html += "</div>";
					}
				}
				html += "</div>";
			}
		}
		html += "<div class='DarkBar' style='cursor:pointer'><span style='float:left'>New Order Group</span><span style='float:right'> &#x2502; <a onclick='vgap.addOns.autopilot.addOrderGroup("+this.shipId+");vgap.addOns.autopilot.toggleEdit();vgap.addOns.autopilot.open();'>Add</a> &#x2502;</span></div>"; 
		html += "<div class='SepContainer' id='NewOrder'/>";
		html += "</div></div>";

		html += "<div class='SepBar'>";
		html += "<a class='SepButton' style='color:black' onclick='vgap.addOns.autopilot.toggleEdit(-1);vgap.addOns.autopilot.execute("+this.shipId+", vgap.addOns.autopilot.groups)'>Execute</a>";
		html += "<a class='SepButton' style='color:black' onclick='vgap.addOns.autopilot.toggleEdit(-1);vgap.addOns.autopilot.saveOrders("+this.shipId+");'>Save Orders</a>";
		html += "</div>";
		html += "<a class='MoreBack' onclick='vgap.closeMore();return false;'>Exit</a>";
		html += "</div>";
		$("#MoreScreen").append(html);
		vgap.showMore(600);
		//vgap.drag.init();
    },
    newId: function (list){
			var maxid=-1;
			if (list!=null){
				for (i=0; i<list.length; i++){
					maxid=Math.max(maxid, list[i].id);
				}
				return maxid+1;
			}
			return 0;
    },
    addOrderGroup: function(){
		var order={id:(this.groups==null?0:this.newId(this.groups)), name:"new order", start: 0, interval: 1, stop: 999, lastexecuted: 0, edit: true, orders:[]};
		this.groups.push(order);
		this.open();
    },
    addOrder: function(groupid, newtype){
		var ship=vgap.getArray(vgap.myships, this.shipId);
		if (!ship) return;
		if (!newtype) newtype="";
		var newparams={};
		if (newtype=="warp") newparams={"w":ship.warp};
		if (newtype=="load"||newtype=="unload") newparams={"type":"n", "amount":0};
		if (newtype=="waypoint") newparams={"x":ship.x, "y":ship.y, "ww":false};
		var order={"id":this.newId(this.groups[groupid].orders), "type":newtype, "params":newparams};
		this.groups[groupid].orders.push(order);
		this.open();
    },
	remOrderGroup: function(grId){
		for (i=0; i<this.groups.length; i++) {
			if (this.groups[i].id!=grId) continue;
			if (!confirm("Remove order group '"+this.groups[i].name+"'?")) 
				return;
			this.groups.splice(i, 1);
			break;
		}				
	},
	remOrder: function(grId, orderId){
		gr=vgap.getArray(this.groups, grId);
		for (j=0; j<gr.orders.length; j++) {
			if (gr.orders[j].id!=orderId) continue;
			if (!confirm("Remove order '"+gr.orders[j].type+"' from order group '"+gr.name+"'?")) 
				return;
			gr.orders.splice(j, 1);
			break;
		}
	},
	toggleEdit: function(grID){
		if (grID==null) grID=this.groups.length-1;
		for (var i=0;i<this.groups.length;++i) {
			if (this.groups[i].id==grID && !this.groups[i].edit) this.groups[i].edit=true;
			else this.groups[i].edit=false;
		}
		this.open();
	},
	doEdit: function(groupid, orderid, key, value){
		if (!value) value="";
		if (orderid==-1) vgap.addOns.autopilot.groups[groupid][key]=value; //start/stop/interval
		else vgap.addOns.autopilot.groups[groupid].orders[orderid].params[key]=value;	
	},
    hideAll: function() { //Achtung! beim löschen gehts hier schief!
		for (var i=0; i<this.groups.length; ++i) {$("#OrderGr"+i).hide()};
		},
    execute: function (shipId, orders) {
		var ship=vgap.getArray(vgap.myships, shipId);
		var groups = orders;
		var turn=vgap.settings.turn;
		if (turn!=vgap.nowTurn || vgap.game.status==3) {alert("timemachine or finished game!"); return;} //don't start when in time machine or in finished games
		this.errortext="";
		for (var i=0; i<groups.length;i++)
		{
			var order=groups[i];
			//don't execute, when already executed, not yet to execute, not anymore to execute, set to never or interval's not up
			order.lastexecuted=parseInt(order.lastexecuted);
			order.start=parseInt(order.start);
			order.stop=parseInt(order.stop);
			order.interval=parseInt(order.interval);
			//console.log(order);
			if (!order.override && (turn==order.lastexecuted || turn < order.start || turn > order.stop || (turn>order.start && order.interval==0) || ((turn-order.start)%order.interval!=0))) {this.error("nothing to do!");continue;}
			var done=0;
			for (var j=0;j<order.orders.length;++j){
				var curOrder=order.orders[j];
				switch (curOrder.type) {
					case "waypoint":
						//alert("found waypoint von "+ship.id);
						var x=parseInt(curOrder.params.x);
						var y=parseInt(curOrder.params.y);
						var ww=curOrder.params.ww;
						if (!x || !y || x<0 || x>4000|| y<0 || y>4000 ) 
						{	
							this.error("error - invalid coordinates for waypoint!");
						}
						else {
							if (ww) {
								var planet=vgap.planetAt(x,y);
								if (!planet) planet=vgap.warpWell(x,y);
								if (!planet) this.error("warning - no warp well possible here!");
								else {
									var target=this.toWarpWell(ship.x, ship.y, planet);
									if (target.x==planet.x&&target.y==planet.y) this.error("warning - no warp well possible here!");
									x=target.x; y=target.y;
								}
							}
							ship.targetx = x;
							ship.targety = y;
							ship.target = vgap.getTarget(x, y);
							ship.changed=1;
							++done;
							if (ship.neutronium==0) this.error("warning - ship has no fuel!");
							if (ship.warp==0) this.error("warning - ship has no warp set!");
							if (vgap.map.getDist(ship.x, ship.y, x, y)>vgap.getSpeed(ship.warp, ship.hullid)) this.error("warning - target might be more than one turn away!");
						}
						break;
					case "warp":
						//alert("found warp");
						var warp=parseInt(curOrder.params.w);
						if (!warp || warp<0 || warp>9) {
							this.error("error - invalid warp!");
						}
						else {
							ship.warp=warp;
							ship.changed=1;
							++done;
						}
					
						break;
					case "load": //no torps or fighters yet!
					case "unload":
						//alert("found load or unload, it is "+curOrder.type);
						var planet=vgap.planetAt(ship.x, ship.y);
						if (planet==null) this.error("error - ship not at planet. Cannot "+ curOrder.type +"!");
						else {
							var dir="";
							if (curOrder.type=="load") dir="ship";
							else if (curOrder.type=="unload") dir="planet";
							var transfer=curOrder.params;
							var typeabbr=transfer.type;
							var type=this.getType(typeabbr);
							if (type) {
								if (transfer.amount==0 || this.doTransfer(ship, planet, type, transfer.amount, dir)==0) {
									this.error("warning - no transfer of "+type+"!");
								}
								else {
									ship.changed=1;
									planet.changed=1;
								}
								if (typeabbr=="c" && dir=="ship" && planet.clans==0) this.error("warning - no clans left on planet");
								++done;
							}
							else this.error("error - unknown transfer object type: "+ typeabbr);
						}
						break;
					default: 
						//alert("unrecognized order type!");
						break;
				}
				if (this.errortext) {
					console.log(this.errortext);
					this.errortext="";
				}

				if (vgap.shipScreenOpen) {
					vgap.shipScreen.loadCargo();
					vgap.shipScreen.loadMovement();
					vgap.shipScreen.loadStatus();
					vgap.shipScreen.draw();
					vgap.map.draw();
					this.open();
				}
				console.log(ship.id+": order executed ("+curOrder.type+")");
			}
			//if (done==order.orders.length) { //all orders executed without error
				order.lastexecuted=turn;
				order.override=false;
				this.saveOrders();
				vgap.save()
			//}
		}
    },
	errortext: "",
	error: function(text){
		this.errortext+=(this.errortext.length>0?"\n":"")+this.shipId+": "+text;
    },
    doTransfer: function(ship, planet, type, amount, dir){ //need to be really really careful!
		var hull = vgap.getHull(ship.hullid);
		if (!ship || !hull || !planet || !type || !amount || (dir!="ship" && dir!="planet")) return -1;
			var totalCargo = ship.ammo + ship.duranium + ship.tritanium + ship.molybdenum + ship.supplies + ship.clans;
		if (amount<0) //transfer all but amount
		{
			if (dir=="ship") amount=planet[type]+amount; //amount is negative so we add;
			else amount=ship[type]+amount;
			if (amount<0) amount=0;	//not enough, so leave all
		}
		if (amount==0) return 0;
		var maximum=0;
		var diff=0;
		if (dir=="ship") {
			if (type=="neutronium") maximum=hull.fueltank-ship.neutronium;
			else if (type=="megacredits") maximum=10000-ship.megacredits;
			else maximum=hull.cargo-totalCargo;
			diff=Math.min(maximum, amount, planet[type]);
			ship[type]+=diff;
			planet[type]-=diff;
		}
		else //dir=="planet"
		{
			diff=Math.min(ship[type], amount);
			planet[type]+=diff;
			ship[type]-=diff;
		}
		return diff;
    },
    getType: function(abbr){
		var ret=this.types[abbr];
		if (!ret) return "";
		return ret;
    },
    ordertypes: {"load":"Load from planet", "unload": "Unload to planet", "waypoint":"Set waypoint", "warp":"Set warp"},
	newordertype: "load",
	types: {"n":"neutronium", "m":"molybdenum", "d":"duranium", "t":"tritanium", "mc":"megacredits", "s":"supplies", "c":"clans"}, //no torps and fighters yet
	toWarpWell: function(fromX,fromY,planet){
		//source: http://userscripts.org/scripts/show/132880 (adapted)
		if (planet==null) return [];
		if (planet.debrisdisk > 0) return [planet.x, planet.y];
		var delta = [[-3,0],[3,0],[0,-3],[0,3],[-2,-2],[2,2],[-2,2],[2,-2],[0,0]]; //add 0,0 if you're already at planet, no need for warpwell
		var minDist = 2000000;
		for (i=0;i<delta.length;i++) {
			var checkX = planet.x + delta[i][0];
			var checkY = planet.y + delta[i][1];
			var dist = Math.abs(fromX - checkX) + Math.abs(fromY - checkY);
			if (dist < minDist) {
				minDist[0] = dist;
				toX = checkX;
				toY = checkY;
			}
		}
		return [toX, toY];
	}
    };
vgap.addOns.autopilot=new Autopilot();
//vgap.drag=new dragdrop();



vgap.addOns.autopilot.old_load=vgapShipScreen.prototype.load;
vgapShipScreen.prototype.load=function(ship){
	vgap.addOns.autopilot.old_load.apply(this, arguments);
	vgap.addOns.autopilot.load(ship.id);
};

/*
vgap.addOns.autopilot.execute(vgap.getShip(1), vgap.addOns.autopilot.groups)
*/

vgaPlanets.prototype.warpWell= function (x, y) {
        for (var i = 0; i < this.planets.length; i++) {
            var planet = this.planets[i];
            if (planet.debrisdisk > 0) continue;
			var dist = vgap.map.getDist(x, y, planet.x, planet.y);
            if (dist <= 3 && dist > 0)
                return planet;
        }
        return false;
    }

}


var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
