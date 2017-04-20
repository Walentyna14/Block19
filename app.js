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
//VARIABLES
var level = 1;
var time = 1000;
var position;

//FUNCTIONS

var randomNumber = function(min , max){
	return (min + Math.floor(Math.random() * max));
};

var documentSize = function(){
	height = $( document ).height();
	width = $( document ).width();
}

var run = function(){
	documentSize();
	var marginX = 0.1*width;
	var x = randomNumber(marginX,0.7*width-130);
	var marginY = 0.1*height;
	var y = randomNumber(marginY,0.7*height-135);
	$('#item').animate({"left": x,"top": y});
}
var writeLevel = function(){
	$("#current_level").text(level);
};

var levelUp = function(event) {
	event.stopPropagation();

	++level;
	if (level==16){
		catchItem();
	}else{
		writeLevel();
		clearInterval(position);
		position = setInterval(run, time);
		time-=50;
		sec= sec-2;
		
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
	sec = 60;
	min="00";
	position = setInterval(run, time);
	writeLevel();
	setInterval(timer, 1000);
}

var catchItem = function (){
	$("#game").hide();
	$("#game_over").show();
	$("#lose").hide();
}

var notCatch = function (){
	$("#game").hide();
	$("#game_over").show();
	$("#win").hide();
}

var timer= function (){
	sec--;
	if (sec<10) 
	{
		sec = "0"+sec;
	}
	if (sec==0 && min==0) 
	{
		notCatch();
	}
	$("#timer").text(min+":"+sec);
}