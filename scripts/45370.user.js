// ==UserScript==

// @name           	just_the_best_survived_nominations
// @namespace      	http://www.flickr.com/photos/lunadictos/
// @creator        	caro@lunadictos.net
// @description 	Blendet die "just the best survived"-Nominationen über dem Kommentarfeld ein.
// @version        	0.1
// @inspiredBy		http://6v8.gamboni.org/IMG/js/flickreasyphotopost.user.js
// @include        	http://www.flickr.com/photos/*

// ==/UserScript==

(function () {

	/*
	  Xpath trickery, from:
	  http://ecmanaut.blogspot.com/2006/07/expressive-user-scripts-with-xpath-and.html
	 */
	function $x( xpath, root )
		{
			var doc = root ? root.evaluate?root:root.ownerDocument : document;
			var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
			var result = [];
			while( next = got.iterateNext() )
				result.push( next );
			return result;
		}

	var jbsNomination = function() {this.init();}

	jbsNomination.prototype = {	
		getNomination: function( imageLink, colorName ) {
			var ul = document.createElement('ul');
			ul.setAttribute("style","margin:0;list-style-type:none;");
			
			var li = ul.appendChild(document.createElement('li'));
			li.setAttribute("style","display:inline;margin:.5em;");
			var a = li.appendChild(document.createElement('a'));
			var img = a.appendChild(document.createElement('img'));
			img.src =imageLink;
			img.alt='JTBS nomination banner '+colorName;
			img.width="250";
			img.height="57";
			a.href="javascript:;";
			a.addEventListener('click',function(evt) {
								   allTextAreas = $x('//textarea[@name="message"]',	document);
								   
									var mesg = "<b>you are "+colorName+" nominated for the weekly award! \"just the best survived\" the contest group</b>"
									+"<a href=http://www.flickr.com/groups/just-the-best-survived><img src="+imageLink+" width=500 height=119 alt=JTBS nomination banner "+colorName+"/></a>";

								   for (var i = 0; i < allTextAreas.length; i++) {
									   thisTextArea = allTextAreas[i];
									   try{
										   thisTextArea.value = thisTextArea.value.substr(0,thisTextArea.selectionStart) 
										   + mesg
										   + thisTextArea.value.substr(thisTextArea.selectionStart);
									   } catch(e) {
										   thisTextArea.value +=  mesg;
									   }
									   
								   }
								   
							   },true);
			return ul;

		},
		
		createNominator: function() {
			var outerdiv = document.createElement('div');
			var show = outerdiv.appendChild(document.createElement('a'));
			show.href="javascript:;";
			var div = outerdiv.appendChild(document.createElement('div'));
			div.style.display = 'none';

			show.innerHTML = 'Post JTBS nomination';
			show.addEventListener('click',function(evt) {
				show.style.display = 'none';
				div.style.display = '';
			},true);
			
			div.appendChild( this.getNomination( 'http://farm4.static.flickr.com/3416/3341972939_45a33c856e.jpg', 'gold' ) );
			div.appendChild( this.getNomination( 'http://farm4.static.flickr.com/3606/3342808360_43c6a1ce9e.jpg', 'silver' ) );
			div.appendChild( this.getNomination( 'http://farm4.static.flickr.com/3597/3342808484_de20176d6b.jpg', 'bronze' ) );			

			var hide = div.appendChild(document.createElement('a'));
			hide.innerHTML = 'Hide JTBS nomination banners';
			hide.addEventListener('click',function(evt) {
				show.style.display = '';
				div.style.display = 'none';
			},true);
			hide.href="javascript:;";

			return outerdiv;
		},

		init: function() {
			//insert the commenter stuff.
			var arse = this.createNominator();
			if(arse != null) {
				var allLinks, thisLink;
				allLinks = $x('//div[@id="DiscussPhoto"]/h3',document);
				for (var i = 0; i < allLinks.length; i++) {
					thisLink = allLinks[i];
					thisLink.parentNode.insertBefore(arse, thisLink.nextSibling);
				}
			}
		}

	}

	
	//======================================================================
	// launch

	jtbsLink = /\/groups\/just-the-best-survived\/pool\//;

	hrefs=document.getElementsByTagName("a");

	for (var i=0; i<hrefs.length; i++) {
		link=hrefs[i].getAttribute("href");
		match=jtbsLink.exec(link);
		if (match) {
			new jbsNomination();	
			break;
		}
	}

})();
