// ==UserScript==
// @name           Dave LoU Raid
// @description    Raid assistant
// @namespace      davelou
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        0.7.9
// ==/UserScript==

(function() {
var inject= function davelouraid() {
if (!window.qx || !window.webfrontend
||!qx.core.Init.getApplication().initDone
||webfrontend.data.City.getInstance().getId()<1) {
window.setTimeout(davelouraid, 5000);
return;
}
var l= {
"en":{
"type":">Type:<",
"name":">Name:<",
"coord":"Coord.*Contin",
"prog":"Progre.*Coord",
"leveld":"Level.*Progr",
"levelb":"Level.*Coord",
"mnt":"Mountain ",
"forest":"Forest ",
"hill":"Hill ",
"sea":"Sea E",
"hydra":"Hydra",
"dragon":"Dragon",
"moloch":"Moloch",
"octopus":"Octopus",
},
0:{
"a":"DLX",
},
}
var la=qx.locale.Manager.getInstance().getLocale();
la=(l[la]&&(f=l[0]))?l[la]:l["en"];
window.dave=window.dave || function(){};
qc();
function qc() {
qx.Class.define("dave.lou.C", {
extend: qx.core.Object,
construct: function()
{
this.k= false;
this.c= {};
this.w();
},
properties: {
idle : {
init: null,
check: "String",
event:"changeIdle"
},
},
members: {
k: null,
i: 0,
s: function (){
this.f= false;
this.k= false;
this.c= {};
j.addConsumer("COMO", this);
},
c: d=dave,
getRequestDetails: function() {
if (this.k) return "";
else return "a";
},
dispatchResults: function(data) {
if (!data) return;
if (!this.k) {
this.totals={};
this.incity={};
}
this.k= true;
try {
for (var i= 0; i < data.length; i++) {
var r= data[i];
if (r.i) this.a(r);
}
} catch (e) {
console.error(e)
}
},
a: function(data) {
var city= this.c[data.i];
if (!city) {
this.c[data.i]= {
t:0,
n:false
};
}
var w=false;
var q= 0;
var v= false;
var o= 0;
var u= {};
var d= new Date();
d=(d-r)/1000;
for (var i= 0; i < data.c.length; i++) {
var e= data.c[i];
for (var j= 0; j < e.u.length; j++) {
var h= e.u[j];
var k= h.t;
if (this.o[k]) continue;
if (!c.o.d)
if (k==3||k==4||k==5||k==9||k==10) {
continue;
}
if (!c.o.o)
if (k==6||k==7||k==11||k==12) {
continue;
}
if (!c.o.n)
if (k==16||k==17||k==15) continue;
if (k==16||k==17||k==15) v=true;
var b= h.c;
var n= m.units[k];
var s= n.c
var t= b * s;
if (k==15) t=1;
if (e.i== 0) {
q += t;
if (u[n.dn]) u[n.dn]+=b;
else u[n.dn]=b
}
else {
if (e.d==1) {
if (e.e-d <10000) {
q -= t;
if (u[n.dn]) u[n.dn]-=b;
else u[n.dn]=b
}
else if (this.o.s){
w=true;
q -= t;
if (u[n.dn]) u[n.dn]-=b;
else u[n.dn]=b
}
else{
w=true;
}
}
o++;
}
}
}
if (o== 15) {
q=0;
}
d= "";
if (w) d="Scheduled orders\n"
for (var x in u) {
t= u[x]
if (t >0)
d= d + x+" "+t  + "\n"
}
this.c[data.i]= {
t:q,
n:v,
d:d,
o:data,
};
},
d: {},
g1:0,
gl:{},
gs: function() {
if(!c.o.g){
this.g1=-1;
return;
}
var g=a.cityBar.getCurrentGroup();
if(g!=this.g1) {
this.g1=g
this.gl={}
if (g>0) {
for (var i=0;i<p.citygroups.length;i++) {
if (p.citygroups[i].i==g) {
for (var j=0;j<p.citygroups[i].c.length;j++) {
this.gl[p.citygroups[i].c[j]]=true
}
}
}
}
}
},
m: function() {
this.gs();
var t= {
c:-1,
t:-1,
n:false,
d:null,
p:null
};
var prev= t;
for (var d in this.c) {
if (t.c==-1) t.c=0;
var w= s.getContinentFromCoords(d&0xffff, d>>>16);
if (this.d[d]) continue;
if (this.h[d]) continue;
if (this.e[w]) continue;
if (this.g1>0&&!this.gl[d]) continue;
var r= this.c[d];
if (r.t < this.o.t*10000) continue;
if (t.t < r.t) {
prev= t;
prev.p= null;
t= {
c:d,
t:r.t,
n:r.n,
d:r.d,
p:prev,
};
} else if ((t.p!=null&&t.p.t<r.t)||t.p==null){
t.p= {
c:d,
t:r.t,
n:r.n,
d:r.d,
p:null
}
}
}
if (!this.o.r) this.d[t.c]=1;
return t;
},
f:false,
g: function () {
var c= j.reciever.COMO
if (!c||this.f) this.s();
else {
var o= c.obj;
if (o != this) {
var r= a.getOverviewWindow();
var v= r.getVisibility();
var p= r.getTab();
if (v== "visible" && p== 3) {
alert("Command Overview window must be closed for this to work");
return;
}
else
this.s();
}
}
var i= this.m();
if (i.c== -1||!this.k) {
new qx.event.Timer.once(this.g,this,1000);
return;
}
if (i.c== 0) {
this.d={};
i= this.m();
if (i.c==0) {
w.h();
alert("No more idle troops.  Try again later.");
return;
}
}
var h= i;
if (i.c== t.getId()&&i.p&&i.p.c) h= i.p;
if (a.currentOverlay) a.switchOverlay();
var m= "r"
if (h.n) m= "w"
p=this.getIdle();
if (p==h.d) h.d+=" ";
this.setIdle(h.d);
this.j(h.c, m);
},
t: function(i){
if (!p.cities[i]) return;
t.setRequestId(i);
a.visMain.selectEntity();
ClientLib.Vis.VisMain.GetInstance().ResetSelection();
},
r: function (x,y,m){
if (!x||!y) return;
if (m!="r"&&m!="w") m=null;
if (!m) {
m=a.visMain.getMapMode()
if (m=="c") m="r";
}
webfrontend.gui.Util.showMapModeViewPos(m,0,x,y);
},
j1: null,
j: function(i, j) {
this.j1=t.getId();
var k= i >> 16;
var l= i & 0xFFFF;
this.r(l,k,j);
this.t(i);
},
j2: function() {
if (this.j1) {
var i=this.j1;
this.j1=null;
this.j(i,"r")
}
},
h: {},
e: {},
x: function(){
var i= t.getId();
this.h[i]= true;
this.g();
},
u: function(){
var i= t.getId();
var c= s.getContinentFromCoords(i&0xffff, i>>>16);
this.e[c]= true;
this.g();
},
b: function(){
this.h= {};
this.e={};
},
o: {
p:4,
t:10,
r:true,
s:true,
},
l: function(t) {
if (this.o[t]) return false;
else return true;
},
n: function (t,v) {
if (!v) this.o[t]=1;
else delete this.o[t];
this.p()
this.f=true;
},
w: function(){
var e= this.o= this.v();
if (!e) {
e=this.o={};
e.p=4;
e.t=0;
e.r=true;
e.s=true;
e.d=true;
e.o=true;
e.n=true;
e.w=true;
e.g=false;
e.a=60;
e.f=20;
e.q=0;
e.b=false;
e.v=true;
e.c=12;
e[1]=1;
e[2]=1;
e[8]=1;
e[13]=1;
e[14]=1;
e[15]=1;
e[19]=1;
this.p();
}
if (e.p==null) e.p=4;
if (e.t==null) e.t=10;
if (e.a==null) e.a=60;
if (e.r==null) e.r=true;
if (e.s==null) e.s=true;
if (e.d==null) e.d=true;
if (e.o==null) e.o=true;
if (e.n==null) e.n=true;
if (e.w==null) e.w=true;
if (e.g==null) e.g=false;
if (e.f==null) e.f=20;
if (e.q==null) e.q=0;
if (e.b==null) e.b=false;
if (e.v==null) e.v=true;
if (e.c==null) e.c=12;
},
p: function(){
if (localStorage)
localStorage["davelouraid"+i]=JSON.stringify(this.o);
else
console.error("no localstorage");
},
v: function () {
var j= localStorage["davelouraid"+i];
if (j) return JSON.parse(j);
else return null;
},
},
});
}
qrs();
function qrs(){
qx.Class.define("dave.lou.RS",
{
extend: qx.core.Object,
construct: function()
{
this.k();
},
members: {
k: function(){
var i=j.reciever.WORLD.obj;
for (var k in i) {
if(i.hasOwnProperty(k)&&i[k].d) d.y=i[k].d;
}
if (d.y) {
d.y.DLW=this.l;
r=this;
}
},
l: function(i,j){
var a=i>>>5;
var b=j>>>5;
var k=a+(b<<5);
if (this[k]&&!this[f["a"]]) {
for (var l in this[k]) {
if(this[k].hasOwnProperty(l)&&this[k][l].c&&this[k][l].d) {
for (var m in this[k][l].d) {
if (this[k][l].d[m].hasOwnProperty("Type")) {
this[f["a"]]=l;
break;
}
}
}
if (this[f["a"]]) break;
}
}
if (this[f["a"]]){
return this[k][this[f["a"]]].d[((j-b*32)<<16)+i-a*32];
}
return null;
},
}
});
}
qrw();
function qrw(){
qx.Class.define("dave.lou.RW",
{
extend: qx.ui.window.Window,
construct: function()
{
qx.ui.window.Window.call(this);
this.k();
},
members: {
a: null,
b: null,
i: true,
j: {},
k: function() {
this.set({
resizable: false,
showClose: false,
showMaximize : false,
showMinimize : false,
showStatusbar : false,
useMoveFrame : true,
contentPadding:0,
});
this._setLayout(new qx.ui.layout.VBox());
this.setCaption(" ");
this.setLayout(new qx.ui.layout.VBox());
y=this;
this.a=new d.I().s();
this.add(this.a);
this.b=new d.RL();
this.add(this.b);
this.l();
this.addListener("move",function(){
var b=this.getBounds();
if (this.i) {
if (c.o.tl!=b.left&&c.o.tt!=b.top) {
c.o.tl= b.left;
c.o.tt= b.top;
c.p();
}
}
else {
if (c.o.wl!=b.left&&c.o.wt!=b.top) {
c.o.wl= b.left;
c.o.wt= b.top;
c.p();
}
}
},this)
this.addListener("close",function() {
this.l();
},this);
},
l: function() {
this.hide();
w.k2.setLabel("L")
w.k2.setToolTipText("Change to List Mode")
this.i=true;
if (c.o.v) {
this._setLayout(new qx.ui.layout.VBox());
this.a.setLayout(new qx.ui.layout.VBox());
}
else {
this._setLayout(new qx.ui.layout.HBox());
this.a.setLayout(new qx.ui.layout.HBox());
}
this.setShowClose(false);
if (c.o.tl&&c.o.tt)
this.moveTo(c.o.tl,c.o.tt);
else
this.moveTo(qx.bom.Viewport.getWidth()-270,qx.bom.Viewport.getHeight()-220);
this.b.setVisibility("excluded");
this.b.v=false;
this.open();
},
m: function() {
this.hide();
w.k2.setLabel("T")
w.k2.setToolTipText("Change to Toolbar Mode")
this.i=false;
this._setLayout(new qx.ui.layout.VBox());
this.a.setLayout(new qx.ui.layout.HBox());
this.a.setBackgroundColor(null);
this.setShowClose(true);
if (c.o.wl&&c.o.wt)
this.moveTo(c.o.wl,c.o.wt);
else
this.center();
this.b.setVisibility("visible");
this.b.v=true;
this.open();
this.b.p();
},
}
});
}
qi();
function qi() {
qx.Class.define("dave.lou.I", {
extend: qx.ui.container.Composite,
construct: function()
{
qx.ui.container.Composite.call(this);
this.buildGUI();
},
members: {
q: new Date(),
buildGUI: function() {
this.setLayout(new qx.ui.layout.VBox());
this.setBackgroundColor("Beige");
this.a= new qx.ui.form.Button("N").set({
appearance: "button-text-small",
toolTipText: "Go to next city",
padding:3,
})
this.a.addListener("execute",function(){
w.g();
c.g();
},c,false);
this.add(this.a);
this.d= new qx.ui.form.Button("R").set({
appearance: "button-text-small",
toolTipText: "Regenerate list",
padding:3,
})
this.d.addListener("execute",function(){
w.g();
c.d={};
c.g();
},c,false);
if (c.o.r) {
this.d.setVisibility("excluded")
}
else {
this.d.setVisibility("visible")
}
this.add(this.d);
this.b= new qx.ui.form.Button("I").set({
appearance: "button-text-small",
toolTipText: "Add current city to Ignore List",
padding:3,
})
this.b.addListener("execute",function(){
w.g();
c.x();
},c,false);
this.add(this.b);
this.e= new qx.ui.form.Button("W").set({
appearance: "button-text-small",
toolTipText: "Add whole continent to Ignore List",
padding:3,
})
this.e.addListener("execute",function(){
w.g();
c.u();
},c,false);
this.add(this.e);
this.c= new qx.ui.form.Button("C").set({
appearance: "button-text-small",
toolTipText: "Clear Ignore List",
padding:3,
})
this.c.addListener("execute",function(){
c.b()
},c,false);
this.add(this.c);
this.k2= new qx.ui.form.Button("L");
this.k2.set({
appearance: "button-text-small",
blockToolTip: false,
toolTipText : "Change to List Mode",
padding:3,
});
this.add(this.k2)
this.k2.addListener("execute", function(){
if (y.i) {
y.m();
}
else {
y.l();
}
},this.k2);
var j= new qx.ui.menu.Menu().set({
iconColumnWidth: 0,
});
var m= new qx.ui.form.MenuButton("M",null,j).set({
appearance: "button-text-small",
toolTipText: "Menu for dungeon reset and utils",
padding:3,
})
this.add(m);
var k= new qx.ui.menu.Button("Reset to Once");
k.set({
blockToolTip: false,
toolTipText : "Reset all raids to Once",
});
j.add(k)
k.addListener("execute", function(){
this.v(0,0);
},this, false);
k= new qx.ui.menu.Button("Reset to Complete");
k.set({
blockToolTip: false,
toolTipText : "Reset all raids to Complete",
});
j.add(k)
k.addListener("execute", function(){
this.v(0,1);
},this, false);
k= new qx.ui.menu.Button("Reset to Earliest Order");
k.set({
blockToolTip: false,
toolTipText : "Reset all raids to finish before orders",
});
j.add(k)
k.addListener("execute", function(){
this.t();
},this, false);
this.z= new qx.ui.menu.Button("Reset to Today 23:00");
this.z.set({
blockToolTip: false,
toolTipText : "Reset all raids to finish before Reset time",
});
j.add(this.z)
this.z.addListener("execute", function(){
this.t2();
},this, false);
k= new qx.ui.menu.Button("Change Reset time");
k.set({
blockToolTip: false,
toolTipText : "Change the Reset time",
});
j.add(k);
w=this;
new d.ID();
k.addListener("execute", function(){
g.show();
},this, false);
k= new qx.ui.menu.Button("Toggle WorldView Panel");
k.set({
blockToolTip: false,
toolTipText : "Hide/Show left panel in World View",
});
j.add(k)
k.addListener("execute", function(){
this.x();
},this, false);
k= new qx.ui.menu.Button("Go to Previous City");
k.set({
blockToolTip: false,
toolTipText : "Go back to previous city in idle list",
});
j.add(k)
k.addListener("execute", function(){
c.j2();
},this, false);
this.p= new qx.ui.window.Window("Idle Troops").set({
allowMaximize : false,
allowMinimize : false,
allowClose: false,
showMaximize : false,
showMinimize : false,
showStatusbar : false,
allowGrowX:false,
allowGrowY:false,
showClose : false,
useMoveFrame : true,
contentPadding: 0,
margin: 0,
});
this.p.setLayout(new qx.ui.layout.HBox());
this.p.text= new qx.ui.form.TextArea("Type").set({
autoSize:true,
minimalLineHeight: 3,
width:100
});
this.p.text.setReadOnly(true);
this.p.add(this.p.text);
if (c.o.pl&&c.o.pt)
this.p.moveTo(c.o.pl,c.o.pt);
else
this.p.moveTo(790,400);
},
a: null,
b: null,
c: null,
d: null,
e: null,
k2: null,
o: false,
s: function(){
c.addListener("changeIdle", function(e){
this.p.text.setValue(e.getData());
this.p.show();
this.q= new Date();
},this,false)
t.addListener("changeVersion", this.l, this);
this.p.addListener("move",function(){
var b=this.getBounds();
if (c.o.pl!=b.left&&c.o.pt!=b.top) {
c.o.pl= b.left;
c.o.pt= b.top;
c.p();
}
},this.p,false)
return this;
},
n: false,
p: d.lou=d.lou||function(){},
j: 0,
l: function(){
if (!this.n) {
this.n= true
var newc= t.getId()*1;
if (this.j != newc) {
this.j=newc;
w.h();
}
this.n= false;
}
},
z: null,
f: false,
g:function(){
y.setEnabled(false);
y.b.r3();
this.a.setEnabled(false);
this.b.setEnabled(false);
if (!c.o.r)
this.d.setEnabled(false);
this.f=true;
},
h:function(){
var d= this.q - new Date() + c.o.p*1000;
if (d > 0) {
new qx.event.Timer.once(this.h,this,d);
return;
}
else
this.p.hide();
y.setEnabled(true);
this.a.setEnabled(true);
this.b.setEnabled(true);
if (!c.o.r)
this.d.setEnabled(true);
this.f=false;
if (h) h.p();
},
t: function(){
var r= t.unitOrders;
if (!r) return;
var s=0;
for (var i= 0; i < r.length; i++) {
var o= r[i];
if (o.player>=0&&o.isDelayed) {
if (s==0) s= o.start;
else if (s > o.start) s= o.start;
}
}
if (s>0){
s-=c.o.a*60;
this.v(s,2);
}
},
t2: function(){
this.v(g.k,2)
},
v: function(s,m){
var k= t.unitOrders;
for (var i= 0; i < k.length; i++) {
var j= k[i];
if (j.type== 8 ) {
var end=s;
if (end== 0) end= j.end;
var aa= new d.CO(j.id,end,m,j.isDelayed);
aa.x();
}
}
},
x: function() {
if (a.worldMapConfig) {
this.y=!this.y;
if (this.y) {
a.worldMapConfig.setVisibility("visible");
}
else {
a.worldMapConfig.setVisibility("hidden")
}
}
},
y: true,
}
});
}
qrl()
function qrl() {
qx.Class.define("dave.lou.RL",
{
extend: qx.ui.container.Composite,
construct: function()
{
qx.ui.container.Composite.call(this);
try {
this.buildGUI();
} catch (e) {
console.error(e)
}
},
members: {
i: null,
j: {},
buildGUI: function() {
this.setLayout(new qx.ui.layout.VBox(0));
this.w=new qx.ui.core.Spacer(20,1);
this.add(this.w);
o=new qx.ui.container.Composite(new qx.ui.layout.HBox(5).set({
alignY: "middle",
}));
o.add(new qx.ui.core.Spacer(2,2))
this.add(o);
var n=new qx.ui.form.CheckBox("Boss").set({
height: 20,
allowGrowX: false,
})
n.setValue(true);
n.addListener("changeValue", function (e) {
this.b = e.getData();
this.r();
}, this)
o.add(n);
n=new qx.ui.form.CheckBox("Dungeon").set({
height: 20,
allowGrowX: false,
})
n.setValue(true);
n.addListener("changeValue", function (e) {
this.d = e.getData();
this.r();
}, this)
o.add(n);
o.add(new qx.ui.core.Spacer(2,2))
var o=new qx.ui.layout.Grid(4,4);
o.setColumnAlign(2, "right", "middle");
this.m=new qx.ui.container.Composite(o);
h=this;
o=new qx.ui.container.Scroll(this.m);
this.add(o,{
flex:1
});
},
b: true,
d: true,
w: null,
v: null,
m: null,
n: null,
o: null,
a: null,
p: function() {
if (!this.v) return;
var i=t.getId(),j=i>>>5;
this.t=i&0xffff;
this.s=i>>>16;
this.n=0;
this.a=true;
for (var k in t.units) {
if (k<3||k==8||k==13||k==14||k>17) continue;
if (this.n<d.x.t[k].s)this.n=d.x.t[k].s
if (m.units[k].ut!=4) this.a=false;
}
this.o2={};
var a=s.getContinentWidth()*s.getContinentCountX()-1;
var b=s.getContinentHeight()*s.getContinentCountY()-1;
for (j=this.t-c.o.c;j<=this.t+c.o.c+29;j+=30) {
if (j<0) j=0;
if (j>a) j=a;
for (k=this.s-c.o.c;k<=this.s+c.o.c+29;k+=30) {
if (k<0)k=0;
if (k>b)k=b;
i=(k&0xffe0)+(j>>>5);
this.o2[i]=0;
if (k==b) break;
}
if (j==a) break;
}
this.p2();
},
o2: f=l[0],
p2: function() {
if (!r) new d.RS();
if (d.y&&!d.y[f["a"]]) {
for (k in d.y) {
for (var l in d.y[k]) {
if(d.y[k].hasOwnProperty(l)&&d.y[k][l].c&&d.y[k][l].d) {
for (var m in d.y[k][l].d) {
if (d.y[k][l].d[m].hasOwnProperty("Type")) {
d.y[f["a"]]=l;
break;
}
}
}
if (d.y[f["a"]]) break;
}
if (d.y[f["a"]]) break;
}
}
if (d.y==null||d.y[f["a"]]==null) {
webfrontend.gui.Util.showMapModeViewPos("w",0,this.t,this.s);
new qx.event.Timer.once(this.p2,this,1000);
return;
}
this.o=[];
for (var k in this.o2) {
if (!d.y[k]) {
webfrontend.gui.Util.showMapModeViewPos("w",0,this.t,this.s);
new qx.event.Timer.once(this.p2,this,1000);
return;
}
this.q(k)
}
if (this.v) {
this.r();
}
},
q: function(k) {
var i=k&0x1f;
var j=k>>>5;
var l=d.y[k][d.y[f["a"]]].d;
for (var q in l) {
var n=l[q];
if (n["State"]&&(n["Type"]==2||n["Type"]==3)){
if (n["Type"]==2) {
if (n["DungeonType"]==2&&!this.a) continue;
if (n["DungeonType"]!=2&&this.a) continue;
t=3600;
var e=m.dungeons[n["DungeonType"]].n.substr(0, 1).toUpperCase();
var b=n["Progress"]+"%";
}
else {
if (n["BossType"]==12&&!this.a) continue;
if (n["BossType"]!=12&&this.a) continue;
t=0;
e="B";
b=m.dungeons[n["BossType"]].dn.substr(0, 3)
}
var x=(i<<5)+(q&0x1f);
var y=(j<<5)+(q>>>16);
var p=Math.sqrt(Math.pow(x-this.t,2)+Math.pow(y-this.s,2));
var t=t+p*this.n;
var s=new Date();
s.setHours(0, 0, t, 0);
var u="green";
if (t>14400) u = "red";
else if (t>10800) u = "magenta";
else if (t>7200) u="blue"
if (p<c.o.c&&t<25200) {
var o={
s:k,
i:q,
x:x,
y:y,
l:n["DungeonLevel"]||n["BossLevel"],
p:b,
t:n["DungeonType"]||n["BossType"],
n:e,
d:Math.round(t),
u:s.toLocaleTimeString().substr(0, 5),
v:u,
};
this.o.push(o);
}
}
}
this.o.sort(function(a, b) {
return a.d - b.d;
});
},
r3: function() {
var c= this.m.getLayout();
for (var i= 0; i < c.getRowCount(); i++) {
var d=c.getCellWidget(i,1);
d.removeListener("click",this.r2,this,false);
d.setContextMenu(null);
d.setToolTip(null);
}
this.m.removeAll();
},
r: function() {
this.r3();
var a=0;
for (var i=0; i < this.o.length; i++) {
var j=this.o[i];
if (j.n=="B"&&!this.b) continue;
if (j.n!="B"&&!this.d) continue;
this.m.add(new qx.ui.core.Spacer(5,5),{
row:a,
column:0
})
var x="000"+j.x;
var y="000"+j.y;
x=x.substr(-3);
y=y.substr(-3);
var b=new qx.ui.basic.Label("<font color=\"blue\"><u>"+j.n+" "+j.l+"</u>").set({
cursor:"pointer",
rich:true,
})
this.m.add(b,{
row:a,
column:1
})
b.setUserData("dlrx",j.x);
b.setUserData("dlry",j.y);
b.addListener("click",this.r2,this,false)
b.setContextMenu(k.m);
b.setToolTip(d.x.h);
this.m.add(new qx.ui.basic.Label(j.p).set({
textAlign:"right"
}),{
row:a,
column:2
})
this.m.add(new qx.ui.basic.Label("<font color=\""+j.v+"\">"+j.u).set({
rich:true,
textAlign:"right"
}),{
row:a,
column:3
})
a++;
}
var c= this.m._computeSizeHint();
a=c.minWidth+28;
c=this.w.getWidth();
if (a>c) this.w.setWidth(a);
},
r2: function (e) {
if (e.getButton()=="left") {
var t=e.getTarget();
var x=t.getUserData("dlrx")*1;
var y=t.getUserData("dlry")*1;
webfrontend.gui.Util.showMapModeViewPos("r",0,x,y);
}
},
s: null,
t:null,
u:null,
}
});
}
qid();
function qid() {
qx.Class.define("dave.lou.ID", {
extend: qx.ui.window.Window,
construct: function()
{
this.base(arguments,"Reset Time");
this.buildGUI();
this.set({
allowMaximize : false,
allowMinimize : false,
showMaximize : false,
showMinimize : false,
showStatusbar : false,
useMoveFrame : true,
contentPadding:5
});
this.setLayout(new qx.ui.layout.VBox());
this.center();
},
members: {
d: new qx.ui.form.SelectBox(),
dl:"Today",
dv:0,
h: new qx.ui.form.SelectBox(),
hv:23,
m: new qx.ui.form.SelectBox(),
mv:0,
buildGUI: function() {
g=this;
var li=new qx.ui.form.ListItem("Today", null, 0);
this.d.add(li);
this.d.add(new qx.ui.form.ListItem("Tomorrow", null, 1));
this.d.add(new qx.ui.form.ListItem("2 days", null, 2));
this.d.add(new qx.ui.form.ListItem("3 days", null, 3));
this.d.add(new qx.ui.form.ListItem("4 days", null, 4));
this.d.add(new qx.ui.form.ListItem("5 days", null, 5));
this.d.addListener("changeSelection", function() {
this.dl=this.d.getSelection()[0].getLabel();
this.dv=this.d.getSelection()[0].getModel();
this.i();
}, this,false);
this.d.setSelection([li]);
this.h.set({
width:50,
height:20
});
this.m.set({
width:50,
height:20
});
for (var i= 0; i < 24; i++) {
li= new qx.ui.form.ListItem(String(i), null, i);
this.h.add(li);
if (i==this.hv) this.h.setSelection([li]);
}
this.h.addListener("changeSelection", function() {
this.hv=this.h.getSelection()[0].getModel();
this.i();
}, this,false);
li=new qx.ui.form.ListItem("0", null, 0);
this.m.add(li);
for (i= 1; i < 60; i++) {
this.m.add(new qx.ui.form.ListItem(String(i), null, i));
}
this.m.addListener("changeSelection", function() {
this.mv= this.m.getSelection()[0].getModel();
this.i();
}, this,false);
this.m.setSelection([li]);
var a= new qx.ui.container.Composite(new qx.ui.layout.HBox());
a.add(this.d);
a.add(this.h);
a.add(this.m);
this.add(a);
this.i();
},
i:function(){
var i= this.dv*1;
this.j= new Date();
var j=new Date();
j.setMilliseconds(j.getTimezoneOffset()*60*1000+o);
this.j.setDate(j.getDate()+i);
this.j.setHours(this.hv);
this.j.setMinutes(this.mv);
this.j.setSeconds(0);
this.j.setMilliseconds(this.j.getTimezoneOffset()*60*-1000-o+150);
var d= Math.ceil((this.j-new Date()+u.diff)/1000);
this.k= u.getServerStep()+d;
this.l= this.dl+" "+this.hv+":"+(this.mv+100).toString().substr(-2)
w.z.setLabel("Reset to "+this.l);
},
j: null,
k: null,
l: null,
}
});
}
qrio()
function qrio() {
qx.Class.define("dave.lou.RIo", {
extend: qx.ui.container.Composite,
construct: function()
{
this.base(arguments,new qx.ui.layout.VBox());
c=new d.C();
this.buildGUI();
var i=new qx.ui.tabview.Page("Raid");
i.setLayout(new qx.ui.layout.Grow());
var j=new qx.ui.container.Scroll(this).set({
allowStretchY:true,
allowStretchX:true
});
i.add(j)
a.getOptionsPage().clientArea.getChildren()[0].add(i)
},
members: {
off:null,
def:null,
nav:null,
buildGUI: function(){
this.setLayout(new qx.ui.layout.VBox())
var t= "<b>DaveLoU Raid Assistant</b> <br><br>  "
+"<b>Idle Troops</b> <br>"
+"Included troops:"
var l= new qx.ui.basic.Label(t).set({
rich:true,
})
this.add(l)
this.add( new qx.ui.core.Spacer(5,5));
var h= new qx.ui.container.Composite(new qx.ui.layout.HBox({
alignY:"middle"
}));
this.add(h)
var n=new qx.ui.form.CheckBox("OFFENSE").set({
width: 100,
})
n.setValue(c.o.o)
n.addListener("changeValue",function(e){
if (e.getData()) {
this.off.setEnabled(true);
c.o.o=true;
}
else {
this.off.setEnabled(false);
c.o.o=false;
}
c.p();
c.f=true;
},this,false)
h.add(n);
this.off= new qx.ui.container.Composite(new qx.ui.layout.Flow());
h.add(this.off);
if (!c.o.o){
this.off.setEnabled(false);
}
this.add( new qx.ui.core.Spacer(5,5));
h= new qx.ui.container.Composite(new qx.ui.layout.HBox({
alignY:"middle"
}));
this.add(h)
n= new qx.ui.form.CheckBox("DEFENSE").set({
width: 100,
})
n.setValue(c.o.d)
n.addListener("changeValue",function(e){
if (e.getData()) {
this.def.setEnabled(true);
c.o.d=true;
}
else {
this.def.setEnabled(false);
c.o.d=false;
}
c.p();
c.f=true;
},this,false)
h.add(n)
this.def= new qx.ui.container.Composite(new qx.ui.layout.Flow());
h.add(this.def);
if (!c.o.d){
this.def.setEnabled(false);
}
this.add( new qx.ui.core.Spacer(5,5));
h= new qx.ui.container.Composite(new qx.ui.layout.HBox({
alignY:"middle"
}));
this.add(h)
n= new qx.ui.form.CheckBox("NAVY").set({
width: 100,
})
n.setValue(c.o.n)
n.addListener("changeValue",function(e){
if (e.getData()) {
this.nav.setEnabled(true);
c.o.n=true;
}
else {
this.nav.setEnabled(false);
c.o.n=false;
}
c.p();
c.f=true;
},this,false)
h.add(n)
this.nav= new qx.ui.container.Composite(new qx.ui.layout.Flow());
h.add(this.nav);
if (!c.o.n){
this.nav.setEnabled(false);
}
var n2=1;
var n1=1;
var n3=1;
for (t in m.units) {
if (t==1||t==2||t==8||t==13||t==14) continue;
if (t>17) break;
var u= m.units[t];
n= new qx.ui.form.CheckBox(u.dn).set({
width: 100,
});
if (t==3||t==4||t==5||t==9||t==10) {
n1++;
this.def.add(n,{
lineBreak: (n1%4==0)
});
}
else if (t==15||t==16||t==17) {
n3++;
this.nav.add(n,{
lineBreak: (n3%4==0)
});
}
else {
n2++;
this.off.add(n,{
lineBreak: (n2%4==0)
})
}
n.setModel(t);
n.setValue(c.l(t))
n.addListener("changeValue",function(e){
c.n(this.getModel(),e.getData())
},false);
}
l= new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add( new qx.ui.core.Spacer(10,10));
this.add(l)
n= new qx.ui.basic.Label("Minimum seconds to display troop popup ").set({
width: 250
});
l.add(n)
n= new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 1,
height: 20,
width: 20,
allowGrowX:false,
})
n.setValue(c.o.p.toString())
n.addListener("changeValue",function(){
var r= this.getValue();
if (r) {
if (r!=c.o.p) {
c.o.p= r*1;
c.p();
}
}
else
this.setValue(c.o.p.toString())
},false);
l.add(n);
l= new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n= new qx.ui.basic.Label("Ignore cities with less than (in 1000s) ").set({
width:250,
});
l.add(n)
n= new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 2,
height: 20,
width: 30,
allowGrowX:false,
})
n.setValue(c.o.t.toString())
n.addListener("changeValue",function(){
var r= this.getValue();
if (r) {
if (r!=c.o.t) {
c.o.t= r*1;
c.p();
}
}
else
this.setValue(c.o.t.toString())
},false);
l.add(n);
l= new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n= new qx.ui.basic.Label("Regenerate list every time (hides R Button) ").set({
width:250,
});
l.add(n)
n= new qx.ui.form.CheckBox().set({
height:20,
});
n.setValue(c.o.r)
n.addListener("changeValue",function(){
var r= this.getValue();
c.o.r= r;
c.p();
if (r) {
if (w) w.d.setVisibility("excluded")
c.d={};
}
else {
if (w) w.d.setVisibility("visible")
}
},false);
l.add(n);
l= new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n= new qx.ui.basic.Label("Subtract scheduled orders from count").set({
width:250,
});
l.add(n)
n= new qx.ui.form.CheckBox().set({
height:20,
});
n.setValue(c.o.s)
n.addListener("changeValue",function(){
var s= this.getValue();
c.o.s= s;
c.p();
},false);
l.add(n);
l= new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n= new qx.ui.basic.Label("Restrict to current selected group").set({
width:250,
});
l.add(n)
n= new qx.ui.form.CheckBox().set({
height:20,
});
n.setValue(c.o.g)
n.addListener("changeValue",function(){
var s= this.getValue();
c.o.g= s;
c.p();
},false);
l.add(n);
l= new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n= new qx.ui.basic.Label("Reset raids minutes before scheduled orders").set({
width:250,
});
l.add(n)
n= new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 3,
width: 30,
})
n.setValue(c.o.a.toString())
n.addListener("changeValue",function(){
var s= this.getValue();
if (s&&(s*1)!=c.o.a) {
c.o.a= s*1;
c.p();
}
else
this.setValue(c.o.a.toString())
},false);
l.add(n);
l= new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n= new qx.ui.basic.Label("Toolbar is vertical (or horizontal)").set({
width:250,
});
l.add(n)
n= new qx.ui.form.CheckBox().set({
height:20,
});
n.setValue(c.o.v)
n.addListener("changeValue",function(){
var s= this.getValue();
if (s!=c.o.v&&y.b.isHidden()) {
c.o.v= s;
y.l()
}
else c.o.v= s;
c.p();
},false);
l.add(n);
l= new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n= new qx.ui.basic.Label("Dungeon/Boss list search radius (4-20").set({
width:250,
});
l.add(n)
n= new qx.ui.form.Spinner(4,c.o.c,20).set({
width: 50,
})
n.addListener("changeValue",function(){
var s= this.getValue();
c.o.c= s*1;
c.p();
},false);
l.add(n);
this.add( new qx.ui.core.Spacer(5,5));
t= "<br><b>Raid Send</b> <br>"
l= new qx.ui.basic.Label(t).set({
rich:true,
})
this.add(l)
this.add( new qx.ui.core.Spacer(5,5));
l= new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n= new qx.ui.basic.Label("Show info on region/world tooltip").set({
width:250,
});
l.add(n)
n= new qx.ui.form.CheckBox().set({
height:20,
});
n.setValue(c.o.w)
n.addListener("changeValue",function(){
var s= this.getValue();
c.o.w= s;
c.p();
},false);
l.add(n);
l= new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n= new qx.ui.basic.Label("Raid 1-2 day end time (0-23) 20=8pm").set({
width:250,
});
l.add(n)
n= new qx.ui.form.Spinner(0,c.o.f,23).set({
width: 50,
})
n.addListener("changeValue",function(){
var s= this.getValue();
c.o.f= s*1;
c.p();
},false);
l.add(n);
l= new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n= new qx.ui.basic.Label("Raid delay offset time (minutes)").set({
width:250,
});
l.add(n)
n= new qx.ui.form.TextField().set({
filter: /\d/,
maxLength: 3,
width: 30,
})
n.setValue(c.o.q.toString())
n.addListener("changeValue",function(){
var s= this.getValue();
c.o.q= s*1;
c.p();
},false);
l.add(n);
l= new qx.ui.container.Composite(new qx.ui.layout.HBox().set({
alignY: "middle",
}));
this.add(l)
n= new qx.ui.basic.Label("For bosses, ignore slow troops if dual speed").set({
width:250,
});
l.add(n)
n= new qx.ui.form.CheckBox().set({
height:20,
});
n.setValue(c.o.b);
n.addListener("changeValue",function(){
var s= this.getValue();
c.o.b= s;
c.p();
},false);
l.add(n);
},
},
});
}
qt()
function qt() {
qx.Class.define("dave.lou.T", {
extend: qx.core.Object,
construct: function()
{
this.s();
d.x= this;
this.h=a.worldViewToolTip;
this.h.addListener("appear", this.g1, this);
},
properties: {
targetChanged : {
init: false,
check: "Boolean",
event: "changeTarget"
},
},
members: {
h:d=d.lou,
ii:0,
i: function(i) {
this.ii=i;
this.toggleTargetChanged();
},
g1: function() {
if (a.visMain.getMapMode()=="c") return;
y=this.h.getOpener();
if (y) {
var x=this.h.getOpener().getUserData("dlrx");
var y=this.h.getOpener().getUserData("dlry");
if (x&&y) {
var l="<td>"+x+":"+y+"</td><br>";
this.h.setLabel(l);
}
}
try {
if (!r) new d.RS();
if (!r) return;
var t= this.h.getLabel();
this.i(0);
if (t&&t.length>10&&(j=t.match(/td>\d{3}:\d{3}</))) {
var j=j[0].match(/\d+/g);
if (j.length==2) {
this.g0[0]=j[0]*1;
this.g0[1]=j[1]*1;
this.j(t);
}
}
}
catch (e) {
console.error(e);
}
},
g0:[],
j: function (t) {
try {
var i=d.y.DLW(this.g0[0],this.g0[1])
if (i){
var k=i["Type"];
if (i["State"]) {
this.j1();
if (k==2) this.k(i,this.g0,t)
else if (k==3) this.l(i,this.g0,t)
}
}
}
catch (e) {
console.error(e);
}
},
j0: null,
j1: function () {
this.j0={};
if (t.unitOrders) {
for (var k= 0; k < t.unitOrders.length; k++) {
var n= t.unitOrders[k];
if (n.isDelayed) {
for (r= 0; r < n.units.length; r++) {
if (this.j0[n.units[r].type]) this.j0[n.units[r].type]+=n.units[r].count;
else this.j0[n.units[r].type]=n.units[r].count;
}
}
}
}
},
j2: function (i) {
var j=(100-this.e)/400*i+5+this.e;
return (j>95)?95:j;
},
j3: function (i) {
var k=.9-i/8;
var j=(100-this.e)*k+this.e;
return (j>95)?95:j;
},
k: function (i,j,l,s,n,r) {
this.c= j[1];
this.d= j[0];
this.x(this.d,this.c);
this.e= i["Progress"];
this.f= i["DungeonLevel"];
if (i["DungeonType"]==4) this.g=1;
else if (i["DungeonType"]==5) this.g=2;
else if (i["DungeonType"]==3) this.g=3;
else if (i["DungeonType"]==2) this.g=4;
else this.g=0;
(t.unitOrders==null)?this.q8=0:this.q8=t.unitOrders.length;
this.q8=t.getOrderLimit()-this.q8;
this.y();
n=this.w/3;
this.o={
i:k=this.m(this.g,this.a[this.f-1]*100),
k:0,
};
r= this.o.i/3;
this.p={
i:Math.round(r + (k-r)*(this.e)/100),
k:0,
};
this.n={
i:Math.round(r + (k-r)*(this.j2(this.w))/100),
k:0,
};
this.r={
i:Math.round(r + (k-r)*(this.j2(this.w+24))/100),
k:0,
};
this.q6={};
this.q7={};
this.q=this.q0=this.q1=this.q2=this.q3=this.q4=this.q5=s=0;
n="";
var ra=1,rb=1;
for (var k in t.units) {
if (k==1||k>17||k==2||k==8||k==13||k==14) continue;
i=t.units[k].count;
if (this.j0[k]) i-= this.j0[k];
if (i<7) continue;
r=i* m.units[k].c;
if (k==16) {
r=r*.7;
}
if ((this.g!=4&&m.units[k].ut!=4)
||(this.g==4&&m.units[k].ut==4)) {
this.q+=r;
if (k==15)this.q2=i;
this.q6[k]={
c:i,
d:i,
e:r,
f:this.t[k].a,
g:this.t[k].i,
h:this.t[k].j
};
ra+=i;
var rc=i*this.t[k].i/this.t[k].a;
if (this.t[k].j!=this.g) {
if (k==3||k==4||k==5||k==9||k==10||k==16)
rc=rc*.8;
}
rb+=rc;
if (s<this.t[k].s)s=this.t[k].s
}
else if (this.g==4){
this.q1+=r;
this.q3+=m.units[k].uc*i;
this.q7[k]={
c:i,
d:i,
e:r
};
}
n=n+m.units[k].dn+": "+i+" ";
}
ra=rb/ra;
this.o.i=Math.round(this.o.i/3 + this.o.i*.66*this.j3(ra)/100);
if (z) this.i(1);
else this.i(3);
this.k2(this.p)
this.k2(this.o)
this.k2(this.n)
this.k2(this.r)
if (c&&!c.o.w) return;
if (this.q>0) this.u=this.u*s+3600;
else this.u=0;
s=new Date();
s.setHours(0, 0, this.u, 0);
r= "Raid info: Once: "+Math.round(this.q/this.p.i*100)
+"%, 1D: "+ Math.round(this.q/this.n.i*100)
+"%, 2D: "+ Math.round(this.q/this.r.i*100)
+"%, Compl: "+Math.round(this.q/this.o.i*100)+"%<br>"+n;
l+=r+"<br>Travel time "+ s.toLocaleTimeString()
this.h.setLabel(l);
},
k2: function(i,j,k) {
i.j=Math.floor((this.q)/i.i);
i.j=(i.j>this.q8)?this.q8:i.j;
if (this.g==4&&i.j==0&&this.q2>0&&this.q1>0) {
k=i.i-this.q;
if (this.q2*500>this.q3) {
if (k<this.q1) {
i.j=1;
i.k=k/this.q1;
this.q4=1;
}
}
else {
this.q4=this.q2*500/this.q3;
if (k<this.q4*this.q1) {
i.j=1
i.k=k/this.q1;
}
}
}
},
l: function (i,j,l,r,s) {
this.c= j[1];
this.d= j[0];
this.x(this.d,this.c);
this.e= -1;
this.f= i["BossLevel"];
if (i["BossType"]==8) this.g=1;
else if (i["BossType"]==6) this.g=2;
else if (i["BossType"]==7) this.g=3;
else if (i["BossType"]==12) this.g=4;
else this.g=0;
var n="",f,u;
this.q6={};
this.q7={};
this.q=this.q1=this.q2=this.q3=this.q4=this.q5=s=0;
if (this.g!=4) {
s=100000;
for (var k in t.units) {
if (k==1||k>17||k==2||k==8||k==13||k==14||k==16||k==17) continue;
if (s >this.t[k].s) {
s=this.t[k].s
}
}
}
for (k in t.units) {
if (k==1||k>17||k==2||k==8||k==13||k==14) continue;
if (this.g!=4&&(k==16||k==17)) continue;
u= t.units[k].count;
if (this.j0[k]) u-= this.j0[k];
r=u*this.t[k].i;
if (this.t[k].j==this.g) r*=1.5;
if (this.g==4) {
if(k==15||k==16||k==17) {
this.q+=r;
if (k==15)this.q2=u;
f= {
c: u
}
this.q6[k]=f;
if (s<this.t[k].s)s=this.t[k].s
}
else {
this.q1+=r;
this.q3+=m.units[k].uc*u;
f= {
c: u
}
this.q7[k]=f;
}
n=n+m.units[k].dn+": "+u+" ";
}
else {
if ((c.o.b&&this.t[k].s==s)||!c.o.b) {
this.q+=r;
f= {
c: u
}
this.q6[k]=f;
if (s <this.t[k].s) {
s=this.t[k].s
}
n=n+m.units[k].dn+": "+u+" ";
}
}
}
this.q5=k= this.b[this.f-1]*100;
this.i(2);
this.q0=Math.floor(this.q/k);
if (this.g==4&&this.q0==0&&this.q2>0&&this.q1>0) {
if (this.q2*500>this.q3) {
if (k<this.q1+this.q) {
this.q0=1;
k-=this.q;
this.q4=k/this.q1;
}
}
else {
this.q4=this.q2*500/this.q3;
if (k<this.q+this.q4*this.q1) {
this.q0=1
k-=this.q;
this.q4=k/this.q1;
}
}
}
if (c&&!c.o.w) return;
this.u*=s;
if (this.g==4)this.u+=3600;
s=new Date();
s.setHours(0, 0, this.u, 0);
l=l+"Raid info: Enough for "+this.q0+" bosses<br>"+n
+"<br>Travel time "+ s.toLocaleTimeString();
this.h.setLabel(l);
},
s: function() {
var j,k,t=this.t={},a=b.Tech,c=a.getInstance(),d="unitDamage",e="unitSpeed",f="research",g="shrine"
for (var i in m.units) {
j=m.units[i],t[i]={};
k=(c.getBonus(d,a[f],i*1)+100+c.getBonus(d,a[g],i*1))/100;
t[i].a=j.av;
t[i].i=j.av*k;
k=(c.getBonus(e,a[f],i*1)+100+c.getBonus(e,a[g],i*1))/100;
t[i].s=j.s/k;
t[i].j=this.z[j.ut];
if (i==5) t[i].j=1;
if (i==10) t[i].j=2;
if (i==19)break;
}
},
x: function(a,b){
this.u=-1;
if (this.g==4)
this.u=p.getDistance(t.getId(),b<<16|a).w;
if (this.u<0) {
var c=t.getId();
var d=c>>>16;
c&=0xFFFF;
this.u=Math.sqrt(Math.pow(a-c,2)+Math.pow(b-d,2));
}
},
m: function(i,j) {
if (i==1) return Math.round(j*1.2);
else if (i==2) return j;
else if (i==3) return j;
else if (i==4) return Math.round(j*.8);
else return j;
},
a: [3, 15, 63, 225, 690, 1590, 3000, 5700, 9300, 13800],
b: [25, 150, 1000, 2000, 5000, 7500, 10000, 15000, 22500],
c: null,
d: null,
e: null,
f: null,
g: null,
o: null,
n: null,
r: null,
p: null,
q: null,
q0:null,
q1: null,
q2: null,
q3: null,
q4: null,
q5: null,
q6: null,
q7: null,
q8: null,
t: null,
u: null,
v: null,
w: null,
y: function() {
var d= new Date();
if (c) d.setHours(c.o.f,0,0);
else d.setHours(20,0,0);
d.setMinutes(0);
d.setSeconds(0);
d.setMilliseconds(d.getTimezoneOffset()*60*-1000-o+150);
this.w=(d-new Date())/3600000;
while ((this.w=(d-new Date())/3600000)<12){
d.setHours(d.getHours()+24);
this.w+=24;
}
this.v=d.getTime();
},
z: [0,1,2,0,4,0,0,3]
},
});
}
qs()
function qs() {
qx.Class.define("dave.lou.S", {
extend: qx.core.Object,
construct: function()
{
this.m= new qx.ui.menu.Menu();
this.m.set({
width:100,
iconColumnWidth:0
});
this.m1= new qx.ui.menu.Button("Raid 1 day");
this.m.add(this.m1);
this.m1.addListener("click",function(e){
this.k2(e);
this.n(1)
},this);
this.m2= new qx.ui.menu.Button("Raid 2 days");
this.m.add(this.m2);
this.m2.addListener("click",function(e){
this.k2(e);
this.n(2)
},this);
k=this;
this.m3= new qx.ui.menu.Button("Raid Complete");
this.m.add(this.m3);
this.m3.addListener("click",function(e){
this.k2(e);
this.n(3)
},this);
this.m5= new qx.ui.menu.Button("Raid Once");
this.m.add(this.m5);
this.m5.addListener("click",function(e){
this.k2(e)
this.n(0)
},this);
this.m4= new qx.ui.menu.Button("Raid Boss");
this.m.add(this.m4);
this.m4.addListener("execute",this.i,this);
d.x.addListener("changeTarget",this.k,this)
this.n0=p.getMinisterMilitaryPresent();
},
members: {
mo:null,
m:null,
m1: null,
m2: null,
m3: null,
m4: null,
m5: null,
n0: null,
l: function(){
},
k: function () {
this.m.hide();
if (!this.mo) {
var m=a.worldView.getContextMenu();
if (m&&m!=this.m) this.mo=m
}
if (d.x.ii==0) {
a.worldView.setContextMenu(this.mo);
}
else if (d.x.ii==1) {
a.worldView.setContextMenu(this.m);
this.m1.setVisibility("visible");
this.m2.setVisibility("visible");
this.m3.setVisibility("visible");
this.m5.setVisibility("visible");
this.m4.setVisibility("excluded");
}
else if (d.x.ii==2) {
a.worldView.setContextMenu(this.m);
this.m1.setVisibility("excluded");
this.m2.setVisibility("excluded");
this.m3.setVisibility("excluded");
this.m5.setVisibility("excluded");
this.m4.setVisibility("visible");
}
else if (d.x.ii==3) {
a.worldView.setContextMenu(this.m);
this.m1.setVisibility("excluded");
this.m2.setVisibility("excluded");
this.m3.setVisibility("excluded");
this.m5.setVisibility("visible");
this.m4.setVisibility("excluded");
}
},
k4: 0,
k3: 5,
k2: function(i) {
if (!t.unitOrders) var n=0;
else  n=t.unitOrders.length;
this.k3= t.getOrderLimit()-n;
this.k4=0;
if (i.isCtrlPressed()||i.isMetaPressed()) {
this.k4=1
}
if (i.isAltPressed()) {
this.k4+=2
}
if (i.isShiftPressed()) {
this.k4+=4
}
if (this.k4>this.k3||this.k4==0) this.k4=this.k3
d.x.j();
},
n: function (a) {
var x= d.x;
if (a==2) var p=x.r
else if (a==1) p=x.n
else if (a==0) p=x.p
else if (a==3) p=x.o
if (x.g==4&&p.i>x.q&&x.q2>0&&x.q1>0) {
u=p.i-x.q;
l=x.q4*x.q1;
if (l>u) {
u=u/l;
for (k in x.q7) {
}
}
}
var u=p.i/x.q;
var l=Math.floor(1/u);
var m=Math.max(Math.floor(x.q/p.i/0.9),l);
m=Math.min(m,x.q8);
for (var k in x.q6) {
r= x.q6[k];
r.x= Math.floor(r.c/m);
r.y=r.c-r.x*(m-1);
}
var y={};
y.playerName="";
y.coord=x.d+":"+x.c;
var kk=2;
k=x.v;
if (a==2)k+=0x14997<<10;
else if (a==3) {
k=0;
kk=1;
} else if (a==0) {
k=0;
kk=0;
}
if (this.k4<m) m=this.k4;
if (m>1) {
i= [];
m=m-1;
if (this.k4<m)m=this.k4;
for (var q in x.q6) {
p=x.q6[q].x;
r= {
t: q*1,
c: p
};
i.push(r);
}
if (!this.n0) {
u= new d.OU(0,1,true,y,8,i,1,0,0,m);
u.x();
}
else {
if (c.o.q>0) {
var t= new Date().getTime();
for (var j= 0; j < m; j++) {
t+=c.o.q*60000;
u= new d.OU(new Date(t),1,true,y,8,i,2,kk,k,1);
u.x();
}
}
else {
u= new d.OU(0,1,true,y,8,i,1,kk,k,m);
u.x();
}
}
if (m==this.k4) return;
}
var i= [];
for (q in x.q6) {
p=x.q6[q].y;
r= {
t: q*1,
c: p
};
i.push(r);
}
u= new d.OU(0,1,true,y,8,i,1,kk,k,1);
u.x();
if (this.k4==0)
w.a.execute();
},
h: function () {
var x= d.x;
var l= x.m(x.g,x.a[x.f-1]*100);
var r= l/3;
var u= Math.round(r + (l-r)*x.e/100);
u= x.e+(100-x.e)*.75
u=(l-r)*u/100;
l=Math.round(r+u);
var b= {};
var p= t.getTargetArmy();
u=0;
for (var k=0; k<p.length; k++ ) {
var q= p[k];
var n= q.t;
if (n==1||n>18||n==2||n==8||n==13||n==14||n==15) continue;
r= {
c: m.units[n].c,
s: q.c,
l: t.units[n].count,
r: t.units[n].total
};
r.y= r.l;
u += r.s * r.c;
b[n]= r;
}
var i= l/u;
if (t.unitOrders==null) n=0;
else  n=t.unitOrders.length;
var j= p= t.getOrderLimit()-n;
for (k in b) {
r= b[k];
r.t= Math.round(r.s * i);
r.m= Math.round(r.t*.9);
r.k= Math.min(t.getOrderLimit(),Math.floor(r.s/r.m))
r.u= Math.floor(r.s/r.k);
r.j= Math.floor(r.l/r.t);
r.p= Math.floor(r.l/r.m);
j= Math.min(j,r.j);
p= Math.min(p,r.p);
}
if (p>j)j=p;
if (j==0) return;
u=true;
for (k in b) {
r= b[k];
r.v= r.x= Math.floor(r.l/j);
if (r.r/r.s < (1-1/r.k)&&r.x>r.t) u=false;
if (r.x/r.t>1.3&&r.k!=1) u=false;
}
var y={};
y.playerName="";
y.coord=x.d+":"+x.c;
if (j>1) {
i= [];
j=j-1;
if (this.k4<j)j=this.k4;
for (q in b) {
if (u) p=b[q].x;
else if (b[q].t>b[q].l) p=b[q].l;
else p=b[q].t;
b[q].y -= j*p;
r= {
t: q,
c: p
};
i.push(r);
}
if (c.o.q>0) {
l= new Date().getTime();
for (q= 0; q < j; q++) {
l+=c.o.q*60000;
n= new d.OU(new Date(l),1,true,y,8,i,2,1,0,1);
n.x();
}
}
else {
n= new d.OU(0,1,true,y,8,i,1,1,0,j);
n.x();
}
if (this.k4==j)return;
}
i= [];
for (q in b) {
if (u)
if ((b[q].y-b[q].x<10)) p=b[q].y;
else p=b[q].x;
else
p=b[q].t;
b[q].y -= p;
r= {
t: q,
c: p
};
i.push(r);
}
n= new d.OU(0,1,true,y,8,i,1,1,0,1);
n.x();
},
j: null,
i: function () {
var x=d.x;
x.j();
if (x.q0==0)return;
var p=[];
var s=1;
for (var k in x.q6) {
var r= x.q6[k];
if (k==15||k==16||k==17)s=2;
if (m.units[k].uc<10) {
var l=r.c/x.q*x.q5/10;
r.t= Math.ceil(l)*10;
if (l>800) r.t=Math.ceil(l/100)*1000;
else if (l>100) r.t=Math.ceil(l/10)*100;
}
else r.t=Math.round(r.c/x.q0);
var q= {
t: k*1,
c: r.t
};
p.push(q);
}
for (k in x.q7) {
r= x.q7[k];
if (m.units[k].uc<10) {
l=r.c*x.q4/10;
r.t= Math.floor(l)*10;
if (l>500) r.t=Math.floor(l/100)*1000;
else if (l>100) r.t=Math.floor(l/10)*100;
}
else r.t=Math.round(r.c*x.q4);
q= {
t: k*1,
c: r.t
};
p.push(q);
}
var y={};
y.playerName="";
y.coord=x.d+":"+x.c;
var a= new d.OU(0,s,true,y,8,p,1,0,0,1);
a.x();
},
},
});
}
qm();
function qm() {
qx.Class.define("dave.lou.RQ",
{
extend: qx.core.Object,
construct: function()
{
this.i= new Date();
e=this;
},
members: {
i: null,
l: [],
x: function (i) {
this.l.push(i);
this.n();
},
n: function () {
var i=new Date();
if (i-this.i >100) {
this.i=i;
if (this.l.length>0) {
var j=this.l.pop();
j.y();
}
}
else {
new qx.event.Timer.once(this.n,this,100);
}
},
}
});
qx.Class.define("dave.lou.Cmd",
{
extend: qx.core.Object,
construct: function()
{
},
members: {
i: "null",
j: {},
m: null,
n: null,
p: false,
d: function () {
},
x: function () {
if (e==null) new d.RQ();
e.x(this);
},
y: function () {
x.sendCommand(this.i, this.j, this, this.cmd);
},
cmd: function (i, j, k) {
this.m= i;
this.n= j;
this.p= k;
if (!i) {
console.error(j);
}
}
}
});
qx.Class.define("dave.lou.OU",
{
extend: dave.lou.Cmd,
construct: function(time, ship, ally, target, type, units, tref, repeat, until, count)
{
if (time !=0) this.time=time.getTime();
if (ally) ally= 0;
else ally= 1;
if (repeat==null) repeat=0;
if (until==null) until=0;
this.i= "OrderUnits";
if (count==null) count=0;
this.j= {
createCity: "",
cityid: t.getId(),
iUnitOrderOptions: ally,
iOrderCountRaid: count,
raidReferenceTimeUTCMillis: until,
raidTimeReferenceType: repeat,
order : type,
timeReferenceType : tref,
referenceTimeUTCMillis : this.time,
targetPlayer : target.playerName,
targetCity : target.coord,
transport : ship,
units : units
};
},
members: {
time: 0,
}
});
qx.Class.define("dave.lou.CO",
{
extend: dave.lou.Cmd,
construct: function(i,j,k,l)
{
this.i= "UnitOrderSetRecurringOptions";
this.j= {
id : i,
cityid: t.getId(),
isDelayed: l,
recurringEndStep : j,
recurringType : k
};
},
members: {
}
});
}
var a,k,b,o,u,i,m,y,h,e,t,p,r,d,s,g,j,c,x,f,w,z=false;
try {
b=webfrontend;
a=qx.core.Init.getApplication();
m=b.res.Main.getInstance();
x=b.net.CommandManager.getInstance();
j=b.net.UpdateManager.getInstance();
b=b.data;
u=b.ServerTime.getInstance();
t=b.City.getInstance();
p=b.Player.getInstance();
s=b.Server.getInstance();
var aa=s.getName().match(/\d+/);
if (aa) aa=aa[0]*1;
else aa=0;
i=((p.getId()<<11)+aa).toString(15);
o= u.serverOffset;
new d.RIo();
new d.T();
new d.S();
if (p.getMinisterMilitaryPresent()) {
new d.RW();
z=true;
}
} catch (e) {
console.error(e);
}
}
var script= document.createElement("script");
script.innerHTML= "(" + inject.toString() + ")();";
script.type= "text/javascript";
script.title= "dave.lou.raid";
document.getElementsByTagName("head")[0].appendChild(script);
})();
