//VARIABLES
var position, timerStart, time, nowTime, gameTimeMili, level = 0, sec;

var main = function(){
	gameSize();
	$("#game").hide();
	$("#game_over").hide();
	$( window ).resize(gameSize);
	$("#item").click(levelUp);
	$("#game").click(notCatch);
	$('button').click(startGame);
	
}//End MAIN
$(document).ready(main);
//FUNCTIONS

var realTime = function(){
	nowTime = Math.floor(Date.now() / 1000);
	time = gameTime - nowTime;
};

var realTimeTimer = function(){
	realTime();
	if(time>0){
		sec=time-1;
		if (sec<10) 
			sec = "0"+sec;
		if (sec==0) 
			notCatch();
		min="00";
		$("#timer").text(min+":"+sec);
	}
};

var timeRun = function(){
	var d = new Date();
	nowTimeMili = Math.floor(d.getUTCMilliseconds() / 100)*100+100;
	if(nowTimeMili ==(1000-level*100)&&sec!=0){
		run();
	}
};

var randomNumber = function(min , max){
	return (min + Math.floor(Math.random() * max));
};

var documentSize = function(){
	height = $( document ).height();
	width = $( document ).width();
	marginX = 0.1*width;
	marginY = 0.1*height;
}

var run = function(){
	documentSize();
	var x = randomNumber(marginX,0.7*width-130);
	var y = randomNumber(marginY,0.7*height-135);
	$('#item').animate({"left": x,"top": y});
}
var writeLevel = function(){
	$("#current_level").text(level+1);
};

var levelUp = function(event) {
	event.stopPropagation();
	++level;
	if (level==4){
		catchItem();
	}else{
		writeLevel();
		clearInterval(position);
		position = setInterval(timeRun, 100);
	}
};

var gameSize = function() {
	documentSize();
	$("#game_board").css("height", 0.8*height);
	$("#game_board").css("width", 0.8*width);
	run();
}
var startGame = function(){
	$("#main").hide();
	$("#game_over").hide();
	$("#game").show();
	gameTime = Math.floor(Date.now() / 1000)+60;
	clearInterval(position);
	position = setInterval(timeRun, 100);
	writeLevel();
	clearInterval(timerStart);
	timerStart = setInterval(realTimeTimer, 500);
}
var gameOver = function(){
	$("#game").hide();
	$("#game_over").show();
};
var catchItem = function (){
	gameOver();
	$("#lose").hide();
}

var notCatch = function (){
	gameOver();
	$("#win").hide();
}
