// requestAnimationFrame

if (!window.requestAnimationFrame){
	/*
	window.requestAnimationFrame = function(callback) {
		var currTime = new Date().getTime();
		var lastTime = 0;
		
		var timeToCall = Math.max(0, 16 - (currTime - lastTime));
		var id = window.setTimeout(function() { callback(currTime + timeToCall); },
		  timeToCall);
		lastTime = currTime + timeToCall;
		return id;
		
		
	};
	*/
}
	



//==========================
/*
	add Event Listener 
*/
var EventUtil = {
	add:function(element,type,eventfunc,mode){
		if(element.addEventListener){
			element.addEventListener(type,eventfunc,mode)
		}else if(element.attachEvent){
			element.attachEvent("on" + type,eventfunc);
		}else {
			element["on"+type] = eventfunc;
		}
	}
}


//========================================
//color set
function ChartColorSet(ColorName, BarAlpha, LineAlpha){
	var colorSet ={
		FillColor:'RGB(221,221,221)',
		FillHighColor:'RGB(234,234,234)',
		lineColor:'RGB(178,178,178)'
	}
	
	if(ColorName == 'blue'){
		colorSet.FillColor = 'RGB(153,204,255)';
		colorSet.FillHighColor = 'RGB(204,236,255)';
		colorSet.lineColor = 'RGB(102,153,255)';
		
	}else if(ColorName == 'gray'){
		colorSet.FillColor = 'RGB(221,221,221)';
		colorSet.FillHighColor = 'RGB(234,234,234)';
		colorSet.lineColor = 'RGB(178,178,178)'; 
		
	}else if(ColorName == 'red'){
		colorSet.FillColor = 'RGB(255,153,153)';
		colorSet.FillHighColor = 'RGB(255,204,204)';
		colorSet.lineColor = 'RGB(255,124,128)'; 
		
	}else if(ColorName == 'orange'){
		colorSet.FillColor = 'RGB(255,204,102)';
		colorSet.FillHighColor = 'RGB(255,253,153)';
		colorSet.lineColor = 'RGB(255,153,51)'; 
	}
	
	
	this.getFillColor = function(alpha){ 
		if(navigator.appName.indexOf('Internet Explore') == -1 ){
			return colorSet.FillColor.substring(0,(colorSet.FillColor.length -1)) + ',' +  alpha +')'; 
		}else{
			return colorSet.FillColor;
		}
	}
	
	this.getFillHighColor = function(alpha){
		if(navigator.appName.indexOf('Internet Explore')== -1 ){
			return colorSet.FillHighColor.substring(0,(colorSet.FillHighColor.length -1)) + ',' +  alpha +')'; 
		}else{
			return colorSet.FillHighColor
		}
	}
	
	this.getLineColor = function(alpha){
		if(navigator.appName.indexOf('Internet Explore')== -1 ){
			return colorSet.lineColor.substring(0,(colorSet.lineColor.length -1)) + ',' +  alpha +')'; 
		}else{
			return colorSet.lineColor
		}
	}
	
} 


//========================================
//line object
function ChartLine(category, data){
	
	this.category = category
	this.data = data
	var isInit = false;
	
	this.draw = function(canvas){
		//clear current point
		
		for(i = 0 ; i < this.data.length;i++){
			
		}
	}
	
	
}

//line point object
function ChartLinePoint(pos_x, pos_y, color){
	this.x = pos_x;
	this.y = pos_y;
	
	this.r = 10;
	this.color = color;
	
	this.mouseIn = function(x,y, barLabel){ 
		
		if( Math.power((x - this.x),2) + Math.power((y - this.y),2) <= Math.power(this.r,2)){ 
			barLabel.move(this);
			return true;
			
		}else{
			return false;
		}
	};
	
	
	this.draw = function(canvas, isHighlight){
		
		
		//this.clear();
		
		//draw point body
		canvas.beginPath();
		if(isHighlight){
			canvas.fillStyle = this.color;
		}else{
			canvas.fillStyle = 'rgb(255,255,255)';
		}
		
		canvas.strokeStyle  = this.color;
		canvas.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		canvas.stroke();
		canvas.fill();
		canvas.closePath(); 
		
	}
	
	this.clear = function(){
		
		canvas.beginPath();
		canvas.clearRect(left,top,width,height); 
		canvas.closePath();
	}
	
}


//========================================
//bar object
function ChartBar(category, x_val, y_val ){
	var _x = x_val;
	var _y = y_val;
	var _cat = category;
	
	this.Left = 0;
	this.Top = 0;
	this.Width = 0;
	this.Height = 0;
	
	this.objCanvas = null;
	this.Canvas = null;
	this.CanvasText = null;
	
	this.Color = new ChartColorSet(); 
	
	
	//----------------------------
	//get method
	
	this.getValX = function(){return _x};
	this.getValY = function(){return _y};
	this.getCat = function(){return _cat};
	
	ChartBar.prototype.setColor = function(colorName){
		this.Color = new ChartColorSet(colorName)
	};
	
	ChartBar.prototype.getFillColor = function(alpha){
		return this.Color.getFillColor(alpha)
	};
	
	ChartBar.prototype.getLineColor = function(alpha){
		return this.Color.getLineColor(alpha)
	};
	
	
	ChartBar.prototype.mouseIn = function(x,y, barLabel){ 
		
		if( x <= (this.Left + this.Width) && x >= this.Left && y >= this.Top && y <= (this.Top + this.Height)){
			barLabel.move(this);
			return true;
		}else{
			return false;
		}
	};
	
	
	ChartBar.prototype.reDraw = function(isHighlight){
		this.drawBar(this.Canvas, this.Left, this.Width, this.Top, this.Height, isHighlight);
	}
	
	
	
	var thisObj = this;
	ChartBar.prototype.drawBar = function(canvas, left, width, top, height, isHighlight){
		
		//1. clear
		canvas.beginPath();
		canvas.clearRect(left,top,width,height); 
		canvas.closePath();
		
		//2. bar body
		if(isHighlight){
			canvas.fillStyle = this.Color.getFillHighColor(0.5); 
			//this.drawText(true); 
		}else{
			canvas.fillStyle = this.Color.getFillColor(0.5);
			//this.drawText(false); 
		}
		
		canvas.beginPath();
		canvas.rect(left,top,width,height);
		canvas.fill();
		canvas.closePath();
		
		
		
		//3. draw bar outline
		canvas.strokeStyle =  this.Color.getLineColor(1);
		canvas.lineWidth = 0.5;
		canvas.beginPath();
		
		//left line
		canvas.moveTo (left + 0.5,top + height);
		canvas.lineTo (left + 0.5,top);
		
		//right line
		canvas.moveTo (left + width - 0.5, top + height);
		canvas.lineTo (left + width - 0.5, top);
		
		//top line
		canvas.moveTo (left + 0.5 ,top);
		canvas.lineTo (left + width  - 0.5,top);
		
		canvas.stroke();
		canvas.closePath();
		
		
		this.Left  = left;
		this.Width = width;
		/*
		this.Top = top; 
		this.Height = height;
		*/
	}
	
	ChartBar.prototype.drawLabel = function(){
		this.CanvasText.beginPath();
		this.CanvasText.clearRect(this.Left,this.Top,30,100); 
		this.CanvasText.closePath();
	}
	
	
	ChartBar.prototype.drawText = function(isShow){
		
		if(isShow){ 
			this.Canvas.beginPath();
			this.Canvas.font="11px calibri"
			this.Canvas.fillStyle="#666"
			this.Canvas.textAlign = "center";
			this.Canvas.textBaseline = "middle";
			
			var num = _y;
			if(num>= 10000){ 
				num =  Math.round(num/1000)/10 + "W"
			}else if(num>= 1000){ 
				num =  Math.round(num/100)/10 + "K"
			}
			
			this.Canvas.fillText(num,this.Left + this.Width/2,this.Top - 10); 
			this.Canvas.closePath();
		}
	}
	
	
	ChartBar.prototype.load = function(oCanvas){
		this.objCanvas = oCanvas;
		this.Canvas = oCanvas.CanvasFore;
		
		if(window.requestAnimationFrame){
			looping();
		}else{
			var curH = this.Height;
			var curT = this.Top + this.Height - curH;
			//draw
			this.drawBar(this.Canvas,this.Left, this.Width, curT, curH, false);
		}
		
	}
	
	
	var curRate = 0;
	var speed = 5;
	var looped = null;
	
	var looping = function() {
		looped = requestAnimationFrame(looping);
		
		if(curRate < 100){
			curRate = (curRate + speed) > 100 ? 100 : (curRate + speed);
			thisObj.drawAnimation(curRate,thisObj.Canvas);
		
		}else{
			window.cancelAnimationFrame(looped);
			looped = null; 
			
			//text 
			//thisObj.drawText(true); 
		} 
	}
	
	ChartBar.prototype.clear = function(){
		if(window.cancelAnimationFrame){
			window.cancelAnimationFrame(looped);
			looped = null;
		}
	}
	
	ChartBar.prototype.drawAnimation = function(rate,canvas) {
		var curH = this.Height * rate / 100;
		var curT = this.Top + this.Height - curH;
		
		//draw
		this.drawBar(canvas,this.Left, this.Width, curT, curH, false);
	}

}


function BarLabel(canvasParent){ 
	this.CanvasLabel = null;
	this.width = 80;
	this.height = 40;
	
	var ChartLabel = document.createElement('canvas');
	var TriSize = 5;
	
	ChartLabel.width = this.width;
	ChartLabel.height = this.height;
	canvasParent.appendChild(ChartLabel); 
	
	this.CanvasLabel = ChartLabel.getContext("2d");
	
	BarLabel.prototype.show = function(isShow){
		if(isShow){
			ChartLabel.style.setProperty('display', 'block');
		}else{
			ChartLabel.style.setProperty('display', 'none');
		}
	}
	
	this.show(false);
	
	
	_this = this
	var drawBack = function(){
		//clear
		_this.CanvasLabel.clearRect(0,0,_this.width,_this.height);
		
		
		//back
		_this.CanvasLabel.beginPath(); 
		if(navigator.appName.indexOf('Internet Explore')== -1 ){
			_this.CanvasLabel.fillStyle = 'RGB(0,0,0,0.8)';
		}else{
			_this.CanvasLabel.fillStyle = 'RGB(0,0,0)';
		}
		_this.CanvasLabel.rect(0,0,_this.width,_this.height - TriSize);
		_this.CanvasLabel.fill();
		_this.CanvasLabel.closePath();
		
		//down triangle
		_this.CanvasLabel.beginPath(); 
		_this.CanvasLabel.moveTo((_this.width - TriSize*2)/2, _this.height-TriSize);
		_this.CanvasLabel.lineTo((_this.width + TriSize*2)/2, _this.height-TriSize);
		_this.CanvasLabel.lineTo((_this.width/2), _this.height);
		_this.CanvasLabel.fill();
		_this.CanvasLabel.closePath();
	}
	
	
	BarLabel.prototype.move = function(bar){
		
		ChartLabel.style.cssText = "margin-top :" + (bar.Top + canvasParent.style.top - this.height - 5) + "px ;margin-left :" + (bar.Left + (bar.Width - this.width)/2)+ "px";
		drawBack();
		
		//catogory icon
		this.CanvasLabel.beginPath();
		this.CanvasLabel.fillStyle= bar.getFillColor(1);
		this.CanvasLabel.rect(5,8,6,6);
		this.CanvasLabel.fill(); 
		this.CanvasLabel.lineWidth = 0.5;
		this.CanvasLabel.strokeStyle= bar.getLineColor(1);
		this.CanvasLabel.stroke(); 
		this.CanvasLabel.closePath();
		
		
		//category text
		this.CanvasLabel.beginPath();
		this.CanvasLabel.fillStyle= 'rgb(255,255,255)';
		this.CanvasLabel.font="bold 12px calibri"; 
		this.CanvasLabel.textAlign = "left";
		this.CanvasLabel.textBaseline = "top";
		this.CanvasLabel.fillText(bar.getCat(),15,3); 
		this.CanvasLabel.closePath();
		
		//value
		this.CanvasLabel.beginPath();
		this.CanvasLabel.fillStyle= 'rgb(255,255,255)';
		this.CanvasLabel.font="normal 12px calibri"; 
		this.CanvasLabel.textAlign = "left";
		this.CanvasLabel.textBaseline = "top";
		this.CanvasLabel.fillText(bar.getValY(),15,18); 
		this.CanvasLabel.closePath();
		
		this.show(true);		
	}
}


//========================================
function ChartCanvas(){
	var isInit = false;
	this.CanvasBack = null;
	this.CanvasFore = null;
	this.barLabel = null;
	
	var ChartBack = null;
	var ChartFore = null;
	
	
	//initialize a canvas object
	this.init = function(DivParent){
		
		if(!isInit){
			this.width = DivParent.offsetWidth-20;
			this.height = DivParent.offsetHeight-20;
			
			//background canvas
			ChartBack = document.createElement('canvas');
			if(!ChartBack.getContext){
				var err = document.createElement("div");
				ClassUtil.add(err,"errInfo");
				err.innerHTML = "Sorry T T. <br />Your browser not support HTML5";
				DivParent.appendChild(err);
				
				return false;
			}
			
			ChartBack.height = this.height;
			ChartBack.width = this.width;
			
			DivParent.appendChild(ChartBack);
			this.CanvasBack = ChartBack.getContext("2d");
			
			
			
			//chart body canvas
			ChartFore = document.createElement('canvas');
			ChartFore.height = this.height; 
			ChartFore.width = this.width;
			DivParent.appendChild(ChartFore);
			this.CanvasFore = ChartFore.getContext("2d");
			
			//chart label canvas
			this.barLabel = new BarLabel(DivParent); 
			isInit=true;
		}
	} 
	
	//draw chart
	ChartCanvas.prototype.drawChart = function(Settings){
		if(!isInit){
			return false;
		}
		
		//-------------------------------------
		//clear current chart
		if(Settings.type == 'bar'){
			// bar
			if(this.data!=null){
				for(i=0;i<this.data.length;i++){ 
					if(this.data[i].barList != null){
						for(j=0;j< this.data[i].barList.length;j++){
							this.data[i].barList[j].clear();
						}
						this.data[i].barList =null; 
					}
				}
			}
		}
		
		//-------------------------------------
		//clear canvas
		this.CanvasBack.beginPath();
		this.CanvasBack.clearRect(0,0,this.width,this.height); 
		this.CanvasBack.closePath(); 
		
		this.CanvasFore.beginPath();
		this.CanvasFore.clearRect(0,0,this.width,this.height); 
		this.CanvasFore.closePath(); 
		
		
		//-------------------------------------
		//get property
		this.Sets = Settings || {};
		
		this.title = Settings.title || "";
		this.type = Settings.type || "bar";
		
		this.xLabels = Settings.xLabels || [];
		this.data = Settings.data;
		this.y = Settings.y || {};
		
		
		var spaceH = 25;
		var topH = 60;
		var bottomH = 25;
		
			
		//-------------------------------------
		//get max & min y value 
		
		var maxY = this.data[0].list[0];
		var minY = this.data[0].list[0];
		
		for(i=0;i <this.data.length;i++){
			for(j=0;j < this.data[i].list.length;j++){
				if(this.data[i].list[j] > maxY){
					maxY = this.data[i].list[j]
				}
				
				if(this.data[i].list[j] < minY){
					minY = this.data[i].list[j]
				}
			}
		}
		
		
		if(this.y.min != null){
			this.y.min = Settings.y.min;
		}else{
			this.y.min = minY - ((maxY - minY) / ((this.height - bottomH - topH)/spaceH));
			if(this.y.min<0) {this.y.min = 0};
		}
		
		if(this.y.max != null){
			this.y.max = Settings.y.max;
		}else{
			this.y.max = maxY + ((maxY - minY) / ((this.height - bottomH - topH)/spaceH));
		}
		
		
		//-------------------------------------
		//draw horizontal line for Y-axis
		
		for(i=1;i < this.height/spaceH;i++){ 
			
			if((this.height - bottomH)- i * spaceH > topH && i * spaceH < this.height - bottomH){
				//line
				this.CanvasBack.fillStyle = 'rgb(221,221,221)';
				this.CanvasBack.fillRect(5, (this.height - bottomH)- i * spaceH, this.width-10, 0.5);
				
				
				//line value
				this.CanvasBack.font="11px calibri";
				this.CanvasBack.textAlign= "left";
				this.CanvasBack.textBaseline="bottom";
				this.CanvasBack.fillStyle='#999';
				
				var num =  Math.round((this.y.max-this.y.min)/(this.height - bottomH - topH) *( i * spaceH)); 
				
				if(num>= 10000){ 
					num =  Math.round(num/1000)/10 + "W"
				}else if(num>= 1000){ 
					num =  Math.round(num/100)/10 + "K" 
				}
				this.CanvasBack.fillText(num,10,(this.height - bottomH)- i * spaceH); 
			}
		}
			
		//-------------------------------------
		//x-axis line
		this.CanvasBack.beginPath();
		this.CanvasBack.moveTo(5,this.height - bottomH);
		this.CanvasBack.lineTo(this.width-10,this.height - bottomH);
		this.CanvasBack.lineWidth = 0.5;
		this.CanvasBack.strokeStyle = 'rgb(150,150,150)' ;
		this.CanvasBack.stroke();
		this.CanvasBack.fillText(Math.round(this.y.min),10,this.height - bottomH - 3); 
		this.CanvasBack.closePath(); 
		
		//-------------------------------------
		//draw chart title
		this.CanvasFore.font='16px calibri';
		this.CanvasFore.fillStyle='#333';
		this.CanvasFore.textAlign = "left";
		this.CanvasFore.textBaseline = "middle";
		this.CanvasFore.fillText(this.title,20,topH/2); 
			
		
		//-------------------------------------
		//draw bar category name 
		for(i=0;i< this.data.length;i++){
			
			//category title 
			this.CanvasFore.font='12px calibri';
			this.CanvasFore.fillStyle='#666'; 
			this.CanvasFore.textAlign = "left";
			this.CanvasFore.textBaseline = "middle";
			this.CanvasFore.fillText(this.data[i].category || 'category' + (i+1), this.width - 180 + i* 80, topH/2); 
			
			//category icon
			var ColorSet = new ChartColorSet(this.data[i].barcolor);
			this.CanvasFore.fillStyle = ColorSet.getFillColor(1); 
			this.CanvasFore.strokeStyle = ColorSet.getLineColor(1); 
			this.CanvasFore.lineWidth=0.5;
			
			this.CanvasFore.beginPath();
			this.CanvasFore.rect(this.width - 192 + i * 80, topH/2 - 3, 6, 6);
			this.CanvasFore.fill();
			this.CanvasFore.stroke();
			
			this.CanvasFore.closePath();
		} 
		
		
		//-------------------------------------
		// x label  
		var interval = this.width /(this.xLabels.length + 1);
		
		for(i=0;i< this.xLabels.length;i++){
			this.CanvasBack.font='bold 11px calibri';
			this.CanvasBack.fillStyle='#666';
			this.CanvasBack.textAlign = "center";
			this.CanvasBack.textBaseline = "top";
			this.CanvasBack.fillText(this.xLabels[i],interval * (i+1),this.height - bottomH + 5); 
		}	
		
			
		if(Settings.type == 'bar'){
			
			this.activeBar = null;
			
			//-------------------------------------
			//draw each data bar
			for(i=0;i<this.data.length;i++){
				
				//new map to store bar object 
				this.data[i].barList = new Array(); 
				
				//each data set
				for(j=0;j< this.xLabels.length;j++){
					
					//new bar object
					var bar = new ChartBar(this.data[i].category || 'category' + (i+1), this.xLabels[j], this.data[i].list[j]);
					
					bar.Width = interval/(2 * this.data.length);
					bar.Left = (interval*(j+1)- interval/2 + i * bar.Width + 20);
					
					bar.Height = Math.round((this.height- bottomH - topH) * (this.data[i].list[j] - this.y.min)/(this.y.max-this.y.min)); 
					
					bar.Top = (this.height - bar.Height - bottomH);
					bar.setColor(this.data[i].barcolor);
					bar.load(this);
					
					//set bar into data object
					this.data[i].barList[j] = bar;
				}
			}
			
			this.barLabel.show(false);
			
			//-------------------------------------
			//add mouse event 
			var thisObj = this;
			
			EventUtil.add(ChartFore,'mousemove',function(e){ 
				var p = getEventPosition(e, thisObj.ChartBack); 
				var isMousIn =false; 
				
				for(i=0;i< thisObj.data.length;i++){
					
					for(j=0;j< thisObj.xLabels.length;j++){
						
						isMousIn = thisObj.data[i].barList[j].mouseIn(p.x, p.y, thisObj.barLabel);
						
						if(isMousIn){
							if(thisObj.activeBar!=null){
								thisObj.activeBar.reDraw(false);
							}
							thisObj.activeBar = thisObj.data[i].barList[j];
							thisObj.activeBar.reDraw(true);
							break;
						} 
					}
					if(isMousIn){break;};
				}
				
				
				if(!isMousIn && thisObj.activeBar!=null){
					thisObj.activeBar.reDraw(false);
				}
			},false);
			
		}else if(Settings.type == 'line') {
			
		}
	}
}


function getEventPosition(ev){
	var x;
	var y;
	if(navigator.appName.indexOf('Internet Explore') == -1 ){
		if (ev.layerX || ev.layerX == 0) {
			x = ev.layerX;
			y = ev.layerY;
		} else if (ev.offsetX || ev.offsetX == 0) { // Opera
			x = ev.offsetX;
			y = ev.offsetY;
		}
	}else{
		x = ev.offsetX;
		y = ev.offsetY;
	}
	return {x: x, y: y};
}
		