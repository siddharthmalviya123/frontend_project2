
document.addEventListener('DOMContentLoaded' , function ()
{
    fetch('https://frontend-project2.onrender.com/getAll')
    .then(response=>response.json())
    .then(data =>  loadHTMLTable(data['data']));
});

//want already exist thing thats why
document.querySelector('table tbody').addEventListener('click' ,function(event)
{
//delete 
if(event.target.className === "delete-row-btn")
    {
        deleteRowById(event.target.dataset.id);
    }

//edit
else if(event.target.className === "edit-row-btn")
    {
        handleEditRow(event.target.dataset.id);
    }
})

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

searchBtn.addEventListener('click', function()
{
  
    const searchValue = document.querySelector('#search-input').value;
    if(searchValue)
        {
            fetch('https://frontend-project2.onrender.com/search/'+ searchValue)
            .then(response=>response.json())
            .then(data =>  loadHTMLTable(data['data']));
        }
    else{
        alert("add some value");
    }
   
})

function deleteRowById(id)
{
    fetch("https://frontend-project2.onrender.com/delete/"+id , {
        method : 'DELETE'
    })
    .then(response=>response.json())
    .then(data=> {
        if(data.success)
            {
                location.reload();
            }
    })
}

function handleEditRow(id)
{
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden= false;
     document.querySelector('#update-name-input').dataset.id = id;

}

updateBtn.addEventListener('click', function()
{
console.log("update button clicked");
const updateNameInput = document.querySelector('#update-name-input');

console.log(updateNameInput.value);
fetch('https://frontend-project2.onrender.com/update' , {
    method :'PATCH',
    headers :{
        'Content-type': 'application/json'
    },
    body : JSON.stringify(
        {
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        }
    )
})
.then((response=> response.json()))
.then(data=>{
    if(data.success)
        {
            location.reload();
        }
})

})


const addBtn= document.querySelector('#add-name-btn');


addBtn.addEventListener("click",function (){
    console.log("clicked")
    const nameInput = document.querySelector('#name-input');
    const name= nameInput.value;
    nameInput.value= "";
console.log("second clicked")

    fetch('https://frontend-project2.onrender.com/insert', {
        headers:{
            'Content-type': 'application/json'
        },
        method :'POST',
        body: JSON.stringify({name :name})
    })
    .then(response => response.json())
    .then(data=>insertRowIntoTable(data['data']));
})


function insertRowIntoTable (data)
{
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');
    let tableHtml= "<tr>";

    //array nhi obj arah

    for(var key in data)
        {
            if(data.hasOwnProperty(key))
                {
                    if(key === "dateAdded")
                        {
                            data[key] = new Date(data[key]).toLocaleString();
                        }
                        tableHtml+= `<td>${data[key]}</td>`;    
                }
        }
    
        tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>delete</button></td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>edit</button></td>`;
    
    tableHtml +="</tr>"


    if(isTableData)
        {
            table.innerHTML= tableHtml
        }
    else
    {
        const newRow = table.insertRow();
        newRow.innerHTML= tableHtml;
    }

}


function loadHTMLTable(data)
{
    const table= document.querySelector('table tbody');

//   console.log(data);
    if(data.length === 0 )
        {
            table.innerHTML=  "<tr><td class= 'no-data' colspan='5'>No data</td></tr>";
            return;
        }

        let tableHtml ="";

        data.forEach(function ({id, name, date_added}){
            tableHtml += "<tr>";
            tableHtml += `<td>${id}</td>`;
            tableHtml += `<td>${name}</td>`;
            tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
            tableHtml += `<td><button class="delete-row-btn" data-id=${id}>delete</button></td>`;
            tableHtml += `<td><button class="edit-row-btn" data-id=${id}>edit</button></td>`;
            tableHtml += "</tr>" 


        })

        table.innerHTML=tableHtml;
}
