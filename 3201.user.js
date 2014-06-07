// ==UserScript==
// @namespace     http://127.0.0.1/
// @name          Web Sudoku Helper
// @description   Provides some strategic add-ons/cheats to Web Sudoku 
// @include       http://*.websudoku.com/*
// @version       1.0
// @GM_version    0.6.4
// @FF_version    1.5
// ==/UserScript==


function addGlobalStyle(css) { //found at http://diveintogreasemonkey.org/patterns/add-css.html
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var styles = 'a.selector:hover {background:blue !important;color:#fff;text-decoration:none;} ';
styles += 'a.selector {font-size:12pt;font-family:courier,monospaced;padding-top:1px;padding-bottom:1px;padding-left:4px;padding-right:5px}';
styles += 'table.selectorTable {width:4em;height:4em;text-align:center}';

addGlobalStyle(styles);

GM_setValue('id','');
GM_setValue('innerHTML','');
GM_setValue('value','');

function get_at(x,y) {
	return document.getElementById("f" + x.toString() + y.toString());
}

function dump_poss(p) {
	var x,y;
	for(y=0;y<9;y++)
		for(x=0;x<9;x++)
			get_at(x,y).parentNode.style.background=p[y*9+x]?'#FFFFFF':'#FFCC33';
}

function obvious() {
	var state=new Array();
	var i,j,x,y,x2,y2,x0,y0;
	var num,done=0;
	for(y=0;y<9;y++) {
		for(x=0;x<9;x++) {
			var sq=get_at(x,y);
			if(sq.value!='')
				state[y*9+x]=sq.value;
			else
				state[y*9+x]=0;
		}
	}
	while(!done) {
		done=1;
		var poss=new Array();
		for(i=0;i<81*9;i++) poss[i]=1;
		for(y=0;y<9;y++) {
			for(x=0;x<9;x++) {
				num=state[y*9+x];
				if(num) {
					num--;
					// rows
					for(x2=0;x2<9;x2++)
						poss[y*81+x2*9+num]=0;
					// cols
					for(y2=0;y2<9;y2++)
						poss[y2*81+x*9+num]=0;
					// square
					x0=Math.floor(x/3)*3;
					y0=Math.floor(y/3)*3;
					for(y2=y0;y2<y0+3;y2++)
						for(x2=x0;x2<x0+3;x2++)
							poss[y2*81+x2*9+num]=0;
					// self
					for(i=0;i<9;i++)
						poss[y*81+x*9+i]=0;
				}
			}
		}
		// only one poss?
		for(y=0;y<9;y++) {
			for(x=0;x<9;x++) {
				if(!state[y*9+x]) {
					j=0;
					for(i=0;i<9;i++)
						if(poss[y*81+x*9+i])
							num=i+1,j++;
					if(j==1) {
						state[y*9+x]=num;
						get_at(x,y).value=num;
						done=0;
					}
				}
			}
		}
//		alert(done);
		// elimination (most powerful)
		for(j=1;j<10;j++) {
//			alert("j="+j);
			for(y=0;y<9;y++)
				for(x=0;x<9;x++)
					poss[y*9+x]=(0==state[y*9+x]);
			for(y=0;y<9;y++) {
				for(x=0;x<9;x++) {
					// learn nothing from blanks
					if(!(num=state[9*y+x]))
						continue;
					if(num!=j) continue;
					// rows
					for(x2=0;x2<9;x2++)
						poss[9*y+x2]=0;
					// cols
					for(y2=0;y2<9;y2++)
						poss[9*y2+x]=0;
					// squares
					x0=Math.floor(x/3)*3;
					y0=Math.floor(y/3)*3;
					for(y2=y0;y2<y0+3;y2++)
						for(x2=x0;x2<x0+3;x2++)
							poss[y2*9+x2]=0;
//					dump_poss(poss);
//					alert(j+":("+x+","+y+")");
				}
			}
//			dump_poss(poss);
			for(y0=0;y0<9;y0+=3) {
				for(x0=0;x0<9;x0+=3) {
					i=0;
					for(y2=y0;y2<y0+3;y2++) {
						for(x2=x0;x2<x0+3;x2++) {
							if(poss[y2*9+x2]) {
								x=x2;
								y=y2;
								i++;
							}
						}
					}
					if(1==i) {
//						alert("("+x+","+y+")="+j);
						state[y*9+x]=j;
						get_at(x,y).value=j;
						done=0;
					}
				}
			}
		}
	}
}

function showNumbers(num) {
	var x,y,k;
	var numn = new Array(10);
	for(k=1;k<10;k++) numn[k]=0;
	for(x=0;x<9;x++) {
		for(y=0;y<9;y++) {
			var sq=get_at(x,y);
			var ok=1;
			if(sq.readOnly) ok=0;
			if(sq.value!='') {
				ok=0;
				if(0<sq.value && sq.value<10)
					numn[sq.value]++;
			}
			// check rows
			for(k=0;k<9;k++) {
				if(num==get_at(k,y).value)
					ok=0;
			}
			// check cols
			for(k=0;k<9;k++) {
				if(num==get_at(x,k).value)
					ok=0;
			}
			// check square
			var kx,ky,sx,sy;
			sx=Math.floor(x/3)*3;
			sy=Math.floor(y/3)*3;
			for(kx=sx;kx<sx+3;kx++) {
				for(ky=sy;ky<sy+3;ky++) {
					if(num==get_at(kx,ky).value)
						ok=0;
				}
			}
			// update
			if(!ok) {
				sq.parentNode.style.background = '#FFCC33';
			} else {
				sq.parentNode.style.background = '#FFFFFF';
			}
		}
	}
	var colors=new Array(
		'#FFFFFF','#FFCC33',	// normal
		'#CCFFCC','#33FF33',	// all digits placed
		'#FF3333','#FF0000');	// too many digits
	for(k=1;k<10;k++)
		document.getElementById('gm_sel'+k).style.background=
			colors[((numn[k]>=9)?2:0)+((numn[k]>9)?2:0)+(num==k)];
}

function clicky(e){
	if(e.target.id && 'f'== e.target.id.substr(0,1)) {
		var square = document.getElementById(e.target.id);
		if(square.value=='') return;
		showNumbers(square.value);
	}
}

function fillall() {
	var str=document.getElementsByName('cheat').item(0).value;
	var i=0,x,y;
	for(y=0;y<9;y++) {
		for(x=0;x<9;x++) {
			get_at(x,y).value = str.substr(i,1);
			i++;
		}
	}
}

function sel_num(e) {
	if(e.target.id && 'gm_sel'== e.target.id.substr(0,6))
		showNumbers(e.target.id.substr(6,1));
}

function addtools() {
	var p=document.getElementById('c00');
	if(p) {
		p=p.parentNode.parentNode.parentNode.parentNode;
		var toolhtml = "<table border=1><tr>";
		var i;
		for(i=1;i<10;i++)
			toolhtml += "<td class=c0 id=gm_sel"+i+">"+i+"</td>";
		toolhtml += "</tr><tr>" +
			"<td colspan=4 class=c0 id=gm_cheat>CHEAT</td>" +
			"<td colspan=5 class=c0 id=gm_obvious>OBVIOUS</td>" +
			"</tr></table>";
		p.innerHTML += toolhtml;
		document.getElementById('gm_cheat').addEventListener('click',fillall,true);
		document.getElementById('gm_obvious').addEventListener('click',obvious,true);
		for(i=1;i<10;i++)
			document.getElementById('gm_sel'+i).addEventListener('click',sel_num,true);
	}
}

addtools();

document.addEventListener('click',clicky,false);


