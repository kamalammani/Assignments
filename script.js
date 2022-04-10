let arr = new Array();
let comment = document.getElementById("error handler");
showData();

// Add Element at Top
function addTop(){
  if(validate()){
       comment.innerHTML = "";
       addDataAtTop();
       setData();
       let table = document.getElementById("dataList");
       var rowCount = table.rows.length;
       for (var i = rowCount - 1; i > 0; i--) {
       table.deleteRow(i);
       }
       comment.innerHTML = "Data Added at Top Row";
       showData();
       resetForm();
}}

//Add Element at Bottom
function addBottom(){
  if(validate()){
      comment.innerHTML = "";
       addDataAtBottom();
       setData();
       let table = document.getElementById("dataList");
       var rowCount = table.rows.length;
       for (var i = rowCount - 1; i > 0; i--) {
       table.deleteRow(i);
       }
       comment.innerHTML = "Data Added at Bottom Row";
       showData();
       resetForm();
  }
}

// Validates form fielda
function validate(){

  let isValid = true;
  let Fname = document.getElementById("FnameID").value;
  let Lname = document.getElementById("LnameID").value;
  let city = document.getElementById("cityID").value;
  let country = document.getElementById("countryID").value;
  let message = document.getElementById("error handler");
  

  try{
        if((Fname != null)&&(Fname != "")&&(Lname != null)&&(Lname != "")&&(city != null)&&(city != "")&&(country != null)&&(country != "")){
           if(Fname.length<3){
                isValid = false;
                throw "First name must contain atleast three characters<br><br>Kindly edit and resubmit.";
              }
           if(!onlyLetters(Fname)){
                isValid = false;
                throw "Invalid first name<br><br>Kindly edit and resubmit"
              }
           if(Lname.length<3){
                isValid = false;
                throw "Last name must contain atleast three characters<br><br>Kindly edit and resubmit.";
              }
           if(!onlyLetters(Lname)){
                isValid = false;
                throw "Invalid last name<br><br>Kindly edit and resubmit"
              }
           if(city.length<4){
                isValid = false;
                throw "City name must contain atleast four characters<br><br>Kindly edit and resubmit.";
              }
           if(!onlyLetters(city)){
                isValid = false;
                throw "Invalid city name<br><br>Kindly edit and resubmit"
              }
           if(country.length<4){
                isValid = false;
                throw "Country name must contain atleast four characters<br><br>Kindly edit and resubmit.";
              }
           if(!onlyLetters(country)){
                isValid = false;
                throw "Invalid country name<br><br>Kindly edit and resubmit";
              }
           if(!checkDuplicates()){ 
                isValid = false;
                resetForm();
                throw "This record already exists";
              }
           
            }
         else{
              isValid = false; 
              throw "Every field must be filled<br><br>Kindly fill the empty field and resubmit.";
         }
      }
      catch(err){ 
	         message.innerHTML = err;
     }
     return isValid;
}

//checks input contains only alphabets
function onlyLetters(str) {
  return /^[a-zA-Z]+$/.test(str);
}

//Resets form
function resetForm() {
   document.getElementById("formID").reset();
}

//get Data from local storage
function getData(){
    let str = localStorage.getItem("localdata");
    if(str != null)
      {
         arr = JSON.parse(str);
      }}


//Add data at top
function addDataAtBottom(){
   getData();
   arr.push({
     Fname:document.getElementById("FnameID").value,
     Lname:document.getElementById("LnameID").value,
     city:document.getElementById("cityID").value,
     country:document.getElementById("countryID").value
    });
}

//Add data at end
function addDataAtTop(){
   getData();
   let arr1 = {
     Fname:document.getElementById("FnameID").value,
     Lname:document.getElementById("LnameID").value,
     city:document.getElementById("cityID").value,
     country:document.getElementById("countryID").value
    };

   arr.unshift(arr1);
}


//sets data in local storage
function setData(){
   localStorage.setItem("localdata",JSON.stringify(arr));
}

// Displays data 
function showData(){
    getData();
    let table = document.getElementById("dataList"); 
    for(let i=0;i<arr.length;i++){
           var newRow = table.insertRow();
           cell1 = newRow.insertCell();
           cell1.innerHTML = i+1;
           cell2 = newRow.insertCell();
           cell2.innerHTML = arr[i].Fname;
           cell3 = newRow.insertCell();
           cell3.innerHTML = arr[i].Lname;
           cell4 = newRow.insertCell();
           cell4.innerHTML = arr[i].city;
           cell5 = newRow.insertCell();
           cell5.innerHTML = arr[i].country;
      }
}

//checks Duplicate
function checkDuplicates(){
  
  let isDuplicate = true;
  
  let Fname = document.getElementById("FnameID").value;
  let Lname = document.getElementById("LnameID").value;
  let city =  document.getElementById("cityID").value;
  let country = document.getElementById("countryID").value;
  
  let fnameStr = Fname.toString();
  fnameStr = fnameStr.toLowerCase();
  let lnameStr = Lname.toString();
  lnameStr = lnameStr.toLowerCase();
  let cityStr = city.toString();
  cityStr = cityStr.toLowerCase();
  let countryStr = country.toString();
  countryStr = countryStr.toLowerCase();
  
    
  
   for(let i=0;i<arr.length;i++){
 
    let check1 = arr[i].Fname;
    let fnameStr1 = check1.toString();
    fnameStr1 = fnameStr1.toLowerCase();
    
    let check2 = arr[i].Lname;
    let lnameStr1 = check2.toString();
    lnameStr1 = lnameStr1.toLowerCase();

    
    let check3 = arr[i].city;
    let cityStr1 = check3.toString();
    cityStr1 = cityStr1.toLowerCase();


    let check4 = arr[i].country;
    let countryStr1 = check4.toString();
    countryStr1 = countryStr1.toLowerCase();

     if( (fnameStr==fnameStr1)&&(lnameStr==lnameStr1)&&(cityStr==cityStr1)&&(countryStr==countryStr1) ){
         isDuplicate = false;
      }
    }
 
 return isDuplicate; 
}
