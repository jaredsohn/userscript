// ==UserScript==
// @name           Travian Building Time Cost
// @namespace      zm
// @include        http://*.travian.*/build.php*
// ==/UserScript==

(function () {


	function travianBuildingCostInit(){	
		
		function getDuration(u_per_hour, nb_total, u){
				 diff = (nb_total*1) - (u*1);
				 if( diff<1 ){
				   return 0
				   }
			h = Math.floor((diff/u_per_hour));
			m = Math.round((diff - u_per_hour*h)/u_per_hour*60);

			return h+':'+(m<10 ? '0'+m : m);
		}
			
        var ElementXpath = "//td[contains(text(),'/') and @title!='']";
		
	    var vitesses = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		
		var production = new Array();
		var storage = new Array();
		
		
		//GM_log("Length"+vitesses.snapshotLength);
		
	    for (i=0; i<vitesses.snapshotLength; i++){

		    tag = vitesses.snapshotItem(i);			
			
		    v = tag.getAttribute('title');
		    val = tag.textContent.substring( 0, tag.textContent.indexOf('/') );
				
			production[i] = v;
			storage[i]=val;

	    }
		
		
		
		
        //ElementXpath = "//b[text()='Coûts']/following-sibling::table[1]//td/text()[following-sibling::text()[2]]";
        ElementXpath = "//td[(@class='s7' or @class='required') and img/@alt='Holz']/text()[position()<6 and position()>0]";
		
	    var couts = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
		
		for (j=1;j<couts.snapshotLength;j=j+5) {
						
			var maxToWait = 0.0;
			var maxDuration = '0';
			
			var bedarf = new Array();
			for (i=0;i<4;i++)
			{	
				var text = couts.snapshotItem(j+i).textContent;
								
				pos=text.indexOf("|");
				if (pos>-1)
				{
					num=text.substr(0,pos)*1;
					text=text.substr(text.indexOf(" ")+1);
				}
				else
					num=text*1;
					
				bedarf[i]=num;
				//GM_log('Orig Text: '+couts.snapshotItem(j+i).textContent+ ' => Num: '+num);						
				
				var duration =  getDuration(production[i], num, storage[i]);
				
				//GM_log('duration='+ production[i]+","+ num+","+ storage[i]+"="+duration);						
				if (duration !=0) {
					couts.snapshotItem(j+i).textContent += ' (' + duration + ') \n';
				}

				 
				 var timeToWait = (num-storage[i])/production[i];
				 if( timeToWait > maxToWait ){
				   maxToWait = timeToWait;
				   maxDuration = duration;
				 }
			}
			
			//GM_log('DONE');						
						
            

			if( maxToWait > 0 ){
                var divNode = document.createElement('div');
                divNode.setAttribute('style', 'color:red;font-weight: bold;');
                divNode.appendChild(
                document.createTextNode('Bau möglich in ' + maxDuration)
                );
                couts.snapshotItem(j).parentNode.appendChild( divNode );
            } else {			
                var divNode = document.createElement('div');
                divNode.setAttribute('style', 'color:green;font-weight: bold;');
                divNode.appendChild(
                document.createTextNode('Ressourcen für Bau vorhanden')
                );
                couts.snapshotItem(j).parentNode.appendChild( divNode );            
			}
			
		}

	}

	travianBuildingCostInit();

})();
