// ==UserScript==
// @name          Planets.nu - Territory Map Plugin
// @description   Plugin for Planets.nu which allows to overlay various territory maps over the starmap
// @version       0.25
// @date          2013-07-25
// @author        kedalion
// @include       http://planets.nu/*
// @include       http://play.planets.nu/*
// @include       http://test.planets.nu/*
// @resource      userscript https://userscripts.org/scripts/source/134502.meta.js
// @updateURL     https://userscripts.org/scripts/source/134502.meta.js
// @downloadURL   https://userscripts.org/scripts/source/134502.user.js
// @homepage      http://planets.nu/discussion/utility-script-territory-map-plugin
// @history       0.25   Added hotkey 'x' support [2013-07-25]
// @history       0.24   Added support for games with 'explore map'[2013-07-25]
// @history       0.23   Fix to ensure correct button behavior [2013-07-25]
// @history       0.22   Small fix to prevent data leak between games
// @history       0.2    New release to work with client version 3 and plugin interface. Drawing on low zoom level missing. Added alliance view. [2013-07-22]
// @history       0.1    Initial release for old client version < 3 [2012-05-29]
// ==/UserScript==


function wrapper () { // wrapper for injection
    
	if (vgap.version < 3.0) {
		console.log("TerritoryMap plugin requires at least NU version 3.0. Plugin disabled." );
		return;	
	}
	
	var plugin_version = 0.25;
   
    console.log("TerritoryMap plugin version: v" + plugin_version );
	
	
	/*
	 *  Specify your plugin
	 *  You need to have all those methods defined or errors will be thrown. 
	 *  I inserted the print-outs in order to demonstrate when each method is 
	 *  being called. Just comment them out once you know your way around. 
	 *  
	 *  For any access to plugin class variables and methods from inside these
	 *  reserved methods, "vgap.plugins["nameOfMyPlugin"].my_variable" has to be 
	 *  used instead of "this.my_variable". 
	 */
	var territoryMapPlugin = {
			
			/*
			 * processload: executed whenever a turn is loaded: either the current turn or
			 * an older turn through time machine 
			 */
			processload: function() {
				//console.log("ProcessLoad: plugin called.");
				
				//check if plugin data is for current game
				if (vgap.plugins["territoryMapPlugin"].gameid != vgap.gameId  ) {
					vgap.plugins["territoryMapPlugin"].reset();
				}			
				if (vgap.plugins["territoryMapPlugin"].sites.length != vgap.planets.length) {
					vgap.plugins["territoryMapPlugin"].clearDiagram();
				}
					
			},	
			
			/*
			 * loaddashboard: executed to rebuild the dashboard content after a turn is loaded
			 */
			loaddashboard: function() {
				//console.log("LoadDashboard: plugin called.");
			},

			/*
			 * showdashboard: executed when switching from starmap to dashboard
			 */
			showdashboard: function() {
				//console.log("ShowDashboard: plugin called.");
			},
			
			/*
			 * showsummary: executed when returning to the main screen of the dashboard
			 */
			showsummary: function() {
				//console.log("ShowSummary: plugin called.");
			},
			
			/*
			 * loadmap: executed after the first turn has been loaded to create the map
			 * as far as I can tell not executed again when using time machine
			 */
			loadmap: function() {
				//console.log("LoadMap: plugin called.");
				vgap.plugins["territoryMapPlugin"].reset();
				
				vgap.plugins["territoryMapPlugin"].addMapTool("Territory Map", "ShowMinerals", "territorymap", function () { 
					
					if (vgap.plugins["territoryMapPlugin"].enabled) {
						if (vgap.plugins["territoryMapPlugin"].mode == 0) {							
							vgap.plugins["territoryMapPlugin"].enabled = false;
							
						} else {
							vgap.plugins["territoryMapPlugin"].mode = 0;							
						}
					} else {
						vgap.plugins["territoryMapPlugin"].enabled = true;
						vgap.plugins["territoryMapPlugin"].mode = 0;						
					}	
					vgap.plugins["territoryMapPlugin"].syncButtons();
					vgap.map.draw();	
					
				});
				vgap.plugins["territoryMapPlugin"].addMapTool("Alliance Map", "ShowMinerals", "alliancemap", function () {  
					if (vgap.plugins["territoryMapPlugin"].enabled) {
						if (vgap.plugins["territoryMapPlugin"].mode == 1) {						
							vgap.plugins["territoryMapPlugin"].enabled = false;
						} else {
							vgap.plugins["territoryMapPlugin"].mode = 1;							
						}
					} else {
						vgap.plugins["territoryMapPlugin"].enabled = true;
						vgap.plugins["territoryMapPlugin"].mode = 1;
					}	
					vgap.plugins["territoryMapPlugin"].syncButtons();
					vgap.map.draw();	
					
				});
	
			},
			
			/*
			 * showmap: executed when switching from dashboard to starmap
			 */
			showmap: function() {
				//console.log("ShowMap: plugin called.");
			},
			
			/*
			 * draw: executed on any click or drag on the starmap
			 */			
			draw: function() {
				//console.log("Draw: plugin called.");
							
				if (vgap.plugins["territoryMapPlugin"].enabled) {
					vgap.plugins["territoryMapPlugin"].showTerritory();
				}
				
			},		
			
			/*
			 * loadplanet: executed a planet is selected on dashboard or starmap
			 */
			loadplanet: function() {
				//console.log("LoadPlanet: plugin called.");
			},
			
			/*
			 * loadstarbase: executed a planet is selected on dashboard or starmap
			 */
			loadstarbase: function() {
				//console.log("LoadStarbase: plugin called.");
			},
			
			/*
			 * loadship: executed a planet is selected on dashboard or starmap
			 */
			loadship: function() {
				//console.log("LoadShip: plugin called.");
			},
			
			version: plugin_version,
			gameid: -1,
			enabled: false,
			mode: 0,  //0: each player separate, 1: all planets of alliance partners same color, enemies each alone
			voronoi: null,
			bbox: [],//{xl: 1800,xr: 2200,yt: 1800,yb: 2200};
			diagram: null,
			sites: [], 
			oldClearTools: null,
			
			reset: function () {
				
				//reset plugin settings if different game is loaded				
				this.gameid = vgap.gameId;
				this.enabled = false;
				this.mode = 0;
				this.voronoi = null;
				this.bbox = [];
				this.diagram = null;
				this.sites = [];	
													
				this.syncButtons();				
				
			},
			
			clearDiagram: function () {
				this.voronoi = null;
				this.bbox = [];
				this.diagram = null;
				this.sites = [];						
			},
						
			syncButtons: function () {
				//make sure the buttons represent the actual plugin state
				if (document.getElementById("territorymap") != null) {
					var territory_on = (document.getElementById("territorymap").className.indexOf("selectedmaptool") != -1);
				
					if ((territory_on && !this.enabled) || (!territory_on && this.enabled && this.mode == 0) || (territory_on && this.enabled && this.mode == 1)) {
						$('#territorymap').toggleClass("selectedmaptool");
					}				
				}
				
				if (document.getElementById("alliancemap") != null) {
					var alliance_on = (document.getElementById("alliancemap").className.indexOf("selectedmaptool") != -1);
					
					if ((alliance_on && !this.enabled) || (!alliance_on && this.enabled && this.mode == 1) || (alliance_on && this.enabled && this.mode == 0)) {
						$('#alliancemap').toggleClass("selectedmaptool");
					}	
				}			
			},
			
			addMapTool: function (text, cls, id, onclick) {
		        
		        $("<li class='" + cls + "' id='" + id + "'>" + text + "</li>").tclick(onclick).appendTo("#MapTools");
		    },
			
			
			showTerritory: function () {
			// draw territory
			              
			    //console.log("Drawing territory2");
			    if (this.diagram == null || this.diagram.gameId != vgap.gameId) {
			        this.calculateMapVoronoi();
			    } 
			    
			    if (this.diagram != null && this.diagram.gameId == vgap.gameId) {
			    	
			    	var ctx = vgap.map.ctx; 
			    	
			        //console.log("diagram exists");
			        for (var i = 0; i < this.diagram.cells.length; i++) {
			            var cell = this.diagram.cells[i];
			            var ownerId = vgap.planetAt(cell.site.x, cell.site.y).ownerid;
			            
			            var colorsA =["#F0F8FF","#32CD32","#CD5C5C","#FFC0CB","#98FB98","#C0C0C0","#FFFF00","#EE82EE","#D3DFD3","#B0E0E6","#87CEFA","#7B68EE","#F4A460","#D2B48C","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
//			            var colorsA2 =["#FFFFFF","#006400","#FF0000","#FF69B4","#00FA9A","#6A5ACD","#FFD700","#9400D3","#808080","#00CED1","#4169E1","#7B68EE","#A0522D","#87CEEB","#FF6347","#F5DEB3","#F08080","#2F4F4F","#008080","#B22222","#808000","#9370DB","#00FF00","#4B0082","#D2B48C","#9ACD32", "#DAA520","#F0F8FF","#6B8E23","#FF4500"];
	
			            var alpha = 0.2;
			            var color = colorsA[0];
			            if (ownerId != 0) {
			            	if (this.mode == 1 && vgap.allied(ownerId) && vgap.alliedTo(ownerId)) {
			            		color = colorsA[vgap.player.id];
			            	} else {
			            		color = colorsA[ownerId];
			            	}
			                alpha = 0.5;
			            }
			            
			            //check if area is visible
                        if (!vgap.map.isVisible(cell.site.x, cell.site.y, cell.visibility_radius)) {
			            	continue;
			            }

			            var vertexFrom = cell.halfedges[0].edge.va;
			            var vertexTo = cell.halfedges[0].edge.vb;
			            if ( (cell.halfedges[0].edge.lSite == null) || (cell.halfedges[0].edge.lSite.voronoiId != cell.site.voronoiId) ) {
			                vertexFrom = cell.halfedges[0].edge.vb;
			                vertexTo = cell.halfedges[0].edge.va;
			            }
			            
			            ctx.strokeStyle = colorToRGBA(color, 0.4);
			            ctx.lineWidth = 2;
			            ctx.fillStyle = colorToRGBA(color, alpha);
						ctx.beginPath();
						
						ctx.moveTo(vgap.map.screenX(vertexFrom.x), vgap.map.screenY(vertexFrom.y));
			                     
			      	    for (var j=0; j < cell.halfedges.length; j++) {
			                if ( (cell.halfedges[j].edge.lSite == null) || (cell.halfedges[j].edge.lSite.voronoiId != cell.site.voronoiId) ) {
			                    vertexTo = cell.halfedges[j].edge.va;
			                } else {
			                    vertexTo = cell.halfedges[j].edge.vb;
			 	            }
			                ctx.lineTo(vgap.map.screenX(vertexTo.x), vgap.map.screenY(vertexTo.y));
			            }

			      	    ctx.closePath();
						ctx.fill();
			            ctx.stroke();
			        }			        
			    }
			},
			
			
			calculateMapVoronoi: function () {
				if (this.diagram != null) {
					if (this.gameid == vgap.gameId) {
						console.log("Voronoi diagram already calculated for gameid: " + vgap.gameId);
						return;    
					}
				}
				this.gameid = vgap.gameId;
				
				//add planets as sites    
				var maxCoord = [-10000,-10000];
				var minCoord = [10000,10000];
				
				this.sites = [];
				
				for (var p = 0; p < vgap.planets.length; p++) {
					var pl = vgap.planets[p];
					this.sites.push({x: pl.x, y: pl.y});
					
					if (pl.x > maxCoord[0])
						maxCoord[0] = pl.x;
					if (pl.y > maxCoord[1])
						maxCoord[1] = pl.y;
					if (pl.x < minCoord[0])
						minCoord[0] = pl.x;
					if (pl.y < minCoord[1])
						minCoord[1] = pl.y;            
				}
				
				minCoord[0] -= 30;
				minCoord[1] -= 30;
				maxCoord[0] += 30;
				maxCoord[1] += 30;     
				
				//bounding box
				this.bbox = {xl: minCoord[0],xr: maxCoord[0],yt: minCoord[1],yb: maxCoord[1]};
			//	vgap.diagram = null;
			
				this.voronoi = new Voronoi();
				this.diagram = this.voronoi.compute(this.sites, this.bbox, this.gameid);				
				
			}			
			
	};
		
	// register your plugin with NU
	vgap.registerPlugin(territoryMapPlugin, "territoryMapPlugin");
	
	/**
	 * Overload the clearTools function in order to be able to
	 * disable the territory map through hotkey 'x' 
	 */	
	vgap.plugins["territoryMapPlugin"].oldClearTools = vgapMap.prototype.clearTools;
	
	vgapMap.prototype.clearTools = function(result) {
		
		vgap.plugins["territoryMapPlugin"].enabled = false;
		vgap.plugins["territoryMapPlugin"].syncButtons();
		
		//execute the normal clearTools function
		vgap.plugins["territoryMapPlugin"].oldClearTools.apply(this,arguments);
				
	};
	
	

	 /*!
	Author: Raymond Hill (rhill@raymondhill.net)
	File: rhill-voronoi-core.js
	Version: 0.96
	Date: May 26, 2011
	Description: This is my personal Javascript implementation of
	Steven Fortune's algorithm to compute Voronoi diagrams.
	
	Copyright (C) 2010,2011 Raymond Hill
	https:github.com/gorhill/Javascript-Voronoi
	
	Licensed under The MIT License
	http://en.wikipedia.org/wiki/MIT_License
	
	*****
	
	Portions of this software use, depend, or was inspired by the work of:
	
	  "Fortune's algorithm" by Steven J. Fortune: For his clever
	  algorithm to compute Voronoi diagrams.
	  http://ect.bell-labs.com/who/sjf/
	
	  "The Liang-Barsky line clipping algorithm in a nutshell!" by Daniel White,
	  to efficiently clip a line within a rectangle.
	  http://www.skytopia.com/project/articles/compsci/clipping.html
	
	  "rbtree" by Franck Bui-Huu
	  https://github.com/fbuihuu/libtree/blob/master/rb.c
	  I ported to Javascript the C code of a Red-Black tree implementation by
	  Franck Bui-Huu, and further altered the code for Javascript efficiency
	  and to very specifically fit the purpose of holding the beachline (the key
	  is a variable range rather than an unmutable data point), and unused
	  code paths have been removed. Each node in the tree is actually a beach
	  section on the beachline. Using a tree structure for the beachline remove
	  the need to lookup the beach section in the array at removal time, as
	  now a circle event can safely hold a reference to its associated
	  beach section (thus findDeletionPoint() is no longer needed). This
	  finally take care of nagging finite arithmetic precision issues arising
	  at lookup time, such that epsilon could be brought down to 1e-9 (from 1e-4).
	  rhill 2011-05-27: added a 'previous' and 'next' members which keeps track
	  of previous and next nodes, and remove the need for Beachsection.getPrevious()
	  and Beachsection.getNext().
	*/
	function Voronoi() {
		this.edges = null;
		this.cells = null;
		this.beachsectionJunkyard = [];
		this.circleEventJunkyard = [];
	};
	Voronoi.prototype.reset = function() {
		if (!this.beachline) {
			this.beachline = new this.RBTree();
		}
		if (this.beachline.root) {
			var a = this.beachline.getFirst(this.beachline.root);
			while (a) {
				this.beachsectionJunkyard.push(a);
				a = a.rbNext;
			}
		}
		this.beachline.root = null;
		if (!this.circleEvents) {
			this.circleEvents = new this.RBTree();
		}
		this.circleEvents.root = this.firstCircleEvent = null;
		this.edges = [];
		this.cells = [];
	};
	Voronoi.prototype.sqrt = Math.sqrt;
	Voronoi.prototype.abs = Math.abs;
	Voronoi.prototype.EPSILON = 1e-9;
	Voronoi.prototype.equalWithEpsilon = function(d, c) {
		return this.abs(d - c) < 1e-9;
	};
	Voronoi.prototype.greaterThanWithEpsilon = function(d, c) {
		return d - c > 1e-9;
	};
	Voronoi.prototype.greaterThanOrEqualWithEpsilon = function(d, c) {
		return c - d < 1e-9;
	};
	Voronoi.prototype.lessThanWithEpsilon = function(d, c) {
		return c - d > 1e-9;
	};
	Voronoi.prototype.lessThanOrEqualWithEpsilon = function(d, c) {
		return d - c < 1e-9;
	};
	Voronoi.prototype.RBTree = function() {
		this.root = null;
	};
	Voronoi.prototype.RBTree.prototype.rbInsertSuccessor = function(e, a) {
		var d;
		if (e) {
			a.rbPrevious = e;
			a.rbNext = e.rbNext;
			if (e.rbNext) {
				e.rbNext.rbPrevious = a;
			}
			e.rbNext = a;
			if (e.rbRight) {
				e = e.rbRight;
				while (e.rbLeft) {
					e = e.rbLeft;
				}
				e.rbLeft = a;
			} else {
				e.rbRight = a;
			}
			d = e;
		} else {
			if (this.root) {
				e = this.getFirst(this.root);
				a.rbPrevious = null;
				a.rbNext = e;
				e.rbPrevious = a;
				e.rbLeft = a;
				d = e;
			} else {
				a.rbPrevious = a.rbNext = null;
				this.root = a;
				d = null;
			}
		}
		a.rbLeft = a.rbRight = null;
		a.rbParent = d;
		a.rbRed = true;
		var c, b;
		e = a;
		while (d && d.rbRed) {
			c = d.rbParent;
			if (d === c.rbLeft) {
				b = c.rbRight;
				if (b && b.rbRed) {
					d.rbRed = b.rbRed = false;
					c.rbRed = true;
					e = c;
				} else {
					if (e === d.rbRight) {
						this.rbRotateLeft(d);
						e = d;
						d = e.rbParent;
					}
					d.rbRed = false;
					c.rbRed = true;
					this.rbRotateRight(c);
				}
			} else {
				b = c.rbLeft;
				if (b && b.rbRed) {
					d.rbRed = b.rbRed = false;
					c.rbRed = true;
					e = c;
				} else {
					if (e === d.rbLeft) {
						this.rbRotateRight(d);
						e = d;
						d = e.rbParent;
					}
					d.rbRed = false;
					c.rbRed = true;
					this.rbRotateLeft(c);
				}
			}
			d = e.rbParent;
		}
		this.root.rbRed = false;
	};
	Voronoi.prototype.RBTree.prototype.rbRemoveNode = function(f) {
		if (f.rbNext) {
			f.rbNext.rbPrevious = f.rbPrevious;
		}
		if (f.rbPrevious) {
			f.rbPrevious.rbNext = f.rbNext;
		}
		f.rbNext = f.rbPrevious = null;
		var e = f.rbParent, g = f.rbLeft, b = f.rbRight, d;
		if (!g) {
			d = b;
		} else {
			if (!b) {
				d = g;
			} else {
				d = this.getFirst(b);
			}
		}
		if (e) {
			if (e.rbLeft === f) {
				e.rbLeft = d;
			} else {
				e.rbRight = d;
			}
		} else {
			this.root = d;
		}
		var a;
		if (g && b) {
			a = d.rbRed;
			d.rbRed = f.rbRed;
			d.rbLeft = g;
			g.rbParent = d;
			if (d !== b) {
				e = d.rbParent;
				d.rbParent = f.rbParent;
				f = d.rbRight;
				e.rbLeft = f;
				d.rbRight = b;
				b.rbParent = d;
			} else {
				d.rbParent = e;
				e = d;
				f = d.rbRight;
			}
		} else {
			a = f.rbRed;
			f = d;
		}
		if (f) {
			f.rbParent = e;
		}
		if (a) {
			return
		}
		if (f && f.rbRed) {
			f.rbRed = false;
			return
		}
		var c;
		do {
			if (f === this.root) {
				break;
			}
			if (f === e.rbLeft) {
				c = e.rbRight;
				if (c.rbRed) {
					c.rbRed = false;
					e.rbRed = true;
					this.rbRotateLeft(e);
					c = e.rbRight;
				}
				if ((c.rbLeft && c.rbLeft.rbRed) || (c.rbRight && c.rbRight.rbRed)) {
					if (!c.rbRight || !c.rbRight.rbRed) {
						c.rbLeft.rbRed = false;
						c.rbRed = true;
						this.rbRotateRight(c);
						c = e.rbRight;
					}
					c.rbRed = e.rbRed;
					e.rbRed = c.rbRight.rbRed = false;
					this.rbRotateLeft(e);
					f = this.root;
					break;
				}
			} else {
				c = e.rbLeft;
				if (c.rbRed) {
					c.rbRed = false;
					e.rbRed = true;
					this.rbRotateRight(e);
					c = e.rbLeft;
				}
				if ((c.rbLeft && c.rbLeft.rbRed) || (c.rbRight && c.rbRight.rbRed)) {
					if (!c.rbLeft || !c.rbLeft.rbRed) {
						c.rbRight.rbRed = false;
						c.rbRed = true;
						this.rbRotateLeft(c);
						c = e.rbLeft;
					}
					c.rbRed = e.rbRed;
					e.rbRed = c.rbLeft.rbRed = false;
					this.rbRotateRight(e);
					f = this.root;
					break;
				}
			}
			c.rbRed = true;
			f = e;
			e = e.rbParent;
		} while (!f.rbRed);
		if (f) {
			f.rbRed = false;
		}
	};
	Voronoi.prototype.RBTree.prototype.rbRotateLeft = function(b) {
		var d = b, c = b.rbRight, a = d.rbParent;
		if (a) {
			if (a.rbLeft === d) {
				a.rbLeft = c;
			} else {
				a.rbRight = c;
			}
		} else {
			this.root = c;
		}
		c.rbParent = a;
		d.rbParent = c;
		d.rbRight = c.rbLeft;
		if (d.rbRight) {
			d.rbRight.rbParent = d;
		}
		c.rbLeft = d;
	};
	Voronoi.prototype.RBTree.prototype.rbRotateRight = function(b) {
		var d = b, c = b.rbLeft, a = d.rbParent;
		if (a) {
			if (a.rbLeft === d) {
				a.rbLeft = c;
			} else {
				a.rbRight = c;
			}
		} else {
			this.root = c;
		}
		c.rbParent = a;
		d.rbParent = c;
		d.rbLeft = c.rbRight;
		if (d.rbLeft) {
			d.rbLeft.rbParent = d;
		}
		c.rbRight = d;
	};
	Voronoi.prototype.RBTree.prototype.getFirst = function(a) {
		while (a.rbLeft) {
			a = a.rbLeft;
		}
		return a;
	};
	Voronoi.prototype.RBTree.prototype.getLast = function(a) {
		while (a.rbRight) {
			a = a.rbRight;
		}
		return a;
	};
	Voronoi.prototype.Cell = function(a) {
		this.site = a;
		this.halfedges = [];
	};
	Voronoi.prototype.Cell.prototype.prepare = function() {
		var a = this.halfedges, b = a.length, c;
		while (b--) {
			c = a[b].edge;
			if (!c.vb || !c.va) {
				a.splice(b, 1);
			}
		}
		a.sort(function(e, d) {
			return d.angle - e.angle;
		});
		return a.length;
	};
	Voronoi.prototype.Vertex = function(a, b) {
		this.x = a;
		this.y = b;
	};
	Voronoi.prototype.Edge = function(b, a) {
		this.lSite = b;
		this.rSite = a;
		this.va = this.vb = null;
	};
	Voronoi.prototype.Halfedge = function(d, e, a) {
		this.site = e;
		this.edge = d;
		if (a) {
			this.angle = Math.atan2(a.y - e.y, a.x - e.x);
		} else {
			var c = d.va, b = d.vb;
			this.angle = d.lSite === e ? Math.atan2(b.x - c.x, c.y - b.y) : Math.atan2(c.x - b.x, b.y - c.y);
		}
	};
	Voronoi.prototype.Halfedge.prototype.getStartpoint = function() {
		return this.edge.lSite === this.site ? this.edge.va : this.edge.vb;
	};
	Voronoi.prototype.Halfedge.prototype.getEndpoint = function() {
		return this.edge.lSite === this.site ? this.edge.vb : this.edge.va;
	};
	Voronoi.prototype.createEdge = function(e, a, d, b) {
		var c = new this.Edge(e, a);
		this.edges.push(c);
		if (d) {
			this.setEdgeStartpoint(c, e, a, d);
		}
		if (b) {
			this.setEdgeEndpoint(c, e, a, b);
		}
		this.cells[e.voronoiId].halfedges.push(new this.Halfedge(c, e, a));
		this.cells[a.voronoiId].halfedges.push(new this.Halfedge(c, a, e));
		return c;
	};
	Voronoi.prototype.createBorderEdge = function(d, c, a) {
		var b = new this.Edge(d, null);
		b.va = c;
		b.vb = a;
		this.edges.push(b);
		return b;
	};
	Voronoi.prototype.setEdgeStartpoint = function(b, d, a, c) {
		if (!b.va && !b.vb) {
			b.va = c;
			b.lSite = d;
			b.rSite = a;
		} else {
			if (b.lSite === a) {
				b.vb = c;
			} else {
				b.va = c;
			}
		}
	};
	Voronoi.prototype.setEdgeEndpoint = function(b, d, a, c) {
		this.setEdgeStartpoint(b, a, d, c);
	};
	Voronoi.prototype.Beachsection = function(a) {
		this.site = a;
	};
	Voronoi.prototype.createBeachsection = function(a) {
		var b = this.beachsectionJunkyard.pop();
		if (b) {
			b.site = a;
		} else {
			b = new this.Beachsection(a);
		}
		return b;
	};
	Voronoi.prototype.leftBreakPoint = function(e, f) {
		var a = e.site, m = a.x, l = a.y, k = l - f;
		if (!k) {
			return m;
		}
		var n = e.rbPrevious;
		if (!n) {
			return -Infinity;
		}
		a = n.site;
		var h = a.x, g = a.y, d = g - f;
		if (!d) {
			return h;
		}
		var c = h - m, j = 1 / k - 1 / d, i = c / d;
		if (j) {
			return (-i + this.sqrt(i * i - 2 * j * (c * c / (-2 * d) - g + d / 2 + l - k / 2))) / j + m;
		}
		return (m + h) / 2;
	};
	Voronoi.prototype.rightBreakPoint = function(b, c) {
		var d = b.rbNext;
		if (d) {
			return this.leftBreakPoint(d, c);
		}
		var a = b.site;
		return a.y === c ? a.x : Infinity;
	};
	Voronoi.prototype.detachBeachsection = function(a) {
		this.detachCircleEvent(a);
		this.beachline.rbRemoveNode(a);
		this.beachsectionJunkyard.push(a);
	};
	Voronoi.prototype.removeBeachsection = function(b) {
		var a = b.circleEvent, j = a.x, h = a.ycenter, e = new this.Vertex(j, h), f = b.rbPrevious, d = b.rbNext, l = [b], g = Math.abs;
		this.detachBeachsection(b);
		var m = f;
		while (m.circleEvent && g(j - m.circleEvent.x) < 1e-9 && g(h - m.circleEvent.ycenter) < 1e-9) {
			f = m.rbPrevious;
			l.unshift(m);
			this.detachBeachsection(m);
			m = f;
		}
		l.unshift(m);
		this.detachCircleEvent(m);
		var c = d;
		while (c.circleEvent && g(j - c.circleEvent.x) < 1e-9 && g(h - c.circleEvent.ycenter) < 1e-9) {
			d = c.rbNext;
			l.push(c);
			this.detachBeachsection(c);
			c = d;
		}
		l.push(c);
		this.detachCircleEvent(c);
		var k = l.length, i;
		for (i = 1; i < k; i++) {
			c = l[i];
			m = l[i - 1];
			this.setEdgeStartpoint(c.edge, m.site, c.site, e);
		}
		m = l[0];
		c = l[k - 1];
		c.edge = this.createEdge(m.site, c.site, undefined, e);
		this.attachCircleEvent(m);
		this.attachCircleEvent(c);
	};
	Voronoi.prototype.addBeachsection = function(l) {
		var j = l.x, n = l.y;
		var p, m, v, q, o = this.beachline.root;
		while (o) {
			v = this.leftBreakPoint(o, n) - j;
			if (v > 1e-9) {
				o = o.rbLeft;
			} else {
				q = j - this.rightBreakPoint(o, n);
				if (q > 1e-9) {
					if (!o.rbRight) {
						p = o;
						break;
					}
					o = o.rbRight;
				} else {
					if (v > -1e-9) {
						p = o.rbPrevious;
						m = o;
					} else {
						if (q > -1e-9) {
							p = o;
							m = o.rbNext;
						} else {
							p = m = o;
						}
					}
					break;
				}
			}
		}
		var e = this.createBeachsection(l);
		this.beachline.rbInsertSuccessor(p, e);
		if (!p && !m) {
			return
		}
		if (p === m) {
			this.detachCircleEvent(p);
			m = this.createBeachsection(p.site);
			this.beachline.rbInsertSuccessor(e, m);
			e.edge = m.edge = this.createEdge(p.site, e.site);
			this.attachCircleEvent(p);
			this.attachCircleEvent(m);
			return
		}
		if (p && !m) {
			e.edge = this.createEdge(p.site, e.site);
			return
		}
		if (p !== m) {
			this.detachCircleEvent(p);
			this.detachCircleEvent(m);
			var h = p.site, k = h.x, i = h.y, t = l.x - k, r = l.y - i, a = m.site, c = a.x - k, b = a.y - i, u = 2 * (t * b - r * c), g = t * t + r * r, f = c * c + b * b, s = new this.Vertex((b * g - r * f) / u + k, (t * f - c * g) / u + i);
			this.setEdgeStartpoint(m.edge, h, a, s);
			e.edge = this.createEdge(h, l, undefined, s);
			m.edge = this.createEdge(l, a, undefined, s);
			this.attachCircleEvent(p);
			this.attachCircleEvent(m);
			return
		}
	};
	Voronoi.prototype.CircleEvent = function() {
	};
	Voronoi.prototype.attachCircleEvent = function(i) {
		var r = i.rbPrevious, o = i.rbNext;
		if (!r || !o) {
			return
		}
		var k = r.site, u = i.site, c = o.site;
		if (k === c) {
			return
		}
		var t = u.x, s = u.y, n = k.x - t, l = k.y - s, f = c.x - t, e = c.y - s;
		var v = 2 * (n * e - l * f);
		if (v >= -2e-12) {
			return
		}
		var h = n * n + l * l, g = f * f + e * e, m = (e * h - l * g) / v, j = (n * g - f * h) / v, b = j + s;
		var q = this.circleEventJunkyard.pop();
		if (!q) {
			q = new this.CircleEvent();
		}
		q.arc = i;
		q.site = u;
		q.x = m + t;
		q.y = b + this.sqrt(m * m + j * j);
		q.ycenter = b;
		i.circleEvent = q;
		var a = null, p = this.circleEvents.root;
		while (p) {
			if (q.y < p.y || (q.y === p.y && q.x <= p.x)) {
				if (p.rbLeft) {
					p = p.rbLeft;
				} else {
					a = p.rbPrevious;
					break;
				}
			} else {
				if (p.rbRight) {
					p = p.rbRight;
				} else {
					a = p;
					break;
				}
			}
		}
		this.circleEvents.rbInsertSuccessor(a, q);
		if (!a) {
			this.firstCircleEvent = q;
		}
	};
	Voronoi.prototype.detachCircleEvent = function(a) {
		var b = a.circleEvent;
		if (b) {
			if (!b.rbPrevious) {
				this.firstCircleEvent = b.rbNext;
			}
			this.circleEvents.rbRemoveNode(b);
			this.circleEventJunkyard.push(b);
			a.circleEvent = null;
		}
	};
	Voronoi.prototype.connectEdge = function(l, a) {
		var b = l.vb;
		if (!!b) {
			return true;
		}
		var c = l.va, p = a.xl, n = a.xr, r = a.yt, d = a.yb, o = l.lSite, e = l.rSite, i = o.x, h = o.y, k = e.x, j = e.y, g = (i + k) / 2, f = (h + j) / 2, m, q;
		if (j !== h) {
			m = (i - k) / (j - h);
			q = f - m * g;
		}
		if (m === undefined) {
			if (g < p || g >= n) {
				return false;
			}
			if (i > k) {
				if (!c) {
					c = new this.Vertex(g, r);
				} else {
					if (c.y >= d) {
						return false;
					}
				}
				b = new this.Vertex(g, d);
			} else {
				if (!c) {
					c = new this.Vertex(g, d);
				} else {
					if (c.y < r) {
						return false;
					}
				}
				b = new this.Vertex(g, r);
			}
		} else {
			if (m < -1 || m > 1) {
				if (i > k) {
					if (!c) {
						c = new this.Vertex((r - q) / m, r);
					} else {
						if (c.y >= d) {
							return false;
						}
					}
					b = new this.Vertex((d - q) / m, d);
				} else {
					if (!c) {
						c = new this.Vertex((d - q) / m, d);
					} else {
						if (c.y < r) {
							return false;
						}
					}
					b = new this.Vertex((r - q) / m, r);
				}
			} else {
				if (h < j) {
					if (!c) {
						c = new this.Vertex(p, m * p + q);
					} else {
						if (c.x >= n) {
							return false;
						}
					}
					b = new this.Vertex(n, m * n + q);
				} else {
					if (!c) {
						c = new this.Vertex(n, m * n + q);
					} else {
						if (c.x < p) {
							return false;
						}
					}
					b = new this.Vertex(p, m * p + q);
				}
			}
		}
		l.va = c;
		l.vb = b;
		return true;
	};
	Voronoi.prototype.clipEdge = function(d, i) {
		var b = d.va.x, l = d.va.y, h = d.vb.x, g = d.vb.y, f = 0, e = 1, k = h - b, j = g - l;
		var c = b - i.xl;
		if (k === 0 && c < 0) {
			return false;
		}
		var a = -c / k;
		if (k < 0) {
			if (a < f) {
				return false;
			} else {
				if (a < e) {
					e = a;
				}
			}
		} else {
			if (k > 0) {
				if (a > e) {
					return false;
				} else {
					if (a > f) {
						f = a;
					}
				}
			}
		}
		c = i.xr - b;
		if (k === 0 && c < 0) {
			return false;
		}
		a = c / k;
		if (k < 0) {
			if (a > e) {
				return false;
			} else {
				if (a > f) {
					f = a;
				}
			}
		} else {
			if (k > 0) {
				if (a < f) {
					return false;
				} else {
					if (a < e) {
						e = a;
					}
				}
			}
		}
		c = l - i.yt;
		if (j === 0 && c < 0) {
			return false;
		}
		a = -c / j;
		if (j < 0) {
			if (a < f) {
				return false;
			} else {
				if (a < e) {
					e = a;
				}
			}
		} else {
			if (j > 0) {
				if (a > e) {
					return false;
				} else {
					if (a > f) {
						f = a;
					}
				}
			}
		}
		c = i.yb - l;
		if (j === 0 && c < 0) {
			return false;
		}
		a = c / j;
		if (j < 0) {
			if (a > e) {
				return false;
			} else {
				if (a > f) {
					f = a;
				}
			}
		} else {
			if (j > 0) {
				if (a < f) {
					return false;
				} else {
					if (a < e) {
						e = a;
					}
				}
			}
		}
		if (f > 0) {
			d.va = new this.Vertex(b + f * k, l + f * j);
		}
		if (e < 1) {
			d.vb = new this.Vertex(b + e * k, l + e * j);
		}
		return true;
	};
	Voronoi.prototype.clipEdges = function(e) {
		var a = this.edges, d = a.length, c, b = Math.abs;
		while (d--) {
			c = a[d];
			if (!this.connectEdge(c, e) || !this.clipEdge(c, e) || (b(c.va.x - c.vb.x) < 1e-9 && b(c.va.y - c.vb.y) < 1e-9)) {
				c.va = c.vb = null;
				a.splice(d, 1);
			}
		}
	};
	Voronoi.prototype.closeCells = function(a) {
		var n = a.xl, m = a.xr, q = a.yt, e = a.yb, g = this.cells, f = g.length, b, h, r, o, p, j, l, i, d, c, k = Math.abs;
		while (f--) {
			b = g[f];
			if (!b.prepare()) {
				continue;
			}
			o = b.halfedges;
			p = o.length;
			h = 0;
			while (h < p) {
				r = (h + 1) % p;
				i = o[h].getEndpoint();
				l = o[r].getStartpoint();
				if (k(i.x - l.x) >= 1e-9 || k(i.y - l.y) >= 1e-9) {
					d = i;
					if (this.equalWithEpsilon(i.x, n) && this.lessThanWithEpsilon(i.y, e)) {
						c = new this.Vertex(n, this.equalWithEpsilon(l.x, n) ? l.y : e);
					} else {
						if (this.equalWithEpsilon(i.y, e) && this.lessThanWithEpsilon(i.x, m)) {
							c = new this.Vertex(this.equalWithEpsilon(l.y, e) ? l.x : m, e);
						} else {
							if (this.equalWithEpsilon(i.x, m) && this.greaterThanWithEpsilon(i.y, q)) {
								c = new this.Vertex(m, this.equalWithEpsilon(l.x, m) ? l.y : q);
							} else {
								if (this.equalWithEpsilon(i.y, q) && this.greaterThanWithEpsilon(i.x, n)) {
									c = new this.Vertex(this.equalWithEpsilon(l.y, q) ? l.x : n, q);
								}
							}
						}
					}
					j = this.createBorderEdge(b.site, d, c);
					o.splice(h + 1, 0, new this.Halfedge(j, b.site, null));
					p = o.length;
				}
				h++;
			}
		}
	};
	Voronoi.prototype.compute = function(h, i, gameid) {
		var d = new Date();
		this.reset();
		var g = h.slice(0);
		g.sort(function(n, m) {
			var o = m.y - n.y;
			if (o) {
				return o;
			}
			return m.x - n.x;
		});
		var b = g.pop(), k = 0, f = Number.MIN_VALUE, e = Number.MIN_VALUE, j = this.cells, a;
		for (; ; ) {
			a = this.firstCircleEvent;
			if (b && (!a || b.y < a.y || (b.y === a.y && b.x < a.x))) {
				if (b.x !== f || b.y !== e) {
					j[k] = new this.Cell(b);
					b.voronoiId = k++;
					this.addBeachsection(b);
					e = b.y;
					f = b.x;
				}
				b = g.pop();
			} else {
				if (a) {
					this.removeBeachsection(a.arc);
				} else {
					break;
				}
			}
		}
		this.clipEdges(i);
		this.closeCells(i);
		
		this.computeCellVisibilityRadius();		
		
		var c = new Date();
		var l = {cells: this.cells, edges: this.edges, execTime: c.getTime() - d.getTime(), gameId: gameid};
		this.reset();
		return l;
	};
	
	Voronoi.prototype.computeCellVisibilityRadius = function() {
		//check if area is visible
		
		    		    	
		for (var i = 0; i < this.cells.length; i++) {
			var cell = this.cells[i];
	
	        var max_dist = 0;
	        var dx, dy;
	        
	        for (var j=0; j < cell.halfedges.length; j++) {
	        			            	
	        	dx = cell.site.x - cell.halfedges[j].edge.va.x;
	        	dy = cell.site.y - cell.halfedges[j].edge.va.y;
	        	d = Math.sqrt(dx*dx + dy*dy);
	        	
	        	if (d > max_dist) {
	        		max_dist = d;
	        	}
	        	
	        	dx = cell.site.x - cell.halfedges[j].edge.vb.x;
	        	dy = cell.site.y - cell.halfedges[j].edge.vb.y;
	        	d = Math.sqrt(dx*dx + dy*dy);
	        	
	        	if (d > max_dist) {
	        		max_dist = d;
	        	}			            	             	    
	        }
	        cell.visibility_radius = max_dist;
		}	
	};
	
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
