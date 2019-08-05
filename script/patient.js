

//=========================================
//General chooser object
//=========================================

function PageArea(parentChooser){
	
	var PageArea = document.createElement("div");
	ClassUtil.add(PageArea,"pageArea");
	
	
	var _this = this;
	
	this.html = PageArea;
	parentChooser.curPage = 1;
	parentChooser.MaxPage = 1;
	
	var line = document.createElement("ul");
	PageArea.appendChild(line);
	
	//---------------------------
	//1) button turn first
	var cell = document.createElement("li");
	ClassUtil.add(cell,"pagebtn");
	var a = document.createElement("a");
	ClassUtil.add(a,"first");
	cell.appendChild(a);
	line.appendChild(cell);
	
	
	EventUtil.add(a,'click',function(){ 
		if(parentChooser.curPage > 1){
			_this.turn(1);
		}
	}); 
	
	
	
	//---------------------------
	//2) button turn previous
	cell = document.createElement("li");
	ClassUtil.add(cell,"pagebtn"); 
	a = document.createElement("a");
	ClassUtil.add(a,"prev");
	cell.appendChild(a);
	line.appendChild(cell); 
	
	EventUtil.add(a,'click',function(){ 
		if(parentChooser.curPage > 1){
			_this.turn((Number(parentChooser.curPage) - 1)); 
		}
	});
	
	
	//---------------------------
	//3) input box turn page
	cell = document.createElement("li");
	ClassUtil.add(cell,"pagebox"); 
	var inputPage = document.createElement("input");
	inputPage.setAttribute("type","text");
	
	EventUtil.add(inputPage,'focus',function(){ 
		this.value = parentChooser.curPage;
	});
	
	EventUtil.add(inputPage,'blur',function(){ 
		if(!isNaN(this.value)){
			var DestPage = parentChooser.curPage;
			
			if(this.value < 1){
				DestPage = 1;
			}else if(this.value > parentChooser.MaxPage){
				DestPage = parentChooser.MaxPage;
			}else{
				DestPage = this.value;
			}
			_this.turn(DestPage);
		}else{
			this.value = parentChooser.curPage + " / " + parentChooser.MaxPage;
		}
	});
	
	cell.appendChild(inputPage);
	line.appendChild(cell);
	
	//---------------------------
	//4) button turn next
	cell = document.createElement("li");
	ClassUtil.add(cell,"pagebtn"); 
	a = document.createElement("a");
	ClassUtil.add(a,"next");
	cell.appendChild(a);
	line.appendChild(cell); 
	 
	EventUtil.add(a,'click',function(){ 
		if(parentChooser.curPage < parentChooser.MaxPage){
			_this.turn((Number(parentChooser.curPage) + 1));
		} 
	}); 
	
	//---------------------------
	//5) button turn last
	cell = document.createElement("li");
	ClassUtil.add(cell,"pagebtn");
	a = document.createElement("a");
	ClassUtil.add(a,"last");
	cell.appendChild(a);
	line.appendChild(cell);  
	
	EventUtil.add(cell,'click',function(){ 
		if(parentChooser.curPage < parentChooser.MaxPage){
			_this.turn(parentChooser.MaxPage);
		}
	});
	 
	parentChooser.body.appendChild(PageArea); 
	
	
	//================================
	//2. event
	
	//-------------------
	//turn page 
	this.turn = function(pageNo){
		//clear current result
		parentChooser.clear();
		
		parentChooser.turnPage(pageNo);
		parentChooser.curPage = Number(pageNo);
		inputPage.value = pageNo + " / " + parentChooser.MaxPage; 
	}; 
	
	var _this = this;
	
	parentChooser.search = function(keyWord){		
		parentChooser.keyWord = keyWord;
		parentChooser.inputSearch.value = keyWord;
		console.log("search..." + keyWord);
		
		_this.turn(1); 
		parentChooser.show();
	}
}





//=========================================
//price
//=========================================

function TotalPrice(){ 
	
	this.ExamList = new Collection();
	this.DrugList = new Collection();
	this.TreatList = new Collection();
	
	this.paidBox = document.getElementById("PaidPrice");
	this.totalBox = document.getElementById("TotalPrice");
	this.PriceBox = this.totalBox.parentNode;
	this.Bottom = document.getElementById("PatientSettle"); 
	
	var _this = this;
	
	
	createWin("PriceList",this,"Price Detail",false);
	
	//price detail window
	var scrollArea = document.createElement("div");
	this.body.appendChild(scrollArea);
	ClassUtil.add(scrollArea,"list");
	ScrollBar.add(scrollArea,80);
	
	var tbl = document.createElement("table");
	scrollArea.appendChild(tbl);
	var tr = document.createElement("tr");
	tbl.appendChild(tr);
	
	var th = document.createElement("th");
	th.setAttribute("width","50%");
	tr.appendChild(th);
	var th = document.createElement("th");
	th.setAttribute("width","15%");
	tr.appendChild(th);
	var th = document.createElement("th");
	th.setAttribute("width","10%");
	tr.appendChild(th);
	var th = document.createElement("th");
	th.setAttribute("width","15%");
	tr.appendChild(th);
	var th = document.createElement("th");
	th.setAttribute("width","10%");
	tr.appendChild(th);
	
	//total price
	var div = document.createElement("div");
	ClassUtil.add(div,"TotalTitle");
	
	var span = document.createElement("span");
	span.innerHTML = "Total Fees : ";
	ClassUtil.add(span,"label");
	
	div.appendChild(span);
	var span = document.createElement("span"); 
	span.setAttribute("id","CountTotalPrice");
	span.innerHTML = "0";
	div.appendChild(span);
	this.body.appendChild(div);
	
	var _this = this;
	var plus = function(data){
		if(data.state.toLowerCase() == "paid" || data.state.toLowerCase() == "checked"){
			_this.SumPaid += Number(data.price * data.qty); 
		}else{
			_this.SumUnPaid += Number(data.price * data.qty); 
		}
		
		_this.paidBox.innerHTML = "( $ " + _this.SumPaid.toFixed(2) + " paid )";
		_this.totalBox.innerHTML = " $ " + Number(_this.SumUnPaid + _this.SumPaid).toFixed(2);
	}
	
	var minus = function(data){
		console.log(data.state + ":" + Number(data.price * data.qty));
		if(data.state.toLowerCase() == "paid" || data.state.toLowerCase() == "checked"){
			_this.SumPaid -= Number(data.price * data.qty); 
		}else{
			_this.SumUnPaid -= Number(data.price * data.qty); 
		}
		
		_this.paidBox.innerHTML = "( $ " + (_this.SumPaid.toFixed(2)) + " paid )";
		_this.totalBox.innerHTML = " $ " + (_this.SumUnPaid + _this.SumPaid).toFixed(2);
	}
	
	this.refresh = function(){
		
		//clear
		this.SumPaid = 0;
		this.SumUnPaid =0;
		
		//Drug 
		for(var i = 0; i< this.DrugList.size();i++){ 
			plus(this.DrugList.item(i));
		} 
		
		
		//Exam 
		for(var i = 0; i< this.ExamList.size();i++){ 
			plus(this.ExamList.item(i)); 
		}
		
		
		//Treat 
		for(var i = 0; i< this.TreatList.size();i++){
			plus(this.TreatList.item(i)); 
		}
		
	}
	
	var addLine = function(data){
		tr = document.createElement("tr");
		tbl.appendChild(tr);
		
		var td = document.createElement("td");
		td.innerHTML = data.name;
		
		tr.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = " $ "+ data.price;
		tr.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = data.qty;
		tr.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = " $ "+ (data.price * data.qty).toFixed(2);
		tr.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = data.state ;
		tr.appendChild(td);
		if(data.state.toLowerCase() == "paid" || data.state.toLowerCase() == "checked"){
			StyleUtil.set(tr,"color","#999");
		}else{
			//tr.style.setProperty("color","#ff5050");
		}
		tbl.appendChild(tr);
	}
	
	var addSub = function(title,amount){
		tr = document.createElement("tr");
		ClassUtil.add(tr,"subtitle");
		tbl.appendChild(tr);
		
		td = document.createElement("td");
		td.setAttribute("colspan","3");
		td.innerHTML = title + " : ";
		tr.appendChild(td);
		
		td = document.createElement("td");
		td.setAttribute("colspan","2");
		td.innerHTML = " $ "+ amount.toFixed(2);
		tr.appendChild(td);
		
		tbl.appendChild(tr);
	}
	
	EventUtil.add(this.PriceBox,'click',function(){ 
		//clear
		while(tbl.children.length>1){
			tbl.removeChild(tbl.children[1]);
		} 
		
		//Examination
		var subTotal = 0;
		for(var i = 0; i< _this.ExamList.size();i++){
			addLine(_this.ExamList.item(i));
			subTotal += (_this.ExamList.item(i).price * _this.ExamList.item(i).qty);
		}
		addSub("Examination Fees",subTotal);
		
		
		//Drug
		subTotal = 0;
		for(var i = 0; i< _this.DrugList.size();i++){
			addLine(_this.DrugList.item(i));
			subTotal += (_this.DrugList.item(i).price * _this.DrugList.item(i).qty);
		}
		addSub("Drug Fees",subTotal);
		
		
		//Treatement
		subTotal = 0;
		for(var i = 0; i< _this.TreatList.size();i++){
			addLine(_this.TreatList.item(i));
			subTotal += (_this.TreatList.item(i).price * _this.TreatList.item(i).qty);
		}
		
		addSub("Treatement Fees",subTotal);
		document.getElementById("CountTotalPrice").innerHTML = "$ " + (_this.SumPaid + _this.SumUnPaid).toFixed(2);
		_this.show();
	});  
	
	this.addExam = function(code,name,price,state){
		var data = {
			code:code,
			name:name,
			qty:1,
			price:price,
			state:state
		}
		this.ExamList.set(code,data);
		
		plus(data);
	}
	
	this.delExam = function(code){
		minus(this.ExamList.get(code));
		this.ExamList.remove(code);
	}
	
	
	this.addDrug = function(code,name,qty,price,state){
		var data = {
			code:code,
			name:name,
			qty:qty,
			price:price,
			state:state,
		}
		this.DrugList.set(code,data);
		
		plus(data);
	}
	
	this.delDrug = function(code){
		minus(this.DrugList.get(code));
		this.DrugList.remove(code);
	}
	
	
	this.addTreat = function(code,name,qty,price,state){
		var data = {
			code:code,
			name:name,
			qty:qty,
			price:price,
			state:state
		}
		this.TreatList.set(code,data);
		plus(data);
	}
	
	this.delTreat = function(code){
		minus(this.TreatList.get(code));
		this.TreatList.remove(code);
	}
	
	this.clear = function(){
		this.ExamList.clear();
		this.DrugList.clear();
		this.TreatList.clear();
		
		this.refresh();
	}
	
	this.resize = function(){
		
		StyleUtil.set(this.Bottom,"width",(document.documentElement.offsetWidth - 520) + "px");
		
		if(document.documentElement.clientHeight - 56 > 0 ){
			StyleUtil.set(this.Bottom,"top",(document.documentElement.clientHeight - 56) + "px");
		}else if(document.body.clientHeight - 56 > 0 ){
			StyleUtil.set(this.Bottom,"top",(document.body.clientHeight - 56) + "px");
		}
	}
	
	this.resize();
	
	EventUtil.add(window,"resize",function(){
		_this.resize();
	})
}


//=========================================
//load patient detail
//=========================================
var PatientDetail = function(){
	
	//total price
	this.Price = new TotalPrice(); 
	
	//1.personInfo
	var divInfo = document.getElementById("PatientInfo");
	ScrollBar.add(document.getElementById("PatientTabPage"),106);
	
	//2 - page1. Description
	

	//2 - page2. Examination Chooser
	// Ajax request : all existing exmination 
	var ExamOptions = [
		{
			name:"Lab Examination",
			items:
			[
				{
					name:"Blood examination",
					type:"Lab",
					subitems:[
						{code:"101" ,name:"Blood routine",price:12.54},
						{code:"201" ,name:"Biochemical analysis",price:135.62},
						{code:"209" ,name:"Coagulation function",price:35.28},
						{code:"210" ,name:"Liver function", price:26.35},
						{code:"211" ,name:"Kidney function",price:17.82},
						{code:"212" ,name:"Hepatitis B virus(HB 5)",price:20.94}
					]
				},
				{
					name:"Urine & Stool examination",
					type:"Lab",
					subitems: [
						{code:"102" ,name:"Urine routine",price:12.54},
						{code:"109" ,name:"Stool routine",price:15.60} 
					]
				}
			]
		},
		{
			name:"Image Examination",
			items: 
			[
				{
					name:"B-Ultrasonic",
					type:"Image",
					subitems: [
						{code:"88.731" ,name:"B Ultrasonic-Chest",price:12.54},  //胸部超声检查
						{code:"88.732" ,name:"B Ultrasonic-Arcus Aortae ",price:15.60},  //主动脉弓超声检查
						{code:"88.733" ,name:"B Ultrasonic-Pulmonary",price:35.28},   //肺超声检查
						{code:"88.761" ,name:"B Ultrasonic-Abdominal",price:26.35},  //腹部超声检查
						{code:"88.791" ,name:"B Ultrasonic-Uterus",price:17.82},  //子宫超声检查
						{code:"95.131" ,name:"B Ultrasonic-Ocular",price:20.94},  //眼超声检查
						{code:"88.734" ,name:"B Ultrasonic-Breast",price:18.23},  //乳房超声检查
					]
				},
				{
					name:"CT Scan",
					type:"Image",
					subitems: [
						{code:"87.031" ,name:"CT-Encephalo",price:12.54},  //头部CT扫描
						{code:"87.411" ,name:"CT-Chest",price:12.54},      // 胸部CT
						{code:"88.011" ,name:"CT-Abdominal",price:12.54},     // 腹部CT
						{code:"87.711" ,name:"CT-Kidney",price:12.54},     // 肾脏CT
					]
				},
				{
					name:"X-Ray",
					type:"Image",
					subitems: [
						{code:"87.221",name:"X Ray-Cervical",price:12.54},   //颈椎Ｘ线照像术
						{code:"87.231",name:"X Ray-Thoracic",price:15.60},   //胸椎Ｘ线照像术
						{code:"87.241",name:"X Ray-Lumbar Spine",price:20.94},  //腰椎Ｘ线照像术
						{code:"87.242",name:"X Ray-Sacral",price:35.28},  //骶尾Ｘ线照像术
						{code:"87.291",name:"X Ray-Spinal",price:26.35},  //脊柱Ｘ线照像术
						{code:"87.131",name:"X Ray-Temporo-mandibular Joint",price:17.82},  //颞下颌关节Ｘ线照片
					]
				},
				{
					name:"MRI",
					type:"Image",
					subitems: [
						{code:"88.911",name:"MRI-Brain",price:12.54},   //脑核磁共振图像术
						{code:"88.921",name:"MRI-Chest",price:15.60},   //胸部核磁共振图像术
						{code:"88.992",name:"MRI-Vagina",price:20.94},  //腹部核磁共振图像术
						{code:"88.931",name:"MRI-Spinal Canal",price:35.28},  //椎管核磁共振图像术
						{code:"88.941",name:"MRI-Muscles",price:26.35},  //肌肉核磁共振图像术
						{code:"88.942",name:"MRI-Bone",price:17.82},  //骨髂核磁共振图像术
						{code:"88.951",name:"MRI-Bladder",price:17.82},  //膀胱核磁共振
						{code:"88.952",name:"MRI-Pelvis",price:17.82},  //骨盆核磁共振图像术
					]
				}
			]
		}
	]; 
	this.ExList = new ExamList("examlist",ExamOptions,this.Price);
	
	
	//2 - page3. Diagnosis Chooser
	// Ajax request : all existing Diagnosis 
	var DiagOptions = [
		{
			code:"BNF010",
			name:"Cough"  //咳嗽
		},
		{
			code:"BNW010",
			name:"Common Cold" //感冒
		},
		{
			code:"BNW011",
			name:"Influenza" //时行感冒
		},
		{
			code:"BEZ020",
			name:"Pneumonia Asthma" //肺炎喘嗽
		},
		{
			code:"J02.909",
			name:"Pharyngitis" //咽炎
		},
		{
			code:"J02.904",
			name:"Acute Pharyngitis" //急性咽炎
		},
		{
			code:"J31.001",
			name:"Rhinitis" //鼻炎
		},
		{
			code:"J30.401",
			name:"Anaphylactic Rhinitis" //过敏性鼻炎
		},
		{
			code:"A15.001",
			name:"Tuberculosis (Microscopic examination confirmed)" //肺结核，显微镜检证实
		},
		{
			code:"M50.301",
			name:"Degeneration of cervical intervertebral disc" //颈椎间盘退变
		},
	];
	this.DgList = new DiagList("diagnlist",DiagOptions);
	
	
	//2 - page4. Prescription - Drug Chooser
	// Ajax request : all existing drug 
	var DrugOptions = [
		{
			code:"M01AE01_01",
			name:"Ibuprofen Sustained Release Capsules",  //布洛芬缓释胶囊 1.2 g 口服
			spec:"1g x 30#",
			price:"16.95",
		},
		{
			code:"C09AA05_01",
			name:"Ramipril (tablet)",  //雷米普利 2.5 mg 口服
			spec:"15mg x 50#",
			price:"11.98",
		},
		{
			code:"A02BC01_01",   //奥美拉唑胶囊 20 mg 口服
			name:"Omeprazole Capsules",
			spec:"50mg x 40#",
			price:"9.85",
		},
		{ 
			code:"J01DB01_01",   //头孢氨苄（头孢力新，先锋霉素IV） 2 g 口服
			name:"Cefalexin",
			spec:"1g x 50#",
			price:"8.32",
		},
		
	];
	this.RxDrug = new DrugList("druglist",DrugOptions,this.Price);
	
	
	//2 - page4. Prescription - Treat Chooser
	// Ajax request : all existing treat 
	var TreatOptions = [
		{
			code:"23.191",
			name:"Removal of impacted wisdom teeth",  //阻生智齿拨除术
			price:"120.25",
		},
		{
			code:"86.226",
			name:"Debridement of the skin",  //皮肤清创术
			price:"58.74",
		},
		{
			code:"43.001",   
			name:"Gastric incision for removal of foreign bodies",  //胃切开异物取出术
			price:"359.28",
		},
		{ 
			code:"08.091",   
			name:"Separate eyelid adhesions",  //眼睑粘连分离术
			price:"38.32",
		},
		
	]
	this.RxTreat = new TreatList("treatlist",TreatOptions,this.Price);
	
	//submit button
	var _this = this;
	var btnSubmit = document.getElementById("BtnSubmit");
	
	EventUtil.add(btnSubmit,'click',function(){ 
		//page1. Description
		//Ajax request: submit description
		//txtCheif.innerHTML;
		//txtHistory.innerHTML;
		
		// page2. Examination
		//Ajax request: submit Examination 
		for(var i = 0; i < _this.ExList.map.size(); i++){ 
			console.log(_this.ExList.map.item(i));
			if(_this.ExList.map.item(i).state.toLowerCase() == "new"){
				//insert new data : _this.ExList.map.item(i).code  > _this.ExList.map.item(i).qty  _this.ExList.map.item(i).price ;
				console.log("new");
			}
		}
		
		// page3. Diagnosis
		//Ajax request: submit Diagnosis
		//clear current diagnosis
		for(var i = 0; i < _this.DgList.map.size() ; i++){ 
			//submit :	_this.DgList.map.item(i).code;
			console.log(_this.DgList.map.item(i));
		}
		
		// page4. Drug
		//Ajax request: submit Diagnosis
		//clear current diagnosis
		for(var i = 0; i < _this.RxDrug.map.size() ; i++){
			console.log(_this.RxDrug.map.item(i));
			if(_this.RxDrug.map.item(i).state.toLowerCase() == "new"){
				//submit :	_this.RxDrug.map.item(i).code; name, qty, price,descb,
				console.log("new");
			}
		}
		
		// page4. Treat
		//Ajax request: submit Diagnosis
		//clear current diagnosis
		for(var i = 0; i < _this.RxTreat.map.size() ; i++){
			console.log(_this.RxTreat.map.item(i));
			if(_this.RxTreat.map.item(i).state.toLowerCase() == "new"){
				//submit :	_this.RxTreat.map.item(i).code; name, qty, price,descb,
				console.log("new");
			}
		}
	}); 
	
	
	this.load = function(RegNo){
		//1. load person information
		// Ajax request : current patient information
		// input para: RegNo 
		var PersonInfo = {
			id:"1",
			name:"Michael Brown",
			gender:"Male",
			age:29,
			
			tel: "+86 571 28984534",
			cardID: "11744319"
		}
	
		divInfo.getElementsByClassName("name").item(0).innerHTML = PersonInfo.name;
		divInfo.getElementsByClassName("gender").item(0).innerHTML = PersonInfo.gender;
		divInfo.getElementsByClassName("age").item(0).innerHTML = PersonInfo.age + " years' old";
		
		//clear price counter
		this.Price.clear(); 
		
		//2 - page1. Description
		var CaseDescb = {
			cheif:"1111",
			hisotry:"2222"
		}
		
		this.RxCheif = document.getElementById("RxCheif").children[0];
		this.RxHisotry = document.getElementById("RxHisotry").children[0]; 
		this.RxCheif.innerHTML = CaseDescb.cheif;
		this.RxHisotry.innerHTML = CaseDescb.hisotry;
		
			
		//2 - page2. Examination
		// Ajax request : load current prescription's exmination 
		// input para: reg no
		var CurExList = [
			
			{
				title:"MRI - Spinal Canal ",
				state:"Checked",
				price:"16.90",
				code:"88.931",
				
				
				submitTime: "2019/06/22 13:23:10",
				submitDoctor: "Li, Ming",
				submitDivision: "Internal Medicine",
				
				type:"Image",
				result:[
					{
						position:"Neck",
						item:"Lateral",
						comment:"The physiological curvature of cervical vertebra is reversed"
					},
					{
						position:"Neck",
						item:"Anteroposterior ",
						comment:"normal",
					},
				]
			},
			{
				title:"Blood routine check",
				state:"Unpaid",
				price:"23.90",
				code:"101",
				
				
				submitTime: "2019/06/22 13:33:21",
				submitDoctor: "Li, Ming",
				submitDivision: "Internal Medicine",
				
				type:"Lab",
				result:[
					{
						item:"White Blood Cell (WBC)",
						value:"11.22",
						unit:"10^9/L",
						comment:"High",
						normal:"4-10"
					},
					{
						item:"Lymphocyte ratio (LYMPHP)",
						value:"19.33",
						unit:"%",
						comment:"Low",
						normal:"20-40"
					},
				]
			},
			
		];
		this.ExList.load(CurExList);
		
		//2 - page3. Diagnosis
		// Ajax request : load current register's prescription's Diagnosis 
		// input para: reg no
		
		//diagnosis list 
		var CurDiagList = [
			{
				code:"M50.301",
				name:"Degeneration of cervical intervertebral disc"  //颈椎间盘变性
			},
			{
				code:"J02.904",
				name:"Acute Pharyngitis"  //急性咽炎
			}
		]
		this.DgList.load(CurDiagList);
		
		
		
		//2 - page4. Prescription - DrugDiagnosis
		// Ajax request : load current prescription's Drug 
		// input para: reg no
		//drug list 
		var CurDrugList = [
			{
				code:"M01AE01_01",
				name:"Ibuprofen Sustained Release Capsules",
				spec:"1g x 30#",
				price:"16.95",
				qty:2,
				state:"Paid",
				dosage:"Take orally. 1 pill x 3 times / day",
			},
			{
				code:"A02BC01_01",
				name:"Omeprazole Capsules",
				spec:"50mg x 40#",
				price:"9.85",
				qty:1,
				state:"Unpaid",
				dosage:"Take orally. 1 pill x 2 times / day",
			},
		]
		this.RxDrug.load(CurDrugList);
		
		//2 - page4. Prescription - Treatment
		// Ajax request : load current prescription's Drug 
		// input para: reg no
		
		//treat list
		var CurTreatList = [
			{
				code:"23.191",
				name:"Removal of impacted wisdom teeth",    //阻生智齿拨除术
				price:"120.25",
				qty:2,
				state:"Paid",
				note:"Notice that the teeth with a sharp shape",
			}
		]
		
		this.RxTreat.load(CurTreatList);
	}
	
	
	var resizePage = function(){
		var divPageTab=document.getElementById("PatientTabPage");
		var divPageDtl=document.getElementById("PatienDetail");
		
		//width
		StyleUtil.set(divPageDtl,"width",(document.body.offsetWidth - 503) + 'px');
		
		//left
		if(document.body.offsetWidth-1200 > 0){
			StyleUtil.set(divPageDtl,"left",((document.body.offsetWidth-1200)/2 + 501) + 'px');
		}else{
			StyleUtil.set(divPageDtl,"left", 501 + 'px');
		}
		
		
		
		//height
		if(document.documentElement.clientHeight - 223 > 0 ){
			StyleUtil.set(divPageTab,"height",(document.documentElement.clientHeight - 223) + 'px');
		}else if(document.body.clientHeight - 223 > 0 ){ 
			StyleUtil.set(divPageTab,"height",(document.body.clientHeight - 223) + 'px');
		}
	}
	
	resizePage(); 
	
	EventUtil.add(window,'resize',function(){ 
		resizePage();
	});
	
};


 



//-----------------------
//search bar
var searchBox = document.getElementById('SearchBar').getElementsByTagName('input').item(0); 

EventUtil.add(searchBox,'click',function(){ 
	searchBox.value = "";
});


//=========================================
//Examintation List
//=========================================

function ExamNode(data,ParentUl,ListArea,childListArea,ChoosedArea,parentChooser){
	
	//basic property
	this.name = data.name;
	var childs = data.subitems;
	this.children = childs;
	this.type=data.type;
	
	var li = document.createElement("li");
	var a = document.createElement("a"); 
	a.innerHTML = data.name;
	li.appendChild(a);
	ParentUl.appendChild(li);
	
	
	//create child leafs 
	for(var i =0;i< childs.length;i++){
		childs[i].objItem = new ExamLeafNode(childs[i],this,childListArea,ChoosedArea);
		parentChooser.addLeaf(childs[i].objItem);
	}
	
	var _thisObj = this;
	
	EventUtil.add(li,'click',function(){ 
		//remove style 
		var len= ListArea.childNodes.length; 
		
		for(var i=0;i< len;i++){
			var len2= ListArea.childNodes[i].children.length; 
			
			for(var j=0;j<len2;j++){
				if(ClassUtil.has(ListArea.childNodes[i].children[j],"choosed")){
					ClassUtil.remove(ListArea.childNodes[i].children[j],"choosed")
				};
			}
		}
		
		ClassUtil.add(this,"choosed"); 
		
		//------------------------------- 
		//display childs
		
		//clear
		var len= childListArea.childNodes.length;
		for(var i=0;i< len;i++){
			childListArea.removeChild(childListArea.childNodes[0]);
		}
		
		for(var i =0;i< childs.length;i++){
			childs[i].objItem.display();
		}
	});
	
	
	
	ExamNode.prototype.addChoosedItem = function(code){
		parentChooser.Selected.add(code);
	}
	
	ExamNode.prototype.delChoosedItem = function(code){
		parentChooser.Selected.remove(code);
	}
	
	ExamNode.prototype.hasChoosed = function(code){
		return parentChooser.Selected.has(code);
	}
	
}


function ExamLeafNode(data,Parent,ListArea,ChoosedArea){
	
	//property 
	this.name = data.name;
	this.price = data.price;
	this.code = data.code;
	
	this.selectedItm = null;
	this.data = data;
	this.parent = Parent;
	this.isDisabled = data.disable;
	
	ExamLeafNode.prototype.removeSelect = function(){ 
		
		if(this.html != null){
			ClassUtil.remove(this.html,"choosed");
		}
		if(this.selectedItm!=null){
			this.selectedItm.parentNode.removeChild(this.selectedItm);
			this.selectedItm=null;
		}
		
		Parent.delChoosedItem(this.code);
	}
	
	
	//display UI
	ExamLeafNode.prototype.display = function(){
		
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.innerHTML = this.name; 
		li.appendChild(a); 
		ListArea.appendChild(li);
		
		if(Parent.hasChoosed(this.code)){
			ClassUtil.add(li,"choosed");
		} 
		if(this.isDisabled){
			ClassUtil.add(li,"disabled");
		}
		
		this.html =li; 
		
		//event	
		if(!this.isDisabled){
			
			var _this = this;
			EventUtil.add(li,'click',function(){ 
				if(ClassUtil.has(this,"choosed")){
					_this.removeSelect();
				}else{
					ClassUtil.add(this,"choosed");
					
					_this.selectedItm = document.createElement("div");
					ClassUtil.add(_this.selectedItm,"item");
					
					//name
					var cell = document.createElement("div");
					ClassUtil.add(cell,"name");
					
					cell.innerHTML= _this.name;
					cell.setAttribute("title",_this.name);
					_this.selectedItm.appendChild(cell);
					
					//del button
					cell = document.createElement("div");
					ClassUtil.add(cell,"del");
					
					EventUtil.add(cell,'click',function(){ 
						_this.removeSelect();
					});
	
					_this.selectedItm.appendChild(cell);
					
					ChoosedArea.appendChild(_this.selectedItm); 
					Parent.addChoosedItem(_this.code);
				}
			});
			
		}
	}
	
	ExamLeafNode.prototype.disable = function(isDisabled){
		this.isDisabled=isDisabled;
		if(this.html!= null){
			if(isDisabled){
				ClassUtil.add(this.html,"disabled");				
			}else{
				ClassUtil.remove(this.html,"disabled");
			}
		}
	}
	
}



//=========================================
//load patient list
//=========================================
var Dialog = new Dialog();

function PatientList(){
			
	var divPatient = document.getElementById("PatientList");
	ScrollBar.add(divPatient);
	
	var EleUl = null;
	var EleLi = null;
	var EleDiv = null; 
	var DataList = new Array();
	
	var PDetail = new PatientDetail();
	this.load = function(data){
		//clear
		while(divPatient.children.length>0){
			divPatient.removeChild(divPatient.children[0]);
			DataList.shift();
		}
		
		//load each data 
		for(i=0; i < data.length; i++){
			//------------ outline  -------------------
			EleUl = document.createElement("ul");
			divPatient.appendChild(EleUl);
			EleUl.setAttribute("id",data[i].reg_id)
			var outer = document.createElement("a");
			outer.appendChild(EleUl);
			divPatient.appendChild(outer); 
			
			//------------ add mouse event  -------------------

			EventUtil.add(EleUl,'click',function(e){ 
				for(var j = 0; j < data.length; j++){  
					ClassUtil.remove(DataList[j],"choosed");
				}
				
				var _this = null; 
				if(window.addEventListener){
					_this = this; 
				}else if(window.attachEvent){
					_this = e.srcElement;
				}
				
				while(_this.getAttribute("id").length==0){
					_this = e.srcElement.parentNode;
				}
				
				ClassUtil.add(_this,"choosed");
				console.log("load data: " + _this.getAttribute("id"));
				PDetail.load(_this.getAttribute("id"));
			});
			 
			
			//------------ line 1 -------------------
			EleLi = document.createElement("li");
			StyleUtil.set(EleLi,"line-height","30px");
			
			EleUl.appendChild(EleLi);
			
			//patient name
			EleDiv = document.createElement("div");
			ClassUtil.add(EleDiv,"name");
			EleDiv.innerHTML = data[i].name;
			EleLi.appendChild(EleDiv); 
			
			
			//patient order
			EleDiv = document.createElement("div");
			ClassUtil.add(EleDiv,"order");
			
			if(data[i].order < 10 && data[i].order > 0){
				EleDiv.innerHTML = "00"+ data[i].order;
			}else if(data[i].order >= 10 && data[i].order < 100){
				EleDiv.innerHTML = "0"+data[i].order;
			}else{
				EleDiv.innerHTML = data[i].order;
			}
			EleLi.appendChild(EleDiv);
			
			
			//---------- line 2 -------------------
			EleLi = document.createElement("li"); 
			EleUl.appendChild(EleLi);
			
			//patient type
			EleDiv  = document.createElement("div");
			ClassUtil.add(EleDiv,"type");
			EleDiv.innerHTML = data[i].type;
			EleLi.appendChild(EleDiv);
			
			//patient time
			EleDiv  = document.createElement("div");
			ClassUtil.add(EleDiv,"time");
			EleDiv.innerHTML = data[i].time;
			EleLi.appendChild(EleDiv);
			
			DataList.push(EleUl);
		}
		
		if(data.length>0){ 
			PDetail.load(data[0].reg_id);
		}
	}
	
	
	var resize = function(){
		
		if(document.documentElement.clientHeight - 130 > 0 ){
			StyleUtil.set(divPatient,"height",(document.documentElement.clientHeight - 130) + 'px'); 
			StyleUtil.set(document.getElementById("MainList"),"height",(document.documentElement.clientHeight - 50) + 'px');
		}else if(document.body.clientHeight - 130 > 0 ){
			StyleUtil.set(divPatient,"height",(document.body.clientHeight - 130) + 'px');  
			StyleUtil.set(document.getElementById("MainList"),"height",(document.body.clientHeight - 50) + 'px'); 
		}
	}
	
	resize();
	
	
	//set auto scroll 
	
	EventUtil.add(window,'resize',function(){ 
		resize();
	}); 
};



function ExamChooser(optionList, ExamList){
	
	this.Selected = new DataSet(); 

	createWin("ExamChooser", this, "Examination",true); 
	
	//--------------------------------  
	// comfirm button
	var btnOK = document.createElement("div");
	var a = document.createElement("a");
	a.innerHTML="OK";
	btnOK.appendChild(a);
	
	ClassUtil.add(btnOK,"confirm");
	this.body.appendChild(btnOK);
	
	//--------------------------------  
	// 2. Main contenct
	line = document.createElement("div");
	ClassUtil.add(line,"content");
	this.body.appendChild(line);
	
	
	//2.1. mainList
	var MainList = document.createElement("div");
	ClassUtil.add(MainList,"mainList");
	ClassUtil.add(MainList,"list");
	line.appendChild(MainList);  
	ScrollBar.add(MainList,75); 
	
	
	//2.2. subList 
	var SubList = document.createElement("div");
	ClassUtil.add(SubList,"subList");
	ClassUtil.add(SubList,"list");
	line.appendChild(SubList);
	
	ScrollBar.add(SubList,75); 
	
	
	//--------------------------------  
	//3. choosed items
	var chooseArea = document.createElement("div");
	ClassUtil.add(chooseArea,"choosedArea");
	this.body.appendChild(chooseArea);
	
	this.LeafMap = new Collection();
	
	this.addLeaf = function(objLeaf){
		this.LeafMap.set(objLeaf.code,objLeaf);
	}
	
	
	//--------------------------------  
	//4. option list
	if(optionList!=null){
		for(var i=0; i< optionList.length;i++){ 
			
			//UI
			var h3 = document.createElement("h3");
			var a = document.createElement("a");
			a.innerHTML = optionList[i].name;
			h3.appendChild(a);
			
			ClassUtil.add(h3,"up");
			h3.setAttribute("No",i);
			MainList.appendChild(h3);
			
			var ul = document.createElement("ul");
			MainList.appendChild(ul);
			optionList[i].ul = ul;
			
			
			//event: expand sub category
			EventUtil.add(h3,'click',function(){ 
				if(ClassUtil.has(this,"down")){
					//current close > open
					ClassUtil.remove(this,"down");
					ClassUtil.add(this,"up");
					
					StyleUtil.set(optionList[this.getAttribute("No")].ul,"display","block");
					
				}else{
					//current open > close
					ClassUtil.remove(this,"up");
					ClassUtil.add(this,"down");
					
					StyleUtil.set(optionList[this.getAttribute("No")].ul,"display","none");
				}
			});
			
			
			for(var j=0; j< optionList[i].items.length;j++){
				new ExamNode(optionList[i].items[j],optionList[i].ul,MainList,SubList,chooseArea,this);
			}
		}
	}
	
	
	//event
	var _this = this; 
	
	EventUtil.add(btnOK,'click',function(){
		StyleUtil.set(_this.mask,"display","none");
		StyleUtil.set(_this.body,"display","none");
		
		while(_this.Selected.size()>0){
			
			var code = _this.Selected.get(0);
			
			_this.LeafMap.get(code).disable(true);
			_this.LeafMap.get(code).removeSelect();
			
			
			//add exam
			curDate = new Date();
			addData = {
				title: _this.LeafMap.get(code).name,
				state:"New",
				price: _this.LeafMap.get(code).price,
				code: code,
				
				submitTime: curDate.getFullYear() + "/" + (curDate.getMonth()+1) + "/" + curDate.getDate() + " " + curDate.getHours() + ":" + curDate.getMinutes() + ":" + curDate.getSeconds(),
				submitDoctor: "Li, Ming",
				submitDivision: "Internal Medicine",
				
				type:_this.LeafMap.get(code).parent.type
			}
			
			ExamList.addExam(addData,_this.LeafMap.get(code).parent); 
		}
	});
	
	
	this.disable = function(code){
		this.LeafMap.get(code).disable(true);
	}
	
	
	this.restore = function(){
		//remove choosed items
		for(var i=0;i< this.Selected.size();i++){
			var code =  this.Selected.values[i];
			this.LeafMap.get(code).removeSelect();
		}
		
		
		//remove current list
		var len = SubList.childElementCount;
		for(var i = 0; i < len ; i++){
			SubList.removeChild(SubList.children[0]);
		}
		
		//remove current main list
		var len = MainList.childElementCount;
		for(var i = 0; i < len ; i++){
			ClassUtil.remove(MainList.children[i],"choosed");
		}
	}
	
	this.show = function(){
		this.restore();
		StyleUtil.set(this.mask,"display","block");
		StyleUtil.set(this.body,"display","block");
	}
	
	
	this.search = function(keyWord){		
		this.keyWord = keyWord;
		this.inputSearch.value = keyWord;
		console.log("search ..." + keyWord);
		
		this.show();
	}
	
	this.addChoosedItem = function(code){
		_this.Selected.add(code);
	}
	
	this.delChoosedItem = function(code){
		_this.Selected.remove(code);
	}
	
	this.hasChoosed = function(code){
		return _this.Selected.has(code);
	}
}


function ExamList(ElementID, optionList, PriceCouter){
	
	//================================
	//current exam items
	
	var listDiv = document.getElementById(ElementID); 
	ClassUtil.add(listDiv,"ExpandList");
	ClassUtil.add(listDiv,"ItemList"); 
	this.html = listDiv;
	
	this.priceCount = PriceCouter;
	
	
	//exam chooser
	var ExamOption = new ExamChooser(optionList, this); 
	
	
	//add button
	var btnAdd = document.createElement("div");
	ClassUtil.add(btnAdd,"ExpandAdd");
	
	var a = document.createElement("a");
	a.innerHTML=" + Add";
	btnAdd.appendChild(a);
	
	EventUtil.add(btnAdd,'click',function(){ 
		ExamOption.show();
	}); 
	
	this.html.parentNode.insertBefore(btnAdd,listDiv.nextSibling); 
	
	
	//current exam list
	this.map = new Collection();
	ExamList.prototype.addExam = function(data){
		var itm = new ExamItem(this,data,ExamOption);
		PriceCouter.addExam(data.code,data.title,data.price, data.state);
		this.map.set(itm.code,itm);
		return itm;
	}
	
	ExamList.prototype.del = function(code){
		var it = this.map.get(code);
		this.html.removeChild(it.Item);
		this.html.removeChild(it.Detail);
		this.map.remove(code); 
	}
	
	ExamList.prototype.load = function(CurData){
		//clear
		while(this.map.size() > 0 ){
			
			var it = this.map.item(0);
			this.html.removeChild(it.Item);
			this.html.removeChild(it.Detail);
			this.map.remove(it.code);
		}
		ExamOption.Selected.clear();
		
		//ajax get data 
		
		
		//load current examination list
		for(var i=0;i< CurData.length;i++){
			this.addExam(CurData[i]);
			ExamOption.disable(CurData[i].code);
		}
	}
	
}



function ExamItem(parent, data, ExChooser){
	
	this.title = data.title;
	this.state = data.state;
	this.price = data.price;
	this.type = data.type;
	this.code = data.code;
	
	this.submitTime = data.submitTime;
	this.submitDoctor = data.submitDoctor;
	this.submitDivision = data.submitDivision;
	
	this.result = data.result;
	this.parent = parent;
	
	var ItemObj = new ExpandItem(this,this.title,this.parent.html);
	
	//===============================
	//Main content
	var DetailData = [
		[
			{
				name:"Submitted",
				value:this.submitDoctor + "&nbsp;&nbsp;&nbsp;" + this.submitTime
			},
			{
				value:this.submitDivision
			}
		],
		[
			{
				name:"Price",
				value:"$ " + this.price,
				style:"price"
			},
			{
				name:"Status",
				value:this.state, 
			},
		]
	];
	
	
	//delete button  
	var delEvent = null;
	var _this = this;
	if(this.state.toLowerCase() == "new" || this.state.toLowerCase() == "unpaid"){ 
		delEvent = function(){
			var funcYes = function(){
				parent.del(_this.code);
				
				if( _this.code!=null){
					ExChooser.LeafMap.get(_this.code).disable(false);
					ExChooser.LeafMap.get(_this.code).removeSelect();
				} 
				parent.priceCount.delExam(_this.code);
				
				//Ajax request : delete record
				
			}
			Dialog.show("Confirm","Delete \"" + _this.title + "\"?", DialogType.YESNO,funcYes);
		};
	}
	ItemObj.load(DetailData,delEvent);
	
	
	//--------------------------
	//2. exam result 
	var ResContent = document.createElement("div"); 
	ClassUtil.add(ResContent,"result");
	
	this.content.appendChild(ResContent);
	
	if(this.result ==null){
		ResContent.innerHTML = "no result...";
	}else{
		var table = document.createElement("table");
		ResContent.appendChild(table);
		
		//table header
		var line = document.createElement("tr");
		table.appendChild(line);
		
		if(this.type.toLowerCase()=="lab"){
			//table header
			
			cell = document.createElement("th");
			StyleUtil.set(cell,"width","40%"); 
			cell.innerHTML = "Item";
			line.appendChild(cell);
			
			cell = document.createElement("th");
			StyleUtil.set(cell,"width","13.3%"); 
			cell.innerHTML = "Value";
			line.appendChild(cell);
			
			cell = document.createElement("th");
			StyleUtil.set(cell,"width","13.3%");
			cell.innerHTML = "Unit";
			line.appendChild(cell);
			
			cell = document.createElement("th");
			StyleUtil.set(cell,"width","13.3%");
			cell.innerHTML = "Comment";
			line.appendChild(cell);
			
			cell = document.createElement("th");
			StyleUtil.set(cell,"width","20%");
			cell.innerHTML = "Normal rang";
			line.appendChild(cell);
			
			
			for(var i=0;i< this.result.length;i++){
				//table row 
				
				line = document.createElement("tr");
				table.appendChild(line);
				
				cell = document.createElement("td");
				cell.innerHTML = this.result[i].item;
				cell.setAttribute("title",this.result[i].item);
				line.appendChild(cell);
				
				cell = document.createElement("td");
				cell.innerHTML = this.result[i].value;
				cell.setAttribute("title",this.result[i].value);
				line.appendChild(cell);
				
				cell = document.createElement("td");
				cell.innerHTML = this.result[i].unit;
				cell.setAttribute("title",this.result[i].unit);
				line.appendChild(cell);
				
				cell = document.createElement("td");
				cell.innerHTML = this.result[i].comment;
				cell.setAttribute("title",this.result[i].comment);
				line.appendChild(cell);
				
				cell = document.createElement("td");
				cell.innerHTML = this.result[i].normal;
				cell.setAttribute("title",this.result[i].normal);
				line.appendChild(cell);
			}
			
		}else if(this.type.toLowerCase()=="image"){
			
			cell = document.createElement("th");
			StyleUtil.set(cell,"width","17.6%");
			cell.innerHTML = "Position";
			line.appendChild(cell);
			
			
			cell = document.createElement("th");
			StyleUtil.set(cell,"width","23.5%");
			cell.innerHTML = "Item";
			line.appendChild(cell);
			
			cell = document.createElement("th");
			StyleUtil.set(cell,"width","58.8%");
			cell.innerHTML = "Comment";
			line.appendChild(cell); 
			
			for(var i=0;i < this.result.length;i++){
				//table row 
				line = document.createElement("tr");
				table.appendChild(line);
				
				cell = document.createElement("td");
				cell.innerHTML = this.result[i].position;
				cell.setAttribute("title",this.result[i].position);
				line.appendChild(cell);
				
				cell = document.createElement("td");
				cell.innerHTML = this.result[i].item;
				cell.setAttribute("title",this.result[i].item);
				line.appendChild(cell);
				
				cell = document.createElement("td");
				cell.innerHTML = this.result[i].comment;
				cell.setAttribute("title",this.result[i].comment);
				line.appendChild(cell);
			}
		}
		
		//whole result:
		line = document.createElement("div"); 
		var a = document.createElement("a"); 
		line.appendChild(a);
		a.innerHTML = "More..."; 
		ClassUtil.add(line,"more");
		
		ResContent.appendChild(line);
	}
	
};


//=========================================
//Diagnosis List
//=========================================

function DiagList(ElementID, optionList){
	//================================
	//current Diagnosis items
	
	var listDiv = document.getElementById(ElementID);  
	ClassUtil.add(listDiv,"ItemList");
	
	this.html = listDiv;
	
	//Diagnosis chooser
	var DiagOption = new DiagChooser(optionList, this);
	
	
	//current Diagnosis list
	this.map = new Collection();
	this.select = "";
	var _this = this;
	
	
	DiagList.prototype.addDiagnosis = function(data){
		var line = document.createElement("ul");
		
		var cell = document.createElement("li");
		ClassUtil.add(cell,"code");
		cell.innerHTML= data.code;
		line.appendChild(cell);
		
		var cell = document.createElement("li");
		ClassUtil.add(cell,"name");
		cell.setAttribute("title",data.name);
		cell.innerHTML= data.name;
		line.appendChild(cell);
		
		var cell = document.createElement("span");
		ClassUtil.add(cell,"del");
		
		EventUtil.add(cell,'click',function(){ 
			_this.map.remove(data.code);
			_this.html.removeChild(line);
			DiagOption.selected.remove(data.code); 
		});
	
	
		line.appendChild(cell);
		
		this.html.appendChild(line);
		data.html = line;
		this.map.set(data.code,data);
	}
	
	
	//input add textbox
	var input = document.createElement("input");
	this.html.parentNode.insertBefore(input,listDiv.nextSibling);
	createInputSearchBox(input,function(){
		DiagOption.search(input.value);
	});
	
	
	DiagList.prototype.load = function(CurData){
		//clear		
		while(this.map.size()>0){
			var it = this.map.item(0);
			this.html.removeChild(it.html);
			this.map.remove(it.code);
		}
		
		DiagOption.selected.clear();
		
		//load current list
		for(var i=0;i< CurData.length;i++){
			this.addDiagnosis(CurData[i]);
			DiagOption.selected.add(CurData[i].code);
		}
	}
	
}


function DiagChooserItem(parentobj,data){
	var _this = this;
	var line = null;
	this.code = data.code;
	this.name = data.name;
	this.isChoosed = false;
	this.parent = parentobj;
	
	
	DiagChooserItem.prototype.load = function(){
		
		ItemData = [
			{value:data.code,width:100,},
			{value:data.name,width:280,},
		];
		
		createChooserItem(this,ItemData,parentobj.ul);
		
		
		EventUtil.add(this.html,'dblclick',function(){ 
			parentobj.CurList.addDiagnosis(
				{	code:_this.code,
					name:_this.name
				}
			);
			_this.disable();
			parentobj.selected.add(_this.code);
			parentobj.hide();
		});
		
		if(this.isChoosed){
			ClassUtil.add(this.html,"disabled");
		} 
	}
	
	
	DiagChooserItem.prototype.disable = function(){
		if(this.html!=null){
			ClassUtil.add(this.html,"disabled");
		}
		this.isChoosed = true;
	}
	
	DiagChooserItem.prototype.restore = function(){
		if(this.html!=null){
			ClassUtil.remove(this.html,"disabled");
		} 
		this.isChoosed = false;
	}
}



function DiagChooser(optionList, CurList){
	
	this.CurList = CurList;
	createWin("DiagChooser",this,"Choose Diagnoisis",true);
	createChooser(this);
	
	//--------------------------------  
	//Turn Page event
	
	this.turnPage = function(pageNo){
		
		console.log("Turn page of Diagonisis list  " + pageNo);
		//get records from DB
		//paras: KeyWord, PageNo, NoPerPage
		
		//get max pages
		this.MaxPage = 10;
		
		if(optionList!=null){
			for(var i=0; i< optionList.length;i++){
				var it = new DiagChooserItem(this,optionList[i]);
				it.load();
				if(this.selected.has(it.code)){
					it.disable();
				}
			}
		} 
	}
	
}




//=========================================
//Drug Prescription
//=========================================


function DrugChooserItem(parentobj,data){
	var _this = this;
	
	this.code = data.code;
	this.name = data.name;
	this.price = data.price;
	this.spec = data.spec;
	this.factory = data.factory;
	
	this.isChoosed = false;
	this.parent = parentobj;
	
	var line = null;
	
	DrugChooserItem.prototype.load = function(){
		
		ItemData = [
			{value:data.code,width:100,},
			{value:data.name,width:280,},
			{value:data.spec,width:100,},
			{value:" $ "+ data.price,width:100,style:"price"},
		];
		
		createChooserItem(this,ItemData,parentobj.ul);
		var _this = this;
		
		this.choose = function(){
			
			parentobj.CurList.addDrug(
				{	code:_this.code,
					name:_this.name,
					price: _this.price,
					spec: _this.spec,
					qty:1,
					dosage:"TID, 3 times a day, 1 pieces a time",
					state: "New",
				}
			,true);
			
			parentobj.selected.add(_this.code);
			parentobj.hide();
			
		}
		
		EventUtil.add(this.html,'dblclick',function(){ 
			_this.choose();
		});
		 
		
		if(this.isChoosed){
			ClassUtil.add(this.html,"disabled");
		}
	}
	
	
	DrugChooserItem.prototype.disable = function(isDisabled){
		this.isChoosed = isDisabled;
		
		if(this.html!=null){
			if(isDisabled){
				ClassUtil.add(this.html,"disabled");
			}else{
				ClassUtil.remove(this.html,"disabled");
			}
		} 
	}
}


function DrugChooser(optionList, CurList){
	
	this.CurList = CurList;
	createWin("DrugChooser",this,"Choose Drug",true);
	createChooser(this);
	
	
	//=================================
	// Turn page event
	
	this.turnPage = function(pageNo){
		
		console.log("turn page of drug list: " + pageNo);
		//get records from DB
		//paras: KeyWord, PageNo, NoPerPage
		
		//get max pages
		this.MaxPage = 10;
		
		if(optionList!=null){
			for(var i=0; i< optionList.length;i++){
				var it = new DrugChooserItem(this,optionList[i]);
				it.load();
				if(this.selected.has(it.code)){
					it.disable(true);
				}
				
				this.map.set(it.code,it);
			}
		}
	}
	
}

function DrugList(ElementID, optionList, PriceCouter){
	
	//================================
	//current drug items
	
	var listDiv = document.getElementById(ElementID);
	ClassUtil.add(listDiv,"ExpandList");
	ClassUtil.add(listDiv,"ItemList");
	this.html = listDiv; 
	
	
	//drug chooser
	var DrugOption = new DrugChooser(optionList, this); 
	
	this.priceCount = PriceCouter;
	
	//input search text box
	var input = document.createElement("input");
	listDiv.parentNode.appendChild(input);
	createInputSearchBox(input,function(){
		DrugOption.search(input.value);
	});
	
	
	//current drug list
	this.map = new Collection();
	this.addDrug = function(data, showDetail){
		var itm = new DrugItem(this,data,DrugOption);
		if(showDetail){
			itm.show(showDetail);
		}
		PriceCouter.addDrug(data.code,data.name,data.qty,data.price, data.state);
		this.map.set(itm.code,itm);
		return itm;
	}
	
	
	this.load = function(CurData){
		//clear
		while(this.map.size()>0){
			var it = this.map.item(0); 
			this.html.removeChild(it.Item);
			this.html.removeChild(it.Detail);
			this.map.remove(it.code);
		}
		DrugOption.selected.clear();
		
		//ajax get data 
		
		
		//load current drug list
		for(var i=0;i< CurData.length;i++){
			this.addDrug(CurData[i]);
			DrugOption.selected.add(CurData[i].code);
		}
	}
	
}



function DrugItem(parent, data, DrugChooser){
	
	this.name = data.name;
	this.code = data.code;
	this.price = data.price;
	this.spec = data.spec;
	this.qty = data.qty;
	this.dosage = data.dosage;
	this.state = data.state;
	
	this.parent = parent;
	
	var ItemBody = new ExpandItem(this,this.name,this.parent.html);
	
	
	//===================================
	//Detail content
	var _this = this;
	
	
	var DetailData = [
		[
			{
				name:"Spec",
				value:this.spec,
				width:100,
			},
			{
				name:"Dosage",
				value:this.dosage,
				type:"input",
				width:230,
				event: function(input){
					console.log("dosage change to: " + input.value);
					_this.dosage = input.value; 
				} ,
				
			},
		],
		[
			{
				name:"Price",
				value:"$ "+ this.price,
				width:100,
				style:"price"
			},
			{
				name:"Quantity",
				value:this.qty,
				type:"input",
				width:50,
				event: function(input){
					console.log("qty change to : " + input.value);
					if(isNaN(input.value)){
						input.value = _this.qty;
					}else{
						_this.qty = input.value;
					
						//re count price
						parent.priceCount.DrugList.get(_this.code).qty = input.value;
						parent.priceCount.refresh();
						
						//check stock : AJAX http Request 
						var isShort = true;
						if(isShort){
							ClassUtil.add(input,"Highlight");
							var Tips = document.createElement("div");
							Tips.innerHTML = "lack of stock";
							ClassUtil.add(Tips,"tips");
							
							EventUtil.add(Tips,'click',function(){
								
								if(document.addEventListener){
									StyleUtil.set(this,"display","none");
								}else{
									
								}
								
							});
	
							input.parentNode.appendChild(Tips);
							
							EventUtil.add(input,'click',function(){ 
								StyleUtil.set(this,"display","block"); 
							});
							
						}
					} 
					
				},
			},
			{
				name:"Status",
				value: this.state, 
			}
		],
		[
			{
				name:"Advice",
				value:this.dosage,
				type:"input",
				width:370,
				event: function(input){
					console.log("dosage change to: " + input.value);
					_this.dosage = input.value; 
				} ,
				
			},
		],
	];
	
	
	//-----------------------------
	//delete button
	var delEvent = null;
	var _this = this;
	
	if(this.state.toLowerCase()== "new" || this.state.toLowerCase() == "unpaid"){
		delEvent = function(){
			var funcYes = function(){
				_this.parent.html.removeChild(_this.Detail);
				_this.parent.html.removeChild(_this.Item);
				
				if( _this.code!=null){
					_this.parent.map.remove(_this.code);
					DrugChooser.selected.remove(_this.code);
				}
				
				_this.parent.priceCount.delDrug(_this.code);
			};
			Dialog.show("Confirm","Delete \"" + _this.name + "\"?", DialogType.YESNO,funcYes); 
		}; 
	}
	
	ItemBody.load(DetailData,delEvent);
};



//=========================================
//Treat Prescription
//=========================================


function TreatList(ElementID, optionList, PriceCouter){
	
	//================================
	//current treat items
	
	var listDiv = document.getElementById(ElementID);
	ClassUtil.add(listDiv,"ExpandList");
	ClassUtil.add(listDiv,"ItemList");
	this.html = listDiv; 
	
	
	//treat chooser
	var TreatOption = new TreatChooser(optionList, this);
	this.priceCount = PriceCouter;
	
	
	//input search text box
	var input = document.createElement("input");
	listDiv.parentNode.appendChild(input);
	createInputSearchBox(input,function(){
		TreatOption.search(input.value);
	});
	
	
	//current treat list
	this.map = new Collection();
	this.addTreat = function(data, isShow){
		var itm = new TreatItem(this,data,TreatOption);
		PriceCouter.addTreat(data.code,data.name,data.qty,data.price, data.state);
		itm.show(isShow);
		this.map.set(itm.code,itm);
		return itm;
	}
	
	
	this.load = function(CurData){
		//clear
		while(this.map.size()>0){
			var it = this.map.item(0);
			listDiv.removeChild(it.Item);
			listDiv.removeChild(it.Detail);
			this.map.remove(it.code); 
		}
		TreatOption.selected.clear();
		
		//ajax get data 
		
		
		//load current treat list
		for(var i=0;i< CurData.length;i++){
			this.addTreat(CurData[i]);
			TreatOption.selected.add(CurData[i].code);
		} 
	}
	
}



function TreatItem(parent, data, TreatChooser){
	
	this.name = data.name;
	this.code = data.code;
	this.price = data.price;
	this.qty = data.qty;
	this.note = data.note;
	this.state = data.state;
	
	this.parent = parent;
	
	var ItemBody = new ExpandItem(this,this.name,this.parent.html);
	
	
	//===================================
	//Detail content
	var _this = this;
	
	
	var DetailData = [
		[
			{
				name:"Price",
				value:"$ "+ this.price,
				style:"price"
			},
			{
				name:"Quantity",
				value:this.qty,
				type:"input",
				width:50,
				event: function(input){
					console.log("qty change to : " + input.value);
					if(isNaN(input.value)){
						input.value = _this.qty;
					}else{
						_this.qty = input.value;
					
						//re count price
						parent.priceCount.TreatList.get(_this.code).qty = input.value;
						parent.priceCount.refresh();
						
						//check stock : AJAX http Request 
						var isShort = true;
						if(isShort){
							ClassUtil.add(input,"Highlight");
							
							var Tips = document.createElement("div");
							Tips.innerHTML = "lack of stock";
							ClassUtil.add(Tips,"tips");
							
							EventUtil.add(Tips,'click',function(){
								
								if(window.addEventListener){
									StyleUtil.set(this,"display","none");
								}
								
							});
							input.parentNode.appendChild(Tips);
							 
							EventUtil.add(input,'click',function(){
								StyleUtil.set(Tips,"display","block");
							});
						}
					} 
					
				},
			},
			{
				name:"Status",
				value: this.state
			},
		],
		[
			{
				name:"Note",
				value:this.note,
				type:"input",
				width:380,
				event: function(input){
					console.log("note change to: " + input.value);
					_this.note = input.value; 
				} ,
				
			},
		]
	];
	
	
	//-----------------------------
	//delete button
	var delEvent = null;
	var _this = this;
	
	if(this.state.toLowerCase()== "new" || this.state.toLowerCase() == "unpaid"){
		delEvent = function(){
			var funcYes = function(){
				_this.parent.html.removeChild(_this.Detail);
				_this.parent.html.removeChild(_this.Item);
				
				if( _this.code!=null){
					_this.parent.map.remove(_this.code);
					TreatChooser.selected.remove(_this.code);
				}
				
				_this.parent.priceCount.delTreat(_this.code);
			};
			Dialog.show("Confirm","Delete \"" + _this.name + "\"?", DialogType.YESNO,funcYes); 
		}; 
	}
	
	ItemBody.load(DetailData,delEvent);
};


function TreatChooserItem(parentobj,data){
	var _this = this;
	
	this.code = data.code;
	this.name = data.name;
	this.price = data.price;
	
	this.isChoosed = false;
	this.parent = parentobj;
	
	var line = null;
	
	TreatChooserItem.prototype.load = function(){
		
		ItemData = [
			{value:data.code,width:100,},
			{value:data.name,width:280,},
			{value:" $ "+ data.price,width:100,style:"price"},
		];
		
		createChooserItem(this,ItemData,parentobj.ul);
		var _this = this;
		
		this.choose = function(){
			parentobj.CurList.addTreat(
				{	code:_this.code,
					name:_this.name,
					price: _this.price,
					qty:1,
					note:".....",
					state: "New",
				}
			,true);
			
			parentobj.selected.add(_this.code);
			parentobj.hide();
			
		}
		 
		EventUtil.add(this.html,'dblclick',function(){ 
			_this.choose();
		});
	
		if(this.isChoosed){
			ClassUtil.add(this.html,"disabled");
		}
	}
	
	
	TreatChooserItem.prototype.disable = function(isDisabled){
		this.isChoosed = isDisabled;
		
		if(this.html!=null){
			if(isDisabled){
				ClassUtil.add(this.html,"disabled");
			}else{
				ClassUtil.remove(this.html,"disabled");
			}
		} 
	}
}


function TreatChooser(optionList, CurList){
	
	this.CurList = CurList;
	createWin("TreatChooser",this,"Choose Treatment",true);
	createChooser(this);
	
	
	//=================================
	// Turn page event
	
	this.turnPage = function(pageNo){
		
		console.log("turn page of treat chooser: " + pageNo);
		//get records from DB
		//paras: KeyWord, PageNo, NoPerPage
		
		//get max pages
		this.MaxPage = 10;
		
		if(optionList!=null){
			for(var i=0; i< optionList.length;i++){
				var it = new TreatChooserItem(this,optionList[i]);
				it.load();
				if(this.selected.has(it.code)){
					it.disable(true);
				}
				
				this.map.set(it.code,it);
			}
		}
	}
	
}