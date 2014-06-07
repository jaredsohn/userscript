// ==UserScript==
// @name          Facebook thumbnail enlarger
// @namespace     geological-supplies.com
// @version       2.0:  Full integration with new site design
// @version       1.0:  Compatability issues fixed.
// @description   Displays a larger version of thumbnail images when you roll over them at Facebook
// @include       http://*facebook.com*
// ==/UserScript==
  var http_request = false;

function sqr(x) { return (x*x) }

eventThingX = 0;
eventThingY = 0;
var globalTimer;
var currentHref;
var newDiv = document.createElement('div');
var inner = newDiv.appendChild(document.createElement('div'));
newDiv.setAttribute('id', 'enlargement');
newDiv.setAttribute('style', 'position:fixed; display:none; z-index:100; bottom:20px; right:20px; padding:1px; max-width:333px;  background-color:#3B5998;');
document.body.appendChild(newDiv);
newDiv.addEventListener(
  'mouseover',
  function(event) {
    this.style.display = "inline";
  },
  true);
newDiv.addEventListener(
  'mouseout',
  function(event) {
    window.clearTimeout(globalTimer);
    this.style.display = "none";
  },
  true);
newDiv.addEventListener(
  'mousemove',
  function(e) {
    if (sqr(eventThingX - e.pageX) + sqr(eventThingY - e.pageY) > 1337) {
      window.clearTimeout(globalTimer);
      this.style.display = "none";
    }
  },
  true);
var allImages = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=allImages.snapshotLength-1; i>=0; i--){
  var thisImage = allImages.snapshotItem(i);
  var src = thisImage.src;
  if ((src.indexOf('static') == -1) && 
      !((/\/app[^/]*$/).test(src)) && 
      (src != src.substring( 0, src.lastIndexOf('/') + 1 ) + 'n' + src.substring( src.lastIndexOf('/') + 2, src.length ))){
  thisImage.addEventListener(
    'mouseover',
    function(event) {
	  var title = "";
      if (this.getAttribute('title')) {
		  title = this.getAttribute('title');
		  title = title.substr(0,1).toUpperCase() + title.substr(1,title.length);
		  title = title.replace(/ \\ /g, "<br> ");
	  }
	  if (this.getAttribute('src')) {
		  src2href = /t(\d{8})_(\d{8})_\d{4}\.jpg/;
		  window2domain = /http:\/\/\w*\.facebook\.com/;
		  // transform http://photos-c.ak.facebook.com/photos-ak-sctm/v115/74/45/36904470/t36904470_34627706_3858.jpg into http://cambridge.facebook.com/photo.php?pid=34627813&id=36904470&ref=nf/
		  var imglocators = src2href.exec(this.getAttribute('src'));
		  var startoflink = (window.location.href);
	  }	
      fullsize=this.src.substring( 0, this.src.lastIndexOf('/') + 1 ) + 'n' + this.src.substring( this.src.lastIndexOf('/') + 2, this.src.length );
      thisImage = this;
	  currentHref = this.href;
	  inner.innerHTML = "<img id=imagepreview style = 'max-width:331px; max-height: "+ (parseInt(window.innerHeight) - 40) +"px; margin-bottom: -2px; cursor: crosshair;' src='" + fullsize + "'><p style='padding:0 1.5em; color:white;'>" + title + "</p><p id=imgD></p></div>";
	  newDiv.style.display = "inline";
    },
    true);
  
  document.addEventListener(
    'keydown',
    function(event) {
	  var paddedWidth = (parseInt(window.innerWidth) - 40);
      document.getElementById("enlargement").style.maxWidth = paddedWidth + "px";
	  if (document.getElementById("imagepreview")) {
		  document.getElementById("imagepreview").style.maxWidth = paddedWidth + "px";
		  if (event.keyCode <= 17) {
			  if (document.getElementById("imagepreview").getAttribute('src')) {
				  src2href = /\w(\d{8})_(\d{8})_\d{4}\.jpg/;
				  href2domain = /http:\/\/\w*/;
				  // transform http://photos-c.ak.facebook.com/photos-ak-sctm/v115/74/45/36904470/t36904470_34627706_3858.jpg into http://cambridge.facebook.com/photo.php?pid=34627813&id=36904470&ref=nf/
				  var imglocators = src2href.exec(document.getElementById("imagepreview").getAttribute('src'));
				  var startoflink = href2domain.exec(document.getElementById("imagepreview").getAttribute('src'));	  
			  }
		  }	
	  }
    },
	true);
  
  document.addEventListener(
    'keyup',
    function(event) {
      	document.getElementById("enlargement").style.maxWidth = "333px";
      	if (document.getElementById("imagepreview")) {document.getElementById("imagepreview").style.maxWidth = "331px";}
	},
	true);
		
    thisImage.addEventListener(
    'mouseout',
    function(event) {
      window.clearTimeout(globalTimer);
      newDiv.style.display = "none";
    },
    true);
  thisImage.addEventListener(
    'mousemove',
    function(e) {
      eventThingX = e.pageX;
      eventThingY = e.pageY;
    },
    true);
  }
}