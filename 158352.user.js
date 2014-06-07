// ==UserScript==
// @name          AİBU Bilgi Yönetim Sistemi Yaması
// @namespace     sevenkul
// @description	  Some modifications to bys.ibu.edu.tr
// @include       http://bys.ibu.edu.tr/*
// @version       1.0.1
// @author        cihan çobanoğlu
// @grant         none
// ==/UserScript==

if (window.top != window.self) return;

function loc(URLfraction) {
	if (window.location.href.indexOf(URLfraction) > -1) return true; else return false;
}

//Dashboard
if (loc("dashboard.aspx")) {
	
	//Add link to spans.
	$('.filetree').find("span").each(function(i){
		if ($(this).attr("menuurl") != null) {
			$(this).html("<a href='" + $(this).attr("menuurl") + "' style='font-size: 11px; color: black;'>" + $(this).html() + "</a>");
		}
	});
	
	//Wait for click event.
	function removeClick() {
		$('.filetree').find("span").each(function(i){
			if ($(this).attr("menuurl") != null) {
				$(this).unbind("click");
			}
		});
	}

	var initInterval = setInterval(function() { removeClick(); }, 1000);
	var initInterval = setInterval(function() { removeClick(); }, 3000);
}

//Available lessons for entering grades
if (loc("ogr0200/default.aspx")) {

	//Add style to focused anchor to track lessons on the list. 
	var sheet = document.createElement('style')
	sheet.innerHTML = "a:focus { color: red !important; text-decoration: underline;}";
	document.body.appendChild(sheet);

	//Add the option for opening in new tab.
	var str = "<div style='position: absolute; width: 500px;'><span style='top: -20px; float: right; position: relative;'>";
	str += "<input id='openNewTab' type='checkbox' checked=true> Yeni sekmede aç"
	str += "</span></div>";
	
	var div = document.createElement('div');
	div.innerHTML = str;
	document.getElementById("yilDonem1").appendChild(div);
	
	//Checkbox is added, now add event to this checkbox.
	var openNewTab = document.getElementById("openNewTab");
	openNewTab.addEventListener("click", function() {
		if (openNewTab.checked) {
			document.getElementsByTagName("form")[0].setAttribute("target", "_blank");
		}
		else {
			document.getElementsByTagName("form")[0].setAttribute("target", "");
		}
	});
	
	//If checkbox is checked by default, update new tab behaviour.
	if (openNewTab.checked) {
		document.getElementsByTagName("form")[0].setAttribute("target", "_blank");
	}

}


//Grade entrance page
if (loc("ogr0200/NotGirisiNihai.aspx") || loc("NotGirilebilir.htm") || loc("NotGirisiNihai.aspx")) {
	
	//Function for creating fields and buttons.
	function createExtension() {

		var _body = document.getElementsByTagName('body')[0];
		var _div = document.createElement('div');
		_div.setAttribute('id', 'autoGradeContainer');
		_div.setAttribute('align', 'center');
		var str = "";
			str = "<div id='autoGradeContainer' align='left' style='width:720px'><pre>";
			str += "<span id='enableButton' style='float:right;'>O</span>"; //User shouldn't trust undoing certain save, make it hard to click.
			str += "<span id='activateButton'>Paneli aç.</span>";
			str += "</pre></div>"
		_div.innerHTML = str;
		_body.appendChild(_div);
	
		var autoGradeContainer = document.getElementById("autoGradeContainer");
			
		var str = "";
		str += "<div id='topluNotGirisiPanel' align='left' style='width: 720px; display:none;'>";
		str += "<textarea id='topluNotGirisi' rows='10' cols='100' ";
		str += "style='margin-left:auto; margin-right:auto; display: block;'></textarea><br>"
		str += "<pre>"
		str += "Aşağıdaki bilgilerin yapıştırdığınız verinin kaçıncı sütununda olduğunu yazın.<br><br>";
		str += "Öğrenci No:	<input type='text' id='no' value='2'>	";
		str += "<span id='ornekNo' style='display:none'>Ör:</span><br>";
		str += "Adı:		<input type='text' id='ad' value='3'>	";
		str += "<span id='ornekAd' style='display:none'>Ör:</span><br>";
		str += "Soyadı:		<input type='text' id='soyad' value='4'>	";
		str += "<span id='ornekSoyad' style='display:none'>Ör:</span><br>";
		str += "Harf Notu:	<input type='text' id='harf' value='9'>	";
		str += "<span id='ornekHarf' style='display:none'>Ör:</span><br><br>";
		str += "Önce sütun numaralarının doğruluğunu test edin, sonra Notları Gir düğmesine basın.<br><br>";
		str += "<input id= 'testEt' type='button' value='Test Et' />";
		str += "<input id='notlariGir' type='button' value='Notları Gir' /><br><br>";
		str += "<div id='islemSonucu'></div><br><br>";
		str += "</pre>"
		str += "</div>";
			
		autoGradeContainer.innerHTML += str;
		
		//Add event to activate button (open panel).
		var activateButton = document.getElementById("activateButton");
		activateButton.addEventListener("click", function() {
			
			//Show panel.
			document.getElementById("topluNotGirisiPanel").style.display = "block";
			document.getElementById("activateButton").style.display = "none";
			document.getElementById("enableButton").style.display = "none";
			
			//Add event to testEt button.
			var testEtButton = document.getElementById("testEt");
			testEtButton.addEventListener("click", function() {
				testEtButtonEvent();
			}, false);
		
			//Add event to notlariGir button.
			var notlariGir = document.getElementById("notlariGir");
			notlariGir.addEventListener("click", function() {
				notlariGirButtonEvent();
			}, false);
			
		}, false);
		
		//Add event to enable button. (to enable buttons and dropdowns which are greyed out after pressing save button).
		var enableButton = document.getElementById("enableButton");
		enableButton.addEventListener("click", function() {
			
			//Our table to enter grades.
			var gradeTable = document.getElementById("grdOgrenciler_ctl00");
			
			//Column numbers of our grade table.
			var columnNumbersOfTable = {
				'no': 1,
				'adsoyad': 2,
				'harf': gradeTable.rows[0].cells.length - 1 //The rightmost column.
			};
			
			//For each row in our grade table...
			for (var i = 1; i < gradeTable.rows.length; i++) {
				var combo = $find(gradeTable.rows[i].cells[columnNumbersOfTable.harf].getElementsByTagName("div")[0].id);
				combo.enable(); //console.log(combo._element.id + " enabled? " + combo._enabled);
			}
		
			//Also enable save buttons.
			document.getElementById('btnKaydet').disabled = false;
			document.getElementById('btnKesinKaydet').disabled = false;
	
		});
	
	}
	
	//Make a quick test whether columns for the raw text data are specified correctly.
	function testEtButtonEvent() {
	
		var data = document.getElementById("topluNotGirisi").value;		
		var temp = data.split("\n"); //temp is necessary to count lines.
		//gradeArray[i] will give the ith row of gradeArray;
		//gradeArray[i][j] will give the jth column of ith row of gradeArray.
		var gradeArray = [];
		for(var i = 0; i < temp.length; i++) {
			gradeArray[i] = temp[i].split("\t");  //Assign a column array to ith row of gradeArray.
		}
				
		//Column numbers of array (ie. data).
		var columnNumbersOfArray = {
			'no': document.getElementById('no').value - 1,
			'ad': document.getElementById('ad').value - 1,
			'soyad': document.getElementById('soyad').value - 1,
			'harf': document.getElementById('harf').value - 1
		};
			
		document.getElementById('ornekNo').innerHTML = "Ör:" + gradeArray[0][columnNumbersOfArray.no];
		document.getElementById('ornekAd').innerHTML = "Ör:" + gradeArray[0][columnNumbersOfArray.ad];
		document.getElementById('ornekSoyad').innerHTML = "Ör:" + gradeArray[0][columnNumbersOfArray.soyad];
		document.getElementById('ornekHarf').innerHTML = "Ör:" + gradeArray[0][columnNumbersOfArray.harf];
			
		//Check validity.
		if (temp.length < 2) { alert("Bir veri yapıştırmadınız veya yapıştırdığınız veri hatalı."); return; }

		//Show test results.
		var ornekListesi = document.getElementById('topluNotGirisiPanel').getElementsByTagName('span');
		for (var i = 0; i < ornekListesi.length; i++) {
			ornekListesi[i].style.display = "inline"; //Disable display:none property.
		}
		
	}
	
	//Fill the table according to raw text data.
	function notlariGirButtonEvent() {
	
		var data = document.getElementById("topluNotGirisi").value;
		var temp = data.split("\n"); //temp is necessary to count lines.
		//gradeArray[i] will give the ith row of gradeArray;
		//gradeArray[i][j] will give the jth column of ith row of gradeArray.
		var gradeArray = [];
		for(var i = 0; i < temp.length; i++) {
			gradeArray[i] = temp[i].split("\t");  //Assign an array to ith row of gradeArray.
		}
		
		//Our table to enter grades.
		var gradeTable = document.getElementById("grdOgrenciler_ctl00");
		
		//Column numbers of our grade table.
		var columnNumbersOfTable = {
			'no': 1,
			'adsoyad': 2,
			'harf': gradeTable.rows[0].cells.length - 1 //The rightmost column.
		};
				
		//Column numbers of grade array.
		var columnNumbersOfArray = {
			'no': document.getElementById('no').value - 1,
			'ad': document.getElementById('ad').value - 1,
			'soyad': document.getElementById('soyad').value - 1,
			'harf': document.getElementById('harf').value - 1
		};
		
		//Check validity.
		if (temp.length < 2) { alert("Bir veri yapıştırmadınız veya yapıştırdığınız veri hatalı."); return; }
		
		//Clear previous operation results.
		document.getElementById("islemSonucu").innerHTML = "";
		
		//For each row in our grade array... (k: current row of grade array)
		for (var k = 0; k < gradeArray.length; k++) {
			var ogrenciBulundu = false;
			
			//...try for each row in our grade table. (i: current row of grade table)
			for (var i = 1; i < gradeTable.rows.length; i++) {
			
				//If current student number is found in our grade table.
				if (gradeArray[k][columnNumbersOfArray.no] == gradeTable.rows[i].cells[columnNumbersOfTable.no].innerHTML) {
					
					//Check also if the names match.
					if (gradeArray[k][columnNumbersOfArray.ad] + " " + gradeArray[k][columnNumbersOfArray.soyad] == gradeTable.rows[i].cells[columnNumbersOfTable.adsoyad].innerHTML) {
								
						//Ok. This is the student. Enter grade into table.
								
						//The first div of current cell is a RadComboBox item (which has an id like grdOgrenciler_ctl00_ctl04_cmbHarfNot).
						var combo = $find(gradeTable.rows[i].cells[columnNumbersOfTable.harf].getElementsByTagName("div")[0].id);
						var item = combo.findItemByText(gradeArray[k][columnNumbersOfArray.harf]);
						item.select();
						
						//Check chkButGirildi if it exist.
						var chkButGirildi = gradeTable.rows[i].cells[columnNumbersOfTable.harf - 1].getElementsByTagName("input")[0];
						if (chkButGirildi != null) {
							if (chkButGirildi.id.indexOf("chkButGirildi") > -1) {
								chkButGirildi.checked = true;
							}
						}
						
						ogrenciBulundu = true;
								
						//Rest is unimportant once we make use of RadComboBox.
						//gradeTable.rows[i].cells[columnNumbersOfTable.harf].getElementsByTagName("input")[0].value = gradeArray[k][columnNumbersOfArray.harf];
						//obj = JSON.parse(gradeTable.rows[i].cells[columnNumbersOfTable.harf].getElementsByTagName("input")[1].value);
						//obj.value = "AA"; obj.text = gradeArray[k][columnNumbersOfArray.harf]; //{"logEntries":[],"value":"-1","text":"AA","enabled":true}
						//gradeTable.rows[i].cells[columnNumbersOfTable.harf].getElementsByTagName("input")[1].value = JSON.stringify(obj);
					}
					
				}
			}
					
			if (ogrenciBulundu == false) {
				var ogrenci = gradeArray[k][columnNumbersOfArray.no] + " " + gradeArray[k][columnNumbersOfArray.ad] + " " + gradeArray[k][columnNumbersOfArray.soyad];
				document.getElementById("islemSonucu").innerHTML +=  ogrenci + " sayfada bulunamadı.<br>";
			}
				
		}
		
	}
	
	//Add necessary items and their events on this page.
	createExtension();

}


//Kayıt yenileme işlemleri sayfası
if (loc("Ogr0208/OgrenciSec.aspx")) {
	
	//Add style to focused anchor to track students on the list. 
	var sheet = document.createElement('style')
	sheet.innerHTML = "a:focus { color: red !important; text-decoration: underline;}";
	document.body.appendChild(sheet);
	
	//Add the option for opening in new tab.
	var str = "<div style='position: absolute; width: 600px;'><span style='top: -20px; float: right; position: relative;'>";
	str += "<input id='openNewTab' type='checkbox'> Yeni sekmede aç"
	str += "</span></div>";
	
	var div = document.createElement('div');
	div.innerHTML = str;
	document.getElementById("cmbOrganizasyonBirim").appendChild(div);
	
	var openNewTab = document.getElementById("openNewTab");
	openNewTab.addEventListener("click", function() {
		if (openNewTab.checked) {
			document.getElementsByTagName("form")[0].setAttribute("target", "_blank");
		}
		else {
			document.getElementsByTagName("form")[0].setAttribute("target", "");
		}
	});
	
	//If checkbox is checked by default, update new tab behaviour.
	if (openNewTab.checked) {
		document.getElementsByTagName("form")[0].setAttribute("target", "_blank");
	}
	
	//yazdır düğmesine gelince üzerinden gidince olayları ekle. ona göre target iframe olsun.
	//<form action="somepage.php" method="get" target="myframe">
	//<input type="submit">
	//</form>
	//<iframe name="myframe" src="frame.htm" width="300" height="200"></iframe>
	
}


//Ders seçme işlemleri sayfası (DERS SEÇME SAYFASI)
if (loc("Ogr0208/AcilanDersler.aspx")) {
	
	//Add style to remove background of modal pop-ups to enable ducument.
	var sheet = document.createElement('style')
	sheet.innerHTML = "#btnSecilenleriEkleMessage_divBg { display: none; } #btnSecilenleriEkleMessage_divMsgBox { position: static !important; }"; 
	document.body.appendChild(sheet);
	
	//Add the option for disabling postback after selecting a course.
	var str = "<div style='position: absolute;'><span style='top: -20px; float: right; position: relative;'>";
	str += "<input id='disablePostback' type='checkbox' checked='true'> Postback önle"
	str += "</span></div>";
	
	var div = document.createElement('div');
	div.innerHTML = str;
	document.getElementById("ucHeader_tblTop").appendChild(div);
	
	//Update events of select elements of group selection for lecture.
	function updateSelectEvents() {
		var disablePostback = document.getElementById("disablePostback");
		if (disablePostback.checked) {
			for (var i = 0; i < document.getElementsByTagName('select').length; i++) {
				var item = document.getElementsByTagName('select')[i]; 
				item.setAttribute("title", item.getAttribute("onchange"));
				item.setAttribute("onchange", "");
			}
		}
		else {
			for (var i = 0; i < document.getElementsByTagName('select').length; i++) {
				var item = document.getElementsByTagName('select')[i]; 
				item.setAttribute("onchange", item.getAttribute("title"));
				item.setAttribute("title", "");
			}
		}
	}
	
	//Update events of expander button of foregin language and elective course groups.
	function updateInputEvents() {
		for (var i = 0; i < document.getElementsByTagName("input").length; i++) {
			if (document.getElementsByTagName("input")[i].value == "+") {
				document.getElementsByTagName("input")[i].addEventListener("click", function() {
					document.getElementsByClassName("secilenTable")[0].setAttribute("title", "old");
					var checkAjaxInterval = setInterval(function() { checkAjax(); }, 1000);
					
					function checkAjax() {
						if (document.getElementsByClassName("secilenTable")[0].getAttribute("title") != "old") {
							clearInterval(checkAjaxInterval);
							updateSelectEvents();
							updateInputEvents();
						}
					}
					
				});
			}
		}
	}
	
	//First run.
	updateSelectEvents();
	updateInputEvents();
	
	//Add event to the checkbox.
	var disablePostback = document.getElementById("disablePostback");
	disablePostback.addEventListener("click", function() {
		updateSelectEvents();
	});
	
}

//Seçilen derslere bakma ve onaylama sayfası (PROGRAMI ONAYLAMA SAYFASI)
if (loc("Ogr0208/SecilenDersler.aspx")) {
	
	//Enable all buttons (Özellikle "Sil" düğmesi) by the way sil buttons will not alert :)
	for (var i = 0; i < document.getElementsByTagName("input").length; i++) {
		document.getElementsByTagName("input")[i].disabled = false;
	}
	
	//Show wrong courses.
	function checkWrongCourses() {
		var mytable = document.getElementsByClassName("secilenTable")[0];
		for (var i = 1; i < mytable.rows.length - 1; i++) { //We will not take first and last element.
			var courseCode = mytable.rows[i].cells[1].innerHTML.replace(/^\s+|\s+$/g, "");
			//Birinci sınıf ikinci grup ikinci dönem dersleri:
			var avaliableCourses = new Array( 
				"302001041998.2",
				"302001062011.2",
				"302001081998.2",
				"302001102009.2",
				"302001141998.2",
				"302001181998.2",
				"302001282009.2",
				"302001302003.2");
			if (avaliableCourses.indexOf(courseCode) == -1) {
				mytable.rows[i].cells[1].style.color = "red";
				mytable.rows[i].cells[2].style.color = "red";
			}		
		}
	}
	
	//checkWrongCourses();
	
}



