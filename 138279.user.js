// ==UserScript==
// @name           Command and Conquer Tiberium Alliances - RessourceFinder (for developers)
// @namespace      http://nysoft.de
// @version        1.0
// @description    This is a tool helps developers of other userscripts to easy find ressources in CCTA
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx
// @copyright      2012+, NySoft
// @author         Manuel Richarz
// ==/UserScript==

(function(){
    
    var CCTAM = function() {
        function init() {
        	
			//Extension Class
			qx.Class.define('de.nysoft.CCTAM.dev.resource_finder', {
				type : 'singleton',
				extend : qx.application.Standalone,
				construct : function() {
					this.win = new qx.ui.window.Window("Image Resource Pool");
					this.win.setWidth(600);
					this.win.setHeight(500);
					this.win.setShowMinimize(false);
					this.win.setLayout(new qx.ui.layout.VBox());
					qx.core.Init.getApplication().getRoot().add(this.win, {left:60, top:20});
					
					this.headerBox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					this.headerBox.setTextColor('white');
					this.win.add(this.headerBox);
					
					this.filterLabel = new qx.ui.basic.Label('Filter');
					this.filterLabel.setPaddingTop(6);
					this.filterLabel.setPaddingRight(10);
					this.filterLabel.setFont('bold');
					this.headerBox.add(this.filterLabel);
					
					this.filterInput = new qx.ui.form.TextField();
					this.filterInput.setWidth(500);
					this.headerBox.add(this.filterInput);
					this.filterInput.addListener('keypress', function() {
						this.loadResources();
					}, this);
					
					this.scrollCnt = new qx.ui.container.Scroll();
					this.scrollCnt.setWidth(600);
					this.scrollCnt.setHeight(400);
					this.box = new qx.ui.container.Composite(new qx.ui.layout.Grid());
					this.box.setTextColor('white');
					this.scrollCnt.add(this.box);
					this.win.add(this.scrollCnt);
					
					this.footerBox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					this.footerBox.setTextColor('white');
					this.win.add(this.footerBox);
					
					this.prevBtn = new qx.ui.form.Button("Prev");
					this.footerBox.add(this.prevBtn);
					this.prevBtn.addListener('execute', function(){
						this.start -= this.length;
						this.handleButtonState();
						this.loadResources();
					}, this);
					
					this.nextBtn = new qx.ui.form.Button("Next");
					this.footerBox.add(this.nextBtn);
					this.nextBtn.addListener('execute', function(){
						this.start += this.length;
						this.handleButtonState();
						this.loadResources();
					}, this);
				},
				members:{
					win: null,
					scrollCnt: null,
					headerBox: null,
					filterLabel: null,
					filterInput: null,
					box: null,
					footerBox: null,
					nextBtn: null,
					prevBtn: null,
					start: 0,
					length: 48,
					gridRowLength: 8,
					loadResources: function() {
						var filter = this.filterInput.getValue();
						var images = this.getResources(filter, ['.gif', '.jpg', '.png']);
						this.box.removeAll();
						var rowCounter = 0;
						var columnCounter = 0;
						for(i in images) {
							this.box.add(this.createIcon(images[i]), {row:rowCounter, column:columnCounter});
							columnCounter++;
							if(columnCounter == this.gridRowLength) {
								rowCounter++;
								columnCounter = 0;
							}
						}
					},
					getResources: function(filter, extensions) {
						var items = [];
						var i = 0;
						for(res in qx.util.ResourceManager.__gt) {
							if(filter == null || filter == '' || res.indexOf(filter) >= 0) {
								var extRes = this.getExtension(res);
								if(this._in_array(extRes, extensions)) {
									if(i < this.start) {
										i++;
										continue;
									}
									if(i-this.start >= this.length) {
										break;
									}
									items.push(res);
									i++;
								}
							}
						}
						return items;
					},
					handleButtonState: function() {
						if(this.start < this.length) {
							this.prevBtn.setEnabled(false);
						} else {
							this.prevBtn.setEnabled(true);
						}
					},
					createIcon: function(res) {
						var icon = new qx.ui.basic.Image(res);
						icon.setScale(true);
						icon.setWidth(64);
						icon.setHeight(64);
						icon.setToolTipText(res);
						return icon;
					},
					show: function() {
						this.loadResources();
						this.handleButtonState();
						this.win.open();
					},
					getExtension: function(res) {
						var index = res.lastIndexOf('.');
						return res.substring(index);
					},
					_in_array: function(needle, haystack) {
					    for(var key in haystack) {
					        if(needle === haystack[key]) {
					            return true;
					        }
					    }
					    return false;
					}
				}
			});
			
			var rf = de.nysoft.CCTAM.dev.resource_finder.getInstance();
			rf.show();
            
        };
        
        (function CCTAM_wait4readystate() {
            try {
                if(qx) {
                    app = qx.core.Init.getApplication();
                    if(app && app.initDone) {
                        init(); return;
                    }
                }
            } catch(e) {}
            setTimeout(CCTAM_wait4readystate, 1000);
        })();
    };
    
    var CCTAMTag = document.createElement("script");CCTAMTag.innerHTML = "(" + CCTAM.toString() + ")();";CCTAMTag.type = "text/javascript";
    try { document.getElementsByTagName("head")[0].appendChild(CCTAMTag); } catch(e) {};
    
})();