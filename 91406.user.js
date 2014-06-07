// ==UserScript==

// @name           PNDCVLLookup

// @namespace      PNDCVLLookup

// @description    Property News LPS DCVL Value Lookup  

// @include        http://www.propertynews.com/Property*

// @version        23-11-2011 16:58

// ==/UserScript==



var dcvurl;

var postcode;



adSidebar = document.getElementById('contact-agent');




if (adSidebar) {

    button1 = document.createElement("input");

    button1.setAttribute("id", "btnDCV");

    button1.setAttribute("value", "Get Value"); 

    button1.setAttribute("type", "button");

    button1.addEventListener('click', doit, false);

    adSidebar.parentNode.insertBefore(button1, adSidebar);



    button2 = document.createElement("input");

    button2.setAttribute("id", "btnGOTODCV");

    button2.setAttribute("value", "Goto DCVL"); 

    button2.setAttribute("type", "button");

    button2.setAttribute("disabled", "disabled");

    button2.addEventListener('click', openlink, false);

    adSidebar.parentNode.insertBefore(button2, adSidebar);

//    adSidebar.parentNode.removeChild(adSidebar);

} else {

//    alert ("No sidebar for PN DCVL lookup?!");

}



function doit(){

    var regexPostcode = /[a-zA-Z]{1,2}[0-9][0-9A-Za-z]? [0-9][a-zA-Z]{2}/

    var regexPostcodens = /[a-zA-Z]{1,2}[0-9][0-9A-Za-z]?[0-9][a-zA-Z]{2}/



//    var pnelement = document.getElementsByTagName("title");

//    var pntitle = pnelement[0].innerHTML;

    var pntitle = document.getElementsByTagName("h1")[0].innerHTML;

    pntitle = pntitle.replace(/\<(\/)?span\>/g,"");

    pntitle = pntitle.replace(/\<(\/)?span .*\>/g,"");

//    var stupidaskingprice = document.getElementsByTagName("h1")[1].innerHTML;

    var form = document.forms.namedItem("mort2form");

    var stupidaskingprice = form.elements.namedItem("price").value;

    if (stupidaskingprice != "POA") {

        stupidaskingprice = stupidaskingprice.replace(/[^0-9\.]+/g, "");

    }



    if (regexPostcode.test(pntitle)) {

        postcode = pntitle.match(regexPostcode);

    } else if (regexPostcodens.test(pntitle)) {

        postcode = pntitle.replace(/.*,\s?([a-zA-Z]{1,2}[0-9][0-9A-Za-z]?)([0-9][a-zA-Z]{2}).*/gi, "$1 $2");

    } else {

        alert("No valid postcode in title.")

        return;

    }



    var address = pntitle.replace(/\<(\/)?strong\>/g,"").split(",");




    if (address[0].match(/^\d/)) {

        var firstaddressline = address[0];

    } else if (address[1].match(/^ \d/)) {

        var firstaddressline = address[1];

    } else {

        alert ("No numbered house found.");

        return;

    }



    var splitfirstaddressline = firstaddressline.replace(/ ?(\w) (.*)/, "$1,$2").split(",");

    var housenumber = splitfirstaddressline[0].split(' ').join('');

    var streetname = splitfirstaddressline[1];

//    alert (housenumber + "+" + streetname + "+" + postcode);



    GM_xmlhttpRequest({

            method: "post",

            url: "http://lpsni.gov.uk/vListDCV/search.asp?submit=advanced",

            headers: {

                "Content-type" : "application/x-www-form-urlencoded",

                "Referer" : "http://lpsni.gov.uk/vListDCV/search.asp?submit=form"

            },

            data: encodeURI("txtAddressNumber="+housenumber+"&txtStreet=&txtTown=&txtTownland=&txtPostalCode="+postcode+"&txtWard=&selDistrict=Nothing+Selected&txtVLARefCode=&submit=Search"),

            onload: function(responsedetails) {

                    dcvurl = responsedetails.finalUrl;

                    numberline = responsedetails.responseText.match(/(\d.*)\.\d\d/im);

                    if (!numberline) {

                        alert ("Lookup failed, unregistered address or incorrect address/postcode.");

                    } else {

                        numberline[1] = numberline[1].replace(/[^0-9\.]+/g, "");

                        if (isNaN(stupidaskingprice)) {

                            difference = "N/A";

                        } else {

                            difference = Math.round((((stupidaskingprice - numberline[1]) / numberline[1]) * 100)*100)/100 ;


                            stupidaskingprice = addCommas(stupidaskingprice);

                        }

                        alert ("2005 Valuation: £" + addCommas(numberline[1]) + "\n" + "Current Asking: £" + stupidaskingprice + "\n" + "Difference: " + difference + "%");

                        var buttonelement = document.getElementById('btnGOTODCV');

                        buttonelement.removeAttribute('disabled');

                    }

            }

    });

}



function addCommas(nStr)

{

    nStr += '';

    x = nStr.split('.');

    x1 = x[0];

    x2 = x.length > 1 ? '.' + x[1] : '';

    var rgx = /(\d+)(\d{3})/;

    while (rgx.test(x1)) {

        x1 = x1.replace(rgx, '$1' + ',' + '$2');

    }

    return x1 + x2;

}



function openlink() {

        window.open(dcvurl, dcvurl)

}

