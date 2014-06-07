// ==UserScript==
// @name       Fancy Stats
// @namespace  http://some.homepage.orsomething/
// @version    1r0425
// @description  Displays Corsi, Fenwick, and Shot data in real-time.
// @grant      none
// @match      http://www.nhl.com/scores/htmlreports/*
// @match      http://www.nhl.com/ice/gamestats.htm*
// @match      http://www.japersrink.com/*
// @match      http://www.stanleycupofchowder.com/*
// @match      http://www.diebytheblade.com/*
// @match      http://www.canescountry.com/*
// @match      http://www.jacketscannon.com/*
// @match      http://www.wingingitinmotown.com/*
// @match      http://www.litterboxcats.com/*
// @match      http://www.habseyesontheprize.com/*
// @match      http://www.inlouwetrust.com/*
// @match      http://www.lighthousehockey.com/*
// @match      http://www.blueshirtbanter.com/*
// @match      http://www.silversevensens.com/*
// @match      http://www.broadstreethockey.com/*
// @match      http://www.pensburgh.com/*
// @match      http://www.rawcharge.com/*
// @match      http://www.pensionplanpuppets.com/*
// @match      http://www.anaheimcalling.com/*
// @match      http://www.matchsticksandgasoline.com/*
// @match      http://www.secondcityhockey.com/*
// @match      http://www.milehighhockey.com/*
// @match      http://www.defendingbigd.com/*
// @match      http://www.coppernblue.com/*
// @match      http://www.jewelsfromthecrown.com/*
// @match      http://www.hockeywilderness.com/*
// @match      http://www.ontheforecheck.com/*
// @match      http://www.fiveforhowling.com/*
// @match      http://www.fearthefin.com/*
// @match      http://www.stlouisgametime.com/*
// @match      http://www.nucksmisconduct.com/*
// @match      http://www.arcticicehockey.com/*
// @copyright  2012+, You
// ==/UserScript==
var gameEvents;
var xInit=60,yInit=60,xMaxInit=320,yMaxInit=240, fontSize=16;
var xscale,yscale,y2scale,scaleFactor=1,average=5;
var visitor,home;
var cbHash;
var graph;
var PAGE;
var RTSS_PAGE = "http://www.nhl.com/ice/gamestats.htm?season=20132014&gameType=3&team=&viewName=teamRTSSreports";

window.document.onload = begin();

function Curve(c,v,y2){
  this.color = (typeof(c)==='undefined') ?  "#000000" : c;
  this.vertline = (typeof(c)==='undefined') ?  false : v;
  this.y2axis = (typeof(c)==='undefined') ?  false : y2;
}

function Team(){
  this.fullname="";
  this.nickname="";
  this.score=0;
  this.fenwick=new Curve();
  this.dFenwick=new Curve();
  this.corsi=new Curve();
  this.dCorsi=new Curve();
  this.shots=new Curve();
  this.dShots=new Curve();
  
  this.goals=new Curve('#000000',true);
  this.penalties=new Curve('#000000',true);
}

function begin(){
  if(document.URL.indexOf("www.nhl.com/scores/htmlreports")>0){
    if(window.top != window.self){
      document.body.style.display='none';
      respondToSizingMessage = function(e) {
        //if(e.origin == 'http://origin-domain.com') {
        // e.data is the string sent by the origin with postMessage.
        if(e.data == 'sizing?') {
          var h = document.getElementById('cbtable').offsetHeight;
          h += document.getElementById('graph').height;
          h += 10;
          var w = Math.max(document.getElementById('cbtable').offsetWidth, document.getElementById('graph').width)+10;
          window.top.postMessage('sizing:'+h+','+w, e.origin);
        }
        //}
      };
      window.addEventListener('message', respondToSizingMessage, false);
    }
    Curve.prototype=new Array;
    gameEvents=new Array();
    visitor=new Team();
    home=new Team();
    cbHash=new Array();
    PAGE=document.URL.substring(document.URL.lastIndexOf("/")+1,document.URL.lastIndexOf("."));
  
    loadxml();
    parseEvents();
    insertElements();
    createCurves();
    updateFromCookie();
    //Load and display Fenwick data by default
    //curves.push(home.fenwick);
    //curves.push(visitor.fenwick);
    //drawGrid(Math.max(home.fenwick.length,visitor.fenwick.length));
    //plotCurve(home.fenwick);
    //plotCurve(visitor.fenwick);
  } else if(document.URL.indexOf("www.nhl.com/ice/gamestats.htm")>0){
    if( window.top != window.self && document.URL.indexOf("teamRTSSreports")>0 ){
      document.getElementById("fullPage").style.display = 'none';
      document.getElementById("c_copyright").style.display = 'none';
      document.getElementById("c_drippan").style.display = 'none';
      document.getElementById("dripTopAd").style.display = 'none';
      document.getElementById("masthead").style.display = 'none';
      document.getElementById("drippan").style.display = 'none';
      document.getElementById("leagueSiteMenu").style.display = 'none';
      var rows = document.getElementById("statsLegend").previousSibling.tBodies[0].childNodes;
      var t = document.createElement("table");
      t.setAttribute('class','data');
      var tb = document.createElement('tbody');
      t.appendChild(tb);
      for(var i=0; i<Math.min(15,rows.length); i++){
        var row = rows[i].childNodes;
        var tr = document.createElement('tr');
        tr.appendChild(row[0].cloneNode(true));
        tr.appendChild(row[2].cloneNode(true));
        tr.appendChild(row[3].cloneNode(true));
        tr.appendChild(row[8].cloneNode(true));
        tb.appendChild(tr);
      }
      document.getElementById("pageBody").insertBefore(t,document.getElementById("fullPage"));
    }
  } else { //create an iframe element that will load the game report
    var d = document.createElement("div");
    d.id = 'div';
    d.style.position = "fixed";
    d.style.right = "10px";
    d.style.zIndex = "10000";
    
    var ss = document.createElement("style");
    ss.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(ss);
      
    var toggle = document.createElement("button");
    toggle.textContent = 'Toggle Graph';
    toggle.onclick=function(){
        if(document.getElementById('frame').style.display == 'none'){
          document.getElementById('frame').style.display = '';
          document.getElementById('resizeBtn').style.display = '';
          //document.getElementById('cookieBtn').style.display = '';
          document.getElementById('switchBtn').style.display = '';
          ss.innerHTML = ".l-page-wrap{margin:0 !important;}";
        } else {
          document.getElementById('frame').style.display = 'none';
          document.getElementById('resizeBtn').style.display = 'none';
          //document.getElementById('cookieBtn').style.display = 'none';
          document.getElementById('switchBtn').style.display = 'none';
          ss.innerHTML = "";
        }
        
        return; };
    d.appendChild(toggle);
    
    //d.appendChild(document.createElement("br"));
    //document.body.insertBefore(d, document.body.firstChild);
    /*
    toggle = document.createElement("button");
    toggle.textContent = 'Clear Cookie';
    toggle.id='cookieBtn';
    toggle.onclick=function(){
        eraseCookie('myCookie'+PAGE);
        eraseCookie('mySize');
        eraseCookie('myColors'+PAGE);
        eraseCookie('myAverage'+PAGE); };
    d.appendChild(toggle);
    */
    //d.appendChild(document.createElement("br"));
    //document.body.insertBefore(d, document.body.firstChild);
    
    
    toggle = document.createElement("button");
    toggle.textContent = 'Resize';
    toggle.id='resizeBtn';
    toggle.style.display='none';
    toggle.onclick=function(){
        frame.contentWindow.postMessage('sizing?', '*'); };
    d.appendChild(toggle);
    
    toggle = document.createElement("button");
    toggle.textContent = 'Switch Game';
    toggle.style.display='none';
    toggle.id='switchBtn';
    toggle.onclick=function(){
        document.getElementById('frame').src=RTSS_PAGE; };
    d.appendChild(toggle);
    
    d.appendChild(document.createElement("br"));
    //var sp=document.createElement('span');
    //var inp=document.createElement('input');
    //var t=document.createTextNode('Width:');
    //inp.type='text';
    //inp.size=3;
    //inp.setAttribute('id','average');
    //sp.setAttribute('class','curves visitor');
    //inp.value='400';
    //inp.onchange=function(){ 
    //    document.getElementById("frame").width=document.getElementById('graph').width;
    //    document.getElementById("div").width=this.value;};
    //sp.appendChild(t);
    //sp.appendChild(inp);
    //d.appendChild(sp);
      
    document.body.insertBefore(d, document.body.firstChild);
    handleSizingResponse = function(e) {
      //if(e.origin == 'http://remote-domain.com') {
      var action = e.data.split(':')[0];
      if(action == 'sizing') {
        var f = document.getElementById("frame");
        f.height=e.data.split(':')[1].split(",")[0];
        f.width=e.data.split(':')[1].split(",")[1];
      } else {
        console.log("Unknown message: "+e.data);
      }
      //}
    };     
    window.addEventListener('message', handleSizingResponse, false);
      
    var frame = document.createElement("iframe");
    frame.id='frame';
    frame.height = "500";
    frame.width = "400";
    frame.style.right = "10px";
    frame.setAttribute('style',"background-color:white;float:right");
    frame.style.display = 'none';
    frame.src = RTSS_PAGE;
    d.appendChild(frame);
  }
}

function loadxml(){
  //var req=new XMLHttpRequest();
  //req.open("GET","PL020467.HTM",false);
  //req.send();
  //var txt=req.responseText;
  
  //var txt=document.firstChild.getElementsByTagName("body")[0].outerHTML;
  var txt=document.body.outerHTML;
  
  txt=txt.replace(/<img(.*?)>/ig,"");
  txt=txt.replace(/<head([\s\S]*?)<\/head>/ig,"");
  txt=txt.replace(/<html(.*?)>/ig,"<xmlnode>");
  txt=txt.replace("</html>","</xmlnode>");
  txt=txt.replace(/<xmlfile(.*?)>/ig,"");
  txt=txt.replace("</xmlfile>","");
  txt=txt.replace(/<body(.*?)>/ig,"");
  txt=txt.replace("</body>","");
  txt=txt.replace(/<br>/g,"<br/>");
  txt=txt.replace(/&nbsp;/g,"");
  txt=txt.replace(/<style([\s\S]*?)<\/style>/ig,"");
  txt=txt.replace(/<font([\s\S]*?)<\/font>/ig,"");
  txt=txt.replace(/<script([\s\S]*?)<\/script>/ig,"");
  
  //doc=document.createDocumentFragment();
  var gamexml=document.createElement("div");
  gamexml.id="xml";
  gamexml.innerHTML=txt;
  gamexml.hidden=true;
  document.firstChild.insertBefore(gamexml,document.body);
  
  //var kid=txt.firstChild;
  //events=parser.parseFromString(txt,"text/xml");
  //alert(xml.firstChild.hasChildren);
  //xmlDoc=document.implementation.createDocument("","",null);
  //xmlDoc.async=false;
  //xmlDoc.load("PL020420.HTM");
}

function parseEvents(){
  var nodes=document.getElementById("xml").children;
  getTeam(visitor,document.getElementById("Visitor").firstElementChild.children[2].firstElementChild.textContent);
  getTeam(home,document.getElementById("Home").firstElementChild.children[2].firstElementChild.textContent);
  for(var i=0; i<nodes.length; i++){
    if(nodes[i].nodeName.toLowerCase()!="table"){
      continue;
    }
    var rows=nodes[i].firstElementChild.children;
    for(var j=0; j<rows.length; j++){
      if(!(rows[j].nodeName.toLowerCase()=="tr" && rows[j].className=="evenColor")){
        continue;
      }
      var period=parseFloat(rows[j].children[1].innerHTML);
      var status=rows[j].children[2].innerHTML;
      var time=rows[j].children[3].childNodes[0].nodeValue;
      time=time.replace(/\"/g,"");
      var min=parseFloat(time.replace(/:.*[0-9]/g,""));
      var sec=parseFloat(time.replace(/.*[0-9]:/g,""));
      time=((period-1)*20 + min + sec/60);
      var event=rows[j].children[4].innerHTML;
      var description=rows[j].children[5].innerHTML;
      
      if(description.substring(0,3)==visitor.nickname){
        description=visitor.nickname;
      } else if(description.substring(0,3)==home.nickname) {
        description=home.nickname;
      }
      var arr=new Array(time,event,description,status);
      gameEvents.push(arr);
    }
    
  }
}

function insertElements(){
  addStyle();
  var container = document.createElement('div');
  container.setAttribute('id','fancystats');
  document.firstChild.insertBefore(container,document.body);
  
  var cbtable = document.createElement('table');
  cbtable.id='cbtable';
  var cbb = document.createElement('tbody');
  cbtable.appendChild(cbb);
  cbtable.align='center';
  container.appendChild(cbtable);
  
  
  var tr = cbb.appendChild(document.createElement('tr'));
  var td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(visitor.corsi, visitor.nickname+' Corsi'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(home.corsi, home.nickname+' Corsi'));

  tr = cbb.appendChild(document.createElement('tr'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(visitor.fenwick, visitor.nickname+' Fenwick'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(home.fenwick, home.nickname+' Fenwick'));
  
  tr = cbb.appendChild(document.createElement('tr'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(visitor.shots, visitor.nickname+' Shots'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(home.shots, home.nickname+' Shots'));
  
  tr = cbb.appendChild(document.createElement('tr'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(visitor.dCorsi, visitor.nickname+' dCorsi',visitor.nickname+' Corsi Rate'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(home.dCorsi, home.nickname+' dCorsi',home.nickname+' Corsi Rate'));
  
  tr = cbb.appendChild(document.createElement('tr'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(visitor.dFenwick, visitor.nickname+' dFenwick',visitor.nickname+' Fenwick Rate'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(home.dFenwick, home.nickname+' dFenwick',home.nickname+' Fenwick Rate'));
  
  tr = cbb.appendChild(document.createElement('tr'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(visitor.dShots, visitor.nickname+' dShots',visitor.nickname+' Shot Rate'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(home.dShots, home.nickname+' dShots',home.nickname+' Shot Rate'));
  
  tr = cbb.appendChild(document.createElement('tr'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(visitor.goals, visitor.nickname+' Goals'));
  td = tr.appendChild(document.createElement('td'));
  td.appendChild(createCB(home.goals, home.nickname+' Goals'));
  
  tr = cbb.appendChild(document.createElement('tr'));
  td = tr.appendChild(document.createElement('td'));
  var sel=document.createElement('select');
  sel.setAttribute('id','visitorColor');
  //sel.setAttribute('class','curves visitor');
  var opt=document.createElement('option');
  opt.setAttribute('value',visitor.fenwick.color);
  opt.innerHTML='Color:';
  sel.appendChild(opt);
  opt=document.createElement('option');
  opt.setAttribute('value','#000000');
  opt.innerHTML='black';
  sel.appendChild(opt);
  opt=document.createElement('option');
  opt.setAttribute('value','#FF0000');
  opt.innerHTML='red';
  sel.appendChild(opt);
  opt=document.createElement('option');
  opt.setAttribute('value','#0000FF');
  opt.innerHTML='blue';
  sel.appendChild(opt);
  sel.onchange=function(){return changeColors();};
  //document.firstChild.insertBefore(sel,document.body);
  td.appendChild(sel);
  
  td = tr.appendChild(document.createElement('td'));
  sel=document.createElement('select');
  sel.setAttribute('id','homeColor');
  //sel.setAttribute('class','curves home');
  opt=document.createElement('option');
  opt.setAttribute('value',home.fenwick.color);
  opt.innerHTML='Color:';
  sel.appendChild(opt);
  opt=document.createElement('option');
  opt.setAttribute('value','#000000');
  opt.innerHTML='black';
  sel.appendChild(opt);
  opt=document.createElement('option');
  opt.setAttribute('value','#FF0000');
  opt.innerHTML='red';
  sel.appendChild(opt);
  opt=document.createElement('option');
  opt.setAttribute('value','#0000FF');
  opt.innerHTML='blue';
  sel.appendChild(opt);
  sel.onchange=function(){return changeColors();};
  //document.firstChild.insertBefore(sel,document.body);
  td.appendChild(sel);
  
  tr = cbb.appendChild(document.createElement('tr'));
  td = tr.appendChild(document.createElement('td'));
  var sp=document.createElement('span');
  var inp=document.createElement('input');
  var t=document.createTextNode('Scale Graph:');
  inp.type='text';
  inp.size=2;
  inp.setAttribute('id','graphSize');
  sp.setAttribute('class','curves visitor');
  inp.value='1';
  inp.onchange=function(){return changeSize();};
  sp.appendChild(t);
  sp.appendChild(inp);
  //document.firstChild.insertBefore(sp,document.body);
  td.appendChild(sp);


  tr = cbb.appendChild(document.createElement('tr'));
  td = tr.appendChild(document.createElement('td'));
  sp=document.createElement('span');
  inp=document.createElement('input');
  t=document.createTextNode('Time for Rates(min):');
  inp.type='text';
  inp.size=2;
  inp.setAttribute('id','average');
  sp.setAttribute('class','curves visitor');
  inp.value='5';
  inp.onchange=function(){return changeAverage();};
  sp.appendChild(t);
  sp.appendChild(inp);
  //document.firstChild.insertBefore(sp,document.body);
  td.appendChild(sp);
  
  var d=document.createElement('div');
  var canvas=document.createElement("canvas");
  d.setAttribute('class','graph');
  canvas.id="graph";
  d.appendChild(canvas);
  //document.firstChild.insertBefore(d,document.body);
  container.appendChild(d);

}

function createCB(arr,id,t){
  t=typeof t !== 'undefined' ? t : id;
  var sp=document.createElement('span');
  var cb=document.createElement('input');
  var tx=document.createTextNode(t);
  var cls=id.split(" ")[0].toLowerCase();
  
  sp.setAttribute('class',"curves "+cls);
  cb.type='checkbox';
  cb.setAttribute('id',id.replace(" ","-"));
  cb.onclick=function(){
               return updateGraph();
             };
  sp.appendChild(cb);
  sp.appendChild(tx);
  //document.firstChild.insertBefore(sp,document.body);
  cbHash.push([id.replace(" ","-"),arr]);
  return sp;
}

function addStyle(){
  var css = document.createElement("style");
  var hd=document.firstChild.getElementsByTagName("head")[0];
  css.type = "text/css";
  css.innerHTML = ".curves{position:relative;} "+
                  ".home{float:left;} "+
                  ".visitor{display:block;left:50px;} "+
                  ".graph{text-align:center;}";
  hd.appendChild(css);
}

function createCurves(){
  for(var i=0; i<gameEvents.length; i++){
    var time=gameEvents[i][0];
    var event=gameEvents[i][1];
    var team=gameEvents[i][2];
    
    //Fenwick and Corsi lines
    if(event=='SHOT' || event=='MISS' || event=='BLOCK' || event=='GOAL'){
      if(event!='BLOCK'){
        (team==home.nickname) ? home.fenwick.push([time,home.fenwick.length+1]) :
                                visitor.fenwick.push([time,visitor.fenwick.length+1]);
        if(event!='MISS'){
          (team==home.nickname) ? home.shots.push([time,home.shots.length+1]) :
                                  visitor.shots.push([time,visitor.shots.length+1]);
        }
      }

      (team==home.nickname) ? home.corsi.push([time,home.corsi.length+1]) :
                              visitor.corsi.push([time,visitor.corsi.length+1]);
      //Vertical line for goals
      if(event=='GOAL'){
        (team==home.nickname) ? home.goals.push([time,home.goals.length+1]) :
                                visitor.goals.push([time,visitor.goals.length+1]);
      }
      checkCurveTimes(home.fenwick);
      checkCurveTimes(home.corsi);
      checkCurveTimes(home.shots);
      checkCurveTimes(visitor.fenwick);
      checkCurveTimes(visitor.corsi);
      checkCurveTimes(visitor.shots);
    }
    //Vertical line for penalties
    if(event=='PENL'){
      (team==home.nickname) ? home.penalties.push([time,home.penalties.length+1]) :
                              visitor.penalties.push([time,visitor.penalties.length+1]);
    }
  }
  //Make sure that the lines continue until the end of game time
  var endTime=gameEvents[gameEvents.length-1][0];
  home.fenwick.push([endTime,home.fenwick.length+1]);
  home.corsi.push([endTime,home.corsi.length+1]);
  home.shots.push([endTime,home.shots.length+1]);
  visitor.fenwick.push([endTime,visitor.fenwick.length+1]);
  visitor.corsi.push([endTime,visitor.corsi.length+1]);
  visitor.shots.push([endTime,visitor.shots.length+1]);
  
  //Adjust the fenwick/corsi curves. Sometimes mulitple events
  //occur at the same second. When the derivative is taken, it
  //throws an error bc division by t(n)-t(n-1)=0 is INF
  
  //Calculate rolling average Fenwick and Corsi lines
  avgCurve(home.fenwick,home.dFenwick);
  avgCurve(home.corsi,home.dCorsi);
  avgCurve(home.shots,home.dShots);
  avgCurve(visitor.fenwick,visitor.dFenwick);
  avgCurve(visitor.corsi,visitor.dCorsi);
  avgCurve(visitor.shots,visitor.dShots);
}

function checkCurveTimes(arr){
  if(arr.length<2){
    return;
  }
  if(arr[arr.length-1][0]==arr[arr.length-2][0]){
    var n=arr.pop();
    arr[arr.length-1][1]=n[1];
  }
}

function avgCurve(c,dc){
  //clear the old dCurve values
  while(dc[0] != undefined){
    dc.pop();
  }
  dc.color=c.color;
  dc.y2axis=true;
  var arr=new Curve();
  var dt=1/60;
  var numpts=c[c.length-1][0]/dt;
  var avg=average/dt;
  
  var cTime=0;
  arr.push([0,0]);
  for(var i=0;i<numpts;i++){
    var time=dt*i
    if(time>=c[cTime][0]){
      cTime++;
    }
    if(cTime==0){
      arr.push([time,0]);
      //arr.push([time,(time)*c[0][1]/c[cTime][0]]);
    }else{
      arr.push([time, c[cTime-1][1]]);
      //arr.push([time, c[cTime-1][1]+(time-c[cTime-1][0])*(c[cTime][1]-c[cTime-1][1])/(c[cTime][0]-c[cTime-1][0])]);
    }
  }
  for(var i=avg;i<numpts;i++){
    dc.push([ (arr[i][0]+arr[i-avg][0])/2, (arr[i][1]-arr[i-avg][1])/(arr[i][0]-arr[i-avg][0]) ]);
  }
}

function updateGraph(){
  var i,curveMax=0,curveY2Max=0;
  var curves=new Array();
  var cookieVal='';
  
  eraseCookie('myCookie'+PAGE);
  //Update the array containing all the curves to be plotted
  for(i=0;i<cbHash.length;i++){
    var cb=document.getElementById(cbHash[i][0]);
    var arr=cbHash[i][1];
    if(cb.checked){
      curves.push(arr);
      cookieVal=cookieVal+cb.id+'/';
    }
  }
  createCookie('myCookie'+PAGE,cookieVal);
  
  //Find the max value of the plotted curves
  for(i=0;i<curves.length;i++){
      if(curves[i].vertline){
        continue;
      }
      if(curves[i].y2axis){
        for(var j=0;j<curves[i].length;j++){
          curveY2Max=Math.max(curveY2Max,curves[i][j][1]);
        }
      }else{
        curveMax=Math.max(curveMax,curves[i][curves[i].length-1][1]);
      }
  }
  
  drawGrid(curveMax,curveY2Max);
  for(i=0;i<curves.length;i++){
    if(curves[i].vertline){
      plotVertLine(curves[i]);
    }else{
      plotCurve(curves[i]);
    }
  }
}

function drawGrid(fmax,f2max){
  var graph=document.getElementById("graph");
  var ctx=graph.getContext("2d");
  var tmax=gameEvents[gameEvents.length-1][0],dtic=10*scaleFactor,dt=20,df=10,df2=0.5;
  var y0=yInit,
      x0=xInit,
      ymax=yMaxInit*scaleFactor,
      xmax=xMaxInit*scaleFactor;
  var showY2=(f2max>0);
  var flipY2=false;
  if(fmax==0 && f2max>0){
    flipY2=true;
    showY2=false;
    fmax=f2max;
    df=df2;
  }
  var ny=Math.max(Math.floor(fmax/df),Math.floor(f2max/df2))+1;
  var dx=xmax/(Math.ceil(tmax/dt));
  var dy=ymax/(ny);
  xscale=dx/dt;
  yscale=dy/df;
  y2scale=dy/df2;
  graph.width=xmax+2*x0;
  graph.height=ymax+2*y0;
  ctx.rect(x0,y0,xmax,ymax);
  
  //Draw labels
  ctx.font=""+fontSize+"px Ariel";
  for(var i=0;i<ny;i++){//Draw y-axis labels
    var t=df*(i+1);
    var wid=x0-dtic-ctx.measureText(df*(i+1)).width;
    var heig=ymax+y0-dy*(i+1)+fontSize/2;
    //ctx.fillText(t,wid,heig);
    ctx.fillText(df*(i+1), x0-dtic-ctx.measureText(df*(i+1)).width,ymax+y0-dy*(i+1)+fontSize/2);
    if(showY2){
      ctx.fillText(df2*(i+1),x0+xmax+5,ymax+y0-dy*(i+1)+fontSize/2);
    }
  }
  for(var i=0;i<Math.ceil(tmax/dt);i++){//Draw x-axis labels
    ctx.fillText(dt*(i+1),x0+dx*(i+1)-ctx.measureText(dt*(i+1)).width/2,ymax+y0+dtic+fontSize);
  }
  ctx.font=""+fontSize*1.5+"px Ariel";
  ctx.fillText("Time (min)",x0+xmax/2-ctx.measureText("Time (min)").width/2,y0+ymax+dtic+fontSize+fontSize*1.5);
  ctx.stroke();
  var vscore = document.getElementById("Visitor").firstElementChild.children[1].firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[1].textContent;
  var hscore = document.getElementById("Home").firstElementChild.children[1].firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[1].textContent;
  var scoreText = visitor.nickname+" "+vscore+" | "+home.nickname+" "+hscore;
  ctx.fillText(scoreText,x0+xmax/2-ctx.measureText(scoreText).width/2,y0-dtic);
  ctx.stroke();
  
  var txt=(flipY2)?"Rate of Events (#/min)":"Events (#)"
  ctx.rotate(-90*Math.PI/180);
  ctx.fillText(txt,-(y0+ymax/2+ctx.measureText(txt).width/2),x0-dtic-fontSize-dtic/scaleFactor);
  ctx.stroke;
  
  if(showY2){
    ctx.rotate(Math.PI);
    ctx.fillText("Rate of Events (#/min)",y0+ymax/2-ctx.measureText("Rate of Events (#/min)").width/2,-(x0+xmax+dtic+ctx.measureText('10').width/1.5+dtic/scaleFactor));
    ctx.stroke;
  }
  
  //Flip the orientation of the canvas so that we can plot
  //the stuff with the correct origin and stuff.
  ctx.setTransform(1,0,0,-1,0,0);
  ctx.translate(0,-graph.height);
  
  ctx.moveTo(x0-dtic,y0+ymax);//Draw y-axis tick marks
  ctx.lineTo(x0+xmax,y0+ymax);
  for(var i=0;i<ny;i++){
    ctx.moveTo(x0-dtic,y0+i*dy);
    ctx.lineTo(x0+xmax,y0+i*dy);
    for(var j=0;j<4;j++){
      ctx.moveTo(x0-dtic/2,y0+i*dy+dy/4*j);
      ctx.lineTo(x0,y0+i*dy+dy/4*j);
    }
  }
  ctx.moveTo(x0+xmax,y0-dtic);//Draw x-axis tick marks
  ctx.lineTo(x0+xmax,y0+ymax);
  for(var i=0;i<Math.ceil(tmax/dt);i++){
    ctx.moveTo(x0+i*dx,y0-dtic);
    ctx.lineTo(x0+i*dx,y0+ymax);
    for(var j=0;j<4;j++){
      ctx.moveTo(x0+i*dx+dx/4*j,y0-dtic/2);
      ctx.lineTo(x0+i*dx+dx/4*j,y0);
    }
  }
  ctx.stroke();
}

function plotCurve(arr){
  var graph=document.getElementById("graph");
  var ctx=graph.getContext("2d");
  var y0=yInit,x0=xInit,ymax=yMaxInit*scaleFactor,xmax=xMaxInit*scaleFactor,yPrev;
  
  ctx.beginPath();
  ctx.setTransform(1,0,0,-1,0,0);
  ctx.translate(0,-graph.height);
  ctx.strokeStyle=arr.color;
  ctx.moveTo(x0,y0);
  yPrev=y0;
  for(var i=0; i<arr.length; i++){
    if(arr.y2axis){
      ctx.lineTo(x0+arr[i][0]*xscale,yPrev);
      ctx.lineTo(x0+arr[i][0]*xscale,y0+arr[i][1]*y2scale);
      yPrev=y0+arr[i][1]*y2scale;
    }else{
      ctx.lineTo(x0+arr[i][0]*xscale,yPrev);
      ctx.lineTo(x0+arr[i][0]*xscale,y0+arr[i][1]*yscale);
      yPrev=y0+arr[i][1]*yscale;
    }
  }
  ctx.stroke();
  //ctx.strokeStyle="#000000";
}

function plotVertLine(arr){
  var graph=document.getElementById("graph");
  var ctx=graph.getContext("2d");
  var y0=yInit,x0=xInit,ymax=yMaxInit*scaleFactor,xmax=xMaxInit*scaleFactor;
  
  ctx.beginPath();
  ctx.setTransform(1,0,0,-1,0,0);
  ctx.translate(0,-graph.height);
  ctx.strokeStyle=arr.color;
  for(var i=0; i<arr.length; i++){
    var dashes=50;
    var dl=ymax/(2*dashes-1);
    for(var j=0;j<2*dashes;j++){
      if(j%2==0){
        ctx.moveTo(x0+arr[i][0]*xscale,y0+dl*j);
      }else{
        ctx.lineTo(x0+arr[i][0]*xscale,y0+dl*j);
      }
    }
  }
  ctx.stroke();
  ctx.strokeStyle="#000000";
}

function updateFromCookie(){
  var cookie=readCookie('myCookie'+PAGE);
  if(cookie!=null){
    eraseCookie('myCookie'+PAGE);
    var arr=cookie.split("/");
    for(var i=0;i<arr.length;i++){
      if(arr[i]=='') continue;
      var cb=document.getElementById(arr[i]);
      if(cb != null) cb.setAttribute('checked','true');
    }
  }
  
  cookie=readCookie('myColors'+PAGE);
  if(cookie!=null){
    arr=cookie.split("/");
    if(arr.length==2){
      document.getElementById('homeColor').value=arr[0];
      document.getElementById('visitorColor').value=arr[1];
    }
    changeColors();
  }
  
  cookie=readCookie('mySize');
  if(cookie!=null){
    document.getElementById('graphSize').value=cookie;
    scaleFactor=cookie;
  }
  
  cookie=readCookie('myAverage'+PAGE);
  if(cookie!=null){
    document.getElementById('average').value=cookie;
    average=cookie;
    avgCurve(home.fenwick,home.dFenwick);
    avgCurve(home.corsi,home.dCorsi);
    avgCurve(home.shots,home.dShots);
    avgCurve(visitor.fenwick,visitor.dFenwick);
    avgCurve(visitor.corsi,visitor.dCorsi);
    avgCurve(visitor.shots,visitor.dShots);
  }
  updateGraph();
}

function getTeam(team,t){
  var fullname=new Array("ANAHEIM DUCKS",
    "BOSTON BRUINS",
    "BUFFALO SABRES",
    "CALGARY FLAMES",
    "CAROLINA HURRICANES",
    "CHICAGO BLACKHAWKS",
    "COLORADO AVALANCHE",
    "COLUMBUS BLUE JACKETS",
    "DALLAS STARS",
    "DETROIT RED WINGS",
    "EDMONTON OILERS",
    "FLORIDA PANTHERS",
    "LOS ANGELES KINGS",
    "MINNESOTA WILD",
    "MONTREAL CANADIENS",
    "NASHVILLE PREDATORS",
    "NEW JERSEY DEVILS",
    "NEW YORK ISLANDERS",
    "NEW YORK RANGERS",
    "OTTAWA SENATORS",
    "PHILADELPHIA FLYERS",
    "PHOENIX COYOTES",
    "PITTSBURGH PENGUINS",
    "ST. LOUIS BLUES",
    "SAN JOSE SHARKS",
    "TAMPA BAY LIGHTNING",
    "TORONTO MAPLE LEAFS",
    "VANCOUVER CANUCKS",
    "WASHINGTON CAPITALS",
    "WINNIPEG JETS");
  var nickname=new Array("ANA",
     "BOS",
    "BUF",
    "CGY",
    "CAR",
    "CHI",
    "COL",
    "CBJ",
    "DAL",
    "DET",
    "EDM",
    "FLA",
    "L.A",
    "MIN",
    "MTL",
    "NSH",
    "N.J",
    "NYI",
    "NYR",
    "OTT",
    "PHI",
    "PHX",
    "PIT",
    "STL",
    "S.J",
    "T.B",
    "TOR",
    "VAN",
    "WSH",
    "WPG");
  var colors=new Array("#FF6600",//"ANAHEIM DUCKS",
    "#FEC322",//"BOSTON BRUINS",
    "#FFCC00",//"BUFFALO SABRES",
    "#FF3300",//"CALGARY FLAMES",
    "#CC0000",//"CAROLINA HURRICANES",
    "#FF3300",//"CHICAGO BLACKHAWKS",
    "#3366FF",//"COLORADO AVALANCHE",
    "#000066",//"COLUMBUS BLUE JACKETS",
    "#000000",//"DALLAS STARS",
    "#FF0000",//"DETROIT RED WINGS",
    "#FF6600",//"EDMONTON OILERS",
    "#A31919",//"FLORIDA PANTHERS",
    "#000000",//"LOS ANGELES KINGS",
    "#197519",//"MINNESOTA WILD",
    "#FF0000",//"MONTREAL CANADIENS",
    "#CC9900",//"NASHVILLE PREDATORS",
    "#CC0000",//"NEW JERSEY DEVILS",
    "#0000FF",//"NEW YORK ISLANDERS",
    "#0000CC",//"NEW YORK RANGERS",
    "#CC0000",//"OTTAWA SENATORS",
    "#FF6600",//"PHILADELPHIA FLYERS",
    "#800000",//"PHOENIX COYOTES",
    "#996600",//"PITTSBURGH PENGUINS",
    "#0066FF",//"SAINT LOUIS BLUES",
    "#006666",//"SAN JOSE SHARKS",
    "#0000FF",//"TAMPA BAY LIGHTNING",
    "#0000FF",//"TORONTO MAPLE LEAFS",
    "#0000CC",//"VANCOUVER CANUCKS",
    "#FF0000",//"WASHINGTON CAPITALS",
    "#000033");//"WINNIPEG JETS"
  for(var i=0;i<30;i++){
    //alert(team.indexOf(fullname[i]));
    if(t.indexOf(fullname[i])>=0){
      team.nickname=nickname[i];
      team.fullname=fullname[i];
      team.fenwick.color=colors[i];
      team.fenwick.name="fenwick"+nickname[i];
      team.corsi.color=colors[i];
      team.corsi.name="corsi"+nickname[i];
      team.shots.color=colors[i];
      team.shots.name="shots"+nickname[i];
      team.goals.name="goals"+nickname[i];
      team.penalties.name="penalties"+nickname[i];
      team.goals.color=colors[i];
      return;
    }
  }
  alert('team: '+t+'not found');
  return;
}

function changeColors(){
  var homeColor=document.getElementById('homeColor').value;
  var visitorColor=document.getElementById('visitorColor').value;
  home.fenwick.color=homeColor;
  home.corsi.color=homeColor;
  home.shots.color=homeColor;
  home.dFenwick.color=homeColor;
  home.dCorsi.color=homeColor;
  home.dShots.color=homeColor;
  home.goals.color=homeColor;
  visitor.fenwick.color=visitorColor;
  visitor.corsi.color=visitorColor;
  visitor.shots.color=visitorColor;
  visitor.dFenwick.color=visitorColor;
  visitor.dCorsi.color=visitorColor;
  visitor.dShots.color=visitorColor;
  visitor.goals.color=visitorColor;
  eraseCookie('myColors'+PAGE);
  createCookie('myColors'+PAGE,homeColor+"/"+visitorColor);
  updateGraph();
}

function changeSize(){
  var s=document.getElementById('graphSize').value;
  if(isNaN(s)){
    return;
  }
  createCookie('mySize',''+s);
  scaleFactor=s;
  updateGraph();
    
  window.postMessage('sizing:'+document.body.scrollHeight+','+document.body.scrollWidth, "*");
    //alert('Frames:'+window.top.frames);
}

function changeAverage(){
  var avg=document.getElementById('average').value;
  if(isNaN(avg)){
    return;
  }
  average=avg;
  createCookie('myAverage'+PAGE,''+avg);
  avgCurve(home.fenwick,home.dFenwick);
  avgCurve(home.corsi,home.dCorsi);
  avgCurve(home.shots,home.dShots);
  avgCurve(visitor.fenwick,visitor.dFenwick);
  avgCurve(visitor.corsi,visitor.dCorsi);
  avgCurve(visitor.shots,visitor.dShots);
  updateGraph();
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}