// ==UserScript==
// @name         Farmville Auto Accept Neighbours
// @description	  If you have a lot of friends, then accepting them as neighbours will take a lot of time. This script will do that for you.
// @namespace     http://halfaclick.blogspot.com/
// @include      http://apps.facebook.com/onthefarm/neighbors.php*

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
	Arr = document.getElementsByTagName("div");
	for (i =0; i<Arr.length; i++) {
		if (Arr[i].className == "bttn_addasaneighbor") {
			ips = Arr[i].getElementsByTagName("input");
			str = "";
			for (j = 0; j<ips.length; j++) {
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
			//alert(Arr[i].getElementsByTagName("input")[0].value);
			
	}
})();