let boxes=document.querySelectorAll(".box");
let resetbutton=document.querySelector("#reset-button");
let msgcontainer= document.querySelector(".message-container");
let msg= document.querySelector("#msg");
let newGameBtn= document.querySelector("#new-button");

let turn0=true;
let count=0;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

const resetGame=() =>{
    turn0=true;
    enablebuttons();
    msgcontainer.classList.add("hide");
    count: 0;
}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
     
        if (turn0){
        box.innerText="O";
        
        turn0 = false;
        box.classList.add("O");
     }
     else {
        box.innerText ="X";
        box.classList.add("X");
        turn0 = true;
     }
     box.disabled = true;
     count++;

    let isWinner = checkWinner();

    if(count === 9 && !isWinner){
        gameDraw();
    } 
    });
});

const gameDraw=() =>{
    msg.innerText = ` Game was a draw. `;
    msgcontainer.classList.remove("hide");
    disablebuttons();
}



const disablebuttons= () => {
    for (let box of boxes){
        box.disabled= true;
    }
}

const enablebuttons= () => {
    for (box of boxes){
        box.disabled= false;
        box.classList.remove("O", "X");

        box.innerText = "";
    }
}

const showWinner=(winner) =>{
    msg.innerText = `Congratulations the winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disablebuttons();
}

const checkWinner=() =>{
    for(let pattern of winPatterns){
        let pos1Val= boxes[pattern[0]].innerText;
        let pos2Val= boxes[pattern[1]].innerText;
        let pos3Val= boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val !="" && pos3Val !=""){
            if (pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }


    }
    return false;

}
 
newGameBtn.addEventListener("click", resetGame);
resetbutton.addEventListener("click", resetGame);  