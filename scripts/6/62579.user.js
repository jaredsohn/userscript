// ==UserScript==
// @name           SI - TOP5000
// @namespace     SpaceInvasion
// @description   classement SpaceInvasion jusqu'au Top5000
// @version      0.1
// @date          2009-22-11
// @include        *.spaceinvasion.*/indexInternal.es?action=internalToplist*
// @include        http://spaceinvasion.*/indexInternal.es?action=internalToplist*
// ==/UserScript==

function Toplist() {
	opt1500 = document.createElement("option");
	opt1500.setAttribute("class", "planet");
	opt1500.setAttribute("value", "1500");
	document.getElementsByName("place")[0].appendChild(opt1500);
	opt1500.innerHTML = "1501-1600";

	opt1600 = document.createElement("option");
	opt1600.setAttribute("class", "planet");
	opt1600.setAttribute("value", "1600");
	document.getElementsByName("place")[0].appendChild(opt1600);
	opt1600.innerHTML = "1601-1700";

	opt1700 = document.createElement("option");
	opt1700.setAttribute("class", "planet");
	opt1700.setAttribute("value", "1700");
	document.getElementsByName("place")[0].appendChild(opt1700);
	opt1700.innerHTML = "1701-1800";

	opt1800 = document.createElement("option");
	opt1800.setAttribute("class", "planet");
	opt1800.setAttribute("value", "1800");
	document.getElementsByName("place")[0].appendChild(opt1800);
	opt1800.innerHTML = "1801-1900";

	opt1900 = document.createElement("option");
	opt1900.setAttribute("class", "planet");
	opt1900.setAttribute("value", "1900");
	document.getElementsByName("place")[0].appendChild(opt1900);
	opt1900.innerHTML = "1901-2000";

	opt2000 = document.createElement("option");
	opt2000.setAttribute("class", "planet");
	opt2000.setAttribute("value", "2000");
	document.getElementsByName("place")[0].appendChild(opt2000);
	opt2000.innerHTML = "2001-2100";

	opt2100 = document.createElement("option");
	opt2100.setAttribute("class", "planet");
	opt2100.setAttribute("value", "2100");
	document.getElementsByName("place")[0].appendChild(opt2100);
	opt2100.innerHTML = "2101-2200";

	opt2200 = document.createElement("option");
	opt2200.setAttribute("class", "planet");
	opt2200.setAttribute("value", "2200");
	document.getElementsByName("place")[0].appendChild(opt2200);
	opt2200.innerHTML = "2201-2300";

	opt2300 = document.createElement("option");
	opt2300.setAttribute("class", "planet");
	opt2300.setAttribute("value", "2300");
	document.getElementsByName("place")[0].appendChild(opt2300);
	opt2300.innerHTML = "2301-2400";

	opt2400 = document.createElement("option");
	opt2400.setAttribute("class", "planet");
	opt2400.setAttribute("value", "2400");
	document.getElementsByName("place")[0].appendChild(opt2400);
	opt2400.innerHTML = "2401-2500";

	opt2500 = document.createElement("option");
	opt2500.setAttribute("class", "planet");
	opt2500.setAttribute("value", "2500");
	document.getElementsByName("place")[0].appendChild(opt2500);
	opt2500.innerHTML = "2501-2600";

	opt2600 = document.createElement("option");
	opt2600.setAttribute("class", "planet");
	opt2600.setAttribute("value", "2600");
	document.getElementsByName("place")[0].appendChild(opt2600);
	opt2600.innerHTML = "2601-2700";

	opt2700 = document.createElement("option");
	opt2700.setAttribute("class", "planet");
	opt2700.setAttribute("value", "2700");
	document.getElementsByName("place")[0].appendChild(opt2700);
	opt2700.innerHTML = "2701-2800";

	opt2800 = document.createElement("option");
	opt2800.setAttribute("class", "planet");
	opt2800.setAttribute("value", "2800");
	document.getElementsByName("place")[0].appendChild(opt2800);
	opt2800.innerHTML = "2801-2900";

	opt2900 = document.createElement("option");
	opt2900.setAttribute("class", "planet");
	opt2900.setAttribute("value", "2900");
	document.getElementsByName("place")[0].appendChild(opt2900);
	opt2900.innerHTML = "2901-3000";

	opt3000 = document.createElement("option");
	opt3000.setAttribute("class", "planet");
	opt3000.setAttribute("value", "3000");
	document.getElementsByName("place")[0].appendChild(opt3000);
	opt3000.innerHTML = "3001-3100";

	opt3100 = document.createElement("option");
	opt3100.setAttribute("class", "planet");
	opt3100.setAttribute("value", "3100");
	document.getElementsByName("place")[0].appendChild(opt3100);
	opt3100.innerHTML = "3101-3200";

	opt3200 = document.createElement("option");
	opt3200.setAttribute("class", "planet");
	opt3200.setAttribute("value", "3200");
	document.getElementsByName("place")[0].appendChild(opt3200);
	opt3200.innerHTML = "3201-3300";

	opt3300 = document.createElement("option");
	opt3300.setAttribute("class", "planet");
	opt3300.setAttribute("value", "3300");
	document.getElementsByName("place")[0].appendChild(opt3300);
	opt3300.innerHTML = "3301-3400";

	opt3400 = document.createElement("option");
	opt3400.setAttribute("class", "planet");
	opt3400.setAttribute("value", "3400");
	document.getElementsByName("place")[0].appendChild(opt3400);
	opt3400.innerHTML = "3401-3500";

	opt3500 = document.createElement("option");
	opt3500.setAttribute("class", "planet");
	opt3500.setAttribute("value", "3500");
	document.getElementsByName("place")[0].appendChild(opt3500);
	opt3500.innerHTML = "3501-3600";

	opt3600 = document.createElement("option");
	opt3600.setAttribute("class", "planet");
	opt3600.setAttribute("value", "3600");
	document.getElementsByName("place")[0].appendChild(opt3600);
	opt3600.innerHTML = "3601-3700";

	opt3700 = document.createElement("option");
	opt3700.setAttribute("class", "planet");
	opt3700.setAttribute("value", "3700");
	document.getElementsByName("place")[0].appendChild(opt3700);
	opt3700.innerHTML = "3701-3800";

	opt3800 = document.createElement("option");
	opt3800.setAttribute("class", "planet");
	opt3800.setAttribute("value", "3800");
	document.getElementsByName("place")[0].appendChild(opt3800);
	opt3800.innerHTML = "3801-3900";

	opt3900 = document.createElement("option");
	opt3900.setAttribute("class", "planet");
	opt3900.setAttribute("value", "3900");
	document.getElementsByName("place")[0].appendChild(opt3900);
	opt3900.innerHTML = "3901-4000";

	opt4000 = document.createElement("option");
	opt4000.setAttribute("class", "planet");
	opt4000.setAttribute("value", "4000");
	document.getElementsByName("place")[0].appendChild(opt4000);
	opt4000.innerHTML = "4001-4100";

	opt4100 = document.createElement("option");
	opt4100.setAttribute("class", "planet");
	opt4100.setAttribute("value", "4100");
	document.getElementsByName("place")[0].appendChild(opt4100);
	opt4100.innerHTML = "4101-4200";

	opt4200 = document.createElement("option");
	opt4200.setAttribute("class", "planet");
	opt4200.setAttribute("value", "4200");
	document.getElementsByName("place")[0].appendChild(opt4200);
	opt4200.innerHTML = "4201-4300";

	opt4300 = document.createElement("option");
	opt4300.setAttribute("class", "planet");
	opt4300.setAttribute("value", "4300");
	document.getElementsByName("place")[0].appendChild(opt4300);
	opt4300.innerHTML = "4301-4400";

	opt4400 = document.createElement("option");
	opt4400.setAttribute("class", "planet");
	opt4400.setAttribute("value", "3400");
	document.getElementsByName("place")[0].appendChild(opt4400);
	opt4400.innerHTML = "4401-4500";

	opt4500 = document.createElement("option");
	opt4500.setAttribute("class", "planet");
	opt4500.setAttribute("value", "4500");
	document.getElementsByName("place")[0].appendChild(opt4500);
	opt4500.innerHTML = "4501-4600";

	opt4600 = document.createElement("option");
	opt4600.setAttribute("class", "planet");
	opt4600.setAttribute("value", "4600");
	document.getElementsByName("place")[0].appendChild(opt4600);
	opt4600.innerHTML = "4601-4700";

	opt4700 = document.createElement("option");
	opt4700.setAttribute("class", "planet");
	opt4700.setAttribute("value", "4700");
	document.getElementsByName("place")[0].appendChild(opt4700);
	opt4700.innerHTML = "4701-4800";

	opt4800 = document.createElement("option");
	opt4800.setAttribute("class", "planet");
	opt4800.setAttribute("value", "4800");
	document.getElementsByName("place")[0].appendChild(opt4800);
	opt4800.innerHTML = "4801-4900";

	opt4900 = document.createElement("option");
	opt4900.setAttribute("class", "planet");
	opt4900.setAttribute("value", "4900");
	document.getElementsByName("place")[0].appendChild(opt4900);
	opt4900.innerHTML = "4901-5000";
      }
Toplist()
