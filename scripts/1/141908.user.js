//Code Developed by Eric Ho. 
// ==UserScript==
// @name			Simply Worship Password Adder
// @description		Auto add the password in the form and submit
// @version         0.1
// @match			http://www.simplyworship.hk/download.php?lid=*
// ==/UserScript==
/*
    <Simply Worship Password Adder in User Script>
    Copyright (C) <2012>  <Eric Ho>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var input=document.getElementsByTagName('input');
var form=document.getElementsByTagName('form')[0];
for (var i=0; i<input.length; i++){
	if(input[i].name == "pass"){
		input[i].value = 'simplyworship';
		form.submit();
		break;
	}
}
