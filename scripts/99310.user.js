// ==UserScript==
// @name           hup
// @namespace      huplol
// @description    asdasd
// @include        http://hup.hu/*
// ==/UserScript==

var hup = {
	replaceNodeLinks: function() {
		var table_all = document.getElementsByTagName('TABLE');
		var myobj = this.markThread.loadStatus('all');
		for (var i=0; i<table_all.length; i++) {
			var curtable = table_all[i];
			if (curtable.parentNode.tagName == 'DIV' && curtable.parentNode.className == 'content') {
				var a_all = curtable.getElementsByTagName('A');
				for (var j=0; j<a_all.length; j++) {
					var curlink = a_all[j];
					if (curlink.href.match(/^http[s]?:\/\/(?:www\.)?hup\.hu\/node\/[0-9]+(#new)?$/)) {
						var marr = curlink.href.match(/^http[s]?:\/\/(?:www\.)?hup\.hu\/node\/([0-9]+)(#new)?$/);
						if (marr.length == 3 && marr[2] == "#new") {
							curlink.href="http://hup.hu/node/"+marr[1]+"&comments_per_page=9999#new";
						} else {
							curlink.href="http://hup.hu/node/"+marr[1]+"&comments_per_page=9999";
							if (myobj[marr[1]]) { curlink.style.fontWeight = "bold"; }
						}
					}
				}
			}
		}
	},
	markThread: {
		imgstars: "http://noob.hu/2010/05/22/stars.png",
		imgnull: "http://noob.hu/2010/05/22/null.png",
		curtitle: "",
		loadStatus: function(cth,opt1) {
			var savedObj = new Object();
			var tmpval = GM_getValue('statusmsg','');
			if (tmpval == "") {
				if (opt1 == 0) {
					return([]);
				} else {
					return 0;
				}
			}
			var savedArr = tmpval.split(',');
			if (cth == 'all') {
				if (opt1 == 0) {
					return savedArr;
				}
				for (var i=0; i<savedArr.length; i++) {
					var curdata = savedArr[i];
					var curarr = curdata.split(':');
					savedObj[curarr[0]] = new Object();
					savedObj[curarr[0]].title = unescape(curarr[1]);
				}
				return savedObj;
			} else {
				for (var i=0; i<savedArr.length; i++) {
					var curdata = savedArr[i];
					var curarr = curdata.split(':');
					if (curarr[0] == cth) {
						return 1;
					}
				}
				return 0;
			}
		},
		saveStatus: function(cth,status) {
			if (status == 1) {
				var tmparr = this.loadStatus('all',0);
				if (this.loadStatus(cth) == false) {
					tmparr.push(cth+":"+escape(this.curtitle));
					GM_setValue("statusmsg",tmparr.toString());
				}
			} else {
				var tmparr = this.loadStatus('all',0);
				if (this.loadStatus(cth) == true) {
					var newarr = new Array();
					for (var i=0; i<tmparr.length; i++) {
						var curdata = tmparr[i].split(':');
						if (curdata[0] != cth) {
							newarr.push(tmparr[i]);
						}
					}
					GM_setValue("statusmsg",newarr.toString());
				}
			}
		},
		buttonClick: function(obj) {
			var cth = obj.getAttribute("alt");
			var imgobj = obj.getElementsByTagName('IMG')[0];
			var btnstatus = 0;
			if (imgobj.style.backgroundPosition.indexOf("-14px") != -1) {
				btnstatus = 0;
			} else {
				btnstatus = 1;
			}
			if (btnstatus == 0) {
				this.saveStatus(cth,1);
				imgobj.style.backgroundPosition = "0px 0px";
			} else {
				this.saveStatus(cth,0);
				imgobj.style.backgroundPosition = "-14px 0px";
			}
			return false;
		},
		buildImg: function(status,cth) {
			var myimg = document.createElement('IMG');
				myimg.src = this.imgnull;
				myimg.style.width = "14px";
				myimg.style.height = "14px";
				if (status == 0) {
					myimg.style.background = "url("+this.imgstars+") no-repeat -14px 0px";
				} else {
					myimg.style.background = "url("+this.imgstars+") no-repeat 0px 0px";
				}
			var mylink = document.createElement('A');
				mylink.setAttribute("alt",cth);
				mylink.href = "javascript:void(0);";
				mylink.addEventListener('click',function() { hup.markThread.buttonClick(this); },false);
				mylink.appendChild(myimg);
			return mylink;
		},
		insertButton: function(cth) {
			var h2_all = document.getElementsByTagName('H2');
			for (var i=0; i<h2_all.length; i++) {
				var curh2 = h2_all[i];
				if (curh2.className == "content-title") {
					var tmptext = curh2.innerHTML;
						this.curtitle = tmptext;
						curh2.innerHTML = "";
					curh2.appendChild(this.buildImg(this.loadStatus(cth),cth));
					curh2.appendChild(document.createTextNode(tmptext));
				}
			}
		},
		rebuildList: function() {
			var myobj = this.loadStatus('all');
			var exists = 0;
			for (var val in myobj) { exists = 1; break; }
			if (exists == 0) {
				alert('Nincs még jelölt témád!');
				return false;
			}
			document.getElementsByClassName("main-content")[0].innerHTML = "";
			var mydiv = document.createElement('DIV');
				mydiv.className = "content";
			var mytable = document.createElement('TABLE');
				mytable.setAttribute('width','100%');
				mydiv.appendChild(mytable);
			var curthead = document.createElement('THEAD');
				var mytr = document.createElement('TR');
				var mytd1 = document.createElement('TH');
					mytd1.setAttribute('width','3%');
				var mytd2 = document.createElement('TH');
					mytd2.innerHTML = "Tárgy";
					mytr.appendChild(mytd1);
					mytr.appendChild(mytd2);
			curthead.appendChild(mytr);
			mytable.appendChild(curthead);
			var curtbody = document.createElement('TBODY');
			for (var val in myobj) {
				var mytr = document.createElement('TR');
				var mytd1 = document.createElement('TD');
					mytd1.setAttribute('valign','middle');
					mytd1.style.verticalAlign = "middle";
				var myimg = document.createElement('IMG');
					myimg.src = "/misc/forum-new.png";
					myimg.setAttribute('hspace','2');
					mytd1.appendChild(myimg);
				var mytd2 = document.createElement('TD');
					mytd2.setAttribute('valign','middle');
					mytd2.style.verticalAlign = "middle";
				var mylink = document.createElement('A');
					mylink.href = "http://hup.hu/node/"+val+"&comments_per_page=9999#new";
					mylink.innerHTML = myobj[val].title;
					mytd2.appendChild(mylink);
					mytr.appendChild(mytd1);
					mytr.appendChild(mytd2);
					mytr.className = "even";
				curtbody.appendChild(mytr);
			}
			mytable.appendChild(curtbody);
			mydiv.appendChild(mytable);
			document.getElementsByClassName("main-content")[0].appendChild(mydiv);
		},
		buildMenuElement: function() {
			var myli = document.createElement('LI');
				myli.className = "leaf";
			var mylink = document.createElement('A');
				mylink.href = "javascript:void(0);";
				mylink.addEventListener('click',function() { hup.markThread.rebuildList(); },false);
				mylink.appendChild(document.createTextNode('Csillagozott cuccok'));
			myli.appendChild(mylink);
			return myli;
		},
		insertMenuElement: function() {
			var ul_all = document.getElementsByTagName('UL');
			for (var i=0;i<ul_all.length; i++) {
				var curul = ul_all[i];
				if (curul.className == 'menu') {
					curul.appendChild(this.buildMenuElement());
				}
			}
		}
	},
	init: function() {
		if (document.location.href.match(/^http[s]?:\/\/(?:www\.)?hup\.hu[\/]?(?:node[\/]?)?$/)) {
			this.replaceNodeLinks();
			this.markThread.insertMenuElement();
		} else if (document.location.href.match(/^http[s]?:\/\/(?:www\.)?hup\.hu\/node\/[0-9]+/)) {
			var curthread = document.location.href.match(/^http[s]?:\/\/(?:www\.)?hup\.hu\/node\/([0-9]+)/)[1];
			this.markThread.insertButton(curthread);
			this.markThread.insertMenuElement();
		}
	}
}

hup.init();
