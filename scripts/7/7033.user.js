// ==UserScript==
// @name          Browser Pen
// @namespace     http://www.hoja.idv.tw/Project/BrowserPen
// @description   Draw in anywhere 
// @version       0.9.1
// @include       *
// ==/UserScript==

  var debug = 0;
  var canvas;
  var ctx;
  var defaultWidth = 1;
  var defaultHeight = 1;
  var defaultOffsetLeft = 0;
  var defaultOffsetTop = 0;
  var flag_ctrl = false;
  var flag_alt = false;
  var flag_shift = false;
  var flag_canvasinit = false;
  var flag_canvasopen = false;
  var flag_canvasopenby = 0; 	//1,if by mouse.rightclick
				//2, if by ctrl+alt+p
  var darwflag = false;
  var lineWidth = 2;
  var color = 0;
  var fillStyle = new Array(
			"rgba(200, 0 , 0 , 0.5)",
			"rgba(0, 200 , 0 , 0.5)",
			"rgba(0, 0 , 200 , 0.5)"
		);
  var cssStyle = new Array(
			"#d00",
			"#0d0",
			"#00d"
		);
  //setTimeout(init_paint, 1000);
  var Setup = null;

  init_paint();
  function init_paint()
  { 
  this.width; 
  this.height;
  this.offsetLeft;
  this.offsetTop;

  var scaleFactor = 1; 
  var savedMouseCoords = null; 

  

    canvas = document.createElement('canvas');
    closecanvas();

    //alert (offsetLeft + ', '+ this.offsetTop);
    //alert(canvas.width + ' ' + canvas.height); 
    //alert(canvas.offsetLeft + ' ' + canvas.offsetTop); 
    if(canvas.getContext == null)
    {
      alert("You need Firefox version 1.5 or higher for this to work, sorry."); 
      return; 
    }
    ctx = canvas.getContext('2d');

    /* Add EventListener */
    canvas.addEventListener('mousedown', my_mousedown_handler, true);
    canvas.addEventListener('mouseup', my_mouseup_handler, true);
    canvas.addEventListener('mousemove', my_mousemove_handler, true);
    //canvas.onmousemove = my_mousemove_handler;
    canvas.addEventListener('click', my_click_handler, true);
    canvas.addEventListener('dblclick', my_dblclick_handler, true);
    document.addEventListener('keydown', my_keydown_handler, true);
    document.addEventListener('keyup', my_keyup_handler, true);
    document.addEventListener('click', my_clickright_handler, true);
    //document.onmousedown =  my_clickright_handler;

    //document.addEventListener('contextmenu', my_contextmenu_handler, false);
    //document.oncontextmenu = my_contextmenu_handler;
    window.addEventListener('resize', my_resize_handler, false);
    window.resize  = my_resize_handler();

   function opencanvas() {
	if (!flag_canvasinit) {
    		document.body.appendChild(canvas);
		flag_canvasinit = true;
	}
	this.offsetLeft = defaultOffsetLeft;
	this.offsetTop = defaultOffsetTop;
	
	canvasscale();
	canvas.style.display="block";
/*
	var canvasScale = canvasscale();
	this.width = canvasScale.w;
	this.height = canvasScale.h
    	with(canvas) {
		this.offsetLeft = 0;
		this.offsetTop = 0;
    		style.left = this.offsetLeft + 'px';
    		style.top = this.offsetTop + 'px';
    		//this.width=(window.screen.availWidth > document.width) ? window.screen.availWidth : document.width;
    		//this.height=(window.innerHeight > document.height) ? window.innerHeight :document.height;
	    	width = this.width;
    		height = this.height;
		style.display="block";
    	}*/

	flag_canvasopen = true;
	if (debug == 1) {
		defaultStatus = "(w,h)= (" + this.width + ", " + this.height +")";
	}
   }
   function closecanvas() {
  	this.width = defaultWidth; 
	this.height= defaultHeight;
	this.offsetLeft = defaultOffsetLeft;
	this.offsetTop = defaultOffsetTop;
	with(canvas.style) {
    		border = '#f00 solid 1px';
    		position = 'absolute';
    		left = this.offsetLeft + 'px';
    		top =this.offsetTop + 'px';
		zIndex="999";
		display="none";
		//cursor="";
    	}
	with(canvas) {
    		//id = 'canvas';
	    	width = this.width;
    		height = this.height;
  	}
	flag_canvasopen = false;
	if (debug == 1) {
		defaultStatus = "(w,h)= (" + this.width + ", " + this.height +")";
	}
   }
   function canvasscale() {
      hSize = vSize = 0
	if (window.innerHeight) {

		var vSize = window.innerHeight;
		var hSize = window.innerWidth;
	/*
	} else if (document.documentElement.clientHeight) {
		var vSize = document.documentElement.clientHeight;
		var hSize = document.documentElement.clientWidth;
	} else if (document.body.clientHeight) {
		var vSize = document.body.clientHeight;
		var hSize = document.body.clientWidth;
	} else {
		var vSize = 700;  // assuming 1024x768, minus chrome and such
		var hSize = 1024; // these do not account for kiosk mode or Opera Show
	*/
	}
        // Does not work in Firefox 4 and above ......work in chrome
        if (document.width) {
            hSize = (hSize > document.width) ? hSize : document.width;
            vSize = (vSize > document.height) ? vSize : document.height;
         }
	//return {w:hSize-2, h:vSize-2};
	//var w = hSize-2; 
	//var h = vSize-2; 
	this.width  = hSize-2;
	this.height = vSize-2;
    	with(canvas) {
		this.offsetLeft = 0;
		this.offsetTop = 0;
    		style.left = this.offsetLeft + 'px';
    		style.top = this.offsetTop + 'px';
    		//this.width=(window.screen.availWidth > document.width) ? window.screen.availWidth : document.width;
    		//this.height=(window.innerHeight > document.height) ? window.innerHeight :document.height;
	    	width = this.width;
    		height = this.height;
    	}


   }


   function draw(x,y)
  {
    if(canvas.getContext == null)
    {
      return; 
    }
    if (debug == 1) {
	defaultStatus = "(x,y)= (" + x + ", " + y +")";
    }
      //ctx.beginPath();
      //ctx.clearRect(0, 0, width, height); 
      // ctx.arc(x, y, 3, 0, Math.PI*2, 1)
      ctx.lineTo(x,y);
      //ctx.fill();
      ctx.stroke();
    
  }
  function clean()
  {
    if(canvas.getContext == null)
    {
      return; 
    }
     
    ctx.clearRect(0, 0, this.width, height); 
  }
  
    function getMouseCoords(event)
    {
      event = event || window.event; 
      if(event == null)
      {
        return null; 
      }
      if(event.pageX || event.pageY){
        return {x:(event.pageX - this.offsetLeft) / scaleFactor, y:(event.pageY - this.offsetTop) / scaleFactor};
      }
      return null;
    }

/* ALL Event Handlers */
/* can not work in Greasemonkey  --- 
    function my_contextmenu_handler(event) {
		if (flag_canvasopen) {
			if (flag_canvasopenby == 1) {
				window.print();  //can not print out the canvas
				//closecanvas();
				return false;
			}
		} else {
			if (flag_shift && flag_canvasopenby == 0 || flag_canvasopenby == 1) {
				opencanvas();
				flag_canvasopenby = 1;
				return false;
			}
		}


    }
--- */
    function my_clickright_handler(event) {
	if (event.button == 2) {
		if (flag_canvasopen) {
			if (flag_canvasopenby == 1) {
				closecanvas();
			}
		} else {
			if (flag_shift) {
				if (flag_shift && flag_canvasopenby == 0 || flag_canvasopenby == 1) {
					flag_shift = false;
					opencanvas();
					flag_canvasopenby = 1;
				}
			}
		}
		event.stopPropagation();
		event.preventDefault();
	}
    }
    function my_mousedown_handler(event) {
	/*
	if (event.button == 2 ) {
		Setup.open();
		return false;
	} else {
		darwflag = true;
	}
	*/
	darwflag = true;
        ctx.beginPath();
    	ctx.strokeStyle = cssStyle[color];
    	ctx.lineWidth = lineWidth;
	//event.preventDefault();
    }
    function my_mouseup_handler(event) {
	darwflag = false;
	event.preventDefault();
    }
    function my_mousemove_handler(event) {
      var mouseCoords;
      if (!darwflag) return;
      
      mouseCoords = getMouseCoords(event); 
      if(mouseCoords == null)
      {
        return; 
      }
      draw(mouseCoords.x, mouseCoords.y);
      //savedMouseCoords = mouseCoords; 

	event.preventDefault();
    }
    function my_click_handler(event) {
    /*
     var mouseCoords;
      
      mouseCoords = getMouseCoords(event); 
      if(mouseCoords == null)
      {
        return; 
      }

      draw(mouseCoords.x, mouseCoords.y);
      //color = (color + 1) % 3;
    */
	event.stopPropagation();
	event.preventDefault();
    }

    function my_dblclick_handler(event) {
	//clean();
	//closecanvas();
    	//Setup.close();

		if (flag_canvasopen) {
			if (Setup == null) 	Setup = new SetupTable;
			Setup.open();
		}
	event.preventDefault();
    }
    //timeout(); 
    function my_keydown_handler(event) 
    {
      var keyCode; 
      event = event || window.event;
      keyCode = event.keyCode;
      switch(keyCode)
      {
        // Shift
        case 16:
		flag_shift = true;
		break;
        // Ctrl
        case 17:
		flag_ctrl = true;
		break;
        // Alt
        case 18:
		flag_alt = true;
		break;
	// p
        case 80:
		if (flag_ctrl && flag_alt) {
		if (flag_canvasopen) {
			if (flag_canvasopenby == 2)
			closecanvas();
		} else {
			if (flag_canvasopenby == 0 || flag_canvasopenby == 2) {
				opencanvas();
				flag_canvasopenby = 2;
			}
		}
		event.preventDefault();
		}
		break;
	//S
	case 83:
		if (flag_canvasopen) {
			if (Setup == null) 	Setup = new SetupTable;
			Setup.open();
		}
	default:
      }
      if (debug == 1) {
	      defaultStatus = "keyDOWN keyCode = " + keyCode +
				" flag_shift = " + flag_shift + 
				" flag_ctrl = " + flag_ctrl + 
				" flag_alt = " + flag_alt +
				" flag_canvasopen = " + flag_canvasopen;
      }
    }
     function my_keyup_handler(event) 
    {
      var keyCode; 
      event = event || window.event;
      keyCode = event.keyCode;
      switch(keyCode)
      {
        // Shift
        case 16:
		flag_shift = false;
		break;
        // Ctrl
        case 17:
		flag_ctrl = false;
		break;
        // Alt
        case 18:
		flag_alt = false;
		break;
	default:
      }
      if (debug == 1) {
	      defaultStatus = "keyUP keyCode = " + keyCode +
				" flag_shift = " + flag_shift + 
				" flag_ctrl = " + flag_ctrl + 
				" flag_alt = " + flag_alt;
      }

	//event.preventDefault();
    }
    function my_resize_handler(event) {
	if (canvas.style.display == "block") {
	    canvasscale();
        }
	//event.preventDefault();
    }

  }






var dragObject= null;
var mouseOffset ;
function SetupTable()
{
	this.sw = document.createElement("div");
	//this.sw.setAttribute("id","setupwindow");
	with(this.sw.style) {
		position = "absolute";
		top = "100px";
		left = "200px";
		zIndex="1000";
		height="200px";
		width="100px";
		border ="#000 solid 1px";
		display="none";
	}
	this.swtitle = document.createElement("div");
	with(this.swtitle.style) {
		height="16px";
		width="100%";
		backgroundColor ="rgb(100,100,230)";
		color = "rgb(256,256,256)";
		fontSize="11px";
		cursor = "pointer";
	}
	this.x = document.createElement("div");
	this.x.innerHTML="&times";
	this.x.addEventListener("click", colsesetupwindow, false);
	with(this.x.style) {
		//float = "right";
		position = "absolute";
		top = "0px";
		right = "0px";
		textAlign = "center";
		width=this.swtitle.style.height -3;
		height=this.swtitle.style.height -3;
		border = "#ddd solid 1px";
		cursor = "pointer";
	}
	with(this.swtitle) {	
		//appendChild(document.createTextNode("Setup"));
		addEventListener("mousedown", swtmousedown, false);
		addEventListener("mouseup", swtmouseup, false);
		addEventListener("mousemove", swtmousemove, false);
		//onmousemove = swtmousemove;
		innerHTML="Setup";
		addEventListener("dblclick", hiddenswc, false);
		appendChild(this.x);
	}
	this.swcontent = document.createElement("div");
	//this.swcontent.setAttribute("id","setupwindowcontent");
	with(this.swcontent.style) {
		height="174px"; // sw_hight - swtitle_hight - padding*2
		backgroundColor ="rgb(221,221,221)"; //#ddd, #dddddd
		padding = "5px";
	}	
	this.sw.appendChild(this.swtitle);
	this.sw.appendChild(this.swcontent);


	this.colortable = document.createElement("table");
	with(this.colortable.style) {
		/*
		position = "absolute";
		top = "100px";
		left = "200px";
		zIndex="1000";
		float="right";
		*/
	}
	//this.colortable
	var row = document.createElement("tr");
	for(var i=0; i< cssStyle.length; i++ ) {
		var cell = document.createElement("td");
		cell.style.backgroundColor= cssStyle[i];
		cell.style.width="12px";
		cell.style.height="12px";
		//cell.style.fontSize ="1px";
		cell.style.borderStyle = "solid";
		cell.style.borderWidth = "1px";
		cell.style.borderColor = "ddd";
		cell.innerHTML = "<div style='width:1x; height:1px;'></div>";
		if (color == i)	{
			cell.style.borderColor ="#fff";
		}
		cell.setAttribute("id",i);
		//cell.innerHTML = "<div style='width:2px; height:2px; background-color:#fff;'></div>";
		//cell.appendChild(document.createTextNode(""));
		cell.addEventListener("click", selectColor, true);
		row.appendChild(cell);
	}
	this.colortable.appendChild(row);

	this.pwtable = document.createElement("table");
	with(this.pwtable.style) {
		/*
		position = "absolute";
		top = "100px";
		left = "200px";
		zIndex="1000";
		float="right";
		*/
	}
	//this.colortable
	for(var i=2; i< 10; i++ ) {
		var row = document.createElement("tr");
		var cell = document.createElement("td");
		cell.style.backgroundColor= "#ddd";
		cell.style.height="12px";
		//cell.style.fontSize ="1px";
		cell.style.border = "#ddd solid 1px";
		cell.innerHTML = "<div style='width:60px; height:"+ i +"px; background-color:#000;'></div>";
		if (lineWidth == i)	{
			cell.style.borderColor ="#fff";
		}
		cell.setAttribute("id",i);
		//cell.appendChild(document.createTextNode(""));
		cell.addEventListener("click", selectPenWidth, true);
		row.appendChild(cell);
		this.pwtable.appendChild(row);
	}



	this.open = function () {
		//table = _("setup_table");
		this.sw.style.display="block";
	}
	this.close = function () {
		//table = _("setup_table");
		this.sw.style.display="none";
	}

	/* Event Handler */
	function selectColor() {
		var colortable_tr = this.parentNode;
		for(var i=0; i< colortable_tr.childNodes.length; i++) {
			colortable_tr.childNodes[i].style.borderColor = "#ddd";
		} 
		this.style.borderColor = "#fff";
		color = this.id;
		//this.parentNode.parentNode.parentNode.parentNode.style.display="none";
		// (this=td)-> tr -> colortable -> swcontent-> sw
	}
	function selectPenWidth() {
		var pwtable = this.parentNode.parentNode;
		for(var i=0; i< pwtable.childNodes.length; i++) {
			pwtable.childNodes[i].childNodes[0].style.borderColor = "#ddd";
		} 
		this.style.borderColor = "#fff";
		lineWidth = this.id;
		//this.parentNode.parentNode.parentNode.parentNode.style.display="none";
		// (this=td)-> tr -> pwtable -> swcontent-> sw
	}
	function hiddenswc(event) {
		//var swc = _("setupwindowcontent");
		var sw = this.parentNode;
		var swc = sw.childNodes[1];
		
		if (sw.style.height == "16px") {
			sw.style.height="200px";
			swc.style.display="block";
		} else {
			sw.style.height="16px";
			swc.style.display="none";
		}
	}
	function colsesetupwindow(event) {
		//table = _("setup_table");
		this.parentNode.parentNode.style.display="none";
		mouseOffset = getMouseOffset(this, event);
		event.stopPropagation();
	}

	function swtmousedown(event){
		dragObject = this.parentNode;
		mouseOffset = getMouseOffset(this, event);
		//event.stopPropagation();

	}
	function swtmouseup(event) {
		dragObject = null;
		//event.stopPropagation();
	}
	function swtmousemove(event) {
		event           = event || window.event;

		if(dragObject){
			var mousePos = mouseCoords(event);
			dragObject.style.top      = mousePos.y - mouseOffset.y;
			dragObject.style.left     = mousePos.x - mouseOffset.x;

			//event.stopPropagation();
			return false;
		}		
	}
	/* -------------- */
	function mouseCoords(ev){
	if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	/*
	return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop
		};
	*/
	}
	function getMouseOffset(target, ev){
		ev = ev || window.event;

		var docPos    = getPosition(target);
		var mousePos  = mouseCoords(ev);
		return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
	}

	function getPosition(e){
		var left = 0;
		var top  = 0;

		while (e.offsetParent){
			left += e.offsetLeft;
			top  += e.offsetTop;
			e     = e.offsetParent;
		}

		left += e.offsetLeft;
		top  += e.offsetTop;

		return {x:left, y:top};
	}

	this.swcontent.appendChild(this.colortable);
	this.swcontent.appendChild(this.pwtable);
	document.body.appendChild(this.sw);
	this.close();

}
	
function _(id){
	return document.getElementById(id);
}

