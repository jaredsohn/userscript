// ==UserScript==
// @name           Ikariam Aquarium
// @namespace      overkill_gm
// @description    Graphical City Selector
// @include        http://s*.ikariam.*/index.php*
// @version        0.1.0
// ==/UserScript==


function debug() { var msg = []; for (var i = 0, n = arguments.length; i<n; ++i) msg.push(arguments[i]); setTimeout(function() { throw new Error("[debug] " + msg.join(' ')); }, 0);}

$ = document.getElementById;
function $x( xpath, root ) { var doc = root ? root.evaluate ? root : root.ownerDocument : document, next; var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = []; switch (got.resultType) { case got.STRING_TYPE: return got.stringValue; case got.NUMBER_TYPE: return got.numberValue; case got.BOOLEAN_TYPE: return got.booleanValue; default: while (next = got.iterateNext()) result.push( next ); return result; } } 
function $X( xpath, root ) { var got = $x( xpath, root ); return got instanceof Array ? got[0] : got; } 
function node(type, className, styles, content) { var n = document.createElement(type||"div"); if (className) n.className = className; if (styles) for (var prop in styles) n.style[prop] = styles[prop]; if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString(); return n; } 
function onClick(node, fn, capture, e) { node.addEventListener((e||"") + "click", fn, !!capture); }
function limit(n,lower,upper) { return Math.max(Math.min(n,upper),lower); }
function serialize(name,val){
  if(document.domain)
      GM_setValue(name+'_'+document.domain , uneval(val));
}
function deserialize(name, def) {
  if(document.domain)
      return eval(GM_getValue(name+'_'+document.domain , (def || '({})') ));
}

function generateSelfCache(){
  var cache = {};
  // todo add ability to exclude a city
  for each (var town in $x('//*[@id="citySelect"]/option')){
  //for each (var town in $x('./option',$('citySelect'))){
    if (town.innerHTML.charAt(0) == '[') {  //todo: move this if statement outside the loop
      // COORDS in town navigation
      cache[town.value] = {
        'name'     : town.innerHTML.replace('&nbsp;',' ').replace(/\[[0-9:\s]+\]\s+/,''),
        'position' : town.innerHTML.match(/\[([0-9:\s]+)\]/,'')[1].replace(/00/g,'100'),
        'tradegood': town.title.substring(12)
      };
    } else {
      // TRADE GOOD in town navigation
      var coords = town.title;
      coords     = coords.substr(1,coords.length-2);
      cache[town.value] = {
        'name':town.innerHTML,
        'position':coords,
        'tradegood':unsafeWindow.LocalizationStrings['resources'][town.className.charAt(town.className.indexOf('tradegood')+9)]
      };
    }
    if (town.className.indexOf('deployed') == -1) {
      cache[town.value].me = true;
    }
  }
  return cache;
}

var LINE_HEIGHT = 10;

function Cities(cityObj,ctx){
  this.id   = cityObj.id;
  this.name = cityObj.name;
  this.me   = !!cityObj.me;
  this.current = !!cityObj.current;
  this.x    = parseInt(cityObj.position.split(':')[0],10);
  this.y    = parseInt(cityObj.position.split(':')[1],10);
  this.width = 60;
  this.anchor = { x : this.x, y : this.y };
  this.size = cityObj.name.split(',').length;
  this.height = LINE_HEIGHT * cityObj.name.split(',').length;
  this.tradeGood = cityObj.tradeGood;
  this.context = ctx;
  this.toString = function(){ return this.name; }
  this.transform = function(scale,left,top){
    this.x = limit(scale*this.x+left,0,Map.width);
    this.y = limit(scale*this.y+top,0,Map.height) - this.size*LINE_HEIGHT/2;
    this.anchor = { x : this.x, y : this.y };
  }
  this.draw = function(jedi){
    //debug('draw',this.name,scale*(this.x+left),scale*(this.y+top));
    var names = this.name.split(',');
    //debug(Map.force(this.x,this.y));
    if (jedi) { // jedi = use force
      var newX = this.x, newY = this.y;
      var force = Map.force(newX,newY,this.width,this.height,this.anchor.x,this.anchor.y);
      //if (this.id == 80210) debug(force);
      //todo, turn force into velocity instead of directly into position
      var maxDeflection = 4-Map.updates/20; // decay period
      newX += limit(force[0],-1*maxDeflection,maxDeflection);
      newY += limit(force[1],-1*maxDeflection,maxDeflection);
      this.x = limit(newX,0,Map.width -this.width);
      this.y = limit(newY,0,Map.height-this.height);
    }
    // DRAW LOCATOR CIRCLE
    if (this.current) {
      this.context.beginPath();
      this.context.arc(this.anchor.x,this.anchor.y,15,0,Math.PI*2,false);
      this.context.strokeStyle = 'yellow';
      this.context.stroke();
    }
    // DRAW ANCHOR LINE
    this.context.beginPath();
    this.context.arc(this.anchor.x,this.anchor.y,2.5,0,Math.PI*2,false);
    this.context.strokeStyle = this.context.fillStyle = this.current ? 'yellow' : this.me ? "rgb(254 , 245 , 228)" : "rgb(192 , 244 , 169)";
    this.context.fill();
    //this.lineWidth = "10px";
    //this.context.strokeStyle = "rgb(255 , 255 , 255)";
    this.context.stroke();

    this.context.strokeStyle = 'rgba(235,20,20,0.3)';
    this.lineWidth = "2px";
    this.context.beginPath();
    var pin_x = (this.x+(this.width>>1)) < this.anchor.x ? this.x + this.width : this.x;
    var pin_y = (this.y+(this.height>>1)) < this.anchor.y ? this.y + this.height : this.y;
    this.context.moveTo(pin_x,pin_y);
    this.context.lineTo(this.anchor.x,this.anchor.y);
    this.context.closePath();
    this.context.stroke();

    // DRAW BOX, BORDER, TEXT
    this.context.strokeStyle = this.current ? 'yellow' : 'rgba(0,0,0, 0.8)';
    this.context.font = "9px sans-serif";
    this.context.textBaseline = "top"
    //this.lineWidth = "1px";

    this.context.fillStyle = (this.me) ? "rgba(254 , 245 , 228,0.8)" : "rgba(192 , 244 , 169 , 0.8)";
    this.context.fillRect(this.x,this.y,this.width,this.size*LINE_HEIGHT);
    this.context.strokeRect(this.x,this.y,this.width,this.size*LINE_HEIGHT);
    this.context.fillStyle = "black";
    var textWidth = 0;
    for (var i = 0; i < names.length; ++i){
      this.context.fillText(names[i],this.x + 1,this.y+LINE_HEIGHT*i + 1,this.width-2);
      textWidth = Math.max(textWidth,this.context.measureText(names[i]).width);
    }
    this.width = textWidth + 4;
  }
}
var Map = function() {
  var cities = [];
  // elements
  var canvasContainer,canvas,debugDiv,canvasPos,timer;
  var ctx;
  var width = 630, height = 400;
  var mouseX = mouseY = 0;
  var updates = 0;
  function init(){
    // initialize canvas
    canvasContainer = $('mainview').
      insertBefore(node('div','',{
          width:width+'px',display:'none',position:'absolute',right:'0',top:'16px',zIndex:'600',
        },'<canvas id="citySelectMapCanvas" width="'+width+'" height="'+height+'"></canvas>'),
          $('mainview').firstChild
        );
    var showHideCtrlElem = $X('//div[@id="cityNav"]//div[@class="citySelect smallFont jsSelect"]');
    onClick(showHideCtrlElem,function(){
      if ($X('./ul',showHideCtrlElem).style.display == 'block') { hide(); }
      else { show(); }
    });
    canvas = canvasContainer.firstChild;
    debugDiv = canvasContainer.insertBefore(node('div','','','DEBUG INFO'),canvas);
      debugDiv.style.textAlign = 'right';
    ctx = canvas.getContext('2d');
    addControls();
    // initialize cities
    var selfCache = generateSelfCache();
    var currentCityId = $X('//*[@id="citySelect"]/option[@selected="selected"]').value;
    //debug(uneval(selfCache));
    var islandCache = {};
    for (var cityID in selfCache){
      if (islandCache[selfCache[cityID].position]) {
        var temp = islandCache[selfCache[cityID].position];
        temp.id += ',' + cityID;
        temp.name += ',' + selfCache[cityID].name;
      } else {
        islandCache[selfCache[cityID].position] = {
          id : cityID,
          name:selfCache[cityID].name,
          position:selfCache[cityID].position,
          tradegood:selfCache[cityID].tradegood,
          me:selfCache[cityID].me,
        };
      }
      if (cityID == currentCityId) {
        islandCache[selfCache[cityID].position].current = true;
      }
    }
    //debug(uneval(islandCache));
    for each (var island in islandCache){
      cities.push(new Cities(island,ctx));
    }
    zoom();
    var savedPositions = deserialize('positions','');
    if (savedPositions){
      for each (var city in cities) {
        var temp = savedPositions[city.id];
        if (temp) {
          city.x = temp[0];
          city.y = temp[1];
        }
      }
    }
    var grabbed = { drag:false, hOff:0, vOff:0 };
    canvas.addEventListener("mousemove",function(e){
      mouseX = (e.pageX - canvasPos.x);
      mouseY = (e.pageY - canvasPos.y);
      
      if (grabbed.drag){
        grabbed.city.x = mouseX-grabbed.hOff;
        grabbed.city.y = mouseY-grabbed.vOff;
        grabbed.city.draw();
      }
      var temp = force(mouseX,mouseY);
      debugDiv.firstChild.nodeValue = mouseX + ' ' + mouseY + ' force: ' + temp[0].toFixed(3) + ',' + temp[1].toFixed(3) + ' ' + canvasPos.x;
      //debug.innerHTML = mouseX + ' ' + mouseY + ' => ' + islandX + ' : ' + islandY + ' | dx:' + dx + '/' + xOffset + ' dy:' + dy + '/' + yOffset + ' x ' + scale;
    },false);
    canvas.addEventListener("mousedown",function(e){
      function findCity(x,y){
        for each (var city in cities) {
          if ((x > city.x) && (x < city.x + city.width) && (y > city.y) && (y < city.y + city.height)) return city;
        }
        return false;
      }
      canvasPos = getAbsolutePosition(canvas);
      mouseX = (e.pageX - canvasPos.x);
      mouseY = (e.pageY - canvasPos.y);
      var city = findCity(mouseX,mouseY);
      if (city) {
        grabbed.drag = true;
        grabbed.city = city;
        grabbed.hOff = mouseX - city.x;
        grabbed.vOff = mouseY - city.y;
        grabbed.startX = mouseX;
        grabbed.startY = mouseY;
      }
      debugDiv.firstChild.nodeValue = "down "+city;
      e.stopPropagation();
      e.preventDefault();
    },false);
    canvas.addEventListener("mouseup",function(e){
      savePositions();
      if (grabbed.drag) {
        grabbed.drag = false;
        mouseX = (e.pageX - canvasPos.x);
        mouseY = (e.pageY - canvasPos.y);
        if ((mouseX == grabbed.startX) && (mouseY == grabbed.startY)) {
          var id = grabbed.city.id;
          if (grabbed.city.size > 1) {
            var i = Math.floor((grabbed.startY - grabbed.city.y) / LINE_HEIGHT);
            id = id.split(',')[limit(i,0,grabbed.city.size - 1)];
          }
          debugDiv.firstChild.nodeValue = "change city to "+grabbed.city + ' ' + id;
          changeCity(id);
        }
      }
      e.stopPropagation();
      e.preventDefault();
    },false);
    
  }
  function addControls(){
    function checkDeployed(){
      function showDeployed(){
        var last, collection = $x('//div[@id="cityNav"]//div[@class="citySelect smallFont jsSelect"]/ul/li');
        for each (var li in collection){
          li.style.display = 'block';
          if (!last && (li.className.indexOf(' last') != -1)) { last = li; }
        }
        if (last && (li != last)) last.className = last.className.replace(/ last/,'');
      }
      function hideDeployed(){
        var last, collection = $x('//div[@id="cityNav"]//div[@class="citySelect smallFont jsSelect"]/ul/li');
        for each (var li in collection){
          if (li.className.indexOf('deployedCities') != -1) li.style.display = 'none';
          if (li.style.display != 'none') last = li;
        }
        if (last && (last.className.indexOf(' last') == -1)) { last.className += ' last'; }
      }
      if (options.deployedCities) showDeployed();
      else hideDeployed();
    }
    var options = deserialize('options',{deployedCities:true});
    GM_addStyle(".aquariumCtrl { float:right; cursor:pointer; margin: 0 3px; background:#ffe; -moz-border-radius:3px; }");

    var close = node('div','aquariumCtrl','','close');
    close.title = "Close Map";
    onClick(close,hide);
    debugDiv.appendChild(close);

    var deployedCities = node('div','aquariumCtrl','',options.deployedCities ? 'shown' : 'hidden');
    deployedCities.title = "Show/Hide deployed cities in the city selection dropdown box?";
    onClick(deployedCities,function(){
      options.deployedCities = !options.deployedCities;
      checkDeployed();
      this.innerHTML = options.deployedCities ? 'shown' : 'hidden';
      serialize('options',options);
    });
    debugDiv.appendChild(deployedCities);
    checkDeployed();
  }
  function show(){
    canvasContainer.style.display = 'block';
    canvasPos = getAbsolutePosition(canvas);
    timer = setInterval(update,100);
  }
  function hide(){
    canvasContainer.style.display = 'none';
    clearInterval(timer);
    savePositions();
  }
  function getAbsolutePosition(element) {
    var r = { x: element.offsetLeft, y: element.offsetTop };
    if (element.offsetParent) {
      var tmp = getAbsolutePosition(element.offsetParent);
      r.x += tmp.x;
      r.y += tmp.y;
    }
    return r;
  };

  function zoom(){
    var minX = width, minY = height, maxX = maxY = 0;
    for each (var city in cities){
      minX = Math.min(minX,city.x);
      maxX = Math.max(maxX,city.x);
      minY = Math.min(minY,city.y);
      maxY = Math.max(maxY,city.y);
    }
    var scale = 1, left = 0, top = 0;
    scale = Math.min(width/(maxX - minX),height/(maxY - minY)) * 0.9;
    left = (width  - (maxX*scale) - (minX*scale))/2;
    top  = (height - (maxY*scale) - (minY*scale))/2;

    for each (var city in cities) city.transform(scale,left,top);
  }
  function update(){
    function drawBG(){
      //ctx.clearRect(0,0,width,height);
      ctx.fillStyle = "rgba(28,123,193,0.5)";
      //ctx.fillStyle = "rgb(28,123,193)";
      ctx.fillRect(0,0,width,height);
    }
    if (Map.updates < 75) Map.updates++;
    drawBG();
    for each (var city in cities) {
      city.draw(true);
    }
  }
  function force(x,y,w,h,ax,ay){  //todo input origin's width and height
    var Kspace   = 3e2; // repulsion coeff
    var Kattract = 20;  // attraction coeff
    w = w || 0;
    h = h || 0;
    if (mouseX && mouseY) {
      var d = Math.abs(x - mouseX) + Math.abs(y - mouseY);  // rectangular distance metric
      Kspace *= limit(200/d,1,5);
    }
    var forceX = 10/Math.pow(x,2) - 10/Math.pow(width-x,2);  // left right edge
    var forceY = 10/Math.pow(y,2) - 10/Math.pow(height-y,2);  // top bottom edge
    //var out = []; // for debugging
    // SIGMA repulsion between like ions
    for each (var city in cities) {
      if ((x != city.x) && (y != city.y)) {
        var a;
        if (((x + w) > city.x ) && (x < (city.x+city.width+1))) { // case direct overlap
          a = x <= city.x ? -13 : 13;  // todo update this with (x - city.x) + city.width
          //out.push(x);
        } else {
          var a_l  = x     - city.x - city.width;
          var a_r  = x + w - city.x;
          a = (Math.abs(a_l) < Math.abs(a_r)) ? a_l : a_r;
        }
        var a2 = Math.pow(a,2);
        var b;
        if ( ((y + h) > city.y) && (y < (city.y+city.height+1)) ) { // case direct overlap
          b = y < city.y ? -10 : 10;  // todo update this
          //out.push(':'+y);
        } else {
          var b_t  = y     - city.y - city.height;
          var b_b  = y + h - city.y;
          b = (Math.abs(b_t) < Math.abs(b_b)) ? b_t : b_b;
        }
        var b2 = Math.pow(b,2);
        var c2 = a2 + b2;
        if (c2 && c2 < 900) {  //  only consider close object
          var f = Kspace / c2;
          var c = Math.sqrt(c2);
          forceX += 1         * f*(a/c);  // anisotropy * force * cos()
          forceY += city.size * f*(b/c);  // anisotropy * force * sin()
        }
      }
    }
    
    // attracted to anchor point USE SPRING MODEL
    if (ax && ay){
      var a_l  = x     - ax;
      var a_r  = x + w - ax;
      a = (Math.abs(a_l) < Math.abs(a_r)) ? a_l : a_r;
      a2 = Math.pow(a,2);
      var b_t  = y     - ay;
      var b_b  = y + h - ay;
      b = (Math.abs(b_t) < Math.abs(b_b)) ? b_t : b_b;
      b2 = Math.pow(b,2);
      c2 = a2 + b2;
      if (c2 > 0) {
        c = Math.sqrt(c2);
        f = -1/Kattract*c;
        forceX += f*(a/c);  // force * cos()
        forceY += f*(b/c);  // force * sin()
      }
    }
    //if (out.length>1) debug(out);
    return [forceX,forceY];
  }
  function collision(x,y){
    for each (var city in cities) {
      if ((x == city.x) && (y == city.y)) return true;
    }
    return false;
  }
  function savePositions(){
    var output = {};
    for each (var city in cities) {
      output[city.id] = [ city.x , city.y ];
    }
    serialize('positions',output);
  }
  return {
    init : init,
    force : force,
    width : width,
    height : height,
    collision: collision,
    updates : updates,
  }
}();

changeCity = function(city_id) {
  var go = false;
	for each (var option in $x('//select[@id="citySelect"]/option')) {
    if (option.value == city_id) {
      option.selected = go = true;
    } else {
      option.selected = false;
    }
  }
  if (go) document.getElementById('changeCityForm').submit();
}
Map.init();