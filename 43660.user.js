// ==UserScript==
// @name           SalesForce-SupportWithStatus
// @namespace      http://userscripts.org/users/40332
// @description    Include a status column in the report of open service requests.
// @include        https://na*.salesforce.com/sserv/caselist.jsp
// @include        https://na*.salesforce.com/sserv/caselist.jsp?all=
// ==/UserScript==

function addStatus() {
    add_status_column();
}


function add_status_column() {
    var tables, t;

    tables = document.getElementsByTagName('table');
    // know we want table 4 by prior knowledge, no class/id/identifying data
    // unfortunately so brittle approach taken
    var trs = tables[4].getElementsByTagName('tr');
    var addedHeader = false;
    var nodes, td, href, id;
    for (j=0; j < trs.length; j++) {
        nodes = trs[j].childNodes;

        if (!addedHeader && trs[j].innerHTML.indexOf('Subject') != -1) {
            // add column headers to header row

            // insert "Email" column header
            td = document.createElement('td');
            td.innerHTML = 'Contact';
            td.className = 'listHeading';
            nodes[3].parentNode.insertBefore(td, nodes[3]);

            // insert empty column for spacing (following their HTML style)
            td = document.createElement('td');
            td.innerHTML = '&nbsp;';
            td.className = 'listHeading';
            nodes[4].parentNode.insertBefore(td, nodes[4]);
            addedHeader = true;

            
            // insert "Status" column header
            td = document.createElement('td');
            td.innerHTML = 'Status';
            td.className = 'listHeading';
            nodes[5].parentNode.insertBefore(td, nodes[5]);

            // insert empty column for spacing (following their HTML style)
            td = document.createElement('td');
            td.innerHTML = '&nbsp;';
            td.className = 'listHeading';
            nodes[6].parentNode.insertBefore(td, nodes[6]);
            addedHeader = true;
        
        } else {
            // process regular rows
           
            // skip non-data rows
            if (nodes.length != 6) continue;

            // change TARGET of case URL to _blank && get href to case
            nodes[3].childNodes[0].target = '_blank';
            href = nodes[3].childNodes[0].href;

            // fix href -- salesforce.com uses a redirect for some annoying reason:
            // https://na4.salesforce.com/sserv/casedetailview.jsp?id=50060000004XDjw
            // to:
            // https://na4.salesforce.com/sserv/casedetail.jsp?id=50060000004XDjw
            href = href.replace(/casedetailview/, 'casedetail');

            // insert email td (id == case number_email)
            td = document.createElement('td');
            td.id = nodes[1].innerHTML +'_email';
            td.className = nodes[0].className;
            nodes[3].parentNode.insertBefore(td, nodes[3]);

            // insert empty column td
            td = document.createElement('td');
            td.innerHTML = '&nbsp;';
            td.className = nodes[0].className;
            nodes[4].parentNode.insertBefore(td, nodes[4]);

            // insert status td (id == case number)
            td = document.createElement('td');
            td.id = nodes[1].innerHTML;
            td.className = nodes[0].className;
            nodes[5].parentNode.insertBefore(td, nodes[5]);

            // insert empty column td
            td = document.createElement('td');
            td.innerHTML = '&nbsp;';
            td.className = nodes[0].className;
            nodes[6].parentNode.insertBefore(td, nodes[6]);

            // fire off request to get case details page (to get status)
            GM_xmlhttpRequest({
                method: 'GET',
                url: href,
                headers: {
                    'User-agent': navigator.userAgent,
                    'Accept': 'application/atom+xml,application/xml,text/xml',
                },
                onload: function (responseDetails) {
                    // problem: returned type is text not a fancy object we can access via DOM methods so
                    // this gets a bit hackish -- hopefully it keeps on working
                    html = responseDetails.responseText;

                    // get id
                    pos = html.indexOf('Case Number:');
                    id_str = html.substring(pos, pos + 300);        // 300 "about right" but could stop working...
                    id = id_str.match(/[0-9]{8}/);

                    // get status
                    pos = html.indexOf('Status:');
                    stat_str = html.substring(pos, pos + 300);      // 300 "about right" but could stop working...
                    stat_str = stat_str.match(/>[A-z ]+</)[0];

                    // get email
                    pos = html.indexOf('Contact Email:');
                    email_str = html.substring(pos, pos + 300);
                    email_str = email_str.match(/>[A-z.]+?@[A-z.]+?</)[0];
                    
                    if (stat_str.length > 2) {
                        var status = stat_str.substring(1, stat_str.length-1);
                    } else {
                        status = 'error';
                    }

                    if (email_str.length > 2) {
                        var email = email_str.substring(1, email_str.indexOf('@'));
                        
                        // could make contact display nicer
                        /*
                        if (email.indexOf('.') != -1) {
                        } else {
                        }
                        */
                    } else {
                        email = 'error';
                    }
                   
                    // add status to report column 
                    document.getElementById(id).innerHTML = status;
                    document.getElementById(id +'_email').innerHTML = email;
                    }
                });
            }
    }
}

// get function executed by browser on window load
if (window.addEventListener) window.addEventListener("load", addStatus, false)
else if (window.attachEvent) window.attachEvent("onload", addStatus)
else window.onload = addStatus;

