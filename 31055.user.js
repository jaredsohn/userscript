// ==UserScript==
// @name           UpUp.us Price Gun
// @namespace      http://kol.upup.us/scripts/
// @description    A Kingdom of Loathing script. This is the edited version of the original pricegun. I am in no way afilliated with the people who made this script. I just wanted an easy way to download the fixed version. And here we are.
// @include        http://*kingdomofloathing.com/charsheet.php*
// @include        http://*kingdomofloathing.com/account.php*
// @include        http://*kingdomofloathing.com/mallstore.php*
// @include        http://*kingdomofloathing.com/displaycollection.php*
// @include        http://*kingdomofloathing.com/clan_stash.php*


/* 
credits - 
Mall prices pulled from Fnord7's Mall bot data: http://www.brandybuck.com/kolbot/mallbot.html
Old Item database pulled from Max Demian's Item Database: http://max.subfighter.com/kol/texts/itemdb.txt
New item database pulled from KOLMafia's SVN: http://kolmafia.sourceforge.net/
Tab code from A List Apart's Sliding Doors of CSS: http://alistapart.com/articles/slidingdoors/
Leader line stuff from http://www.fu2k.org/alex/css/test/DotLeader.mhtml
Table sorting code from http://www.joostdevalk.nl/code/sortable-table/
*/

var currentVersion = 0.666;
var scriptName = "Price Gun";


//define variables
var updateGraphic = 'data:image/png;base64,' +
		'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';	
var loadingGraphic = "data:image/gif;base64,R0lGODlhEgASAJECAMDAwNvb2%2F%2F%2F%2FwAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFCgACACwAAAAAEgASAAACMpSPqQmw39o7IYjo6qpacpt8iKhoITiiG0qWnNGepjCv7u3WMfxqO0%2FrqVa1CdCIRBQAACH5BAUKAAIALAcAAQAIAAYAAAIOVCKZd2osAFhISmcnngUAIfkEBQoAAgAsCwADAAYACAAAAg5UInmnm4ZeAuBROq%2BtBQAh%2BQQFCgACACwLAAcABgAIAAACD5QTJojH2gQAak5jKdaiAAAh%2BQQFCgACACwHAAsACAAGAAACDpQdcZgKIFp4Lzq6RF0FACH5BAUKAAIALAMACwAIAAYAAAIOFCCZd2osQlhISmcnngUAIfkEBQoAAgAsAQAHAAYACAAAAg4UIHmnm4ZeCuFROq%2BtBQAh%2BQQFCgACACwBAAMABgAIAAACD5QBJojH2kQIak5jKdaiAAA7";
var checkGraphic = "data:image/gif;base64,R0lGODlhEgASAJEDAMjIyH19fQcHB%2F%2F%2F%2FyH5BAEAAAMALAAAAAASABIAAAI5nI%2BJMuwNH1M0zWoxAmFp3kHaEJQeGR5lABgXmq7tCXbyedTlnOV3n%2BDwFC%2FDEDcCJotJV%2BQpaRQAADs%3D";
var pixel = "data:image/gif;base64,R0lGODlhAQABAID%2FAMDAwAAAACH5BAEAAAAALAAAAAABAAEAQAICRAEAOw%3D%3D";
var upArrow = "data:image/gif;base64,R0lGODlhBwAEAIABAP%2F%2F%2F%2F%2F%2F%2FyH5BAEAAAEALAAAAAAHAAQAAAIHjGEJq8sOCwA7";
var downArrow = "data:image/gif;base64,R0lGODlhBwAEAIABAP%2F%2F%2F%2F%2F%2F%2FyH5BAEAAAEALAAAAAAHAAQAAAIIhA%2BBGWoNWSgAOw%3D%3D";
var closeGraphic = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAToSURBVHja3JZtSFRZGIDfO86HzqgztqM5OsyoObFq%2FnBoEpMoNrII2gVZMnGDKNhccUtRXBX7s2uxRQTpUgSLCOFP139Fke7gGpph4ViD4jqNbn6kbabO173jzN1zrvdc7x3HNdh%2F%2B8Lh3nPuue9z3o%2FznkOxLAv%2FS6E%2BdeLc7dufB5eXv2fX17VhrzeDUqvdlELxIZiQ0G6pq%2FsTTWH%2FM2ymtbXF9%2BpVvd%2Fp1G43R71v3wdFbm5rVktLG%2BqGtwNvC5u%2BdSsnMDIy4Bsb2%2FWp1mus1vk3KSmFx2%2FcmOWhO8Nmbt78cvXhw%2B7g0pJcPK7Q60GVkcG1wNQU0G43rC8vS%2F5VGo0MU1RUUnDlykCklVQ0izyPH48yc3MKYcUFBWCorob4%2Ffu3LGz16VNYuHMHkKuFMZXZTL8wGnO%2BuXv3L9QNEaAs0lL65Uu7GGS4fBksnZ1RQVgSi4thb1cX7D5%2FXhijp6dVtlCoFxsqZkhgM9eu1XlHR1NIX19ezinxDA%2BDu6EB2GBQAgrTNLyprQX0D7eopJMnhW%2F%2B4eHMoebmcux9whHDKJ%2FD0Sy4wmSCtEuXYG1wEFzIhR8fPQJ3fb0AxCA8vtLXB1OVlRzQ2NjIxRULGw6DbmHhR6wKtRisX4C9vn7dEhgfTyL9NLRimVoNXoeDU4xlxW7ngCGPhwNhizmwz8fFLEarBQNaoODOsbG0UpsNZ7NcAotjmK%2FxajhzVSpIQLHAknrxIteIYKATuYuAsKSjBSRXVHDv2iNHkFaZYP13hw59RWInE7KSprPJz7F79nBAIqlVVRJgaGVFCjp7Vuhj6xQGg9DXymT5vGWbsHAgYBSyJj5%2BS9alXLgAyvR0yVisxQL6M2e2zJVrRcWGZeN4WIzgRlapXCTvkRuVJAMzOysZD0xOSpKGSHBRUAUMy67xiSjEjAoqlaNCYFF1IK4iIHGMEoqKJDEUA5n5eQi%2Bfy98n1pdfSG4mMDmvV7nFxpNA0vTFDIdVEYjqHNz4W1rK6z09m7GCO03Y3Mzdg94RkY2FofKVtjvh8SDB%2BHv7m5YGxraUK7Tscd7ehqxE%2FA0Yhn72%2FPnAVVOzgxRunDvHpfSODlIrDCIZJ04aWKzsmA3iin2xruOjs2Nm5c3wddHXLLCMaIaSZUeO%2BZSu1xleNXozOKK7a7SUtAdPQqx2dmgP31aEpt4mw3kOh0YampAnpgILlRFaJdrI8nQHu2hqBr7%2BDiuj15smbgQ44xRj1dXD%2Fj7%2B%2FNFZxWYr17lKv12wiVKUxP3FBLu8OEha3v7t%2Bj1I9%2F8Yhh2qcqamflZV2Hh64DTmSh8QHsu5dw5rvaJoVj58oMHsHj%2FviQjlVbrUl5n5wn0usaD8JOhIs42bF1cdUlJdlVy8hNUbpKiWaJEmxZnXdRvVuu7ysHBij8mJvCEVZyw2Cq8oyLPMxlfpTWW1FR9d1lZB%2FvsWTFOlJ1EptGwtM32%2B4G2th945R4ehn%2FGZoejndQxfC1T4xxoOnUqv9xk%2BknmcuUFZ2cVWywxmxnabB79xeH4uaO%2F382nuZd3HQGFtrsWULyFGBiLrcSuxfGsPXFi7wGTKW%2BjCrFU3%2BSk41e7%2FS2vDCuleYCPt04A%2FduFhwDlIqiKb3JSfvjjPswrZcjm5dt65KVnp6ucTARVkIIaBUYsW%2BdbKNp17h8BBgC%2FyxaP%2Fw6fKAAAAABJRU5ErkJggg%3D%3D";
var newDoc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADsSURBVHjaYjTzKWBhQAPJvpq%2F0cXmbr7OiszH0AQDaWlpYPrVuy8MG9YsAxuGrJmJAQ84e%2FYsw%2F5DJ%2BEGIbsEr0ZjY2MGXV0dMHvWrFnI3uBlQfcPSDHIJpiNdx5%2FYOAXUwbzQYYc2bsRxDRlQfYPshNhhgARCjiyF0xxsxDyI7prCIYqukJ0gFMjLDBI0hgQEsXw5v1XOP%2Fy5SsMfXO3RACZP6FC37Bq5GRnZRAW4GL4%2B%2Fc%2FmP%2Fx1V2Y1DcgfgwSYiHGWVDwB4hvAPEzsFOByUgeSGsQ0MQFte0zsh9BnNtAzEFA80dkjQABBgCeJ1QlHYPYIAAAAABJRU5ErkJggg%3D%3D";
var maxTableHeight = 400;

prices = new Object();
items = new Object();

//whole buncha css to put readouts together
var smallCss = (<r><![CDATA[
span.meatAmt {
	margin-right:4em;
	color:white;
}
a.dcLink {
	text-decoration:none;
	color:white;
}
a.dcLink:hover,span.meatAmt:hover {
	cursor:pointer;
	color:#dedede;
/* some kind of highlit indicator */
}
a.dcLink:visited {
	color:white;
}
span.subtotalLabel {
	color:white;
	width:5em;
	margin-right:1em;
	font-family: "arial black", sans-serif;
	font-weight: normal;
}
/* Display case styles */
td.leaderLine span { 
	background-color:white; 
	padding-right:2px;
} 
td.leaderLineRight {
	font-size:10pt;
	color:#888;
	vertical-align: bottom; 
}
td.leaderLine { 
	padding-left:0;
	padding-right:1em;
	vertical-align: bottom; 
	background-image : url(data:image/gif;base64,R0lGODlhAwAEAID%2FAJkzZsDAwCH5BAEAAAEALAAAAAADAAQAAAIEDIKpBQA7); 
	background-repeat: repeat-x; 
	background-position: bottom; 
} 
span.shelfValueSpan {
	display:block;
	font-size:9pt;
	font-weight: bold; 
} 
/* -- shelf readout -- */

table#shelfList {
	color:#66626e;
	border-left:3px solid #8a7aa1;
	border-right:3px solid #8a7aa1;
	font-size:9pt;
	width:100%;
}
table#shelfList a.shelfLink {
	color:#66626e;
	text-decoration:none;
}
table#shelfList a.shelfLink:hover {
	color:black;
}
table#shelfList td {
	padding:5px 3px 4px 5px;
}
tr.odd td {
	background-color:#efedf1;
}
tr.even td {
	background-color:#faf8fc;
}

div#linkDiv, div#storePrice, div#stashPrice {
	-moz-border-radius-bottomleft: 3em;
	-moz-border-radius-bottomright: 3em;
}
div#total, div#storeTotal, div#stashTotal  {
	-moz-border-radius-topleft: 3em;
	-moz-border-radius-topright: 3em;
}
div#total,div#linkDiv,div#storeTotal,div#stashPrice,div#storePrice,div#stashTotal {
	text-align:center;
	min-height:1.5em;
	padding:.3em .5em .3em .5em;
	background-color:#8a7aa1;
}
div#storeInfo,div#stashInfo {
	background-color:#efedf1;
	color:#66626e;
	font-size:9pt;
	text-align:center;
	padding:.3em 0 .3em 0;
	border-left:3px solid #8a7aa1;
	border-right:3px solid #8a7aa1;
}
div#shelfListHolder {
	max-height:400px;
	overflow:auto;
	padding:0;
}

div#infoHolder {
	font-size:9pt;
	width:400px;
	padding:5px 5px 8px 10px;
	margin-bottom:20px;
	text-align:left;
}

/* --tooltip stuff-- */
td.tooltipCell {
	cursor:help;
}
td.tooltipCell:hover > span.tooltipHolder {
	background-color:#8a7aa1;
	color:white;
}
td.tooltipCell span.tooltipHolder {
	/* For popup positioning */
	position:relative;
}

td.tooltipCell:hover span.tooltipSpan {
	display:block;
}
td.tooltipCell  span.tooltipSpan {
	display:none;
	font-weight: bold;
	white-space:nowrap;
	top:2em;
	right:-5em;
	position:absolute;
	background-color:#705a8f;
	border:3px solid #cbcacd;
	-moz-border-radius: 2em;
	-moz-opacity:0.8;
	color:white;
	padding: 6px;
	font-size:9pt;
}
]]></r>).toString();


var bigCss = (<r><![CDATA[
/* header stuff */
#header {
	width:100%;
	margin-top:20px;
  background:transparent url(data:image/gif;base64,R0lGODlhAQACAIAAAIp6oQAAACH5BAAAAAAALAAAAAABAAIAAAICBAoAOw%3D%3D) repeat-x bottom;
  float:left;
  font-size:93%;
  line-height:normal;
}
#header ul {
	margin-left:20px;
  padding:10px 10px 0;
  padding:0;
  list-style:none;
}
#header li {
	color:#c3c2c6;
	cursor:pointer;
	float:left;
  background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAABMCAYAAABUMybMAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFQSURBVHja7NNdSgMxEAfwf2y6FbS7LdsWqeC%2BFHwVvIE3EAqCD4J4BE%2BhB%2FDJswmeQbNis8k4WbbWrvuRAyQwJLS%2Fzs5MtoKI0LTu7x6veLvhuOQ4lw3ghLcXjuu%2Fn8sauq1QMpQSaTpBnBzjcBTtIKMH3l7deTqJkZ0tIaXcz8joosqELFtiMU%2F%2F1bz9yTNHNJ9NsZgxauhv8P724bp6GnEdq1UGIUTjFFzGtTskybhEbeNy0NWHeHzUirbwtDzIAay1nbBcDnlC8oNEnhmNsRymbEgXGoXWMNbAGlt%2FtIFS38i%2F8sbuf6FSnyiKTfejXX0qVzyig26o9QZRNETL7e2ga8JaHrjpgQQqmzGC%2FG5GwBMCwgdygeQBDd81%2BdRIfFXWqxkeeoerN9OXkb8n65Dn%2B9j3n6lqpBJ7ZERnxvb3KsAAAwwwwAAD3Fs%2FAgwAVZKhv%2FeWecgAAAAASUVORK5CYII%3D) no-repeat left top;
  margin:0;
  padding:0 0 0 9px;
  }
#header span {
	font-weight:bold;
  display:block;
  background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMCAYAAAAoefhQAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI3SURBVHja7NzNahNRGIDhM5Np1Z1ES3sH3oC4dulK8AIU3boR9DYsFtSNCwsuegfehGsRxYK4UbQ1NbEa8zfjmfyUmM64FuZ54NAkZDXw8p0zaZLcvnm%2FCNBM7%2BL6ENfLuPZ2X2x3Vt%2BQukY02KW4rsX1OK63d249uLH6hmTn4TMThEYaDIah3%2F8djo56ods7Xry8F9fdOE2600CePHouEBrvy9fD8OnzQZhMJuXTV3FdjZH0syRNXB0ab2trI7Tb58P%2B%2Fsfw81f%2FSnxpu5wkydOdXRME5sot1%2Bs378uH5Si5nBVBH7Bw9tyZsHGxHQ4OO6349F5WFAKBZZubF8pAyofXBQIr1tfXQpalYTzO21me564ILCmbSOb3rgQCS8odVbf3PSzu7goE5srPQH4c98J4NAppEAhMt1OjGMRwOAiDuE4myfxv1ul8c5VoZhxFHvLZJ%2BeVW61pIMvVAH%2FL6gqChp%2FWZ4FMcoFA7RZrMnFIh1OBnNzFssWCignSssWC%2BkDKL9smJghUStYWE8QZBFalaWGCQO0ASQoTBOq0ytu8ibtYUH1Iz4rpv7xnee4LU3AqkOkJxG1eqA5k8Ul64QwCVYXMArHFguot1iyQwgSB2gniV02gfoL4dXf4B4GAQEAgIBAQCAgEBAICAYGAQACBgEBAICAQEAgIBAQCAgGBgEAAgYBAQCAgEBAICAQEAgIBgQACAYGAQEAgIBAQCAgEBAICAYEAAgGBgEBAICAQ%2BJ%2F9EWAAOJ%2FSFx3UgpIAAAAASUVORK5CYII%3D) no-repeat right top;
  margin-right:.2em;
  padding:5px .9em 4px .4em;
  }
#header li:hover {
	color:white;
}
#header .current {
 	cursor:default;
  background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAABMCAYAAABUMybMAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE8SURBVHja7JJBSwJREMf%2FPi21jayToVDqoYXADLwE3kK6C4LQtY%2FRJyjvnjr1bfpEucbOa2aVNde3uy%2FIg%2FHeY5hh%2BTHz%2F8%2B%2BgtYapjN9fr%2FnNOHoc%2FiFJMjAOacZx%2Bjn91ICelxBtapXht9t4aJTR%2B3seA0y9MTpTer2VQOD4Q0q1XLcJBrN0C3XHxyHg2EP1732lma1yq8C%2Bd1LIySn6H11xNXLyamHh9EdlFJGUDSOpRDRpSJDKesSUPSh2arDjKzBphQeryOt28Yexb22A2EJwrqjjiMMwyiIKIotMFgsEARzo6cYFEB9UvboqNs8QOXoIBsMifWwGcozo1nw0kjeaLnEHelvF075o5c6rUfrX%2FxrkF1H7OD1IB%2BErRlkS0y6TicVLM9egVkv5%2F%2B6dqADHehAB%2B4Y%2FBZgAJcrsDXbjk6eAAAAAElFTkSuQmCC);
}
#header .current span, #header .current span:hover {
	color:#66626e;
  background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMCAYAAAAoefhQAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIXSURBVHja7Nw9a1NRGMDx58ptRUuLQjdBRCs4SBed%2FRaCk9%2FCQV0VRD9F3V1cBQUXcRChDlohKIrgS5q0IRJskns9SY0vsTeik3B%2FPzjDTTId%2BHOeQ0iym1fWyoB62kmrk9aDtC5fun6xMf2BffaIGptPazmt82m9vHX19o3pD2TNT20nCLW03e5G6%2BN2NDbexZvG%2B8nLr9M6l06Tt%2BNAWptbAqH2nj1pxNNHG7HzpT96%2FJzW0RRJK88iszvU3uqZlTh%2B8kjcu%2Fs4mh%2B2FtJLD9M6nbU3t50g8E2r2Yk7a%2FcnjxdydcAPh5eX4tTqsXixPrqKxLU8SonAL%2BPW2ZV4vv4qXT6yE04QmLJ4aCEWlw5Gt9PLnCAwpSiK2H9gbhRI5KVA4LtRD71eL%2Bbm8%2FGzQOCnk2MUx7AYxuTrD4FQ%2ByiKFES%2FP4jBoP%2Fb%2B3m327VL1HacKsui6t3dQAbDoZ2CPfMYj1iF3YAKeVm4g8Ae89duIIVLOsw4QYxYUH1JL4xYUDVh%2BR4EjFjw1wOWEQv%2BdAUxYsHsESuMWFA5Yvk9CBix4B9HLH1A9YjlBIGZI5a9gOoRKxQCFQeIf3eHWQQCAgGBgEBAICAQEAgIBAQCAgEEAgIBgYBAQCAgEBAICAQEAgIBBAICAYGAQEAgIBAQCAgEBAIIBAQCAgGBgEBAICAQEAgIBAQCCAQEAgIBgYBA4H%2F2VYABAARhvisnr5aWAAAAAElFTkSuQmCC);
  padding-bottom:5px;
 }
 
 /* window stuff */
#readoutWindow {
	right:0;
	left:0;
	width:31em;
	min-width:400px;
	margin:0 auto 0 auto;
	position:absolute;
	top:10em;
}
#contentWrapper div.content {
    padding:10px;
  	position:relative;
}

#contentWrapper {
	padding-top:10px;
	min-height:5em;
	border-left:2px solid #8a7aa1;
	border-right:2px solid #8a7aa1;
	border-bottom:2px solid #8a7aa1;
	-moz-border-radius-bottomleft: 25px;
	-moz-border-radius-bottomright: 25px;
	background-color:#cbcacd;
	clear:both;
 }
 
img#closeReadout {
	cursor:pointer;
	top:5px;
	position:absolute;
	right:0px;
}

/* subtotal code */
div.total, div.grandtotal {
	font-size:9pt;
	font-weight:bold;
	color:white;
	background-color:#8a7aa1;
	-moz-border-radius: 2em;
	height:1.5em;
	padding:3px 5px 3px 10px;
	margin-bottom:20px;
}
div.grandtotal {
	border: 3px solid white;
	margin-bottom:3px;
}
span.meatAmt {
	clear:right;
}
span.subtotalLabel, span.grandtotalLabel {
	float:left;
	clear:left;
	width:11em;
	text-align: right;
	margin-right:2em;
	font-family: "arial black", sans-serif;
	font-weight: normal;
}

/* data table code */
/* --head-- */
table.data thead th {
	color:white;
	font-weight:bold;
	text-align: left;
	background-color:#8a7aa1;
}
table.data thead th.tableHeader {
	cursor:pointer;
}
table.data thead th.tableHeader:hover {
	color:#dedede;
}
table.data thead th.tableHeader span.arrowDown, table.data thead th.tableHeader span.arrowUp {
	display:-moz-inline-block;
	width: 7px;
	height:4px;
	margin-left:2px;
	vertical-align:middle;
	background-color: transparent;
	background-repeat: no-repeat;
}
table.data thead th.tableHeader span.arrowUp {
	background-image: url(data:image/gif;base64,R0lGODlhBwAEAIABAP%2F%2F%2F%2F%2F%2F%2FyH5BAEAAAEALAAAAAAHAAQAAAIHjGEJq8sOCwA7);
}
table.data thead th.tableHeader span.arrowDown {
	background-image: url(data:image/gif;base64,R0lGODlhBwAEAIABAP%2F%2F%2F%2F%2F%2F%2FyH5BAEAAAEALAAAAAAHAAQAAAIIhA%2BBGWoNWSgAOw%3D%3D);
}
/* --head and foot rounding-- */

table.data thead th:first-child {
	-moz-border-radius-topleft: 8px;
}
table.data thead th:last-child {
	-moz-border-radius-topright: 8px;
}
table.data tfoot td {
	-moz-border-radius-bottomright: 8px;
	-moz-border-radius-bottomleft: 8px;
}

/* --foot-- */
table.data tfoot td {
	color:white;
	background-color:#8a7aa1;
}
table.data tfoot tr td span {
	cursor:pointer;
}
table.data tfoot tr td span:hover {
	color:#dedede;
}
/* --general-- */
table.data td, table.data th {
	padding:2px 4px 2px 4px;
}
tr.odd td {
	background-color:#efedf1;
}
tr.even td {
	background-color:#faf8fc;
}
table.data {
	padding:0;
	margin:0;
	width:100%;
	font-size:9pt;
	color:#66626e;
}

table.data tbody {
	overflow-y:auto;
	overflow-x:hidden;
}
img.newWinImg {
	vertical-align:middle;
	margin-left:1em;
	cursor:pointer;
}

/* -- tooltip stuff -- */
table.data td.tooltipCell {
	cursor:help;
}
table.data td.tooltipCell:hover {
	background-color:#8a7aa1;
	color:white;
}
table.data td.tooltipCell span.tooltipHolder {
	/* For popup positioning */
	position:relative;
}

table.data td.tooltipCell:hover span.tooltipSpan {
	display:block;
}
table.data td.tooltipCell  span.tooltipSpan {
	display:none;
	font-weight: bold;
	white-space:nowrap;
	top:-.8em;
	right:6em;
	position:absolute;
	background-color:#705a8f;
	border:3px solid white;
	-moz-border-radius: 2em;
	-moz-opacity:0.8;
	color:white;
	padding: 6px;
	font-size:9pt;
}
]]></r>).toString();

switch(document.location.pathname) {
	case "/account.php":
	
	/* ------------
			preferences
	   ------------ */
	   
	   
	//create preference title bar
	prefTitle = document.createElement('div');
	with(prefTitle) {
		appendChild(document.createTextNode('Character Value'));
		style.padding = "1px 0 1px 0";
		style.textAlignment = "center";
		style.color = "white";
		style.backgroundColor = "blue";
		style.fontWeight = "bold";
	}
	
	//create wrapper for preference content (helps with alignment)
	prefContent = document.createElement('div');
	with(prefContent) {
		style.textAlign = "left";
		style.display = "table-cell";
		style.lineHeight = "2em";
		style.padding = "5px";
	}
	
	//create form, and button to toggle it
	toggleUpdateForm = document.createElement('span');
	updateForm = document.createElement('form');
	with(toggleUpdateForm) {
			style.cursor = "pointer";
			appendChild(document.createTextNode('Update item information'));
			style.textDecoration = "underline";
			className = "preferenceButton";
			addEventListener('click',function(evt) {toggle(updateForm);evt.preventDefault();},true);
	}
		
	//create away label and form field
	updatePrices = document.createElement('input');
	with(updatePrices) {
		title="No reason to run more than once in 24 hours";
		className = "button";
		style.width = "12em;"
		type="button";
		value="Update Item Prices";
		addEventListener('click',function(evt) {
			if(typeof inprogress == "undefined" || inprogress == false) {
				inprogress = true;
				getPriceList(done);
				updatePricesProgress.src=loadingGraphic;
			}
			function done() {
				inprogress = false;
				updatePricesProgress.src=checkGraphic;
			}
			evt.preventDefault();
		},true);
	}
	updatePricesProgress = document.createElement('img');
	with(updatePricesProgress) {
		style.marginLeft = "5px";
		style.verticalAlign = "middle";
		src=pixel;
		width = 18;
		height = 18;
	}
	
	updateItems = document.createElement('input');
	with(updateItems) {
		title="No reason to run more than once in 24hours";
		style.width = "12em;"
		className = "button";
		type="button";
		value="Update Item List";
		addEventListener('click',function(evt) {
			if(typeof inprogress == "undefined" || inprogress == false) {
				inprogress = true;
				getItemList(done);
				updateItemsProgress.src=loadingGraphic;
			}
			function done() {
				inprogress = false;
				updateItemsProgress.src=checkGraphic;
			}
			evt.preventDefault();
		},true);
	}
	updateItemsProgress = document.createElement('img');
	with(updateItemsProgress) {
		style.marginLeft = "5px";
		style.verticalAlign = "middle";
		src=pixel;
		width = 18;
		height = 18;
	}
	
	with(updateForm) {
		//style.marginBottom = "-1em";
		style.display = "none";
		style.lineHeight = "1em";
		appendChild(document.createElement('hr'));
		appendChild(updatePrices);
		appendChild(updatePricesProgress);
		appendChild(document.createElement('br'));
		appendChild(document.createElement('br'));
		appendChild(updateItems);
		appendChild(updateItemsProgress);
		appendChild(document.createElement('hr'));
	}
	
	with(prefContent) {
		appendChild(toggleUpdateForm);
		appendChild(updateForm);
	}
	
	//create main wrapper form
	prefWrapper = document.createElement('div');
	with(prefWrapper) {
		style.marginBottom = "4px";
		style.width = "95%";
		style.border = "1px solid blue";
		appendChild(prefTitle);
		appendChild(prefContent);
	}
	
	//find area to append the whole mess to
	var loc = document.getElementsByTagName('center')[2];
	if(loc.lastChild.textContent.indexOf("This account will") != 0)var loc = document.getElementsByTagName('center')[3];
	loc.insertBefore(prefWrapper,loc.lastChild);
	
	break;
	case "/charsheet.php":
	
	/* ------------
			Character Sheet
	   ------------ */
		
		inventoryList = new Array();
		storeList = new Array();
		closetList = new Array();
		hagnksList = new Array();
		dcList = new Array();
		activetab = 0;
		
		playerName=document.getElementsByTagName('a')[0].textContent;
		var cells = document.getElementsByTagName('td');
		for(var i=0;i<cells.length;i++) {
			var c;
			if((c=cells[i].firstChild) && c.nodeValue == "Meat:") {
				target=cells[i].parentNode;
				newRow = target.cloneNode(true);
				statusLocation = newRow.getElementsByTagName('b')[0].firstChild;
				statusLocation.nodeValue = addCommas(GM_getValue('totalValue_'+playerName,'uncalculated'));
				newLink = document.createElement('span');
				with(newLink) {
					title="Click to run value check"
					style.cursor = "pointer";
					appendChild(document.createTextNode('Total Value:'));
					addEventListener('click',generateValueWindow,'true');
				}
				newRow.getElementsByTagName('td')[0].replaceChild(newLink,newRow.getElementsByTagName('td')[0].firstChild)
				target.parentNode.insertBefore(newRow,target.nextSibling);
				break;
			}
		}
		parser = document.createElement('div');
	break;
	
	
	case "/displaycollection.php":
	
		/* ------------
			Display Cases
	   ------------ */
	   
		addGlobalStyle(smallCss);
		var caseSite = "http://www.jickenwings.org/collections/index.cgi?query_type=player&query_value=";
		var playerId = /who=(\d*)/.exec(document.getElementsByTagName('a')[0].search)[1];
		
		var meatDiv = document.createElement('div');
		meatDiv.id="total";
		
		var linkDiv = document.createElement('div');
		linkDiv.id="linkDiv";
		
		var shelfList = document.createElement('table');
		with (shelfList) {
			id = "shelfList";
			cellPadding = 0;
			cellSpacing = 0;
		}
		
		var shelfListHolder = document.createElement('div');
		shelfListHolder.id = "shelfListHolder";
		shelfListHolder.appendChild(shelfList);
		
		var meatSpan = document.createElement('span');
		meatSpan.className = "subtotalLabel";
		meatSpan.appendChild(document.createTextNode("Total:"));
		
		amtSpan = document.createElement('span');
		with(amtSpan) {
			amtSpan.className = "meatAmt hoverUnderline";
			appendChild(document.createTextNode("uncalculated"));
			title="Calculate display case value";
			addEventListener('click',beginCurrentCase,true);
		}

		var linkLabel = document.createElement('span');
		linkLabel.className = "subtotalLabel";
		linkLabel.appendChild(document.createTextNode("DC Info:"));
		
		var link = document.createElement('a');
		with(link) {
			link.target = "mainpane";
			link.className = "dcLink hoverUnderline";
			link.href=caseSite+playerId;
			link.appendChild(document.createTextNode('Display Case Database'))
		}
		
		with(meatDiv) {
			appendChild(meatSpan);
			appendChild(amtSpan);
		}
		
		with(linkDiv) {
			appendChild(linkLabel);
			appendChild(link);
		}
		
		infoHolder = document.createElement('div');
		with(infoHolder) {
			id = "infoHolder";
			appendChild(meatDiv);
			appendChild(shelfListHolder);
			appendChild(linkDiv);
		}
		
		//find insertion location
		var center = document.getElementsByTagName('center')[1];
		center.insertBefore(infoHolder,center.firstChild);
		statusLocation = amtSpan.firstChild;
		var caseRan = false;
	break;
	
	case "/mallstore.php":
	
		/* ------------
			Mall stores
	   ------------ */
	   
		addGlobalStyle(smallCss);
		
		var storeTotal = document.createElement('div');
		storeTotal.id = "storeTotal";
		
		var storeTotalSpan = document.createElement('span');
		storeTotalSpan.className = "subtotalLabel";
		storeTotalSpan.appendChild(document.createTextNode("Store Value Total:"));
		
		var storeTotalAmtSpan = document.createElement('span');
		with(storeTotalAmtSpan) {
			className = "meatAmt";
			appendChild(document.createTextNode("uncalculated"));
		}
		
		var storeInfo = document.createElement('div');
		storeInfo.id = "storeInfo";
		storeInfo.style.display = "none";
		
		var storePrice = document.createElement('div');
		storePrice.id = "storePrice"
		
		var storePriceSpan = document.createElement('span');
		storePriceSpan.className = "subtotalLabel";
		storePriceSpan.appendChild(document.createTextNode("Store Price Total:"));
		
		var storePriceAmtSpan = document.createElement('span');
		with(storePriceAmtSpan) {
			className = "meatAmt";
			appendChild(document.createTextNode("uncalculated"));
		}

		with(storeTotal) {
			appendChild(storeTotalSpan);
			appendChild(storeTotalAmtSpan);
		}
		
		with(storePrice) {
			appendChild(storePriceSpan);
			appendChild(storePriceAmtSpan);
		}
		
		infoHolder = document.createElement('div');
		with(infoHolder) {
			id = "infoHolder";
			style.cursor = "pointer";
			appendChild(storeTotal);
			appendChild(storeInfo);
			appendChild(storePrice);
			addEventListener('click',beginCurrentStore,'true');
		}
		
		//find insertion location
		var center = document.getElementsByTagName('center')[document.getElementsByTagName('center').length-2];
		center.insertBefore(infoHolder,center.firstChild);
		statusLocation = storeTotalAmtSpan.firstChild;
		var storeran = false;
	break;
	
	case "/clan_stash.php":
	
	/* ------------
			Clan Stash
	   ------------ */

		addGlobalStyle(smallCss);

		var stashTotal = document.createElement('div');
		stashTotal.id = "stashTotal";
		
		var stashTotalSpan = document.createElement('span');
		stashTotalSpan.className = "subtotalLabel";
		stashTotalSpan.appendChild(document.createTextNode("Stash Value Total:"));
		
		var stashTotalAmtSpan = document.createElement('span');
		with(stashTotalAmtSpan) {
			className = "meatAmt";
			appendChild(document.createTextNode("uncalculated"));
		}
		
		var stashInfo = document.createElement('div');
		stashInfo.id = "stashInfo";
		stashInfo.style.display = "none";
		
		var stashPrice = document.createElement('div');
		stashPrice.id = "stashPrice"
				
		with(stashTotal) {
			appendChild(stashTotalSpan);
			appendChild(stashTotalAmtSpan);
		}
		
		infoHolder = document.createElement('div');
		with(infoHolder) {
			id = "infoHolder";
			style.cursor = "pointer";
			appendChild(stashTotal);
			appendChild(stashInfo);
			appendChild(stashPrice);
			addEventListener('click',beginStash,'true');
		}
		
		//find insertion location
		var center = document.getElementsByTagName('center')[document.getElementsByTagName('center').length-2];
		center.insertBefore(infoHolder,center.firstChild);
		statusLocation = stashTotalAmtSpan.firstChild;
		var stashran = false;

	   
	break;
}
function beginStash() {
		if(!stashran && (typeof inProgress == "undefined" || inProgress == false)) {
				inProgress = true;
				unstorePriceList(checkStash);
		} else if (stashran) {
			toggle(stashInfo);
		}
}
function beginCurrentStore() {
	if(!storeran && (typeof inProgress == "undefined" || inProgress == false)) {
		status('getting price list');
		inProgress = true;
		unstorePriceList(checkCurrentStore);
	} else if (storeran) {
		toggle(storeInfo);
	}
}

function checkStash() {
	status("parsing stash",true);
	var totalValue = 0;
	var itemTypes = 0;
	var itemQuantities = 0;
	
	var fs,f,opts;
	if((fs=document.getElementsByTagName('form')) && (f=fs.namedItem('takegoodies')) && (opts=f.elements.namedItem('whichitem').options)) {
		itemTypes=opts.length-1;
		for(var i=1,l=opts.length;i<l;i++) {
			var id,info,q,total;
			id=opts[i].value;
			info=opts[i].textContent;
			if(q=/\((\d*)\)/.exec(info))q=q[1];else q=1;
			if(!(val = prices[id])){val=0}else{val=val[0]}
			total=q*val;
			itemQuantities+=q*1
			totalValue+=total;
		}
	}
	if(itemTypes==0) {
		stashInfo.appendChild(document.createTextNode('No items in stash'))
	} else {
	stashInfo.appendChild(document.createTextNode('Stash contains '+addCommas(itemQuantities)+' items of '+addCommas(itemTypes)+' types.'))
}
	stashTotalAmtSpan.firstChild.nodeValue = addCommas(totalValue);
	stashran=true;

	statusLocation.nodeValue = addCommas(totalValue);
	stashInfo.style.display = "block";
}

function checkCurrentStore() {
	status("parsing store",true);
	
	var totalValue = 0;
	var totalPrices = 0;
	var itemTypes = 0;
	var itemQuantities = 0;
	
	var s=document.getElementsByTagName('input');
	for(var i=0;i<s.length;i++) {
		if(s[i].type == "radio") {
			itemTypes++;
			var q,p,f;
			
			var row = getParent(s[i],'tr');
			var priceCell = row.cells[3];
			var itemQ = (q=/\(([0-9,]+)\)/.exec(row.cells[2].lastChild.nodeValue))?q[1].replace(/,/g,'')*1:0;
			var itemPrice = (p=/([0-9,]+) Meat/.exec(priceCell.firstChild.nodeValue))?p[1].replace(/,/g,'')*1:0;
			var itemInfo = s[i].value-itemPrice;
			itemInfo+="";
			var itemNumber = itemInfo.substring(0,itemInfo.length-9)*1;
			if(itemPrice>=999999999)itemPrice=0;
			
			itemValue=(f=prices[itemNumber])?f[0]*1:0;
			totalValue += itemValue*itemQ
			priceCell.title = "Diff: " +addCommas(itemPrice-itemValue)+" meat";
			priceCell.style.cursor = "help";
			
			itemQuantities+=itemQ;
			totalPrices+=itemQ*itemPrice;
		}
	}

	if(itemTypes==0) {
		storeInfo.appendChild(document.createTextNode('No items in store'))
	} else {
		storeInfo.appendChild(document.createTextNode('Store contains '+addCommas(itemQuantities)+' items of '+addCommas(itemTypes)+' types.'))
	}
	storeTotalAmtSpan.firstChild.nodeValue = addCommas(totalValue);
	storePriceAmtSpan.firstChild.nodeValue = addCommas(totalPrices);

	storeran=true;

	statusLocation.nodeValue = addCommas(totalValue);
	storeInfo.style.display = "block";
}























function beginCurrentCase() {
	if(!caseRan && (typeof inProgress == "undefined" || inProgress == false)) {
		status('getting price list');
		inProgress = true;
		unstorePriceList(gotoItemList);
	} else if (caseRan) {
		toggle(shelfListHolder);
		//toggle table holder display
	}
	function gotoItemList(){
		status('getting price list');
		unstoreItemList(checkCurrentCase);
	}
}
	

function checkCurrentCase() {
	status("parsing case",true);
	
	function doVal(item,val,static) {
		var newCell = document.createElement('td');
		var span = document.createElement('span');

		newCell.className = "leaderLineRight";
		
		if(static) {
			var tooltip = document.createElement('span');
			with (tooltip) {
	  		appendChild(document.createTextNode(addCommas(val)+'*'));
	  		appendChild(ttSpan.cloneNode(true));
	  		className = "tooltipHolder";
			}
		 newCell.appendChild(tooltip);
	   newCell.className += " tooltipCell";
	  } else {
	  		newCell.appendChild(document.createTextNode(addCommas(val)));
	  }
				
		item.parentNode.parentNode.appendChild(newCell);
		//change item.parentNode.nextSibling's background image
		item.parentNode.nextSibling.className+=" leaderLine";
		while(item.parentNode.nextSibling.firstChild) {
			span.appendChild(item.parentNode.nextSibling.firstChild);
		}
		item.parentNode.nextSibling.appendChild(span);
	}
	
	function createShelfRow(name,amt,num) {
		var row = document.createElement('tr');
		if((num+1)% 2 == 0){
	  	row.className = "even";
	  } else {
	  	row.className = "odd";
	  }
		var nameCell = document.createElement('td');
		if(num>0) {
			var shelfLink = document.createElement('a');
			shelfLink.className = "shelfLink";
			shelfLink.href = "#shelf_"+num;
			shelfLink.appendChild(document.createTextNode(num>0?num+'. '+name:name));
			nameCell.appendChild(shelfLink);
		} else {
			nameCell.appendChild(document.createTextNode(name));
		}
		var amtCell = document.createElement('td');
		amtCell.appendChild(document.createTextNode(addCommas(amt)));
		
		row.appendChild(nameCell);
		row.appendChild(amtCell);
	
		shelfList.appendChild(row);
	}
	
	//create tool tip span for cloning
	ttSpan = document.createElement('span');
	ttSpan.className="tooltipSpan";
	ttSpan.appendChild(document.createTextNode('Price probably out of date'));
		
	var totalValue = 0;
	var numShelves = 0;
	
	var s=document.getElementsByTagName('center')[2].getElementsByTagName('a');
	for(var i=0;i<s.length;i++) {
		if(s[i].href.indexOf('toggle("shelf') != -1) {
			//shelf link
			numShelves++;
			s[i].name = "shelf_"+numShelves;
			var shelfValue = 0;
			var tab = getParent(s[i],"table");
			//if(tab.parentNode.width==400)tab.parentNode.width=450;
			var a=tab.getElementsByTagName('img');
								
			for(var b=0;b<a.length;b++) {
				var clk,theItem,q,nv,static;
				if((clk = a[b].getAttribute('onclick')) != null && clk.indexOf('descitem') != -1) {
					var descNum = /descitem\((\d*)\)/.exec(clk)[1];
					if((nv=a[b].parentNode.nextSibling.firstChild.nextSibling) && (q=/\(([0-9,]*)\)/.exec(nv.nodeValue)))q=q[1].replace(/,/g,'')*1;else	q=1;
					if((theItem=items[descNum])) {
						var itemId = theItem[0];
						var val;
						if(!(val = prices[itemId])){val=0}else{val=val[0]}
						if(!(static = prices[itemId])){static=false}else{static=static[1]};
						var itemValue = val*q;
						shelfValue+=itemValue
					} else {
						GM_log(descNum +" couldn't be found in itemdatabase");
						var val=0,total=0,itemValue=0,static=false;
					}
				doVal(a[b],itemValue,static);
				}
			}
			
			//create Shelf Info
			createShelfRow(s[i].textContent,shelfValue,numShelves);
			totalValue+=shelfValue;
			shelfValueSpan = document.createElement('span');
			shelfValueSpan.appendChild(document.createTextNode('( '+addCommas(shelfValue)+' )'));
			shelfValueSpan.className = "shelfValueSpan";
			//s[i].parentNode.parentNode.insertBefore(shelfValueSpan,s[i].parentNode.parentNode.firstChild);
			getParent(s[i],"td").appendChild(shelfValueSpan);
		}
	}
	if(numShelves == 0) {
		createShelfRow("No Shelves","0",-1);
	}
	caseRan = true;
	//check for no shelves, and create 
	statusLocation.nodeValue = addCommas(totalValue);
	amtSpan.title="Toggle Shelf Price Table";
}
					
							
function generateValueWindow(clear) {
	//if window exists already
	if((showWindow=document.getElementById('readoutWindow')) != null) {
		//if window is hidden
		if(showWindow.style.display=="none") {
			//unhide window
			showWindow.style.display="block";
		}
	} else {
		//window doesn't exist (yet)
		if(typeof inProgress == "undefined" || inProgress == false) {
			inProgress = true;
			
			//verify price list
			status("verifying price list");
			unstorePriceList(checkItemList);
		}
	}
	function checkItemList() {
		unstoreItemList(inventorySweep);
	}
	function inventorySweep() {
		//check for existing data
		storedLists=eval(GM_getValue("lastLists_"+playerName,[]));
		if(storedLists.length>0) {
			generateNewGroups();
		}
		else {
			doCloset();
		}
	}
}

function doCloset() {
	closetTotal=0;
	inventoryTotal=0;
	status("checking closet",true);
	GM_get(document.location.host + "/closet.php",pushCloset);
	function pushCloset(details) {
		parser.innerHTML = details;
		if(closetMeat = /Your closet contains (\d*) meat/.exec(details.replace(/,/g,''))){closetMeat=closetMeat[1]};
		if(closetMeat*1>0) {
			closetTotal+=closetMeat*1;
			closetList.push(["Meat",,,closetMeat,]);
		}
		returned = parseFromForm('takegoodies',closetTotal,closetList);
		closetTotal = returned.total;
		closetList = returned.list;
		status("sorting closet list");
		closetList.sort(sortbyTotal);
		
		//do next section
		var pageInfo = document.body.innerHTML.toString().replace(/,/g,'');
		inventoryMeat = /Meat:<\/td><td><b>(\d*)</.exec(pageInfo)[1];
		if(inventoryMeat*1>0) {
			inventoryTotal+=inventoryMeat*1;
			inventoryList.push(["Meat",,,inventoryMeat,]);
		}
		var returned = parseFromForm('addgoodies',inventoryTotal,inventoryList);
		inventoryTotal = returned.total;
		inventoryList = returned.list;

		
		//do current equipment
		var a=document.getElementsByTagName('img');
		for(var i=0;i<a.length;i++) {
				var clk,theItem;
				if((clk = a[i].getAttribute('onclick')) != null && clk.indexOf('descitem') != -1) {
					var descNum = /descitem\((\d*)\)/.exec(clk)[1];
					if((theItem=items[descNum])) {
						//item was found in item database
						var itemId = theItem[0];
						var itemName = theItem[1];
						var val,total,static;
						var foundItem=false;
						if(!(val = prices[itemId])){val=0}else{val=val[0]}
						if(!(static = prices[itemId])){static=false}else{static=static[1]};
						total=val;
						inventoryTotal+=val*1;
						for(var n=0;n<inventoryList.length;n++){
							if(inventoryList[n][4]==itemId) {
								//item exists in array already
									foundItem=true;
									inventoryList[n][1]++;
									var oldVal = inventoryList[n][3]*1;
									var newVal=val*1+oldVal;
									inventoryList[n][3]=newVal;
									break;
							}
						}
						if(!foundItem) {
							inventoryList.push([itemName,1,val,total,itemId,static]);
						}
					} else {
						GM_log(descNum +" couldn't be found in itemdatabase");
						var val=0,total=0;
						itemName = a[i].parentNode.nextSibling.firstChild.textContent;
						inventoryList.push([itemName,1,val,total,,false]);
					}
				}
			}
		
		//do next section
		doFamiliars();
	}
}

function doFamiliars() {
	status("checking familiar equipment",true);
	GM_get(document.location.host + "/familiar.php",pushFam);
	function pushFam(details) {
		parser.innerHTML = details;
		//fix for: no terrarium and no familiars to take from terrarium (I think)
		if(parser.getElementsByTagName('form').length>0 && parser.getElementsByTagName('form').namedItem('newfam')!=null) {
			var a=parser.getElementsByTagName('form').namedItem('newfam').getElementsByTagName('img');
			status("checking "+a.length+" familiar items",false);
			for(var i=0;i<a.length;i++) {
					var clk,theItem;
					if((clk = a[i].getAttribute('onclick')) != null && clk.indexOf('descitem') != -1) {
						var descNum = /descitem\((\d*)\)/.exec(clk)[1];
						if((theItem=items[descNum])) {
							var itemId = theItem[0];
							var itemName = theItem[1];
							var val,total,static;
							var foundItem=false;
							if(!(val = prices[itemId])){val=0}else{val=val[0]}
							if(!(static = prices[itemId])){static=false}else{static=static[1]};
							total=val;
							inventoryTotal+=val*1;
							for(var n=0;n<inventoryList.length;n++){
								if(inventoryList[n][4]==itemId) {
									//item exists in array already
										foundItem=true;
										inventoryList[n][1]++;
										var oldVal = inventoryList[n][3]*1;
										var newVal=val*1+oldVal;
										inventoryList[n][3]=newVal;
										break;
								}
							}
							if(!foundItem) {
								inventoryList.push([itemName,1,val,total,itemId]);
							}
						} else {
							GM_log(descNum +" couldn't be found in itemdatabase");
							var val=0,total=0;
							//itemName = a[i].parentNode.nextSibling.firstChild.textContent;
							var imgSrc = a[i].src;
							var split=imgSrc.split('/');
							var name =split[split.length-1];
							itemName = "Unknown Item ("+descNum+"): "+name;
							inventoryList.push([itemName,1,val,total,]);
						}
					}
				}
			}
			status("sorting inventory list");
			inventoryList.sort(sortbyTotal);
			
			//do next section
			doHagnks();
	}
}				
					
function doHagnks() {
	hagnksTotal=0;
	status("checking hagnks",true);
	GM_get(document.location.host + "/storage.php",pushHagnks);
	function pushHagnks(details) {
		parser.innerHTML = details;
		if(hagnksMeat = /You have (\d*) meat in long-term storage/.exec(details.replace(/,/g,''))){hagnksMeat=hagnksMeat[1]};
		if(hagnksMeat*1>0) {
			hagnksTotal+=hagnksMeat*1;
			hagnksList.push(["Meat",,,hagnksMeat,]);
		}
		returned = parseFromForm('takegoodies',hagnksTotal,hagnksList);
		hagnksTotal = returned.total;
		hagnksList = returned.list;
		status("sorting hagnks list");
		hagnksList.sort(sortbyTotal);
		
		//do next section
		doDC();
	}
}

function doDC() {
	dcTotal=0;
	status("checking display case",true);
	GM_get(document.location.host + "/managecollection.php",pushDC);
	
	function pushDC(details) {
		parser.innerHTML = details;
		returned = parseFromForm('takegoodies',dcTotal,dcList);
		dcTotal = returned.total;
		dcList = returned.list;
		status("sorting display case list");
		dcList.sort(sortbyTotal);
		
		//do next section
		doStore();
	}
}

function doStore() {
	storeTotal=0;
	status("checking store",true);
	GM_get(document.location.host + "/managestore.php",pushStore);
	
	function pushStore(details) {
		parser.innerHTML = details;
		var a=parser.getElementsByTagName('a');
		status("checking "+a.length+" store items",false);
		for(var i=0;i<a.length;i++) {
			var id,info;
			if(a[i].href && (id=/take&whichitem=(\d*)/.exec(a[i].href)) && (id=id[1])) {
				var q,info,itemName,val,total,static;
				info = a[i].parentNode.previousSibling.previousSibling.previousSibling.firstChild.nodeValue;
				if(q=/\((\d*)\)/.exec(info))q=q[1];else q=1;
				itemName = info.split(' (')[0];
				if(!(val = prices[id])){val=0}else{val=val[0]}
				if(!(static = prices[id])){static=false}else{static=static[1]};
				total=q*val;
				storeTotal+=total;
				storeList.push([itemName,q,val,total,id]);
			}
		}
		status("sorting store list",false);
		storeList.sort(sortbyTotal);
		storeCurrentLists();
	}
}

function generateNewGroups() {
	var listArray = ["inventory","closet","store","hagnks","dc"];
	storedLists=eval(GM_getValue("lastLists_"+playerName,[]));
	for(var i=0;i<storedLists.length;i++){
		var list = storedLists[i];
		var sectionTotal = 0;
		for(var a=0;a<list.length;a++) {

			if(list[a][0]!="Meat") {
				var id=list[a][4];
				var q=list[a][1];
				if(!(static = prices[id])){static=false}else{static=static[1]};
				if(!(val = prices[id])){val=0}else{val=val[0]}
				var total=q*val;
				list[a][2]=val;
				list[a][3]=total*1;
				list[a][5]=static;
			} else {
			 	var total=list[a][3]*1;
			}
			
			sectionTotal+=total;
		}
		list.sort(sortbyTotal);
		eval(listArray[i]+"List = list");
		eval(listArray[i]+"Total = sectionTotal");
	}
	generateReadout();
}
function storeCurrentLists() {
		GM_setValue("lastLists_"+playerName,[inventoryList,closetList,storeList,hagnksList,dcList].toSource());
		generateReadout();
}
function newCheck() {
	//clear variables?
	if(typeof inprogress == "undefined" || inprogress == false) {
		inprogress = true;
		GM_setValue("lastLists_"+playerName,"[]");
		inventoryList = new Array();
		storeList = new Array();
		closetList = new Array();
		hagnksList = new Array();
		dcList = new Array();
		readoutWindow.parentNode.removeChild(readoutWindow);
		doCloset();
	}	
}
function generateReadout() {
	addGlobalStyle(bigCss);
	status('creating display');
	var listArray = [["TOTAL",],["Inv","inventory"],["Closet","closet"],["Store","store"],["Hagnk's","hagnks"],["Case","dc"]];
	
	readoutWindow = document.createElement('div');
	readoutWindow.id = "readoutWindow";
	
	closeImage = document.createElement('img');
	with(closeImage) {
		src=closeGraphic;
		id="closeReadout";
		addEventListener('click',function(e){readoutWindow.style.display='none'},true);
	}
	readoutWindow.appendChild(closeImage);
	
	
	header=document.createElement('div');
	header.id="header";
	
	headerList = document.createElement('ul');
	for(var i=0;i<listArray.length;i++) {
		var listitem = document.createElement('li');
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(listArray[i][0]));
		listitem.id = "tab_"+i;
		listitem.appendChild(span);
		listitem.addEventListener('click',function(e){
			swapId=(e.target.id=="")?e.target.parentNode.id:e.target.id;
			swap(swapId.replace('tab_',''));
		},true);
		if(i==0) {
			listitem.className = "current";
		}
		headerList.appendChild(listitem);
	}
	
	header.appendChild(headerList);
	readoutWindow.appendChild(header);
	
	contentWrapper=document.createElement('div');
	contentWrapper.id = "contentWrapper";
	
	checkUpdates(contentWrapper);
	
	//for each tab
	for(i=0;i<listArray.length;i++) {
		var content = document.createElement('div');
		
		content.id = "content_"+i;
		content.className = "content";
		if(i==0) {
			//TOTAL tab
			
			//create force new check link 
				var forceCheck = document.createElement('div');
				with (forceCheck) {
					className = "total";
					with(style) {
						width = "25em";
						cursor="pointer";
						marginLeft="auto";
						marginRight="auto";
						textAlign = "center";
					}
					appendChild(document.createTextNode('Force new item check'));
					addEventListener('click',newCheck,true);
				}
				content.appendChild(forceCheck);
			// end new link
			totalWorth = 0;
			var sections = new Array([]);
			for(var w=1;w<listArray.length;w++) {
				sections.push(eval(listArray[w][1]+'Total'));
			}
			for(var w=1;w<sections.length;w++) {
				totalWorth+=sections[w]*1;
								
				var meatDiv = document.createElement('div');
				meatDiv.className="total";
				var meatSpan = document.createElement('span');
				meatSpan.className = "subtotalLabel";
				meatSpan.appendChild(document.createTextNode(listArray[w][0]+' Total:' ));
				meatDiv.appendChild(meatSpan);
				
				var amtSpan = document.createElement('span');
				amtSpan.className = "meatAmt";
				amtSpan.appendChild(document.createTextNode(addCommas(sections[w])));
				
				var newWinImg = document.createElement('img');
				newWinImg.src = newDoc;
				newWinImg.name = "newWinImg_"+w;
				newWinImg.className = "newWinImg";
				newWinImg.title = "Display data in new window";
				newWinImg.addEventListener('click',createDocWin,true);
				
				meatDiv.appendChild(amtSpan);
				meatDiv.appendChild(newWinImg);
				content.appendChild(meatDiv);
			}
			
			var meatDiv = document.createElement('div');
			meatDiv.className="grandtotal";
			
			var meatSpan = document.createElement('span');
			meatSpan.appendChild(document.createTextNode("Grand Total:"));
			meatSpan.className = "grandtotalLabel";
			meatDiv.appendChild(meatSpan);
			
			var amtSpan = document.createElement('span');
			amtSpan.className = "meatAmt";
			amtSpan.appendChild(document.createTextNode(addCommas(totalWorth)));
			
			var newWinImg = document.createElement('img');
			newWinImg.src = newDoc;
			newWinImg.className = "newWinImg";
			newWinImg.title = "Display data in new window";
			newWinImg.addEventListener('click',createTotalDocWin,true);
			
			meatDiv.appendChild(amtSpan);
			meatDiv.appendChild(newWinImg);

			content.appendChild(meatDiv);
		} else {
			
		//All tabs following Total
		var zeroPricedItems=0;
		content.style.display = "none";
		
		var meatDiv = document.createElement('div');
		meatDiv.className="total";
		
		var meatSpan = document.createElement('span');
		meatSpan.className = "subtotalLabel";
		meatSpan.appendChild(document.createTextNode(listArray[i][0]+' Subtotal:' ));
		meatDiv.appendChild(meatSpan);
		
		amtSpan = document.createElement('span');
		amtSpan.className = "meatAmt";
		amtSpan.appendChild(document.createTextNode(addCommas(eval(listArray[i][1]+'Total'))));
		
		var newWinImg = document.createElement('img');
		newWinImg.src = newDoc;
		newWinImg.name = "newWinImg_"+i;
		newWinImg.className = "newWinImg";
		newWinImg.title = "Display data in new window";
		newWinImg.addEventListener('click',createDocWin,true);
				
		meatDiv.appendChild(amtSpan);
		meatDiv.appendChild(newWinImg);
		content.appendChild(meatDiv);
		
		//header
		var table = document.createElement('table');
			table.cellPadding = 0;
			table.cellSpacing = 0;
			table.className = "data";
			table.id = "table_"+listArray[i][1];
			var header = document.createElement('thead');
			var headerRow = document.createElement('tr');
			
			var itemCell=headerRow.appendChild(document.createElement('th'));
			itemCell.appendChild(document.createTextNode('Item'));
			itemCell.addEventListener('click',sortByColumn,true);
			itemCell.className = "tableHeader";
			
			var qCell=headerRow.appendChild(document.createElement('th'));
			qCell.appendChild(document.createTextNode('Q'));
			qCell.addEventListener('click',sortByColumn,true);
			qCell.className = "tableHeader";
			
			var priceCell=headerRow.appendChild(document.createElement('th'));
			priceCell.appendChild(document.createTextNode('Price'));
			priceCell.addEventListener('click',sortByColumn,true);
			priceCell.className = "tableHeader";
			
			var extensionCell=headerRow.appendChild(document.createElement('th'));
			extensionCell.addEventListener('click',sortByColumn,true);
			extensionCell.appendChild(document.createTextNode('Extension'));
			extensionCell.className = "tableHeader";
			
			var arrowSpan = document.createElement('span');
			arrowSpan.className = "arrowDown";
			extensionCell.appendChild(arrowSpan);
	
			
		header.appendChild(headerRow);
		table.appendChild(header);
		
		//body
		var tbody = document.createElement('tbody');
		var currentList = eval(listArray[i][1]+"List");
		//for every item in current tab list
		if(currentList.length==0) {
			//create null row
			var row = document.createElement('tr');
			row.className = "odd";
			var cell = document.createElement('td');
			cell.colSpan = 4;
			cell.appendChild(document.createTextNode('Nothing of interest...'));
			
			row.appendChild(cell);
			table.appendChild(row);			
		}
		
		//create tool tip span for cloning
		ttSpan = document.createElement('span');
		ttSpan.className="tooltipSpan";
		ttSpan.appendChild(document.createTextNode('Price probably out of date'));
		

	  
	  //zeroPricedItems=createTableBody(tbody,currentList,true);
		var zeroPricedItems =0;
		for(var x=0;x<currentList.length;x++) {
			var row = document.createElement('tr');
		
	    var desc=document.createElement('td');
	    desc.appendChild(document.createTextNode(currentList[x][0]));
	    row.appendChild(desc);
	    	
	    for(var y=1;y<=3;y++) {
	    	var cell = document.createElement('td');
	    	var cellContent;
	    	if(currentList[x][y] != undefined) {
	    		cellContent = addCommas(currentList[x][y]);
	    	} else {
	    		cellContent = "\u00a0";
	    	}
	    	cell.appendChild(document.createTextNode(cellContent));
	    	//tooltip check
	    	if(y==2 && currentList[x][5]) {
	    		var tooltip = document.createElement('span');
	    		with (tooltip) {
		    		appendChild(document.createTextNode('*'));
		    		appendChild(ttSpan.cloneNode(true));
		    		className = "tooltipHolder";
	    		}
	    		cell.appendChild(tooltip);
	    		cell.className += " tooltipCell";
	    	}
	    	row.appendChild(cell);
	    }
	    tbody.appendChild(row);
	   if(currentList[x][3]*1==0) {
	  		row.style.display = "none";
	  		zeroPricedItems++;
	   	}
	  }
	  rowStripe(tbody);
	 


	  //footer
		var footer=document.createElement('tfoot');
			var footerRow=document.createElement('tr');
			footer.className = "footer";
			var footerCell = footerRow.appendChild(document.createElement('td'));
			footerCell.colSpan = 4;
			var footerSpan = footerCell.appendChild(document.createElement('span'))
			footerSpan.appendChild(document.createTextNode('Toggle '+zeroPricedItems+' zero meat item(s)'));
		  footerSpan.addEventListener('click',function(e){
		  	unhideRows(getParent(e.target,"table").tBodies[0]);
				},true);
	  footer.appendChild(footerRow);
		table.appendChild(footer);
	  
		table.appendChild(tbody);
		content.appendChild(table);
		}
		contentWrapper.appendChild(content);
	}
	readoutWindow.appendChild(contentWrapper);
	document.body.appendChild(readoutWindow);
	
	GM_setValue('totalValue_'+playerName,totalWorth);
	statusLocation.nodeValue = addCommas(GM_getValue('totalValue_'+playerName,'uncalculated'));
	inProgress = false;
}
function sortByColumn(evt) {
	
	var sortTarget = (evt.target.nodeName !="th")?getParent(evt.target,"th"):evt.target;
	var descending = sortTarget._descending;
	if(descending) {
		sortTarget._descending = false;
	} else {
		sortTarget._descending = true;
	}
	var arrowSpan = getParent(evt.target,"tr").getElementsByTagName('span')[0];
	arrowSpan.className = (descending)?"arrowUp":"arrowDown";
	sortTarget.appendChild(arrowSpan);
	
	var docFrag = document.createDocumentFragment();
	var tbody = getParent(sortTarget,"table").tBodies[0];
	var rowToSort = sortTarget.cellIndex;
	var rows = tbody.childNodes;
	var tempSortArray = new Array();
	for (var i=0;i<rows.length;i++) {
		tempSortArray[i] = rows[i];
	}
	//check for direction somehow
	tempSortArray.sort(compareByColumn(rowToSort,descending));
	for (var i=0; i<tempSortArray.length; i++) {
		docFrag.appendChild(tempSortArray[i]);
	}
	rowStripe(docFrag);
	tbody.appendChild(docFrag);
	
}

function createDocWin(evt) {
	var listArray = [["Inventory","inventory"],["Closet","closet"],["Store","store"],["Hagnk's","hagnks"],["Display Case","dc"]];
	if(evt.target.name) {
		var targetItem = evt.target.name.replace("newWinImg_","")*1-1;
		var currentList = eval(listArray[targetItem][1]+"List");
		var currentName = listArray[targetItem][0];
		var myDocWrite = "";
		var currentListLength =currentList.length;
		for(var i=0;i<currentListLength;i++){
			myDocWrite+="\n";
			myDocWrite+=currentList[i].slice(0,4).join("\t");		
		}
		var readoutWindow = window.open("","_blank","scrollbars=1,resizable=1,status=1,width=600,height=600");
		readoutWindow.document.open("text/plain");
		readoutWindow.document.write("UpUp.us Pricegun: "+currentName+" List\n");
		readoutWindow.document.write("Item Name\tQuantity\tPrice\tExtension");
		readoutWindow.document.write(myDocWrite);
		readoutWindow.document.close();
	}
}
function createTotalDocWin(evt) {
	var listArray = [["Inventory","inventory"],["Closet","closet"],["Store","store"],["Hagnk's","hagnks"],["Display Case","dc"]];
	var myDocWrite = "";
	var listArrayLength=listArray.length;
	for(var a=0;a<listArrayLength;a++) {
		var currentList = eval(listArray[a][1]+"List");
		var currentName = listArray[a][0];
		myDocWrite+="\n\n"+currentName+" List\n";
		myDocWrite+="Item Name\tQuantity\tPrice\tExtension";
		var currentListLength=currentList.length;
		for(var i=0;i<currentListLength;i++){
			myDocWrite+="\n";
			myDocWrite+=currentList[i].slice(0,4).join("\t");		
		}
	}
	var readoutWindow = window.open("","_blank","scrollbars=1,resizable=1,status=1,width=600,height=600");
	readoutWindow.document.open("text/plain");
	readoutWindow.document.write("UpUp.us Pricegun: All Items");
	readoutWindow.document.write(myDocWrite);
	readoutWindow.document.close();
}

function compareByColumn(nCol, bDescending) {
	var c = nCol;
	var d = bDescending?-1:1;
	function _compare(n1, n2) {
		if(c!=0) {
			var x=n1.cells[c].firstChild.nodeValue.replace(/,/g,'')*1;
			var y=n2.cells[c].firstChild.nodeValue.replace(/,/g,'')*1;
			return (y-x)*d;
		} else {
				var x=n1.cells[0].firstChild.nodeValue.toLowerCase();
				var y=n2.cells[0].firstChild.nodeValue.toLowerCase();
				if (x < y)	{
					return d;
				}	else if (x > y)	{
					return d*-1;
				} else {
					return 0;
				}			
		}
	}
	return _compare;
}

function getParent(el, pTagName) {
	if (el == null) {
		return null;
	} else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase()) {	// Gecko bug, supposed to be uppercase
		return el;
	} else {
		return getParent(el.parentNode, pTagName);
	}
}


function rowStripe(tbody) {
	var visibleRows=0;
	var nodes=tbody.childNodes;
	var len=nodes.length;
	for(var i=0;i<len;i++) {
		var item=nodes[i];
		if(item.style.display=="none") {
		} else {
			visibleRows++;
			if(visibleRows % 2 == 0) {
				item.className = "even";
	    } else {
	      item.className = "odd";
	    }
		}		
  }
}
function unhideRows(tbody) {
	var rows=tbody.rows;
	for(var i=0;i<rows.length;i++) {
		if(rows[i].cells[2].textContent=="0") {
			rows[i].style.display = (rows[i].style.display == "none") ? "table-row" : "none";
		}
	}
	rowStripe(tbody);
	//fix height. This is a godawful hack for missing max-height for table elements.
	if(tbody.scrollHeight<=maxTableHeight){tbody.style.height = ""}else{tbody.style.height = maxTableHeight +"px";}
}
				
/* -------------
   utility functions
   ------------- */
   
function status(string,clear) {
	if(typeof statusLocation !="undefined") {
		statusLocation.nodeValue = string + "...";
	}
}
function getItemList(callback) {
	status('retrieving item list');
	//use kolmafia's item list:
	GM_get("kolmafia.svn.sourceforge.net/svnroot/kolmafia/src/data/itemdescs.txt",parseItems);
	//GM_get("max.subfighter.com/kol/texts/itemdb.txt",parseItems);
	function parseItems(itemList) {
		status('parsing item list');
		
		var currentTime = parseInt(new Date().getTime()/60000);
		GM_setValue("lastItemUpdate",currentTime);
		
		//remove double tabs
		//itemList = itemList.replace(/\t\t/g,'\t');
		//remove trailing tabs
		
		itemList = itemList.replace(/\t\r\n/g,'\r\n');
		//remove trailing spaces from lines
		itemList = itemList.replace(/ \r\n/g,'\r\n');
		//remove trailing spaces from item and description Ids
		itemList = itemList.replace(/ \t/g,'\t');
		//remove carriage returns
		itemList = itemList.replace(/\r/g,'');
		//split by line
		var a=itemList.split('\n');
		
		for(var i=0;i<a.length;i++){
			if(/[0-9]/.test(a[i].charAt(0))) { 
				var split = a[i].split('\t'); 
				if(split[0] && split[1] && split[2]){
					items[split[1]]=[split[0],split[2]];
				}
			}
		}
		/*var itemsLength=0;
		for(a in items)itemsLength++;
		GM_log('parsed '+itemsLength+' items');*/
		GM_setValue('storedItemList',items.toSource());
		if( typeof callback=='function' ){
			callback();
		}
	}
}

function unstoreItemList(callback) {
	storedItemList = eval(GM_getValue('storedItemList','({})'));
	itemListLength=0;
	for(var i in storedItemList){itemListLength++;}
	
	var currentTime = parseInt(new Date().getTime()/60000);
	lastUpdate = GM_getValue("lastItemUpdate",1);
	
	//check every 3 weeks.
	if(itemListLength==0 || (currentTime-lastUpdate)>30240) {
		//if there's no itemlist
		getItemList(returnItemList);
	} else {
		returnItemList(true);
	}
	function returnItemList(skip) {
		if(!skip) {
			storedItemList = eval(GM_getValue('storedItemList','({})'));
		}
		items = storedItemList;
		if( typeof callback=='function' ){
			callback();			 
		}
	}
}
function checkUpdates(target) {
//	showNeedUpdate();
	if(GM_getValue('newestVersion',0)*1 > currentVersion) {
		updateLink=document.createElement('a');
		updateLink.target="_blank";
		updateLink.title="Right-click to install";
		updateLink.href="http://kol.upup.us/"+GM_getValue('scriptLocation','scripts/pricegun.user.js');
		updateImage = document.createElement('img');
		updateImage.src = updateGraphic;
		updateImage.border="0";
		
		with(updateLink.style) {
			position = "absolute";
			right="0px";
			top="0px";
			zIndex="999";
			margin="0px";
			padding="0px";
		}
		if(target.style.position == "") {
			target.style.position = "relative";
		}
		updateLink.appendChild(updateImage)
		target.appendChild(updateLink);
	}
}

function getPriceList(callback) {
	
	var tempPrices = new Object();
	var tempComboCases = new Array();
	var tempSpecialCases = new Object();
	
	status("retrieving new price list");
	GM_get("kol.upup.us/scripts/worth/dailyprice.log",parsePrices);
	
	function parsePrices(pricelist) {
		status('parsing price list');
		
		var currentTime = parseInt(new Date().getTime()/60000);
		GM_setValue("lastPriceUpdate",currentTime);
		
		var foundStatic = false;
		var foundHardcoded = false;
		var foundCombo = false;
		
		//parse prices from file
		var a=pricelist.split('\r\n');
		
		//do version stuff
		var results = /^# Script Version: ([0-9.]+) ([\w./_-]+)/gi.exec(a[0]);
		if(results!=null){
			var newestVersion = results[1];
			var scriptLocation = results[2];
			GM_setValue('newestVersion',newestVersion);
			GM_setValue('scriptLocation',scriptLocation);
		}
		
		
		for(var i=0;i<a.length;i++){
			//for each line of file
			
			if(/[0-9]/.test(a[i].charAt(0))) {
				//if line starts with a number
				
				var split = a[i].split(' '); 
				if(split.length==6) {
					if(foundStatic){
						tempPrices[split[1]]=[split[5],true]
					} else {
						tempPrices[split[1]]=[split[5],false]
					}
				}
				
			} else if(a[i].indexOf('hardcoded as below') != -1) {
				foundStatic = true;
			} else if (a[i].indexOf('specialHardcoded') != -1) {
				foundStatic = false;
				foundHardcoded = true;
			} else if (a[i].indexOf('specialCombo') != -1) {
				foundStatic = false
				foundHardcoded = false;
				foundCombo = true;
				//check for hardcoded lines
			} else if (/# [0-9]$/.test(a[i].substring(0,3))) {
				//line begins with # number
				//hardcoded or combo
				//split line by spaces
				var split = a[i].split(' ');
				if(foundHardcoded) {
					if(split.length==3) {
						tempSpecialCases[split[1]] = split[2];
					}
					//split hardcoded
				} else if (foundCombo) {
					if(split.length>2) {
						tempComboCases.push(split.slice(1));
					}
				}
			}
		}
		
		GM_setValue('storedSpecialCases',tempSpecialCases.toSource());
		GM_setValue('storedComboCases',tempComboCases.toSource());
		
		//push hard coded prices
		for(id in tempSpecialCases) {
			if(tempPrices[id] == null){
				tempPrices[id] = [tempSpecialCases[id],false];
			} else {
				tempPrices[id][0] = Math.min(tempSpecialCases[id],tempPrices[id][0]);
			}
		}
		
		//push hardcoded combinations (ex: prevent skewered limes outpricing TPS + lime)
		for(var f=0;f<tempComboCases.length;f++) {
			var totalPrice=0;
			var fail=false;
			var item = tempComboCases[f];
			var id=item[0];
			var p;
			switch(item[1]) {
				//item is worth no more than sum of its parts
				case "+":
					for(var i=2;i<item.length;i++) {
						if(p=tempPrices[item[i]]){totalPrice += p[0]*1;}else{fail=true;};
					}
					if(!fail){tempPrices[id]=[Math.min(totalPrice,tempPrices[id]?tempPrices[id][0]:Infinity),tempPrices[id]?tempPrices[id][1]:false]};
				break;
				case "*":
					//item worth the value of another item * a number.
					if(p=tempPrices[item[2]]){totalPrice=p[0]*item[3]} else {fail=true;};
					if(!fail){tempPrices[id]=[Math.min(totalPrice,tempPrices[id]?tempPrices[id][0]:Infinity),tempPrices[id]?tempPrices[id][1]:false]}
				break;
				case "=":
					if(p=tempPrices[item[2]]){tempPrices[id]=[Math.min(p[0],tempPrices[id]?tempPrices[id][0]:Infinity),tempPrices[id]?tempPrices[id][1]:false]}
				break;
				case "==":
					//all items in a group worth the group's lowest item price
					var tempMin=Infinity;
					var tempDated=false;
					for(var i=2;i<item.length;i++) {
						if(p=tempPrices[item[i]]){
							if(p[0]*1<tempMin) {
								tempDated=p[1];
								tempMin=p[0]*1;
							}
						}
					}
					if(tempMin==Infinity)tempMin=0;
					for(var i=2;i<item.length;i++) {
						tempPrices[item[i]]=[tempMin,tempDated];
					}
				break;
				case "min":
					//one item worth the lowest price of a group.
					var tempMin=tempPrices[id]?tempPrices[id][0]:Infinity;
					for(var i=2;i<item.length;i++) {
						if(p=tempPrices[item[i]])tempMin=Math.min(tempMin,p[0]*1);
					}
					if(tempMin<Infinity)tempPrices[id]=[tempMin,false];
				break;
			}
		}
		GM_setValue('storedPriceList',tempPrices.toSource());
		
		if(typeof callback=='function'){
			callback();
		}
	}
}

function unstorePriceList(callback) {
	storedPriceList = eval(GM_getValue('storedPriceList','({})'));
	storedSpecialCases = eval(GM_getValue('storedSpecialCases','({})'));
	storedComboCases = eval(GM_getValue('storedComboCases','({})'))
	
	priceListLength=0,specialCasesLength=0;
	
	for(var i in storedPriceList){priceListLength++;}
	for(var i in storedSpecialCases){specialCasesLength++;}
	
	var currentTime = new Date().getTime()/60000;
	
	lastUpdate = GM_getValue("lastPriceUpdate",currentTime);
	
	if(priceListLength==0 || specialCasesLength==0 || (currentTime-lastUpdate)>2400) {
		//if there's no price list, special list, or if it's been more than x hours since the last update...
		getPriceList(returnPriceList);
	} else {
		returnPriceList(true);
		//return storedPriceList;
	}
	function returnPriceList(skip) {
		if(!skip) {
			storedPriceList = eval(GM_getValue('storedPriceList','({})'));
		}
		prices = storedPriceList;
		
		if( typeof callback=='function' ){
			callback();			
		}
	}
}

function sortbyTotal(a,b) {
	x=a[3]*1;
	y=b[3]*1;
	c=a[0].toLowerCase();
	d=b[0].toLowerCase();
	if (y<x) return -1;
  if (y>x) return 1;
  if (c<d) return -1;
  if (c>d) return 1;
	return y-x;
}

function swap(tab) {
	document.getElementById("tab_"+activetab).className = "";
	document.getElementById("content_"+activetab).style.display = "none";
	activetab = tab;
	document.getElementById("tab_"+activetab).className = "current";
	document.getElementById("content_"+activetab).style.display = "block";
	if(tab!=0) {
		// more ugly workarounds for missing table max-height 
		var tbody = document.getElementById("content_"+activetab).getElementsByTagName('tbody')[0];
		if(tbody.scrollHeight<=maxTableHeight){tbody.style.height = ""}else{tbody.style.height = maxTableHeight +"px";}
	}
}

function parseFromForm(formname,sectionTotal,sectionList) {
	var fs,f,opts;
	if((fs=parser.getElementsByTagName('form')) && (f=fs.namedItem(formname)) && (opts=f.elements.namedItem('whichitem1').options)) {
		status("parsing "+(opts.length-1)+" items");
		for(var i=1;i<opts.length;i++) {
			var id,info,q,itemName,total,static;
			id=opts[i].value;
			info=opts[i].textContent;
			if(q=/\((\d*)\)/.exec(info))q=q[1];else q=1;
			itemName = info.split(' (')[0];
			if(!(val = prices[id])){val=0}else{val=val[0]}
			if(!(static = prices[id])){static=false}else{static=static[1]};
			total=q*val;
			sectionTotal+=total;
			sectionList.push([itemName,q,val,total,id,static]);
		}
	}
	return{total:sectionTotal,list:sectionList}
}

function addCommas(nCma) {
	nCma += '';
	x = nCma.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
function toggle(item)
{
   if (!item)return;
   item.style.display = (item.style.display == "none") ? "block" : "none";
}
function addGlobalStyle(css,styleid) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    if(typeof styleid == "string")style.id=styleid;
    head.appendChild(style);
}
function GM_get( dest, callback )
{
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: 'http://' + dest,
		onload:function(details) {
			if( typeof callback=='function' ){
				callback(details.responseText);
			}
		}
	});
}
