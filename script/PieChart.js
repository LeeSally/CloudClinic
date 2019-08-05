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
		LineColor:'RGB(178,178,178)'
	}
	
	if(ColorName == 'blue'){
		colorSet.FillColor = 'RGB(153,204,255)';
		colorSet.FillHighColor = 'RGB(204,236,255)';
		colorSet.LineColor = 'RGB(102,153,255)';
		
	}else if(ColorName == 'gray'){
		colorSet.FillColor = 'RGB(221,221,221)';
		colorSet.FillHighColor = 'RGB(234,234,234)';
		colorSet.LineColor = 'RGB(178,178,178)'; 
		
	}else if(ColorName == 'red'){
		colorSet.FillColor = 'RGB(255,153,153)';
		colorSet.FillHighColor = 'RGB(255,204,204)';
		colorSet.LineColor = 'RGB(255,124,128)'; 
		
	}else if(ColorName == 'orange'){
		colorSet.FillColor = 'RGB(255,204,102)';
		colorSet.FillHighColor = 'RGB(255,253,153)';
		colorSet.LineColor = 'RGB(255,153,51)'; 
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
			return colorSet.LineColor.substring(0,(colorSet.LineColor.length -1)) + ',' +  alpha +')'; 
		}else{
			return colorSet.LineColor
		}
	}
	
} 

 
 
 
//======================================== 
function ChartPie(data, radius, weight, CenterPos){
	
	this.name = data.name;
	this.value = data.value;
	this.rate = data.rate;
	this.color = data.color;
	
	this.radius = radius;
	this.weight = weight;
	
	var looping = function(ctx, CenterPos, StartRad, EndRad){
		ctx.beginPath();
		ctx.moveTo(CenterPoint.x,CenterPoint.y);
		ctx.arc(CenterPoint.x, CenterPoint.y, this.radius, startRad, Math.PI * 2 * this.rate, false);
	}
	
	ChartPie.prototype.draw = function(ctx, CenterPoint, startRad){
		ctx.beginPath();
		ctx.moveTo(CenterPoint.x,CenterPoint.y);
		ctx.arc(CenterPoint.x, CenterPoint.y, this.radius, startRad, Math.PI * 2 * this.rate, false);
	}
}



function ChartCanvas(){
	var isInit = false;
	this.CanvasBack = null;
	this.CanvasFore = null;
	this.Label = null;
	
	var ChartBack = null;
	var ChartFore = null;
	
	this.PieList = [];
	
	//initialize a canvas object
	this.init = function(DivParent){
		if(!isInit){
			this.width = DivParent.offsetWidth-20;
			this.height = DivParent.offsetHeight-20;
			
			//background canvas
			ChartBack = document.createElement('canvas');
			
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
		
		//-------------------------------------
		//clear current pie chart
		if(Settings.type == 'bar'){
			// pie 
			for(i=0;i<this.PieList.length;i++){ 
				this.PieList[i].clear();
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
		this.type = Settings.type || "pie";
		
		this.data = Settings.data;
		
		//-------------------------------------
		//draw chart title
		this.CanvasFore.font='16px calibri';
		this.CanvasFore.fillStyle='#333';
		this.CanvasFore.textAlign = "left";
		this.CanvasFore.textBaseline = "middle";
		this.CanvasFore.fillText(this.title,20,topH/2); 
		
		
		//-------------------------------------
		//draw pie name 
		for(i=0;i< this.data.length;i++){
			
			//title 
			this.CanvasFore.font='12px calibri';
			this.CanvasFore.fillStyle='#666'; 
			this.CanvasFore.textAlign = "left";
			this.CanvasFore.textBaseline = "middle";
			this.CanvasFore.fillText(this.data[i].name || 'category' + (i+1), this.width - 180 + i* 80, topH/2); 
			
			//icon
			var ColorSet = new ChartColorSet(this.data[i].barcolor);
			this.CanvasFore.fillStyle = ColorSet.getBarColor(1); 
			this.CanvasFore.strokeStyle = ColorSet.getLineColor(1); 
			this.CanvasFore.lineWidth=0.5;
			
			this.CanvasFore.beginPath();
			this.CanvasFore.rect(this.width - 192 + i * 80, topH/2 - 3, 6, 6);
			this.CanvasFore.fill();
			this.CanvasFore.stroke();
			
			this.CanvasFore.closePath();
		}
		
			
		if(Settings.type == 'pie'){
			
			this.activePie = null;
			
			//-------------------------------------
			//draw each data bar
			for(i=0;i<this.data.length;i++){
				//new pie object
				var pie = new ChartPie(this.data[i]);
				pie.load(this);
				
				//set pie into data object
				this.PieList.push(pie); 
			}
			
			this.Label.show(false);
			
			//-------------------------------------
			//add mouse event 
			var _this = this;
			
			EventUtil.add(ChartFore,'mousemove',function(e){ 
				var p = getEventPosition(e, _this.ChartBack); 
				var isMousIn =false; 
				
				for(i=0;i< _this.PieList.length;i++){
					isMousIn = _this.PieList[i].mouseIn(p.x, p.y, _this.Label);
					
					if(isMousIn){
						if(_this.activePie!=null){
							_this.activePie.reDraw(false);
						}
						_this.activePie = _this.PieList[i];
						_this.activePie.reDraw(true);
						
						break;
					}  
					if(isMousIn){break;};
				}
				
				
				if(!isMousIn && _this.activePie!=null){
					_this.activePie.reDraw(false);
				}
			},false); 
			
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
		