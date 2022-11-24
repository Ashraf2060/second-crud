
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let create = document.getElementById('btn')

let mood = 'create'
let temp;

// get total

function getTotal(){
    
    if (price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.backgroundColor = "green"
    }else{
        total.innerHTML = ""
        total.style.backgroundColor = "red" 
    }
}
// create
// save data in local storage
let dataPro ;
if(localStorage.product != null){
    dataPro =JSON.parse(localStorage.product)

}else{
dataPro= []
}



create.onclick= function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
        }
        if(mood ==="create"){
            if(newPro.count>1){
                for(let i =0; i<count.value; i++){
                    dataPro.push(newPro)
                }
                }else{
                    dataPro.push(newPro)
                }
        }else{
            dataPro[  temp ] = newPro
            mood ="create"
            create.innerHTML="create"
            count.style.display = "block"
        }
        localStorage.setItem("product" , JSON.stringify(dataPro))
        clearData()
        reaData()
}
// clear inputs
  function clearData(){
   title.value = ''
   price.value = ''
   taxes.value =''
   ads.value = ''
   discount.value = ''
   count.value = ''
   category.value=''
   total.innerHTML = ''
  }
//read

function reaData(){
    let table =''
    getTotal() 
    for(let i =0; i<dataPro.length; i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td> <button onclick="updateData(${i})" id="update">update</button></td>
        <td> <button id="delete" onclick="deleteData (${i})">delete</button></td>
        
        </tr>`
    }

    document.getElementById("tbody").innerHTML = table

    let deletAll= document.getElementById("deletall")
    if (dataPro.length > 0){
        deletAll.innerHTML = `
      <button onclick ="deleteAll()">Delete All(${dataPro.length})</button> `
    }else{
        deletAll.innerHTML = ""
    }
}
reaData()

//delete

function deleteData (i){
     dataPro.splice(i , 1)
     localStorage.product = JSON.stringify(dataPro)
     reaData()
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    reaData()
}
//update
function updateData(i){
title.value = dataPro[i].title
price.value = dataPro[i].price
taxes.value = dataPro[i].taxes
ads.value = dataPro[i].ads
discount.value = dataPro[i].discount
category.value = dataPro[i].category
count.style.display= "none"
create.innerHTML= "Update"
mood = "update"
getTotal()
temp = i;
scroll({
    top: 0,
    behavior : "smooth"
})
}
//search
let searchMood = "title"

function getSearchmood(id){
    let search = document.getElementById('search');
    if (id == "searchtitle"){
     searchMood = "title";
     search.placeholder = "Search by title";
    }else{
        searchMood = "category";
        search.placeholder = "Search by category";
    }
   search.focus()
   search.value=''
   reaData()
}
function searchData(value){
    let table = ''
if(searchMood== "title"){
    for( let i =0; i<dataPro.length; i++){
        if(dataPro[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td> <button onclick="updateData(${i})" id="update">update</button></td>
            <td> <button id="delete" onclick="deleteData (${i})">delete</button></td>
            
            </tr>`
        }
    }
}else{
    for( let i =0; i<dataPro.length; i++){
        if(dataPro[i].category.includes(value)){
            table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td> <button onclick="updateData(${i})" id="update">update</button></td>
            <td> <button id="delete" onclick="deleteData (${i})">delete</button></td>
            
            </tr>`
        }
    }
}
document.getElementById("tbody").innerHTML = table
}
// clean data
