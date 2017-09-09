		var trs= document.getElementsByTagName('tr');
		var start=document.getElementById("start");
		var scr=document.getElementById('score');
		var pau=document.getElementById('pau');
		var ove=document.getElementById('ove');
		var i=0,stop=2;//stop标记量节流函数，排他操作
		var timer;
		var arr=[],b=0,x=0,y=0,index=0,score=0;
		var tds=[];//定义数组tds[]装载所有td对象
		while(i<trs.length){
			tds[i]=trs[i].getElementsByTagName('td');
			i++;
		}//tds[y][x]数组的下标作为坐标，为后续改变对象变换对象同时改变样式实现移动效果；
function newgame(){
	arr=[],b=0,x=0,y=0,index=0,score=0;
	arr.push(tds[0][0]);		
	do{
		b=tds[parseInt(Math.random()*20)][parseInt(Math.random()*30)];
		b.className="random";
	}while(b==tds[0][0]);//初始化游戏，蛇身清零，随机位置出现食物		
}		
function rand(){
			var i=parseInt(Math.random()*20);
			var j=parseInt(Math.random()*30);
			if(arr.indexOf(tds[i][j])==-1){
				b.className="";
				b=tds[i][j];
				b.className="random";
			}else{
				rand();
			}
		}
start.onclick=function(){//开始按钮初始化游戏，
			if(stop==2){
				ove.style.display="none";
				var i=0;
				while(i<arr.length){
					arr[i].className="";
					i++;
				}
				b.className="";
				newgame();
				arr[0].className="current";
				stop=0;
				index=39;
			       clearInterval(timer);
				       	you();
				start.blur();
			}
		}
function game(){
			if(arr.indexOf(tds[y][x])==-1){//表示未
			    if(b==tds[y][x]){//吃到食物时
			    	score+=10;
			    	scr.innerHTML=score;
			       	rand();
			       	arr.push(tds[y][x]);//蛇身长度增加，
			       	tds[y][x].className="big";//头部变大变红
			    }
			    else{
			       	arr.shift().className="";
			       	arr.push(tds[y][x]);
			       	tds[y][x].className="current";
			       	if(arr[arr.length-2]!=undefined&&arr[arr.length-2].className=="big"){
			       		arr[arr.length-2].className="current";
			       	}
			    }
			}
			else over();
		}//在画布内游戏运行方式及死亡判定
function you(){
	timer=setInterval(function(){
		x++;
		if(x<30){
			game();
		}
		else over();
	},200);
}
function xia(){
	timer=setInterval(function(){
		y++;
		if(y<20){
			game();
		}
		else over();
	},200);
}
function zuo(){
	timer=setInterval(function(){
		x--;
		if(x>=0){
			game();
		}
		else over();
	},200);
}
function shang(){
	timer=setInterval(function(){
		y--;
		if(y>=0){
			game();
		}
		else over();
	},200);
}
document.onkeydown=function(event){ 	 
			switch(event.keyCode){
	       	 	case 39:
	       	 		if(index!=37&&index!=39&&stop==0){
			       	 	index=39;
			       	 	clearInterval(timer);
			       	 	x++;
				       	if(x<30){
				       	 	game();
				       	}
				       	stop==0&&you();
		       	 }
		       	break;
		       	case 40:
		       	 	if(index!=38&&index!=40&&stop==0){
			       	 	index=40;
			       	 	clearInterval(timer);
			       	 	y++;
				       	if(y<20){
				       	 	game();
				       	}
				     stop==0&&xia();
		    	}
		    	break;
		       	case 37:
		       	 	if(index!=39&&index!=37&&stop==0){
			       	 	index=37;
			       	 	clearInterval(timer);
			       	 	x--;
				       	if(x>=0){
				       	 	game();
				       	}
				       stop==0&&zuo();
		    	}
		    	break;
		       	case 38:
		       	 	if(index!=40&&index!=38&&stop==0){
			       	 	index=38;
			       	 	clearInterval(timer);
			       	 	y--;
				       	if(y>=0){
				       	 	game();
				       	}
				    	stop==0&&shang(); 		
		    		}
		    	break;
		    	case 32://空格键暂停和开始功能
		    		if(stop==0){
		    			stop=1;
			   			console.log("zan");
			   			clearInterval(timer);
			   			pau.style.display="block";
		   			}
		   			else if(stop==1){
		   				pau.style.display="none";
		   				switch(index){
		   					case 37:clearInterval(timer);zuo();stop=0;
		   					break;
		   					case 38:clearInterval(timer);shang();stop=0;
		   					break;
		   					case 39:clearInterval(timer);you();stop=0;
		   					break;
		   					case 40:clearInterval(timer);xia();stop=0;
		   				}
		   			}
		   	}
}//键盘触发事件，上下左右和暂停键		
function over(){
			ove.style.display="block";
		    clearInterval(timer);
		    stop=2;
		    start.blur();
		}//over函数弹出结束窗口，停止定时器，stop标记量为改为2（除开始键外，其他键无效）		

