// ==UserScript==
// @name           UCSC library autologin
// @description    Stores and enters UCSC library barcode on UCSC library website.
// @include        http://oca.ucsc.edu/login*
// ==/UserScript==

function main()
{
    var id = GM_getValue('id', ''),
        fields = document.evaluate("//input[@id='id_user']",
                                   document, null, 6, null);
    if(id=='')
    {
        getID();
    }
    else
    {
        for(var i=fields.snapshotLength-1; i>=0; i--)
            fields.snapshotItem(i).value = id;
        var form = document.evaluate("//form", document, null, 9, null).singleNodeValue;
        form.submit();
    }
}

function getID()
{
    var id = prompt('Enter your UCSC library barcode.');
    if(id!='')
    {
        GM_setValue('id', id);
        main();
    }
    else
    {
        alert('Invalid ID');
        getID();
    }
}

main();
