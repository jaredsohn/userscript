// ==UserScript==
// @name PWSZ Nysa Plan+ 
// @copyright 2010 - Marcin Rabczyński
// @version 0.5
// @namespace www.spec4u.net
// @description Koloruje, podswietla i przygotowuje do druku plan dla studentów PWSZ Nysa
// @include http://www.pwsz.nysa.pl/plany/planWydruk.php?NrKier=*
// @require http://sizzlemctwizzle.com/updater.php?id=97816
// ==/UserScript==


// ----------------------------------------------------------------------------
// HasClassName
//
// Description : returns boolean indicating whether the object has the class name
//    built with the understanding that there may be multiple classes
//
// Arguments:
//    objElement              - element to manipulate
//    strClass                - class name to add
//
window.HasClassName = function(objElement, strClass)
   {

   // if there is a class
   if ( objElement.className )
      {

      // the classes are just a space separated list, so first get the list
      var arrList = objElement.className.split(' ');

      // get uppercase class for comparison purposes
      var strClassUpper = strClass.toUpperCase();

      // find all instances and remove them
      for ( var i = 0; i < arrList.length; i++ )
         {

         // if class found
         if ( arrList[i].toUpperCase() == strClassUpper )
            {

            // we found it
            return true;

            }

         }

      }

   // if we got here then the class name is not there
   return false;

   }
// 
// HasClassName
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// AddClassName
//
// Description : adds a class to the class attribute of a DOM element
//    built with the understanding that there may be multiple classes
//
// Arguments:
//    objElement              - element to manipulate
//    strClass                - class name to add
//
window.AddClassName = function(objElement, strClass, blnMayAlreadyExist)
   {

   // if there is a class
   if ( objElement.className )
      {

      // the classes are just a space separated list, so first get the list
      var arrList = objElement.className.split(' ');

      // if the new class name may already exist in list
      if ( blnMayAlreadyExist )
         {

         // get uppercase class for comparison purposes
         var strClassUpper = strClass.toUpperCase();

         // find all instances and remove them
         for ( var i = 0; i < arrList.length; i++ )
            {

            // if class found
            if ( arrList[i].toUpperCase() == strClassUpper )
               {

               // remove array item
               arrList.splice(i, 1);

               // decrement loop counter as we have adjusted the array's contents
               i--;

               }

            }

         }

      // add the new class to end of list
      arrList[arrList.length] = strClass;

      // add the new class to beginning of list
      //arrList.splice(0, 0, strClass);
      
      // assign modified class name attribute
      objElement.className = arrList.join(' ');

      }
   // if there was no class
   else
      {

      // assign modified class name attribute      
      objElement.className = strClass;
   
      }

   }
// 
// AddClassName
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// RemoveClassName
//
// Description : removes a class from the class attribute of a DOM element
//    built with the understanding that there may be multiple classes
//
// Arguments:
//    objElement              - element to manipulate
//    strClass                - class name to remove
//
window.RemoveClassName = function(objElement, strClass)
   {

   // if there is a class
   if ( objElement.className )
      {

      // the classes are just a space separated list, so first get the list
      var arrList = objElement.className.split(' ');

      // get uppercase class for comparison purposes
      var strClassUpper = strClass.toUpperCase();

      // find all instances and remove them
      for ( var i = 0; i < arrList.length; i++ )
         {

         // if class found
         if ( arrList[i].toUpperCase() == strClassUpper )
            {

            // remove array item
            arrList.splice(i, 1);

            // decrement loop counter as we have adjusted the array's contents
            i--;

            }

         }

      // assign modified class name attribute
      objElement.className = arrList.join(' ');

      }
   // if there was no class
   // there is nothing to remove

   }
// 
// RemoveClassName
// ----------------------------------------------------------------------------

window.y2k = function(number) { return (number < 1000) ? number + 1900 : number; }

window.getWeek = function(year,month,day) {
  var when = new Date(year,month,day);
  var newYear = new Date(year,0,1);
  var modDay = newYear.getDay();
  if (modDay == 0) modDay=6; else modDay--;

  var daynum = ((Date.UTC(y2k(year),when.getMonth(),when.getDate(),0,0,0) - Date.UTC(y2k(year),0,1,0,0,0)) /1000/60/60/24) + 1;

  if (modDay < 4 ) {
    var weeknum = Math.floor((daynum+modDay-1)/7)+1;
  } else {
    var weeknum = Math.floor((daynum+modDay-1)/7);
    if (weeknum == 0) {
      year--;
      var prevNewYear = new Date(year,0,1);
      var prevmodDay = prevNewYear.getDay();
      if (prevmodDay == 0) prevmodDay = 6; else prevmodDay--;
      if (prevmodDay < 4) weeknum = 53; else weeknum = 52;
    }
  }

  return + weeknum-8;
}
var weekday=new Array(19);
	weekday[0]="empty";
	weekday[1]="nieparzysty";
	weekday[2]="parzysty";
	weekday[3]="nieparzysty";
	weekday[4]="parzysty";
	weekday[5]="nieparzysty";
	weekday[6]="parzysty";
	weekday[7]="nieparzysty";
	weekday[8]="parzysty";
	weekday[9]="nieparzysty";
	weekday[10]="parzysty";
	weekday[11]="nieparzysty";
	weekday[12]="parzysty";
	weekday[13]="nieparzysty";
	weekday[14]="parzysty";
	weekday[15]="nieparzysty";
	weekday[16]="parzysty";
	weekday[17]="nieparzysty";
	weekday[18]="parzysty";
	weekday[19]="sesja";
	weekday[20]="sesja";
var now = new Date();
alert('tydzien ' + weekday[getWeek(y2k(now.getYear()),now.getMonth(),now.getDate()+7)]);

window.fill_html_code = function() {
	var fileref=document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", "http://www.spec4u.net/projects/pwsz_plan/style.css");

	if (typeof fileref!="undefined") {
		document.getElementsByTagName("head")[0].appendChild(fileref);
	}
	
	var arrCourses = document.getElementsByClassName('planPelnyKurs');
	for (i = 0; i < arrCourses.length; i++) {
		arrCourses[i].addEventListener("click", function() {if (this.style.opacity=='1') {this.style.opacity='0.3';} else {this.style.opacity='1';} }, false);
		arrCourses[i].style.cursor = "pointer";
	}

  var imgElement=document.createElement("img");
  imgElement.setAttribute("src", "http://www.spec4u.net/projects/pwsz_plan/settings-icon.png");
  imgElement.setAttribute("id", "obrazekUstawien");
  document.getElementsByTagName("body")[0].appendChild(imgElement);
  
  document.getElementById('obrazekUstawien').addEventListener("click", function() {
		var settingsDiv = document.getElementById('ustawienia');
		if(settingsDiv.style.display == 'block') 
		{ 
			settingsDiv.style.display = 'none';
		} else {
			settingsDiv.style.display = 'block';
		}
	}, false);
	
  var divElement=document.createElement("div");
  divElement.setAttribute("id", "ustawienia");
  document.getElementsByTagName("body")[0].appendChild(divElement);
  
  document.getElementById('ustawienia').innerHTML = '<form name="ustawienia"><div id="ust_header">Ustawienia</div>wersja bw do druku: <input type="checkbox" name="bw_print" id="formBw_print"><br/>Grupa wykładowa: <select name="gr_wyk" id="formGr_wyk"><option value="1">1</option><option value="2">2</option>	<option value="3">3</option>	<option value="4">4</option></select><br/>Grupa cwiczeniowa: <select name="gr_cw" id="formGr_cw">	<option value="1">1</option>	<option value="2">2</option>	<option value="3">3</option>	<option value="4">4</option>	<option value="5">5</option>	<option value="6">6</option></select><br/>Grupa laboratoryjna: <select name="gr_lab" id="formGr_lab">	<option value="1">1</option>	<option value="2">2</option>	<option value="3">3</option>	<option value="4">4</option>	<option value="5">5</option>	<option value="6">6</option>	<option value="7">7</option>	<option value="8">8</option>	<option value="9">9</option>	<option value="10">10</option></select><br/>Grupa projektowa: <select name="gr_proj" id="formGr_proj">	<option value="1">1</option>	<option value="2">2</option>	<option value="3">3</option>	<option value="4">4</option>	<option value="5">5</option>	<option value="6">6</option>	<option value="7">7</option>	<option value="8">8</option>	<option value="9">9</option>	<option value="10">10</option></select><br/>Grupa seminaryjna: <select name="gr_sem" id="formGr_sem">	<option value="1">1</option>	<option value="2">2</option>	<option value="3">3</option>	<option value="4">4</option>	<option value="5">5</option>	<option value="6">6</option>	<option value="7">7</option>	<option value="8">8</option>	<option value="9">9</option>	<option value="10">10</option></select><br/>	<input type="button" name="Pokaz" value="Pokaż" id="formPokaz">	<input type="button" name="Wyczysc" value="Wyczyść" id="formWyczysc">	</form>';
  document.getElementById('formWyczysc').addEventListener("click", function() {
		var arrCourses = document.getElementsByClassName('planPelnyKurs');
		for (var i = 0; i < arrCourses.length; i++) {
			arrCourses[i].style.opacity='0.3';
			arrCourses[i].className = 'planPelnyKurs';
		}
	}, false);
	  
	document.getElementById('formPokaz').addEventListener("click", function() {
		var arrCourses = document.getElementsByClassName('planPelnyKurs');
		for (var i = 0; i < arrCourses.length; i++) {
			arrCourses[i].style.opacity='0.3';
			arrCourses[i].className = 'planPelnyKurs';
		}
		
		var intWyk = document.getElementById('formGr_wyk').selectedIndex+1; 
		var intCw = document.getElementById('formGr_cw').selectedIndex+1; 
		var intLab = document.getElementById('formGr_lab').selectedIndex+1; 
		var intProj = document.getElementById('formGr_proj').selectedIndex+1;
		var intSem = document.getElementById('formGr_sem').selectedIndex+1;
		var tn = new RegExp('tn');
		var tp = new RegExp('tp');
		var tz = new RegExp('tz');
		var wyk = new RegExp('W'+intWyk+',');
		var cw = new RegExp('C'+intCw+',');
		var lab = new RegExp('L'+intLab+',');
		var proj = new RegExp('P'+intProj+',');
		var sem = new RegExp('S'+intSem+',');
		var poj = new RegExp('t/z:');

		if(document.getElementById('formBw_print').checked == true) {
			document.getElementsByTagName('link')[0].href = "http://www.spec4u.net/projects/pwsz_plan/blank.css";
			document.getElementsByTagName('link')[1].href = "http://www.spec4u.net/projects/pwsz_plan/bw_print_style.css";
		} else {
			document.getElementsByTagName('link')[0].href = "TTstyle.css";
			document.getElementsByTagName('link')[1].href = "http://www.spec4u.net/projects/pwsz_plan/style.css";
		}
		
		var arrCourses = document.getElementsByClassName('planPelnyKurs');
		for (i = 0; i < arrCourses.length; i++) {
			if (arrCourses[i].innerHTML.match(tn)) {
				AddClassName(arrCourses[i], 'tn', true);
			}
			if (arrCourses[i].innerHTML.match(tp)) {
				AddClassName(arrCourses[i], 'tp', true);
			}
			if (arrCourses[i].innerHTML.match(tz)) {
				AddClassName(arrCourses[i], 'tz', true);
			}
			if (arrCourses[i].innerHTML.match(wyk)) {
				arrCourses[i].style.opacity = '1';
			}
			if (arrCourses[i].innerHTML.match(cw)) {
				arrCourses[i].style.opacity = '1';
			}
			if (arrCourses[i].innerHTML.match(lab)) {
				arrCourses[i].style.opacity = '1';
			}
			if (arrCourses[i].innerHTML.match(proj)) {
				arrCourses[i].style.opacity = '1';
			}
			if (arrCourses[i].innerHTML.match(sem)) {
				arrCourses[i].style.opacity = '1';
			}
			if (arrCourses[i].innerHTML.match(poj)) {
				AddClassName(arrCourses[i], 'poj', true);
			}
		}
	}, false);
}

var nAgt = navigator.userAgent;
if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
	window.onload = setTimeout("fill_html_code();", 1000); 
} else {
	window.addEventListener("load", fill_html_code, false); 
}
