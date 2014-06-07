// ==UserScript==
// @name          madescript2
// @description   teste
// @version       0.0.2
// @date          2001-04-22
// @include http://uni*.ogame.com.br*
// ==/UserScript==

function fg_speedSimLink(document) {
        
        	//if (document && !fg_isMessagesUrl(document.location.href)) return;
        	//if (!fgGetBooleanPref("foxgameSpeedSimLink",false)) return;
        	
        	//if (fg_Debug) alert("Estamos speedsim");
        	
        	try {
        
        		var table = fgEval('//tr/th/span[@class="espionagereport"]/parent::*/parent::*/following-sibling::tr[1]/td[@colspan="3"][@class="b"]/table/parent::*', document);	
        		
        		var lang = "br"
        		
        		var table2, text, sel;
        		sel = window.getSelection();
        		for (var i = 0; i < table.snapshotLength; i++) {
        			table2 = table.snapshotItem(i);
        	
        			sel.removeAllRanges();
        	
        		    var range = document.createRange();
              		range.selectNode(table2.parentNode);
        			sel.addRange(range);
        
        			text = sel.toString();
        			text = text.replace(/\r|\n/,' ');
        			
        			ruta = "http://websim.speedsim.net/index.php?lang="+lang;
        			//ruta = "http://websim.speedsim.net/";
        			var form = document.createElement('div');
        			form.innerHTML = '<form action="'+ruta+'" method=post target="_speedsim" name="speedsim_form" id="speed_'+i+'" >'+
        					'<input type="hidden" name="report" id="input_sso" value="'+encodeURI(text)+'"></form>';
        			document.body.appendChild(form);
        			var a = document.createElement('a');
        			a.setAttribute('href','#');
        			a.setAttribute('onclick','document.getElementById("speed_'+i+'").submit();');
        			var img = document.createElement('img');
        			img.setAttribute('border','0');
        			img.setAttribute('align','absbottom');			
        			a.appendChild(img);
        			var prevRow = table2.parentNode.parentNode.rows[table2.parentNode.rowIndex -1];
        			prevRow.cells[prevRow.cells.length-1].appendChild(a);
        		}
        	} catch (e) {
        		foxgamedebug(e);
        	}
        }