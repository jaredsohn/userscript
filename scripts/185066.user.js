// ==UserScript==
// @name        Backup ForumFree
// @description Effettua il backup dei colori e stili e dell'html
// @version     1.1
// @include     forumfree.it
// @include     http://www.forumfree.it/*
// @include     http://www.forumcommunity.net/*
// @include     http://www.blogfree.net/*
// ==/UserScript==

var modhtml = $(location).attr("href").indexOf("?act=modhtml&cid=") != -1,
    modcss = $(location).attr("href").indexOf("?act=modcss&cid=") != -1,
    enmod = (modhtml || modcss);
if(enmod) {
    $('#large .button').after('&nbsp;<span style="cursor: pointer; background: #18628c !important; color: #051620 !important; border-color: #0f3d57 !important" class="button backupbutt">Backup</span>&nbsp;<span style="cursor: pointer; background: #cf9939 !important; color: #43300d !important; border-color: #966c21 !important" class="button restorebutt">Ripristino</span>');
}
var codeHTMLObj = {}, styleCSSObj = {};
if(modhtml) {
    var storageItem = $(".box.round-5 .desc a").attr("href").split("://")[1].replace(/\./g, "_")+'_codeHTMLObj'
    var storageObj = codeHTMLObj;
    var rib = ''
} else if(modcss) {
    var storageItem = $(".box.round-5 .desc a").attr("href").split("://")[1].replace(/\./g, "_")+'_styleCSSObj'
    var storageObj = styleCSSObj;

    var rib = '<span style="color: red">Effettua il backup <b><u>solo dopo aver salvato le modifiche al CSS</u></b>!<br>In caso contrario, non verrà effettuato correttamente.</span>'
} 
if (localStorage.getItem(storageItem) != null) {
    var s = localStorage.getItem(storageItem),
        x = JSON.parse(s);

    var rest = 'Esiste un backup creato il <span class="restore_time" style="font-weight: bold">' + x.date + '</span>';
} else {
    var rest = 'Non esiste nessun backup. Per crearlo clicca su <b>Backup</b>.';
    $(".restorebutt").hide()
}

if(modhtml || modcss) {
    $('#large input.button').before("<br>"+rib+"<br><div class='restore_info'>"+rest+"</div>")
}

$(document).on('click','.backupbutt', function(){

    if($(".restore_info").html() != "Non esiste nessun backup. Per crearlo clicca su <b>Backup</b>.") {
        var con = confirm("Sicuro di voler sovrascrivere il backup?")
        if(!con) {
            return false;
        }
    }
    var d = new Date();
    var day = (d.getDate() < 10) ? "0"+d.getDate() : d.getDate(),
        month = ((d.getMonth()+1)< 10) ? "0"+(d.getMonth()+1) : (d.getMonth()+1),
        hours = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours(),
        minutes = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes(),
        d = day + "/" +month + "/" + d.getFullYear() + " " +hours+":"+minutes;
    storageObj.date = d;

    $(".restore_info ").html('Esiste un backup creato il <span class="restore_time" style="font-weight: bold">' + d + '</span>')
    
    if(modhtml) {
        $('#large textarea').each(function() {
            storageObj[$(this).attr("id")] = $(this).val()
        })
    } else if(modcss) {
        storageObj.css = $("#large textarea#css").val();
    }
    if (localStorage.getItem(storageItem) != null) {
      localStorage.removeItem(storageItem);
    }
    localStorage.setItem(storageItem, JSON.stringify(storageObj));
    alert('Backup effettuato.')
    if($(".restorebutt").is(":hidden")) {
        $(".restorebutt").show()
    }
})

$(document).on("click",".restorebutt", function(){
    if (localStorage.getItem(storageItem) == null) {
         alert('Non esiste un ripristino.')
    }
    var stObj = localStorage.getItem(storageItem),
        a = JSON.parse(stObj);  
    if(modhtml) {
        $('#large textarea').each(function() {
            $(this).val((a[$(this).attr("id")]))
        })
        alert('Ripristino effettuato, adesso puoi salvare le modifiche.')
    } else if(modcss && $(".restore_textarea").length ==0) {
        $("#large textarea#css").before("<b>Copia e incolla questo:</b><textarea class='restore_textarea' style='display: none; height: 150px'>"+a.css+"</textarea><br><b>In questo box:</b>")
        $("#large .restore_textarea").slideDown();
        alert('Ripristino effettuato, adesso puoi copiare il CSS ripristinato.')
    }
})
