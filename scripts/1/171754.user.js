// ==UserScript==
// @name        xperteleven Förändringsrapporter
// @include     http://www.xperteleven.com/changeReports.aspx?dh=*&TeamID=*
// @grant       GM_xmlhttpRequest
// ==/UserScript==




function getworstcase(arr) {

    val = arr[0] - 0.5;
    //console.log('starting point: ' + val);

    for(i = 1; i < arr.length; i += 2)
    {
        proposedval = (1 + (arr[i] - 0.5)/100) * val;
        //console.log('proposing ' + proposedval);
        if( proposedval < arr[i+1] - 0.5 )
        {
            val = arr[i+1] - 0.5;
            //console.log('proposed value not high enough - calculated value boosted to ' + val);
        }
        else
        {
            val = proposedval;
            //console.log('proposed value within bounds - calculated value set to ' + val);
        }
    }
    
    return val;
}

function getbestcase(arr) {

    val = Number(arr[0]) + 0.49999;
    //console.log('starting point: ' + val);

    for(i = 1; i < arr.length; i += 2)
    {
        proposedval = (1 + (Number(arr[i]) + 0.5)/100) * val;
        //console.log('proposing ' + proposedval);
        if( proposedval > Number(arr[i+1]) + 0.49999  )
        {
            val = Number(arr[i+1]) + 0.4999999;
            //console.log('proposed value to high - calculated value adjusted to ' + val);
        }
        else
        {
            val = proposedval;
            //console.log('proposed value within bounds - calculated value set to ' + val);
        }
    }
    
    return val;
}

function calculate() {

    uglystring = document.getElementsByClassName('tableinsection')[1].innerHTML;
    arr = uglystring.split('<span nowrap="" title="');

    v = arr[0].split('selected="selected"');
    vv = v[1].split('>');
    name = vv[1].replace('</option', '');
    
    trace = new Array();
    for(i = 1; i < arr.length; i++)
    {
        cleaned1 = arr[i].replace( /<\/?[^>]+(>|$)/g, "" );
        cleaned2 = cleaned1.replace( '">', '' );
        cleaned3 = cleaned2.replace( /\s+/g, ' ' );
        vals = cleaned3.split(' ');
        trace.push( vals[0] );
        trace.push( vals[1].replace('%', '') );
    }
    
    if(trace.length > 0)
    {
        input = prompt("Vad var spelarens skicklighet före första uppdateringen?\n\n(lämna blankt om du inte vet)", "");
        
        if( input != null && input != "" )
            trace.push(input);
        else
            trace.pop();
        
        if(trace.length > 1)
        {
            trace.reverse();
            
            worst = getworstcase(trace);
            best = getbestcase(trace);
            
            last = trace.length - 1;
            if(worst < Number(trace[last]) - 0.5)
                worst = Number(trace[last]) - 0.5;
            if(best > Number(trace[last]) + 0.49)
                best = Number(trace[last]) + 0.49;
        
            precision = 100 * (1 - best + worst);
            prec = precision.toFixed() - 1;
    
            alert(name + "\n\n" + "Lägsta möjliga skicklighet:\t\t" + worst.toFixed(2) + "\nSynlig skicklighet:\t\t\t\t" + Number(trace[last]).toFixed(2) + "\nHögsta möjliga skicklighet:\t\t" + best.toFixed(2));
        }
        else
        {
            alert("Spelarens skicklighet före första uppdateringen måste anges för att kunna göra någon beräkning alls");
        }
    }
}

window.onload = function() {

    calculate();
}
