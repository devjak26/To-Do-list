const clear= document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list= document.getElementById("list");
const input= document.getElementById("input");


const c1= "fa-check-circle";
const c2= "fa-circle-thin";
const c3= "lineThrough";

const option= { month: "short", day: "numeric", weekday: "short"};

const today= new Date();

dateElement.innerHTML= today.toLocaleDateString("en-US", option);

// dateElement.innerHTML=today;
 

let List,id;

// localStorage.setItem("TODO", JSON.stringify(List));

let data = localStorage.getItem("TODO");

if(data)
{
    List=JSON.parse(data);

    id=List.length;

    loadList(List);
} 

else
{
    List=[];
    id=0;
}

function loadList(array)
{
    
    array.forEach(function(item)
    {
         addToDo(item.name,item.id,item.done,item.trash);
            
    });
            
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


function addToDo(toDo,id ,done,trash)
{
     if(trash)
     {
         return;
     }

     var d1=done? c1: c2;
     var l= done? c3 : "";

    const item=` <li class="item">
    <i class="fa   ${d1} co" job="complete" id="${id}"></i>
    <p class="text ${l}"> ${toDo} </p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
</li>
`;

const position= "beforeend";

list.insertAdjacentHTML(position,item);
 
}

document.addEventListener("keyup", function( event){
    // console.log(123);

     if(event.keyCode === 13)
    {
        const toDo=input.value;

        if(toDo)
        {
            addToDo(toDo,id, false,false );
            //  console.log(toDo);
            input.value="";

            
            List.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });
            
            localStorage.setItem("TODO", JSON.stringify(List));

            id++;
        }

    }

});

 
function completeToDo(element){

        // console.log(element.parentNode.childNodes); 

    element.classList.toggle(c1);
    element.classList.toggle(c2);

    element.parentNode.querySelector(".text").classList.toggle(c3);

    List[element.id].done = List[element.id].done ? false : true;

    // location.reload();
    
}
 
function removeToDo(element)
{
    // console.log(element.parentNode);

    element.parentNode.parentNode.removeChild(element.parentNode);

    List[element.id].trash=true;
}

list.addEventListener("click" , function(event){

    const element=event.target;

    // console.log(element);

    const eventJob=element.attributes.job.value;

    // console.log(element.id);

    if(eventJob == "complete")
    {
        completeToDo(element);
        // console.log(9);
    }

    else if(eventJob =="delete")
    {
        // alert("are tou sure to delete this item?");
        removeToDo(element);
        
        // console.log(9);
    }

    localStorage.setItem("TODO", JSON.stringify(List));
});

// addToDo("csf",0,false,false);