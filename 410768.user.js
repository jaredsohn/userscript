// ==UserScript==
// @name       2048 auto play
// @version    0.1
// @match      http://gabrielecirulli.github.io/2048/
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @copyright  2014, Garzon
// ==/UserScript==



function wrapper() {

	if(typeof window.myPlugin !== 'function') window.myPlugin = function() {};

	window.myPlugin.isAutoMode=false;
	var desription=document.getElementsByClassName("game-explanation")[0];
	desription.innerHTML+="<input type='button' onclick='window.myPlugin.isAutoMode=!window.myPlugin.isAutoMode;' value='Auto Play/Pause'></input><br />";
	window.requestAnimationFrame(function () {window.manager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager);});
	

	window.myPlugin.emptyMap=function(){
		return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	}

	window.myPlugin.transpose=function(orimap,aimmap){
		var j,k;
		for(j=0;j<=3;j++){
			for(k=0;k<=3;k++){
				aimmap[k][j]=orimap[j][k];
			}
		}
	}

	window.myPlugin.countTiles=function(rowmap){
		var j,k,res=0;
		for(j=0;j<=3;j++){
			for(k=0;k<=3;k++){
				if(rowmap[j][k]!=0) res++;
			}
		}
		return res;
	}

	window.myPlugin.isFixed=function(map1,map2){
		var j,k;
		for(j=0;j<=3;j++){
			for(k=0;k<=3;k++){
				if(map1[j][k]!=map2[j][k])
					return false;
			}
		}
		return true;
	}

	window.myPlugin.debugOutput=function(extraInfo,rowmap){
		var debugstr,j,k;
		debugstr=extraInfo+": \n";
		for(j=0;j<=3;j++){
			for(k=0;k<=3;k++){
				debugstr=debugstr+rowmap[j][k]+" ";
			}
			debugstr+="\n";
		}
		console.log(debugstr);
	}

	window.myPlugin.getStatus=function(){
		var tileArray=document.getElementsByClassName("tile");
		var rowmap,nowcount=0;
		rowmap=window.myPlugin.emptyMap();
		for(i=0;i<tileArray.length;i++){
			var cpos=tileArray[i].className.split(" ")[2].split("-");
			rowmap[Number(cpos[3])-1][Number(cpos[2])-1]=Number(tileArray[i].children[0].innerHTML);
			nowcount++;
		}
		return rowmap;
	}

	window.myPlugin.nextStatus=function(op,rowmap){
		var i=op,pnmap,apnmap,res,b,e,d,nextrowmap,nextcolmap,pmap,colmap,zz,j,k;
		colmap=window.myPlugin.emptyMap();
		window.myPlugin.transpose(rowmap,colmap);
		nextrowmap=window.myPlugin.emptyMap();
		nextcolmap=window.myPlugin.emptyMap();
		b=0; e=3; pmap=rowmap; pnmap=nextrowmap; apnmap=nextcolmap; res=1;
		if(i==0){ d=1;   pmap=colmap; pnmap=nextcolmap; apnmap=nextrowmap; }  // up
		if(i==1){ d=-1; b=3; e=0; }  // right
		if(i==2){ d=-1; b=3; e=0;   pmap=colmap; pnmap=nextcolmap; apnmap=nextrowmap; }  // down
		if(i==3){ d=1;  }  // left
		for(j=0;j<=3;j++){
			k=b;
			while(d*k<=e){
				if(pmap[j][k]!=0){
					zz=k+d;
					while((zz>=0)&&(zz<4)&&(pmap[j][zz]==0)) zz=zz+d;   // find next tile
					if((zz>=0)&&(zz<4)){
						if(pmap[j][k]==pmap[j][zz]){    // merge
							pnmap[j][zz]=pmap[j][zz]*2;
							k=zz;        // jump , ignore the tile @ zz
						}else{           // place
							pnmap[j][zz-d]=pmap[j][k];
							k=zz-d;      // deal with next tile @ zz
						}
					}else{  // move
						zz-=d;
						pnmap[j][zz]=pmap[j][k];
						break;  // no more tiles
					}
				}
				k+=d;
			}
		}
		// fall down
		for(j=0;j<=3;j++){
			for(k=b;d*k<=e;k+=d){
				if(pnmap[j][k]!=0){
					zz=k-d;
					while((zz>=0)&&(zz<4)&&(pnmap[j][zz]==0)) zz=zz-d;  // find the ground
					zz=zz+d;  // pile up
					pnmap[j][zz]=pnmap[j][k];  // place
					if(k!=zz)
						pnmap[j][k]=0;   // clean if moved
				}
			}
		}
		// copy to another map
		window.myPlugin.transpose(pnmap,apnmap);
		return nextrowmap;
	}

	window.myPlugin.evalCost=function(rowmap){
		var res=0,k,j;
		var res1=window.myPlugin.countTiles(rowmap);
		
		if(res1==16){ 
			var flag=false;
			for(j=0;j<=3;j++){
				if(!window.myPlugin.isFixed(rowmap,window.myPlugin.nextStatus(j,rowmap))){
					flag=true;
					break;
				}
			}
			if(!flag)
				return 1e69;
		}
		
		res1=Math.round(Math.pow(2,res1+8));
		var map=[[14,15,16,17],
				[6,7,13,16],
				[5,6,7,15],
				[3,5,6,14]];

		for(j=0;j<=3;j++)
			for(k=0;k<=3;k++)
				if(rowmap[j][k]!=0){
					res-=Math.pow(2,map[j][k])*rowmap[j][k];
				}
		return res+res1;
	}

	window.myPlugin.dfs=function(depth,rowmap){
		if(depth==0) return [-1,window.myPlugin.evalCost(rowmap)];
		var res,planDir=[[Math.floor(Math.random()*4),1e20]],i,ret,j,k,count=window.myPlugin.countTiles(rowmap),flag,minTiles=6,tmpcount,nextrowmap;
		for(i=0;i<4;i++){
			flag=false; tmpcount=0;
			res=0;
			nextrowmap=window.myPlugin.nextStatus(i,rowmap);
			if(window.myPlugin.isFixed(rowmap,nextrowmap)) continue;
			for(j=0;j<4;j++){
				for(k=0;k<4;k++)
					if(nextrowmap[j][k]==0){
						if(count>minTiles) nextrowmap[j][k]=2;
						flag=true;
						tmpcount++;
						ret=window.myPlugin.dfs(depth-1,nextrowmap);
						res+=ret[1];
						//res=Math.max(res,ret[1]);
						nextrowmap[j][k]=0;
						if(!(count>minTiles)) break;
						nextrowmap[j][k]=4;
						res-=ret[1]*0.1;
						ret=window.myPlugin.dfs(depth-1,nextrowmap);
						res+=ret[1]*0.1;
						//res=Math.max(ret[1],res);
						nextrowmap[j][k]=0;
					}
				if(flag)
					if(!(count>minTiles)) break;
			}
			if(!flag){
				tmpcount++;
				ret=window.myPlugin.dfs(depth-1,nextrowmap);
				res=ret[1];
			}
			if(tmpcount==0) continue;
			res=res/tmpcount;
			var comp=planDir[0][1]-res;
			//if(window.myPlugin.isFixed(rowmap,window.myPlugin.nextStatus(i,rowmap))) comp=-1;  // or stuck
			if(comp>0){
				planDir=[[i,res]];
			}else{
				if(comp==0){
					planDir=planDir.concat([[i,res]]);
				}
			}
		}
		i=0;
		//i=Math.floor(Math.random()*planDir.length);
		return planDir[i];
	}

	window.myPlugin.step=function(){
		var rowmap,ret,foreseetimes;
		rowmap=window.myPlugin.getStatus();
		//console.log(rowmap);

		ret=window.myPlugin.dfs(3,rowmap);
 		manager.move(ret[0]);
	}
	
	window.myPlugin.solve=function(){
		if(!window.myPlugin.isAutoMode) return;
		window.myPlugin.step();
	};

	desription.innerHTML+="<input type='button' onclick='window.myPlugin.step()' value='Step By Step'></input><br />";

	window.setInterval("window.myPlugin.solve()",100);

};

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
