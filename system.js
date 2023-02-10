// Get element from file html

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

// fin--get element from file html

// global variables
let tmp; 
let mood = 'create' ;

// global variables

// Get total

function getTotal()
{
 if (price.value != ''){
    let result = 
        (+price.value + +taxes.value + +ads.value) -
         +discount.value;
    total.innerHTML=  result;
    total.style.background = '#040';
 }
 else {
    total.innerHTML = '';
    total.style.background = '#a00d02';
 }
}




// //////////////////////////////////////////////////////////////////Crete product

let dataPro;

if(localStorage.product != null)
{
    dataPro = JSON.parse(localStorage.product);
}
else{
    dataPro = [];
}
  
submit.onclick = function() { 
                              let newPro = {
                                              title:title.value,
                                              price:price.value,
                                              taxes:taxes.value,
                                              ads:ads.value,
                                              discount:discount.value,
                                              total:total.innerHTML,
                                              count:count.value,
                                              category:category.value,
                                            }
                                  
                              if (mood === 'create'){ 
                                if (title.value !=='' ){
                                               if (newPro.count > 1){
                                              for(let i = 0 ; i < newPro.count ; i++){
                                                    dataPro.push(newPro);
                                                                                     }
                                                                    }
                                              else{
                                                   dataPro.push(newPro);
                                                  }             
                                                                  }
                                                       }
                              // update mood

                              else{
                                   dataPro[tmp] = newPro;
                                   mood = 'create';
                                   submit.innerHTML = 'Create';
                                   count.style.display = 'block';
                                  }
                              // update mood

                              // Save localStorage
                            
                                localStorage.setItem('product',JSON.stringify(dataPro));
                            
                              // Save localStorage
                            
                            // clean inputs and show data
                            
                                 clearIN();
                                 showData();
                            
                            // clean inputs and show data

                            }

// //////////////////////////////////////////////////////////////////Crete product

// //////////////////////////// Clear inputs

function clearIN(){
                   title.value = '';
                   price.value = '';
                   taxes.value = '';
                   ads.value = '';
                   count.value = '';
                   category.value = '';
                   discount.value = '';
                   total.innerHTML = '';
                   total.style.background = '#a00d02';
                  }

// //////////////////////////// Clear inputs

//////////////////////////////////////////////////////////////////////////////////////////////////////////// show Data

function showData(){
    
                    let table = '';
                    
                    for (let i = 0; i < dataPro.length ; i++){
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
                      <td><button onclick = 'update(${i}) ' id='update'>Update</button></td>
                      <td><button onclick = 'deleteData(${i})' id='delete'>Delete</button></td>
                      
                      </tr> `
                                                             } 
                  
                    document.getElementById('tbody').innerHTML = table;
                  
                    let btnDelete = document.getElementById('deleteAll') ;
                    if (dataPro.length > 0)
                      {
                       btnDelete.innerHTML = 
                       `<button onclick = "deleteAll()">DeleteAll(${dataPro.length})</button>`
                      }
                    else
                     {
                      btnDelete.innerHTML = '';
                     }

                  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////// show Data
 
//////////////////////////////////////////////////////////// Update

function update(i){
   tmp = i;
   title.value = dataPro[i].title;
   price.value = dataPro[i].price;
   taxes.value = dataPro[i].taxes;
   ads.value = dataPro[i].ads;
   discount.value = dataPro[i].discount;
   category.value = dataPro[i].category;
   count.style.display = 'none';
   mood = 'update';
   submit.innerHTML= 'Update';
   getTotal();
  
}

//////////////////////////////////////////////////////////// fin--Update

////////////////////////////////////////////////////////////// Delete
 
function deleteData(i){

                          dataPro.splice(i,1)
                          localStorage.product = JSON.stringify(dataPro);
                          showData()

                      }

////////////////////////////////////////////////////////////// fin--Delete

////////////////////////////////delete all data

function deleteAll(){

                      localStorage.clear();
                      dataPro.splice(0);
                      showData();

                    }

////////////////////////////////fin--delete all data

//////////////////////////////////////////////////////////////////////////////////////////////////////////// Search 

/////////////////////////////////////////////////////////////////// get mood search
  searchMood = 'title';
  function getSearchMood(id){

                              let search = document.getElementById('search');
                          
                              if (id == 'searchTitle'){
                                  searchMood = 'title';
                                  search.Placeholder = 'Search By Title';
                          
                                                      } 
                               else {
                                     searchMood = 'category';
                                     search.Placeholder = ' Search By Title ';
                                    }
                          
                              search.focus();
                              search.value = '';
                              showData();
      
                            }

////////////////////////////////////////////////////////////////// fin--get mood search 

   function searchData(value){
  
                                let table = '';
                                if (searchMood == 'title')
                                 {
                                    for(let i = 0 ; i < dataPro.length ; i++)
                                    {
                                      if (dataPro[i].title.includes(value))
                                      {
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
                                        <td><button onclick = 'update(${i}) ' id='update'>Update</button></td>
                                        <td><button onclick = 'deleteData(${i})' id='delete'>Delete</button></td>
                                
                                        </tr> `
                                      }  
                                    }  
                                 }
                                    else 
                                         {
                                          for(let i = 0 ; i < dataPro.length ; i++)
                                    {
                                      if (dataPro[i].category.includes(value))
                                      {
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
                                        <td><button onclick = 'update(${i}) ' id='update'>Update</button></td>
                                        <td><button onclick = 'deleteData(${i})' id='delete'>Delete</button></td>     
                                        </tr> `
                                      }  
                                    }  
                                         }
                                         document.getElementById('tbody').innerHTML = table;
                             }

//////////////////////////////////////////////////////////////////////////////////////////////////////////// fin--Search 

// always show data for users
showData()