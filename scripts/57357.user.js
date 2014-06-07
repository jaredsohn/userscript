// ==UserScript==
// @name           websgHelper
// @namespace      zarg/websgHelper/
// @include        http://websg1.iyoyo.com.cn/*
// @description    v0.6.3 by xt2002
// ==/UserScript==




var tList=new Array('','','','','','','','','','')

var t=new Array('one','two','three','four','five','six','seven','eight','nine','ten')

var openCheck = true

var sPointer , sState

///////////////////////////////////////////////////////////////////////// 

function insertMenu(){

var menu =  document.createElement("div"); 

menu.innerHTML = "<div id='mydiv'>"+
'<ul>'+

'<li class="mylist1">'+

'<ul>'+
 
 
'<li>'+"<select id='one'>"+
	'<option value="SID=0"></option>'+
  '<option value="SID=1">森林SID=1</option>'+
  '<option value="SID=2">森林SID=2</option>'+
  '<option value="SID=3">森林SID=3</option>'+
  '<option value="SID=4">森林SID=4</option>'+
  '<option value="SID=5">泥场SID=5</option>'+
  '<option value="SID=6">泥场SID=6</option>'+
  '<option value="SID=7">泥场SID=7</option>'+
  '<option value="SID=8">泥场SID=8</option>'+
  '<option value="SID=9">矿场SID=9</option>'+
  '<option value="SID=10">矿场SID=10</option>'+
  '<option value="SID=11">矿场SID=11</option>'+
  '<option value="SID=12">矿场SID=12</option>'+
  '<option value="SID=13">农田SID=13</option>'+
  '<option value="SID=14">农田SID=14</option>'+
  '<option value="SID=15">农田SID=15</option>'+
  '<option value="SID=16">农田SID=16</option>'+
  '<option value="SID=17">农田SID=17</option>'+
  '<option value="SID=18">农田SID=18</option>'+
  '<option value="SID=19">SID=19</option>'+
  '<option value="SID=20">SID=20</option>'+
  '<option value="SID=21">SID=21</option>'+
  '<option value="SID=22">SID=22</option>'+
  '<option value="SID=23">SID=23</option>'+
  '<option value="SID=24">SID=24</option>'+
  '<option value="SID=25">SID=25</option>'+
  '<option value="SID=26">SID=26</option>'+
  '<option value="SID=27">SID=27</option>'+
  '<option value="SID=28">SID=28</option>'+
  '<option value="SID=29">SID=29</option>'+
  '<option value="SID=30">SID=30</option>'+
  '<option value="SID=31">SID=31</option>'+
  '<option value="SID=32">SID=32</option>'+
  '<option value="SID=33">SID=33</option>'+
  '<option value="SID=34">SID=34</option>'+
  '<option value="SID=35">SID=35</option>'+
  '<option value="SID=36">SID=36</option>'+
  '<option value="SID=37">SID=37</option>'+
  '<option value="SID=38">SID=38</option>'+
  '<option value="SID=39">SID=39</option>'+
  '<option value="SID=40">SID=40</option>'+
'</select>'+
'</li>'+
   '<li>'+"<select id='two'>"+
	'<option value="SID=0"></option>'+
  '<option value="SID=1">森林SID=1</option>'+
  '<option value="SID=2">森林SID=2</option>'+
  '<option value="SID=3">森林SID=3</option>'+
  '<option value="SID=4">森林SID=4</option>'+
  '<option value="SID=5">泥场SID=5</option>'+
  '<option value="SID=6">泥场SID=6</option>'+
  '<option value="SID=7">泥场SID=7</option>'+
  '<option value="SID=8">泥场SID=8</option>'+
  '<option value="SID=9">矿场SID=9</option>'+
  '<option value="SID=10">矿场SID=10</option>'+
  '<option value="SID=11">矿场SID=11</option>'+
  '<option value="SID=12">矿场SID=12</option>'+
  '<option value="SID=13">农田SID=13</option>'+
  '<option value="SID=14">农田SID=14</option>'+
  '<option value="SID=15">农田SID=15</option>'+
  '<option value="SID=16">农田SID=16</option>'+
  '<option value="SID=17">农田SID=17</option>'+
  '<option value="SID=18">农田SID=18</option>'+
  '<option value="SID=19">SID=19</option>'+
  '<option value="SID=20">SID=20</option>'+
  '<option value="SID=21">SID=21</option>'+
  '<option value="SID=22">SID=22</option>'+
  '<option value="SID=23">SID=23</option>'+
  '<option value="SID=24">SID=24</option>'+
  '<option value="SID=25">SID=25</option>'+
  '<option value="SID=26">SID=26</option>'+
  '<option value="SID=27">SID=27</option>'+
  '<option value="SID=28">SID=28</option>'+
  '<option value="SID=29">SID=29</option>'+
  '<option value="SID=30">SID=30</option>'+
  '<option value="SID=31">SID=31</option>'+
  '<option value="SID=32">SID=32</option>'+
  '<option value="SID=33">SID=33</option>'+
  '<option value="SID=34">SID=34</option>'+
  '<option value="SID=35">SID=35</option>'+
  '<option value="SID=36">SID=36</option>'+
  '<option value="SID=37">SID=37</option>'+
  '<option value="SID=38">SID=38</option>'+
  '<option value="SID=39">SID=39</option>'+
  '<option value="SID=40">SID=40</option>'+
'</select>'+
'</li>'+
'<li>'+"<select id='three'>"+
	'<option value="SID=0"></option>'+
  '<option value="SID=1">森林SID=1</option>'+
  '<option value="SID=2">森林SID=2</option>'+
  '<option value="SID=3">森林SID=3</option>'+
  '<option value="SID=4">森林SID=4</option>'+
  '<option value="SID=5">泥场SID=5</option>'+
  '<option value="SID=6">泥场SID=6</option>'+
  '<option value="SID=7">泥场SID=7</option>'+
  '<option value="SID=8">泥场SID=8</option>'+
  '<option value="SID=9">矿场SID=9</option>'+
  '<option value="SID=10">矿场SID=10</option>'+
  '<option value="SID=11">矿场SID=11</option>'+
  '<option value="SID=12">矿场SID=12</option>'+
  '<option value="SID=13">农田SID=13</option>'+
  '<option value="SID=14">农田SID=14</option>'+
  '<option value="SID=15">农田SID=15</option>'+
  '<option value="SID=16">农田SID=16</option>'+
  '<option value="SID=17">农田SID=17</option>'+
  '<option value="SID=18">农田SID=18</option>'+
  '<option value="SID=19">SID=19</option>'+
  '<option value="SID=20">SID=20</option>'+
  '<option value="SID=21">SID=21</option>'+
  '<option value="SID=22">SID=22</option>'+
  '<option value="SID=23">SID=23</option>'+
  '<option value="SID=24">SID=24</option>'+
  '<option value="SID=25">SID=25</option>'+
  '<option value="SID=26">SID=26</option>'+
  '<option value="SID=27">SID=27</option>'+
  '<option value="SID=28">SID=28</option>'+
  '<option value="SID=29">SID=29</option>'+
  '<option value="SID=30">SID=30</option>'+
  '<option value="SID=31">SID=31</option>'+
  '<option value="SID=32">SID=32</option>'+
  '<option value="SID=33">SID=33</option>'+
  '<option value="SID=34">SID=34</option>'+
  '<option value="SID=35">SID=35</option>'+
  '<option value="SID=36">SID=36</option>'+
  '<option value="SID=37">SID=37</option>'+
  '<option value="SID=38">SID=38</option>'+
  '<option value="SID=39">SID=39</option>'+
  '<option value="SID=40">SID=40</option>'+
'</select>'+
'</li>'+
   '<li>'+"<select id='four'>"+
	'<option value="SID=0"></option>'+
  '<option value="SID=1">森林SID=1</option>'+
  '<option value="SID=2">森林SID=2</option>'+
  '<option value="SID=3">森林SID=3</option>'+
  '<option value="SID=4">森林SID=4</option>'+
  '<option value="SID=5">泥场SID=5</option>'+
  '<option value="SID=6">泥场SID=6</option>'+
  '<option value="SID=7">泥场SID=7</option>'+
  '<option value="SID=8">泥场SID=8</option>'+
  '<option value="SID=9">矿场SID=9</option>'+
  '<option value="SID=10">矿场SID=10</option>'+
  '<option value="SID=11">矿场SID=11</option>'+
  '<option value="SID=12">矿场SID=12</option>'+
  '<option value="SID=13">农田SID=13</option>'+
  '<option value="SID=14">农田SID=14</option>'+
  '<option value="SID=15">农田SID=15</option>'+
  '<option value="SID=16">农田SID=16</option>'+
  '<option value="SID=17">农田SID=17</option>'+
  '<option value="SID=18">农田SID=18</option>'+
  '<option value="SID=19">SID=19</option>'+
  '<option value="SID=20">SID=20</option>'+
  '<option value="SID=21">SID=21</option>'+
  '<option value="SID=22">SID=22</option>'+
  '<option value="SID=23">SID=23</option>'+
  '<option value="SID=24">SID=24</option>'+
  '<option value="SID=25">SID=25</option>'+
  '<option value="SID=26">SID=26</option>'+
  '<option value="SID=27">SID=27</option>'+
  '<option value="SID=28">SID=28</option>'+
  '<option value="SID=29">SID=29</option>'+
  '<option value="SID=30">SID=30</option>'+
  '<option value="SID=31">SID=31</option>'+
  '<option value="SID=32">SID=32</option>'+
  '<option value="SID=33">SID=33</option>'+
  '<option value="SID=34">SID=34</option>'+
  '<option value="SID=35">SID=35</option>'+
  '<option value="SID=36">SID=36</option>'+
  '<option value="SID=37">SID=37</option>'+
  '<option value="SID=38">SID=38</option>'+
  '<option value="SID=39">SID=39</option>'+
  '<option value="SID=40">SID=40</option>'+
'</select>'+
'</li>'+
'<li>'+"<select id='five'>"+
	'<option value="SID=0"></option>'+
  '<option value="SID=1">森林SID=1</option>'+
  '<option value="SID=2">森林SID=2</option>'+
  '<option value="SID=3">森林SID=3</option>'+
  '<option value="SID=4">森林SID=4</option>'+
  '<option value="SID=5">泥场SID=5</option>'+
  '<option value="SID=6">泥场SID=6</option>'+
  '<option value="SID=7">泥场SID=7</option>'+
  '<option value="SID=8">泥场SID=8</option>'+
  '<option value="SID=9">矿场SID=9</option>'+
  '<option value="SID=10">矿场SID=10</option>'+
  '<option value="SID=11">矿场SID=11</option>'+
  '<option value="SID=12">矿场SID=12</option>'+
  '<option value="SID=13">农田SID=13</option>'+
  '<option value="SID=14">农田SID=14</option>'+
  '<option value="SID=15">农田SID=15</option>'+
  '<option value="SID=16">农田SID=16</option>'+
  '<option value="SID=17">农田SID=17</option>'+
  '<option value="SID=18">农田SID=18</option>'+
  '<option value="SID=19">SID=19</option>'+
  '<option value="SID=20">SID=20</option>'+
  '<option value="SID=21">SID=21</option>'+
  '<option value="SID=22">SID=22</option>'+
  '<option value="SID=23">SID=23</option>'+
  '<option value="SID=24">SID=24</option>'+
  '<option value="SID=25">SID=25</option>'+
  '<option value="SID=26">SID=26</option>'+
  '<option value="SID=27">SID=27</option>'+
  '<option value="SID=28">SID=28</option>'+
  '<option value="SID=29">SID=29</option>'+
  '<option value="SID=30">SID=30</option>'+
  '<option value="SID=31">SID=31</option>'+
  '<option value="SID=32">SID=32</option>'+
  '<option value="SID=33">SID=33</option>'+
  '<option value="SID=34">SID=34</option>'+
  '<option value="SID=35">SID=35</option>'+
  '<option value="SID=36">SID=36</option>'+
  '<option value="SID=37">SID=37</option>'+
  '<option value="SID=38">SID=38</option>'+
  '<option value="SID=39">SID=39</option>'+
  '<option value="SID=40">SID=40</option>'+
'</select>'+
'</li>'+
   '<li>'+"<select id='six'>"+
	'<option value="SID=0"></option>'+
  '<option value="SID=1">森林SID=1</option>'+
  '<option value="SID=2">森林SID=2</option>'+
  '<option value="SID=3">森林SID=3</option>'+
  '<option value="SID=4">森林SID=4</option>'+
  '<option value="SID=5">泥场SID=5</option>'+
  '<option value="SID=6">泥场SID=6</option>'+
  '<option value="SID=7">泥场SID=7</option>'+
  '<option value="SID=8">泥场SID=8</option>'+
  '<option value="SID=9">矿场SID=9</option>'+
  '<option value="SID=10">矿场SID=10</option>'+
  '<option value="SID=11">矿场SID=11</option>'+
  '<option value="SID=12">矿场SID=12</option>'+
  '<option value="SID=13">农田SID=13</option>'+
  '<option value="SID=14">农田SID=14</option>'+
  '<option value="SID=15">农田SID=15</option>'+
  '<option value="SID=16">农田SID=16</option>'+
  '<option value="SID=17">农田SID=17</option>'+
  '<option value="SID=18">农田SID=18</option>'+
  '<option value="SID=19">SID=19</option>'+
  '<option value="SID=20">SID=20</option>'+
  '<option value="SID=21">SID=21</option>'+
  '<option value="SID=22">SID=22</option>'+
  '<option value="SID=23">SID=23</option>'+
  '<option value="SID=24">SID=24</option>'+
  '<option value="SID=25">SID=25</option>'+
  '<option value="SID=26">SID=26</option>'+
  '<option value="SID=27">SID=27</option>'+
  '<option value="SID=28">SID=28</option>'+
  '<option value="SID=29">SID=29</option>'+
  '<option value="SID=30">SID=30</option>'+
  '<option value="SID=31">SID=31</option>'+
  '<option value="SID=32">SID=32</option>'+
  '<option value="SID=33">SID=33</option>'+
  '<option value="SID=34">SID=34</option>'+
  '<option value="SID=35">SID=35</option>'+
  '<option value="SID=36">SID=36</option>'+
  '<option value="SID=37">SID=37</option>'+
  '<option value="SID=38">SID=38</option>'+
  '<option value="SID=39">SID=39</option>'+
  '<option value="SID=40">SID=40</option>'+
'</select>'+
'</li>'+
'<li>'+"<select id='seven'>"+
	'<option value="SID=0"></option>'+
  '<option value="SID=1">森林SID=1</option>'+
  '<option value="SID=2">森林SID=2</option>'+
  '<option value="SID=3">森林SID=3</option>'+
  '<option value="SID=4">森林SID=4</option>'+
  '<option value="SID=5">泥场SID=5</option>'+
  '<option value="SID=6">泥场SID=6</option>'+
  '<option value="SID=7">泥场SID=7</option>'+
  '<option value="SID=8">泥场SID=8</option>'+
  '<option value="SID=9">矿场SID=9</option>'+
  '<option value="SID=10">矿场SID=10</option>'+
  '<option value="SID=11">矿场SID=11</option>'+
  '<option value="SID=12">矿场SID=12</option>'+
  '<option value="SID=13">农田SID=13</option>'+
  '<option value="SID=14">农田SID=14</option>'+
  '<option value="SID=15">农田SID=15</option>'+
  '<option value="SID=16">农田SID=16</option>'+
  '<option value="SID=17">农田SID=17</option>'+
  '<option value="SID=18">农田SID=18</option>'+
  '<option value="SID=19">SID=19</option>'+
  '<option value="SID=20">SID=20</option>'+
  '<option value="SID=21">SID=21</option>'+
  '<option value="SID=22">SID=22</option>'+
  '<option value="SID=23">SID=23</option>'+
  '<option value="SID=24">SID=24</option>'+
  '<option value="SID=25">SID=25</option>'+
  '<option value="SID=26">SID=26</option>'+
  '<option value="SID=27">SID=27</option>'+
  '<option value="SID=28">SID=28</option>'+
  '<option value="SID=29">SID=29</option>'+
  '<option value="SID=30">SID=30</option>'+
  '<option value="SID=31">SID=31</option>'+
  '<option value="SID=32">SID=32</option>'+
  '<option value="SID=33">SID=33</option>'+
  '<option value="SID=34">SID=34</option>'+
  '<option value="SID=35">SID=35</option>'+
  '<option value="SID=36">SID=36</option>'+
  '<option value="SID=37">SID=37</option>'+
  '<option value="SID=38">SID=38</option>'+
  '<option value="SID=39">SID=39</option>'+
  '<option value="SID=40">SID=40</option>'+
'</select>'+
'</li>'+
   '<li>'+"<select id='eight'>"+
	'<option value="SID=0"></option>'+
  '<option value="SID=1">森林SID=1</option>'+
  '<option value="SID=2">森林SID=2</option>'+
  '<option value="SID=3">森林SID=3</option>'+
  '<option value="SID=4">森林SID=4</option>'+
  '<option value="SID=5">泥场SID=5</option>'+
  '<option value="SID=6">泥场SID=6</option>'+
  '<option value="SID=7">泥场SID=7</option>'+
  '<option value="SID=8">泥场SID=8</option>'+
  '<option value="SID=9">矿场SID=9</option>'+
  '<option value="SID=10">矿场SID=10</option>'+
  '<option value="SID=11">矿场SID=11</option>'+
  '<option value="SID=12">矿场SID=12</option>'+
  '<option value="SID=13">农田SID=13</option>'+
  '<option value="SID=14">农田SID=14</option>'+
  '<option value="SID=15">农田SID=15</option>'+
  '<option value="SID=16">农田SID=16</option>'+
  '<option value="SID=17">农田SID=17</option>'+
  '<option value="SID=18">农田SID=18</option>'+
  '<option value="SID=19">SID=19</option>'+
  '<option value="SID=20">SID=20</option>'+
  '<option value="SID=21">SID=21</option>'+
  '<option value="SID=22">SID=22</option>'+
  '<option value="SID=23">SID=23</option>'+
  '<option value="SID=24">SID=24</option>'+
  '<option value="SID=25">SID=25</option>'+
  '<option value="SID=26">SID=26</option>'+
  '<option value="SID=27">SID=27</option>'+
  '<option value="SID=28">SID=28</option>'+
  '<option value="SID=29">SID=29</option>'+
  '<option value="SID=30">SID=30</option>'+
  '<option value="SID=31">SID=31</option>'+
  '<option value="SID=32">SID=32</option>'+
  '<option value="SID=33">SID=33</option>'+
  '<option value="SID=34">SID=34</option>'+
  '<option value="SID=35">SID=35</option>'+
  '<option value="SID=36">SID=36</option>'+
  '<option value="SID=37">SID=37</option>'+
  '<option value="SID=38">SID=38</option>'+
  '<option value="SID=39">SID=39</option>'+
  '<option value="SID=40">SID=40</option>'+
'</select>'+
'</li>'+
'<li>'+"<select id='nine'>"+
	'<option value="SID=0"></option>'+
  '<option value="SID=1">森林SID=1</option>'+
  '<option value="SID=2">森林SID=2</option>'+
  '<option value="SID=3">森林SID=3</option>'+
  '<option value="SID=4">森林SID=4</option>'+
  '<option value="SID=5">泥场SID=5</option>'+
  '<option value="SID=6">泥场SID=6</option>'+
  '<option value="SID=7">泥场SID=7</option>'+
  '<option value="SID=8">泥场SID=8</option>'+
  '<option value="SID=9">矿场SID=9</option>'+
  '<option value="SID=10">矿场SID=10</option>'+
  '<option value="SID=11">矿场SID=11</option>'+
  '<option value="SID=12">矿场SID=12</option>'+
  '<option value="SID=13">农田SID=13</option>'+
  '<option value="SID=14">农田SID=14</option>'+
  '<option value="SID=15">农田SID=15</option>'+
  '<option value="SID=16">农田SID=16</option>'+
  '<option value="SID=17">农田SID=17</option>'+
  '<option value="SID=18">农田SID=18</option>'+
  '<option value="SID=19">SID=19</option>'+
  '<option value="SID=20">SID=20</option>'+
  '<option value="SID=21">SID=21</option>'+
  '<option value="SID=22">SID=22</option>'+
  '<option value="SID=23">SID=23</option>'+
  '<option value="SID=24">SID=24</option>'+
  '<option value="SID=25">SID=25</option>'+
  '<option value="SID=26">SID=26</option>'+
  '<option value="SID=27">SID=27</option>'+
  '<option value="SID=28">SID=28</option>'+
  '<option value="SID=29">SID=29</option>'+
  '<option value="SID=30">SID=30</option>'+
  '<option value="SID=31">SID=31</option>'+
  '<option value="SID=32">SID=32</option>'+
  '<option value="SID=33">SID=33</option>'+
  '<option value="SID=34">SID=34</option>'+
  '<option value="SID=35">SID=35</option>'+
  '<option value="SID=36">SID=36</option>'+
  '<option value="SID=37">SID=37</option>'+
  '<option value="SID=38">SID=38</option>'+
  '<option value="SID=39">SID=39</option>'+
  '<option value="SID=40">SID=40</option>'+
'</select>'+
'</li>'+
   '<li>'+"<select id='ten'>"+
	'<option value="SID=0"></option>'+
  '<option value="SID=1">森林SID=1</option>'+
  '<option value="SID=2">森林SID=2</option>'+
  '<option value="SID=3">森林SID=3</option>'+
  '<option value="SID=4">森林SID=4</option>'+
  '<option value="SID=5">泥场SID=5</option>'+
  '<option value="SID=6">泥场SID=6</option>'+
  '<option value="SID=7">泥场SID=7</option>'+
  '<option value="SID=8">泥场SID=8</option>'+
  '<option value="SID=9">矿场SID=9</option>'+
  '<option value="SID=10">矿场SID=10</option>'+
  '<option value="SID=11">矿场SID=11</option>'+
  '<option value="SID=12">矿场SID=12</option>'+
  '<option value="SID=13">农田SID=13</option>'+
  '<option value="SID=14">农田SID=14</option>'+
  '<option value="SID=15">农田SID=15</option>'+
  '<option value="SID=16">农田SID=16</option>'+
  '<option value="SID=17">农田SID=17</option>'+
  '<option value="SID=18">农田SID=18</option>'+
  '<option value="SID=19">SID=19</option>'+
  '<option value="SID=20">SID=20</option>'+
  '<option value="SID=21">SID=21</option>'+
  '<option value="SID=22">SID=22</option>'+
  '<option value="SID=23">SID=23</option>'+
  '<option value="SID=24">SID=24</option>'+
  '<option value="SID=25">SID=25</option>'+
  '<option value="SID=26">SID=26</option>'+
  '<option value="SID=27">SID=27</option>'+
  '<option value="SID=28">SID=28</option>'+
  '<option value="SID=29">SID=29</option>'+
  '<option value="SID=30">SID=30</option>'+
  '<option value="SID=31">SID=31</option>'+
  '<option value="SID=32">SID=32</option>'+
  '<option value="SID=33">SID=33</option>'+
  '<option value="SID=34">SID=34</option>'+
  '<option value="SID=35">SID=35</option>'+
  '<option value="SID=36">SID=36</option>'+
  '<option value="SID=37">SID=37</option>'+
  '<option value="SID=38">SID=38</option>'+
  '<option value="SID=39">SID=39</option>'+
  '<option value="SID=40">SID=40</option>'+
'</select>'+
'</li>'+
'</ul>'+
'</li>'+
'<li class="mylist2">'+
'<ul>'+
   '<li>'+"<button id='tstart'>任务开始</button>"+'</li>'+
   '<li>'+"<button id='tend'>任务终止</button>"+'</li>'+
   '<hr/>'+
   '<li>websgHelper</li>'+
   '<li>v0.6.3</li>'+
   '<li>xt2002</li>'+
'</ul>'+
'</li>'+
'</ul>'+
'</div>';
									
document.body.insertBefore(menu, document.body.firstChild);	

GM_addStyle(".mylist1,.mylist2{float:left;background-color: silver;}ul{list-style-type: none;margin: 0px;padding: 5px;} #mydiv{position:fixed;left:40%;top:30%;display:none;z-index:9999;}");	

}

function setMenu(){
	
	document.getElementById('tstart').addEventListener('click', tStart, true);
	document.getElementById('tend').addEventListener('click', tEnd, true);
	
	document.getElementById('one').addEventListener('change', function(){xxxx(document.getElementById('one').value,1);}, true);
	document.getElementById('two').addEventListener('change', function(){xxxx(document.getElementById('two').value,2);}, true);
	document.getElementById('three').addEventListener('change', function(){xxxx(document.getElementById('three').value,3);}, true);
	document.getElementById('four').addEventListener('change', function(){xxxx(document.getElementById('four').value,4);}, true);
	document.getElementById('five').addEventListener('change', function(){xxxx(document.getElementById('five').value,5);}, true);
	document.getElementById('six').addEventListener('change', function(){xxxx(document.getElementById('six').value,6);}, true);
	document.getElementById('seven').addEventListener('change', function(){xxxx(document.getElementById('seven').value,7);}, true);
	document.getElementById('eight').addEventListener('change', function(){xxxx(document.getElementById('eight').value,8);}, true);
	document.getElementById('nine').addEventListener('change', function(){xxxx(document.getElementById('nine').value,9);}, true);

	if(sState){
		
		document.getElementById('tstart').disabled=true
		
	}
	
	else{
		
		document.getElementById('tend').disabled=true
		
	}
	
	
	
	tList=GM_getValue('tList').split(',')
	
	for(k=0;k<10;k++){
	
		document.getElementById(t[k]).value=tList[k]
	
		if(document.getElementById(t[k]).value=='SID=0'&&k<9){
		
			document.getElementById(t[k+1]).disabled=true
		
		}	
	}
}

function tStart(){

	
	if(document.getElementById(t[0]).value!='SID=0'){

	var g
	
	for(g=0;g<10;g++){
			
		tList[g]=document.getElementById(t[g]).value
		
	}
	
	
	GM_setValue ('tList' , tList.toString())
	
	sInitialize();
	
}
	
}

function tEnd(){
	
	GM_setValue ('sState' , false)
	
	location.href='http://websg1.iyoyo.com.cn/stv.php'
	
}


function xxxx(sid,num){
	
	
	
	var i=num
		
	if(sid=='SID=0'){
			
		for(i;i<10;i++){
			
			document.getElementById(t[i]).disabled=true
			document.getElementById(t[i]).value='SID=0'
		}
		
	}
	
	else{
			
		document.getElementById(t[i]).disabled=false
			
	}
	
}


///////////////////////////////////////////////////////////////////////// 

function insertLogo(){
	
	var logo = document.createElement("img");
	
	logo.style.position='fixed'
	
	logo.style.zIndex='9000'
	
	logo.style.bottom='10px'
	
	logo.style.left='10px'
	
	logo.style.cursor='pointer'
	
	logo.id='logo' 
	
if(sState){
	
	logo.src = 'data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEAYABgAAD%2F4QAWRXhpZgAASUkqAAgAAAAAAAAAAAD%2F2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL%2F2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL%2FwAARCAAKAAoDASIAAhEBAxEB%2F8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL%2F8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4%2BTl5ufo6erx8vP09fb3%2BPn6%2F8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL%2F8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3%2BPn6%2F9oADAMBAAIRAxEAPwDyzwl4v8T6PdJZ6O015G2dti0ZmU8MflUcjqWO0jOOc17H%2FwAJF4z%2FAOhE%2FwDKvD%2FhUXwqtLaHwBYXMVvFHPP5nnSqgDSbZXC7j1OBwM9K7WgD%2F9k%3D';
	
	document.body.insertBefore(logo, document.body.firstChild);
	
}
else{
	
	logo.src = 'data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEAYABgAAD%2F4QAWRXhpZgAASUkqAAgAAAAAAAAAAAD%2F2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL%2F2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL%2FwAARCAAKAAoDASIAAhEBAxEB%2F8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL%2F8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4%2BTl5ufo6erx8vP09fb3%2BPn6%2F8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL%2F8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3%2BPn6%2F9oADAMBAAIRAxEAPwDh7r%2FkFfFD%2FsIQ%2FwDpU9eweE%2F%2BRN0P%2FsH2%2FwD6LWvH7r%2FkFfFD%2FsIQ%2FwDpU9eweE%2F%2BRN0P%2FsH2%2FwD6LWgD%2F9k%3D';     
	
	document.body.insertBefore(logo, document.body.firstChild);
		
}
	
	document.body.insertBefore(logo, document.body.firstChild);
	
	document.getElementById('logo').addEventListener('click', openDiv, true); 
	
}




function openDiv(){
	
	
	if(openCheck){
	
	document.getElementById('mydiv').style.display='block'

  }
  
  else{
  	
	document.getElementById('mydiv').style.display='none'

  	
  }

  openCheck = !openCheck

}  



function sInitialize(){
	
	
	GM_setValue ('sPointer' , 0)
	GM_setValue ('sState' , true)

	location.href='http://websg1.iyoyo.com.cn/upgrade.php?'+tList[0]
	
}  


function checkLoad(){

var a

a	  = document.evaluate(
    "//a",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
       
	if(a.snapshotLength>0){
	
		return true
	
	}
	
	else{return false}
	
}

function mainp(){
	
	
	if(GM_getValue('sVer') < 62){
		
		GM_setValue ('tList' , tList.toString())			
		GM_setValue ('sVer' , 62)
		GM_setValue ('sPointer' , 0)
		GM_setValue ('sState' , false)
				
	}
	
	sState=GM_getValue('sState')
	sPointer=GM_getValue('sPointer')	
	
	
	insertMenu()

	insertLogo()

	setMenu()
	
	


	if (location.href.indexOf('upgrade') == 25){
		waitTime()
		
	}
	
	if (location.href.indexOf('userprofile') == 25){
		fixDiv()
	}	

	
	if(sState){
		run()
	}
	
//	if(document.getElementById('TCD2')){
//	
//		mywin=window.open('','','width=1,height=1')
//
//		mywin.document.title='敌袭'
//		
//	}
	
	setTimeout("location.href=location.href",600000)
	
}

function run(){
	

		if (location.href.indexOf('eula') == 25){
			
			location.href='http://websg1.iyoyo.com.cn/stv.php'
			
		} 

		if (location.href.indexOf('upgrade') == 25){
			
			autoUpgrade();	
			
		}		
		
		if (!document.getElementById('TCD1')&&((location.href.indexOf('stv') == 25)||(location.href.indexOf('sciv') == 25))){
	
			
			if((tList[sPointer]=='SID=0')||(sPointer==10)){tEnd()}
			
			else{location.href='http://websg1.iyoyo.com.cn/upgrade.php?'+tList[sPointer]}
		
		}
		
		setTimeout("location.href=location.href",600000)
	
}

function autoUpgrade(){
	
	var links;

	links = document.evaluate(
    "//td/a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
	var b;

	b = document.evaluate(
    "//b",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);  
    

	if(location.href==('http://websg1.iyoyo.com.cn/upgrade.php?'+tList[sPointer])){
	
		if(b.snapshotItem(0).textContent == '建造新建筑'){
			
			sPointer++;
		
			GM_setValue ('sPointer' , sPointer)				
				
			location.href = 'http://websg1.iyoyo.com.cn/sciv.php' 
					
		}
		
		else{
  	
			for(i=0;i<links.snapshotLength;i++){
				
				if(links.snapshotItem(i).href.indexOf('proceed') == 25){
  	
					sPointer++;
		
					GM_setValue ('sPointer' , sPointer)		
							
					location.href = links.snapshotItem(i).href 		
					
				}
				
				
			}		
			
			
		}
		
	setTimeout("location.href=location.href",300000)
	
	}
	
}

if(checkLoad()){mainp()}

else{setTimeout("location.href=location.href",600000)}
							
///////////////////////////////////////////////////////////////////////// 

function waitTime(){

var z
var iValue=new Array()

var nValue=document.getElementsByTagName('b')

var cValue=document.getElementsByTagName('span')

var a=0,b=0,c=0,d=0

var e

e	  = document.evaluate(
    "//td[@class='sango']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);



if(nValue.length==4){

for(z=0;z<4;z++){
	
	iValue[z]=e.snapshotItem(z)

	a =cValue[z].lastChild.nodeValue.split("/")
	b =parseInt(nValue[z].textContent,10)
	c =iValue[z].lastChild.nodeValue.split("/")

	if(a[0]<b){
			
		if (d<((b-a[0])/c[0])){
	
			d =(b-a[0])/c[0]
	
		}
		
	}
	
	
}


var waitTime = document.createElement("b");

waitTime.textContent='还需等待'+parseInt(d,10)+'小时'+parseInt(((parseInt(d*100,10))/100-parseInt(d,10)).toFixed(2)*60,10)+'分钟左右'

nValue[0].parentNode.insertBefore(waitTime, nValue[0].parentNode.lastChild);

}

}

/////////////////////////////////////////////////////////////////////////////////////////


function fixDiv(){

var d

d	  = document.evaluate(
    "//div[@style='overflow: auto; position: absolute; width: 100%; height: 99%; z-index: 2;']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
    
d.snapshotItem(0).style.position='relative'

}

/////////////////////////////////////////////////////////////////////////////////////////