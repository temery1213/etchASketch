document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("flexContainer");
    const squareSizeButton = document.getElementById("squareSize");

    function createSquares(totalSquares) {
        const squareSize = Math.floor(Math.sqrt(10000 / totalSquares)); // Calculate the size for each square
        const numRows = Math.ceil(100 / squareSize);
        const numCols = Math.ceil(totalSquares / numRows);

        container.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

        for (let i = 0; i < totalSquares; i++) {
            const square = document.createElement("div");
            square.classList.add("squares");
            container.appendChild(square);

            square.addEventListener("mouseover", function () {
                square.style.backgroundColor = "black"; // Change background color on mouseover
            });
        }

        const squares = document.querySelectorAll(".squares");
        squares.forEach(square => {
            square.style.flex = `0 0 ${100 / numCols}%`;
            square.style.paddingBottom = `${100 / numRows}%`;
        });
    }

    // Initial creation of 16 squares
    createSquares(4);

    squareSizeButton.addEventListener("click", function () {
        const userInput = parseInt(prompt("Enter the number of squares on a side:"));

        if (!isNaN(userInput) && userInput >= 1 && userInput <= 100) {
            // Clear existing squares
            container.innerHTML = "";
            createSquares(userInput);
        } else {
            alert("Please enter a valid number between 1 and 100.");
        }
    });
});
