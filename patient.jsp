<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<head>
	<link rel="stylesheet" type = "text/css" href="style/CommonUI.css">
	<link rel="stylesheet" type = "text/css" href="style/main.css">
	<link rel="stylesheet" type = "text/css" href="style/patient.css"> 
	
	<script type="text/javascript" src = "script/CommonUtil.js"></script>
	<script type="text/javascript" src = "script/Main.js"></script>
	<script type="text/javascript" src = "script/CommonUI.js"></script>
	
	<meta http-equiv="content-type" content = "txt/html;charset = utf-8" >
	<title> Cloud Clinic 1.0</title>
</head>

<body>
	<div id="ErrInfo"> 
		<div>
			<h3>Sorry ... </h3>
			Fail to display on this browser.	<br/> 
		</div> 
	</div>
	
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
			
			<div class="MainPage">
				<div id = "MainList"> 
					<div id = "SearchBar">
						<div><input type = "text" value = "Search..."></div>
						<div class="button"></div>
					</div>
					<div id = "FuncBar">
						<div id="filter"></div> 
						<div id="sort"></div>
					</div>
					
					<div>
						<div id="PatientList"></div>
					</div>
				</div>
				
				<div id = "PatienDetail">
				
					<!--  1. basic information -->
					<ul id="PatientInfo">
						<li class="line">
							<span class="name"></span>
							<span class="gender"></span>
							<span class="age"></span> 
						</li> 
					</ul>
					
					<!--  2. navigation bar -->
					<div id="PatientTab"></div> 
					
					
					<!--  3. detail information -->
					<!--bottom bar-->
					<div id="PatientSettle" >
						<div class="SumPrice">
							<a>
								<span>Total: </span> 
								<span id="TotalPrice" class="price">$ 0.00</span>
								<span id="PaidPrice"> $ 0.00</span>  
							</a>
						</div>
						<div class="BtnSubmit">
							<a id="BtnSubmit">Submit</a>
						</div>
					</div>
					
					<div id="PatientTabPage" class="main">
						<!--  decription -->
						<div id="PatientDescription" >
							<div>
								<ul class="top">
									<li class="title icon ic_descb">Chief complaint </li>
								</ul>
								<div class="TextInputArea" id="RxCheif"></div>
							</div>
							
							<div>
								<ul class="top">
									<li class="title icon ic_history">Past medical history </li>
									<li class="func">Template</li>
								</ul> 
								<div class="TextInputArea" id="RxHisotry"></div>
							</div>
						</div>
						
						
						<!--  examination -->
						<div id="PatientExamination" >
							<div>
								<ul class="top">
									<li class="title icon ic_exam">Auxiliary Examinitations </li> 
								</ul>
								<div id = "examlist"></div>
							</div>
							<div>
								<ul class="top">
									<li class="title icon ic_check">Other Examinitations </li> 
								</ul>  
								
								<div class="TextInputArea" id="RxExamNote"></div> 
							</div>
						</div>
						
						
						<!--  diagnosis -->
						<div id="PatientDiagnosis" >
							<div>
								<ul class="top">
									<li class="title icon ic_diag">Standard Diagnose </li> 
								</ul>  
									
								<div id = "diagnlist"></div>
							</div>
							<div>
								<ul class="top">
									<li class="title icon ic_check">Diagnose instruction </li> 
								</ul>
								<div class="TextInputArea" id="RxDiagnosisNote"></div>
							</div>
						</div>
						
						<!--  prescription -->
						<div id="PatientTreatment" >
							
							<div>
								<ul class="top">
									<li class="title icon ic_drug">Drug prescription</li> 
								</ul> 
								<div id = "druglist"></div>
							</div>
							
							<div>
								<ul class="top">
									<li class="title icon ic_treat">Treatment prescription</li> 
								</ul> 
								<ul id = "treatlist"></ul>
							</div>
							
							<div>
								<ul class="top">
									<li class="title icon ic_check">Medical advice </li> 
								</ul> 
								<div class="TextInputArea" id="RxTreatNote"></div> 
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<script type="text/javascript" src="script/patient.js"></script>
	<Script>
		
		EventUtil.add(window,"load",function(){
			if(!checkBrowser()){
				StyleUtil.set(document.getElementById("ErrInfo"),"display","block"); 
				return false;
			}
	
			var Main = new MainFrame("patient");

			var SortBox = new DropBox("sort","Sort by No.", ["Sort by No.","Sort by name"]);
			var FilterBox = new DropBox("filter","All", ["All","Open","Finished"]);
			
			
			//Ajax request: get register data	
			var getReg = function(RegDate,DeptId,DoctorId,FilterState,OrderField,OrderType){
				var xmlReq;
		
				if(window.XMLHttpRequest){//suppport ajax
					xmlReq=new XMLHttpRequest();
				}else{//not suppport ajax
					xmlReq=new ActiveObject('Microsoft.XMLHTTP');
				}
				
				xmlReq.onreadystatechange=function(){
					if (xmlReq.readyState==4 && xmlReq.status==200) {
						var result = xmlReq.responseText;
						var data = eval("("+ result +")");
						console.log(data);
						PList.load(data); 
					}
				};
				
				//create 异步 get request
				var url = "RegisterServlet?date="+ RegDate|| DateUtil.format(new Date(),"yyyy-mm-dd");
				url += "&dept=" + DeptId;
				url += "&doctor=" + (DoctorId || "");
				url += "&state="  + (FilterState || "");
				url += "&orderfield=" + (OrderField || "") ;
				url += "&ordertype="  + (OrderType || "");
				
				xmlReq.open("GET",url,true);
				xmlReq.send();
			};
			
			
			
			EventUtil.add(FilterBox.Item("All"),"click",function(){
				getReg("2019-08-04",1,1,"all");
			});
			
			EventUtil.add(FilterBox.Item("Open"),"click",function(){
				getReg("2019-08-04",1,1,"open");
			}); 
			
			EventUtil.add(FilterBox.Item("Finished"),"click",function(){
				getReg("2019-08-04",1,1,"finished");
			}); 
			
			
			//patient list 
			var PList = new PatientList();
			getReg("2019-08-04",1,1);
			
			
			//detail tab toggle
			var DetailTab = new TabButtons("PatientTab",new Array("Description","Examination","Diagnosis","Treatment")); 
			
			var TabPages = document.getElementById("PatientTabPage");
			for(var i = 1; i < TabPages.children.length; i++){  
				StyleUtil.set(TabPages.children[i],"display","none");
			}
			
			for(var i =0;i< DetailTab.size();i++){
				var btn = DetailTab.item(i);
				
				EventUtil.add(btn,"click",function(e){
					for(var i = 0; i < TabPages.children.length; i++){ 
						StyleUtil.set(TabPages.children[i],"display","none"); 
					}
					
					if(document.addEventListener){
						var _this= this;
					}else if(document.attachEvent){
						var _this= e.srcElement || e.target; 
					}
					var page = document.getElementById("Patient" + _this.innerHTML);
					StyleUtil.set(page,"display","block"); 
					
				}); 	
			}
		});
		
	</Script>

</body>

</html>