// ==UserScript==
// @namespace http://riddle.pl/-/greasemonkey/orangesms.user.js
// @name Orange SMS - Phone Book
// @author Riddle
// @description Adds phone book to Orange.pl SMS gate
// @version 1.0
// @include http://sms.orange.pl/*
// @exclude http://sms.orange.pl/sendsms.aspx
// ==/UserScript==

var numbers = new Array;
var delim = ";";
	
/* odczytanie danych */	
var isBookVisible = GM_getValue("orangeBookVisible", false);
var isAddFormVisible = GM_getValue("orangeAddFormVisible", false);
var myNumberList = GM_getValue("orangeBookList", "");

/* sortowanie alfabetyczne listy wg opisu */
if (myNumberList != "") {
	numbers = myNumberList.split(";");
	var index = new Array;
	var j = 0;
	for (var i = 0; i < numbers.length - 1; i = i + 2) {
		index[j] = numbers[i] + delim + numbers[i + 1];
		j++;
	}
	index.sort();
	for (var i = 0; i < index.length; i++) {
		numbers[i * 2] = index[i].split(delim)[0];
		numbers[i * 2 + 1] = index[i].split(delim)[1];
	}
}

var sidebar = document.getElementById("LeftMenu");

	/* dodanie HTML-a ksiazki do siedbara */
	var bookMenu = document.createElement("div");
	if (isBookVisible) {
		bookMenu.setAttribute("class", "LeftMenuItem Selected");
	} else {
		bookMenu.setAttribute("class", "LeftMenuItem");
	}

	/* obrazek strzalki */
	var bookMenuImg = document.createElement("img");
	bookMenuImg .setAttribute("src", "http://sms.orange.pl/img/Arrow3.gif");

	/* link tekstowy */
	var bookMenuLink = document.createElement("a");
	bookMenuLink.setAttribute("href", "#");
	bookMenuLink.appendChild(document.createTextNode("ksi\u0105\u017cka telefoniczna"));
	bookMenuLink.addEventListener("click", toggleBook, false);

	bookMenu.appendChild(bookMenuImg);
	bookMenu.appendChild(bookMenuLink);		
	sidebar.appendChild(bookMenu);
	
	/* usuniecie przerwy przed dopiero co dodana pozycja */
	var bookMenuSpace = bookMenu.previousSibling.previousSibling;
	bookMenuSpace.parentNode.removeChild(bookMenuSpace);
	
	/* lista */	
	var bookContainer = document.createElement("div");
	bookContainer.setAttribute("id", "bookContainer");
	if (isBookVisible) {
		bookContainer.setAttribute("style", "display: block");
	} else {
		bookContainer.setAttribute("style", "display: none");
	}
	
	var bookList = document.createElement("div");
	bookList.setAttribute("id", "bookList");
	
	if (numbers.length > 0) {
		for (var i = 0; i < numbers.length - 1; i = i + 2) {
			addNumber(numbers[i], numbers[i + 1]);
		}
	}
	
	bookContainer.appendChild(bookList);
	
	/* przelacznik widocznosci formularza dodania numeru do ksiazki */
	var bookAddToggle = document.createElement("div");
	if (isAddFormVisible) {
		bookAddToggle.setAttribute("class", "LeftMenuItem Selected");
	} else {
		bookAddToggle.setAttribute("class", "LeftMenuItem");
	}
		
	var bookAddToggleImg = document.createElement("img");
	bookAddToggleImg .setAttribute("src", "http://sms.orange.pl/img/Arrow3.gif");

	var bookAddToggleLink = document.createElement("a");
	bookAddToggleLink.setAttribute("href", "#");
	bookAddToggleLink.appendChild(document.createTextNode("dodaj numer"));
	bookAddToggleLink.addEventListener("click", toggleAddNum, false);
	
	bookAddToggle.appendChild(bookAddToggleImg);
	bookAddToggle.appendChild(bookAddToggleLink);
	
	var bookAddNumber = document.createElement("div");
	bookAddNumber.setAttribute("class", "LeftMenuItem");
	
	/* formularz dodania numeru do ksiazki */
	var bookForm = document.createElement("form");
	bookForm.setAttribute("action","");
	bookForm.setAttribute("id","bookForm");
	if (isAddFormVisible) {
		bookForm.setAttribute("style", "display: block");
	} else {
		bookForm.setAttribute("style", "display: none");
	}	
	bookForm.addEventListener("submit", bookAddSubmit, false);
	var bookFieldset = document.createElement("fieldset");
	var bookLabelNum = document.createElement("label");
	bookLabelNum.setAttribute("id","bookNewNum");
	bookLabelNum.appendChild(document.createTextNode("Numer:"));
	var bookInputNum = document.createElement("input");
	bookInputNum.setAttribute("type","text");
	bookInputNum.setAttribute("class","Text");
	bookInputNum.setAttribute("maxlength","9");
	bookInputNum.setAttribute("tabindex","1");
	bookLabelNum.appendChild(bookInputNum);
	bookFieldset.appendChild(bookLabelNum);
	var bookLabelDesc = document.createElement("label");
	bookLabelDesc.setAttribute("id","bookNewDesc");
	bookLabelDesc.appendChild(document.createTextNode("Opis:"));
	var bookInputDesc = document.createElement("input");
	bookInputDesc.setAttribute("type","text");
	bookInputDesc.setAttribute("class","Text");
	bookInputDesc.setAttribute("tabindex","1");
	bookLabelDesc.appendChild(bookInputDesc);
	bookFieldset.appendChild(bookLabelDesc);	
	var bookButton = document.createElement("input");
	bookButton.setAttribute("type","image");
	bookButton.setAttribute("alt","dodaj");
	bookButton.setAttribute("tabindex","1");
	bookButton.setAttribute("style","margin: 5px 0 0 65px");
	bookButton.setAttribute("src", "data:image/gif;base64,R0lGODlhQQAaAPeFAPDw7vz8%2BhEREExMTNTU1P9mAP%2F%2B%2F%2FX18%2Ff39fj49vv7%2BfPz8dPU1fr6%2BCEhIPT08nNzcurs6%2F1pAoSEg5SUk%2F9kAP%2F9%2FkJCQfDv8P5lBDExMezs7Orq6Onr6FBMSdPT07W1s%2F%2F8%2FO%2Fu78TEwuzt6fppAPr%2B%2F%2F1mCevx8WNjYv9nA%2FlmAP9jAMjIxvxnAKOjofv%2F%2B%2Fz%2F%2F9bS0v9kBv77%2F%2FLy8u3r7NLT1ePj4v3%2F%2Fvf%2F%2F%2Fj6%2BeTk4%2FZpAezu8aWlo9bU0PHt9Pb29vn5%2FPn9%2BvZmAdfW1P9kA%2Ff4%2BdTS1PlnCNrS0PxkAfn7%2Bvv9%2FP%2F%2B%2BdLS0aenpfT09P1lAu3r6fX1%2Bf36%2Bvz%2B%2Fe7s7fr6%2Bufn5f9pCNbW1M7OzPfw99fX1vPs5kBAP%2Fj3%2FPv19djZ2Ovp7P399fr4%2BfDx89PUz9XV01BQT%2Fv5%2BuPj4VBOUfLz9ampp%2Brq6vz8%2FPP09vXx7vLy8Oro69XW0e3r8NTW1fz%2B%2B%2F%2F%2F%2B0xLSerp5%2B7u7P%2F%2F%2Ff7%2F%2F%2F39%2B%2F7%2B%2FAAAAP%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIUALAAAAABBABoAAAj%2FAAsBAXKnYJoPBBIqXJiwoMOHECNKnBhRhgwPhZbg%2BKOnIyBAhEKKHBmyo8mTKFOqXJnSAg4jHpaE%2BLOn5h8LJHMSqsmzp8%2BfQIP%2BJGQgyQAZgEx8BBTIgE6SS6NKnUq1atU%2FgD4MYEAI0J%2BvgAwYABRjDyEYgXTA%2BGNAx9e3cOPKnUtXbkgCW7sK2pvDAAwYBizEeGLACo09Zv7sXcy4sePHkB3fzZtjcQ4LFipMcVFgRgYXEmYUMBC5tGnTk7leCcT6ioUMFSQoUaGkQAUmEgpMYc27t%2B%2FfwIP%2FdoqXqxPeTkJIyC2BxYoesTMUKCBcgADhvK0HhzAIzm9CeG8Q%2FyISoDwRKyVUZBBDY0uFLEUySC9Pv771%2Bvjp38%2FPv7wC8AOI14QCBDbBxnQl0GDBGCU8YQELRRRA4IQtODDIBdYp0IIGgwwyAYEVXpihAhN0KAAFCnAXxYQEZgGgeDs0IOMOZ6hwwhYSxGBCCCboMN0JMgbpgAN9UDCIAH0IcEEDJU7QwJBFHtlAC4OA8KQADagY5IwAMmAAEgmEOQQCM6xQAGdDjBfCET24EGaYXAySQpjWlUgBnQ6AICedAoT5BQQXdKgFdz%2B8GSYShGjlpRAINIoEAumVUIUgMYRgAA2xHdFoo10MAkGjGgjA3QigCvCDp6UioOcFFHA46CA%2FbP%2B6aaJbGXDArQdUIURzRxRgggUdmVBAbrgeoIact9Y5CAXJ5onsAdYdkEKVBzggwAHcvVDsrbR6ucAD4M4hRQYszJBbBWaaeQIT4LY7JA9GCsCDkg%2FY%2BcC78dbroZ4CPJBtu%2BBK0aUBNSxg8Bs19DBdESdkoMJ0Ephp8MQjWIihAAu8wKGHBlcsIsZtcOhAoCNkO%2FHEA9dQx8poYEDHjxVMFzMLSnix8s0456zzzjqPmnMNA2MAwNAYYIACCUYHIYIIKESwABhBDC311FRXbTXVYQyyRtUYDCyCH2D7gMHXPgRBAth4YEACCiiA7fbbcMct99xxiwBgEoBsgMfeJPimgIUNgNuAxQaEF7734YgnrvjijCtOhRx5DGCEICT0YbkfcUSg%2Beaca27556CHLvropItOBSBQ8CFDDkPY4XofZXAg%2B%2Bwd1G6767jnrvvuvPe%2BuxCA3DAAEDiAFBJYUomlvFNPNe%2F88yLhQAYfhRhBQB7Yf5AHQwQw4P332Icv%2Fvjkl28%2B%2BUlAMQBGHvDhPh9u8DHA%2FPTXP%2F%2F7%2BOev%2F%2F788%2B8BRoUICAA7");
	bookFieldset.appendChild(bookButton);
	bookForm.appendChild(bookFieldset);
	bookAddNumber.appendChild(bookForm);
	
	bookContainer.appendChild(bookAddToggle);
	bookContainer.appendChild(bookForm);	
	sidebar.appendChild(bookContainer);
	
	/* CSS dla wygenerowanych elementow */
	var newCSS, newRules = "" +
	".LeftMenuItem a {" +
		"outline: none;" +
	"}" +
	"span.bookItemNumber {" +
		"float: right;" +
		"padding-right: 5px;" +
	"}" +
	"span.bookItemDesc {" +
		"display: block;" +
		"padding-left: 5px;" +
	"}" +
	".fakeLink {" +
		"cursor: pointer;" +
		"position: relative;" +
	"}" +
	"#bookForm {" +
		"text-align: left;" +
		"background-color: #eaeaea;" +
		"padding: 0 0 7px 3px" +
	"}" +
	"#bookNewDesc input, #bookNewNum input {" +
		"display: block;" +
		"width: 130px;" +
	"}" +
	"#bookForm label {" +
		"display: block;" +
		"margin-top: 5px;" +
	"}" +
	"#bookForm fieldset {" +
		"padding: 0;" +
		"border: 0;" +
	"}" +
	"#LeftMenu div.fakeLink:hover {" +
		"background-color: #f60 !important;" +
		"color: #fff !important;" +
	"}" +
	".fakeLink div.bookItemDelete {" +
		"background: url(data:image/gif;base64,R0lGODlhEwAXAIAAAJaWlv%2F%2F%2FyH5BAAAAAAALAAAAAATABcAAAIgjI%2Bpy%2B0Po5y0JnAwBDxw%2FXyd9E0i6JTlllnuC8fyHBUAOw%3D%3D) 0 1px no-repeat;" +
		"position: absolute;" +
		"left: -19px;" +
		"top: 0;" +
		"width: 19px;" +
		"height: 24px;" +
		"cursor: pointer;" +
		"display: none;" +
	"}" +
	"div.bookItemDelete:hover {" +
		"background-image: url(data:image/gif;base64,R0lGODlhEwAXANUAAPhjAN1YAPNhAOxeAPFgAOhdAPJhAONbAOteANBTANFUANpXAPpkAOJaAORbANhWANNUAOldAOpeAN5ZAP5mAPtkAPRiAOBaANdWAPViAO9gAP9zFfdjANtYAOZcAP%2F9%2FP%2Bzgf%2Bwe%2BdcANVVAP%2F7%2Bf96If%2B1hP99J%2F%2Byfu1fANZWAN9ZAPlkAP1lAP%2F%2F%2F%2F9mAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAATABcAAAaUQFKo9Coaj5QKx4A4oI5QY4uR0XgCm2i0xbIMGhjtlmWQXCBiaAtgiEwU6eOaUAgk4lIA3Y4vzut3UC5Ggy9%2FAXBHLosvi4OHiYqOhX8TaFGOeW0rI5iTfmRmKoKMmVwCCA0PmISgAgMHC32GLK8OHbOnAw6yfboHq761qWHCr8BZeFMWKbwgvlQaIgEfJidxSUtNQQA7);" +
	"}";
	
	newCSS = document.createElement("link");
	newCSS.setAttribute("rel", "stylesheet");
	newCSS.setAttribute("href", "data:text/css," + escape(newRules));
	document.getElementsByTagName("head")[0].appendChild(newCSS);
	
function addNumber(d, n) {
	var bookItem = document.createElement("div");
	bookItem.setAttribute("class", "LeftMenuItem fakeLink");
	bookItem.setAttribute("title", "Kliknij, aby wybra\u0107 numer");
	var num = n;
	bookItem.setAttribute("id", "t" + num);
	bookItem.addEventListener("click", useNumber, false);
	bookItem.addEventListener("mouseover", showDelButton, false);
	bookItem.addEventListener("mouseout", hideDelButton, false);
	
	var bookItemDesc = document.createElement("span");
	bookItemDesc.setAttribute("class", "bookItemDesc");
	bookItemDesc.appendChild(document.createTextNode(d));
	
	var bookItemNumber = document.createElement("span");
	bookItemNumber.setAttribute("class", "bookItemNumber");
	num = num.substring(0, 3) + " " + num.substring(3, 6) + " " + num.substring(6, 9);
	bookItemNumber.appendChild(document.createTextNode(num));
	
	var bookItemDelete = document.createElement("div");
	bookItemDelete.setAttribute("class", "bookItemDelete");
	bookItemDelete.setAttribute("title", "Usu\u0144 numer");
	bookItemDelete.appendChild(document.createTextNode(" "));
	bookItemDelete.addEventListener("click", remNumber, false);
	
	bookItem.appendChild(bookItemNumber);
	bookItem.appendChild(bookItemDesc);
	bookItem.appendChild(bookItemDelete);
	bookList.appendChild(bookItem);
}

function remNumber(e) {
	if(confirm("Czy na pewno usun\u0105\u0107?")) {
		var item = e.currentTarget.parentNode;
		item.parentNode.removeChild(item);
		saveList();
	}
	e.preventDefault();
}

function saveList() {
	var items = document.getElementById("bookList").getElementsByTagName("div");
	var serialized = "";
	for (var i = 0; i < items.length; i++) {
		if (items[i].className == "LeftMenuItem fakeLink") {
			serialized = serialized + items[i].childNodes[1].firstChild.nodeValue + delim + items[i].id.split("t")[1];
			if (i != items.length - 2) { serialized = serialized + delim; }
		}
	}
	GM_setValue("orangeBookList", serialized);
}
	
/* przelaczanie stanu ksiazki telefonicznej */

function toggleBook(e) {
	var book = document.getElementById("bookContainer");
	if (book) {
		var state;
		if (book.style.display == "block") {
			state = "none";
			e.currentTarget.parentNode.setAttribute("class", "LeftMenuItem");
			GM_setValue("orangeBookVisible", false);
		} else {
			state = "block";
			e.currentTarget.parentNode.setAttribute("class", "LeftMenuItem Selected");
			GM_setValue("orangeBookVisible", true);
		}
		book.style.display = state;
	}
	e.preventDefault();
}

function toggleAddNum(e) {
	var form = document.getElementById("bookForm");
	if (form) {
		var state;
		if (form.style.display == "block") {
			state = "none";
			e.currentTarget.parentNode.setAttribute("class", "LeftMenuItem");
			GM_setValue("orangeAddFormVisible", false);
		} else {
			state = "block";
			e.currentTarget.parentNode.setAttribute("class", "LeftMenuItem Selected");
			GM_setValue("orangeAddFormVisible", true);
		}
		form.style.display = state;
	}
	e.preventDefault();
}

function bookAddSubmit(e) {
	var desc = document.getElementById("bookNewDesc").childNodes[1];
	var num = document.getElementById("bookNewNum").childNodes[1];
	var addThis = function() {
		addNumber(desc.value, num.value);
		saveList();	
		desc.value = num.value = "";
		desc.focus();
	}
	var orangePrefix = /^5[019][0-9]{7}/;
	if (!(desc.value == "") && (desc.value.indexOf(delim) == -1)) {
		if (!num.value.match(orangePrefix)) {
			if (confirm("Ten numer najprawdopobniej nie nale\u017cy do sieci Orange. Czy mimo to chcesz go doda\u0107?")) {
				addThis();
			}
		} else {
			addThis();
		}
	} else {
		alert("Wyst\u0105pi\u0142 b\u0142\u0105d. Wpisz opis odbiorcy oraz nie u\u017cywaj w nim znaku \"" + delim + "\" .");
	}
	e.preventDefault();
}

/* wkleja numer z ksiazki adresowej */

function useNumber(e) {
	var recipent = document.getElementById("Recipient");
	if (recipent) {
		var num = e.currentTarget.id.split("t")[1];
		num = num.replace(/\s/g,"");
		recipent.value = num;
	}
}

/* z jakiegos powodu .fakeLink:hover div.bookItemDelete { display: block } nie działa */

function showDelButton(e) {
	var button = e.currentTarget.childNodes[2];
	button.style.display = "block";
	e.preventDefault();
}

function hideDelButton(e) {
	var button = e.currentTarget.childNodes[2];
	button.style.display = "none";
	e.preventDefault();
}