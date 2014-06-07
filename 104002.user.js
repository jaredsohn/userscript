// ==UserScript==
// @name           Commonwealth Bank Australia Netbank Available Totals
// @description    Displays available totals of accounts not just totals of account balance
// @include        https://*.my.commbank.com.au/netbank/Portfolio/Home/*
// @version        0.0.1
// ==/UserScript==

try
{
    var spanarray = document.getElementsByTagName("span");
    var amountarray = new Array();
    var drcrarray = new Array();
    var y = 0;
    var x = 0;
    for (i = 0; i < spanarray.length; i++) {
        if(spanarray[i].className == "Currency field WithPostFieldText")
        {
            amountarray[y] = parseFloat(spanarray[i].innerHTML.replace(/[^0-9.]+/g,''));
            y++;
        }
        if(spanarray[i].className == "PostFieldText")
        {
            drcrarray[x] = spanarray[i].innerHTML.replace(/[^DRC]+/g,'');
            x++;
        }
    }
    var oddeven = 0;
    var totalcredit = 0;
    var totaldebit = 0;
    var oddeven = 0;
    var total = 0;
    for (i = 0; i < amountarray.length-3; i++) {
            if(oddeven == 0) oddeven = 1;
            else if(oddeven == 1) 
            {
                if(drcrarray[i]=="CR")
                {
                    totalcredit += amountarray[i];
                }
                else
                {
                    totaldebit += amountarray[i];
                }
                oddeven = 0;
            }
    }
    total = totalcredit-totaldebit;
    var crdr = '';
    if(totalcredit<totaldebit)
    {
        crdr = 'DR';
    }
    else
    {
        crdr = 'CR';
    }
    var totalstable = document.getElementById('MyPortfolioGrid1_a');
    var trs = totalstable.getElementsByTagName("tr");
    var tds = trs[3].getElementsByTagName("td");
    tds[2].innerHTML = '$'+totaldebit.toFixed(2)+' DR';
    tds[2].style.textAlign = 'right';
    var tds = trs[4].getElementsByTagName("td");
    tds[2].innerHTML = '$'+totalcredit.toFixed(2)+' CR';
    tds[2].style.textAlign = 'right';
    var tds = trs[5].getElementsByTagName("td");
    tds[2].innerHTML = '$'+total.toFixed(2)+' '+crdr;
    tds[2].style.textAlign = 'right';
}
catch(err)
{
    txt="There was an error with the userscript.\n\n";
    txt+="Please download the latest version.\n\n";
    txt+="Click OK to continue.\n\n";
    alert(txt);
}