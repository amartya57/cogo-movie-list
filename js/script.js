let search_term="Man";
let page=1;
let max_page=1;
let vis=false;
// let path='http://www.omdbapi.com/?apikey=42a696fa&s=Man&page=2';
let path='http://www.omdbapi.com/?apikey=c9449b8a';
let movieData = [];

// //Put code for searchbar here


let ratings;
if(!localStorage.getItem("RatingData")){
    ratings={

    };
    localStorage.setItem("RatingData", JSON.stringify(ratings));
}


{/* <div class="holder-back">
            <div class="title">
                The Dark Knight Rises
            </div>
            <div class="info">
                <div class="infoi">Release Date : August 2019</div>
                <div class="infoi">Watched : No</div>
                <div class="rating-back">⭐ ⭐ ✰ ✰ ✰</div>
            </div>
            <div class="new-rating">
                <div class="label rating-lbl">Give Rating ?</div>
                <div class="rating-inner">
                    <input type="text" class="search-tab" name="" id="rating-search-tab" placeholder="Enter to search">
                    <div class="btn btn-rating">Submit Ratings</div>
                </div>
            </div> 
        </div> */}


function render(data){
    let id=data["imdbID"];
    let title=data["Title"];
    let year=data["Year"];
    let imgURL=data["Poster"];
    let rating=0;
    ratings=JSON.parse(localStorage.getItem("RatingData"));
    if(id in ratings){
        rating=ratings[id];
    }
    
    let hDiv=document.createElement('div');
    hDiv.classList.add("holder");

    let pDiv=document.createElement('div');
    pDiv.classList.add("poster");

    let pImg=document.createElement('img');
    pImg.classList.add("posterimg");
    pImg.classList.add(id);
    pImg.src=imgURL;

    pDiv.appendChild(pImg);

    let tDiv=document.createElement('div');
    tDiv.classList.add("title");
    tDiv.innerText=title;

    let rDiv=document.createElement('div');
    rDiv.classList.add("rating");
    let rtxt="";

    for(let i=0; i<rating; i++){
        rtxt+="⭐";
    }
    for(let i=rating; i<5; i++){
        rtxt+="✰";
    }

    rDiv.innerText=rtxt;

    hDiv.appendChild(pDiv);
    hDiv.appendChild(tDiv);
    hDiv.appendChild(rDiv);

    let cDiv=document.querySelector('.content');
    cDiv.appendChild(hDiv);


    let hDivb=document.createElement('div');
    hDivb.classList.add("holder-back");
    hDivb.classList.add("hide");

    let tDivb=document.createElement('div');
    tDivb.classList.add("title");
    tDivb.innerText=title;

    let iDiv=document.createElement("div");
    iDiv.classList.add("info");

    let infoi1=document.createElement("div");
    infoi1.classList.add("infoi");
    infoi1.innerText=year;

    let infoi2=document.createElement("div");
    infoi2.classList.add("infoi");
    if(rating){
        infoi2.innerText="Watched : Yes";
    }
    else{
        infoi2.innerText="Watched : No";
    }

    let divrb=document.createElement('div');
    divrb.classList.add("rating-back");
    infoi2.innerText=rtxt;

    let divnr=document.createElement('div');
    divnr.classList.add('new-rating');

    let divrl=document.createElement('div');
    divrl.classList.add('label');
    divrl.classList.add('rating-label');
    divrl.innerText="Rate This Movie ?"

    let divrinr=document.createElement('div');
    divrinr.classList.add("rating-inner");

    iprn=document.createElement('input')
    iprn.type="text";
    iprn.classList.add("search-tab");
    iprn.setAttribute('id', id);
    iprn.placeholder = "Give Rating Out Of 5";

    let divbtnrt=document.createElement('div');
    divbtnrt.classList.add("btn");
    divbtnrt.classList.add("btn-rating");
    divbtnrt.classList.add(id);
    divbtnrt.innerText="Submit Rating";

    divbtnrt.addEventListener('click', function(e){
        let ratingLive=Number(document.getElementById(id).value);
        console.log(ratingLive);
        if(ratingLive>5){
            ratingLive=5;
        }
        if(ratingLive<1){
            ratingLive=1;
        }
        ratings[id]=ratingLive;
        localStorage.setItem("RatingData", JSON.stringify(ratings));
        renderAll();
    })

    divrinr.appendChild(iprn);
    divrinr.appendChild(divbtnrt);

    divnr.appendChild(divrl);
    divnr.appendChild(divrinr);

    iDiv.appendChild(infoi1);
    iDiv.appendChild(infoi2);
    iDiv.appendChild(divrb);

    hDivb.appendChild(tDivb);
    hDivb.appendChild(iDiv);
    hDivb.appendChild(divnr);
    hDivb.style.backgroundImage="url('../images/bg.jpg')"

    cDiv.appendChild(hDivb);

    pImg.addEventListener('click', function(e){
        hDiv.classList.add("hide");
        hDivb.classList.remove("hide");
    })

    hDivb.addEventListener('click', function(e){
        if(e.target==hDivb){
            hDiv.classList.remove("hide");
            hDivb.classList.add("hide");
        }
    })
}

function renderAll(){
    let cDiv=document.querySelector('.content');
    cDiv.innerHTML="";
    let len=movieData.length;
    for(let i=0; i<len; i++){
        render(movieData[i]);
    }
}

function getData(path, search_term, page=1){
    path=path+"&s="+search_term+"&page="+page;
    fetch(path)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then((data) => {
        // Process the received data
        //console.log(data);
        max_page=Math.ceil(Number(data.totalResults)/10);
        movieData=data.Search;
        renderAll();
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch request
        console.log('Error:', error.message);
    });
}

// if(!vis){
//     vis=true;
//     getData(path, search_term);
// }

setInterval(()=>{
    search_term=document.getElementById("my-search-tab").value;
    if(search_term==""){
        search_term="man";
    }
    getData(path, search_term);
}, 5000);


let btnHolder=document.querySelector('.button-holder');

btnHolder.addEventListener('click', function(e){
    if(e.target.classList.contains('prev-btn')){
        if(page!=1){
            page-=1;
            getData(path, search_term, page);
        }
    }
    else if(e.target.classList.contains('next-btn')){
        if(page!=max_page){
            page+=1;
            getData(path, search_term, page);
        }
    }
})


let area=document.getElementById("my-search-tab");
let srchbtn=document.querySelector(".srchlbl");
srchbtn.addEventListener('click', function(e){
    search_term=area.value;
    page=1;
    getData(path, search_term, page);
})

