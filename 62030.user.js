// ==UserScript==
// @name          atheisten.org-Enhancer
// @description   Verschönert das Web-Forum atheisten.org ein wenig
// @include       http://www.atheisten.org/*
// @include       http://atheisten.org/*
// ==/UserScript==

// €

var time1 = new Date();
var msec1 = time1.getTime();

var schema_user = new Array();

var dark = false;

schema_user['AOE_BGCOLOR_BODY']  = !dark ? "rgb(254,254,254)" : "rgb(001,001,001)";
schema_user['AOE_BGCOLOR_FORUM'] = !dark ? "rgb(192,192,192)" : "rgb(064,064,064)";
schema_user['AOE_COLOR_FORUM']   = !dark ? "rgb(255,255,255)" : "rgb(000,000,000)";
schema_user['AOE_COLOR_BORDER']  = !dark ? "rgb(000,000,000)" : "rgb(215,145,000)";
schema_user['AOE_COLOR_SUBBORDER'] = !dark ? "rgb(177,177,177)" : "rgb(107,072,000)";
schema_user['AOE_COLOR_SHADOW']  = !dark ? "rgb(000,000,000)" : "rgb(215,145,000)";
schema_user['AOE_COLOR_TABLINE'] = !dark ? "rgb(192,192,192)" : "rgb(084,084,084)";
schema_user['AOE_BGCOLOR_1']     = !dark ? "rgb(254,254,254)" : "rgb(001,001,001)";
schema_user['AOE_BGCOLOR_2']     = !dark ? "rgb(254,254,254)" : "rgb(001,001,001)";
schema_user['AOE_BGCOLOR_3']     = !dark ? "rgb(254,254,254)" : "rgb(001,001,001)";
schema_user['AOE_BGCOLOR_4']     = !dark ? "rgb(254,254,254)" : "rgb(001,001,001)";
schema_user['AOE_BGCOLOR_5']     = !dark ? "rgb(254,254,254)" : "rgb(001,001,001)";
schema_user['AOE_BGCOLOR_6']     = !dark ? "rgb(254,254,254)" : "rgb(001,001,001)";
schema_user['AOE_BGCOLOR_7']     = !dark ? "rgb(254,254,254)" : "rgb(001,001,001)";
schema_user['AOE_BGCOLOR_8']     = !dark ? "rgb(254,254,254)" : "rgb(001,001,001)";
schema_user['AOE_COLOR_MINORHEADER']     = !dark ? "rgb(233,233,233)" : "rgb(022,022,022)";
schema_user['AOE_BGCOLOR_MINORHEADER']     = !dark ? "rgb(233,233,233)" : "rgb(022,022,022)";
schema_user['AOE_COLOR_TEXT']    = !dark ? "black" : "rgb(215,145,000)";
schema_user['AOE_COLOR_LINK']    = !dark ? "#ff4444" : "#ff4444";
schema_user['AOE_COLOR_VLINK']   = !dark ? "#aa4444" : "#aa4444";
schema_user['AOE_BGCOLOR_CITE1'] = !dark ? "rgb(249,249,249)" : "rgb(006,006,006)";
schema_user['AOE_BGCOLOR_CITE2'] = !dark ? "rgb(229,229,229)" : "rgb(026,026,026)";
schema_user['AOE_BGCOLOR_CITE3'] = !dark ? "rgb(209,209,209)" : "rgb(046,046,046)";
schema_user['AOE_BGCOLOR_TT_READ0'] = !dark ? "rgb(254,254,254)" : "rgb(001,001,001)";
schema_user['AOE_BGCOLOR_TT_READ1'] = !dark ? "rgb(230,230,230)" : "rgb(055,055,055)";
schema_user['AOE_BGCOLOR_TT_UNREAD0'] = !dark ? "rgb(254,224,224)" : "rgb(071,041,041)";
schema_user['AOE_BGCOLOR_TT_UNREAD1'] = !dark ? "rgb(224,204,204)" : "rgb(091,061,061)";
schema_user['AOE_BGCOLOR_TT_DESCR'] = !dark ? "rgb(192,192,192)" : "rgb(044,044,044)";
schema_user['AOE_THEMOSTSOOTHINGSHADEOFBLUE'] = !dark ? "rgb(50,100,152)" : "rgb(50,100,152)";
schema_user['AOE_TABLELINE_HOVER'] = !dark ? "rgb(255,183,183)" : "rgb(33,33,93)";

var AOE_SHOW_THREAD_STARTER = true;
var AOE_SHOW_DATE_CREATED = true;
var AOE_SHOW_VIEW_COUNT = false;
var AOE_RUN_HELMIS_FUNCTION = true;
var AOE_USE_RELATIVE_DATES = false;

/* ******************************************************************************** */

var imagesetlight = new Array();
imagesetlight['announce_read.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAP///8XFxSH5BAAHAP8ALAAAAAATABIAAAIpjI+ZwO3PDJxOTvtwDpdTqn2VB4URuXUg2pinCqfxuM50yYqvvil+UgAAOw==";
imagesetlight['announce_read_locked.gif'] = "data:image/gif;base64,R0lGODlhFAASAIAAAP///8XFxSH5BAAHAP8ALAAAAAAUABIAAAIwjI+pwO3fDJxPTgtxDVTTzH1dCI7mRW5nGYVeGzHcK5MuQOP2oa9IL6pJciKF8VgAADs=";
imagesetlight['announce_read_locked_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAP///8XFxSH5BAAHAP8ALAAAAAATABIAAAIzjI+ZwO3PDDiwStokvDoG+1XiFI5b+XSOuqKZ+4Jip7HxFJFzyOsyydl5gibgx1ZUKJUFADs=";
imagesetlight['announce_read_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAP///8XFxSH5BAAHAP8ALAAAAAATABIAAAIujI+ZwO3PDDiwStokvDoG+1XiFI5b+XSOuqKZ+4Ii680wact6euOnuQO+FMREAQA7";
imagesetlight['announce_unread.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIpjI+ZwO3PDJxOTvtwDpdTqn2VB4URuXUg2pinCqfxuM50yYqvvil+UgAAOw==";
imagesetlight['announce_unread_locked.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIyjI+ZwO3PDJxOTvtwDpdTqn2VB4URuXUg2phn67mAFc8sHOUyfdjrKZGNgjeRTYFMFAAAOw==";
imagesetlight['announce_unread_locked_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIzjI+ZwO3PDDiwStokvDoG+1XiFI5b+XSOuqKZ+4Jip7HxFJFzyOsyydl5gibgx1ZUKJUFADs=";
imagesetlight['announce_unread_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIujI+ZwO3PDDiwStokvDoG+1XiFI5b+XSOuqKZ+4Ii680wact6euOnuQO+FMREAQA7";
imagesetlight['forum_link.gif'] = "data:image/gif;base64,R0lGODlhLgAZAMQAANvj7tLb6MjT4r/L3LbE1q280KO0ypqsxJGkvoecuH6VsnWNrGyFpmJ9oVl1m1BtlUdmj////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHABEALAAAAAAuABkAAAXiYCSOZASdaKquaem+IwTMdG3fMwTvpIz/OB2P5wMac0PicSlMvorLX9NZgtYECcepcQgEqU+c4QFZIBANSGNwm4JFVkBBzaYRHg1vzf2OOx4BA2laDHMINnxgVgYQCAJkCQoQDAB/iG9VNpJYjTmUCRB1SJgxNgwypwSeAAgQqjSJVFanAKmrra+jpCY2oAOgB6sLEHq6pFaGBBAPCKcOCHiXu7w2fwNjk1onwXvT1DUDDw8GV1LecQADWg8MDOzm0+gzBgrtCuRf8VFGsU7y+wD6Jfm3T+AQglEMEmHBsCGPEAA7";
imagesetlight['forum_read.gif'] = "data:image/gif;base64,R0lGODlhLgAZAJEAAP///8XFxf///wAAACH5BAEHAAIALAAAAAAuABkAAAJ2lI8Sy+3fkpwngIuz3jfQj1jcyHkgKJJqd6Lra7ZTCkB2FssJTZO8PsO9ajighDf8GUPC2o2IyS2RsOKy0lwpr4qmTbS9UrVW7lgVnnqfaePZVxZn0XF1NFl3476OPLA3pCGlFzgy+FdoyGUAmFizqMAnyQBSAAA7";
imagesetlight['forum_read_locked.gif'] = "data:image/gif;base64,R0lGODlhLgAZAJEAAPz6+MXFxf///wAAACH5BAEHAAIALAAAAAAuABkAAAJ5lI8Sy+3fkpwngIuz3jfQj1jcyHkgKJJqd6Lra7ZTmkFLKVM0q29xHtKYIIbdD1gUKoweIzLh3LGcz4pSCmgqq8nakkjlhntermL7GT/VRzWSDUVX4cGyWD7Dv/Vx+1xo08CXg/Xit2aocrSXOLIIVNj4SBhY6QBSAAA7";
imagesetlight['forum_read_subforum.gif'] = "data:image/gif;base64,R0lGODlhLgAZAJEAAPz6+MXFxf///wAAACH5BAEHAAIALAAAAAAuABkAAAJwlI8Sy+3fkpwngIuz3jfQj1jcyHkgKJJqd6Lra7ZT+o6xnND1duNV3eD5JDrIwrDQ9IbFU3MYUjql0F9mmaNWFVrKc/v1dqHh2Zh5zl63SKUxuGbrdnEw3cbm3oXyPd/uV1c1t4eFQ3hnKPPG+ABSAAA7";
imagesetlight['forum_unread.gif'] = "data:image/gif;base64,R0lGODlhLgAZAJEAANvj7kdmj////wAAACH5BAEHAAIALAAAAAAuABkAAAJzlI8Sy+3fkpwngIuz3jfQj1jcyHkgKJJqd6Lra7ZTCkB2FssJnX+8PsPJfsCdsEUsVo42U1KpOJ6eSirFCiQ2DVhd14jpFb8hKVRr45qr62s7+5aQp3EwC6oONx115GslBvdHEug1SIiXd7hROLT3yABSAAA7";
imagesetlight['forum_unread_locked.gif'] = "data:image/gif;base64,R0lGODlhLgAZAJEAANvj7kdmj////wAAACH5BAEHAAIALAAAAAAuABkAAAJ5lI8Sy+3fkpwngIuz3jfQj1jcyHkgKJJqd6Lra7ZTmkFLKVM0q29xHtKYIIbdD1gUKoweIzLh3LGcz4pSCmgqq8nakkjlhntermL7GT/VRzWSDUVX4cGyWD7Dv/Vx+1xo08CXg/Xit2aocrSXOLIIVNj4SBhY6QBSAAA7";
imagesetlight['forum_unread_subforum.gif'] = "data:image/gif;base64,R0lGODlhLgAZAJEAANvj7kdmj////wAAACH5BAEHAAIALAAAAAAuABkAAAJwlI8Sy+3fkpwngIuz3jfQj1jcyHkgKJJqd6Lra7ZT+o6xnND1duNV3eD5JDrIwrDQ9IbFU3MYUjql0F9mmaNWFVrKc/v1dqHh2Zh5zl63SKUxuGbrdnEw3cbm3oXyPd/uV1c1t4eFQ3hnKPPG+ABSAAA7";
imagesetlight['icon_post_target.gif'] = "data:image/gif;base64,R0lGODlhDAAJAJEAAOrq6gAAAP///wAAACH5BAEHAAIALAAAAAAMAAkAAAIZlIJoawGv2HkgSUfrzZphGmxZ6HHkkqRLAQA7";
imagesetlight['icon_post_target_unread.gif'] = "data:image/gif;base64,R0lGODlhDAAJAJEAANvj7kdmj////wAAACH5BAEHAAIALAAAAAAMAAkAAAIZlIJoawGv2HkgSUfrzZphGmxZ6HHkkqRLAQA7";
imagesetlight['icon_topic_attach.gif'] = "data:image/gif;base64,R0lGODlhDgASAIAAAAAAAP///yH5BAEHAAEALAAAAAAOABIAAAIjjI+py30AHXhtGrswTjF01X2cJSLhZnoTSrVgmsEZxDq2UgAAOw==";
imagesetlight['icon_topic_latest.gif'] = "data:image/gif;base64,R0lGODlhEgAJAJEAAO/v7+rq6gAAAP///yH5BAEHAAMALAAAAAASAAkAAAIknI+iipkBWRuSwrDM2vpGvWWCh4FhFwBfU42eMMGHe8nTHMIFADs=";
imagesetlight['icon_topic_newest.gif'] = "data:image/gif;base64,R0lGODlhEgAJAJEAANvj7kdmjwAAAP///yH5BAEHAAMALAAAAAASAAkAAAIlnI+hiigJImtDPBMiWMZ6i2lS93lDJgZkGaYU2Gpqc8UjlSxcAQA7";
imagesetlight['icon_topic_reported.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAP////8zACH5BAEHAAAALAAAAAATABIAAAIehI+pyw0BnYJBJmoRzmZzn4GWKJGOyaVqF6XoCh8FADs=";
imagesetlight['icon_topic_unapproved.gif'] = "data:image/gif;base64,R0lGODlhEwASAOYAAPTq6PLp5vDV1enX0+nW0u/U1O/S0u/T0+jV0OzNzerKyunIyOfExObCwuXBweXAwOO9veG6uuC3t9+1td2yste0rte1rtyvr9utrdqsrNemps2Tk8qOjsWGhsSDg8B8fLZ6db54eLh0b7pxcbFkYbBjYbBiYLBeXq9cXK5bW6xaWKxZV6xXV6tVValRUKhRUKlQUKZMTKdMTKVJSaNGRqJERKFCQqBAQJ8/P58+Ppo2Nps2Npo1NZk0NJo0NJkzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHAEAALAAAAAATABIAAAengECCg4SFhoMIICs9jCsgCIeCIjopGxENExwnOyKGAS4oEgUCpKUTLC8BhCUsC6UZPxmlCjAlgxU0DqUCsLKlEDYVgiQfu7yxxiO2QDkTxr3POII/Cc/Iuws8gjkSzxm+pRfSQCUhxuekyoIWNRG70L83FoMlMgyv36UPMyaEAC8tMBg4p2HGCwCGJrHoQMEBBQ8xeHSKNACECh8YVYAgEKmjx4+FAgEAOw==";
imagesetlight['poll_center.gif'] = "data:image/gif;base64,R0lGODlhAQAMAJEAAFF0pEdmjwAAAAAAACH5BAAHAP8ALAAAAAABAAwAAAIFVICJIQUAOw==";
imagesetlight['poll_left.gif'] = "data:image/gif;base64,R0lGODlhBAAMAJEAAFF0pEdmjwAAAP///yH5BAEHAAMALAAAAAAEAAwAAAIR3CQXIQEgHpTx1WmpAyoYVAAAOw==";
imagesetlight['poll_right.gif'] = "data:image/gif;base64,R0lGODlhBAAMAJEAAFF0pEdmjwAAAP///yH5BAEHAAMALAAAAAAEAAwAAAIQlDYRB7ANBJSNxomdUMegAgA7";
imagesetlight['sticky_read.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAPz6+MXFxSH5BAAHAP8ALAAAAAATABIAAAIpjI+ZwO3PDJxOTvtwDpf3D26U1pClJ4YVmrYUZL4Ru6o1TMuzjit+UgAAOw==";
imagesetlight['sticky_read_locked.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAPz6+MXFxSH5BAAHAP8ALAAAAAATABIAAAIvjI+ZwO3PDJxOTvtwDpf3D26U1pClJ4YVmgKWCXkcnEUuu0bHPco7vZIAe4piogAAOw==";
imagesetlight['sticky_read_locked_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAPz6+MXFxSH5BAAHAP8ALAAAAAATABIAAAIzjI+ZwO3PDDiwStokvDoG+4Hi+HRleFYT6pgtm8HxvKptVNv4lG8h0kutODoPsXhSKBMFADs=";
imagesetlight['sticky_read_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAPz6+MXFxSH5BAAHAP8ALAAAAAATABIAAAItjI+ZwO3PDDiwStokvDoG+4Hi+HRleFYT6pgtm8ExqW5y7aluTs+4/bMphokCADs=";
imagesetlight['sticky_unread.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIpjI+ZwO3PDJxOTvtwDpf3D26U1pClJ4YVmrYUZL4Ru6o1TMuzjit+UgAAOw==";
imagesetlight['sticky_unread_locked.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIvjI+ZwO3PDJxOTvtwDpf3D26U1pClJ4YVmgKWCXkcnEUuu0bHPco7vZIAe4piogAAOw==";
imagesetlight['sticky_unread_locked_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIzjI+ZwO3PDDiwStokvDoG+4Hi+HRleFYT6pgtm8HxvKptVNv4lG8h0kutODoPsXhSKBMFADs=";
imagesetlight['sticky_unread_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAItjI+ZwO3PDDiwStokvDoG+4Hi+HRleFYT6pgtm8ExqW5y7aluTs+4/bMphokCADs=";
imagesetlight['topic_moved.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAPz6+MXFxSH5BAAHAP8ALAAAAAATABIAAAIrjI+ZwO3PDJxOUmpn0Bv3+kHHk4ljkylLFJIne72wZ8bcReO17vKuCjwUAAA7";
imagesetlight['topic_read.gif'] = "data:image/gif;base64,R0lGODlhEwASAJEAAP////z6+MXFxQAAACH5BAAHAP8ALAAAAAATABIAAAI5lI+Zwe3PDJxOUmqjyoELAIaAUJHNJ4KmVo3IWLYpfK7dTLOne+SdjUoBgbhhaRO7TDjKWhOyiSYKADs=";
imagesetlight['topic_read_hot.gif'] = "data:image/gif;base64,R0lGODlhEwASAJEAAP////z6+MXFxQAAACH5BAAHAP8ALAAAAAATABIAAAIwlI+Zwe3PDJxOUmqjyoFvL1SfKAKmCYob2Xxh+2onGne1y2orrCr59eAAecOg61gAADs=";
imagesetlight['topic_read_hot_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAJEAAP////z6+MXFxQAAACH5BAAHAP8ALAAAAAATABIAAAI0lI+Zwe3PTDiwSlrfVatJzwnOF4WjCAKqSk5oyZ1nDJ4r+7qzIoN0uesAM5kWsXfUhJaGAgA7";
imagesetlight['topic_read_locked.gif'] = "data:image/gif;base64,R0lGODlhEwASAJEAAP/////79fz6+MXFxSH5BAAHAP8ALAAAAAATABIAAAJEnI+Zwu3PDBRnSndAxeMNEAyB5nWNoRmhGbEUkIrk6X5gMM4tBvdwXevZdJTgT8jh+X7J05JJ4yiAk+rOanFhadPuoQAAOw==";
imagesetlight['topic_read_locked_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAJEAAP////z6+MXFxQAAACH5BAAHAP8ALAAAAAATABIAAAI/lI+Zwe3PTDiNQkkPsFVMDGyh50jdZqAlGY3ptpbhPMYVPbOfPOZ226t1eDidCVj8fRRGHeR5fEKd0hXzeigAADs=";
imagesetlight['topic_read_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAJEAAP////z6+MXFxQAAACH5BAAHAP8ALAAAAAATABIAAAI5lI+Zwe3PTDiwSlrfVatJD4QiIDhfNIqlt6IJabZTGsrnTNs2icCsSfNFdrlYjGPMZG7KZFPDiSIKADs=";
imagesetlight['topic_unread.gif'] = "data:image/gif;base64,R0lGODlhEwASAJEAAP///9vj7kdmjwAAACH5BAAHAP8ALAAAAAATABIAAAI5lI+Zwe3PDJxOUmqjyoELAIaAUJHNJ4KmVo3IWLYpfK7dTLOne+SdjUoBgbhhaRO7TDjKWhOyiSYKADs=";
imagesetlight['topic_unread_hot.gif'] = "data:image/gif;base64,R0lGODlhEwASAJEAAP///9vj7kdmjwAAACH5BAAHAP8ALAAAAAATABIAAAI9lI+Zwe3PDJxOMoCzBs0GoBxcJDRgKIyBd4Yqa2xxV15oSpv3W3+xNiPpULyhK2cjIj+bzZIC8UAft6qgAAA7";
imagesetlight['topic_unread_hot_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAJEAAP///9vj7kdmjwAAACH5BAAHAP8ALAAAAAATABIAAAI7lI+Zwe3PTDiwSlrfNaB770gNoAhAKDikcjYiQ34xqpZtlI42rcsmD9u5ckEWMCD7HDMaIrP5tJSmiAIAOw==";
imagesetlight['topic_unread_locked.gif'] = "data:image/gif;base64,R0lGODlhEwASAJEAAP///9vj7kdmjwAAACH5BAAHAP8ALAAAAAATABIAAAI+lI+Zwe3PDAxnSndAxeIJoIEdx2mGSTafuY6RS4GymEazDF+2iNcxT1PlbsEXhqjxKTbGiZMCe/qkwqX1UAAAOw==";
imagesetlight['topic_unread_locked_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAJEAAP///9vj7kdmjwAAACH5BAAHAP8ALAAAAAATABIAAAI/lI+Zwe3PTDiNQkkPsFVMDGyh50jdZqAlGY3ptpbhPMYVPbOfPOZ226t1eDidCVj8fRRGHeR5fEKd0hXzeigAADs=";
imagesetlight['topic_unread_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAJEAAP///9vj7kdmjwAAACH5BAAHAP8ALAAAAAATABIAAAI5lI+Zwe3PTDiwSlrfVatJD4QiIDhfNIqlt6IJabZTGsrnTNs2icCsSfNFdrlYjGPMZG7KZFPDiSIKADs=";
imagesetlight['upload_bar.gif'] = "data:image/gif;base64,R0lGODlhGAEQALMAAP////T0+PD0+PDw8Ozw8Ozs8Onp7ejo7NDU3Ds7OwAAAP///wAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwALACwAAAAAGAEQAAAE/3AtpKq9OOvNu/9gKI5kaZ5oiiLSUiEHIc90bd94ru987//AoHBILBqDB4piojgIAtCodEqtWq/YrHbL7Xq/4LB4TA4LDgrlGZFIQI/wuHxOr9vvcYHSyW6/8YCBgoOEhUZnFU5tbQICho+QkZKTQ4hNAosJjZScnZ6fgJYHA5kDA6CoqaqrOANoTaSLpqy0tbaRrokEFzIHvr/AwcLDxMXGx8jJysvMzc7P0NHSywSvCLsWvdPb3N3e3+Dh4tsESggFFwUF4+zt7u/w8dMF5r4W6vL5+vv8/dAUAIUZGGjAF8GCBw76W8iwocNmAF2kQUCxosWLGDNq3Mixo8ePIB1DihxJsqTJkyhNVmihRIXLlzBjypxJs+ZMFgsiAAAh+QQFBwALACwJAAMABgAKAAAEFjDJFMKkdgpx913LtyikQhCliZZgCkYAIfkEBQcACwAsDwADAAwACgAABCIwyRTCpHbWu6cQ1xeCHikty4Wq6YQqsPLGM1zLS4zrd79EACH5BAUHAAsALBsAAwAQAAoAAAQrMMkUwqT2znq5loJwhR8oTmS5LNdaJu4US0qtrPa95Dlu+zxdbxcU/oi1CAAh+QQFBwALACwtAAMAEAAKAAAEKzDJFMKk9s56uZaCcIUfKE5kuSzXWibuFEtKraz2veQ5bvs8XW8XFP6ItQgAIfkEBQcACwAsPwADABAACgAABCswyRTCpPbOermWgnCFHyhOZLks11om7hRLSq2s9r3kOW77PF1vFxT+iLUIACH5BAUHAAsALFEAAwAQAAoAAAQrMMkUwqT2znq5loJwhR8oTmS5LNdaJu4US0qtrPa95Dlu+zxdbxcU/oi1CAAh+QQFBwALACxjAAMAEAAKAAAEKzDJFMKk9s56uZaCcIUfKE5kuSzXWibuFEtKraz2veQ5bvs8XW8XFP6ItQgAIfkEBQcACwAsdQADABAACgAABCswyRTCpPbOermWgnCFHyhOZLks11om7hRLSq2s9r3kOW77PF1vFxT+iLUIACH5BAUHAAsALIcAAwAQAAoAAAQrMMkUwqT2znq5loJwhR8oTmS5LNdaJu4US0qtrPa95Dlu+zxdbxcU/oi1CAAh+QQFBwALACyZAAMAEAAKAAAEKzDJFMKk9s56uZaCcIUfKE5kuSzXWibuFEtKraz2veQ5bvs8XW8XFP6ItQgAIfkEBQcACwAsqwADABAACgAABCswyRTCpPbOermWgnCFHyhOZLks11om7hRLSq2s9r3kOW77PF1vFxT+iLUIACH5BAUHAAsALL0AAwAQAAoAAAQrMMkUwqT2znq5loJwhR8oTmS5LNdaJu4US0qtrPa95Dlu+zxdbxcU/oi1CAAh+QQFBwALACzPAAMAEAAKAAAEKzDJFMKk9s56uZaCcIUfKE5kuSzXWibuFEtKraz2veQ5bvs8XW8XFP6ItQgAIfkEBQcACwAs4QADABAACgAABCswyRTCpPbOermWgnCFHyhOZLks11om7hRLSq2s9r3kOW77PF1vFxT+iLUIACH5BAUHAAsALPQAAwAQAAoAAAQrMMkUwqT2znq5loJwhR8oTmS5LNdaJu4US0qtrPa95Dlu+zxdbxcU/oi1CAAh+QQJRgALACwAAAAAGAEQAAAE/3DJSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94bgYByPu9z08Y9AyNxc5RmeQsnc0NLzHpUSXWaiDBTUy7X8RBR3lKoxpzGp1Rt9kYdxx+kdfpFnt+q70uslhbYIJcX1xkEwICIIqMix+NkI8ekZSTHZWYlxyZnJsbin6LoguiAl0JoV2qh4gLnaCfGrCzshm0t7YYuLu6F7y/vhbAw6eJpcemqKypp6uu0NHS0xp+A8gS19alXRKo3t3U4uPkN9vnE9rh39yt5e/w8SYKEwQL9BL2+Av6Cv4S/v7dCyivoMGDGPb1yzeQYUB8DwESREixIrx9BRouyIhxoMCIHh33WRxJ0lXHkxM4TgQ5saTLlzBjypxJs6bNmzciAAA7";
var imagesetdark = new Array();
imagesetdark['announce_read.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAP///8XFxSH5BAAHAP8ALAAAAAATABIAAAIpjI+ZwO3PDJxOTvtwDpdTqn2VB4URuXUg2pinCqfxuM50yYqvvil+UgAAOw==";
imagesetdark['announce_read_locked.gif'] = "data:image/gif;base64,R0lGODdhFAASAIABAAAAANeRACwAAAAAFAASAAACMIyPqcDt3wycT04LcQ1U08x9XQiO5kVuZxmFXhsx3CuTLkDj9qGvSC+qSXIihfFYAAA7";
imagesetdark['announce_read_locked_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAP///8XFxSH5BAAHAP8ALAAAAAATABIAAAIzjI+ZwO3PDDiwStokvDoG+1XiFI5b+XSOuqKZ+4Jip7HxFJFzyOsyydl5gibgx1ZUKJUFADs=";
imagesetdark['announce_read_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAP///8XFxSH5BAAHAP8ALAAAAAATABIAAAIujI+ZwO3PDDiwStokvDoG+1XiFI5b+XSOuqKZ+4Ii680wact6euOnuQO+FMREAQA7";
imagesetdark['announce_unread.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIpjI+ZwO3PDJxOTvtwDpdTqn2VB4URuXUg2pinCqfxuM50yYqvvil+UgAAOw==";
imagesetdark['announce_unread_locked.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIyjI+ZwO3PDJxOTvtwDpdTqn2VB4URuXUg2phn67mAFc8sHOUyfdjrKZGNgjeRTYFMFAAAOw==";
imagesetdark['announce_unread_locked_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIzjI+ZwO3PDDiwStokvDoG+1XiFI5b+XSOuqKZ+4Jip7HxFJFzyOsyydl5gibgx1ZUKJUFADs=";
imagesetdark['announce_unread_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIujI+ZwO3PDDiwStokvDoG+1XiFI5b+XSOuqKZ+4Ii680wact6euOnuQO+FMREAQA7";
imagesetdark['forum_link.gif'] = "data:image/gif;base64,R0lGODlhLgAZAMQAANvj7tLb6MjT4r/L3LbE1q280KO0ypqsxJGkvoecuH6VsnWNrGyFpmJ9oVl1m1BtlUdmj////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHABEALAAAAAAuABkAAAXiYCSOZASdaKquaem+IwTMdG3fMwTvpIz/OB2P5wMac0PicSlMvorLX9NZgtYECcepcQgEqU+c4QFZIBANSGNwm4JFVkBBzaYRHg1vzf2OOx4BA2laDHMINnxgVgYQCAJkCQoQDAB/iG9VNpJYjTmUCRB1SJgxNgwypwSeAAgQqjSJVFanAKmrra+jpCY2oAOgB6sLEHq6pFaGBBAPCKcOCHiXu7w2fwNjk1onwXvT1DUDDw8GV1LecQADWg8MDOzm0+gzBgrtCuRf8VFGsU7y+wD6Jfm3T+AQglEMEmHBsCGPEAA7";
imagesetdark['forum_read.gif'] = "data:image/gif;base64,R0lGODlhLgAZAJEAAP///8XFxf///wAAACH5BAEHAAIALAAAAAAuABkAAAJ2lI8Sy+3fkpwngIuz3jfQj1jcyHkgKJJqd6Lra7ZTCkB2FssJTZO8PsO9ajighDf8GUPC2o2IyS2RsOKy0lwpr4qmTbS9UrVW7lgVnnqfaePZVxZn0XF1NFl3476OPLA3pCGlFzgy+FdoyGUAmFizqMAnyQBSAAA7";
imagesetdark['forum_read_locked.gif'] = "data:image/gif;base64,R0lGODlhLgAZAJEAAPz6+MXFxf///wAAACH5BAEHAAIALAAAAAAuABkAAAJ5lI8Sy+3fkpwngIuz3jfQj1jcyHkgKJJqd6Lra7ZTmkFLKVM0q29xHtKYIIbdD1gUKoweIzLh3LGcz4pSCmgqq8nakkjlhntermL7GT/VRzWSDUVX4cGyWD7Dv/Vx+1xo08CXg/Xit2aocrSXOLIIVNj4SBhY6QBSAAA7";
imagesetdark['forum_read_subforum.gif'] = "data:image/gif;base64,R0lGODlhLgAZAJEAAPz6+MXFxf///wAAACH5BAEHAAIALAAAAAAuABkAAAJwlI8Sy+3fkpwngIuz3jfQj1jcyHkgKJJqd6Lra7ZT+o6xnND1duNV3eD5JDrIwrDQ9IbFU3MYUjql0F9mmaNWFVrKc/v1dqHh2Zh5zl63SKUxuGbrdnEw3cbm3oXyPd/uV1c1t4eFQ3hnKPPG+ABSAAA7";
imagesetdark['forum_unread.gif'] = "data:image/gif;base64,R0lGODlhLgAZAJEAANvj7kdmj////wAAACH5BAEHAAIALAAAAAAuABkAAAJzlI8Sy+3fkpwngIuz3jfQj1jcyHkgKJJqd6Lra7ZTCkB2FssJnX+8PsPJfsCdsEUsVo42U1KpOJ6eSirFCiQ2DVhd14jpFb8hKVRr45qr62s7+5aQp3EwC6oONx115GslBvdHEug1SIiXd7hROLT3yABSAAA7";
imagesetdark['forum_unread_locked.gif'] = "data:image/gif;base64,R0lGODlhLgAZAJEAANvj7kdmj////wAAACH5BAEHAAIALAAAAAAuABkAAAJ5lI8Sy+3fkpwngIuz3jfQj1jcyHkgKJJqd6Lra7ZTmkFLKVM0q29xHtKYIIbdD1gUKoweIzLh3LGcz4pSCmgqq8nakkjlhntermL7GT/VRzWSDUVX4cGyWD7Dv/Vx+1xo08CXg/Xit2aocrSXOLIIVNj4SBhY6QBSAAA7";
imagesetdark['forum_unread_subforum.gif'] = "data:image/gif;base64,R0lGODlhLgAZAJEAANvj7kdmj////wAAACH5BAEHAAIALAAAAAAuABkAAAJwlI8Sy+3fkpwngIuz3jfQj1jcyHkgKJJqd6Lra7ZT+o6xnND1duNV3eD5JDrIwrDQ9IbFU3MYUjql0F9mmaNWFVrKc/v1dqHh2Zh5zl63SKUxuGbrdnEw3cbm3oXyPd/uV1c1t4eFQ3hnKPPG+ABSAAA7";
imagesetdark['icon_post_target.gif'] = "data:image/gif;base64,R0lGODlhDAAJAJEAAOrq6gAAAP///wAAACH5BAEHAAIALAAAAAAMAAkAAAIZlIJoawGv2HkgSUfrzZphGmxZ6HHkkqRLAQA7";
imagesetdark['icon_post_target_unread.gif'] = "data:image/gif;base64,R0lGODlhDAAJAJEAANvj7kdmj////wAAACH5BAEHAAIALAAAAAAMAAkAAAIZlIJoawGv2HkgSUfrzZphGmxZ6HHkkqRLAQA7";
imagesetdark['icon_topic_attach.gif'] = "data:image/gif;base64,R0lGODlhDgASAIAAAAAAAP///yH5BAEHAAEALAAAAAAOABIAAAIjjI+py30AHXhtGrswTjF01X2cJSLhZnoTSrVgmsEZxDq2UgAAOw==";
imagesetdark['icon_topic_latest.gif'] = "data:image/gif;base64,R0lGODlhEgAJAJEAAO/v7+rq6gAAAP///yH5BAEHAAMALAAAAAASAAkAAAIknI+iipkBWRuSwrDM2vpGvWWCh4FhFwBfU42eMMGHe8nTHMIFADs=";
imagesetdark['icon_topic_newest.gif'] = "data:image/gif;base64,R0lGODlhEgAJAJEAANvj7kdmjwAAAP///yH5BAEHAAMALAAAAAASAAkAAAIlnI+hiigJImtDPBMiWMZ6i2lS93lDJgZkGaYU2Gpqc8UjlSxcAQA7";
imagesetdark['icon_topic_reported.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAAP////8zACH5BAEHAAAALAAAAAATABIAAAIehI+pyw0BnYJBJmoRzmZzn4GWKJGOyaVqF6XoCh8FADs=";
imagesetdark['icon_topic_unapproved.gif'] = "data:image/gif;base64,R0lGODlhEwASAOYAAPTq6PLp5vDV1enX0+nW0u/U1O/S0u/T0+jV0OzNzerKyunIyOfExObCwuXBweXAwOO9veG6uuC3t9+1td2yste0rte1rtyvr9utrdqsrNemps2Tk8qOjsWGhsSDg8B8fLZ6db54eLh0b7pxcbFkYbBjYbBiYLBeXq9cXK5bW6xaWKxZV6xXV6tVValRUKhRUKlQUKZMTKdMTKVJSaNGRqJERKFCQqBAQJ8/P58+Ppo2Nps2Npo1NZk0NJo0NJkzM////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHAEAALAAAAAATABIAAAengECCg4SFhoMIICs9jCsgCIeCIjopGxENExwnOyKGAS4oEgUCpKUTLC8BhCUsC6UZPxmlCjAlgxU0DqUCsLKlEDYVgiQfu7yxxiO2QDkTxr3POII/Cc/Iuws8gjkSzxm+pRfSQCUhxuekyoIWNRG70L83FoMlMgyv36UPMyaEAC8tMBg4p2HGCwCGJrHoQMEBBQ8xeHSKNACECh8YVYAgEKmjx4+FAgEAOw==";
imagesetdark['poll_center.gif'] = "data:image/gif;base64,R0lGODlhAQAMAJEAAFF0pEdmjwAAAAAAACH5BAAHAP8ALAAAAAABAAwAAAIFVICJIQUAOw==";
imagesetdark['poll_left.gif'] = "data:image/gif;base64,R0lGODlhBAAMAJEAAFF0pEdmjwAAAP///yH5BAEHAAMALAAAAAAEAAwAAAIR3CQXIQEgHpTx1WmpAyoYVAAAOw==";
imagesetdark['poll_right.gif'] = "data:image/gif;base64,R0lGODlhBAAMAJEAAFF0pEdmjwAAAP///yH5BAEHAAMALAAAAAAEAAwAAAIQlDYRB7ANBJSNxomdUMegAgA7";
imagesetdark['sticky_read.gif'] = "data:image/gif;base64,R0lGODdhEwASAIABAAAAANeRACwAAAAAEwASAAACKYyPmcDtzwycTk77cA6X9w9ulNaQpSeGFZq2FGS+EbuqNUzLs44rflIAADs=";
imagesetdark['sticky_read_locked.gif'] = "data:image/gif;base64,R0lGODdhEwASAIAAAAAAANeRACwAAAAAEwASAAACL4yPmcDtzwycTk77cA6X9w9ulNaQpSeGFZoClgl5HJxFLrtGxz3KO72SAHuKYqIAADs=";
imagesetdark['sticky_read_locked_mine.gif'] = "data:image/gif;base64,R0lGODdhEwASAIABAAAAANeRACwAAAAAEwASAAACM4yPmcDtzww4sEraJLw6BvuB4vh0ZXhWE+qYLZvB8byqbVTb+JRvIdJLrTg6D7F4UigTBQA7";
imagesetdark['sticky_read_mine.gif'] = "data:image/gif;base64,R0lGODdhEwASAIAAAAAAANeRACwAAAAAEwASAAACLYyPmcDtzww4sEraJLw6BvuB4vh0ZXhWE+qYLZvBMalucu2pbk7PuP2zKYaJAgA7";
imagesetdark['sticky_unread.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIpjI+ZwO3PDJxOTvtwDpf3D26U1pClJ4YVmrYUZL4Ru6o1TMuzjit+UgAAOw==";
imagesetdark['sticky_unread_locked.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIvjI+ZwO3PDJxOTvtwDpf3D26U1pClJ4YVmgKWCXkcnEUuu0bHPco7vZIAe4piogAAOw==";
imagesetdark['sticky_unread_locked_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAIzjI+ZwO3PDDiwStokvDoG+4Hi+HRleFYT6pgtm8HxvKptVNv4lG8h0kutODoPsXhSKBMFADs=";
imagesetdark['sticky_unread_mine.gif'] = "data:image/gif;base64,R0lGODlhEwASAIAAANvj7kdmjyH5BAAHAP8ALAAAAAATABIAAAItjI+ZwO3PDDiwStokvDoG+4Hi+HRleFYT6pgtm8ExqW5y7aluTs+4/bMphokCADs=";
imagesetdark['topic_moved.gif'] = "data:image/gif;base64,R0lGODdhEwASAIABAAAAANeRACwAAAAAEwASAAACK4yPmcDtzwycTlJqZ9Ab9/pBx5OJY5MpSxSSJ3u9sGfG3EXjte7yrgo8FAAAOw==";
imagesetdark['topic_read.gif'] = "data:image/gif;base64,R0lGODdhEwASAIAAAAAAANeRACwAAAAAEwASAAACMIyPmcDtzwycTlJqo8qAh/k1HliFUYd0ZUWKpgq94yLLrcbGq7vtV/z6uYTAjfFQAAA7";
imagesetdark['topic_read_hot.gif'] = "data:image/gif;base64,R0lGODdhEwASAIABAAAAANeRACwAAAAAEwASAAACKoyPmcDtzwycTlJqo8qAbx9Un0iWmriZ3diAj9uyZ5zGqKJeuT7z9/cpAAA7";
imagesetdark['topic_read_hot_mine.gif'] = "data:image/gif;base64,R0lGODdhEwASAIAAAAAAANeRACwAAAAAEwASAAACMIyPmcDtzww4sEpa31WrSc8FzheFowhqaHlyZ6u8qcyC7lzedR7jGUT6qYSWkNFQAAA7";
imagesetdark['topic_read_locked.gif'] = "data:image/gif;base64,R0lGODdhEwASAIAAAAAAANeRACwAAAAAEwASAAACNIyPmcDtzwwEZ0pXKw6P09h5EZeJlOlpKGptWNtc4PzFLL2+UB7D46bgTYay4c5kBAaXhgIAOw==";
imagesetdark['topic_read_locked_mine.gif'] = "data:image/gif;base64,R0lGODdhEwASAIABAAAAANeRACwAAAAAEwASAAACNoyPmcDtzww4jUJJs3QYx88F4dSNVbSJlQo+LMlBk9my71afa3zRc79bKW4v2aVo9CVDw+ahAAA7";
imagesetdark['topic_read_mine.gif'] = "data:image/gif;base64,R0lGODdhEwASAIAAAAAAANeRACwAAAAAEwASAAACM4yPmcDtzww4sEpa31WrSW85XxR6gTghk3iCUBvB68uiizzOWu3uJsvhZSyyodAI5CgNBQA7";
imagesetdark['topic_unread.gif'] = "data:image/gif;base64,R0lGODdhEwASAKEDAAAAAGtIANeRAP///ywAAAAAEwASAAACPJSPmcHtzwycTlJqo8qBCwCGgFCRzSeCplaNyFi2wEyvnY3SM467B3zq6Xax05AYLG2KFwinmYQ+NtREAQA7";
imagesetdark['topic_unread_hot.gif'] = "data:image/gif;base64,R0lGODdhEwASAKEAAAAAAGtIANeRAAAAACwAAAAAEwASAAACP5SPmcHtzwycTjKAswbNBqAcXCQ0YCiMgXeGKmsAshx35YWmtpm/9xebnXw8FBFn3CFdyo/weaRMPNJH7iooAAA7";
imagesetdark['topic_unread_hot_mine.gif'] = "data:image/gif;base64,R0lGODdhEwASAKEBAAAAAGtIANeRAGtIACwAAAAAEwASAAACO5SPmcHtz0w4sEpa3zWge+9IDaAIQCg4pHI2IkN+MaqWbZSONq3LJg/buXJBFjAg+xwzGiKz+bSUpogCADs=";
imagesetdark['topic_unread_locked.gif'] = "data:image/gif;base64,R0lGODdhEwASAKEAAAAAAGtIANeRAAAAACwAAAAAEwASAAACQJSPmcHtzwwMZ0p3QMXiCaCBHcdphkk2n7mOkUsB8qylET3D1y2vtarL5Wwx3O+FMR4pOsWOOYkipRYYFejMHgoAOw==";
imagesetdark['topic_unread_locked_mine.gif'] = "data:image/gif;base64,R0lGODdhEwASAKEAAAAAAGtIANeRAAAAACwAAAAAEwASAAACP5SPmcHtz0w4jUJJD7BVTAxsoedI3WagJRmN6baW4TzGFT2znzzmdturdXg4nQlY/H0URh3keXxCndIV83ooAAA7";
imagesetdark['topic_unread_mine.gif'] = "data:image/gif;base64,R0lGODdhEwASAKEAAAAAAGtIANeRAAAAACwAAAAAEwASAAACOZSPmcHtz0w4sEpa31WrSQ+EIiA4XzSKpbeiCWm2UxrK50zbNonArEnzRXa5WIxjzGRuymRTw4kiCgA7";
imagesetdark['upload_bar.gif'] = "data:image/gif;base64,R0lGODlhGAEQALMAAP////T0+PD0+PDw8Ozw8Ozs8Onp7ejo7NDU3Ds7OwAAAP///wAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBwALACwAAAAAGAEQAAAE/3AtpKq9OOvNu/9gKI5kaZ5oiiLSUiEHIc90bd94ru987//AoHBILBqDB4piojgIAtCodEqtWq/YrHbL7Xq/4LB4TA4LDgrlGZFIQI/wuHxOr9vvcYHSyW6/8YCBgoOEhUZnFU5tbQICho+QkZKTQ4hNAosJjZScnZ6fgJYHA5kDA6CoqaqrOANoTaSLpqy0tbaRrokEFzIHvr/AwcLDxMXGx8jJysvMzc7P0NHSywSvCLsWvdPb3N3e3+Dh4tsESggFFwUF4+zt7u/w8dMF5r4W6vL5+vv8/dAUAIUZGGjAF8GCBw76W8iwocNmAF2kQUCxosWLGDNq3Mixo8ePIB1DihxJsqTJkyhNVmihRIXLlzBjypxJs+ZMFgsiAAAh+QQFBwALACwJAAMABgAKAAAEFjDJFMKkdgpx913LtyikQhCliZZgCkYAIfkEBQcACwAsDwADAAwACgAABCIwyRTCpHbWu6cQ1xeCHikty4Wq6YQqsPLGM1zLS4zrd79EACH5BAUHAAsALBsAAwAQAAoAAAQrMMkUwqT2znq5loJwhR8oTmS5LNdaJu4US0qtrPa95Dlu+zxdbxcU/oi1CAAh+QQFBwALACwtAAMAEAAKAAAEKzDJFMKk9s56uZaCcIUfKE5kuSzXWibuFEtKraz2veQ5bvs8XW8XFP6ItQgAIfkEBQcACwAsPwADABAACgAABCswyRTCpPbOermWgnCFHyhOZLks11om7hRLSq2s9r3kOW77PF1vFxT+iLUIACH5BAUHAAsALFEAAwAQAAoAAAQrMMkUwqT2znq5loJwhR8oTmS5LNdaJu4US0qtrPa95Dlu+zxdbxcU/oi1CAAh+QQFBwALACxjAAMAEAAKAAAEKzDJFMKk9s56uZaCcIUfKE5kuSzXWibuFEtKraz2veQ5bvs8XW8XFP6ItQgAIfkEBQcACwAsdQADABAACgAABCswyRTCpPbOermWgnCFHyhOZLks11om7hRLSq2s9r3kOW77PF1vFxT+iLUIACH5BAUHAAsALIcAAwAQAAoAAAQrMMkUwqT2znq5loJwhR8oTmS5LNdaJu4US0qtrPa95Dlu+zxdbxcU/oi1CAAh+QQFBwALACyZAAMAEAAKAAAEKzDJFMKk9s56uZaCcIUfKE5kuSzXWibuFEtKraz2veQ5bvs8XW8XFP6ItQgAIfkEBQcACwAsqwADABAACgAABCswyRTCpPbOermWgnCFHyhOZLks11om7hRLSq2s9r3kOW77PF1vFxT+iLUIACH5BAUHAAsALL0AAwAQAAoAAAQrMMkUwqT2znq5loJwhR8oTmS5LNdaJu4US0qtrPa95Dlu+zxdbxcU/oi1CAAh+QQFBwALACzPAAMAEAAKAAAEKzDJFMKk9s56uZaCcIUfKE5kuSzXWibuFEtKraz2veQ5bvs8XW8XFP6ItQgAIfkEBQcACwAs4QADABAACgAABCswyRTCpPbOermWgnCFHyhOZLks11om7hRLSq2s9r3kOW77PF1vFxT+iLUIACH5BAUHAAsALPQAAwAQAAoAAAQrMMkUwqT2znq5loJwhR8oTmS5LNdaJu4US0qtrPa95Dlu+zxdbxcU/oi1CAAh+QQJRgALACwAAAAAGAEQAAAE/3DJSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94bgYByPu9z08Y9AyNxc5RmeQsnc0NLzHpUSXWaiDBTUy7X8RBR3lKoxpzGp1Rt9kYdxx+kdfpFnt+q70uslhbYIJcX1xkEwICIIqMix+NkI8ekZSTHZWYlxyZnJsbin6LoguiAl0JoV2qh4gLnaCfGrCzshm0t7YYuLu6F7y/vhbAw6eJpcemqKypp6uu0NHS0xp+A8gS19alXRKo3t3U4uPkN9vnE9rh39yt5e/w8SYKEwQL9BL2+Av6Cv4S/v7dCyivoMGDGPb1yzeQYUB8DwESREixIrx9BRouyIhxoMCIHh33WRxJ0lXHkxM4TgQ5saTLlzBjypxJs6bNmzciAAA7";

var customstyle = ''
+'html, body { background-color : AOE_BGCOLOR_BODY; color: AOE_COLOR_TEXT ; }\n'
+'\n'
+'input, input[type="text"], input[type="select"], option, textarea { background-color: AOE_BGCOLOR_TT_READ1 !important; color: AOE_COLOR_TEXT !important; }\n'
+'\n'
+'table, td, tr { border-collapse: collapse !important; padding: 0 !important; margin: 0 !important; }\n'
+'td { vertical-align: top !important; }\n'
+'\n'
+'/* div#wrap > br + div.forabg { display: none; } */\n'
+'div#wrap > br + div.forabg,\n'
+'div#wrap > br + div.forabg * { background-color: AOE_BGCOLOR_BODY; color: AOE_COLOR_TEXT; }\n'
+'div#wrap > br + div.forabg { display: ' + ((get_loginname() == "roach") ? "none" : "block") + ' !important; }\n'
+'div.headerbar { height: 30px; display: block; font-size: 30px; background-color: AOE_BGCOLOR_BODY ; font-variant: normal; letter-spacing: 2px; text-align: center; background-image: none; color: AOE_COLOR_TEXT ; }\n'
+'div#site-description { display: block; background-image: none; }\n'
+'\n'
+'div.headerbar div#site-description { border: solid green 1px !important; display: none; }\n'
+'div.headerbar div#wrap { border: solid lightgreen 0px !important; background-color: AOE_BGCOLOR_BODY ; }\n'
+'\n'
+'body { background-color: AOE_BGCOLOR_BODY ; }\n'
+'div#wrap { background-color: AOE_BGCOLOR_TT_READ1 ; border: solid AOE_COLOR_BORDER 1px;  }\n'
+'div#page-body { background-color: AOE_BGCOLOR_TT_READ1 !important ; border: solid AOE_COLOR_BORDER 0px; padding:0; }\n'
+'\n'
+'div.navbar { background-image: none; background-color: AOE_BGCOLOR_BODY; border: solid AOE_COLOR_TABLINE 1px; }\n'
+'div.navbar * { color: AOE_COLOR_TEXT ; }\n'
+'\n'
+'div#page-body > p { margin-bottom: 0; }\n'
+'div#page-body > h2 { font-size: 16px; width: 50%; border: solid red 0px; clear: none;}\n'
+'div#page-body > h2 + p { float: right; clear: both; border: solid red 0px; margin-top: -21px;}\n'
+'\n'
+'div#page-body { background-color: AOE_BGCOLOR_3 ; }\n'
+'\n'
+'a.forumtitle,\n'
+'a.topictitle { font-size: 12px; }\n'
+'\n'
+'a:link { text-decoration: underline; }\n'
+'a:hover { text-decoration: none; }\n'
+'a { color: AOE_COLOR_LINK !important; }\n'
+'table a { color: AOE_COLOR_TEXT !important; }\n'
+'table.postblock { background-color: AOE_BGCOLOR_BODY !important ; }\n'
+'table.postblock a { color: AOE_COLOR_LINK !important; }\n'
+'table.postblock a[style="color:#009900;"]  { color: #009900 !important; }\n'
+'table.postblock a[style="color: #009900;"]  { color: #009900 !important; }\n'
+'table.postblock a[style="color: #AA0000;"]  { color: #AA0000 !important; }\n'
+'\n'
+'a[style="color:#009900;"]  { color: #009900 !important; }\n'
+'a[style="color: #009900;"]  { color: #009900 !important; }\n'
+'a[style="color: #AA0000;"]  { color: #AA0000 !important; }\n'
+'\n'
+'dl.icon dt > a + br { display: block; }\n'
+'dl.icon dt > a + br + a + br { display: inline; }\n'
+'\n'
+'/* Posting */\n'
+'\n'
+'div.bg3 { display: block; }\n'
+'\n'
+'blockquote { border: solid darkblue 1px; background-color: AOE_BGCOLOR_CITE1 ; background-image: none;  padding: 0; }\n'
+'\n'
+'blockquote blockquote { border: solid darkblue 1px; background-color: AOE_BGCOLOR_CITE2 ;}\n'
+'blockquote blockquote blockquote { border: solid darkblue 1px; background-color: AOE_BGCOLOR_CITE3 ;}\n'
+'blockquote div { background-image: none; margin: 0; padding: 5px;}\n'
+'blockquote div cite { margin: 0px; padding: 3px; color: white; background-image: none; background-color: AOE_THEMOSTSOOTHINGSHADEOFBLUE ;  margin-left: -5px;margin-top: -5px; padding-right: 10px; }\n'
+'\n'
+'.pmlist li.bg1 { border: solid 0px transparent; border-width: 0 0px; }\n'
+'\n'
+'.pmlist li.bg2 { border: solid 0px transparent; border-width: 0 0px; }\n'
+'\n'
+'.bg1 { background-color: transparent;}\n'
+'.bg2 { background-color: transparent; }\n'
+'.bg3 { background-color: transparent; }\n'
+'\n'
+'fieldset.submit-buttons > input  { margin-left: 20px; margin-right: 20px; }\n'
+'\n'
+'.post:target h3 a { color: #105289; }\n'
+'\n'
+'.post:target *, .post * { color: AOE_COLOR_TEXT ; }\n'
+'\n'
+'/* BEGIN: topictable */\n'
+'table#aoetopictable { border: solid black 1px; padding: 0; border-collapse:collapse; min-width: 885px; }\n'
+'table#aoetopictable { margin: 0; padding: 0; }\n'
+'\n'
+'table#aoetopictable tr.attrow0 { background-color: AOE_BGCOLOR_TT_READ0 ; color: AOE_COLOR_TEXT ; }\n'
+'table#aoetopictable tr.attrow1 { background-color: AOE_BGCOLOR_TT_READ1 ; color: AOE_COLOR_TEXT ; }\n'
+'table#aoetopictable tr.attrow1unread { background-color: AOE_BGCOLOR_TT_UNREAD1 ; color: AOE_COLOR_TEXT ; }\n'
+'table#aoetopictable tr.attrow0unread { background-color: AOE_BGCOLOR_TT_UNREAD0 ; color: AOE_COLOR_TEXT ; }\n'
+'table#aoetopictable tr:hover { background-color: AOE_TABLELINE_HOVER !important; }\n'
+'\n'
+'table#aoetopictable td,\n'
+'table#aoetopictable th { border: solid AOE_COLOR_TABLINE 1px; border-collapse: collapse; margin: 0;\n'
+'    padding-left: 3px; padding-right: 3px; color: AOE_COLOR_TEXT; }\n'
+'table#aoetopictable td a { color: AOE_COLOR_TEXT ; }\n'
+'table#aoetopictable th { background-color: AOE_BGCOLOR_TT_DESCR ; }\n'
+'table#aoetopictable th.atttitle { min-width: 350px; }\n'
+'/* table#aoetopictable td.attupdated { font-family: monospace; padding-left: 4px; padding-right: 4px; } */\n'
+'table#aoetopictable td.attlastauthor,\n'
+'table#aoetopictable td.attauthor { padding-right: 7px; padding-left: 4px; }\n'
+'table#aoetopictable th.attjumpto select { min-width: 50px; background-color: yellow; }\n'
+'table#aoetopictable th.attunread,\n'
+'table#aoetopictable th.attlastpost,\n'
+'table#aoetopictable td.attunread,\n'
+'table#aoetopictable td.attlastpost { padding-left: 3px; padding-right: 3px; text-align: center; }\n'
+'table#aoetopictable td.attjumpto select { min-width: 40px; }\n'
+'table#aoetopictable td.attstatus,\n'
+'table#aoetopictable td.attstatus img { vertical-align: middle; text-align: center; }\n'
+'table#aoetopictable td.attstatus { padding: 1px; }\n'
+'table#aoetopictable td.attreplies,\n'
+'table#aoetopictable td.attviews { text-align: right; }\n'
+'/* END: topictable */\n'
+'\n'
+'/* BEGIN: Forumtable */\n'
+'table#forumtable { background-color: AOE_BGCOLOR_TT_READ0 ; color: AOE_COLOR_TEXT ; border: solid red 1px; border-collapse: collapse; }\n'
+'\n'
+'table#forumtable tr.forumheader { background-color: AOE_THEMOSTSOOTHINGSHADEOFBLUE ; }\n'
+'table#forumtable tr.forumheader td { color: rgb(255,255,255) !important ; }\n'
+'table#forumtable tr.forumsubheader { background-color: darkred; }\n'
+'table#forumtable tr.forumsubheader th { text-align: left !important; }\n'
+'\n'
+'table#forumtable tr.attrow1 { background-color: AOE_BGCOLOR_TT_READ1 ; }\n'
+'table#forumtable tr.attrow0unread { background-color: AOE_BGCOLOR_TT_UNREAD0 ; }\n'
+'table#forumtable tr.attrow1unread { background-color: AOE_BGCOLOR_TT_UNREAD1 ; }\n'
+'\n'
+'table#forumtable tr.attrow0:hover,\n'
+'table#forumtable tr.attrow1:hover,\n'
+'table#forumtable tr.attrow0unread:hover,\n'
+'table#forumtable tr.attrow1unread:hover { background-color: AOE_TABLELINE_HOVER !important; }\n'
+'\n'
+'table#forumtable th,\n'
+'table#forumtable th a { background-color: AOE_BGCOLOR_TT_DESCR ; color: AOE_COLOR_TEXT ; text-align: left; padding-left: 5px;}\n'
+'table#forumtable th,\n'
+'table#forumtable td { border: solid AOE_COLOR_TABLINE 1px; padding-left: 4px; padding-right: 4px; color: AOE_COLOR_TEXT ; }\n'
+'table#forumtable a  { color: AOE_COLOR_TEXT ; text-decoration: underline; }\n'
+'table#forumtable a:hover { color: AOE_COLOR_TEXT !important ; text-decoration: none; }\n'
+'table#forumtable td.status img   { vertical-align: middle; padding-top: 2px; padding-bottom: 2px; }\n'
+'table#forumtable td.title    { min-width: 230px; }\n'
+'table#forumtable td.mods     { min-width: 130px; }\n'
+'table#forumtable td.nthreads,\n'
+'table#forumtable td.nposts   { min-width: 45px; text-align: right; }\n'
+'table#forumtable td.ndate    { min-width: 140px; }\n'
+'table#forumtable td.nauthor  { min-width: 143px; }\n'
+'/* END: Forumtable */\n'
+'\n'
+'div#whosonline { border: solid AOE_COLOR_TABLINE 1px; background-color: AOE_BGCOLOR_TT_UNREAD0 ; color: AOE_COLOR_TEXT ; }\n'
+'\n'
+'div#whosonline a { color: AOE_COLOR_TEXT ; }\n'
+'.post:target .content, .post:target h3 a { color: AOE_COLOR_TEXT ; }\n'
+'\n'
+'/* BEGIN: posting */\n'
+'table.postblock { border: solid AOE_COLOR_BORDER 1px; border-bottom-width: 4px; border-right-width: 4px; margin-bottom: 15px !important; }\n'
+'table.postblock tr td { border: solid AOE_COLOR_SUBBORDER 1px; border-collapse: collapse; }\n'
+'\n'
+'td.authornick { border-top-color: AOE_COLOR_BORDER !important; border-left-color: AOE_COLOR_BORDER !important;  }\n'
+'td.subjectline { border-top-color: AOE_COLOR_BORDER !important; }\n'
+'td.authorstatus, td.profileblock, td.actionsection { border-left-color: AOE_COLOR_BORDER !important;  }\n'
+'\n'
+'table.postblock table.profiledata tr td,\n'
+'table.postblock table.postcontent tr td,\n'
+'table.postblock table.profiledata  tr  td,\n'
+'table.postblock table.profiledata  tr  td { border-right-width: 0px; border-left-width: 0px; }\n'
+'td.authoricon { border-top-width: 0px !important; }\n'
+'td.authoractionignore { border-bottom-width: 0px !important; }\n'
+'td.authorpostcount, td.authorregistered, td.authorlocation { border-right-width: 1px !important; }\n'
+'\n'
+'table.postblock table.actionsection a { margin-left: 40px !important; font-size: 150%; }\n'
+'table.postblock td.subjectline { font-weight: bold; letter-spacing: 2px; }\n'
+'table.postblock td.postcontentblock div  { font-family: verdana !important; font-size: 11pt !important; }\n'
+'table.postblock table.profiledata { width: 200px !important; }\n'
+'table.postblock td.authornick, td.authoractionignore, td.authoractionfilter, td.authoricon { text-align: center; }\n'
+'table.postblock td.signature { border-bottom-width: 0px !important;  }\n'
+'p.signature { border-top: dashed AOE_COLOR_SUBBORDER 2px ; }\n'
+'table.actionsection { float: right !important; }\n'
+'table.actionsection td { border-width: 0px !important; }\n'
+'table.postblock td.authornick  { letter-spacing: 3px; font-size: 150%; font-weight: bold; }\n'
+'table.postblock td.authorcommunication a { margin-right: 15px; }\n'
+'\n'
+'table.postblock td.postcontentblock { width: 685px !important;  }\n'
+'table.postblock td.postcontentblock ul,\n'
+'table.postblock td.postcontentblock ol { padding-left: 40px !important; }\n'
+'/* END: posting */\n'
+'\n'
+'/* Fix Schattenkinds violation of netiquette */\n'
+'span[style="color: #6000FF"] { color: AOE_COLOR_TEXT !important ; }\n'
+'\n'
+'/* Helmis settings */\n'
+'a.helmi, a.helmi:hover, dt a.helmi, dt a.helmi:hover { color: magenta !important; }\n'
+'table.postblock a.helmi, table.postblock a.helmi:hover { color: magenta !important; }\n'
+'div.helmi { border-color: magenta !important; }\n'
+'div.helmi div.inner { border-bottom: solid magenta 2px; border-right: solid magenta 2px; }\n'
+'table.helmipost { border-color: magenta !important; }\n'
+'/* table.helmipost td { border-color: darkmagenta !important; } */\n'
+'table.helmipost td.authornick { border-top-color: magenta !important; border-left-color: magenta !important;  }\n'
+'table.helmipost td.subjectline { border-top-color: magenta !important; }\n'
+'table.helmipost td.authorstatus, table.helmipost td.profileblock, table.helmipost td.actionsection { border-left-color: magenta !important;  }\n'
+'\n'
+'div#aoeadvancedsearchbox { \n'
+'    position: absolute;\n'
+'    top: 90px;\n'
+'    min-width: 300px;\n'
+'    right: ' + Math.floor((window.innerWidth) / 2 - 150) + 'px;\n'
+'    border: solid red 1px;\n'
+'    background-color: AOE_BGCOLOR_BODY ;\n'
+'    color: AOE_COLOR_TEXT ;\n'
+'}\n'
+'\n'
+'div#aoeadvancedsearchbox td.aoeopaque { background-color: AOE_BGCOLOR_BODY !important; }\n'
+'div.panel { background-color : AOE_BGCOLOR_BODY; color: AOE_COLOR_TEXT ; } \n'
+'div.panel *  { color: AOE_COLOR_TEXT ; }\n'
+'\n'
+'span.aoereldate {\n'
+'    font-weight: 800 !important;\n'
+'    font-size: 110% !important;\n'
+'}\n'
+'\n'
+'div.cute_profiles_sprite { border: solid red 1px !important; display: none !important; }\n'
+'\n'
+'/*\n'
+'span.aoereldate_a { color: rgb(255,255,000); }\n'
+'span.aoereldate_d { color: rgb(255,000,255); }\n'
+'span.aoereldate_h { color: rgb(000,255,255); }\n'
+'span.aoereldate_m { color: rgb(000,255,000); }\n'
+'span.aoereldate_s { color: rgb(127,127,255); }\n'
+'*/\n'
+'';
var usernames = new Array ();
usernames["sxe"] = '2';
usernames["inri"] = '3';
usernames["Zarathustra"] = '4';
usernames["-=[CrYpT]=-"] = '5';
usernames["Fire"] = '6';
usernames["BloodOnTheDancefloor"] = '7';
usernames["Con"] = '11';
usernames["maeck"] = '13';
usernames["Ichhalt"] = '14';
usernames["HARMAGEDON"] = '15';
usernames["StateOfMinds"] = '16';
usernames["silkestaron"] = '18';
usernames["Mary"] = '19';
usernames["hjaldi"] = '20';
usernames["Sep Bully"] = '21';
usernames["Volker"] = '24';
usernames["Pegasos"] = '26';
usernames["FioreGraz"] = '27';
usernames["Ice Roc"] = '28';
usernames["ein-stein"] = '29';
usernames["Träne"] = '31';
usernames["El Lute"] = '32';
usernames["Metis"] = '33';
usernames["Henlebua"] = '34';
usernames["neverSlave"] = '35';
usernames["Thanatos"] = '36';
usernames["Thot"] = '37';
usernames["Kurbel"] = '38';
usernames["Pax"] = '39';
usernames["manta"] = '40';
usernames["Thurisaz"] = '42';
usernames["DNEB"] = '44';
usernames["Freigeist"] = '45';
usernames["Gorm"] = '46';
usernames["EssE"] = '47';
usernames["hofmann_ve"] = '48';
usernames["Thomas"] = '50';
usernames["LANzelot"] = '51';
usernames["Phoenix"] = '53';
usernames["gluglu"] = '54';
usernames["BigBasti"] = '55';
usernames["vanitas"] = '56';
usernames["El Schwalmo"] = '57';
usernames["Sam"] = '58';
usernames["Antisthenes"] = '59';
usernames["zaquarta"] = '61';
usernames["Maranatha"] = '63';
usernames["Fussel"] = '65';
usernames["XelN"] = '66';
usernames["Kerstin"] = '67';
usernames["Janis"] = '68';
usernames["Stormrider"] = '69';
usernames["redhorse"] = '70';
usernames["Nix"] = '71';
usernames["andi"] = '72';
usernames["cloudsofsmoke"] = '73';
usernames["DrOetker"] = '79';
usernames["mandy"] = '80';
usernames["vronib111"] = '83';
usernames["andre_reichel"] = '84';
usernames["ac2000"] = '85';
usernames["Sticky"] = '86';
usernames["padrak"] = '87';
usernames["Kanyin"] = '91';
usernames["Schmierlappen"] = '92';
usernames["lux parva"] = '93';
usernames["glubschauge"] = '94';
usernames["alfons"] = '95';
usernames["Degree37Celsius"] = '96';
usernames["Dünenelfe"] = '97';
usernames["maxinquaye"] = '98';
usernames["Mojud"] = '99';
usernames["bitflop"] = '100';
usernames["guenter"] = '101';
usernames["Stefan"] = '102';
usernames["Atheisto"] = '106';
usernames["FAUST"] = '111';
usernames["X to the P"] = '112';
usernames["WELTBLICK"] = '114';
usernames["deten"] = '116';
usernames["Thomas der Ungläubige"] = '119';
usernames["Anti"] = '122';
usernames["redhead"] = '123';
usernames["polykrit"] = '126';
usernames["Karl Kanal"] = '127';
usernames["Kallnapp"] = '128';
usernames["Theist"] = '129';
usernames["M.Rebellfaa"] = '131';
usernames["Ahriman"] = '133';
usernames["DaVinci"] = '135';
usernames["albi2000"] = '137';
usernames["Margit"] = '138';
usernames["DrahminFaa"] = '140';
usernames["Smilla"] = '141';
usernames["Ramones"] = '142';
usernames["Faulgor"] = '143';
usernames["Petrosilius Zwackelmann"] = '146';
usernames["Aurelius"] = '151';
usernames["Turmfalke"] = '154';
usernames["Bulli"] = '158';
usernames["flare"] = '159';
usernames["bidin"] = '160';
usernames["woschd"] = '163';
usernames["10 Gebote"] = '164';
usernames["mag-ray"] = '165';
usernames["// DBP"] = '166';
usernames["lorenz"] = '167';
usernames["Omri"] = '168';
usernames["Nikolai"] = '169';
usernames["Doktor Zoidberg"] = '170';
usernames["magog"] = '175';
usernames["zero"] = '176';
usernames["Werner Fritz"] = '177';
usernames["DS4"] = '179';
usernames["Domingo"] = '180';
usernames["Kimmik"] = '181';
usernames["manju"] = '183';
usernames["Xedion"] = '184';
usernames["Skeptikos"] = '185';
usernames["iolosono"] = '186';
usernames["larsalt"] = '187';
usernames["Flo77"] = '188';
usernames["Hans"] = '191';
usernames["lehner"] = '192';
usernames["Inge"] = '193';
usernames["Euripides"] = '194';
usernames["Timotheus"] = '195';
usernames["Alter Ego"] = '197';
usernames["RammsteinBasti"] = '198';
usernames["gavagai"] = '199';
usernames["Peach"] = '200';
usernames["TEXING"] = '201';
usernames["Jo"] = '202';
usernames["eksisto"] = '204';
usernames["Hoffensterchen"] = '206';
usernames["Jabberwock"] = '208';
usernames["josef"] = '209';
usernames["todoroff"] = '210';
usernames["Extispex"] = '211';
usernames["Abidin"] = '213';
usernames["Tankred"] = '214';
usernames["Dingo"] = '215';
usernames["michael"] = '216';
usernames["tomboy"] = '217';
usernames["Martin"] = '218';
usernames["Frank"] = '220';
usernames["Brigitte Bussmann"] = '221';
usernames["Berlinerin"] = '222';
usernames["Highlander"] = '223';
usernames["glowinginthesun"] = '227';
usernames["der kleine Fritz"] = '229';
usernames["PeterPyro"] = '232';
usernames["Boyaka"] = '233';
usernames["sömee"] = '234';
usernames["Fingolfin"] = '235';
usernames["Rene"] = '236';
usernames["Revilo"] = '239';
usernames["QuarionX"] = '240';
usernames["Sunking"] = '241';
usernames["bio-event.de"] = '243';
usernames["eldudi"] = '244';
usernames["Schattenkind"] = '245';
usernames["cihad"] = '246';
usernames["sandman666"] = '247';
usernames["Sapere Aude"] = '248';
usernames["kreidefresser"] = '249';
usernames["Carsten"] = '252';
usernames["gerribe"] = '253';
usernames["Matthau"] = '254';
usernames["inevitable"] = '256';
usernames["sommer"] = '257';
usernames["medeski"] = '258';
usernames["Licht"] = '259';
usernames["fragezeichen"] = '260';
usernames["Daijo"] = '262';
usernames["VOYAGER"] = '263';
usernames["Ashmodai"] = '265';
usernames["ken"] = '266';
usernames["KillDaFrog"] = '269';
usernames["shadowlady"] = '271';
usernames["manniro"] = '273';
usernames["valeriana"] = '274';
usernames["Christ_w_1982"] = '275';
usernames["lukas100"] = '276';
usernames["fisch"] = '279';
usernames["rhanis"] = '280';
usernames["liv"] = '282';
usernames["Kritiker"] = '292';
usernames["Jack"] = '293';
usernames["Christ(oph)"] = '294';
usernames["NietzscheIstTot"] = '296';
usernames["GermanHeretic"] = '297';
usernames["Husallah"] = '298';
usernames["Mephisto"] = '299';
usernames["Kerosine72"] = '300';
usernames["Kazzenkatt"] = '302';
usernames["webe"] = '304';
usernames["jossi"] = '310';
usernames["bartbeck"] = '314';
usernames["DerNamenlose"] = '315';
usernames["Cry Baby"] = '318';
usernames["Spaceball"] = '323';
usernames["kabelfesser"] = '332';
usernames["Heiner"] = '338';
usernames["phyllis"] = '345';
usernames["Gabor"] = '347';
usernames["waldegg"] = '350';
usernames["rappy"] = '351';
usernames["THE IMPLODING VOICE"] = '354';
usernames["tom6619"] = '355';
usernames["Alrik von Sturmfels"] = '361';
usernames["bewusterHeide"] = '368';
usernames["Torinico"] = '377';
usernames["Belphegor"] = '382';
usernames["drkohl"] = '386';
usernames["Tim Sanders"] = '389';
usernames["ul7ima"] = '392';
usernames["Yamato"] = '394';
usernames["spaghettus"] = '397';
usernames["Haldir"] = '399';
usernames["nanina"] = '403';
usernames["Tarvaa"] = '413';
usernames["Vincent"] = '415';
usernames["Aphrodite"] = '422';
usernames["Omar"] = '425';
usernames["Robert34Köln"] = '426';
usernames["Schattenfell"] = '428';
usernames["mensch"] = '431';
usernames["Demokrat"] = '434';
usernames["Herku"] = '443';
usernames["jaybeeone"] = '444';
usernames["emporda"] = '445';
usernames["axona"] = '447';
usernames["toffa"] = '448';
usernames["Cartman"] = '454';
usernames["MatzDan"] = '455';
usernames["kobra"] = '457';
usernames["Neider"] = '461';
usernames["baptist"] = '465';
usernames["Exelmes"] = '472';
usernames["Matrix"] = '476';
usernames["Der_Andere"] = '487';
usernames["Arno Gebauer"] = '509';
usernames["malchik1312"] = '528';
usernames["KingNothing"] = '535';
usernames["JoeTheLad"] = '548';
usernames["Wicked Bighead"] = '550';
usernames["desaster area"] = '561';
usernames["Charles_Darwin_Jr."] = '563';
usernames["Samsara"] = '568';
usernames["Max"] = '569';
usernames["alae"] = '570';
usernames["Samuel"] = '572';
usernames["Tomcat"] = '574';
usernames["F. Nietzsche"] = '577';
usernames["olcadan"] = '578';
usernames["Twist"] = '579';
usernames["Cortex"] = '581';
usernames["deist"] = '582';
usernames["HFRudolph"] = '584';
usernames["livingsunday"] = '585';
usernames["alhell"] = '586';
usernames["Erebos"] = '587';
usernames["1"] = '588';
usernames["Dr. Freud"] = '589';
usernames["lucius.a"] = '592';
usernames["pachizefalos"] = '594';
usernames["LingLing"] = '596';
usernames["banane47"] = '597';
usernames["Jörg"] = '598';
usernames["cccc"] = '599';
usernames["bekennenderChrist"] = '600';
usernames["AlterEgo"] = '602';
usernames["almase"] = '604';
usernames["Schami"] = '605';
usernames["HelenVBeden"] = '606';
usernames["Heri"] = '608';
usernames["Elmer"] = '609';
usernames["Fadu"] = '610';
usernames["Kival"] = '611';
usernames["murX"] = '613';
usernames["Wolly"] = '615';
usernames["nabukadnezer"] = '616';
usernames["oRigin"] = '619';
usernames["Andreas Krödel"] = '622';
usernames["J05HUA"] = '623';
usernames["pathfinder"] = '624';
usernames["Cassandra"] = '625';
usernames["Danol"] = '626';
usernames["Papa´s Liebling"] = '627';
usernames["MasterDiKey"] = '628';
usernames["nemoralis"] = '630';
usernames["c4ligo"] = '631';
usernames["Sputnik96"] = '632';
usernames["AB"] = '633';
usernames["pfarrmann"] = '634';
usernames["Rae"] = '635';
usernames["Kytoma"] = '637';
usernames["Zauner"] = '638';
usernames["Michael.S"] = '639';
usernames["dissimulator"] = '640';
usernames["Held666"] = '641';
usernames["Stephan"] = '642';
usernames["Chouchoutte"] = '643';
usernames["Doc Extropy"] = '644';
usernames["Mer"] = '645';
usernames["lolo0626"] = '646';
usernames["Smeik"] = '648';
usernames["Thaiboxer"] = '649';
usernames["Junkie"] = '650';
usernames["Demokrit"] = '651';
usernames["HeikeSaar"] = '652';
usernames["sillyy"] = '654';
usernames["reinerAtheist"] = '655';
usernames["SebE"] = '656';
usernames["Mathias"] = '658';
usernames["PrettyHateMachine"] = '659';
usernames["roach"] = '661';
usernames["Artemis"] = '662';
usernames["no_nickname"] = '665';
usernames["Zeuge"] = '666';
usernames["Markus"] = '668';
usernames["Katholik"] = '669';
usernames["Gunther"] = '674';
usernames["Atzti"] = '675';
usernames["hedonist"] = '676';
usernames["Random_Ice"] = '677';
usernames["rheinfire"] = '678';
usernames["pariparo"] = '680';
usernames["Transmat"] = '681';
usernames["Übrigens..."] = '683';
usernames["FED"] = '684';
usernames["Lancelot"] = '685';
usernames["Weltbürger"] = '686';
usernames["Astrid"] = '687';
usernames["Zeitgeist"] = '688';
usernames["matt"] = '692';
usernames["Alexandros"] = '694';
usernames["Liasanya"] = '695';
usernames["Wodewose"] = '696';
usernames["grenzgaenger"] = '697';
usernames["yvista"] = '698';
usernames["unic"] = '699';
usernames["selinger4"] = '701';
usernames["makadam"] = '705';
usernames["COPOKA"] = '706';
usernames["Erziraphael"] = '710';
usernames["kundiet"] = '711';
usernames["ReligionIstHeilbar"] = '712';
usernames["Knox"] = '713';
usernames["HDG"] = '715';
usernames["Thales4"] = '716';
usernames["DoMonRai"] = '717';
usernames["Tucholsky68"] = '719';
usernames["bluesmack"] = '720';
usernames["agsteiner"] = '721';
usernames["jk"] = '722';
usernames["saxs"] = '724';
usernames["Philipp"] = '725';
usernames["Zeusianer"] = '726';
usernames["NieScho"] = '727';
usernames["Linda"] = '729';
usernames["discovery"] = '731';
usernames["alexis312"] = '732';
usernames["Chr!s"] = '734';
usernames["sackerman"] = '735';
usernames["lauchenauermartin"] = '736';
usernames["tilly"] = '737';
usernames["GreenDragon"] = '738';
usernames["Hobbes"] = '739';
usernames["Omup"] = '740';
usernames["nullpunkt"] = '742';
usernames["Zeitgenosse"] = '743';
usernames["Lance"] = '745';
usernames["w.tell"] = '747';
usernames["El_Hefe"] = '749';
usernames["Kovu"] = '750';
usernames["WirSindAlleZwerge"] = '751';
usernames["Bishop Tuff"] = '752';
usernames["opriema"] = '753';
usernames["Sandra94"] = '756';
usernames["andreasts"] = '758';
usernames["esme"] = '764';
usernames["suchender"] = '767';
usernames["Vader30"] = '768';
usernames["Darwinist"] = '769';
usernames["futurefreak"] = '771';
usernames["pupel"] = '772';
usernames["dumdidum"] = '776';
usernames["Ungläubiger"] = '778';
usernames["Pandora"] = '779';
usernames["Mess1A"] = '780';
usernames["K-G-B"] = '781';
usernames["claudya"] = '783';
usernames["Rayman"] = '785';
usernames["Hurtz"] = '786';
usernames["Realist"] = '789';
usernames["angelobrazil"] = '791';
usernames["Unwort des Jahres"] = '792';
usernames["pandemie"] = '793';
usernames["MidNightSummer"] = '794';
usernames["Grandessa"] = '796';
usernames["Neuer Atheist"] = '797';
usernames["joe"] = '799';
usernames["Mondmann"] = '801';
usernames["Mayihadbeen"] = '802';
usernames["skywalker"] = '805';
usernames["Galil"] = '806';
usernames["Memnoch"] = '808';
usernames["demandi"] = '809';
usernames["FloWo"] = '810';
usernames["Paro"] = '811';
usernames["Gamalew"] = '812';
usernames["Joe Steel"] = '814';
usernames["jimmyz"] = '816';
usernames["Silbenfuchs"] = '817';
usernames["Schreiber"] = '818';
usernames["el.kundo"] = '819';
usernames["Der Retter"] = '821';
usernames["drklaus"] = '822';
usernames["Pateralbi"] = '825';
usernames["Mayhemer"] = '827';
usernames["DonVito"] = '829';
usernames["aequitas"] = '831';
usernames["Die Abtrünnige"] = '832';
usernames["evilsoul"] = '834';
usernames["Heide"] = '839';
usernames["Torinesi75"] = '840';
usernames["Nullpunktenergie"] = '842';
usernames["tinto"] = '843';
usernames["Ilsa"] = '845';
usernames["100%atheist"] = '847';
usernames["Fnord"] = '852';
usernames["Vincent van Ooken"] = '857';
usernames["Ragox"] = '861';
usernames["stilleswasser86"] = '862';
usernames["Frnk"] = '863';
usernames["!42"] = '864';
usernames["Biergärtner"] = '866';
usernames["Spark"] = '869';
usernames["melody"] = '870';
usernames["Danica"] = '871';
usernames["tina"] = '872';
usernames["Sirkka"] = '876';
usernames["atomhäufchen im all"] = '877';
usernames["gsgs"] = '881';
usernames["lucdec"] = '883';
usernames["C-T"] = '884';
usernames["Jeshar66"] = '886';
usernames["Norseman"] = '887';
usernames["Jarry Dencker"] = '891';
usernames["karhu"] = '893';
usernames["lamy"] = '894';
usernames["Flö"] = '896';
usernames["Schlomo"] = '898';
usernames["sinnerx"] = '900';
usernames["Dissonanz"] = '901';
usernames["André"] = '902';
usernames["Vindex"] = '903';
usernames["baron samedi"] = '905';
usernames["Hannes"] = '906';
usernames["shaoiken"] = '907';
usernames["Thinkpad"] = '910';
usernames["Schrödingers Katze"] = '911';
usernames["gubba"] = '912';
usernames["mehlwurm"] = '914';
usernames["Nymiras"] = '916';
usernames["smk"] = '918';
usernames["Nargam"] = '921';
usernames[">SlasH<"] = '923';
usernames["Borbarad"] = '925';
usernames["ApFel"] = '926';
usernames["Tastentier"] = '927';
usernames["rast62"] = '928';
usernames["frist"] = '929';
usernames["KSC"] = '931';
usernames["Deichgraf"] = '932';
usernames["Elwood"] = '935';
usernames["rem"] = '938';
usernames["Tamarkin"] = '1143';
usernames["Devonte"] = '1146';
usernames["Elefant"] = '1150';
usernames["mammut"] = '1154';
usernames["Feroc"] = '1156';
usernames["Brigitta"] = '1157';
usernames["mjb4"] = '1158';
usernames["Yuma"] = '1159';
usernames["wasistdashier"] = '1161';
usernames["Fido"] = '1162';
usernames["M1chael"] = '1166';
usernames["Denny"] = '1168';
usernames["Danyal"] = '1173';
usernames["eg_"] = '1174';
usernames["Tobias"] = '1175';
usernames["Dansay"] = '1176';
usernames["div0"] = '1178';
usernames["Simon j"] = '1180';
usernames["Antipapst"] = '1181';
usernames["ein_mensch"] = '1182';
usernames["Woody"] = '1183';
usernames["Zyan"] = '1184';
usernames["Mindfreak"] = '1185';
usernames["bonifats"] = '1186';
usernames["Leila"] = '1187';
usernames["Tikal"] = '1190';
usernames["Yuuki"] = '1191';
usernames["Ich?"] = '1193';
usernames["Thea"] = '1194';
usernames["Lily"] = '1199';
usernames["Tower"] = '1203';
usernames["bananeananas"] = '1204';
usernames["schwede"] = '1205';
usernames["entropie"] = '1206';
usernames["Ammar"] = '1208';
usernames["Anathemifer"] = '1210';
usernames["wilma"] = '1211';
usernames["Gamureth"] = '1213';
usernames["hagen"] = '1215';
usernames["Leertaste"] = '1217';
usernames["Franziskus"] = '1218';
usernames["PszchoBoyJAck"] = '1220';
usernames["Nachbarsternchen"] = '1221';
usernames["birgit"] = '1222';
usernames["Oculi"] = '1223';
usernames["MsZiffer"] = '1225';
usernames["sly79x"] = '1226';
usernames["Hellfrog"] = '1230';
usernames["buddy"] = '1234';
usernames["mike"] = '1235';
usernames["Aijana"] = '1236';
usernames["Solkar"] = '1237';
usernames["handwerker"] = '1238';
usernames["PHiL"] = '1239';
usernames["Weisheit"] = '1240';
usernames["Klaus Scheler"] = '1241';
usernames["KDrake"] = '1243';
usernames["pitsch"] = '1244';
usernames["invisibly"] = '1245';
usernames["allb"] = '1248';
usernames["Skid"] = '1249';
usernames["JFB"] = '1250';
usernames["lordy"] = '1251';
usernames["Korach"] = '1252';
usernames["Nikraton"] = '1253';
usernames["derkritiker"] = '1254';
usernames["Peter22"] = '1255';
usernames["soki"] = '1256';
usernames["Mononoke"] = '1257';
usernames["asderrix"] = '1258';
usernames["Uschi"] = '1259';
usernames["enemy_of_god"] = '1260';
usernames["piwi"] = '1261';
usernames["Axxis"] = '1263';
usernames["mops"] = '1264';
usernames["bennoko"] = '1265';
usernames["OAlexander"] = '1266';
usernames["Lucky"] = '1268';
usernames["Schornstein"] = '1269';
usernames["Peststurm"] = '1270';
usernames["Jeffers"] = '1271';
usernames["glaubensfrei"] = '1272';
usernames["Eremit"] = '1276';
usernames["fsm"] = '1281';
usernames["Pit"] = '1286';
usernames["Ritanermuri"] = '1289';
usernames["Василий"] = '1294';
usernames["CnndrBrbr"] = '1295';
usernames["Koma"] = '1296';
usernames["Norbert"] = '1297';
usernames["brobdingrag"] = '1300';
usernames["Mr_seppy"] = '1304';
usernames["agentmk1615"] = '1305';
usernames["Apostat"] = '1306';
usernames["Roodie"] = '1307';
usernames["Vadunon"] = '1308';
usernames["Track11"] = '1311';
usernames["onyx"] = '1313';
usernames["Dinsdale"] = '1314';
usernames["Lightning"] = '1315';
usernames["Weltmarionette"] = '1316';
usernames["Peter"] = '1319';
usernames["kind"] = '1321';
usernames["Cloud Strife"] = '1325';
usernames["Taonas"] = '1330';
usernames["Pastafarian"] = '1331';
usernames["Florence"] = '1332';
usernames["Achim"] = '1333';
usernames["Mask23"] = '1335';
usernames["e.ric"] = '1336';
usernames["ferdiX"] = '1337';
usernames["Ganondorf"] = '1340';
usernames["gesal"] = '1341';
usernames["Iring"] = '1344';
usernames["wildpix"] = '1345';
usernames["mr_turrican"] = '1348';
usernames["Mr. Burns"] = '1349';
usernames["poseidon68"] = '1351';
usernames["phoenix24"] = '1354';
usernames["rkaya57"] = '1355';
usernames["paaatre"] = '1357';
usernames["Zrehcs"] = '1358';
usernames["sneth"] = '1359';
usernames["loj"] = '1361';
usernames["Mark Einstein-Penna"] = '1364';
usernames["Anjalie"] = '1365';
usernames["Lukrez"] = '1368';
usernames["Schattenjaeger"] = '1369';
usernames["Eastwood"] = '1370';
usernames["Der Kantelberg"] = '1373';
usernames["Cru"] = '1374';
usernames["Kartoffelkäfer"] = '1375';
usernames["Hämatit"] = '1376';
usernames["Raphael"] = '1378';
usernames["ICHLEBEJETZT"] = '1379';
usernames["Ata"] = '1381';
usernames["Abraxas3344"] = '1384';
usernames["edemilio"] = '1385';
usernames["uwe k"] = '1386';
usernames["Alex Foyle"] = '1388';
usernames["Binchen"] = '1389';
usernames["Adramelec"] = '1390';
usernames["AeternaUmbraNox"] = '1395';
usernames["AtomicGreen"] = '1396';
usernames["ischbins"] = '1401';
usernames["shortcut"] = '1402';
usernames["synapse"] = '1403';
usernames["Mercurius"] = '1404';
usernames["Solon"] = '1405';
usernames["gurbelunder"] = '1406';
usernames["Respekt"] = '1408';
usernames["Erhabenheitsreich"] = '1409';
usernames["Einölen Freddy"] = '1410';
usernames["joco"] = '1411';
usernames["Misterium"] = '1412';
usernames["Religionsgegner"] = '1414';
usernames["theatheist"] = '1415';
usernames["lpro"] = '1416';
usernames["musicman"] = '1419';
usernames["Luggi91"] = '1420';
usernames["ihde"] = '1421';
usernames["RSH"] = '1422';
usernames["keymaster"] = '1427';
usernames["FFreeThinker"] = '1428';
usernames["Smiley"] = '1429';
usernames["Rainer Zufall"] = '1433';
usernames["FABIAN"] = '1436';
usernames["meinwasser"] = '1438';
usernames["KD-Underground"] = '1440';
usernames["jagger1989"] = '1442';
usernames["danilo"] = '1443';
usernames["OneManGang"] = '1444';
usernames["McKing"] = '1445';
usernames["XXXXX"] = '1447';
usernames["Danieldej"] = '1448';
usernames["flovay90"] = '1449';
usernames["Bubblegum"] = '1452';
usernames["Schopenhauer"] = '1453';
usernames["Nati"] = '1454';
usernames["Dessel"] = '1455';
usernames["Schnurri"] = '1456';
usernames["Dobi"] = '1457';
usernames["natascha007"] = '1459';
usernames["Acharya"] = '1463';
usernames["Valle"] = '1464';
usernames["korv"] = '1465';
usernames["Wally"] = '1467';
usernames["elephant-beer"] = '1468';
usernames["Behemot"] = '1471';
usernames["athe_kampagne"] = '1473';
usernames["mrw"] = '1479';
usernames["tryingManon"] = '1481';
usernames["stefajah"] = '1482';
usernames["xʁɱdʁɱ ɹʁɹɢɹʁɹ ʍ'ʍɐɲ"] = '1484';
usernames["MacRob68"] = '1486';
usernames["Sermon"] = '1487';
usernames["Nylen"] = '1489';
usernames["Wetelin"] = '1490';
usernames["TomTom2009"] = '1491';
usernames["deBaal"] = '1492';
usernames["determiniert"] = '1493';
usernames["geheimagent"] = '1496';
usernames["Lordherb"] = '1497';
usernames["Dracul"] = '1498';
usernames["nochoice?"] = '1499';
usernames["klobouter"] = '1500';
usernames["karl_karnadi"] = '1501';
usernames["Pilchard35ZZZK9"] = '1503';
usernames["Nox Milton"] = '1506';
usernames["fabcaesar"] = '1507';
usernames["Robert_De_Nameland"] = '1509';
usernames["Knopf"] = '1515';
usernames["Gläubig_"] = '1571';
usernames["dag"] = '1577';
usernames["el3ktro"] = '1583';
usernames["bonito"] = '1605';
usernames["-=Flash=-"] = '1610';
usernames["mextex"] = '1627';
usernames["salam"] = '1636';
usernames["DancinDays"] = '1664';
usernames["Sandstein"] = '1674';
usernames["Costa"] = '1683';
usernames["Odenwaldi"] = '1694';
usernames["karl_greifenklau"] = '1707';
usernames["Deadz"] = '1721';
usernames["summa777"] = '1725';
usernames["sinnlos"] = '1734';
usernames["Mr_nice_Guy"] = '1760';
usernames["altersack"] = '1770';
usernames["Moslem"] = '1887';
usernames["Lena"] = '1950';
usernames["eNABC"] = '2004';
usernames["clash"] = '2148';
usernames["Frank Sacco"] = '2175';
usernames["Excelsior"] = '2176';
usernames["eddo"] = '2180';
usernames["abc3"] = '2189';
usernames["ruebennase"] = '2209';
usernames["Christian"] = '2249';
usernames["empty"] = '2250';
usernames["Shaka"] = '2265';
usernames["Dirk"] = '2288';
usernames["Azradon"] = '2289';
usernames["Achter"] = '2332';
usernames["IllDepence"] = '2425';
usernames["fisch554"] = '2447';
usernames["Jimbo"] = '2494';
usernames["Bastet"] = '2534';
usernames["Nickname"] = '2541';
usernames["Guybrush Threepwood"] = '2546';
usernames["kynismos"] = '2590';
usernames["romeno82"] = '2608';
usernames["PVS"] = '2628';
usernames["sirbender"] = '2676';
usernames["Jesfreric"] = '2718';
usernames["renzlicht"] = '2754';
usernames["Chardin"] = '2791';
usernames["doT."] = '2813';
usernames["ego"] = '2832';
usernames["Böser Teufel"] = '2893';
usernames["playacuX"] = '2945';
usernames["RayJunx"] = '2949';
usernames["Caramell"] = '2982';
usernames["The Black"] = '3008';
usernames["Akkan"] = '3053';
usernames["diamant1"] = '3059';
usernames["MoonLady"] = '3064';
usernames["r2d3"] = '3067';
usernames["Sperling"] = '3079';
usernames["Smigel"] = '3087';
usernames["Sophokles"] = '3094';
usernames["kaykay"] = '3103';
usernames["cmd"] = '3108';
usernames["Boron"] = '3118';
usernames["platon"] = '3127';
usernames["Prometheus"] = '3143';
usernames["Phyxis"] = '3192';
usernames["A42K"] = '3210';
usernames["Homo Sapiens"] = '3216';
usernames["aiillmnstu"] = '3218';
usernames["roteSocke"] = '3219';
usernames["Musashie"] = '3221';
usernames["die.helmi."] = '3222';
usernames["Cronos"] = '3223';
usernames["mrbig"] = '3227';
usernames["Christina"] = '3230';
usernames["gedobl"] = '3232';
usernames["Robby"] = '3233';
usernames["jan bu-th"] = '3234';
usernames["Moni"] = '3235';
usernames["JMX"] = '3236';
usernames["Georg"] = '3238';
usernames["jgjuche"] = '3239';
usernames["A Man in Flames"] = '3240';
usernames["Chaeremon"] = '3241';
usernames["kleines.senfkorn"] = '3242';
usernames["der Heide"] = '3243';
usernames["Desecrator"] = '3248';
usernames["logo"] = '3249';
usernames["ikarus"] = '3250';
usernames["guetsel"] = '3251';
usernames["DarkSoul"] = '3253';
usernames["theokratis"] = '3254';
usernames["Satan"] = '3255';
usernames["kitsune"] = '3256';
usernames["Fingertier"] = '3257';
usernames["Sicro"] = '3258';
usernames["Tamarah"] = '3259';
usernames["Voyager700"] = '3261';
usernames["alridge"] = '3262';
usernames["Minimaxx"] = '3263';
usernames["Aristoteles"] = '3264';
usernames["mana"] = '3265';
usernames["kristin"] = '3266';
usernames["Jimmy K."] = '3267';
usernames["Advanca"] = '3268';
usernames["Fleischpuppe"] = '3271';
usernames["detlef10"] = '3273';
usernames["atheist93"] = '3274';
usernames["JensGB"] = '3279';
usernames["siriux"] = '3281';
usernames["Phistophicles"] = '3284';
usernames["Papi Jump Plus"] = '3288';
usernames["pchan07"] = '3289';
usernames["herb-atheos"] = '3290';
usernames["Der böse Wolf"] = '3291';
usernames["Irlanur"] = '3292';
usernames["Bimmy"] = '3293';
usernames["stephanSchmidt"] = '3294';
usernames["Ladina"] = '3297';
usernames["Hefti"] = '3299';
usernames["wiXXer"] = '3302';
usernames["Korcaj"] = '3303';
usernames["Ironhide77"] = '3306';
usernames["Stephan_ATH"] = '3307';
usernames["SUSN"] = '3308';
usernames["NordicAtheist"] = '3310';
usernames["anna_ski"] = '3312';
usernames["kasermandl52"] = '3313';
usernames["Luminous"] = '3314';
usernames["bEWEGUNG"] = '3315';
usernames["Morgenstern72"] = '3319';
usernames["Dinyu"] = '3320';
usernames["Pro-Contra"] = '3321';
usernames["sandra lemke"] = '3322';
usernames["Altesäckin"] = '3328';
usernames["Antitheist"] = '3333';
usernames["alvin"] = '3334';
usernames["T-Killa"] = '3335';
usernames["Karlson"] = '3338';
usernames["benny80"] = '3339';
usernames["Corleone"] = '3341';
usernames["Sprachlos"] = '3342';
usernames["Genesis"] = '3344';
usernames["Manu191357"] = '3345';
usernames["Der Baal"] = '3348';
usernames["thomas4180"] = '3353';
usernames["Geobacter"] = '3360';
usernames["unbeliever"] = '3364';
usernames["die0wahre0wahrheit"] = '3366';
usernames["Pfefferminztee"] = '3369';
usernames["Spriggan"] = '3370';
usernames["Angelos"] = '3372';
usernames["DieWissbegierige"] = '3373';
usernames["Sunlight"] = '3374';
usernames["Brad"] = '3375';
usernames["nautilus"] = '3376';
usernames["Athi"] = '3377';
usernames["Eden"] = '3378';
usernames["FXR"] = '3379';
usernames["Toni-P"] = '3380';
usernames["SunFox"] = '3381';
usernames["peisithanatos2009"] = '3382';
usernames["3x3"] = '3383';
usernames["quantenmaschine"] = '3384';
usernames["thecause"] = '3388';
usernames["Monstera"] = '3392';
usernames["Sternchen1"] = '3395';
usernames["Dimitri"] = '3396';
usernames["Fenris"] = '3398';
usernames["jan"] = '3399';
usernames["shagy"] = '3401';
usernames["Hiram"] = '3402';
usernames["tologo"] = '3403';
usernames["jetpilot"] = '3405';
usernames["Nail"] = '3406';
usernames["hollow"] = '3407';
usernames["Matthias1984"] = '3408';
usernames["Oban"] = '3412';
usernames["Abgefahrenheit"] = '3414';
usernames["Chiron"] = '3422';
usernames["ap2"] = '3423';
usernames["ketam1n"] = '3426';
usernames["whitesnow"] = '3427';
usernames["Darth Chris"] = '3428';
usernames["WhiteRabbit"] = '3429';
usernames["niklas mengardt"] = '3431';
usernames["D.Cent"] = '3432';
usernames["Mardas"] = '3433';
usernames["Regens Küchl"] = '3434';
usernames["Chrusuchopf"] = '3435';
usernames["Herr Hölle"] = '3436';
usernames["Nadjine"] = '3437';
usernames["prokyon"] = '3438';
usernames["saprant"] = '3444';
usernames["voodooCHF"] = '3445';
usernames["Leo Navis"] = '3446';
usernames["aaydin"] = '3447';
usernames["Pfeffermynzia"] = '3448';
usernames["Lupus"] = '3450';
usernames["Lauscher"] = '3451';
usernames["Liesel"] = '3452';
usernames["kriton"] = '3453';
usernames["Tobi"] = '3454';
usernames["Christine-Michele"] = '3456';
usernames["Troy McClure"] = '3458';
usernames["reihen"] = '3460';
usernames["Ryan"] = '3461';
usernames["Tobiascgn"] = '3463';
usernames["ill69freak"] = '3464';
usernames["Dawidh91"] = '3467';
usernames["der Prophet"] = '3468';
usernames["hego5"] = '3470';
usernames["Schreibende"] = '3472';
usernames["Mitro"] = '3473';
usernames["anyrei"] = '3475';
usernames["Camus1"] = '3477';
usernames["donald"] = '3478';
usernames["Freki"] = '3479';
usernames["Vaidas"] = '3481';
usernames["riviere"] = '3483';
usernames["Athy"] = '3484';
usernames["november_moon"] = '3485';
usernames["mirfälltnichtsein"] = '3486';
usernames["Kodo3"] = '3487';
usernames["Nia"] = '3489';
usernames["brezelbub"] = '3491';
usernames["chilli"] = '3492';
usernames["vaski"] = '3493';
usernames["Veritas"] = '3494';
usernames["Orcbanger"] = '3495';
usernames["malum_exstat"] = '3498';
usernames["Christian11"] = '3499';
usernames["Michael_WeCan"] = '3501';
usernames["Sen"] = '3504';
usernames["Bitterling"] = '3505';
usernames["Schefczyk"] = '3506';
usernames["Publix"] = '3516';
usernames["zweiundvierzig"] = '3517';
usernames["Tanja007"] = '3525';
usernames["Tilia"] = '3526';
usernames["JoseMaria"] = '3531';
usernames["Lamarck"] = '3535';
usernames["Adrevian"] = '3536';
usernames["Nimrod"] = '3540';
usernames["Ester"] = '3541';
usernames["Base"] = '3542';
usernames["Faye"] = '3543';
usernames["AddeIst"] = '3547';
usernames["Hawkmoon"] = '3548';
usernames["Martin Luther"] = '3551';
usernames["Lakai0307"] = '3552';
usernames["badgirl"] = '3553';
usernames["Sloppi"] = '3555';
usernames["Qtipie"] = '3558';
usernames["atheist666"] = '3560';
usernames["electrolite"] = '3561';
usernames["Dunkelheit"] = '3562';
usernames["agnostiker"] = '3564';
usernames["David-DerAtheist"] = '3567';
usernames["Rania"] = '3569';
usernames["Dennis D"] = '3570';
usernames["madraxx"] = '3571';
usernames["Timord"] = '3572';
usernames["eldo"] = '3573';
usernames["Adarwinist"] = '3574';
usernames["johndoe345"] = '3576';
usernames["the"] = '3577';
usernames["Flamekeeper"] = '3579';
usernames["Sam Vimes"] = '3580';
usernames["Alice"] = '3582';
usernames["donquijote"] = '3583';
usernames["Rince"] = '3590';
usernames["pherias"] = '3591';
usernames["nane"] = '3594';
usernames["rakso999"] = '3595';
usernames["Nergal"] = '3596';
usernames["Trolf77"] = '3597';
usernames["Trollwut"] = '3598';
usernames["raupiraupe"] = '3599';
usernames["Martin99"] = '3603';
/* -*- encoding: utf-8 -*- */
var imageset = !dark ? imagesetlight : imagesetdark ;
var acounter = 0;


function insert_stylesheet () {
    var linknodes = document.getElementsByTagName("link");
    var cssnode = document.createElement ("style");
    cssnode.type = "text/css";
    cssnode.id = "aoestylesheet";
    linknodes[linknodes.length-1].parentNode.insertBefore(cssnode, linknodes[linknodes.length-1].nextSibling);
    set_stylesheet(schema_user);
}

function set_stylesheet (schema) {
    var s = customstyle;
    var rx;

    for (var i in schema) {
	rx = new RegExp(i, "g");
	s = s.replace(rx, schema[i]);
    }

    if (navigator.userAgent.match (/Chrom/)) {
	document.getElementById("aoestylesheet").innerText = s ;
    } else {
	document.getElementById("aoestylesheet").innerHTML = s ;
    }
}

function get_thread_id () {
    if(document.getElementsByTagName("h2").length > 0) {
	return document.getElementsByTagName("h2")[0].firstChild.href.replace(/^.*&t=(\d*).*$/, "$1");
    } else {
	return -1;
    }
}

function fix_phpbb2_links () {
    for (var i = 0; i < document.links.length; i++) {
	if (document.links[i].href.search(/http.+atheisten.org.*phpBB2/) != -1) {
	    var tmp = document.links[i].href.replace(/(http.+atheisten.org.*)phpBB2(.+)#(.+)/, "$1"
						     + "forum" + "$2" + "#p" + "$3");
	    document.links[i].href = tmp;
	    if (document.links[i].innerHTML.search(/http.+atheisten.org.*phpBB2/) != -1) {
		document.links[i].innerHTML = tmp;
	    }
	}
    }
}

function helmis_function () {
    if (AOE_RUN_HELMIS_FUNCTION) {
	var counter=0;
	for (var i = 0, limit = document.links.length; i < limit; i++) {
	    if (document.links[i].innerHTML=="die.helmi.") {
		// FIXME: why are some links affected by the stylesheet and others not?
		document.links[i].className += " helmi username-coloured";
		document.links[i].style.color = "magenta";
/*		if (false && (document.links[i].parentNode.nodeName == "DT" || document.links[i].parentNode.nodeName == "dt" || true)) {
		    document.links[i].style.color = 'magenta';
//		    document.links[i].style.backgroundColor = 'rgb(249,224,222)';
		    document.links[i].style.textDecoration = 'underline'; 
		} 
*/
		
		counter++;
	    }
	}
	var divnodes = document.getElementsByTagName("div");
	for (i=0, limit=divnodes.length; i<limit; i++) {
	    if (divnodes[i].className == "post bg2" || divnodes[i].className == "post bg1") {
		if (divnodes[i].getElementsByTagName("p")[0].getElementsByTagName("a")[1].innerHTML=="die.helmi.") {
		    divnodes[i].className+=" helmi";
		}
	    }
	}
    }
}

/* konstruiere Hyperlink mit Bild zum letzten Beitrag im durch tmp spezifizierten Forum */
function insert_forum_status_icon (tmp) {
    /* FIXME: linking to last post might not lead to the most intuitive behavior,
     * maybe we should just link to the beginning of the thread instead*/
    var anode = document.createElement("a");
    if (tmp.getElementsByTagName("dd").length > 2) {
	if (tmp.getElementsByTagName("dd")[2].getElementsByTagName("span").length > 0) {
	    if (tmp.getElementsByTagName("dd")[2].getElementsByTagName("span")[0].getElementsByTagName("a").length == 2) {
		anode.href = tmp.getElementsByTagName("dd")[2].getElementsByTagName("span")[0].getElementsByTagName("a")[1].href;
	    }
	}
    }

    var imagefilename = tmp.style.backgroundImage.substr(0);
    imagefilename = imagefilename.replace(/url.*xabbblue\/imageset\//, "");
    imagefilename = imagefilename.replace(/\"\)$/, "");
    imagefilename = imagefilename.replace(/\)$/, "");
    if (imagefilename.length > 0) {
	var imgnode = document.createElement("img");
	imgnode.src = imageset[imagefilename];
	imgnode.style.cssFloat = 'left';
	imgnode.style.margin = '7px';

	if (anode.href.length > 0) {
	    anode.appendChild(imgnode);
	    tmp.childNodes[1].insertBefore(anode, tmp.childNodes[1].childNodes[0]);
	} else {
	    tmp.childNodes[1].insertBefore(imgnode, tmp.childNodes[1].childNodes[0]);
	}
    }
}

function sanitize_mods (modstr) {
    var str;
    if (modstr.match(/Frnk/)) {
	str = modstr.replace(/<A.*Frnk.\/A../i, "")
	    + ', <a href="http://www.atheisten.org/forum/memberlist.php?mode=viewprofile&un='
	    + 'Frnk" style="color: #009900;" class="username-coloured">Frnk</a>';
    }
    if (modstr.match(/altersack/)) {
	str = modstr.replace(/<A.*altersack.\/A../i, "")
	    + ', <a href="http://www.atheisten.org/forum/memberlist.php?mode=viewprofile&un='
	    + 'altersack">altersack</a>';
    }
    if (modstr.match(/Dracul/)) {
	str = modstr.replace(/<A.*Dracul.\/A../i, "")
	    + ', <a href="http://www.atheisten.org/forum/memberlist.php?mode=viewprofile&un='
	    + 'Dracul">Dracul</a>';
    }
    if (modstr.match(/Danol/)) {
	str = modstr.replace(/<A.*Danol.\/A../i, "")
	    + ', <a href="http://www.atheisten.org/forum/memberlist.php?mode=viewprofile&un='
	    + 'Danol" style="color: #009900;" class="username-coloured">Danol</a>';
    }
    if (modstr.match(/Volker/)) {
	str = modstr.replace(/<A.*Volker.\/A../i, "")
	    + ', <a href="http://www.atheisten.org/forum/memberlist.php?mode=viewprofile&un='
	    + 'Volker">Volker</a>';
    }
    if (str == undefined)
	return modstr;
    else
	return str;
}

function adjust_forum_listing_table () {
    var divnodes = document.getElementsByTagName("div");
    var counter = 0;
    var forumtable = document.createElement("table");
    forumtable.id = "forumtable";
    var tablines = '<tr class="forumheader">'
	+ '<td class="status">'
	+ '<img src="' + imageset['topic_read.gif'] + '" style="visibility: hidden;"/>'
	+ '</td>'
	+ '<td class="title">Forum</td>'
	+ '<td class="mods">Moderatoren</td>'
	+ '<td class="nthreads">Themen</td>'
	+ '<td class="nposts">Beiträge</td>'
	+ '<td class="nauthor">'+ unescape("%A0") +'</td>'
	+ '<td class="ndate"><center>'+(AOE_USE_RELATIVE_DATES ? '<input type="button" id="aoedatetypebutton" value="Absolute Zeit anzeigen"/>' : '' )+'</center></td>'
	+ '<td class="markread"><a href="./index.php?hash='+get_mark_hash()+'&mark=forums">[mark]</a></td>'
	+ '<td>&nbsp;</td>'
	+ "</tr>\n";

    for (var i = 0; i<divnodes.length;i++) {
	if (divnodes[i].className == "forabg") {
	    counter++;
	    if (counter==1) // skip advertisment block
		continue;
	    var ulnodes = divnodes[i].getElementsByTagName("ul");
	    var wrapforumid = ulnodes[0].getElementsByTagName("a")[0].href.replace(/^.*f=(..).*$/,'$1');
	    tablines += '<tr class="forumsubheader"><th colspan="7">' + ulnodes[0].getElementsByTagName("dt")[0].innerHTML + '</th><th style="padding: 0;"><a href="./viewforum.php?hash='+get_mark_hash()+'&f='+wrapforumid+'&mark=forums">[mark]</th><th>&nbsp;</th></tr>';
	    var linodes = ulnodes[1].getElementsByTagName("li");
	    for (var j = 0; j<linodes.length; j++) {
		var icon,title, mods, numthreads, numposts, author, datelast ;
		var forumid = linodes[j].getElementsByTagName("a")[0].href.replace(/^.*f=(\d+).*$/,'$1');
		if (parseInt(forumid) > 23)
		    continue;
		var anode = linodes[j].getElementsByTagName("dt")[0].getElementsByTagName("a")[0];
		title = '<a href="' + anode.href + '" class="'+anode.className+'">' + anode.innerHTML + '</a>';
		var imagename = linodes[j].getElementsByTagName("dl")[0].style.backgroundImage.replace(/^.*\//, "").replace(/"\)/, "").replace(/forum/, "topic").replace(/\)$/,'');
		var status = imagename.match(/unread/) ? "unread" : "";
		icon = '<img src="'+imageset[imagename]+'"/>';
		if (!title.match(/Quarant/)) {
		    mods = linodes[j].getElementsByTagName("dt")[0].innerHTML.replace(/\n/g,"").replace(/\r/g,"").replace(/\t/g,"").replace(/^.*<\/strong>/i, "").replace(/Super-Moderator/, "SuMos");
		} else {
		    mods ="";
		}
		mods = sanitize_mods(mods);
		if (linodes[j].getElementsByTagName("dt")[0].getElementsByTagName("strong").length == 0)
		    mods = "";
		numthreads = linodes[j].getElementsByTagName("dd")[0].innerHTML.replace(/ .*$/, "");
		numposts = linodes[j].getElementsByTagName("dd")[1].innerHTML.replace(/ .*$/, "");
		var authornode = linodes[j].getElementsByTagName("dd")[2].getElementsByTagName("a")[0].cloneNode(true);
		author = document.createElement("div");
		author.appendChild(authornode);
//		author = '<a href="'+authornode.href+'" class="'+authornode.className+'" ' + "" + '>'+authornode.innerHTML+'</a>';
		datelast = linodes[j].getElementsByTagName("dd")[2].getElementsByTagName("span")[0].lastChild.data.replace(/am /, "");
		var posturl = linodes[j].getElementsByTagName("dd")[2].getElementsByTagName("a")[1].href;
		tablines += '<tr class="attrow'+(j%2) + status+'">'
		    + '<td class="status">'+icon+'</td>'
		    + '<td class="title">'+title+'</td>'
		    + '<td class="mods">'+mods+'</td>'
		    + '<td class="nthreads">'+numthreads+'</td>'
		    + '<td class="nposts">'+numposts+'</td>'
		    + '<td class="nauthor">'+author.innerHTML+'</td>'
		    + '<td class="ndate">'+format_relative_date(datelast)+'</td>'
		    + '<td class="markread"><a href="./viewforum.php?hash='+get_mark_hash()+'&f='+forumid+'&mark=topics">[mark]</a></td>'
		    + '<td class="goto"><a href="'+posturl+'">[open]</a></td>'
		    + '</tr>\n';
	    }
	}
    }
    forumtable.innerHTML = tablines;
    counter=4;
    for (i = divnodes.length-1; i>0;i--) {
	if (divnodes[i].className == "forabg") {
	    counter--;
	    if (counter<1)
		continue;
	    if (counter == 1)
		divnodes[i].parentNode.replaceChild(forumtable, divnodes[i]);
	    if (counter == 2 || counter == 3)
		divnodes[i].parentNode.removeChild(divnodes[i]);
	}
    }
    if (AOE_USE_RELATIVE_DATES)
	document.getElementById("aoedatetypebutton").addEventListener("click", toggle_date_styles, false);
}

/* Ersetze alle Status-Icons in der Forenübersicht */
function adjust_forum_listing () {
    var tmp = document.getElementsByTagName("dl");

    for (var i=0, limit = tmp.length; i<limit; i++) {
	insert_forum_status_icon(tmp[i]);
    }
}

function adjust_cites () {
    var citenodes = document.getElementsByTagName("cite");
    var quotestring = " hat geschreiben:";
    var counter= 0;
    for (var i=0, limit=citenodes.length; i < limit; i++) {
	var undefined;
	if (citenodes[i].getElementsByTagName("a").length == 0 && citenodes[i].innerHTML.length > 16) {
	    var name = citenodes[i].innerHTML.substring(0, citenodes[i].innerHTML.length-quotestring.length);
	    var regex = new RegExp (name, "gi");
	    if (usernames[name] != undefined) {
		citenodes[i].innerHTML = citenodes[i].innerHTML.replace(regex, ' <a style=\"color: white;\" href="http://www.atheisten.org/forum/memberlist.php?mode=viewprofile&u=' + usernames[name] + '">' + name + '</a> ');
		var threadid = get_thread_id();
		if(threadid != -1) {
		    citenodes[i].innerHTML = citenodes[i].innerHTML.replace(/:$/, " " + '<a style="color:white;" href="http://www.atheisten.org/forum/search.php?t=' + threadid + '&author=' + name + '">[Thread-Beiträge anzeigen]</a>' + ":");
		}
	    }
	}
    }
}

/* [Thread-Beiträge anzeigen]-Schaltfläche hinzufügen */
function add_search_thread_postings () {
    if(document.getElementsByTagName("h2").length > 0) {
	var profilenodes = document.getElementsByTagName("dl");
	for(var i=0,limit=profilenodes.length; i<limit; i++){
	    if (profilenodes[i].className == "postprofile") {
		var hylinknodes = profilenodes[i].getElementsByTagName("dt")[0].getElementsByTagName("a");
		var name = hylinknodes[hylinknodes.length - 1].innerHTML;

		var newnode = document.createElement("dd");
		var threadid = get_thread_id();
		if (threadid != -1) {
		    newnode.innerHTML = '<a href="http://www.atheisten.org/forum/search.php?t=' + threadid + '&author=' + name + '">[Thread-Beiträge anzeigen]</a>';
		    newnode.style.borderWidth = '0px';
		    newnode.style.textAlign = 'left';
		    newnode.style.paddingTop = '3px';
		    profilenodes[i].appendChild(newnode);
		}

		if (name != aoe_loginname) {
		    newnode = document.createElement("dd");
		    newnode.innerHTML = '<a href="http://www.atheisten.org/forum/ucp.php?i=zebra&mode=foes&add=' + name + '">[Benutzer ignorieren]</a>';
		    newnode.style.borderWidth = '0px';
		    newnode.style.textAlign = 'left';
		    newnode.style.paddingTop = '3px';
		    newnode.style.paddingBottom = '20px';

		    profilenodes[i].appendChild(newnode);		    
		}
	    }
	}
    }
}

function we_are_logged_in () {
    var linodes = document.getElementsByTagName ("li");
    for (var j=0, jlimit = linodes.length; j<jlimit; j++) {
	if (linodes[j].className=="icon-logout") {
	    if(linodes[j].getElementsByTagName("a")[0].innerHTML.match(/Abmelden.\[.(.*).\]/)) {
		return true;
	    } else {
		return false;
	    }
	}
    }
    return false;
}

function get_loginname () {
    var linodes = document.getElementsByTagName ("li");
    for (var j=0, jlimit = linodes.length; j<jlimit; j++) {
	if (linodes[j].className=="icon-logout")
	    return linodes[j].getElementsByTagName("a")[0].innerHTML.replace(/Abmelden.\[.(.*).\]/, "$1");
    }
    return "";
}


function adjust_topic_listing_tables () {
    var divnodes = document.getElementsByTagName("div");
    var table = document.createElement("table");
    var tablelines = (AOE_USE_RELATIVE_DATES ? '<tr><td colspan="4"/><td colspan="2"><center><input type="button" id="aoedatetypebutton" value="Absolute Zeit anzeigen"/></center></td><td colspan="3"/></tr>' : '' );
    var toggleflag = false;
    table.id = "aoetopictable";
    table.innerHTML="";
    for (var i=0, ilimit = divnodes.length; i<ilimit; i++) {
	if (divnodes[i].className.match(/forumbg/)) {
	    var ulnodes = divnodes[i].getElementsByTagName("ul");
	    if (ulnodes[0].className == "topiclist") {
		// FIXME: speed (table is parsed everytime a string is added)
		tablelines += '<tr>'
		    + '<th class="attstatus"> </th>'
		    + '<th class="attreplies"> </th>'
		    + ((AOE_SHOW_VIEW_COUNT) ? '<th class="attviews"> </th>' : "")
		    + ((AOE_SHOW_THREAD_STARTER) ? '<th class="attauthor">Thread-Starter</th>' : "")
		    + '<th class="atttitle">Thread-Titel</th>'
		    + ((AOE_SHOW_DATE_CREATED) ? '<th class="attcreated">Erstellt am</th>' : "")
		    + '<th class="attupdated">Letztes Posting am</th>'
		    + '<th class="attlastauthor">Letzter Beitrag von</th>'
		    + '<th class="attunread"> </th>'
		    + '<th class="attlastpost"> </th>'
		    + '<th class="attjumpto"> </th>'
		    + '</tr>';
	    }
	    if (ulnodes[1].className == "topiclist topics") {
		var linodes = ulnodes[1].getElementsByTagName("li");
		var topictitle;
		var counter =0;
		for (var j = 0 ; j<linodes.length; j++) {
		    var k;
		    var topictitlenodes = linodes[j].getElementsByTagName("a");
		    var dtnode = linodes[j].getElementsByTagName("dt")[0];
		    var topicurl;
		    var authordivnode = document.createElement("div");

		    var dtlinknodes = dtnode.getElementsByTagName("a");
		    authordivnode.appendChild(dtlinknodes[dtlinknodes.length-1].cloneNode(true));
		    var authorname = dtnode.lastChild.previousSibling.innerHTML;
		    var authorstring = authordivnode.innerHTML;

		    var created;
		    var lastpost;
		    // necessary for compatibility with Firefox/Opera
		    if (dtnode.lastChild.data != undefined) {
			created = dtnode.lastChild.data.replace(/^.am.(.*)/, "$1");
		    } else if (dtnode.lastChild.innerHTML != undefined) {
			created = dtnode.lastChild.innerHTML.replace(/^.am.(.*)/, "$1");
		    }
		    var ddnodes = linodes[j].getElementsByTagName("dd");
		    lastpost = ddnodes[2].getElementsByTagName("span")[0].lastChild.data.replace(/^am.(.*)/, "$1");

		    var numreplies = ddnodes[0].innerHTML.replace(/^(\d*) .*$/, "$1");
		    var numreads = ddnodes[1].innerHTML.replace(/^(\d*) .*$/, "$1");
		    var lastauthordivnode = document.createElement("div");
		    lastauthordivnode.appendChild(ddnodes[2].getElementsByTagName("a")[0].cloneNode(true));
		    var lastauthorstring = lastauthordivnode.innerHTML;
		    var lastauthor = ddnodes[2].getElementsByTagName("a")[0].innerHTML;
		    var lastposturl = ddnodes[2].getElementsByTagName("a")[1].href;
		    var statusicon;

		    for (k = 0; k<topictitlenodes.length; k++)
			if (topictitlenodes[k].className=="topictitle") {
			    topictitle = topictitlenodes[k].innerHTML;
			    topicurl = topictitlenodes[k].href;
			}
		    var numposts = parseInt(numreplies)+1;
		    var numpages = Math.ceil(numposts/15);
		    var formstring = '<form><select size="1">';

		    for (k=1; k<= numpages; k++) {
// FIXME: the onclick stuff needs to be adjusted for google chrome
// http://www.wohill.com/design/335/Replacing-the-onclick-event-for-IE-or-Chrome.html

			formstring+='<option onClick="window.open(\'' + topicurl + '&start=' + (k-1)*15 + '\', \'_blank\', this);">'+ k +'</option>';
		    }
		    formstring+='</select></form>';

		    var status = "";
		    if (linodes[j].childNodes[1].style.backgroundImage.match(/^.*\/.*imageset.*unread.*/)) {
			status = "unread";
		    }
		    
		    statusicon = imageset[linodes[j].childNodes[1].style.backgroundImage.replace(/^.*\/styles.*imageset\/(.*gif).*/, "$1")]; // FIXME: das ist viel zu langsam
		    tablelines += '<tr class="attrow' + counter + status +'">'
			+ '<td class="attstatus"><img src="' + statusicon + '"</td>'
			+ '<td class="attreplies">' + numreplies+ '</td>'
			+ ((AOE_SHOW_VIEW_COUNT) ? ('<td class="attviews">' + numreads + '</td>') : "")
			+ ((AOE_SHOW_THREAD_STARTER) ? ('<td class="attauthor">' + authorstring + '</td>'):"")
			+ '<td class="atttitle"><a href="' + topicurl +'">' + topictitle + '</a>'+'</td>'
			+ ((AOE_SHOW_DATE_CREATED) ? ('<td class="attcreated">' + format_relative_date(created) + '</td>') : "")
			+ '<td class="attupdated">' + format_relative_date(lastpost) + '</td>'
			+ '<td class="attlastauthor">' + lastauthorstring + '</td>'
			+ '<td class="attunread"><a href="'+topicurl+'&view=unread#unread'+'">[new]</a></td>'
			+ '<td class="attlastpost"><a href="'+lastposturl+'">[last]</a></td>'
			+ '<td class="attjumpto">' + formstring + '</td>'
			+ '</tr>';
		    counter=(counter+1)%2;
		}
	    }
	}
    }
    table.innerHTML += tablelines;
    for (i=divnodes.length-1; i>=0; i--) {
	if (divnodes[i].className == "forumbg announcement") {
	    divnodes[i].parentNode.removeChild(divnodes[i]);
	} else if (divnodes[i].className == "forumbg") {
	    divnodes[i].parentNode.replaceChild (table, divnodes[i]);
	}
    }
    if (AOE_USE_RELATIVE_DATES)
	document.getElementById("aoedatetypebutton").addEventListener("click", toggle_date_styles, false);
}

function format_relative_date(datestr) {
    if (datestr.substr(0,1) != '@')
	return datestr;
    var str = datestr.replace(/\s+$/, '');
    var now = new Date();
    var rx = /^.*@(....)-(..)-(..)T(..):(..).*$/;
//    var d = new Date(parseInt(s.replace(rx, '$1')),parseInt(s.replace(rx, '$2')),parseInt(s.replace(rx, '$3')),parseInt(s.replace(rx, '$4')),parseInt(s.replace(rx, '$5')),0);
    var y = str.replace(rx, '$1');
    var M = str.replace(rx, '$2');
    var d = str.replace(rx, '$3');
    var h = str.replace(rx, '$4');
    var m = str.replace(rx, '$5');
    var s = '00';
    var tz = '+0100';
    
    var pd = new Date(parseInt(y),parseInt(M)-1,parseInt(d),parseInt(h),parseInt(m),parseInt(s));
// Objektname = new Date(Jahr, Monat, Tag, Stunden, Minuten, Sekunden);
// PHP date() format string: @Y-m-d\TH:i
    var secs = Math.round((now.getTime() - pd.getTime())/1000);
    
    if (acounter < 0)
	alert('+' + now.getTimezoneOffset() + '+');
    acounter++;
//    return datestr.substr(1);
//    return datestr + '|' + pd + '|' + secs;
//    return datestr + '=' + secs;
    return '<span class="aoedateabsolute">'+datestr.substr(1)+'</span><span class="aoedaterelative">'+fmt_second_period(secs)+'</span>';
}

function fmt_second_period (x) {
    var z = x;
    var s,m,h,d;
    var s = z % 60;
    z = (z-s)/60; // z is minutes now
    m = z % 60;
    z = (z-m) / 60; // z is hours now
    h = z % 24;
    z = (z-h) / 24; // z is days now
    d = z % 365;
    z = (z-d) / 365; // z is years now
    
    return '' 
	+ ((z>0)?('<span class="aoereldate">'+z+'</span>'+'<span class="aoereldate_a">a</span>'):'')
	+ ((d>0)?('<span class="aoereldate">'+d+'</span>'+'<span class="aoereldate_d">d</span>'):'')
	+ ((h>0)?('<span class="aoereldate">'+h+'</span>'+'<span class="aoereldate_h">h</span>'):'')
	+ ((m>0)?('<span class="aoereldate">'+m+'</span>'+'<span class="aoereldate_m">m</span>'):'')
	+ ((s>0)?('<span class="aoereldate">'+s+'</span>'+'<span class="aoereldate_s">s</span>'):'')
	+'';
}

function insert_short_whosonline ()  {
    var onlinenode = document.getElementsByTagName("h3")[0].nextSibling.nextSibling;

    var total=0, registered =0, guests = 0;
    total = parseInt(onlinenode.getElementsByTagName("strong")[0].innerHTML);
    registered = parseInt(onlinenode.innerHTML.replace(/^.*:: (\d*) registriert.*$/, "$1"));
    guests = parseInt(onlinenode.innerHTML.replace(/^.*registriert.*, (\d*) G.st.*$/, "$1"));

    var humantotal = 0, visible = 0, invisible = 0, bots = 0;
    bots = onlinenode.getElementsByTagName("span").length;
    visible = registered - bots;
    humantotal = total - bots;
    invisible = humantotal - guests - visible;

    var whosonline = document.createElement("div");
    whosonline.id = "whosonline";
    whosonline.innerHTML = '<a href="http://www.atheisten.org/forum/viewonline.php">Online</a>: '
	+ (humantotal!=0?humantotal:"-")
	+ ' <span style="color:red;">{</span> '
	+ (visible!=0?visible:"-")
	+ ' / ' + (invisible!=0?invisible:"-")
	+ ' / ' + (guests!=0?guests:"-")
	//+    '</span> / <span style="color:grey;">' + bots
	+ ' <span style="color:red;">}</span>: ';
    var usernodes = onlinenode.getElementsByTagName("a");
    for (var i=0; i<visible; i++) {
	whosonline.appendChild(usernodes[i].cloneNode(true));
	if (i != (visible -1)) {
	    whosonline.innerHTML = whosonline.innerHTML + ", ";
	}
    }
    if (false && aoe_loginname == "roach") {
	whosonline.innerHTML = whosonline.innerHTML + " total: " + total + " reg.: " + registered + " guests: " + guests + " bots: " + bots;	
    }

    var ilimit;
    var divnodes = document.getElementsByTagName("div");
    for (i=0, ilimit = divnodes.length; i<ilimit; i++) {
	if (divnodes[i].id == "page-body") {
	    divnodes[i].insertBefore (whosonline, divnodes[i].getElementsByTagName("p")[0]);
	}
    }
}
function remove_forum_descriptions () {
    var ulnodes = document.getElementsByTagName("ul");
    for (var i = 0, ilimit = ulnodes.length; i<ilimit; i++) {
	if (ulnodes[i].className=="topiclist forums") {
	    var linodes = ulnodes[i].getElementsByTagName("li");
	    for (var j = 0, jlimit = linodes.length; j<jlimit; j++) {
		if (linodes[j].className == "row") {
		    var brnode = linodes[j].getElementsByTagName("br")[0];
		    brnode.parentNode.removeChild(brnode.nextSibling.nextSibling);
		    brnode.parentNode.removeChild(brnode.nextSibling);
		}
	    }
	}
    }
}

function fix_ad_banners () {
    var fora = document.getElementsByTagName("div");
    for (var i = 0, ilimit=fora.length; i<ilimit; i++) {
	if (fora[i].className == "forabg") {
	    var dlnode = fora[i].getElementsByTagName("dl")[0];
	    if (dlnode.getElementsByTagName("dd").length == 0) {
		var ddnode = document.createElement("dd");
		ddnode.innerHTML = "" + unescape("%A0");
		ddnode.className = "topics";
		var ddnode2 = ddnode.cloneNode(true);
		ddnode2.className = "posts";
		var ddnode3 = ddnode.cloneNode(true);
		ddnode3.className = "lastpost";

		dlnode.appendChild(ddnode);
		dlnode.appendChild(ddnode2);
		dlnode.appendChild(ddnode3);
	    }
	}
    }
}
var aoe_loginname = get_loginname();
function perform_transformations () {

    var divnodes = document.getElementsByTagName("div");
    for (var i in divnodes)
	if (divnodes[i].id == "wrap") {
	    divnodes[i].innerHTML = 'atheisten<span id="aoerefreshindicator" style="font-size: 15px; color: red;">♦</span>org';
	    break;
	}

    if (!false && we_are_logged_in ()) {
	insert_stylesheet();
	insert_datestylesheet();
	fix_ad_banners();
	
	if (location.href.match(/^http:\/\/.*atheisten\.org\/forum\/index\.php.*$/) || 
	    location.href.match(/^http:\/\/.*atheisten\.org\/forum\/$/)) {
	    insert_short_whosonline();
	    adjust_forum_listing_table();

	    remove_forum_descriptions();
	    get_mark_hash();
	} else if (location.href.match(/^http:\/\/.*atheisten\.org\/forum\/viewforum\.php.*$/)) {
	    adjust_topic_listing_tables();
	    
	} else if (location.href.match(/^http:\/\/.*atheisten\.org\/forum\/viewtopic\.php.*$/)) {
	    transform_postblocks();
	    adjust_cites ();
	    add_search_thread_postings ();
	    colorize_at_occurences();
	    fix_phpbb2_links ();
	} else if (location.href.match(/^http:\/\/.*atheisten\.org\/forum\/posting\.php.*$/)) {
	    disarm_post_button();
	}
	insert_custom_search_form();
	add_refresh_indicator();
	helmis_function ();
	
	if (location.hash.length > 0) {
	    setTimeout("window.open(location.hash, '_self')",1000);
	}
    }
}
var time2 = new Date();
var msec2 = time2.getTime();

document.getElementById("site-description").innerHTML = "";
perform_transformations();
//alert("Time it took to run this script: " + (msec2 - msec1) + " milliseconds.");

function generate_sane_postblock(node, n) {
var reporttarget = node.getElementsByTagName("div")[1].getElementsByTagName("a")[0].href ;
var quotetarget = node.getElementsByTagName("div")[1].getElementsByTagName("a")[1].href ;
var helmisstring = (AOE_RUN_HELMIS_FUNCTION && getpostauthorname(node)=="die.helmi.") ? " helmipost" : "";
    return ''
+'<table class="postblock'+helmisstring+'" id="p'+getpostid(node)+'">\n'
+'  <tr>\n'
+'    <td class="authornick">'+getpostauthornamebanner(node)+'</td>\n'
+'    <td class="subjectline">' +  getpostsubjectline(node) + '<b style="font-size:130%; float: right;">'+n+'</b></td>\n'
+'  </tr>\n'
+'  <tr>\n'
+'    <td class="authorstatus"><center>'+getpostauthorstatus(node)+'</center></td>\n'
+'    <td>' + format_relative_date(getpostdate(node)) + '</td>\n'
+'  </tr>\n'
+'  <tr>\n'
+'    <td class="profileblock">\n'
+'      <table class="profiledata">\n'
+'        <tr><td colspan="2" class="authoricon"><center><a href="'+getprofileurl(node)+'">' +getpostauthoravatar(node)+ '</a></center></td></tr>\n'
+'        <tr><td colspan="2" class="authorrank">' + getpostauthorrank(node) + '</td></tr>\n'
+'        <tr><td colspan="2" class="authorrankpic"><img src="'+getpostauthorrankimg(node)+'"/></td></tr>\n'
+'        <tr><td class="authorpostcount">Beiträge</td><td>' + getpostauthorpostcount(node) + '</td></tr>\n'
+'        <tr><td class="authorregistered">Registriert</td><td>'+getpostauthorregistered(node)+'</td></tr>\n'
+'        <tr><td class="authorlocation">Wohnort</td><td>' + getpostauthorlocation(node) + '</td></tr>\n'
+'        <tr><td class="authorcommunication" colspan="2">'+getpostauthorpmstring(node)+'</td></tr>\n'
+'        <tr><td colspan="2">&nbsp;</td></tr>\n'
+'        <tr><td colspan="2" class="authoractionfilter"><a href="./search.php?t=' + get_thread_id() + '&author=' + getpostauthorname(node) + '">[Thread-Beiträge anzeigen]</a></td></tr>\n'
+'        <tr><td colspan="2" class="authoractionignore"><a href="./ucp.php?i=zebra&mode=foes&add=' + getpostauthorname(node) + '">[Benutzer ignorieren]</a></td></tr>\n'
+'      </table>\n'
+'    </td>\n'
+'    <td class="postcontentblock">\n'
+'      <p class="posttext">'
+ getpostcontent(node)
+'      </p>'
+ getpostsignature(node)
+'    </td>\n'
+'  </tr>\n'
+'  <tr>\n'
+'    <td colspan="2" class="actionsection">\n'
+'      <table class="actionsection">\n'
+'        <tr>\n'
+'          <td><a href="/forum/search.php?t=' + get_thread_id() + '&author=' + aoe_loginname + '">[Meine Thread-Beiträge anzeigen]</a> <a href="#wrap">Nach oben</a> ' + ((getpostauthorname(node)==aoe_loginname)?('<a href="./posting.php?mode=edit&f='+getforumidfromurl(location.href)+'&p='+getpostid(node)+'">[EDITIEREN]</a>'):'') + '<a href="'+quotetarget+'">[ZITIEREN]</a> <a href="'+reporttarget+'">[MELDEN]</a></td>\n'
+'        </tr>\n'
+'      </table>\n'
+'    </td>\n'
+'  </tr>\n'
+'</table>\n';
}

function getpostcontent(node) {
    var x = node.getElementsByTagName("div");
    for (var i= 0 ; i<x.length; i++)
	if ( x[i].className == "content")
	    return colorize_at_occurences(x[i].innerHTML);
    return "Error: could not get post content";
}

function getpostauthorstatus(node) {
    return /online/.test(node.className) ? '<span style="font-weight: bold; background-color: lightgreen; color: black; padding-left: 14px; padding-right: 14px;">online</span>' : '<span style="font-weight: bold; color: grey;">offline/hidden</span>';
}

function getforumidfromurl (s) {
    return s.replace(/^.*f=(\d+)\D+.*$/, '$1');
}

function getpostid(node) {
    return node.id.replace(/^p/, '');
}

function getprofileurl(node) {
    var profile = document.getElementById("profile" + node.id.replace(/^p/, ''));
    return profile.getElementsByTagName("dt")[0].getElementsByTagName("a")[0].href;
}

function getpostsubjectline(node) {
    return node.getElementsByTagName("h3")[0].innerHTML;
}

function getpostdate(node) {
    return node.getElementsByTagName("p")[0].innerHTML.replace(/^.* am /, '');
}

function getpostsignature(node) {
    var txt = document.getElementById("sig" + node.id.replace(/^p/, ''));
    var myundef ;
    return (txt != myundef) ? ('<p class="signature" id="sig'+getpostid(node)+'">'+txt.innerHTML+'</p>') : "";
}

function getpostauthorname(node) {
    var profile = document.getElementById("profile" + node.id.replace(/^p/, ''));
    var myundef;
    if (profile != myundef) {
	var anodes = profile.getElementsByTagName("dt")[0].getElementsByTagName("a");
	for (var i in anodes)
	    if (anodes[i].getElementsByTagName("img").length == 0)
		return anodes[i].innerHTML;
    }
    return "NO USERNAME";
}

function getpostauthornamebanner(node) {
    var anode = node.getElementsByTagName("p")[0].getElementsByTagName("a")[1].cloneNode(true);
    var divnode = document.createElement("div");
    divnode.appendChild(anode);
    return divnode.innerHTML;
}

function getpostauthoravatar(node) {
    var profile = document.getElementById("profile" + node.id.replace(/^p/, ''));
    var dtnode = profile.getElementsByTagName("dt")[0];
    if (dtnode.getElementsByTagName("img").length > 0 )
	return '<div style="width:100px; height: 100px; border: solid darkred 1px;"><img src="' + dtnode.getElementsByTagName("img")[0].src + '"/></div>';
    return '<div style="background-color: darkred; width:100px; height: 100px;">Dieser Benutzer hat kein Avatar-Bild hochgeladen.</div>\n';
}

function getpostauthorrank(node) {
    var profile = document.getElementById("profile" + node.id.replace(/^p/, ''));
    return profile.getElementsByTagName("dd")[0].getElementsByTagName("img")[0].title;
}

function getpostauthorrankimg(node) {
    var profile = document.getElementById("profile" + node.id.replace(/^p/, ''));
    return profile.getElementsByTagName("dd")[0].getElementsByTagName("img")[0].src;
}

function getpostauthorpostcount(node) {
    var profile = document.getElementById("profile" + node.id.replace(/^p/, ''));
    var s = profile.getElementsByTagName("strong");
    for (var i in s)
	if (s[i].innerHTML == "Beiträge:")
	    return s[i].nextSibling.data;
    return "";
}

function getpostauthorregistered(node) {
    var profile = document.getElementById("profile" + node.id.replace(/^p/, ''));
    var s = profile.getElementsByTagName("strong");
    for (var i in s) {
	if (s[i].innerHTML == "Registriert:")
	    return s[i].nextSibling.data;
    }
    return "";
}

function getpostauthorlocation(node) {
    var profile = document.getElementById("profile" + node.id.replace(/^p/, ''));
    var s = profile.getElementsByTagName("strong");
    for (var i in s)
	if (s[i].innerHTML == "Wohnort:")
	    return s[i].nextSibling.data;
    return "";
}

function transform_postblocks () {
    var d = document.getElementsByTagName("div");
    var x = gnbnac("div", "pagination").getElementsByTagName("strong");
    var postcounter;
    if (x.length == 0)
	postcounter = 1;
    else
	postcounter = (parseInt(x[x.length-1].innerHTML)-1)*15+1;

//    for (var i=d.length-1; i>=0; i--) {
    for (var i in d) {
	if (/^post bg1/.test(d[i].className) || /^post bg2/.test(d[i].className)) {
	    var x = document.createElement("div");
	    x.innerHTML = generate_sane_postblock(d[i], (postcounter%15==0)?'<span style="color: cyan;">#'+postcounter+'</span>':'#'+postcounter);
	    postcounter++;
	    d[i].parentNode.replaceChild(x, d[i]);
	}
    }
}

function getpostauthorpmstring(node) {
    var label = new Array ();
    label['pm-icon'] = 'PM';
    label['web-icon'] = 'HP';
    label['email-icon'] = '@';
    label['icq-icon'] = 'ICQ';
    label['aim-icon'] = 'AIM';
    label['yahoo-icon'] = 'Y!';
    label['msnm-icon'] = 'MSM';
    label['jabber-icon'] = 'JAB';

    var profile = document.getElementById("profile" + node.id.replace(/^p/, ''));
    var linodes = profile.getElementsByTagName("li");
    var collect = "";
    for (var s in label) {
	if (s == 'pm-icon' && aoe_loginname == getpostauthorname(node))
	    continue;
	for (var i in linodes)
	    if (linodes[i].className == s)
		collect+='<a href="' + linodes[i].getElementsByTagName("a")[0].href + '">'+label[s]+'</a>';
    }
    return collect;
}

function getNodeByNameAndClass(nodename, classstring) {
    var myundef;
    var nodes = document.getElementsByTagName(nodename);
    for (var i in nodes)
	if (nodes[i].className==classstring)
	    return nodes[i];
    return myundef;
}

function gnbnac(nodename, classstring) {
    return getNodeByNameAndClass(nodename, classstring);
}


function toggle_custom_search_form () {
    var n = document.getElementById("aoeadvancedsearchbox");
    if (n.style.visibility == "visible")
	n.style.visibility = "hidden";
    else
	n.style.visibility = "visible";
}

function insert_custom_search_form () {
    var ulnode = gnbnac("ul", "linklist rightside");
    var smallform = document.createElement("li");
    smallform.innerHTML = '<form method="get" action="./search.php" target="_blank"><input name="keywords" type="text" style="width: 100px;" /><input type="submit" /></form>';
    ulnode.insertBefore(smallform, ulnode.firstChild);

    var togglebutton = document.createElement("li");
    togglebutton.innerHTML = '<input id="aoeexpandsearchform" type="button" value="Qsearch" />';
    ulnode.insertBefore(togglebutton, ulnode.firstChild);
    document.getElementById("aoeexpandsearchform").addEventListener("click", toggle_custom_search_form, false);

    var csstrigger = document.createElement("li");
    csstrigger.innerHTML = '<input id="aoecsstrigger" type="button" value="CSS" />';
    ulnode.insertBefore(csstrigger, ulnode.firstChild);
    document.getElementById("aoecsstrigger").addEventListener("click", export_stylesheet, false);

    var divnode = document.createElement("div");
    divnode.id = "aoeadvancedsearchbox";
    divnode.style.visibility = "hidden";
    divnode.innerHTML = '<form method="get" action="./search.php" target="_blank">'
	+'<input type="hidden" name="sc" value="1" />'
	+'<table>'
	+'<tr><td class="aoeopaque">Begriffe</td><td><input type="text" name="keywords" /></td><td><select name="terms" size="1"><option value="all">all</option><option value="any">any</option></select></td></tr>'

	+'<tr><td class="aoeopaque">Autor</td><td><input type="text" name="author" /></td><td></td></tr>'

 	+'<tr><td class="aoeopaque">Suche in</td><td><select size="1" name="sf"><option value="all">subject+text</option><option value="msgonly">text only</option><option value="titleonly">subject only</option><option value="firstpost">1st post only</option></select></td><td></td></tr>'

 	+'<tr><td class="aoeopaque">Ergebnisse als</td><td><select name="sr" size="1"><option value="posts">posts</option><option value="topics">threads</option></select></td><td></td></tr>'

 	+'<tr><td class="aoeopaque">Sortierung</td><td><select name="sk" size="1"><option value="a">author</option><option selected="selected" value="t">date</option><option value="f">forum</option><option value="i">subject (thread)</option><option value="s">subject (post)</option></select></td><td><select name="sd" size="1"><option value="a">ascending</option><option selected="selected" value="d">descending</option></select></td></tr>'

 	+'<tr><td class="aoeopaque">Zeitspanne</td><td><select name="st" size="1"><option value="0">unlimited</option><option value="1">1 day</option><option value="7">1 week</option><option value="14">2 weeks</option><option value="30">1 month</option><option value="90">3 months</option><option value="180">6 months</option><option value="365">1 year</option></select></td><td></td></tr>'

 	+'<tr><td class="aoeopaque">Zeichenlimit</td><td><input type="text" name="ch" value="300" /></td><td></td></tr>'

 	+'<tr><td colspan="3"><input id="submitandhide" type="submit" value="Submit+Hide" /><input type="submit" /><input type="reset" value="Clear" /><input type="button" value="Hide" id="justhide" /></td></tr>'

	+'</table>'
	+'</form>';
    document.getElementsByTagName("body")[0].appendChild(divnode);
    document.getElementById("submitandhide").addEventListener("click", toggle_custom_search_form, false);
    document.getElementById("justhide").addEventListener("click", toggle_custom_search_form, false);
}

function add_refresh_indicator () {
    var MSEC = 1000, T = 60, N = 5, S = 2; // choose S so that S|(N*T)
    for (var i = N*T; i>0; i-=S) {
	if (dark)
	    setTimeout("document.getElementById('aoerefreshindicator').style.color = 'rgb("
		       + Math.floor( (255*i) / (N*T) ) + ",0,0)'", (N*T - i) * MSEC);
	else
	    setTimeout("document.getElementById('aoerefreshindicator').style.color = 'rgb(255,"
		       + Math.floor( (255*(N*T-i)) / (N*T) ) + "," 
		       + Math.floor( (255*(N*T-i)) / (N*T) ) + ")'", (N*T - i) * MSEC);
    }
}

function disarm_post_button() {
    var fs = gnbnac("fieldset", "submit-buttons");
    var submit = fs.getElementsByTagName("input")[4];
    submit.style.visibility = "hidden";
    submit.id = "submitbutton";
    var armbutton = document.createElement("input");
    armbutton.type = "button";
    armbutton.id = "aoearmbutton";
    armbutton.value = "Entsichern";
    armbutton.className="button2";
    fs.appendChild(armbutton);

    document.getElementById("aoearmbutton").addEventListener("click", function () { document.getElementById("submitbutton").style.visibility = "visible"; } , false);
}

function get_mark_hash () {
    return document.getElementById("page-body").getElementsByTagName("ul")[0].getElementsByTagName("li")[1].firstChild.href.replace(/^.*hash=(.*).mark=.*$/, '$1');
}

function colorize_at_occurences(str) {
    var myundef ;
    if (str != myundef)
	return str.replace(/@\s*/g, '@').replace(/<BR>/gi, '<BR/>\n').replace(/(@\S+):*/g, '<span style="color: darkred; background-color: yellow; font-weight: 800;">$1</span>');
    else
	return str;
};

function insert_datestylesheet() {
    var linknodes = document.getElementsByTagName("link");
    var cssnode = document.createElement ("style");
    cssnode.type = "text/css";
    cssnode.id = "aoedatestylesheet";
    cssnode.innerHTML = AOE_USE_RELATIVE_DATES ? 'span.aoedateabsolute { display: none; } span.aoedaterelative { display: inline; }' : 'span.aoedateabsolute { display: inline; } span.aoedaterelative { display: none; }';
    linknodes[linknodes.length-1].parentNode.insertBefore(cssnode, linknodes[linknodes.length-1].nextSibling);
    set_stylesheet(schema_user);
}

function toggle_date_styles () {
    var s = document.getElementById('aoedatestylesheet');
    if (/.*none.*inline.*/.test(s.innerHTML)) {
	s.innerHTML = 'span.aoedateabsolute { display: inline; } span.aoedaterelative { display: none; }';
	document.getElementById("aoedatetypebutton").value = 'Relative Zeit anzeigen';
    } else {
	s.innerHTML = 'span.aoedateabsolute { display: none; } span.aoedaterelative { display: inline; }';
	document.getElementById("aoedatetypebutton").value = 'Absolute Zeit anzeigen';
    }
}

function export_stylesheet () {
    var prenode = document.createElement("pre");
    prenode.innerHTML = document.getElementById("aoestylesheet").innerHTML;
    document.getElementsByTagName("body")[0].appendChild(prenode);
}
