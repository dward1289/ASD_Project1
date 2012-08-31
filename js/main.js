//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){

	var validator = function () {
	$('#taskForm').validate();
	}
	
	//Find value of selected radio button.
	var radiobox = function () {
		var radios = document.forms[0].whichCategory;
		for(var i=0; i<radios.length; i++) {
			if(radios[i].checked) {
				whichCategoryValue = radios[i].value;
				}
			}
		}
	
	
	var toggleContr = function (n) {
		switch(n) {
			case "on":
				$('#taskForm').css("display", "none");
				$('#clear').css("display", "inline");
				$('#displayData').css("display", "none");
				break;
			case "off":
				$("taskForm").css("display", "block");
				$("clear").css("display", "inline");
				$("displayData").css("display", "inline");
				$("items").css("display", "none");
				
				break;
			default:
				return false;
				}
			}
			
	
	//Store data function
	var storeData = function (key) {
		//No key = new key
		if(!key){
			var id = Math.floor(Math.random()*10000000001);
			}
			else{
				//Existing key will be saved when edited
				id = key;
				}
				
		//Get all form field values and store in object
		//Object properties contain array w/from label and input value
		radiobox();
		var item = {};
		item.name = ["Name of Task: ", $('#taskName').val()];
		item.category = ["Category: ", whichCategoryValue];
		item.priorityLevel = ["Priority: ", $('#priorities').val()];
		item.startUp = ["Starting Date of Task: ", $('#taskDate').val()];
		item.ending = ["Ending Date of Task: ", $('#taskEnd').val()];
		item.alertOption = ["Type of Alert: ", $('#alertWay').val()];
		item.note = ["Notes", $('#notes').val()];
	
		//Save data into Local Storage: stringify to convert object to string
		localStorage.setItem(id, JSON.stringify(item));		
		alert("Task Saved!");
		window.location.reload();
	}
	
	
	//Get data function
	var getData = function () {
		toggleContr("on");
		if(localStorage.length === 0) {
			alert("There is no data in storage. Default data has been added.");
			autoFillData();
			}
			
		//Write data from local storage to browser
		var makeDiv = $("<div></div>").attr("id", "items");
		var makeList = $("<ul></ul>").attr("id", "wholeList");
		makeDiv.html(makeList);
		$('#seeHere').html(makeDiv);
		$('#items').css("display", "block");
		for(var i=0, len=localStorage.length; i<len; i++) {
			var makeLi = $("<li></li>").attr("id", "listing");
			var linksLi = $("<li></li>");
			makeList.append(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
		
		//Convert string from local to object
			var obj = JSON.parse(value);
			var makeSubList = $("<ul></ul>");
			makeLi.append(makeSubList);
			getImage(obj.priorityLevel[1], makeSubList);
			for(var r in obj) {
				var makeSubLi = $("<li></li>");
				makeSubList.append(makeSubLi);
				var optSubText = obj[r][0]+" "+obj[r][1];
				makeSubLi.html(optSubText);
				makeSubList.append(linksLi);
				
				}
				
				//Create edit and delete buttons for items in local storage
				makeItemLinks(localStorage.key(i), linksLi); 
		}
	}
	
	//Image for categories
	var getImage = function (catName, makeSubList) {
		var imgLi = $("<li></li>");
		makeSubList.html(imgLi);
		var newImg = $("<img></img>").attr("src", "images/"+ catName + ".png");
		imgLi.html(newImg);
	}
	
	var autoFillData = function () {
		//JSON object comes from json.js, storing it in local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*10000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
var validator = function (e) {
		//Define elements
		var getPriority = $('#priorities');
		var getNot = $('#taskName');
		var getStart = $('#taskDate');
		var getEnd = $('#taskEnd');
		
		//Reset error messages
		errMsg.html("");
		getPriority.css("border", "1px solid black");
		getNot.css("border", "1px solid black");
		getStart.css("border", "1px solid black");
		getEnd.css("border", "1px solid black");


		//Error messages array
		var message = [];
		
		//Priority validate
		if(getPriority.val() === "--Choose Priority Level--") {
			var priorityError = "Please select priority level.".fontcolor("red").bold();
			getPriority.css("border", "2px solid red");
			message.push(priorityError);
		}
		//Name of Task validate
		if(getNot.val() === "") {
			var notError = "Please enter the name of task.".fontcolor("red").bold();
			getNot.css("border", "2px solid red");
			message.push(notError);
		}
		//Start date validate
		if(getStart.val() === "") {
			var startError = "Please select a start date.".fontcolor("red").bold();
			getStart.css("border", "2px solid red");
			message.push(startError);
		}
		//End date validate
		if(getEnd.val() === "") {
			var endError = "Please select an ending date.".fontcolor("red").bold();
			getEnd.css("border", "2px solid red");
			message.push(endError);
		}
		//Explains errors
		if(message.length >=1) {
			for(var i = 0, j = message. length; i < j; i++){
				var txt = $("<li></li>");
				txt.html(message[i]);
				errMsg.appendTo(txt);
			}
		e.preventDefault();
		return false;	
		}
		else{
			storeData(this.key);
			}		
	}
	
	//Make edit and delete buttons for each stored item
	var makeItemLinks = function (key, linksLi) {
		//add edit single item link
		var edit = $("<a></a>").attr("href", "#").text("Edit Task");
		edit.key = key;
		edit.on("click", editItem);
		linksLi.html(edit);
		
		//add line break
		var breakIt = $("<br></br>");
		linksLi.html(breakIt);
		
		//add delete single link
		var deleteIt = $("<a></a>").attr("href", "#").text("Delete Task");
		deleteIt.key = key;
		
		deleteIt.on("click", deleteItem);
		linksLi.html(deleteIt);
		}
	
	var editItem = function () {
		//Grab the data first.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show form again
		toggleContr("off");
		
		//Populate with current
		$('#taskName').val(item.name[1]);
		$('#priorities').val(item.priorityLevel[1]);
		$('#taskDate').val(item.startUp[1]);
		$('#taskEnd').val(item.ending[1]);
		$('#alertWay').val(item.alertOption[1]);
		$('#notes').val(item.note[1]);
		if(item.category[1] == "Home") {
			$('#home').attr("checked", "checked");
			}
		if(item.category[1] == "Business") {
			$('#business').attr("checked", "checked");
					}
		if(item.category[1] == "School") {
			$('#school').attr("checked", "checked");
					}
		
		
		//Remove listener from submit button.
		submit1.off("click", storeData);
		
		//Change submit value to edit
		//Found helpful code for button at: http://www.permadi.com/tutorial/jsInnerHTMLDOM/index.html
		$('#submit').val("Edit Task");
		var editSubmit = $('#submit');
		
		//Save key value in this function as property of editSubmit, use that value when save edited data.
		editSubmit.on("click", validate);
		editSubmit.key = this.key;
	}
	
	
	var deleteItem = function () {
		var ask = confirm("Are you sure you want to delete this task?");
		alert("Task deleted.");
		if(ask){
			localStorage.removeItem(this.key);
			window.location.reload();
		}
		else{
			alert("Task not deleted.");
			window.location.reload();
			return false;
		}
	}
	
	var clearLocal = function () {
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}
		else{
			localStorage.clear();
			alert("All tasks have been cleared.");
			window.location.reload();
			return false;
		}
	
	}
		
	//Variable defaults
	var priorityGroup = ["--Choose Priority Level--","High","Medium","Low"];
	var whichCategoryValue;
	errMsg = $('#errors');
	
	//Set Link & Submit Click Events
	var displayLink = $('#displayData');
	displayLink.on("click", getData);
	var clearLink = $('#clear');
	clearLink.on("click", clearLocal);
	var submit1 = $('#submit');
	submit1.on("click", validator);
	
});