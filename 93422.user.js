// ==UserScript==
// @name           Better Motorola Canopy
// @namespace      http://www.latinsud.com
// @include        http://*/main.cgi*
// @include        http://*/login.cgi*
// @include        http://*/logon2.htm*
// @version        1.1.9.1
// ==/UserScript==


/******************************
 AP Evaluation Colores
*********************************/

m=document.getElementById('menuselect');
t=document.getElementById('tabbed');

if (m && t && m.innerHTML=='Tools' && t.innerHTML.match("Evaluation")) {
 s=document.getElementById('SectionBHMList');
 if (!s) s=document.getElementById('SectionAPList');
 if (s) {

   // Potencia
   s.innerHTML=s.innerHTML.replace(/Power Level: ([^ ]*)( dBm?)? /g, function(m, p1, p2, offset, ss) {
	res = "<span style='background-color: lightblue'>Power Level: </span><span style='background-color: lightblue; font-weight:bold;'>"+ p1 +" dBm</span> ";
	p1 = parseInt(p1);
        res += "<span style='background-color: green'>";
	for (i=-85; i<p1; i++)
		res += "|";
        res += "</span><span style='background-color: #c0c0c0'>";
	for (i=p1; i<-50; i++)
		res += "|";
        res += "</span> ";
	
	return res;
   });

   // Color
   s.innerHTML=s.innerHTML.replace(/Color Code: ([^ ]*) /g,"<span style='background-color: lightblue'>Color Code: </span><span style='background-color: lightblue; font-weight:bold;'>$1</span> ");

   // Frecuencia
   s.innerHTML=s.innerHTML.replace(/Frequency: [^ ]* /g,"<span style='font-weight:bold;'>$&</span>");

   // Distancia
   rex=new RegExp(" ([0-9]+) feet","g");
   s.innerHTML = s.innerHTML.replace(rex, function(m, p1, offset, ss) {
      metros = parseInt ( parseFloat(p1) * 0.3048 );
      return (m + " <span style='font-weight:bold;'>(" + metros +" metros)</span> ");
    }
   );

   // Lineas
   s.innerHTML=s.innerHTML.replace(/>\*\*\*\*\*\*+</g, "><hr/><");
 }
}



/******************************
 Autologin
*********************************/
// Perform autologin in FW 8.x
// Only works if password has been stored in browser
if (location.href.match(/\/logon2.htm.*bmc_autologin=1/)) { 
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
        script.textContent = "function conditionalAutoLogin(){if (document.getElementById('CanopyUsername').value.length>0) {document.forms[0].submit()}};"
        script.textContent += "setTimeout('conditionalAutoLogin()', 1);"
	document.body.appendChild(script);
	document.body.removeChild(script);
}



// Quick Redirect. Find meta redirect and do it
var ms=document.getElementsByTagName('meta');
for(i=0; i<ms.length; i++) {
   var mattr=ms[i].attributes;
   
   // old ff+gm is random sorted and not associative
   if (mattr.length == 2) {
	if ( mattr[0].value=='Refresh' ) {
		m0=mattr[0].value;
		m1=mattr[1].value;
	} else {
		m0=mattr[1].value;
		m1=mattr[0].value;
	}
	if ( m0=='Refresh' && m1.match(/^[0-9]+; URL=main.cgi\?mac_esn=[0-9a-f]{12}$/) ) {
        	var u=m1.replace(/^[0-9]+; URL=(main.cgi\?mac_esn=[0-9a-f]{12})$/,"$1");
	        location.href=location.href.replace(/(https?:\/\/[^/]+\/).*/,"$1"+u);
	}
   }
}


/******************************
 Home
*********************************/
// Pasar a metros
s=document.getElementById("SectionSubscriberModemStats");
if (!s) s=document.getElementById("SectionTimingSlaveStats");

if (s) {
   rex=new RegExp('\\(([0-9]+) feet\\)','g');
   s.innerHTML = s.innerHTML.replace(rex, function(m, p1, offset, ss) {
      metros = parseInt ( parseFloat(p1) * 0.3048 );
      return (p1 + " feet (" + metros +" metros)");
    }
   );
   s.innerHTML = s.innerHTML.replace(/ approximately/, " approx");
  
  // Colorear (FW 8.x)
  ts=s.getElementsByTagName('TD');
  for (i=0; i<ts.length; i++) {
    if (ts[i].innerHTML == "Session Status :") {
      t = ts[i].parentNode.getElementsByTagName('TD')[1];
      if (t.innerHTML.match(/^\n*REGISTERED/)) {
        t.innerHTML = t.innerHTML.replace(/^\n*[A-Z]+/,"<span style='background-color: #80ff80'>$&</span>");
      } else if (t.innerHTML.match(/^\n*[A-Z]/)) {
        t.innerHTML = t.innerHTML.replace(/^\n*[A-Z]+/,"<span style='background-color: #ff8080'>$&</span>");
      }
    }
  }

  // Resaltar power level (FW 8.x)
  ts=s.getElementsByTagName('TD');
  for (i=0; i<ts.length; i++) {
    if (ts[i].innerHTML == "Power Level :") {
      t = ts[i].parentNode.getElementsByTagName('TD')[1];
      if (t.innerHTML.match(/^\n*-/)) {
        t.innerHTML = "<span style='font-weight: bold'>"+ t.innerHTML +"</span>";
      }
    }
  }
}

// Colorear session status (FW 9.x)
s=document.getElementById("SesStatus");
if (s) {
  if (s.innerHTML.match(/^[ \n]*REGISTERED[ \n]*$/)) {
     s.style.backgroundColor="#80ff80";
  } else {
     s.style.backgroundColor="#ff8080";
  }	
}

// Resaltar power level (FW 9.x)
s=document.getElementById("PowerLevel");
if (!s)
        s=document.getElementById("PowerLevelOFDM");
if (s) {
  s.style.fontWeight="bold";
}


// Resaltar Ethernet 8.x
s=document.getElementById("SectionDeviceInfo");
if (s) {
  ts=s.getElementsByTagName('TD');
  for (i=0; i<ts.length; i++) {
    if (ts[i].innerHTML == "Ethernet Interface :") {
      t = ts[i].parentNode.getElementsByTagName('TD')[1];
      if (!t.innerHTML.match(/100Base-TX Full Duplex/)) {
        t.style.backgroundColor="yellow";
      }
    }
  }
}


// Resaltar Ethernet 9.x
s=document.getElementById("LinkStatus");
if (s && !s.innerHTML.match(/100Base-TX Full Duplex/)) {
  s.style.backgroundColor="yellow";
}




// Resaltar Error no sync / disconnected
s=document.getElementById("SectionAccessPointStats");
if (!s)
  s=document.getElementById("SectionBHStats");
if (s) {
  ts=s.getElementsByTagName('TD');
  for (i=0; i<ts.length; i++) {
    if (ts[i].innerHTML.match("^\n*ERROR: No Sync!\n*$") || ts[i].innerHTML.match("^\n*Disconnected\n*$") ) {
      ts[i].style.backgroundColor="#ff4040";
      ts[i].style.fontWeight="bold";
    }
  }
}


// Resaltar Disconnected
s=document.getElementById("IsBHSConnected");
if (s && s.innerHTML.match("^\n*Disconnected\n*$")) {
        s.style.backgroundColor="#ff4040";
        s.style.fontWeight="bold";
}


// Mostrar quicklogin y autologin (FW 8.x)
m=document.getElementById('menu');
if (m && (as=m.getElementsByTagName('A')) ) {
	len=as.length;
	for (i=0; i<len; i++) {
		if (as[i].className=="menu" && as[i].href.match(/logon2.htm/)) {


			f1=document.createElement('FORM');
                        f1.action='login.cgi';
			f1.method='post';
			f1.id='quickform';
			f1.style.marginBottom="0.5em";
			f1.style.marginTop="0.5em";


			 f2=document.createElement('DIV');
			 f2.className='menu';
			 f2.id='quicklogin';
			 f2.style.fontSize='small';

			  f3=document.createTextNode('Username: ');

			  f4=document.createElement('INPUT');
			  f4.type='text';
			  f4.name='CanopyUsername';
			  f4.id='CanopyUsername';

			  f5=document.createElement('BR');

			  f6=document.createTextNode('Password: ');

			  f7=document.createElement('INPUT');
			  f7.type='password';
			  f7.name='CanopyPassword';
			  f7.id='CanopyPassword';
			  f7.style.marginBottom='0.5em';

			  f8=document.createElement('BR');

			  f9=document.createElement('INPUT');
			  f9.type='submit';
			  f9.value='Login';
			  f9.name='login';
			  f9.id='loginbutton';

			  f10=document.createElement('INPUT');
			  f10.type='hidden';
			  f10.value='submit';
			  f10.name='webguisumit';

			f1.appendChild(f2);

			f2.appendChild(f3);
			f2.appendChild(f4);
			f2.appendChild(f5);
			f2.appendChild(f6);
			f2.appendChild(f7);
			f2.appendChild(f8);
			f2.appendChild(f9);
			f2.appendChild(f10);

			as[i].parentNode.insertBefore(f1, as[i].nextSibling);


			// Insert autologin
			as2=as[i].cloneNode(true);
			as2.innerHTML="Login (auto)";
			if ( as2.href.match(/\?/))
				as2.href+="&bmc_autologin=1";
			else
				as2.href+="?bmc_autologin=1";
			as[i].parentNode.insertBefore(as2, as[i].nextSibling)
			 
		}
	}
}


/******************************
 AP Session Status
*********************************/

s=document.getElementById("SectionSessionStats");
if (s) {
 txt=s.innerHTML;

 // session status
 rex=new RegExp('State: \([^<]*\)<','g');
 txt=txt.replace(rex, function (m, p1, offset, ss) {
   if (p1.match(/^IN SESSION/i))
      return "State: <span style='background-color: #c0ffc0'>"+ p1 +"</span><" ;
   else
      return "State: <span style='background-color: #ff8080'>"+ p1 +"</span><" ;
  }
 );

 // site name
 txt=txt.replace(/(( |&nbsp;)*)(Site Name ?: [^<]*)</g,"$1<b>$3</b><");

 // jitter
 txt=txt.replace(/Jitter \(Avg\/Last\): *[0-9]+ *\/ *[0-9]+/g, "<b>$&</b>");
 txt=txt.replace(/Jitter \(Last\): *[0-9]+/g, "<b>$&</b>");

 // power level
 txt=txt.replace(/Power Level \(Avg\/Last\): *-[0-9]+ *(dBm?)?\/ *-[0-9]+ *(dBm?)?/g, "<b>$&</b>");
 txt=txt.replace(/Power Level \(Last\): *-[0-9]+ *(dBm?)?/g, "<b>$&</b>");
 txt=txt.replace(/Power Level : *-[0-9.]+ *(dBm?)?/g, "<b>$&</b>");

 // distance
 rex=new RegExp('\\(([0-9]+) feet\\)','g');
 txt = txt.replace(rex, function(m, p1, offset, ss) {
      metros = parseInt ( parseFloat(p1) * 0.3048 );
      return (p1 + " feet (" + metros +" metros)");
   }
 );
 txt = txt.replace(/approximately +([0-9])/g, "approx $1");

 s.innerHTML=txt;
}


/******************************
 Eliminar logo
*********************************/
logos=document.body.getElementsByTagName('DIV');
for (i=0; i<logos.length; i++) {
	if(logos[i].className == "logo") {
		logos[i].parentNode.removeChild(logos[i]);
		menu=document.getElementById('menu');
		if (menu) {
			menu.style.borderRadius='6px 6px 0px 0px';
			menu.style.MozBorderRadiusTopleft='6px';
			menu.style.MozBorderRadiusTopright='6px';
		}
	}
}


/*******************************
Cambiar urls de SM (necesario si el AP esta detras de NAT)
********************************/
var arr = document.getElementsByTagName('a');
for(var i in arr){
 if (typeof arr[i].href === "undefined") continue;
 if (arr[i].href.match(/^http.*:1080\//)) {
	arr[i].href=arr[i].href.replace(/^(https?:\/\/)[^\/]*(\/.*)$/, "$1"+window.location.hostname+":1080$2");
 }	 
}