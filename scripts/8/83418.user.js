// ==UserScript==
// @name          Stick Zapak Smilies
// @namespace     uid=???????
// @author	  Abhishek Singh
// @description   Set of zapak dot com's smilies.
// @include       htt*://*.orkut.*/*
// @exclude       http://*.orkut.*/Main#*
// @exclude       http://*.orkut.gmodules.*
// ==/UserScript==

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var Soul = new Array();

Soul["a"]="http://images.orkut.com/orkut/photos/OQAAACTS2tjGWify8dNH3ht_Rz7Q8Om7RjuTrHHsVUYMIkYU_Dh_7cKJ6w7Y9YZimre7sDk6PKYen-RI97WKJdfsZ60Am1T1UAzy9p6bQX9Dc72wKeJIBRcspG4m.jpg";

Soul["b"]="http://images.orkut.com/orkut/photos/OQAAAPscF6D_v7TXN3OiBwP62WEOXXCmDF0Eoz6Igan-H5rn_XA2LFGA3rw1Ae2SL0AQY3_nE-wPARRvllVmhVuTy6wAm1T1UHy4ENebBrwcN5nj2SOgWR_vUL8Y.jpg";

Soul["c"]="http://images.orkut.com/orkut/photos/OQAAAM05SbfDMpnKiYoQEt9wLgQcR0L1jIf-lMXIFYruqsbkmrE7pel0dpOXD5gOH-YUT4sSRorsT40M74MXXPh6A5YAm1T1ULVN7uznZzU9E4FRLFCbJzjFCflq.jpg";

Soul["d"]="http://images.orkut.com/orkut/photos/OQAAADJu59gOx5Yk3wL05zXS5_SCc-kEqP2uzge1kbTccUcPUKSmc_9CvvglfTFQXlwJY19Y5Q1ceMOMnEvrn8czopoAm1T1UAu3LHZDtLGznEg1u_7LccN297so.jpg";

Soul["e"]="http://images.orkut.com/orkut/photos/OQAAAGUEc4DIcV9qMoHi1CLhquV56IibPx2cvCw2liUA4IDbG9BtR3BqrRq5562K7GWMBQiR619_1FyWJuTm2Q7k-p4Am1T1UFMH5r6EEdxy_B5543Y_SHkoZn70.jpg";

Soul["f"]="http://images.orkut.com/orkut/photos/OQAAAG1Olhn0HhsZfPFemVoLUCSp3XZ0NOUvJhE7jMgatPUVnQOebkMc8J1vW3amjlj8ebfGHBuUtHSPrqUcPd_Dlr0Am1T1UPLQkRNgBCq2UcjlKp3ECoCgseDf.jpg";

Soul["g"]="http://images.orkut.com/orkut/photos/OQAAAG6txe0mNbIjhG5Yl3o1ovoc1F9EH9X5nOm5PRZtAF4Vyds3BFz8uQjTkfxPcvJHS6BvKFWn3v1Gw_kvShsWh08Am1T1UI8cAE_6uYzHGNxuBgwku_7HZd4W.jpg";

Soul["h"]="http://images.orkut.com/orkut/photos/OQAAAC9g9ikCrYn4-pqBq06pUzohdMUlHORMtFE98eb5FXfInTeYm-4DBTnpcmAm7OZgIk9JZCclkc7Xc2IiAm2wzhYAm1T1ULTVzbYMd5Y-gF8TeoIHOOPWzVZ_.jpg";

Soul["i"]="http://images.orkut.com/orkut/photos/OQAAACmUTs8m30eZRFA4evkV-8bXQdwuP3A9JP5ce5GJTSiFnagazU8dZ-D_f_Q7MlGP0d_QHL1W2-mvEC8nf9boKGkAm1T1UBh6qwTAO0bgVZfqQ8rDUCBtTezf.jpg";

Soul["j"]="http://images.orkut.com/orkut/photos/OQAAAHupZumB8G-st5WWlwRWx7osqeR3mcVdBzX5nPn5e7Dq-iKQ1ZyOMeHjY9gWPzvvpOVe2TSRMfioQ_jkVvHhKl0Am1T1UJa6HmCVb6fR9HP1sB7iMiDYIykF.jpg";


	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in Soul){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);

			mm.innerHTML="<img src='"+Soul[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);

// Abh1sh3k