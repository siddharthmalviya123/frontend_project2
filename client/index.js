
document.addEventListener('DOMContentLoaded' , function ()
{
    fetch('http://localhost:6000/getAll')
    .then(response=>response.json())
    .then(data => console.log(data))
    .catch(error=> console.log(error));
    loadHTMLTable([])
})

function loadHTMLTable(data)
{
    const table= document.querySelector('table tbody');
  
    if(data.length === 0 )
        {
            table.innerHTML=  "<tr><td class= 'no-data' colspan='5'>No data</td></tr>";
        }
}