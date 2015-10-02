// DOM elemnts stored in variables
var canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	uploadedFile = document.getElementById('uploaded-file'),
	red = document.getElementById("color-red"),
	green = document.getElementById("color-green"),
	blue = document.getElementById("color-blue"),
	opacity = document.getElementById("color-opacity"),
	pixelCount = document.getElementById("number-of-pixels");

// draws horizontal and vertical grid delta apart
function drawGrid(orientation,delta,gridColor) {
	var n = 0;
	var delta = 20;
	for (var i=0; i <= (500/delta); i++) {
		context.beginPath();
		if (orientation == 'horizontal') {
			context.moveTo(0, n);
			context.lineTo(500, n);
		} else {
			context.moveTo(n, 0);
			context.lineTo(n, 500);
		}	
		context.strokeStyle = gridColor;
		context.stroke();
		n += delta;
	}

	// draws rectangle for reference
	context.fillRect(delta,delta,delta,delta);
}

// wait for page to load 
window.addEventListener('DOMContentLoaded', initImageLoader);

function initImageLoader(){
	
    
	window.addEventListener('dragover', function(e){
		e.preventDefault();
	}, true);

	window.addEventListener('drop', function(e){
		var data = e.dataTransfer;
		e.preventDefault();
		handleFile(data.files[0]);
	});

	uploadedFile.addEventListener('change', handleManualUploadedFiles);

	function handleManualUploadedFiles(ev){
		var file = ev.target.files[0];
		handleFile(file);
	}
	
}

function handleFile(file){
	var imageType = /image.*/;

	if (file.type.match(imageType)){
		var reader = new FileReader();	
		reader.onload = function(event){
			var tempImageStrore = new Image();
	
			var returnImage = function(ev){
				canvas.height = ev.target.height;
				canvas.width = ev.target.width;
				context.drawImage(ev.target, 0, 0);
				drawGrid('horizontal',20,'blue');
				drawGrid('vertical',20,'blue');
				image = context.getImageData(0,0,ev.target.width,ev.target.height);
				pixelCount.innerHTML = "Number of Pixels in Image: " image.data.length;			
			}
       
			tempImageStrore.onload = returnImage;
			red.onchange = imageFromCanvasRed;
			green.onchange = imageFromCanvasGreen;
			blue.onchange = imageFromCanvasBlue;
			opacity.onchange = imageFromCanvasOpacity;

		tempImageStrore.src = event.target.result;	
		}
	reader.readAsDataURL(file);	
	}
}

function imageFromCanvasRed(){
	var data = image.data;
	console.log("Number of pixels = " + (data.length / 4));
    var white = 0;
	for (i=0; i < data.length; i+=4){
		if ((data[i] == 0 && data[i+1]==0) && (data[i+2]==0 && data[i+3]==255)) {
			white += 1;
		}
	}
    console.log("Number of white pixels = " + white);

	//add color effect in rgb scale (r,g,b,opacity) <=> (data[i],g,b,opacity)
	for (i=0; i < data.length; i+=4){
		data[i] = red.value; // add red
	}

	document.getElementById('color-red-val').innerHTML = "(Red = " + red.value + "/255)";

	image.data = data;
	context.putImageData(image,0,0);
}

function imageFromCanvasGreen(){
	var data = image.data;
	console.log("Number of pixels = " + (data.length / 4));
    var white = 0;
	for (i=0; i < data.length; i+=4){
		if ((data[i] == 0 && data[i+1]==0) && (data[i+2]==0 && data[i+3]==255)) {
			white += 1;
		}
	}
	//add color effect in rgb scale (r,g,b,opacity) <=> (r,data[i+1],b,opacity)
	for (i=0; i < data.length; i+=4){
		data[i+1] = green.value; // add green
	}

	document.getElementById('color-green-val').innerHTML = "(Green = " + green.value + "/255)";

	image.data = data;
	context.putImageData(image,0,0);
}

function imageFromCanvasBlue(){
	var data = image.data;
    var white = 0;
	for (i=0; i < data.length; i+=4){
		if ((data[i] == 0 && data[i+1]==0) && (data[i+2]==0 && data[i+3]==255)) {
			white += 1;
		}
	}
    
    console.log("Number of white pixels = " + white);

	//add color effect in rgb scale (r,g,b,opacity) <=> (r,g,data[i+2],opacity)
	for (i=0; i < data.length; i+=4){
		data[i+2] = blue.value; // add blue
	}

	document.getElementById('color-blue-val').innerHTML = "(Blue = " + blue.value + "/255)";

	image.data = data;
	context.putImageData(image,0,0);
}

function imageFromCanvasOpacity(){
	var data = image.data;
    var white = 0;
	for (i=0; i < data.length; i+=4){
		if ((data[i] == 0 && data[i+1]==0) && (data[i+2]==0 && data[i+3]==255)) {
			white += 1;
		}
	}
    console.log("Number of white pixels = " + white);

	//add color effect in rgb scale (r,g,b,opacity) <=> (r,g,b,data[i+3])
	for (i=0; i < data.length; i+=4){
		data[i+3] = opacity.value; // add opacity
	}
	document.getElementById('color-opacity-val').innerHTML = "(Opacity = " + opacity.value + "/255)";

	image.data = data;
	context.putImageData(image,0,0);
}