// ==UserScript==
// @name           AcFun多P展开器
// @namespace      原脚本http://userscripts.org/users/86496
// @description    将 AcFun 多P 下拉列表转成一行甚至多行快捷链接。
// @include        http://www.acfun.tv/html/*
// @include        http://www.acfun.tv\*
// @include        http://*.acfun.tv/*
// @include        http://220.170.79.109/html/*
// ==/UserScript==

(function() {

var ac_droplist = document.getElementById('dedepagetitles');
if (!ac_droplist) return;
var current_p = ac_droplist.selectedIndex;
var options_ = ac_droplist.getElementsByTagName('option');
var options_l = options_.length;
var n = Math.floor(options_l / 30);
var insert_box = document.evaluate('/html/body/center/table[4]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
var b, b_tr = new Array(), b_td = new Array(), b_lnk = new Array(), b_lnkBx = new Array(), b_lnkTx = new Array();
var bstyle = 'max-width:900px;height:'+(20*(n+1))+'px';
var tstyle = 'padding:0;margin:0';
var ccolor = '#A2DBFD';
var ncolor = ['#e5e5e5','#f2f2f2'];
var hcolor = '#82CFFD';

make_boxes();
ac_droplist.style.display = 'none';
b_lnkBx[current_p].style.backgroundColor = ccolor;

function make_boxes() {
    if (!b) {
        b = document.createElement("div");
        b.setAttribute("id","pplinks");
        b.setAttribute("style", bstyle);
		var min_width = Math.min(300,(900/Math.min(30,options_l)))-4;
		
		b_table = document.createElement("table");
		b_table.setAttribute("style", tstyle);
		b_table.setAttribute("cellspacing", '0');
		b_tbody = document.createElement("tbody");
		for (var j=0;j<=n;j++) {
			b_tr[j] = document.createElement("tr");
			b_tbody.appendChild(b_tr[j]);
		}
		b_table.appendChild(b_tbody);
		b.appendChild(b_table);
		
		for (var i=0;i<options_l;i++) {
			b_td[i] = document.createElement("td");
				b_td[i].setAttribute("style", tstyle);
			b_lnk[i] = document.createElement("a");
				b_lnk[i].setAttribute("href", options_[i].value);
			t = document.createElement("div");
			b_lnkTx[i] = options_[i].textContent;
			b_lnkBx[i] = document.createElement("div");
			var blbstyle = 'width:'+min_width+'px;height:20px;background:'+((i%2==0)? ncolor[0]:ncolor[1])+';padding:0 2px;white-space:nowrap;overflow:hidden;text-align:center;';
			b_lnkBx[i].innerHTML = (min_width >= 80)? options_[i].textContent : (i+1);
			b_lnkBx[i].setAttribute("id", i);
			b_lnkBx[i].setAttribute("style", blbstyle);
			b_lnkBx[i].addEventListener("mouseover", function(e){
					t.innerHTML = b_lnkTx[this.id];
					document.body.appendChild(t);
					t_left = e.clientX - t.offsetWidth/2;
					t_top = e.clientY - 30;
					t.setAttribute("style", 'position:fixed;left:'+t_left+'px;top:'+t_top+'px;border:1px solid #aae;background:#fff;');
					this.style.backgroundColor = hcolor;
				}, false);
			b_lnkBx[i].addEventListener("mouseout", function(e){
					document.body.removeChild(t);
					this.style.backgroundColor = ((this.id==current_p)? ccolor:((this.id%2==0)? ncolor[0]:ncolor[1]));
				}, false);
			b_lnk[i].appendChild(b_lnkBx[i]);
			b_td[i].appendChild(b_lnk[i]);
			b_tr[Math.floor(i / 30)].appendChild(b_td[i]);
		}
	insert_box.parentNode.insertBefore(b,insert_box);
    }
}


})();