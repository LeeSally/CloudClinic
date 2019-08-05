

/*--------------------
// get distance to page top
---------------------*/
var getDOMDistance = function(node,type){
	
	var res=0;
	if(getComputedStyle(node.parentNode).getPropertyValue("position")=="fixed"){
		if(type.toLowerCase() == 'top'){ 
			res += node.offsetTop;
			res += node.parentNode.offsetTop; 
			
		}else if(type.toLowerCase() == 'left'){ 
			console.log("left +:"+ node.offsetLeft);
			console.log("left +:"+ node.parentNode.offsetLeft);
		}
	}
	
	
	if(node.parentNode!=document.body){
		res += getDOMDistance(node.parentNode,type);
		return res;
	}else{
		return res;
	} 
} 
 
 
//============================
// Common controls components

/* ---------------
	Input text box 
*/ 


EventUtil.add(window,'load',function(){ 
	var ele=document.querySelectorAll("div[class='TextInputArea']"); 
	for(var i = 0; i < ele.length;i++){ 
		TextInputArea.add(ele[i]);
	}
});
/**/

var TextInputArea ={
	add:function(ele){
		var txtarea = document.createElement("textarea");
		ele.appendChild(txtarea);
		EventUtil.add(txtarea,"focus",function(){
			ClassUtil.add(ele,"TextInputArea_focus");
		});
	} 
}

/* ---------------
	TabButtons 
*/ 

function TabButtons(ElementID,ValList){
	
	var TabParent = document.getElementById(ElementID); 
	
	//create ul
	var TabBar = document.createElement("ul");
	TabParent.appendChild(TabBar);
	ClassUtil.add(TabBar,"TabBar");
	
	this.BtnList = new Array();
	
	
	//create each tab button
	var TabBtnList = new Array();
	var _this = this;
	
	
	//method
	TabButtons.prototype.size = function(){
		return this.BtnList.length;
	};
	
	TabButtons.prototype.item = function(no){
		return this.BtnList[no];
	};
	
	for(var i =0;i< ValList.length;i++){
		var outer = document.createElement("li");
		var btn = document.createElement("a");
		outer.appendChild(btn);
		TabBar.appendChild(outer);
		btn.innerHTML = ValList[i];
		
		
		EventUtil.add(btn,'click',function(e){ 
			for(var j =0; j< TabBtnList.length; j++){
				ClassUtil.remove(TabBtnList[j],"choosed");
			}
			
			if(document.addEventListener){
				ClassUtil.add(this,"choosed");
				_this.CurrentVal = this.innerHTML;
			}else if(document.attachEvent){
				ClassUtil.add(e.srcElement,"choosed");
				_this.CurrentVal = e.srcElement.innerHTML;
			}
		});
		TabBtnList.push(btn);
		this.BtnList.push(btn);
	}
	
	this.Buttons = TabBtnList;
	ClassUtil.add(TabBtnList[0],"choosed");
	
	this.CurrentVal = TabBtnList[0].innerHTML;
}


/* ---------------
	MenuList 
*/ 

function MenuList(DropList,DataList){
	ClassUtil.add(DropList,"MenuList");

	this.list = new Collection();
	this.element = DropList;
	var _this = this;
	
	MenuList.prototype.hide = function(){
		StyleUtil.set(this.element,"display","none");
	} 
	
	MenuList.prototype.show = function(){
		StyleUtil.set(this.element,"display","block");
		
	}
	
	MenuList.prototype.item = function(No){
		return this.list.item(No);
	}
	
	MenuList.prototype.get = function(name){
		return _this.list.get(name);
	}
	
	
	for(i=0;i< DataList.length;i++){
		var outer = document.createElement("li");
		var EleLi = document.createElement("a");
		EleLi.innerHTML = DataList[i]; 
		outer.appendChild(EleLi);
		
		this.element.appendChild(outer);
		this.list.set(DataList[i],EleLi);
	}
	
	EventUtil.add(document,'click',function(e){
		_this.hide();
	},true);
	
	
}


/* ---------------
	DropBox 
*/ 

function DropBox(ElementID,initialVal,DataList){
	var DropOuter = document.getElementById(ElementID); 
	ClassUtil.add(DropOuter,"DropButton");
	
	var btnOuter = document.createElement("div"); 
	ClassUtil.add(btnOuter,"button");
	
	var DropButton = document.createElement("a"); 
	DropOuter.appendChild(btnOuter);
	btnOuter.appendChild(DropButton);
	
	//StyleUtil.add(DropButton,"width",(DropOuter.clientWidth - 20) + "px;");
	DropButton.style.cssText = "width:" + (DropOuter.clientWidth - 20) + "px;";
	DropButton.innerHTML = initialVal;
	this.button = DropButton;
	
	var DropList = document.createElement("ul");
	DropList.style.cssText = "min-width:" +DropOuter.clientWidth + "px;top:" + (DropOuter.offsetTop + DropOuter.clientHeight) + "px;";
	DropOuter.appendChild(DropList);
	
	
	this.Menu = new MenuList(DropList,DataList);
	
	DropBox.prototype.Item = function(name){
		return this.Menu.get(name);
	}
	
	var _this = this;
	EventUtil.add(DropButton,'click',function(e){
		
		if(ClassUtil.has(DropButton,"up")){
			ClassUtil.remove(DropButton,"up"); 
			_this.Menu.hide();
		}else{
			ClassUtil.add(DropButton,"up");
			_this.Menu.show(); 
		}
		
		if(e.stopPropagation){
			e.stopPropagation();//阻止冒泡
		}else{
			e.cancelBubble=true;
		} 
	},false);  
	
	
	for(i=0;i< DataList.length;i++){
		EventUtil.add(_this.Menu.item(i),'click',function(e){
			if(document.addEventListener){
				DropButton.innerHTML = this.innerHTML;
			}else if(document.attachEvent){
				DropButton.innerHTML = e.srcElement.innerHTML;
			}
			
			_this.Menu.hide(); 
			ClassUtil.remove(DropButton,"up");
			
			if(e.stopPropagation){
				e.stopPropagation();//阻止冒泡
			}else{
				e.cancelBubble=true;
			}
		},false);
	}
	
	
	EventUtil.add(document,'click',function(e){
		ClassUtil.remove(DropButton,"up");
		if(e.stopPropagation){
			e.stopPropagation();//阻止冒泡
		}else{
			e.cancelBubble=true;
		}
	},false);
}



/*----------------------------
  Scroll bar
----------------- */
var ScrollBar =  {
	add:function(element,Top,Left){
		new scrollBarY(element,Top);
	}
}

/*
EventUtil.add(window,'load',function(){ 
	var ele=document.querySelectorAll("div[ScrollBarY='true']"); 
	for(var i = 0; i < ele.length;i++){ 
		//ScrollBar.add(ele[i]);
	}
});
*/
	
function scrollBarY(ParentDiv,Top,Left){
	
	this.box = document.createElement("div");
	this.bar = document.createElement("div");
	this.page = ParentDiv;
	Top = Top || ParentDiv.offsetTop;
	Left = Left || (this.page.offsetWidth + this.page.offsetLeft -6);
	
	StyleUtil.set(this.page,"overflow-y","hidden");
	
	ClassUtil.add(this.box,"ScrollBar");
	StyleUtil.set(this.box,"height",(ParentDiv.offsetHeight-2) + "px");
	StyleUtil.set(this.box,"left",Left + "px");
	StyleUtil.set(this.box,"top",Top + "px");
	ParentDiv.parentNode.appendChild(this.box);
	
	
	ClassUtil.add(this.bar,"bar");
	StyleUtil.set(this.bar,"height",ParentDiv.offsetHeight /ParentDiv.scrollHeight * ParentDiv.offsetHeight  + "px");
	this.box.appendChild(this.bar);
	
	scrollBarY.prototype.resize = function(){
		
		StyleUtil.set(this.box,"height",this.page.offsetHeight + "px");
		StyleUtil.set(this.box,"left",(this.page.offsetWidth + this.page.offsetLeft -6) + "px");
		
		StyleUtil.set(this.bar,"height",this.page.offsetHeight /this.page.scrollHeight * this.page.offsetHeight  + "px");
		StyleUtil.set(this.bar,"margin-top",(this.page.scrollTop/this.page.scrollHeight * this.page.offsetHeight) + "px");
		
		if(this.page.offsetHeight >= this.page.scrollHeight){
			StyleUtil.set(this.box,"display","none");
			StyleUtil.set(this.bar,"display","none");
			
			
			if(navigator.userAgent.indexOf("Firefox")>=0){
				//StyleUtil.set(this.page,"overflow-y","scroll"); 
			}
		}else{			
			StyleUtil.set(this.box,"display","block");
			StyleUtil.set(this.bar,"display","block");
		}
	}
	
	
	var _this = this; 
	var startTop = 0;
	
	this.isClickDown = false;
	scrollBarY.prototype.ActivePage = null;
	
	
	EventUtil.add(this.page,'mouseover',function(){
		_this.ActivePage = _this.page;
		_this.resize();
		StyleUtil.set(_this.box,"opacity",0.5);
		
	});
	
	EventUtil.add(this.page,'mouseout',function(){ 
		if(!_this.isClickDown){ 
			StyleUtil.set(_this.box,"opacity",0);
			_this.ActivePage = null;
		}
	});
	
	//mouse click down 
	EventUtil.add(this.bar,'mousedown',function(e){
		_this.isClickDown = true;
		startTop = e.clientY;
		_this.resize();
	});
	
	EventUtil.add(this.box,'mouseover',function(){
		_this.ActivePage = _this.page;
		_this.resize();
		StyleUtil.set(this,"opacity",0.8);
		
	});
	
	EventUtil.add(this.box,'mouseout',function(e){ 
		if(!_this.isClickDown){
			StyleUtil.set(this,"opacity",0.5);
			_this.ActivePage = null;
		}
	});
	
	//mouse up
	EventUtil.add(window,'mouseup',function(e){
		_this.isClickDown = false;
		_this.resize();
		StyleUtil.set(_this.box,"opacity",0.5);		
	}); 
	
	
	//mouse drag event
	EventUtil.add(window,'mousemove',function(e){
		if(_this.isClickDown){ 
			console.log("mouse drag...");
			var CurBarTop = ParentDiv.scrollTop/ParentDiv.scrollHeight * ParentDiv.clientHeight;
			var MoveScrollLen = (e.clientY - startTop)/ ParentDiv.clientHeight * ParentDiv.scrollHeight;
			window.getSelection?window.getSelection().removeAllRanges():document.selection.empty(); 
			
			
			if((ParentDiv.scrollTop + MoveScrollLen) >= (ParentDiv.scrollHeight-ParentDiv.clientHeight)){
				ParentDiv.scrollTop = ParentDiv.scrollHeight - ParentDiv.clientHeight;
				StyleUtil.set(_this.bar,"margin-top",((ParentDiv.scrollTop)/ParentDiv.scrollHeight * ParentDiv.clientHeight) + "px");
				
				
				startTop = e.clientY;
			}else if((ParentDiv.scrollTop + MoveScrollLen) <= 0){
				ParentDiv.scrollTop = 0;
				StyleUtil.set(_this.bar,"margin-top","0px");
				
				startTop = e.clientY;
			}else{
				ParentDiv.scrollTop = (ParentDiv.scrollTop + MoveScrollLen);
				StyleUtil.set(_this.bar,"margin-top",(CurBarTop + (e.clientY - startTop)) + "px");
				
				startTop = e.clientY;
			}
		}
	});
	 
	
	
	EventUtil.add(this.box,'click',function(e){
		
		var CurBarTop = ParentDiv.scrollTop/ParentDiv.scrollHeight * ParentDiv.clientHeight;
		var curBoxTop = getDOMDistance(ParentDiv,"top");
		
		if((e.clientY- curBoxTop) < CurBarTop || (e.clientY-curBoxTop) > CurBarTop + _this.bar.clientHeight){ 
			var MoveScrollLen = 90;
			
			if((e.clientY-curBoxTop) < CurBarTop ){
				MoveScrollLen *= -1;
			}else if((e.clientY-curBoxTop) > CurBarTop + _this.bar.offsetHeight){
				MoveScrollLen = Math.abs(MoveScrollLen);
			}
			
			var destTop = 0;
			if((ParentDiv.scrollTop + MoveScrollLen) > (ParentDiv.scrollHeight-ParentDiv.offsetHeight)){
				destTop = (ParentDiv.scrollHeight - ParentDiv.offsetHeight);
			}else if((ParentDiv.scrollTop + MoveScrollLen) < 0){
				destTop = 0;
			}else{
				destTop = (ParentDiv.scrollTop + MoveScrollLen);  
			}
			
			
			//calculate step 
			var step = 3;
			if(ParentDiv.scrollHeight * 0.1 > 20){
				step = 20;
			}else if(ParentDiv.scrollHeight * 0.1 > 3){
				step = ParentDiv.scrollHeight * 0.1;
			} 
			
			var ani = setInterval(function(){
				if(destTop>ParentDiv.scrollTop){
					ParentDiv.scrollTop += step;
					StyleUtil.set(_this.bar,"margin-top",ParentDiv.scrollTop/ParentDiv.scrollHeight * ParentDiv.offsetHeight + "px");
					
					if(ParentDiv.scrollTop>=destTop){
						clearInterval(ani);
					}
				}else{
					ParentDiv.scrollTop -= step;
					StyleUtil.set(_this.bar,"margin-top",ParentDiv.scrollTop/ParentDiv.scrollHeight * ParentDiv.offsetHeight + "px");
					
					if(ParentDiv.scrollTop<=destTop){
						clearInterval(ani);
					}
				}
				
			},20);
			
		}
		
	});
	
	scrollBarY.prototype.isWheeling = false;
	
	
	var wheel = function(e){ 
		_this.resize();
		if(_this.page === _this.ActivePage && !_this.isWheeling){
			e.preventDefault();//阻止窗口默认的滚动事件 
			
			var destTop = 100;
			_this.isWheeling = true;
			
			
			if(e.wheelDelta){
				//* (e.wheelDelta/120);
				if(e.wheelDelta>0) {
					destTop *= -1;  
				}else{
					destTop *= 1;  
				}
				
            } else if(e.detail) {
				//(e.detail/3);
				if(e.detail>0) {
					destTop *= 1;  
				}else{
					destTop *= -1;  
				}
			}
			
			//count destination scrollTop
			if(_this.page.scrollTop + destTop >= (_this.page.scrollHeight- _this.page.offsetHeight)){
				destTop = _this.page.scrollHeight - _this.page.offsetHeight;
			}else if(_this.page.scrollTop + destTop <= 0){
				destTop = 0 
			}else{
				destTop += _this.page.scrollTop;
			}
			
			//calculate step
			var step = 5;
			if(ParentDiv.scrollHeight * 0.1 > 10){
				step = 10;
			}else if(ParentDiv.scrollHeight * 0.1 > 5){
				step = ParentDiv.scrollHeight * 0.1;
			}
			
			var ani2 = setInterval(function(){
				
				if(destTop > _this.page.scrollTop){
					_this.page.scrollTop += step;
					StyleUtil.set(_this.bar,"margin-top",_this.page.scrollTop/_this.page.scrollHeight * _this.page.offsetHeight + "px");
					
					if(_this.page.scrollTop>=destTop){ 
						clearInterval(ani2);
						_this.isWheeling = false;
					}
				}else if(destTop < _this.page.scrollTop) {
					_this.page.scrollTop -= step;
					StyleUtil.set(_this.bar,"margin-top",_this.page.scrollTop/_this.page.scrollHeight * _this.page.offsetHeight + "px");
					
					if(_this.page.scrollTop<=destTop){
						clearInterval(ani2);
						_this.isWheeling = false;
					}
				}else{
					clearInterval(ani2);
					_this.isWheeling = false;
				} 
				
			},15);
			
		}
		
	}

	EventUtil.add(window,'DOMMouseScroll',wheel); 
	EventUtil.add(window,'mousewheel',wheel);
	
	EventUtil.add(window,"resize",function(){
		_this.resize();
	});
	
	/*
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	var observer = new MutationObserver(callback);
	observer.observe(element,{
		attributes:true,
		attributeFilter:['style'],
		attributeOldValue:true}
	);
	*/
}


/* ------------------
	Date Period picker  
	
*/
function DatePeriodPicker(Element,PeriodType,style,startDay){
	
	ClassUtil.add(Element,"DatePicker");
	this.html = Element;
	this.style = style || 1;
	this.PeriodType = PeriodType.toLowerCase() || "month";
	this.BaseDate = startDay || new Date();
	var _this = this;
	
	
	DatePeriodPicker.prototype.chagePeriodType = function(NewValue){
		this.PeriodType = NewValue;
		this.fillDate();
	};
	
	DatePeriodPicker.prototype.chageDate =function(NewDate){
		this.BaseDate = NewDate;
		this.fillDate();
	}
	
	DatePeriodPicker.prototype.fillDate = function(){
		
		if(style == 1){
			if(this.PeriodType=="day"){
				this.MainBox.innerHTML = DateUtil.format(this.BaseDate,"yyyy/mm/dd");
			}else if(this.PeriodType=="week"){
				this.MainBox.innerHTML = DateUtil.format(this.BaseDate,"yyyy/mm/dd");
			}else if(this.PeriodType=="month"){
				this.MainBox.innerHTML = DateUtil.format(this.BaseDate,"yyyy mmm");
			}else if(this.PeriodType=="year"){
				this.MainBox.innerHTML = DateUtil.format(this.BaseDate,"yyyy");
			}
		}else if(style == 2){
			if(this.PeriodType=="day"){
				this.StartDay.innerHTML = DateUtil.format(this.BaseDate,"yyyy/mm/dd");
				this.EndDay.innerHTML = DateUtil.format(this.BaseDate,"yyyy/mm/dd");
			}else if(this.PeriodType=="week"){
				this.StartDay.innerHTML = DateUtil.format(DateUtil.getWeekStartDay(this.BaseDate),"yyyy/mm/dd");
				this.EndDay.innerHTML = DateUtil.format(DateUtil.getWeekEndDay(this.BaseDate),"yyyy/mm/dd");
			}else if(this.PeriodType=="month"){
				this.StartDay.innerHTML = DateUtil.format(DateUtil.getMonthStartDay(this.BaseDate),"yyyy/mm/dd");
				this.EndDay.innerHTML = DateUtil.format(DateUtil.getMonthEndDay(this.BaseDate),"yyyy/mm/dd");
			}else if(this.PeriodType=="year"){
				this.StartDay.innerHTML = DateUtil.format(new Date(this.BaseDate.getFullYear(), 0, 1),"yyyy/mm/dd");
				this.EndDay.innerHTML = DateUtil.format(new Date(this.BaseDate.getFullYear(), 11, 31),"yyyy/mm/dd");
			}
		}
	}
	
	
	//button previous
	var btnOuter = document.createElement("span");
	ClassUtil.add(btnOuter,"Button"); 
	this.BtnPrev = document.createElement("a");
	ClassUtil.add(this.BtnPrev,"pre");
	btnOuter.appendChild(this.BtnPrev);
	Element.appendChild(btnOuter);
	
	EventUtil.add(this.BtnPrev,"click",function(){
		if(_this.PeriodType=="day"){
			_this.BaseDate.setDate(_this.BaseDate.getDate()-1);
		}else if(_this.PeriodType=="week"){
			_this.BaseDate.setDate(_this.BaseDate.getDate()-7);  
		}else if(_this.PeriodType=="month"){
			_this.BaseDate = new Date(_this.BaseDate.getFullYear(), (_this.BaseDate.getMonth()-1), _this.BaseDate.getDate());
		}else if(_this.PeriodType=="year"){
			_this.BaseDate = new Date(_this.BaseDate.getFullYear()-1, _this.BaseDate.getMonth(), _this.BaseDate.getDate());
		}
		_this.fillDate();
	});
	
	
	
	if(style == 1){
		this.MainBox = document.createElement("span"); 
		ClassUtil.add(this.MainBox,"DateInput");
		
	}else if(style == 2){
		this.MainBox = document.createElement("div"); 
		ClassUtil.add(this.MainBox,"DateBox");
		var a = document.createElement("a"); 
		this.MainBox.appendChild(a);
		
		this.StartDay = document.createElement("span"); 
		ClassUtil.add(this.StartDay,"DateInput");
		a.appendChild(this.StartDay);
		
		
		var span = document.createElement("span");
		span.innerHTML = "-";
		a.appendChild(span);
		
		
		this.EndDay = document.createElement("span"); 
		ClassUtil.add(this.EndDay,"DateInput");
		a.appendChild(this.EndDay); 
	};
	
	this.fillDate();
	Element.appendChild(this.MainBox); 
	
	//button next
	var btnOuter = document.createElement("span");
	ClassUtil.add(btnOuter,"Button");
	this.BtnNext = document.createElement("a");
	ClassUtil.add(this.BtnNext,"next");
	btnOuter.appendChild(this.BtnNext);
	Element.appendChild(btnOuter);  
	
	EventUtil.add(this.BtnNext,"click",function(){
		if(_this.PeriodType=="day"){
			_this.BaseDate.setDate(_this.BaseDate.getDate()+1);
		}else if(_this.PeriodType=="week"){ 
			_this.BaseDate.setDate(_this.BaseDate.getDate()+7);  
		}else if(_this.PeriodType=="month"){
			_this.BaseDate = new Date(_this.BaseDate.getFullYear(), (_this.BaseDate.getMonth()+1), _this.BaseDate.getDate());
		}else if(_this.PeriodType=="year"){
			_this.BaseDate = new Date(_this.BaseDate.getFullYear()+1, _this.BaseDate.getMonth(), _this.BaseDate.getDate());
		}
		_this.fillDate();
	});
	
}



/* ------------------
	Modal Dialog Window  
	
*/


var DialogType = {
  YESNO: 1,
  YESONLY: 2
};

var DialogOption = {
  YES: 1,
  NO: 2, 
  NULL:0
};

var Dialog = function(){
	
	//background 
	var MaskBack = document.createElement("div"); 
	ClassUtil.add(MaskBack,"MaskBack");
	document.body.appendChild(MaskBack);
	
	
	//dialog body
	var DialogBody = document.createElement("div");
	ClassUtil.add(DialogBody,"DialogBody");
	document.body.appendChild(DialogBody);
	
	//dialog title
	var TopBar = document.createElement("div");
	ClassUtil.add(TopBar,"title");
	DialogBody.appendChild(TopBar);
	
	//dialog description
	var Descb = document.createElement("div");
	ClassUtil.add(Descb,"description");	
	DialogBody.appendChild(Descb);
	
	//close button
	var btnClose = document.createElement("div");
	ClassUtil.add(btnClose,"close");
	var a = document.createElement("a");
	btnClose.appendChild(a);
	a.innerHTML = "X"
	DialogBody.appendChild(btnClose);
	 
	
	var _this = this;
	
	EventUtil.add(btnClose,'click',function(){ 
		StyleUtil.set(MaskBack,"display","none");
		StyleUtil.set(DialogBody,"display","none");
	});
	
	//option buttons
	var ButtonBar = document.createElement("div");
	ClassUtil.add(ButtonBar,"FucButtonArea");
	DialogBody.appendChild(ButtonBar);
	
	//button yes
	var btnYes = document.createElement("a");
	btnYes.innerHTML = "Yes";
	ButtonBar.appendChild(btnYes);
	
	
	EventUtil.add(btnYes,'click',function(){
		StyleUtil.set(MaskBack,"display","none");
		StyleUtil.set(DialogBody,"display","none");
		
		if(_this.tmpEventYes!=null){
			_this.tmpEventYes();
			btnYes.removeEventListener("click",_this.tmpEventYes);
		}
	}); 
	
	
	//button No
	var btnNo = document.createElement("a");
	btnNo.innerHTML = "No";
	ButtonBar.appendChild(btnNo); 
	
	EventUtil.add(btnNo,'click',function(){  
		StyleUtil.set(MaskBack,"display","none");
		StyleUtil.set(DialogBody,"display","none");
		
		if(_this.tmpEventNo!=null){
			_this.tmpEventNo();
			btnYes.removeEventListener("click",_this.tmpEventNo);
		}
	});  
				
	
	this.show = function(title,description,type,EventYes,EventNo){ 
		TopBar.innerHTML = title;
		Descb.innerHTML = description;
		
		StyleUtil.set(MaskBack,"display","block");
		StyleUtil.set(DialogBody,"display","block");
		
		
		if(EventYes!=null){
			this.tmpEventYes = EventYes;
		}
		
		if(type==DialogType.YESONLY){
			StyleUtil.set(btnNo,"display","none");
			
		}else if(type==DialogType.YESNO){
			StyleUtil.del(btnNo,"display");
			if(EventNo!=null){
				this.tmpEventNo = EventNo;
			}
			
		}
	}
	
}





/* ----------------------------
	Modal Window 
 ---------------*/

function createWin(ElementID,impChooser,titleName,hasSearch){
	
	//=======================================
	//0. background
	var MaskBack = document.createElement("div");
	ClassUtil.add(MaskBack,"MaskBack");
	
	document.body.appendChild(MaskBack);
	impChooser.mask = MaskBack;
	
	var ChooserBody = document.createElement("div");
	ChooserBody.setAttribute("id",ElementID);
	ClassUtil.add(ChooserBody,"Chooser");
	
	document.body.appendChild(ChooserBody);
	impChooser.body = ChooserBody;
	
	
	//=======================================
	//1. Top element
	var top = document.createElement("div");
	ClassUtil.add(top,"top");
	
	ChooserBody.appendChild(top);
	
	//1.1. title
	var line = document.createElement("div");
	ClassUtil.add(line,"title");
	line.innerHTML = titleName;
	top.appendChild(line);
	
	
	//1.2. close button
	
	var btnClose = document.createElement("div"); 
	var a = document.createElement("a");
	btnClose.appendChild(a);
	ClassUtil.add(btnClose,"btn");
	ClassUtil.add(btnClose,"close");
	a.innerHTML="X";
	ChooserBody.appendChild(btnClose);
	
	EventUtil.add(btnClose,'click',function(){
		StyleUtil.set(MaskBack,"display","none");
		StyleUtil.set(ChooserBody,"display","none");
	});
	
	
	EventUtil.add(MaskBack,'click',function(){
		StyleUtil.set(MaskBack,"display","none");
		StyleUtil.set(ChooserBody,"display","none");
	});
	
	
	//--------------------------------  
	//1.3. search box
	if(hasSearch){
		var line = document.createElement("div");
		ClassUtil.add(line,"search");
		top.appendChild(line);
		
		var cell = document.createElement("div");
		line.appendChild(cell);
		
		var inputSearch = document.createElement("input");
		inputSearch.setAttribute("type","text");
		cell.appendChild(inputSearch);
		impChooser.inputSearch = inputSearch;
		 
		
		EventUtil.add(inputSearch,'keydown',function(e){ 
			if(e.code == "Enter"){
				impChooser.search(this.value); 
			}
		});
	
		
		//button
		var cell = document.createElement("div");
		ClassUtil.add(cell,"button");
		line.appendChild(cell);
		
		var btnSearch = document.createElement("a"); 
		
		EventUtil.add(btnSearch,'click',function(e){ 
			impChooser.search(inputSearch.value);
		}); 
		
		cell.appendChild(btnSearch);
	}
	
	//=======================================
	//2. event
	
	impChooser.hide = function(){
		StyleUtil.set(MaskBack,"display","none");
		StyleUtil.set(ChooserBody,"display","none");
	}
	
	impChooser.show = function(){
		StyleUtil.set(MaskBack,"display","block");
		StyleUtil.set(ChooserBody,"display","block");
	}
	
}





/*=======================
// Chooser Window
//
==================*/


/* ---------------
	Chooser Item 
*/  

function createChooserItem(impItem, data, parentUL){
	
	var line  = document.createElement("li"); 
	impItem.html = line; 
	
	for(var i = 0; i< data.length;i++){
		var cell = document.createElement("span");
		cell.innerHTML = data[i].value;
		cell.setAttribute("title",data[i].value);
		StyleUtil.set(cell,"width",data[i].width + "px");
		
		
		if(data[i].style!=null){ 
			ClassUtil.add(cell,data[i].style);
		}
		
		line.appendChild(cell);
	}
	
	parentUL.appendChild(line);
	
	EventUtil.add(line,'click',function(e){
		var _this = null;
		
		if(document.addEventListener){
			_this = this;
		}else if(document.attachEvent){
			_this = e.srcElement;
			
			console.log(_this.tagName);
			console.log(_this.nodeName);
			
			while(_this.nodeName.toLowerCase()!="li"){
				_this = _this.parentNode;
			}
		} 
			
		if(ClassUtil.has(_this,"on")){
			ClassUtil.remove(_this,"on");
		}else{
			for(var i =0 ;i < parentUL.children.length;i++){
				ClassUtil.remove(parentUL.children.item(i),"on");
			}
			ClassUtil.add(_this,"on"); 
			impItem.parent.select = impItem.code;
		}
	});
	
	
	EventUtil.add(line,'keypress',function(e){ 
		alert(e.code);
		/*
		if(e.code=="Enter"){
			impItem.choose();
		}
		*/
	});
	
}
 

/* ---------------
	Chooser Window 
*/  

function createChooser(impChooser){
	//--------------------------------  
	//1.Main content
	
	var outer = document.createElement("div");
	
	var ul = document.createElement("ul");
	ClassUtil.add(ul,"list");
	outer.appendChild(ul);
	impChooser.body.appendChild(outer);
	
	
	ScrollBar.add(ul,85); 
	impChooser.ul = ul;
	impChooser.selected = new DataSet();
	impChooser.select = "";
	impChooser.map = new Collection();
	
	//=================================
	//2. Turn page area
	
	impChooser.pageSwitcher = new PageArea(impChooser);
	impChooser.NoPerPage = 50;
	
	
	impChooser.clear = function(){
		var len = impChooser.ul.children.length
		for(var i=0;i< len;i++){
			impChooser.ul.removeChild(impChooser.ul.children[0]);
		}
		
		impChooser.map.clear();
	}
}


//=========================================
//General expand list object
//=========================================


/* ---------------
	ExpandItem 
*/ 

function ExpandItem(impObj,title,ParentHtml){
	
	this.title = title;
	
	//==================================
	// 1.create html element
	
	//  1.1. item
	var Item = document.createElement("ul"); 
	ParentHtml.appendChild(Item);
	impObj.Item = Item;
	
	
	// 1.2. detail
	var DetailInfo = document.createElement("div");
	ClassUtil.add(DetailInfo,"detail");
	StyleUtil.set(DetailInfo,"display","none");
	
	ParentHtml.appendChild(DetailInfo);
	impObj.Detail = DetailInfo;
	
	
	//1.3. event
	var Expand = function(isExpand){
		isExpand = isExpand || false;
		if(isExpand){
			StyleUtil.set(DetailInfo,"display","block");
			StyleUtil.set(Item,"display","none");
		}else{
			StyleUtil.set(DetailInfo,"display","none");
			StyleUtil.set(Item,"display","block");
		}
	}
	
	impObj.show = function(isDisplay){
		Expand(isDisplay);
	}
	
	//==================================
	//2. fill content 
	
	//--------------------------
	//2.1. item 
	
	var cell = document.createElement("li");
	ClassUtil.add(cell,"name");
	
	cell.innerHTML = this.title;
	cell.setAttribute("title",this.title);
	Item.appendChild(cell);
	
	var expandBtn = document.createElement("a");
	ClassUtil.add(expandBtn,"slide");
	ClassUtil.add(expandBtn,"slide_down");
	
	
	EventUtil.add(expandBtn,'click',function(){ 
		Expand(true);
	}); 
	
	Item.appendChild(expandBtn);
	impObj.BtnSlide = expandBtn;
	
	
	//--------------------------
	//2.2. detail  
	
	// - top bar 
	var line = document.createElement("div");
	ClassUtil.add(line,"bar");
	DetailInfo.appendChild(line);
	
	cell = document.createElement("span");
	cell.innerHTML = this.title;
	cell.setAttribute("title",this.title);
	ClassUtil.add(cell,"name");
	
	line.appendChild(cell);
	
	
	cell = document.createElement("a");
	ClassUtil.add(cell,"slide");
	ClassUtil.add(cell,"slide_up");
	line.appendChild(cell); 
	
	EventUtil.add(cell,'click',function(){ 
		Expand(false);
	});
	
	
	// - detail content
	var div = document.createElement("div");
	ClassUtil.add(div,"content");
	
	DetailInfo.appendChild(div);
	
	line = document.createElement("div");
	div.appendChild(line);
	impObj.content = div;
	
	var EventsList = new Collection();
	var _this = this;
	
	
	ExpandItem.prototype.load = function(data,delEvent){
		
		if(delEvent!=null){
			var delBtn = document.createElement("div");
			ClassUtil.add(delBtn,"remove");
			var a = document.createElement("a");
			delBtn.appendChild(a);
			
			EventUtil.add(delBtn,'click',function(){ 
				delEvent();
			});
		}
		
		for(var i = 0;i< data.length;i++){
			//create line
			var line = document.createElement("div");
			div.appendChild(line);
			
			for(var j = 0;j < data[i].length;j++){
				//create cell
				
				//label
				if(data[i][j].name!=null){
					var cell = document.createElement("span");
					cell.innerHTML= data[i][j].name + ":";
					ClassUtil.add(cell,"label");
					line.appendChild(cell);
				}
				
				
				//value
				cell = document.createElement("span");
				
				if(data[i][j].type=="input" && impObj.state.toLowerCase()=="new"){
					var input = document.createElement("input");
					input.setAttribute("type","text");
					input.setAttribute("name",data[i][j].name);
					input.value = data[i][j].value;
					
					if(data[i][j].width!=null){
						StyleUtil.set(input,"width",(data[i][j].width-5) + "px");
					}
					
					if(data[i][j].event!=null){
						EventsList.set(data[i][j].name,data[i][j].event);
						
						EventUtil.add(input,'change',function(){
							
							var _this = null;
							if(document.addEventListener){ 
								_this = this;
							}else if(document.attachEvent){
								_this = e.srcElement;
							}
		
							EventsList.get(_this.getAttribute("name"))(_this);
						});
	
					}
					
					cell.appendChild(input);
					
				}else{
					cell.innerHTML= data[i][j].value; 
				}
				if(data[i][j].width!=null){
					StyleUtil.set(cell,"width",data[i][j].width + "px");
				}
					
				if(data[i][j].style!=null){
					ClassUtil.add(cell,data[i][j].style);
				}
				line.appendChild(cell);
			}
			
			if(delBtn!=null){
				if(i == data.length-1){
					line.appendChild(delBtn);
				}
			}
		}
	}
	
	this.clearHtml = function(){
		ParentHtml.removeChild(DetailInfo);
		ParentHtml.removeChild(Item);
	}
}



/* ---------------
	InputSearchBox 
*/ 


function createInputSearchBox(input,searchFunc){
	ClassUtil.add(input,"DynInput");
	input.setAttribute("type","text");
	input.setAttribute("value","add new ..."); 
	StyleUtil.set(input,"color","#ccc");
	
	
	EventUtil.add(input,'keydown',function(e){ 
		if(e.key =="Enter"){
			searchFunc();
		}  
	});
	
	EventUtil.add(input,'focus',function(e){ 
		var _this = null;
		
		if(document.addEventListener){
			_this = this;
		}else if(document.attachEvent){
			_this = e.srcElement;
		}
		StyleUtil.set(_this,"color","#333");
		
		if(_this.value == "add new ..."){
			_this.value = "";
		}  
	}); 
	
	EventUtil.add(input,'blur',function(e){ 
		var _this = null;
		if(document.addEventListener){
			_this = this;
		}else if(document.attachEvent){
			_this = e.srcElement;
		}
		
		if(_this.value == ""){
			_this.value = "add new ...";
			StyleUtil.set(_this,"color","#ccc");
			
		} 
	}); 

	EventUtil.add(input,'dblclick',function(){ 
		searchFunc();
	});  
}