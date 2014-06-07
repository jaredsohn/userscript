// coding: utf-8
// ==UserScript==
// @name          Hero of War magyar segédlet
// @namespace     
// @description   Magyar nyelvű leírás és taktikák a Hero of War játékhoz.
// @version       1.1
// @include       http://m.heronow.com/heroofwar/*
// ==/UserScript==

GM_addStyle('#youlong {margin-top : 25px !important;}');

var segedpng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAYCAIAAAC+8q7fAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAk2SURBVHja7FnNixzHFX8FayHbODW5RAItdAsiYyRDz8onXbYFJlIEzvRawb72Gl98sXvyD+ysSZyADu71TQfbPYHEkKD1rPHFBq175Y8oOSy9Acdrw4ruWSSYw6x7VssKBWZSObyZ16+qe9YmEOeSYmG7q+rV+/q9Vz3vCQX/Hz/EmIHTNigBoAAECAUwfgQFIAQoegEAACEAAJQCIYptoCY7iRAAoDh2PNizoEOQL+jkYnzseIr245woRCxEY4doooLGfawgO3P8IAqRADTuZJMxC6a1NgQIVZ4DhfNiBqzTjIcCYCbDZ6GTKmDi6m4A3bLIWOiHKLZTlDyhJoppYjCvI4maiKd5vaSlIhl0RyvBjFVy29jNtHkCBTKOMEzEocbMLSZqKgFCzYBtV2GO6U9+Bh0dY8YlNUC36bRVWh7bSJgnF3YvLx3BDwquFQJUyFExWRCqMZ6EqMoHVYSiFPGCUocGRpXtD9a+2m5euKCBlcmvicIRCsaznnPGuNaTDJTIRcloZQ4VoSq0YK8gn/ClnYKCkue6Ct2mijL5v3L7dntrq3b8+Favt1ivr1y5wlbHsTIDts2SkQBQ7c7a6x99NDh+fPnq80WggQIFG19/vbXbbV6+XCQ1EzOleKdIV3qQ0mYtY4qKYFeGR42UPcVMReCXYcATF4eOqIoMRShp/uG99mefLT+/0Pz5ZU6y+JMTmfrX4PDBrSyrP/002Lae3DGPfvopCysABYPDQ/uFF2pPPJH9+U8TK4+H/eKL3V4vfuuti3NzVYlE6bAvBSyPKSO04bviWrFY1gLLuME0gXWO5Zv56HzHdipY/N1vs15v5dVX62d+WqGjUsvt9utRlLzzTv3MGS3FKTFBtHabQw1g4cqV39+4kT3yiH1qllCwcfsv3V4PAGpPPgmn7erA58HLr1MFADC4f3/rq39cvHDB/HgwT9LD3/yGYTqI6UnG+GQyMhX/RCkJkt29O9jfr587R4wGB/ebQbN+7qyZCRnh1r17AFD/2SUt+dCxqmq4rgsAYRjySd/3oUQSRZHneb7vR1EUx7Hv+2ma8g046XleGIau6zqOo6aMMAzzPCcqz/M8z6NjkySppMrzvNVqtVqt8rzrur7v88k0TYMgcF03CALihZtRPFTE0J1WgyAwtCOqTqdjWZbrutO0qzY0GpQbJY5jnJFSGqb3PA8dY5DwDeSkIAhoybIsLjfuVEoFQYDPnuchFWeqlLIsCy3Y6XSklGW+SqlWqwUAXHO0oGVZeD75IM9z1KvVapEi5NckSaSUuCql5Iwcx0GN8IFr970MjTZFlsTPcRw0FokehiEAdDod/sqRhTNRFOErqme8krZJkuBqp9PhgEJhODDzPEcx4jiWUsZxHEURhyf3MTkyTVMppWVZxIuM4jgOd7llWRS1eZ7ja57neZ5LKUn9IAiQe6V2KDl3c4Wh0XWoIULM930pJWmI26SUHBSILDIQzqBipBsAoGSEDtSBAI5ql1HD/YcIMPQsD8QvEqZpiueEYZgkCVoW+eI2MjrGAQqASEc3p2mKRkB/GK5CL5J2pD6hsNrQjuOgNVEldGmn00nTlERHN5ADPc/DbcQJox5FQVwQNFzXtSwrSRIEL+JRSokP3KxoTT6D2lIGUEcOTAhhGGLsYwpCrGCkYlqgwI2iCIWkcOFUlmWh4cgBpCwy4nGACeCo1FGpKhoUjcsNjfhFTTBR+L4fxzExxjtQSolXEArteR5FumVZnufhKh2LFqRLCTVP09R1XSTHc8rpwhgYzuhU5B7HMaUIbkq80qWUCFXLslAjBHgYhkSVJAmuUtr0fR+hiYZGKzuOY4gHlQma5xpjCQ2NAqEFUQFcpSuRcgVeI2maonw8mjhCEVPoZuSCYmAY4UCTYfI1voiMgZbFMEIXosOQivJAFEU4T4DFV8dxeIpAbKZpihkvCAKMRbyT0T1oaDR62coVhi7faYahMWvTpUFhiAhyXZdo0zRFLKAz+E1SmUl5znEch98zeCxKjxuOhrPruhg3lmVRmqYvCtSCQxsHRowhD30vUUrhlySGGtkNT66UDUZqNBz/DYdqOFSj1c77m8nm5HU4WRptJpsA0PAao8nkZrI5KgiHI5NkuNRaklLOu/N30h0ppevOG2fOu/MNr8F4DYdqtB5/MmIHjtSIn9zP+5vJJhN4vIcLMO/OI+IaXmMv708EHu2kO+vxJ/28z8l30p2G15BSLrWW3u+sAsBqZ5VxHN5Jd9bj9Z10h3NEMejkkRqux+sk2EjTaDhUQ3FH3VEVVSPjl6iqrF8Zv45pDn/VvbLwys0Pbl6Lrv1y8er9wcHcj+dea70WLAe46WCw/+vmb7a3tt/b+OOParJcM2S/6/U6gFaOKPMdl1H+tvHXU/bsrH1KL8QZv63hbnbvufpzs/bs9bXrs/bsuyvvvvGrNz5MPjxbP/sfVPdVUbghkcZqzGTQrSoVTytzmeUWqtCwUo1SAL2sd/ODm1eDq88sPpPB7mr7xuPy8Webz345+PLa4rUT9omP2x+ftE++ufHmt7X8W8j1+s0RVTgNEuWiNRUTTlw8OYJhF3aVqZemyura6sH+QbPdHNrDLmRvr7x9yb/0WP2xDLKjK3hGbZ+VrsdcJuW0SYelCymhlRWAFZXuhfnAK+eCuYgXj9WD2oNH5aO31m4ds4/tZf3P21+83H55r7Z3ODjczXb7g/5L7ZfOL5zfg70+9AU7X6/kK16QZ/ZSrIlSUQfiak8U4WUtmFT/4J+1hwBwffn63ML5L9qfH6sda6z8ogtd0MrkRltF8FI9q84AFHYoVWpaamlKbcYoivBOiZpSgdaQtZ8Nttp/zzYy+6LtLDo1u6aXO7VWhF5Mqogfo4z9nVgrdbpA6VVQKpVur21/s/bNw8HDpxaechYdI4J5n02YhahK3c2qFQJI+Mqf3rrQskypLUj1ZuC9P75BlSt4RQ+qQASvxekNRNALd0JVVDCNaiko1vsq3zS8l6WKZpRgiZ/308pBoIzipH4+CC2AirbbDCaj/+r4HpnuBx3/E3lmutBVrKWjZz2lF9IriuXltM4wVTQ1jd44FCS8WUIYNHvmLGgAiu4Iv+K1LgPonRu9412EJu8K82Y4486/H5TeUdb62Uc0EJDw3wMAFHUcNRY++jgAAAAASUVORK5CYII=";

setTimeout(run, 1000);

function run(){
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id','zcontainer');
	document.body.appendChild(newdiv);
if ( newdiv != null) {
	newdiv.innerHTML = '<div id="seged" style="position:fixed; left:0px; top:0px; color:#000;"><img id="seged" src="'+segedpng+'" style="position:fixed; top:3px; right:97px; cursor:pointer;" value="Segéd" /></div><iframe id="magyarhirek" src="http://people.inf.elte.hu/zamek/seged/news.php" style="width:365px;height:25px;overflow:hidden;left:170px;top:0px;position:fixed;z-index:9999;border:0px;"></iframe><iframe id="magyarseged" src="http://people.inf.elte.hu/zamek/seged/index.php" style="display:none;width:310px;height:370px;overflow:hidden;right:2px;top:30px;position:fixed;z-index:9999;border:0px;"></iframe>'
	addButtonListener();
}
}
function addButtonListener(){
if (document.getElementById("seged") != null) {
  var button = document.getElementById("seged");
  button.addEventListener('click',seged,true);}
}
function seged(){
	if (document.getElementById("magyarseged").style.display == "none"){document.getElementById("magyarseged").style.display="block"}
	else {document.getElementById("magyarseged").style.display="none";}
	
	
}