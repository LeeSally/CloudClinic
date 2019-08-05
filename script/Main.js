
/*
	check browser
*/

var checkBrowser = function(){  
	var version= parseFloat(navigator.appVersion);
	/*
	console.log("Browser userAgent: "+ navigator.userAgent );
	console.log("Browser appName: "+ navigator.appName);
	console.log("Browser version: "+ version);
	console.log("Browser appCodeName: "+ navigator.appCodeName);
	*/
	
	if(navigator.appName.indexOf("Microsoft Internet Explorer")>=0 && version <5){
		return false;
	}else{
		return true;
	}
	
} 


function MainFrame(currentPage){
	
	//main menu
	var MenuDiv = document.getElementById('MainMenu');
	StyleUtil.set(MenuDiv,"height",window.screen.height + 'px');
	
	var MenuBar  = document.createElement("ul");
	MenuDiv.appendChild(MenuBar);

	var MenuItems = new Array("Dashboard","Patient","Prescription","Settings");
	this.Buttons = new Array();

	for(var i = 0; i < MenuItems.length; i++){
		
		var btn = document.createElement("li");
		var a = document.createElement("a");
		
		a.innerHTML = MenuItems[i];
		btn.appendChild(a);
		ClassUtil.add(btn,a.innerHTML.toLowerCase());
		MenuBar.appendChild(btn);
		
		EventUtil.add(a,'click',function(e){
			var _this = null;
			if(window.addEventListener){
				 _this = this;
			}else if(window.attachEvent){
				_this = e.srcElement || e.target;
			}
			window.location= _this.innerHTML.toLowerCase() + ".html"; 
		}); 
		
		this.Buttons.push(btn);
		if(currentPage == a.innerHTML.toLowerCase()){
			ClassUtil.add(a,"choosed");
		}
	};
	
	EventUtil.add(window,'resize',function(){
		StyleUtil.set(MenuDiv,"height",window.screen.height + 'px');
		var topBox = document.getElementById('MainTop').getElementsByClassName("box").item(0);
		StyleUtil.set(topBox,"width",window.screen.width + 'px');
	}); 
	
	
	// user info
	var UserInfo = document.getElementById("UserInfo");
	var div = document.createElement("div");
	ClassUtil.add(div,"dropbtn");
	UserInfo.appendChild(div);
	
	//ajax request
	var UserData = {
		name:"Sally Li",
		header:"style/images/profile-head2.jpg"
	}
	var a = document.createElement("a");
	div.appendChild(a);
	
	
	//header icon
	var div = document.createElement("div");	
	ClassUtil.add(div,"header");
	StyleUtil.set(div,"background-image","url(" + UserData["header"] + ")");
	
	a.appendChild(div);
	
	//user name
	div = document.createElement("div"); 
	ClassUtil.add(div,"name");
	div.innerHTML = UserData["name"];
	a.appendChild(div);
	
	//user menu
	var menu = document.createElement("ul");
	menu.setAttribute("id","UserMenu");
	UserInfo.appendChild(menu);
	
	//var menu = document.getElementById("UserMenu");
	var UserMenu = new MenuList(menu,["Account","Settings","Sign off"]);
	
	EventUtil.add(UserInfo,'click',function(){
		UserMenu.show();
	});
	
}


