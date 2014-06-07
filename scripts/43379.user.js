// ==UserScript==
// @name           Travian Building Time Cost
// @namespace      zm
// @include        http://*.travian.*/build.php*
// ==/UserScript==

(function () {


	function calculateBuildingsTimeCost(){


            var ElementXpath = "//td[contains(img/@src, 'r/') and img/@title!='']/following-sibling::td[1]";
	    var vitesses = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

/*            ElementXpath = "//td[contains(text()[last()],':') and contains(text()[1],'|')]/text()[following-sibling::text()[2]]";
	    var couts = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
*/
            ElementXpath = "//td[contains(text()[last()],':') and contains(img[1]/following-sibling::text()[1],'|')]";
	    var buildingCosts = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);



            function getDuration(u_per_hour, nb_total, u){

                     diff = nb_total -u;
                     if( diff<1 ){
                           return 0
                     }
                h = Math.floor((diff/u_per_hour));
                m = Math.round((diff - u_per_hour*h)/u_per_hour*60);

                return h+'h'+(m<10 ? '0'+m : m);

            }

            var ressources = ['wood', 'clay', 'iron', 'crop'];
            var c = {};
            var nb = {};

            if( vitesses.snapshotLength==4 ){

                for(i=0; i<vitesses.snapshotLength; i++){

                  nb[i] = (tag=vitesses.snapshotItem(i)).textContent.substring( 0, tag.textContent.indexOf('/') );
                  c[i] = tag.getAttribute('title');
                }

                //alert( ' ' + c[0] +' ' +c[1]+' '+c[2]+' '+c[3]+' / ' + nb[0] +' ' +nb[1]+' '+nb[2]+' '+nb[3] );

            }
            //alert( buildingCosts.snapshotLength );
	    for (b=0; b<buildingCosts.snapshotLength ; b++){

	        tag = buildingCosts.snapshotItem(b);

                children = tag.childNodes;

                var infiniteToWait = false;
                var maxToWait = 0.0;
                var maxDuration = '0';

                i=-1;
                for(g=0; g<children.length && i<3; g++){
                  cTag = children.item(g);
                  while( (cTag.nodeType!=3 || cTag.textContent.indexOf('|')<0 ) && g<children.length ){
                         cTag = children.item(g++);
                  }
                  i++;
                  sep1 = cTag.textContent.indexOf(' ');
                  sep2 = cTag.textContent.indexOf('|');
                  sep3 = cTag.textContent.indexOf(' (');
                  if( sep1<0 ) sep1 = sep2;
                  if( sep3<0 ) sep3 = sep2;
                  sep = Math.min(Math.min( sep1, sep2), sep3);

                  nC = cTag.textContent.substring(0, sep );

                  v = c[i];
                  val = nb[i];

                  //alert(''+(b+1)+'.'+(ressources[i])+' - '+'need '+nC+', got '+val+' + '+v+'/h' );

                  duration =  getDuration(v, nC, val);
                  if( v<0 ){
                      cTag.textContent = nC + ' (' +( nC-val>0 ? '?': '0' ) +'/inf.) |\n';
                  }else{
                    cTag.textContent = nC + ' (' + duration +'/'+getDuration(v, nC, 0) + ') |\n';
                  }

                   timeToWait = (nC-val)/v;
                   if( v<0 ){
                     if(nC-val>0){
                        infiniteToWait = true;
                     }
                   }else if( timeToWait > maxToWait ){
                     maxToWait = timeToWait;
                     maxDuration = duration;
                   }
                }

      	        if( maxToWait > 0 ){


                    if(tag.lastChild.nodeName=='DIV' && tag.lastChild.firstChild.nodeType==3){
                      tag.lastChild.firstChild.textContent = 'Reviens dans ' + maxDuration;
                    }else{
                        var divNode = document.createElement('div');
                        style_= 'color:red;font-weight:bold;';
                        divNode.setAttribute('style', style_);
                        divNode.appendChild(
                                            document.createTextNode('Reviens dans ' + maxDuration + 
                                            (infiniteToWait ? ' + un bail !' : '')
                                            )
                        );
                        tag.appendChild( divNode );
                    }
                }
	    }


	}

	calculateBuildingsTimeCost();

	window.setInterval( calculateBuildingsTimeCost, 15000 );

})();


