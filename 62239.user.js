// ==UserScript==
// @name         Fish Wrangler Auto Add Neighbours/Crew
// @description	  If you have a lot of friends, then accepting them as neighbours will take a lot of time. This script will do that for you.
// @namespace     http://halfaclick.blogspot.com/
// @include      http://apps.facebook.com/fishwrangler/crew*
// @include      http://apps.facebook.com/fishwrangler/add-crew*

//Developed by Mayank Singhal
// ==/UserScript==

(function() {
	function Send() {
		if (!(document.getElementById("pop_content"))) {
			setTimeout(Send, 1000);
		}
		else {
		//alert("3");
			arr = document.getElementById("pop_content").getElementsByTagName("input");
			it = 0;
			for (i=0;i<arr.length;i++) {
				//alert(arr[i].value);
				if (arr[i].value="Send") {
					arr[i].click();
					it = 1;
				}
			}
			if (it!=1) {
				setTimeout(Send, 1000);
			}
		}
	}
	Arr = document.getElementsByTagName("table");
	var bo = 0;
	for (i =0; i<Arr.length; i++) {
		//alert("["+Arr[i].className+"]")
		if (Arr[i].className == "bb") {
			tds = Arr[i].getElementsByTagName("td");
			for (k = 0; k<tds.length; k++) {
				if (tds[k].className=="lh tar") {
						Message = tds[k].innerHTML;
						test = Message.search(/Request Sent/i);
						if (test == -1) {
							test = Message.search(/Not in your crew/i);
							if (test !=-1) {
								inps = tds[k].getElementsByTagName('input');
								for ( ik = 0; ik<inps.length; ik++) {
									if (inps[ik].className == "inputbutton request_form_submit") {
										if (bo == 0) {
											alert(inps[ik].value);
											inps[ik].click();
											setTimeout(Send, 5000);
											bo = 1;
										}
									}
								}
							}
						}
				}
			}
		
		}
		/*if (Arr[i].className == "inputbutton request_form_submit") {
			//ips = Arr[i].getElementsByTagName("input");
			str = "";
			if (bo == 0) {
				alert(Arr[i].value);
				Arr[i].click();
				setTimeout(Send, 5000);
				bo = 1;
			}*/
			/*for (j = 0; j<ips.length; j++) {
				str += ips[j].value.substr(0,3)+" | ";
				if (ips[j].value.substr(0,3)=="Add") {
					ips[j].click();
					setTimeout(Send, 5000);
					j = ips.length;
					i = Arr.length;
					//alert(j+" "+i);
				}
			}
		}
		*/
			//alert(Arr[i].getElementsByTagName("input")[0].value);
			
	}
})();