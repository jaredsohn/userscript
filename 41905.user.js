// ==UserScript==
// @name           Ikariam Auto Login
// @version        1.0
// @description    Tự động đăng nhập Ikariam.
// @author         Duy Hưng
// @e-mail         nguyen.tran.duy.hung@gmail.com
// @include        http://*ikariam.tld/*
// @exclude        http://*s*.ikariam.*
// @exclude        http://*board.ikariam.*/*
// ==/UserScript==

function setInfomation() {
    var usernameold = GM_getValue("Username", "Tên Ðang Nhập");
    GM_setValue("Username", prompt("Tên Đăng Nhập Của Bạn Ở IKARIAM Là Gì ?", usernameold) || usernameold);

    var passwordold = GM_getValue("Password", "Mật Khẩu");
    GM_setValue("Password", prompt("Nhập Mật Khẩu Của Bạn Vào Đây ?", passwordold) || passwordold);

    var serverold = GM_getValue("Server", "SERVER");
    GM_setValue("Server", prompt("Nhập Tên Máy Chủ Mà Bạn Đang Chơi ? Ví Dụ :s1.ikariam.vn", serverold) || serverold);

  window.location.reload();
};

GM_registerMenuCommand("Ikariam Auto Login : Cài Đặt", setInfomation);

var SERVER = GM_getValue("Server", "SERVER"); // World = xx.ikariam.vn 
var USERNAME = GM_getValue("Username", "USERNAME");  // Username
var PASSWORD = GM_getValue("Password", "PASSWORD");  // Password

if (USERNAME == "USERNAME" || PASSWORD == "PASSWORD" || SERVER == "SERVER") {
  setInfomation();
} else {

document.getElementById("universe").value = SERVER;
document.getElementById("login").value = USERNAME;
document.getElementById("pwd").value = PASSWORD;

var url = "http://" + document.getElementById("universe").value + "/index.php?action=loginAvatar&function=login";
			
document.getElementById('loginForm').action = url;
document.getElementById("loginForm").submit();

};