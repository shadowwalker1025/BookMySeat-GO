
//fetching all the required elements either by Class or ID's

const movieContainer = document.getElementById('movie-container');
const ticketType = document.getElementById('tickets-type')
const inputSeatNumber = document.getElementById('seatnum1');
const seats = document.querySelectorAll('.seat:not(.occupied)');
const container = document.querySelector('.container');
const standarSeats = document.getElementsByClassName('standardseats');
const premiumSeats = document.getElementsByClassName('premiumseats');
const proceedButton = document.getElementById('proceedbutton');

let standardSeatsRow1 = Array.from(document.querySelectorAll('.r1:not(.occupied)'));
let standardSeatsRow2 = Array.from(document.querySelectorAll('.r2:not(.occupied)'));
let standardSeatsRow3 = Array.from(document.querySelectorAll('.r3:not(.occupied)'));
let standardSeatsRow4 = Array.from(document.querySelectorAll('.r4:not(.occupied)'));
let premiumSeatsRow1 = Array.from(document.querySelectorAll('.r5:not(.occupied)'));
let premiumSeatsRow2 = Array.from(document.querySelectorAll('.r6:not(.occupied)'));
let premiumSeatsRow3 = Array.from(document.querySelectorAll('.r7:not(.occupied)'));
debugger;
let seatsSelectedQuantity;
let seatType;

//Populating the UserInter Face From LocalStorage.

populateUI();


inputSeatNumber.addEventListener('change', seatQuantity)
function seatQuantity(e){
seatsSelectedQuantity = parseInt(e.target.value)
}

    ticketType.addEventListener('change', (e) => {
         seatType = e.target.value;
        if(seatType == 'premium' && seatsSelectedQuantity != 0){

            function seatType(rowSeatsType){
                rowSeatsType.map((r,ind) =>{
                    r.addEventListener('click', (e)=>{
                        rowSeatsType.map((item,index)=>{
                            if(seatsSelectedQuantity>0 || seatType == 'premium' && !rowSeatsType[ind].classList.contains("selected")){
                                console.log('isClass',rowSeatsType[ind].classList.contains("selected"))
                                rowSeatsType[ind].classList.toggle("selected");
                                seatsSelectedQuantity--;
                                ind++;
                            }
                        })
                    })
            
                })
            } 
            seatType(premiumSeatsRow1);
            seatType(premiumSeatsRow2);
            seatType(premiumSeatsRow3);

            proceedButton.addEventListener('click', () => {
                updateSelectCount();
                alert('Movie Tickets have been Successfully Booked.');
            })
        }

        else if(seatType == 'standard' && seatsSelectedQuantity != 0) {
            
            function seatType(rowSeatsType){
                rowSeatsType.map((r,ind) =>{
                    r.addEventListener('click', (e)=>{
                        rowSeatsType.map((item,index)=>{
                            if(seatsSelectedQuantity>0 || seatType == 'standard' && !rowSeatsType[ind].classList.contains("selected")){
                                rowSeatsType[ind].classList.toggle("selected");
                            seatsSelectedQuantity--;
                            ind++;
                            }
                        })
                    })
            
                })
            }

            seatType(standardSeatsRow1);
            seatType(standardSeatsRow2);
            seatType(standardSeatsRow3);
            seatType(standardSeatsRow4);

            proceedButton.addEventListener('click', () => {
                updateSelectCount();
                alert('Movie Tickets have been Successfully Booked.');
            })
        }
       
    })
    
    //LocalStorage  

    function setMovieData(movieIndex) {
        localStorage.setItem('selectedMovieIndex', movieIndex);
    }

    function updateSelectCount(){
        const selectedSeats = document.querySelectorAll('.seat.selected');
        const seatsIndex = [...selectedSeats].map((seat)=> [...seats].indexOf(seat));
        localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    }

    function populateUI(){
        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
        if (selectedSeats !== null && selectedSeats.length > 0){
            seats.forEach((seat, index) => {
                if(selectedSeats.indexOf(index) > -1){
                    seat.classList.add('selected');
                }
            });
        }

        const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

        if(selectedMovieIndex !== null) {
            standarSeats.selectedIndex = selectedMovieIndex;
        }
    }

    //Uncomment the below statement to clear the all locally stored data.

    // localStorage.clear();


