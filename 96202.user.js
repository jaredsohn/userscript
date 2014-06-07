// ==UserScript==
// @name           Foro eLiTe 3
// @author         wBw
// @license        Free
// @namespace      wBs_
// @include        http://*.grepolis.*/game/report*
// @include        http://*.grepolis.*/game/building_place?action=simulator*
// @include        http://*.grepolis.*/game/building_wall*
// @description    Foro elite 3
// ==/UserScript==

ResCalc = 
{
	uW : null,
	$  : null,
	UnitData :  // Unit data from grepo version 1.07
				{ militia : {resources:null,population:0,favor:0},
				  sword   : {resources:{wood:  95,stone:   0,iron:  85},population:1,favor:0},
				  slinger : {resources:{wood:  55,stone: 100,iron:  40},population:1,favor:0},
				  archer  : {resources:{wood: 120,stone:   0,iron:  75},population:1,favor:0},
				  hoplite : {resources:{wood:   0,stone:  75,iron: 150},population:1,favor:0},
				  rider   : {resources:{wood: 240,stone: 120,iron: 360},population:3,favor:0},
				  chariot : {resources:{wood: 200,stone: 440,iron: 320},population:4,favor:0},
				  catapult: {resources:{wood:1200,stone:1200,iron:1200},population:15,favor:0},
				  minotaur:{resources:{wood:1400,stone:600,iron:3100},population:30,favor:202},
				  manticore:{resources:{wood:4400,stone:3000,iron:3400},population:45,favor:405},
				  zyklop:{resources:{wood:2000,stone:4200,iron:3360},population:40,favor:360},
				  harpy:{resources:{wood:1600,stone:400,iron:1360},population:14,favor:130},
				  medusa:{resources:{wood:1500,stone:3800,iron:2200},population:18,favor:210},
				  centaur:{resources:{wood:1740,stone:300,iron:700},population:12,favor:100},
				  pegasus:{resources:{wood:2800,stone:360,iron:80},population:20,favor:180},
				  big_transporter:{resources:{wood:500,stone:500,iron:400},population:7,favor:0},
				  bireme:{resources:{wood:800,stone:700,iron:180},population:8,favor:0},
				  attack_ship:{resources:{wood:1300,stone:300,iron:800},population:10,favor:0},
				  demolition_ship:{resources:{wood:500,stone:750,iron:150},population:8,favor:0},
				  small_transporter:{resources:{wood:800,stone:0,iron:400},population:5,favor:0},
				  trireme:{resources:{wood:2000,stone:1300,iron:900},population:16,favor:0},
				  colonize_ship:{resources:{wood:10000,stone:10000,iron:10000},population:170,favor:0},
				  sea_monster:{resources:{wood:5400,stone:2800,iron:3800},population:50,favor:400}
				},
	server	: "",

	init : function()
	{
		// Get the unsafe window outside of GM.
		if (typeof unsafeWindow === 'object')
			ResCalc.uW = unsafeWindow;
		else 
			ResCalc.uW = window;
			
		var uW = ResCalc.uW;
		var $ = ResCalc.$;
		
		ResCalc.server = "";
		
		var sr = /http\:\/\/(\w+)\.grepolis\..*/.exec( uW.document.URL );
		if ( sr )
			ResCalc.server = sr[1];

		//get jQuery (used by Grepo, but also very usefull for us)
		ResCalc.$ = ResCalc.uW.jQuery;
		var $ = ResCalc.$;
		 
		// Get GameData
		if ( uW.GameData && uW.GameData.units && uW.GameData.units.archer )
		{
			var gunits = ResCalc.unwrap( uW.GameData.units );
			ResCalc.UnitData = {};
			for (var u in gunits)
			{
				var nu = 
				{ resources : gunits[u].resources,
				  population: gunits[u].population,
				  favor     : gunits[u].favor
				};
				ResCalc.UnitData[ u ] = nu;
			}
			ResCalc.storeValue( "Units", ResCalc.UnitData );
		}
		else
		{
			var gunits = ResCalc.readValue( "Units" );
			if ( gunits && gunits.length > 0 )
				eval( "ResCalc.UnitData = "+gunits );
			else
			{
				ResCalc.rclog( "Unităţi nedefinite");
			}
		}

		// Add Pop-up texts we use here (will be bound to html elements later by "setPopup" calls)
		uW.PopupFactory.addTexts({
					rcwood_lost  : "<h4>Lemn</h4>Costul de lemn care ar trebui să fie cheltuit pentru unităţi </br>nu vor fi luate în calcul în cazul cercetării <i>'Servicio militar obligatorio'</i>.",
					rcstone_lost : "<h4>Piatra</h4>Costul de piatră care ar trebui să fie cheltuit pentru unităţi </br>nu vor fi luate în calcul în cazul cercetării <i>'SServicio militar obligatorio'</i>.",
					rciron_lost  : "<h4>Arginti</h4>Costul de arginţi care ar trebui să fie cheltuit pentru unităţi </br>nu vor fi luate în calcul în cazul cercetării <i>'Servicio militar obligatorio'</i>.",
					rcfavor_lost : "<h4>Favoruri</h4>Costul de favoruri care ar trebui să fie cheltuit pentru unităţi </br>nu vor fi luate în calcul în cazul cercetării <i>'Servicio militar obligatorio'</i>.",
					rcbh_lost    : "<h4>Locuri în ferma</h4>Locurile din fermă sunt eliberate după ce soldaţii au fost omorâţi.",
					rcatt_lost   : "Costuri pentru atacator",
					rcdef_lost   : "Costuri pentru agresor",
					openResBox   : "Fereastra mărfurilor",
					closeResBox  : "Închide fereastra mărfurilor",
					wallYourCosts: "Bajas propias",
					wallFoeCosts : "Bajas enemigas"
				});
		
		uW.rc_ShowPopup = ResCalc.ShowPopup;

		if ( ResCalc.UnitData )
		{
			if ( uW.document.getElementById('report_mood_strength') )
			{
				ResCalc.rclog("FARM");
				// TODO
			}
			else if ( uW.document.URL.indexOf( "action=simulator") > 0 ) 
			{
				ResCalc.rclog("SIM");
				// Simulation
				
				var oldSuccess = uW.HumanMessage.success;
				oldSuccess.bind( uW.HumanMessage );
				
				// Hook for the  message after simulation
				uW.HumanMessage.success = function(message)
				{
					var attCosts = ResCalc.calcSimRes( "building_place_att_losses_" );
					var defCosts = ResCalc.calcSimRes( "building_place_def_losses_" );
					
					for( var res in {'Wood':1,'Stone':1,'Iron':1,'Favor':1,'BH':1} )
					{
						$('#fcSimAtt'+res ).text( attCosts[ res ] );
						$('#fcSimDef'+res ).text( defCosts[ res ] );
					}

					oldSuccess(message);
				};

				$("#place_sim_ground_units").after( '<div id="fcSimShow" onclick="'
					// Adjust it below and at the right side of the last cell of the fight bonus table
					+'rc_ShowPopup(\'fcSim\',\'building_place_def_losses_wall_level\', \'right\')'
					+ '" class="place_sim_showhide" style="float:right"/>' );

				ResCalc.$('#fcSimShow').setPopup( 'openResBox');
				ResCalc.createResPopup('fcSim', 'Fereastra mărfurilor');
				
			}
			else if ( uW.document.URL.indexOf( "game/building_wall?") > 0 ) 
			{
				// "Building wall"
				ResCalc.rclog("WALL");
				
				// The lists always contain 5 rows
				// #0 - Title row   ("Înfrângere..." / "Pierdere...")
				// #1 - Subtile row ("...ale atacatorului"  )
				// #2 - unit row
				// #3 - Subtile row ("...ale aparatorului" )
				// #4 - unit row
				
				// Items on the left side - "Besiegt..."
				var defeatedUnits = $('.list_item_left');
			
				var foeCounters = 
				{ Wood  : 0,
				  Stone : 0,
				  Iron  : 0,
				  Favor : 0,
				  BH    : 0 };
				  
				ResCalc.calcWallRes( defeatedUnits[2], foeCounters );
				ResCalc.calcWallRes( defeatedUnits[4], foeCounters );

				// Items on the right side - "Verluste..."
				var lostUnits   = $('.list_item_right');
				
				var yourCounters = 
				{ Wood  : 0,
				  Stone : 0,
				  Iron  : 0,
				  Favor : 0,
				  BH    : 0 };
				
				ResCalc.calcWallRes( lostUnits[2], yourCounters );
				ResCalc.calcWallRes( lostUnits[4], yourCounters );

				// Add "+"-Button
				$(".game_header").append( '<div id="fcWallShow" onclick="'
					+'rc_ShowPopup(\'fcWall\',\'fcWallShow\', \'right\')'
					+ '" class="place_sim_showhide" style="float:right"/>' );
					
				ResCalc.createResPopup( 'fcWall', 'Resultados' );

				$('#fcWallAttLosts').setPopup('wallYourCosts')
				$('#fcWallDefLosts').setPopup('wallFoeCosts')
				
				// Update counters in pop-up.
				for( var res in {'Wood':1,'Stone':1,'Iron':1,'Favor':1,'BH':1} )
				{
					$('#fcWallAtt'+res ).text( ResCalc.fInt( yourCounters[ res ] ) );
					$('#fcWallDef'+res ).text( ResCalc.fInt( foeCounters[ res ] ) );
				}
			}
			else
			{
				ResCalc.rclog("REPORT");
				var rv = uW.ReportViewer;
				if (rv)
				{
					// Attack report
					var attCostsTable = ResCalc.calcReportRes( "report_units report_side_attacker" );
					var defCostsTable = ResCalc.calcReportRes( "report_units report_side_defender" );
					
					if ( attCostsTable.length | defCostsTable.length )
					{
						var sumNode = $("<div style='text-align:left;font-size:9px;'>"
								+"<center>"
								+"<table cellpadding='0px' cellspacing='0px'>"
								+"<tr><td>"+attCostsTable+"</td>"
								
								+ "<td><b><table cellpadding='0px' cellspacing='0px'>"
								+ "<tr><td align=center>Madera</td></tr>"
								+ "<tr><td align=center>Piedra</td></tr>"
								+ "<tr><td align=center>Plata</td></tr>"
								+ "<tr><td align=center>Favor</td></tr>"
								+ "<tr><td align=center>Pérdidas</td></tr></table></b></td>"
								
								+"<td>"+defCostsTable+"</td></tr></table></center></div>");
						sumNode.appendTo('#resources');
					}
					else
						ResCalc.rclog("Nu s+au găsit unităţi.");
				}
				else
					ResCalc.rclog("No ReportViewer found");
			}
		}    
	},
	
    // Our console function (with "crossbrowser" support.. *boah*...)
	// Used for debugging purposes.
    rclog : function(msg) 
    {
        try {
            if ( typeof GM_log !== 'undefined' )
                GM_log( msg );
            else
            {
                if (  typeof opera.postError !== 'undefined' )
                {
                    opera.postError( msg );
                }
                else
                {
                    ResCalc.uW.console.log(msg);
                }
            }
        }
        catch (e) { };
    },
	
	// Some DOM functions return "wrapped" objects with restricted access to some properties.
	// We need the real ones... 
    unwrap : function(node)
    {
        return (node && node.wrappedJSObject) ? node.wrappedJSObject : node;
    },

	/**
	 * Escapes a string for use in object dumps,
	 * without any prototype magic.
	 */
	escapeString : function(str)
	{  var sb = "";
	  for (var i=0;i<str.length;i++)
	  {
		var c=str[i];
		var cc=str.charCodeAt(i);
		if ((cc>=0x000 && cc<=0x01F) || (cc>=0x007F && cc<=0x09F))
		{
		  // Use Unicode
		  sb += "\\u";
		  var hexval= cc.toString(16);
		  while( hexval.length<2) hexval = "0"+hexval;
		  sb += hexval;
		}
		else
		  switch (c)
		  {
			case "'" : sb += "\\'" ; break;
			case '"' : sb += "\\\""; break;
			case '\\': sb += "\\\\"; break;
			case '/' : sb += "\\/" ; break;
			case '\b': sb += "\\b" ; break;
			case '\f': sb += "\\f" ; break;
			case '\n': sb += "\\n" ; break;
			case '\r': sb += "\\r" ; break;
			case '\t': sb += "\\t" ; break;
			default  : sb += c     ; break;
		  }
	  }
	  return sb;
	},

    
	/**
	 * JSON like strinigify funtion.
	 * Creates simple javascript source from objects, but not real JSON.
	 */
	xString : function(obj)
	{
	  if (obj===null) return 'null';

	  switch (typeof obj)
	  {
		case 'undefined':
		case 'unknown'  : return '';
		case 'function' :
		case 'number'   :
		case 'boolean'  : return obj.toString();
		case 'string'   :
		  return '"'+ResCalc.escapeString(obj)+'"';
		case 'object':
		  if (obj.nodeType != 1)
		  {
			var x=[];
			if ('splice' in obj && 'join' in obj)
			{ // Array
			  for (var e in obj)
				x.push(ResCalc.xString(obj[e]));
			  return '['+x.join(',')+']';
			}
			else
			{
			  for (var e in obj)
				x.push( '"'+e+'":'+ResCalc.xString(obj[e]));
			  return '{'+x.join(',')+'}';
			}
		  }
		break;
	  }
	  return obj.toString();
	},

	storeValue : function( name, value )
	{
		try 
		{
			ResCalc.rclog( "storing "+ResCalc.server+"."+name );
			value = ResCalc.xString( value );
			GM_setValue( ResCalc.server+"."+name, value );
		}
		catch (e) {
			ResCalc.rclog( "failed - "+e );

		}
	},

	readValue : function( name )
	{
		try
		{
			var data = GM_getValue( ResCalc.server+"."+name );
			return data;
		}
		catch (e)
		{
			ResCalc.rclog( e );
		}
		return null;
	},
	
	// Convenience replacement for "parseInt".
    pInt : function( txt, dft )
    {
      var v=parseInt( txt, 10 );
      if (isNaN(v)) v=(dft===undefined)?0:dft;
      return v;
    },

	// Fills up numbers (to look more pretty)
    pad : function(number, digits)
    {
      var x = ""+number;
      while(x.length<digits) x = "0"+x;
      return x;
    },
    
    // Format large integer values
	// E.g. "1000" will be "1.000"
    fInt : function( val )
    {
          var txt = "";
          while( val >= 1000 )
          {
              var nv = Math.floor(val/1000);
              txt = "."+ResCalc.pad(val-(nv*1000),3)+txt;
              val = nv;
          }
          txt = ""+val+txt;
          return txt;
    },
    
    // Crossbrowser event fixing (stupid IE).
    cbFix : function(e)
    { 
      if (undefined == e) e=ResCalc.uW.event;
      if (undefined == e.layerX) e.layerX=e.offsetX;
      if (undefined == e.layerY) e.layerY=e.offsetY;
      return e;
    },
    
    // Get the absolute left position of some html element inside the page. 
    getLeft : function(el)
    {
       var x = 0;
       while(el!=null){ x += el.offsetLeft; el = el.offsetParent;}
       return x;
    },
	
    // Get the absolute top position of some html element inside the page.
    getTop : function(el)
    {
       var y = 0;
       while( el != null ){  y += el.offsetTop; el = el.offsetParent; }
       return y;
    },
	
    //////////////////////////////////////////////
    // Simple "drag" support.
    //////////////////////////////////////////////
    drag : {
       obj : null,

       init : function(oAnchor, oRoot )
       {
          var a = ResCalc.unwrap( ResCalc.uW.document.getElementById(oAnchor) );
          var o = ResCalc.unwrap( ResCalc.uW.document.getElementById(oRoot) );
          
          a.onmousedown = ResCalc.drag.start;
          a.root = o ? o: a;

          if (isNaN(parseInt(a.root.style.left))) a.root.style.left= "0px";
          if (isNaN(parseInt(a.root.style.top ))) a.root.style.top = "0px";
       },

       start : function(e)
       {
          var o = ResCalc.drag.obj = ResCalc.unwrap(this);
          var e = ResCalc.cbFix(e);
          var y = ResCalc.pInt(o.root.style.top);
          var x = ResCalc.pInt(o.root.style.left);
          o.lastMouseX   = e.clientX;
          o.lastMouseY   = e.clientY;

          var d = ResCalc.uW.document;
          d.onmousemove = ResCalc.drag.drag;
          d.onmouseup   = ResCalc.drag.end;
          return false;
       },

       drag : function(e)
       {
          e = ResCalc.cbFix(e);
          var o = ResCalc.drag.obj;
          var rt = o.root;

          var ey= e.clientY;
          var ex= e.clientX;
          var y = ResCalc.pInt(rt.style.top);
          var x = ResCalc.pInt(rt.style.left);
          var w = rt.offsetWidth;
          var nx, ny;

          nx = ex - o.lastMouseX;
          ny = ey - o.lastMouseY;

          var rtLeft = ResCalc.getLeft(rt);
          var ww = ResCalc.uW.innerWidth;

          x+=nx;
          if (x<0) x=0;
          if ((x+w)>ww) x=ww-w;

          y+=ny;
          if (y<0) y=0;

          rt.style.left = x+"px";
          rt.style.top  = y+"px";

          o.lastMouseX   = ex;
          o.lastMouseY   = ey;


          return false;
       },

       end : function()
       {
          var d = ResCalc.uW.document;
          d.onmousemove = null;
          d.onmouseup   = null;
          ResCalc.drag.obj = null;
       }
    },

    /** 
     * Create some pop-up as hidden div add the end of body. 
	 * Used by the other "create" functions, simply to encapsulate
	 * the general code for handling "grepo-style" pop-ups here).
	 * 
     * @param idPrefix  Prefix to use for all IDs (to make it unique).
     * @param title     Text to display in title.
     * @param content   HTML code to put in the content area of the popup.
     */
    createPopup : function( idPrefix, title, content )
    {
        var stStyle = "background: transparent "
                    + "url(/images/game/layout/resources.png) no-repeat scroll -0px -30px;"
                    + "height:30px;width:30px";

        var wdStyle = "background: transparent "
                    + "url(/images/game/layout/resources.png) no-repeat;"
                    + "height:30px;width:30px;";

        var svStyle = "background: transparent "
                    + "url(/images/game/layout/resources.png) no-repeat scroll 0px -60px;"
                    + "height:30px;width:30px;";
                    
        var bhStyle = "background: transparent "
                    + "url(/images/game/layout/resources.png) no-repeat scroll 0px -120px;"
                    + "height:30px;width:30px;";

        var fvStyle = "background: transparent "
                    + "url(/images/game/layout/resources.png) no-repeat scroll 0px -150px;"
                    + "height:30px;width:30px;";
        
        
        ResCalc.$( "body" ).after( 
        
            // Z-index 21, just above the "Manager"-bar (currently 20) and below the pop-ups.
            '<div class="game_inner_box" style="z-index: 21; position:absolute; left:0px; top:0px; display:none;" id="'+idPrefix+'ResCostBox">'
        +    '<table cellspacing="0" cellpadding="0" class="game_border" >'
        +    '<tr><td class="game_border_edge"/><td class="game_border_top"/><td class="game_border_edge game_border_edge_2"/></tr>'
        +    '<tr><td class="game_border_left"/>'
        +    '<td>'
        +     '<div style="position:relative; margin: 0px; display: inline-block;">'
        +      '<div class="game_border_socket game_border_socket1"/>'
        +     '<div class="game_border_socket game_border_socket2"/>'
        +     '<div class="game_border_socket game_border_socket3"/>'
        +     '<div class="game_border_socket game_border_socket4"/>'
        
        // Title bar (dragable)
        +     '<div class="game_header" style="cursor:move;" id="'+idPrefix+'boxDragBar">'+title+'</div>'
        +     '<div class="game_body">'+content+'</div>'
        +    '</td>'
        +    '<td class="game_border_right"/>'
        +    '</tr>'
        +    '<tr><td class="game_border_edge game_border_edge_3"/><td class="game_border_bottom"/><td class="game_border_edge game_border_edge_4"/></tr>'
        +    '</table></div>' );
        
		// Delay drag binding, otherwise some of the properties may not be initializied.
        ResCalc.uW.setTimeout( ResCalc.drag.init, 100, idPrefix+'boxDragBar', idPrefix+'ResCostBox' );
    },

    
    /** 
     * Create the a resource pop-up. 
	 * 
     * @param idPrefix  Prefix to use for all IDs (to make it unique).
     * @param title     Text to display in title.
     */
    createResPopup : function( idPrefix, title )
    {
        var stStyle = "background: transparent "
                    + "url(/images/game/layout/resources.png) no-repeat scroll -0px -30px;"
                    + "height:30px;width:30px";

        var wdStyle = "background: transparent "
                    + "url(/images/game/layout/resources.png) no-repeat;"
                    + "height:30px;width:30px;";

        var svStyle = "background: transparent "
                    + "url(/images/game/layout/resources.png) no-repeat scroll 0px -60px;"
                    + "height:30px;width:30px;";
                    
        var bhStyle = "background: transparent "
                    + "url(/images/game/layout/resources.png) no-repeat scroll 0px -120px;"
                    + "height:30px;width:30px;";

        var fvStyle = "background: transparent "
                    + "url(/images/game/layout/resources.png) no-repeat scroll 0px -150px;"
                    + "height:30px;width:30px;";

		ResCalc.createPopup( idPrefix, title, 
       
          '<table cellspacing="0" cellpadding="0" class="place_simulator_table">'
        + '<tr>'
        +    '<td class="place_simulator_even" width="18px"/>'
        +    '<td class="left_border place_simulator_odd"  style="min-width: 45px" align=center><div id="'+idPrefix+'HeadWood"  style="'+wdStyle+'"/></td>'
        +    '<td class="left_border place_simulator_even" style="min-width: 45px" align=center><div id="'+idPrefix+'HeadStone" style="'+stStyle+'"/></td>'
        +    '<td class="left_border place_simulator_odd"  style="min-width: 45px" align=center><div id="'+idPrefix+'HeadIron"  style="'+svStyle+'"/></td>'
        +    '<td class="left_border place_simulator_even" style="min-width: 45px" align=center><div id="'+idPrefix+'HeadFavor" style="'+fvStyle+'"/></td>'
        +    '<td class="left_border place_simulator_odd"  style="min-width: 45px" align=center><div id="'+idPrefix+'HeadBH"    style="'+bhStyle+'"/></td>'
        + '</tr>'
        + '<tr>'
        +    '<td class="left_border place_simulator_even place_losses" align=center style="border-left:0px;"><div class="place_symbol place_att_losts" id="'+idPrefix+'AttLosts"/></td>'
        +    '<td class="left_border place_simulator_odd place_losses" ><div id="'+idPrefix+'AttWood" /></td>'
        +    '<td class="left_border place_simulator_even place_losses"><div id="'+idPrefix+'AttStone" /></td>'
        +    '<td class="left_border place_simulator_odd place_losses" ><div id="'+idPrefix+'AttIron" /></td>'
        +    '<td class="left_border place_simulator_even place_losses"><div id="'+idPrefix+'AttFavor" /></td>'
        +    '<td class="left_border place_simulator_odd place_losses" ><div id="'+idPrefix+'AttBH" "/></td>'
        + '</tr>'
        + '<tr>'
        +    '<td class="left_border place_simulator_even place_losses" align=center style="border-left:0px;"><div class="place_symbol place_def_losts" id="'+idPrefix+'DefLosts"/></td>'
        +    '<td class="left_border place_simulator_odd place_losses" ><div id="'+idPrefix+'DefWood" /></td>'
        +    '<td class="left_border place_simulator_even place_losses"><div id="'+idPrefix+'DefStone"/></td>'
        +    '<td class="left_border place_simulator_odd place_losses" ><div id="'+idPrefix+'DefIron" /></td>'
        +    '<td class="left_border place_simulator_even place_losses"><div id="'+idPrefix+'DefFavor"/></td>'
        +    '<td class="left_border place_simulator_odd place_losses" ><div id="'+idPrefix+'DefBH"   /></td>'
        +' </tr>' 
        +' </table></div>' );

		var $ = ResCalc.$;
		// Bind info pop-ups to headers.
        $('#'+idPrefix+'HeadWood' ).setPopup( 'rcwood_lost'  );
        $('#'+idPrefix+'HeadStone').setPopup( 'rcstone_lost' );
        $('#'+idPrefix+'HeadIron' ).setPopup( 'rciron_lost'  );
        $('#'+idPrefix+'HeadFavor').setPopup( 'rcfavor_lost' );
        $('#'+idPrefix+'HeadBH'   ).setPopup( 'rcbh_lost'    );
        $('#'+idPrefix+'AttLosts' ).setPopup( 'rcatt_lost'   );
        $('#'+idPrefix+'DefLosts' ).setPopup( 'rcdef_lost'   );
    },

	// Flags to initicate that a pop-up was already shown and should not be aligned again.
    bBoxOnceShown : {},
    
    /** 
     * Displays a pop-up.
     * @param idPrefix    see createResPopup
     * @param adjustToId  Id of element that should be used to adjust the box.
     * @param adjustMode  "left" or "right"
     */
    ShowPopup : function(idPrefix, adjustToId, adjustMode)
    {
		var $ = ResCalc.$;
        var showBox = $('#'+idPrefix+'Show')[0];
        var resBox = $('#'+idPrefix+'ResCostBox')[0];
    
        var bShow = resBox.style.display === "none";
        
        showBox.className = bShow ? "place_sim_bonuses_more_confirm" : "place_sim_showhide";
        $('#'+idPrefix+'Show').setPopup( bShow ? 'closeResBox' : 'openResBox' );
        resBox.style.display = bShow ? "block" : "none";
        
        if ( !ResCalc.bBoxOnceShown[idPrefix] )
        {
            ResCalc.bBoxOnceShown[idPrefix] = true;
            var adjNode = $( '#'+adjustToId )[0];
            resBox.style.top  = ( ResCalc.getTop( adjNode )+adjNode.offsetHeight + 2 )+"px";
            resBox.style.left = ( ResCalc.getLeft( adjNode) + adjNode.offsetWidth - resBox.offsetWidth + 2 )+"px";
        }
        
        return false;
    },
	
	// Create  report infos from a report part as html.
    calcReportRes: function( nodeClass )
    {
        var nodes = ResCalc.uW.document.getElementsByClassName( nodeClass );
        
        if ( (!nodes) || nodes.length == 0 )
        {
            return "";
        }
        
        var node = nodes[0];
    
        var sWood    = 0;
        var sStone   = 0;
        var sSilver  = 0;
        var sBH      = 0;
        var sFavor   = 0;

        var typeFromImageRE = /url\(.*\/images\/game\/units\/(.+)_40x40\.png/i;
        var countRE         = /<span class="report_losts">(-\d+)<\/span>/i;
        
        var units = node.getElementsByClassName("report_unit");

        for (var i=0 ; i<units.length ; i++)
        {
            var unit = units[i];
            if ( unit.style.backgroundImage )
            {
                var mTP = typeFromImageRE.exec(unit.style.backgroundImage);
                if (mTP) 
                {
                    var countTP = countRE.exec(unit.parentNode.innerHTML);
                    if ( countTP )
                    {
                        var count = -parseInt( countTP[1] );
                        var uc = ResCalc.UnitData[ mTP[1].toLowerCase() ];
                        if ( uc )
                        {
							if ( uc.resources )
							{
								sWood    += count * uc.resources.wood;
								sStone   += count * uc.resources.stone;
								sSilver  += count * uc.resources.iron;
							}
							if ( uc.population )
								sBH      += count * uc.population;
							if ( uc.favor )
								sFavor   += count * uc.favor;
                        }
                    }
                }
            }
        }

        return "<table  cellpadding='0px' cellspacing='0px'>"+
        "<tr><td style='text-align:right;'>"+ResCalc.fInt(sWood  )+"</td></tr>"+
        "<tr><td style='text-align:right;'>"+ResCalc.fInt(sStone )+"</td></tr>"+
        "<tr><td style='text-align:right;'>"+ResCalc.fInt(sSilver)+"</td></tr>"+
        "<tr><td style='text-align:right;'>"+ResCalc.fInt(sFavor )+"</td></tr>"+
        "<tr><td style='text-align:right;'>"+ResCalc.fInt(sBH)+"</td></tr>"+
        "</table>";
        
    }, 

	/**
	 * Get data from  simulation result.
	 * @param idPrefix  Prefix for html ids which contain result values.
	 */
    calcSimRes : function ( idPrefix )
    {    
        var sWood    = 0;
        var sStone   = 0;
        var sSilver  = 0;
        var sBH      = 0;
        var sFavor   = 0;
    
        for (var uName in ResCalc.UnitData)
        {
            var node = ResCalc.uW.document.getElementById( idPrefix+uName );
            if ( node )
            {
                var count = parseInt( node.innerHTML );
                if ( ! isNaN( count ) )
                {
					var uc = ResCalc.UnitData[ uName];
					if ( uc )
					{
						if ( uc.resources )
						{
							sWood    += count * uc.resources.wood;
							sStone   += count * uc.resources.stone;
							sSilver  += count * uc.resources.iron;
						}
						if ( uc.population )
							sBH      += count * uc.population;
						if ( uc.favor )
							sFavor   += count * uc.favor;
					}
                }
            }
        }
        return { Wood  : ResCalc.fInt(sWood),
                 Stone : ResCalc.fInt(sStone),
                 Iron  : ResCalc.fInt(sSilver),
                 Favor : ResCalc.fInt(sFavor ),
                 BH    : ResCalc.fInt(sBH) };
    },
	
	calcWallRes : function ( unitRow, counters )
	{
		var unitRE = /\/(\w+)_50x50\.png(?:.+?)class="place_unit_black bold">(\d+)<\/span>/ig;

		// IE and Opera use two new line characters, mozilla only one.
		// Fix this, before we use regexp:
		var html = unitRow.innerHTML.replace(/(\x0a\x0d|\x0d\x0a|\n)/g,"");
		
		var r;
		try
		{
			while ( r = unitRE.exec( html ) )
			{
				var count = parseInt( r[2] );
				if ( ! isNaN( count ) )
				{

					var uc = ResCalc.UnitData[ r[1] ];
					if ( uc )
					{
						if ( uc.resources )
						{
							counters.Wood += count * uc.resources.wood;
							counters.Stone+= count * uc.resources.stone;
							counters.Iron += count * uc.resources.iron;
						}
						if ( uc.population )
							counters.BH   += count * uc.population;
						if ( uc.favor )
							counters.Favor+= count * uc.favor;
					}
				}
			}
		} catch(e)
		{
			ResCalc.rclog( e );
		}
	}
};

ResCalc.init();


