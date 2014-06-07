// ==UserScript==
// @name       IPTorrents torrent file explorer
// @namespace  iptorrents.torrent.file.explorer
// @version    0.1337
// @description  Will download the torrent file and show you the files inside
// @match      http*://*.iptorrents.com/details.php?*
// @copyright  2013+, leipehenkie
// ==/UserScript==

/****************************************************************************
 * This userscript will be loaded when you view the details of a torrent
 * on iptorrents.com. It will download the torrent file into your browser's
 * memory and grab the file information of the files this torrent contains
 * to display these on the details page, along with their filesizes.
 * 
 * It stores all the information it gathers in an object variable called
 * 'tor' in the global scope of your browser's javascript memory. You can
 * see what information has been stored in this variable by typing 'tor'
 * into your js console.
 * 
 * This script utilizes the jQuery library which should already be loaded 
 * by the site itself.
 * 
 * I can guarantee you this script does not in any way collect information
 * about you, but if you don't take my word for it, just read the source
 * code below.
 * 
 * This script was written by leipehenkie and released under the MIT License. 
 * 
 * Remember: if you enjoy this,
 * 			   don't forget to give some rep!  =>  /userdetails.php?id=1078913
 *****************************************************************************/

$(document).ready(function() {
    
    unsafeWindow.tor = { // unsafeWindow binds the variable to the global scope (for debugging)
        url: 	null,
        file:	null,
        parsed: {
            files: []   
        }
    };
    
    tor.url = $('a.index')[0].href;    
    if(tor.url) {
        $.get(tor.url, function(a) {
            
            tor.file = a;
            var match = tor.file.match(/lengthi(\d+)e\d+:(pathl|name)(\d+):(.*?)(e{1,2}(d|e)\d+:|12:piece length)/gi);
            match.forEach(function(v) {
                var meta   = v.match(/lengthi(\d+)e\d+:(pathl|name)(\d+):(.*?)(e{1,2}(d|e)\d+:|12:piece length)/);
                var fsize  = meta[1];
                var length = meta[3];
                var path   = meta[4].replace(/\d+:/g, '/');
                tor.parsed.files.push([fsize, path]);
            });
            tor.parsed.files.sort(function(x, y) { return x[1] < y[1] ? -1 : 1; });
            
            var tr  = document.createElement('tr');
            var td1 = tr.appendChild(document.createElement('td'));
            var td2 = tr.appendChild(document.createElement('td'));
            
            $(td1).attr('class', 'heading ar vat');
            td1.innerHTML = 'File information';
                
            $(td2).attr('class', 'vat');
            var ftab = td2.appendChild(document.createElement('table'));
            tor.parsed.files.forEach(function(v) {
            	var thisRow = ftab.appendChild(document.createElement('tr'));
                var fnametd = thisRow.appendChild(document.createElement('td'));
                var fsizetd = thisRow.appendChild(document.createElement('td'));
                fnametd.innerHTML = v[1];
                fsizetd.innerHTML = (v[0] / 1024 / 1024).toFixed(1)+' MB';
                $(fsizetd).attr('style', 'width: 100px;');
            });
            
            $('table.t0')[0].appendChild(tr);
            
        });
    }
});