// ==UserScript==
// @name           TLOdds
// @namespace      oberon
// @description    Dynamically adds odds to TL pages
// @include        http://www.teamliquid.net/*
// ==/UserScript==

var ContainerMap = {};
var NotDone = 0;
var ParaCount = 0;
var Hovers = {};
var tId;

function FindTLPDedMatchUps()
{
	var imgs = document.getElementsByTagName("img");
	for ( var i = 0 ; i < imgs.length ; i++ )
	{
		var matches = /\/tlpd\/images\/.icon_small\.png/.exec( imgs[i].src );
		if ( matches != null )
		{
			var elements;
			var link;
			if ( imgs[i].parentNode.tagName == "B" )
			{
				elements = [ imgs[i].parentNode ];
				link = elements[0].childNodes[1];
			} else {
				elements = [ imgs[i] ];
				elements.unshift( GetRight( elements[0] ) );
				link = elements[0];
			}
			
			matches = /\/tlpd\/players\/([^/]+)$/.exec( link.href );
			if ( matches != null )
			{
				elements.unshift( GetRight( elements[0] ) );
				if ( elements[0].nodeType == 3 )
				{
					while ( elements[0].nodeType == 3 )
					{
						elements.unshift( GetRight( elements[0] ) );
					}
					matches = /\/tlpd\/maps\/([^/]+)$/.exec( elements[0].href );
					if ( matches != null )
					{
						var mapLink = elements[0];
						elements.unshift( GetRight( elements[0] ) );
						if ( elements[0].nodeType == 3 )
						{
							while ( elements[0].nodeType == 3 )
							{
								elements.unshift( GetRight( elements[0] ) );
							}
							if ( elements[0].tagName == "B" )
							{
								MakeParagraph( elements, link, elements[0].childNodes[1], mapLink  );
							} else {
								if ( elements[0].tagName == "IMG" )
								{
									elements.unshift( GetRight( elements[0] ) );
									matches = /\/tlpd\/players\/([^/]+)$/.exec( elements[0].href );
									if ( matches != null )
									{
										MakeParagraph( elements, link, elements[0], mapLink );
									}
								}
							}
						}
					} else {
						if ( elements[0].tagName == "IMG" )
						{
							elements.unshift( GetRight( elements[0] ) );
							matches = /\/tlpd\/players\/([^/]+)$/.exec( elements[0].href );
							if ( matches != null )
							{
								MakeParagraph( elements, link, elements[0] );
							}
						}
					}
				}
			}
		}
	}
	BridgeDone();
}

function MakeParagraph( es, L1, L2, L3 )
{
	var Holder = document.createElement("span");
	Holder.id = "art_" + (ParaCount++);
	es[es.length-1].parentNode.replaceChild( Holder, es[es.length-1] );
	for ( var i = es.length - 1 ; i >= 0 ; i-- )
	{
		Holder.appendChild( es[i] );
	}
	ContainerMap[ Holder.id ] = { "P1":BreakLink( L1 ), "P2":BreakLink( L2 ), "Map":BreakMap( L3 ), "Handled":false };
}

function GetRight( o )
{
	while ( o.nextSibling == null )
		o = o.parentNode;
	return o.nextSibling;
}

function FindTLPDedPairs()
{
	var as = document.getElementsByTagName("a");
	for ( var i = 0 ; i < as.length ; i++ )
	{
		var link = as[i];
		var matches = /\/tlpd\/players\/([^/]+)$/.exec( link.href );
		if ( matches != null )
		{
			var Container = link.parentNode;
			if ( Container.id == "" )
			{
				Container.id = "con" + i;
			}
			if ( ContainerMap[ Container.id ] == null )
			{
				ContainerMap[ Container.id ] = { "P1":BreakLink( link ), "P2":null, "Handled":false };
			} else {
				if ( ContainerMap[ Container.id ] != -1 && !(ContainerMap[ Container.id ].Handled) )
				{
					if ( ContainerMap[ Container.id ].P1.href != link.href )
					{
						if ( ContainerMap[ Container.id ].P2 == null )
						{
							ContainerMap[ Container.id ].P2 = BreakLink( link );
						} else {
							if ( ContainerMap[ Container.id ].P2.href != link.href )
							{
								GM_log( ["Failed", ContainerMap[ Container.id ].P1.Name, ContainerMap[ Container.id ].P2.Name, link].join("\n") );
								ContainerMap[ Container.id ] = -1;
							}
						}
					}
				}
			}
		}
	}
	BridgeDone();
}

function BridgeDone()
{
	if ( NotDone == 0 )
		PrepareDisplay();
	else
	{
		setTimeout( BridgeDone, 100 );
	}
}

function PrepareDisplay()
{
	for ( var c in ContainerMap )
	{
		if ( ContainerMap[c] == -1 || ContainerMap[c].P2 == null )
		{
			delete ContainerMap[c];
		} else {
			document.getElementById( c ).addEventListener("mouseover", AddHover, false);
			document.getElementById( c ).addEventListener("mouseout", RemoveHover, false);
			ContainerMap[c].Handled = true;
		}
	}
}

function AddHover(e)
{
	var x = e.target;
	while ( ContainerMap[ x.id ] == null )
		x = x.parentNode;
	var id = x.id;

	if ( Hovers[id] == null )
	{
		var holder = document.createElement("div");
		holder.style.position = "absolute";
		holder.style.width = "250px";
		holder.style.height = "120px";
		holder.style.backgroundColor = "rgb(180,180,255)";
		holder.style.border = "2px outset rgb(127,127,255)";
		holder.style.top = ( e.clientY + window.pageYOffset - 115 ) + "px";
		holder.style.left = ( e.clientX + window.pageXOffset + 10 ) + "px";

		var t = document.createElement("table");
		t.style.width = "100%";
		t.style.height = "100%";
		t.style.textAlign = "center";
		t.border = 1;
		t.style.borderCollapse = "collapse";
		holder.appendChild( t );
		var tb = document.createElement("tbody");
		t.appendChild( tb );
		
		var r;
		var td1;
		var td2;
		var td3;
		
		r = document.createElement("tr");
		tb.appendChild( r );
		td1 = document.createElement("td");
		td2 = document.createElement("td");
		td3 = document.createElement("td");
		r.appendChild( td1 );
		r.appendChild( td2 );
		r.appendChild( td3 );
		td1.appendChild( document.createTextNode( "Win Chance" ) );
		td2.appendChild( document.createTextNode( ContainerMap[id].P1.Name ) );
		td3.appendChild( document.createTextNode( ContainerMap[id].P2.Name ) );

		r = document.createElement("tr");
		tb.appendChild( r );
		td1 = document.createElement("td");
		td2 = document.createElement("td");
		td3 = document.createElement("td");
		r.appendChild( td1 );
		r.appendChild( td2 );
		r.appendChild( td3 );
		td1.appendChild( document.createTextNode( "Generic" ) );
		var P1P = ContainerMap[id].P1["Overall"];
		var P2P = ContainerMap[id].P2["Overall"];
		var P1R = ContainerMap[id].P1.Race;
		var P2R = ContainerMap[id].P2.Race;
		td2.appendChild( document.createTextNode( Log5Method( P1P, P2P ) ) );
		td3.appendChild( document.createTextNode( Log5Method( P2P, P1P ) ) );

		r = document.createElement("tr");
		tb.appendChild( r );
		td1 = document.createElement("td");
		td2 = document.createElement("td");
		td3 = document.createElement("td");
		r.appendChild( td1 );
		r.appendChild( td2 );
		r.appendChild( td3 );
		td1.appendChild( document.createTextNode( "Race" ) );
		P1P = ContainerMap[id].P1[P2R];
		P2P = ContainerMap[id].P2[P1R];
		td2.appendChild( document.createTextNode( Log5Method( P1P, P2P ) ) );
		td3.appendChild( document.createTextNode( Log5Method( P2P, P1P ) ) );
		
		var M = ContainerMap[id].Map;
		if ( M != undefined && M != null && P1P != P2P )
		{
			var MatchUp = P1R[0] + "v" + P2R[0];

			if ( M[MatchUp] > 0 && M[MatchUp] < 1 )
			{
				r = document.createElement("tr");
				tb.appendChild( r );
				td1 = document.createElement("td");
				td2 = document.createElement("td");
				td3 = document.createElement("td");
				r.appendChild( td1 );
				r.appendChild( td2 );
				r.appendChild( td3 );
				td1.appendChild( document.createTextNode( "Race/Map" ) );
				td2.appendChild( document.createTextNode( Further5B( P1P, P2P, M[MatchUp] ) ) );
				td3.appendChild( document.createTextNode( Further5B( P2P, P1P, M[ReverseString(MatchUp)] ) ) );
			}
		}
		
		r = document.createElement("tr");
		tb.appendChild( r );
		td1 = document.createElement("td");
		td2 = document.createElement("td");
		td3 = document.createElement("td");
		r.appendChild( td1 );
		r.appendChild( td2 );
		r.appendChild( td3 );
		td1.appendChild( document.createTextNode( "ELO" ) );
		P1P = ContainerMap[id].P1["OverallELO"];
		P2P = ContainerMap[id].P2["OverallELO"];
		td2.appendChild( document.createTextNode( ELOMethod( P1P, P2P ) ) );
		td3.appendChild( document.createTextNode( ELOMethod( P2P, P1P ) ) );

		r = document.createElement("tr");
		tb.appendChild( r );
		td1 = document.createElement("td");
		td2 = document.createElement("td");
		td3 = document.createElement("td");
		r.appendChild( td1 );
		r.appendChild( td2 );
		r.appendChild( td3 );
		td1.appendChild( document.createTextNode( "ELO/Race" ) );
		P1P = ContainerMap[id].P1[P2R+"ELO"];
		P2P = ContainerMap[id].P2[P1R+"ELO"];
		td2.appendChild( document.createTextNode( ELOMethod( P1P, P2P ) ) );
		td3.appendChild( document.createTextNode( ELOMethod( P2P, P1P ) ) );
		
		document.body.appendChild( holder );
		Hovers[id] = holder;
		
		
	}
	e.stopPropagation();
	e.preventDefault();
}

//No bias
function Log5Method( a, b )
{
	a = parseFloat( a );
	b = parseFloat( b );
	return ( Math.floor( 10000 * ( a - a*b ) / ( a + b - 2*a*b ) ) / 100 ) + "%";
}

//Bias provided linearly. Breaks down at extremes -- at high extremes, becomes implausible (e.g. 106% win chance)
function Further5( a, b, x )
{
	var f = (x-1/2)/2;
	var aa = ( a + f );
	var bb = ( b - f );
	return Log5Method( aa, bb );
}

//Bias provided in what I believe is the correct manner
function Further5B( a, b, x )
{
	var F = ABFromX( x );
	var A = F[0] * a;
	var B = F[1] * b;
	var D = A + B;
	return Log5Method( A/D , B/D );
}

function ABFromX( x )
{
	if ( x == 0.5 )
		return [ 0.5, 0.5 ];
	var B = ((x - 1)+(Math.sqrt(1-x) * Math.sqrt(x)))/(2*x-1);
	var A = 1 - B;
	return [ A, B ];
}

function RemoveHover(e)
{
	var x = e.target;
	while ( ContainerMap[ x.id ] == null )
		x = x.parentNode;
	var id = x.id;
	
	if ( Hovers[ id ] != null )
	{
		Hovers[id].parentNode.removeChild( Hovers[id] );
		Hovers[id] = null;
	}
	
	return id;
}

function BreakLink( l )
{
	var pName = /^.*_(.*)$/.exec( l.href )[ 1 ];

	var DataUpdated = GM_getValue( pName + "_Updated" );

	var Player = {};
	
	if ( DataUpdated != undefined && DataUpdated != null && DataUpdated == (new Date().toDateString()) )
	{
		var Player = DeSerializeObject( GM_getValue( pName ) );
	}

	if ( Player.OverallELO == undefined )
	{
		GetELO( Player );
	}


	if ( Player.Overall == undefined )
	{
		Player.Name = pName;
		Player.href = l.href;
		NotDone++;
		GM_xmlhttpRequest({
			method: "GET",
			url: l.href,
			onload: function(response)
			{
				var r = /\(([0-9.]+)%\)/g;
				var MUs = [ "Protoss", "Zerg", "Terran", "Overall" ];
				var matches = r.exec( response.responseText );
				while ( matches != null )
				{
					Player[ MUs.pop() ] = matches[1]/100;
					matches = r.exec( response.responseText );
				}
				r = />(Protoss|Terran|Zerg)<br \/>/;
				var matches = r.exec( response.responseText );
				Player.Race = matches[1];
				var sPlayer = SerializeObject( Player );
				var Updated = new Date().toDateString();
				GM_setValue( pName, sPlayer );
				GM_setValue( pName + "_Updated", Updated );
				NotDone--;
			}
		});
	}
	return Player;
}

function BreakMap( l )
{
	if ( l == undefined || l == null )
		return null;
	var mName = /^.*_(.*)$/.exec( l.href )[ 1 ];

	var DataUpdated = GM_getValue( mName + "_Updated" );
	
	if ( DataUpdated != undefined && DataUpdated != null && DataUpdated == (new Date().toDateString()) )
		return DeSerializeObject( GM_getValue( mName ) );

	var Map = {};
	Map.Name = mName;
	Map.href = l.href;
	NotDone++;
	GM_xmlhttpRequest({
		method: "GET",
		url: l.href,
		onload: function(response)
		{
			var MUs = ["TvZ","ZvP","PvT"];
			var r = /\(([0-9.]+)%\)/g;
			var matches = r.exec( response.responseText );
			while ( matches != null )
			{
				var MU = MUs.shift();
				Map[ MU ] = matches[1]/100;
				Map[ ReverseString(MU) ] = 1-matches[1]/100;
				matches = r.exec( response.responseText );
				
			}
			var sMap = SerializeObject( Map );
			var Updated = new Date().toDateString();
			GM_setValue( mName, sMap );
			GM_setValue( mName + "_Updated", Updated );
			NotDone--;
		}
	});
	return Map;
}

function SerializeObject( p )
{
	var kvs = [];
	for ( var prop in p )
	{
		kvs.push( [prop,p[prop]].join("\t") );
	}
	return kvs.join("\n");
}
function DeSerializeObject( s )
{
	var Thing = {};
	var props = s.split("\n");
	for ( var i = 0 ; i < props.length ; i++ )
	{
		var kv = props[i].split("\t");
		Thing[kv[0]] = kv[1];
	}
	return Thing;
}

function SeriesChance( GameChance, SeriesLength )
{
	var k = ( SeriesLength - 1 )/2;
	var q = 1 - GameChance;
	var t = SeriesLength * Math.log( q );
	var r = Math.exp(t);
	var j = 1;
	while ( j <= k )
	{
		t += Math.log( 1 + ( ( ( SeriesLength+1 ) * GameChance ) - j ) / ( j * q ) );
		r += Math.exp( t );
		j++;
	}

	return 1 - r;
}

function ReverseString( s )
{
	return (s.split("").reverse().join(""));
}

function GetBestOf()
{
	if ( GM_getValue( "BEST_OF" ) == null || GM_getValue( "BEST_OF" ) == undefined )
		SetBestOf( 1 );
	return GM_getValue( "BEST_OF" );
}

function SetBestOf( x )
{
	GM_setValue( "BEST_OF", x )
}

function ELOMethod( a, b )
{
	return Math.floor( 10000 * ( 1 / ( 1 + Math.pow( 10, (b-a)/400 ) ) ) ) / 100 + "%";
}

function GetTabulatorId( callBack )
{

	var DataUpdated = GM_getValue( "Tabulator" + "_Updated" );
	
	if ( DataUpdated != undefined && DataUpdated != null && DataUpdated + (1000*60*15) > (new Date().getTime()) )
		callBack( parseInt(GM_getValue( "Tabulator" )) );

	NotDone++;
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.teamliquid.net/tlpd/players/detailed-elo",
		onload: function(response)
		{
			var matches = /remote_query\('tblt',(\d+),/g.exec( response.responseText );
			if ( matches != null )
			{
				var Updated = new Date().getTime() + "";
				GM_setValue( "Tabulator", parseInt(matches[1]) );
				GM_setValue( "Tabulator" + "_Updated", Updated );
				callBack( matches[1] );
			}
			NotDone--;
		}
	});
}

function GetELO( Player )
{
	NotDone++;
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.teamliquid.net/tlpd/tabulator/update.php?tabulator_id="+tId+"&tabulator_search="+Player.Name,
		onload: function(response)
		{
			var rows = response.responseText.split(/\n\s+<tr>\s*\n/);
			for ( var i = 2 ; i < rows.length; i++ )
			{
				var curP = /"\/tlpd\/players\/\d+_(.*?)"/.exec(rows[i])[1];
				if ( curP == Player.Name )
				{
					var MUs = [ "ProtossELO", "ZergELO", "TerranELO", "OverallELO" ];
					var cells = rows[i].split(/<\/?td>/);
					for ( var j = 2 ; j < 10 ; j += 2 )
					{
						var MU = MUs.pop();
						var ELO = parseInt(/(\d+)\D*$/.exec(cells[j])[1]);
						Player[MU] = ELO;
					}
				}
			}
			var sPlayer = SerializeObject( Player );
			var Updated = new Date().toDateString();
			GM_setValue( Player.Name, sPlayer );
			GM_setValue( Player.Name + "_Updated", Updated );
			NotDone--;
		}
	});
	
}

GetTabulatorId(function(t){
	tId=t;
	FindTLPDedMatchUps();
	FindTLPDedPairs();
});