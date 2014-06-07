// ==UserScript==
// @name        Testes de Injeção
// @namespace   http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description TInjection
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     0.1
// @author      Palooza
// @grant       none
// ==/UserScript==

(function(){
    
    var CCTIN = function() {
        function init() {
				construct : function() {
					this.win = new qx.ui.window.Window("Tela de Testes");
					this.win.setWidth(600);
					this.win.setHeight(500);
					this.win.setShowMinimize(false);
					this.win.setLayout(new qx.ui.layout.VBox());
					qx.core.Init.getApplication().getRoot().add(this.win, {left:60, top:20});
				
					this.headerBox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					this.headerBox.setTextColor('white');
					this.win.add(this.headerBox);
										
					this.footerBox = new qx.ui.container.Composite(new qx.ui.layout.HBox());
					this.footerBox.setTextColor('white');
					this.win.add(this.footerBox);
					
				}}}})