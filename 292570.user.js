// ==UserScript==
// @name       Dechiro AF
// @version    0.7
// @description  No Description
// @match      http://ts5.travian.asia/build.php?gid=16&tt=99
// @match		http://ts5.travian.asia/build.php?tt=99&id=39
// @copyright  2012+, Dechiro
// ==/UserScript==

var k = 0;
function lateTroopTime(t)
{
 	tt = t[0];
    for(i = 1; i< t.length;i++)
    {
     	if(tt > t[i])
        {
            tt = t[i];
        }
    }
    return tt;
}

setTimeout(function(){
    try{
    	var divc = document.getElementsByClassName("round  listTitle");
        var divtype = divc[0].getElementsByClassName("openedClosedSwitch switchClosed");
   		if(divtype.length == 1)
        {
          	divc[0].click();  
        }
    }catch(err){}
    
},3000);

///
setTimeout(function(){
    try{
        var villages = new Array();
        var inputs = new Array();
        var lastRaid = new Array();
        var inputs_ = document.getElementsByTagName("input");
        for(i = 0; i< inputs_.length - 1; i++)
        {
            if(inputs_[i].type == "checkbox")
            {
                inputs[inputs.length] = inputs_[i];
            }
        }
        //alert(inputs.length);
        
        var villages_s = document.getElementsByClassName("village");
        for(i = 1; i< villages_s.length; i++)
        { 
            villages[i-1] = villages_s[i];
        }
        
        var lastRaid_ = document.getElementsByClassName("lastRaid");
        for(i = 1; i< lastRaid_.length; i++)
        {
            lastRaid[i-1] = lastRaid_[i];
        }
        
        var patNodie = new RegExp("โจมตีชนะโดยไม่สูญเสีย");
        var patSent = new RegExp("กองกำลังโจมตีที่ครอบครอง");
        var iTexts = new Array();
        var iinputs = new Array();
        for(i = 0; i < villages.length; i++)
        {
            if(patNodie.test(lastRaid[i].innerHTML) && !patSent.test(villages[i].innerHTML))
            {                
                iText_ = lastRaid[i].getElementsByTagName("a");
                iTexts[iTexts.length] = iText_[0].innerHTML.replace("เ","");;
                iinputs[iinputs.length] = inputs[i];
            }
        }
        
        if(iinputs.length != 0)
        {
            var iT = lateTroopTime(iTexts);
            for(i = 0; i<iinputs.length; i++)
            {
                if(iT == iTexts[i])
                {
                    iinputs[i].checked = true;
                    break;
                }
            }
        }
    }catch(err){ alert("err"); }
},8000);

setTimeout(function(){
    try{
    	var f = document.getElementsByTagName("form");
    	f[0].submit();
        setTimeout(function(){ window.location.assign("http://ts5.travian.asia/build.php?gid=16&tt=99"); },5000);
    }catch(err) {
        window.location.assign("http://ts5.travian.asia/build.php?gid=16&tt=99");
    }
},60000);
