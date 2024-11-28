function loadData(){
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden")
        displayCards(cardData);
    }, 1000);
}
function selectOption(option){
    document.getElementById('selectedOption').innerText = option;
    sortCards(option);
    toggleDropdown();
}

function sortCards(option){
    let sortedCards=[...cardData];
    if(option=='Сначала новые'){
        sortedCards.sort((a,b) => new Date(b.date)-new Date(a.date));
    } else if (option=='Сначала старые'){
        sortedCards.sort((a,b) => new Date(a.date)-new Date(b.date));
    }
    displayCards(sortedCards);
}
const cardData = [
    {title:'Карточка 1', date: '2024-09-10'},
    {title:'Карточка 2', date: '2024-03-11'},
    {title:'Карточка 3', date: '2024-06-07'},
]

function displayCards(cards){
    const container=document.getElementById("cardsContainer");
    container.innerHTML='';
    cards.forEach(card=>{
        const cardElement=document.createElement("div");
        cardElement.classList.add("card");

        const titleElement = document.createElement("p");
        titleElement.classList.add("card-title");
        titleElement.innerText = card.title;
        
        const dateElement= document.createElement("p");
        dateElement.classList.add("card-date");
        dateElement.innerText=`Дата: ${card.date}`;
        
        cardElement.appendChild(titleElement);
        cardElement.appendChild( dateElement);
        container.appendChild(cardElement);



    })
}
function toggleDropdown(){
    document.getElementById("dropdownMenu").classList.toggle("show")
}

    window.onclick=function(event){
        if(!event.target.closest(".dropdown")){
            document.getElementById("dropdownMenu").classList.remove("show")

        }
    }
