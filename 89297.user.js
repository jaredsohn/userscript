// ==UserScript==
// @name           CURegCAPTCHA
// @namespace      https://www.reg.chula.ac.th/
// @include        https://www.reg.chula.ac.th/servlet/com.dtm.chula.reg.servlet.AddDropToConfirmServlet
// ==/UserScript==

var image=unsafeWindow.document.getElementsByTagName('img');
for(j=3;j<image.length;j++){
	var img = image[j];
	img.onload=function(){captcha(this)};
	img.src=img.src+'#';
}

var data=new Array();

//Firefox
data["1iNQgGLkrLa2hocrFoaXBxaW4xHASx6YmgjQ5O+uChj4eDSdcneFUuj19DdfP6nmEUNHzLued8HLjnHDJoeLDMsBUC7SZh6YortJ"]="0";
data["qw2ZnbXFWYm4nr14iYmbvAiI5PISKUMkLYJRFN4AjPRJsuvRxk2UbFX94P7r2Xo503QF3sGxCBiSxk2kRgIvYNNM/svAGoCeSRhS"]="1";
data["CKhRbUoTh0ydhObsXFoSJdpAh1cLLQtXAucUoRqosGHBwcRHpGMApH+DqkHokXU5cO35b7Xd67xyMTLQR3pt0Y2DALc6T6hg2zmH"]="2";
data["hILAwk4HF4xyRwTTwQUljdNSGSIkUgBIKFpDq7FYKmCQRiEaKwestyRRTHCbhRhuVLsZdxRydecVd8xS47P2bfezzyu/EO4Tzero"]="3";
data["1Dl2qHiCguIofopCCiKJkEsQi6OrhkaaEOJRksLqLgpBFCCcFBCkkE20gov0Ns7CXXVodvuOP4uP/du0feakPg8f6YhKWJcHTKYG"]="4";
data["xeSlIwBIcuTSs6FToYkuJiaEZjivHQpbSDKKTEnSQoShZjUwwlsUEkRmQwwicZLCkc4s9g67izTzTDvwjed7/e+98jt9YKEo2666"]="5";
data["5+URDFRTGjUKGIoghOioh2cXBSolBpHKRdapdCh05NIdhwOJRgmkLTSijPQXvk8iUObzlyv3v37uVPPspjcKpdi0KX0zAUgZMup9"]="6";
data["t0UbrJLS516CBUHFTo6uRuFqXdzNK5oJMJBBtChxK4JmBSOcJzqDmTXP44vOXgfrx737uPLKY1LKY1LGd1MKMLz6KVYkYXy1kd8V"]="7";
data["QlsrYSiYyNrKyMXbly5ZxIoHy0d+LEvPDC5veWmbDEkTBJnidIctDkP0qSgzxPWJ7hSKAlQLmDygCRCGiEyrBblbsdiLYAaAIgYA"]="8";
data["ah2DYVnDI4FFw71GBH6VpcOzUuwUXI4NQEJJXiIMEkgk9DCKeD+PpevmiHs+Tj986999xHVnoBJ62NElxTgr+QM+WaEtZGCfx/hA"]="9";
data["Dk9qGFYCF41w5mT0OWTUAue9tJJjEBHv/zx6r6RRkzIQC77SwEgKH3R3ZTESS1plRXroS++37Avh/QuR1pzbkdz/Mqg6zrFm5Vqk"]="A";
data["AnKPcoridB1wIKg2hq/0PAkgBtCsEyyZifvy/zJyv9Naii2OJ99uYQcg6HI52PzEQ0tsH7DEmddi7pB0kSdgZb0jQj9nuRpounJB"]="B";
data["R9XLrAgKQHcHjsfghyEMjl5z1s5r01+2Zn5+ZWGtAbzqXM5wskIQnnUq7XG1EyNuZTBySpOlytst8M7A624fEYcbl8tntfkGX5l6"]="C";
data["4CTODs4XTeIQpldgipaNP7aOwgQn5Mn5NOsp6fP53fA1YtSqmcQqQ/rqoHJx/RRvz4TiFSAhi1u5sW7Yu0V3bdhnUNJsmlTxHHhx"]="D";
data["JnscJ7LDegJ1hyAzoaW/r32Swhyt+aEBOdZKp9+Xbe7Cr139I6Rik1anv+RUgYnjAm7bko7u4QpxsXhSDBy3AL8f0DWsc9D66DRC"]="E";
data["q5x9JxB4Ll3gFDY8MN5tlAiKCImGj0J5NpZl7+/IzIf8uYBBF5WM5lfBYSRTucy0ZVVef5kLYv0yIIGt4MT51Tlqf7YDQGXYFuQA"]="F";
data["gDhIpLOPewb0ETJG5A66QFLmD5bUEcEexEpORJI9mamaf5vAE+Ak1zotaGWhta23JRslI183xNACMToniPTMoySn62PF/PEzXNaQ"]="G";
data["TOq1KlSZ3CX0iT3kMRQEAgNtBFnHS6Yk+j3RVZ7ljrEBEuN1v7Q15AiHueH7U2WOseVmszBykgriEq+n5L1wltK9S1IDLd7DhaG5"]="H";
data["cSq3QPjRPs/BoJiWQRCsLUky9vXkbkU4OIUNcNP3ISQdPQwlGkwPsINAZNQFPQDDTnMBLCx1Ho+xs6aVuZk65TVqfQzTnoAJqz02"]="I";
data["VtUhdBYLQNgpa1SYIW0RcUFC1KDAxjVgZCRAsNWuTGqEVh4JQ24sxo4/vQ9+579973fi3MZxLRnN2999wf/3PO/V+hwYjjGIDNzc"]="J";
data["CAcAmqcA+24whIiC1T0zoNQtTp4keBiQyKF2/LNNbI1vOfP1963zKmQBL+7MvaBklIIs8n+D4dYm1Dnk96yGbzEwfEIPP5ZzpgCH"]="K";
data["vPwWgoOQGNh5hn8wkRVPxQYdxkss3mZWbW7LfHuRIzI+w/ZCkEZU/HCyEFaAc6gBK6bk/TGG17XB+nrk8BnMfDxnEGpwkoA+Wg22"]="L";
data["gAuAecggY770AwsTW0Fiq1saKCb+EuGRBBWjeZYnZm3+78/AX+dlHG9XqjKfh+UKsp5bAd0YBE0b5q1IeGQ/TtAID1ejMMYm5tNH"]="M";
data["kHgEtYLXfhElhSU9BgCyWh22cBSxDkR+yYZLPFZL99M8B2SwiHAAiAWfbit15zL0M8z/8f6adZjXTTrEa6aSYRqvPgN8u6tIh+NI"]="N";
data["TiEvI9zC1ozAw3oDUcw9ZLEUnBshWgTP7Mjmakr79/dyXpT6CuD4R4+fJu94mkUfj9xyjL7aRACH+eh7XVgNy2VySpba/ci3veNN"]="O";
data["R8BA4Al+gU7hE2LkElJF+CiqULYrf9Z0lSUkqg0KV80pMly/7Jfk/ksaNqEZGTMiZjOp1xF9LUVVCDFMWIqlq0ZUzWQpvNRz/UIP"]="P";
data["QTpg/TBYmR6IDUUAORtd8lu7712ou57BjpJc+z8+b9WPoIlOUJH39+bEyOpF64/DiybD8o4MN9T6Mojh1yXd+RpLq+E4o73jDm8w"]="Q";
data["QSTuk96ubYvdQxs2u7ic5O/Z+DSWghpaU6+eDRkJQveY8f+F8pFRNA0FG0YZqe+RXEuRfkIO5WZ60TLhZLfzYIYr8t2Rc4j4NonX"]="R";
data["Bcwqnc4/UcBkcGJlZwcnVuf5fWtIAKm/7JSxro+/r3b0v082rbDswKzAplecXs5u12ByIKKknWaNtuGmwM4IO+AqxtEBGkLF4Ndj"]="S";
data["k9TMck7GC6tLToXhorIZGABJJIyZNOlqzT0923Rf4X72tEZLFi3wclIXR4X1/LmAwRwZjs7j6EblryiLUlIkI81/G0BE0nG16QFA"]="T";
data["BewgnvUQ6CZ2BgwZ0j9HOQoiUgjaP6J02T9s+X7z2R702aHhAR+tv77w+ZgGC2+BQXIAmYFZiArttQ10LTBGBivCFzxQc8ALPjY4"]="U";
data["BhCSrYAzp2QFCyQ2gQEmXaexTYQCLHIDp40smx78vZ9yP9L2naQxJZNiXkd+c4XZg8n0dF/hKnC7PfH5CEJNz3R74QSGK5XFWEbu"]="V";
data["ABTMUlyD3IDaiRSOVLkNYCUSGafSm8Y3bXmxyAkVayZjzvZ2bg4UKANptPxcnZ7E1Wa5pVUlssPgTIubrPh497IgP/r7bdfvX5wK"]="W";
data["DKXXqJIjlAXetIqnHzELTNEnYpIRh4ZrOZncmfmb/S/1KWJyQhiSzb48e6O5Lo3sVxLh0e13WDJHUnkujir/ETejW+ir7wKH5Snh"]="X";
data["HYhNHRB2Y0gSE9IJERBTD3TRaQ4YTTMdGX7Nzu3t9/e8D/4nkbAqDEt+sAgDS9EAABUOtk0ChnAqD0vSYI9tZprQupT5Pn15GbZx"]="Y";
data["BLWOE9lo5L4Clols6GivaPhQuSwC5iYqGTTPfz/vzJB/5XWmcE4HUcH/l9iDEVtc4GjqJtB0mSsx8ylc7C5smYikqtCYBKrWlMNQ"]="Z"; 

//Chrome
data["GHwWCgNxFFhOpN8KI4vNiDJ/FQPQhedhM8dJeiQhmKOBTPFh2I1Lnt4qVjqzssmm6zIfRPUg+1WdOkMH0h8JHv/57//X+SN/SjEK"]="0"; 
data["zEp5BwxEdwkBCfQSS+AI4SJyckjWjiInEhRJPl0NVkx9Zha+3qVP35JZvNvjPzvO/M/t7J3J/aTVoSagzplsmKAiaF2iOoV9B+NR"]="1"; 
data["mgmEFBgoOCWlRUlIKUOjk4SDtYaRUUilLo4NBOcVDEgtWKoFZEBGkcVGgqthAQbIcWWwOH2IaQuyQOZ85cLrH+1/e+33vf9348z0"]="2"; 
data["DQQxAEHYRQvAihFEJ0iA7BhqEQRh8H62AFdRDqVhEYEZ4qAovYU0abaBFZ6foR4rqLrTM77szudhh3dFx94D3M+z7P733f//ufx7"]="3"; 
data["0KkjSKoMxDLHUIwi6dow51yS5dsw5Ll47VJUPyEBgSdqkEgzUpqQwDCQ1zNRfHdd1tbcbZDtOOO7tj9MGD4fve95vv/+e955of9e"]="4"; 
data["hCaypYoFBQ0h/oNSKKkN58if49hoKPEUTUgw+FVIJPQVSEQoqJikpgxSSnZht3Yd5uu3dbD9dd71h24MDvd889n3u+93d+x7E86s"]="5"; 
data["BJsAodCiKt0HZzERyc3Oyki6CICMKhiIM4dFBB1EEKTg4uLehkFDIKwWpCNXKKJCl37+4czlzy7hLqHx7cu/fue7/3vu9eqrGVCQ"]="7"; 
data["hEMHARERQqirbK6AOiNlKbWvWxKBMqKNqZbpKiIhe1aFGiMYQpapOCSZSSjqZj0xgzDvPezLQYffLGsQMXLvfc+7vnnHvuX/C61T"]="6"; 
data["Mocx9wREGq3CPoCC0VDzCfoCN97gNor3J0jmSgue5GsrTS2rOzO2vgLyDlmYnE6lkkIRI8TffFS5tIbLksO2xXouM8P3KeH1mpgX"]="A"; 
data["gCC1vWwMKMtaxjDcxYCstW6LGE1WyBMrNYj3VAsWM3m97z03un03d/fvKd+IIP9ktkBGaMYPjXUgKEDarbnv20CxA7BclRLEZA1S"]="8"; 
data["QhqSAUgZTUg1bWiw++9BIsQoMeEoKCaL0pvknUk4U+FBEIIalgSW5DywTDwKRIvUzYGrt3Ww/XXe/dZgcOXL7vnN/5993j2JhxZt"]="9"; 
data["pLlROYe6zL3IAG0sEZiCsKOiSqeRR4BY6XYCktXxppNZp583d2pYc6y/uc0egFSUjC+5zt9odkMdbnEp9I0nXzddT528J2YBMOhy"]="C"; 
data["b2Q1gSW79g+Q+UBv+BXbrtLWFtTKDZkFjNtWE1wIJY60le897NnZv3Bv7Zxmw3kmSgLMt2hHEc0+kEO3oA5Bv6rkc5FwmorfVsP/"]="D"; 
data["5TUDkX4ASbe4RNE+UQ6y6UuE22Qkgp0s+nAEfsbgyRaPOlX3g0fvozNnBRV1m3UJZz1nXda9RawzmH4VD37kAEjKY809qCAE5aKc"]="B"; 
data["bGQJmCIZgglMyQgi4bUCVlFNFS+GgS8TERAaWCJ7mx5Xv3A357jFkSQO2Joj2f/6g2FnfqHqZTjTAMnXutdXMQz/OwXq+kCZN25N"]="F"; 
data["hHK/gCj+AF0FM4PKKOH+CqCIJgyQ2CltIclyJQTLLmdm92ZvcO+G+E4YwAnJHnK/B+0bjhSgSBQhRF1rmUElon35H4vo/FYi6+Uf"]="E"; 
data["NwAKfKJex7OE5FQ52CdZRj7LpIlVSpCH40XhPHH6CDJ400u/PRfN4AfwVizKh1QWstACAMQwSBHPVvIUlS+r4kgJYoFdIYy28TRN"]="G"; 
data["p7BPMmhw/hW0jA3mpfIcVBIGCZSEKCWOxncRLi/wtoc9PMsrP85ttvBpobIeQC9JZr19xfNG8YpKXUl7mZ7V/GGPloYIzxewico/"]="H"; 
data["fyEJ4gdvEK3iJVwE6QeIHsWERREUKCadSBhYVd3g7Dwl9JgNJ0p6Yl38elX4PIosbQ2iiAOVV1lHdjYHirCTDC+UM7iPN7V7fnl4"]="I"; 
data["JyCBOu4BGk8hSEhpLOBmgsjCeYbwHGGEQ2xkZ+s9vsm8nMAuNOGG4JgO1pFecXhceGUD3rAfaGGpA6JXVOqsu6njHPwaJYfI8/Vp"]="L"; 
data["yovBdAikRrU3CEdPgAOQU5QgpSUlNsQ1pWSDRIKTwpQlbZBbxLy0iWLX/r/fF84HJlTEoABMDV6ovHavu9JHUK6L1v3DwCmaLq5m"]="N"; 
data["HU6kZX3bg3yU6odOvCtSuL4EZahVYKbgTFiGuh4DIVFMymIIjgQvFPlThJJpM3M+/vffeeLhJnV5Kz++79OPecj3s+dEZUVSVJms"]="J"; 
data["OCHsBZOEInuEfAC3dAJFtmJKaEqWJiyNT4dYC4IUoCHdu32M+2fv78+QH/V67rEQCvo1aW5QRAAByPJ7x6rcE9cJblnM1m2i8WC1"]="K"; 
data["IdkkfoKD6C+AAWOhc6udi46OQTGHH1DUwsBRHqIIJFT4d6Q4IJdvaHy/25h/uf/xx+uFpI9CwWvqhCt/sSq9m2I9GPepqi53mJPA"]="M"; 
data["yKrC4+AL5H+wyuJYHBN2CwTCTOLiaFxQfAqfR38LYB2gJuxi856c05J+eec/5b+CuYfcE4Hqk4Dwb3e3MrDIdPAipm/YcJgn5tgc"]="O"; 
data["zicziX0CFyArlzmhxBxuBLSCqEMTgu0ln7U8iSLcQ6CkmTfBiWYYbHzJ8F/resjQigFyKas9kzfwRpYhCogYzHhkkyb0NEt6Asyz"]="P"; 
data["JIS8MB1vdwzkDrSEnBDVLgtBSpKNep6AMUlh9F1tbGvynzSStZs08zO/PGwKUgui7jeMniez5/7tTW0DokgNqx8X6CYNaYoDj2vp"]="Q"; 
data["rZR+gDRB+ik73PYeviUIpLhyLkbpkdSiG5o85OuV8HTcyVNArd/OBwuBzuj/PnA65Xo9EjAVSG7weczV75L0geVaBmFcz3A4RhWL"]="R"; 
data["8hBxCXSCXuIY6R8Rh3FK7cApVduhYvDTASPwZ3yZvZGYG0n3afJOCvyJmaKIqSWZYBAIIgwG63nVw7mrzZbAnACt8PWBQlF0HGAC"]="S"; 
data["NwCksO4Amww0tAxx2wszKhJfMsIIiJokQa/ZLNZvbnzdvZAf6XJDkSwNvRnuuwp0hu9YOyPDPLsi6O4xh5nsHzBFEUdesiAsdZP9"]="T"; 
data["1xCdJDwwoIoYAFsIMHVMRY2Zng2wItLoDWUMyh4CeMgr6gjZxkMsmdyXfPnMyF81Wt9iBAmz33mfuL5ucGkb/+EtQJTm6Qv5B8pM"]="U"; 
data["QATTjCfWCT0AODlNGDSBhmCJW+j4C780lzyHbKJrr3o31/Kz0uer0+kpjNMlJx58flBTzHRpZlkqSiKJJFvN/nJbHf50hCEu79p1"]="V"; 
data["EEp+QFKn0AO/kS9j1sXezmLBgXX8JkDIKTuOR0iCfNjT6Bdzr3fP7/5wPu7gkgs9mX1JVBEIraJpNPx2aMFUCiKBYAP4piAJIkcT"]="W"; 
data["6BAs6Cw5NQyQFw1JFU4+Zjts0SdilB8sxmM38mf2Zn4X85nwsBApTna/kxdxcgp4uTZctGfLuVAnCnALn4Z/yE2o3voi7cip+03e"]="X"; 
data["BYgioswATQwRBQZoeQiioDoHsUufygBEIQDXyNY5/97rMD/C/D4YgAqGPrOgBgt9sTAAEwCDYPG3VOANR9z5nNTG23zELrrzmdzh"]="Y"; 
data["T0HFswXKLtJTDFYapq3yDYlv4/CQYmWbHZ9+aXBf4XWnsE0HocZ8/y3vgb4pP8xbZtaO1VhlzXRRgGAACl1HCVfMT12q5E6UQUPW"]="Z"; 

function getBase64Image(img) {
	// Create an empty canvas element     
	var canvas = document.createElement("canvas");     
	canvas.width = img.width;     
	canvas.height = img.height;      
	// Copy the image contents to the canvas     
	var ctx = canvas.getContext("2d");     
	ctx.drawImage(img, 0, 0);      
	// Get the data-URL formatted image     
	// Firefox supports PNG and JPEG. You could check img.src to guess the     
	// original format, but be aware the using "image/jpg" will re-encode the image.     
	var dataURL = canvas.toDataURL("image/png");      
	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

var i =0;
var j =0;
var count =0;

function captcha(img){ //Added in V2
	count++;
	document.getElementsByName("code")[0].value=count;
	if(count>=4){
		var code = new String();
		var i;
		for(i=0;i<4;i++){
			var img=image[i+3];
			code = code+data[getBase64Image(img).substring(90,190)];
		}
		document.getElementsByName("code")[0].value=code;
	}
}

