// ==UserScript==
// @name           Chronos Tweaks
// @namespace      tweaks_chronos
// @description    Améliore l'interface de Chronos
// @include        http://chronos.grics.qc.ca/TEnterprise/Entry/TimeEntry/TimeTemplate.aspx*
// ==/UserScript==

    function Tweak() {    	
        if (document.getElementById('AttendanceFooter_0_2') != null) {

            // *****************************************************************
            // Enlève le total arrondi des heures d'entrée/sortie
            // *****************************************************************
            cells = document.querySelectorAll('#AttendanceFooter_0_2 > tbody > tr.TRColorOdd');
            cells[2].setAttribute('style', 'display:none');
            cells = document.querySelectorAll('#AttendanceFooter_1_2 > tbody > tr.TRColorOdd');
            cells[2].setAttribute('style', 'display:none');
            cells = document.querySelectorAll('#AttendanceFooter_2_2 > tbody > tr.TRColorOdd');
            cells[2].setAttribute('style', 'display:none');
            // *****************************************************************
            // Enlève les bouton à côté des tâches
            // *****************************************************************
            divs = document.querySelectorAll('#TaskTimeEntry_Body_0_4 > table > tbody > tr');
            for (var i = 1; i < divs.length ; i++) {
                tds = divs[i].querySelectorAll('td');
                tds[0].setAttribute('style', 'display:none');
            }
            colonnes = document.querySelectorAll('#TaskTimeEntry_Body_0_4 > table > col');
            colonnes[0].setAttribute('style', 'display:none');

            // *****************************************************************
            // Enlève la méga grosse infobulle
            // *****************************************************************
            //Infobulle = document.querySelectorAll('#JSBalloon_0');
            //Infobulle[0].setAttribute('style', 'display:none');           
            
            // *****************************************************************
            // Toggle le bloc de gauche
            // *****************************************************************
            var ToggleTd = document.createElement("td");            
            trExpand = document.querySelectorAll('#TSControl1 > table > tbody > tr')[1];
            tdExpand = trExpand.querySelectorAll('td')[1];
            ToggleTd.appendChild(document.createTextNode(">"));
            ToggleTd.setAttribute('style', 'background-color:#CCCCCC;');
            ToggleTd.setAttribute('onclick', 'if (document.getElementById(\'Left_0\').parentNode.style.display == \'none\') { this.innerHTML = \'<\'; document.getElementById(\'Left_0\').parentNode.style.display=\'\' } else { this.innerHTML = \'>\' ; document.getElementById(\'Left_0\').parentNode.style.display=\'none\' } ');
            trExpand.insertBefore(ToggleTd, trExpand.childNodes[1]);
            document.getElementById('Left_0').parentNode.style.display = 'none';

        } else { 
    		window.setTimeout(Tweak, 1000);
    	}
    }

    Tweak();