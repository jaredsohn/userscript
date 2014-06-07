// ==UserScript==
// @id             
// @name           Maremen CSS
// @version        1.0 06/25/13
// @author         Beefmann
// @description    This is a custom CSS for thr room Maremen because CMC is a whiny bitch
// @include        http://synchtube.6irc.net/r/maremen*
// @grant          GM_addStyle
// @grant          GM_getResourceText
// ==/UserScript==

body
{
background-image:url(http://i.imgur.com/nTFHkuA.png), url(http://i.imgur.com/GgBWUoA.jpg);
background-color:#191946;
background-repeat:no-repeat;
background-position:bottom, center;
background-attachment:fixed;
}


#banner
{
background: url(http://i.imgur.com/9ENOFlM.png) no-repeat;
display: block;
margin-left: auto;
margin-right: auto;
}
.userlist_item {
	color: #333366;
	font-weight: bold;
	margin-left:4px;
	font-size: 12px;
	line-height: 20px;
}
.alert {
    background-color: #778899;
    color: #778899;
    font-weight: bold;
    text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
}

.userlist_owner {
	color: rgb(0, 191, 255)!important;
	font-weight: bold;
}

.userlist_op {
	color: #66CDAA !important;
	font-weight: bold;
}

legend {
	color: 	#62c462;
}

#welcome {
	display:none;
}

#chatline {
	margin-bottom: 0px;  
}
.nick-hover { background-color: #4682B4; }
  
#currenttitle {
    border: none;
    border-bottom: none;
    margin: 0;
    font-size: 20px;
    color: #87CEEB;
    background-color:#191946;
    margin-bottom: 7px;
}
.videolist li {
    opacity:0.6;
    margin: 0px 0 0 auto;
    padding: 2px;
    font-size: 10pt;
    border: 0px solid #aaaaaa; // [](/w21)
    border-radius: 0px;
    background-color: #191946;
}
#userpl_list {
    list-style: none outside none;
    margin-left: 0;
    max-height: 500px;
    overflow-y: scroll;
}
.modonly {
    color:  #46465A;
}
  
#userlist  {
    width: 100px;
    float: right;
    overflow: auto;
    background-color: #62c462;
}
  
#chatdiv {
    color: #46465A;
    background-color: #87CEEB;
}
.profile-image {
    width: 100px;
    height: 100px;
    border: 2px solid #778899;
    border-radius: 0px;
    background-color: #778899;
}
  
#motd
{
opacity:0.8;
background-color: #46465A;
color: #FFFFFF;
}
  
#playlisttogglewrap
{
opacity:0.8;
}
  
#voteskip
{
opacity:0.8;
}
  
div.well.well-small.span12.row-fluid
{
opacity:0.7;
font-weight: bold;
font-opacity:1.0;
background-color: #778899;
}
  
#userpltogglewrap
{
opacity:0.7;
font-weight: bold;
font-opacity:1.0;
background-color: #778899;
}
  
#channelsettingswrap3
{
opacity:0.8;
font-weight: bold;
font-opacity:1.0;
}
  
#chatline
{
opacity:0.7;
}
  
#getplaylist
{
opacity:0.6;
}
  
#plmeta
{
opacity:0.8;
}
  
#sitefooter
{
opacity:0.1;
}

.btn 
{
color: #2F4F4F;
text-shadow: 0 1px 1px rgba(5, 149, 97, 0.75);
}

background-image: -moz-linear-gradient(top, #3784f5, #3e77cb);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#3784f5), to(#3e77cb));
  background-image: -webkit-linear-gradient(top, #3784f5, #3e77cb);
  background-image: -o-linear-gradient(top, #3784f5, #3e77cb);
  background-image: linear-gradient(to bottom, #3784f5, #3e77cb);
  background-repeat: repeat-x;
border: 1px solid #99dec4;
}

.btn:hover,
.btn:focus,
.btn:active,
.btn.active,
.btn.disabled,
.btn[disabled] 
{
  color: #99dec4;
  background-color: #3e77cb;
  *background-color: #3e77cb;
}

.btn-danger 
{
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  background-color: #da4f49;
  *background-color: #bd362f;
  background-image: -moz-linear-gradient(top, #ee5f5b, #bd362f);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ee5f5b), to(#bd362f));
  background-image: -webkit-linear-gradient(top, #ee5f5b, #bd362f);
  background-image: -o-linear-gradient(top, #ee5f5b, #bd362f);
  background-image: linear-gradient(to bottom, #ee5f5b, #bd362f);
  background-repeat: repeat-x;
  border-color: #99dec4 #99dec4 #99dec4;
 // border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffee5f5b', endColorstr='#ffbd362f', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
}

.btn-danger:hover,
.btn-danger:focus,
.btn-danger:active,
.btn-danger.active,
.btn-danger.disabled,
.btn-danger[disabled] 
{
  color: #ffffff;
  background-color: #bd362f;
  *background-color: #a9302a;
}

.btn-danger:active,
.btn-danger.active 
{
  background-color: #942a25 \9;
}

.btn-success 
{
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
  background-color: #5bb75b;
  *background-color: #51a351;
  background-image: -moz-linear-gradient(top, #62c462, #51a351);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#62c462), to(#51a351));
  background-image: -webkit-linear-gradient(top, #62c462, #51a351);
  background-image: -o-linear-gradient(top, #62c462, #51a351);
  background-image: linear-gradient(to bottom, #62c462, #51a351);
  background-repeat: repeat-x;
  border-color: #99dec4 #99dec4 #99dec4;
  //border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff62c462', endColorstr='#ff51a351', GradientType=0);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
}

.btn-success:hover,
.btn-success:focus,
.btn-success:active,
.btn-success.active,
.btn-success.disabled,
.btn-success[disabled] 
{
  color: #ffffff;
  background-color: #51a351;
  *background-color: #499249;
}

#videowrap
{
background-color: #4682B4;
}

#messagebuffer
{
color: #ffffff;
background-image:url('http://i.imgur.com/SGNsBdZ.png?1');
background-position: left bottom;
background-color: #0E0E45;
background-repeat:no-repeat;
}
#userlist
{
background-color: #191946;
}
#usercount
{
background-color: #191946;
color: #FFFFFF;
}
#messagebox
{
background-color: #191946;
}