// ==UserScript==
// @name           server66
// @namespace      Zach
// @description    Find escort guardian area easily
// @include        http://s66.tk.koramgame.com/
// ==/UserScript==

var serverID = 's66';
var cityID = '4825';

var menu = 's66';
var onlyAvailable = true;
var lineBreak = document.createElement('br');
var menuDiv = document.createElement('div');
menuDiv.id = 'escort_finder';	
menuDiv.setAttribute('style','padding:10px; border:1px solid #ddd; width: 150px; background:#ccc; color: #000; position: absolute; left:1px; top: 1px;z-index: 90000');
var menuTitle = document.createElement('h3');
menuTitle.setAttribute('style', 'font-size: 14px; margin: 0');
menuTitle.innerHTML = "Escort Guardian Finder";

var menuContent  = document.createElement('div');
menuContent.innerHTML = "\
		<p>Click the button below to search for escort guardian</p>\
";
var buttonFind = document.createElement('button');
buttonFind.id = 'button_find';	
buttonFind.setAttribute('style', 'display: block; text-align: center; padding: 10px 0; width: 100%;');
buttonFind.innerHTML = "Search";

buttonFind.addEventListener('click', function(){
	menuLog.innerHTML = '';
	processFind();
}, false);

var menuLog = document.createElement('div');
menuLog.setAttribute('style', 'padding: 10px 0; width: 100%; height: 100px; overflow: auto; text-align: left;');

menuDiv.appendChild(menuTitle);
menuDiv.appendChild(menuContent);
menuDiv.appendChild(buttonFind);
menuDiv.appendChild(menuLog);

document.body.appendChild(menuDiv);

function processFind() {
	//var randomNum = 364943;
	menuLog.appendChild(document.createTextNode('Escort Guardian appears in'));
	menuLog.appendChild(document.createElement('br'));
	var randomNum = 313256 + Math.floor(Math.random()* 100000);
	for(i = 1; i < 36; i++) {
		var koramURL = 'http://'+serverID+'.tk.koramgame.com/index.php?act=battalion.main&city_id='+i+'&villageid='+cityID+'&rand='+randomNum;
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: koramURL,
			//url: 'http://localhost/escort3.xml',
			headers: {
				'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.0.5) Gecko/2008120122 Firefox/3.0.5',
				'Accept': 'application/atom+xml,application/xml,text/xml',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			},
			onload: function(responseDetails) {
				var parser = new DOMParser();
				var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
				var content = dom.getElementsByTagName('html');
				//alert(koramURL);
				//alert(responseDetails.responseText);
				if(content.length >= 1) {
					htmlText = content[1].textContent;
		
					var tempDiv = document.createElement('div');
					tempDiv.innerHTML = htmlText;
					
					areaTitle = tempDiv.getElementsByTagName("h2")[0].childNodes[0].nodeValue;
					console.log(areaTitle);
					
					
					var escortArea = '//area[@sgtitle="Escort Guardians appears in the Camp."]';
					var escortGone = '//area[@sgtitle="A battle has broken out here."]';
					var escortPolies = document.evaluate(escortArea, tempDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
					if(escortPolies.snapshotLength >= 1) {
						menuLog.appendChild(document.createTextNode(areaTitle+' : Available'))
						menuLog.appendChild(document.createElement('br'));
					} else {
						if(!onlyAvailable) {
							var escortPolies = document.evaluate(escortGone, tempDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
							if(escortPolies.snapshotLength >= 1) {
								menuLog.appendChild(document.createTextNode(areaTitle+' : Dead'))
							} else {
								menuLog.appendChild(document.createTextNode(areaTitle+' : Not available'))
							}
							menuLog.appendChild(document.createElement('br'));
						}
					}
				}
			}
		});	
		randomNum++;

	}
}