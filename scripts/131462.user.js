// ==UserScript==
// @name           Operator View 1 
// @namespace      http://printing.arc.losrios.edu/DSF/Admin/ProductionJobTicket.aspx?
// @description    Disables Navigation Bar, Enter Feature, Clear and Load shortcut keys  Click on the job link opens Job Ticket, incrses font size on job numbers and puts it at the begining of the strings, F12 is to sort by due date, Esc. is to log out,\ is to change output to ARC Busness Cards, ` is to assin "operator"
// @include        http://printing.arc.losrios.edu/DSF/Admin/ProductionView.aspx
// @version        1.0.09
// ==/UserScript==

//Disables Navigation list of selectebles
document.getElementById("ctl00_QuickMenuSearch").disabled=true;
document.getElementById("ctl00_QuickMenuSearch").blur();

//Disables the GO Button
document.getElementById("ctl00_btnQuickSerach").disabled=true;
document.getElementById("ctl00_btnQuickSerach").blur();

//Enable Print Button after going back to the Operator View
document.getElementById("ctl00_W_TopPagerUI_BTN_PrintJob").disabled=false;
document.getElementById("ctl00_W_TopPagerUI_BTN_PrintJob").blur();

//Puts "GreaseMonkey Scripts Loaded" in red text on top and on the bottom of the page
document.getElementById("ctl00_poweredByLBL").innerHTML="GreaseMonkey Scripts Loaded";
document.getElementById("ctl00_poweredByLBL").style.color="red";
document.getElementById("ctl00_poweredByLBL").blur();

//hide Auto Submit
GM_addStyle((<><![CDATA[
#ctl00_W_TopPagerUI_CBX_AutoS,		
label[for = ctl00_W_TopPagerUI_CBX_AutoS] {visibility:hidden;}	
]]></>).toString());


//add GreaseMonkey Scripts Loaded below "Operator View"
(function m() {
var str1=document.getElementById("ctl00_W_LBL_OPV").innerHTML;
var patt=/Operator View/g;
var result=patt.test(str1);
 if (result==true){
var str2=str1.replace(patt,"      <br />          <br />        GreaseMonkey Scripts Loaded");
document.getElementById("ctl00_W_LBL_OPV").innerHTML=str1+str2;
}
})();

document.getElementById('ctl00_W_preferences1_d12').click();

//One click on the job link opens Job Ticket & put Order Number in fromt of Job Name
//onmousemove
//onfocus
//onload
window.onmousemove=function(){
//***********Cell 1*****************
(function () {
a=document.getElementsByTagName("a")[43];					// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[43].childNodes[0]; 			//x 
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44];					// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[44].childNodes[0];			//x  
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		a=document.getElementsByTagName("a")[46];					// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
			x=document.getElementsByTagName("a")[46].childNodes[0];			//x 
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
			a=document.getElementsByTagName("a")[48];					// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
				x=document.getElementsByTagName("a")[48].childNodes[0];			//x  
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
				a=document.getElementsByTagName("a")[45];					// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
					x=document.getElementsByTagName("a")[45].childNodes[0];			//x 
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
					a=document.getElementsByTagName("a")[47];					// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
						x=document.getElementsByTagName("a")[47].childNodes[0];			//x 
						}
						else {
						alert("Java Script is mixing up the job numbers on Operater View web page!!!"); 
						}
					}
				}
			}
		}
	}
var c = "1"

var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl04_HL_JN").innerHTML=c.fontcolor("#680000").italics()+"_"+(y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl04_HL_JN");
	el.addEventListener("mousedown", function(e) {
		document.getElementById('ctl00_W_RadGrid1_ctl01_ctl04_HL_JN').click();
		document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
		document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 2*****************
(function () {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[44].childNodes[0];		//x 
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[45]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl07_HL_JN") {
		x=document.getElementsByTagName("a")[45].childNodes[0];		//x 
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl07_HL_JN") {
		a=document.getElementsByTagName("a")[47];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl07_HL_JN") {
			x=document.getElementsByTagName("a")[47].childNodes[0];		//x 
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl07_HL_JN") {		
			a=document.getElementsByTagName("a")[50];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl07_HL_JN") {
				x=document.getElementsByTagName("a")[50].childNodes[0];		//x 
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl07_HL_JN") {
				a=document.getElementsByTagName("a")[46];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl07_HL_JN") {
					x=document.getElementsByTagName("a")[46].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl07_HL_JN") {
					a=document.getElementsByTagName("a")[48];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl07_HL_JN") {
						x=document.getElementsByTagName("a")[48].childNodes[0];		//x
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl07_HL_JN") {
						a=document.getElementsByTagName("a")[49];				// 47d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl07_HL_JN") {
							x=document.getElementsByTagName("a")[49].childNodes[0];		//x
							}
						}
					}
				}
			}
		}
	}
var c = "2"
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl07_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+"_"+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl07_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl07_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 3*****************
(function () {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[45].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[46]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {
		x=document.getElementsByTagName("a")[46].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {
		a=document.getElementsByTagName("a")[48];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {
			x=document.getElementsByTagName("a")[48].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {		
			a=document.getElementsByTagName("a")[52];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {
				x=document.getElementsByTagName("a")[52].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {
				a=document.getElementsByTagName("a")[47];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {
					x=document.getElementsByTagName("a")[47].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {
					a=document.getElementsByTagName("a")[49];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {
						x=document.getElementsByTagName("a")[49].childNodes[0];		//x
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {
						a=document.getElementsByTagName("a")[50];				// 46d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {
							x=document.getElementsByTagName("a")[50].childNodes[0];		//x
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {
							a=document.getElementsByTagName("a")[51];				// 47d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl10_HL_JN") {
								x=document.getElementsByTagName("a")[51].childNodes[0];		//x
								}
							}
						}
					}
				}
			}	
		}
	}
var c = "3"
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl10_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+"_"+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl10_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl10_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 4*****************
(function () {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[46].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[47]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
		x=document.getElementsByTagName("a")[47].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
		a=document.getElementsByTagName("a")[49];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
			x=document.getElementsByTagName("a")[49].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {		
			a=document.getElementsByTagName("a")[54];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
				x=document.getElementsByTagName("a")[54].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
				a=document.getElementsByTagName("a")[48];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
					x=document.getElementsByTagName("a")[48].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
					a=document.getElementsByTagName("a")[50];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
						x=document.getElementsByTagName("a")[50].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
						a=document.getElementsByTagName("a")[51];				// 45d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
							x=document.getElementsByTagName("a")[51].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
							a=document.getElementsByTagName("a")[52];				// 46d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
								x=document.getElementsByTagName("a")[52].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
								a=document.getElementsByTagName("a")[53];				// 47d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl13_HL_JN") {
									x=document.getElementsByTagName("a")[53].childNodes[0];		//xx
									}
								}
							}
						}
					}
				}
			}	
		}
	}
var c = "4"
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl13_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+"_"+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl13_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl13_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 5*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[47].childNodes[0];		//x
	document.getElementById("ctl00_W_TopPagerUI__Show").innerHTML=" 43A";
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[48]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
		x=document.getElementsByTagName("a")[48].childNodes[0];		//x
		document.getElementById("ctl00_W_TopPagerUI__Show").innerHTML=" 44A";
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
		a=document.getElementsByTagName("a")[50];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
			x=document.getElementsByTagName("a")[50].childNodes[0];		//x
			document.getElementById("ctl00_W_TopPagerUI__Show").innerHTML=" 46A";
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {		
			a=document.getElementsByTagName("a")[56];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
				x=document.getElementsByTagName("a")[56].childNodes[0];		//x
				document.getElementById("ctl00_W_TopPagerUI__Show").innerHTML=" 48D";
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
				a=document.getElementsByTagName("a")[49];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
					x=document.getElementsByTagName("a")[49].childNodes[0];		//x
					document.getElementById("ctl00_W_TopPagerUI__Show").innerHTML=" 45A";
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
					a=document.getElementsByTagName("a")[51];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
						x=document.getElementsByTagName("a")[51].childNodes[0];		//xx
						document.getElementById("ctl00_W_TopPagerUI__Show").innerHTML=" 47A";
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
						a=document.getElementsByTagName("a")[52];				//44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
							x=document.getElementsByTagName("a")[52].childNodes[0];		//xx
							document.getElementById("ctl00_W_TopPagerUI__Show").innerHTML=" 44D";
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
							a=document.getElementsByTagName("a")[53];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
								x=document.getElementsByTagName("a")[53].childNodes[0];		//xx
								document.getElementById("ctl00_W_TopPagerUI__Show").innerHTML=" 45D";
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
								a=document.getElementsByTagName("a")[54];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
									x=document.getElementsByTagName("a")[54].childNodes[0];		//xx
									document.getElementById("ctl00_W_TopPagerUI__Show").innerHTML=" 46D";
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
									a=document.getElementsByTagName("a")[55];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl16_HL_JN") {
										x=document.getElementsByTagName("a")[55].childNodes[0];		//xx
										document.getElementById("ctl00_W_TopPagerUI__Show").innerHTML=" 47D";
										}
									}
								}
							}
						}
					}
				}
			}	
		}
	}
var c = "5"
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl16_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+"_"+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl16_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl16_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 6*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[48].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[49]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
		x=document.getElementsByTagName("a")[49].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
		a=document.getElementsByTagName("a")[51];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
			x=document.getElementsByTagName("a")[51].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {		
			a=document.getElementsByTagName("a")[58];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
				x=document.getElementsByTagName("a")[58].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
				a=document.getElementsByTagName("a")[50];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
					x=document.getElementsByTagName("a")[50].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
					a=document.getElementsByTagName("a")[52];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
						x=document.getElementsByTagName("a")[52].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
						a=document.getElementsByTagName("a")[54];				//44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
							x=document.getElementsByTagName("a")[54].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
							a=document.getElementsByTagName("a")[55];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
								x=document.getElementsByTagName("a")[55].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
								a=document.getElementsByTagName("a")[56];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
									x=document.getElementsByTagName("a")[56].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
									a=document.getElementsByTagName("a")[57];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl19_HL_JN") {
										x=document.getElementsByTagName("a")[57].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}	
		}
	}
var c = "6"
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl19_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+"_"+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl19_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl19_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 7*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[49].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[50]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
		x=document.getElementsByTagName("a")[50].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
		a=document.getElementsByTagName("a")[52];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
			x=document.getElementsByTagName("a")[52].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {		
			a=document.getElementsByTagName("a")[60];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
				x=document.getElementsByTagName("a")[60].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
				a=document.getElementsByTagName("a")[51];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
					x=document.getElementsByTagName("a")[51].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
					a=document.getElementsByTagName("a")[53];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
						x=document.getElementsByTagName("a")[53].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
						a=document.getElementsByTagName("a")[56];				//44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
							x=document.getElementsByTagName("a")[56].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
							a=document.getElementsByTagName("a")[57];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
								x=document.getElementsByTagName("a")[57].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
								a=document.getElementsByTagName("a")[58];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
									x=document.getElementsByTagName("a")[58].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
									a=document.getElementsByTagName("a")[59];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl22_HL_JN") {
										x=document.getElementsByTagName("a")[59].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}	
		}
	}
var c = "7"
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl22_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+"_"+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl22_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl22_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 8*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[50].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[51]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
		x=document.getElementsByTagName("a")[51].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
		a=document.getElementsByTagName("a")[53];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
			x=document.getElementsByTagName("a")[53].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {		
			a=document.getElementsByTagName("a")[62];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
				x=document.getElementsByTagName("a")[62].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
				a=document.getElementsByTagName("a")[52];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
					x=document.getElementsByTagName("a")[52].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
					a=document.getElementsByTagName("a")[54];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
						x=document.getElementsByTagName("a")[54].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
						a=document.getElementsByTagName("a")[58];				//44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
							x=document.getElementsByTagName("a")[58].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
							a=document.getElementsByTagName("a")[59];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
								x=document.getElementsByTagName("a")[59].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
								a=document.getElementsByTagName("a")[60];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
									x=document.getElementsByTagName("a")[60].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
									a=document.getElementsByTagName("a")[61];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl25_HL_JN") {
										x=document.getElementsByTagName("a")[61].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "8"
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl25_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+"_"+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl25_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl25_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 9*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[51].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[52]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
		x=document.getElementsByTagName("a")[52].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
		a=document.getElementsByTagName("a")[54];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
			x=document.getElementsByTagName("a")[54].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {		
			a=document.getElementsByTagName("a")[64];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
				x=document.getElementsByTagName("a")[64].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
				a=document.getElementsByTagName("a")[53];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
					x=document.getElementsByTagName("a")[53].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
					a=document.getElementsByTagName("a")[55];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
						x=document.getElementsByTagName("a")[55].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
						a=document.getElementsByTagName("a")[60];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
							x=document.getElementsByTagName("a")[60].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
							a=document.getElementsByTagName("a")[61];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
								x=document.getElementsByTagName("a")[61].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
								a=document.getElementsByTagName("a")[62];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
									x=document.getElementsByTagName("a")[62].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
									a=document.getElementsByTagName("a")[63];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl28_HL_JN") {
										x=document.getElementsByTagName("a")[63].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "9"
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl28_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+"_"+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl28_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl28_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 10*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[52].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[53]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
		x=document.getElementsByTagName("a")[53].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
		a=document.getElementsByTagName("a")[55];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
			x=document.getElementsByTagName("a")[55].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {		
			a=document.getElementsByTagName("a")[66];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
				x=document.getElementsByTagName("a")[66].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
				a=document.getElementsByTagName("a")[54];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
					x=document.getElementsByTagName("a")[54].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
					a=document.getElementsByTagName("a")[56];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
						x=document.getElementsByTagName("a")[56].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
						a=document.getElementsByTagName("a")[62];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
							x=document.getElementsByTagName("a")[62].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
							a=document.getElementsByTagName("a")[63];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
								x=document.getElementsByTagName("a")[63].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
								a=document.getElementsByTagName("a")[64];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
									x=document.getElementsByTagName("a")[64].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
									a=document.getElementsByTagName("a")[65];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl31_HL_JN") {
										x=document.getElementsByTagName("a")[65].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "10 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl31_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl31_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl31_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 11*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[53].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[54].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
		a=document.getElementsByTagName("a")[56];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
			x=document.getElementsByTagName("a")[56].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {		
			a=document.getElementsByTagName("a")[68];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
				x=document.getElementsByTagName("a")[68].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
				a=document.getElementsByTagName("a")[55];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
					x=document.getElementsByTagName("a")[55].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
					a=document.getElementsByTagName("a")[57];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
						x=document.getElementsByTagName("a")[57].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
						a=document.getElementsByTagName("a")[64];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
							x=document.getElementsByTagName("a")[64].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
							a=document.getElementsByTagName("a")[65];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
								x=document.getElementsByTagName("a")[65].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
								a=document.getElementsByTagName("a")[66];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
									x=document.getElementsByTagName("a")[66].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
									a=document.getElementsByTagName("a")[67];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl34_HL_JN") {
										x=document.getElementsByTagName("a")[67].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "11 "
var f  = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl34_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl34_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl34_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 12*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[54].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[55].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
		a=document.getElementsByTagName("a")[57];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
			x=document.getElementsByTagName("a")[57].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {		
			a=document.getElementsByTagName("a")[70];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
				x=document.getElementsByTagName("a")[70].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
				a=document.getElementsByTagName("a")[56];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
					x=document.getElementsByTagName("a")[56].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
					a=document.getElementsByTagName("a")[58];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
						x=document.getElementsByTagName("a")[58].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
						a=document.getElementsByTagName("a")[66];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
							x=document.getElementsByTagName("a")[66].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
							a=document.getElementsByTagName("a")[67];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
								x=document.getElementsByTagName("a")[67].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
								a=document.getElementsByTagName("a")[68];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
									x=document.getElementsByTagName("a")[68].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
									a=document.getElementsByTagName("a")[69];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl37_HL_JN") {
										x=document.getElementsByTagName("a")[69].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "12 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl37_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl37_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl37_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 13*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[55].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[56].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
		a=document.getElementsByTagName("a")[58];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
			x=document.getElementsByTagName("a")[58].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {		
			a=document.getElementsByTagName("a")[72];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
				x=document.getElementsByTagName("a")[72].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
				a=document.getElementsByTagName("a")[57];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
					x=document.getElementsByTagName("a")[57].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
					a=document.getElementsByTagName("a")[59];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
						x=document.getElementsByTagName("a")[59].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
						a=document.getElementsByTagName("a")[68];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
							x=document.getElementsByTagName("a")[68].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
							a=document.getElementsByTagName("a")[69];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
								x=document.getElementsByTagName("a")[69].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
								a=document.getElementsByTagName("a")[70];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
									x=document.getElementsByTagName("a")[70].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
									a=document.getElementsByTagName("a")[71];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl40_HL_JN") {
										x=document.getElementsByTagName("a")[71].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "13 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl40_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl40_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl40_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 14*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[56].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[57].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
		a=document.getElementsByTagName("a")[59];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
			x=document.getElementsByTagName("a")[59].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {		
			a=document.getElementsByTagName("a")[74];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
				x=document.getElementsByTagName("a")[74].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
				a=document.getElementsByTagName("a")[58];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
					x=document.getElementsByTagName("a")[58].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
					a=document.getElementsByTagName("a")[60];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
						x=document.getElementsByTagName("a")[60].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
						a=document.getElementsByTagName("a")[70];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
							x=document.getElementsByTagName("a")[70].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
							a=document.getElementsByTagName("a")[71];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
								x=document.getElementsByTagName("a")[71].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
								a=document.getElementsByTagName("a")[72];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
									x=document.getElementsByTagName("a")[72].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
									a=document.getElementsByTagName("a")[73];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl43_HL_JN") {
										x=document.getElementsByTagName("a")[73].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "14 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl43_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl43_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl43_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 15*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[57].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[58].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
		a=document.getElementsByTagName("a")[60];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
			x=document.getElementsByTagName("a")[60].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {		
			a=document.getElementsByTagName("a")[76];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
				x=document.getElementsByTagName("a")[76].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
				a=document.getElementsByTagName("a")[59];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
					x=document.getElementsByTagName("a")[59].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
					a=document.getElementsByTagName("a")[61];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
						x=document.getElementsByTagName("a")[61].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
						a=document.getElementsByTagName("a")[72];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
							x=document.getElementsByTagName("a")[72].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
							a=document.getElementsByTagName("a")[73];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
								x=document.getElementsByTagName("a")[73].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
								a=document.getElementsByTagName("a")[74];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
									x=document.getElementsByTagName("a")[74].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
									a=document.getElementsByTagName("a")[75];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl46_HL_JN") {
										x=document.getElementsByTagName("a")[75].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "15 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl46_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl46_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl46_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 16*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[58].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[59].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
		a=document.getElementsByTagName("a")[61];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
			x=document.getElementsByTagName("a")[61].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {		
			a=document.getElementsByTagName("a")[78];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
				x=document.getElementsByTagName("a")[78].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
				a=document.getElementsByTagName("a")[60];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
					x=document.getElementsByTagName("a")[60].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
					a=document.getElementsByTagName("a")[62];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
						x=document.getElementsByTagName("a")[62].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
						a=document.getElementsByTagName("a")[74];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
							x=document.getElementsByTagName("a")[74].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
							a=document.getElementsByTagName("a")[75];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
								x=document.getElementsByTagName("a")[75].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
								a=document.getElementsByTagName("a")[76];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
									x=document.getElementsByTagName("a")[76].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
									a=document.getElementsByTagName("a")[77];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl49_HL_JN") {
										x=document.getElementsByTagName("a")[77].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "16 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl49_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl49_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl49_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 17*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[59].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[60].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
		a=document.getElementsByTagName("a")[62];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
			x=document.getElementsByTagName("a")[62].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {		
			a=document.getElementsByTagName("a")[80];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
				x=document.getElementsByTagName("a")[80].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
				a=document.getElementsByTagName("a")[61];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
					x=document.getElementsByTagName("a")[61].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
					a=document.getElementsByTagName("a")[63];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
						x=document.getElementsByTagName("a")[63].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
						a=document.getElementsByTagName("a")[76];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
							x=document.getElementsByTagName("a")[76].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
							a=document.getElementsByTagName("a")[77];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
								x=document.getElementsByTagName("a")[77].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
								a=document.getElementsByTagName("a")[78];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
									x=document.getElementsByTagName("a")[78].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
									a=document.getElementsByTagName("a")[79];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl52_HL_JN") {
										x=document.getElementsByTagName("a")[79].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "17 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl52_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl52_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl52_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 18*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[60].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[61].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
		a=document.getElementsByTagName("a")[63];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
			x=document.getElementsByTagName("a")[63].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {		
			a=document.getElementsByTagName("a")[82];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
				x=document.getElementsByTagName("a")[82].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
				a=document.getElementsByTagName("a")[62];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
					x=document.getElementsByTagName("a")[62].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
					a=document.getElementsByTagName("a")[64];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
						x=document.getElementsByTagName("a")[64].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
						a=document.getElementsByTagName("a")[78];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
							x=document.getElementsByTagName("a")[78].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
							a=document.getElementsByTagName("a")[79];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
								x=document.getElementsByTagName("a")[79].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
								a=document.getElementsByTagName("a")[80];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
									x=document.getElementsByTagName("a")[80].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
									a=document.getElementsByTagName("a")[81];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl55_HL_JN") {
										x=document.getElementsByTagName("a")[81].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "18 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl55_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl55_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl55_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 19*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[61].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[62].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
		a=document.getElementsByTagName("a")[64];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
			x=document.getElementsByTagName("a")[64].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {		
			a=document.getElementsByTagName("a")[84];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
				x=document.getElementsByTagName("a")[84].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
				a=document.getElementsByTagName("a")[63];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
					x=document.getElementsByTagName("a")[63].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
					a=document.getElementsByTagName("a")[65];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
						x=document.getElementsByTagName("a")[65].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
						a=document.getElementsByTagName("a")[80];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
							x=document.getElementsByTagName("a")[80].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
							a=document.getElementsByTagName("a")[81];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
								x=document.getElementsByTagName("a")[81].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
								a=document.getElementsByTagName("a")[82];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
									x=document.getElementsByTagName("a")[82].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
									a=document.getElementsByTagName("a")[83];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl58_HL_JN") {
										x=document.getElementsByTagName("a")[83].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "19 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl58_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl58_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl58_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 20*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[62].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[63].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
		a=document.getElementsByTagName("a")[65];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
			x=document.getElementsByTagName("a")[65].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {		
			a=document.getElementsByTagName("a")[86];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
				x=document.getElementsByTagName("a")[86].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
				a=document.getElementsByTagName("a")[64];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
					x=document.getElementsByTagName("a")[64].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
					a=document.getElementsByTagName("a")[66];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
						x=document.getElementsByTagName("a")[66].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
						a=document.getElementsByTagName("a")[82];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
							x=document.getElementsByTagName("a")[82].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
							a=document.getElementsByTagName("a")[83];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
								x=document.getElementsByTagName("a")[83].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
								a=document.getElementsByTagName("a")[84];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
									x=document.getElementsByTagName("a")[84].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
									a=document.getElementsByTagName("a")[85];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl61_HL_JN") {
										x=document.getElementsByTagName("a")[85].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "20 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl61_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl61_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl61_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 21*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[63].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[64].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
		a=document.getElementsByTagName("a")[66];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
			x=document.getElementsByTagName("a")[66].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {		
			a=document.getElementsByTagName("a")[88];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
				x=document.getElementsByTagName("a")[88].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
				a=document.getElementsByTagName("a")[65];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
					x=document.getElementsByTagName("a")[65].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
					a=document.getElementsByTagName("a")[67];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
						x=document.getElementsByTagName("a")[67].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
						a=document.getElementsByTagName("a")[84];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
							x=document.getElementsByTagName("a")[84].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
							a=document.getElementsByTagName("a")[85];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
								x=document.getElementsByTagName("a")[85].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
								a=document.getElementsByTagName("a")[86];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
									x=document.getElementsByTagName("a")[86].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
									a=document.getElementsByTagName("a")[87];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl64_HL_JN") {
										x=document.getElementsByTagName("a")[87].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "21 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl64_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl64_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl64_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 22*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[64].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[65].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
		a=document.getElementsByTagName("a")[67];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
			x=document.getElementsByTagName("a")[67].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {		
			a=document.getElementsByTagName("a")[90];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
				x=document.getElementsByTagName("a")[90].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
				a=document.getElementsByTagName("a")[66];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
					x=document.getElementsByTagName("a")[66].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
					a=document.getElementsByTagName("a")[68];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
						x=document.getElementsByTagName("a")[68].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
						a=document.getElementsByTagName("a")[86];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
							x=document.getElementsByTagName("a")[86].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
							a=document.getElementsByTagName("a")[87];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
								x=document.getElementsByTagName("a")[87].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
								a=document.getElementsByTagName("a")[88];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
									x=document.getElementsByTagName("a")[88].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
									a=document.getElementsByTagName("a")[89];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl67_HL_JN") {
										x=document.getElementsByTagName("a")[89].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "22 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl67_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl67_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl67_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 23*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[65].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[66].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
		a=document.getElementsByTagName("a")[68];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
			x=document.getElementsByTagName("a")[68].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {		
			a=document.getElementsByTagName("a")[92];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
				x=document.getElementsByTagName("a")[92].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
				a=document.getElementsByTagName("a")[67];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
					x=document.getElementsByTagName("a")[67].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
					a=document.getElementsByTagName("a")[69];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
						x=document.getElementsByTagName("a")[69].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
						a=document.getElementsByTagName("a")[88];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
							x=document.getElementsByTagName("a")[88].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
							a=document.getElementsByTagName("a")[89];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
								x=document.getElementsByTagName("a")[89].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
								a=document.getElementsByTagName("a")[90];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
									x=document.getElementsByTagName("a")[90].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
									a=document.getElementsByTagName("a")[91];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl70_HL_JN") {
										x=document.getElementsByTagName("a")[91].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "23 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl70_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl70_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl70_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 24*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[66].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[67].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
		a=document.getElementsByTagName("a")[69];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
			x=document.getElementsByTagName("a")[69].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {		
			a=document.getElementsByTagName("a")[94];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
				x=document.getElementsByTagName("a")[94].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
				a=document.getElementsByTagName("a")[68];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
					x=document.getElementsByTagName("a")[68].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
					a=document.getElementsByTagName("a")[70];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
						x=document.getElementsByTagName("a")[70].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
						a=document.getElementsByTagName("a")[90];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
							x=document.getElementsByTagName("a")[90].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
							a=document.getElementsByTagName("a")[91];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
								x=document.getElementsByTagName("a")[91].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
								a=document.getElementsByTagName("a")[92];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
									x=document.getElementsByTagName("a")[92].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
									a=document.getElementsByTagName("a")[93];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl73_HL_JN") {
										x=document.getElementsByTagName("a")[93].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "24 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl73_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl73_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl73_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 25*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[67].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[68].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
		a=document.getElementsByTagName("a")[70];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
			x=document.getElementsByTagName("a")[70].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {		
			a=document.getElementsByTagName("a")[96];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
				x=document.getElementsByTagName("a")[96].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
				a=document.getElementsByTagName("a")[69];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
					x=document.getElementsByTagName("a")[69].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
					a=document.getElementsByTagName("a")[71];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
						x=document.getElementsByTagName("a")[71].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
						a=document.getElementsByTagName("a")[92];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
							x=document.getElementsByTagName("a")[92].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
							a=document.getElementsByTagName("a")[93];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
								x=document.getElementsByTagName("a")[93].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
								a=document.getElementsByTagName("a")[94];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
									x=document.getElementsByTagName("a")[94].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
									a=document.getElementsByTagName("a")[95];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl76_HL_JN") {
										x=document.getElementsByTagName("a")[95].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "25 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl76_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl76_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl76_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 26*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[68].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[69].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
		a=document.getElementsByTagName("a")[71];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
			x=document.getElementsByTagName("a")[71].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {		
			a=document.getElementsByTagName("a")[98];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
				x=document.getElementsByTagName("a")[98].childNodes[0];		//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
				a=document.getElementsByTagName("a")[70];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
					x=document.getElementsByTagName("a")[70].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
					a=document.getElementsByTagName("a")[72];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
						x=document.getElementsByTagName("a")[72].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
						a=document.getElementsByTagName("a")[94];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
							x=document.getElementsByTagName("a")[94].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
							a=document.getElementsByTagName("a")[95];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
								x=document.getElementsByTagName("a")[95].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
								a=document.getElementsByTagName("a")[96];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
									x=document.getElementsByTagName("a")[96].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
									a=document.getElementsByTagName("a")[97];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl79_HL_JN") {
										x=document.getElementsByTagName("a")[97].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "26 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl79_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl79_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl79_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 27*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[69].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[70].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
		a=document.getElementsByTagName("a")[72];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
			x=document.getElementsByTagName("a")[72].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {		
			a=document.getElementsByTagName("a")[100];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
				x=document.getElementsByTagName("a")[100].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
				a=document.getElementsByTagName("a")[71];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
					x=document.getElementsByTagName("a")[71].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
					a=document.getElementsByTagName("a")[73];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
						x=document.getElementsByTagName("a")[73].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
						a=document.getElementsByTagName("a")[96];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
							x=document.getElementsByTagName("a")[96].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
							a=document.getElementsByTagName("a")[97];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
								x=document.getElementsByTagName("a")[97].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
								a=document.getElementsByTagName("a")[98];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
									x=document.getElementsByTagName("a")[98].childNodes[0];		//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
									a=document.getElementsByTagName("a")[99];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl82_HL_JN") {
										x=document.getElementsByTagName("a")[99].childNodes[0];		//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "27 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl82_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl82_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl82_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 28*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[70].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[71].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
		a=document.getElementsByTagName("a")[73];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
			x=document.getElementsByTagName("a")[73].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {		
			a=document.getElementsByTagName("a")[102];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
				x=document.getElementsByTagName("a")[102].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
				a=document.getElementsByTagName("a")[72];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
					x=document.getElementsByTagName("a")[72].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
					a=document.getElementsByTagName("a")[74];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
						x=document.getElementsByTagName("a")[74].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
						a=document.getElementsByTagName("a")[98];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
							x=document.getElementsByTagName("a")[98].childNodes[0];		//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
							a=document.getElementsByTagName("a")[99];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
								x=document.getElementsByTagName("a")[99].childNodes[0];		//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
								a=document.getElementsByTagName("a")[100];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
									x=document.getElementsByTagName("a")[100].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
									a=document.getElementsByTagName("a")[101];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl85_HL_JN") {
										x=document.getElementsByTagName("a")[101].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "28 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl85_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl85_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl85_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 29*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[71].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[72].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
		a=document.getElementsByTagName("a")[74];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
			x=document.getElementsByTagName("a")[74].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {		
			a=document.getElementsByTagName("a")[104];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
				x=document.getElementsByTagName("a")[104].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
				a=document.getElementsByTagName("a")[73];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
					x=document.getElementsByTagName("a")[73].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
					a=document.getElementsByTagName("a")[75];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
						x=document.getElementsByTagName("a")[75].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
						a=document.getElementsByTagName("a")[100];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
							x=document.getElementsByTagName("a")[100].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
							a=document.getElementsByTagName("a")[101];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
								x=document.getElementsByTagName("a")[101].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
								a=document.getElementsByTagName("a")[102];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
									x=document.getElementsByTagName("a")[102].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
									a=document.getElementsByTagName("a")[103];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl88_HL_JN") {
										x=document.getElementsByTagName("a")[103].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "29 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl88_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl88_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl88_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 30*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[72].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[73].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
		a=document.getElementsByTagName("a")[75];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
			x=document.getElementsByTagName("a")[75].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {		
			a=document.getElementsByTagName("a")[106];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
				x=document.getElementsByTagName("a")[106].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
				a=document.getElementsByTagName("a")[74];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
					x=document.getElementsByTagName("a")[74].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
					a=document.getElementsByTagName("a")[76];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
						x=document.getElementsByTagName("a")[76].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
						a=document.getElementsByTagName("a")[102];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
							x=document.getElementsByTagName("a")[102].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
							a=document.getElementsByTagName("a")[103];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
								x=document.getElementsByTagName("a")[103].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
								a=document.getElementsByTagName("a")[104];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
									x=document.getElementsByTagName("a")[104].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
									a=document.getElementsByTagName("a")[105];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl91_HL_JN") {
										x=document.getElementsByTagName("a")[105].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "30 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl91_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl91_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl91_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 31*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[73].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[74].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
		a=document.getElementsByTagName("a")[76];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
			x=document.getElementsByTagName("a")[76].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {		
			a=document.getElementsByTagName("a")[108];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
				x=document.getElementsByTagName("a")[108].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
				a=document.getElementsByTagName("a")[75];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
					x=document.getElementsByTagName("a")[75].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
					a=document.getElementsByTagName("a")[77];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
						x=document.getElementsByTagName("a")[77].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
						a=document.getElementsByTagName("a")[104];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
							x=document.getElementsByTagName("a")[104].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
							a=document.getElementsByTagName("a")[105];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
								x=document.getElementsByTagName("a")[105].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
								a=document.getElementsByTagName("a")[106];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
									x=document.getElementsByTagName("a")[106].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
									a=document.getElementsByTagName("a")[107];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl94_HL_JN") {
										x=document.getElementsByTagName("a")[107].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "31 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl94_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl94_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl94_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 32*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[74].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[75].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
		a=document.getElementsByTagName("a")[77];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
			x=document.getElementsByTagName("a")[77].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {		
			a=document.getElementsByTagName("a")[110];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
				x=document.getElementsByTagName("a")[110].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
				a=document.getElementsByTagName("a")[76];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
					x=document.getElementsByTagName("a")[76].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
					a=document.getElementsByTagName("a")[78];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
						x=document.getElementsByTagName("a")[78].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
						a=document.getElementsByTagName("a")[106];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
							x=document.getElementsByTagName("a")[106].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
							a=document.getElementsByTagName("a")[107];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
								x=document.getElementsByTagName("a")[107].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
								a=document.getElementsByTagName("a")[108];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
									x=document.getElementsByTagName("a")[108].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
									a=document.getElementsByTagName("a")[109];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl97_HL_JN") {
										x=document.getElementsByTagName("a")[109].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "32 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl97_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl97_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl97_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 33*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[75].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[76].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
		a=document.getElementsByTagName("a")[78];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
			x=document.getElementsByTagName("a")[78].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {		
			a=document.getElementsByTagName("a")[112];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
				x=document.getElementsByTagName("a")[112].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
				a=document.getElementsByTagName("a")[77];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
					x=document.getElementsByTagName("a")[77].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
					a=document.getElementsByTagName("a")[79];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
						x=document.getElementsByTagName("a")[79].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
						a=document.getElementsByTagName("a")[108];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
							x=document.getElementsByTagName("a")[108].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
							a=document.getElementsByTagName("a")[109];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
								x=document.getElementsByTagName("a")[109].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
								a=document.getElementsByTagName("a")[110];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
									x=document.getElementsByTagName("a")[110].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
									a=document.getElementsByTagName("a")[111];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl100_HL_JN") {
										x=document.getElementsByTagName("a")[111].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "33 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl100_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl100_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl100_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 34*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[76].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[77].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
		a=document.getElementsByTagName("a")[79];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
			x=document.getElementsByTagName("a")[79].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {		
			a=document.getElementsByTagName("a")[114];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
				x=document.getElementsByTagName("a")[114].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
				a=document.getElementsByTagName("a")[78];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
					x=document.getElementsByTagName("a")[78].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
					a=document.getElementsByTagName("a")[80];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
						x=document.getElementsByTagName("a")[80].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
						a=document.getElementsByTagName("a")[110];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
							x=document.getElementsByTagName("a")[110].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
							a=document.getElementsByTagName("a")[111];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
								x=document.getElementsByTagName("a")[111].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
								a=document.getElementsByTagName("a")[112];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
									x=document.getElementsByTagName("a")[112].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
									a=document.getElementsByTagName("a")[113];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl103_HL_JN") {
										x=document.getElementsByTagName("a")[113].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "34 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl103_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl103_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl103_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 35*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[77].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[78].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
		a=document.getElementsByTagName("a")[80];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
			x=document.getElementsByTagName("a")[80].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {		
			a=document.getElementsByTagName("a")[116];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
				x=document.getElementsByTagName("a")[116].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
				a=document.getElementsByTagName("a")[79];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
					x=document.getElementsByTagName("a")[79].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
					a=document.getElementsByTagName("a")[81];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
						x=document.getElementsByTagName("a")[81].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
						a=document.getElementsByTagName("a")[112];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
							x=document.getElementsByTagName("a")[112].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
							a=document.getElementsByTagName("a")[113];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
								x=document.getElementsByTagName("a")[113].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
								a=document.getElementsByTagName("a")[114];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
									x=document.getElementsByTagName("a")[114].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
									a=document.getElementsByTagName("a")[115];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl106_HL_JN") {
										x=document.getElementsByTagName("a")[115].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "35 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl106_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl106_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl106_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 36*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[78].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[79].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
		a=document.getElementsByTagName("a")[81];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
			x=document.getElementsByTagName("a")[81].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {		
			a=document.getElementsByTagName("a")[118];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
				x=document.getElementsByTagName("a")[118].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
				a=document.getElementsByTagName("a")[80];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
					x=document.getElementsByTagName("a")[80].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
					a=document.getElementsByTagName("a")[82];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
						x=document.getElementsByTagName("a")[82].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
						a=document.getElementsByTagName("a")[114];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
							x=document.getElementsByTagName("a")[114].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
							a=document.getElementsByTagName("a")[115];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
								x=document.getElementsByTagName("a")[115].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
								a=document.getElementsByTagName("a")[116];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
									x=document.getElementsByTagName("a")[116].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
									a=document.getElementsByTagName("a")[117];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl109_HL_JN") {
										x=document.getElementsByTagName("a")[117].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "36 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl109_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl109_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl109_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 37*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[79].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[80].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
		a=document.getElementsByTagName("a")[82];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
			x=document.getElementsByTagName("a")[82].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {		
			a=document.getElementsByTagName("a")[120];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
				x=document.getElementsByTagName("a")[120].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
				a=document.getElementsByTagName("a")[81];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
					x=document.getElementsByTagName("a")[81].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
					a=document.getElementsByTagName("a")[83];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
						x=document.getElementsByTagName("a")[83].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
						a=document.getElementsByTagName("a")[116];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
							x=document.getElementsByTagName("a")[116].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
							a=document.getElementsByTagName("a")[117];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
								x=document.getElementsByTagName("a")[117].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
								a=document.getElementsByTagName("a")[118];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
									x=document.getElementsByTagName("a")[118].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
									a=document.getElementsByTagName("a")[119];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl112_HL_JN") {
										x=document.getElementsByTagName("a")[119].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "37 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl112_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl112_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl112_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 38*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[80].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[81].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
		a=document.getElementsByTagName("a")[83];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
			x=document.getElementsByTagName("a")[83].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {		
			a=document.getElementsByTagName("a")[122];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
				x=document.getElementsByTagName("a")[122].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
				a=document.getElementsByTagName("a")[82];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
					x=document.getElementsByTagName("a")[82].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
					a=document.getElementsByTagName("a")[84];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
						x=document.getElementsByTagName("a")[84].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
						a=document.getElementsByTagName("a")[118];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
							x=document.getElementsByTagName("a")[118].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
							a=document.getElementsByTagName("a")[119];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
								x=document.getElementsByTagName("a")[119].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
								a=document.getElementsByTagName("a")[120];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
									x=document.getElementsByTagName("a")[120].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
									a=document.getElementsByTagName("a")[121];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl115_HL_JN") {
										x=document.getElementsByTagName("a")[121].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "38 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl115_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl115_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl115_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 39*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[81].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[82].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
		a=document.getElementsByTagName("a")[84];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
			x=document.getElementsByTagName("a")[84].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {		
			a=document.getElementsByTagName("a")[124];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
				x=document.getElementsByTagName("a")[124].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
				a=document.getElementsByTagName("a")[83];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
					x=document.getElementsByTagName("a")[83].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
					a=document.getElementsByTagName("a")[85];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
						x=document.getElementsByTagName("a")[85].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
						a=document.getElementsByTagName("a")[120];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
							x=document.getElementsByTagName("a")[120].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
							a=document.getElementsByTagName("a")[121];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
								x=document.getElementsByTagName("a")[121].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
								a=document.getElementsByTagName("a")[122];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
									x=document.getElementsByTagName("a")[122].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
									a=document.getElementsByTagName("a")[123];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl118_HL_JN") {
										x=document.getElementsByTagName("a")[123].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "39 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl118_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl118_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl118_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 40*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[82].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[83].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
		a=document.getElementsByTagName("a")[85];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
			x=document.getElementsByTagName("a")[85].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {		
			a=document.getElementsByTagName("a")[126];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
				x=document.getElementsByTagName("a")[126].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
				a=document.getElementsByTagName("a")[84];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
					x=document.getElementsByTagName("a")[84].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
					a=document.getElementsByTagName("a")[86];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
						x=document.getElementsByTagName("a")[86].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
						a=document.getElementsByTagName("a")[122];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
							x=document.getElementsByTagName("a")[122].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
							a=document.getElementsByTagName("a")[123];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
								x=document.getElementsByTagName("a")[123].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
								a=document.getElementsByTagName("a")[124];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
									x=document.getElementsByTagName("a")[124].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
									a=document.getElementsByTagName("a")[125];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl121_HL_JN") {
										x=document.getElementsByTagName("a")[125].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "40 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl121_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl121_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl121_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 41*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[83].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[84].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
		a=document.getElementsByTagName("a")[86];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
			x=document.getElementsByTagName("a")[86].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {		
			a=document.getElementsByTagName("a")[128];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
				x=document.getElementsByTagName("a")[128].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
				a=document.getElementsByTagName("a")[85];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
					x=document.getElementsByTagName("a")[85].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
					a=document.getElementsByTagName("a")[87];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
						x=document.getElementsByTagName("a")[87].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
						a=document.getElementsByTagName("a")[124];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
							x=document.getElementsByTagName("a")[124].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
							a=document.getElementsByTagName("a")[125];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
								x=document.getElementsByTagName("a")[125].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
								a=document.getElementsByTagName("a")[126];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
									x=document.getElementsByTagName("a")[126].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
									a=document.getElementsByTagName("a")[127];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl124_HL_JN") {
										x=document.getElementsByTagName("a")[127].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "41 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl124_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl124_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl124_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 42*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[84].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[85].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
		a=document.getElementsByTagName("a")[87];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
			x=document.getElementsByTagName("a")[87].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {		
			a=document.getElementsByTagName("a")[130];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
				x=document.getElementsByTagName("a")[130].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
				a=document.getElementsByTagName("a")[86];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
					x=document.getElementsByTagName("a")[86].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
					a=document.getElementsByTagName("a")[88];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
						x=document.getElementsByTagName("a")[88].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
						a=document.getElementsByTagName("a")[126];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
							x=document.getElementsByTagName("a")[126].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
							a=document.getElementsByTagName("a")[127];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
								x=document.getElementsByTagName("a")[127].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
								a=document.getElementsByTagName("a")[128];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
									x=document.getElementsByTagName("a")[128].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
									a=document.getElementsByTagName("a")[129];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl127_HL_JN") {
										x=document.getElementsByTagName("a")[129].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "42 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl127_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl127_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl127_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 43*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[85].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[86].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
		a=document.getElementsByTagName("a")[88];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
			x=document.getElementsByTagName("a")[88].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {		
			a=document.getElementsByTagName("a")[132];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
				x=document.getElementsByTagName("a")[132].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
				a=document.getElementsByTagName("a")[87];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
					x=document.getElementsByTagName("a")[87].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
					a=document.getElementsByTagName("a")[89];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
						x=document.getElementsByTagName("a")[89].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
						a=document.getElementsByTagName("a")[128];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
							x=document.getElementsByTagName("a")[128].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
							a=document.getElementsByTagName("a")[129];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
								x=document.getElementsByTagName("a")[129].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
								a=document.getElementsByTagName("a")[130];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
									x=document.getElementsByTagName("a")[130].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
									a=document.getElementsByTagName("a")[131];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl130_HL_JN") {
										x=document.getElementsByTagName("a")[131].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "43 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl130_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl130_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl130_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 44*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[86].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[87].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
		a=document.getElementsByTagName("a")[89];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
			x=document.getElementsByTagName("a")[89].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {		
			a=document.getElementsByTagName("a")[134];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
				x=document.getElementsByTagName("a")[134].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
				a=document.getElementsByTagName("a")[88];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
					x=document.getElementsByTagName("a")[88].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
					a=document.getElementsByTagName("a")[90];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
						x=document.getElementsByTagName("a")[90].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
						a=document.getElementsByTagName("a")[130];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
							x=document.getElementsByTagName("a")[130].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
							a=document.getElementsByTagName("a")[131];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
								x=document.getElementsByTagName("a")[131].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
								a=document.getElementsByTagName("a")[132];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
									x=document.getElementsByTagName("a")[132].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
									a=document.getElementsByTagName("a")[133];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl133_HL_JN") {
										x=document.getElementsByTagName("a")[133].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "44 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl133_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl133_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl133_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 45*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[87].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[88].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
		a=document.getElementsByTagName("a")[90];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
			x=document.getElementsByTagName("a")[90].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {		
			a=document.getElementsByTagName("a")[136];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
				x=document.getElementsByTagName("a")[136].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
				a=document.getElementsByTagName("a")[89];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
					x=document.getElementsByTagName("a")[89].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
					a=document.getElementsByTagName("a")[91];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
						x=document.getElementsByTagName("a")[91].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
						a=document.getElementsByTagName("a")[132];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
							x=document.getElementsByTagName("a")[132].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
							a=document.getElementsByTagName("a")[133];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
								x=document.getElementsByTagName("a")[133].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
								a=document.getElementsByTagName("a")[134];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
									x=document.getElementsByTagName("a")[134].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
									a=document.getElementsByTagName("a")[135];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl136_HL_JN") {
										x=document.getElementsByTagName("a")[135].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "45 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl136_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl136_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl136_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 46*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[88].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[89].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
		a=document.getElementsByTagName("a")[91];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
			x=document.getElementsByTagName("a")[91].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {		
			a=document.getElementsByTagName("a")[138];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
				x=document.getElementsByTagName("a")[138].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
				a=document.getElementsByTagName("a")[90];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
					x=document.getElementsByTagName("a")[90].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
					a=document.getElementsByTagName("a")[92];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
						x=document.getElementsByTagName("a")[92].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
						a=document.getElementsByTagName("a")[134];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
							x=document.getElementsByTagName("a")[134].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
							a=document.getElementsByTagName("a")[135];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
								x=document.getElementsByTagName("a")[135].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
								a=document.getElementsByTagName("a")[136];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
									x=document.getElementsByTagName("a")[136].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
									a=document.getElementsByTagName("a")[137];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl139_HL_JN") {
										x=document.getElementsByTagName("a")[137].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "46 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl139_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl139_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl139_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 47*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[89].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[90].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
		a=document.getElementsByTagName("a")[92];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
			x=document.getElementsByTagName("a")[92].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {		
			a=document.getElementsByTagName("a")[140];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
				x=document.getElementsByTagName("a")[140].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
				a=document.getElementsByTagName("a")[91];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
					x=document.getElementsByTagName("a")[91].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
					a=document.getElementsByTagName("a")[93];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
						x=document.getElementsByTagName("a")[93].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
						a=document.getElementsByTagName("a")[136];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
							x=document.getElementsByTagName("a")[136].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
							a=document.getElementsByTagName("a")[137];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
								x=document.getElementsByTagName("a")[137].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
								a=document.getElementsByTagName("a")[138];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
									x=document.getElementsByTagName("a")[138].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
									a=document.getElementsByTagName("a")[139];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl142_HL_JN") {
										x=document.getElementsByTagName("a")[139].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "47 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl142_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl142_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl142_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 48*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[90].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[91].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
		a=document.getElementsByTagName("a")[93];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
			x=document.getElementsByTagName("a")[93].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {		
			a=document.getElementsByTagName("a")[142];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
				x=document.getElementsByTagName("a")[142].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
				a=document.getElementsByTagName("a")[92];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
					x=document.getElementsByTagName("a")[92].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
					a=document.getElementsByTagName("a")[94];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
						x=document.getElementsByTagName("a")[94].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
						a=document.getElementsByTagName("a")[138];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
							x=document.getElementsByTagName("a")[138].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
							a=document.getElementsByTagName("a")[139];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
								x=document.getElementsByTagName("a")[139].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
								a=document.getElementsByTagName("a")[140];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
									x=document.getElementsByTagName("a")[140].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
									a=document.getElementsByTagName("a")[141];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl145_HL_JN") {
										x=document.getElementsByTagName("a")[141].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "48 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl145_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl145_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl145_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 49*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[91].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[92].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
		a=document.getElementsByTagName("a")[94];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
			x=document.getElementsByTagName("a")[94].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {		
			a=document.getElementsByTagName("a")[144];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
				x=document.getElementsByTagName("a")[144].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
				a=document.getElementsByTagName("a")[93];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
					x=document.getElementsByTagName("a")[93].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
					a=document.getElementsByTagName("a")[95];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
						x=document.getElementsByTagName("a")[95].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
						a=document.getElementsByTagName("a")[140];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
							x=document.getElementsByTagName("a")[140].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
							a=document.getElementsByTagName("a")[141];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
								x=document.getElementsByTagName("a")[141].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
								a=document.getElementsByTagName("a")[142];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
									x=document.getElementsByTagName("a")[142].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
									a=document.getElementsByTagName("a")[143];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl148_HL_JN") {
										x=document.getElementsByTagName("a")[143].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "49 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl148_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl148_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl148_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();

//***********Cell 50*****************
(function() {
a=document.getElementsByTagName("a")[43];				// 43a
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[92].childNodes[0];		//x
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[44]; 				// 44a
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[93].childNodes[0];		//x
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
		a=document.getElementsByTagName("a")[95];				// 46a
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
			x=document.getElementsByTagName("a")[95].childNodes[0];		//x
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {		
			a=document.getElementsByTagName("a")[146];				// 48d
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
				x=document.getElementsByTagName("a")[146].childNodes[0];	//x
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
				a=document.getElementsByTagName("a")[94];				// 45a
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
					x=document.getElementsByTagName("a")[94].childNodes[0];		//x
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
					a=document.getElementsByTagName("a")[96];				// 47a
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
						x=document.getElementsByTagName("a")[96].childNodes[0];		//xx
						}
						if (b !=="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
						a=document.getElementsByTagName("a")[142];				// 44d
						b = a.getAttribute("id");
							if (b =="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
							x=document.getElementsByTagName("a")[142].childNodes[0];	//xx
							}
							if (b !=="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
							a=document.getElementsByTagName("a")[143];				// 45d
							b = a.getAttribute("id");
								if (b =="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
								x=document.getElementsByTagName("a")[143].childNodes[0];	//xx
								}
								if (b !=="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
								a=document.getElementsByTagName("a")[144];				// 46d
								b = a.getAttribute("id");
									if (b =="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
									x=document.getElementsByTagName("a")[144].childNodes[0];	//xx
									}
									if (b !=="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
									a=document.getElementsByTagName("a")[145];				// 47d
									b = a.getAttribute("id");
										if (b =="ctl00_W_RadGrid1_ctl01_ctl151_HL_JN") {
										x=document.getElementsByTagName("a")[145].childNodes[0];	//xx
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
var c = "50 "
var f = x.length;
var b = f-10;
var y=x.splitText(b);
document.getElementById("ctl00_W_RadGrid1_ctl01_ctl151_HL_JN").innerHTML=(c.fontcolor("#680000").italics()+y.nodeValue.bold().fontsize(1) + " "+x.nodeValue);
})();
(function() {
var el = document.getElementById("ctl00_W_RadGrid1_ctl01_ctl151_HL_JN");
	el.addEventListener("mousedown", function(e) {
			document.getElementById('ctl00_W_RadGrid1_ctl01_ctl151_HL_JN').click();
			document.getElementById("ctl00_W_ContextMenu").style.visibility="hidden"
			document.getElementById('ctl00_W_ContextMenu_m5').click();
	 }, true);
})();
};

//********Press GO key when "Enter" is pressed
(function() {
  document.addEventListener("keypress", function(e) {
    if(!e) e=window.event;
    var key = e.keyCode ? e.keyCode : e.which;
    if ( key == 13 ) { 
	document.getElementById('ctl00_W_BTN_Go').click();
    }
  }, true);

})();

//Block Java sript update(JRE) warning
document.getElementById("alertpopup").style.display="none";

//F8 is to clear F9 is to load "\" is to assign jobs to ARS busness cards, "]" is to assign jobs to Ashley "[" is to asign jobs to operator
(function() {
document.getElementById("ctl00_H").blur();
unsafeWindow.focus(); 
  document.addEventListener("keyup", function(e) {
    if(! e ) e=window.event;
    var key = e.keyCode ? e.keyCode : e.which;
	if ( key == 119 ) { 
//alert("Clear"); 
	document.getElementById('ctl00_W_ContextMenu_m2').click();
    }
    if ( key == 120 ) { 
//alert("Load"); 
	document.getElementById('ctl00_W_ContextMenu_m0').click();
    }
    if ( key == 27 ) { 
//alert("Load"); 
	document.getElementById('ctl00_HLK_Admin').click();
    }
 if ( key == 220 ) { 
	var kx = document.getElementById('ctl00_W_TopPagerUI_DDL_Operator');
	kx.options[5].selected=true;
	var k = document.getElementById('ctl00_W_TopPagerUI_DDL_Output');
	k.options[4].selected=true;
	document.getElementById("ctl00_W_TopPagerUI_BTN_Update").disabled=false;
	document.getElementById('ctl00_W_TopPagerUI_BTN_Update').mouseover();
	document.getElementById('ctl00_W_TopPagerUI_BTN_Update').click();
}
 if ( key == 221 ) { 
	var kx = document.getElementById('ctl00_W_TopPagerUI_DDL_Operator');
	kx.options[7].selected=true;
	var k = document.getElementById('ctl00_W_TopPagerUI_DDL_Output');
	k.options[7].selected=true;
	document.getElementById("ctl00_W_TopPagerUI_BTN_Update").disabled=false;
	document.getElementById('ctl00_W_TopPagerUI_BTN_Update').mouseover();
	document.getElementById('ctl00_W_TopPagerUI_BTN_Update').click();
}
if ( key == 219 ) { 
	var kx = document.getElementById('ctl00_W_TopPagerUI_DDL_Operator');
	kx.options[1].selected=true;
	var k = document.getElementById('ctl00_W_TopPagerUI_DDL_Output');
	k.options[5].selected=true;
	document.getElementById("ctl00_W_TopPagerUI_BTN_Update").disabled=false;
	document.getElementById('ctl00_W_TopPagerUI_BTN_Update').mouseover();
	document.getElementById('ctl00_W_TopPagerUI_BTN_Update').click();
}
if ( key == 123 ) { 
a=document.getElementsByTagName("a")[48];
b = a.getAttribute("id");
	if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	x=document.getElementsByTagName("a")[44];
	}
	if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
	a=document.getElementsByTagName("a")[43];
	b = a.getAttribute("id");
		if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		x=document.getElementsByTagName("a")[39];
		}
		if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
		a=document.getElementsByTagName("a")[44];
		b = a.getAttribute("id");
			if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
			x=document.getElementsByTagName("a")[40];
			}
			if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
			a=document.getElementsByTagName("a")[45];
			b = a.getAttribute("id");
				if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
				x=document.getElementsByTagName("a")[41];
				}
				if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
				a=document.getElementsByTagName("a")[46];
				b = a.getAttribute("id");
					if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
					x=document.getElementsByTagName("a")[42];
					}
					if (b !=="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
					a=document.getElementsByTagName("a")[47];
					b = a.getAttribute("id");
						if (b =="ctl00_W_RadGrid1_ctl01_ctl04_HL_JN") {
						x=document.getElementsByTagName("a")[43];
						}
						else {
						alert("There is no records to display or " + '\n' + "Java Script is mixing up the job numbers on this page!!!"); 
						}
					}
				}
			}
		}
	}
x.click();
}
  }, true);

})();


//Removes '1-' from '1-xx of xx' jobs
(function o() {
var str=document.getElementById("ctl00_W_TopPagerUI_ItemsNNofMLabel").innerHTML;
var patt=/1-/g;
var result=patt.test(str);
 if (result==true){
var str2=str.replace(patt,"");
document.getElementById("ctl00_W_TopPagerUI_ItemsNNofMLabel").innerHTML=str2; 
}
})();
