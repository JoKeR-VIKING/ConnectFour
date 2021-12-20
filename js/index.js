let arr = new Array(8);
let player = true;

for (let i=0;i<arr.length;i++)
    arr[i] = new Array(8);

const board = document.getElementById("board");

let row = board.insertRow();

for (let i=0;i<8;i++)
{
    let button = document.createElement("button");
    button.id = (i+1).toString();
    button.className = "arrow";
    button.innerHTML = "<i class='arrow-down'></i>";
    button.onclick = function () {
        fun(this.id);
    }

    let th = document.createElement("th");
    th.className = "head";
    th.appendChild(button);
    row.appendChild(th);
}

for (let i=0;i<8;i++)
{
    let row = board.insertRow();
    row.classList.add("row");
    row.id = "row " + i.toString();

    for (let j=0;j<8;j++)
    {
        let cell = row.insertCell();
        cell.classList.add("cell");
        cell.style.background = "white";
    }
}

function fun(id)
{
    let j = 7;
    for (;j>=0;j--)
    {
        let query = `.row:nth-child(${j+2}) > .cell:nth-child(${id})`;
        let cell = document.querySelector(query);

        if (cell.style.background === "white")
        {
            arr[j][id-1] = player ? 0 : 1;
            cell.style.background = player ? "red" : "blue";

            let win = winCheck();
            if (win)
            {
                if (player)
                {
                    alert("Player 1 Wins !");
                }
                else
                {
                    alert("Player 2 Wins !");
                }

                winnerDisplay();
                return;
            }

            let draw = drawCheck();
            if (draw)
            {
                alert("Draw !");
                player = undefined;
                winnerDisplay();
                return;
            }

            if (player)
            {
                document.getElementById("name2").style.background = "blue";
                document.getElementById("name1").style.background = "white";
            }
            else
            {
                document.getElementById("name1").style.background = "red";
                document.getElementById("name2").style.background = "white";
            }

            player = !player;
            break;
        }
    }

    if (j === -1)
    {
        alert("The column selected is full!");
    }
}

function winnerDisplay()
{
    for (let i=1;i<=8;i++)
    {
        let button = document.getElementById(`${i}`);
        button.disabled = true;
    }

    let name = document.getElementById("winner-name");
    const winner = document.getElementById("winner");

    if (player === true)
        name.innerHTML = "Player 1 Wins !";
    else if (player === false)
        name.innerHTML = "Player 2 Wins !";
    else
        name.innerHTML = "Draw !";

    winner.style.display = "block";
}

function reload()
{
    window.location.reload();
}

function winCheck()
{
    for (let i=0;i<8;i++)
    {
        for (let j=0;j<8;j++)
        {
            let no = arr[i][j];

            if (i + 3 < 8)
            {
                if (arr[i+1][j] === arr[i+2][j] &&
                    arr[i+1][j] === arr[i+3][j] &&
                    arr[i+1][j] === no &&
                    arr[i+1][j] !== undefined)
                    return true;
            }
            if (j + 3 < 8)
            {
                if (arr[i][j+1] === arr[i][j+2] &&
                    arr[i][j+1] === arr[i][j+3] &&
                    arr[i][j+1] === no &&
                    arr[i][j+1] !== undefined)
                    return true;
            }
            if (i + 3 < 8 && j + 3 < 8)
            {
                if (arr[i+1][j+1] === arr[i+2][j+2] &&
                    arr[i+1][j+1] === arr[i+3][j+3] &&
                    arr[i+1][j+1] === no &&
                    arr[i+1][j+1] !== undefined)
                    return true;
            }
            if (i + 3 < 8 && j - 3 >= 0)
            {
                if (arr[i+1][j-1] === arr[i+2][j-2] &&
                    arr[i+1][j-1] === arr[i+3][j-3] &&
                    arr[i+1][j-1] === no &&
                    arr[i+1][j-1] !== undefined)
                    return true;
            }
        }
    }

    return false;
}

function drawCheck()
{
    for (let i=0;i<8;i++)
    {
        for (let j=0;j<8;j++)
        {
            if (arr[i][j] === undefined)
                return false;
        }
    }

    return true;
}