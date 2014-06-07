// ==UserScript==
// @name Tiberium Alliances Attack Range
// @description Attack range
// @namespace TAAT
// @include http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 2
// @updateURL https://userscripts.org/scripts/source/482069.meta.js
// @downloadURL https://userscripts.org/scripts/source/482069.user.js
// @author Napali
// ==/UserScript==
(function () {
	var TATI_main = function () {
		console.log('Tunnel Info loaded');
		function CreateTATI() {
			qx.Class.define("TATI", {
				type : "singleton",
				extend : qx.core.Object,
				construct : function () {},
				members : {
					_App : null,
					_MainData : null,
					_VisMain : null,
					regionCityMoveInfoAddon : {
						grid : null,
						blockedTunnelImage : null,
					},
					regionCityMoveInfoAddonExists : null,
					gridWidth : null,
					gridHeight : null,
					tunnelMarkerWidth : null,
					tunnelMarkerHeight : null,
					regionZoomFactor : null,
					tunnelMarkerList : null,
					tunnelInfluenceRange : null,
					initialize : function () {
						try {
							this._App = qx.core.Init.getApplication();
							this._MainData = ClientLib.Data.MainData.GetInstance();
							this._VisMain = ClientLib.Vis.VisMain.GetInstance();

							this.tunnelMarkerList = [];

							phe.cnc.Util.attachNetEvent(this._VisMain.GetMouseTool(ClientLib.Vis.MouseTool.EMouseTool.MoveBase), "OnCellChange", ClientLib.Vis.MouseTool.OnCellChange, this, this.baseMoveToolCellChange);
							phe.cnc.Util.attachNetEvent(this._VisMain.GetMouseTool(ClientLib.Vis.MouseTool.EMouseTool.MoveBase), "OnActivate", ClientLib.Vis.MouseTool.OnActivate, this, this.baseMoveToolActivate);
							phe.cnc.Util.attachNetEvent(this._VisMain.GetMouseTool(ClientLib.Vis.MouseTool.EMouseTool.MoveBase), "OnDeactivate", ClientLib.Vis.MouseTool.OnDeactivate, this, this.baseMoveToolDeactivate);

							this.regionCityMoveInfoAddon.grid = new qx.ui.container.Composite();
							var layout = new qx.ui.layout.Grid(5, 5);
							this.regionCityMoveInfoAddon.grid.setLayout(layout);
							this.regionCityMoveInfoAddon.blockedTunnelImage = new qx.ui.basic.Image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAKOWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAEjHnZZ3VFTXFofPvXd6oc0wAlKG3rvAANJ7k15FYZgZYCgDDjM0sSGiAhFFRJoiSFDEgNFQJFZEsRAUVLAHJAgoMRhFVCxvRtaLrqy89/Ly++Osb+2z97n77L3PWhcAkqcvl5cGSwGQyhPwgzyc6RGRUXTsAIABHmCAKQBMVka6X7B7CBDJy82FniFyAl8EAfB6WLwCcNPQM4BOB/+fpFnpfIHomAARm7M5GSwRF4g4JUuQLrbPipgalyxmGCVmvihBEcuJOWGRDT77LLKjmNmpPLaIxTmns1PZYu4V8bZMIUfEiK+ICzO5nCwR3xKxRoowlSviN+LYVA4zAwAUSWwXcFiJIjYRMYkfEuQi4uUA4EgJX3HcVyzgZAvEl3JJS8/hcxMSBXQdli7d1NqaQffkZKVwBALDACYrmcln013SUtOZvBwAFu/8WTLi2tJFRbY0tba0NDQzMv2qUP91829K3NtFehn4uWcQrf+L7a/80hoAYMyJarPziy2uCoDOLQDI3fti0zgAgKSobx3Xv7oPTTwviQJBuo2xcVZWlhGXwzISF/QP/U+Hv6GvvmckPu6P8tBdOfFMYYqALq4bKy0lTcinZ6QzWRy64Z+H+B8H/nUeBkGceA6fwxNFhImmjMtLELWbx+YKuGk8Opf3n5r4D8P+pMW5FonS+BFQY4yA1HUqQH7tBygKESDR+8Vd/6NvvvgwIH554SqTi3P/7zf9Z8Gl4iWDm/A5ziUohM4S8jMX98TPEqABAUgCKpAHykAd6ABDYAasgC1wBG7AG/iDEBAJVgMWSASpgA+yQB7YBApBMdgJ9oBqUAcaQTNoBcdBJzgFzoNL4Bq4AW6D+2AUTIBnYBa8BgsQBGEhMkSB5CEVSBPSh8wgBmQPuUG+UBAUCcVCCRAPEkJ50GaoGCqDqqF6qBn6HjoJnYeuQIPQXWgMmoZ+h97BCEyCqbASrAUbwwzYCfaBQ+BVcAK8Bs6FC+AdcCXcAB+FO+Dz8DX4NjwKP4PnEIAQERqiihgiDMQF8UeikHiEj6xHipAKpAFpRbqRPuQmMorMIG9RGBQFRUcZomxRnqhQFAu1BrUeVYKqRh1GdaB6UTdRY6hZ1Ec0Ga2I1kfboL3QEegEdBa6EF2BbkK3oy+ib6Mn0K8xGAwNo42xwnhiIjFJmLWYEsw+TBvmHGYQM46Zw2Kx8lh9rB3WH8vECrCF2CrsUexZ7BB2AvsGR8Sp4Mxw7rgoHA+Xj6vAHcGdwQ3hJnELeCm8Jt4G749n43PwpfhGfDf+On4Cv0CQJmgT7AghhCTCJkIloZVwkfCA8JJIJKoRrYmBRC5xI7GSeIx4mThGfEuSIemRXEjRJCFpB+kQ6RzpLuklmUzWIjuSo8gC8g5yM/kC+RH5jQRFwkjCS4ItsUGiRqJDYkjiuSReUlPSSXK1ZK5kheQJyeuSM1J4KS0pFymm1HqpGqmTUiNSc9IUaVNpf+lU6RLpI9JXpKdksDJaMm4ybJkCmYMyF2TGKQhFneJCYVE2UxopFykTVAxVm+pFTaIWU7+jDlBnZWVkl8mGyWbL1sielh2lITQtmhcthVZKO04bpr1borTEaQlnyfYlrUuGlszLLZVzlOPIFcm1yd2WeydPl3eTT5bfJd8p/1ABpaCnEKiQpbBf4aLCzFLqUtulrKVFS48vvacIK+opBimuVTyo2K84p6Ss5KGUrlSldEFpRpmm7KicpFyufEZ5WoWiYq/CVSlXOavylC5Ld6Kn0CvpvfRZVUVVT1Whar3qgOqCmrZaqFq+WpvaQ3WCOkM9Xr1cvUd9VkNFw08jT6NF454mXpOhmai5V7NPc15LWytca6tWp9aUtpy2l3audov2Ax2yjoPOGp0GnVu6GF2GbrLuPt0berCehV6iXo3edX1Y31Kfq79Pf9AAbWBtwDNoMBgxJBk6GWYathiOGdGMfI3yjTqNnhtrGEcZ7zLuM/5oYmGSYtJoct9UxtTbNN+02/R3Mz0zllmN2S1zsrm7+QbzLvMXy/SXcZbtX3bHgmLhZ7HVosfig6WVJd+y1XLaSsMq1qrWaoRBZQQwShiXrdHWztYbrE9Zv7WxtBHYHLf5zdbQNtn2iO3Ucu3lnOWNy8ft1OyYdvV2o/Z0+1j7A/ajDqoOTIcGh8eO6o5sxybHSSddpySno07PnU2c+c7tzvMuNi7rXM65Iq4erkWuA24ybqFu1W6P3NXcE9xb3Gc9LDzWepzzRHv6eO7yHPFS8mJ5NXvNelt5r/Pu9SH5BPtU+zz21fPl+3b7wX7efrv9HqzQXMFb0ekP/L38d/s/DNAOWBPwYyAmMCCwJvBJkGlQXlBfMCU4JvhI8OsQ55DSkPuhOqHC0J4wybDosOaw+XDX8LLw0QjjiHUR1yIVIrmRXVHYqLCopqi5lW4r96yciLaILoweXqW9KnvVldUKq1NWn46RjGHGnIhFx4bHHol9z/RnNjDn4rziauNmWS6svaxnbEd2OXuaY8cp40zG28WXxU8l2CXsTphOdEisSJzhunCruS+SPJPqkuaT/ZMPJX9KCU9pS8Wlxqae5Mnwknm9acpp2WmD6frphemja2zW7Fkzy/fhN2VAGasyugRU0c9Uv1BHuEU4lmmfWZP5Jiss60S2dDYvuz9HL2d7zmSue+63a1FrWWt78lTzNuWNrXNaV78eWh+3vmeD+oaCDRMbPTYe3kTYlLzpp3yT/LL8V5vDN3cXKBVsLBjf4rGlpVCikF84stV2a9021DbutoHt5turtn8sYhddLTYprih+X8IqufqN6TeV33zaEb9joNSydP9OzE7ezuFdDrsOl0mX5ZaN7/bb3VFOLy8qf7UnZs+VimUVdXsJe4V7Ryt9K7uqNKp2Vr2vTqy+XeNc01arWLu9dn4fe9/Qfsf9rXVKdcV17w5wD9yp96jvaNBqqDiIOZh58EljWGPft4xvm5sUmoqbPhziHRo9HHS4t9mqufmI4pHSFrhF2DJ9NProje9cv+tqNWytb6O1FR8Dx4THnn4f+/3wcZ/jPScYJ1p/0Pyhtp3SXtQBdeR0zHYmdo52RXYNnvQ+2dNt293+o9GPh06pnqo5LXu69AzhTMGZT2dzz86dSz83cz7h/HhPTM/9CxEXbvUG9g5c9Ll4+ZL7pQt9Tn1nL9tdPnXF5srJq4yrndcsr3X0W/S3/2TxU/uA5UDHdavrXTesb3QPLh88M+QwdP6m681Lt7xuXbu94vbgcOjwnZHokdE77DtTd1PuvriXeW/h/sYH6AdFD6UeVjxSfNTws+7PbaOWo6fHXMf6Hwc/vj/OGn/2S8Yv7ycKnpCfVEyqTDZPmU2dmnafvvF05dOJZ+nPFmYKf5X+tfa5zvMffnP8rX82YnbiBf/Fp99LXsq/PPRq2aueuYC5R69TXy/MF72Rf3P4LeNt37vwd5MLWe+x7ys/6H7o/ujz8cGn1E+f/gUDmPP8usTo0wAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB94BFQkcE9Nffu4AACAASURBVHjaxbtnkFzHee/dffqkmTmT88zG2bwLbACwyAAJECAYQBAkwUxKFCVRokRTtCjbkmXpktZVpmRJtEyTCpREUZaYxAiSEBKR4wK7wOa8Mzs5njNz8jl9P/jK5etbt8p+6617+1PXU11P9fOrfz/95flD8B8W3UNBAAAeuLMede0MOn5172medlAA4H878ucdxhgDD20HmcslvOf51f2jr8Sv8kXVyNXKwMqwgCFJELK7AE2SAAAAgnYnPjoz9uc88N/nU0c18P9ioYP4B+DS2BjIjvH/GgggAACAy8Nl7G+14y2PtnqkiqZmpwRAkAT8nxeHGGMCYwxJkoChLhc6++xMNtLrIdgwSVA1EjIEBbWaDjiGJUgGgeFDC9j0QaIi1gCEkPhznj+DQAEEjJz5fx/A8dMXYajDBQb/phmM/T75bwAIBMHUn9Kmv91utl8b8HZcF2LLy6JW/KgGDGQSDEchlqQIDDHUVQO46mxkuVwFBEAEoABMni7iO1/csGbhUCYtl3Xmun/ublo6Xiirhg4RSUB5TCUMCkOCgQBCCP5fQYC7nuoFHz418m+BhnU+kK5WAMYYQggBNjFhcVHE1s+12b1NtqhpYKKaV6rFObHq8nu08y+PKdWsbvCpmjF4Z6wnuI5Lch7Gd+jp6dnchTK97rOt0OANzZq0S/NKkpQUDQIZkDt/2F5XnBOrQ7+PlyoFSQcAmAAA8//2U0DOoAXEtgXguk/FwNg7SbDn+QE49rsUsHkYqOgagBACXTHh1JGMevmZeMHaTMtWN836Yra6WqnqH38rU3HVWVG4z8m07PKqjgDbdfJ787O0DbGMjcazxzLm/W9u8YxdWDQJCplLR3JAlDXYvCGwxhogjfGD6bKhm/9eBfg/KqFvexMMNjlBqNkNQzEXCDW7QGa+/P8LAGL8rQWw9o4VxJVfpoitX+xAh/9mHNatcEE1b2CWpABWAaQRCWxWBtI9FLj4hyXx/W+MZqSyxhOIqOi0qRM0tJgGprAGoke/NXNl9Q0rnA8+u2sVQICpW+9h/2HwHTB7JmfU8pLl+u/2t/feHalbPJmfYGxUu5TSSEQQJMYY/bkn/HsV9G5rBBBDYuTIIhAzGiBIQAwfXvgzmP+lmHV72v7rCrjuL/vg20+dgTavHVgYisIKBvZmC7JHGIKQCGQlaRRc4SCDKx1EfqoKECIgBoBwBBlQt8qzkqFpPPbOcqnjxpDvynvJNIEhNX1yzjJ5bnFlrahOQSukrD7WaNkacnCtFJm9xItCUpH5JQkH+m2Blk0Bx+zRXIFi/vWnMDE2TY+J+/ubYbDZhSAARH4hibc/tWZvhS/PXt2f1VdurwOZ+QoINbtAqNkFA3VO2P+JOuLYCxP4vwzA1W6BfrsTPP7kg1yuLU5/9sl7qf2vHTZcXicqLQnEmsfrGxY+LMrJ0Qo2kGnG1gfoWk7BiUtlnbIgoXGDe61Y0XKcn+EYFnGpK1WFtJAa52B9rpD1YV025pbHi4Xli0XQMhjatnSsNO/g7I7wakeT1++93RIigomDwoRa04DTyUEf7aBi/kbCZXWSxQ81c80tXYzVZSf2/+BcYvs9g3rQ74XdLStBOOYFfk8ILpxIg2te6LC89tB5bXBXM0jOlv6tuIWZJXBg8lWQm+X/t8L7dzaB9FwZoI7tYSI3xsPzB8bN8dfi+u9/8QGKNoZxaYYn+vd2BLoD3YNHXr4yxvoRohAiSAxtrIUCWEMgNVlWsURk13ysYXe4yxNcOlE0xLIiN28K2eKXSnEFaBetVnrQV8dt8tRxndPvF0523RAOZuJ5feZorjz5QepysNOBIptsjf6oO8wvi5V6b8DZFAk7ygXeEXyMbTDKsEmbx0rLPb4mrxKohkNBwHx/g048PeGYPb1kPrL3cXzk4sFg/GyhAnyYEGwyBn4IAh4XOCS9AuUZE0Ra3SCzUAG91zSCzGIFdAxEwXXPdsNzzy8A9KM/Po0uLZxHwa12i1kBetu2KE5eKGqbnuwJv/7oibzkqGirP1Vfd+lQhg+2Oyyr9vauvDqWhR2dXsPCsbC2qDOFuWpCKinuYLd9/eyhwpQuat72PT4/zZJO2kcKc+fy45FG9/X2IL1u7nJmmCHoQMetYR9lhe2pK5VaZI0jjGmztnCmkLcMEPS54+PFGpZLLZ5G3pR12LO+3XLolbMobAtSZgmSqftP3WTs5+IPf/c+67e+9V38+Y//ZTHnXXRjHFEqqgIphoEcRcC5P6VgY1sDMHQFZBYqYMUtDWD1Te2gVhShrylEdj7sAmhWH2MzR2pm/11tlve/OVQLdTlQJS2bw6/OSX0PN9CpIV7yrXcHf3N3U0v766nlNaMpy30kGfn9JFziJI664a9X904eWWyYP1m57Gllr2nZ7tvu7+bgxIHMIoTA7W9whpo2uNfUUkpQkdWaP+RcZw1TtsK00OfxuSOUFd4mFfSxgX0tN0/8Pn3ViV1EpVSFDp9FJ1u06xZHSpcmR6fEYI9TuvxSUmV6ZVuX2ssvolnj199/w/fVJ/+2fPAPb5JfckS01oVZdKOdJHZXEBhqsBP7nl8XHDuxoHLQARxhCku6SsichM6/NGcWK1ni+N/Pmija4YWMmzKPfn/MuOcbm8PDB5Z4T4+VNkwTLp0vY2cTS114LZd7cK13kOiwiJUlmEY9DflrBMUcBRhdnJpsrBSly5yfWjd5NP0haaHGvM3WDQjAwbpAtK5aFSLpSzxNMWSwa3NzSzlXtttdVrKlp8nZ097cVSMFYOrmeqkqsk0bvStlQxrc0LXa72xjPTOvZbvCTme7q8XOeYr+rvVfa/3nwonaybQjGbXwXGX77rXgwD/9XHq8vd0qAxYRTRJ0DPoZ7z4u+LuPhNrMy4ualWCIS4en9ZbuCDJJE1/45byx+YlO98jLCbH3mgaAKqkq7NnT6LQ6STM+Uqk1Xucml4dKRKDOb137aJNj6WQRb3uqZd3qiTIv8XQJFCAqTWdrrpVBz1Z7RD20ODcv64StkpcKfTc17MiN8r1azQDFSXkeutQbC0PqxYYN7q3+FRyiLFDoC6+Ojp2ZcTJ1RmOykvP7ZJ9ds+p5UyVqEIIUzZGKwJX7N69Z1X3p0Mwxoh3U4yy8slhJ64xEvzt6aTYbbQqmqjne0qGU5C99Y2PrwtuzfIo/p7oaXV5HI2jHNUP5KK1W/Q4biK1qsnziJzf1V93FgpbFetv1YVSbk+XIOjv0rnEi+OBvtzne/fo59eEnHuR++4vf6ozdguSqqrvCVufUUIq85ydrBxJnK1O1D8vlH++71aeHSpRRnGs//q3h/eF6h49ApvoVCVFrH4/crwvmeifjMJfGsomm251hzBMsn5bXBlc4Jz584uqLJET7AhuszS6nR86P5UU77dJ5WYCKopctLlK2hdlAtD/k4mxQ+pcnTi4N9LRCQDDvBLZRdyOBKp7ePz6yee26P01fnG3d95UWvuOHU6g8m6k0fLfdwtW5G6SqlFfn9fhzlz0LJTYJxKIo87kqmjudA619YZmL0jrkIMwNCcbNz6+2P3/dgQoCnM6FOl0IBSWvpR6Fmq71utu2B52jp+b0/aPP7/rlf3896bS6awZLUWI3vbnx9cMmurl3zseTXTBT67DYLI7PtjL7sh2+lWfeTr5jMobFs8JSL75uky4enXrDwdnK9jpmk6GDxt5drZnMYUFbOJ8UNFPKD9zVGWYgi/Oz/ARygbYA4yxdPbzIWMNUdvNfdvaJZaXa82BwU26opuh+w2HR6AvlpfygN8geuOG50Q1aI5voeu4mjyuENk3+9fxxc5JZ/Pkyr5j9oEtYUBI3f2mrdezwjLiir1Ulw5jMzucBiy3I12VDb37pvDxwSxOBOm4Kuq1Rwo4RQL46n3H8mfE87US2hq5Ay7/8/C1LpDGIs4kSyE7x+YVUunTa4eVX/260r1KuLURXBNbaGKmH3eVCg2drBXlv3Y54pjy08GFxaX4xMd3cWL+jWiu31A96/B6inQawHAjs4BqktKLZ/Tb72Nvx7MyVeJx2UBgDwK3Y0pCbvpyYbN4UiYiCyOppciZ1LqmkE9XQLY9tWazSJZfFSV965FLBD9rtS3Z3xAGmx/v16QJhWUtN/yHA+co1VhTj6jKhEvpied7Jj2si10ZhnVTpF3/0T80TK88RkZYIDQlNk3nVQNd8cmXgC7c9Qf7TUy8r2auCopR1IxUv6qGon7nr+j3B6dycalRwCRMmHWz3rionhfqPGHZiL8axCq5WgmvtHb7ujmBuPJu43Q8HryywnOAHISCQtG+Qcdi77aHUUCl/x1Obu/7lb987p1bpRX8/4+cz8ke+Lrftyy88esNYctJx6/W3NF2cOBpmbM4uW5Clc5NVUNUE5r7b7iqfOHE+NfNWBtjHVOabpi80gysHW7aEe9KnpuXweveKSsE4+qKT7otPSJmyUYG4TEqdg03MzOl4rrWrCSAvRGrGNL7zo+fo2hHCWDyVrNSSptawKeBC4XVO7rlv/xbd+symYOq9qrzjmyvrt0Y3hK5mx6iPTpwmSIGxB1q99evaBsMnDl1g1bIehybRv8DC8O03d1kcINSTf/M477mJbT/7TPqt9Vo5c1RlCG9noLdaroaCfZxH1EtGDupO2malK4lSg05gj1AWusvZSvPomYSJFZGayFy28iJps/pNpSYp9ujKTofpynoOfnAqDGvkECdi8CxtYy5PzLxXrxC7vb0D9VwTCJqmkvl+PS1D0oGyuZKlLhI0nITN+MPzB0sr+tocljBtnTudEg2og2gsICoVsxrcYqe5EGOe/umUiCKrvFz3LVHL4a+OVgJbbdYj37yqLdeWay6Xy7rhgZ5AZVHEE8fmSLOz1qNlTNS0JexOzhRLksNSm8tLK27xiTHvvS2xzA8K821bw5s4UGr566/t3X64tFwaPZc8U5wV2n0tbnco4GYPff0iCa/UvKkxgR2oWG0XzpXoQQ2zp5QcBb0GUcjXQLmqWWVGhJRCms4gqkolLDz82YH13+k0LeoqTvEO0K2BffVhUksHzZFc7cVeR3DscEVfni6mGhtCiVpN9hx57fzMTye/8pX3njkxHriZCcqjVJatI6GjhyJsrSQEAGqZqQrRvNnPIkJDhLeb87jbbAbH2Rx+n89bKVXYGi+isf1L0rpPd7S0kCtRbVnSIEHhYNQNSmm+JPMqsQxr9tSA3dv37mKCi9obo5//Qogpj4Zmfjc1dLu47E3ucA3aGjc7Kok8GDk2Vmtc64TuBYpl7Ag2+1x4JF6Eq3qDuLbOSiydFrFqMWFHXR2YHc4Q3dfTxNTFkhpSmcUfDHhJaTGDaIay869WBXE5KdPtTVM/9ZnojRdmhZ5764Oci/WQbgKWeCHuo1yB3/3NwTOSqS5Fu70R3zqKdrSTTopFJOtChKfVag+02ymdxxgxdcDmDtkxhprbF29RrvlyV/Piqbzcvrq5QRYVLh8v0s6dWqtg1LyU1wiVhYrLSFCB9df3DQT67b5FoRq6EgSRPW61Jhx+k7p4pvZa51DmBnZS9Wy/qpR/PpywMKYoR7+w09PZyjBLl4qESzUhnxdgkjCgg0Gga2sM993QCNCHy3B8Pgc2fSIA0ufKsJmQmA/30KGpn8zMlS8LWRvHeOkGlmWTrHb/L6ZQwaRnuj7jNSaeFVSmDk8HOh0+Z4xqMaL65UjUT63/m/qdhNcokhoDqmW52uBtlk6/MF01kqSST1QMX7fNhr788sfaXn3qsOyO2i0VbzqyRr9WPT59mJq7vAwGPt0cK8+JenakRmHZcC4cK54Ldbpjzn7UOHRgTMZ1dIOWNsrLBYMd9ULPlhFlzk/Rq+wF1U1SmLR+2u18uBWT/psstunjcXj4yggxT9WIalDF+TABlHYF3ProDVg0rsDwdVZieLYMQ1vaIFqCQD+bBSdE0xQXILQ1A7eYJUtkPUtZihXiM6qqT9OS5vCT9tR7QKq/j21KnqpYzr43+X6n2VuETdIOT7vV0OI0ufy2MD92cT7ulSNSIr+0om6tU2DqYF3LQD0/+sayhBZH08Sah2N2e9jKYRFKv3r+FbLBGVOve3BtQ6acRVOvZHPta5rswCSQmFNd/Lgq3vjFjQ35eBkWr5bVtvvpYHdfFKYsVWe8Nxi9ZTVHV08rimWVzWoeUwD8dB9s67oF3L7v0+iH338FOroG4LVbmmEqU4RkyoAXj47CcyNVuP6mdrx5YB0ce3EBw5lZOLSzHkrzJIAbw1g7wev2Ptqn/DZbuEemxekcMGKbOHXpKFbtbVqgc09DGZPmbNAWHLh6eszSG+qrnH1zaiJ3RpgJtoS4kC2EMoWUyXFczhGjnYmP+MXxw/MWq40BaMsXuhp1EYCFD/K5zHxZWb23w1IWSo6hd6ZTNg/d1NDW6KPcKrdwKVNadUesdf5sMjm4pi86kZ2pQQv0ETlsnVuolnNHa4Dujdo/mEnRN9qdWfTKsgetdUPwG4Eg9kwT8Ol/Alc3OsBXvvI54uRwCjodPBDcLPapThi4hgUnfzYH3vnFRfj0gR3g+WIMqBUZwBuDAB9cBsgukJZJQn2w34dKPo/DFpElTaApx8a8p2vnigul1xA69NMhbucXV4aMpJFIxvOjGBFBgHV+zZ62+4ePjk2yTjbTeXckJuZlSTEk8qt//7h5+tJ5hFpu9DulJVxDLuy88/ZbI8fOHhPvvWOfd2p4hiVoiuvfG208/cJMatU1K93pfNpKKMg8deKSzUyTJmmlWLcD6cBF+Nz1tKVls4+5eLZgXnA0MXdeSzOwgyDMySIEF3gAaB+x97gDfhggYJj24/sarkJdWwGG5xbAuqgLe/xuUKeI+NnOPdDsjwKsY4yfPInBogatEQpvs2E8h6BJA7JKOOSwwhWd0unQaS6ANpx646qx7sZu5vK5S0tm2f0hayGuTyTyoN7tFakOQmBT9vG8UGw88cz4VLjTr9Vtc9b97OlXYCQaRijY4g4Aj2K3sCwaSV12ahM0c/LcWa+aJLTIaodeEYQookiQmssS+Rne6ot5uNIMX7SGLe5KosoojaK3s2Mna4A0lZlQqdKFsmL10cxvTybo+wcBxMNFAu4NAaiUAT6SgWsf7YGjxSwUjoxhob8DrBtjMRMDYH3IBZ4dsgDjJ28BWO8iwP4RALutmJlS4G4/acK723B+Lmt4tyB7U324AninosWkqDiqm6vvW+m4eOVMLcg0U43t/tXlgnJ4oKcthgkr9f4PT54FViO8ef3gBNGom3y8Bmc+yFZW3FYHHG20jj7+xb2Noq+EchMCAzGhNPYFoptvXONxttDNhksNoxxXlnOC0dTS4MB1IkVFSvUtjl5Sdyg2ayf0tq+NWYpmkShXSpgxINvevpI486sRMr4sk4Idw+28nwCOCoRvmxBgBMDne8DqV8uQvBXDe3ecAymBh8Kf0vAnf0pAM+QCkOMgfu40hivrAfkoA+7d4AD5tzU4syTjho2ALE0RUp1rJTl3eAjnxtRcp60/Q9WXLeaIfXnydLzq7svWO5x1pTMHh9PVklh1ddsut8RiyRPHzuohe8BaA4raHK3XK6oAFz/KV1GKXHIaJexiIoSy765bG0dnJy0TJxeVqsLLKAsrulcKr1u/MzxBpG3UFJLLU9jQO+QYn65ZpGVTjydmYeH9arWuEXJjwyV89uIkbM4TTOdj/WC51UMclQWwR5IBvmyBwC0A4qRAgNeuggANwcnzBlyz2Qn/MMUC3AwAPJ+HwM4CsDUK0JEl8PiiE7+VT8NynwSoKRVcnSrquIzV5jUuWl5bNO/bvTl4Gr/HPnjnk4EPiTlnZy/pRRaHigQ0s1zl32bcOGMzLX1zyTiz+9qbYuOTI2L/zh6auw57ajOaUMMiRmtu6LHmUyVWr2Jm+NyYK3mqbCqCRjPI6sql+YLPbwtcHR6jQh3QvziUJz0rNV/pql7NJgqzA/f7gm6IbJJMEdYet03LYVM/WaMlB0HwuyrQO8dCiCj4zowObiMFACQbAXtqEKysByCFwMdWk+DmDRiYnIahDCHo8AGwUADIIsO/tHjAy6fmiJ0Dm7DYnQfVP1XxhscGiXg+T3ABAMUThCzyhCksscqC7ZSKppKKXIKaNFo8Xq4omag9slJOKh20VQ2svCtQy08AmtfLpfSIQJz8xZVaVZBkuWSYKLyFa+d8Vik7Xan13V3vrlWVYrDXSmHStFZ5MQIU1etb4bKXLoqV0HWkCxb8Nb5YZRr662NsJOM+/kdB693jtgizCs6NlWk0q9FWrwZlN0F0WmzQncLw1HQJHlYRvFtSIF7nAXBehSAIANAwwIqJwawGQJQGoMcAxDKEj1Ux+HmchzfG7PiDy1OguaMZ5HIZMHlhGfS0UsDuDMMCvwTKwRzZuhJa0h8hSV6m+ZYtDhNT1qBWRM3rPhPrklghM3+cp6u85m37eL1LVIuJ4lKZt7jtcjldxXu/s5FDkqbL+UVec3o5x+KhArn6gcYVUkU2WgfaAvUtQWxFAj01VNYS8XLezGNMhohwdMDhyJOLFrvajHRTU0O4yW44dLhqcyM1/HaC8N/nI7YHmwEpQRCyF4iDowCWKjXwQZAGD1jdBLAJAKQEAIZ4APwWQNAmAZscEP5DFny+zwdKNAvSJQk6N3vM1MkS/PTTG/G7M2O4NePC0koWBIiy2fOpO1FtpKo0usqQN90GFFUsJAFdvCJMbHqyq/2lR45mYwORcmyPp9HTxE0KQt6w6l4ztsfV2rzHGW29LoCWriTtKNTicQVbnI74SFG+4+FtLa9++8RM39625tGX5lXNV4sujRnlQKvN0Xt7Qxtys0F1WaPyY6JWJYA1pSdw+7UD1rF3J5TsaM5cyGVJRwZSxDob5CgWjb6Ug3UeN8iIGFI9EIxOSICUeLjRZgPgkgqAYQKoMRBoBgAZBX/mNwH85jdSsHwjA4KGCzpvtAA3Z4GlaQGEV0fw3MVlICATF/JA9EuE6V7nJCZfLZmGE5I60lG7t1Epl/jUxBuJic7tgToJKOn0IUEcO5DGneH2PNUgM6efio8mL/JLc8cKJUU0isQDT+z2zV5IKVsea4vO6TPg7h9vaps/uSxEbnYSkV6X1LyNa2pYHXR/9M2pw0jFhEZJhm216Qg5baIrEdXGpy6gwc/c5Ljl+/c5n/72X1lE3QSXzy2Z9iYX9qssqA0qoFaUMEMgvMPOwi99tweDs9K/jgW02QGQJQCCEGCLCP+qeReEt7mA10PAqijjwmgBpjM6SEwVwPF/GIViyoDreCeGIiRzmSnaMw2Icj0l1WbzRnVUyNcEjTAkrS7URm/0rG/C5RmR8W5gnD6/hdSwVn/h9XiBdRvI1+FCck2VpbSmo2o0G9v1F+uiChAdrJPWz/9uWm9c7/OUlqoo2O50nn92MZErZqi6NZynJshc+5YGTrNANI95++bWfpvZVqMvffOM4GVY+qUfv6XbBYKMfcFP1mYrxOnX5sCn/qkL7X8+DRsqMng3LwBw2yABji4BYCEBsEAATB0AlgJwWALuv2uCOx+5AL96VgQtvS5CpSU88noehoIuuBgvgxBgwMR0CTwQrkdXixo+Ii6UHdjh9lDhgq0VMBghJKVUzemgJ+LvJGi6k/bYdC6bz4hCYbacMg1phqGs5NJUUei/qZllgxCh/nubrHxRQNOH86nsZYGLDYacOtRtzZZ2UkAlj8xr2vWPD7YffPlicteenY3jx2aJcIvP6nOvQsPWy5A8r5iLM6Key/ImHQC0FDd1tyDT22+/BXSpHfDguXOwcQ7D95EITHsEwlUmBB/kAKA1ALwOgNM1AIdrAPgZAFcCEJwRwV0cDf/2YBZseiKKJ/eXMddlw/KCjNsCVvzEzh7zVydmgcfvMjdcG2KT1YJaltMCvywiSiN5L0dRhWnea2x3SL4FpGK3aQ1ssKVZQhPGh8uzjMuUKpIslHO8UlvQJFSOayY0SR0gjendV99dWqgV4od5JS2kWcJEC2sebB489MWp/H1/cUf9uz87VCylJb2MnO4mtwgrh8uobbVgoSwRsiXioUGWsKbiFYpdwMQx8TyxcGERhpcd8G2XCEyFhLBoQtiqQnCOB6Bsgt6sBLakNRDABIBJDQDdAHBMAb4gAfZZSPCdkxhUr5fxzk91m7NXljDpt5svDS/BNTYGUzt6DKrBMMJW1iSWCb2Ba1cam2jy4siC4b3WX3YVsdl8dxuaOJhaYuxMJPGRkOq5tS5YGpayHdfVo9AAR/p7OIj67mp0Ll3KoA2fjTVWl1Vp/PUMr2i6YFRMB+djiPnXeL3r77i+lz55+LX2DdHWvvaVQPdNM1cOzrKGxW+QFT/ZcauX3v/9Cyh5voC2t4agR4LQMUsS13+5F/7sravQNKwQ8BKAOQVCUYNgRAab7CSeYCD4iQbgHRDggAkgtBMADIkACjrw+Ri8w2vg5yIyjnEBE3a7MRt06yyhSFkfZ1JStayzLOZsTrMUWEYmZzOz55eRU7WU8lmhpvESN3R6odK/t8FiB7SRWxak8mhV69oVKZx/c5Y3JF2N9HsdyNBMFG72kUOvzVUG7miJBNZbGhcPF/MtG8PB8ffT4zRDRJxNtlC4M1gSFbmjqNRooEoOT8BRbl3J+umOGFEeS4L8FRn6ZJKoiCI+x0mwu2DC59ES0PtDAL+fAQBgABUMoZUAqxUAJ0gCK6JGIAXgn5oY3K5gELATEIoYYEBgoKvY/2CT+bV7t5gPvHIEu30Ws66Rh7Yer2aOCWJsUxPXtnUNNV28YJIWj5l5c7kmMYbUtLOV0iplrj7aPOOGpCWj4nLDJk+teLwwLSK9KhK6lWGoEE1SsLIolwh31EbOnUmaj3/5YX9iPI+Vsla57nvtfSYElVUP12/t+2y4JdQQkAgsNJGwaHZstNdljhllvkgWaiZWlJJsSIM8aXUhHkgKMVOo6jt6vZnfr7UXtOEIAmTV4AAAFc1JREFUMJkUxt9yYWxjTWiY5qBigks13UQIAq2CTV0xAKFh0AcAHtOwadQM0wxQJv677SY+NIvNPwzhoVY7LCR9RG6WMg3BRgVvQo4COwE8vayat+zS5t9MVEJ2lrXTTN5IidTAtWvV3Hi8YT5e0lZfG+NGfjonWUjKyQWtudI0P7E0xA+ZOlHQajqBon0Byyee2TXw3A9fMh0uDkZXu+pm3s8XCQ40UgxkkAvNnP/t9JKpUQLIctn0Fcka2eqwFebKgbGRwoyTYO3mUo3mHC65oGjyQ1+4k/3H0atmrc0F8KogRm9CEi7XIPWgDu/v6YTlFAESKQFqugGwijHAAGMTmBRE4PTuTrz5LmR6F0yMZ6cxeLoLwA2bgW+px9zLxY2DPiu0SiXT09arAzc0i2+dMSqnR7VdN2ym5r1ZhciorOooqiNHEqrgQJk1t9YzFz+8VKhgLduzpcGTOZaZ1xhKZu2MiEVCsVgZBRnQtJz/44TSd0cjs/GTXSt+9cDxg5UZhejaG3A5m1nXitU9zYZsRKQLqDi3vDxFtEnb1LiadNKc6aijI6WFAmXEdFviWEG/uSNq++EOk9ZUjaWCgDWVigm3+yBL9ID1+2dgWSFglUS4zWnHG+7pwLF9frDzLzbg9ntiQNm1jM06Db9ptYHVhgpC63tNHc/qxssjpmmZMOyNtHFztMn88URFD4ZUPTFR1NMZWnX5LGahKKtuXw3ri1hh7eHxdrfD5qawtvxRaW71nu60JaM4ux7ZTim+ktXdQGvlIS1tEJpuoWkT3fzsigEmQIqxrb6Wn/QduOBss0k60GvqVbJgiiAYn01KBlbr5iYSM5QNtTf2R22105RcgVWbq4cMG56aIBw1i61BG/3T+bhcPmpKhCNBi5NGFUIdOgoZ4trMvNG7eTdxkDyvKUWBEGdk7L42gCUvxJfZKQDMHAbIa24f6AayUgXvOi3mOjJtuBdrgPAFAeHoB3pJ1qnhWXNnztSfg6rmrQ9DJbWsMyFkNl3brJ/+wdxsJIBsfNGYnpormoTPnrdytEPOVPKAJo258ckcocNM4o+laUPkKs4IQyxfqmioOCfJHRvq601WQ4mz1QWbx2IG2+w+I4ddDuTwjw/Hr9qQzdJxe2DndQ9tRPNn4zUuALyolQqVzlRTsZUNlJ8i/D87kaxpsXqGXclbTcarkQSHvKxp21Y19ZYn2y0H3zoj7tp7LaFP6Ti0I6QxOyywJxzCHtMKKMKKC+Q8uDCqGNVExoi5OvEvLRK4sRI0XDdvwcqBt3Xss+rimFAllgrC5jU19mCmrjJSXEAOgVzW3Iqtex9DJ44pgskbVsLumPSQRkdWkHKKDTkK0LjsYEl64khxzBt1CWwzrpPGQKblAQeLbn9gLycwWWiPUo7SJTPb6q1jkkJGoiEjj43MlVdua9ml6oqXs1mlj346AhgW6fbNUhd/DpdK84q6drAl9O2TSwW5hyOtVt4jJWANpSFJLQvS3375Ou7qmSmsJjQ4xwhm6lwacvciGhEAR80grPKKGcER85R5HoRKMdMeqJnMOcWc5WaxW/QaPxofM68Zj+v+m7cYsASAHOcEeqPB+I2wtpFxSODr15g9je2WqatXqhc/X5Rkg5D8nnDNqvF1wADp5jY3VRsz5nbeuKWl2qItlD7KJ1df10kunqssxzZEqAcev9WCGu+2teYSeYYLWMDM27nM2r9uacx+IFSzaoGPxcK7rh6ev+ohvHHdpvT7eqw07aJ1Y9FDKKEl66duetL20K9+LZphJ0eGZCZ5gb7C2BiOxpr835rb7G/99pjW8okGNv26VCQ0BFGXSQhXFE13FcyAbS2gvQbOGxkcmY7pS3oCuzgHqORNjU2z5mIyYay4/Xbz3dVWPFCqmU5qQaXvCCLp1biqC5xGTOWl2yCEu999Ux9s3qxVqUq6bpPfmhnOXw42ejIs0Oyp4eJbsV6b97h1IVsbqfJIhPnR+STnCNHF0RMz1LlLl+woncyWB2/payLsqtK0zee+8NuppCQo9NoNvdT48Hw2tjayTchWcyu2tndCZGhAI/KVdNGzwu6vfPLM+5zOdCil04kSKOuEd9De4Olzwyea1FAhUKTtjvqqlM2Qpm4xW1d5WCmDAJglhY0PNFvOv3dW4yFQWW9Zb9vcAFwUwgpI6zysgFRCV3bcvglnRmf03EdD+ASktUFvo0E/NyHrDKFqBl1hdrfVcu8nxDv6O4wf/vKcErt2kMIaLgR3eDxVqLmDnUGpZKn6Lx8uXqBndRHlyXlV0Vmnky0kzlaU9ltDLG1SEvKF3SiTLCbAnENouTGg5Y5rYus1IUt6pGhAEdtqBSWz7/69/hKfI8bfzVQNRmkYGHBUnygpMhVcYRdmZ6W6OzbEDFJSPSu89L7T6eqZD9RhV2tALGiLfj+oMyu8YLBNFrM2XYLOJp1aPkfoNsIqWRqaER9PGlMjS2D1pl793ZcLepANm2pC1i6dn9VddlaL3bEFZ6dGhV+/mzc2RwEmZ7Q46EUidCsuqFVN9KclZY3VnXx/at5o7bCzudcWBHG2Oi/m5EVbyUza25zBvK6jjTd0ROMZPjFwTzs2GM2q4GrN5mVtaMXd9UR+UgBT5+fN0z+aM1ZuazWa3E1KYLWtbn5hOSmVNDyXmFoVT2TzFDQrd966srL3QArLIrAuLl8+wxatHgAdUnhvl+dTC+cFT/s6zrpZalaLSs2ZDFQLdIVRU1hkLZSZpmWEeFKTzTxQvZDQ47KKSSvhb7DqufllAGS1tnR0OYUGCrWu+/st5WzOMAqmnvxjttq4Lrp0ybBZNz/cwzgKiFHOZERrZx1Bbl5R9bh4Zm3FJby+qBVFBZ2FohSlXKb9mif3cWdeP8O7LNzc7EKap1SiMPT7CSV2q5vq7OlqLMelJWSSJklgwrD7ObNjIKY2B1uMWsIwk1ezmsdqRbxa9XiiDl4uGpPNDpZ/1CLuNl2AYuow3fbQbWtL1cUJXwtq/fwbc1cz2SgoqlMWtOwoSb6iVywjJnOeH6/rt4ZNSAvuDKZFU6/aGKsScdolot2kYs6o6N/gh6d+NSJ274iShl5lpEWP6dYtYkIvo0jILzWuWadViXF3TanKH04VhU6gg0CLS1x+Nz0HpYpVPI1z0kx+YctD3uqh8Vx70209ly68PZs1B6ucOCQOyyVVifR7NGs7LXbtjViWjvGV+FiyaG+iXKilO2RqqgGWclmTIglQFXgQ9HqwoIlGXitzfQMdlWMvXkx+48Ub/27zW1eW6NYgpxdMBRoUk3jh3BUfZ2u/52T15GQmz7t7qIApYawsQZFt1O34rG2SCCl1TjaQS8ZTLlXXcXgXIi1lGzKLZI0fNg3nQJ2ZnxAlj9fA/BKUbYodEKRqSFKF5JJ0VV+q6OnRKdSaXz1eVis4dsc648iSutxxKgt8EcZOdvurEBim81MdZO2Z8cr1vfbMazNForkvSJZOl7LOmDPZcHPA0ljfoE4cWxTKKUVhebvi6rRiW4RUUKTFAxhEgkfvewLMLk6Dyx+M48BtVCez5MnRBbcs92QHRNaS2vPC2Bh3T3su++GCJC2KMi9Zh0Ib3A2/72q2VJEBmQZiyU1xLWjWk2toCVuoVpZduDQ93OBrsRfkLOkD4arsUPXyVBXrNDIIyZXdfdPO6oc/frPcuyVAwUg9sSK6wqhwWo0/lZFR1ZnDms67ux2oNKadrzqzEZPHAE+nQOyhdcY3njtxYUMkpEgHCktEK6lLM2XNjCIJskypiyTAe0m+bA/aswalscvnC7nw9mh0cv/iol42NGs9wRUXeH35DC8hf6MDDB9eBEcPHAWmUwVWP0uUZ0FOAjwSiAJeEV2TXJpNmL2GWFVMxeq5zh+RGX2pa1dfx/dG0uyZmaWx2LawY+aPBXc1p11o3eRr1NyqfWZoKtX7SF1bOVsxH/rKXu7c25cMU0FTA59bGSoP52VEk+Twq5e06JYwlGQZn//2eEowl2B0VwCV8rxhc1s0pqTKoEQYNrdddLd6q3KyWhUtSE/8cSa14x/3BX//4Vh2jdNdsMXs2XxFGdey0gImoAUPV2dfXMgtPvaFR9pf+ua7Zzo2hi3IIReFea02fzplPva9+xpf+cahXK2saigzX/m3AWLVZcKWnT644h6fJbieZRwtLCpSca7pmqBj923RNnePo92s4Zqz0en6ix8fFZz3NFPJE6XhzEwl2FbXqFbKhem1t6yK7v/FqcOMHc2nxorBB+9/EP76h28IEbErjTtriFwUyUpaM5tIdzUbqTFyRSNqSZyioMY0+wZqfO0MFAWzGo7EJOIGu6l6maoZEXzpqfJ5h9NC+1o4Ij9XKno7HeTsTHZsttvq8Z6doaLddUL1csYpSfSoJcho/CM91sh6p4dHJXnTHSvzoweWqq07/BwhI/XSy4myaojyPf9tG4f+/QQ1GUQwebUEIsEotkQBzbqRhbXRRKUgGg0/W8ot/GwuYS6rucVbewbHGaVUmOPllra69ZjF+b7bWkKJeAamLhaL9Te5TAfyd/oYf3p8ehZ4t3CUq4m1Th+bqSJkYYwSXVyIF80mb9OyYauqXV1RO8EgMy7MAdbRpMkTRLY0l1eXf54/z3gIWn7JPGovuvR5dbnEtvvsLQ/HKqc/efJS1y11MVeHC3wIq3Ndrxfm7TF3FQliyRg146/mknjod6NZhqPTb37+rMEvKTLUgRZe5fas3tJiWZzN8ompvIz+nVvsfw7QAyBnMB56b14d+VlCGj2RqlUnVPl9QChnojbznNdK/PHFc+X2LUE2f0UayywWF7gga7/wwtxFQJp48+Nrwdn9l7Nt9TE3mbfmMyAuSqcMopwQllbe1Imyx6onV32spYVPZ0dqaW2YayPpoXcXkhaKyEhZvMhYdQh1M0ljboFsJOzZ+UyJ6MWRUqxAd9/ZqVP5yujcO4v2G350Tey1L3w0fdc3d3CJ6QSYavTM/VKS+fdmq+riZxq0+IG8RPtIMeRx41pO03d8daUzO8HLqYuVKq6T9fX3raRnTi1q8P9kmwMAQNM0oZ2zAwggYGmGoEwSueoZj6fZ6vF2Mu0HvnNx6GPP7bn+wguT56gwbOrZ0Uz/8837x3Z/e/XW+d9XxnybLA1sAIS6zEEheDPd/rvvvQub/FF+/MJy3hG0YMqFrZAkYdAIQznMM/yFyqzol1aIcSnV1B9S5i7mpnZ+/pqtU0ujyczp2gWKghZqLb2GM4jskW9PXlz3QIdn+tSyavdZalpGSatVTbvh7zbUv/vkmfnQajeuKRKCToiCYSdZnlUUkRf1rn11zNyHOTU+kyY/8ZudBPoPxf8vhioIIahVRdwR6wC6YWKGpYFWMfQ1t3QxuXI2+Ll/+Pi1T/X88pUVd9cH5VlzduLcnMtb58pBDaJVe7vaMvF0MXZNxDg7dL74/jNnS42rglfpdqAH2zirq1w/B9wCzp7jRzo+Hoouz6aIQr56MbI2WOy7q4O58s7iGYommIXlOOre026Lv1Oc8myztovZasnrspvOiANiIMoESfBchC7jCInYKquo3prVbw9ppA2TG+4aoFcMtDgXh9KV2O4gUkQNzv0pq0UGHeQn/nEvO/7qogn/M7aSK+NXwae/+imgaTVUVososI5pKp6pqZMHMtTgg21a4nwBUH4k+jtslqatvobCZDXY17giMFWbpDPHahdUSa8yDG06mtnOru3tzIVDl8q9K7r760LR5YXCAjj5rcvzkQ0ekWuz8XrF9MRThQpnWFy+Lqtr/kDxCtGgtBRPqhPe6x3OzXf2tF89PD2hCprFXs/iwTWD4Vd/s/+kE7l0o6DRtJUmN9670rmYXMpXRnRDrAnY7ufg8mhOrUxLRteDEWpd73riozfO6lWhZqL/DIAqyYP9J/YDYJAAUTqRn66VTRXKznqLVFwQFNNmaNf9Vf9GexvSL/4mEU+cqSzR7ZpNrZjTxVmx4KK8YrUgKhRD5pLL8Wqw2edID+fOTxbGPMkLRdPpdQwVEjwvxGW7u89BFo6lk5/44N5bD799atkucUmpYGSu+ZuVrQvvpuYOfGtouX1To0FaCKKWU4rx1GLGY3MyS8dyYuvNYXbq1WSt4XaX9a2PXRAtUUjARatq1qBp9dNE9931NB8XjYX0PMGXBAwM/J8DMHJ2BIAiAIpLAqKs4qooYwqTuH1Toy92szfibbFBRZewJpvSjn2rvbBBdhWnpHR+UlCspE3d/dT6QdFatseP5WbViskXUmW5Mq0mjDJIPvi1m3NHXj2v99/XEol1tprH/uH8sq/PA9+78/gpX8S+yDSTLmRifvLN5cznvv8Qi9vKMDWRI2YOZjPhHiddK9dgsNoumqRKMh6EsQTN0TeXpL/83QPU6NFJxQgq5Kefvt32xgt/0qxOSm/eFgIjLy8Z2WxGf+EnP4Pov+KwMnMmIHwE1HUTrLqnngysZiDGpinmVDE1wpdzY1Xx7DujtDfsrOWTFe2OR3fak7ll5YNnT6dCrT5OqPAln9dr8leV0va/73PMHUlWPtp/ydpuG1C7r6mnPSG7T7CXcSgQFDSHBikCydseWQ+TiaRGMQicOnvGoi0hBauGePfXb7ZXqSK6/577XVemz5GKqSsGUiEbplFDQ9T86ORxuPfxG2HY6kNfv+UXtc2f6wILB4rGzPEU7ruvAXOmB05mLpHwvwLgz03SxBh43RxRHBOh3c+iqlgjbvjS6uZDz1xJrLyx3mnvIb2eMAeOPzdqeu3+fLjVpUALhF+58UvRby08rYJpC5o+nCl+7dmHA//94z9b+uQze9Z/7b5fLERIf2HFo3VkMVmxWexMfv6DnJSYyIPOnXW0WlQVR8gC7V1WS3FEVKZHFomm9iitygoRWeMxsEoYyEaiJ7/4EPGZ656qXftYH/neD89o/Zs6tBIuQVa24uhWF3YTQfjuPx7C3TtiwG11Afj/xW1J91CQJSlAQQQ//pMdzFvfOA3mjqVRx/YIteMvNnbRWcNx5PDQKUQhggAkLeRrBNYVc+KjvKXBH1DXfaJbmh2dhpPHCty2J7uMC9+bV9b9fQunFAw18U6pEFjlQEwdQSePlKQdT6+hfrDxDfWxX9/tKDNp6tIzC0XRWyE+/9zHnM898jIfWxFD1k6NVCsYy2VFXThbJKNdLkVXgUmyAFw5MIdfvPRd6nbrk0p9hwfU7XYTt+7bjQ+fOoTLk/J/HcCfVWCjGUDkEOC6yYCVoIttg83WyUvzmtNrI8/9egb23FZnZCcE1RPmoGbUqO/87muxz+75q+X6UIMS3uoKnf/72UT7IwFX4ZgkeTtsenairN/+lRvIsblRwhCxufxqVe95LGo9+OPT6kPfu9196eCEFO60mxVZhD6HX/zD1z+kV+yK6Y42CmENmdAEwIJsRr6Uh46wxWCwBahIAp6wC7z1jZPmfV/ZjSc+WMAqkvDknxKAsVrBzn/sBv8DriBtCtDSAvgAAAAASUVORK5CYII=");

							this.regionCityMoveInfoAddon.grid.add(this.regionCityMoveInfoAddon.blockedTunnelImage, {
								row : 0,
								column : 0,
								rowSpan : 2
							});
							this.regionCityMoveInfoAddon.grid.add(this.regionCityMoveInfoAddon.offenseLevelLabel, {
								row : 0,
								column : 1
							});
							this.regionCityMoveInfoAddon.grid.add(this.regionCityMoveInfoAddon.offenseLevelValue, {
								row : 0,
								column : 2
							});
							this.regionCityMoveInfoAddon.grid.add(this.regionCityMoveInfoAddon.requiredOffenseLevelLabel, {
								row : 1,
								column : 1
							});
							this.regionCityMoveInfoAddon.grid.add(this.regionCityMoveInfoAddon.requiredOffenseLevelValue, {
								row : 1,
								column : 2
							});

						} catch (e) {
							console.log(e);
						}
					},

					baseMoveToolActivate : function () {
						try {
							var announcement = ClientLib.Data.MainData.GetInstance().get_Alliance().get_Announcement();
							var re = /\[tir\][0-9]\[\/tir\]/;
							var tir = announcement.match(re);
							if (tir != null) {
								tir = tir.toString();
								this.tunnelInfluenceRange = parseInt(tir.substring(tir.indexOf("]") + 1, tir.lastIndexOf("[")));
							} else {
								this.tunnelInfluenceRange = 10;
							}
							this.getRegionZoomFactorAndSetMarkerSize();
							phe.cnc.Util.attachNetEvent(this._VisMain.get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.repositionMarkers);
							phe.cnc.Util.attachNetEvent(this._VisMain.get_Region(), "ZoomFactorChange", ClientLib.Vis.ZoomFactorChange, this, this.resizeMarkers);
						} catch (e) {
							console.log(e);
						}
					},

					baseMoveToolDeactivate : function () {
						try {
							phe.cnc.Util.detachNetEvent(this._VisMain.get_Region(), "PositionChange", ClientLib.Vis.PositionChange, this, this.repositionMarkers);
							phe.cnc.Util.detachNetEvent(this._VisMain.get_Region(), "ZoomFactorChange", ClientLib.Vis.ZoomFactorChange, this, this.resizeMarkers);
							this.removeTunnelMarkers()
						} catch (e) {
							console.log(e);
						}
					},

					baseMoveToolCellChange : function (startX, startY) {
						try {
							if (this.regionCityMoveInfoAddonExists == true) {
								webfrontend.gui.region.RegionCityMoveInfo.getInstance().remove(this.regionCityMoveInfoAddon.grid);
								this.regionCityMoveInfoAddonExists = false;
							}

							this.removeTunnelMarkers();

								this.findTunnels(startX, startY);
						} catch (e) {
							console.log(e);
						}
					},

					findTunnels : function (startX, startY) {
						try {
							var region = this._VisMain.get_Region();
							var scanDistance = 11;
							for (var x = startX - (scanDistance); x < (startX + scanDistance); x++) {
								for (var y = startY - scanDistance; y < (startY + scanDistance); y++) {
									var visObject = region.GetObjectFromPosition(x * region.get_GridWidth(), y * region.get_GridHeight());
									if (visObject != null) {
                                        switch (visObject.get_VisObjectType()) {
                                        	case ClientLib.Vis.VisObject.EObjectType.RegionCityType:							
                                          		var tunnelX = visObject.get_RawX();
												var tunnelY = visObject.get_RawY();
												var distanceToTunnel = ClientLib.Base.Util.CalculateDistance(startX, startY, tunnelX, tunnelY);
												if (distanceToTunnel <= this.tunnelInfluenceRange) {
													this.addTunnelMarker(tunnelX, tunnelY, "#ff3600");
												}
                                                break;
                                            case ClientLib.Vis.VisObject.EObjectType.RegionNPCBase:							
                                          		var tunnelX = visObject.get_RawX();
												var tunnelY = visObject.get_RawY();
												var distanceToTunnel = ClientLib.Base.Util.CalculateDistance(startX, startY, tunnelX, tunnelY);
												if (distanceToTunnel <= this.tunnelInfluenceRange) {
													this.addTunnelMarker(tunnelX, tunnelY, "#06ff00");
												}
                                                break;
                                        }
									}
								}
							}
							if (this.regionCityMoveInfoAddonExists == true) {
								this.regionCityMoveInfoAddon.requiredOffenseLevelValue.setValue(this.requiredOffenseLevel);
								webfrontend.gui.region.RegionCityMoveInfo.getInstance().add(this.regionCityMoveInfoAddon.grid);
							}
						} catch (e) {
							console.log(e);
						}
					},

					screenPosFromWorldPosX : function (x) {
						try {
							return this._VisMain.ScreenPosFromWorldPosX(x * this.gridWidth);
						} catch (e) {
							console.log(e);
						}
					},

					screenPosFromWorldPosY : function (y) {
						try {
							return this._VisMain.ScreenPosFromWorldPosY(y * this.gridHeight);
						} catch (e) {
							console.log(e);
						}
					},

					addTunnelMarker : function (tunnelX, tunnelY, color) {
						try {
							var tunnelMarker = new qx.ui.container.Composite(new qx.ui.layout.HBox(5)).set({
									decorator : new qx.ui.decoration.Single(1, "solid", "#000000").set({
										backgroundColor : color
									}),
									width : this.tunnelMarkerWidth,
									height : this.tunnelMarkerHeight,
									opacity : 0.5
								});

							this._App.getDesktop().addAfter(tunnelMarker, this._App.getBackgroundArea(), {
								left : this.screenPosFromWorldPosX(tunnelX),
								top : this.screenPosFromWorldPosY(tunnelY)
							});
							this.tunnelMarkerList.push({
								element : tunnelMarker,
								x : tunnelX,
								y : tunnelY
							});
						} catch (e) {
							console.log(e);
						}
					},

					removeTunnelMarkers : function () {
						try {
							if (this.tunnelMarkerList.length > 0) {
								for (var i = 0; i < this.tunnelMarkerList.length; i++) {
									this._App.getDesktop().remove(this.tunnelMarkerList[i].element);
								}
								this.tunnelMarkerList = [];
							}
						} catch (e) {
							console.log(e);
						}
					},

					getRegionZoomFactorAndSetMarkerSize : function () {
						try {
							this.gridWidth = this._VisMain.get_Region().get_GridWidth();
							this.gridHeight = this._VisMain.get_Region().get_GridHeight();
							this.regionZoomFactor = this._VisMain.get_Region().get_ZoomFactor();
							this.tunnelMarkerWidth = this.regionZoomFactor * this.gridWidth;
							this.tunnelMarkerHeight = this.tunnelMarkerWidth * 0.59;
						} catch (e) {
							console.log(e);
						}
					},

					repositionMarkers : function () {
						try {
							for (var i = 0; i < this.tunnelMarkerList.length; i++) {
								this.tunnelMarkerList[i].element.setDomLeft(this.screenPosFromWorldPosX(this.tunnelMarkerList[i].x));
								this.tunnelMarkerList[i].element.setDomTop(this.screenPosFromWorldPosY(this.tunnelMarkerList[i].y));
							}
						} catch (e) {
							console.log(e);
						}
					},

					resizeMarkers : function () {
						try {
							this.getRegionZoomFactorAndSetMarkerSize();
							for (var i = 0; i < this.tunnelMarkerList.length; i++) {
								this.tunnelMarkerList[i].element.setWidth(this.tunnelMarkerWidth);
								this.tunnelMarkerList[i].element.setHeight(this.tunnelMarkerHeight);
							}
						} catch (e) {
							console.log(e);
						}
					}
				}
			});
		};

		function TATI_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined' && qx.core.Init.getApplication() && ClientLib.Data.MainData.GetInstance().get_Player().get_Faction() !== null) {
					CreateTATI();
					window.TATI.getInstance().initialize();
				} else {
					window.setTimeout(TATI_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("TATI_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(TATI_checkIfLoaded, 1000);
		}
	}

	try {
		var TATI = document.createElement("script");
		TATI.innerHTML = "(" + TATI_main.toString() + ")();";
		TATI.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(TATI);
		}
	} catch (e) {
		console.log("TATI: init error: ", e);
	}
})();