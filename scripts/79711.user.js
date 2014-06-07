// ==UserScript==
// @name          	Testing
// @namespace     	BustaF
// @description   Test task
// @include       *test*
// ==/UserScript==

var i,j;
var size=0;
var divPanel;
var transportImage;									// иконка "Mozilla Firefox", для перемещения панели управления
var phoneDiv;
var selMsisdnObject;



function viewHiddenFields() { 							// отображение скрытых полей
     	var inputList = document.getElementsByTagName('input');

	var divElem = document.createElement('div');
	divElem.innerHTML = '<DIV> Скрытые поля формы<BR><BR>';
	for (i=0; i<inputList.length; i++) 
  		if (inputList[i].type == 'hidden') {  
			divElem.innerHTML= divElem.innerHTML+
				inputList[i].name+'<INPUT type="text" id="hiddenID" "value="'+ 
				inputList[i].value+'" name="'+
				inputList[i].name+'" style=" position: absolute; left: 100px;"><BR><BR>';	
		}	

	divElem.innerHTML=divElem.innerHTML+
		'<BR><INPUT type="button" value="Сохранить изменения" id="saveButtonID" '+
		'<HR></div>';
	document.body.insertBefore(divElem, document.body.firstChild);	
};

function saveHiddenFields() { 							// сохранение изменений в скрытые поля
     	var inputList = document.getElementsByTagName('input');

	for (i=0; i<inputList.length; i++) 
  		if (inputList[i].type == 'hidden')   
			for (j=0; j<inputList.length; j++) 
				if ((inputList[j].type=='text') && (inputList[i].name==inputList[j].name)) 
					inputList[i].value=inputList[j].value;	
	alert('Изменения внесены');
};

function kolInput() { 									// отмена ограничения по максимальному количеству символов в полях      	
	var inputList = document.getElementsByTagName('input');
	for (i=0; i<inputList.length; i++) {
  		if (inputList[i].type == 'text') { 
			var mlengthAttribute = document.createAttribute('maxlength');
			mlengthAttribute.nodeValue = '255';
			inputList[i].setAttributeNode(mlengthAttribute);
		}
	}
};

function sizePage() {   								// объем исходного кода 
	var pageCode=document.getElementsByTagName('html')[0].innerHTML;
	size=(pageCode.length/1024).toFixed(0); 
};

function commentButton() {   								// комментарии к кнопкам с id
	var inputList = document.getElementsByTagName('input');

	for (i=0; i<inputList.length; i++) { 	
		if (inputList[i].type == 'button' || inputList[i].type == 'submit' || inputList[i].type == 'reset') { 
			var titleAttribute = document.createAttribute('title');
			titleAttribute.nodeValue =inputList[i].id; 
			inputList[i].setAttributeNode(titleAttribute); 
		}
	}
};

function movePanel(event) { 								// перемещение панели
	function moveMouse(event) {  						// подсчет координат и ожидание завершения перемещения
		if(!event) event = window.event;
        		var x = event.pageX || event.x;
        		var y = event.pageY || event.y;

		divPanel.style.left = x-214+'px';
        		divPanel.style.top = y-20+'px';        		

            		function clickMouse(event) { 						// завершение перемещения панели
           			document.removeEventListener('mousemove', moveMouse ,true);
            		} 
       	 
		document.addEventListener('click',clickMouse ,false);
    	}  	  
  	document.addEventListener('mousemove', moveMouse ,true);
};

function checkedCheckBox() {								// галочки во всех checkBox
	var inputList = document.getElementsByTagName('input');
	for (i=0; i<inputList.length; i++) {
  		if (inputList[i].type == 'checkbox') { 		
			inputList[i].checked='true';
		}
	} 
};

function alertInput() { 								// alert со значениями всех input'тов
     	var inputList = document.getElementsByTagName('input');
	var textMessage="Значения полей:\n\n";

	for (i=0; i<inputList.length; i++) 
		switch (inputList[i].type) {
			case 'text': 
				if (inputList[i].id != 'hiddenID')
					textMessage=textMessage+"Name: "+inputList[i].name+", value: "+inputList[i].value+"\n";
				break
 			case 'hidden': 
				textMessage=textMessage+"Name: "+inputList[i].name+", value: "+inputList[i].value+" - hidden\n";	
				break
			case 'checkbox': 
				if (inputList[i].checked == true)
					textMessage=textMessage+"Name: "+inputList[i].name+", value: "+inputList[i].value+"\n";	
				break
			case 'radio':
				if (inputList[i].checked == true) 
					textMessage=textMessage+"Name: "+inputList[i].name+", value: "+inputList[i].value+"\n";
				break				
		}			

	var comboList = document.getElementsByTagName('select');
	for (i=0; i<comboList.length; i++) 
		if (comboList[i].id != 'phoneComboID')
			textMessage=textMessage+"Name: "+comboList[i].name+", value: "+comboList[i].value+"\n";
						

	var areaList = document.getElementsByTagName('textarea');
	for (i=0; i<areaList.length; i++) 
  		textMessage=textMessage+"Name: "+areaList[i].name+", value: "+areaList[i].value+"\n";
			

	alert(textMessage);
};


sizePage();
commentButton();


divPanel = document.createElement('div');
divPanel.innerHTML = 	
		'<div id="panelID" style="width: 200px; height: 145px; background-color: #000000; position: absolute;  left: 80%;">'+
			'<font color=#F8F8FF >Mozilla FireFox &nbsp &nbsp &nbsp '+size+'Kb </font>'+	
			'<div id="idInnerPanel" style="width: 190px; height: 120px; background-color: #E6E6FA; position: absolute;  left: 5px;"> '+
				'<BR><CENTER><INPUT type="button" id="viewButtonID"   value="Отобразить поля"            style="width: 160px;"                         		            title="Отображение скрытых полей формы">'+
				'<BR>	            <INPUT type="button" id="kolButtonID"     value="Снять ограничения"         style="position: absolute; top: 48px; left: 15px; width: 160px;"  title="Cнятие ограничения по максимальному количеству символов в полях ввода">'+
				'<BR>                  <INPUT type="button" id="checkButtonID" value="Заполнить CheckBox\'ы" style="position: absolute; top:76px; left: 15px; width: 160px; "  title="Выставить галочки во всех CheckBox\'ах страницы">'+
    			'</div>'+
			'<IMG id="transportImageID" height="47" width="47" style="position: absolute; left: 165px; top: 0px;" src=http://foxfun.ucoz.ru/firefox.png>'+
		'</div>';

document.body.insertBefore(divPanel, document.body.firstChild);				// отображение панели управления


divPanel = document.getElementById('panelID');
transportImage = document.getElementById('transportImageID');				


phoneDiv = document.createElement('div');
phoneDiv.innerHTML =  
	'<div id="phoneDivID" style="width: 150px; height: 20px; position: absolute;"> '+
		'<SELECT id="phoneComboID">'+
			'<OPTION SELECTED> Выберите телефон'+
			'<OPTION>+37529 9966811'+
			'<OPTION>+37529 1598242'+
			'<OPTION>+37544 7357587'+
		'</SELECT>'+
    	'</div>';
document.body.insertBefore(phoneDiv, document.body.firstChild);				// добавление списка телефонов на страницу
phoneDiv.style.display = 'none';							// скрытие списка телефонов	


function clickMouse(event) {  								// определение объекта по которому произошел Click и выполнение соответствующих десйствий
	var objectClick = event.target || event.srcElement;      
	if  (objectClick.id=='transportImageID') {						// клик по иконке "Mozilla Firefox"
           		movePanel(event); 
	}
	
	if  ((objectClick.name!='msisdn') && (objectClick.id!='phoneComboID') && (phoneDiv.style.display != 'none')) { 			
		phoneDiv.style.display = 'none';
	}	

	if  (objectClick.name=='msisdn') { 						// клик по полю с именем msisdn 	
		selMsisdnObject=objectClick;

		if(!event) event = window.event;
        		var x = event.pageX || event.x;
        		var y = event.pageY || event.y;   
		
		phonePanel = document.getElementById('phoneDivID');
		phonePanel.style.top = y+'px';					//
        		phonePanel.style.left = x+'px'; 					// координаты отображения списка телефонов

		phoneDiv.style.display = 'block';					// oтображение списка телефонов  		
	}

	if  (objectClick.id=='phoneComboID') {						// клик по ComboBox'у с номерами телефонов  
		function changeCombo() {  
			selMsisdnObject.value=objectClick.value; 
			phoneDiv.style.display = 'none';
			document.removeEventListener('change',changeCombo ,true);			
		}
		objectClick.addEventListener('change',changeCombo ,true);    		// слушатель события onchange у ComboBox'а     	
	}

	if  (objectClick.id=="kolButtonID") {						 
		kolInput();
	}
	
	if  (objectClick.id=="checkButtonID") { 
		checkedCheckBox();
	}
	
	if  (objectClick.type=="submit") { 
		alertInput();	
	}	
	
	if  (objectClick.id=="viewButtonID") { 
		viewHiddenFields();	
	}

	if  (objectClick.id=="saveButtonID") { 
		saveHiddenFields();	
	}
}

document.addEventListener('click',clickMouse ,true);						// слушатель события onclick на документе   



