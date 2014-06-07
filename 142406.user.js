// ==UserScript==
// @name        ortus.rtu.lv weighted average mark
// @author      David Griberman
// @namespace   chaosdragon.org
// @description Aprēķina vidējo svērto atzīmi ortus.rtu.lv portālā, pie mācībām.
// @include     https://ortus.rtu.lv/f*
// @version     1
// @grant metadata
// ==/UserScript==

function videjaAtzime()
{
    var tt = document.getElementsByTagName("table");

    for (k=0; k<tt.length;k++){
        if (tt[k].className=="uportal-table")
        {    
			
            var tabula = tt[k].tBodies[0];
            var total =0;
            var totalKP=0;			
            for (i=2;i<tabula.rows.length;i++)
            {
                var rinda = tabula.rows[i].cells;
                var garums = rinda.length;
                try
				{
					if (parseInt((rinda[5].innerHTML))>0)
					{          
					   
						var KP=parseInt(rinda[2].getElementsByTagName("div")[0].innerHTML);
						var mark=parseInt((rinda[5].innerHTML));									
						totalKP+=KP;					
						total+=mark*KP;						
					}       
                }
				catch (err)
				{						
					failflag = true;
				}    
            }
            var jaunarinda = tabula.insertRow(-1);
            var jaunarutina = jaunarinda.insertCell(0);
            jaunarutina.colSpan="8";
            jaunarutina.align="right";
            var atzime = (total/totalKP);
            if (!atzime) atzime=0;
            atzime=atzime.toFixed(2);
            
			if (totalKP>0)
			{
				jaunarutina.innerHTML="Vidējā svērtā atzīme: <b>"+atzime+'</b>';
				if (failflag) jaunarutina.innerHTML+="<br/>Eksāmeni nav nokārtoti no pirmās reizes! Ņemta vērā tikai pirmā atzīme (ja tāda ir).";
			}
        }
    }
}

videjaAtzime();