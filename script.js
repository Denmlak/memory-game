const board= document.querySelector('.memory-board');
let cardsArray= [
	 {
	 	name: 'Picard',
	 	img: 'images/Picard.jpg'
	 },
	   {
	 	name: 'Picard',
	 	img: 'images/Picard.jpg'
	 },
	  {
	 	name: 'Janeway',
	 	img: 'images/Janeway.jpg'
	 },
	  {
	 	name: 'Janeway',
	 	img: 'images/Janeway.jpg'
	 }, {
	 	name: 'Michael',
	 	img: 'images/Michael.jpg'
	 },
	  {
	 	name: 'Michael',
	 	img: 'images/Michael.jpg'
	 },
	  {
	 	name: 'Quark',
	 	img: 'images/Quark.jpg'
	 },
	  {
	 	name: 'Quark',
	 	img: 'images/Quark.jpg'
	 },
	  {
	 	name: 'tpol',
	 	img: 'images/tpol.jpg'
	 },
	  {
	 	name: 'tpol',
	 	img: 'images/tpol.jpg'
	 },
	  {
	 	name: 'spock',
	 	img: 'images/spock.jpg'
	 },
	  {
	 	name: 'spock',
	 	img: 'images/spock.jpg'
	 },
	 {
	 	name: 'kirk',
	 	img: 'images/kirk.jpg'
	 },
	  {
	 	name: 'kirk',
	 	img: 'images/kirk.jpg'
	 },
	 {
	 	name: 'seven',
	 	img: 'images/seven.jpg'
	 },
	  {
	 	name: 'seven',
	 	img: 'images/seven.jpg'
	 },
	 {
	 	name: 'Morn',
	 	img: 'images/Morn.png'
	 },
	  {
	 	name: 'Morn',
	 	img: 'images/Morn.png'
	 },
	 {
	 	name: 'data',
	 	img: 'images/data.jpg'
	 },
	  {
	 	name: 'data',
	 	img: 'images/data.jpg'
	 }
];


//cardsArray.sort(()=> 0.5 - Math.random());

function shuffle(cardsArray) {                         // better shuffle algoritam
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
    return cardsArray;
};
shuffle(cardsArray);


let cardChosen=[];
let cardChosenId=[];
let cardWon=[];
let lockBoard= false;
let box= document.querySelector('.box');
let boxPopup= false;



const createBoard=() =>{	
	for (var i = 0; i < cardsArray.length; i++) {
		const card= document.createElement('div');
		card.classList.add('card');
		card.setAttribute('data-id', i);
		const backImage=document.createElement('img');
		const frontImage=document.createElement('img');
		backImage.setAttribute('src', 'images/logo.jpg');
		backImage.classList.add('back-image');
		frontImage.setAttribute('src', cardsArray[i].img);
		frontImage.classList.add('front-image');
		card.appendChild(frontImage);
		card.appendChild(backImage);
		card.addEventListener('click', flipCard);
		board.appendChild(card);
	}
};

function flipCard (){
	if(lockBoard) return;
	const cardId= this.getAttribute('data-id');
	this.classList.add('flip');
	cardChosen.push(cardsArray[cardId].name);
	cardChosenId.push(cardId);
	if (cardChosen.length === 2) {
		lockBoard= true;
		setTimeout(checkMatch, 1000);
	}
}

const checkMatch= ()=>{
	const cards=document.querySelectorAll('.card');
	const cardOne= cardChosenId[0];
	const cardTwo= cardChosenId[1];	
	if (cardOne === cardTwo) {
		cardChosen.splice(-1,1);
	}
	if (cardChosen[0] === cardChosen[1]) {
		cards[cardOne].style.visibility='hidden';
		cards[cardTwo].style.visibility='hidden';
		delete cardsArray[cardOne];
		delete cardsArray[cardTwo];
		cardWon.push(cardOne);
		cardWon.push(cardTwo);
	}
	else{
		cards[cardOne].classList.remove('flip');
		cards[cardTwo].classList.remove('flip');
	}
	cardChosen=[];
	cardChosenId=[];
	lockBoard=false;
	if (cardWon.length === cardsArray.length) {
		box.style.display="block";	
		boxPopup=true;	
	}
	openBtn= document.querySelector('#open-btn');
	openBtn.addEventListener('click', refreshPage)
}

const refreshPage = () =>{
	if (boxPopup){
		box.style.display="none";	
	}
	window.location.reload(true);
}

createBoard();
	
	


