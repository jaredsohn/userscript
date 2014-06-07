// ==UserScript==
// @name           ArchLinux: install package
// @namespace      http://userscripts.org/users/130473
// @description    Install ArchLinux packages from the browser
// @include        http://*.archlinux.org/packages/*
// ==/UserScript==


// This script makes use of an external "pacman" url handler.
// To create such handler in Firefox, follow those instructions:
//
// 1. Create a text file and add this content:
//   #!/bin/sh
//   xterm -e "sudo pacman -S `echo $* | sed -e 's|^pacman:/*||' -e 's|/||'`"
// 2. Make it executable:
//   chmod a+x /path/to/above/script
// 3. Open about:config in Firefox and add those entries:
//   network.protocol-handler.app.pacman = /path/to/above/script
//   network.protocol-handler.external.pacman = true
//   network.protocol-handler.expose.pacman = false
//   network.protocol-handler.warn-external.pacman = false
// 4. The first time you try to open a pacman url, FF will ask you what
//  application to open those urls. Choose the script you just created.
//
// Note: you can replace xterm and pacman for your own terminal emulator
// or pacman wrapper (like powerpill).


// Returns link to install the package
// I'd like to run the script right from Firefox, but it is safer to
// use an external url handler.
function pkglink(pkgname)
{
    //return 'shell:xterm -e "sudo pacman -S ' + pkgname + '"';
    return 'pacman:' + pkgname;
}

// This function adds an "Install package" link to package descriptions
function pkgdesc()
{
    var pkgname = document.title.substring(5, document.title.indexOf(' - '));

    var link = document.createElement('a');
    link.href = pkglink(pkgname);
    link.title = 'Install ' + pkgname;
    link.innerHTML = 'Install package';

    var item = document.createElement('li');
    item.appendChild(link);

    document.getElementById('content').getElementsByTagName('ul')[0].appendChild(item);
}

// This function adds an "install" link to package search results
function pkgsearch()
{
    var trs = document.getElementById('content').getElementsByTagName('table')[1].getElementsByTagName('tr');
    for (var i = 0; i < trs.length - 1; i++)
    {
        var tr = trs[i];
        // The second <tr> is the header
        if (i == 1)
        {
            //
            var th = document.createElement('th');
            tr.appendChild(th);
            th.innerHTML = '&nbsp;';
        }
        // Packages start from the third <tr>
        if (i <= 1) continue;

        var pkgname = tr.getElementsByTagName('a')[0].innerHTML;

        var link = document.createElement('a');
        link.innerHTML = 'install';
        link.title = 'Install ' + pkgname;
        link.href = pkglink(pkgname);

        var td = document.createElement('td');
        td.appendChild(link);

        tr.appendChild(td);
    }
}

// Call the appropriated function
if (document.title.indexOf('Search') > 0)
{
    pkgsearch();
}
else
{
    pkgdesc();
}
