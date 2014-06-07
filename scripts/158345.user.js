// ==UserScript==
// @name           DaveLoU TM Assist
// @description    Trade Minister utility
// @namespace      davelou
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.5.0
// ==/UserScript==
(function() {
var inject=function daveloutm() {
if (!window.qx || !window.webfrontend
|| !qx.core.Init.getApplication().initDone
|| webfrontend.data.City.getInstance().getId() < 1) {
window.setTimeout(daveloutm, 5000);
return;
}
qx.Class.define("dave.lou.TMC", {
extend: qx.core.Object,
construct: function() {
v.TradeMinisterOptionsPage.prototype.origEnable
=v.TradeMinisterOptionsPage.prototype._setEnabledLayout;
v.TradeMinisterOptionsPage.prototype._setEnabledLayout=this.n;
v.TradeMinisterOptionsPage.prototype.dltmc=this;
},
members: {
f: null,
g: null,
h: null,
i: null,
j: null,
k: null,
n:function(i) {
this.origEnable(i);
this.dltmc.o(this);
},
o:function(k){
var h=false;
if (this.f==null) {
for (var j in k) {
if (k.hasOwnProperty(j)) {
var l=k[j];
if (l==null) continue;
if (l instanceof Array) {
m=l[0];
if (l.length==4) {
if (m.basename&&m.basename=="CustomSelectBox"&&m.getUserData("Type") == 0) {
this.g=l;
}
if (m.basename&&m.basename=="CustomSelectBox"&&m.getUserData("Type") == 1) {
this.h=l;
}
if (m.basename&&m.basename=="SpinnerInt") {
this.i=l;
}
}
}
else if (l.basename&&l.basename=="SoundButton"&&!h) {
h=true;
this.p(k,j);
}
else if (l.basename&&l.basename=="CheckBox"&&this.j==null) {
if (this.q(l,"tnf:same source"))
this.j=l;
}
else if (l.basename&&l.basename=="CheckBox"&&this.k==null) {
if (this.q(l,"tnf:same target"))
this.k=l;
}
}
}
new d.TMS(this);
}
},
p:function(i,j){
var k=i[j].getLayoutParent();
this.f=new qx.ui.menu.Menu().set({
iconColumnWidth: 0,
});
var b=new qx.ui.form.MenuButton("TM Assist", null, this.f);
k.addAt(b, 2)
k.addAt(new qx.ui.core.Spacer(),3,{
flex: 1
})
},
q:function(i,j) {
var g=false;
var k = i.getLabel();
for (var l in k) {
if (k.hasOwnProperty(l)) {
var m=k[l];
if (m!=null&&typeof(m)=="string") {
if (m.indexOf(j, 0)>-1) g=true
}
}
}
return g;
}
}
});
qx.Class.define("dave.lou.L", {
extend: qx.core.Object,
construct: function() {
this.w();
},
members: {
j: [],
o: {},
i: d=dave||
function(){},
w: function() {
l=this;
var e=null;
try {
e=this.o=this.v();
} catch (r) {}
if (!e) {
e=this.o={};
e.s="hub";
e.s2="hub";
e.s3="hub";
e.s4="hub";
e.t="hub";
e.t2="hub";
e.t3="hub";
e.t4="hub";
e.l={};
e.l[1]={
m: "a"
}
e.l[100]={
i: 150,
j: 150,
k: 0,
l: 0,
m: "Res build",
n: true,
o: true,
p: 10,
}
e.l[101]={
i: 0,
j: 0,
k: 0,
l: 0,
m: "Res done",
n: true,
o: true,
p: 10,
}
e.l[102]={
i: 200,
j: 200,
k: 200,
l: 200,
m: "Mil build",
n: true,
o: true,
p: 10,
}
this.p();
}
if (!e.t) e.t="hub";
this.k();
},
k: function() {
if (!this.o.l[1]) {
var l={};
l[1]={
m: "null"
};
var a=100;
for (var i in this.o.l) {
var j=this.o.l[i];
j.m=i;
l[a++]=j;
}
this.o.l=l;
this.p()
}
if (this.o.l[1].m=="null") {
this.o.l[1].m="0";
this.o.s2=this.o.s;
this.o.s3=this.o.s;
this.o.s4=this.o.s;
this.o.t2=this.o.t;
this.o.t3=this.o.t;
this.o.t4=this.o.t;
for (i in this.o.l) {
j=this.o.l[i];
j.n=true;
j.o=true;
}
this.p()
}
},
p: function() {
if (localStorage) localStorage["daveloutm"]=JSON.stringify(this.o);
},
v: function() {
var j=localStorage["daveloutm"];
if (j) return JSON.parse(j);
else return null;
},
},
});
qx.Class.define("dave.lou.TMS", {
extend: qx.core.Object,
construct: function(h) {
this.h=h;
this.n();
r=this;
},
members: {
h: null,
j: null,
n: function() {
this.h.f.removeAll();
for (var j in l.o.l) {
if (j == 1) continue;
var k=new qx.ui.menu.Button(l.o.l[j].m);
k.setUserData("i", j);
this.h.f.add(k);
k.addListener("execute", function(e) {
var i=e.getTarget().getUserData("i");
this.m(i);
}, this, false);
}
k=new qx.ui.menu.Button("Config");
k.set({
blockToolTip: false,
toolTipText: "Manage config",
});
this.h.f.add(k)
k.addListener("execute", function() {
if (!this.j) this.j=new d.TMW()
this.j.i();
}, this, false);
},
m: function(i) {
new d.TMF(this.h).n(l.o.l[i])
},
q: null,
o: null,
p: null,
}
});
qx.Class.define("dave.lou.TMF", {
extend: qx.core.Object,
construct: function(h) {
this.h=h;
},
members: {
h: null,
l: null,
n: function(i) {
this.l={};
this.l[l.o.s]=0;
this.l[l.o.s2]=0;
this.l[l.o.s3]=0;
this.l[l.o.s4]=0;
this.l[l.o.t]=0;
this.l[l.o.t2]=0;
this.l[l.o.t3]=0;
this.l[l.o.t4]=0;
for (var j in this.l) {
this.l[j]=new d.TMH().n(j);
}
this.p(i);
},
p:function(a) {
this.h.j.setValue(a.n);
this.h.k.setValue(a.o);
this.h.i[0].setValue(a.i*1000);
this.h.i[1].setValue(a.j*1000);
this.h.i[2].setValue(a.k*1000);
this.h.i[3].setValue(a.l*1000);
this.h.g[0].setModelSelection([this.l[l.o.s]]);
this.h.g[1].setModelSelection([this.l[l.o.s2]]);
this.h.g[2].setModelSelection([this.l[l.o.s3]]);
this.h.g[3].setModelSelection([this.l[l.o.s4]]);
this.h.h[0].setModelSelection([this.l[l.o.t]]);
this.h.h[1].setModelSelection([this.l[l.o.t2]]);
this.h.h[2].setModelSelection([this.l[l.o.t3]]);
this.h.h[3].setModelSelection([this.l[l.o.t4]]);
this.h.j.fireEvent("click");
this.h.k.fireEvent("click");
this.q(a)
},
q: function(a) {
if (!a.p) return;
var i= {
idCity: s.getId(),
foodWarning: a.p,
}
n.sendCommand
(
"SetFoodWarning", i, this, this.r
);
},
r: function(a,b,c) {
}
}
});
qx.Class.define("dave.lou.TMH", {
extend: qx.core.Object,
construct: function() {},
members: {
l: "citygroups",
n: function(b) {
var x=s.getId();
var y=x >>> 16;
x=x & 0xFFFF;
var cont=a.getContinentFromCoords(x, y);
var m={};
for (var i=0; i < t[this.l].length; i++) {
var g=t[this.l][i];
if (g.n.toLowerCase().indexOf(b) >= 0) {
m[i]=g;
}
}
var d=10000;
var n=0;
for (var k in m) {
g=m[k];
for (i=0; i < g.c.length; i++) {
var j=g.c[i];
var y2=j >>> 16;
var x2=j & 0xFFFF;
var cont2=a.getContinentFromCoords(x2, y2);
if (cont2 == cont) {
var z=this.d(x, y, x2, y2)
if (z < d) {
n=j;
d=z;
}
}
}
}
return n;
},
d: function(x, y, x2, y2) {
var xd=(x - x2) * (x - x2);
var yd=(y - y2) * (y - y2);
return Math.sqrt(xd + yd);
},
}
});
qx.Class.define("dave.lou.TMW", {
extend: qx.ui.window.Window,
construct: function() {
this.base(arguments, "Trade Minister Assist Config");
this.buildGUI();
},
members: {
buildGUI: function() {
this.set({
resizable: false,
showMaximize: false,
showMinimize: false,
showStatusbar: false,
useMoveFrame: true,
contentPadding: 5,
});
this.setLayout(new qx.ui.layout.VBox());
var m=new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(m)
var n=new qx.ui.basic.Label("Hub search").set({
width: 65
});
m.add(n)
n=new qx.ui.basic.Label("Wood").set({
width: 65,
});
m.add(n)
n=new qx.ui.basic.Label("Stone").set({
width: 65,
});
m.add(n)
n=new qx.ui.basic.Label("Iron").set({
width: 65,
});
m.add(n)
n=new qx.ui.basic.Label("Food").set({
width: 50,
});
m.add(n)
m=new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(m)
n=new qx.ui.basic.Label("Request").set({
width: 55
});
m.add(n);
m.add(this.s1=this.i2("s"));
m.add(new qx.ui.core.Spacer(5, 5));
m.add(this.s2=this.i2("s2"));
m.add(new qx.ui.core.Spacer(5, 5));
m.add(this.s3=this.i2("s3"));
m.add(new qx.ui.core.Spacer(5, 5));
m.add(this.s4=this.i2("s4"));
m=new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(m)
n=new qx.ui.basic.Label("Deliver").set({
width: 55
});
m.add(n);
m.add(this.t1=this.i2("t"));
m.add(new qx.ui.core.Spacer(5, 5));
m.add(this.t2=this.i2("t2"));
m.add(new qx.ui.core.Spacer(5, 5));
m.add(this.t3=this.i2("t3"));
m.add(new qx.ui.core.Spacer(5, 5));
m.add(this.t4=this.i2("t4"));
this.add(new qx.ui.core.Spacer(10, 10));
this.a=new qx.ui.container.Composite(new qx.ui.layout.VBox());
this.a.setEnabled(false);
this.add(this.a)
n=new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.a.add(n);
var o=new qx.ui.basic.Label("Name ").set({
width: 30
});
n.add(o)
this.j=new qx.ui.form.TextField().set({
maxLength: 30,
height: 20,
width: 120,
allowGrowX: false,
})
n.add(this.j);
n.add(new qx.ui.core.Spacer(10, 10));
this.f1=new qx.ui.form.CheckBox("Same Src").set({
width: 80,
height: 20,
allowGrowX: false,
})
n.add(this.f1);
this.f2=new qx.ui.form.CheckBox("Same Tgt").set({
height: 20,
allowGrowX: false,
})
n.add(this.f2);
n=new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.a.add(n);
o=new qx.ui.basic.Label("Wood").set({
width: 30
});
n.add(o)
this.k=new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 4,
height: 20,
width: 30,
allowGrowX: false,
})
n.add(this.k)
n.add(new qx.ui.core.Spacer(5, 5));
o=new qx.ui.basic.Label("Stone").set({
width: 30
});
n.add(o)
this.l=new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 4,
height: 20,
width: 30,
allowGrowX: false,
})
n.add(this.l)
n.add(new qx.ui.core.Spacer(5, 5));
o=new qx.ui.basic.Label("Iron").set({
width: 30
});
n.add(o)
this.m=new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 4,
height: 20,
width: 30,
allowGrowX: false,
})
n.add(this.m)
n.add(new qx.ui.core.Spacer(5, 5));
o=new qx.ui.basic.Label("Food").set({
width: 30
});
n.add(o)
this.n=new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 4,
height: 20,
width: 30,
allowGrowX: false,
})
n.add(this.n)
n.add(new qx.ui.core.Spacer(5, 5));
o=new qx.ui.basic.Label("Warn").set({
width: 30
});
n.add(o)
this.n1=new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 2,
height: 20,
width: 30,
allowGrowX: false,
})
n.add(this.n1)
n=new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
alignX: "middle"
}));
this.add(new qx.ui.core.Spacer(5, 5));
this.add(n);
this.add(new qx.ui.core.Spacer(5, 5));
this.z1=new qx.ui.form.Button("Import");
this.z1.addListener("execute", this.z3, this);
n.add(this.z1);
n.add(new qx.ui.core.Spacer(5, 5))
this.z2=new qx.ui.form.Button("Export");
this.z2.addListener("execute", this.z4, this);
n.add(this.z2);
n.add(new qx.ui.core.Spacer(30, 5))
this.d=new qx.ui.form.Button("New");
this.d.addListener("execute", this.s, this);
n.add(this.d);
n.add(new qx.ui.core.Spacer(5, 5))
this.b=new qx.ui.form.Button("Save");
this.b.addListener("execute", this.o, this);
this.b.setEnabled(false);
n.add(this.b);
n.add(new qx.ui.core.Spacer(5, 5))
this.c=new qx.ui.form.Button("Cancel");
this.c.addListener("execute", this.p, this);
this.c.setEnabled(false);
n.add(this.c);
n.add(new qx.ui.core.Spacer(1, 1),{
flex:1
})
this.add(this.z0=new qx.ui.core.Spacer(10, 10));
o=new qx.ui.layout.Grid(5, 3);
o.setColumnAlign(3, "right", "middle");
o.setColumnAlign(4, "right", "middle");
o.setColumnAlign(5, "right", "middle");
o.setColumnAlign(6, "right", "middle");
o.setColumnAlign(8, "left", "middle");
o.setColumnAlign(9, "left", "middle");
this.r=new qx.ui.container.Composite(o);
o=new qx.ui.container.Scroll(this.r)
this.add(o, {
flex: 1
});
this.q();
this.open();
this.center();
},
z0:null,
i2:function(i) {
var n=new qx.ui.form.TextField().set({
maxLength: 7,
height: 20,
width: 60,
allowGrowX: false,
})
n.setUserData("s",i);
n.setValue(l.o[i])
n.addListener("focusin", this.g, this);
n.addListener("focusout", this.h, this);
n.addListener("changeValue", function() {
var r=this.getValue().toLowerCase();
var i=this.getUserData("s");
if (r) {
if (r != l.o[i]) {
l.o[i]=r;
l.p();
}
}
this.setValue(l.o[i])
}, n);
return n;
},
i: function() {
this.show();
this.setActive(true);
},
s1: null,
s2: null,
s3: null,
s4: null,
t1: null,
t2: null,
t3: null,
t4: null,
z1: null,
z2: null,
z3: function() {
if (!c) c=new d.TMIE();
try {
c.m();
} catch (e) {
console.error(e)
}
},
z4: function() {
if (!c) c=new d.TMIE();
try {
c.l();
} catch (e) {
console.error(e)
}
},
a: null,
b: null,
c: null,
d: null,
e: null,
g: function() {
p.allowHotKey=false;
},
h: function() {
p.allowHotKey=true;
},
j: null,
k: null,
l: null,
m: null,
n: null,
n1: null,
f: null,
f1: null,
f2:null,
q: function() {
this.r.removeAll();
var a=0;
var m;
for (var i in l.o.l) {
this.w=i * 1;
if (i == 1) continue;
this.r.add(new qx.ui.basic.Label(l.o.l[i].m+"  "), {
row: a,
column: 0,
})
this.r.add(new qx.ui.core.Spacer(10,5),{
row: a,
column:1,
})
if (l.o.l[i].n) var c="  R:T"
else c="  R:F"
this.r.add(new qx.ui.basic.Label(c), {
row: a,
column: 2,
toolTipText:"Request same. T=true, F=false",
blockToolTip:false,
})
this.r.add(new qx.ui.basic.Label(l.o.l[i].i.toString()), {
row: a,
column: 3
})
this.r.add(new qx.ui.basic.Label(l.o.l[i].j.toString()), {
row: a,
column: 4
})
this.r.add(new qx.ui.basic.Label(l.o.l[i].k.toString()), {
row: a,
column: 5
})
this.r.add(new qx.ui.basic.Label(l.o.l[i].l.toString()), {
row: a,
column: 6
})
if (l.o.l[i].o) c=" D:T"
else c=" D:F"
if (l.o.l[i].p) c+=" W:"+l.o.l[i].p;
this.r.add(new qx.ui.basic.Label(c), {
row: a,
column: 7,
toolTipText:"Deliver same. T=true, F=false",
blockToolTip:false,
})
var b=new qx.ui.basic.Image("webfrontend/theme/scrollbar/scrollbar-up.png").set({
cursor: "pointer",
});
this.r.add(b, {
row: a,
column: 8
})
b.setUserData("row", i);
b.addListener("click", this.x, this)
if (a == 0) b.setEnabled(false);
m=b=new qx.ui.basic.Image("webfrontend/theme/scrollbar/scrollbar-down.png").set({
cursor: "pointer",
});
this.r.add(b, {
row: a,
column: 9
})
b.setUserData("row", i);
b.addListener("click", this.y, this)
b=new qx.ui.basic.Image("resource/webfrontend/ui/menues/forum/icon_btn_edit_post.png").set({
cursor: "pointer",
});
this.r.add(b, {
row: a,
column: 10
})
b.setUserData("row", i);
b.addListener("click", this.t, this)
this.e=b=new qx.ui.basic.Image("resource/webfrontend/ui/menues/forum/icon_btn_delete_post.png").set({
cursor: "pointer",
});
this.r.add(b, {
row: a,
column: 11
})
b.setUserData("row", i);
b.addListener("click", this.u, this)
a++;
}
m.setEnabled(false);
if (a == 1) {
this.e.setEnabled(false);
}
qx.event.Timer.once(this.q1,this,200);
},
q1:function() {
this._computeSizeHint();
var c= this.r._computeSizeHint();
var a=c.minWidth+28;
c=this.z0.getWidth();
if (a!=c) {
this.z0.setWidth(a);
this.q1();
qx.event.Timer.once(this.q1,this,300);
}
},
r: d=d.lou,
o: function() {
if (!this.j.getValue()) {
alert("Name cannot be empty");
return;
}
if (this.j.getValue().length == 0) {
alert("Name cannot be empty");
return;
}
var a={};
a.i=this.k.getValue();
if (!a.i || a.i == "") a.i=0;
else a.i=a.i * 1;
a.j=this.l.getValue();
if (!a.j || a.j == "") a.j=0;
else a.j=a.j * 1;
a.k=this.m.getValue();
if (!a.k || a.k == "") a.k=0;
else a.k=a.k * 1;
a.l=this.n.getValue();
if (!a.l || a.l == "") a.l=0;
else a.l=a.l * 1;
a.p=this.n1.getValue();
if (!a.p || a.p == "") delete a.p;
else {
a.p=a.p * 1;
if (a.p==0) a.p=1;
}
a.m=this.j.getValue();
a.n=this.f1.getValue();
a.o=this.f2.getValue();
l.o.l[this.f]=a;
if (this.j.getEnabled()) r.n();
this.a.setEnabled(false);
this.j.setEnabled(false);
this.b.setEnabled(false);
this.c.setEnabled(false);
this.d.setEnabled(true);
this.r.setEnabled(true);
this.z1.setEnabled(true);
this.z2.setEnabled(true);
this.q();
l.p();
this.v();
},
p: function() {
this.a.setEnabled(false);
this.j.setEnabled(false);
this.b.setEnabled(false);
this.c.setEnabled(false);
this.d.setEnabled(true);
this.r.setEnabled(true);
this.z1.setEnabled(true);
this.z2.setEnabled(true);
this.v();
},
s: function() {
this.a.setEnabled(true);
this.j.setEnabled(true);
this.j.setValue("");
this.b.setEnabled(true);
this.c.setEnabled(true);
this.d.setEnabled(false);
this.r.setEnabled(false);
this.z1.setEnabled(false);
this.z2.setEnabled(false);
this.k.setValue("0");
this.l.setValue("0");
this.m.setValue("0");
this.n.setValue("0");
this.n1.setValue("");
this.f=(this.w * 1) + 1;
this.f1.setValue(true);
this.f2.setValue(true);
this.g();
},
t: function(e) {
var t=e.getTarget();
var i=t.getUserData("row") * 1
this.a.setEnabled(true);
this.j.setEnabled(false);
this.b.setEnabled(true);
this.c.setEnabled(true);
this.d.setEnabled(false);
this.r.setEnabled(false);
this.z1.setEnabled(false);
this.z2.setEnabled(false);
var d=l.o.l[i];
this.j.setValue(d.m);
this.k.setValue(d.i.toString());
this.l.setValue(d.j.toString());
this.m.setValue(d.k.toString());
this.n.setValue(d.l.toString());
if (d.p)
this.n1.setValue(d.p.toString());
this.f=i;
this.f1.setValue(d.n);
this.f2.setValue(d.o);
},
u: function(e) {
var t=e.getTarget()
var i=t.getUserData("row") * 1;
delete l.o.l[i];
this.q();
l.p();
r.n();
},
v: function() {
this.j.setValue("");
this.k.setValue("");
this.l.setValue("");
this.m.setValue("");
this.n.setValue("");
this.n1.setValue("");
this.h();
},
w: null,
x: function(e) {
var t=e.getTarget();
var i=t.getUserData("row") * 1;
var j=1;
for (var k in l.o.l) {
if (k == i) break;
j=k;
}
this.z(i, j);
},
y: function(e) {
var t=e.getTarget();
var i=t.getUserData("row") * 1;
var j=1;
for (var k in l.o.l) {
if (k > i) {
j=k;
break;
}
}
this.z(i, j);
},
z: function(i, j) {
var k=l.o.l[i];
l.o.l[i]=l.o.l[j];
l.o.l[j]=k;
r.n();
l.p();
this.q();
},
}
});
qx.Class.define("dave.lou.TMIE", {
extend: qx.ui.window.Window,
construct: function() {
this.base(arguments, "TM Assist Import/Export");
this.buildGUI();
},
members: {
buildGUI: function() {
this.set({
resizable: false,
showMaximize: false,
showMinimize: false,
showStatusbar: false,
useMoveFrame: true,
contentPadding: 5,
});
c=this;
this.setLayout(new qx.ui.layout.VBox());
this.i=new qx.ui.basic.Label("");
this.add(this.i)
this.add(new qx.ui.core.Spacer(10, 10));
this.j=new qx.ui.form.TextArea().set({
width: 330,
height: 340,
});
this.j.addListener("click", this.o, this);
this.add(this.j)
this.j.setNativeContextMenu(true);
this.add(new qx.ui.core.Spacer(10, 10));
this.k=new qx.ui.form.Button("Load");
this.k.addListener("execute", this.n, this);
this.k.setVisibility("hidden");
this.add(this.k)
this.add(new qx.ui.core.Spacer(10, 10));
this.open();
this.center();
},
i: null,
j: null,
k: null,
l: function() {
this.i.setValue("Right-click to bring up copy menu");
this.k.setVisibility("hidden")
this.j.setReadOnly(false);
var i=JSON.stringify(l.o);
this.show();
this.setActive(true);
this.j.setValue(i);
this.j.selectAllText();
this.j.focus();
this.j.setReadOnly(true);
},
m: function() {
this.i.setValue("Right-click to bring up paste menu");
this.j.setReadOnly(false);
this.j.setValue("");
this.k.setVisibility("visible")
this.show();
this.setActive(true);
this.j.focus();
},
n: function() {
this.hide();
this.k.setVisibility("hidden")
var i=this.j.getValue();
if (!i) return;
try {
i=JSON.parse(i);
if (!i.s) return;
if (!i.t) return;
if (!i.l) return;
if (!i.l[1]) return;
for (var j in i.l) {
if (j * 1 == 1) continue;
if (j * 1 != j) return;
if (!i.l[j].m) return;
if (i.l[j].i*1!=i.l[j].i) return;
if (i.l[j].j*1!=i.l[j].j) return;
if (i.l[j].k*1!=i.l[j].k) return;
if (i.l[j].l*1!=i.l[j].l) return;
}
l.o=i;
l.p();
l.k();
r.j.q();
r.j.s1.setValue(l.o.s);
r.j.s2.setValue(l.o.s2);
r.j.s3.setValue(l.o.s3);
r.j.s4.setValue(l.o.s4);
r.j.t1.setValue(l.o.t);
r.j.t2.setValue(l.o.t2);
r.j.t3.setValue(l.o.t3);
r.j.t4.setValue(l.o.t4);
r.n();
} catch (e) {
console.error(e)
}
},
o: function() {
this.j.selectAllText();
},
}
});
var a,b,i,m,p,r,y,d,s,j,l,v,n,c,t,x,z=false;
try {
b=webfrontend;
v=b.gui;
p=qx.core.Init.getApplication();
n=b.net.CommandManager.getInstance()
b=b.data;
t=b.Player.getInstance();
s=b.City.getInstance();
a=b.Server.getInstance();
new d.TMC();
new d.L();
} catch (e) {
console.error(e);
}
}
var script=document.createElement("script");
script.innerHTML="(" + inject.toString() + ")();";
script.type="text/javascript";
script.title="dave.lou.tm";
document.getElementsByTagName("head")[0].appendChild(script);
})();
