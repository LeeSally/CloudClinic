


/*trim function */
String.prototype.trim = function () {
	var str = this;
	whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\ u3000' ;
	for ( var i = 0,len = str.length; i = 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i, 1);
			break ;
		}
	}
	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '' ;
}
 
 
/* -------------------
	Collection : 
	a list of key - value map 
	
*/
 
function Collection(){
	this.elements = new Array();
	
	Collection.prototype.size = function(){
		return this.elements.length;
	}
	
	
	Collection.prototype.has = function(key){
		for(var i=0;i< this.elements.length;i++){
			if(this.elements[i].key == key){
				return true;
			} 
		}
		return false;
	}
	
	Collection.prototype.remove = function(key){
		for(var i=0;i< this.elements.length;i++){
			if(this.elements[i].key == key){
				this.elements.splice(i,1);
				return true;
			} 
		}
		return false;
	}
	
	
	Collection.prototype.set = function(key,value){
		if(this.has(key)){
			return false
		}else{
			this.elements.push({
				key:key,
				value:value
			});
			
			return true;
		}
	}
	
	Collection.prototype.get = function(key){
		for(var i=0;i< this.elements.length;i++){
			if(this.elements[i].key == key){
				return this.elements[i].value;
			} 
		}
		return null;
	}
	
	Collection.prototype.item = function(no){
		if(no < this.elements.length){
			return this.elements[no].value; 
		}else{
			return null;
		} 
	}
	
	Collection.prototype.clear = function(){
		while(this.elements.length>0){
			this.elements.shift(); 
		}
	}
	
}

 

/* -------------------
	DataSet : 
	a set of data: no duplicated value
	
*/

 
function DataSet(){
	this.values = new Array();
	
	
	DataSet.prototype.size = function(){
		return this.values.length;
	}
	
	
	DataSet.prototype.has = function(value){
		for(var i=0;i< this.values.length;i++){
			if(this.values[i] == value){
				return true;
			} 
		}
		return false;
	}
	
	DataSet.prototype.get = function(no){
		if(no < this.size() && no >=0){
			return this.values[no]; 
		}else{
			return null;
		}
	}
	
	DataSet.prototype.remove = function(value){
		for(var i=0;i< this.values.length;i++){
			if(this.values[i] == value){
				this.values.splice(i,1);
				return true;
			} 
		}
		return false;
	}
	
	
	DataSet.prototype.add = function(value){
		
		if(this.has(value)){
			return false
		}else{
			this.values.push(value);
			return true;
		}
	}
	
	DataSet.prototype.clear = function(){
		for(var i=0;i< this.values.length;i++){
			this.remove(this.values[i]);
		}
	}
	
}
 


/* -------------------
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


/* -------------------
	Class change 
*/
var ClassUtil = {
	has:function(element,cls){
		var reg = new RegExp('(\\s+|^)' + cls + '(\\s+|$)');
		if(element.className.search(reg)>=0){
			return true;
		}else{
			return false;
		} 
	},
	
	add:function(element,cls){
		
		if(element.classList){
			element.classList.add(cls);
		}else{
			if(!ClassUtil.has(element,cls)){
				element.className = element.className + " " + cls;
			}
		}
	},
	
	remove:function(element,cls){
		if(ClassUtil.has(element,cls)){
			var reg = new RegExp('(\\s+|^)' + cls + '(\\s+|$)'); 
			element.className = element.className.replace(reg," "); 
		}
	},
	
	toggle:function(element,cls){
		if(ClassUtil.has(element,cls)){
			ClassUtil.remove(element,cls);
		}else{
			ClassUtil.add(element,cls);
		}
	}
}


/* -------------------
	Style change 
*/
var StyleUtil = {
	has:function(element,style){
		var reg = new RegExp('(;\\s*|\\s+|^)' + style + '\\s*:',"i");
		
		if(element.style.cssText.search(reg) >=0 ){
			return true;
		}else{
			return false;
		} 
	},
	
	set:function(element,style,val){
		try{
			if(element.style.setProperty){
				element.style.setProperty(style,val);
			}else{
				if(StyleUtil.has(element,style)){
					StyleUtil.del(element,style);
					element.style.cssText = element.style.cssText + ";" + style + ":" + val + ";";
					
				}else{
					if(element.style.cssText.length == 0){
						element.style.cssText = style +":" + val +";";
					}else{
						element.style.cssText = element.style.cssText.trim() + ";" + style +":" + val +";";
					}
				}
			}
		}
		catch(err){
			console.log("Fail to set style: " + style +  ":" + val);
			console.log(err);
		}
	},
	
	get:function(element,style){
		if(element.style.getPropertyValue){
			return element.style.getPropertyValue(style);
		}else{
			var reg = new RegExp('(;\\s*|\\s+|^)' + style + '\\s*:[^\n\r;]+(;|$)',"i");  
			var match = element.style.cssText.match(reg)[0].split(":")[1].replace(";","");
			return match;
		}
	},
	
	del:function(element,style){
		if(StyleUtil.has(element,style)){
			var reg = new RegExp('(;\\s*|\\s+|^)' + style + '\\s*:[^\n\r;]+(;|$)',"i");
			element.style.cssText = element.style.cssText.replace(reg," "); 
		}
	}
}

/* -------------------
	Date Util
*/
var DateUtil = {
	getDate:function(DateStr){
		
		if(DateStr.getFullYear){
			return DateStr;
		}else{
			var tmpArr = null;
			var tempDate = null;
			
			if(DateStr.indexOf("/") >= 0){
				tmpArr = DateStr.split("/");
			}else if(DateStr.indexOf(".") >= 0){
				tmpArr = DateStr.split(".");
			}else if(DateStr.indexOf("-") >= 0){
				tmpArr = DateStr.split("-");
			}
			
			
			if(tmpArr.length==3){
				var year = tmpArr[0];
				var mon = tmpArr[1];
				var day = tmpArr[2];
				
				if( year>= 1000 && year <= 3000 && day >=0 && mon>=1 && mon <=12){ 
					if(mon == 1 || mon ==3 || mon ==5 || mon ==7 || mon ==8 || mon ==10 || mon ==12){
						if(day<=31){
							tempDate = new Date(year, mon-1, day); 
						}
					}else if(mon == 4 || mon ==6 || mon ==9 || mon ==11){
						if(day<=30){
							tempDate = new Date(year, mon-1, day); 
						}
					}else if(mon == 2){
						if((year%4==0 && year%100>0) || year%400==0){
							if(day<=29){
								tempDate = new Date(year, mon-1, day); 
							}
						}else{
							if(day<=28){
								tempDate = new Date(year, mon-1, day); 
							}
						}
					}
				}
			}
			
			return tempDate;
		}
	},
	
	format:function(date,formula){
		//judge date 
		this.date = DateUtil.getDate(date); 
		if(!this.date){
			return "";
		}
		
		
		this.year = this.date.getFullYear();
		this.month = (this.date.getMonth() + 1);
		this.day = this.date.getDate();
		
		
		this.formula = formula.toLowerCase();
		var DateStr = this.formula;
		
		//year
		if(this.formula.indexOf("yyyy") >=0){
			DateStr = DateStr.replace("yyyy",this.year);
		}else if (formula.indexOf("yy") >=0){
			DateStr = DateStr.replace("yy",this.year.toString().slice(2,4));
		}
		
		//month
		
		if(this.formula.indexOf("mmmm") >=0){
			var MonthStr = "";
			
			switch(this.month){
				case 1: MonthStr = "January";break;
				case 2: MonthStr = "February";break;
				case 3: MonthStr = "March";break;
				case 4: MonthStr = "April";break;
				case 5: MonthStr = "May";break;
				case 6: MonthStr = "June";break;
				
				case 7: MonthStr = "July";break; 
				case 8: MonthStr = "August";break;
				case 9: MonthStr = "September";break;
				case 10: MonthStr = "October";break;
				case 11: MonthStr = "November";break;
				case 12: MonthStr = "December";break;
			};
			DateStr = DateStr.replace("mmmm",MonthStr);
				
		}else if(this.formula.indexOf("mmm") >=0){
			var MonthStr = "";
			
			switch(this.month){
				case 1: MonthStr = "Jan";break;
				case 2: MonthStr = "Feb";break;
				case 3: MonthStr = "Mar";break;
				case 4: MonthStr = "Apr";break;
				case 5: MonthStr = "May";break;
				case 6: MonthStr = "Jun";break;
				
				case 7: MonthStr = "Jul";break; 
				case 8: MonthStr = "Aug";break;
				case 9: MonthStr = "Sep";break;
				case 10: MonthStr = "Oct";break;
				case 11: MonthStr = "Nov";break;
				case 12: MonthStr = "Dec";break;
			};
			DateStr = DateStr.replace("mmm",MonthStr);
			
		}else if(this.formula.indexOf("mm") >=0){
			if(this.month.toString().length == 2){
				DateStr = DateStr.replace("mm",this.month);
			}else if(this.month.toString().length <= 1){
				DateStr = DateStr.replace("mm", "0"+ this.month);
			}
			
		}else if (formula.indexOf("m") >=0){
			DateStr = DateStr.replace("m",this.month);
		}
		
		
		//day
		if(this.formula.indexOf("dd") >=0){
			if(this.day.toString().length == 2){
				DateStr = DateStr.replace("dd",this.day);
			}else if(this.day.toString().length <= 1){
				DateStr = DateStr.replace("dd", "0"+ this.day);
			} 
		}else if(this.formula.indexOf("d") >=0){
			DateStr = DateStr.replace("m",this.day);
		}
		
		return DateStr;
	},
	
	
	//start day of week
	getWeekStartDay: function(date){
		
		//judge date 
		this.date = DateUtil.getDate(date); 
		if(!this.date){
			return null;
		}
		
		var tmpDate = new Date(this.date);
		var weekDayNo = tmpDate.getDay()||7;
		tmpDate.setDate(tmpDate.getDate() - weekDayNo + 1);
		
		return tmpDate;
	},
	
	
	//end day of week
	getWeekEndDay: function(date){
		
		//judge date
		this.date = DateUtil.getDate(date);
		if(!this.date){
			return null;
		}
		
		var tmpDate = new Date(this.date);
		tmpDate = DateUtil.getWeekStartDay(this.date);
		tmpDate.setDate(tmpDate.getDate() + 6); 
		
		return tmpDate;
	},
	
	
	//start day of month
	getMonthStartDay: function(date){
		
		//judge date 
		this.date = DateUtil.getDate(date); 
		if(!this.date){
			return null;
		}
		
		var tmpDate = new Date(this.date);
		tmpDate.setDate(1);
		return tmpDate;
	},
	
	//end day of month
	getMonthEndDay: function(date){
		
		//judge date 
		this.date = DateUtil.getDate(date); 
		if(!this.date){
			return null;
		}
		
		tmpDate = new Date(this.date.getFullYear(), (this.date.getMonth()+1), 0);
		return tmpDate;
	}
}




