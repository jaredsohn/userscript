// ==UserScript==
// @name       Google app engine free quotas
// @namespace  https://appengine.google.com/
// @version    1
// @description  Displays bar charts for free quotas on paid applications
// @match      https://appengine.google.com/dashboard*
// @copyright  2013+, Christophe Minault
// ==/UserScript==

var quotas = { 
    FrontendInstanceHours : 28,
    BackendInstanceHours : 8,
    DatastoreStoredData : 1,
    LogsStoredData : 1,
    TaskQueueStoredTaskBytes : 0.5,
    BlobstoreStoredData : 5,
    DedicatedMemcacheUse10kopssGB1GBunit: undefined,
    CodeandStaticFileStorage : 1,
    DatastoreWriteOperations : 0.05,
    DatastoreReadOperations : 0.05,
    DatastoreSmallOperations : 0.05,
    NumberofIndexes : 200,
    OutgoingBandwidth : 1,
    IncomingBandwidth : 1,
    SocketsCreated : 864000,
    SocketsDataSent : 20,
    SocketsDataReceived : 20,
    TaskQueueAPICalls : 100000,
    TaskQueueStoredTaskCount : 1000000,
    TaskQueueStoredTaskBytes : 0.5,
    UrlFetchAPICalls : 657000,
    UrlFetchDataSent : 1,
    UrlFetchDataReceived : 1,
    MailAPICalls : 100,
    RecipientsEmailed : 100,
    AdminsEmailed : 5000,
    MessageBodyDataSent : 0.06,
    AttachmentsSent : 2000,
    AttachmentDataSent : 0.1,
    ChannelsCreated : 100,
    ChannelAPICalls : 657000,
    ChannelAPIHoursUsed : 200,
    ChannelDataSent : 1,
    XMPPAPICalls : 46000000,
    XMPPDataSent : 1,
    RecipientsMessaged : 46000000,
    InvitationsSent : 100000,
    StanzasSent : 10000,
    LogsReadBandwidth : 0.1,
    LogsStoredData : 1,
    PageSpeedOutgoingBandwidth : undefined,
    SSLVIPs : undefined,
    SSLSNICertificates : undefined,
    SearchAPIStoredData : 0.25,
    SearchAPIBasicOperations : 1000,
    SearchAPIBytesIndexed : 0.01,
    SearchAPIComplexSearches : 100,
    SearchAPISimpleSearches : 1000
};

if (document.URL.indexOf('quotadetails') != -1) { // quota details
    var div = document.getElementById('ae-quota-details');
    
    for (var j = 0; j < div.childNodes.length; j++) {
        var table = div.childNodes[j];
        if (table.tagName != 'TABLE')
            continue;
        
        var tbody = table.getElementsByTagName('tbody')[0];
        var trs = tbody.getElementsByTagName('tr');
        
        for (var i = 0; i < trs.length; i++) {
            var tr = trs[i];
            var quotaname = tr.getElementsByTagName('td')[0].innerHTML.replace(/\W/g, '');
            
            if (quotas[quotaname] != undefined) {
                var tdbar = tr.getElementsByTagName('td')[1];
                var tdpct = tr.getElementsByTagName('td')[2];
                var tdusage = tr.getElementsByTagName('td')[3];
                
                if (tdusage != undefined) {
                    var value = tdusage.innerHTML.match(/[0-9]*.[0-9]*/g)[0];
                    var pct = parseInt(100*value/quotas[quotaname]);
                    var quotalevel = 'normal';
                    if (pct > 80) {
                        quotalevel = 'alert';
                    } else if (pct > 60) {
                        quotalevel = 'warning';
                    }
                        tdbar.innerHTML = '<div class="ae-dash-quota-bar"><img src="/img/pix.gif" class="ae-quota-' + quotalevel + '" height="13" width="' + Math.min(pct,100) + '%" alt="' + pct + '%">';
                    tdpct.innerHTML = '<div align="right">' + pct + '%</div>';
                }
            }
        }
    }
} else { // dashboard
    var div = document.getElementById('ae-dash-quota');
    var div2 = div.getElementsByTagName('div')[0];
    var table = div2.childNodes[1];
    var tbody = table.getElementsByTagName('tbody')[0];
    var trs = tbody.getElementsByTagName('tr');
    
    for (var i = 0; i < trs.length; i++) {
        var tr = trs[i];
        var quotaname = tr.getElementsByTagName('td')[0].innerHTML.replace(/\W/g, '');
        
        if (quotas[quotaname] != undefined) {
            var tdbar = tr.getElementsByTagName('td')[1];
            var tdusage = tr.getElementsByTagName('td')[2];
            var span = tdusage.getElementsByTagName('span')[0];
            
            if (span != undefined && tdbar != undefined) {
                var value = span.innerHTML.match(/[0-9]*.[0-9]*/g)[0];
                var pct = parseInt(100*value/quotas[quotaname]);
                var quotalevel = 'normal';
                if (pct > 80) {
                    quotalevel = 'alert';
                } else if (pct > 60) {
                    quotalevel = 'warning';
                }
                    tdbar.innerHTML = '<div class="ae-dash-quota-bar"><img src="/img/pix.gif" class="ae-quota-' + quotalevel + '" height="13" width="' + Math.min(pct,100) + '%" alt="' + pct + '%"></div><div align="right">' + pct + '%</div>';
            }
        }
    }
}