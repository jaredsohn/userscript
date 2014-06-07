// ==UserScript==
// @name           MCL quick coaster
// @namespace      userscripts.org
// @description    Similar to the quick-quote function, but for sending a coaster.
// @include        http://mycoffeelounge.net/*
// @include        http://*.mycoffeelounge.net/*
// ==/UserScript==

var dURL = document.URL;

GM_addStyle(".icanHazCostr { width:500px; height:280px;position:absolute;background-color:#eee9e9;border:6px solid #90BEDC;padding:10px}"+
			".wewes{text-decoration:none;float:left;margin-top:-23px;font:bold 18px Arial;opacity:0.1;}"+
			".wewes:hover{opacity:0.5;} "+
			".wewes2{text-decoration:none;font:bold 18px Arial;opacity:0.3;float:right;margin:-25px 40px 0 0;}"+
			".wewes2:hover{opacity:0.5;text-decoration:none !important;} ");

function makeCoaster(l, event, u){

	event.preventDefault();

	var d = document.createElement('div');
	
	d.setAttribute('class', 'icanHazCostr');
	d.style.top = event.pageY-200;
	d.style.left = event.pageX-550;
	
	var wto = l.href.slice(l.href.lastIndexOf('/')+1);
	var texC = l.textContent;
	
	if(u=='members'){

		d.style.left = event.pageX+20;
				
		
	}	
	else if(u=='replies'){
	
		wto = l.href;
		var getO = l.parentNode.lastChild.previousSibling.getAttribute('onclick'); //fucken text nodes!!!
		texC = getO.slice(getO.lastIndexOf(',')+1, getO.indexOf(')'));
	
	}
	
	d.innerHTML = '<form class="rfm" name="rfm" method="post" action="coasters.php?page=write&to='+wto+'&rt=" >'+
					'<a style="float:right;text-decoration:underline;" class="canc" href="#">Cancel</a>'+
					'<input class="" type="hidden" value="" name="post2"/>'+
					'<b>To:</b> '+texC+
					'<p><b>Subject:</b> <input type="text" maxlength="60" size="60" value="" name="csubject"/></p>'+
					'<br/><textarea rows="10" cols="60" tabindex="2" id="body1" name="body1"></textarea>'+
					'<input type="submit" value="check spelling/preview" id="preview" name="preview"/>'+
					'<input type="submit" value="Send Coaster" id="post3" name="post3"/></form>';
					
	l.parentNode.appendChild(d);

	window.setTimeout(function(){
	
		var canCElC = document.evaluate( '//a[@class="canc"]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		
		for (var m = 0; m < canCElC.snapshotLength; m++){
		
			var im = canCElC.snapshotItem(m);

			if(!im.hasAttribute('onclick')){
			
				im.addEventListener('click', function(ent) {
				
						ent.preventDefault();

						this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
						
				}, false);	
			
			}

		}
		
	}, 10);
	
}

if(dURL.match('forum-recent')){

	var firstLink;

	function grabLinks(){
	
		var fRecProf = document.evaluate( '//a[contains(@href, "profile")][ not( @class = "skyblue" )]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		
		if(firstLink != fRecProf.snapshotItem(0)){

			firstLink = fRecProf.snapshotItem(0);
		
			for(var s = 0; s < fRecProf.snapshotLength; s++){
			
				var cThis = fRecProf.snapshotItem(s);
				
				var w = document.createElement('a');
				w.href='#';
				w.textContent='C';
				w.setAttribute('class', 'wewes');
				
				var pN = cThis.parentNode;
				var aS = cThis.parentNode.getElementsByTagName('a');
				
				if(aS.length>1){
				
					cThis.parentNode.replaceChild(w, aS[1]);
					
				}
				else{
				
					cThis.parentNode.appendChild(w);
				
				}
				
				w.addEventListener('click', function(ev) {
				
						makeCoaster(this.parentNode.childNodes[0], ev, 'recent');
						
				}, false);

			
			}
		
		}

	}
	
	grabLinks();
	
	window.setInterval(grabLinks, 1000);

}
if(dURL.match('forum-replies')){

	var threadC = document.evaluate( '//a[@title= "Send a private message"]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for (var k = 0; k < threadC.snapshotLength; k++){
				
			var cT = threadC.snapshotItem(k);
		
			var qc = document.createElement('a');
			qc.href='#';
			qc.textContent='QC';
			qc.title='Quick Coaster';
			qc.setAttribute('class', 'qc');
			
			var sl = cT.nextSibling;

			slClone = sl.nextSibling.cloneNode(true); //bloody text nodes
			
			slClone.style.margin = '0 4px';
		
			cT.parentNode.insertBefore(slClone, sl);
			cT.parentNode.insertBefore(qc, cT.nextSibling.nextSibling);

			qc.addEventListener('click', function(eve) {
			
					makeCoaster(this.previousSibling.previousSibling, eve, 'replies');
					
			}, false);

	}

}
if(dURL == 'http://mycoffeelounge.net/members.php'){

	var mems = document.evaluate( '//a[contains(@href, "profile")][ not( @class = "skyblue" )]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for (var l = 0; l < mems.snapshotLength; l++){
	
		var cThis = mems.snapshotItem(l);

		var w = document.createElement('a');
		w.href='#';
		w.textContent='C';
		w.setAttribute('class', 'wewes2');
	
		cThis.parentNode.appendChild(w);
		
		w.addEventListener('click', function(ev) {
		
				makeCoaster(this.parentNode.childNodes[0], ev, 'members');
				
		}, false);

	}	

}


