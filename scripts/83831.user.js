// ==UserScript==
// @name           Find Coach
// @namespace      vman
// @include        http://www.virtualmanager.com/employees/search?age_max=*&age_min=*&commit=S%C3%B8g&country_id=&job_status=1&page=*&search=1&speciality=coach*
// @grant          none
// ==/UserScript==

var urlString = unescape(window.location);

var a = urlString.substr(urlString.indexOf("page="), 9);

a = a.substr(5,4).replace(/[^0-9.]/g, "");


var hit = 0;

for (i=0;i<document.images.length;i++)
{
	var str = document.images[i].src;
	if(str.substring(0,46) == "http://www.virtualmanager.com/assets/detaljer-") {
		document.images[i].style.display = 'none';
		x = document.images[i].getAttribute('onmouseover');
		y = document.getElementById('stats'+x.substring(11,18));
		z = x.substring(17);
		z = z.replace(');', '');
		z = z.replace(' ', '');
		z = z.split(',');
		y.style.display = 'block';
		y.style.top = "0px";
		y.style.right = "0px";
		y.style.width = "120px";
		y.style.cssFloat = "right";
    var total = 0;
    
    var numberone = parseInt(z[1]);
    var numbertwo = parseInt(z[2]);
    var numberthree = parseInt(z[3]);
    var numberfour = parseInt(z[4]);
    var numberfive = parseInt(z[5]);
    var numbersix = parseInt(z[6]);
    var numberseven = parseInt(z[7]);
    var numbereigth = parseInt(z[8]);
    
		if(numberone == 20) {
		  total += numberone;
      z[1] = '<span style="font-weight:bold;">'+z[1]+'</span>';
		}
    if(numbertwo == 20) {
		  total += numbertwo;
      z[2] = '<span style="font-weight:bold;">'+z[2]+'</span>';
		}
		if(numberthree == 20) {
      total += numberthree;
		  z[3] = '<span style="font-weight:bold;">'+z[3]+'</span>';
		}
    
    if(numberfour > 10 && numberfive > 10 && numbersix > 10 && numberseven > 10 && numbereigth > 10) {
      total += 10;
      z[9] = '<span style="font-weight:bold;">'+15+'</span>';
    }
    
    if(total == 70) {
      y.innerHTML = z[1]+'-'+z[2]+'-'+z[3]+'='+total;
      hit = 1;
    }
    total = 0;
	}
}

if(hit == 0) {
  a++;
  window.location.href = 'http://www.virtualmanager.com/employees/search?age_max=40&age_min=33&commit=S%C3%B8g&country_id=&job_status=1&page=' + a + '&search=1&speciality=coach&utf8=%E2%9C%93';
}

// MÅL - MARK - DISI - LEDELSE - MOTIV

// U, MÅL, MARK, DIS, PONT, LED, EGEN, MOTI
// 8, 19,  3,    13,  3,    3, , 11,   17