// ==UserScript==
// @name           AFF - Auto Sign Email for Profile
// @description    This is for auto signning the page.
// @include        http://profile.adultfriendfinder.com/p/member.cgi?*
// @Version        2.0.5 - 05-02-2009
// ==/UserScript==

var DocBody = document.body;

var AutoSignPhotoDiv = document.createElement("div");
AutoSignPhotoDiv.setAttribute('id', 'AutoSignPhotoDiv');

var AutoSign = "position:fixed!important; top: 0px!important;right:0px!important;"
var PhotoSet = "position:fixed!important; top: 20px!important;right:px!important;"

var Autosign = '<div style="' + AutoSign + '"> Sign: '
                           + '<a id=SignBlank onclick="Blank()">Blank</a> | '
                           + '<a id=SignSearch onclick="Search()">Search</a> | '
                           + '<a id=SignWhat onclick="What()">What</a> | '
                           + '<a id=SignPhoto onclick="Photo()">Photo</a>'
                           + '</a>';

var AutoPhoto = '<div style="' + PhotoSet + '">Photo: '
                           + '<a id=PhotoNo onclick="SetNoPhotos()">None</a> | '
                           + '<a id=PhotoOne onclick="SetOnePhoto()">One</a> | '
                           + '<a id=PhotoTwo onclick="SetTwoPhotos()">Two</a> | '
                           + '<a id=PhotoThree onclick="SetThreePhotos()">Three</a>'
                           + '</a>';

AutoSignPhotoDiv.innerHTML = Autosign + AutoPhoto;

document.body.insertBefore(AutoSignPhotoDiv, document.body.firstChild);


if (DocBody.innerHTML.indexOf("<b>You sent her an email:") > 0)
    document.title = "Email Sent.";

Search();

SetTwoPhotos();


//Work around for greasemonkey to call my function to reshow the profile photo.
unsafeWindow.Search = Search;

unsafeWindow.What = What;

unsafeWindow.Photo = Photo;

unsafeWindow.Blank = Blank;

unsafeWindow.SetNoPhotos = SetNoPhotos;

unsafeWindow.SetOnePhoto = SetOnePhoto;

unsafeWindow.SetTwoPhotos = SetTwoPhotos;

unsafeWindow.SetThreePhotos = SetThreePhotos;


function Search() {

    SetEmailSubject("Search");
    SetEmailBody("How is the search been treating you?");


}

function What() {
    SetEmailSubject("What");
    SetEmailBody("a little cutie you are.");
}

function Photo() {
    SetEmailSubject("Photo");
    SetEmailBody("I dig your photo. Keep up the good/fun work.  ;)");
}

function Blank() {
    SetEmailSubject("");
    SetEmailBody("");

    SetNoPhotos();
}

function SetEmailSubject(Subject) {
    //The basic subject title you are going use.
    var EmailSubject = document.getElementsByName("subject")[0];
    var EmailAutoSubject = Subject;

    EmailSubject.value = EmailAutoSubject;
}

function SetEmailBody(Subject) {
    //The basic email body you are going to mostly use.
    var EmailBody = document.getElementsByName("message")[0];
    var AutoEmailBody = Subject;

    EmailBody.value = AutoEmailBody;
}

function SetNoPhotos() {
    //Seting the photos i want to send to all the people I email.
    var Photo0 = document.getElementsByName("attach0")[0];
    var Photo1 = document.getElementsByName("attach1")[0];
    var Photo2 = document.getElementsByName("attach2")[0];

    Photo0.value = ""
    Photo1.value = ""
    Photo2.value = ""
}

function SetOnePhoto() {
    //Seting the photos i want to send to all the people I email.
    var Photo0 = document.getElementsByName("attach0")[0];
    var Photo1 = document.getElementsByName("attach1")[0];
    var Photo2 = document.getElementsByName("attach2")[0];

    Photo0.value = "photo.1"
    Photo1.value = ""
    Photo2.value = ""
}


function SetTwoPhotos() {
    //Seting the photos i want to send to all the people I email.
    var Photo0 = document.getElementsByName("attach0")[0];
    var Photo1 = document.getElementsByName("attach1")[0];

    Photo0.value = "photo.1"
    Photo1.value = "photo.2"
}

function SetThreePhotos() {
    //Seting the photos i want to send to all the people I email.
    var Photo0 = document.getElementsByName("attach0")[0];
    var Photo1 = document.getElementsByName("attach1")[0];
    var Photo2 = document.getElementsByName("attach2")[0];

    Photo0.value = "photo.1"
    Photo1.value = "photo.2"
    Photo2.value = "photo.3"
}