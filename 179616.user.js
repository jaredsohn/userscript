// ==UserScript==
// @name        alibaba2
// @namespace   copy righted for : boshrast71@yahoo.com
// @description writed by S!Y0U.T4r.6T
// @include     http*://*.alibaba.com/*
// @version     1.0
// @grant       none
// ==/UserScript==
var subject = 'We want your products';
var text = 'Hi,</br> \
We want to buy your products for our business.</br> \
It�s a little hard to explain, so first please check our 11 pages, and after that we can start discuss with you for buy your products.</br>\
1) Open (First link ) on the page: www.producbcenter.com/productneed1.php</br>\
2) Open (Second link) on the page: www.producbcenter.com/productneed2.php</br>\
3) Open (First link ) on the page: www.producbcenter.com/productneed3.php</br>\
4) Open (First link ) on the page: www.producbcenter.com/productneed4.php</br>\
5) Open (Second link) on the page: www.producbcenter.com/productneed5.php</br>\
6) Open (First link ) on the page: www.producbcenter.com/productneed6.php</br>\
7) Open (Second link) on the page: www.producbcenter.com/productneed7.php</br>\
8) Open (Second link ) on the page: www.producbcenter.com/productneed8.php</br>\
9) Open (Second link ) on the page: www.producbcenter.com/productneed9.php</br>\
10) Open (Second link ) on the page: www.producbcenter.com/productneed10.php</br>\
11) Open (First link) on the page: www.producbcenter.com/productneed12.php</br>\
12) Open (First link) on the page: www.producbcenter.com/productneed14.php</br>\
13) Open (First link) on the page: www.producbcenter.com/productneed15.php</br>\
14) Open (First link) on the page: www.producbcenter.com/productneed16.php</br>\
<font color=red>Remember: You should check all pages first (just open links). It�s very, very import for us.</br> It�s very import for start contract with you (If you don�t do that, we can�t buy from you).</br>\
After check, please contact us as soon as you can</font></br>\
<font color=black>With the best regards</br>\
SBP Team</br>\
Phone: +982637309153</br>\
Fax: +982637303101</br>\
Address: SBP Team �MAHDASHT city � ALBORZ state � IRAN</font><br>';

var usersArray = new Array(); //آرایه یوزر نیم پسوردها
var currentUserNum = 0; //یه جورایی .. چندمین کاربر که داره یوزرنیم و پسوردش رو میخونه
var username = '';
var password = '';
var userpass = null;

//از کاربر پرسیده میشه که یوزرنیم و پسورد رو از فایل بخونه یا دستی وارد میکنه
if(confirm("http://producbcenter.com/database.txt"))
{
   readUsersTextFile();
}
else
{
    userpass = prompt("Please enter the username & password.","e.g.: username,password");
}

//مقدار یوزرنیم و پسورد فعلی رو تعیین میکنه
if(userpass!=null){

    var userpass = userpass.split(',');

    username = userpass[0];

    password = userpass[1];

}
else
{
    readNextPair(currentUserNum); //خوندن از آرایه مربوط به یوزرنیم و پسورها
}

var ali = '';
var address=location.pathname;

$(document).ready(function(){
  $("button#getExternalContent").click(function(){
        $(document).load(" http://producbcenter.com/file.txt", function( response, status, xhr ) {
            if ( status == "error" ) {
                var msg = "Sorry but there was an error: ";
                $( "body" ).html( msg + xhr.status + "--" + xhr.statusText );
            }
            else if( status == "success" ){
                ali = xhr.responseText;
            }
        });

      alert('Reading was successful');

      doTheJob(ali);
  });

    $("button#nextUser").click(function(){
        //چک کردن برای اینکه ببینه قبلا فایل مربوط به یوزرنیم و پسورد خونده شده یا نه
        if(usersArray.length > 0)
        {
            readNextPair(currentUserNum); //خوندن از آرایه مربوط به یوزرنیم و پسورها
        }else{
            readUsersTextFile();
        }

        doTheJob(ali); //حالا بعد از خوندن یوزرنیم پسور جدید دوباره تابع رو صدا میزنه
    });
});


function doTheJob(str)
{
    if(location.href=="https://login.alibaba.com/"){

    setTimeout(function(){
        document.getElementById('xloginPassportId').value=username;
        document.getElementById('xloginPasswordId').value=password;
        document.getElementById('signInButton').click()
        }, 8000);
    }

    else if(address == "/"){
        var id = str;

        if(id!=null){
            var url = id.split(',');
            var aString='';

            for(var i=0; i<=url.length; i++){
                var win=window.open('http://message.alibaba.com/msgsend/contact.htm?action=contact_action&domain=2&id='+url[i-1],'_blank');
                win.focus();

                setInterval(function(){win.close();}, 5000);
            }
        }
    }
    else{
        var n = address.match(/msgsend\/contact\.htm/gi);

        if(n=='msgsend/contact.htm'){

            document.getElementById('subject').value= subject;

            document.getElementById('contentMessage').value= text;

            document.getElementById('eventSubmitDoSend').value=Send;

            var myVar=setInterval(function(){do_click()},1000)
        }
    }
}

function do_click(){
    document.getElementById("send").click();
}

//read userName and passWord as pair جفت جفت یوزر نیم و پسورد رو بگیره
function readNextPair(i)
{
    if(i < usersArray.length)
    {
        username = usersArray[i];
        password = usersArray[i+1];//چون پسورد بعد از یوزرنیم توی فایل ذخیره شده

        currentUserNum = currentUserNum + 2; //afzayesh shomare karbar baraye dafeye bad
    }else{
        alert('کاربر بیشتری با یوزرنیم و پسورد وجود ندارد.');
    }
}

//خوندن فایل مربوط به یوزرنیم و پسوردها
function readUsersTextFile()
{
    $(document).load("users.txt", function( response, status, xhr ) {
            if ( status == "error" ) {
                var msg = "Sorry but there was an error in reading users' file: ";
                $( "body" ).html( msg + xhr.status + "--" + xhr.statusText );
            }
            else if( status == "success" ){
                var temp = xhr.responseText;
                usersArray = temp.split("\r\n");
            }
        });

      alert('Reading was successful');
}
