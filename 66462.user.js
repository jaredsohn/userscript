// ==UserScript==
// @name           Juick tree view
// @namespace      JTV_space
// @description    Juick tree view
// @include        http://juick.com/*
// ==/UserScript==
var replies_ul = document.getElementById("replies");
var content = document.getElementById("content");
var wrapper = document.getElementById("wrapper");
var lcol = document.getElementById("lcol");
var liav = document.getElementsByClassName("liav");
wrapper.style.width = "1200px";
content.style.width = "1000px";
lcol.style.width = "150px";

javascript:var juick_tree_view = {
	IndentStep: 10,
	MaxLevel:10,
	get_nextsibling: function(n){
		x=n.nextSibling; while (x.nodeType!=1) x=x.nextSibling; return x;},
		get_lastchild: function(n){ 
		x=n.lastChild; 
		while (x.nodeType!=1) x=x.previousSibling; return x;},
		run: function()
		{
			var cmt = document.getElementById('replies'); 
			if (cmt)
			{
				var cmts = cmt.getElementsByTagName('LI'); 
				for (var i = 0; i < cmts.length; i++)
				{ 
					var oo = this.get_lastchild(this.get_lastchild(cmts[i])); 
					if (oo.tagName == 'A')
					{
						var oldLi = cmts[i]; 
						oldLi.style.borderLeft = '3px solid #ccc';
						oldLi.style.paddingLeft = '3px';
						oldLi.style.backgroundPosition = 'top right';
						var sId = String(oo.innerHTML).substring(1); 
						var parentLi = document.getElementById(sId); 
						var otstup = parseInt(parentLi.style.marginLeft); 
						(isNaN(otstup)) ? otstup = this.IndentStep : otstup += this.IndentStep; 
						if(otstup > this.IndentStep * (this.MaxLevel-1)) otstup = this.IndentStep * (this.MaxLevel-1);
						var prevLi = this.get_nextsibling(parentLi); 
						var newLi = oldLi.cloneNode(1); 
						newLi.style.marginLeft = otstup + 'px'; 
						cmt.insertBefore(newLi,prevLi); 
						cmt.removeChild(oldLi);
					} 
				} 
			} 
		}
	};
	juick_tree_view.run();
	juick_tree_view.run();