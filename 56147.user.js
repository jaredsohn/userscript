// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           Dict.cc popup
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Search dict.cc without leaving the site you are browsing. Just press alt+x or alt+d to open a dict.cc input.
// @include        *
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//
try {
   if(!document.location.host) {
      return;
   }
}
catch (e) {
   return;
}

if(document.location.host != "syn.dict.cc") {
   document.addEventListener("keypress", function(e) {showDictBox(e)}, false);
   try {
      //needed to avoid breaking of the forward button
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=521232
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=293417
      tempDictIFrame = document.getElementsByTagName('body')[0].appendChild(document.createElement('iframe'));
	  tempDictIFrame.setAttribute('id', 'dictIFrame');
      tempDictIFrame.setAttribute('style', 'display: none;');
   }
   catch (e) {
      //do nothing...
   }
}

function showDictBox(event) {
   if(((event.charCode == 100) && event.altKey) || ((event.charCode == 120) && event.altKey)){
      if(!document.getElementById('dictBox')) {
	     if(document.getElementById("dictBoxClosed")) {
		    document.getElementById("dictBoxClosed").setAttribute('style', 'position: absolute; top:' + (window.pageYOffset+25) +'px; left: 25px; border: 2px solid black; color: black; background-color: white; background-color: rgba(255, 255, 255, 0.9); -moz-border-radius: 5px; min-height: 50px; min-width: 100px; padding: 10px; z-index: 1000;');
			document.getElementById("dictBoxClosed").setAttribute("id", "dictBox");
			document.getElementById("dictIFrame").setAttribute('style', 'display: none;');
			window.setTimeout(function() {if(document.getElementById("dictBox")){document.getElementById('dictInputbox').focus()}}, 1);
			return;
		 }
         try{
            dictBox = document.getElementsByTagName('body')[0].appendChild(document.createElement('div'));
			document.getElementsByTagName('body')[0].removeChild(document.getElementById("dictIFrame"));
         }
         catch(e){
            //Appending not possible, maybe the page is a frameset?
            window.setTimeout(function() {window.focus()}, 1);
            return;
         }
         dictBox.setAttribute('id', 'dictBox');

         dictLogo = dictBox.appendChild(document.createElement('a'));
         dictLogo.setAttribute('href', 'http://www.dict.cc/');
         dictLogo.setAttribute('style', 'float: left; margin: 2px; margin-left: 0px; margin-right: 25px; height: 36px; margin-top: -5px; border-width: 0px !important; font-weight: bolder; font-style: italic; color: darkorange; font-size: 30px; text-decoration: none; font-family: Arial, Helvetica, sans-serif; background-color: transparent; padding: 4px;');
         dictLogo.appendChild(document.createTextNode('dict.cc'));

         inputbox = dictBox.appendChild(document.createElement('input'));
         inputbox.setAttribute('id', 'dictInputbox');
         inputbox.setAttribute('type', 'text');
         inputbox.setAttribute('style', 'float: left; -moz-appearance: textfield !important; width: auto; height: auto; padding: auto; margin: 2px;');
         inputbox.addEventListener("keypress", function(e) {if(e.keyCode == 13){getDictEntries()}}, false);

         dictButton = dictBox.appendChild(document.createElement('input'));
         dictButton.setAttribute('type', 'submit');
         dictButton.setAttribute('value', 'OK');
         dictButton.setAttribute('style', 'float: left; -moz-appearance: button !important; height: auto; width: auto; margin: 2px; margin-left: 3px; padding: 0px; padding-left: 5px; padding-right: 5px;');
         dictButton.addEventListener("click", function() {getDictEntries()}, false);

         closeButton = dictBox.appendChild(document.createElement('a'));
         closeButton.setAttribute('id', 'dictCloseButton');
         closeButton.setAttribute('style', 'float: right; margin-left: 25px; margin-top: -7px; margin-right: -7px; cursor: pointer; border-width: 0px !important;');
         closeButton.addEventListener('click', function(e) {document.getElementById('dictBox').setAttribute("style", "display: none;");
                                                            document.getElementById('dictBox').setAttribute("id", "dictBoxClosed");
															document.getElementById('dictInputbox').value = "";
                                                            window.setTimeout(function() {window.focus()}, 1);}, false);

         closeButton_img = closeButton.appendChild(document.createElement('img'));
         closeButton_img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACmAAAApgBNtNH3wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALdSURBVDiNnZVLaxNRGIafM5dEWm2pVaSoWBWxUlAoBhUbAooIKqIBl9KVC8GiPyClFVPctkjBlUtRFyIiRRAUqysFLwU3KcU0scEGrVZrpElmXhdNQm4IOvByzjDnPPPd+D4jiSFjwhYMCqICm394DHgW3PfgxjXphYlBGHi+DYq94AYaL1RE3d4C8sA0FGbBASKOBYNboXga3CZ/b4CWZVWte8C9A4U5GLQE0d3gekDLyAgbl5exQiE8aCq/JNPXR8urV5iDB/GAveD6ELUEtlM6XFxYwLS20vn0KVZvbw2gLA+wQiHWTk1hh0KYnh58Vt0T2MRAL0HJkr6PjkqSvK9fNb9jh1KgNOgTaB705cAB+b9+SZJy169rEfQN9A4UAxEDTYFmq7Q0MSFJKmYySm3erCQoBVo4dEh+LidJWo7HlQV9AS2C3lYDn4ES1TJGP27fliQVPn7U3IYNyhw+LP/3b0nSj6tXlQF9hgr0TQnoUBWbSnYlMufPs6WtjdaTJ+l6/RqnqwsTDPJ9aIif8ThWXUX4VaWEmmXU8/gUjbIyPY3b3Y0JBlkcHuZbPN6QKFWBrWoL68sj2N9PoKencnhNJIJctwakOmgDsLxvOXaMbY8fYwIBsrEY+USCliNH2HT3LrKsGpDqgfXWrT1+nO2TkxjXJXPlCtnRUZLhMIVUitazZ9l461YN6K8urztxgp2PHmEch/SlS2THx/GBfDZLsr8fL5tl3cAA68fGmkJrgO2nTrHr4UOM45C8eJGFiYmaeOXTaebCYfylJdovX6Z9eLgCagrsHh/H2DazFy7w+ebNhhgJWEkkSEUiKJejY2QEd//+GpcdwMuD7QMfzp0j0NnJ0pMn2E1gZUtW3r9n/uhR2gYGKM7MYFhtYwY8MwT3OuDMPnDL7chitcuWV7vJe/23SSjMw4NKg+2AYlepwVr/oCIwA4V0qcGa8ggwpRHAf4wAA/f90gj4A4J5lJ+MD2rFAAAAAElFTkSuQmCC');
         closeButton_img.setAttribute('alt', 'close');
         closeButton_img.setAttribute('style', 'border-width: 0px !important;');

         dictBox.appendChild(document.createElement('br'));

         resIFrame = dictBox.appendChild(document.createElement('iframe'));
         resIFrame.setAttribute('id', 'dictIFrame');
         resIFrame.setAttribute('style', 'display: none;');

         window.setTimeout(function() {if(document.getElementById("dictBox")){document.getElementById('dictInputbox').focus()}}, 1);

         dictBox.setAttribute('style', 'position: absolute; top:' + (window.pageYOffset+25) +'px; left: 25px; border: 2px solid black; color: black; background-color: white; background-color: rgba(255, 255, 255, 0.9); -moz-border-radius: 5px; min-height: 50px; min-width: 100px; padding: 10px; z-index: 1000;');
      }
      else {
	  document.getElementById('dictBox').setAttribute("style", "display: none;");
      document.getElementById('dictBox').setAttribute("id", "dictBoxClosed");
	  document.getElementById('dictInputbox').value = "";
      window.setTimeout(function() {window.focus()}, 1);
      }
   }
}

function getDictEntries() {
   wordForLookup = document.getElementById('dictInputbox').value;
   URL_prefix = 'http://syn.dict.cc/?s=';
   URL = URL_prefix + wordForLookup + "#dict_popup";

   resultsIFrame = document.getElementById('dictIFrame');
   resultsIFrame.setAttribute('style', 'display: none;');
   try{
      //this doesn't clutter the browser's history...
      resultsIFrame.contentWindow.location.replace(URL);
   }
   catch (e) {
      //...but it doesn't always work, so we use the alternative in this case
	  resultsIFrame.setAttribute('src', URL);
   }

   timeOut = window.setTimeout(function() {
      if (document.getElementById('dictBox')) {
         resultsIFrame.setAttribute('style', 'display: block; border-width: 0px; width: 90%; height: 90%; width: -moz-available; height: -moz-available;');
         document.getElementById('dictBox').setAttribute('style', 'position: absolute; top:' + (window.pageYOffset+25) +'px; left: 25px; border: 2px solid black; color: black; background-color: white; background-color: rgba(255, 255, 255, 0.9); -moz-border-radius: 5px; height: 90%; min-width: 90%; padding: 10px; z-index: 1000;');
      } 
      else {
         //the dictBox was removed...
      }
   }, 1000); //setTimeout

   document.getElementById('dictInputbox').focus();

   focusInterval = window.setInterval(function() {
      if (document.getElementById('dictBox')) {
         document.getElementById('dictInputbox').focus();
      } 
      else {
         //the dictBox was removed, so we clear the interval, 
         //because else the Error-Console will be filled with useless error messages...
         window.clearInterval(focusInterval);
      }
   }, 3000); //focusInterval
}

if((document.location.hash == "#dict_popup") && (document.location.host == "syn.dict.cc")) {
   for(i=0; i < document.getElementsByTagName('a').length; i++) {
      if ((document.getElementsByTagName('a')[i].getAttribute('href').slice(0,1) != '/') && 
	      (document.getElementsByTagName('a')[i].getAttribute('href').slice(0,1) != '?') &&
		  (document.getElementsByTagName('a')[i].getAttribute('href').slice(0,10).toLowerCase() != 'javascript')) {
         //Outgoing links will be opened in a new tab...
         document.getElementsByTagName('a')[i].setAttribute('target', '_blank');
         //document.getElementsByTagName('a')[i].addEventListener('click', function(e) {document.getElementById('dictBox').parentNode.removeChild(document.getElementById('dictBox'));}, false);
      }
      else {
         //...dict links in the dict popup
         document.getElementsByTagName('a')[i].setAttribute('href', document.getElementsByTagName('a')[i].getAttribute('href') + "#dict_popup");
		 //...don't clutter the history (XXX: this workaround is stupid)
		 document.getElementsByTagName('a')[i].addEventListener('mousedown', function(e) {var URI=this.getAttribute('href');this.removeAttribute('href');document.location.replace(URI);}, false);
      }
   }
   var newStyle = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
   newStyle.appendChild(document.createTextNode('* { background-image: none !important;}'));
   newStyle.appendChild(document.createTextNode('html,body { background-color: transparent !important;}'));
   newStyle.appendChild(document.createTextNode('.aftertable, body > div { width: 718px; }'));
   newStyle.appendChild(document.createTextNode('body > * { margin-left: auto !important; margin-right: auto !important;}'));
   newStyle.appendChild(document.createTextNode('body > img { display: block !important;}'));
   newStyle.appendChild(document.createTextNode('tr[id] * { background-color: transparent !important; }'));
   newStyle.appendChild(document.createTextNode('tr[id]:nth-child(2n+0) { background-color: rgba(255, 200, 0, 0.2) !important; }'));
}

