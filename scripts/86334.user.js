// ==UserScript==
// @name           Extreme Redeemer Pro (FOR FREE)
// @description    The script that does almost everything for you on a redemption!
// @version        3.5
// @include        *ptzplace.lockerz.com*
// @include	   	   http://freecandy.tk/*
// @include	   http://www.italialockerz.altervista.org/*
// @include	   *italialockerz.altervista.org*
// @unwrap
// ==/UserScript==



// Configuration

// Your personal data is here.
var Email = "YOU@ADDRESS.COM";
var Combination = "YOURPASSWORD";

// Type "US" for USA, "CA" for Canada, and "international" for anywhere else.
var Mode = "international";
var FirstName = "MAURO BROS";
var LastName = "BROS";
var Address1 = "123 ADDRESS STREET";
var Address2 = "123 ADDRESS STREET";
var Phone = "0123456789";
var Phone1 = "012";
var Phone2 = "345";
var Phone3 = "6789";
var Country = "Italy";
var State = "IT";
var Zip = "82030";
var City = "international";

var Product1 = "4 GB Shuffle - Silver"; // Type the names of products you want to auto select
var Product2 = "Desktop Background - Banner Color";
var Product3 = "";
var Product4 = "";
var Product5 = "";
var Product6 = "";
var Product7 = "";
var Product8 = "";
var Product9 = "";
var Product10 = "";
var Product11 = "";
var Product12 = "";
var Product13 = "";
var Product14 = "";
var Product15 = "";
var Product16 = "";
var Product17 = "";
var Product18 = "";
var Product19 = "";
var Product20 = "";

var _0x8126 = ["\x33\x2E\x35", "\x75\x70\x64\x61\x74\x65", "\x6E\x6F", "\x2A", "\x45\x72\x72\x6F\x72\x20\x69\x6E\x20\x74\x68\x65\x20\x73\x63\x72\x69\x70\x74\x2C\x20\x70\x6C\x65\x61\x73\x65\x20\x73\x65\x6E\x64\x20\x61\x20\x6D\x61\x69\x6C\x20\x74\x6F\x20\x66\x61\x62\x40\x65\x78\x74\x72\x65\x6D\x65\x2D\x72\x65\x64\x65\x65\x6D\x65\x72\x2E\x63\x6F\x6D\x20\x77\x69\x74\x68\x20\x74\x68\x69\x73\x20\x63\x6F\x64\x65\x20\x3A\x20\x2D\x31\x35\x39\x33", 
"\x6C\x65\x6E\x67\x74\x68", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65", 
"\x69\x64", "\x69\x74\x65\x6D", "\x6D\x61\x74\x63\x68", "\x45\x72\x72\x6F\x72\x20\x69\x6E\x20\x74\x68\x65\x20\x73\x63\x72\x69\x70\x74\x2C\x20\x70\x6C\x65\x61\x73\x65\x20\x73\x65\x6E\x64\x20\x61\x20\x6D\x61\x69\x6C\x20\x74\x6F\x20\x66\x61\x62\x40\x65\x78\x74\x72\x65\x6D\x65\x2D\x72\x65\x64\x65\x65\x6D\x65\x72\x2E\x63\x6F\x6D\x20\x77\x69\x74\x68\x20\x74\x68\x69\x73\x20\x63\x6F\x64\x65\x20\x3A\x20\x2D\x31\x35\x39\x32", 
"\x20", "\x63\x6C\x61\x73\x73\x4E\x61\x6D\x65", "\x69\x6E\x64\x65\x78\x4F\x66", "\x66\x6F\x63\x75\x73", 
"\x45\x72\x72\x6F\x72\x20\x69\x6E\x20\x74\x68\x65\x20\x73\x63\x72\x69\x70\x74\x2C\x20\x70\x6C\x65\x61\x73\x65\x20\x73\x65\x6E\x64\x20\x61\x20\x6D\x61\x69\x6C\x20\x74\x6F\x20\x66\x61\x62\x40\x65\x78\x74\x72\x65\x6D\x65\x2D\x72\x65\x64\x65\x65\x6D\x65\x72\x2E\x63\x6F\x6D\x20\x77\x69\x74\x68\x20\x74\x68\x69\x73\x20\x63\x6F\x64\x65\x20\x3A\x20\x2D\x31\x35\x39\x34", 
"\x68\x74\x74\x70", "\x2F", "\x6C\x61\x73\x74\x49\x6E\x64\x65\x78\x4F\x66", "\x68\x72\x65\x66", "\x73\x75\x62\x73\x74\x72\x69\x6E\x67", 
"\x6C\x6F\x63\x61\x74\x69\x6F\x6E", "\x6B\x65\x79\x43\x6F\x64\x65", "\x62\x74\x6E\x52\x65\x64\x65\x65\x6D", 
"\x73\x68\x69\x70\x70\x69\x6E\x67\x46\x6F\x72\x6D", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64", 
"\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x73\x75\x62\x6D\x69\x74\x46\x6F\x72\x6D\x28\x29\x3B", "\x70\x72\x6F\x64\x75\x63\x74\x46\x72\x61\x6D\x65", 
"\x66\x72\x65\x73\x68\x6F\x75\x74", "\x30", "\x31", "\x32", "\x33", "\x34", "\x35", "\x36", "\x37", "\x38", 
"\x39", "\x31\x30", "\x31\x31", "\x31\x32", "\x31\x33", "\x31\x34", "\x31\x35", "\x31\x36", "\x31\x37", 
"\x31\x38", "\x31\x39", "\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x64\x6F\x4C\x6F\x67\x69\x6E\x28\x29\x3B", 
"\x72\x65\x67\x69\x73\x74\x65\x72\x65\x64", "\x6E\x6F\x6E\x2D\x6E\x6F\x6E\x2D\x6E\x6F\x6E\x2D\x6F\x6E\x2D\x6E\x65\x2D\x70\x61\x73\x73\x65\x2D\x70\x61\x73", 
"\x4C\x69\x63\x65\x6E\x73\x65\x20\x69\x73\x20\x6E\x6F\x74\x20\x72\x65\x67\x69\x73\x74\x65\x72\x65\x64\x20\x79\x65\x74\x2C\x20\x70\x6C\x65\x61\x73\x65\x20\x64\x6F\x6E\x27\x74\x20\x70\x61\x79\x20\x61\x74\x74\x65\x6E\x74\x69\x6F\x6E\x20\x61\x74\x20\x74\x68\x65\x20\x4C\x65\x61\x6B\x65\x64\x20\x6D\x65\x73\x73\x61\x67\x65", 
"\x47\x45\x54", "\x68\x74\x74\x70\x3A\x2F\x2F\x61\x73\x68\x6B\x61\x2E\x6D\x65\x2F\x66\x61\x62\x2F\x75\x75\x69\x64\x2F\x72\x65\x67\x69\x73\x74\x65\x72\x2E\x70\x68\x70\x3F\x75\x75\x69\x64\x3D", 
"\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74", "\x75\x75\x69\x64", "\x59\x6F\x75\x72\x20\x6C\x69\x63\x65\x6E\x73\x65\x20\x68\x61\x73\x20\x62\x65\x65\x6E\x20\x61\x63\x74\x69\x76\x61\x74\x65\x64\x20\x66\x6F\x72\x20\x74\x68\x69\x73\x20\x73\x63\x72\x69\x70\x74\x20\x21\x20\x54\x68\x61\x6E\x6B\x73\x20\x66\x6F\x72\x20\x62\x75\x79\x69\x6E\x67\x20\x21\x20\x3A\x2D\x29", 
"\x68\x74\x74\x70\x3A\x2F\x2F\x72\x65\x61\x6C\x6C\x79\x2E\x66\x72\x65\x65\x63\x61\x6E\x64\x79\x2E\x6F\x72\x67\x2F", 
"\x68\x74\x74\x70\x3A\x2F\x2F\x61\x73\x68\x6B\x61\x2E\x6D\x65\x2F\x66\x61\x62\x2F\x75\x75\x69\x64\x2F\x63\x68\x65\x63\x6B\x2E\x70\x68\x70\x3F\x75\x75\x69\x64\x3D", 
"\x46\x69\x72\x73\x74\x4E\x61\x6D\x65", "\x75\x6E\x6B\x6E\x6F\x77\x6E\x20\x65\x72\x72\x6F\x72\x2C\x20\x70\x6C\x65\x61\x73\x65\x20\x72\x65\x74\x72\x79", 
"\x50\x72\x6F\x64\x75\x63\x74", "\x67\x69", "\x73\x70\x61\x6E", "\x66\x69\x72\x73\x74\x43\x68\x69\x6C\x64", 
"\x6E\x6F\x64\x65\x54\x79\x70\x65", "\x6E\x6F\x64\x65\x56\x61\x6C\x75\x65", "\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65", 
"\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65", "\x6B\x65\x79\x64\x6F\x77\x6E", "\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72", 
"\x68\x74\x74\x70\x3A\x2F\x2F\x61\x73\x68\x6B\x61\x2E\x6D\x65\x2F\x66\x61\x62\x2F\x72\x71\x33\x30\x30\x30\x76\x65\x72\x73\x69\x6F\x6E\x2E\x74\x78\x74", 
"\x5C\x6E", "\x67", "", "\x72\x65\x70\x6C\x61\x63\x65", "\x63\x6F\x6E\x66\x69\x67", "\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C", 
"\x4E\x6F\x20\x75\x70\x64\x61\x74\x65\x73\x20\x66\x6F\x75\x6E\x64\x2E", "\x63\x68\x65\x63\x6B\x64\x61\x74\x65", 
"\x67\x65\x74\x48\x6F\x75\x72\x73", "\x6E\x65\x76\x65\x72", "\x77\x74\x66", "\x69\x6E\x70\x75\x74", "\x68\x74\x74\x70\x3A\x2F\x2F\x65\x78\x74\x72\x65\x6D\x65\x2D\x72\x65\x64\x65\x65\x6D\x65\x72\x2E\x63\x6F\x6D\x2F\x73\x75\x70\x70\x6F\x72\x74\x2F\x63\x6C\x69\x65\x6E\x74\x2E\x70\x68\x70", 
"\x64\x69\x76", "\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74", "\x3C\x64\x69\x76\x20\x73\x74\x79\x6C\x65\x3D\x22\x66\x6F\x6E\x74\x2D\x66\x61\x6D\x69\x6C\x79\x3A\x20\x54\x61\x68\x6F\x6D\x61\x2C\x56\x65\x72\x64\x61\x6E\x61\x2C\x41\x72\x69\x61\x6C\x2C\x73\x61\x6E\x73\x2D\x73\x65\x72\x69\x66\x3B\x20", 
"\x6C\x69\x6E\x65\x2D\x68\x65\x69\x67\x68\x74\x3A\x20\x6E\x6F\x72\x6D\x61\x6C\x3B\x20\x66\x6F\x6E\x74\x2D\x73\x69\x7A\x65\x3A\x20\x38\x33\x25\x3B\x20\x70\x61\x64\x64\x69\x6E\x67\x3A\x20\x34\x70\x78\x20\x38\x70\x78\x3B\x20", 
"\x63\x6C\x65\x61\x72\x3A\x20\x62\x6F\x74\x68\x3B\x20\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x63\x6F\x6C\x6F\x72\x3A\x20\x23\x46\x46\x46\x46\x41\x45\x3B\x20\x62\x6F\x72\x64\x65\x72\x3A\x20\x31\x70\x78\x20\x73\x6F\x6C\x69\x64\x20\x23\x43\x43\x43\x3B\x20", 
"\x66\x6F\x6E\x74\x2D\x77\x65\x69\x67\x68\x74\x3A\x20\x62\x6F\x6C\x64\x3B\x20\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x20\x66\x69\x78\x65\x64\x3B\x20\x7A\x2D\x69\x6E\x64\x65\x78\x3A\x20\x31\x3B\x20\x62\x6F\x74\x74\x6F\x6D\x3A\x20\x30\x65\x6D\x3B\x20", 
"\x6C\x65\x66\x74\x3A\x20\x30\x65\x6D\x3B\x20\x64\x69\x73\x70\x6C\x61\x79\x3A\x20\x62\x6C\x6F\x63\x6B\x3B\x22\x3E\x52\x65\x64\x65\x65\x6D\x51\x75\x69\x63\x6B\x20\x33\x30\x30\x30\x20\x76\x65\x72\x73\x69\x6F\x6E\x20", 
"\x20\x69\x73\x20\x72\x75\x6E\x6E\x69\x6E\x67\x2E\x20\x3C\x61\x20\x68\x72\x65\x66\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x65\x78\x74\x72\x65\x6D\x65\x2D\x72\x65\x64\x65\x65\x6D\x65\x72\x2E\x63\x6F\x6D\x2F\x72\x65\x64\x65\x65\x6D\x71\x75\x69\x63\x6B\x2E\x70\x68\x70\x22\x3E\x43\x68\x65\x63\x6B\x20\x66\x6F\x72\x20\x75\x70\x64\x61\x74\x65\x73\x2E\x3C\x2F\x61\x3E\x20\x47\x65\x74\x20\x61\x63\x63\x65\x73\x73\x20\x74\x6F\x20\x3C\x61\x20\x68\x72\x65\x66\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x65\x78\x74\x72\x65\x6D\x65\x2D\x72\x65\x64\x65\x65\x6D\x65\x72\x2E\x63\x6F\x6D\x2F\x73\x75\x70\x70\x6F\x72\x74\x2F\x63\x6C\x69\x65\x6E\x74\x2E\x70\x68\x70\x22\x20\x74\x61\x72\x67\x65\x74\x3D\x22\x5F\x62\x6C\x61\x6E\x6B\x22\x3E\x4C\x49\x56\x45\x20\x73\x75\x70\x70\x6F\x72\x74\x20\x3C\x2F\x61\x3E\x20\x6E\x6F\x77\x20\x21\x20\x3C\x2F\x64\x69\x76\x3E", 
"\x62\x6F\x64\x79", "\x69\x6E\x73\x65\x72\x74\x42\x65\x66\x6F\x72\x65", "\x55\x53", "\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x6D\x61\x6E\x69\x70\x75\x6C\x61\x74\x65\x46\x6F\x72\x6D\x28\x27\x55\x53\x27\x29", 
"\x43\x41", "\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x6D\x61\x6E\x69\x70\x75\x6C\x61\x74\x65\x46\x6F\x72\x6D\x28\x27\x43\x41\x27\x29\x3B", 
"\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x73\x65\x6C\x65\x63\x74\x43\x6F\x75\x6E\x74\x72\x79\x28\x27\x43\x41\x27\x29", 
"\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x20\x6D\x61\x6E\x69\x70\x75\x6C\x61\x74\x65\x46\x6F\x72\x6D\x28\x22\x69\x6E\x74\x65\x72\x6E\x61\x74\x69\x6F\x6E\x61\x6C\x22\x29\x3B", 
"\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x73\x65\x6C\x65\x63\x74\x53\x74\x61\x74\x65\x28\x27", "\x27\x2C\x27\x64\x6F\x63\x75\x6D\x65\x6E\x74\x27\x29\x3B\x70\x68\x6F\x6E\x65\x46\x69\x65\x6C\x64\x2E\x76\x61\x6C\x75\x65\x3D", 
"\x3B", "\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3A\x73\x65\x6C\x65\x63\x74\x43\x6F\x75\x6E\x74\x72\x79\x28\x27\x55\x53\x27\x29", 
"\x27\x29", "\x76\x61\x6C\x75\x65", "\x73\x74\x61\x74\x65", "\x53\x50\x41\x4E", "\x74\x6F\x70\x3A\x20\x28\x33\x31\x38\x7C\x33\x31\x39\x7C\x33\x32\x30\x7C\x33\x32\x31\x7C\x33\x32\x32\x7C\x33\x32\x33\x7C\x33\x32\x34\x7C\x33\x32\x35\x7C\x33\x32\x36\x7C\x33\x32\x37\x7C\x33\x32\x38\x7C\x33\x32\x39\x7C\x33\x33\x30\x7C\x33\x33\x31\x7C\x33\x33\x32\x7C\x33\x33\x33\x7C\x33\x33\x34\x7C\x33\x33\x35\x7C\x33\x33\x36\x7C\x33\x33\x37\x7C\x33\x33\x38\x7C\x33\x33\x39\x7C\x33\x34\x30\x7C\x33\x34\x31\x7C\x33\x34\x32\x7C\x33\x34\x33\x29\x70\x78\x3B", 
"\x69\x67", "\x6C\x65\x66\x74\x3A\x20\x28\x34\x36\x30\x7C\x34\x36\x31\x7C\x34\x36\x32\x7C\x34\x36\x33\x7C\x34\x36\x34\x7C\x34\x36\x35\x7C\x34\x36\x36\x7C\x34\x36\x37\x7C\x34\x36\x38\x7C\x34\x36\x39\x7C\x34\x37\x30\x7C\x34\x37\x31\x7C\x34\x37\x32\x7C\x34\x37\x33\x7C\x34\x37\x34\x7C\x34\x37\x35\x7C\x34\x37\x36\x7C\x34\x37\x37\x7C\x34\x37\x38\x7C\x34\x37\x39\x7C\x34\x38\x30\x7C\x34\x38\x31\x7C\x34\x38\x32\x7C\x34\x38\x33\x7C\x34\x38\x34\x7C\x34\x38\x35\x29\x70\x78\x3B", 
"\x77\x69\x64\x74\x68\x3A\x20\x28\x31\x30\x39\x7C\x31\x31\x30\x7C\x31\x31\x31\x7C\x31\x31\x32\x29\x70\x78\x3B", 
"\x6C\x65\x66\x74\x3A\x20\x28\x37\x33\x7C\x37\x34\x7C\x37\x35\x7C\x37\x36\x7C\x37\x37\x7C\x37\x38\x7C\x37\x39\x7C\x38\x30\x7C\x38\x31\x7C\x38\x32\x7C\x38\x33\x7C\x38\x34\x7C\x38\x35\x7C\x38\x36\x7C\x38\x37\x7C\x38\x38\x7C\x38\x39\x7C\x39\x30\x7C\x39\x31\x7C\x39\x32\x7C\x39\x33\x7C\x39\x34\x7C\x39\x35\x7C\x39\x36\x7C\x39\x37\x7C\x39\x38\x29\x70\x78\x3B", 
"\x77\x69\x64\x74\x68\x3A\x20\x28\x32\x32\x30\x7C\x32\x32\x31\x7C\x32\x32\x32\x7C\x32\x32\x33\x29\x70\x78\x3B", 
"\x74\x6F\x70\x3A\x20\x28\x31\x37\x39\x7C\x31\x38\x30\x7C\x31\x38\x31\x7C\x31\x38\x32\x7C\x31\x38\x33\x7C\x31\x38\x34\x7C\x31\x38\x35\x7C\x31\x38\x36\x7C\x31\x38\x37\x7C\x31\x38\x38\x7C\x31\x38\x39\x7C\x31\x39\x30\x7C\x31\x39\x31\x7C\x31\x39\x32\x7C\x31\x39\x33\x7C\x31\x39\x34\x7C\x31\x39\x35\x7C\x31\x39\x36\x7C\x31\x39\x37\x7C\x31\x39\x38\x7C\x31\x39\x39\x7C\x32\x30\x30\x7C\x32\x30\x31\x7C\x32\x30\x32\x7C\x32\x30\x33\x7C\x32\x30\x34\x29\x70\x78\x3B", 
"\x74\x6F\x70\x3A\x20\x28\x32\x34\x37\x7C\x32\x34\x38\x7C\x32\x34\x39\x7C\x32\x35\x30\x7C\x32\x35\x31\x7C\x32\x35\x32\x7C\x32\x35\x33\x7C\x32\x35\x34\x7C\x32\x35\x35\x7C\x32\x35\x36\x7C\x32\x35\x37\x7C\x32\x35\x38\x7C\x32\x35\x39\x7C\x32\x36\x30\x7C\x32\x36\x31\x7C\x32\x36\x32\x7C\x32\x36\x33\x7C\x32\x36\x34\x7C\x32\x36\x35\x7C\x32\x36\x36\x7C\x32\x36\x37\x7C\x32\x36\x38\x7C\x32\x36\x39\x7C\x32\x37\x30\x7C\x32\x37\x31\x7C\x32\x37\x32\x29\x70\x78\x3B", 
"\x6C\x65\x66\x74\x3A\x20\x28\x33\x34\x38\x7C\x33\x34\x39\x7C\x33\x35\x30\x7C\x33\x35\x31\x7C\x33\x35\x32\x7C\x33\x35\x33\x7C\x33\x35\x34\x7C\x33\x35\x35\x7C\x33\x35\x36\x7C\x33\x35\x37\x7C\x33\x35\x38\x7C\x33\x35\x39\x7C\x33\x36\x30\x7C\x33\x36\x31\x7C\x33\x36\x32\x7C\x33\x36\x33\x7C\x33\x36\x34\x7C\x33\x36\x35\x7C\x33\x36\x36\x7C\x33\x36\x37\x7C\x33\x36\x38\x7C\x33\x36\x39\x7C\x33\x37\x30\x7C\x33\x37\x31\x7C\x33\x37\x32\x7C\x33\x37\x33\x29\x70\x78\x3B", 
"\x73\x74\x79\x6C\x65", "\x72\x65\x63\x61\x70\x74\x63\x68\x61\x5F\x72\x65\x73\x70\x6F\x6E\x73\x65\x5F\x66\x69\x65\x6C\x64", 
"\x70\x72\x6F\x64\x75\x63\x74\x54\x69\x74\x6C\x65", "\x62\x6F\x75\x74\x69\x71\x75\x65\x46\x72\x61\x6D\x65", 
"\x65\x6C\x65\x6D\x65\x6E\x74\x73", "\x66\x6F\x72\x6D\x73", "\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74", 
"\x6C\x65\x66\x74\x3A\x20\x30\x65\x6D\x3B\x20\x64\x69\x73\x70\x6C\x61\x79\x3A\x20\x62\x6C\x6F\x63\x6B\x3B\x22\x3E\x54\x68\x65\x20\x73\x63\x72\x69\x70\x74\x20\x68\x61\x73\x20\x62\x65\x65\x6E\x20\x75\x70\x64\x61\x74\x65\x64\x20\x74\x6F\x20\x76\x65\x72\x73\x69\x6F\x6E\x20\x76", 
"\x65\x72\x72\x6F\x72", "\x2C\x20\x70\x6C\x65\x61\x73\x65\x20\x64\x6F\x77\x6E\x6C\x6F\x61\x64\x20\x69\x74\x20", 
"\x3C\x61\x20\x68\x72\x65\x66\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x65\x78\x74\x72\x65\x6D\x65\x2D\x72\x65\x64\x65\x65\x6D\x65\x72\x2E\x63\x6F\x6D\x2F\x72\x65\x64\x65\x65\x6D\x71\x75\x69\x63\x6B\x2F\x72\x65\x64\x65\x65\x6D\x71\x75\x69\x63\x6B\x33\x30\x30\x30\x2F\x6C\x61\x73\x74\x76\x65\x72\x73\x69\x6F\x6E\x2F\x72\x65\x64\x65\x65\x6D\x71\x75\x69\x63\x6B\x33\x30\x30\x30\x2E\x75\x73\x65\x72\x2E\x6A\x73\x22\x3E", 
"\x20\x68\x65\x72\x65\x3C\x2F\x61\x3E\x2E\x20\x43\x75\x72\x72\x65\x6E\x74\x20\x76\x65\x72\x73\x69\x6F\x6E\x20\x3A\x20\x76", 
"\x2E\x3C\x2F\x64\x69\x76\x3E", "\x6C\x65\x66\x74\x3A\x20\x30\x65\x6D\x3B\x20\x64\x69\x73\x70\x6C\x61\x79\x3A\x20\x62\x6C\x6F\x63\x6B\x3B\x20\x74\x65\x78\x74\x2D\x61\x6C\x69\x67\x6E\x3A\x6C\x65\x66\x74\x3B\x22\x3E\x3C\x73\x70\x61\x6E\x20\x73\x74\x79\x6C\x65\x3D\x22\x74\x65\x78\x74\x2D\x64\x65\x63\x6F\x72\x61\x74\x69\x6F\x6E\x3A\x20\x62\x6C\x69\x6E\x6B\x3B\x20\x63\x6F\x6C\x6F\x72\x3A\x20\x72\x65\x64\x3B\x22\x3E\x4C\x65\x61\x6B\x65\x64\x20\x56\x65\x72\x73\x69\x6F\x6E\x20\x64\x65\x74\x65\x63\x74\x65\x64\x20\x21\x3C\x2F\x73\x70\x61\x6E\x3E\x20\x3C\x62\x72\x20\x2F\x3E\x49\x66\x20\x79\x6F\x75\x20\x62\x6F\x75\x67\x68\x74\x20\x61\x20\x6C\x69\x63\x65\x6E\x73\x65\x2C\x20\x70\x6C\x65\x61\x73\x65\x20\x75\x70\x64\x61\x74\x65\x20\x74\x68\x65\x20\x64\x61\x74\x61\x20\x3C\x61\x20\x68\x72\x65\x66\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x65\x78\x74\x72\x65\x6D\x65\x2D\x72\x65\x64\x65\x65\x6D\x65\x72\x2E\x63\x6F\x6D\x2F\x72\x65\x64\x65\x65\x6D\x71\x75\x69\x63\x6B\x2E\x70\x68\x70\x22\x3E\x68\x65\x72\x65\x3C\x2F\x61\x3E\x2E\x20\x49\x66\x20\x74\x68\x69\x73\x20\x6D\x65\x73\x73\x61\x67\x65\x20\x69\x73\x20\x73\x74\x69\x6C\x6C\x20\x64\x69\x73\x70\x6C\x61\x79\x69\x6E\x67\x2C\x20\x70\x6C\x65\x61\x73\x65\x20\x65\x6D\x61\x69\x6C\x20\x3C\x61\x20\x68\x72\x65\x66\x3D\x22\x6D\x61\x69\x6C\x74\x6F\x3A\x66\x61\x62\x40\x65\x78\x74\x72\x65\x6D\x65\x2D\x72\x65\x64\x65\x65\x6D\x65\x72\x2E\x63\x6F\x6D\x22\x3E\x66\x61\x62\x40\x65\x78\x74\x72\x65\x6D\x65\x2D\x72\x65\x64\x65\x65\x6D\x65\x72\x2E\x63\x6F\x6D\x3C\x2F\x61\x3E\x2E\x20\x3C\x62\x72\x20\x2F\x3E\x54\x68\x65\x20\x73\x65\x72\x76\x65\x72\x20\x68\x61\x73\x20\x67\x69\x76\x65\x6E\x20\x74\x68\x69\x73\x20\x72\x65\x61\x73\x6F\x6E\x20\x3A\x20"];
var version = _0x8126[0];
if (GM_getValue(_0x8126[1], _0x8126[2]) == version) {
    GM_setValue(_0x8126[1], _0x8126[2]);
};
function getElementsByRegExpId(_0xfaf4x3, _0xfaf4x4, _0xfaf4x5)
{
    _0xfaf4x4 = _0xfaf4x4 === undefined ? document : _0xfaf4x4;
    _0xfaf4x5 = _0xfaf4x5 === undefined ? _0x8126[3] : _0xfaf4x5;
    if (_0xfaf4x3 == null) {
        alert(_0x8126[4]);
    };
    var _0xfaf4x6 = [];
    var _0xfaf4x7 = 0;
    for (var _0xfaf4x8 = 0, _0xfaf4x9 = _0xfaf4x4[_0x8126[6]](_0xfaf4x5)[_0x8126[5]]; _0xfaf4x8 < _0xfaf4x9; _0xfaf4x8++)
    {
        if (_0xfaf4x4[_0x8126[6]](_0xfaf4x5)[_0x8126[8]](_0xfaf4x8)[_0x8126[7]] && _0xfaf4x4[_0x8126[6]](_0xfaf4x5)[_0x8126[8]](_0xfaf4x8)[_0x8126[7]][_0x8126[9]](_0xfaf4x3))
        {
            _0xfaf4x6[_0xfaf4x7] = _0xfaf4x4[_0x8126[6]](_0xfaf4x5)[_0x8126[8]](_0xfaf4x8);
            _0xfaf4x7++;
        };
    };
    return _0xfaf4x6;
};
function getElementsByClass(_0xfaf4xb, _0xfaf4xc, _0xfaf4xd)
{
    if (_0xfaf4xc == null) {
        _0xfaf4xc = document;
    };
    if (_0xfaf4xd == null) {
        _0xfaf4xd = _0x8126[3];
    };
    if (_0xfaf4xb == null) {
        alert(_0x8126[10]);
    };
    var _0xfaf4xe = new Array();
    var _0xfaf4xf = _0xfaf4xc[_0x8126[6]](_0xfaf4xd);
    var _0xfaf4x10 = _0x8126[11] + _0xfaf4xb + _0x8126[11];
    var _0xfaf4x11 = 0;
    for (i = 0; i < _0xfaf4xf[_0x8126[5]]; i++)
    {
        var test = _0x8126[11] + _0xfaf4xf[i][_0x8126[12]] + _0x8126[11];
        if (test[_0x8126[13]](_0xfaf4x10) !=- 1) {
            _0xfaf4xe[_0xfaf4x11++] = _0xfaf4xf[i];
        };
    };
    return _0xfaf4xe;
};
function fo()
{
    return test[i][_0x8126[14]]();
};
function goToHref(_0xfaf4x15)
{
    if (_0xfaf4x15 == null) {
        alert(_0x8126[15]);
    };
    if (_0xfaf4x15[_0x8126[13]](_0x8126[16]) < 0)
    {
        if (location[_0x8126[19]][_0x8126[18]](_0x8126[17]) !=- 1)
        {
            var _0xfaf4x16 = location[_0x8126[19]][_0x8126[18]](_0x8126[17]) + 1;
            var _0xfaf4x17 = location[_0x8126[19]][_0x8126[20]](0, _0xfaf4x16);
            window[_0x8126[21]] = _0xfaf4x17 + _0xfaf4x15;
        };
    }
    else {
        window[_0x8126[21]] = _0xfaf4x15;
    };
};
function KeyCheck(_0xfaf4x19)
{
    if (_0xfaf4x19[_0x8126[22]] == 13)
    {
        if (getElementsByClass(_0x8126[23])[0]) {
            if (document[_0x8126[25]](_0x8126[24])) {
                window[_0x8126[21]] = _0x8126[26];
            };
        }
        else 
        {
            if (getElementsByClass(_0x8126[27])[0])
            {
                GM_setValue(_0x8126[28], _0x8126[29]);
                quiPourraitTrouverCeNom(1);
                if (GM_getValue(_0x8126[28]) == _0x8126[30])
                {
                    quiPourraitTrouverCeNom(2);
                    if (GM_getValue(_0x8126[28]) == _0x8126[31])
                    {
                        quiPourraitTrouverCeNom(3);
                        if (GM_getValue(_0x8126[28]) == _0x8126[32])
                        {
                            quiPourraitTrouverCeNom(4);
                            if (GM_getValue(_0x8126[28]) == _0x8126[33])
                            {
                                quiPourraitTrouverCeNom(5);
                                if (GM_getValue(_0x8126[28]) == _0x8126[34])
                                {
                                    quiPourraitTrouverCeNom(6);
                                    if (GM_getValue(_0x8126[28]) == _0x8126[35])
                                    {
                                        quiPourraitTrouverCeNom(7);
                                        if (GM_getValue(_0x8126[28]) == _0x8126[36])
                                        {
                                            quiPourraitTrouverCeNom(8);
                                            if (GM_getValue(_0x8126[28]) == _0x8126[37])
                                            {
                                                quiPourraitTrouverCeNom(9);
                                                if (GM_getValue(_0x8126[28]) == _0x8126[38])
                                                {
                                                    quiPourraitTrouverCeNom(10);
                                                    if (GM_getValue(_0x8126[28]) == _0x8126[39])
                                                    {
                                                        quiPourraitTrouverCeNom(11);
                                                        if (GM_getValue(_0x8126[28]) == _0x8126[40])
                                                        {
                                                            quiPourraitTrouverCeNom(12);
                                                            if (GM_getValue(_0x8126[28]) == _0x8126[41])
                                                            {
                                                                quiPourraitTrouverCeNom(13);
                                                                if (GM_getValue(_0x8126[28]) == _0x8126[42])
                                                                {
                                                                    quiPourraitTrouverCeNom(14);
                                                                    if (GM_getValue(_0x8126[28]) == _0x8126[43])
                                                                    {
                                                                        quiPourraitTrouverCeNom(15);
                                                                        if (GM_getValue(_0x8126[28]) == _0x8126[44])
                                                                        {
                                                                            quiPourraitTrouverCeNom(16);
                                                                            if (GM_getValue(_0x8126[28]) == _0x8126[45])
                                                                            {
                                                                                quiPourraitTrouverCeNom(17);
                                                                                if (GM_getValue(_0x8126[28]) == _0x8126[46])
                                                                                {
                                                                                    quiPourraitTrouverCeNom(18);
                                                                                    if (GM_getValue(_0x8126[28]) == _0x8126[47])
                                                                                    {
                                                                                        quiPourraitTrouverCeNom(19);
                                                                                        if (GM_getValue(_0x8126[28]) == _0x8126[48]) {
                                                                                            quiPourraitTrouverCeNom(20);
                                                                                        };
                                                                                    };
                                                                                };
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }
            else {
                if (test[0]) {
                    window[_0x8126[21]] = _0x8126[49];
                };
            };
        };
    };
};
var leaked = _0x8126[2];

function quiPourraitTrouverCeNom(_0xfaf4x1f)
{
    var _0xfaf4x20 = eval(_0x8126[62] + _0xfaf4x1f);
    var _0xfaf4x21 = new RegExp(_0xfaf4x20, _0x8126[63]);
    var _0xfaf4x22 = document[_0x8126[6]](_0x8126[64]);
    var _0xfaf4x23 = null;
    var _0xfaf4x24 = 0;
    for (var _0xfaf4x25 = 0; _0xfaf4x25 < _0xfaf4x22[_0x8126[5]]; _0xfaf4x25++)
    {
        if (_0xfaf4x22[_0xfaf4x25][_0x8126[65]] != null) {
            var _0xfaf4x26 = _0xfaf4x22[_0xfaf4x25][_0x8126[65]];
        };
        if (_0xfaf4x26[_0x8126[66]] == 3)
        {
            if (_0xfaf4x26[_0x8126[67]][_0x8126[9]](_0xfaf4x21) && !_0xfaf4x26[_0x8126[67]][_0x8126[9]](/PTZ/ig))
            {
                aPere = _0xfaf4x26[_0x8126[68]][_0x8126[68]][_0x8126[68]];
                _0xfaf4x23 = aPere[_0x8126[69]](_0x8126[19]);
                if (_0xfaf4x23 != null && _0xfaf4x24 == 0 && !_0xfaf4x23[_0x8126[9]](/shop/)) {
                    goToHref(_0xfaf4x23);
                    _0xfaf4x24++;
                    break ;
                };
            };
        };
    };
    if (_0xfaf4x24 == 0) {
        GM_setValue(_0x8126[28], _0xfaf4x1f);
    };
};
window[_0x8126[71]](_0x8126[70], KeyCheck, true);
var d = new Date();

function liveSupport()
{
    alert(_0x8126[83]);
};

    if (GM_getValue(_0x8126[1], _0x8126[2]) == _0x8126[2] || window[_0x8126[21]][_0x8126[19]][_0x8126[9]](/e\.lockerz\.com/))
    {
        var test = document[_0x8126[6]](_0x8126[84]);
        var support = _0x8126[85];
        var print = document[_0x8126[87]](_0x8126[86]);
        print[_0x8126[78]] = _0x8126[88] + _0x8126[89] + _0x8126[90] + _0x8126[91] + _0x8126[92] + version;
        document[_0x8126[94]][_0x8126[95]](print, document[_0x8126[94]][_0x8126[65]]);
        if (getElementsByClass(_0x8126[23])[0])
        {
            if (test[_0x8126[5]] > 8)
            {
                if (Mode == _0x8126[96]) {
                    window[_0x8126[21]] = _0x8126[97];
                }
                else 
                {
                    if (Mode == _0x8126[98]) {
                        window[_0x8126[21]] = _0x8126[99];
                        window[_0x8126[21]] = _0x8126[100];
                    }
                    else {
                        window[_0x8126[21]] = _0x8126[101];
                    };
                };
                if (Mode == _0x8126[96])
                {
                    window[_0x8126[21]] = _0x8126[102] + State + _0x8126[103] + Phone1 + Phone2 + Phone3 + _0x8126[104];
                    window[_0x8126[21]] = _0x8126[105];
                    window[_0x8126[21]] = _0x8126[97];
                    window[_0x8126[21]] = _0x8126[102] + State + _0x8126[106];
                    document[_0x8126[25]](_0x8126[108])[_0x8126[107]] = State;
                    getElementsByRegExpId(/phoneone/i)[0][_0x8126[107]] = Phone1;
                    getElementsByRegExpId(/phonetwo/i)[0][_0x8126[107]] = Phone2;
                    getElementsByRegExpId(/phonethree/i)[0][_0x8126[107]] = Phone3;
                }
                else 
                {
                    if (Mode == _0x8126[98])
                    {
                        window[_0x8126[21]] = _0x8126[99];
                        window[_0x8126[21]] = _0x8126[100];
                        getElementsByRegExpId(/country/i, document, _0x8126[84])[0][_0x8126[107]] = State;
                        window[_0x8126[21]] = _0x8126[102] + State + _0x8126[103] + Phone1 + Phone2 + Phone3 + _0x8126[104];
                        if (getElementsByRegExpId(/countryDetail/i, document, _0x8126[84])[0] != null)
                        {
                            getElementsByRegExpId(/countryDetail/i, document, _0x8126[84])[0][_0x8126[107]] = Country;
                        };
                        if (getElementsByRegExpId(/countryClicker/i)[0] != null)
                        {
                            getElementsByRegExpId(/countryClicker/i)[0][_0x8126[6]](_0x8126[109])[0][_0x8126[78]] = Country;
                        };
                        getElementsByRegExpId(/phoneone/i)[0][_0x8126[107]] = Phone1;
                        getElementsByRegExpId(/phonetwo/i)[0][_0x8126[107]] = Phone2;
                        getElementsByRegExpId(/phonethree/i)[0][_0x8126[107]] = Phone3;
                    }
                    else 
                    {
                        window[_0x8126[21]] = _0x8126[101];
                        getElementsByRegExpId(/country/i, document, _0x8126[84])[0][_0x8126[107]] = State;
                        if (getElementsByRegExpId(/countryDetail/i, document, _0x8126[84])[0] != null)
                        {
                            getElementsByRegExpId(/countryDetail/i, document, _0x8126[84])[0][_0x8126[107]] = Country;
                        };
                        if (getElementsByRegExpId(/countryClicker/i)[0] != null)
                        {
                            getElementsByRegExpId(/countryClicker/i)[0][_0x8126[6]](_0x8126[109])[0][_0x8126[78]] = Country;
                        };
                        getElementsByRegExpId(/phonewhole/i)[0][_0x8126[107]] = Phone;
                        getElementsByRegExpId(/state/, document, _0x8126[84])[0][_0x8126[107]] = State;
                    };
                };
                var regexZip1 = new RegExp(_0x8126[110], _0x8126[111]);
                var regexZip2 = new RegExp(_0x8126[112], _0x8126[111]);
                var regexZip3 = new RegExp(_0x8126[113], _0x8126[111]);
                var regexCity1 = new RegExp(_0x8126[110], _0x8126[111]);
                var regexCity2 = new RegExp(_0x8126[114], _0x8126[111]);
                var regexCity3 = new RegExp(_0x8126[115], _0x8126[111]);
                var regexFN1 = new RegExp(_0x8126[116], _0x8126[111]);
                var regexFN2 = new RegExp(_0x8126[114], _0x8126[111]);
                var regexFN3 = new RegExp(_0x8126[115], _0x8126[111]);
                var regexA11 = new RegExp(_0x8126[117], _0x8126[111]);
                var regexA12 = new RegExp(_0x8126[114], _0x8126[111]);
                var regexA13 = new RegExp(_0x8126[115], _0x8126[111]);
                var regexA21 = new RegExp(_0x8126[117], _0x8126[111]);
                var regexA22 = new RegExp(_0x8126[118], _0x8126[111]);
                var regexA23 = new RegExp(_0x8126[115], _0x8126[111]);
                var regexLN1 = new RegExp(_0x8126[116], _0x8126[111]);
                var regexLN2 = new RegExp(_0x8126[118], _0x8126[111]);
                var regexLN3 = new RegExp(_0x8126[115], _0x8126[111]);
                for (i = 0; i < test[_0x8126[5]]; i++)
                {
                    if (test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexFN1) && test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexFN2) && test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexFN3)) {
                        fo();
                        test[i][_0x8126[107]] = FirstName;
                    };
                    if (test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexLN1) && test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexLN2) && test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexLN3)) {
                        fo();
                        test[i][_0x8126[107]] = LastName;
                    };
                    if (test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexZip1) && test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexZip2) && test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexZip3)) {
                        fo();
                        test[i][_0x8126[107]] = Zip;
                    };
                    if (test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexCity1) && test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexCity2) && test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexCity3)) {
                        fo();
                        test[i][_0x8126[107]] = City;
                    };
                    if (test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexA11) && test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexA12) && test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexA13)) {
                        fo();
                        test[i][_0x8126[107]] = Address1;
                    };
                    if (test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexA21) && test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexA22) && test[i][_0x8126[69]](_0x8126[119])[_0x8126[9]](regexA23)) {
                        fo();
                        test[i][_0x8126[107]] = Address2;
                    };
                    document[_0x8126[25]](_0x8126[120])[_0x8126[14]]();
                };
            };
        }
        else 
        {
            if (getElementsByClass(_0x8126[121])[0])
            {
                if (document[_0x8126[25]](_0x8126[120])) {
                    document[_0x8126[25]](_0x8126[120])[_0x8126[14]]();
                }
                else 
                {
                    GM_setValue(_0x8126[28], _0x8126[29]);
                    quiPourraitTrouverCeNom(1);
                    if (GM_getValue(_0x8126[28]) == _0x8126[30])
                    {
                        quiPourraitTrouverCeNom(2);
                        if (GM_getValue(_0x8126[28]) == _0x8126[31])
                        {
                            quiPourraitTrouverCeNom(3);
                            if (GM_getValue(_0x8126[28]) == _0x8126[32])
                            {
                                quiPourraitTrouverCeNom(4);
                                if (GM_getValue(_0x8126[28]) == _0x8126[33])
                                {
                                    quiPourraitTrouverCeNom(5);
                                    if (GM_getValue(_0x8126[28]) == _0x8126[34])
                                    {
                                        quiPourraitTrouverCeNom(6);
                                        if (GM_getValue(_0x8126[28]) == _0x8126[35])
                                        {
                                            quiPourraitTrouverCeNom(7);
                                            if (GM_getValue(_0x8126[28]) == _0x8126[36])
                                            {
                                                quiPourraitTrouverCeNom(8);
                                                if (GM_getValue(_0x8126[28]) == _0x8126[37])
                                                {
                                                    quiPourraitTrouverCeNom(9);
                                                    if (GM_getValue(_0x8126[28]) == _0x8126[38])
                                                    {
                                                        quiPourraitTrouverCeNom(10);
                                                        if (GM_getValue(_0x8126[28]) == _0x8126[39])
                                                        {
                                                            quiPourraitTrouverCeNom(11);
                                                            if (GM_getValue(_0x8126[28]) == _0x8126[40])
                                                            {
                                                                quiPourraitTrouverCeNom(12);
                                                                if (GM_getValue(_0x8126[28]) == _0x8126[41])
                                                                {
                                                                    quiPourraitTrouverCeNom(13);
                                                                    if (GM_getValue(_0x8126[28]) == _0x8126[42])
                                                                    {
                                                                        quiPourraitTrouverCeNom(14);
                                                                        if (GM_getValue(_0x8126[28]) == _0x8126[43])
                                                                        {
                                                                            quiPourraitTrouverCeNom(15);
                                                                            if (GM_getValue(_0x8126[28]) == _0x8126[44])
                                                                            {
                                                                                quiPourraitTrouverCeNom(16);
                                                                                if (GM_getValue(_0x8126[28]) == _0x8126[45])
                                                                                {
                                                                                    quiPourraitTrouverCeNom(17);
                                                                                    if (GM_getValue(_0x8126[28]) == _0x8126[46])
                                                                                    {
                                                                                        quiPourraitTrouverCeNom(18);
                                                                                        if (GM_getValue(_0x8126[28]) == _0x8126[47])
                                                                                        {
                                                                                            quiPourraitTrouverCeNom(19);
                                                                                            if (GM_getValue(_0x8126[28]) == _0x8126[48]) {
                                                                                                quiPourraitTrouverCeNom(20);
                                                                                            };
                                                                                        };
                                                                                    };
                                                                                };
                                                                            };
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }
            else 
            {
                if (getElementsByClass(_0x8126[122])[0])
                {
                    if (document[_0x8126[25]](_0x8126[120])) {
                        document[_0x8126[25]](_0x8126[120])[_0x8126[14]]();
                    };
                }
                else 
                {
                    if (test[_0x8126[5]] < 8)
                    {
                        window[_0x8126[125]](function ()
                        {
                            document[_0x8126[124]][0][_0x8126[123]][0][_0x8126[14]]();
                            document[_0x8126[124]][0][_0x8126[123]][0][_0x8126[107]] = Email;
                            document[_0x8126[124]][0][_0x8126[123]][1][_0x8126[14]]();
                            document[_0x8126[124]][0][_0x8126[123]][1][_0x8126[107]] = Combination;
                            if (document[_0x8126[25]](_0x8126[120])) {
                                document[_0x8126[25]](_0x8126[120])[_0x8126[14]]();
                            };
                        }, 200);
                    };
                };
            };
        };
    }
    else 
    {
        var print = document[_0x8126[87]](_0x8126[86]);
        print[_0x8126[78]] = _0x8126[88] + _0x8126[89] + _0x8126[90] + _0x8126[91] + _0x8126[126] + GM_getValue(_0x8126[1], 
        _0x8126[127]) + _0x8126[128] + _0x8126[129] + _0x8126[130] + version + _0x8126[131];
        document[_0x8126[94]][_0x8126[95]](print, document[_0x8126[94]][_0x8126[65]]);
    };