<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<head> 
	<link rel="stylesheet" type = "text/css" href="style/main.css">
	<link rel="stylesheet" type = "text/css" href="style/CommonUI.css">
	<link rel="stylesheet" type = "text/css" href="style/Dashboard.css">
	
	<script type="text/javascript" src = "script/BarLineChart.js"></script>
	<script type="text/javascript" src = "script/CommonUtil.js"></script>
	<script type="text/javascript" src = "script/CommonUI.js"></script>
	<script type="text/javascript" src = "script/Main.js"></script>
	
	<meta http-equiv="content-type" content = "txt/html;charset = utf-8" >
	<title> Cloud Clinic 1.0</title>
	<script>
		var objChart = new ChartCanvas();
		
		var BaseDay = new Date();
		var CustomDay = new Date(BaseDay);
		
		function getData(StartDay,EndDay){
	        var xmlReq;
			
	        if(window.XMLHttpRequest){//直接支持ajax
	            xmlReq=new XMLHttpRequest();
	        }else{//不直接支持ajax
	            xmlReq=new ActiveObject('Microsoft.XMLHTTP');
	        }
			
			xmlReq.onreadystatechange=function(){
				if (xmlReq.readyState==4&&xmlReq.status==200) {
					var result=xmlReq.responseText;
					return result;
				}
			};
			
			//创建异步get请求
			var url="VisitorServlet?StartDay="+ StartDay + "&EndDay=" + EndDay + "&DoctorID=1";
			xmlReq.open("GET",url,true);
			xmlReq.send();
		
		}
		
			  
			  
		function loadChart(TimeType, CurDate){
			CurDate = CurDate || new Date();
			var tmpDate = new Date(CurDate);
			
			if(TimeType.toLowerCase() == 'week'){
			
				//data value 
				
				var DataList = {
					Total: [90,112,121,103,158,180,152],
					Doctor:[5,15,6,10,21,26,36]
				} 
				
				/*
				DataList = {
					Total: [0,0,0,0,0,0,0],
					Doctor:[0,0,0,0,0,0,0],
				} 
				*/
				//var DataList = getData(HtmlStartDay.innerHTML, HtmlEndDay.innerHTML);
				
				
				objChart.drawChart({
					type: 'bar',
					
					title: 'Vistors count  ' + DateUtil.format(DateUtil.getWeekStartDay(tmpDate),"mmm dd")  + " - " + DateUtil.format(DateUtil.getWeekEndDay(tmpDate),"mmm dd"),
				
					xLabels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
					data:[
						{
							category:"Total",
							list: DataList.Total,
							barcolor:"gray"
						},
						{
							category:"Me",
							list:DataList.Doctor,
							barcolor:"orange"
						}
					]
				});
				
			}else if(TimeType.toLowerCase() == 'month'){
				
				var x = new Array();
				
				for(i=1;i<= tmpDate.getDate(); i++){
					x.push((tmpDate.getMonth() + 1) + "." + i);
				}
				
				
				//data value
				var DataList = {
					Total: [95,110,118,98,150,185,150,80,101,125,102,160,176,132],
					Doctor:[8,18,10,12,18,26,36,8,12,10,12,20,30,30]
				}
				//var DataList = getData(HtmlStartDay.innerHTML, HtmlEndDay.innerHTML);
				
				objChart.drawChart({
					type: 'bar',
					title: 'Vistors count of ' + DateUtil.format(tmpDate,"yyyy mmm"),
					
					xLabels:['5.1','5.2','5.3','5.4','5.5','5.6','5.7','5.8','5.9','5.10','5.11','5.12','5.13','5.14'],
					data:[
						{
							category:"Total",
							list: DataList.Total,
							barcolor:"gray"
						},
						{
							category:"Me",
							list:DataList.Doctor,
							barcolor:"blue"
						}
					]
				});
				
			}else if(TimeType.toLowerCase() == 'year'){			
				
				//data value
				var DataList = {
					Total: [5210,3752,3580,3987,2105,4872,6638,5085,3614,5953,7523,6328],
					Doctor:[502,683,416,729,852,871,637,714,967,1021,902,1168]
				}
				//var DataList = getData(HtmlStartDay.innerHTML, HtmlEndDay.innerHTML);
				
				objChart.drawChart({
					type: 'bar',
					title: 'Vistors number of ' + tmpDate.getFullYear(),
					
					xLabels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
					data:[
						{
							category: "Total",
							list: DataList.Total,
							barcolor:"red"
						},
						{
							category: "Me",
							list:DataList.Doctor,
							barcolor:"blue"
						}
					]
				});
				 
			}
		}
	
	</script>
</head>

<body>
	<div id = "MainTop">
		<div class="box">
			<div>
				<h3 class="title">Cloud Clinic 1.0</h3>
			</div>
			<div id="UserInfo"></div>
		</div>
	</div>
	<div id = "MainBody">
		<div class="box">
			<div id = "MainMenu"></div>
			
			<div class = "MainPage">
				<div id = "TopBar">
					<div id = "ChartToggle"></div>
					<div id="DatePicker"></div>
					
				</div>
				<div id="ChartVisitors"></div>
				<div > more...</div>
			</div>
		</div>	
	</div>

	<Script>
		var oMain = new MainFrame("dashboard");
		var Chart = document.getElementById("ChartVisitors");  //ChartVisitors  Chart
		objChart.init(Chart);
			
		//chart toggle button
		var ChartTab = new TabButtons("ChartToggle",new Array("Week","Month","Year"));
		for(var i = 0; i < ChartTab.size(); i++){
			var btn = ChartTab.item(i);
			
			EventUtil.add(btn,"click",function(e){
				CustomDay = new Date(BaseDay);
				var _this = null;
				if(window.addEventListerner){
					var _this = this;
				}else{
					var _this = e.srcElement || e.target;
				}
				DatePicker.chagePeriodType(_this.innerHTML.toLowerCase());
				//DatePicker.chageDate(BaseDay); 
				loadChart(_this.innerHTML,BaseDay);
			});
			
		}
		
		loadChart("week",new Date());
		
		//Date period picker
		
		var DatePicker = new DatePeriodPicker(document.getElementById("DatePicker"),ChartTab.CurrentVal,2,BaseDay);
		
		EventUtil.add(DatePicker.BtnPrev,"click",function(){
			loadChart(ChartTab.CurrentVal,DatePicker.BaseDate);
		});
		
		EventUtil.add(DatePicker.BtnNext,"click",function(){	
			loadChart(ChartTab.CurrentVal,DatePicker.BaseDate);
		});
		
	</Script>

</body>

</html>