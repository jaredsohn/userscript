// ==UserScript==
// @name           DaveLoU Shrine Planner
// @description    Palace Enlightenment Utility
// @namespace      davelou
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.1.1
// ==/UserScript==
(function() {
var inject=function daveloushr() {
if (!window.qx || !window.webfrontend || !qx.core.Init.getApplication().initDone || webfrontend.data.City.getInstance().getId() < 1) {
window.setTimeout(daveloushr, 2000);
return;
}
window.dave=window.dave ||
function() {};
qx.Class.define("dave.lou.PF", {
extend: qx.core.Object,
construct: function() {
new qx.event.Timer.once(this.k, this, 1000);
},
members: {
i: null,
j: function(a) {
this.origAct(a);
if (this.daveloupl) return;
var d=new qx.ui.form.Button("Castle List").set({
appearance: "button-text-small"
});
this.addBefore(d, this.getChildren()[0], {
top: 10,
left: 30
});
this.daveloupl=this;
d.addListener("execute", dave.lou.pl.p, dave.lou.pl)
},
k: function() {
if (!b.ShrineDetailView) {
new qx.event.Timer.once(this.k, this, 1000);
} else {
b.ShrineDetailView.prototype.origAct=b.ShrineDetailView.prototype.activateView;
b.ShrineDetailView.prototype.activateView=this.j;
d.pl=this;
b.ShrineDetailView.prototype.origShri=b.ShrineDetailView.prototype.setShrine;
b.ShrineDetailView.prototype.setShrine=this.l;
b.ShrineDetailView.prototype.daveloupw=new dave.lou.PW();
l.zoomInfo.world.aFactors.push(0.4);
l.zoomInfo.world.aFactors.push(0.2);
}
},
l: function(a) {
this.origShri(a)
this.davelouc=a.get_Coordinates();
for (var i in a) {
if (a.hasOwnProperty(i) && a[i].ShrineType != null) {
this.davelouct=a[i].ShrineType;
if (this.daveloupw.isVisible()) dave.lou.pl.p();
break;
}
}
},
o: null,
o2: null,
o3: null,
p: function() {
this.o=p.shrineDetailView.davelouc;
this.o2=p.shrineDetailView.davelouct;
if (this.o2 > 0) {
for (var i in p.shrineDetailView) {
if (p.shrineDetailView.hasOwnProperty(i) && i.indexOf("davelou") == -1 && typeof p.shrineDetailView[i] == "number") {
this.o3=p.shrineDetailView[i];
}
}
}
this.q();
new d.PM(this);
},
q: function() {
if (w) return;
var i=s.reciever.WORLD.obj;
for (var k in i) {
if (i.hasOwnProperty(k) && i[k].d) w=i[k].d;
}
this.r();
if (!x || !y || !z) {
w=null;
return;
}
},
r: function() {
for (var k in w) {
for (var l in w[k]) {
if (w[k].hasOwnProperty(l) && w[k][l].c && w[k][l].d) {
for (var m in w[k][l].d) {
if (w[k][l].d[m].hasOwnProperty("Type")) {
x=l;
} else if (w[k][l].d[m].hasOwnProperty("Alliance")) {
y=l;
} else if (w[k][l].d[m].hasOwnProperty("Name")) {
z=l;
}
break;
}
}
if (x && y && z) return;
}
if (x && y && z) return;
}
}
}
});
qx.Class.define("dave.lou.PM", {
extend: qx.core.Object,
construct: function(i) {
this.i=i.o;
this.t=i.o2;
this.e=i.o3 * 1;
this.j=i.o & 0xffff;
this.k=i.o >>> 16;
this.l={};
var a=c.getContinentWidth() * c.getContinentCountX() - 1;
var b=c.getContinentHeight() * c.getContinentCountY() - 1;
for (var j=this.j - 20; j <= this.j + 20; j += 20) {
if (j < 0) j=0;
if (j > a) j=a;
for (var k=this.k - 20; k <= this.k + 20; k += 20) {
if (k < 0) k=0;
if (k > b) k=b;
this.m(j, k)
}
}
this.n();
},
members: {
i: null,
j: null,
k: null,
l: d=dave,
t: null,
e: null,
f: null,
g: [0, 0, 0, 5, 10, 20, 35, 50, 70, 96],
h: null,
a: null,
m: function(i, j) {
var k=i >>> 5;
var l=j >>> 5;
var m=(l << 5) + k;
this.l[m]=0;
},
n: function() {
for (var i in this.l) {
if (!w[i]) {
if (p.visMain.getMapMode() != "w") b.Util.showMapModeViewPos("w", 0, this.j, this.k);
new qx.event.Timer.once(this.n, this, 100);
return;
}
}
if (p.visMain.getMapMode() == "w") b.Util.showMapModeViewPos("r", 0, this.j, this.k);
this.h=f.getBonusByVirtue(this.t)[0];
if (this.h != null) this.h=Math.round(this.h.value * 2);
else this.h=0;
for (var j=0; j < 10; j++) {
if (this.g[j] <= this.h) this.a=j;
}
this.o();
},
o: function() {
this.p=[];
this.q=[];
this.f=0;
for (var i in this.l) {
var j=w[i];
var k=j[x].d;
var l=j[y].d;
var m=j[z].d;
for (var n in k) {
var o=k[n];
if (o["PalaceType"] == this.t && this.f < o["PalaceLevel"]) this.f=o["PalaceLevel"];
if (o["Type"] != 1 || o["PalaceLevel"] == 10 || l[o["Player"]]["Alliance"] == 0) continue;
if (o["PalaceType"] != this.t
&&
o["PalaceLevel"] > 0) continue;
var u=m[l[o["Player"]]["Alliance"]]["Id"];
if (u != e.getId() && !o["Castle"]) continue;
var q=i & 0x1f;
var r=i >>> 5;
var s=(q << 5) + (n & 0x1f);
var t=(r << 5) + (n >>> 16);
var d=Math.sqrt(Math.pow(s - this.j, 2) + Math.pow(t - this.k, 2));
if (d > 20) continue;
var p={
i: n,
c: o["Castle"],
j: o["Name"],
k: o["Points"],
e: o["EnlightmentStep"] * 1,
f: false,
p: true,
p2: o["PalaceLevel"],
l: l[o["Player"]]["Id"],
l2: l[o["Player"]]["Name"],
m: u,
u: o["PalaceUpgradeing"],
m2: m[l[o["Player"]]["Alliance"]]["Name"],
x: s,
y: t,
d: d,
e2: true,
k2: true,
w: o["Water"],
o: false,
}
p.sc=(p.k / (2 + p.d));
this.p.push(p);
if (o["Enlighted"] && p.e >= this.e) {
p.e2=false;
p.f=true;
}
if (o["PalaceLevel"] > this.a && p.m == e.getId()) {
p.e2=false;
p.p=false;
}
if (l[o["Player"]]["PeaceStart"]
+
l[o["Player"]]["PeaceDuration"] > this.e) {
p.o=true;
p.e2=false
}
if (p.u) p.e2=false;
}
}
if (this.p.length > 1) {
this.p.sort(function(a, b) {
return a.d - b.d;
});
}
m=[];
r=0;
t=0;
for (i=1; i < this.p.length; i++) {
j=this.p[i - 1];
k=this.p[i];
if (j.d == k.d) {
if (j.x > k.x) {
this.p[i - 1]=k;
this.p[i]=j;
} else if (j.x == k.x && j.y > k.y) {
this.p[i - 1]=k;
this.p[i]=j;
}
}
m.push(this.p[i - 1])
if (j.c) r++;
else t++;
if (k.c) r++;
else t++;
if (t > 40 && r > 40) break;
}
this.p=m;
v.p(this);
},
p: null,
q: null,
}
});
qx.Class.define("dave.lou.PMC", {
extend: qx.ui.menu.Menu,
construct: function(j) {
this.j=j;
this.base(arguments);
this.set({
iconColumnWidth: 0
});
this.m1=new qx.ui.menu.Button("Disable");
this.add(this.m1);
this.m1.addListener("execute", function() {
this.i.e2=!this.i.e2;
this.l()
v.r();
}, this);
this.m2=new qx.ui.menu.Button("Change to 7pt");
this.add(this.m2);
this.m2.addListener("execute", function() {
this.i.k2=!this.i.k2;
this.m();
v.r();
}, this);
},
members: {
i: null,
j: null,
k: function(i) {
this.i=i;
this.l();
this.m();
},
l: function() {
if (this.i.e2) {
this.m1.setLabel("Disable");
} else this.m1.setLabel("Enable");
},
m: function() {
if (this.i.k2) {
this.m2.setLabel("Change to 7 pt");
} else this.m2.setLabel("Change to actual score");
}
},
});
qx.Class.define("dave.lou.PML", {
extend: qx.ui.menu.Menu,
construct: function(j) {
this.j=j;
this.base(arguments);
this.set({
iconColumnWidth: 0
});
this.m1=new qx.ui.menu.Button("Add land cities");
this.add(this.m1);
this.m1.addListener("execute", function() {
this.j.c=!this.j.c;
this.l()
v.r();
}, this);
this.m2=new qx.ui.menu.Button("Add water cities");
this.add(this.m2);
this.m2.addListener("execute", function() {
this.j.d=!this.j.d;
this.m();
v.r();
}, this);
},
members: {
j: null,
l: function() {
if (this.j.c) {
this.m1.setLabel("Remove land cities");
} else this.m1.setLabel("Add land cities");
},
m: function() {
if (this.j.d) {
this.m2.setLabel("Remove water cities");
} else this.m2.setLabel("Add water cities");
}
},
});
qx.Class.define("dave.lou.PW", {
extend: qx.ui.window.Window,
construct: function() {
this.base(arguments, "Palace List");
this.setLayout(new qx.ui.layout.VBox());
this.buildGUI();
this.set({
allowMaximize: false,
allowMinimize: false,
showMaximize: false,
showMinimize: false,
showStatusbar: false,
useMoveFrame: true,
contentPadding: 5
});
this.moveTo(405, 65);
},
members: {
buildGUI: function() {
d.plw=v=this;
this.setLayout(new qx.ui.layout.VBox(0));
this.n=new qx.ui.basic.Label("");
var o=new qx.ui.layout.Grid(10, 3);
o.setColumnAlign(0, "right", "middle");
o.setColumnAlign(1, "left", "middle");
o.setColumnAlign(3, "right", "middle");
o.setColumnAlign(4, "right", "middle");
o.setColumnAlign(5, "right", "middle");
this.m=new qx.ui.container.Composite(o);
o=new qx.ui.container.Scroll(this.m).set({
height: 150,
width: 500,
});
this.add(o, {
flex: 1
});
for (var i=0; i < 20; i++) {
this.b();
}
this.m.setContextMenu(new d.PML(this));
},
b: function() {
var j=new qx.ui.basic.Label().set({
cursor: "pointer",
rich: true,
});
j.addListener("click", this.r2, this, false);
var k=new d.PMC(j)
j.setUserData("la", k);
j.setContextMenu(k);
this.a.push(j);
},
a: [],
c: false,
d: false,
n: null,
o: null,
m: null,
e: null,
f: d=d.lou=d.lou ||
function() {},
p: function(i) {
this.o=i.p;
this.e=i.t;
this.f=i.h;
j=m.shrines[i.t].dn.substr(9)
var j="C" + c.getContinentFromCoords(i.j, i.k) + " " + j;
j += " " + i.j + ":" + i.k + " LvL: " + i.f + " Faith: " + this.f + "%";
if (i.t > 0) j += " Next EL: " + t.getDateTimeString(a.getStepTime(i.e))
this.setCaption(j);
this.r();
this.open();
},
r: function() {
this.m.removeAll();
this.m.add(new qx.ui.basic.Label("Coord"), {
row: 0,
column: 1
})
this.m.add(new qx.ui.basic.Label("Points"), {
row: 0,
column: 3
})
this.m.add(new qx.ui.basic.Label("Percent"), {
row: 0,
column: 4
})
this.m.add(new qx.ui.basic.Label("Dist"), {
row: 0,
column: 5
})
this.m.add(new qx.ui.basic.Label("Player"), {
row: 0,
column: 6
})
this.m.add(new qx.ui.basic.Label("City Name"), {
row: 0,
column: 7
})
this.m.add(new qx.ui.basic.Label("Alliance"), {
row: 0,
column: 8
})
var c=0;
var d=0;
var f=1;
for (i=0; i < this.o.length; i++) {
var j=this.o[i];
if (!j.c && !this.c && !j.w) continue;
if (!j.c && !this.d && j.w) continue;
var e=j.sc;
if (!j.k2) e=7 / (2 + j.d);
if (j.e2) {
c += e;
d++
}
f++;
if (this.a.length < f) this.b();
if (d == 16) break;
}
var a=1;
d=0;
for (var i=0; i < this.o.length; i++) {
j=this.o[i];
if (!j.c && !this.c && !j.w) continue;
if (!j.c && !this.d && j.w) continue;
var b=this.a[a];
b.getUserData("la").k(j);
b.setValue("<font color=\"blue\"><u>" + j.x + ":" + j.y + "</u>")
this.m.add(b, {
row: a,
column: 1
})
b.setUserData("x", j.x);
b.setUserData("y", j.y);
b=new qx.ui.basic.Image(this.u(j));
b.setScale(true);
this.m.add(b, {
row: a,
column: 2
})
if (!j.k2) p="7*";
else p=j.k;
this.m.add(new qx.ui.basic.Label(p).set({
textAlign: "right"
}), {
row: a,
column: 3
})
if (j.e2) {
this.m.add(new qx.ui.basic.Label(d + 1).set({
textAlign: "right"
}), {
row: a,
column: 0
})
d++;
p=j.sc;
if (!j.k2) p=7 / (2 + j.d);
var p=p / c * 100;
p=p.toString()
p=p.split(".");
var rp=p[0]
if (p[1]) rp=rp + "." + ((p[1] + "00").substr(0, 3)) + "%";
else rp=rp + ".000%";
} else {
if (j.o) rp="orb"
else if (!j.p)
rp="low faith"
else if (j.e > 0) rp="lit"
else if (j.u) rp="build"
else rp="disabled";
}
this.m.add(new qx.ui.basic.Label(rp).set({
textAlign: "right"
}), {
row: a,
column: 4
})
p=j.d.toString();
p=p.split(".");
rp=p[0]
if (p[1]) rp=rp + "." + ((p[1] + "00").substr(0, 2));
else rp=rp + ".00";
this.m.add(new qx.ui.basic.Label(rp).set({
textAlign: "right"
}), {
row: a,
column: 5
})
this.m.add(new qx.ui.basic.Label(j.l2).set({
textAlign: "left"
}), {
row: a,
column: 6
})
this.m.add(new qx.ui.basic.Label(j.j).set({
textAlign: "left"
}), {
row: a,
column: 7
})
this.m.add(new qx.ui.basic.Label(j.m2).set({
textAlign: "left"
}), {
row: a,
column: 8
})
a++;
if (d == 16) break;
}
},
r2: function(e) {
var t=e.getTarget();
var x=t.getUserData("x") * 1;
var y=t.getUserData("y") * 1;
b.Util.showMapModeViewPos("r", 0, x, y);
},
i: "webfrontend/ui/icons/icon_playerinfo_townicon_civil_land.png",
j: "webfrontend/ui/icons/icon_playerinfo_townicon_civil_river.png",
k: "webfrontend/ui/icons/icon_playerinfo_townicon_castle_land.png",
l: "webfrontend/ui/icons/icon_playerinfo_townicon_castle_river.png",
q: "webfrontend/ui/icons/icon_playerinfo_townicon_palace_land.png",
t: "webfrontend/ui/icons/icon_playerinfo_townicon_palace_river.png",
u: function(i) {
var j;
if (i.w) {
if (i.p2 > 0) j=this.t;
else if (i.c) j=this.l;
else j=this.j;
} else {
if (i.p2 > 0) j=this.q;
else if (i.c) j=this.k;
else j=this.i;
}
return j;
},
}
});
var a, b, i, m, w, e, p, r, y, d, f, s, j, l, v, c, t, x, z=false;
try {
b=webfrontend;
p=qx.core.Init.getApplication();
s=b.net.UpdateManager.getInstance();
a=b.data.ServerTime.getInstance();
c=b.data.Server.getInstance();
e=b.data.Alliance.getInstance();
f=b.data.Tech.getInstance();
m=b.res.Main.getInstance();
l=b.config.Config.getInstance();
t=b.Util;
b=b.gui;
new dave.lou.PF();
} catch (e) {
console.error(e);
}
}
var script=document.createElement("script");
script.innerHTML="(" + inject.toString() + ")();";
script.type="text/javascript";
script.title="dave.lou.pl";
document.getElementsByTagName("head")[0].appendChild(script);
})();
