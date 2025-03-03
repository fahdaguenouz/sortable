
function createHeader() {
    const tr = document.createElement('tr');
    const headers = [
      'Icon', 'Name', 'Full Name', 'Powerstats', 
      'Race', 'Gender', 'Height', 'Weight', 
      'Place Of Birth', 'Alignment'
    ];
    
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
       th.style.border="1px solid black"
      tr.appendChild(th);
    });
    
    return tr;
  }

  function createBodytable(heros) {
    const tbody = document.createElement("tbody");
    tbody.style.border = "1px solid black";
    
    heros.forEach((hero) => {
      const tr = document.createElement('tr');
      tr.style.border = "1px solid black";
      
      // Icon
      const iconTd = document.createElement("td");
      iconTd.style.border = "1px solid black";
      iconTd.style.padding = "8px";
      
        const img = document.createElement("img");
        img.src = hero.images.xs;
        img.alt = `${hero.name} icon`;
        img.style.width = "50px";
        iconTd.appendChild(img);
      tr.appendChild(iconTd);
      
      // Name
      const nameTd = document.createElement("td");
      nameTd.textContent = hero.name;
      nameTd.style.border = "1px solid black";
      nameTd.style.padding = "8px";
      tr.appendChild(nameTd);
      
      // Full Name
      const fullNameTd = document.createElement("td");
      fullNameTd.textContent = hero.biography.fullName;
      fullNameTd.style.border = "1px solid black";
      fullNameTd.style.padding = "8px";
      tr.appendChild(fullNameTd);
      
      // Powerstats
      const powerstatsTd = document.createElement("td");
      powerstatsTd.style.border = "1px solid black";
      powerstatsTd.style.padding = "8px";
     
        const powerstatsList = document.createElement("ul");
        powerstatsList.style.margin = "0";
        powerstatsList.style.paddingLeft = "20px";
        for (const [stat, value] of Object.entries(hero.powerstats)) {
          const listItem = document.createElement("li");
          listItem.textContent = `${stat}: ${value}`;
          powerstatsList.appendChild(listItem);
        }
        powerstatsTd.appendChild(powerstatsList);
      
      tr.appendChild(powerstatsTd);
      
      // Race
      const raceTd = document.createElement("td");
      raceTd.textContent = hero.appearance.race ;
      raceTd.style.border = "1px solid black";
      raceTd.style.padding = "8px";
      tr.appendChild(raceTd);
      
      // Gender
      const genderTd = document.createElement("td");
      genderTd.textContent = hero.appearance.gender ;
      genderTd.style.border = "1px solid black";
      genderTd.style.padding = "8px";
      tr.appendChild(genderTd);
      
      // Height
      const heightTd = document.createElement("td");
      heightTd.textContent = hero.appearance.height ;
      heightTd.style.border = "1px solid black";
      heightTd.style.padding = "8px";
      tr.appendChild(heightTd);
      
      // Weight
      const weightTd = document.createElement("td");
      weightTd.textContent = hero.appearance.weight;
      weightTd.style.border = "1px solid black";
      weightTd.style.padding = "8px";
      tr.appendChild(weightTd);
      
      // Place of Birth
      const birthplaceTd = document.createElement("td");
      birthplaceTd.textContent = hero.biography.placeOfBirth;
      birthplaceTd.style.border = "1px solid black";
      birthplaceTd.style.padding = "8px";
      tr.appendChild(birthplaceTd);
      
      // Alignment
      const alignmentTd = document.createElement("td");
      alignmentTd.textContent = hero.biography.alignment ;
      alignmentTd.style.border = "1px solid black";
      alignmentTd.style.padding = "8px";
      tr.appendChild(alignmentTd);
  
      tbody.appendChild(tr);
    });
    
    return tbody;
  }
function createtable(heros){
  console.log("create table");

  const main =document.getElementById("main")
  const table =document.createElement("table")
  table.appendChild(createHeader())
  
  table.appendChild(createBodytable(heros))
  table.style.border="1px solid black"
main.appendChild(table)
 

}
function createSearch(){
  const header=document.getElementById("header")
 
  const search=document.createElement("input")
      search.setAttribute("type","search")
      search.setAttribute("placeholder","search")
      search.className="search"
      header.appendChild(search)
  
}

function createPaggination(heros, perPage = 20) {
  console.log("createpagination");
  

 const existingPagination = document.getElementById("pagination-container");
 if (existingPagination) {
   existingPagination.remove();
 }
  
 
  const totalPages = Math.ceil(heros.length / perPage);
console.log(totalPages);

  
  const paginationContainer = document.createElement("div");
  const footer =document.getElementById("footer")
console.log(footer);

  paginationContainer.id = "pagination-container";
 footer.append(paginationContainer)
  // document.body.appendChild(footer);

  // Create pagination buttons
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.value = i;
    button.className= "btn-pag";

    // button.onclick = function() {
      // const currentPage = parseInt(this.value);
       // const start = (currentPage - 1) * perPage;
       // const end = start + perPage;
       // const paginatedHeros = heros.slice(start, end);
       // const existingTable = document.querySelector("table");
       // if (existingTable) {
       //   existingTable.remove();
     // }
       // createtable(paginatedHeros);
    // };
    paginationContainer.appendChild(button);
  }
  return paginationContainer
}
function createSelect(heros){
  let selectvalues=[10,20,50,100,"all results"] 
const select=document.createElement("select")
selectvalues.forEach((sel,i)=>{
  const option=document.createElement("option")
      option.textContent=sel
      option.value = sel
      option.id=sel
      if(i==1){
          option.setAttribute("selected",true)
      }
      select.appendChild(option)
  })
  const header=document.getElementById("header")
  header.appendChild(select)
  const initialFilteredHeros = SelectFilter(20, heros);
  createtable(initialFilteredHeros); 


  select.addEventListener("change", function () {
    const filteredHeros = SelectFilter(this.value, heros);
    const existingTable = document.querySelector("table"); 
    if (existingTable) {
      existingTable.remove();
    }
    createtable(filteredHeros); 
  });

return heros
}

function SelectFilter(e, heros) {
  const filteredHeros = e === "all results" ? heros : heros.slice(0, parseInt(e));
  createPaggination(heros, e === "all results" ? heros.length : parseInt(e));

  return filteredHeros;
}

async function Sortable(){
  let heros=[]

  try{
      const respo = await fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
      //console.log(respo);
      
        if(!respo.ok){
          throw new Error(`Response status: ${response.status}`);
        }
      heros= await respo.json()
  }catch(e){
      console.error(e.message);
  }



//console.log("kok",heros);
  createSearch()
    heros=createSelect(heros)

}






Sortable()


