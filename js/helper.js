/*global single_progressbar,double_left_progressbar,double_right_progressbar*/
var curser = 1; var side = "left";
var totalsec,leftsec,totalsec_pros,totalsec_cons,leftsec_pros,leftsec_cons,t;

totalsec = 180; totalsec_cons = 180; totalsec_pros = 180; 
leftsec = 180; leftsec_cons = 180; leftsec_pros = 180;

function gogogo(){
	if(curser == 15){
		alert('end');
	}
	else{
	var a,b
	a = "step"+curser;
	b = "step"+(curser+1);
	next(a,b);
	curser += 1;
}}

//goto a single section
function goto(nextone){
	var a = "step"+curser;
	curser = nextone.substr(4-nextone.length)/1;
	API.close();
	next(a,nextone);
}


//this is the onclick function of start a single time count
function single(){
	document.getElementById('btn-middle').blur();
	document.getElementById('btn-middle').innerHTML = "<i class='fa fa-pause fa-2x' style='font-size: 1.4em;'></i>";
	$('#btn-middle').attr("onclick","pause('single');");
	t = window.self.setInterval("single_time()",1000);
}

function single_time(){
	if(leftsec>0){
		document.getElementById('single-word').innerHTML = convert(leftsec);
		document.getElementById('single-word').className = "mega shine";
		leftsec = leftsec - 1;
		if(leftsec == 29){
			audio1();
		}
		if(leftsec == 4){
			audio3();
		}
		single_progressbar.animate(leftsec/totalsec);
		console.log("left second is :" + leftsec);
	}
	else{
		audio2();
		document.getElementById('single-word').innerHTML = "0 : 00";
		document.getElementById('single-word').className = "mega";
		single_progressbar.animate(0);
		clearInterval(t);
	}
}

//this is the onclick function of start a double time count
function double(){
	document.getElementById('btn-middle').blur();
	document.getElementById('btn-middle').innerHTML = "<i class='fa fa-pause fa-2x' style='font-size: 1.4em;'></i>";
	$('#btn-middle').attr("onclick","pause('double');");
	t = window.self.setInterval("double_time()",1000);
}

function double_time(){
	if(leftsec_pros>0.1 && leftsec_cons>0.1){
		if(side=="left"){
			leftsec_pros = leftsec_pros - 1;
			if(leftsec_pros == 30){
				audio1();
			}
			if(leftsec_pros == 5){
			audio3();
			}
			document.getElementById('double-left-word').innerHTML = convert(leftsec_pros);
			document.getElementById('double-left-word').className = "mega shine";
			double_left_progressbar.animate(leftsec_pros/totalsec_pros);
		}
		if(side=="right"){
			leftsec_cons = leftsec_cons - 1;
			if(leftsec_cons == 30){
				audio1();
			}
			if(leftsec_cons == 5){
			audio3();
			}
			document.getElementById('double-right-word').innerHTML = convert(leftsec_cons);
			document.getElementById('double-right-word').className = "mega shine";
			double_right_progressbar.animate(leftsec_cons/totalsec_cons);
		}
	}
	if(leftsec_pros<0.1 && leftsec_cons>0.1){
		if (leftsec_pros == 0){
			audio2();
		}
		leftsec_pros = 0.01;
		side=="right";
		leftsec_cons = leftsec_cons - 1;
		if(leftsec_cons == 30){
				audio1();
			}
			if(leftsec_cons == 5){
			audio3();
		}
		document.getElementById('double-left-word').innerHTML = "0 : 00";
		document.getElementById('double-left-word').className = "mega";
		double_left_progressbar.animate(0);
		document.getElementById('double-right-word').innerHTML = convert(leftsec_cons);
		document.getElementById('double-right-word').className = "mega shine";
		double_right_progressbar.animate(leftsec_cons/totalsec_cons);
	}
	if(leftsec_pros>0.1 && leftsec_cons<0.1){
		if(leftsec_cons==0){
			audio2();
		}
		leftsec_cons = 0.01;
		side=="left";
		leftsec_pros = leftsec_pros - 1;
		if(leftsec_pros == 30){
				audio1();
			}
			if(leftsec_pros == 5){
			audio3();
		}
		document.getElementById('double-right-word').innerHTML = "0 : 00";
		document.getElementById('double-right-word').className = "mega";
		double_right_progressbar.animate(0);
		document.getElementById('double-left-word').innerHTML = convert(leftsec_pros);
		document.getElementById('double-left-word').className = "mega shine";
		double_left_progressbar.animate(leftsec_pros/totalsec_pros);
	}
	
	if((leftsec_pros + leftsec_cons) < 0.1){
		audio2();
		clearInterval(t);
		document.getElementById('double-left-word').innerHTML = "0 : 00";
		document.getElementById('double-right-word').innerHTML = "0 : 00";
		document.getElementById('double-right-word').className = "mega";
		document.getElementById('double-left-word').className = "mega";
		double_right_progressbar.animate(0);
		double_left_progressbar.animate(0);
	}
}

function change_side(){
	document.getElementById('btn-left').blur();
	if(side=="left"){
		side="right";
		document.getElementById('double-left-word').className = "mega";
	}
	else {
		side="left";
		document.getElementById('double-right-word').className = "mega";
	}
}


//this is the onclick function of reset current time count
function reset(){
	clearInterval(t);
	side="left";
	document.getElementById('btn-middle').innerHTML = "<i class='fa fa-caret-right fa-2x'></i>";
	if(document.getElementById('left').className == "bounceOut animated"){
		$('#btn-middle').attr("onclick","single();");
		single_progressbar.animate(1);
	}
	else{
		$('#btn-middle').attr("onclick","double();");
		double_right_progressbar.animate(1);
		double_left_progressbar.animate(1);
	}
	document.getElementById('single-word').innerHTML = convert(totalsec);
	document.getElementById('double-left-word').innerHTML = convert(totalsec_pros);
	document.getElementById('double-right-word').innerHTML = convert(totalsec_pros);
	document.getElementById('single-word').className = "mega";
	document.getElementById('double-left-word').className = "mega";
	document.getElementById('double-right-word').className = "mega";
}


//this is in order to convert second to minutes.
function convert(x)
{
    var min,sec,secstring
    var output
	sec = x % 60
		if (sec < 10)
		{
			secstring = "0" + sec.toString()
		}
		else
		{
			secstring = sec.toString()
		}

	min = (x-sec)/60
	output = min.toString() + " : " + secstring

	return output
}

//next time and title to show on the screen. input is "step1" and "step2" or ...
function next(a,b){
	document.getElementById('single-word').className = "mega";
	document.getElementById('double-left-word').className = "mega";
	document.getElementById('double-right-word').className = "mega";
	document.getElementById('btn-right').blur();
	document.getElementById('btn-middle').innerHTML = "<i class='fa fa-caret-right fa-2x'></i>";
	var thisname = game[a].name;
	var nextname = game[b].name;
	var thistype = game[a].type;
	var nexttype = game[b].type;
	var thistime = game[a].duration;
	var nexttime = game[b].duration;
	totalsec_pros = nexttime;
	totalsec_cons = nexttime;
	totalsec = nexttime;
	leftsec = totalsec;
	leftsec_cons = totalsec_cons; leftsec_pros = totalsec_pros;
	
	if(thistype == "single" && nexttype == "single"){
		console.log('event: single single');
		$('#middle').removeClass().addClass('bounceOut animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
	  		$('#single-word').html(convert(nexttime));
	        $('#middle').removeClass().addClass('bounceIn animated');
	        //animate progressbar
	    	single_progressbar.animate(1);
	    });
	    //change button onclick function
	    $('#btn-middle').attr("onclick","single();");
	    $("#btn-left").attr("disabled", true);
	}
	
	if(thistype == "single" && nexttype == "double"){
		console.log('event: single double');
		$('#middle').removeClass().addClass('bounceOut animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			single_progressbar.animate(0);
	        $('#double-left-word').html(convert(nexttime));
	        $('#double-right-word').html(convert(nexttime));
	        $('#left').removeClass().addClass('bounceIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
	        	double_left_progressbar.animate(1);
	        	$('#right').removeClass().addClass('bounceIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
	        		double_right_progressbar.animate(1);
	        		$('#middle').removeClass().addClass('bounceOut animated');
	        	});
	        });
	    });
	    //change button onclick function
	    $('#btn-middle').attr("onclick","double();");
	    $("#btn-left").attr("disabled", false);
	}
	
	if(thistype == "double" && nexttype == "single"){
		console.log('event: double single');
		$('#left').removeClass().addClass('bounceOut animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			//set left progress bar to transparent
			double_left_progressbar.animate(0);
	        $('#right').removeClass().addClass('bounceOut animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
	        	//set right progress bar to transparent
	        	double_right_progressbar.animate(0)
	        	$('#single-word').html(convert(nexttime));
	        	$('#middle').removeClass().addClass('bounceIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
	        		$('#left').removeClass().addClass('bounceOut animated');
	        		$('#right').removeClass().addClass('bounceOut animated');
	        		//set single progress bar to some color
				    single_progressbar.animate(1);
	        	});
	        });
	    });
	    //change button onclick function
	    $('#btn-middle').attr("onclick","single();");
	    $("#btn-left").attr("disabled", true);
	}
	
	if(thistype == "double" && nexttype == "double"){
		console.log('event: double double');
		$('#left').removeClass().addClass('bounceOut animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
	        $('#right').removeClass().addClass('bounceOut animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
	        	$('#double-left-word').html(convert(nexttime));
	        	$('#double-right-word').html(convert(nexttime));
	        	$('#left').removeClass().addClass('bounceIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
	        		$('#right').removeClass().addClass('bounceIn animated');
	        		//animate progressbar
				    double_left_progressbar.animate(1);
				    double_right_progressbar.animate(1);
	        	});
	        });
	    });
	    //change button onclick function
	    $('#btn-middle').attr("onclick","double();");
	    $("#btn-left").attr("disabled", false);
	}
	
	//change the round name !
	$('#roundname').removeClass().addClass('fadeOut animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$('#roundname-text').html(nextname);
		$('#roundname').removeClass().addClass('fadeIn animated');
	})
	
	//clear time count
	clearInterval(t);
	//set start side to left anyway
	side = "left";
};

// pause and go on....
function pause(type){
	document.getElementById('single-word').className = "mega";
	document.getElementById('double-left-word').className = "mega";
	document.getElementById('double-right-word').className = "mega";
	document.getElementById('btn-middle').blur();
	if(type == 'single'){
		$('#btn-middle').attr("onclick","goon('single');");
		document.getElementById('btn-middle').innerHTML = "<i class='fa fa-caret-right fa-2x'></i>";
	}
	if(type == 'double'){
		$('#btn-middle').attr("onclick","goon('double');");
		document.getElementById('btn-middle').innerHTML = "<i class='fa fa-caret-right fa-2x'></i>";
	}
	clearInterval(t);
}
function goon(type){
	document.getElementById('btn-middle').blur();
	if(type=="single"){	
		$('#btn-middle').attr("onclick","pause('single');");
		document.getElementById('btn-middle').innerHTML = "<i class='fa fa-pause fa-2x' style='font-size: 1.4em;'></i>";
		t = setInterval("single_time()",1000);
	}
	if(type=="double"){	
		$('#btn-middle').attr("onclick","pause('double');");
		document.getElementById('btn-middle').innerHTML = "<i class='fa fa-pause fa-2x' style='font-size: 1.4em;'></i>";
		t = setInterval("double_time()",1000);
	}
}
//end of pause and go on...



var game ={
	"step1":{
		"duration":180,
		"name":"正方一辩陈词",
		"type":"single",
	},
	"step2":{
		"duration":90,
		"name":"反方一辩质询",
		"type":"single",
	},
	"step3":{
		"duration":180,
		"name":"反方一辩陈词",
		"type":"single",
	},
	"step4":{
		"duration":90,
		"name":"正方一辩质询",
		"type":"single",
	},
	"step5":{
		"duration":150,
		"name":"正方二辩申论",
		"type":"single",
	},
	"step6":{
		"duration":150,
		"name":"反方二辩申论",
		"type":"single",
	},
	"step7":{
		"duration":90,
		"name":"正反二辩对辩",
		"type":"double",
	},
	"step8":{
		"duration":150,
		"name":"正方三辩盘问",
		"type":"single",
	},
	"step9":{
		"duration":150,
		"name":"反方三辩盘问",
		"type":"single",
	},
	"step10":{
		"duration":90,
		"name":"正方三辩小结",
		"type":"single",
	},
	"step11":{
		"duration":90,
		"name":"反方三辩小结",
		"type":"single",
	},
	"step12":{
		"duration":240,
		"name":"正反双方对辩",
		"type":"double",
	},
	"step13":{
		"duration":210,
		"name":"反方四辩结辩",
		"type":"single",
	},
	"step14":{
		"duration":210,
		"name":"正方四辩结辩",
		"type":"single",
	},
	"step15":{
		"duration":150,
		"name":"奇袭 － 质询",
		"type":"single",
	},
	"step16":{
		"duration":120,
		"name":"奇袭 － 申论",
		"type":"single",
	},
}


function audio1(){
	document.getElementById('bell1').play();
}
function audio2(){
	document.getElementById('bell2').play();
}
function audio3(){
	document.getElementById('bell3').play();
}

